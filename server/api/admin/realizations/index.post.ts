export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody<{
    partner?: string
    domain?: string
    description?: string
    status?: string
    image?: string
    published?: boolean
  }>(event)

  if (!body.partner?.trim() || !body.description?.trim() || !body.domain?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Partenaire, description et domaine sont obligatoires.' })
  }

  const realization = await addRealization({
    partner: body.partner.trim(),
    domain: body.domain.trim(),
    description: body.description.trim(),
    status: body.status?.trim() || '—',
    image: body.image?.trim() || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    published: body.published ?? true,
  })

  return realization
})
