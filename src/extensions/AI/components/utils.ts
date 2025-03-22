import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // 你可以选择其他样式

// 创建 markdown-it 实例
const md: MarkdownIt = new MarkdownIt({
  html: true, // 启用 HTML 标签
  breaks: true, // 转换 '\n' 为 <br>
  linkify: true, // 自动转换 URL 为链接
  typographer: true, // 启用一些语言中立的替换 + 引号美化
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang}">${
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        }</code></pre>`;
      } catch (error) {
        console.warn("代码高亮出错:", error);
      }
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

/**
 * 将 Markdown 文本渲染为 HTML
 * @param content Markdown 文本
 * @returns 渲染后的 HTML
 */
export function renderMarkdown(content: string): string {
  return md.render(content);
}

/**
 * 检查字符串是否包含 Markdown 语法
 * @param text 要检查的字符串
 * @returns 是否包含 Markdown 语法
 */
export function containsMarkdown(text: string): boolean {
  // 检查常见的 Markdown 语法
  const markdownPatterns = [
    /^#+\s+/m, // 标题
    /\*\*.+?\*\*/, // 粗体
    /\*.+?\*/, // 斜体
    /`[^`]+`/, // 内联代码
    /```[\s\S]+?```/, // 代码块
    /^\s*[-*+]\s+/m, // 无序列表
    /^\s*\d+\.\s+/m, // 有序列表
    /\[.+?\]\(.+?\)/, // 链接
    /!\[.+?\]\(.+?\)/, // 图片
    /^\s*>\s+/m, // 引用
    /^\s*-{3,}\s*$/m, // 分隔线
    /\|.+\|.+\|/, // 表格
    /~~.+?~~/, // 删除线
  ];

  return markdownPatterns.some((pattern) => pattern.test(text));
}
