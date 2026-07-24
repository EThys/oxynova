export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const body = await readBody<{
    title?: string
    caption?: string
    image?: string
    published?: boolean
    order?: number
  }>(event)

  const updated = await updateGalleryImage(id, {
    ...(body.title !== undefined && { title: body.title.trim() }),
    ...(body.caption !== undefined && { caption: body.caption.trim() }),
    ...(body.image !== undefined && { image: body.image.trim() }),
    ...(body.published !== undefined && { published: body.published }),
    ...(body.order !== undefined && { order: body.order }),
  })

  if (!updated) throw createError({ statusCode: 404, statusMessage: 'Image introuvable.' })
  return updated
})
