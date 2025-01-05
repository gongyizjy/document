import { Group } from "./types";

export const GROUPS: Group[] = [
  {
    name: "basic",
    title: "基础",
    commands: [
      {
        name: "heading1",
        label: "一级标题",
        iconName: "Heading1",
        description: "High priority section title",
        aliases: ["h1"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 1 }).run();
        },
      },
      {
        name: "heading2",
        label: "二级标题",
        iconName: "Heading2",
        description: "Medium priority section title",
        aliases: ["h2"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 2 }).run();
        },
      },
      {
        name: "heading3",
        label: "三级标题",
        iconName: "Heading3",
        description: "Low priority section title",
        aliases: ["h3"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 3 }).run();
        },
      },
      {
        name: "bulletList",
        label: "无序列表",
        iconName: "List",
        description: "Unordered list of items",
        aliases: ["ul"],
        action: (editor) => {
          editor.chain().focus().toggleBulletList().run();
        },
      },
      {
        name: "numberedList",
        label: "有序列表",
        iconName: "ListOrdered",
        description: "Ordered list of items",
        aliases: ["ol"],
        action: (editor) => {
          editor.chain().focus().toggleOrderedList().run();
        },
      },
      {
        name: "taskList",
        label: "任务列表",
        iconName: "ListTodo",
        description: "Task list with todo items",
        aliases: ["todo"],
        action: (editor) => {
          editor.chain().focus().toggleTaskList().run();
        },
      },
      {
        name: "blockquote",
        label: "块引用",
        iconName: "Quote",
        description: "Element for quoting",
        action: (editor) => {
          editor.chain().focus().setBlockquote().run();
        },
      },
      {
        name: "codeBlock",
        label: "代码块",
        iconName: "SquareCode",
        description: "Code block with syntax highlighting",
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor.chain().focus().setCodeBlock().run();
        },
      },
    ],
  },
  {
    name: "common",
    title: "常用",
    commands: [
      {
        name: "table",
        label: "表格",
        iconName: "Table",
        description: "Insert a table",
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
            .run();
        },
      },
      // {
      //   name: 'image',
      //   label: '图片',
      //   iconName: 'Image',
      //   description: 'Insert an image',
      //   aliases: ['img'],
      //   action: editor => {
      //     editor.chain().focus().setImageUpload().run()
      //   },
      // },
      {
        name: "columns",
        label: "分栏",
        iconName: "Columns2",
        description: "Add two column content",
        aliases: ["cols"],
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head - 2)
            .run();
        },
      },
      {
        name: "horizontalRule",
        label: "分隔线",
        iconName: "Minus",
        description: "Insert a horizontal divider",
        aliases: ["hr"],
        action: (editor) => {
          editor.chain().focus().setHorizontalRule().run();
        },
      },
    ],
  },
];
