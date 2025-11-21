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
      <div class="min-h-screen bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* 左侧文案区 */}
            <div class="relative">
              {/* 背景图 */}
              <div 
                class="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl opacity-10"
                style="background-image: url('/assets/images/contact-bg.jpg');"
              ></div>
              
              <div class="relative z-10 p-8 md:p-12 lg:p-16">
                {/* 一级标题 */}
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                  {t.title || (language === 'zh' ? '联系我们' : language === 'en' ? 'Contact Us' : language === 'jp' ? 'お問い合わせ' : '聯繫我們')}
                </h1>
                
                {/* 二级副标题 */}
                {t.subtitle && (
                  <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-4 md:mb-6">
                    {t.subtitle}
                  </h2>
                )}
                
                {/* 文本段落 */}
                {t.description && (
                  <div class="text-base md:text-lg text-gray-600 leading-relaxed space-y-4">
                    {t.description.split('\n').map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 右侧表单区 */}
            <div class="flex items-center justify-center">
              <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
                <form id="contact-form" class="space-y-6">
                  {/* First Name */}
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                      {t.firstName || 'First Name'} <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6438FF] focus:border-transparent outline-none transition-all"
                      placeholder={t.firstNamePlaceholder || ''}
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                      {t.lastName || 'Last Name'} <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6438FF] focus:border-transparent outline-none transition-all"
                      placeholder={t.lastNamePlaceholder || ''}
                    />
                  </div>

                  {/* Job Title */}
                  <div>
                    <label for="jobTitle" class="block text-sm font-medium text-gray-700 mb-2">
                      {t.jobTitle || 'Job Title'}
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6438FF] focus:border-transparent outline-none transition-all"
                      placeholder={t.jobTitlePlaceholder || ''}
                    />
                  </div>

                  {/* Company Email */}
                  <div>
                    <label for="companyEmail" class="block text-sm font-medium text-gray-700 mb-2">
                      {t.companyEmail || 'Company Email'} <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="companyEmail"
                      name="companyEmail"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6438FF] focus:border-transparent outline-none transition-all"
                      placeholder={t.companyEmailPlaceholder || 'example@company.com'}
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label for="companyName" class="block text-sm font-medium text-gray-700 mb-2">
                      {t.companyName || 'Company Name'}
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6438FF] focus:border-transparent outline-none transition-all"
                      placeholder={t.companyNamePlaceholder || ''}
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <label for="industry" class="block text-sm font-medium text-gray-700 mb-2">
                      {t.industry || 'Industry'}
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6438FF] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">{t.selectIndustry || 'Please select'}</option>
                      <option value="technology">{t.industryTech || 'Technology'}</option>
                      <option value="finance">{t.industryFinance || 'Finance'}</option>
                      <option value="healthcare">{t.industryHealthcare || 'Healthcare'}</option>
                      <option value="retail">{t.industryRetail || 'Retail'}</option>
                      <option value="manufacturing">{t.industryManufacturing || 'Manufacturing'}</option>
                      <option value="education">{t.industryEducation || 'Education'}</option>
                      <option value="other">{t.industryOther || 'Other'}</option>
                    </select>
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div class="flex items-start">
                    <input
                      type="checkbox"
                      id="privacyAgree"
                      name="privacyAgree"
                      required
                      checked
                      class="mt-1 w-4 h-4 text-[#6438FF] border-gray-300 rounded focus:ring-[#6438FF]"
                    />
                    <label for="privacyAgree" class="ml-3 text-sm text-gray-600">
                      {t.privacyAgree || 'I agree to the Privacy Policy'} <span class="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="submit-btn"
                    class="w-full px-6 py-3 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    <span id="submit-text">{t.submit || 'Submit'}</span>
                    <span id="submit-loading" class="hidden">
                      <i class="fas fa-spinner fa-spin mr-2"></i>
                      {t.submitting || 'Submitting...'}
                    </span>
                  </button>

                  {/* Privacy Notice */}
                  <p class="text-xs text-gray-500 text-center">
                    {t.privacyNotice || 'By submitting, you agree to our Privacy Policy'}
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

            if (!form) return;

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
              const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                jobTitle: document.getElementById('jobTitle').value,
                companyEmail: document.getElementById('companyEmail').value,
                companyName: document.getElementById('companyName').value,
                industry: document.getElementById('industry').value,
                privacyAgree: document.getElementById('privacyAgree').checked,
                source: getUrlParam('source') || 'contact_page',
                file: getUrlParam('file') || null
              };

              try {
                const response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                  // 显示成功消息
                  successMessage.classList.remove('hidden');
                  
                  // 如果是白皮书下载，显示下载按钮
                  const source = getUrlParam('source');
                  if (source === 'whitepaper_download' && result.downloadUrl) {
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
                  document.getElementById('privacyAgree').checked = true;
                  
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

