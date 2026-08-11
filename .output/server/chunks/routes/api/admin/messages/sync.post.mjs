import { u as useRuntimeConfig, o as getMessages, p as saveMessages, c as defineEventHandler, e as createError, n as getQuery } from '../../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../../_/auth.mjs';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { s as saveMailAttachment } from '../../../../_/attachments.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

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
  var _a, _b, _c, _d, _e;
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
        const attachments = [];
        if (msg.source) {
          try {
            const parsed = await simpleParser(msg.source);
            messageId = messageId || ((_c = parsed.messageId) == null ? void 0 : _c.trim());
            textBody = (parsed.text || ((_d = parsed.html) == null ? void 0 : _d.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()) || "").trim();
            const parts = parsed.attachments || [];
            for (const part of parts) {
              if (!part.content || part.content.length === 0) continue;
              if (part.contentDisposition === "inline" && ((_e = part.contentType) == null ? void 0 : _e.startsWith("image/")) && part.content.length < 2e4) {
                continue;
              }
              const saved = await saveMailAttachment({
                filename: part.filename || `piece-${attachments.length + 1}`,
                data: Buffer.isBuffer(part.content) ? part.content : Buffer.from(part.content),
                contentType: part.contentType
              });
              if (saved) attachments.push(saved);
            }
          } catch {
            textBody = "";
          }
        }
        const emailMessageId = messageId || `imap-uid-${msg.uid}`;
        if (knownIds.has(emailMessageId)) {
          skipped++;
          continue;
        }
        const createdAt = (envelope == null ? void 0 : envelope.date) ? new Date(envelope.date).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
        const record = {
          name: from.name,
          email: from.email,
          subject,
          message: textBody || "(Contenu du message non lisible en texte)",
          source: "email",
          emailMessageId
        };
        const messages = await getMessages();
        if (messages.some((m) => m.emailMessageId === emailMessageId)) {
          skipped++;
          continue;
        }
        const entry = {
          ...record,
          id: `email-${Date.now()}-${msg.uid}`,
          read: false,
          createdAt,
          source: "email",
          emailMessageId,
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

const sync_post = defineEventHandler(async (event) => {
  requireAdmin(event);
  if (!isImapConfigured()) {
    throw createError({
      statusCode: 503,
      statusMessage: "IMAP non configur\xE9. Ajoutez IMAP_HOST / IMAP_USER / IMAP_PASS dans le .env (Hostinger)."
    });
  }
  const query = getQuery(event);
  const limit = Math.min(100, Math.max(10, Number(query.limit) || 50));
  const result = await syncInboxToMessages(limit);
  if (result.error) {
    throw createError({
      statusCode: 502,
      statusMessage: `\xC9chec sync IMAP : ${result.error}`
    });
  }
  return result;
});

export { sync_post as default };
//# sourceMappingURL=sync.post.mjs.map
