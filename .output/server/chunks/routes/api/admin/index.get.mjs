import { c as defineEventHandler, h as getGallery } from '../../../_/nitro.mjs';
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
  const items = await getGallery();
  return items.sort((a, b) => a.order - b.order || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
