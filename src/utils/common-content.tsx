// Helper functions to get common content from database

export interface NavigationConfig {
  logo_url: string | null;
  logo_alt: string;
  status: string;
  // Optional style tokens managed by backend (all optional)
  text_color?: string | null;
  hover_color?: string | null;
  bg_color?: string | null;
  border_color?: string | null;
  font_family?: string | null;
  gap_x?: string | null; // e.g., '24px' or '1.5rem'
}

export interface FooterConfig {
  logo_url: string | null;
  logo_alt: string;
  logo_subtitle: string;
  copyright_text: string;
  status: string;
}

export interface FooterSection {
  id: number;
  title: string;
  position: number;
  is_visible: number;
  links: FooterLink[];
}

export interface FooterLink {
  id: number;
  label: string;
  url: string;
  target: string;
  position: number;
  is_visible: number;
}

export interface PrivacyLink {
  id: number;
  link_type: string;
  label: string;
  url: string | null;
  target: string;
  is_visible: number;
}

// 前端页面使用静态数据，不再从数据库读取
export function getNavigationConfig(language: string = 'en'): NavigationConfig {
  // 直接返回静态默认配置
  return {
    logo_url: 'https://page.gensparksite.com/v1/base64_upload/1476812a0b97e2ad48a012ceb5c7946e',
    logo_alt: 'ZENAVA',
    status: 'published',
    text_color: null,
    hover_color: null,
    bg_color: null,
    border_color: null,
    font_family: null,
    gap_x: null
  };
}

// 前端页面使用静态数据，不再从数据库读取
export function getFooterConfig(language: string = 'en'): {
  config: FooterConfig;
  sections: FooterSection[];
  privacyLinks: PrivacyLink[];
} {
  // 根据语言返回不同的静态配置
  const defaultConfig = {
    logo_url: 'https://page.gensparksite.com/v1/base64_upload/1476812a0b97e2ad48a012ceb5c7946e',
    logo_alt: 'ZENAVA',
    logo_subtitle: language === 'jp' ? 'エンタープライズ顧客対話シナリオ向けAIエージェント' :
                    language === 'hk' ? '企業客戶對話場景的AI智能體' :
                    'AI Agent for Enterprise Customer Dialogue Scenarios',
    copyright_text: `© ${new Date().getFullYear()} ZENAVA. All rights reserved.`,
    status: 'published'
  };

  // 返回静态的 sections 和 privacyLinks
  const defaultSections: FooterSection[] = [
    {
      id: 1,
      title: language === 'jp' ? 'シナリオ' : language === 'hk' ? '場景' : 'Scenarios',
      position: 1,
      is_visible: 1,
      links: [
        {
          id: 1,
          label: language === 'jp' ? 'マーケティング向けZenava' : language === 'hk' ? '營銷場景' : 'Zenava for Marketing',
          url: language === 'jp' ? '/jp/scenarios/marketing' : language === 'hk' ? '/hk/scenarios/marketing' : '/scenarios/marketing',
          target: '_self',
          position: 1,
          is_visible: 1
        },
        {
          id: 2,
          label: language === 'jp' ? '営業向けZenava' : language === 'hk' ? '銷售場景' : 'Zenava for Sales',
          url: language === 'jp' ? '/jp/scenarios/sales' : language === 'hk' ? '/hk/scenarios/sales' : '/scenarios/sales',
          target: '_self',
          position: 2,
          is_visible: 1
        },
        {
          id: 3,
          label: language === 'jp' ? 'カスタマーサービス向けZenava' : language === 'hk' ? '客服場景' : 'Zenava for Customer Service',
          url: language === 'jp' ? '/jp/scenarios/customer-service' : language === 'hk' ? '/hk/scenarios/customer-service' : '/scenarios/customer-service',
          target: '_self',
          position: 3,
          is_visible: 1
        },
        {
          id: 4,
          label: language === 'jp' ? '社内サービス向けZenava' : language === 'hk' ? '內部服務' : 'Zenava for Internal Service',
          url: language === 'jp' ? '/jp/scenarios/internal-service' : language === 'hk' ? '/hk/scenarios/internal-service' : '/scenarios/internal-service',
          target: '_self',
          position: 4,
          is_visible: 1
        },
        {
          id: 5,
          label: language === 'jp' ? '管理最適化向けZenava' : language === 'hk' ? '管理優化' : 'Zenava for Management',
          url: language === 'jp' ? '/jp/scenarios/management' : language === 'hk' ? '/hk/scenarios/management' : '/scenarios/management',
          target: '_self',
          position: 5,
          is_visible: 1
        }
      ]
    },
    {
      id: 2,
      title: language === 'jp' ? '会社情報' : language === 'hk' ? '公司' : 'Company',
      position: 2,
      is_visible: 1,
      links: [
        {
          id: 6,
          label: language === 'jp' ? '私たちについて' : language === 'hk' ? '關於我們' : 'About Us',
          url: language === 'jp' ? '/jp/about' : language === 'hk' ? '/hk/about' : '/about',
          target: '_self',
          position: 1,
          is_visible: 1
        }
      ]
    }
  ];

  const defaultPrivacyLinks: PrivacyLink[] = [
    {
      id: 1,
      link_type: 'privacy',
      label: language === 'jp' ? 'プライバシーポリシー' : language === 'hk' ? '隱私政策' : 'Privacy Policy',
      url: language === 'jp' ? '/jp/privacy-policy' : language === 'hk' ? '/hk/privacy-policy' : '/privacy-policy',
      target: '_self',
      is_visible: 1
    },
    {
      id: 2,
      link_type: 'terms',
      label: language === 'jp' ? '利用規約' : language === 'hk' ? '條款與條件' : 'Terms & Conditions',
      url: language === 'jp' ? '/jp/terms-and-conditions' : language === 'hk' ? '/hk/terms-and-conditions' : '/terms-and-conditions',
      target: '_self',
      is_visible: 1
    }
  ];

  return {
    config: defaultConfig,
    sections: defaultSections,
    privacyLinks: defaultPrivacyLinks
  };
}