// src/pages/LandingPage.js

import React, { Suspense } from "react"; // Removed useRef, Added Suspense
import {
  FiArrowRight,
  FiPhone,
  FiTrendingUp,
  FiDollarSign,
  FiClock,
  FiShield,
  FiStar,
  FiPlay,
} from "react-icons/fi";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { solarData } from "../../data/clients";

// --- Reusable Components (Ensure paths are correct) ---
import Hero from "./sections/Hero"; // Your Hero component (with mobile adjustments)
import FeatureCard from "../../components/FeatureCard";
import StatCard from "../../components/StatCard";
import StyledOutlineButton from "../../components/StyledOutlineButton";

// --- Consistent Dark Theme Color Palette ---
// Defined here for completeness, ideally integrate into tailwind.config.js
const colors = {
  background: "bg-slate-900",
  surface: "bg-slate-800/70",
  surfaceHover: "hover:bg-slate-700/90",
  surfaceStrong: "bg-slate-800",
  primaryGradient: "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600",
  primaryHover: "hover:from-blue-400 hover:via-cyan-400 hover:to-blue-500",
  secondaryGradient: "bg-gradient-to-br from-blue-950 to-indigo-950",
  border: "border-slate-700",
  borderAccent: "border-blue-500/40",
  borderHover: "hover:border-blue-400/70",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  textHighlight: "text-blue-300",
  textWhite: "text-white",
  accentBlue: "text-blue-400",
  accentCyan: "text-cyan-400",
  accentGreen: "text-green-400",
  accentYellow: "text-yellow-400",
  inputBg: "bg-slate-700/50",
  inputFocusRing: "focus:ring-blue-500/70",
  bgBase: "bg-neutral-light",
  tagBackground: "bg-blue-500/10", // For case study tags
  tagText: "text-blue-300", // For case study tags
};

// --- Loading Placeholder for Hero ---
const HeroPlaceholder = () => (
  <div className="relative h-screen min-h-[750px] md:min-h-[800px] flex items-center justify-center bg-slate-900">
    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);
// --- End Loading Placeholder ---

// --- Animation Variants ---
const viewportOnce = { once: true, margin: "-15%" };
const sectionStagger = { visible: { transition: { staggerChildren: 0.1 } } };
const cardGridStagger = { visible: { transition: { staggerChildren: 0.1 } } };
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
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
}; // Add slide-in
const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
}; // Add slide-in

// --- End Animation Variants ---

// --- Main Landing Page Component ---
export function LandingPage() {
  // Data for sections
  const featuresData = [
    {
      icon: "FiDatabase",
      title: "Unified Data Access",
      description:
        "Connect 200+ legacy & modern sources via pre-built & custom adapters.",
    },
    {
      icon: "FiZap",
      title: "Zero-Disruption Ops",
      description:
        "Modernize critical systems without downtime or impacting daily business flow.",
    },
    {
      icon: "FiShield",
      title: "Bank-Grade Security",
      description:
        "Ensure compliance with SOC2, HIPAA, & GDPR standards. E2E encryption.",
    },
    {
      icon: "FiBarChart2",
      title: "Guaranteed ROI",
      description:
        "Achieve 65%+ efficiency gains and significant cost savings within months.",
    },
  ];

  return (
    <div className={`${colors.background} overflow-x-hidden`}>
      {/* =========================================== */}
      {/* === Hero Section with Suspense Wrapper === */}
      {/* =========================================== */}
      <Suspense fallback={<HeroPlaceholder />}>
        <Hero />
      </Suspense>
      {/* =========================================== */}

      {/* --- Trust Indicators Section (Optional - Remains Commented) --- */}
      {/* <section className="py-12 bg-slate-800"> ... </section> */}

      {/* --- Features Section --- */}
      <section
        aria-labelledby="features-title"
        className={`py-24 ${colors.background} relative overflow-hidden`} // Using py-24 for adjusted spacing
      >
        {/* Background decorative elements */}
        <div
          className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-blue-900/5 via-transparent to-transparent -translate-x-1/4 opacity-30 blur-3xl"
          aria-hidden="true"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-1/4 h-1/3 bg-gradient-to-tl from-cyan-900/5 via-transparent to-transparent translate-x-1/4 opacity-30 blur-3xl"
          aria-hidden="true"
        ></div>

        <div className="container relative z-10 px-4 sm:px-6 mx-auto">
          {/* Section Title Block */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={sectionStagger}
          >
            <motion.h2
              id="features-title"
              variants={skewFadeInUp}
              className={`text-base font-semibold ${colors.textHighlight} uppercase tracking-wider`}
            >
              Core Platform
            </motion.h2>
            <motion.p
              variants={skewFadeInUp}
              className={`mt-2 text-3xl font-bold tracking-tight ${colors.textPrimary} sm:text-4xl`}
            >
              Unlock Value Trapped in Legacy Systems
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className={`mt-4 max-w-3xl text-lg md:text-xl ${colors.textSecondary} lg:mx-auto`}
            >
              Address core issues that hinder growth and drain resources,
              turning constraints into opportunities.
            </motion.p>
          </motion.div>

          {/* FeatureCard Mapping */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={cardGridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {featuresData.map((feature, index) => (
              <FeatureCard key={index} index={index} {...feature} />
            ))}
          </motion.div>
        </div>
      </section>

      <motion.section
        aria-labelledby="vpp-strategy-spotlight-title"
        className="py-16 md:py-20 bg-slate-900" // Consistent padding, dark background
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce} // Make sure viewportOnce is defined
        variants={sectionStagger} // Make sure sectionStagger is defined
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={fadeInUp}
          >
            {" "}
            {/* Ensure fadeInUp is defined */}
            <h2
              id="vpp-strategy-spotlight-title"
              className={`text-base font-semibold ${colors.textHighlight} uppercase tracking-wider mb-3`}
            >
              VPP Enterprise Strategy
            </h2>
            <p
              className={`text-3xl md:text-4xl font-bold tracking-tight ${colors.textPrimary} sm:text-4xl mb-4`}
            >
              {solarData.title}
            </p>
            <p
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-3xl mx-auto`}
            >
              Discover how LoyalShift empowers Virtual Power Plant operators to
              navigate market complexities and scale efficiently.
            </p>
          </motion.div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column: Image */}
            <motion.div
              variants={slideInLeft} // Ensure slideInLeft is defined
              className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden shadow-2xl shadow-black/30 border-2 border-slate-700 group"
            >
              <img
                src={solarData.img}
                alt="Virtual Power Plant and Distributed Energy Resources" // More generic alt text
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 group-hover:opacity-50 transition-opacity duration-300"></div>
              <span
                className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
                  colors.tagBackground || "bg-blue-500/10"
                } ${colors.tagText || "text-blue-300"} shadow-sm`}
              >
                {solarData.industry}
              </span>
            </motion.div>

            {/* Right Column: Text Details */}
            <motion.div variants={slideInRight}>
              {" "}
              {/* Ensure slideInRight is defined */}
              <h3
                className={`text-2xl font-semibold ${colors.textPrimary} mb-3`}
              >
                The Core Challenge for VPPs
              </h3>
              <p
                className={`${colors.textSecondary} mb-6 text-lg leading-relaxed`}
              >
                {solarData.challenge}
              </p>
              <h3
                className={`text-2xl font-semibold ${colors.textPrimary} mb-3`}
              >
                LoyalShift's Strategic Solution
              </h3>
              <p
                className={`${colors.textSecondary} mb-6 text-lg leading-relaxed`}
              >
                {solarData.solution}
              </p>
              {/* Key Result Highlight */}
              <div
                className={`p-6 rounded-lg ${
                  colors.surface || "bg-slate-800/70"
                } border ${
                  colors.borderAccent
                } mb-8 shadow-lg backdrop-blur-sm`}
              >
                <p
                  className={`text-sm font-medium ${colors.accentGreen} uppercase tracking-wider mb-1`}
                >
                  Key Strategic Outcome
                </p>
                <p className={`text-3xl font-bold ${colors.textWhite}`}>
                  {solarData.result}
                </p>
              </div>
              {/* Optional Generic Quote */}
              {solarData.quote && (
                <blockquote
                  className={`relative text-lg italic ${colors.textSecondary} border-l-4 ${colors.borderAccent} pl-4 mb-8`}
                >
                  "{solarData.quote}"
                  <footer
                    className={`text-sm not-italic ${colors.textSecondary} mt-2`}
                  >
                    - Industry Leader
                  </footer>
                </blockquote>
              )}
              {/* Updated CTA Button */}
              <StyledOutlineButton
                to={solarData.link} // Link to the VPP strategy page
                icon={<FiArrowRight />} // Changed icon to FiArrowRight for "Learn More"
                // Using default cyan outline colors from StyledOutlineButton, or customize as needed:
                // textColorClass="text-cyan-400"
                // borderColorClass="border-cyan-400"
                // hoverBgClass="hover:bg-cyan-400/10"
                // hoverTextColorClass="hover:text-cyan-300"
                // hoverBorderColorClass="hover:border-cyan-300"
                size="lg" // Keep size large
              >
                Learn About Our VPP Strategy
              </StyledOutlineButton>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- ROI Highlights Section --- */}
      <section
        aria-labelledby="roi-title"
        className={`py-28 relative overflow-hidden ${colors.background}`}
      >
        {/* Background elements */}
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-blue-600/10 blur-2xl"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-2/5 h-2/5 rounded-full bg-cyan-600/10 blur-2xl"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        />

        {/* Container for ROI content */}
        <motion.div
          className="container relative z-10 px-4 sm:px-6 mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionStagger}
        >
          {/* ROI Section Title Block */}
          <div className="text-center mb-16">
            <motion.h2
              id="roi-title"
              variants={skewFadeInUp}
              className={`text-base font-semibold ${colors.textHighlight} uppercase tracking-wider`}
            >
              Tangible Results
            </motion.h2>
            <motion.p
              variants={skewFadeInUp}
              className={`mt-2 text-3xl font-bold tracking-tight ${colors.textPrimary} sm:text-4xl`}
            >
              Unlock Measurable Business Value
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className={`mt-4 max-w-3xl text-lg md:text-xl ${colors.textSecondary} lg:mx-auto`}
            >
              Our clients typically see significant returns quickly by
              automating processes and connecting systems effectively.
            </motion.p>
          </div>

          {/* StatCard Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
            variants={cardGridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <StatCard
              icon={<FiTrendingUp />}
              value="65-85"
              suffix="%"
              label="Average Efficiency Gain"
              index={0}
            />
            <StatCard
              icon={<FiDollarSign />}
              value="250k"
              suffix="+"
              label="Typical Annual Savings (Year 1)"
              index={1}
            />
            <StatCard
              icon={<FiClock />}
              value="<6"
              suffix=" Mths"
              label="Average Payback Period"
              index={2}
            />
          </motion.div>

          {/* Final CTA Block within ROI Section */}
          <motion.div
            className="text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="relative inline-block max-w-2xl">
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-3 -left-3 w-4 h-4 rounded-full bg-cyan-400/30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-blue-400/30"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              {/* Main content */}
              <motion.p
                className={`${colors.textSecondary} mb-6 text-lg relative z-10`}
                whileHover={{ color: colors.textPrimary }}
                transition={{ duration: 0.3 }}
              >
                Get a precise analysis tailored to your specific operational
                costs and legacy systems.
              </motion.p>
              {/* Button */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <StyledOutlineButton
                  to="/contact"
                  icon={<FiPhone className="group-hover:animate-pulse" />}
                >
                  Request Custom ROI Analysis
                </StyledOutlineButton>
              </motion.div>
              {/* Trust indicator */}
              <motion.div
                className="mt-4 text-xs text-slate-500 flex items-center justify-center gap-2"
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
              >
                <FiShield className="text-green-400" />
                <span>All data remains confidential and secure</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

// Export Default
export default LandingPage;

// Define PropTypes for child components if not done in their own files
// This helps with documentation and catching errors
HeroPlaceholder.propTypes = {}; // If it takes no props
StatCard.propTypes = {
  // Example, adjust based on actual StatCard props
  icon: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  suffix: PropTypes.string,
};
FeatureCard.propTypes = {
  // Example, adjust based on actual FeatureCard props
  icon: PropTypes.string.isRequired, // Assuming it takes icon name string
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  index: PropTypes.number,
};
// Button component should have its own PropTypes defined within its file
