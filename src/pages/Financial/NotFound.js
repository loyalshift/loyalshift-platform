// src/pages/FinancialNotFound.js
// 404 Not Found page specifically styled for FINANCIAL Inversiones.
// Uses Green/White/Grey theme and Spanish language.
// Current time is Friday, May 2, 2025 at 10:33:06 AM CST. San José, Alajuela Province, Costa Rica.

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // For navigation links
import { FiAlertTriangle, FiHome, FiPhone, FiArrowLeft } from 'react-icons/fi';

// --- Green/White/Grey Color Theme ---
const colors = {
    background: "bg-slate-100", // Light grey background for the page
    surface: "bg-white",      // White for potential card elements (not used here directly)
    primary: "text-emerald-700", // Trustworthy Green for icon/text
    primaryBg: "bg-emerald-600", // Brighter Green for primary button
    primaryBgHover: "hover:bg-emerald-700", // Darker Green hover
    secondary: "text-slate-600", // Medium grey for text
    secondaryBg: "bg-slate-200", // Light grey for secondary button
    secondaryBgHover: "hover:bg-slate-300",
    textDark: "text-slate-800", // Dark grey for main text
    textLight: "text-white",   // White text on green buttons
    border: "border-slate-300", // Standard border
    warningText: "text-amber-600", // Use a warning color for the icon
};

// --- Simple Animation Variants ---
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 150 } },
};
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- Main 404 Not Found Page Component ---
export default function FinancialNotFound() {
    return (
        // Full page container, centered content
        <div className={`min-h-screen ${colors.background} flex items-center justify-center text-center px-4 py-16`}>
            <motion.div
                className="max-w-lg w-full"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {/* Icon */}
                <motion.div variants={scaleUp} className="mb-6">
                    <FiAlertTriangle className={`w-20 h-20 ${colors.warningText} mx-auto opacity-80`} />
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
                    className={`text-3xl md:text-4xl font-bold ${colors.textDark} mb-3`}
                >
                    Página No Encontrada
                </motion.h1>

                {/* Description */}
                <motion.p
                    variants={fadeInUp}
                    className={`text-lg ${colors.secondary} mb-10`}
                >
                    Lo sentimos, la página que busca no existe o ha sido movida. Puede volver al inicio o contactarnos si necesita ayuda.
                </motion.p>

                {/* Action Buttons/Links */}
                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    {/* Back to Financial Home */}
                    <Link
                        to="/anaco" // Link to the main Financial section start page
                        className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md ${colors.textLight} ${colors.primaryBg} ${colors.primaryBgHover} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform hover:-translate-y-0.5`}
                    >
                        <FiHome className="w-5 h-5 mr-2" />
                        Volver al Inicio de ANACO
                    </Link>

                    {/* Contact Link */}
                    <Link
                        to="/anaco/contacto" // Link to the Financial contact page
                        className={`inline-flex items-center justify-center px-6 py-3 border ${colors.border} text-base font-medium rounded-md ${colors.textDark} ${colors.secondaryBg} ${colors.secondaryBgHover} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                    >
                        <FiPhone className="w-5 h-5 mr-2" />
                        Contactar Soporte
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
