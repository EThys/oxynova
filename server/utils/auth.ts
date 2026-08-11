import { createHmac, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

const COOKIE_NAME = 'oxynova_admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getSecret(event: H3Event): string {
  const config = useRuntimeConfig(event)
  return config.adminSecret || 'dev-secret-change-me'
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex')
}

export function createSessionToken(event: H3Event): string {
  const secret = getSecret(event)
  const expires = Date.now() + SESSION_MAX_AGE * 1000
  const payload = `admin:${expires}`
  return `${payload}.${sign(payload, secret)}`
}

export function verifySessionToken(event: H3Event, token: string | undefined): boolean {
  if (!token) return false
  const secret = getSecret(event)
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false

  const expected = sign(payload, secret)
  try {
    const sigBuf = Buffer.from(signature)
    const expBuf = Buffer.from(expected)
    if (sigBuf.length !== expBuf.length) return false
    if (!timingSafeEqual(sigBuf, expBuf)) return false
  }
  catch {
    return false
  }

  const [, expiresStr] = payload.split(':')
  const expires = Number(expiresStr)
  return Number.isFinite(expires) && expires > Date.now()
}

export function setAdminSession(event: H3Event): void {
  const token = createSessionToken(event)
  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
}

export function clearAdminSession(event: H3Event): void {
  deleteCookie(event, COOKIE_NAME, { path: '/' })
}

export function isAdminAuthenticated(event: H3Event): boolean {
  const token = getCookie(event, COOKIE_NAME)
  return verifySessionToken(event, token)
}

export function requireAdmin(event: H3Event): void {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Non autorisé' })
  }
}

export function checkAdminPassword(event: H3Event, password: string): boolean {
  const config = useRuntimeConfig(event)
  const expected = config.adminPassword || 'Oxynova2026@'
  if (!password || password.length !== expected.length) {
    return false
  }
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected))
  }
  catch {
    return false
  }
}
