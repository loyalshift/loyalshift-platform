// src/pages/Careers.js

import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FiBriefcase, // Main Hero, Team Section
  FiUsers, // Why Work Here Alt
  FiCoffee, // Benefits/Values
  FiTrendingUp, // Benefits/Values, Growth
  FiCpu, // Tech Stack
  FiSearch, // Filter/Search
  FiMapPin, // Location
  FiFilter, // Filter Alt
  FiArrowRight,
  FiMail, // Contact HR
  FiLinkedin, // Social Link (example)
  FiImage, // Image placeholder
  FiChevronDown,
  FiEdit3, // Application Process
  FiThumbsUp, // Application Process
} from "react-icons/fi";

// Assuming Button component path is correct
import Button from "../components/Button";

import { jobOpenings } from "../data/jobs";

// --- Theme Colors (Light Theme) ---
// (Assuming colors object is available or imported similarly to AboutUs.js)
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
  borderDark: "border-neutral-main",
  borderPrimary: "border-primary-main",
  accentSuccess: "text-status-success",
  accentInfo: "text-status-info",
  bgHighlightSoft: "bg-primary-main/5",
  borderHighlightSoft: "border-primary-main/10",
  bgHighlightMedium: "bg-primary-main/10",
  borderHighlightMedium: "border-primary-main/20",
  inputBorder: "border-neutral-main/50",
  inputFocusBorder: "focus:border-primary-main",
  inputFocusRing: "focus:ring-primary-main/50",
};

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 }; // Slightly less amount needed
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};
// --- End Animation Variants ---

// --- Reusable Components ---
const SectionTitle = ({ title, subtitle, align = "center" }) => (
  <motion.div
    className={`mb-12 md:mb-16 ${
      align === "center" ? "text-center" : "text-left"
    }`}
    variants={fadeInUp}
  >
    {subtitle && (
      <p
        className={`text-base font-semibold ${colors.textPrimary} uppercase tracking-wider mb-2`}
      >
        {subtitle}
      </p>
    )}
    <h2 className={`text-3xl md:text-4xl font-bold ${colors.textHeading}`}>
      {title}
    </h2>
  </motion.div>
);
SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(["left", "center"]),
};

const ValuePropCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className={`p-6 text-center ${colors.bgWhite} rounded-lg border ${colors.borderLight} shadow-sm hover:shadow-md transition-shadow`}
  >
    <Icon
      className={`w-10 h-10 ${colors.textPrimary} mx-auto mb-4`}
      aria-hidden="true"
    />
    <h3 className={`text-lg font-semibold ${colors.textHeading} mb-2`}>
      {title}
    </h3>
    <p className={`text-sm ${colors.textBody}`}>{description}</p>
  </motion.div>
);
ValuePropCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const JobListingCard = ({ job }) => (
  <motion.div
    variants={fadeInUp}
    layout // Animate layout changes when filtering
    initial="hidden" // Apply variants for entrance animation
    animate="visible"
    exit="hidden" // Apply variants for exit animation
    className={`p-6 ${colors.bgWhite} rounded-lg border ${colors.borderLight} shadow-sm hover:shadow-lg hover:border-primary-main/40 transition-all duration-300 group flex flex-col`}
    whileHover={{ y: -4 }}
  >
    <div className="flex justify-between items-start mb-2">
      {/* Job Title */}
      <h3
        className={`text-xl font-semibold ${colors.textHeading} group-hover:${colors.textPrimary} transition-colors mr-4`}
      >
        {" "}
        {/* Added margin */}
        {job.title}
      </h3>
      {/* Full-time Tag */}
      <span
        className={`
            self-start /* Add this to explicitly prevent vertical stretching */
            text-xs font-medium py-1 px-3 rounded-full 
            ${colors.bgHighlightSoft} ${colors.textPrimaryDark} 
            whitespace-nowrap flex-shrink-0 /* Prevent wrapping/shrinking */
        `}
      >
        {job.type}
      </span>
    </div>
    <div className={`flex items-center text-sm ${colors.textBody} mb-4`}>
      <FiBriefcase className="w-4 h-4 mr-1.5 opacity-80" aria-hidden="true" />{" "}
      {job.department}
      <span className="mx-2">|</span>
      <FiMapPin className="w-4 h-4 mr-1.5 opacity-80" aria-hidden="true" />{" "}
      {job.location}
    </div>
    <p className={`text-sm ${colors.textBody} mb-5 flex-grow`}>
      {job.description}
    </p>
    <div className="mt-auto">
      <Button
        to={`/apply/${job.id}`}
        variant="secondary"
        size="base"
        className={`w-full sm:w-auto group-hover:!bg-primary-main group-hover:!text-white group-hover:!border-primary-main transition-colors duration-300`}
        icon={<FiArrowRight />}
      >
        Learn More & Apply
      </Button>
    </div>
  </motion.div>
);
JobListingCard.propTypes = { job: PropTypes.object.isRequired };

// --- Main Careers Component ---
export default function Careers() {
  // --- Placeholder Data ---
  const companyValues = [
    {
      icon: FiTrendingUp,
      title: "Impactful Work",
      description:
        "Directly contribute to modernizing critical systems for major enterprises.",
    },
    {
      icon: FiCpu,
      title: "Cutting-Edge Tech",
      description:
        "Work with explainable AI, advanced NLP, and robust integration platforms.",
    },
    {
      icon: FiUsers,
      title: "Collaborative Culture",
      description:
        "Join a passionate team of experts focused on innovation and client success.",
    },
    {
      icon: FiCoffee,
      title: "Growth & Learning",
      description:
        "Continuous learning opportunities and career development support.",
    },
  ];

  const applicationSteps = [
    {
      icon: FiEdit3,
      title: "Submit Application",
      description:
        "Apply online through our careers portal for the role that best fits your skills.",
    },
    {
      icon: FiUsers,
      title: "Interview Process",
      description:
        "Engage with our hiring team and technical experts through virtual interviews.",
    },
    {
      icon: FiThumbsUp,
      title: "Offer & Onboarding",
      description:
        "Successful candidates receive an offer and begin our comprehensive onboarding program.",
    },
  ];

  // --- State for Filtering ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const departments = [
    "All",
    ...new Set(jobOpenings.map((job) => job.department)),
  ]; // Get unique departments

  // --- Filtering Logic ---
  const filteredJobs = useMemo(() => {
    return jobOpenings.filter((job) => {
      const termMatch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const deptMatch =
        selectedDept === "All" || job.department === selectedDept;
      return termMatch && deptMatch;
    });
  }, [searchTerm, selectedDept]);

  const dottedBackgroundStyle = {
    backgroundImage: `radial-gradient(${colors.textBody}33 1px, transparent 0)`,
    backgroundSize: "16px 16px",
  };

  return (
    <div
      className={`${colors.bgBase} py-16 md:py-24 overflow-x-hidden`}
      style={dottedBackgroundStyle}
      role="main"
    >
      <div className="container mx-auto px-4">
        {/* --- Hero Section --- */}
        <motion.section
          aria-labelledby="careers-hero-title"
          className="text-center mt-16 mb-16 md:mb-24"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={scaleUp}
            className={`inline-block p-4 ${colors.bgHighlightMedium} rounded-full mb-4 border ${colors.borderHighlightMedium}`}
          >
            <FiBriefcase className={`w-12 h-12 ${colors.textPrimary}`} />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            id="careers-hero-title"
            className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colors.textHeading} mb-4`}
          >
            Build the Future of{" "}
            <span className={colors.textPrimary}>Enterprise AI</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className={`${colors.textBody} text-lg md:text-xl max-w-3xl mx-auto`}
          >
            Join LoyalShift and help companies unlock decades of trapped value
            by modernizing their core systems with groundbreaking, explainable
            AI – without the disruption.
          </motion.p>
        </motion.section>

        {/* --- Why Work Here --- */}
        <motion.section
          aria-labelledby="why-work-here-title"
          className={`mb-16 md:mb-24 p-8 rounded-lg ${colors.bgWhite} shadow-sm border ${colors.borderLight}`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          <SectionTitle
            title="Shape the Future with Us"
            subtitle="Why LoyalShift?"
            align="left"
          />
          <motion.p
            variants={fadeInUp}
            className={`text-lg ${colors.textBody} mb-10 max-w-4xl`}
          >
            We're not just building software; we're solving fundamental business
            problems with a unique blend of deep system understanding and
            cutting-edge AI. If you're passionate about impactful work,
            innovation, and collaboration, you'll thrive here.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <ValuePropCard key={index} {...value} />
            ))}
          </div>
          <div id="open-positions" />
        </motion.section>
        {/* --- Open Positions --- */}
        <motion.section
          aria-labelledby="open-positions-title"
          className="mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          <SectionTitle title="Open Positions" subtitle="Find Your Role" />

          {/* Filter Controls */}
          <motion.div
            variants={fadeInUp}
            className={`mb-8 p-4 ${colors.bgWhite} rounded-lg border ${colors.borderLight} shadow-sm flex flex-col sm:flex-row gap-4 items-center`}
          >
            <div className="relative flex-grow w-full sm:w-auto">
              <FiSearch
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.textBody} opacity-60`}
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search by title or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-md border ${colors.inputBorder} ${colors.textBody} focus:outline-none ${colors.inputFocusRing} ${colors.inputFocusBorder}`}
                aria-label="Search job openings"
              />
            </div>
            <div className="relative w-full sm:w-auto sm:min-w-[200px]">
              <FiFilter
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.textBody} opacity-60`}
                aria-hidden="true"
              />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className={`w-full pl-10 pr-8 py-2 appearance-none rounded-md border ${colors.inputBorder} ${colors.textBody} focus:outline-none ${colors.inputFocusRing} ${colors.inputFocusBorder} bg-white`}
                aria-label="Filter by department"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <FiChevronDown
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.textBody} opacity-60 pointer-events-none`}
              />
            </div>
          </motion.div>

          {/* Job List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobListingCard key={job.id} job={job} />
              ))
            ) : (
              <motion.p
                variants={fadeInUp}
                className={`lg:col-span-3 text-center ${colors.textBody} p-8 bg-neutral-white/50 rounded-lg border border-dashed ${colors.borderMedium}`}
              >
                No open positions match your current filters. Try broadening
                your search!
              </motion.p>
            )}
          </div>
        </motion.section>

        {/* --- Life at LoyalShift (Placeholder) --- */}
        <motion.section
          aria-labelledby="life-title"
          className={`mb-16 md:mb-24 p-8 rounded-lg ${colors.bgWhite} shadow-sm border ${colors.borderLight} text-center`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <SectionTitle
            title="Life at LoyalShift"
            subtitle="Culture & Community"
          />
          <p className={`text-lg ${colors.textBody} max-w-3xl mx-auto mb-8`}>
            We foster a dynamic environment where innovation thrives. Expect
            challenging projects, supportive colleagues, and opportunities to
            make a real difference.
          </p>
          {/* Placeholder for images/videos */}
          {/* <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 h-40 ${colors.textBody} opacity-50`}
          >
            <div
              className={`bg-neutral-main/10 rounded flex items-center justify-center`}
            >
              <FiImage className="w-8 h-8" />
            </div>
            <div
              className={`bg-neutral-main/10 rounded flex items-center justify-center`}
            >
              <FiImage className="w-8 h-8" />
            </div>
            <div
              className={`bg-neutral-main/10 rounded flex items-center justify-center`}
            >
              <FiImage className="w-8 h-8" />
            </div>
            <div
              className={`bg-neutral-main/10 rounded flex items-center justify-center`}
            >
              <FiImage className="w-8 h-8" />
            </div>
          </div> */}
        </motion.section>

        {/* --- Application Process --- */}
        <motion.section
          aria-labelledby="process-title"
          className={`mb-16 md:mb-24 p-8 rounded-lg ${colors.bgWhite} shadow-sm border ${colors.borderLight}`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          <SectionTitle title="Our Application Process" align="left" />
          <div className="grid md:grid-cols-3 gap-8 relative before:absolute before:hidden md:before:block before:top-5 before:left-1/2 before:transform before:-translate-x-1/2 before:w-[calc(66%-2rem)] before:h-0.5 before:bg-neutral-main/20">
            {applicationSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center relative z-10 px-4"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colors.bgHighlightMedium} border-2 ${colors.borderHighlightSoft} mb-3`}
                >
                  <step.icon className={`w-6 h-6 ${colors.textPrimary}`} />
                </div>
                <h3
                  className={`text-lg font-semibold ${colors.textHeading} mb-1`}
                >
                  {step.title}
                </h3>
                <p className={`text-sm ${colors.textBody}`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Final CTA Section --- */}
        <motion.section
          aria-labelledby="cta-careers-title"
          className={`text-center ${colors.bgHighlightMedium} p-10 rounded-lg shadow-sm border ${colors.borderHighlightSoft}`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <h2
            id="cta-careers-title"
            className={`text-3xl font-bold ${colors.textHeading} mb-4`}
          >
            Don't See the Perfect Fit?
          </h2>
          <p className={`text-lg ${colors.textBody} max-w-2xl mx-auto mb-8`}>
            We're always looking for talented individuals passionate about AI
            and system modernization. Send us your resume or connect with us on
            LinkedIn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" icon={<FiMail />}>
              Contact HR
            </Button>
            {/* Replace '#' with your actual LinkedIn URL */}
            <a
              href="https://www.linkedin.com/in/loyalshift/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold rounded-lg transition-all duration-300 ease-out shadow-md ${colors.textBody} bg-white border border-neutral-light hover:border-neutral-main hover:scale-105 transform`}
            >
              <FiLinkedin className="mr-2 w-5 h-5" /> Follow on LinkedIn
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
