export default defineEventHandler(async (event) => {
  const body = await readBody<{ password?: string }>(event)

  if (!checkAdminPassword(event, body.password || '')) {
    throw createError({ statusCode: 401, statusMessage: 'Mot de passe incorrect.' })
  }

  setAdminSession(event)
  return { success: true }
})
