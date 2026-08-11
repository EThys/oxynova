function getMessageStatus(m) {
  if (m.replyStatus === "sent") return "sent";
  if (m.replyStatus === "draft") return "draft";
  if (m.reply?.trim()) return "sent";
  if (!m.read) return "unread";
  return "read";
}
const MESSAGE_STATUS_LABELS = {
  all: "Tous",
  unread: "Non lus",
  read: "Lus",
  draft: "Brouillons",
  sent: "Envoyés"
};
const REALIZATION_DOMAINS = [
  "Ingénierie biomédicale",
  "Infrastructures hospitalières",
  "Digitalisation",
  "Formation",
  "Hygiène & sécurité",
  "Gestion de projets"
];
const CONTACT_SUBJECTS = {
  biomedical: "Ingénierie biomédicale",
  infrastructure: "Infrastructures hospitalières",
  digital: "Digitalisation",
  formation: "Formation",
  hygiene: "Hygiène & sécurité",
  projet: "Gestion de projets",
  devis: "Demande de devis",
  autre: "Autre demande"
};
function extractYoutubeId(url) {
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const u = new URL(trimmed);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id?.slice(0, 11) || null;
    }
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const embed = u.pathname.match(/\/(?:embed|shorts|v)\/([a-zA-Z0-9_-]{11})/);
    if (embed) return embed[1];
  } catch {
    return null;
  }
  return null;
}

export { CONTACT_SUBJECTS as C, MESSAGE_STATUS_LABELS as M, REALIZATION_DOMAINS as R, extractYoutubeId as e, getMessageStatus as g };
//# sourceMappingURL=admin-C5NtE001.mjs.map
