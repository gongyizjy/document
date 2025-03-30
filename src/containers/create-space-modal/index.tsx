import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Form, Input, Tooltip } from "antd";
import { v4 as uuid } from "uuid";
import SelectEmojiPicker from "@/components/select-emoji-picker";
// import { createSpace } from "@/apis";
import { useSpaceList } from "@/store";

interface CreateSpaceModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function CreateSpaceModal({ open, setOpen }: CreateSpaceModalProps) {
  const [form] = Form.useForm();
  const [emoji, setEmoji] = useState<string>("");
  const { createSpace } = useSpaceList();

  const handleSelectEmoji = (emoji: string) => {
    setEmoji(emoji);
  };

  const handleOk = () => {
    const data = {
      ...form.getFieldsValue(),
      emoji: emoji || "👍",
      spaceId: uuid(),
      // 随机生成一个图片地址，用于展示
      cover: "https://picsum.photos/800/600?mountain",
    };
    form.validateFields().then(() => {
      createSpace(data);
      setOpen(false);
    });
  };
  return (
    <Modal
      open={open}
      title="新建空间"
      cancelText="取消"
      okText="确定"
      onOk={handleOk}
      style={{ marginTop: "150px" }}
      onCancel={() => {
        setOpen(false);
      }}
      closable={false}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="名称"
          required
          name="name"
          rules={[{ required: true, message: "请输入空间名称" }]}
        >
          <Input
            prefix={
              <SelectEmojiPicker onSelect={handleSelectEmoji}>
                <Tooltip title="更换图标">
                  <div className="flex items-center justify-center px-1 w-5 h-5 hover:bg-bg-emojiHover rounded-md cursor-pointer">
                    {emoji || "👍"}
                  </div>
                </Tooltip>
              </SelectEmojiPicker>
            }
            placeholder="请输入空间名称"
          />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <Input.TextArea rows={2} placeholder="请输入空间描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateSpaceModal;
