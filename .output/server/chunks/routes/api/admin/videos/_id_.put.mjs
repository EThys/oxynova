import { c as defineEventHandler, g as getRouterParam, e as createError, r as readBody, F as updateVideo } from '../../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../../_/auth.mjs';
import { e as extractYoutubeId } from '../../../../_/admin.mjs';
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
  const patch = {
    ...body.title !== void 0 && { title: body.title.trim() },
    ...body.description !== void 0 && { description: body.description.trim() },
    ...body.published !== void 0 && { published: body.published },
    ...body.order !== void 0 && { order: body.order }
  };
  if (body.youtubeUrl !== void 0) {
    const youtubeId = extractYoutubeId(body.youtubeUrl);
    if (!youtubeId) {
      throw createError({ statusCode: 400, statusMessage: "Lien YouTube invalide." });
    }
    patch.youtubeUrl = body.youtubeUrl.trim();
    patch.youtubeId = youtubeId;
  }
  const updated = await updateVideo(id, patch);
  if (!updated) throw createError({ statusCode: 404, statusMessage: "Vid\xE9o introuvable." });
  return updated;
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
