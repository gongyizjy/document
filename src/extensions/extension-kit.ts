import {
  StarterKit,
  Highlight,
  TextAlign,
  TextStyle,
  Typography,
  Dropcursor,
  Subscript,
  Superscript,
  Paragraph,
  BulletList,
  OrderedList,
  TaskItem,
  TaskList,
  Heading,
  Placeholder,
  CodeBlock,
  Underline,
  Color,
  ClearStyles,
  Link,
  Document,
  Columns,
  Column,
  HorizontalRule,
  SlashCommand,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  FontSize,
} from "@/extensions";

export const extensionsKit = () => [
  StarterKit.configure({
    codeBlock: false,
    heading: false,
    document: false,
    horizontalRule: false,
    dropcursor: false,
  }),
  Document,
  Placeholder.configure({
    placeholder({ node }) {
      if (node.type.name === "paragraph") {
        return "输入 / 使用命令";
      }
      return "";
    },
  }),
  CodeBlock,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  Typography,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Underline,
  TextStyle,
  FontSize,
  ClearStyles,
  Color,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Link.configure({
    openOnClick: true,
    linkOnPaste: true,
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Columns,
  Column,
  Highlight.configure({ multicolor: true }),
  Superscript,
  Subscript,
  HorizontalRule,
  SlashCommand,
  Dropcursor.configure({
    width: 2,
    class: "ProseMirror-dropcursor border-black",
  }),
];
