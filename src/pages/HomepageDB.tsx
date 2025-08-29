import { FC, JSX } from 'hono/jsx'
import { Language, getTranslation } from '../utils/i18n'

interface HomepageProps {
  language: Language
  pageData?: any
  modules?: any[]
  settings?: Record<string, string>
}

export const HomepageDB: FC<HomepageProps> = ({ language = 'en', pageData, modules = [], settings = {} }) => {
  const t = getTranslation(language)
  
  // Parse module content safely
  const getModuleContent = (module: any) => {
    try {
      return typeof module.content === 'string' ? JSON.parse(module.content) : module.content;
    } catch {
      return {};
    }
  };

  // Find specific module by name
  const findModule = (moduleName: string) => {
    const module = modules.find(m => m.module_name === moduleName);
    return module ? getModuleContent(module) : null;
  };

  // Get hero content
  const heroContent = findModule('main_hero') || {
    title: t?.hero?.title || 'AI Agent for Enterprise Customer Dialogue',
    subtitle: t?.hero?.subtitle || 'Transform your customer service with intelligent AI agents',
    cta_text: t?.hero?.cta_primary || 'Get Started',
    cta_link: '#contact',
    background_image: '/static/hero-bg.jpg'
  };

  // Get features content
  const featuresContent = findModule('key_features') || {
    title: t?.features?.title || 'What Zenava Brings to Your Organization',
    items: [
      { 
        icon: 'fas fa-headset', 
        title: 'Smart Customer Service', 
        description: 'AI-powered customer support that delivers human-like interactions with 24/7 availability, reducing response times and improving satisfaction rates across all touchpoints.'
      },
      { 
        icon: 'fas fa-chart-trending-up', 
        title: 'Intelligent Sales & Marketing', 
        description: 'Accelerate deal closure and boost conversion rates with AI assistants that understand customer needs, qualify leads, and provide personalized recommendations at scale.'
      },
      { 
        icon: 'fas fa-cogs', 
        title: 'Operational Excellence', 
        description: 'Streamline internal operations with AI-driven management insights and automated decision support, empowering employees with intelligent internal service capabilities.'
      }
    ]
  };

  // Get statistics content
  const statsContent = findModule('platform_stats') || {
    title: 'Platform Performance',
    stats: [
      { number: '10M+', label: 'Conversations Handled' },
      { number: '99.9%', label: 'Uptime SLA' },
      { number: '500+', label: 'Enterprise Clients' },
      { number: '4.9/5', label: 'Customer Satisfaction' }
    ]
  };

  return (
    <>
      {/* Hero Section - Zenava Brand Style (Lighter) */}
      <section id="hero" class="relative bg-gradient-to-br from-[#1a1f3a] via-[#2a3142] to-[#3a425a] text-white min-h-[100vh] flex items-center overflow-hidden">
        
        {/* Background Elements */}
        <div class="absolute inset-0">
          {/* Grid Pattern */}
          <div class="absolute inset-0 opacity-20">
            <div class="w-full h-full" style="background-image: radial-gradient(circle at 2px 2px, #6438FF 1px, transparent 0); background-size: 40px 40px;"></div>
          </div>
          
          {/* Floating Elements */}
          <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#6438FF]/20 to-[#0DE0EF]/20 rounded-full blur-3xl animate-float"></div>
          <div class="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-[#0DE0EF]/20 to-[#6438FF]/20 rounded-full blur-3xl animate-float-delayed"></div>
          
          {/* Background Image with Brand Overlay */}
          {heroContent.background_image && (
            <div class="absolute inset-0 opacity-10">
              <img src={heroContent.background_image} alt="" class="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div class="container mx-auto px-6 relative z-10">
          <div class="max-w-5xl mx-auto text-center">
            
            {/* AI Badge */}
            <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#6438FF]/20 to-[#0DE0EF]/20 backdrop-blur-sm rounded-full border border-[#6438FF]/30 shadow-lg mb-8">
              <div class="relative mr-3">
                <div class="w-3 h-3 bg-[#0DE0EF] rounded-full animate-pulse"></div>
                <div class="absolute inset-0 w-3 h-3 bg-[#0DE0EF] rounded-full animate-ping"></div>
              </div>
              <span class="text-white/90 text-sm font-semibold tracking-wide">AI-POWERED ENTERPRISE DIALOGUE</span>
            </div>

            {/* Brand Title */}
            <h1 class="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span class="block text-white mb-2">Zenava</span>
              <span class="block bg-gradient-to-r from-[#6438FF] via-[#8B5CF6] to-[#0DE0EF] bg-clip-text text-transparent">
                {heroContent.title || 'AI Platform'}
              </span>
            </h1>
            
            {/* Subtitle with Brand Accent */}
            <div class="flex items-center justify-center space-x-4 mb-6">
              <div class="w-20 h-1 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-full"></div>
              <p class="text-xl md:text-2xl text-gray-300 font-light px-4">
                {heroContent.subtitle || 'Transform Customer Conversations with Intelligent AI'}
              </p>
              <div class="w-20 h-1 bg-gradient-to-r from-[#0DE0EF] to-[#6438FF] rounded-full"></div>
            </div>

            {/* CTA Buttons with Brand Colors - Fixed Alignment */}
            <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href={heroContent.cta_link} class="group relative px-8 py-4 bg-gradient-to-r from-[#6438FF] to-[#8B5CF6] rounded-2xl font-bold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-[#6438FF]/25 hover:scale-105 overflow-hidden min-h-[56px] flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="relative z-10 flex items-center justify-center">
                  <span class="leading-none">{heroContent.cta_text || 'Start Free Trial'}</span>
                  <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </span>
              </a>
              
              <a href="#demo" class="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 min-h-[56px] flex items-center justify-center">
                <div class="w-8 h-8 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-lg flex items-center justify-center mr-3">
                  <i class="fas fa-play text-white text-sm"></i>
                </div>
                <span class="leading-none">{t?.hero?.cta_secondary || 'Watch Demo'}</span>
              </a>
            </div>

            {/* Stats with Brand Colors */}
            <div class="grid grid-cols-3 gap-8">
              <div class="text-center">
                <div class="text-3xl lg:text-4xl font-black text-[#0DE0EF] mb-1">10M+</div>
                <div class="text-sm text-gray-400 font-medium">Conversations</div>
              </div>
              <div class="text-center">
                <div class="text-3xl lg:text-4xl font-black text-[#6438FF] mb-1">99.9%</div>
                <div class="text-sm text-gray-400 font-medium">Uptime</div>
              </div>
              <div class="text-center">
                <div class="text-3xl lg:text-4xl font-black text-white mb-1">500+</div>
                <div class="text-sm text-gray-400 font-medium">Enterprises</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Zenava Brand Style */}
      <section id="features" class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            {/* Section Badge */}
            <div class="inline-flex items-center px-4 py-2 bg-[#6438FF]/10 rounded-full mb-6">
              <span class="text-[#6438FF] text-sm font-bold tracking-wide">AI CAPABILITIES</span>
            </div>
            <h2 class="text-5xl lg:text-6xl font-black text-[#000D25] mb-6 leading-tight">
              {featuresContent.title || 'Intelligent by Design'}
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your organization with AI-powered dialogue solutions that enhance customer experience, 
              accelerate business growth, and optimize operational efficiency across all departments.
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            {featuresContent.items?.map((feature: any, index: number) => {
              const colors = [
                'from-[#6438FF] to-[#8B5CF6]',
                'from-[#0DE0EF] to-[#6438FF]', 
                'from-[#8B5CF6] to-[#0DE0EF]'
              ];
              return (
                <div key={index} class="group relative p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 hover:border-[#6438FF]/20 hover:shadow-2xl hover:shadow-[#6438FF]/10 transition-all duration-500 hover:-translate-y-1">
                  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div class={`w-16 h-16 bg-gradient-to-r ${colors[index % 3]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <i class={`${feature.icon} text-white text-2xl`}></i>
                  </div>
                  
                  <h3 class="text-2xl font-bold text-[#000D25] mb-4">{feature.title}</h3>
                  <p class="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                  
                  <div class="flex items-center text-[#6438FF] font-semibold group-hover:text-[#0DE0EF] transition-colors">
                    <span>Learn More</span>
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section - Zenava Brand Style */}
      <section class="py-20 bg-gradient-to-br from-[#000D25] via-[#1a1f3a] to-[#000D25] text-white relative overflow-hidden">
        <div class="absolute inset-0">
          <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#6438FF]/10 to-[#0DE0EF]/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-[#0DE0EF]/10 to-[#6438FF]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
          <div class="text-center mb-16">
            <div class="inline-flex items-center px-4 py-2 bg-[#6438FF]/20 rounded-full mb-6">
              <span class="text-[#0DE0EF] text-sm font-bold tracking-wide">PLATFORM PERFORMANCE</span>
            </div>
            <h2 class="text-5xl lg:text-6xl font-black mb-6 leading-tight">
              {statsContent.title || 'Built for Scale'}
            </h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by 500+ enterprise companies worldwide for mission-critical customer interactions
            </p>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsContent.stats?.map((stat: any, index: number) => {
              const icons = [
                'fas fa-comments',
                'fas fa-check-circle', 
                'fas fa-building',
                'fas fa-star'
              ];
              const colors = [
                'from-[#6438FF] to-[#8B5CF6]',
                'from-[#0DE0EF] to-[#6438FF]',
                'from-[#8B5CF6] to-[#0DE0EF]',
                'from-[#6438FF] to-[#0DE0EF]'
              ];
              const textColors = ['text-[#0DE0EF]', 'text-white', 'text-[#6438FF]', 'text-white'];
              
              return (
                <div key={index} class="text-center group">
                  <div class={`w-20 h-20 bg-gradient-to-r ${colors[index]} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <i class={`${icons[index]} text-white text-2xl`}></i>
                  </div>
                  <div class={`text-4xl lg:text-5xl font-black ${textColors[index]} mb-2`}>{stat.number}</div>
                  <div class="text-gray-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Render additional dynamic modules */}
      {modules.filter(m => !['main_hero', 'key_features', 'platform_stats'].includes(m.module_name)).map((module, index) => {
        const content = getModuleContent(module);
        
        // Generic module renderer based on module type
        if (module.module_type === 'text_block') {
          return (
            <section key={index} class="py-20 bg-white">
              <div class="container mx-auto px-6">
                <div class="max-w-4xl mx-auto">
                  {content.title && <h2 class="text-4xl font-bold text-gray-900 mb-6">{content.title}</h2>}
                  {content.content && <div class="prose prose-lg" dangerouslySetInnerHTML={{ __html: content.content }}></div>}
                </div>
              </div>
            </section>
          );
        }
        
        if (module.module_type === 'cta') {
          return (
            <section key={index} class="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
              <div class="container mx-auto px-6 text-center">
                {content.title && <h2 class="text-4xl font-bold text-white mb-4">{content.title}</h2>}
                {content.subtitle && <p class="text-xl text-gray-100 mb-8">{content.subtitle}</p>}
                {content.button_text && (
                  <a href={content.button_link || '#'} class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-block">
                    {content.button_text}
                  </a>
                )}
              </div>
            </section>
          );
        }
        
        return null;
      })}

      {/* Testimonials Section */}
      <section id="testimonials" class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">
            {t?.testimonials?.title || 'What Our Clients Say'}
          </h2>
          
          <div class="grid md:grid-cols-3 gap-8">
            {(t?.testimonials?.items || [
              { content: 'Excellent AI platform that transformed our customer service.', author: 'John Smith', role: 'CEO, Tech Corp' },
              { content: 'The best investment we made for our support team.', author: 'Sarah Johnson', role: 'CTO, StartupXYZ' },
              { content: 'Incredible ROI and customer satisfaction improvement.', author: 'Mike Chen', role: 'VP Support, Enterprise Inc' }
            ]).map((testimonial, index) => (
              <div key={index} class="bg-white rounded-xl p-8 shadow-lg">
                <div class="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} class="fas fa-star text-yellow-400"></i>
                  ))}
                </div>
                <p class="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">{testimonial.author}</div>
                    <div class="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">
              {t?.contact?.title || 'Get in Touch'}
            </h2>
            
            <form class="grid md:grid-cols-2 gap-6" id="contact-form">
              <div>
                <label class="block text-gray-700 mb-2" for="name">{t?.contact?.form?.name || 'Name'}</label>
                <input
                  type="text"
                  id="name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label class="block text-gray-700 mb-2" for="email">{t?.contact?.form?.email || 'Email'}</label>
                <input
                  type="email"
                  id="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  required
                />
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-gray-700 mb-2" for="company">{t?.contact?.form?.company || 'Company'}</label>
                <input
                  type="text"
                  id="company"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-gray-700 mb-2" for="message">{t?.contact?.form?.message || 'Message'}</label>
                <textarea
                  id="message"
                  rows="5"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  required
                ></textarea>
              </div>
              
              <div class="md:col-span-2">
                <button
                  type="submit"
                  class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02]"
                >
                  {t?.contact?.form?.submit || 'Send Message'} <i class="fas fa-paper-plane ml-2"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <script dangerouslySetInnerHTML={{__html: `
        // Contact form submission
        document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            message: document.getElementById('message').value,
          };
          
          try {
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
            });
            
            if (response.ok) {
              alert('${language === 'zh' ? '消息已发送成功！' : language === 'jp' ? 'メッセージが送信されました！' : 'Message sent successfully!'}');
              e.target.reset();
            } else {
              alert('${language === 'zh' ? '发送失败，请重试。' : language === 'jp' ? '送信に失敗しました。' : 'Failed to send message. Please try again.'}');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('${language === 'zh' ? '发生错误，请稍后重试。' : language === 'jp' ? 'エラーが発生しました。' : 'An error occurred. Please try again later.'}');
          }
        });
      `}} />

      {/* Zenava Brand Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
          }
          
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-2deg); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-float-delayed {
            animation: float-delayed 6s ease-in-out infinite 2s;
          }
        `
      }} />
    </>
  )
}