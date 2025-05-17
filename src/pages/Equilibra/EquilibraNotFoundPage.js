// src/pages/Equilibra/EquilibraNotFoundPage.js
// 404 Not Found page specifically styled for the Equilibra CR section.
// Uses the new Equilibra CR color palette.
// Current time: Friday, May 16, 2025 at 3:00 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FiAlertTriangle, FiHome, FiMail, FiArrowLeft } from "react-icons/fi";
import Button from "../../components/Button"; // Assuming Button can be styled via className

// Equilibra CR Logo
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.svg";

// Reusable Button component (ensure path is correct)

// --- Equilibra CR New Color Palette ---
const colors = {
  background: "bg-[#FFF7F2]", // Neutral Light – Cream White
  surface: "bg-white", // White for any card elements
  textPrimary: "text-[#5C5C5C]", // Typography – Warm Gray
  textSecondary: "text-[#A89C94]", // Complementary – Muted Taupe
  accentCoral: "text-[#E86F51]", // Accent Color – Coral Red
  accentCoralBg: "bg-[#E86F51]",
  accentCoralBgHover: "hover:bg-[#d95f41]", // Darker Coral Red
  border: "border-[#A89C94]/40", // Muted Taupe for borders
  buttonTextLight: "text-white",
  warningText: "text-[#E86F51]", // Coral Red for the 404 icon
  secondaryButtonBg: "bg-[#F7C6B7]/50", // Blush Pink with opacity
  secondaryButtonText: "text-[#5C5C5C]",
  secondaryButtonHoverBg: "hover:bg-[#F7C6B7]/80",
  secondaryButtonBorder: "border-[#F7C6B7]",
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

// --- Main Equilibra CR 404 Not Found Page Component ---
export default function EquilibraNotFoundPage() {
  return (
    <div
      className={`min-h-screen ${colors.background} flex flex-col items-center justify-center text-center px-4 py-16`}
    >
      <motion.div
        className="max-w-md w-full"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Equilibra CR Logo */}
        <motion.div variants={scaleUp} className="mb-6">
          <Link to="/equilibra">
            <img
              src={equilibraLogoPath}
              alt="Equilibra CR Logo"
              className="h-16 w-auto mx-auto"
            />
          </Link>
        </motion.div>

        {/* Icon */}
        <motion.div variants={scaleUp} className="mb-6">
          <FiAlertTriangle
            className={`w-20 h-20 ${colors.warningText} mx-auto opacity-90`}
          />
        </motion.div>

        {/* 404 Text */}
        <motion.div
          variants={fadeInUp}
          className={`text-8xl md:text-9xl font-bold ${colors.textSecondary} opacity-20 mb-2`}
          aria-hidden="true"
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
          ¡Ups! Parece que la página que buscas en la sección de Equilibra CR no
          existe o ha sido movida. Puedes volver al inicio de Equilibra Contigo
          o contactarnos si necesitas ayuda.
        </motion.p>

        {/* Action Buttons/Links */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button
            to="/equilibra" // Link to the main Equilibra section start page
            variant="custom" // Use custom to apply specific styles
            size="lg"
            icon={<FiHome className="w-5 h-5" />}
            className={`${colors.accentCoralBg} ${colors.buttonTextLight} ${colors.accentCoralBgHover} shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
          >
            Inicio Equilibra Contigo
          </Button>

          <Button
            to="/equilibra/contact" // Link to the Equilibra contact page
            variant="custom"
            size="lg"
            icon={<FiMail className="w-5 h-5" />}
            className={`!bg-transparent !border-2 ${colors.secondaryButtonBorder} ${colors.secondaryButtonText} ${colors.secondaryButtonHoverBg} hover:!border-[#E86F51]/70 shadow-sm hover:shadow-md`}
          >
            Contactar Equilibra CR
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// --- PropTypes ---
EquilibraNotFoundPage.propTypes = {};
Button.propTypes = {
  // Assuming Button props
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
