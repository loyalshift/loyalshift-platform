// src/components/GiryaHeader.js
// Header component for the Girya demo pages.
// Displays the Girya logo and supports light/dark earthy themes.

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Import the Girya logo as a URL (to avoid SVG loader issues)
import giryaLogoUrl from "../../images/girya-logo.svg"; // Adjust path if needed

// --- Define Earthy Color Palettes for Light and Dark Themes ---
// Ideally, these should be defined in your tailwind.config.js
// and used as utility classes, but defined here for clarity.
const lightEarthyColors = {
  background: "bg-stone-100", // Light background
  textPrimary: "text-stone-800", // Dark text for headings/logo
  textSecondary: "text-stone-600", // Muted text
  border: "border-stone-300", // Light border
  logoColor: "text-emerald-800", // Highlight color for logo/accent
};

const darkEarthyColors = {
  background: "bg-stone-700", // Dark earthy background
  textPrimary: "text-stone-100", // Light text for headings/logo
  textSecondary: "text-stone-300", // Muted text
  border: "border-stone-600", // Darker border
  logoColor: "text-emerald-400", // Brighter highlight color for logo/accent
};

/**
 * Header component for Girya demo pages with theme switching.
 * @param {object} props - Component props.
 * @param {boolean} [props.forceDark=false] - If true, forces the dark theme regardless of scroll position (handled by parent layout).
 */
const GiryaHeader = ({ forceDark = false }) => {
  // Select the active theme colors based on the prop
  const colors = forceDark ? darkEarthyColors : lightEarthyColors;

  return (
    // Fixed header with dynamic background and border
    <header
      className={`fixed top-0 left-0 right-0 w-full z-40 border-b ${colors.background} ${colors.border} transition-colors duration-300`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        {/* Link to the main Girya Landing Page (/girya) */}
        <Link to="/girya" className="flex items-center gap-2 flex-shrink-0">
          {/* Use img tag for the SVG logo */}
          <img
            src={giryaLogoUrl}
            alt="Girya Logo"
            className={`h-8 w-auto ${colors.logoColor}`} // Apply logo color class
          />
          {/* Optional: Add a text title next to the logo */}
          <span
            className={`text-xl font-bold ${colors.textPrimary} hidden sm:inline`}
          >
            GiryaFlow Digital Demo
          </span>
        </Link>

        {/* Navigation Links (Optional for a simple demo header) */}
        {/* Add links here if needed for navigation within the demo flow */}
        {/* <div className="hidden md:flex items-center space-x-6">
             <Link to="/demo/girya/consent" className={`text-sm font-medium ${colors.textSecondary} hover:${colors.textPrimary}`}>Consent</Link>
             <Link to="/girya" className={`text-sm font-medium ${colors.textSecondary} hover:${colors.textPrimary}`}>Main Page</Link>
             <Link to="/demo/girya/cta" className={`text-sm font-medium ${colors.textSecondary} hover:${colors.textPrimary}`}>Final CTA</Link>
           </div> */}

        {/* Right side - Could add a simple identifier or leave empty */}
        <div className={`text-sm ${colors.textSecondary}`}>Demo Mode</div>
      </nav>
    </header>
  );
};

GiryaHeader.propTypes = {
  /** If true, forces the header to use the dark theme variant */
  forceDark: PropTypes.bool,
};

export default GiryaHeader;
