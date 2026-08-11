import { c as defineEventHandler, g as getRouterParam, e as createError, r as readBody, l as updateMessage } from '../../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

const _id__patch = defineEventHandler(async (event) => {
  requireAdmin(event);
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "ID manquant." });
  const body = await readBody(event);
  const patch = {};
  if (body.read !== void 0) patch.read = body.read;
  if (body.reply !== void 0) {
    patch.reply = body.reply.trim();
    patch.repliedAt = patch.reply ? (/* @__PURE__ */ new Date()).toISOString() : void 0;
    if (patch.reply) patch.read = true;
  }
  const updated = await updateMessage(id, patch);
  if (!updated) throw createError({ statusCode: 404, statusMessage: "Message introuvable." });
  return updated;
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
