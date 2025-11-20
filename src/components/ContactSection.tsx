import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n.js'
import { getTranslations } from '../i18n/translations.js'

interface ContactSectionProps {
  language?: Language
}

export const ContactSection: FC<ContactSectionProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)

  return (
    <section id="contact" class="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] overflow-hidden">
      {/* Decorative elements */}
      <div class="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      
      <div class="site-container px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6">
            {trans.contact.title}
          </h2>
          <p class="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
            {trans.contact.subtitle}
          </p>
          
          {/* Email Only */}
          <div class="flex justify-center items-center">
            <a 
              href="mailto:marketing@zenava.ai" 
              class="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-[#6438FF] rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg min-h-[44px]"
            >
              <i class="fas fa-envelope mr-2 md:mr-3"></i>
              marketing@zenava.ai
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

