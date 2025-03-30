import { useEffect } from "react";
import SiderTree from "./sider-tree";
import { useSpaceList } from "@/store";
function SiderSpace() {
  const { pinSpaceList, fetchSpaceList } = useSpaceList();

  useEffect(() => {
    fetchSpaceList();
  }, [fetchSpaceList]);

  return <SiderTree title="置顶的空间" type="space" treeData={pinSpaceList} />;
}
export default SiderSpace;
