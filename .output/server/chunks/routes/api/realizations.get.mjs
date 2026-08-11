import { c as defineEventHandler, w as getRealizations } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

const realizations_get = defineEventHandler(async () => {
  const realizations = await getRealizations();
  return realizations.filter((r) => r.published).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
});

export { realizations_get as default };
//# sourceMappingURL=realizations.get.mjs.map
