import { FC } from 'hono/jsx'

interface Banner {
  id?: number
  category_id?: number | null  // 栏目分类ID（仅栏目Banner使用）
  banner_type: 'text_image' | 'full_image'
  title: string
  sort_order: number
  status: 'draft' | 'published'
  
  // 文字+图片模式
  text_title?: string
  text_subtitle?: string
  text_button?: string
  // 多语言字段
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
  image_url?: string
  background_type?: string
  background_url?: string
  
  // 整张大图模式
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
  basePath?: string  // 基础路径，默认为 /ticloudadmin/resource-banners
  apiPath?: string   // API路径，默认为 /api/resource-center/banners
  categories?: Category[]  // 栏目分类列表（仅栏目Banner使用）
}

export const BannerEditor: FC<BannerEditorProps> = ({ 
  banner = null, 
  mode,
  basePath = '/ticloudadmin/resource-banners',
  apiPath = '/api/resource-center/banners',
  categories = []
}) => {
  const isEdit = mode === 'edit'
  const title = isEdit ? '编辑Banner' : '添加新Banner'
  const isCategoryBanner = apiPath.includes('category-banners')  // 判断是否为栏目Banner
  
  return (
    <div class="p-4">
      {/* 页面顶部操作区 */}
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <a 
          href={basePath}
          class="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <i class="fas fa-arrow-left mr-2"></i>
          返回列表
        </a>
      </div>

      {/* 表单卡片 */}
      <div class="bg-white rounded border border-gray-200 p-6">
        <form id="banner-form" class="space-y-6">
          <input type="hidden" id="banner-id" value={banner?.id || ''} />
          
          {/* 1. 排版选择 */}
          <div class="flex items-start">
            <label class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
              <span class="text-red-500">*</span> 排版
            </label>
            <div class="flex-1">
              <select 
                id="text-position"
                class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required>
                <option value="left" selected={banner?.text_position === 'left' || (!banner && !banner?.text_position)}>左</option>
                <option value="center" selected={banner?.text_position === 'center'}>中</option>
                <option value="right" selected={banner?.text_position === 'right'}>右</option>
                <option value="no-text" selected={banner?.text_position === 'no-text' || banner?.banner_type === 'full_image'}>无文字</option>
              </select>
              <p class="text-xs text-gray-500 mt-1">下拉可选择按钮的排版:左、中、右、无文字,选择无文字之后,通过模式B的上传方式上传</p>
            </div>
          </div>

          {/* 2. 说明/标题 */}
          <div class="flex items-start">
            <label for="banner-title" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
              <span class="text-red-500">*</span> 说明
            </label>
            <div class="flex-1">
              <input 
                type="text" 
                id="banner-title" 
                class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="主要是AI检索下的内容"
                value={banner?.title || ''}
                required 
              />
              <p class="text-xs text-gray-500 mt-1">用于后台识别,不会显示在前台</p>
            </div>
          </div>

          {/* 2.5. 栏目分类（仅栏目Banner显示） */}
          {isCategoryBanner && (
            <div class="flex items-start">
              <label for="category-id" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
                <span class="text-red-500">*</span> 栏目分类
              </label>
              <div class="flex-1">
                <select 
                  id="category-id"
                  class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required={isCategoryBanner}
                >
                  <option value="">请选择栏目分类</option>
                  {categories.map((cat) => (
                    <option 
                      value={cat.id} 
                      selected={banner?.category_id === cat.id}
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
                <p class="text-xs text-gray-500 mt-1">选择该Banner所属的栏目分类</p>
              </div>
            </div>
          )}

          {/* 3. 排序 */}
          <div class="flex items-start">
            <label for="sort-order" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
              <span class="text-red-500">*</span> 排序
            </label>
            <div class="flex-1">
              <input 
                type="number" 
                id="sort-order" 
                class="w-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={banner?.sort_order || 0}
                min="0"
                required 
              />
              <p class="text-xs text-gray-500 mt-1">数字越小越靠前,设置完毕后点击排序按钮实现排序功能</p>
            </div>
          </div>

          {/* 4. 状态 */}
          <div class="flex items-start">
            <label class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
              状态
            </label>
            <div class="flex-1">
              <select 
                id="banner-status"
                class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="draft" selected={banner?.status === 'draft' || !banner}>草稿</option>
                <option value="published" selected={banner?.status === 'published'}>已发布</option>
              </select>
            </div>
          </div>

          {/* ========== 文字+图片模式字段 (默认显示) ========== */}
          <div id="text-image-fields" style="display: none;">
            <div class="border-t pt-6 mt-6">
              {/* 多语言切换标签 */}
              <div class="bg-blue-600 px-6 pt-4 pb-0 flex justify-between items-end mb-6 rounded-t-xl">
                <div class="flex items-center text-white mb-4">
                  <i class="fas fa-language mr-3 text-blue-200"></i>
                  <h3 class="text-sm font-black uppercase tracking-widest">文字内容与多语言设定</h3>
                </div>
                <nav class="flex space-x-1" aria-label="语言切换">
                  {['zh', 'en', 'jp', 'hk'].map((lang, idx) => (
                    <button type="button" data-lang={lang} 
                      class={`banner-lang-tab px-6 py-3 text-xs font-black uppercase tracking-tighter transition-all rounded-t-xl ${idx === 0 ? 'bg-white text-blue-600' : 'text-blue-100 hover:bg-blue-500'}`}>
                      {lang === 'zh' ? '简体中文' : lang === 'en' ? 'English' : lang === 'jp' ? '日本語' : '繁體中文'}
                    </button>
                  ))}
                </nav>
              </div>

              <div class="bg-white border-2 border-blue-500 border-t-0 rounded-b-xl p-6">
                {[
                  { id: 'zh', label: '简体中文' },
                  { id: 'en', label: 'English' },
                  { id: 'jp', label: '日本語' },
                  { id: 'hk', label: '繁體中文' }
                ].map((lang, idx) => (
                  <div class={`banner-lang-content space-y-6 ${idx !== 0 ? 'hidden' : ''}`} data-lang={lang.id}>
                    {/* 标题 */}
                    <div class="flex items-start">
                      <label class="w-32 text-sm text-gray-700 font-black text-right mr-6 pt-2">
                        标题
                      </label>
                      <div class="flex-1">
                        <textarea 
                          id={`text-title-${lang.id}`} 
                          rows="2"
                          class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all text-sm placeholder-gray-300 resize-none"
                          placeholder={`请输入${lang.label}Banner主标题...`}
                        >{(banner as any)?.[`text_title_${lang.id}`] || (lang.id === 'zh' ? banner?.text_title : '')}</textarea>
                      </div>
                    </div>

                    {/* 副标题 */}
                    <div class="flex items-start">
                      <label class="w-32 text-sm text-gray-700 font-black text-right mr-6 pt-2">
                        副标题
                      </label>
                      <div class="flex-1">
                        <textarea 
                          id={`text-subtitle-${lang.id}`} 
                          rows="3"
                          class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all text-sm placeholder-gray-300 resize-none"
                          placeholder={`请输入${lang.label}Banner副标题...`}
                        >{(banner as any)?.[`text_subtitle_${lang.id}`] || (lang.id === 'zh' ? banner?.text_subtitle : '')}</textarea>
                      </div>
                    </div>

                    {/* 按钮文字 */}
                    <div class="flex items-start">
                      <label class="w-32 text-sm text-gray-700 font-black text-right mr-6 pt-2">
                        按钮文字
                      </label>
                      <div class="flex-1">
                        <input 
                          type="text" 
                          id={`text-button-${lang.id}`} 
                          class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all text-sm placeholder-gray-300"
                          placeholder={`请输入${lang.label}按钮文字...`}
                          value={(banner as any)?.[`text_button_${lang.id}`] || (lang.id === 'zh' ? banner?.text_button : '')} 
                        />
                      </div>
                    </div>

                    {/* 背景（多语言） */}
                    <div class="flex items-start">
                      <label class="w-32 text-sm text-gray-700 font-black text-right mr-6 pt-2">
                        背景
                      </label>
                      <div class="flex-1">
                        <select 
                          id={`background-type-${lang.id}`}
                          class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2">
                          <option value="image" selected={banner?.background_type === 'image' || !banner}>图片/动图/视频</option>
                        </select>
                        <p class="text-xs text-gray-500 mb-2">下拉选择</p>
                        
                        <div id={`background-upload-area-${lang.id}`} class="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                          <div id={`background-preview-container-${lang.id}`} style={(banner as any)?.[`background_url_${lang.id}`] || (lang.id === 'zh' ? banner?.background_url : '') ? 'display: block;' : 'display: none;'}>
                            <div class="relative inline-block">
                              <img 
                                src={(banner as any)?.[`background_url_${lang.id}`] || (lang.id === 'zh' ? banner?.background_url : '') || ''} 
                                alt={`${lang.label}背景预览`} 
                                class="max-w-xs max-h-40 object-contain"
                                id={`background-preview-${lang.id}`}
                                style="display: none;"
                              />
                              <video 
                                src={(banner as any)?.[`background_url_${lang.id}`] || (lang.id === 'zh' ? banner?.background_url : '') || ''} 
                                class="max-w-xs max-h-40 object-contain"
                                id={`background-preview-video-${lang.id}`}
                                controls
                                style="display: none;"
                              />
                              <button 
                                type="button"
                                id={`remove-background-${lang.id}`}
                                class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                ×
                              </button>
                            </div>
                          </div>
                          <div id={`background-placeholder-${lang.id}`} style={(banner as any)?.[`background_url_${lang.id}`] || (lang.id === 'zh' ? banner?.background_url : '') ? 'display: none;' : 'display: block;'}>
                            <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                            <p class="text-sm text-gray-500">点击后弹出文件上传</p>
                          </div>
                        </div>
                        <input 
                          type="file" 
                          id={`background-upload-${lang.id}`} 
                          accept="image/*,video/*"
                          class="hidden"
                          data-lang={lang.id}
                        />
                        <input type="hidden" id={`background-url-${lang.id}`} value={(banner as any)?.[`background_url_${lang.id}`] || (lang.id === 'zh' ? banner?.background_url : '') || ''} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 通用配置（所有语言共用） */}
              <div class="mt-6 space-y-6">

              {/* 文字颜色 */}
              <div class="flex items-start mb-6">
                <label for="text-color" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
                  文字颜色
                </label>
                <div class="flex-1">
                  <input 
                    type="text" 
                    id="text-color" 
                    class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="rgba(255,255,255,1)"
                    value={banner?.text_color || 'rgba(255,255,255,1)'}
                  />
                  <p class="text-xs text-gray-500 mt-1">格式: rgba(R,G,B,透明度)</p>
                </div>
              </div>

              {/* 副标题颜色 */}
              <div class="flex items-start mb-6">
                <label for="subtitle-color" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
                  副标题颜色
                </label>
                <div class="flex-1">
                  <input 
                    type="text" 
                    id="subtitle-color" 
                    class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="rgba(255,255,255,0.8)"
                    value={banner?.subtitle_color || 'rgba(255,255,255,0.8)'}
                  />
                </div>
              </div>

              {/* 链接地址 */}
              <div class="flex items-start mb-6">
                <label for="button-link" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
                  链接地址
                </label>
                <div class="flex-1">
                  <input 
                    type="text" 
                    id="button-link" 
                    class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="用于设置banner的链接"
                    value={banner?.button_link || ''}
                  />
                  <p class="text-xs text-gray-500 mt-1">用于设置banner的链接</p>
                </div>
              </div>

              {/* 打开方式 */}
              <div class="flex items-start mb-6">
                <label class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
                  打开方式
                </label>
                <div class="flex-1">
                  <select 
                    id="button-target"
                    class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="_self" selected={banner?.button_target === '_self' || !banner}>当前页面</option>
                    <option value="_blank" selected={banner?.button_target === '_blank'}>新页面</option>
                  </select>
                  <p class="text-xs text-gray-500 mt-1">点击弹出下拉,可选当前页面、新页面</p>
                </div>
              </div>

              </div>
            </div>
          </div>

          {/* ========== 整张大图模式字段 ========== */}
          <div id="full-image-fields" style="display: none;">
            <div class="border-t pt-6 mt-6">
              <h3 class="text-base font-semibold mb-4 text-gray-800">整张大图模式配置</h3>
              
              {/* 图片上传 */}
              <div class="flex items-start mb-6">
                <label class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
                  <span class="text-red-500">*</span> 图片
                </label>
                <div class="flex-1">
                  <div id="full-image-upload-area" class="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                    {banner?.full_image_url ? (
                      <div class="relative inline-block">
                        <img 
                          src={banner.full_image_url} 
                          alt="Banner预览" 
                          class="max-w-md max-h-48 object-contain"
                          id="full-image-preview"
                        />
                        <button 
                          type="button"
                          id="remove-full-image"
                          class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                          ×
                        </button>
                      </div>
                    ) : (
                      <div id="full-image-placeholder">
                        <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                        <p class="text-sm text-gray-500">点击上传Banner图片</p>
                        <p class="text-xs text-gray-400 mt-1">即banner的预览图</p>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    id="full-image-upload" 
                    accept="image/*"
                    class="hidden"
                  />
                  <input type="hidden" id="full-image-url" value={banner?.full_image_url || ''} />
                </div>
              </div>

              {/* 链接地址 */}
              <div class="flex items-start mb-6">
                <label for="link-url" class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
                  链接地址
                </label>
                <div class="flex-1">
                  <input 
                    type="text" 
                    id="link-url" 
                    class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="https://www.ti-net.com.cn/news/11990.html"
                    value={banner?.link_url || ''}
                  />
                </div>
              </div>

              {/* 打开方式 */}
              <div class="flex items-start mb-6">
                <label class="w-32 text-sm text-gray-600 text-right mr-4 pt-2">
                  打开方式
                </label>
                <div class="flex-1">
                  <select 
                    id="link-target"
                    class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="_self" selected={banner?.link_target === '_self' || !banner}>当前页面</option>
                    <option value="_blank" selected={banner?.link_target === '_blank'}>新页面</option>
                  </select>
                  <p class="text-xs text-gray-500 mt-1">点击弹出下拉,可选当前页面、新页面</p>
                </div>
              </div>
            </div>
          </div>

          {/* 提交按钮 */}
          <div class="flex items-center justify-end space-x-3 pt-6 border-t">
            <a 
              href={basePath}
              class="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
              取消
            </a>
            <button 
              type="submit"
              id="submit-btn"
              class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              {isEdit ? '保存更新' : '发布'}
            </button>
          </div>
        </form>
      </div>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const languages = ['zh', 'en', 'jp', 'hk'];
            
            // Banner多语言Tab切换逻辑
            document.querySelectorAll('.banner-lang-tab').forEach(tab => {
              tab.addEventListener('click', function() {
                const lang = this.dataset.lang;
                document.querySelectorAll('.banner-lang-tab').forEach(t => {
                  t.classList.remove('bg-white', 'text-blue-600');
                  t.classList.add('text-blue-100', 'hover:bg-blue-500');
                });
                this.classList.add('bg-white', 'text-blue-600');
                this.classList.remove('text-blue-100', 'hover:bg-blue-500');
                
                document.querySelectorAll('.banner-lang-content').forEach(c => c.classList.add('hidden'));
                document.querySelector(\`.banner-lang-content[data-lang="\${lang}"]\`).classList.remove('hidden');
              });
            });
            
            const textPosition = document.getElementById('text-position');
            const textImageFields = document.getElementById('text-image-fields');
            const fullImageFields = document.getElementById('full-image-fields');
            
            // 切换显示字段
            function toggleFields() {
              const position = textPosition.value;
              if (position === 'no-text') {
                // 无文字 -> 显示模式B（整张大图）
                textImageFields.style.display = 'none';
                fullImageFields.style.display = 'block';
              } else {
                // 左/中/右 -> 显示模式A（文字+图片）
                textImageFields.style.display = 'block';
                fullImageFields.style.display = 'none';
              }
            }
            
            // 初始化显示
            toggleFields();
            textPosition.addEventListener('change', toggleFields);

            // 存储待上传的背景文件（按语言存储）
            const pendingBackgroundFiles = {};
            
            // 初始化背景预览显示（多语言）
            function initBackgroundPreview(lang) {
              const backgroundUrlInput = document.getElementById('background-url-' + lang);
              const backgroundUrl = backgroundUrlInput?.value || '';
              if (!backgroundUrl) return;
              
              const previewImg = document.getElementById('background-preview-' + lang);
              const previewVideo = document.getElementById('background-preview-video-' + lang);
              const previewContainer = document.getElementById('background-preview-container-' + lang);
              const placeholder = document.getElementById('background-placeholder-' + lang);
              
              // 判断是图片还是视频
              const isVideo = /\.(mp4|webm|ogg|mov|avi|wmv)$/i.test(backgroundUrl) || backgroundUrl.startsWith('data:video/');
              
              if (previewContainer) {
                previewContainer.style.display = 'block';
                
                if (isVideo) {
                  if (previewVideo) {
                    previewVideo.src = backgroundUrl;
                    previewVideo.style.display = 'block';
                  }
                  if (previewImg) {
                    previewImg.style.display = 'none';
                  }
                } else {
                  if (previewImg) {
                    previewImg.src = backgroundUrl;
                    previewImg.style.display = 'block';
                  }
                  if (previewVideo) {
                    previewVideo.style.display = 'none';
                  }
                }
              }
              
              if (placeholder) {
                placeholder.style.display = 'none';
              }
            }
            
            // 为每个语言初始化背景预览
            languages.forEach(lang => {
              initBackgroundPreview(lang);
            });

            // 文件上传处理函数（支持多语言背景）
            function setupFileUpload(uploadBtnId, fileInputId, urlInputId, previewId, placeholderId, removeBtnId, delayUpload = false, lang = null) {
              const uploadArea = document.getElementById(uploadBtnId);
              const fileInput = document.getElementById(fileInputId);
              const urlInput = document.getElementById(urlInputId);
              const preview = document.getElementById(previewId);
              const placeholder = document.getElementById(placeholderId);
              const removeBtn = document.getElementById(removeBtnId);
              
              if (uploadArea && fileInput) {
                uploadArea.addEventListener('click', () => fileInput.click());
                
                fileInput.addEventListener('change', async function() {
                  const file = this.files[0];
                  if (!file) return;
                  
                  // 如果是延迟上传（背景字段），只保存文件并显示预览
                  if (delayUpload && lang) {
                    pendingBackgroundFiles[lang] = file;
                    
                    // 创建本地预览URL
                    const localPreviewUrl = URL.createObjectURL(file);
                    
                    // 显示预览，隐藏占位符（使用语言特定的ID）
                    const previewContainer = document.getElementById('background-preview-container-' + lang);
                    const previewImg = document.getElementById('background-preview-' + lang);
                    const previewVideo = document.getElementById('background-preview-video-' + lang);
                    
                    // 判断是图片还是视频
                    const isVideo = file.type.startsWith('video/');
                    
                    if (previewContainer) {
                      previewContainer.style.display = 'block';
                      
                      if (isVideo) {
                        // 显示视频预览
                        if (previewVideo) {
                          previewVideo.src = localPreviewUrl;
                          previewVideo.style.display = 'block';
                        }
                        if (previewImg) {
                          previewImg.style.display = 'none';
                        }
                      } else {
                        // 显示图片预览
                        if (previewImg) {
                          previewImg.src = localPreviewUrl;
                          previewImg.style.display = 'block';
                        }
                        if (previewVideo) {
                          previewVideo.style.display = 'none';
                        }
                      }
                    }
                    
                    if (placeholder) {
                      placeholder.style.display = 'none';
                    }
                    
                    // 清空URL输入，标记需要上传
                    if (urlInput) {
                      urlInput.value = '';
                      urlInput.setAttribute('data-pending-upload', 'true');
                    }
                    
                    return;
                  }
                  
                  // 立即上传（其他字段，如整张大图）
                  const formData = new FormData();
                  formData.append('file', file);
                  // 整张大图使用 'contents' 分类
                  formData.append('category', 'contents');
                  
                  try {
                    const response = await fetch('/api/admin/upload/image', {
                      method: 'POST',
                      body: formData
                    });
                    
                    // 检查响应状态
                    if (!response.ok) {
                      const errorText = await response.text();
                      throw new Error('服务器错误: ' + response.status + ' ' + errorText);
                    }
                    
                    // 检查内容类型
                    const contentType = response.headers.get('content-type');
                    if (!contentType || !contentType.includes('application/json')) {
                      const text = await response.text();
                      throw new Error('服务器返回的不是JSON格式: ' + text.substring(0, 100));
                    }
                    
                    const result = await response.json();
                    
                    // 处理响应格式：/api/admin/upload/image 返回 { success: true, data: { url: ... } }
                    const imageUrl = result.success && result.data ? result.data.url : (result.url || '');
                    
                    if (result.success && imageUrl) {
                      urlInput.value = imageUrl;
                      
                      if (preview) {
                        preview.src = imageUrl;
                        preview.parentElement.style.display = 'block';
                      }
                      if (placeholder) {
                        placeholder.style.display = 'none';
                      }
                    } else {
                      alert('上传失败: ' + (result.message || result.error || '未知错误'));
                    }
                  } catch (error) {
                    console.error('上传错误详情:', error);
                    alert('上传失败: ' + (error.message || '未知错误'));
                  }
                });
              }
              
              if (removeBtn) {
                removeBtn.addEventListener('click', function() {
                  if (urlInput) {
                    urlInput.value = '';
                    urlInput.removeAttribute('data-pending-upload');
                  }
                  
                  // 清理预览（图片和视频）- 使用语言特定的ID
                  if (lang) {
                    const previewImg = document.getElementById('background-preview-' + lang);
                    const previewVideo = document.getElementById('background-preview-video-' + lang);
                    const previewContainer = document.getElementById('background-preview-container-' + lang);
                    const placeholder = document.getElementById('background-placeholder-' + lang);
                    
                    if (previewImg) {
                      if (previewImg.src && previewImg.src.startsWith('blob:')) {
                        URL.revokeObjectURL(previewImg.src);
                      }
                      previewImg.src = '';
                      previewImg.style.display = 'none';
                    }
                    if (previewVideo) {
                      if (previewVideo.src && previewVideo.src.startsWith('blob:')) {
                        URL.revokeObjectURL(previewVideo.src);
                      }
                      previewVideo.src = '';
                      previewVideo.style.display = 'none';
                    }
                    if (previewContainer) {
                      previewContainer.style.display = 'none';
                    }
                    if (placeholder) {
                      placeholder.style.display = 'block';
                    }
                    
                    // 清除待上传文件
                    if (delayUpload && lang) {
                      delete pendingBackgroundFiles[lang];
                    }
                  } else {
                    // 非多语言字段的清理逻辑（保持兼容）
                    const previewImg = document.getElementById(previewId);
                    const previewVideo = document.getElementById(previewId + '-video');
                    const previewContainer = previewImg?.parentElement;
                    
                    if (previewImg) {
                      if (previewImg.src && previewImg.src.startsWith('blob:')) {
                        URL.revokeObjectURL(previewImg.src);
                      }
                      previewImg.src = '';
                      previewImg.style.display = 'none';
                    }
                    if (previewVideo) {
                      if (previewVideo.src && previewVideo.src.startsWith('blob:')) {
                        URL.revokeObjectURL(previewVideo.src);
                      }
                      previewVideo.src = '';
                      previewVideo.style.display = 'none';
                    }
                    if (previewContainer) {
                      previewContainer.style.display = 'none';
                    }
                    if (placeholder) {
                      placeholder.style.display = 'block';
                    }
                  }
                  
                  if (fileInput) {
                    fileInput.value = '';
                  }
                });
              }
            }
            
            // 上传背景文件的函数（支持图片和视频）
            async function uploadBackgroundFile(file) {
              const formData = new FormData();
              formData.append('file', file);
              
              // 判断是图片还是视频
              const isVideo = file.type.startsWith('video/');
              
              // 根据文件类型选择不同的接口
              const uploadUrl = isVideo ? '/api/admin/upload/file' : '/api/admin/upload/image';
              
              if (isVideo) {
                // 视频使用 'videos' 分类
                formData.append('category', 'videos');
              } else {
                // 图片使用 'temp' 分类
                formData.append('category', 'temp');
              }
              
              const response = await fetch(uploadUrl, {
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
              
              // 处理响应格式：
              // /api/admin/upload/image 返回 { success: true, data: { url: ... } }
              // /api/admin/upload/file 返回 { success: true, data: { url: ... } }
              const fileUrl = result.success && result.data ? result.data.url : (result.url || '');
              
              if (result.success && fileUrl) {
                return fileUrl;
              } else {
                throw new Error(result.message || result.error || '上传失败');
              }
            }
            
            // 为每个语言设置背景上传
            languages.forEach(lang => {
              setupFileUpload(
                'background-upload-area-' + lang,
                'background-upload-' + lang,
                'background-url-' + lang,
                'background-preview-' + lang,
                'background-placeholder-' + lang,
                'remove-background-' + lang,
                true,
                lang
              );
            });
            
            // 整张大图：立即上传
            setupFileUpload('full-image-upload-area', 'full-image-upload', 'full-image-url', 
                           'full-image-preview', 'full-image-placeholder', 'remove-full-image', false);

            // 表单提交
            const form = document.getElementById('banner-form');
            const submitBtn = document.getElementById('submit-btn');
            
            form.addEventListener('submit', async function(e) {
              e.preventDefault();
              
              const bannerId = document.getElementById('banner-id').value;
              const isEdit = !!bannerId;
              
              // 根据排版值确定Banner类型
              const textPosition = document.getElementById('text-position').value;
              const bannerType = textPosition === 'no-text' ? 'full_image' : 'text_image';
              
              submitBtn.disabled = true;
              submitBtn.textContent = '保存中...';
              
              try {
                // 上传所有待上传的多语言背景文件
                const backgroundUrls = {};
                for (const lang of languages) {
                  if (pendingBackgroundFiles[lang]) {
                    submitBtn.textContent = '上传' + (lang === 'zh' ? '简体中文' : lang === 'en' ? '英文' : lang === 'jp' ? '日文' : '繁体中文') + '背景文件中...';
                    try {
                      const uploadedUrl = await uploadBackgroundFile(pendingBackgroundFiles[lang]);
                      backgroundUrls[lang] = uploadedUrl;
                      
                      // 更新URL输入和预览
                      const urlInput = document.getElementById('background-url-' + lang);
                      if (urlInput) {
                        urlInput.value = uploadedUrl;
                        urlInput.removeAttribute('data-pending-upload');
                      }
                      
                      // 更新预览为服务器URL
                      const previewImg = document.getElementById('background-preview-' + lang);
                      const previewVideo = document.getElementById('background-preview-video-' + lang);
                      const previewContainer = document.getElementById('background-preview-container-' + lang);
                      const placeholder = document.getElementById('background-placeholder-' + lang);
                      
                      const isVideo = pendingBackgroundFiles[lang].type.startsWith('video/');
                      const isVideoUrl = uploadedUrl && (uploadedUrl.includes('.mp4') || uploadedUrl.includes('.avi') || uploadedUrl.includes('.mov') || uploadedUrl.includes('.wmv'));
                      
                      if (previewContainer) {
                        previewContainer.style.display = 'block';
                        
                        if (isVideo || isVideoUrl) {
                          if (previewVideo) {
                            if (previewVideo.src && previewVideo.src.startsWith('blob:')) {
                              URL.revokeObjectURL(previewVideo.src);
                            }
                            previewVideo.src = uploadedUrl;
                            previewVideo.style.display = 'block';
                          }
                          if (previewImg) {
                            previewImg.style.display = 'none';
                          }
                        } else {
                          if (previewImg) {
                            if (previewImg.src && previewImg.src.startsWith('blob:')) {
                              URL.revokeObjectURL(previewImg.src);
                            }
                            previewImg.src = uploadedUrl;
                            previewImg.style.display = 'block';
                          }
                          if (previewVideo) {
                            previewVideo.style.display = 'none';
                          }
                        }
                      }
                      if (placeholder) {
                        placeholder.style.display = 'none';
                      }
                      
                      delete pendingBackgroundFiles[lang];
                    } catch (error) {
                      alert((lang === 'zh' ? '简体中文' : lang === 'en' ? '英文' : lang === 'jp' ? '日文' : '繁体中文') + '背景文件上传失败: ' + error.message);
                      submitBtn.disabled = false;
                      submitBtn.textContent = isEdit ? '保存更新' : '发布';
                      return;
                    }
                  } else {
                    // 如果没有待上传文件，使用现有的URL
                    const urlInput = document.getElementById('background-url-' + lang);
                    backgroundUrls[lang] = urlInput?.value || '';
                  }
                }
                
                submitBtn.textContent = '保存中...';
                
                const formData = {
                  banner_type: bannerType,
                  title: document.getElementById('banner-title').value,
                  sort_order: parseInt(document.getElementById('sort-order').value) || 0,
                  status: document.getElementById('banner-status').value,
                  text_position: textPosition
                };
                
                // 如果是栏目Banner，添加栏目分类ID
                const isCategoryBanner = ${JSON.stringify(isCategoryBanner)};
                if (isCategoryBanner) {
                  const categoryIdInput = document.getElementById('category-id');
                  if (categoryIdInput && categoryIdInput.value) {
                    formData.category_id = parseInt(categoryIdInput.value);
                  }
                }
                
                if (bannerType === 'text_image') {
                  // 收集多语言字段
                  for (const lang of languages) {
                    formData['text_title_' + lang] = document.getElementById('text-title-' + lang).value;
                    formData['text_subtitle_' + lang] = document.getElementById('text-subtitle-' + lang).value;
                    formData['text_button_' + lang] = document.getElementById('text-button-' + lang).value;
                    formData['background_url_' + lang] = backgroundUrls[lang] || '';
                  }
                  
                  // 同步核心字段（Fallback 为简体中文）
                  formData.text_title = formData.text_title_zh || formData.text_title_en || '';
                  formData.text_subtitle = formData.text_subtitle_zh || formData.text_subtitle_en || '';
                  formData.text_button = formData.text_button_zh || formData.text_button_en || '';
                  formData.background_url = formData.background_url_zh || formData.background_url_en || '';
                  
                  formData.text_color = document.getElementById('text-color').value;
                  formData.subtitle_color = document.getElementById('subtitle-color').value;
                  formData.background_type = document.getElementById('background-type-zh').value; // 使用第一个语言的背景类型
                  formData.button_link = document.getElementById('button-link').value;
                  formData.button_target = document.getElementById('button-target').value;
                } else {
                  formData.full_image_url = document.getElementById('full-image-url').value;
                  formData.link_url = document.getElementById('link-url').value;
                  formData.link_target = document.getElementById('link-target').value;
                }
                
                const apiPath = '${apiPath}';
                const url = isEdit 
                  ? \`\${apiPath}/\${bannerId}\`
                  : apiPath;
                
                const method = isEdit ? 'PUT' : 'POST';
                
                const response = await fetch(url, {
                  method: method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                const basePath = '${basePath}';
                
                if (result.success) {
                  alert(isEdit ? '更新成功!' : '添加成功!');
                  window.location.href = basePath;
                } else {
                  alert('保存失败: ' + (result.message || '未知错误'));
                }
              } catch (error) {
                alert('保存失败: ' + error.message);
              } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = isEdit ? '保存更新' : '发布';
              }
            });
          })();
        `
      }} />
    </div>
  )
}

