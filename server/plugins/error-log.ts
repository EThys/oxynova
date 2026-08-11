export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', (error, { event }) => {
    const path = event ? (event.path || event.node?.req?.url || '') : ''
    console.error('[nitro:error]', path, error?.stack || error)
  })
})
