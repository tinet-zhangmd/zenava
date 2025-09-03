import { FC } from 'hono/jsx'

interface TransformationCTAProps {
  language: 'en' | 'jp' | 'hk'
}

export const TransformationCTA: FC<TransformationCTAProps> = ({ language = 'en' }) => {
  const translations = {
    en: {
      title: 'Start Your AI Transformation Journey',
      subtitle: 'Join thousands of enterprises already transforming with Zenava AI',
      email: 'marketing@zenava.ai',
      buttonText: 'Contact Us Today'
    },
    jp: {
      title: 'AI変革の旅を始めましょう',
      subtitle: 'Zenava AIで既に変革している数千の企業に参加しましょう',
      email: 'marketing@zenava.ai',
      buttonText: '今すぐお問い合わせ'
    },
    hk: {
      title: '開始您的AI轉型之旅',
      subtitle: '加入已經與Zenava AI一起轉型的數千家企業',
      email: 'marketing@zenava.ai',
      buttonText: '立即聯繫我們'
    }
  }

  const t = translations[language]

  return (
    <section id="transformation-journey" class="relative py-20 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] overflow-hidden">
      {/* Decorative elements */}
      <div class="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      
      <div class="site-container px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-6" data-animate="fade-in">
            {t.title}
          </h2>
          <p class="text-xl text-white/90 mb-8" data-animate="fade-in">
            {t.subtitle}
          </p>
          
          {/* Email Contact */}
          <div class="flex justify-center items-center" data-animate="slide-up">
            <a 
              href={`mailto:${t.email}`}
              class="inline-flex items-center px-8 py-4 bg-white text-[#6438FF] rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <i class="fas fa-envelope mr-3"></i>
              {t.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}