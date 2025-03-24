import { Editor as CoreEditor } from "@tiptap/core";
import { memo } from "react";
import { TableOfContentsStorage } from "@tiptap-pro/extension-table-of-contents";
import { cn } from "@/utils";
import { useEditorState } from "@tiptap/react";

export type TableOfContentsProps = {
  editor: CoreEditor;
  onItemClick?: () => void;
};

export const TableOfContents = memo(
  ({ editor, onItemClick }: TableOfContentsProps) => {
    const content = useEditorState({
      editor,
      selector: (ctx) =>
        (ctx.editor.storage.tableOfContents as TableOfContentsStorage).content,
    });

    return (
      <>
        <div className="mb-2 text-lg font-semibold uppercase text-neutral-500 ">
          目录
        </div>
        {content.length > 0 ? (
          <div className="flex flex-col gap-1">
            {content.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{ paddingLeft: `${1 * item.level - 1}rem` }}
                onClick={onItemClick}
                className={cn(
                  "block font-medium text-neutral-500  p-2 rounded bg-opacity-10 text-sm hover:text-neutral-800 transition-all hover:bg-black hover:bg-opacity-5 truncate w-full",
                  item.isActive && "text-neutral-800 bg-neutral-100 "
                )}
              >
                {item.textContent}
              </a>
            ))}
          </div>
        ) : (
          <div className="text-sm text-neutral-500">
            开始添加标题到您的文档...
          </div>
        )}
      </>
    );
  }
);

TableOfContents.displayName = "TableOfContents";
