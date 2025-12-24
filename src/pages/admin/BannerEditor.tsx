import { FC } from 'hono/jsx'

interface Banner {
  id?: number
  category_id?: number | null
  banner_type: 'text_image' | 'full_image'
  title: string
  sort_order: number
  status: 'draft' | 'published'
  text_title?: string
  text_subtitle?: string
  text_button?: string
  text_title_zh?: string
  text_title_en?: string
  text_title_jp?: string
  text_title_hk?: string
  text_subtitle_zh?: string
  text_subtitle_en?: string
  text_subtitle_jp?: string
  text_subtitle_hk?: string
  text_button_zh?: string
  text_button_en?: string
  text_button_jp?: string
  text_button_hk?: string
  button_link?: string
  button_target?: string
  text_position?: string
  text_color?: string
  subtitle_color?: string
  background_color?: string
  image_url?: string
  background_type?: string
  background_url?: string
  full_image_url?: string
  link_url?: string
  link_target?: string
}

interface Category {
  id: number
  name: string
  slug: string
}

interface BannerEditorProps {
  banner?: Banner | null
  mode: 'create' | 'edit'
  basePath?: string
  apiPath?: string
  categories?: Category[]
  initialCategoryId?: number | null
}

export const BannerEditor: FC<BannerEditorProps> = ({ 
  banner = null, 
  mode,
  basePath = '/ticloudadmin/resource-banners',
  apiPath = '/api/resource-center/banners',
  categories = [],
  initialCategoryId = null
}) => {
  const isEdit = mode === 'edit'
  const title = isEdit ? '编辑 Banner' : '添加新 Banner'
  const isCategoryBanner = apiPath.includes('category-banners')
  
  return (
    <div class="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* 顶部标题与返回 */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <a href={basePath} class="inline-flex items-center text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors mb-2 group">
            <i class="fas fa-arrow-left mr-2 transition-transform group-hover:-translate-x-1"></i>
            返回列表
          </a>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
        </div>
        <div class="flex items-center space-x-3">
          <button id="submit-btn" type="submit" form="banner-form" class="flex items-center px-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 uppercase tracking-widest text-xs">
            <i class="fas fa-check-circle mr-2 text-sm"></i>
            {isEdit ? '保存更新' : '立即发布'}
          </button>
        </div>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="w-full">
          <form id="banner-form" class="space-y-8">
            <input type="hidden" id="banner-id" value={banner?.id || ''} />
            
            {/* 基本配置卡片 */}
            <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 space-y-8">
              <h3 class="text-xl font-black text-slate-900 tracking-tight flex items-center">
                <i class="fas fa-sliders-h mr-3 text-blue-500"></i>
                核心参数
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. 排版选择 */}
                <div class="space-y-2">
                  <label for="text-position" class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                    <span>排版布局</span>
                    <span class="text-red-500">*</span>
                  </label>
                  <select 
                    id="text-position"
                    class="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold text-slate-700"
                    required>
                    <option value="left" selected={banner?.text_position === 'left' || (!banner && !banner?.text_position)}>模式 A：文字居左</option>
                    <option value="center" selected={banner?.text_position === 'center'}>模式 A：文字居中</option>
                    <option value="right" selected={banner?.text_position === 'right'}>模式 A：文字居右</option>
                    <option value="no-text" selected={banner?.text_position === 'no-text' || banner?.banner_type === 'full_image'}>模式 B：整张大图</option>
                  </select>
                </div>

                {/* 3. 排序 */}
                <div class="space-y-2">
                  <label for="sort-order" class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                    <span>显示排序</span>
                    <span class="text-red-500">*</span>
                  </label>
                  <div class="flex items-center space-x-4">
                    <input 
                      type="number" 
                      id="sort-order" 
                      class="flex-1 px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold"
                      value={banner?.sort_order || 0}
                      min="0"
                      required 
                    />
                    <div class="text-[10px] text-slate-400 font-bold uppercase w-24">越小越靠前</div>
                  </div>
                </div>

                {/* 4. 状态 */}
                <div class="space-y-2">
                  <label for="banner-status" class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                    <span>发布状态</span>
                    <span class="text-red-500">*</span>
                  </label>
                  <select 
                    id="banner-status"
                    class="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold text-slate-700">
                    <option value="draft" selected={banner?.status === 'draft' || !banner}>存为草稿</option>
                    <option value="published" selected={banner?.status === 'published'}>立即上线</option>
                  </select>
                </div>

                {/* 5. 栏目分类（仅栏目Banner显示） */}
                {isCategoryBanner && (
                  <div class="md:col-span-2 space-y-2 animate-in slide-in-from-top-4 duration-300">
                    <label for="category-id" class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                      <span>所属栏目</span>
                      <span class="text-red-500">*</span>
                    </label>
                    <select 
                      id="category-id"
                      class="w-full px-5 py-4 bg-blue-50 border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold text-blue-900"
                      required={isCategoryBanner}
                    >
                      <option value="">点击选择关联栏目</option>
                      {categories.map((cat) => {
                        // 优先使用banner的category_id，如果没有则使用initialCategoryId
                        const isSelected = banner?.category_id === cat.id || (!banner && initialCategoryId === cat.id)
                        return (
                          <option value={cat.id} selected={isSelected}>{cat.name}</option>
                        )
                      })}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* 多语言内容卡片 */}
            <div id="text-image-fields" class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden hidden">
              <div class="bg-slate-900 px-8 pt-6 pb-0 flex justify-between items-end">
                <div class="flex items-center text-white mb-6">
                  <i class="fas fa-language mr-3 text-blue-400"></i>
                  <h3 class="text-lg font-black tracking-tight">多语言配置</h3>
                </div>
                <nav class="flex space-x-1" aria-label="语言切换">
                  {[
                    { id: 'zh', label: 'ZH' },
                    { id: 'en', label: 'EN' },
                    { id: 'jp', label: 'JP' },
                    { id: 'hk', label: 'HK' }
                  ].map((lang, idx) => (
                    <button type="button" data-lang={lang.id} 
                      class={`banner-lang-tab px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-t-2xl ${idx === 0 ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                      {lang.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div class="p-8">
                {['zh', 'en', 'jp', 'hk'].map((lang, idx) => (
                  <div class={`banner-lang-content space-y-8 ${idx !== 0 ? 'hidden' : ''}`} data-lang={lang}>
                    <div class="grid grid-cols-1 gap-8">
                      {/* 标题 */}
                      <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">主标题内容</label>
                        <textarea 
                          id={`text-title-${lang}`} 
                          rows="2"
                          class="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold placeholder-slate-300 resize-none"
                          placeholder="请输入吸引人的标题..."
                        >{(banner as any)?.[`text_title_${lang}`] || (lang === 'zh' ? banner?.text_title : '')}</textarea>
                      </div>

                      {/* 副标题 */}
                      <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">副标题 / 描述</label>
                        <textarea 
                          id={`text-subtitle-${lang}`} 
                          rows="3"
                          class="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium placeholder-slate-300 resize-none"
                          placeholder="详细描述您的推广内容..."
                        >{(banner as any)?.[`text_subtitle_${lang}`] || (lang === 'zh' ? banner?.text_subtitle : '')}</textarea>
                      </div>

                      {/* 按钮文字 */}
                      <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">按钮呼吁文字</label>
                        <input 
                          type="text" 
                          id={`text-button-${lang}`} 
                          class="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold placeholder-slate-300"
                          placeholder="如: 立即体验、查看详情"
                          value={(banner as any)?.[`text_button_${lang}`] || (lang === 'zh' ? banner?.text_button : '')} 
                        />
                      </div>

                      {/* 背景上传 (多语言) */}
                      <div class="space-y-4">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">背景媒体 (图片/视频)</label>
                        <div id={`background-upload-area-${lang}`} class="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                          <div id={`background-preview-container-${lang}`} class="hidden">
                            <div class="relative inline-block rounded-2xl overflow-hidden shadow-2xl">
                              <img id={`background-preview-${lang}`} class="max-w-md max-h-48 object-contain" />
                              <video id={`background-preview-video-${lang}`} class="max-w-md max-h-48 object-contain hidden" controls />
                              <button type="button" id={`remove-background-${lang}`} class="absolute top-2 right-2 bg-red-500 text-white rounded-xl w-8 h-8 flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                                <i class="fas fa-times"></i>
                              </button>
                            </div>
                          </div>
                          <div id={`background-placeholder-${lang}`}>
                            <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                              <i class="fas fa-cloud-upload-alt text-2xl text-slate-400"></i>
                            </div>
                            <p class="text-sm font-black text-slate-900">点击或拖拽文件上传</p>
                            <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">支持 JPG, PNG, GIF, MP4 (建议 1920x800)</p>
                          </div>
                        </div>
                        <input type="file" id={`background-upload-${lang}`} accept="image/*,video/*" class="hidden" data-lang={lang} />
                        <input type="hidden" id={`background-url-${lang}`} value={(banner as any)?.[`background_url_${lang}`] || (lang === 'zh' ? banner?.background_url : '') || ''} />
                        <input type="hidden" id={`background-type-${lang}`} value="image" />
                      </div>
                    </div>
                  </div>
                ))}

                {/* 样式配置区 */}
                <div class="mt-12 pt-8 border-t border-slate-100 space-y-8">
                  <h4 class="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">视觉样式微调</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">主标题颜色</label>
                      <div class="flex items-center space-x-3">
                        <input type="color" id="text-color-picker" class="w-10 h-10 rounded-lg overflow-hidden border-none cursor-pointer" value="#FFFFFF" />
                        <input type="text" id="text-color" class="flex-1 px-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold" value={banner?.text_color || 'rgba(255,255,255,1)'} />
                      </div>
                    </div>
                    <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">副标题颜色</label>
                      <div class="flex items-center space-x-3">
                        <input type="color" id="subtitle-color-picker" class="w-10 h-10 rounded-lg overflow-hidden border-none cursor-pointer" value="#E2E8F0" />
                        <input type="text" id="subtitle-color" class="flex-1 px-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold" value={banner?.subtitle_color || 'rgba(255,255,255,0.8)'} />
                      </div>
                    </div>
                    <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">容器背景色 (可选)</label>
                      <div class="flex items-center space-x-3">
                        <input type="color" id="background-color-picker" class="w-10 h-10 rounded-lg overflow-hidden border-none cursor-pointer" value="#6438FF" />
                        <input type="text" id="background-color" class="flex-1 px-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold" placeholder="例如: #6438FF 或 rgba(0,0,0,0.5)" value={banner?.background_color || ''} />
                      </div>
                    </div>
                    <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">跳转链接</label>
                      <div class="flex items-center space-x-3">
                        <input type="text" id="button-link" class="flex-1 px-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold" value={banner?.button_link || ''} />
                        <select id="button-target" class="w-32 px-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold">
                          <option value="_self" selected={banner?.button_target === '_self' || !banner}>当前</option>
                          <option value="_blank" selected={banner?.button_target === '_blank'}>新窗</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 整张大图卡片 */}
            <div id="full-image-fields" class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 space-y-8 hidden">
              <h3 class="text-xl font-black text-slate-900 tracking-tight">大图模式配置</h3>
              
              <div class="space-y-4">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest text-red-500">Banner 底图上传 *</label>
                <div id="full-image-upload-area" class="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                  {banner?.full_image_url ? (
                    <div class="relative inline-block rounded-2xl overflow-hidden shadow-2xl">
                      <img src={banner.full_image_url} class="max-w-md max-h-64 object-contain" id="full-image-preview" />
                      <button type="button" id="remove-full-image" class="absolute top-2 right-2 bg-red-500 text-white rounded-xl w-8 h-8 flex items-center justify-center shadow-lg">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <div id="full-image-placeholder">
                      <div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-image text-3xl text-slate-400"></i>
                      </div>
                      <p class="text-sm font-black text-slate-900 text-blue-600">点击上传整屏 Banner</p>
                      <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">建议尺寸: 1920x600 px</p>
                    </div>
                  )}
                </div>
                <input type="file" id="full-image-upload" accept="image/*" class="hidden" />
                <input type="hidden" id="full-image-url" value={banner?.full_image_url || ''} />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">大图跳转链接</label>
                  <input type="text" id="link-url" class="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold" value={banner?.link_url || ''} />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">跳转方式</label>
                  <select id="link-target" class="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold">
                    <option value="_self" selected={banner?.link_target === '_self' || !banner}>当前页面</option>
                    <option value="_blank" selected={banner?.link_target === '_blank'}>新页面打开</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* JavaScript - 原有的文件上传逻辑 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const languages = ['zh', 'en', 'jp', 'hk'];
            const isCategoryBanner = ${JSON.stringify(isCategoryBanner)};
            const isEdit = ${JSON.stringify(isEdit)};
            const apiPath = ${JSON.stringify(apiPath)};
            const basePath = ${JSON.stringify(basePath)};
            
            // 初始化显示字段
            function toggleFields() {
              const position = document.getElementById('text-position').value;
              const textImageFields = document.getElementById('text-image-fields');
              const fullImageFields = document.getElementById('full-image-fields');
              
              if (position === 'no-text') {
                textImageFields.classList.add('hidden');
                fullImageFields.classList.remove('hidden');
              } else {
                textImageFields.classList.remove('hidden');
                fullImageFields.classList.add('hidden');
              }
            }
            
            document.getElementById('text-position').addEventListener('change', toggleFields);
            toggleFields();

            // Tab 切换
            document.querySelectorAll('.banner-lang-tab').forEach(tab => {
              tab.addEventListener('click', function() {
                const lang = this.dataset.lang;
                document.querySelectorAll('.banner-lang-tab').forEach(t => {
                  t.classList.remove('bg-white', 'text-slate-900');
                  t.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-white/10');
                });
                this.classList.add('bg-white', 'text-slate-900');
                this.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-white/10');
                
                document.querySelectorAll('.banner-lang-content').forEach(c => c.classList.add('hidden'));
                document.querySelector(\`.banner-lang-content[data-lang="\${lang}"]\`).classList.remove('hidden');
              });
            });

            // 颜色选择器同步
            function syncColorPicker(pickerId, inputId) {
              const picker = document.getElementById(pickerId);
              const input = document.getElementById(inputId);
              if (!picker || !input) return;

              picker.addEventListener('input', () => {
                input.value = picker.value;
              });

              input.addEventListener('input', () => {
                const val = input.value.trim();
                if (/^#[0-9A-F]{6}$/i.test(val)) {
                  picker.value = val;
                }
              });
              
              // 设置初始值
              const initialVal = input.value.trim();
              if (/^#[0-9A-F]{6}$/i.test(initialVal)) {
                picker.value = initialVal;
              }
            }

            ['text-color', 'subtitle-color', 'background-color'].forEach(id => {
              syncColorPicker(id + '-picker', id);
            });

            // ---------------- 原有的上传与保存逻辑 ----------------
            const pendingBackgroundFiles = {};
            
            function initBackgroundPreview(lang) {
              const backgroundUrl = document.getElementById('background-url-' + lang)?.value || '';
              if (!backgroundUrl) return;
              
              const previewImg = document.getElementById('background-preview-' + lang);
              const previewVideo = document.getElementById('background-preview-video-' + lang);
              const previewContainer = document.getElementById('background-preview-container-' + lang);
              const placeholder = document.getElementById('background-placeholder-' + lang);
              
              const isVideo = /\\.(mp4|webm|ogg|mov|avi|wmv)$/i.test(backgroundUrl) || backgroundUrl.startsWith('data:video/');
              
              if (previewContainer) {
                previewContainer.classList.remove('hidden');
                if (isVideo) {
                  if (previewVideo) { previewVideo.src = backgroundUrl; previewVideo.classList.remove('hidden'); }
                  if (previewImg) previewImg.classList.add('hidden');
                } else {
                  if (previewImg) { previewImg.src = backgroundUrl; previewImg.classList.remove('hidden'); }
                  if (previewVideo) previewVideo.classList.add('hidden');
                }
              }
              if (placeholder) placeholder.classList.add('hidden');
            }
            
            languages.forEach(lang => initBackgroundPreview(lang));

            function setupFileUpload(uploadBtnId, fileInputId, urlInputId, previewId, placeholderId, removeBtnId, delayUpload = false, lang = null) {
              const uploadArea = document.getElementById(uploadBtnId);
              const fileInput = document.getElementById(fileInputId);
              const urlInput = document.getElementById(urlInputId);
              const removeBtn = document.getElementById(removeBtnId);
              
              if (uploadArea && fileInput) {
                uploadArea.addEventListener('click', () => fileInput.click());
                
                fileInput.addEventListener('change', async function() {
                  const file = this.files[0];
                  if (!file) return;
                  
                  if (delayUpload && lang) {
                    pendingBackgroundFiles[lang] = file;
                    const localUrl = URL.createObjectURL(file);
                    const container = document.getElementById('background-preview-container-' + lang);
                    const previewImg = document.getElementById('background-preview-' + lang);
                    const previewVideo = document.getElementById('background-preview-video-' + lang);
                    const placeholder = document.getElementById('background-placeholder-' + lang);
                    
                    container.classList.remove('hidden');
                    placeholder.classList.add('hidden');
                    
                    if (file.type.startsWith('video/')) {
                      if (previewVideo) { previewVideo.src = localUrl; previewVideo.classList.remove('hidden'); }
                      if (previewImg) previewImg.classList.add('hidden');
                    } else {
                      if (previewImg) { previewImg.src = localUrl; previewImg.classList.remove('hidden'); }
                      if (previewVideo) previewVideo.classList.add('hidden');
                    }
                    
                    if (urlInput) {
                      urlInput.value = '';
                      urlInput.setAttribute('data-pending-upload', 'true');
                    }
                    return;
                  }
                  
                  // 立即上传 (Full Image模式)
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('category', 'contents');
                  
                  try {
                    const response = await fetch('/api/admin/upload/image', { method: 'POST', body: formData });
                    const result = await response.json();
                    const imageUrl = result.success && result.data ? result.data.url : (result.url || '');
                    
                    if (result.success && imageUrl) {
                      urlInput.value = imageUrl;
                      const uploadArea = document.getElementById(uploadBtnId);
                      const placeholder = document.getElementById(placeholderId);
                      
                      if (uploadArea) {
                        // 隐藏占位符
                        if (placeholder) {
                          placeholder.classList.add('hidden');
                        }
                        
                        // 检查是否已有预览容器
                        let previewContainer = uploadArea.querySelector('.relative.inline-block');
                        let previewImg = document.getElementById(previewId);
                        
                        if (!previewContainer) {
                          // 创建预览容器
                          previewContainer = document.createElement('div');
                          previewContainer.className = 'relative inline-block rounded-2xl overflow-hidden shadow-2xl';
                          
                          previewImg = document.createElement('img');
                          previewImg.id = previewId;
                          previewImg.className = 'max-w-md max-h-64 object-contain';
                          previewContainer.appendChild(previewImg);
                          
                          // 创建删除按钮
                          const removeBtn = document.createElement('button');
                          removeBtn.type = 'button';
                          removeBtn.id = removeBtnId;
                          removeBtn.className = 'absolute top-2 right-2 bg-red-500 text-white rounded-xl w-8 h-8 flex items-center justify-center shadow-lg hover:scale-110 transition-all';
                          removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                          previewContainer.appendChild(removeBtn);
                          
                          uploadArea.appendChild(previewContainer);
                        }
                        
                        // 设置图片源
                        if (previewImg) {
                          previewImg.src = imageUrl;
                        }
                        
                        // 确保预览容器可见
                        previewContainer.classList.remove('hidden');
                        previewContainer.style.display = 'block';
                      }
                    }
                  } catch (e) { alert('上传失败: ' + e.message); }
                });
              }
              
              if (removeBtn) {
                removeBtn.addEventListener('click', function(e) {
                  e.stopPropagation();
                  urlInput.value = '';
                  urlInput.removeAttribute('data-pending-upload');
                  if (lang) {
                    document.getElementById('background-preview-container-' + lang).classList.add('hidden');
                    document.getElementById('background-placeholder-' + lang).classList.remove('hidden');
                    if (delayUpload) delete pendingBackgroundFiles[lang];
                  } else {
                    // Full Image模式：移除预览容器，显示占位符
                    const uploadArea = document.getElementById(uploadBtnId);
                    const placeholder = document.getElementById(placeholderId);
                    const previewContainer = uploadArea?.querySelector('.relative.inline-block');
                    
                    if (previewContainer) {
                      previewContainer.remove();
                    }
                    if (placeholder) {
                      placeholder.classList.remove('hidden');
                    }
                  }
                });
              }
            }
            
            async function uploadFile(file) {
              const isVideo = file.type.startsWith('video/');
              const formData = new FormData();
              formData.append('file', file);
              formData.append('category', isVideo ? 'videos' : 'temp');
              
              const res = await fetch(isVideo ? '/api/admin/upload/file' : '/api/admin/upload/image', { method: 'POST', body: formData });
              const result = await res.json();
              if (result.success && (result.data?.url || result.url)) return result.data?.url || result.url;
              throw new Error(result.message || '上传失败');
            }

            languages.forEach(lang => {
              setupFileUpload('background-upload-area-'+lang, 'background-upload-'+lang, 'background-url-'+lang, 'background-preview-'+lang, 'background-placeholder-'+lang, 'remove-background-'+lang, true, lang);
            });
            // Full Image上传：需要特殊处理，因为预览容器可能不存在
            const fullImageUploadArea = document.getElementById('full-image-upload-area');
            const fullImageFileInput = document.getElementById('full-image-upload');
            const fullImageUrlInput = document.getElementById('full-image-url');
            const fullImagePlaceholder = document.getElementById('full-image-placeholder');
            
            if (fullImageUploadArea && fullImageFileInput) {
              fullImageUploadArea.addEventListener('click', () => fullImageFileInput.click());
              
              fullImageFileInput.addEventListener('change', async function() {
                const file = this.files[0];
                if (!file) return;
                
                const formData = new FormData();
                formData.append('file', file);
                formData.append('category', 'contents');
                
                try {
                  const response = await fetch('/api/admin/upload/image', { method: 'POST', body: formData });
                  const result = await response.json();
                  const imageUrl = result.success && result.data ? result.data.url : (result.url || '');
                  
                  if (result.success && imageUrl) {
                    fullImageUrlInput.value = imageUrl;
                    
                    // 隐藏占位符
                    if (fullImagePlaceholder) {
                      fullImagePlaceholder.classList.add('hidden');
                    }
                    
                    // 检查是否已有预览容器
                    let previewContainer = fullImageUploadArea.querySelector('.relative.inline-block');
                    let previewImg = document.getElementById('full-image-preview');
                    
                    if (!previewContainer) {
                      // 创建预览容器
                      previewContainer = document.createElement('div');
                      previewContainer.className = 'relative inline-block rounded-2xl overflow-hidden shadow-2xl';
                      
                      previewImg = document.createElement('img');
                      previewImg.id = 'full-image-preview';
                      previewImg.className = 'max-w-md max-h-64 object-contain';
                      previewContainer.appendChild(previewImg);
                      
                      // 创建删除按钮
                      const removeBtn = document.createElement('button');
                      removeBtn.type = 'button';
                      removeBtn.id = 'remove-full-image';
                      removeBtn.className = 'absolute top-2 right-2 bg-red-500 text-white rounded-xl w-8 h-8 flex items-center justify-center shadow-lg hover:scale-110 transition-all';
                      removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                      previewContainer.appendChild(removeBtn);
                      
                      fullImageUploadArea.appendChild(previewContainer);
                      
                      // 绑定删除按钮事件
                      removeBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        fullImageUrlInput.value = '';
                        previewContainer.remove();
                        if (fullImagePlaceholder) {
                          fullImagePlaceholder.classList.remove('hidden');
                        }
                      });
                    }
                    
                    // 设置图片源
                    if (previewImg) {
                      previewImg.src = imageUrl;
                    }
                  }
                } catch (e) {
                  alert('上传失败: ' + e.message);
                }
              });
            }
            
            // 处理已有的删除按钮（编辑模式）
            const existingRemoveBtn = document.getElementById('remove-full-image');
            if (existingRemoveBtn) {
              existingRemoveBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const fullImageUrlInput = document.getElementById('full-image-url');
                const fullImagePlaceholder = document.getElementById('full-image-placeholder');
                const previewContainer = this.closest('.relative.inline-block');
                
                if (fullImageUrlInput) {
                  fullImageUrlInput.value = '';
                }
                if (previewContainer) {
                  previewContainer.remove();
                }
                if (fullImagePlaceholder) {
                  fullImagePlaceholder.classList.remove('hidden');
                }
              });
            }

            document.getElementById('banner-form').addEventListener('submit', async function(e) {
              e.preventDefault();
              const btn = document.getElementById('submit-btn');
              const textPos = document.getElementById('text-position').value;
              const bType = textPos === 'no-text' ? 'full_image' : 'text_image';
              
              btn.disabled = true;
              btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 处理中...';
              
              try {
                const backgroundUrls = {};
                for (const lang of languages) {
                  if (pendingBackgroundFiles[lang]) {
                    backgroundUrls[lang] = await uploadFile(pendingBackgroundFiles[lang]);
                  } else {
                    backgroundUrls[lang] = document.getElementById('background-url-' + lang).value;
                  }
                }
                
                // 自动生成 title：使用主标题（中文）或默认值
                let autoTitle = '';
                if (bType === 'text_image') {
                  autoTitle = document.getElementById('text-title-zh')?.value || 
                             document.getElementById('text-title-en')?.value || 
                             document.getElementById('text-title-jp')?.value || 
                             document.getElementById('text-title-hk')?.value || 
                             'Banner ' + new Date().toLocaleString('zh-CN');
                } else {
                  autoTitle = 'Full Image Banner ' + new Date().toLocaleString('zh-CN');
                }
                
                const formData = {
                  banner_type: bType,
                  title: autoTitle,
                  sort_order: parseInt(document.getElementById('sort-order').value) || 0,
                  status: document.getElementById('banner-status').value,
                  text_position: textPos
                };
                
                if (isCategoryBanner) {
                  const catId = document.getElementById('category-id').value;
                  if (catId) formData.category_id = parseInt(catId);
                }
                
                if (bType === 'text_image') {
                  languages.forEach(lang => {
                    formData['text_title_' + lang] = document.getElementById('text-title-' + lang).value;
                    formData['text_subtitle_' + lang] = document.getElementById('text-subtitle-' + lang).value;
                    formData['text_button_' + lang] = document.getElementById('text-button-' + lang).value;
                    formData['background_url_' + lang] = backgroundUrls[lang] || '';
                  });
                  formData.text_title = formData.text_title_zh;
                  formData.text_subtitle = formData.text_subtitle_zh;
                  formData.text_button = formData.text_button_zh;
                  formData.background_url = formData.background_url_zh;
                  formData.text_color = document.getElementById('text-color').value;
                  formData.subtitle_color = document.getElementById('subtitle-color').value;
                  formData.background_color = document.getElementById('background-color').value;
                  formData.button_link = document.getElementById('button-link').value;
                  formData.button_target = document.getElementById('button-target').value;
                } else {
                  formData.full_image_url = document.getElementById('full-image-url').value;
                  formData.link_url = document.getElementById('link-url').value;
                  formData.link_target = document.getElementById('link-target').value;
                }
                
                const bannerId = document.getElementById('banner-id').value;
                const method = bannerId ? 'PUT' : 'POST';
                const url = bannerId ? \`\${apiPath}/\${bannerId}\` : apiPath;
                
                const response = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData)
                });
                const result = await response.json();
                if (result.success) {
                  window.location.href = basePath;
                } else {
                  alert('保存失败: ' + result.message);
                }
              } catch (e) { alert('保存发生错误: ' + e.message); }
              finally { btn.disabled = false; btn.textContent = isEdit ? '保存更新' : '立即发布'; }
            });
          })();
        `
      }} />
    </div>
  )
}
