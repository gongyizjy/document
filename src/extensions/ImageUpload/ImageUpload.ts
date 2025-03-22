import { Node, ReactNodeViewRenderer } from "@tiptap/react";
import { ImageUpload as ImageUploadComponent } from "./view/ImageUpload";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUpload: () => ReturnType;
    };
  }
}

export const ImageUpload = Node.create({
  name: "imageUpload",

  isolating: true,

  defining: true,

  group: "block",

  draggable: true,

  selectable: true,

  inline: false,

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML() {
    return ["div", { "data-type": this.name }];
  },

  addCommands() {
    return {
      setImageUpload:
        () =>
        ({ commands }) =>
          commands.insertContent([
            {
              type: this.name,
              attrs: { "data-type": this.name },
            },
            {
              type: "paragraph",
            },
          ]),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadComponent);
  },
});

export default ImageUpload;
