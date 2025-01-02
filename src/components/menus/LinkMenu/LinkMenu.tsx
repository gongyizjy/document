import { BubbleMenu as BaseBubbleMenu, useEditorState } from "@tiptap/react";
import { useState, useCallback } from "react";
import { MenuProps } from "../types";
import LinkEditorPanel from "./LinkEditorPanel";
import LinkPreviewPanel from "./LinkPreviewPanel";
export default function LinkMenu({ editor, appendTo }: MenuProps) {
  const [showEdit, setShowEdit] = useState(false);
  const { link, target } = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx.editor.getAttributes("link");
      return { link: attrs.href, target: attrs.target };
    },
  });
  const onSetLink = useCallback(
    (url: string, openInNewTab: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: openInNewTab ? "_blank" : "_self" })
        .run();
      setShowEdit(false);
    },
    [editor]
  );
  
  const handleEdit = useCallback(() => {
    setShowEdit(true);
  }, []);
  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowEdit(false);
    return null;
  }, [editor]);
  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("link");
    return isActive;
  }, [editor]);
  return (
    <BaseBubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      pluginKey="textMenu"
      updateDelay={0}
      tippyOptions={{
        popperOptions: {
          modifiers: [
            {
              name: "flip",
              enabled: true,
              options: {
                fallbackPlacements: ["bottom"],
              },
            },
            {
              name: "preventOverflow",
              enabled: true,
              options: {
                boundary: "viewport",
                padding: 8,
              },
            }
          ],
        },
        appendTo: () => appendTo?.current,
        onHidden: () => {
          setShowEdit(false);
        },
      }}
    >
      {showEdit ? (
        <LinkEditorPanel
          initialUrl={link}
          initialOpenInNewTab={target === "_blank"}
          onSetLink={onSetLink}
        />
      ) : (
        <LinkPreviewPanel
          url={link}
          onEdit={handleEdit}
          onClear={onUnsetLink}
        />
      )}
    </BaseBubbleMenu>
  );
}
