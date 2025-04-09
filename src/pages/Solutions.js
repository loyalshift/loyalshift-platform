// src/pages/Solutions.js

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FiZap, // Smart Mirror (Zero-Disruption)
  FiShare2, // Universal Adapter (Integration)
  FiCpu, // AI Automation / Workflow Transformation
  FiShield, // Audit Guardian (Compliance)
  FiCheckCircle, // Benefit Checkmark
  FiArrowRight,
  FiLayers, // Hero Icon
} from "react-icons/fi";
import Button from "../components/Button";
// Define light theme colors (consistent)
const colors = {
  bgBase: "bg-neutral-light",
  bgWhite: "bg-neutral-white",
  textHeading: "text-neutral-dark",
  textBody: "text-neutral-main",
  textPrimary: "text-primary-main",
  textPrimaryDark: "text-primary-dark",
  primaryMain: "bg-primary-main",
  primaryContrast: "text-primary-contrast",
  borderLight: "border-neutral-light",
  borderDark: "border-neutral-main",
  accentSuccess: "text-status-success",
};

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

// --- Refined FeatureListItem ---
// Added subtle hover effect and slightly adjusted spacing/size
const FeatureListItem = ({ children }) => (
  <motion.li
    variants={fadeInUp}
    className="flex items-start py-1 group" // Added py-1 and group
  >
    <FiCheckCircle
      className={`w-5 h-5 ${colors.accentSuccess} mr-3 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
    />
    <span
      className={`${colors.textBody} text-base group-hover:${colors.textHeading} transition-colors`}
    >
      {children}
    </span>{" "}
    {/* Ensure text size is appropriate */}
  </motion.li>
);

FeatureListItem.propTypes = { children: PropTypes.node.isRequired };

export default function Solutions() {
  // --- Product Data ---
  const products = [
    {
      id: "smart-mirror",
      icon: FiZap, // Or FiCopy
      title: "Smart Mirror™",
      description:
        "Our core technology for zero-disruption modernization. Smart Mirror™ creates a safe, parallel environment to test and validate changes, automations, and new integrations against live data without impacting your operational systems.",
      benefits: [
        "Validate changes risk-free before deployment.",
        "Eliminate 'big bang' cutover failures.",
        "Ensure business continuity during updates.",
        "Achieve phased, confident rollouts.",
      ],
    },
    {
      id: "universal-adapter",
      icon: FiShare2, // Or FiDatabase
      title: "Universal Adapter™",
      description:
        "Bridge the gap between legacy and modern systems. The Universal Adapter™ provides seamless connectivity to disparate data sources (SQL, NoSQL, APIs, flat files), exposing legacy data through modern APIs and enabling unified data access.",
      benefits: [
        "Unlock data trapped in siloed systems.",
        "Integrate with 200+ sources via pre-built & custom adapters.",
        "Enable real-time data synchronization.",
        "Avoid costly data migration projects.",
      ],
    },
    {
      id: "audit-guardian",
      icon: FiShield,
      title: "Audit Guardian™",
      // UPDATED Description: Emphasizes tailored compliance and private workflows
      description:
        "Maintain rigorous compliance and security tailored to your specific needs. Audit Guardian™ enforces adherence not only to standard frameworks (like SOC2, HIPAA) but also supports specialized laws and unique organizational constraints through secure, private workflows. Features built-in real-time tracking and complete, immutable audit trails for all human and AI actions.",
      // UPDATED Benefits: Highlights customization and privacy
      benefits: [
        "Customize compliance rules for specialized laws (e.g., GDPR, CCPA, industry-specific mandates) and internal policies.", // More specific
        "Guarantee workflow privacy and data security with robust encryption and fine-grained access controls.", // Explicit privacy/security focus
        "Provide complete transparency with traceable AI decisions and actions.", // Kept relevance
        "Automate compliance logging and reporting for simplified audits.", // Kept relevance
      ],
    },
  ];

  // --- Workflow Transformation Data ---
  const workflowTransformationData = {
    icon: FiCpu,
    title: "Intelligent Workflow Transformation",
    subtitle: "Leveraging AI-Powered Process Automation",
    description:
      "Beyond simple connection and safety, we transform your core processes. Utilizing advanced, explainable AI (Transformer NLP + Reinforcement Learning), we automate complex, manual tasks by understanding context, processing diverse documents (PDFs, emails, system exports), and executing workflows end-to-end.",
    benefits: [
      "Dramatically reduce manual data entry and processing time (>80% typically).",
      "Automate document understanding and context extraction.",
      "Implement intelligent exception handling and routing logic.",
      "Free up employees for strategic, high-value activities.",
      "Increase operational efficiency and reduce errors.",
    ],
  };

  // --- Style object for dotted background ---
  const dottedBackgroundStyle = {
    backgroundImage: `radial-gradient(${"#696969"}33 1px, transparent 0)`, // Using gray-500 equivalent with opacity
    backgroundSize: "16px 16px",
  };

  const ProductSection = ({ icon: Icon, title, description, benefits }) => (
    <motion.div
      variants={fadeInUp}
      className={`p-8 rounded-xl shadow-lg border ${colors.borderLight} ${colors.bgWhite}`}
    >
      <div className="flex items-center mb-5">
        <div
          className={`p-4 bg-primary-main/5 rounded-full mr-5 flex-shrink-0 border border-primary-main/10`}
        >
          <Icon className={`w-9 h-9 ${colors.textPrimary}`} />
        </div>
        <h3 className={`text-2xl font-semibold ${colors.textHeading}`}>
          {title}
        </h3>
      </div>
      <p className={`text-base ${colors.textBody} mb-6 leading-relaxed`}>
        {description}
      </p>
      <div className={`mt-6 pt-6 border-t ${colors.borderLight}/60`}>
        <h4
          className={`text-sm font-semibold ${colors.textBody} mb-3 uppercase tracking-wider`}
        >
          Key Benefits:
        </h4>
        <ul className="list-none pl-0 space-y-2.5">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start py-1 group">
              <FiCheckCircle
                className={`w-5 h-5 ${colors.accentSuccess} mr-3 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
              />
              <span
                className={`${colors.textBody} text-base group-hover:${colors.textHeading} transition-colors`}
              >
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
  ProductSection.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  return (
    // Applied dotted background style here
    <div
      className={`${colors.bgBase} py-16 md:py-24 overflow-x-hidden`}
      style={dottedBackgroundStyle}
    >
      <div className="container mx-auto px-4">
        {/* --- Refined Hero Section --- */}
        <motion.section
          className="text-center mt-16 mb-16 md:mb-20" // Increased bottom margin
          initial="hidden"
          animate="visible"
          variants={staggerContainer} // Stagger hero elements
        >
          <motion.div
            variants={fadeInUp}
            className={`inline-block p-5 ${colors.primaryMain}/10 rounded-full mb-6 border border-primary-main/20`} // Enhanced icon container
          >
            <FiLayers className={`w-20 h-20 ${colors.textPrimary}`} />{" "}
            {/* Larger icon */}
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className={`text-4xl md:text-6xl font-bold ${colors.textHeading} mb-5 leading-tight max-w-4xl mx-auto`} // Larger, tighter leading, max-width
          >
            Intelligent Solutions for{" "}
            <span className={colors.textPrimary}>
              Legacy System Modernization
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className={`text-lg md:text-xl ${colors.textBody} max-w-3xl mx-auto`}
          >
            Leverage LoyalShift's core products and AI-powered framework to
            transform outdated systems into agile, efficient, and compliant
            operations—without the typical risks or costs.
          </motion.p>
        </motion.section>

        {/* --- Core Products Section --- */}
        <motion.section
          className={`mb-16 md:mb-20`} // Increased spacing
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {/* Refined section title */}
          <h2
            className={`text-3xl md:text-4xl font-bold ${colors.textHeading} text-center mb-16 md:mb-20`}
          >
            Our Core Technology Suite
          </h2>
          {/* Wider container for products, centered */}
          <div className="space-y-16 md:space-y-20 max-w-5xl mx-auto">
            {products.map((product) => (
              <ProductSection
                key={product.id}
                icon={product.icon}
                title={product.title}
                description={product.description}
                benefits={product.benefits}
              />
            ))}
          </div>
        </motion.section>

        {/* --- Enhanced Intelligent Workflow Transformation Section --- */}
        <motion.section
          // Enhanced styling: more padding, softer shadow, larger rounding
          className={`py-20 md:py-24 my-20 md:my-32 bg-neutral-white rounded-2xl shadow-xl border ${colors.borderLight} px-8 md:px-12 relative overflow-hidden`} // Added relative/overflow
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          {/* Subtle background element */}
          <div
            className={`absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-64 h-64 ${colors.primaryMain}/5 rounded-full blur-3xl opacity-50`}
            aria-hidden="true"
          ></div>
          <div
            className={`absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-80 h-80 ${colors.primaryMain}/10 rounded-full blur-3xl opacity-60`}
            aria-hidden="true"
          ></div>

          {/* Content constrained and centered */}
          <div
            className={`relative z-10 max-w-4xl mx-auto border-l-4 ${colors.borderPrimary} pl-8 md:pl-12`}
          >
            <div className="flex flex-col md:flex-row items-center mb-8 text-center md:text-left">
              <workflowTransformationData.icon
                className={`w-20 h-20 ${colors.textPrimary} mr-0 md:mr-8 mb-5 md:mb-0 flex-shrink-0`}
              />{" "}
              {/* Larger Icon */}
              <div>
                <h2
                  className={`text-3xl md:text-4xl font-bold ${colors.textHeading}`}
                >
                  {workflowTransformationData.title}
                </h2>
                <p className={`text-xl font-semibold ${colors.textPrimary}`}>
                  {workflowTransformationData.subtitle}
                </p>
              </div>
            </div>

            <p className={`text-lg ${colors.textBody} mb-10`}>
              Transforming core workflows with AI delivers significant
              results—like dramatically reducing manual tasks and freeing your
              team for strategic work. However, achieving this requires a deep
              understanding of your unique processes, systems, and goals.
              <br />
              <br />
              Because every business is different, a personalized discussion is
              the best way to explore how our AI-powered automation can be
              tailored to your specific challenges and opportunities.
            </p>

            {/* Enhanced CTA Button */}
            <div className="text-center mt-10">
              <Link
                to="/contact?subject=WorkflowTransformationCall"
                // Using classes directly for potentially more unique styling if Button component is limiting
                className={`inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300 ease-out shadow-lg ${colors.primaryMain} ${colors.primaryContrast} hover:${colors.primaryDark} hover:scale-105 hover:shadow-xl transform`}
              >
                Schedule a Workflow Strategy Call
                <FiArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* --- Refined Implementation Snippet --- */}
        <motion.section
          className={`my-20 md:my-32 pt-16 md:pt-24 border-t ${colors.borderLight} text-center`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer} // Stagger the phases
        >
          <motion.h2
            variants={fadeInUp}
            className={`text-3xl md:text-4xl font-bold ${colors.textHeading} mb-6`}
          >
            Phased Implementation, Rapid Results
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className={`text-lg ${colors.textBody} max-w-3xl mx-auto mb-16`}
          >
            {" "}
            {/* Increased bottom margin */}
            Our proven methodology ensures a smooth transition with tangible
            outcomes delivered quickly, typically following these phases:
          </motion.p>
          {/* Use flexbox for better alignment control, especially on smaller screens */}
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
            {/* Phase items with refined styling */}
            {[
              {
                week: "Weeks 1-2",
                title: "Discovery & Pilot Design",
                desc: "Collaborative system mapping and design of the initial high-impact pilot workflow.",
              },
              {
                week: "Weeks 3-4",
                title: "First Workflow Live",
                desc: "Deployment and validation of the first automated process using Smart Mirror™.",
              },
              {
                week: "Months 2-3+",
                title: "Scaled Rollout",
                desc: "Iterative expansion across departments or processes based on proven results and priorities.",
              },
            ].map((phase, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-8 rounded-xl ${colors.bgWhite} shadow-lg border ${colors.borderLight} text-left flex-1 hover:shadow-xl hover:border-primary-main/30 transition-all duration-300 min-w-[280px]`} // Added text-left, flex-1, min-width
              >
                <p
                  className={`text-sm font-bold ${colors.textPrimary} mb-2 uppercase tracking-wider`}
                >
                  {phase.week}
                </p>
                <h3
                  className={`text-xl font-semibold ${colors.textHeading} mb-3`}
                >
                  {phase.title}
                </h3>
                <p className={`text-base ${colors.textBody}`}>{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Refined Final Call to Action --- */}
        <motion.section
          // --- DARK THEME STYLING ---
          className={`relative mt-24 md:mt-32 py-20 md:py-24 px-6 md:px-8 bg-gradient-to-br from-slate-900 to-gray-900 rounded-2xl shadow-xl text-center overflow-hidden ring-1 ring-inset ring-white/10`} // Dark gradient, light ring
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          {/* Subtle background decorative elements - using brighter accents */}
          <div
            className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3"
            aria-hidden="true"
          >
            <div
              className={`w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl opacity-50`}
            ></div>{" "}
            {/* Brighter cyan */}
          </div>
          <div
            className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3"
            aria-hidden="true"
          >
            <div
              className={`w-72 h-72 bg-blue-600/10 rounded-full blur-3xl opacity-60`}
            ></div>{" "}
            {/* Brighter blue */}
          </div>

          {/* Content positioned relative */}
          <div className="relative z-10">
            {/* Headline - Light text, bright accent */}
            <h2
              className={`text-4xl md:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto leading-tight`}
            >
              Ready to Modernize{" "}
              <span className="text-cyan-400">Without Disruption?</span>{" "}
              {/* Using cyan accent */}
            </h2>

            {/* Description - Light secondary text */}
            <p className={`text-lg text-slate-300 max-w-2xl mx-auto mb-12`}>
              Discover how our unique AI-driven approach delivers measurable
              results, guaranteed security, and a seamless transition. Request a
              personalized assessment or contact our experts to discuss your
              specific goals today.
            </p>

            {/* Buttons - Adapted for dark theme */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 md:gap-5">
              {/* Primary CTA: Contact Sales (Assuming Button variant='primary' works on dark) */}
              <Button
                to="/contact"
                variant="primary" // Assumes this looks good on dark (e.g., bright gradient)
                size="lg"
                icon={<FiArrowRight />}
                className="transform transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5" // Keep hover effect
              >
                Talk to Sales
              </Button>

              {/* Secondary CTA: Assessment (Bright outline) */}
              <Button
                to="/request-demo"
                variant="secondary" // Use variant logic or override classes
                size="lg"
                icon={<FiArrowRight />}
                // Explicit dark theme outline style
                className={`!text-blue-400 !border-2 !border-blue-500 !bg-transparent hover:!bg-blue-500/10 transform transition-all duration-200 hover:scale-105 hover:-translate-y-0.5`}
              >
                Request Personalized Demo
              </Button>

              {/* Tertiary CTA: Case Studies (Simple light text link) */}
              <Button
                to="/case-studies"
                variant="secondary" // Use variant logic or override classes
                size="lg"
                icon={<FiArrowRight />}
                // Subtle light text style for tertiary action
                className={`!text-slate-400 !bg-transparent !border-none hover:!text-slate-100 hover:underline`}
              >
                See Client Results
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

// Add PropTypes import if not already present
// import PropTypes from 'prop-types';
