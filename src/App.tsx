import { EditorContent } from "@tiptap/react";
import useBlockEditor from "./hooks/useBlockEditor";
import LinkMenu from "@/components/menus/LinkMenu/LinkMenu";
import TextMenu from "@/components/menus/TextMenu/TextMenu";
import { useRef } from "react";
export default function App() {
  const { editor } = useBlockEditor();
  const menuContainerRef = useRef(null);
  if (!editor) {
    return null;
  }
  // editor.on('update', ({ editor }) => {
  //   const textContent = editor.getJSON();
  //   console.log(textContent);
  // });

  return (
    <div ref={menuContainerRef}>
      <LinkMenu editor={editor} appendTo={menuContainerRef} />
      <EditorContent editor={editor} />
      <TextMenu editor={editor} />
    </div>
  );
}
