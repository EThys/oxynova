export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody<{
    title?: string
    caption?: string
    image?: string
    published?: boolean
    order?: number
  }>(event)

  if (!body.title?.trim() || !body.image?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Titre et URL de l\'image sont obligatoires.' })
  }

  return addGalleryImage({
    title: body.title.trim(),
    caption: body.caption?.trim() || '',
    image: body.image.trim(),
    published: body.published ?? true,
    order: typeof body.order === 'number' ? body.order : 0,
  })
})
