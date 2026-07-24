export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const deleted = await deleteGalleryImage(id)
  if (!deleted) throw createError({ statusCode: 404, statusMessage: 'Image introuvable.' })
  return { success: true }
})
