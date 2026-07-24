import { extractYoutubeId } from '~/types/admin'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const body = await readBody<{
    title?: string
    description?: string
    youtubeUrl?: string
    published?: boolean
    order?: number
  }>(event)

  const patch: Parameters<typeof updateVideo>[1] = {
    ...(body.title !== undefined && { title: body.title.trim() }),
    ...(body.description !== undefined && { description: body.description.trim() }),
    ...(body.published !== undefined && { published: body.published }),
    ...(body.order !== undefined && { order: body.order }),
  }

  if (body.youtubeUrl !== undefined) {
    const youtubeId = extractYoutubeId(body.youtubeUrl)
    if (!youtubeId) {
      throw createError({ statusCode: 400, statusMessage: 'Lien YouTube invalide.' })
    }
    patch.youtubeUrl = body.youtubeUrl.trim()
    patch.youtubeId = youtubeId
  }

  const updated = await updateVideo(id, patch)
  if (!updated) throw createError({ statusCode: 404, statusMessage: 'Vidéo introuvable.' })
  return updated
})
