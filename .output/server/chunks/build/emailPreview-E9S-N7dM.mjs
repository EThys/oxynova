function stripHtml(html) {
  return (html || "").replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<\/div>/gi, "\n").replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/\s+/g, " ").trim();
}
function looksLikeHtml(value) {
  return /<[a-z][\s\S]*>/i.test(value || "");
}
function emailPreviewText(value, maxLen = 160) {
  let text = looksLikeHtml(value) ? stripHtml(value) : value || "";
  text = text.replace(/\[[^\]]*https?:\/\/[^\]]+\]/gi, " ").replace(/https?:\/\/\S+/gi, " ").replace(/\s+/g, " ").trim();
  if (text.length > maxLen) return `${text.slice(0, maxLen).trim()}...`;
  return text;
}

export { emailPreviewText as e, looksLikeHtml as l, stripHtml as s };
//# sourceMappingURL=emailPreview-E9S-N7dM.mjs.map
