import { u as useRuntimeConfig, p as getMessages, z as saveMessages } from './nitro.mjs';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { s as saveMailAttachment } from './attachments.mjs';
import { s as sanitizeEmailHtml, h as htmlToPlainPreview } from './sanitizeHtml.mjs';

function getImapConfig() {
  var _a;
  const config = useRuntimeConfig();
  const host = String(config.imapHost || "").trim();
  const user = String(config.imapUser || config.smtpUser || "").trim();
  const pass = String(config.imapPass || config.smtpPass || "").trim();
  const port = Number(config.imapPort || 993);
  const secure = String((_a = config.imapSecure) != null ? _a : "true") === "true";
  const mailbox = String(config.imapMailbox || "INBOX").trim() || "INBOX";
  if (!host || !user || !pass) return null;
  return { host, port, user, pass, secure, mailbox };
}
function isImapConfigured() {
  return getImapConfig() !== null;
}
function parseAddress(value) {
  var _a, _b, _c;
  const entry = Array.isArray(value) ? value[0] : value;
  if (!entry) return { name: "Exp\xE9diteur inconnu", email: "inconnu@email.com" };
  return {
    name: ((_a = entry.name) == null ? void 0 : _a.trim()) || ((_b = entry.address) == null ? void 0 : _b.split("@")[0]) || "Exp\xE9diteur",
    email: ((_c = entry.address) == null ? void 0 : _c.trim()) || "inconnu@email.com"
  };
}
function shouldSkipEmail(subject, fromEmail, ownAddresses) {
  const sub = subject.toLowerCase();
  if (sub.includes("[contact oxynova]")) return true;
  if (ownAddresses.some((addr) => addr && fromEmail.toLowerCase() === addr.toLowerCase())) return true;
  return false;
}
async function syncInboxToMessages(limit = 50) {
  var _a, _b, _c, _d;
  const imap = getImapConfig();
  if (!imap) {
    return { configured: false, imported: 0, skipped: 0, totalFetched: 0 };
  }
  const runtime = useRuntimeConfig();
  const ownAddresses = [
    String(runtime.smtpUser || ""),
    String(runtime.smtpFrom || ""),
    String(runtime.imapUser || ""),
    imap.user
  ].filter(Boolean);
  const existing = await getMessages();
  const knownIds = new Set(
    existing.map((m) => m.emailMessageId).filter((id) => Boolean(id))
  );
  const client = new ImapFlow({
    host: imap.host,
    port: imap.port,
    secure: imap.secure,
    auth: {
      user: imap.user,
      pass: imap.pass
    },
    logger: false
  });
  let imported = 0;
  let skipped = 0;
  let totalFetched = 0;
  try {
    await client.connect();
    const lock = await client.getMailboxLock(imap.mailbox);
    try {
      const status = await client.status(imap.mailbox, { messages: true });
      const total = status.messages || 0;
      if (total === 0) {
        return { configured: true, imported: 0, skipped: 0, totalFetched: 0 };
      }
      const start = Math.max(1, total - limit + 1);
      const range = `${start}:${total}`;
      for await (const msg of client.fetch(range, {
        uid: true,
        envelope: true,
        source: true
      })) {
        totalFetched++;
        const envelope = msg.envelope;
        const subject = ((_a = envelope == null ? void 0 : envelope.subject) == null ? void 0 : _a.trim()) || "(Sans objet)";
        const from = parseAddress(envelope == null ? void 0 : envelope.from);
        if (shouldSkipEmail(subject, from.email, ownAddresses)) {
          skipped++;
          continue;
        }
        let messageId = (_b = envelope == null ? void 0 : envelope.messageId) == null ? void 0 : _b.trim();
        let textBody = "";
        let htmlBody = "";
        const attachments = [];
        if (msg.source) {
          try {
            const parsed = await simpleParser(msg.source);
            messageId = messageId || ((_c = parsed.messageId) == null ? void 0 : _c.trim());
            const cidToUrl = /* @__PURE__ */ new Map();
            const parts = parsed.attachments || [];
            for (const part of parts) {
              if (!part.content || part.content.length === 0) continue;
              const data = Buffer.isBuffer(part.content) ? part.content : Buffer.from(part.content);
              const isImage = (part.contentType || "").startsWith("image/");
              const isInline = part.contentDisposition === "inline" || Boolean(part.cid);
              if (isInline && isImage && !part.cid && data.length < 8e3) continue;
              const saved = await saveMailAttachment({
                filename: part.filename || (isImage ? `image-${attachments.length + 1}.png` : `piece-${attachments.length + 1}`),
                data,
                contentType: part.contentType
              });
              if (!saved) continue;
              if (part.cid) {
                const cid = String(part.cid).replace(/^<|>$/g, "").trim();
                if (cid) cidToUrl.set(cid.toLowerCase(), saved.url);
              }
              if (!isInline || part.filename) {
                attachments.push(saved);
              }
            }
            let rawHtml = typeof parsed.html === "string" ? parsed.html : "";
            if (rawHtml && cidToUrl.size) {
              for (const [cid, url] of cidToUrl) {
                const re = new RegExp(`cid:${cid.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "gi");
                rawHtml = rawHtml.replace(re, url);
              }
            }
            if (rawHtml) {
              htmlBody = sanitizeEmailHtml(rawHtml);
            }
            textBody = (parsed.text || (htmlBody ? htmlToPlainPreview(htmlBody, 2e3) : "") || "").trim();
          } catch {
            textBody = "";
            htmlBody = "";
          }
        }
        const emailMessageId = messageId || `imap-uid-${msg.uid}`;
        const existingIdx = (await getMessages()).findIndex((m) => m.emailMessageId === emailMessageId);
        if (existingIdx >= 0) {
          const all = await getMessages();
          const prev = all[existingIdx];
          if (prev) {
            const needsHtml = Boolean(htmlBody && !prev.messageHtml);
            const needsUid = !prev.imapUid && Boolean(msg.uid);
            if (needsHtml || needsUid) {
              all[existingIdx] = {
                ...prev,
                message: needsHtml ? textBody || prev.message : prev.message,
                messageHtml: needsHtml ? htmlBody : prev.messageHtml,
                attachments: ((_d = prev.attachments) == null ? void 0 : _d.length) ? prev.attachments : attachments.length ? attachments : void 0,
                imapUid: prev.imapUid || msg.uid,
                imapMailbox: prev.imapMailbox || imap.mailbox
              };
              await saveMessages(all);
            }
          }
          skipped++;
          continue;
        }
        if (knownIds.has(emailMessageId)) {
          skipped++;
          continue;
        }
        const createdAt = (envelope == null ? void 0 : envelope.date) ? new Date(envelope.date).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
        const messages = await getMessages();
        const entry = {
          name: from.name,
          email: from.email,
          subject,
          message: textBody || "(Contenu du message non lisible)",
          messageHtml: htmlBody || void 0,
          id: `email-${Date.now()}-${msg.uid}`,
          read: false,
          createdAt,
          source: "email",
          emailMessageId,
          imapUid: msg.uid,
          imapMailbox: imap.mailbox,
          attachments: attachments.length ? attachments : void 0
        };
        messages.unshift(entry);
        messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        await saveMessages(messages);
        knownIds.add(emailMessageId);
        imported++;
      }
    } finally {
      lock.release();
    }
    await client.logout();
    return { configured: true, imported, skipped, totalFetched };
  } catch (error) {
    const err = error instanceof Error ? error.message : "Erreur IMAP inconnue";
    console.error("[imap] Sync failed:", err);
    try {
      await client.logout();
    } catch {
    }
    return { configured: true, imported, skipped, totalFetched, error: err };
  }
}
function normalizeMessageId(id) {
  return id.trim().replace(/^<|>$/g, "");
}
async function deleteRemoteEmail(options) {
  var _a;
  const imap = getImapConfig();
  if (!imap) {
    return { deleted: false, error: "IMAP non configur\xE9" };
  }
  const mailbox = (options.mailbox || imap.mailbox).trim() || imap.mailbox;
  let uid = options.imapUid && Number.isFinite(options.imapUid) ? Number(options.imapUid) : void 0;
  if (!uid && ((_a = options.emailMessageId) == null ? void 0 : _a.startsWith("imap-uid-"))) {
    const parsed = Number(options.emailMessageId.slice("imap-uid-".length));
    if (Number.isFinite(parsed)) uid = parsed;
  }
  const client = new ImapFlow({
    host: imap.host,
    port: imap.port,
    secure: imap.secure,
    auth: {
      user: imap.user,
      pass: imap.pass
    },
    logger: false
  });
  try {
    await client.connect();
    const lock = await client.getMailboxLock(mailbox);
    try {
      if (!uid && options.emailMessageId) {
        const raw = options.emailMessageId.trim();
        const bare = normalizeMessageId(raw);
        const candidates = Array.from(new Set([
          raw,
          bare,
          bare ? `<${bare}>` : ""
        ].filter(Boolean)));
        for (const candidate of candidates) {
          const found = await client.search(
            { header: { "message-id": candidate } },
            { uid: true }
          );
          if (Array.isArray(found) && found.length) {
            uid = found[0];
            break;
          }
        }
      }
      if (!uid) {
        return { deleted: false, notFound: true, error: "Message introuvable sur Hostinger" };
      }
      const ok = await client.messageDelete(String(uid), { uid: true });
      if (!ok) {
        return { deleted: false, notFound: true, error: "Message d\xE9j\xE0 absent sur Hostinger" };
      }
      return { deleted: true };
    } finally {
      lock.release();
    }
  } catch (error) {
    const err = error instanceof Error ? error.message : "Erreur IMAP inconnue";
    console.error("[imap] Delete failed:", err);
    return { deleted: false, error: err };
  } finally {
    try {
      await client.logout();
    } catch {
    }
  }
}
let lastAutoSyncAt = 0;
let autoSyncInFlight = null;
async function syncInboxIfDue(options) {
  var _a;
  if (!isImapConfigured()) return null;
  const force = (options == null ? void 0 : options.force) === true;
  const throttleMs = (_a = options == null ? void 0 : options.throttleMs) != null ? _a : 2e4;
  const now = Date.now();
  if (!force && now - lastAutoSyncAt < throttleMs) {
    return null;
  }
  if (autoSyncInFlight) return autoSyncInFlight;
  autoSyncInFlight = (async () => {
    var _a2;
    lastAutoSyncAt = Date.now();
    try {
      return await syncInboxToMessages((_a2 = options == null ? void 0 : options.limit) != null ? _a2 : 50);
    } finally {
      autoSyncInFlight = null;
    }
  })();
  return autoSyncInFlight;
}

export { syncInboxToMessages as a, deleteRemoteEmail as d, isImapConfigured as i, syncInboxIfDue as s };
//# sourceMappingURL=imap.mjs.map
