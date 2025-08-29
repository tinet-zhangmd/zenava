import { Layout } from '../components/Layout'
import { Language } from '../utils/i18n'

interface PrivacyPolicyProps {
  language: Language
}

export function PrivacyPolicy({ language }: PrivacyPolicyProps) {
  return (
    <Layout language={language} currentPath="/privacy-policy">
      <div class="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p class="text-lg text-gray-600">Last Updated: January 2025</p>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 mb-8">
              This Privacy Policy is designed to help you understand how Zenava Technologies, Inc. ("Zenava," "we," "us," or "our") collects, uses, and shares your personal information, and to help you understand and exercise your privacy rights.
            </p>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">1. Scope and Updates to This Privacy Policy</h2>
              <p class="text-gray-700 mb-4">
                This Privacy Policy applies to personal information processed by us, including on our websites, mobile applications, and other online or offline offerings. To make this Privacy Policy easier to read, our websites, mobile applications, and other offerings are collectively called the "Services."
              </p>
              <p class="text-gray-700 mb-4">
                <strong>Changes to our Privacy Policy.</strong> We may revise this Privacy Policy from time to time in our sole discretion. If there are any material changes to this Privacy Policy, we will notify you as required by applicable law. You understand and agree that you will be deemed to have accepted the updated Privacy Policy if you continue to use our Services after the new Privacy Policy takes effect.
              </p>
              <p class="text-gray-700">
                <strong>An Important Note:</strong> This Privacy Policy does not apply to any of the personal information that we process on behalf of our customers through their use of our Services ("Customer Data"). Our customers' respective privacy policies govern their collection and use of Customer Data. Our processing of Customer Data is governed by the contracts that we have in place with our customers, not this Privacy Policy. Any questions or requests relating to Customer Data should be directed to our customer.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">2. Personal Information We Collect</h2>
              <p class="text-gray-700 mb-4">
                The categories of personal information we collect depend on how you interact with us, our Services, and the requirements of applicable law. We collect information that you provide to us, information we obtain automatically when you use our Services, and information from other sources such as third-party services and organizations, as described below.
              </p>

              <h3 class="text-xl font-semibold text-gray-900 mb-3">A. Personal Information You Provide to Us Directly</h3>
              <p class="text-gray-700 mb-3">We may collect personal information that you provide to us.</p>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Account Information.</strong> We may collect personal information in connection with the creation or administration of your account, such as your name, email address, phone number, address, professional details, and any other information that you provide to us or that we otherwise collect.</li>
                <li><strong>Purchases.</strong> We may collect personal information and details associated with your purchases, including payment information. Any payments made via our Services are processed by third-party payment processors.</li>
                <li><strong>Your Communications with Us.</strong> We may collect personal information, such as email address, phone number, or mailing address when you request information about Zenava or our Services, register for our newsletter, request support, or otherwise communicate with us.</li>
                <li><strong>Surveys.</strong> We may contact you to participate in surveys. If you decide to participate, we may collect personal information from you in connection with the survey.</li>
                <li><strong>Interactive Features.</strong> We and others who use our Services may collect personal information that you submit or make available through our interactive features.</li>
                <li><strong>Job Applications.</strong> We may post job openings and opportunities on our Services. If you respond to one of these postings, we may collect your personal information, such as your application, CV, cover letter, and/or any other information you provide to us.</li>
              </ul>

              <h3 class="text-xl font-semibold text-gray-900 mb-3">B. Personal Information Collected Automatically</h3>
              <p class="text-gray-700 mb-3">We may collect personal information automatically when you use our Services.</p>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Automatic Collection of Personal Information.</strong> We may collect certain information automatically when you use our Services, such as your Internet protocol (IP) address, user settings, MAC address, cookie identifiers, mobile carrier, mobile advertising and other unique identifiers, browser or device information, location information, and Internet service provider.</li>
                <li><strong>Cookie Policy (and Other Technologies).</strong> We, as well as third parties that provide content, advertising, or other functionality on our Services, may use cookies, pixel tags, and other technologies to automatically collect information through your use of our Services.</li>
                <li><strong>Analytics.</strong> We may use Technologies and other third-party tools to process analytics information on our Services. These Technologies allow us to better understand how our digital Services are used and to continually improve and personalize our Services.</li>
              </ul>

              <h3 class="text-xl font-semibold text-gray-900 mb-3">C. Personal Information Collected from Other Sources</h3>
              <p class="text-gray-700">
                <strong>Third-Party Services and Sources.</strong> We may obtain personal information about you from other sources, including through third-party services and organizations. For example, if you access our Services through a third-party application, we may collect personal information about you from that third-party application that you have made available via your privacy settings.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Personal Information</h2>
              <p class="text-gray-700 mb-4">
                We use your personal information for a variety of business purposes, including to provide our Services, for administrative purposes, and to market our products and Services, as described below.
              </p>

              <h3 class="text-xl font-semibold text-gray-900 mb-3">A. Provide Our Services</h3>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Managing your information and accounts;</li>
                <li>Providing access to certain areas, functionalities, and features of our Services;</li>
                <li>Answering requests for customer or technical support;</li>
                <li>Communicating with you about your account, activities on our Services, and policy changes;</li>
                <li>Processing your financial information and other payment methods for products or Services purchased;</li>
                <li>Processing applications if you apply for a job we post on our Services;</li>
              </ul>

              <h3 class="text-xl font-semibold text-gray-900 mb-3">B. Administrative Purposes</h3>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Pursuing our legitimate interests such as direct marketing, research and development, network and information security, and fraud prevention;</li>
                <li>Detecting security incidents, protecting against malicious, deceptive, fraudulent or illegal activity;</li>
                <li>Measuring interest and engagement in our Services;</li>
                <li>Improving, upgrading, or enhancing our Services;</li>
                <li>Developing new products and services;</li>
                <li>Ensuring internal quality control and safety;</li>
                <li>Authenticating and verifying individual identities;</li>
                <li>Enforcing our agreements and policies;</li>
              </ul>

              <h3 class="text-xl font-semibold text-gray-900 mb-3">C. Marketing and Advertising our Products and Services</h3>
              <p class="text-gray-700">
                We may use personal information to tailor and provide you with content and advertisements. We may provide you with these materials as permitted by applicable law. Some of the ways we may market to you include email campaigns, text messages, custom audiences advertising, and "personalized advertising" or "targeted advertising," including through cross-device tracking.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">4. How We Disclose Your Personal Information</h2>
              <p class="text-gray-700 mb-4">
                We disclose your personal information to third parties for a variety of business purposes, including to provide our Services, to protect us or others, or in the event of a major business transaction such as a merger, sale, or asset transfer, as described below.
              </p>

              <h3 class="text-xl font-semibold text-gray-900 mb-3">A. Disclosures to Provide our Services</h3>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Service Providers.</strong> We may share your personal information with our third-party service providers and vendors that assist us with the provision of our Services.</li>
                <li><strong>Business Partners.</strong> We may share your personal information with business partners to provide you with a product or service you have requested.</li>
                <li><strong>Affiliates.</strong> We may share your personal information with our corporate affiliates.</li>
                <li><strong>Advertising Partners.</strong> We may share your personal information with third-party advertising partners for delivering personalized advertisements.</li>
              </ul>

              <h3 class="text-xl font-semibold text-gray-900 mb-3">B. Disclosures to Protect Us or Others</h3>
              <p class="text-gray-700">
                We may access, preserve, and disclose any information we store associated with you to external parties if we, in good faith, believe doing so is required or appropriate to: comply with law enforcement or national security requests and legal process; protect your, our, or others' rights, property, or safety; enforce our policies or contracts; collect amounts owed to us; or assist with an investigation or prosecution of suspected or actual illegal activity.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">5. Your Privacy Choices and Rights</h2>
              <p class="text-gray-700 mb-4">
                The privacy choices you may have about your personal information are determined by applicable law and are described below.
              </p>

              <h3 class="text-xl font-semibold text-gray-900 mb-3">Your Privacy Choices</h3>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Email Communications.</strong> If you receive an unwanted email from us, you can use the unsubscribe link found at the bottom of the email to opt out of receiving future emails.</li>
                <li><strong>Cookies and Personalized Advertising.</strong> You may stop or restrict the placement of Technologies on your device or remove them by adjusting your preferences as your browser or device permits.</li>
                <li><strong>Mobile Devices.</strong> We may send you push notifications through our mobile application. You may opt out from receiving these push notifications by changing the settings on your mobile device.</li>
              </ul>

              <h3 class="text-xl font-semibold text-gray-900 mb-3">Your Privacy Rights</h3>
              <p class="text-gray-700 mb-3">In accordance with applicable law, you may have the right to:</p>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Request Access</strong> to and Portability of Your Personal Information;</li>
                <li><strong>Request Correction</strong> of your personal information where it is inaccurate or incomplete;</li>
                <li><strong>Request Deletion</strong> of your personal information;</li>
                <li><strong>Request to Opt-Out</strong> of Certain Processing Activities including targeted advertising;</li>
                <li><strong>Request Restriction</strong> of or Object to our processing of your personal information;</li>
                <li><strong>Withdraw your Consent</strong> to our processing of your personal information.</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">6. International Transfers of Personal Information</h2>
              <p class="text-gray-700">
                All personal information processed by us may be transferred, processed, and stored anywhere in the world, including, but not limited to, the United States or other countries, which may have data protection laws that are different from the laws where you live. We endeavor to safeguard your personal information consistent with the requirements of applicable laws.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">7. Retention of Personal Information</h2>
              <p class="text-gray-700">
                We store the personal information we collect as described in this Privacy Policy for as long as you use our Services, or as necessary to fulfill the purpose(s) for which it was collected, provide our Services, resolve disputes, establish legal defenses, conduct audits, pursue legitimate business purposes, enforce our agreements, and comply with applicable laws.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">8. Children's Information</h2>
              <p class="text-gray-700">
                The Services are not directed to children under 18 (or other age as required by local law), and we do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has uploaded personal information to our site without your consent, you may contact us as described in "Contact Us" below.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <p class="text-gray-700">
                If you have any questions about our privacy practices or this Privacy Policy, or to exercise your rights as detailed in this Privacy Policy, please contact us at <a href="mailto:privacy@zenava.com" class="text-blue-600 hover:text-blue-800">privacy@zenava.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}