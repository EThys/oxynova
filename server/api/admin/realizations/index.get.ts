export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const realizations = await getRealizations()
  return realizations.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
})
