import { BubbleMenu, Editor } from "@tiptap/react";
import { Icon } from "@/components/ui/Icon";
import Toolbar from "@/components/ui/Toolbar";
import { useTextMenuCommands } from "./hooks/useTextMenuCommands";
import { useTextMenuStates } from "./hooks/useTextMenuStates";
import FontSizePicker from "./components/FontSizePicker";
import ColorPicker from "./components/ColorPicker";
import TextAlign from "./components/TextAlign";
import EditLinkPopover from "./components/EditLinkPopover";
import * as Popover from "@radix-ui/react-popover";
import { memo } from "react";

export type TextMenuProps = {
  editor: Editor;
};

const MemoButton = memo(Toolbar.Button);
const MemoFontSizePicker = memo(FontSizePicker);
const MemoColorPicker = memo(ColorPicker);
const MemoTextAlign = memo(TextAlign);

export default function TextMenu({ editor }: TextMenuProps) {
  const commands = useTextMenuCommands(editor);
  const states = useTextMenuStates(editor);

  return (
    <BubbleMenu
      tippyOptions={{
        popperOptions: {
          placement: "bottom",
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport",
                padding: 8,
              },
            },
            {
              name: "flip",
              options: {
                fallbackPlacements: ["top", "bottom"],
              },
            },
          ],
        },
        maxWidth: "calc(100vw - 16px)",
        interactive: true,
        zIndex: 999,
      }}
      editor={editor}
      pluginKey="textMenu"
    >
      <Toolbar.Wrapper>
        <Toolbar.Button>123123132132</Toolbar.Button>
        <Toolbar.Divider />
        <MemoFontSizePicker
          onChange={commands.onSetFontSize}
          value={states.currentSize || "16px"}
        />
        <Toolbar.Divider />
        <Toolbar.Button
          tooltip="加粗"
          onClick={commands.onBold}
          active={states.isBold}
        >
          <Icon name="Bold" />
        </Toolbar.Button>
        <MemoButton
          tooltip="斜体"
          onClick={commands.onItalic}
          active={states.isItalic}
        >
          <Icon name="Italic" />
        </MemoButton>
        <MemoButton
          tooltip="下划线"
          onClick={commands.onUnderline}
          active={states.isUnderline}
        >
          <Icon name="Underline" />
        </MemoButton>
        <MemoButton
          tooltip="删除线"
          onClick={commands.onStrike}
          active={states.isStrike}
        >
          <Icon name="Strikethrough" />
        </MemoButton>
        <MemoButton
          tooltip="代码"
          onClick={commands.onCode}
          active={states.isCode}
        >
          <Icon name="CodeXml" />
        </MemoButton>
        <MemoButton
          tooltip="高亮"
          onClick={commands.onHighlight}
          active={states.isHighlight}
        >
          <Icon name="Highlighter" />
        </MemoButton>
        <EditLinkPopover onSetLink={commands.onLink} />
        <MemoColorPicker
          onChange={commands.onColor}
          value={states.currentColor || "#000000"}
        />
        <MemoTextAlign
          onChange={commands.onTextAlign}
          value={states.currentAlign}
        />
        <Toolbar.Divider />
        <Popover.Root>
          <Popover.Trigger asChild>
            <Toolbar.Button tooltip="更多">
              <Icon name="Ellipsis" />
            </Toolbar.Button>
          </Popover.Trigger>
          <Popover.Content className="mt-2">
            <Toolbar.Wrapper>
              <MemoButton
                tooltip="下标"
                onClick={commands.onSubscript}
                active={states.isSubscript}
              >
                <Icon name="Subscript" />
              </MemoButton>
              <MemoButton
                tooltip="上标"
                onClick={commands.onSuperscript}
                active={states.isSuperscript}
              >
                <Icon name="Superscript" />
              </MemoButton>
              <Toolbar.Divider />
              <MemoButton tooltip="删除" onClick={commands.onDelete}>
                <Icon name="Trash2" className="text-red-600" />
              </MemoButton>
            </Toolbar.Wrapper>
          </Popover.Content>
        </Popover.Root>
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
}
