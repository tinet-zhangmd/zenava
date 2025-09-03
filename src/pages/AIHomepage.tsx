import { FC, JSX } from 'hono/jsx'
import { Language, getTranslation } from '../utils/i18n'

interface AIHomepageProps {
  language: Language
  pageData?: any
  modules?: any[]
  settings?: Record<string, string>
}

export const AIHomepage: FC<AIHomepageProps> = ({ language = 'en', pageData, modules = [], settings = {} }) => {
  const t = getTranslation(language)
  
  return (
    <>
      {/* Modern AI Hero Section */}
      <section class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated Background */}
        <div class="absolute inset-0">
          <div class="absolute inset-0 opacity-20">
            <div class="w-full h-full" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjIiLz48Y2lyY2xlIGN4PSIzNyIgY3k9IjciIHI9IjIiLz48Y2lyY2xlIGN4PSI3IiBjeT0iMzciIHI9IjIiLz48Y2lyY2xlIGN4PSIzNyIgY3k9IjM3IiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')"></div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
        </div>

        {/* Neural Network Animation */}
        <div class="absolute inset-0 opacity-10">
          <div class="neural-network">
            <div class="node node-1"></div>
            <div class="node node-2"></div>
            <div class="node node-3"></div>
            <div class="node node-4"></div>
            <div class="node node-5"></div>
            <div class="connection conn-1"></div>
            <div class="connection conn-2"></div>
            <div class="connection conn-3"></div>
          </div>
        </div>

        <div class="site-container px-6 relative z-10">
          <div class="max-w-6xl mx-auto">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div class="space-y-8">
                {/* AI Badge */}
                <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
                  <span class="text-blue-100 text-sm font-medium">AI-Powered Enterprise Solution</span>
                </div>

                {/* Main Heading */}
                <h1 class="text-6xl lg:text-7xl font-black text-white leading-tight">
                  <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Zenava AI
                  </span>
                  <br />
                  <span class="text-gray-100">
                    Next-Gen Enterprise Dialogue Platform
                  </span>
                </h1>

                {/* Subtitle */}
                <p class="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  Transform customer interactions with intelligent AI agents that understand, learn, and adapt in real-time. 
                  <span class="text-blue-400 font-semibold">Built for enterprise scale</span>.
                </p>

                {/* Stats Row */}
                <div class="flex flex-wrap gap-8 pt-4">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-blue-400">10M+</div>
                    <div class="text-sm text-gray-400">Conversations</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-purple-400">99.9%</div>
                    <div class="text-sm text-gray-400">Uptime</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-indigo-400">500+</div>
                    <div class="text-sm text-gray-400">Enterprise Clients</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                  <button class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                    <span class="relative z-10 flex items-center">
                      Start Free Trial
                      <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </span>
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  
                  <button class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-white hover:bg-white/20 transition-all duration-300 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-8-8v8a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2z"/>
                    </svg>
                    Watch Demo
                  </button>
                </div>
              </div>

              {/* Right Visual */}
              <div class="relative lg:h-[600px] flex items-center justify-center">
                {/* AI Brain Visualization */}
                <div class="relative w-80 h-80 lg:w-96 lg:h-96">
                  {/* Central Core */}
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full animate-pulse"></div>
                  <div class="absolute inset-4 bg-gradient-to-r from-blue-600/40 to-purple-600/40 rounded-full animate-pulse delay-150"></div>
                  <div class="absolute inset-8 bg-gradient-to-r from-blue-700/50 to-purple-700/50 rounded-full animate-pulse delay-300"></div>
                  
                  {/* Orbiting Elements */}
                  <div class="absolute inset-0 animate-spin-slow">
                    <div class="absolute -top-4 left-1/2 w-8 h-8 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                    <div class="absolute top-1/2 -right-4 w-6 h-6 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                    <div class="absolute -bottom-4 left-1/2 w-10 h-10 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
                    <div class="absolute top-1/2 -left-4 w-7 h-7 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
                  </div>
                  
                  {/* Data Flow Lines */}
                  <div class="absolute inset-0 opacity-60">
                    <div class="absolute top-8 left-8 w-32 h-0.5 bg-gradient-to-r from-blue-400 to-transparent animate-pulse"></div>
                    <div class="absolute bottom-8 right-8 w-24 h-0.5 bg-gradient-to-l from-purple-400 to-transparent animate-pulse delay-200"></div>
                    <div class="absolute top-16 right-12 w-20 h-0.5 bg-gradient-to-r from-indigo-400 to-transparent animate-pulse delay-100"></div>
                  </div>
                  
                  {/* Center Icon */}
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div class="absolute top-0 right-0 w-48 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 animate-float">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div>
                      <div class="text-white font-semibold">Real-time Processing</div>
                      <div class="text-gray-300 text-sm">&lt; 1.8s response</div>
                    </div>
                  </div>
                </div>

                <div class="absolute bottom-0 left-0 w-44 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 animate-float delay-1000">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="text-white font-semibold">Auto-scaling</div>
                      <div class="text-gray-300 text-sm">Infinite capacity</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div class="w-1 h-3 bg-white/60 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section class="py-20 bg-white relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        
        <div class="site-container px-6 relative z-10">
          <div class="text-center mb-16">
            <h2 class="text-5xl lg:text-6xl font-black mb-6">
              <span class="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                AI-Powered Capabilities
              </span>
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Leverage cutting-edge artificial intelligence to revolutionize your customer interactions
            </p>
          </div>

          <div class="grid lg:grid-cols-3 gap-8 mb-16">
            {/* NLP Processing */}
            <div class="group relative p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 rounded-3xl transition-all duration-500"></div>
              
              <div class="relative z-10">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Advanced NLP</h3>
                <p class="text-gray-600 leading-relaxed mb-6">
                  Our AI understands context, sentiment, and intent with 99.5% accuracy across 50+ languages
                </p>
                
                <div class="flex items-center text-blue-600 font-semibold">
                  <span>Learn more</span>
                  <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Machine Learning */}
            <div class="group relative p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl hover:from-purple-100 hover:to-pink-100 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 rounded-3xl transition-all duration-500"></div>
              
              <div class="relative z-10">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                  </svg>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Continuous Learning</h3>
                <p class="text-gray-600 leading-relaxed mb-6">
                  Self-improving algorithms that learn from every interaction to deliver better results over time
                </p>
                
                <div class="flex items-center text-purple-600 font-semibold">
                  <span>Learn more</span>
                  <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Predictive Analytics */}
            <div class="group relative p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl hover:from-green-100 hover:to-emerald-100 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-br from-green-600/0 to-emerald-600/0 group-hover:from-green-600/5 group-hover:to-emerald-600/5 rounded-3xl transition-all duration-500"></div>
              
              <div class="relative z-10">
                <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Predictive Analytics</h3>
                <p class="text-gray-600 leading-relaxed mb-6">
                  Anticipate customer needs and behavior patterns with advanced predictive modeling
                </p>
                
                <div class="flex items-center text-green-600 font-semibold">
                  <span>Learn more</span>
                  <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Dashboard Preview */}
      <section class="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0">
            <div class="w-full h-full" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTAgMHYxMDBoMTAwdi0xMDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0ibTAgMCAxMDAgMTAwbTAtMTAwLTEwMCAxMDAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')"></div>
          </div>
        </div>
        
        <div class="site-container px-6 relative z-10">
          <div class="max-w-4xl mx-auto text-center mb-16">
            <h2 class="text-5xl lg:text-6xl font-black mb-6">
              <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Enterprise-Grade Dashboard
              </span>
            </h2>
            <p class="text-xl text-gray-300">
              Monitor, analyze, and optimize your AI agents with real-time insights and advanced analytics
            </p>
          </div>

          {/* Dashboard Mockup */}
          <div class="relative max-w-6xl mx-auto">
            <div class="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
              {/* Top Bar */}
              <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
                <div class="flex items-center space-x-4">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                  <h3 class="text-xl font-semibold">Zenava AI Console</h3>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-sm text-gray-400">Live</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="p-4 bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl border border-blue-700/30">
                  <div class="text-2xl font-bold text-blue-400">98.7%</div>
                  <div class="text-sm text-gray-400">Accuracy Rate</div>
                </div>
                <div class="p-4 bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-xl border border-green-700/30">
                  <div class="text-2xl font-bold text-green-400">1,247</div>
                  <div class="text-sm text-gray-400">Active Sessions</div>
                </div>
                <div class="p-4 bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-xl border border-purple-700/30">
                  <div class="text-2xl font-bold text-purple-400">23ms</div>
                  <div class="text-sm text-gray-400">Avg Response</div>
                </div>
                <div class="p-4 bg-gradient-to-br from-orange-900/30 to-orange-800/30 rounded-xl border border-orange-700/30">
                  <div class="text-2xl font-bold text-orange-400">4.9★</div>
                  <div class="text-sm text-gray-400">User Rating</div>
                </div>
              </div>

              {/* Chart Area */}
              <div class="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-700/50">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="text-lg font-semibold">Real-time Analytics</h4>
                  <div class="flex space-x-2">
                    <div class="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Simulated Chart */}
                <div class="h-32 flex items-end space-x-2">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div 
                      key={i}
                      class={`flex-1 bg-gradient-to-t from-blue-600 to-purple-500 rounded-t animate-pulse`}
                      style={`height: ${Math.random() * 80 + 20}%; animation-delay: ${i * 100}ms`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div class="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
            <div class="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="container mx-auto px-6 relative z-10 text-center">
          <h2 class="text-4xl lg:text-5xl font-black mb-6">
            Ready to Transform Your Business?
          </h2>
          <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join 500+ enterprise companies using Zenava AI to revolutionize their customer experience
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button class="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex-1">
              Start Free Trial
            </button>
            <button class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex-1">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          
          .neural-network {
            position: relative;
            width: 100%;
            height: 100%;
          }
          
          .node {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #60a5fa;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }
          
          .node-1 { top: 20%; left: 20%; animation-delay: 0s; }
          .node-2 { top: 20%; right: 20%; animation-delay: 0.4s; }
          .node-3 { bottom: 20%; left: 20%; animation-delay: 0.8s; }
          .node-4 { bottom: 20%; right: 20%; animation-delay: 1.2s; }
          .node-5 { top: 50%; left: 50%; animation-delay: 1.6s; background: #a855f7; }
          
          .connection {
            position: absolute;
            background: linear-gradient(90deg, #60a5fa, #a855f7);
            height: 1px;
            opacity: 0.6;
            animation: pulse 3s infinite;
          }
          
          .conn-1 {
            top: 25%;
            left: 25%;
            width: 50%;
            transform: rotate(45deg);
            animation-delay: 0.2s;
          }
          
          .conn-2 {
            top: 50%;
            left: 25%;
            width: 50%;
            animation-delay: 0.6s;
          }
          
          .conn-3 {
            top: 75%;
            left: 25%;
            width: 50%;
            transform: rotate(-45deg);
            animation-delay: 1s;
          }
        `
      }} />
    </>
  )
}