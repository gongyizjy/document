import { useEffect } from "react";
import { useDocLib, useDocListStore } from "@/store";
import SiderTree from "./sider-tree";

function SiderPinDoc() {
  const { docList, fetchDocList } = useDocListStore();
  const { setDocLibId } = useDocLib();

  useEffect(() => {
    fetchDocList(setDocLibId);
  }, [fetchDocList, setDocLibId]);

  return <SiderTree title="置顶文档" treeData={docList} type="pin" />;
}

export default SiderPinDoc;
