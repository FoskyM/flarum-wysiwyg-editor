export function transformTemplate(templates: HTMLElement) {
    const templateNodeList = Array.from(templates.querySelectorAll("template"))
    templateNodeList.forEach((template) => {
        if (template.childNodes.length === 0) return;
        if (template.childNodes.length > 1) {
            const wrapper = templates.ownerDocument.createElement("div");
            wrapper.append(...Array.from(template.childNodes));
            template.append(wrapper)
        }
        (template.childNodes[0] as HTMLElement).setAttribute("data-template-match-name", (template.getAttribute("match") || "").toLowerCase())
    });
}

const basicTags = "B|DEL|EM|H1|H2|H3|H4|H5|H6|I|INS|LI|S|STRONG|SUB|SUP|TABLE|TBODY|THEAD|TR|U|p";
function basicTemplates(document: Document) {
    return basicTags.split("|").map(tag => {
        const smallTag = tag.toLowerCase();
        const template = document.createElement("xsl:template");
        template.setAttribute("match", `${tag}`);
        template.innerHTML = `<${smallTag} ><xsl:apply-templates/></${smallTag}>`;
        document.firstChild?.appendChild(template);
    });
}

export function preprocessTags() {
    // @ts-ignore
    let xsl = (new DOMParser).parseFromString(s9e.TextFormatter.xsl, 'text/xml');
    const basicTagOriginal = xsl.querySelector(`template[match='${basicTags}']`);
    if (basicTagOriginal) {
        basicTagOriginal.remove();
        basicTemplates(xsl);
    }
    transformTemplate(xsl as any);
    // @ts-ignore
    s9e.TextFormatter.xsl = xsl.documentElement.outerHTML;
    // @ts-ignore
    s9e.TextFormatter.xslt.init(s9e.TextFormatter.xsl)
}