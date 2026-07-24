export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const items = await getVideos()
  return items.sort((a, b) => a.order - b.order || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
})
