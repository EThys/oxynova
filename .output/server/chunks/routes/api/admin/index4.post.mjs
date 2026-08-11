import { c as defineEventHandler, r as readBody, e as createError, H as addVideo } from '../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../_/auth.mjs';
import { e as extractYoutubeId } from '../../../_/admin.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

const index_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  requireAdmin(event);
  const body = await readBody(event);
  if (!((_a = body.title) == null ? void 0 : _a.trim()) || !((_b = body.youtubeUrl) == null ? void 0 : _b.trim())) {
    throw createError({ statusCode: 400, statusMessage: "Titre et lien YouTube sont obligatoires." });
  }
  const youtubeId = extractYoutubeId(body.youtubeUrl);
  if (!youtubeId) {
    throw createError({ statusCode: 400, statusMessage: "Lien YouTube invalide." });
  }
  return addVideo({
    title: body.title.trim(),
    description: ((_c = body.description) == null ? void 0 : _c.trim()) || "",
    youtubeUrl: body.youtubeUrl.trim(),
    youtubeId,
    published: (_d = body.published) != null ? _d : true,
    order: typeof body.order === "number" ? body.order : 0
  });
});

export { index_post as default };
//# sourceMappingURL=index4.post.mjs.map
