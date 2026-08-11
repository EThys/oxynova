/** Convert HTML / messy email body to a short plain-text preview. */
export function stripHtml(html: string) {
  return (html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

export function looksLikeHtml(value: string) {
  return /<[a-z][\s\S]*>/i.test(value || '')
}

/** Plain preview for list rows: strip tags + bracketed URLs. */
export function emailPreviewText(value: string, maxLen = 160) {
  let text = looksLikeHtml(value) ? stripHtml(value) : (value || '')
  // markdown / html-to-text style: "label [https://…]"
  text = text
    .replace(/\[[^\]]*https?:\/\/[^\]]+\]/gi, ' ')
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length > maxLen) return `${text.slice(0, maxLen).trim()}...`
  return text
}
