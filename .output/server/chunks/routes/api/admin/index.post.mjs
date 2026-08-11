import { c as defineEventHandler, r as readBody, e as createError, j as addGalleryImage } from '../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../_/auth.mjs';
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
  if (!((_a = body.title) == null ? void 0 : _a.trim()) || !((_b = body.image) == null ? void 0 : _b.trim())) {
    throw createError({ statusCode: 400, statusMessage: "Titre et URL de l'image sont obligatoires." });
  }
  return addGalleryImage({
    title: body.title.trim(),
    caption: ((_c = body.caption) == null ? void 0 : _c.trim()) || "",
    image: body.image.trim(),
    published: (_d = body.published) != null ? _d : true,
    order: typeof body.order === "number" ? body.order : 0
  });
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
