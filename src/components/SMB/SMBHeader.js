import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useLocalization } from "../LocalizationContext";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";
import { LoyalShiftLogo } from "../LoyalShiftLogo";
import Logo from "../Logo";

const theme = loyalShiftV2Theme;

export default function LoyalShiftSMBHeader({ forceDark }) {
  const { t, currentLang, setCurrentLang } = useLocalization();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isDark = forceDark;

  // Get the appropriate theme variant
  const currentTheme = isDark ? theme.headerDark : theme.headerLight;
  const headerShadow = isScrolled ? theme.cardHoverShadow : theme.cardShadow;

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

  // Navigation link classes using theme
  const getNavLinkClasses = (itemPath) => {
    const isActive = location.pathname === itemPath;
    return `px-4 py-2 rounded-lg font-medium text-sm transition-all ${
      isActive
        ? `${currentTheme.activeButtonBg} ${currentTheme.activeButtonText} ${theme.cardShadow}`
        : `${currentTheme.textMuted} ${currentTheme.hoverBg} hover:${currentTheme.textPrimary}`
    }`;
  };

  // Mobile navigation link classes using theme
  const getMobileNavLinkClasses = (itemPath) => {
    const isActive = location.pathname === itemPath;
    return `block px-4 py-3 rounded-lg font-medium ${
      isActive
        ? `${currentTheme.activeButtonBg} ${currentTheme.activeButtonText} ${theme.cardShadow}`
        : `${currentTheme.textMuted} ${currentTheme.hoverBg} hover:${currentTheme.textPrimary}`
    }`;
  };

  // Language selector classes using theme
  const langButtonContainerClasses = isDark
    ? theme.surface
    : theme.surfaceMuted;
  const langButtonActiveClasses = isDark
    ? `${theme.surfaceCard} ${theme.textHighlight} font-semibold ${theme.cardShadow}`
    : `${theme.surface} ${theme.accentCyan} font-semibold ${theme.cardShadow}`;
  const langButtonInactiveClasses = isDark
    ? `${theme.textMuted} hover:${theme.textHighlight}`
    : `${theme.textSecondary} hover:${theme.accentCyan}`;

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
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 transition-all duration-300 ease-out group-hover:rotate-[12deg] group-hover:scale-110">
                  <LoyalShiftLogo type="icon" />
                </div>
                <div className="flex flex-col">
                  <Logo className={currentTheme.textPrimary} />
                  <span
                    className={`text-xs font-medium bg-gradient-to-r ${
                      theme.accentCyanBg
                    } to-${theme.accentCyanBgHover.replace(
                      "hover:",
                      ""
                    )} bg-clip-text text-transparent`}
                  >
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
                className={getNavLinkClasses(item.path)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className={`ml-4 px-5 py-2.5 rounded-lg font-medium ${
                theme.buttonPrimaryBg
              } ${theme.buttonPrimaryText} hover:${
                theme.buttonPrimaryHoverBg
              } transition-opacity ${theme.cardShadow} hover:${
                theme.cardHoverShadow
              } ${
                location.pathname === "/contact"
                  ? `${theme.focusRingDefault} ring-offset-white dark:ring-offset-slate-900`
                  : ""
              }`}
            >
              {t("navContact", "Contact")}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Desktop-only items */}
            <div className="hidden md:flex items-center space-x-4">
              <div
                className={`flex items-center space-x-0.5 rounded-lg p-0.5 ${langButtonContainerClasses}`}
              >
                <button
                  onClick={() => setCurrentLang("en")}
                  className={`w-9 h-9 rounded-md font-medium flex items-center justify-center text-sm transition-colors ${
                    theme.focusRingDefault
                  } ${
                    currentLang === "en"
                      ? langButtonActiveClasses
                      : langButtonInactiveClasses
                  }`}
                  aria-pressed={currentLang === "en"}
                  aria-label={t("english", "English")}
                >
                  EN
                </button>
                <div
                  className={`h-4 w-px ${
                    isDark ? theme.border : theme.borderLight
                  }`}
                ></div>
                <button
                  onClick={() => setCurrentLang("es")}
                  className={`w-9 h-9 rounded-md font-medium flex items-center justify-center text-sm transition-colors ${
                    theme.focusRingDefault
                  } ${
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

              <Link
                to="/"
                className={`flex items-center px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} hover:${theme.buttonTextLinkHover}`}
              >
                {t("smbHeaderAction", "Back to LoyalShift")}{" "}
                <FiArrowRight
                  className={`ml-2 h-5 w-5 ${theme.buttonSecondaryText}`}
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-md ${theme.focusRingDefault} ${currentTheme.textPrimary}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t("mobileMenu", "Mobile menu")}
              aria-expanded={isMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
              className={`md:hidden absolute top-full left-0 right-0 ${currentTheme.headerBg} border-t ${currentTheme.border} ${theme.cardHoverShadow} pb-4`}
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
                    className={getMobileNavLinkClasses(item.path)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className={`block px-4 py-3 rounded-lg font-medium ${
                    theme.buttonPrimaryBg
                  } ${theme.buttonPrimaryText} text-center ${
                    location.pathname === "/contact"
                      ? `${theme.focusRingDefault} ring-offset-white dark:ring-offset-slate-900`
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navContact", "Contact")}
                </Link>
                <Link
                  to="/"
                  className={`block px-4 py-3 mt-2 rounded-lg font-medium text-center ${currentTheme.hoverBg} ${currentTheme.textMuted} hover:${currentTheme.textPrimary}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("smbHeaderAction", "Back to LoyalShift")}
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
                    className={`flex items-center space-x-0.5 rounded-lg p-0.5 ${langButtonContainerClasses}`}
                  >
                    <button
                      onClick={() => setCurrentLang("en")}
                      className={`w-9 h-9 rounded-md font-medium flex items-center justify-center text-sm transition-colors ${
                        theme.focusRingDefault
                      } ${
                        currentLang === "en"
                          ? langButtonActiveClasses
                          : langButtonInactiveClasses
                      }`}
                    >
                      EN
                    </button>
                    <div
                      className={`h-4 w-px ${
                        isDark ? theme.border : theme.borderLight
                      }`}
                    ></div>
                    <button
                      onClick={() => setCurrentLang("es")}
                      className={`w-9 h-9 rounded-md font-medium flex items-center justify-center text-sm transition-colors ${
                        theme.focusRingDefault
                      } ${
                        currentLang === "es"
                          ? langButtonActiveClasses
                          : langButtonInactiveClasses
                      }`}
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

LoyalShiftSMBHeader.defaultProps = {
  forceDark: false,
};
