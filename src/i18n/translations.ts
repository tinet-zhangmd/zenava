// Comprehensive multi-language translations for Zenava
// Reference: Avaya, Genesys, Decagon, Sierra professional terminology

import enTranslations from './en.json'
import jpTranslations from './jp.json'
import hkTranslations from './hk.json'
import zhTranslations from './zh.json'

export const siteTranslations = {
  en: enTranslations,
  jp: jpTranslations,
  hk: hkTranslations,
  zh: zhTranslations
}

export type Language = 'zh' | 'en' | 'jp' | 'hk'

export function getTranslations(language: Language) {
  return siteTranslations[language] || siteTranslations.zh
}

// Helper to get nested translation
export function t(language: Language, key: string): string {
  const translations = getTranslations(language)
  return key.split('.').reduce((obj, k) => obj?.[k], translations as any) || key
}
 