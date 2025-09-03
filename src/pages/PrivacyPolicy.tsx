import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n.js'

interface PrivacyPolicyProps {
  language: Language
}

export const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ language }) => {
  const content = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: January 1, 2024',
      intro: 'Zenava ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.',
      sections: [
        {
          title: 'Information We Collect',
          content: 'We may collect personal information that you provide directly to us, such as your name, email address, company name, and any other information you choose to provide.'
        },
        {
          title: 'How We Use Your Information',
          content: 'We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.'
        },
        {
          title: 'Information Sharing',
          content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy.'
        },
        {
          title: 'Data Security',
          content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          title: 'Contact Us',
          content: 'If you have any questions about this Privacy Policy, please contact us at privacy@zenava.ai'
        }
      ]
    },
    jp: {
      title: 'プライバシーポリシー',
      lastUpdated: '最終更新日：2024年1月1日',
      intro: 'Zenava（「当社」）は、お客様のプライバシーを保護することをお約束します。本プライバシーポリシーは、お客様が当社のウェブサイトを訪問された際に、当社がどのようにお客様の情報を収集、使用、開示、保護するかを説明しています。',
      sections: [
        {
          title: '収集する情報',
          content: 'お客様が直接提供される個人情報（お名前、メールアドレス、会社名など）を収集する場合があります。'
        },
        {
          title: '情報の使用方法',
          content: '収集した情報は、サービスの提供・維持・改善、お客様とのコミュニケーション、法的義務の遵守のために使用します。'
        },
        {
          title: '情報の共有',
          content: '本プライバシーポリシーに記載されている場合を除き、お客様の同意なしに個人情報を第三者に販売、取引、譲渡することはありません。'
        },
        {
          title: 'データセキュリティ',
          content: '不正アクセス、改ざん、開示、破壊からお客様の個人情報を保護するため、適切な技術的・組織的セキュリティ対策を実施しています。'
        },
        {
          title: 'お問い合わせ',
          content: '本プライバシーポリシーに関するご質問は、privacy@zenava.ai までお問い合わせください。'
        }
      ]
    },
    hk: {
      title: '隱私政策',
      lastUpdated: '最後更新：2024年1月1日',
      intro: 'Zenava（「我們」）致力於保護您的隱私。本隱私政策說明了當您訪問我們的網站時，我們如何收集、使用、披露和保護您的信息。',
      sections: [
        {
          title: '我們收集的信息',
          content: '我們可能會收集您直接提供給我們的個人信息，例如您的姓名、電子郵件地址、公司名稱以及您選擇提供的任何其他信息。'
        },
        {
          title: '我們如何使用您的信息',
          content: '我們使用收集的信息來提供、維護和改進我們的服務，與您溝通，並遵守法律義務。'
        },
        {
          title: '信息共享',
          content: '除本隱私政策中所述情況外，未經您的同意，我們不會向第三方出售、交易或以其他方式轉讓您的個人信息。'
        },
        {
          title: '數據安全',
          content: '我們實施適當的技術和組織安全措施，以保護您的個人信息免受未經授權的訪問、更改、披露或破壞。'
        },
        {
          title: '聯繫我們',
          content: '如果您對本隱私政策有任何疑問，請通過 privacy@zenava.ai 與我們聯繫。'
        }
      ]
    }
  }

  const t = content[language] || content.en

  return (
    <div class="min-h-screen bg-gray-50 py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p class="text-gray-600 mb-8">{t.lastUpdated}</p>
          
          <div class="prose prose-lg max-w-none">
            <p class="text-gray-700 mb-8">{t.intro}</p>
            
            {t.sections.map((section, index) => (
              <div key={index} class="mb-8">
                <h2 class="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                <p class="text-gray-700">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}