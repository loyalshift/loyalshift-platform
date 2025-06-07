// src/pages/Solutions/CipherForgePage.js (example path)
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLock,
  FiShield,
  FiCpu,
  FiUsers,
  FiZap,
  FiTrendingUp,
  FiKey,
  FiShare2,
  FiDatabase,
  FiGitCollaborate,
  FiChevronDown,
  FiArrowRight,
} from "react-icons/fi";

import { useLocalization } from "../../components/LocalizationContext"; // Adjust path

import Button from "../../components/Button"; // Adjust path
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] },
  },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

// --- Reusable Components ---
const SectionWrapper = ({
  children,
  className = "",
  bg = theme.background,
  id,
}) => (
  <motion.section
    id={id}
    className={`py-16 md:py-24 ${bg} ${className} relative overflow-hidden`} // Added overflow-hidden for decorative elements
    initial="hidden"
    whileInView="visible"
    viewport={viewportSettings}
    variants={staggerContainer}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {children}
    </div>
  </motion.section>
);

const PageTitle = ({
  t,
  titleKey,
  subtitleKey,
  defaultTitle = "",
  defaultSubtitle = "",
}) => (
  <motion.div className="mb-12 md:mb-16 text-center" variants={fadeInUp}>
    <h1
      className={`text-4xl sm:text-5xl md:text-6xl font-extrabold ${theme.textPrimary} mb-5 leading-tight`}
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

const SectionTitle = ({
  t,
  titleKey,
  defaultTitle = "",
  className = "",
  align = "text-center",
}) => (
  <motion.h2
    variants={fadeInUp}
    className={`text-3xl md:text-4xl font-bold ${theme.textPrimary} mb-10 md:mb-12 ${align} ${className}`}
  >
    {t(titleKey, defaultTitle)}
  </motion.h2>
);

const BenefitCard = ({
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
      className={`${theme.surfaceCard} p-6 rounded-xl border ${theme.borderLight} ${theme.cardShadow} ${theme.cardHoverShadow} transition-shadow hover:border-cyan-500/30`}
    >
      <div
        className={`inline-flex items-center justify-center p-3 rounded-full ${theme.accentCyanBg}/10 mb-4`}
      >
        <IconComponent className={`w-7 h-7 ${theme.textHighlight}`} />
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

const UseCaseCard = ({
  t,
  titleKey,
  problemKey,
  solutionKey,
  outcomeKey,
  industryKey,
  isOpen,
  onToggle,
}) => (
  <div
    className={`${theme.surfaceCard} rounded-lg border ${theme.border} shadow-sm mb-4 overflow-hidden`}
  >
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className={`w-full flex justify-between items-center p-4 sm:p-5 text-left ${theme.surfaceMuted} hover:bg-slate-100 focus:outline-none ${theme.focusRingDefault}`}
    >
      <span className={`font-semibold ${theme.textPrimary}`}>
        {t(titleKey)}{" "}
        <span
          className={`text-xs font-normal px-2 py-0.5 rounded-full ${theme.accentCyanBg}/20 ${theme.accentCyan}`}
        >
          {t(industryKey)}
        </span>
      </span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
        <FiChevronDown className={`w-5 h-5 ${theme.textSecondary}`} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`border-t ${theme.borderLight}`}
        >
          <div className="p-4 sm:p-5 text-sm space-y-2">
            <p>
              <strong className={theme.textPrimary}>Problem:</strong>{" "}
              <span className={theme.textSecondary}>{t(problemKey)}</span>
            </p>
            <p>
              <strong className={theme.textPrimary}>
                CipherForge™ Solution:
              </strong>{" "}
              <span className={theme.textSecondary}>{t(solutionKey)}</span>
            </p>
            <p>
              <strong className={`${theme.textPrimary} ${theme.successText}`}>
                Outcome:
              </strong>{" "}
              <span className={`${theme.textSecondary} ${theme.successText}`}>
                {t(outcomeKey)}
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Simplified Header for this specific solution page
const SolutionPageHeader = ({ t }) => (
  <header
    className={`${theme.surface} py-3 border-b ${theme.borderLight} shadow-sm sticky top-0 z-40`}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <Link
        to="/solutions"
        className={`text-sm font-medium ${theme.textSecondary} hover:${theme.textHighlight} flex items-center`}
      >
        <FiArrowLeft className="w-4 h-4 mr-1.5" />{" "}
        {t("solutionsCipherForge.backToSolutions", "All Solutions")}
      </Link>
      <div className="flex items-center">
        <FiLock className={`w-6 h-6 mr-2 ${theme.textHighlight}`} />
        <h1 className={`text-lg font-semibold ${theme.textPrimary}`}>
          {t("solutionsCipherForge.pageHeaderTitle", "CipherForge™ Solution")}
        </h1>
      </div>
    </div>
  </header>
);
// Simplified Footer
const SolutionPageFooter = ({ t }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className={`${theme.surfaceMuted} py-10 text-center border-t ${theme.borderLight} mt-12`}
    >
      <p className={`${theme.textMuted} text-xs`}>
        {t(
          "solutionsPage.finalCta.copyright",
          `© ${currentYear} LoyalShift. All rights reserved.`
        )}
      </p>
    </footer>
  );
};

export default function CipherForgePage() {
  const { t } = useLocalization();
  const [openUseCase, setOpenUseCase] = useState(null);

  const handleToggleUseCase = (index) => {
    setOpenUseCase(openUseCase === index ? null : index);
  };

  const corePrinciples = [
    {
      icon: FiLock,
      titleKey: "solutionsCipherForge.principleFheTitle",
      descriptionKey: "solutionsCipherForge.principleFheDesc",
    },
    {
      icon: FiUsers,
      titleKey: "solutionsCipherForge.principleMpcTitle",
      descriptionKey: "solutionsCipherForge.principleMpcDesc",
    },
    {
      icon: FiShield,
      titleKey: "solutionsCipherForge.principleTeeTitle",
      descriptionKey: "solutionsCipherForge.principleTeeDesc",
    },
    {
      icon: FiZap,
      titleKey: "solutionsCipherForge.principleQrcTitle",
      descriptionKey: "solutionsCipherForge.principleQrcDesc",
    },
  ];

  const benefits = [
    {
      icon: FiShield,
      titleKey: "solutionsCipherForge.benefit1Title",
      descriptionKey: "solutionsCipherForge.benefit1Desc",
    },
    {
      icon: FiGitCollaborate,
      titleKey: "solutionsCipherForge.benefit2Title",
      descriptionKey: "solutionsCipherForge.benefit2Desc",
    },
    {
      icon: FiCheckSquare,
      titleKey: "solutionsCipherForge.benefit3Title",
      descriptionKey: "solutionsCipherForge.benefit3Desc",
    },
    {
      icon: FiTrendingUp,
      titleKey: "solutionsCipherForge.benefit4Title",
      descriptionKey: "solutionsCipherForge.benefit4Desc",
    },
    {
      icon: FiAward,
      titleKey: "solutionsCipherForge.benefit5Title",
      descriptionKey: "solutionsCipherForge.benefit5Desc",
    },
    {
      icon: FiDollarSign,
      titleKey: "solutionsCipherForge.benefit6Title",
      descriptionKey: "solutionsCipherForge.benefit6Desc",
    },
  ];

  const useCases = [
    {
      industryKey: "solutionsCipherForge.industryGovernment",
      titleKey: "solutionsCipherForge.useCaseGovTitle",
      problemKey: "solutionsCipherForge.useCaseGovProblem",
      solutionKey: "solutionsCipherForge.useCaseGovSolution",
      outcomeKey: "solutionsCipherForge.useCaseGovOutcome",
    },
    // Add more use cases here, e.g., Finance-Fraud, Healthcare-Research
    // { industryKey: "solutionsCipherForge.industryFinance", titleKey: "solutionsCipherForge.useCaseFinTitle", problemKey: "solutionsCipherForge.useCaseFinProblem", solutionKey: "solutionsCipherForge.useCaseFinSolution", outcomeKey: "solutionsCipherForge.useCaseFinOutcome"},
    // { industryKey: "solutionsCipherForge.industryHealthcare", titleKey: "solutionsCipherForge.useCaseHcTitle", problemKey: "solutionsCipherForge.useCaseHcProblem", solutionKey: "solutionsCipherForge.useCaseHcSolution", outcomeKey: "solutionsCipherForge.useCaseHcOutcome"},
  ];

  const whyLoyalShiftItems = [
    {
      icon: FiCpu,
      titleKey: "solutionsCipherForge.whyItemExpertise",
      descriptionKey: "solutionsCipherForge.whyItemExpertiseDesc",
    },
    {
      icon: FiLayers,
      titleKey: "solutionsCipherForge.whyItemEnterpriseGrade",
      descriptionKey: "solutionsCipherForge.whyItemEnterpriseGradeDesc",
    },
    {
      icon: FiShare2,
      titleKey: "solutionsCipherForge.whyItemEcosystem",
      descriptionKey: "solutionsCipherForge.whyItemEcosystemDesc",
    },
    {
      icon: FiEye,
      titleKey: "solutionsCipherForge.whyItemVisionary",
      descriptionKey: "solutionsCipherForge.whyItemVisionaryDesc",
    },
  ];

  return (
    <div className={`${theme.background} antialiased`}>
      <SolutionPageHeader t={t} />
      <main>
        {/* Hero Section */}
        <SectionWrapper
          bg={`${theme.surfaceMuted}`}
          className="pt-16 md:pt-20 text-center"
          id="cipherforge-hero"
        >
          <div className="absolute inset-0 z-0 opacity-10">
            {" "}
            {/* Subtle geometric background */}
            <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
              <GeometricElement
                shape="hexagon"
                size={400}
                className="text-cyan-500/50"
              />
            </div>
            <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
              <GeometricElement
                shape="triangle"
                size={300}
                className="text-blue-500/50 rotate-12"
              />
            </div>
          </div>
          <PageTitle
            t={t}
            titleKey="solutionsCipherForge.heroTitle"
            subtitleKey="solutionsCipherForge.heroSubtitle"
          />
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          >
            <Button
              to="/contact?subject=CipherForgeConsultation"
              size="lg"
              className={`${theme.amberAccentBg} ${theme.darkTextForAmber} px-8 py-3 font-semibold hover:${theme.amberAccentBgHover} ${theme.cardShadow} hover:${theme.cardHoverShadow} transform hover:scale-105`}
            >
              {t("solutionsCipherForge.heroCtaConsultation")}
            </Button>
            <Button
              to="/resources/cipherforge-whitepaper"
              variant="outline"
              size="lg"
              className={`border-2 ${theme.accentCyan} ${theme.accentCyan} px-8 py-3 font-semibold hover:bg-cyan-400/10 hover:border-cyan-600 shadow-sm`}
            >
              {t("solutionsCipherForge.heroCtaWhitepaper")}
            </Button>
          </motion.div>
        </SectionWrapper>

        {/* The Challenge Section */}
        <SectionWrapper id="challenge">
          <SectionTitle
            t={t}
            titleKey="solutionsCipherForge.challengeTitle"
            align="text-left"
            className="max-w-3xl"
          />
          <motion.div
            variants={fadeInUp}
            className={`max-w-3xl space-y-4 text-lg ${theme.textSecondary} leading-relaxed`}
          >
            <p>{t("solutionsCipherForge.challengeP1")}</p>
            <p>{t("solutionsCipherForge.challengeP2")}</p>
            <p className={`font-semibold ${theme.textPrimary}`}>
              {t("solutionsCipherForge.challengeP3")}
            </p>
          </motion.div>
        </SectionWrapper>

        {/* Introducing CipherForge Section */}
        <SectionWrapper id="intro-cipherforge" bg={theme.surfaceMuted}>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div variants={fadeInUp}>
              <SectionTitle
                t={t}
                titleKey="solutionsCipherForge.introTitle"
                align="text-left"
              />
              <p
                className={`${theme.textSecondary} text-lg leading-relaxed mb-6`}
              >
                {t("solutionsCipherForge.introText")}
              </p>
              <div
                className={`p-4 border-l-4 ${theme.border} ${theme.accentCyan}/10 rounded-r-md`}
              >
                <p className={`italic ${theme.textPrimary} mb-1`}>
                  {t("solutionsCipherForge.missionText")}
                </p>
                <p className={`italic text-sm ${theme.textMuted}`}>
                  {t("solutionsCipherForge.visionText")}
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex justify-center">
              {/* Placeholder for a conceptual graphic of CipherForge */}
              <FiShield
                className={`w-48 h-48 opacity-10 ${theme.textHighlight}`}
              />
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Core Principles & Technologies Section */}
        <SectionWrapper id="core-principles">
          <SectionTitle
            t={t}
            titleKey="solutionsCipherForge.corePrinciplesTitle"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePrinciples.map((principle) => (
              <DetailCard key={principle.titleKey} t={t} {...principle} />
            ))}
          </div>
        </SectionWrapper>

        {/* Transformative Benefits Section */}
        <SectionWrapper id="benefits" bg={theme.surfaceMuted}>
          <SectionTitle t={t} titleKey="solutionsCipherForge.benefitsTitle" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.titleKey} t={t} {...benefit} />
            ))}
          </div>
        </SectionWrapper>

        {/* Industry Applications & Use Cases Section */}
        <SectionWrapper id="applications">
          <SectionTitle
            t={t}
            titleKey="solutionsCipherForge.applicationsTitle"
          />
          <div className="max-w-3xl mx-auto">
            {useCases.map((uc, index) => (
              <UseCaseCard
                key={uc.titleKey}
                t={t}
                {...uc}
                isOpen={openUseCase === index}
                onToggle={() => handleToggleUseCase(index)}
              />
            ))}
          </div>
        </SectionWrapper>

        {/* Why LoyalShift's CipherForge Section */}
        <SectionWrapper id="why-loyalshift" bg={theme.surfaceMuted}>
          <SectionTitle
            t={t}
            titleKey="solutionsCipherForge.whyCipherForgeTitle"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyLoyalShiftItems.map((item) => (
              <DetailCard key={item.titleKey} t={t} {...item} />
            ))}
          </div>
        </SectionWrapper>

        {/* Final CTA Section */}
        <SectionWrapper id="cipherforge-cta" className="text-center">
          <motion.h2
            variants={fadeInUp}
            className={`text-3xl font-bold ${theme.textPrimary} mb-4`}
          >
            {t("solutionsCipherForge.finalCtaTitle")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className={`text-lg ${theme.textSecondary} max-w-2xl mx-auto mb-8`}
          >
            {t("solutionsCipherForge.finalCtaSubtitle")}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              to="/contact?subject=CipherForgeBriefing"
              size="lg"
              className={`${theme.amberAccentBg} ${theme.darkTextForAmber} px-8 py-3 font-semibold hover:${theme.amberAccentBgHover} ${theme.cardShadow} hover:${theme.cardHoverShadow} transform hover:scale-105`}
            >
              {t("solutionsCipherForge.finalCtaButtonPrimary")}{" "}
              <FiArrowRight className="ml-2" />
            </Button>
            <Button
              to="/resources/cipherforge-docs"
              variant="outline"
              size="lg"
              className={`border-2 ${theme.accentCyan} ${theme.accentCyan} px-8 py-3 font-semibold hover:bg-cyan-400/10 hover:border-cyan-600 shadow-sm`}
            >
              {t("solutionsCipherForge.finalCtaButtonSecondary")}
            </Button>
          </motion.div>
        </SectionWrapper>
      </main>
      <SolutionPageFooter t={t} />
    </div>
  );
}
