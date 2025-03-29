import { useDocListStore } from "@/store";
import SiderTree from "./sider-tree";

function SiderPinDoc() {
  const { pinDocList } = useDocListStore();

  return <SiderTree title="置顶文档" treeData={pinDocList} type="pin" />;
}

export default SiderPinDoc;
