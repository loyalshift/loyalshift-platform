// src/components/Girya/Header.js
// REFINED: Corrected "Modo Demo" tooltip buttons to be placeholders, not linking to ANACO.
// Updated button styling in tooltip to match Girya theme.

import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiLogIn, FiUserPlus } from "react-icons/fi";

// Import the Girya logo as a URL
import giryaLogoUrl from "../../images/girya-logo.svg"; // Adjust path if needed

// --- Earthy Color Palette (Dark Theme for Girya section) ---
const themeColors = {
  background: "bg-stone-800",
  textPrimary: "text-stone-100",
  textSecondary: "text-stone-400",
  border: "border-stone-700",
  logoColor: "text-emerald-400",
  logoHoverColor: "hover:text-emerald-300",
  linkText: "text-stone-300",
  linkHoverText: "hover:text-emerald-400",
  linkActiveText: "text-emerald-400",
  linkActiveBorder: "border-emerald-500",
  mobileMenuBg: "bg-stone-800/95 backdrop-blur-md",
  // Tooltip and button colors (Girya Themed)
  tooltipBg: "bg-stone-700", // Slightly lighter than header bg for tooltip
  tooltipBorder: "border-stone-600",
  tooltipButtonBg: "bg-emerald-700", // Girya's primary green
  tooltipButtonText: "text-white",
  tooltipButtonHoverBg: "hover:bg-emerald-600",
  tooltipSecondaryButtonBg: "bg-stone-600", // Darker stone for secondary
  tooltipSecondaryButtonHoverBg: "hover:bg-stone-500",
};

const Header = ({ forceDark = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemoTooltip, setShowDemoTooltip] = useState(false);
  const headerRef = useRef(null);
  const demoModeRef = useRef(null);

  const colors = themeColors;

  const navLinks = [
    { name: "Nosotros", path: "/girya/about-us" },
    { name: "Inscripciones", path: "/girya/enroll" },
    { name: "Coaches", path: "/girya/coaches" },
    { name: "Programas", path: "/girya/programs" },
    { name: "Franquicia", path: "/girya/franchise" },
    { name: "Contacto", path: "/girya/contact" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      if (demoModeRef.current && !demoModeRef.current.contains(event.target)) {
        setShowDemoTooltip(false);
      }
    }
    if (mobileMenuOpen || showDemoTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen, showDemoTooltip]);

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.15, ease: "easeIn" } },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: "easeOut" } },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.1 } },
  };

  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium pb-1 border-b-2 transition-colors duration-200 ease-in-out
     ${isActive
       ? `${colors.linkActiveText} ${colors.linkActiveBorder}`
       : `${colors.linkText} ${colors.linkHoverText} border-transparent hover:border-stone-500`
     }`;

  const handlePlaceholderAction = (actionName) => {
    setShowDemoTooltip(false);
    alert(`${actionName} - Esta funcionalidad sería específica para Girya y está pendiente de implementación.`);
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 w-full z-40 border-b ${colors.background} ${colors.border} shadow-lg`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center">
          <Link
            to="/girya"
            className={`flex items-center gap-2.5 flex-shrink-0 group ${colors.logoHoverColor} transition-colors duration-200`}
            aria-label="Girya Home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.img
              src={giryaLogoUrl}
              alt="Girya Logo"
              className={`h-8 md:h-9 w-auto ${colors.logoColor} group-hover:opacity-90 transition-opacity`}
              whileHover={{ scale: 1.05 }}
            />
            <span
              className={`text-xl md:text-2xl font-bold ${colors.textPrimary} hidden sm:inline group-hover:text-stone-50 transition-colors`}
            >
              GiryaFlow
            </span>
            <span
              className={`text-xs font-medium ${colors.textHighlight} hidden md:inline px-2 py-0.5 border border-emerald-600/40 bg-emerald-500/10 rounded-md ml-1 group-hover:bg-emerald-500/20 transition-colors`}
            >
              Digital
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-5 lg:space-x-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={navLinkClasses}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${colors.textSecondary} hover:${colors.textPrimary} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500`}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          <div
            ref={demoModeRef}
            className="hidden md:flex relative"
            onMouseEnter={() => setShowDemoTooltip(true)}
            onMouseLeave={() => setShowDemoTooltip(false)}
          >
            <div className={`text-xs font-medium px-3 py-1 rounded-full ${colors.textSecondary} bg-stone-700/70 border ${colors.border} cursor-default`}>
              Modo Demo
            </div>
            <AnimatePresence>
              {showDemoTooltip && (
                <motion.div
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`absolute top-full right-0 mt-2 w-max min-w-[200px] rounded-md shadow-lg ${colors.tooltipBg} border ${colors.tooltipBorder} z-50 p-3`}
                >
                  <div className="flex flex-col space-y-2">
                    {/* UPDATED: Buttons now use onClick for placeholder action */}
                    <button
                      onClick={() => handlePlaceholderAction("Iniciar Sesión")}
                      className={`flex items-center justify-center text-sm font-medium px-3 py-1.5 rounded-md ${colors.tooltipSecondaryButtonBg} ${colors.textPrimary} ${colors.tooltipSecondaryButtonHoverBg} transition-colors`}
                    >
                      <FiLogIn className="w-4 h-4 mr-2" />
                      Iniciar Sesión
                    </button>
                    <button
                      onClick={() => handlePlaceholderAction("Registrarse")}
                      className={`flex items-center justify-center text-sm font-medium px-3 py-1.5 rounded-md ${colors.tooltipButtonBg} ${colors.tooltipButtonText} ${colors.tooltipButtonHoverBg} transition-colors`}
                    >
                      <FiUserPlus className="w-4 h-4 mr-2" />
                      Registrarse
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-[68px] left-0 right-0 z-30 border-b ${colors.border} ${colors.mobileMenuBg} shadow-xl md:hidden`}
          >
            <nav className="container mx-auto px-4 pt-4 pb-6 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={`mobile-${link.name}`}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ease-in-out
                     ${isActive
                       ? `${colors.linkActiveText} bg-emerald-500/10`
                       : `${colors.linkText} ${colors.linkHoverText} hover:bg-stone-700`
                     }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Header.propTypes = {
  forceDark: PropTypes.bool,
};

export default Header;
