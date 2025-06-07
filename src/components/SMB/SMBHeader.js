// src/components/LoyalShiftSMBHeader.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { motion, AnimatePresence } from "framer-motion";

import { FiArrowRight } from "react-icons/fi";
import { useLocalization } from "../LocalizationContext";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

export default function LoyalShiftSMBHeader({ forceDark }) {
  const { t, currentLang, setCurrentLang } = useLocalization();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Get current location
  const isDark = forceDark;

  const navItems = [
    {
      key: "navSolutions",
      path: "/smb/solutions",
      label: t("navSolutions", "Solutions"),
    },
    {
      key: "navFeatures",
      path: "/smb/features",
      label: t("navFeatures", "Features"),
    },
    {
      key: "navPricing",
      path: "/smb/pricing",
      label: t("navPricing", "Pricing"),
    },
    {
      key: "navResources",
      path: "/smb/resources",
      label: t("navResources", "Resources"),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentTheme = isDark ? theme.headerDark : theme.headerDark; // Consistently using headerDark as per original logic
  const headerShadow = isScrolled ? "shadow-lg" : "shadow-sm";

  // Function to determine Nav Link classes including active state
  const getNavLinkClasses = (itemPath) => {
    const isActive = location.pathname === itemPath;
    return `px-4 py-2 rounded-lg font-medium transition-all ${
      isActive
        ? `${currentTheme.activeButtonBg} ${currentTheme.activeButtonText} shadow-sm` // Active classes
        : `${currentTheme.textMuted} hover:text-cyan-500 ${currentTheme.hoverBg}` // Inactive classes
    }`;
  };

  // Function to determine Mobile Nav Link classes including active state
  const getMobileNavLinkClasses = (itemPath) => {
    const isActive = location.pathname === itemPath;
    return `block px-4 py-3 rounded-lg font-medium ${
      isActive
        ? `${currentTheme.activeButtonBg} ${currentTheme.activeButtonText} shadow-sm` // Active classes
        : `${currentTheme.textMuted} hover:text-cyan-500 ${currentTheme.hoverBg}` // Inactive classes
    }`;
  };

  const langButtonBaseClasses =
    "w-9 h-9 rounded-md font-medium flex items-center justify-center text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2";
  const langButtonContainerClasses = `bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5`;
  const langButtonActiveClasses = `bg-white dark:bg-slate-700 text-cyan-500 dark:text-cyan-400 font-semibold shadow-sm`;
  const langButtonInactiveClasses = `text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400`;

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${currentTheme.headerBg} ${headerShadow} border-b ${currentTheme.border}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/smb" className="flex items-center group">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-cyan-500 to-teal-400 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 transition-all duration-300 ease-out group-hover:rotate-[12deg] group-hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-lg sm:text-xl font-bold ${currentTheme.textPrimary} group-hover:${currentTheme.textAccent} transition-colors`}
                  >
                    LoyalShift
                  </span>
                  <span className="text-xs font-medium bg-gradient-to-r from-cyan-500 to-teal-400 bg-clip-text text-transparent">
                    SMB Solutions
                  </span>
                </div>
              </div>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={getNavLinkClasses(item.path)} // Use function to get classes
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className={`ml-4 px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-sm hover:shadow-md ${
                location.pathname === "/contact"
                  ? `ring-2 ring-offset-2 ${
                      currentTheme.headerBg === "bg-slate-900"
                        ? "ring-offset-slate-900"
                        : "ring-offset-white"
                    } ring-cyan-300 opacity-100`
                  : "" // Special active style for gradient button
              }`}
            >
              {t("navContact", "Contact")}
            </Link>
          </nav>
          {/* Right Section (Language + User + Mobile Menu Button) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Language Selector (Desktop) */}
            <div
              className={`hidden md:flex items-center space-x-0.5 ${langButtonContainerClasses} ${
                currentTheme.headerBg === "bg-slate-900"
                  ? "ring-offset-slate-900"
                  : "ring-offset-white"
              }`} // Added offset based on header background
            >
              <button
                onClick={() => setCurrentLang("en")}
                className={`${langButtonBaseClasses} ${
                  currentLang === "en"
                    ? langButtonActiveClasses
                    : langButtonInactiveClasses
                }`}
                aria-pressed={currentLang === "en"}
                aria-label={t("english", "English")}
              >
                EN
              </button>
              <div className="h-3.5 w-px bg-slate-300 dark:bg-slate-600 mx-0.5"></div>
              <button
                onClick={() => setCurrentLang("es")}
                className={`${langButtonBaseClasses} ${
                  currentLang === "es"
                    ? langButtonActiveClasses
                    : langButtonInactiveClasses
                }`}
                aria-pressed={currentLang === "es"}
                aria-label={t("spanish", "Spanish")}
              >
                ES
              </button>
            </div>

            {/* User Profile (Desktop) */}
            <div className="hidden md:flex items-center">
              <Link
                to="/"
                onClick={() => {
                  setCurrentLang("en");
                }}
                className={`flex items-center px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isDark
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/30" // Dark state style
                    : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" // Top/Transparent state style
                }`}
              >
                {t("smbHeaderAction", "Back to LoyalShift")}{" "}
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t("mobileMenu", "Mobile menu")}
              aria-expanded={isMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                // Stroke color should ideally come from theme textPrimary for consistency
                stroke={currentTheme.textPrimary || "currentColor"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={`md:hidden absolute top-full left-0 right-0 ${currentTheme.headerBg} border-t ${currentTheme.border} shadow-lg pb-4`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "circOut" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    className={getMobileNavLinkClasses(item.path)} // Use function to get classes
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className={`block px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-center ${
                    location.pathname === "/contact"
                      ? `ring-2 ring-offset-2 ${
                          currentTheme.headerBg === "bg-slate-900"
                            ? "ring-offset-slate-900"
                            : "ring-offset-white"
                        } ring-cyan-300 opacity-100`
                      : "" // Special active style for gradient button
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navContact", "Contact")}
                </Link>
                {/* Language Selector (Mobile) */}
                <div
                  className={`flex items-center justify-between px-2 pt-4 pb-2 mt-2 border-t ${currentTheme.border}`}
                >
                  <div
                    className={`text-sm font-medium ${currentTheme.textMuted}`}
                  >
                    {t("languageSelectorLabel", "Language:")}
                  </div>
                  <div
                    className={`flex items-center space-x-0.5 ${langButtonContainerClasses} ${
                      currentTheme.headerBg === "bg-slate-900"
                        ? "ring-offset-slate-900"
                        : "ring-offset-white"
                    }`} // Added offset based on header background
                  >
                    <button
                      onClick={() => {
                        setCurrentLang("en");
                        setIsMenuOpen(false);
                      }}
                      className={`${langButtonBaseClasses} ${
                        currentLang === "en"
                          ? langButtonActiveClasses
                          : langButtonInactiveClasses
                      }`}
                      aria-pressed={currentLang === "en"}
                      aria-label={t("english", "English")}
                    >
                      EN
                    </button>
                    <div className="h-3.5 w-px bg-slate-300 dark:bg-slate-600 mx-0.5"></div>
                    <button
                      onClick={() => {
                        setCurrentLang("es");
                        setIsMenuOpen(false);
                      }}
                      className={`${langButtonBaseClasses} ${
                        currentLang === "es"
                          ? langButtonActiveClasses
                          : langButtonInactiveClasses
                      }`}
                      aria-pressed={currentLang === "es"}
                      aria-label={t("spanish", "Spanish")}
                    >
                      ES
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

LoyalShiftSMBHeader.propTypes = {
  forceDark: PropTypes.bool,
};
