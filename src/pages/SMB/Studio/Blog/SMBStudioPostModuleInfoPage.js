// src/pages/smb/studio/blog/SMBStudioPostModuleInfoPage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocalization } from "../../../../components/LocalizationContext";
import loyalShiftV2Theme from "../../../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

const InfoSection = ({ t, titleKey, introKey, items, itemKeyPrefix, icon }) => (
  <motion.section
    className={`p-8 rounded-xl mb-10 ${theme.surfaceCard} border ${theme.border} shadow-sm hover:shadow-md transition-shadow`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-start gap-4 mb-6">
      <div className={`p-3 rounded-lg ${theme.surfaceMuted}`}>{icon}</div>
      <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>
        {t(titleKey)}
      </h2>
    </div>

    {introKey && (
      <p className={`${theme.textSecondary} mb-6 pl-14`}>{t(introKey)}</p>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14">
      {items.map((itemSuffix, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 p-4 rounded-lg ${theme.surfaceMuted}`}
        >
          <div className={`p-1.5 rounded-full ${theme.surfaceMuted}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-cyan-500"
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
          <p className={`${theme.textSecondary}`}>
            {t(`${itemKeyPrefix ? `${itemKeyPrefix}.` : ""}${itemSuffix}`)}
          </p>
        </div>
      ))}
    </div>
  </motion.section>
);

// Icons using theme colors
const CreateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-cyan-500"
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

const SeoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-cyan-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PublishIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-cyan-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

const AiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-cyan-500"
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

const TipsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-cyan-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

export default function SMBStudioPostModuleInfoPage() {
  const { t } = useLocalization();

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
            <span className={`text-sm font-medium ${theme.textHighlight}`}>
              {t("smbStudioPostInfo.moduleLabel", "Blog Module")}
            </span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-bold ${theme.textPrimary} mb-4`}
          >
            {t("smbStudioPostInfo.mainTitle")}
          </h1>
          <p
            className={`mt-3 text-lg ${theme.textSecondary} max-w-2xl mx-auto`}
          >
            {t("smbStudioPostInfo.intro")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          <InfoSection
            t={t}
            icon={<CreateIcon />}
            titleKey="smbStudioPostInfo.sectionCreatingTitle"
            introKey="smbStudioPostInfo.creatingIntro"
            items={[
              "smbStudioPostInfo.creatingItemTitle",
              "smbStudioPostInfo.creatingItemContent",
              "smbStudioPostInfo.creatingItemExcerpt",
              "smbStudioPostInfo.creatingItemFeaturedImage",
              "smbStudioPostInfo.creatingItemCategoriesTags",
              "smbStudioPostInfo.creatingItemSlug",
            ]}
            itemKeyPrefix=""
          />

          <InfoSection
            t={t}
            icon={<SeoIcon />}
            titleKey="smbStudioPostInfo.sectionSeoTitle"
            introKey="smbStudioPostInfo.seoIntro"
            items={[
              "smbStudioPostInfo.seoItemMetaTitle",
              "smbStudioPostInfo.seoItemMetaDescription",
            ]}
            itemKeyPrefix=""
          />

          <InfoSection
            t={t}
            icon={<PublishIcon />}
            titleKey="smbStudioPostInfo.sectionPublishingTitle"
            introKey="smbStudioPostInfo.publishingIntro"
            items={[
              "smbStudioPostInfo.publishingItemStatus",
              "smbStudioPostInfo.publishingItemVisibility",
            ]}
            itemKeyPrefix=""
          />

          <InfoSection
            t={t}
            icon={<AiIcon />}
            titleKey="smbStudioPostInfo.sectionAiAssistantTitle"
            introKey="smbStudioPostInfo.aiAssistantIntro"
            items={[
              "smbStudioPostInfo.aiItemGenerateTitle",
              "smbStudioPostInfo.aiItemDraftContent",
              "smbStudioPostInfo.aiItemImproveText",
              "smbStudioPostInfo.aiItemSummarize",
              "smbStudioPostInfo.aiItemSeoOptimize",
            ]}
            itemKeyPrefix=""
          />

          <InfoSection
            t={t}
            icon={<TipsIcon />}
            titleKey="smbStudioPostInfo.sectionTipsTitle"
            items={[
              "smbStudioPostInfo.tip1",
              "smbStudioPostInfo.tip2",
              "smbStudioPostInfo.tip3",
              "smbStudioPostInfo.tip4",
            ]}
            itemKeyPrefix=""
          />
        </div>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/smb/studio/blog"
            className={`inline-flex items-center justify-center px-8 py-3.5 text-base font-medium ${theme.buttonSecondaryText} ${theme.buttonSecondaryBg} hover:${theme.buttonSecondaryHoverBg} rounded-lg shadow-sm border ${theme.border} transition-all`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {t("smbStudioPostInfo.ctaViewPosts")}
          </Link>
          <Link
            to="/smb/studio/blog/new"
            className={`inline-flex items-center justify-center px-8 py-3.5 text-base font-medium ${theme.buttonTextLight} ${theme.accentCyanBg} hover:${theme.accentCyanBgHover} rounded-lg shadow-lg transform hover:scale-[1.02] transition-all`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {t("smbStudioPostInfo.ctaCreateNewPost")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
