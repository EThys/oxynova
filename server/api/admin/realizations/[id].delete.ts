export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const deleted = await deleteRealization(id)
  if (!deleted) throw createError({ statusCode: 404, statusMessage: 'Réalisation introuvable.' })
  return { success: true }
})
