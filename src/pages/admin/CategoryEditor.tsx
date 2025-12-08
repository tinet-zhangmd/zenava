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
  cover_image_link?: string
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
                      id="upload-cover-btn"
                      class="text-gray-400 hover:text-gray-600 text-4xl cursor-pointer">
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
              </div>
            </div>

            {/* 栏目封面图跳转链接 */}
            <div class="flex items-start">
              <label class="w-32 pt-2 text-sm text-gray-600 text-right pr-4">
                封面图跳转链接
              </label>
              <div class="flex-1">
                <input 
                  type="url" 
                  id="category-cover-link" 
                  value={category?.cover_image_link || ''}
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="请输入封面图跳转链接（可选）"
                />
                <p class="text-xs text-gray-500 mt-1">点击封面图时跳转的链接地址</p>
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
        console.log('脚本开始执行');
        
        // 将变量定义在外部作用域，以便表单提交时也能访问
        let coverFileInput = null;
        let coverPreview = null;
        let previewImage = null;
        
        function initCoverUpload() {
          console.log('初始化封面图上传功能');
          coverFileInput = document.getElementById('category-cover-file');
          coverPreview = document.getElementById('cover-preview');
          previewImage = document.getElementById('preview-image');
          const removeCoverBtn = document.getElementById('remove-cover');
          const uploadCoverBtn = document.getElementById('upload-cover-btn');

          console.log('查找元素:', {
            coverFileInput: !!coverFileInput,
            uploadCoverBtn: !!uploadCoverBtn,
            coverPreview: !!coverPreview,
            previewImage: !!previewImage
          });

          if (!coverFileInput || !uploadCoverBtn) {
            console.error('找不到必要的元素');
            return;
          }

          // 点击上传按钮触发文件选择
          uploadCoverBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('点击上传按钮，触发文件选择');
            coverFileInput.click();
          });

          // 文件选择事件
          coverFileInput.addEventListener('change', function(e) {
            console.log('文件选择事件触发');
            const file = e.target.files[0];
            if (!file) {
              console.log('未选择文件');
              return;
            }
            
            console.log('选择的文件:', file.name, file.type, file.size);
            
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
            if (!validTypes.includes(file.type)) {
              alert('请上传 PNG、JPG 或 WebP 格式图片');
              if (coverFileInput) coverFileInput.value = '';
              return;
            }
            
            if (file.size > 30 * 1024 * 1024) {
              alert('文件不能超过 30MB');
              if (coverFileInput) coverFileInput.value = '';
              return;
            }
            
            console.log('开始读取文件');
            const reader = new FileReader();
            reader.onload = function(event) {
              console.log('文件读取成功');
              const result = event.target ? event.target.result : reader.result;
              if (previewImage && result) {
                previewImage.src = result;
                console.log('预览图片已设置');
              }
              if (coverPreview) {
                coverPreview.classList.remove('hidden');
                console.log('预览容器已显示');
              }
            };
            reader.onerror = function(error) {
              console.error('文件读取失败:', error);
              alert('图片读取失败，请重试');
            };
            reader.readAsDataURL(file);
          }, { once: false });

          // 删除图片按钮
          if (removeCoverBtn) {
            removeCoverBtn.addEventListener('click', function() {
              coverFileInput.value = '';
              coverPreview.classList.add('hidden');
              previewImage.src = '';
            });
          }
          
          console.log('事件监听器已绑定');
        }

        // 初始化（只初始化一次）
        let initialized = false;
        function tryInit() {
          if (initialized) return;
          const btn = document.getElementById('upload-cover-btn');
          const input = document.getElementById('category-cover-file');
          if (btn && input) {
            initCoverUpload();
            initialized = true;
            console.log('初始化完成');
          }
        }
        
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', tryInit);
        } else {
          tryInit();
        }
        
        // 备用方案：延迟初始化（如果第一次失败）
        setTimeout(function() {
          if (!initialized) {
            tryInit();
          }
        }, 100);

        document.getElementById('category-form')?.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const submitBtn = e.target.querySelector('[type="submit"]');
          const originalText = submitBtn.textContent;
          
          try {
            const categoryId = document.getElementById('category-id').value;
            let coverImagePath = '';
            let coverImageSize = 0;
            let coverImageType = '';
            
            // 重新获取 coverFileInput，确保能访问到
            const coverFileInput = document.getElementById('category-cover-file');
            const coverFile = coverFileInput ? coverFileInput.files[0] : null;
            if (coverFile) {
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
            } else if (categoryId) {
              // 编辑模式下，如果没有上传新图片，保留原有图片（不传 cover_image 字段）
              coverImagePath = undefined;
            }
            
            submitBtn.textContent = '保存中...';
            
            const formData = {
              sort_order: parseInt(document.getElementById('category-sort-order').value) || 0,
              name: document.getElementById('category-name').value,
              slug: document.getElementById('category-slug').value,
              description: document.getElementById('category-description').value || '',
              cover_image_size: coverImageSize || null,
              cover_image_type: coverImageType || null,
              cover_image_link: document.getElementById('category-cover-link').value || null,
              list_template: document.getElementById('category-list-template').value,
              detail_template: document.getElementById('category-list-template').value,
              is_visible: document.getElementById('category-is-visible').checked,
            };
            
            // 只有在有上传新图片或创建新栏目时才设置 cover_image
            if (coverImagePath !== undefined) {
              formData.cover_image = coverImagePath || null;
            }
            
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
