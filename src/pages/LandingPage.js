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
} from "react-icons/fi";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// --- Reusable Components (Ensure paths are correct) ---
import Button from "../components/Button";
import Hero from "./LandingPage/sections/Hero"; // Your Hero component (with mobile adjustments)
import FeatureCard from "../components/FeatureCard";
import StatCard from "../components/StatCard";
import { qcellsData } from "../data/clients";

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

  const caseStudiesData = [
    {
      title: "Insurance Claims Automation",
      result: "75% faster claims resolution",
      id: 2,
      img: "/images/server-room.jpg",
      industry: "Insurance",
      excerpt: "Automated claims intake and validation...",
    }, // Update img path
    {
      title: "Retail Inventory Sync",
      result: "$3M inventory cost reduction",
      id: 3,
      img: "/images/legacy-systems-hero.jpg",
      industry: "Retail",
      excerpt: "Real-time inventory sync between systems...",
    }, // Update img path
    {
      title: "QCells VPP Platform Launch",
      result: "Operational VPP in 6 Months",
      id: "qcells",
      img: "/images/qcells-panels.jpg",
      industry: "Energy",
      excerpt: "Rapidly deployed a scalable VPP platform...",
    }, // Update img path
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
        aria-labelledby="client-spotlight-title"
        className="py-10" // Consistent padding
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionStagger}
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Title */}
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2
              id="client-spotlight-title"
              className={`text-base font-semibold ${colors.textHighlight} uppercase tracking-wider mb-3`}
            >
              Client Spotlight
            </h2>
            <p
              className={`text-3xl md:text-4xl font-bold tracking-tight ${colors.textPrimary} sm:text-4xl mb-4`}
            >
              {qcellsData.title}
            </p>
            <p
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-3xl mx-auto`}
            >
              See how LoyalShift enabled rapid market entry and scalable energy
              management for a global leader.
            </p>
          </motion.div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column: Image */}
            <motion.div
              variants={slideInLeft}
              className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden shadow-2xl shadow-black/30 border-2 border-slate-700 group"
            >
              <img
                src={qcellsData.img}
                alt="QCells Solar Panels and Energy Storage"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
              <span
                className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${colors.tagBackground} ${colors.tagText} shadow-sm`}
              >
                {qcellsData.industry}
              </span>
            </motion.div>

            {/* Right Column: Text Details */}
            <motion.div variants={slideInRight}>
              <h3
                className={`text-2xl font-semibold ${colors.textPrimary} mb-3`}
              >
                The Challenge
              </h3>
              <p
                className={`${colors.textSecondary} mb-6 text-lg leading-relaxed`}
              >
                {qcellsData.challenge}
              </p>

              <h3
                className={`text-2xl font-semibold ${colors.textPrimary} mb-3`}
              >
                Our Solution
              </h3>
              <p
                className={`${colors.textSecondary} mb-6 text-lg leading-relaxed`}
              >
                {qcellsData.solution}
              </p>

              {/* Key Result Highlight */}
              <div
                className={`p-6 rounded-lg ${colors.surface} border ${colors.borderAccent} mb-8 shadow-lg`}
              >
                <p
                  className={`text-sm font-medium ${colors.accentGreen} uppercase tracking-wider mb-1`}
                >
                  Key Result
                </p>
                <p className={`text-3xl font-bold ${colors.textWhite}`}>
                  {qcellsData.result}
                </p>
              </div>

              {/* Optional Quote */}
              {qcellsData.quote && (
                <blockquote
                  className={`relative text-lg italic ${colors.textSecondary} border-l-4 ${colors.borderAccent} pl-4 mb-8`}
                >
                  "{qcellsData.quote}"
                </blockquote>
              )}

              {/* CTA Button */}
              <Button
                to={qcellsData.link}
                variant="primary"
                size="lg"
                icon={<FiArrowRight />}
                className="group" // Add group for potential icon animation on hover
              >
                Read Full QCells Case Study
              </Button>
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
                <Button
                  to="/contact"
                  variant="primary"
                  icon={<FiPhone className="group-hover:animate-pulse" />}
                  size="lg"
                  className="group relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Request Custom ROI Analysis
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        repeatDelay: 3,
                      }}
                    >
                      <FiArrowRight className="w-4 h-4" />
                    </motion.span>
                  </span>
                </Button>
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
