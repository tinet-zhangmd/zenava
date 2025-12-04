import { FC } from 'hono/jsx'

interface Category {
  id?: number
  sort_order: number
  name: string
  slug: string
  description?: string
  cover_image?: string
  cover_image_size?: number
  cover_image_type?: string
  list_template: string
  detail_template: string
  is_visible: boolean
}

interface CategoryEditorProps {
  category?: Category
  mode: 'create' | 'edit'
}

export const CategoryEditor: FC<CategoryEditorProps> = ({ category, mode }) => {
  const isEdit = mode === 'edit'
  
  return (
    <div>
      {/* 表单 */}
      <div class="bg-white border">
        {/* 头部：返回按钮 */}
        <div class="px-6 py-4 border-b">
          <a 
            href="/ticloudadmin/resource-categories"
            class="text-sm text-gray-600 hover:text-gray-900">
            ← 返回列表
          </a>
        </div>

        <form id="category-form" class="px-6 py-6">
          <input type="hidden" id="category-id" value={category?.id || ''} />
          
          <div class="space-y-6">
            {/* 栏目名称 */}
            <div class="flex items-start">
              <label class="w-32 pt-2 text-sm text-gray-600 text-right pr-4">
                <span class="text-red-500">* </span>栏目名称
              </label>
              <div class="flex-1">
                <input 
                  type="text" 
                  id="category-name" 
                  value={category?.name || ''}
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="请输入栏目名称"
                  required 
                />
              </div>
            </div>

            {/* 栏目标识 */}
            <div class="flex items-start">
              <label class="w-32 pt-2 text-sm text-gray-600 text-right pr-4">
                <span class="text-red-500">* </span>栏目标识
              </label>
              <div class="flex-1">
                <input 
                  type="text" 
                  id="category-slug" 
                  value={category?.slug || ''}
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="请输入栏目标识"
                  required 
                />
                <p class="text-xs text-gray-500 mt-1">用于 URL 路径，建议使用英文和数字</p>
              </div>
            </div>

            {/* 栏目描述 */}
            <div class="flex items-start">
              <label class="w-32 pt-2 text-sm text-gray-600 text-right pr-4">
                栏目描述
              </label>
              <div class="flex-1">
                <textarea 
                  id="category-description" 
                  rows="4"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="请输入栏目描述"
                >{category?.description || ''}</textarea>
              </div>
            </div>

            {/* 封面图片 */}
            <div class="flex items-start">
              <label class="w-32 pt-2 text-sm text-gray-600 text-right pr-4">
                栏目封面图
              </label>
              <div class="flex-1">
                <div class="border-2 border-dashed border-gray-300 rounded p-4">
                  <input 
                    type="file" 
                    id="category-cover-file" 
                    accept=".png,.jpg,.jpeg,.webp"
                    class="hidden"
                  />
                  <div class="flex items-center justify-center h-32">
                    <button
                      type="button"
                      onclick="document.getElementById('category-cover-file').click()"
                      class="text-gray-400 hover:text-gray-600 text-4xl">
                      +
                    </button>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-2">
                  请上传 大小不超过 <span class="text-red-500">30MB</span> 格式为 png/jpg/jpeg 的文件
                </p>
                
                {/* 预览 */}
                <div id="cover-preview" class={`${category?.cover_image ? 'mt-3' : 'hidden mt-3'}`}>
                  <img 
                    id="preview-image" 
                    src={category?.cover_image || ''} 
                    alt="预览" 
                    class="w-48 h-32 object-cover border" 
                  />
                  <button
                    type="button"
                    id="remove-cover"
                    class="mt-2 text-sm text-red-600 hover:text-red-800">
                    删除图片
                  </button>
                </div>

                {/* 或填写URL */}
                <div class="mt-3">
                  <p class="text-sm text-gray-600 mb-2">或填写图片链接</p>
                  <input 
                    type="url" 
                    id="category-cover-url" 
                    value={category?.cover_image || ''}
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                    placeholder="请输入图片URL"
                  />
                </div>
              </div>
            </div>

            {/* 分类模板 */}
            <div class="flex items-start">
              <label class="w-32 pt-2 text-sm text-gray-600 text-right pr-4">
                <span class="text-red-500">* </span>分类模板
              </label>
              <div class="flex-1">
                <select 
                  id="category-list-template" 
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                  required>
                  <option value="">请选择分类模板</option>
                  <option value="list_article" selected={category?.list_template === 'list_article'}>
                    list_article - 文章列表
                  </option>
                  <option value="list_video" selected={category?.list_template === 'list_video'}>
                    list_video - 视频列表
                  </option>
                  <option value="list_download" selected={category?.list_template === 'list_download'}>
                    list_download - 下载列表
                  </option>
                </select>
              </div>
            </div>

            {/* 排序 */}
            <div class="flex items-start">
              <label class="w-32 pt-2 text-sm text-gray-600 text-right pr-4">
                <span class="text-red-500">* </span>排序
              </label>
              <div class="flex-1">
                <input 
                  type="number" 
                  id="category-sort-order" 
                  value={category?.sort_order || 0}
                  class="w-32 px-3 py-2 text-sm border border-gray-300 rounded"
                  required 
                />
                <p class="text-xs text-gray-500 mt-1">数字越小越靠前</p>
              </div>
            </div>

            {/* 是否显示 */}
            <div class="flex items-start">
              <label class="w-32 pt-2 text-sm text-gray-600 text-right pr-4">
                是否显示
              </label>
              <div class="flex-1 pt-2">
                <label class="inline-flex items-center">
                  <input 
                    type="checkbox" 
                    id="category-is-visible" 
                    class="mr-2"
                    checked={category?.is_visible !== false}
                  />
                  <span class="text-sm text-gray-700">在前台显示此栏目</span>
                </label>
              </div>
            </div>
          </div>

          {/* 按钮 */}
          <div class="mt-8 pt-6 border-t flex items-center">
            <div class="w-32"></div>
            <div class="flex-1 flex space-x-3">
              <button 
                type="submit" 
                class="px-6 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded">
                {isEdit ? '保存' : '创建'}
              </button>
              <a
                href="/ticloudadmin/resource-categories"
                class="px-6 py-2 text-sm border border-gray-300 hover:bg-gray-50 rounded">
                取消
              </a>
            </div>
          </div>
        </form>
      </div>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        const coverFileInput = document.getElementById('category-cover-file');
        const coverPreview = document.getElementById('cover-preview');
        const previewImage = document.getElementById('preview-image');
        const removeCoverBtn = document.getElementById('remove-cover');

        coverFileInput?.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (!file) return;
          
          const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
          if (!validTypes.includes(file.type)) {
            alert('请上传 PNG、JPG 或 WebP 格式图片');
            coverFileInput.value = '';
            return;
          }
          
          if (file.size > 30 * 1024 * 1024) {
            alert('文件不能超过 30MB');
            coverFileInput.value = '';
            return;
          }
          
          const reader = new FileReader();
          reader.onload = (e) => {
            previewImage.src = e.target.result;
            coverPreview.classList.remove('hidden');
          };
          reader.readAsDataURL(file);
        });

        removeCoverBtn?.addEventListener('click', () => {
          coverFileInput.value = '';
          coverPreview.classList.add('hidden');
          document.getElementById('category-cover-url').value = '';
        });

        document.getElementById('category-form')?.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const submitBtn = e.target.querySelector('[type="submit"]');
          const originalText = submitBtn.textContent;
          
          try {
            const categoryId = document.getElementById('category-id').value;
            let coverImagePath = document.getElementById('category-cover-url').value || '';
            let coverImageSize = 0;
            let coverImageType = '';
            
            const coverFile = coverFileInput.files[0];
            if (coverFile && !coverImagePath) {
              submitBtn.disabled = true;
              submitBtn.textContent = '上传中...';
              
              const uploadFormData = new FormData();
              uploadFormData.append('file', coverFile);
              uploadFormData.append('category', 'categories');
              
              const uploadRes = await fetch('/api/admin/upload/image', {
                method: 'POST',
                body: uploadFormData
              });
              
              const uploadResult = await uploadRes.json();
              
              if (uploadResult.success) {
                coverImagePath = uploadResult.data.path;
                coverImageSize = uploadResult.data.size;
                coverImageType = uploadResult.data.type;
              } else {
                throw new Error(uploadResult.error || '上传失败');
              }
            }
            
            submitBtn.textContent = '保存中...';
            
            const formData = {
              sort_order: parseInt(document.getElementById('category-sort-order').value) || 0,
              name: document.getElementById('category-name').value,
              slug: document.getElementById('category-slug').value,
              description: document.getElementById('category-description').value || '',
              cover_image: coverImagePath,
              cover_image_size: coverImageSize || null,
              cover_image_type: coverImageType || null,
              list_template: document.getElementById('category-list-template').value,
              detail_template: document.getElementById('category-list-template').value,
              is_visible: document.getElementById('category-is-visible').checked,
            };
            
            const url = categoryId 
              ? '/api/admin/resource-categories/' + categoryId
              : '/api/admin/resource-categories';
            
            const res = await fetch(url, {
              method: categoryId ? 'PUT' : 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            });
            
            const result = await res.json();
            
            if (res.ok && result.success) {
              window.location.href = '/ticloudadmin/resource-categories';
            } else {
              throw new Error(result.error || '保存失败');
            }
          } catch (error) {
            alert('操作失败: ' + error.message);
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
      `}} />
    </div>
  )
}
