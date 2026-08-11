function sanitizeEmailHtml(html) {
  if (!html) return "";
  let out = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, (m) => m).replace(/<noscript[\s\S]*?<\/noscript>/gi, "").replace(/<iframe[\s\S]*?<\/iframe>/gi, "").replace(/<object[\s\S]*?<\/object>/gi, "").replace(/<embed[\s\S]*?>/gi, "").replace(/<form[\s\S]*?<\/form>/gi, "").replace(/<base[\s\S]*?>/gi, "").replace(/<meta[^>]+http-equiv\s*=\s*["']?refresh["']?[^>]*>/gi, "").replace(/\son\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "").replace(/(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, '$1="#"').replace(/(href|src)\s*=\s*javascript:[^\s>]*/gi, '$1="#"');
  if (out.length > 4e5) {
    out = `${out.slice(0, 4e5)}<!-- truncated -->`;
  }
  return out.trim();
}
function htmlToPlainPreview(html, max = 280) {
  const text = html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}\u2026`;
}

export { htmlToPlainPreview as h, sanitizeEmailHtml as s };
//# sourceMappingURL=sanitizeHtml.mjs.map
