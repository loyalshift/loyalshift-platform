// src/pages/smb/SMBPlatformFeaturesPage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocalization } from "../../components/LocalizationContext";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// --- Placeholder Icons (replace with actual icons) ---
const IconEdit = () => (
  <svg
    className="w-8 h-8 mb-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    ></path>
  </svg>
);
const IconBlog = () => (
  <svg
    className="w-8 h-8 mb-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 6.253v11.494m0 0a2.373 2.373 0 01-2.25-2.25H9.75A2.25 2.25 0 017.5 15.5V6.253m4.5 11.494a2.373 2.373 0 002.25-2.25h.003A2.25 2.25 0 0016.5 15.5V6.253m-4.5 11.494V6.253"
    ></path>
  </svg>
); // Simplified book/blog
const IconLeads = () => (
  <svg
    className="w-8 h-8 mb-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M12 15a3 3 0 100-6 3 3 0 000 6z"
    ></path>
  </svg>
);
const IconAnalytics = () => (
  <svg
    className="w-8 h-8 mb-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
    ></path>
  </svg>
);
const IconAssets = () => (
  <svg
    className="w-8 h-8 mb-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
    ></path>
  </svg>
);
const IconSEO = () => (
  <svg
    className="w-8 h-8 mb-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
    />
  </svg>
);
const IconCheck = () => (
  <svg
    className="w-5 h-5 mr-2 flex-shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);
// --- END OF ICONS ---

const FeatureDetailCard = ({
  t,
  titleKey,
  textKey,
  benefitKey,
  icon,
  defaultPymeTheme,
}) => (
  <motion.div
    // Using defaultPymeTheme.surfaceCard, defaultPymeTheme.border, defaultPymeTheme.textPrimary, defaultPymeTheme.textSecondary
    className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-white dark:bg-slate-800 border border-[#d4d2cb]/80 dark:border-slate-700`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {/* Icon uses defaultPymeTheme.accentCyan */}
    <div className={`text-cyan-600 dark:text-cyan-400`}>{icon}</div>
    <h3
      className={`text-xl font-semibold mt-1 mb-2 text-[#3a3935] dark:text-white`}
    >
      {t(titleKey)}
    </h3>
    <p className={`text-sm text-[#5c5c5c] dark:text-slate-300 mb-3 flex-grow`}>
      {t(textKey)}
    </p>
    <p
      className={`text-xs font-semibold ${
        defaultPymeTheme?.textHighlight || "text-cyan-500"
      } dark:text-cyan-400 pt-2 border-t border-[#d4d2cb]/50 dark:border-slate-700`}
    >
      {t(benefitKey)}
    </p>
  </motion.div>
);

export default function SMBPlatformFeaturesPage() {
  const { t } = useLocalization();

  const features = [
    {
      icon: <IconEdit />,
      titleKey: "smbPlatformFeatures.featureWebsiteMgmtTitle",
      textKey: "smbPlatformFeatures.featureWebsiteMgmtText",
      benefitKey: "smbPlatformFeatures.featureWebsiteMgmtBenefit",
    },
    {
      icon: <IconBlog />,
      titleKey: "smbPlatformFeatures.featureBlogTitle",
      textKey: "smbPlatformFeatures.featureBlogText",
      benefitKey: "smbPlatformFeatures.featureBlogBenefit",
    },
    {
      icon: <IconLeads />,
      titleKey: "smbPlatformFeatures.featureLeadsTitle",
      textKey: "smbPlatformFeatures.featureLeadsText",
      benefitKey: "smbPlatformFeatures.featureLeadsBenefit",
    },
    {
      icon: <IconAnalytics />,
      titleKey: "smbPlatformFeatures.featureAnalyticsTitle",
      textKey: "smbPlatformFeatures.featureAnalyticsText",
      benefitKey: "smbPlatformFeatures.featureAnalyticsBenefit",
    },
    {
      icon: <IconAssets />,
      titleKey: "smbPlatformFeatures.featureAssetsTitle",
      textKey: "smbPlatformFeatures.featureAssetsText",
      benefitKey: "smbPlatformFeatures.featureAssetsBenefit",
    },
    {
      icon: <IconSEO />,
      titleKey: "smbPlatformFeatures.featureSeoToolsTitle",
      textKey: "smbPlatformFeatures.featureSeoToolsText",
      benefitKey: "smbPlatformFeatures.featureSeoToolsBenefit",
    },
  ];

  const summaryBenefits = [
    "smbPlatformFeatures.benefitItemTime",
    "smbPlatformFeatures.benefitItemAffordable",
    "smbPlatformFeatures.benefitItemGrowth",
    "smbPlatformFeatures.benefitItemEasy",
    "smbPlatformFeatures.benefitItemLocal",
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className={`${theme.background} dark:bg-slate-900 min-h-screen`}>
      {/* Optional: <Helmet><title>{t("smbPlatformFeatures.pageTitle")}</title></Helmet> */}

      {/* Hero Section */}
      <motion.section
        className={`py-16 md:py-24 text-center px-4 sm:px-6 lg:px-8 ${theme.surfaceMuted} dark:bg-slate-800/30`}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h1
          variants={itemVariants}
          className={`text-4xl font-bold ${theme.textPrimary} dark:text-white sm:text-5xl mb-4`}
        >
          {t("smbPlatformFeatures.heroTitle")}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className={`max-w-2xl mx-auto text-lg ${theme.textSecondary} dark:text-slate-300 mb-8`}
        >
          {t("smbPlatformFeatures.heroSubtitle")}
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            to="#features-list" // Link to features section on the same page
            className={`inline-flex items-center justify-center px-8 py-3 text-base font-semibold ${theme.accentCyanBg} ${theme.buttonTextDark} ${theme.accentCyanBgHover} dark:${theme.buttonTextLight} rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
          >
            {t("smbPlatformFeatures.heroCtaButton")}
          </Link>
        </motion.div>
      </motion.section>

      {/* Intro Section */}
      <section
        className={`py-12 md:py-16 ${theme.background} dark:bg-slate-900`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`text-3xl font-semibold ${theme.textPrimary} dark:text-white mb-4`}
          >
            {t("smbPlatformFeatures.introTitle")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${theme.textSecondary} dark:text-slate-300 mb-3`}
          >
            {t("smbPlatformFeatures.introTextP1")}
          </motion.p>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${theme.textSecondary} dark:text-slate-300`}
          >
            {t("smbPlatformFeatures.introTextP2")}
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features-list"
        className={`py-16 md:py-24 ${theme.surfaceMuted} dark:bg-slate-800/50`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className={`text-3xl font-bold ${theme.textPrimary} dark:text-white sm:text-4xl`}
            >
              {t("smbPlatformFeatures.featuresMainTitle")}
            </h2>
            <div
              className={`w-20 h-1 ${theme.accentCyanBg} mx-auto mt-4 rounded-full`}
            ></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureDetailCard
                key={index}
                {...feature}
                t={t}
                defaultPymeTheme={theme}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Summary Section */}
      <section
        className={`py-16 md:py-24 ${theme.background} dark:bg-slate-900`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className={`text-3xl font-bold ${theme.textPrimary} dark:text-white sm:text-4xl`}
            >
              {t("smbPlatformFeatures.benefitsSummaryTitle")}
            </h2>
          </div>
          <ul className="space-y-4">
            {summaryBenefits.map((benefitKey) => (
              <motion.li
                key={benefitKey}
                className={`flex items-center p-4 rounded-md ${theme.surface} dark:bg-slate-800 shadow`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <IconCheck />{" "}
                {/* Using defaultPymeTheme.accentCyan via Icon itself */}
                <span className={`${theme.textSecondary} dark:text-slate-300`}>
                  {t(benefitKey)}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className={`py-16 md:py-24 text-center ${theme.surfaceMuted} dark:bg-slate-800/30`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`text-3xl font-bold ${theme.textPrimary} dark:text-white sm:text-4xl mb-4`}
          >
            {t("smbPlatformFeatures.finalCtaTitle")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`max-w-xl mx-auto ${theme.textSecondary} dark:text-slate-300 mb-8`}
          >
            {t("smbPlatformFeatures.finalCtaText")}
          </motion.p>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/contact" // Or to a specific sign-up/demo page for SMBs
              className={`inline-flex items-center justify-center px-10 py-3.5 text-base font-semibold ${theme.accentCyanBg} ${theme.buttonTextDark} ${theme.accentCyanBgHover} dark:${theme.buttonTextLight} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              {t("smbPlatformFeatures.finalCtaButton")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
