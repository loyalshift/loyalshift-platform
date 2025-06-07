// src/pages/SMB/sections/SMBHero.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiTool, FiEdit3, FiBarChart2, FiChevronDown } from "react-icons/fi";
import { useLocalization } from "../../components/LocalizationContext"; // Adjust path
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme"; // Using the main V2 theme

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const itemFadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
// --- End Animation Variants ---

// --- Placeholder for a subtle, relevant visual ---
const SMBHeroVisual = () => (
  <motion.div 
    className={`relative w-full max-w-md lg:max-w-lg mx-auto mt-10 lg:mt-0 h-56 sm:h-72 lg:h-80 rounded-xl ${theme.surfaceMuted} border ${theme.borderLight} shadow-lg overflow-hidden`}
    variants={itemFadeInUp} // Apply animation to the visual itself
    transition={{delay: 0.3}}
  >
    <div className="absolute inset-0 flex items-center justify-center p-6 opacity-40">
      <div className="grid grid-cols-2 gap-3">
        <FiEdit3 className={`w-12 h-12 ${theme.textHighlight}`} />
        <FiBarChart2 className={`w-12 h-12 ${theme.textHighlight} transform translate-y-3`} />
        <FiTool className={`w-12 h-12 ${theme.textHighlight} transform -translate-y-1`} />
        <FiCheckCircle className={`w-12 h-12 ${theme.textHighlight} transform translate-y-1 translate-x-1`} />
      </div>
    </div>
    <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent`}></div>
     {/* Optional: Add a subtle text label if needed for the visual's concept */}
    {/* <p className={`absolute bottom-4 right-4 text-xs ${theme.textMuted}`}>Conceptual SMB Tool Integration</p> */}
  </motion.div>
);


export default function SMBHero() {
  const { t } = useLocalization();

  return (
    <section 
      className={`relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden ${theme.background}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1/2 ${theme.surfaceMuted} opacity-60 -z-10`}></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          initial="hidden"
          animate="visible"
          variants={staggerChildren} // Stagger the direct children (text block and visual block)
        >
          {/* Text Content */}
          <motion.div // This div will be staggered
            className="text-center lg:text-left"
            variants={staggerChildren} // Stagger children within this text block
          >
            <motion.h1
              className={`text-4xl font-extrabold tracking-tight ${theme.textPrimary} sm:text-5xl md:text-6xl leading-tight mb-6`}
              variants={itemFadeInUp}
            >
              {t("smbLandingPage.heroTitle", "Your Business, Supercharged.")}
            </motion.h1>
            <motion.p
              className={`text-lg ${theme.textSecondary} max-w-xl lg:max-w-none lg:mr-auto mb-10`}
              variants={itemFadeInUp}
              // transition={{ delay: 0.1 }} // Delays are now handled by parent stagger
            >
              {t(
                "smbLandingPage.heroSubtitle",
                "LoyalShift empowers your Small or Medium Business with easy-to-use digital tools to thrive online, manage operations, and connect with customers effectively."
              )}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 md:gap-5"
              variants={itemFadeInUp}
              // transition={{ delay: 0.2 }}
            >
              <Link
                to="/smb/solutions"
                className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold 
                                   ${theme.buttonPrimaryBg} ${theme.buttonTextLight} 
                                   ${theme.buttonPrimaryHoverBg} 
                                   border border-transparent rounded-lg shadow-md 
                                   hover:shadow-lg focus:outline-none ${theme.inputFocusRing} 
                                   transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02]`}
              >
                {t("smbLandingPage.heroCtaButton", "View SMB Plans")}
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold 
                                   ${theme.buttonSecondaryText} ${theme.buttonSecondaryBg} 
                                   ${theme.buttonSecondaryHoverBg} 
                                   border ${theme.buttonSecondaryBorder || theme.borderLight} rounded-lg shadow-sm 
                                   hover:shadow-md focus:outline-none ${theme.inputFocusRing} 
                                   transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02]`}
              >
                {t("smbLandingPage.heroSecondaryCtaButton", "Get in Touch")}
              </Link>
            </motion.div>
            <motion.div
              className={`mt-12 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-x-6 sm:gap-x-8 gap-y-3 text-sm font-medium ${theme.textMuted}`}
              variants={staggerChildren} // Stagger the trust indicators
              // transition={{ delay: 0.3 }} // No, parent handles delay
            >
              {[
                { key: "smbLandingPage.trustIndicator1", defaultText: "Proudly Costa Rican" },
                { key: "smbLandingPage.trustIndicator2", defaultText: "SMB Focused Solutions" },
                { key: "smbLandingPage.trustIndicator3", defaultText: "Results Driven Platform" },
              ].map((indicator) => (
                <motion.span
                  key={indicator.key} 
                  className="flex items-center"
                  variants={itemFadeInUp} // Each indicator fades up
                >
                  <FiCheckCircle className={`${theme.textHighlight} w-4 h-4 mr-1.5 flex-shrink-0`} />
                  {t(indicator.key, indicator.defaultText)}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <motion.div // This div will also be staggered by the main grid's variants
            className="flex items-center justify-center lg:justify-end"
            variants={itemFadeInUp} // The visual block itself can fade in
          >
            <SMBHeroVisual />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
        <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }} // Delay to appear after main content
        >
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
                <FiChevronDown className={`${theme.textMuted} text-3xl`} />
            </motion.div>
        </motion.div>
    </section>
  );
}
