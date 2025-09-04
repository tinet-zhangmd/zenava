// Static Site Generator for Zenava CMS
// This is a placeholder implementation for the static site generator

export class StaticSiteGenerator {
  private db: D1Database
  private config: any

  constructor(db: D1Database, config: any) {
    this.db = db
    this.config = config
  }

  async generateAllPages(versionId: number): Promise<any> {
    try {
      // Get all page snapshots for this version
      const { results: snapshots } = await this.db.prepare(`
        SELECT * FROM page_snapshots WHERE version_id = ?
      `).bind(versionId).all()

      const errors: string[] = []
      let pagesBuilt = 0

      for (const snapshot of snapshots) {
        try {
          // Parse snapshot data
          const pageData = JSON.parse(snapshot.page_data)
          const modulesData = JSON.parse(snapshot.modules_data)
          const seoData = JSON.parse(snapshot.seo_data)

          // Generate HTML for page
          const html = await this.generatePageHTML(pageData, modulesData, seoData)
          
          // Save to static files table
          await this.saveStaticFile(versionId, pageData.slug, html)
          
          pagesBuilt++
        } catch (error: any) {
          errors.push(`Error generating page ${snapshot.page_id}: ${error.message}`)
        }
      }

      // Generate sitemap and robots.txt if configured
      if (this.config.generateSitemap) {
        await this.generateSitemap(versionId)
      }
      
      if (this.config.generateRobots) {
        await this.generateRobotsTxt(versionId)
      }

      return {
        success: errors.length === 0,
        pagesBuilt,
        errors
      }
    } catch (error: any) {
      return {
        success: false,
        pagesBuilt: 0,
        errors: [error.message]
      }
    }
  }

  private async generatePageHTML(pageData: any, modulesData: any[], seoData: any): Promise<string> {
    // This is a simplified HTML generation
    // In a real implementation, this would use a template engine or React SSR
    
    let html = `<!DOCTYPE html>
<html lang="${pageData.language || 'en'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${seoData.meta_title || pageData.title}</title>
    <meta name="description" content="${seoData.meta_description || ''}">
    <meta name="keywords" content="${seoData.meta_keywords || ''}">
    <meta property="og:title" content="${seoData.og_title || pageData.title}">
    <meta property="og:description" content="${seoData.og_description || ''}">
    ${seoData.og_image ? `<meta property="og:image" content="${seoData.og_image}">` : ''}
</head>
<body>
    <h1>${pageData.title}</h1>
    <div class="content">
`

    // Add modules content
    for (const module of modulesData) {
      if (module.is_visible) {
        html += `<div class="module module-${module.module_type}">${module.content}</div>\n`
      }
    }

    html += `
    </div>
</body>
</html>`

    if (this.config.minify) {
      // Simple minification - remove extra whitespace
      html = html.replace(/\s+/g, ' ').trim()
    }

    return html
  }

  private async saveStaticFile(versionId: number, slug: string, content: string): Promise<void> {
    const filePath = `${this.config.outputDir}/${slug}.html`
    
    await this.db.prepare(`
      INSERT INTO static_files (version_id, file_path, content, file_type, file_size)
      VALUES (?, ?, ?, 'html', ?)
      ON CONFLICT(version_id, file_path) DO UPDATE SET
        content = excluded.content,
        file_size = excluded.file_size,
        updated_at = CURRENT_TIMESTAMP
    `).bind(versionId, filePath, content, new Blob([content]).size).run()
  }

  private async generateSitemap(versionId: number): Promise<void> {
    const { results: files } = await this.db.prepare(`
      SELECT file_path FROM static_files 
      WHERE version_id = ? AND file_type = 'html'
    `).bind(versionId).all()

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`
    
    for (const file of files) {
      const url = file.file_path.replace(this.config.outputDir, this.config.baseUrl)
        .replace('.html', '')
      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
`
    }
    
    sitemap += `</urlset>`

    await this.saveStaticFile(versionId, 'sitemap.xml', sitemap)
  }

  private async generateRobotsTxt(versionId: number): Promise<void> {
    const robots = `User-agent: *
Allow: /
Sitemap: ${this.config.baseUrl}/sitemap.xml`

    await this.saveStaticFile(versionId, 'robots.txt', robots)
  }
}