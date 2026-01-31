import { FC } from 'hono/jsx'
import { Language, getLocalizedPath, languageFlags, languageNames } from '../utils/i18n.js'
import { getTranslations } from '../i18n/translations.js'

// Navigation item types
export interface NavMenuItem {
  id: string
  type: 'link' | 'dropdown'
  label: string
  label_zh?: string
  label_en?: string
  label_jp?: string
  label_hk?: string
  url?: string
  icon?: string
  order: number
  visible: boolean
  target?: '_self' | '_blank'
  children?: NavSubItem[]
}

export interface NavSubItem {
  id: string
  label: string
  label_zh?: string
  label_en?: string
  label_jp?: string
  label_hk?: string
  url: string
  icon?: string
  order: number
  visible: boolean
  target?: '_self' | '_blank'
}

export interface NavigationConfig {
  logo_url: string
  logo_alt: string
  logo_height?: string
  logo_max_width?: string
  
  // Navigation styles
  nav_bg_color?: string
  nav_text_color?: string
  nav_hover_color?: string
  nav_border_color?: string
  nav_shadow?: string
  nav_blur?: boolean
  nav_fixed?: boolean
  
  // Dropdown styles
  dropdown_bg_color?: string
  dropdown_text_color?: string
  dropdown_hover_bg?: string
  dropdown_border_radius?: string
  dropdown_shadow?: string
  
  // Mobile menu
  mobile_menu_enabled?: boolean
  mobile_breakpoint?: string
  
  // CTA Button
  cta_enabled?: boolean
  cta_text?: string
  cta_text_zh?: string
  cta_text_en?: string
  cta_text_jp?: string
  cta_text_hk?: string
  cta_url?: string
  cta_bg_color?: string
  cta_text_color?: string
  cta_hover_bg?: string
  
  // Header Buttons (右侧按钮组)
  header_buttons_enabled?: boolean
  
  // Button 1 - Contact Us (紫色按钮)
  btn1_enabled?: boolean
  btn1_text?: string
  btn1_text_zh?: string
  btn1_text_en?: string
  btn1_text_jp?: string
  btn1_text_hk?: string
  btn1_url?: string
  btn1_bg_color?: string
  btn1_text_color?: string
  
  // Button 2 - Buy with AWS (渐变蓝色按钮)
  btn2_enabled?: boolean
  btn2_text?: string
  btn2_text_zh?: string
  btn2_text_en?: string
  btn2_text_jp?: string
  btn2_text_hk?: string
  btn2_url?: string
  btn2_target?: '_self' | '_blank'
  
  // Language switcher
  show_language_switcher?: boolean
  available_languages?: Language[]
}

interface UnifiedNavigationProps {
  config: NavigationConfig
  menuItems: NavMenuItem[]
  currentLanguage: Language
  currentPath: string
}

export const UnifiedNavigation: FC<UnifiedNavigationProps> = ({ 
  config, 
  menuItems, 
  currentLanguage, 
  currentPath 
}) => {
  // Get translations for current language
  const trans = getTranslations(currentLanguage)
  
  // Check if icon is an image path (starts with / or contains image extensions)
  const isImageIcon = (icon: string | undefined): boolean => {
    if (!icon) return false
    return icon.startsWith('/') || 
           icon.startsWith('http://') || 
           icon.startsWith('https://') ||
           /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(icon)
  }
  
  // Render icon (either image or Font Awesome)
  const renderIcon = (icon: string | undefined, className: string = '') => {
    if (!icon) return null
    
    if (isImageIcon(icon)) {
      return (
        <img 
          src={icon} 
          alt="" 
          class={className}
          style={{
            width: '2rem',
            height: '2rem',
            objectFit: 'contain'
          }}
        />
      )
    } else {
      return <i class={`${icon} ${className}`}></i>
    }
  }
  
  // Get label based on current language
  const getLabel = (item: any) => {
    const langKey = `label_${currentLanguage}` as keyof typeof item
    return item[langKey] || item.label || ''
  }

  // 获取文档 URL（根据语言）
  const getDocsUrl = (language: Language): string => {
    switch (language) {
      case 'zh': return 'https://docs.zenava.ai/zh-CN/99/838/9765'
      case 'hk': return 'https://docs.zenava.ai/zh-TW'
      case 'en': return 'https://docs.zenava.ai/en'
      case 'jp': return 'https://docs.zenava.ai/ja'
      default: return 'https://docs.zenava.ai/en'
    }
  }

  // 获取菜单项 URL（处理外部链接和文档链接）
  const getMenuItemUrl = (item: NavMenuItem): string => {
    // 如果是文档菜单项，使用多语言文档 URL
    if (item.id === 'docs') {
      return getDocsUrl(currentLanguage)
    }
    // 如果是外部链接，直接返回
    if (item.url && (item.url.startsWith('http://') || item.url.startsWith('https://'))) {
      return item.url
    }
    // 否则使用本地化路径
    return getLocalizedPath(item.url || '/', currentLanguage)
  }
  
  const getCtaText = () => {
    const langKey = `cta_text_${currentLanguage}` as keyof NavigationConfig
    return config[langKey] || config.cta_text || 'Get Started'
  }
  
  const getBtn1Text = () => {
    const langKey = `btn1_text_${currentLanguage}` as keyof NavigationConfig
    return config[langKey] || config.btn1_text || 'Contact Us'
  }
  
  const getBtn2Text = () => {
    const langKey = `btn2_text_${currentLanguage}` as keyof NavigationConfig
    return config[langKey] || config.btn2_text || 'Buy with AWS'
  }
  
  // Sort items by order
  const sortedMenuItems = [...menuItems]
    .filter(item => item.visible)
    .sort((a, b) => a.order - b.order)
  
  // Default style values
  const navStyles = {
    backgroundColor: config.nav_bg_color || 'rgba(255, 255, 255, 0.95)',
    color: config.nav_text_color || '#374151',
    borderColor: config.nav_border_color || '#f3f4f6',
    boxShadow: config.nav_shadow || '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  }
  
  const dropdownStyles = {
    backgroundColor: config.dropdown_bg_color || '#ffffff',
    color: config.dropdown_text_color || '#374151',
    borderRadius: config.dropdown_border_radius || '0.75rem',
    boxShadow: config.dropdown_shadow || '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        class={`${config.nav_fixed !== false ? 'fixed' : 'relative'} top-0 w-full z-50 transition-all duration-300 border-b ${config.nav_blur !== false ? 'backdrop-blur-md' : ''}`}
        style={navStyles}
      >
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            {/* Logo */}
            <div class="flex-shrink-0">
              <a href={getLocalizedPath('/', currentLanguage)} class="flex items-center">
                {trans.common.logo.src ? (
                  <>
                    <img 
                      src='/assets/images/logo.webp'
                      alt={trans.common.logo.alt}
                      class="w-auto object-contain transition-all duration-300 hover:opacity-80"
                      style={{
                        height: config.logo_height || '2.5rem',
                        maxWidth: config.logo_max_width || '200px'
                      }}
                      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                    />
                    <div class="hidden w-full h-full items-center justify-center bg-gray-100">
                      <i class="fas fa-image text-gray-400"></i>
                      <span class="ml-2 text-sm text-gray-500">{trans.common.noImage}</span>
                    </div>
                  </>
                ) : (
                  <span class="text-2xl font-bold">ZENAVA</span>
                )}
              </a>
            </div>
            
            {/* Desktop Menu - Center */}
            <div class="hidden md:flex items-center space-x-6 flex-1 justify-start ml-8">
              {sortedMenuItems.map(item => (
                item.type === 'dropdown' && item.children ? (
                  <div class="relative group" key={item.id}>
                    <button 
                      class="flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors hover:opacity-80"
                      style={{ color: config.nav_text_color }}
                    >
                      {item.icon && <i class={`${item.icon} mr-2`}></i>}
                      <span>{getLabel(item)}</span>
                      <i class="fas fa-chevron-down text-xs"></i>
                    </button>
                    
                    {(() => {
                      const visibleChildren = item.children.filter(c => c.visible).sort((a, b) => a.order - b.order);
                      const childCount = visibleChildren.length;
                      
                      // 根据子菜单数量决定列数和宽度
                      let gridCols = 'grid-cols-1';
                      let dropdownWidth = 'w-96';  // 384px
                      
                      if (childCount > 10) {
                        gridCols = 'grid-cols-3';
                        dropdownWidth = 'w-[900px]';  // 3列
                      } else if (childCount > 5) {
                        gridCols = 'grid-cols-2';
                        dropdownWidth = 'w-[600px]';  // 2列
                      }
                      
                      return (
                        <div 
                          class={`absolute left-0 mt-2 ${dropdownWidth} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0`}
                          style={dropdownStyles}
                        >
                          <div class={`p-2 ${childCount > 5 ? `grid gap-2 ${gridCols}` : ''}`}>
                            {visibleChildren.map(child => {
                              const isExternalLink = child.url.startsWith('http://') || child.url.startsWith('https://');
                              const targetAttr = child.target || '_self';
                              
                              return (
                                <a 
                                  href={isExternalLink ? child.url : getLocalizedPath(child.url, currentLanguage)}
                                  target={targetAttr}
                                  rel={isExternalLink && targetAttr === '_blank' ? 'noopener noreferrer' : undefined}
                                  class="block px-4 py-3 rounded-lg transition-colors hover:bg-gray-50"
                                  key={child.id}
                                >
                                  <div class="flex items-center space-x-3">
                                    {child.icon && (
                                      <div class="flex-shrink-0 w-8 flex items-center justify-center">
                                        {renderIcon(child.icon, 'text-primary-600 text-base')}
                                      </div>
                                    )}
                                  <div class="flex-1 min-w-0">
                                    <div class="font-medium text-gray-900">
                                      {getLabel(child)}
                                    </div>
                                  </div>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <a 
                    href={getMenuItemUrl(item)}
                    target={item.target || '_self'}
                    rel={item.url && (item.url.startsWith('http://') || item.url.startsWith('https://')) && item.target === '_blank' ? 'noopener noreferrer' : undefined}
                    class="px-3 py-2 text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: config.nav_text_color }}
                    key={item.id}
                  >
                    {item.icon && <i class={`${item.icon} mr-2`}></i>}
                    {getLabel(item)}
                  </a>
                )
              ))}
              
              {/* CTA Button */}
              {config.cta_enabled && config.cta_url && (
                <a 
                  href={getLocalizedPath(config.cta_url, currentLanguage)}
                  class="px-6 py-2 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:scale-105"
                  style={{
                    backgroundColor: config.cta_bg_color || '#3b82f6',
                    color: config.cta_text_color || '#ffffff'
                  }}
                >
                  {getCtaText()}
                </a>
              )}
            </div>
            
            {/* Right Section - Mobile and Desktop */}
            <div class="flex items-center space-x-3">
              {/* Language Switcher - Always visible */}
              {config.show_language_switcher !== false && (
                <div class="relative group">
                  <button class="inline-flex items-center align-middle space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span class="inline-flex items-center" style="font-size: 1.25rem; line-height: 1;">{languageFlags[currentLanguage]}</span>
                    <span class="inline-flex items-center text-sm font-medium" style="line-height: 1;">{languageNames[currentLanguage]}</span>
                    <i class="fas fa-chevron-down text-xs inline-flex items-center" style="line-height: 1;"></i>
                  </button>
                  
                  <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div class="p-2">
                      {(config.available_languages || ['en', 'jp', 'hk']).map((lang: Language) => (
                        <a 
                          href={getLocalizedPath(currentPath, lang)}
                          class={`inline-flex items-center align-middle space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${lang === currentLanguage ? 'bg-gray-50' : ''}`}
                          key={lang}
                        >
                          <span class="inline-flex items-center" style="font-size: 1.25rem; line-height: 1;">{languageFlags[lang]}</span>
                          <span class="inline-flex items-center text-sm font-medium" style="line-height: 1;">{languageNames[lang]}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Header Buttons */}
              {config.header_buttons_enabled !== false && (
                <div class="hidden md:flex items-center space-x-3">
                  {/* Button 1 - Contact Us (紫色按钮) */}
                  {config.btn1_enabled !== false && config.btn1_url && (
                    <a 
                      href={getLocalizedPath(config.btn1_url, currentLanguage)}
                      class="px-5 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-lg hover:scale-105"
                      style={{
                        backgroundColor: config.btn1_bg_color || '#7c3aed',
                        color: config.btn1_text_color || '#ffffff'
                      }}
                    >
                      {getBtn1Text()}
                    </a>
                  )}
                  
                  {/* Button 2 - Buy with AWS (渐变蓝色按钮) */}
                  {config.btn2_enabled !== false && config.btn2_url && (
                    <a 
                      href={config.btn2_url}
                      target={config.btn2_target || '_blank'}
                      rel={config.btn2_target === '_blank' ? 'noopener noreferrer' : undefined}
                      class="px-5 py-2 rounded-lg font-medium text-sm text-white transition-all hover:shadow-lg hover:scale-105"
                      style={{
                        background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)'
                      }}
                    >
                      {getBtn2Text()} <span class="ml-1">→</span>
                    </a>
                  )}
                </div>
              )}
              
              {/* Mobile Menu Button */}
              {config.mobile_menu_enabled !== false && (
                <button 
                  class="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onclick="toggleMobileMenu()"
                >
                  <i class="fas fa-bars text-gray-700 text-xl"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {config.mobile_menu_enabled !== false && (
        <div id="mobileMenu" class="fixed inset-0 bg-black/50 z-40 md:hidden opacity-0 invisible transition-all duration-300">
          <div class="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform translate-x-full transition-transform duration-300">
            <div class="p-4 border-b">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold">Menu</h3>
                <button onclick="toggleMobileMenu()" class="p-2 rounded-lg hover:bg-gray-50">
                  <i class="fas fa-times text-gray-700"></i>
                </button>
              </div>
            </div>
            
            <div class="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-80px)]">
              {sortedMenuItems.map(item => (
                item.type === 'dropdown' && item.children ? (
                  <div key={item.id}>
                    <div class="font-medium text-gray-900 px-4 py-2">
                      {item.icon && <i class={`${item.icon} mr-2`}></i>}
                      {getLabel(item)}
                    </div>
                    <div class="ml-4 space-y-1">
                      {item.children
                        .filter(child => child.visible)
                        .sort((a, b) => a.order - b.order)
                        .map(child => (
                          <a 
                            href={getLocalizedPath(child.url, currentLanguage)}
                            target={child.target || '_self'}
                            class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                            key={child.id}
                          >
                            {child.icon && (
                              <span class="inline-flex items-center justify-center w-8 mr-2">
                                {renderIcon(child.icon, 'text-primary-600 text-base')}
                              </span>
                            )}
                            {getLabel(child)}
                          </a>
                        ))}
                    </div>
                  </div>
                ) : (
                  <a 
                    href={getMenuItemUrl(item)}
                    target={item.target || '_self'}
                    rel={item.url && (item.url.startsWith('http://') || item.url.startsWith('https://')) && item.target === '_blank' ? 'noopener noreferrer' : undefined}
                    class="block px-4 py-3 rounded-lg hover:bg-gray-50"
                    key={item.id}
                  >
                    {item.icon && <i class={`${item.icon} mr-2 text-primary-600`}></i>}
                    {getLabel(item)}
                  </a>
                )
              ))}
              
              {/* Mobile CTA */}
              {config.cta_enabled && config.cta_url && (
                <a 
                  href={getLocalizedPath(config.cta_url, currentLanguage)}
                  class="block w-full px-6 py-3 rounded-lg font-semibold text-center mt-4"
                  style={{
                    backgroundColor: config.cta_bg_color || '#3b82f6',
                    color: config.cta_text_color || '#ffffff'
                  }}
                >
                  {getCtaText()}
                </a>
              )}
              
              {/* Mobile Header Buttons */}
              {config.header_buttons_enabled !== false && (
                <div class="space-y-3 mt-4">
                  {/* Button 1 - Contact Us (紫色按钮) */}
                  {config.btn1_enabled !== false && config.btn1_url && (
                    <a 
                      href={getLocalizedPath(config.btn1_url, currentLanguage)}
                      class="block w-full px-6 py-3 rounded-lg font-semibold text-center"
                      style={{
                        backgroundColor: config.btn1_bg_color || '#7c3aed',
                        color: config.btn1_text_color || '#ffffff'
                      }}
                    >
                      {getBtn1Text()}
                    </a>
                  )}
                  
                  {/* Button 2 - Buy with AWS (渐变蓝色按钮) */}
                  {config.btn2_enabled !== false && config.btn2_url && (
                    <a 
                      href={config.btn2_url}
                      target={config.btn2_target || '_blank'}
                      rel={config.btn2_target === '_blank' ? 'noopener noreferrer' : undefined}
                      class="block w-full px-6 py-3 rounded-lg font-semibold text-center text-white"
                      style={{
                        background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)'
                      }}
                    >
                      {getBtn2Text()} <span class="ml-1">→</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            const menuPanel = menu?.querySelector('.absolute');
            
            if (menu?.classList.contains('opacity-0')) {
              menu.classList.remove('opacity-0', 'invisible');
              setTimeout(() => {
                menuPanel?.classList.remove('translate-x-full');
              }, 10);
            } else {
              menuPanel?.classList.add('translate-x-full');
              setTimeout(() => {
                menu?.classList.add('opacity-0', 'invisible');
              }, 300);
            }
          }
          
          // Close mobile menu when clicking outside
          document.getElementById('mobileMenu')?.addEventListener('click', function(e) {
            if (e.target === this) {
              toggleMobileMenu();
            }
          });
        `
      }} />
    </>
  )
}