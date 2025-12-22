import { FC } from 'hono/jsx'

interface Banner {
  id: number
  category_id?: number | null
  category_name?: string | null  // 栏目分类名称（关联查询）
  category_slug?: string | null  // 栏目分类slug（关联查询）
  banner_type: 'text_image' | 'full_image'
  title: string
  sort_order: number
  status: 'draft' | 'published'
  image_url?: string
  full_image_url?: string
  background_url?: string
  created_at: string
  updated_at: string
}

interface ResourceBannerManagementProps {
  banners?: Banner[]
  currentPage?: number
  totalPages?: number
  total?: number
  basePath?: string  // 基础路径，默认为 /ticloudadmin/resource-banners
  apiPath?: string   // API路径，默认为 /api/resource-center/banners
}

export const ResourceBannerManagement: FC<ResourceBannerManagementProps> = ({ 
  banners = [],
  currentPage = 1,
  totalPages = 1,
  total = 0,
  basePath = '/ticloudadmin/resource-banners',
  apiPath = '/api/resource-center/banners'
}) => {
  const isCategoryBanner = apiPath.includes('category-banners')  // 判断是否为栏目Banner
  return (
    <div>
      {/* 操作栏 */}
      <div class="bg-white border-b mb-4">
        <div class="px-4 py-3 flex justify-between items-center">
          <div class="flex items-center space-x-3">
            {/* 批量操作 */}
            <select id="batch-action" class="px-3 py-1.5 text-sm border border-gray-300 rounded">
              <option value="">批量操作</option>
              <option value="delete">批量删除</option>
              <option value="publish">批量发布</option>
              <option value="draft">批量设为草稿</option>
            </select>
            <button 
              id="apply-batch-action" 
              class="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded">
              应用
            </button>

            {/* 添加按钮 */}
            <a 
              href={`${basePath}/new`}
              class="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded">
              添加新幻灯片
            </a>
          </div>

          {/* 搜索 */}
          <input 
            type="text" 
            id="search-banners"
            placeholder="搜索Banner..."
            class="px-3 py-1.5 text-sm w-64 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* 列表 */}
      <div class="bg-white border">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-2 w-10">
                <input type="checkbox" id="select-all" />
              </th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">ID</th>
              {isCategoryBanner && (
                <th class="px-4 py-2 text-left font-medium text-gray-600">栏目分类</th>
              )}
              <th class="px-4 py-2 text-left font-medium text-gray-600">排序/排版/按钮</th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">图片</th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">说明</th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {banners.length === 0 ? (
              <tr>
                <td colspan={isCategoryBanner ? 7 : 6} class="px-4 py-12 text-center text-gray-500">
                  <p class="mb-3">暂无Banner</p>
                  <a 
                    href={`${basePath}/new`}
                    class="inline-block px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded">
                    添加新幻灯片
                  </a>
                </td>
              </tr>
            ) : (
              banners.map((banner) => {
                const previewImage = banner.banner_type === 'full_image' 
                  ? banner.full_image_url 
                  : banner.image_url || banner.background_url
                
                const typeLabel = banner.banner_type === 'text_image' ? '文字+图片' : '整张大图'
                
                return (
                  <tr key={banner.id} class="border-b hover:bg-gray-50" data-banner-id={banner.id}>
                    <td class="px-4 py-2">
                      <input type="checkbox" class="banner-checkbox" value={banner.id} />
                    </td>
                    
                    <td class="px-4 py-2 text-gray-600">
                      #{banner.id}
                    </td>
                    
                    {isCategoryBanner && (
                      <td class="px-4 py-2">
                        <div class="text-xs">
                          {banner.category_name ? (
                            <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                              {banner.category_name}
                            </span>
                          ) : (
                            <span class="text-gray-400">未关联</span>
                          )}
                        </div>
                      </td>
                    )}
                    
                    <td class="px-4 py-2">
                      <div class="space-y-1">
                        <div class="text-xs text-gray-500">
                          排序: <span class="font-medium text-gray-700">{banner.sort_order}</span>
                        </div>
                        <div class="text-xs text-gray-500">
                          类型: <span class="font-medium text-blue-600">{typeLabel}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td class="px-4 py-2">
                      {previewImage ? (
                        <img 
                          src={previewImage} 
                          alt={banner.title}
                          class="w-32 h-16 object-cover border rounded"
                        />
                      ) : (
                        <div class="w-32 h-16 bg-gray-100 border rounded flex items-center justify-center">
                          <i class="fas fa-image text-gray-400"></i>
                        </div>
                      )}
                    </td>
                    
                    <td class="px-4 py-2">
                      <div class="font-medium text-gray-900">{banner.title}</div>
                      <div class="text-xs text-gray-500 mt-1">
                        状态: {banner.status === 'published' 
                          ? <span class="text-green-600">已发布</span> 
                          : <span class="text-yellow-600">草稿</span>
                        }
                      </div>
                    </td>
                    
                    <td class="px-4 py-2">
                      <div class="flex items-center space-x-2">
                        <a 
                          href={`${basePath}/edit/${banner.id}`}
                          class="text-blue-600 hover:text-blue-800 text-xs">
                          编辑
                        </a>
                        <button 
                          class="delete-banner text-red-600 hover:text-red-800 text-xs"
                          data-banner-id={banner.id}
                          data-base-path={basePath}
                          data-api-path={apiPath}>
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <div class="mt-4 flex items-center justify-between">
          <div class="text-sm text-gray-600">
            共 {total} 条记录，第 {currentPage} / {totalPages} 页
          </div>
          <div class="flex items-center space-x-2">
            {currentPage > 1 && (
              <a 
                href={`${basePath}?page=${currentPage - 1}`}
                class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                上一页
              </a>
            )}
            {currentPage < totalPages && (
              <a 
                href={`${basePath}?page=${currentPage + 1}`}
                class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                下一页
              </a>
            )}
          </div>
        </div>
      )}

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // 全选/取消全选
            const selectAll = document.getElementById('select-all');
            const checkboxes = document.querySelectorAll('.banner-checkbox');
            
            if (selectAll) {
              selectAll.addEventListener('change', function() {
                checkboxes.forEach(cb => cb.checked = this.checked);
              });
            }

            // 批量操作
            const batchActionBtn = document.getElementById('apply-batch-action');
            const batchActionSelect = document.getElementById('batch-action');
            
            if (batchActionBtn && batchActionSelect) {
              batchActionBtn.addEventListener('click', async function() {
                const action = batchActionSelect.value;
                if (!action) {
                  alert('请选择操作');
                  return;
                }
                
                const selected = Array.from(checkboxes)
                  .filter(cb => cb.checked)
                  .map(cb => cb.value);
                
                if (selected.length === 0) {
                  alert('请至少选择一项');
                  return;
                }
                
                if (!confirm(\`确定要对选中的 \${selected.length} 项执行 "\${batchActionSelect.options[batchActionSelect.selectedIndex].text}" 操作吗?\`)) {
                  return;
                }
                
                const apiPath = '${apiPath}';
                
                try {
                  const response = await fetch(apiPath + '/batch', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action, ids: selected })
                  });
                  
                  const result = await response.json();
                  
                  if (result.success) {
                    alert('操作成功');
                    window.location.reload();
                  } else {
                    alert('操作失败: ' + (result.message || '未知错误'));
                  }
                } catch (error) {
                  alert('操作失败: ' + error.message);
                }
              });
            }

            // 删除单个Banner
            document.querySelectorAll('.delete-banner').forEach(btn => {
              btn.addEventListener('click', async function() {
                const bannerId = this.dataset.bannerId;
                
                if (!confirm('确定要删除这个Banner吗?')) {
                  return;
                }
                
                const basePath = this.dataset.basePath || '/ticloudadmin/resource-banners';
                
                const apiPath = this.dataset.apiPath || '${apiPath}';
                
                try {
                  const response = await fetch(\`\${apiPath}/\${bannerId}\`, {
                    method: 'DELETE'
                  });
                  
                  const result = await response.json();
                  
                  if (result.success) {
                    alert('删除成功');
                    window.location.reload();
                  } else {
                    alert('删除失败: ' + (result.message || '未知错误'));
                  }
                } catch (error) {
                  alert('删除失败: ' + error.message);
                }
              });
            });

            // 搜索功能
            const searchInput = document.getElementById('search-banners');
            const basePath = '${basePath}';
            if (searchInput) {
              let searchTimeout;
              searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                  const keyword = this.value.trim();
                  if (keyword) {
                    window.location.href = basePath + '?search=' + encodeURIComponent(keyword);
                  } else {
                    window.location.href = basePath;
                  }
                }, 500);
              });
            }
          })();
        `
      }} />
    </div>
  )
}

