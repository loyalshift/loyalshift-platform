// src/pages/OverseasPartners.js
// UPDATED: Made card surface opaque for better text contrast.
// Page to attract and inform potential international Sales Partners for LoyalShift.
// Uses LoyalShift Dark Theme.
// Current time: Saturday, May 3, 2025 at 12:01 AM CST. San José, Costa Rica.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiGlobe,
  FiZap,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiCheckCircle,
  FiMessageSquare,
  FiInfo,
  FiArrowRight,
  FiBriefcase,
  FiThumbsUp,
} from "react-icons/fi";

// Reusable Components
import Button from "../components/Button";
import Section from "../components/Section"; // Assuming Section uses its own motion/variants
import FloatingBlobsBackground from "../components/Anaco/FloatingItemsBackground";

// --- Dark Theme Color Palette (UPDATED surface) ---
const colors = {
  background: "bg-slate-900",
  // *** UPDATED: Made surface opaque, removed backdrop-blur ***
  surface: "bg-slate-800",
  surfaceStrong: "bg-slate-800",
  primaryGradient: "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600",
  border: "border-slate-700",
  borderAccent: "border-blue-500/40", // Accent can remain subtle
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-300",
  textHighlight: "text-blue-300",
  textWhite: "text-white",
  accentGreen: "text-green-400",
  accentCyan: "text-cyan-400",
  accentBlue: "text-blue-400",
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Benefit Item Component ---
const BenefitItem = ({ icon: Icon = FiCheckCircle, children }) => (
  <motion.li variants={fadeInUp} className="flex items-start space-x-3">
    <Icon className={`w-5 h-5 ${colors.accentGreen} mt-1 flex-shrink-0`} />
    <span className={`${colors.textSecondary}`}>{children}</span>
  </motion.li>
);
BenefitItem.propTypes = {
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
};

// --- Main Component ---
export default function OverseasPartnersPage() {
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className={`${colors.background} ${colors.textPrimary}`}>
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.background}
          className="pt-24 md:pt-32 pb-16 md:pb-20"
          ariaLabelledby="partner-hero-title"
        >
          <FloatingBlobsBackground />
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Using surfaceStrong (opaque) for the icon background now */}
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-5 rounded-full ${colors.surfaceStrong} border ${colors.borderAccent}`}
            >
              <FiGlobe className={`w-12 h-12 ${colors.textHighlight}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="partner-hero-title"
              className={`text-4xl md:text-5xl font-bold ${colors.textWhite} mb-5`}
            >
              Partner with LoyalShift: Drive AI Modernization{" "}
              <span className={colors.textHighlight}>Globally</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-3xl mx-auto mb-8`}
            >
              Leverage your network to bring cutting-edge legacy modernization
              solutions to enterprises in your region. Earn{" "}
              <span className={colors.textHighlight}>
                significant commissions
              </span>{" "}
              and build lasting relationships.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                to="#opportunity"
                variant="primary"
                size="lg"
                icon={<FiArrowRight />}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </Section>

        {/* The Opportunity Section */}
        <Section
          id="opportunity"
          bg={colors.surfaceStrong}
          className={`border-y ${colors.border}`}
          ariaLabelledby="opportunity-title"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <h2
                id="opportunity-title"
                className={`text-3xl font-bold ${colors.textWhite} mb-4`}
              >
                The Market Opportunity
              </h2>
              <p
                className={`${colors.textSecondary} text-lg leading-relaxed mb-4`}
              >
                Enterprises worldwide are hindered by outdated systems.
                LoyalShift offers AI-powered modernization without disruptive
                "rip-and-replace" projects.
              </p>
              <p className={`${colors.textSecondary} text-lg leading-relaxed`}>
                Seeking partners in Europe, Asia, and Africa to connect with
                businesses ready for transformation.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              {/* Using surface (now opaque) for the placeholder background */}
              <div
                className={`aspect-video ${colors.surface} rounded-lg border ${colors.borderAccent} flex items-center justify-center shadow-lg`}
              >
                <FiGlobe
                  className={`w-20 h-20 ${colors.textHighlight} opacity-30`}
                />
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Ideal Partner Profile Section */}
        <Section ariaLabelledby="ideal-partner-title">
          <motion.h2
            variants={fadeInUp}
            id="ideal-partner-title"
            className={`text-3xl font-bold ${colors.textHighlight} text-center mb-12 md:mb-16`}
          >
            Who We're Looking For
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cards now use opaque colors.surface */}
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.surface} border ${colors.border}`}
            >
              <FiBriefcase className={`w-8 h-8 ${colors.accentBlue} mb-3`} />
              <h3 className={`text-xl font-semibold ${colors.textWhite} mb-2`}>
                Proven B2B Experience
              </h3>
              <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
                Success in enterprise software sales, IT consulting, or business
                development.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.surface} border ${colors.border}`}
            >
              <FiUsers className={`w-8 h-8 ${colors.accentCyan} mb-3`} />
              <h3 className={`text-xl font-semibold ${colors.textWhite} mb-2`}>
                Strong Regional Network
              </h3>
              <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
                Connections in target sectors (Finance, Insurance, Energy,
                Manufacturing) in your region.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.surface} border ${colors.border}`}
            >
              <FiThumbsUp className={`w-8 h-8 ${colors.accentGreen} mb-3`} />
              <h3 className={`text-xl font-semibold ${colors.textWhite} mb-2`}>
                Trusted & Self-Motivated
              </h3>
              <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
                High ethical standards and drive to succeed independently.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Your Role Section */}
        <Section
          bg={colors.surfaceStrong}
          className={`border-y ${colors.border}`}
          ariaLabelledby="partner-role-title"
        >
          {/* ... Role content remains the same ... */}
          <motion.h2
            variants={fadeInUp}
            id="partner-role-title"
            className={`text-3xl font-bold ${colors.textWhite} text-center mb-12 md:mb-16`}
          >
            {" "}
            Your Role as a Partner{" "}
          </motion.h2>
          <div className="max-w-3xl mx-auto text-lg">
            <motion.div variants={fadeInUp} className="mb-6">
              {" "}
              <p className={`${colors.textSecondary} leading-relaxed`}>
                {" "}
                Leverage your expertise to identify clients and generate
                qualified leads:{" "}
              </p>{" "}
            </motion.div>
            <motion.ul variants={staggerContainer} className="space-y-4">
              {" "}
              <BenefitItem>
                Identify enterprises with legacy system challenges
              </BenefitItem>{" "}
              <BenefitItem>
                Introduce LoyalShift's AI modernization value proposition
              </BenefitItem>{" "}
              <BenefitItem>
                Facilitate initial meetings with our core team
              </BenefitItem>{" "}
              <BenefitItem>
                Nurture client relationships for recurring commission
              </BenefitItem>{" "}
            </motion.ul>
            <motion.p
              variants={fadeInUp}
              className={`${colors.textSecondary} mt-6 italic text-sm`}
            >
              {" "}
              Full support from our sales and technical teams for demonstrations
              and deal closure.{" "}
            </motion.p>
          </div>
        </Section>

        {/* Compensation Section */}
        <Section ariaLabelledby="compensation-title">
          <motion.h2
            variants={fadeInUp}
            id="compensation-title"
            className={`text-3xl font-bold ${colors.textHighlight} text-center mb-12 md:mb-16`}
          >
            {" "}
            Rewarding Partnership Structure{" "}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Cards now use opaque colors.surface */}
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.surface} border ${colors.borderAccent} shadow-lg`}
            >
              {" "}
              <FiDollarSign
                className={`w-10 h-10 ${colors.textHighlight} mb-3`}
              />{" "}
              <h3
                className={`text-2xl font-semibold ${colors.textPrimary} mb-2`}
              >
                Generous Upfront Commission
              </h3>{" "}
              <p className={`${colors.textSecondary}`}>
                {" "}
                Earn <strong className={colors.textWhite}>15%</strong> on
                initial contract value for new clients.{" "}
              </p>{" "}
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.surface} border ${colors.borderAccent} shadow-lg`}
            >
              {" "}
              <FiTrendingUp
                className={`w-10 h-10 ${colors.textHighlight} mb-3`}
              />{" "}
              <h3
                className={`text-2xl font-semibold ${colors.textPrimary} mb-2`}
              >
                Recurring Monthly Revenue
              </h3>{" "}
              <p className={`${colors.textSecondary}`}>
                {" "}
                <strong className={colors.textWhite}>5% monthly</strong>{" "}
                commission on active client contracts.{" "}
              </p>{" "}
            </motion.div>
          </div>
          <motion.div variants={fadeInUp} className="text-center mt-10">
            <h4
              className={`text-xl font-semibold ${colors.textHighlight} mb-4`}
            >
              Additional Benefits:
            </h4>
            <div
              className={`flex flex-wrap justify-center gap-x-6 gap-y-2 text-base ${colors.accentBlue}`}
            >
              {" "}
              <span>✓ Remote Flexibility</span> <span>✓ Marketing Support</span>{" "}
              <span>✓ Sales Enablement</span> <span>✓ Growth Potential</span>{" "}
            </div>
          </motion.div>
        </Section>

        {/* Final CTA Section */}
        <Section
          bg={colors.surfaceStrong}
          className={`border-t ${colors.border}`}
          ariaLabelledby="partner-cta-title"
        >
          {/* ... CTA content remains the same ... */}
          <motion.div
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            {" "}
            <FiUsers
              className={`w-12 h-12 ${colors.textHighlight} mx-auto mb-4`}
            />{" "}
            <h2
              id="partner-cta-title"
              className={`text-3xl font-bold ${colors.textWhite} mb-4`}
            >
              Join Our Global Network
            </h2>{" "}
            <p className={`text-lg ${colors.textSecondary} mb-8`}>
              {" "}
              Ready to drive AI adoption and earn significant rewards? Connect
              with us to discuss partnership opportunities.{" "}
            </p>{" "}
            <Button
              to="/contact?subject=OverseasPartnerInquiry"
              variant="primary"
              size="lg"
              icon={<FiMessageSquare />}
              className="shadow-lg hover:shadow-cyan-500/30"
            >
              {" "}
              Express Interest{" "}
            </Button>{" "}
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
OverseasPartnersPage.propTypes = {};
BenefitItem.propTypes = {
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
};
Section.propTypes = {
  /* Add PropTypes if using external Section component */
};
Button.propTypes = {
  /* Add PropTypes if using external Button component */
};
