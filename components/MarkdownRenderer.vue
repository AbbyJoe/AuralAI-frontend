<template>
    <div class="markdown-content" v-html="renderedContent" />
  </template>
  
  <script setup>
  defineOptions({ name: "MarkdownRenderer" });
  
  const props = defineProps({
    content: {
      type: String,
      required: true,
    },
  });
  
  const renderedContent = computed(() => {
    const paragraphs = props.content.split("\n\n");
  
    return paragraphs
      .map((paragraph) => {
        if (!paragraph.trim()) {
          return "";
        }
  
        const imageMatch = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
        if (imageMatch) {
          const [, alt, src] = imageMatch;
          return `<img src="${src}" alt="${alt}" class="markdown-image" />`;
        }
  
        if (paragraph.startsWith("# ")) {
          const content = paragraph.slice(2);
          const processedContent = content
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/`(.*?)`/g, "<code>$1</code>")
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
          return `<h1>${processedContent}</h1>`;
        }
        if (paragraph.startsWith("## ")) {
          const content = paragraph.slice(3);
          const processedContent = content
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/`(.*?)`/g, "<code>$1</code>")
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
          return `<h2>${processedContent}</h2>`;
        }
        if (paragraph.startsWith("### ")) {
          const content = paragraph.slice(4);
          const processedContent = content
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/`(.*?)`/g, "<code>$1</code>")
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
          return `<h3>${processedContent}</h3>`;
        }
        if (paragraph.startsWith("#### ")) {
          const content = paragraph.slice(5);
          const processedContent = content
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/`(.*?)`/g, "<code>$1</code>")
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
          return `<h4>${processedContent}</h4>`;
        }
        if (paragraph.startsWith("##### ")) {
          const content = paragraph.slice(6);
          const processedContent = content
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/`(.*?)`/g, "<code>$1</code>")
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
          return `<h5>${processedContent}</h5>`;
        }
        if (paragraph.startsWith("###### ")) {
          const content = paragraph.slice(7);
          const processedContent = content
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/`(.*?)`/g, "<code>$1</code>")
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
          return `<h6>${processedContent}</h6>`;
        }
  
        if (
          paragraph.startsWith("- ") ||
          paragraph.startsWith("* ") ||
          paragraph.startsWith("+ ")
        ) {
          const items = paragraph
            .split("\n")
            .map((item) => {
              const content = item.slice(2);
              const processedContent = content
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                .replace(/`(.*?)`/g, "<code>$1</code>")
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
              return `<li>${processedContent}</li>`;
            })
            .join("");
          return `<ul>${items}</ul>`;
        }
        if (/^\d+\. /.test(paragraph)) {
          const items = paragraph
            .split("\n")
            .map((item) => {
              const content = item.replace(/^\d+\. /, "");
              const processedContent = content
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                .replace(/`(.*?)`/g, "<code>$1</code>")
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
              return `<li>${processedContent}</li>`;
            })
            .join("");
          return `<ol>${items}</ol>`;
        }
  
        if (paragraph.startsWith("> ")) {
          return `<blockquote>${paragraph.slice(2)}</blockquote>`;
        }
  
        const processedParagraph = paragraph
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/`(.*?)`/g, "<code>$1</code>")
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
        return `<p>${processedParagraph}</p>`;
      })
      .join("\n");
  });
  </script>
  
<style scoped>
.markdown-content {
  color: var(--text);
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.7;
  margin: 0;
  padding: 0;
  max-width: 100%;
}

.markdown-content :deep(h1) {
  color: var(--text);
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.4;
  margin: 1.5rem 0 1rem;
  letter-spacing: -0.02em;
}

.markdown-content :deep(h2) {
  color: var(--text);
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 1.25rem 0 0.75rem;
  letter-spacing: -0.01em;
}

.markdown-content :deep(h3) {
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  margin: 1rem 0 0.75rem;
}

.markdown-content :deep(h4) {
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  margin: 0.875rem 0 0.5rem;
}

.markdown-content :deep(h5) {
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  margin: 0.75rem 0 0.5rem;
}

.markdown-content :deep(h6) {
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 400;
  line-height: 1.4;
  margin: 0.75rem 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.markdown-content :deep(p) {
  color: var(--text);
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.7;
  margin: 0.75rem 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  color: var(--text);
}

.markdown-content :deep(li) {
  margin: 0.5rem 0;
  color: var(--text);
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.7;
}

.markdown-content :deep(blockquote) {
  border-left: 3px solid var(--border);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--text-muted);
  font-style: italic;
  background: rgba(255, 255, 255, 0.02);
  padding: 0.75rem 1rem;
  border-radius: 0 8px 8px 0;
}

.markdown-content :deep(code) {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.markdown-content :deep(a) {
  color: var(--highlight);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.markdown-content :deep(a:hover) {
  color: var(--text-light);
  text-decoration: underline;
}

.markdown-content :deep(img.markdown-image) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.5rem 0;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.markdown-content :deep(p:has(img.markdown-image)) {
  margin: 1.5rem 0;
}

.markdown-content :deep(strong) {
  color: var(--text-light);
  font-weight: 600;
}

.markdown-content :deep(em) {
  color: var(--text);
  font-style: italic;
}

/* Remove margin from first and last child to avoid extra space */
.markdown-content :deep(:first-child) {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.markdown-content :deep(:last-child) {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

@media (max-width: 768px) {
  .markdown-content {
    font-size: 0.9rem;
  }

  .markdown-content :deep(h1) {
    font-size: 1.5rem;
    margin: 1.25rem 0 0.75rem;
  }

  .markdown-content :deep(h2) {
    font-size: 1.25rem;
    margin: 1rem 0 0.75rem;
  }

  .markdown-content :deep(h3) {
    font-size: 1.1rem;
    margin: 0.875rem 0 0.5rem;
  }

  .markdown-content :deep(h4),
  .markdown-content :deep(h5),
  .markdown-content :deep(h6) {
    font-size: 1rem;
    margin: 0.75rem 0 0.5rem;
  }

  .markdown-content :deep(p),
  .markdown-content :deep(li) {
    font-size: 0.9rem;
  }
}
</style>
  