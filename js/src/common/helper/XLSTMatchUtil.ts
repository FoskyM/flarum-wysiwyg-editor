let gdebug = 0;
class IfContext {
    debug: number = gdebug++;
    attributes: Record<string, string> = {};
    rejected: boolean = false;
    merge(newContext: IfContext) {
        if (newContext.isRejected()) return
        Object.keys(newContext.attributes).forEach(key => {
            this.attributes[key] = newContext.attributes[key];
        });
    }
    attr(name: string) {
        return this.attributes[name];
    }
    setAttr(name: string, value: string) {
        this.attributes[name] = value;
    }
    reject() {
        this.rejected = true;
        return false;
    }
    isRejected() {
        return this.rejected;
    }
}

const SCE_ATTRIBUTES_TRANSFORM: Record<string, string> = {
    "target": "data-sce-target"
}
const SEC_TAG_IGNORE: Record<string, boolean> = {

}
function d_clone(obj: any) {
    if (obj.nodeName) {
        return obj;
    }
    if (typeof obj === "object") {
        if (Array.isArray(obj)) {
            return obj.map((v: any): any => d_clone(v));
        } else {
            const ret: any = {}
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    ret[key] = d_clone(obj[key]);
                }
            }
            return ret;
        }
    }
    return obj;
}
function extract_text(elem: HTMLElement | Text) {
    if (elem.nodeName.toLowerCase() === "#text") {
        return elem.textContent || "";
    } else {
        return (elem as HTMLElement).innerText || "";
    }
}

export default class XSLTMatchUtil {
    template: HTMLElement;
    constructor(template: HTMLElement) {
        this.template = template.cloneNode(true) as HTMLElement;
    }

    matchAttributes(node: HTMLElement) {
        const context = new IfContext();
        this.match(node, this.template.firstChild as HTMLElement, context);
        if (context.isRejected()) return false;
        return context.attributes;
    }
    match(root: HTMLElement, templateRoot: HTMLElement, context: IfContext, skipChildren: boolean = false): any {
        // a) 元素名检查
        if (root.nodeName.toLowerCase() != templateRoot.nodeName.toLowerCase()) return context.reject();

        // b) 属性检查
        this.checkAndUpdateAttr(root, templateRoot, context);
        if (context.isRejected()) return;

        if (skipChildren) return;

        // c) 子元素检查
        const templateChildren = Array.from(templateRoot.childNodes);
        const rootChildren = Array.from(root.childNodes);
        if (rootChildren.length == 0 || templateChildren.length == 0) {
            if (rootChildren.length != 0)
                return context.reject();
            return;
        }
        this.processChildren([rootChildren], [templateChildren], [0], [0], context);
    }
    checkAndUpdateAttr(root: HTMLElement, templateRoot: HTMLElement, context: IfContext) {
        const templateAttrs = templateRoot.attributes;
        for (let i = 0; i < templateAttrs.length; i++) {
            const templateAttr = templateAttrs[i];

            // 1) 结果dom必须包含所有的template属性
            let rootValue = root.getAttribute(templateAttr.name);

            // SB SCEditor 改我Attribute而且文档不说明，差评！
            if (!rootValue && !!SCE_ATTRIBUTES_TRANSFORM[templateAttr.name]) {
                rootValue = root.getAttribute(SCE_ATTRIBUTES_TRANSFORM[templateAttr.name]);
            }
            if (rootValue === null) {
                return context.reject();
            }
            if (!this.attributeCheck(rootValue, templateAttr, context))
                return context.reject();
        }
        return true;
    }

    attributeCheck(rootValue: string, templateAttr: Attr, context: IfContext): boolean {
        // {@xxxxx}语法在template中用于匹配一个attribute.我们将在所有的attribute中查找，如果存在，则将属性值含有参数
        if (/\{@(.*?)\}/ig.test(templateAttr.value)) {
            // 匹配所有{@xxxx}，并提取名称
            const names = Array.from(templateAttr.value.matchAll(/\{@(.+?)\}/ig)).map(m => (m && m.length > 1 && m[1])).filter(s => !!s);
            // 构造正则，并通过这种方法匹配获取所有的参数值
            const matchRegexr = new RegExp("^" + templateAttr.value.replace(/\{@(.+?)\}/ig, '(.+?)') + "$");
            const rootResult = matchRegexr.exec(rootValue)?.slice(1);

            // 如果匹配到的参数个数和模板中的参数个数不一致，则返回false
            if (!rootResult || rootResult?.length != names.length)
                return context.reject();

            // 更新各个参数的值
            for (let i = 0; i < names.length; i++) {
                const name = names[i];
                const rv = rootResult[i];
                // 注意 bbcode 是不允许空参数值的
                if (!name || !rv)
                    return context.reject();

                context.setAttr(name, rv);
            }
        } else if (templateAttr.value !== rootValue) {
            return context.reject();
        }
        return true;
    }

    /**
     * 该方法将在【同一层】递归执行，直到找到一个解
     * 【同一层】指的是XSLT处理后，位于同一深度的节点集合
     */
    processChildren(rootChild: ChildNode[][], templateChild: ChildNode[][], rootIndex: number[], templateIndex: number[], context: IfContext, forceTop: boolean = false) {
        // 模板树方案遍历结束
        if (templateChild.length == 0) {
            // root还有剩余，拒绝
            if (rootChild.length > 0) context.reject();
            return;
        }
        if (rootChild.length == 0) {
            return;
        }

        const templateNew = templateChild[0][templateIndex[0]];
        const rootNew = rootChild[0][rootIndex[0]];

        // XSL段处理：将当前的XSL段加入到template栈，root位置不变
        // 这里采用一种很粗暴的做法：认为所有XSL段都是可选的
        // 此时，该部分应该视为其中一种情况单独处理，并使用新的ifContext
        if (templateNew.nodeName.toLowerCase().startsWith('xsl:')) {
            const newContext = new IfContext();
            const continueWithChildrens = this.processXSLTCondition(templateNew as HTMLElement, rootNew as HTMLElement, newContext);

            if (continueWithChildrens) {
                const newTemplateChild = d_clone(templateChild);
                const newTemplateIndex = d_clone(templateIndex);
                const newRootChild = d_clone(rootChild);
                const newRootIndex = d_clone(rootIndex);
                newTemplateChild.unshift(Array.from(templateNew.childNodes));
                newTemplateIndex.unshift(0);

                //处理XSL方法：当前Child层，传入新的template和context
                //递归中,要求XSLT中至少包含一个Child处理完成,不进行进一步递归
                this.processChildren(newRootChild, newTemplateChild, newRootIndex, newTemplateIndex, newContext, true);
            }

            //结束，合并context
            if (!newContext.isRejected()) {
                context.merge(newContext);
                return;
            }

            //忽略XSL TAG
            templateIndex[0]++;
            //递归栈的处理方式
            if (templateIndex[0] >= templateChild[0].length) {
                if (forceTop) {
                    context.reject();
                    return;
                }
                templateIndex.shift();
                templateChild.shift();
            }

            // 继续处理下一个元素
            this.processChildren(d_clone(rootChild), d_clone(templateChild), d_clone(rootIndex), d_clone(templateIndex), context);

        } else {
            // 一般段处理
            //  -1 文本节点特判
            if (rootNew.nodeName.toLowerCase() == "#text" && templateNew.nodeName.toLowerCase() == "#text") {
                // 遵从dom渲染规则，多个空格合并为一个
                const templateContent = templateNew.textContent?.replace(/ \s+/ig, " ") || "";
                const rootContent = rootNew.textContent?.replace(/ \s+/ig, " ") || "";

                if (rootContent != templateContent) {
                    if (rootContent && rootContent.startsWith(templateContent)) {
                        const newTemplateChild = d_clone(templateChild);
                        const newTemplateIndex = d_clone(templateIndex);
                        const newRootChild: any[][] = d_clone(rootChild);
                        const newRootIndex = d_clone(rootIndex);
                        const newNode = rootNew.cloneNode();
                        newNode.textContent = rootContent.substring(templateContent.length);
                        newRootChild[0].splice(newRootIndex[0] + 1, 0, newNode);
                        newRootIndex[0]++;
                        newTemplateIndex[0]++;
                        if (newRootIndex[0] >= newRootChild[0].length) {
                            newRootChild.shift();
                            newTemplateChild.shift();
                        }
                        this.processChildren(newRootChild, newTemplateChild, newRootIndex, newTemplateIndex, context);
                    } else {
                        context.reject();
                    }
                }
            } else {
                //检查元素是否匹配，否：拒绝当前context并返回
                // 该检查忽略子元素
                this.match(rootNew as HTMLElement, templateNew as HTMLElement, context);
            }
            if (context.isRejected()) return;


            //继续处理下一个元素
            rootIndex[0]++;
            templateIndex[0]++;
            //递归栈的处理方式
            if (templateIndex[0] >= templateChild[0].length) {
                templateIndex.shift();
                templateChild.shift();
            }
            if (rootIndex[0] >= rootChild[0].length) {
                rootIndex.shift();
                rootChild.shift();
            }

            // 继续处理下一个元素
            this.processChildren(d_clone(rootChild), d_clone(templateChild), d_clone(rootIndex), d_clone(templateIndex), context);
        }

    }

    processXSLTCondition(templateRoot: HTMLElement, root: HTMLElement, context: IfContext): boolean {
        const nodeName = templateRoot.nodeName.toLowerCase();

        if (nodeName == 'xsl:if' || nodeName == 'xsl:choose') {
            const test = templateRoot.getAttribute('test');
            const match = test?.match(/([@A-Za-z0-9_'"\{\}]+)=([@A-Za-z0-9_'"\{\}]+)/);
            if (match) {
                // 提取条件决定的属性值
                let arg1 = match[1];
                let arg2 = match[2];
                if (arg1.startsWith('@') && !arg2.startsWith('@')) {
                    context.setAttr(arg1.slice(1), arg2);
                }
                else if (arg2.startsWith('@') && !arg1.startsWith('@')) {
                    context.setAttr(arg2.slice(1), arg1);
                }
            }
        }
        if (nodeName == 'xsl:value-of') {
            const select = templateRoot.getAttribute('select');
            const match = select?.match(/@([A-Za-z0-9_'"\{\}]+)/);
            if (match) {
                context.setAttr(match[1], extract_text(root));
            }
            //对于这个自闭合标签，我们不需要再处理其子节点
            return false;
        }
        if (nodeName == 'xsl:apply-templates') {
            context.setAttr('@template', extract_text(root));
            //模板标签不需要处理子节点
            return false;
        }
        return true;
    }
}