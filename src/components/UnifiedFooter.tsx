import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n.js'
import { FooterConfig, FooterSection, PrivacyLink } from '../utils/common-content.js'
import { ZENAVA_LOGO_BASE64 } from '../assets/zenava-logo-base64.js'

interface UnifiedFooterProps {
  language?: Language
  config?: FooterConfig
  sections?: FooterSection[]
  privacyLinks?: PrivacyLink[]
}

export const UnifiedFooter: FC<UnifiedFooterProps> = ({ 
  language = 'en',
  config,
  sections,
  privacyLinks 
}) => {
  // Footer translations
  const footerText = {
    en: {
      subtitle: 'Conversational AI Agent for Marketing and Service Scenarios',
      scenarios: 'Scenarios',
      marketing: 'Marketing',
      sales: 'Sales',
      customerService: 'Customer Service',
      internalService: 'Internal Service',
      management: 'Management Optimization',
      company: 'Company',
      aboutUs: 'About Us',
      contact: 'Contact',
      legal: 'Legal',
      cookiePreferences: 'Cookie Preferences',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      copyright: '© 2025 Zenava. All rights reserved.',
      email: 'marketing@zenava.ai'
    },
    jp: {
      subtitle: 'マーケティングとサービスシナリオ向けの対話型AIエージェント',
      scenarios: 'シナリオ',
      marketing: 'マーケティング',
      sales: 'セールス',
      customerService: 'カスタマーサービス',
      internalService: '社内サービス',
      management: '管理最適化',
      company: '会社情報',
      aboutUs: '会社概要',
      contact: 'お問い合わせ',
      legal: '法的情報',
      cookiePreferences: 'Cookieの設定',
      privacyPolicy: 'プライバシーポリシー',
      termsConditions: '利用規約',
      copyright: '© 2025 Zenava. All rights reserved.',
      email: 'marketing@zenava.ai'
    },
    hk: {
      subtitle: '面向營銷和服務場景的對話式AI智能體',
      scenarios: '應用場景',
      marketing: '市場營銷',
      sales: '銷售',
      customerService: '客戶服務',
      internalService: '內部服務',
      management: '管理優化',
      company: '公司',
      aboutUs: '關於我們',
      contact: '聯繫我們',
      legal: '法律條款',
      cookiePreferences: 'Cookie 偏好設定',
      privacyPolicy: '隱私政策',
      termsConditions: '條款與條件',
      copyright: '© 2025 Zenava. All rights reserved.',
      email: 'marketing@zenava.ai'
    }
  }

  const t = footerText[language] || footerText.en
  const langPrefix = language === 'en' ? '' : `/${language}`

  return (
    <footer class="bg-gradient-to-b from-gray-900 to-black text-white">
      <div class="site-container px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Section */}
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {/* Company Info - Full width on mobile */}
          <div class="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2">
            <div class="mb-6">
              <img 
                src={ZENAVA_LOGO_BASE64}
                alt="ZENAVA"
                class="h-10 md:h-12 w-auto object-contain mb-4"
                style="max-width: 160px; filter: brightness(0) invert(1);"
              />
              <p class="text-gray-400 text-sm leading-relaxed max-w-full md:max-w-sm">
                {t.subtitle}
              </p>
              <p class="text-gray-500 text-xs leading-relaxed max-w-full md:max-w-sm mt-2">
                {language === 'en' 
                  ? 'Empowering enterprise productivity and organizational transformation, achieving the leap from "Human-Driven" to "AI-Driven"'
                  : language === 'jp'
                  ? '企業の生産性と組織形態の変革を支援し、「人力駆動」から「AI駆動」への飛躍を実現'
                  : '助力企業完成生產力與組織形態變革，實現從「人力驅動」到「AI驅動」的跨越'}
              </p>
            </div>
            
            {/* Contact Info */}
            <div class="space-y-3">
              <a 
                href="mailto:marketing@zenava.ai" 
                class="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm"
              >
                <i class="fas fa-envelope mr-3"></i>
                {t.email}
              </a>
            </div>


          </div>
          
          {/* Scenarios Section */}
          <div>
            <h4 class="text-white font-semibold mb-4">{t.scenarios}</h4>
            <ul class="space-y-3">
              <li>
                <a 
                  href={`${langPrefix}/scenarios/marketing`}
                  class="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm block"
                >
                  {t.marketing}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/scenarios/sales`}
                  class="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm block"
                >
                  {t.sales}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/scenarios/customer-service`}
                  class="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm block"
                >
                  {t.customerService}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/scenarios/internal-service`}
                  class="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm block"
                >
                  {t.internalService}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/scenarios/management`}
                  class="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm block"
                >
                  {t.management}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Company Section */}
          <div class="col-span-1">
            <h4 class="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">{t.company}</h4>
            <ul class="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href={`${langPrefix}/about`}
                  class="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm block"
                >
                  {t.aboutUs}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/#contact`}
                  class="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm block"
                >
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal Section - Spans 2 cols on mobile for balance */}
          <div class="col-span-2 sm:col-span-1">
            <h4 class="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">{t.legal}</h4>
            <ul class="space-y-2 sm:space-y-3">
              <li>
                <button 
                  onclick="showCookiePreferences()"
                  class="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm text-left cursor-pointer"
                >
                  {t.cookiePreferences}
                </button>
              </li>
              <li>
                <a 
                  href="https://helps.live/PrivacyPolicyCn.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm block"
                >
                  {t.privacyPolicy}
                </a>
              </li>

            </ul>
          </div>
        </div>
        
        {/* Bottom Section with Border */}
        <div class="border-t border-gray-800 pt-6 md:pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p class="text-gray-500 text-xs md:text-sm text-center md:text-left">{t.copyright}</p>
            
            {/* Additional Bottom Links */}
            <div class="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              <button 
                onclick="showCookiePreferences()"
                class="text-gray-500 hover:text-white transition-colors text-xs md:text-sm cursor-pointer"
              >
                <i class="fas fa-cookie-bite mr-2"></i>
                {t.cookiePreferences}
              </button>
              <a 
                href="https://helps.live/PrivacyPolicyCn.html"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-500 hover:text-white transition-colors text-xs md:text-sm"
              >
                {t.privacyPolicy}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}