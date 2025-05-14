import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as Y from "yjs";
import { message, Spin } from "antd";
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
import EditorHeader from "./components/EditorHeader";
import DocVersion from "./components/DocVersion";
import { useSidebar } from "@/hooks/useSidebar";
import { getPermision } from "@/apis";
import { EditorUser } from "./types";

function DocEditor() {
  const { userInfo } = useUserInfo();
  const menuContainerRef = useRef(null);
  const [users, setUsers] = useState<EditorUser[]>([]);
  const [permission, setPermission] = useState<
    "admin" | "write" | "read" | null
  >(null);
  const [editorShow, setEditorShow] = useState(true);
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
      onCreate({ editor }) {
        editor.view.dom.spellcheck = false;
      },
    },
    [extension]
  );

  // 创建 provider 和 ydoc
  useEffect(() => {
    if (!blockId || !userInfo || !permission) return;
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
                userId: state.user.id,
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
      userId: userInfo.id,
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
          userId: userInfo.id,
        },
      }),
    ]);

    setProvider(newProvider);

    return () => {
      ydoc.destroy();
      newProvider.disconnect();
      newProvider.destroy();
    };
  }, [blockId, permission, userInfo]);

  useEffect(() => {
    if (blockId) {
      getPermision({ type: "doc", targetId: blockId }).then((res) => {
        if (res.data === "read") {
          editor?.setEditable(false);
          message.info("你没有权限编辑该文档");
        }
        setPermission(res.data);
      });
    }
  }, [blockId, editor]);

  if (!permission) {
    return (
      <div className="flex items-center justify-center h-full flex-col w-full">
        <div>你没有权限访问该文档</div>
      </div>
    );
  }

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
          {editorShow ? (
            <div className="relative flex flex-col flex-1 h-full overflow-hidden">
              <EditorHeader
                permission={permission}
                editor={editor}
                collabState={collabState}
                users={users}
                isSidebarOpen={leftSidebar.isOpen}
                toggleSidebar={leftSidebar.toggle}
                setEditorShow={setEditorShow}
              />
              <EditorContent
                editor={editor}
                className="flex-1 overflow-y-auto"
              />
              <TextMenu editor={editor} />
              <ContentItemMenu editor={editor} />
              <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
              <ColumnMenu editor={editor} appendTo={menuContainerRef} />
              <LinkMenu editor={editor} appendTo={menuContainerRef} />
              <TableRowMenu editor={editor} appendTo={menuContainerRef} />
              <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
            </div>
          ) : (
            <DocVersion setEditorShow={setEditorShow} collabEditor={editor} />
          )}
        </>
      )}
    </div>
  );
}

export default DocEditor;
