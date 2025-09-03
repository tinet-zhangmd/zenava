/**
 * Security Utilities for Zenava Web Application
 * Provides XSS protection, CSRF tokens, secure cookies, and other security measures
 */

import { Context, Next } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import crypto from 'crypto'

/**
 * Security Headers Middleware
 * Adds essential security headers to all responses
 */
export const securityHeaders = () => {
  return async (c: Context, next: Next) => {
    await next()
    
    // Set security headers
    c.header('X-Frame-Options', 'DENY')
    c.header('X-Content-Type-Options', 'nosniff')
    c.header('X-XSS-Protection', '1; mode=block')
    c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
    c.header('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; " +
      "style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; " +
      "font-src 'self' https://cdn.jsdelivr.net data:; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self';"
    )
    
    // Remove sensitive headers
    c.header('X-Powered-By', '')
  }
}

/**
 * XSS Protection: HTML Entity Encoding
 * Escapes HTML entities to prevent XSS attacks
 */
export function escapeHtml(str: string): string {
  const htmlEscapes: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  
  return String(str).replace(/[&<>"'\/]/g, (match) => htmlEscapes[match])
}

/**
 * Sanitize user inputs
 * Removes or escapes potentially dangerous characters
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  // Remove null bytes
  let sanitized = input.replace(/\0/g, '')
  
  // Remove control characters except tabs and newlines
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  
  // Trim whitespace
  sanitized = sanitized.trim()
  
  // Limit length to prevent buffer overflow attacks
  if (sanitized.length > 10000) {
    sanitized = sanitized.substring(0, 10000)
  }
  
  return sanitized
}

/**
 * Sanitize all inputs in an object
 */
export function sanitizeInputs<T extends Record<string, any>>(inputs: T): T {
  const sanitized: any = {}
  
  for (const [key, value] of Object.entries(inputs)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value)
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeInputs(value)
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}

/**
 * CSRF Token Generation and Validation
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function validateCSRFToken(token: string | undefined, sessionToken: string | undefined): boolean {
  if (!token || !sessionToken) return false
  
  // Use constant-time comparison to prevent timing attacks
  if (token.length !== sessionToken.length) return false
  
  let valid = true
  for (let i = 0; i < token.length; i++) {
    if (token[i] !== sessionToken[i]) valid = false
  }
  
  return valid
}

/**
 * CSRF Protection Middleware
 */
export const csrfProtection = () => {
  return async (c: Context, next: Next) => {
    const method = c.req.method.toUpperCase()
    
    // Skip CSRF check for safe methods
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return next()
    }
    
    // Get CSRF token from request
    const formToken = (await c.req.formData()).get('csrf_token') as string
    const headerToken = c.req.header('X-CSRF-Token')
    const requestToken = formToken || headerToken
    
    // Get session CSRF token
    const sessionToken = getCookie(c, 'csrf_token')
    
    if (!validateCSRFToken(requestToken, sessionToken)) {
      return c.json({ error: 'Invalid CSRF token' }, 403)
    }
    
    return next()
  }
}

/**
 * Secure Cookie Options
 */
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
}

/**
 * Set secure cookie with proper options
 */
export function setSecureCookie(c: Context, name: string, value: string, options: any = {}) {
  setCookie(c, name, value, {
    ...COOKIE_OPTIONS,
    ...options,
  })
}

/**
 * Rate Limiting Store
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

/**
 * Rate Limiting Middleware
 * Prevents brute force attacks and excessive requests
 */
export const rateLimiter = (maxRequests: number = 100, windowMs: number = 60000) => {
  return async (c: Context, next: Next) => {
    const ip = c.req.header('CF-Connecting-IP') || 
                c.req.header('X-Forwarded-For') || 
                c.req.header('X-Real-IP') ||
                'unknown'
    
    const key = `${ip}:${c.req.path}`
    const now = Date.now()
    
    const record = rateLimitStore.get(key)
    
    if (!record) {
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
      return next()
    }
    
    if (now > record.resetTime) {
      record.count = 1
      record.resetTime = now + windowMs
      return next()
    }
    
    record.count++
    
    if (record.count > maxRequests) {
      return c.json({ error: 'Too many requests' }, 429)
    }
    
    return next()
  }
}

/**
 * Input Validation Rules
 */
export const ValidationRules = {
  email: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 255
  },
  
  password: (password: string) => {
    return password.length >= 8 && password.length <= 128
  },
  
  username: (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/
    return usernameRegex.test(username)
  },
  
  url: (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },
  
  phone: (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone)
  },
}

/**
 * File Upload Validation
 */
export const FileValidation = {
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  allowedDocumentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  maxFileSize: 5 * 1024 * 1024, // 5MB
  
  validateImage: (file: File) => {
    if (!FileValidation.allowedImageTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.')
    }
    
    if (file.size > FileValidation.maxFileSize) {
      throw new Error('File size exceeds 5MB limit.')
    }
    
    return true
  },
  
  validateDocument: (file: File) => {
    if (!FileValidation.allowedDocumentTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only PDF and Word documents are allowed.')
    }
    
    if (file.size > FileValidation.maxFileSize) {
      throw new Error('File size exceeds 5MB limit.')
    }
    
    return true
  },
}

/**
 * Password Hashing and Verification
 * Using Web Crypto API for Cloudflare Workers compatibility
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

/**
 * Session Management
 */
export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Authentication Check Middleware
 */
export const requireAuth = () => {
  return async (c: Context, next: Next) => {
    const sessionId = getCookie(c, 'session_id')
    
    if (!sessionId) {
      // Redirect to login page or return 401
      if (c.req.path.startsWith('/api/')) {
        return c.json({ error: 'Unauthorized' }, 401)
      }
      return c.redirect('/ticloudadmin/login')
    }
    
    // TODO: Validate session from database
    // For now, just check if session exists
    
    return next()
  }
}

/**
 * SQL Injection Prevention
 * Parameterized queries should always be used, but this provides additional validation
 */
export function sanitizeSQL(input: string): string {
  // Remove or escape potentially dangerous SQL characters
  return input
    .replace(/['";\\]/g, '') // Remove quotes and backslashes
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove multi-line comments
    .replace(/\*\//g, '')
    .replace(/xp_/gi, '') // Remove extended stored procedures
    .replace(/sp_/gi, '') // Remove stored procedures
    .trim()
}

/**
 * JSON Output Sanitization
 * Prevents JSON injection attacks
 */
export function sanitizeJSON(obj: any): any {
  if (typeof obj === 'string') {
    return escapeHtml(obj)
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeJSON)
  }
  
  if (obj !== null && typeof obj === 'object') {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(obj)) {
      sanitized[sanitizeInput(key)] = sanitizeJSON(value)
    }
    return sanitized
  }
  
  return obj
}

/**
 * Content Security Policy Nonce Generation
 * For inline scripts that need to be allowed
 */
export function generateNonce(): string {
  return crypto.randomBytes(16).toString('base64')
}

/**
 * Secure Redirect
 * Prevents open redirect vulnerabilities
 */
export function secureRedirect(url: string, allowedHosts: string[] = []): string {
  try {
    const parsed = new URL(url)
    
    // Allow relative URLs
    if (!parsed.host) {
      return url
    }
    
    // Check against allowed hosts
    if (allowedHosts.length > 0 && !allowedHosts.includes(parsed.host)) {
      return '/'
    }
    
    // Only allow HTTPS in production
    if (process.env.NODE_ENV === 'production' && parsed.protocol !== 'https:') {
      return '/'
    }
    
    return url
  } catch {
    // Invalid URL, redirect to home
    return '/'
  }
}

/**
 * API Key Validation
 * For protecting internal APIs
 */
export const validateAPIKey = (validKeys: string[]) => {
  return async (c: Context, next: Next) => {
    const apiKey = c.req.header('X-API-Key')
    
    if (!apiKey || !validKeys.includes(apiKey)) {
      return c.json({ error: 'Invalid API key' }, 401)
    }
    
    return next()
  }
}

/**
 * Log Security Events
 * For audit trail and monitoring
 */
export function logSecurityEvent(event: {
  type: 'auth_failure' | 'csrf_failure' | 'rate_limit' | 'validation_failure' | 'suspicious_activity'
  ip?: string
  path?: string
  details?: any
}) {
  const timestamp = new Date().toISOString()
  console.log(`[SECURITY] ${timestamp} - ${event.type}:`, {
    ...event,
    timestamp,
  })
  
  // TODO: Send to logging service or database
}

export default {
  securityHeaders,
  escapeHtml,
  sanitizeInput,
  sanitizeInputs,
  generateCSRFToken,
  validateCSRFToken,
  csrfProtection,
  COOKIE_OPTIONS,
  setSecureCookie,
  rateLimiter,
  ValidationRules,
  FileValidation,
  hashPassword,
  verifyPassword,
  generateSessionId,
  requireAuth,
  sanitizeSQL,
  sanitizeJSON,
  generateNonce,
  secureRedirect,
  validateAPIKey,
  logSecurityEvent,
}