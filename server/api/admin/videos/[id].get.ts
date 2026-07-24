export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const items = await getVideos()
  const item = items.find(i => i.id === id)
  if (!item) throw createError({ statusCode: 404, statusMessage: 'Vidéo introuvable.' })
  return item
})
