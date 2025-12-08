import { FC } from 'hono/jsx'

interface Category {
  id: number
  name: string
  category_template: string
}

interface Content {
  id?: number
  category_id: number
  title: string
  content: string
  author?: string
  cover_image?: string
  cover_image_size?: number
  cover_image_type?: string
  video_file?: string
  video_size?: number
  video_type?: string
  video_description?: string
  attachment_file?: string
  attachment_size?: number
  attachment_type?: string
  attachment_name?: string
  reading_time?: number
  status: 'draft' | 'unpublished' | 'published'
  published_at?: string
  sort_order?: number
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
}

interface ContentEditorProps {
  content?: Content | null
  categories?: Category[]
  mode: 'create' | 'edit'
  defaultAuthor?: string
}

export const ContentEditor: FC<ContentEditorProps> = ({ 
  content = null, 
  categories = [],
  mode,
  defaultAuthor = ''
}) => {
  const isEdit = mode === 'edit'
  const title = isEdit ? '编辑内容' : '发布新内容'
  
  return (
    <div class="p-4">
      {/* 页面顶部操作区 */}
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <a 
          href="/ticloudadmin/resource-contents"
          class="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <i class="fas fa-arrow-left mr-2"></i>
          返回列表
        </a>
      </div>

      {/* 表单卡片 */}
      <div class="bg-white rounded border border-gray-200 p-6">
        <form id="content-form" class="space-y-6" data-default-author={defaultAuthor}>
          <input type="hidden" id="content-id" value={content?.id || ''} />
          
          {/* 1. 标题 */}
          <div class="flex items-start">
            <label for="content-title" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
              <span class="text-red-500">*</span> 标题
            </label>
            <div class="flex-1">
              <input 
                type="text" 
                id="content-title" 
                class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="输入内容标题"
                value={content?.title || ''}
                required 
              />
            </div>
          </div>

          {/* 2. 缩略图 */}
          <div class="flex items-start">
            <label for="content-cover" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
              缩略图
            </label>
            <div class="flex-1">
              <div class="flex items-start space-x-4">
                {/* 图片预览 */}
                <div id="cover-preview-container" class={content?.cover_image ? '' : 'hidden'}>
                  <img 
                    id="cover-preview" 
                    src={content?.cover_image || ''} 
                    alt="封面预览"
                    class="w-32 h-32 object-cover rounded border border-gray-300"
                  />
                  <button 
                    type="button" 
                    id="remove-cover-btn"
                    class="mt-2 text-xs text-red-600 hover:text-red-800">
                    删除图片
                  </button>
                </div>
                
                {/* 上传区域 */}
                <div class="flex-1">
                  <input 
                    type="file" 
                    id="content-cover" 
                    accept="image/png,image/jpeg,image/jpg"
                    class="hidden"
                  />
                  <button 
                    type="button" 
                    id="upload-cover-btn"
                    class="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                    选择图片
                  </button>
                  <p class="mt-2 text-xs text-gray-500">
                    建议尺寸：800x600，支持 PNG/JPG/JPEG，大小不超过 5MB
                  </p>
                  
                  {/* 隐藏字段存储图片信息 */}
                  <input type="hidden" id="cover-image-url" value={content?.cover_image || ''} />
                  <input type="hidden" id="cover-image-size" value={content?.cover_image_size || ''} />
                  <input type="hidden" id="cover-image-type" value={content?.cover_image_type || ''} />
                </div>
              </div>
            </div>
          </div>

          {/* 3. 发布人 */}
          <div class="flex items-center">
            <label for="content-author" class="w-32 text-sm text-gray-600 text-right mr-4">
              发布人
            </label>
            <input 
              type="text" 
              id="content-author" 
              class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="作者/发布人名称（留空则使用当前登录账号）"
              value={content?.author || defaultAuthor}
            />
          </div>

          {/* 4. 分类栏目 */}
          <div class="flex items-center">
            <label for="content-category" class="w-32 text-sm text-gray-600 text-right mr-4">
              <span class="text-red-500">*</span> 分类栏目
            </label>
            <select 
              id="content-category" 
              class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">请选择栏目</option>
              {categories.map(cat => (
                <option 
                  key={cat.id} 
                  value={cat.id}
                  data-template={cat.category_template}
                  selected={content?.category_id === cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* 5. 发布时间 */}
          <div class="flex items-center">
            <label for="content-published-at" class="w-32 text-sm text-gray-600 text-right mr-4">
              发布时间
            </label>
            <div class="flex-1 flex items-center">
              <input 
                type="datetime-local" 
                id="content-published-at" 
                class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={content?.published_at ? new Date(content.published_at).toISOString().slice(0, 16) : ''}
              />
              <span class="ml-2 text-xs text-gray-500">留空则使用当前时间</span>
            </div>
          </div>

          {/* 6. 访问量 */}
          <div class="flex items-center">
            <label for="content-views" class="w-32 text-sm text-gray-600 text-right mr-4">
              访问量
            </label>
            <div class="flex-1 flex items-center">
              <input 
                type="number" 
                id="content-views" 
                class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="默认为 0"
                value="0"
                min="0"
              />
              <span class="ml-2 text-xs text-gray-500">刷新/打开页面都算是一次</span>
            </div>
          </div>

          {/* 7. 阅读时间（新增） */}
          <div class="flex items-center">
            <label for="content-reading-time" class="w-32 text-sm text-gray-600 text-right mr-4">
              阅读时间
            </label>
            <div class="flex-1 flex items-center">
              <input 
                type="number" 
                id="content-reading-time" 
                class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="预计阅读时长"
                value={content?.reading_time || ''}
                min="0"
              />
              <span class="ml-2 text-xs text-gray-500">单位：min</span>
            </div>
          </div>

          {/* 8. 推荐开关 */}
          <div class="flex items-center">
            <label for="content-featured" class="w-32 text-sm text-gray-600 text-right mr-4">
              推荐
            </label>
            <div class="flex-1 flex items-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  id="content-featured" 
                  class="sr-only peer"
                  {...(content?.is_featured ? { checked: true } : {})}
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span id="featured-label" class="ml-3 text-sm text-gray-700">
                  {content?.is_featured ? '是' : '否'}
                </span>
              </label>
            </div>
          </div>

          {/* 9. 内容 - 富文本编辑器 */}
          <div class="flex items-start">
            <label for="content-body" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
              <span class="text-red-500">*</span> 内容
            </label>
            <div class="flex-1">
              <div id="quill-editor" class="bg-white border border-gray-300 rounded" style="min-height: 400px;">
                {content?.content && (
                  <div dangerouslySetInnerHTML={{ __html: content.content }} />
                )}
              </div>
              <input type="hidden" id="content-body" value={content?.content || ''} />
              <p class="mt-2 text-xs text-gray-500">
                支持富文本编辑，可插入图片、视频、链接等
              </p>
            </div>
          </div>

          {/* 9. 上传视频（条件显示） */}
          <div id="video-upload-field" class="flex items-start hidden">
            <label for="content-video" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
              <span class="text-red-500 video-required">*</span> 上传视频
            </label>
            <div class="flex-1">
              {/* 视频预览 */}
              <div id="video-preview-container" class={content?.video_file ? 'mb-4' : 'hidden mb-4'}>
                <div class="bg-black rounded-lg overflow-hidden" style="max-width: 640px;">
                  <video 
                    id="video-preview" 
                    controls
                    preload="metadata"
                    playsinline
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    class="w-full h-auto"
                    style="max-height: 480px; background: #000;">
                    {content?.video_file && <source src={content.video_file} type="video/mp4" />}
                    您的浏览器不支持视频播放
                  </video>
                </div>
                <div class="mt-2 flex items-center gap-2">
                  <button 
                    type="button" 
                    id="remove-video-btn"
                    class="px-3 py-1 text-xs text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50 transition-colors">
                    <i class="fas fa-trash mr-1"></i>
                    删除视频
                  </button>
                  <span id="video-info" class="text-xs text-gray-500"></span>
                </div>
              </div>
              
              {/* 上传区域 */}
              <div>
                <input 
                  type="file" 
                  id="content-video" 
                  accept="video/mp4,video/avi,video/mov,video/wmv,video/webm"
                  class="hidden"
                />
                <button 
                  type="button" 
                  id="upload-video-btn"
                  class="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 inline-flex items-center">
                  <i class="fas fa-video mr-2"></i>
                  选择视频
                </button>
                <p class="mt-2 text-xs text-gray-500">
                  支持 MP4/AVI/MOV/WMV/WebM 格式，建议使用 MP4 格式以获得最佳兼容性，大小不超过 100MB
                </p>
                
                {/* 隐藏字段存储视频信息 */}
                <input type="hidden" id="video-file-url" value={content?.video_file || ''} />
                <input type="hidden" id="video-file-size" value={content?.video_size || ''} />
                <input type="hidden" id="video-file-type" value={content?.video_type || ''} />
              </div>
            </div>
          </div>

          {/* 10. 视频简介（条件显示，仅视频模板） */}
          <div id="video-description-field" class="flex items-start hidden">
            <label for="content-video-description" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
              视频简介
            </label>
            <div class="flex-1">
              <textarea 
                id="content-video-description" 
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-vertical"
                placeholder="输入视频简介，向观众介绍视频的主要内容..."
              >{content?.video_description || ''}</textarea>
              <p class="mt-1 text-xs text-gray-500">
                简要描述视频内容，帮助观众了解视频主题（可选）
              </p>
            </div>
          </div>

          {/* 11. 上传附件（条件显示） */}
          <div id="attachment-upload-field" class="flex items-start hidden">
            <label for="content-attachment" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
              <span class="text-red-500 attachment-required">*</span> 上传附件
            </label>
            <div class="flex-1">
              <div class="flex items-start space-x-4">
                {/* 附件信息 */}
                <div id="attachment-preview-container" class={content?.attachment_file ? '' : 'hidden'}>
                  <div class="p-3 border border-gray-300 rounded bg-gray-50">
                    <div class="flex items-center">
                      <i class="fas fa-file text-2xl text-blue-500 mr-3"></i>
                      <div class="flex-1">
                        <a 
                          id="attachment-link" 
                          href={content?.attachment_file || '#'} 
                          download={content?.attachment_name || ''}
                          target="_blank"
                          class="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                          <i class="fas fa-download mr-1"></i>
                          <span id="attachment-name">{content?.attachment_name || ''}</span>
                        </a>
                        <p id="attachment-size" class="text-xs text-gray-500 mt-1">
                          {content?.attachment_size ? `${(content.attachment_size / 1024 / 1024).toFixed(2)} MB` : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    id="remove-attachment-btn"
                    class="mt-2 px-3 py-1 text-xs text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50 transition-colors">
                    <i class="fas fa-trash mr-1"></i>
                    删除附件
                  </button>
                </div>
                
                {/* 上传区域 */}
                <div class="flex-1">
                  <input 
                    type="file" 
                    id="content-attachment" 
                    accept=".xls,.xlsx,.doc,.docx,.pdf,.zip,.rar,.ppt,.pptx"
                    class="hidden"
                  />
                  <button 
                    type="button" 
                    id="upload-attachment-btn"
                    class="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                    选择附件
                  </button>
                  <p class="mt-2 text-xs text-gray-500">
                    支持 XLS/XLSX/DOC/DOCX/PDF/ZIP/RAR/PPT/PPTX，大小不超过 50MB
                  </p>
                  
                  {/* 隐藏字段存储附件信息 */}
                  <input type="hidden" id="attachment-file-url" value={content?.attachment_file || ''} />
                  <input type="hidden" id="attachment-file-size" value={content?.attachment_size || ''} />
                  <input type="hidden" id="attachment-file-type" value={content?.attachment_type || ''} />
                  <input type="hidden" id="attachment-file-name" value={content?.attachment_name || ''} />
                </div>
              </div>
            </div>
          </div>

          {/* 11. 状态 */}
          <div class="flex items-center">
            <label for="content-status" class="w-32 text-sm text-gray-600 text-right mr-4">
              <span class="text-red-500">*</span> 状态
            </label>
            <select 
              id="content-status" 
              class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required>
              <option value="draft" selected={content?.status === 'draft'}>草稿</option>
              <option value="unpublished" selected={content?.status === 'unpublished'}>未发布</option>
              <option value="published" selected={content?.status === 'published'}>已发布</option>
            </select>
          </div>

          {/* 12. 排序 */}
          <div class="flex items-center">
            <label for="content-sort" class="w-32 text-sm text-gray-600 text-right mr-4">
              排序
            </label>
            <input 
              type="number" 
              id="content-sort" 
              class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="数字越小越靠前"
              value={content?.sort_order || 0}
              min="0"
            />
          </div>

          {/* SEO 设置（可折叠） */}
          <div class="border-t border-gray-200 pt-6">
            <button 
              type="button" 
              id="toggle-seo-btn"
              class="flex items-center text-sm text-gray-600 hover:text-gray-900">
              <i class="fas fa-chevron-right mr-2" id="seo-icon"></i>
              SEO 设置（可选）
            </button>
            
            <div id="seo-fields" class="mt-4 space-y-6 hidden">
              {/* SEO 标题 */}
              <div class="flex items-center">
                <label for="content-meta-title" class="w-32 text-sm text-gray-600 text-right mr-4">
                  SEO 标题
                </label>
                <input 
                  type="text" 
                  id="content-meta-title" 
                  class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="留空则使用内容标题"
                  value={content?.meta_title || ''}
                  maxlength="60"
                />
              </div>

              {/* SEO 描述 */}
              <div class="flex items-start">
                <label for="content-meta-description" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
                  SEO 描述
                </label>
                <textarea 
                  id="content-meta-description" 
                  rows="3"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="用于搜索引擎显示的描述"
                  maxlength="160">{content?.meta_description || ''}</textarea>
              </div>

              {/* SEO 关键词 */}
              <div class="flex items-center">
                <label for="content-meta-keywords" class="w-32 text-sm text-gray-600 text-right mr-4">
                  SEO 关键词
                </label>
                <input 
                  type="text" 
                  id="content-meta-keywords" 
                  class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="用逗号分隔"
                  value={content?.meta_keywords || ''}
                />
              </div>
            </div>
          </div>

          {/* 表单操作按钮 */}
          <div class="flex justify-start pt-6 border-t border-gray-200">
            <div class="w-32 mr-4"></div>
            <div class="flex space-x-2">
              <button 
                type="submit" 
                class="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                {isEdit ? '保存' : '发布'}
              </button>
              {!isEdit && (
                <button 
                  type="button" 
                  id="save-draft-btn"
                  class="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
                  存为草稿
                </button>
              )}
              <a 
                href="/ticloudadmin/resource-contents"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors inline-block">
                取消
              </a>
            </div>
          </div>
        </form>
      </div>

      {/* Quill CSS */}
      <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
      
      {/* Quill JS */}
      <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // 初始化 Quill 编辑器
          const quill = new Quill('#quill-editor', {
            theme: 'snow',
            placeholder: '输入内容...',
            modules: {
              toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean']
              ]
            }
          });
          
          // 监听分类栏目变化，显示/隐藏视频和附件上传
          function updateFieldsByCategory() {
            const categorySelect = document.getElementById('content-category');
            const selectedOption = categorySelect.options[categorySelect.selectedIndex];
            const template = selectedOption?.getAttribute('data-template') || '';
            
            const videoField = document.getElementById('video-upload-field');
            const videoDescField = document.getElementById('video-description-field');
            const attachmentField = document.getElementById('attachment-upload-field');
            const videoInput = document.getElementById('content-video');
            const attachmentInput = document.getElementById('content-attachment');
            
            // 隐藏所有条件字段
            videoField.classList.add('hidden');
            videoDescField.classList.add('hidden');
            attachmentField.classList.add('hidden');
            videoInput.removeAttribute('required');
            attachmentInput.removeAttribute('required');
            
            // 根据模板显示对应字段
            if (template === 'list_video') {
              videoField.classList.remove('hidden');
              videoDescField.classList.remove('hidden'); // 显示视频简介字段
              // 只有在新建且没有已有视频时才设为必填
              const hasExistingVideo = document.getElementById('video-file-url').value;
              if (!hasExistingVideo) {
                videoInput.setAttribute('required', 'required');
              }
            } else if (template === 'list_download') {
              attachmentField.classList.remove('hidden');
              // 只有在新建且没有已有附件时才设为必填
              const hasExistingAttachment = document.getElementById('attachment-file-url').value;
              if (!hasExistingAttachment) {
                attachmentInput.setAttribute('required', 'required');
              }
            }
          }
          
          // 页面加载时初始化
          document.addEventListener('DOMContentLoaded', updateFieldsByCategory);
          
          // 监听分类选择变化
          document.getElementById('content-category')?.addEventListener('change', updateFieldsByCategory);
          
          // 封面图片上传
          document.getElementById('upload-cover-btn')?.addEventListener('click', function() {
            document.getElementById('content-cover').click();
          });
          
          document.getElementById('content-cover')?.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
              alert('只支持 PNG、JPG、JPEG 格式的图片');
              return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
              alert('图片大小不能超过 5MB');
              return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
              document.getElementById('cover-preview').src = e.target.result;
              document.getElementById('cover-preview-container').classList.remove('hidden');
            };
            reader.readAsDataURL(file);
          });
          
          document.getElementById('remove-cover-btn')?.addEventListener('click', function() {
            document.getElementById('content-cover').value = '';
            document.getElementById('cover-preview').src = '';
            document.getElementById('cover-preview-container').classList.add('hidden');
            document.getElementById('cover-image-url').value = '';
            document.getElementById('cover-image-size').value = '';
            document.getElementById('cover-image-type').value = '';
          });
          
          // 视频上传
          document.getElementById('upload-video-btn')?.addEventListener('click', function() {
            document.getElementById('content-video').click();
          });
          
          document.getElementById('content-video')?.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            // 验证文件类型
            const allowedTypes = ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-ms-wmv', 'video/webm', 'video/x-msvideo'];
            const fileName = file.name.toLowerCase();
            const isVideoFile = allowedTypes.includes(file.type) || 
                               fileName.endsWith('.mp4') || 
                               fileName.endsWith('.avi') || 
                               fileName.endsWith('.mov') || 
                               fileName.endsWith('.wmv') || 
                               fileName.endsWith('.webm');
            
            if (!isVideoFile) {
              alert('只支持 MP4、AVI、MOV、WMV、WebM 格式的视频\\n当前文件类型: ' + (file.type || '未知'));
              e.target.value = '';
              return;
            }
            
            // 验证文件大小
            if (file.size > 100 * 1024 * 1024) {
              alert('视频大小不能超过 100MB');
              e.target.value = '';
              return;
            }
            
            // 显示文件信息
            const sizeMB = (file.size / 1024 / 1024).toFixed(2);
            console.log('视频已选择:', file.name, '(' + sizeMB + ' MB)', 'MIME:', file.type);
            
            // 先清除旧的预览
            const videoPreview = document.getElementById('video-preview');
            if (videoPreview.src && videoPreview.src.startsWith('blob:')) {
              try {
                URL.revokeObjectURL(videoPreview.src);
              } catch (e) {
                console.log('释放旧 URL 失败:', e);
              }
            }
            
            // 暂停并重置视频
            videoPreview.pause();
            videoPreview.removeAttribute('src');
            videoPreview.load();
            
            // 使用 setTimeout 确保清理完成
            setTimeout(function() {
              try {
                // 创建新的预览 URL
                const videoURL = URL.createObjectURL(file);
                console.log('创建 Blob URL:', videoURL);
                
                // 设置视频源
                videoPreview.src = videoURL;
                
                // 确保视频元素属性正确
                videoPreview.setAttribute('type', file.type || 'video/mp4');
                
                // 尝试加载视频
                videoPreview.load();
                
                console.log('视频加载已触发');
              } catch (err) {
                console.error('设置视频源失败:', err);
                alert('视频预览失败: ' + err.message);
              }
            }, 100);
            
            // 显示预览容器
            document.getElementById('video-preview-container').classList.remove('hidden');
            
            // 显示基本信息
            const videoInfo = document.getElementById('video-info');
            if (videoInfo) {
              videoInfo.textContent = '⏳ 正在加载: ' + file.name + ' (' + sizeMB + ' MB)';
              videoInfo.className = 'text-xs text-gray-500';
            }
            
            // 监听各种加载事件
            videoPreview.onloadstart = function() {
              console.log('✅ 视频开始加载');
            };
            
            videoPreview.onloadeddata = function() {
              console.log('✅ 视频数据加载完成');
              if (videoInfo) {
                videoInfo.textContent = '✅ ' + file.name + ' (' + sizeMB + ' MB)';
                videoInfo.className = 'text-xs text-green-600';
              }
            };
            
            videoPreview.oncanplay = function() {
              console.log('✅ 视频可以播放');
            };
            
            videoPreview.onstalled = function() {
              console.warn('⚠️ 视频加载停滞');
            };
            
            videoPreview.onsuspend = function() {
              console.log('⏸️ 视频加载暂停');
            };
            
            // 视频加载完成后显示详细信息
            videoPreview.onloadedmetadata = function() {
              try {
                const duration = Math.floor(videoPreview.duration || 0);
                const minutes = Math.floor(duration / 60);
                const seconds = duration % 60;
                const timeStr = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
                console.log('视频时长:', timeStr);
                console.log('视频尺寸:', videoPreview.videoWidth + 'x' + videoPreview.videoHeight);
                
                if (videoInfo) {
                  videoInfo.textContent = file.name + ' (' + sizeMB + ' MB, ' + 
                                         videoPreview.videoWidth + 'x' + videoPreview.videoHeight + ', ' +
                                         timeStr + ')';
                }
              } catch (err) {
                console.error('获取视频元数据失败:', err);
              }
            };
            
            // 监听加载错误
            videoPreview.onerror = function(e) {
              console.error('视频加载失败事件:', e);
              console.error('视频元素:', videoPreview);
              console.error('视频错误详情:', videoPreview.error);
              
              let errorMsg = '视频加载失败\\n\\n';
              if (videoPreview.error) {
                switch(videoPreview.error.code) {
                  case 1:
                    errorMsg += '错误: 用户中止了视频加载';
                    break;
                  case 2:
                    errorMsg += '错误: 网络错误，无法加载视频';
                    break;
                  case 3:
                    errorMsg += '错误: 视频解码失败（格式不支持或文件损坏）\\n';
                    errorMsg += '建议: 使用标准的 MP4 格式（H.264 编码）';
                    break;
                  case 4:
                    errorMsg += '错误: 视频格式不支持\\n';
                    errorMsg += '当前MIME类型: ' + (file.type || '未知') + '\\n';
                    errorMsg += '建议: 转换为 MP4 格式（H.264 + AAC）';
                    break;
                  default:
                    errorMsg += '未知错误';
                }
                errorMsg += '\\n错误代码: ' + videoPreview.error.code;
                if (videoPreview.error.message) {
                  errorMsg += '\\n错误信息: ' + videoPreview.error.message;
                }
              }
              
              errorMsg += '\\n\\n文件信息:\\n';
              errorMsg += '文件名: ' + file.name + '\\n';
              errorMsg += 'MIME类型: ' + (file.type || '未知') + '\\n';
              errorMsg += '文件大小: ' + sizeMB + ' MB';
              
              alert(errorMsg);
              
              // 不隐藏容器，让用户可以看到错误状态
              if (videoInfo) {
                videoInfo.textContent = '❌ 视频加载失败 - ' + file.name;
                videoInfo.className = 'text-xs text-red-600';
              }
            };
          });
          
          document.getElementById('remove-video-btn')?.addEventListener('click', function() {
            const videoPreview = document.getElementById('video-preview');
            const videoInput = document.getElementById('content-video');
            
            // 释放 blob URL
            if (videoPreview.src && videoPreview.src.startsWith('blob:')) {
              URL.revokeObjectURL(videoPreview.src);
            }
            
            // 清空表单
            videoInput.value = '';
            videoPreview.src = '';
            document.getElementById('video-preview-container').classList.add('hidden');
            document.getElementById('video-file-url').value = '';
            document.getElementById('video-file-size').value = '';
            document.getElementById('video-file-type').value = '';
            
            // 检查当前分类是否为视频类型，如果是则设为必填
            const categorySelect = document.getElementById('content-category');
            const selectedOption = categorySelect.options[categorySelect.selectedIndex];
            const template = selectedOption?.getAttribute('data-template') || '';
            if (template === 'list_video') {
              videoInput.setAttribute('required', 'required');
            }
          });
          
          // 附件上传
          document.getElementById('upload-attachment-btn')?.addEventListener('click', function() {
            document.getElementById('content-attachment').click();
          });
          
          document.getElementById('content-attachment')?.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            const allowedExts = ['.xls', '.xlsx', '.doc', '.docx', '.pdf', '.zip', '.rar', '.ppt', '.pptx'];
            const fileName = file.name.toLowerCase();
            const hasAllowedExt = allowedExts.some(ext => fileName.endsWith(ext));
            
            if (!hasAllowedExt) {
              alert('只支持 XLS/XLSX/DOC/DOCX/PDF/ZIP/RAR/PPT/PPTX 格式的文件');
              return;
            }
            
            if (file.size > 50 * 1024 * 1024) {
              alert('附件大小不能超过 50MB');
              return;
            }
            
            // 创建临时预览链接
            const fileURL = URL.createObjectURL(file);
            
            // 显示附件信息和下载链接
            const attachmentLink = document.getElementById('attachment-link');
            const attachmentName = document.getElementById('attachment-name');
            const attachmentSize = document.getElementById('attachment-size');
            
            attachmentLink.href = fileURL;
            attachmentLink.download = file.name;
            attachmentName.textContent = file.name;
            attachmentSize.textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
            document.getElementById('attachment-preview-container').classList.remove('hidden');
            
            console.log('附件已选择:', file.name, '(' + (file.size / 1024 / 1024).toFixed(2) + ' MB)');
          });
          
          document.getElementById('remove-attachment-btn')?.addEventListener('click', function() {
            const attachmentInput = document.getElementById('content-attachment');
            const attachmentLink = document.getElementById('attachment-link');
            
            // 释放 blob URL
            if (attachmentLink.href && attachmentLink.href.startsWith('blob:')) {
              URL.revokeObjectURL(attachmentLink.href);
            }
            
            attachmentInput.value = '';
            attachmentLink.href = '#';
            attachmentLink.removeAttribute('download');
            document.getElementById('attachment-preview-container').classList.add('hidden');
            document.getElementById('attachment-file-url').value = '';
            document.getElementById('attachment-file-size').value = '';
            document.getElementById('attachment-file-type').value = '';
            document.getElementById('attachment-file-name').value = '';
            
            // 检查当前分类是否为下载类型，如果是则设为必填
            const categorySelect = document.getElementById('content-category');
            const selectedOption = categorySelect.options[categorySelect.selectedIndex];
            const template = selectedOption?.getAttribute('data-template') || '';
            if (template === 'list_download') {
              attachmentInput.setAttribute('required', 'required');
            }
          });
          
          // 推荐开关文本更新
          const featuredCheckbox = document.getElementById('content-featured');
          const featuredLabel = document.getElementById('featured-label');
          if (featuredCheckbox && featuredLabel) {
            // 初始化显示
            featuredLabel.textContent = featuredCheckbox.checked ? '是' : '否';
            // 监听变化
            featuredCheckbox.addEventListener('change', function() {
              featuredLabel.textContent = this.checked ? '是' : '否';
            });
          }

          // SEO 折叠
          document.getElementById('toggle-seo-btn')?.addEventListener('click', function() {
            const fields = document.getElementById('seo-fields');
            const icon = document.getElementById('seo-icon');
            fields.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-right');
            icon.classList.toggle('fa-chevron-down');
          });
          
          // 表单提交
          document.getElementById('content-form')?.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // 获取编辑器内容
            const contentBody = quill.root.innerHTML;
            document.getElementById('content-body').value = contentBody;
            
            // 收集表单数据
            const form = document.getElementById('content-form');
            const defaultAuthor = form.getAttribute('data-default-author') || '';
            const authorValue = document.getElementById('content-author').value;
            
            const formData = {
              id: document.getElementById('content-id').value || undefined,
              title: document.getElementById('content-title').value,
              category_id: parseInt(document.getElementById('content-category').value),
              author: authorValue || defaultAuthor,  // 如果为空则使用默认作者
              published_at: document.getElementById('content-published-at').value,
              reading_time: parseInt(document.getElementById('content-reading-time').value) || null,
              content: contentBody,
              status: document.getElementById('content-status').value,
              sort_order: parseInt(document.getElementById('content-sort').value) || 0,
              is_featured: document.getElementById('content-featured').checked,
              meta_title: document.getElementById('content-meta-title').value,
              meta_description: document.getElementById('content-meta-description').value,
              meta_keywords: document.getElementById('content-meta-keywords').value
            };
            
            // 处理封面图片上传
            const coverFile = document.getElementById('content-cover').files[0];
            if (coverFile) {
              try {
                const uploadFormData = new FormData();
                uploadFormData.append('file', coverFile);
                uploadFormData.append('category', 'contents');
                
                const uploadResponse = await fetch('/api/admin/upload/image', {
                  method: 'POST',
                  body: uploadFormData
                });
                
                const uploadResult = await uploadResponse.json();
                if (uploadResult.success) {
                  formData.cover_image = uploadResult.data.url;
                  formData.cover_image_size = uploadResult.data.size;
                  formData.cover_image_type = uploadResult.data.type;
                } else {
                  throw new Error(uploadResult.error || '图片上传失败');
                }
              } catch (error) {
                alert('图片上传失败：' + error.message);
                return;
              }
            } else {
              formData.cover_image = document.getElementById('cover-image-url').value;
              formData.cover_image_size = parseInt(document.getElementById('cover-image-size').value) || undefined;
              formData.cover_image_type = document.getElementById('cover-image-type').value;
            }
            
            // 处理视频上传
            const videoFile = document.getElementById('content-video').files[0];
            if (videoFile) {
              try {
                // 显示上传进度
                console.log('正在上传视频，请稍候...');
                const sizeMB = (videoFile.size / 1024 / 1024).toFixed(2);
                alert(\`正在上传视频 (\${sizeMB} MB)，请稍候...\`);
                
                const uploadFormData = new FormData();
                uploadFormData.append('file', videoFile);
                uploadFormData.append('category', 'videos');
                
                const uploadResponse = await fetch('/api/admin/upload/file', {
                  method: 'POST',
                  body: uploadFormData
                });
                
                const uploadResult = await uploadResponse.json();
                if (uploadResult.success) {
                  formData.video_file = uploadResult.data.url;
                  formData.video_size = uploadResult.data.size;
                  formData.video_type = uploadResult.data.type;
                  console.log('视频上传成功:', uploadResult.data.url);
                } else {
                  throw new Error(uploadResult.error || '视频上传失败');
                }
              } catch (error) {
                alert('视频上传失败：' + error.message);
                return;
              }
            } else {
              formData.video_file = document.getElementById('video-file-url').value;
              formData.video_size = parseInt(document.getElementById('video-file-size').value) || undefined;
              formData.video_type = document.getElementById('video-file-type').value;
            }
            
            // 处理视频简介
            const videoDescription = document.getElementById('content-video-description')?.value;
            if (videoDescription) {
              formData.video_description = videoDescription;
            }
            
            // 处理附件上传
            const attachmentFile = document.getElementById('content-attachment').files[0];
            if (attachmentFile) {
              try {
                const uploadFormData = new FormData();
                uploadFormData.append('file', attachmentFile);
                uploadFormData.append('category', 'attachments');
                
                const uploadResponse = await fetch('/api/admin/upload/file', {
                  method: 'POST',
                  body: uploadFormData
                });
                
                const uploadResult = await uploadResponse.json();
                if (uploadResult.success) {
                  formData.attachment_file = uploadResult.data.url;
                  formData.attachment_size = uploadResult.data.size;
                  formData.attachment_type = uploadResult.data.type;
                  formData.attachment_name = attachmentFile.name;
                } else {
                  throw new Error(uploadResult.error || '附件上传失败');
                }
              } catch (error) {
                alert('附件上传失败：' + error.message);
                return;
              }
            } else {
              formData.attachment_file = document.getElementById('attachment-file-url').value;
              formData.attachment_size = parseInt(document.getElementById('attachment-file-size').value) || undefined;
              formData.attachment_type = document.getElementById('attachment-file-type').value;
              formData.attachment_name = document.getElementById('attachment-file-name').value;
            }
            
            // 提交数据
            try {
              const isEdit = !!formData.id;
              const url = isEdit 
                ? \`/api/admin/resource-contents/\${formData.id}\`
                : '/api/admin/resource-contents';
              const method = isEdit ? 'PUT' : 'POST';
              
              const response = await fetch(url, {
                method: method,
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
              });
              
              const result = await response.json();
              
              if (result.success) {
                alert(isEdit ? '保存成功' : '发布成功');
                window.location.href = '/ticloudadmin/resource-contents';
              } else {
                alert('操作失败：' + (result.error || '未知错误'));
              }
            } catch (error) {
              console.error('提交失败:', error);
              alert('提交失败：' + error.message);
            }
          });
          
          // 存为草稿
          document.getElementById('save-draft-btn')?.addEventListener('click', function() {
            document.getElementById('content-status').value = 'draft';
            document.getElementById('content-form').dispatchEvent(new Event('submit'));
          });
        `
      }} />
    </div>
  )
}
