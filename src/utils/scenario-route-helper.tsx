import { Context } from 'hono'
import { Language } from './i18n.js'
import { LayoutWithUnifiedNav } from '../components/LayoutWithUnifiedNav.js'
import { getNavigationData } from './navigation-helper.js'
import { getFooterConfig } from './common-content.js'

// 前端页面使用静态数据，不再从数据库读取
export function renderScenarioPage(
  c: Context,
  ScenarioComponent: any,
  language: Language,
  currentPath: string,
  title?: string
) {
  try {
    // 使用静态数据，不再传递数据库参数
    const { config: navConfig, menuItems } = getNavigationData(language)
    const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language)
    
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