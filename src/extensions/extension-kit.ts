import { HocuspocusProvider } from "@hocuspocus/provider";
import {
  BlockquoteFigure,
  CharacterCount,
  CodeBlock,
  Color,
  Details,
  DetailsContent,
  DetailsSummary,
  Document,
  Dropcursor,
  Emoji,
  Figcaption,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableOfContents,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  emojiSuggestion,
  Columns,
  Column,
  TaskItem,
  TaskList,
  ClearStyles,
  AI,
} from "@/extensions";

import { ImageUpload } from "./ImageUpload";
import { TableOfContentsNode } from "./TableOfContentsNode";

interface ExtensionKitProps {
  provider?: HocuspocusProvider | null;
}

export const extensionsKit = ({ provider }: ExtensionKitProps) => {
  const extensions = [
    Document,
    Columns,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Column,
    Selection,
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    HorizontalRule,
    StarterKit.configure({
      document: false,
      dropcursor: false,
      heading: false,
      horizontalRule: false,
      blockquote: false,
      history: false,
      codeBlock: false,
    }),
    Details.configure({
      persist: true,
      HTMLAttributes: {
        class: "details",
      },
    }),
    DetailsContent,
    DetailsSummary,
    CodeBlock,
    TextStyle,
    FontSize,
    FontFamily,
    Color,
    TrailingNode,
    Link.configure({
      openOnClick: false,
    }),
    Highlight.configure({ multicolor: true }),
    Underline,
    CharacterCount,
    TableOfContents,
    TableOfContentsNode,
    ImageUpload.configure({
      clientId: provider?.document?.clientID,
    }),
    ImageBlock,
    Emoji.configure({
      enableEmoticons: true,
      suggestion: emojiSuggestion,
    }),
    TextAlign.extend({
      addKeyboardShortcuts() {
        return {};
      },
    }).configure({
      types: ["heading", "paragraph"],
    }),
    Subscript,
    Superscript,
    Table,
    TableCell,
    TableHeader,
    TableRow,
    Typography,
    Placeholder.configure({
      placeholder({ node }) {
        if (node.type.name === "paragraph") {
          return "输入 / 使用命令";
        }
        return "";
      },
    }),
    AI.configure({
      apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
    }),
    ClearStyles,
    SlashCommand,
    Focus,
    Figcaption,
    BlockquoteFigure,
    Dropcursor.configure({
      width: 2,
      class: "ProseMirror-dropcursor border-black",
    }),
  ];

  return extensions;
};
