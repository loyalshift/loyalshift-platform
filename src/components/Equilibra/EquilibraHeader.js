// src/components/Equilibra/Header.js
// Header component for the Equilibra CR demo pages.
// UPDATED: Added "Recursos" dropdown, "Studio Equilibra" link, and refined "Nosotros" dropdown.
// Uses a calm, earthy, supportive light theme.
// Current time: Friday, May 16, 2025 at 2:55 PM CST.

import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiMessageSquare,
  FiChevronDown,
  FiAward,
  FiUsers,
  FiBookOpen,
  FiEdit3,
  FiLayout,
  FiStar, // Added FiLayout for Studio, FiStar for general resources
} from "react-icons/fi";

// Equilibra CR Logo
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.svg";

// --- Equilibra CR New Color Palette ---
const themeColors = {
  background: "bg-[#FFF7F2]",
  textPrimary: "text-[#5C5C5C]",
  textSecondary: "text-[#A89C94]",
  border: "border-[#A89C94]/40",
  logoColor: "text-[#E86F51]",
  linkText: "text-[#5C5C5C]",
  linkHoverText: "hover:text-[#E86F51]",
  linkActiveText: "text-[#E86F51]",
  linkActiveBorder: "border-[#E86F51]",
  mobileMenuBg: "bg-[#FFF7F2]/95 backdrop-blur-md",
  contactButtonBg: "bg-[#E86F51]",
  contactButtonText: "text-white",
  contactButtonHoverBg: "hover:bg-[#d95f41]",
  dropdownBg: "bg-white",
  dropdownBorder: "border-[#A89C94]/30",
  dropdownItemHoverBg: "hover:bg-[#FDB386]/20", // Soft Peach accent for hover
};

// --- Dropdown Menu Item Component ---
const DropdownMenuItem = ({ to, children, onClick, icon: Icon }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center w-full text-left px-4 py-2.5 text-sm 
       ${
         isActive
           ? `${themeColors.linkActiveText} font-semibold bg-[#E86F51]/5`
           : `${themeColors.textSecondary} hover:${themeColors.linkActiveText}`
       } 
       ${
         themeColors.dropdownItemHoverBg
       } transition-colors duration-150 rounded-md`
    }
  >
    {Icon && <Icon className="w-4 h-4 mr-2.5 opacity-70" />}
    {children}
  </NavLink>
);
DropdownMenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.elementType,
};

const EquilibraHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Manages which dropdown is open
  const headerRef = useRef(null);
  const dropdownRefs = {
    // Refs for each dropdown to handle click outside
    nosotros: useRef(null),
    recursos: useRef(null),
  };

  const colors = themeColors;

  const navLinks = [
    { name: "Inicio Equilibra", path: "/equilibra" }, // Main landing for Equilibra platform vision
    {
      name: "Nosotros",
      id: "nosotros", // For managing dropdown state
      dropdown: [
        { name: "Nuestra Esencia", path: "/equilibra/about-us", icon: FiAward },
        { name: "Comunidad", path: "/equilibra/community", icon: FiUsers },
        {
          name: "Testimonios",
          path: "/equilibra/testimonials",
          icon: FiMessageSquare,
        },
      ],
    },
    {
      name: "Recursos",
      id: "recursos", // For managing dropdown state
      dropdown: [
        { name: "Blog / Artículos", path: "/equilibra/blog", icon: FiBookOpen }, // Placeholder
        { name: "Guías Prácticas", path: "/equilibra/guides", icon: FiEdit3 }, // Placeholder
        // Link to where content created in studio would be displayed
        {
          name: "Materiales del Studio",
          path: "/equilibra/studio-content",
          icon: FiLayout,
        }, // Placeholder
      ],
    },
    { name: "Studio Equilibra", path: "/studio/equilibra", icon: FiLayout }, // Direct link to their studio
    { name: "Contacto", path: "/equilibra/contact" },
  ];

  // Close menus if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      // Check each dropdown ref
      Object.keys(dropdownRefs).forEach((key) => {
        if (
          dropdownRefs[key].current &&
          !dropdownRefs[key].current.contains(event.target)
        ) {
          if (activeDropdown === key) {
            setActiveDropdown(null);
          }
        }
      });
    }
    if (mobileMenuOpen || activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen, activeDropdown, dropdownRefs]);

  const toggleDropdown = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const mobileMenuVariants = {
    /* ... */
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

  const navLinkClasses = (isActive, hasDropdown = false, dropdownId = null) =>
    `text-sm font-medium pb-1 border-b-2 transition-colors duration-200 ease-in-out flex items-center gap-1
     ${
       isActive && !hasDropdown
         ? `${colors.linkActiveText} ${colors.linkActiveBorder}`
         : `${colors.linkText} ${colors.linkHoverText} border-transparent hover:border-[#E86F51]/30`
     }
     ${
       hasDropdown && activeDropdown === dropdownId
         ? `${colors.linkActiveText} border-[#E86F51]/30`
         : ""
     }
    `;

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className={`w-full z-40 border-b ${colors.background} ${colors.border} shadow-sm`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-3 md:py-3.5 flex justify-between items-center">
          <Link
            to="/equilibra"
            className={`flex items-center gap-2.5 flex-shrink-0 group`}
            aria-label="Equilibra Contigo Home"
            onClick={closeAllDropdowns}
          >
            <img
              src={equilibraLogoPath}
              alt="Equilibra CR Logo"
              className={`h-9 font-semibold ${colors.textPrimary} group-hover:${colors.logoColor} transition-colors`}
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.name}
                  className="relative"
                  ref={dropdownRefs[link.id]}
                >
                  <button
                    onClick={() => toggleDropdown(link.id)}
                    className={navLinkClasses(
                      activeDropdown === link.id,
                      true,
                      link.id
                    )}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === link.id}
                  >
                    {link.name}
                    <FiChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === link.id ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.id && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 rounded-md shadow-lg ${colors.dropdownBg} ring-1 ring-black ring-opacity-5 border ${colors.dropdownBorder} py-1.5 z-50`}
                        onMouseEnter={() => setActiveDropdown(link.id)} // Keep open on hover
                        onMouseLeave={() => setActiveDropdown(null)} // Close on mouse leave
                      >
                        {link.dropdown.map((item) => (
                          <DropdownMenuItem
                            key={item.name}
                            to={item.path}
                            icon={item.icon}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </DropdownMenuItem>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    navLinkClasses(isActive, false, null)
                  }
                  end={link.path === "/equilibra"}
                >
                  {link.icon && (
                    <link.icon className="w-4 h-4 mr-1.5 opacity-80" />
                  )}
                  {link.name}
                </NavLink>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center">
            <Link
              to="/contact-sales?client=equilibra_cr&topic=equilibra_contigo_platform"
              className={`flex items-center text-sm font-medium px-4 py-2 rounded-lg 
                            ${colors.contactButtonBg} ${colors.contactButtonText} ${colors.contactButtonHoverBg} 
                            transition-colors shadow-sm hover:shadow-md`}
            >
              <FiMessageSquare className="w-4 h-4 mr-2" />
              Contactar a LoyalShift
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setActiveDropdown(null);
              }}
              className={`p-2 rounded-md ${colors.textSecondary} hover:${colors.logoColor} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#E86F51]`}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

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
              {navLinks.map((link) => (
                <div key={`mobile-${link.name}`}>
                  <NavLink
                    to={link.dropdown ? "#" : link.path} // If dropdown, main link might not navigate or goes to first item
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-200 ease-in-out ${
                        isActive && !link.dropdown
                          ? `${colors.linkActiveText} bg-[#E86F51]/10`
                          : `${colors.textSecondary} hover:${colors.linkActiveText} hover:bg-stone-200`
                      }`
                    }
                    onClick={(e) => {
                      if (link.dropdown) {
                        e.preventDefault(); // Prevent navigation for dropdown parent
                        toggleDropdown(
                          activeDropdown === link.id ? null : link.id
                        ); // Toggle specific dropdown
                      } else {
                        closeAllDropdowns();
                      }
                    }}
                    end={link.path === "/equilibra"}
                  >
                    <span className="flex items-center">
                      {link.icon && (
                        <link.icon className="w-5 h-5 mr-2 opacity-80" />
                      )}
                      {link.name}
                    </span>
                    {link.dropdown && (
                      <FiChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          activeDropdown === link.id
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </NavLink>
                  {/* Mobile Dropdown Content */}
                  {link.dropdown && activeDropdown === link.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-5 mt-1 space-y-1 border-l-2 border-stone-200 ml-2"
                    >
                      {link.dropdown.map((item) => {
                        const Icon = item.icon;
                        return (
                          <NavLink
                            key={`mobile-sub-${item.name}`}
                            to={item.path}
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out ${
                                isActive
                                  ? `${colors.linkActiveText} bg-[#E86F51]/5`
                                  : `${colors.textSecondary} hover:${colors.linkActiveText} hover:bg-stone-200/50`
                              }`
                            }
                            onClick={closeAllDropdowns}
                          >
                            {Icon && (
                              <Icon className="w-4 h-4 mr-2 opacity-70" />
                            )}
                            {item.name}
                          </NavLink>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              ))}
              <div className="pt-3 mt-3 border-t border-stone-200">
                <Link
                  to="/contact-sales?client=equilibra_cr&topic=equilibra_contigo_platform"
                  onClick={closeAllDropdowns}
                  className={`flex items-center justify-center text-base font-medium px-4 py-3 rounded-lg 
                                ${colors.contactButtonBg} ${colors.contactButtonText} ${colors.contactButtonHoverBg} 
                                transition-colors shadow-sm w-full`}
                >
                  <FiMessageSquare className="w-5 h-5 mr-2" />
                  Contactar a LoyalShift
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

EquilibraHeader.propTypes = {
  forceDark: PropTypes.bool,
};

export default EquilibraHeader;
