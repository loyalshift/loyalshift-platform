// src/components/StudioSidebar.js
// Reusable sidebar component for client-specific studio pages.

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FiPlus, FiArrowLeft } from "react-icons/fi";

// Default theme (neutral dark, can be overridden by props)
const defaultThemeColors = {
  sidebarBg: "bg-slate-900",
  border: "border-slate-700",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  textMuted: "text-slate-500",
  accentColor: "text-blue-400", // Generic accent for active items
  buttonPrimaryBg: "bg-gradient-to-r from-blue-600 to-cyan-500",
  buttonPrimaryHover: "hover:from-blue-500 hover:to-cyan-400",
  buttonText: "text-white",
  navItemActiveBg: "bg-slate-700",
  navItemHoverBg: "hover:bg-slate-700/50",
};

const NavItem = ({
  icon: Icon,
  label,
  isActive = false,
  href = "#",
  onClick,
  themeColors,
}) => (
  <li>
    <a
      href={onClick ? undefined : href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer
                  ${
                    isActive
                      ? `${themeColors.navItemActiveBg} ${themeColors.textPrimary}`
                      : `${themeColors.textSecondary} ${themeColors.navItemHoverBg} hover:${themeColors.textPrimary}`
                  }`}
    >
      <Icon
        className={`w-5 h-5 ${
          isActive ? themeColors.accentColor : themeColors.textSecondary
        }`}
      />
      {label}
    </a>
  </li>
);

NavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  themeColors: PropTypes.object.isRequired,
};

const StudioSidebar = ({
  clientId, // e.g., "equilibra", "afc"
  clientName, // e.g., "Equilibra CR"
  clientLogoUrl, // Path to client's logo
  themeColors: customThemeColors,
  navSections = [], // Array of section objects { title, items: [{icon, label, href, onClick, isActive}] }
  onUploadClick,
  uploadButtonText = "Upload New",
  backLinkPath, // e.g., "/equilibra"
  backLinkTextPrefix = "Back to",
}) => {
  const colors = { ...defaultThemeColors, ...customThemeColors };

  return (
    <motion.aside
      initial={{ x: -256, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className={`w-64 ${colors.sidebarBg} p-4 flex flex-col border-r ${colors.border} shadow-lg`}
    >
      {/* Client Logo / Name at the top (Optional) */}
      {clientLogoUrl && (
        <Link to={backLinkPath || "/"} className="mb-6 block text-center">
          <img
            src={clientLogoUrl}
            alt={`${clientName} Logo`}
            className="h-10 w-auto mx-auto"
          />
        </Link>
      )}

      <button
        onClick={onUploadClick}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 mb-6 rounded-lg text-sm font-semibold
                    ${colors.buttonPrimaryBg} ${colors.buttonText} ${
          colors.buttonPrimaryHover
        }
                    shadow-md hover:shadow-lg transition-all duration-200 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${colors.sidebarBg.replace(
                      "bg-",
                      ""
                    )} focus:ring-opacity-50`}
      >
        <FiPlus className="w-5 h-5" /> {uploadButtonText}
      </button>

      <div className="flex-grow space-y-5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent pr-1">
        {navSections.map((section) => (
          <div key={section.title}>
            <h3
              className={`text-xs font-semibold ${colors.textMuted} uppercase tracking-wider px-3 mb-2.5`}
            >
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <NavItem key={item.label} {...item} themeColors={colors} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {backLinkPath && (
        <div className={`mt-auto pt-4 border-t ${colors.border}`}>
          <Link
            to={backLinkPath}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm 
                        ${colors.textSecondary} ${colors.navItemHoverBg} hover:${colors.textPrimary} transition-colors`}
          >
            <FiArrowLeft className="w-4 h-4" /> {backLinkTextPrefix}{" "}
            {clientName || "Main"}
          </Link>
        </div>
      )}
    </motion.aside>
  );
};

StudioSidebar.propTypes = {
  clientId: PropTypes.string.isRequired,
  clientName: PropTypes.string,
  clientLogoUrl: PropTypes.string,
  themeColors: PropTypes.object,
  navSections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.elementType.isRequired,
          label: PropTypes.string.isRequired,
          isActive: PropTypes.bool,
          href: PropTypes.string,
          onClick: PropTypes.func,
        })
      ).isRequired,
    })
  ).isRequired,
  onUploadClick: PropTypes.func.isRequired,
  uploadButtonText: PropTypes.string,
  backLinkPath: PropTypes.string,
  backLinkTextPrefix: PropTypes.string,
};

export default StudioSidebar;
