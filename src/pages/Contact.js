// src/pages/ContactPage.js
import React, { useState } from "react"; // Added useState
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import {
  FiMail,
  FiCalendar,
  FiMessageSquare,
  FiExternalLink,
  FiHelpCircle,
  FiUsers, // Icon for SMB
  FiBriefcase, // Icon for General/Enterprise
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLocalization } from "../components/LocalizationContext";
import loyalShiftV2Theme from "../themes/loyalshift-v2.theme";
import SchedulingEmbed from "../components/SchedulingEmbed";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.2 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const embedSwitchVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

// --- Reusable Info Card for Email/WhatsApp --- (Remains the same)
const ContactInfoCard = ({
  t,
  icon: Icon,
  titleKey,
  defaultTitle,
  descriptionKey,
  defaultDescription,
  ctaLink,
  ctaKey,
  defaultCta,
}) => (
  <motion.div
    variants={fadeInUp}
    className={`${theme.surfaceCard} p-6 md:p-8 rounded-xl border ${theme.border} ${theme.cardShadow} ${theme.cardHoverShadow} transition-shadow flex flex-col text-center h-full`}
    whileHover={{
      y: -5,
      borderColor: theme.inputFocusBorder.replace("focus:border-", "border-"),
    }}
  >
    <div className={`p-4 rounded-full ${theme.accentCyanBg}/10 mb-5 mx-auto`}>
      <Icon className={`w-10 h-10 ${theme.textHighlight}`} />
    </div>
    <h3
      className={`text-xl md:text-2xl font-semibold ${theme.textPrimary} mb-3`}
    >
      {t(titleKey, defaultTitle)}
    </h3>
    <p className={`${theme.textSecondary} text-base mb-6 flex-grow`}>
      {t(descriptionKey, defaultDescription)}
    </p>
    <div className="w-full mt-auto">
      {ctaLink && (
        <Link
          to={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-full px-5 py-3 rounded-lg font-medium transition-all duration-300 ${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg}`}
        >
          {t(ctaKey, defaultCta)}
          <FiExternalLink className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  </motion.div>
);

export default function ContactPage() {
  const { t } = useLocalization();
  const [activeScheduler, setActiveScheduler] = useState("general"); // 'general' or 'smb'

  const directContactMethods = [
    {
      icon: FiMail,
      titleKey: "contactPage.emailTitle",
      defaultTitle: "Send us an Email",
      descriptionKey: "contactPage.emailDesc",
      defaultDescription:
        "For general inquiries, support requests, or detailed questions. We aim to respond within one business day.",
      ctaLink: "mailto:administrative@loyalshift.com",
      ctaKey: "contactPage.emailCta",
      defaultCta: "Email: administrative@loyalshift.com",
    },
    {
      icon: FiMessageSquare,
      titleKey: "contactPage.whatsappTitle",
      defaultTitle: "Chat on WhatsApp",
      descriptionKey: "contactPage.whatsappDesc",
      defaultDescription:
        "For quick questions or a more immediate response during business hours, reach out via WhatsApp.",
      ctaLink: "https://wa.me/50672164805",
      ctaKey: "contactPage.whatsappCta",
      defaultCta: "Message on WhatsApp",
    },
  ];

  const schedulingOptions = {
    general: {
      id: "general",
      titleKey: "contactPage.scheduleGeneralTitle",
      defaultTitle: "General Consultation (30 Min)",
      descriptionKey: "contactPage.scheduleGeneralDesc",
      defaultDescription:
        "Perfect for initial discussions, exploring our services, or general inquiries about LoyalShift.",
      embedUrl: "https://calendly.com/loyalshift-sales/30min",
      icon: FiBriefcase,
    },
    smb: {
      id: "smb",
      titleKey: "contactPage.scheduleSMBTitle",
      defaultTitle: "SMB Sales Consultation",
      descriptionKey: "contactPage.scheduleSMBDesc",
      defaultDescription:
        "Focused discussion for Small & Medium Businesses looking to leverage our SMB Studio and tailored solutions.",
      embedUrl: "https://calendly.com/administrative-loyalshift/smb-sales",
      icon: FiUsers,
    },
  };

  const currentScheduler = schedulingOptions[activeScheduler];

  return (
    <div className={`${theme.background} min-h-screen py-16 md:py-20`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Main Content Grid: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Methods */}
          <motion.div
            className="md:col-span-2 space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className={`text-4xl sm:text-5xl font-extrabold ${theme.textPrimary} mb-4 leading-tight`}
            >
              {t("contactPage.mainTitle", "Get in Touch with LoyalShift")}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className={`text-lg md:text-xl ${theme.textSecondary} max-w-3xl mx-auto`}
            >
              {t(
                "contactPage.mainSubtitle",
                "We're here to answer your questions and help you get started on your modernization journey or with our SMB solutions."
              )}
            </motion.p>
            {directContactMethods.map((method) => (
              <ContactInfoCard key={method.titleKey} t={t} {...method} />
            ))}
          </motion.div>

          {/* Right Column: Scheduling with Switcher */}
          <motion.div
            className="md:col-span-3"
            initial="hidden"
            animate="visible"
            variants={fadeInUp} // Animate the whole column together
          >
            <h2
              className={`text-2xl md:text-3xl font-bold ${theme.textPrimary} mb-6 text-center md:text-left`}
            >
              {t("contactPage.scheduleTitle", "Schedule a Consultation")}
            </h2>

            {/* Switcher Buttons */}
            <div
              className={`flex space-x-2 mb-6 p-1 ${theme.surfaceMuted} rounded-lg border ${theme.borderLight} w-full sm:w-auto sm:inline-flex`}
            >
              {Object.values(schedulingOptions).map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setActiveScheduler(option.id)}
                    className={`flex-1 sm:flex-auto px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none ${
                      theme.focusRingDefault
                    }
                                    ${
                                      activeScheduler === option.id
                                        ? `${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} shadow-sm`
                                        : `${theme.textSecondary} hover:${theme.surface} hover:${theme.textPrimary}`
                                    }`}
                  >
                    <span className="flex items-center justify-center">
                      <IconComponent
                        className={`w-4 h-4 mr-2 ${
                          activeScheduler === option.id
                            ? theme.buttonPrimaryText
                            : theme.textMuted
                        }`}
                      />
                      {t(option.titleKey, option.defaultTitle)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Conditionally Rendered Scheduling Embed */}
            <div
              className={`${theme.surfaceCard} rounded-xl border ${theme.border} ${theme.cardShadow}`}
            >
              <div className="p-4 md:p-6 border-b ${theme.borderLight}">
                <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>
                  {t(currentScheduler.titleKey, currentScheduler.defaultTitle)}
                </h3>
                <p className={`text-sm ${theme.textSecondary} mt-1`}>
                  {t(
                    currentScheduler.descriptionKey,
                    currentScheduler.defaultDescription
                  )}
                </p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScheduler} // Key change triggers animation
                  variants={embedSwitchVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full rounded-b-xl overflow-hidden" // Apply rounding to bottom if it's the last element
                  style={{ minHeight: "520px" }} // Ensure container has height for embed
                >
                  <SchedulingEmbed
                    url={currentScheduler.embedUrl}
                    resize={true}
                    hideDetails={false}
                    hideCookieBanner={true}
                    style={{
                      border: "none", // Embed itself doesn't need a border if card has one
                      borderRadius: "0 0 0.75rem 0.75rem", // Match bottom rounding of card
                      minHeight: "500px",
                      width: "100%",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <p className={`${theme.textMuted} text-sm`}>
            {t(
              "contactPage.officeHoursNote",
              "Our team is typically available Monday - Friday, 9:00 AM - 5:00 PM (CST/GMT-6)."
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
