import { FC } from 'hono/jsx'

export const MobileScrollToTop: FC = () => {
  return (
    <>
      {/* Mobile Scroll to Top Button - Only visible on mobile devices */}
      <button
        id="mobileScrollToTop"
        class="fixed bottom-6 right-6 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center opacity-0 invisible transition-all duration-300 hover:bg-primary-700 hover:scale-110 z-[100] md:hidden"
        onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
        aria-label="Scroll to top"
      >
        <i class="fas fa-arrow-up text-lg"></i>
      </button>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Mobile Scroll to Top functionality
          (function() {
            const mobileScrollButton = document.getElementById('mobileScrollToTop');
            
            if (!mobileScrollButton) return;
            
            // Check if device is mobile
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
              // Show button when scrolled down more than 200px on mobile
              function handleScroll() {
                if (window.pageYOffset > 200) {
                  mobileScrollButton.classList.remove('opacity-0', 'invisible');
                  mobileScrollButton.classList.add('opacity-100', 'visible');
                } else {
                  mobileScrollButton.classList.add('opacity-0', 'invisible');
                  mobileScrollButton.classList.remove('opacity-100', 'visible');
                }
              }
              
              // Throttle scroll event for better performance
              let ticking = false;
              function scrollThrottle() {
                if (!ticking) {
                  window.requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                  });
                  ticking = true;
                }
              }
              
              window.addEventListener('scroll', scrollThrottle);
              
              // Check initial scroll position
              handleScroll();
            }
          })();
        `
      }} />

      <style dangerouslySetInnerHTML={{
        __html: `
          /* Mobile Scroll to Top Button Styles */
          @media (max-width: 768px) {
            #mobileScrollToTop {
              /* Ensure button is always above other elements on mobile */
              z-index: 100 !important;
              
              /* Adjust position for mobile viewport */
              bottom: 1.5rem !important;
              right: 1.5rem !important;
              
              /* Mobile-optimized size */
              width: 3rem !important;
              height: 3rem !important;
              
              /* Add touch feedback */
              -webkit-tap-highlight-color: transparent;
              touch-action: manipulation;
            }
            
            #mobileScrollToTop.visible {
              opacity: 1 !important;
              visibility: visible !important;
              transform: scale(1) !important;
            }
            
            #mobileScrollToTop.opacity-0 {
              transform: scale(0.8) !important;
            }
            
            /* Active state for mobile touch */
            #mobileScrollToTop:active {
              transform: scale(0.95) !important;
              background-color: var(--primary-700) !important;
            }
            
            /* Ensure icon is centered */
            #mobileScrollToTop i {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            
            /* Adjust for very small screens */
            @media (max-width: 380px) {
              #mobileScrollToTop {
                bottom: 1rem !important;
                right: 1rem !important;
                width: 2.5rem !important;
                height: 2.5rem !important;
              }
              
              #mobileScrollToTop i {
                font-size: 1rem !important;
              }
            }
          }
          
          /* Hide on desktop - desktop has its own scroll button */
          @media (min-width: 769px) {
            #mobileScrollToTop {
              display: none !important;
            }
          }
          
          /* Smooth transitions */
          #mobileScrollToTop {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Primary color variables fallback */
          :root {
            --primary-600: #3b82f6;
            --primary-700: #2563eb;
          }
        `
      }} />
    </>
  )
}