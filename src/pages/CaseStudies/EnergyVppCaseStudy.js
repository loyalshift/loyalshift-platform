// src/pages/CaseStudies/EnergyVppCaseStudy.js
// REFINED: Made content more generic for a template, client name parameterized.
// Case study page detailing a Virtual Power Plant (VPP) project.
// Uses LoyalShift Dark Theme.
// Current time: Monday, May 12, 2025 at 11:30 AM CST.

import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; // Import PropTypes
import {
  FiClock,
  FiTrendingUp,
  FiCheckCircle,
  FiZap, // Icon representing VPP/Energy
  FiArrowRight,
  FiDatabase, // Representing integration
  FiCpu, // Representing AI/Automation
  // FiMessageSquare, // For testimonial, can be added if needed
} from "react-icons/fi";

// Reusable Button component (ensure path is correct)
import Button from "../../components/Button";
import { createStaggerContainer } from "../../utils/animationVariants";

// --- Consistent Dark Theme Color Palette (Mirroring LandingPage.js) ---
const colors = {
  background: "bg-slate-900",
  surface: "bg-slate-800/70 backdrop-blur-sm", // Added backdrop-blur
  surfaceStrong: "bg-slate-800",
  primaryGradient: "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600",
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

// --- Animation Variants ---
const viewportOnce = { once: true, margin: "-15%" };
const sectionStagger = { visible: { transition: { staggerChildren: 0.1 } } };
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
const cardGridStagger = { visible: { transition: { staggerChildren: 0.1 } } };
const staggerContainer = createStaggerContainer();
// Removed redundant staggerContainer as sectionStagger serves the same purpose

// --- Main Case Study Page Component ---
// Added clientName prop for dynamic client display
export default function EnergyVppCaseStudy({
  clientName = "A Leading Energy Innovator",
}) {
  // Data for the Key Results section - This data is illustrative for a VPP project
  const keyResults = [
    {
      icon: (
        <FiClock className={`w-6 h-6 md:w-8 md:h-8 ${colors.accentBlue}`} />
      ), // Adjusted icon size
      metric: "~6 Months", // Use ~ for approximation
      description: "From Project Kickoff to Operational VPP Platform",
    },
    {
      icon: (
        <FiTrendingUp
          className={`w-6 h-6 md:w-8 md:h-8 ${colors.accentCyan}`}
        />
      ),
      metric: "Multi-MW", // More generic capacity
      description: "Initial Aggregated DER Capacity Managed",
    },
    {
      icon: (
        <FiCheckCircle
          className={`w-6 h-6 md:w-8 md:h-8 ${colors.accentGreen}`}
        />
      ),
      metric: "1M+",
      description: "Successful Grid Service Events Dispatched Post-Launch",
    },
  ];

  return (
    <div
      className={`${colors.background} ${colors.textSecondary} overflow-x-hidden`}
    >
      <motion.div
        className="container px-4 sm:px-6 mx-auto py-20 md:py-28" // Adjusted padding
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
            className={`inline-block mb-4 p-3 rounded-full ${colors.surfaceStrong} border ${colors.border}`} // Use surfaceStrong
          >
            <FiZap
              className={`w-10 h-10 md:w-12 md:h-12 ${colors.textHighlight}`}
            />
          </motion.div>
          <p
            className={`text-sm md:text-base font-semibold ${colors.textHighlight} uppercase tracking-wider mb-2`}
          >
            Energy Sector Case Study
          </p>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
          >
            {/* Use clientName prop dynamically */}
            {clientName} Launches Virtual Power Plant Capability with LoyalShift
          </h1>
          <p
            className={`text-lg md:text-xl ${colors.textSecondary} max-w-3xl mx-auto`}
          >
            Leveraging the LoyalShift Platform for rapid deployment and scalable
            distributed energy resource (DER) management.
          </p>
        </motion.section>

        {/* --- Key Results Highlights --- */}
        <motion.section
          className="mb-16 md:mb-20"
          variants={cardGridStagger} // Use cardGridStagger for the container
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {keyResults.map((result, index) => (
              <motion.div
                key={index}
                className={`${colors.surface} p-6 rounded-xl shadow-xl shadow-black/20 border ${colors.border} text-center backdrop-blur-md flex flex-col items-center`} // Added flex for centering icon
                variants={fadeInUp} // Each card fades up
                whileHover={{
                  y: -5,
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-3">
                  {" "}
                  {/* Icon is directly above metric */}
                  {result.icon}
                </div>
                <p
                  className={`text-3xl md:text-4xl font-bold ${colors.textWhite} mb-1`}
                >
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
          className={`${colors.surfaceStrong} p-6 sm:p-8 md:p-12 rounded-xl shadow-2xl shadow-black/30 border ${colors.border} mb-16 md:mb-20 backdrop-blur-md`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer} // Stagger children of this section
        >
          {/* The Challenge */}
          <motion.div className="mb-10" variants={fadeInUp}>
            <h2
              className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} mb-4 border-b pb-3 ${colors.borderAccent}`}
            >
              The Challenge: Rapidly Entering the VPP Market
            </h2>
            <p
              className={`text-base md:text-lg ${colors.textSecondary} mb-3 leading-relaxed`}
            >
              A leading clean energy solutions provider recognized the growing
              potential of Virtual Power Plants (VPPs) to leverage residential
              and commercial solar and battery assets. To capitalize on this,
              they needed to quickly deploy a robust platform capable of:
            </p>
            <ul
              className={`list-disc list-outside pl-5 space-y-2 text-base md:text-lg ${colors.textSecondary} mb-3`}
            >
              <li>
                Integrating diverse Distributed Energy Resources (DERs) from
                various manufacturers.
              </li>
              <li>
                Accurately forecasting energy generation and availability across
                numerous sites.
              </li>
              <li>
                Aggregating DER capacity reliably for grid service programs.
              </li>
              <li>
                Securely dispatching control signals during grid events within
                strict timeframes.
              </li>
              <li>
                Providing a scalable architecture for significant future growth
                in connected assets.
              </li>
            </ul>
            <p
              className={`text-base md:text-lg ${colors.textSecondary} leading-relaxed`}
            >
              Building such a complex system from scratch posed significant
              time-to-market risks. The provider required a strategic partner to
              deliver a production-ready solution swiftly without compromising
              performance or security.
            </p>
          </motion.div>

          {/* Our Solution */}
          <motion.div className="mb-10" variants={fadeInUp}>
            <h2
              className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} mb-4 border-b pb-3 ${colors.borderAccent}`}
            >
              LoyalShift's Solution: Accelerated VPP Platform Deployment
            </h2>
            <p
              className={`text-base md:text-lg ${colors.textSecondary} mb-3 leading-relaxed`}
            >
              LoyalShift deployed its configurable VPP & DERMS Orchestration
              Platform, providing the client with a comprehensive suite of
              tools. Key components included:
            </p>
            <ul
              className={`list-disc list-outside pl-5 space-y-2 text-base md:text-lg ${colors.textSecondary} mb-3`}
            >
              <li>
                <strong className={colors.textHighlight}>
                  Universal Adapter™:
                </strong>{" "}
                Enabled seamless onboarding of target DERs and telemetry data
                streams through pre-built and custom connectors.
              </li>
              <li>
                <strong className={colors.textHighlight}>
                  AI-Powered Forecasting:
                </strong>{" "}
                Leveraged machine learning for high-accuracy predictions of DER
                generation and state-of-charge.
              </li>
              <li>
                <strong className={colors.textHighlight}>
                  Aggregation & Dispatch Engine:
                </strong>{" "}
                Provided core logic for asset grouping and precise control for
                grid service participation.
              </li>
              <li>
                <strong className={colors.textHighlight}>
                  Secure Cloud Infrastructure:
                </strong>{" "}
                Deployed on a scalable, secure cloud environment meeting energy
                sector compliance needs.
              </li>
            </ul>
            <p
              className={`text-base md:text-lg ${colors.textSecondary} leading-relaxed`}
            >
              Utilizing LoyalShift's{" "}
              <strong className={colors.textHighlight}>
                Zero-Disruption Integration Framework
              </strong>
              , the platform was configured, tested with Smart Mirror™
              simulating production loads, and launched within the client's
              critical target window. This allowed for early customer enrollment
              and participation in grid programs.
            </p>
          </motion.div>

          {/* The Results */}
          <motion.div variants={fadeInUp}>
            <h2
              className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} mb-4 border-b pb-3 ${colors.borderAccent}`}
            >
              The Results: Market Entry Accelerated, Future-Proofed
            </h2>
            <ul
              className={`list-none pl-0 space-y-3 text-base md:text-lg ${colors.textSecondary}`}
            >
              {[
                "Core VPP operational capabilities launched within an aggressive timeframe, enabling early market entry.",
                "Successfully integrated and managed an initial multi-megawatt fleet capacity across distributed DERs.",
                "Enabled automated participation in over a million grid service events within the first operational quarter.",
                "Established a reliable and scalable platform foundation poised for significant expansion.",
                "Demonstrated LoyalShift's capability to rapidly configure and deploy complex energy orchestration solutions.",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start"
                >
                  <FiCheckCircle
                    className={`w-5 h-5 ${colors.accentGreen} mr-3 mt-1 flex-shrink-0`}
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.section>

        {/* --- Call to Action --- */}
        <motion.section
          className="text-center mt-12 md:mt-16" // Reduced top margin
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2
            className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} mb-4`}
          >
            Accelerate Your Energy Transition Strategy?
          </h2>
          <p
            className={`text-lg md:text-xl ${colors.textSecondary} max-w-3xl mx-auto mb-8`}
          >
            Learn how the LoyalShift platform can provide the speed,
            scalability, and features needed to achieve impactful results for
            your distributed energy programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              to="/contact?solution=vpp-derms"
              variant="primary"
              size="lg"
              icon={<FiArrowRight />}
            >
              Request VPP/DERMS Demo
            </Button>
            <Button
              to="/solutions"
              variant="secondary"
              size="lg"
              className={`!bg-slate-700/50 !border-slate-600 hover:!bg-slate-600/70 !text-slate-200`} // Custom secondary button style
            >
              Explore Our Solutions
            </Button>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

EnergyVppCaseStudy.propTypes = {
  clientName: PropTypes.string, // Client name is now a prop
};
