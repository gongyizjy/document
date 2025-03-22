import { useRoutes } from "react-router-dom";
import { EditorContent } from "@tiptap/react";
import useBlockEditor from "./hooks/useBlockEditor";
import LinkMenu from "@/components/menus/LinkMenu/LinkMenu";
import TextMenu from "@/components/menus/TextMenu/TextMenu";
import { ContentItemMenu } from "./components/menus/ContentItemMenu";
import ColumnMenu from "@/extensions/MultiColumn/menu/ColumnsMenu";
import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import ImageBlockMenu from "@/extensions/ImageBlock/components/ImageBlockMenu";
import { useRef, useEffect } from "react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import Register from "./pages/auth";
import routes from "./router";

export default function App() {
  const { editor, doc } = useBlockEditor();
  const menuContainerRef = useRef(null);
  const routeElement = useRoutes(routes);
  // useEffect(() => {
  //   if (editor && doc) {
  //     const provider = new HocuspocusProvider({
  //       name: "f2c3fbc5-45bf-49b6-88eb-6a2449d1e247",
  //       document: doc,
  //       url: "ws://localhost:1234",
  //       parameters: {
  //         blockId: "f2c3fbc5-45bf-49b6-88eb-6a2449d1e247",
  //       },
  //       token: localStorage.getItem("token"),
  //       broadcast: true,
  //       onAuthenticated: () => {
  //         console.log("authenticated");
  //       },
  //       // onAuthenticationFailed: ({ reason }) => {

  //       // },
  //       onClose: ({ event }) => {
  //         console.log('WebSocket closed with code:', event.code);
  //         console.log('Close reason:', event.reason);
  //         if (event.code === 4401 && event.reason === "Unauthorized") {
  //           window.location.href = "/auth/login";
  //         }
  //       },
  //     });
  //     provider.subscribeToBroadcastChannel()
  //   }
  // }, [editor, doc]);

  if (!editor) {
    return null;
  }

  return (
    <div ref={menuContainerRef}>
      <TextMenu editor={editor} />
      <ContentItemMenu editor={editor} />
      <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      <ColumnMenu editor={editor} appendTo={menuContainerRef} />
      <LinkMenu editor={editor} appendTo={menuContainerRef} />
      <TableRowMenu editor={editor} appendTo={menuContainerRef} />
      <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
      <EditorContent editor={editor} />
    </div>
  );
}
