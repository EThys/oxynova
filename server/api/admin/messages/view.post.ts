export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const body = await readBody<{ id?: string }>(event)
  const id = body.id?.trim()
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const msg = await getMessageById(id)
  if (!msg) throw createError({ statusCode: 404, statusMessage: 'Message introuvable.' })

  const wasUnread = !msg.read && msg.source !== 'outbound'
  if (wasUnread) {
    await updateMessage(id, { read: true })
  }

  await appendAuditLog(event, {
    action: 'mail_view',
    success: true,
    detail: `Lecture — ${msg.name} <${msg.email}> | ${msg.subject}${wasUnread ? ' (première ouverture)' : ''}`,
  })

  return { success: true, read: true }
})
