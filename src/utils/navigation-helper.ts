import { Language } from './i18n.js'
import type { NavigationConfig, NavMenuItem } from '../components/UnifiedNavigation.js'

// 前端页面使用静态数据，不再从数据库读取
export function getNavigationData(
  language: Language = 'zh'
): { config: NavigationConfig; menuItems: NavMenuItem[] } {
  // 直接返回静态默认配置
  return {
    config: getDefaultNavigationConfig(),
    menuItems: getDefaultMenuItems()
  }
}

function getDefaultNavigationConfig(): NavigationConfig {
  return {
    logo_url: '/assets/images/logo.webp',
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
    available_languages: ['zh', 'en', 'jp', 'hk'] as Language[],
    cta_enabled: false,
    cta_text: 'Contact Us',
    cta_url: '/contact',
    
    // Header Buttons (右侧按钮组)
    header_buttons_enabled: true,
    
    // Button 1 - Contact Us (紫色按钮)
    btn1_enabled: true,
    btn1_text: 'Contact Us',
    btn1_text_zh: '联系我们',
    btn1_text_en: 'Contact Us',
    btn1_text_jp: 'お問い合わせ',
    btn1_text_hk: '聯繫我們',
    btn1_url: '/contact',
    btn1_bg_color: '#7c3aed',
    btn1_text_color: '#ffffff',
    
    // Button 2 - Buy with AWS (渐变蓝色按钮)
    btn2_enabled: true,
    btn2_text: 'Buy with AWS',
    btn2_text_zh: 'Buy with AWS',
    btn2_text_en: 'Buy with AWS',
    btn2_text_jp: 'Buy with AWS',
    btn2_text_hk: 'Buy with AWS',
    btn2_url: 'https://aws.amazon.com/marketplace',
    btn2_target: '_blank'
  }
}

function getDefaultMenuItems(): NavMenuItem[] {
  return [
    // 一级导航：产品
    {
      id: 'products',
      type: 'dropdown',
      label: 'Products',
      label_zh: '产品',
      label_en: 'Products',
      label_jp: '製品',
      label_hk: '產品',
      order: 1,
      visible: true,
      children: [
        {
          id: 'ai-agents',
          label: 'AI Agents',
          label_zh: 'AI Agents',
          label_en: 'AI Agents',
          label_jp: 'AIチャットカスタマーサービス',
          label_hk: 'AI Agents',
          url: '/products/ai-agents',
          icon: '/assets/images/nav/1-01.png',
          order: 1,
          visible: true
        },
        {
          id: 'messaging',
          label: 'Live Chat',
          label_zh: 'Live Chat',
          label_en: 'Live Chat',
          label_jp: 'Live Chat',
          label_hk: 'Live Chat',
          url: '/products/live-chat',
          icon: '/assets/images/nav/1-02.png',
          order: 2,
          visible: true
        },
        {
          id: 'voice',
          label: 'Voice Connectivity',
          label_zh: 'Voice Connectivity',
          label_en: 'Voice Connectivity',
          label_jp: 'Voice Connectivity',
          label_hk: 'Voice Connectivity',
          url: '/products/voice-agents',
          icon: '/assets/images/nav/1-03.png',
          order: 3,
          visible: true
        }
      ]
    },
    // 一级导航：行业
    {
      id: 'industries',
      type: 'dropdown',
      label: 'Industries',
      label_zh: '行业',
      label_en: 'Industries',
      label_jp: '業界',
      label_hk: '行業',
      order: 2,
      visible: true,
      children: [
        {
          id: 'retail',
          label: 'Retail',
          label_zh: '零售',
          label_en: 'Retail',
          label_jp: '小売',
          label_hk: '零售',
          url: '/industries/retail',
          icon: 'fas fa-shopping-cart',
          order: 1,
          visible: true
        },
        {
          id: 'automotive',
          label: 'Automotive',
          label_zh: '汽车',
          label_en: 'Automotive',
          label_jp: '自動車',
          label_hk: '汽車',
          url: '/industries/automotive',
          icon: 'fas fa-car',
          order: 2,
          visible: true
        },
        {
          id: 'software',
          label: 'Software & Information Services',
          label_zh: '软件信息服务',
          label_en: 'Software & Information Services',
          label_jp: 'ソフトウェア・情報サービス',
          label_hk: '軟件信息服務',
          url: '/industries/software',
          icon: 'fas fa-code',
          order: 3,
          visible: true
        },
        {
          id: 'hospitality',
          label: 'Hospitality & Tourism',
          label_zh: '酒店旅游',
          label_en: 'Hospitality & Tourism',
          label_jp: 'ホテル・観光',
          label_hk: '酒店旅遊',
          url: '/industries/travel',
          icon: 'fas fa-hotel',
          order: 4,
          visible: true
        }
      ]
    },
    // 一级导航：资源中心（改为直接链接）
    {
      id: 'resources',
      type: 'link',
      label: 'Resources',
      label_zh: '资源中心',
      label_en: 'Resources',
      label_jp: 'リソースセンター',
      label_hk: '資源中心',
      url: '/resources',
      order: 3,
      visible: true
    },
    // 右侧：关于我们
    {
      id: 'about',
      type: 'link',
      label: 'About Us',
      label_zh: '关于我们',
      label_en: 'About Us',
      label_jp: '会社概要',
      label_hk: '關於我們',
      url: '/about',
      order: 4,
      visible: true
    }
  ]
}