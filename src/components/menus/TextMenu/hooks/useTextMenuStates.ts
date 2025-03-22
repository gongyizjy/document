import isTextSelected from "@/utils/isTextSelected";
import { Editor, useEditorState } from "@tiptap/react";
import { useCallback } from "react";
import { ShouldShowProps } from "../../types";
import isCustomNodeSelected from "@/utils/isCustomNodeSelected";
export const useTextMenuStates = (editor: Editor) => {
  const states = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold"),
        isItalic: ctx.editor.isActive("italic"),
        isStrike: ctx.editor.isActive("strike"),
        isUnderline: ctx.editor.isActive("underline"),
        isCode: ctx.editor.isActive("code"),
        currentSize:
          ctx.editor.getAttributes("textStyle")?.fontSize || undefined,
        currentColor: ctx.editor.getAttributes("textStyle")?.color || undefined,
        currentAlign: ctx.editor.isActive({ textAlign: "left" })
          ? "left"
          : ctx.editor.isActive({ textAlign: "center" })
          ? "center"
          : ctx.editor.isActive({ textAlign: "right" })
          ? "right"
          : "left",
        isHighlight: ctx.editor.isActive("highlight"),
        isSubscript: ctx.editor.isActive("subscript"),
        isSuperscript: ctx.editor.isActive("superscript"),
      };
    },
  });

  const shouldShow = useCallback(
    ({ view, from }: ShouldShowProps) => {
      if (!view || editor.view.dragging) {
        return false;
      }

      const domAtPos = view.domAtPos(from || 0).node as HTMLElement;
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement;
      const node = nodeDOM || domAtPos;

      if (isCustomNodeSelected(editor, node)) {
        return false;
      }

      return isTextSelected({ editor });
    },
    [editor]
  );

  return {
    shouldShow,
    ...states,
  };
};
