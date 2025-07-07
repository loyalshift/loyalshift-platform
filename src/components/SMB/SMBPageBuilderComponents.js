// src/components/smb/pageBuilder/SMBPageBuilderComponents.js
// This file contains the library of reusable, themed section components for the SMB Page Builder.

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

// --- CONTEXTS, THEMES, & SHARED COMPONENTS ---

// --- ICONS ---
import {
  FiArrowRight,
  FiChevronDown,
  FiUsers,
  FiAward,
  FiCalendar,
} from "react-icons/fi";
import { useLocalization } from "../LocalizationContext";
import Button from "../Button";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";
import SectionTitle from "../SectionTitle";

const theme = loyalShiftV2Theme;

// --- ANIMATION VARIANTS ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = (stagger = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});
const sectionTitleVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// --- REUSABLE SUB-COMPONENTS ---

const SectionWrapper = React.forwardRef(
  ({ children, id, className = "", bg = theme.background }, ref) => (
    <motion.section
      ref={ref}
      id={id}
      className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${bg} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={staggerContainer()}
    >
      <div className="max-w-5xl mx-auto">{children}</div>
    </motion.section>
  )
);
SectionWrapper.displayName = "SectionWrapper";
SectionWrapper.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  className: PropTypes.string,
  bg: PropTypes.string,
};

const FilterButton = ({ labelKey, value, activeValue, onClick, t }) => (
  <Button
    onClick={() => onClick(value)}
    variant={activeValue === value ? "primary" : "secondary"}
    size="sm"
    className={`!text-xs !font-medium !px-4 !py-1.5`} // Overriding button padding for smaller filter buttons
  >
    {t(labelKey)}
  </Button>
);
FilterButton.propTypes = {
  labelKey: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  activeValue: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

// --- EXPORTED PAGE BUILDER SECTIONS ---

// 1. Hero Section Component
export const HeroSection = ({ content, onCtaClick }) => {
  const { t } = useLocalization();
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center text-center text-white px-4 py-20 bg-slate-800">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-slate-900 to-gray-900 opacity-80"></div>
      <motion.div
        className="relative z-10 max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.2)}
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-shadow-md"
        >
          {t(content.titleKey, "Unlock Your Potential")}
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl opacity-90 mb-10 text-shadow"
        >
          {t(content.subtitleKey, "Discover our programs and workshops.")}
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Button
            onClick={onCtaClick}
            variant="primary"
            size="xl"
            icon={<FiArrowRight />}
          >
            {t(content.ctaKey, "Explore Programs")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

// 2. Image Grid Section Component
export const ImageGridSection = ({ content }) => {
  const { t } = useLocalization();
  return (
    <SectionWrapper bg={theme.surfaceMuted}>
      <motion.h2
        variants={sectionTitleVariants}
        className={`text-3xl md:text-4xl font-bold ${theme.textPrimary} text-center mb-12`}
      >
        {t(content.titleKey, "Section Title")}
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={fadeInUp}
          className={`space-y-6 text-lg ${theme.textSecondary} leading-relaxed`}
        >
          <p>{t(content.textP1Key, "Paragraph 1 text.")}</p>
          <p className={`font-medium ${theme.textHighlight}`}>
            {t(content.textP2Key, "Highlighted paragraph 2 text.")}
          </p>
        </motion.div>
        <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
          {content.images?.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={image.src}
                alt={t(image.altKey, "Image")}
                className={`w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105 border ${theme.borderLight}`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

// 3. Program/Workshop Suite Component
export const ProgramSuiteSection = ({ programs, permissions }) => {
  const programsRef = useRef(null);
  const { t } = useLocalization();
  const [activeProgramType, setActiveProgramType] = useState("all");
  const [activeProgramLevel, setActiveProgramLevel] = useState("all");

  const filteredPrograms = useMemo(() => {
    if (!programs) return [];
    return programs.filter(
      (p) =>
        (activeProgramType === "all" || p.type === activeProgramType) &&
        (activeProgramLevel === "all" ||
          p.level === activeProgramLevel ||
          p.level === "all")
    );
  }, [programs, activeProgramType, activeProgramLevel]);

  const typeFilters = [
    { labelKey: "smbPageBuilderComponents.filterAllTypes", value: "all" },
    { labelKey: "smbPageBuilderComponents.filterWorkshops", value: "workshop" },
    {
      labelKey: "smbPageBuilderComponents.filterCertifications",
      value: "certification",
    },
  ];
  const levelFilters = [
    { labelKey: "smbPageBuilderComponents.filterAllLevels", value: "all" },
    {
      labelKey: "smbPageBuilderComponents.filterFundamentals",
      value: "fundamentals",
    },
    {
      labelKey: "smbPageBuilderComponents.filterIntermediate",
      value: "intermediate",
    },
  ];

  const ProgramCard = (
    { t, program } // Nested for encapsulation
  ) => (
    <motion.div
      layout
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -10 }}
      className={`${theme.surfaceCard} rounded-xl shadow-lg border ${theme.borderLight} overflow-hidden flex flex-col h-full group`}
      whileHover={{
        y: -5,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="p-6 flex flex-col flex-grow">
        <h3 className={`text-xl font-bold ${theme.textPrimary} mb-1`}>
          {t(program.titleKey)}
        </h3>
        <p className={`text-sm ${theme.textSecondary} font-medium mb-4`}>
          {t(program.taglineKey)}
        </p>
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center">
            <FiCalendar className={`w-4 h-4 ${theme.textMuted} mr-2`} />
            <span className={theme.textSecondary}>
              {t(program.durationKey)}
            </span>
          </div>
          <div className="flex items-center">
            <FiUsers className={`w-4 h-4 ${theme.textMuted} mr-2`} />
            <span className={theme.textSecondary}>{t(program.formatKey)}</span>
          </div>
          <div className="flex items-center">
            <FiAward className={`w-4 h-4 ${theme.textMuted} mr-2`} />
            <span className={theme.textSecondary}>{t(program.resultKey)}</span>
          </div>
        </div>
        <p
          className={`${theme.textSecondary} text-xs leading-relaxed mb-4 flex-grow`}
        >
          {t(program.descriptionKey)}
        </p>
        <p className={`text-2xl font-semibold ${theme.textPrimary} mb-4`}>
          {t(program.priceKey)}
        </p>
        <Button
          to={`/contact?subject=${encodeURIComponent(
            t("academy.enrollmentSubjectPrefix") + t(program.titleKey)
          )}`}
          variant="primary"
          className="w-full mt-auto"
        >
          {t("academy.programCTA")}
        </Button>
      </div>
    </motion.div>
  );

  return (
    <SectionWrapper
      id="programs-suite"
      ref={programsRef}
      bg={theme.surfaceMuted}
    >
      <SectionTitle
        t={t}
        titleKey="smbPageBuilderComponents.programSuiteTitle"
        subtitleKey="smbPageBuilderComponents.programSuiteSubtitle"
      />
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 mb-10"
      >
        <div className="flex gap-2 items-center">
          <span className={`text-sm font-medium ${theme.textSecondary}`}>
            {t("academy.filtersType")}
          </span>
          {typeFilters.map((filter) => (
            <FilterButton
              key={filter.value}
              t={t}
              {...filter}
              activeValue={activeProgramType}
              onClick={setActiveProgramType}
            />
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <span className={`text-sm font-medium ${theme.textSecondary}`}>
            {t("academy.filtersLevel")}
          </span>
          {levelFilters.map((filter) => (
            <FilterButton
              key={filter.value}
              t={t}
              {...filter}
              activeValue={activeProgramLevel}
              onClick={setActiveProgramLevel}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredPrograms.map((p) => (
            <ProgramCard
              key={p.id}
              t={t}
              program={p}
              permissions={permissions}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      {filteredPrograms.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className={`col-span-full text-center ${theme.textMuted} py-10`}>
            {t("academy.programsNoResults")}
          </p>
        </motion.div>
      )}
    </SectionWrapper>
  );
};
ProgramSuiteSection.propTypes = {
  programs: PropTypes.array,
  permissions: PropTypes.object,
  t: PropTypes.func,
};

// 4. Team Section Component
export const TeamSection = ({ content, t }) => {
  const InstructorProfileCard = ({ instructor }) => (
    <motion.div
      variants={fadeInUp}
      className={`${theme.surfaceMuted} rounded-lg p-6 text-center group`}
    >
      <img
        src={instructor.imageUrl}
        alt={t(instructor.nameKey)}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-white shadow-md"
      />
      <h4 className={`text-lg font-semibold ${theme.textPrimary} mb-1`}>
        {t(instructor.nameKey)}
      </h4>
      <p className={`text-sm ${theme.textHighlight} font-medium mb-3`}>
        {t(instructor.titleKey)}
      </p>
      <p className={`${theme.textSecondary} text-xs leading-relaxed`}>
        {t(instructor.bioKey)}
      </p>
    </motion.div>
  );
  return (
    <SectionWrapper id="instructors" bg={theme.surfaceCard}>
      <SectionTitle
        t={t}
        titleKey={content.titleKey}
        subtitleKey={content.subtitleKey}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
        {content.instructors?.map((instructor) => (
          <InstructorProfileCard
            key={instructor.nameKey}
            instructor={instructor}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

// 5. FAQ Section Component
export const FAQSection = ({ content, t }) => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const FAQItem = ({ faq, isOpen, onToggle }) => (
    <motion.div className={`border-b ${theme.borderLight} last:border-b-0`}>
      <button
        className="w-full flex justify-between items-center py-4 text-left gap-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className={`text-md font-semibold ${theme.textPrimary}`}>
          {t(faq.questionKey)}
        </h3>
        <FiChevronDown
          className={`w-5 h-5 ${
            theme.textMuted
          } transform transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p
              className={`${theme.textSecondary} text-sm leading-relaxed pb-4 pr-6`}
            >
              {t(faq.answerKey)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
  return (
    <SectionWrapper id="faq" bg={theme.surfaceMuted}>
      <SectionTitle t={t} titleKey={content.titleKey} />
      <motion.div
        variants={staggerContainer()}
        className={`max-w-3xl mx-auto ${theme.surfaceCard} rounded-xl shadow-md border ${theme.borderLight} divide-y ${theme.borderLight}`}
      >
        {content.faqs?.map((faq, index) => (
          <FAQItem
            key={index}
            t={t}
            faq={faq}
            isOpen={openFAQ === index}
            onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
          />
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

// 6. Final CTA Section Component
export const FinalCTASection = ({ content, onCtaClick }) => {
  const { t } = useLocalization();
  return (
    <SectionWrapper
      id="final-cta"
      bg={theme.surfaceCard}
      className="text-center"
    >
      <motion.h2
        variants={fadeInUp}
        className={`text-3xl md:text-4xl font-bold mb-6 ${theme.textPrimary}`}
      >
        {t(content.titleKey, "Ready to Start?")}
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className={`text-lg md:text-xl ${theme.textSecondary} opacity-90 mb-10 max-w-2xl mx-auto`}
      >
        {t(content.subtitleKey, "Take the next step.")}
      </motion.p>
      <motion.div variants={fadeInUp}>
        <Button
          onClick={onCtaClick}
          variant="primary"
          size="xl"
          className={`${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg}`}
        >
          {t(content.buttonKey, "Get Started")}
        </Button>
      </motion.div>
    </SectionWrapper>
  );
};
