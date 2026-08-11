function getMessageStatus(m) {
  var _a;
  if (m.replyStatus === "sent") return "sent";
  if (m.replyStatus === "draft") return "draft";
  if ((_a = m.reply) == null ? void 0 : _a.trim()) return "sent";
  if (!m.read) return "unread";
  return "read";
}
function extractYoutubeId(url) {
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const u = new URL(trimmed);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return (id == null ? void 0 : id.slice(0, 11)) || null;
    }
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const embed = u.pathname.match(/\/(?:embed|shorts|v)\/([a-zA-Z0-9_-]{11})/);
    if (embed) return embed[1];
  } catch {
    return null;
  }
  return null;
}

export { extractYoutubeId as e, getMessageStatus as g };
//# sourceMappingURL=admin.mjs.map
