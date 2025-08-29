import enTranslations from '../i18n/en.json'
import jpTranslations from '../i18n/jp.json'
import hkTranslations from '../i18n/hk.json'

export type Language = 'en' | 'jp' | 'hk'

export const translations = {
  en: enTranslations,
  jp: jpTranslations,
  hk: hkTranslations,
}

export const languageNames = {
  en: 'English',
  jp: '日本語',
  hk: '繁體中文',
}

export const languageFlags = {
  en: '🇺🇸',
  jp: '🇯🇵', 
  hk: '🇭🇰',
}

export function getTranslation(language: Language) {
  return translations[language] || translations.en
}

export function detectLanguageFromPath(pathname: string): Language {
  if (pathname.startsWith('/jp')) return 'jp'
  if (pathname.startsWith('/hk')) return 'hk'
  return 'en'
}

export function getLocalizedPath(path: string, language: Language): string {
  // Remove existing language prefix
  const cleanPath = path.replace(/^\/(jp|hk)/, '') || '/'
  
  if (language === 'en') {
    return cleanPath
  }
  
  return `/${language}${cleanPath}`
}

// Helper function to get nested translation value
export function t(translations: any, key: string): string {
  return key.split('.').reduce((obj, k) => obj?.[k], translations) || key
}

// Helper function to detect language from IP geolocation
export function detectLanguageFromIP(request: Request): Language {
  // Get CF-IPCountry header (Cloudflare automatically provides this)
  const country = request.headers.get('CF-IPCountry')?.toUpperCase()
  
  if (country === 'JP') {
    return 'jp'  // Japan -> Japanese
  } else if (country === 'HK' || country === 'TW' || country === 'MO') {
    return 'hk'  // Hong Kong, Taiwan, Macau -> Traditional Chinese
  } else {
    return 'en'  // All others -> English
  }
}