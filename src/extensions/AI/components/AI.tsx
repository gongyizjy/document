import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { message } from "antd";
import OpenAI from "openai";
import { NodeViewWrapper, NodeViewWrapperProps } from "@tiptap/react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Panel, PanelHeadline } from "@/components/ui/Panel";
import { Surface } from "@/components/ui/Surface";
import { DropdownButton } from "@/components/ui/Dropdown";
import Toolbar from "@/components/ui/Toolbar";
import { renderMarkdown } from "./utils";

interface CustomDelta {
  content?: string;
  reasoning_content?: string;
}

const aiModels = [
  { name: "deepseek-chat", label: "deepseek-chat", value: "deepseek-chat" },
  {
    name: "deepseek-reasoner",
    label: "deepseek-reasoner",
    value: "deepseek-reasoner",
  },
];

interface Data {
  text: string;
  model?: string;
}

export const AI = ({ editor, deleteNode }: NodeViewWrapperProps) => {
  const textareaId = uuid();
  const [data, setData] = useState<Data>({
    text: "",
    model: undefined,
  });
  const currentModel = aiModels.find((model) => model.value === data.model);
  const [reasoningText, setReasoningText] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectModel = useCallback(
    (model: { name: string; label: string; value: string }) => {
      return () => setData((prevData) => ({ ...prevData, model: model.value }));
    },
    []
  );

  // 处理文本输入变化
  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData((prevData) => ({ ...prevData, text: e.target.value }));
    },
    []
  );
  const discard = useCallback(() => {
    deleteNode();
  }, [deleteNode]);

  const generate = useCallback(async () => {
    if (!data.text) {
      message.error("请输入提示词");
      return;
    }

    if (!data.model) {
      message.error("请选择模型");
      return;
    }

    try {
      setIsGenerating(true);
      setReasoningText("");
      setPreviewText("");

      const openai = new OpenAI({
        baseURL: "https://api.deepseek.com",
        apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      // 创建流式请求
      const stream = await openai.chat.completions.create({
        messages: [{ role: "user", content: data.text }],
        model: data.model,
        stream: true,
      });

      let fullText = "";
      let thinkingText = "";

      // 处理流式响应
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta as CustomDelta;
        const content = delta.content || "";
        const reasoningContent = delta.reasoning_content || "";
        if (content || reasoningContent) {
          if (content) {
            fullText += content;
            setPreviewText(fullText);
          } else {
            thinkingText += reasoningContent;
            setReasoningText(thinkingText);
          }
        }
      }
    } catch (error) {
      console.error("生成文本时出错:", error);
      message.error(
        "生成失败: " + (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setIsGenerating(false);
    }
  }, [data.text, data.model]);

  const insert = useCallback(() => {
    if (!previewText.length) {
      message.error("请生成文本");
      return;
    }

    editor.chain().insertContent(renderMarkdown(previewText)).run();
    deleteNode();
  }, [editor, previewText, deleteNode]);

  return (
    <NodeViewWrapper data-drag-handle>
      <Panel noShadow className="w-full">
        <div className="flex flex-col ">
          <div className="flex justify-between items-center mb-2">
            {previewText && <PanelHeadline>预览</PanelHeadline>}
          </div>

          {previewText || reasoningText ? (
            <div className="max-h-[14rem] mb-4 m-2.5 overflow-auto relative">
              {reasoningText && (
                <div
                  className="bg-white border-l-4 px-4  text-sm border-neutral-100  text-think-text "
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(reasoningText),
                  }}
                />
              )}
              {previewText && (
                <div
                  className="bg-white  text-black text-base px-4 relative mt-2.5"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(previewText),
                  }}
                />
              )}
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-2 row">
            <PanelHeadline asChild>
              <label htmlFor={textareaId}>提示词</label>
            </PanelHeadline>
          </div>

          <Textarea
            id={textareaId}
            value={data.text}
            onChange={handleTextareaChange}
            placeholder={`描述您想要生成的内容...`}
            required
            className="mb-2"
          />
          <div className="flex flex-row items-center justify-between gap-1">
            <div className="flex justify-between w-auto gap-1">
              <Dropdown.Root>
                <Dropdown.Trigger asChild>
                  <Button variant="tertiary" className="h-8 px-2">
                    <img
                      src="https://cdn.deepseek.com/platform/favicon.png"
                      style={{
                        width: "16px",
                        height: "16px",
                        display: "block",
                      }}
                    />
                    {currentModel?.label || "选择模型"}
                    <Icon name="ChevronDown" />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Portal>
                  <Dropdown.Content side="bottom" align="start">
                    <Surface className="p-2 min-w-[12rem">
                      {!!data.model && (
                        <>
                          <DropdownButton isActive={data.model === undefined}>
                            <Icon name="Undo2" />
                            重置
                          </DropdownButton>
                          <Toolbar.Divider horizontal />
                        </>
                      )}
                      {aiModels.map((model) => (
                        <DropdownButton
                          isActive={model.value === data.model}
                          key={model.value}
                          onClick={handleSelectModel(model)}
                        >
                          {model.label}
                        </DropdownButton>
                      ))}
                    </Surface>
                  </Dropdown.Content>
                </Dropdown.Portal>
              </Dropdown.Root>
            </div>
            <div className="flex flex-row items-center justify-between gap-1">
              {previewText && (
                <Button
                  variant="ghost"
                  className="text-red-500 hover:bg-red-500/10 hover:text-red-500"
                  onClick={discard}
                >
                  <Icon name="Trash" />
                  删除
                </Button>
              )}
              {previewText && (
                <Button variant="ghost" onClick={insert}>
                  <Icon name="Check" />
                  插入
                </Button>
              )}
              <Button
                variant="primary"
                disabled={isGenerating}
                onClick={generate}
              >
                {previewText ? (
                  <Icon name="Repeat" />
                ) : (
                  <Icon name="Sparkles" />
                )}
                {previewText ? "重新生成" : "生成文本"}
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </NodeViewWrapper>
  );
};
