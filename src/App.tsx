import { EditorContent } from "@tiptap/react";
import useBlockEditor from "./hooks/useBlockEditor";
import TextMenu from "@/components/menus/TextMenu/TextMenu";
export default function App() {
  const { editor } = useBlockEditor();
  if (!editor) {
    return null
  }
  // editor.on('update', ({ editor }) => {
  //   const textContent = editor.getJSON();
  //   console.log(textContent);
  // });
  
  return (
    <div>
      <EditorContent editor={editor} />
      <TextMenu editor={editor} />
    </div>
  )
}
