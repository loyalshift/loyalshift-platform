// src/pages/ProposalFinancialCtaPage.js
// Specific CTA page for the FINANCIAL proposal flow, route: /demo/anaco/cta
// Appears after proposal details/consent. Uses Premium Financial Theme.
// Current time: Thursday, May 1, 2025 at 8:21:20 PM CST (San José, Costa Rica)

import React from "react";
import { motion } from "framer-motion";
// Import Link if buttons navigate directly, or useNavigate if actions trigger logic first
// For simplicity, using placeholder links directly on Buttons via 'to' prop
import {
  FiMessageSquare, // Discussion/Contact
  FiCalendar, // Scheduling
  FiInfo, // Info/Timestamp
  FiTarget, // Strategic Step
} from "react-icons/fi";

// --- Reusable Components (Adjust path relative to this file's location) ---
// Assuming Button component handles 'to' prop for Link behavior
import Button from "../../components/Button"; // Adjust path as needed

// --- Premium Financial Color Theme (from Proposal flow) ---
const colors = {
  background: "bg-slate-900", // Main background
  surface: "bg-slate-800/70 backdrop-blur-md", // Card background
  surfaceStrong: "bg-slate-800",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-300",
  textHighlight: "text-amber-400", // Amber highlight
  border: "border-slate-700",
  borderAccent: "border-amber-500/40", // Amber accent border
  badgeGradient: "bg-gradient-to-r from-amber-500 to-amber-600", // Amber gradient for primary button
  amberHoverGradient: "hover:from-amber-400 hover:to-amber-500",
  darkTextForAmber: "text-slate-900",
  amberBorder: "border-amber-500",
  amberBorderHover: "hover:border-amber-400",
};

// --- Simple Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// --- Main Proposal CTA Page Component ---
export default function ProposalFinancialCtaPage() {
  // Get current timestamp string (Spanish locale)
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Define XL size classes for buttons if not globally handled
  const sizeXlClasses = "px-8 py-4 text-lg";

  return (
    // Full screen container, dark theme, centered content
    <div
      className={`min-h-screen ${colors.background} flex flex-col items-center justify-center p-6`}
    >
      {/* Decorative Background Elements (Optional, similar to previous) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[3%]">
          {" "}
          {/* Grid */}
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="line-grid-cta"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke={colors.textSecondary}
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#line-grid-cta)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-900/10 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-gradient-to-bl from-amber-900/10 via-transparent to-transparent blur-3xl"></div>
      </div>

      {/* Main CTA Card */}
      <motion.div
        className={`w-full max-w-2xl ${colors.surface} rounded-2xl shadow-2xl border ${colors.borderAccent} p-8 md:p-12 text-center relative z-10`}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Icon */}
        <motion.div variants={fadeInUp} className="mb-6">
          <div
            className={`inline-flex p-4 rounded-full bg-slate-800 border ${colors.border}`}
          >
            <FiTarget className={`w-10 h-10 ${colors.textHighlight}`} />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
        >
          Avancemos Juntos: Implementando{" "}
          <span className={colors.textHighlight}>ANACO Conecta</span>
        </motion.h1>

        {/* Subtitle/Body */}
        <motion.p
          variants={fadeInUp}
          className={`text-lg ${colors.textSecondary} mb-10`}
        >
          Hemos delineado la estrategia para transformar la experiencia de sus
          agentes. El siguiente paso es definir los detalles de implementación y
          el programa piloto.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          {/* Primary CTA */}
          <Button
            to="/contact-sales?client=financial&topic=hub-implementation&plan=starter" // Consistent link
            variant="primary" // Use base for structure
            size="lg" // Use lg or xl
            icon={<FiCalendar className="w-5 h-5" />} // Scheduling icon
            className={`
                            ${sizeXlClasses} /* If using xl */
                            ${colors.badgeGradient} ${colors.darkTextForAmber} font-bold
                            ${colors.amberHoverGradient}
                            hover:shadow-lg hover:shadow-amber-500/40
                            ring-1 ring-amber-600/50 !shadow-xl
                            transform hover:-translate-y-1 transition-all duration-300 ease-out
                            animate-pulse /* Keep pulse on primary */
                        `}
          >
            Agendar Discusión de Implementación
          </Button>

          {/* Secondary CTA */}
          <Button
            to="/contact-sales" // General question link
            variant="secondary" // Use base for structure
            size="lg" // Use lg or xl
            icon={<FiMessageSquare className="w-5 h-5" />}
            className={`
                            ${sizeXlClasses} /* If using xl */
                            bg-slate-900/30 border-2 ${colors.amberBorder}/70 ${colors.textHighlight}
                            hover:bg-amber-500/10 ${colors.amberBorderHover} hover:text-amber-300
                            backdrop-blur-sm transform hover:-translate-y-0.5 transition-all duration-300 ease-out
                        `}
          >
            Hacer una Pregunta
          </Button>
        </motion.div>
      </motion.div>

      {/* Timestamp Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-xs text-slate-400/80 flex items-center gap-1.5"
      >
        <FiInfo size={12} />
        <span>Propuesta generada: {currentTime}, San José, Costa Rica</span>
      </motion.div>
    </div>
  );
}
