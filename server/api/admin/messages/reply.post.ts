export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const body = await readBody<{
    id?: string
    reply?: string
    sendEmail?: boolean
    attachments?: import('~/types/admin').MessageAttachment[]
  }>(event)

  const id = body.id?.trim()
  const reply = body.reply?.trim()
  const attachments = Array.isArray(body.attachments) ? body.attachments.slice(0, ATTACHMENT_LIMITS.MAX_FILES) : []

  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })
  if (!reply) throw createError({ statusCode: 400, statusMessage: 'La réponse ne peut pas être vide.' })

  const messages = await getMessages()
  const message = messages.find(m => m.id === id)
  if (!message) throw createError({ statusCode: 404, statusMessage: 'Message introuvable.' })

  const sendEmail = body.sendEmail !== false
  let mailSent = false
  let mailSkipped = false

  if (sendEmail) {
    if (!isMailConfigured()) {
      throw createError({
        statusCode: 503,
        statusMessage: 'SMTP non configuré. Remplissez SMTP_* dans le .env pour envoyer depuis l\'admin.',
      })
    }

    const mail = await sendAdminReply(message, reply, attachments)
    if (!mail.sent) {
      throw createError({
        statusCode: 502,
        statusMessage: mail.error || 'Échec de l\'envoi de la réponse par email.',
      })
    }
    mailSent = true
  }
  else {
    mailSkipped = true
  }

  const updated = await updateMessage(id, {
    reply,
    repliedAt: new Date().toISOString(),
    read: true,
    replyStatus: sendEmail ? 'sent' : 'draft',
    replyAttachments: attachments.length ? attachments : undefined,
  })

  return {
    message: updated,
    mailSent,
    mailSkipped,
  }
})
