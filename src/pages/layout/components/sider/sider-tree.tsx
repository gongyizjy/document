import { useState } from "react";
import { Tooltip, Tree } from "antd";
import { DataNode } from "antd/es/tree";
import classNames from "classnames";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { getChildDocs, getSpaceFirstChild, TreeItemData } from "@/apis";
import "./sider-tree.css";

interface SiderTreeProps {
  title: string;
  treeData: TreeItemData[];
}
function SiderTree({ title }: SiderTreeProps) {
  const [collapse, setCollapse] = useState(false);
  const [treeData, setTreeData] = useState<TreeItemData[]>([]);

  const updateTreeData = (
    list: TreeItemData[],
    key: string,
    children: TreeItemData[]
  ): TreeItemData[] =>
    list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const loadData = (node: TreeItemData): Promise<TreeItemData[]> => {
    const getList = node.type === 1 ? getSpaceFirstChild : getChildDocs;
    return getList(node.key).then((response) =>
      Array.isArray(response.data) ? response.data : [response.data]
    );
  };

  const onExpand = (
    expandedKeys: string[],
    { expanded, node }: { expanded: boolean; node: DataNode }
  ) => {
    if (expanded && !node.children) {
      loadData(node as TreeItemData).then((data: TreeItemData[]) => {
        setTreeData((origin) =>
          updateTreeData(origin, node.key as string, data)
        );
      });
    }
  };

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

        <div className="toolbar">
          <PlusOutlined />
        </div>
      </div>
      <Tree 
        
        treeData={treeData} 
      />
      <div style={{ height: "12px", width: "100%", userSelect: "none" }} />
    </div>
  );
}
export default SiderTree;
