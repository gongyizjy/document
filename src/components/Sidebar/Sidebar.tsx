import { cn } from "@/utils";
import { memo, useCallback } from "react";
import { Editor } from "@tiptap/react";
import { TableOfContents } from "../TableOfContents";

export const Sidebar = memo(
  ({
    editor,
    isOpen,
    onClose,
  }: {
    editor: Editor;
    isOpen?: boolean;
    onClose: () => void;
  }) => {
    const handlePotentialClose = useCallback(() => {
      if (window.innerWidth < 1024) {
        onClose();
      }
    }, [onClose]);

    const windowClassName = cn(
      "absolute top-0 left-0 bg-white lg:bg-white/30 lg:backdrop-blur-xl h-full lg:h-auto lg:relative z-[999] w-0 duration-300 transition-all",
      !isOpen && "border-r-transparent",
      isOpen && "w-60 border-r border-r-neutral-200"
    );

    return (
      <div className={windowClassName}>
        <div className="w-full h-full overflow-hidden">
          <div className="w-full h-full p-6 overflow-auto">
            <TableOfContents
              onItemClick={handlePotentialClose}
              editor={editor}
            />
          </div>
        </div>
      </div>
    );
  }
);

Sidebar.displayName = "TableOfContentSidepanel";
