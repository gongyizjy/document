import { useEffect, useMemo, useRef, useState } from "react";
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
import { extensionsKit } from "@/extensions/extension-kit";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import { Sidebar } from "@/components/Sidebar";
import { userColors } from "@/utils/constants";
import { randomElement } from "@/utils";
import { EditorUser } from "./types";
import EditorHeader from "./components/EditorHeader";
import { useSidebar } from "@/hooks/useSidebar";

function DocEditor() {
  const { userInfo } = useUserInfo();
  const menuContainerRef = useRef(null);
  const [users, setUsers] = useState<EditorUser[]>([]);
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    WebSocketStatus.Connecting
  );
  const { blockId } = useParams();
  const leftSidebar = useSidebar();
  const ydoc = useMemo(() => {
    if (!blockId) return null;
    return new Y.Doc();
  }, [blockId]);

  const provider = useMemo(() => {
    if (!blockId || !ydoc) return null; // 等待 blockId 就绪
    return new HocuspocusProvider({
      document: ydoc,
      url: "ws://localhost:1234",
      name: blockId,
      parameters: { blockId },
      token: localStorage.getItem("token") || "",
      // 监听连接状态变化
      onStatus({ status }) {
        setCollabState(status);
      },
      // 监听用户状态变化
      onAwarenessUpdate({ states }) {
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
      },
    });
  }, [blockId, ydoc]);
  useEffect(() => {
    if (!provider) return;

    provider.subscribeToBroadcastChannel();

    return () => {
      provider.destroy();
    };
  }, [provider]);

  const extensions = [...extensionsKit({ provider })];

  if (provider) {
    extensions.push(
      Collaboration.configure({
        document: provider.document,
        field: "prosemirror",
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: userInfo.username,
          color: randomElement(userColors),
          avatar: userInfo.avatar || "",
        },
      })
    );
  }

  const editor = useEditor({
    extensions,
  });

  if (!editor) return null;

  return (
    <div className="flex h-full" ref={menuContainerRef}>
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
    </div>
  );
}

export default DocEditor;
