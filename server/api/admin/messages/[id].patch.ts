export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const body = await readBody<{ read?: boolean; reply?: string }>(event)

  const patch: Partial<Pick<import('~/types/admin').ContactMessage, 'read' | 'reply' | 'repliedAt'>> = {}
  if (body.read !== undefined) patch.read = body.read
  if (body.reply !== undefined) {
    patch.reply = body.reply.trim()
    patch.repliedAt = patch.reply ? new Date().toISOString() : undefined
    if (patch.reply) patch.read = true
  }

  const updated = await updateMessage(id, patch)
  if (!updated) throw createError({ statusCode: 404, statusMessage: 'Message introuvable.' })
  return updated
})
