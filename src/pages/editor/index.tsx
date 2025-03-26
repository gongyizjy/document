import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as Y from "yjs";
import { HocuspocusProvider, WebSocketStatus } from "@hocuspocus/provider";
import { EditorContent, useEditor } from "@tiptap/react";
import LinkMenu from "@/components/menus/LinkMenu/LinkMenu";
import TextMenu from "@/components/menus/TextMenu/TextMenu";
import { ContentItemMenu } from "@/components/menus/ContentItemMenu";
import ColumnMenu from "@/extensions/MultiColumn/menu/ColumnsMenu";
import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import ImageBlockMenu from "@/extensions/ImageBlock/components/ImageBlockMenu";
import { useUserInfo } from "@/store";
import extensionsKit from "@/extensions/extension-kit";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import { Sidebar } from "@/components/Sidebar";
import { userColors } from "@/utils/constants";
import { randomElement } from "@/utils";
import { EditorUser } from "./types";
import EditorHeader from "./components/EditorHeader";
import { useSidebar } from "@/hooks/useSidebar";
import { Spin } from "antd";

function DocEditor() {
  const { userInfo } = useUserInfo();
  const menuContainerRef = useRef(null);
  const [users, setUsers] = useState<EditorUser[]>([]);
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    WebSocketStatus.Connecting
  );
  const { blockId } = useParams();
  const leftSidebar = useSidebar();
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [extension, setExtension] = useState([...extensionsKit]);
  const [documentReady, setDocumentReady] = useState(false);
  const editor = useEditor(
    {
      extensions: extension,
    },
    [extension]
  );

  // 创建 provider 和 ydoc
  useEffect(() => {
    if (!blockId || !userInfo) return;
    const ydoc = new Y.Doc();

    const newProvider = new HocuspocusProvider({
      document: ydoc,
      url: "ws://localhost:1234",
      name: blockId,
      parameters: { blockId },
      token: localStorage.getItem("token") || "",
      onConnect() {
        Promise.resolve().then(() => {
          setDocumentReady(true);
        });
      },
      onStatus({ status }) {
        Promise.resolve().then(() => {
          setCollabState(status);
        });
      },
      onAwarenessUpdate({ states }) {
        Promise.resolve().then(() => {
          const userList: EditorUser[] = [];
          states.forEach((state) => {
            if (state.user) {
              userList.push({
                clientId: state.clientId.toString(),
                name: state.user.name || "Anonymous",
                color: state.user.color || "#000000",
                avatar: state.user.avatar || "",
              });
            }
          });
          setUsers(userList);
        });
      },
    });
    newProvider.awareness?.setLocalStateField("user", {
      name: userInfo.username,
      color: randomElement(userColors),
      avatar: userInfo.avatar || "",
    });
    newProvider.subscribeToBroadcastChannel();
    setExtension([
      ...extensionsKit,
      Collaboration.configure({
        document: ydoc,
        field: "prosemirror",
      }),
      CollaborationCursor.configure({
        provider: newProvider,
        user: {
          name: userInfo.username,
          color: randomElement(userColors),
          avatar: userInfo.avatar || "",
        },
      }),
    ]);

    setProvider(newProvider);

    return () => {
      ydoc.destroy();
      newProvider.disconnect();
      newProvider.destroy();
    };
  }, [blockId, userInfo]);

  // 控制编辑器是否渲染
  if (!documentReady) {
    return (
      <div className="flex items-center justify-center h-full flex-col">
        <Spin />
        <div>正在加载文档...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      {editor && blockId && provider?.status === "connected" && (
        <>
          <Sidebar
            isOpen={leftSidebar.isOpen}
            editor={editor}
            onClose={leftSidebar.close}
          />
          <div className="relative flex flex-col flex-1 h-full overflow-hidden">
            <EditorHeader
              editor={editor}
              collabState={collabState}
              users={users}
              isSidebarOpen={leftSidebar.isOpen}
              toggleSidebar={leftSidebar.toggle}
            />
            <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
            <TextMenu editor={editor} />
            <ContentItemMenu editor={editor} />
            <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
            <ColumnMenu editor={editor} appendTo={menuContainerRef} />
            <LinkMenu editor={editor} appendTo={menuContainerRef} />
            <TableRowMenu editor={editor} appendTo={menuContainerRef} />
            <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          </div>
        </>
      )}
    </div>
  );
}

export default DocEditor;
