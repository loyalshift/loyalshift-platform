// src/pages/Equilibra/EquilibraCtaPage.js
// Final Call to Action page for the Equilibra CR demo flow.
// Encourages Equilibra CR to schedule a strategic discussion with LoyalShift.
// Uses the new Equilibra CR color palette.
// Current time: Friday, May 16, 2025 at 3:15 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiCalendar, // For scheduling/discussion
  FiMessageSquare, // For contact/discussion
  FiArrowRight, // Primary CTA
  FiArrowLeft, // Secondary CTA (Back to proposal)
  FiInfo, // Timestamp
  FiTarget, // Strategic Goal
  FiHeart, // Connection, Care
} from "react-icons/fi";

// Reusable Components
import Button from "../../components/Button";
// Equilibra CR Logo
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.png";

// --- Equilibra CR New Color Palette ---
const colors = {
  background: "bg-[#FFF7F2]", // Neutral Light – Cream White
  surface: "bg-white", // White for the main card
  textPrimary: "text-[#5C5C5C]", // Typography – Warm Gray
  textSecondary: "text-[#A89C94]", // Complementary – Muted Taupe
  textHighlight: "text-[#E86F51]", // Accent Color – Coral Red
  border: "border-[#A89C94]/40", // Muted Taupe for borders
  borderAccent: "border-[#E86F51]/50", // Accent Color (Coral Red) for accent borders
  buttonPrimaryBg: "bg-[#E86F51]", // Accent Color – Coral Red
  buttonPrimaryHover: "hover:bg-[#d95f41]", // Darker Coral Red
  buttonSecondaryBg: "bg-[#F7C6B7]/50", // Blush Pink with opacity for secondary button
  buttonSecondaryText: "text-[#5C5C5C]",
  buttonSecondaryHoverBg: "hover:bg-[#F7C6B7]/80",
  buttonSecondaryBorder: "border-[#F7C6B7]",
  buttonTextLight: "text-white",
  iconColor: "text-[#E86F51]", // Accent Color – Coral Red
};

// --- Animation Variants ---
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
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Main Equilibra CR Final CTA Page Component ---
export default function EquilibraCtaPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  const t = {
    pageTitle: "Conversemos Sobre el Futuro de Equilibra CR",
    mainHeadline:
      "Potenciemos Juntos <span class='text-[#E86F51]'>Equilibra Contigo</span>",
    mainSubtitle:
      "Ha explorado la visión de 'Equilibra Contigo'. El siguiente paso es una discusión estratégica para alinear esta solución con sus objetivos específicos, definir un programa piloto y explorar cómo LoyalShift puede ser su socio tecnológico en este emocionante viaje.",
    ctaPrimaryButton: "Agendar Discusión Estratégica",
    ctaSecondaryButton: "Volver a la Propuesta",
    contactSalesContext:
      "?client=equilibra_cr&topic=equilibra_contigo_strategic_discussion",
    proposalDetailsLink: "/demo/equilibra/details",
  };

  return (
    <div
      className={`${colors.background} min-h-screen flex flex-col items-center justify-center p-4 sm:p-6`}
    >
      <motion.div
        className={`w-full max-w-2xl ${colors.surface} rounded-2xl shadow-xl border ${colors.border} p-8 md:p-12 text-center relative z-10`}
        initial="hidden"
        animate="visible"
        variants={staggerContainer()}
      >
        <motion.div variants={scaleUp} className="mb-6">
          <div
            className={`inline-flex p-4 rounded-full bg-[#FDB386]/20 border border-[#FDB386]/40`}
          >
            {" "}
            {/* Soft Peach accent */}
            <FiHeart
              className={`w-10 h-10 md:w-12 md:h-12 ${colors.iconColor}`}
            />
          </div>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          id="equilibra-final-cta-title"
          className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
          dangerouslySetInnerHTML={{ __html: t.mainHeadline }}
        />

        <motion.p
          variants={fadeInUp}
          className={`text-lg ${colors.textSecondary} mb-10 leading-relaxed`}
        >
          {t.mainSubtitle}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button
            to={`/contact-sales${t.contactSalesContext}`}
            variant="custom"
            size="xl"
            icon={<FiCalendar className="w-5 h-5" />}
            className={`
              ${colors.buttonPrimaryBg} ${colors.buttonTextLight} ${colors.buttonPrimaryHover}
              shadow-lg hover:shadow-xl hover:shadow-[#E86F51]/30
              transform hover:-translate-y-0.5 transition-all duration-300 ease-out
            `}
          >
            {t.ctaPrimaryButton}
          </Button>

          <Button
            to={t.proposalDetailsLink}
            variant="custom"
            size="lg"
            icon={<FiArrowLeft className="w-5 h-5" />}
            className={`
              bg-transparent border-2 ${colors.secondaryButtonBorder} ${colors.secondaryButtonText}
              ${colors.secondaryButtonHoverBg} hover:border-[#E86F51]/70
              shadow-sm hover:shadow-md
              transform hover:-translate-y-0.5 transition-all duration-300 ease-out
            `}
          >
            {t.ctaSecondaryButton}
          </Button>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`text-center text-xs ${colors.textSecondary} mt-10 flex items-center justify-center gap-1.5`}
      >
        <FiInfo size={12} /> Propuesta y demo generados para Equilibra CR:{" "}
        {currentTime}
      </motion.p>
    </div>
  );
}

// --- PropTypes ---
EquilibraCtaPage.propTypes = {};
Button.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
