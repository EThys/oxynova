export default defineEventHandler(async (event) => {
  await appendAuditLog(event, {
    action: 'logout',
    success: true,
    detail: 'Session admin fermée',
  })
  clearAdminSession(event)
  clearDeviceProfileCookie(event)
  return { success: true }
})
