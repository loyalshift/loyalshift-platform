// src/pages/Pricing.js
// REVERT: Back to centered layout.
// ADDED: Introductory text animation sequence inspired by Landing Page Hero.

import React, { useState, useEffect, useRef } from "react"; // Added useState, useEffect
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import {
  FiCheckCircle,
  FiHelpCircle,
  FiDollarSign,
  FiArrowRight,
  FiLoader,
  FiChevronDown,
} from "react-icons/fi"; // Added FiLoader

import Button from "../components/Button";
import { pricingTiers, faqData } from "../data/marketing-efforts";

// --- Theme Colors (LoyalShift DARK Theme) ---
const colors = {
  background: "bg-slate-900",
  surface: "bg-slate-800/70",
  surfaceStrong: "bg-slate-800",
  primaryGradient: "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600",
  border: "border-slate-700",
  borderAccent: "border-blue-500/40",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  textHighlight: "text-blue-300",
  textWhite: "text-white",
  accentSuccess: "text-green-400",
  accentBlue: "text-blue-400",
  accentCyan: "text-cyan-400",
  // Light theme colors (kept for reference/potential use in components)
  bgBase: "bg-neutral-light",
  bgWhite: "bg-neutral-white",
  bgSubtle: "bg-slate-50",
  textHeading: "text-neutral-dark", // Light theme heading
  textBody: "text-neutral-main", // Light theme body
  textSubtle: "text-neutral-500", // Light theme subtle
  primaryMain: "bg-primary-main", // Light theme primary bg
  primaryContrast: "text-primary-contrast", // Text on light theme primary
  borderLight: "border-neutral-200",
  borderMedium: "border-neutral-300",
  borderPrimary: "border-primary-main", // Light theme primary border
};

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};
// Animation for the cycling text
const cycleTextVariant = {
  hidden: { opacity: 0, filter: "blur(5px)", y: 15 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
    y: -15,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};
// --- End Animation Variants ---

// --- Pricing Card Component (Using Dark Theme Style from previous step) ---
const PricingCard = ({ tier }) => {
  const highlights = tier.features.slice(0, 4);
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 },
      }}
      className={`flex flex-col rounded-xl shadow-xl shadow-black/25 border backdrop-blur-sm overflow-hidden h-full ${
        tier.popular
          ? `${colors.surfaceStrong} ${colors.borderAccent} border-2`
          : `${colors.surface} ${colors.border}`
      }`}
    >
      {tier.popular && (
        <div
          className={`absolute top-0 right-0 text-xs font-bold px-4 py-1 ${colors.primaryGradient} ${colors.textWhite} rounded-bl-lg rounded-tr-lg shadow-md`}
        >
          Popular
        </div>
      )}
      <div className="p-6 md:p-8 flex-grow flex flex-col">
        <div className="mb-6 text-center">
          <h2 className={`text-2xl font-semibold ${colors.textWhite} mb-2`}>
            {tier.name}
          </h2>
          <div className={`text-4xl font-bold ${colors.textWhite} mb-1`}>
            {tier.price}
            {tier.frequency && (
              <span className={`text-lg font-normal ${colors.textSecondary}`}>
                {tier.frequency}
              </span>
            )}
          </div>
          {tier.price === "Custom" && (
            <p className={`text-sm ${colors.textSecondary} h-5`}>
              Tailored to your scale
            </p>
          )}
          {tier.price !== "Custom" && (
            <p className={`text-sm ${colors.textSecondary} h-5`}>
              Billed{" "}
              {tier.frequency?.includes("month") ? "monthly" : "annually"}
            </p>
          )}
        </div>
        <p
          className={`text-base ${colors.textSecondary} mb-6 text-center min-h-[3em]`}
        >
          {tier.description}
        </p>
        <div className="mb-8 flex-grow pt-6 border-t border-slate-700/50">
          <h4
            className={`text-sm font-semibold ${colors.textSecondary} mb-4 text-center`}
          >
            Includes:
          </h4>
          <ul className="space-y-2.5">
            {highlights.map((feature, index) => (
              <li key={index} className="flex items-start">
                <FiCheckCircle
                  className={`w-5 h-5 ${colors.accentSuccess} mr-3 mt-0.5 flex-shrink-0`}
                  aria-hidden="true"
                />
                <span className={`${colors.textPrimary} text-sm`}>
                  {feature}
                </span>
              </li>
            ))}
            {tier.features.length > highlights.length && (
              <li className="flex items-start">
                <span className={`text-xs ${colors.textSecondary} ml-[32px]`}>
                  + and more...
                </span>
              </li>
            )}
          </ul>
        </div>
        <div className="mt-auto">
          <Button
            to={tier.ctaLink}
            variant={tier.popular ? "primary" : "secondary"}
            size="lg"
            className="w-full"
          >
            {tier.ctaText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
PricingCard.propTypes = {
  /* ... props definition ... */
}; // Keep PropTypes

// --- Reusable FAQ Item Component (Dark Theme Style) ---
const FAQItem = ({ faq }) => (
  <motion.div
    variants={fadeInUp}
    className={`p-6 rounded-lg ${colors.surfaceStrong} border ${colors.border} shadow-md`}
  >
    <h3 className={`text-lg font-semibold ${colors.textWhite} mb-2`}>
      {faq.question}
    </h3>
    <p className={`${colors.textSecondary} text-base`}>{faq.answer}</p>
  </motion.div>
);
FAQItem.propTypes = {
  /* ... props definition ... */
}; // Keep PropTypes
// --- Main Pricing Page Component ---
export default function Pricing() {
  // State for Hero Animation
  const [heroPhase, setHeroPhase] = useState("animating");
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const animationPhases = [
    "Unlock Value",
    "Transparent Pricing",
    "Modernization Scaled",
  ];
  const phaseDuration = 2000;
  const autoScrollDelay = 4000; // Wait 7 seconds after animation finishes

  // Refs for auto-scroll logic
  const autoScrollTimeoutRef = useRef(null);
  const interactionDetectedRef = useRef(false);

  // Function to scroll smoothly to the pricing tiers
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing-tiers");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      console.log("Auto-scrolling to pricing tiers.");
    }
  };

  // Handler to detect user interaction and cancel auto-scroll
  const handleInteraction = () => {
    if (!interactionDetectedRef.current) {
      console.log("User interaction detected, cancelling auto-scroll.");
      interactionDetectedRef.current = true;
      clearTimeout(autoScrollTimeoutRef.current);
    }
    // Optional: remove listeners after first interaction for performance
    // window.removeEventListener('scroll', handleInteraction);
    // window.removeEventListener('mousedown', handleInteraction);
    // window.removeEventListener('touchstart', handleInteraction);
    // window.removeEventListener('keydown', handleInteraction);
  };

  // Effect to manage interaction listeners
  useEffect(() => {
    // Add listeners when the component mounts
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("mousedown", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    // Cleanup: remove listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      clearTimeout(autoScrollTimeoutRef.current); // Clear timeout on unmount too
    };
  }, []); // Empty dependency array ensures this runs only once on mount/unmount

  // Effect to handle the animation sequence timing
  useEffect(() => {
    if (heroPhase === "animating") {
      const totalAnimationTime = animationPhases.length * phaseDuration;
      const phaseTimer = setInterval(() => {
        setCurrentPhaseIndex((prevIndex) => prevIndex + 1);
      }, phaseDuration);

      const completionTimer = setTimeout(() => {
        clearInterval(phaseTimer);
        setHeroPhase("complete"); // Transition to complete state
      }, totalAnimationTime);

      return () => {
        // Cleanup for this effect instance
        clearInterval(phaseTimer);
        clearTimeout(completionTimer);
      };
    }
  }, [heroPhase, animationPhases.length]); // Rerun if heroPhase changes

  // Effect to handle setting the auto-scroll timeout AFTER animation completes
  useEffect(() => {
    if (heroPhase === "complete") {
      // Reset interaction flag when animation completes
      interactionDetectedRef.current = false;
      console.log("Hero complete. Setting auto-scroll timeout.");

      // Clear any previous timeout just in case
      clearTimeout(autoScrollTimeoutRef.current);

      // Set the timeout to scroll down if no interaction occurs
      autoScrollTimeoutRef.current = setTimeout(() => {
        if (!interactionDetectedRef.current) {
          scrollToPricing();
        } else {
          console.log("Auto-scroll skipped due to prior interaction.");
        }
      }, autoScrollDelay);
    }

    // Cleanup timeout if heroPhase changes *before* timeout triggers
    return () => {
      clearTimeout(autoScrollTimeoutRef.current);
    };
  }, [heroPhase]); // Dependency: Run when heroPhase changes

  return (
    <div
      className={`${colors.background} ${colors.textSecondary} overflow-x-hidden`}
      role="main"
    >
      {/* --- Hero Section --- */}
      <motion.section
        className={`relative flex items-center justify-center min-h-screen overflow-hidden ${colors.background}`}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-slate-900 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10 py-10">
          <AnimatePresence mode="wait">
            {heroPhase === "animating" && (
              <motion.div
                key={currentPhaseIndex}
                variants={cycleTextVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center justify-center"
              >
                <h1
                  className={`text-4xl md:text-5xl font-bold ${colors.textWhite}`}
                >
                  {animationPhases[currentPhaseIndex % animationPhases.length]}
                </h1>
                <FiLoader
                  className={`w-6 h-6 ${colors.textHighlight} animate-spin mt-6`}
                />
              </motion.div>
            )}

            {heroPhase === "complete" && (
              <motion.div
                key="hero-content"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-center"
              >
                <motion.div
                  variants={scaleUp}
                  className={`inline-block p-4 ${colors.surface} rounded-full mb-4 border ${colors.border}`}
                >
                  <FiDollarSign className={`w-10 h-10 ${colors.accentBlue}`} />
                </motion.div>
                <motion.h1
                  variants={fadeInUp}
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colors.textWhite} mb-4 leading-tight`}
                >
                  Simple, Transparent Pricing
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className={`text-lg md:text-xl ${colors.textSecondary} max-w-3xl mx-auto mb-10`}
                >
                  Choose the plan that fits your modernization goals. Payments &
                  compliance by{" "}
                  <a
                    href="https://lemonsqueezy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium ${colors.accentBlue} hover:underline`}
                  >
                    Lemon Squeezy
                  </a>
                  .
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Scroll Down Indicator - Hidden on Mobile */}
        <AnimatePresence>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 sm:block" // Hidden below sm breakpoint
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.8, 1, 0.8] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
            >
              <FiChevronDown className="text-white/70 text-3xl" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* --- Pricing Tiers Section --- */}
      <motion.section
        id="pricing-tiers" // ID for scrolling target
        aria-labelledby="pricing-tiers-title"
        className="py-20 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={staggerContainer}
      >
        {/* ... Pricing Tiers content ... */}
        <div className="container mx-auto px-4">
          <motion.h2
            id="pricing-tiers-title"
            variants={fadeInUp}
            className={`text-3xl md:text-4xl font-bold ${colors.textWhite} text-center mb-16 md:mb-20`}
          >
            Choose Your Plan
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
          <motion.p
            variants={fadeInUp}
            className={`text-center ${colors.textSecondary} mt-12`}
          >
            Need a custom solution for large-scale enterprise needs?{" "}
            <Link
              to="/contact-sales"
              className={`font-medium ${colors.accentBlue} hover:underline`}
            >
              Contact our sales team
            </Link>
            .
          </motion.p>
        </div>
      </motion.section>

      {/* --- FAQ Section --- */}
      <motion.section
        aria-labelledby="faq-title"
        className={`py-20 md:py-28 ${colors.surfaceStrong} border-y ${colors.border}`}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={staggerContainer}
      >
        {/* ... FAQ content ... */}
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <FiHelpCircle
              className={`w-12 h-12 ${colors.accentBlue} opacity-80 mx-auto mb-4`}
            />
            <h2
              id="faq-title"
              className={`text-3xl md:text-4xl font-bold ${colors.textWhite} mb-4`}
            >
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Bottom CTA Section --- */}
      <motion.section
        aria-labelledby="bottom-cta-title"
        className={`py-20 md:py-28 ${colors.darkBgGradient} text-center`}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={fadeInUp}
      >
        {/* ... Bottom CTA content ... */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            variants={fadeInUp}
            id="bottom-cta-title"
            className={`text-3xl md:text-4xl font-bold ${colors.darkTextPrimary} mb-6 max-w-3xl mx-auto`}
          >
            Ready to Modernize with Confidence?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className={`text-lg ${colors.darkTextSecondary} max-w-2xl mx-auto mb-10`}
          >
            Select the plan that best suits your project or reach out to our
            team to discuss custom enterprise solutions.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              to="/request-demo"
              variant="primary"
              size="lg"
              icon={<FiArrowRight />}
            >
              Request a Demo
            </Button>
            <Button
              to="/contact-sales"
              variant="secondary"
              size="lg"
              className={`!text-blue-400 !border-2 !border-blue-500 !bg-transparent hover:!bg-blue-500/10`}
            >
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
