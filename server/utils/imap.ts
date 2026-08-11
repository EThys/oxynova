import { ImapFlow } from 'imapflow'
import { simpleParser } from 'mailparser'
import type { ContactMessage } from '~/types/admin'
import { saveMailAttachment } from './attachments'

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
        const attachments: ContactMessage['attachments'] = []

        if (msg.source) {
          try {
            const parsed = await simpleParser(msg.source)
            messageId = messageId || parsed.messageId?.trim()
            textBody = (
              parsed.text
              || parsed.html?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
              || ''
            ).trim()

            const parts = parsed.attachments || []
            for (const part of parts) {
              if (!part.content || part.content.length === 0) continue
              // Ignore inline tiny images often used as signatures
              if (part.contentDisposition === 'inline' && part.contentType?.startsWith('image/') && part.content.length < 20_000) {
                continue
              }
              const saved = await saveMailAttachment({
                filename: part.filename || `piece-${attachments.length + 1}`,
                data: Buffer.isBuffer(part.content) ? part.content : Buffer.from(part.content),
                contentType: part.contentType,
              })
              if (saved) attachments.push(saved)
            }
          }
          catch {
            textBody = ''
          }
        }

        const emailMessageId = messageId || `imap-uid-${msg.uid}`
        if (knownIds.has(emailMessageId)) {
          skipped++
          continue
        }

        const createdAt = envelope?.date
          ? new Date(envelope.date).toISOString()
          : new Date().toISOString()

        const record: Omit<ContactMessage, 'id' | 'read' | 'createdAt'> & {
          emailMessageId: string
          source: 'email'
          createdAt?: string
        } = {
          name: from.name,
          email: from.email,
          subject,
          message: textBody || '(Contenu du message non lisible en texte)',
          source: 'email',
          emailMessageId,
        }

        // Insertion manuelle pour conserver la date d'origine du mail
        const messages = await getMessages()
        if (messages.some(m => m.emailMessageId === emailMessageId)) {
          skipped++
          continue
        }

        const entry: ContactMessage = {
          ...record,
          id: `email-${Date.now()}-${msg.uid}`,
          read: false,
          createdAt,
          source: 'email',
          emailMessageId,
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
