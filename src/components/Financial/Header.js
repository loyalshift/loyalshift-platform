// src/components/Financial/FinancialHeader.js
// UPDATED: Implemented dynamic theme switching based on forceDark prop.

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { FiLogIn, FiUserPlus } from "react-icons/fi";

// --- Define Color Palettes ---

const lightThemeColors = {
  surface: "bg-white", // White background
  primary: "text-emerald-700", // Dark Emerald for logo/hover
  secondary: "text-slate-800", // Dark Grey for nav links/secondary text
  textLight: "text-white", // White text for primary button
  border: "border-slate-200", // Light border
  primaryBg: "bg-emerald-600", // Primary button background (Emerald)
  primaryBgHover: "hover:bg-emerald-700", // Darker emerald hover
  secondaryBg: "bg-slate-200", // Secondary button background (Light grey)
  secondaryBgHover: "hover:bg-slate-300", // Darker grey hover
  secondaryText: "text-slate-800", // Dark text for secondary button
  focusRingOffset: "focus:ring-offset-white", // Focus offset for light bg
};

const darkThemeColors = {
  surface: "bg-slate-900", // Dark background
  primary: "text-emerald-400", // Bright Emerald for logo/hover
  secondary: "text-slate-300", // Light grey for nav links/secondary text
  textLight: "text-white", // White text for primary button
  border: "border-slate-700", // Darker border
  primaryBg: "bg-emerald-600", // Primary button background (Emerald)
  primaryBgHover: "hover:bg-emerald-500", // Lighter emerald hover
  secondaryBg: "bg-slate-700", // Secondary button background (Darker grey)
  secondaryBgHover: "hover:bg-slate-600", // Lighter grey hover
  secondaryText: "text-slate-200", // Light text for secondary button
  focusRingOffset: "focus:ring-offset-slate-900", // Focus offset for dark bg
};

const FinancialHeader = ({ forceDark = false }) => {
  // Select the active theme based on the prop
  const colors = forceDark ? darkThemeColors : lightThemeColors;

  return (
    // Apply dynamic background and border
    <header
      // Added transition-colors for smoother theme switching if prop changes dynamically (unlikely here but good practice)
      className={`${colors.surface} shadow-md z-40 border-b ${colors.border} transition-colors duration-300`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link
          to="/anaco"
          className="flex items-center gap-2 flex-shrink-0"
          aria-label="FINANCIAL Inversiones Home"
        >
          <img
            src={"/images/financial.png"}
            alt="FINANCIAL Logo"
            className="h-8 w-auto"
          />
          {/* "Financial" part uses dynamic primary color */}
          <span
            className={`text-xl font-semibold ${colors.primary} hidden sm:inline`}
          >
            ANACO
          </span>
          {/* "Inversiones" part uses dynamic secondary color */}
          <span
            className={`text-xl font-semibold ${colors.secondary} hidden sm:inline`}
          >
            Inversiones
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {[
            { path: "/anaco/about-us", label: "Nosotros" },
            {
              path: "/anaco/services/mortgage",
              label: "Créditos Hipotecarios",
            },
            {
              path: "/anaco/advanced-tools-integration",
              label: "Análisis Avanzado",
            },
            { path: "/anaco/marketplace", label: "Propiedades" },
            { path: "/anaco/calculator", label: "Calculadora" },
            { path: "/anaco/contact", label: "Contacto" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              // Use dynamic secondary text color, hover uses dynamic primary color
              className={`text-sm font-medium ${colors.secondary} hover:${colors.primary} transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Login/Register Buttons */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Login Button - Uses dynamic secondary styles */}
          <Link
            to="/anaco/login"
            className={`hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${colors.secondaryText} ${colors.secondaryBg} ${colors.secondaryBgHover} transition-colors`}
          >
            <FiLogIn className="w-4 h-4 mr-2" />
            Iniciar Sesión
          </Link>
          {/* Register Button - Uses dynamic primary styles */}
          <Link
            to="/anaco/register"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${colors.textLight} ${colors.primaryBg} ${colors.primaryBgHover} transition-colors focus:outline-none focus:ring-2 ${colors.focusRingOffset} focus:ring-emerald-500`}
          >
            <FiUserPlus className="w-4 h-4 mr-2" />
            Registrarse
          </Link>
        </div>
      </nav>
    </header>
  );
};

FinancialHeader.propTypes = {
  /** If true, forces the header to use the dark theme variant */
  forceDark: PropTypes.bool,
};

export default FinancialHeader;
