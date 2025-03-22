import { Node, ReactNodeViewRenderer } from "@tiptap/react";
import { AI as AIComponent } from "./components/AI";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    ai: {
      setAI: () => ReturnType;
    };
  }
}

export interface AIOptions {
  apiKey?: string;
}

export const AI = Node.create<AIOptions>({
  name: "ai",

  addOptions() {
    return {
      apiKey: "",
    };
  },
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
      setAI:
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
    return ReactNodeViewRenderer(AIComponent);
  },
});

export default AI;
