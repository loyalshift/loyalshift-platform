// src/pages/smb/bim/SMBBIMDashboard.js (example path)
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiBox,
  FiUploadCloud,
  FiShoppingCart,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";
import { useLocalization } from "../../components/LocalizationContext"; // Adjust path
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

const fadeInUp = {
  // For staggering elements within final content
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const DashboardCard = ({
  t,
  titleKey,
  descriptionKey,
  icon: Icon,
  linkTo,
  ctaKey,
  defaultTitle,
  defaultDescription,
  defaultCta,
}) => (
  <motion.div
    className={`flex flex-col ${theme.surfaceCard} rounded-xl border ${theme.border} shadow-lg hover:${theme.cardHoverShadow} transition-all duration-300 ease-out overflow-hidden h-full`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ y: -5 }}
  >
    <div className="p-6 flex-grow">
      <div
        className={`p-3 rounded-lg ${theme.accentCyanBg}/10 inline-flex mb-4`}
      >
        <Icon className={`w-8 h-8 ${theme.textHighlight}`} />
      </div>
      <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-2`}>
        {t(titleKey, defaultTitle)}
      </h3>
      <p className={`${theme.textSecondary} text-sm leading-relaxed mb-4`}>
        {t(descriptionKey, defaultDescription)}
      </p>
    </div>
    <div
      className={`px-6 py-4 border-t ${theme.borderLight} ${theme.surfaceMuted}`}
    >
      <Link
        to={linkTo}
        className={`inline-flex items-center text-sm font-medium ${theme.linkStyle} group`}
      >
        {t(ctaKey, defaultCta)}{" "}
        <FiArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  </motion.div>
);

const StatCard = ({ t, titleKey, value, icon: Icon, defaultTitle }) => (
  <div
    className={`${theme.surfaceMuted} p-4 rounded-lg border ${theme.borderLight} flex items-center`}
  >
    <div className={`p-2.5 rounded-md ${theme.accentCyanBg}/20 mr-3`}>
      <Icon className={`w-6 h-6 ${theme.textHighlight}`} />
    </div>
    <div>
      <p className={`text-xs font-medium ${theme.textMuted}`}>
        {t(titleKey, defaultTitle)}
      </p>
      <p className={`text-xl font-bold ${theme.textPrimary}`}>{value}</p>
    </div>
  </div>
);

export default function SMBBIMDashboard() {
  const { t } = useLocalization();

  const quickActions = [
    {
      titleKey: "smbBim.dashboard.actionLibrary",
      defaultTitle: "Browse Object Library",
      descriptionKey: "smbBim.dashboard.actionLibraryDesc",
      defaultDescription:
        "Find thousands of manufacturer-verified BIM objects.",
      icon: FiBox,
      linkTo: "/smb/bim/object-library",
      ctaKey: "smbBim.dashboard.browseNow",
      defaultCta: "Browse Now",
    },
    {
      titleKey: "smbBim.dashboard.actionUpload",
      defaultTitle: "Upload Your Objects",
      descriptionKey: "smbBim.dashboard.actionUploadDesc",
      defaultDescription:
        "Share your BIM creations with the community or your private team.",
      icon: FiUploadCloud,
      linkTo: "/smb/bim/my-uploads",
      ctaKey: "smbBim.dashboard.startUploading",
      defaultCta: "Start Uploading",
    },
    {
      titleKey: "smbBim.dashboard.actionMarketplace",
      defaultTitle: "Explore Marketplace",
      descriptionKey: "smbBim.dashboard.actionMarketplaceDesc",
      defaultDescription:
        "Buy and sell premium BIM objects and specialized tools.",
      icon: FiShoppingCart,
      linkTo: "/smb/bim/marketplace",
      ctaKey: "smbBim.dashboard.visitMarketplace",
      defaultCta: "Visit Marketplace",
    },
  ];

  const stats = [
    {
      titleKey: "smbBim.dashboard.statTotalObjects",
      defaultTitle: "Total Library Objects",
      value: "12,500+",
      icon: FiBox,
    },
    {
      titleKey: "smbBim.dashboard.statUserUploads",
      defaultTitle: "Your Uploaded Objects",
      value: "72",
      icon: FiUploadCloud,
    },
    {
      titleKey: "smbBim.dashboard.statActiveProjects",
      defaultTitle: "Active Projects Using BIM",
      value: "3",
      icon: FiGrid,
    },
    {
      titleKey: "smbBim.dashboard.statDownloads",
      defaultTitle: "Your Object Downloads",
      value: "1,280",
      icon: FiTrendingUp,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-8 p-8"
    >
      <motion.div variants={fadeInUp}>
        <h1 className={`text-3xl font-bold ${theme.textPrimary} mb-2`}>
          {t("smbBim.dashboard.title", "Welcome to Your BIM Hub")}
        </h1>
        <p className={`${theme.textSecondary}`}>
          {t(
            "smbBim.dashboard.subtitle",
            "Manage your BIM objects, discover new assets, and integrate with your design workflow."
          )}
        </p>
      </motion.div>

      {/* Quick Stats Section */}
      <motion.section variants={fadeInUp}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.titleKey} t={t} {...stat} />
          ))}
        </div>
      </motion.section>

      {/* Quick Actions Grid */}
      <motion.section variants={fadeInUp}>
        <h2 className={`text-xl font-semibold ${theme.textPrimary} mb-4`}>
          {t("smbBim.dashboard.quickActionsTitle", "Quick Actions")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <DashboardCard key={action.titleKey} t={t} {...action} />
          ))}
        </div>
      </motion.section>

      {/* Placeholder for Recent Activity or Project Overview */}
      <motion.section variants={fadeInUp} className="mt-8">
        <div
          className={`${theme.surfaceCard} p-6 rounded-xl border ${theme.border} shadow-lg`}
        >
          <h2 className={`text-xl font-semibold ${theme.textPrimary} mb-3`}>
            {t(
              "smbBim.dashboard.recentActivityTitle",
              "Recent Activity / Project Spotlight"
            )}
          </h2>
          <div
            className={`h-48 ${theme.surfaceMuted} rounded-md flex items-center justify-center border ${theme.borderLight}`}
          >
            <p className={`${theme.textMuted}`}>
              {t(
                "smbBim.dashboard.activityPlaceholder",
                "Activity feed or project overview will appear here."
              )}
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
