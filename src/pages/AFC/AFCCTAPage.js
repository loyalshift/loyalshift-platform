// src/pages/Afc/AfcCtaPage.js
// Final Call to Action page for the AFC demo flow.
// Encourages AFC to schedule a strategic discussion with LoyalShift.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 1:55 PM CST.

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    FiCalendar,     // For scheduling/discussion
    FiMessageSquare,// For contact/discussion
    FiArrowRight,   // Primary CTA
    FiArrowLeft,    // Secondary CTA (Back to proposal)
    FiInfo,         // Timestamp
    FiTarget,       // Strategic Goal
    FiZap           // Platform Power
} from 'react-icons/fi';

// Reusable Components (Ensure paths are correct)
import Button from '../../components/Button'; // Assuming Button component exists
// Section component might not be needed if this is a full-screen, focused CTA page
// import Section from '../../components/Section';

// AFC Logo (assuming it's in public/images/)
const afcLogoPath = process.env.PUBLIC_URL + '/images/afc-logo.png';

// --- AFC Color Palette (Light Theme with Red Accents) ---
const colors = {
  background: "bg-slate-100",        // Light Gray page background
  surface: "bg-white",              // White for the main card
  surfaceAccent: "bg-red-50",       // Very light red for subtle backgrounds or accents
  textPrimary: "text-slate-900",    // Dark Gray/Black for headings
  textSecondary: "text-slate-600",  // Medium Gray for body text
  textMuted: "text-slate-500",
  accentRed: "text-red-600",        // Vibrant Red for AFC
  accentRedDark: "text-red-700",
  accentRedBg: "bg-red-600",
  accentRedBgHover: "hover:bg-red-700",
  border: "border-slate-300",       // Standard light border
  borderLight: "border-slate-200",
  borderAccent: "border-red-500/50", // Subtle red accent border
  iconColor: "text-red-600",         // Primary icon color
  buttonTextLight: "text-white",    // Text on primary red button
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.2 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.2) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
};

// --- Main AFC Final CTA Page Component ---
export default function AfcCtaPage() {
  const currentTime = new Date().toLocaleString("es-CR", { timeZone: "America/Costa_Rica", dateStyle: "long", timeStyle: "short" });

  // Spanish content for AFC
  const t = {
    pageTitle: "Conversemos Sobre el Futuro de AFC",
    mainHeadline: "Potenciemos Juntos <span class='text-red-600'>Athletic Functional Center</span>",
    mainSubtitle: "Ha explorado la visión de 'AFC Connect'. Ahora, el siguiente paso es una discusión estratégica para alinear esta solución con sus objetivos específicos y planificar los próximos pasos, incluyendo el programa piloto.",
    ctaPrimaryButton: "Agendar Discusión Estratégica",
    ctaSecondaryButton: "Volver a la Propuesta",
    contactSalesContext: "?client=afc&topic=afc-connect-strategic-discussion", // Context for LoyalShift sales
    proposalDetailsLink: "/demo/afc/details", // Link back to AFC's proposal details
  };

  return (
    <div className={`${colors.background} min-h-screen flex flex-col items-center justify-center p-4 sm:p-6`}>
      <motion.div
        className={`w-full max-w-2xl ${colors.surface} rounded-2xl shadow-xl border ${colors.border} p-8 md:p-12 text-center relative z-10`}
        initial="hidden"
        animate="visible"
        variants={staggerContainer()}
      >
        {/* Icon or Logo */}
        <motion.div variants={scaleUp} className="mb-6">
          <div className={`inline-flex p-4 rounded-full ${colors.surfaceAccent} border ${colors.borderAccent}`}>
            {/* Using FiTarget as it represents a strategic goal/next step */}
            <FiTarget className={`w-10 h-10 md:w-12 md:h-12 ${colors.iconColor}`} />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          id="afc-final-cta-title"
          className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
          dangerouslySetInnerHTML={{ __html: t.mainHeadline }}
        />

        {/* Subtitle/Body */}
        <motion.p
          variants={fadeInUp}
          className={`text-lg ${colors.textSecondary} mb-10 leading-relaxed`}
        >
          {t.mainSubtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          {/* Primary CTA to Contact LoyalShift Sales / Schedule Meeting */}
          <Button
            to={`/contact-sales${t.contactSalesContext}`} // Links to LoyalShift's sales contact page
            variant="primary"
            size="xl" // Larger button for primary action
            icon={<FiCalendar className="w-5 h-5" />}
            className={`
              ${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover}
              shadow-lg hover:shadow-xl hover:shadow-red-500/30
              transform hover:-translate-y-0.5 transition-all duration-300 ease-out
            `}
          >
            {t.ctaPrimaryButton}
          </Button>

          {/* Secondary CTA to go back to AFC's proposal details */}
          <Button
            to={t.proposalDetailsLink}
            variant="secondary" // Uses default secondary styling from Button component
            size="lg"
            icon={<FiArrowLeft className="w-5 h-5" />}
            className={`
              !bg-slate-100 !border-slate-300 !text-slate-700
              hover:!bg-slate-200 hover:!border-slate-400
              shadow-md hover:shadow-lg
              transform hover:-translate-y-0.5 transition-all duration-300 ease-out
            `}
          >
            {t.ctaSecondaryButton}
          </Button>
        </motion.div>
      </motion.div>

      {/* Timestamp Info */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`text-center text-xs ${colors.textMuted} mt-10 flex items-center justify-center gap-1.5`}
      >
        <FiInfo size={12} /> Propuesta y demo generados para AFC: {currentTime}
      </motion.p>
    </div>
  );
}

// --- PropTypes ---
AfcCtaPage.propTypes = {}; // No direct props for this page component
// Assuming Button and Section components define their own PropTypes.
// If Section was used, its PropTypes would be here.
Button.propTypes = {
    to: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.node,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
