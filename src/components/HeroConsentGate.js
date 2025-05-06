// src/pages/ProposalConsentGate.js
// SPANISH-ONLY version. Displays consent confirmation for ANACO proposal.
// Route: '/proposal/anaco/consent'
// Current time: Thursday, May 1, 2025 at 1:08:38 PM CST (San José, Costa Rica)

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiInfo, FiCheckSquare, FiAward } from "react-icons/fi";
import Button from "../components/Button"; // Adjust path if needed

// --- Premium Financial Color Theme ---
const colors = {
  background: "bg-slate-900",
  surface: "bg-slate-800/70",
  surfaceStrong: "bg-slate-800", // Used for consent box background
  textPrimary: "text-white",
  textSecondary: "text-slate-300",
  textHighlight: "text-amber-400", // Amber for highlights
  border: "border-slate-700", // Standard border
  borderAccent: "border-amber-500/30", // Amber border accent
  badgeGradient: "bg-gradient-to-r from-amber-500 to-amber-600", // Amber gradient for primary button
  amberHoverGradient: "hover:from-amber-400 hover:to-amber-500", // Lighter amber for hover
  darkTextForAmber: "text-slate-900", // Dark text for contrast on amber bg
};

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
  },
};
const logoAnimation = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 12, delay: 0.3 },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// --- Embedded Spanish Content ---
const content = {
  trustBadge: "40+ AÑOS DE CONFIANZA",
  brandName1: "ANACO",
  brandName2: "Conecta",
  headline:
    "Propuesta Estratégica: <span class='text-amber-400'>Agent Hub™</span>", // Added ™ to headline too
  subtitle:
    "Su solución personalizada está lista. Por favor, confirme su consentimiento para continuar.",
  // --- NEW KEY ---
  premadeModuleText: `Para acelerar su éxito, esta solución aprovecha nuestro módulo <strong class='${colors.textWhite}'>Agent Hub™</strong>, una base robusta y probada, ahora <strong class='${colors.textHighlight}'>personalizada para las necesidades únicas</strong> de ANACO Inversiones.`,
  consent_text: `
      Esta propuesta contiene detalles estratégicos y ha sido <strong class='${colors.textWhite}'>personalizada utilizando información contextual</strong> relevante para ANACO Inversiones.
      <br/><br/>
      Le aseguramos que toda información relacionada con ANACO se utiliza <strong class='${colors.textHighlight}'>estricta y únicamente</strong> para generar esta propuesta a medida. <strong class='${colors.textHighlight}'>En ningún caso</strong> se emplea para entrenar o mejorar los modelos generales de Inteligencia Artificial de LoyalShift.
      <br/><br/>
      Al hacer clic en 'Aceptar y Ver Propuesta', usted <strong class='${colors.textWhite}'>reconoce</strong> este uso limitado de la información con el propósito exclusivo de evaluar esta solución.
  `,
  ctaButton: "Aceptar y Ver Propuesta",
};

// --- Component ---
export default function ProposalConsentGate() {
  // State still useful for staggering entrance animation
  const [allowContent, setAllowContent] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    // Slight delay before showing content
    const timer = setTimeout(() => setAllowContent(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Size classes for the button
  const sizeXlClasses = "px-8 py-4 text-lg";

  // Function to handle proceeding
  const handleProceed = () => {
    console.log("Consent confirmed, proceeding to proposal details (Spanish).");
    // Navigate to the details page (ensure this route exists in App.js)
    navigate("/demo/anaco/details");
  };

  return (
    // Full screen, dark background, centering content
    <section
      className={`relative h-screen overflow-hidden ${colors.background} flex items-center justify-center p-4`}
    >
      {/* Background Layers */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-blue-900/90"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('/public/images/financial-texture.png')] bg-cover"></div>
        <motion.div
          className="absolute inset-0 opacity-[3%]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-grid-white/5"></div>
        </motion.div>
      </motion.div>
      {/* Content Area */}
      <AnimatePresence>
        {allowContent && (
          <motion.div
            className="relative z-10 flex flex-col items-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="container px-4 sm:px-6 text-center max-w-3xl">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="relative"
              >
                {/* Trust Badge */}
                <motion.div variants={fadeInUp} className="mb-4">
                  <span
                    className={`inline-block ${colors.badgeGradient} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md`}
                  >
                    {content.trustBadge}
                  </span>
                </motion.div>

                {/* ANACO Brand Mark */}
                <motion.div variants={logoAnimation} className="mb-6">
                  <div
                    className={`inline-flex items-center justify-center ${colors.surface} backdrop-blur-sm p-4 rounded-xl border ${colors.borderAccent} shadow-xl`}
                  >
                    <span
                      className={`text-2xl font-bold ${colors.textPrimary} tracking-tight font-serif`}
                    >
                      {content.brandName1}
                    </span>
                    <span
                      className={`text-2xl font-bold ${colors.textHighlight} tracking-tight font-serif ml-2`}
                    >
                      {content.brandName2}
                    </span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  variants={fadeInUp}
                  className={`text-3xl sm:text-4xl font-bold ${colors.textPrimary} mb-3 leading-tight`}
                  dangerouslySetInnerHTML={{ __html: content.headline }}
                />

                {/* Subtitle */}
                <motion.p
                  variants={fadeInUp}
                  // Adjusted bottom margin to accommodate new text below
                  className={`text-lg md:text-xl ${colors.textSecondary} mb-4 leading-relaxed`}
                >
                  {content.subtitle}
                </motion.p>

                {/* **** ADDED TEXT about Pre-made Module **** */}
                <motion.p
                  variants={fadeInUp}
                  // Style to be distinct but clear, fits between subtitle and consent
                  className={`text-base ${colors.textSecondary} italic mb-8 max-w-xl mx-auto px-4`}
                  dangerouslySetInnerHTML={{
                    __html: content.premadeModuleText,
                  }} // Render HTML safely
                ></motion.p>
                {/* **** END ADDED TEXT **** */}

                {/* Consent Statement Box */}
                <motion.div
                  variants={fadeInUp}
                  // Adjusted top margin if needed, mb-10 kept
                  className={`mb-10 p-4 md:p-6 rounded-lg border ${colors.borderAccent} ${colors.surfaceStrong} backdrop-blur-sm max-w-xl mx-auto shadow-lg`}
                >
                  <div
                    className={`text-sm ${colors.textSecondary} flex items-start text-left gap-3`}
                  >
                    <FiInfo
                      className={`w-6 h-6 ${colors.textHighlight} flex-shrink-0 mt-0.5`}
                      aria-hidden="true"
                    />
                    <span
                      dangerouslySetInnerHTML={{ __html: content.consent_text }}
                    />
                  </div>
                </motion.div>

                {/* Single Proceed Button (Centered) */}
                <motion.div variants={fadeInUp} className="flex justify-center">
                  <Button
                    onClick={handleProceed}
                    variant="primary"
                    size="lg"
                    icon={<FiCheckSquare />}
                    className={`
                      ${sizeXlClasses}
                      ${colors.badgeGradient}
                      ${colors.darkTextForAmber}
                      font-bold
                      ${colors.amberHoverGradient}
                      hover:shadow-lg hover:shadow-amber-500/40
                      ring-1 ring-amber-600/50
                      !shadow-xl
                      transform hover:-translate-y-1
                    `}
                  >
                    {content.ctaButton}
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
