import { useEffect, useMemo, useState } from "react";
import { message, Tooltip, Tree } from "antd";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import { produce } from "immer";
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
import { useDocLib } from "@/store";
import "./sider-tree.css";

interface SiderTreeProps {
  type: string;
  title: string;
  treeData: TreeItemData[];
}
function SiderTree({ title, treeData, type }: SiderTreeProps) {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [list, setList] = useState<TreeItemData[]>([]);
  const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();
  const { docLibId } = useDocLib();
  const processTreeData = (data: TreeItemData[]) => {
    return data.map((node) => ({
      ...node, // 保留原有所有属性
      isLeaf: !node.hasChildren, // hasChildren 为 false 时设置为叶子节点
    }));
  };
  const initiakProcessedData = useMemo(() => {
    return processTreeData(treeData || []);
  }, [treeData]);

  // 更新树结构
  const updateTreeData = (
    list: TreeItemData[],
    key: string,
    children: TreeItemData[]
  ): TreeItemData[] =>
    produce(list, (draft: TreeItemData[]) => {
      const traverse = (nodes: TreeItemData[]) => {
        for (const node of nodes) {
          if (node.key === key) {
            node.children = children;
            return;
          }
          if (node.children) traverse(node.children);
        }
      };
      traverse(draft);
    });

  const onLoadData = async (node: TreeItemData) => {
    // 如果存在数据的话
    if (node.children && node.children.length > 0) {
      return;
    }
    if (!node.hasChildren) return;
    // 这个是子节点的数据
    const { data } = await getChildDocs(node.blockId);
    const processedChildren = data.map((child) => ({
      ...child,
      isLeaf: !child.hasChildren,
    }));
    setList((prev) => updateTreeData(prev, node.blockId, processedChildren));
  };

  const handleTypePlus = () => {
    if (type === "docs") {
      // 说明当前是我的文档库
      createDoc({
        spaceId: docLibId,
        blockId: uuid(),
        title: "未命名的文档",
      }).then(() => {
        message.success("创建成功");
      });
    }
  };

  const handleCreateDoc = async (node: TreeItemData) => {
    await createDoc({
      spaceId: node.spaceId,
      blockId: uuid(),
      title: "未命名的文档",
      parentId: node.blockId,
    });
    message.success("创建成功");
    setExpandedKeys((prev) => [...prev, node.key]);
  };

  const titleRender = useMemo(
    () => (node: TreeItemData) => {
      return (
        <div className="tree-item">
          <div className="tree-item-title">
            <div className="emoji">{node.emoji}</div>
            <div className="name">{node.name}</div>
          </div>
          <div className="tree-item-action">
            <Tooltip title="创建文档">
              <div
                className="toolbar-plus"
                onClick={() => handleCreateDoc(node)}
              >
                <PlusOutlined />
              </div>
            </Tooltip>
            <Tooltip title="操作">
              <div className="toolbar-plus">
                <EllipsisOutlined />
              </div>
            </Tooltip>
          </div>
        </div>
      );
    },
    []
  );

  useEffect(() => {
    setList(initiakProcessedData);
  }, [initiakProcessedData]);

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
          treeData={list}
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
