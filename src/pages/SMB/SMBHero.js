// src/pages/SMB/sections/SMBHero.js
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiChevronDown } from "react-icons/fi";
import { useLocalization } from "../../components/LocalizationContext"; // Adjust path
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme"; // Using the main V2 theme

const theme = loyalShiftV2Theme;

const viewportSettings = { once: true, amount: 0.1 };

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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};
// --- End Animation Variants ---

// --- Placeholder for a subtle, relevant visual ---
const SMBHeroVisual = ({ videoRef }) => {
  const handleVideoHover = () => {
    if (videoRef.current) {
      // Attempt to play. Browsers might block autoplay if not muted or if user hasn't interacted.
      // The `muted` attribute on the video tag itself should handle most cases for autoplay.
      // This hover handler provides an additional trigger.
      videoRef.current.play().catch((error) => {
        // Common errors: "NotAllowedError" if autoplay is blocked and requires user gesture.
        // "NotSupportedError" if the video format is an issue.
        console.log(
          "Video play on hover interrupted or failed:",
          error.name,
          error.message
        );
      });
    }
  };

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden border ${theme.borderLight} w-xs shadow-xl mt-8 aspect-video ${theme.surfaceMuted} flex items-center justify-center`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportSettings}
      transition={{ duration: 0.7 }}
      onMouseEnter={handleVideoHover}
    >
      <video
        ref={videoRef}
        src="/images/studio-dashboard.mp4"
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/studio-dashboard-poster.jpg"
      >
        Your browser does not support the video tag.
      </video>
      <div
        className={`absolute bottom-2 right-2 px-2 py-1 rounded text-xs ${theme.surfaceCard} ${theme.textMuted} bg-opacity-80 backdrop-blur-sm shadow`}
      >
        {/* surfaceCard for disclaimer box bg */}
        <span className="italic">
          Visual representing AgentHub & modernization. (Conceptual animation).
          Made using AI, it was fun.
        </span>
      </div>
    </motion.div>
  );
};

export default function SMBHero() {
  const { t } = useLocalization();
  const videoRef = useRef(null);

  return (
    <section
      className={`relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden ${theme.background}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1/2 ${theme.surfaceMuted} opacity-60 -z-10`}
      ></div>

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
                                   ${theme.buttonSecondaryText} ${
                  theme.buttonSecondaryBg
                } 
                                   ${theme.buttonSecondaryHoverBg} 
                                   border ${
                                     theme.buttonSecondaryBorder ||
                                     theme.borderLight
                                   } rounded-lg shadow-sm 
                                   hover:shadow-md focus:outline-none ${
                                     theme.inputFocusRing
                                   } 
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
                {
                  key: "smbLandingPage.trustIndicator1",
                  defaultText: "Proudly Costa Rican",
                },
                {
                  key: "smbLandingPage.trustIndicator2",
                  defaultText: "SMB Focused Solutions",
                },
                {
                  key: "smbLandingPage.trustIndicator3",
                  defaultText: "Results Driven Platform",
                },
              ].map((indicator) => (
                <motion.span
                  key={indicator.key}
                  className="flex items-center"
                  variants={itemFadeInUp} // Each indicator fades up
                >
                  <FiCheckCircle
                    className={`${theme.textHighlight} w-4 h-4 mr-1.5 flex-shrink-0`}
                  />
                  {t(indicator.key, indicator.defaultText)}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Content */}

          <SMBHeroVisual videoRef={videoRef} />
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
