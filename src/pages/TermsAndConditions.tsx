import { Layout } from '../components/Layout'
import { Language } from '../utils/i18n'

interface TermsAndConditionsProps {
  language: Language
}

export function TermsAndConditions({ language }: TermsAndConditionsProps) {
  return (
    <Layout language={language} currentPath="/terms-and-conditions">
      <div class="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
            <p class="text-lg text-gray-600">Last Updated: January 2025</p>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 mb-8">
              Please read these Terms of Service (the <strong>Terms</strong>) and the Privacy Policy at <a href="/privacy-policy" class="text-blue-600 hover:text-blue-800">https://zenava.com/privacy-policy</a> (<strong>Privacy Policy</strong>) carefully because they govern your use of Zenava Technologies, Inc.'s (<strong>Zenava</strong>, <strong>we</strong> or <strong>our</strong>) website located at <a href="/" class="text-blue-600 hover:text-blue-800">https://zenava.com</a> (the <strong>Site</strong>). To make these Terms easier to read, the Site and any services offered via our Site are collectively called the <strong>Services</strong>.
            </p>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p class="text-gray-700">
                By using our Services, you agree to be bound by these Terms. If you don't agree to be bound by these Terms, do not use the Services. If you are accessing and using the Services on behalf of a company (such as your employer) or other legal entity, you represent and warrant that you have the authority to bind that entity to these Terms. In that case, "you" and "your" will refer to that entity.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">2. Privacy Policy</h2>
              <p class="text-gray-700">
                Please review our Privacy Policy, which also governs your use of the Services, for information on how we collect, use and share your information.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">3. Changes to these Terms or the Services</h2>
              <p class="text-gray-700">
                We may update the Terms from time to time in our sole discretion. If we do, we'll let you know by posting the updated Terms on the Site, and/or may also send other communications. It's important that you review the Terms whenever we update them or you use the Services. If you continue to use the Services after we have posted updated Terms it means that you accept and agree to the changes. If you don't agree to be bound by the changes, you may not use the Services anymore. Because our Services are evolving over time we may change or discontinue all or any part of the Services, at any time and without notice, at our sole discretion.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">4. Feedback</h2>
              <p class="text-gray-700">
                We appreciate feedback, comments, ideas, proposals and suggestions for improvements to the Services (collectively, <strong>Feedback</strong>). If you choose to submit Feedback, you agree that we are free to use it without any restriction or compensation to you.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">5. General Prohibitions and Zenava's Enforcement Rights</h2>
              <p class="text-gray-700 mb-4">You agree not to do any of the following:</p>
              <ol class="list-decimal list-inside text-gray-700 space-y-3">
                <li>Use, display, mirror or frame the Services or any individual element within the Services, Zenava's name, any Zenava trademark, logo or other proprietary information, or the layout and design of any page or form contained on a page, without Zenava's express written consent;</li>
                <li>Access, tamper with, or use non-public areas of the Services, Zenava's computer systems, or the technical delivery systems of Zenava's providers;</li>
                <li>Attempt to probe, scan or test the vulnerability of any Zenava system or network or breach any security or authentication measures;</li>
                <li>Avoid, bypass, remove, deactivate, impair, descramble or otherwise circumvent any technological measure implemented by Zenava or any of Zenava's providers or any other third party (including another user) to protect the Services;</li>
                <li>Attempt to access or search the Services or download content from the Services using any engine, software, tool, agent, device or mechanism (including spiders, robots, crawlers, data mining tools or the like) other than the software and/or search agents provided by Zenava or other generally available third-party web browsers;</li>
                <li>Send any unsolicited or unauthorized advertising, promotional materials, email, junk mail, spam, chain letters or other form of solicitation;</li>
                <li>Use any meta tags or other hidden text or metadata utilizing a Zenava trademark, logo URL or product name without Zenava's express written consent;</li>
                <li>Use the Services, or any portion thereof, for any commercial purpose or for the benefit of any third party or in any manner not permitted by these Terms;</li>
                <li>Forge any TCP/IP packet header or any part of the header information in any email or newsgroup posting, or in any way use the Services to send altered, deceptive or false source-identifying information;</li>
                <li>Attempt to decipher, decompile, disassemble or reverse engineer any of the software used to provide the Services;</li>
                <li>Interfere with, or attempt to interfere with, the access of any user, host or network, including, without limitation, sending a virus, overloading, flooding, spamming, or mail-bombing the Services;</li>
                <li>Collect or store any personally identifiable information from the Services from other users of the Services without their express permission;</li>
                <li>Impersonate or misrepresent your affiliation with any person or entity;</li>
                <li>Violate any applicable law or regulation; or</li>
                <li>Encourage or enable any other individual to do any of the foregoing.</li>
              </ol>
              <p class="text-gray-700 mt-4">
                Zenava is not obligated to monitor access to or use of the Services. However, we have the right to do so for the purpose of operating the Services, to ensure compliance with these Terms and to comply with applicable law or other legal requirements. We have the right to investigate violations of these Terms or conduct that affects the Services. We may also consult and cooperate with law enforcement authorities to prosecute users who violate the law.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">6. Links to Third Party Websites or Resources</h2>
              <p class="text-gray-700">
                The Services may allow you to access third-party websites or other resources. We provide access only as a convenience and are not responsible for the content, products or services on or available from those resources or links displayed on such websites. You acknowledge sole responsibility for and assume all risk arising from your use of any third-party resources.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">7. Termination</h2>
              <p class="text-gray-700">
                We may suspend or terminate your access to and use of the Services, at our sole discretion, at any time and without notice to you. Upon any termination, discontinuation or cancellation of the Services, the following Sections will survive: 4, 5, 7 and 8-12.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">8. Warranty Disclaimers</h2>
              <p class="text-gray-700">
                THE SERVICES ARE PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND. WITHOUT LIMITING THE FOREGOING, WE EXPLICITLY DISCLAIM ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT AND NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE. We make no warranty that the Services will meet your requirements or be available on an uninterrupted, secure, or error-free basis. We make no warranty regarding the quality, accuracy, timeliness, truthfulness, completeness or reliability of any information or content on the Services.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">9. Indemnity</h2>
              <p class="text-gray-700">
                You will indemnify and hold Zenava and its officers, directors, employees and agents, harmless from and against any claims, disputes, demands, liabilities, damages, losses, and costs and expenses, including, without limitation, reasonable legal and accounting fees arising out of or in any way connected with (a) your access to or use of the Services or (b) your violation of these Terms.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <div class="space-y-4">
                <p class="text-gray-700">
                  <strong>a.</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER ZENAVA NOR ITS SERVICE PROVIDERS INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE SERVICES WILL BE LIABLE FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOST PROFITS, LOST REVENUES, LOST SAVINGS, LOST BUSINESS OPPORTUNITY, LOSS OF DATA OR GOODWILL, SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR THE COST OF SUBSTITUTE SERVICES OF ANY KIND ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO USE THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER LEGAL THEORY.
                </p>
                <p class="text-gray-700">
                  <strong>b.</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL ZENAVA'S TOTAL LIABILITY ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO USE THE SERVICES EXCEED THE AMOUNTS YOU HAVE PAID OR ARE PAYABLE BY YOU TO ZENAVA FOR USE OF THE SERVICES OR ONE HUNDRED DOLLARS ($100), IF YOU HAVE NOT HAD ANY PAYMENT OBLIGATIONS TO ZENAVA, AS APPLICABLE.
                </p>
                <p class="text-gray-700">
                  <strong>c.</strong> THE EXCLUSIONS AND LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN ZENAVA AND YOU.
                </p>
              </div>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">11. Governing Law and Forum Choice</h2>
              <p class="text-gray-700">
                These Terms will be governed by and construed in accordance with the laws of the State of California without giving effect to any principles of conflict of laws that would lead to the application of the laws of another jurisdiction. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located in San Francisco, California, and Zenava and you each irrevocably consent to the personal jurisdiction and venue therein.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">12. General Terms</h2>
              <div class="space-y-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Reservation of Rights</h3>
                  <p class="text-gray-700">
                    Zenava and its licensors exclusively own all right, title and interest in and to the Services, including all associated intellectual property rights. You acknowledge that the Services are protected by copyright, trademark, and other laws of the United States and foreign countries. You agree not to remove, alter or obscure any copyright, trademark, service mark or other proprietary rights notices incorporated in or accompanying the Services.
                  </p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Entire Agreement</h3>
                  <p class="text-gray-700">
                    These Terms constitute the entire and exclusive understanding and agreement between Zenava and you regarding the Services, and these Terms supersede and replace all prior oral or written understandings or agreements between Zenava and you regarding the Services.
                  </p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Notices</h3>
                  <p class="text-gray-700">
                    Any notices or other communications provided by Zenava under these Terms will be given: (i) via email; or (ii) by posting to the Services.
                  </p>
                </div>
              </div>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p class="text-gray-700">
                If you have any questions about these Terms or the Services, please contact Zenava at <a href="mailto:privacy@zenava.com" class="text-blue-600 hover:text-blue-800">privacy@zenava.com</a> or 150 Sutter St. #690 San Francisco, CA 94104.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}