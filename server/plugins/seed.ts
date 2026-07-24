export default defineNitroPlugin(async () => {
  const now = new Date().toISOString()

  await seedRealizationsIfEmpty(
    seedRealizations.map(r => ({ ...r, createdAt: now, updatedAt: now })),
  )
  await seedTeamIfEmpty(
    seedTeam.map(m => ({ ...m, createdAt: now, updatedAt: now })),
  )
  await seedGalleryIfEmpty(
    seedGallery.map(g => ({ ...g, createdAt: now, updatedAt: now })),
  )
  await seedVideosIfEmpty(
    seedVideos.map(v => ({ ...v, createdAt: now, updatedAt: now })),
  )
})
