export default defineEventHandler((event) => {
  clearAdminSession(event)
  return { success: true }
})
