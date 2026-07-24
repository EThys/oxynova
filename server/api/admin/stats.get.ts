export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const [messages, realizations, team, gallery, videos] = await Promise.all([
    getMessages(),
    getRealizations(),
    getTeam(),
    getGallery(),
    getVideos(),
  ])

  return {
    unreadMessages: messages.filter(m => !m.read).length,
    totalMessages: messages.length,
    publishedRealizations: realizations.filter(r => r.published).length,
    totalRealizations: realizations.length,
    publishedTeam: team.filter(m => m.published).length,
    totalTeam: team.length,
    publishedGallery: gallery.filter(g => g.published).length,
    totalGallery: gallery.length,
    publishedVideos: videos.filter(v => v.published).length,
    totalVideos: videos.length,
  }
})
