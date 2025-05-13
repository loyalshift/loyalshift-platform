// src/pages/GiryaConsentPage.js
// Displays consent confirmation for the GiryaFlow Digital proposal.
// Adapts structure and functionality consent gate.
// Uses an earthy color theme and Girya-specific context.
// Adjusted for responsive layout (desktop and mobile views) and refined text spacing.

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiInfo, FiCheckSquare, FiTarget } from "react-icons/fi";
import Button from "../../components/Button"; // Adjust path as needed

// --- Earthy Color Palette (Defined inline for example - ideally in tailwind.config.js) ---
// These colors are used via template literals in class names.
const earthyColors = {
  background: "bg-stone-100", // Light earthy background
  surface: "bg-white/90", // White or near-white for cards/surfaces
  surfaceStrong: "bg-stone-200", // Slightly darker earthy surface for distinction
  textHeading: "text-stone-800", // Dark brown/stone for headings
  textBody: "text-stone-700", // Muted brown-grey for body text
  textHighlight: "text-emerald-800", // Deep green for highlights (connects to nature/growth)
  border: "border-stone-300", // Stone grey border
  borderAccent: "border-emerald-700/60", // Accent border (greenish)
  primaryButtonBg: "bg-emerald-700", // Primary button color
  primaryButtonHover: "hover:bg-emerald-800",
  secondaryButtonBg: "bg-stone-400", // Secondary button color
  secondaryButtonHover: "hover:bg-stone-500",
  buttonTextLight: "text-white", // Text on dark buttons
  infoIcon: "text-emerald-700", // Color for info icons
  // Assuming default status colors from Tailwind are okay (red for errors, yellow for warnings)
};

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.5, 0.75, 1] },
  },
};
const iconAnimation = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 150, damping: 15, delay: 0.2 },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

// --- Component ---
export default function GiryaConsentPage() {
  const [allowContent, setAllowContent] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    // Slight delay before showing content
    const timer = setTimeout(() => setAllowContent(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Function to handle proceeding
  const handleProceed = () => {
    console.log("Consent confirmed, proceeding to Girya proposal details.");
    // Navigate to the main Girya proposal details page
    navigate("/demo/girya/details"); // This route needs to be defined in App.js
  };

  // Size classes for the button (consistent styling)
  const sizeLgClasses = "px-8 py-4 text-lg";

  // Content specific to Girya and the proposed solution
  const brandName = "Girya";
  const productName = "GiryaFlow Digital"; // Proposed product name
  // Refined consent statement text using paragraphs for consistent spacing
  // Added mb-3 classes to paragraphs for explicit bottom margin
  const refinedConsentText = {
    paragraph1:
      "Esta propuesta contiene detalles estrategicos y se basa en analisis de informacion publica de " +
      brandName +
      " y datos hipoteticos sobre operaciones de gimnasio.", // Corrected "estrategicos", "analisis", "informacion"
    paragraph2:
      "Ha sido generada con el proposito de ilustrar como un producto digital como " +
      productName +
      " podria integrarse y beneficiar su comunidad y metodologia Mindful Strength.", // Corrected "proposito", "como", "podria", "metodologia"
    paragraph3:
      "Al hacer clic en 'Aceptar y Ver Propuesta', usted reconoce este uso limitado de la informacion con el proposito exclusivo de evaluar esta solucion. Le aseguramos que toda informacion se utiliza estricta y unicamente para generar esta propuesta a la medida y no se emplea para entrenar o mejorar modelos generales de Inteligencia Artificial de LoyalShift.", // Corrected "informacion", "unica", "unicamente", "medida"
  };

  return (
    // Outer section for full height and background
    <section
      className={`relative min-h-screen overflow-hidden ${earthyColors.background} flex items-center justify-center p-4 sm:p-6`} // Added responsive padding
    >
      {/* Background Layers (Adapt if needed - using generic for now) */}
      {/* Consider adding more specific earthy/nature background elements here */}

      {/* Content Area - Adjusted for responsive width */}
      <AnimatePresence>
        {allowContent && (
          <motion.div
            // *** THESE CLASSES CONTROL RESPONSIVENESS ***
            className={`relative z-10 w-full max-w-3xl mx-auto ${earthyColors.surface} rounded-xl shadow-xl border ${earthyColors.border} p-6 md:p-10 text-center`} // Use max-w-3xl and mx-auto
            // *** If this is still too narrow, the issue is likely external to this code. ***
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative w-full" // Ensure container takes full width
            >
              {/* Icon */}
              <motion.div variants={iconAnimation} className="mb-4">
                {/* Using FiTarget to represent readiness/goal */}
                <FiTarget
                  className={`w-12 h-12 ${earthyColors.textHighlight} mx-auto`}
                />
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className={`text-2xl md:text-3xl font-bold ${earthyColors.textHeading} mb-3 leading-tight`}
              >
                Propuesta Digital Lista:{" "}
                <span className={earthyColors.textHighlight}>
                  {brandName}Flow Digital
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                className={`text-base ${earthyColors.textBody} mb-6 leading-relaxed`}
              >
                Una vision personalizada para potenciar la experiencia de sus
                miembros, el trabajo de sus coaches y sus operaciones, enfocada
                en la metodologia Mindful Strength.{" "}
                {/* Corrected "vision", "metodologia" */}
              </motion.p>

              {/* Consent Statement Box - Refined spacing within */}
              <motion.div
                variants={fadeInUp}
                className={`mb-8 p-4 md:p-5 rounded-lg border ${earthyColors.borderAccent} ${earthyColors.surfaceStrong} text-sm ${earthyColors.textBody} text-left flex items-start gap-3 shadow-md`}
              >
                <FiInfo
                  className={`w-5 h-5 ${earthyColors.infoIcon} flex-shrink-0 mt-0.5`}
                  aria-hidden="true"
                />
                {/* Use paragraphs with explicit bottom margin for consistent spacing */}
                <div className="flex flex-col">
                  <p className="mb-3">
                    {" "}
                    {/* Added mb-3 */}
                    <strong className={earthyColors.textHeading}>
                      Nota Importante:
                    </strong>{" "}
                    {refinedConsentText.paragraph1}
                  </p>
                  <p className="mb-3">
                    {" "}
                    {/* Added mb-3 */}
                    {refinedConsentText.paragraph2}
                  </p>
                  <p className="mb-0">
                    {" "}
                    {/* mb-0 for the last paragraph */}
                    {refinedConsentText.paragraph3}
                  </p>
                </div>
              </motion.div>

              {/* Proceed Button */}
              <motion.div variants={fadeInUp} className="flex justify-center">
                <Button
                  onClick={handleProceed}
                  variant="primary"
                  size="lg" // Use lg or adjust
                  icon={<FiCheckSquare />}
                  // Apply earthy button styles (using inline for this example)
                  className={`
                    ${sizeLgClasses}
                    ${earthyColors.primaryButtonBg}
                    ${earthyColors.buttonTextLight}
                    ${earthyColors.primaryButtonHover}
                    shadow-md hover:shadow-lg
                    transition-all duration-200 ease-out
                  `}
                >
                  Ver Propuesta {productName.split(" ")[0]}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Add PropTypes if Button or other components require them and are not checked internally
