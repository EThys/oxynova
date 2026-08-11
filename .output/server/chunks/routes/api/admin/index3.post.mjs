import { c as defineEventHandler, r as readBody, e as createError, C as addTeamMember } from '../../../_/nitro.mjs';
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
  if (!((_a = body.name) == null ? void 0 : _a.trim()) || !((_b = body.role) == null ? void 0 : _b.trim())) {
    throw createError({ statusCode: 400, statusMessage: "Nom et r\xF4le sont obligatoires." });
  }
  return addTeamMember({
    name: body.name.trim(),
    role: body.role.trim(),
    department: ((_c = body.department) == null ? void 0 : _c.trim()) || "\u2014",
    bio: ((_d = body.bio) == null ? void 0 : _d.trim()) || "",
    image: ((_e = body.image) == null ? void 0 : _e.trim()) || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80",
    published: (_f = body.published) != null ? _f : true,
    order: typeof body.order === "number" ? body.order : 0
  });
});

export { index_post as default };
//# sourceMappingURL=index3.post.mjs.map
