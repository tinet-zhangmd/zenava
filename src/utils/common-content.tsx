// Helper functions to get common content from database

export interface NavigationConfig {
  logo_url: string | null;
  logo_alt: string;
  status: string;
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
    const config = await db.prepare(`
      SELECT * FROM navigation_config 
      WHERE status = 'published' AND language = ?
      ORDER BY updated_at DESC 
      LIMIT 1
    `).bind(language).first();
    
    return config || {
      logo_url: 'https://page.gensparksite.com/v1/base64_upload/5e1aceb131c0da67ee3eee4d55e36029',
      logo_alt: 'Zenava Logo',
      status: 'published'
    };
  } catch (error) {
    console.error('Error fetching navigation config:', error);
    // Return default values
    return {
      logo_url: 'https://page.gensparksite.com/v1/base64_upload/5e1aceb131c0da67ee3eee4d55e36029',
      logo_alt: 'Zenava Logo',
      status: 'published'
    };
  }
}

export async function getFooterConfig(db: D1Database, language: string = 'en'): Promise<{
  config: FooterConfig;
  sections: FooterSection[];
  privacyLinks: PrivacyLink[];
}> {
  try {
    // Get footer config
    const config = await db.prepare(`
      SELECT * FROM footer_config 
      WHERE status = 'published' AND language = ?
      ORDER BY updated_at DESC 
      LIMIT 1
    `).bind(language).first();
    
    // Get footer sections
    const sections = await db.prepare(`
      SELECT * FROM footer_sections
      WHERE is_visible = 1
      ORDER BY position
    `).all();
    
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
    
    // Get privacy links
    const privacyLinks = await db.prepare(`
      SELECT 
        id,
        link_type,
        link_text as label,
        link_url as url,
        target,
        is_visible
      FROM footer_privacy_links
      WHERE is_visible = 1
      ORDER BY link_type
    `).all();
    
    return {
      config: config || {
        logo_url: 'https://page.gensparksite.com/v1/base64_upload/5e1aceb131c0da67ee3eee4d55e36029',
        logo_alt: 'Logo',
        logo_subtitle: 'AI Agent for Enterprise Customer Dialogue Scenarios',
        copyright_text: `© ${new Date().getFullYear()} TI Cloud. All rights reserved.`,
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
        logo_url: 'https://page.gensparksite.com/v1/base64_upload/5e1aceb131c0da67ee3eee4d55e36029',
        logo_alt: 'Logo',
        logo_subtitle: 'AI Agent for Enterprise Customer Dialogue Scenarios',
        copyright_text: `© ${new Date().getFullYear()} TI Cloud. All rights reserved.`,
        status: 'published'
      },
      sections: [],
      privacyLinks: []
    };
  }
}