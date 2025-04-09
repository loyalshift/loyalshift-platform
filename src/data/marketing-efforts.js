export const marketingEffortsData = [
  {
    // --- Identifier ---
    marketingEffortId: "linkedin-xai-trust-apr2025", // Unique, URL-safe ID for the route /marketing-effort/linkedin-xai-trust-apr2025

    // --- Internal Tracking ---
    campaignName: "LinkedIn Thought Leadership Q2 2025", // Optional: Group efforts by campaign
    status: "active", // 'draft', 'active', 'archived'
    creationDate: "2025-04-18T09:00:00Z", // Optional: When the effort was created/published

    // --- Core Content ---
    headline: "Explainable AI: Turning the 'Black Box' into a Trusted Partner", // Main title displayed
    bodyText:
      "Learn why Explainable AI (XAI) is crucial for building user trust in automation.\n\nUnderstand decisions, identify bias, and enhance transparency.\n\nKey Takeaway: Trust is built on understanding.", // Main text content (\n for line breaks)

    // --- Animation Specification ---
    animationComponentName: "XaiTrustAnimation", // REQUIRED: Key to look up in marketingAnimationMap
    animationProps: {
      // Optional: Props to pass to the specific animation component
      primaryColor: "#4682B4", // Example: Use the primary color hex
      accentColor: "#FFFFFF", // Example: Contrasting color for highlights
      duration: 12, // Example: Could influence animation timing if the component uses it
    },

    // --- Call to Action ---
    ctaText: "Read Blog Post", // Text for the button
    ctaLink: "/blog/building-trustworthy-ai-workflows", // Destination URL

    // --- Metadata ---
    tags: ["ExplainableAI", "AIethics", "TrustInAI", "WorkflowAutomation"], // Optional tags for categorization
  },
];

export const pricingTiers = [
  {
    name: "Starter",
    price: "$599", // Placeholder: Validate price point
    frequency: "/month",
    description:
      "Evaluate core capabilities and automate initial processes for one or two key legacy systems.",
    features: [
      // --- Platform & Access ---
      "Connect up to 2 Legacy Applications/Databases",
      "Includes 5 User Seats",
      "Standard Data Processing Latency",
      // --- Automation ---
      "Up to 50 Workflow Executions per Month",
      "Access to Pre-built Workflow Templates Library",
      "Visual Workflow Builder (Basic Features)",
      // --- AI & Insights ---
      "AI-Assisted Process Mapping (Basic)",
      "Standard Explainable AI (XAI) Dashboard",
      "Basic Performance Monitoring",
      // --- Support & Security ---
      "Community Forum & Knowledge Base Access",
      "Standard Security Protocols",
    ],
    ctaText: "Start Your Pilot",
    ctaLink: "/signup?plan=starter", // Adjust link
    popular: false,
  },
  {
    name: "Professional",
    price: "$2500", // Placeholder: Validate price point
    frequency: "/month",
    description:
      "Scale your modernization efforts across multiple systems and optimize critical business workflows.",
    features: [
      // --- Platform & Access ---
      "Connect up to 10 Legacy Applications/Databases",
      "Includes unlimited User Seats",
      "Enhanced Data Processing Priority",
      "API Access & Webhooks (Standard Limits)", // Added Specificity
      // --- Automation ---
      "Up to 500 Workflow Executions per Month (Overage Available)", // Added Specificity
      "Build & Deploy Custom Workflows",
      "Premium Workflow Templates Library Access",
      "Visual Workflow Builder (Advanced Features)",
      // --- AI & Insights ---
      "AI-Assisted Process Mapping & Optimization Suggestions", // Enhanced Benefit
      "Advanced XAI Dashboard with Audit Logs", // Added Specificity
      "Detailed Performance Analytics & Anomaly Detection", // Enhanced Benefit
      // --- Support & Security ---
      "Priority Email & Chat Support (Business Hours)",
      "Role-Based Access Control (Basic)",
      "Enhanced Security Monitoring",
    ],
    ctaText: "Choose Professional",
    ctaLink: "/signup?plan=professional", // Adjust link
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    frequency: "",
    description:
      "Drive organization-wide transformation with tailored solutions, unlimited scale, premium support, and bespoke AI capabilities.",
    features: [
      // --- Platform & Access ---
      "Custom Number of Application/Database Connectors", // Clear Customization
      "Custom User Seat Allocation & Management",
      "Highest Data Processing Priority & Throughput",
      "Full API Access with Increased/Custom Limits",
      "Optional Data Residency & Deployment Options", // Enterprise Value
      // --- Automation ---
      "High-Volume & Custom Workflow Execution Tiers (Usage-Based Options)", // Clear Customization
      "Bespoke Workflow Design & Development Support",
      "Access to All Workflow Templates & Features",
      // --- AI & Insights ---
      "Advanced AI for Predictive Analytics & Optimization", // Top-tier AI
      "Optional Custom AI Model Integration & Training Services", // Bespoke AI Service
      "Comprehensive XAI, Compliance & Governance Reporting", // Enterprise Needs
      "Real-time Operational Dashboards",
      // --- Support & Security ---
      "Dedicated Account & Technical Success Manager", // High Touch
      "Custom Service Level Agreement (SLA)",
      "Premium 24/7 Support Channels",
      "Advanced Security Architecture (SSO, Custom RBAC, etc.)", // Enterprise Needs
      "Regulatory Compliance Support (e.g., GDPR, SOC2 assistance)",
      "White-Glove Onboarding & Data Migration Assistance", // Premium Service
    ],
    ctaText: "Contact Sales",
    ctaLink: "/contact-sales", // Adjust link
    popular: false,
  },
];

// Placeholder faqData used in the Pricing.js example (Not present in original context)
export const faqData = [
  {
    question: "How are payments processed?",
    answer:
      "We partner with Lemon Squeezy, our Merchant of Record, to securely process all payments via credit card, PayPal, and other methods where available. Lemon Squeezy also handles global sales tax and VAT compliance, so you don't have to worry about it.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Currently, we offer our custom demo, which is a small workflow that our AI Agent decides to develop for the client, one of our signature asynchronous processes. Please check our Get Started options or contact sales for more details.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, absolutely. You can easily upgrade or downgrade your plan from within your LoyalShift account dashboard at any time. We want to always adapt to your needs.",
  },
  {
    question: "What kind of support is included?",
    answer:
      "Support levels vary by plan. The Starter plan includes community support, Professional includes priority email support, and Enterprise plans come with a dedicated account manager and Service Level Agreement (SLA).",
  },
  {
    question: 'What counts as a "Legacy System Connector"?',
    answer:
      "A connector facilitates data exchange and interaction between the LoyalShift platform and one of your specific legacy systems (e.g., a mainframe application, a specific database, an older ERP). Contact us if you have questions about specific system compatibility.",
  },
];

// You would typically export this if it were in its own file:
// export default faqData;
