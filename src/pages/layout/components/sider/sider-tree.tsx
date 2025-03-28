import { useCallback, useState } from "react";
import { message, Tooltip, Tree, Input } from "antd";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import {
  RightOutlined,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  getChildDocs,
  // getSpaceFirstChild,
  createDoc,
  TreeItemData,
} from "@/apis";
import { useDocLib, useDocListStore } from "@/store";
import { DocMenu } from "@/containers";
import SelectEmojiPicker from "@/components/select-emoji-picker";
import "./sider-tree.css";

interface SiderTreeProps {
  type: string;
  title: string;
  treeData: TreeItemData[];
}
function SiderTree({ title, treeData, type }: SiderTreeProps) {
  const { updateDocList, createRootDoc, renameDoc, changeEmoji } =
    useDocListStore();
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renamingName, setRenamingName] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();
  const { docLibId } = useDocLib();

  const handleRenameStart = useCallback(
    (blockId: string, currentName: string) => {
      setRenamingId(blockId);
      setRenamingName(currentName);
    },
    []
  );

  const onLoadData = async (node: TreeItemData) => {
    // 如果存在数据的话
    if (node.children && node.children.length > 0) {
      return;
    }
    if (!node.hasChildren) return;
    // 这个是子节点的数据
    const { data } = await getChildDocs(node.blockId);
    updateDocList(data, node);
  };

  const handleTypePlus = async () => {
    if (type === "docs") {
      // 说明当前是我的文档库
      createRootDoc(docLibId);
    }
  };

  const handleCreateDoc = useCallback(
    async (node: TreeItemData) => {
      await createDoc({
        spaceId: node.spaceId,
        blockId: uuid(),
        title: "未命名的文档",
        parentId: node.blockId,
      });
      message.success("创建成功");
      const { data } = await getChildDocs(node.blockId);
      updateDocList(data, node);
      setExpandedKeys((prev) => [...prev, node.key]);
    },
    [updateDocList]
  );

  const titleRender = (node: TreeItemData) => (
    <div className="tree-item">
      <div className="tree-item-title">
        <SelectEmojiPicker
          onSelect={(emoji) => {
            changeEmoji(node.blockId, emoji);
          }}
        >
          <Tooltip title="更换图标">
            <div
              className="emoji"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {node.emoji}
            </div>
          </Tooltip>
        </SelectEmojiPicker>

        {renamingId === node.blockId ? (
          <Input
            autoFocus={true}
            value={renamingName}
            className="absolute left-0"
            onChange={(e) => setRenamingName(e.target.value)}
            onPressEnter={() => {
              renameDoc(renamingId, renamingName);
              setRenamingId(null);
            }}
            onBlur={() => {
              renameDoc(renamingId, renamingName);
              setRenamingId(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          />
        ) : (
          <div className="name">{node.name}</div>
        )}
      </div>
      <div className="tree-item-action">
        <div
          className="toolbar-plus"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleCreateDoc(node);
          }}
        >
          <PlusOutlined className="text-side-icon" />
        </div>

        <DocMenu node={node} onRename={handleRenameStart}>
          <div
            className="toolbar-plus"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              // handleCreateDoc(node);
            }}
          >
            <EllipsisOutlined className="text-side-icon" />
          </div>
        </DocMenu>
      </div>
    </div>
  );

  return (
    <div className="sider-tree-container">
      <div className="sider-tree-title">
        <div className="collapse-btn" onClick={() => setCollapse(!collapse)}>
          <Tooltip title={collapse ? "点击展开" : "点击折叠"}>
            <span className="collapse-title text-side-icon">{title}</span>
            <div
              style={{ display: treeData.length === 0 ? "none" : "block" }}
              className={classNames("collapse-icon", {
                up: !collapse,
                down: collapse,
              })}
            >
              <RightOutlined />
            </div>
          </Tooltip>
        </div>
        {/* 置顶的文档是不需要这个plus的 */}
        {type !== "pin" && (
          <div className="flex items-center">
            <div className="toolbar-plus" onClick={handleTypePlus}>
              <PlusOutlined className="text-side-icon" />
            </div>
            <div
              className={classNames("toolbar-plus", {
                "opacity-0": type !== "space",
              })}
            >
              <EllipsisOutlined />
            </div>
          </div>
        )}
      </div>
      <div className={classNames("sider-tree", { expand: !collapse })}>
        <Tree
          style={{ minHeight: 0 }}
          treeData={treeData}
          titleRender={titleRender}
          loadData={onLoadData}
          expandedKeys={expandedKeys}
          onExpand={(_, { expanded, node }) => {
            if (expanded) {
              setExpandedKeys((prev) => [...prev, node.key]);
            } else {
              setExpandedKeys((prev) => prev.filter((key) => key !== node.key));
            }
          }}
          onSelect={(_, { node }) => {
            navigate(`/docs/${node.blockId}`, { replace: true });
          }}
        />
      </div>
    </div>
  );
}
export default SiderTree;
