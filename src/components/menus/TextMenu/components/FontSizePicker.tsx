import { Icon } from "@/components/ui/Icon";
import Toolbar from "@/components/ui/Toolbar";
import { Dropdown, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { useMemo, useCallback } from "react";
import "./FontSizePicker.css";

const FONT_SIZES = [
  { label: "12", value: "12px" },
  { label: "14", value: "14px" },
  { label: "16", value: "16px" },
  { label: "18", value: "18px" },
  { label: "20", value: "20px" },
  { label: "22", value: "22px" },
  { label: "24", value: "24px" },
  { label: "26", value: "26px" },
  { label: "28", value: "28px" },
  { label: "30", value: "30px" },
];

export type FontSizeProps = {
  onChange: (value: string) => void;
  value: string;
};

export default function FontSizePicker({ onChange, value }: FontSizeProps) {
  const currentValue = useMemo(
    () => FONT_SIZES.find((size) => size.value === value),
    [value]
  );

  const currentSizeLabel = currentValue?.label;

  const handleMenuClick = useCallback<NonNullable<MenuProps["onClick"]>>(
    ({ key }) => {
      onChange(key as string);
    },
    [onChange]
  );

  const items = useMemo(
    () =>
      FONT_SIZES.map((size) => ({
        key: size.value,
        label: (
          <span className="font-size-item flex items-center justify-between">
            <span>{size.label}</span>
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
      <Tooltip title="字号">
        <Toolbar.Button active={!!currentValue?.value}>
          {currentSizeLabel}
          <Icon name="ChevronDown" className="w-2 h-2" />
        </Toolbar.Button>
      </Tooltip>
    </Dropdown>
  );
}
