export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const team = await getTeam()
  const item = team.find(m => m.id === id)
  if (!item) throw createError({ statusCode: 404, statusMessage: 'Membre introuvable.' })
  return item
})
