import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n.js'

interface OtherResourcesSectionProps {
  language?: Language
  featuredContents?: any[]  // 推荐文章列表（可选）
}

export const OtherResourcesSection: FC<OtherResourcesSectionProps> = ({ language = 'zh', featuredContents = [] }) => {
  return (
    <section class="py-12 md:py-16 lg:py-20 bg-[#1a2332] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#6438FF]/10 to-[#0DE0EF]/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-[#0DE0EF]/10 to-[#6438FF]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div class="site-container px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {language === 'zh' && '资源中心'}
            {language === 'en' && 'Resource Center'}
            {language === 'jp' && 'リソースセンター'}
            {language === 'hk' && '資源中心'}
          </h2>
        </div>

        {/* Resource Cards Grid */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredContents.length > 0 ? (
            // 显示推荐文章（最多4个）
            featuredContents.slice(0, 4).map((content: any, index: number) => {
              // 构建多语言链接
              const langPrefix = language === 'en' ? '' : `/${language}`
              const categorySlug = content.category_slug || ''
              // 构建内容详情页链接：/语言/resources/栏目slug/内容id
              let contentLink
              if (categorySlug) {
                // 移除 category_slug 开头的 /resources（如果有）
                let slug = categorySlug.replace(/^\/resources\//, '').replace(/^\/resources$/, '')
                // 移除开头的斜杠（如果有）
                slug = slug.replace(/^\//, '')
                // 构建完整路径
                contentLink = `${langPrefix}/resources/${slug}/${content.id}`
              } else {
                contentLink = `${langPrefix}/resources/${content.id}`
              }
              
              // 获取多语言标题（根据当前语言选择），并用《》包裹
              const getTitle = () => {
                let title = ''
                if (language === 'zh') title = content.title_zh || content.title || '文章标题'
                else if (language === 'en') title = content.title_en || content.title || 'Article Title'
                else if (language === 'jp') title = content.title_jp || content.title || '記事タイトル'
                else if (language === 'hk') title = content.title_hk || content.title || '文章標題'
                else title = content.title || 'Article Title'
                
                // 如果标题还没有《》，则添加
                if (title && !title.startsWith('《') && !title.startsWith('《')) {
                  title = `《${title}》`
                }
                return title
              }
              
              // 获取多语言封面图（根据当前语言选择）
              const getCoverImage = () => {
                if (language === 'zh') return content.cover_image_zh || content.cover_image || ''
                if (language === 'en') return content.cover_image_en || content.cover_image || ''
                if (language === 'jp') return content.cover_image_jp || content.cover_image || ''
                if (language === 'hk') return content.cover_image_hk || content.cover_image || ''
                return content.cover_image || ''
              }
              
              // 根据分类名称或索引选择图标和渐变背景
              const getCardStyle = (categoryName: string, idx: number) => {
                const categoryLower = (categoryName || '').toLowerCase()
                // 根据分类名称匹配样式
                if (categoryLower.includes('直播') || categoryLower.includes('video') || categoryLower.includes('live')) {
                  return {
                    gradient: 'from-purple-100 to-purple-200',
                    overlay: 'from-purple-400/20 to-purple-400/20',
                    icon: 'fas fa-video',
                    iconColor: 'text-purple-500',
                    tagBg: 'bg-orange-400',
                    tagText: 'text-white'
                  }
                }
                if (categoryLower.includes('报告') || categoryLower.includes('report') || categoryLower.includes('白皮书')) {
                  return {
                    gradient: 'from-green-100 to-teal-200',
                    overlay: 'from-green-400/20 to-teal-400/20',
                    icon: 'fas fa-book',
                    iconColor: 'text-green-500',
                    tagBg: 'bg-yellow-400',
                    tagText: 'text-gray-900'
                  }
                }
                if (categoryLower.includes('博客') || categoryLower.includes('blog')) {
                  return {
                    gradient: 'from-orange-100 to-amber-200',
                    overlay: 'from-orange-400/20 to-amber-400/20',
                    icon: 'fas fa-pen-fancy',
                    iconColor: 'text-orange-500',
                    tagBg: 'bg-blue-500',
                    tagText: 'text-white'
                  }
                }
                // 默认样式（根据索引）
                const defaultStyles = [
                  {
                    gradient: 'from-purple-100 to-purple-200',
                    overlay: 'from-purple-400/20 to-purple-400/20',
                    icon: 'fas fa-video',
                    iconColor: 'text-purple-500',
                    tagBg: 'bg-orange-400',
                    tagText: 'text-white'
                  },
                  {
                    gradient: 'from-green-100 to-teal-200',
                    overlay: 'from-green-400/20 to-teal-400/20',
                    icon: 'fas fa-book',
                    iconColor: 'text-green-500',
                    tagBg: 'bg-yellow-400',
                    tagText: 'text-gray-900'
                  },
                  {
                    gradient: 'from-orange-100 to-amber-200',
                    overlay: 'from-orange-400/20 to-amber-400/20',
                    icon: 'fas fa-pen-fancy',
                    iconColor: 'text-orange-500',
                    tagBg: 'bg-blue-500',
                    tagText: 'text-white'
                  },
                  {
                    gradient: 'from-cyan-100 to-blue-200',
                    overlay: 'from-cyan-400/20 to-blue-400/20',
                    icon: 'fas fa-file-alt',
                    iconColor: 'text-cyan-500',
                    tagBg: 'bg-green-500',
                    tagText: 'text-white'
                  }
                ]
                return defaultStyles[idx % 4]
              }
              
              const cardStyle = getCardStyle(content.category_name || '', index)
              const coverImage = getCoverImage()
              
              return (
                <a 
                  key={content.id}
                  href={contentLink}
                  class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group block"
                >
                  {/* Card Image/Icon Area */}
                  <div class={`relative h-40 md:h-48 bg-gradient-to-br ${cardStyle.gradient} flex items-center justify-center overflow-hidden`}>
                    {coverImage ? (
                      // 如果有封面图，显示图片
                      <>
                        <img 
                          src={coverImage}
                          alt={getTitle()}
                          class="w-full h-full object-cover"
                          loading={index === 0 ? 'eager' : 'lazy'}
                          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        />
                        <div class={`hidden absolute inset-0 bg-gradient-to-br ${cardStyle.overlay}`}></div>
                      </>
                    ) : (
                      // 如果没有封面图，显示图标
                      <>
                        <div class={`absolute inset-0 bg-gradient-to-br ${cardStyle.overlay}`}></div>
                        <div class="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                          <div class="w-24 h-24 md:w-32 md:h-32 bg-white/90 rounded-2xl shadow-xl flex items-center justify-center">
                            <i class={`${cardStyle.icon} ${cardStyle.iconColor} text-3xl md:text-5xl`}></i>
                          </div>
                        </div>
                      </>
                    )}
                    {/* Category Tag */}
                    {content.category_name && (
                      <div class={`absolute top-3 md:top-4 left-3 md:left-4 ${cardStyle.tagBg} ${cardStyle.tagText} px-2 md:px-3 py-1 rounded-full text-xs font-semibold`}>
                        {content.category_name}
                      </div>
                    )}
                  </div>
                  
                  {/* Card Content */}
                  <div class="p-4 md:p-5">
                    <h3 class="text-gray-900 font-bold text-sm md:text-base mb-2 line-clamp-2">
                      {getTitle()}
                    </h3>
                  </div>
                </a>
              )
            })
          ) : (
            // 如果没有推荐文章，显示默认的4个固定卡片
            <>
              {/* Card 1 - 直播 */}
              {(() => {
                const langPrefix = language === 'en' ? '' : `/${language}`
                const videoLink = `${langPrefix}/resources/video/1`
                return (
                <a href={videoLink} class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group block">
                {/* Card Image */}
                <div class="relative h-40 md:h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-400/20"></div>
                  <div class="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    <div class="w-24 h-24 md:w-32 md:h-32 bg-white/90 rounded-2xl shadow-xl flex items-center justify-center">
                      <i class="fas fa-video text-purple-500 text-3xl md:text-5xl"></i>
                    </div>
                  </div>
                  {/* Tag */}
                  <div class="absolute top-3 md:top-4 left-3 md:left-4 bg-orange-400 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <i class="fas fa-circle text-[8px]"></i>
                    <span>
                      {language === 'zh' && '直播'}
                      {language === 'en' && 'Live'}
                      {language === 'jp' && 'ライブ'}
                      {language === 'hk' && '直播'}
                    </span>
                  </div>
                </div>
                {/* Card Content */}
                <div class="p-4 md:p-5">
                  <h3 class="text-gray-900 font-bold text-sm md:text-base mb-2">
                    {language === 'zh' && '《提升跨渠道沟通的AI生产力》'}
                    {language === 'en' && '《Enhancing AI Productivity in Cross-Channel Communication》'}
                    {language === 'jp' && '《クロスチャネルコミュニケーションのAI生産性向上》'}
                    {language === 'hk' && '《提升跨渠道溝通的AI生產力》'}
                  </h3>
                </div>
                </a>
                )
              })()}

              {/* Card 2 - 行业报告 */}
              {(() => {
                const langPrefix = language === 'en' ? '' : `/${language}`
                const reportLink = `${langPrefix}/resources/reports/1`
                return (
                <a href={reportLink} class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group block">
                <div class="relative h-40 md:h-48 bg-gradient-to-br from-green-100 to-teal-200 flex items-center justify-center overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20"></div>
                  <div class="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    <div class="w-24 h-24 md:w-32 md:h-32 bg-white/90 rounded-2xl shadow-xl flex items-center justify-center">
                      <i class="fas fa-book text-green-500 text-3xl md:text-5xl"></i>
                    </div>
                  </div>
                  <div class="absolute top-3 md:top-4 left-3 md:left-4 bg-yellow-400 text-gray-900 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                    {language === 'zh' && '行业报告'}
                    {language === 'en' && 'Report'}
                    {language === 'jp' && '業界レポート'}
                    {language === 'hk' && '行業報告'}
                  </div>
                </div>
                <div class="p-4 md:p-5">
                  <h3 class="text-gray-900 font-bold text-sm md:text-base mb-2">
                    {language === 'zh' && '《提升跨渠道沟通的AI生产力》'}
                    {language === 'en' && 'Enhancing AI Productivity in Cross-Channel Communication'}
                    {language === 'jp' && '《クロスチャネルコミュニケーションのAI生産性向上》'}
                    {language === 'hk' && '《提升跨渠道溝通的AI生產力》'}
                  </h3>
                </div>
                </a>
                )
              })()}

              {/* Card 3 - 博客 */}
              {(() => {
                const langPrefix = language === 'en' ? '' : `/${language}`
                const blogLink = `${langPrefix}/resources/blog/1`
                return (
                <a href={blogLink} class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group block">
                <div class="relative h-40 md:h-48 bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/20"></div>
                  <div class="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    <div class="w-24 h-24 md:w-32 md:h-32 bg-white/90 rounded-2xl shadow-xl flex items-center justify-center">
                      <i class="fas fa-pen-fancy text-orange-500 text-3xl md:text-5xl"></i>
                    </div>
                  </div>
                  <div class="absolute top-3 md:top-4 left-3 md:left-4 bg-blue-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                    {language === 'zh' && '博客'}
                    {language === 'en' && 'Blog'}
                    {language === 'jp' && 'ブログ'}
                    {language === 'hk' && '博客'}
                  </div>
                </div>
                <div class="p-4 md:p-5">
                  <h3 class="text-gray-900 font-bold text-sm md:text-base mb-2">
                    {language === 'zh' && '《提升跨渠道沟通的AI生产力》'}
                    {language === 'en' && 'Enhancing AI Productivity in Cross-Channel Communication'}
                    {language === 'jp' && '《クロスチャネルコミュニケーションのAI生産性向上》'}
                    {language === 'hk' && '《提升跨渠道溝通的AI生產力》'}
                  </h3>
                </div>
                </a>
                )
              })()}

              {/* Card 4 - 文章 */}
              {(() => {
                const langPrefix = language === 'en' ? '' : `/${language}`
                const articleLink = `${langPrefix}/resources/blog/2`
                return (
                <a href={articleLink} class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group block">
                <div class="relative h-40 md:h-48 bg-gradient-to-br from-cyan-100 to-blue-200 flex items-center justify-center overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20"></div>
                  <div class="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    <div class="w-24 h-24 md:w-32 md:h-32 bg-white/90 rounded-2xl shadow-xl flex items-center justify-center">
                      <i class="fas fa-file-alt text-cyan-500 text-3xl md:text-5xl"></i>
                    </div>
                  </div>
                  <div class="absolute top-3 md:top-4 left-3 md:left-4 bg-green-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                    {language === 'zh' && '文章'}
                    {language === 'en' && 'Article'}
                    {language === 'jp' && '記事'}
                    {language === 'hk' && '文章'}
                  </div>
                </div>
                <div class="p-4 md:p-5">
                  <h3 class="text-gray-900 font-bold text-sm md:text-base mb-2">
                    {language === 'zh' && '《提升跨渠道沟通的AI生产力》'}
                    {language === 'en' && 'Enhancing AI Productivity in Cross-Channel Communication'}
                    {language === 'jp' && '《クロスチャネルコミュニケーションのAI生産性向上》'}
                    {language === 'hk' && '《提升跨渠道溝通的AI生產力》'}
                  </h3>
                </div>
                </a>
                )
              })()}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

