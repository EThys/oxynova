export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const messages = await getMessages()
  return messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})
