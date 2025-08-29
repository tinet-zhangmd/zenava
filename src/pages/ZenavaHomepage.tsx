import { FC, JSX } from 'hono/jsx'
import { Language, getTranslation } from '../utils/i18n'

interface ZenavaHomepageProps {
  language: Language
  pageData?: any
  modules?: any[]
  settings?: Record<string, string>
}

export const ZenavaHomepage: FC<ZenavaHomepageProps> = ({ language = 'en', pageData, modules = [], settings = {} }) => {
  const t = getTranslation(language)
  
  return (
    <>
      {/* Hero Section - AI-First Design */}
      <section class="relative min-h-screen bg-gradient-to-br from-[#000D25] via-[#0a0f2e] to-[#1a1f3a] overflow-hidden flex items-center">
        {/* Background Elements */}
        <div class="absolute inset-0">
          {/* Grid Pattern */}
          <div class="absolute inset-0 opacity-20">
            <div class="w-full h-full" style="background-image: radial-gradient(circle at 2px 2px, #6438FF 1px, transparent 0); background-size: 40px 40px;"></div>
          </div>
          
          {/* Floating AI Elements */}
          <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#6438FF]/20 to-[#0DE0EF]/20 rounded-full blur-3xl animate-float"></div>
          <div class="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-[#0DE0EF]/20 to-[#6438FF]/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div class="absolute top-1/2 left-1/4 w-24 h-24 bg-[#6438FF]/30 rounded-full blur-2xl animate-pulse"></div>
          
          {/* AI Circuit Lines */}
          <div class="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#0DE0EF]/50 to-transparent animate-pulse"></div>
          <div class="absolute bottom-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#6438FF]/50 to-transparent animate-pulse delay-1000"></div>
        </div>

        <div class="container mx-auto px-6 relative z-10">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div class="space-y-8">
              
              {/* AI Badge */}
              <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#6438FF]/20 to-[#0DE0EF]/20 backdrop-blur-sm rounded-full border border-[#6438FF]/30 shadow-lg">
                <div class="relative">
                  <div class="w-3 h-3 bg-[#0DE0EF] rounded-full animate-pulse"></div>
                  <div class="absolute inset-0 w-3 h-3 bg-[#0DE0EF] rounded-full animate-ping"></div>
                </div>
                <span class="text-white/90 text-sm font-semibold ml-3 tracking-wide">AI-POWERED ENTERPRISE DIALOGUE</span>
              </div>

              {/* Main Heading */}
              <div class="space-y-4">
                <h1 class="text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
                  <span class="block text-white mb-2">Zenava</span>
                  <span class="block bg-gradient-to-r from-[#6438FF] via-[#8B5CF6] to-[#0DE0EF] bg-clip-text text-transparent">
                    AI Platform
                  </span>
                </h1>
                <div class="flex items-center space-x-4">
                  <div class="w-20 h-1 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-full"></div>
                  <p class="text-xl lg:text-2xl text-gray-300 font-light">
                    Transform Customer Conversations with Intelligent AI Agents
                  </p>
                </div>
              </div>

              {/* Value Proposition */}
              <p class="text-lg lg:text-xl text-gray-400 leading-relaxed max-w-xl">
                Build, deploy, and scale AI-powered customer dialogue systems that understand context, 
                learn from interactions, and deliver <span class="text-[#0DE0EF] font-semibold">enterprise-grade performance</span>.
              </p>

              {/* CTA Buttons */}
              <div class="flex flex-col sm:flex-row gap-4 pt-6">
                <button class="group relative px-8 py-4 bg-gradient-to-r from-[#6438FF] to-[#8B5CF6] rounded-2xl font-bold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-[#6438FF]/25 hover:scale-105 overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="relative z-10 flex items-center">
                    Start Free Trial
                    <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </span>
                </button>
                
                <button class="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-8-8v8a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2z"/>
                    </svg>
                  </div>
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div class="grid grid-cols-3 gap-8 pt-8">
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

            {/* Right Visual - AI Interface Mockup */}
            <div class="relative lg:h-[700px] flex items-center justify-center">
              
              {/* Main Interface Card */}
              <div class="relative w-full max-w-md">
                
                {/* AI Chat Interface */}
                <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl">
                  
                  {/* Header */}
                  <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
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

                  {/* Chat Messages */}
                  <div class="space-y-4 mb-6">
                    
                    {/* User Message */}
                    <div class="flex justify-end">
                      <div class="bg-gradient-to-r from-[#6438FF] to-[#8B5CF6] text-white px-4 py-3 rounded-2xl rounded-br-sm max-w-xs">
                        <p class="text-sm">I need help with order #12345</p>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div class="flex justify-start">
                      <div class="bg-white/10 text-white px-4 py-3 rounded-2xl rounded-bl-sm max-w-xs border border-white/20">
                        <div class="flex items-center space-x-2 mb-2">
                          <div class="w-4 h-4 bg-gradient-to-r from-[#0DE0EF] to-[#6438FF] rounded-full"></div>
                          <span class="text-xs text-[#0DE0EF]">AI Processing...</span>
                        </div>
                        <p class="text-sm">I've found your order! It's currently being processed and will ship within 24 hours. Would you like tracking details?</p>
                      </div>
                    </div>

                    {/* Typing indicator */}
                    <div class="flex justify-start">
                      <div class="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10">
                        <div class="flex space-x-1">
                          <div class="w-2 h-2 bg-[#0DE0EF] rounded-full animate-bounce"></div>
                          <div class="w-2 h-2 bg-[#6438FF] rounded-full animate-bounce delay-100"></div>
                          <div class="w-2 h-2 bg-[#0DE0EF] rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div class="flex items-center space-x-3">
                    <div class="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3">
                      <input type="text" placeholder="Type your message..." class="w-full bg-transparent text-white placeholder-gray-400 text-sm outline-none" />
                    </div>
                    <button class="w-12 h-12 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-xl flex items-center justify-center hover:scale-105 transition-transform">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Floating Analytics Cards */}
                <div class="absolute -top-4 -right-8 w-32 p-3 bg-gradient-to-r from-[#6438FF]/90 to-[#8B5CF6]/90 backdrop-blur-xl rounded-xl border border-white/20 animate-float">
                  <div class="flex items-center space-x-2 mb-1">
                    <div class="w-4 h-4 bg-[#0DE0EF] rounded-full"></div>
                    <span class="text-white text-xs font-semibold">Response Time</span>
                  </div>
                  <div class="text-white text-lg font-black">&lt; 100ms</div>
                </div>

                <div class="absolute -bottom-4 -left-8 w-36 p-3 bg-gradient-to-r from-[#0DE0EF]/90 to-[#6438FF]/90 backdrop-blur-xl rounded-xl border border-white/20 animate-float-delayed">
                  <div class="flex items-center space-x-2 mb-1">
                    <div class="w-4 h-4 bg-white rounded-full"></div>
                    <span class="text-white text-xs font-semibold">Satisfaction Rate</span>
                  </div>
                  <div class="text-white text-lg font-black">98.7%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section class="py-20 bg-white relative">
        <div class="container mx-auto px-6">
          
          {/* Section Header */}
          <div class="text-center mb-16">
            <div class="inline-flex items-center px-4 py-2 bg-[#6438FF]/10 rounded-full mb-6">
              <span class="text-[#6438FF] text-sm font-bold tracking-wide">AI CAPABILITIES</span>
            </div>
            <h2 class="text-5xl lg:text-6xl font-black text-[#000D25] mb-6 leading-tight">
              Intelligent by Design
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our AI platform combines advanced machine learning with enterprise-grade infrastructure 
              to deliver conversations that feel naturally human.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div class="grid lg:grid-cols-3 gap-8">
            
            {/* NLP Processing */}
            <div class="group relative p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 hover:border-[#6438FF]/20 hover:shadow-2xl hover:shadow-[#6438FF]/10 transition-all duration-500 hover:-translate-y-1">
              <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div class="w-16 h-16 bg-gradient-to-r from-[#6438FF] to-[#8B5CF6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              
              <h3 class="text-2xl font-bold text-[#000D25] mb-4">Advanced NLP Engine</h3>
              <p class="text-gray-600 leading-relaxed mb-6">
                Understands context, sentiment, and intent across 50+ languages with 99.5% accuracy. 
                Processes complex queries and maintains conversation flow naturally.
              </p>
              
              <div class="flex items-center text-[#6438FF] font-semibold group-hover:text-[#0DE0EF] transition-colors">
                <span>Explore NLP Features</span>
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
            </div>

            {/* Machine Learning */}
            <div class="group relative p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 hover:border-[#6438FF]/20 hover:shadow-2xl hover:shadow-[#6438FF]/10 transition-all duration-500 hover:-translate-y-1">
              <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0DE0EF] to-[#6438FF] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div class="w-16 h-16 bg-gradient-to-r from-[#0DE0EF] to-[#6438FF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                </svg>
              </div>
              
              <h3 class="text-2xl font-bold text-[#000D25] mb-4">Continuous Learning</h3>
              <p class="text-gray-600 leading-relaxed mb-6">
                Self-improving algorithms that learn from every interaction. Adapts to your business context 
                and customer preferences over time for better outcomes.
              </p>
              
              <div class="flex items-center text-[#6438FF] font-semibold group-hover:text-[#0DE0EF] transition-colors">
                <span>View Learning Models</span>
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
            </div>

            {/* Enterprise Integration */}
            <div class="group relative p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 hover:border-[#6438FF]/20 hover:shadow-2xl hover:shadow-[#6438FF]/10 transition-all duration-500 hover:-translate-y-1">
              <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B5CF6] to-[#0DE0EF] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div class="w-16 h-16 bg-gradient-to-r from-[#8B5CF6] to-[#0DE0EF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              
              <h3 class="text-2xl font-bold text-[#000D25] mb-4">Enterprise Integration</h3>
              <p class="text-gray-600 leading-relaxed mb-6">
                Seamlessly integrates with existing CRM, helpdesk, and business systems. 
                Enterprise-grade security with SOC2 compliance and 99.9% uptime SLA.
              </p>
              
              <div class="flex items-center text-[#6438FF] font-semibold group-hover:text-[#0DE0EF] transition-colors">
                <span>Integration Guide</span>
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Performance */}
      <section class="py-20 bg-gradient-to-br from-[#000D25] via-[#1a1f3a] to-[#000D25] text-white relative overflow-hidden">
        <div class="absolute inset-0">
          <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#6438FF]/10 to-[#0DE0EF]/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-[#0DE0EF]/10 to-[#6438FF]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
          
          {/* Section Header */}
          <div class="text-center mb-16">
            <div class="inline-flex items-center px-4 py-2 bg-[#6438FF]/20 rounded-full mb-6">
              <span class="text-[#0DE0EF] text-sm font-bold tracking-wide">PLATFORM PERFORMANCE</span>
            </div>
            <h2 class="text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Built for Scale
            </h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by 500+ enterprise companies worldwide for mission-critical customer interactions
            </p>
          </div>

          {/* Stats Grid */}
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            
            <div class="text-center group">
              <div class="w-20 h-20 bg-gradient-to-r from-[#6438FF] to-[#8B5CF6] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <div class="text-4xl lg:text-5xl font-black text-[#0DE0EF] mb-2">10M+</div>
              <div class="text-gray-400 font-medium">Conversations Handled</div>
            </div>

            <div class="text-center group">
              <div class="w-20 h-20 bg-gradient-to-r from-[#0DE0EF] to-[#6438FF] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="text-4xl lg:text-5xl font-black text-white mb-2">99.9%</div>
              <div class="text-gray-400 font-medium">Uptime SLA</div>
            </div>

            <div class="text-center group">
              <div class="w-20 h-20 bg-gradient-to-r from-[#8B5CF6] to-[#0DE0EF] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div class="text-4xl lg:text-5xl font-black text-[#6438FF] mb-2">500+</div>
              <div class="text-gray-400 font-medium">Enterprise Clients</div>
            </div>

            <div class="text-center group">
              <div class="w-20 h-20 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <div class="text-4xl lg:text-5xl font-black text-white mb-2">4.9/5</div>
              <div class="text-gray-400 font-medium">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases / Scenarios */}
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
          
          {/* Section Header */}
          <div class="text-center mb-16">
            <div class="inline-flex items-center px-4 py-2 bg-[#6438FF]/10 rounded-full mb-6">
              <span class="text-[#6438FF] text-sm font-bold tracking-wide">USE CASES</span>
            </div>
            <h2 class="text-5xl lg:text-6xl font-black text-[#000D25] mb-6 leading-tight">
              AI for Every Scenario
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              From customer support to sales and internal operations, 
              our AI adapts to your specific business needs
            </p>
          </div>

          {/* Scenarios Grid */}
          <div class="grid lg:grid-cols-2 gap-8">
            
            {/* Customer Service */}
            <div class="group p-8 bg-white rounded-3xl border border-gray-100 hover:border-[#6438FF]/20 hover:shadow-2xl transition-all duration-500">
              <div class="flex items-start space-x-6">
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 bg-gradient-to-r from-[#6438FF] to-[#8B5CF6] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-[#000D25] mb-3">Customer Support</h3>
                  <p class="text-gray-600 leading-relaxed mb-4">
                    Resolve 80% of customer inquiries instantly with AI that understands complex issues 
                    and provides accurate, empathetic responses 24/7.
                  </p>
                  <a href="/scenarios/customer-service" class="inline-flex items-center text-[#6438FF] font-semibold hover:text-[#0DE0EF] transition-colors">
                    <span>Learn More</span>
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Sales Assistance */}
            <div class="group p-8 bg-white rounded-3xl border border-gray-100 hover:border-[#6438FF]/20 hover:shadow-2xl transition-all duration-500">
              <div class="flex items-start space-x-6">
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 bg-gradient-to-r from-[#0DE0EF] to-[#6438FF] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-[#000D25] mb-3">Sales Automation</h3>
                  <p class="text-gray-600 leading-relaxed mb-4">
                    Qualify leads, schedule demos, and nurture prospects with personalized conversations 
                    that convert at 3x higher rates than traditional methods.
                  </p>
                  <a href="/scenarios/sales" class="inline-flex items-center text-[#6438FF] font-semibold hover:text-[#0DE0EF] transition-colors">
                    <span>Learn More</span>
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Marketing */}
            <div class="group p-8 bg-white rounded-3xl border border-gray-100 hover:border-[#6438FF]/20 hover:shadow-2xl transition-all duration-500">
              <div class="flex items-start space-x-6">
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 bg-gradient-to-r from-[#8B5CF6] to-[#0DE0EF] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-[#000D25] mb-3">Marketing Intelligence</h3>
                  <p class="text-gray-600 leading-relaxed mb-4">
                    Engage website visitors with intelligent conversations that collect insights, 
                    qualify interest, and drive conversions at the perfect moment.
                  </p>
                  <a href="/scenarios/marketing" class="inline-flex items-center text-[#6438FF] font-semibold hover:text-[#0DE0EF] transition-colors">
                    <span>Learn More</span>
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Internal Operations */}
            <div class="group p-8 bg-white rounded-3xl border border-gray-100 hover:border-[#6438FF]/20 hover:shadow-2xl transition-all duration-500">
              <div class="flex items-start space-x-6">
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-[#000D25] mb-3">Internal Operations</h3>
                  <p class="text-gray-600 leading-relaxed mb-4">
                    Streamline HR inquiries, IT support, and internal processes with AI assistants 
                    that know your policies and procedures inside out.
                  </p>
                  <a href="/scenarios/internal-service" class="inline-flex items-center text-[#6438FF] font-semibold hover:text-[#0DE0EF] transition-colors">
                    <span>Learn More</span>
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 bg-gradient-to-r from-[#6438FF] via-[#8B5CF6] to-[#0DE0EF] text-white relative overflow-hidden">
        <div class="absolute inset-0">
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/20 to-transparent"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10 text-center">
          <h2 class="text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Ready to Transform Your Business?
          </h2>
          <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Join 500+ enterprise companies using Zenava AI to revolutionize their customer experience and drive growth.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button class="px-8 py-4 bg-white text-[#6438FF] rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex-1">
              Start Free Trial
            </button>
            <button class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex-1">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Custom Animations */}
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