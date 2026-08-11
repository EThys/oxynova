import { c as defineEventHandler, B as getTeam } from '../../../_/nitro.mjs';
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
  const team = await getTeam();
  return team.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
});

export { index_get as default };
//# sourceMappingURL=index4.get.mjs.map
