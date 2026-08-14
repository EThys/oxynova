import { appendFile, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import type { H3Event } from 'h3'

export type AuditAction =
  | 'login_success'
  | 'login_failed'
  | 'logout'
  | 'mail_compose'
  | 'mail_reply'
  | 'mail_view'
  | 'mail_sync'
  | 'mail_delete'
  | 'mail_mark_read'
  | 'mail_mark_unread'
  | 'audit_download'

/** Empreinte envoyée par le navigateur à la connexion */
export type ClientDeviceInfo = {
  screen?: string
  viewport?: string
  pixelRatio?: number
  language?: string
  languages?: string
  timezone?: string
  platform?: string
  cores?: number
  memoryGb?: number
  touch?: boolean
  online?: boolean
  cookieEnabled?: boolean
}

export type AuditEntry = {
  id: string
  at: string
  action: AuditAction
  success: boolean
  ip: string
  ips?: string
  country?: string
  userAgent: string
  device: string
  browser: string
  browserVersion?: string
  os: string
  osVersion?: string
  language?: string
  timezone?: string
  screen?: string
  viewport?: string
  platform?: string
  cores?: number
  memoryGb?: number
  touch?: boolean
  deviceFingerprint?: string
  path?: string
  detail?: string
}

const DATA_DIR = join(process.cwd(), '.data')
const LOG_FILE = join(DATA_DIR, 'audit-log.jsonl')
const DEVICE_COOKIE = 'oxynova_device_profile'
const MAX_ENTRIES = 5000

const ACTION_LABELS: Record<AuditAction, string> = {
  login_success: 'Connexion réussie',
  login_failed: 'Connexion échouée',
  logout: 'Déconnexion',
  mail_compose: 'Envoi de mail',
  mail_reply: 'Réponse envoyée',
  mail_view: 'Lecture d’un mail',
  mail_sync: 'Sync IMAP',
  mail_delete: 'Suppression message',
  mail_mark_read: 'Marquer lu',
  mail_mark_unread: 'Marquer non lu',
  audit_download: 'Téléchargement des logs',
}

export function auditActionLabel(action: AuditAction) {
  return ACTION_LABELS[action] || action
}

export type AuditKind = 'all' | 'sends' | 'reads' | 'auth'

const KIND_ACTIONS: Record<Exclude<AuditKind, 'all'>, AuditAction[]> = {
  sends: ['mail_compose', 'mail_reply'],
  reads: ['mail_view'],
  auth: ['login_success', 'login_failed', 'logout'],
}

export function filterAuditLogsByKind(entries: AuditEntry[], kind: string): AuditEntry[] {
  if (!kind || kind === 'all') return entries
  const actions = KIND_ACTIONS[kind as Exclude<AuditKind, 'all'>]
  if (!actions) return entries
  return entries.filter(e => actions.includes(e.action))
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function getClientIp(event: H3Event): string {
  const xf = getHeader(event, 'x-forwarded-for')
  if (xf) {
    const first = xf.split(',')[0]?.trim()
    if (first) return first
  }
  const real = getHeader(event, 'x-real-ip')
  if (real?.trim()) return real.trim()
  const cf = getHeader(event, 'cf-connecting-ip')
  if (cf?.trim()) return cf.trim()
  const raw = event.node.req.socket?.remoteAddress || 'inconnu'
  if (raw === '::1' || raw === '127.0.0.1' || raw === '::ffff:127.0.0.1') {
    return `${raw} (localhost)`
  }
  return raw
}

function getAllIps(event: H3Event): string {
  const parts = [
    getHeader(event, 'cf-connecting-ip'),
    getHeader(event, 'x-real-ip'),
    getHeader(event, 'x-forwarded-for'),
    event.node.req.socket?.remoteAddress,
  ].filter(Boolean)
  return [...new Set(parts.map(p => String(p).trim()))].join(' | ')
}

function matchVersion(ua: string, re: RegExp) {
  const m = ua.match(re)
  return m?.[1] || ''
}

function parseUserAgent(ua: string) {
  const raw = ua || ''
  let browser = 'Navigateur inconnu'
  let browserVersion = ''
  let os = 'OS inconnu'
  let osVersion = ''
  let device = 'Ordinateur'

  if (/iphone|ipad|ipod/i.test(raw)) {
    device = /ipad/i.test(raw) ? 'Tablette iPad' : 'iPhone'
    os = 'iOS'
    osVersion = matchVersion(raw, /OS (\d+[._]\d+)/i).replace('_', '.')
  }
  else if (/android/i.test(raw)) {
    device = /mobile/i.test(raw) ? 'Téléphone Android' : 'Tablette Android'
    os = 'Android'
    osVersion = matchVersion(raw, /Android (\d+(?:\.\d+)?)/i)
  }
  else if (/windows nt/i.test(raw)) {
    os = 'Windows'
    device = 'PC Windows'
    const nt = matchVersion(raw, /Windows NT (\d+\.\d+)/i)
    const map: Record<string, string> = {
      '10.0': '10 / 11',
      '6.3': '8.1',
      '6.2': '8',
      '6.1': '7',
    }
    osVersion = map[nt] || nt
  }
  else if (/mac os x|macintosh/i.test(raw)) {
    os = 'macOS'
    device = 'Mac'
    osVersion = matchVersion(raw, /Mac OS X (\d+[._]\d+)/i).replace(/_/g, '.')
  }
  else if (/linux/i.test(raw)) {
    os = 'Linux'
    device = 'PC Linux'
  }

  if (/edg\//i.test(raw)) {
    browser = 'Edge'
    browserVersion = matchVersion(raw, /Edg\/([\d.]+)/i)
  }
  else if (/chrome\//i.test(raw) && !/edg\//i.test(raw)) {
    browser = 'Chrome'
    browserVersion = matchVersion(raw, /Chrome\/([\d.]+)/i)
  }
  else if (/safari\//i.test(raw) && !/chrome\//i.test(raw)) {
    browser = 'Safari'
    browserVersion = matchVersion(raw, /Version\/([\d.]+)/i)
  }
  else if (/firefox\//i.test(raw)) {
    browser = 'Firefox'
    browserVersion = matchVersion(raw, /Firefox\/([\d.]+)/i)
  }
  else if (/opr\//i.test(raw) || /opera/i.test(raw)) {
    browser = 'Opera'
    browserVersion = matchVersion(raw, /(?:OPR|Opera)\/([\d.]+)/i)
  }

  return { browser, browserVersion, os, osVersion, device }
}

function normalizeClientInfo(raw: unknown): ClientDeviceInfo | null {
  if (!raw || typeof raw !== 'object') return null
  const c = raw as Record<string, unknown>
  const out: ClientDeviceInfo = {}
  if (typeof c.screen === 'string') out.screen = c.screen.slice(0, 40)
  if (typeof c.viewport === 'string') out.viewport = c.viewport.slice(0, 40)
  if (typeof c.pixelRatio === 'number') out.pixelRatio = c.pixelRatio
  if (typeof c.language === 'string') out.language = c.language.slice(0, 32)
  if (typeof c.languages === 'string') out.languages = c.languages.slice(0, 80)
  if (typeof c.timezone === 'string') out.timezone = c.timezone.slice(0, 64)
  if (typeof c.platform === 'string') out.platform = c.platform.slice(0, 64)
  if (typeof c.cores === 'number') out.cores = c.cores
  if (typeof c.memoryGb === 'number') out.memoryGb = c.memoryGb
  if (typeof c.touch === 'boolean') out.touch = c.touch
  if (typeof c.online === 'boolean') out.online = c.online
  if (typeof c.cookieEnabled === 'boolean') out.cookieEnabled = c.cookieEnabled
  return out
}

function fingerprintFrom(info: ClientDeviceInfo, ua: string, ip: string) {
  const seed = [
    info.platform,
    info.screen,
    info.timezone,
    info.language,
    info.cores,
    info.memoryGb,
    info.touch ? 'touch' : 'no-touch',
    ua.slice(0, 120),
    ip,
  ].filter(Boolean).join('|')
  // hash simple non crypto (identifiant stable lisible)
  let h = 0
  for (let i = 0; i < seed.length; i++) h = ((h << 5) - h + seed.charCodeAt(i)) | 0
  return `dev-${Math.abs(h).toString(16)}`
}

export function setDeviceProfileCookie(event: H3Event, info: ClientDeviceInfo) {
  setCookie(event, DEVICE_COOKIE, JSON.stringify(info), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
}

export function clearDeviceProfileCookie(event: H3Event) {
  deleteCookie(event, DEVICE_COOKIE, { path: '/' })
}

function readDeviceProfileCookie(event: H3Event): ClientDeviceInfo | null {
  const raw = getCookie(event, DEVICE_COOKIE)
  if (!raw) return null
  try {
    return normalizeClientInfo(JSON.parse(raw))
  }
  catch {
    return null
  }
}

export async function appendAuditLog(
  event: H3Event,
  input: {
    action: AuditAction
    success?: boolean
    detail?: string
    clientInfo?: ClientDeviceInfo | null
  },
): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true })
    const ua = getHeader(event, 'user-agent') || ''
    const parsed = parseUserAgent(ua)
    const client = input.clientInfo || readDeviceProfileCookie(event)
    const ip = getClientIp(event)
    const country = getHeader(event, 'cf-ipcountry') || getHeader(event, 'x-vercel-ip-country') || ''
    const acceptLang = getHeader(event, 'accept-language') || ''

    const browserLabel = parsed.browserVersion
      ? `${parsed.browser} ${parsed.browserVersion.split('.')[0]}`
      : parsed.browser
    const osLabel = parsed.osVersion ? `${parsed.os} ${parsed.osVersion}` : parsed.os

    const entry: AuditEntry = {
      id: generateId(),
      at: new Date().toISOString(),
      action: input.action,
      success: input.success !== false,
      ip,
      ips: getAllIps(event),
      country: country || undefined,
      userAgent: ua.slice(0, 800),
      device: parsed.device,
      browser: browserLabel,
      browserVersion: parsed.browserVersion || undefined,
      os: osLabel,
      osVersion: parsed.osVersion || undefined,
      language: client?.language || acceptLang.split(',')[0] || undefined,
      timezone: client?.timezone,
      screen: client?.screen,
      viewport: client?.viewport,
      platform: client?.platform,
      cores: client?.cores,
      memoryGb: client?.memoryGb,
      touch: client?.touch,
      deviceFingerprint: client ? fingerprintFrom(client, ua, ip) : undefined,
      path: event.path,
      detail: input.detail?.slice(0, 800),
    }
    await appendFile(LOG_FILE, `${JSON.stringify(entry)}\n`, 'utf-8')
    void trimAuditLogIfNeeded()
  }
  catch (err) {
    console.error('[audit] Écriture impossible:', err)
  }
}

let trimInFlight: Promise<void> | null = null

async function trimAuditLogIfNeeded() {
  if (trimInFlight) return trimInFlight
  trimInFlight = (async () => {
    try {
      const entries = await readAuditLogs()
      if (entries.length <= MAX_ENTRIES) return
      const kept = entries.slice(0, MAX_ENTRIES)
      const body = kept.map(e => JSON.stringify(e)).join('\n') + (kept.length ? '\n' : '')
      await writeFile(LOG_FILE, body, 'utf-8')
    }
    catch {
      // ignore
    }
    finally {
      trimInFlight = null
    }
  })()
  return trimInFlight
}

export async function readAuditLogs(limit = MAX_ENTRIES): Promise<AuditEntry[]> {
  try {
    const raw = await readFile(LOG_FILE, 'utf-8')
    const lines = raw.split('\n').filter(Boolean)
    const entries: AuditEntry[] = []
    for (let i = lines.length - 1; i >= 0 && entries.length < limit; i--) {
      try {
        entries.push(JSON.parse(lines[i]) as AuditEntry)
      }
      catch {
        // skip
      }
    }
    return entries
  }
  catch {
    return []
  }
}

export function auditLogsToCsv(entries: AuditEntry[]): string {
  const header = [
    'date_iso',
    'date_fr',
    'action',
    'libelle',
    'succes',
    'ip',
    'ips',
    'pays',
    'empreinte',
    'appareil',
    'os',
    'navigateur',
    'version_navigateur',
    'plateforme',
    'ecran',
    'viewport',
    'fuseau',
    'langue',
    'coeurs',
    'ram_go',
    'tactile',
    'detail',
    'user_agent',
  ]
  const rows = entries.map((e) => {
    const dateFr = new Date(e.at).toLocaleString('fr-FR', { timeZone: 'Africa/Kinshasa' })
    return [
      e.at,
      dateFr,
      e.action,
      auditActionLabel(e.action),
      e.success ? 'oui' : 'non',
      e.ip,
      e.ips || '',
      e.country || '',
      e.deviceFingerprint || '',
      e.device,
      e.os,
      e.browser,
      e.browserVersion || '',
      e.platform || '',
      e.screen || '',
      e.viewport || '',
      e.timezone || '',
      e.language || '',
      e.cores != null ? String(e.cores) : '',
      e.memoryGb != null ? String(e.memoryGb) : '',
      e.touch == null ? '' : (e.touch ? 'oui' : 'non'),
      e.detail || '',
      e.userAgent || '',
    ].map(csvEscape).join(',')
  })
  return `\uFEFF${[header.join(','), ...rows].join('\n')}`
}

function csvEscape(value: string) {
  const s = String(value ?? '')
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export { normalizeClientInfo }

function xmlEscape(value: string) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function auditLogsToExcelXml(entries: AuditEntry[]): string {
  const headers = [
    'Date (Kinshasa)',
    'Action',
    'Succès',
    'IP',
    'Pays',
    'Empreinte',
    'Appareil',
    'OS',
    'Navigateur',
    'Écran',
    'Fuseau',
    'Langue',
    'Détail',
    'User-Agent',
  ]
  const rows = entries.map((e) => {
    const dateFr = new Date(e.at).toLocaleString('fr-FR', { timeZone: 'Africa/Kinshasa' })
    return [
      dateFr,
      auditActionLabel(e.action),
      e.success ? 'oui' : 'non',
      e.ip,
      e.country || '',
      e.deviceFingerprint || '',
      e.device,
      e.os,
      e.browser,
      e.screen || '',
      e.timezone || '',
      e.language || '',
      e.detail || '',
      e.userAgent || '',
    ]
  })

  const headerXml = headers.map(h => `<Cell ss:StyleID="header"><Data ss:Type="String">${xmlEscape(h)}</Data></Cell>`).join('')
  const bodyXml = rows.map((row) => {
    const cells = row.map(v => `<Cell><Data ss:Type="String">${xmlEscape(v)}</Data></Cell>`).join('')
    return `<Row>${cells}</Row>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Styles>
    <Style ss:ID="header">
      <Font ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#174794" ss:Pattern="Solid"/>
    </Style>
  </Styles>
  <Worksheet ss:Name="Journal OXYNOVA">
    <Table>
      <Row>${headerXml}</Row>
      ${bodyXml}
    </Table>
  </Worksheet>
</Workbook>`
}

function pdfEscape(text: string) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7EÀ-ÿ€’']/g, '?')
}

function wrapPdf(text: string, max = 92) {
  const words = String(text || '—').split(/\s+/)
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w
    if (next.length > max) {
      if (cur) lines.push(cur)
      cur = w
    }
    else {
      cur = next
    }
  }
  if (cur) lines.push(cur)
  return lines.length ? lines : ['—']
}

/** PDF simple (Helvetica) — sans dépendance. */
export function auditLogsToPdf(entries: AuditEntry[]): Buffer {
  const pageW = 595
  const pageH = 842
  const margin = 36
  const contentStreams: string[] = []
  let y = 0
  let stream = ''

  function startPage() {
    y = pageH - margin
    stream = 'BT /F1 11 Tf 0.09 0.28 0.58 rg\n'
    stream += `1 0 0 1 ${margin} ${y} Tm (Journal d'activite OXYNOVA RDC) Tj\n`
    y -= 16
    stream += '/F1 8 Tf 0.4 0.45 0.5 rg\n'
    stream += `1 0 0 1 ${margin} ${y} Tm (Genere le ${pdfEscape(new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Kinshasa' }))} — ${entries.length} evenement(s)) Tj\n`
    y -= 22
  }

  function endPage() {
    stream += 'ET\n'
    contentStreams.push(stream)
  }

  startPage()

  for (const e of entries) {
    const dateFr = new Date(e.at).toLocaleString('fr-FR', { timeZone: 'Africa/Kinshasa' })
    const title = `${auditActionLabel(e.action)}  |  ${e.success ? 'OK' : 'ECHEC'}`
    const meta = `${dateFr}  ·  ${e.ip}  ·  ${e.device}  ·  ${e.os}  ·  ${e.browser}`
    const who = [e.deviceFingerprint, e.country, e.timezone, e.screen].filter(Boolean).join('  ·  ')
    const blockLines = [
      title,
      meta,
      who || '—',
      e.detail || '',
    ].flatMap((t, i) => wrapPdf(t, i === 0 ? 88 : 96))

    const needed = 14 + blockLines.length * 11
    if (y - needed < margin) {
      endPage()
      startPage()
    }

    stream += '0.09 0.28 0.58 rg /F1 9 Tf\n'
    stream += `1 0 0 1 ${margin} ${y} Tm (${pdfEscape(blockLines[0])}) Tj\n`
    y -= 12
    stream += '0.2 0.25 0.3 rg /F1 8 Tf\n'
    for (const line of blockLines.slice(1)) {
      if (!line) continue
      stream += `1 0 0 1 ${margin} ${y} Tm (${pdfEscape(line)}) Tj\n`
      y -= 11
    }
    y -= 10
  }

  endPage()

  const objects: string[] = []
  objects.push('<< /Type /Catalog /Pages 2 0 R >>')
  const kids = contentStreams.map((_, i) => `${3 + i * 2} 0 R`).join(' ')
  objects.push(`<< /Type /Pages /Count ${contentStreams.length} /Kids [${kids}] >>`)

  contentStreams.forEach((s, i) => {
    const pageNum = 3 + i * 2
    const contentNum = pageNum + 1
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents ${contentNum} 0 R /Resources << /Font << /F1 ${3 + contentStreams.length * 2} 0 R >> >> >>`)
    objects.push(`<< /Length ${Buffer.byteLength(s, 'utf8')} >>\nstream\n${s}endstream`)
  })
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')

  let pdf = '%PDF-1.4\n'
  const offsets = [0]
  objects.forEach((obj, i) => {
    offsets.push(Buffer.byteLength(pdf, 'utf8'))
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`
  })
  const xrefPos = Buffer.byteLength(pdf, 'utf8')
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`
  return Buffer.from(pdf, 'utf8')
}
