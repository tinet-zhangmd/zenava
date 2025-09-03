import { FC, JSX } from 'hono/jsx'
import { Language, getTranslation } from '../utils/i18n.js'
import { getTranslations, t } from '../i18n/translations.js'

interface HomepageProps {
  language: Language
  pageData?: any
  modules?: any[]
  settings?: Record<string, string>
}

export const HomepageDB: FC<HomepageProps> = ({ language = 'en', pageData, modules = [], settings = {} }) => {
  const oldT = getTranslation(language)
  const trans = getTranslations(language)
  
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



  // Get statistics content
  const statsContent = findModule('platform_stats') || {
    title: trans.stats?.title || 'Platform Performance',
    stats: [
      { number: '99.9%', label: trans.stats?.uptime || 'Uptime SLA' },
      { number: '5000+', label: trans.stats?.enterprises || 'Enterprise Clients' },
      { number: '4.9/5', label: trans.stats?.satisfaction || 'Customer Satisfaction' }
    ]
  };

  return (
    <>
      {/* Hero Section - Zenava Brand Style (Lighter) */}
      <section id="hero" class="relative bg-gradient-to-br from-white via-[#f0ebff] to-[#5E3AFC] text-white min-h-[100vh] flex items-center overflow-hidden">
        
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
    <div class="text-2xl sm:text-3xl font-bold text-gray-800 tracking-wide">{trans.company.name}</div>
    <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
      {trans.hero.title}
    </h1>
    <p class="text-lg sm:text-xl text-gray-700 leading-relaxed">
      {trans.hero.subtitle}
    </p>
  </div>
  <div class="relative lg:h-[600px] flex items-center justify-center">
    <div class="relative w-full max-w-md">
      <div class="rounded-3xl p-6 shadow-2xl bg-white/95 backdrop-blur-sm border-2 border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-3">
            <div>
              <div class="font-semibold text-[#5E3AFC]">{trans.aiSimulation.aiAssistant}</div>
              <div class="text-[#0DE0EF] text-sm">{trans.aiSimulation.status}</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-[#0DE0EF] rounded-full animate-pulse"></div>
            <span class="text-xs text-gray-600">{trans.aiSimulation.live}</span>
          </div>
        </div>

        <div class="space-y-4 mb-4" id="ai-sim">
          <div class="flex justify-end ai-step ai-step-1">
            <div class="text-white px-4 py-3 rounded-2xl rounded-br-sm max-w-xs bg-[#11B98F] shadow-md">
              <p class="text-sm">{trans.aiSimulation.customerQuery}</p>
            </div>
          </div>
          <div class="flex justify-start ai-step ai-step-2 opacity-0" style="animation: fadeIn .6s ease forwards; animation-delay: .8s;">
            <div class="text-white px-4 py-3 rounded-2xl rounded-bl-sm max-w-xs bg-[#5E3AFC] shadow-md">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-4 h-4 bg-white/30 rounded-full"></div>
                <span class="text-xs text-white/80">{trans.aiSimulation.aiProcessing}</span>
              </div>
              <p class="text-sm">{trans.aiSimulation.aiLocating}</p>
            </div>
          </div>
          <div class="flex justify-start ai-step ai-step-3 opacity-0" style="animation: fadeIn .6s ease forwards; animation-delay: 1.8s;">
            <div class="text-white px-4 py-3 rounded-2xl rounded-bl-sm max-w-xs bg-[#5E3AFC] shadow-md">
              <p class="text-sm">{trans.aiSimulation.aiResponse}</p>
            </div>
          </div>
          <div class="flex justify-end ai-step ai-step-4 opacity-0" style="animation: fadeIn .6s ease forwards; animation-delay: 2.8s;">
            <div class="text-white px-4 py-3 rounded-2xl rounded-br-sm max-w-xs bg-[#11B98F] shadow-md">
              <p class="text-sm">{trans.aiSimulation.customerReply}</p>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <div class="flex-1 rounded-xl px-4 py-3 bg-gray-100 border border-gray-300">
            <input type="text" placeholder={trans.aiSimulation.inputPlaceholder} class="w-full bg-transparent text-gray-700 placeholder-gray-500 text-sm outline-none" />
          </div>
          <button class="w-12 h-12 bg-[#5E3AFC] hover:bg-[#4f2fd9] rounded-xl flex items-center justify-center transition-colors shadow-md">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </div>
      </div>

      <div class="absolute -top-4 -right-8 w-32 p-3 bg-gradient-to-r from-[#6438FF]/90 to-[#8B5CF6]/90 backdrop-blur-xl rounded-xl border border-white/20 animate-float">
        <div class="flex items-center space-x-2 mb-1">
          <div class="w-4 h-4 bg-[#0DE0EF] rounded-full"></div>
          <span class="text-white text-xs font-semibold">{trans.aiSimulation.responseTime}</span>
        </div>
        <div class="text-white text-lg font-black">{trans.aiSimulation.responseValue}</div>
      </div>

      <div class="absolute -bottom-4 -left-8 w-36 p-3 bg-gradient-to-r from-[#11B98F] to-[#0DE0EF] rounded-xl border border-[#11B98F]/50 shadow-lg animate-float-delayed">
        <div class="flex items-center space-x-2 mb-1">
          <div class="w-4 h-4 bg-white rounded-full"></div>
          <span class="text-white text-xs font-semibold">{trans.aiSimulation.satisfaction}</span>
        </div>
        <div class="text-white text-lg font-black">{trans.aiSimulation.satisfactionValue}</div>
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
                {trans.company.vision}
              </p>
              <div class="w-20 h-1 bg-gradient-to-r from-[#0DE0EF] to-[#6438FF] rounded-full"></div>
            </div>

            {/* Spacing for visual balance */}
            <div class="mb-12"></div>

            {/* Stats with Brand Colors */}
            <div class="grid grid-cols-2 gap-12 max-w-lg mx-auto">
              <div class="text-center">
                <div class="text-3xl lg:text-4xl font-black text-[#6438FF] mb-1">99.9%</div>
                <div class="text-sm text-gray-400 font-medium">{trans.stats?.uptime || 'Uptime'}</div>
              </div>
              <div class="text-center">
                <div class="text-3xl lg:text-4xl font-black text-white mb-1">5000+</div>
                <div class="text-sm text-gray-400 font-medium">{trans.stats?.enterprises || 'Enterprises'}</div>
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
              {trans.businessValue.title}
            </h2>
            <p class="text-xl text-gray-600">
              {trans.businessValue.subtitle}
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
                  <h3 class="text-2xl font-bold text-gray-900">{trans.scenarios.marketing.title}</h3>
                </div>
                <h4 class="text-lg font-semibold text-purple-600 mb-4">
                  {trans.scenarios.marketing.subtitle}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {trans.scenarios.marketing.description}
                </p>
                <div class="flex space-x-4">
                  {trans.scenarios.marketing.features?.map((feature: string, index: number) => (
                    <div class="flex items-center text-sm text-gray-600">
                      <i class="fas fa-check text-green-500 mr-2"></i>
                      <span>{feature}</span>
                    </div>
                  )) || (
                    <>
                      <div class="flex items-center text-sm text-gray-600">
                        <i class="fas fa-check text-green-500 mr-2"></i>
                        <span>{trans.scenarios.marketing.features?.[0]}</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-600">
                        <i class="fas fa-check text-green-500 mr-2"></i>
                        <span>{trans.scenarios.marketing.features?.[1]}</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-600">
                        <i class="fas fa-check text-green-500 mr-2"></i>
                        <span>{trans.scenarios.marketing.features?.[2]}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">{trans.businessValue?.metrics?.marketing?.title || 'Marketing Performance'}</h4>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.businessValue?.metrics?.marketing?.costReduction || 'Cost Reduced'}</p>
                      <p class="text-2xl font-bold text-purple-600">43%</p>
                    </div>
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-arrow-down text-purple-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.businessValue?.metrics?.marketing?.conversionIncrease || 'Conversion Increased'}</p>
                      <p class="text-2xl font-bold text-green-600">65%</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-arrow-up text-green-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.businessValue.metrics.marketing.responseTime}</p>
                      <p class="text-2xl font-bold text-blue-600">{trans.businessValue.metrics.marketing.responseValue}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-bolt text-blue-600"></i>
                    </div>
                  </div>
                  
                  <div class="border-t pt-4">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-600">{trans.businessValue.metrics.marketing.channelCoverage}</span>
                      <span class="text-sm font-bold text-gray-900">{trans.businessValue.metrics.marketing.channelCount}</span>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-sm text-gray-600">{trans.businessValue.metrics.marketing.dailyInquiries}</span>
                      <span class="text-sm font-bold text-gray-900">{trans.businessValue.metrics.marketing.dailyCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Business - Solution 2 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                  <div class="space-y-4">
                  <h4 class="font-bold text-gray-900 mb-4">{trans.salesProcess.title}</h4>
                  
                  <div class="space-y-3">
                    <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                      <div class="flex-1">
                        <p class="font-medium">{trans.salesProcess.step1.title}</p>
                        <p class="text-sm text-gray-600">{trans.salesProcess.step1.description}</p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-blue-600">{trans.salesProcess.step1.value}</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-green-50 rounded-lg">
                      <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                      <div class="flex-1">
                        <p class="font-medium">{trans.salesProcess.step2.title}</p>
                        <p class="text-sm text-gray-600">{trans.salesProcess.step2.description}</p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-green-600">{trans.salesProcess.step2.value}</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                      <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                      <div class="flex-1">
                        <p class="font-medium">{trans.salesProcess.step3.title}</p>
                        <p class="text-sm text-gray-600">{trans.salesProcess.step3.description}</p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-purple-600">{trans.salesProcess.step3.value}</span>
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
                  <h3 class="text-2xl font-bold text-gray-900">{trans.scenarios.sales.title}</h3>
                </div>
                <h4 class="text-lg font-semibold text-blue-600 mb-4">
                  {trans.scenarios.sales.subtitle}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {trans.scenarios.sales.description}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.sales.featureShort?.[0] || trans.scenarios.sales.features?.[0] || 'Talk Track'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.sales.featureShort?.[1] || trans.scenarios.sales.features?.[1] || 'Competitive Analysis'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.sales.featureShort?.[2] || trans.scenarios.sales.features?.[2] || 'Smart Closing'}</span>
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
                  <h3 class="text-2xl font-bold text-gray-900">{trans.scenarios.customerService.title}</h3>
                </div>
                <h4 class="text-lg font-semibold text-orange-600 mb-4">
                  {trans.scenarios.customerService.subtitle}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {trans.scenarios.customerService.description}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.customerService.featureShort?.[0] || trans.scenarios.customerService.features?.[0] || '24/7 Response'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.customerService.featureShort?.[1] || trans.scenarios.customerService.features?.[1] || 'Emotion Recognition'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.customerService.featureShort?.[2] || trans.scenarios.customerService.features?.[2] || 'Smart Ticketing'}</span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">{trans.ticketProcess.title}</h4>
                
                <div class="space-y-4">
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <p class="font-medium text-gray-900">{trans.ticketProcess.step1.title}</p>
                      <p class="text-sm text-gray-600">{trans.ticketProcess.step1.description}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <p class="font-medium text-gray-900">{trans.ticketProcess.step2.title}</p>
                      <p class="text-sm text-gray-600">{trans.ticketProcess.step2.description}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <p class="font-medium text-gray-900">{trans.ticketProcess.step3.title}</p>
                      <p class="text-sm text-gray-600">{trans.ticketProcess.step3.description}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                    <div>
                      <p class="font-medium text-gray-900">{trans.ticketProcess.step4.title}</p>
                      <p class="text-sm text-gray-600">{trans.ticketProcess.step4.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Store/Dealer Operations - Solution 4 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                  <div class="space-y-6">
                  <h4 class="font-bold text-gray-900 mb-4">{trans.operationsMetrics?.title || '运营效率提升'}</h4>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-store text-green-600 text-2xl"></i>
                        <span class="text-2xl font-bold text-green-600">{trans.operationsMetrics?.storeCount || '500+'}</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">{trans.operationsMetrics?.storeAccess || '门店接入'}</p>
                    </div>
                    
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-tasks text-blue-600 text-2xl"></i>
                        <span class="text-2xl font-bold text-blue-600">{trans.operationsMetrics?.dailyVolume || '10K+'}</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">{trans.operationsMetrics?.dailyProcessing || '日均处理'}</p>
                    </div>
                    
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-clock text-purple-600 text-2xl"></i>
                        <span class="text-lg font-bold text-purple-600">{trans.operationsMetrics?.responseTime || '2小时'}</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">{trans.operationsMetrics?.avgResponse || '平均响应'}</p>
                    </div>
                    
                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-chart-line text-orange-600 text-2xl"></i>
                        <span class="text-lg font-bold text-orange-600">{trans.operationsMetrics?.efficiencyRate || '85%'}</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">{trans.operationsMetrics?.dispatchEfficiency || '派单效率'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-network-wired text-indigo-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">{trans.scenarios.internalService.title}</h3>
                </div>
                <h4 class="text-lg font-semibold text-indigo-600 mb-4">
                  {trans.scenarios.internalService.subtitle}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {trans.scenarios.internalService.description}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.internalService.featureShort?.[0] || trans.scenarios.internalService.features?.[0] || '统一入口'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.internalService.featureShort?.[1] || trans.scenarios.internalService.features?.[1] || '智能派单'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.internalService.featureShort?.[2] || trans.scenarios.internalService.features?.[2] || '数据分析'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Design & Optimization - Solution 5 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-pencil-ruler text-purple-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">{trans.scenarios.management.title}</h3>
                </div>
                <h4 class="text-lg font-semibold text-purple-600 mb-4">
                  {trans.scenarios.management.subtitle}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {trans.scenarios.management.description}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management.featureShort?.[0] || trans.scenarios.management.features?.[0] || '痛点识别'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management.featureShort?.[1] || trans.scenarios.management.features?.[1] || '需求提取'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management.featureShort?.[2] || trans.scenarios.management.features?.[2] || '迭代闭环'}</span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">{trans.productFeedbackPanel?.title || 'Customer Feedback Analysis Panel'}</h4>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.productFeedbackPanel?.painPoints || 'Product Pain Points'}</p>
                      <p class="text-2xl font-bold text-purple-600">{trans.productFeedbackPanel?.painPointCount || '1,842'}</p>
                    </div>
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-comments text-purple-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.productFeedbackPanel?.featureAdoption || 'Feature Adoption'}</p>
                      <p class="text-2xl font-bold text-green-600">{trans.productFeedbackPanel?.adoptionRate || '78%'}</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-lightbulb text-green-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.productFeedbackPanel?.fixCycle || 'Issue Fix Cycle'}</p>
                      <p class="text-2xl font-bold text-blue-600">{trans.productFeedbackPanel?.fixTime || '3.2 days'}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-tools text-blue-600"></i>
                    </div>
                  </div>
                  
                  <div class="border-t pt-4">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-600">{trans.productFeedbackPanel?.monthlyIterations || 'Monthly Iterations'}</span>
                      <span class="text-sm font-bold text-gray-900">{trans.productFeedbackPanel?.iterationCount || '12 versions'}</span>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-sm text-gray-600">{trans.productFeedbackPanel?.satisfactionIncrease || 'Satisfaction Increase'}</span>
                      <span class="text-sm font-bold text-gray-900">{trans.productFeedbackPanel?.satisfactionGrowth || '+18%'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand & Sentiment Management - Solution 6 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">{trans.sentimentPanel?.title || 'Real-time Sentiment Monitoring'}</h4>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.sentimentPanel?.negativeAlert || 'Negative Sentiment Alert'}</p>
                      <p class="text-2xl font-bold text-red-600">{trans.sentimentPanel?.alertCount || '3 items'}</p>
                    </div>
                    <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-exclamation-triangle text-red-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.sentimentPanel?.sensitiveWords || 'Sensitive Word Detection'}</p>
                      <p class="text-2xl font-bold text-yellow-600">{trans.sentimentPanel?.detectionRate || '99.8%'}</p>
                    </div>
                    <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-shield-alt text-yellow-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.sentimentPanel?.brandSentiment || 'Brand Favorability'}</p>
                      <p class="text-2xl font-bold text-green-600">{trans.sentimentPanel?.sentimentGrowth || '+12%'}</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-chart-line text-green-600"></i>
                    </div>
                  </div>
                  
                  <div class="border-t pt-4">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-600">{trans.sentimentPanel?.responseTime || 'Response Time'}</span>
                      <span class="text-sm font-bold text-gray-900">{trans.sentimentPanel?.responseSpeed || '<5 minutes'}</span>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-sm text-gray-600">{trans.sentimentPanel?.crisisSuccess || 'Crisis Success Rate'}</span>
                      <span class="text-sm font-bold text-gray-900">{trans.sentimentPanel?.successRate || '98%'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-shield-alt text-teal-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">{language === 'en' ? 'Brand & Reputation Management' : language === 'jp' ? 'ブランド・評判管理' : '品牌與輿情管理'}</h3>
                </div>
                <h4 class="text-lg font-semibold text-teal-600 mb-4">
                  {language === 'en' ? 'Real-time Brand Protection' : language === 'jp' ? 'リアルタイムブランド保護' : '實時守護企業品牌安全'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' 
                    ? 'Integrate social and service data for intelligent risk detection. Real-time alerts for high-risk conversations with automated response workflows. Quantify customer sentiment to optimize communication strategies.'
                    : language === 'jp'
                    ? 'ソーシャルとサービスデータを統合し、インテリジェントなリスク検出を実現。高リスク会話のリアルタイムアラートと自動対応ワークフロー。顧客感情を定量化し、コミュニケーション戦略を最適化。'
                    : '融合社交與客服數據，智能識別輿情風險；實時預警高風險對話，自動觸發應對流程；量化客戶情緒，優化溝通策略；自動質檢服務用語，保障品牌一致性。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management?.brandFeatures?.[0] || 'Risk Alert'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management?.brandFeatures?.[1] || 'Sentiment Analysis'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management?.brandFeatures?.[2] || 'Quality Control'}</span>
                  </div>
                </div>
              </div>
            </div>
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
              {trans.platformPerformance?.title || statsContent.title || 'Platform Performance'}
            </h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              {trans.platformPerformance?.subtitle || 'Trusted by 5000 enterprise companies worldwide for mission-critical customer interactions'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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



      {/* Contact Section - Simplified */}
      <section id="contact" class="relative py-20 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] overflow-hidden">
        {/* Decorative elements */}
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        
        <div class="site-container px-6 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
              {trans.contact.title}
            </h2>
            <p class="text-xl text-white/90 mb-8">
              {trans.contact.subtitle}
            </p>
            
            {/* Email Only */}
            <div class="flex justify-center items-center">
              <a 
                href="mailto:marketing@zenava.ai" 
                class="inline-flex items-center px-8 py-4 bg-white text-[#6438FF] rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
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