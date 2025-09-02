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

export async function getNavigationConfig(db: D1Database, language: string = 'en'): Promise<NavigationConfig> {
  try {
    // Get the latest navigation config (regardless of status to show immediate updates)
    const config = await db.prepare(`
      SELECT * FROM navigation_config 
      WHERE language = ?
      ORDER BY updated_at DESC 
      LIMIT 1
    `).bind(language).first();
    
    return (config as NavigationConfig) || {
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
  } catch (error) {
    console.error('Error fetching navigation config:', error);
    // Return default values
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
}

export async function getFooterConfig(db: D1Database, language: string = 'en'): Promise<{
  config: FooterConfig;
  sections: FooterSection[];
  privacyLinks: PrivacyLink[];
}> {
  try {
    // Get footer config (regardless of status to show immediate updates)
    const config = await db.prepare(`
      SELECT * FROM footer_config 
      WHERE language = ?
      ORDER BY updated_at DESC 
      LIMIT 1
    `).bind(language).first();
    
    // Get footer sections for the language
    const sections = await db.prepare(`
      SELECT * FROM footer_sections
      WHERE is_visible = 1 AND language = ?
      ORDER BY position
    `).bind(language).all();
    
    // Get links for each section
    const sectionsWithLinks = await Promise.all(sections.results.map(async (section) => {
      const links = await db.prepare(`
        SELECT 
          id,
          link_text as label,
          link_url as url,
          target,
          position,
          is_visible
        FROM footer_links
        WHERE section_id = ? AND is_visible = 1
        ORDER BY position
      `).bind(section.id).all();
      
      return {
        ...section,
        links: links.results || []
      };
    }));
    
    // Get privacy links for the language
    const privacyLinks = await db.prepare(`
      SELECT 
        id,
        link_type,
        link_text as label,
        link_url as url,
        target,
        is_visible
      FROM footer_privacy_links
      WHERE is_visible = 1 AND language = ?
      ORDER BY link_type
    `).bind(language).all();
    
    return {
      config: config || {
        logo_url: 'https://page.gensparksite.com/v1/base64_upload/1476812a0b97e2ad48a012ceb5c7946e',
        logo_alt: 'ZENAVA',
        logo_subtitle: 'AI Agent for Enterprise Customer Dialogue Scenarios',
        copyright_text: `© ${new Date().getFullYear()} ZENAVA. All rights reserved.`,
        status: 'published'
      },
      sections: sectionsWithLinks,
      privacyLinks: privacyLinks.results
    };
  } catch (error) {
    console.error('Error fetching footer config:', error);
    // Return default values
    return {
      config: {
        logo_url: 'https://page.gensparksite.com/v1/base64_upload/1476812a0b97e2ad48a012ceb5c7946e',
        logo_alt: 'ZENAVA',
        logo_subtitle: 'AI Agent for Enterprise Customer Dialogue Scenarios',
        copyright_text: `© ${new Date().getFullYear()} ZENAVA. All rights reserved.`,
        status: 'published'
      },
      sections: [],
      privacyLinks: []
    };
  }
}