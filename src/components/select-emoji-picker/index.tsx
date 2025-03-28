import { ReactNode } from "react";
import { Popover } from "antd";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./index.css";

interface SelectEmojiPickerProps {
  onSelect: (emoji: string) => void;
  children: ReactNode;
}
interface emojiData {
  id: string;
  name: string;
  native: string;
  emoticons: string[];
  keywords: string[];
  shortcodes: string;
  unified: string;
}
function SelectEmojiPicker({ children, onSelect }: SelectEmojiPickerProps) {
  const handleEmojiSelect = (emoji: string) => {
    if (onSelect) {
      onSelect(emoji);
    }
  };
  return (
    <Popover
      trigger={"click"}
      overlayClassName="emoji-picker-overlay"
      placement="rightBottom"
      content={
        <Picker
          data={data}
          locale="zh"
          previewPosition="none"
          skinTonePosition="none"
          onEmojiSelect={(data: emojiData, e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            handleEmojiSelect(data.native);
          }}
        />
      }
    >
      {children}
    </Popover>
  );
}
export default SelectEmojiPicker;
