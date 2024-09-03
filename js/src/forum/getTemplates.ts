export type Template = {
  name: string,
  parentName: string,
  parentClass: string[],
  content: string,
  attributes: string[],
}
export default function getTemplates(): Template[] {
  // @ts-ignore
  let xsl = (new DOMParser).parseFromString(s9e.TextFormatter.xsl, 'text/xml');
  let templates: Template[] = [];
  // xsl:stylesheet > xsl:template
  let root = xsl.documentElement;
  root.querySelectorAll('template').forEach((template) => {
    let match = template.getAttribute('match');
    if (match === null || match.indexOf('|') > -1) return;
    let content = template.innerHTML;
    // <xsl:apply-templates xmlns:xsl="http://www.w3.org/1999/XSL/Transform"/>
    content = content.replace('<xsl:apply-templates xmlns:xsl="http://www.w3.org/1999/XSL/Transform"/>', '{@Tcontent}');
    // "<div class="xx2see login"><div class="xx2see_title">登录可见内容</div></div>"
    // parentName 为 template 的根节点名
    let parentName = template.firstElementChild?.tagName;
    let parentClass = template.firstElementChild?.getAttribute('class');
    // 只保留没有 {} 的类名
    if (parentClass) {
      parentClass = parentClass.split(' ');
      parentClass = parentClass.filter((name: string) => {
        return name.indexOf('{') === -1 && name.indexOf('}') === -1;
      });
    } else {
      parentClass = [];
    }
    // 取出 @* 属性
    let attributes = [] as any;
    let matches = content.match(/\{@(.*?)\}/g) || [];
    matches.forEach((attr: any) => {
      let name = attr.slice(2, -1);
      attributes.push(name);
    });

    templates.push({
      name: match,
      parentName,
      parentClass,
      content,
      attributes,
    });
  });
  return templates;
}