// src/pages/Girya/NotFound.js
// 404 Not Found page specifically styled for the Girya section.
// Uses a Light Earthy Fitness / Mindful Strength Theme.
// Current time: Tuesday, May 13, 2025 at 1:35 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import PropTypes from "prop-types";
import {
  FiAlertTriangle,
  FiHome,
  FiArrowLeft,
  FiCompass,
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button"; // Assuming Button is in src/components
import GiryaLogo from "../../images/girya-logo.svg"; // Import Girya logo URL

// --- Light Earthy Fitness / Mindful Strength Color Palette ---
const colors = {
  background: "bg-stone-100", // Light stone background
  surface: "bg-white", // White for any card-like elements (though not strictly used here)
  textPrimary: "text-stone-800", // Dark stone for primary text (headings)
  textSecondary: "text-stone-600", // Medium stone for body text
  textHighlight: "text-emerald-700", // Deep emerald for accents/links
  iconWarning: "text-amber-600", // Warning color for the icon
  buttonPrimaryBg: "bg-emerald-600",
  buttonPrimaryHover: "hover:bg-emerald-700",
  buttonSecondaryBorder: "border-stone-400",
  buttonSecondaryText: "text-stone-700",
  buttonSecondaryHoverBg: "hover:bg-stone-200",
  buttonText: "text-white",
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 150, damping: 15 },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// --- Main Girya Not Found Page Component ---
export default function GiryaNotFound() {
  const navigate = useNavigate();

  return (
    <div
      className={`${colors.background} min-h-screen flex flex-col items-center justify-center text-center p-6`}
    >
      <motion.div
        className="max-w-md w-full"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Girya Logo */}
        <motion.div variants={scaleUp} className="mb-8">
          <img
            src={GiryaLogo}
            alt="Girya Logo"
            className="w-16 h-16 mx-auto opacity-70"
          />
        </motion.div>

        {/* Icon */}
        <motion.div variants={scaleUp} className="mb-6">
          <FiAlertTriangle
            className={`w-20 h-20 ${colors.iconWarning} mx-auto`}
          />
        </motion.div>

        {/* 404 Text */}
        <motion.div
          variants={fadeInUp}
          className={`text-7xl md:text-8xl font-bold ${colors.textSecondary} opacity-20 mb-2`}
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
          className={`text-lg ${colors.textSecondary} mb-10 max-w-sm mx-auto`}
        >
          ¡Ups! Parece que esta rutina se salió del camino. La página que buscas
          no existe o fue movida.
        </motion.p>

        {/* Action Buttons/Links */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button
            to="/girya" // Link to the main Girya section start page
            variant="primary"
            size="lg"
            icon={<FiHome className="w-5 h-5" />}
            className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText}`}
          >
            Inicio Girya
          </Button>
          <Button
            onClick={() => navigate(-1)} // Go back to previous page
            variant="secondary"
            size="lg"
            icon={<FiArrowLeft className="w-5 h-5" />}
            className={`!border ${colors.buttonSecondaryBorder} ${colors.buttonSecondaryText} ${colors.buttonSecondaryHoverBg}`}
          >
            Volver Atrás
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12">
          <Link
            to="/"
            className={`text-sm ${colors.textSecondary} hover:${colors.textHighlight} transition-colors`}
          >
            Ir a LoyalShift.com
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

// --- PropTypes ---
GiryaNotFound.propTypes = {}; // No props for this page currently
// Assuming Button component defines its own PropTypes
