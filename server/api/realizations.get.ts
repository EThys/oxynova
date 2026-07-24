export default defineEventHandler(async () => {
  const realizations = await getRealizations()
  return realizations
    .filter(r => r.published)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
})
