import { c as defineEventHandler, F as getVideos } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

const videos_get = defineEventHandler(async () => {
  const items = await getVideos();
  return items.filter((i) => i.published).sort((a, b) => a.order - b.order || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
});

export { videos_get as default };
//# sourceMappingURL=videos.get.mjs.map
