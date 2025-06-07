// src/pages/CaseStudiesPage.js

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiZap,
  FiArrowRight,
  FiCheckCircle,
  FiCpu,
  FiMessageSquare,
  // Removed unused icons like FiHeart, FiGitMerge, FiDatabase, FiSliders, FiLock, FiTool, FiTrendingUp
} from "react-icons/fi";

import Button from "../components/Button"; // Adjust path if needed
import loyalShiftV2Theme from "../themes/loyalshift-v2.theme"; // Using V2 theme

const theme = loyalShiftV2Theme; // Using the imported V2 theme

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.2 };

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
// --- End Animation Variants ---

// --- Case Study Data (ensure icon components are imported) ---
const caseStudiesData = [
  {
    id: "autonomous-operations-engine",
    industry: "Strategic Initiative (All Industries)",
    icon: FiCpu, // Ensure FiCpu is imported
    clientName: "Your Enterprise",
    title: "Co-Create Your Autonomous Operations Engine",
    challenge:
      "Enterprises in critical sectors require AI-driven automation but face hurdles with data security, legacy system integration, and the need for on-premise, air-gapped solutions.",
    solutionHighlight:
      "Partner with LoyalShift to design and deploy a bespoke, on-premise Autonomous Operations Engine (AOE). Leverage our core technologies like CipherCore™ (secure AI) and Universal Adapter™ (internal mode).",
    result: "Build Your AI-Powered Future, Securely",
    resultIcon: FiMessageSquare, // Ensure FiMessageSquare is imported
    link: "/case-studies/autonomous-operations-engine",
    isStrategicInitiative: true,
  },
  {
    id: "energy-solar-vpp",
    industry: "Energy",
    icon: FiZap, // Ensure FiZap is imported
    clientName: "Solar Inc.", // Example Client
    title: "Launching a Virtual Power Plant (VPP)",
    challenge:
      "Needed to rapidly deploy a scalable platform to manage distributed energy resources (DERs) for grid services.",
    solutionHighlight:
      "Leveraged LoyalShift's configurable VPP & DERMS Orchestration Platform.",
    result: "Operational VPP in 6 Months",
    resultIcon: FiCheckCircle, // Ensure FiCheckCircle is imported
    link: "/case-studies/vpp-strategy", // Make sure this route exists
  },
];

// Group studies by industry
const studiesByIndustry = caseStudiesData.reduce((acc, study) => {
  const industry = study.industry;
  if (!acc[industry]) {
    acc[industry] = {
      icon: study.icon,
      studies: [],
    };
  }
  acc[industry].studies.push(study);
  return acc;
}, {});

// --- Component for individual Case Study Card ---
const CaseStudyCard = ({ study }) => {
  const linkText = study.isStrategicInitiative
    ? "Explore This Vision"
    : "Read Full Study";
  const LinkIcon = study.isStrategicInitiative ? FiMessageSquare : FiArrowRight;

  // Use theme.textHighlight for strategic accent, theme.successText for regular results
  const resultIconColor = study.isStrategicInitiative
    ? theme.textHighlight
    : theme.successText;
  const titleColor = study.isStrategicInitiative
    ? `group-hover:${theme.textHighlight}`
    : `group-hover:${theme.textPrimary}`;
  const cardBorderColor = study.isStrategicInitiative
    ? theme.borderAccent
    : theme.borderLight;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{
        y: -5,
        scale: 1.01, // Slightly more subtle scale
        boxShadow: theme.cardHoverShadow.replace("hover:", ""), // Apply hover shadow
        transition: { type: "spring", stiffness: 300 },
      }}
      className={`${theme.surfaceCard} p-6 rounded-xl shadow-md border ${cardBorderColor} flex flex-col h-full group hover:border-cyan-500/40 transition-all duration-300 relative`} // Added relative for badge
    >
      {study.isStrategicInitiative && (
        <div
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${theme.accentCyanBg}/20 ${theme.accentCyan} border ${theme.borderAccent}`}
        >
          VISION
        </div>
      )}
      <h3
        className={`text-xl font-semibold ${theme.textPrimary} mb-2 ${titleColor} transition-colors`}
      >
        {study.title}
      </h3>
      <p
        className={`text-sm font-medium ${
          study.isStrategicInitiative ? theme.textHighlight : theme.textPrimary
        } mb-3`}
      >
        {study.isStrategicInitiative
          ? `Partner: ${study.clientName}`
          : `Client: ${study.clientName}`}
      </p>
      <p className={`text-xs ${theme.textSecondary} mb-1 leading-relaxed`}>
        <strong>Challenge:</strong> {study.challenge}
      </p>
      <p className={`text-xs ${theme.textSecondary} mb-3 leading-relaxed`}>
        <strong>Approach:</strong> {study.solutionHighlight}
      </p>

      <p
        className={`text-base font-semibold ${resultIconColor} mb-4 mt-auto pt-3 flex items-center`}
      >
        <study.resultIcon className="w-5 h-5 mr-2 flex-shrink-0" />
        {study.result}
      </p>
      <Link
        to={study.link}
        className={`inline-flex items-center text-sm font-medium ${
          study.isStrategicInitiative ? theme.textHighlight : theme.textPrimary
        } hover:underline group-hover:${theme.accentCyan} transition-colors`}
      >
        {linkText}{" "}
        <LinkIcon className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default function CaseStudiesPage() {
  return (
    <div className={`${theme.background} py-16 md:py-24 overflow-x-hidden`}>
      {" "}
      {/* Using theme.background */}
      <div className="container mx-auto px-4">
        {/* --- Hero Section --- */}
        <motion.section
          className="text-center mt-16 mb-16 md:mb-24" // Added mt-16 from PricingPage hero for consistency
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <motion.div
            variants={fadeInUp} // Can simplify if parent has fadeInUp
            className={`inline-block p-3 ${theme.accentCyanBg}/10 rounded-full mb-4 border ${theme.borderAccent}`} // Themed icon bg
          >
            <FiBriefcase className={`w-12 h-12 ${theme.textHighlight}`} />{" "}
            {/* Themed icon color */}
          </motion.div>
          <h1
            className={`text-4xl md:text-5xl font-bold ${theme.textPrimary} mb-4`} // Themed text
          >
            Real Results, Strategic Visions
          </h1>
          <p
            className={`text-lg md:text-xl ${theme.textSecondary} max-w-3xl mx-auto`} // Themed text
          >
            Explore how businesses leverage LoyalShift for transformation and
            discover our vision for future enterprise solutions.
          </p>
        </motion.section>

        {/* --- Industry Sections --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="space-y-16 md:space-y-20 max-w-6xl mx-auto"
        >
          {Object.entries(studiesByIndustry).map(
            ([industry, { icon: Icon, studies }]) => (
              <motion.section key={industry} variants={fadeInUp}>
                <div
                  className={`flex items-center mb-4 md:mb-6 border-b ${theme.border} pb-3`} // Themed border
                >
                  <Icon
                    className={`w-8 h-8 md:w-10 md:h-10 ${theme.textHighlight} mr-4 flex-shrink-0`} // Themed icon
                  />
                  <h2
                    className={`text-3xl md:text-4xl font-bold ${theme.textPrimary}`} // Themed text
                  >
                    {industry}
                  </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {studies.map((study) => (
                    <div
                      key={study.id}
                      className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(33.33%-1.34rem)]"
                    >
                      <CaseStudyCard study={study} />
                    </div>
                  ))}
                </div>
              </motion.section>
            )
          )}
        </motion.div>

        {/* --- Call to Action Section --- */}
        <motion.section
          className={`mt-20 md:mt-28 text-center ${theme.surfaceCard} p-10 md:p-16 rounded-2xl shadow-xl border ${theme.borderLight}`} // Themed card
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <h2 className={`text-3xl font-bold ${theme.textPrimary} mb-4`}>
            {" "}
            {/* Themed text */}
            Ready to Write Your Success Story or Co-Create the Future?
          </h2>
          <p
            className={`text-lg ${theme.textSecondary} max-w-3xl mx-auto mb-8`}
          >
            {" "}
            {/* Themed text */}
            Your legacy systems hold untapped potential. Let's discuss how
            LoyalShift's AI-powered modernization can deliver results tailored
            to your specific industry and challenges, or how we can partner on
            visionary projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              to="/contact-sales?subject=ProjectInquiry"
              size="lg"
              icon={<FiMessageSquare />}
              // Applying styles from the loyalShiftV2Theme (dark theme) for PRIMARY button
              className={`
                ${theme.buttonPrimaryBg} 
                ${theme.buttonPrimaryText} 
                ${theme.buttonPrimaryHoverBg}
                font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300
              `}
            >
              Discuss Your Project
            </Button>
            <Button
              to="/solutions"
              size="lg"
              // Applying styles for a SECONDARY button from loyalShiftV2Theme
              variant="secondary"
            >
              Explore Our Solutions
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
