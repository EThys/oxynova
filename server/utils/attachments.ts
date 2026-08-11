import { mkdir, writeFile } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { randomUUID } from 'node:crypto'
import type { MessageAttachment } from '~/types/admin'

const MAIL_DIR = join(process.cwd(), 'public', 'uploads', 'mail')
const MAX_FILE = 12 * 1024 * 1024 // 12 Mo
const MAX_FILES = 5

const ALLOWED_EXT = new Set([
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
  'txt', 'csv', 'rtf', 'odt', 'ods',
  'jpg', 'jpeg', 'png', 'webp', 'gif',
  'zip', 'rar', '7z',
])

export function isAllowedAttachment(filename: string, contentType?: string) {
  const ext = extname(filename).replace('.', '').toLowerCase()
  if (ALLOWED_EXT.has(ext)) return true
  const type = (contentType || '').toLowerCase()
  if (type.startsWith('image/')) return true
  if (type === 'application/pdf') return true
  if (type.includes('officedocument') || type.includes('msword') || type.includes('excel')) return true
  if (type === 'application/zip' || type === 'application/x-zip-compressed') return true
  return false
}

export async function ensureMailUploadDir() {
  await mkdir(MAIL_DIR, { recursive: true })
}

function safeExt(filename: string, contentType?: string) {
  const fromName = extname(filename).replace('.', '').toLowerCase()
  if (fromName && ALLOWED_EXT.has(fromName)) return fromName === 'jpeg' ? 'jpg' : fromName
  if (contentType?.includes('pdf')) return 'pdf'
  if (contentType?.startsWith('image/')) {
    const sub = contentType.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg'
    return ALLOWED_EXT.has(sub) ? sub : 'bin'
  }
  return 'bin'
}

export async function saveMailAttachment(input: {
  filename: string
  data: Buffer
  contentType?: string
}): Promise<MessageAttachment | null> {
  if (!input.data?.length || input.data.length > MAX_FILE) return null
  const original = (input.filename || 'piece-jointe').replace(/[^\w.\-() ]+/g, '_').slice(0, 120)
  if (!isAllowedAttachment(original, input.contentType)) return null

  await ensureMailUploadDir()
  const ext = safeExt(original, input.contentType)
  const stored = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`
  await writeFile(join(MAIL_DIR, stored), input.data)

  return {
    id: randomUUID().slice(0, 12),
    filename: original,
    url: `/uploads/mail/${stored}`,
    size: input.data.length,
    contentType: input.contentType || 'application/octet-stream',
  }
}

export function absoluteUploadPath(url: string) {
  // /uploads/mail/xxx → public/uploads/mail/xxx
  const rel = url.replace(/^\//, '')
  return join(process.cwd(), 'public', rel)
}

export const ATTACHMENT_LIMITS = { MAX_FILE, MAX_FILES }
