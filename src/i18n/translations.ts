// Comprehensive multi-language translations for Zenava
// Reference: Avaya, Genesys, Decagon, Sierra professional terminology

export const siteTranslations = {
  en: {
    // Company & Brand
    company: {
      name: 'Zenava',
      tagline: 'AI Productivity Platform for Customer Service and Marketing Scenarios',
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
      title: 'AI Productivity Platform for Customer Service and Marketing Scenarios',
      subtitle: 'Empowering enterprise productivity and organizational transformation, achieving the leap from "Human-Driven" to "AI-Driven"',
      cta: {
        primary: 'Schedule Demo',
        secondary: 'View Solutions'
      }
    },
    
    // Business Value
    businessValue: {
      title: 'What Zenava Can Bring to Enterprises',
      subtitle: 'Enable enterprises to efficiently serve customers anytime, anywhere, creating exceptional customer experiences while reducing service costs',
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
      },
      // Capabilities Section - Alternating-Text-Media-List format
      capabilities: {
        item1: {
          title: 'Instant Response, Quick Problem Resolution',
          list: [
            'Provide 7×24 hour instant response service for enterprises',
            'Support interaction with customers via voice and text messages on digital channels such as website, APP, WhatsApp, LINE, Facebook, quickly respond to customers and solve problems',
            'Reduce waiting time, lower labor costs, and improve customer satisfaction'
          ],
          button: 'Learn More',
          imageAlt: 'Instant Response Service'
        },
        item2: {
          title: 'Natural Communication Experience Comparable to Humans, More Trustworthy',
          list: [
            'Can understand voice, text, images, videos and other forms of information to accurately solve customer problems',
            'Support complex multi-turn dialogue information collection, can break down complex needs and handle complex problems',
            'Have emotional perception ability, patient and warm, through natural communication experience comparable to humans, improve customer loyalty'
          ],
          button: 'Learn More',
          imageAlt: 'Natural Communication Experience'
        },
        item3: {
          title: 'Customer Service Automation, Achieve True End-to-End Closed Loop',
          list: [
            'Can independently handle 80% of repetitive, high-frequency, process-clear customer contact tasks',
            'Achieve end-to-end automated closed loop from intent recognition → task execution → feedback results, can completely replace human resources in specific tasks'
          ],
          button: 'Learn More',
          imageAlt: 'Customer Service Automation'
        },
        item4: {
          title: 'Intelligent Lead Generation, Improve Customer Conversion Rate',
          list: [
            'Accurately identify customer intent, deeply explore customer needs, provide professional responses, and promote transactions',
            'Actively ask and clarify key information, guide customers to leave information, automatically collect leads, and improve customer conversion rate'
          ],
          button: 'Learn More',
          imageAlt: 'Intelligent Lead Generation'
        },
        item5: {
          title: 'Quantifiable Results, Make AI Value Visible',
          list: [
            'Restructure enterprise cost structure, service costs reduced by approximately 20%',
            'The preferred choice for enterprises to reduce costs and increase efficiency'
          ],
          button: 'Learn More',
          imageAlt: 'Quantifiable Results'
        }
      }
    },
    
    // Scenarios/Solutions
    scenarios: {
      marketing: {
        title: 'Marketing Automation',
        subtitle: 'Increase Conversion Rate, Reduce Customer Acquisition Cost',
        description: 'Real-time intent recognition, unified lead capture, intelligent high-potential lead routing. Conversation analytics inform marketing strategy optimization',
        features: [
          'Intent Recognition',
          'Smart Lead Capture',
          'Multi-channel Integration',
          'Predictive Analytics'
        ],
        section3: {
          mainTitle: 'AI-Driven Marketing Automation',
          subtitle: 'Intelligent Lead Generation, Precise Conversion',
          description: 'Through AI-powered intelligent customer acquisition and recognition',
          tag1: 'Smart Recognition',
          tag2: 'Real-time Optimization',
          buttonText: 'Learn More About Marketing Automation',
          imageAlt: 'Physical Image'
        }
      },
      sales: {
        title: 'Sales Enablement',
        subtitle: 'Shorten sales cycle, increase conversion rate',
        description: 'Real-Time Talk Track Recommendation, Competitor Knowledge Retrieval, Best Practice Suggestions. Al-assisted deal-closing strategies verify conversion improvement',
        features: [
          'Talk Track Recommendations',
          'Competitive Analysis',
          'Intelligent Closing Assistance',
          'Performance Analytics'
        ],
        featureShort: ['Talk Track Recommendation', 'Competitor Analysis', 'Smart Deal-closing'],
        buttonText: 'Learn More About Sales'
      },
      customerService: {
        title: 'Customer Service',
        subtitle: 'Faster, Accurate, Empathetic Support',
        description: '24/7 intelligent response, smart routing for complex inquiries, sentiment-aware interactions. Knowledge base integration for fast resolution',
        features: [
          '24/7 Availability',
          'Emotion Recognition',
          'Smart Ticket Processing Workflow',
          'Knowledge Management'
        ],
        featureShort: ['24/7 Response', 'Emotion Recognition', 'Smart Ticket Processing Workflow'],
        buttonText: 'Learn More About Customer Service'
      },
      internalService: {
        title: 'Internal Operations',
        subtitle: 'Efficient Management of Multi-level Organizations',
        description: 'Unified service portal for equipment, inventory, and training. Intelligent dispatch and progress tracking optimize operational efficiency',
        features: [
          'Unified Portal',
          'Intelligent Routing',
          'Data Analytics',
          'Process Automation'
        ],
        featureShort: ['Unified Portal', 'Intelligent Dispatch', 'Data Analytics'],
        buttonText: 'Learn More About Internal Service',
        videoError: 'Your browser does not support video playback'
      },
      management: {
        title: 'Management Optimization',
        subtitle: 'Customer Feedback Drives Product lnnovation',
        description: 'Extract product insights from conversations, quantify feedback trends, establish a closed loop from customer feedback to product iteration',
        features: [
          'Insight Mining',
          'Requirement Extraction',
          'Iteration Loop',
          'Trend Analysis'
        ],
        featureShort: ['Insights Mining', 'Requirement Extraction', 'lteration Closed Loop'],
        brandFeatures: ['Risk Alert', 'Sentiment Analysis', 'Quality Control'],
        buttonText: 'Learn More About Management'
      }
    },
    
    // Industry Solutions
    industries: {
      retail: {
        pageTitle: 'AI Agents for Retail',
        banner: {
          src: '/assets/images/retail/banner-en.webp',
          mobileSrc: '/assets/images/retail/banner-mobile-en.webp',
          alt: 'Retail Product Banner',
          link: '/contact'
        },
        cardGrid: {
          card1: {
            title: 'Connect with Consumers Anytime, Anywhere',
            description: 'Establish 24/7 connections with consumers across brand websites, apps, social media, and other digital channels',
            button1Text: 'Learn More',
            button1Link: '/contact',
            button2Text: 'Book Demo',
            button2Link: '/contact'
          },
          card2: {
            title: 'Personalized Customer Service',
            description: 'Provide precise, personalized services to consumers, enhancing customer experience',
            button1Text: 'Learn More',
            button1Link: '/contact',
            button2Text: 'Book Demo',
            button2Link: '/contact'
          },
          card3: {
            title: 'Handle Massive Customer Inquiries',
            description: 'Process large volumes of customer inquiries simultaneously, easily handling peak sales seasons and shopping surges',
            button1Text: 'Learn More',
            button1Link: '/contact',
            button2Text: 'Book Demo',
            button2Link: '/contact'
          }
        },
        alternatingTags: {
          title: 'Core Business Scenarios',
          subtitle: 'Providing Full Lifecycle Services for Consumers',
          items: [
            {
              icon: 'fas fa-shopping-bag',
              title: 'Intelligent Shopping Guidance',
              subtitle: '',
              description: 'Accurately identify customer inquiry intent, proactively provide personalized product recommendations and promotional information, boost sales, and improve purchase conversion rates.',
              tags: ['Intent Recognition', 'Personalized Recommendations', 'Promotional Information', 'Conversion Enhancement'],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/01-en.webp',
              mediaAlt: 'Intelligent Shopping Guidance'
            },
            {
              icon: 'fas fa-clipboard-list',
              title: 'Order Management',
              subtitle: '',
              description: 'Automatically handle common inquiries such as order queries, returns and exchanges, and logistics tracking, reducing wait times and improving customer satisfaction and shopping experience.',
              tags: ['Order Queries', 'Returns & Exchanges', 'Logistics Tracking', 'Efficiency Improvement'],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/02-en.webp',
              mediaAlt: 'Order Management'
            },
            {
              icon: 'fas fa-tools',
              title: 'After-Sales Troubleshooting',
              subtitle: '',
              description: 'When customers encounter product issues, accurately identify problems through multi-turn conversations combined with images or videos, independently guide customers to complete troubleshooting, improving problem resolution efficiency',
              tags: ['Issue Identification', 'Multi-turn Conversations', 'Image & Video Support', 'Problem Resolution'],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/03-en.webp',
              mediaAlt: 'After-Sales Troubleshooting'
            },
            {
              icon: 'fas fa-wrench',
              title: 'Installation, Repair & Smart Follow-up',
              subtitle: '',
              description: 'Automatically identify customer service needs such as repairs and installations, generate work orders and dispatch to relevant personnel; automatically initiate satisfaction surveys after service completion, forming a complete customer service closed loop and enhancing customer experience.',
              tags: ['Work Order Generation', 'Smart Dispatch', 'Satisfaction Surveys', 'Service Closed Loop'],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/04-en.webp',
              mediaAlt: 'Installation, Repair & Smart Follow-up'
            }
          ]
        },
        alternatingList: {
          title: '',
          subtitle: '',
          items: [
            {
              title: 'Quantifiable Results',
              subtitle: 'Every Investment is Quantifiable',
              features: [
                'Clear ROI Visibility',
                'Automatically Handle 90% of Common Customer Issues',
                'After-Sales Issue Resolution Time Reduced by 60%',
                'Customer Satisfaction Increased to 92%+',
                'Average Purchase Conversion Rate Increased by 30–40%'
              ],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              imagePath: '/assets/images/retail/05-en.webp',
              imageAlt: 'Quantifiable Results'
            }
          ]
        },
        quantifiedEffects: {
          title: 'Quantified Effects',
          subtitle: '',
          description: '',
          effects: [
            'Clear Return on Investment',
            'Automatically handle 90% of common customer issues',
            'After-sales problem resolution time reduced 60%',
            'Customer satisfaction increased to 92%+',
            'Average purchase conversion rate increased 30–40%'
          ],
          buttonText: 'Learn More',
          buttonLink: '/contact',
          imageAlt: 'Quantified Effects',
          imageSrc: '/assets/images/retail/06-en.webp'
        }
      },
      automotive: {
        banner: {
          src: '/assets/images/automotive/banner-en.webp',
          mobileSrc: '/assets/images/automotive/banner-mobile-en.webp',
          alt: 'Automotive Product Banner',
          link: '/contact'
        },
        alternatingList: {
          title: 'Core Business Scenarios',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-car',
              title: 'Test Drive Invitation',
              description: 'Accurately identify customer intent and efficiently drive test drive conversion',
              features: [
                'Sensitively capture customer concerns, quickly and accurately answer questions about model configuration, pricing, and promotions',
                'Automatically identify customer purchase intent and available time, guide customers to complete test drive appointments',
                'From customer identification, consultation answers to task dispatch, achieve full-process automation of sales follow-up'
              ],
              businessValue: [
                'Test Drive Invitation Conversion Rate Increased by 35%+',
                'Customer Satisfaction Increased to 95%',
                'Customer Response Time Reduced by 30%'
              ],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              imagePath: '/assets/images/automotive/01-en.webp',
              imageAlt: 'Test Drive Invitation'
            },
            {
              icon: 'fas fa-headset',
              title: 'After-Sales Service & Customer Care',
              description: 'Quickly respond to customer needs and enhance brand loyalty',
              features: [
                'Provide real-time maintenance/repair progress queries without waiting for human customer service',
                'Proactively conduct maintenance reminders and recall notifications to improve customer satisfaction and loyalty',
                'Automatically follow up and conduct satisfaction surveys after test drives/services to collect improvement feedback'
              ],
              businessValue: [
                'After-Sales Inquiry Response Time Reduced by 50%',
                'After-Sales Satisfaction Increased by 25%+',
                'Customer Retention Rate Increased by 20%+'
              ],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              imagePath: '/assets/images/automotive/02-en.webp',
              imageAlt: 'After-Sales Service & Customer Care'
            }
          ]
        }
      },
      software: {
        banner: {
          src: '/assets/images/software/banner-en.webp',
          mobileSrc: '/assets/images/software/banner-mobile-en.webp',
          alt: 'Software Product Banner',
          link: '/contact'
        },
        scenariosList: {
          title: 'Core Business Scenarios',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-user-check',
              title: 'Pre-Sales Lead Generation',
              description: 'Automatically identify high-intent customers, efficiently collect key information, and improve lead conversion rates',
              features: [
                '24/7 reception, covering nights and holidays, providing second-level response',
                'Accurately judge customer intent and lead generation willingness in open conversations',
                'Leverage rich product knowledge and strong general knowledge to provide high-quality professional answers and enhance customer trust'
              ],
              effects: [
                'Conversion rate from inquiry to lead increased from 10% to 40%',
                'Save over 1 million in labor costs annually'
              ],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/01-en.webp',
              imageAlt: 'Pre-Sales Lead Generation'
            },
            {
              icon: 'fas fa-question-circle',
              title: 'Software Usage Consultation',
              description: 'Quickly respond to user questions, efficiently guide users on software features, and help new users get started quickly',
              features: [
                'Accurately understand vague or incomplete user questions, quickly locate specific functions or interface operations',
                'Provide contextually consistent and easy-to-follow guidance under different versions, permissions, or personalized configurations'
              ],
              effects: [
                'Independent reception rate reaches 62%'
              ],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/02-en.webp',
              imageAlt: 'Software Usage Consultation'
            },
            {
              icon: 'fas fa-tools',
              title: 'Technical Support',
              description: 'For customers and internal teams, automatically answer product technical questions during after-sales or product usage, provide troubleshooting guidance and ticket routing, improving service efficiency',
              features: [
                'Accurately identify semantic expressions and contextual dependencies of complex technical issues, ensuring accurate answers that match user scenarios',
                'Based on intelligent agent knowledge base, quickly locate problems through large model analysis and provide comprehensive solutions',
                'Smoothly escalate to human handling when problems cannot be solved'
              ],
              effects: [
                'Accuracy exceeds 85%, average response time within 3S',
                'Independent reception rate increased from 20% to 35%'
              ],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/03-en.webp',
              imageAlt: 'Technical Support'
            }
          ]
        },
        casesList: {
          title: 'Case Studies & Quantified Effects',
          subtitle: '',
          items: [
            {
              title: 'SaaS Enterprise Website Unmanned Customer Service',
              challenge: [
                'Human customer service cannot provide full-time coverage, traditional form lead generation rate is low',
                'Human customer service training cycle is long, cannot quickly and effectively cover all product professional knowledge'
              ],
              solution: 'Deploy Zenava to work independently on the website, combining product feature introductions, industry cases, and product highlights to provide professional interpretation for customers, automatically conducting preliminary screening and information collection of leads',
              effects: [
                'Full-time coverage of pre-sales reception, achieving unmanned website customer service',
                'Lead generation rate as high as 46%, exceeding human lead generation rate by 40%'
              ],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/04-en.webp',
              imageAlt: 'SaaS Enterprise Website Unmanned Customer Service'
            },
            {
              title: 'Software Company Internal Technical Support',
              challenge: [
                'Internal support processes are complex, such as system function usage and system integration requiring coordination from multiple positions'
              ],
              solution: 'Deploy Zenava, integrating product operation documents, product descriptions, technical support FAQs, and pre-sales solution documents to build a knowledge base, providing full-time coverage for questions from sales, pre-sales, customers, and implementation engineers',
              effects: [
                'Customer-facing employee efficiency increased by 15%~30%',
                'Technical support team saves 40% of internal support time'
              ],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/05-en.webp',
              imageAlt: 'Software Company Internal Technical Support'
            }
          ]
        }
      },
      travel: {
        banner: {
          src: '/assets/images/travel/banner-en.webp',
          mobileSrc: '/assets/images/travel/banner-mobile-en.webp',
          alt: 'Travel Product Banner',
          link: '/contact'
        },
        alternatingTags: {
          title: 'Core Business Scenarios',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-hotel',
              title: 'Hotel & Ticket Booking',
              titleLink: '',
              subtitle: '',
              description: 'Accurately understand customer intent, independently and completely execute the entire booking process from confirming room type, time, ticket information to completing the booking, improving customer satisfaction and booking conversion rates.',
              tags: ['Intent Recognition', 'Full Process Automation', 'Booking Conversion', 'Customer Satisfaction'],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/01-en.webp',
              mediaAlt: 'Hotel & Ticket Booking'
            },
            {
              icon: 'fas fa-user-circle',
              title: 'Account Management',
              titleLink: '',
              subtitle: '',
              description: 'Instantly respond to customer inquiries about account access, loyalty programs, member benefits, etc., self-service common issues, reduce average handling time, and improve member loyalty.',
              tags: ['Instant Response', 'Self-Service', 'Member Management', 'Efficiency Improvement'],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/02-en.webp',
              mediaAlt: 'Account Management'
            },
            {
              icon: 'fas fa-life-ring',
              title: 'Travel Support',
              titleLink: '',
              subtitle: '',
              description: 'Provide instant assistance to customers regarding issues such as lost luggage, missed flights, or check-in times, reduce response time, and improve customer experience.',
              tags: ['Instant Assistance', 'Problem Resolution', 'Response Speed', 'Customer Experience'],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/03-en.webp',
              mediaAlt: 'Travel Support'
            }
          ]
        },
        alternatingList: {
          title: 'Quantifiable Results',
          subtitle: '',
          items: [
            {
              title: 'Quantifiable Results',
              features: [
                'Customer Satisfaction Increased by 30%',
                'Operating Costs Reduced by 35%',
                'Booking Conversion Rate Increased by 25%',
                'Response Time Reduced by 70%'
              ],
              buttonText: 'Learn More',
              buttonLink: '/contact',
              imagePath: '/assets/images/travel/04-en.webp',
              imageAlt: 'Quantifiable Results'
            }
          ]
        },
        quantifiedEffects: {
          title: 'Quantified Effects',
          subtitle: '',
          description: '',
          effects: [
            'Customer Satisfaction Increased 30%',
            'Operating Costs Reduced 35%',
            'Booking Conversion Rate Increased 25%',
            'Response Time Shortened 70%'
          ],
          buttonText: 'Learn More',
          buttonLink: '/contact',
          imageAlt: 'Quantified Effects',
          imageSrc: '/assets/images/travel/05-en.webp'
        }
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

    // Contact Form Page
    contactForm: {
      title: 'Contact Us',
      subtitle: 'Get Your Custom Solution',
      description: 'Our professional consultant will contact you soon.',
      firstName: 'First Name',
      firstNamePlaceholder: 'Enter your first name',
      lastName: 'Last Name',
      lastNamePlaceholder: 'Enter your last name',
      jobTitle: 'Job Title',
      jobTitlePlaceholder: 'Enter your job title',
      companyEmail: 'Company Email',
      companyEmailPlaceholder: 'example@company.com',
      companyName: 'Company Name',
      companyNamePlaceholder: 'Enter your company name',
      industry: 'Industry',
      selectIndustry: 'Please select',
      industryTech: 'Technology',
      industryFinance: 'Finance',
      industryHealthcare: 'Healthcare',
      industryRetail: 'Retail',
      industryManufacturing: 'Manufacturing',
      industryEducation: 'Education',
      industryOther: 'Other',
      privacyAgree: 'I agree to the Privacy Policy',
      submit: 'Submit',
      submitting: 'Submitting...',
      privacyNotice: 'By clicking submit, you acknowledge your data will be processed according to our',
      privacyLink: 'Privacy Policy',
      successMessage: 'Thank you for your submission. Our advisor will contact you soon.',
      errorMessage: 'Submission failed. Please try again.',
      downloadReady: 'Your download is ready',
      download: 'Download'
    },
    
    // Resource Center Page
    resourcesCenter: {
      hero: {
        slides: [
          {
            image: '/assets/images/resources/hero-1.jpg',
            imageAlt: 'Resource Center Hero Image',
            date: 'September 6, 2023',
            title: 'There\'s an agent for that, and it runs on Sierra',
            description: 'Today, we\'re announcing that we\'ve raised $350M additional capital at a valuation of $10B, led by Greenoaks, which is doubling down on Sierra.',
            buttonText: 'Learn More',
            link: '/contact'
          },
          {
            image: '/assets/images/resources/hero-2.jpg',
            imageAlt: 'Resource Center Hero Image 2',
            date: 'September 5, 2023',
            title: 'AI-Powered Customer Service Revolution',
            description: 'Discover how Zenava AI is transforming customer service with intelligent agents that understand, learn, and adapt in real-time.',
            buttonText: 'Learn More',
            link: '/contact'
          },
          {
            image: '/assets/images/resources/hero-3.jpg',
            imageAlt: 'Resource Center Hero Image 3',
            date: 'September 4, 2023',
            title: 'Enterprise AI Solutions for Modern Businesses',
            description: 'Explore our comprehensive AI platform designed for enterprise scale, helping businesses achieve digital transformation.',
            buttonText: 'Learn More',
            link: '/contact'
          }
        ]
      }
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
    
    // Other Resources Section
    otherResources: {
      title: 'Resource Center',
      cards: {
        voiceConnectivity: {
          title: 'Voice Agents',
          learnMore: 'Learn More',
          bookDemo: 'Book a Demo'
        },
        liveChat: {
          title: 'Live Chat',
          learnMore: 'Learn More',
          bookDemo: 'Book a Demo'
        }
      }
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

    // AI Agents Page
    products: {
      aiAgents: {
        banner: {
          src: '/assets/images/ai-agents/banner-en.webp',
          mobileSrc: '/assets/images/ai-agents/banner-mobile-en.webp',
          alt: 'AI Agents Banner'
        },
        hero: {
          title: 'ZENAVA Independently Handles 80% of Repetitive, High-Frequency, Clear-Process Customer Interactions',
          subtitle: 'Significantly reduces reliance on human scale in traditional customer service, achieving a leap in customer experience',
          button: 'Schedule Consultation'
        },
        advantages: {
          title: 'ZENAVA Advantages',
          card1: {
            title: 'Conversational',
            subtitle: 'Communicate Like a Human',
            desc: 'Equipped with multimodal understanding, emotional perception, and highly humanized interaction capabilities, delivering communication experiences that surpass human interactions'
          },
          card2: {
            title: 'Action-Oriented',
            subtitle: 'Independently Complete Business Loops',
            desc: 'Directly drives business processes, completing tasks such as sending SMS, creating tickets, querying customer information, and sending appointment notifications'
          },
          card3: {
            title: 'Fast Deployment',
            subtitle: 'Smarter with Use',
            desc: 'Ready to use out of the box, quickly deploy and "go live", with built-in training processes that self-correct errors when encountering problems, getting smarter with use'
          },
          card4: {
            title: 'Quantifiable Value',
            subtitle: 'Make Every AI Investment Clearly Visible',
            desc: 'Value is quantifiable, achieving pure and disruptive cost structure reconstruction, reducing unit service cost (CPC) by approximately 20%'
          }
        },
        features: {
          title: 'Core Features',
          subtitle: '',
          voice: {
            label: 'Voice Agents',
            title: 'Beyond Human Voice Conversation Experience',
            subtitle: '',
            list: [
              'Human-like Timbre: Voice rich with emotion and expressiveness, delivering communication experiences that surpass real humans',
              'Low-latency Interaction: Fast response, real-time conversation without lag',
              'Precise Intelligent Interruption: Can interrupt and interject at any time, as natural as face-to-face conversation with real people',
              'Complete Business Loop, Significantly Improving Service Efficiency and Customer Experience'
            ],
            button: 'Learn More About Voice Agents',
            image: {
              src: '/assets/images/ai-agents/voice-en.webp',
              alt: 'Voice Feature Demo - Beyond Human Voice Conversation Experience'
            }
          },
          messaging: {
            label: 'Live Chat',
            title: 'Create Ultimate Customer Service Experience',
            subtitle: '',
            list: [
              '7x24 hours omnichannel online, never miss any communication with customers',
              'Support rich media communication including text, images, and videos, accurately identifying customer intent',
              'Able to sense customer emotions from expressions and respond in a friendly and respectful manner',
              'Create ultimate customer service experience, flexibly meeting customer needs',
              'Possess empathy and judgment, driving complete business process loop'
            ],
            button: 'Learn More About Live Chat',
            image: {
              src: '/assets/images/ai-agents/person-en.webp',
              alt: 'Instant Messaging Feature Demo - Create Ultimate Customer Service Experience'
            }
          }
        },
        resources: {
          title: 'Resource Center',
          card1: {
            tag: 'Product',
            title: 'Building Continuously Evolving AI Productivity'
          },
          card2: {
            tag: 'Industry Report',
            title: 'Building Continuously Evolving AI Productivity'
          },
          card3: {
            tag: 'Education',
            title: 'Building Continuously Evolving AI Productivity'
          },
          card4: {
            tag: 'Article',
            title: 'Building Continuously Evolving AI Productivity'
          }
        },
        cta: {
          title: 'Open a New Chapter in Intelligent Conversation',
          subtitle: 'Let Zenava AI help your enterprise achieve intelligent upgrades in customer conversation scenarios',
          button: 'Contact Us'
        }
      },
      voiceAgents: {
        banner: {
          src: '/assets/images/voice-agents/banner-en.webp',
          mobileSrc: '/assets/images/voice-agents/banner-mobile-en.webp',
          imageAlt: 'VoiceAgents Product Banner - Beyond Human Voice Conversation Experience'
        },
        coreFeatures: {
          title: 'Core Capabilities',
          subtitle: '',
          feature1: {
            title: 'Human-like Timbre',
            subtitle: 'Communicate Like a Real Person',
            description: 'Natural and smooth voice interactions with rich emotions, featuring multiple timbres and tone styles to meet personalized preferences. Capable of expressing care, understanding, and professionalism based on scenarios, delivering communication experiences beyond real humans',
            tags: ['Natural Flow', 'Emotional Rich', 'Multiple Timbres', 'Personalized'],
            button: 'Learn More',
            mediaAlt: 'Human-like Timbre Feature Demo',
            mediaPath: '/assets/images/voice-agents/humanized-voice-en.webp'
          },
          feature2: {
            title: 'Low-latency Interaction',
            subtitle: 'Real-time Response, No Waiting',
            description: 'Millisecond-level response speed, real-time conversation without lag, making interactions more natural. Whether customer inquiries, business processing, or complaint handling, Zenava responds quickly',
            tags: ['Millisecond Response', 'Real-time Dialogue', 'Seamless Transition', 'Efficient Flow'],
            button: 'Learn More',
            mediaAlt: 'Low-latency Interaction Feature Demo',
            mediaPath: '/assets/images/voice-agents/low-latency-en.webp'
          },
          feature3: {
            title: 'Precise Intelligent Interruption',
            subtitle: 'Understanding True User Intent',
            description: 'Supports users interrupting and interjecting at any time, with real-time responses without interruption, as natural and flexible as face-to-face conversation',
            tags: ['Smart Interruption', 'Intent Recognition', 'Natural Dialogue', 'Real-time Response'],
            button: 'Learn More',
            mediaAlt: 'Precise Intelligent Interruption Feature Demo',
            mediaPath: '/assets/images/voice-agents/intelligent-interruption-en.webp'
          },
          feature4: {
            title: 'Complete Business Loop',
            subtitle: 'End-to-End Business Automation',
            description: 'Zenava can directly execute tasks such as creating tickets, sending notifications, querying information, etc., turning conversations into actionable business operations',
            tags: ['Task Execution', 'Business Automation', 'Ticket Creation', 'Information Query'],
            button: 'Learn More',
            mediaAlt: 'Complete Business Loop Feature Demo',
            mediaPath: '/assets/images/voice-agents/business-loop-en.webp'
          }
        },
        customerCases: {
          title: 'Applications and Quantified Results',
          subtitle: '',
          case1: {
            tag: 'Kitchen Appliances Industry',
            title: 'Kitchen Appliance Customer Achieves Large-scale Customer Service Automation, Saving 5.25 Million Annually',
            subtitle: 'Annual Cost Savings of 5.25 Million',
            description: 'Zenava independently handles product inquiries, repairs, order queries, and other repetitive consultations, replacing the workload of 35 call center agents',
            features: [
              'Annual cost savings of approximately 5.25 million yuan',
              'Project ROI as high as 425%'
            ],
            button: 'Learn More',
            imageAlt: 'Kitchen Appliance Customer Service Automation Case',
            imageSrc: '/assets/images/voice-agents/case-kitchen-appliances-en.webp'
          },
          case2: {
            tag: 'Automotive Industry',
            title: 'Automotive Customer Uses Zenava for Test Drive Invitations, Conversion Rate Rises to 85%',
            subtitle: 'Conversion Rate Up to 85%',
            description: 'Zenava automatically qualifies customer leads, timely screens effective customers through voice interaction, invites high-intent customers for test drives',
            features: [
              'Improves potential customer follow-up efficiency, enhances lead conversion rate, drives sales growth',
              'Invitation conversion rate rises to 85%'
            ],
            button: 'Learn More',
            imageAlt: 'Automotive Customer Test Drive Invitation Case',
            imageSrc: '/assets/images/voice-agents/case-automotive-en.webp'
          },
          case3: {
            tag: 'Hotel Industry',
            title: 'Hotel Group Achieves Unmanned Booking Process, Significantly Boosting Booking Conversion Rate',
            subtitle: 'Booking Conversion Rate Up 15%-25%',
            description: 'Zenava independently completes the entire process from understanding booking needs, confirming time and room type to completing the booking',
            features: [
              'Supports multilingual communication, covering global customers',
              'Booking conversion rate increases by 15%-25%'
            ],
            button: 'Learn More',
            imageAlt: 'Hotel Group Booking Automation Case',
            imageSrc: '/assets/images/voice-agents/case-hotel-en.webp'
          }
        }
      },
      liveChat: {
        banner: {
          src: '/assets/images/livechat/banner-en.webp',
          mobileSrc: '/assets/images/livechat/banner-mobile-en.webp',
          alt: 'LiveChat Banner'
        },
        advantages: {
          title: 'LiveChat Advantages',
          card1: {
            title: 'Real-time Response',
            subtitle: 'Second-level Customer Reply',
            desc: '7x24 hours online, intelligent routing allocation, ensuring customer issues are responded to and handled promptly'
          },
          card2: {
            title: 'Multi-channel Support',
            subtitle: 'Unified Management of All Channels',
            desc: 'Support website, mobile, social media and other channels, unified management of customer conversations, improving service efficiency'
          },
          card3: {
            title: 'Intelligent Analytics',
            subtitle: 'Data-driven Optimization',
            desc: 'Real-time analysis of customer conversation data, identifying common issues, optimizing service processes, improving customer satisfaction'
          }
        },
        features: {},
        caseStudies: {
          title: 'Applications and Quantified Results',
          subtitle: '',
          case1: {
            mainTitle: 'B2B Enterprise Website Unmanned Customer Service, Lead Conversion Rate Up to 46%',
            highlight: 'Lead Conversion Rate Up to 46%',
            description: 'Zenava independently receives customers on the official website, automatically performs preliminary screening of leads and information collection',
            points: [
              'Covers pre-sales reception during all time slots, achieving unmanned customer service on the official website',
              'Lead conversion rate as high as 46%, exceeding manual lead conversion rate of 40%',
              'Product business knowledge updated at minute level, ensuring service accuracy and professionalism'
            ],
            metric: '46%',
            metricLabel: 'Lead Conversion Rate',
            imageSrc: '/assets/images/livechat/case1-b2b-en.webp',
            imageAlt: 'B2B Enterprise Website Unmanned Customer Service',
            button: 'Learn More',
            buttonLink: '/products/live-chat'
          },
          case2: {
            mainTitle: 'Smart Lock End-to-End After-Sales Service Automation, Annual Total Cost Savings of 6.21 Million',
            highlight: 'Annual Total Cost Savings of 6.21 Million',
            description: 'Zenava accurately identifies images through multi-round conversations, independently completing smart lock troubleshooting',
            points: [
              'Independent reception rate reaches 83%',
              'Annual total cost savings of 6.21 million'
            ],
            metric: '6.21M',
            metricLabel: 'Annual Cost Savings',
            metric2: '83%',
            metric2Label: 'Independent Reception Rate',
            imageSrc: '/assets/images/livechat/case2-smartlock-en.webp',
            imageAlt: 'Smart Lock End-to-End After-Sales Service Automation',
            button: 'Learn More',
            buttonLink: '/products/live-chat'
          }
        },
        section3: {
          title: 'AI Agents for Chat',
          subtitle: '',
          item1: {
            mainTitle: '7x24 Hour Omnichannel Online',
            subtitle: 'Never Miss Any Communication with Customers',
            description: 'Zenava can communicate with customers in real-time 7x24 hours on their chosen channels, whether it\'s web pages, Apps, social media, or messaging applications. Enterprises don\'t need to worry about customers waiting or missing business opportunities, significantly improving customer satisfaction and retention',
            buttonText: 'Learn More',
            imageAlt: '7x24 Hour Omnichannel Online',
            imageSrc: '/assets/images/livechat/omnichannel-en.webp'
          },
          item2: {
            mainTitle: 'Rich Media Communication',
            subtitle: 'Accurately Identify Customer Intent',
            description: 'Zenava can not only understand text but also images, videos, and other forms of information, providing a rich dialogue experience, enabling complex multi-turn dialogue information collection, accurately identifying customer intent, and efficiently handling customer problems',
            buttonText: 'Learn More',
            imageAlt: 'Rich Media Communication',
            imageSrc: '/assets/images/livechat/rich-media-en.webp'
          },
          item3: {
            mainTitle: 'Emotion Perception',
            subtitle: 'Respond in a Friendly and Respectful Manner',
            description: 'Zenava, through personality modeling, possesses language understanding and emotional perception capabilities, able to identify emotions from expressions and respond in a friendly and respectful manner, allowing customers to feel attentive and professional service experience',
            buttonText: 'Learn More',
            imageAlt: 'Emotion Perception',
            imageSrc: '/assets/images/livechat/emotion-en.webp'
          },
          item4: {
            mainTitle: 'Create Ultimate Customer Service Experience',
            subtitle: 'Flexibly Meet Customer Demands',
            description: 'Under the premise of adhering to enterprise business bottom lines and brand norms, Zenava can flexibly meet customers\' personalized needs, enabling enterprises to enhance customer experience while ensuring safety and compliance',
            buttonText: 'Learn More',
            imageAlt: 'Balance Business and Experience',
            imageSrc: '/assets/images/livechat/balance-en.webp'
          },
          item5: {
            mainTitle: 'Empathy and Judgment',
            subtitle: 'Drive Full Business Process Closure',
            description: 'Zenava possesses empathy and judgment, and in actual business scenarios, it can use tools like human employees to complete tasks such as sending SMS messages, creating work orders, querying customer data, and sending invitation notifications, achieving business closure',
            buttonText: 'Learn More',
            imageAlt: 'Empathy and Judgment',
            imageSrc: '/assets/images/livechat/empathy-en.webp'
          }
        }
      }
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
    },

    // Banner Carousel Translations
    banners: {
      slide1: {
        siteName: 'ZENAVA',
        mainTitle: 'Enterprise AI Conversation Solutions',
        description: 'Transform your customer service with intelligent AI agents, enhance customer experience, reduce operational costs',
        buttonText: 'Schedule Consultation',
        imageAlt: 'Banner Image 1',
        src: '/assets/images/banners/slide1-en.webp',
        mobileSrc: '/assets/images/banners/slide1-mobile-en.webp'
      },
      slide2: {
        siteName: 'ZENAVA Sales',
        mainTitle: 'Intelligent Sales Enablement System',
        description: 'AI-driven intelligent sales platform, precise customer profile analysis, intelligent sales strategy recommendations, improve closing rates and shorten sales cycles',
        buttonText: 'Learn About Sales Solutions',
        imageAlt: 'Intelligent Sales System Interface',
        src: '/assets/images/banners/slide2-en.webp',
        mobileSrc: '/assets/images/banners/slide2-mobile-en.webp'
      },
      slide3: {
        siteName: 'Intelligent AI Platform',
        mainTitle: '4345323',
        description: '43244444444',
        buttonText: 'Schedule Consultation',
        imageAlt: 'Intelligent AI Platform Display',
        src: '/assets/images/banners/slide3-en.webp',
        mobileSrc: '/assets/images/banners/slide3-mobile-en.webp'
      },
      slide4: {
        siteName: 'ZENAVA',
        mainTitle: '7x24 Intelligent Customer Service',
        description: 'AI-powered customer service system provides 24/7 service, automatically handles common issues, emotion recognition enhances experience',
        buttonText: 'View Details',
        imageAlt: 'Intelligent Customer Service',
        src: '/assets/images/banners/slide4-en.webp',
        mobileSrc: '/assets/images/banners/slide4-mobile-en.webp'
      },
      slide5: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: 'Marketing Campaign Banner',
        src: '/assets/images/banners/slide5-en.webp',
        mobileSrc: '/assets/images/banners/slide5-mobile-en.webp'
      },
      slide6: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: 'Marketing Campaign Banner',
        src: '/assets/images/banner-full-marketing-en.webp',
        mobileSrc: '/assets/images/banner-full-marketing-mobile-en.webp'
      }
    },
    
    // Common images and texts
    common: {
      logo: {
        src: '/assets/images/common/logo-en.webp',
        alt: 'Zenava Logo'
      },
      noImage: 'No Image'
    }
  },
  
  jp: {
    // Company & Brand - Japanese with proper honorifics
    company: {
      name: 'Zenava',
      tagline: 'カスタマーサービスとマーケティングシナリオ向けのAI生産性プラットフォーム',
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
      title: 'カスタマーサービスとマーケティングシナリオ向けのAI生産性プラットフォーム',
      subtitle: '企業の生産性および組織形態の変革を支援し、「人力主導」から「AI主導」への飛躍を実現',
      cta: {
        primary: 'デモのご予約',
        secondary: 'ソリューション一覧'
      }
    },
    
    // Business Value - Professional tone
    businessValue: {
      title: 'Zenavaが企業にもたらすもの',
      subtitle: '企業がいつでもどこでも効率的に顧客にサービスを提供し、卓越した顧客体験を創出し、サービスコストを削減',
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
      },
      // コア能力セクション - Alternating-Text-Media-List フォーマット
      capabilities: {
        item1: {
          title: '即時応答、迅速な問題解決',
          list: [
            '企業に7×24時間の即時応答サービスを提供',
            'ウェブサイト、APP、WHATSAPP、LINE、Facebookなどのデジタルチャネルで、音声やテキストメッセージを通じて顧客と対話し、迅速に応答して問題を解決',
            '待機時間の短縮、人件費の削減、顧客満足度の向上'
          ],
          button: '詳細を見る',
          imageAlt: '即時応答サービス'
        },
        item2: {
          title: '人間に匹敵する自然なコミュニケーション体験、より信頼できる',
          list: [
            '音声を理解し、テキスト、画像、動画など多様な形式の情報を理解し、顧客の問題を正確に解決',
            '複雑な多回対話情報収集をサポートし、複雑なニーズを分解し、複雑な問題を処理',
            '感情認識能力を備え、忍耐強く、温かみがあり、人間に匹敵する自然なコミュニケーション体験を通じて、顧客ロイヤルティを向上'
          ],
          button: '詳細を見る',
          imageAlt: '自然なコミュニケーション体験'
        },
        item3: {
          title: '顧客サービス自動化、真のエンドツーエンド閉ループを実現',
          list: [
            '反復的、高頻度、プロセスが明確な顧客連絡タスクの80%を独立して処理可能',
            '意図認識 → タスク実行 → フィードバック結果のエンドツーエンド自動化閉ループを実現し、特定のタスクでは完全に人的リソースを置き換え可能'
          ],
          button: '詳細を見る',
          imageAlt: '顧客サービス自動化'
        },
        item4: {
          title: 'インテリジェントなリード獲得、顧客転換率の向上',
          list: [
            '顧客の意図を正確に識別し、顧客のニーズを深く掘り下げ、専門的な対応を提供し、取引を促進',
            '積極的に質問し、重要な情報を明確化し、顧客に情報を残すよう導き、リードを自動収集し、顧客転換率を向上'
          ],
          button: '詳細を見る',
          imageAlt: 'インテリジェントなリード獲得'
        },
        item5: {
          title: '効果を定量化、AIの価値を可視化',
          list: [
            '企業のコスト構造を再構築し、サービスコストを約20%削減',
            '企業のコスト削減と効率向上の最適な選択'
          ],
          button: '詳細を見る',
          imageAlt: '効果の定量化'
        }
      }
    },
    
    // Scenarios/Solutions - Industry terminology
    scenarios: {
      marketing: {
        title: 'マーケティング自動化',
        subtitle: 'コンバージョン向上、顧客獲得コスト削減',
        description: '顧客の意図をリアルタイムで把握し、潜在リードを効率的に分配。会話分析でマーケティング戦略を最適化',
        features: [
          '意図認識',
          'スマートリード獲得',
          'マルチチャネル統合',
          '予測分析'
        ],
        section3: {
          mainTitle: 'AI駆動のマーケティングオートメーション',
          subtitle: 'スマートリード獲得、正確なコンバージョン',
          description: 'AIによるスマートな顧客獲得と認識',
          tag1: 'スマート認識',
          tag2: 'リアルタイム最適化',
          buttonText: 'マーケティングオートメーションの詳細',
          imageAlt: '実体画像'
        }
      },
      sales: {
        title: 'セールス支援プロセス',
        subtitle: '成約周期短縮、成約率アップ',
        description: 'リアルタイムトークスクリプト推奨、競合情報活用、ベストプラクティス提案。AIで成約戦略を支援し、コンバージョン向上を実現',
        features: [
          'トークトラック推奨',
          '競合分析',
          'インテリジェントクロージング支援',
          'パフォーマンス分析'
        ],
        featureShort: ['トークスクリプト推奨', '競合分析', 'スマート成約'],
        buttonText: '営業の詳細'
      },
      customerService: {
        title: 'カスタマーサービス',
        subtitle: 'より速く、正確で、共感的なサポート',
        description: '24時間365日のインテリジェント応答、複雑な問題のルーティング、感情認識対応。ナレッジベース統合による迅速な問題解決',
        features: [
          '24時間365日対応',
          '感情認識',
          'スマートチケッティング',
          'ナレッジ管理'
        ],
        buttonText: 'カスタマーサービスの詳細'
      },
      internalService: {
        title: '社内運営',
        subtitle: '多層組織管理の効率化',
        description: 'サービスの統一窓口で、設備、在庫、研修業務を処理。スマートディスパッチと進捗管理で、運営効率を最適化',
        features: [
          '統一窓口',
          'インテリジェントルーティング',
          'データ分析',
          'プロセス自動化'
        ],
        buttonText: '社内サービスの詳細',
        videoError: 'お使いのブラウザは動画再生に対応していません'
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
        brandFeatures: ['リスクアラート', '感情分析', '品質管理'],
        buttonText: '管理の詳細'
      }
    },
    
    // 業界ソリューション
    industries: {
      retail: {
        pageTitle: 'AI Agents for Retail',
        banner: {
          src: '/assets/images/retail/banner-jp.webp',
          mobileSrc: '/assets/images/retail/banner-mobile-jp.webp',
          alt: '小売業向けAIエージェント',
          link: '/contact'
        },
        cardGrid: {
          card1: {
            title: 'いつでもどこでも消費者とつながる',
            description: 'ブランドウェブサイト、アプリ、ソーシャルメディアなどのデジタルチャネルを通じて、消費者と24時間365日の接続を確立',
            button1Text: '詳細を見る',
            button1Link: '/contact',
            button2Text: 'デモのご予約',
            button2Link: '/contact'
          },
          card2: {
            title: 'パーソナライズされた顧客サービス',
            description: '消費者に正確でパーソナライズされたサービスを提供し、顧客体験を向上',
            button1Text: '詳細を見る',
            button1Link: '/contact',
            button2Text: 'デモのご予約',
            button2Link: '/contact'
          },
          card3: {
            title: '大量の顧客問い合わせに対応',
            description: '大量の顧客問い合わせを同時に処理し、販売シーズンやショッピングピークを簡単に対応',
            button1Text: '詳細を見る',
            button1Link: '/contact',
            button2Text: 'デモのご予約',
            button2Link: '/contact'
          }
        },
        alternatingTags: {
          title: 'コアビジネスシナリオ',
          subtitle: '消費者にライフサイクル全体のサービスを提供',
          items: [
            {
              icon: 'fas fa-shopping-bag',
              title: 'インテリジェントショッピングガイド',
              subtitle: '',
              description: '顧客の問い合わせ意図を正確に識別し、パーソナライズされた商品推奨とプロモーション情報を積極的に提供し、販売を促進し、購入転換率を向上',
              tags: ['意図認識', 'パーソナライズ推奨', 'プロモーション情報', '転換向上'],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/01-jp.webp',
              mediaAlt: 'インテリジェントショッピングガイド'
            },
            {
              icon: 'fas fa-clipboard-list',
              title: '注文管理',
              subtitle: '',
              description: '注文照会、返品・交換、物流追跡などの一般的な問い合わせを自動処理し、待機時間を短縮し、顧客満足度とショッピング体験を向上',
              tags: ['注文照会', '返品・交換処理', '物流追跡', '効率向上'],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/02-jp.webp',
              mediaAlt: '注文管理'
            },
            {
              icon: 'fas fa-tools',
              title: 'アフターサービス故障診断',
              subtitle: '',
              description: '顧客が製品の問題に遭遇した場合、画像や動画を組み合わせた多回対話を通じて問題を正確に識別し、顧客が独立して故障診断を完了できるよう導き、問題解決効率を向上',
              tags: ['故障識別', '多回対話', '画像・動画サポート', '問題解決'],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/03-jp.webp',
              mediaAlt: 'アフターサービス故障診断'
            },
            {
              icon: 'fas fa-wrench',
              title: '設置・修理とインテリジェントフォローアップ',
              subtitle: '',
              description: '顧客の修理、設置などのサービスニーズを自動識別し、作業チケットを生成して関連担当者に配信；サービス完了後、自動的に満足度調査を開始し、完全な顧客サービス閉ループを形成し、顧客体験を向上',
              tags: ['作業チケット生成', 'インテリジェント配信', '満足度調査', 'サービス閉ループ'],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/04-jp.webp',
              mediaAlt: '設置・修理とインテリジェントフォローアップ'
            }
          ]
        },
        alternatingList: {
          title: '',
          subtitle: '',
          items: [
            {
              title: '定量化された効果',
              subtitle: 'Every Investment is Quantifiable',
              features: [
                '投資対効果が明確',
                '一般的な顧客問題の90%を自動処理',
                'アフターサービス問題解決時間を60%短縮',
                '顧客満足度が92%+に向上',
                '平均購入転換率が30–40%向上'
              ],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              imagePath: '/assets/images/retail/05-jp.webp',
              imageAlt: '定量化された効果'
            }
          ]
        },
        quantifiedEffects: {
          title: '定量化された効果',
          subtitle: '',
          description: '',
          effects: [
            '投資収益率が明確に可視化',
            '顧客の一般的な問題を自動処理 90%',
            'アフターサービス問題解決時間短縮 60%',
            '顧客満足度向上 92%+',
            '平均購入転換率向上 30–40%'
          ],
          buttonText: '詳細を見る',
          buttonLink: '/contact',
          imageAlt: '定量化された効果',
          imageSrc: '/assets/images/retail/06-jp.webp'
        }
      },
      automotive: {
        banner: {
          src: '/assets/images/automotive/banner-jp.webp',
          mobileSrc: '/assets/images/automotive/banner-mobile-jp.webp',
          alt: '自動車製品バナー',
          link: '/contact'
        },
        alternatingList: {
          title: 'コアビジネスシナリオ',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-car',
              title: '試乗招待',
              description: '顧客の意図を正確に識別し、試乗転換を効率的に推進',
              features: [
                '顧客の関心事を敏感に捉え、モデル構成、価格、プロモーションなどの質問に迅速かつ正確に回答',
                '顧客の購入意図と利用可能な時間を自動識別し、顧客が試乗予約を完了できるよう導く',
                '顧客識別、相談回答からタスク配信まで、セールスフォローアップの全プロセス自動化を実現'
              ],
              businessValue: [
                '試乗招待転換率が35%+向上',
                '顧客満足度が95%に向上',
                '顧客応答時間が30%短縮'
              ],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              imagePath: '/assets/images/automotive/01-jp.webp',
              imageAlt: '試乗招待'
            },
            {
              icon: 'fas fa-headset',
              title: 'アフターサービスと顧客ケア',
              description: '顧客のニーズに迅速に対応し、ブランドロイヤルティを向上',
              features: [
                '人間のカスタマーサービスを待つことなく、メンテナンス/修理の進捗をリアルタイムで照会',
                'メンテナンスリマインダーやリコール通知を積極的に実施し、顧客満足度とロイヤルティを向上',
                '試乗/サービス後に自動的にフォローアップと満足度調査を実施し、改善フィードバックを収集'
              ],
              businessValue: [
                'アフターサービス問い合わせ応答時間が50%短縮',
                'アフターサービス満足度が25%+向上',
                '顧客維持率が20%+向上'
              ],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              imagePath: '/assets/images/automotive/02-jp.webp',
              imageAlt: 'アフターサービスと顧客ケア'
            }
          ]
        }
      },
      software: {
        banner: {
          src: '/assets/images/software/banner-jp.webp',
          mobileSrc: '/assets/images/software/banner-mobile-jp.webp',
          alt: 'ソフトウェア製品バナー',
          link: '/contact'
        },
        scenariosList: {
          title: 'コアビジネスシナリオ',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-user-check',
              title: 'セールス前リード生成',
              description: '高意欲顧客を自動識別し、重要な情報を効率的に収集し、リード転換率を向上',
              features: [
                '24時間対応、夜間や祝日もカバーし、秒級応答を提供',
                'オープンな対話で顧客の意図とリード生成意欲を正確に判断',
                '豊富な製品知識と強力な一般知識を活用し、高品質な専門的な回答を実現し、顧客の信頼を向上'
              ],
              effects: [
                '10% 問い合わせからリードへの転換率が40%に向上',
                '100 年間万人以上の人的コストを節約'
              ],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/01-jp.webp',
              imageAlt: 'セールス前リード生成'
            },
            {
              icon: 'fas fa-question-circle',
              title: 'ソフトウェア使用相談',
              description: 'ユーザーの疑問に迅速に対応し、ソフトウェア機能の使用を効率的に指導し、新規ユーザーの迅速な習得を支援',
              features: [
                'ユーザーの曖昧または不完全な質問を正確に理解し、特定の機能やインターフェース操作に迅速に位置づけ',
                '異なるバージョン、異なる権限、または個別設定の下で、文脈的に一貫した実行しやすい指導を提供'
              ],
              effects: [
                '独立対応率が62%に達する'
              ],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/02-jp.webp',
              imageAlt: 'ソフトウェア使用相談'
            },
            {
              icon: 'fas fa-tools',
              title: 'テクニカルサポート',
              description: '顧客と内部チーム向けに、アフターサービスや製品使用中に製品技術問題を自動的に回答し、トラブルシューティングガイダンスとチケットルーティングを提供し、サービス効率を向上',
              features: [
                '複雑な技術問題の意味表現と文脈依存を正確に識別し、ユーザーシナリオに適合する正確な回答を確保',
                'インテリジェントエージェント知識ベースに基づき、大規模モデル分析を通じて問題を迅速に位置づけ、包括的なソリューションを提供',
                '問題が解決できない場合、人間処理にスムーズにエスカレート'
              ],
              effects: [
                '精度が85%を超え、平均応答時間は3S以内',
                '独立対応率が20%から35%に向上'
              ],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/03-jp.webp',
              imageAlt: 'テクニカルサポート'
            }
          ]
        },
        casesList: {
          title: '応用事例と定量化された効果',
          subtitle: '',
          items: [
            {
              title: 'SaaS企業ウェブサイト無人カスタマーサービス',
              challenge: [
                '人間のカスタマーサービスは全時間帯をカバーできず、従来のフォームリード生成率が低い',
                '人間のカスタマーサービスの育成サイクルが長く、全量の製品専門知識を迅速かつ効果的にカバーできない'
              ],
              solution: 'Zenavaを展開し、ウェブサイトで独立作業し、製品機能紹介、業界事例、製品のハイライトなどを組み合わせて顧客に専門的な解釈を提供し、リードの予備スクリーニングと情報収集を自動的に実施',
              effects: [
                'セールス前対応を全時間帯でカバーし、ウェブサイトカスタマーサービスの無人化を実現',
                'リード生成率が46%に達し、人間のリード生成率を40%上回る'
              ],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/04-jp.webp',
              imageAlt: 'SaaS企業ウェブサイト無人カスタマーサービス'
            },
            {
              title: 'ソフトウェア会社内部テクニカルサポート',
              challenge: [
                '内部サポートプロセスが複雑で、システム機能の使用やシステム統合など、複数のポジションの協調サポートが必要'
              ],
              solution: 'Zenavaを展開し、製品操作ドキュメント、製品説明、テクニカルサポートFAQ、セールス前ソリューション文書を統合して知識ベースを構築し、セールス、セールス前、顧客、実装エンジニアからの質問に全時間帯で対応',
              effects: [
                '顧客側の従業員効率が15%~30%向上',
                'テクニカルサポートチームが内部サポート時間の40%を節約'
              ],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/05-jp.webp',
              imageAlt: 'ソフトウェア会社内部テクニカルサポート'
            }
          ]
        }
      },
      travel: {
        banner: {
          src: '/assets/images/travel/banner-jp.webp',
          mobileSrc: '/assets/images/travel/banner-mobile-jp.webp',
          alt: '旅行・ホテル製品バナー',
          link: '/contact'
        },
        alternatingTags: {
          title: 'コアビジネスシナリオ',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-hotel',
              title: 'ホテル・チケット予約',
              titleLink: '',
              subtitle: '',
              description: '顧客の意図を正確に理解し、部屋タイプ、時間、チケット情報の確認から予約完了までの全プロセスを独立して完全に実行し、顧客満足度と予約転換率を向上',
              tags: ['意図認識', '全プロセス自動化', '予約転換', '顧客満足度'],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/01-jp.webp',
              mediaAlt: 'ホテル・チケット予約'
            },
            {
              icon: 'fas fa-user-circle',
              title: 'アカウント管理',
              titleLink: '',
              subtitle: '',
              description: 'アカウントアクセス、ポイントプログラム、会員特典などに関する顧客の問い合わせに即座に対応し、一般的な問題をセルフサービスで処理し、平均処理時間を短縮し、会員ロイヤルティを向上',
              tags: ['即座の対応', 'セルフサービス', '会員管理', '効率向上'],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/02-jp.webp',
              mediaAlt: 'アカウント管理'
            },
            {
              icon: 'fas fa-life-ring',
              title: '旅行サポート',
              titleLink: '',
              subtitle: '',
              description: '荷物紛失、フライト乗り遅れ、チェックイン時間などの問題に関する顧客への即座の支援を提供し、応答時間を短縮し、顧客体験を向上',
              tags: ['即座の支援', '問題解決', '応答速度', '顧客体験'],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/03-jp.webp',
              mediaAlt: '旅行サポート'
            }
          ]
        },
        alternatingList: {
          title: '定量化された効果',
          subtitle: '',
          items: [
            {
              title: '定量化された効果',
              features: [
                '顧客満足度が30%向上',
                '運営コストが35%削減',
                '予約転換率が25%向上',
                '応答時間が70%短縮'
              ],
              buttonText: '詳細を見る',
              buttonLink: '/contact',
              imagePath: '/assets/images/travel/04-jp.webp',
              imageAlt: '定量化された効果'
            }
          ]
        },
        quantifiedEffects: {
          title: '定量化された効果',
          subtitle: '',
          description: '',
          effects: [
            '顧客満足度向上 30%',
            '運営コスト削減 35%',
            '予約転換率向上 25%',
            '応答時間短縮 70%'
          ],
          buttonText: '詳細を見る',
          buttonLink: '/contact',
          imageAlt: '定量化された効果',
          imageSrc: '/assets/images/travel/05-jp.webp'
        }
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

    // Contact Form Page - お問い合わせフォームページ
    contactForm: {
      title: 'お問い合わせ',
      subtitle: 'カスタムソリューションを取得',
      description: '私たちの専門コンサルタントがまもなくご連絡いたします。',
      firstName: '名',
      firstNamePlaceholder: '名を入力してください',
      lastName: '姓',
      lastNamePlaceholder: '姓を入力してください',
      jobTitle: '役職',
      jobTitlePlaceholder: '役職を入力してください',
      companyEmail: '会社メール',
      companyEmailPlaceholder: 'example@company.com',
      companyName: '会社名',
      companyNamePlaceholder: '会社名を入力してください',
      industry: '業界',
      selectIndustry: '選択してください',
      industryTech: 'テクノロジー',
      industryFinance: '金融',
      industryHealthcare: 'ヘルスケア',
      industryRetail: '小売',
      industryManufacturing: '製造業',
      industryEducation: '教育',
      industryOther: 'その他',
      privacyAgree: 'プライバシーポリシーに同意します',
      submit: '送信',
      submitting: '送信中...',
      privacyNotice: '送信をクリックすることで、お客様のデータが当社の',
      privacyLink: 'プライバシーポリシー',
      successMessage: 'ご提出ありがとうございます。アドバイザーがすぐにご連絡いたします。',
      errorMessage: '送信に失敗しました。もう一度お試しください。',
      downloadReady: 'ダウンロードの準備ができました',
      download: 'ダウンロード'
    },
    
    // リソースセンター
    resourcesCenter: {
      hero: {
        slides: [
          {
            image: '/assets/images/resources/hero-1.jpg',
            imageAlt: 'リソースセンターヒーロー画像',
            date: '2023年9月6日',
            title: 'エージェントがあり、Sierraで実行されます',
            description: '本日、Greenoaksが主導する追加資本3億5000万ドルを100億ドルの評価で調達したことを発表します。GreenoaksはSierraへの投資を倍増しています。',
            buttonText: '詳細を見る',
            link: '/contact'
          },
          {
            image: '/assets/images/resources/hero-2.jpg',
            imageAlt: 'リソースセンターヒーロー画像2',
            date: '2023年9月5日',
            title: 'AI駆動のカスタマーサービス革命',
            description: 'Zenava AIがインテリジェントエージェントでカスタマーサービスをどのように変革しているかを発見。リアルタイムで理解、学習、適応します。',
            buttonText: '詳細を見る',
            link: '/contact'
          },
          {
            image: '/assets/images/resources/hero-3.jpg',
            imageAlt: 'リソースセンターヒーロー画像3',
            date: '2023年9月4日',
            title: '現代企業向けエンタープライズAIソリューション',
            description: 'エンタープライズ規模向けに設計された包括的なAIプラットフォームを探索し、企業のデジタル変革を支援します。',
            buttonText: '詳細を見る',
            link: '/contact'
          }
        ]
      }
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
    
    // Other Resources Section
    otherResources: {
      title: 'リソースセンター',
      cards: {
        voiceConnectivity: {
          title: '音声接続',
          learnMore: '詳細を見る',
          bookDemo: 'デモを予約'
        },
        liveChat: {
          title: 'ライブチャット',
          learnMore: '詳細を見る',
          bookDemo: 'デモを予約'
        }
      }
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

    // AI Agents Page
    products: {
      aiAgents: {
        banner: {
          src: '/assets/images/ai-agents/banner-jp.webp',
          mobileSrc: '/assets/images/ai-agents/banner-mobile-jp.webp',
          alt: 'AI Agents Banner'
        },
        hero: {
          title: 'ZENAVAは、反復的で高頻度、プロセスが明確な顧客対応タスクの80%を独立して処理します',
          subtitle: '従来のカスタマーサービスにおける人的規模への依存を大幅に削減し、顧客体験の飛躍的な向上を実現します',
          button: '相談を予約'
        },
        advantages: {
          title: 'ZENAVAの強み',
          card1: {
            title: '対話力',
            subtitle: '人間のようなコミュニケーション',
            desc: 'マルチモーダル理解、感情認識、高度な人間化インタラクション能力を備え、人間を超えるコミュニケーション体験を提供します'
          },
          card2: {
            title: '実行力',
            subtitle: 'ビジネスループを独立して完結',
            desc: 'ビジネスプロセスを直接駆動し、SMS送信、チケット作成、顧客情報の照会、アポイント通知などのタスクを完了します'
          },
          card3: {
            title: '迅速な導入',
            subtitle: '使うほどに賢く',
            desc: 'すぐに使用可能、迅速にデプロイして「稼働」開始、内蔵のトレーニングプロセスにより問題に遭遇した際にエラーを自己修正し、使用するほどに賢くなります'
          },
          card4: {
            title: '定量化可能な価値',
            subtitle: 'AIへの投資のすべてを明確に可視化',
            desc: '価値は定量化可能で、純粋で破壊的なコスト構造の再構築を実現し、単位サービスコスト（CPC）を約20%削減します'
          }
        },
        features: {
          title: 'コア機能',
          subtitle: '',
          voice: {
            label: 'Voice Agents',
            title: '人間を超える音声対話体験',
            subtitle: '',
            list: [
              '人間のような声色：感情と表現力に富んだ声で、人間を超えるコミュニケーション体験を提供',
              '低遅延インタラクション：迅速な応答、リアルタイム対話でラグなし',
              '精密なインテリジェント割り込み：いつでも割り込みや発言が可能で、人間との対面会話のように自然',
              '完全なビジネスループ、サービス効率と顧客体験を大幅に向上'
            ],
            button: 'Voice Agents機能の詳細',
            image: {
              src: '/assets/images/ai-agents/voice-jp.webp',
              alt: 'Voice機能デモ - 人間を超える音声対話体験'
            }
          },
          messaging: {
            label: 'Live Chat',
            title: '究極のカスタマーサービス体験を創出',
            subtitle: '',
            list: [
              '7x24時間オムニチャネルオンライン、お客様とのすべてのコミュニケーションを見逃さない',
              'テキスト、画像、動画などのリッチメディアコミュニケーションをサポートし、お客様の意図を正確に識別',
              '表現からお客様の感情を感知し、友好的で尊重ある方法で応答',
              '究極のカスタマーサービス体験を創出し、柔軟にお客様のニーズに対応',
              '共感力と判断力を備え、完全なビジネスプロセスループを推進'
            ],
            button: 'Live Chat機能の詳細',
            image: {
              src: '/assets/images/ai-agents/person-jp.webp',
              alt: 'インスタントメッセージ機能デモ - 究極のカスタマーサービス体験を創出'
            }
          }
        },
        resources: {
          title: 'リソースセンター',
          card1: {
            tag: '製品',
            title: '進化し続けるAI生産性の構築'
          },
          card2: {
            tag: '業界レポート',
            title: '進化し続けるAI生産性の構築'
          },
          card3: {
            tag: '教育',
            title: '進化し続けるAI生産性の構築'
          },
          card4: {
            tag: '記事',
            title: '進化し続けるAI生産性の構築'
          }
        },
        cta: {
          title: 'インテリジェント対話の新たな章を開く',
          subtitle: 'Zenava AIが企業の顧客対話シナリオのインテリジェントなアップグレードを支援します',
          button: 'お問い合わせ'
        }
      },
      voiceAgents: {
        banner: {
          src: '/assets/images/voice-agents/banner-jp.webp',
          mobileSrc: '/assets/images/voice-agents/banner-mobile-jp.webp',
          imageAlt: 'VoiceAgents製品バナー - 人間を超える音声対話体験'
        },
        coreFeatures: {
          title: 'コア能力',
          subtitle: '',
          feature1: {
            title: '人間らしい音色',
            subtitle: '本物の人間のようなコミュニケーション',
            description: '自然で滑らかな音声インタラクション、豊かな感情、複数の音色とトーンスタイルを備え、ユーザーの個性化されたニーズに対応。シナリオに応じて思いやり、理解、プロフェッショナリズムを表現し、本物の人間を超えるコミュニケーション体験を提供します',
            tags: ['自然な流れ', '豊かな感情', '複数の音色', 'パーソナライズ'],
            button: '詳細を見る',
            mediaAlt: '人間らしい音色機能デモ',
            mediaPath: '/assets/images/voice-agents/humanized-voice-jp.webp'
          },
          feature2: {
            title: '低遅延インタラクション',
            subtitle: 'リアルタイム応答、待ち時間なし',
            description: 'ミリ秒レベルの応答速度、リアルタイム対話でラグなし、より自然なインタラクションを実現。顧客からの問い合わせ、業務処理、クレーム処理など、Zenavaは迅速に応答します',
            tags: ['ミリ秒応答', 'リアルタイム対話', 'シームレス移行', '効率的な流れ'],
            button: '詳細を見る',
            mediaAlt: '低遅延インタラクション機能デモ',
            mediaPath: '/assets/images/voice-agents/low-latency-jp.webp'
          },
          feature3: {
            title: '精密なインテリジェント割り込み',
            subtitle: 'ユーザーの真の意図を理解',
            description: 'ユーザーがいつでも割り込みや発言ができ、中断なくリアルタイムで応答し、対面会話のように自然で柔軟です',
            tags: ['スマート割り込み', '意図認識', '自然な対話', 'リアルタイム応答'],
            button: '詳細を見る',
            mediaAlt: '精密なインテリジェント割り込み機能デモ',
            mediaPath: '/assets/images/voice-agents/intelligent-interruption-jp.webp'
          },
          feature4: {
            title: '完全なビジネスループ',
            subtitle: 'エンドツーエンドのビジネス自動化',
            description: 'Zenavaはチケット作成、通知送信、情報照会などのタスクを直接実行でき、会話を実行可能なビジネスアクションに変換します',
            tags: ['タスク実行', 'ビジネス自動化', 'チケット作成', '情報照会'],
            button: '詳細を見る',
            mediaAlt: '完全なビジネスループ機能デモ',
            mediaPath: '/assets/images/voice-agents/business-loop-jp.webp'
          }
        },
        customerCases: {
          title: '応用と定量化効果',
          subtitle: '',
          case1: {
            tag: '厨房電気業界',
            title: '厨房電気顧客が大規模カスタマーサービス自動化を実現、年間総コスト削減525万元',
            subtitle: '年間コスト削減525万元',
            description: 'Zenavaは製品問い合わせ、修理、注文照会などの大量の反復的な問い合わせを独立して処理し、35人のコールセンターエージェントの作業量を代替',
            features: [
              '年間コスト削減約525万元',
              'プロジェクトROIは425%に達する'
            ],
            button: '詳細を見る',
            imageAlt: '厨房電気顧客サービス自動化ケース',
            imageSrc: '/assets/images/voice-agents/case-kitchen-appliances-jp.webp'
          },
          case2: {
            tag: '自動車業界',
            title: '自動車顧客がZenavaで試乗招待を管理、コンバージョン率85%に向上',
            subtitle: 'コンバージョン率85%',
            description: 'Zenavaは顧客リードを自動的に選別し、音声インタラクションを通じて有効な顧客をタイムリーにスクリーニングし、高意向顧客を試乗に招待',
            features: [
              '潜在顧客のフォローアップ効率を向上させ、リードコンバージョン率を高め、売上成長を促進',
              '招待コンバージョン率85%に向上'
            ],
            button: '詳細を見る',
            imageAlt: '自動車顧客試乗招待ケース',
            imageSrc: '/assets/images/voice-agents/case-automotive-jp.webp'
          },
          case3: {
            tag: 'ホテル業界',
            title: 'ホテルグループが予約プロセスを無人化、予約コンバージョン率を大幅向上',
            subtitle: '予約コンバージョン率15%-25%向上',
            description: 'Zenavaは予約ニーズの理解、時間と部屋タイプの確認から予約完了までの全プロセスを独立して完了',
            features: [
              '多言語コミュニケーションをサポートし、グローバル顧客をカバー',
              '予約コンバージョン率15%-25%向上'
            ],
            button: '詳細を見る',
            imageAlt: 'ホテルグループ予約自動化ケース',
            imageSrc: '/assets/images/voice-agents/case-hotel-jp.webp'
          }
        }
      },
      liveChat: {
        banner: {
          src: '/assets/images/livechat/banner-jp.webp',
          mobileSrc: '/assets/images/livechat/banner-mobile-jp.webp',
          alt: 'LiveChat Banner'
        },
        advantages: {
          title: 'LiveChatの強み',
          card1: {
            title: 'リアルタイム応答',
            subtitle: '秒単位で顧客に返信',
            desc: '7x24時間オンライン、インテリジェントなルーティング割り当てにより、顧客の問題が迅速に応答され処理されます'
          },
          card2: {
            title: 'マルチチャネルサポート',
            subtitle: 'すべてのチャネルを統一管理',
            desc: 'ウェブサイト、モバイル、ソーシャルメディアなど複数のチャネルをサポートし、顧客対話を統一管理し、サービス効率を向上させます'
          },
          card3: {
            title: 'インテリジェント分析',
            subtitle: 'データ駆動型最適化',
            desc: '顧客対話データをリアルタイムで分析し、一般的な問題を特定し、サービスプロセスを最適化し、顧客満足度を向上させます'
          }
        },
        features: {},
        caseStudies: {
          title: '応用と定量化効果',
          subtitle: '',
          case1: {
            mainTitle: 'B2B企業公式サイト無人カスタマーサービス、リード獲得率46%',
            highlight: 'リード獲得率46%',
            description: 'Zenavaは公式サイトで顧客を独立して受け入れ、リードの予備スクリーニングと情報収集を自動的に実行します',
            points: [
              '全時間帯で販売前受付をカバーし、公式サイトのカスタマーサービスを無人化します',
              'リード獲得率は46%と高く、手動リード獲得率40%を上回ります',
              '製品ビジネス知識を分単位で更新し、サービスの正確性と専門性を確保します'
            ],
            metric: '46%',
            metricLabel: 'リード獲得率',
            imageSrc: '/assets/images/livechat/case1-b2b-jp.webp',
            imageAlt: 'B2B企業公式サイト無人カスタマーサービス',
            button: '詳細を見る',
            buttonLink: '/products/live-chat'
          },
          case2: {
            mainTitle: 'スマートロック顧客のエンドツーエンドアフターサービス自動化、年間総コスト削減621万元',
            highlight: '年間総コスト削減621万元',
            description: 'Zenavaはマルチターン対話と画像を組み合わせて正確に識別し、スマートロックのトラブルシューティングを独立して完了します',
            points: [
              '独立受付率は83%に達します',
              '年間総コスト削減621万元'
            ],
            metric: '621万',
            metricLabel: '年間コスト削減',
            metric2: '83%',
            metric2Label: '独立受付率',
            imageSrc: '/assets/images/livechat/case2-smartlock-jp.webp',
            imageAlt: 'スマートロック顧客のエンドツーエンドアフターサービス自動化',
            button: '詳細を見る',
            buttonLink: '/products/live-chat'
          }
        },
        section3: {
          title: 'AI Agents for Chat',
          subtitle: '',
          item1: {
            mainTitle: '7×24時間オムニチャネルオンライン',
            subtitle: '顧客とのコミュニケーションを逃さない',
            description: 'Zenavaは、顧客が選択したチャネルで7×24時間リアルタイムにコミュニケーションを取ることができます。ウェブページ、アプリ、ソーシャルメディア、メッセージアプリなど、企業は顧客の待機やビジネス機会の喪失を心配する必要がなく、顧客満足度とリテンション率を大幅に向上させます',
            buttonText: '詳細を見る',
            imageAlt: '7×24時間オムニチャネルオンライン',
            imageSrc: '/assets/images/livechat/omnichannel-jp.webp'
          },
          item2: {
            mainTitle: 'テキスト、画像、動画などのリッチメディアコミュニケーションをサポート',
            subtitle: '顧客の意図を正確に識別',
            description: 'Zenavaはテキストだけでなく、画像、動画など多様な形式の情報を理解でき、豊かな対話体験を提供し、複雑なマルチターン対話情報収集を実現し、顧客の意図を正確に識別し、顧客の問題を効率的に処理します',
            buttonText: '詳細を見る',
            imageAlt: 'リッチメディアコミュニケーション',
            imageSrc: '/assets/images/livechat/rich-media-jp.webp'
          },
          item3: {
            mainTitle: '表現から顧客の感情を感知',
            subtitle: '友好的で尊重ある方法で応答',
            description: 'Zenavaは性格モデリングを通じて言語理解と感情認識能力を備えており、表現から感情を識別し、友好的で尊重ある方法で応答することで、顧客に心のこもった専門的なサービス体験を提供します',
            buttonText: '詳細を見る',
            imageAlt: '感情感知',
            imageSrc: '/assets/images/livechat/emotion-jp.webp'
          },
          item4: {
            mainTitle: '究極のカスタマーサービス体験を創出',
            subtitle: '顧客のニーズに柔軟に対応',
            description: '企業のビジネス基盤とブランド規範を遵守する前提で、Zenavaは顧客の個別ニーズに柔軟に対応でき、企業は安全性とコンプライアンスを確保しながら顧客体験を向上させることができます',
            buttonText: '詳細を見る',
            imageAlt: 'ビジネスと体験の両立',
            imageSrc: '/assets/images/livechat/balance-jp.webp'
          },
          item5: {
            mainTitle: '共感力と判断力を備える',
            subtitle: 'ビジネスプロセス全体の閉環を推進',
            description: 'Zenavaは共感力と判断力を備えており、実際のビジネスシナリオでは、人間の従業員のようにツールを使用して、SMS送信、チケット作成、顧客データの照会、招待通知などのタスクを完了し、ビジネス閉環を実現します',
            buttonText: '詳細を見る',
            imageAlt: '共感力と判断力',
            imageSrc: '/assets/images/livechat/empathy-jp.webp'
          }
        }
      }
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
    },

    // Banner 轮播翻译
    banners: {
      slide1: {
        siteName: 'ZENAVA',
        mainTitle: '企業向けAI会話ソリューション',
        description: 'インテリジェントなAIアシスタントでカスタマーサービスを変革し、顧客体験を向上させ、運用コストを削減',
        buttonText: '相談を予約',
        imageAlt: 'バナー画像1',
        src: '/assets/images/banners/slide1-jp.webp',
        mobileSrc: '/assets/images/banners/slide1-mobile-jp.webp'
      },
      slide2: {
        siteName: 'ZENAVA Sales',
        mainTitle: 'インテリジェント営業支援システム',
        description: 'AI駆動のインテリジェント営業プラットフォーム、正確な顧客プロファイル分析、インテリジェントな営業戦略の推奨、成約率を向上させ、営業サイクルを短縮',
        buttonText: '営業ソリューションの詳細',
        imageAlt: 'インテリジェント営業システムインターフェース',
        src: '/assets/images/banners/slide2-jp.webp',
        mobileSrc: '/assets/images/banners/slide2-mobile-jp.webp'
      },
      slide3: {
        siteName: 'インテリジェントAIプラットフォーム',
        mainTitle: '4345323',
        description: '43244444444',
        buttonText: '相談を予約',
        imageAlt: 'インテリジェントAIプラットフォームディスプレイ',
        src: '/assets/images/banners/slide3-jp.webp',
        mobileSrc: '/assets/images/banners/slide3-mobile-jp.webp'
      },
      slide4: {
        siteName: 'ZENAVA',
        mainTitle: '7x24スマートカスタマーサービス',
        description: 'AIスマートカスタマーサービスシステムは24時間365日のサービスを実現し、よくある質問を自動処理し、感情認識で体験を向上',
        buttonText: '詳細を見る',
        imageAlt: 'スマートカスタマーサービス',
        src: '/assets/images/banners/slide4-jp.webp',
        mobileSrc: '/assets/images/banners/slide4-mobile-jp.webp'
      },
      slide5: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: 'マーケティングキャンペーンバナー',
        src: '/assets/images/banners/slide5-jp.webp',
        mobileSrc: '/assets/images/banners/slide5-mobile-jp.webp'
      },
      slide6: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: 'マーケティングキャンペーンバナー',
        src: '/assets/images/banner-full-marketing-jp.webp',
        mobileSrc: '/assets/images/banner-full-marketing-mobile-jp.webp'
      }
    },
    
    // Common images and texts
    common: {
      logo: {
        src: '/assets/images/common/logo-jp.webp',
        alt: 'Zenava Logo'
      },
      noImage: '画像なし'
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
      title: 'Zenava能為企業帶來什麼',
      subtitle: '讓企業隨時隨地高效服務客戶，打造卓越客戶體驗，降低服務成本',
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
      },
      // 核心能力版塊 - Alternating-Text-Media-List 格式
      capabilities: {
        item1: {
          title: '即時響應，快速解決客戶問題',
          list: [
            '為企業提供 7×24 小時即時響應服務',
            '支持在網站、APP、WHATSAPP、LINE、Facebook等數字渠道與客戶以語音、文本消息的方式互動，快速響應客戶，解決客戶問題',
            '降低等待時間、減少人工成本，提升客戶滿意度'
          ],
          button: '了解更多',
          imageAlt: '即時響應服務'
        },
        item2: {
          title: '媲美真人的自然溝通體驗，更值得信賴',
          list: [
            '能聽懂語音，理解文字、圖片、視頻等多種形態信息，精準解決客戶問題',
            '支持複雜多輪對話信息收集，能拆解複雜需求，處理複雜問題',
            '具備情緒感知能力，耐心、有溫度，通過媲美真人的自然溝通體驗，提升客戶忠誠度'
          ],
          button: '了解更多',
          imageAlt: '自然溝通體驗'
        },
        item3: {
          title: '客戶服務自動化，實現真正的端到端閉環',
          list: [
            '能夠獨立處理80%重複性、高頻次、流程清晰的客戶聯絡任務',
            '實現從意圖識別 → 任務執行 → 反饋結果的端到端自動化閉環，在特定任務中可完全取代人力'
          ],
          button: '了解更多',
          imageAlt: '客戶服務自動化'
        },
        item4: {
          title: '智能引導訪客留資，提升客戶轉化率',
          list: [
            '精準識別客戶意圖，深入挖掘客戶需求，提供專業回應，促進成交',
            '主動追問、澄清關鍵信息，引導客戶留資，自動化收集線索，提升客戶轉化率'
          ],
          button: '了解更多',
          imageAlt: '智能引導訪客留資'
        },
        item5: {
          title: '效果可量化，讓AI價值看得見',
          list: [
            '重構企業成本結構，服務成本降低約20%',
            '企業降本增效的首選'
          ],
          button: '了解更多',
          imageAlt: '效果可量化'
        }
      }
    },
    
    // Scenarios/Solutions
    scenarios: {
      marketing: {
        title: '市場營銷自動化',
        subtitle: '提升轉化率，降低獲客成本',
        description: '實時識別客戶意圖，統一話術留資，智能分配高潛線索。基於會話分析反哺營銷策略',
        features: [
          '意圖識別',
          '智能留資',
          '多渠道整合',
          '預測分析'
        ],
        section3: {
          mainTitle: 'AI驅動的營銷自動化',
          subtitle: '智能獲客，精準轉化',
          description: '通過AI智能獲客識別',
          tag1: '智能識別',
          tag2: '實時優化',
          buttonText: '了解更多營銷自動化',
          imageAlt: '實體圖片'
        }
      },
      sales: {
        title: '銷售賦能',
        subtitle: '縮短成交週期，提升成交率',
        description: '實時話術推薦，競品知識調用，最佳實踐建議。AI輔助成交策略，驗證轉化提升',
        features: [
          '話術推薦',
          '競品分析',
          '智能成交輔助',
          '業績分析'
        ],
        featureShort: ['話術推薦', '競品分析', '智能成交'],
        buttonText: '了解更多智能銷售'
      },
      customerService: {
        title: '客戶服務',
        subtitle: '更快、更準、更有溫度',
        description: '全天候智能響應，複雜問題智能分流，情緒感知互動。知識庫聯動快速解決問題',
        features: [
          '24/7響應',
          '情緒識別',
          '智能工單',
          '知識管理'
        ],
        buttonText: '了解更多客戶服務'
      },
      internalService: {
        title: '內部運營',
        subtitle: '多層級組織高效管理',
        description: '統一服務入口處理設備、庫存、培訓事務。智能派單與進度追蹤，優化運營效率',
        features: [
          '統一入口',
          '智能派單',
          '數據分析',
          '流程自動化'
        ],
        buttonText: '了解更多內部服務',
        videoError: '您的瀏覽器不支持視頻播放'
      },
      management: {
        title: '管理優化',
        subtitle: '客戶聲音驅動產品創新',
        description: '從對話中提取產品洞察，量化反饋趨勢，建立客戶聲音到產品迭代閉環',
        features: [
          '洞察挖掘',
          '需求提取',
          '迭代閉環',
          '趨勢分析'
        ],
        brandFeatures: ['風險預警', '情緒分析', '品質控制'],
        buttonText: '了解更多管理優化'
      }
    },
    
    // 行業解決方案
    industries: {
      retail: {
        pageTitle: 'AI Agents for Retail',
        banner: {
          src: '/assets/images/retail/banner-hk.webp',
          mobileSrc: '/assets/images/retail/banner-mobile-hk.webp',
          alt: '零售行業Banner圖',
          link: '/contact'
        },
        cardGrid: {
          card1: {
            title: '隨時隨地連接消費者',
            description: '在品牌網站、APP、社交媒體等數字渠道與消費者建立全天候聯繫',
            button1Text: '了解更多',
            button1Link: '/contact',
            button2Text: '預約演示',
            button2Link: '/contact'
          },
          card2: {
            title: '個性化客戶服務',
            description: '為消費者提供精準、個性化服務，提升客戶體驗',
            button1Text: '了解更多',
            button1Link: '/contact',
            button2Text: '預約演示',
            button2Link: '/contact'
          },
          card3: {
            title: '承接海量客戶諮詢',
            description: '可同時處理大量客戶諮詢，輕鬆應對銷售旺季和購物高峰',
            button1Text: '了解更多',
            button1Link: '/contact',
            button2Text: '預約演示',
            button2Link: '/contact'
          }
        },
        alternatingTags: {
          title: '核心業務場景',
          subtitle: '為消費者提供全生命週期服務',
          items: [
            {
              icon: 'fas fa-shopping-bag',
              title: '智能導購',
              subtitle: '',
              description: '精準識別客戶諮詢意圖，主動提供個性化商品推薦與優惠信息，促進銷售，提升購買轉化率。',
              tags: ['意圖識別', '個性化推薦', '優惠信息', '轉化提升'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/01-hk.webp',
              mediaAlt: '智能導購'
            },
            {
              icon: 'fas fa-clipboard-list',
              title: '訂單管理',
              subtitle: '',
              description: '自動處理訂單查詢、退換貨、物流追蹤等常見問題，減少等待時間，提高客戶滿意度和購物體驗。',
              tags: ['訂單查詢', '退換貨處理', '物流追蹤', '效率提升'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/02-hk.webp',
              mediaAlt: '訂單管理'
            },
            {
              icon: 'fas fa-tools',
              title: '售後故障排查',
              subtitle: '',
              description: '當客戶遇到產品故障問題時，通過多輪對話結合圖片或視頻，精準識別故障，獨立引導客戶完成故障排查，提高問題解決效率',
              tags: ['故障識別', '多輪對話', '圖片視頻支持', '問題解決'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/03-hk.webp',
              mediaAlt: '售後故障排查'
            },
            {
              icon: 'fas fa-wrench',
              title: '報裝報修與智能回訪',
              subtitle: '',
              description: '自動識別客戶報修、安裝等服務需求，生成工單並派發至對應人員；服務完成後自動發起滿意度回訪，形成完整客戶服務閉環，提升客戶體驗。',
              tags: ['工單生成', '智能派發', '滿意度回訪', '服務閉環'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/04-hk.webp',
              mediaAlt: '報裝報修與智能回訪'
            }
          ]
        },
        alternatingList: {
          title: '',
          subtitle: '',
          items: [
            {
              title: '量化效果',
              subtitle: 'Every Investment is Quantifiable',
              features: [
                '投資回報清晰可見',
                '自動處理90%客戶常見問題',
                '售後問題解決時長縮短 60%',
                '客戶滿意度提升至 92%+',
                '平均購買轉化率提升 30–40%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/retail/05-hk.webp',
              imageAlt: '量化效果'
            }
          ]
        },
        quantifiedEffects: {
          title: '量化效果',
          subtitle: '',
          description: '',
          effects: [
            '投資回報清晰可見',
            '自動處理 90% 客戶常見問題',
            '售後問題解決時長縮短 60%',
            '客戶滿意度提升至 92%+',
            '平均購買轉化率提升 30–40%'
          ],
          buttonText: '了解更多',
          buttonLink: '/contact',
          imageAlt: '量化效果',
          imageSrc: '/assets/images/retail/06-hk.webp'
        }
      },
      automotive: {
        banner: {
          src: '/assets/images/automotive/banner-hk.webp',
          mobileSrc: '/assets/images/automotive/banner-mobile-hk.webp',
          alt: '汽車產品Banner圖',
          link: '/contact'
        },
        alternatingList: {
          title: '核心業務場景',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-car',
              title: '試駕邀約',
              description: '精準識別客戶意圖，高效推動試駕轉化',
              features: [
                '敏銳捕捉客戶關注點，快速精準解答車型配置、價格、優惠等問題',
                '自動識別客戶購車意圖與可用時間，引導客戶完成試駕預約',
                '從客戶識別、諮詢解答到任務派發，實現銷售跟單全流程自動化'
              ],
              businessValue: [
                '試駕邀約轉化率提升 35%+',
                '客戶滿意度提升至95%',
                '客戶響應時長縮短 30%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/automotive/01-hk.webp',
              imageAlt: '試駕邀約'
            },
            {
              icon: 'fas fa-headset',
              title: '售後服務與客戶關懷',
              description: '快速響應客戶需求，提升品牌忠誠度',
              features: [
                '提供維保/維修進度實時查詢，無需等待人工客服',
                '主動進行保養提醒與召回通知等，提升客戶滿意度與忠誠度',
                '試駕/服務後自動回訪與滿意度調查，收集改進意見'
              ],
              businessValue: [
                '售後諮詢響應時間縮短 50%',
                '售後滿意度提升 25%+',
                '客戶留存率提升 20%+'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/automotive/02-hk.webp',
              imageAlt: '售後服務與客戶關懷'
            }
          ]
        }
      },
      software: {
        banner: {
          src: '/assets/images/software/banner-hk.webp',
          mobileSrc: '/assets/images/software/banner-mobile-hk.webp',
          alt: '軟件產品Banner圖',
          link: '/contact'
        },
        scenariosList: {
          title: '核心業務場景',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-user-check',
              title: '售前留資',
              description: '自動識別高意向客戶，高效收集關鍵信息，提升線索轉化率',
              features: [
                '24小時接待，覆蓋夜間及節假日，提供秒級響應',
                '在開放式對話中精準判斷客戶意向與留資意願',
                '利用豐富產品知識與強大通識能力，實現高質量專業解答，提升客戶信任度'
              ],
              effects: [
                '諮詢到線索的轉化率從10%提升至 40%',
                '每年節省超100萬人力成本'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/01-hk.webp',
              imageAlt: '售前留資'
            },
            {
              icon: 'fas fa-question-circle',
              title: '軟件使用諮詢',
              description: '快速響應用戶疑問，高效指導用戶使用軟件功能，幫助新用戶快速上手',
              features: [
                '精準理解用戶模糊或不完整提問，快速定位到具體功能或界面操作',
                '在不同版本、不同權限或個性化配置下，提供上下文一致、易於執行的指導'
              ],
              effects: [
                '獨立接待率達到62%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/02-hk.webp',
              imageAlt: '軟件使用諮詢'
            },
            {
              icon: 'fas fa-tools',
              title: '技術支持',
              description: '面向客戶與內部團隊，在售後或產品使用過程中，自動化解答產品技術問題，提供排障指導和工單分流，提升服務效率',
              features: [
                '準確識別複雜技術問題的語義表達與上下文依賴，確保答案精準且符合用戶場景',
                '基於智能體知識庫，通過大模型分析快速定位問題，提供綜合性解決方案',
                '無法解決問題時，平滑升級至人工處理'
              ],
              effects: [
                '準確率超85%，平均響應時間3S內',
                '獨立接待率從20%提升至35%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/03-hk.webp',
              imageAlt: '技術支持'
            }
          ]
        },
        casesList: {
          title: '應用案例與量化效果',
          subtitle: '',
          items: [
            {
              title: 'SaaS企業官網客服無人化接待',
              challenge: [
                '人工客服接待無法全時段覆蓋，傳統表單留資率低',
                '人工客服培養週期長，無法快速有效覆蓋全量的產品專業知識'
              ],
              solution: '部署Zenava，在官網獨立作業，結合產品功能介紹、行業案例、產品亮點等為客戶提供專業解讀，自動進行線索的初步篩選和信息收集',
              effects: [
                '全時段覆蓋售前接待，實現官網客服無人化值守',
                '留資率高達46%，超過人工留資率40%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/04-hk.webp',
              imageAlt: 'SaaS企業官網客服無人化接待'
            },
            {
              title: '軟件公司內部技術支持',
              challenge: [
                '內部支持流程複雜，如系統功能使用、系統對接等需要多個崗位協同支持'
              ],
              solution: '部署 Zenava，融合產品操作文檔、產品說明、技術支持常見問題、售前解決方案文檔構建知識庫，全時段覆蓋銷售、售前、客戶、實施工程師的問題諮詢',
              effects: [
                '對客側員工效率提升15%~30%',
                '技術支持團隊節省40%的內部支撐時間'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/05-hk.webp',
              imageAlt: '軟件公司內部技術支持'
            }
          ]
        }
      },
      travel: {
        banner: {
          src: '/assets/images/travel/banner-hk.webp',
          mobileSrc: '/assets/images/travel/banner-mobile-hk.webp',
          alt: '旅遊產品Banner圖',
          link: '/contact'
        },
        alternatingTags: {
          title: '核心業務場景',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-hotel',
              title: '酒店與票務預訂',
              titleLink: '',
              subtitle: '',
              description: '準確理解客戶意圖，獨立完整執行從確認房型、時間、票務信息等到完成預訂全流程，提升客戶滿意度與預訂轉化率。',
              tags: ['意圖識別', '全流程自動化', '預訂轉化', '客戶滿意度'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/01-hk.webp',
              mediaAlt: '酒店與票務預訂'
            },
            {
              icon: 'fas fa-user-circle',
              title: '賬戶管理',
              titleLink: '',
              subtitle: '',
              description: '即時響應客戶關於賬戶訪問、積分計劃、會員權益等的諮詢，自助處理常見問題，縮短平均處理時長，提高會員忠誠度。',
              tags: ['即時響應', '自助服務', '會員管理', '效率提升'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/02-hk.webp',
              mediaAlt: '賬戶管理'
            },
            {
              icon: 'fas fa-life-ring',
              title: '旅行支持',
              titleLink: '',
              subtitle: '',
              description: '為客戶提供關於行李丟失、錯過航班或入住時間等問題的即時幫助，縮短響應時間，提升客戶體驗。',
              tags: ['即時幫助', '問題解決', '響應速度', '客戶體驗'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/03-hk.webp',
              mediaAlt: '旅行支持'
            }
          ]
        },
        alternatingList: {
          title: '量化效果',
          subtitle: '',
          items: [
            {
              title: '量化效果',
              features: [
                '客戶滿意度提升 30%',
                '運營成本降低 35%',
                '預訂轉化率提升 25%',
                '響應時間縮短 70%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/travel/04-hk.webp',
              imageAlt: '量化效果'
            }
          ]
        },
        quantifiedEffects: {
          title: '量化效果',
          subtitle: '',
          description: '',
          effects: [
            '客戶滿意度提升 30%',
            '運營成本降低 35%',
            '預訂轉化率提升 25%',
            '響應時間縮短 70%'
          ],
          buttonText: '了解更多',
          buttonLink: '/contact',
          imageAlt: '量化效果',
          imageSrc: '/assets/images/travel/05-hk.webp'
        }
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

    // Contact Form Page - 聯繫表單頁面
    contactForm: {
      title: '聯繫我們',
      subtitle: '獲取專屬解決方案',
      description: '我們的專業顧問將盡快與您聯繫。',
      firstName: '名',
      firstNamePlaceholder: '請輸入您的名',
      lastName: '姓',
      lastNamePlaceholder: '請輸入您的姓',
      jobTitle: '職位',
      jobTitlePlaceholder: '請輸入您的職位',
      companyEmail: '企業郵箱',
      companyEmailPlaceholder: 'example@company.com',
      companyName: '公司名稱',
      companyNamePlaceholder: '請輸入公司名稱',
      industry: '行業',
      selectIndustry: '請選擇行業',
      industryTech: '科技',
      industryFinance: '金融',
      industryHealthcare: '醫療',
      industryRetail: '零售',
      industryManufacturing: '製造業',
      industryEducation: '教育',
      industryOther: '其他',
      privacyAgree: '我同意隱私政策',
      submit: '提交',
      submitting: '提交中...',
      privacyNotice: '點擊提交即表示您同意我們按照',
      privacyLink: '隱私政策',
      successMessage: '感謝您的提交，我們的顧問將盡快與您聯繫。',
      errorMessage: '提交失敗，請重試。',
      downloadReady: '您的下載已準備就緒',
      download: '下載'
    },
    
    // 資源中心頁面
    resourcesCenter: {
      hero: {
        slides: [
          {
            image: '/assets/images/resources/hero-1.jpg',
            imageAlt: '資源中心Hero圖片',
            date: '2023年9月6日',
            title: '有一個代理，它在Sierra上運行',
            description: '今天，我們宣布在Greenoaks的領導下，我們以100億美元的估值籌集了3.5億美元的額外資本，Greenoaks正在加倍投資Sierra。',
            buttonText: '了解更多',
            link: '/contact'
          },
          {
            image: '/assets/images/resources/hero-2.jpg',
            imageAlt: '資源中心Hero圖片2',
            date: '2023年9月5日',
            title: 'AI驅動的客戶服務革命',
            description: '發現Zenava AI如何通過能夠實時理解、學習和適應的智能代理來轉變客戶服務。',
            buttonText: '了解更多',
            link: '/contact'
          },
          {
            image: '/assets/images/resources/hero-3.jpg',
            imageAlt: '資源中心Hero圖片3',
            date: '2023年9月4日',
            title: '面向現代企業的企業AI解決方案',
            description: '探索我們專為企業規模設計的綜合AI平台，幫助企業實現數字化轉型。',
            buttonText: '了解更多',
            link: '/contact'
          }
        ]
      }
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
    
    // Other Resources Section
    otherResources: {
      title: '資源中心',
      cards: {
        voiceConnectivity: {
          title: '語音連接',
          learnMore: '了解更多',
          bookDemo: '預約演示'
        },
        liveChat: {
          title: '實時聊天',
          learnMore: '了解更多',
          bookDemo: '預約演示'
        }
      }
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

    // AI Agents Page
    products: {
      aiAgents: {
        banner: {
          src: '/assets/images/ai-agents/banner-hk.webp',
          mobileSrc: '/assets/images/ai-agents/banner-mobile-hk.webp',
          alt: 'AI Agents Banner'
        },
        hero: {
          title: 'ZENAVA能夠獨立承擔 80%的重複性、高頻次、流程清晰的客戶聯絡任務',
          subtitle: '顯著降低了傳統客服對人力規模的依賴，實現了客戶體驗的跨越式升級',
          button: '預約諮詢'
        },
        advantages: {
          title: 'ZENAVA的優勢',
          card1: {
            title: '能溝通',
            subtitle: '像真人一樣交流',
            desc: '具備多模態理解、情緒感知與高擬人化交互能力，帶來超越真人的溝通體驗'
          },
          card2: {
            title: '能執行',
            subtitle: '獨立完成業務閉環',
            desc: '直接驅動業務流程，完成如發送短信、創建工單、查詢客戶資料以及邀約通知等任務'
          },
          card3: {
            title: '快速上崗',
            subtitle: '越用越聰明',
            desc: '開箱即用，快速部署「上崗」，內置帶教流程，遇到問題時自我修正錯誤，越用越聰明'
          },
          card4: {
            title: '可量化價值',
            subtitle: '讓每一分AI投入都清晰可見',
            desc: '價值可量化，實現純粹、顛覆性的成本結構重構，單位服務成本(CPC)降低約20%'
          }
        },
        features: {
          title: '核心功能',
          subtitle: '',
          voice: {
            label: 'Voice Agents',
            title: '超越真人的語音對話體驗',
            subtitle: '',
            list: [
              '擬人化音色：聲音富有情緒與表達力，溝通體驗超越真人',
              '低延遲交互：快速響應，實時對話無卡頓',
              '精準智能打斷：可隨時打斷和插話，像真人面對面聊天那樣自然',
              '完整業務閉環，大幅提升服務效率與客戶體驗'
            ],
            button: '了解更多Voice Agents功能',
            image: {
              src: '/assets/images/ai-agents/voice-hk.webp',
              alt: 'Voice功能演示圖 - 超越真人的語音對話體驗'
            }
          },
          messaging: {
            label: 'Live Chat',
            title: '打造極致客戶服務體驗',
            subtitle: '',
            list: [
              '7x24小時全渠道在線，不錯失與客戶的每一次溝通',
              '支持文字、圖片、視頻等富媒體溝通，精準識別客戶意圖',
              '能夠從表述中感知客戶情緒，以友好、尊重的方式回應',
              '打造極致客戶服務體驗，靈活滿足客戶訴求',
              '具備同理心與判斷力，驅動業務全流程閉環'
            ],
            button: '了解更多Live Chat功能',
            image: {
              src: '/assets/images/ai-agents/person-hk.webp',
              alt: '即時對話功能演示圖 - 打造極致客戶服務體驗'
            }
          }
        },
        resources: {
          title: '資源中心',
          card1: {
            tag: '產品',
            title: '構建持續進化的AI生產力'
          },
          card2: {
            tag: '行業報告',
            title: '構建持續進化的AI生產力'
          },
          card3: {
            tag: '教育',
            title: '構建持續進化的AI生產力'
          },
          card4: {
            tag: '文章',
            title: '構建持續進化的AI生產力'
          }
        },
        cta: {
          title: '開啟智能對話新篇章',
          subtitle: '讓Zenava AI助力您的企業實現客戶對話場景的智能化升級',
          button: '聯絡我們'
        }
      },
      voiceAgents: {
        banner: {
          src: '/assets/images/voice-agents/banner-hk.webp',
          mobileSrc: '/assets/images/voice-agents/banner-mobile-hk.webp',
          imageAlt: 'VoiceAgents產品Banner圖 - 超越真人的語音對話體驗'
        },
        coreFeatures: {
          title: '核心能力',
          subtitle: '',
          feature1: {
            title: '擬人化音色',
            subtitle: '像真人一樣交流',
            description: '語音交互自然流暢、情感豐富，具備多種音色與語氣風格，滿足用戶個性化偏好。能夠根據場景表達關懷、理解與專業感，讓溝通體驗超越真人',
            tags: ['自然流暢', '情感豐富', '多種音色', '個性化'],
            button: '了解更多',
            mediaAlt: '擬人化音色功能演示',
            mediaPath: '/assets/images/voice-agents/humanized-voice-hk.webp'
          },
          feature2: {
            title: '低延遲交互',
            subtitle: '實時響應，無需等待',
            description: '毫秒級響應速度，實時對話無卡頓，讓交互更自然。無論是客戶諮詢、業務辦理還是投訴處理，Zenava都能快速響應',
            tags: ['毫秒級響應', '實時對話', '無縫跳轉', '高效流暢'],
            button: '了解更多',
            mediaAlt: '低延遲交互功能演示',
            mediaPath: '/assets/images/voice-agents/low-latency-hk.webp'
          },
          feature3: {
            title: '精準智能打斷',
            subtitle: '理解用戶真實意圖',
            description: '支持用戶隨時打斷和插話，實時響應不中斷，像真人面對面聊天那樣自然靈活',
            tags: ['智能打斷', '意圖識別', '自然對話', '實時響應'],
            button: '了解更多',
            mediaAlt: '精準智能打斷功能演示',
            mediaPath: '/assets/images/voice-agents/intelligent-interruption-hk.webp'
          },
          feature4: {
            title: '完整業務閉環',
            subtitle: '端到端業務自動化',
            description: 'Zenava能直接執行任務，如創建工單、發送通知、查詢信息等，讓對話真正轉化為可落地的業務動作',
            tags: ['任務執行', '業務自動化', '工單創建', '信息查詢'],
            button: '了解更多',
            mediaAlt: '完整業務閉環功能演示',
            mediaPath: '/assets/images/voice-agents/business-loop-hk.webp'
          }
        },
        customerCases: {
          title: '應用與量化效果',
          subtitle: '',
          case1: {
            tag: '廚電行業',
            title: '廚電客戶實現大規模客戶服務自動化，年節省總成本525萬',
            subtitle: '年節省成本525萬',
            description: 'Zenava獨立處理產品諮詢、報修、訂單查詢等大量重複性諮詢，替代35個呼叫中心座席的工作量',
            features: [
              '年度節省成本約525萬元',
              '項目ROI高達425%'
            ],
            button: '了解更多',
            imageAlt: '廚電客戶服務自動化案例',
            imageSrc: '/assets/images/voice-agents/case-kitchen-appliances-hk.webp'
          },
          case2: {
            tag: '汽車行業',
            title: '汽車客戶使用Zenava接管試駕邀約，轉化率提升至85%',
            subtitle: '轉化率提升至85%',
            description: 'Zenava能夠自動清洗客戶線索，通過語音交互及時篩選有效客戶，邀約高意向客戶到店試駕',
            features: [
              '提高潛在客戶的跟進效率，提升線索轉化率，帶動銷量增長',
              '邀約轉化率提升至85%'
            ],
            button: '了解更多',
            imageAlt: '汽車客戶試駕邀約案例',
            imageSrc: '/assets/images/voice-agents/case-automotive-hk.webp'
          },
          case3: {
            tag: '酒店行業',
            title: '酒店集團預訂全流程無人化，大幅提升預訂轉化率',
            subtitle: '預訂轉化率提升15%-25%',
            description: 'Zenava獨立完整執行從理解預訂需求、確認時間與房型到完成預訂的全流程',
            features: [
              '支持多語言溝通，覆蓋全球客戶',
              '預訂轉化率提升15%-25%'
            ],
            button: '了解更多',
            imageAlt: '酒店集團預訂自動化案例',
            imageSrc: '/assets/images/voice-agents/case-hotel-hk.webp'
          }
        }
      },
      liveChat: {
        banner: {
          src: '/assets/images/livechat/banner-hk.webp',
          mobileSrc: '/assets/images/livechat/banner-mobile-hk.webp',
          alt: 'LiveChat Banner'
        },
        advantages: {
          title: 'LiveChat的優勢',
          card1: {
            title: '實時響應',
            subtitle: '秒級回復客戶',
            desc: '7x24小時在線，智能路由分配，確保客戶問題得到及時響應和處理'
          },
          card2: {
            title: '多渠道支持',
            subtitle: '統一管理所有渠道',
            desc: '支持網站、移動端、社交媒體等多種渠道，統一管理客戶對話，提升服務效率'
          },
          card3: {
            title: '智能分析',
            subtitle: '數據驅動優化',
            desc: '實時分析客戶對話數據，識別常見問題，優化服務流程，提升客戶滿意度'
          }
        },
        features: {},
        caseStudies: {
          title: '應用與量化效果',
          subtitle: '',
          case1: {
            mainTitle: 'B2B企業官網客服無人化接待，留資率高達46%',
            highlight: '留資率高達46%',
            description: 'Zenava在官網獨立接待客戶，自動進行線索的初步篩選和信息收集',
            points: [
              '全時段覆蓋售前接待，實現官網客服無人化值守',
              '留資率高達46%，超過人工留資率40%',
              '產品業務知識分鐘級更新，保障服務準確性和專業度'
            ],
            metric: '46%',
            metricLabel: '留資率',
            imageSrc: '/assets/images/livechat/case1-b2b-hk.webp',
            imageAlt: 'B2B企業官網客服無人化接待',
            button: '了解更多',
            buttonLink: '/products/live-chat'
          },
          case2: {
            mainTitle: '智能鎖客戶實現端到端售後服務自動化，年節省總成本 621 萬',
            highlight: '年節省總成本 621萬',
            description: 'Zenava通過多輪對話結合圖片精準識別，獨立完成智能鎖故障排查',
            points: [
              '獨立接待率達到83%',
              '年節省總成本 621萬'
            ],
            metric: '621萬',
            metricLabel: '年節省成本',
            metric2: '83%',
            metric2Label: '獨立接待率',
            imageSrc: '/assets/images/livechat/case2-smartlock-hk.webp',
            imageAlt: '智能鎖客戶實現端到端售後服務自動化',
            button: '了解更多',
            buttonLink: '/products/live-chat'
          }
        },
        section3: {
          title: 'AI Agents for Chat',
          subtitle: '',
          item1: {
            mainTitle: '7×24小時全渠道在線',
            subtitle: '不錯失與客戶的每一次溝通',
            description: 'Zenava可以7×24小時在客戶選擇的渠道上與他們實時溝通，無論是網頁、App、社交媒體還是消息應用，企業無需擔心客戶等待或錯失商機，顯著提升客戶滿意度與留存率',
            buttonText: '了解更多',
            imageAlt: '7×24小時全渠道在線',
            imageSrc: '/assets/images/livechat/omnichannel.webp'
          },
          item2: {
            mainTitle: '支持文字、圖片、視頻等富媒體溝通',
            subtitle: '精準識別客戶意圖',
            description: 'Zenava不僅能理解文字，還能理解圖片、視頻等多種形態的信息，提供豐富的對話體驗，實現複雜多輪對話信息收集，精準識別客戶意圖，高效處理客戶問題',
            buttonText: '了解更多',
            imageAlt: '富媒體溝通',
            imageSrc: '/assets/images/livechat/rich-media-hk.webp'
          },
          item3: {
            mainTitle: '能夠從表述中感知客戶情緒',
            subtitle: '以友好、尊重的方式回應',
            description: 'Zenava通過性格建模具備語言理解與情緒感知能力，能夠從表述中識別情緒，並以友好、尊重的方式回應，讓客戶感受到貼心和專業的服務體驗',
            buttonText: '了解更多',
            imageAlt: '情緒感知',
            imageSrc: '/assets/images/livechat/emotion-hk.webp'
          },
          item4: {
            mainTitle: '打造極致客戶服務體驗',
            subtitle: '靈活滿足客戶訴求',
            description: '在遵守企業業務底線和品牌規範的前提下，Zenava能夠靈活滿足客戶個性化需求，使企業在保證安全與合規的同時提升客戶體驗',
            buttonText: '了解更多',
            imageAlt: '兼顧業務和體驗',
            imageSrc: '/assets/images/livechat/balance-hk.webp'
          },
          item5: {
            mainTitle: '具備同理心與判斷力',
            subtitle: '驅動業務全流程閉環',
            description: 'Zenava具有同理心與判斷力，在實際業務場景中，能夠像人類員工一樣調用工具，完成如發送短信、創建工單、查詢客戶資料以及邀約通知等任務，實現業務閉環',
            buttonText: '了解更多',
            imageAlt: '同理心與判斷力',
            imageSrc: '/assets/images/livechat/empathy-jp.webp'
          }
        }
      }
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
    },

    // Banner 轮播翻译
    banners: {
      slide1: {
        siteName: 'ZENAVA',
        mainTitle: '企業級AI對話解決方案',
        description: '通過智能AI助手轉變您的客戶服務，提升客戶體驗，降低運營成本',
        buttonText: '預約諮詢',
        imageAlt: '橫幅圖片1',
        src: '/assets/images/banners/slide1-hk.webp',
        mobileSrc: '/assets/images/banners/slide1-mobile-hk.webp'
      },
      slide2: {
        siteName: 'ZENAVA Sales',
        mainTitle: '智能銷售賦能系統',
        description: 'AI驅動的銷售智能化平台，精準客戶畫像分析，智能推薦銷售策略，提升成單率縮短銷售週期',
        buttonText: '了解銷售方案',
        imageAlt: '智能銷售系統界面',
        src: '/assets/images/banners/slide2-hk.webp',
        mobileSrc: '/assets/images/banners/slide2-mobile-hk.webp'
      },
      slide3: {
        siteName: '智能AI平台',
        mainTitle: '4345323',
        description: '43244444444',
        buttonText: '預約諮詢',
        imageAlt: '智能AI平台展示',
        src: '/assets/images/banners/slide3-hk.webp',
        mobileSrc: '/assets/images/banners/slide3-mobile-hk.webp'
      },
      slide4: {
        siteName: 'ZENAVA',
        mainTitle: '7x24智能客服',
        description: 'AI智能客服系統實現全天候服務，自動處理常見問題，情感識別提升體驗',
        buttonText: '查看詳情',
        imageAlt: '智能客服',
        src: '/assets/images/banners/slide4-hk.webp',
        mobileSrc: '/assets/images/banners/slide4-mobile-hk.webp'
      },
      slide5: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: '營銷活動Banner圖',
        src: '/assets/images/banners/slide5-hk.webp',
        mobileSrc: '/assets/images/banners/slide5-mobile-hk.webp'
      },
      slide6: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: '營銷活動Banner圖',
        src: '/assets/images/banner-full-marketing-hk.webp',
        mobileSrc: '/assets/images/banner-full-marketing-mobile-hk.webp'
      }
    },
    
    // Common images and texts
    common: {
      logo: {
        src: '/assets/images/common/logo-hk.webp',
        alt: 'Zenava Logo'
      },
      noImage: '暫無圖片'
    }
  },
  
  zh: {
    // 公司与品牌 - 简体中文
    company: {
      name: 'Zenava',
      tagline: '面向客服和营销场景的AI生产力平台',
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
      title: '面向客服和营销场景的AI生产力平台',
      subtitle: '助力企业完成生产力与组织形态变革，实现从"人力驱动"到"AI驱动"的跨越',
      cta: {
        primary: '预约演示',
        secondary: '查看方案'
      }
    },
    
    // 业务价值
    businessValue: {
      title: 'Zenava能为企业带来什么',
      subtitle: '让企业随时随地高效服务客户，打造卓越客户体验，降低服务成本',
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
      },
      // 核心能力版块 - Alternating-Text-Media-List 格式
      capabilities: {
        item1: {
          title: '即时响应，快速解决客户问题',
          list: [
            '为企业提供 7×24 小时即时响应服务',
            '支持在网站、APP、WHATSAPP、LINE、Facebook等数字渠道与客户以语音、文本消息的方式互动，快速响应客户，解决客户问题',
            '降低等待时间、减少人工成本，提升客户满意度'
          ],
          button: '了解更多',
          imageAlt: '即时响应服务'
        },
        item2: {
          title: '媲美真人的自然沟通体验，更值得信赖',
          list: [
            '能听懂语音，理解文字、图片、视频等多种形态信息，精准解决客户问题',
            '支持复杂多轮对话信息收集，能拆解复杂需求，处理复杂问题',
            '具备情绪感知能力，耐心、有温度，通过媲美真人的自然沟通体验，提升客户忠诚度'
          ],
          button: '了解更多',
          imageAlt: '自然沟通体验'
        },
        item3: {
          title: '客户服务自动化，实现真正的端到端闭环',
          list: [
            '能够独立处理80%重复性、高频次、流程清晰的客户联络任务',
            '实现从意图识别 → 任务执行 → 反馈结果的端到端自动化闭环，在特定任务中可完全取代人力'
          ],
          button: '了解更多',
          imageAlt: '客户服务自动化'
        },
        item4: {
          title: '智能引导访客留资，提升客户转化率',
          list: [
            '精准识别客户意图，深入挖掘客户需求，提供专业回应，促进成交',
            '主动追问、澄清关键信息，引导客户留资，自动化收集线索，提升客户转化率'
          ],
          button: '了解更多',
          imageAlt: '智能引导访客留资'
        },
        item5: {
          title: '效果可量化，让AI价值看得见',
          list: [
            '重构企业成本结构，服务成本降低约20%',
            '企业降本增效的首选'
          ],
          button: '了解更多',
          imageAlt: '效果可量化'
        }
      }
    },
    
    // 场景/解决方案
    scenarios: {
      marketing: {
        title: '市场营销自动化',
        subtitle: '提升转化率，降低获客成本',
        description: '实时识别客户意图，统一话术留资，智能分配高潜线索。基于会话分析反哺营销策略优化',
        features: [
          '意图识别',
          '智能留资',
          '多渠道整合',
          '预测分析'
        ],
        // 版块3专用内容
        section3: {
          mainTitle: 'AI驱动的营销自动化',
          subtitle: '智能获客，精准转化',
          description: '通过AI智能获客识别',
          tag1: '智能识别',
          tag2: '实时优化',
          buttonText: '了解更多营销自动化',
          imageAlt: '实体图片'
        }
      },
      sales: {
        title: '销售赋能',
        subtitle: '缩短成交周期，提升成交率',
        description: '实时话术推荐，竞品知识调用，最佳实践建议。AI辅助成交策略，验证转化提升',
        features: [
          '话术推荐',
          '竞品分析',
          '智能成交辅助',
          '业绩分析'
        ],
        featureShort: ['话术推荐', '竞品分析', '智能成交'],
        buttonText: '了解更多智能销售'
      },
      customerService: {
        title: '客户服务',
        subtitle: '更快、更准、更有温度',
        description: '全天候智能响应，复杂问题智能分流，情绪感知互动。知识库联动快速解决问题',
        features: [
          '24/7响应',
          '情绪识别',
          '智能工单',
          '知识管理'
        ],
        featureShort: ['24/7响应', '情绪识别', '智能工单处理流程'],
        buttonText: '了解更多客户服务'
      },
      internalService: {
        title: '内部运营',
        subtitle: '多层级组织高效管理',
        description: '统一服务入口处理设备、库存、培训事务。智能派单与进度追踪，优化运营效率',
        features: [
          '统一入口',
          '智能派单',
          '数据分析',
          '流程自动化'
        ],
        featureShort: ['统一入口', '智能派单', '数据分析'],
        buttonText: '了解更多内部服务',
        videoError: '您的浏览器不支持视频播放'
      },
      management: {
        title: '管理优化',
        subtitle: '客户声音驱动产品创新',
        description: '从对话中提取产品洞察，量化反馈趋势，建立客户声音到产品迭代闭环',
        features: [
          '洞察挖掘',
          '需求提取',
          '迭代闭环',
          '趋势分析'
        ],
        featureShort: ['洞察挖掘', '需求提取', '迭代闭环'],
        brandFeatures: ['风险预警', '情绪分析', '品质控制'],
        buttonText: '了解更多管理优化'
      }
    },
    
    // 行业解决方案
    industries: {
      retail: {
        pageTitle: 'AI Agents for Retail',
        banner: {
          src: '/assets/images/retail/banner.webp',
          mobileSrc: '/assets/images/retail/banner-mobile.webp',
          alt: '零售行业Banner图',
          link: '/contact'
        },
        cardGrid: {
          card1: {
            title: '随时随地连接消费者',
            description: '在品牌网站、APP、社交媒体等数字渠道与消费者建立全天候联系',
            button1Text: '了解更多',
            button1Link: '/contact',
            button2Text: '预约演示',
            button2Link: '/contact'
          },
          card2: {
            title: '个性化客户服务',
            description: '为消费者提供精准、个性化服务，提升客户体验',
            button1Text: '了解更多',
            button1Link: '/contact',
            button2Text: '预约演示',
            button2Link: '/contact'
          },
          card3: {
            title: '承接海量客户咨询',
            description: '可同时处理大量客户咨询，轻松应对销售旺季和购物高峰',
            button1Text: '了解更多',
            button1Link: '/contact',
            button2Text: '预约演示',
            button2Link: '/contact'
          }
        },
        alternatingTags: {
          title: '核心业务场景',
          subtitle: '为消费者提供全生命周期服务',
          items: [
            {
              icon: 'fas fa-shopping-bag',
              title: '智能导购',
              subtitle: '',
              description: '精准识别客户咨询意图，主动提供个性化商品推荐与优惠信息，促进销售，提升购买转化率。',
              tags: ['意图识别', '个性化推荐', '优惠信息', '转化提升'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/01.webp',
              mediaAlt: '智能导购'
            },
            {
              icon: 'fas fa-clipboard-list',
              title: '订单管理',
              subtitle: '',
              description: '自动处理订单查询、退换货、物流追踪等常见问题，减少等待时间，提高客户满意度和购物体验。',
              tags: ['订单查询', '退换货处理', '物流追踪', '效率提升'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/02.webp',
              mediaAlt: '订单管理'
            },
            {
              icon: 'fas fa-tools',
              title: '售后故障排查',
              subtitle: '',
              description: '当客户遇到产品故障问题时，通过多轮对话结合图片或视频，精准识别故障，独立引导客户完成故障排查，提高问题解决效率',
              tags: ['故障识别', '多轮对话', '图片视频支持', '问题解决'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/03.webp',
              mediaAlt: '售后故障排查'
            },
            {
              icon: 'fas fa-wrench',
              title: '报装报修与智能回访',
              subtitle: '',
              description: '自动识别客户报修、安装等服务需求，生成工单并派发至对应人员；服务完成后自动发起满意度回访，形成完整客户服务闭环，提升客户体验。',
              tags: ['工单生成', '智能派发', '满意度回访', '服务闭环'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/retail/04.webp',
              mediaAlt: '报装报修与智能回访'
            }
          ]
        },
        alternatingList: {
          title: '',
          subtitle: '',
          items: [
            {
              title: '量化效果',
              subtitle: 'Every Investment is Quantifiable',
              features: [
                '投资回报清晰可见',
                '自动处理90%客户常见问题',
                '售后问题解决时长缩短 60%',
                '客户满意度提升至 92%+',
                '平均购买转化率提升 30–40%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/retail/05.webp',
              imageAlt: '量化效果'
            }
          ]
        },
        quantifiedEffects: {
          title: '量化效果',
          subtitle: '',
          description: '',
          effects: [
            '投资回报清晰可见',
            '自动处理 90% 客户常见问题',
            '售后问题解决时长缩短 60%',
            '客户满意度提升至 92%+',
            '平均购买转化率提升 30–40%'
          ],
          buttonText: '了解更多',
          buttonLink: '/contact',
          imageAlt: '量化效果',
          imageSrc: '/assets/images/retail/06.webp'
        }
      },
      automotive: {
        banner: {
          src: '/assets/images/automotive/banner.webp',
          mobileSrc: '/assets/images/automotive/banner-mobile.webp',
          alt: 'Automotive产品Banner图',
          link: '/contact'
        },
        alternatingList: {
          title: '核心业务场景',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-car',
              title: '试驾邀约',
              description: '精准识别客户意向，高效推动试驾转化',
              features: [
                '敏锐捕捉客户关注点，快速精准解答车型配置、价格、优惠等问题',
                '自动识别客户购车意向与可用时间，引导客户完成试驾预约',
                '从客户识别、咨询解答到任务派发，实现销售跟单全流程自动化'
              ],
              businessValue: [
                '试驾邀约转化率提升 35%+',
                '客户满意度提升至95%',
                '客户响应时长缩短 30%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/automotive/01.webp',
              imageAlt: '试驾邀约'
            },
            {
              icon: 'fas fa-headset',
              title: '售后服务与客户关怀',
              description: '快速响应客户需求，提升品牌忠诚度',
              features: [
                '提供维保/维修进度实时查询，无需等待人工客服',
                '主动进行保养提醒与召回通知等，提升客户满意度与忠诚度',
                '试驾/服务后自动回访与满意度调查，收集改进意见'
              ],
              businessValue: [
                '售后咨询响应时间缩短 50%',
                '售后满意度提升 25%+',
                '客户留存率提升 20%+'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/automotive/02.webp',
              imageAlt: '售后服务与客户关怀'
            }
          ]
        }
      },
      software: {
        banner: {
          src: '/assets/images/software/banner.webp',
          mobileSrc: '/assets/images/software/banner-mobile.webp',
          alt: 'Software产品Banner图',
          link: '/contact'
        },
        scenariosList: {
          title: '核心业务场景',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-user-check',
              title: '售前留资',
              description: '自动识别高意向客户，高效收集关键信息，提升线索转化率',
              features: [
                '24小时接待，覆盖夜间及节假日，提供秒级响应',
                '在开放式对话中精准判断客户意向与留资意愿',
                '利用丰富产品知识与强大通识能力，实现高质量专业解答，提升客户信任度'
              ],
              effects: [
                '咨询到线索的转化率从10%提升至 40%',
                '每年节省超100万人力成本'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/01.webp',
              imageAlt: '售前留资'
            },
            {
              icon: 'fas fa-question-circle',
              title: '软件使用咨询',
              description: '快速响应用户疑问，高效指导用户使用软件功能，帮助新用户快速上手',
              features: [
                '精准理解用户模糊或不完整提问，快速定位到具体功能或界面操作',
                '在不同版本、不同权限或个性化配置下，提供上下文一致、易于执行的指导'
              ],
              effects: [
                '独立接待率达到62%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/02.webp',
              imageAlt: '软件使用咨询'
            },
            {
              icon: 'fas fa-tools',
              title: '技术支持',
              description: '面向客户与内部团队，在售后或产品使用过程中，自动化解答产品技术问题，提供排障指导和工单分流，提升服务效率',
              features: [
                '准确识别复杂技术问题的语义表达与上下文依赖，确保答案精准且符合用户场景',
                '基于智能体知识库，通过大模型分析快速定位问题，提供综合性解决方案',
                '无法解决问题时，平滑升级至人工处理'
              ],
              effects: [
                '准确率超85%，平均响应时间3S内',
                '独立接待率从20%提升至35%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/03.webp',
              imageAlt: '技术支持'
            }
          ]
        },
        casesList: {
          title: '应用案例与量化效果',
          subtitle: '',
          items: [
            {
              title: 'SaaS企业官网客服无人化接待',
              challenge: [
                '人工客服接待无法全时段覆盖，传统表单留资率低',
                '人工客服培养周期长，无法快速有效覆盖全量的产品专业知识'
              ],
              solution: '部署Zenava，在官网独立作业，结合产品功能介绍、行业案例、产品亮点等为客户提供专业解读，自动进行线索的初步筛选和信息收集',
              effects: [
                '全时段覆盖售前接待，实现官网客服无人化值守',
                '留资率高达46%，超过人工留资率40%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/04.webp',
              imageAlt: 'SaaS企业官网客服无人化接待'
            },
            {
              title: '软件公司内部技术支持',
              challenge: [
                '内部支持流程复杂，如系统功能使用、系统对接等需要多个岗位协同支持'
              ],
              solution: '部署 Zenava，融合产品操作文档、产品说明、技术支持常见问题、售前解决方案文档构建知识库，全时段覆盖销售、售前、客户、实施工程师的问题咨询',
              effects: [
                '对客侧员工效率提升15%~30%',
                '技术支持团队节省40%的内部支撑时间'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/software/05.webp',
              imageAlt: '软件公司内部技术支持'
            }
          ]
        }
      },
      travel: {
        banner: {
          src: '/assets/images/travel/banner.webp',
          mobileSrc: '/assets/images/travel/banner-mobile.webp',
          alt: 'Travel产品Banner图',
          link: '/contact'
        },
        alternatingTags: {
          title: '核心业务场景',
          subtitle: '',
          items: [
            {
              icon: 'fas fa-hotel',
              title: '酒店与票务预订',
              titleLink: '',
              subtitle: '',
              description: '准确理解客户意图，独立完整执行从确认房型、时间、票务信息等到完成预订全流程，提升客户满意度与预订转化率。',
              tags: ['意图识别', '全流程自动化', '预订转化', '客户满意度'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/01.webp',
              mediaAlt: '酒店与票务预订'
            },
            {
              icon: 'fas fa-user-circle',
              title: '账户管理',
              titleLink: '',
              subtitle: '',
              description: '即时响应客户关于账户访问、积分计划、会员权益等的咨询，自助处理常见问题，缩短平均处理时长，提高会员忠诚度。',
              tags: ['即时响应', '自助服务', '会员管理', '效率提升'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/02.webp',
              mediaAlt: '账户管理'
            },
            {
              icon: 'fas fa-life-ring',
              title: '旅行支持',
              titleLink: '',
              subtitle: '',
              description: '为客户提供关于行李丢失、错过航班或入住时间等问题的即时帮助，缩短响应时间，提升客户体验。',
              tags: ['即时帮助', '问题解决', '响应速度', '客户体验'],
              buttonText: '了解更多',
              buttonLink: '/contact',
              mediaPath: '/assets/images/travel/03.webp',
              mediaAlt: '旅行支持'
            }
          ]
        },
        alternatingList: {
          title: '量化效果',
          subtitle: '',
          items: [
            {
              title: '量化效果',
              features: [
                '客户满意度提升 30%',
                '运营成本降低 35%',
                '预订转化率提升 25%',
                '响应时间缩短 70%'
              ],
              buttonText: '了解更多',
              buttonLink: '/contact',
              imagePath: '/assets/images/travel/04.webp',
              imageAlt: '量化效果'
            }
          ]
        },
        quantifiedEffects: {
          title: '量化效果',
          subtitle: '',
          description: '',
          effects: [
            '客户满意度提升 30%',
            '运营成本降低 35%',
            '预订转化率提升 25%',
            '响应时间缩短 70%'
          ],
          buttonText: '了解更多',
          buttonLink: '/contact',
          imageAlt: '量化效果',
          imageSrc: '/assets/images/travel/05.webp'
        }
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

    // Contact Form Page - 联系表单页面
    contactForm: {
      title: '联系我们',
      subtitle: '获取专属解决方案',
      description: '我们的专业顾问将尽快与您联系',
      firstName: '名',
      firstNamePlaceholder: '请输入您的名',
      lastName: '姓',
      lastNamePlaceholder: '请输入您的姓',
      jobTitle: '职位',
      jobTitlePlaceholder: '请输入您的职位',
      companyEmail: '企业邮箱',
      companyEmailPlaceholder: 'example@company.com',
      companyName: '公司名称',
      companyNamePlaceholder: '请输入公司名称',
      industry: '行业',
      selectIndustry: '请选择行业',
      industryTech: '科技',
      industryFinance: '金融',
      industryHealthcare: '医疗',
      industryRetail: '零售',
      industryManufacturing: '制造业',
      industryEducation: '教育',
      industryOther: '其他',
      privacyAgree: '我同意隐私政策',
      submit: '提交',
      submitting: '提交中...',
      privacyNotice: '点击提交即表示您同意我们按照',
      privacyLink: '隐私政策',
      successMessage: '感谢您的提交，我们的顾问将尽快与您联系。',
      errorMessage: '提交失败，请重试。',
      downloadReady: '您的下载已准备就绪',
      download: '下载'
    },
    
    // 资源中心页面
    resourcesCenter: {
      hero: {
        slides: [
          {
            image: '/assets/images/resources/hero-1.jpg',
            imageAlt: '资源中心Hero图片',
            date: 'September 6, 2023',
            title: 'There\'s an agent for that, and it runs on Sierra',
            description: 'Today, we\'re announcing that we\'ve raised $350M additional capital at a valuation of $10B, led by Greenoaks, which is doubling down on Sierra.',
            buttonText: '了解更多',
            link: '/contact'
          },
          {
            image: '/assets/images/resources/hero-2.jpg',
            imageAlt: '资源中心Hero图片2',
            date: 'September 5, 2023',
            title: 'AI驱动的客户服务革命',
            description: '发现Zenava AI如何通过能够实时理解、学习和适应的智能代理来转变客户服务。',
            buttonText: '了解更多',
            link: '/contact'
          },
          {
            image: '/assets/images/resources/hero-3.jpg',
            imageAlt: '资源中心Hero图片3',
            date: 'September 4, 2023',
            title: '面向现代企业的企业AI解决方案',
            description: '探索我们专为企业规模设计的综合AI平台，帮助企业实现数字化转型。',
            buttonText: '了解更多',
            link: '/contact'
          }
        ]
      }
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
    
    // Other Resources Section
    otherResources: {
      title: '资源中心',
      cards: {
        voiceConnectivity: {
          title: 'Voice Agents',
          learnMore: '了解详情',
          bookDemo: '预约演示'
        },
        liveChat: {
          title: 'Live Chat',
          learnMore: '了解详情',
          bookDemo: '预约演示'
        }
      }
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

    // AI Agents Page
    products: {
      aiAgents: {
        banner: {
          src: '/assets/images/ai-agents/banner.webp',
          mobileSrc: '/assets/images/ai-agents/banner-mobile.webp',
          alt: 'AI Agents Banner'
        },
        hero: {
          title: 'ZENAVA能够独立承担 80%的重复性、高频次、流程清晰的客户联络任务',
          subtitle: '显著降低了传统客服对人力规模的依赖，实现了客户体验的跨越式升级',
          button: '预约咨询'
        },
        advantages: {
          title: 'ZENAVA的优势',
          card1: {
            title: '能沟通',
            subtitle: '像真人一样交流',
            desc: '具备多模态理解、情绪感知与高拟人化交互能力，带来超越真人的沟通体验'
          },
          card2: {
            title: '能执行',
            subtitle: '独立完成业务闭环',
            desc: '直接驱动业务流程，完成如发送短信、创建工单、查询客户资料以及邀约通知等任务'
          },
          card3: {
            title: '快速上岗',
            subtitle: '越用越聪明',
            desc: '开箱即用，快速部署"上岗"，内置带教流程，遇到问题时自我修正错误，越用越聪明'
          },
          card4: {
            title: '可量化价值',
            subtitle: '让每一分AI投入都清晰可见',
            desc: '价值可量化，实现纯粹、颠覆性的成本结构重构，单位服务成本(CPC)降低约20%'
          }
        },
        features: {
          title: '核心功能',
          subtitle: '',
          voice: {
            label: 'Voice Agents',
            title: '超越真人的语音对话体验',
            subtitle: '',
            list: [
              '拟人化音色：声音富有情绪与表达力，沟通体验超越真人',
              '低延迟交互：快速响应，实时对话无卡顿',
              '精准智能打断：可随时打断和插话，像真人面对面聊天那样自然',
              '完整业务闭环，大幅提升服务效率与客户体验'
            ],
            button: '了解更多Voice Agents功能',
            image: {
              src: '/assets/images/ai-agents/voice.webp',
              alt: 'Voice功能演示图 - 超越真人的语音对话体验'
            }
          },
          messaging: {
            label: 'Live Chat',
            title: '打造极致客户服务体验',
            subtitle: '',
            list: [
              '7x24小时全渠道在线，不错失与客户的每一次沟通',
              '支持文字、图片、视频等富媒体沟通，精准识别客户意图',
              '能够从表述中感知客户情绪，以友好、尊重的方式回应',
              '打造极致客户服务体验，灵活满足客户诉求',
              '具备同理心与判断力，驱动业务全流程闭环'
            ],
            button: '了解更多Live Chat功能',
            image: {
              src: '/assets/images/ai-agents/person.webp',
              alt: '即时对话功能演示图 - 打造极致客户服务体验'
            }
          }
        },
        resources: {
          title: '资源中心',
          card1: {
            tag: '产品',
            title: '构建持续进化的AI生产力'
          },
          card2: {
            tag: '行业报告',
            title: '构建持续进化的AI生产力'
          },
          card3: {
            tag: '教育',
            title: '构建持续进化的AI生产力'
          },
          card4: {
            tag: '文章',
            title: '构建持续进化的AI生产力'
          }
        },
        cta: {
          title: '开启智能对话新篇章',
          subtitle: '让Zenava AI助力您的企业实现客户对话场景的智能化升级',
          button: '联系我们'
        }
      },
      voiceAgents: {
        banner: {
          src: '/assets/images/voice-agents/banner.webp',
          mobileSrc: '/assets/images/voice-agents/banner-mobile.webp',
          imageAlt: 'VoiceAgents产品Banner图 - 超越真人的语音对话体验'
        },
        coreFeatures: {
          title: '核心能力',
          subtitle: '',
          feature1: {
            title: '拟人化音色',
            subtitle: '像真人一样交流',
            description: '语音交互自然流畅、情感丰富，具备多种音色与语气风格，满足用户个性化偏好。能够根据场景表达关怀、理解与专业感，让沟通体验超越真人',
            tags: ['自然流畅', '情感丰富', '多种音色', '个性化'],
            button: '了解更多',
            mediaAlt: '拟人化音色功能演示',
            mediaPath: '/assets/images/voice-agents/humanized-voice.webp'
          },
          feature2: {
            title: '低延迟交互',
            subtitle: '实时响应，无需等待',
            description: '毫秒级响应速度，实时对话无卡顿，让交互更自然。无论是客户咨询、业务办理还是投诉处理，Zenava都能快速响应',
            tags: ['毫秒级响应', '实时对话', '无缝跳转', '高效流畅'],
            button: '了解更多',
            mediaAlt: '低延迟交互功能演示',
            mediaPath: '/assets/images/voice-agents/low-latency.webp'
          },
          feature3: {
            title: '精准智能打断',
            subtitle: '理解用户真实意图',
            description: '支持用户随时打断和插话，实时响应不中断，像真人面对面聊天那样自然灵活',
            tags: ['智能打断', '意图识别', '自然对话', '实时响应'],
            button: '了解更多',
            mediaAlt: '精准智能打断功能演示',
            mediaPath: '/assets/images/voice-agents/intelligent-interruption.webp'
          },
          feature4: {
            title: '完整业务闭环',
            subtitle: '端到端业务自动化',
            description: 'Zenava能直接执行任务，如创建工单、发送通知、查询信息等，让对话真正转化为可落地的业务动作',
            tags: ['任务执行', '业务自动化', '工单创建', '信息查询'],
            button: '了解更多',
            mediaAlt: '完整业务闭环功能演示',
            mediaPath: '/assets/images/voice-agents/business-loop.webp'
          }
        },
        customerCases: {
          title: '应用与量化效果',
          subtitle: '',
          case1: {
            tag: '厨电行业',
            title: '厨电客户实现大规模客户服务自动化，年节省总成本525万',
            subtitle: '年节省成本525万',
            description: 'Zenava独立处理产品咨询、报修、订单查询等大量重复性咨询，替代35个呼叫中心座席的工作量',
            features: [
              '年度节省成本约525万元',
              '项目ROI高达425%'
            ],
            button: '了解更多',
            imageAlt: '厨电客户服务自动化案例',
            imageSrc: '/assets/images/voice-agents/case-kitchen-appliances.webp'
          },
          case2: {
            tag: '汽车行业',
            title: '汽车客户使用Zenava接管试驾邀约，转化率提升至85%',
            subtitle: '转化率提升至85%',
            description: 'Zenava能够自动清洗客户线索，通过语音交互及时筛选有效客户，邀约高意向客户到店试驾',
            features: [
              '提高潜在客户的跟进效率，提升线索转化率，带动销量增长',
              '邀约转化率提升至85%'
            ],
            button: '了解更多',
            imageAlt: '汽车客户试驾邀约案例',
            imageSrc: '/assets/images/voice-agents/case-automotive.webp'
          },
          case3: {
            tag: '酒店行业',
            title: '酒店集团预订全流程无人化，大幅提升预订转化率',
            subtitle: '预订转化率提升15%-25%',
            description: 'Zenava独立完整执行从理解预订需求、确认时间与房型到完成预订的全流程',
            features: [
              '支持多语言沟通，覆盖全球客户',
              '预订转化率提升15%-25%'
            ],
            button: '了解更多',
            imageAlt: '酒店集团预订自动化案例',
            imageSrc: '/assets/images/voice-agents/case-hotel.webp'
          }
        }
      },
      liveChat: {
        banner: {
          src: '/assets/images/livechat/banner.webp',
          mobileSrc: '/assets/images/livechat/banner-mobile.webp',
          alt: 'LiveChat Banner'
        },
        advantages: {
          title: 'LiveChat的优势',
          card1: {
            title: '实时响应',
            subtitle: '秒级回复客户',
            desc: '7x24小时在线，智能路由分配，确保客户问题得到及时响应和处理'
          },
          card2: {
            title: '多渠道支持',
            subtitle: '统一管理所有渠道',
            desc: '支持网站、移动端、社交媒体等多种渠道，统一管理客户对话，提升服务效率'
          },
          card3: {
            title: '智能分析',
            subtitle: '数据驱动优化',
            desc: '实时分析客户对话数据，识别常见问题，优化服务流程，提升客户满意度'
          }
        },
        features: {},
        caseStudies: {
          title: '应用与量化效果',
          subtitle: '',
          case1: {
            mainTitle: 'B2B企业官网客服无人化接待，留资率高达46%',
            highlight: '留资率高达46%',
            description: 'Zenava在官网独立接待客户，自动进行线索的初步筛选和信息收集',
            points: [
              '全时段覆盖售前接待，实现官网客服无人化值守',
              '留资率高达46%，超过人工留资率40%',
              '产品业务知识分钟级更新，保障服务准确性和专业度'
            ],
            metric: '46%',
            metricLabel: '留资率',
            imageSrc: '/assets/images/livechat/case1-b2b.webp',
            imageAlt: 'B2B企业官网客服无人化接待',
            button: '了解更多',
            buttonLink: '/products/live-chat'
          },
          case2: {
            mainTitle: '智能锁客户实现端到端售后服务自动化，年节省总成本 621 万',
            highlight: '年节省总成本 621万',
            description: 'Zenava通过多轮对话结合图片精准识别，独立完成智能锁故障排查',
            points: [
              '独立接待率达到83%',
              '年节省总成本 621万'
            ],
            metric: '621万',
            metricLabel: '年节省成本',
            metric2: '83%',
            metric2Label: '独立接待率',
            imageSrc: '/assets/images/livechat/case2-smartlock.webp',
            imageAlt: '智能锁客户实现端到端售后服务自动化',
            button: '了解更多',
            buttonLink: '/products/live-chat'
          }
        },
        section3: {
          title: 'AI Agents for Chat',
          subtitle: '',
          item1: {
            mainTitle: '7×24小时全渠道在线',
            subtitle: '不错失与客户的每一次沟通',
            description: 'Zenava可以7×24小时在客户选择的渠道上与他们实时沟通，无论是网页、App、社交媒体还是消息应用，企业无需担心客户等待或错失商机，显著提升客户满意度与留存率',
            buttonText: '了解更多',
            imageAlt: '7×24小时全渠道在线',
            imageSrc: '/assets/images/livechat/omnichannel.webp'
          },
          item2: {
            mainTitle: '支持文字、图片、视频等富媒体沟通',
            subtitle: '精准识别客户意图',
            description: 'Zenava不仅能理解文字，还能理解图片、视频等多种形态的信息，提供丰富的对话体验，实现复杂多轮对话信息收集，精准识别客户意图，高效处理客户问题',
            buttonText: '了解更多',
            imageAlt: '富媒体沟通',
            imageSrc: '/assets/images/livechat/rich-media.webp'
          },
          item3: {
            mainTitle: '能够从表述中感知客户情绪',
            subtitle: '以友好、尊重的方式回应',
            description: 'Zenava通过性格建模具备语言理解与情绪感知能力，能够从表述中识别情绪，并以友好、尊重的方式回应，让客户感受到贴心和专业的服务体验',
            buttonText: '了解更多',
            imageAlt: '情绪感知',
            imageSrc: '/assets/images/livechat/emotion.webp'
          },
          item4: {
            mainTitle: '打造极致客户服务体验',
            subtitle: '灵活满足客户诉求',
            description: '在遵守企业业务底线和品牌规范的前提下，Zenava能够灵活满足客户个性化需求，使企业在保证安全与合规的同时提升客户体验',
            buttonText: '了解更多',
            imageAlt: '兼顾业务和体验',
            imageSrc: '/assets/images/livechat/balance.webp'
          },
          item5: {
            mainTitle: '具备同理心与判断力',
            subtitle: '驱动业务全流程闭环',
            description: 'Zenava具有同理心与判断力，在实际业务场景中，能够像人类员工一样调用工具，完成如发送短信、创建工单、查询客户资料以及邀约通知等任务，实现业务闭环',
            buttonText: '了解更多',
            imageAlt: '同理心与判断力',
            imageSrc: '/assets/images/livechat/empathy-jp.webp'
          }
        }
      }
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
    },

    // Banner 轮播翻译
    banners: {
      slide1: {
        siteName: 'ZENAVA',
        mainTitle: '企业级AI对话解决方案',
        description: '通过智能AI助手转变您的客户服务，提升客户体验，降低运营成本',
        buttonText: '预约咨询',
        imageAlt: '横幅图片1',
        src: '/assets/images/banners/slide1.webp',
        mobileSrc: '/assets/images/banners/slide1-mobile.webp'
      },
      slide2: {
        siteName: 'ZENAVA Sales',
        mainTitle: '智能销售赋能系统',
        description: 'AI驱动的销售智能化平台，精准客户画像分析，智能推荐销售策略，提升成单率缩短销售周期',
        buttonText: '了解销售方案',
        imageAlt: '智能销售系统界面',
        src: '/assets/images/banners/slide2.webp',
        mobileSrc: '/assets/images/banners/slide2-mobile.webp'
      },
      slide3: {
        siteName: '智能AI平台',
        mainTitle: '4345323',
        description: '43244444444',
        buttonText: '预约咨询',
        imageAlt: '智能AI平台展示',
        src: '/assets/images/banners/slide3.webp',
        mobileSrc: '/assets/images/banners/slide3-mobile.webp'
      },
      slide4: {
        siteName: 'ZENAVA',
        mainTitle: '7x24智能客服',
        description: 'AI智能客服系统实现全天候服务，自动处理常见问题，情感识别提升体验',
        buttonText: '查看详情',
        imageAlt: '智能客服',
        src: '/assets/images/banners/slide4.webp',
        mobileSrc: '/assets/images/banners/slide4-mobile.webp'
      },
      slide5: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: '营销活动Banner图',
        src: '/assets/images/banners/slide5.webp',
        mobileSrc: '/assets/images/banners/slide5-mobile.webp'
      },
      slide6: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: '营销活动Banner图',
        src: '/assets/images/banner-full-marketing.webp',
        mobileSrc: '/assets/images/banner-full-marketing-mobile.webp'
      }
    },
    
    // Common images and texts
    common: {
      logo: {
        src: '/assets/images/common/logo.webp',
        alt: 'Zenava Logo'
      },
      noImage: '暂无图片'
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