// src/pages/ContactSales.js
// UPDATED: Form section simplified to resemble Contact page's Quick Message form

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import SchedulingEmbed from "../components/SchedulingEmbed";
import SalesInquiryForm from "../components/SalesInquiryForm";

// --- Theme Colors (Light Theme) ---
const colors = {
  bgBase: "bg-neutral-light",
  bgWhite: "bg-neutral-white",
  textHeading: "text-neutral-dark",
  textBody: "text-neutral-main",
  textPrimary: "text-primary-main",
  textPrimaryDark: "text-primary-dark",
  primaryMain: "bg-primary-main",
  primaryDark: "hover:bg-primary-dark",
  primaryContrast: "text-primary-contrast",
  borderLight: "border-neutral-light",
  borderMedium: "border-neutral-main/30",
  borderPrimary: "border-primary-main",
  accentSuccess: "text-status-success",
  bgGradientFrom: "bg-gradient-to-br from-white",
  bgGradientTo: "to-neutral-50",
  borderRing: "ring-neutral-200",
};

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.2 };
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// --- End Animation Variants ---

// --- Reusable Benefit Item Component ---
const BenefitItem = ({ children }) => (
  <motion.li variants={fadeInUp} className="flex items-start mb-3">
    <FiCheckCircle
      className={`w-5 h-5 ${colors.accentSuccess} mr-3 mt-1 flex-shrink-0`}
    />
    <span className={`${colors.textBody} text-base leading-relaxed`}>
      {children}
    </span>
  </motion.li>
);
BenefitItem.propTypes = { children: PropTypes.node.isRequired };

// --- Main Component ---
export default function ContactSales() {
  const pageStyle = {
    background: `linear-gradient(135deg, ${"#FFFFFF"} 0%, ${"#F9FAFB"} 100%)`,
  };

  return (
    // Page Wrapper
    <div
      className={`py-20 md:py-28 overflow-x-hidden ${colors.bgBase}`}
      style={pageStyle}
    >
      <Toaster
        position="bottom-center"
        toastOptions={{ className: "text-sm rounded-md shadow-lg" }}
      />
      <div className="container mx-auto px-4">
        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* --- Left Column (Sticky Info) --- */}
          <motion.section
            className="lg:col-span-2 lg:sticky lg:top-28"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${colors.textHeading} mt-4 mb-4 leading-tight`}
            >
              Let's Discuss{" "}
              <span className={colors.textPrimary}>Your Goals</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg ${colors.textBody} mb-8 leading-relaxed`}
            >
              Schedule a consultation to explore custom solutions, enterprise
              pricing, and how LoyalShift can accelerate your modernization
              journey. It's the quickest way to get tailored answers.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className={`mt-10 p-6 bg-white rounded-xl border ${colors.borderLight}`}
            >
              <h3
                className={`text-lg font-semibold ${colors.textHeading} mb-4`}
              >
                Your Consultation Includes:
              </h3>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="list-none pl-0 space-y-2.5"
              >
                <BenefitItem>
                  Personalized discussion of{" "}
                  <strong className={colors.textPrimaryDark}>your needs</strong>
                  .
                </BenefitItem>
                <BenefitItem>
                  Overview of relevant{" "}
                  <strong className={colors.textPrimaryDark}>solutions</strong>.
                </BenefitItem>
                <BenefitItem>
                  Tailored{" "}
                  <strong className={colors.textPrimaryDark}>
                    pricing insights
                  </strong>
                  .
                </BenefitItem>
                <BenefitItem>Answers to your specific questions.</BenefitItem>
                <BenefitItem>
                  No obligation, just valuable insights.
                </BenefitItem>
              </motion.ul>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="mt-8 text-sm text-neutral-main space-y-1"
            >
              <p>
                <strong>Direct Sales Email:</strong>{" "}
                <a
                  href="mailto:sales@loyalshift.com"
                  className="hover:underline text-primary-main"
                >
                  sales@loyalshift.com
                </a>
              </p>
              {/* <p>
                <strong>Direct Sales Phone:</strong>{" "}
                <a
                  href="tel:+50663562425"
                  className="hover:underline text-primary-main"
                >
                  +506 6356-2425
                </a>
              </p> */}
              <p className="text-xs">(Mon-Fri, 9am-5pm EST)</p>
            </motion.div>
          </motion.section>
          {/* --- Right Column (Interactive Card) --- */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInUp}
          >
            {/* Card Container */}
            <div
              className={`${colors.bgGradientFrom} ${colors.bgGradientTo} rounded-2xl shadow-xl relative overflow-hidden ring-1 ring-inset ${colors.borderRing} p-6 md:p-8 flex flex-col`}
            >
              {/* Scheduling Embed */}
              <div>
                <h2
                  className={`text-xl md:text-2xl font-semibold ${colors.textHeading} text-center mb-5 flex items-center justify-center gap-2`}
                >
                  <FiCalendar className={`w-6 h-6 ${colors.textPrimary}`} />
                  Schedule Your Consultation
                </h2>
                <SchedulingEmbed
                  url="https://calendly.com/loyalshift-sales/30min"
                  resize={true}
                  hideDetails={true}
                  hideCookieBanner={true}
                  style={{
                    border: `1px solid ${colors.borderMedium}`,
                    borderRadius: "0.75rem",
                    minHeight: "500px",
                  }}
                />
              </div>

              {/* Divider and Toggle Button - UPDATED AESTHETICS & CENTERING */}
              <SalesInquiryForm />
              {/* --- *** END SIMPLIFIED Form Area *** --- */}
            </div>
            {/* End Right Column Card */}
          </motion.div>
          {/* End Right Column */}
        </div>
        {/* End Main Content Grid */}
        {/* General Contact Link */}
        <motion.div
          className="text-center text-sm mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <p className={colors.textBody}>
            For non-sales related questions, please visit our general{" "}
            <Link
              to="/contact"
              className={`font-medium ${colors.textPrimary} hover:underline`}
            >
              Contact Page
            </Link>
            .
          </p>
        </motion.div>
      </div>{" "}
      {/* End Container */}
    </div> // End Page Wrapper
  );
}
