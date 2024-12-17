import { Icon } from "@/components/ui/Icon";
import Toolbar from "@/components/ui/Toolbar";
import { Dropdown, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { useMemo, useCallback } from "react";

const TEXTALIGN_OPTIONS = [
  { label: "左对齐", value: "left" },
  { label: "居中对齐", value: "center" },
  { label: "右对齐", value: "right" },
];

export type TextAlignProps = {
  onChange: (value: string) => void;
  value: string;
};

const chooseTextAlignIcon = (value: string) => {
  switch (value) {
    case "left":
      return <Icon name="AlignLeft" />;
    case "center":
      return <Icon name="AlignCenter" />;
    case "right":
      return <Icon name="AlignRight" />;
    default:
      return "AlignLeft";
  }
};

export default function TextAlign({ onChange, value }: TextAlignProps) {
  const currentValue = useMemo(
    () => TEXTALIGN_OPTIONS.find((op) => op.value === value),
    [value]
  );


  const handleMenuClick = useCallback<NonNullable<MenuProps["onClick"]>>(
    ({ key }) => {
      onChange(key as string);
    },
    [onChange]
  );
  const items = useMemo(
    () =>
      TEXTALIGN_OPTIONS.map((op) => ({
        key: op.value,
        label: (
          <span className="font-size-item flex items-center justify-between">
            <span className="flex items-center">
              {chooseTextAlignIcon(op.value)}
              <span>{op.label}</span>
            </span>
            <Icon name="Check" className="check-icon w-2 h-2" />
          </span>
        ),
      })),
    []
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
      placement="bottomLeft"
      getPopupContainer={(triggerNode) =>
        triggerNode.parentElement || document.body
      }
      overlayStyle={{ minWidth: "120px" }}
      align={{
        offset: [0, 10],
      }}
    >
      <Tooltip title="对齐方式">
        <Toolbar.Button active={!!currentValue?.value}>
          <Icon name="AlignJustify" />
          <Icon name="ChevronDown" className="w-2 h-2" />
        </Toolbar.Button>
      </Tooltip>
    </Dropdown>
  );
}
