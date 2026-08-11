import { c as defineEventHandler, h as getGallery } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

const gallery_get = defineEventHandler(async () => {
  const items = await getGallery();
  return items.filter((i) => i.published).sort((a, b) => a.order - b.order || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
});

export { gallery_get as default };
//# sourceMappingURL=gallery.get.mjs.map
