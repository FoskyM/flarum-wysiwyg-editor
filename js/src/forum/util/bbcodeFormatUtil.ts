import { Template } from "../getTemplates";

const DEBUG = true;

export function format(template: Template) {
    return (elm: HTMLElement, content: string) => {
        console.log("✨H->B", elm, content);
        if (elm.getAttribute('data-template-match-name') === template.name.toLowerCase()) {
            const attributes = template.matching.matchAttributes(elm);
            if (attributes === false) {
                DEBUG && console.log("❌Template does not match", template.name);
                return content;
            }
            const attributeStr = Object.keys(attributes).filter(k => k != "@template").map((key: string) => `${key}=${attributes[key]}`).join(' ');
            const closingTag = template.selfClose ? '' : `[/${template.name.toUpperCase()}]`;
            DEBUG && console.log("✅Match", attributes, content);

            attributes['@template'] = content;
            
            return `[${template.name.toUpperCase()} ${attributeStr}]${attributes['@template'] || ""}${closingTag}`;
        }
        DEBUG && console.log("❓Missing tag", content);
        return content;
    }
}
export function html(template: Template, preViewElem: HTMLElement) {
    return (token: any, attrs: any, content: string) => {
        console.log("🎈B->H", token, content);
        let val = token.val + "FLAT_WYSIWYG_CONTENT_PLACEHOLDER";
        if (token.closing?.val) {
            val += token.closing.val;
        }
        // @ts-ignore
        s9e.TextFormatter.preview(val, preViewElem);
        let html = $(preViewElem).html();
        $(preViewElem).html("");
        if (html.startsWith("<p>") && html.endsWith("</p>")) {
            html = html.substring(3, html.length - 4);
        }
        return html.replace(/FLAT_WYSIWYG_CONTENT_PLACEHOLDER/g, content);
    }
}