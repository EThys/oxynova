export default defineEventHandler(async () => {
  const items = await getGallery()
  return items
    .filter(i => i.published)
    .sort((a, b) => a.order - b.order || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
})
