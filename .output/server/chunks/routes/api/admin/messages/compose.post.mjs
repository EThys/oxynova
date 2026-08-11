import { c as defineEventHandler, r as readBody, e as createError, n as addMessage, m as updateMessage } from '../../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../../_/auth.mjs';
import { A as ATTACHMENT_LIMITS } from '../../../../_/attachments.mjs';
import { i as isMailConfigured, s as sendOutboundMail } from '../../../../_/mail.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';
import 'nodemailer';
import '../../../../_/sanitizeHtml.mjs';

const compose_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  requireAdmin(event);
  const body = await readBody(event);
  const to = ((_a = body.to) == null ? void 0 : _a.trim()) || "";
  const toName = ((_b = body.toName) == null ? void 0 : _b.trim()) || to.split("@")[0] || "Destinataire";
  const subject = ((_c = body.subject) == null ? void 0 : _c.trim()) || "";
  const message = ((_d = body.message) == null ? void 0 : _d.trim()) || "";
  const attachments = Array.isArray(body.attachments) ? body.attachments.slice(0, ATTACHMENT_LIMITS.MAX_FILES) : [];
  const sendEmail = body.sendEmail !== false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    throw createError({ statusCode: 400, statusMessage: "Adresse email destinataire invalide." });
  }
  if (!subject) throw createError({ statusCode: 400, statusMessage: "Objet requis." });
  if (!message) throw createError({ statusCode: 400, statusMessage: "Message requis." });
  if (sendEmail) {
    if (!isMailConfigured()) {
      throw createError({
        statusCode: 503,
        statusMessage: "SMTP non configur\xE9. Remplissez SMTP_* dans le .env."
      });
    }
    const mail = await sendOutboundMail({
      to,
      subject,
      body: message,
      attachments
    });
    if (!mail.sent) {
      throw createError({
        statusCode: 502,
        statusMessage: mail.error || "\xC9chec de l'envoi du message."
      });
    }
  }
  const saved = await addMessage({
    name: toName,
    email: to,
    subject,
    message,
    source: "outbound",
    replyStatus: sendEmail ? "sent" : "draft",
    attachments: attachments.length ? attachments : void 0
  });
  const updated = await updateMessage(saved.id, {
    read: true,
    repliedAt: (/* @__PURE__ */ new Date()).toISOString(),
    replyStatus: sendEmail ? "sent" : "draft"
  });
  return {
    message: updated || saved,
    mailSent: sendEmail,
    mailSkipped: !sendEmail
  };
});

export { compose_post as default };
//# sourceMappingURL=compose.post.mjs.map
