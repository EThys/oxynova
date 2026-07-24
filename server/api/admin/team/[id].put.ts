export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID manquant.' })

  const body = await readBody<{
    name?: string
    role?: string
    department?: string
    bio?: string
    image?: string
    published?: boolean
    order?: number
  }>(event)

  const updated = await updateTeamMember(id, {
    ...(body.name !== undefined && { name: body.name.trim() }),
    ...(body.role !== undefined && { role: body.role.trim() }),
    ...(body.department !== undefined && { department: body.department.trim() }),
    ...(body.bio !== undefined && { bio: body.bio.trim() }),
    ...(body.image !== undefined && { image: body.image.trim() }),
    ...(body.published !== undefined && { published: body.published }),
    ...(body.order !== undefined && { order: body.order }),
  })

  if (!updated) throw createError({ statusCode: 404, statusMessage: 'Membre introuvable.' })
  return updated
})
