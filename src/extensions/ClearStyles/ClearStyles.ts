import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { TextSelection } from "@tiptap/pm/state";

export const ClearStyles = Extension.create({
  name: "clearStyles",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("clearStyles"),
        props: {
          handleKeyDown: (view, event) => {
            // 检查是否是输入字符或回车键
            if (event.key.length === 1 || event.key === "Enter") {
              const { state, dispatch } = view;
              const { selection } = state;

              if (!(selection instanceof TextSelection) || !selection.empty) {
                return false;
              }

              // 获取当前位置的所有 marks
              const marks = selection.$head.marks();

              // 如果没有 marks，不需要处理
              if (!marks.length) {
                return false;
              }

              // 创建一个新的 transaction
              const tr = state.tr;

              // 移除所有的样式 marks
              marks.forEach((mark) => {
                const markType = mark.type;
                if (
                  [
                    "bold",
                    "italic",
                    "underline",
                    "textStyle",
                    "code",
                    "highlight",
                  ].includes(markType.name)
                ) {
                  tr.removeStoredMark(markType);
                }
              });

              // 分发 transaction
              if (tr.docChanged || tr.storedMarksSet) {
                dispatch(tr);
                return true;
              }
            }
            return false;
          },
        },
      }),
    ];
  },
});

export default ClearStyles;
