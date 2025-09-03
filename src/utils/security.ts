import { Context } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { csrf } from 'hono/csrf'
import * as crypto from 'crypto'

// Security headers middleware
export const securityHeaders = () => {
  return async (c: Context, next: () => Promise<void>) => {
    await next()
    
    // Set security headers
    c.header('X-Frame-Options', 'DENY')
    c.header('X-Content-Type-Options', 'nosniff')
    c.header('X-XSS-Protection', '1; mode=block')
    c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
    c.header('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' https://cdn.jsdelivr.net;")
  }
}

// XSS Protection - Sanitize HTML input
export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Sanitize all inputs in an object
export function sanitizeInputs(data: any): any {
  if (typeof data === 'string') {
    return sanitizeHtml(data)
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = Array.isArray(data) ? [] : {}
    for (const key in data) {
      sanitized[key] = sanitizeInputs(data[key])
    }
    return sanitized
  }
  return data
}

// Secure cookie options
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
}

// Set secure cookie
export function setSecureCookie(c: Context, name: string, value: string) {
  setCookie(c, name, value, COOKIE_OPTIONS)
}

// Generate CSRF token
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Validate CSRF token
export function validateCSRFToken(c: Context): boolean {
  const token = c.req.header('X-CSRF-Token') || c.req.query('csrf_token')
  const sessionToken = getCookie(c, 'csrf_token')
  
  return token === sessionToken && !!token
}

// CSRF middleware for forms
export const csrfMiddleware = () => {
  return async (c: Context, next: () => Promise<void>) => {
    // Skip CSRF for GET requests
    if (c.req.method === 'GET' || c.req.method === 'HEAD' || c.req.method === 'OPTIONS') {
      await next()
      return
    }
    
    // Validate CSRF token for state-changing requests
    if (!validateCSRFToken(c)) {
      return c.json({ error: 'Invalid CSRF token' }, 403)
    }
    
    await next()
  }
}

// Password hashing (using Web Crypto API for Cloudflare Workers)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Rate limiting storage (in-memory for Workers, use KV in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Simple rate limiter
export function rateLimiter(maxRequests: number = 10, windowMs: number = 60000) {
  return async (c: Context, next: () => Promise<void>) => {
    const ip = c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For') || 'unknown'
    const now = Date.now()
    
    const record = rateLimitStore.get(ip)
    
    if (!record || record.resetAt < now) {
      rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs })
      await next()
      return
    }
    
    if (record.count >= maxRequests) {
      return c.json({ error: 'Too many requests' }, 429)
    }
    
    record.count++
    await next()
  }
}

// Authentication check middleware
export function requireAuth(redirectTo: string = '/ticloudadmin/login') {
  return async (c: Context, next: () => Promise<void>) => {
    const session = getCookie(c, 'admin_session')
    
    if (!session) {
      if (c.req.header('Accept')?.includes('application/json')) {
        return c.json({ error: 'Unauthorized' }, 401)
      }
      return c.redirect(redirectTo)
    }
    
    // Verify session (in production, check against database or KV)
    // For now, just check if session exists
    
    await next()
  }
}

// Input validation helpers
export const validators = {
  email: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  url: (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },
  alphanumeric: (str: string) => /^[a-zA-Z0-9]+$/.test(str),
  safeString: (str: string) => /^[a-zA-Z0-9\s\-_\.]+$/.test(str),
}