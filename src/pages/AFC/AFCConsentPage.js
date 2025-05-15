// src/pages/Afc/AFCConsentPage.js
// Consent page for the Athletic Functional Center (AFC) demo flow.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 12:25 PM CST.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { FiInfo, FiCheckSquare, FiShield } from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button"; // Assuming Button component exists
// AFC Logo (from public folder)
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.svg";

// --- AFC Color Palette (Light Theme with Red Accents) ---
const colors = {
  background: "bg-slate-50", // Very Light Gray
  surface: "bg-white", // White for the main card
  textPrimary: "text-slate-900", // Dark Gray/Black for headings
  textSecondary: "text-slate-600", // Medium Gray for body text
  accentRed: "text-red-600", // Vibrant Red for AFC accents
  accentRedBg: "bg-red-600", // Vibrant Red for button background
  accentRedBgHover: "hover:bg-red-700",
  border: "border-slate-300", // Standard light border
  borderAccent: "border-red-500/50", // Subtle red accent border for consent box
  consentBoxBg: "bg-red-50", // Very light red/pink for consent info box
  consentIcon: "text-red-500", // Icon color for consent box
  buttonTextLight: "text-white", // Text on primary red button
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.2 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// --- Main AFC Consent Page Component ---
export default function AFCConsentPage() {
  const [allowContent, setAllowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setAllowContent(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleProceed = () => {
    console.log("AFC Consent confirmed, proceeding to proposal details.");
    navigate("/demo/afc/details"); // Navigate to the AFC proposal details page
  };

  // Spanish content for AFC
  const t = {
    logoAlt: "Athletic Functional Center Logo",
    pageTitle: "Consentimiento para Propuesta Personalizada",
    pageSubtitle:
      "Su propuesta 'AFC Connect' está lista. Revise y acepte para continuar.",
    consentBoxTitle: "Nota Importante Sobre Su Propuesta:",
    consentParagraph1:
      "Esta propuesta ha sido preparada por LoyalShift específicamente para Athletic Functional Center. Para personalizarla, hemos considerado información contextual y pública sobre AFC, así como nuestra experiencia en el sector fitness y de bienestar.",
    consentParagraph2:
      "Le aseguramos que toda información relacionada con AFC se utiliza <strong class='text-slate-800'>estrictamente y únicamente</strong> con el propósito de generar esta propuesta a medida y demostrar el potencial de la plataforma 'AFC Connect'.",
    consentParagraph3:
      "<strong class='text-slate-800'>En ningún caso</strong>, la información específica de AFC se emplea para entrenar nuestros modelos generales de Inteligencia Artificial ni para ningún otro propósito ajeno a esta demostración.",
    consentParagraph4:
      "Al hacer clic en 'Aceptar y Ver Propuesta', usted <strong class='text-slate-800'>reconoce y acepta</strong> este uso limitado de la información con el fin exclusivo de evaluar esta solución.",
    ctaButton: "Aceptar y Ver Propuesta",
  };

  return (
    <section
      className={`relative min-h-screen overflow-hidden ${colors.background} flex items-center justify-center p-4 sm:p-6`}
      aria-labelledby="afc-consent-title"
    >
      {/* Optional: Subtle background pattern or texture if desired */}

      <AnimatePresence>
        {allowContent && (
          <motion.div
            className={`relative z-10 w-full max-w-2xl mx-auto ${colors.surface} rounded-xl shadow-2xl border ${colors.border} p-6 md:p-10 text-center`}
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
              {/* AFC Logo */}
              <motion.div variants={scaleUp} className="mb-6">
                <img
                  src={afcLogoPath}
                  alt={t.logoAlt}
                  className="h-16 md:h-20 w-auto mx-auto"
                />
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                id="afc-consent-title"
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
                className={`mb-8 p-4 md:p-6 rounded-lg border ${colors.borderAccent} ${colors.consentBoxBg} text-sm ${colors.textSecondary} text-left flex items-start gap-3 shadow-md`}
              >
                <FiShield
                  className={`w-8 h-8 md:w-10 md:h-10 ${colors.consentIcon} flex-shrink-0 mt-1`}
                  aria-hidden="true"
                />
                <div className="flex flex-col space-y-3">
                  <p className="font-semibold text-slate-700">
                    {t.consentBoxTitle}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{ __html: t.consentParagraph1 }}
                  />
                  <p
                    dangerouslySetInnerHTML={{ __html: t.consentParagraph2 }}
                  />
                  <p
                    dangerouslySetInnerHTML={{ __html: t.consentParagraph3 }}
                  />
                  <p
                    dangerouslySetInnerHTML={{ __html: t.consentParagraph4 }}
                  />
                </div>
              </motion.div>

              {/* Proceed Button */}
              <motion.div variants={fadeInUp} className="flex justify-center">
                <Button
                  onClick={handleProceed}
                  variant="primary" // This variant should ideally map to your theme's primary button style
                  size="lg"
                  icon={<FiCheckSquare />}
                  className={`
                    ${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover}
                    shadow-lg hover:shadow-xl hover:shadow-red-500/30
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
AFCConsentPage.propTypes = {}; // No props currently
