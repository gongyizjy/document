import { useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { CodeBlock } from "@/extensions/CodeBlock/CodeBlock";
import Heading from "@/extensions/Heading/Heading";
import Typography from "@tiptap/extension-typography";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontSize from "@/extensions/FontSize/FontSize";
import Color from "@tiptap/extension-color";
// import { ClearStylesOnEnter } from "@/extensions/clearStyle";
import { ClearStyles } from "@/extensions/ClearStyles";
import TextAlign from "@tiptap/extension-text-align";
import { Link } from "@/extensions/Link";

declare global {
  interface Window {
    editor: Editor | null;
  }
}
export default function useBlockEditor() {
  const editor = useEditor({
    content: "",
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: false,
      }),
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
        autolink: true,
      }),
    ],
  });

  return { editor };
}
