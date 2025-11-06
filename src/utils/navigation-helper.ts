import { Language } from './i18n.js'
import type { NavigationConfig, NavMenuItem } from '../components/UnifiedNavigation.js'

// 前端页面使用静态数据，不再从数据库读取
export function getNavigationData(
  language: Language = 'en'
): { config: NavigationConfig; menuItems: NavMenuItem[] } {
  // 直接返回静态默认配置
  return {
    config: getDefaultNavigationConfig(),
    menuItems: getDefaultMenuItems()
  }
}

function getDefaultNavigationConfig(): NavigationConfig {
  return {
    logo_url: 'https://page.gensparksite.com/v1/base64_upload/1476812a0b97e2ad48a012ceb5c7946e',
    logo_alt: 'ZENAVA',
    logo_height: '2.5rem',
    logo_max_width: '200px',
    nav_bg_color: 'rgba(255, 255, 255, 0.95)',
    nav_text_color: '#374151',
    nav_hover_color: '#3b82f6',
    nav_border_color: '#f3f4f6',
    nav_blur: true,
    nav_fixed: true,
    mobile_menu_enabled: true,
    show_language_switcher: true,
    available_languages: ['en', 'jp', 'hk'] as Language[],
    cta_enabled: false,
    cta_text: 'Get Started',
    cta_url: '/contact'
  }
}

function getDefaultMenuItems(): NavMenuItem[] {
  return [
    {
      id: 'scenarios',
      type: 'dropdown',
      label: 'Scenarios',
      label_en: 'Scenarios',
      label_jp: 'シナリオ',
      label_hk: '場景',
      order: 1,
      visible: true,
      children: [
        {
          id: 'marketing',
          label: 'Zenava for Marketing',
          label_en: 'Zenava for Marketing',
          label_jp: 'マーケティング向けZenava',
          label_hk: '營銷場景',
          description: 'AI-driven lead generation and conversion optimization',
          description_en: 'AI-driven lead generation and conversion optimization',
          url: '/scenarios/marketing',
          icon: 'fas fa-bullhorn',
          order: 1,
          visible: true
        },
        {
          id: 'sales',
          label: 'Zenava for Sales',
          label_en: 'Zenava for Sales',
          label_jp: '営業向けZenava',
          label_hk: '銷售場景',
          description: 'AI-powered sales guidance and recommendations',
          description_en: 'AI-powered sales guidance and recommendations',
          url: '/scenarios/sales',
          icon: 'fas fa-chart-line',
          order: 2,
          visible: true
        },
        {
          id: 'customer-service',
          label: 'Zenava for Customer Service',
          label_en: 'Zenava for Customer Service',
          label_jp: 'カスタマーサービス向けZenava',
          label_hk: '客服場景',
          description: 'Intelligent support with 24/7 availability',
          description_en: 'Intelligent support with 24/7 availability',
          url: '/scenarios/customer-service',
          icon: 'fas fa-headset',
          order: 3,
          visible: true
        },
        {
          id: 'internal-service',
          label: 'Zenava for Internal Service',
          label_en: 'Zenava for Internal Service',
          label_jp: '社内サービス向けZenava',
          label_hk: '內部服務',
          description: 'AI-powered employee support and automation',
          description_en: 'AI-powered employee support and automation',
          url: '/scenarios/internal-service',
          icon: 'fas fa-users-cog',
          order: 4,
          visible: true
        },
        {
          id: 'management',
          label: 'Zenava for Management',
          label_en: 'Zenava for Management',
          label_jp: '管理最適化向けZenava',
          label_hk: '管理優化',
          description: 'Drive competitive advantage through customer insights',
          description_en: 'Drive competitive advantage through customer insights',
          url: '/scenarios/management',
          icon: 'fas fa-tasks',
          order: 5,
          visible: true
        }
      ]
    },
    {
      id: 'about',
      type: 'link',
      label: 'About Us',
      label_en: 'About Us',
      label_jp: '私たちについて',
      label_hk: '關於我們',
      url: '/about',
      order: 2,
      visible: true
    }
  ]
}