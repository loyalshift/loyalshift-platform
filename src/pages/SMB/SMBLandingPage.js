// src/pages/smb/LoyalShiftSMBLandingPage.js
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocalization } from "../../components/LocalizationContext";
import SMBHero from "./SMBHero";

// --- Icons (Placeholders - use actual icons) ---
const IconCheckCircle = () => (
  <svg
    className="w-6 h-6 text-cyan-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);
const IconWebsite = () => (
  <svg
    className={`w-10 h-10 text-cyan-600`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);
const IconStudio = () => (
  <svg
    className={`w-10 h-10 text-cyan-600`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a15.995 15.995 0 00-4.764 4.648l-3.876 5.814a1.151 1.151 0 001.597 1.597l5.814-3.875a15.996 15.996 0 004.649-4.763m-3.42-3.42a15.994 15.994 0 01-1.622 3.395"
    ></path>
  </svg>
);
const IconSupport = () => (
  <svg
    className={`w-10 h-10 text-cyan-600`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
    ></path>
  </svg>
);
const IconTools = () => (
  <svg
    className={`w-10 h-10 text-cyan-600`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774a1.125 1.125 0 01.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738a1.125 1.125 0 01-.12 1.45l-.773.773a1.125 1.125 0 01-1.45-.12l-.737-.527c-.35-.25-.806-.272-1.204-.108-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11-.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.855-.142-1.205.108l-.737.527a1.125 1.125 0 01-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.272.806.108-1.204-.165-.397-.505-.71-.93-.78l-.893-.15c-.543-.09-.94-.56-.94-1.11v-1.093c0-.55.397-1.02.94-1.11l.893-.149c.425-.07.765-.383.93-.78.165-.398.143.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.806.272 1.204.108.397.165.71.505.78.93l.15.894z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    ></path>
  </svg>
);
// --- END OF PLACEHOLDER ICONS ---

// Component to demonstrate using theme properties for cards
const FeatureCard = ({ t, titleKey, textKey, icon, theme }) => (
  <motion.div
    // Uses theme.surfaceCard and theme.borderLight
    className={`p-6 rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 ease-out bg-white dark:bg-slate-800 border border-[#d4d2cb]/50 dark:border-slate-700`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    {/* Icon color uses theme.accentCyan */}
    <div className={`mb-4 ${theme?.accentCyan || "text-cyan-600"}`}>{icon}</div>
    {/* Title uses theme.textPrimary, Text uses theme.textSecondary */}
    <h3 className={`text-xl font-semibold mb-2 text-[#3a3935] dark:text-white`}>
      {t(titleKey)}
    </h3>
    <p className={`text-sm text-[#5c5c5c] dark:text-slate-300`}>{t(textKey)}</p>
  </motion.div>
);

const ProcessStep = ({ t, number, titleKey, textKey, theme }) => (
  <motion.div
    className="flex items-start space-x-4"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    {/* Number circle uses theme.accentCyanBg (conceptually) and theme.accentCyan */}
    <div
      className={`flex-shrink-0 w-12 h-12 rounded-full bg-cyan-400/20 dark:bg-cyan-400/30 ${
        theme?.accentCyan || "text-cyan-600"
      } dark:text-cyan-300 flex items-center justify-center font-bold text-xl`}
    >
      {number}
    </div>
    <div>
      {/* Title uses theme.textPrimary, Text uses theme.textSecondary */}
      <h4
        className={`text-lg font-semibold mb-1 text-[#3a3935] dark:text-white`}
      >
        {t(titleKey)}
      </h4>
      <p className={`text-sm text-[#5c5c5c] dark:text-slate-300`}>
        {t(textKey)}
      </p>
    </div>
  </motion.div>
);

// --- Loading Placeholder for Hero ---
const HeroPlaceholder = () => (
  <div className="relative h-screen min-h-[750px] md:min-h-[800px] flex items-center justify-center bg-slate-900">
    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

export default function SMBLandingPage() {
  const { t } = useLocalization();

  // Simulate having defaultPymeTheme available
  // In a real app, this would be imported or from context
  const theme = {
    background: "bg-[#FAF9F6]",
    textPrimary: "text-[#3a3935]",
    textSecondary: "text-[#5c5c5c]",
    accentCyanBg: "bg-cyan-400",
    accentCyanBgHover: "hover:bg-cyan-500",
    buttonTextLight: "text-white",
    buttonTextDark: "text-[#272624]", // For contrast on accentCyanBg
    surface: "bg-white",
    surfaceCard: "bg-white",
    borderLight: "border-[#d4d2cb]/50",
    accentCyan: "text-cyan-600",
    resultsSectionBg: "bg-slate-50",
    // ... add other relevant theme properties if needed by this page directly
  };

  // Animation variants
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemFadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const offerings = [
    {
      icon: <IconWebsite />,
      titleKey: "smbLandingPage.offeringWebsiteTitle",
      textKey: "smbLandingPage.offeringWebsiteText",
    },
    {
      icon: <IconStudio />,
      titleKey: "smbLandingPage.offeringStudioTitle",
      textKey: "smbLandingPage.offeringStudioText",
    },
    {
      icon: <IconTools />,
      titleKey: "smbLandingPage.offeringToolsTitle",
      textKey: "smbLandingPage.offeringToolsText",
    },
    {
      icon: <IconSupport />,
      titleKey: "smbLandingPage.offeringSupportTitle",
      textKey: "smbLandingPage.offeringSupportText",
    },
  ];

  const processSteps = [
    {
      number: "1",
      titleKey: "smbLandingPage.processStep1Title",
      textKey: "smbLandingPage.processStep1Text",
    },
    {
      number: "2",
      titleKey: "smbLandingPage.processStep2Title",
      textKey: "smbLandingPage.processStep2Text",
    },
    {
      number: "3",
      titleKey: "smbLandingPage.processStep3Title",
      textKey: "smbLandingPage.processStep3Text",
    },
    {
      number: "4",
      titleKey: "smbLandingPage.processStep4Title",
      textKey: "smbLandingPage.processStep4Text",
    },
  ];

  return (
    <div className={`${theme.background} dark:bg-slate-900`}>
      <Suspense fallback={<HeroPlaceholder />}>
        <SMBHero />
      </Suspense>

      {/* Offerings Section */}
      <section
        className={`py-16 md:py-24 ${theme.resultsSectionBg} dark:bg-slate-800/50`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className={`text-3xl font-bold ${theme.textPrimary} dark:text-white sm:text-4xl`}
            >
              {t("smbLandingPage.offeringsTitle")}
            </h2>
          </div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {offerings.map((offering, index) => (
              <FeatureCard key={index} {...offering} t={t} theme={theme} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className={`py-16 md:py-24 ${theme.background} dark:bg-slate-900`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className={`text-3xl font-bold ${theme.textPrimary} dark:text-white sm:text-4xl`}
            >
              {t("smbLandingPage.processTitle")}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto grid gap-10 md:gap-12">
            {processSteps.map((step, index) => (
              <ProcessStep key={index} {...step} t={t} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-500 to-cyan-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className={`text-3xl font-bold text-white sm:text-4xl mb-6`}
            variants={itemFadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t("smbLandingPage.finalCtaTitle")}
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-white/90 mb-10"
            variants={itemFadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("smbLandingPage.finalCtaText")}
          </motion.p>
          <motion.div
            variants={itemFadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/contact" // Adjust as needed
              className={`inline-flex items-center justify-center px-10 py-4 text-lg font-semibold leading-7 bg-white hover:bg-slate-100 text-cyan-600 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-cyan-600 transition-all duration-300 transform hover:scale-105`}
            >
              {t("smbLandingPage.finalCtaButton")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
