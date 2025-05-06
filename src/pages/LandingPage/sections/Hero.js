// src/pages/LandingPage/sections/Hero.js

import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiPlay, FiChevronDown, FiCheck } from "react-icons/fi";
import PropTypes from "prop-types"; // Import PropTypes if using them

// --- Reusable Components (Ensure paths are correct) ---
import Button from "../../../components/Button"; // Adjusted path
import StyledOutlineButton from "../../../components/StyledOutlineButton";
// --- Lazy load heavy components ---
// Ensure these components are exported as default from their respective files
const HeroAnimation = lazy(() => import("../../../components/HeroAnimation")); // Adjusted path
const MeshGradientBackground = lazy(() =>
  import("../../../components/MeshGradientBackground")
); // Adjusted path

// --- Consistent Dark Theme Color Palette ---
// Defined here for completeness, ideally integrate into tailwind.config.js
const colors = {
  background: "bg-slate-900",
  surface: "bg-slate-800/70", // Used for cycling item background
  surfaceHover: "hover:bg-slate-700/90",
  surfaceStrong: "bg-slate-800",
  primaryGradient: "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600",
  primaryHover: "hover:from-blue-400 hover:via-cyan-400 hover:to-blue-500",
  secondaryGradient: "bg-gradient-to-br from-blue-950 to-indigo-950",
  border: "border-slate-700", // Used for cycling item border
  borderAccent: "border-blue-500/40",
  borderHover: "hover:border-blue-400/70",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400", // Used for cycling item text
  textHighlight: "text-blue-300",
  textWhite: "text-white",
  accentBlue: "text-blue-400",
  accentCyan: "text-cyan-400",
  accentGreen: "text-green-400", // Used for check icon
  accentYellow: "text-yellow-400",
  inputBg: "bg-slate-700/50",
  inputFocusRing: "focus:ring-blue-500/70",
};

// --- Animation Variants ---
const sectionStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const skewFadeInUp = {
  hidden: { opacity: 0, y: 40, skewY: 2 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
// Variant specifically for the cycling text item
const cycleItemVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } },
};
// --- End Animation Variants ---

// --- Placeholder Components for Suspense ---
const MeshGradientPlaceholder = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 opacity-50" />
);
const HeroAnimationPlaceholder = () => (
  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);
// --- End Placeholders ---

// Data for the cycling list
const heroListItems = [
  "Guaranteed ROI",
  "65-85% Efficiency Gains",
  "Enterprise Security",
  "Zero Downtime Migration",
  "Real-time Data Sync",
  "200+ Connectors",
];

// =====================================================
// === Mobile Detection Placeholder/Example        ===
// =====================================================
// Proper implementation requires a hook like useMediaQuery or window resize listener
const useIsMobile = (breakpoint = 768) => {
  // 768px is typical 'md' breakpoint
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);
  return isMobile;
};
// =====================================================

export default function Hero() {
  const isMobile = useIsMobile(); // Detect if mobile

  // Skip initial complex animation on mobile? Set complete immediately.
  const [heroComplete, setHeroComplete] = useState(false);

  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  // Effect to cycle through items after hero animation completes (or immediately on mobile)
  useEffect(() => {
    if (!heroComplete) return;
    const intervalId = setInterval(() => {
      setCurrentItemIndex(
        (prevIndex) => (prevIndex + 1) % heroListItems.length
      );
    }, 3000); // Change item every 3 seconds
    return () => clearInterval(intervalId);
  }, [heroComplete, heroListItems.length]);

  // Define Desktop and Mobile Texts for Sub-headline
  const desktopSubheadline = (
    <>
      LoyalShift's <span className={colors.textHighlight}>explainable AI</span>{" "}
      works <span className={colors.textHighlight}>alongside</span> your
      existing infrastructure, transforming operations into agile, future-proof
      systems—
      <span className={colors.textHighlight}>
        without costly replacements or downtime
      </span>
      .
    </>
  );

  const sizeLgClasses = "px-7 py-3.5 text-base";

  // Define your desired mobile-specific text here
  const mobileSubheadline =
    "LoyalShift's AI works with your current systems for safe, effective modernization.";

  return (
    <section className="relative h-screen min-h-[750px] md:min-h-[800px] overflow-hidden">
      {/* Background */}
      <Suspense fallback={<MeshGradientPlaceholder />}>
        <motion.div className="absolute inset-0 z-0">
          {/* Conditionally disable background animation on mobile for performance */}
          <MeshGradientBackground animate={!isMobile && !heroComplete} />
        </motion.div>
      </Suspense>

      {/* Initial Animation - Conditionally skip on mobile */}
      {!heroComplete && (
        <Suspense fallback={<HeroAnimationPlaceholder />}>
          <HeroAnimation onComplete={() => setHeroComplete(true)} />
        </Suspense>
      )}

      {/* Main Hero Content */}
      <AnimatePresence>
        {heroComplete && (
          <motion.div
            className="relative h-full flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: isMobile ? 0.1 : 0.2 }}
          >
            {/* Container with responsive padding */}
            <div className="container px-4 sm:px-6 text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionStagger}
                className="relative"
              >
                {/* Decorative Dots (Hidden on mobile) */}
                <motion.div
                  className="absolute -top-4 -left-4 w-3 h-3 rounded-full bg-cyan-400/30 hidden md:block"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-4 h-4 rounded-full bg-blue-400/30 hidden md:block"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />

                {/* Headline with Responsive Text Size & Margin */}
                <motion.h1
                  className={`text-4xl sm:text-5xl md:text-6xl font-bold ${colors.textWhite} mb-4 md:mb-6 leading-tight`}
                  variants={skewFadeInUp}
                >
                  AI Modernization Without the{" "}
                  <span className={colors.textHighlight}>
                    Migration Nightmare
                  </span>
                </motion.h1>

                {/* Sub-headline with Conditional Text & Responsive Styles */}
                <motion.p
                  className={`text-lg md:text-xl lg:text-2xl ${colors.textSecondary} max-w-3xl mx-auto mb-6 md:mb-10`}
                  variants={skewFadeInUp} // Using skewFadeInUp for consistency with H1
                >
                  {isMobile ? mobileSubheadline : desktopSubheadline}
                </motion.p>

                {/* Animated Text Cycle */}
                {/* Animated Text Cycle - REVISED STYLING */}
                {/* Container div - Ensure its min-height is sufficient or removed if fixed height isn't needed */}
                <div className="flex items-center justify-center mb-10 md:mb-16 text-center min-h-[4.5rem] sm:min-h-[5rem]">
                  {" "}
                  {/* Adjusted min-height */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItemIndex} // Key change triggers animation
                      // --- UPDATED STYLING ---
                      className={`
                flex justify-center items-center 
                p-4 px-6 sm:p-5 sm:px-8 
                rounded-xl 
                shadow-lg
                ${colors.surfaceStrong} 
                border ${colors.borderAccent} 
                w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 
                text-center 
            `}
                      // --- End UPDATED STYLING ---
                      variants={cycleItemVariant} // Keep existing animation logic
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {/* Icon removed based on your provided snippet */}
                      <span
                        // --- UPDATED STYLING ---
                        className={`
                    ${colors.textPrimary} /* Text Color: Changed to primary */
                    text-lg sm:text-xl md:text-2xl /* Text Size: Increased */
                    font-medium /* Font Weight: Added emphasis */
                `}
                        // --- End UPDATED STYLING ---
                      >
                        {heroListItems[currentItemIndex]}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  variants={fadeInUp} // Keep entrance animation
                >
                  {/* --- Bright Primary Button --- */}
                  <Button
                    to="/request-demo"
                    // variant="primary" // Remove default variant
                    icon={<FiArrowRight />}
                    size="lg" // Keep size large
                    className={`w-full sm:w-auto ${sizeLgClasses} bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-all duration-300 ease-out flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-cyan-500/40 transform hover:-translate-y-0.5`}
                    // Inherit whileHover/whileTap from Button component or define here if needed
                  >
                    Request Personalized Demo
                  </Button>

                  {/* --- Bright Outline Button --- */}
                  <StyledOutlineButton to="/demo">
                    Watch Demo
                  </StyledOutlineButton>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Down Indicator - Hidden on Mobile */}
      <AnimatePresence>
        {heroComplete && (
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block" // Hidden below sm breakpoint
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
        )}
      </AnimatePresence>
    </section>
  );
}

// Define PropTypes for Hero component if it accepts any props
// Since it doesn't currently accept props like yBgSlow, it might be empty or removed
Hero.propTypes = {
  // Add any props Hero accepts here
};
