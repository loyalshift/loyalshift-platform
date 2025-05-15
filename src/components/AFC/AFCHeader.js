// src/components/Afc/Header.js
// Header component for the Athletic Functional Center (AFC) demo pages.
// UPDATED: "Nosotros" is now a dropdown with "Comunidad AFC" and "Testimonios".
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 3:25 PM CST.

import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiPhone,
  FiChevronDown,
  FiUsers,
  FiMessageCircle,
  FiAward,
} from "react-icons/fi";
import Button from "../Button";

// AFC Logo
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.svg";

// --- AFC Color Palette (Light Theme with Red Accents) ---
const themeColors = {
  background: "bg-white",
  textPrimary: "text-slate-800",
  textSecondary: "text-slate-600",
  border: "border-slate-200",
  accentRed: "text-red-600",
  accentRedDark: "text-red-700",
  accentRedBg: "bg-red-600",
  accentRedBgHover: "hover:bg-red-700",
  buttonTextLight: "text-white",
  mobileMenuBg: "bg-white/95 backdrop-blur-md",
  linkText: "text-slate-700",
  linkHoverText: "hover:text-red-600",
  linkActiveText: "text-red-600",
  linkActiveBorder: "border-red-500",
  dropdownBg: "bg-white",
  dropdownBorder: "border-slate-200",
  dropdownItemHoverBg: "hover:bg-red-50",
};

// --- Dropdown Menu Item Component ---
const DropdownMenuItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block w-full text-left px-4 py-2.5 text-sm 
       ${
         isActive
           ? `${themeColors.accentRed} font-semibold`
           : `${themeColors.textSecondary} hover:${themeColors.accentRed}`
       } 
       ${themeColors.dropdownItemHoverBg} transition-colors duration-150`
    }
  >
    {children}
  </NavLink>
);
DropdownMenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

const AFCHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const headerRef = useRef(null);
  const aboutMenuRef = useRef(null); // Ref for the "Nosotros" dropdown

  const colors = themeColors;

  const navLinks = [
    { name: "Inicio AFC", path: "/afc" },
    {
      name: "Nosotros",
      path: "/afc/about-us", // Main link for "Nosotros"
      dropdown: [
        // Sub-links for the dropdown
        { name: "Nuestra Esencia", path: "/afc/about-us", icon: FiAward }, // Original "About Us"
        { name: "Comunidad AFC", path: "/afc/community", icon: FiUsers },
        {
          name: "Testimonios",
          path: "/afc/testimonials",
          icon: FiMessageCircle,
        },
      ],
    },
    { name: "Inscripciones", path: "/afc/enroll" },
    { name: "Franquicias", path: "/afc/franchise" },
    { name: "Contacto AFC", path: "/afc/contact" },
  ];

  // Close menus if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      // Close "Nosotros" dropdown if clicking outside its specific area
      if (
        aboutMenuRef.current &&
        !aboutMenuRef.current.contains(event.target)
      ) {
        setAboutDropdownOpen(false);
      }
    }
    if (mobileMenuOpen || aboutDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen, aboutDropdownOpen]);

  const mobileMenuVariants = {
    /* ... (same as before) ... */
  };
  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.15, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.95, y: -5, transition: { duration: 0.1 } },
  };

  const navLinkClasses = (isActive, hasDropdown = false) =>
    `text-sm font-medium pb-1 border-b-2 transition-colors duration-200 ease-in-out flex items-center gap-1
     ${
       isActive && !hasDropdown // Only apply active border if not a dropdown parent that is open
         ? `${colors.linkActiveText} ${colors.linkActiveBorder}`
         : `${colors.linkText} ${colors.linkHoverText} border-transparent hover:border-red-500/30`
     }
     ${
       hasDropdown && aboutDropdownOpen
         ? `${colors.linkActiveText} border-red-500/30`
         : ""
     } // Style parent if dropdown is open
    `;

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 w-full z-40 border-b ${colors.background} ${colors.border} shadow-sm`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-3.5 md:py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/afc"
            className="flex items-center gap-2 flex-shrink-0 group"
            aria-label="AFC Home"
            onClick={() => {
              setMobileMenuOpen(false);
              setAboutDropdownOpen(false);
            }}
          >
            <img
              src={afcLogoPath}
              alt="AFC Logo"
              className="h-9 md:h-10 w-auto"
            />
            <span
              className={`text-xl md:text-2xl font-bold ${colors.textPrimary} group-hover:${colors.accentRed} transition-colors`}
            >
              AFC <span className={colors.accentRed}>Connect</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.name}
                  className="relative"
                  ref={link.name === "Nosotros" ? aboutMenuRef : null}
                >
                  <button
                    onClick={() =>
                      link.name === "Nosotros" &&
                      setAboutDropdownOpen(!aboutDropdownOpen)
                    }
                    onMouseEnter={() =>
                      link.name === "Nosotros" && setAboutDropdownOpen(true)
                    }
                    onMouseLeave={() =>
                      link.name === "Nosotros" && setAboutDropdownOpen(false)
                    }
                    className={navLinkClasses(aboutDropdownOpen, true)} // Pass true for hasDropdown
                    aria-haspopup="true"
                    aria-expanded={aboutDropdownOpen}
                  >
                    {link.name}
                    <FiChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        aboutDropdownOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {link.name === "Nosotros" && aboutDropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg ${colors.dropdownBg} ring-1 ring-black ring-opacity-5 border ${colors.dropdownBorder} py-1`}
                        onMouseEnter={() => setAboutDropdownOpen(true)} // Keep open on hover
                        onMouseLeave={() => setAboutDropdownOpen(false)} // Close on mouse leave
                      >
                        {link.dropdown.map((item) => {
                          const Icon = item.icon;
                          return (
                            <DropdownMenuItem
                              key={item.name}
                              to={item.path}
                              onClick={() => setAboutDropdownOpen(false)}
                            >
                              {Icon && (
                                <Icon className="w-4 h-4 mr-2.5 opacity-70" />
                              )}
                              {item.name}
                            </DropdownMenuItem>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => navLinkClasses(isActive)}
                >
                  {link.name}
                </NavLink>
              )
            )}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              to="/contact-sales?client=afc&topic=afc-platform-inquiry"
              variant="secondary"
              size="base"
              icon={<FiPhone />}
              className={`!text-sm !px-4 !py-1.5 !border-${colors.accentRedDark} !text-${colors.accentRedDark} hover:!bg-red-500/10`}
            >
              Contactar a LoyalShift
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${colors.textSecondary} hover:${colors.accentRed} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500`}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
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
            className={`fixed top-[57px] sm:top-[61px] left-0 right-0 z-30 border-b ${colors.border} ${colors.mobileMenuBg} shadow-xl lg:hidden`}
          >
            <nav className="container mx-auto px-4 pt-4 pb-6 flex flex-col space-y-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={`mobile-${link.name}`}>
                    <NavLink
                      to={link.path} // Main "Nosotros" link
                      className={({ isActive }) =>
                        `block px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-200 ease-in-out ${
                          isActive
                            ? `${colors.accentRed} bg-red-500/10`
                            : `${colors.textSecondary} hover:${colors.accentRed} hover:bg-slate-100`
                        }`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                    <div className="pl-4 mt-1 space-y-1 border-l-2 border-slate-200 ml-1">
                      {link.dropdown.map((item) => {
                        const Icon = item.icon;
                        return (
                          <NavLink
                            key={`mobile-sub-${item.name}`}
                            to={item.path}
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out ${
                                isActive
                                  ? `${colors.accentRed} bg-red-500/5`
                                  : `${colors.textSecondary} hover:${colors.accentRed} hover:bg-slate-100/50`
                              }`
                            }
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {Icon && (
                              <Icon className="w-4 h-4 mr-2 opacity-70" />
                            )}
                            {item.name}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={`mobile-${link.name}`}
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-200 ease-in-out ${
                        isActive
                          ? `${colors.accentRed} bg-red-500/10`
                          : `${colors.textSecondary} hover:${colors.accentRed} hover:bg-slate-100`
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                )
              )}
              <div className="pt-3 mt-3 border-t border-slate-200">
                <Button
                  to="/contact-sales?client=afc&topic=afc-platform-inquiry"
                  variant="primary"
                  size="lg"
                  icon={<FiPhone />}
                  className={`w-full ${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contactar a LoyalShift
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

AFCHeader.propTypes = {
  forceDark: PropTypes.bool,
};

export default AFCHeader;
