import { extractYoutubeId } from '~/types/admin'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody<{
    title?: string
    description?: string
    youtubeUrl?: string
    published?: boolean
    order?: number
  }>(event)

  if (!body.title?.trim() || !body.youtubeUrl?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Titre et lien YouTube sont obligatoires.' })
  }

  const youtubeId = extractYoutubeId(body.youtubeUrl)
  if (!youtubeId) {
    throw createError({ statusCode: 400, statusMessage: 'Lien YouTube invalide.' })
  }

  return addVideo({
    title: body.title.trim(),
    description: body.description?.trim() || '',
    youtubeUrl: body.youtubeUrl.trim(),
    youtubeId,
    published: body.published ?? true,
    order: typeof body.order === 'number' ? body.order : 0,
  })
})
