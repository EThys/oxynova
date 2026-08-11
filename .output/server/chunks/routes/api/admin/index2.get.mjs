import { c as defineEventHandler, o as getQuery, p as getMessages } from '../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../_/auth.mjs';
import { s as syncInboxIfDue } from '../../../_/imap.mjs';
import { g as getMessageStatus } from '../../../_/admin.mjs';
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
import '../../../_/attachments.mjs';
import '../../../_/sanitizeHtml.mjs';

const index_get = defineEventHandler(async (event) => {
  requireAdmin(event);
  const query = getQuery(event);
  const wantSync = query.sync === "1" || query.sync === "true";
  if (wantSync) {
    await syncInboxIfDue({ throttleMs: 15e3 });
  }
  const status = String(query.status || "all");
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(5, Number(query.limit) || 10));
  let messages = await getMessages();
  messages = [...messages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const counts = {
    all: messages.length,
    unread: messages.filter((m) => getMessageStatus(m) === "unread").length,
    read: messages.filter((m) => getMessageStatus(m) === "read").length,
    draft: messages.filter((m) => getMessageStatus(m) === "draft").length,
    sent: messages.filter((m) => getMessageStatus(m) === "sent").length
  };
  const filtered = status === "all" ? messages : messages.filter((m) => getMessageStatus(m) === status);
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, pages);
  const start = (safePage - 1) * limit;
  const items = filtered.slice(start, start + limit);
  return {
    items,
    total,
    page: safePage,
    limit,
    pages,
    counts
  };
});

export { index_get as default };
//# sourceMappingURL=index2.get.mjs.map
