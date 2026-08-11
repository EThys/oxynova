export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const parts = await readMultipartFormData(event)
  if (!parts?.length) {
    throw createError({ statusCode: 400, statusMessage: 'Aucun fichier reçu.' })
  }

  const file = parts.find(p => p.name === 'file' && p.data?.length)
  if (!file?.data) {
    throw createError({ statusCode: 400, statusMessage: 'Fichier manquant.' })
  }

  if (file.data.length > ATTACHMENT_LIMITS.MAX_FILE) {
    throw createError({ statusCode: 400, statusMessage: 'Fichier trop lourd (max 12 Mo).' })
  }

  const filename = file.filename || 'piece-jointe'
  if (!isAllowedAttachment(filename, file.type)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Type de fichier non autorisé (PDF, Office, images, ZIP, TXT…).',
    })
  }

  const saved = await saveMailAttachment({
    filename,
    data: file.data,
    contentType: file.type,
  })

  if (!saved) {
    throw createError({ statusCode: 400, statusMessage: 'Impossible d\'enregistrer le fichier.' })
  }

  return saved
})
