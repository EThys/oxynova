import { c as defineEventHandler, g as getRouterParam, e as createError, r as readBody, i as updateGalleryImage } from '../../../../_/nitro.mjs';
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
  const updated = await updateGalleryImage(id, {
    ...body.title !== void 0 && { title: body.title.trim() },
    ...body.caption !== void 0 && { caption: body.caption.trim() },
    ...body.image !== void 0 && { image: body.image.trim() },
    ...body.published !== void 0 && { published: body.published },
    ...body.order !== void 0 && { order: body.order }
  });
  if (!updated) throw createError({ statusCode: 404, statusMessage: "Image introuvable." });
  return updated;
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
