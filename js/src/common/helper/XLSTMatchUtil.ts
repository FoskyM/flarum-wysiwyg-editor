class IfContext {
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

export default class XSLTMatchUtil {
    template: HTMLElement;
    constructor(template: HTMLElement) {
        this.template = template.cloneNode(true) as HTMLElement;
    }

    bbcode(node: HTMLElement) {
        const context = new IfContext();
        this.match(node, this.template, context);
        if (context.isRejected()) return false;
        return context.attributes;
    }
    match(root: HTMLElement, templateRoot: HTMLElement, context: IfContext) {
        // a) 元素名检查
        if (root.nodeName.toLowerCase() != templateRoot.nodeName.toLowerCase()) return context.reject();
        // b) 类名检查
        //  要求：template中的所有类包含于root中
        const templateClasses = (templateRoot.getAttribute('class')?.split(' ') || []).filter(s => !!s);
        templateClasses.forEach((templateClass): any => {
            if (!root.classList.contains(templateClass))
                return context.reject();
        });
        if (context.isRejected()) return;

        // c) 属性检查
        this.checkAndUpdateAttr(root, templateRoot, context);

        // d) 子元素检查
        //如果是xsl:apply-templates，则忽略检查下一级的元素
        if (templateRoot.childNodes.length && templateRoot.childNodes[0].nodeName.toLowerCase() == 'xsl:apply-templates') { }
        else {
            // TODO : 子树搜索
        }
    }
    checkAndUpdateAttr(root: HTMLElement, templateRoot: HTMLElement, context: IfContext) {
        const templateAttrs = templateRoot.attributes;
        for (let i = 0; i < templateAttrs.length; i++) {
            const templateAttr = templateAttrs[i];

            // 1) 结果dom必须包含所有的template属性
            const rootValue = root.getAttribute(templateAttr.name);
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
            const names = [...templateAttr.value.matchAll(/\{@(.+?)\}/ig)].map(m => m && m.length > 1 && m[1]);
            // 构造正则，并通过这种方法匹配获取所有的参数值
            const matchRegexr = new RegExp(templateAttr.value.replace(/\{@(.+?)\}/ig, '(.+?)'));
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
        }
        return true;
    }



    // TODO
    processChildren(rootChild: NodeListOf<ChildNode>, templateChild: NodeListOf<ChildNode>[], rootIndex: number, templateIndex: number[], context: IfContext) {
        const templateNew = templateChild[0][templateIndex[0]];
        const rootNew = rootChild[rootIndex];

        // XSL段处理：将当前的XSL段加入到template栈，root位置不变
        // 此时，该部分应该视为其中一种情况单独处理，并使用新的ifContext
        if (templateNew.nodeName.toLowerCase().startsWith('xsl:')) {
            templateChild.unshift(templateNew.childNodes);
            templateIndex.unshift(0);
            const newContext = new IfContext();
            this.processChildren(rootNew.childNodes, templateChild, rootIndex, templateIndex, newContext);
            //TODO 结束，合并context
            if (!newContext.isRejected()) {
                context.merge(newContext);
            }
        } else {
            // 一般段处理
            //检查元素是否匹配，否：拒绝当前context并返回
            this.match(rootNew as HTMLElement, templateNew as HTMLElement, context);
            if (context.isRejected()) return;
            //处理成功：继续处理下一个元素
            rootIndex++;
            templateIndex[0]++;
            //template栈的处理方式
            if (templateIndex[0] >= templateChild[0].length) {
                templateIndex.shift();
                templateChild.shift();
            }

            //TODO 判断处理是否完成
            if (false) {/***/ }

            // 继续处理下一个元素
            this.processChildren(rootChild, Object.assign([], templateChild), rootIndex, Object.assign([], templateIndex), context);
        }
    }
}