import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'
import { FooterConfig, FooterSection, PrivacyLink } from '../utils/common-content'

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
      subtitle: 'AI Agent for Enterprise-Customer Dialogue Scenarios',
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
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      copyright: '© 2024 Zenava. All rights reserved.',
      email: 'marketing@zenava.ai'
    },
    jp: {
      subtitle: '企業と顧客の対話シナリオのためのAIエージェント',
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
      privacyPolicy: 'プライバシーポリシー',
      termsConditions: '利用規約',
      copyright: '© 2024 Zenava. All rights reserved.',
      email: 'marketing@zenava.ai'
    },
    hk: {
      subtitle: '企業與客戶對話場景的 AI 智能體',
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
      privacyPolicy: '隱私政策',
      termsConditions: '條款與條件',
      copyright: '© 2024 Zenava. 版權所有。',
      email: 'marketing@zenava.ai'
    }
  }

  const t = footerText[language] || footerText.en
  const langPrefix = language === 'en' ? '' : `/${language}`

  return (
    <footer class="bg-gradient-to-b from-gray-900 to-black text-white">
      <div class="site-container px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info - Spans 2 columns */}
          <div class="lg:col-span-2">
            <div class="mb-6">
              <img 
                src={config?.logo_url || "https://page.gensparksite.com/v1/base64_upload/1476812a0b97e2ad48a012ceb5c7946e"}
                alt={config?.logo_alt || "ZENAVA"}
                class="h-12 w-auto object-contain mb-4"
                style="max-width: 180px; filter: brightness(0) invert(1);"
              />
              <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
                {config?.logo_subtitle || t.subtitle}
              </p>
              <p class="text-gray-500 text-xs leading-relaxed max-w-sm mt-2">
                {language === 'en' 
                  ? 'Empowering Enterprise Transformation from Human-Driven to AI-Driven'
                  : language === 'jp'
                  ? '「人力駆動」から「AIドライブ」への飛躍を実現'
                  : '助力企業完成從「人力驅動」到「AI驅動」的跨越'}
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
                  class="text-gray-400 hover:text-white transition-colors text-sm block"
                >
                  {t.marketing}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/scenarios/sales`}
                  class="text-gray-400 hover:text-white transition-colors text-sm block"
                >
                  {t.sales}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/scenarios/customer-service`}
                  class="text-gray-400 hover:text-white transition-colors text-sm block"
                >
                  {t.customerService}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/scenarios/internal-service`}
                  class="text-gray-400 hover:text-white transition-colors text-sm block"
                >
                  {t.internalService}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/scenarios/management`}
                  class="text-gray-400 hover:text-white transition-colors text-sm block"
                >
                  {t.management}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Company Section */}
          <div>
            <h4 class="text-white font-semibold mb-4">{t.company}</h4>
            <ul class="space-y-3">
              <li>
                <a 
                  href={`${langPrefix}/about`}
                  class="text-gray-400 hover:text-white transition-colors text-sm block"
                >
                  {t.aboutUs}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/#contact`}
                  class="text-gray-400 hover:text-white transition-colors text-sm block"
                >
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal Section */}
          <div>
            <h4 class="text-white font-semibold mb-4">{t.legal}</h4>
            <ul class="space-y-3">

              <li>
                <a 
                  href={`${langPrefix}/privacy`}
                  class="text-gray-400 hover:text-white transition-colors text-sm block"
                >
                  {t.privacyPolicy}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/terms`}
                  class="text-gray-400 hover:text-white transition-colors text-sm block"
                >
                  {t.termsConditions}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section with Border */}
        <div class="border-t border-gray-800 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p class="text-gray-500 text-sm">{config?.copyright_text || t.copyright}</p>
            
            {/* Additional Bottom Links */}
            <div class="flex flex-wrap gap-6">

              <a 
                href={`${langPrefix}/privacy`}
                class="text-gray-500 hover:text-white transition-colors text-sm"
              >
                {t.privacyPolicy}
              </a>
              <a 
                href={`${langPrefix}/terms`}
                class="text-gray-500 hover:text-white transition-colors text-sm"
              >
                {t.termsConditions}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}