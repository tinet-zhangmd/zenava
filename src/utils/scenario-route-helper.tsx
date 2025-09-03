import { Context } from 'hono'
import { Language } from './i18n.js'
import { LayoutWithUnifiedNav } from '../components/LayoutWithUnifiedNav.js'
import { getNavigationData } from './navigation-helper.js'
import { getFooterConfig } from './common-content.js'

export async function renderScenarioPage(
  c: Context,
  ScenarioComponent: any,
  language: Language,
  currentPath: string,
  title?: string
) {
  try {
    // Load unified navigation data
    const { config: navConfig, menuItems } = await getNavigationData(c.env.DB, language)
    const { config: footerConfig, sections: footerSections, privacyLinks } = await getFooterConfig(c.env.DB, language)
    
    return c.html(
      <LayoutWithUnifiedNav
        language={language}
        currentPath={currentPath}
        seoTitle={title}
        navigationConfig={navConfig}
        menuItems={menuItems}
        footerConfig={footerConfig}
        footerSections={footerSections}
        privacyLinks={privacyLinks}
      >
        <ScenarioComponent language={language} />
      </LayoutWithUnifiedNav>
    )
  } catch (error) {
    console.error('Error rendering scenario page:', error)
    // Fallback to simple rendering
    return c.html(
      <div>
        <ScenarioComponent language={language} />
      </div>
    )
  }
}