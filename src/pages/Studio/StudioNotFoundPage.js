// src/pages/Studio/StudioNotFoundPage.js
// 404 Not Found page specifically for the Studio section when a client ID is not found.
// Uses a neutral dark theme.
// Current time: Friday, May 16, 2025 at 2:05 PM CST.

import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiHome, FiSearch } from "react-icons/fi";
import Button from "../../components/Button"; // Assuming Button component path

// Neutral Dark Theme Colors
const colors = {
  background: "bg-slate-950",
  surface: "bg-slate-900",
  border: "border-slate-700",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  accentBlue: "text-blue-400",
  buttonPrimaryBg: "bg-blue-600",
  buttonPrimaryHover: "hover:bg-blue-500",
  buttonText: "text-white",
};

// Animation Variants
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

export default function StudioNotFoundPage() {
  const { clientId } = useParams(); // Get the attempted clientId if needed for the message

  return (
    <div
      className={`min-h-full flex flex-col items-center justify-center text-center p-6 md:p-8 ${colors.background}`}
    >
      <motion.div
        className={`max-w-md w-full ${colors.surface} p-8 rounded-xl shadow-2xl border ${colors.border}`}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={scaleUp} className="mb-6">
          <FiAlertTriangle
            className={`w-20 h-20 ${colors.accentBlue} opacity-70 mx-auto`}
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className={`text-7xl md:text-8xl font-bold ${colors.textSecondary} opacity-20 mb-2`}
          aria-hidden="true"
        >
          404
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} mb-3`}
        >
          Studio del Cliente No Encontrado
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className={`text-md ${colors.textSecondary} mb-8`}
        >
          {clientId
            ? `Lo sentimos, no pudimos encontrar un estudio para el cliente con ID: "${clientId}".`
            : "Lo sentimos, no pudimos encontrar el estudio del cliente que está buscando."}
          <br />
          Por favor, verifique el enlace o intente buscar el cliente nuevamente.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button
            to="/" // Link to the main LoyalShift homepage or a studio selection page
            variant="primary"
            size="lg"
            icon={<FiHome className="w-5 h-5" />}
            className={`${colors.buttonPrimaryBg} ${colors.buttonText} ${colors.buttonPrimaryHover}`}
          >
            Volver al Inicio
          </Button>
          {/* You could add a link to a client search page if one exists */}
          {/* <Button
            to="/studio/search" 
            variant="secondary"
            size="lg"
            icon={<FiSearch className="w-5 h-5" />}
            className={`!bg-slate-700 !border-slate-600 hover:!bg-slate-600 !text-slate-200`}
          >
            Buscar Cliente
          </Button> 
          */}
        </motion.div>
      </motion.div>
    </div>
  );
}
