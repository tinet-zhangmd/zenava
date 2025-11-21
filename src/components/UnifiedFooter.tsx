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
    zh: {
      subtitle: '面向客服和营销场景的AI生产力平台',
      description: '助力企业完成生产力与组织形态变革',
      // Column 1: Products
      products: '产品',
      aiAgents: 'AI Agents',
      messaging: 'Live Chat',
      voice: 'Voice Agents',
      // Column 2: Industries
      industries: '行业',
      retail: '零售',
      automotive: '汽车',
      software: '软件信息服务',
      hospitality: '酒店旅游',
      // Column 3: Resources
      resources: '资源中心',
      blog: '博客',
      reports: '报告',
      videos: '视频',
      // Column 4: Company
      company: '关于我们',
      aboutUs: '关于我们',
      // Bottom links
      cookiePreferences: 'Cookie 偏好设置',
      privacyPolicy: '隐私政策',
      copyright: '© 2025 Zenava. 保留所有权利。',
      email: 'marketing@zenava.ai'
    },
    en: {
      subtitle: 'AI Productivity Platform for Customer Service and Marketing Scenarios',
      description: 'Empowering enterprises to transform productivity and organizational structure',
      // Column 1: Products
      products: 'Products',
      aiAgents: 'AI Agents',
      messaging: 'Live Chat',
      voice: 'Voice Agents',
      // Column 2: Industries
      industries: 'Industries',
      retail: 'Retail',
      automotive: 'Automotive',
      software: 'Software & Information Services',
      hospitality: 'Hotel & Tourism',
      // Column 3: Resources
      resources: 'Resources',
      blog: 'Blog',
      reports: 'Reports',
      videos: 'Videos',
      // Column 4: Company
      company: 'Company',
      aboutUs: 'About Us',
      // Bottom links
      cookiePreferences: 'Cookie Preferences',
      privacyPolicy: 'Privacy Policy',
      copyright: '© 2025 Zenava. All rights reserved.',
      email: 'marketing@zenava.ai'
    },
    jp: {
      subtitle: 'マーケティングとサービスシナリオのための会話型AIエージェント',
      description: '企業の生産性と組織形態の変革を支援',
      // Column 1: Products
      products: '製品',
      aiAgents: 'AIチャットカスタマーサービス',
      messaging: 'Live Chat',
      voice: 'Voice Agents',
      // Column 2: Industries
      industries: '業界',
      retail: '小売',
      automotive: '自動車',
      software: 'ソフトウェア情報サービス',
      hospitality: 'ホテル・観光',
      // Column 3: Resources
      resources: 'リソース',
      blog: 'ブログ',
      reports: 'レポート',
      videos: 'ビデオ',
      // Column 4: Company
      company: '会社情報',
      aboutUs: '会社概要',
      // Bottom links
      cookiePreferences: 'Cookieの設定',
      privacyPolicy: 'プライバシーポリシー',
      copyright: '© 2025 Zenava. 全著作権所有。',
      email: 'marketing@zenava.ai'
    },
    hk: {
      subtitle: '面向營銷和服務場景的對話式AI智能體',
      description: '助力企業完成生產力與組織形態變革',
      // Column 1: Products
      products: '產品',
      aiAgents: 'AI Agents',
      messaging: 'Live Chat',
      voice: 'Voice Agents',
      // Column 2: Industries
      industries: '行業',
      retail: '零售',
      automotive: '汽車',
      software: '軟件信息服務',
      hospitality: '酒店旅遊',
      // Column 3: Resources
      resources: '資源中心',
      blog: '博客',
      reports: '報告',
      videos: '視頻',
      // Column 4: Company
      company: '關於我們',
      aboutUs: '關於我們',
      // Bottom links
      cookiePreferences: 'Cookie 偏好設定',
      privacyPolicy: '隱私政策',
      copyright: '© 2025 Zenava. 保留所有權利。',
      email: 'marketing@zenava.ai'
    }
  }

  const t = footerText[language] || footerText.en
  const langPrefix = language === 'en' ? '' : `/${language}`

  return (
    <footer class="bg-gradient-to-b from-gray-900 to-black text-white">
      <div class="site-container px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Section */}
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {/* Company Info - Full width on mobile, 1 col on md, 2 cols on lg */}
          <div class="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2">
            <div class="mb-6">
              {/* Logo with link */}
              <a href={langPrefix === '' ? '/' : langPrefix} class="inline-block mb-4 cursor-pointer">
                <img 
                  src={ZENAVA_LOGO_BASE64}
                  alt="ZENAVA"
                  class="h-10 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity"
                  style="max-width: 160px; filter: brightness(0) invert(1);"
                />
              </a>
              <p class="text-gray-400 text-sm leading-relaxed max-w-full md:max-w-sm mb-3">
                {t.subtitle}
              </p>
              <p class="text-gray-500 text-xs leading-relaxed max-w-full md:max-w-sm">
                {t.description}
              </p>
            </div>
            
            {/* Contact Info */}
            <div class="space-y-4">
              <a 
                href="mailto:marketing@zenava.ai" 
                class="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm"
              >
                <i class="fas fa-envelope mr-3"></i>
                {t.email}
              </a>
              
              {/* Social Media Icons */}
              <div class="flex items-center space-x-4">
                <a 
                  href="https://twitter.com/zenava" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-sky-400 hover:scale-110 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <i class="fab fa-x-twitter text-xl"></i>
                </a>
                <a 
                  href="https://www.facebook.com/zenava" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-blue-600 hover:scale-110 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <i class="fab fa-facebook text-xl"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/company/zenava" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-blue-500 hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <i class="fab fa-linkedin text-xl"></i>
                </a>
                <a 
                  href="https://www.youtube.com/zenava" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <i class="fab fa-youtube text-xl"></i>
                </a>
                <a 
                  href="https://www.instagram.com/zenava" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-pink-500 hover:scale-110 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <i class="fab fa-instagram text-xl"></i>
                </a>
                <a 
                  href="https://www.tiktok.com/@zenava" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                  aria-label="TikTok"
                >
                  <i class="fab fa-tiktok text-xl"></i>
                </a>
              </div>
            </div>


          </div>
          
          {/* Column 1: Products */}
          <div>
            <h4 class="text-white font-semibold mb-4 text-sm">{t.products}</h4>
            <ul class="space-y-3">
              <li>
                <a 
                  href={`${langPrefix}/products/ai-agents`}
                  class="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                >
                  {t.aiAgents}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/products/live-chat`}
                  class="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                >
                  {t.messaging}
                </a>
              </li>
              <li>
                <a 
                  href={`${langPrefix}/products/voice-agents`}
                  class="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                >
                  {t.voice}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 2: Industries */}
          <div>
            <h4 class="text-white font-semibold mb-4 text-sm">{t.industries}</h4>
            <ul class="space-y-3">
              <li>
                <a 
                  href="https://www.baidu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                >
                  {t.retail}
                </a>
              </li>
              <li>
                <a 
                  href="https://www.baidu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                >
                  {t.automotive}
                </a>
              </li>
              <li>
                <a 
                  href="https://www.baidu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                >
                  {t.software}
                </a>
              </li>
              <li>
                <a 
                  href="https://www.baidu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                >
                  {t.hospitality}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div>
            <h4 class="text-white font-semibold mb-4 text-sm">{t.resources}</h4>
            <ul class="space-y-3">
              <li>
                <a 
                  href="https://www.baidu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                >
                  {t.blog}
                </a>
              </li>
              <li>
                <a 
                  href="https://www.baidu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                >
                  {t.reports}
                </a>
              </li>
              <li>
                <a 
                  href="https://www.baidu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                >
                  {t.videos}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Company */}
          <div>
            <h4 class="text-white font-semibold mb-4 text-sm">{t.company}</h4>
            <ul class="space-y-3">
              <li>
                <a 
                  href={`${langPrefix}/about`}
                  class="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                >
                  {t.aboutUs}
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