import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n.js'

interface TermsConditionsProps {
  language: Language
}

export const TermsConditions: FC<TermsConditionsProps> = ({ language }) => {
  const content = {
    en: {
      title: 'Terms & Conditions',
      lastUpdated: 'Last Updated: January 1, 2024',
      intro: 'Please read these Terms and Conditions carefully before using the Zenava website operated by Zenava Limited.',
      sections: [
        {
          title: 'Acceptance of Terms',
          content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.'
        },
        {
          title: 'Use License',
          content: 'Permission is granted to temporarily download one copy of the materials on Zenava website for personal, non-commercial transitory viewing only.'
        },
        {
          title: 'Disclaimer',
          content: 'The materials on Zenava website are provided on an "as is" basis. Zenava makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
        },
        {
          title: 'Limitations',
          content: 'In no event shall Zenava or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Zenava website.'
        },
        {
          title: 'Governing Law',
          content: 'These terms and conditions are governed by and construed in accordance with the laws of Hong Kong SAR and you irrevocably submit to the exclusive jurisdiction of the courts in that location.'
        },
        {
          title: 'Contact Information',
          content: 'If you have any questions about these Terms & Conditions, please contact us at legal@zenava.ai'
        }
      ]
    },
    jp: {
      title: '利用規約',
      lastUpdated: '最終更新日：2024年1月1日',
      intro: 'Zenava Limited が運営するZenavaウェブサイトをご利用になる前に、これらの利用規約をよくお読みください。',
      sections: [
        {
          title: '規約の承諾',
          content: '本ウェブサイトにアクセスし、使用することにより、お客様は本契約の条項に拘束されることに同意したものとみなされます。'
        },
        {
          title: '使用許諾',
          content: 'Zenavaウェブサイト上の資料の1部を、個人的かつ非商業的な一時的な閲覧のみを目的として、一時的にダウンロードすることが許可されています。'
        },
        {
          title: '免責事項',
          content: 'Zenavaウェブサイト上の資料は「現状のまま」提供されています。Zenavaは、明示的または黙示的を問わず、いかなる保証も行わず、商品性、特定目的への適合性、知的財産権の非侵害を含むがこれらに限定されない、その他すべての保証を否認します。'
        },
        {
          title: '責任の制限',
          content: 'いかなる場合においても、Zenavaまたはそのサプライヤーは、Zenavaウェブサイト上の資料の使用または使用不能に起因する損害について責任を負いません。'
        },
        {
          title: '準拠法',
          content: '本利用規約は香港特別行政区の法律に準拠し、同法に従って解釈されるものとし、お客様は同地の裁判所の専属管轄権に取消不能な形で服するものとします。'
        },
        {
          title: 'お問い合わせ',
          content: '本利用規約に関するご質問は、legal@zenava.ai までお問い合わせください。'
        }
      ]
    },
    hk: {
      title: '條款與條件',
      lastUpdated: '最後更新：2024年1月1日',
      intro: '在使用由 Zenava Limited 運營的 Zenava 網站之前，請仔細閱讀這些條款和條件。',
      sections: [
        {
          title: '接受條款',
          content: '通過訪問和使用本網站，您接受並同意受本協議條款和規定的約束。'
        },
        {
          title: '使用許可',
          content: '允許臨時下載 Zenava 網站上材料的一份副本，僅供個人、非商業性的臨時查看。'
        },
        {
          title: '免責聲明',
          content: 'Zenava 網站上的材料按「現狀」提供。Zenava 不作任何明示或暗示的保證，並在此否認和否定所有其他保證，包括但不限於適銷性、特定用途適用性或不侵犯知識產權或其他權利侵犯的暗示保證或條件。'
        },
        {
          title: '責任限制',
          content: '在任何情況下，Zenava 或其供應商均不對因使用或無法使用 Zenava 網站上的材料而產生的任何損害承擔責任。'
        },
        {
          title: '管轄法律',
          content: '這些條款和條件受香港特別行政區法律管轄並據其解釋，您不可撤銷地服從該地法院的專屬管轄權。'
        },
        {
          title: '聯繫方式',
          content: '如果您對這些條款與條件有任何疑問，請通過 legal@zenava.ai 與我們聯繫。'
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