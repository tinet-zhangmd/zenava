import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'
import { getTranslations } from '../i18n/translations'

interface FloatingActionButtonProps {
  language?: Language
}

export const FloatingActionButton: FC<FloatingActionButtonProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  
  // 根据语言获取文本
  const chatText = language === 'zh' ? '在线客服' : 
                   language === 'en' ? 'Live Chat' :
                   language === 'jp' ? 'オンラインサポート' :
                   '在線客服'
  
  const contactText = language === 'zh' ? '联系我们' : 
                      language === 'en' ? 'Contact Us' :
                      language === 'jp' ? 'お問い合わせ' :
                      '聯繫我們'
  
  const topText = language === 'zh' ? '顶部' :
                  language === 'en' ? 'Top' :
                  language === 'jp' ? 'トップ' :
                  '頂部'
  
  // 在线客服链接
  const chatLink = 'https://webchat-bj.clink.cn/chat.html?accessId=98cecda1-4a5a-42f0-b5aa-220039ffb435'

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
        {/* Live Chat Section - 在线客服 */}
        <a 
          href={chatLink}
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center justify-center px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
        >
          {/* Chat icon with gradient - 聊天图标 */}
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
                <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#06B6D4;stop-opacity:1" />
                </linearGradient>
              </defs>
              {/* 聊天气泡图标 */}
              <path 
                d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" 
                stroke="url(#chatGradient)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
              <path 
                d="M8 11H8.01" 
                stroke="url(#chatGradient)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
              <path 
                d="M12 11H12.01" 
                stroke="url(#chatGradient)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
              <path 
                d="M16 11H16.01" 
                stroke="url(#chatGradient)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {/* Text with gradient */}
          <span 
            class="text-xs font-semibold leading-tight"
            style="background: linear-gradient(135deg, #10B981, #06B6D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
          >
            {chatText}
          </span>
        </a>

        {/* Separator - 分隔线 */}
        <div class="h-px bg-gray-200 mx-3"></div>

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
                <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
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
            style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
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

