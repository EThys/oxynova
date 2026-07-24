export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name?: string
    email?: string
    phone?: string
    company?: string
    subject?: string
    message?: string
  }>(event)

  if (!body.name?.trim() || !body.email?.trim() || !body.subject?.trim() || !body.message?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Tous les champs obligatoires doivent être remplis.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email.trim())) {
    throw createError({ statusCode: 400, statusMessage: 'Adresse email invalide.' })
  }

  const message = await addMessage({
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone?.trim() || undefined,
    company: body.company?.trim() || undefined,
    subject: body.subject.trim(),
    message: body.message.trim(),
  })

  return { success: true, id: message.id }
})
