import { FC } from 'hono/jsx'
import { Language } from '../../utils/i18n'
import { getTranslations } from '../../i18n/translations'

interface AiAgentsPageProps {
  language?: Language
}

export const AiAgentsPage: FC<AiAgentsPageProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  const t = trans.products.aiAgents

  return (
    <>
      {/* Hero Section */}
      <section class="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-purple-50 to-white">
        <div class="site-container">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div class="space-y-8">
              <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t.hero.title}
              </h1>
              <p class="text-xl text-gray-600 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div>
                <a 
                  href="/contact" 
                  class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#6366f1] rounded-full hover:bg-[#4f46e5] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {t.hero.button}
                </a>
              </div>
            </div>
            
            {/* Right Image/UI */}
            <div class="relative">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-2 border border-gray-100">
                 {/* Placeholder for AI Agent UI */}
                 <div class="aspect-[4/3] bg-gradient-to-br from-purple-100 to-indigo-50 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas fa-robot text-9xl text-purple-200 opacity-50"></i>
                    </div>
                    {/* Simulated Chat UI */}
                    <div class="absolute right-4 top-1/4 w-2/3 bg-white rounded-lg shadow-lg p-4 space-y-3">
                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <i class="fas fa-robot text-purple-600 text-xs"></i>
                            </div>
                            <div class="bg-gray-100 rounded-lg rounded-tl-none p-3 text-sm text-gray-600 flex-1">
                                Agent chain of thought...
                            </div>
                        </div>
                        <div class="flex items-center space-x-2 text-xs text-gray-400 pl-11">
                            <i class="fas fa-check-circle text-green-500"></i>
                            <span>Search knowledge</span>
                        </div>
                         <div class="flex items-center space-x-2 text-xs text-gray-400 pl-11">
                            <i class="fas fa-check-circle text-green-500"></i>
                            <span>Verify user intent</span>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section class="py-20 bg-gradient-to-b from-white to-blue-50">
        <div class="site-container">
          <div class="text-center mb-16">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">{t.advantages.title}</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <i class="fas fa-comments text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 text-center mb-2">{t.advantages.card1.title}</h3>
              <p class="text-blue-600 font-medium text-center mb-4">{t.advantages.card1.subtitle}</p>
              <p class="text-gray-600 text-center text-sm leading-relaxed">
                {t.advantages.card1.desc}
              </p>
            </div>

            {/* Card 2 */}
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <i class="fas fa-cogs text-purple-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 text-center mb-2">{t.advantages.card2.title}</h3>
              <p class="text-purple-600 font-medium text-center mb-4">{t.advantages.card2.subtitle}</p>
              <p class="text-gray-600 text-center text-sm leading-relaxed">
                {t.advantages.card2.desc}
              </p>
            </div>

            {/* Card 3 */}
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <i class="fas fa-bolt text-green-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 text-center mb-2">{t.advantages.card3.title}</h3>
              <p class="text-green-600 font-medium text-center mb-4">{t.advantages.card3.subtitle}</p>
              <p class="text-gray-600 text-center text-sm leading-relaxed">
                {t.advantages.card3.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Section */}
      <section class="py-20 bg-white">
        <div class="site-container">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <div class="relative rounded-2xl overflow-hidden shadow-xl">
               {/* Placeholder for Voice Image */}
               <div class="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                  <i class="fas fa-phone-volume text-6xl text-gray-400"></i>
                  {/* If real image exists: <img src="/assets/images/voice-demo.png" alt="Voice Demo" class="w-full h-full object-cover" /> */}
               </div>
            </div>
            
            {/* Right Content */}
            <div class="space-y-8">
              <div>
                <span class="text-blue-600 font-semibold tracking-wider uppercase text-sm">Voice</span>
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">{t.features.voice.subtitle}</h2>
              </div>
              
              <ul class="space-y-4">
                {t.features.voice.list.map((item: string) => (
                  <li class="flex items-center space-x-3">
                    <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <i class="fas fa-check text-blue-600 text-xs"></i>
                    </div>
                    <span class="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div>
                <a 
                  href="/products/voice" 
                  class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  {t.features.voice.button}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Messaging Section */}
      <section class="py-20 bg-gray-50">
        <div class="site-container">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div class="space-y-8 order-2 lg:order-1">
              <div>
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">{t.features.messaging.title}</h2>
                <p class="text-xl text-gray-600 mt-2">{t.features.messaging.subtitle}</p>
              </div>
              
              <ul class="space-y-4">
                {t.features.messaging.list.map((item: string) => (
                  <li class="flex items-center space-x-3">
                    <div class="flex-shrink-0 w-2 h-2 rounded-full bg-gray-900"></div>
                    <span class="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div>
                <a 
                  href="/products/messaging" 
                  class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  {t.features.messaging.button}
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div class="relative rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2">
               {/* Placeholder for Messaging Image */}
               <div class="aspect-[4/3] bg-white border border-gray-200 flex items-center justify-center p-8">
                  {/* Simulated Message UI */}
                  <div class="w-full max-w-md space-y-4">
                      <div class="flex items-start space-x-3">
                          <div class="w-8 h-8 rounded-full bg-gray-200"></div>
                          <div class="bg-gray-100 rounded-lg rounded-tl-none p-3 text-sm w-3/4">
                              Wholesale coffee?
                          </div>
                      </div>
                      <div class="flex items-start justify-end space-x-3">
                          <div class="bg-blue-50 rounded-lg rounded-tr-none p-3 text-sm w-3/4 text-right">
                              Yes, we offer wholesale options.
                          </div>
                          <div class="w-8 h-8 rounded-full bg-blue-100"></div>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section class="py-20 bg-[#0B1120]">
        <div class="site-container">
          <div class="text-center mb-16">
            <h2 class="text-3xl lg:text-4xl font-bold text-white">{t.resources.title}</h2>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[t.resources.card1, t.resources.card2, t.resources.card3, t.resources.card4].map((card, index) => (
              <div class="group cursor-pointer">
                <div class="aspect-[4/3] bg-gray-800 rounded-xl mb-4 overflow-hidden relative">
                    {/* Placeholder Image */}
                    <div class={`absolute inset-0 bg-gradient-to-br ${
                        index === 0 ? 'from-blue-500 to-purple-600' :
                        index === 1 ? 'from-green-500 to-teal-600' :
                        index === 2 ? 'from-orange-500 to-red-600' :
                        'from-pink-500 to-rose-600'
                    } opacity-80 group-hover:scale-105 transition-transform duration-500`}></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas fa-file-alt text-white text-4xl opacity-50"></i>
                    </div>
                </div>
                <div class="flex items-center space-x-2 mb-2">
                    <span class="w-1 h-4 bg-blue-500 rounded-full"></span>
                    <span class="text-gray-400 text-sm font-medium">{card.tag}</span>
                </div>
                <h3 class="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">
                    {card.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div class="site-container text-center">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>
          <a 
            href="/contact" 
            class="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-colors shadow-lg"
          >
            {t.cta.button}
          </a>
        </div>
      </section>
    </>
  )
}
