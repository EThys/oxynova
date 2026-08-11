import { c as defineEventHandler, e as createError, o as getQuery } from '../../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../../_/auth.mjs';
import { i as isImapConfigured, a as syncInboxToMessages } from '../../../../_/imap.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';
import 'imapflow';
import 'mailparser';
import '../../../../_/attachments.mjs';
import '../../../../_/sanitizeHtml.mjs';

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
