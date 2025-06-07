// src/pages/Solutions/BIMLabPage.js (example path)
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiShare2,
  FiCheckSquare,
  FiEye,
  FiPackage,
  FiUsers,
  FiBox,
  FiHardDrive,
  FiLayers,
  FiGithub,
  FiMessageSquare,
  FiZap,
  FiShield,
  FiLock,
  FiTool,
  FiBriefcase,
  FiAward,
  FiTrendingUp,
  FiClipboard,
  FiChevronsRight,
} from "react-icons/fi";

import { useLocalization } from "../../components/LocalizationContext"; // Adjust pat
import Button from "../../components/Button"; // Adjust path
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// --- Reusable Components ---
const SectionWrapper = ({
  children,
  className = "",
  bg = theme.background,
  id,
  bleed = false,
}) => (
  <motion.section
    id={id}
    className={`py-16 md:py-24 ${bg} ${className} relative`}
    initial="hidden"
    whileInView="visible"
    viewport={viewportSettings}
    variants={staggerContainer}
  >
    {bleed ? (
      children
    ) : (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    )}
  </motion.section>
);

const PageTitle = ({
  t,
  titleKey,
  subtitleKey,
  defaultTitle,
  defaultSubtitle,
}) => (
  <motion.div className="mb-12 md:mb-16 text-center" variants={fadeInUp}>
    <h1
      className={`text-4xl sm:text-5xl md:text-6xl font-extrabold ${theme.textPrimary} mb-4 leading-tight`}
    >
      {t(titleKey, defaultTitle)}
    </h1>
    {subtitleKey && (
      <p
        className={`text-lg md:text-xl ${theme.textSecondary} max-w-3xl mx-auto`}
      >
        {t(subtitleKey, defaultSubtitle)}
      </p>
    )}
  </motion.div>
);

const SectionTitle = ({ t, titleKey, defaultTitle, className = "" }) => (
  <motion.h2
    variants={fadeInUp}
    className={`text-3xl md:text-4xl font-bold ${theme.textPrimary} mb-10 md:mb-12 text-center ${className}`}
  >
    {t(titleKey, defaultTitle)}
  </motion.h2>
);

const CodeBlock = ({ codeString, language = "typescript", className = "" }) => (
  <motion.div
    variants={fadeInUp}
    className={`my-4 rounded-lg overflow-hidden ${theme.cardShadow} ${className}`}
  >
    <pre
      className={`p-4 sm:p-6 text-xs md:text-sm language-${language} bg-slate-800 text-slate-200 overflow-x-auto`}
    >
      <code>{codeString.trim()}</code>
    </pre>
  </motion.div>
);

const DetailCard = ({
  t,
  titleKey,
  descriptionKey,
  icon,
  defaultTitle = "",
}) => {
  const IconComponent = icon;
  return (
    <motion.div
      variants={fadeInUp}
      className={`${theme.surfaceCard} p-6 rounded-xl border ${theme.borderLight} ${theme.cardShadow} ${theme.cardHoverShadow} transition-shadow`}
    >
      <div
        className={`inline-flex items-center justify-center p-3 rounded-full ${theme.accentCyanBg}/10 mb-4`}
      >
        <IconComponent className={`w-6 h-6 ${theme.textHighlight}`} />
      </div>
      <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-2`}>
        {t(titleKey, defaultTitle)}
      </h3>
      <p className={`${theme.textSecondary} text-sm leading-relaxed`}>
        {t(descriptionKey)}
      </p>
    </motion.div>
  );
};

// --- Main BIMLabPage Component ---
export default function BIMLabPage() {
  const { t } = useLocalization();

  const keyComponentsData = [
    {
      icon: FiZap,
      titleKey: "solutionsBIMLab.componentAIToolsTitle",
      descriptionKey: "solutionsBIMLab.componentAIToolsDesc",
      code: `import { Flow } from '@google-ai/flow';\nimport { BimObjectGenerator } from '@loyalshift/bim-core';\n\nclass CinematicBIMGenerator {\n  async generateBuildingScene(prompt: string) {\n    const storyboard = await Flow.generateStoryboard(prompt);\n    const bimObjects = await BimObjectGenerator.matchObjects(storyboard);\n    return this.renderScene(bimObjects);\n  }\n  private renderScene(objects: any[]) { /* Three.js/WebGL */ }\n}`,
    },
    {
      icon: FiShield,
      titleKey: "solutionsBIMLab.componentSynthIDTitle",
      descriptionKey: "solutionsBIMLab.componentSynthIDDesc",
      code: `import { SynthID } from '@google-ai/synthid';\nimport { BimObject } from '@loyalshift/bim-core';\n\nclass BimAuthenticator {\n  async verifyObject(object: any) {\n    const watermark = await SynthID.detect(object.modelFile);\n    return { isAuthentic: watermark.valid, manufacturer: object.manufacturerId };\n  }\n}`,
    },
    {
      icon: FiCpu,
      titleKey: "solutionsBIMLab.componentColabAssistantTitle",
      descriptionKey: "solutionsBIMLab.componentColabAssistantDesc",
      code: `import { ColabAgent } from '@google-ai/colab';\nimport { SustainabilityCalculator } from '@loyalshift/bim-sustainability';\n\nclass BimColabAssistant {\n  // ... constructor ...\n  async optimizeForSustainability(bimObject: any) {\n    const suggestions = await this.agent.analyzeCode(bimObject.sourceFiles, "Improve carbon footprint");\n    const newMetrics = SustainabilityCalculator.calculate(suggestions.modifiedObject);\n    return { originalScore: bimObject.sustainabilityScore, optimizedScore: newMetrics };\n  }\n}`,
    },
    {
      icon: FiUsers,
      titleKey: "solutionsBIMLab.componentCareerDreamerTitle",
      descriptionKey: "solutionsBIMLab.componentCareerDreamerDesc",
      code: `import { CareerDreamer } from '@google-ai/career-dreamer';\n\nclass DesignCareerAdvisor {\n  async suggestSpecializations(userSkills: string[]) {\n    const paths = await CareerDreamer.recommendPaths({ domain: 'architecture', skills: userSkills });\n    return paths.map(path => ({ specialization: path.name, learningModules: [] /* map to modules */ }));\n  }\n}`,
    },
  ];

  const portalFeaturesData = [
    {
      sectionKey: "solutionsBIMLab.portalDashboard.objectLab.section",
      featuresKey: "solutionsBIMLab.portalDashboard.objectLab.features",
      aiIntegrationKey: "solutionsBIMLab.portalDashboard.objectLab.ai",
    },
    {
      sectionKey: "solutionsBIMLab.portalDashboard.sustainabilityHub.section",
      featuresKey: "solutionsBIMLab.portalDashboard.sustainabilityHub.features",
      aiIntegrationKey: "solutionsBIMLab.portalDashboard.sustainabilityHub.ai",
    },
    {
      sectionKey: "solutionsBIMLab.portalDashboard.collaborationSpace.section",
      featuresKey:
        "solutionsBIMLab.portalDashboard.collaborationSpace.features",
      aiIntegrationKey: "solutionsBIMLab.portalDashboard.collaborationSpace.ai",
    },
    {
      sectionKey: "solutionsBIMLab.portalDashboard.learningCenter.section",
      featuresKey: "solutionsBIMLab.portalDashboard.learningCenter.features",
      aiIntegrationKey: "solutionsBIMLab.portalDashboard.learningCenter.ai",
    },
    {
      sectionKey: "solutionsBIMLab.portalDashboard.marketplace.section",
      featuresKey: "solutionsBIMLab.portalDashboard.marketplace.features",
      aiIntegrationKey: "solutionsBIMLab.portalDashboard.marketplace.ai",
    },
  ];

  const openSourcePackages = [
    {
      name: "@loyalshift/bim-core",
      descriptionKey: "solutionsBIMLab.oss.coreDesc",
    },
    {
      name: "@loyalshift/bim-sustainability",
      descriptionKey: "solutionsBIMLab.oss.sustainabilityDesc",
    },
    {
      name: "@loyalshift/ar-viewer",
      descriptionKey: "solutionsBIMLab.oss.arViewerDesc",
    },
    {
      name: "@loyalshift/ai-integrations",
      descriptionKey: "solutionsBIMLab.oss.aiIntegrationsDesc",
    },
  ];

  const uvpData = [
    {
      icon: FiZap,
      titleKey: "solutionsBIMLab.uvpAICoCreationTitle",
      items: [
        "solutionsBIMLab.uvpAICoCreationDesc1",
        "solutionsBIMLab.uvpAICoCreationDesc2",
        "solutionsBIMLab.uvpAICoCreationDesc3",
      ],
      code: `class BimObjectGenerator {\n  // ... generate from prompt ...\n}`,
    },
    {
      icon: FiLock,
      titleKey: "solutionsBIMLab.uvpBlockchainTitle",
      items: ["solutionsBIMLab.uvpBlockchainDesc"],
      code: `class BimObjectNFT {\n  async registerObject(object: BimObject) { /* ... */ }\n}`,
    },
    {
      icon: FiTrendingUp,
      titleKey: "solutionsBIMLab.uvpLearningPathwaysTitle",
      items: ["solutionsBIMLab.uvpLearningPathwaysDesc"],
      code: `const path = new CareerDreamer.PathBuilder()\n  .forRole('Sustainable Architect')\n  // ... recommendModules() ...`,
    },
    {
      icon: FiBox,
      titleKey: "solutionsBIMLab.uvpCrossPlatformARTitle",
      items: ["solutionsBIMLab.uvpCrossPlatformARDesc"],
      code: `class BimARViewer {\n  async viewOnSite(object: BimObject) { /* ... */ }\n}`,
    },
  ];

  const roadmapPhases = [
    {
      titleKey: "solutionsBIMLab.roadmapPhase1Title",
      descriptionKey: "solutionsBIMLab.roadmapPhase1Desc",
    },
    {
      titleKey: "solutionsBIMLab.roadmapPhase2Title",
      descriptionKey: "solutionsBIMLab.roadmapPhase2Desc",
    },
    {
      titleKey: "solutionsBIMLab.roadmapPhase3Title",
      descriptionKey: "solutionsBIMLab.roadmapPhase3Desc",
    },
    {
      titleKey: "solutionsBIMLab.roadmapPhase4Title",
      descriptionKey: "solutionsBIMLab.roadmapPhase4Desc",
    },
  ];

  // Page Header (simplified for a solution sub-page)
  const PageHeader = () => (
    <div
      className={`${theme.surface} py-4 border-b ${theme.borderLight} shadow-sm`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link
          to="/solutions"
          className={`text-lg font-semibold ${theme.textPrimary} hover:${theme.textHighlight}`}
        >
          &larr; {t("solutionsBIMLab.backToSolutions", "Back to All Solutions")}
        </Link>
        <h1 className={`text-xl font-bold ${theme.textHighlight}`}>
          {t("solutionsBIMLab.pageHeaderTitle", "LoyalShift BIM Lab")}
        </h1>
      </div>
    </div>
  );

  // Page Footer (simplified)
  const PageFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer
        className={`${theme.surfaceMuted} py-8 text-center border-t ${theme.borderLight}`}
      >
        <p className={`${theme.textMuted} text-sm`}>
          {t(
            "solutionsPage.finalCta.copyright",
            `© ${currentYear} LoyalShift. All rights reserved.`
          )}
        </p>
      </footer>
    );
  };

  return (
    <div className={`${theme.background} antialiased`}>
      <PageHeader /> {/* Simplified header for this specific solution page */}
      <main>
        {/* Hero Section */}
        <SectionWrapper
          bg={`${theme.surfaceMuted}`}
          className="pt-16 md:pt-20 text-center"
          id="bim-hero"
        >
          <PageTitle
            t={t}
            titleKey="solutionsBIMLab.heroTitle"
            subtitleKey="solutionsBIMLab.heroSubtitle"
          />
          <motion.div
            variants={fadeInUp}
            className={`my-8 p-4 rounded-lg ${theme.surfaceCard} border ${theme.border} shadow-md max-w-3xl mx-auto`}
          >
            <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-2`}>
              {t("solutionsBIMLab.architectureDiagramTitle")}
            </h3>
            <div
              className={`h-64 md:h-80 ${theme.surfaceMuted} flex items-center justify-center rounded border ${theme.borderLight}`}
            >
              <p className={theme.textMuted}>
                {t("solutionsBIMLab.architectureDiagramPlaceholder")}
              </p>
            </div>
          </motion.div>
        </SectionWrapper>

        {/* Key Components Section */}
        <SectionWrapper id="key-components">
          <SectionTitle t={t} titleKey="solutionsBIMLab.keyComponentsTitle" />
          <div className="grid md:grid-cols-2 gap-8">
            {keyComponentsData.map((comp) => (
              <motion.div
                key={comp.titleKey}
                variants={fadeInUp}
                className={`${theme.surfaceCard} p-6 rounded-xl border ${theme.borderLight} ${theme.cardShadow}`}
              >
                <div className="flex items-center mb-3">
                  <div
                    className={`p-2 rounded-full ${theme.accentCyanBg}/10 mr-3`}
                  >
                    <comp.icon className={`w-6 h-6 ${theme.textHighlight}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${theme.textPrimary}`}>
                    {t(comp.titleKey)}
                  </h3>
                </div>
                <p className={`${theme.textSecondary} text-sm mb-3`}>
                  {t(comp.descriptionKey)}
                </p>
                <CodeBlock codeString={comp.code} />
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Portal Dashboard Features */}
        <SectionWrapper id="portal-features" bg={theme.surfaceMuted}>
          <SectionTitle t={t} titleKey="solutionsBIMLab.portalDashboardTitle" />
          <motion.div
            variants={fadeInUp}
            className={`overflow-x-auto ${theme.surfaceCard} rounded-lg shadow-lg border ${theme.borderLight}`}
          >
            <table className="min-w-full text-sm">
              <thead className={`${theme.tableHeaderBg}`}>
                <tr>
                  <th
                    className={`py-3 px-4 text-left font-semibold ${theme.textSecondary} uppercase`}
                  >
                    {t("solutionsBIMLab.portalDashboardTableSection")}
                  </th>
                  <th
                    className={`py-3 px-4 text-left font-semibold ${theme.textSecondary} uppercase`}
                  >
                    {t("solutionsBIMLab.portalDashboardTableFeatures")}
                  </th>
                  <th
                    className={`py-3 px-4 text-left font-semibold ${theme.textSecondary} uppercase`}
                  >
                    {t("solutionsBIMLab.portalDashboardTableAI")}
                  </th>
                </tr>
              </thead>
              <tbody className={theme.textSecondary}>
                {portalFeaturesData.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b ${theme.borderLight} last:border-b-0 hover:${theme.tableRowStripeBg}`}
                  >
                    <td
                      className={`py-3 px-4 font-medium ${theme.textPrimary}`}
                    >
                      {t(row.sectionKey)}
                    </td>
                    <td className="py-3 px-4">{t(row.featuresKey)}</td>
                    <td className={`py-3 px-4 ${theme.textHighlight}`}>
                      {t(row.aiIntegrationKey)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </SectionWrapper>

        {/* Open-Source Library Structure */}
        <SectionWrapper id="open-source">
          <SectionTitle
            t={t}
            titleKey="solutionsBIMLab.openSourceLibraryTitle"
          />
          <motion.p
            variants={fadeInUp}
            className={`${theme.textSecondary} text-center max-w-2xl mx-auto mb-8`}
          >
            {t("solutionsBIMLab.openSourceLibraryDesc")}
          </motion.p>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              variants={fadeInUp}
              className={`${theme.surfaceCard} p-6 rounded-xl border ${theme.borderLight} ${theme.cardShadow}`}
            >
              <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-3`}>
                {t("solutionsBIMLab.openSourceLibraryStructureTitle")}
              </h3>
              <div
                className={`${theme.surfaceMuted} p-4 rounded-md border ${theme.borderLight} text-xs ${theme.textSecondary} font-mono`}
              >
                <p>loyalshift-bim/</p>
                <p className="pl-4">├── packages/</p>
                <p className="pl-8">
                  │ ├── core/{" "}
                  <span className={theme.textMuted}># Base BIM entities</span>
                </p>
                <p className="pl-8">
                  │ ├── sustainability/{" "}
                  <span className={theme.textMuted}># Carbon calculation</span>
                </p>
                <p className="pl-8">
                  │ ├── ar-viewer/{" "}
                  <span className={theme.textMuted}># Mobile AR</span>
                </p>
                <p className="pl-8">
                  │ └── ai-integrations/{" "}
                  <span className={theme.textMuted}># Google AI bridge</span>
                </p>
                <p className="pl-4">├── portal/</p>
                <p className="pl-8">
                  │ ├── manufacturer-dash/{" "}
                  <span className={theme.textMuted}># React dashboard</span>
                </p>
                <p className="pl-8">
                  │ └── object-lab/{" "}
                  <span className={theme.textMuted}># WebGL editor</span>
                </p>
                <p className="pl-4">
                  ├── examples/{" "}
                  <span className={theme.textMuted}># Sample projects</span>
                </p>
                <p className="pl-4">
                  └── cli/{" "}
                  <span className={theme.textMuted}># Command-line tools</span>
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-4">
              {openSourcePackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`${theme.surfaceCard} p-4 rounded-lg border ${theme.borderLight} ${theme.cardShadow}`}
                >
                  <p
                    className={`font-mono font-semibold ${theme.textHighlight}`}
                  >
                    {pkg.name}
                  </p>
                  <p className={`${theme.textSecondary} text-xs mt-1`}>
                    {t(pkg.descriptionKey)}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Unique Value Propositions */}
        <SectionWrapper id="uvp" bg={theme.surfaceMuted}>
          <SectionTitle t={t} titleKey="solutionsBIMLab.uvpTitle" />
          <div className="grid md:grid-cols-2 gap-8">
            {uvpData.map((uvp) => (
              <DetailCard
                key={uvp.titleKey}
                t={t}
                titleKey={uvp.titleKey}
                icon={uvp.icon}
                defaultTitle="Unique Value"
              >
                <ul className="list-disc list-outside space-y-1 pl-5 text-sm mb-3">
                  {uvp.items.map((itemKey) => (
                    <li key={itemKey}>{t(itemKey)}</li>
                  ))}
                </ul>
                {uvp.code && <CodeBlock codeString={uvp.code} />}
              </DetailCard>
            ))}
          </div>
        </SectionWrapper>

        {/* Development Roadmap */}
        <SectionWrapper id="roadmap">
          <SectionTitle t={t} titleKey="solutionsBIMLab.roadmapTitle" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {/* Timeline line (conceptual) */}
            <div
              className="hidden lg:block absolute top-5 left-0 right-0 h-0.5 bg-cyan-400/30"
              style={{ zIndex: -1 }}
            ></div>
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={phase.titleKey}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center"
              >
                <div
                  className={`absolute -top-2.5 w-5 h-5 rounded-full ${theme.accentCyanBg} border-2 border-white shadow-md z-10`}
                ></div>
                <div
                  className={`${theme.surfaceCard} p-6 rounded-xl border ${theme.borderLight} ${theme.cardShadow} ${theme.cardHoverShadow} transition-shadow flex-grow w-full`}
                >
                  <h4
                    className={`text-lg font-semibold ${theme.textHighlight} mb-1`}
                  >
                    {t(
                      "solutionsBIMLab.roadmapPhaseLabel",
                      `Phase ${index + 1}`
                    )}
                  </h4>
                  <h3 className={`text-md font-bold ${theme.textPrimary} mb-2`}>
                    {t(phase.titleKey)}
                  </h3>
                  <p
                    className={`${theme.textSecondary} text-xs leading-relaxed`}
                  >
                    {t(phase.descriptionKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Conclusion */}
        <SectionWrapper id="conclusion" bg={theme.surfaceMuted}>
          <SectionTitle t={t} titleKey="solutionsBIMLab.conclusionTitle" />
          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center space-y-4 ${theme.textSecondary} text-lg leading-relaxed"
          >
            <p>{t("solutionsBIMLab.conclusionText1")}</p>
            <p>{t("solutionsBIMLab.conclusionText2")}</p>
          </motion.div>
        </SectionWrapper>

        {/* Final CTA */}
        <SectionWrapper id="bim-cta" className="text-center">
          <motion.h2
            variants={fadeInUp}
            className={`text-3xl font-bold ${theme.textPrimary} mb-4`}
          >
            {t("solutionsBIMLab.ctaTitle")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className={`text-lg ${theme.textSecondary} max-w-2xl mx-auto mb-8`}
          >
            {t("solutionsBIMLab.ctaText")}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              to="/contact?subject=BIMLabPartner"
              className={`${theme.accentCyanBg} ${theme.buttonTextDark} hover:${theme.accentCyanBgHover} px-8 py-3 font-semibold`}
            >
              {t("solutionsBIMLab.ctaButtonPartner")}
            </Button>
            <Button
              to="https://github.com/loyalshift/bim-lab"
              target="_blank"
              variant="outline"
              className={`border-2 ${theme.accentCyan} ${theme.accentCyan} hover:bg-cyan-400/10 hover:border-cyan-600 px-8 py-3 font-semibold`}
            >
              <FiGithub className="mr-2" /> {t("solutionsBIMLab.ctaButtonOSS")}
            </Button>
          </motion.div>
        </SectionWrapper>
      </main>
      <PageFooter />
    </div>
  );
}
