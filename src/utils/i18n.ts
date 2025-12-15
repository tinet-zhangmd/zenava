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
export function detectLanguageFromIP(request: any): Language {
  // Get CF-IPCountry header (Cloudflare automatically provides this)
  const country = request.headers?.get('CF-IPCountry')?.toUpperCase()
  
  if (country === 'CN' || country === 'SG') {
    return 'zh'  // China, Singapore -> Simplified Chinese
  } else if (country === 'JP') {
    return 'jp'  // Japan -> Japanese
  } else if (country === 'HK' || country === 'TW' || country === 'MO') {
    return 'hk'  // Hong Kong, Taiwan, Macau -> Traditional Chinese
  } else if (country === 'US' || country === 'GB' || country === 'CA' || country === 'AU') {
    return 'en'  // English-speaking countries -> English
  } else {
    return 'zh'  // Default -> Simplified Chinese
  }
}