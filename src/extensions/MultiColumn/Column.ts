import { Node, mergeAttributes } from '@tiptap/core'

export const Column = Node.create({
  name: 'column',

  content: 'block+',

  isolating: true,

  selectable: false,

  allowGapCursor: true,

  group: 'block',

  addAttributes() {
    return {
      position: {
        default: 'left',
        parseHTML: element => element.getAttribute('data-position'),
        renderHTML: attributes => ({ 'data-position': attributes.position }),
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 
      'data-type': 'column',
      'contenteditable': 'true'
    }), 0]
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ]
  },
})

export default Column
