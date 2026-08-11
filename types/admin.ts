export interface Realization {
  id: string
  partner: string
  domain: string
  description: string
  status: string
  image: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  bio: string
  image: string
  published: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface GalleryImage {
  id: string
  title: string
  caption: string
  image: string
  published: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface VideoItem {
  id: string
  title: string
  description: string
  youtubeUrl: string
  youtubeId: string
  published: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface MessageAttachment {
  id: string
  /** Nom d'origine affiché */
  filename: string
  /** Chemin public ex. /uploads/mail/xxx.pdf */
  url: string
  size: number
  contentType: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  /** Corps HTML (mails IMAP riches : images, liens, mise en page) */
  messageHtml?: string
  read: boolean
  reply?: string
  repliedAt?: string
  /** none = pas de réponse, draft = brouillon, sent = réponse envoyée */
  replyStatus?: 'none' | 'draft' | 'sent'
  createdAt: string
  /** Origine : formulaire site, boîte mail IMAP, ou message sortant admin */
  source?: 'web' | 'email' | 'outbound'
  /** Message-ID IMAP pour éviter les doublons */
  emailMessageId?: string
  /** UID IMAP (Hostinger) pour suppression / sync */
  imapUid?: number
  /** Dossier IMAP d’origine (ex. INBOX) */
  imapMailbox?: string
  /** Pièces jointes reçues */
  attachments?: MessageAttachment[]
  /** Pièces jointes de la réponse admin */
  replyAttachments?: MessageAttachment[]
}

export type MessageFilterStatus = 'all' | 'unread' | 'read' | 'draft' | 'sent'

export function getMessageStatus(m: ContactMessage): Exclude<MessageFilterStatus, 'all'> {
  if (m.replyStatus === 'sent') return 'sent'
  if (m.replyStatus === 'draft') return 'draft'
  // Compat anciens messages
  if (m.reply?.trim()) return 'sent'
  if (!m.read) return 'unread'
  return 'read'
}

export const MESSAGE_STATUS_LABELS: Record<MessageFilterStatus, string> = {
  all: 'Tous',
  unread: 'Non lus',
  read: 'Lus',
  draft: 'Brouillons',
  sent: 'Envoyés',
}

export type RealizationInput = Omit<Realization, 'id' | 'createdAt' | 'updatedAt'>
export type TeamMemberInput = Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>
export type GalleryImageInput = Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt'>
export type VideoItemInput = Omit<VideoItem, 'id' | 'createdAt' | 'updatedAt'>

export type ContactMessageInput = Pick<ContactMessage, 'name' | 'email' | 'phone' | 'company' | 'subject' | 'message'>

export const REALIZATION_DOMAINS = [
  'Ingénierie biomédicale',
  'Infrastructures hospitalières',
  'Digitalisation',
  'Formation',
  'Hygiène & sécurité',
  'Gestion de projets',
] as const

export const CONTACT_SUBJECTS: Record<string, string> = {
  biomedical: 'Ingénierie biomédicale',
  infrastructure: 'Infrastructures hospitalières',
  digital: 'Digitalisation',
  formation: 'Formation',
  hygiene: 'Hygiène & sécurité',
  projet: 'Gestion de projets',
  devis: 'Demande de devis',
  autre: 'Autre demande',
}

/** Extract YouTube video ID from common URL formats */
export function extractYoutubeId(url: string): string | null {
  const trimmed = url.trim()
  if (!trimmed) return null
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed

  try {
    const u = new URL(trimmed)
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.split('/').filter(Boolean)[0]
      return id?.slice(0, 11) || null
    }
    if (u.searchParams.get('v')) return u.searchParams.get('v')
    const embed = u.pathname.match(/\/(?:embed|shorts|v)\/([a-zA-Z0-9_-]{11})/)
    if (embed) return embed[1]
  }
  catch {
    return null
  }
  return null
}
