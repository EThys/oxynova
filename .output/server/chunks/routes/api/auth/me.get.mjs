import { c as defineEventHandler } from '../../../_/nitro.mjs';
import { i as isAdminAuthenticated } from '../../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

const me_get = defineEventHandler((event) => {
  return { authenticated: isAdminAuthenticated(event) };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
