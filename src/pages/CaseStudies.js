// src/pages/CaseStudiesPage.js

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBriefcase, // General Case Studies Icon
  FiZap, // Energy (like Solar)
  FiArrowRight,
  FiCheckCircle, // Icon for results/benefits
} from "react-icons/fi";

// Assuming Button component path is correct
import Button from "../components/Button"; // Adjust path if needed

// Define light theme colors (consistent with AboutUs.js, Contact.js etc.)
// Ensure these align with your tailwind.config.js interpretation for light mode
const colors = {
  bgBase: "bg-neutral-light", // Main page background
  bgWhite: "bg-neutral-white", // Card/Section backgrounds
  textHeading: "text-neutral-dark",
  textBody: "text-neutral-main",
  textPrimary: "text-primary-main",
  borderLight: "border-neutral-light",
  borderPrimary: "border-primary-main", // For accents
  accentSuccess: "text-status-success", // For results
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

// --- Placeholder Data (same as before) ---
const caseStudiesData = [
  // {
  //     id: 'healthcare-hospital-network',
  //     industry: 'Healthcare',
  //     icon: FiHeart,
  //     clientName: 'Major Hospital Network',
  //     title: 'Automating Patient Records Integration',
  //     challenge: 'Integrating disparate EMR systems causing delays and errors in patient data access across departments.',
  //     solutionHighlight: 'Deployed Universal Adapter™ to create a unified API layer over existing EMRs.',
  //     result: '40% Reduction in Data Entry Errors',
  //     resultIcon: FiCheckCircle,
  // },
  // {
  //     id: 'healthcare-pharma-compliance',
  //     industry: 'Healthcare',
  //     icon: FiHeart,
  //     clientName: 'Pharmaceutical R&D Firm',
  //     title: 'Ensuring Compliance in Clinical Trials',
  //     challenge: 'Maintaining audit trails and data integrity for multi-site clinical trials with legacy tracking systems.',
  //     solutionHighlight: 'Implemented Audit Guardian™ alongside Smart Mirror™ for validated, compliant data logging.',
  //     result: '100% Audit Trail Coverage',
  //     resultIcon: FiCheckCircle,
  // },

  // {
  //     id: 'logistics-global-shipping',
  //     industry: 'Logistics',
  //     icon: FiTruck,
  //     clientName: 'Global Shipping Co.',
  //     title: 'Real-time Shipment Tracking & Visibility',
  //     challenge: 'Lack of real-time visibility into shipment status across multiple legacy carrier systems.',
  //     solutionHighlight: 'Utilized Universal Adapter™ to aggregate data feeds into a single dashboard and API.',
  //     result: '90% Faster Customer Updates',
  //     resultIcon: FiCheckCircle,
  // },
  // {
  //     id: 'logistics-warehouse-automation',
  //     industry: 'Logistics',
  //     icon: FiTruck,
  //     clientName: 'Regional Distribution Center',
  //     title: 'Automating Warehouse Order Picking',
  //     challenge: 'Manual, error-prone order picking processes based on paper printouts from an AS/400 system.',
  //     solutionHighlight: 'AI Workflow Transformation processed digital orders, optimized routes, and sent instructions to handheld scanners.',
  //     result: '30% Increase in Picking Efficiency',
  //     resultIcon: FiCheckCircle,
  // },
  // Energy
  {
    id: "energy-solar-vpp", // Link to existing detailed page
    industry: "Energy",
    icon: FiZap,
    clientName: "Solar",
    title: "Launching a Virtual Power Plant (VPP)",
    challenge:
      "Needed to rapidly deploy a scalable platform to manage distributed energy resources (DERs) for grid services.",
    solutionHighlight:
      "Leveraged LoyalShift's configurable VPP & DERMS Orchestration Platform.",
    result: "Operational VPP in 6 Months",
    resultIcon: FiCheckCircle,
    link: "/case-studies/vpp-strategy",
  },
  // {
  //     id: 'energy-utility-grid',
  //     industry: 'Energy',
  //     icon: FiZap,
  //     clientName: 'Utility Provider',
  //     title: 'Modernizing Grid Management Systems',
  //     challenge: 'Aging SCADA system unable to integrate modern smart grid data and renewable energy feeds.',
  //     solutionHighlight: 'Implemented Universal Adapter™ and Smart Mirror™ to safely overlay AI forecasting onto existing controls.',
  //     result: 'Improved Grid Stability Forecasting',
  //     resultIcon: FiCheckCircle,
  // },
  // Entertainment
  // {
  //     id: 'entertainment-studio-royalties',
  //     industry: 'Entertainment',
  //     icon: FiFilm,
  //     clientName: 'Film & TV Studio',
  //     title: 'Automating Royalty Reporting',
  //     challenge: 'Complex, manual process for calculating and distributing royalties based on data from multiple legacy rights management systems.',
  //     solutionHighlight: 'AI Workflow Transformation extracted data, applied complex business rules, and generated accurate reports.',
  //     result: '80% Faster Royalty Processing',
  //     resultIcon: FiCheckCircle,
  // },
  //  {
  //     id: 'entertainment-streaming-personalization',
  //     industry: 'Entertainment',
  //     icon: FiFilm,
  //     clientName: 'Streaming Service',
  //     title: 'Enhancing Content Recommendation',
  //     challenge: 'Legacy user database hindering the ability to integrate real-time viewing data for better personalization.',
  //     solutionHighlight: 'Used Universal Adapter™ to stream interaction data to a modern recommendation engine without migrating the core user DB.',
  //     result: '15% Uplift in User Engagement',
  //     resultIcon: FiCheckCircle,
  // },
];

// Group studies by industry (same as before)
const studiesByIndustry = caseStudiesData.reduce((acc, study) => {
  const industry = study.industry;
  if (!acc[industry]) {
    acc[industry] = {
      icon: study.icon, // Store the icon for the industry
      studies: [],
    };
  }
  acc[industry].studies.push(study);
  return acc;
}, {});

// Component for individual Case Study Card (same as before)
const CaseStudyCard = ({ study }) => (
  <motion.div
    variants={fadeInUp} // This inner div still uses fadeInUp for staggered item appearance
    whileHover={{
      y: -5,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300 },
    }}
    className={`${colors.bgWhite} p-6 rounded-lg shadow-md border ${colors.borderLight} flex flex-col h-full group hover:border-primary-main/50 transition-colors duration-300`}
  >
    <h3
      className={`text-xl font-semibold ${colors.textHeading} mb-2 group-hover:${colors.textPrimary} transition-colors`}
    >
      {study.title}
    </h3>
    <p className={`text-sm font-medium ${colors.textPrimary} mb-3`}>
      Client: {study.clientName}
    </p>
    <p
      className={`text-base font-semibold ${colors.accentSuccess} mb-4 mt-auto pt-3 flex items-center`}
    >
      <study.resultIcon className="w-5 h-5 mr-2 flex-shrink-0" />
      {study.result}
    </p>
    <Link
      to={study.link || `/case-studies/${study.id}`}
      className={`inline-flex items-center text-sm font-medium ${colors.textPrimary} hover:underline group-hover:text-primary-dark transition-colors`}
    >
      Read Full Study{" "}
      <FiArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

export default function CaseStudiesPage() {
  return (
    <div className={`${colors.bgBase} py-16 md:py-24 overflow-x-hidden`}>
      <div className="container mx-auto px-4">
        {/* --- Hero Section (same as before) --- */}
        <motion.section
          className="text-center mt-16 mb-16 md:mb-24"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-block p-3 bg-primary-main/10 rounded-full mb-4"
          >
            <FiBriefcase className={`w-12 h-12 ${colors.textPrimary}`} />
          </motion.div>
          <h1
            className={`text-4xl md:text-5xl font-bold ${colors.textHeading} mb-4`}
          >
            Real Results, Real Transformation
          </h1>
          <p
            className={`text-lg md:text-xl ${colors.textBody} max-w-3xl mx-auto`}
          >
            Explore how businesses across diverse sectors leverage LoyalShift to
            overcome legacy challenges, automate critical processes, and achieve
            significant, measurable improvements.
          </p>
        </motion.section>

        {/* --- Industry Sections --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          // ADDED mx-auto TO CENTER THIS BLOCK HORIZONTALLY
          className="space-y-16 md:space-y-20 max-w-6xl mx-auto"
        >
          {Object.entries(studiesByIndustry).map(
            ([industry, { icon: Icon, studies }]) => (
              <motion.section key={industry} variants={fadeInUp}>
                {/* --- UPDATED TITLE CONTAINER --- */}
                {/* Reduced bottom margin (mb) and padding (pb) */}
                <div
                  className={`flex items-center mb-4 md:mb-6 border-b border-neutral-main/20 pb-2`}
                >
                  <Icon
                    className={`w-8 h-8 md:w-10 md:h-10 ${colors.textPrimary} mr-4 flex-shrink-0`}
                  />
                  {/* Adjusted title size for potential wrapping/consistency */}
                  <h2
                    className={`text-3xl md:text-4xl font-bold ${colors.textHeading}`}
                  >
                    {industry}
                  </h2>
                </div>
                {/* --- END UPDATED TITLE CONTAINER --- */}

                {/* Card Container (using flexbox centering) */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {studies.map((study) => (
                    // Card width wrapper
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

        {/* --- Call to Action Section (same as before) --- */}
        <motion.section
          className={`mt-20 md:mt-28 text-center ${colors.bgWhite} p-10 md:p-16 rounded-lg shadow-md border ${colors.borderLight}`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <h2 className={`text-3xl font-bold ${colors.textHeading} mb-4`}>
            Ready to Write Your Success Story?
          </h2>
          <p className={`text-lg ${colors.textBody} max-w-3xl mx-auto mb-8`}>
            Your legacy systems hold untapped potential. Let's discuss how
            LoyalShift's AI-powered modernization can deliver results tailored
            to your specific industry and challenges.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              to="/contact?subject=ProjectInquiry"
              variant="primary"
              size="lg"
              icon={<FiArrowRight />}
            >
              Discuss Your Project
            </Button>
            <Button
              to="/solutions"
              variant="secondary"
              size="lg"
              className="!bg-transparent !border !border-neutral-main/70 !text-neutral-dark hover:!border-neutral-main hover:!bg-neutral-main/5 focus:!ring-neutral-main/50"
            >
              Explore Our Solutions
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
