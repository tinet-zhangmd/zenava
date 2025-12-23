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
  slug?: string
  content: string
  // 多语言字段
  title_zh?: string
  title_en?: string
  title_jp?: string
  title_hk?: string
  content_zh?: string
  content_en?: string
  content_jp?: string
  content_hk?: string
  author?: string
  cover_image?: string
  // 缩略图多语言字段
  cover_image_zh?: string
  cover_image_en?: string
  cover_image_jp?: string
  cover_image_hk?: string
  video_file?: string
  video_description?: string
  // 视频简介多语言字段
  video_description_zh?: string
  video_description_en?: string
  video_description_jp?: string
  video_description_hk?: string
  attachment_file?: string
  attachment_name?: string
  reading_time?: number
  status: 'draft' | 'unpublished' | 'published'
  published_at?: string
  sort_order?: number
  is_featured?: boolean | number
  is_hot?: boolean | number
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  // SEO 多语言字段
  meta_title_zh?: string
  meta_title_en?: string
  meta_title_jp?: string
  meta_title_hk?: string
  meta_description_zh?: string
  meta_description_en?: string
  meta_description_jp?: string
  meta_description_hk?: string
  meta_keywords_zh?: string
  meta_keywords_en?: string
  meta_keywords_jp?: string
  meta_keywords_hk?: string
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
  const pageTitle = isEdit ? '编辑内容' : '发布新内容'
  
  // 辅助函数：渲染缩略图上传组件
  const renderThumbnailUpload = (lang: string, label: string) => {
    const currentVal = (content as any)?.[`cover_image_${lang}`] || (lang === 'zh' ? content?.cover_image : '')
  
  return (
      <div class="flex items-start mb-6">
        <label class="w-32 text-sm text-gray-700 font-bold text-right mr-4 pt-2">
          缩略图 ({label})
            </label>
            <div class="flex-1">
          <div class="flex items-start space-x-4">
            <div id={`cover-preview-container-${lang}`} class={currentVal ? '' : 'hidden'}>
              <img 
                id={`cover-preview-${lang}`} 
                src={currentVal || ''} 
                class="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
              />
              <button type="button" data-lang={lang} class="remove-cover-btn mt-2 text-xs text-red-600 flex items-center hover:text-red-800">
                <i class="fas fa-trash-alt mr-1"></i> 删除图片
              </button>
            </div>
            <div class="flex-1">
              <input type="file" id={`content-cover-${lang}`} accept="image/*" class="hidden cover-input" data-lang={lang} />
              <button type="button" data-lang={lang} class="upload-cover-btn px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition-all">
                <i class="fas fa-cloud-upload-alt mr-2"></i> 选择图片
                  </button>
              <p class="mt-2 text-xs text-gray-400">支持 JPG/PNG，建议 800x600px</p>
              <input type="hidden" id={`cover-image-url-${lang}`} value={currentVal || ''} />
                </div>
              </div>
            </div>
          </div>
    )
  }

  // 辅助函数：渲染 SEO 字段
  const renderSEOFields = (lang: string, label: string) => {
    return (
      <div class="mt-8 pt-6 border-t-2 border-dashed border-gray-100">
        <div class="flex items-center mb-4">
          <div class="bg-blue-100 p-1.5 rounded-md mr-3">
            <i class="fas fa-search text-blue-600 text-xs"></i>
          </div>
          <h4 class="text-sm font-bold text-gray-800">SEO 优化 ({label})</h4>
        </div>
        <div class="space-y-4 pl-11">
          <div class="flex items-center">
            <label class="w-24 text-xs text-gray-500 font-bold uppercase tracking-wider">SEO Title</label>
            <input type="text" id={`meta-title-${lang}`} class="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:border-blue-400 outline-none" 
              value={(content as any)?.[`meta_title_${lang}`] || (lang === 'zh' ? content?.meta_title : '')} />
          </div>
          <div class="flex items-start">
            <label class="w-24 text-xs text-gray-500 font-bold uppercase tracking-wider pt-2">SEO Desc</label>
            <textarea id={`meta-desc-${lang}`} rows={2} class="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:border-blue-400 outline-none resize-none"
              >{(content as any)?.[`meta_description_${lang}`] || (lang === 'zh' ? content?.meta_description : '')}</textarea>
          </div>
          <div class="flex items-center">
            <label class="w-24 text-xs text-gray-500 font-bold uppercase tracking-wider">Keywords</label>
            <input type="text" id={`meta-key-${lang}`} class="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:border-blue-400 outline-none"
              value={(content as any)?.[`meta_keywords_${lang}`] || (lang === 'zh' ? content?.meta_keywords : '')} />
          </div>
            </div>
          </div>
    )
  }

  return (
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <a href="/ticloudadmin/resource-contents" class="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all text-sm font-medium">
            <i class="fas fa-chevron-left mr-2 text-xs"></i> 返回列表
          </a>
          <h1 class="text-2xl font-black text-gray-900 tracking-tight">{pageTitle}</h1>
          <div class="w-24"></div>
          </div>

        <form id="content-form" class="space-y-8" data-default-author={defaultAuthor}>
          <input type="hidden" id="content-id" value={content?.id || ''} />

          {/* 卡片 1: 基础设置 */}
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-50/80 px-6 py-4 border-b border-gray-200 flex items-center">
              <i class="fas fa-sliders-h mr-3 text-gray-400"></i>
              <h3 class="text-sm font-black text-gray-700 uppercase tracking-widest">基础配置 (所有语言通用)</h3>
            </div>
            <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div class="space-y-5">
                <div>
                  <label class="block text-xs font-black text-gray-400 uppercase mb-2">链接标识 (Slug) - 可选</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm italic">/resources/</span>
                    <input type="text" id="content-slug" class="w-full pl-24 pr-4 py-2.5 bg-blue-50/30 border-2 border-blue-100 rounded-xl focus:border-blue-500 outline-none font-mono text-sm text-blue-700" 
                      placeholder="e.g. ai-marketing-trends (留空则使用默认值)" value={content?.slug || ''} />
          </div>
                </div>
                <div>
                  <label class="block text-xs font-black text-gray-400 uppercase mb-2">分类栏目</label>
                  <select id="content-category" class="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none text-sm font-bold" required>
                    <option value="">请选择栏目...</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id} data-template={cat.category_template} selected={content?.category_id === cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="space-y-5">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-black text-gray-400 uppercase mb-2">发布人</label>
                    <input type="text" id="content-author" class="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none text-sm" 
                      value={content?.author || defaultAuthor} />
                  </div>
                  <div>
                    <label class="block text-xs font-black text-gray-400 uppercase mb-2">状态</label>
                    <select id="content-status" class="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none text-sm font-black text-blue-600">
                      <option value="draft" selected={content?.status === 'draft'}>草稿</option>
                      <option value="published" selected={content?.status === 'published'}>已发布</option>
                    </select>
                  </div>
                </div>
              <div>
                  <label class="block text-xs font-black text-gray-400 uppercase mb-2">发布时间</label>
                  <input type="datetime-local" id="content-published-at" class="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none text-sm"
                    value={content?.published_at ? new Date(content.published_at).toISOString().slice(0, 16) : ''} />
                </div>
              </div>
            </div>
          </div>

          {/* 卡片 2: 多语言切换区 */}
          <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-500 overflow-hidden relative">
            <div class="bg-blue-600 px-6 pt-4 pb-0 flex justify-between items-end">
              <div class="flex items-center text-white mb-4">
                <i class="fas fa-language mr-3 text-blue-200"></i>
                <h3 class="text-sm font-black uppercase tracking-widest">核心内容与多语言设定</h3>
              </div>
              <nav class="flex space-x-1" aria-label="语言切换">
                {['zh', 'en', 'jp', 'hk'].map((lang, idx) => (
                  <button type="button" data-lang={lang} 
                    class={`lang-tab px-6 py-3 text-xs font-black uppercase tracking-tighter transition-all rounded-t-xl ${idx === 0 ? 'bg-white text-blue-600' : 'text-blue-100 hover:bg-blue-500'}`}>
                    {lang === 'zh' ? '简体中文' : lang === 'en' ? 'English' : lang === 'jp' ? '日本語' : '繁體中文'}
                  </button>
                ))}
              </nav>
            </div>
            
            <div class="p-10">
              {[
                { id: 'zh', label: '简体中文' },
                { id: 'en', label: 'English' },
                { id: 'jp', label: '日本語' },
                { id: 'hk', label: '繁體中文' }
              ].map((lang, idx) => (
                <div class={`lang-content space-y-10 ${idx !== 0 ? 'hidden' : ''}`} data-lang={lang.id}>
                  {/* 1. 标题 */}
                  <div class="flex items-center">
                    <label class="w-32 text-sm text-gray-700 font-black text-right mr-6">内容标题</label>
                    <input type="text" id={`content-title-${lang.id}`} 
                      class="flex-1 px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all text-xl font-bold placeholder-gray-300"
                      placeholder={`请输入${lang.label}标题...`}
                      value={(content as any)?.[`title_${lang.id}`] || (lang.id === 'zh' ? content?.title : '')} />
          </div>

                  {/* 2. 缩略图 */}
                  {renderThumbnailUpload(lang.id, lang.label)}

                  {/* 3. 编辑器 */}
                  <div class="flex items-start">
                    <label class="w-32 text-sm text-gray-700 font-black text-right mr-6 pt-3">正文内容</label>
            <div class="flex-1">
                      <div id={`quill-editor-${lang.id}`} class="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-inner" style="min-height: 450px;">
                        <div dangerouslySetInnerHTML={{ __html: (content as any)?.[`content_${lang.id}`] || (lang.id === 'zh' ? content?.content : '') || '' }} />
                      </div>
                      <input type="hidden" id={`content-body-${lang.id}`} />
                    </div>
                  </div>

                  {/* 4. 视频简介（仅视频类型显示） */}
                  <div id={`video-description-field-${lang.id}`} class="hidden">
                    <div class="flex items-start">
                      <label class="w-32 text-sm text-gray-700 font-black text-right mr-6 pt-2">视频简介</label>
                      <div class="flex-1">
                        <textarea 
                          id={`video-description-${lang.id}`}
                          rows={3}
                          class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-blue-500 outline-none resize-none text-sm transition-all"
                          placeholder={`请输入${lang.label}视频简介...`}
                        >{(content as any)?.[`video_description_${lang.id}`] || (lang.id === 'zh' ? content?.video_description : '')}</textarea>
                        <p class="mt-2 text-xs text-gray-400">简要介绍视频/音频内容</p>
                      </div>
                    </div>
                  </div>

                  {/* 5. SEO */}
                  {renderSEOFields(lang.id, lang.label)}
                </div>
              ))}
            </div>
          </div>

          {/* 卡片 3: 底部通用字段 */}
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 grid grid-cols-3 gap-8">
            <div class="col-span-2 space-y-6">
              <div id="video-upload-field" class="hidden">
                <label class="block text-xs font-black text-gray-400 uppercase mb-3">视频/音频媒体 (可选)</label>
                <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <input type="file" id="content-video" class="hidden" accept="video/*,audio/*" />
                  <button type="button" id="upload-video-btn" class="px-4 py-2 bg-white shadow-sm border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:border-blue-400">
                    <i class="fas fa-video mr-2"></i> 上传视频/音频
                  </button>
                  <span id="video-filename" class="text-xs text-gray-400 italic truncate max-w-xs">{content?.video_file || '未选择文件'}</span>
                  <input type="hidden" id="video-file-url" value={content?.video_file || ''} />
                </div>
              </div>
              <div id="attachment-upload-field" class="hidden">
                <label class="block text-xs font-black text-gray-400 uppercase mb-3">资料附件 (可选)</label>
                <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <input type="file" id="content-attachment" class="hidden" />
                  <button type="button" id="upload-attachment-btn" class="px-4 py-2 bg-white shadow-sm border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:border-blue-400">
                    <i class="fas fa-file-download mr-2"></i> 上传附件
                  </button>
                  <span id="attachment-filename" class="text-xs text-gray-400 italic truncate max-w-xs">{content?.attachment_name || '未选择文件'}</span>
                  <input type="hidden" id="attachment-file-url" value={content?.attachment_file || ''} />
                </div>
              </div>
            </div>
            <div class="bg-blue-50/50 p-6 rounded-2xl space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-blue-900/40 uppercase">排序权重</span>
                <input type="number" id="content-sort" class="w-20 px-3 py-1.5 bg-white border border-blue-100 rounded-lg text-center font-bold text-blue-600" value={content?.sort_order || 0} />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-blue-900/40 uppercase">阅读时长 (Min)</span>
                <input type="number" id="content-reading-time" class="w-20 px-3 py-1.5 bg-white border border-blue-100 rounded-lg text-center font-bold text-blue-600" value={content?.reading_time || 0} />
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-blue-100">
                <span class="text-xs font-black text-blue-900/40 uppercase">首页推荐</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="content-featured" class="sr-only peer" checked={!!(content?.is_featured === true || content?.is_featured === 1)} />
                  <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </label>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-blue-100">
                <span class="text-xs font-black text-blue-900/40 uppercase">热门</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="content-hot" class="sr-only peer" checked={(content?.is_hot === true || content?.is_hot === 1)} />
                  <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-red-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>

          {/* 底部固定操作栏 */}
          <div class="flex justify-center space-x-6 py-12">
            <button type="submit" class="group px-12 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all">
              <i class="fas fa-check-circle mr-3 opacity-50 group-hover:opacity-100"></i>
              保存所有语言版本
              </button>
            <a href="/ticloudadmin/resource-contents" class="px-12 py-4 bg-white border-2 border-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 hover:text-gray-700 transition-all">
              取消并返回
              </a>
          </div>
        </form>
      </div>

      <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
      <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

      <script dangerouslySetInnerHTML={{
        __html: `
          const languages = ['zh', 'en', 'jp', 'hk'];
          const quillEditors = {};
          
          // 图片上传处理函数（将 base64 转换为文件并上传）
          async function uploadImageToServer(imageDataUrl) {
            try {
              // 将 base64 转换为 Blob
              const response = await fetch(imageDataUrl);
              const blob = await response.blob();
              
              // 创建 File 对象
              const file = new File([blob], 'image.png', { type: blob.type });
              
              // 上传到服务器
              const formData = new FormData();
              formData.append('file', file);
              formData.append('category', 'contents'); // 富文本中的图片使用 contents 分类
              
              const uploadResponse = await fetch('/api/admin/upload/image', {
                method: 'POST',
                body: formData
              });
              
              if (!uploadResponse.ok) {
                throw new Error('上传失败');
              }
              
              const result = await uploadResponse.json();
              
              if (result.success && result.data && result.data.url) {
                return result.data.url;
              } else {
                throw new Error(result.error || '上传失败');
              }
            } catch (error) {
              console.error('图片上传错误:', error);
              throw error;
            }
          }
          
          // 初始化编辑器
          languages.forEach(lang => {
            quillEditors[lang] = new Quill('#quill-editor-' + lang, {
            theme: 'snow',
              placeholder: '在这里撰写正文内容...',
              modules: { 
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'], 
                  [{header: [1,2,3,false]}], 
                  [{list:'ordered'}, {list:'bullet'}], 
                  ['link', 'image', 'video'], 
                  ['clean']
                ]
              }
            });
            
            // 配置图片上传处理器
            const toolbar = quillEditors[lang].getModule('toolbar');
            toolbar.addHandler('image', async function() {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.click();
              
              input.onchange = async function() {
                const file = this.files[0];
                if (!file) return;
                
                // 验证文件类型
                const imageTypeRegex = new RegExp('^image/(png|jpeg|jpg|webp)$');
                if (!imageTypeRegex.test(file.type)) {
                  alert('只支持 PNG、JPG、WebP 格式的图片');
                  return;
                }
                
                // 验证文件大小（30MB）
                const maxSize = 30 * 1024 * 1024;
                if (file.size > maxSize) {
                  alert('图片大小不能超过 30MB');
                  return;
                }
                
                // 获取当前光标位置
                const range = quillEditors[lang].getSelection(true);
                
                // 显示上传中提示
                quillEditors[lang].insertText(range.index, '上传中...', 'user');
                quillEditors[lang].setSelection(range.index + 4);
                
                try {
                  // 上传图片
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('category', 'contents');
                  
                  const response = await fetch('/api/admin/upload/image', {
                    method: 'POST',
                    body: formData
                  });
                  
                  if (!response.ok) {
                    throw new Error('上传失败');
                  }
                  
                  const result = await response.json();
                  
                  if (result.success && result.data && result.data.url) {
                    // 删除"上传中..."提示
                    quillEditors[lang].deleteText(range.index, 4);
                    
                    // 插入图片
                    quillEditors[lang].insertEmbed(range.index, 'image', result.data.url, 'user');
                    quillEditors[lang].setSelection(range.index + 1);
                  } else {
                    throw new Error(result.error || '上传失败');
                  }
                } catch (error) {
                  console.error('图片上传错误:', error);
                  // 删除"上传中..."提示
                  quillEditors[lang].deleteText(range.index, 4);
                  alert('图片上传失败: ' + error.message);
                }
              };
            });
            
            // 处理粘贴的图片（将 base64 转换为服务器 URL）
            quillEditors[lang].root.addEventListener('paste', async function(e) {
              const items = e.clipboardData.items;
              
              for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                  e.preventDefault();
                  
                  const blob = items[i].getAsFile();
                  const reader = new FileReader();
                  
                  reader.onload = async function(event) {
                    const imageDataUrl = event.target.result;
                    
                    // 获取当前光标位置
                    const range = quillEditors[lang].getSelection(true);
                    
                    // 显示上传中提示
                    quillEditors[lang].insertText(range.index, '上传中...', 'user');
                    quillEditors[lang].setSelection(range.index + 4);
                    
                    try {
                      // 将 base64 转换为文件并上传
                      const file = new File([blob], 'pasted-image.png', { type: blob.type });
                      const formData = new FormData();
                      formData.append('file', file);
                      formData.append('category', 'contents');
                      
                      const response = await fetch('/api/admin/upload/image', {
                        method: 'POST',
                        body: formData
                      });
                      
                      if (!response.ok) {
                        throw new Error('上传失败');
                      }
                      
                      const result = await response.json();
                      
                      if (result.success && result.data && result.data.url) {
                        // 删除"上传中..."提示
                        quillEditors[lang].deleteText(range.index, 4);
                        
                        // 插入图片
                        quillEditors[lang].insertEmbed(range.index, 'image', result.data.url, 'user');
                        quillEditors[lang].setSelection(range.index + 1);
                      } else {
                        throw new Error(result.error || '上传失败');
                      }
                    } catch (error) {
                      console.error('粘贴图片上传错误:', error);
                      // 删除"上传中..."提示
                      quillEditors[lang].deleteText(range.index, 4);
                      alert('图片上传失败: ' + error.message);
                    }
                  };
                  
                  reader.readAsDataURL(blob);
                  break;
                }
              }
            });
            
            // 处理已存在的 base64 图片（在保存时转换）
            // 这个函数会在提交表单时调用
            quillEditors[lang].convertBase64Images = async function() {
              const html = quillEditors[lang].root.innerHTML;
              
              // 匹配 base64 图片（分别处理双引号和单引号，避免转义问题）
              const matches = [];
              
              // 匹配双引号的 base64 图片: src="data:image/..."
              const doubleQuoteRegex = new RegExp('<img([^>]+)src="(data:image/[^"]+)"([^>]*)>', 'gi');
              let match;
              while ((match = doubleQuoteRegex.exec(html)) !== null) {
                matches.push({
                  before: match[1],
                  quote: '"',
                  base64: match[2],
                  after: match[3],
                  fullMatch: match[0],
                  index: match.index
                });
              }
              
              // 匹配单引号的 base64 图片: src='data:image/...'
              const singleQuoteRegex = new RegExp("<img([^>]+)src='(data:image/[^']+)'([^>]*)>", 'gi');
              while ((match = singleQuoteRegex.exec(html)) !== null) {
                matches.push({
                  before: match[1],
                  quote: "'",
                  base64: match[2],
                  after: match[3],
                  fullMatch: match[0],
                  index: match.index
                });
              }
              
              // 如果有 base64 图片，逐个上传并替换
              if (matches.length > 0) {
                let updatedHtml = html;
                // 从后往前替换，避免索引变化问题
                for (let i = matches.length - 1; i >= 0; i--) {
                  const imgMatch = matches[i];
                  try {
                    const imageUrl = await uploadImageToServer(imgMatch.base64);
                    // 构建新的 img 标签，保持原有属性
                    const newImgTag = '<img' + imgMatch.before + 'src=' + imgMatch.quote + imageUrl + imgMatch.quote + imgMatch.after + '>';
                    // 替换（从后往前，避免索引问题）
                    updatedHtml = updatedHtml.substring(0, imgMatch.index) + 
                                 newImgTag + 
                                 updatedHtml.substring(imgMatch.index + imgMatch.fullMatch.length);
                  } catch (error) {
                    console.error('转换 base64 图片失败:', error);
                    // 如果上传失败，保留原 base64（但会记录错误）
                  }
                }
                
                // 更新编辑器内容
                quillEditors[lang].root.innerHTML = updatedHtml;
              }
            };
          });
          
          // Tab 切换逻辑
          document.querySelectorAll('.lang-tab').forEach(tab => {
            tab.addEventListener('click', function() {
              const lang = this.dataset.lang;
              document.querySelectorAll('.lang-tab').forEach(t => {
                t.classList.remove('bg-white', 'text-blue-600');
                t.classList.add('text-blue-100', 'hover:bg-blue-500');
              });
              this.classList.add('bg-white', 'text-blue-600');
              this.classList.remove('text-blue-100', 'hover:bg-blue-500');
              
              document.querySelectorAll('.lang-content').forEach(c => c.classList.add('hidden'));
              document.querySelector('.lang-content[data-lang="' + lang + '"]').classList.remove('hidden');
            });
          });
          
          // Slug 字段：如果用户不填写，将使用数据库默认值（不自动根据标题生成）

          // 缩略图处理
          document.querySelectorAll('.upload-cover-btn').forEach(btn => {
            btn.addEventListener('click', () => document.getElementById('content-cover-' + btn.dataset.lang).click());
          });

          document.querySelectorAll('.cover-input').forEach(input => {
            input.addEventListener('change', function(e) {
              const lang = this.dataset.lang;
            const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  document.getElementById('cover-preview-' + lang).src = e.target.result;
                  document.getElementById('cover-preview-container-' + lang).classList.remove('hidden');
                };
                reader.readAsDataURL(file);
              }
            });
          });
          
          document.querySelectorAll('.remove-cover-btn').forEach(btn => {
            btn.addEventListener('click', function() {
              const lang = this.dataset.lang;
              document.getElementById('content-cover-' + lang).value = '';
              document.getElementById('cover-image-url-' + lang).value = '';
              document.getElementById('cover-preview-container-' + lang).classList.add('hidden');
            });
          });
          
          // 提交处理 (增强调试日志与字段映射)
          document.getElementById('content-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('🚀 开始提交多语言表单...');
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 正在处理中...';

            try {
            const attachmentFileUrlInput = document.getElementById('attachment-file-url');
            const attachmentFilename = attachmentFileUrlInput?.getAttribute('data-filename') || 
                                     document.getElementById('attachment-filename')?.textContent || '';
            
            const formData = {
              id: document.getElementById('content-id').value || undefined,
                slug: document.getElementById('content-slug').value || '',
              category_id: parseInt(document.getElementById('content-category').value),
                author: document.getElementById('content-author').value,
                status: document.getElementById('content-status').value,
              published_at: document.getElementById('content-published-at').value,
              sort_order: parseInt(document.getElementById('content-sort').value) || 0,
                reading_time: parseInt(document.getElementById('content-reading-time').value) || 0,
                is_featured: document.getElementById('content-featured').checked ? 1 : 0,
                is_hot: document.getElementById('content-hot').checked ? 1 : 0,
                video_file: document.getElementById('video-file-url').value,
                attachment_file: document.getElementById('attachment-file-url').value,
                attachment_name: attachmentFilename,
            };
            
              // 收集并处理所有语言字段
              for (const lang of languages) {
                formData['title_' + lang] = document.getElementById('content-title-' + lang).value;
                
                // 获取编辑器内容（先转换 base64 图片为服务器 URL）
                if (quillEditors[lang]) {
                  // 如果编辑器有 convertBase64Images 方法，先转换 base64 图片
                  if (typeof quillEditors[lang].convertBase64Images === 'function') {
                    try {
                      await quillEditors[lang].convertBase64Images();
                    } catch (error) {
                      console.error('转换 base64 图片失败:', error);
                      // 继续执行，使用原始内容
                    }
                  }
                  formData['content_' + lang] = quillEditors[lang].root.innerHTML;
                } else {
                  formData['content_' + lang] = '';
                }

                formData['meta_title_' + lang] = document.getElementById('meta-title-' + lang).value;
                formData['meta_description_' + lang] = document.getElementById('meta-desc-' + lang).value;
                formData['meta_keywords_' + lang] = document.getElementById('meta-key-' + lang).value;
                
                // 收集视频简介多语言字段
                const videoDescInput = document.getElementById('video-description-' + lang);
                if (videoDescInput) {
                  formData['video_description_' + lang] = videoDescInput.value;
                }

                const fileInput = document.getElementById('content-cover-' + lang);
                if (fileInput.files.length > 0) {
                  const upForm = new FormData();
                  upForm.append('file', fileInput.files[0]);
                  const upRes = await fetch('/api/admin/upload/image', { method: 'POST', body: upForm });
                  const upJson = await upRes.json();
                  formData['cover_image_' + lang] = upJson.data.url;
                } else {
                  formData['cover_image_' + lang] = document.getElementById('cover-image-url-' + lang).value;
                }
            }
            
              // 同步核心字段 (Fallback 为简体中文)
              formData.title = formData.title_zh || formData.title_en || 'Untitled';
              formData.content = formData.content_zh || formData.content_en || '';
              formData.cover_image = formData.cover_image_zh || formData.cover_image_en || '';
              formData.meta_title = formData.meta_title_zh;
              formData.meta_description = formData.meta_description_zh;
              formData.meta_keywords = formData.meta_keywords_zh;
              formData.video_description = formData.video_description_zh || formData.video_description_en || '';

              console.log('📦 准备发送到后端的数据:', formData);

              const isEdit = !!formData.id;
              const res = await fetch(isEdit ? '/api/admin/resource-contents/' + formData.id : '/api/admin/resource-contents', {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
              });
              
              const result = await res.json();
              if (result.success) {
                console.log('✅ 保存成功:', result);
                alert('🎉 保存成功！');
                window.location.href = '/ticloudadmin/resource-contents';
              } else {
                console.error('❌ 保存失败:', result);
                alert('❌ 保存失败：' + (result.error || '未知错误'));
              }
            } catch (err) {
              console.error('💥 提交异常:', err);
              alert('💥 系统错误：' + err.message);
            } finally {
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fas fa-check-circle mr-3"></i> 保存所有语言版本';
            }
          });
          
          // 视频上传处理
          const videoUploadBtn = document.getElementById('upload-video-btn');
          const videoFileInput = document.getElementById('content-video');
          const videoFilenameSpan = document.getElementById('video-filename');
          const videoFileUrlInput = document.getElementById('video-file-url');
          
          if (videoUploadBtn && videoFileInput) {
            videoUploadBtn.addEventListener('click', () => {
              videoFileInput.click();
            });
            
            videoFileInput.addEventListener('change', async function(e) {
              const file = e.target.files[0];
              if (!file) return;
              
              // 验证文件类型（支持视频和音频）
              const allowedTypes = [
                // 视频格式
                'video/mp4', 'video/avi', 'video/quicktime', 'video/x-ms-wmv', 'video/webm',
                // 音频格式
                'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/mp4', 'audio/webm', 'audio/x-m4a'
              ];
              if (!allowedTypes.includes(file.type)) {
                alert('只支持以下格式：\\n视频：MP4、AVI、MOV、WMV、WebM\\n音频：MP3、WAV、OGG、AAC、M4A');
                this.value = '';
                return;
              }
              
              // 验证文件大小（100MB）
              const maxSize = 100 * 1024 * 1024;
              if (file.size > maxSize) {
                alert('文件大小不能超过 100MB');
                this.value = '';
                return;
              }
              
              videoFilenameSpan.textContent = '上传中...';
              videoUploadBtn.disabled = true;
              
              try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('category', 'videos');
                
                const response = await fetch('/api/admin/upload/file', {
                  method: 'POST',
                  body: formData
                });
                
                if (!response.ok) {
                  const errorText = await response.text();
                  throw new Error('服务器错误: ' + response.status + ' ' + errorText);
                }
                
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                  const text = await response.text();
                  throw new Error('服务器返回的不是JSON格式: ' + text.substring(0, 100));
                }
                
                const result = await response.json();
                
                if (result.success && result.data && result.data.url) {
                  videoFileUrlInput.value = result.data.url;
                  videoFilenameSpan.textContent = file.name;
                  alert('文件上传成功！');
                } else {
                  throw new Error(result.message || result.error || '上传失败');
                }
              } catch (error) {
                console.error('文件上传错误:', error);
                alert('文件上传失败: ' + error.message);
                videoFilenameSpan.textContent = '未选择文件';
                this.value = '';
              } finally {
                videoUploadBtn.disabled = false;
              }
            });
          }
          
          // 附件上传处理
          const attachmentUploadBtn = document.getElementById('upload-attachment-btn');
          const attachmentFileInput = document.getElementById('content-attachment');
          const attachmentFilenameSpan = document.getElementById('attachment-filename');
          const attachmentFileUrlInput = document.getElementById('attachment-file-url');
          
          if (attachmentUploadBtn && attachmentFileInput) {
            attachmentUploadBtn.addEventListener('click', () => {
              attachmentFileInput.click();
            });
            
            attachmentFileInput.addEventListener('change', async function(e) {
              const file = e.target.files[0];
              if (!file) return;
              
              // 验证文件类型
              const allowedExts = ['.xls', '.xlsx', '.doc', '.docx', '.pdf', '.zip', '.rar', '.ppt', '.pptx'];
              const fileName = file.name.toLowerCase();
              const hasAllowedExt = allowedExts.some(ext => fileName.endsWith(ext));
              
              if (!hasAllowedExt) {
                alert('只支持 XLS/XLSX/DOC/DOCX/PDF/ZIP/RAR/PPT/PPTX 格式的文件');
                this.value = '';
                return;
              }
              
              // 验证文件大小（50MB）
              const maxSize = 50 * 1024 * 1024;
              if (file.size > maxSize) {
                alert('附件文件大小不能超过 50MB');
                this.value = '';
                return;
              }
              
              attachmentFilenameSpan.textContent = '上传中...';
              attachmentUploadBtn.disabled = true;
              
              try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('category', 'attachments');
                
                const response = await fetch('/api/admin/upload/file', {
                  method: 'POST',
                  body: formData
                });
                
                if (!response.ok) {
                  const errorText = await response.text();
                  throw new Error('服务器错误: ' + response.status + ' ' + errorText);
                }
                
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                  const text = await response.text();
                  throw new Error('服务器返回的不是JSON格式: ' + text.substring(0, 100));
                }
                
                const result = await response.json();
                
                if (result.success && result.data && result.data.url) {
                  attachmentFileUrlInput.value = result.data.url;
                  // 保存文件名到 attachment_name 字段（在提交时会用到）
                  attachmentFilenameSpan.textContent = file.name;
                  attachmentFileUrlInput.setAttribute('data-filename', file.name);
                  alert('附件上传成功！');
                } else {
                  throw new Error(result.message || result.error || '上传失败');
                }
              } catch (error) {
                console.error('附件上传错误:', error);
                alert('附件上传失败: ' + error.message);
                attachmentFilenameSpan.textContent = '未选择文件';
                this.value = '';
              } finally {
                attachmentUploadBtn.disabled = false;
              }
            });
          }
          
          // 动态显示逻辑 (视频/附件)
          const updateVisibility = () => {
            const select = document.getElementById('content-category');
            const template = select.options[select.selectedIndex]?.dataset.template;
            const isVideo = template === 'list_video';
            document.getElementById('video-upload-field').classList.toggle('hidden', !isVideo);
            document.getElementById('attachment-upload-field').classList.toggle('hidden', template !== 'list_download');
            
            // 控制视频简介字段的显示/隐藏（所有语言）
            languages.forEach(lang => {
              const videoDescField = document.getElementById('video-description-field-' + lang);
              if (videoDescField) {
                videoDescField.classList.toggle('hidden', !isVideo);
              }
            });
          };
          document.getElementById('content-category').addEventListener('change', updateVisibility);
          updateVisibility();
        `
      }} />
    </div>
  )
}
