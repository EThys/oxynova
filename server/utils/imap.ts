import { ImapFlow } from 'imapflow'
import { simpleParser } from 'mailparser'
import type { ContactMessage } from '~/types/admin'
import { saveMailAttachment } from './attachments'
import { htmlToPlainPreview, sanitizeEmailHtml } from './sanitizeHtml'

export type ImapConfig = {
  host: string
  port: number
  user: string
  pass: string
  secure: boolean
  mailbox: string
}

export function getImapConfig(): ImapConfig | null {
  const config = useRuntimeConfig()
  const host = String(config.imapHost || '').trim()
  const user = String(config.imapUser || config.smtpUser || '').trim()
  const pass = String(config.imapPass || config.smtpPass || '').trim()
  const port = Number(config.imapPort || 993)
  const secure = String(config.imapSecure ?? 'true') === 'true'
  const mailbox = String(config.imapMailbox || 'INBOX').trim() || 'INBOX'

  if (!host || !user || !pass) return null
  return { host, port, user, pass, secure, mailbox }
}

export function isImapConfigured(): boolean {
  return getImapConfig() !== null
}

function parseAddress(value?: { name?: string; address?: string } | Array<{ name?: string; address?: string }> | null) {
  const entry = Array.isArray(value) ? value[0] : value
  if (!entry) return { name: 'Expéditeur inconnu', email: 'inconnu@email.com' }
  return {
    name: entry.name?.trim() || entry.address?.split('@')[0] || 'Expéditeur',
    email: entry.address?.trim() || 'inconnu@email.com',
  }
}

function shouldSkipEmail(subject: string, fromEmail: string, ownAddresses: string[]) {
  const sub = subject.toLowerCase()
  // Notifications générées par le site (évite doublons formulaire → mail → admin)
  if (sub.includes('[contact oxynova]')) return true
  if (ownAddresses.some(addr => addr && fromEmail.toLowerCase() === addr.toLowerCase())) return true
  return false
}

export type ImapSyncResult = {
  configured: boolean
  imported: number
  skipped: number
  totalFetched: number
  error?: string
}

/**
 * Importe les derniers mails de la boîte Hostinger dans messages.json
 * (sans doublon grâce à emailMessageId).
 */
export async function syncInboxToMessages(limit = 50): Promise<ImapSyncResult> {
  const imap = getImapConfig()
  if (!imap) {
    return { configured: false, imported: 0, skipped: 0, totalFetched: 0 }
  }

  const runtime = useRuntimeConfig()
  const ownAddresses = [
    String(runtime.smtpUser || ''),
    String(runtime.smtpFrom || ''),
    String(runtime.imapUser || ''),
    imap.user,
  ].filter(Boolean)

  const existing = await getMessages()
  const knownIds = new Set(
    existing.map(m => m.emailMessageId).filter((id): id is string => Boolean(id)),
  )

  const client = new ImapFlow({
    host: imap.host,
    port: imap.port,
    secure: imap.secure,
    auth: {
      user: imap.user,
      pass: imap.pass,
    },
    logger: false,
  })

  let imported = 0
  let skipped = 0
  let totalFetched = 0

  try {
    await client.connect()
    const lock = await client.getMailboxLock(imap.mailbox)

    try {
      const status = await client.status(imap.mailbox, { messages: true })
      const total = status.messages || 0
      if (total === 0) {
        return { configured: true, imported: 0, skipped: 0, totalFetched: 0 }
      }

      const start = Math.max(1, total - limit + 1)
      const range = `${start}:${total}`

      for await (const msg of client.fetch(range, {
        uid: true,
        envelope: true,
        source: true,
      })) {
        totalFetched++
        const envelope = msg.envelope
        const subject = envelope?.subject?.trim() || '(Sans objet)'
        const from = parseAddress(envelope?.from)

        if (shouldSkipEmail(subject, from.email, ownAddresses)) {
          skipped++
          continue
        }

        let messageId = envelope?.messageId?.trim()
        let textBody = ''
        let htmlBody = ''
        const attachments: ContactMessage['attachments'] = []

        if (msg.source) {
          try {
            const parsed = await simpleParser(msg.source)
            messageId = messageId || parsed.messageId?.trim()

            const cidToUrl = new Map<string, string>()
            const parts = parsed.attachments || []
            for (const part of parts) {
              if (!part.content || part.content.length === 0) continue
              const data = Buffer.isBuffer(part.content) ? part.content : Buffer.from(part.content)
              const isImage = (part.contentType || '').startsWith('image/')
              const isInline = part.contentDisposition === 'inline' || Boolean(part.cid)

              // Images inline (cid) : toujours sauver pour affichage HTML
              // Autres pièces : sauver sauf mini-icônes décoratives sans cid
              if (isInline && isImage && !part.cid && data.length < 8_000) continue

              const saved = await saveMailAttachment({
                filename: part.filename || (isImage ? `image-${attachments.length + 1}.png` : `piece-${attachments.length + 1}`),
                data,
                contentType: part.contentType,
              })
              if (!saved) continue

              if (part.cid) {
                const cid = String(part.cid).replace(/^<|>$/g, '').trim()
                if (cid) cidToUrl.set(cid.toLowerCase(), saved.url)
              }

              // Ne pas polluer la liste PJ avec toutes les images de signature/tracking
              // sauf si ce n'est pas purement inline, ou fichier nommé utile
              if (!isInline || part.filename) {
                attachments.push(saved)
              }
            }

            let rawHtml = typeof parsed.html === 'string' ? parsed.html : ''
            if (rawHtml && cidToUrl.size) {
              for (const [cid, url] of cidToUrl) {
                const re = new RegExp(`cid:${cid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi')
                rawHtml = rawHtml.replace(re, url)
              }
            }

            if (rawHtml) {
              htmlBody = sanitizeEmailHtml(rawHtml)
            }

            textBody = (
              parsed.text
              || (htmlBody ? htmlToPlainPreview(htmlBody, 2000) : '')
              || ''
            ).trim()
          }
          catch {
            textBody = ''
            htmlBody = ''
          }
        }

        const emailMessageId = messageId || `imap-uid-${msg.uid}`
        const existingIdx = (await getMessages()).findIndex(m => m.emailMessageId === emailMessageId)
        if (existingIdx >= 0) {
          // Enrichir un ancien import (HTML / UID IMAP)
          const all = await getMessages()
          const prev = all[existingIdx]
          if (prev) {
            const needsHtml = Boolean(htmlBody && !prev.messageHtml)
            const needsUid = !prev.imapUid && Boolean(msg.uid)
            if (needsHtml || needsUid) {
              all[existingIdx] = {
                ...prev,
                message: needsHtml ? (textBody || prev.message) : prev.message,
                messageHtml: needsHtml ? htmlBody : prev.messageHtml,
                attachments: prev.attachments?.length ? prev.attachments : (attachments.length ? attachments : undefined),
                imapUid: prev.imapUid || msg.uid,
                imapMailbox: prev.imapMailbox || imap.mailbox,
              }
              await saveMessages(all)
            }
          }
          skipped++
          continue
        }

        if (knownIds.has(emailMessageId)) {
          skipped++
          continue
        }

        const createdAt = envelope?.date
          ? new Date(envelope.date).toISOString()
          : new Date().toISOString()

        const messages = await getMessages()

        const entry: ContactMessage = {
          name: from.name,
          email: from.email,
          subject,
          message: textBody || '(Contenu du message non lisible)',
          messageHtml: htmlBody || undefined,
          id: `email-${Date.now()}-${msg.uid}`,
          read: false,
          createdAt,
          source: 'email',
          emailMessageId,
          imapUid: msg.uid,
          imapMailbox: imap.mailbox,
          attachments: attachments.length ? attachments : undefined,
        }
        messages.unshift(entry)
        messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        await saveMessages(messages)
        knownIds.add(emailMessageId)
        imported++
      }
    }
    finally {
      lock.release()
    }

    await client.logout()
    return { configured: true, imported, skipped, totalFetched }
  }
  catch (error) {
    const err = error instanceof Error ? error.message : 'Erreur IMAP inconnue'
    console.error('[imap] Sync failed:', err)
    try {
      await client.logout()
    }
    catch {
      // ignore
    }
    return { configured: true, imported, skipped, totalFetched, error: err }
  }
}

function normalizeMessageId(id: string) {
  return id.trim().replace(/^<|>$/g, '')
}

export type ImapDeleteResult = {
  deleted: boolean
  /** Message déjà absent côté serveur (OK pour poursuivre la suppression locale) */
  notFound?: boolean
  error?: string
}

/**
 * Supprime un mail sur Hostinger (IMAP) via UID ou Message-ID.
 * Expunge immédiat pour qu’il disparaisse vraiment de la boîte.
 */
export async function deleteRemoteEmail(options: {
  imapUid?: number
  emailMessageId?: string
  mailbox?: string
}): Promise<ImapDeleteResult> {
  const imap = getImapConfig()
  if (!imap) {
    return { deleted: false, error: 'IMAP non configuré' }
  }

  const mailbox = (options.mailbox || imap.mailbox).trim() || imap.mailbox
  let uid = options.imapUid && Number.isFinite(options.imapUid) ? Number(options.imapUid) : undefined

  if (!uid && options.emailMessageId?.startsWith('imap-uid-')) {
    const parsed = Number(options.emailMessageId.slice('imap-uid-'.length))
    if (Number.isFinite(parsed)) uid = parsed
  }

  const client = new ImapFlow({
    host: imap.host,
    port: imap.port,
    secure: imap.secure,
    auth: {
      user: imap.user,
      pass: imap.pass,
    },
    logger: false,
  })

  try {
    await client.connect()
    const lock = await client.getMailboxLock(mailbox)

    try {
      if (!uid && options.emailMessageId) {
        const raw = options.emailMessageId.trim()
        const bare = normalizeMessageId(raw)
        const candidates = Array.from(new Set([
          raw,
          bare,
          bare ? `<${bare}>` : '',
        ].filter(Boolean)))

        for (const candidate of candidates) {
          const found = await client.search(
            { header: { 'message-id': candidate } },
            { uid: true },
          )
          if (Array.isArray(found) && found.length) {
            uid = found[0]
            break
          }
        }
      }

      if (!uid) {
        return { deleted: false, notFound: true, error: 'Message introuvable sur Hostinger' }
      }

      const ok = await client.messageDelete(String(uid), { uid: true })
      if (!ok) {
        return { deleted: false, notFound: true, error: 'Message déjà absent sur Hostinger' }
      }
      return { deleted: true }
    }
    finally {
      lock.release()
    }
  }
  catch (error) {
    const err = error instanceof Error ? error.message : 'Erreur IMAP inconnue'
    console.error('[imap] Delete failed:', err)
    return { deleted: false, error: err }
  }
  finally {
    try {
      await client.logout()
    }
    catch {
      // ignore
    }
  }
}

/** Sync IMAP au plus une fois toutes les N secondes (rafraîchissement page / polling). */
let lastAutoSyncAt = 0
let autoSyncInFlight: Promise<ImapSyncResult | null> | null = null

export async function syncInboxIfDue(options?: {
  force?: boolean
  throttleMs?: number
  limit?: number
}): Promise<ImapSyncResult | null> {
  if (!isImapConfigured()) return null

  const force = options?.force === true
  const throttleMs = options?.throttleMs ?? 20_000
  const now = Date.now()

  if (!force && now - lastAutoSyncAt < throttleMs) {
    return null
  }

  if (autoSyncInFlight) return autoSyncInFlight

  autoSyncInFlight = (async () => {
    lastAutoSyncAt = Date.now()
    try {
      return await syncInboxToMessages(options?.limit ?? 50)
    }
    finally {
      autoSyncInFlight = null
    }
  })()

  return autoSyncInFlight
}
