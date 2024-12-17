import TextAlign from '@tiptap/extension-text-align'

const extensions = [
  // ... 其他扩展
  TextAlign.configure({
    types: ['paragraph', 'heading'],  // 指定哪些节点类型可以设置对齐方式
    alignments: ['left', 'center', 'right', 'justify'],  // 支持的对齐方式
    defaultAlignment: 'left',  // 默认对齐方式
  }),
] 