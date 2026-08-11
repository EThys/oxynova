import { c as defineEventHandler, o as getMessages } from '../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../_/auth.mjs';
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

const stats_get = defineEventHandler(async (event) => {
  requireAdmin(event);
  const messages = await getMessages();
  return {
    total: messages.length,
    unread: messages.filter((m) => getMessageStatus(m) === "unread").length,
    read: messages.filter((m) => getMessageStatus(m) === "read").length,
    draft: messages.filter((m) => getMessageStatus(m) === "draft").length,
    sent: messages.filter((m) => getMessageStatus(m) === "sent").length,
    fromWeb: messages.filter((m) => (m.source || "web") === "web").length,
    fromEmail: messages.filter((m) => m.source === "email").length,
    outbound: messages.filter((m) => m.source === "outbound").length,
    recent: [...messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8)
  };
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
