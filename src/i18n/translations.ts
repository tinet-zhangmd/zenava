// Comprehensive multi-language translations for Zenava
// Reference: Avaya, Genesys, Decagon, Sierra professional terminology

export const siteTranslations = {
  en: {
    // Company & Brand
    company: {
      name: 'Zenava',
      tagline: 'Conversational AI Agent for Marketing and Service Scenarios',
      vision: 'Empowering enterprise productivity and organizational transformation, achieving the leap from "Human-Driven" to "AI-Driven"',
      description: 'Enterprise-grade AI dialogue solutions that transform customer engagement'
    },
    
    // Navigation
    nav: {
      home: 'Home',
      scenarios: 'Solutions',
      about: 'About Us',
      contact: 'Contact',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      bookDemo: 'Book a Demo',
      language: 'Language'
    },
    
    // Hero Section
    hero: {
      title: 'Conversational AI Agent for Marketing and Service Scenarios',
      subtitle: 'Empowering enterprise productivity and organizational transformation, achieving the leap from "Human-Driven" to "AI-Driven"',
      cta: {
        primary: 'Schedule Demo',
        secondary: 'View Solutions'
      }
    },
    
    // Business Value
    businessValue: {
      title: 'ZENAVA Modification',
      subtitle: 'This is the subtitle',
      metrics: {
        marketing: {
          title: 'Marketing Performance Metrics',
          costReduction: 'Average Customer Acquisition Cost Reduced By',
          conversionIncrease: 'Lead Conversion Rate Increased By',
          responseTime: 'Intelligent Marketing Covers 10+ Channels',
          responseValue: '<30s',
          channelCoverage: 'Marketing Channel Coverage',
          channelCount: '10+',
          dailyInquiries: 'Daily handled inquiries: 50,000+',
          dailyCount: '50,000+'
        },
        sales: {
          title: 'Sales Enablement Process',
          cycleReduction: 'Sales Cycle Shortened',
          winRateIncrease: 'Win Rate Improved',
          step1Title: 'Real-time Talk Track',
          step1Desc: 'Recommend the Best Talk Track Based on Customer Interests',
          step1Value: 'Real-time',
          step2Title: 'Knowledge Base Access',
          step2Desc: 'Instant access to products, competitors, cases',
          step2Value: 'Second Level',
          step3Title: 'Intelligent Deal-Closing Assistance',
          step3Desc: '45% Increase in Conversion Rate',
          step3Value: '+45%'
        },
        service: {
          title: 'Intelligent Ticket Processing',
          responseTime: 'Average Response Time',
          resolutionRate: 'First Contact Resolution',
          step1Title: 'AI Problem Identification',
          step1Desc: 'Analyze issue type and urgency',
          step2Title: 'Knowledge Base Query',
          step2Desc: 'Match best solutions and cases',
          step3Title: 'Intelligent Assignment',
          step3Desc: 'Auto-assign based on skills and load',
          step4Title: 'Process Closure',
          step4Desc: 'Track progress, ensure quality'
        },
        internal: {
          title: 'Boost Operational Efficiency',
          efficiency: 'Process Efficiency Improved',
          satisfaction: 'Employee Satisfaction',
          storeConnections: 'Stores Connected',
          storeCount: '500+',
          dailyProcessing: 'Daily Processing',
          dailyCount: '10K+',
          avgResponse: 'Average Response',
          avgTime: '2 Hours',
          assignmentEfficiency: 'Assignment Efficiency',
          efficiencyRate: '85%'
        },
        product: {
          title: 'Customer Feedback Dashboard',
          insights: 'Customer Insights Generated',
          iterations: 'Product Iteration Speed',
          painPoints: 'Product Pain Points Collected',
          painPointCount: '1,842',
          featureAdoption: 'Feature Adoption Rate',
          adoptionRate: '78%',
          resolutionCycle: 'Issue Resolution Cycle',
          cycleTime: '3.2 days',
          monthlyIterations: 'Monthly Product Iterations',
          iterationCount: '12 versions',
          satisfactionIncrease: 'Satisfaction Improvement',
          increaseRate: '+18%'
        },
        brand: {
          title: 'Real-time Sentiment Monitoring',
          monitoring: 'Real-time Monitoring',
          response: 'Crisis Response Time',
          negativeAlerts: 'Negative Sentiment Alerts',
          alertCount: '3',
          sensitiveWords: 'Sensitive Word Detection',
          detectionRate: '99.8%',
          brandFavorability: 'Brand Favorability',
          favorabilityRate: '+12%',
          responseTime: 'Sentiment Response Time',
          responseValue: '<5 min',
          crisisSuccess: 'Crisis Resolution Success Rate',
          successRate: '98%'
        }
      }
    },
    
    // Scenarios/Solutions
    scenarios: {
      marketing: {
        title: 'Marketing Automation',
        subtitle: 'Increase Conversion Rate, Reduce Customer Acquisition Cost',
        description: 'Real-time intent recognition, unified lead capture, intelligent high-potential lead routing. Conversation analytics inform marketing strategy optimization.',
        features: [
          'Intent Recognition',
          'Smart Lead Capture',
          'Multi-channel Integration',
          'Predictive Analytics'
        ]
      },
      sales: {
        title: 'Sales Enablement',
        subtitle: 'Shorten sales cycle, increase conversion rate',
        description: 'Real-Time Talk Track Recommendation, Competitor Knowledge Retrieval, Best Practice Suggestions. Al-assisted deal-closing strategies verify conversion improvement.',
        features: [
          'Talk Track Recommendations',
          'Competitive Analysis',
          'Intelligent Closing Assistance',
          'Performance Analytics'
        ],
        featureShort: ['Talk Track Recommendation', 'Competitor Analysis', 'Smart Deal-closing']
      },
      customerService: {
        title: 'Customer Service',
        subtitle: 'Faster, Accurate, Empathetic Support',
        description: '24/7 intelligent response, smart routing for complex inquiries, sentiment-aware interactions. Knowledge base integration for fast resolution.',
        features: [
          '24/7 Availability',
          'Emotion Recognition',
          'Smart Ticket Processing Workflow',
          'Knowledge Management'
        ],
        featureShort: ['24/7 Response', 'Emotion Recognition', 'Smart Ticket Processing Workflow']
      },
      internalService: {
        title: 'Internal Operations',
        subtitle: 'Efficient Management of Multi-level Organizations',
        description: 'Unified service portal for equipment, inventory, and training. Intelligent dispatch and progress tracking optimize operational efficiency.',
        features: [
          'Unified Portal',
          'Intelligent Routing',
          'Data Analytics',
          'Process Automation'
        ],
        featureShort: ['Unified Portal', 'Intelligent Dispatch', 'Data Analytics']
      },
      management: {
        title: 'Management Optimization',
        subtitle: 'Customer Feedback Drives Product lnnovation',
        description: 'Extract product insights from conversations, quantify feedback trends, establish a closed loop from customer feedback to product iteration.',
        features: [
          'Insight Mining',
          'Requirement Extraction',
          'Iteration Loop',
          'Trend Analysis'
        ],
        featureShort: ['Insights Mining', 'Requirement Extraction', 'lteration Closed Loop'],
        brandFeatures: ['Risk Alert', 'Sentiment Analysis', 'Quality Control']
      }
    },
    
    // Contact Section
    contact: {
      title: 'Unveiling a New Chapter in Intelligent Conversations',
      subtitle: 'See how Zenava transforms your customer dialogue operations with intelligent upgrades',
      form: {
        name: 'Full Name',
        email: 'Business Email',
        company: 'Company',
        message: 'How can we help?',
        submit: 'Send Message'
      },
      cta: {
        demo: 'Schedule Demo',
        download: 'Download Brochure'
      }
    },
    
    // Footer
    footer: {
      sections: {
        solutions: 'Solutions',
        company: 'Company',
        legal: 'Legal',
        resources: 'Resources'
      },
      links: {
        about: 'About Us',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Preferences'
      },
      copyright: '© 2024 Zenava. All rights reserved.',
      followUs: 'Follow Us'
    },
    
    // Common Actions
    actions: {
      learnMore: 'Learn More',
      getStarted: 'Get Started',
      contactUs: 'Contact Us',
      bookDemo: 'Book a Demo',
      download: 'Download',
      viewAll: 'View All'
    },
    
    // Statistics
    stats: {
      title: 'Platform Performance',
      conversations: 'Conversations Handled',
      uptime: 'Uptime SLA',
      enterprises: 'Enterprise Clients',
      satisfaction: 'Customer Satisfaction',
      uptimeValue: '99.9%',
      enterprisesValue: '5000+',
      satisfactionValue: '4.9/5'
    },

    
    // Product Feedback Panel
    productFeedbackPanel: {
      title: 'Customer Feedback Analysis Panel',
      painPoints: 'Product Pain Points',
      painPointCount: '1,842',
      featureAdoption: 'Feature Adoption',
      adoptionRate: '78%',
      fixCycle: 'Issue Fix Cycle',
      fixTime: '3.2 days',
      monthlyIterations: 'Monthly Iterations',
      iterationCount: '12 versions',
      satisfactionIncrease: 'Satisfaction Increase',
      satisfactionGrowth: '+18%'
    },
    
    // Sentiment Panel
    sentimentPanel: {
      title: 'Real-time Sentiment Monitoring',
      negativeAlert: 'Negative Sentiment Alert',
      alertCount: '3 items',
      sensitiveWords: 'Sensitive Word Detection',
      detectionRate: '99.8%',
      brandSentiment: 'Brand Favorability',
      sentimentGrowth: '+12%',
      responseTime: 'Response Time',
      responseSpeed: '<5 minutes',
      crisisSuccess: 'Crisis Success Rate',
      successRate: '98%'
    },
    
    // AI Simulation Dialog
    aiSimulation: {
      aiAssistant: 'Zenava AI',
      status: 'Online',
      live: 'Real-time',
      customerQuery: "Hello, l'd like to check the logistics status of my order #A12345",
      aiProcessing: 'Identifying issue...',
      aiLocating: 'Locating your order information...',
      aiResponse: 'We have located your order. The package has been shipped and is expected to be delivered within 24 hours. Would you like me to send you the tracking link?',
      customerReply: 'Yes, thanks! Please send me the tracking link👍',
      inputPlaceholder: 'Type your message...',
      responseTime: 'Response Time',
      responseValue: '< 1.8s',
      satisfaction: 'Satisfaction',
      satisfactionValue: '98.7%'
    },
    
    // Sales Process Flow
    salesProcess: {
      title: 'Sales Enablement Process',
      step1: {
        title: 'Real-time Talk Track',
        description: 'Best talk track based on customer focus',
        value: 'Real-time'
      },
      step2: {
        title: 'Knowledge Base Access',
        description: 'Instant access to products, competitors, cases',
        value: 'Instant'
      },
      step3: {
        title: 'Smart Closing Assistance',
        description: '45% closing rate improvement',
        value: '+45%'
      }
    },
    
    // Platform Performance
    platformPerformance: {
      title: 'PLATFORM PERFORMANCE',
      subtitle: 'Trusted by 5000 enterprise companies worldwide for mission-critical customer interactions',
      uptime: 'Uptime SLA',
      enterprisesServed: 'Enterprise Clients',
      satisfaction: 'Customer Satisfaction'
    },
    
    // Smart Ticket Process
    ticketProcess: {
      title: 'Smart Ticket Process',
      step1: {
        title: 'AI Problem Detection',
        description: 'Smart analysis of issue type and urgency'
      },
      step2: {
        title: 'Knowledge Base Access',
        description: 'Historical solutions and best practices'
      },
      step3: {
        title: 'Smart Routing',
        description: 'Auto-assign to appropriate agent'
      },
      step4: {
        title: 'Track Resolution',
        description: 'Real-time status and satisfaction tracking'
      }
    },
    
    // Internal Operations Metrics
    operationsMetrics: {
      title: 'Operational Efficiency',
      storeAccess: 'Store Connections',
      storeCount: '500+',
      dailyProcessing: 'Daily Processing',
      dailyVolume: '10K+',
      avgResponse: 'Average Response',
      responseTime: '2 Hours',
      dispatchEfficiency: 'Dispatch Efficiency',
      efficiencyRate: '85%'
    }
  },
  
  jp: {
    // Company & Brand - Japanese with proper honorifics
    company: {
      name: 'Zenava',
      tagline: 'マーケティングとサービスシナリオ向けの対話型AIエージェント',
      vision: '企業の生産性および組織形態の変革を支援し、「人力主導」から「AI主導」への飛躍を実現',
      description: 'エンタープライズグレードのAI対話ソリューションで顧客エンゲージメントを変革'
    },
    
    // Navigation - Professional Japanese
    nav: {
      home: 'ホーム',
      scenarios: 'ソリューション',
      about: '会社概要',
      contact: 'お問い合わせ',
      getStarted: '始めましょう',
      learnMore: '詳細を見る',
      bookDemo: 'デモのご予約',
      language: '言語'
    },
    
    // Hero Section - Formal business Japanese
    hero: {
      title: 'マーケティングとサービスシナリオ向けの対話型AIエージェント',
      subtitle: '企業の生産性および組織形態の変革を支援し、「人力主導」から「AI主導」への飛躍を実現',
      cta: {
        primary: 'デモのご予約',
        secondary: 'ソリューション一覧'
      }
    },
    
    // Business Value - Professional tone
    businessValue: {
      title: 'ZENAVA改修',
      subtitle: 'これはサブタイトルです',
      metrics: {
        marketing: {
          title: 'マーケティング成果指標',
          costReduction: '平均顧客獲得コスト43%削減',
          conversionIncrease: 'リードコンバージョン疗65%向上',
          responseTime: '顧客応答時間',
          responseValue: '<30秒',
          channelCoverage: 'スマートマーケティングチャネル',
          channelCount: '10+',
          dailyInquiries: '日次問い合わせ処理数',
          dailyCount: '50,000+'
        },
        sales: {
          title: 'セールス成果指標',
          cycleReduction: '販売サイクル短縮',
          winRateIncrease: '成約率向上'
        },
        service: {
          title: 'サービス成果指標',
          responseTime: '平均応答時間',
          resolutionRate: '初回解決率'
        },
        internal: {
          title: '運用指標',
          efficiency: 'プロセス効率向上',
          satisfaction: '従業員満足度'
        },
        product: {
          title: '製品イノベーション指標',
          insights: '顧客インサイト生成',
          iterations: '製品イテレーション速度'
        },
        brand: {
          title: 'ブランド保護指標',
          monitoring: 'リアルタイム監視',
          response: '危機対応時間'
        }
      }
    },
    
    // Scenarios/Solutions - Industry terminology
    scenarios: {
      marketing: {
        title: 'マーケティング自動化',
        subtitle: 'コンバージョン向上、顧客獲得コスト削減',
        description: '顧客の意図をリアルタイムで把握し、潜在リードを効率的に分配。会話分析でマーケティング戦略を最適化。',
        features: [
          '意図認識',
          'スマートリード獲得',
          'マルチチャネル統合',
          '予測分析'
        ]
      },
      sales: {
        title: 'セールス支援プロセス',
        subtitle: '成約周期短縮、成約率アップ',
        description: 'リアルタイムトークスクリプト推奨、競合情報活用、ベストプラクティス提案。AIで成約戦略を支援し、コンバージョン向上を実現。',
        features: [
          'トークトラック推奨',
          '競合分析',
          'インテリジェントクロージング支援',
          'パフォーマンス分析'
        ],
        featureShort: ['トークスクリプト推奨', '競合分析', 'スマート成約']
      },
      customerService: {
        title: 'カスタマーサービス',
        subtitle: 'より速く、正確で、共感的なサポート',
        description: '24時間365日のインテリジェント応答、複雑な問題のルーティング、感情認識対応。ナレッジベース統合による迅速な問題解決。',
        features: [
          '24時間365日対応',
          '感情認識',
          'スマートチケッティング',
          'ナレッジ管理'
        ]
      },
      internalService: {
        title: '社内運営',
        subtitle: '多層組織管理の効率化',
        description: 'サービスの統一窓口で、設備、在庫、研修業務を処理。スマートディスパッチと進捗管理で、運営効率を最適化。',
        features: [
          '統一窓口',
          'インテリジェントルーティング',
          'データ分析',
          'プロセス自動化'
        ]
      },
      management: {
        title: '経営最適化',
        subtitle: '顧客の声が製品イノベーションを推進',
        description: '会話から製品に関するインサイトを抽出し、フィードバックの傾向を定量化。顧客の声を製品アップデートに活かすサイクルを構築',
        features: [
          'インサイトマイニング',
          'ニーズ抽出',
          'イテレーションループ',
          'トレンド分析'
        ],
        brandFeatures: ['リスクアラート', '感情分析', '品質管理']
      }
    },
    
    // Contact Section - Polite Japanese
    contact: {
      title: 'AI変革の旅を始めましょう',
      subtitle: 'Zenavaがお客様の対話オペレーションをどのように変革できるかご覧ください',
      form: {
        name: 'お名前',
        email: 'ビジネスメール',
        company: '会社名',
        message: 'お問い合わせ内容',
        submit: '送信'
      },
      cta: {
        demo: 'デモのご予約',
        download: 'パンフレットダウンロード'
      }
    },
    
    // Footer - Formal Japanese
    footer: {
      sections: {
        solutions: 'ソリューション',
        company: '会社情報',
        legal: '法的情報',
        resources: 'リソース'
      },
      links: {
        about: '会社概要',
        contact: 'お問い合わせ',
        privacy: 'プライバシーポリシー',
        terms: '利用規約',
        cookies: 'Cookieの設定'
      },
      copyright: '© 2024 Zenava. All rights reserved.',
      followUs: 'フォローする'
    },
    
    // Common Actions - Polite forms
    actions: {
      learnMore: '詳しく見る',
      getStarted: '始める',
      contactUs: 'お問い合わせ',
      bookDemo: 'デモを予約',
      download: 'ダウンロード',
      viewAll: 'すべて表示'
    },
    
    // Statistics
    stats: {
      title: 'プラットフォームパフォーマンス',
      conversations: '処理済み会話数',
      uptime: '稼働率SLA',
      enterprises: '企業クライアント',
      satisfaction: '顧客満足度',
      uptimeValue: '99.9%',
      enterprisesValue: '5000+',
      satisfactionValue: '4.9/5'
    },

    
    // Product Feedback Panel
    productFeedbackPanel: {
      title: '顧客フィードバック分析パネル',
      painPoints: '製品の問題点',
      painPointCount: '1,842',
      featureAdoption: '機能採用率',
      adoptionRate: '78%',
      fixCycle: '問題修正サイクル',
      fixTime: '3.2日',
      monthlyIterations: '月次アップデート',
      iterationCount: '12バージョン',
      satisfactionIncrease: '満足度向上',
      satisfactionGrowth: '+18%'
    },
    
    // Sentiment Panel
    sentimentPanel: {
      title: 'リアルタイム感情モニタリング',
      negativeAlert: 'ネガティブ感情アラート',
      alertCount: '3件',
      sensitiveWords: 'センシティブワード検出',
      detectionRate: '99.8%',
      brandSentiment: 'ブランド好感度',
      sentimentGrowth: '+12%',
      responseTime: '応答時間',
      responseSpeed: '<5分',
      crisisSuccess: '危機対応成功率',
      successRate: '98%'
    },

    
    // AI Simulation Dialog
    aiSimulation: {
      aiAssistant: 'Zenava AI',
      status: 'オンライン',
      live: 'ライブ',
      customerQuery: 'こんにちは、注文番号 #A12345 の配送状況を確認したいです',
      aiProcessing: '問題を識別中...',
      aiLocating: 'ご注文情報を確認中...',
      aiResponse: 'ご注文を確認しました。商品は発送済みで、24時間以内にお届け予定です。追跡リンクをお送りしますか？',
      customerReply: 'はい、追跡リンクをお願いします 👍',
      inputPlaceholder: 'メッセージを入力...',
      responseTime: 'レスポンス',
      responseValue: '< 1.8s',
      satisfaction: '満足度',
      satisfactionValue: '98.7%'
    },
    
    // Sales Process Flow
    salesProcess: {
      title: 'セールス支援プロセス',
      step1: {
        title: 'セールス支援プロセス',
        description: 'リアルタイムトークスクリプト推奨',
        value: 'リアルタイム'
      },
      step2: {
        title: 'ナレッジベース活用',
        description: '製品、競合、事例の即時アクセス',
        value: '即時'
      },
      step3: {
        title: 'インテリジェント成約支援',
        description: '成約率45%向上',
        value: '+45%'
      }
    },
    
    // Platform Performance
    platformPerformance: {
      title: 'プラットフォームパフォーマンス',
      subtitle: '世界中の5000社の企業様から、ミッションクリティカルな顧客対応で信頼されています',
      uptime: '稼働率SLA',
      enterprisesServed: '企業顧客',
      satisfaction: '顧客満足度'
    },
    
    // Smart Ticket Process
    ticketProcess: {
      title: 'スマートチケット処理プロセス',
      step1: {
        title: 'AI問題検出',
        description: '問題の種類と緊急度をスマートに分析'
      },
      step2: {
        title: 'ナレッジベース活用',
        description: '過去の解決策とベストプラクティス'
      },
      step3: {
        title: 'インテリジェントルーティング',
        description: '適切なエージェントへ自動割り当て'
      },
      step4: {
        title: '解決状況追跡',
        description: 'リアルタイムステータスと満足度追跡'
      }
    },
    
    // Internal Operations Metrics
    operationsMetrics: {
      title: '運用効率向上',
      storeAccess: '店舗接続',
      storeCount: '500+',
      dailyProcessing: '日次処理',
      dailyVolume: '10K+',
      avgResponse: '平均応答',
      responseTime: '2時間',
      dispatchEfficiency: 'ディスパッチ効率',
      efficiencyRate: '85%'
    }
  },
  
  hk: {
    // Company & Brand - Traditional Chinese (Hong Kong business style)
    company: {
      name: 'Zenava',
      tagline: '面向營銷和服務場景的對話式AI智能體',
      vision: '助力企業完成生產力與組織形態變革，實現從「人力驅動」到「AI驅動」的跨越',
      description: '企業級AI對話解決方案，革新客戶互動體驗'
    },
    
    // Navigation - Hong Kong business terminology
    nav: {
      home: '首頁',
      scenarios: '解決方案',
      about: '關於我們',
      contact: '聯絡我們',
      getStarted: '立即開始',
      learnMore: '了解更多',
      bookDemo: '預約演示',
      language: '語言'
    },
    
    // Hero Section
    hero: {
      title: '面向營銷和服務場景的對話式AI智能體',
      subtitle: '助力企業完成生產力與組織形態變革，實現從「人力驅動」到「AI驅動」的跨越',
      cta: {
        primary: '預約演示',
        secondary: '查看方案'
      }
    },
    
    // Business Value
    businessValue: {
      title: 'ZENAVA修改',
      subtitle: '這是副標題',
      metrics: {
        marketing: {
          title: '行銷成效指標',
          costReduction: '平均獲客成本降低',
          conversionIncrease: '線索轉化率提升',
          responseTime: '客戶響應時間',
          responseValue: '<30秒',
          channelCoverage: '智能行銷覆蓋渠道',
          channelCount: '10+',
          dailyInquiries: '日均處理諮詢量',
          dailyCount: '50,000+'
        },
        sales: {
          title: '銷售成效指標',
          cycleReduction: '銷售週期縮短',
          winRateIncrease: '成交率提升'
        },
        service: {
          title: '服務成效指標',
          responseTime: '平均響應時間',
          resolutionRate: '首次解決率'
        },
        internal: {
          title: '營運指標',
          efficiency: '流程效率提升',
          satisfaction: '員工滿意度'
        },
        product: {
          title: '產品創新指標',
          insights: '客戶洞察產生',
          iterations: '產品迭代速度'
        },
        brand: {
          title: '品牌保護指標',
          monitoring: '實時監控',
          response: '危機響應時間'
        }
      }
    },
    
    // Scenarios/Solutions
    scenarios: {
      marketing: {
        title: '市場營銷自動化',
        subtitle: '提升轉化率，降低獲客成本',
        description: '實時識別客戶意圖，統一話術留資，智能分配高潛線索。基於會話分析反哺營銷策略。',
        features: [
          '意圖識別',
          '智能留資',
          '多渠道整合',
          '預測分析'
        ]
      },
      sales: {
        title: '銷售賦能',
        subtitle: '縮短成交週期，提升成交率',
        description: '實時話術推薦，競品知識調用，最佳實踐建議。AI輔助成交策略，驗證轉化提升。',
        features: [
          '話術推薦',
          '競品分析',
          '智能成交輔助',
          '業績分析'
        ],
        featureShort: ['話術推薦', '競品分析', '智能成交']
      },
      customerService: {
        title: '客戶服務',
        subtitle: '更快、更準、更有溫度',
        description: '全天候智能響應，複雜問題智能分流，情緒感知互動。知識庫聯動快速解決問題。',
        features: [
          '24/7響應',
          '情緒識別',
          '智能工單',
          '知識管理'
        ]
      },
      internalService: {
        title: '內部運營',
        subtitle: '多層級組織高效管理',
        description: '統一服務入口處理設備、庫存、培訓事務。智能派單與進度追蹤，優化運營效率。',
        features: [
          '統一入口',
          '智能派單',
          '數據分析',
          '流程自動化'
        ]
      },
      management: {
        title: '管理優化',
        subtitle: '客戶聲音驅動產品創新',
        description: '從對話中提取產品洞察，量化反饋趨勢，建立客戶聲音到產品迭代閉環。',
        features: [
          '洞察挖掘',
          '需求提取',
          '迭代閉環',
          '趨勢分析'
        ],
        brandFeatures: ['風險預警', '情緒分析', '品質控制']
      }
    },
    
    // Contact Section
    contact: {
      title: '開啟智能對話新篇章',
      subtitle: '讓Zenava AI助力您的企業實現客戶對話場景的智能化升級',
      form: {
        name: '姓名',
        email: '商務郵箱',
        company: '公司名稱',
        message: '諮詢內容',
        submit: '發送訊息'
      },
      cta: {
        demo: '預約演示',
        download: '下載產品手冊'
      }
    },
    
    // Footer
    footer: {
      sections: {
        solutions: '解決方案',
        company: '公司',
        legal: '法律條款',
        resources: '資源'
      },
      links: {
        about: '關於我們',
        contact: '聯絡我們',
        privacy: '隱私政策',
        terms: '條款與條件',
        cookies: 'Cookie偏好設定'
      },
      copyright: '© 2024 Zenava. 版權所有。',
      followUs: '關注我們'
    },
    
    // Common Actions
    actions: {
      learnMore: '了解更多',
      getStarted: '立即開始',
      contactUs: '聯絡我們',
      bookDemo: '預約演示',
      download: '下載',
      viewAll: '查看全部'
    },
    
    // Statistics
    stats: {
      title: '平台性能',
      conversations: '處理對話數',
      uptime: '運行時間SLA',
      enterprises: '企業客戶',
      satisfaction: '客戶滿意度',
      uptimeValue: '99.9%',
      enterprisesValue: '5000+',
      satisfactionValue: '4.9/5'
    },

    
    // Product Feedback Panel
    productFeedbackPanel: {
      title: '客戶反饋分析面板',
      painPoints: '產品痛點',
      painPointCount: '1,842',
      featureAdoption: '功能採用率',
      adoptionRate: '78%',
      fixCycle: '問題修復週期',
      fixTime: '3.2天',
      monthlyIterations: '月度迭代',
      iterationCount: '12個版本',
      satisfactionIncrease: '滿意度提升',
      satisfactionGrowth: '+18%'
    },
    
    // Sentiment Panel
    sentimentPanel: {
      title: '實時情緒監控',
      negativeAlert: '負面情緒預警',
      alertCount: '3項',
      sensitiveWords: '敏感詞檢測',
      detectionRate: '99.8%',
      brandSentiment: '品牌好感度',
      sentimentGrowth: '+12%',
      responseTime: '響應時間',
      responseSpeed: '<5分鐘',
      crisisSuccess: '危機處理成功率',
      successRate: '98%'
    },

    
    // AI Simulation Dialog  
    aiSimulation: {
      aiAssistant: 'Zenava AI',
      status: '在線',
      live: '實時',
      customerQuery: '您好，我的訂單 #A12345 想查詢一下物流',
      aiProcessing: '正在識別問題...',
      aiLocating: '為您定位訂單資訊中...',
      aiResponse: '已找到訂單，包裹已出庫，預計 24 小時內送達。需要我發送追蹤連結嗎？',
      customerReply: '好的，謝謝！請發我追蹤連結 👍',
      inputPlaceholder: '輸入您的訊息...',
      responseTime: '響應時間',
      responseValue: '< 1.8s',
      satisfaction: '滿意度',
      satisfactionValue: '98.7%'
    },
    
    // Sales Process Flow
    salesProcess: {
      title: '銷售賦能流程',
      step1: {
        title: '實時話術推薦',
        description: '根據客戶關注點推薦最佳話術',
        value: '實時'
      },
      step2: {
        title: '知識庫調用',
        description: '產品、競品、案例即時調取',
        value: '秒級'
      },
      step3: {
        title: '智能成交輔助',
        description: '成交率提升45%',
        value: '+45%'
      }
    },
    
    // Platform Performance
    platformPerformance: {
      title: '平台性能',
      subtitle: '獲得全球5000家企業的信賴，為關鍵客戶互動提供可靠服務',
      uptime: '運行時間SLA',
      enterprisesServed: '企業客戶',
      satisfaction: '客戶滿意度'
    },
    
    // Smart Ticket Process  
    ticketProcess: {
      title: '智能工單處理流程',
      step1: {
        title: 'AI定位問題',
        description: '智能分析客戶問題類型和緊急程度'
      },
      step2: {
        title: '知識庫調用',
        description: '歷史解決方案和最佳實踐'
      },
      step3: {
        title: '智能路由',
        description: '自動分配給合適的服務人員'
      },
      step4: {
        title: '跟蹤解決',
        description: '實時狀態更新和滿意度追蹤'
      }
    },
    
    // Internal Operations Metrics
    operationsMetrics: {
      title: '營運效率提升',
      storeAccess: '門店接入',
      storeCount: '500+',
      dailyProcessing: '日均處理',
      dailyVolume: '10K+',
      avgResponse: '平均響應',
      responseTime: '2小時',
      dispatchEfficiency: '派單效率',
      efficiencyRate: '85%'
    }
  },
  
  zh: {
    // 公司与品牌 - 简体中文
    company: {
      name: 'Zenava',
      tagline: '面向营销和服务场景的对话式AI智能体',
      vision: '助力企业完成生产力与组织形态变革，实现从"人力驱动"到"AI驱动"的跨越',
      description: '企业级AI对话解决方案，革新客户互动体验'
    },
    
    // 导航
    nav: {
      home: '首页',
      scenarios: '解决方案',
      about: '关于我们',
      contact: '联系我们',
      getStarted: '立即开始',
      learnMore: '了解更多',
      bookDemo: '预约演示',
      language: '语言'
    },
    
    // 主横幅区
    hero: {
      title: '面向营销和服务场景的对话式AI智能体',
      subtitle: '助力企业完成生产力与组织形态变革，实现从"人力驱动"到"AI驱动"的跨越',
      cta: {
        primary: '预约演示',
        secondary: '查看方案'
      }
    },
    
    // 业务价值
    businessValue: {
      title: 'ZENAVA修改',
      subtitle: '这是副标题',
      metrics: {
        marketing: {
          title: '营销成效指标',
          costReduction: '平均获客成本降低',
          conversionIncrease: '线索转化率提升',
          responseTime: '客户响应时间',
          responseValue: '<30秒',
          channelCoverage: '智能营销覆盖渠道',
          channelCount: '10+',
          dailyInquiries: '日均处理咨询量',
          dailyCount: '50,000+'
        },
        sales: {
          title: '销售成效指标',
          cycleReduction: '销售周期缩短',
          winRateIncrease: '成交率提升',
          step1Title: '实时话术推荐',
          step1Desc: '根据客户关注点推荐最佳话术',
          step1Value: '实时',
          step2Title: '知识库调用',
          step2Desc: '产品、竞品、案例即时调取',
          step2Value: '秒级',
          step3Title: '智能成交辅助',
          step3Desc: '成交率提升45%',
          step3Value: '+45%'
        },
        service: {
          title: '服务成效指标',
          responseTime: '平均响应时间',
          resolutionRate: '首次解决率',
          step1Title: 'AI定位问题',
          step1Desc: '智能分析客户问题类型和紧急程度',
          step2Title: '知识库调用',
          step2Desc: '历史解决方案和最佳实践',
          step3Title: '智能路由',
          step3Desc: '根据技能和负载自动分配',
          step4Title: '跟踪解决',
          step4Desc: '实时状态更新和质量保证'
        },
        internal: {
          title: '运营效率提升',
          efficiency: '流程效率提升',
          satisfaction: '员工满意度',
          storeConnections: '门店接入',
          storeCount: '500+',
          dailyProcessing: '日均处理',
          dailyCount: '10K+',
          avgResponse: '平均响应',
          avgTime: '2小时',
          assignmentEfficiency: '派单效率',
          efficiencyRate: '85%'
        },
        product: {
          title: '客户反馈仪表盘',
          insights: '客户洞察生成',
          iterations: '产品迭代速度',
          painPoints: '产品痛点收集',
          painPointCount: '1,842',
          featureAdoption: '功能采用率',
          adoptionRate: '78%',
          resolutionCycle: '问题解决周期',
          cycleTime: '3.2天',
          monthlyIterations: '月度产品迭代',
          iterationCount: '12个版本',
          satisfactionIncrease: '满意度提升',
          increaseRate: '+18%'
        },
        brand: {
          title: '实时舆情监控',
          monitoring: '实时监控',
          response: '危机响应时间',
          negativeAlerts: '负面情绪预警',
          alertCount: '3',
          sensitiveWords: '敏感词检测',
          detectionRate: '99.8%',
          brandFavorability: '品牌好感度',
          favorabilityRate: '+12%',
          responseTime: '舆情响应时间',
          responseValue: '<5分钟',
          crisisSuccess: '危机处理成功率',
          successRate: '98%'
        }
      }
    },
    
    // 场景/解决方案
    scenarios: {
      marketing: {
        title: '市场营销自动化',
        subtitle: '提升转化率，降低获客成本',
        description: '实时识别客户意图，统一话术留资，智能分配高潜线索。基于会话分析反哺营销策略优化。',
        features: [
          '意图识别',
          '智能留资',
          '多渠道整合',
          '预测分析'
        ]
      },
      sales: {
        title: '销售赋能',
        subtitle: '缩短成交周期，提升成交率',
        description: '实时话术推荐，竞品知识调用，最佳实践建议。AI辅助成交策略，验证转化提升。',
        features: [
          '话术推荐',
          '竞品分析',
          '智能成交辅助',
          '业绩分析'
        ],
        featureShort: ['话术推荐', '竞品分析', '智能成交']
      },
      customerService: {
        title: '客户服务',
        subtitle: '更快、更准、更有温度',
        description: '全天候智能响应，复杂问题智能分流，情绪感知互动。知识库联动快速解决问题。',
        features: [
          '24/7响应',
          '情绪识别',
          '智能工单',
          '知识管理'
        ],
        featureShort: ['24/7响应', '情绪识别', '智能工单处理流程']
      },
      internalService: {
        title: '内部运营',
        subtitle: '多层级组织高效管理',
        description: '统一服务入口处理设备、库存、培训事务。智能派单与进度追踪，优化运营效率。',
        features: [
          '统一入口',
          '智能派单',
          '数据分析',
          '流程自动化'
        ],
        featureShort: ['统一入口', '智能派单', '数据分析']
      },
      management: {
        title: '管理优化',
        subtitle: '客户声音驱动产品创新',
        description: '从对话中提取产品洞察，量化反馈趋势，建立客户声音到产品迭代闭环。',
        features: [
          '洞察挖掘',
          '需求提取',
          '迭代闭环',
          '趋势分析'
        ],
        featureShort: ['洞察挖掘', '需求提取', '迭代闭环'],
        brandFeatures: ['风险预警', '情绪分析', '品质控制']
      }
    },
    
    // 联系区
    contact: {
      title: '开启智能对话新篇章',
      subtitle: '让Zenava AI助力您的企业实现客户对话场景的智能化升级',
      form: {
        name: '姓名',
        email: '商务邮箱',
        company: '公司名称',
        message: '咨询内容',
        submit: '发送消息'
      },
      cta: {
        demo: '预约演示',
        download: '下载产品手册'
      }
    },
    
    // 页脚
    footer: {
      sections: {
        solutions: '解决方案',
        company: '公司',
        legal: '法律条款',
        resources: '资源'
      },
      links: {
        about: '关于我们',
        contact: '联系我们',
        privacy: '隐私政策',
        terms: '服务条款',
        cookies: 'Cookie偏好设置'
      },
      copyright: '© 2024 Zenava. 版权所有。',
      followUs: '关注我们'
    },
    
    // 常用操作
    actions: {
      learnMore: '了解更多',
      getStarted: '立即开始',
      contactUs: '联系我们',
      bookDemo: '预约演示',
      download: '下载',
      viewAll: '查看全部'
    },
    
    // 统计数据
    stats: {
      title: '平台性能',
      conversations: '处理对话数',
      uptime: '运行时间SLA',
      enterprises: '企业客户',
      satisfaction: '客户满意度',
      uptimeValue: '99.9%',
      enterprisesValue: '5000+',
      satisfactionValue: '4.9/5'
    },

    
    // 产品反馈面板
    productFeedbackPanel: {
      title: '客户反馈分析面板',
      painPoints: '产品痛点',
      painPointCount: '1,842',
      featureAdoption: '功能采用率',
      adoptionRate: '78%',
      fixCycle: '问题修复周期',
      fixTime: '3.2天',
      monthlyIterations: '月度迭代',
      iterationCount: '12个版本',
      satisfactionIncrease: '满意度提升',
      satisfactionGrowth: '+18%'
    },
    
    // 舆情面板
    sentimentPanel: {
      title: '实时舆情监控',
      negativeAlert: '负面情绪预警',
      alertCount: '3项',
      sensitiveWords: '敏感词检测',
      detectionRate: '99.8%',
      brandSentiment: '品牌好感度',
      sentimentGrowth: '+12%',
      responseTime: '响应时间',
      responseSpeed: '<5分钟',
      crisisSuccess: '危机处理成功率',
      successRate: '98%'
    },
    
    // AI模拟对话
    aiSimulation: {
      aiAssistant: 'Zenava AI',
      status: '在线',
      live: '实时',
      customerQuery: '你好，我的订单 #A12345 想查询一下物流',
      aiProcessing: '正在识别问题...',
      aiLocating: '为您定位订单信息中...',
      aiResponse: '已找到订单，包裹已出库，预计 24 小时内送达。需要我发送追踪链接吗？',
      customerReply: '好的，谢谢！请发我追踪链接 👍',
      inputPlaceholder: '输入您的消息...',
      responseTime: '响应时间',
      responseValue: '< 1.8s',
      satisfaction: '满意度',
      satisfactionValue: '98.7%'
    },
    
    // 销售流程
    salesProcess: {
      title: '销售赋能流程',
      step1: {
        title: '实时话术推荐',
        description: '根据客户关注点推荐最佳话术',
        value: '实时'
      },
      step2: {
        title: '知识库调用',
        description: '产品、竞品、案例即时调取',
        value: '秒级'
      },
      step3: {
        title: '智能成交辅助',
        description: '成交率提升45%',
        value: '+45%'
      }
    },
    
    // 平台性能
    platformPerformance: {
      title: '平台性能',
      subtitle: '获得全球5000家企业的信赖，为关键客户互动提供可靠服务',
      uptime: '运行时间SLA',
      enterprisesServed: '企业客户',
      satisfaction: '客户满意度'
    },
    
    // 智能工单流程
    ticketProcess: {
      title: '智能工单处理流程',
      step1: {
        title: 'AI定位问题',
        description: '智能分析客户问题类型和紧急程度'
      },
      step2: {
        title: '知识库调用',
        description: '历史解决方案和最佳实践'
      },
      step3: {
        title: '智能路由',
        description: '自动分配给合适的服务人员'
      },
      step4: {
        title: '跟踪解决',
        description: '实时状态更新和满意度追踪'
      }
    },
    
    // 内部运营指标
    operationsMetrics: {
      title: '运营效率提升',
      storeAccess: '门店接入',
      storeCount: '500+',
      dailyProcessing: '日均处理',
      dailyVolume: '10K+',
      avgResponse: '平均响应',
      responseTime: '2小时',
      dispatchEfficiency: '派单效率',
      efficiencyRate: '85%'
    }
  }
}

export type Language = 'zh' | 'en' | 'jp' | 'hk'

export function getTranslations(language: Language) {
  return siteTranslations[language] || siteTranslations.zh
}

// Helper to get nested translation
export function t(language: Language, key: string): string {
  const translations = getTranslations(language)
  return key.split('.').reduce((obj, k) => obj?.[k], translations as any) || key
}