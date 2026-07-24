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

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  read: boolean
  reply?: string
  repliedAt?: string
  createdAt: string
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
