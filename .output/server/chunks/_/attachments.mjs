import { writeFile, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { randomUUID } from 'node:crypto';

const MAIL_DIR = join(process.cwd(), "public", "uploads", "mail");
const MAX_FILE = 12 * 1024 * 1024;
const MAX_FILES = 5;
const ALLOWED_EXT = /* @__PURE__ */ new Set([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "csv",
  "rtf",
  "odt",
  "ods",
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "zip",
  "rar",
  "7z"
]);
function isAllowedAttachment(filename, contentType) {
  const ext = extname(filename).replace(".", "").toLowerCase();
  if (ALLOWED_EXT.has(ext)) return true;
  const type = (contentType || "").toLowerCase();
  if (type.startsWith("image/")) return true;
  if (type === "application/pdf") return true;
  if (type.includes("officedocument") || type.includes("msword") || type.includes("excel")) return true;
  if (type === "application/zip" || type === "application/x-zip-compressed") return true;
  return false;
}
async function ensureMailUploadDir() {
  await mkdir(MAIL_DIR, { recursive: true });
}
function safeExt(filename, contentType) {
  var _a;
  const fromName = extname(filename).replace(".", "").toLowerCase();
  if (fromName && ALLOWED_EXT.has(fromName)) return fromName === "jpeg" ? "jpg" : fromName;
  if (contentType == null ? void 0 : contentType.includes("pdf")) return "pdf";
  if (contentType == null ? void 0 : contentType.startsWith("image/")) {
    const sub = ((_a = contentType.split("/")[1]) == null ? void 0 : _a.replace("jpeg", "jpg")) || "jpg";
    return ALLOWED_EXT.has(sub) ? sub : "bin";
  }
  return "bin";
}
async function saveMailAttachment(input) {
  var _a;
  if (!((_a = input.data) == null ? void 0 : _a.length) || input.data.length > MAX_FILE) return null;
  const original = (input.filename || "piece-jointe").replace(/[^\w.\-() ]+/g, "_").slice(0, 120);
  if (!isAllowedAttachment(original, input.contentType)) return null;
  await ensureMailUploadDir();
  const ext = safeExt(original, input.contentType);
  const stored = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  await writeFile(join(MAIL_DIR, stored), input.data);
  return {
    id: randomUUID().slice(0, 12),
    filename: original,
    url: `/uploads/mail/${stored}`,
    size: input.data.length,
    contentType: input.contentType || "application/octet-stream"
  };
}
function absoluteUploadPath(url) {
  const rel = url.replace(/^\//, "");
  return join(process.cwd(), "public", rel);
}
const ATTACHMENT_LIMITS = { MAX_FILE, MAX_FILES };

export { ATTACHMENT_LIMITS as A, absoluteUploadPath as a, isAllowedAttachment as i, saveMailAttachment as s };
//# sourceMappingURL=attachments.mjs.map
