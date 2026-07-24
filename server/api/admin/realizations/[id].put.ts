export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const body = await readBody<{
    partner?: string
    domain?: string
    description?: string
    status?: string
    image?: string
    published?: boolean
  }>(event)

  const updated = await updateRealization(id, {
    ...(body.partner !== undefined && { partner: body.partner.trim() }),
    ...(body.domain !== undefined && { domain: body.domain.trim() }),
    ...(body.description !== undefined && { description: body.description.trim() }),
    ...(body.status !== undefined && { status: body.status.trim() }),
    ...(body.image !== undefined && { image: body.image.trim() }),
    ...(body.published !== undefined && { published: body.published }),
  })

  if (!updated) throw createError({ statusCode: 404, statusMessage: 'Réalisation introuvable.' })
  return updated
})
