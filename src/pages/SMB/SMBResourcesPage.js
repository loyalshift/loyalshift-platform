// src/pages/smb/SMBResourcesPage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";

// --- Icons ---
import {
  FiBookOpen,
  FiTool,
  FiUsers,
  FiMapPin,
  FiExternalLink,
  FiDownloadCloud,
  FiArrowRight,
  FiMessageSquare,
  FiUploadCloud,
  FiHardDrive,
} from "react-icons/fi";
import { useLocalization } from "../../components/LocalizationContext";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// --- ResourceCard Component ---
const ResourceCard = ({
  t,
  titleKey,
  descriptionKey,
  link,
  linkType = "internal",
  ctaKey,
  defaultTitle,
  defaultDescription,
  defaultCta,
  icon: Icon,
}) => {
  const isExternal = linkType === "external";
  const ctaText = t(
    ctaKey,
    defaultCta || t("smbResources.viewResourceButton", "View Resource")
  );

  return (
    <motion.div
      variants={fadeInUp}
      className={`flex flex-col ${theme.surfaceCard} rounded-xl border ${theme.borderLight} ${theme.cardShadow} ${theme.cardHoverShadow} transition-all duration-300 ease-out overflow-hidden h-full`}
      whileHover={{
        y: -5,
        borderColor: theme.inputFocusBorder.replace("focus:border-", "border-"),
      }} // Use focus border color on hover
    >
      <div className="p-6 flex-grow">
        <div className="flex items-start mb-4">
          {Icon && (
            <div
              className={`p-3 rounded-lg ${theme.accentCyanBg}/10 mr-4 flex-shrink-0`}
            >
              {" "}
              {/* Icon background from theme */}
              <Icon className={`w-7 h-7 ${theme.textHighlight}`} />{" "}
              {/* Icon color from theme */}
            </div>
          )}
          <div>
            <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-1`}>
              {t(titleKey, defaultTitle)}
            </h3>
            <p className={`${theme.textSecondary} text-sm leading-relaxed`}>
              {t(descriptionKey, defaultDescription)}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`px-6 py-4 border-t ${theme.borderLight} ${theme.surfaceMuted}`}
      >
        {isExternal ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center text-sm font-medium ${theme.linkStyle} group`}
          >
            {ctaText}{" "}
            <FiExternalLink className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        ) : (
          <Link
            to={link}
            className={`inline-flex items-center text-sm font-medium ${theme.linkStyle} group`}
          >
            {ctaText}{" "}
            <FiArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

ResourceCard.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkType: PropTypes.oneOf(["internal", "external"]),
  ctaKey: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string,
  defaultDescription: PropTypes.string,
  defaultCta: PropTypes.string,
  icon: PropTypes.elementType,
};

// --- ResourceCategorySection Component ---
const ResourceCategorySection = ({
  t,
  titleKey,
  defaultTitle,
  children,
  icon: Icon,
}) => (
  <motion.section className="mb-12 md:mb-16" variants={fadeInUp}>
    <div
      className={`flex items-center mb-6 md:mb-8 pb-3 border-b ${theme.border}`}
    >
      {Icon && <Icon className={`w-7 h-7 ${theme.textHighlight} mr-3`} />}{" "}
      {/* Icon color from theme */}
      <h2 className={`text-2xl md:text-3xl font-bold ${theme.textPrimary}`}>
        {t(titleKey, defaultTitle)}
      </h2>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {children}
    </div>
  </motion.section>
);

ResourceCategorySection.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType,
};

export default function SMBResourcesPage() {
  const { t } = useLocalization();

  // Data for resources, keeping keys consistent
  const guides = [
    // {
    //   icon: FiHardDrive, // Icon for the new guide
    //   titleKey: "smbResources.guideDeployContaboTitle", // New translation key
    //   descriptionKey: "smbResources.guideDeployContaboDesc", // New translation key
    //   link: "/smb/resources/guide/deploy-contabo", // Route to your Contabo guide page
    //   ctaKey: "smbResources.viewResourceButton",
    //   defaultTitle: "Deploying Your App on Contabo",
    //   defaultDescription:
    //     "A practical guide to uploading your website files to a Contabo VPS using FTP, SFTP, or Remote Desktop.",
    // },
    {
      icon: FiUploadCloud,
      titleKey: "smbResources.guideDeployTitle",
      descriptionKey: "smbResources.guideDeployDesc",
      link: "/smb/resources/guide/deploy-ui",
      ctaKey: "smbResources.viewResourceButton",
      defaultTitle: "Deploying Your UI (Kubernetes)", // Clarified title
      defaultDescription:
        "An advanced, step-by-step guide on deploying your application using a modern Kubernetes cluster.",
    },
    {
      icon: FiBookOpen,
      titleKey: "smbResources.guideOllamaTitle",
      descriptionKey: "smbResources.guideOllamaDesc",
      link: "/smb/resources/guide/ollama-setup",
      ctaKey: "smbResources.viewResourceButton",
      defaultTitle: "Getting Started with Ollama & Local AI",
      defaultDescription:
        "A beginner's guide to setting up and using Ollama for local large language model experimentation on your own machine.",
    },
    {
      icon: FiBookOpen,
      titleKey: "smbResources.guideContextIsKingTitle",
      descriptionKey: "smbResources.guideContextIsKingDesc",
      link: "/smb/resources/blog/context-is-king",
      ctaKey: "smbResources.viewResourceButton",
      defaultTitle: "Context is King: Optimizing AI Prompts",
      defaultDescription:
        "Learn how providing rich context to AI models can dramatically improve the quality and relevance of their outputs.",
    },
    {
      icon: FiBookOpen,
      titleKey: "smbResources.guideDigitalPresenceTitle",
      descriptionKey: "smbResources.guideDigitalPresenceDesc",
      link: "/smb/resources/guide/digital-presence-101",
      ctaKey: "smbResources.viewResourceButton",
      defaultTitle: "Building Your SMB Digital Presence",
      defaultDescription:
        "Step-by-step guidance on establishing a strong online foundation for your small or medium business.",
    },
    {
      icon: FiBookOpen,
      titleKey: "smbResources.guideSEOBasicsTitle",
      descriptionKey: "smbResources.guideSEOBasicsDesc",
      link: "/smb/resources/guide/seo-basics",
      ctaKey: "smbResources.viewResourceButton",
      defaultTitle: "SEO Basics for SMBs",
      defaultDescription:
        "Understand the fundamentals of Search Engine Optimization to help your customers find you online.",
    },
  ];

  const tools = [
    {
      icon: FiTool,
      titleKey: "smbResources.toolPromptHealthTitle",
      descriptionKey: "smbResources.toolPromptHealthDesc",
      link: "/smb/tools/prompt-checker",
      ctaKey: "smbResources.useToolButton",
      defaultTitle: "AI Prompt Health Checker",
      defaultDescription:
        "Analyze and refine your AI prompts for better clarity, effectiveness, and desired outcomes. (Coming Soon)",
    },
    {
      icon: FiDownloadCloud,
      titleKey: "smbResources.toolSMBCalendarTitle",
      descriptionKey: "smbResources.toolSMBCalendarDesc",
      link: "/downloads/smb-content-calendar.xlsx",
      linkType: "external",
      ctaKey: "smbResources.downloadTemplateButton",
      defaultTitle: "SMB Content Calendar Template",
      defaultDescription:
        "Download our free template to plan and organize your content marketing efforts effectively.",
    },
  ];

  const community = [
    {
      icon: FiUsers,
      titleKey: "smbResources.communityPortalTitle",
      descriptionKey: "smbResources.communityPortalDesc",
      link: "/smb/studio/community",
      ctaKey: "smbResources.joinCommunityButton",
      defaultTitle: "LoyalShift SMB Community Portal",
      defaultDescription:
        "Connect with other SMB owners, share insights, ask questions, and learn together in our dedicated forum. (Coming Soon)",
    },
    {
      icon: FiMessageSquare,
      titleKey: "smbResources.supportContactTitle",
      descriptionKey: "smbResources.supportContactDesc",
      link: "/contact",
      ctaKey: "smbResources.contactSupportButton",
      defaultTitle: "Contact SMB Support",
      defaultDescription:
        "Have a specific question about our SMB Studio or services? Our dedicated support team is here to help.",
    },
  ];

  const localResourcesCR = [
    {
      icon: FiMapPin,
      titleKey: "smbResources.localMEICTitle",
      descriptionKey: "smbResources.localMEICDesc",
      link: "https://www.meic.go.cr/pymes/",
      linkType: "external",
      ctaKey: "smbResources.visitLinkButton",
      defaultTitle: "MEIC - PYMES Costa Rica",
      defaultDescription:
        "Official information and support for PYMES from the Ministry of Economy, Industry and Commerce of Costa Rica.",
    },
    {
      icon: FiMapPin,
      titleKey: "smbResources.localProcomerTitle",
      descriptionKey: "smbResources.localProcomerDesc",
      link: "https://www.procomer.com/",
      linkType: "external",
      ctaKey: "smbResources.visitLinkButton",
      defaultTitle: "PROCOMER Costa Rica",
      defaultDescription:
        "Export promotion agency of Costa Rica, offering resources and support for businesses looking to export.",
    },
    {
      icon: FiMapPin,
      titleKey: "smbResources.localINATitle",
      descriptionKey: "smbResources.localINADesc",
      link: "https://www.ina.ac.cr/",
      linkType: "external",
      ctaKey: "smbResources.visitLinkButton",
      defaultTitle: "INA - Instituto Nacional de Aprendizaje",
      defaultDescription:
        "National Training Institute offering vocational training and development programs for individuals and businesses.",
    },
  ];

  return (
    <div className={`min-h-screen ${theme.background}`}>
      {/* Hero Section */}
      <section className={`py-20 md:py-28 ${theme.surfaceMuted}`}>
        {" "}
        {/* Using surfaceMuted from theme */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className={`text-4xl sm:text-5xl font-extrabold ${theme.textPrimary} mb-5 leading-tight`}
          >
            {t("smbResources.mainTitle", "LoyalShift SMB Resource Center")}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className={`text-lg md:text-xl ${theme.textSecondary} max-w-3xl mx-auto`}
          >
            {t(
              "smbResources.mainSubtitle",
              "Guides, tools, and community support to help your small or medium business succeed online and beyond."
            )}
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <ResourceCategorySection
            t={t}
            titleKey="smbResources.categoryGuidesTitle"
            defaultTitle="Guides & Tutorials"
            icon={FiBookOpen}
          >
            {guides.map((item) => (
              <ResourceCard key={item.titleKey} t={t} {...item} />
            ))}
          </ResourceCategorySection>

          <ResourceCategorySection
            t={t}
            titleKey="smbResources.categoryToolsTitle"
            defaultTitle="Tools & Templates"
            icon={FiTool}
          >
            {tools.map((item) => (
              <ResourceCard key={item.titleKey} t={t} {...item} />
            ))}
          </ResourceCategorySection>

          <ResourceCategorySection
            t={t}
            titleKey="smbResources.categoryCommunityTitle"
            defaultTitle="Community & Support"
            icon={FiUsers}
          >
            {community.map((item) => (
              <ResourceCard key={item.titleKey} t={t} {...item} />
            ))}
          </ResourceCategorySection>

          <ResourceCategorySection
            t={t}
            titleKey="smbResources.categoryLocalTitle"
            defaultTitle="Local Costa Rican Resources"
            icon={FiMapPin}
          >
            {localResourcesCR.map((item) => (
              <ResourceCard key={item.titleKey} t={t} {...item} />
            ))}
          </ResourceCategorySection>
        </motion.div>

        {/* Final CTA or suggestion */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <h3 className={`text-2xl font-semibold ${theme.textPrimary} mb-4`}>
            {t("smbResources.ctaTitle", "Can't find what you're looking for?")}
          </h3>
          <p className={`${theme.textSecondary} mb-6 max-w-xl mx-auto`}>
            {t(
              "smbResources.ctaText",
              "Our team is constantly updating our resources. If you have a specific need or suggestion, please let us know!"
            )}
          </p>
          <Link
            to="/contact?subject=ResourceSuggestion"
            className={`inline-flex items-center justify-center px-8 py-3 text-base font-medium ${theme.buttonPrimaryBg} ${theme.buttonTextLight} rounded-md shadow-sm ${theme.buttonPrimaryHoverBg} transition-colors ${theme.focusRingDefault}`}
          >
            {t("smbResources.ctaButton", "Suggest a Resource")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
