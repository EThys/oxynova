import { e as createError, u as useRuntimeConfig, I as setCookie, J as deleteCookie, K as getCookie } from './nitro.mjs';
import { timingSafeEqual, createHmac } from 'node:crypto';

const COOKIE_NAME = "oxynova_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
function getSecret(event) {
  const config = useRuntimeConfig(event);
  return config.adminSecret || "dev-secret-change-me";
}
function sign(payload, secret) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}
function createSessionToken(event) {
  const secret = getSecret(event);
  const expires = Date.now() + SESSION_MAX_AGE * 1e3;
  const payload = `admin:${expires}`;
  return `${payload}.${sign(payload, secret)}`;
}
function verifySessionToken(event, token) {
  if (!token) return false;
  const secret = getSecret(event);
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload, secret);
  try {
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length) return false;
    if (!timingSafeEqual(sigBuf, expBuf)) return false;
  } catch {
    return false;
  }
  const [, expiresStr] = payload.split(":");
  const expires = Number(expiresStr);
  return Number.isFinite(expires) && expires > Date.now();
}
function setAdminSession(event) {
  const token = createSessionToken(event);
  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/"
  });
}
function clearAdminSession(event) {
  deleteCookie(event, COOKIE_NAME, { path: "/" });
}
function isAdminAuthenticated(event) {
  const token = getCookie(event, COOKIE_NAME);
  return verifySessionToken(event, token);
}
function requireAdmin(event) {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: "Non autoris\xE9" });
  }
}
function checkAdminPassword(event, password) {
  const config = useRuntimeConfig(event);
  const expected = config.adminPassword || "Oxynova2026@";
  if (!password || password.length !== expected.length) {
    return false;
  }
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}

export { clearAdminSession as a, checkAdminPassword as c, isAdminAuthenticated as i, requireAdmin as r, setAdminSession as s };
//# sourceMappingURL=auth.mjs.map
