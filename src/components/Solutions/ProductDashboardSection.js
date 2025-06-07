// ProductDashboardSection.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiZap,
  FiCpu,
  FiUsers,
  FiShield,
  FiShare2,
  FiLock,
} from "react-icons/fi"; // Example icons
import ProductSelector from "./ProductSelector";
import ProductDetailView from "./ProductDetailView";
import { useLocalization } from "../LocalizationContext";

const SectionTitle = ({
  t,
  titleKey,
  defaultTitle,
  subtitleKey,
  defaultSubtitle,
}) => (
  <div className="text-center mb-12 md:mb-16">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
      {t(titleKey, defaultTitle)}
    </h2>
    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
      {t(subtitleKey, defaultSubtitle)}
    </p>
  </div>
);

// --- Dummy Data & Configuration (In a real app, this would be separate) ---

const productsData = [
  {
    id: "smart-mirror",
    icon: FiZap,
    titleKey: "solutionsPage.product.smartMirror.title",
    defaultTitle: "Smart Mirror™",
    categoryKey: "solutionsPage.product.smartMirror.category",
    defaultCategory: "Legacy Transformation Engine",
    missionKey: "solutionsPage.product.smartMirror.mission",
    defaultMission:
      "Empower zero-risk legacy modernization through physics-constrained digital twins.",
    descriptionKey: "solutionsPage.product.smartMirror.description",
    defaultDescription:
      "Safely validate mission-critical changes against live data in a physics-constrained, parallel digital twin environment. Smart Mirror™ allows you to test integrations, new AI models, and complex workflows with zero risk to your operational systems, ensuring confident, disruption-free deployments and 100% backward compatibility.",
    benefits: [
      "solutionsPage.product.smartMirror.benefit1",
      "solutionsPage.product.smartMirror.benefit2",
      "solutionsPage.product.smartMirror.benefit3",
      "solutionsPage.product.smartMirror.benefit4",
      "solutionsPage.product.smartMirror.benefit5",
    ],
    useCases: [
      {
        titleKey: "solutionsPage.product.smartMirror.useCase1Title",
        defaultTitle: "Legacy System Modernization",
        problemKey: "solutionsPage.product.smartMirror.useCase1Problem",
        defaultProblem:
          "High-risk changes to mission-critical legacy systems cause downtime and errors.",
        solutionKey: "solutionsPage.product.smartMirror.useCase1Solution",
        defaultSolution:
          "Test all changes in a physics-constrained digital twin before deployment.",
        outcomeKey: "solutionsPage.product.smartMirror.useCase1Outcome",
        defaultOutcome:
          "Zero downtime deployments with guaranteed backward compatibility.",
      },
      {
        titleKey: "solutionsPage.product.smartMirror.useCase2Title",
        defaultTitle: "AI Model Validation",
        problemKey: "solutionsPage.product.smartMirror.useCase2Problem",
        defaultProblem:
          "New AI models behave unpredictably with real legacy system data.",
        solutionKey: "solutionsPage.product.smartMirror.useCase2Solution",
        defaultSolution:
          "Validate models against mirrored production data streams.",
        outcomeKey: "solutionsPage.product.smartMirror.useCase2Outcome",
        defaultOutcome:
          "Confident AI deployments with proven real-system compatibility.",
      },
    ],
    interactiveCapability: {
      type: "legacyTransformationDemo",
      titleKey: "solutionsPage.product.smartMirror.interactiveTitle",
      defaultTitle: "Simulate Legacy Transformation",
      descriptionKey:
        "solutionsPage.product.smartMirror.interactiveDescription",
      defaultDescription:
        "Select a legacy system type to see transformation simulation",
      options: [
        {
          labelKey: "option.mainframe",
          defaultLabel: "Mainframe System",
          value: "mainframe",
        },
        {
          labelKey: "option.erp",
          defaultLabel: "ERP System",
          value: "erp",
        },
        {
          labelKey: "option.custom",
          defaultLabel: "Custom Legacy App",
          value: "custom",
        },
      ],
    },
    specificCtaKey: "solutionsPage.product.smartMirror.ctaBanking",
    defaultSpecificCta: "Modernize *your legacy systems* risk-free today!",
  },
  {
    id: "universal-adapter",
    icon: FiShare2,
    titleKey: "solutionsPage.product.universalAdapter.title",
    defaultTitle: "Universal Adapter™",
    categoryKey: "solutionsPage.product.universalAdapter.category",
    defaultCategory: "Legacy Integration Hub",
    missionKey: "solutionsPage.product.universalAdapter.mission",
    defaultMission: "Make every legacy system speak AI-native within 90 days.",
    descriptionKey: "solutionsPage.product.universalAdapter.description",
    defaultDescription:
      "Instantly bridge disparate legacy and modern systems with the Universal Adapter™. Unlock siloed data and enable seamless connectivity through a unified API layer, facilitating real-time synchronization and the rapid development of new applications without costly or risky data migrations.",
    benefits: [
      "solutionsPage.product.universalAdapter.benefit1",
      "solutionsPage.product.universalAdapter.benefit2",
      "solutionsPage.product.universalAdapter.benefit3",
      "solutionsPage.product.universalAdapter.benefit4",
      "solutionsPage.product.universalAdapter.benefit5",
    ],
    useCases: [
      {
        titleKey: "solutionsPage.product.universalAdapter.useCase1Title",
        defaultTitle: "Supply Chain Integration",
        problemKey: "solutionsPage.product.universalAdapter.useCase1Problem",
        defaultProblem:
          "EDI-based supply chain systems can't communicate with modern APIs.",
        solutionKey: "solutionsPage.product.universalAdapter.useCase1Solution",
        defaultSolution:
          "Real-time two-way translation between EDI and REST/GraphQL.",
        outcomeKey: "solutionsPage.product.universalAdapter.useCase1Outcome",
        defaultOutcome:
          "Seamless supply chain visibility across legacy and modern systems.",
      },
      {
        titleKey: "solutionsPage.product.universalAdapter.useCase2Title",
        defaultTitle: "Core Banking Modernization",
        problemKey: "solutionsPage.product.universalAdapter.useCase2Problem",
        defaultProblem:
          "Mainframe banking systems hinder digital customer experiences.",
        solutionKey: "solutionsPage.product.universalAdapter.useCase2Solution",
        defaultSolution:
          "Create modern microservices front-end to core banking systems.",
        outcomeKey: "solutionsPage.product.universalAdapter.useCase2Outcome",
        defaultOutcome:
          "Faster digital innovation without replacing core systems.",
      },
    ],
    interactiveCapability: {
      type: "apiIntegrationDemo",
      titleKey: "solutionsPage.product.universalAdapter.interactiveTitle",
      defaultTitle: "Test Legacy Integration",
      descriptionKey:
        "solutionsPage.product.universalAdapter.interactiveDescription",
      defaultDescription: "Select a legacy protocol to see integration mapping",
      options: [
        {
          labelKey: "option.cobol",
          defaultLabel: "COBOL Copybook",
          value: "cobol",
        },
        {
          labelKey: "option.edi",
          defaultLabel: "EDI X12",
          value: "edi",
        },
        {
          labelKey: "option.flatfile",
          defaultLabel: "Flat File System",
          value: "flatfile",
        },
      ],
    },
    specificCtaKey: "solutionsPage.product.universalAdapter.ctaLogistics",
    defaultSpecificCta: "Connect *your legacy systems* in days!",
  },
  {
    id: "audit-guardian",
    icon: FiShield,
    titleKey: "solutionsPage.product.auditGuardian.title",
    defaultTitle: "Audit Guardian™",
    categoryKey: "solutionsPage.product.auditGuardian.category",
    defaultCategory: "Compliance Nerve Center",
    missionKey: "solutionsPage.product.auditGuardian.mission",
    defaultMission:
      "Automate compliance as a natural system behavior, not an afterthought.",
    descriptionKey: "solutionsPage.product.auditGuardian.description",
    defaultDescription:
      "Embed continuous compliance and unshakeable trust into your operations with Audit Guardian™. Enforce custom regulatory and policy rules directly within your workflows and maintain immutable, cryptographically secured audit trails for all AI and human actions.",
    benefits: [
      "solutionsPage.product.auditGuardian.benefit1",
      "solutionsPage.product.auditGuardian.benefit2",
      "solutionsPage.product.auditGuardian.benefit3",
      "solutionsPage.product.auditGuardian.benefit4",
      "solutionsPage.product.auditGuardian.benefit5",
    ],
    useCases: [
      {
        titleKey: "solutionsPage.product.auditGuardian.useCase1Title",
        defaultTitle: "Continuous HIPAA Compliance",
        problemKey: "solutionsPage.product.auditGuardian.useCase1Problem",
        defaultProblem:
          "Annual HIPAA audits are costly and reveal compliance gaps too late.",
        solutionKey: "solutionsPage.product.auditGuardian.useCase1Solution",
        defaultSolution:
          "Real-time policy enforcement and automated evidence collection.",
        outcomeKey: "solutionsPage.product.auditGuardian.useCase1Outcome",
        defaultOutcome:
          "Always-audit-ready systems with 90% reduction in compliance costs.",
      },
      {
        titleKey: "solutionsPage.product.auditGuardian.useCase2Title",
        defaultTitle: "Financial Controls Automation",
        problemKey: "solutionsPage.product.auditGuardian.useCase2Problem",
        defaultProblem:
          "SOX controls require manual verification and sampling.",
        solutionKey: "solutionsPage.product.auditGuardian.useCase2Solution",
        defaultSolution:
          "Automated control validation across all transactions.",
        outcomeKey: "solutionsPage.product.auditGuardian.useCase2Outcome",
        defaultOutcome:
          "100% transaction coverage with real-time exception alerts.",
      },
    ],
    interactiveCapability: {
      type: "complianceCheckerDemo",
      titleKey: "solutionsPage.product.auditGuardian.interactiveTitle",
      defaultTitle: "Check Compliance Rules",
      descriptionKey:
        "solutionsPage.product.auditGuardian.interactiveDescription",
      defaultDescription: "Select a regulation to see automated checks",
      options: [
        {
          labelKey: "option.gdpr",
          defaultLabel: "GDPR",
          value: "gdpr",
        },
        {
          labelKey: "option.hipaa",
          defaultLabel: "HIPAA",
          value: "hipaa",
        },
        {
          labelKey: "option.soc2",
          defaultLabel: "SOC 2",
          value: "soc2",
        },
      ],
    },
    specificCtaKey: "solutionsPage.product.auditGuardian.ctaHealthcare",
    defaultSpecificCta: "Automate *compliance* with zero effort!",
  },
  {
    id: "ai-insights",
    icon: FiCpu,
    titleKey: "solutionsPage.product.aiInsights.title",
    defaultTitle: "AI-Powered Insights Engine",
    categoryKey: "solutionsPage.product.aiInsights.category",
    defaultCategory: "Legacy Intelligence & Optimization",
    missionKey: "solutionsPage.product.aiInsights.mission",
    defaultMission:
      "Transform legacy data tombs into physics-informed foresight and actionable intelligence.",
    descriptionKey: "solutionsPage.product.aiInsights.description",
    defaultDescription:
      "Transform your historical and real-time operational data from legacy systems into actionable, physics-informed foresight. Our Insights Engine uses Explainable AI (XAI) and PINNs to identify bottlenecks, predict failures, and provide data-driven recommendations.",
    benefits: [
      "solutionsPage.product.aiInsights.benefit1",
      "solutionsPage.product.aiInsights.benefit2",
      "solutionsPage.product.aiInsights.benefit3",
      "solutionsPage.product.aiInsights.benefit4",
      "solutionsPage.product.aiInsights.benefit5",
    ],
    useCases: [
      {
        titleKey: "solutionsPage.product.aiInsights.useCase1Title",
        defaultTitle: "Predictive Maintenance",
        problemKey: "solutionsPage.product.aiInsights.useCase1Problem",
        defaultProblem:
          "Equipment failures cause unplanned downtime and high costs.",
        solutionKey: "solutionsPage.product.aiInsights.useCase1Solution",
        defaultSolution:
          "Physics-informed AI models predict failures 3-5x earlier.",
        outcomeKey: "solutionsPage.product.aiInsights.useCase1Outcome",
        defaultOutcome:
          "30-50% reduction in unplanned downtime and maintenance costs.",
      },
      {
        titleKey: "solutionsPage.product.aiInsights.useCase2Title",
        defaultTitle: "Process Optimization",
        problemKey: "solutionsPage.product.aiInsights.useCase2Problem",
        defaultProblem:
          "Legacy manufacturing processes have hidden inefficiencies.",
        solutionKey: "solutionsPage.product.aiInsights.useCase2Solution",
        defaultSolution:
          "Continuous analysis of operational data reveals optimization opportunities.",
        outcomeKey: "solutionsPage.product.aiInsights.useCase2Outcome",
        defaultOutcome:
          "15-30% throughput improvement without capital expenditure.",
      },
    ],
    interactiveCapability: {
      type: "insightsGeneratorDemo",
      titleKey: "solutionsPage.product.aiInsights.interactiveTitle",
      defaultTitle: "Generate Predictive Insights",
      descriptionKey: "solutionsPage.product.aiInsights.interactiveDescription",
      defaultDescription:
        "Select a data source to see sample AI-powered insights",
      options: [
        {
          labelKey: "option.manufacturing",
          defaultLabel: "Manufacturing Data",
          value: "manufacturing",
        },
        {
          labelKey: "option.energy",
          defaultLabel: "Energy Grid Data",
          value: "energy",
        },
        {
          labelKey: "option.transport",
          defaultLabel: "Transportation Logs",
          value: "transport",
        },
      ],
    },
    specificCtaKey: "solutionsPage.product.aiInsights.ctaManufacturing",
    defaultSpecificCta: "Unlock *hidden insights* from your legacy data!",
  },
  {
    id: "agent-hub",
    icon: FiUsers,
    titleKey: "solutionsPage.product.agentHub.title",
    defaultTitle: "Agent Hub™ Module",
    categoryKey: "solutionsPage.product.agentHub.category",
    defaultCategory: "Partner Ecosystem Accelerator",
    missionKey: "solutionsPage.product.agentHub.mission",
    defaultMission:
      "Turn partner ecosystems into seamless, intelligent extensions of core enterprise systems.",
    descriptionKey: "solutionsPage.product.agentHub.description",
    defaultDescription:
      "Rapidly build, deploy, and manage secure portals and automated workflows for your external partners, agents, or B2B clients. Agent Hub™ leverages our core technologies to turn your partner ecosystem into a seamless, efficient extension of your core systems.",
    benefits: [
      "solutionsPage.product.agentHub.benefit1",
      "solutionsPage.product.agentHub.benefit2",
      "solutionsPage.product.agentHub.benefit3",
      "solutionsPage.product.agentHub.benefit4",
      "solutionsPage.product.agentHub.benefit5",
    ],
    useCases: [
      {
        titleKey: "solutionsPage.product.agentHub.useCase1Title",
        defaultTitle: "Insurance Agent Portal",
        problemKey: "solutionsPage.product.agentHub.useCase1Problem",
        defaultProblem:
          "Independent agents struggle with multiple insurer systems.",
        solutionKey: "solutionsPage.product.agentHub.useCase1Solution",
        defaultSolution:
          "Unified portal with single sign-on to all legacy backends.",
        outcomeKey: "solutionsPage.product.agentHub.useCase1Outcome",
        defaultOutcome: "40% faster policy issuance and 3x agent satisfaction.",
      },
      {
        titleKey: "solutionsPage.product.agentHub.useCase2Title",
        defaultTitle: "Real Estate Partner Network",
        problemKey: "solutionsPage.product.agentHub.useCase2Problem",
        defaultProblem:
          "Brokerages need real-time MLS and transaction system access.",
        solutionKey: "solutionsPage.product.agentHub.useCase2Solution",
        defaultSolution: "Secure, role-based access to all required systems.",
        outcomeKey: "solutionsPage.product.agentHub.useCase2Outcome",
        defaultOutcome:
          "Complete transaction visibility with 80% fewer support calls.",
      },
    ],
    interactiveCapability: {
      type: "portalBuilderDemo",
      titleKey: "solutionsPage.product.agentHub.interactiveTitle",
      defaultTitle: "Build a Partner Portal",
      descriptionKey: "solutionsPage.product.agentHub.interactiveDescription",
      defaultDescription:
        "Select partner types to see portal configuration options",
      options: [
        {
          labelKey: "option.insurance",
          defaultLabel: "Insurance Agents",
          value: "insurance",
        },
        {
          labelKey: "option.realestate",
          defaultLabel: "Real Estate Brokers",
          value: "realestate",
        },
        {
          labelKey: "option.sales",
          defaultLabel: "Sales Partners",
          value: "sales",
        },
      ],
    },
    specificCtaKey: "solutionsPage.product.agentHub.ctaRealEstate",
    defaultSpecificCta: "Empower *your partners* with seamless access!",
  },
  {
    id: "cipher-forge",
    icon: FiLock,
    titleKey: "solutionsPage.product.cipherForge.title",
    defaultTitle: "CipherForge™",
    categoryKey: "solutionsPage.product.cipherForge.category",
    defaultCategory: "Quantum-Secure Confidential Computing",
    missionKey: "solutionsPage.product.cipherForge.mission",
    defaultMission:
      "Make privacy breaches and data misuse mathematically impossible in distributed AI and collaborative computing.",
    descriptionKey: "solutionsPage.product.cipherForge.description",
    defaultDescription:
      "Secure your most sensitive data and AI models with CipherForge™, enabling privacy-preserving computation and collaboration in distributed environments. Our platform leverages advanced cryptographic techniques, including fully homomorphic encryption (FHE) and secure multi-party computation (MPC), underpinned by quantum-resistant algorithms.",
    benefits: [
      "solutionsPage.product.cipherForge.benefit1",
      "solutionsPage.product.cipherForge.benefit2",
      "solutionsPage.product.cipherForge.benefit3",
      "solutionsPage.product.cipherForge.benefit4",
      "solutionsPage.product.cipherForge.benefit5",
    ],
    useCases: [
      {
        titleKey: "solutionsPage.product.cipherForge.useCase1Title",
        defaultTitle: "Secure Health Data Collaboration",
        problemKey: "solutionsPage.product.cipherForge.useCase1Problem",
        defaultProblem: "PHI sharing prevents multi-institution research.",
        solutionKey: "solutionsPage.product.cipherForge.useCase1Solution",
        defaultSolution: "Encrypted computation on combined datasets.",
        outcomeKey: "solutionsPage.product.cipherForge.useCase1Outcome",
        defaultOutcome: "Breakthrough research without data exposure.",
      },
      {
        titleKey: "solutionsPage.product.cipherForge.useCase2Title",
        defaultTitle: "Financial Crime Analysis",
        problemKey: "solutionsPage.product.cipherForge.useCase2Problem",
        defaultProblem: "Banks can't share fraud patterns due to privacy.",
        solutionKey: "solutionsPage.product.cipherForge.useCase2Solution",
        defaultSolution: "Collective pattern detection on encrypted data.",
        outcomeKey: "solutionsPage.product.cipherForge.useCase2Outcome",
        defaultOutcome: "30% better fraud detection with full data privacy.",
      },
    ],
    interactiveCapability: {
      type: "securityAnalyzerDemo",
      titleKey: "solutionsPage.product.cipherForge.interactiveTitle",
      defaultTitle: "Test Quantum-Secure Encryption",
      descriptionKey:
        "solutionsPage.product.cipherForge.interactiveDescription",
      defaultDescription:
        "Enter text to see encrypted output with quantum-resistant algorithms",
    },
    specificCtaKey: "solutionsPage.product.cipherForge.ctaGovernment",
    defaultSpecificCta:
      "Secure *sensitive data* with military-grade encryption!",
  },
];
// Simplified Theme and Translation for this example
const theme = {
  surface: "bg-slate-50",
  surfaceCard: "bg-white",
  surfaceMuted: "bg-slate-100",
  cardShadow: "shadow-xl",
  borderLight: "border-slate-200",
  textPrimary: "text-slate-900",
  textSecondary: "text-slate-600",
  textMuted: "text-slate-500",
  textHighlight: "text-cyan-600",
  accentCyan: "text-cyan-500",
  focusRingDefault:
    "focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none",
  buttonPrimary:
    "bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors",
  buttonSecondary:
    "bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors",
  inputBase:
    "block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm",
};

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const dashboardStagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  hidden: {},
};
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ProductDashboardSection = () => {
  const { t } = useLocalization();
  const [selectedProduct, setSelectedProduct] = useState(productsData[0]);

  if (!productsData || productsData.length === 0) {
    return <p>Loading products...</p>; // Or some loading state
  }

  return (
    <section
      id="solutions-dashboard"
      className={`${theme.surface} py-16 md:py-24`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          t={t}
          titleKey="solutionsPage.coreSolutionsTitle"
          defaultTitle="Our Core Technology Suite & Modules"
          subtitleKey="solutionsPage.coreSolutionsSubtitle"
          defaultSubtitle="Explore our solutions and see their capabilities in action."
        />
        <motion.div
          className="mt-12 md:mt-16 flex flex-col lg:flex-row gap-8 md:gap-10"
          variants={dashboardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          {/* Left Pane: Product Selector */}
          <motion.div
            variants={fadeInUp}
            className="w-full lg:w-1/3 xl:w-1/4 flex-shrink-0"
          >
            <ProductSelector
              products={productsData}
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
              t={t}
              theme={theme}
            />
          </motion.div>

          {/* Right Pane: Product Detail and Interactive Area */}
          <motion.div
            variants={fadeInUp}
            className="w-full lg:w-2/3 xl:w-3/4 min-h-[600px]"
          >
            {/* Added min-h for stability during transitions */}
            <AnimatePresence mode="wait">
              {selectedProduct ? (
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="h-full"
                >
                  <ProductDetailView
                    product={selectedProduct}
                    t={t}
                    theme={theme}
                    fadeInUp={fadeInUp}
                    viewportSettings={viewportSettings}
                  />
                </motion.div>
              ) : (
                <div
                  className={`p-8 ${theme.surfaceCard} rounded-lg ${theme.cardShadow} text-center flex items-center justify-center h-full`}
                >
                  <p className={`${theme.textSecondary} text-lg`}>
                    Select a product from the list to see details and
                    interactive demos.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDashboardSection;
