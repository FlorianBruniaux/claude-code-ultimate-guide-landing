const HTML_TAG = /<\/?(?:a|abbr|b|br|code|details|div|em|figcaption|figure|i|img|kbd|li|ol|p|picture|source|span|strong|sub|summary|sup|table|tbody|td|th|thead|tr|ul)\b[^>]*>/gi

/**
 * Plain text from a Markdown excerpt, used for search keywords.
 */
export function stripMarkdown(text) {
  return text
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')     // rendered diagrams
    .replace(/<style[\s\S]*?<\/style>/gi, ' ') // inline styles
    .replace(HTML_TAG, ' ')                       // HTML tags, not <placeholder> text
    .replace(/```[\s\S]*?```/g, ' ')   // fenced code blocks
    .replace(/`[^`]+`/g, ' ')          // inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')  // links → text
    .replace(/!\[.*?\]\(.*?\)/g, ' ')  // images
    .replace(/^#{1,6}\s+/gm, ' ')      // heading markers
    .replace(/[|*_>#~]/g, ' ')         // markdown markers
    .replace(/\s+/g, ' ')
    .trim()
}
