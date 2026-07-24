export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const team = await getTeam()
  return team.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
})
