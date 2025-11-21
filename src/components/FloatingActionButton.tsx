import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'
import { getTranslations } from '../i18n/translations'

interface FloatingActionButtonProps {
  language?: Language
}

export const FloatingActionButton: FC<FloatingActionButtonProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  
  // 根据语言获取文本
  const contactText = language === 'zh' ? '联系我们' : 
                      language === 'en' ? 'Contact Us' :
                      language === 'jp' ? 'お問い合わせ' :
                      '聯繫我們'
  
  const topText = language === 'zh' ? '顶部' :
                  language === 'en' ? 'Top' :
                  language === 'jp' ? 'トップ' :
                  '頂部'

  // 根据语言生成联系表单链接
  const contactLink = language === 'zh' ? '/contact' : `/${language}/contact`

  return (
    <>
      {/* Floating Action Button - 悬浮按钮 */}
      <div 
        id="floating-action-button"
        class="fixed bottom-8 right-8 z-50 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 opacity-0 pointer-events-none"
        style="min-width: 90px;"
      >
        {/* Contact Us Section - 联系我们 */}
        <a 
          href={contactLink}
          class="flex flex-col items-center justify-center px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
        >
          {/* Icon with gradient - 笔/折叠纸样式 */}
          <div class="mb-2">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
            >
              <defs>
                <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#0DE0EF;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#6438FF;stop-opacity:1" />
                </linearGradient>
              </defs>
              {/* 笔/折叠纸图标 */}
              <path 
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
                stroke="url(#contactGradient)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
              <path 
                d="M14 2V8H20" 
                stroke="url(#contactGradient)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
              <path 
                d="M16 13H8" 
                stroke="url(#contactGradient)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
              <path 
                d="M16 17H8" 
                stroke="url(#contactGradient)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
              <path 
                d="M10 9H9H8" 
                stroke="url(#contactGradient)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {/* Text with gradient */}
          <span 
            class="text-xs font-semibold leading-tight"
            style="background: linear-gradient(to right, #0DE0EF, #6438FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
          >
            {contactText}
          </span>
        </a>

        {/* Separator - 分隔线 */}
        <div class="h-px bg-gray-200 mx-3"></div>

        {/* Back to Top Section - 返回顶部 */}
        <button
          id="back-to-top-btn"
          class="flex flex-col items-center justify-center px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer w-full group"
          onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
          aria-label={topText}
        >
          {/* Up arrow icon */}
          <div class="mb-2 text-gray-500 group-hover:text-gray-700 transition-colors">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
            >
              <path 
                d="M18 15L12 9L6 15" 
                stroke="currentColor" 
                stroke-width="2.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {/* Text */}
          <span class="text-xs font-semibold text-gray-500 group-hover:text-gray-700 transition-colors leading-tight">
            {topText}
          </span>
        </button>
      </div>

      {/* JavaScript for scroll behavior */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const floatingButton = document.getElementById('floating-action-button');
            if (!floatingButton) return;

            // Show/hide button based on scroll position
            function toggleFloatingButton() {
              if (window.pageYOffset > 300) {
                floatingButton.classList.remove('opacity-0', 'pointer-events-none');
                floatingButton.classList.add('opacity-100', 'pointer-events-auto');
              } else {
                floatingButton.classList.add('opacity-0', 'pointer-events-none');
                floatingButton.classList.remove('opacity-100', 'pointer-events-auto');
              }
            }

            // Throttle scroll event for better performance
            let ticking = false;
            function scrollThrottle() {
              if (!ticking) {
                window.requestAnimationFrame(function() {
                  toggleFloatingButton();
                  ticking = false;
                });
                ticking = true;
              }
            }

            // Listen to scroll events
            window.addEventListener('scroll', scrollThrottle);
            
            // Check initial position
            toggleFloatingButton();
          })();
        `
      }} />
    </>
  )
}

