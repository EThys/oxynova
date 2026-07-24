export default defineEventHandler(async () => {
  const team = await getTeam()
  return team
    .filter(m => m.published)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
})
