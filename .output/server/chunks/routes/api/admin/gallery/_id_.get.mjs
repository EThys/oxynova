import { c as defineEventHandler, g as getRouterParam, e as createError, h as getGallery } from '../../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

const _id__get = defineEventHandler(async (event) => {
  requireAdmin(event);
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "ID manquant." });
  const items = await getGallery();
  const item = items.find((i) => i.id === id);
  if (!item) throw createError({ statusCode: 404, statusMessage: "Image introuvable." });
  return item;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
