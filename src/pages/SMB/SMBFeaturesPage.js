// src/pages/SMBFeaturesPage.js
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useLocalization } from "../../components/LocalizationContext";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// Animation variants
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Icons (themed) ---
const IconChevronRight = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    />
  </svg>
);

// The IconCheck from your SMBPlatformFeaturesPage example
const IconCheck = ({ className = "" }) => (
    <svg
      className={`w-5 h-5 mr-2 flex-shrink-0 ${className}`} // Added className prop
      fill="currentColor" // Ensure fill is currentColor if theme handles color
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

// Simplified Feature Card for the grid
const FeatureCard = ({
  titleKey,
  defaultTitle,
  descriptionKey,
  defaultDescription,
  icon, // Pass the actual icon component
  t,
}) => {
  const IconComponent = icon; // Rename prop for clarity if needed

  return (
    <motion.div
      className={`p-6 rounded-xl ${theme.surfaceCard} shadow-lg border ${theme.borderLight} flex flex-col text-center items-center h-full`}
      variants={itemVariants}
      whileHover={{
        y: -5,
        boxShadow: theme.cardHoverShadow.replace('hover:', ''),
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {IconComponent && (
        <div className={`p-3 rounded-full ${theme.accentCyanBg}/10 mb-4`}>
          <IconComponent className={`w-8 h-8 ${theme.textHighlight}`} />
        </div>
      )}
      <h3 className={`text-xl font-bold ${theme.textPrimary} mb-2`}>
        {t(titleKey, defaultTitle)}
      </h3>
      <p className={`${theme.textSecondary} text-sm leading-relaxed flex-grow`}>
        {t(descriptionKey, defaultDescription)}
      </p>
    </motion.div>
  );
};

export default function SMBFeaturesPage() {
  const { t } = useLocalization();

  // Flattened features data for the grid
  const features = [
    {
      icon: () => ( // Example: Using a function to return JSX, or pass imported icon component
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V9a2 2 0 00-2-2m-5 0V3m0 4v2m0-2h2m-2 2h-2m2-2v2m0 0V7m0 2H9m2 0h2M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      titleKey: "smbFeatures.featureBlogEditor.title",
      defaultTitle: "Advanced Blog Editor",
      descriptionKey: "smbFeatures.featureBlogEditor.description",
      defaultDescription:
        "Create stunning, engaging blog posts with our intuitive rich text editor, featuring multimedia embedding, custom formatting, and AI-powered writing assistance.",
    },
    {
      icon: () => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
           <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      ),
      titleKey: "smbFeatures.featureCentralLibrary.title",
      defaultTitle: "Centralized Digital Asset Library",
      descriptionKey: "smbFeatures.featureCentralLibrary.description",
      defaultDescription:
        "Store, organize, and manage all your brand images, videos, documents, and AI-generated assets in one secure, easily searchable location.",
    },
    {
      icon: () => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
        </svg>
      ),
      titleKey: "smbFeatures.featureUnifiedDashboard.title",
      defaultTitle: "Unified Analytics Dashboard",
      descriptionKey: "smbFeatures.featureUnifiedDashboard.description",
      defaultDescription:
        "Track key performance indicators from your website, blog, social media, and sales channels all in one customizable dashboard.",
    },
    { // Adding the other features based on your original data
        icon: () => ( // Placeholder for SEO Tools icon
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
            </svg>
        ),
        titleKey: "smbFeatures.featureSeoTools.title",
        defaultTitle: "Built-in SEO Toolkit",
        descriptionKey: "smbFeatures.featureSeoTools.description",
        defaultDescription:
          "Optimize your content for search engines directly within the editor. Get real-time feedback.",
      },
      {
        icon: () => ( // Placeholder for Content Scheduling icon
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        titleKey: "smbFeatures.featureScheduling.title",
        defaultTitle: "Content Scheduling & Calendar",
        descriptionKey: "smbFeatures.featureScheduling.description",
        defaultDescription:
          "Plan your content strategy with our visual calendar. Schedule posts for optimal timing.",
      },
      {
        icon: () => ( // Placeholder for AI Video Gen icon
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
          </svg>
        ),
        titleKey: "smbFeatures.featureVeoVideoGen.title",
        defaultTitle: "AI Video Generation (Veo Integration)",
        descriptionKey: "smbFeatures.featureVeoVideoGen.description",
        defaultDescription:
          "Create stunning, professional-quality videos from text prompts using Google's Veo technology.",
      },
      {
        icon: () => ( // Placeholder for Instagram Insights icon
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <rect width="15" height="15" x="4.5" y="4.5" rx="3.75" />
            <circle cx="12" cy="12" r="2.25" />
            <circle cx="16.125" cy="7.875" r=".375" fill="currentColor" />
          </svg>
        ),
        titleKey: "smbFeatures.featureInstagramInsights.title",
        defaultTitle: "Deep Instagram Insights",
        descriptionKey: "smbFeatures.featureInstagramInsights.description",
        defaultDescription:
          "Understand your Instagram audience, content performance, and profile engagement.",
      },
  ];

  const summaryBenefits = [
    "smbPlatformFeatures.benefitItemTime", // Reusing keys from SMBPlatformFeaturesPage for brevity
    "smbPlatformFeatures.benefitItemAffordable",
    "smbPlatformFeatures.benefitItemGrowth",
    "smbPlatformFeatures.benefitItemEasy",
    "smbPlatformFeatures.benefitItemLocal",
  ];


  const buttonBase = `inline-flex items-center justify-center font-bold rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl text-base sm:text-lg`;

  return (
    <div
      className={`${theme.background} ${theme.textPrimary} min-h-screen overflow-x-hidden`}
    >
      {/* Header Section */}
      <section
        className={`relative py-20 sm:py-28 ${theme.surfaceMuted}`}
      >
        <div className="absolute inset-0 overflow-hidden opacity-80">
          <motion.div
            className="absolute -top-1/2 -left-1/4 w-[200%] h-[200%] bg-gradient-to-r from-cyan-400/10 via-blue-500/5 to-transparent"
            animate={{ x: ["-25%", "0%", "-25%"], y: ["-25%", "0%", "-25%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`text-4xl sm:text-5xl md:text-6xl font-bold ${theme.textPrimary} mb-6`}
          >
            {t("smbFeatures.mainHeading", "LoyalShift SMB Studio Features")}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className={`mt-4 text-lg sm:text-xl ${theme.textSecondary} max-w-3xl mx-auto`}
          >
            {t(
              "smbFeatures.mainSubheading",
              "Discover the powerful, integrated tools designed to help your small or medium business thrive online. Effortlessly manage your content, assets, analytics, and more."
            )}
          </motion.p>
        </div>
      </section>

      {/* Features Section - NEW STRUCTURE */}
      <section
        id="features-list"
        className={`py-16 md:py-24 ${theme.surfaceMuted}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className={`text-3xl font-bold ${theme.textPrimary} sm:text-4xl`}
            >
              {t("smbPlatformFeatures.featuresMainTitle", "Everything Your SMB Needs to Shine")} {/* Re-using key from SMBPlatformFeatures */}
            </h2>
            <div
              className={`w-20 h-1 ${theme.accentCyanBg} mx-auto mt-4 rounded-full`}
            ></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                t={t}
                icon={feature.icon}
                titleKey={feature.titleKey}
                defaultTitle={feature.defaultTitle}
                descriptionKey={feature.descriptionKey}
                defaultDescription={feature.defaultDescription}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Summary Section - NEW STRUCTURE */}
      <section
        className={`py-16 md:py-24 ${theme.background}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className={`text-3xl font-bold ${theme.textPrimary} sm:text-4xl`}
            >
              {t("smbPlatformFeatures.benefitsSummaryTitle", "Unlock Key Benefits for Your Business")} {/* Re-using key */}
            </h2>
          </div>
          <ul className="space-y-4">
            {summaryBenefits.map((benefitKey) => (
              <motion.li
                key={benefitKey}
                className={`flex items-center p-4 rounded-md ${theme.surfaceCard} shadow border ${theme.borderLight}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <IconCheck className={`${theme.successText}`} /> {/* Ensure theme success color */}
                <span className={`${theme.textSecondary} ml-3`}> {/* ml-3 to ensure space after icon */}
                  {t(benefitKey)}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>


      {/* Call to Action Section */}
      <section
        className={`relative py-20 ${theme.surfaceMuted}`}
      >
        <div className="absolute inset-0 opacity-80">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-500/0 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl sm:text-4xl font-bold mb-8 ${theme.textPrimary}`}
          >
            {t(
              "smbFeatures.cta.title",
              "Ready to Power Up Your Business with LoyalShift Studio?"
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-lg sm:text-xl ${theme.textSecondary} mb-10 max-w-2xl mx-auto`}
          >
            {t(
              "smbFeatures.cta.subtitle",
              "Explore all these features and more. Start simplifying your workflow and amplifying your results today."
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          >
            <Link
              to="/smb/pricing"
              className={`${buttonBase} ${theme.buttonPrimaryBg} ${theme.buttonTextLight} ${theme.buttonPrimaryHoverBg} py-3.5 px-8 text-base sm:text-lg`}
            >
              {t("smbFeatures.cta.getStarted", "View Pricing & Get Started")}
              <IconChevronRight className="w-5 h-5 ml-2" />
            </Link>

            <Link
              to="/contact"
              className={`${buttonBase} ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} py-3.5 px-8 text-base sm:text-lg`}
            >
              {t("smbFeatures.cta.requestDemo", "Request a Demo")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
