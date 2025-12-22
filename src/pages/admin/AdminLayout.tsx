import { html } from 'hono/html'
import { Language } from '../../utils/i18n.js'

interface AdminLayoutProps {
  children: any
  title?: string
  currentPath: string
  user?: { name: string; email: string }
}

export function AdminLayout({ children, title, currentPath, user }: AdminLayoutProps) {
  const siteTitle = title ? `${title} - Zenava Admin` : 'Zenava Admin'
  
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{siteTitle}</title>
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* FontAwesome Icons */}
        <link href="/static/fontawesome/css/all.min.css" rel="stylesheet" />
        
        {/* Quill Editor for Rich Text */}
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
        <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
        
        {/* Custom Admin Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .admin-sidebar { 
              min-height: 100vh; 
              background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
            }
            .admin-sidebar a:hover { background-color: rgba(255, 255, 255, 0.1); }
            .admin-sidebar a.active { background-color: rgba(59, 130, 246, 0.3); }
            .admin-content { min-height: 100vh; background-color: #f8fafc; }
            .quill-editor { background-color: white; }
          `
        }} />
        
        {/* Baidu Analytics */}
        <script dangerouslySetInnerHTML={{
          __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7948de4d0f78a0d3290eb6d24d2b1696";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
          `
        }} />
      </head>
      <body class="bg-gray-50 font-sans">
        <div class="flex">
          {/* Sidebar */}
          <div class="w-64 admin-sidebar text-white">
            <div class="p-6">
              <h1 class="text-2xl font-bold text-white mb-8">
                <i class="fas fa-cog mr-2"></i>
                Zenava 管理后台
              </h1>
              
              <nav class="space-y-2">
                <a href="/ticloudadmin" 
                   class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath === '/ticloudadmin' ? 'active' : ''}`}>
                  <i class="fas fa-tachometer-alt mr-3"></i>
                  控制台
                </a>
                
                <a href="/ticloudadmin/content"
                   class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/content') ? 'active' : ''}`}>
                  <i class="fas fa-file-alt mr-3"></i>
                  内容管理
                </a>
                
                <a href="/ticloudadmin/seo"
                   class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/seo') ? 'active' : ''}`}>
                  <i class="fas fa-search mr-3"></i>
                  SEO 管理
                </a>
                
                <a href="/ticloudadmin/i18n"
                   class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/i18n') ? 'active' : ''}`}>
                  <i class="fas fa-globe mr-3"></i>
                  多语言管理
                </a>
                
                <a href="/ticloudadmin/media"
                   class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/media') ? 'active' : ''}`}>
                  <i class="fas fa-images mr-3"></i>
                  媒体库
                </a>
                
                <a href="/ticloudadmin/common-content"
                   class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/common-content') ? 'active' : ''}`}>
                  <i class="fas fa-layer-group mr-3"></i>
                  公共内容
                </a>
                
                {/* Resource Center Menu */}
                <div class="mt-2">
                  <div class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    资源中心
                  </div>
                  <a href="/ticloudadmin/resource-categories"
                     class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/resource-categories') ? 'active' : ''}`}>
                    <i class="fas fa-folder mr-3"></i>
                    栏目分类
                  </a>
                  <a href="/ticloudadmin/resource-contents"
                     class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/resource-contents') ? 'active' : ''}`}>
                    <i class="fas fa-file-alt mr-3"></i>
                    内容列表
                  </a>
                  <a href="/ticloudadmin/resource-banners"
                     class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/resource-banners') && !currentPath.startsWith('/ticloudadmin/category-banners') ? 'active' : ''}`}>
                    <i class="fas fa-image mr-3"></i>
                    首页Banner管理
                  </a>
                  <a href="/ticloudadmin/category-banners"
                     class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/category-banners') ? 'active' : ''}`}>
                    <i class="fas fa-images mr-3"></i>
                    栏目Banner管理
                  </a>
                </div>
                
                <a href="/ticloudadmin/publish"
                   class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/publish') ? 'active' : ''}`}>
                  <i class="fas fa-rocket mr-3"></i>
                  发布管理
                </a>
                
                <a href="/ticloudadmin/users"
                   class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/users') ? 'active' : ''}`}>
                  <i class="fas fa-users mr-3"></i>
                  用户管理
                </a>
                
                <a href="/ticloudadmin/settings"
                   class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/settings') ? 'active' : ''}`}>
                  <i class="fas fa-cog mr-3"></i>
                  系统设置
                </a>
                
                <hr class="my-6 border-slate-600" />
                
                <a href="/ticloudadmin/logs"
                   class={`flex items-center px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith('/ticloudadmin/logs') ? 'active' : ''}`}>
                  <i class="fas fa-list mr-3"></i>
                  操作日志
                </a>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div class="flex-1 admin-content">
            {/* Top Bar */}
            <header class="bg-white border-b border-gray-200 px-6 py-4">
              <div class="flex justify-between items-center">
                <div>
                  <h2 class="text-2xl font-semibold text-gray-800">{title || '控制台'}</h2>
                  <p class="text-gray-600 text-sm">管理您的网站内容和设置</p>
                </div>
                
                <div class="flex items-center space-x-4">
                  <a href="/" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                    <i class="fas fa-external-link-alt mr-1"></i>
                    查看网站
                  </a>
                  
                  <div class="flex items-center space-x-2 text-gray-700">
                    <i class="fas fa-user-circle text-xl"></i>
                    <span class="text-sm font-medium">{user?.name || '管理员'}</span>
                  </div>
                  
                  <a href="/ticloudadmin/logout" class="text-red-600 hover:text-red-800 text-sm">
                    <i class="fas fa-sign-out-alt mr-1"></i>
                    退出
                  </a>
                </div>
              </div>
            </header>
            
            {/* Page Content */}
            <main class="p-6">
              {children}
            </main>
          </div>
        </div>
        
        {/* Admin JavaScript */}
        <script src="/static/admin.js"></script>
      </body>
    </html>
  )
}