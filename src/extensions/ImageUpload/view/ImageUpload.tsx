import { NodeViewWrapper, NodeViewWrapperProps } from "@tiptap/react";
import { useCallback } from "react";

import { ImageUploader } from "./ImageUploader";

export const ImageUpload = ({ editor, deleteNode }: NodeViewWrapperProps) => {
  const onUpload = useCallback(
    (url: string) => {
      if (url) {
        editor.chain().setImageBlock({ src: url }).focus().run();
        deleteNode();
      }
    },
    [deleteNode, editor]
  );

  return (
    <NodeViewWrapper>
      <div className="p-0 m-0" data-drag-handle>
        <ImageUploader onUpload={onUpload} />
      </div>
    </NodeViewWrapper>
  );
};

export default ImageUpload;
