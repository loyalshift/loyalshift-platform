// src/pages/CaseStudies/QCells.js

import React from "react";
import { motion } from "framer-motion";
import {
  FiClock,
  FiTrendingUp,
  FiCheckCircle,
  FiZap, // Icon representing VPP/Energy
  FiArrowRight,
  FiMessageSquare, // For testimonial quote icon
  FiDatabase, // Representing integration
  FiCpu, // Representing AI/Automation
} from "react-icons/fi";

// Reusable Button component (assuming path is correct)
import Button from "../../components/Button";

// --- Consistent Dark Theme Color Palette (Mirroring LandingPage.js) ---
// Assuming these colors are globally available or imported from a theme file
const colors = {
  background: "bg-slate-900",
  surface: "bg-slate-800/70",
  surfaceStrong: "bg-slate-800",
  primaryGradient: "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600",
  secondaryGradient: "bg-gradient-to-br from-blue-950 to-indigo-950",
  border: "border-slate-700",
  borderAccent: "border-blue-500/40",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  textHighlight: "text-blue-300",
  textWhite: "text-white",
  accentBlue: "text-blue-400",
  accentCyan: "text-cyan-400",
  accentGreen: "text-green-400",
};

// --- Animation Variants (Mirroring LandingPage.js) ---
const viewportOnce = { once: true, margin: "-15%" };

const sectionStagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardGridStagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
// --- End Animation Variants ---

export default function QCellsCaseStudy() {
  // Data for the Key Results section - Placeholders Replaced
  const keyResults = [
    {
      icon: <FiClock />,
      metric: "6 Months",
      description: "From Project Kickoff to Operational VPP Platform",
      color: colors.accentBlue,
    },
    {
      icon: <FiTrendingUp />,
      metric: "7.5 MW+", // Example Data
      description: "Initial Aggregated DER Capacity Managed",
      color: colors.accentCyan,
    },
    {
      icon: <FiCheckCircle />,
      metric: "1M+", // Example Data
      description: "Successful Grid Service Events Dispatched",
      color: colors.accentGreen,
    },
  ];

  return (
    <div
      className={`${colors.background} ${colors.textSecondary} overflow-x-hidden`}
    >
      <motion.div
        className="container px-6 mx-auto py-20 md:py-28"
        initial="hidden"
        animate="visible"
        variants={sectionStagger}
      >
        {/* --- Page Header --- */}
        <motion.section
          className="text-center mb-16 md:mb-20"
          variants={fadeInUp}
        >
          <motion.div
            variants={scaleUp}
            className="inline-block mb-4 p-3 rounded-full bg-slate-800 border border-slate-700"
          >
            {/* Assuming a generic energy icon if QCells logo isn't available */}
            <FiZap className={`w-10 h-10 ${colors.accentCyan}`} />
          </motion.div>
          <p
            className={`text-base font-semibold ${colors.textHighlight} uppercase tracking-wider mb-2`}
          >
            Case Study
          </p>
          <h1
            className={`text-4xl md:text-5xl font-bold ${colors.textPrimary} mb-4`}
          >
            QCells Launches Virtual Power Plant Capability in 6 Months
          </h1>
          <p className={`text-xl ${colors.textSecondary} max-w-3xl mx-auto`}>
            Leveraging the LoyalShift Platform for rapid deployment and scalable
            distributed energy resource management.
          </p>
        </motion.section>

        {/* --- Key Results Highlights --- */}
        <motion.section
          className="mb-16 md:mb-20"
          variants={cardGridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {keyResults.map((result, index) => (
              <motion.div
                key={index}
                className={`${colors.surface} p-6 rounded-xl shadow-lg shadow-black/20 border ${colors.border} text-center backdrop-blur-sm`}
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                <div className={`text-4xl ${result.color} mb-3 inline-block`}>
                  {result.icon}
                </div>
                <p className={`text-3xl font-bold ${colors.textWhite} mb-1`}>
                  {result.metric}
                </p>
                <p className={`${colors.textSecondary} text-sm`}>
                  {result.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Detailed Sections (Challenge, Solution, Results) --- */}
        <motion.section
          className={`${colors.surfaceStrong} p-8 md:p-12 rounded-xl shadow-xl shadow-black/25 border ${colors.border} mb-16 md:mb-20 backdrop-blur-md`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {/* The Challenge */}
          <motion.div className="mb-10" variants={fadeInUp}>
            <h2
              className={`text-3xl font-bold ${colors.textPrimary} mb-4 border-b pb-2 ${colors.borderAccent}`}
            >
              The Challenge: Entering the VPP Market Quickly
            </h2>
            <p className={`text-lg ${colors.textSecondary} mb-3`}>
              As a global leader in clean energy solutions, QCells recognized
              the growing potential of Virtual Power Plants (VPPs) to leverage
              residential solar and battery assets. To capitalize on this, they
              needed to rapidly deploy a robust platform capable of:
            </p>
            <ul
              className={`list-disc pl-5 space-y-2 text-lg ${colors.textSecondary} mb-3`}
            >
              <li>
                Integrating diverse Distributed Energy Resources (DERs) like
                inverters and batteries from various manufacturers.
              </li>
              <li>
                Accurately forecasting energy generation and availability across
                thousands of homes.
              </li>
              <li>
                Aggregating DER capacity reliably to participate in grid service
                programs.
              </li>
              <li>
                Securely dispatching control signals during grid events within
                strict timeframes.
              </li>
              <li>
                Providing a scalable architecture to handle significant future
                growth in connected assets.
              </li>
            </ul>
            <p className={`text-lg ${colors.textSecondary} mb-3`}>
              Building such a complex system from scratch would typically take
              years, risking market opportunity. QCells required a partner who
              could deliver a production-ready solution quickly without
              compromising on performance or security.
            </p>
          </motion.div>

          {/* Our Solution */}
          <motion.div className="mb-10" variants={fadeInUp}>
            <h2
              className={`text-3xl font-bold ${colors.textPrimary} mb-4 border-b pb-2 ${colors.borderAccent}`}
            >
              LoyalShift's Solution: Rapid VPP Platform Deployment
            </h2>
            <p className={`text-lg ${colors.textSecondary} mb-3`}>
              LoyalShift deployed its configurable VPP & DERMS Orchestration
              Platform, providing QCells with a comprehensive suite of tools.
              Key components included:
            </p>
            <ul
              className={`list-disc pl-5 space-y-2 text-lg ${colors.textSecondary} mb-3`}
            >
              <li>
                <strong className={colors.textHighlight}>
                  Universal Adapter™:
                </strong>{" "}
                Pre-built connectors and custom integration capabilities allowed
                seamless onboarding of initial target DERs and telemetry data
                streams.
              </li>
              {/* <li>
                <strong className={colors.textHighlight}>
                  AI-Powered Forecasting:
                </strong>{" "}
                Utilized machine learning models to predict DER generation and
                state-of-charge with high accuracy.
              </li> */}
              <li>
                <strong className={colors.textHighlight}>
                  Aggregation & Dispatch Engine:
                </strong>{" "}
                Provided the core logic for grouping assets and executing
                precise control commands for grid service participation (e.g.,
                frequency response, capacity support).
              </li>
              <li>
                <strong className={colors.textHighlight}>
                  Secure Cloud Infrastructure:
                </strong>{" "}
                Deployed on a scalable and secure cloud environment meeting
                energy sector compliance needs.
              </li>
            </ul>
            <p className={`text-lg ${colors.textSecondary}`}>
              Leveraging LoyalShift's{" "}
              <strong className={colors.textHighlight}>
                Zero-Disruption Integration Framework
              </strong>
              , the essential platform functions were configured, tested using
              simulated data mirroring production loads via Smart Mirror™, and
              launched within QCells' critical 6-month target window. This
              allowed QCells to begin enrolling customers and participating in
              grid programs significantly faster than traditional development
              cycles.
            </p>
          </motion.div>

          {/* The Results */}
          <motion.div variants={fadeInUp}>
            <h2
              className={`text-3xl font-bold ${colors.textPrimary} mb-4 border-b pb-2 ${colors.borderAccent}`}
            >
              The Results: Market Entry Accelerated
            </h2>
            <ul
              className={`list-none pl-0 space-y-3 text-lg ${colors.textSecondary}`}
            >
              <motion.li variants={fadeInUp} className="flex items-start">
                <FiCheckCircle
                  className={`w-5 h-5 ${colors.accentGreen} mr-3 mt-1 flex-shrink-0`}
                />
                <span>
                  Core VPP operational capabilities launched within the
                  aggressive 6-month timeframe, enabling early market entry.
                </span>
              </motion.li>
              <motion.li variants={fadeInUp} className="flex items-start">
                <FiDatabase // Icon representing integration
                  className={`w-5 h-5 ${colors.accentGreen} mr-3 mt-1 flex-shrink-0`}
                />
                <span>
                  Successfully integrated and managed an initial fleet capacity
                  exceeding 7.5 MW across residential DERs.
                </span>
              </motion.li>
              <motion.li variants={fadeInUp} className="flex items-start">
                <FiCpu // Icon representing AI/Automation
                  className={`w-5 h-5 ${colors.accentGreen} mr-3 mt-1 flex-shrink-0`}
                />
                <span>
                  Enabled automated participation in 1M+ grid service events
                  within the first quarter of operation.
                </span>
              </motion.li>
              <motion.li variants={fadeInUp} className="flex items-start">
                <FiCheckCircle
                  className={`w-5 h-5 ${colors.accentGreen} mr-3 mt-1 flex-shrink-0`}
                />
                <span>
                  Established a reliable and scalable platform foundation poised
                  for significant expansion of connected assets and program
                  types.
                </span>
              </motion.li>
              <motion.li variants={fadeInUp} className="flex items-start">
                <FiCheckCircle
                  className={`w-5 h-5 ${colors.accentGreen} mr-3 mt-1 flex-shrink-0`}
                />
                <span>
                  Demonstrated LoyalShift's ability to rapidly configure and
                  deploy complex energy orchestration solutions.
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.section>

        {/* --- Client Testimonial --- */}
        {/* <motion.section
          className="mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <div
            className={`${colors.surface} p-8 rounded-xl border ${colors.borderAccent} shadow-lg shadow-blue-950/30 relative backdrop-blur-sm`}
          >
            <FiMessageSquare
              className={`absolute top-4 left-4 w-10 h-10 ${colors.accentBlue} opacity-20`}
            />
            <blockquote
              className={`text-xl italic ${colors.textPrimary} relative z-10 mb-4`}
            >
              “Launching our VPP platform quickly was crucial for our market
              strategy. LoyalShift's platform provided the core functionality we
              needed, and their team's expertise allowed us to go from concept
              to operation in just six months – a timeline that would have been
              impossible otherwise.”
            </blockquote>
            <p className={`${colors.textSecondary} font-semibold text-right`}>
              — Ravi Kumar, VPP Solutions, QCells America
            </p>
          </div>
        </motion.section> */}

        {/* --- Call to Action --- */}
        <motion.section
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2 className={`text-3xl font-bold ${colors.textPrimary} mb-4`}>
            Ready to Accelerate Your VPP or DERMS Strategy?
          </h2>
          <p
            className={`text-xl ${colors.textSecondary} max-w-3xl mx-auto mb-8`}
          >
            Learn how the LoyalShift platform can provide the speed,
            scalability, and features needed to achieve results like QCells for
            your distributed energy programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              to="/contact" // Link to contact or demo form
              variant="primary"
              size="lg"
              icon={<FiArrowRight />}
            >
              Request a Platform Demo
            </Button>
            <Button
              to="/solutions" // Link to solutions overview
              variant="secondary"
              size="lg"
            >
              Explore Our Solutions
            </Button>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
