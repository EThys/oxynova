export default defineEventHandler(async (event) => {
  requireAdmin(event)

  if (!isImapConfigured()) {
    throw createError({
      statusCode: 503,
      statusMessage: 'IMAP non configuré. Ajoutez IMAP_HOST / IMAP_USER / IMAP_PASS dans le .env (Hostinger).',
    })
  }

  const query = getQuery(event)
  const limit = Math.min(100, Math.max(10, Number(query.limit) || 50))
  const result = await syncInboxToMessages(limit)

  if (result.error) {
    await appendAuditLog(event, {
      action: 'mail_sync',
      success: false,
      detail: result.error,
    })
    throw createError({
      statusCode: 502,
      statusMessage: `Échec sync IMAP : ${result.error}`,
    })
  }

  await appendAuditLog(event, {
    action: 'mail_sync',
    success: true,
    detail: `Importés: ${result.imported}, ignorés: ${result.skipped}, lus: ${result.totalFetched}`,
  })

  return result
})
