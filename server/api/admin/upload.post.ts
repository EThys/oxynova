import { writeFile, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { randomUUID } from 'node:crypto'

const ALLOWED = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'])
const EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}
const MAX_SIZE = 8 * 1024 * 1024 // 8 MB

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const parts = await readMultipartFormData(event)
  if (!parts?.length) {
    throw createError({ statusCode: 400, statusMessage: 'Aucun fichier reçu.' })
  }

  const file = parts.find(p => p.name === 'file' && p.data?.length)
  if (!file?.data) {
    throw createError({ statusCode: 400, statusMessage: 'Fichier image manquant.' })
  }

  if (file.data.length > MAX_SIZE) {
    throw createError({ statusCode: 400, statusMessage: 'Image trop lourde (max 8 Mo).' })
  }

  const type = (file.type || '').toLowerCase()
  if (!ALLOWED.has(type)) {
    throw createError({ statusCode: 400, statusMessage: 'Formats acceptés : JPG, PNG, WebP, GIF.' })
  }

  let ext = EXT[type] || 'jpg'
  if (file.filename) {
    const fromName = extname(file.filename).replace('.', '').toLowerCase()
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fromName)) {
      ext = fromName === 'jpeg' ? 'jpg' : fromName
    }
  }

  const dir = join(process.cwd(), 'public', 'uploads')
  await mkdir(dir, { recursive: true })

  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`
  await writeFile(join(dir, filename), file.data)

  return { url: `/uploads/${filename}`, filename }
})
