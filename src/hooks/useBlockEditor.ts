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
import { ClearStyles } from "@/extensions/ClearStyles";
import TextAlign from "@tiptap/extension-text-align";
import { Link } from "@/extensions/Link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Document } from "@/extensions/Document";
import { Columns, Column } from "@/extensions/MultiColumn";
import Highlight from "@tiptap/extension-highlight";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import HorizontalRule from "@/extensions/HorizontalRule/HorizontalRule";
import { SlashCommand } from "@/extensions/SlashCommand";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";

declare global {
  interface Window {
    editor: Editor | null;
  }
}
const doc = new Y.Doc();
const docHeader = doc.get('header', Y.XmlFragment)
const docContent = doc.get('default', Y.XmlFragment)
export default function useBlockEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: false,
        document: false,
        horizontalRule: false,
        dropcursor: false,
        history: false
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
      Collaboration.configure({
        document: doc,

      }),
    ],
  });

  return { editor, doc, docHeader, docContent };
}
