import { Icon } from "@/components/ui/Icon";
import { Surface } from "@/components/ui/Surface";
import { Tooltip } from "antd";
import Toolbar from "@/components/ui/Toolbar";

export type LinkPreviewPanelProps = {
  url: string;
  onEdit: () => void;
  onClear: () => void;
};
export default function LinkPreviewPanel({
  url,
  onEdit,
  onClear,
}: LinkPreviewPanelProps) {
  return (
    <Surface className="flex items-center gap-2 p-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm underline break-all"
      >
        {url}
      </a>
      <Toolbar.Divider />
      <Tooltip title="编辑">
        <Toolbar.Button onClick={onEdit}>
          <Icon name="Pen" />
        </Toolbar.Button>
      </Tooltip>
      <Tooltip title="删除">
        <Toolbar.Button onClick={onClear}>
          <Icon name="Trash2" />
        </Toolbar.Button>
      </Tooltip>
    </Surface>
  );
}
