import { c as defineEventHandler, r as readBody, e as createError, y as addRealization } from '../../../_/nitro.mjs';
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
  var _a, _b, _c, _d, _e, _f;
  requireAdmin(event);
  const body = await readBody(event);
  if (!((_a = body.partner) == null ? void 0 : _a.trim()) || !((_b = body.description) == null ? void 0 : _b.trim()) || !((_c = body.domain) == null ? void 0 : _c.trim())) {
    throw createError({ statusCode: 400, statusMessage: "Partenaire, description et domaine sont obligatoires." });
  }
  const realization = await addRealization({
    partner: body.partner.trim(),
    domain: body.domain.trim(),
    description: body.description.trim(),
    status: ((_d = body.status) == null ? void 0 : _d.trim()) || "\u2014",
    image: ((_e = body.image) == null ? void 0 : _e.trim()) || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    published: (_f = body.published) != null ? _f : true
  });
  return realization;
});

export { index_post as default };
//# sourceMappingURL=index2.post.mjs.map
