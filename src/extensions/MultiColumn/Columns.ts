import { Node } from "@tiptap/core";

export enum ColumnLayout {
  SidebarLeft = "sidebar-left",
  SidebarRight = "sidebar-right",
  TwoColumn = "two-column",
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    columns: {
      setColumns: () => ReturnType;
      setLayout: (layout: ColumnLayout) => ReturnType;
    };
  }
}

export const Columns = Node.create({
  name: "columns",

  group: "columns",

  content: "column column",

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      layout: {
        default: ColumnLayout.TwoColumn,
      },
    };
  },

  addCommands() {
    return {
      setColumns:
        () =>
        ({ commands }) =>
          commands.insertContent([
            {
              type: "columns",
              attrs: { layout: ColumnLayout.TwoColumn },
              content: [
                {
                  type: "column",
                  attrs: { position: "left" },
                  content: [{ type: "paragraph",content:[
                    {
                      type: "text",
                      text: " "
                    }
                  ] }],
                },
                {
                  type: "column",
                  attrs: { position: "right" },
                  content: [{ type: "paragraph" }],
                },
              ],
            },
            {
              type: "paragraph",
            },
          ]),
      setLayout:
        (layout: ColumnLayout) =>
        ({ commands }) =>
          commands.updateAttributes("columns", { layout }),
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { "data-type": "columns", class: `layout-${HTMLAttributes.layout}` },
      0,
    ];
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]',
      },
    ];
  },
});

export default Columns;
