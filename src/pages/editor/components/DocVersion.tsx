import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, List } from "antd";
import {
  getVersion,
  VersionInfo,
  getVersionContent,
  VersionContent,
} from "@/apis";
import { TiptapTransformer } from "@hocuspocus/transformer";
import * as Y from "yjs";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import extensionsKit from "@/extensions/extension-kit";
import formatTime from "@/utils/formatTime";

interface DocVersionProps {
  collabEditor?: Editor;
  setEditorShow: (show: boolean) => void;
}
function DocVersion({ setEditorShow, collabEditor }: DocVersionProps) {
  const [currentVersionContent, setCurrentVersionContent] =
    useState<Uint8Array | null>(null);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);
  const [versions, setVersions] = useState<VersionInfo[]>([]);
  const { blockId } = useParams();
  const versionEditor = useEditor({
    extensions: extensionsKit,
    onCreate({ editor }) {
      editor.view.dom.spellcheck = false;
    },
  });

  useEffect(() => {
    if (blockId) {
      getVersion(blockId).then((res) => {
        res.data[0].description = "当前版本";
        setVersions(res.data);

        getVersionContent(res.data[0].versionId).then((res) => {
          const content = res.data as VersionContent;
          const data = new Uint8Array(content.data);
          setCurrentVersionContent(data);
          const ydoc = new Y.Doc();
          Y.applyUpdate(ydoc, data);
          if (versionEditor) {
            versionEditor?.commands.setContent(
              TiptapTransformer.fromYdoc(ydoc, "prosemirror")
            );
          }
        });
      });
    }
  }, [blockId, versionEditor]);
  useEffect(() => {
    versionEditor?.setEditable(false);
  }, [versionEditor]);
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-start">
        <Button type="primary" onClick={() => setEditorShow(true)}>
          返回文档
        </Button>
        <Button
          type="default"
          className="ml-8"
          // disabled={versions[0].versionId === currentVersion || true}
          onClick={() => {
            console.log("回退版本");
            if (currentVersionContent) {
              const ydoc = new Y.Doc();
              Y.applyUpdate(ydoc, currentVersionContent);
              if (collabEditor) {
                collabEditor?.commands.setContent(
                  TiptapTransformer.fromYdoc(ydoc, "prosemirror")
                );
              }
            }
          }}
        >
          回退版本
        </Button>
      </div>
      <div className="flex flex-1">
        <div className="flex-1">
          <EditorContent editor={versionEditor} />
        </div>
        <List
          size="small"
          className=" w-[200px]  border border-solid border-[#d9d9d9] h-full"
          itemLayout="vertical"
          dataSource={versions}
          renderItem={(item) => (
            <List.Item
              className="cursor-pointer"
              onClick={() => {
                setCurrentVersion(item.versionId);
                getVersionContent(item.versionId).then((res) => {
                  const content = res.data as VersionContent;
                  const data = new Uint8Array(content.data);
                  const ydoc = new Y.Doc();
                  setCurrentVersionContent(data);
                  Y.applyUpdate(ydoc, data);
                  versionEditor?.commands.setContent(
                    TiptapTransformer.fromYdoc(ydoc, "prosemirror")
                  );
                });
              }}
            >
              <p>{formatTime(item.createdAt)}</p>
              <p>修改人：{item.username}</p>
              {item.description ? <p>{item.description}</p> : null}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
export default DocVersion;
