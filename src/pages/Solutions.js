// src/pages/Solutions.js
// REFINED AESTHETIC + FIXED cardGridStagger error + ADDED Agent Hub

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FiZap,
  FiShare2,
  FiCpu,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiLayers,
  FiUsers // **** ADDED FiUsers ****
} from "react-icons/fi";
import Button from "../components/Button"; // Adjust path if needed

// Define light theme colors (consistent)
const colors = {
  bgBase: "bg-neutral-light", // Main page background
  bgWhite: "bg-neutral-white", // Card backgrounds
  textHeading: "text-neutral-dark", // Darker text for headings
  textBody: "text-neutral-main", // Main body text color
  textPrimary: "text-primary-main", // Accent color (Steel Blue)
  textPrimaryDark: "text-primary-dark", // Darker accent
  primaryMain: "bg-primary-main", // Accent background
  primaryContrast: "text-primary-contrast", // Text on accent background
  borderLight: "border-neutral-200", // Lighter border (used more now)
  borderMedium: "border-neutral-300", // Medium border
  borderDark: "border-neutral-main", // Darker border
  borderPrimary: "border-primary-main", // Accent border
  accentSuccess: "text-status-success", // Success color (adjusted for consistency)
  // Dark theme colors for final CTA
  darkBgGradient: "bg-gradient-to-br from-slate-900 to-gray-900",
  darkTextPrimary: "text-white",
  darkTextSecondary: "text-slate-300",
  darkTextHighlight: "text-cyan-400",
  darkRing: "ring-1 ring-inset ring-white/10",
   // Added Amber colors from previous refinement (ensure these are needed/used consistently)
   badgeGradient: "bg-gradient-to-r from-amber-500 to-amber-600",
   amberHoverGradient: "hover:from-amber-400 hover:to-amber-500",
   darkTextForAmber: "text-slate-900",
   amberBorder: "border-amber-500",
   amberBorderHover: "hover:border-amber-400",
   textHighlightAmber: "text-amber-400",
};

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardGridStagger = {
    visible: { transition: { staggerChildren: 0.1 } }
};
// --- End Animation Variants ---


// Reusable list item for benefits within ProductSection
const BenefitListItem = ({ children }) => (
    <motion.li variants={fadeInUp} className="flex items-start py-1 group">
      <FiCheckCircle
        className={`w-5 h-5 ${colors.accentSuccess} mr-3 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
        aria-hidden="true"
      />
      <span className={`${colors.textBody} text-base group-hover:${colors.textHeading} transition-colors`}>
        {children}
      </span>
    </motion.li>
  );
BenefitListItem.propTypes = { children: PropTypes.node.isRequired };


// --- ProductSection Component ---
const ProductSection = ({ icon: Icon, title, description, benefits }) => (
    <motion.div
      variants={fadeInUp}
      className={`flex flex-col p-8 rounded-2xl shadow-xl border ${colors.borderLight} ${colors.bgWhite} transition-all duration-300 hover:shadow-2xl hover:border-primary-main/30`}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-6">
        <div className={`inline-flex p-4 rounded-xl mr-5 flex-shrink-0 bg-gradient-to-br ${colors.primaryMain}/10 from-primary-main/10 to-primary-main/5 border ${colors.borderPrimary}/20 shadow-inner`}>
          {/* Render Icon component directly */}
          <Icon className={`w-10 h-10 ${colors.textPrimary}`} />
        </div>
        <h3 className={`text-2xl font-semibold ${colors.textHeading}`}>
          {title}
        </h3>
      </div>
      <p className={`text-base ${colors.textBody} mb-6 leading-relaxed flex-grow`}>
        {description}
      </p>
      <div className={`mt-auto pt-6 border-t ${colors.borderLight}`}>
        <h4 className={`text-sm font-semibold ${colors.textBody} mb-3 uppercase tracking-wider`}>
          Key Benefits:
        </h4>
        <motion.ul
           className="list-none pl-0 space-y-2"
           variants={staggerContainer} // Stagger list items within the card
           initial="hidden"
           animate="visible" // Animate when card becomes visible
        >
          {benefits.map((benefit, i) => (
            <BenefitListItem key={i}>{benefit}</BenefitListItem>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
ProductSection.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
};


// --- Main Solutions Component ---
export default function Solutions() {

  // --- UPDATED Product Data with Agent Hub™ Module ---
  const products = [
    {
      id: "smart-mirror",
      icon: FiZap,
      title: "Smart Mirror™",
      description:
        "Safely validate changes against live data in a parallel environment using Smart Mirror™. Test integrations and workflows with zero risk to your operational systems, ensuring confident, disruption-free deployments.",
      benefits: [
        "Validate changes risk-free before deployment.",
        "Eliminate 'big bang' cutover failures.",
        "Ensure business continuity during updates.",
        "Achieve phased, confident rollouts.",
        "Accelerate testing cycles significantly."
      ],
    },
    {
      id: "universal-adapter",
      icon: FiShare2,
      title: "Universal Adapter™",
      description:
        "Bridge legacy and modern systems instantly with Universal Adapter™. Unlock siloed data through a unified API layer, enabling real-time sync and new applications without costly migrations.",
      benefits: [
        "Unlock data trapped in siloed systems.",
        "Integrate with 200+ sources via pre-built & custom adapters.",
        "Enable real-time data synchronization & modern applications.",
        "Avoid costly, high-risk data migration projects.",
        "Simplify new development and integration efforts."
      ],
    },
    {
      id: "audit-guardian",
      icon: FiShield,
      title: "Audit Guardian™",
      description:
        "Embed compliance and trust with Audit Guardian™. Enforce custom rules (SOC2, HIPAA, SUGEF) and maintain immutable audit trails for all AI/human actions, simplifying reporting and ensuring security.",
      benefits: [
        "Customize compliance rules for specific laws & policies.",
        "Guarantee workflow privacy and data security.",
        "Provide complete transparency with traceable AI decisions.",
        "Automate compliance logging and reporting.",
        "Reduce audit preparation time and costs."
      ],
    },
    {
      id: "ai-insights",
      icon: FiCpu,
      title: "AI-Powered Insights Engine",
      description:
        "Leverage Explainable AI (XAI) to analyze your operational data via our Insights Engine. Proactively identify bottlenecks and receive data-driven recommendations for continuous process optimization.",
      benefits: [
        "Identify hidden process inefficiencies proactively.",
        "Improve forecasting accuracy with ML.",
        "Make data-backed strategic decisions.",
        "Enable a continuous improvement loop.",
        "Unlock insights previously buried in legacy data."
      ]
    },
    // **** NEW AGENT HUB MODULE ****
    {
        id: "agent-hub",
        icon: FiUsers, // Icon representing agents/partnerships
        title: "Agent Hub™ Module",
        description:
          "Empower your partners (like real estate agents) with a dedicated portal built on our core tech. Streamline application intake, document management, and status communication for faster, smoother collaboration.",
        benefits: [
          "Accelerate partner-driven workflows (e.g., loan origination).",
          "Enhance partner experience and loyalty.",
          "Reduce manual processing for internal teams.",
          "Provide transparency for all stakeholders.",
          "Rapidly deployable and customizable solution foundation."
        ]
      }
    // **** END NEW MODULE ****
  ];


  const workflowTransformationData = { icon: FiCpu, title: "Intelligent Workflow Transformation", subtitle: "Leveraging AI-Powered Process Automation", description: "Beyond simple connection and safety, we transform your core processes...", benefits: ["Dramatically reduce manual effort (>80%)", "Automate document understanding", "Implement intelligent exception handling", "Free up employees for strategic work", "Increase efficiency & reduce errors"] };


  return (
    <div className={`${colors.bgBase} py-16 md:py-24 overflow-x-hidden relative`}>
       {/* Subtle Background Decorative Blobs */}
       <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary-main/5 via-transparent to-transparent -translate-x-1/3 -translate-y-1/4 opacity-40 blur-3xl pointer-events-none" aria-hidden="true"></div>
       <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-status-success/5 via-transparent to-transparent translate-x-1/4 translate-y-1/4 opacity-30 blur-3xl pointer-events-none" aria-hidden="true"></div>


      <div className="container mx-auto px-4 relative z-10">
        {/* --- Refined Hero Section --- */}
        <motion.section className="text-center mt-16 mb-20 md:mb-28" initial="hidden" animate="visible" variants={staggerContainer}>
           {/* ... Hero Content ... */}
           <motion.div variants={fadeInUp} className={`inline-block p-6 bg-white rounded-full mb-6 shadow-lg border ${colors.borderLight}`}>
             <FiLayers className={`w-16 h-16 md:w-20 md:w-20 ${colors.textPrimary}`} />
           </motion.div>
           <motion.h1 variants={fadeInUp} className={`text-4xl sm:text-5xl md:text-6xl font-bold ${colors.textHeading} mb-5 leading-tight max-w-4xl mx-auto`}>
             Intelligent Solutions for <br className="sm:hidden"/>
             <span className={` ${colors.textPrimary}`}>
               Legacy System Modernization
             </span>
           </motion.h1>
           <motion.p variants={fadeInUp} className={`text-lg md:text-xl ${colors.textBody} max-w-3xl mx-auto`}>
             Leverage LoyalShift's core framework and explainable AI to transform outdated systems into agile, efficient, and compliant operations—without the disruption.
           </motion.p>
        </motion.section>

        {/* --- Core Products Section - Grid Layout --- */}
        <motion.section
          className={`mb-20 md:mb-28`}
          aria-labelledby="core-tech-title"
        >
          <motion.h2
            id="core-tech-title"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className={`text-3xl md:text-4xl font-bold ${colors.textHeading} text-center mb-16 md:mb-20`}
          >
            Our Core Technology Suite & Modules
          </motion.h2>
           {/* Using lg:grid-cols-2 still, will wrap the 5th item */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 max-w-5xl mx-auto"
            variants={cardGridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            >
            {products.map((product) => (
              <ProductSection
                key={product.id}
                icon={product.icon}
                title={product.title}
                description={product.description}
                benefits={product.benefits}
              />
            ))}
          </motion.div>
        </motion.section>

        {/* --- Intelligent Workflow Transformation Section --- */}
        <motion.section
             className={`py-20 md:py-24 my-20 md:my-28 bg-white rounded-3xl shadow-2xl border ${colors.borderLight} px-8 md:px-12 relative overflow-hidden`}
             initial="hidden" whileInView="visible" viewport={viewportSettings} variants={fadeInUp} aria-labelledby="workflow-title"
        >
            {/* ... Workflow section content remains the same ... */}
             <div className={`absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-64 h-64 ${colors.primaryMain}/5 rounded-full blur-3xl opacity-50`} aria-hidden="true"></div>
             <div className={`absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-80 h-80 ${colors.primaryMain}/10 rounded-full blur-3xl opacity-60`} aria-hidden="true"></div>
             <div className={`relative z-10 max-w-4xl mx-auto border-l-4 ${colors.borderPrimary} pl-8 md:pl-12`}>
                  <div className="flex flex-col md:flex-row items-center mb-8 text-center md:text-left">
                     <div className={`inline-flex p-5 rounded-2xl mr-0 md:mr-8 mb-5 md:mb-0 flex-shrink-0 bg-gradient-to-br ${colors.primaryMain}/10 from-primary-main/10 to-primary-main/5 border ${colors.borderPrimary}/20`}>
                         <workflowTransformationData.icon className={`w-16 h-16 md:w-20 md:w-20 ${colors.textPrimary}`} />
                     </div>
                     <div>
                         <h2 id="workflow-title" className={`text-3xl md:text-4xl font-bold ${colors.textHeading}`}>{workflowTransformationData.title}</h2>
                         <p className={`text-xl font-semibold ${colors.textPrimary}`}>{workflowTransformationData.subtitle}</p>
                     </div>
                 </div>
                 <p className={`text-lg ${colors.textBody} mb-6`}>{workflowTransformationData.description}</p>
                 <p className={`text-lg ${colors.textBody} mb-10 font-medium ${colors.textHeading}`}>Because every business process is unique, a personalized strategy call is the best way to map how our AI automation can specifically address your challenges and unlock new efficiencies.</p>
                 <div className="text-center mt-10">
                     <Button to="/contact?subject=WorkflowTransformationCall" variant="primary" size="lg" icon={<FiArrowRight/>} className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">Schedule a Workflow Strategy Call</Button>
                 </div>
             </div>
        </motion.section>

        {/* --- Refined Implementation Snippet --- */}
        <motion.section
             className={`my-20 md:my-28 pt-16 md:pt-20 border-t ${colors.borderMedium} text-center`}
             initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer} aria-labelledby="implementation-title"
        >
           {/* ... Implementation section content remains the same ... */}
            <motion.h2 id="implementation-title" variants={fadeInUp} className={`text-3xl md:text-4xl font-bold ${colors.textHeading} mb-6`}>Phased Implementation, Rapid Value</motion.h2>
            <motion.p variants={fadeInUp} className={`text-lg ${colors.textBody} max-w-3xl mx-auto mb-16`}>Our proven methodology ensures a smooth, low-risk transition with tangible outcomes delivered quickly:</motion.p>
            <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
                  {[ { week: "Weeks 1-2", title: "Discovery & Pilot Design", desc: "Collaborative system mapping and design of the initial high-impact pilot workflow."}, { week: "Weeks 3-4", title: "First Workflow Live", desc: "Deployment and validation of the first automated process using Smart Mirror™."}, { week: "Months 2-3+", title: "Scaled Rollout & ROI", desc: "Iterative expansion across departments, focusing on maximizing business value."},].map((phase, index) => ( <motion.div key={index} variants={fadeInUp} className={`p-8 rounded-xl ${colors.bgWhite} shadow-xl border ${colors.borderLight} text-left flex-1 min-w-[280px] transition-all duration-300 group hover:shadow-cyan-500/10 hover:border-primary-main/30`} whileHover={{ y: -4, scale: 1.02 }}>
                      <p className={`text-sm font-bold ${colors.textPrimary} mb-2 uppercase tracking-wider group-hover:text-primary-dark transition-colors`}>{phase.week}</p>
                      <h3 className={`text-xl font-semibold ${colors.textHeading} mb-3`}>{phase.title}</h3>
                      <p className={`text-base ${colors.textBody}`}>{phase.desc}</p>
                  </motion.div> ))}
             </div>
        </motion.section>

        {/* --- Refined Final Call to Action (Dark Theme) --- */}
        <motion.section
             className={`relative mt-24 md:mt-32 py-20 md:py-24 px-6 md:px-8 ${colors.darkBgGradient} rounded-2xl shadow-2xl text-center overflow-hidden ${colors.darkRing}`}
             initial="hidden" whileInView="visible" viewport={viewportSettings} variants={fadeInUp} aria-labelledby="final-cta-title"
        >
           {/* ... Final CTA content remains the same, using refined button styles ... */}
            <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3" aria-hidden="true"><div className={`w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl opacity-50`}></div></div>
            <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3" aria-hidden="true"><div className={`w-72 h-72 bg-blue-600/10 rounded-full blur-3xl opacity-60`}></div></div>
            <div className="relative z-10">
                 <motion.h2 id="final-cta-title" variants={fadeInUp} className={`text-4xl md:text-5xl font-bold ${colors.darkTextPrimary} mb-5 max-w-3xl mx-auto leading-tight`}>Ready to Modernize <span className={colors.darkTextHighlight}>Without Disruption?</span></motion.h2>
                 <motion.p variants={fadeInUp} className={`text-lg ${colors.darkTextSecondary} max-w-2xl mx-auto mb-12`}>Discover how our unique AI-driven approach delivers measurable results, guaranteed security, and a seamless transition. Request a personalized assessment today.</motion.p>
                 <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 md:gap-5">
                     <Button to="/request-demo" size="lg" icon={<FiArrowRight />} className={` group px-7 py-3.5 text-base ${colors.badgeGradient} ${colors.darkTextForAmber} font-bold ${colors.amberHoverGradient} hover:shadow-lg hover:shadow-amber-500/40 ring-1 ring-amber-600/50 !shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out animate-pulse `}> Request Personalized Demo </Button>
                     <Button to="/contact" size="lg" className={` px-7 py-3.5 text-base bg-slate-900/30 border-2 ${colors.amberBorder}/70 ${colors.textHighlightAmber} hover:bg-amber-500/10 ${colors.amberBorderHover} hover:${colors.textHighlightAmber} backdrop-blur-sm transform hover:-translate-y-0.5 transition-all duration-300 ease-out `}> Talk to Sales </Button>
                     <Button to="/case-studies" variant="secondary" size="lg" icon={<FiArrowRight />} className={`!text-slate-400 !bg-transparent !border-none hover:!text-slate-100 hover:underline`}> See Client Results </Button>
                 </motion.div>
            </div>
        </motion.section>
      </div>
    </div>
  );
}
