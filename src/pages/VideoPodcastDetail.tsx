import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'
import { getTranslations } from '../i18n/translations'

interface Category {
  id: number
  name: string
  slug: string
  category_template: string
  description?: string
}

interface Content {
  id: number
  category_id: number
  category_name: string
  category_slug: string
  title: string
  content: string
  author?: string
  cover_image?: string
  published_at: string
  views: number
  downloads: number
  reading_time?: number
  video_file?: string
  video_description?: string
  attachment_file?: string
  attachment_name?: string
  status: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
}

interface VideoPodcastDetailPageProps {
  language?: Language
  content: Content | null
  category: Category | null
  categories?: Category[]
}

export const VideoPodcastDetailPage: FC<VideoPodcastDetailPageProps> = ({ 
  language = 'zh', 
  content,
  category,
  categories = []
}) => {
  const trans = getTranslations(language)
  
  if (!content || !category) {
    return <div class="py-20 text-center">
      <p class="text-xl text-gray-500">
        {language === 'zh' ? '内容不存在' : language === 'en' ? 'Content not found' : language === 'jp' ? 'コンテンツが見つかりません' : '內容不存在'}
      </p>
    </div>
  }
  
  // 根据 category_template 确定内容类型
  const contentType: 'video' | 'podcast' = category.category_template === 'list_video' ? 'video' : 'podcast'
  
  // TODO: 相关推荐从数据库获取
  const relatedItems: any[] = []

  // 构建结构化数据（JSON-LD）用于 SEO
  const structuredData = contentType === 'video' ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": content.title,
    "description": content.meta_description || content.video_description || content.content?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
    "thumbnailUrl": content.cover_image || '',
    "uploadDate": content.published_at,
    "contentUrl": content.video_file || '',
    "author": {
      "@type": "Person",
      "name": content.author || "ZENAVA"
    }
  } : {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": content.title,
    "description": content.meta_description || content.video_description || content.content?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
    "image": content.cover_image || '',
    "datePublished": content.published_at,
    "author": {
      "@type": "Person",
      "name": content.author || "ZENAVA"
    }
  }

  return (
    <>
      {/* SEO 结构化数据 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }} />
      
      {/* Resource Center Sub-Navigation */}
      <section class="bg-[#6438FF] sticky top-0 z-30">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center justify-center space-x-6 md:space-x-8 overflow-x-auto py-4">
            {/* All Resources */}
            <a
              href={language === 'zh' ? '/resources' : `/${language}/resources`}
              class="whitespace-nowrap text-sm md:text-base font-medium text-white transition-all pb-2 relative hover:opacity-80"
            >
              {language === 'zh' ? '所有资源' : language === 'en' ? 'All Resources' : language === 'jp' ? 'すべてのリソース' : '所有資源'}
            </a>
            {/* Category Navigation */}
            {categories.map((cat) => {
              const basePath = language === 'zh' ? '/resources' : `/${language}/resources`
              const catHref = `${basePath}/${cat.slug}`
              const isActive = cat.slug === category.slug
              
              return (
                <a
                  key={cat.id}
                  href={catHref}
                  class={`whitespace-nowrap text-sm md:text-base font-medium text-white transition-all pb-2 relative ${
                    isActive
                      ? 'border-b-2 border-white'
                      : 'hover:opacity-80'
                  }`}
                >
                  {cat.name}
                </a>
              )
            })}
          </nav>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <section class="bg-white border-b border-gray-200">
        <div class="site-container px-4 sm:px-6 lg:px-8 py-4">
          <nav class="flex items-center space-x-2 text-sm">
            <a href={language === 'zh' ? '/' : `/${language}`} class="text-gray-500 hover:text-[#6438FF] transition-colors">
              {language === 'zh' ? '首页' : language === 'en' ? 'Home' : language === 'jp' ? 'ホーム' : '首頁'}
            </a>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <a href={language === 'zh' ? '/resources' : `/${language}/resources`} class="text-gray-500 hover:text-[#6438FF] transition-colors">
              {language === 'zh' ? '资源中心' : language === 'en' ? 'Resource Center' : language === 'jp' ? 'リソースセンター' : '資源中心'}
            </a>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <a href={`${language === 'zh' ? '/resources' : `/${language}/resources`}/${category.slug}`} class="text-gray-500 hover:text-[#6438FF] transition-colors">
              {category.name}
            </a>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <span class="text-gray-900 font-medium line-clamp-1">
              {content.title}
            </span>
          </nav>
        </div>
      </section>

      {/* Main Content Section - Two Column Layout */}
      <section class="bg-white py-8 md:py-12 lg:py-16">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column: Main Content */}
            <div class="lg:col-span-2">
              {/* Title and Author Section */}
              <div class="mb-6 md:mb-8">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight text-center lg:text-left">
                  {content.title}
                </h1>
                
                {/* Author Info */}
                <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-sm md:text-base">
                  {/* Author Info */}
                  {content.author && (
                    <div class="flex items-center space-x-2 md:space-x-3">
                      <span class="font-medium text-gray-700">
                        {language === 'zh' ? '作者：' : language === 'en' ? 'Author: ' : language === 'jp' ? '著者：' : '作者：'}
                        {content.author}
                      </span>
                    </div>
                  )}
                  
                  {/* Date and Stats Info */}
                  <div class="flex flex-wrap items-center gap-2 md:gap-4 text-gray-500">
                    <span>
                      {language === 'zh' ? '发布：' : language === 'en' ? 'Published: ' : language === 'jp' ? '公開：' : '發布：'}
                      {new Date(content.published_at).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN')}
                    </span>
                    {content.reading_time && (
                      <span>
                        <i class="fas fa-clock mr-1"></i>
                        {content.reading_time} min
                      </span>
                    )}
                    <span>
                      <i class="fas fa-eye mr-1"></i>
                      {content.views}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video/Podcast Player Section */}
              <div class="mb-8 md:mb-12">
                {contentType === 'video' && content.video_file ? (
                  <VideoPlayer 
                    videoFile={content.video_file}
                    coverImage={content.cover_image}
                    language={language}
                  />
                ) : (
                  <div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                    <div class="text-center">
                      <i class="fas fa-video text-4xl md:text-5xl text-gray-400 mb-3"></i>
                      <p class="text-sm md:text-base text-gray-500">
                        {language === 'zh' ? '暂无视频' : language === 'en' ? 'No Video' : language === 'jp' ? 'ビデオなし' : '暫無視頻'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Description Section */}
              <div class="resource-content">
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .resource-content {
                      line-height: 1.8;
                      color: #374151;
                    }
                    .resource-content h2 {
                      font-size: 1.875rem;
                      font-weight: 700;
                      color: #111827;
                      margin-top: 2rem;
                      margin-bottom: 1rem;
                    }
                    .resource-content h3 {
                      font-size: 1.5rem;
                      font-weight: 600;
                      color: #1f2937;
                      margin-top: 1.5rem;
                      margin-bottom: 0.75rem;
                    }
                    .resource-content p {
                      margin-bottom: 1.5rem;
                      font-size: 1rem;
                    }
                    .resource-content ul, .resource-content ol {
                      margin-bottom: 1.5rem;
                      padding-left: 1.5rem;
                    }
                    .resource-content li {
                      margin-bottom: 0.75rem;
                    }
                    .resource-content a {
                      color: #6438FF;
                      text-decoration: underline;
                      transition: color 0.2s;
                    }
                    .resource-content a:hover {
                      color: #5a2ee6;
                    }
                    .resource-content img {
                      max-width: 90%;
                      height: auto;
                      margin: 2rem auto;
                      display: block;
                      border-radius: 0.5rem;
                    }
                    @media (max-width: 768px) {
                      .resource-content h2 {
                        font-size: 1.5rem;
                      }
                      .resource-content h3 {
                        font-size: 1.25rem;
                      }
                      .resource-content img {
                        max-width: 100%;
                      }
                    }
                  `
                }} />
                <div 
                  dangerouslySetInnerHTML={{ __html: content.content || '' }}
                />
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div class="lg:col-span-1 space-y-6 md:space-y-8">
              {/* Video Description Section (Black Card) */}
              <div class="bg-black rounded-xl p-6 md:p-8 text-white">
                <h3 class="text-xl md:text-2xl font-bold mb-4 whitespace-pre-line">
                  {content.video_description || (
                    language === 'zh' ? '上传、编辑和分享您的视频 - 不允许广告' : language === 'en' ? 'Upload, edit, and share your videos - no ads allowed' : language === 'jp' ? '動画をアップロード、編集、共有 - 広告なし' : '上傳、編輯和分享您的視頻 - 不允許廣告'
                  )}
                </h3>
                <p class="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
                  {!content.video_description && (
                    language === 'zh' ? '无论您的经验如何，都可以轻松上传、创建或录制视频。然后快速编辑并按您想要的方式分享它们。' : language === 'en' ? 'Easily upload, create, or record videos, regardless of your experience. Then quickly edit and share them exactly how you want.' : language === 'jp' ? '経験に関係なく、簡単に動画をアップロード、作成、または録画できます。次に、迅速に編集して、希望どおりに共有します。' : '無論您的經驗如何，都可以輕鬆上傳、創建或錄製視頻。然後快速編輯並按您想要的方式分享它們。'
                  )}
                </p>
                
                {/* Social Icons - Optional, can be removed if not needed */}
                <div class="flex items-center space-x-4 mb-6">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#00D9FF] transition-colors" aria-label="Twitter">
                    <i class="fab fa-twitter text-xl md:text-2xl"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#00D9FF] transition-colors" aria-label="LinkedIn">
                    <i class="fab fa-linkedin text-xl md:text-2xl"></i>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#00D9FF] transition-colors" aria-label="YouTube">
                    <i class="fab fa-youtube text-xl md:text-2xl"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#00D9FF] transition-colors" aria-label="Instagram">
                    <i class="fab fa-instagram text-xl md:text-2xl"></i>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#00D9FF] transition-colors" aria-label="TikTok">
                    <i class="fab fa-tiktok text-xl md:text-2xl"></i>
                  </a>
                </div>
                
                {/* Contact Button */}
                <a
                  href={language === 'zh' ? '/contact' : `/${language}/contact`}
                  class="inline-flex items-center justify-center w-full px-6 py-3 bg-[#00D9FF] text-white rounded-lg font-semibold hover:bg-[#00C5E6] transition-all transform hover:scale-105"
                >
                  {language === 'zh' ? '联系我们' : language === 'en' ? 'Contact Us' : language === 'jp' ? 'お問い合わせ' : '聯繫我們'}
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>

              {/* Help Section */}
              <div class="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-[#6438FF]/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-question-circle text-3xl text-[#6438FF]"></i>
                </div>
                <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-4">
                  {language === 'zh' ? '需要帮助？' : language === 'en' ? 'Need Help?' : language === 'jp' ? 'ヘルプが必要ですか？' : '需要幫助？'}
                </h3>
                <p class="text-gray-600 mb-6 text-sm md:text-base">
                  {language === 'zh' ? '我们的支持团队随时为您提供帮助' : language === 'en' ? 'Our support team is ready to help you' : language === 'jp' ? '私たちのサポートチームがお手伝いします' : '我們的支持團隊隨時為您提供幫助'}
                </p>
                <a
                  href={language === 'zh' ? '/contact' : `/${language}/contact`}
                  class="inline-flex items-center justify-center w-full px-6 py-3 bg-[#6438FF] text-white rounded-lg font-semibold hover:bg-[#5a2ee6] transition-all transform hover:scale-105"
                >
                  {language === 'zh' ? '获取支持' : language === 'en' ? 'Get Support' : language === 'jp' ? 'サポートを受ける' : '獲取支持'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Recommendations Section */}
      {relatedItems && relatedItems.length > 0 && (
        <section class="bg-gray-50 py-12 md:py-16 lg:py-20">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12">
              {language === 'zh' ? '相关推荐' : language === 'en' ? 'Related Recommendations' : language === 'jp' ? '関連おすすめ' : '相關推薦'}
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedItems.map((item: any, index: number) => (
                <a
                  key={index}
                  href={item.link || '#'}
                  class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden block group"
                >
                  {/* Cover Image with Play Icon */}
                  <div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
                    <img 
                      src={item.image || `/assets/images/resources/related-${index + 1}.jpg`}
                      alt={item.title || 'Related content'}
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                    />
                    {/* Placeholder */}
                    <div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0">
                      <div class="text-center">
                        <i class="fas fa-image text-2xl md:text-3xl text-gray-400 mb-2"></i>
                        <p class="text-xs md:text-sm text-gray-500">
                          {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                        </p>
                      </div>
                    </div>
                    {/* Play Icon Overlay */}
                    <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all">
                      <div class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <i class="fas fa-play text-[#6438FF] text-lg md:text-xl ml-1"></i>
                      </div>
                    </div>
                    {/* Category Badge */}
                    {item.category && (
                      <div class="absolute top-2 left-2">
                        <span class="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-700">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Card Content */}
                  <div class="p-4 md:p-6">
                    <h3 class="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#6438FF] transition-colors">
                      {item.title || 'Related Content Title'}
                    </h3>
                    {item.date && (
                      <p class="text-xs md:text-sm text-gray-500">
                        {item.date}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Player Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Handle video play button click
            window.handlePlayVideo = function() {
              const videoPlayer = document.getElementById('video-player');
              const playButton = document.getElementById('play-button');
              const errorMessage = document.getElementById('error-message');
              
              if (videoPlayer) {
                // Show video player
                videoPlayer.classList.remove('hidden');
                videoPlayer.classList.add('relative', 'z-20');
                
                // Hide play button
                if (playButton) {
                  playButton.style.display = 'none';
                }
                
                // Try to play video
                try {
                  const playPromise = videoPlayer.play();
                  
                  if (playPromise !== undefined) {
                    playPromise.catch(function(error) {
                      console.error('Video play error:', error);
                      if (errorMessage) {
                        errorMessage.classList.remove('hidden');
                      }
                      // Show play button again on error
                      if (playButton) {
                        playButton.style.display = 'flex';
                      }
                      videoPlayer.classList.add('hidden');
                    });
                  }
                } catch (error) {
                  console.error('Video play error:', error);
                  if (errorMessage) {
                    errorMessage.classList.remove('hidden');
                  }
                  // Show play button again on error
                  if (playButton) {
                    playButton.style.display = 'flex';
                  }
                  videoPlayer.classList.add('hidden');
                }
              }
            };
            
            // Handle video error
            const videoPlayer = document.getElementById('video-player');
            if (videoPlayer) {
              videoPlayer.addEventListener('error', function() {
                const errorMessage = document.getElementById('error-message');
                if (errorMessage) {
                  errorMessage.classList.remove('hidden');
                }
              });
            }
            
            // Handle podcast player error
            const podcastPlayer = document.getElementById('podcast-player');
            if (podcastPlayer) {
              podcastPlayer.addEventListener('error', function() {
                console.error('Podcast playback error');
                // Show error message if needed
              });
            }
          })();
        `
      }} />
    </>
  )
}

// Video Player Component
const VideoPlayer: FC<{ videoFile?: string; coverImage?: string; language: Language }> = ({ videoFile, coverImage, language }) => {
  return (
    <div class="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      {videoFile ? (
        // HTML5 Video Player
        <video
          id="video-player"
          class="w-full h-full"
          controls
          preload="metadata"
          poster={coverImage || ''}
        >
          <source src={videoFile} type="video/mp4" />
          {language === 'zh' ? '您的浏览器不支持视频播放。' : language === 'en' ? 'Your browser does not support video playback.' : language === 'jp' ? 'お使いのブラウザは動画再生をサポートしていません。' : '您的瀏覽器不支持視頻播放。'}
        </video>
      ) : (
        // Placeholder
        <div class="relative w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
          {coverImage ? (
            <img 
              src={coverImage}
              alt="Video Cover"
              class="w-full h-full object-cover absolute inset-0"
              onerror="this.style.display='none';"
            />
          ) : (
            <div class="w-full h-full flex items-center justify-center">
              <div class="text-center">
                <i class="fas fa-video text-4xl md:text-5xl text-gray-400 mb-3"></i>
                <p class="text-sm md:text-base text-gray-500">
                  {language === 'zh' ? '暂无视频' : language === 'en' ? 'No Video' : language === 'jp' ? 'ビデオなし' : '暫無視頻'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Podcast Player Component
const PodcastPlayer: FC<{ podcastData: any; language: Language }> = ({ podcastData, language }) => {
  return (
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Cover Image */}
      <div class="aspect-square bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative">
        <img 
          src={podcastData?.coverImage || '/assets/images/resources/podcast-cover.jpg'}
          alt="Podcast Cover"
          class="w-full h-full object-cover"
          loading="eager"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        {/* Placeholder */}
        <div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0">
          <div class="text-center">
            <i class="fas fa-microphone text-4xl md:text-5xl text-gray-400 mb-3"></i>
            <p class="text-sm md:text-base text-gray-500">
              {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Audio Player Controls */}
      <div class="p-4 md:p-6 bg-gray-50">
        <audio
          id="podcast-player"
          class="w-full"
          controls
          preload="metadata"
        >
          <source src={podcastData?.audioUrl || ''} type="audio/mpeg" />
          <source src={podcastData?.audioUrl || ''} type="audio/mp3" />
          {language === 'zh' ? '您的浏览器不支持音频播放。' : language === 'en' ? 'Your browser does not support audio playback.' : language === 'jp' ? 'お使いのブラウザは音声再生をサポートしていません。' : '您的瀏覽器不支持音頻播放。'}
        </audio>
      </div>
    </div>
  )
}


