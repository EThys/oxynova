export default defineEventHandler(async (event) => {
  const body = await readBody<{ password?: string; clientInfo?: unknown }>(event)
  const clientInfo = normalizeClientInfo(body.clientInfo)
  const ok = checkAdminPassword(event, body.password || '')

  if (!ok) {
    await appendAuditLog(event, {
      action: 'login_failed',
      success: false,
      detail: 'Mot de passe incorrect',
      clientInfo,
    })
    throw createError({ statusCode: 401, statusMessage: 'Mot de passe incorrect.' })
  }

  if (clientInfo) setDeviceProfileCookie(event, clientInfo)
  setAdminSession(event)

  const bits = [
    clientInfo?.platform,
    clientInfo?.screen ? `écran ${clientInfo.screen}` : null,
    clientInfo?.timezone,
    clientInfo?.language,
    clientInfo?.cores != null ? `${clientInfo.cores} cœurs` : null,
    clientInfo?.memoryGb != null ? `~${clientInfo.memoryGb} Go RAM` : null,
    clientInfo?.touch ? 'tactile' : null,
  ].filter(Boolean)

  await appendAuditLog(event, {
    action: 'login_success',
    success: true,
    detail: bits.length ? bits.join(' · ') : 'Session admin ouverte',
    clientInfo,
  })
  return { success: true }
})
