export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const query = getQuery(event)
  const limit = Math.min(2000, Math.max(50, Number(query.limit) || 200))
  const kind = String(query.kind || 'all').toLowerCase()
  const raw = await readAuditLogs(kind === 'all' ? limit : 5000)
  const entries = filterAuditLogsByKind(raw, kind).slice(0, limit)

  return {
    total: entries.length,
    items: entries,
  }
})
