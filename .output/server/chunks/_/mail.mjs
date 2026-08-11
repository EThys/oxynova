import { u as useRuntimeConfig } from './nitro.mjs';
import nodemailer from 'nodemailer';
import { readFile } from 'node:fs/promises';
import { a as absoluteUploadPath } from './attachments.mjs';

function getSmtpConfig() {
  var _a;
  const config = useRuntimeConfig();
  const host = String(config.smtpHost || "").trim();
  const user = String(config.smtpUser || "").trim();
  const pass = String(config.smtpPass || "").trim();
  const to = String(config.smtpTo || config.smtpUser || "").trim();
  const from = String(config.smtpFrom || config.smtpUser || "").trim();
  const port = Number(config.smtpPort || 465);
  const secure = String((_a = config.smtpSecure) != null ? _a : port === 465 ? "true" : "false") === "true";
  if (!host || !user || !pass || !from) return null;
  return { host, port, user, pass, from, to: to || from, secure };
}
function createTransporter(smtp) {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass
    }
  });
}
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
async function sendContactNotification(message) {
  const smtp = getSmtpConfig();
  if (!smtp) {
    return { sent: false, skipped: true };
  }
  const transporter = createTransporter(smtp);
  const lines = [
    `Nouveau message depuis le site OXYNOVA RDC`,
    "",
    `Nom : ${message.name}`,
    `Email : ${message.email}`,
    message.phone ? `T\xE9l\xE9phone : ${message.phone}` : null,
    message.company ? `Entreprise : ${message.company}` : null,
    `Sujet : ${message.subject}`,
    "",
    "Message :",
    message.message,
    "",
    `Re\xE7u le : ${new Date(message.createdAt).toLocaleString("fr-FR")}`,
    `ID : ${message.id}`
  ].filter(Boolean);
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1a1a1b">
      <h2 style="color:#174794;margin:0 0 16px">Nouveau message \u2014 OXYNOVA RDC</h2>
      <p><strong>Nom :</strong> ${escapeHtml(message.name)}</p>
      <p><strong>Email :</strong> <a href="mailto:${escapeHtml(message.email)}">${escapeHtml(message.email)}</a></p>
      ${message.phone ? `<p><strong>T\xE9l\xE9phone :</strong> ${escapeHtml(message.phone)}</p>` : ""}
      ${message.company ? `<p><strong>Entreprise :</strong> ${escapeHtml(message.company)}</p>` : ""}
      <p><strong>Sujet :</strong> ${escapeHtml(message.subject)}</p>
      <div style="margin-top:16px;padding:16px;background:#f5f7fb;border-left:4px solid #174794">
        ${escapeHtml(message.message).replace(/\n/g, "<br>")}
      </div>
      <p style="margin-top:16px;font-size:12px;color:#666">
        Re\xE7u le ${escapeHtml(new Date(message.createdAt).toLocaleString("fr-FR"))} \xB7 ID ${escapeHtml(message.id)}
      </p>
    </div>
  `;
  try {
    await transporter.sendMail({
      from: `"OXYNOVA RDC Site" <${smtp.from}>`,
      to: smtp.to,
      replyTo: message.email,
      subject: `[Contact OXYNOVA] ${message.subject}`,
      text: lines.join("\n"),
      html
    });
    return { sent: true };
  } catch (error) {
    const err = error instanceof Error ? error.message : "Erreur SMTP inconnue";
    console.error("[mail] \xC9chec envoi contact:", err);
    return { sent: false, error: err };
  }
}
async function toNodemailerAttachments(files = []) {
  const out = [];
  for (const file of files) {
    try {
      await readFile(absoluteUploadPath(file.url));
      out.push({
        filename: file.filename,
        path: absoluteUploadPath(file.url),
        contentType: file.contentType
      });
    } catch {
      console.warn("[mail] Pi\xE8ce jointe introuvable:", file.url);
    }
  }
  return out;
}
async function sendAdminReply(message, replyText, replyAttachments = []) {
  var _a;
  const subjectBase = ((_a = message.subject) == null ? void 0 : _a.replace(/^(\s*re:\s*)+/i, "").trim()) || "votre message";
  return sendOutboundMail({
    to: message.email,
    subject: `Re: ${subjectBase}`,
    body: replyText,
    attachments: replyAttachments,
    inReplyTo: message.emailMessageId
  });
}
async function sendOutboundMail(input) {
  const smtp = getSmtpConfig();
  if (!smtp) {
    return { sent: false, skipped: true };
  }
  const transporter = createTransporter(smtp);
  const attachments = await toNodemailerAttachments(input.attachments || []);
  const body = input.body.trim();
  const text = [
    body,
    "",
    "\u2014",
    "OXYNOVA RDC SARL",
    "Ing\xE9nierie biom\xE9dicale \u2014 Kinshasa, RDC"
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1a1b">
      <div style="white-space:pre-wrap">${escapeHtml(body).replace(/\n/g, "<br>")}</div>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0" />
      <p style="font-size:13px;color:#174794;font-weight:700;margin:0">OXYNOVA RDC SARL</p>
      <p style="font-size:12px;color:#666;margin:4px 0 0">Ing\xE9nierie biom\xE9dicale \u2014 Kinshasa, RDC</p>
    </div>
  `;
  try {
    await transporter.sendMail({
      from: `"OXYNOVA RDC" <${smtp.from}>`,
      to: input.to,
      replyTo: smtp.from,
      subject: input.subject.trim(),
      text,
      html,
      attachments,
      headers: input.inReplyTo ? { "In-Reply-To": input.inReplyTo, References: input.inReplyTo } : void 0
    });
    return { sent: true };
  } catch (error) {
    const err = error instanceof Error ? error.message : "Erreur SMTP inconnue";
    console.error("[mail] \xC9chec envoi:", err);
    return { sent: false, error: err };
  }
}
function isMailConfigured() {
  return getSmtpConfig() !== null;
}

export { sendAdminReply as a, sendContactNotification as b, isMailConfigured as i, sendOutboundMail as s };
//# sourceMappingURL=mail.mjs.map
