export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const realizations = await getRealizations()
  const item = realizations.find(r => r.id === id)
  if (!item) throw createError({ statusCode: 404, statusMessage: 'Réalisation introuvable.' })
  return item
})
