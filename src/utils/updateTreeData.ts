import { TreeItemData } from "@/apis";
import { produce } from "immer";

const updateTreeData = (
  list: TreeItemData[],
  key: string,
  updates: Partial<TreeItemData>,
  children: TreeItemData[]
): TreeItemData[] =>
  produce(list, (draft: TreeItemData[]) => {
    const traverse = (nodes: TreeItemData[]) => {
      for (const node of nodes) {
        if (node.key === key) {
          // 更新节点属性
          Object.assign(node, updates);
          // 如果提供了子节点，也更新子节点
          if (children !== undefined) {
            node.children = children;
          }
          return;
        }
        if (node.children) traverse(node.children);
      }
    };
    traverse(draft);
  });

export default updateTreeData;
