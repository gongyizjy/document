import { ReactNode, useState } from "react";
import { Popover, Divider, message } from "antd";
import { TreeItemData } from "@/apis";
import { Icon } from "@/components/ui/Icon";
import { useDocListStore } from "@/store";
import "./index.css";

interface DocMenuProps {
  node: TreeItemData;
  children: ReactNode;
}
type SupportedIcons =
  | "ExternalLink"
  | "Link"
  | "PenLine"
  | "Forward"
  | "Star"
  | "Pin"
  | "Trash2";

interface MenuItem {
  id: string;
  icon: SupportedIcons;
  title: string;
}

const menuList: MenuItem[] = [
  { id: "ExternalLink", icon: "ExternalLink", title: "在新标签页打开" },
  { id: "Link", icon: "Link", title: "复制链接" },
  { id: "PenLine", icon: "PenLine", title: "重命名" },
  { id: "Forward", icon: "Forward", title: "分享文档" },
  { id: "Star", icon: "Star", title: "收藏" },
  { id: "Pin", icon: "Pin", title: "置顶" },
];

function DocMenu({ node, children }: DocMenuProps) {
  const [open, setOpen] = useState(false);
  const { deleteDoc } = useDocListStore();
  const delDoc = (node: TreeItemData) => {
    // 删除文档
    deleteDoc(node.blockId);
  };
  const openNewTab = (node: TreeItemData) => {
    const baseUrl = window.location.origin;
    window.open(`${baseUrl}/docs/${node.blockId}`, "_blank");
  };

  const copyLink = (node: TreeItemData) => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/docs/${node.blockId}`;
    navigator.clipboard.writeText(url);
    message.success("复制成功");
  };
  // 同一处理点击事件
  const handleClick = (id: string, node: TreeItemData) => {
    setOpen(false);
    switch (id) {
      case "ExternalLink":
        openNewTab(node);
        break;
      case "Link":
        copyLink(node);
        break;
      case "PenLine":
        break;
      case "Forward":
        break;
      case "Star":
        break;
      case "Pin":
        break;
      default:
        break;
    }
  };

  const content = (
    <div className="flex flex-col gap-2 w-[160px] p-1">
      {menuList.map((item) => (
        <div
          key={item.id}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClick(item.id, node);
          }}
          className="flex gap-2 items-center px-2 py-1 cursor-pointer hover:bg-slate-100 rounded-md"
        >
          <Icon name={item.icon} className="text-title" />
          <div className="text-title">{item.title}</div>
        </div>
      ))}
      <Divider style={{ margin: "0" }} />
      <div
        className="flex gap-2 items-center px-2 py-1 cursor-pointer hover:bg-slate-100 rounded-md"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          delDoc(node);
        }}
      >
        <Icon name="Trash2" />
        <div>删除</div>
      </div>
    </div>
  );

  return (
    <Popover
      overlayClassName="my-popover"
      showArrow={false}
      content={content}
      trigger="click"
      placement="bottom"
      open={open}
      onOpenChange={(visible) => setOpen(visible)}
    >
      {children}
    </Popover>
  );
}

export default DocMenu;
