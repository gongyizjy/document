import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from "react";

export interface MenuItemProps {
  id: number;
  name: string;
  icon?: React.ComponentType<IconComponentProps>;
}
function MenuItem(props: MenuItemProps) {
  return (
    <div className="aside-menu-item box-content w-[235px] h-[28px] hover:bg-menu-item-bg-color cursor-pointer rounded p-[4px] pl-[10px] mt-[1px] mb-[1px]">
      <div className="w-full h-full flex items-center justify-start">
        {props.icon && <props.icon
          style={{ color: "#666", fontSize: "18px", marginRight: "8px" }}
        />}
        <span className="text-base text-primary-color">{props.name}</span>
      </div>
    </div>
  );
}
export default MenuItem;