import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { c as checkAdminPassword, s as setAdminSession } from '../../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!checkAdminPassword(event, body.password || "")) {
    throw createError({ statusCode: 401, statusMessage: "Mot de passe incorrect." });
  }
  setAdminSession(event);
  return { success: true };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
