// src/pages/Careers.js
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiUsers,
  FiCoffee,
  FiTrendingUp,
  FiCpu,
  FiSearch,
  FiMapPin,
  FiFilter,
  FiArrowRight,
  FiMail,
  FiLinkedin,
  FiChevronDown,
  FiEdit3,
  FiThumbsUp,
} from "react-icons/fi";

import Button from "../components/Button";
import { jobOpenings } from "../data/jobs"; // Assuming this data uses localization keys or will be adapted
import { useLocalization } from "../components/LocalizationContext"; // Assuming this path is correct
import loyalShiftV2Theme from "../themes/loyalshift-v2.theme"; // Using the V2 theme

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
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
const SectionTitle = ({
  t,
  titleKey,
  subtitleKey,
  defaultTitle,
  defaultSubtitle,
  align = "center",
}) => (
  <motion.div
    className={`mb-12 md:mb-16 ${
      align === "center" ? "text-center" : "text-left"
    }`}
    variants={fadeInUp}
  >
    {subtitleKey && (
      <p
        className={`text-base font-semibold ${theme.textHighlight} uppercase tracking-wider mb-2`}
      >
        {t(subtitleKey, defaultSubtitle)}
      </p>
    )}
    <h2 className={`text-3xl md:text-4xl font-bold ${theme.textPrimary}`}>
      {t(titleKey, defaultTitle)}
    </h2>
  </motion.div>
);
SectionTitle.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string.isRequired,
  subtitleKey: PropTypes.string,
  defaultSubtitle: PropTypes.string,
  align: PropTypes.oneOf(["left", "center"]),
};

const ValuePropCard = ({
  t,
  icon: Icon,
  titleKey,
  descriptionKey,
  defaultTitle,
  defaultDescription,
}) => (
  <motion.div
    variants={fadeInUp}
    className={`p-6 text-center ${theme.surfaceCard} rounded-xl border ${theme.borderLight} ${theme.cardShadow} ${theme.cardHoverShadow} transition-all duration-300`}
    whileHover={{
      y: -5,
      borderColor: theme.inputFocusBorder.replace("focus:border-", "border-"),
    }}
  >
    <Icon
      className={`w-10 h-10 ${theme.textHighlight} mx-auto mb-4`}
      aria-hidden="true"
    />
    <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-2`}>
      {t(titleKey, defaultTitle)}
    </h3>
    <p className={`text-sm ${theme.textSecondary}`}>
      {t(descriptionKey, defaultDescription)}
    </p>
  </motion.div>
);
ValuePropCard.propTypes = {
  t: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  titleKey: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string.isRequired,
  defaultDescription: PropTypes.string.isRequired,
};

const JobListingCard = ({ t, job }) => (
  <motion.div
    variants={fadeInUp}
    layout
    initial="hidden"
    animate="visible"
    exit="hidden"
    className={`p-6 ${theme.surfaceCard} rounded-xl border ${theme.borderLight} ${theme.cardShadow} hover:border-cyan-500/40 transition-all duration-300 group flex flex-col`}
    whileHover={{ y: -4 }}
  >
    <div className="flex justify-between items-start mb-2">
      <h3
        className={`text-xl font-semibold ${theme.textPrimary} group-hover:${theme.textHighlight} transition-colors mr-4`}
      >
        {t(job.titleKey, job.title)}
      </h3>
      <span
        className={`self-start text-xs font-medium py-1 px-3 rounded-full ${theme.accentCyanBg}/10 ${theme.accentCyan} border ${theme.borderAccent} whitespace-nowrap flex-shrink-0`}
      >
        {t(job.typeKey, job.type)}
      </span>
    </div>
    <div className={`flex items-center text-sm ${theme.textSecondary} mb-4`}>
      <FiBriefcase className="w-4 h-4 mr-1.5 opacity-80" />{" "}
      {t(job.departmentKey, job.department)}
      <span className="mx-2 text-slate-600">|</span>{" "}
      {/* This was text-slate-600, should be theme.textMuted or similar */}
      <FiMapPin className="w-4 h-4 mr-1.5 opacity-80" />{" "}
      {t(job.locationKey, job.location)}
    </div>
    <p className={`text-sm ${theme.textSecondary} mb-5 flex-grow`}>
      {t(job.descriptionKey, job.description)}
    </p>
    <div className="mt-auto">
      {/* --- UPDATED BUTTON STYLING --- */}
      <Button
        to={`/jobs/${job.id}`}
        // variant prop removed to rely purely on className for this specific style
        size="base" // Or 'md' depending on your Button component's sizing
        variant="secondary"
        icon={<FiArrowRight />}
      >
        {t("careers.jobCard.cta", "Learn More & Apply")}
      </Button>
      {/* --- END OF UPDATED BUTTON STYLING --- */}
    </div>
  </motion.div>
);
JobListingCard.propTypes = {
  t: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired, // Ensure job object has localization keys
};

// --- Main Careers Component ---
export default function Careers() {
  const { t } = useLocalization();

  const companyValues = [
    {
      icon: FiTrendingUp,
      titleKey: "careers.values.impact.title",
      defaultTitle: "Impactful Work",
      descriptionKey: "careers.values.impact.desc",
      defaultDescription:
        "Directly contribute to modernizing critical systems for major enterprises.",
    },
    {
      icon: FiCpu,
      titleKey: "careers.values.tech.title",
      defaultTitle: "Cutting-Edge Tech",
      descriptionKey: "careers.values.tech.desc",
      defaultDescription:
        "Work with explainable AI, advanced NLP, and robust integration platforms.",
    },
    {
      icon: FiUsers,
      titleKey: "careers.values.culture.title",
      defaultTitle: "Collaborative Culture",
      descriptionKey: "careers.values.culture.desc",
      defaultDescription:
        "Join a passionate team of experts focused on innovation and client success.",
    },
    {
      icon: FiCoffee,
      titleKey: "careers.values.growth.title",
      defaultTitle: "Growth & Learning",
      descriptionKey: "careers.values.growth.desc",
      defaultDescription:
        "Continuous learning opportunities and career development support.",
    },
  ];

  const applicationSteps = [
    {
      icon: FiEdit3,
      titleKey: "careers.process.step1.title",
      defaultTitle: "Submit Application",
      descriptionKey: "careers.process.step1.desc",
      defaultDescription:
        "Apply online through our careers portal for the role that best fits your skills.",
    },
    {
      icon: FiUsers,
      titleKey: "careers.process.step2.title",
      defaultTitle: "Interview Process",
      descriptionKey: "careers.process.step2.desc",
      defaultDescription:
        "Engage with our hiring team and technical experts through virtual interviews.",
    },
    {
      icon: FiThumbsUp,
      titleKey: "careers.process.step3.title",
      defaultTitle: "Offer & Onboarding",
      descriptionKey: "careers.process.step3.desc",
      defaultDescription:
        "Successful candidates receive an offer and begin our comprehensive onboarding program.",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  // Assuming jobOpenings data is structured with localization keys like job.titleKey, job.departmentKey etc.
  const departments = useMemo(
    () => [
      { key: "all", default: "All Departments" },
      ...jobOpenings.reduce((acc, job) => {
        if (!acc.find((d) => d.key === job.departmentKey)) {
          acc.push({ key: job.departmentKey, default: job.department });
        }
        return acc;
      }, []),
    ],
    []
  );

  const filteredJobs = useMemo(() => {
    return jobOpenings.filter((job) => {
      const title = t(job.titleKey, job.title);
      const description = t(job.descriptionKey, job.description);
      const department = t(job.departmentKey, job.department);

      const termMatch =
        searchTerm === "" ||
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());

      const deptMatch =
        selectedDept === "All" ||
        selectedDept === "all" ||
        department === selectedDept;

      return termMatch && deptMatch;
    });
  }, [searchTerm, selectedDept, t]);

  const dottedBackgroundStyle = {
    backgroundImage: `radial-gradient(${theme.textMuted.replace(
      "text-",
      "var(--color-"
    )}22 1px, transparent 0)`, // Use CSS var for color
    backgroundSize: "20px 20px", // Slightly larger dots
  };

  return (
    <div
      className={`${theme.background} py-16 md:py-24 overflow-x-hidden`} // Using theme.background
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
            className={`inline-block p-4 ${theme.accentCyanBg}/10 rounded-full mb-4 border ${theme.borderAccent} shadow-md`}
          >
            <FiBriefcase className={`w-12 h-12 ${theme.textHighlight}`} />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            id="careers-hero-title"
            className={`text-4xl md:text-5xl lg:text-6xl font-bold ${theme.textPrimary} mb-4`}
          >
            {t("careers.hero.title1", "Build the Future of")}{" "}
            <span className={theme.textHighlight}>
              {t("careers.hero.titleAccent", "Enterprise AI")}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className={`${theme.textSecondary} text-lg md:text-xl max-w-3xl mx-auto`}
          >
            {t(
              "careers.hero.subtitle",
              "Join LoyalShift and help companies unlock decades of trapped value by modernizing their core systems with groundbreaking, explainable AI – without the disruption."
            )}
          </motion.p>
        </motion.section>

        {/* --- Why Work Here --- */}
        <motion.section
          aria-labelledby="why-work-here-title"
          className={`mb-16 md:mb-24 p-8 rounded-2xl ${theme.surfaceCard} shadow-xl border ${theme.borderLight}`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          <SectionTitle
            t={t}
            titleKey="careers.whyWorkHere.title"
            defaultTitle="Shape the Future with Us"
            subtitleKey="careers.whyWorkHere.subtitle"
            defaultSubtitle="Why LoyalShift?"
            align="left"
          />
          <motion.p
            variants={fadeInUp}
            className={`text-lg ${theme.textSecondary} mb-10 max-w-4xl`}
          >
            {t(
              "careers.whyWorkHere.description",
              "We're not just building software; we're solving fundamental business problems with a unique blend of deep system understanding and cutting-edge AI. If you're passionate about impactful work, innovation, and collaboration, you'll thrive here."
            )}
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <ValuePropCard key={index} t={t} {...value} />
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
          <SectionTitle
            t={t}
            titleKey="careers.openPositions.title"
            defaultTitle="Open Positions"
            subtitleKey="careers.openPositions.subtitle"
            defaultSubtitle="Find Your Role"
          />

          <motion.div
            variants={fadeInUp}
            className={`mb-8 p-4 ${theme.surfaceCard} rounded-xl border ${theme.borderLight} shadow-lg flex flex-col sm:flex-row gap-4 items-center`}
          >
            <div className="relative flex-grow w-full sm:w-auto">
              <FiSearch
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted} pointer-events-none`}
              />
              <input
                type="text"
                placeholder={t(
                  "careers.searchPlaceholder",
                  "Search by title or keyword..."
                )}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-11 pr-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.textPrimary} ${theme.inputBg} ${theme.inputFocusStyle} transition-colors`}
                aria-label={t("careers.searchAriaLabel", "Search job openings")}
              />
            </div>
            <div className="relative w-full sm:w-auto sm:min-w-[220px]">
              <FiFilter
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted} pointer-events-none`}
              />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className={`w-full pl-11 pr-10 py-2.5 appearance-none rounded-lg border ${theme.inputBorder} ${theme.textPrimary} ${theme.inputBg} ${theme.inputFocusStyle} transition-colors`}
                aria-label={t(
                  "careers.filterAriaLabel",
                  "Filter by department"
                )}
              >
                {departments.map((dept) => (
                  <option key={dept.key} value={t(dept.key, dept.default)}>
                    {t(dept.key, dept.default)}
                  </option>
                ))}
              </select>
              <FiChevronDown
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted} pointer-events-none`}
              />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobListingCard key={job.id} t={t} job={job} />
              ))
            ) : (
              <motion.p
                variants={fadeInUp}
                className={`lg:col-span-3 text-center ${theme.textSecondary} p-10 ${theme.surfaceMuted} rounded-xl border border-dashed ${theme.borderLight}`}
              >
                {t(
                  "careers.noPositionsFound",
                  "No open positions match your current filters. Try broadening your search!"
                )}
              </motion.p>
            )}
          </div>
        </motion.section>

        {/* --- Life at LoyalShift --- */}
        <motion.section
          aria-labelledby="life-title"
          className={`mb-16 md:mb-24 p-8 rounded-2xl ${theme.surfaceCard} shadow-xl border ${theme.borderLight} text-center`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <SectionTitle
            t={t}
            titleKey="careers.lifeAtLoyalShift.title"
            defaultTitle="Life at LoyalShift"
            subtitleKey="careers.lifeAtLoyalShift.subtitle"
            defaultSubtitle="Culture & Community"
          />
          <p
            className={`text-lg ${theme.textSecondary} max-w-3xl mx-auto mb-8`}
          >
            {t(
              "careers.lifeAtLoyalShift.description",
              "We foster a dynamic environment where innovation thrives. Expect challenging projects, supportive colleagues, and opportunities to make a real difference."
            )}
          </p>
          {/* Placeholder for images/videos would go here, styled with theme */}
        </motion.section>

        {/* --- Application Process --- */}
        <motion.section
          aria-labelledby="process-title"
          className={`mb-16 md:mb-24 p-8 rounded-2xl ${theme.surfaceCard} shadow-xl border ${theme.borderLight}`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          <SectionTitle
            t={t}
            titleKey="careers.applicationProcess.title"
            defaultTitle="Our Application Process"
            align="left"
          />
          <div
            className={`grid p-8 md:grid-cols-3 gap-8 relative 
                          before:absolute before:hidden md:before:block 
                          before:top-6 before:left-1/2 before:transform before:-translate-x-1/2 
                          before:w-[calc(66%-2.5rem)] before:h-1 
                          ${theme.surfaceMuted} rounded-full`}
          >
            {applicationSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center relative z-10 px-4"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${theme.accentCyanBg}/10 border-2 ${theme.borderAccent} mb-4 shadow-sm`}
                >
                  <step.icon className={`w-7 h-7 ${theme.textHighlight}`} />
                </div>
                <h3
                  className={`text-lg font-semibold ${theme.textPrimary} mb-1`}
                >
                  {t(step.titleKey, step.defaultTitle)}
                </h3>
                <p className={`text-sm ${theme.textSecondary}`}>
                  {t(step.descriptionKey, step.defaultDescription)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Final CTA Section --- */}
        <motion.section
          aria-labelledby="cta-careers-title"
          className={`text-center ${theme.surfaceMuted} p-10 rounded-2xl shadow-lg border ${theme.borderLight}`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <h2
            id="cta-careers-title"
            className={`text-3xl font-bold ${theme.textPrimary} mb-4`}
          >
            {t("careers.cta.title", "Don't See the Perfect Fit?")}
          </h2>
          <p
            className={`text-lg ${theme.textSecondary} max-w-2xl mx-auto mb-8`}
          >
            {t(
              "careers.cta.subtitle",
              "We're always looking for talented individuals passionate about AI and system modernization. Send us your resume or connect with us on LinkedIn."
            )}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              to="/contact?subject=CareerInquiry"
              variant="primary"
              size="lg"
              icon={<FiMail />}
            >
              {t("careers.cta.contactHR", "Contact HR")}
            </Button>
            <Button
              to="https://www.linkedin.com/in/loyalshift/"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline" // Use outline for secondary actions like this
              size="lg"
              icon={<FiLinkedin />}
              className={`!border-2 !${theme.accentCyan} !${theme.accentCyan} hover:!bg-cyan-500/10`} // Ensure outline button uses theme
            >
              {t("careers.cta.linkedin", "Follow on LinkedIn")}
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

// PropTypes
Careers.propTypes = {}; // No direct props for this page
SectionTitle.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string.isRequired,
  subtitleKey: PropTypes.string,
  defaultSubtitle: PropTypes.string,
  align: PropTypes.oneOf(["left", "center"]),
};
ValuePropCard.propTypes = {
  t: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  titleKey: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string.isRequired,
  defaultDescription: PropTypes.string.isRequired,
};
JobListingCard.propTypes = {
  t: PropTypes.func.isRequired,
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    titleKey: PropTypes.string.isRequired, // Expecting localization keys now
    title: PropTypes.string.isRequired, // Default fallback
    departmentKey: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    locationKey: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    typeKey: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    descriptionKey: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // Add other job properties with localization keys as needed
  }).isRequired,
};
