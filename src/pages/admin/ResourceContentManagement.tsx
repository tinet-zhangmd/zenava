import { FC } from 'hono/jsx'

interface Content {
  id: number
  category_id: number
  category_name: string
  title: string
  cover_image?: string
  author?: string
  published_at: string
  views: number
  status: 'draft' | 'unpublished' | 'published'
  is_featured?: boolean | number
  is_hot?: boolean | number
}

interface Category {
  id: number
  name: string
}

interface ResourceContentManagementProps {
  contents?: Content[]
  categories?: Category[]
  currentPage?: number
  totalPages?: number
  total?: number
}

export const ResourceContentManagement: FC<ResourceContentManagementProps> = ({ 
  contents = [], 
  categories = [],
  currentPage = 1,
  totalPages = 1,
  total = 0
}) => {
  return (
    <div class="p-4">
      {/* 操作栏 */}
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          {/* 发布文章按钮 */}
          <a 
            href="/ticloudadmin/resource-contents/new"
            class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors inline-flex items-center">
            <i class="fas fa-plus mr-2"></i>
            发布文章
          </a>
          
          {/* 批量操作下拉 */}
          <select 
            id="batch-action" 
            class="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="">批量操作</option>
            <option value="feature">批量推荐</option>
            <option value="unfeature">批量取消推荐</option>
            <option value="hot">批量热门</option>
            <option value="unhot">批量取消热门</option>
            <option value="publish">批量发布</option>
            <option value="draft">批量草稿</option>
                  <option value="delete">批量删除</option>
                </select>
              </div>

        {/* 筛选按钮 */}
              <button 
          id="filter-btn"
          class="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors inline-flex items-center">
          <i class="fas fa-filter mr-2"></i>
          筛选
              </button>
          </div>

      {/* 筛选面板（默认隐藏） */}
      <div id="filter-panel" class="mb-4 bg-white rounded border border-gray-200 p-4 hidden">
        <div class="grid grid-cols-3 gap-4">
          {/* 分类栏目筛选 */}
          <div>
            <label class="block text-sm text-gray-600 mb-1">分类栏目</label>
            <select 
              id="filter-category"
              class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">全部栏目</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

          {/* 状态筛选 */}
          <div>
            <label class="block text-sm text-gray-600 mb-1">状态</label>
            <select 
              id="filter-status"
              class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">全部状态</option>
              <option value="draft">草稿</option>
              <option value="unpublished">未发布</option>
                <option value="published">已发布</option>
              </select>
            </div>

          {/* 搜索 */}
          <div>
            <label class="block text-sm text-gray-600 mb-1">搜索</label>
                <input 
                  type="text" 
              id="filter-search"
              placeholder="标题/作者"
              class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mt-4">
          {/* 推荐筛选 */}
          <div>
            <label class="block text-sm text-gray-600 mb-1">推荐</label>
            <select 
              id="filter-featured"
              class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">全部</option>
              <option value="1">已推荐</option>
              <option value="0">未推荐</option>
            </select>
          </div>

          {/* 热门筛选 */}
          <div>
            <label class="block text-sm text-gray-600 mb-1">热门</label>
            <select 
              id="filter-hot"
              class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">全部</option>
              <option value="1">热门</option>
              <option value="0">非热门</option>
            </select>
          </div>
        </div>

        <div class="mt-3 flex justify-end space-x-2">
          <button 
            id="reset-filter-btn"
            class="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">
            重置
          </button>
          <button 
            id="apply-filter-btn"
            class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            应用筛选
          </button>
        </div>
      </div>

      {/* 列表表格 */}
      <div class="bg-white rounded border border-gray-200 overflow-hidden">
        <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
              <th class="w-8 px-3 py-2">
                <input type="checkbox" id="select-all" class="rounded" />
                </th>
              <th class="px-3 py-2 text-left text-gray-600 font-medium">标题</th>
              <th class="px-3 py-2 text-left text-gray-600 font-medium w-20">缩略图</th>
              <th class="px-3 py-2 text-left text-gray-600 font-medium w-24">发布人</th>
              <th class="px-3 py-2 text-left text-gray-600 font-medium w-32">分类栏目</th>
              <th class="px-3 py-2 text-left text-gray-600 font-medium w-32">发布时间</th>
              <th class="px-3 py-2 text-left text-gray-600 font-medium w-24">访问量</th>
              <th class="px-3 py-2 text-center text-gray-600 font-medium w-20">推荐</th>
              <th class="px-3 py-2 text-center text-gray-600 font-medium w-20">热门</th>
              <th class="px-3 py-2 text-center text-gray-600 font-medium w-32">操作</th>
              </tr>
            </thead>
          <tbody>
            {contents.length > 0 ? (
                contents.map((content) => (
                <tr key={content.id} class="border-b border-gray-100 hover:bg-gray-50">
                  {/* 选择框 */}
                  <td class="px-3 py-3">
                      <input 
                        type="checkbox" 
                      class="content-checkbox rounded" 
                      data-id={content.id} 
                      />
                    </td>
                  
                  {/* 标题 */}
                  <td class="px-3 py-3">
                    <a 
                      href={`/ticloudadmin/resource-contents/edit/${content.id}`}
                      class="text-gray-900 hover:text-blue-600 font-medium">
                      {content.title}
                    </a>
                    {content.status === 'draft' && (
                      <span class="ml-2 text-xs text-gray-500">[草稿]</span>
                    )}
                  </td>
                  
                  {/* 缩略图 */}
                  <td class="px-3 py-3">
                    {content.cover_image ? (
                        <img 
                        src={content.cover_image} 
                          alt={content.title}
                        class="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                      <div class="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <i class="fas fa-image text-gray-400 text-xs"></i>
                        </div>
                      )}
                    </td>
                  
                  {/* 发布人 */}
                  <td class="px-3 py-3 text-gray-600">
                    {content.author || '-'}
                    </td>
                  
                  {/* 分类栏目 */}
                  <td class="px-3 py-3 text-gray-600">
                        {content.category_name}
                    </td>
                  
                  {/* 发布时间 */}
                  <td class="px-3 py-3 text-gray-600">
                    {new Date(content.published_at).toLocaleDateString('zh-CN')}
                    </td>
                  
                  {/* 访问量 */}
                  <td class="px-3 py-3 text-gray-600">
                    {content.views}
                  </td>
                  
                  {/* 推荐 */}
                  <td class="px-3 py-3 text-center text-gray-600">
                    {(content.is_featured === true || content.is_featured === 1) ? '是' : '否'}
                  </td>
                  
                  {/* 热门 */}
                  <td class="px-3 py-3 text-center text-gray-600">
                    {(content.is_hot === true || content.is_hot === 1) ? (
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <i class="fas fa-fire mr-1"></i> 热门
                      </span>
                    ) : (
                      <span class="text-gray-400">否</span>
                    )}
                  </td>
                  
                  {/* 操作 */}
                  <td class="px-3 py-3 text-center">
                    <div class="flex items-center justify-center space-x-2">
                      <a
                        href={`/ticloudadmin/resource-contents/edit/${content.id}`}
                        class="text-blue-600 hover:text-blue-800"
                          title="编辑">
                          <i class="fas fa-edit"></i>
                      </a>
                        <button 
                        class="text-red-600 hover:text-red-800 delete-content-btn"
                        data-id={content.id}
                        data-title={content.title}
                          title="删除">
                          <i class="fas fa-trash"></i>
                        </button>
                      <button
                        class="text-gray-600 hover:text-gray-800 copy-content-btn"
                        data-id={content.id}
                        title="复制">
                        <i class="fas fa-copy"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={10} class="px-3 py-12 text-center text-gray-500">
                  <i class="fas fa-inbox text-4xl mb-2 text-gray-300"></i>
                  <p>暂无内容</p>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <div class="flex justify-between items-center mt-4 px-4 py-3 bg-white rounded border border-gray-200 text-sm">
          <div class="text-gray-600">
            显示 {Math.min(total, (currentPage - 1) * 10 + 1)} 到 {Math.min(total, currentPage * 10)} 条，共 {total} 条
          </div>
          <nav class="flex items-center space-x-1">
            <a
              href={`/ticloudadmin/resource-contents?page=${currentPage - 1}`}
              class={`px-3 py-1 rounded ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}>
              上一页
            </a>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (page === currentPage) {
                return (
                  <span key={page} class="px-3 py-1 rounded bg-gray-200 text-gray-800 font-medium">
                    {page}
                  </span>
                )
              }
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <a
                    key={page}
                    href={`/ticloudadmin/resource-contents?page=${page}`}
                    class="px-3 py-1 rounded text-gray-700 hover:bg-gray-100">
                    {page}
                  </a>
                )
              }
              if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} class="px-2">...</span>
              }
              return null
            })}
            <a
              href={`/ticloudadmin/resource-contents?page=${currentPage + 1}`}
              class={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}>
              下一页
            </a>
          </nav>
        </div>
      )}

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // 从 URL 参数初始化筛选条件
          function initializeFilters() {
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get('category');
            const status = urlParams.get('status');
            const search = urlParams.get('search');
            const featured = urlParams.get('is_featured');
            const hot = urlParams.get('is_hot');
            
            if (category) {
              const categorySelect = document.getElementById('filter-category');
              if (categorySelect) categorySelect.value = category;
            }
            if (status) {
              const statusSelect = document.getElementById('filter-status');
              if (statusSelect) statusSelect.value = status;
            }
            if (search) {
              const searchInput = document.getElementById('filter-search');
              if (searchInput) searchInput.value = search;
            }
            if (featured !== null) {
              const featuredSelect = document.getElementById('filter-featured');
              if (featuredSelect) featuredSelect.value = featured;
            }
            if (hot !== null) {
              const hotSelect = document.getElementById('filter-hot');
              if (hotSelect) hotSelect.value = hot;
            }
          }
          
          // 页面加载时初始化筛选条件
          initializeFilters();
          
          // 筛选面板切换
          document.getElementById('filter-btn')?.addEventListener('click', function() {
            const panel = document.getElementById('filter-panel');
            // 打开面板时重新初始化筛选条件（确保从 URL 读取最新值）
            initializeFilters();
            panel.classList.toggle('hidden');
          });
          
          // 全选
          document.getElementById('select-all')?.addEventListener('change', function(e) {
            const checkboxes = document.querySelectorAll('.content-checkbox');
            checkboxes.forEach(cb => cb.checked = e.target.checked);
          });
              
          // 批量操作
          document.getElementById('batch-action')?.addEventListener('change', async function(e) {
            if (!e.target.value) return;
            
            const selected = Array.from(document.querySelectorAll('.content-checkbox:checked'))
              .map(cb => cb.dataset.id);
            
            if (selected.length === 0) {
              alert('请先选择要操作的内容');
              e.target.value = '';
              return;
            }
            
            const action = e.target.value;
            const actionNames = {
              'feature': '批量推荐',
              'unfeature': '批量取消推荐',
              'hot': '批量热门',
              'unhot': '批量取消热门',
              'publish': '批量发布',
              'draft': '批量草稿',
              'delete': '批量删除'
            };
            
            // 批量删除功能
            if (action === 'delete') {
              if (!confirm(\`确定要删除选中的 \${selected.length} 项内容吗？此操作不可恢复。\`)) {
                e.target.value = '';
                return;
              }
              
              try {
                const response = await fetch('/api/admin/resource-contents/batch-delete', {
                  method: 'POST',
              headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ ids: selected })
                });
                
                const result = await response.json();
                
                if (result.success) {
                  alert(\`成功删除 \${result.deleted || selected.length} 项内容\`);
              window.location.reload();
                } else {
                  alert('批量删除失败：' + (result.error || '未知错误'));
                }
              } catch (error) {
                console.error('批量删除失败:', error);
                alert('批量删除失败：' + error.message);
              }
            } else if (['feature', 'unfeature', 'hot', 'unhot', 'publish', 'draft'].includes(action)) {
              // 批量操作（推荐、热门、发布状态）
              if (!confirm(\`确定要对选中的 \${selected.length} 项内容执行"\${actionNames[action]}"操作吗？\`)) {
                e.target.value = '';
                return;
              }
              
              try {
                const response = await fetch('/api/resource-center/contents/batch', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ action: action, ids: selected })
                });
                
                // 检查响应状态
                if (!response.ok) {
                  const text = await response.text();
                  console.error('批量操作响应错误:', response.status, text);
                  throw new Error(\`HTTP错误 \${response.status}: \${text.substring(0, 100)}\`);
                }
                
                // 检查 Content-Type
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                  const text = await response.text();
                  console.error('批量操作返回非JSON:', contentType, text);
                  throw new Error('服务器返回了非JSON格式的响应');
                }
                
                const result = await response.json();
                
                if (result.success) {
                  alert(\`成功执行"\${actionNames[action]}"操作\`);
                  window.location.reload();
                } else {
                  alert('批量操作失败：' + (result.error || '未知错误'));
                }
              } catch (error) {
                console.error('批量操作失败:', error);
                alert('批量操作失败：' + (error.message || '未知错误'));
              }
            } else {
              // 其他批量操作暂未实现
              if (confirm(\`确定要对选中的 \${selected.length} 项内容执行"\${actionNames[action] || action}"操作吗？\`)) {
                alert('该功能正在开发中...');
              }
            }
            
            e.target.value = '';
          });

          // 删除单个内容
          document.querySelectorAll('.delete-content-btn').forEach(btn => {
            btn.addEventListener('click', async function(e) {
              e.preventDefault();
              const id = this.dataset.id;
              const title = this.dataset.title;
              
              if (!confirm(\`确定要删除内容"\${title}"吗？此操作不可恢复。\`)) {
            return;
          }
          
          try {
                const response = await fetch(\`/api/admin/resource-contents/\${id}\`, {
                  method: 'DELETE'
                });
                
                const result = await response.json();
            
                if (result.success) {
                  alert('删除成功');
              window.location.reload();
            } else {
                  alert('删除失败：' + (result.error || '未知错误'));
            }
          } catch (error) {
                console.error('删除失败:', error);
                alert('删除失败：' + error.message);
          }
            });
        });

          // 复制内容
          document.querySelectorAll('.copy-content-btn').forEach(btn => {
            btn.addEventListener('click', function() {
              const id = this.dataset.id;
              alert('复制功能开发中... ID: ' + id);
              // TODO: 实现复制功能
            });
          });
          
          // 筛选功能
          document.getElementById('apply-filter-btn')?.addEventListener('click', function() {
            const category = document.getElementById('filter-category').value;
            const status = document.getElementById('filter-status').value;
            const search = document.getElementById('filter-search').value;
            const featured = document.getElementById('filter-featured').value;
            const hot = document.getElementById('filter-hot').value;
          
            const params = new URLSearchParams();
            if (category) params.append('category', category);
            if (status) params.append('status', status);
            if (search) params.append('search', search);
            if (featured) params.append('is_featured', featured);
            if (hot) params.append('is_hot', hot);
            
            window.location.href = '/ticloudadmin/resource-contents?' + params.toString();
          });
          
          document.getElementById('reset-filter-btn')?.addEventListener('click', function() {
            window.location.href = '/ticloudadmin/resource-contents';
          });
        `
      }} />
    </div>
  )
}
