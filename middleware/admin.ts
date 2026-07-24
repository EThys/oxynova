export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') return

  const { authenticated, fetchAuth } = useAdminAuth()
  await fetchAuth()

  if (!authenticated.value) {
    return navigateTo('/admin/login')
  }
})
