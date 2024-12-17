// 自定义一些 颜色， 也可以使用调色盘来选择颜色
import { Icon } from "@/components/ui/Icon";
import Toolbar from "@/components/ui/Toolbar";
import { Dropdown, MenuProps, Tooltip } from "antd";
import { useCallback, useMemo } from "react";
import "./ColorPicker.css";
import { ColorPicker as AntdColorPicker } from "antd";

const COLORS = [
  { label: "黑色", value: "#000000" }, // black
  { label: "灰色", value: "#D3D3D3" }, // gray
  { label: "紫色", value: "#958DF1" }, // purple
  { label: "红色", value: "#F98181" }, // red
  { label: "橙色", value: "#FBBC88" }, // orange
  { label: "黄色", value: "#FAF594" }, // yellow
  { label: "蓝色", value: "#70CFF8" }, // blue
  { label: "蓝绿色", value: "#94FADB" }, // teal
  { label: "绿色", value: "#B9F18D" }, // green
];
export type ColorPickerProps = {
  onChange: (value: string) => void;
  value: string;
};
export default function ColorPicker({ onChange, value }: ColorPickerProps) {
  const currentValue = useMemo(
    () => COLORS.find((color) => color.value === value),
    [value]
  );
  const handleMenuClick = useCallback<NonNullable<MenuProps["onClick"]>>(
    ({ key }) => {
      if (key === "customColor") {
        return;
      }
      onChange(key as string);
    },
    [onChange]
  );
  const items = useMemo(
    () => [
      ...COLORS.map((color) => ({
        key: color.value,
        label: (
          <span
            className="color-item flex items-center justify-between"
            style={{ color: color.value }}
          >
            <span className="flex items-center justify-between">
              <Icon name="Baseline" className="w-5 h-5" />
              {color.label}
            </span>
            <Icon name="Check" className="check-icon w-2 h-2" />
          </span>
        ),
      })),
      {
        key: "customColor",
        label: (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <AntdColorPicker
              value={currentValue?.value}
              onChange={(color) => {
                const hexColor = color.toHexString();
                onChange(hexColor);
              }}
            >
              <span className="flex items-center justify-start">
                <span data-text="自定义颜色" className="custom-color">
                  自定义颜色
                </span>
              </span>
            </AntdColorPicker>
          </div>
        ),
      },
    ],
    [currentValue?.value, onChange]
  );
  const menuProps = useMemo(
    () => ({
      items,
      onClick: handleMenuClick,
      selectedKeys: [value],
    }),
    [items, handleMenuClick, value]
  );
  
  return (
    <Dropdown
      menu={menuProps}
      trigger={["click"]}
      getPopupContainer={(triggerNode) =>
        triggerNode.parentElement || document.body
      }
      overlayStyle={{ minWidth: "120px" }}
      align={{
        offset: [0, 10],
      }}
    >
      <Tooltip title="字体颜色">
        <Toolbar.Button active={!!currentValue?.value}>
          <span
            className="flex items-center justify-between"
            style={{ color: value }}
          >
            <Icon name="Baseline" className="w-5 h-5"/>
            <Icon name="ChevronDown" className="w-2 h-2" />
          </span>
        </Toolbar.Button>
      </Tooltip>
    </Dropdown>
  );
}
