import app from 'flarum/common/app';
import { extend, override } from 'flarum/common/extend';

import Button from 'flarum/common/components/Button';
import TextEditor from 'flarum/common/components/TextEditor';
import Composer from 'flarum/forum/components/Composer';
import Tooltip from 'flarum/common/components/Tooltip';
import classList from 'flarum/common/utils/classList';

// import MenuState from './MenuState';
// import ProseMirrorMenu from './ProseMirrorMenu';
import BBcodeEditorDriver from './BBcodeEditorDriver';

export default function applyEditor() {
  let instance: any = null;
  extend(TextEditor.prototype, 'controlItems', function (items) {
    // if (!app.forum.attribute('toggleRichTextEditorButton')) return;

    // const buttonOnClick = () => {
    //   app.session.user.savePreferences({ useRichTextEditor: !app.session.user.preferences().useRichTextEditor }).then(() => {
    //     app.composer.editor.destroy();
    //     this.attrs.composer.editor = this.buildEditor(this.$('.TextEditor-editorContainer')[0]);
    //     m.redraw.sync();
    //     app.composer.editor.focus();
    //   });
    // };

    items.add(
      'rich-text',
      <Tooltip text={'切换富文本模式'}>
        <Button icon="fas fa-pen-fancy" className={classList({ Button: true, 'Button--icon': true })} onclick={() => {
          instance.toggleSourceMode();
        }} />
      </Tooltip>,
      -10
    );
  });

  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    // if (!app.session.user.preferences().useRichTextEditor) return;
    items.remove('markdown');
    // items.add('prosemirror-menu', <ProseMirrorMenu state={this.menuState} />, 100);
  });

  extend(TextEditor.prototype, 'buildEditorParams', function (items) {
    // if (!app.session.user.preferences().useRichTextEditor) return;

    // items.menuState = this.menuState = new MenuState();
    items.classNames.push('Post-body');
    items.escape = () => app.composer.close();
    m.redraw();
  });

  override(TextEditor.prototype, 'buildEditor', function (original, dom) {
    // if (app.session.user.preferences().useRichTextEditor) {
    let editor = new BBcodeEditorDriver(dom, this.buildEditorParams());
    instance = editor.getInstance();
    return editor;
    // }

    return original(dom);
  });

  extend(Composer.prototype, 'updateHeight', function () {
    if (!instance) return;
    let composer = document.querySelector('#composer');
    let height = composer?.clientHeight - 120;
    instance.height(height);
  });
}
