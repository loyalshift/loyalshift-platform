// src/pages/Afc/AfcNotFound.js
// 404 Not Found page specifically styled for the Athletic Functional Center (AFC) section.
// Uses AFC light theme with red accents and Spanish language.
// Current time: Wednesday, May 14, 2025 at 3:55 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Added PropTypes
import { FiAlertTriangle, FiHome, FiPhone, FiArrowLeft } from "react-icons/fi";
import Button from "../../components/Button"; // Path to main Button component

// AFC Logo (assuming it's in public/images/)
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.svg";

// Reusable Button component (ensure path is correct)

// --- AFC Color Palette (Light Theme with Red Accents) ---
const colors = {
  background: "bg-slate-100", // Light Gray page background
  surface: "bg-white", // White for any card elements (though not used extensively here)
  textPrimary: "text-slate-900", // Dark Gray/Black for headings
  textSecondary: "text-slate-600", // Medium Gray for body text
  accentRed: "text-red-600", // Vibrant Red for AFC accents
  accentRedBg: "bg-red-600",
  accentRedBgHover: "hover:bg-red-700",
  border: "border-slate-300", // Standard light border
  buttonTextLight: "text-white",
  warningText: "text-amber-600", // Using amber for the 404 icon for a slightly different warning feel
};

// --- Simple Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 150 },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// --- Main AFC 404 Not Found Page Component ---
export default function AfcNotFound() {
  return (
    // Full page container, centered content
    <div
      className={`min-h-screen ${colors.background} flex flex-col items-center justify-center text-center px-4 py-16`}
    >
      <motion.div
        className="max-w-lg w-full"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* AFC Logo */}
        <motion.div variants={scaleUp} className="mb-6">
          <Link to="/afc">
            <img
              src={afcLogoPath}
              alt="Athletic Functional Center Logo"
              className="h-16 w-auto mx-auto"
            />
          </Link>
        </motion.div>

        {/* Icon */}
        <motion.div variants={scaleUp} className="mb-6">
          <FiAlertTriangle
            className={`w-20 h-20 ${colors.warningText} mx-auto opacity-80`}
          />
        </motion.div>

        {/* 404 Text */}
        <motion.div
          variants={fadeInUp}
          className={`text-8xl md:text-9xl font-bold text-slate-300 mb-2`}
          aria-hidden="true" // Decorative
        >
          404
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={fadeInUp}
          className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} mb-3`}
        >
          Página No Encontrada
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className={`text-lg ${colors.textSecondary} mb-10`}
        >
          ¡Ups! Parece que la página que buscas en la sección de AFC no existe o
          ha sido movida. Puedes volver al inicio de AFC o contactarnos si
          necesitas ayuda.
        </motion.p>

        {/* Action Buttons/Links */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          {/* Back to AFC Home */}
          <Button
            to="/afc" // Link to the main AFC section start page
            variant="primary" // This should use the red AFC primary style
            size="lg"
            icon={<FiHome className="w-5 h-5" />}
            className={`${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover} shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
          >
            Inicio AFC
          </Button>

          {/* Contact Link */}
          <Button
            to="/afc/contact" // Link to the AFC contact page
            variant="secondary"
            size="lg"
            icon={<FiPhone className="w-5 h-5" />}
            className={`!bg-slate-200 !border-slate-300 !text-slate-700 hover:!bg-slate-300 hover:!border-slate-400 shadow-sm hover:shadow-md`}
          >
            Contactar AFC
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// --- PropTypes ---
AfcNotFound.propTypes = {}; // No props for this page
Button.propTypes = {
  // Assuming Button props
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
