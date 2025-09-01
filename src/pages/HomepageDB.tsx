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
  
  // Parse module content safely (handle double-encoded JSON)
  const getModuleContent = (module: any) => {
    try {
      if (typeof module.content !== 'string') {
        return module.content || {};
      }
      
      // Try to parse once
      let parsed = JSON.parse(module.content);
      
      // If result is still a string, it might be double-encoded
      if (typeof parsed === 'string') {
        try {
          parsed = JSON.parse(parsed);
        } catch {
          // If second parse fails, return the first parse result
        }
      }
      
      return parsed;
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

        <div class="site-container px-6 relative z-10">
          <div class="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
  <div class="space-y-6">
    <div class="text-2xl sm:text-3xl font-bold text-white tracking-wide">Zenava</div>
    <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
      AI Agent for Enterprise Customer Dialogue Scenarios
    </h1>
    <p class="text-lg sm:text-xl text-gray-300">讓每一次客戶對話都創造實際價值</p>
    <a href="#contact" class="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-2xl text-white font-bold shadow-lg hover:shadow-[#6438FF]/30 hover:scale-105 transition-all w-max text-sm sm:text-base">
      Get Started
      <svg class="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
    </a>
  </div>
  <div class="relative lg:h-[600px] flex items-center justify-center">
    <div class="relative w-full max-w-md">
      <div class="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-xl flex items-center justify-center">
              <i class="fas fa-robot text-white"></i>
            </div>
            <div>
              <div class="text-white font-semibold">Zenava AI</div>
              <div class="text-[#0DE0EF] text-sm">Online</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-[#0DE0EF] rounded-full animate-pulse"></div>
            <span class="text-xs text-gray-300">Live</span>
          </div>
        </div>

        <div class="space-y-4 mb-4" id="ai-sim">
          <div class="flex justify-end ai-step ai-step-1">
            <div class="bg-gradient-to-r from-[#6438FF] to-[#8B5CF6] text-white px-4 py-3 rounded-2xl rounded-br-sm max-w-xs">
              <p class="text-sm">您好，我的订单 #A12345 想查询一下物流</p>
            </div>
          </div>
          <div class="flex justify-start ai-step ai-step-2 opacity-0" style="animation: fadeIn .6s ease forwards; animation-delay: .8s;">
            <div class="bg-white/10 text-white px-4 py-3 rounded-2xl rounded-bl-sm max-w-xs border border-white/20">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-4 h-4 bg-gradient-to-r from-[#0DE0EF] to-[#6438FF] rounded-full"></div>
                <span class="text-xs text-[#0DE0EF]">正在識別問題...</span>
              </div>
              <p class="text-sm">為您定位訂單資訊中...</p>
            </div>
          </div>
          <div class="flex justify-start ai-step ai-step-3 opacity-0" style="animation: fadeIn .6s ease forwards; animation-delay: 1.8s;">
            <div class="bg-white/10 text-white px-4 py-3 rounded-2xl rounded-bl-sm max-w-xs border border-white/20">
              <p class="text-sm">已找到訂單，包裹已出庫，預計 24 小時內送達。需要我發送追蹤連結嗎？</p>
            </div>
          </div>
          <div class="flex justify-end ai-step ai-step-4 opacity-0" style="animation: fadeIn .6s ease forwards; animation-delay: 2.8s;">
            <div class="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-3 rounded-2xl rounded-br-sm max-w-xs">
              <p class="text-sm">好的，謝謝！請發我追蹤連結 👍</p>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <div class="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3">
            <input type="text" placeholder="輸入訊息..." class="w-full bg-transparent text-white placeholder-gray-400 text-sm outline-none" />
          </div>
          <button class="w-12 h-12 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-xl flex items-center justify-center hover:scale-105 transition-transform">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </div>
      </div>

      <div class="absolute -top-4 -right-8 w-32 p-3 bg-gradient-to-r from-[#6438FF]/90 to-[#8B5CF6]/90 backdrop-blur-xl rounded-xl border border-white/20 animate-float">
        <div class="flex items-center space-x-2 mb-1">
          <div class="w-4 h-4 bg-[#0DE0EF] rounded-full"></div>
          <span class="text-white text-xs font-semibold">Response</span>
        </div>
        <div class="text-white text-lg font-black">&lt; 100ms</div>
      </div>

      <div class="absolute -bottom-4 -left-8 w-36 p-3 bg-gradient-to-r from-[#0DE0EF]/90 to-[#6438FF]/90 backdrop-blur-xl rounded-xl border border-white/20 animate-float-delayed">
        <div class="flex items-center space-x-2 mb-1">
          <div class="w-4 h-4 bg-white rounded-full"></div>
          <span class="text-white text-xs font-semibold">Satisfaction</span>
        </div>
        <div class="text-white text-lg font-black">98.7%</div>
      </div>
    </div>
  </div>
</div>

<div class="site-container max-w-5xl mx-auto text-center hidden">
            
            {/* AI Badge */}
            <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#6438FF]/20 to-[#0DE0EF]/20 backdrop-blur-sm rounded-full border border-[#6438FF]/30 shadow-lg mb-8">
              <div class="relative mr-3">
                <div class="w-3 h-3 bg-[#0DE0EF] rounded-full animate-pulse"></div>
                <div class="absolute inset-0 w-3 h-3 bg-[#0DE0EF] rounded-full animate-ping"></div>
              </div>
              <span class="text-white/90 text-sm font-semibold tracking-wide">ZENAVA</span>
            </div>

            {/* Brand Title */}
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span class="block text-white mb-2">AI Agent for Enterprise</span>
              <span class="block bg-gradient-to-r from-[#6438FF] via-[#8B5CF6] to-[#0DE0EF] bg-clip-text text-transparent">
                Customer Dialogue Scenarios
              </span>
            </h1>
            
            {/* Subtitle with Brand Accent */}
            <div class="flex items-center justify-center space-x-4 mb-6">
              <div class="w-20 h-1 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-full"></div>
              <p class="text-xl md:text-2xl text-gray-300 font-light px-4">
                构建新型生产力形态
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
                <div class="text-3xl lg:text-4xl font-black text-white mb-1">5000+</div>
                <div class="text-sm text-gray-400 font-medium">Enterprises</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zenava Business Value Section - Matching Marketing Solutions Style */}
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Zenava 能为企业带来什么
            </h2>
            <p class="text-xl text-gray-600">
              构建AI驱动的未来组织形态，提升协同效率、重塑客户体验，并以客户联络数据驱动企业核心竞争力跃迁
            </p>
          </div>

          <div class="space-y-16">
            {/* Marketing Business - Solution 1 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-bullhorn text-purple-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">企业营销业务</h3>
                </div>
                <h4 class="text-lg font-semibold text-purple-600 mb-4">
                  提升转化率，降低获客成本
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  Zenava 实时识别客户意图，统一话术留资，智能分配高潜线索；基于会话分析反哺营销策略；自动激活沉默客户，提升二次转化；打通多渠道数据，驱动精准触达。
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>意图识别</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>智能留资</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>多渠道整合</span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">营销转化提升数据</h4>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">平均获客成本降低</p>
                      <p class="text-2xl font-bold text-purple-600">43%</p>
                    </div>
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-arrow-down text-purple-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">线索转化率提升</p>
                      <p class="text-2xl font-bold text-green-600">65%</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-arrow-up text-green-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">客户响应时间</p>
                      <p class="text-2xl font-bold text-blue-600">&lt;30秒</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-bolt text-blue-600"></i>
                    </div>
                  </div>
                  
                  <div class="border-t pt-4">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-600">智能营销覆盖渠道</span>
                      <span class="text-sm font-bold text-gray-900">10+</span>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-sm text-gray-600">日均处理咨询量</span>
                      <span class="text-sm font-bold text-gray-900">50,000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Business - Solution 2 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                  <div class="space-y-4">
                  <h4 class="font-bold text-gray-900 mb-4">销售赋能流程</h4>
                  
                  <div class="space-y-3">
                    <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                      <div class="flex-1">
                        <p class="font-medium">实时话术推荐</p>
                        <p class="text-sm text-gray-600">根据客户关注点推荐最佳话术</p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-blue-600">实时</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-green-50 rounded-lg">
                      <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                      <div class="flex-1">
                        <p class="font-medium">知识库调用</p>
                        <p class="text-sm text-gray-600">产品、竞品、案例即时调取</p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-green-600">秒级</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                      <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                      <div class="flex-1">
                        <p class="font-medium">智能成交辅助</p>
                        <p class="text-sm text-gray-600">成交率提升45%</p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-purple-600">+45%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-chart-line text-blue-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">企业销售业务</h3>
                </div>
                <h4 class="text-lg font-semibold text-blue-600 mb-4">
                  拉高销售中位线，提升转化能力
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  识别客户问题，推荐话术，规范销售动作；自动应对客户挑战，调取产品与竞品知识；提炼高转化话术与失败原因，形成可复制方法论；结合客户行为智能推荐产品，辅助成交。
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>话术推荐</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>竞品分析</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>智能成交</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Service Business - Solution 3 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-headset text-orange-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">客户服务业务</h3>
                </div>
                <h4 class="text-lg font-semibold text-orange-600 mb-4">
                  让服务更快、更准、更有温度
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  全天候响应常见咨询，复杂问题智能分流；识别客户情绪并动态调整应对策略；联动知识库与工单系统，快速定位与处理问题；持续分析服务盲区，实现话术与流程优化。
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>24/7响应</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>情绪识别</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>智能工单</span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">智能工单处理流程</h4>
                
                <div class="space-y-4">
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <p class="font-medium text-gray-900">AI定位问题</p>
                      <p class="text-sm text-gray-600">智能分析客户问题类型和紧急程度</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <p class="font-medium text-gray-900">知识库调用</p>
                      <p class="text-sm text-gray-600">匹配最佳解决方案和历史案例</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <p class="font-medium text-gray-900">智能派单</p>
                      <p class="text-sm text-gray-600">根据技能和负载自动分配专员</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                    <div>
                      <p class="font-medium text-gray-900">处理闭环</p>
                      <p class="text-sm text-gray-600">跟踪处理进度，确保服务质量</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Store/Dealer Operations - Solution 4 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                  <div class="space-y-6">
                  <h4 class="font-bold text-gray-900 mb-4">运营效率提升</h4>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-store text-green-600 text-2xl"></i>
                        <span class="text-2xl font-bold text-green-600">500+</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">门店接入</p>
                    </div>
                    
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-tasks text-blue-600 text-2xl"></i>
                        <span class="text-2xl font-bold text-blue-600">10K+</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">日均处理</p>
                    </div>
                    
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-clock text-purple-600 text-2xl"></i>
                        <span class="text-lg font-bold text-purple-600">2小时</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">平均响应</p>
                    </div>
                    
                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-chart-line text-orange-600 text-2xl"></i>
                        <span class="text-lg font-bold text-orange-600">85%</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">派单效率</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-network-wired text-indigo-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">门店/经销商运营</h3>
                </div>
                <h4 class="text-lg font-semibold text-indigo-600 mb-4">
                  多级、大规模组织的高效运营中枢
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  统一服务入口，集中处理设备、库存、培训等事务；智能派单与进度追踪，提高流转效率；识别高频问题并推送知识，减轻总部负担；通过运营数据分析优化资源与标准。
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>统一入口</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>智能派单</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>数据分析</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Design & Optimization */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="grid lg:grid-cols-2 gap-0">
                <div class="p-10 lg:p-12">
                  <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#6438FF]/10 to-[#0DE0EF]/10 rounded-full mb-6">
                    <i class="fas fa-pencil-ruler text-[#6438FF] mr-2"></i>
                    <span class="text-[#6438FF] font-semibold">产品设计与优化</span>
                  </div>
                  <h3 class="text-3xl font-bold text-[#000D25] mb-4">
                    让客户声音成为产品迭代方向
                  </h3>
                  <p class="text-gray-600 leading-relaxed mb-6">
                    从海量对话中自动提取产品痛点与功能建议；量化负面反馈趋势，预警产品问题；形成"客户声音→产品迭代"的闭环；基于真实需求驱动产品创新。
                  </p>
                  <div class="flex flex-wrap gap-3">
                    <span class="px-3 py-1 bg-[#6438FF]/10 text-[#6438FF] rounded-full text-sm font-medium">痛点识别</span>
                    <span class="px-3 py-1 bg-[#0DE0EF]/10 text-[#0DE0EF] rounded-full text-sm font-medium">需求提取</span>
                    <span class="px-3 py-1 bg-[#6438FF]/10 text-[#6438FF] rounded-full text-sm font-medium">迭代闭环</span>
                  </div>
                </div>
                <div class="bg-gradient-to-br from-[#6438FF]/5 to-[#0DE0EF]/5 p-10 lg:p-12 flex items-center justify-center">
                  <div class="w-full max-w-md">
                    <img src="/static/product-illustration.svg" alt="Product Optimization" class="w-full h-auto" onerror="this.style.display='none'" />
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                      <div class="text-center text-sm text-gray-500 mb-4">客户反馈分析</div>
                      <div class="space-y-3">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center space-x-2">
                            <span class="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">痛点</span>
                            <span class="text-sm text-gray-700">加载速度慢</span>
                          </div>
                          <span class="text-sm font-bold text-gray-900">342次</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <div class="flex items-center space-x-2">
                            <span class="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full font-medium">建议</span>
                            <span class="text-sm text-gray-700">增加批量操作</span>
                          </div>
                          <span class="text-sm font-bold text-gray-900">256次</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <div class="flex items-center space-x-2">
                            <span class="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">已修复</span>
                            <span class="text-sm text-gray-700">登录问题</span>
                          </div>
                          <span class="text-sm font-bold text-gray-900">✓</span>
                        </div>
                      </div>
                      <div class="mt-4 p-3 bg-[#6438FF]/10 rounded-lg text-center">
                        <div class="text-xs text-gray-600">本月改进建议采纳率</div>
                        <div class="text-2xl font-bold text-[#6438FF]">78%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand & Sentiment Management */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="grid lg:grid-cols-2 gap-0">
                <div class="order-2 lg:order-1 bg-gradient-to-br from-[#0DE0EF]/5 to-[#6438FF]/5 p-10 lg:p-12 flex items-center justify-center">
                  <div class="w-full max-w-md">
                    <img src="/static/brand-illustration.svg" alt="Brand Management" class="w-full h-auto" onerror="this.style.display='none'" />
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                      <div class="text-center text-sm text-gray-500 mb-4">实时舆情监控</div>
                      <div class="space-y-3">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-exclamation-triangle text-red-600"></i>
                          </div>
                          <div class="flex-1">
                            <div class="text-sm font-medium text-gray-900">负面情绪预警</div>
                            <div class="text-xs text-gray-500">检测到3条高风险对话</div>
                          </div>
                          <span class="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">紧急</span>
                        </div>
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-shield-alt text-yellow-600"></i>
                          </div>
                          <div class="flex-1">
                            <div class="text-sm font-medium text-gray-900">敏感词检测</div>
                            <div class="text-xs text-gray-500">发现2处违规用语</div>
                          </div>
                          <span class="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">处理中</span>
                        </div>
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-chart-line text-green-600"></i>
                          </div>
                          <div class="flex-1">
                            <div class="text-sm font-medium text-gray-900">品牌好感度</div>
                            <div class="text-xs text-gray-500">本周提升12%</div>
                          </div>
                          <span class="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">正常</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order-1 lg:order-2 p-10 lg:p-12">
                  <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0DE0EF]/10 to-[#6438FF]/10 rounded-full mb-6">
                    <i class="fas fa-shield-alt text-[#0DE0EF] mr-2"></i>
                    <span class="text-[#0DE0EF] font-semibold">品牌与舆情管理</span>
                  </div>
                  <h3 class="text-3xl font-bold text-[#000D25] mb-4">
                    实时守护企业品牌安全
                  </h3>
                  <p class="text-gray-600 leading-relaxed mb-6">
                    融合社交与客服数据，智能识别舆情风险；实时预警高风险对话，自动触发应对流程；量化客户情绪，优化沟通策略；自动质检服务用语，保障品牌一致性。
                  </p>
                  <div class="flex flex-wrap gap-3">
                    <span class="px-3 py-1 bg-[#0DE0EF]/10 text-[#0DE0EF] rounded-full text-sm font-medium">风险预警</span>
                    <span class="px-3 py-1 bg-[#6438FF]/10 text-[#6438FF] rounded-full text-sm font-medium">情绪分析</span>
                    <span class="px-3 py-1 bg-[#0DE0EF]/10 text-[#0DE0EF] rounded-full text-sm font-medium">质量管控</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Zenava Brand Style */}
      <section id="features" class="py-20 bg-white">
        <div class="site-container px-6">
          <div class="text-center mb-16">
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
        
        <div class="site-container px-6 relative z-10">
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
              <div class="site-container px-6">
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



      {/* Contact Section */}
      <section id="contact" class="py-20 bg-white">
        <div class="site-container px-6">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">
              联系我们
            </h2>
            
            <div class="text-center">
              <p class="text-xl text-gray-600 mb-8">
                如有任何问题或商务合作，请通过以下方式联系我们
              </p>
              <a 
                href="mailto:marketing@zenava.ai" 
                class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] text-white rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                <i class="fas fa-envelope mr-3"></i>
                marketing@zenava.ai
              </a>
            </div>
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