// src/pages/smb/studio/blog/SMBStudioBlogModuleInfoPage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocalization } from "../../../../components/LocalizationContext";
import loyalShiftV2Theme from "../../../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

const InfoSection = ({ t, titleKey, introKey, items, icon }) => (
  <motion.section
    className={`p-8 rounded-xl mb-10 ${theme.surfaceCard} border ${theme.border} shadow-sm hover:shadow-md transition-shadow`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-start gap-4 mb-6">
      <div className={`p-3 rounded-lg ${theme.surfaceMuted}`}>{icon}</div>
      <h2 className={`text-2xl font-bold text-gray-900`}>{t(titleKey)}</h2>
    </div>

    {introKey && <p className={`text-gray-700 mb-6 pl-14`}>{t(introKey)}</p>}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14">
      {items.map((itemKey, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 p-4 rounded-lg ${theme.surfaceMuted}`}
        >
          <div className={`p-1.5 rounded-full ${theme.surfaceMuted}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-cyan-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className={`text-gray-700`}>{t(itemKey)}</p>
        </div>
      ))}
    </div>
  </motion.section>
);

// Icons using theme colors with better contrast
const IconWhyBlog = () => (
  <svg
    className="h-6 w-6 text-cyan-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const IconCoreFeatures = () => (
  <svg
    className="h-6 w-6 text-cyan-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M9 6h6M9 12h6M9 18h6M5 12h.01M19 12h.01M6 5h.01M18 5h.01M6 19h.01M18 19h.01"
    />
  </svg>
);

const IconContentTools = () => (
  <svg
    className="h-6 w-6 text-cyan-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const IconBlogTips = () => (
  <svg
    className="h-6 w-6 text-cyan-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

export default function SMBStudioBlogModuleInfoPage() {
  const { t } = useLocalization();

  const whyBlogItems = [
    "smbStudioBlogInfo.whyBlogItemSeo",
    "smbStudioBlogInfo.whyBlogItemAuthority",
    "smbStudioBlogInfo.whyBlogItemAudience",
    "smbStudioBlogInfo.whyBlogItemTraffic",
    "smbStudioBlogInfo.whyBlogItemLeadGen",
  ];

  const coreFeaturesItems = [
    "smbStudioBlogInfo.coreFeaturePostListing",
    "smbStudioBlogInfo.coreFeatureCategoriesTags",
    "smbStudioBlogInfo.coreFeatureGlobalSettings",
    "smbStudioBlogInfo.coreFeatureIntegration",
  ];

  const contentToolsItems = [
    "smbStudioBlogInfo.contentToolsCreating",
    "smbStudioBlogInfo.contentToolsScheduling",
    "smbStudioBlogInfo.contentToolsSeo",
    "smbStudioBlogInfo.contentToolsAi",
  ];

  const tipsItems = [
    "smbStudioBlogInfo.tipConsistency",
    "smbStudioBlogInfo.tipValue",
    "smbStudioBlogInfo.tipKeywords",
    "smbStudioBlogInfo.tipPromote",
    "smbStudioBlogInfo.tipEngage",
    "smbStudioBlogInfo.tipAnalyze",
  ];

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${theme.background}`}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div
            className={`inline-flex items-center justify-center px-6 py-2 rounded-full mb-6 ${theme.surfaceMuted}`}
          >
            <span className={`text-sm font-medium text-cyan-600`}>
              {t("smbStudioBlogInfo.moduleLabel", "Blog Management")}
            </span>
          </div>

          <h1 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4`}>
            {t("smbStudioBlogInfo.mainTitle")}
          </h1>

          <p className={`mt-3 text-lg text-gray-700 max-w-3xl mx-auto`}>
            {t("smbStudioBlogInfo.intro")}
          </p>
        </motion.div>

        <div className="space-y-10">
          <InfoSection
            t={t}
            icon={<IconWhyBlog />}
            titleKey="smbStudioBlogInfo.sectionWhyBlogTitle"
            introKey="smbStudioBlogInfo.whyBlogIntro"
            items={whyBlogItems}
          />

          <InfoSection
            t={t}
            icon={<IconCoreFeatures />}
            titleKey="smbStudioBlogInfo.sectionCoreFeaturesTitle"
            introKey="smbStudioBlogInfo.coreFeaturesIntro"
            items={coreFeaturesItems}
          />

          <InfoSection
            t={t}
            icon={<IconContentTools />}
            titleKey="smbStudioBlogInfo.sectionContentToolsTitle"
            introKey="smbStudioBlogInfo.contentToolsIntro"
            items={contentToolsItems}
          />

          <InfoSection
            t={t}
            icon={<IconBlogTips />}
            titleKey="smbStudioBlogInfo.sectionTipsTitle"
            introKey="smbStudioBlogInfo.tipsIntro"
            items={tipsItems}
          />
        </div>

        <motion.div
          className="mt-16 text-center flex flex-col sm:flex-row justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/smb/studio/blog/posts"
            className={`inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm border ${theme.border} transition-all`}
          >
            {t("smbStudioBlogInfo.ctaManagePosts")}
          </Link>

          <Link
            to="/smb/studio/blog/new"
            className={`inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all`}
          >
            {t("smbStudioBlogInfo.ctaWriteNewPost")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
