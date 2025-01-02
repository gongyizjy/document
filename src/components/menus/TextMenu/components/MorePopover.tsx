import * as Popover from "@radix-ui/react-popover";
import Toolbar from "@/components/ui/Toolbar";
import { Icon } from "@/components/ui/Icon";

export default function MorePopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button tooltip="更多">
          <Icon name="Ellipsis" />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content className="mt-2">
        <Toolbar.Wrapper>
          <Toolbar.Button tooltip="下标">
            <Icon name="Subscript" />
          </Toolbar.Button>
          <Toolbar.Button tooltip="上标">
            <Icon name="Superscript" />
          </Toolbar.Button>
          <Toolbar.Divider />
        </Toolbar.Wrapper>
      </Popover.Content>
    </Popover.Root>
  );
}
