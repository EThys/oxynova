import { c as defineEventHandler } from '../../../_/nitro.mjs';
import { a as clearAdminSession } from '../../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

const logout_post = defineEventHandler((event) => {
  clearAdminSession(event);
  return { success: true };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
