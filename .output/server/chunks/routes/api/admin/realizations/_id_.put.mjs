import { c as defineEventHandler, g as getRouterParam, e as createError, r as readBody, x as updateRealization } from '../../../../_/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  requireAdmin(event);
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "ID manquant." });
  const body = await readBody(event);
  const updated = await updateRealization(id, {
    ...body.partner !== void 0 && { partner: body.partner.trim() },
    ...body.domain !== void 0 && { domain: body.domain.trim() },
    ...body.description !== void 0 && { description: body.description.trim() },
    ...body.status !== void 0 && { status: body.status.trim() },
    ...body.image !== void 0 && { image: body.image.trim() },
    ...body.published !== void 0 && { published: body.published }
  });
  if (!updated) throw createError({ statusCode: 404, statusMessage: "R\xE9alisation introuvable." });
  return updated;
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
