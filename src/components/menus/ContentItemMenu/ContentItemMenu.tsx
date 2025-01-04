import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import Toolbar from "@/components/ui/Toolbar";
import { Icon } from "@/components/ui/Icon";
import { Editor } from "@tiptap/react";
export type ContentItemMenuProps = {
  editor: Editor;
};
export default function ContentItemMenu({ editor }: ContentItemMenuProps) {
  return (
    <DragHandle editor={editor}>
      <div className="flex items-center gap-0.5">
        <Toolbar.Button>
          <Icon name="Plus" />
        </Toolbar.Button>
        <Toolbar.Button>
          <Icon name="GripVertical" />
        </Toolbar.Button>
      </div>
    </DragHandle>
  );
}
