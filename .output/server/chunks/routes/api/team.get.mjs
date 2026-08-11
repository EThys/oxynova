import { c as defineEventHandler, A as getTeam } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

const team_get = defineEventHandler(async () => {
  const team = await getTeam();
  return team.filter((m) => m.published).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
});

export { team_get as default };
//# sourceMappingURL=team.get.mjs.map
