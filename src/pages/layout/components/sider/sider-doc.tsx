import { useEffect } from "react";
import SiderTree from "./sider-tree";
import { useDocListStore } from "@/store";
function SiderDoc() {
  const { docList, fetchDocList } = useDocListStore();

  useEffect(() => {
    fetchDocList();
  }, [fetchDocList]);

  return <SiderTree title="我的文档库" treeData={docList} type="docs" />;
}
export default SiderDoc;
