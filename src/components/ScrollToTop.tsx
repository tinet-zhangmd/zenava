import { FC } from 'hono/jsx'

export const ScrollToTop: FC = () => {
  return (
    <>
      {/* Scroll to Top Button - Only visible on desktop */}
      <div 
        id="scroll-to-top"
        class="hidden md:flex fixed bottom-8 right-8 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg cursor-pointer items-center justify-center transition-all duration-300 opacity-0 pointer-events-none"
        onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
        title="Back to top"
      >
        <i class="fas fa-chevron-up text-lg"></i>
      </div>

      {/* JavaScript for scroll behavior */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Scroll to Top Button functionality
          document.addEventListener('DOMContentLoaded', function() {
            const scrollButton = document.getElementById('scroll-to-top');
            if (!scrollButton) return;

            // Show/hide button based on scroll position
            function toggleScrollButton() {
              if (window.pageYOffset > 300) {
                scrollButton.classList.remove('opacity-0', 'pointer-events-none');
                scrollButton.classList.add('opacity-100', 'pointer-events-auto');
              } else {
                scrollButton.classList.add('opacity-0', 'pointer-events-none');
                scrollButton.classList.remove('opacity-100', 'pointer-events-auto');
              }
            }

            // Listen to scroll events
            window.addEventListener('scroll', toggleScrollButton);
            
            // Check initial position
            toggleScrollButton();
          });
        `
      }} />
    </>
  )
}