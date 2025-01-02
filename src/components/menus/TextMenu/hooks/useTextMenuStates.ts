import isTextSelected from "@/utils/isTextSelected";
import { Editor, useEditorState } from "@tiptap/react";
import { useCallback } from "react";
import { ShouldShowProps } from "../../types";
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
      };
    },
  });

  const shouldShow = useCallback(
    ({ view }: ShouldShowProps) => {
      if (!view || editor.view.dragging) {
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
