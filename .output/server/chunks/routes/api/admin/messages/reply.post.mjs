import { c as defineEventHandler, r as readBody, e as createError, o as getMessages, l as updateMessage } from '../../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../../_/auth.mjs';
import { A as ATTACHMENT_LIMITS } from '../../../../_/attachments.mjs';
import { i as isMailConfigured, a as sendAdminReply } from '../../../../_/mail.mjs';
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

const reply_post = defineEventHandler(async (event) => {
  var _a, _b;
  requireAdmin(event);
  const body = await readBody(event);
  const id = (_a = body.id) == null ? void 0 : _a.trim();
  const reply = (_b = body.reply) == null ? void 0 : _b.trim();
  const attachments = Array.isArray(body.attachments) ? body.attachments.slice(0, ATTACHMENT_LIMITS.MAX_FILES) : [];
  if (!id) throw createError({ statusCode: 400, statusMessage: "ID manquant." });
  if (!reply) throw createError({ statusCode: 400, statusMessage: "La r\xE9ponse ne peut pas \xEAtre vide." });
  const messages = await getMessages();
  const message = messages.find((m) => m.id === id);
  if (!message) throw createError({ statusCode: 404, statusMessage: "Message introuvable." });
  const sendEmail = body.sendEmail !== false;
  let mailSent = false;
  let mailSkipped = false;
  if (sendEmail) {
    if (!isMailConfigured()) {
      throw createError({
        statusCode: 503,
        statusMessage: "SMTP non configur\xE9. Remplissez SMTP_* dans le .env pour envoyer depuis l'admin."
      });
    }
    const mail = await sendAdminReply(message, reply, attachments);
    if (!mail.sent) {
      throw createError({
        statusCode: 502,
        statusMessage: mail.error || "\xC9chec de l'envoi de la r\xE9ponse par email."
      });
    }
    mailSent = true;
  } else {
    mailSkipped = true;
  }
  const updated = await updateMessage(id, {
    reply,
    repliedAt: (/* @__PURE__ */ new Date()).toISOString(),
    read: true,
    replyStatus: sendEmail ? "sent" : "draft",
    replyAttachments: attachments.length ? attachments : void 0
  });
  return {
    message: updated,
    mailSent,
    mailSkipped
  };
});

export { reply_post as default };
//# sourceMappingURL=reply.post.mjs.map
