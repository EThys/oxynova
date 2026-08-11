import nodemailer from 'nodemailer'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { ContactMessage, MessageAttachment } from '~/types/admin'
import { oxynovaContent } from '~/data/content'
import { absoluteUploadPath } from './attachments'
import { htmlToPlainPreview, sanitizeEmailHtml } from './sanitizeHtml'

export type SmtpConfig = {
  host: string
  port: number
  user: string
  pass: string
  from: string
  to: string
  secure: boolean
}

export function getSmtpConfig(): SmtpConfig | null {
  const config = useRuntimeConfig()
  const host = String(config.smtpHost || '').trim()
  const user = String(config.smtpUser || '').trim()
  const pass = String(config.smtpPass || '').trim()
  const to = String(config.smtpTo || config.smtpUser || '').trim()
  const from = String(config.smtpFrom || config.smtpUser || '').trim()
  const port = Number(config.smtpPort || 465)
  const secure = String(config.smtpSecure ?? (port === 465 ? 'true' : 'false')) === 'true'

  if (!host || !user || !pass || !from) return null

  return { host, port, user, pass, from, to: to || from, secure }
}

function createTransporter(smtp: SmtpConfig) {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function ensureLinksOpenInNewTab(html: string) {
  return html.replace(/<a\b([^>]*)>/gi, (_full, attrs: string) => {
    let next = String(attrs || '')
    if (!/\btarget\s*=/i.test(next)) next += ' target="_blank"'
    else {
      next = next.replace(/\btarget\s*=\s*(['"]).*?\1/gi, 'target="_blank"')
      next = next.replace(/\btarget\s*=\s*[^\s>]+/gi, 'target="_blank"')
    }
    if (!/\brel\s*=/i.test(next)) next += ' rel="noopener noreferrer"'
    return `<a${next}>`
  })
}

function getSiteUrl() {
  const config = useRuntimeConfig()
  return String(config.public.siteUrl || 'https://www.oxynovardc.com').replace(/\/$/, '')
}

function getSignatureInfo(siteUrl: string) {
  const c = oxynovaContent.contact
  return {
    company: oxynovaContent.fullName,
    tagline: oxynovaContent.tagline,
    address: c.address,
    phone: c.phone,
    phoneAlt: c.phoneAlt,
    email: c.email,
    siteUrl,
    siteLabel: siteUrl.replace(/^https?:\/\//, ''),
  }
}

function buildSignatureText(siteUrl: string) {
  const s = getSignatureInfo(siteUrl)
  return [
    '',
    '—',
    s.company,
    s.tagline,
    s.address,
    `Tél. : ${s.phone}${s.phoneAlt ? ` / ${s.phoneAlt}` : ''}`,
    `Email : ${s.email}`,
    s.siteUrl,
  ].join('\n')
}

function buildSignatureHtml(siteUrl: string) {
  const s = getSignatureInfo(siteUrl)
  const phoneHref = s.phone.replace(/\s+/g, '')
  const phoneAltHref = s.phoneAlt?.replace(/\s+/g, '') || ''

  return `
    <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e5e7eb;font-family:Arial,Helvetica,sans-serif">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;max-width:480px">
        <tr>
          <td style="vertical-align:top;padding-right:16px;width:64px">
            <img src="cid:oxynova-logo" alt="OXYNOVA RDC" width="56" height="56" style="display:block;border:0;border-radius:6px;object-fit:contain" />
          </td>
          <td style="vertical-align:top;font-size:13px;line-height:1.5;color:#1a1a1b">
            <strong style="color:#174794;font-size:14px">${escapeHtml(s.company)}</strong><br />
            <span style="color:#64748b">${escapeHtml(s.tagline)}</span><br />
            <span style="color:#475569;display:inline-block;margin-top:6px">${escapeHtml(s.address)}</span><br />
            <span style="display:inline-block;margin-top:4px">
              <a href="tel:${escapeHtml(phoneHref)}" style="color:#174794;text-decoration:none">${escapeHtml(s.phone)}</a>
              ${s.phoneAlt ? ` <span style="color:#94a3b8">·</span> <a href="tel:${escapeHtml(phoneAltHref)}" style="color:#174794;text-decoration:none">${escapeHtml(s.phoneAlt)}</a>` : ''}
            </span><br />
            <a href="mailto:${escapeHtml(s.email)}" style="color:#174794;text-decoration:none">${escapeHtml(s.email)}</a><br />
            <a href="${escapeHtml(s.siteUrl)}" style="color:#174794;text-decoration:none;font-weight:600">${escapeHtml(s.siteLabel)}</a>
          </td>
        </tr>
      </table>
    </div>
  `
}

async function logoAttachment() {
  const logoPath = join(process.cwd(), 'public', 'images', 'logo.png')
  try {
    await readFile(logoPath)
    return {
      filename: 'logo-oxynova.png',
      path: logoPath,
      cid: 'oxynova-logo',
      contentType: 'image/png',
    }
  }
  catch {
    return null
  }
}

export async function sendContactNotification(message: ContactMessage): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  const smtp = getSmtpConfig()
  if (!smtp) {
    return { sent: false, skipped: true }
  }

  const transporter = createTransporter(smtp)

  const lines = [
    `Nouveau message depuis le site OXYNOVA RDC`,
    '',
    `Nom : ${message.name}`,
    `Email : ${message.email}`,
    message.phone ? `Téléphone : ${message.phone}` : null,
    message.company ? `Entreprise : ${message.company}` : null,
    `Sujet : ${message.subject}`,
    '',
    'Message :',
    message.message,
    '',
    `Reçu le : ${new Date(message.createdAt).toLocaleString('fr-FR')}`,
    `ID : ${message.id}`,
  ].filter(Boolean)

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1a1a1b">
      <h2 style="color:#174794;margin:0 0 16px">Nouveau message — OXYNOVA RDC</h2>
      <p><strong>Nom :</strong> ${escapeHtml(message.name)}</p>
      <p><strong>Email :</strong> <a href="mailto:${escapeHtml(message.email)}">${escapeHtml(message.email)}</a></p>
      ${message.phone ? `<p><strong>Téléphone :</strong> ${escapeHtml(message.phone)}</p>` : ''}
      ${message.company ? `<p><strong>Entreprise :</strong> ${escapeHtml(message.company)}</p>` : ''}
      <p><strong>Sujet :</strong> ${escapeHtml(message.subject)}</p>
      <div style="margin-top:16px;padding:16px;background:#f5f7fb;border-left:4px solid #174794">
        ${escapeHtml(message.message).replace(/\n/g, '<br>')}
      </div>
      <p style="margin-top:16px;font-size:12px;color:#666">
        Reçu le ${escapeHtml(new Date(message.createdAt).toLocaleString('fr-FR'))} · ID ${escapeHtml(message.id)}
      </p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"OXYNOVA RDC Site" <${smtp.from}>`,
      to: smtp.to,
      replyTo: message.email,
      subject: `[Contact OXYNOVA] ${message.subject}`,
      text: lines.join('\n'),
      html,
    })
    return { sent: true }
  }
  catch (error) {
    const err = error instanceof Error ? error.message : 'Erreur SMTP inconnue'
    console.error('[mail] Échec envoi contact:', err)
    return { sent: false, error: err }
  }
}

async function toNodemailerAttachments(files: MessageAttachment[] = []) {
  const out: { filename: string; path: string; contentType?: string }[] = []
  for (const file of files) {
    try {
      await readFile(absoluteUploadPath(file.url))
      out.push({
        filename: file.filename,
        path: absoluteUploadPath(file.url),
        contentType: file.contentType,
      })
    }
    catch {
      console.warn('[mail] Pièce jointe introuvable:', file.url)
    }
  }
  return out
}

export async function sendAdminReply(
  message: ContactMessage,
  replyText: string,
  replyAttachments: MessageAttachment[] = [],
): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  const subjectBase = message.subject?.replace(/^(\s*re:\s*)+/i, '').trim() || 'votre message'
  return sendOutboundMail({
    to: message.email,
    subject: `Re: ${subjectBase}`,
    body: replyText,
    attachments: replyAttachments,
    inReplyTo: message.emailMessageId,
  })
}

/** Nouveau message ou réponse générique */
export async function sendOutboundMail(input: {
  to: string
  subject: string
  body: string
  attachments?: MessageAttachment[]
  inReplyTo?: string
}): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  const smtp = getSmtpConfig()
  if (!smtp) {
    return { sent: false, skipped: true }
  }

  const siteUrl = getSiteUrl()
  const transporter = createTransporter(smtp)
  const fileAttachments = await toNodemailerAttachments(input.attachments || [])
  const logo = await logoAttachment()
  const body = input.body.trim()
  const looksHtml = /<[a-z][\s\S]*>/i.test(body)
  const safeHtml = looksHtml ? sanitizeEmailHtml(body) : ''
  const plain = looksHtml
    ? htmlToPlainPreview(safeHtml || body, 5000)
    : body
  const htmlInner = looksHtml
    ? ensureLinksOpenInNewTab(safeHtml || body)
    : escapeHtml(body).replace(/\n/g, '<br>')

  const text = `${plain}${buildSignatureText(siteUrl)}`

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:#1a1a1b">
      <div>${htmlInner}</div>
      ${buildSignatureHtml(siteUrl)}
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"OXYNOVA RDC" <${smtp.from}>`,
      to: input.to,
      replyTo: smtp.from,
      subject: input.subject.trim(),
      text,
      html,
      attachments: [
        ...fileAttachments,
        ...(logo ? [logo] : []),
      ],
      headers: input.inReplyTo
        ? { 'In-Reply-To': input.inReplyTo, References: input.inReplyTo }
        : undefined,
    })
    return { sent: true }
  }
  catch (error) {
    const err = error instanceof Error ? error.message : 'Erreur SMTP inconnue'
    console.error('[mail] Échec envoi:', err)
    return { sent: false, error: err }
  }
}

export function isMailConfigured(): boolean {
  return getSmtpConfig() !== null
}
