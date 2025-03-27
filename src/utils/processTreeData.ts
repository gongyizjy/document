import { TreeItemData } from "@/apis";
const processTreeData = (data: TreeItemData[]) => {
  return data.map((node) => ({
    ...node, // 保留原有所有属性
    isLeaf: !node?.hasChildren || false,
  }));
};

export default processTreeData;
