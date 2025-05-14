import { useState } from "react";
import { useEditorState } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import { Icon } from "@/components/ui/Icon";
import { WebSocketStatus } from "@hocuspocus/provider";
import Toolbar from "@/components/ui/Toolbar";
import { EditorUser } from "../types";
import { EditorInfo } from "./EditorInfo";
import Share from "./Share";
import { Button } from "antd";

export interface EditorHeaderProps {
  isSidebarOpen?: boolean;
  permission: "admin" | "write" | "read" | null;
  toggleSidebar?: () => void;
  editor: Editor;
  collabState: WebSocketStatus;
  users: EditorUser[];
  setEditorShow: (show: boolean) => void;
}

function EditorHeader({
  editor,
  permission,
  collabState,
  users,
  isSidebarOpen,
  toggleSidebar,
  setEditorShow,
}: EditorHeaderProps) {
  // const [isEditable, setIsEditable] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const { characters, words } = useEditorState({
    editor,
    selector: (ctx) => {
      const { characters, words } = ctx.editor?.storage.characterCount || {
        characters: () => 0,
        words: () => 0,
      };
      return { characters: characters(), words: words() };
    },
  });
  return (
    <div className="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200">
      <div className="flex flex-row gap-x-1.5 items-center">
        <div className="flex items-center gap-x-1.5">
          <Toolbar.Button
            tooltip={isSidebarOpen ? "收起目录" : "展开目录"}
            onClick={toggleSidebar}
            active={isSidebarOpen}
            className={isSidebarOpen ? "bg-transparent" : ""}
          >
            <Icon name={isSidebarOpen ? "PanelLeftClose" : "PanelLeft"} />
          </Toolbar.Button>
        </div>
      </div>
      <div className="flex gap-x-3 items-center">
        {permission === "admin" && (
          <>
            <Share type="popover" open={isShareOpen} onOpen={setIsShareOpen} />
            <Button onClick={() => setEditorShow(false)}>历史记录</Button>
          </>
        )}
        <Toolbar.Button
          tooltip="撤销"
          disabled={!editor.can().undo()}
          onClick={() => {
            editor.chain().focus().undo().run();
          }}
        >
          <Icon name="Undo" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="重做"
          disabled={!editor.can().redo()}
          onClick={() => {
            editor.chain().focus().redo().run();
          }}
        >
          <Icon name="Redo" />
        </Toolbar.Button>

        <EditorInfo
          characters={characters}
          words={words}
          collabState={collabState}
          users={users}
        />
      </div>
    </div>
  );
}

export default EditorHeader;
