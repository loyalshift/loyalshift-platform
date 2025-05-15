// src/pages/Afc/AFCDemoIntroPage.js
// Initial entry point for the AFC demo flow.
// Displays AFC logo, animated text, and auto-redirects.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 12:10 PM CST.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiLoader, FiZap } from "react-icons/fi"; // FiZap for energy/potential

// AFC Logo (assuming it's in public/images/)
// If you move it to src/images, you'd import it:
// import afcLogoPng from '../../images/afc-logo.png';
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.svg";

// --- AFC Color Palette (Light Theme with Red Accents) ---
const colors = {
  background: "bg-slate-50", // Very Light Gray
  textPrimary: "text-slate-900", // Dark Gray/Black
  textSecondary: "text-slate-600", // Medium Gray
  accentRed: "text-red-600", // Vibrant Red for AFC
  accentRedLight: "text-red-500",
  surface: "bg-white",
  border: "border-slate-300",
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const textCycleVariant = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(5px)",
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const logoVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.2 },
  },
};

const loaderVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
};

// --- Main AFC Demo Intro Page Component ---
export default function AFCDemoIntroPage() {
  const navigate = useNavigate();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  const animationPhasesText = [
    "Potenciando tu Rendimiento Funcional...",
    "Conectando Nuestra Comunidad...",
    "Tu Experiencia AFC, Digitalizada.",
    "Preparando tu demo personalizado...",
  ];
  const phaseDuration = 2200; // Duration each text phase is shown (ms)
  const totalAnimationDuration = animationPhasesText.length * phaseDuration;

  useEffect(() => {
    // Timer to cycle through text phases
    const phaseTimer = setInterval(() => {
      setCurrentPhaseIndex((prevIndex) => prevIndex + 1);
    }, phaseDuration);

    // Timer to redirect after all phases are complete
    const redirectTimer = setTimeout(() => {
      console.log("AFC Demo Intro complete. Navigating to consent page...");
      navigate("/demo/afc/consent"); // As per plan
    }, totalAnimationDuration + 500); // Add a small buffer before redirect

    // Cleanup timers on component unmount
    return () => {
      clearInterval(phaseTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate, animationPhasesText.length, totalAnimationDuration]); // Added totalAnimationDuration to dependencies

  const currentText =
    animationPhasesText[currentPhaseIndex % animationPhasesText.length];

  return (
    <motion.div
      className={`min-h-screen ${colors.background} flex flex-col items-center justify-center text-center p-6 overflow-hidden`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* AFC Logo */}
      <motion.img
        src={afcLogoPath}
        alt="Athletic Functional Center Logo"
        className="w-24 h-24 md:w-32 md:h-32 mb-8" // Adjusted size
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
            className={`text-2xl md:text-3xl font-semibold ${colors.textPrimary} max-w-lg`}
          >
            {currentText}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Loading Indicator (appears after text cycling starts) */}
      {currentPhaseIndex >= 0 && ( // Show loader once animation starts
        <motion.div
          className="mt-10"
          variants={loaderVariant}
          initial="hidden"
          animate="visible"
        >
          <FiLoader className={`w-8 h-8 ${colors.accentRed} animate-spin`} />
        </motion.div>
      )}
    </motion.div>
  );
}
