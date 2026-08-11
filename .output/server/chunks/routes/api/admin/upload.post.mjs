import { c as defineEventHandler, q as readMultipartFormData, e as createError } from '../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../_/auth.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';

const ALLOWED = /* @__PURE__ */ new Set(["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]);
const EXT = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};
const MAX_SIZE = 8 * 1024 * 1024;
const upload_post = defineEventHandler(async (event) => {
  requireAdmin(event);
  const parts = await readMultipartFormData(event);
  if (!(parts == null ? void 0 : parts.length)) {
    throw createError({ statusCode: 400, statusMessage: "Aucun fichier re\xE7u." });
  }
  const file = parts.find((p) => {
    var _a;
    return p.name === "file" && ((_a = p.data) == null ? void 0 : _a.length);
  });
  if (!(file == null ? void 0 : file.data)) {
    throw createError({ statusCode: 400, statusMessage: "Fichier image manquant." });
  }
  if (file.data.length > MAX_SIZE) {
    throw createError({ statusCode: 400, statusMessage: "Image trop lourde (max 8 Mo)." });
  }
  const type = (file.type || "").toLowerCase();
  if (!ALLOWED.has(type)) {
    throw createError({ statusCode: 400, statusMessage: "Formats accept\xE9s : JPG, PNG, WebP, GIF." });
  }
  let ext = EXT[type] || "jpg";
  if (file.filename) {
    const fromName = extname(file.filename).replace(".", "").toLowerCase();
    if (["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)) {
      ext = fromName === "jpeg" ? "jpg" : fromName;
    }
  }
  const dir = join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  await writeFile(join(dir, filename), file.data);
  return { url: `/uploads/${filename}`, filename };
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
