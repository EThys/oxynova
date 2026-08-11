import { c as defineEventHandler, g as getRouterParam, e as createError, r as readBody, B as updateTeamMember } from '../../../../_/nitro.mjs';
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
  const updated = await updateTeamMember(id, {
    ...body.name !== void 0 && { name: body.name.trim() },
    ...body.role !== void 0 && { role: body.role.trim() },
    ...body.department !== void 0 && { department: body.department.trim() },
    ...body.bio !== void 0 && { bio: body.bio.trim() },
    ...body.image !== void 0 && { image: body.image.trim() },
    ...body.published !== void 0 && { published: body.published },
    ...body.order !== void 0 && { order: body.order }
  });
  if (!updated) throw createError({ statusCode: 404, statusMessage: "Membre introuvable." });
  return updated;
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
