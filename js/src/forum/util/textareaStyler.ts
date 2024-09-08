import { SCEditor } from "../../@types/sceditor";

export function makeWrapTextarea(textarea: HTMLTextAreaElement, editor: SCEditor) {
    return new Proxy(textarea, {
        get(target, prop) {
            if (prop === 'focus') {
                if (editor.sourceMode())
                    return target.focus.bind(target);

                if (editor.getRangeHelper().selectedRange().collapsed)
                    editor.insert("WYSIWGY_FLAG_SELECTRANGESTART")
                else
                    editor.insert("WYSIWGY_FLAG_SELECTRANGESTART", "WYSIWGY_FLAG_SELECTRANGEEND")
                const text = editor.val();
                const startIndex = text.indexOf("WYSIWGY_FLAG_SELECTRANGESTART");
                const endIndex = text.indexOf("WYSIWGY_FLAG_SELECTRANGEEND");
                target.value = text.replace(/WYSIWGY_FLAG_SELECTRANGESTART/g, "").replace(/WYSIWGY_FLAG_SELECTRANGEEND/g, "");

                if (startIndex !== -1 && endIndex !== -1) {
                    target.setSelectionRange(startIndex, endIndex - "WYSIWGY_FLAG_SELECTRANGESTART".length);
                }
                return target.focus.bind(target);
            } else if (prop === "value") {
                return target.value;
            }
            const a = Reflect.get(target, prop);
            if (typeof a == "function") return a.bind(target);
            return a;
        },
        set(target, prop, value) {
            if (prop === 'value') {
                target.value = value;
                if (!editor.sourceMode()) {
                    editor.val(value, true);
                }
                // textarea undo history
                let event = new CompositionEvent('compositionend', {
                    bubbles: true,
                    cancelable: true,
                    data: value
                });
                target.dispatchEvent(event);
            }
            return Reflect.set(target, prop, value);
        }
    })
}