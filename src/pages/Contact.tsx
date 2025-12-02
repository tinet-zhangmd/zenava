import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'
import { getTranslations } from '../i18n/translations'

interface ContactPageProps {
  language?: Language
}

export const ContactPage: FC<ContactPageProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  const t = trans.contactForm || {}

  return (
    <>
      <div class="min-h-screen bg-[#6438FF]">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div class="flex flex-col lg:flex-row items-start lg:items-center gap-8 md:gap-12 lg:gap-16 min-h-[calc(100vh-4rem)]">
            {/* 左侧文案区 */}
            <div class="flex-1 lg:max-w-md xl:max-w-lg">
              {/* 一级标题 - 白色大字号 */}
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 md:mb-12">
                {t.title || (language === 'zh' ? '联系我们' : language === 'en' ? 'Contact Us' : language === 'jp' ? 'お問い合わせ' : '聯繫我們')}
              </h1>
              
              {/* 三行白色文字 */}
              <div class="space-y-4 md:space-y-6">
                <p class="text-white text-lg md:text-xl leading-relaxed">
                  {t.description?.split('\n')[0] || (language === 'zh' ? '文字内容文字内容文字' : language === 'en' ? 'Text content text content text' : language === 'jp' ? 'テキストコンテンツテキストコンテンツテキスト' : '文字內容文字內容文字')}
                </p>
                <p class="text-white text-lg md:text-xl leading-relaxed">
                  {t.description?.split('\n')[1] || (language === 'zh' ? '文字内容文字内容文字' : language === 'en' ? 'Text content text content text' : language === 'jp' ? 'テキストコンテンツテキストコンテンツテキスト' : '文字內容文字內容文字')}
                </p>
                <p class="text-white text-lg md:text-xl leading-relaxed">
                  {t.description?.split('\n')[2] || (language === 'zh' ? '文字内容文字内容文字' : language === 'en' ? 'Text content text content text' : language === 'jp' ? 'テキストコンテンツテキストコンテンツテキスト' : '文字內容文字內容文字')}
                </p>
              </div>
            </div>

            {/* 右侧表单区 */}
            <div class="flex-1 lg:flex-none lg:w-[500px] xl:w-[550px]">
              <div class="bg-white rounded-2xl shadow-lg p-8 md:p-10 lg:p-12">
              <form id="contact-form" class="space-y-6">
                {/* First Name 和 Last Name 在同一行 */}
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                      {t.firstName || 'First name'}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={t.firstName || 'First name'}
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                      {t.lastName || 'Last name'}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={t.lastName || 'Last name'}
                    />
                  </div>
                </div>

                {/* Job Title */}
                <div>
                  <label for="jobTitle" class="block text-sm font-medium text-gray-700 mb-2">
                    {t.jobTitle || 'Job title'}
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={t.jobTitle || 'Job title'}
                  />
                </div>

                {/* Company Email */}
                <div>
                  <label for="companyEmail" class="block text-sm font-medium text-gray-700 mb-2">
                    {t.companyEmail || 'Company email'}
                  </label>
                  <input
                    type="email"
                    id="companyEmail"
                    name="companyEmail"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={t.companyEmailPlaceholder || 'Company email'}
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label for="companyName" class="block text-sm font-medium text-gray-700 mb-2">
                    {t.companyName || 'Company name'}
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={t.companyName || 'Company name'}
                  />
                </div>

                {/* Industry */}
                <div>
                  <label for="industry" class="block text-sm font-medium text-gray-700 mb-2">
                    {t.industry || 'Industry'}
                  </label>
                  <div class="relative">
                    <select
                      id="industry"
                      name="industry"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none pr-10"
                    >
                      <option value="">{t.selectIndustry || 'Select your industry'}</option>
                      <option value="technology">{t.industryTech || 'Technology'}</option>
                      <option value="finance">{t.industryFinance || 'Finance'}</option>
                      <option value="healthcare">{t.industryHealthcare || 'Healthcare'}</option>
                      <option value="retail">{t.industryRetail || 'Retail'}</option>
                      <option value="manufacturing">{t.industryManufacturing || 'Manufacturing'}</option>
                      <option value="education">{t.industryEducation || 'Education'}</option>
                      <option value="other">{t.industryOther || 'Other'}</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Submit Button - 浅灰色，圆角 */}
                <button
                  type="submit"
                  id="submit-btn"
                  class="w-full px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  <span id="submit-text">{t.submit || 'Submit'}</span>
                  <span id="submit-loading" class="hidden">
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    {t.submitting || 'Submitting...'}
                  </span>
                </button>

                {/* Privacy Notice - 在Submit按钮下方，小字体 */}
                <p class="text-xs text-gray-500 text-center">
                  {t.privacyNotice || 'By clicking submit, you acknowledge your data will be processed according to our'} <a href="/privacy-policy" class="text-blue-600 underline">{t.privacyLink || 'Privacy Policy'}</a>
                </p>
                </form>

                {/* Success Message */}
                <div id="success-message" class="hidden mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div class="flex items-center">
                    <i class="fas fa-check-circle text-green-500 text-xl mr-3"></i>
                    <p class="text-green-800 font-medium">
                      {t.successMessage || 'Thank you for your submission. Our advisor will contact you soon.'}
                    </p>
                  </div>
                </div>

                {/* Download Section (for whitepaper) */}
                <div id="download-section" class="hidden mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <i class="fas fa-download text-blue-500 text-xl mr-3"></i>
                      <p class="text-blue-800 font-medium">
                        {t.downloadReady || 'Your download is ready'}
                      </p>
                    </div>
                    <button
                      id="download-btn"
                      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {t.download || 'Download'}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                <div id="error-message" class="hidden mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-red-500 text-xl mr-3"></i>
                    <p class="text-red-800 font-medium">
                      {t.errorMessage || 'Submission failed. Please try again.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Submission Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const form = document.getElementById('contact-form');
            const submitBtn = document.getElementById('submit-btn');
            const submitText = document.getElementById('submit-text');
            const submitLoading = document.getElementById('submit-loading');
            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');
            const downloadSection = document.getElementById('download-section');
            const downloadBtn = document.getElementById('download-btn');

            if (!form) {
              console.error('Contact form not found');
              return;
            }

            // 添加错误处理，确保所有必需的元素都存在
            const requiredElements = {
              firstName: document.getElementById('firstName'),
              lastName: document.getElementById('lastName'),
              companyEmail: document.getElementById('companyEmail')
            };

            for (const [name, element] of Object.entries(requiredElements)) {
              if (!element) {
                console.error('Required form element not found:', name);
              }
            }

            // 获取 URL 参数
            function getUrlParam(name) {
              const urlParams = new URLSearchParams(window.location.search);
              return urlParams.get(name);
            }

            form.addEventListener('submit', async (e) => {
              e.preventDefault();
              
              // 隐藏之前的消息
              successMessage.classList.add('hidden');
              errorMessage.classList.add('hidden');
              downloadSection.classList.add('hidden');

              // 显示加载状态
              submitBtn.disabled = true;
              submitText.classList.add('hidden');
              submitLoading.classList.remove('hidden');

              // 收集表单数据
              const privacyAgreeElement = document.getElementById('privacyAgree');
              const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                jobTitle: document.getElementById('jobTitle').value,
                companyEmail: document.getElementById('companyEmail').value,
                companyName: document.getElementById('companyName').value,
                industry: document.getElementById('industry').value,
                privacyAgree: privacyAgreeElement ? privacyAgreeElement.checked : true, // 如果没有 checkbox，默认为 true
                source: getUrlParam('source') || 'contact_page',
                file: getUrlParam('file') || null
              };

              try {
                console.log('Submitting form data:', formData);
                
                const response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData)
                });

                console.log('Response status:', response.status);
                const result = await response.json();
                console.log('Response data:', result);

                if (response.ok && result.success) {
                  // 显示成功消息
                  successMessage.classList.remove('hidden');
                  
                  // 如果是白皮书下载，显示下载按钮
                  const source = getUrlParam('source');
                  const fileId = getUrlParam('file');
                  
                  if (source === 'whitepaper_download' && fileId) {
                    // 设置cookie标记用户已提交表单（30天有效期）
                    const expiryDate = new Date();
                    expiryDate.setTime(expiryDate.getTime() + (30 * 24 * 60 * 60 * 1000));
                    document.cookie = 'resource_download_' + fileId + '=true; expires=' + expiryDate.toUTCString() + '; path=/';
                    
                    // 自动触发下载
                    const downloadUrl = '/resources/download/' + fileId;
                    setTimeout(() => {
                      window.location.href = downloadUrl;
                    }, 500);
                  } else if (source === 'whitepaper_download' && result.downloadUrl) {
                    // 兼容旧版本逻辑
                    downloadSection.classList.remove('hidden');
                    
                    downloadBtn.onclick = function() {
                      // 触发下载
                      const link = document.createElement('a');
                      link.href = result.downloadUrl;
                      link.download = result.fileName || 'download';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    };
                  }

                  // 重置表单
                  form.reset();
                  if (privacyAgreeElement) {
                    privacyAgreeElement.checked = true;
                  }
                  
                  // 滚动到成功消息
                  successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                  // 显示错误消息
                  errorMessage.classList.remove('hidden');
                  errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
              } catch (error) {
                console.error('Error:', error);
                errorMessage.classList.remove('hidden');
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              } finally {
                // 恢复按钮状态
                submitBtn.disabled = false;
                submitText.classList.remove('hidden');
                submitLoading.classList.add('hidden');
              }
            });
          })();
        `
      }} />
    </>
  )
}

