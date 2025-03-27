import { useEffect } from "react";
import SiderTree from "./sider-tree";
import { useDocLib, useDocListStore } from "@/store";
function SiderDoc() {
  const { docList, fetchDocList } = useDocListStore();
  const { setDocLibId } = useDocLib();

  useEffect(() => {
    fetchDocList(setDocLibId);
  }, [fetchDocList, setDocLibId]);

  return <SiderTree title="我的文档库" treeData={docList} type="docs" />;
}
export default SiderDoc;
