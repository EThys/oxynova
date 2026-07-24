export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const items = await getGallery()
  const item = items.find(i => i.id === id)
  if (!item) throw createError({ statusCode: 404, statusMessage: 'Image introuvable.' })
  return item
})
