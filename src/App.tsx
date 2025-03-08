import { EditorContent } from "@tiptap/react";
import useBlockEditor from "./hooks/useBlockEditor";
import LinkMenu from "@/components/menus/LinkMenu/LinkMenu";
import TextMenu from "@/components/menus/TextMenu/TextMenu";
import ContentItemMenu from "./components/menus/ContentItemMenu/ContentItemMenu";
import ColumnMenu from "@/extensions/MultiColumn/menu/ColumnsMenu";
import { useRef, useEffect } from "react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import Login from "./pages/auth";

export default function App() {
  const { editor, doc } = useBlockEditor();
  const menuContainerRef = useRef(null);
  useEffect(() => {
    if (editor && doc) {
      const provider = new HocuspocusProvider({
        name: "111",
        document: doc,
        url: "ws://localhost:1234",
        broadcast: true,
      });
      provider.subscribeToBroadcastChannel();
    }
  }, [editor, doc]);

  if (!editor) {
    return null;
  }

  return (
    <Login />
    // <div ref={menuContainerRef}>
    //   <EditorContent editor={editor} />
    //   <TextMenu editor={editor} />
    //   <ContentItemMenu editor={editor} />
    //   <ColumnMenu editor={editor} appendTo={menuContainerRef} />
    //   <LinkMenu editor={editor} appendTo={menuContainerRef} />
    // </div>
  );
}
