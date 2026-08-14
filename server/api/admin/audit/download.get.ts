export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const query = getQuery(event)
  const limit = Math.min(5000, Math.max(50, Number(query.limit) || 2000))
  const format = String(query.format || 'excel').toLowerCase()
  const kind = String(query.kind || 'all').toLowerCase()

  const entries = filterAuditLogsByKind(await readAuditLogs(5000), kind).slice(0, limit)

  await appendAuditLog(event, {
    action: 'audit_download',
    success: true,
    detail: `Export ${format}${kind !== 'all' ? ` (${kind})` : ''} — ${entries.length} ligne(s)`,
  })

  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')

  if (format === 'pdf') {
    const pdf = auditLogsToPdf(entries)
    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `attachment; filename="oxynova-audit-${stamp}.pdf"`)
    return send(event, pdf)
  }

  const xml = auditLogsToExcelXml(entries)
  setHeader(event, 'Content-Type', 'application/vnd.ms-excel; charset=utf-8')
  setHeader(event, 'Content-Disposition', `attachment; filename="oxynova-audit-${stamp}.xls"`)
  return send(event, xml)
})
