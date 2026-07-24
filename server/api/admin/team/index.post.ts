export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody<{
    name?: string
    role?: string
    department?: string
    bio?: string
    image?: string
    published?: boolean
    order?: number
  }>(event)

  if (!body.name?.trim() || !body.role?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Nom et rôle sont obligatoires.' })
  }

  return addTeamMember({
    name: body.name.trim(),
    role: body.role.trim(),
    department: body.department?.trim() || '—',
    bio: body.bio?.trim() || '',
    image: body.image?.trim() || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80',
    published: body.published ?? true,
    order: typeof body.order === 'number' ? body.order : 0,
  })
})
