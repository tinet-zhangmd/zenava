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
    available_languages: ['zh', 'en', 'jp', 'hk'] as Language[],
    cta_enabled: true,
    cta_text: 'Contact Us',
    cta_url: '/contact'
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
          label: 'AI agents',
          label_zh: 'AI agents',
          label_en: 'AI agents',
          label_jp: 'AI agents',
          label_hk: 'AI agents',
          url: '/products/ai-agents',
          icon: 'fas fa-robot',
          order: 1,
          visible: true
        },
        {
          id: 'messaging',
          label: 'Messaging & Instant Chat',
          label_zh: '传讯与即时对话',
          label_en: 'Messaging & Instant Chat',
          label_jp: 'メッセージング・インスタントチャット',
          label_hk: '傳訊與即時對話',
          url: '/products/messaging',
          icon: 'fas fa-comments',
          order: 2,
          visible: true
        },
        {
          id: 'voice',
          label: 'Voice',
          label_zh: 'Voice',
          label_en: 'Voice',
          label_jp: 'Voice',
          label_hk: 'Voice',
          url: '/products/voice',
          icon: 'fas fa-microphone',
          order: 3,
          visible: true
        }
      ]
    },
    // 一级导航：测试一级菜单
    {
      id: 'test-main-menu',
      type: 'dropdown',
      label: 'Test Main Menu',
      label_zh: '测试一级菜单',
      label_en: 'Test Main Menu',
      label_jp: 'テストメインメニュー',
      label_hk: '測試一級菜單',
      order: 2,
      visible: true,
      children: [
        {
          id: 'test-submenu-1',
          label: 'Test Submenu 1',
          label_zh: '测试子菜单1',
          label_en: 'Test Submenu 1',
          label_jp: 'テストサブメニュー1',
          label_hk: '測試子菜單1',
          url: 'https://www.baidu.com',
          icon: 'fas fa-star',
          order: 1,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-2',
          label: 'Test Submenu 2',
          label_zh: '测试子菜单2',
          label_en: 'Test Submenu 2',
          label_jp: 'テストサブメニュー2',
          label_hk: '測試子菜單2',
          url: 'https://www.baidu.com',
          icon: 'fas fa-rocket',
          order: 2,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-3',
          label: 'Test Submenu 3',
          label_zh: '测试子菜单3',
          label_en: 'Test Submenu 3',
          label_jp: 'テストサブメニュー3',
          label_hk: '測試子菜單3',
          url: 'https://www.baidu.com',
          icon: 'fas fa-chart-line',
          order: 3,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-4',
          label: 'Test Submenu 4',
          label_zh: '测试子菜单4',
          label_en: 'Test Submenu 4',
          label_jp: 'テストサブメニュー4',
          label_hk: '測試子菜單4',
          url: 'https://www.baidu.com',
          icon: 'fas fa-cog',
          order: 4,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-5',
          label: 'Test Submenu 5',
          label_zh: '测试子菜单5',
          label_en: 'Test Submenu 5',
          label_jp: 'テストサブメニュー5',
          label_hk: '測試子菜單5',
          url: 'https://www.baidu.com',
          icon: 'fas fa-magic',
          order: 5,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-6',
          label: 'Test Submenu 6',
          label_zh: '测试子菜单6',
          label_en: 'Test Submenu 6',
          label_jp: 'テストサブメニュー6',
          label_hk: '測試子菜單6',
          url: 'https://www.baidu.com',
          icon: 'fas fa-users',
          order: 6,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-7',
          label: 'Test Submenu 7',
          label_zh: '测试子菜单7',
          label_en: 'Test Submenu 7',
          label_jp: 'テストサブメニュー7',
          label_hk: '測試子菜單7',
          url: 'https://www.baidu.com',
          icon: 'fas fa-shield-alt',
          order: 7,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-8',
          label: 'Test Submenu 8',
          label_zh: '测试子菜单8',
          label_en: 'Test Submenu 8',
          label_jp: 'テストサブメニュー8',
          label_hk: '測試子菜單8',
          url: 'https://www.baidu.com',
          icon: 'fas fa-bell',
          order: 8,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-9',
          label: 'Test Submenu 9',
          label_zh: '测试子菜单9',
          label_en: 'Test Submenu 9',
          label_jp: 'テストサブメニュー9',
          label_hk: '測試子菜單9',
          url: 'https://www.baidu.com',
          icon: 'fas fa-lightbulb',
          order: 9,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-10',
          label: 'Test Submenu 10',
          label_zh: '测试子菜单10',
          label_en: 'Test Submenu 10',
          label_jp: 'テストサブメニュー10',
          label_hk: '測試子菜單10',
          url: 'https://www.baidu.com',
          icon: 'fas fa-cloud',
          order: 10,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-11',
          label: 'Test Submenu 11',
          label_zh: '测试子菜单11',
          label_en: 'Test Submenu 11',
          label_jp: 'テストサブメニュー11',
          label_hk: '測試子菜單11',
          url: 'https://www.baidu.com',
          icon: 'fas fa-database',
          order: 11,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-12',
          label: 'Test Submenu 12',
          label_zh: '测试子菜单12',
          label_en: 'Test Submenu 12',
          label_jp: 'テストサブメニュー12',
          label_hk: '測試子菜單12',
          url: 'https://www.baidu.com',
          icon: 'fas fa-code',
          order: 12,
          visible: true,
          target: '_self'
        },
        {
          id: 'test-submenu-13',
          label: 'Test Submenu 13',
          label_zh: '测试子菜单13',
          label_en: 'Test Submenu 13',
          label_jp: 'テストサブメニュー13',
          label_hk: '測試子菜單13',
          url: 'https://www.baidu.com',
          icon: 'fas fa-heart',
          order: 13,
          visible: true,
          target: '_self'
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
      order: 3,
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
          label_zh: '汽车产业',
          label_en: 'Automotive',
          label_jp: '自動車産業',
          label_hk: '汽車產業',
          url: '/industries/automotive',
          icon: 'fas fa-car',
          order: 2,
          visible: true
        },
        {
          id: 'software',
          label: 'Software',
          label_zh: '软件',
          label_en: 'Software',
          label_jp: 'ソフトウェア',
          label_hk: '軟件',
          url: '/industries/software',
          icon: 'fas fa-code',
          order: 3,
          visible: true
        },
        {
          id: 'hospitality',
          label: 'Hospitality & Tourism',
          label_zh: '饭店·旅游',
          label_en: 'Hospitality & Tourism',
          label_jp: 'ホスピタリティ・観光',
          label_hk: '飯店·旅遊',
          url: '/industries/hospitality',
          icon: 'fas fa-hotel',
          order: 4,
          visible: true
        }
      ]
    },
    // 一级导航：资源中心
    {
      id: 'resources',
      type: 'dropdown',
      label: 'Resources',
      label_zh: '资源中心',
      label_en: 'Resources',
      label_jp: 'リソースセンター',
      label_hk: '資源中心',
      order: 4,
      visible: true,
      children: [
        {
          id: 'blog',
          label: 'Blog',
          label_zh: '博客',
          label_en: 'Blog',
          label_jp: 'ブログ',
          label_hk: '博客',
          url: '/resources/blog',
          icon: 'fas fa-blog',
          order: 1,
          visible: true
        },
        {
          id: 'reports',
          label: 'Reports',
          label_zh: '报告',
          label_en: 'Reports',
          label_jp: 'レポート',
          label_hk: '報告',
          url: '/resources/reports',
          icon: 'fas fa-file-alt',
          order: 2,
          visible: true
        },
        {
          id: 'videos',
          label: 'Videos',
          label_zh: '视频',
          label_en: 'Videos',
          label_jp: '動画',
          label_hk: '視頻',
          url: '/resources/videos',
          icon: 'fas fa-video',
          order: 3,
          visible: true
        }
      ]
    },
    // 右侧：客户支持
    {
      id: 'support',
      type: 'link',
      label: 'Customer Support',
      label_zh: '客户支持',
      label_en: 'Customer Support',
      label_jp: 'カスタマーサポート',
      label_hk: '客戶支持',
      url: '/support',
      order: 5,
      visible: true
    }
  ]
}