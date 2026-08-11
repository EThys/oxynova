import { c as defineEventHandler, q as readMultipartFormData, e as createError } from '../../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../../_/auth.mjs';
import { A as ATTACHMENT_LIMITS, i as isAllowedAttachment, s as saveMailAttachment } from '../../../../_/attachments.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

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
    throw createError({ statusCode: 400, statusMessage: "Fichier manquant." });
  }
  if (file.data.length > ATTACHMENT_LIMITS.MAX_FILE) {
    throw createError({ statusCode: 400, statusMessage: "Fichier trop lourd (max 12 Mo)." });
  }
  const filename = file.filename || "piece-jointe";
  if (!isAllowedAttachment(filename, file.type)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Type de fichier non autoris\xE9 (PDF, Office, images, ZIP, TXT\u2026)."
    });
  }
  const saved = await saveMailAttachment({
    filename,
    data: file.data,
    contentType: file.type
  });
  if (!saved) {
    throw createError({ statusCode: 400, statusMessage: "Impossible d'enregistrer le fichier." });
  }
  return saved;
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
