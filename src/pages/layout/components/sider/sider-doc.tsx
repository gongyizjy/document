import { useEffect, useState } from "react";
import SiderTree from "./sider-tree";
import { getDocList, TreeItemData } from "@/apis";
import { useDocLib } from "@/store";
function SiderDoc() {
  const [docList, setDocList] = useState<TreeItemData[]>([]);
  const { setDocLibId } = useDocLib();

  useEffect(() => {
    getDocList().then((res) => {
      setDocList(res.data);
      setDocLibId(res.data[0].spaceId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SiderTree title="我的文档库" treeData={docList} type="docs" />;
}
export default SiderDoc;
