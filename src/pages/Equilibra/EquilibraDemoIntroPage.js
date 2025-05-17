// src/pages/Equilibra/EquilibraDemoIntroPage.js
// Initial entry point for the Equilibra CR demo flow.
// Displays Equilibra CR logo, animated text, and auto-redirects.
// Uses Equilibra CR's calming and empathetic theme with the new color palette.
// Current time: Friday, May 16, 2025 at 3:12 PM CST. San José, Costa Rica.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiLoader } from "react-icons/fi"; // Using FiLoader for a simple loading animation

// Equilibra CR Logo (ensure this path is correct and image is in public/images)
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.svg";

// --- Equilibra CR New Color Palette ---
const colors = {
  background: "bg-[#FFF7F2]", // Neutral Light – Cream White
  textPrimary: "text-[#5C5C5C]", // Typography – Warm Gray
  // textSecondary: "text-[#A89C94]", // Complementary – Muted Taupe (not directly used in this simple page)
  accentCoral: "text-[#E86F51]", // Accent Color – Coral Red (for loader icon)
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const textCycleVariant = {
  hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(3px)",
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

const logoVariant = {
  hidden: { opacity: 0, scale: 0.8, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 90, delay: 0.2 },
  },
};

const loaderVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } }, // Loader appears after a slight delay
};

// --- Main Equilibra CR Demo Intro Page Component ---
export default function EquilibraDemoIntroPage() {
  const navigate = useNavigate();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  const animationPhasesText = [
    "Nutriendo tu Bienestar Integral...",
    "Tu Espacio Seguro y de Apoyo...",
    "Descubre Equilibra Contigo.",
    "Cargando tu experiencia personalizada...",
  ];
  const phaseDuration = 2500; // Duration each text phase is shown (ms)
  const totalAnimationDuration = animationPhasesText.length * phaseDuration;

  useEffect(() => {
    // Timer to cycle through text phases
    const phaseTimer = setInterval(() => {
      setCurrentPhaseIndex((prevIndex) => prevIndex + 1);
    }, phaseDuration);

    // Timer to redirect after all phases are complete
    const redirectTimer = setTimeout(() => {
      console.log(
        "Equilibra CR Demo Intro complete. Navigating to consent page..."
      );
      navigate("/demo/equilibra/consent"); // Navigate to the consent page
    }, totalAnimationDuration + 300); // Add a small buffer before redirect

    // Cleanup timers on component unmount
    return () => {
      clearInterval(phaseTimer);
      clearTimeout(redirectTimer);
    };
    // Added totalAnimationDuration to dependencies, as it's calculated based on animationPhasesText.length
  }, [navigate, animationPhasesText.length, totalAnimationDuration]);

  const currentText =
    animationPhasesText[currentPhaseIndex % animationPhasesText.length];

  return (
    <motion.div
      className={`min-h-screen ${colors.background} flex flex-col items-center justify-center text-center p-6 overflow-hidden`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Equilibra CR Logo */}
      <motion.img
        src={equilibraLogoPath}
        alt="Equilibra CR Logo"
        className="w-20 h-20 md:w-28 md:h-28 mb-8 filter drop-shadow-sm" // Adjusted size and added drop-shadow
        variants={logoVariant}
      />

      {/* Animated Text Area */}
      <div className="min-h-[60px] md:min-h-[70px] flex items-center justify-center">
        {" "}
        {/* Fixed height for text area */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentPhaseIndex} // Key change triggers enter/exit animation
            variants={textCycleVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`text-2xl md:text-3xl font-medium ${colors.textPrimary} max-w-md`}
          >
            {currentText}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Loading Indicator */}
      {/* Show loader once animation starts to indicate something is happening */}
      {currentPhaseIndex >= 0 && (
        <motion.div
          className="mt-10"
          variants={loaderVariant}
          initial="hidden"
          animate="visible"
        >
          <FiLoader className={`w-8 h-8 ${colors.accentCoral} animate-spin`} />
        </motion.div>
      )}
    </motion.div>
  );
}
