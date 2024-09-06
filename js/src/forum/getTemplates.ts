import XSLTMatchUtil from "../common/helper/XLSTMatchUtil";
import { transformTemplate } from "./util/templateReplaceUtil";

export type Template = {
  name: string,
  parentName: string,
  content: string,
  selfClose: boolean,
  matching: XSLTMatchUtil
}
function closeTest(tagName: string) {
  //@ts-ignore
  const tagDef: any = s9e.TextFormatter.tagsConfig[tagName.toUpperCase()];
  if (!tagDef) return false;

  const attributeStr = Object.keys(tagDef.attributes).map(attr => `${attr}=0 `).join(" ");
  const testStrClose = `[${tagName} ${attributeStr}][/${tagName}]`
  const testStrOpen = `[${tagName} ${attributeStr}]`
  //@ts-ignore
  const testClose: string = s9e.TextFormatter.parse(testStrClose);
  //@ts-ignore
  const testOpen: string = s9e.TextFormatter.parse(testStrOpen);


  if (testClose.replace(`<e>[/${tagName}]</e>`, "") !== testOpen) return true;
  return false;
}

const specialTags = ["TABLE", "THEAD", "TH", "TR", "TD", "TBODY"];
function isBB(tagName: string) {
  if (specialTags.includes(tagName.toUpperCase())) return true;
  //@ts-ignore
  const tagDef: any = s9e.TextFormatter.tagsConfig[tagName.toUpperCase()];
  if (!tagDef) return false;

  const attributeStr = [tagName].concat(Object.keys(tagDef.attributes).map(attr => `${attr}=0 `)).join(" ");
  const testStr = `[${attributeStr}][/${tagName}]`;
  //@ts-ignore
  const testClose: string = s9e.TextFormatter.parse(testStr);

  return testClose.includes(`<${tagName.toUpperCase()}`);
}
export default function getTemplates(): Template[] {
  // @ts-ignore
  let xsl = (new DOMParser).parseFromString(s9e.TextFormatter.xsl, 'text/xml');
  let templates: Template[] = [];
  // xsl:stylesheet > xsl:template
  let root = xsl.documentElement;
  (Array.from(root.getElementsByTagName("xsl:template")) as HTMLElement[]).forEach((template) => {
    let match = template.getAttribute('match');
    if (match === null || match.indexOf('|') > -1) return;
    if (!isBB(match)) return;
    let content = template.innerHTML;


    // parentName 为 template 的根节点名
    let parentName = template.firstElementChild?.tagName || "";
    if (!parentName) return;

    templates.push({
      name: match,
      parentName,
      content,
      selfClose: closeTest(match),
      matching: new XSLTMatchUtil(template)
    });
  });
  return templates;
}