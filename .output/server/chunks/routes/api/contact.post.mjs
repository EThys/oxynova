import { c as defineEventHandler, r as readBody, e as createError, n as addMessage } from '../../_/nitro.mjs';
import { b as sendContactNotification } from '../../_/mail.mjs';
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
import '../../_/attachments.mjs';
import '../../_/sanitizeHtml.mjs';

const contact_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const body = await readBody(event);
  if (!((_a = body.name) == null ? void 0 : _a.trim()) || !((_b = body.email) == null ? void 0 : _b.trim()) || !((_c = body.subject) == null ? void 0 : _c.trim()) || !((_d = body.message) == null ? void 0 : _d.trim())) {
    throw createError({ statusCode: 400, statusMessage: "Tous les champs obligatoires doivent \xEAtre remplis." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email.trim())) {
    throw createError({ statusCode: 400, statusMessage: "Adresse email invalide." });
  }
  const message = await addMessage({
    name: body.name.trim(),
    email: body.email.trim(),
    phone: ((_e = body.phone) == null ? void 0 : _e.trim()) || void 0,
    company: ((_f = body.company) == null ? void 0 : _f.trim()) || void 0,
    subject: body.subject.trim(),
    message: body.message.trim(),
    source: "web"
  });
  const mail = await sendContactNotification(message);
  return {
    success: true,
    id: message.id,
    mailSent: mail.sent,
    mailSkipped: Boolean(mail.skipped)
  };
});

export { contact_post as default };
//# sourceMappingURL=contact.post.mjs.map
