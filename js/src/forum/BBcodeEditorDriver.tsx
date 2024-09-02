import 'sceditor/minified/sceditor.min.js';
import 'sceditor/minified/formats/bbcode';
import getCaretCoordinates from 'textarea-caret';
import ItemList from 'flarum/common/utils/ItemList';
import styleSelectedText from 'flarum/common/utils/styleSelectedText';
import type EditorDriverInterface from 'flarum/common/utils/EditorDriverInterface';
import { type EditorDriverParams } from 'flarum/common/utils/EditorDriverInterface';

import getTemplates from './getTemplates';

export default class BBcodeEditorDriver implements EditorDriverInterface {
  el: HTMLTextAreaElement;
  tempEl: HTMLTextAreaElement;
  view: any = null;
  params: any = null;
  instance: any = null;
  editor: any = null;
  rangeHelper: any = null;
  extraBBcode: any = null;
  s9ePreview: HTMLDivElement;

  constructor(dom: HTMLElement, params: EditorDriverParams) {
    this.tempEl = document.createElement('textarea');
    this.s9ePreview = document.createElement('div');
    this.extraBBcode = getTemplates();

    this.build(dom, params);
  }

  build(dom: HTMLElement, params: EditorDriverParams) {
    this.tempEl.className = params.classNames.join(' ');
    this.tempEl.disabled = params.disabled;
    this.tempEl.placeholder = params.placeholder;
    this.tempEl.value = params.value;
    dom.append(this.tempEl);

    this.s9ePreview.className = 'Post-body s9e-preview bbcode-editor-preview';
    this.s9ePreview.style.display = 'none';
    dom.append(this.s9ePreview);

    this.params = params;
    // @ts-ignore
    let sceditor = window.sceditor;
    this.extraBBcode.forEach((template: any) => {
      let name = template.name.toLowerCase();
      if (sceditor.formats.bbcode.get(name) !== null) return;
      if (name.indexOf('xsl:') > -1) return;
      if (template.content.indexOf('xsl:') > -1) return;
      console.log(template);
      sceditor.formats.bbcode.set(name, {
        tags: {
          [template.parentName]: {
            class: null,
          },
        },
        allowsEmpty: true,
        format: function (elm: HTMLElement, content: string) {
          if (elm.tagName.toLowerCase() === template.parentName) {
            let hasAllClasses = template.parentClass.every((className: string) => elm.classList.contains(className));
            if (!hasAllClasses) return content;
            if (template.parentClass.length === 0 && template.parentName === 'div') return content;
            if (template.content.indexOf(elm.outerHTML) > -1) return content;
            if (template.attributes.length === 0 && template.parentName === 'div') return content;
            let extractedValues = {} as any;

            let matches = template.content.match(/\{@(.*?)\}/g) || [];
            let start = 0;
            let end = template.content.length;

            matches.forEach((match: any, index: number) => {
              let name = match.slice(2, -1);
              let value = '';
              let nextMatch = matches[index + 1] || null;
              let nextMatchIndex = nextMatch ? template.content.indexOf(nextMatch) : template.content.length;
              let temp1 = template.content.slice(start, template.content.indexOf(match));
              let temp2 = template.content.slice(template.content.indexOf(match) + match.length, nextMatchIndex);
              temp1 = temp1.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace('\\/', '/');
              temp2 = temp2.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace('\\/', '/');
              let temp = temp1 + '(.*?)' + temp2;
              let content = elm.outerHTML;
              let regex = new RegExp(temp, 'g');
              let result = content.match(regex);
              if (result) {
                temp1 = temp1.replace(/\\/g, '');
                temp2 = temp2.replace(/\\/g, '');
                value = result[0].replace(temp1, '').replace(temp2, '');
              }
              extractedValues[name] = value;
              start = template.content.indexOf(match) + match.length;
              end = nextMatchIndex;
            });

            if (extractedValues['Tcontent']) {
              content = extractedValues['Tcontent'];
              content = content.replace(/<[^>]+>/g, '');
              delete extractedValues['Tcontent'];
            } else {
              content = elm.innerText;
            }
            let attrStr = '';
            for (let key in extractedValues) {
              if (extractedValues[key]) {
                attrStr += ' ' + key + '="' + extractedValues[key] + '"';
              }
            }
            if (content === '') {
              if (name === 'clip') return '';
              return '[' + name + attrStr + ']';
            }
            return '[' + name + attrStr + ']' + content + '[/' + name + ']';
          }
          return content;
        },
        html: function (token: any, attrs: any, content: string) {
          let val = token.val + content;
          if (token.closing?.val) {
            val += token.closing.val;
          }
          // @ts-ignore
          s9e.TextFormatter.preview(val, $('.bbcode-editor-preview')[0]);
          let html = $('.bbcode-editor-preview')[0].innerHTML;
          $('.bbcode-editor-preview')[0].innerHTML = '';
          return html;
        },
      });
    });

    sceditor.create(this.tempEl, {
      format: 'bbcode',
      style: '/assets/extensions/foskym-wysiwyg-editor/content.min.css',
      toolbar: '',
      locale: 'cn',
      emoticonsEnabled: false,
      startInSourceMode: false,
      resizeEnabled: false,
      dateFormat: 'yyyy-mm-dd',
      rtl: false,
    });
    this.editor = sceditor;
    this.instance = sceditor.instance(this.tempEl);
    this.rangeHelper = this.instance.getRangeHelper();

    const cssClasses = params.classNames || [];
    cssClasses.forEach((className: string) => this.instance?.css(className));

    let composer = document.querySelector('#composer');
    let height = composer?.clientHeight - 120;
    this.instance.width('100%');
    this.instance.height(height);
    const root = document.documentElement;
    const bodyBg = getComputedStyle(root).getPropertyValue('--body-bg').trim();
    const controlColor = getComputedStyle(root).getPropertyValue('--control-color').trim();
    this.instance.css('body {background-color: ' + bodyBg + '; color: ' + controlColor + ' !important;}');
    this.instance.focus();

    let iframe = this.instance.getContentAreaContainer();
    let parent = iframe.parentElement;
    this.el = parent.querySelector('textarea');

    const callInputListeners = (e: Event) => {
      this.params?.inputListeners.forEach((listener: any) => {
        listener.call(iframe);
      });

      e.redraw = false;
    };

    this.el.oninput = callInputListeners;
    this.el.onclick = callInputListeners;
    this.el.onkeyup = callInputListeners;

    ['keyup', 'keydown', 'keypress', 'blur', 'focus'].forEach((event: string) => {
      this.instance.bind(event, (e: Event) => {
        params.oninput(this.instance.val());
        callInputListeners(e);
      });
    });

    let iframeDoc = iframe.contentDocument;
    let iframeBody = iframeDoc.body;
    iframeBody.classList.add('bbcode-editor-content');
    iframeBody.classList.add('Post-body');

    let head = iframeDoc.head;
    let links = document.head.querySelectorAll('link');
    links.forEach((link) => {
      if (link.href.indexOf('forum') > -1) {
        head.appendChild(link.cloneNode(true));
      }
    });
  }

  getInstance() {
    return this.instance;
  }

  // External Control Stuff

  /**
   * Focus the textarea and place the cursor at the given index.
   *
   * @param {number} position
   */
  moveCursorTo(position: number) {
    this.setSelectionRange(position, position);
  }

  /**
   * Get the selected range of the textarea.
   *
   * @return {Array}
   */
  getSelectionRange() {
    let range = this.rangeHelper.selectedRange();

    return [range.startOffset, range.endOffset];
  }

  /**
   * Get (at most) the last N characters from the current "text block".
   */
  getLastNChars(n: number) {
    const value = this.instance.val();
    console.log(value);

    return value.slice(Math.max(0, this.getSelectionRange()[0] - n), this.getSelectionRange()[0]);
  }

  /**
   * Insert content into the textarea at the position of the cursor.
   *
   * @param {String} text
   */
  insertAtCursor(text: string) {
    this.insertAt(this.getSelectionRange()[0], text);
  }

  /**
   * Insert content into the textarea at the given position.
   *
   * @param {number} pos
   * @param {String} text
   */
  insertAt(pos: number, text: string) {
    this.insertBetween(pos, pos, text);
  }

  /**
   * Insert content into the textarea between the given positions.
   *
   * If the start and end positions are different, any text between them will be
   * overwritten.
   *
   * @param start
   * @param end
   * @param text
   */
  insertBetween(selectionStart: number, selectionEnd: number, text: string) {
    this.setSelectionRange(selectionStart, selectionEnd);

    this.instance.insert(text);
  }

  /**
   * Replace existing content from the start to the current cursor position.
   *
   * @param start
   * @param text
   */
  replaceBeforeCursor(start: number, text: string) {
    this.insertBetween(start, this.getSelectionRange()[0], text);
  }

  /**
   * Set the selected range of the textarea.
   *
   * @param {number} start
   * @param {number} end
   * @private
   */
  setSelectionRange(start: number, end: number) {
    let range = document.createRange();

    range.setStart(this.el, start);
    range.setEnd(this.el, end);

    this.rangeHelper.selectRange(range);
    this.focus();
  }

  getTextNodeWidth(textNode: any) {
    const tempElement = document.createElement('span');
    tempElement.textContent = textNode.nodeValue;

    const styles = window.getComputedStyle(textNode.parentNode);
    tempElement.style.fontSize = styles.fontSize;
    tempElement.style.fontFamily = styles.fontFamily;
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    document.body.appendChild(tempElement);
    const width = tempElement.getBoundingClientRect().width;
    document.body.removeChild(tempElement);
    return width;
  }

  getCaretCoordinates(position: number) {
    const isSourceMode = this.instance.sourceMode();
    if (isSourceMode) {
      const relCoords = getCaretCoordinates(this.el, position);

      return {
        top: relCoords.top - this.el.scrollTop,
        left: relCoords.left,
      };
    }
    let node = this.instance.currentNode();
    if (node.nodeType === 3) {
      let parent = node.parentNode;
      let width = this.getTextNodeWidth(node);
      let rect = parent.getBoundingClientRect();
      let left = rect.left + width;
      let top = rect.top + rect.height;
      console.log(parent, left, top);
      return {
        left,
        top,
      };
    }
    const rect = node.getBoundingClientRect();
    const left = rect.left + rect.width;
    const top = rect.top + rect.height;
    console.log(node, left, top);
    return {
      left,
      top,
    };
  }

  focus() {
    this.instance.focus();
  }

  destroy() {
    this.instance.destroy();
  }

  disabled(disabled: boolean) {
    this.instance.readOnly(disabled);
  }
}
