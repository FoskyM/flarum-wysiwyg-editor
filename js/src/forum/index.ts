import app from 'flarum/forum/app';
import applyEditor from './applyEditor';
import XSLTMatchUtil from '../common/helper/XLSTMatchUtil';
import { preprocessTags } from './util/templateReplaceUtil';

app.initializers.add('foskym/flarum-wysiwyg-editor', () => {
  preprocessTags();
  preprocessTags();
  applyEditor();
});
