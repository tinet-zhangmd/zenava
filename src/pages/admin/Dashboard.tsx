interface DashboardProps {
  // Dashboard specific props can be added here
}

export function Dashboard({}: DashboardProps) {
  return (
    <div class="space-y-6">
      {/* Statistics Cards */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <i class="fas fa-file-alt text-blue-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">总页面数</p>
              <p class="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <i class="fas fa-globe text-green-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">语言</p>
              <p class="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <i class="fas fa-search text-yellow-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">SEO 页面</p>
              <p class="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <i class="fas fa-images text-purple-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">媒体文件</p>
              <p class="text-2xl font-semibold text-gray-900">45</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">快速操作</h3>
          <p class="text-gray-600">常用的管理功能</p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/ticloudadmin/content/new" class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <i class="fas fa-plus text-blue-600 text-xl mr-3"></i>
              <div>
                <p class="font-medium text-gray-900">创建新页面</p>
                <p class="text-sm text-gray-600">添加新的内容页面</p>
              </div>
            </a>
            
            <a href="/ticloudadmin/seo" class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <i class="fas fa-search text-green-600 text-xl mr-3"></i>
              <div>
                <p class="font-medium text-gray-900">管理 SEO</p>
                <p class="text-sm text-gray-600">优化搜索排名</p>
              </div>
            </a>
            
            <a href="/ticloudadmin/i18n" class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <i class="fas fa-globe text-purple-600 text-xl mr-3"></i>
              <div>
                <p class="font-medium text-gray-900">更新翻译</p>
                <p class="text-sm text-gray-600">管理多语言内容</p>
              </div>
            </a>
            
            <a href="/ticloudadmin/common-content" class="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <i class="fas fa-layer-group text-indigo-600 text-xl mr-3"></i>
              <div>
                <p class="font-medium text-gray-900">公共内容管理</p>
                <p class="text-sm text-gray-600">管理导航栏和页脚</p>
              </div>
            </a>
            
            <a href="/ticloudadmin/publish" class="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <i class="fas fa-rocket text-orange-600 text-xl mr-3"></i>
              <div>
                <p class="font-medium text-gray-900">发布管理</p>
                <p class="text-sm text-gray-600">部署内容到生产环境</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="p-6 border-b">
            <h3 class="text-lg font-semibold text-gray-900">最近内容更新</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-file-alt text-blue-600 text-sm"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">主页已更新</p>
                    <p class="text-xs text-gray-500">2 小时前</p>
                  </div>
                </div>
                <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">已发布</span>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-globe text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">已添加日语翻译</p>
                    <p class="text-xs text-gray-500">5 小时前</p>
                  </div>
                </div>
                <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">草稿</span>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-search text-yellow-600 text-sm"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">SEO 元数据已更新</p>
                    <p class="text-xs text-gray-500">1 天前</p>
                  </div>
                </div>
                <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">已发布</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="p-6 border-b">
            <h3 class="text-lg font-semibold text-gray-900">网站性能</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">页面加载速度</span>
                <span class="text-sm font-medium text-green-600">2.3s</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" style="width: 85%"></div>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">SEO 评分</span>
                <span class="text-sm font-medium text-blue-600">92/100</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" style="width: 92%"></div>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">移动端优化</span>
                <span class="text-sm font-medium text-purple-600">98/100</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-purple-600 h-2 rounded-full" style="width: 98%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}