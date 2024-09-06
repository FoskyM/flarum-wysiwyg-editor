import 'sceditor/minified/sceditor.min.js';
import 'sceditor/minified/formats/bbcode';
import getCaretCoordinates from 'textarea-caret';
import ItemList from 'flarum/common/utils/ItemList';
import styleSelectedText from 'flarum/common/utils/styleSelectedText';
import type EditorDriverInterface from 'flarum/common/utils/EditorDriverInterface';
import { type EditorDriverParams } from 'flarum/common/utils/EditorDriverInterface';

import getTemplates, { Template } from './getTemplates';
import { BindEvent, GlobalSCEditor, RangeHelper, SCEditor } from '../@types/sceditor';
import { makeWrapTextarea } from './util/textareaStyler';
import { format, html } from './util/bbcodeFormatUtil';

const ORIGINAL_TAGS = ['b', 'i', 'u', 's', 'sub', 'sup', 'font', 'size', 'color', 'ul',
  'list', 'ol', 'li', '*', 'table', 'tr', 'th', 'td', 'emoticon', 'hr', 'img', 'url',
  'email', 'quote', 'code', 'left', 'center', 'right', 'justify', 'youtube', 'rtl', 'ltr'];

export default class BBcodeEditorDriver implements EditorDriverInterface {
  el: HTMLTextAreaElement;
  tempEl: HTMLTextAreaElement;
  _textarea: HTMLTextAreaElement;
  view: any = null;
  params: EditorDriverParams | null = null;
  instance: SCEditor | null = null;
  editor: GlobalSCEditor | null = null;
  rangeHelper: RangeHelper | null = null;
  extraBBcode: Template[] = [];
  s9ePreview: HTMLDivElement;

  constructor(dom: HTMLElement, params: EditorDriverParams) {
    //这里的EL应该是可以直接赋值的吧
    this._textarea = this.tempEl = this.el = document.createElement('textarea');
    this.s9ePreview = document.createElement('div');
    this.extraBBcode = getTemplates();
    this.build(dom, params);
    // 搞一个假的textarea
    this.el = this.tempEl = makeWrapTextarea(this.tempEl, this.instance!);
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
    let sceditor = window.sceditor;
    ORIGINAL_TAGS.forEach(tag => sceditor.formats.bbcode.remove(tag))
    this.extraBBcode.forEach((template) => {
      let name = template.name.toLowerCase();
      console.log("☘️Adding Template", name, template);
      sceditor.formats.bbcode.set(name, {
        tags: {
          [template.parentName]: {
            "data-template-match-name": template.name.toLowerCase(),
          },
        },
        allowsEmpty: true,
        isSelfClosing: template.selfClose,
        format: format(template),
        html: html(template, this.s9ePreview)
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

    this.instance.width('100%');
    const root = document.documentElement;
    const bodyBg = getComputedStyle(root).getPropertyValue('--body-bg').trim();
    const controlColor = getComputedStyle(root).getPropertyValue('--control-color').trim();
    this.instance.css('body {background-color: ' + bodyBg + '; color: ' + controlColor + ' !important;}');
    this.instance.focus();

    let iframe = this.instance.getContentAreaContainer() as HTMLIFrameElement;
    this.tempEl = $(iframe.parentElement!).find("textarea")[0];

    const callInputListeners = (e: Event) => {
      this.params?.inputListeners.forEach((listener: any) => {
        listener.call(iframe);
      });

      e.redraw = false;
    };

    this.el.oninput = callInputListeners;
    this.el.onclick = callInputListeners;
    this.el.onkeyup = callInputListeners;

    (['keyup', 'keydown', 'keypress', 'blur', 'focus'] as BindEvent[]).forEach((event: BindEvent) => {
      this.instance!.bind(event, (e: Event) => {
        params.oninput(this.instance!.val());
        callInputListeners(e);
      });
    });

    let iframeDoc = iframe.contentDocument!;
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
    let range = this.rangeHelper!.selectedRange();

    return [range.startOffset, range.endOffset];
  }

  /**
   * Get (at most) the last N characters from the current "text block".
   */
  getLastNChars(n: number) {
    const value = this.instance!.val();
    // console.log(value);

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

    this.instance!.insert(text);
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

    this.rangeHelper!.selectRange(range);
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
    const isSourceMode = this.instance!.sourceMode();
    if (isSourceMode) {
      const relCoords = getCaretCoordinates(this.el, position);

      return {
        top: relCoords.top - this.el.scrollTop,
        left: relCoords.left,
      };
    }
    let node = this.instance!.currentNode();
    if (!node) return {
      top: 0,
      left: 0
    }
    if (node.nodeType === 3) {
      let parent = node.parentNode! as HTMLElement;
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
    const rect = (node as HTMLElement).getBoundingClientRect();
    const left = rect.left + rect.width;
    const top = rect.top + rect.height;
    console.log(node, left, top);
    return {
      left,
      top,
    };
  }

  focus() {
    this.instance!.focus();
  }

  destroy() {
    this.instance!.destroy();
  }

  disabled(disabled: boolean) {
    this.instance!.readOnly(disabled);
  }
}
