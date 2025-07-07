// src/layouts/smb/translations.js (example path)

export const translations = {
  en: {
    // SMBHeader
    navSolutions: "Solutions",
    navFeatures: "Features",
    navPricing: "Pricing",
    navResources: "Resources",
    navContact: "Contact",

    english: "English",
    spanish: "Spanish",
    languageSelectorLabel: "Language:",

    smbHeaderAction: "Back to LoyalShift",
    mobileMenu: "Mobile menu",
    languageSelectorLabel: "Language:",
    english: "EN",
    spanish: "ES",
    toggleNavigation: "Toggle navigation", // For accessibility if you have a mobile menu icon
    // SMBFooter
    footerText: `© ${new Date().getFullYear()} LoyalShift SMB. All rights reserved.`,
    // Example navigation links (if any in header)
    dashboard: "Dashboard",
    content: "Content",
    settings: "Settings",

    aoeCTA: {
      hero: {
        eyebrow: "Strategic Initiative",
        title: "Imagine Your Enterprise: Fully Autonomous, Entirely Secure.",
        subtitle:
          "Partner with LoyalShift to co-create a bespoke Autonomous Operations Engine (AOE) – an on-premise, AI-powered core that learns from your data, orchestrates your existing systems, and operates securely offline.",
        ctaButton: "Discuss Your Autonomous Vision",
      },
      roiCalculator: {
        title: "Calculate Your Potential ROI",
        subtitle:
          "Estimate the value an On-Premise Autonomous Operations Engine could bring to your business.",
        employeesLabel: "Number of Employees (Relevant Depts.)",
        employeesMin: "10",
        employeesMax: "500+",
        avgSalaryLabel: "Average Annual Salary (USD)",
        avgSalaryPlaceholder: "e.g., 65000",
        processesLabel: "Core Processes to Automate",
        processesOption: "{count} process",
        processesOptionPlural: "{count} processes",
        dataProcessedLabel: "Data Points Processed/Managed Annually (Est.)", // Kept from previous for consistency if used
        cloudCostLabel: "Current Annual Cloud/External AI Service Costs (USD)",
        cloudCostPlaceholder: "e.g., 15000",
        gpuOwnedLabel:
          "We own suitable NVIDIA GPUs (e.g., RTX A-series, Tesla, H100)",
        resultsTitle: "Your Estimated ROI with On-Premise AOE",
        resultsLaborSavings: "Annual Labor Savings (Est. 15% from Automation)",
        resultsCloudSavings: "Annual Cloud Service Savings (If GPUs owned)",
        resultsEfficiencyGains: "Annual Efficiency Gains (Process Value)",
        resultsDataValue: "Annual Value from Optimized Data", // Kept from previous
        resultsTotalAnnual: "Total Estimated Annual Value",
        resultsPayback: "Estimated Payback Period",
        resultsPaybackUnit: "months",
        results3YearValue: "Estimated 3-Year Net Value",
        resultsImplementationCost: "One-Time Implementation & Setup (Est.)",
        resultsGpuNote: "(+ Initial GPU Hardware if not owned)",
        resultsDisclaimer:
          "*Estimates are illustrative, based on typical deployments and industry averages. Actual ROI will vary.",
        ctaEstimateButton: "Get a Customized ROI Estimate",
      },
      explanationSelector: {
        title: "Understand the AOE: Tailored Explanations",
        businessOwnerButton: "For Business Owners",
        technicalLeadButton: "For Technical Leads",
        aiSpecialistButton: "For AI Specialists",
      },
      explanationBusiness: {
        title: "AOE: Drive Efficiency & Secure Your Future (Business View)",
        p1: "Imagine your core business operations running smoother, faster, and more reliably, 24/7. The Autonomous Operations Engine (AOE) is like giving your company an incredibly smart, dedicated internal team that learns your unique processes and makes optimal decisions on its own.",
        p2: "Crucially, this intelligence stays *within your company*. No sensitive data leaves your control. It's about boosting productivity, reducing errors, and gaining a significant competitive edge by making your existing systems work smarter, all while maintaining the highest security.",
        benefit1:
          "Increased Operational Efficiency: Automate complex tasks, reduce manual effort, and speed up critical workflows.",
        benefit2:
          "Enhanced Data Security: Keep all proprietary data and AI learning strictly on-premise, ideal for sensitive industries.",
        benefit3:
          "Reduced Operational Costs: Minimize errors, optimize resource use, and improve uptime.",
        benefit4:
          "Future-Proof Your Operations: Build a foundation for continuous improvement and adaptation without costly system overhauls.",
      },
      explanationTechnical: {
        title: "AOE: Architecture & Integration (Technical View)",
        p1: "The Autonomous Operations Engine (AOE) is a modular, on-premise AI solution designed for deep integration with your existing enterprise infrastructure. It leverages a secure, hardened AI core (CipherCore™) that performs offline learning and inference directly within your data center.",
        p2: "Connectivity to legacy systems (mainframes, AS/400, custom databases, SCADA/ICS) and modern applications is achieved via a specialized internal configuration of our Universal Adapter™. The AOE orchestrates pre-defined business functions and can trigger custom scripts or API calls based on its learned models and real-time internal data feeds.",
        feature1:
          "On-Premise Deployment: Full control over the physical and network environment of the AI module.",
        feature2:
          "Offline Learning & Inference: AI models are trained and operate without external internet connectivity, ensuring data sovereignty.",
        feature3:
          "Secure API & Adapter Framework: Robust interfaces for integrating with diverse internal systems and industrial control systems.",
        feature4:
          "Adaptive Orchestration Layer: The AOE's core logic dynamically adjusts workflows based on real-time conditions and historical performance data.",
      },
      explanationAI: {
        title: "AOE: AI Model & Learning Paradigm (AI Specialist View)",
        p1: "The Autonomous Operations Engine (AOE) employs a hybrid AI architecture, potentially combining explainable rule-based systems with advanced machine learning models (e.g., Reinforcement Learning, Time-Series Forecasting, Anomaly Detection) tailored to your specific operational domain. Models are trained exclusively on your proprietary, on-premise data.",
        p2: "Our offline learning paradigm focuses on continuous adaptation within your isolated environment. The AOE utilizes techniques for federated learning (if multiple internal nodes) or incremental learning to update models without data exfiltration. Explainability (XAI) components can be integrated to provide transparency into the AI's decision-making processes where required.",
        modelDetail1:
          "Customizable Model Architecture: Selection and fine-tuning of ML models (e.g., LSTMs for predictive maintenance, RL agents for process optimization, Graph Neural Networks for system interdependencies) based on specific use cases.",
        modelDetail2:
          "Secure Data Pipelines: Internal ETL processes for preparing and feeding data to the offline training and inference engine.",
        modelDetail3:
          "Physics-Informed AI (Optional): For relevant domains, incorporating domain knowledge and physical constraints into model training for enhanced robustness and safety.",
        modelDetail4:
          "Continuous Offline Improvement Loop: Mechanisms for model re-training, validation, and deployment within the secure enclave, driven by new internal operational data.",
      },
      need: {
        title: "The Enterprise Imperative: Intelligence Without Exposure",
        p1: "Many critical industries – manufacturing, energy, defense, finance – require advanced automation and AI-driven insights. However, the sensitive nature of their data and operations often precludes the use of cloud-based AI solutions due to security, compliance, or connectivity constraints.",
        p2: "The challenge is to harness the power of AI within a completely trusted, self-contained environment, enabling true operational autonomy while maintaining absolute data sovereignty.",
      },
      visionPillar1: {
        title: "Self-Learning & Optimization",
        desc: "An engine that continuously learns from your internal data to refine processes and predict outcomes, all within your secure environment.",
      },
      visionPillar2: {
        title: "Seamless Legacy Integration",
        desc: "Connect and orchestrate your existing systems, PLCs, and custom functions through secure, high-performance internal adapters.",
      },
      visionPillar3: {
        title: "Air-Gapped Security & Control",
        desc: "Operate with complete data sovereignty. No external cloud dependencies for core AI processing and decision-making.",
      },
      visionPillar4: {
        title: "Proactive & Predictive Operations",
        desc: "Move beyond reactive fixes to predictive maintenance and proactive process adjustments, minimizing downtime and maximizing efficiency.",
      },
      capability: {
        mainTitle: "LoyalShift's Blueprint for Your Autonomous Engine",
        mainSubtitle:
          "We provide the core technologies and expertise to build, deploy, and refine an AOE tailored to your unique operational landscape. Our approach focuses on secure on-premise deployment and integration with your existing infrastructure.",
      },
      capability1: {
        title: "CipherCore™ On-Premise AI",
        desc: "Our hardened, deployable AI module designed for secure, offline learning and execution tailored to your proprietary data.",
      },
      capability2: {
        title: "Universal Adapter™ (Internal Mode)",
        desc: "Specialized configurations for robust and secure integration with diverse internal systems, databases, and industrial controls.",
      },
      capability3: {
        title: "Adaptive Orchestration Engine",
        desc: "The intelligence layer that learns your operational workflows and orchestrates existing functions for autonomous execution.",
      },
      capability4: {
        title: "Enterprise-Grade Security Framework",
        desc: "Built with security at its core, ready for deployment in highly regulated and sensitive operational environments.",
      },
      process: {
        title: "Our Collaborative Co-Creation Process",
        subtitle:
          "Building an Autonomous Operations Engine is a strategic partnership. We work hand-in-hand with your team through a phased approach:",
        step1: {
          title: "1. Deep Dive & Strategic Alignment",
          desc: "Understanding your critical processes, existing systems, security protocols, and desired autonomous outcomes. Defining clear KPIs for success.",
        },
        step2: {
          title: "2. Secure AOE Blueprinting",
          desc: "Designing the architecture for your on-premise AOE, including data flow, AI model selection (or custom development), and integration points with legacy systems using Universal Adapter™.",
        },
        step3: {
          title: "3. Phased Deployment & Offline Learning",
          desc: "Iterative deployment of the AOE module, initial training on your historical data (offline), and integration with a subset of functions for validation.",
        },
        step4: {
          title: "4. Pilot Operations & Performance Tuning",
          desc: "The AOE begins managing select operations under supervision. Continuous monitoring, learning refinement, and performance tuning based on real-world results within your environment.",
        },
        step5: {
          title: "5. Scale to Full Autonomy & Ongoing Evolution",
          desc: "Gradual expansion of the AOE's scope to manage more processes autonomously. Establishing protocols for ongoing offline learning and future capability enhancements.",
        },
      },
      final: {
        title: "Let's Build the Future of Your Secure, Autonomous Enterprise.",
        subtitle:
          "If the vision of an AI-powered, on-premise engine that securely automates and optimizes your critical operations resonates with your strategic goals, we invite you to start a confidential discussion with our advanced solutions team.",
        ctaButton: "Initiate Strategic Dialogue",
        disclaimer:
          "All discussions are under strict NDA. We specialize in solutions for sensitive and regulated environments.",
      },
    },
    smbSolutions: {
      hero: {
        title: "Solutions Built for Your Business Growth",
        subtitle:
          "Discover how LoyalShift solves your biggest digital challenges with tailored solutions that deliver results.",
        cta1: "Explore SMB Studio",
        cta2: "Book a Demo",
      },
      spotlight: {
        eyebrow: "Integrated Platform",
        title: "All-in-One Digital Command Center",
        description:
          "LoyalShift SMB Studio consolidates content creation, asset management, analytics, and publishing in one intuitive platform designed to save time and amplify results.",
        feature1: "Content Creation Tools",
        feature2: "Asset Management Suite",
        feature3: "AI-Powered Assistance",
        feature4: "Analytics Dashboard",
        cta1: "Explore Studio Features",
        cta2: "View Pricing",
        tagline:
          "Everything you need to manage your digital presence in one place",
      },
      grid: {
        eyebrow: "Strategic Solutions",
        title: "Solve Your Business Challenges",
        subtitle:
          "Targeted approaches to your most pressing digital needs, designed for impact and ease of use.",
        learnMore: "Learn how",
        keyBenefitLabel: "Key Benefit",
      },
      solution1: {
        title: "Boost Your Online Visibility",
        description:
          "Get noticed with SEO-optimized content and strategic asset management that resonates with your target audience.",
        benefit: "Attract more qualified leads organically.",
      },
      solution2: {
        title: "Simplify Content Management",
        description:
          "Streamline your content workflow with intuitive tools for creation, organization, publishing, and scheduling.",
        benefit: "Save time and publish consistently with ease.",
      },
      solution3: {
        title: "Engage and Grow Your Audience",
        description:
          "Transform followers into loyal customers with insights-driven engagement strategies and communication tools.",
        benefit: "Build stronger customer relationships.",
      },
      cta: {
        title: "Ready to Transform Your Digital Presence?",
        subtitle: "Join thousands of SMBs growing with LoyalShift",
        cta1: "View Plans & Get Started",
        cta2: "Schedule a Personalized Demo",
      },
    },
    smbFeatures: {
      mainHeading: "LoyalShift SMB Studio Features",
      mainSubheading:
        "Discover the powerful, integrated tools designed to help your small or medium business thrive online. Effortlessly manage your content, assets, analytics, and more.",
      featureBlogEditor: {
        title: "Advanced Blog Editor",
        description:
          "Create stunning, engaging blog posts with our intuitive rich text editor, featuring multimedia embedding, custom formatting, and AI-powered writing assistance.",
      },
      featureCentralLibrary: {
        title: "Centralized Digital Asset Library",
        description:
          "Store, organize, and manage all your brand images, videos, documents, and AI-generated assets in one secure, easily searchable location.",
      },
      featureUnifiedDashboard: {
        title: "Unified Analytics Dashboard",
        description:
          "Track key performance indicators from your website, blog, social media, and sales channels all in one customizable dashboard.",
      },
      featureSeoTools: {
        title: "Built-in SEO Toolkit",
        description:
          "Optimize your content for search engines directly within the editor. Get real-time feedback.",
      },
      featureScheduling: {
        title: "Content Scheduling & Calendar",
        description:
          "Plan your content strategy with our visual calendar. Schedule posts for optimal timing.",
      },
      featureVeoVideoGen: {
        title: "AI Video Generation (Veo Integration)",
        description:
          "Create stunning, professional-quality videos from text prompts using Google's Veo technology.",
      },
      featureInstagramInsights: {
        title: "Deep Instagram Insights",
        description:
          "Understand your Instagram audience, content performance, and profile engagement.",
      },
      cta: {
        title: "Ready to Power Up Your Business with LoyalShift Studio?",
        subtitle:
          "Explore all these features and more. Start simplifying your workflow and amplifying your results today.",
        getStarted: "View Pricing & Get Started",
        requestDemo: "Request a Demo",
      },
    },
    smbPlatformFeatures: {
      // Reusing some keys for consistency if they match
      featuresMainTitle: "Everything Your SMB Needs to Shine",
      benefitsSummaryTitle: "Unlock Key Benefits for Your Business",
      benefitItemTime:
        "Save precious time with automated and streamlined processes.",
      benefitItemAffordable:
        "Access enterprise-grade tools at an SMB-friendly price.",
      benefitItemGrowth: "Scale your digital efforts as your business grows.",
      benefitItemEasy:
        "Easy-to-use interface, no deep technical expertise required.",
      benefitItemLocal:
        "Local understanding with global technology standards (if applicable).",
    },
    smbPricing: {
      hero: {
        title: "SMB Digital Transformation Initiative",
        subtitle:
          "Get your business online with a professional homepage and start automating your operations",
      },
      initiative: {
        name: "SMB Initiative",
        frequency: "/one-time",
        description:
          "Get your business online with a professional homepage + 1 month of full platform access",
        cta: "Get Started - $599", // This key is used for the button text
        ctaTextPlaceholder: "Get Started Today", // Fallback if cta key not found
      },
      smbPlan: {
        name: "SMB Plan",
        frequency: "/month",
        description: "Full platform access with premium features and support",
        cta: "Subscribe Now - $59/mo", // This key is used for the button text
        ctaTextPlaceholder: "Choose This Plan", // Fallback if cta key not found
      },
      enterprise: {
        name: "Enterprise Solutions",
        price: "Custom",
        description:
          "Tailored solutions for large organizations with custom requirements",
        cta: "Contact Sales", // This key is used for the button text
        ctaTextPlaceholder: "Discuss Enterprise Needs", // Fallback
        includes: "Key Enterprise Features:", // Updated to be more descriptive
      },
      sectionTitle: "Simple, Transparent Pricing",
      sectionSubtitle: "Choose the option that works best for your business",
      mostPopular: "RECOMMENDED",
      includes: "What you get:", // Changed from "Includes:"
      features: {
        homepage: "Custom homepage implementation",
        legacyApps: "Connect up to 2 legacy applications/databases",
        fullStudioMonth: "Full Studio access for 1 month",
        fullStudioAccess: "Full Studio access",
        workflows: "Up to 50 workflow executions",
        templates: "Access to pre-built workflow templates",
        support: "Implementation support",
        studioLite: "Studio Lite access after first month",
        advanced: "Advanced content management",
        analytics: "Enhanced analytics dashboard",
        priority: "24/7 priority support",
        unlimited: "Unlimited workflow executions",
        invoices: "Invoice management system",
        allTemplates: "All workflow templates",
        customApps: "Custom application connectors",
        dedicated: "Dedicated implementation team",
        enterpriseSecurity: "Enterprise-grade security",
        sla: "Custom service level agreements",
        customDev: "Custom development services",
        training: "Onsite training",
      },
      cta: {
        // Final page CTA
        title: "Ready to Transform Your Business?",
        subtitle: "Join our SMB Initiative and get your business online today",
        initiativeButton: "Start Your Kickstart", // For the final CTA button specifically
        demoButton: "Schedule a Demo",
      },
    },
    value: {
      // Value Proposition Section
      proposition1: "Professional Homepage",
      detail1:
        "Get a custom, mobile-friendly homepage that represents your business",
      proposition2: "1 Month Full Access",
      detail2:
        "Automate processes and connect your systems with our full platform",
      proposition3: "Ongoing Lite Access",
      detail3:
        "Manage your content and view invoices with Studio Lite after your first month",
    },
    howItWorks: {
      // How It Works Section
      title: "How Our SMB Initiative Works",
      step1: {
        title: "Sign Up",
        detail: "Choose the $599 SMB Initiative to get started",
      },
      step2: {
        title: "Homepage Setup",
        detail: "We implement your professional business homepage",
      },
      step3: {
        title: "Full Access Month",
        detail:
          "Connect systems and automate processes with full platform access",
      },
      step4: {
        title: "Ongoing Access",
        detail:
          "Continue with Studio Lite or upgrade to the SMB Plan for full features",
      },
    },
    faq: {
      // FAQ Section
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about our SMB Initiative",
      question1: "What exactly do I get with the $599 SMB Initiative?",
      answer1:
        "The $599 SMB Initiative includes: 1) A professionally designed homepage for your business, 2) Full access to our platform for 1 month to connect your systems and automate workflows, and 3) Continued access to Studio Lite after the first month to manage your content and view invoices.",
      question2: "What is Studio Lite?",
      answer2:
        "Studio Lite is our free version that allows you to manage basic content on your homepage and view invoices. It's included after your first month of the SMB Initiative. If you need more advanced features, you can upgrade to the $59/month SMB Plan.",
      question3: "What's included in the $59/month SMB Plan?",
      answer3:
        "The SMB Plan gives you full access to all Studio features including advanced content management, analytics, unlimited workflow executions, and 24/7 priority support. It also includes our invoice management system.",
      question4: "Can I upgrade from Studio Lite to the SMB Plan later?",
      answer4:
        "Yes! At any time after your first month, you can upgrade to the SMB Plan to get full access to all features and support.",
    },

    blogNew: {
      // Page Titles & General
      title: "Create New Blog Post", // This would be t("blogNew.titleCreate") in the editor for new
      titleCreate: "Create New Blog Post",
      titleEdit: "Edit Blog Post",
      aiAssetUploadTab: "Upload Manually",
      aiVeoGenerationTab: "Generate with Veo",
      aiAssetLibraryTab: "From Library", // New
      aiAssetDriveTab: "From Drive", // New

      browseLibraryButton: "Browse Your Asset Library",
      connectDriveButton: "Connect & Select from Google Drive",
      libraryPlaceholderText:
        "Your asset library integration will appear here.", // New
      drivePlaceholderText:
        "Google Drive file picker integration will appear here.", // New
      assetSourceVeo: "AI (Veo)", // For displaying asset source
      assetSourceUpload: "Uploaded",
      assetSourceLibrary: "Library",
      assetSourceDrive: "Drive",
      noAssetsSelected: "No assets added or generated for this post yet.",

      // Sections Titles (used in FormSection)
      section: {
        mainContent: {
          title: "Main Content",
        },
        seo: {
          title: "SEO Settings",
        },
        publish: {
          title: "Publishing Details",
        },
        actions: {
          title: "Final Actions",
        },
        aiStudio: {
          // New parent key for AI sections
          title: "AI Content & Asset Studio",
        },
        aiSeoAssistant: {
          title: "AI SEO Assistant",
        },
      },

      // Form Fields: Labels, Placeholders, Notes
      field: {
        title: {
          label: "Post Title",
          placeholder: "Enter post title...",
        },
        content: {
          label: "Content",
          placeholder: "Start writing your amazing blog post here...",
          editorNote:
            "Tip: Use Markdown or integrate a WYSIWYG editor for rich formatting.",
        },
        excerpt: {
          label: "Excerpt (Optional)",
          placeholder: "A short summary of your post...",
        },
        metaTitle: {
          label: "Meta Title",
          placeholder: "SEO friendly title (max 60 chars)",
        },
        metaDescription: {
          label: "Meta Description",
          placeholder: "SEO friendly description (max 160 chars)",
        },
        slug: {
          label: "Permalink / Slug",
          placeholder: "e.g., my-awesome-post-title",
          note: "URL-friendly version of your title. Auto-generated if left blank.",
        },
        status: {
          label: "Status:",
        },
        featuredImage: {
          label: "Featured Image",
          altPreview: "Featured image preview",
          changeButton: "Change Image", // Added based on refined editor UI
          removeButton: "Remove Image", // Added based on refined editor UI
        },
        categories: {
          label: "Categories", // User's code had "Categories (comma-separated)"
          placeholder: "e.g., Marketing, SMB Tips",
          note: "Comma-separated",
        },
        tags: {
          label: "Tags", // User's code had "Tags (comma-separated)"
          placeholder: "e.g., seo, content strategy",
          note: "Comma-separated",
        },
        publishAction: {
          label: "Choose action:",
          publishNow: "Publish Now",
          schedule: "Schedule",
        },
        scheduleTime: {
          label: "Schedule Date & Time",
        },
      },

      // Status Values (for display and dropdowns)
      statusValue: {
        draft: "Draft",
        publish: "Publish Now", // Changed from "Published" to match button text
        schedule: "Schedule for Later", // Changed from "Scheduled"
        published: "Published", // For display after publishing
      },

      // Buttons
      button: {
        saveDraft: "Save Draft",
        hidePublishOptions: "Hide Publish Options",
        showPublishOptions: "Publish / Schedule...",
        schedulePost: "Schedule Post",
        publishPost: "Publish Post",
        updatePost: "Update Post", // Added for editing mode
      },

      // AI Studio Section
      aiPromptLabel: "Your Core Idea / Prompt",
      aiPromptPlaceholder:
        "e.g., 'The benefits of local SEO for coffee shops in Costa Rica'",
      aiRefinePromptButton: "Refine Prompt with AI",
      aiGenerateBlogButton: "Generate Draft with Gemini",
      aiGeneratedContentTitle: "AI-Generated Draft",
      aiUseThisTitleButton: "Use This Title",
      aiUseThisContentButton: "Use This Content",
      aiUseThisExcerptButton: "Use This Excerpt",

      // AI Asset Studio Section
      aiAssetStudioTitle: "AI Asset Generation & Management", // Added key for consistency
      aiVeoPromptLabel: "Visual Prompt for Veo",
      aiVeoPromptPlaceholder:
        "e.g., 'A cozy Costa Rican coffee shop interior, morning light'",
      aiGenerateAssetsButton: "Generate Visuals with Veo",
      aiGeneratedAssetsTitle: "Generated / Uploaded Assets",
      aiSetAsFeaturedButton: "Set as Featured",
      aiInsertIntoContentButton: "Insert into Content (Conceptual)", // As it was conceptual
      aiAssetUploadTab: "Upload Manually",
      aiVeoGenerationTab: "Generate with Veo",
      featuredImageUploadButton: "Upload Image", // From user's original FormSection for featured image

      // AI SEO Assistant Section
      aiSeoAssistantTitle: "AI SEO Assistant", // Already in FormSection titleKey
      aiAnalyzeContentButton: "Analyze & Suggest SEO",
      aiSuggestedMetaTitle: "Suggested Meta Title:",
      aiSuggestedMetaDescription: "Suggested Meta Description:",
      aiSuggestedKeywords: "Suggested Keywords/Tags:",
      aiUseSuggestionButton: "Use Suggestion",

      // AI Status / Feedback Messages
      generatingText: "Generating, please wait...",
      refiningText: "Refining...",
      analyzingText: "Analyzing...",

      // Submission Status Messages
      savingStatus: "Saving Draft...",
      publishingStatus: "Publishing Post...",
      updatingStatus: "Updating Post...", // Added for editing mode
      schedulingStatus: "Scheduling Post...", // Added for clarity

      // Error Messages
      error: {
        titleRequired: "Post title is required.",
        scheduleDateRequired:
          "Please select a date and time to schedule the post.",
        promptRequired: "Please enter a prompt or idea for AI generation.",
        veoPromptRequired: "Please enter a prompt for Veo asset generation.",
        contentNeededForSeo:
          "Please provide a title or content to generate SEO suggestions.",
      },

      // Success Messages
      success: {
        draftSaved: "Draft saved successfully!",
        published: "Post published successfully!",
        scheduled: "Post scheduled for {scheduledAt}!", // Example with placeholder
        actionCompleted: "Action completed successfully!", // Generic
        updated: "Post updated successfully!", // Added for editing mode
      },
    },
    solutionsCipherForge: {
      pageTitle: "CipherForge™ | Quantum-Secure Confidential Computing",
      pageHeaderTitle: "CipherForge™ Solution", // For the simple page header
      backToSolutions: "All Solutions",

      // Hero Section
      heroTitle: "CipherForge™: Unbreachable Security for a New Era",
      heroSubtitle:
        "Empower your enterprise with mathematically guaranteed privacy and quantum-resistant confidential computing. Protect data in use, unlock secure AI collaboration, and future-proof your digital assets.",
      heroCtaConsultation: "Schedule Security Consultation",
      heroCtaWhitepaper: "Download Technical White Paper",

      // The Challenge Section
      challengeTitle: "The Evolving Threat to Your Most Valuable Asset: Data",
      challengeP1:
        "In an era of distributed systems and collaborative AI, traditional security perimeters are no longer sufficient. Sensitive data, especially when being processed or shared, faces unprecedented risks.",
      challengeP2:
        "Furthermore, the dawn of quantum computing poses an existential threat to current encryption standards, potentially rendering years of security investments obsolete overnight.",
      challengeP3:
        "Organizations need a proactive, resilient, and provably secure approach to data protection.",

      // Introducing CipherForge Section
      introTitle: "CipherForge™: Your Shield in the Digital Frontier",
      introText:
        "LoyalShift's CipherForge™ is a revolutionary confidential computing platform engineered to provide absolute data sovereignty. By leveraging cutting-edge cryptographic techniques, we ensure your data remains encrypted and verifiably private—at rest, in transit, and crucially, during active computation, even in untrusted environments.",
      missionText:
        "Our Mission: To make privacy breaches and data misuse mathematically impossible in distributed AI and collaborative computing.",
      visionText:
        "Our Vision: To set the global standard for quantum-secure confidential computing and verifiable data privacy by 2027.",

      // Core Principles & Technologies Section
      corePrinciplesTitle:
        "Built on a Foundation of Unbreakable Trust & Innovation",
      principleFheTitle: "Fully Homomorphic Encryption (FHE)",
      principleFheDesc:
        "Perform complex computations directly on encrypted data without ever needing to decrypt it. Ideal for secure cloud processing and privacy-preserving analytics.",
      principleMpcTitle: "Secure Multi-Party Computation (MPC)",
      principleMpcDesc:
        "Enable multiple parties to jointly compute functions over their private data without revealing the data itself to others. Perfect for collaborative AI and data sharing.",
      principleTeeTitle: "Trusted Execution Environments (TEEs)",
      principleTeeDesc:
        "Utilize hardware-based secure enclaves to isolate and protect code and data in use, even from privileged system software.",
      principleQrcTitle: "Quantum-Resistant Cryptography (QRC)",
      principleQrcDesc:
        "Employ next-generation algorithms designed to withstand attacks from future quantum computers, ensuring long-term data security.",

      // Transformative Benefits Section
      benefitsTitle: "Transformative Benefits for Your Enterprise",
      benefit1Title: "Unprecedented Data Security",
      benefit1Desc:
        "Protect sensitive information throughout its lifecycle with end-to-end encryption, including data in use.",
      benefit2Title: "Unlock Collaborative AI",
      benefit2Desc:
        "Facilitate privacy-preserving AI model training and inference across organizations without sharing raw data.",
      benefit3Title: "Mathematical Guarantees",
      benefit3Desc:
        "Achieve verifiable proofs of privacy and integrity, moving beyond policy-based security assurances.",
      benefit4Title: "Future-Proof Investments",
      benefit4Desc:
        "Mitigate risks from emerging quantum threats with advanced quantum-resistant algorithms.",
      benefit5Title: "Build Digital Trust",
      benefit5Desc:
        "Enhance trust with customers and partners by demonstrating a provable commitment to data protection.",
      benefit6Title: "Enable New Business Models",
      benefit6Desc:
        "Create new revenue streams and collaborative opportunities based on secure and private data sharing.",

      // Industry Applications Section
      applicationsTitle: "CipherForge™ in Action: Industry Use Cases",
      industryGovernment: "Government & National Security",
      industryFinance: "Finance & Banking",
      industryHealthcare: "Healthcare & Life Sciences",
      industryDefense: "Defense & Aerospace",
      industryCloud: "Cloud Providers & Platforms",
      // Use Case Example (Government)
      useCaseGovTitle: "Secure Multi-Agency Intelligence Sharing",
      useCaseGovProblem:
        "Agencies need to collaborate on sensitive intelligence but are hampered by data sovereignty, classification levels, and breach risks.",
      useCaseGovSolution:
        "CipherForge™ creates a secure MPC environment. Agencies contribute encrypted data; joint analytical models run on this encrypted data using FHE and TEEs. Quantum-resistant protocols ensure long-term security.",
      useCaseGovOutcome:
        "Improved threat detection by 40% via timely, secure intelligence fusion without compromising data ownership, with verifiable audit trails.",
      // ... (define similar problem, solution, outcome keys for other use cases: Finance-Fraud, Healthcare-Research) ...
      viewMoreUseCases: "View More Use Cases",
      viewLessUseCases: "View Less",

      // Why LoyalShift's CipherForge Section
      whyCipherForgeTitle: "The LoyalShift Advantage: Why CipherForge™?",
      whyItemExpertise: "Deep Cryptographic & AI Expertise",
      whyItemExpertiseDesc:
        "Our team comprises leading researchers in applied cryptography, confidential computing, and AI integration.",
      whyItemEnterpriseGrade: "Enterprise-Grade Implementation",
      whyItemEnterpriseGradeDesc:
        "We deliver reliable, scalable, and manageable security solutions for complex enterprise environments.",
      whyItemEcosystem: "Integrated LoyalShift Ecosystem",
      whyItemEcosystemDesc:
        "CipherForge™ seamlessly integrates with Audit Guardian™ for verifiable compliance and Universal Adapter™ for secure data ingestion.",
      whyItemVisionary: "Future-Focused & Resilient",
      whyItemVisionaryDesc:
        "We are committed to pioneering post-quantum security, ensuring your data remains protected for decades.",

      // Final CTA Section
      finalCtaTitle: "Secure Your Data's Future. Today.",
      finalCtaSubtitle:
        "The transition to a privacy-first, quantum-resistant security posture is a strategic imperative. LoyalShift's CipherForge™ provides the technology and expertise to lead with confidence.",
      finalCtaButtonPrimary: "Request a Confidential Briefing",
      finalCtaButtonSecondary: "Explore Technical Documentation",
    },
    aboutUs: {
      heroPhase1: "Bridging Legacy & Future",
      heroPhase2: "Intelligent Modernization",
      heroPhase3: "Transformation Without Disruption",
      heroTitleMain: "Modernizing Enterprise Systems,",
      heroTitleAccent: "Respecting Your Legacy",
      heroSubtitle:
        "LoyalShift bridges the gap between decades of established operations and the potential of future-proof AI, enabling transformation without disruption.",

      purposeSectionAriaLabel: "Our Purpose",
      purposeTitle: "Our Purpose",
      purposeSubtitle: "Why We Exist",
      purposeText:
        "We believe technology should empower, not hinder. Our purpose is to unlock the vast potential trapped within legacy systems.",
      missionTitle: "Mission",
      missionText:
        "To transform outdated business systems into agile, AI-powered operations without disruption.",
      visionTitle: "Vision",
      visionText:
        "A future where no business is held back by its technological past.",
      valuesTitle: "Core Values",
      coreValue1: "Zero-Disruption Modernization",
      coreValue2: "Explainable AI Automation",
      coreValue3: "Future-Proof Architecture",
      coreValue4: "Uncompromising Security",
      coreValue5: "Transparent Partnership",
      coreValue6: "Respect for Legacy",

      approachTitle: "Our Approach",
      approachSubtitle: "Intelligent Modernization",
      approachText:
        "We combine deep system understanding with cutting-edge, explainable AI to work alongside your existing infrastructure.",
      approachVisualPlaceholder: "Visual representing AgentHub & modernization",
      approachFeature1Title: "Zero-Disruption with Smart Mirror™",
      approachFeature1Content:
        "Safely test changes against live data in a parallel environment before deployment.",
      approachFeature2Title: "Universal Adapter™ Connectivity",
      approachFeature2Content:
        "Seamlessly integrate legacy sources with modern applications without complex re-engineering.",
      approachFeature3Title: "Audit Guardian™ Compliance",
      approachFeature3Content:
        "Ensure security and compliance with traceable AI actions for standards like SOC2 and HIPAA.",

      peopleTitle: "Our People",
      peopleSubtitle: "Expertise & Collaboration",
      peopleText:
        "A diverse team of seasoned AI researchers, system integrators, and enterprise architects united by a passion for solving complex legacy challenges.",
      joinTeamButton: "Join Our Team",

      socialProofTitle: "Proven Results",
      socialProofSubtitle: "Client Success",
      socialProofTrustedBy: "Trusted By Industry Leaders",
      socialProofQuote:
        '"LoyalShift\'s approach minimized risk and delivered value far faster than we thought possible."',
      socialProofQuoteAuthor: "— Head of IT, Global Logistics Firm",

      finalCtaTitleMain: "Ready to Modernize",
      finalCtaTitleAccent: "Without Disruption?",
      finalCtaSubtitle:
        "Discover how our unique approach delivers measurable results with guaranteed security and a seamless transition.",
      talkToSalesButton: "Talk to Sales",
      requestDemoButton: "Request Demo",
    },
    aboutUsSMB: {
      sectionTitle: "Empowering Small & Medium Businesses",
      sectionSubtitle: "Dedicated Solutions for Your Growth",
      introTextP1:
        "At LoyalShift, we believe in the power and potential of Small and Medium Businesses (SMBs). That's why we've developed a dedicated suite of tools and services tailored to meet your unique needs and budget, helping you thrive in the digital landscape of Costa Rica.",
      introTextP2:
        "Our SMB initiative is built on the principle of providing accessible, powerful, and easy-to-use digital solutions.",

      studioTitle: "Introducing the LoyalShift SMB Studio",
      studioText:
        "Powered by our versatile AgentHub module, the SMB Studio is your intuitive command center. It simplifies managing your professional website, engaging with customers, and understanding your online performance.",

      starterPlanTitle: "Your Journey Starts Here: The One-Month Starter Plan",
      starterPlanText:
        "New SMB clients begin with our affordable one-month starter plan. This plan gets you a professionally designed website foundation and access to **SMB Studio Lite** – a streamlined version of our studio with essential tools to manage your core online presence, including:",
      studioLiteFeature1:
        "Easy Content Updates: Effortlessly edit text and images on your website.",
      studioLiteFeature2:
        "Basic Blog Management: Start sharing your expertise and connecting with your audience.",
      studioLiteFeature3:
        "Contact Form Integration: Capture leads directly from your site.",
      studioLiteFeature4:
        "Mobile-Responsive Design: Ensure your site looks great on all devices.",

      fullStudioTitle: "Unlock Full Potential with SMB Studio",
      fullStudioText:
        "After your initial month, continue with the full SMB Studio to access an expanded suite of features designed for ongoing growth and efficiency:",
      studioFeature1:
        "Advanced Content Management: More control over your website structure and content types.",
      studioFeature2:
        "Comprehensive Blogging Tools: Including categories, tags, and SEO assistance.",
      studioFeature3:
        "Lead Management & Basic CRM: Organize and track your customer interactions.",
      studioFeature4:
        "Analytics Dashboard: Understand your website traffic and visitor behavior.",
      studioFeature5:
        "Asset Library: Manage all your digital images and files in one place.",
      studioFeature6:
        "AI-Powered Assistance: Leverage tools (like Gemini integration for content) to save time and enhance quality (features vary by plan).",

      ctaTitle: "Ready to Elevate Your SMB?",
      ctaButton: "Explore SMB Solutions",
      ctaLink: "/smb", // Or your specific SMB landing page path
    },
    smbContact: {
      pageTitle: "Contact Us | LoyalShift SMB",
      mainTitle: "Let's Talk About Your Business",
      mainSubtitle:
        "We're excited to learn about your SMB and how we can help you thrive online. Fill out the form or schedule a call directly.",

      // Form Section
      formTitle: "Send Us a Message",
      formNameLabel: "Full Name",
      formNamePlaceholder: "e.g., Ana Rodriguez",
      formEmailLabel: "Email Address",
      formEmailPlaceholder: "you@example.com",
      formCompanyLabel: "Company Name (Optional)",
      formCompanyPlaceholder: "e.g., Mi Cafecito Ideal",
      formIndustryLabel: "Your Industry",
      formIndustrySelectDefault: "Select your industry...",
      formIndustryOptionRetail: "Retail / E-commerce",
      formIndustryOptionFood: "Food & Beverage / Restaurant",
      formIndustryOptionServices:
        "Professional Services (Consulting, Legal, etc.)",
      formIndustryOptionHealth: "Health & Wellness (Salud y Bienestar)",
      formIndustryOptionTourism: "Tourism & Hospitality (Turismo y Hotelería)",
      formIndustryOptionManufacturing:
        "Manufacturing / Crafts (Manufactura / Artesanía)",
      formIndustryOptionEducation: "Education (Educación)",
      formIndustryOptionOther: "Other (Otro)",
      formContextLabel: "What are you looking for? (add tags)",
      formContextPlaceholder:
        "Type a need (e.g., New Website) and press Enter...",
      formContextTagLimit: "You can add up to 5 tags.",
      formMessageLabel: "Your Message (Optional)",
      formMessagePlaceholder:
        "Tell us a bit more about your project, questions, or specific needs...",
      formSubmitButton: "Send Message & Proceed",
      formSubmittingButton: "Sending...",
      formSubmitSuccess:
        "Message sent! We'll be in touch soon. You can now schedule a call below.",
      formSubmitError:
        "Oops! Something went wrong. Please try sending your message again.",

      // Calendly Section
      calendlyTitle: "Schedule Your Free Consultation",
      calendlyText:
        "Pick a time that works best for you to chat with one of our SMB specialists. We'll discuss your goals and how LoyalShift can help.",
      calendlyLoading: "Loading scheduling options...",

      // Enterprise CTA Section
      enterpriseCtaText:
        "Are you an enterprise-level business or looking for larger-scale custom solutions?",
      enterpriseCtaButton: "Contact Our Main Sales Team",
    },
    smbStudioAnalytics: {
      pageTitle: "Analytics Dashboard | SMB Studio",
      mainTitle: "Your Business Performance",
      mainSubtitle:
        "Track key metrics and understand how your audience engages with your online presence.",

      dateRangeLabel: "Date Range:",
      last7Days: "Last 7 Days",
      last30Days: "Last 30 Days",
      last90Days: "Last 90 Days",
      customRange: "Custom", // For a date picker

      // KPI Cards
      kpiTotalVisitors: "Total Visitors",
      kpiPageViews: "Page Views",
      kpiBounceRate: "Bounce Rate",
      kpiAvgSessionDuration: "Avg. Session",
      kpiNewLeads: "New Leads", // Example if lead tracking is a feature
      kpiConversionRate: "Conversion Rate", // Example

      // Sections
      websiteTrafficSectionTitle: "Website Traffic Overview",
      trafficOverTimeChartTitle: "Visitors Over Time",
      trafficSourcesChartTitle: "Top Traffic Sources",
      trafficSourceOrganic: "Organic Search",
      trafficSourceDirect: "Direct",
      trafficSourceReferral: "Referral",
      trafficSourceSocial: "Social Media",
      trafficSourceOther: "Other",

      contentPerformanceSectionTitle: "Content Performance",
      topPagesTableTitle: "Top Performing Pages & Posts",
      pageColumnHeader: "Page / Post Title",
      viewsColumnHeader: "Views",
      engagementColumnHeader: "Avg. Engagement", // e.g., time on page or scroll depth

      audienceInsightsSectionTitle: "Audience Insights",
      newVsReturningChartTitle: "New vs. Returning Visitors",
      audienceNewVisitors: "New Visitors",
      audienceReturningVisitors: "Returning Visitors",
      // Could add more like top countries if data is available

      // General / Placeholders
      chartPlaceholderText: "Chart data will appear here.",
      tableNoData: "No data available for this period.",
      comingSoon: "More detailed analytics coming soon!",
      selectPeriod: "Select a period to view data.",
    },
    smbBlogEditor: {
      pageTitleCreate: "Create New Blog Post",
      pageTitleEdit: "Edit Blog Post",
      // Main Content Area
      titleLabel: "Post Title",
      titlePlaceholder: "Enter your catchy post title here...",
      contentLabel: "Main Content",
      contentPlaceholder: "Start writing your amazing blog post...", // For textarea, RTE would have its own
      // Settings Sidebar
      publishOptionsTitle: "Publish Options",
      settingsTitle: "Post Settings",
      statusLabel: "Status:",
      statusDraft: "Draft",
      statusPublished: "Published",
      statusScheduled: "Scheduled",
      visibilityLabel: "Visibility:",
      visibilityPublic: "Public",
      visibilityPrivate: "Private", // e.g., for internal review before publishing
      publishDateLabel: "Publish Date:",
      publishImmediately: "Immediately",
      scheduleButton: "Schedule...", // Opens date picker concept
      categoriesLabel: "Categories",
      categoriesPlaceholder: "e.g., Business Tips, News (comma-separated)",
      tagsLabel: "Tags",
      tagsPlaceholder: "e.g., marketing, smb, costa rica",
      excerptLabel: "Excerpt (Optional)",
      excerptPlaceholder: "A short summary for post previews...",
      featuredImageLabel: "Featured Image",
      featuredImageUploadButton: "Upload Image",
      featuredImageChangeButton: "Change Image",
      featuredImageRemoveButton: "Remove",
      seoSettingsTitle: "SEO & Sharing",
      slugLabel: "Post Slug (URL)",
      slugPlaceholder: "your-post-title-here",
      metaTitleLabel: "Meta Title (SEO)",
      metaTitlePlaceholder: "Optimal title for search engines...",
      metaDescriptionLabel: "Meta Description (SEO)",
      metaDescriptionPlaceholder: "Compelling summary for search results...",
      // AI Assistant Section
      aiAssistantTitle: "AI Writing Assistant (Gemini)",
      aiGenerateTitleButton: "Suggest Titles",
      aiDraftSectionButton: "Draft Section",
      aiImproveTextButton: "Refine Writing",
      aiSummarizeButton: "Create Excerpt",
      aiSeoOptimizeButton: "Suggest SEO Meta",
      aiGenerating: "Generating...",
      // Action Buttons
      saveDraftButton: "Save Draft",
      publishButton: "Publish",
      updateButton: "Update Post",
      savingStatus: "Saving...",
      publishingStatus: "Publishing...",
      updatingStatus: "Updating...",
    },

    pricing: {
      enterprise: {
        description:
          "If you are a higher grade enterprise with more complex and specific needs, please visit our enterprise solutions.",
      },
      value: {
        fastImplementation: "Fast Implementation",
        fastImplementationDesc:
          "Get up and running quickly with our streamlined onboarding and efficient platform deployment.",
        globalCompliance: "Global Compliance Ready",
        globalComplianceDesc:
          "Built with international standards in mind, ensuring your data handling meets rigorous compliance requirements.",
        dedicatedSupport: "Dedicated Support",
        dedicatedSupportDesc:
          "Access expert assistance from our dedicated support team, ready to help you succeed every step of the way.",
      },
    },

    smbPlatformFeatures: {
      pageTitle: "SMB Studio Features | LoyalShift SMB", // For SEO/browser tab

      // Hero Section
      heroTitle: "Simple Tools, Powerful Results for Your Business",
      heroSubtitle:
        "Discover the features of the LoyalShift SMB Studio, designed to make managing your online presence easy, effective, and stress-free.",
      heroCtaButton: "Explore Features Below",

      // Intro Section
      introTitle: "Manage Your Digital World, Effortlessly",
      introTextP1:
        "Our SMB Studio provides you with intuitive control over your website, content, customer interactions, and more – all in one accessible platform.",
      introTextP2:
        "Specifically designed for the dynamic needs of SMB owners in Costa Rica, we help you save time and focus on what you do best: running your business.",

      // Features Section
      featuresMainTitle: "Key Features of Your SMB Studio",

      featureWebsiteMgmtTitle: "Easy Website Editor",
      featureWebsiteMgmtText:
        "Update your website's text, images, and essential information instantly. No technical skills required to keep your online storefront fresh and engaging.",
      featureWebsiteMgmtBenefit:
        "Benefit: Always present an up-to-date and professional image online.",

      featureBlogTitle: "Integrated Blogging Tools",
      featureBlogText:
        "Create, schedule, and publish insightful blog posts directly from your studio. Share your expertise, connect with your audience, and boost your site's SEO.",
      featureBlogBenefit:
        "Benefit: Attract more visitors and establish thought leadership.",

      featureLeadsTitle: "Simple Lead Management",
      featureLeadsText:
        "Capture inquiries from your website forms and keep track of potential customer interactions in an organized manner.",
      featureLeadsBenefit:
        "Benefit: Never miss an opportunity to connect with a potential customer.",

      featureAnalyticsTitle: "Basic Analytics Dashboard",
      featureAnalyticsText:
        "Get a clear overview of your website traffic: see how many visitors you're getting and which content is most popular, all presented simply.",
      featureAnalyticsBenefit:
        "Benefit: Understand your audience and make informed decisions.",

      featureAssetsTitle: "Central Asset Library",
      featureAssetsText:
        "Upload, store, and manage your images, documents, and other digital files in one secure and easily accessible location within the studio.",
      featureAssetsBenefit:
        "Benefit: Stay organized and ensure brand consistency across your materials.",

      featureSeoToolsTitle: "Basic SEO Tools",
      featureSeoToolsText:
        "Optimize your page titles, descriptions, and keywords to improve your visibility on search engines like Google.",
      featureSeoToolsBenefit: "Benefit: Help more customers find you online.",

      // Benefits Summary Section
      benefitsSummaryTitle: "Designed for Your Success in Costa Rica",
      benefitItemTime:
        "Save Time: Intuitive tools that simplify your digital tasks.",
      benefitItemAffordable:
        "Affordable: Powerful features without the enterprise price tag.",
      benefitItemGrowth:
        "Grow Online: Attract more customers and build your brand effectively.",
      benefitItemEasy:
        "Easy to Use: No steep learning curve, get started quickly.",
      benefitItemLocal:
        "Local Support: Friendly assistance from our Costa Rican team.",

      // Final CTA Section
      finalCtaTitle: "Ready to Simplify Your Digital Management?",
      finalCtaText:
        "Empower your SMB with the tools it needs to succeed online. Explore how the SMB Studio can make a difference for your business.",
      finalCtaButton: "Learn More & Get Started",
    },
    smbAboutUsPage: {
      pageTitle: "About LoyalShift for SMBs", // For SEO/browser tab
      headerTitle: "Empowering Your Business in the Digital Age",
      headerSubtitle:
        "Discover how LoyalShift is dedicated to helping Small and Medium-sized Businesses in Costa Rica thrive online.",
      missionSectionTitle: "Our Mission for SMBs",
      missionTextP1:
        "Our mission is to provide accessible, powerful, and easy-to-use digital tools and professional websites that empower SMBs in Costa Rica to grow their brand, reach more customers, and streamline their operations.",
      missionTextP2:
        "We believe every business, regardless of its size, deserves a strong and effective digital presence to compete and succeed.",
      whoWeAreSectionTitle: "Who We Are",
      whoWeAreTextP1:
        "LoyalShift is a technology partner committed to innovation and tangible client success. While we offer a range of sophisticated solutions for larger enterprises, our 'LoyalShift for SMBs' initiative is specially designed with the unique needs, challenges, and budgets of small and medium-sized businesses at its core.",
      whoWeAreTextP2:
        "We are a team of passionate developers, designers, and strategists, proud to be based in Costa Rica. Our deep understanding of the local market drives us to deliver digital services that truly resonate and make a difference for our business community.",
      howWeHelpSectionTitle: "How We Empower Your Business",
      howWeHelpItem1Title: "Professional Websites",
      howWeHelpItem1Text:
        "Stunning, mobile-responsive websites tailored to your brand, designed to convert visitors into loyal customers.",
      howWeHelpItem2Title: "SMB Studio Platform",
      howWeHelpItem2Text:
        "An intuitive backend platform (SMB Studio) to effortlessly manage your website content, blog, customer interactions, and gain insights from basic analytics.",
      howWeHelpItem3Title: "Digital Tools & Efficiency",
      howWeHelpItem3Text:
        "Access to practical digital tools and strategies aimed at saving you time and improving efficiency in your daily operations.",
      howWeHelpItem4Title: "Local Support & Partnership",
      howWeHelpItem4Text:
        "Ongoing guidance, resources, and dedicated support from a local team that genuinely understands the Costa Rican market and is invested in your success.",
      ourValuesSectionTitle: "Our Core Values",
      value1Title: "Accessibility",
      value1Text:
        "Making powerful digital tools affordable and straightforward for every SMB.",
      value2Title: "Partnership",
      value2Text:
        "Building collaborative relationships by working closely with you to understand your vision and achieve your goals.",
      value3Title: "Quality & Reliability",
      value3Text:
        "Delivering high-quality, dependable websites and software solutions that drive results.",
      value4Title: "Local Commitment",
      value4Text:
        "Actively supporting the growth, innovation, and digital transformation of businesses here in Costa Rica.",
      ctaSectionTitle: "Ready to Elevate Your Digital Presence?",
      ctaText:
        "Let's discuss how LoyalShift for SMBs can help your business shine in the digital landscape. Explore our solutions or get in touch with us today for a friendly chat!",
      ctaButtonSolutions: "Explore SMB Solutions",
      ctaButtonContact: "Contact Us",
    },
    smbStudioBlogInfo: {
      pageTitle: "Your Blog in SMB Studio | Overview",
      mainTitle: "Unleash the Power of Your SMB Blog",
      intro:
        "Your blog is a vital tool for connecting with customers, sharing your expertise, and boosting your online visibility. Learn how the SMB Studio empowers you to manage your entire blog effectively and drive results for your business.",
      moduleLabel: "Blog Management",

      sectionWhyBlogTitle: "Why Your SMB Needs an Active Blog",
      whyBlogIntro:
        "An active, well-maintained blog can significantly benefit your Small or Medium-sized Business by:",
      whyBlogItemSeo:
        "Improving Search Engine Rankings (SEO): Fresh, relevant content helps search engines like Google find and rank your website higher.",
      whyBlogItemAuthority:
        "Establishing Expertise & Authority: Share your knowledge and position your business as a go-to resource in your industry.",
      whyBlogItemAudience:
        "Engaging Your Audience: Build a loyal community, foster deeper customer relationships, and encourage interaction.",
      whyBlogItemTraffic:
        "Driving Website Traffic: Attract new, qualified visitors who are actively interested in your products, services, or industry.",
      whyBlogItemLeadGen:
        "Generating Leads: Convert readers into potential customers by offering valuable insights and clear calls to action.",

      sectionCoreFeaturesTitle: "Core Blog Management Features in SMB Studio",
      coreFeaturesIntro:
        "The SMB Studio provides a centralized and intuitive hub for all your blogging activities:",
      coreFeaturePostListing:
        "Centralized Post Management: View, search, filter, and manage all your blog posts from a single, organized dashboard. Quickly access options to edit, delete, or check individual post details.",
      coreFeatureCategoriesTags:
        "Effective Content Organization: Create and manage global categories and tags to structure your blog content logically. This helps readers easily find topics of interest and improves site navigation.",
      coreFeatureGlobalSettings:
        "Global Blog Configuration: Customize your blog's main title and descriptive tagline (important for SEO), set comment moderation preferences (e.g., enable/disable, approve comments), and define how posts are displayed on your live website (e.g., number of posts per page).",
      coreFeatureIntegration:
        "Seamless Website Integration: Your blog is designed to integrate perfectly with your main SMB website, ensuring a consistent brand experience and easy navigation for your visitors.",

      sectionTipsTitle: "Tips for a Successful SMB Blog Strategy",
      tipsIntro:
        "Maximize the impact of your blog with these proven strategies:",
      tipConsistency:
        "Consistency is Key: Establish and maintain a regular posting schedule that your audience can anticipate. Quality over quantity, but regularity matters.",
      tipValue:
        "Provide Real Value: Focus on creating content that educates, informs, entertains, or solves problems for your target audience.",
      tipKeywords:
        "Optimize for Keywords: Research and naturally incorporate relevant keywords your potential customers are searching for.",
      tipPromote:
        "Promote Your Posts: Don't just write and forget. Share your blog content across your social media channels, email newsletters, and other relevant platforms.",
      tipEngage:
        "Engage with Comments: Foster a community by responding to reader comments and questions promptly and thoughtfully.",
      tipAnalyze:
        "Analyze Performance: Use the basic analytics in your SMB Studio to see which topics resonate most and refine your content strategy.",

      ctaManagePosts: "Manage Your Blog Posts",
      ctaWriteNewPost: "Write a New Post",
      sectionContentToolsTitle: "Content Creation Tools",
      contentToolsIntro:
        "Powerful tools to create, optimize and schedule your content.",
      contentToolsCreating: "Rich text editor with media support",
      contentToolsScheduling: "Schedule posts for future publication",
      contentToolsSeo: "Built-in SEO optimization tools",
      contentToolsAi: "AI-powered content assistance",
    },
    loyalShiftSMBFooter: {
      logoAlt: "LoyalShift Logo",
      introText:
        "Empowering small and medium-sized businesses in Costa Rica with smart and accessible digital solutions.",
      navHeader: "Navigation",
      navAboutUsSMB: "About Us (SMB)",
      navSolutionsSMB: "SMB Solutions",
      navPricingSMB: "SMB Pricing",
      navMoreHeader: "More", // Can be visually hidden on mobile if needed but good for ARIA
      navResourcesBlog: "Resources & Blog",
      navSupportSMB: "SMB Support",
      navContact: "Contact",
      legalHeader: "Legal",
      legalPrivacyPolicy: "Privacy Policy",
      legalTermsOfService: "Terms of Service",
      followUsHeader: "Follow Us",
      socialLinkedInTitle: "LoyalShift on LinkedIn",
      socialGitHubTitle: "LoyalShift on GitHub",
      socialInstagramTitle: "LoyalShift on Instagram",
      socialTwitterTitle: "LoyalShift on X (formerly Twitter)",
      socialHuggingFaceTitle: "LoyalShift on HuggingFace",
      copyrightText:
        "© {currentYear} LoyalShift Technologies. An initiative for SMBs in Costa Rica. All rights reserved.",
    },
    smbLandingPage: {
      // Hero Section
      heroTitle: "Digital Solutions Built for Your SMB Success",
      heroSubtitle:
        "Professional websites, easy-to-use tools, and dedicated local support. We help Costa Rican small and medium businesses thrive online.",
      heroCtaButton: "Discover Our Solutions",
      heroSecondaryCtaButton: "Get a Free Quote",

      // Sub-hero / Trust indicators
      trustIndicator1: "Proudly Costa Rican",
      trustIndicator2: "SMB Focused",
      trustIndicator3: "Results Driven",

      // Offerings Section
      offeringsTitle: "Everything Your Business Needs to Shine Online",
      offeringWebsiteTitle: "Stunning Websites",
      offeringWebsiteText:
        "Custom-designed, mobile-friendly websites that showcase your brand and convert visitors into customers.",
      offeringStudioTitle: "SMB Studio Lite",
      offeringStudioText:
        "Manage your website content, blog, and leads with our intuitive, easy-to-use backend platform.",
      offeringToolsTitle: "Essential Digital Tools", // This was the 3rd item in the array for offerings
      offeringToolsText:
        "Access to curated tools and strategies for SEO, basic analytics, and improving your online visibility.",
      offeringSupportTitle: "Dedicated Local Support", // This was the 4th item
      offeringSupportText:
        "Friendly, expert support from our Costa Rican team, ready to help you every step of the way.",

      // How It Works Section (Process)
      processTitle: "Getting Started is Simple",
      processStep1Title: "1. Discovery Call",
      processStep1Text:
        "We'll chat about your business, goals, and specific needs. No obligations, just a friendly conversation.",
      processStep2Title: "2. Tailored Proposal",
      processStep2Text:
        "Receive a clear, straightforward proposal outlining the best solutions for your SMB.",
      processStep3Title: "3. Design & Build",
      processStep3Text:
        "Our expert team gets to work, crafting your powerful and professional digital presence.",
      processStep4Title: "4. Launch & Support",
      processStep4Text:
        "Go live! We'll be there for a smooth launch and provide ongoing support to ensure your continued success.",

      // Testimonials Placeholder Section
      testimonialsTitle: "Trusted by Businesses Like Yours",
      testimonialPlaceholder:
        "Real stories and successes from Costa Rican SMBs are coming soon!",

      // Final CTA Section
      finalCtaTitle: "Ready to Grow Your SMB with LoyalShift?",
      finalCtaText:
        "Take the first step towards a stronger, more effective digital future. Let's build something amazing together for your business.",
      finalCtaButton: "Request Your Free Consultation",
    },
    smbStudioPostInfo: {
      pageTitle: "Understanding Posts in SMB Studio", // Corrected
      mainTitle: "Mastering Your Blog Posts",
      intro:
        "Individual blog posts are the heart of your content strategy. This guide explains how to use the SMB Studio to create, edit, and manage compelling posts that engage your audience and boost your online presence.", // Corrected

      sectionCreatingTitle: "Creating & Editing Posts",
      creatingIntro:
        "The Post Editor is your primary tool for bringing your ideas to life. Here's what you can do:",
      creatingItemTitle:
        "Crafting Your Title: Make it catchy and SEO-friendly.",
      creatingItemContent:
        "Utilizing the Rich Text Editor (or Markdown) for formatting text, adding images, videos, and links.",
      creatingItemExcerpt:
        "Writing a concise excerpt (summary) to appear in post listings and search results.",
      creatingItemFeaturedImage:
        "Setting a featured image to visually represent your post.",
      creatingItemCategoriesTags:
        "Organizing with Categories & Tags for better navigation and discoverability.",
      creatingItemSlug: "Customizing the post URL (slug) for clarity and SEO.",

      sectionSeoTitle: "Optimizing for Search Engines (SEO)",
      seoIntro:
        "Help customers find your content easily with built-in SEO tools:",
      seoItemMetaTitle:
        "Meta Title: Craft a specific title for search engine results pages (SERPs).",
      seoItemMetaDescription:
        "Meta Description: Write a compelling summary to encourage clicks from search results.",

      sectionPublishingTitle: "Publishing & Visibility",
      publishingIntro: "Control how and when your posts go live:",
      publishingItemStatus:
        "Status Management: Save posts as 'Drafts' while working on them, or set them to 'Published' to make them live.",
      publishingItemVisibility:
        "Visibility Settings: Choose between 'Public' (visible to everyone) or 'Private' (e.g., for internal review).",
      // publishingItemSchedule: "Scheduling Posts: (If feature is active) Plan your content calendar by scheduling posts for future publication.",

      sectionAiAssistantTitle: "Leveraging the AI Assistant",
      aiAssistantIntro:
        "Your SMB Studio includes an AI Assistant (powered by Gemini) to help you create better content, faster:", // Corrected
      aiItemGenerateTitle:
        "Generate Title Ideas: Get suggestions for engaging post titles.",
      aiItemDraftContent:
        "Draft Sections: Let AI help you start writing sections of your post.",
      aiItemImproveText:
        "Refine Writing: Get help with grammar, tone, and clarity.",
      aiItemSummarize:
        "Create Excerpts: Automatically generate a summary for your post.",
      aiItemSeoOptimize:
        "Suggest SEO Meta: Get AI-powered recommendations for your meta title and description.",

      sectionTipsTitle: "Tips for Effective Posts",
      tip1: "Know Your Audience: Write content that addresses their needs and interests.",
      tip2: "Be Consistent: Establish a regular posting schedule.",
      tip3: "Use Visuals: Break up text with relevant images or videos.",
      tip4: "Call to Action: Encourage readers to take the next step (e.g., comment, share, contact you).",

      ctaViewPosts: "Manage Your Posts",
      ctaCreateNewPost: "Create a New Post",
    },
    smbResources: {
      pageTitle: "SMB Resources | LoyalShift",
      mainTitle: "Resources to Empower Your SMB",
      mainSubtitle:
        "Guides, tools, and insights to help your Costa Rican business grow and succeed in the digital world.",

      // Categories
      categoryGuidesTitle: "Guides & Tutorials",
      categoryToolsTitle: "Tools & Templates",
      categoryCommunityTitle: "Community & Support",
      categoryLocalTitle: "Local Costa Rican Resources",

      // Example Resources - You'll need to create many more specific keys for each resource
      // Guides & Tutorials
      guideOllamaTitle: "Run Local AI: Beginner's Guide to Ollama",
      guideOllamaDesc:
        "Explore the world of open-source Large Language Models on your own computer. A non-technical setup guide.",
      guideOllamaLink: "/smb/resources/guide/ollama-setup", // Example internal link
      guideContextIsKingTitle: "Context is King: Effective LLM Prompting",
      guideContextIsKingDesc:
        "Learn how to 'feed context' to Large Language Models for better results and simpler debugging.",
      guideContextIsKingLink: "/smb/resources/blog/context-is-king", // Example internal link
      guideDigitalPresenceTitle: "Building Your First Digital Presence",
      guideDigitalPresenceDesc:
        "A step-by-step guide for SMBs in Costa Rica to establish a strong online foundation.",
      guideDigitalPresenceLink: "/smb/resources/guide/digital-presence-101",
      guideSEOBasicsTitle: "SEO Basics for Local Businesses",
      guideSEOBasicsDesc:
        "Understand the fundamentals of Search Engine Optimization to help local customers find you.",
      guideSEOBasicsLink: "/smb/resources/guide/seo-basics",

      // Tools & Templates
      toolPromptHealthTitle: "Prompt Health Checker",
      toolPromptHealthDesc:
        "An interactive tool for basic analysis of your AI prompt effectiveness. (Conceptual)",
      toolPromptHealthLink: "/smb/tools/prompt-checker", // Example internal link
      toolSMBCalendarTitle: "SMB Content Calendar Template",
      toolSMBCalendarDesc:
        "Download our free template to plan your blog posts and social media content effectively.",
      toolSMBCalendarLinkExternal: "#", // Placeholder for an external download link
      toolInvoiceTemplateTitle: "Basic Invoice Template (CR)",
      toolInvoiceTemplateDesc:
        "A simple invoice template suitable for Costa Rican SMBs, including space for local tax information.",
      toolInvoiceTemplateLinkExternal: "#",

      // Community & Support
      communityPortalTitle: "LoyalShift SMB Community Portal",
      communityPortalDesc:
        "Connect with fellow SMB owners, share insights, ask questions, and access exclusive resources. (Coming Soon)",
      communityPortalLink: "/smb/studio/community", // Example internal link
      supportContactTitle: "Dedicated SMB Support",
      supportContactDesc:
        "Have questions or need assistance with your LoyalShift SMB services? Our local team is here to help.",
      supportContactLink: "/contact",

      // Local Costa Rican Resources
      localMEICTitle: "MEIC - Ministry of Economy, Industry and Commerce (CR)",
      localMEICDesc:
        "Official resources, programs, and support for PYMES (SMBs) from the Costa Rican government.",
      localMEICLinkExternal: "https://www.meic.go.cr/pymes/", // Actual link
      localProcomerTitle: "Procomer - Foreign Trade Promoter of Costa Rica",
      localProcomerDesc:
        "Support and resources for SMBs looking to export or engage in international trade.",
      localProcomerLinkExternal: "https://www.procomer.com/", // Actual link
      localINATitle: "INA - National Learning Institute (CR)",
      localINADesc:
        "Offers training and development programs that can benefit SMB owners and their employees.",
      localINALinkExternal: "https://www.ina.ac.cr/", // Actual link

      // General
      viewResourceButton: "View Resource",
      downloadTemplateButton: "Download Template",
      visitLinkButton: "Visit Link",
      comingSoonLabel: "Coming Soon",
    },

    solutionsPage: {
      selectProductTitle1: "Explore Our",
      selectProductTitle2: "Technology Suite & Modules",
      heroTitle1: "Modernize Your Legacy Systems",
      heroTitle2: "Without Disruption",
      heroSubtitle:
        "Transform outdated systems into agile, efficient operations with LoyalShift's AI-powered solutions, leveraging geometric intelligence for unparalleled precision and safety.",
      ctaDemo: "Request Demo",
      ctaExperts: "Talk to Experts",

      coreSolutionsTitle: "Our Core Technology Suite & Modules",
      coreSolutionsSubtitle:
        "Comprehensive Solutions for Enterprise Modernization",
      keyBenefits: "Key Benefits:",
      viewUseCases: "View Enterprise Use Cases",
      industryUsageTitle: "Industry Adoption & Primary Applications",
      tableHeaderIndustry: "Industry",
      tableHeaderUsage: "Usage %",
      tableHeaderApplications: "Primary Applications",

      industry: {
        banking: "Banking & Finance",
        healthcare: "Healthcare & Life Sciences",
        energy: "Energy & Utilities",
        manufacturing: "Manufacturing & Industrial",
        government: "Government & Public Sector",
        logistics: "Logistics & Supply Chain",
        insurance: "Insurance",
        airlines: "Airlines & Aviation",
        retail: "Retail & CPG",
        pharma: "Pharmaceuticals",
        defense: "Defense & Aerospace",
        transportation: "Transportation",
        agriculture: "Agriculture",
        construction: "Construction & Engineering",
        realEstate: "Real Estate",
        cloudProviders: "Cloud Providers",
      },

      product: {
        smartMirror: {
          title: "Smart Mirror™",
          category: "Legacy Transformation Engine",
          mission:
            "Empower zero-risk legacy modernization through physics-constrained digital twins.",
          description:
            "Safely validate mission-critical changes against live data in a physics-constrained, parallel digital twin environment. Smart Mirror™ allows you to test integrations, new AI models, and complex workflows with zero risk to your operational systems, ensuring confident, disruption-free deployments and 100% backward compatibility.",
          benefit1: "Validate changes risk-free before deployment.",
          benefit2: "Eliminate 'big bang' cutover failures.",
          benefit3: "Ensure business continuity during updates.",
          benefit4: "Achieve phased, confident rollouts.",
          benefit5: "Accelerate testing cycles significantly.",
          useCase1Title: "Legacy System Modernization",
          useCase1Problem:
            "High-risk changes to mission-critical legacy systems cause downtime and errors.",
          useCase1Solution:
            "Test all changes in a physics-constrained digital twin before deployment.",
          useCase1Outcome:
            "Zero downtime deployments with guaranteed backward compatibility.",
          useCase2Title: "AI Model Validation",
          useCase2Problem:
            "New AI models behave unpredictably with real legacy system data.",
          useCase2Solution:
            "Validate models against mirrored production data streams.",
          useCase2Outcome:
            "Confident AI deployments with proven real-system compatibility.",
          interactiveTitle: "Simulate Legacy Transformation",
          interactiveDescription:
            "Select a legacy system type to see transformation simulation",
          interactiveOptionMainframe: "Mainframe System",
          interactiveOptionErp: "ERP System",
          interactiveOptionCustom: "Custom Legacy App",
          ctaBanking: "Modernize *your legacy systems* risk-free today!",
        },
        universalAdapter: {
          title: "Universal Adapter™",
          category: "Legacy Integration Hub",
          mission: "Make every legacy system speak AI-native within 90 days.",
          description:
            "Instantly bridge disparate legacy and modern systems with the Universal Adapter™. Unlock siloed data and enable seamless connectivity through a unified API layer, facilitating real-time synchronization and the rapid development of new applications without costly or risky data migrations.",
          benefit1: "Unlock data trapped in siloed systems.",
          benefit2:
            "Integrate with 200+ sources via pre-built & custom adapters.",
          benefit3:
            "Enable real-time data synchronization & modern applications.",
          benefit4: "Avoid costly, high-risk data migration projects.",
          benefit5: "Simplify new development and integration efforts.",
          useCase1Title: "Supply Chain Integration",
          useCase1Problem:
            "EDI-based supply chain systems can't communicate with modern APIs.",
          useCase1Solution:
            "Real-time two-way translation between EDI and REST/GraphQL.",
          useCase1Outcome:
            "Seamless supply chain visibility across legacy and modern systems.",
          useCase2Title: "Core Banking Modernization",
          useCase2Problem:
            "Mainframe banking systems hinder digital customer experiences.",
          useCase2Solution:
            "Create modern microservices front-end to core banking systems.",
          useCase2Outcome:
            "Faster digital innovation without replacing core systems.",
          interactiveTitle: "Test Legacy Integration",
          interactiveDescription:
            "Select a legacy protocol to see integration mapping",
          interactiveOptionCobol: "COBOL Copybook",
          interactiveOptionEdi: "EDI X12",
          interactiveOptionFlatfile: "Flat File System",
          ctaLogistics: "Connect *your legacy systems* in days!",
        },
        auditGuardian: {
          title: "Audit Guardian™",
          category: "Compliance Nerve Center",
          mission:
            "Automate compliance as a natural system behavior, not an afterthought.",
          description:
            "Embed continuous compliance and unshakeable trust into your operations with Audit Guardian™. Enforce custom regulatory and policy rules directly within your workflows and maintain immutable, cryptographically secured audit trails for all AI and human actions.",
          benefit1: "Customize compliance rules for specific laws & policies.",
          benefit2: "Guarantee workflow privacy and data security.",
          benefit3:
            "Provide complete transparency with traceable AI decisions.",
          benefit4: "Automate compliance logging and reporting.",
          benefit5: "Reduce audit preparation time and costs.",
          useCase1Title: "Continuous HIPAA Compliance",
          useCase1Problem:
            "Annual HIPAA audits are costly and reveal compliance gaps too late.",
          useCase1Solution:
            "Real-time policy enforcement and automated evidence collection.",
          useCase1Outcome:
            "Always-audit-ready systems with 90% reduction in compliance costs.",
          useCase2Title: "Financial Controls Automation",
          useCase2Problem:
            "SOX controls require manual verification and sampling.",
          useCase2Solution:
            "Automated control validation across all transactions.",
          useCase2Outcome:
            "100% transaction coverage with real-time exception alerts.",
          interactiveTitle: "Check Compliance Rules",
          interactiveDescription: "Select a regulation to see automated checks",
          interactiveOptionGdpr: "GDPR",
          interactiveOptionHipaa: "HIPAA",
          interactiveOptionSoc2: "SOC 2",
          ctaHealthcare: "Automate *compliance* with zero effort!",
        },
        aiInsights: {
          title: "AI-Powered Insights Engine",
          category: "Legacy Intelligence & Optimization",
          mission:
            "Transform legacy data tombs into physics-informed foresight and actionable intelligence.",
          description:
            "Transform your historical and real-time operational data from legacy systems into actionable, physics-informed foresight. Our Insights Engine uses Explainable AI (XAI) and PINNs to identify bottlenecks, predict failures, and provide data-driven recommendations.",
          benefit1: "Identify hidden process inefficiencies proactively.",
          benefit2: "Improve forecasting accuracy with ML.",
          benefit3: "Make data-backed strategic decisions.",
          benefit4: "Enable a continuous improvement loop.",
          benefit5: "Unlock insights previously buried in legacy data.",
          useCase1Title: "Predictive Maintenance",
          useCase1Problem:
            "Equipment failures cause unplanned downtime and high costs.",
          useCase1Solution:
            "Physics-informed AI models predict failures 3-5x earlier.",
          useCase1Outcome:
            "30-50% reduction in unplanned downtime and maintenance costs.",
          useCase2Title: "Process Optimization",
          useCase2Problem:
            "Legacy manufacturing processes have hidden inefficiencies.",
          useCase2Solution:
            "Continuous analysis of operational data reveals optimization opportunities.",
          useCase2Outcome:
            "15-30% throughput improvement without capital expenditure.",
          interactiveTitle: "Generate Predictive Insights",
          interactiveDescription:
            "Select a data source to see sample AI-powered insights",
          interactiveOptionManufacturing: "Manufacturing Data",
          interactiveOptionEnergy: "Energy Grid Data",
          interactiveOptionTransport: "Transportation Logs",
          ctaManufacturing: "Unlock *hidden insights* from your legacy data!",
        },
        agentHub: {
          title: "Agent Hub™ Module",
          category: "Partner Ecosystem Accelerator",
          mission:
            "Turn partner ecosystems into seamless, intelligent extensions of core enterprise systems.",
          description:
            "Rapidly build, deploy, and manage secure portals and automated workflows for your external partners, agents, or B2B clients. Agent Hub™ leverages our core technologies to turn your partner ecosystem into a seamless, efficient extension of your core systems.",
          benefit1: "Accelerate partner-driven workflows.",
          benefit2: "Enhance partner experience and loyalty.",
          benefit3: "Reduce manual processing for internal teams.",
          benefit4: "Provide transparency for all stakeholders.",
          benefit5: "Rapidly deployable and customizable solution foundation.",
          useCase1Title: "Insurance Agent Portal",
          useCase1Problem:
            "Independent agents struggle with multiple insurer systems.",
          useCase1Solution:
            "Unified portal with single sign-on to all legacy backends.",
          useCase1Outcome:
            "40% faster policy issuance and 3x agent satisfaction.",
          useCase2Title: "Real Estate Partner Network",
          useCase2Problem:
            "Brokerages need real-time MLS and transaction system access.",
          useCase2Solution:
            "Secure, role-based access to all required systems.",
          useCase2Outcome:
            "Complete transaction visibility with 80% fewer support calls.",
          interactiveTitle: "Build a Partner Portal",
          interactiveDescription:
            "Select partner types to see portal configuration options",
          interactiveOptionInsurance: "Insurance Agents",
          interactiveOptionRealestate: "Real Estate Brokers",
          interactiveOptionSales: "Sales Partners",
          ctaRealEstate: "Empower *your partners* with seamless access!",
        },
        cipherForge: {
          title: "CipherForge™",
          category: "Quantum-Secure Confidential Computing",
          mission:
            "Make privacy breaches and data misuse mathematically impossible in distributed AI and collaborative computing.",
          description:
            "Secure your most sensitive data and AI models with CipherForge™, enabling privacy-preserving computation and collaboration in distributed environments. Our platform leverages advanced cryptographic techniques, including fully homomorphic encryption (FHE) and secure multi-party computation (MPC), underpinned by quantum-resistant algorithms.",
          benefit1: "Enable secure computation on encrypted data.",
          benefit2: "Facilitate privacy-preserving AI model training.",
          benefit3: "Provide mathematical guarantees of data confidentiality.",
          benefit4: "Future-proof your data security with quantum-resistance.",
          benefit5: "Unlock new collaborative data opportunities.",
          useCase1Title: "Secure Health Data Collaboration",
          useCase1Problem: "PHI sharing prevents multi-institution research.",
          useCase1Solution: "Encrypted computation on combined datasets.",
          useCase1Outcome: "Breakthrough research without data exposure.",
          useCase2Title: "Financial Crime Analysis",
          useCase2Problem: "Banks can't share fraud patterns due to privacy.",
          useCase2Solution: "Collective pattern detection on encrypted data.",
          useCase2Outcome: "30% better fraud detection with full data privacy.",
          interactiveTitle: "Test Quantum-Secure Encryption",
          interactiveDescription:
            "Enter text to see encrypted output with quantum-resistant algorithms",
          ctaGovernment:
            "Secure *sensitive data* with military-grade encryption!",
        },
      },

      geometricFeatures: {
        title: "The LoyalShift Advantage",
        subtitle: "Precision, Efficiency, and Geometric Intelligence",
        featureHeading1: "Geometric Intelligence for",
        featureHeading2: "Enterprise Transformation",
        featureDescription:
          "Our unique approach combines AI with geometric optimization to deliver precise, efficient solutions for legacy system challenges. We map complexities and find pathways others miss, ensuring your modernization is built on a foundation of mathematical certainty.",
        featureList1Title: "Precision Engineering",
        featureList1Desc:
          "Algorithmic solutions tailored to your unique infrastructure, data landscape, and operational physics.",
        featureList2Title: "Optimized Pathways",
        featureList2Desc:
          "AI identifies the most efficient and lowest-risk routes for modernization and seamless integration.",
        featureList3Title: "Proactive Risk Mitigation",
        featureList3Desc:
          "Geometric modeling and simulation help foresee and mitigate potential disruption points proactively.",
        featureCard1Title: "Unmatched Speed & Agility",
        featureCard1Desc:
          "Dramatically accelerated timelines for complex modernization projects with predictable outcomes.",
        featureCard2Title: "Fortified Security & Compliance",
        featureCard2Desc:
          "Robust, mathematically verifiable protection for your critical data, systems, and processes.",
        featureCard3Title: "Deep Scalable Growth",
        featureCard3Desc:
          "Future-proof architecture that adapts intelligently to your evolving business needs and data volumes.",
        featureCard4Title: "Verifiable Data Integrity",
        featureCard4Desc:
          "Ensuring absolute accuracy, consistency, and trustworthiness across all integrated systems.",
      },

      synergy: {
        headerChallenge: "Enterprise Challenge",
        headerStack: "LoyalShift Solution Stack",
        headerImpact: "Quantifiable Business Impact",
      },

      finalCta: {
        titleMain: "Ready to Modernize",
        titleAccent: "Without Disruption?",
        subtitle:
          "Discover how LoyalShift's unique AI-driven approach delivers measurable results, guaranteed security, and a seamless transition. Request a personalized assessment today.",
        ctaDemo: "Request Personalized Demo",
        ctaSales: "Talk to Sales",
        ctaCases: "See Client Results",
      },
      aiVisualPlaceholder: "AI Visual Concept for: {prompt}",
    },
    solutionsEnterprise: {
      ourLabTitle: "Our Lab: Integrating the Future",
      ourLabSubtitle: "Where Innovation Meets Seamless Integration",
      ourLabTextP1:
        "LoyalShift's 'Lab' is more than just Research & Development; it's our crucible for forging practical, integrated solutions. We are dedicated to harmonizing our core technologies—Smart Mirror™, Universal Adapter™, Audit Guardian™, AI Insights Engine, Agent Hub™, and CipherForge™—into cohesive, exponentially powerful platforms. Our focus is on real-world application and creating profound cross-module synergies that solve your most entrenched legacy system challenges.",
      ourLabTextP2:
        "Our expert teams continuously explore and master cutting-edge AI, including advancements in Physics-Informed Neural Networks (PINNs) for unparalleled accuracy in modeling complex systems, Generative Adversarial Networks (GANs) for robust synthetic data generation and sophisticated scenario modeling, and Deep Reinforcement Learning (RL) for dynamic process optimization and agentic decision-making. This ensures your modernization journey with LoyalShift is always at the vanguard of technological possibility, delivering solutions that are not only effective today but resilient for tomorrow.",
      ourLabFocus1: "Cross-Platform Agentic Workflows",
      ourLabFocus2: "Physics-Informed AI Validation & Simulation",
      ourLabFocus3: "Quantum-Resilient Security Architectures",

      enterpriseIntegrationTitle: "Enterprise Integration & Synergies",
      enterpriseIntegrationSubtitle:
        "Unlocking Holistic Value from Complex Ecosystems",
      crossModuleSynergiesTitle:
        "Cross-Module Synergies: Battle-Tested Patterns",
      legacyInterfaceCatalogTitle: "Legacy Interface Catalog Expertise",
      legacyInterface: {
        mainframe:
          "Mainframe Systems: CICS/IMS/VSAM adapters with automated COBOL copybook translation and JCL workflow mirroring.",
        industrial:
          "Industrial Controls: Modbus/Profibus/DNP3/OPC-UA gateways with integrated OT security and physics-constrained data validation.",
        database:
          "Legacy Databases: Hierarchical/network DB converters (e.g., IDMS/IMS to SQL/NoSQL) with zero-loss data fidelity.",
        document:
          "Document & Spool Systems: MVS/JES2 spool, AS/400 reports, and physical document digitization to cloud-native workflow transformation.",
      },

      strategicValueTitle: "Strategic Value Proposition",
      strategicValueSubtitle:
        "Transforming Constraints into Competitive Advantages",
      strategicValue: {
        deRisked:
          "De-risked Modernization: PINN-constrained change management & Smart Mirror™ validation.",
        roiExtension:
          "Legacy ROI Extension: Maximize lifespan of existing assets by an average of 7-12 years.",
        complianceAuto:
          "Compliance Automation: Audit Guardian™ with RL-driven enforcement for continuous adherence.",
        partnerEco:
          "Partner Ecosystem Growth: Agent Hub™ driven revenue channels & accelerated onboarding.",
        aiAdoption:
          "AI Adoption Bridge: GAN-enabled safe experimentation and PINN-informed AI deployment.",
      },
      cioQuoteText:
        '"LoyalShift doesn\'t just replace your legacy systems – it weaponizes them, turning decades of data into our new strategic asset."',
      cioQuoteAuthor: "CIO, Global Tier 1 Bank (Post-Modernization Project)",
      ctoQuoteText:
        '"We don\'t just extend your legacy systems – we make them appreciate in value like fine wine, ready for the next generation of AI."',
      ctoQuoteAuthor: "CTO, LoyalShift",

      industrySolutionsTitle: "Industry-Specific Solutions",
      industrySolutionsSubtitle:
        "Specialized implementations for complex sector requirements",

      bankingSolutionTitle: "Financial Services Modernization",
      bankingSolution: {
        stack:
          "Core modernization platform with compliance automation and standard protocol adapters",
        businessImpact:
          "Significant reduction in compliance operational costs with accelerated product integration capabilities",
        deployment:
          "Rapid proof of concept deployment with pre-configured financial messaging support",
        technicalDifferentiator:
          "Modernizes legacy COBOL/JCL systems without requiring code rewrites",
      },

      healthcareSolutionTitle: "Healthcare Systems Integration",
      healthcareSolution: {
        stack:
          "Provider management system with compliance monitoring and clinical data analytics",
        businessImpact:
          "Streamlined provider credentialing with improved resource utilization metrics",
        deployment:
          "Pre-validated regulatory compliance configuration with structured data migration",
        technicalDifferentiator:
          "Secure legacy EHR integration while maintaining full regulatory compliance",
      },

      energySolutionTitle: "Utilities Infrastructure Management",
      energySolution: {
        stack:
          "Operational technology integration with predictive analytics and critical infrastructure security",
        businessImpact:
          "Operational efficiency improvements with risk-based maintenance prioritization",
        deployment:
          "Validated security configurations with phased upgrade methodology",
        technicalDifferentiator:
          "Predictive system analytics for critical infrastructure protection",
      },
    },
    supportPage: {
      pageTitle: "LoyalShift Support Center",
      mainTitle: "LoyalShift Support Center",
      mainSubtitle:
        "Get help with our solutions, explore resources, or connect with our support team.",

      chatbotTitle: "Ask Our AI Assistant",
      chatbotIntro:
        "Powered by Gemini - Available 24/7 to answer your questions.",
      chatbotInputPlaceholder: "Type your question here...",
      chatbotSendButton: "Send",
      chatbotWelcomeMessage:
        "Hello! I'm the LoyalShift AI Assistant. How can I help you today regarding our solutions or public data?",
      chatbotDisclaimer:
        "I am an AI assistant and can provide information based on public LoyalShift data and general knowledge about our solutions. For complex or account-specific issues, please submit a support ticket.",
      chatbotError:
        "Sorry, I encountered an issue. Please try again or contact human support.",
      chatbotTyping: "AI Assistant is typing...",

      quickActionFAQ: "View FAQs",
      quickActionDocs: "Read Docs",
      quickActionTicket: "Open Ticket",

      stillNeedHelpTitle: "Still Need Assistance?",
      stillNeedHelpSubtitle:
        "If our AI assistant couldn't resolve your query, or if you need more specific help:",

      faqCardTitle: "Explore FAQs",
      faqCardText:
        "Find answers to commonly asked questions about our platform and services.",
      faqCardButton: "View FAQs",

      docsCardTitle: "Read Documentation",
      docsCardText:
        "Dive deeper into our solutions with comprehensive guides and technical documentation.",
      docsCardButton: "Go to Docs",

      ticketCardTitle: "Submit a Support Ticket",
      ticketCardText:
        "For specific issues, account problems, or technical difficulties, please submit a ticket to our support team.",
      ticketCardButton: "Open a Ticket",

      needMoreHelp: "Need More Direct Help?",
      contactUs:
        "Our support team is available Monday-Friday, 9am-5pm (CST/GMT-6).",
      contactButton: "Contact Support Team",

      loading: "Loading...",
    },
    smbDeployGuideAdvanced: {
      pageTitle: "Advanced Deployment Guide for SMBs | LoyalShift",
      mainTitle: "Deploying Your Modern UI with Kubernetes",
      mainSubtitle:
        "An advanced guide for deploying a containerized application using Namecheap for your domain and a Kubernetes cluster for hosting (e.g., on Rackspot or any cloud provider).",
      part1Title: "Part 1: Domain & DNS Setup",
      part1Intro:
        "First, you need to own your domain name and know the IP address of your Kubernetes cluster's Ingress Controller. This IP is where all web traffic will be directed.",
      part1Step1Title: "Get Your Domain & Ingress IP",
      part1Step1Desc1:
        "Purchase your domain from a registrar like Namecheap if you haven't already.",
      part1Step1Desc2:
        "Obtain the external IP address of your Kubernetes Ingress Controller. This is provided by your hosting provider (like Rackspot) or cloud service after you set up the controller (see Part 3).",
      part1Step2Title: "Point Your Domain to the Cluster",
      part1Step2Desc1:
        "Log in to your Namecheap account, go to your 'Domain List', and click 'Manage' next to your domain.",
      part1Step2Desc2:
        "Navigate to the 'Advanced DNS' tab and add two 'A Record' entries:",
      part1Step2Host1:
        "Host: @ (for your main domain) | Value: <Your-Cluster-IP-Address>",
      part1Step2Host2:
        "Host: www (for the www subdomain) | Value: <Your-Cluster-IP-Address>",
      part1Step2Note:
        "Note: DNS changes can take a few hours to update across the internet.",
      part2Title: "Part 2: Containerizing Your App with Docker",
      part2Intro:
        "We need to package your React application into a self-contained unit called a Docker image. This ensures it runs identically anywhere.",
      part2Step1Title: "Create a Dockerfile",
      part2Step1Desc:
        "In the root of your project, create a file named `Dockerfile`. This file contains instructions to build your app's image.",
      part2Step2Title: "Create an Nginx Configuration",
      part2Step2Desc:
        "For serving your React app's static files, we'll use a lightweight Nginx web server. Create a file named `nginx.conf` in your project root.",
      part3Title: "Part 3: One-Time Kubernetes Cluster Setup",
      part3Intro:
        "Before deploying your app, your Kubernetes cluster needs two essential components: an Ingress Controller to manage external traffic and a Cert-Manager to automate SSL certificates.",
      part3Step1Title: "Install NGINX Ingress Controller",
      part3Step1Desc:
        "This component routes external traffic to services within your cluster. Apply it by running the following command:",
      part3Step2Title: "Install Cert-Manager",
      part3Step2Desc:
        "This will automatically create and manage free SSL certificates from Let's Encrypt for your domains.",
      part3Step3Title: "Create a Let's Encrypt Issuer",
      part3Step3Desc:
        "This final setup step tells cert-manager how to obtain certificates. Create a file named `letsencrypt-issuer.yaml` and apply it. Don't forget to change the email address.",
      part4Title: "Part 4: Your Application's Deployment Files",
      part4Intro:
        "These files tell Kubernetes how to run your application: how to deploy it, how to expose it as a service, and how to make it accessible to the outside world.",
      part4File1Title: "Service File (service.yaml)",
      part4File1Desc:
        "This creates an internal network service that exposes your application's pods.",
      part4File2Title: "Ingress File (<project-name>-ingress.yaml)",
      part4File2Desc:
        "This manages external access, routing traffic from your domains to your service, and handles HTTPS.",
      part5Title: "Part 5: Deploying Your Application",
      part5Intro:
        "With all your configuration files ready, you can now deploy them to your cluster.",
      part5Step1Title: "Apply Your Configurations",
      part5Step1Desc:
        "Run the following command for each of your YAML files (`deployment.yaml`, `service.yaml`, `<project-name>-ingress.yaml`). The `--kubeconfig` flag points to your cluster's connection file.",
      conclusionTitle: "Deployment Complete!",
      conclusionText:
        "Your application is now deployed and accessible via `https://your-domain.com`. Cert-manager will automatically provision an SSL certificate within a few minutes. To update your site, you'll need to build a new Docker image, push it to a registry, and update your `deployment.yaml` file to use the new image tag.",
      copyCodeButton: "Copy Code",
      copiedButton: "Copied!",
      importantNote:
        "IMPORTANT: Replace all placeholder values like `<project-name>`, `<project-domain>`, and `<project-acme-registration-email>` with your actual information.",
      namecheapPlaceholder: "e.g., my-awesome-business.com",
      namecheapAriaLabel: "Domain name search input",
      namecheapSearchButton: "Check Availability",
      namecheapPoweredBy: "Domain search powered by Namecheap.",
    },
    smbDeployGuideContabo: {
      pageTitle: "SMB Deployment Guide: Contabo | LoyalShift",
      mainTitle: "Deploying Your Website on Contabo",
      mainSubtitle:
        "A practical, step-by-step guide to uploading your modern application's files to your Contabo VPS or dedicated server.",

      part1Title: "Part 1: Preparing Your Application for Production",
      part1Intro:
        "Before you can upload your website, you need to compile your code into static files (HTML, CSS, JavaScript) that a web server can serve. This is called the 'build' process.",
      part1Step1Title: "Run the Build Command",
      part1Step1Desc:
        "In your project's code directory, open a terminal and run the standard build command. This will create a new folder named `build` (or sometimes `dist`) in your project, containing the optimized, production-ready version of your site.",

      part2Title: "Part 2: Securely Uploading Your Files",
      part2Intro:
        "The method for uploading your files depends on the operating system of your local computer and your Contabo server. The following steps prioritize security and best practices.",
      securityPreambleTitle: "Initial Security Best Practices",
      securityPreambleDesc:
        "Before transferring files, it's crucial to establish a secure foundation. We strongly recommend against using the `root` user for routine file transfers.",
      securityRootWarning:
        "Never use the `root` user for regular SFTP/SCP file transfers. Always create a dedicated user with limited permissions for deployments to enhance security.",
      scenario1Title:
        "Recommended: Create a Dedicated Deploy User (Linux Server)",
      scenario1Desc:
        "Creating a separate user for deployments is the most secure method.",
      scenario1Step1Title: "Create a New User",
      scenario1Step1Desc:
        "Connect to your server via SSH as `root` and create a new user (e.g., `deployuser`). You will be prompted to set a password.",
      scenario1Step2Title: "Grant Permissions",
      scenario1Step2Desc:
        "Add the new user to the `www-data` group so they can write to the web directory. Then, set the ownership of the web directory to this user and group.",
      scenario1Step3Title: "Upload Files via SCP",
      scenario1Step3Desc1:
        "Now, from your local machine, use the `scp` (secure copy) command to upload your built application files to the server as the new `deployuser`.",
      scenario1Step3Desc2:
        "This command recursively copies everything from your local `build` folder to the `/var/www/html` directory on your server.",
      sshKeyTitle: "Advanced Security: Using SSH Keys",
      sshKeyDesc:
        "For even greater security, we recommend setting up SSH key-based authentication instead of using passwords. This involves generating a key pair on your local machine and adding the public key to your server's `~/.ssh/authorized_keys` file for your `deployuser`. This method is highly resistant to brute-force attacks.",

      part3Title: "Part 3: Configuring the Web Server for a React App",
      part3Intro:
        "This is a critical step for Single-Page Applications (SPAs). It ensures that refreshing a page like `your-domain.com/about` works correctly instead of showing a 404 error.",
      part3Step1Title: "Configure for Apache or Nginx",
      part3Step1Desc:
        "You need to add a rewrite rule. The method depends on which web server software is running on your Contabo Linux server (most common are Apache and Nginx).",
      apacheNote:
        "If you are using Apache, create or edit the `.htaccess` file in `/var/www/html`.",
      nginxNote:
        "If you are using Nginx, you'll need to edit your site's server block configuration file, typically located in `/etc/nginx/sites-available/`.",
      part3Step2Title: "Set Correct File Permissions",
      part3Step2Desc:
        "After uploading, ensure the web server can read the files by setting the correct permissions on your server.",

      part4Title: "Part 4: Final Steps: Domain & SSL",
      part4Intro:
        "The final steps are pointing your domain to the server and securing it with HTTPS.",
      part4Step1Title: "Point Your Domain's A Record",
      part4Step1Desc:
        "In your domain registrar's DNS settings (e.g., Namecheap), create or update the 'A' record for your domain to point to your Contabo server's IP address. This can take a few hours to propagate.",
      part4Step1SubTitleWHM:
        "For WHM/cPanel Users: Linking Your Domain on the Server",
      part4Step1SubDescWHM:
        "If your Contabo server has a WHM/cPanel license, you must first create an account for your domain within WHM. This step properly configures the server to host your website's files.",
      part4Step1SubStep1WHM:
        "Log into WHM (usually at `https://your-server-ip:2087`).",
      part4Step1SubStep2WHM:
        "Navigate to 'Create a New Account' under the 'Account Functions' section.",
      part4Step1SubStep3WHM:
        "Fill in your domain information, create a username and password for its cPanel account, and select a resource package.",
      part4Step1SubStep4WHM:
        "Click 'Create'. WHM will now set up the dedicated hosting environment for your domain on the server.",
      part4Step1SubStep5WHM:
        "After creating the account in WHM, you can then proceed with pointing your domain's A record at your registrar (like Namecheap) to your server's IP address.",
      part4Step2Title: "Install an SSL Certificate",
      part4Step2Desc:
        "Securing your site with HTTPS is essential. Use the tools provided by your Contabo panel (like Let's Encrypt in cPanel) or use a command-line tool like Certbot to install a free, automated SSL certificate on your server.",
      part4Step2Sub1Title: "1. Install Certbot",
      part4Step2Sub1Desc:
        "First, install the Certbot software and its plugin for your web server (we'll show examples for Apache and Nginx, the most common choices).",
      part4Step2Sub2Title: "2. Run Certbot",
      part4Step2Sub2Desc:
        "Next, run Certbot. It will automatically detect your domain from your web server configuration, obtain the certificate, and configure HTTPS for you. Choose the command that matches your server:",
      apacheCommandNote: "For Apache Web Server:",
      nginxCommandNote: "For Nginx Web Server:",
      certbotSuccessNote:
        "After running the command, follow the on-screen prompts. If successful, Certbot will handle automatic renewals for you.",

      conclusionTitle: "You're Ready to Go Live!",
      conclusionText:
        "Once DNS propagates, your site will be live and secure. Remember that every time you update your code, you will need to run `npm run build` again and re-upload the contents of the `build` folder, ensuring permissions are set correctly.",

      codeSnippetBuild: "npm run build",
      codeSnippetScp: "scp -r build/* deployuser@your_server_ip:/var/www/html/",
      codeSnippetChown:
        "sudo chown -R www-data:www-data /var/www/html && sudo chmod -R 775 /var/www/html",
      codeSnippetHtaccess:
        "<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteBase /\n  RewriteRule ^index\\.html$ - [L]\n  RewriteCond %{REQUEST_FILENAME} !-f\n  RewriteCond %{REQUEST_FILENAME} !-d\n  RewriteCond %{REQUEST_FILENAME} !-l\n  RewriteRule . /index.html [L]\n</IfModule>",
      codeSnippetNginx:
        "server {\n  # ... your other server config ...\n\n  location / {\n    root /var/www/html;\n    try_files $uri /index.html;\n  }\n\n  # ...\n}",
      copiedButton: "Copied!",
      copyCodeButton: "Copy Code",
    },
    smbPublicEvent: {
      pageTitle: "Event Details | LoyalShift SMB",
      whatToExpectTitle: "What to Expect",
      whatToExpectItem1: "A casual, fun, and friendly atmosphere.",
      whatToExpectItem2:
        "The exciting soccer match displayed on the big screen.",
      whatToExpectItem3: "A build-your-own-burger bar with all the essentials.",
      whatToExpectItem4: "Good company and great conversation.",
      instructionsTitle: "Instructions for Attendees",
      essentialsTitle: "Essential Shopping List",
      optionalsTitle: "Optional Additions",
      yieldTitle: "Burger Yield Estimates",
      yieldBasedOn: "Based on 1.5 kg of ground beef.",
      pattiesLabel: "Patties at",
      pattiesUnit: "grams each",
      totalPatties: "Total Patties",
      startingPointTitle: "Starting Point",
      perPersonTitle: "Per Person",
      rsvpTitle: "Are You Coming?",
      rsvpText:
        "Let us know if you can make it! A quick message helps us get an accurate headcount for the food and drinks.",
      rsvpButton: "RSVP via WhatsApp",
      blogBuilderCtaTitle: "Like This Page? Build Your Own.",
      blogBuilderCtaText:
        "This entire event page was created using the intuitive Blog & Page Builder inside the LoyalShift SMB Studio. You can create equally professional pages for your own events, announcements, and articles—no technical skills required.",
      blogBuilderCtaButton: "Discover the SMB Studio",
      locationTitle: "Event Location",
      mapWaze: "Waze",
      mapGoogle: "Google Maps",
      addressLine1: "C. 24, Alajuela",
      addressLine2: "Alajuela Province, Costa Rica",
      data: {
        eventName: "Costa Rica vs USA Soccer Match Burger Night!",
        eventDate: "Sunday, June 29, 2025",
        eventTime: "Evening (match starts 7 PM ET / 5 PM CST in Costa Rica)",
        eventNote:
          "Get ready for some exciting football while enjoying delicious homemade burgers!",
        instruction1:
          "Please bring your own beverages (alcoholic or non-alcoholic, whatever you prefer!).",
        instruction2:
          "If you have any of the optional ingredients at home, feel free to bring them to add to our burger bar! It helps make everyone's burger unique and delicious.",
        essentialItem1: "Yellow Onions",
        essentialItem1Qty: "approx. 5 onions",
        essentialItem2: "Heinz Sweet Relish",
        essentialItem3: "Romana Lettuce",
        essentialItem4: "Tomatoes",
        essentialItem4Qty: "1.5 kg pack",
        essentialItem5: "Brioche Ajonjoli",
        essentialItem5Qty: "560 grams",
        optionalItem1: "Tocineta Cinta Azul",
        optionalItem1Qty: "300 grams",
        optionalItem2: "Aguacate Hortifruti empacado",
        optionalItem2Qty: "1.2 kg",
        optionalItem3: "Cucumbers",
        optionalItem3Qty: "4-5 cucumbers",
        optionalItem4: "American Cheese (Kraft Singles)",
        optionalItem4Qty: "12 slices - 226 g",
        yieldNote:
          "These estimates are based on 1.5 kg of ground beef. The actual number of burgers will depend on how many people attend. We can adjust the ground beef quantity based on the final headcount.",
        yieldTier1Desc:
          "A good starting point for a smaller gathering. Each person gets one hearty burger, leaving room for some seconds or for fewer people to have more.",
        yieldTier2Desc:
          "Maximizing the 1.5 kg of ground beef for more burgers (up to 16 patties). Good for a larger group where each person might have one burger, or for a smaller group with plenty of seconds.",
        yieldTierXDesc:
          "The number of burgers can be adjusted based on the actual number of friends (N) attending. For a generous estimate, assume 1 to 1.5 burgers per person.",
      },
    },
    smbPageBuilderComponents: {
      heroTitle: "Unlock Your Potential",
      heroSubtitle:
        "Discover our programs, workshops, and certifications designed to elevate your skills and career.",
      heroCta: "Explore Programs",
      explainedTitle: "A New Approach to Learning",
      explainedTextP1:
        "We believe in a holistic approach that combines foundational theory with practical, hands-on application.",
      explainedTextP2:
        "Our academy provides a supportive environment for growth, guided by industry-leading experts.",
      programSuiteTitle: "Programs & Workshops",
      programSuiteSubtitle:
        "Find the perfect certification or workshop to match your skill level and career goals.",
      filterAllTypes: "All Types",
      filterCertifications: "Certifications",
      filterWorkshops: "Workshops",
      filterAllLevels: "All Levels",
      filterFundamentals: "Fundamentals",
      filterIntermediate: "Intermediate",
      teamTitle: "Meet Our Expert Instructors",
      teamSubtitle:
        "Learn from the best in the industry. Our instructors are experienced professionals dedicated to your success.",
      faqTitle: "Frequently Asked Questions",
      finalCtaTitle: "Ready to Start Your Journey?",
      finalCtaSubtitle:
        "Take the next step in your professional development. Enroll in a program or workshop today.",
      finalCtaButton: "View All Programs",
    },
    expoPymePage: {
      greeting: "Welcome to LoyalShift!",
      headline: "The Digital Kickstart for Your Business",
      subheading:
        "Thank you for visiting us at Expo Pyme 2025. We are dedicated to empowering Costa Rican SMBs with powerful, simple, and affordable digital tools to help you thrive online.",
      offerTitle: "Exclusive Expo Offer:",
      offerText:
        "Scan the QR code or click the button below to schedule a free, no-obligation discovery call and claim a special discount on our Digital Kickstart package.",
      ctaButton: "Claim Your Expo Offer",
      footerText: "We look forward to helping your business grow.",
      locationTitle: "Event Location",
      locationAddress: "Antigua Aduana, San José, Costa Rica",
      calendarTitle: "Add to Your Calendar",
      calendarButton: "Add to Google Calendar",
    },
  },
  es: {
    expoPymePage: {
      greeting: "¡Bienvenidos a LoyalShift!",
      headline: "El Impulso Digital para su Negocio",
      subheading:
        "Gracias por visitarnos en la Expo Pyme 2025. Nos dedicamos a empoderar a las PYMES de Costa Rica con herramientas digitales potentes, sencillas y asequibles para ayudarle a prosperar en línea.",
      offerTitle: "Oferta Exclusiva de la Expo:",
      offerText:
        "Escanee el código QR o haga clic en el botón de abajo para agendar una llamada de descubrimiento gratuita y sin compromiso, y para reclamar un descuento especial en nuestro paquete de Impulso Digital.",
      ctaButton: "Reclamar Oferta de la Expo",
      footerText: "Esperamos poder ayudar a su negocio a crecer.",
      locationTitle: "Ubicación del Evento",
      locationAddress: "Antigua Aduana, San José, Costa Rica",
      calendarTitle: "Agrégalo a tu Calendario",
      calendarButton: "Añadir a Google Calendar",
    },
    smbPageBuilderComponents: {
      heroTitle: "Desbloquea tu Potencial",
      heroSubtitle:
        "Descubre nuestros programas, talleres y certificaciones diseñados para elevar tus habilidades y tu carrera.",
      heroCta: "Explorar Programas",
      explainedTitle: "Un Nuevo Enfoque de Aprendizaje",
      explainedTextP1:
        "Creemos en un enfoque holístico que combina la teoría fundamental con la aplicación práctica y directa.",
      explainedTextP2:
        "Nuestra academia proporciona un entorno de apoyo para el crecimiento, guiado por expertos líderes en la industria.",
      programSuiteTitle: "Programas y Talleres",
      programSuiteSubtitle:
        "Encuentra la certificación o el taller perfecto que se ajuste a tu nivel de habilidad y tus metas profesionales.",
      filterAllTypes: "Todos los Tipos",
      filterCertifications: "Certificaciones",
      filterWorkshops: "Talleres",
      filterAllLevels: "Todos los Niveles",
      filterFundamentals: "Fundamentos",
      filterIntermediate: "Intermedio",
      teamTitle: "Conoce a Nuestros Instructores Expertos",
      teamSubtitle:
        "Aprende de los mejores en la industria. Nuestros instructores son profesionales experimentados dedicados a tu éxito.",
      faqTitle: "Preguntas Frecuentes",
      finalCtaTitle: "¿Listo para Empezar tu Viaje?",
      finalCtaSubtitle:
        "Da el siguiente paso en tu desarrollo profesional. Inscríbete hoy en un programa o taller.",
      finalCtaButton: "Ver Todos los Programas",
    },
    // SMBHeader
    navSolutions: "Soluciones",
    navFeatures: "Funcionalidades",
    navPricing: "Precios",
    navResources: "Recursos",
    navContact: "Contacto",

    english: "Inglés",
    spanish: "Español",
    languageSelectorLabel: "Idioma:",

    smbHeaderAction: "Volver a LoyalShift",
    mobileMenu: "Menú móvil",
    languageSelectorLabel: "Idioma:",
    english: "EN",
    spanish: "ES",
    toggleNavigation: "Alternar navegación",
    // SMBFooter
    footerText: `© ${new Date().getFullYear()} LoyalShift SMB. Todos los derechos reservados.`,
    // Example navigation links (if any in header)
    dashboard: "Panel",
    content: "Contenido",
    settings: "Configuración",
    smbDeployGuideContabo: {
      pageTitle: "Guía de Despliegue en Contabo | LoyalShift PYMES",
      mainTitle: "Desplegando su Sitio Web en Contabo",
      mainSubtitle:
        "Una guía práctica y paso a paso para subir los archivos de su aplicación moderna a su VPS o servidor dedicado de Contabo.",

      part1Title: "Parte 1: Preparando su Aplicación para Producción",
      part1Intro:
        "Antes de poder subir su sitio web, necesita compilar su código en archivos estáticos (HTML, CSS, JavaScript) que un servidor web pueda servir. Este proceso se llama 'build'.",
      part1Step1Title: "Ejecute el Comando de Compilación (Build)",
      part1Step1Desc:
        "En el directorio de código de su proyecto, abra una terminal y ejecute el comando de compilación estándar. Esto creará una nueva carpeta llamada `build` en su proyecto, que contiene la versión optimizada y lista para producción de su sitio.",

      part2Title: "Parte 2: Subida Segura de sus Archivos",
      part2Intro:
        "El método para subir sus archivos depende del sistema operativo de su computadora local y de su servidor Contabo. Los siguientes pasos priorizan la seguridad y las mejores prácticas.",
      securityPreambleTitle: "Prácticas de Seguridad Iniciales",
      securityPreambleDesc:
        "Antes de transferir archivos, es crucial establecer una base segura. Recomendamos encarecidamente no utilizar el usuario `root` para transferencias de archivos de rutina.",
      securityRootWarning:
        "Nunca use el usuario `root` para transferencias de archivos SFTP/SCP regulares. Siempre cree un usuario dedicado con privilegios limitados para los despliegues para mejorar la seguridad.",
      scenario1Title:
        "Recomendado: Crear un Usuario de Despliegue Dedicado (Servidor Linux)",
      scenario1Desc:
        "Crear un usuario separado para los despliegues es el método más seguro.",
      scenario1Step1Title: "Crear un Nuevo Usuario",
      scenario1Step1Desc:
        "Conéctese a su servidor vía SSH como `root` y cree un nuevo usuario (ej., `deployuser`). Se le pedirá que establezca una contraseña.",
      scenario1Step2Title: "Otorgar Permisos",
      scenario1Step2Desc:
        "Añada el nuevo usuario al grupo `www-data` para que pueda escribir en el directorio web. Luego, establezca la propiedad del directorio web para este usuario y grupo.",
      scenario1Step3Title: "Subir Archivos vía SCP",
      scenario1Step3Desc1:
        "Ahora, desde su máquina local, use el comando `scp` (copia segura) para subir los archivos de su aplicación compilada al servidor como el nuevo `deployuser`.",
      scenario1Step3Desc2:
        "Este comando copia recursivamente todo desde su carpeta local `build` al directorio `/var/www/html` en su servidor.",
      sshKeyTitle: "Seguridad Avanzada: Usando Claves SSH",
      sshKeyDesc:
        "Para una seguridad aún mayor, recomendamos configurar la autenticación basada en claves SSH en lugar de usar contraseñas. Esto implica generar un par de claves en su máquina local y agregar la clave pública al archivo `~/.ssh/authorized_keys` de su `deployuser` en el servidor. Este método es altamente resistente a ataques de fuerza bruta.",

      part3Title: "Parte 3: Configurando el Servidor para React",
      part3Intro:
        "Este es un paso final crítico para aplicaciones de página única (SPAs) como las construidas con React. Asegura que refrescar una página como `su-dominio.com/acerca` funcione correctamente en lugar de mostrar un error 404.",
      part3Step1Title: "Configure para Apache o Nginx",
      part3Step1Desc:
        "Necesita agregar una regla de reescritura. El método depende del software de servidor web que se esté ejecutando en su servidor Linux de Contabo (los más comunes son Apache y Nginx).",
      apacheNote:
        "Si está usando Apache, cree o edite el archivo `.htaccess` en `/var/www/html`.",
      nginxNote:
        "Si está usando Nginx, necesitará editar el archivo de configuración del bloque de servidor de su sitio, típicamente ubicado en `/etc/nginx/sites-available/`.",
      part3Step2Title: "Establecer Permisos de Archivo Correctos",
      part3Step2Desc:
        "Después de subir los archivos, asegúrese de que el servidor web pueda leerlos estableciendo los permisos correctos en su servidor.",

      part4Title: "Parte 4: Pasos Finales: Dominio y SSL",
      part4Intro:
        "Los pasos finales son apuntar su dominio al servidor y asegurarlo con HTTPS.",
      part4Step1Title: "Apunte el Registro A de su Dominio",
      part4Step1Desc:
        "En la configuración de DNS de su registrador de dominios (ej., Namecheap), cree o actualice el registro 'A' para su dominio para que apunte a la dirección IP de su servidor de Contabo. Esto puede tardar algunas horas en propagarse.",
      part4Step1SubTitleWHM:
        "Para Usuarios de WHM/cPanel: Vincular su Dominio en el Servidor",
      part4Step1SubDescWHM:
        "Si su servidor de Contabo tiene una licencia de WHM/cPanel, primero debe crear una cuenta para su dominio dentro de WHM. Este paso configura correctamente el servidor para alojar los archivos de su sitio web.",
      part4Step1SubStep1WHM:
        "Inicie sesión en WHM (generalmente en `https://su-ip-de-servidor:2087`).",
      part4Step1SubStep2WHM:
        "Navegue a 'Crear una Nueva Cuenta' en la sección 'Funciones de la Cuenta'.",
      part4Step1SubStep3WHM:
        "Complete la información de su dominio, cree un nombre de usuario y contraseña para su cuenta de cPanel, y seleccione un paquete de recursos.",
      part4Step1SubStep4WHM:
        "Haga clic en 'Crear'. WHM ahora configurará el entorno de alojamiento dedicado para su dominio en el servidor.",
      part4Step1SubStep5WHM:
        "Después de crear la cuenta en WHM, puede proceder a apuntar el registro A de su dominio en su registrador (como Namecheap) a la dirección IP de su servidor.",
      part4Step2Title: "Instale un Certificado SSL",
      part4Step2Desc:
        "Asegurar su sitio con HTTPS es esencial. Use las herramientas provistas por su panel de Contabo (como Let's Encrypt en cPanel) o una herramienta de línea de comandos como Certbot para instalar un certificado SSL gratuito y automatizado en su servidor.",
      part4Step2Sub1Title: "1. Instalar Certbot",
      part4Step2Sub1Desc:
        "Primero, instale el software Certbot y su complemento para su servidor web (mostraremos ejemplos para Apache y Nginx, las opciones más comunes).",
      part4Step2Sub2Title: "2. Ejecutar Certbot",
      part4Step2Sub2Desc:
        "A continuación, ejecute Certbot. Detectará automáticamente su dominio desde la configuración de su servidor web, obtendrá el certificado y configurará HTTPS por usted. Elija el comando que corresponda a su servidor:",
      apacheCommandNote: "Para Servidor Web Apache:",
      nginxCommandNote: "Para Servidor Web Nginx:",
      certbotSuccessNote:
        "Después de ejecutar el comando, siga las instrucciones en pantalla. Si tiene éxito, Certbot se encargará de las renovaciones automáticas por usted.",

      conclusionTitle: "¡Está Listo para Lanzar!",
      conclusionText:
        "Una vez que el DNS se propague, su sitio estará en vivo y seguro. Recuerde que cada vez que actualice el código de su sitio, deberá ejecutar `npm run build` nuevamente y volver a subir el contenido de la carpeta `build`, asegurándose de que los permisos estén configurados correctamente.",

      codeSnippetBuild: "npm run build",
      codeSnippetScp:
        "scp -r build/* nombre_usuario@ip_servidor:/var/www/html/",
      codeSnippetChown:
        "sudo chown -R www-data:www-data /var/www/html && sudo chmod -R 775 /var/www/html",
      codeSnippetHtaccess:
        "<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteBase /\n  RewriteRule ^index\\.html$ - [L]\n  RewriteCond %{REQUEST_FILENAME} !-f\n  RewriteCond %{REQUEST_FILENAME} !-d\n  RewriteCond %{REQUEST_FILENAME} !-l\n  RewriteRule . /index.html [L]\n</IfModule>",
      codeSnippetNginx:
        "server {\n  # ... su otra configuración de servidor ...\n\n  location / {\n    root /var/www/html;\n    try_files $uri /index.html;\n  }\n\n  # ...\n}",
      copiedButton: "¡Copiado!",
      copyCodeButton: "Copiar Código",
    },

    smbDeployGuideAdvanced: {
      pageTitle: "Guía de Despliegue Avanzado para PYMES | LoyalShift",
      mainTitle: "Desplegando su UI Moderna con Kubernetes",
      mainSubtitle:
        "Una guía avanzada para desplegar una aplicación en contenedores usando Namecheap para su dominio y un clúster de Kubernetes para el hosting (ej., en Rackspot o cualquier proveedor de nube).",
      part1Title: "Parte 1: Configuración de Dominio y DNS",
      part1Intro:
        "Primero, necesita ser dueño de su nombre de dominio y conocer la dirección IP del Ingress Controller de su clúster de Kubernetes. Toda el tráfico web se dirigirá a esta IP.",
      part1Step1Title: "Obtenga su Dominio e IP de Ingress",
      part1Step1Desc1:
        "Compre su dominio en un registrador como Namecheap si aún no lo ha hecho.",
      part1Step1Desc2:
        "Obtenga la dirección IP externa de su Ingress Controller de Kubernetes. Esta es proporcionada por su proveedor de hosting (como Rackspot) o servicio en la nube después de configurar el controlador (ver Parte 3).",
      part1Step2Title: "Apunte su Dominio al Clúster",
      part1Step2Desc1:
        "Inicie sesión en su cuenta de Namecheap, vaya a su 'Lista de Dominios' y haga clic en 'Manage' junto a su dominio.",
      part1Step2Desc2:
        "Navegue a la pestaña 'Advanced DNS' y agregue dos registros 'A Record':",
      part1Step2Host1:
        "Host: @ (para su dominio principal) | Valor: <Su-Dirección-IP-del-Clúster>",
      part1Step2Host2:
        "Host: www (para el subdominio www) | Valor: <Su-Dirección-IP-del-Clúster>",
      part1Step2Note:
        "Nota: Los cambios de DNS pueden tardar algunas horas en propagarse por Internet.",
      part2Title: "Parte 2: Contenerización de su App con Docker",
      part2Intro:
        "Necesitamos empaquetar su aplicación de React en una unidad autocontenida llamada imagen de Docker. Esto asegura que se ejecute de manera idéntica en cualquier lugar.",
      part2Step1Title: "Crear un Dockerfile",
      part2Step1Desc:
        "En la raíz de su proyecto, cree un archivo llamado `Dockerfile`. Este archivo contiene instrucciones para construir la imagen de su aplicación.",
      part2Step2Title: "Crear una Configuración de Nginx",
      part2Step2Desc:
        "Para servir los archivos estáticos de su aplicación React, usaremos un servidor web Nginx ligero. Cree un archivo llamado `nginx.conf` en la raíz de su proyecto.",
      part3Title: "Parte 3: Configuración Única del Clúster de Kubernetes",
      part3Intro:
        "Antes de desplegar su app, su clúster de Kubernetes necesita dos componentes esenciales: un Ingress Controller para gestionar el tráfico externo y un Cert-Manager para automatizar los certificados SSL.",
      part3Step1Title: "Instalar NGINX Ingress Controller",
      part3Step1Desc:
        "Este componente enruta el tráfico externo a los servicios dentro de su clúster. Aplíquelo ejecutando el siguiente comando:",
      part3Step2Title: "Instalar Cert-Manager",
      part3Step2Desc:
        "Esto creará y gestionará automáticamente certificados SSL gratuitos de Let's Encrypt para sus dominios.",
      part3Step3Title: "Crear un Emisor (Issuer) de Let's Encrypt",
      part3Step3Desc:
        "Este paso final de configuración le dice a cert-manager cómo obtener certificados. Cree un archivo llamado `letsencrypt-issuer.yaml` y aplíquelo. No olvide cambiar la dirección de correo electrónico.",
      part4Title: "Parte 4: Archivos de Despliegue de su Aplicación",
      part4Intro:
        "Estos archivos le dicen a Kubernetes cómo ejecutar su aplicación: cómo desplegarla, cómo exponerla como un servicio y cómo hacerla accesible al mundo exterior.",
      part4File1Title: "Archivo de Servicio (service.yaml)",
      part4File1Desc:
        "Esto crea un servicio de red interno que expone los pods de su aplicación.",
      part4File2Title: "Archivo de Ingress (<nombre-proyecto>-ingress.yaml)",
      part4File2Desc:
        "Esto gestiona el acceso externo, enrutando el tráfico de sus dominios a su servicio, y maneja HTTPS.",
      part5Title: "Parte 5: Desplegando su Aplicación",
      part5Intro:
        "Con todos sus archivos de configuración listos, ahora puede desplegarlos en su clúster.",
      part5Step1Title: "Aplique sus Configuraciones",
      part5Step1Desc:
        "Ejecute el siguiente comando para cada uno de sus archivos YAML (`deployment.yaml`, `service.yaml`, `<nombre-proyecto>-ingress.yaml`). La bandera `--kubeconfig` apunta al archivo de conexión de su clúster.",
      conclusionTitle: "¡Despliegue Completo!",
      conclusionText:
        "Su aplicación ya está desplegada y accesible a través de `https://su-dominio.com`. Cert-manager aprovisionará automáticamente un certificado SSL en unos minutos. Para actualizar su sitio, necesitará construir una nueva imagen de Docker, subirla a un registro y actualizar su archivo `deployment.yaml` para usar la nueva etiqueta de imagen.",
      copyCodeButton: "Copiar Código",
      copiedButton: "¡Copiado!",
      importantNote:
        "IMPORTANTE: Reemplace todos los valores de marcador de posición como `<nombre-proyecto>`, `<dominio-proyecto>`, y `<email-registro-acme>` con su información real.",
      namecheapPlaceholder: "ej., mi-negocio-asombroso.com",
      namecheapAriaLabel: "Campo de búsqueda de nombre de dominio",
      namecheapSearchButton: "Verificar Disponibilidad",
      namecheapPoweredBy: "Búsqueda de dominios por Namecheap.",
    },

    aoeCTA: {
      hero: {
        eyebrow: "Iniciativa Estratégica",
        title: "Imagine su Empresa: Totalmente Autónoma, Completamente Segura.",
        subtitle:
          "Asóciese con LoyalShift para co-crear un Motor de Operaciones Autónomas (AOE) a medida – un núcleo local impulsado por IA que aprende de sus datos, orquesta sus sistemas existentes y opera de forma segura sin conexión.",
        ctaButton: "Discuta su Visión Autónoma",
      },
      roiCalculator: {
        title: "Calcule su ROI Potencial",
        subtitle:
          "Estime el valor que un Motor de Operaciones Autónomas Local podría aportar a su negocio.",
        employeesLabel: "Número de Empleados (Dptos. Relevantes)",
        employeesMin: "10",
        employeesMax: "500+",
        avgSalaryLabel: "Salario Anual Promedio (USD)",
        avgSalaryPlaceholder: "Ej: 65000",
        processesLabel: "Procesos Clave a Automatizar",
        processesOption: "{count} proceso",
        processesOptionPlural: "{count} procesos",
        dataProcessedLabel:
          "Puntos de Datos Procesados/Gestionados Anualmente (Est.)",
        cloudCostLabel:
          "Costos Anuales Actuales de Servicios Cloud/IA Externa (USD)",
        cloudCostPlaceholder: "Ej: 15000",
        gpuOwnedLabel:
          "Poseemos GPUs NVIDIA adecuadas (Ej: RTX A-series, Tesla, H100)",
        resultsTitle: "Su ROI Estimado con AOE Local",
        resultsLaborSavings:
          "Ahorro Anual en Costos Laborales (Est. 15% por Automatización)",
        resultsCloudSavings: "Ahorro Anual en Servicios Cloud (Si posee GPUs)",
        resultsEfficiencyGains:
          "Ganancias Anuales por Eficiencia (Valor Mejora de Procesos)",
        resultsDataValue: "Valor Anual por Datos Optimizados",
        resultsTotalAnnual: "Valor Anual Total Estimado",
        resultsPayback: "Período de Recuperación Estimado",
        resultsPaybackUnit: "meses",
        results3YearValue: "Valor Neto Estimado a 3 Años",
        resultsImplementationCost:
          "Implementación y Configuración Única (Est.)",
        resultsGpuNote: "(+ Hardware GPU inicial si no se posee)",
        resultsDisclaimer:
          "*Las estimaciones son ilustrativas, basadas en implementaciones típicas y promedios de la industria. El ROI real variará.",
        ctaEstimateButton: "Obtener Estimación de ROI Personalizada",
      },
      explanationSelector: {
        title: "Entienda el AOE: Explicaciones a Medida",
        businessOwnerButton: "Para Dueños de Negocios",
        technicalLeadButton: "Para Líderes Técnicos",
        aiSpecialistButton: "Para Especialistas en IA",
      },
      explanationBusiness: {
        title:
          "AOE: Impulse la Eficiencia y Asegure su Futuro (Visión de Negocio)",
        p1: "Imagine que las operaciones centrales de su negocio funcionan de manera más fluida, rápida y confiable, 24/7. El Motor de Operaciones Autónomas (AOE) es como darle a su empresa un equipo interno increíblemente inteligente y dedicado que aprende sus procesos únicos y toma decisiones óptimas por sí mismo.",
        p2: "Fundamentalmente, esta inteligencia permanece *dentro de su empresa*. Ningún dato sensible sale de su control. Se trata de impulsar la productividad, reducir errores y obtener una ventaja competitiva significativa haciendo que sus sistemas existentes funcionen de manera más inteligente, todo mientras se mantiene la más alta seguridad.",
        benefit1:
          "Mayor Eficiencia Operativa: Automatice tareas complejas, reduzca el esfuerzo manual y acelere los flujos de trabajo críticos.",
        benefit2:
          "Seguridad de Datos Mejorada: Mantenga todos los datos propietarios y el aprendizaje de IA estrictamente en sus instalaciones, ideal para industrias sensibles.",
        benefit3:
          "Reducción de Costos Operativos: Minimice errores, optimice el uso de recursos y mejore el tiempo de actividad.",
        benefit4:
          "Prepare sus Operaciones para el Futuro: Construya una base para la mejora continua y la adaptación sin costosas revisiones del sistema.",
      },
      explanationTechnical: {
        title: "AOE: Arquitectura e Integración (Visión Técnica)",
        p1: "El Motor de Operaciones Autónomas (AOE) es una solución de IA modular y local (on-premise) diseñada para una profunda integración con su infraestructura empresarial existente. Aprovecha un núcleo de IA seguro y reforzado (CipherCore™) que realiza aprendizaje e inferencia sin conexión directamente dentro de su centro de datos.",
        p2: "La conectividad con sistemas heredados (mainframes, AS/400, bases de datos personalizadas, SCADA/ICS) y aplicaciones modernas se logra mediante una configuración interna especializada de nuestro Universal Adapter™. El AOE orquesta funciones de negocio predefinidas y puede activar scripts personalizados o llamadas API basadas en sus modelos aprendidos y flujos de datos internos en tiempo real.",
        feature1:
          "Implementación Local (On-Premise): Control total sobre el entorno físico y de red del módulo de IA.",
        feature2:
          "Aprendizaje e Inferencia sin Conexión: Los modelos de IA se entrenan y operan sin conectividad externa a Internet, garantizando la soberanía de los datos.",
        feature3:
          "API Segura y Marco de Adaptadores: Interfaces robustas para la integración con diversos sistemas internos y sistemas de control industrial.",
        feature4:
          "Capa de Orquestación Adaptativa: La lógica central del AOE ajusta dinámicamente los flujos de trabajo en función de las condiciones en tiempo real y los datos históricos de rendimiento.",
      },
      explanationAI: {
        title:
          "AOE: Modelo de IA y Paradigma de Aprendizaje (Visión de Especialista en IA)",
        p1: "El Motor de Operaciones Autónomas (AOE) emplea una arquitectura de IA híbrida, que potencialmente combina sistemas explicables basados en reglas con modelos avanzados de aprendizaje automático (p. ej., Aprendizaje por Refuerzo, Pronóstico de Series Temporales, Detección de Anomalías) adaptados a su dominio operativo específico. Los modelos se entrenan exclusivamente con sus datos propietarios y locales.",
        p2: "Nuestro paradigma de aprendizaje sin conexión se centra en la adaptación continua dentro de su entorno aislado. El AOE utiliza técnicas de aprendizaje federado (si hay múltiples nodos internos) o aprendizaje incremental para actualizar modelos sin exfiltración de datos. Se pueden integrar componentes de explicabilidad (XAI) para proporcionar transparencia en los procesos de toma de decisiones de la IA cuando sea necesario.",
        modelDetail1:
          "Arquitectura de Modelo Personalizable: Selección y ajuste fino de modelos de ML (p. ej., LSTMs para mantenimiento predictivo, agentes de RL para optimización de procesos, Redes Neuronales de Grafos para interdependencias del sistema) basados en casos de uso específicos.",
        modelDetail2:
          "Canalizaciones de Datos Seguras: Procesos ETL internos para preparar y alimentar datos al motor de entrenamiento e inferencia sin conexión.",
        modelDetail3:
          "IA Informada por la Física (Opcional): Para dominios relevantes, incorporación de conocimiento del dominio y restricciones físicas en el entrenamiento del modelo para una mayor robustez y seguridad.",
        modelDetail4:
          "Bucle de Mejora Continua sin Conexión: Mecanismos para el reentrenamiento, validación e implementación de modelos dentro del enclave seguro, impulsados por nuevos datos operativos internos.",
      },
      need: {
        title: "El Imperativo Empresarial: Inteligencia Sin Exposición",
        p1: "Muchas industrias críticas – manufactura, energía, defensa, finanzas – requieren automatización avanzada e información impulsada por IA. Sin embargo, la naturaleza sensible de sus datos y operaciones a menudo impide el uso de soluciones de IA basadas en la nube debido a restricciones de seguridad, cumplimiento o conectividad.",
        p2: "El desafío es aprovechar el poder de la IA dentro de un entorno completamente confiable y autónomo, permitiendo una verdadera autonomía operativa mientras se mantiene la soberanía absoluta de los datos.",
      },
      visionPillar1: {
        title: "Autoaprendizaje y Optimización",
        desc: "Un motor que aprende continuamente de sus datos internos para refinar procesos y predecir resultados, todo dentro de su entorno seguro.",
      },
      visionPillar2: {
        title: "Integración Transparente con Sistemas Heredados",
        desc: "Conecte y orqueste sus sistemas existentes, PLCs y funciones personalizadas a través de adaptadores internos seguros y de alto rendimiento.",
      },
      visionPillar3: {
        title: "Seguridad y Control 'Air-Gapped'",
        desc: "Opere con total soberanía de datos. Sin dependencias de la nube externa para el procesamiento central de IA y la toma de decisiones.",
      },
      visionPillar4: {
        title: "Operaciones Proactivas y Predictivas",
        desc: "Vaya más allá de las soluciones reactivas hacia el mantenimiento predictivo y los ajustes proactivos de procesos, minimizando el tiempo de inactividad y maximizando la eficiencia.",
      },
      capability: {
        mainTitle: "El Plan Maestro de LoyalShift para su Motor Autónomo",
        mainSubtitle:
          "Proporcionamos las tecnologías centrales y la experiencia para construir, implementar y refinar un AOE adaptado a su panorama operativo único. Nuestro enfoque se centra en la implementación local segura y la integración con su infraestructura existente.",
      },
      capability1: {
        title: "CipherCore™ IA Local Segura",
        desc: "Nuestro módulo de IA reforzado e implementable, diseñado para un aprendizaje y ejecución seguros y sin conexión, adaptado a sus datos propietarios.",
      },
      capability2: {
        title: "Universal Adapter™ (Modo Interno)",
        desc: "Configuraciones especializadas para una integración robusta y segura con diversos sistemas internos, bases de datos y controles industriales.",
      },
      capability3: {
        title: "Motor de Orquestación Adaptativo",
        desc: "La capa de inteligencia que aprende sus flujos de trabajo operativos y orquesta las funciones existentes para una ejecución autónoma.",
      },
      capability4: {
        title: "Marco de Seguridad de Nivel Empresarial",
        desc: "Construido con la seguridad en su núcleo, listo para su implementación en entornos operativos altamente regulados y sensibles.",
      },
      process: {
        title: "Nuestro Proceso Colaborativo de Co-Creación",
        subtitle:
          "Construir un Motor de Operaciones Autónomas es una asociación estratégica. Trabajamos mano a mano con su equipo a través de un enfoque por fases:",
        step1: {
          title: "1. Inmersión Profunda y Alineación Estratégica",
          desc: "Comprensión de sus procesos críticos, sistemas existentes, protocolos de seguridad y resultados autónomos deseados. Definición de KPIs claros para el éxito.",
        },
        step2: {
          title: "2. Diseño del Plan Maestro del AOE Seguro",
          desc: "Diseño de la arquitectura para su AOE local, incluyendo flujo de datos, selección de modelos de IA (o desarrollo personalizado) y puntos de integración con sistemas heredados usando Universal Adapter™.",
        },
        step3: {
          title: "3. Implementación por Fases y Aprendizaje sin Conexión",
          desc: "Implementación iterativa del módulo AOE, entrenamiento inicial con sus datos históricos (sin conexión) e integración con un subconjunto de funciones para validación.",
        },
        step4: {
          title: "4. Operaciones Piloto y Ajuste de Rendimiento",
          desc: "El AOE comienza a gestionar operaciones seleccionadas bajo supervisión. Monitoreo continuo, refinamiento del aprendizaje y ajuste del rendimiento basados en resultados del mundo real dentro de su entorno.",
        },
        step5: {
          title: "5. Escalado a Autonomía Total y Evolución Continua",
          desc: "Expansión gradual del alcance del AOE para gestionar más procesos de forma autónoma. Establecimiento de protocolos para el aprendizaje continuo sin conexión y futuras mejoras de capacidad.",
        },
      },
      final: {
        title: "Construyamos el Futuro de su Empresa Segura y Autónoma.",
        subtitle:
          "Si la visión de un motor local impulsado por IA que automatiza y optimiza de forma segura sus operaciones críticas resuena con sus objetivos estratégicos, lo invitamos a iniciar una discusión confidencial con nuestro equipo de soluciones avanzadas.",
        ctaButton: "Iniciar Diálogo Estratégico",
        disclaimer:
          "Todas las discusiones se realizan bajo estricto NDA. Nos especializamos en soluciones para entornos sensibles y regulados.",
      },
    },
    smbSolutions: {
      hero: {
        title: "Soluciones Diseñadas para el Crecimiento de su Negocio",
        subtitle:
          "Descubra cómo LoyalShift resuelve sus mayores desafíos digitales con soluciones a medida que ofrecen resultados.",
        cta1: "Explorar SMB Studio",
        cta2: "Agendar una Demo",
      },
      spotlight: {
        eyebrow: "Plataforma Integrada",
        title: "Centro de Comando Digital Todo en Uno",
        description:
          "LoyalShift SMB Studio consolida la creación de contenido, gestión de activos, análisis y publicación en una plataforma intuitiva diseñada para ahorrar tiempo y amplificar resultados.",
        feature1: "Herramientas de Creación de Contenido",
        feature2: "Gestión de Activos Digitales",
        feature3: "Asistencia con IA",
        feature4: "Panel de Análisis",
        cta1: "Explorar Funciones del Studio",
        cta2: "Ver Precios",
        tagline:
          "Todo lo que necesita para gestionar su presencia digital en un solo lugar",
      },
      grid: {
        eyebrow: "Soluciones Estratégicas",
        title: "Resuelva los Desafíos de su Negocio",
        subtitle:
          "Enfoques específicos para sus necesidades digitales más urgentes, diseñados para generar impacto y ser fáciles de usar.",
        learnMore: "Aprenda cómo",
        keyBenefitLabel: "Beneficio Clave",
      },
      solution1: {
        title: "Potencie su Visibilidad en Línea",
        description:
          "Hágase notar con contenido optimizado para SEO y gestión estratégica de activos que resuene con su audiencia objetivo.",
        benefit: "Atraiga más prospectos calificados orgánicamente.",
      },
      solution2: {
        title: "Simplifique la Gestión de Contenido",
        description:
          "Optimice su flujo de trabajo de contenido con herramientas intuitivas para la creación, organización, publicación y programación.",
        benefit:
          "Ahorre tiempo y publique de manera consistente con facilidad.",
      },
      solution3: {
        title: "Interactúe y Haga Crecer su Audiencia",
        description:
          "Transforme seguidores en clientes leales con estrategias de interacción basadas en datos y herramientas de comunicación.",
        benefit: "Construya relaciones más sólidas con los clientes.",
      },
      cta: {
        title: "¿Listo para Transformar su Presencia Digital?",
        subtitle: "Únase a miles de PYMEs que crecen con LoyalShift",
        cta1: "Ver Planes y Comenzar",
        cta2: "Agendar una Demo Personalizada",
      },
    },
    smbFeatures: {
      mainHeading: "Funcionalidades de LoyalShift SMB Studio",
      mainSubheading:
        "Descubra las potentes herramientas integradas diseñadas para ayudar a su pequeña o mediana empresa a prosperar en línea. Gestione sin esfuerzo su contenido, activos, análisis y más.",
      featureBlogEditor: {
        title: "Editor de Blog Avanzado",
        description:
          "Cree publicaciones de blog impresionantes y atractivas con nuestro editor de texto enriquecido intuitivo, que incluye incrustación multimedia, formato personalizado y asistencia de escritura impulsada por IA.",
      },
      featureCentralLibrary: {
        title: "Biblioteca Centralizada de Activos Digitales",
        description:
          "Almacene, organice y gestione todas las imágenes, videos, documentos y activos generados por IA de su marca en una ubicación segura y fácil de buscar.",
      },
      featureUnifiedDashboard: {
        title: "Panel de Análisis Unificado",
        description:
          "Realice un seguimiento de los indicadores clave de rendimiento de su sitio web, blog, redes sociales y canales de venta, todo en un panel personalizable.",
      },
      featureSeoTools: {
        title: "Kit de Herramientas SEO Integrado",
        description:
          "Optimice su contenido para motores de búsqueda directamente en el editor. Obtenga retroalimentación en tiempo real.",
      },
      featureScheduling: {
        title: "Programación de Contenido y Calendario",
        description:
          "Planifique su estrategia de contenido con nuestro calendario visual. Programe publicaciones para el momento óptimo.",
      },
      featureVeoVideoGen: {
        title: "Generación de Video con IA (Integración Veo)",
        description:
          "Cree videos impresionantes y de calidad profesional a partir de indicaciones de texto utilizando la tecnología Veo de Google.",
      },
      featureInstagramInsights: {
        title: "Análisis Profundo de Instagram",
        description:
          "Comprenda su audiencia de Instagram, el rendimiento del contenido y la interacción del perfil.",
      },
      cta: {
        title: "¿Listo para Potenciar su Negocio con LoyalShift Studio?",
        subtitle:
          "Explore todas estas funciones y más. Comience a simplificar su flujo de trabajo y a amplificar sus resultados hoy mismo.",
        getStarted: "Ver Precios y Comenzar",
        requestDemo: "Solicitar una Demostración",
      },
    },
    smbPlatformFeatures: {
      // Reutilizando algunas claves para consistencia si coinciden
      featuresMainTitle: "Todo lo que su PYME Necesita para Brillar",
      benefitsSummaryTitle: "Desbloquee Beneficios Clave para su Negocio",
      benefitItemTime:
        "Ahorre tiempo valioso con procesos automatizados y optimizados.",
      benefitItemAffordable:
        "Acceda a herramientas de nivel empresarial a un precio amigable para PYMEs.",
      benefitItemGrowth:
        "Escale sus esfuerzos digitales a medida que su negocio crece.",
      benefitItemEasy:
        "Interfaz fácil de usar, no se requiere experiencia técnica profunda.",
      benefitItemLocal:
        "Comprensión local con estándares tecnológicos globales (si aplica).",
    },

    smbPricing: {
      hero: {
        title: "Iniciativa de Transformación Digital para PYMEs",
        subtitle:
          "Obtenga una página de inicio profesional para su negocio y comience a automatizar sus operaciones",
      },
      initiative: {
        name: "Iniciativa PYME",
        frequency: "/pago único",
        description:
          "Ponga su negocio en línea con una página de inicio profesional + 1 mes de acceso total a la plataforma",
        cta: "Comenzar - $599",
        ctaTextPlaceholder: "Comenzar Hoy",
      },
      smbPlan: {
        name: "Plan PYME",
        frequency: "/mes",
        description:
          "Acceso total a la plataforma con funciones premium y soporte",
        cta: "Suscribirse Ahora - $59/mes",
        ctaTextPlaceholder: "Elegir Este Plan",
      },
      enterprise: {
        name: "Soluciones Empresariales",
        price: "Personalizado",
        description:
          "Soluciones a medida para grandes organizaciones con requisitos personalizados",
        cta: "Contactar a Ventas",
        ctaTextPlaceholder: "Discutir Necesidades Empresariales",
        includes: "Funcionalidades Empresariales Clave:",
      },
      sectionTitle: "Precios Simples y Transparentes",
      sectionSubtitle:
        "Elija la opción que mejor se adapte a las necesidades de su negocio",
      mostPopular: "RECOMENDADO",
      includes: "Lo que obtienes:",
      features: {
        homepage: "Implementación de página de inicio personalizada",
        legacyApps: "Conecte hasta 2 aplicaciones/bases de datos heredadas",
        fullStudioMonth: "Acceso total al Studio por 1 mes",
        fullStudioAccess: "Acceso total al Studio",
        workflows: "Hasta 50 ejecuciones de flujos de trabajo",
        templates: "Acceso a plantillas de flujos de trabajo predefinidas",
        support: "Soporte de implementación",
        studioLite: "Acceso a Studio Lite después del primer mes",
        advanced: "Gestión de contenido avanzada",
        analytics: "Panel de análisis mejorado",
        priority: "Soporte prioritario 24/7",
        unlimited: "Ejecuciones de flujos de trabajo ilimitadas",
        invoices: "Sistema de gestión de facturas",
        allTemplates: "Todas las plantillas de flujos de trabajo",
        customApps: "Conectores de aplicaciones personalizadas",
        dedicated: "Equipo de implementación dedicado",
        enterpriseSecurity: "Seguridad de grado empresarial",
        sla: "Acuerdos de nivel de servicio personalizados",
        customDev: "Servicios de desarrollo a medida",
        training: "Capacitación en sitio",
      },
      cta: {
        title: "¿Listo para Transformar su Negocio?",
        subtitle:
          "Únase a nuestra Iniciativa PYME y ponga su negocio en línea hoy",
        initiativeButton: "Inicie su Impulso Digital",
        demoButton: "Agendar una Demostración",
      },
    },
    value: {
      proposition1: "Página de Inicio Profesional",
      detail1:
        "Obtenga una página de inicio personalizada y adaptable a móviles que represente su negocio",
      proposition2: "1 Mes de Acceso Total",
      detail2:
        "Automatice procesos y conecte sus sistemas con nuestra plataforma completa",
      proposition3: "Acceso Lite Continuo",
      detail3:
        "Gestione su contenido y vea facturas con Studio Lite después del primer mes",
    },
    howItWorks: {
      title: "Cómo Funciona Nuestra Iniciativa PYME",
      step1: {
        title: "Regístrese",
        detail: "Elija la Iniciativa PYME de $599 para comenzar",
      },
      step2: {
        title: "Configuración de Página",
        detail: "Implementamos su página de inicio profesional",
      },
      step3: {
        title: "Mes de Acceso Total",
        detail:
          "Conecte sistemas y automatice procesos con acceso completo a la plataforma",
      },
      step4: {
        title: "Acceso Continuo",
        detail:
          "Continúe con Studio Lite o actualice al Plan PYME para funciones completas",
      },
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesita saber sobre nuestra Iniciativa PYME",
      question1: "¿Qué obtengo exactamente con la Iniciativa PYME de $599?",
      answer1:
        "La Iniciativa PYME de $599 incluye: 1) Una página de inicio diseñada profesionalmente para su negocio, 2) Acceso total a nuestra plataforma durante 1 mes para conectar sus sistemas y automatizar flujos de trabajo, y 3) Acceso continuo a Studio Lite después del primer mes para gestionar su contenido y ver facturas.",
      question2: "¿Qué es Studio Lite?",
      answer2:
        "Studio Lite es nuestra versión gratuita que le permite gestionar contenido básico en su página de inicio y ver facturas. Está incluido después de su primer mes de la Iniciativa PYME. Si necesita funciones más avanzadas, puede actualizar al Plan PYME de $59/mes.",
      question3: "¿Qué incluye el Plan PYME de $59/mes?",
      answer3:
        "El Plan PYME le da acceso total a todas las funciones del Studio, incluyendo gestión de contenido avanzada, análisis, ejecuciones ilimitadas de flujos de trabajo y soporte prioritario 24/7. También incluye nuestro sistema de gestión de facturas.",
      question4: "¿Puedo actualizar de Studio Lite al Plan PYME más tarde?",
      answer4:
        "¡Sí! En cualquier momento después de su primer mes, puede actualizar al Plan PYME para obtener acceso total a todas las funciones y soporte.",
    },

    blogNew: {
      // Page Titles & General
      title: "Crear nueva entrada de blog",
      titleCreate: "Crear nueva entrada de blog",
      titleEdit: "Editar entrada de blog",
      aiAssetUploadTab: "Subir manualmente",
      aiVeoGenerationTab: "Generar con Veo",
      aiAssetLibraryTab: "Desde biblioteca",
      aiAssetDriveTab: "Desde Drive",

      browseLibraryButton: "Explorar tu biblioteca de recursos",
      connectDriveButton: "Conectar y seleccionar de Google Drive",
      libraryPlaceholderText:
        "Aquí aparecerá la integración con tu biblioteca.",
      drivePlaceholderText:
        "Aquí aparecerá el selector de archivos de Google Drive.",
      assetSourceVeo: "IA (Veo)",
      assetSourceUpload: "Subido",
      assetSourceLibrary: "Biblioteca",
      assetSourceDrive: "Drive",
      noAssetsSelected:
        "Aún no se han añadido o generado recursos para esta entrada.",

      // Sections Titles (used in FormSection)
      section: {
        mainContent: {
          title: "Contenido principal",
        },
        seo: {
          title: "Configuración SEO",
        },
        publish: {
          title: "Detalles de publicación",
        },
        actions: {
          title: "Acciones finales",
        },
        aiStudio: {
          title: "Estudio de contenido y recursos con IA",
        },
        aiSeoAssistant: {
          title: "Asistente SEO con IA",
        },
      },

      // Form Fields: Labels, Placeholders, Notes
      field: {
        title: {
          label: "Título de la entrada",
          placeholder: "Ingresa el título de la entrada...",
        },
        content: {
          label: "Contenido",
          placeholder:
            "Comienza a escribir tu increíble entrada de blog aquí...",
          editorNote:
            "Consejo: Usa Markdown o integra un editor WYSIWYG para formato enriquecido.",
        },
        excerpt: {
          label: "Extracto (Opcional)",
          placeholder: "Un breve resumen de tu entrada...",
        },
        metaTitle: {
          label: "Meta título",
          placeholder: "Título optimizado para SEO (máx. 60 caracteres)",
        },
        metaDescription: {
          label: "Meta descripción",
          placeholder:
            "Resumen atractivo para resultados de búsqueda (máx. 160 caracteres)",
        },
        slug: {
          label: "Enlace permanente / Slug",
          placeholder: "ej., mi-increible-titulo-de-entrada",
          note: "Versión apta para URL de tu título. Se genera automáticamente si se deja en blanco.",
        },
        status: {
          label: "Estado:",
        },
        featuredImage: {
          label: "Imagen destacada",
          altPreview: "Vista previa de imagen destacada",
          changeButton: "Cambiar imagen",
          removeButton: "Eliminar imagen",
        },
        categories: {
          label: "Categorías",
          placeholder: "ej., Marketing, Consejos para PYMES",
          note: "Separadas por comas",
        },
        tags: {
          label: "Etiquetas",
          placeholder: "ej., seo, estrategia de contenido",
          note: "Separadas por comas",
        },
        publishAction: {
          label: "Elige acción:",
          publishNow: "Publicar ahora",
          schedule: "Programar",
        },
        scheduleTime: {
          label: "Fecha y hora de programación",
        },
      },

      // Status Values (for display and dropdowns)
      statusValue: {
        draft: "Borrador",
        publish: "Publicar ahora",
        schedule: "Programar para después",
        published: "Publicado",
      },

      // Buttons
      button: {
        saveDraft: "Guardar borrador",
        hidePublishOptions: "Ocultar opciones de publicación",
        showPublishOptions: "Publicar / Programar...",
        schedulePost: "Programar entrada",
        publishPost: "Publicar entrada",
        updatePost: "Actualizar entrada",
      },

      // AI Studio Section
      aiPromptLabel: "Tu idea central / Indicación",
      aiPromptPlaceholder:
        "ej., 'Los beneficios del SEO local para cafeterías en Costa Rica'",
      aiRefinePromptButton: "Refinar indicación con IA",
      aiGenerateBlogButton: "Generar borrador con Gemini",
      aiGeneratedContentTitle: "Borrador generado por IA",
      aiUseThisTitleButton: "Usar este título",
      aiUseThisContentButton: "Usar este contenido",
      aiUseThisExcerptButton: "Usar este extracto",

      // AI Asset Studio Section
      aiAssetStudioTitle: "Generación y gestión de recursos con IA",
      aiVeoPromptLabel: "Indicación visual para Veo",
      aiVeoPromptPlaceholder:
        "ej., 'Interior acogedor de una cafetería costarricense, luz de la mañana'",
      aiGenerateAssetsButton: "Generar imágenes con Veo",
      aiGeneratedAssetsTitle: "Recursos generados / subidos",
      aiSetAsFeaturedButton: "Establecer como destacado",
      aiInsertIntoContentButton: "Insertar en contenido (conceptual)",
      aiAssetUploadTab: "Subir manualmente",
      aiVeoGenerationTab: "Generar con Veo",
      featuredImageUploadButton: "Subir imagen",

      // AI SEO Assistant Section
      aiSeoAssistantTitle: "Asistente SEO con IA",
      aiAnalyzeContentButton: "Analizar y sugerir SEO",
      aiSuggestedMetaTitle: "Meta título sugerido:",
      aiSuggestedMetaDescription: "Meta descripción sugerida:",
      aiSuggestedKeywords: "Palabras clave/Etiquetas sugeridas:",
      aiUseSuggestionButton: "Usar sugerencia",

      // AI Status / Feedback Messages
      generatingText: "Generando, por favor espera...",
      refiningText: "Refinando...",
      analyzingText: "Analizando...",

      // Submission Status Messages
      savingStatus: "Guardando borrador...",
      publishingStatus: "Publicando entrada...",
      updatingStatus: "Actualizando entrada...",
      schedulingStatus: "Programando entrada...",

      // Error Messages
      error: {
        titleRequired: "El título de la entrada es obligatorio.",
        scheduleDateRequired:
          "Por favor selecciona una fecha y hora para programar la entrada.",
        promptRequired:
          "Por favor ingresa una indicación o idea para la generación con IA.",
        veoPromptRequired:
          "Por favor ingresa una indicación para la generación de recursos con Veo.",
        contentNeededForSeo:
          "Por favor proporciona un título o contenido para generar sugerencias SEO.",
      },

      // Success Messages
      success: {
        draftSaved: "¡Borrador guardado exitosamente!",
        published: "¡Entrada publicada exitosamente!",
        scheduled: "¡Entrada programada para {scheduledAt}!",
        actionCompleted: "¡Acción completada exitosamente!",
        updated: "¡Entrada actualizada exitosamente!",
      },
    },
    solutionsCipherForge: {
      pageTitle: "CipherForge™ | Computación Confidencial Segura Cuántica",
      pageHeaderTitle: "Solución CipherForge™",
      backToSolutions: "Todas las soluciones",

      // Hero Section
      heroTitle: "CipherForge™: Seguridad Irrompible para una Nueva Era",
      heroSubtitle:
        "Empodera tu empresa con privacidad matemáticamente garantizada y computación confidencial resistente a la cuántica. Protege datos en uso, desbloquea colaboración segura en IA y protege tus activos digitales.",
      heroCtaConsultation: "Agendar Consultoría de Seguridad",
      heroCtaWhitepaper: "Descargar Documento Técnico",

      // The Challenge Section
      challengeTitle: "La Amenaza Evolutiva a tu Activo Más Valioso: Los Datos",
      challengeP1:
        "En una era de sistemas distribuidos e IA colaborativa, los perímetros de seguridad tradicionales ya no son suficientes. Los datos sensibles, especialmente cuando se procesan o comparten, enfrentan riesgos sin precedentes.",
      challengeP2:
        "Además, el amanecer de la computación cuántica representa una amenaza existencial para los estándares de encriptación actuales, pudiendo volver obsoletas años de inversiones en seguridad de la noche a la mañana.",
      challengeP3:
        "Las organizaciones necesitan un enfoque proactivo, resiliente y matemáticamente seguro para la protección de datos.",

      // Introducing CipherForge Section
      introTitle: "CipherForge™: Tu Escudo en la Frontera Digital",
      introText:
        "CipherForge™ de LoyalShift es una plataforma revolucionaria de computación confidencial diseñada para proporcionar soberanía absoluta de datos. Al aprovechar técnicas criptográficas de vanguardia, aseguramos que tus datos permanezcan encriptados y verificablemente privados — en reposo, en tránsito y, crucialmente, durante el cómputo activo, incluso en entornos no confiables.",
      missionText:
        "Nuestra Misión: Hacer que las violaciones de privacidad y el mal uso de datos sean matemáticamente imposibles en IA distribuida y computación colaborativa.",
      visionText:
        "Nuestra Visión: Establecer el estándar global para computación confidencial segura cuántica y privacidad de datos verificable para 2027.",

      // Core Principles & Technologies Section
      corePrinciplesTitle:
        "Construido sobre una Base de Confianza e Innovación Irrompibles",
      principleFheTitle: "Encriptación Homomórfica Completa (FHE)",
      principleFheDesc:
        "Realiza cálculos complejos directamente en datos encriptados sin necesidad de desencriptarlos nunca. Ideal para procesamiento en la nube seguro y análisis que preservan la privacidad.",
      principleMpcTitle: "Cómputo Multipartito Seguro (MPC)",
      principleMpcDesc:
        "Permite que múltiples partes calculen funciones sobre sus datos privados sin revelar los datos mismos a otros. Perfecto para IA colaborativa y compartir datos.",
      principleTeeTitle: "Entornos de Ejecución Confiables (TEEs)",
      principleTeeDesc:
        "Utiliza enclaves seguros basados en hardware para aislar y proteger código y datos en uso, incluso de software privilegiado del sistema.",
      principleQrcTitle: "Criptografía Resistente a Cuántica (QRC)",
      principleQrcDesc:
        "Emplea algoritmos de próxima generación diseñados para resistir ataques de futuras computadoras cuánticas, asegurando seguridad de datos a largo plazo.",

      // Transformative Benefits Section
      benefitsTitle: "Beneficios Transformadores para tu Empresa",
      benefit1Title: "Seguridad de Datos sin Precedentes",
      benefit1Desc:
        "Protege información sensible durante todo su ciclo de vida con encriptación de extremo a extremo, incluyendo datos en uso.",
      benefit2Title: "Desbloquea IA Colaborativa",
      benefit2Desc:
        "Facilita el entrenamiento e inferencia de modelos de IA que preservan la privacidad entre organizaciones sin compartir datos crudos.",
      benefit3Title: "Garantías Matemáticas",
      benefit3Desc:
        "Logra pruebas verificables de privacidad e integridad, yendo más allá de las garantías de seguridad basadas en políticas.",
      benefit4Title: "Protección de Inversiones Futuras",
      benefit4Desc:
        "Mitiga riesgos de amenazas cuánticas emergentes con algoritmos avanzados resistentes a cuántica.",
      benefit5Title: "Construye Confianza Digital",
      benefit5Desc:
        "Mejora la confianza con clientes y socios demostrando un compromiso verificable con la protección de datos.",
      benefit6Title: "Habilita Nuevos Modelos de Negocio",
      benefit6Desc:
        "Crea nuevos flujos de ingresos y oportunidades colaborativas basadas en compartir datos de forma segura y privada.",

      // Industry Applications Section
      applicationsTitle: "CipherForge™ en Acción: Casos de Uso por Industria",
      industryGovernment: "Gobierno y Seguridad Nacional",
      industryFinance: "Finanzas y Banca",
      industryHealthcare: "Salud y Ciencias de la Vida",
      industryDefense: "Defensa y Aeroespacial",
      industryCloud: "Proveedores y Plataformas en la Nube",
      // Use Case Example (Government)
      useCaseGovTitle: "Intercambio de Inteligencia Seguro entre Agencias",
      useCaseGovProblem:
        "Las agencias necesitan colaborar en inteligencia sensible pero se ven obstaculizadas por soberanía de datos, niveles de clasificación y riesgos de brechas.",
      useCaseGovSolution:
        "CipherForge™ crea un entorno MPC seguro. Las agencias contribuyen datos encriptados; los modelos analíticos conjuntos se ejecutan sobre estos datos encriptados usando FHE y TEEs. Los protocolos resistentes a cuántica aseguran seguridad a largo plazo.",
      useCaseGovOutcome:
        "Detección de amenazas mejorada en 40% mediante fusión de inteligencia oportuna y segura sin comprometer propiedad de datos, con rastros de auditoría verificables.",
      viewMoreUseCases: "Ver más casos de uso",
      viewLessUseCases: "Ver menos",

      // Why LoyalShift's CipherForge Section
      whyCipherForgeTitle: "La Ventaja LoyalShift: ¿Por qué CipherForge™?",
      whyItemExpertise: "Experiencia Profunda en Criptografía e IA",
      whyItemExpertiseDesc:
        "Nuestro equipo comprende investigadores líderes en criptografía aplicada, computación confidencial e integración de IA.",
      whyItemEnterpriseGrade: "Implementación para Empresas",
      whyItemEnterpriseGradeDesc:
        "Entregamos soluciones de seguridad confiables, escalables y manejables para entornos empresariales complejos.",
      whyItemEcosystem: "Ecosistema LoyalShift Integrado",
      whyItemEcosystemDesc:
        "CipherForge™ se integra perfectamente con Audit Guardian™ para cumplimiento verificable y Universal Adapter™ para ingesta segura de datos.",
      whyItemVisionary: "Enfoque Visionario y Resiliente",
      whyItemVisionaryDesc:
        "Estamos comprometidos con pionear seguridad post-cuántica, asegurando que tus datos permanezcan protegidos por décadas.",

      // Final CTA Section
      finalCtaTitle: "Protege el Futuro de tus Datos. Hoy.",
      finalCtaSubtitle:
        "La transición a una postura de seguridad primero-privacidad y resistente a cuántica es un imperativo estratégico. CipherForge™ de LoyalShift proporciona la tecnología y experiencia para liderar con confianza.",
      finalCtaButtonPrimary: "Solicitar una Sesión Confidencial",
      finalCtaButtonSecondary: "Explorar Documentación Técnica",
    },
    aboutUs: {
      heroPhase1: "Tendiendo Puentes entre Legado y Futuro",
      heroPhase2: "Modernización Inteligente",
      heroPhase3: "Transformación Sin Disrupción",
      heroTitleMain: "Modernizando Sistemas Empresariales,",
      heroTitleAccent: "Respetando tu Legado",
      heroSubtitle:
        "LoyalShift tiende puentes entre décadas de operaciones establecidas y el potencial de la IA a prueba de futuro, permitiendo transformación sin disrupción.",

      purposeSectionAriaLabel: "Nuestro Propósito",
      purposeTitle: "Nuestro Propósito",
      purposeSubtitle: "Por qué existimos",
      purposeText:
        "Creemos que la tecnología debe empoderar, no obstaculizar. Nuestro propósito es liberar el vasto potencial atrapado dentro de los sistemas heredados.",
      missionTitle: "Misión",
      missionText:
        "Transformar sistemas empresariales obsoletos en operaciones ágiles impulsadas por IA sin disrupción.",
      visionTitle: "Visión",
      visionText:
        "Un futuro donde ninguna empresa se vea limitada por su pasado tecnológico.",
      valuesTitle: "Valores Fundamentales",
      coreValue1: "Modernización Cero-Disrupción",
      coreValue2: "Automatización con IA Explicable",
      coreValue3: "Arquitectura a Prueba de Futuro",
      coreValue4: "Seguridad Innegociable",
      coreValue5: "Asociación Transparente",
      coreValue6: "Respeto por el Legado",

      approachTitle: "Nuestro Enfoque",
      approachSubtitle: "Modernización Inteligente",
      approachText:
        "Combinamos profunda comprensión de sistemas con IA de vanguardia y explicable para trabajar junto a tu infraestructura existente.",
      approachVisualPlaceholder:
        "Representación visual de AgentHub y modernización",
      approachFeature1Title: "Cero-Disrupción con Smart Mirror™",
      approachFeature1Content:
        "Prueba cambios de forma segura contra datos en vivo en un entorno paralelo antes de implementarlos.",
      approachFeature2Title: "Conectividad Universal Adapter™",
      approachFeature2Content:
        "Integra fuentes heredadas con aplicaciones modernas sin compleja reingeniería.",
      approachFeature3Title: "Cumplimiento Audit Guardian™",
      approachFeature3Content:
        "Asegura seguridad y cumplimiento con acciones de IA rastreables para estándares como SOC2 y HIPAA.",

      peopleTitle: "Nuestra Gente",
      peopleSubtitle: "Experiencia y Colaboración",
      peopleText:
        "Un equipo diverso de experimentados investigadores de IA, integradores de sistemas y arquitectos empresariales unidos por una pasión por resolver complejos desafíos de legado.",
      joinTeamButton: "Únete a Nuestro Equipo",

      socialProofTitle: "Resultados Comprobados",
      socialProofSubtitle: "Éxito de Clientes",
      socialProofTrustedBy: "Confiado por Líderes de la Industria",
      socialProofQuote:
        '"El enfoque de LoyalShift minimizó el riesgo y entregó valor mucho más rápido de lo que creíamos posible."',
      socialProofQuoteAuthor: "— Jefe de TI, Firma Global de Logística",

      finalCtaTitleMain: "¿Listo para Modernizar",
      finalCtaTitleAccent: "Sin Disrupción?",
      finalCtaSubtitle:
        "Descubre cómo nuestro enfoque único entrega resultados medibles con seguridad garantizada y una transición sin problemas.",
      talkToSalesButton: "Hablar con Ventas",
      requestDemoButton: "Solicitar Demo",
    },
    aboutUsSMB: {
      sectionTitle: "Empoderando Pequeñas y Medianas Empresas",
      sectionSubtitle: "Soluciones Dedicadas para tu Crecimiento",
      introTextP1:
        "En LoyalShift, creemos en el poder y potencial de las Pequeñas y Medianas Empresas (PYMES). Por eso hemos desarrollado un conjunto dedicado de herramientas y servicios adaptados a tus necesidades y presupuesto únicos, ayudándote a prosperar en el panorama digital de Costa Rica.",
      introTextP2:
        "Nuestra iniciativa para PYMES se basa en el principio de proporcionar soluciones digitales accesibles, potentes y fáciles de usar.",

      studioTitle: "Presentando el LoyalShift SMB Studio",
      studioText:
        "Impulsado por nuestro versátil módulo AgentHub, el SMB Studio es tu centro de comando intuitivo. Simplifica la gestión de tu sitio web profesional, la interacción con clientes y la comprensión de tu desempeño en línea.",

      starterPlanTitle: "Tu Viaje Comienza Aquí: El Plan de Inicio de Un Mes",
      starterPlanText:
        "Los nuevos clientes PYMES comienzan con nuestro asequible plan de inicio de un mes. Este plan te brinda una base de sitio web diseñado profesionalmente y acceso a **SMB Studio Lite** — una versión simplificada de nuestro estudio con herramientas esenciales para gestionar tu presencia en línea central, incluyendo:",
      studioLiteFeature1:
        "Actualizaciones de Contenido Fáciles: Edita texto e imágenes en tu sitio web sin esfuerzo.",
      studioLiteFeature2:
        "Gestión Básica de Blog: Comienza a compartir tu experiencia y conectar con tu audiencia.",
      studioLiteFeature3:
        "Integración de Formulario de Contacto: Captura leads directamente desde tu sitio.",
      studioLiteFeature4:
        "Diseño Responsivo para Móviles: Asegura que tu sitio se vea genial en todos los dispositivos.",

      fullStudioTitle: "Desbloquea Todo el Potencial con SMB Studio",
      fullStudioText:
        "Después de tu mes inicial, continúa con el SMB Studio completo para acceder a un conjunto ampliado de funciones diseñadas para crecimiento y eficiencia continuos:",
      studioFeature1:
        "Gestión de Contenido Avanzada: Más control sobre la estructura y tipos de contenido de tu sitio web.",
      studioFeature2:
        "Herramientas Integrales de Blogging: Incluyendo categorías, etiquetas y asistencia SEO.",
      studioFeature3:
        "Gestión de Leads y CRM Básico: Organiza y rastrea tus interacciones con clientes.",
      studioFeature4:
        "Panel de Análisis: Comprende el tráfico de tu sitio web y el comportamiento de los visitantes.",
      studioFeature5:
        "Biblioteca de Recursos: Gestiona todas tus imágenes y archivos digitales en un solo lugar.",
      studioFeature6:
        "Asistencia con IA: Aprovecha herramientas (como integración con Gemini para contenido) para ahorrar tiempo y mejorar calidad (las funciones varían por plan).",

      ctaTitle: "¿Listo para Elevar tu PYME?",
      ctaButton: "Explorar Soluciones para PYMES",
      ctaLink: "/smb",
    },
    smbContact: {
      pageTitle: "Contáctanos | LoyalShift PYMES",
      mainTitle: "Hablemos sobre tu Negocio",
      mainSubtitle:
        "Estamos emocionados por conocer tu PYME y cómo podemos ayudarte a prosperar en línea. Completa el formulario o agenda una llamada directamente.",

      // Form Section
      formTitle: "Envíanos un Mensaje",
      formNameLabel: "Nombre Completo",
      formNamePlaceholder: "ej., Ana Rodríguez",
      formEmailLabel: "Correo Electrónico",
      formEmailPlaceholder: "tu@ejemplo.com",
      formCompanyLabel: "Nombre de la Empresa (Opcional)",
      formCompanyPlaceholder: "ej., Mi Cafecito Ideal",
      formIndustryLabel: "Tu Industria",
      formIndustrySelectDefault: "Selecciona tu industria...",
      formIndustryOptionRetail: "Retail / Comercio Electrónico",
      formIndustryOptionFood: "Alimentos y Bebidas / Restaurante",
      formIndustryOptionServices:
        "Servicios Profesionales (Consultoría, Legal, etc.)",
      formIndustryOptionHealth: "Salud y Bienestar",
      formIndustryOptionTourism: "Turismo y Hotelería",
      formIndustryOptionManufacturing: "Manufactura / Artesanía",
      formIndustryOptionEducation: "Educación",
      formIndustryOptionOther: "Otro",
      formContextLabel: "¿Qué estás buscando? (agrega etiquetas)",
      formContextPlaceholder:
        "Escribe una necesidad (ej., Nuevo Sitio Web) y presiona Enter...",
      formContextTagLimit: "Puedes agregar hasta 5 etiquetas.",
      formMessageLabel: "Tu Mensaje (Opcional)",
      formMessagePlaceholder:
        "Cuéntanos más sobre tu proyecto, preguntas o necesidades específicas...",
      formSubmitButton: "Enviar Mensaje y Continuar",
      formSubmittingButton: "Enviando...",
      formSubmitSuccess:
        "¡Mensaje enviado! Nos pondremos en contacto pronto. Ahora puedes agendar una llamada abajo.",
      formSubmitError:
        "¡Oops! Algo salió mal. Por favor intenta enviar tu mensaje nuevamente.",

      // Calendly Section
      calendlyTitle: "Agenda tu Consulta Gratuita",
      calendlyText:
        "Elige un horario que te funcione para conversar con uno de nuestros especialistas en PYMES. Discutiremos tus objetivos y cómo LoyalShift puede ayudarte.",
      calendlyLoading: "Cargando opciones de agendamiento...",

      // Enterprise CTA Section
      enterpriseCtaText:
        "¿Eres una empresa de nivel empresarial o buscas soluciones personalizadas a mayor escala?",
      enterpriseCtaButton: "Contactar a Nuestro Equipo de Ventas Principal",
    },
    smbStudioAnalytics: {
      pageTitle: "Panel de Análisis | SMB Studio",
      mainTitle: "El Desempeño de tu Negocio",
      mainSubtitle:
        "Sigue métricas clave y entiende cómo tu audiencia interactúa con tu presencia en línea.",

      dateRangeLabel: "Rango de Fechas:",
      last7Days: "Últimos 7 Días",
      last30Days: "Últimos 30 Días",
      last90Days: "Últimos 90 Días",
      customRange: "Personalizado",

      // KPI Cards
      kpiTotalVisitors: "Visitantes Totales",
      kpiPageViews: "Vistas de Página",
      kpiBounceRate: "Tasa de Rebote",
      kpiAvgSessionDuration: "Duración Promedio",
      kpiNewLeads: "Nuevos Leads",
      kpiConversionRate: "Tasa de Conversión",

      // Sections
      websiteTrafficSectionTitle: "Resumen de Tráfico del Sitio",
      trafficOverTimeChartTitle: "Visitantes en el Tiempo",
      trafficSourcesChartTitle: "Principales Fuentes de Tráfico",
      trafficSourceOrganic: "Búsqueda Orgánica",
      trafficSourceDirect: "Directo",
      trafficSourceReferral: "Referencia",
      trafficSourceSocial: "Redes Sociales",
      trafficSourceOther: "Otro",

      contentPerformanceSectionTitle: "Desempeño de Contenido",
      topPagesTableTitle: "Páginas y Publicaciones con Mejor Desempeño",
      pageColumnHeader: "Título de Página / Publicación",
      viewsColumnHeader: "Vistas",
      engagementColumnHeader: "Compromiso Promedio",

      audienceInsightsSectionTitle: "Información sobre la Audiencia",
      newVsReturningChartTitle: "Visitantes Nuevos vs. Recurrentes",
      audienceNewVisitors: "Visitantes Nuevos",
      audienceReturningVisitors: "Visitantes Recurrentes",

      // General / Placeholders
      chartPlaceholderText: "Aquí aparecerán los datos del gráfico.",
      tableNoData: "No hay datos disponibles para este período.",
      comingSoon: "¡Próximamente análisis más detallados!",
      selectPeriod: "Selecciona un período para ver datos.",
    },
    smbBlogEditor: {
      pageTitleCreate: "Crear Nueva Entrada de Blog",
      pageTitleEdit: "Editar Entrada de Blog",
      // Main Content Area
      titleLabel: "Título de la Entrada",
      titlePlaceholder: "Ingresa tu atractivo título de entrada aquí...",
      contentLabel: "Contenido Principal",
      contentPlaceholder: "Comienza a escribir tu increíble entrada de blog...",
      // Settings Sidebar
      publishOptionsTitle: "Opciones de Publicación",
      settingsTitle: "Configuración de la Entrada",
      statusLabel: "Estado:",
      statusDraft: "Borrador",
      statusPublished: "Publicado",
      statusScheduled: "Programado",
      visibilityLabel: "Visibilidad:",
      visibilityPublic: "Público",
      visibilityPrivate: "Privado",
      publishDateLabel: "Fecha de Publicación:",
      publishImmediately: "Inmediatamente",
      scheduleButton: "Programar...",
      categoriesLabel: "Categorías",
      categoriesPlaceholder:
        "ej., Consejos de Negocios, Noticias (separadas por comas)",
      tagsLabel: "Etiquetas",
      tagsPlaceholder: "ej., marketing, pymes, costa rica",
      excerptLabel: "Extracto (Opcional)",
      excerptPlaceholder: "Un breve resumen para vistas previas de entradas...",
      featuredImageLabel: "Imagen Destacada",
      featuredImageUploadButton: "Subir Imagen",
      featuredImageChangeButton: "Cambiar Imagen",
      featuredImageRemoveButton: "Eliminar",
      seoSettingsTitle: "SEO y Compartir",
      slugLabel: "Slug de la Entrada (URL)",
      slugPlaceholder: "tu-titulo-de-entrada-aqui",
      metaTitleLabel: "Meta Título (SEO)",
      metaTitlePlaceholder: "Título optimizado para motores de búsqueda...",
      metaDescriptionLabel: "Meta Descripción (SEO)",
      metaDescriptionPlaceholder:
        "Resumen atractivo para resultados de búsqueda...",
      // AI Assistant Section
      aiAssistantTitle: "Asistente de Escritura con IA (Gemini)",
      aiGenerateTitleButton: "Sugerir Títulos",
      aiDraftSectionButton: "Redactar Sección",
      aiImproveTextButton: "Mejorar Redacción",
      aiSummarizeButton: "Crear Extracto",
      aiSeoOptimizeButton: "Sugerir Meta SEO",
      aiGenerating: "Generando...",
      // Action Buttons
      saveDraftButton: "Guardar Borrador",
      publishButton: "Publicar",
      updateButton: "Actualizar Entrada",
      savingStatus: "Guardando...",
      publishingStatus: "Publicando...",
      updatingStatus: "Actualizando...",
    },

    pricing: {
      enterprise: {
        description:
          "Si eres una empresa de mayor escala con necesidades más complejas y específicas, por favor visita nuestras soluciones empresariales.",
      },
      value: {
        fastImplementation: "Implementación Rápida",
        fastImplementationDesc:
          "Ponte en marcha rápidamente con nuestra incorporación optimizada y despliegue eficiente de plataforma.",
        globalCompliance: "Listo para Cumplimiento Global",
        globalComplianceDesc:
          "Construido con estándares internacionales en mente, asegurando que el manejo de tus datos cumpla con rigurosos requisitos de cumplimiento.",
        dedicatedSupport: "Soporte Dedicado",
        dedicatedSupportDesc:
          "Accede a asistencia experta de nuestro equipo de soporte dedicado, listo para ayudarte a tener éxito en cada paso.",
      },
    },

    smbPlatformFeatures: {
      pageTitle: "Funciones del SMB Studio | LoyalShift PYMES",
      heroTitle: "Herramientas Simples, Resultados Poderosos para tu Negocio",
      heroSubtitle:
        "Descubre las funciones del LoyalShift SMB Studio, diseñado para hacer que gestionar tu presencia en línea sea fácil, efectivo y sin estrés.",
      heroCtaButton: "Explora las Funciones Abajo",

      introTitle: "Gestiona tu Mundo Digital, Sin Esfuerzo",
      introTextP1:
        "Nuestro SMB Studio te proporciona control intuitivo sobre tu sitio web, contenido, interacciones con clientes y más — todo en una plataforma accesible.",
      introTextP2:
        "Diseñado específicamente para las necesidades dinámicas de dueños de PYMES en Costa Rica, te ayudamos a ahorrar tiempo y enfocarte en lo que haces mejor: dirigir tu negocio.",

      featuresMainTitle: "Funciones Clave de tu SMB Studio",

      featureWebsiteMgmtTitle: "Editor Fácil de Sitio Web",
      featureWebsiteMgmtText:
        "Actualiza el texto, imágenes e información esencial de tu sitio web al instante. No se requieren habilidades técnicas para mantener tu vitrina en línea fresca y atractiva.",
      featureWebsiteMgmtBenefit:
        "Beneficio: Presenta siempre una imagen profesional y actualizada en línea.",

      featureBlogTitle: "Herramientas de Blog Integradas",
      featureBlogText:
        "Crea, programa y publica entradas de blog perspicaces directamente desde tu estudio. Comparte tu experiencia, conecta con tu audiencia y mejora el SEO de tu sitio.",
      featureBlogBenefit:
        "Beneficio: Atrae más visitantes y establece liderazgo de pensamiento.",

      featureLeadsTitle: "Gestión Simple de Leads",
      featureLeadsText:
        "Captura consultas de los formularios de tu sitio web y mantén un seguimiento organizado de las interacciones con clientes potenciales.",
      featureLeadsBenefit:
        "Beneficio: Nunca pierdas una oportunidad de conectar con un cliente potencial.",

      featureAnalyticsTitle: "Panel de Análisis Básico",
      featureAnalyticsText:
        "Obtén una visión clara del tráfico de tu sitio web: ve cuántos visitantes recibes y qué contenido es más popular, todo presentado simplemente.",
      featureAnalyticsBenefit:
        "Beneficio: Comprende a tu audiencia y toma decisiones informadas.",

      featureAssetsTitle: "Biblioteca Central de Recursos",
      featureAssetsText:
        "Sube, almacena y gestiona tus imágenes, documentos y otros archivos digitales en un lugar seguro y fácilmente accesible dentro del estudio.",
      featureAssetsBenefit:
        "Beneficio: Mantente organizado y asegura consistencia de marca en tus materiales.",

      featureSeoToolsTitle: "Herramientas SEO Básicas",
      featureSeoToolsText:
        "Optimiza tus títulos de página, descripciones y palabras clave para mejorar tu visibilidad en motores de búsqueda como Google.",
      featureSeoToolsBenefit:
        "Beneficio: Ayuda a más clientes a encontrarte en línea.",

      benefitsSummaryTitle: "Diseñado para tu Éxito en Costa Rica",
      benefitItemTime:
        "Ahorra Tiempo: Herramientas intuitivas que simplifican tus tareas digitales.",
      benefitItemAffordable:
        "Asequible: Funciones potentes sin el precio empresarial.",
      benefitItemGrowth:
        "Crece en Línea: Atrae más clientes y construye tu marca efectivamente.",
      benefitItemEasy:
        "Fácil de Usar: Sin curva de aprendizaje empinada, comienza rápidamente.",
      benefitItemLocal:
        "Soporte Local: Asistencia amigable de nuestro equipo costarricense.",

      finalCtaTitle: "¿Listo para Simplificar tu Gestión Digital?",
      finalCtaText:
        "Empodera tu PYME con las herramientas que necesita para tener éxito en línea. Descubre cómo el SMB Studio puede marcar la diferencia para tu negocio.",
      finalCtaButton: "Aprende Más y Comienza",
    },
    smbAboutUsPage: {
      pageTitle: "Acerca de LoyalShift para PYMES",
      headerTitle: "Empoderando tu Negocio en la Era Digital",
      headerSubtitle:
        "Descubre cómo LoyalShift está dedicado a ayudar a Pequeñas y Medianas Empresas en Costa Rica a prosperar en línea.",

      missionSectionTitle: "Nuestra Misión para PYMES",
      missionTextP1:
        "Nuestra misión es proporcionar herramientas digitales accesibles, potentes y fáciles de usar y sitios web profesionales que empoderen a las PYMES en Costa Rica para hacer crecer su marca, llegar a más clientes y optimizar sus operaciones.",
      missionTextP2:
        "Creemos que cada negocio, sin importar su tamaño, merece una presencia digital fuerte y efectiva para competir y tener éxito.",

      whoWeAreSectionTitle: "Quiénes Somos",
      whoWeAreTextP1:
        "LoyalShift es un socio tecnológico comprometido con la innovación y el éxito tangible del cliente. Mientras ofrecemos una gama de soluciones sofisticadas para empresas más grandes, nuestra iniciativa 'LoyalShift para PYMES' está especialmente diseñada con las necesidades, desafíos y presupuestos únicos de las pequeñas y medianas empresas en su núcleo.",
      whoWeAreTextP2:
        "Somos un equipo apasionado de desarrolladores, diseñadores y estrategas, orgullosos de estar basados en Costa Rica. Nuestra profunda comprensión del mercado local nos impulsa a ofrecer servicios digitales que realmente resuenan y marcan la diferencia para nuestra comunidad empresarial.",

      howWeHelpSectionTitle: "Cómo Empoderamos tu Negocio",
      howWeHelpItem1Title: "Sitios Web Profesionales",
      howWeHelpItem1Text:
        "Sitios web impresionantes y adaptables a móviles, personalizados para tu marca, diseñados para convertir visitantes en clientes leales.",
      howWeHelpItem2Title: "Plataforma SMB Studio",
      howWeHelpItem2Text:
        "Una plataforma backend intuitiva (SMB Studio) para gestionar sin esfuerzo el contenido de tu sitio web, blog, interacciones con clientes y obtener información de análisis básicos.",
      howWeHelpItem3Title: "Herramientas Digitales y Eficiencia",
      howWeHelpItem3Text:
        "Acceso a herramientas digitales prácticas y estrategias destinadas a ahorrarte tiempo y mejorar la eficiencia en tus operaciones diarias.",
      howWeHelpItem4Title: "Soporte y Asociación Local",
      howWeHelpItem4Text:
        "Orientación continua, recursos y soporte dedicado de un equipo local que realmente comprende el mercado costarricense y está comprometido con tu éxito.",

      ourValuesSectionTitle: "Nuestros Valores Fundamentales",
      value1Title: "Accesibilidad",
      value1Text:
        "Hacer herramientas digitales potentes asequibles y sencillas para cada PYME.",
      value2Title: "Asociación",
      value2Text:
        "Construir relaciones colaborativas trabajando estrechamente contigo para comprender tu visión y lograr tus objetivos.",
      value3Title: "Calidad y Confiabilidad",
      value3Text:
        "Entregar soluciones de software y sitios web de alta calidad y confiables que generen resultados.",
      value4Title: "Compromiso Local",
      value4Text:
        "Apoyar activamente el crecimiento, la innovación y la transformación digital de las empresas aquí en Costa Rica.",

      ctaSectionTitle: "¿Listo para Elevar tu Presencia Digital?",
      ctaText:
        "Hablemos sobre cómo LoyalShift para PYMES puede ayudar a tu negocio a brillar en el panorama digital. ¡Explora nuestras soluciones o contáctanos hoy para una charla amigable!",
      ctaButtonSolutions: "Explora Soluciones para PYMES",
      ctaButtonContact: "Contáctanos",
    },
    smbStudioBlogInfo: {
      pageTitle: "Tu Blog en SMB Studio | Resumen",
      mainTitle: "Libera el Poder de tu Blog para PYMES",
      intro:
        "Tu blog es una herramienta vital para conectar con clientes, compartir tu experiencia y aumentar tu visibilidad en línea. Aprende cómo el SMB Studio te empodera para gestionar todo tu blog efectivamente y generar resultados para tu negocio.",
      moduleLabel: "Gestión de Blog",

      sectionWhyBlogTitle: "Por qué tu PYME Necesita un Blog Activo",
      whyBlogIntro:
        "Un blog activo y bien mantenido puede beneficiar significativamente a tu Pequeña o Mediana Empresa al:",
      whyBlogItemSeo:
        "Mejorar el Posicionamiento en Motores de Búsqueda (SEO): El contenido fresco y relevante ayuda a motores como Google a encontrar y posicionar mejor tu sitio web.",
      whyBlogItemAuthority:
        "Establecer Experiencia y Autoridad: Comparte tu conocimiento y posiciona tu negocio como un recurso de referencia en tu industria.",
      whyBlogItemAudience:
        "Comprometer a tu Audiencia: Construye una comunidad leal, fomenta relaciones más profundas con clientes y anima la interacción.",
      whyBlogItemTraffic:
        "Generar Tráfico al Sitio Web: Atrae nuevos visitantes calificados que estén activamente interesados en tus productos, servicios o industria.",
      whyBlogItemLeadGen:
        "Generar Leads: Convierte lectores en clientes potenciales ofreciendo información valiosa y llamados claros a la acción.",

      sectionCoreFeaturesTitle:
        "Funciones Principales de Gestión de Blog en SMB Studio",
      coreFeaturesIntro:
        "El SMB Studio proporciona un centro centralizado e intuitivo para todas tus actividades de blogging:",
      coreFeaturePostListing:
        "Gestión Centralizada de Entradas: Ve, busca, filtra y gestiona todas tus entradas de blog desde un solo panel organizado. Accede rápidamente a opciones para editar, eliminar o ver detalles de entradas individuales.",
      coreFeatureCategoriesTags:
        "Organización Efectiva de Contenido: Crea y gestiona categorías y etiquetas globales para estructurar tu contenido de blog lógicamente. Esto ayuda a los lectores a encontrar fácilmente temas de interés y mejora la navegación del sitio.",
      coreFeatureGlobalSettings:
        "Configuración Global del Blog: Personaliza el título principal y el eslogan descriptivo de tu blog (importante para SEO), establece preferencias de moderación de comentarios (ej., habilitar/deshabilitar, aprobar comentarios), y define cómo se muestran las entradas en tu sitio web en vivo (ej., número de entradas por página).",
      coreFeatureIntegration:
        "Integración Perfecta con el Sitio Web: Tu blog está diseñado para integrarse perfectamente con tu sitio web principal de PYME, asegurando una experiencia de marca consistente y navegación fácil para tus visitantes.",

      sectionTipsTitle:
        "Consejos para una Estrategia de Blog Exitosa para PYMES",
      tipsIntro:
        "Maximiza el impacto de tu blog con estas estrategias comprobadas:",
      tipConsistency:
        "La Consistencia es Clave: Establece y mantén un horario de publicación regular que tu audiencia pueda anticipar. Calidad sobre cantidad, pero la regularidad importa.",
      tipValue:
        "Proporciona Valor Real: Enfócate en crear contenido que eduque, informe, entretenga o resuelva problemas para tu audiencia objetivo.",
      tipKeywords:
        "Optimiza para Palabras Clave: Investiga e incorpora naturalmente palabras clave relevantes que tus clientes potenciales están buscando.",
      tipPromote:
        "Promociona tus Entradas: No solo escribas y olvides. Comparte el contenido de tu blog en tus canales de redes sociales, boletines por correo y otras plataformas relevantes.",
      tipEngage:
        "Interactúa con los Comentarios: Fomenta una comunidad respondiendo a comentarios y preguntas de lectores de manera oportuna y reflexiva.",
      tipAnalyze:
        "Analiza el Desempeño: Usa los análisis básicos en tu SMB Studio para ver qué temas resuenan más y refina tu estrategia de contenido.",

      ctaManagePosts: "Gestiona tus Entradas de Blog",
      ctaWriteNewPost: "Escribe una Nueva Entrada",
      sectionContentToolsTitle: "Herramientas de Creación de Contenido",
      contentToolsIntro:
        "Herramientas poderosas para crear, optimizar y programar tu contenido.",
      contentToolsCreating:
        "Editor de texto enriquecido con soporte multimedia",
      contentToolsScheduling: "Programa entradas para publicación futura",
      contentToolsSeo: "Herramientas de optimización SEO integradas",
      contentToolsAi: "Asistencia de contenido con IA",
    },
    loyalShiftSMBFooter: {
      logoAlt: "Logo de LoyalShift",
      introText:
        "Empoderando a pequeñas y medianas empresas en Costa Rica con soluciones digitales inteligentes y accesibles.",
      navHeader: "Navegación",
      navAboutUsSMB: "Sobre Nosotros (PYMES)",
      navSolutionsSMB: "Soluciones para PYMES",
      navPricingSMB: "Precios para PYMES",
      navMoreHeader: "Más",
      navResourcesBlog: "Recursos y Blog",
      navSupportSMB: "Soporte para PYMES",
      navContact: "Contacto",
      legalHeader: "Legal",
      legalPrivacyPolicy: "Política de Privacidad",
      legalTermsOfService: "Términos de Servicio",
      followUsHeader: "Síguenos",
      socialLinkedInTitle: "LoyalShift en LinkedIn",
      socialGitHubTitle: "LoyalShift en GitHub",
      socialInstagramTitle: "LoyalShift en Instagram",
      socialTwitterTitle: "LoyalShift en X (antes Twitter)",
      socialHuggingFaceTitle: "LoyalShift en HuggingFace",
      copyrightText:
        "© {currentYear} LoyalShift Technologies. Una iniciativa para PYMES en Costa Rica. Todos los derechos reservados.",
    },
    smbLandingPage: {
      heroTitle: "Soluciones Digitales Creadas para el Éxito de tu PYME",
      heroSubtitle:
        "Sitios web profesionales, herramientas fáciles de usar y soporte local dedicado. Ayudamos a las pequeñas y medianas empresas costarricenses a prosperar en línea.",
      heroCtaButton: "Descubre Nuestras Soluciones",
      heroSecondaryCtaButton: "Obtén un Presupuesto Gratis",

      trustIndicator1: "Orgullosamente Costarricense",
      trustIndicator2: "Enfocado en PYMES",
      trustIndicator3: "Orientado a Resultados",

      offeringsTitle: "Todo lo que tu Negocio Necesita para Brillar en Línea",
      offeringWebsiteTitle: "Sitios Web Impresionantes",
      offeringWebsiteText:
        "Sitios web personalizados, adaptables a móviles que muestran tu marca y convierten visitantes en clientes.",
      offeringStudioTitle: "SMB Studio Lite",
      offeringStudioText:
        "Gestiona el contenido de tu sitio web, blog y leads con nuestra plataforma backend intuitiva y fácil de usar.",
      offeringToolsTitle: "Herramientas Digitales Esenciales",
      offeringToolsText:
        "Acceso a herramientas y estrategias seleccionadas para SEO, análisis básicos y mejorar tu visibilidad en línea.",
      offeringSupportTitle: "Soporte Local Dedicado",
      offeringSupportText:
        "Soporte experto y amigable de nuestro equipo costarricense, listo para ayudarte en cada paso.",

      processTitle: "Comenzar es Sencillo",
      processStep1Title: "1. Llamada de Descubrimiento",
      processStep1Text:
        "Hablaremos sobre tu negocio, objetivos y necesidades específicas. Sin obligaciones, solo una conversación amigable.",
      processStep2Title: "2. Propuesta Personalizada",
      processStep2Text:
        "Recibe una propuesta clara y directa que describe las mejores soluciones para tu PYME.",
      processStep3Title: "3. Diseño y Construcción",
      processStep3Text:
        "Nuestro equipo experto se pone a trabajar, creando tu poderosa y profesional presencia digital.",
      processStep4Title: "4. Lanzamiento y Soporte",
      processStep4Text:
        "¡Hazte público! Estaremos ahí para un lanzamiento sin problemas y proporcionaremos soporte continuo para asegurar tu éxito continuo.",

      testimonialsTitle: "Confiado por Negocios como el Tuyo",
      testimonialPlaceholder:
        "¡Próximamente historias y éxitos reales de PYMES costarricenses!",

      finalCtaTitle: "¿Listo para Hacer Crecer tu PYME con LoyalShift?",
      finalCtaText:
        "Da el primer paso hacia un futuro digital más fuerte y efectivo. Construyamos algo increíble juntos para tu negocio.",
      finalCtaButton: "Solicita tu Consulta Gratuita",
    },
    smbStudioPostInfo: {
      pageTitle: "Entendiendo las Entradas en SMB Studio",
      mainTitle: "Dominando tus Entradas de Blog",
      intro:
        "Las entradas individuales de blog son el corazón de tu estrategia de contenido. Esta guía explica cómo usar el SMB Studio para crear, editar y gestionar entradas atractivas que comprometan a tu audiencia y aumenten tu presencia en línea.",

      sectionCreatingTitle: "Creando y Editando Entradas",
      creatingIntro:
        "El Editor de Entradas es tu herramienta principal para dar vida a tus ideas. Esto es lo que puedes hacer:",
      creatingItemTitle:
        "Creando tu Título: Hazlo llamativo y optimizado para SEO.",
      creatingItemContent:
        "Utilizando el Editor de Texto Enriquecido (o Markdown) para formatear texto, añadir imágenes, videos y enlaces.",
      creatingItemExcerpt:
        "Escribiendo un extracto conciso (resumen) para aparecer en listados de entradas y resultados de búsqueda.",
      creatingItemFeaturedImage:
        "Estableciendo una imagen destacada para representar visualmente tu entrada.",
      creatingItemCategoriesTags:
        "Organizando con Categorías y Etiquetas para mejor navegación y descubrimiento.",
      creatingItemSlug:
        "Personalizando la URL de la entrada (slug) para claridad y SEO.",

      sectionSeoTitle: "Optimizando para Motores de Búsqueda (SEO)",
      seoIntro:
        "Ayuda a los clientes a encontrar tu contenido fácilmente con herramientas SEO integradas:",
      seoItemMetaTitle:
        "Meta Título: Crea un título específico para páginas de resultados de motores de búsqueda (SERPs).",
      seoItemMetaDescription:
        "Meta Descripción: Escribe un resumen atractivo para fomentar clics desde resultados de búsqueda.",

      sectionPublishingTitle: "Publicación y Visibilidad",
      publishingIntro: "Controla cómo y cuándo se publican tus entradas:",
      publishingItemStatus:
        "Gestión de Estado: Guarda entradas como 'Borradores' mientras trabajas en ellas, o establécelas como 'Publicadas' para hacerlas visibles.",
      publishingItemVisibility:
        "Configuración de Visibilidad: Elige entre 'Público' (visible para todos) o 'Privado' (ej., para revisión interna).",

      sectionAiAssistantTitle: "Aprovechando el Asistente de IA",
      aiAssistantIntro:
        "Tu SMB Studio incluye un Asistente de IA (potenciado por Gemini) para ayudarte a crear mejor contenido, más rápido:",
      aiItemGenerateTitle:
        "Generar Ideas de Títulos: Obtén sugerencias para títulos de entradas atractivos.",
      aiItemDraftContent:
        "Redactar Secciones: Permite que la IA te ayude a comenzar a escribir secciones de tu entrada.",
      aiItemImproveText:
        "Mejorar Redacción: Obtén ayuda con gramática, tono y claridad.",
      aiItemSummarize:
        "Crear Extractos: Genera automáticamente un resumen para tu entrada.",
      aiItemSeoOptimize:
        "Sugerir Meta SEO: Obtén recomendaciones impulsadas por IA para tu meta título y descripción.",

      sectionTipsTitle: "Consejos para Entradas Efectivas",
      tip1: "Conoce a tu Audiencia: Escribe contenido que aborde sus necesidades e intereses.",
      tip2: "Sé Consistente: Establece un horario de publicación regular.",
      tip3: "Usa Visuales: Rompe el texto con imágenes o videos relevantes.",
      tip4: "Llamado a la Acción: Anima a los lectores a dar el siguiente paso (ej., comentar, compartir, contactarte).",

      ctaViewPosts: "Gestiona tus Entradas",
      ctaCreateNewPost: "Crear Nueva Entrada",
    },
    smbResources: {
      pageTitle: "Recursos para PYMES | LoyalShift",
      mainTitle: "Recursos para Empoderar tu PYME",
      mainSubtitle:
        "Guías, herramientas e información para ayudar a tu negocio costarricense a crecer y tener éxito en el mundo digital.",

      categoryGuidesTitle: "Guías y Tutoriales",
      categoryToolsTitle: "Herramientas y Plantillas",
      categoryCommunityTitle: "Comunidad y Soporte",
      categoryLocalTitle: "Recursos Locales de Costa Rica",

      guideOllamaTitle: "Ejecuta IA Local: Guía para Principiantes de Ollama",
      guideOllamaDesc:
        "Explora el mundo de los Modelos de Lenguaje Grandes de código abierto en tu propia computadora. Una guía de configuración no técnica.",
      guideOllamaLink: "/smb/resources/guide/ollama-setup",
      guideContextIsKingTitle:
        "El Contexto es Rey: Indicaciones Efectivas para LLM",
      guideContextIsKingDesc:
        "Aprende cómo 'alimentar el contexto' a los Modelos de Lenguaje Grandes para mejores resultados y depuración más simple.",
      guideContextIsKingLink: "/smb/resources/blog/context-is-king",
      guideDigitalPresenceTitle: "Construyendo tu Primera Presencia Digital",
      guideDigitalPresenceDesc:
        "Una guía paso a paso para PYMES en Costa Rica para establecer una base en línea sólida.",
      guideDigitalPresenceLink: "/smb/resources/guide/digital-presence-101",
      guideSEOBasicsTitle: "Conceptos Básicos de SEO para Negocios Locales",
      guideSEOBasicsDesc:
        "Comprende los fundamentos de la Optimización para Motores de Búsqueda para ayudar a los clientes locales a encontrarte.",
      guideSEOBasicsLink: "/smb/resources/guide/seo-basics",

      toolPromptHealthTitle: "Verificador de Salud de Indicaciones",
      toolPromptHealthDesc:
        "Una herramienta interactiva para análisis básico de la efectividad de tus indicaciones de IA. (Conceptual)",
      toolPromptHealthLink: "/smb/tools/prompt-checker",
      toolSMBCalendarTitle: "Plantilla de Calendario de Contenido para PYMES",
      toolSMBCalendarDesc:
        "Descarga nuestra plantilla gratuita para planificar tus entradas de blog y contenido en redes sociales efectivamente.",
      toolSMBDeployGuideTitle: "Guía básica de deploy para Pymes",
      toolSMBDeployGuideDesc:
        "Describa el proceso de deploy de su aplicación con su hosting propio",
      toolSMBCalendarLinkExternal: "#",
      toolInvoiceTemplateTitle: "Plantilla de Factura Básica (CR)",
      toolInvoiceTemplateDesc:
        "Una plantilla de factura simple adecuada para PYMES costarricenses, incluyendo espacio para información fiscal local.",
      toolInvoiceTemplateLinkExternal: "#",

      communityPortalTitle: "Portal de la Comunidad LoyalShift para PYMES",
      communityPortalDesc:
        "Conéctate con otros dueños de PYMES, comparte ideas, haz preguntas y accede a recursos exclusivos. (Próximamente)",
      communityPortalLink: "/smb/studio/community",
      supportContactTitle: "Soporte Dedicado para PYMES",
      supportContactDesc:
        "¿Tienes preguntas o necesitas asistencia con tus servicios LoyalShift para PYMES? Nuestro equipo local está aquí para ayudar.",
      supportContactLink: "/contact",

      localMEICTitle:
        "MEIC - Ministerio de Economía, Industria y Comercio (CR)",
      localMEICDesc:
        "Recursos, programas y apoyo oficial para PYMES del gobierno costarricense.",
      localMEICLinkExternal: "https://www.meic.go.cr/pymes/",
      localProcomerTitle:
        "Procomer - Promotora de Comercio Exterior de Costa Rica",
      localProcomerDesc:
        "Apoyo y recursos para PYMES que buscan exportar o participar en comercio internacional.",
      localProcomerLinkExternal: "https://www.procomer.com/",
      localINATitle: "INA - Instituto Nacional de Aprendizaje (CR)",
      localINADesc:
        "Ofrece programas de capacitación y desarrollo que pueden beneficiar a dueños de PYMES y sus empleados.",
      localINALinkExternal: "https://www.ina.ac.cr/",

      viewResourceButton: "Ver Recurso",
      downloadTemplateButton: "Descargar Plantilla",
      visitLinkButton: "Visitar Enlace",
      comingSoonLabel: "Próximamente",
    },

    solutionsPage: {
      selectProductTitle1: "Explora Nuestro",
      selectProductTitle2: "Conjunto de Tecnología y Módulos",
      heroTitle1: "Moderniza tus Sistemas Heredados",
      heroTitle2: "Sin Disrupción",
      heroSubtitle:
        "Transforma sistemas obsoletos en operaciones ágiles y eficientes con las soluciones impulsadas por IA de LoyalShift, aprovechando la inteligencia geométrica para una precisión y seguridad incomparables.",
      ctaDemo: "Solicitar Demo",
      ctaExperts: "Hablar con Expertos",

      coreSolutionsTitle: "Nuestro Conjunto de Tecnología Central y Módulos",
      coreSolutionsSubtitle:
        "Soluciones Integrales para la Modernización Empresarial",
      keyBenefits: "Beneficios Clave:",
      viewUseCases: "Ver Casos de Uso Empresariales",
      industryUsageTitle: "Adopción por Industria y Aplicaciones Principales",
      tableHeaderIndustry: "Industria",
      tableHeaderUsage: "Uso %",
      tableHeaderApplications: "Aplicaciones Principales",

      industry: {
        banking: "Banca y Finanzas",
        healthcare: "Salud y Ciencias de la Vida",
        energy: "Energía y Servicios Públicos",
        manufacturing: "Manufactura e Industrial",
        government: "Gobierno y Sector Público",
        logistics: "Logística y Cadena de Suministro",
        insurance: "Seguros",
        airlines: "Aerolíneas y Aviación",
        retail: "Retail y Bienes de Consumo",
        pharma: "Farmacéuticas",
        defense: "Defensa y Aeroespacial",
        transportation: "Transporte",
        agriculture: "Agricultura",
        construction: "Construcción e Ingeniería",
        realEstate: "Bienes Raíces",
        cloudProviders: "Proveedores en la Nube",
      },

      product: {
        smartMirror: {
          title: "Smart Mirror™",
          category: "Motor de Transformación de Legado",
          mission:
            "Permitir modernización de legado sin riesgos mediante gemelos digitales con restricciones físicas.",
          description:
            "Valida de forma segura cambios críticos contra datos en vivo en un entorno de gemelo digital paralelo con restricciones físicas. Smart Mirror™ te permite probar integraciones, nuevos modelos de IA y flujos de trabajo complejos con cero riesgo para tus sistemas operativos, asegurando implementaciones confiables sin disrupción y 100% compatibilidad con versiones anteriores.",
          benefit1: "Valida cambios sin riesgos antes de implementarlos.",
          benefit2: "Elimina fallas de migración 'big bang'.",
          benefit3: "Asegura continuidad del negocio durante actualizaciones.",
          benefit4: "Logra lanzamientos por fases con confianza.",
          benefit5: "Acelera significativamente los ciclos de prueba.",
          useCase1Title: "Modernización de Sistemas Heredados",
          useCase1Problem:
            "Cambios de alto riesgo a sistemas heredados críticos causan tiempo de inactividad y errores.",
          useCase1Solution:
            "Prueba todos los cambios en un gemelo digital con restricciones físicas antes de implementarlos.",
          useCase1Outcome:
            "Implementaciones con cero tiempo de inactividad con compatibilidad con versiones anteriores garantizada.",
          useCase2Title: "Validación de Modelos de IA",
          useCase2Problem:
            "Los nuevos modelos de IA se comportan de manera impredecible con datos reales de sistemas heredados.",
          useCase2Solution:
            "Valida modelos contra flujos de datos de producción reflejados.",
          useCase2Outcome:
            "Implementaciones de IA con confianza con compatibilidad comprobada con sistemas reales.",
          interactiveTitle: "Simular Transformación de Legado",
          interactiveDescription:
            "Selecciona un tipo de sistema heredado para ver simulación de transformación",
          interactiveOptionMainframe: "Sistema Mainframe",
          interactiveOptionErp: "Sistema ERP",
          interactiveOptionCustom: "Aplicación Heredada Personalizada",
          ctaBanking: "¡Moderniza *tus sistemas heredados* sin riesgos hoy!",
        },
        universalAdapter: {
          title: "Universal Adapter™",
          category: "Centro de Integración de Legado",
          mission:
            "Hacer que cada sistema heredado hable nativamente con IA en 90 días.",
          description:
            "Conecta instantáneamente sistemas heredados y modernos dispares con Universal Adapter™. Libera datos en silos y permite conectividad perfecta a través de una capa de API unificada, facilitando sincronización en tiempo real y desarrollo rápido de nuevas aplicaciones sin migraciones de datos costosas o riesgosas.",
          benefit1: "Libera datos atrapados en sistemas aislados.",
          benefit2:
            "Integra con 200+ fuentes mediante adaptadores preconstruidos y personalizados.",
          benefit3:
            "Permite sincronización de datos en tiempo real y aplicaciones modernas.",
          benefit4:
            "Evita proyectos de migración de datos costosos y de alto riesgo.",
          benefit5: "Simplifica nuevos desarrollos y esfuerzos de integración.",
          useCase1Title: "Integración de Cadena de Suministro",
          useCase1Problem:
            "Sistemas de cadena de suministro basados en EDI no pueden comunicarse con APIs modernas.",
          useCase1Solution:
            "Traducción bidireccional en tiempo real entre EDI y REST/GraphQL.",
          useCase1Outcome:
            "Visibilidad perfecta de la cadena de suministro entre sistemas heredados y modernos.",
          useCase2Title: "Modernización de Banca Central",
          useCase2Problem:
            "Sistemas bancarios mainframe obstaculizan experiencias digitales de clientes.",
          useCase2Solution:
            "Crea microservicios modernos como front-end para sistemas bancarios centrales.",
          useCase2Outcome:
            "Innovación digital más rápida sin reemplazar sistemas centrales.",
          interactiveTitle: "Probar Integración de Legado",
          interactiveDescription:
            "Selecciona un protocolo heredado para ver mapeo de integración",
          interactiveOptionCobol: "COBOL Copybook",
          interactiveOptionEdi: "EDI X12",
          interactiveOptionFlatfile: "Sistema de Archivos Planos",
          ctaLogistics: "¡Conecta *tus sistemas heredados* en días!",
        },
        auditGuardian: {
          title: "Audit Guardian™",
          category: "Centro de Cumplimiento",
          mission:
            "Automatizar el cumplimiento como un comportamiento natural del sistema, no como una idea tardía.",
          description:
            "Incorpora cumplimiento continuo y confianza inquebrantable en tus operaciones con Audit Guardian™. Aplica reglas regulatorias y de políticas personalizadas directamente dentro de tus flujos de trabajo y mantén rastros de auditoría inmutables y asegurados criptográficamente para todas las acciones de IA y humanas.",
          benefit1:
            "Personaliza reglas de cumplimiento para leyes y políticas específicas.",
          benefit2:
            "Garantiza privacidad de flujos de trabajo y seguridad de datos.",
          benefit3:
            "Proporciona transparencia completa con decisiones de IA rastreables.",
          benefit4: "Automatiza registro y reporte de cumplimiento.",
          benefit5: "Reduce tiempo y costos de preparación para auditorías.",
          useCase1Title: "Cumplimiento Continuo HIPAA",
          useCase1Problem:
            "Auditorías anuales HIPAA son costosas y revelan brechas de cumplimiento demasiado tarde.",
          useCase1Solution:
            "Aplicación de políticas en tiempo real y recolección automatizada de evidencia.",
          useCase1Outcome:
            "Sistemas siempre listos para auditoría con reducción del 90% en costos de cumplimiento.",
          useCase2Title: "Automatización de Controles Financieros",
          useCase2Problem:
            "Controles SOX requieren verificación manual y muestreo.",
          useCase2Solution:
            "Validación automatizada de controles en todas las transacciones.",
          useCase2Outcome:
            "Cobertura del 100% de transacciones con alertas de excepción en tiempo real.",
          interactiveTitle: "Verificar Reglas de Cumplimiento",
          interactiveDescription:
            "Selecciona una regulación para ver verificaciones automatizadas",
          interactiveOptionGdpr: "GDPR",
          interactiveOptionHipaa: "HIPAA",
          interactiveOptionSoc2: "SOC 2",
          ctaHealthcare: "¡Automatiza *cumplimiento* sin esfuerzo!",
        },
        aiInsights: {
          title: "Motor de Perspectivas con IA",
          category: "Inteligencia y Optimización de Legado",
          mission:
            "Transformar tumbas de datos heredados en previsión informada por física e inteligencia accionable.",
          description:
            "Transforma tus datos operacionales históricos y en tiempo real de sistemas heredados en previsión accionable e informada por física. Nuestro Motor de Perspectivas usa IA Explicable (XAI) y PINNs para identificar cuellos de botella, predecir fallas y proporcionar recomendaciones basadas en datos.",
          benefit1:
            "Identifica ineficiencias de procesos ocultas proactivamente.",
          benefit2: "Mejora precisión de pronósticos con ML.",
          benefit3: "Toma decisiones estratégicas respaldadas por datos.",
          benefit4: "Habilita un ciclo de mejora continua.",
          benefit5:
            "Libera perspectivas previamente enterradas en datos heredados.",
          useCase1Title: "Mantenimiento Predictivo",
          useCase1Problem:
            "Fallos de equipo causan tiempo de inactividad no planificado y altos costos.",
          useCase1Solution:
            "Modelos de IA informados por física predicen fallas 3-5 veces antes.",
          useCase1Outcome:
            "Reducción del 30-50% en tiempo de inactividad no planificado y costos de mantenimiento.",
          useCase2Title: "Optimización de Procesos",
          useCase2Problem:
            "Procesos de manufactura heredados tienen ineficiencias ocultas.",
          useCase2Solution:
            "Análisis continuo de datos operacionales revela oportunidades de optimización.",
          useCase2Outcome:
            "Mejora del 15-30% en rendimiento sin gasto de capital.",
          interactiveTitle: "Generar Perspectivas Predictivas",
          interactiveDescription:
            "Selecciona una fuente de datos para ver perspectivas impulsadas por IA",
          interactiveOptionManufacturing: "Datos de Manufactura",
          interactiveOptionEnergy: "Datos de Red Eléctrica",
          interactiveOptionTransport: "Registros de Transporte",
          ctaManufacturing:
            "¡Libera *perspectivas ocultas* de tus datos heredados!",
        },
        agentHub: {
          title: "Módulo Agent Hub™",
          category: "Acelerador de Ecosistema de Socios",
          mission:
            "Convertir ecosistemas de socios en extensiones perfectas e inteligentes de sistemas empresariales centrales.",
          description:
            "Construye, implementa y gestiona rápidamente portales y flujos de trabajo automatizados para tus socios externos, agentes o clientes B2B. Agent Hub™ aprovecha nuestras tecnologías centrales para convertir tu ecosistema de socios en una extensión perfecta y eficiente de tus sistemas centrales.",
          benefit1: "Acelera flujos de trabajo impulsados por socios.",
          benefit2: "Mejora experiencia y lealtad de socios.",
          benefit3: "Reduce procesamiento manual para equipos internos.",
          benefit4:
            "Proporciona transparencia para todas las partes interesadas.",
          benefit5:
            "Base de solución implementable y personalizable rápidamente.",
          useCase1Title: "Portal de Agentes de Seguros",
          useCase1Problem:
            "Agentes independientes luchan con múltiples sistemas de aseguradoras.",
          useCase1Solution:
            "Portal unificado con inicio de sesión único a todos los backends heredados.",
          useCase1Outcome:
            "Emisión de pólizas 40% más rápida y satisfacción de agentes 3 veces mayor.",
          useCase2Title: "Red de Socios Inmobiliarios",
          useCase2Problem:
            "Corredurías necesitan acceso en tiempo real a MLS y sistemas de transacciones.",
          useCase2Solution:
            "Acceso seguro basado en roles a todos los sistemas requeridos.",
          useCase2Outcome:
            "Visibilidad completa de transacciones con 80% menos llamadas de soporte.",
          interactiveTitle: "Construir un Portal para Socios",
          interactiveDescription:
            "Selecciona tipos de socios para ver opciones de configuración de portal",
          interactiveOptionInsurance: "Agentes de Seguros",
          interactiveOptionRealestate: "Corredores Inmobiliarios",
          interactiveOptionSales: "Socios de Ventas",
          ctaRealEstate: "¡Empodera *a tus socios* con acceso perfecto!",
        },
        cipherForge: {
          title: "CipherForge™",
          category: "Computación Confidencial Segura Cuántica",
          mission:
            "Hacer que las violaciones de privacidad y el mal uso de datos sean matemáticamente imposibles en IA distribuida y computación colaborativa.",
          description:
            "Protege tus datos y modelos de IA más sensibles con CipherForge™, permitiendo cómputo y colaboración que preservan la privacidad en entornos distribuidos. Nuestra plataforma aprovecha técnicas criptográficas avanzadas, incluyendo encriptación homomórfica completa (FHE) y cómputo multipartito seguro (MPC), respaldados por algoritmos resistentes a cuántica.",
          benefit1: "Permite cómputo seguro en datos encriptados.",
          benefit2:
            "Facilita entrenamiento de modelos de IA que preservan la privacidad.",
          benefit3:
            "Proporciona garantías matemáticas de confidencialidad de datos.",
          benefit4:
            "Protege tus datos para el futuro con resistencia a cuántica.",
          benefit5: "Libera nuevas oportunidades de colaboración de datos.",
          useCase1Title: "Colaboración Segura en Datos de Salud",
          useCase1Problem:
            "Compartir PHI impide investigación multi-institucional.",
          useCase1Solution:
            "Cómputo encriptado en conjuntos de datos combinados.",
          useCase1Outcome: "Investigación innovadora sin exposición de datos.",
          useCase2Title: "Análisis de Crimen Financiero",
          useCase2Problem:
            "Los bancos no pueden compartir patrones de fraude debido a privacidad.",
          useCase2Solution:
            "Detección colectiva de patrones en datos encriptados.",
          useCase2Outcome:
            "30% mejor detección de fraude con privacidad total de datos.",
          interactiveTitle: "Probar Encriptación Segura Cuántica",
          interactiveDescription:
            "Ingresa texto para ver salida encriptada con algoritmos resistentes a cuántica",
          ctaGovernment:
            "¡Protege *datos sensibles* con encriptación de grado militar!",
        },
      },

      geometricFeatures: {
        title: "La Ventaja LoyalShift",
        subtitle: "Precisión, Eficiencia e Inteligencia Geométrica",
        featureHeading1: "Inteligencia Geométrica para",
        featureHeading2: "Transformación Empresarial",
        featureDescription:
          "Nuestro enfoque único combina IA con optimización geométrica para entregar soluciones precisas y eficientes para desafíos de sistemas heredados. Mapeamos complejidades y encontramos caminos que otros pierden, asegurando que tu modernización se construya sobre una base de certeza matemática.",
        featureList1Title: "Ingeniería de Precisión",
        featureList1Desc:
          "Soluciones algorítmicas adaptadas a tu infraestructura única, panorama de datos y física operacional.",
        featureList2Title: "Caminos Optimizados",
        featureList2Desc:
          "La IA identifica las rutas más eficientes y de menor riesgo para modernización e integración perfecta.",
        featureList3Title: "Mitigación Proactiva de Riesgos",
        featureList3Desc:
          "Modelado y simulación geométrica ayudan a prever y mitigar puntos potenciales de disrupción proactivamente.",
        featureCard1Title: "Velocidad y Agilidad Inigualables",
        featureCard1Desc:
          "Cronogramas dramáticamente acelerados para proyectos complejos de modernización con resultados predecibles.",
        featureCard2Title: "Seguridad y Cumplimiento Fortificados",
        featureCard2Desc:
          "Protección robusta y matemáticamente verificable para tus datos, sistemas y procesos críticos.",
        featureCard3Title: "Crecimiento Profundo y Escalable",
        featureCard3Desc:
          "Arquitectura a prueba de futuro que se adapta inteligentemente a tus necesidades empresariales en evolución y volúmenes de datos.",
        featureCard4Title: "Integridad de Datos Verificable",
        featureCard4Desc:
          "Asegurando precisión absoluta, consistencia y confiabilidad en todos los sistemas integrados.",
      },

      synergy: {
        headerChallenge: "Desafío Empresarial",
        headerStack: "Conjunto de Soluciones LoyalShift",
        headerImpact: "Impacto Empresarial Cuantificable",
      },

      finalCta: {
        titleMain: "¿Listo para Modernizar",
        titleAccent: "Sin Disrupción?",
        subtitle:
          "Descubre cómo el enfoque único impulsado por IA de LoyalShift entrega resultados medibles, seguridad garantizada y una transición perfecta. Solicita una evaluación personalizada hoy.",
        ctaDemo: "Solicitar Demo Personalizada",
        ctaSales: "Hablar con Ventas",
        ctaCases: "Ver Resultados de Clientes",
      },
      aiVisualPlaceholder: "Concepto Visual de IA para: {prompt}",
    },
    solutionsEnterprise: {
      ourLabTitle: "Nuestro Laboratorio: Integrando el Futuro",
      ourLabSubtitle: "Donde la Innovación Encuentra Integración Perfecta",
      ourLabTextP1:
        "El 'Laboratorio' de LoyalShift es más que solo Investigación y Desarrollo; es nuestro crisol para forjar soluciones prácticas e integradas. Estamos dedicados a armonizar nuestras tecnologías centrales —Smart Mirror™, Universal Adapter™, Audit Guardian™, Motor de Perspectivas con IA, Agent Hub™ y CipherForge™— en plataformas cohesivas y exponencialmente poderosas. Nuestro enfoque está en aplicación en el mundo real y crear sinergias profundas entre módulos que resuelvan tus desafíos más arraigados con sistemas heredados.",
      ourLabTextP2:
        "Nuestros equipos expertos exploran y dominan continuamente IA de vanguardia, incluyendo avances en Redes Neuronales Informadas por Física (PINNs) para precisión incomparable en modelado de sistemas complejos, Redes Generativas Antagónicas (GANs) para generación robusta de datos sintéticos y modelado sofisticado de escenarios, y Aprendizaje por Refuerzo Profundo (RL) para optimización dinámica de procesos y toma de decisiones agentales. Esto asegura que tu viaje de modernización con LoyalShift esté siempre a la vanguardia de la posibilidad tecnológica, entregando soluciones que no solo son efectivas hoy sino resilientes para mañana.",
      ourLabFocus1: "Flujos de Trabajo Agentes entre Plataformas",
      ourLabFocus2: "Validación y Simulación de IA Informada por Física",
      ourLabFocus3: "Arquitecturas de Seguridad Resistentes a Cuántica",

      enterpriseIntegrationTitle: "Integración Empresarial y Sinergias",
      enterpriseIntegrationSubtitle:
        "Desbloqueando Valor Holístico de Ecosistemas Complejos",
      crossModuleSynergiesTitle:
        "Sinergias entre Módulos: Patrones Probados en Batalla",
      legacyInterfaceCatalogTitle:
        "Experiencia en Catálogo de Interfaces Heredadas",

      synergy: {
        bankMA: {
          challenge:
            "Integración Post-Fusión de Sistemas Bancarios y Armonización de Datos",
          stack: "Universal Adapter™ + Smart Mirror™ + Audit Guardian™",
          impact:
            "$220M en captura de sinergias en 18 meses, migración de datos 60% más rápida.",
        },
        manufacturing: {
          challenge:
            "Transformación Manufacturing 4.0 en Instalaciones Existentes y Mejora de OEE",
          stack: "Motor de Perspectivas con IA + Agent Hub™ + Audit Guardian™",
          impact:
            "34% mejora en Efectividad General de Equipos (OEE) en plantas existentes; 15% reducción en tiempo de inactividad no planificado.",
        },
        government: {
          challenge:
            "Modernización de Servicios Ciudadanos en Mainframes Gubernamentales Antiguos",
          stack: "Agent Hub™ + Universal Adapter™ + Smart Mirror™",
          impact:
            "Vida operativa de sistemas heredados extendida por 15+ años; 70% mejora en tiempo de entrega de servicios ciudadanos.",
        },
      },
      legacyInterface: {
        mainframe:
          "Sistemas Mainframe: Adaptadores CICS/IMS/VSAM con traducción automatizada de COBOL copybook y reflejo de flujos de trabajo JCL.",
        industrial:
          "Controles Industriales: Pasarelas Modbus/Profibus/DNP3/OPC-UA con seguridad OT integrada y validación de datos con restricciones físicas.",
        database:
          "Bases de Datos Heredadas: Convertidores de bases de datos jerárquicas/de red (ej., IDMS/IMS a SQL/NoSQL) con fidelidad de datos sin pérdida.",
        document:
          "Sistemas de Documentos y Spool: Transformación de spool MVS/JES2, informes AS/400 y digitalización de documentos físicos a flujos de trabajo nativos en la nube.",
      },

      strategicValueTitle: "Propuesta de Valor Estratégico",
      strategicValueSubtitle:
        "Convirtiendo Restricciones Sistémicas en Oportunidades Estratégicas",
      strategicValue: {
        deRisked:
          "Modernización con Menos Riesgo: Empleando gestión de cambios con restricciones PINN y validación Smart Mirror™ para transformaciones empresariales predecibles y seguras.",
        roiExtension:
          "Extensión del Valor de Activos Heredados: Maximiza estratégicamente la vida operativa y el retorno de inversión de sistemas centrales existentes, típicamente por un promedio de 7-12 años.",
        complianceAuto:
          "Cumplimiento Simplificado: Audit Guardian™ facilita adherencia regulatoria continua a través de aplicación automatizada impulsada por aprendizaje de refuerzo.",
        partnerEco:
          "Crecimiento del Ecosistema de Socios: Agent Hub™ permite crecimiento escalable de canales de ingresos colaborativos y acelera procesos de incorporación de socios.",
        aiAdoption:
          "Facilitación de Adopción de IA: Proporcionando un marco seguro y confiable para experimentación avanzada con IA (aprovechando GANs) e implementación confiable (vía PINNs) en entornos empresariales complejos.",
      },
      cioQuoteText:
        '"Con LoyalShift, nuestros sistemas heredados se convirtieron en una poderosa fuente de conocimiento estratégico. Décadas de datos acumulados fueron liberados y transformados en un diferenciador competitivo clave para nuestra institución."',
      cioQuoteAuthor:
        "CIO, Banco Global Nivel 1 (Post-Proyecto de Modernización)",
      ctoQuoteText:
        '"Nuestra metodología no solo prolonga la vida operativa de sistemas heredados — los mejora estratégicamente en valor intrínseco, preparándolos para integrarse perfecta y efectivamente con capacidades de IA de próxima generación."',
      ctoQuoteAuthor: "CTO, LoyalShift",

      battleCardsTitle: "Aceleradores Específicos por Industria",
      battleCardsSubtitle:
        "Soluciones Personalizadas, ROI Comprobado, Implementación Rápida",
      battleCardBankingTitle: "Paquete de Transformación Bancaria",
      battleCardBanking: {
        stack: "Smart Mirror™ + Audit Guardian™ + Universal Adapter™",
        roi: "$23M+/año en ahorros promedio de cumplimiento; integración de nuevos productos 80% más rápida.",
        implementation:
          "Prueba de concepto mainframe en 45 días; adaptadores preconstruidos para SWIFT, FIX, ISO20022.",
        edge: "La única solución de mercado que moderniza flujos de trabajo COBOL/JCL sin reescribir una sola línea de código heredado.",
      },
      battleCardHealthcareTitle: "Paquete de Modernización de Salud",
      battleCardHealthcare: {
        stack: "Agent Hub™ + Audit Guardian™ + Motor de Perspectivas con IA",
        roi: "Incorporación de proveedores 92% más rápida; mejora del 37% en rotación de camas mediante análisis predictivos.",
        implementation:
          "Configuración HIPAA lista para usar; gemelo digital de EHR heredado en 60 días.",
        edge: "Cumplimiento total con Stark Law y Anti-Kickback mientras libera y monetiza datos de pacientes previamente en silos.",
      },
      battleCardEnergyTitle: "Suite de Resiliencia para Energía y Servicios",
      battleCardEnergy: {
        stack:
          "Universal Adapter™ + Motor de Perspectivas con IA + CipherForge™",
        roi: "$18M+/año en optimización de red y reducción de pérdidas; actualizaciones SCADA sin tiempo de inactividad.",
        implementation:
          "Paquete de convergencia OT/IT plug-and-play; configuraciones de seguridad pre-validadas NERC CIP.",
        edge: "Modelos de IA con restricciones físicas que previenen apagones catastróficos ($100M+) prediciendo fallas en cascada.",
      },

      ctaFunnelStep1Title: "Evaluación de Vitalidad de Legado™",
      ctaFunnelStep1Text:
        "Inicia una Evaluación de Vitalidad de Legado™ sin compromiso. Exploraremos colaborativamente tus sistemas actuales para identificar eficiencias potenciales y oportunidades de modernización, proporcionándote información inicial valiosa, completamente gratis y sin compromiso.",
      ctaFunnelStep2Title: "Prueba por Industria y Plan de ROI",
      ctaFunnelStep2Text:
        "Basado en nuestra evaluación inicial, desarrollaremos un Plan de ROI transparente adaptado a tu contexto específico. Esto incluye información relevante de la industria y una proyección clara de beneficios potenciales antes de cualquier compromiso.",
      ctaFunnelStep3Title: "Implementación Acelerada de Piloto",
      ctaFunnelStep3Text:
        "Participa en una Implementación de Piloto definida y de alto impacto. Experimenta resultados tangibles mientras implementamos tu primer flujo de trabajo modernizado, típicamente dentro de 90 días. Nuestro compromiso: si los objetivos acordados del piloto no se cumplen, tu implementación piloto corre por nuestra cuenta. Esta es nuestra garantía de integración de legado y entrega de valor.",
    },
    solutionsEnterprise: {
      ourLabTitle: "Nuestro Laboratorio: Integrando el Futuro",
      ourLabSubtitle: "Donde la Innovación Encuentra Integración Perfecta",
      ourLabTextP1:
        "El 'Laboratorio' de LoyalShift es más que solo Investigación y Desarrollo; es nuestro crisol para forjar soluciones prácticas e integradas. Estamos dedicados a armonizar nuestras tecnologías centrales —Smart Mirror™, Universal Adapter™, Audit Guardian™, Motor de Perspectivas con IA, Agent Hub™ y CipherForge™— en plataformas cohesivas y exponencialmente poderosas. Nuestro enfoque está en aplicación en el mundo real y crear sinergias profundas entre módulos que resuelvan tus desafíos más arraigados con sistemas heredados.",
      ourLabTextP2:
        "Nuestros equipos expertos exploran y dominan continuamente IA de vanguardia, incluyendo avances en Redes Neuronales Informadas por Física (PINNs) para precisión incomparable en modelado de sistemas complejos, Redes Generativas Antagónicas (GANs) para generación robusta de datos sintéticos y modelado sofisticado de escenarios, y Aprendizaje por Refuerzo Profundo (RL) para optimización dinámica de procesos y toma de decisiones agentales. Esto asegura que tu viaje de modernización con LoyalShift esté siempre a la vanguardia de la posibilidad tecnológica, entregando soluciones que no solo son efectivas hoy sino resilientes para mañana.",
      ourLabFocus1: "Flujos de Trabajo Agentes entre Plataformas",
      ourLabFocus2: "Validación y Simulación de IA Informada por Física",
      ourLabFocus3: "Arquitecturas de Seguridad Resistentes a Cuántica",

      enterpriseIntegrationTitle: "Integración Empresarial y Sinergias",
      enterpriseIntegrationSubtitle:
        "Desbloqueando Valor Holístico de Ecosistemas Complejos",
      crossModuleSynergiesTitle:
        "Sinergias entre Módulos: Patrones Probados en Batalla",
      legacyInterfaceCatalogTitle:
        "Experiencia en Catálogo de Interfaces Heredadas",

      synergy: {
        bankMA: {
          challenge:
            "Integración Post-Fusión de Sistemas Bancarios y Armonización de Datos",
          stack: "Universal Adapter™ + Smart Mirror™ + Audit Guardian™",
          impact:
            "$220M en captura de sinergias en 18 meses, migración de datos 60% más rápida.",
        },
        manufacturing: {
          challenge:
            "Transformación Manufacturing 4.0 en Instalaciones Existentes y Mejora de OEE",
          stack: "Motor de Perspectivas con IA + Agent Hub™ + Audit Guardian™",
          impact:
            "34% mejora en Efectividad General de Equipos (OEE) en plantas existentes; 15% reducción en tiempo de inactividad no planificado.",
        },
        government: {
          challenge:
            "Modernización de Servicios Ciudadanos en Mainframes Gubernamentales Antiguos",
          stack: "Agent Hub™ + Universal Adapter™ + Smart Mirror™",
          impact:
            "Vida operativa de sistemas heredados extendida por 15+ años; 70% mejora en tiempo de entrega de servicios ciudadanos.",
        },
      },
      legacyInterface: {
        mainframe:
          "Sistemas Mainframe: Adaptadores CICS/IMS/VSAM con traducción automatizada de COBOL copybook y reflejo de flujos de trabajo JCL.",
        industrial:
          "Controles Industriales: Pasarelas Modbus/Profibus/DNP3/OPC-UA con seguridad OT integrada y validación de datos con restricciones físicas.",
        database:
          "Bases de Datos Heredadas: Convertidores de bases de datos jerárquicas/de red (ej., IDMS/IMS a SQL/NoSQL) con fidelidad de datos sin pérdida.",
        document:
          "Sistemas de Documentos y Spool: Transformación de spool MVS/JES2, informes AS/400 y digitalización de documentos físicos a flujos de trabajo nativos en la nube.",
      },

      strategicValueTitle: "Propuesta de Valor Estratégico",
      strategicValueSubtitle:
        "Transformando Restricciones en Ventajas Competitivas",
      strategicValue: {
        deRisked:
          "Modernización con Menos Riesgo: Gestión de cambios con restricciones PINN y validación Smart Mirror™.",
        roiExtension:
          "Extensión del ROI de Legado: Maximiza vida útil de activos existentes en promedio 7-12 años.",
        complianceAuto:
          "Automatización de Cumplimiento: Audit Guardian™ con aplicación impulsada por RL para adherencia continua.",
        partnerEco:
          "Crecimiento del Ecosistema de Socios: Agent Hub™ impulsa canales de ingresos colaborativos y acelera incorporación de socios.",
        aiAdoption:
          "Puente de Adopción de IA: Proporciona experimentación segura habilitada por GANs e implementación informada por PINNs de IA.",
      },
      cioQuoteText:
        '"LoyalShift no solo reemplaza tus sistemas heredados — los convierte en armas, transformando décadas de datos en nuestro nuevo activo estratégico."',
      cioQuoteAuthor:
        "CIO, Banco Global Nivel 1 (Post-Proyecto de Modernización)",
      ctoQuoteText:
        '"No solo extendemos tus sistemas heredados — los hacemos apreciar en valor como vino fino, listos para la próxima generación de IA."',
      ctoQuoteAuthor: "CTO, LoyalShift",

      industrySolutionsTitle: "Soluciones Específicas por Industria",
      industrySolutionsSubtitle:
        "Implementaciones especializadas para requisitos complejos del sector",

      bankingSolutionTitle: "Modernización de Servicios Financieros",
      bankingSolution: {
        stack:
          "Plataforma central de modernización con automatización de cumplimiento y adaptadores de protocolos estándar",
        businessImpact:
          "Reducción significativa en costos operativos de cumplimiento con capacidades aceleradas de integración de productos",
        deployment:
          "Implementación rápida de prueba de concepto con soporte preconfigurado para mensajería financiera",
        technicalDifferentiator:
          "Moderniza sistemas COBOL/JCL heredados sin requerir reescritura de código",
      },

      healthcareSolutionTitle: "Integración de Sistemas de Salud",
      healthcareSolution: {
        stack:
          "Sistema de gestión de proveedores con monitoreo de cumplimiento y análisis de datos clínicos",
        businessImpact:
          "Credencialización de proveedores simplificada con métricas mejoradas de utilización de recursos",
        deployment:
          "Configuración prevalidada de cumplimiento regulatorio con migración estructurada de datos",
        technicalDifferentiator:
          "Integración segura de EHR heredados manteniendo cumplimiento regulatorio total",
      },

      energySolutionTitle: "Gestión de Infraestructura de Servicios",
      energySolution: {
        stack:
          "Integración de tecnología operacional con análisis predictivos y seguridad de infraestructura crítica",
        businessImpact:
          "Mejoras en eficiencia operacional con priorización de mantenimiento basada en riesgo",
        deployment:
          "Configuraciones de seguridad validadas con metodología de actualización por fases",
        technicalDifferentiator:
          "Análisis predictivos de sistemas para protección de infraestructura crítica",
      },
    },
    supportPage: {
      pageTitle: "Centro de Soporte LoyalShift",
      mainTitle: "Centro de Soporte LoyalShift",
      mainSubtitle:
        "Obtén ayuda con nuestras soluciones, explora recursos o conéctate con nuestro equipo de soporte.",

      chatbotTitle: "Pregunta a Nuestro Asistente de IA",
      chatbotIntro:
        "Potenciado por Gemini - Disponible 24/7 para responder tus preguntas.",
      chatbotInputPlaceholder: "Escribe tu pregunta aquí...",
      chatbotSendButton: "Enviar",
      chatbotWelcomeMessage:
        "¡Hola! Soy el Asistente de IA de LoyalShift. ¿Cómo puedo ayudarte hoy respecto a nuestras soluciones o datos públicos?",
      chatbotDisclaimer:
        "Soy un asistente de IA y puedo proporcionar información basada en datos públicos de LoyalShift y conocimiento general sobre nuestras soluciones. Para problemas complejos o específicos de cuenta, por favor envía un ticket de soporte.",
      chatbotError:
        "Lo siento, encontré un problema. Por favor intenta nuevamente o contacta soporte humano.",
      chatbotTyping: "El Asistente de IA está escribiendo...",

      quickActionFAQ: "Ver Preguntas Frecuentes",
      quickActionDocs: "Leer Documentación",
      quickActionTicket: "Abrir Ticket",

      stillNeedHelpTitle: "¿Aún Necesitas Ayuda?",
      stillNeedHelpSubtitle:
        "Si nuestro asistente de IA no pudo resolver tu consulta, o si necesitas ayuda más específica:",

      faqCardTitle: "Explora Preguntas Frecuentes",
      faqCardText:
        "Encuentra respuestas a preguntas comunes sobre nuestra plataforma y servicios.",
      faqCardButton: "Ver Preguntas Frecuentes",

      docsCardTitle: "Leer Documentación",
      docsCardText:
        "Profundiza en nuestras soluciones con guías completas y documentación técnica.",
      docsCardButton: "Ir a Documentación",

      ticketCardTitle: "Enviar un Ticket de Soporte",
      ticketCardText:
        "Para problemas específicos, de cuenta o dificultades técnicas, por favor envía un ticket a nuestro equipo de soporte.",
      ticketCardButton: "Abrir un Ticket",

      needMoreHelp: "¿Necesitas Más Ayuda Directa?",
      contactUs:
        "Nuestro equipo de soporte está disponible Lunes-Viernes, 9am-5pm (CST/GMT-6).",
      contactButton: "Contactar al Equipo de Soporte",

      loading: "Cargando...",
    },
    smbPublicEvent: {
      pageTitle: "Detalles del Evento | LoyalShift PYMES",
      whatToExpectTitle: "Qué Puedes Esperar",
      whatToExpectItem1: "Un ambiente casual, divertido y amigable.",
      whatToExpectItem2:
        "El emocionante partido de fútbol en la pantalla grande.",
      whatToExpectItem3:
        "Una barra para armar tu propia hamburguesa con todos los esenciales.",
      whatToExpectItem4: "Buena compañía y excelente conversación.",
      instructionsTitle: "Instrucciones para los Asistentes",
      essentialsTitle: "Lista de Compras Esencial",
      optionalsTitle: "Adiciones Opcionales",
      yieldTitle: "Estimaciones de Rendimiento de Hamburguesas",
      yieldBasedOn: "Basado en 1.5 kg de carne molida.",
      pattiesLabel: "Tortas de",
      pattiesUnit: "gramos cada una",
      totalPatties: "Total de Tortas",
      startingPointTitle: "Punto de Partida",
      perPersonTitle: "Por Persona",
      rsvpTitle: "¿Vas a venir?",
      rsvpText:
        "¡Avísanos si puedes asistir! Un mensaje rápido nos ayuda a tener un conteo preciso para la comida y las bebidas.",
      rsvpButton: "Confirmar Asistencia por WhatsApp",
      blogBuilderCtaTitle: "¿Le Gusta Esta Página? Construya la Suya.",
      blogBuilderCtaText:
        "Toda esta página de evento fue creada usando el intuitivo Constructor de Blogs y Páginas dentro del SMB Studio de LoyalShift. Usted puede crear páginas igualmente profesionales para sus propios eventos, anuncios y artículos, sin necesidad de habilidades técnicas.",
      blogBuilderCtaButton: "Descubra el SMB Studio",
      locationTitle: "Ubicación del Evento",
      mapWaze: "Waze",
      mapGoogle: "Google Maps",
      addressLine1: "C. 24, Alajuela",
      addressLine2: "Provincia de Alajuela, Costa Rica",
      data: {
        eventName: "¡Noche de Hamburguesas para el Partido Costa Rica vs USA!",
        eventDate: "Domingo, 29 de junio de 2025",
        eventTime:
          "En la noche (el partido empieza 7 PM ET / 5 PM CST en Costa Rica)",
        eventNote:
          "¡Prepárate para un fútbol emocionante mientras disfrutas de deliciosas hamburguesas caseras!",
        instruction1:
          "Por favor, trae tus propias bebidas (alcohólicas o no alcohólicas, ¡lo que prefieras!).",
        instruction2:
          "Si tienes alguno de los ingredientes opcionales en casa, ¡siéntete libre de traerlos para añadirlos a nuestra barra de hamburguesas! Ayuda a que la hamburguesa de cada uno sea única y deliciosa.",
        essentialItem1: "Cebollas Amarillas",
        essentialItem1Qty: "aprox. 5 cebollas",
        essentialItem2: "Heinz Sweet Relish",
        essentialItem3: "Lechuga Romana",
        essentialItem4: "Tomates",
        essentialItem4Qty: "paquete de 1.5 kg",
        essentialItem5: "Brioche con Ajonjolí",
        essentialItem5Qty: "560 gramos",
        optionalItem1: "Tocineta Cinta Azul",
        optionalItem1Qty: "300 gramos",
        optionalItem2: "Aguacate Hortifruti empacado",
        optionalItem2Qty: "1.2 kg",
        optionalItem3: "Pepinos",
        optionalItem3Qty: "4-5 pepinos",
        optionalItem4: "Queso Americano (Kraft Singles)",
        optionalItem4Qty: "12 rebanadas - 226 g",
        yieldNote:
          "Estas estimaciones se basan en 1.5 kg de carne molida. El número real de hamburguesas dependerá de cuántas personas asistan. Podemos ajustar la cantidad de carne molida según el recuento final.",
        yieldTier1Desc:
          "Un buen punto de partida para una reunión más pequeña. Cada persona recibe una hamburguesa sustanciosa, dejando espacio para repetir o para que menos personas coman más.",
        yieldTier2Desc:
          "Maximizando el 1.5 kg de carne molida para más hamburguesas (hasta 16 tortas). Ideal para un grupo más grande donde cada persona podría comer una hamburguesa, o para un grupo más pequeño con muchas para repetir.",
        yieldTierXDesc:
          "El número de hamburguesas se puede ajustar según el número real de amigos (N) que asistan. Para una estimación generosa, asuma de 1 a 1.5 hamburguesas por persona.",
      },
    },
  },
};
