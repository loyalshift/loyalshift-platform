// src/pages/Equilibra/EquilibraConsentPage.js
// Consent page for the Equilibra CR demo flow.
// UPDATED: Ensured consistency with the latest color palette.
// Uses Equilibra CR's calming and empathetic theme.
// Current time: Friday, May 16, 2025 at 3:20 PM CST.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { FiInfo, FiCheckSquare, FiHeart } from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button"; // Path to main Button component
// Equilibra CR Logo (assuming it's in public/images/)
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.svg"; // Ensure you have this

// --- Equilibra CR New Color Palette ---
const colors = {
  background: "bg-[#FFF7F2]", // Neutral Light – Cream White
  surface: "bg-white/95 backdrop-blur-sm", // White with slight blur for card
  // surfaceStrong: "bg-[#FDB386]/30", // Primary Color (Soft Peach) with opacity for consent box - Not used here, using infoBoxBg
  textPrimary: "text-[#5C5C5C]", // Typography – Warm Gray
  textSecondary: "text-[#A89C94]", // Complementary – Muted Taupe
  textHighlight: "text-[#E86F51]", // Accent Color – Coral Red
  border: "border-[#A89C94]/50", // Muted Taupe for borders
  borderAccent: "border-[#F7C6B7]", // Secondary Color – Blush Pink for accent border on info box
  primaryButtonBg: "bg-[#E86F51]", // Accent Color – Coral Red
  primaryButtonHover: "hover:bg-[#d95f41]", // Darker Coral Red
  buttonTextLight: "text-white",
  infoBoxBg: "bg-[#FDB386]/20", // Primary Color (Soft Peach) with low opacity for consent box
  infoIcon: "text-[#E86F51]", // Accent Color – Coral Red for info icon
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 130, damping: 15 },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// --- Main Equilibra CR Consent Page Component ---
export default function EquilibraConsentPage() {
  const [allowContent, setAllowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setAllowContent(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleProceed = () => {
    console.log(
      "Equilibra CR Consent confirmed, proceeding to proposal details."
    );
    navigate("/demo/equilibra/details"); // Navigate to the proposal details page
  };

  // Spanish content for Equilibra CR
  const t = {
    logoAlt: "Equilibra CR Logo",
    pageTitle: "Tu Propuesta Personalizada está Casi Lista",
    pageSubtitle:
      "Antes de continuar, queremos asegurarnos de que comprendes cómo hemos preparado esta demostración para ti.",
    consentBoxTitle: "Nota Importante Sobre Esta Propuesta:",
    consentParagraph1: `Esta propuesta ha sido cuidadosamente elaborada por el equipo de LoyalShift, inspirándonos en la valiosa información pública y el enfoque único de <strong class='text-[${colors.textPrimary.slice(
      5,
      -2
    )}] font-semibold'>Equilibra CR</strong>.`, // Using textPrimary for strong tags
    consentParagraph2: `Para ilustrar el potencial de una plataforma digital como <strong class='text-[${colors.textHighlight.slice(
      5,
      -2
    )}] font-semibold'>'Equilibra Contigo'</strong>, hemos utilizado ejemplos y contextos que reflejan tu especialización en nutrición no pesocentrista y el acompañamiento en trastornos de la conducta alimentaria.`,
    consentParagraph4: `<strong class='text-[${colors.textPrimary.slice(
      5,
      -2
    )}] font-semibold'>En ningún caso</strong>, la información específica o inferida sobre Equilibra CR se emplea para entrenar nuestros modelos generales de Inteligencia Artificial ni para ningún otro propósito ajeno a esta demostración.`,
    consentParagraph5: `Al hacer clic en 'Entendido y Continuar', <strong class='text-[${colors.textPrimary.slice(
      5,
      -2
    )}] font-semibold'>reconoces</strong> este uso limitado de la información con el fin exclusivo de evaluar esta solución propuesta.`,
    ctaButton: "Entendido y Continuar a la Propuesta",
  };

  return (
    <section
      className={` min-h-screen overflow-hidden ${colors.background} flex items-center justify-center p-4 sm:p-6`}
      aria-labelledby="equilibra-consent-title"
    >
      <AnimatePresence>
        {allowContent && (
          <motion.div
            className={`mt-16 z-10 w-full max-w-2xl mx-auto ${colors.surface} rounded-xl shadow-xl border ${colors.border} p-6 md:p-10 text-center`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative w-full"
            >
              {/* Equilibra CR Logo */}
              <motion.div variants={scaleUp} className="mb-6">
                <img
                  src={equilibraLogoPath}
                  alt={t.logoAlt}
                  className="h-16 md:h-20 w-auto mx-auto"
                />
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                id="equilibra-consent-title"
                className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} mb-3 leading-tight`}
              >
                {t.pageTitle}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                className={`text-base md:text-lg ${colors.textSecondary} mb-8 leading-relaxed`}
              >
                {t.pageSubtitle}
              </motion.p>

              {/* Consent Statement Box */}
              <motion.div
                variants={fadeInUp}
                className={`mb-8 p-4 md:p-6 rounded-lg border ${colors.borderAccent} ${colors.infoBoxBg} text-sm ${colors.textSecondary} text-left flex items-start gap-3 shadow-md`}
              >
                <FiInfo
                  className={`w-8 h-8 md:w-10 md:h-10 ${colors.infoIcon} flex-shrink-0 mt-1`}
                  aria-hidden="true"
                />
                <div className="flex flex-col space-y-3">
                  <p className={`font-semibold ${colors.textPrimary}`}>
                    {t.consentBoxTitle}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{ __html: t.consentParagraph1 }}
                  />
                  <p
                    dangerouslySetInnerHTML={{ __html: t.consentParagraph2 }}
                  />

                  <p
                    dangerouslySetInnerHTML={{ __html: t.consentParagraph4 }}
                  />
                  <p
                    dangerouslySetInnerHTML={{ __html: t.consentParagraph5 }}
                  />
                </div>
              </motion.div>

              {/* Proceed Button */}
              <motion.div variants={fadeInUp} className="flex justify-center">
                <Button
                  onClick={handleProceed}
                  variant="custom" // Use custom to apply specific styles
                  size="lg"
                  icon={<FiCheckSquare />}
                  className={`
                    ${colors.buttonPrimaryBg} ${colors.textHighlight} ${colors.buttonPrimaryHover}
                    shadow-lg hover:shadow-xl 
                    transform hover:-translate-y-0.5 transition-all duration-300 ease-out
                    px-8 py-3 text-base md:text-lg
                  `}
                >
                  {t.ctaButton}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// --- PropTypes ---
EquilibraConsentPage.propTypes = {};
Button.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
