import LinkEditorPanel from "../../LinkMenu/LinkEditorPanel";
import { Icon } from "@/components/ui/Icon";
import Toolbar from "@/components/ui/Toolbar";
import * as Popover from "@radix-ui/react-popover";
export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab: boolean) => void;
};

export default function EditLinkPopover({ onSetLink }: EditLinkPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button>
          <Icon name="Link" />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content className="mt-2">
        <LinkEditorPanel onSetLink={onSetLink} />
      </Popover.Content>
    </Popover.Root>
  );
}
