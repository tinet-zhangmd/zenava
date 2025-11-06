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
          description: 'Intelligent AI agents for automated customer interactions',
          description_zh: '智能AI代理实现自动化客户互动',
          description_en: 'Intelligent AI agents for automated customer interactions',
          description_jp: '自動化された顧客対応のためのインテリジェントAIエージェント',
          description_hk: '智能AI代理實現自動化客戶互動',
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
          description: 'Real-time messaging and instant chat solutions',
          description_zh: '实时消息传递和即时聊天解决方案',
          description_en: 'Real-time messaging and instant chat solutions',
          description_jp: 'リアルタイムメッセージングとインスタントチャットソリューション',
          description_hk: '實時消息傳遞和即時聊天解決方案',
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
          description: 'Advanced voice communication solutions',
          description_zh: '先进的语音通信解决方案',
          description_en: 'Advanced voice communication solutions',
          description_jp: '高度な音声通信ソリューション',
          description_hk: '先進的語音通訊解決方案',
          url: '/products/voice',
          icon: 'fas fa-microphone',
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
          description: 'AI solutions for retail industry',
          description_zh: '零售行业AI解决方案',
          description_en: 'AI solutions for retail industry',
          description_jp: '小売業向けAIソリューション',
          description_hk: '零售行業AI解決方案',
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
          description: 'AI solutions for automotive industry',
          description_zh: '汽车产业AI解决方案',
          description_en: 'AI solutions for automotive industry',
          description_jp: '自動車産業向けAIソリューション',
          description_hk: '汽車產業AI解決方案',
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
          description: 'AI solutions for software companies',
          description_zh: '软件企业AI解决方案',
          description_en: 'AI solutions for software companies',
          description_jp: 'ソフトウェア企業向けAIソリューション',
          description_hk: '軟件企業AI解決方案',
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
          description: 'AI solutions for hospitality and tourism',
          description_zh: '酒店旅游行业AI解决方案',
          description_en: 'AI solutions for hospitality and tourism',
          description_jp: 'ホスピタリティ・観光業向けAIソリューション',
          description_hk: '酒店旅遊行業AI解決方案',
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
      order: 3,
      visible: true,
      children: [
        {
          id: 'blog',
          label: 'Blog',
          label_zh: '博客',
          label_en: 'Blog',
          label_jp: 'ブログ',
          label_hk: '博客',
          description: 'Latest insights and articles',
          description_zh: '最新见解和文章',
          description_en: 'Latest insights and articles',
          description_jp: '最新のインサイトと記事',
          description_hk: '最新見解和文章',
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
          description: 'Industry reports and whitepapers',
          description_zh: '行业报告和白皮书',
          description_en: 'Industry reports and whitepapers',
          description_jp: '業界レポートとホワイトペーパー',
          description_hk: '行業報告和白皮書',
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
          description: 'Product demos and tutorials',
          description_zh: '产品演示和教程',
          description_en: 'Product demos and tutorials',
          description_jp: '製品デモとチュートリアル',
          description_hk: '產品演示和教程',
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
      order: 4,
      visible: true
    }
  ]
}