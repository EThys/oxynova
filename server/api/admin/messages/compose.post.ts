export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const body = await readBody<{
    to?: string
    toName?: string
    subject?: string
    message?: string
    sendEmail?: boolean
    attachments?: import('~/types/admin').MessageAttachment[]
  }>(event)

  const to = body.to?.trim() || ''
  const toName = body.toName?.trim() || to.split('@')[0] || 'Destinataire'
  const subject = body.subject?.trim() || ''
  const message = body.message?.trim() || ''
  const attachments = Array.isArray(body.attachments) ? body.attachments.slice(0, ATTACHMENT_LIMITS.MAX_FILES) : []
  const sendEmail = body.sendEmail !== false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(to)) {
    throw createError({ statusCode: 400, statusMessage: 'Adresse email destinataire invalide.' })
  }
  if (!subject) throw createError({ statusCode: 400, statusMessage: 'Objet requis.' })
  if (!message) throw createError({ statusCode: 400, statusMessage: 'Message requis.' })

  if (sendEmail) {
    if (!isMailConfigured()) {
      throw createError({
        statusCode: 503,
        statusMessage: 'SMTP non configuré. Remplissez SMTP_* dans le .env.',
      })
    }

    const mail = await sendOutboundMail({
      to,
      subject,
      body: message,
      attachments,
    })

    if (!mail.sent) {
      throw createError({
        statusCode: 502,
        statusMessage: mail.error || 'Échec de l\'envoi du message.',
      })
    }
  }

  const saved = await addMessage({
    name: toName,
    email: to,
    subject,
    message,
    source: 'outbound',
    reply: message,
    replyStatus: sendEmail ? 'sent' : 'draft',
    replyAttachments: attachments.length ? attachments : undefined,
  })

  // addMessage force read:false — on corrige pour un message sortant
  const updated = await updateMessage(saved.id, {
    read: true,
    reply: message,
    repliedAt: new Date().toISOString(),
    replyStatus: sendEmail ? 'sent' : 'draft',
    replyAttachments: attachments.length ? attachments : undefined,
  })

  return {
    message: updated || saved,
    mailSent: sendEmail,
    mailSkipped: !sendEmail,
  }
})
