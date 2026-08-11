import { c as defineEventHandler, w as getRealizations } from '../../../_/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  requireAdmin(event);
  const realizations = await getRealizations();
  return realizations.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
});

export { index_get as default };
//# sourceMappingURL=index3.get.mjs.map
