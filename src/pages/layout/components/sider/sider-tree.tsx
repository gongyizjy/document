import { useCallback, useState } from "react";
import { message, Tooltip, Tree } from "antd";
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
import "./sider-tree.css";

interface SiderTreeProps {
  type: string;
  title: string;
  treeData: TreeItemData[];
}
function SiderTree({ title, treeData, type }: SiderTreeProps) {
  const { updateDocList, createRootDoc } = useDocListStore();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();
  const { docLibId } = useDocLib();
  
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
      createRootDoc(docLibId)
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
        <div className="emoji">{node.emoji}</div>
        <div className="name">{node.name}</div>
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
          <PlusOutlined />
        </div>

        <DocMenu node={node}>
          <div
            className="toolbar-plus"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              // handleCreateDoc(node);
            }}
          >
            <EllipsisOutlined />
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
            <span className="collapse-title">{title}</span>
            <div
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
        {type !== "doc" && (
          <div className="flex items-center">
            <div className="toolbar-plus" onClick={handleTypePlus}>
              <PlusOutlined />
            </div>
            <div className="toolbar-plus opacity-0" onClick={handleTypePlus}>
              <PlusOutlined />
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
      <div style={{ height: "12px", width: "100%", userSelect: "none" }} />
    </div>
  );
}
export default SiderTree;
