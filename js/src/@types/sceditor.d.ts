
type BindEvent = "keyup" | "keydown" | "keypress" | "blur" | "focus" | "contextmenu" | "nodechanged" | "valuechanged" | "selectionchanged" | "pasteraw" | "paste";

interface RangeHelper {
  /**
    *Clones the current range.
   */
  cloneSelected(): Range

  /**
    *Gets the first block level parent of the current selection.
   */
  getFirstBlockParent(node?: Node): Range

  /**
    *Gets the marker for the specified ID.
   */
  getMarker(id: string): Node

  /**
    *Gets the text left or right of the current selection/caret.
   */
  getOuterText(before: boolean, length: number): string

  /**
    *Inserts HTML at the selection.
   */
  insertHTML(startHtml: string, endHtml?: string): any;

  /**
    *Inserts markers at the start and end of the current selection.
   */
  insertMarkers(): any

  /**
    *Inserts a DOM node at the current selection.
    * The DOM nodes must belong to the document they are being inserted in. If they belong to another document, an error will be thrown.
   */
  insertNode(startNode: Node, endNode?: Node): any

  /**
    *Inserts a DOM node at the start or end current selection.
    * The DOM nodes must belong to the document they are being inserted in. If they belong to another document, an error will be thrown.
   */
  insertNodeAt(startNode: Node, endNode?: Node): any

  /**
    *Gets the parent node of the current selection.
   */
  parentNode(): Node | null

  /**
    *Removes the marker for the specified ID.
   */
  removeMarker(id: string): any

  /**
    *Removes the markers inserted by insertMarkers().
   */
  removeMarkers(): any

  /**
    *Restores the range saved by saveRange().
   */
  restoreRange(): any

  /**
    *Restores the range saved by saveRange().
   */
  saveRange(): any

  /**
    *Gets the currently selected HTML.
   */
  selectedHtml(): string

  /**
    *Gets the currently selected Range.
   */
  selectedRange(): Range

  /**
    *Selects the text left and right of the current selection/caret.
    @param left Number of characters left of the current selection to select. Set to 0 to not select any.
    @param right Number of characters right of the current selection to select. Set to 0 to not select any.
   */
  selectOuterText(left: number, right: number): any

  /**
    *Selects the passed DOM range.
   */
  selectRange(range: Range): any
}

type ParserOptions = Partial<{
  breakBeforeBlock: boolean,
  //If to add a newline before block BBCodes.
  breakStartBlock: boolean,
  //If to add a newline the start of block BBCodes.
  breakEndBlock: boolean,
  //If to add a newline to the end of block BBCodes.
  breakAfterBlock: boolean,
  //If to add a newline after block BBCodes.
  fixInvalidNesting: boolean,
  //If to fix invalid nested BBCodes such as block BBCodes inside inline BBCodes.
  fixInvalidChildren: boolean,
  //If fix children which should not be a child of the parent BBCode.
  removeEmptyTags: boolean,
  //If to remove empty tags.
  quoteType: QuoteTypeDef
}>

type QuoteTypeDef = "NeverRunToThisType?";

type SCEditorOptions = Partial<{
  format: "bbcode" | "xhtml",
  toolbar: string,
  toolbarExclude: string,
  style: string,
  fonts: string,
  colors: string,
  locale: string,
  charset: string,
  startInSourceMode: boolean,
  emoticonsEnabled: boolean,
  emoticonsCompat: boolean,
  emoticonsRoot: string,
  emoticons: Record<"dropdown" | "more" | "hidden", Record<string, string>>,
  icons: string,
  width: string | number,
  height: string | number,
  resizeEnabled: boolean,
  resizeMinWidth: number,
  resizeMinHeight: number,
  resizeMaxHeight: number,
  resizeMaxWidth: number,
  resizeHeight: boolean,
  resizeWidth: boolean,
  dateFormat: string,
  toolbarContainer: HTMLElement,
  enablePasteFiltering: boolean,
  readOnly: boolean,
  rtl: boolean,
  autofocus: boolean,
  autofocusEnd: boolean,
  autoExpand: boolean,
  autoUpdate: boolean,
  runWithoutWysiwygSupport: boolean,
  id: string,
  plugins: boolean,
  spellcheck: boolean,
  disableBlockRemove: boolean,
  parserOptions: ParserOptions,
  bbcodeTrim: boolean,
  dropDownCss: Record<keyof SnakeCaseStyleName | keyof CSSStyleDeclaration, string>,
  allowedTags: (keyof HTMLElementTagNameMap)[],
  allowedAttributes: string[],
}>

interface SCEditor {
  /**
   * Translates a string into the language current used by the editor.
  The strings {0}, {1}, {2}, ect. will be replaced with the arguments provided.
   */
  _(str: string, ...arg: string[]): string;

  /**
   * Adds a shortcut handler to the editor. If a handler for the specified shortcut already exists, it will be replaced.
   * The shortcut shoult be a string of keys separated by plus (+) signs and the modifier keys should be ordered ctrl, alt and then shift.
   * 
   * e.g.:
   * 
   * ctrl+alt+s
   * alt+shift+a
   * ctrl+shift+b
   * alt+b
   * Info: The shortcut is bound to both WYSIWYG and source modes. It’s up to the shortcut handler to check which mode the editor is in and take appropriate action.
   */
  addShortcut(shortcut: string, handler: Function): SCEditor;

  /**
   * Binds a handler to the specified events.
   * 
   * Unlike the jQuery bind() method, this method only binds a limited set of supported events.
   * 
   * The supported events are:
   * 
   * keyup
   * keydown
   * keypress
   * blur
   * focus
   * contextmenu
   * nodechanged
   * When the current node containing the selection changes in WYSIWYG mode
   * valuechanged
   * Triggered when the editors value changes (this isn’t called after every key press)
   * selectionchanged When the editors selection changes (triggered a lot)
   * pasteraw
   * paste
  */
  bind(events: BindEvent, func: (e: UIEvent) => void, excludeWysiwyg?: boolean, excludeSource?: boolean): SCEditor;

  /**
   * Triggers the blur event, removing the focus from the editor.
   */
  blur(): SCEditor;

  /**
   * 
   * Binds a function to the blur event.
   * This is just a shortcut
   */
  blur(func: (e: UIEvent) => void, excludeWysiwyg?: boolean, excludeSource?: boolean): SCEditor;


  /**
   * Clears the formatting of the first block level element that contains the cursor.
   */
  clearBlockFormatting(): SCEditor;

  /**
   * Clears the formatting of the passed element by removing all CSS classes, all inline styling and if it isn’t a p or div tag by converting it into a p tag.
   */
  clearBlockFormatting(element: HTMLElement): SCEditor;

  /**
   * Closes any currently open editor dropdown. If there is no currently open dropdown this does nothing.
   * @param focus If to focus the editor after closing the drop down.Default false
   */
  closeDropDown(focus?: boolean): any;


  /**
   * Creates a dropdown menu aligned to the to the menu item mItem.
   * @param mItem The menu button to align the drop down to.
   * @param name The name to give the dropdown. Will add the class sceditor-name to the dropdown.
   * @param content The HTML content of the dropdown.
   */
  createDropDown(mItem: Node, name: string, content: Node): any;

  /**
   * Gets the current inline CSS of the WYSIWYG editor.
   */
  css(): string;
  /**
   * Sets the current inline CSS of the WYSIWYG editor.
   * **Important: Changing the editor CSS can cause browser incompatibility issues.**
   */
  css(css: string): SCEditor;

  /**
   * Gets the current block level DOM node that contains the selection/caret in WYSIWYG mode.
   * Will return null if there is currently no selection or in source mode.
   */
  currentBlockNode(): Node | null;

  /**
   * Gets the current DOM node that contains the selection/caret in WYSIWYG mode.
   * Will return null if there is currently no selection or in source mode.
   */
  currentNode(): Node | null;

  /**
   * Destroys the instance of SCEditor by removing all elements and event handlers, leaving only the original textarea.
   */
  destroy(): any;

  /**
   * Gets the current dimensions of the editor.
   */
  dimensions(): {
    width: number;
    height: number;
  };
  /**
   * Sets the current dimensions of the editor.
   */
  dimensions(width: number | string, height: number | string, save?: boolean): SCEditor;

  /**
   * Gets if emoticons are currently enabled in the editor.
   */
  emoticons(): boolean;

  /**
   * Enables/disables emoticons in the editor.
   */
  emoticons(enabled: boolean): SCEditor;

  /**
   * Executes a native browser content editable command against the WYSIWYG editor.
   * Important: There are some inconsistencies in how commands are handled across browsers and not all browsers support all commands.
   * @param command  Name of the command. See Rich-Text Editing in Mozilla for a list of commands.
   * @param param  Parameter to pass to the command.
   */
  execCommand(command: string, param: string): any

  /**
   * When called, the editors height will be expanded to match the height of it’s content.
   */
  expandToContent(ignoreMax?: boolean): any;

  /**
   * Focuses the editor.
   */
  focus(): SCEditor;

  /**
   * Binds a handler to the focus event. This is just a shortcut
   */
  onFocus(handler: (e: Event) => void, excludeWysiwyg?: boolean, excludeSource?: boolean): SCEditor;

  /**
   * Returns the DOM body element of the WYSIWYG editor.
   */
  getBody(): Node;

  /**
   * Gets the current instance of the rangeHelper class for this editor instance.
   * For more information on the rangeHelper class see the rangeHelper docs.
   */
  getRangeHelper(): RangeHelper;

  /**
   * Gets the current value of the source editor.
   * If using a format that like the BBCode format, this will return the result of the running the value through the format.
   * If the filter parameter is set to false, this will return the unfiltered contents of the source editor (BBCode if using the BBCode format).
   * Info: Using the val() method is the preferred way of getting the editors value. It will check if the editor is in WYSIWYG or source mode and return the appropriate value.
   * @param filter If to filter the value through the current format. Will cause BBCode to be converted to HTML if using the BBCode format.
   */
  getSourceEditorValue(filter: boolean): string;

  /**
   * Gets the WYSIWYG editors current HTML value.
   * If using a format that like the BBCode format, this will return the result of the running the value through the format.
   * If the filter parameter is set to false, this will return the unfiltered contents of the source editor (BBCode if using the BBCode format).
   * Info: Using the val() method is the preferred way of getting the editors value. It will check if the editor is in WYSIWYG or source mode and return the appropriate value.
   * @param filter If to filter the value through the current format. Will cause the HTML to be converted to BBCode if using the BBCode format.
   */
  getWysiwygEditorValue(filter: boolean): string;

  /**
   * Gets the current height of the editor in px.
   */
  height(): number;

  /**
   * Sets the current height of the editor in px.
   */
  height(height: number | string): SCEditor;
  /**
   * Inserts text into the editor at the position of the cursor.
   * If end is not null and there is some selected text, the selected text will be placed between the start and end strings.
   * If there is no selection and end is set, it will just be appended to the end of start before inserting.
   * @param start The value to insert
   * @param filter If to filter the value through any plugins. For example if using the BBCode format, should this filter
   * @param convertEmoticons If to convert emoticons codes (:)) into emoticons.
   * @param mixedValue If to allow both HTML and filtered content (BBCode if using the BBCode format) at the same time. If filter is not set to true this option will have no effect.
   */
  insert(start: string, end?: string, filter?: boolean, convertEmoticons?: boolean, mixedValue?: boolean): SCEditor;

  /**
   * Inserts text into the editor at the position of the cursor.
   * If end is not null and there is some selected text, the selected text will be placed between the start and end strings.
   * If there is no selection and end is set, it will just be appended to the end of start before inserting.
   * @param start The text to insert
   * @param end If not null and there is some text selected, the selected text will be placed between the start and end strings.If there is no selected text, this will just be appended to the end of start.
   */
  insertText(start: string, end?: string): SCEditor;

  /**
   * Gets if the editor is currently in source code mode.
   */
  inSourceMode(): boolean;

  /**
   * Static boolean property. Will be true if the current browser supports WYSIWYG editing.
   */
  isWysiwygSupported: boolean;

  /**
   * Binds a handler to the key down event on the editor.
   */
  keyDown(handler: (e: UIEvent) => void, excludeWysiwyg?: boolean, excludeSource?: boolean): SCEditor;

  /**
   * Binds a handler to the key press event on the editor.
   */
  keyPress(handler: (e: UIEvent) => void, excludeWysiwyg?: boolean, excludeSource?: boolean): SCEditor;

  /**
   * Binds a handler to the key up event on the editor.
   */
  keyUp(handler: (e: UIEvent) => void, excludeWysiwyg?: boolean, excludeSource?: boolean): SCEditor;

  /**
   * Gets if the editor is maximised or not
   */
  maximize(): boolean;

  /**
   * Sets if the editor is maximised or not
   */
  maximize(maximized: boolean): SCEditor;

  /**
   * Binds a handler to the WYSIWYG nodeChanged event.
   * This will fire whenever the DOM node that contains the caret changes.
   * This event will only fire in the WYSIWYG editor as the source editor is text based so doesn’t have any DOM nodes to cause the event.
   */
  nodeChanged(handler: (event: any) => {}): any;

  /**
   * Gets if the editor is read only
   */
  readOnly(): boolean;

  /**
   * Sets the editor to read only
   */
  readOnly(readOnly: boolean): SCEditor;

  /**
   * Removes a shortcut from the editor.
   */
  removeShortcut(shortcut: string): any;

  /**
   * Gets if the editor is in Right-To-Left mode.
   * The default Right-To-Left mode will be picked up from the parent node of the editor.
   */
  rtl(): boolean;

  /**
   * Sets the editor to Right-To-Left mode.
   */
  rtl(rtl: boolean): SCEditor;

  /**
   * Binds a handler to the WYSIWYG selection changed event.
   * This event will fire whenever the selection changes in the WYSIWYG editor.
   */
  selectionChanged(handler: (event: any) => void): any;

  /**
   * Sets the current value of the source editor.
   * Info: Using the val() method is the prefered way of setting the editors value. It will check if the editor is in WYSIWYG or source mode and set the appropriate value.
   */
  setSourceEditorValue(val: string): any;

  /**
   * Sets the current value of the WYSIWYG editor.
   * Info: Using the val() method is the prefered way of setting the editors value. It will check if the editor is in WYSIWYG or source mode and set the appropriate value.
   */
  setWysiwygEditorValue(val: string): any;

  /**
   * Inserts text into the source editor at the position of the cursor.
   * If end is not null and there is some selected text, the selected text will be placed between the start and end strings.
   * If there is no selection and end is set, it will just be appended to the end of start before inserting.
   * Info: Using the insertText() method is the prefered way of inserting text into the editor. It will check if the editor is in WYSIWYG or source mode and insert into the correct one.
   * @param start The text to insert
   * @param end If not null and there is some text selected, the selected text will be placed between the start and end strings.If there is no selected text, this will just be appended to the end of start.
   */
  sourceEditorInsertText(start: string, end: string): any;

  /**
   * Gets if the editor is in source mode.
   */
  sourceMode(): boolean;
  /**
   * Sets the editor to source mode.
   */
  sourceMode(value: boolean): void;

  /**
   * Switches between the WYSIWYG and source modes
   */
  toggleSourceMode(): any;

  /**
   * Unbinds a handler to the specified events.

   * Unlike the jQuery unbind() method, this method only works with a limited set of supported events.
   * 
   * The supported events are:
   * 
   * keyup
   * keydown
   * keypress
   * blur
   * focus
   * contextmenu
   * nodechanged
   * When the current node containing the selection changes in WYSIWYG mode
   * valuechanged
   * Triggered when the editors value changes (this isn’t called after every key press)
   * selectionchanged When the editors selection changes (triggered a lot)
   */
  unbind(event: BindEvent, func: (e: UIEvent) => void, excludeWysiwyg?: boolean, excludeSource?: boolean): SCEditor;

  /**
   * Updates the original textarea that the editor is replacing with the value currently inside the editor.
   */
  updateOriginal(): any;

  /**
   * Gets the current value of the editor.
   * This will return the filtered HTML from the WYSIWYG editor or the unfiltered contents of the source editor.
   * If using a format like the BBCode format, this will return the filtered HTML i.e. BBCode in the case of the BBCode format.
   */
  val(): string;

  /**
   * Sets the value of the editor.
   * If the filter parameter is not set to false the value will be run through the current editor format. This means that if using a format like BBCode, the value passed to this method should be BBCode and not HTML.
   * @param filter If to filter the value through any plugins.
   */
  val(value: string, filter?: boolean): SCEditor;

  /**
   * Gets the current width of the editor in px.
   */
  width(): number;

  /**
   * Sets the width of the editor.
   */
  width(width: number | string): SCEditor;

  /**
  * Inserts HTML into WYSIWYG editor.
  * If end is not null and there is some selected text, the selected text will be placed between the start and end strings.
  * If there is no selection and end is set, it will just be appended to the end of start before inserting.
  * Info: Using the insert() method is the prefered way of inserting HTML into the editor. It will check if the editor is in WYSIWYG or source mode and insert into the correct editor.
  * @param start The html to insert
  * @param end If this is not null and there is some text selected, the selected text will be wrappend in the start and end strings. If there is no selected text, this will just be appended to the end of start
   */
  wysiwygEditorInsertHtml(start: string, end: string): any;

  /**
   * Inserts text into WYSIWYG editor.
   * If end is not null and there is some selected text, the selected text will be placed between the start and end strings.
   * If there is no selection and end is set, it will just be appended to the end of start before inserting.
   * Info: Using the insert() method is the prefered way of inserting HTML into the editor. It will check if the editor is in WYSIWYG or source mode and insert into the correct editor.
   * @param start The text to insert
   * @param end If this is not null and there is some text selected, the selected text will be wrappend in the start and end strings. If there is no selected text, this will just be appended to the end of start
   */
  wysiwygEditorInsertText(start: string, end?: string): any;


  getContentAreaContainer(): HTMLElement

  formats: {
    bbcode: {
      set(name: string, bbcode: BBCode): any
      get(name: string): BBCode
      remove(name: string): any
    }
  }
  BBCodeParser: {
    QuoteType: {
      always: QuoteTypeDef
      never: QuoteTypeDef
      auto: QuoteTypeDef
    }
  }
}

interface GlobalSCEditor extends SCEditor {
  create(element: HTMLElement, options?: SCEditorOptions): SCEditor
  instance(element: HTMLElement): SCEditor
}

type CamelToSnakeCase<S extends string> =
  S extends `${infer T}${infer U}` ?
  `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}` :
  S;
type SnakeCaseStyleName = { [K in keyof CSSStyleDeclaration as CamelToSnakeCase<K & string>]: any };

type BBCode = Partial<{
  styles: Partial<Record<keyof SnakeCaseStyleName, string[] | null>>,
  tags: Partial<Record<keyof HTMLElementTagNameMap, null | Record<string, null | string[]>>>
  isSelfClosing: boolean,
  isInline: boolean,
  isHtmlInline: boolean,
  allowedChildren: string[] | null,
  allowsEmpty: boolean,
  excludeClosing: boolean,
  skipLastLineBreak: boolean,
  strictMatch: boolean,

  breakBefore: boolean,
  breakStart: boolean,
  breakEnd: boolean,
  breakAfter: boolean,

  format: string | ((element: HTMLElement, content: string) => string),
  html: string | ((token: any, attrs: { defaultattr: string, [key: string]: any }, content: string) => string),

  quoteType: QuoteTypeDef

}>

declare global {
  var sceditor: GlobalSCEditor;
}
export { BBCode, GlobalSCEditor, SCEditor, CamelToSnakeCase, SCEditorOptions, ParserOptions, QuoteTypeDef, RangeHelper, BindEvent }