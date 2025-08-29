interface ContentItem {
  id: string
  title: string
  slug: string
  type: 'page' | 'post' | 'component'
  status: 'published' | 'draft' | 'archived'
  languages: string[]
  lastModified: string
  author: string
}

interface ContentManagementProps {
  searchQuery?: string
  contentType?: string
  status?: string
}

export function ContentManagement({ searchQuery = '', contentType = 'all', status = 'all' }: ContentManagementProps) {
  // Mock data - in real app this would come from database
  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Homepage',
      slug: '/',
      type: 'page',
      status: 'published',
      languages: ['en', 'jp', 'hk'],
      lastModified: '2024-01-15 10:30',
      author: 'Admin'
    },
    {
      id: '2',
      title: 'Marketing Scenario',
      slug: '/scenarios/marketing',
      type: 'page',
      status: 'published',
      languages: ['en', 'jp', 'hk'],
      lastModified: '2024-01-14 16:45',
      author: 'Admin'
    },
    {
      id: '3',
      title: 'Sales Scenario',
      slug: '/scenarios/sales',
      type: 'page',
      status: 'published',
      languages: ['en', 'jp', 'hk'],
      lastModified: '2024-01-14 14:20',
      author: 'Admin'
    },
    {
      id: '4',
      title: 'Customer Service Scenario',
      slug: '/scenarios/customer-service',
      type: 'page',
      status: 'published',
      languages: ['en', 'jp', 'hk'],
      lastModified: '2024-01-13 11:15',
      author: 'Admin'
    },
    {
      id: '5',
      title: 'About Us Page',
      slug: '/about',
      type: 'page',
      status: 'draft',
      languages: ['en', 'jp'],
      lastModified: '2024-01-12 09:30',
      author: 'Admin'
    }
  ]
  
  return (
    <div class="space-y-6">
      {/* Page Header */}
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Content Management</h2>
          <p class="text-gray-600">Manage all website pages and content</p>
        </div>
        <a href="/admin/content/new" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <i class="fas fa-plus mr-2"></i>
          Create New Content
        </a>
      </div>
      
      {/* Filters and Search */}
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search content..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
              />
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Types</option>
              <option value="page">Pages</option>
              <option value="post">Posts</option>
              <option value="component">Components</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Languages</option>
              <option value="en">English</option>
              <option value="jp">Japanese</option>
              <option value="hk">Traditional Chinese</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Content Table */}
      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Languages</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {contentItems.map((item) => (
                <tr key={item.id} class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{item.title}</div>
                      <div class="text-sm text-gray-500">{item.slug}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.type === 'page' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'post' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'published' ? 'bg-green-100 text-green-800' :
                      item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex space-x-1">
                      {item.languages.map((lang) => (
                        <span key={lang} class="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          {lang === 'en' && '🇺🇸'}
                          {lang === 'jp' && '🇯🇵'} 
                          {lang === 'hk' && '🇭🇰'}
                          {lang}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastModified}
                    <div class="text-xs text-gray-400">by {item.author}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex space-x-2">
                      <a href={`/admin/content/edit/${item.id}`} class="text-blue-600 hover:text-blue-900">
                        <i class="fas fa-edit"></i>
                      </a>
                      <a href={`/admin/content/preview/${item.id}`} target="_blank" class="text-green-600 hover:text-green-900">
                        <i class="fas fa-eye"></i>
                      </a>
                      <button class="text-red-600 hover:text-red-900" onclick={`deleteContent('${item.id}')`}>
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div class="bg-white rounded-lg shadow-sm border p-4">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">1</span> to <span class="font-medium">5</span> of <span class="font-medium">5</span> results
          </div>
          <div class="flex space-x-2">
            <button disabled class="px-3 py-2 text-sm text-gray-500 bg-gray-100 rounded-lg cursor-not-allowed">
              Previous
            </button>
            <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button disabled class="px-3 py-2 text-sm text-gray-500 bg-gray-100 rounded-lg cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}