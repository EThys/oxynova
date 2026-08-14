export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const msg = await getMessageById(id)
  if (!msg) throw createError({ statusCode: 404, statusMessage: 'Message introuvable.' })

  let remoteDeleted = false
  let remoteSkipped = false
  let remoteError: string | undefined

  // Mails importés depuis Hostinger : supprimer aussi côté serveur
  // (sinon la prochaine sync les réimporterait).
  if (msg.source === 'email') {
    if (!isImapConfigured()) {
      remoteSkipped = true
      remoteError = 'IMAP non configuré — suppression locale uniquement'
    }
    else if (!msg.imapUid && !msg.emailMessageId) {
      remoteSkipped = true
      remoteError = 'Identifiant IMAP manquant — suppression locale uniquement'
    }
    else {
      const remote = await deleteRemoteEmail({
        imapUid: msg.imapUid,
        emailMessageId: msg.emailMessageId,
        mailbox: msg.imapMailbox,
      })

      if (remote.deleted) {
        remoteDeleted = true
      }
      else if (remote.notFound) {
        // Déjà parti de la boîte : OK, on continue en local
        remoteSkipped = true
      }
      else {
        throw createError({
          statusCode: 502,
          statusMessage: `Suppression Hostinger échouée : ${remote.error || 'erreur inconnue'}. Le message n’a pas été supprimé localement.`,
        })
      }
    }
  }
  else {
    remoteSkipped = true
  }

  const deleted = await deleteMessage(id)
  if (!deleted) throw createError({ statusCode: 404, statusMessage: 'Message introuvable.' })

  await appendAuditLog(event, {
    action: 'mail_delete',
    success: true,
    detail: `${msg.email} | ${msg.subject}${remoteDeleted ? ' (+ Hostinger)' : ''}`,
  })

  return {
    success: true,
    remoteDeleted,
    remoteSkipped,
    remoteError,
  }
})
