import app from 'flarum/forum/app';
import applyEditor from './applyEditor';

app.initializers.add('foskym/flarum-wysiwyg-editor', () => {
  applyEditor();
});
