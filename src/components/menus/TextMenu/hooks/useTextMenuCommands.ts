import { Editor } from "@tiptap/core";
import { useCallback } from "react";

export const useTextMenuCommands = (editor: Editor) => {
  const onBold = useCallback(
    () => editor.chain().focus().toggleBold().run(),
    [editor]
  );
  const onItalic = useCallback(
    () => editor.chain().focus().toggleItalic().run(),
    [editor]
  );
  const onUnderline = useCallback(
    () => editor.chain().focus().toggleUnderline().run(),
    [editor]
  );
  const onStrike = useCallback(
    () => editor.chain().focus().toggleStrike().run(),
    [editor]
  );
  const onCode = useCallback(
    () => editor.chain().focus().toggleCode().run(),
    [editor]
  );
  const onClearCode = useCallback(
    () => editor.chain().focus().unsetCode().run(),
    [editor]
  );
  const onSetFontSize = useCallback(
    (fontSize: string) => {
      if (!fontSize || fontSize.length === 0) {
        return editor.chain().focus().unsetFontSize().run();
      }
      return editor.chain().focus().setFontSize(fontSize).run();
    },
    [editor]
  );
  const onColor = useCallback(
    (color: string) => editor.chain().focus().setColor(color).run(),
    [editor]
  );
  const onTextAlign = useCallback(
    (align: string) => editor.chain().setTextAlign(align).run(),
    [editor]
  );
  const onLink = useCallback(
    (url: string, inNewTab: boolean) =>
      editor
        .chain()
        .focus()
        .setLink({ href: url, target: inNewTab ? "_blank" : "_self" })
        .run(),
    [editor]
  );
  const onHighlight = useCallback(
    () => editor.chain().focus().toggleHighlight().run(),
    [editor]
  );
  const onSubscript = useCallback(
    () => editor.chain().focus().toggleSubscript().run(),
    [editor]
  );
  const onSuperscript = useCallback(
    () => editor.chain().focus().toggleSuperscript().run(),
    [editor]
  );
  const onDelete = useCallback(
    () => editor.commands.deleteNode("paragraph"),
    [editor]
  );

  return {
    onBold,
    onItalic,
    onUnderline,
    onStrike,
    onSetFontSize,
    onCode,
    onClearCode,
    onColor,
    onTextAlign,
    onLink,
    onHighlight,
    onSubscript,
    onSuperscript,
    onDelete,
  };
};
