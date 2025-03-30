import { useEffect } from "react";
import { useDocListStore } from "@/store";
import SiderTree from "./sider-tree";

function SiderPinDoc() {
  const { pinDocList, fetchPinDocList } = useDocListStore();
  useEffect(() => {
    fetchPinDocList();
  }, [fetchPinDocList]);

  return <SiderTree title="置顶文档" treeData={pinDocList} type="pin" />;
}

export default SiderPinDoc;
