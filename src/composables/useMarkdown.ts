import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

// @ts-ignore
export const md = new MarkdownIt({
    html: false,
    linkify: true,
    breaks: true,
    // @ts-ignore
    highlight: (code, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            return `<pre><code class="hljs">${hljs.highlight(code, { language: lang }).value}</code></pre>`;
        } else {
            return `<pre><code>${md.utils.escapeHtml(code)}</code></pre>`;
        }
    }
});
