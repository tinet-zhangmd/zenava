import zhTranslations from '../i18n/zh.json'
import enTranslations from '../i18n/en.json'
import jpTranslations from '../i18n/jp.json'
import hkTranslations from '../i18n/hk.json'

export type Language = 'zh' | 'en' | 'jp' | 'hk'

export const translations = {
  zh: zhTranslations,
  en: enTranslations,
  jp: jpTranslations,
  hk: hkTranslations,
}

export const languageNames = {
  zh: '简体中文',
  en: 'English',
  jp: '日本語',
  hk: '繁體中文',
}

export const languageFlags = {
  zh: '🇨🇳',
  en: '🇺🇸',
  jp: '🇯🇵', 
  hk: '🇭🇰',
}

export function getTranslation(language: Language) {
  return translations[language] || translations.zh
}

export function detectLanguageFromPath(pathname: string): Language {
  if (pathname.startsWith('/zh')) return 'zh'
  if (pathname.startsWith('/en')) return 'en'
  if (pathname.startsWith('/jp')) return 'jp'
  if (pathname.startsWith('/hk')) return 'hk'
  return 'zh'  // 默认简体中文
}

export function getLocalizedPath(path: string, language: Language): string {
  // Remove existing language prefix
  let cleanPath = path.replace(/^\/(zh|en|jp|hk)/, '') || '/'
  
  // Remove trailing slash for non-root paths
  if (cleanPath !== '/' && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1)
  }
  
  if (language === 'zh') {
    // 简体中文作为默认语言，不需要前缀
    return cleanPath === '/' ? '/' : cleanPath
  }
  
  // For other languages, add prefix but avoid double slash
  if (cleanPath === '/') {
    return `/${language}`
  }
  
  return `/${language}${cleanPath}`
}

// Helper function to get nested translation value
export function t(translations: any, key: string): string {
  return key.split('.').reduce((obj, k) => obj?.[k], translations) || key
}

// Helper function to detect language from IP geolocation
export async function detectLanguageFromIP(request: any): Promise<Language> {
  // Try multiple sources for country detection
  let country: string | null = null
  
  // Helper function to get header value from various sources
  const getHeader = (name: string): string | null => {
    const lowerName = name.toLowerCase()
    
    // Try Hono request headers first
    if (request.header && typeof request.header === 'function') {
      const value = request.header(name)
      if (value) return value
    }
    
    // Try request.headers (Hono Headers object)
    if (request.headers && typeof request.headers.get === 'function') {
      const value = request.headers.get(name) || request.headers.get(lowerName)
      if (value) return value
    }
    
    // Try request.raw.headers (Node.js native)
    if (request.raw && request.raw.headers) {
      const rawHeaders = request.raw.headers
      // Try exact match first
      if (rawHeaders[name]) {
        const value = rawHeaders[name]
        return Array.isArray(value) ? value[0] : String(value)
      }
      // Try case-insensitive match
      const key = Object.keys(rawHeaders).find(k => k.toLowerCase() === lowerName)
      if (key) {
        const value = rawHeaders[key]
        return Array.isArray(value) ? value[0] : String(value)
      }
    }
    
    return null
  }
  
  // 1. Try Cloudflare/Vercel headers
  country = getHeader('CF-IPCountry') || 
            getHeader('x-vercel-ip-country') ||  
            getHeader('x-country-code') ||
            null
  
  // 2. Fallback: Try to get from request object directly
  if (!country && (request as any).country) {
    country = (request as any).country
  }
  
  // 3. If still no country, try to get IP and use third-party API
  if (!country) {
    // Get client IP address from various sources
    let clientIP: string | null = null
    
    // First, try custom _clientIP property (passed from route)
    if ((request as any)._clientIP) {
      clientIP = (request as any)._clientIP
    }
    
    // Then try various IP headers (in order of priority)
    if (!clientIP) {
      clientIP = getHeader('CF-Connecting-IP') ||  // Cloudflare
                 getHeader('x-forwarded-for')?.split(',')[0]?.trim() ||
                 getHeader('x-real-ip') ||
                 getHeader('x-client-ip') ||
                 null
    }
    
    // Also try to get IP from request.raw.socket (Node.js)
    if (!clientIP && request.raw && request.raw.socket) {
      const socket = request.raw.socket
      clientIP = socket.remoteAddress || null
      // Handle IPv6-mapped IPv4 addresses
      if (clientIP && clientIP.startsWith('::ffff:')) {
        clientIP = clientIP.substring(7)
      }
    }
    
    console.log('🔍 IP Extraction Debug:', {
      clientIP,
      cfConnectingIP: getHeader('CF-Connecting-IP'),
      xForwardedFor: getHeader('x-forwarded-for'),
      xRealIP: getHeader('x-real-ip'),
      socketIP: request.raw?.socket?.remoteAddress,
      hasRawHeaders: !!request.raw?.headers,
      rawHeadersKeys: request.raw?.headers ? Object.keys(request.raw.headers) : []
    })
    
    // If we have an IP, try to detect country (but don't block if it fails)
    if (clientIP && clientIP !== '::1' && clientIP !== '127.0.0.1' && !clientIP.startsWith('192.168.') && !clientIP.startsWith('10.')) {
      try {
        console.log('🌐 Calling IP API for:', clientIP)
        // Use a free IP geolocation API (ipapi.co)
        // Add timeout to prevent hanging
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 2000) // 2 second timeout
        
        const response = await fetch(`https://ipapi.co/${clientIP}/country_code/`, {
          headers: {
            'User-Agent': 'Zenava-Language-Detector'
          },
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        
        if (response.ok) {
          const countryCode = (await response.text()).trim()
          console.log('📡 IP API Response:', countryCode)
          if (countryCode && countryCode.length === 2 && countryCode !== 'XX') {
            country = countryCode
            console.log('✅ Detected country from IP API:', country)
          } else {
            console.log('⚠️ Invalid country code from API:', countryCode)
          }
        } else {
          console.log('⚠️ IP API returned error:', response.status, response.statusText)
        }
      } catch (error: any) {
        // Log error but don't block the request
        if (error.name === 'AbortError') {
          console.log('⏱️ IP API timeout (non-blocking)')
        } else {
          console.log('⚠️ IP API detection failed (non-blocking):', error.message)
        }
      }
    } else {
      console.log('⚠️ No valid client IP found or local IP detected:', clientIP)
    }
  }
  
  // Debug log
  if (typeof console !== 'undefined') {
    console.log('🌍 IP Detection:', {
      country,
      cfCountry: getHeader('CF-IPCountry'),
      vercelCountry: getHeader('x-vercel-ip-country')
    })
  }
  
  if (!country) {
    return 'zh'  // Default if no country info available
  }
  
  country = country.toUpperCase()
  
  if (country === 'CN' || country === 'SG') {
    return 'zh'  // China, Singapore -> Simplified Chinese
  } else if (country === 'JP') {
    return 'jp'  // Japan -> Japanese
  } else if (country === 'HK' || country === 'TW' || country === 'MO') {
    return 'hk'  // Hong Kong, Taiwan, Macau -> Traditional Chinese
  } else if (country === 'US' || country === 'GB' || country === 'CA' || country === 'AU' || country === 'NZ' || country === 'IE') {
    return 'en'  // English-speaking countries -> English
  } else {
    return 'zh'  // Default -> Simplified Chinese
  }
}

// Helper function to detect language from browser Accept-Language header
export function detectLanguageFromBrowser(acceptLanguage: string | null): Language {
  if (!acceptLanguage) {
    return 'zh'  // Default if no Accept-Language header
  }
  
  // Parse Accept-Language header
  // Example: "zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7"
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = '1'] = lang.trim().split(';')
      const quality = parseFloat(q.replace('q=', '')) || 1
      return { code: code.toLowerCase(), quality }
    })
    .sort((a, b) => b.quality - a.quality)  // Sort by quality
  
  // Check each language in priority order
  for (const { code } of languages) {
    // Simplified Chinese
    if (code.startsWith('zh-cn') || (code.startsWith('zh') && !code.includes('tw') && !code.includes('hk'))) {
      return 'zh'
    }
    // Traditional Chinese
    if (code.startsWith('zh-tw') || code.startsWith('zh-hk') || code.startsWith('zh-mo')) {
      return 'hk'
    }
    // Japanese
    if (code.startsWith('ja') || code.startsWith('jp')) {
      return 'jp'
    }
    // English
    if (code.startsWith('en')) {
      return 'en'
    }
  }
  
  return 'zh'  // Default
}

// Smart language detection with priority order
// Priority: 1. URL Path, 2. Cookie, 3. IP Geolocation, 4. Browser Language, 5. Default
// Note: Changed priority - IP before Browser to respect VPN users
export async function detectLanguageSmart(
  pathname: string,
  cookie: string | null,
  acceptLanguage: string | null,
  request: any
): Promise<Language> {
  // Priority 1: URL Path (user explicitly selected)
  // Only use path language if path explicitly starts with language prefix
  if (pathname.startsWith('/en') || pathname.startsWith('/jp') || pathname.startsWith('/hk')) {
    return detectLanguageFromPath(pathname)
  }
  // If path is /zh or /, continue to other detection methods
  if (pathname.startsWith('/zh')) {
    return 'zh'  // Explicit zh path
  }
  
  // Priority 2: Cookie (user's previous choice, 30 days)
  // BUT: If user is accessing root path, ignore cookie to allow re-detection
  // This allows VPN users to get re-detected when accessing root
  if (cookie && pathname !== '/') {
    const cookieLanguage = cookie.trim().toLowerCase()
    if (cookieLanguage === 'zh' || cookieLanguage === 'en' || 
        cookieLanguage === 'jp' || cookieLanguage === 'hk') {
      return cookieLanguage as Language
    }
  }
  
  // Priority 3: IP Geolocation (moved before browser language for VPN users)
  const ipLanguage = await detectLanguageFromIP(request)
  if (ipLanguage !== 'zh') {
    // Debug log
    if (typeof console !== 'undefined') {
      console.log('🌍 Detected language from IP:', ipLanguage)
    }
    return ipLanguage
  }
  
  // Priority 4: Browser Language
  const browserLanguage = detectLanguageFromBrowser(acceptLanguage)
  if (browserLanguage !== 'zh') {
    return browserLanguage
  }
  
  // Priority 5: Default
  return 'zh'
}