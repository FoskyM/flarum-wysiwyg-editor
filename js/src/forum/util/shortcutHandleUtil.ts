import { SCEditor } from "../../@types/sceditor";

const Shortcuts = {
  bold: {
    shortcut: 'Ctrl+B',
    tag: 'b',
  },
  italic: {
    shortcut: 'Ctrl+I',
    tag: 'i',
  },
  underline: {
    shortcut: 'Ctrl+U',
    tag: 'u',
  },
}

export function handleShortcuts(editor: SCEditor) {
  for (const [key, value] of Object.entries(Shortcuts)) {
    editor.addShortcut(value.shortcut, function() {
      // @ts-ignore
      // editor.execCommand(key);
      if (editor.inSourceMode()) return;
      setTimeout(() => {
        let node = editor.currentNode() as HTMLElement;
        node = node.parentElement as HTMLElement;
        if (node.tagName === value.tag.toUpperCase()) {
          node.setAttribute('data-template-match-name', value.tag);
        }
      }, 10);
    });
  }
}