import { Icon } from "@/components/ui/Icon";
import { Surface } from "@/components/ui/Surface";
import { Switch, Input, Space, Button, Form } from "antd";
import React, { useCallback, useMemo, useState } from "react";

// 这里的那个url是从后端获取的，后续这边要换成form表单提交，这里不实现任何功能，先占个位置
export type LinkEditorPanelProps = {
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab: boolean) => void;
};
const useLinkEditorState = ({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}: LinkEditorPanelProps) => {
  const [url, setUrl] = useState(initialUrl || "");
  const [openInNewTab, setOpenInNewTab] = useState(
    initialOpenInNewTab || false
  );
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);
  const urlPattern = useMemo(() => /^(http|https):\/\/([\w.]+\/?)\S*/, []);
  const handleSubmit = useCallback(() => {
    if (urlPattern.test(url)) {
      onSetLink(url, openInNewTab);
    }
  }, [url, urlPattern, onSetLink, openInNewTab]);
  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    urlPattern,
    onChange,
    handleSubmit,
  };
};
export default function LinkEditorPanel({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}: LinkEditorPanelProps) {
  const state = useLinkEditorState({
    onSetLink,
    initialOpenInNewTab,
    initialUrl,
  });
  console.log(state);
  
  const [form] = Form.useForm();
  return (
    <Surface className="p-2">
      <Form form={form} onFinish={state.handleSubmit}>
        <Form.Item
          name="url"
          validateTrigger="onBlur"
          rules={[{ pattern: state.urlPattern, message: "请输入正确的链接" }]}
        >
          <Space>
            <Input
              value={state.url}
              onChange={state.onChange}
              prefix={<Icon name="Link" className="w-4 h-4 text-black" />}
            />
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="flex items-center mt-3">
        <span className="mr-5 text-sm font-bold">在新标签页打开</span>
        <Switch value={state.openInNewTab} onChange={state.setOpenInNewTab} />
      </div>
    </Surface>
  );
}
