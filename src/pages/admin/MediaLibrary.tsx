interface MediaFile {
  id: string
  name: string
  url: string
  type: 'image' | 'video' | 'document'
  size: number
  uploadedAt: string
  uploadedBy: string
  tags: string[]
}

export function MediaLibrary() {
  // Mock media files
  const mediaFiles: MediaFile[] = [
    {
      id: '1',
      name: 'zenava-hero-bg.jpg',
      url: '/static/images/zenava-hero-bg.jpg',
      type: 'image',
      size: 2048576, // 2MB
      uploadedAt: '2024-01-15 10:30',
      uploadedBy: 'Admin',
      tags: ['hero', 'background', 'homepage']
    },
    {
      id: '2',
      name: 'ai-automation-demo.mp4',
      url: '/static/videos/ai-automation-demo.mp4',
      type: 'video',
      size: 15728640, // 15MB
      uploadedAt: '2024-01-14 16:45',
      uploadedBy: 'Admin',
      tags: ['demo', 'automation', 'ai']
    },
    {
      id: '3',
      name: 'product-brochure.pdf',
      url: '/static/documents/product-brochure.pdf',
      type: 'document',
      size: 1048576, // 1MB
      uploadedAt: '2024-01-13 14:20',
      uploadedBy: 'Admin',
      tags: ['brochure', 'product', 'marketing']
    },
    {
      id: '4',
      name: 'dashboard-screenshot.png',
      url: '/static/images/dashboard-screenshot.png',
      type: 'image',
      size: 512000, // 512KB
      uploadedAt: '2024-01-12 11:15',
      uploadedBy: 'Admin',
      tags: ['dashboard', 'screenshot', 'ui']
    }
  ]
  
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  function getFileIcon(type: string): string {
    switch (type) {
      case 'image': return 'fas fa-image text-blue-600'
      case 'video': return 'fas fa-video text-red-600'
      case 'document': return 'fas fa-file-pdf text-green-600'
      default: return 'fas fa-file text-gray-600'
    }
  }
  
  return (
    <div class="space-y-6">
      {/* Header */}
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Media Library</h2>
          <p class="text-gray-600">Manage images, videos, and documents for your website</p>
        </div>
        <div class="flex space-x-3">
          <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <i class="fas fa-upload mr-2"></i>
            Upload Files
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <i class="fas fa-folder-plus mr-2"></i>
            Create Folder
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <i class="fas fa-image text-blue-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Images</p>
              <p class="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <i class="fas fa-video text-red-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Videos</p>
              <p class="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <i class="fas fa-file-alt text-green-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Documents</p>
              <p class="text-2xl font-semibold text-gray-900">13</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <i class="fas fa-hdd text-purple-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Storage Used</p>
              <p class="text-2xl font-semibold text-gray-900">156MB</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upload Area */}
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">Upload New Files</h3>
        </div>
        <div class="p-6">
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
            <h4 class="text-lg font-medium text-gray-900 mb-2">Drop files here or click to browse</h4>
            <p class="text-gray-600 mb-4">Supported formats: JPG, PNG, GIF, MP4, PDF, DOC</p>
            <input type="file" multiple class="hidden" id="fileUpload" accept="image/*,video/*,.pdf,.doc,.docx" />
            <label for="fileUpload" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
              <i class="fas fa-upload mr-2"></i>
              Choose Files
            </label>
          </div>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Files</label>
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search media files..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">File Type</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Upload Date</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">View</label>
            <div class="flex space-x-2">
              <button class="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                <i class="fas fa-th mr-1"></i>Grid
              </button>
              <button class="flex-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                <i class="fas fa-list mr-1"></i>List
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Media Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mediaFiles.map((file) => (
          <div key={file.id} class="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            {/* File Preview */}
            <div class="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center">
              {file.type === 'image' ? (
                <img src={file.url} alt={file.name} class="w-full h-32 object-cover" />
              ) : (
                <i class={`${getFileIcon(file.type)} text-4xl`}></i>
              )}
            </div>
            
            {/* File Info */}
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-sm font-medium text-gray-900 truncate">{file.name}</h4>
                <div class="flex space-x-1">
                  <button class="text-blue-600 hover:text-blue-800 text-sm">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="text-gray-600 hover:text-gray-800 text-sm">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="text-red-600 hover:text-red-800 text-sm" onclick={`deleteMedia('${file.id}')`}>
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              
              <div class="space-y-1">
                <div class="flex justify-between text-xs text-gray-500">
                  <span>{file.type.toUpperCase()}</span>
                  <span>{formatFileSize(file.size)}</span>
                </div>
                <div class="text-xs text-gray-500">
                  Uploaded: {file.uploadedAt}
                </div>
                <div class="flex flex-wrap gap-1 mt-2">
                  {file.tags.map((tag) => (
                    <span key={tag} class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div class="mt-3 pt-3 border-t border-gray-100">
                <button class="w-full px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors">
                  <i class="fas fa-copy mr-1"></i>
                  Copy URL
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div class="bg-white rounded-lg shadow-sm border p-4">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">1</span> to <span class="font-medium">4</span> of <span class="font-medium">45</span> files
          </div>
          <div class="flex space-x-2">
            <button class="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <i class="fas fa-chevron-left mr-1"></i>Previous
            </button>
            <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">1</button>
            <button class="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
            <button class="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
            <button class="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              Next<i class="fas fa-chevron-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}