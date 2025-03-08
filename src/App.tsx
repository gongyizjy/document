import { useRoutes } from "react-router-dom";
import { EditorContent } from "@tiptap/react";
import useBlockEditor from "./hooks/useBlockEditor";
import LinkMenu from "@/components/menus/LinkMenu/LinkMenu";
import TextMenu from "@/components/menus/TextMenu/TextMenu";
import ContentItemMenu from "./components/menus/ContentItemMenu/ContentItemMenu";
import ColumnMenu from "@/extensions/MultiColumn/menu/ColumnsMenu";
import { useRef, useEffect } from "react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import Register from "./pages/auth";
import routes from './router';

export default function App() {
  const { editor, doc } = useBlockEditor();
  const menuContainerRef = useRef(null);
  const routeElement = useRoutes(routes);
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

  return routeElement
}
