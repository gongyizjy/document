import React from "react";
import { Popover, Divider } from "antd";
import { TreeItemData } from "@/apis";
import { Icon } from "@/components/ui/Icon";
import { useDocListStore } from "@/store";
import "./index.css";

interface DocMenuProps {
  node: TreeItemData;
  children: React.ReactNode;
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
  const { deleteDoc } = useDocListStore();
  const delDoc = (node: TreeItemData) => {
    // 删除文档
    deleteDoc(node.blockId);
  };
  // 同一处理点击事件
  // const handleClick = (id: string) => {
  //   switch (id) {
  //     case "ExternalLink":
  //       break;
  //     case "Link":
  //       break;
  //     case "PenLine":
  //       break;
  //     case "Forward":
  //       break;
  //     case "Star":
  //   }
  // };

  const content = (
    <div className="flex flex-col gap-2 w-[160px] p-1">
      {menuList.map((item) => (
        <div
          key={item.id}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
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
    >
      {children}
    </Popover>
  );
}

export default DocMenu;
