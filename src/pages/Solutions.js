// src/pages/Solutions.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiZap,
  FiCheckSquare,
  FiCpu,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiLock,
  FiGitMerge,
  FiClipboard,
  FiTrendingUp,
  FiChevronDown,
  FiHexagon,
  FiTriangle,
  FiSquare,
  FiTool,
  FiEye,
  FiBox,
} from "react-icons/fi";

import loyalShiftV2Theme from "../themes/loyalshift-v2.theme";
// Assuming Button and useLocalization are correctly imported from your project structure
import Button from "../components/Button";
import { useLocalization } from "../components/LocalizationContext";
import ProductDashboardSection from "../components/Solutions/ProductDashboardSection";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const cardGridStagger = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// --- Geometric elements ---
const GeometricElement = ({
  shape,
  size = 240,
  className = "",
  colorClass = `${theme.textHighlight}/5`,
}) => {
  const IconComponent =
    { hexagon: FiHexagon, triangle: FiTriangle, square: FiSquare }[shape] ||
    FiHexagon;
  return (
    <IconComponent
      className={`${colorClass} ${className} absolute`}
      size={size}
      style={{ filter: "blur(1.5px)", opacity: 0.07 }}
    />
  );
};

// --- Reusable Components ---
const SectionWrapper = ({
  children,
  className = "",
  bg = theme.background,
  id,
  noContainer = false,
  bleedTop = false,
  bleedBottom = false,
}) => (
  <motion.section
    id={id}
    className={`relative ${bleedTop ? "pt-0" : "py-20 md:py-28"} ${
      bleedBottom ? "pb-0" : "py-20 md:py-28"
    } ${bg} ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={viewportSettings}
    variants={staggerContainer}
  >
    {noContainer ? (
      children
    ) : (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    )}
  </motion.section>
);

const SectionTitle = ({
  t,
  titleKey,
  subtitleKey,
  defaultTitle,
  defaultSubtitle,
  align = "text-center",
  className = "",
}) => (
  <motion.div
    className={`mb-12 md:mb-16 ${align} ${className}`}
    variants={fadeInUp}
  >
    {subtitleKey && (
      <p
        className={`text-base font-semibold ${theme.textHighlight} uppercase tracking-wider mb-3`}
      >
        {t(subtitleKey, defaultSubtitle)}
      </p>
    )}
    <h2 className={`text-4xl md:text-5xl font-bold ${theme.textPrimary}`}>
      {t(titleKey, defaultTitle)}
    </h2>
  </motion.div>
);

const BenefitListItem = ({ children, t, itemKey }) => (
  <motion.li variants={fadeInUp} className="flex items-start py-1.5 group">
    <FiCheckCircle
      className={`w-5 h-5 ${theme.textHighlight} mr-3 mt-1 flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
    />
    <span
      className={`${theme.textSecondary} text-base group-hover:${theme.textPrimary} transition-colors`}
    >
      {t(itemKey, children)}
    </span>
  </motion.li>
);

const ProductSection = ({ product, t }) => {
  const [useCasesVisible, setUseCasesVisible] = useState(false);
  const IconComponent = product.icon;

  return (
    <motion.div
      variants={fadeInUp}
      className={`flex flex-col ${theme.surfaceCard} rounded-2xl ${theme.cardShadow} overflow-hidden transition-all duration-300 ease-out group border ${theme.borderLight} hover:border-cyan-500/40`}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 174, 239, 0.15)",
      }}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start sm:items-center mb-5">
          <div
            className={`relative inline-flex p-3.5 items-center justify-center rounded-xl mr-4 sm:mr-5 flex-shrink-0 ${theme.surfaceMuted} border ${theme.borderLight} shadow-inner`}
          >
            <div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/10 opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-sm`}
            ></div>
            <IconComponent
              className={`relative z-10 w-8 h-8 ${theme.textHighlight} transition-transform duration-300 group-hover:scale-110`}
            />
          </div>
          <div>
            <h3 className={`text-2xl font-semibold ${theme.textPrimary}`}>
              {t(product.titleKey, product.defaultTitle)}
            </h3>
            {product.categoryKey && (
              <p
                className={`text-xs ${theme.textMuted} uppercase tracking-wider`}
              >
                {t(product.categoryKey, product.defaultCategory)}
              </p>
            )}
          </div>
        </div>
        <p className={`text-sm ${theme.accentCyan} font-medium italic mb-2`}>
          {t(product.missionKey, product.defaultMission)}
        </p>
        {product.visionKey && (
          <p className={`text-xs ${theme.textMuted} italic mb-3`}>
            {t(product.visionKey, product.defaultVision)}
          </p>
        )}
        <p
          className={`text-base ${theme.textSecondary} mb-5 leading-relaxed flex-grow min-h-[5rem]`}
        >
          {t(product.descriptionKey, product.defaultDescription)}
        </p>
      </div>

      {product.benefits && product.benefits.length > 0 && (
        <div
          className={`px-6 md:px-8 py-5 ${theme.surfaceMuted} border-t ${theme.borderLight}`}
        >
          <h4
            className={`text-sm font-semibold ${theme.textSecondary} mb-3 uppercase tracking-wider`}
          >
            {t("solutionsPage.keyBenefits", "Key Benefits:")}
          </h4>
          <motion.ul
            className="list-none pl-0 space-y-1.5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            {product.benefits.map((benefitKey, i) => (
              <BenefitListItem key={i} itemKey={benefitKey} t={t} />
            ))}
          </motion.ul>
        </div>
      )}

      {product.useCases && product.useCases.length > 0 && (
        <div className={`px-6 md:px-8 py-4 border-t ${theme.borderLight}`}>
          <button
            onClick={() => setUseCasesVisible(!useCasesVisible)}
            className={`w-full flex justify-between items-center py-2 text-left text-sm font-semibold ${theme.textHighlight} hover:text-cyan-700 transition-colors ${theme.focusRingDefault}`}
            aria-expanded={useCasesVisible}
          >
            {t("solutionsPage.viewUseCases", "View Enterprise Use Cases")}
            <motion.div animate={{ rotate: useCasesVisible ? 180 : 0 }}>
              <FiChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
          <AnimatePresence>
            {useCasesVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-3 space-y-3 overflow-hidden text-xs"
              >
                {product.useCases.map((uc, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-md ${theme.surfaceMuted} border ${theme.borderLight}`}
                  >
                    <h5 className={`font-semibold ${theme.textPrimary} mb-0.5`}>
                      {t(uc.titleKey)}
                    </h5>
                    <p className={`${theme.textSecondary} mb-0.5`}>
                      <strong className={theme.textPrimary}>Problem:</strong>{" "}
                      {t(uc.problemKey)}
                    </p>
                    <p className={`${theme.textSecondary} mb-0.5`}>
                      <strong className={theme.textPrimary}>Solution:</strong>{" "}
                      {t(uc.solutionKey)}
                    </p>
                    <p className={`${theme.textSecondary}`}>
                      <strong className={theme.textPrimary}>Outcome:</strong>{" "}
                      {t(uc.outcomeKey)}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* {product.industryTable && product.industryTable.length > 0 && (
        <div
          className={`px-6 md:px-8 py-4 border-t ${theme.borderLight} overflow-x-auto`}
        >
          <h4
            className={`text-sm font-semibold ${theme.textSecondary} mb-3 uppercase tracking-wider`}
          >
            {t(
              product.industryUsageTitleKey ||
                "solutionsPage.industryUsageTitle",
              "Industry Adoption"
            )}
          </h4>
          <table className="min-w-full text-xs">
            <thead className={`${theme.tableHeaderBg}`}>
              <tr>
                <th
                  className={`py-2 px-3 text-left font-medium ${theme.textSecondary} uppercase`}
                >
                  {t("solutionsPage.tableHeaderIndustry", "Industry")}
                </th>
                <th
                  className={`py-2 px-3 text-left font-medium ${theme.textSecondary} uppercase`}
                >
                  {t("solutionsPage.tableHeaderUsage", "Usage %")}
                </th>
                <th
                  className={`py-2 px-3 text-left font-medium ${theme.textSecondary} uppercase`}
                >
                  {t(
                    "solutionsPage.tableHeaderApplications",
                    "Primary Applications"
                  )}
                </th>
              </tr>
            </thead>
            <tbody className={theme.textSecondary}>
              {product.industryTable.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b ${theme.borderLight} last:border-b-0 hover:${theme.tableRowStripeBg}`}
                >
                  <td className={`py-2 px-3 ${theme.textPrimary}`}>
                    {t(row.industryKey)}
                  </td>
                  <td className="py-2 px-3">{row.usagePercent}</td>
                  <td className="py-2 px-3">{t(row.applicationsKey)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
      {product.specificCtaKey && (
        <div
          className={`p-6 md:p-8 mt-auto border-t ${theme.borderLight} ${theme.surfaceMuted}`}
        >
          <p
            className={`text-sm italic ${theme.textHighlight} text-center`}
            dangerouslySetInnerHTML={{
              __html: t(product.specificCtaKey).replace(
                /\*(.*?)\*/g,
                `<strong class="${theme.accentCyan}"><em>$1</em></strong>`
              ),
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

const IndustrySolutionCard = ({
  t,
  titleKey,
  stackKey,
  roiKey,
  implementationKey,
  edgeKey,
  theme,
}) => (
  <motion.div
    variants={fadeInUp}
    className={`${theme.surface} rounded-lg border ${theme.borderLight} p-5`}
  >
    <h3 className={`text-lg font-medium ${theme.textPrimary} mb-4`}>
      {t(titleKey)}
    </h3>

    <div className="space-y-4 text-sm">
      <div>
        <h4 className={`font-medium ${theme.textPrimary} mb-1`}>
          {t("solutionsPage.solutionStack", "Solution Components:")}
        </h4>
        <p className={theme.textSecondary}>{t(stackKey)}</p>
      </div>

      <div>
        <h4 className={`font-medium ${theme.textPrimary} mb-1`}>
          {t("solutionsPage.businessImpact", "Business Impact:")}
        </h4>
        <p className={theme.textSecondary}>{t(roiKey)}</p>
      </div>

      <div>
        <h4 className={`font-medium ${theme.textPrimary} mb-1`}>
          {t("solutionsPage.deployment", "Deployment Characteristics:")}
        </h4>
        <p className={theme.textSecondary}>{t(implementationKey)}</p>
      </div>

      <div className={`mt-4 pt-4 border-t ${theme.borderLight}`}>
        <h4 className={`font-medium ${theme.textPrimary} mb-1`}>
          {t(
            "solutionsPage.technicalDifferentiator",
            "Technical Differentiator:"
          )}
        </h4>
        <p className={`${theme.textPrimary}`}>{t(edgeKey)}</p>
      </div>
    </div>
  </motion.div>
);

// --- Main Solutions Component ---
export default function Solutions() {
  const { t } = useLocalization();

  const crossModuleSynergiesData = [
    {
      challengeKey: "solutionsEnterprise.synergy.bankMA.challenge",
      solutionStackKey: "solutionsEnterprise.synergy.bankMA.stack",
      impactKey: "solutionsEnterprise.synergy.bankMA.impact",
    },
    {
      challengeKey: "solutionsEnterprise.synergy.manufacturing.challenge",
      solutionStackKey: "solutionsEnterprise.synergy.manufacturing.stack",
      impactKey: "solutionsEnterprise.synergy.manufacturing.impact",
    },
    {
      challengeKey: "solutionsEnterprise.synergy.government.challenge",
      solutionStackKey: "solutionsEnterprise.synergy.government.stack",
      impactKey: "solutionsEnterprise.synergy.government.impact",
    },
  ];
  const legacyInterfaces = [
    "solutionsEnterprise.legacyInterface.mainframe",
    "solutionsEnterprise.legacyInterface.industrial",
    "solutionsEnterprise.legacyInterface.database",
    "solutionsEnterprise.legacyInterface.document",
  ];
  const strategicValuePoints = [
    "solutionsEnterprise.strategicValue.deRisked",
    "solutionsEnterprise.strategicValue.roiExtension",
    "solutionsEnterprise.strategicValue.complianceAuto",
    "solutionsEnterprise.strategicValue.partnerEco",
    "solutionsEnterprise.strategicValue.aiAdoption",
  ];
  const industrySolutionsData = [
    {
      titleKey: "solutionsEnterprise.bankingSolutionTitle",
      stackKey: "solutionsEnterprise.bankingSolution.stack",
      roiKey: "solutionsEnterprise.bankingSolution.businessImpact",
      implementationKey: "solutionsEnterprise.bankingSolution.deployment",
      edgeKey: "solutionsEnterprise.bankingSolution.technicalDifferentiator",
    },
    {
      titleKey: "solutionsEnterprise.healthcareSolutionTitle",
      stackKey: "solutionsEnterprise.healthcareSolution.stack",
      roiKey: "solutionsEnterprise.healthcareSolution.businessImpact",
      implementationKey: "solutionsEnterprise.healthcareSolution.deployment",
      edgeKey: "solutionsEnterprise.healthcareSolution.technicalDifferentiator",
    },
    {
      titleKey: "solutionsEnterprise.energySolutionTitle",
      stackKey: "solutionsEnterprise.energySolution.stack",
      roiKey: "solutionsEnterprise.energySolution.businessImpact",
      implementationKey: "solutionsEnterprise.energySolution.deployment",
      edgeKey: "solutionsEnterprise.energySolution.technicalDifferentiator",
    },
  ];
  const workflowTransformationData = {
    icon: FiTool,
    titleKey: "solutionsEnterprise.workflow.title",
    subtitleKey: "solutionsEnterprise.workflow.subtitle",
    descriptionKey: "solutionsEnterprise.workflow.descriptionP1",
    benefitsPreambleKey: "solutionsEnterprise.workflow.descriptionP2",
    benefits: [
      "solutionsEnterprise.workflow.benefit1",
      "solutionsEnterprise.workflow.benefit2",
      "solutionsEnterprise.workflow.benefit3",
      "solutionsEnterprise.workflow.benefit4",
      "solutionsEnterprise.workflow.benefit5",
    ],
  };
  const geometricFeatureCardsData = [
    {
      icon: FiZap,
      titleKey: "solutionsPage.geometricFeatures.featureCard1Title",
      descKey: "solutionsPage.geometricFeatures.featureCard1Desc",
      defaultTitle: "Speed & Agility",
      defaultDesc: "Accelerated timelines for modernization projects.",
      bg: "bg-cyan-50",
    },
    {
      icon: FiShield,
      titleKey: "solutionsPage.geometricFeatures.featureCard2Title",
      descKey: "solutionsPage.geometricFeatures.featureCard2Desc",
      defaultTitle: "Enhanced Security",
      defaultDesc: "Robust protection for your critical data and systems.",
      bg: "bg-amber-50",
    },
    {
      icon: FiTrendingUp,
      titleKey: "solutionsPage.geometricFeatures.featureCard3Title",
      descKey: "solutionsPage.geometricFeatures.featureCard3Desc",
      defaultTitle: "Scalable Growth",
      defaultDesc: "Future-proof architecture that adapts to your needs.",
      bg: "bg-cyan-50",
    },
    {
      icon: FiLock,
      titleKey: "solutionsPage.geometricFeatures.featureCard4Title",
      descKey: "solutionsPage.geometricFeatures.featureCard4Desc",
      defaultTitle: "Data Integrity",
      defaultDesc: "Ensuring accuracy and consistency across systems.",
      bg: "bg-amber-50",
    },
  ];
  const geometricFeatureListItems = [
    {
      titleKey: "solutionsPage.geometricFeatures.featureList1Title",
      descKey: "solutionsPage.geometricFeatures.featureList1Desc",
      defaultTitle: "Precision Engineering",
      defaultDesc:
        "Algorithmic solutions tailored to your unique infrastructure and data landscape.",
    },
    {
      titleKey: "solutionsPage.geometricFeatures.featureList2Title",
      descKey: "solutionsPage.geometricFeatures.featureList2Desc",
      defaultTitle: "Optimized Pathways",
      defaultDesc:
        "AI identifies the most efficient routes for modernization and integration.",
    },
    {
      titleKey: "solutionsPage.geometricFeatures.featureList3Title",
      descKey: "solutionsPage.geometricFeatures.featureList3Desc",
      defaultTitle: "Risk Mitigation",
      defaultDesc:
        "Geometric modeling helps foresee and mitigate potential disruption points proactively.",
    },
  ];
  // --- End Data ---

  return (
    <div className={`${theme.background} py-0 overflow-x-hidden relative`}>
      {/* --- Hero Section --- */}
      <section className="relative mt-16 py-10 md:py-20 text-center">
        <div className="container mx-auto relative">
          <div className="max-w-3xl xl:max-w-4xl mx-auto">
            <motion.h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold ${theme.textPrimary} mb-6 leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="block">
                {t("solutionsPage.heroTitle1", "Modernize Your Legacy Systems")}
              </span>
              <span className={`block ${theme.textHighlight} mt-2`}>
                {t("solutionsPage.heroTitle2", "Without Disruption")}
              </span>
            </motion.h1>
            <motion.p
              className={`text-lg md:text-xl ${theme.textSecondary} max-w-2xl mx-auto mb-10`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              {t(
                "solutionsPage.heroSubtitle",
                "Transform outdated systems into agile, efficient operations with our AI-powered solutions, leveraging geometric intelligence for unparalleled precision and safety."
              )}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
              <Button
                to="/contact"
                variant="outline"
                size="lg"
                className={`border-2 ${theme.accentCyan} ${theme.accentCyan} px-8 py-3.5 font-bold hover:bg-cyan-500/10 hover:border-cyan-700 shadow-sm hover:shadow-md transition-all ${theme.focusRingDefault} ring-offset-2 ring-offset-[#FDFDFD]`}
              >
                {t("solutionsPage.ctaExperts", "Talk to Experts")}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <ProductDashboardSection />

      {/* --- Our Lab Section --- */}
      <SectionWrapper id="our-lab" bg={theme.surfaceMuted}>
        <SectionTitle
          t={t}
          titleKey="solutionsEnterprise.ourLabTitle"
          defaultTitle="Our Lab: Integrating the Future"
          subtitleKey="solutionsEnterprise.ourLabSubtitle"
          defaultSubtitle="Where Innovation Meets Integration"
        />
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={fadeInUp}
        >
          <p className={`${theme.textSecondary} text-lg leading-relaxed mb-6`}>
            {t("solutionsEnterprise.ourLabTextP1")}
          </p>
          <p className={`${theme.textSecondary} text-lg leading-relaxed mb-10`}>
            {t("solutionsEnterprise.ourLabTextP2")}
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: (
                  <FiGitMerge
                    className={`w-7 h-7 mb-2 ${theme.textHighlight}`}
                  />
                ),
                key: "solutionsEnterprise.ourLabFocus1",
                default: "Cross-Platform Agentic Workflows",
              },
              {
                icon: (
                  <FiCpu className={`w-7 h-7 mb-2 ${theme.textHighlight}`} />
                ),
                key: "solutionsEnterprise.ourLabFocus2",
                default: "Physics-Informed AI Validation",
              },
              {
                icon: (
                  <FiShield className={`w-7 h-7 mb-2 ${theme.textHighlight}`} />
                ),
                key: "solutionsEnterprise.ourLabFocus3",
                default: "Quantum-Resilient Security Architectures",
              },
            ].map((focus) => (
              <motion.div
                key={focus.key}
                variants={fadeInUp}
                className={`p-6 rounded-lg ${theme.surface} border ${theme.borderLight} ${theme.cardShadow}`}
              >
                {focus.icon}
                <h4 className={`font-semibold ${theme.textPrimary}`}>
                  {t(focus.key, focus.default)}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      {/* --- Strategic Benefits --- */}
      <SectionWrapper id="strategic-benefits" bg={theme.surfaceMuted}>
        <SectionTitle
          t={t}
          titleKey="solutionsEnterprise.strategicValueTitle"
          defaultTitle="Strategic Benefits"
          subtitleKey="solutionsEnterprise.strategicValueSubtitle"
          defaultSubtitle="Enhancing operational efficiency and business outcomes"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {strategicValuePoints.map((key) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className={`p-4 rounded-lg ${theme.surface} border ${theme.borderLight} flex flex-col`}
            >
              <FiCheckCircle
                className={`w-5 h-5 mb-2 ${theme.textSecondary}`}
              />
              <h4 className={`font-medium ${theme.textPrimary} text-base`}>
                {t(key)}
              </h4>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* --- Industry-Specific Battle Cards --- */}
      <SectionWrapper id="battle-cards" bg={theme.background}>
        <SectionTitle
          t={t}
          titleKey="solutionsEnterprise.battleCardsTitle"
          defaultTitle="Industry-Specific Accelerators"
          subtitleKey="solutionsEnterprise.battleCardsSubtitle"
          defaultSubtitle="Tailored Solutions, Proven ROI"
        />
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {industrySolutionsData.map((card) => (
            <IndustrySolutionCard
              key={card.titleKey}
              t={t}
              theme={theme}
              {...card}
            />
          ))}
        </div>
      </SectionWrapper>

      <section
        className={`relative py-20 md:py-24 px-6 md:px-8 ${theme.surfaceMuted} rounded-none sm:rounded-2xl ${theme.cardShadow} text-center overflow-hidden border ${theme.border}`}
      >
        <div
          className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3"
          aria-hidden="true"
        >
          <div
            className={`w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl opacity-70`}
          ></div>
        </div>
        <div
          className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3"
          aria-hidden="true"
        >
          <div
            className={`w-72 h-72 bg-amber-500/5 rounded-full blur-3xl opacity-70`}
          ></div>
        </div>

        <div className="relative z-10">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className={`text-4xl md:text-5xl font-extrabold ${theme.textPrimary} mb-5 max-w-3xl mx-auto leading-tight`}
          >
            {t("solutionsPage.finalCta.titleMain", "Ready to Modernize")}{" "}
            <span className={theme.textHighlight}>
              {t("solutionsPage.finalCta.titleAccent", "Without Disruption?")}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            transition={{ delay: 0.1 }}
            className={`text-lg ${theme.textSecondary} max-w-2xl mx-auto mb-12 leading-relaxed`}
          >
            {t(
              "solutionsPage.finalCta.subtitle",
              "Discover how our unique AI-driven approach delivers measurable results, guaranteed security, and a seamless transition. Request a personalized assessment today."
            )}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 md:gap-5"
          >
            <Button
              to="/contact"
              size="xl"
              variant="primary"
              icon={<FiArrowRight />}
            >
              {t("solutionsPage.finalCta.ctaDemo", "Request Personalized Demo")}
            </Button>
            <Button to="/contact" size="xl" variant="secondary">
              {t("solutionsPage.finalCta.ctaSales", "Talk to Sales")}
            </Button>
            <Button
              to="/case-studies"
              variant="text"
              size="lg"
              icon={<FiArrowRight />}
              className={`${theme.textSecondary} hover:${theme.focusRingDefault} hover:underline ${theme.buttonSecondaryBg} rounded-md`}
            >
              {t("solutionsPage.finalCta.ctaCases", "See Client Results")}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Prop types
Solutions.propTypes = {};
SectionWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  bg: PropTypes.string,
  id: PropTypes.string,
  noContainer: PropTypes.bool,
  bleedTop: PropTypes.bool,
  bleedBottom: PropTypes.bool,
};
SectionTitle.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string,
  subtitleKey: PropTypes.string,
  defaultTitle: PropTypes.string,
  defaultSubtitle: PropTypes.string,
  align: PropTypes.string,
  className: PropTypes.string,
};
BenefitListItem.propTypes = {
  children: PropTypes.node,
  t: PropTypes.func.isRequired,
  itemKey: PropTypes.string.isRequired,
};
ProductSection.propTypes = {
  product: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};
GeometricElement.propTypes = {
  shape: PropTypes.oneOf(["hexagon", "triangle", "square"]).isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  colorClass: PropTypes.string,
};
IndustrySolutionCard.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string,
  stackKey: PropTypes.string,
  roiKey: PropTypes.string,
  implementationKey: PropTypes.string,
  edgeKey: PropTypes.string,
};
