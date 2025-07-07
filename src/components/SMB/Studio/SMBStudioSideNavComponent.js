// src/components/smb/studio/SMBStudioSideNavComponent.js
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Icons ---
import {
  FiUsers as IconCommunity,
  FiSettings,
  FiChevronDown,
  FiFileText as IconBlog,
  FiCalendar,
  FiList,
  FiPlus,
} from "react-icons/fi";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";
import { useLocalization } from "../../LocalizationContext";

const theme = loyalShiftV2Theme;

// --- Reusable Navigation Components ---
const NavItem = ({ to, icon, tKeyLabel, defaultLabel, exact = false }) => {
  const { t } = useLocalization();
  // Using theme properties from headerLight for a consistent look
  const baseClasses = `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ease-in-out w-full`;
  const activeClasses = `${theme.headerLight.hoverBg} ${theme.headerLight.textAccent} font-semibold`;
  const inactiveClasses = `${theme.headerLight.textMuted} hover:${theme.headerLight.hoverBg} hover:${theme.headerLight.textPrimary}`;

  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {icon}
      <span>{t(tKeyLabel, defaultLabel)}</span>
    </NavLink>
  );
};

const CollapsibleNavItem = ({
  icon,
  tKeyLabel,
  defaultLabel,
  children,
  startOpen = false,
}) => {
  const { t } = useLocalization();
  const [isOpen, setIsOpen] = useState(startOpen);
  const headerTheme = theme.headerLight;

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ease-in-out w-full ${headerTheme.textMuted} hover:${headerTheme.hoverBg} hover:${headerTheme.textPrimary}`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span>{t(tKeyLabel, defaultLabel)}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <FiChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="pl-6 mt-1 space-y-1 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function SMBStudioSideNavComponent() {
  const { t, currentLang, setCurrentLang } = useLocalization();
  const headerTheme = theme.headerLight;

  const mainNavLinks = [
    {
      isCollapsible: true,
      icon: <FiCalendar className="w-5 h-5" />,
      tKeyLabel: "smbStudioNav.events",
      defaultLabel: "Pages",
      subItems: [
        {
          to: "/smb/studio/builder",
          icon: <FiPlus className="w-5 h-5" />,
          tKeyLabel: "smbStudioNav.addNewEvent",
          defaultLabel: "Add New Page",
        },
      ],
    },
  ];

  const bottomNavLinks = [
    {
      to: "/smb/studio/settings",
      icon: <FiSettings className="w-5 h-5" />,
      tKeyLabel: "smbStudioNav.settings",
      defaultLabel: "Settings",
    },
  ];

  const langButtonBase = `px-2.5 py-1 text-xs font-bold rounded-md transition-colors duration-150 focus:outline-none ${theme.focusRingDefault}`;
  const langButtonActive = `${theme.buttonPrimaryBg} ${theme.buttonPrimaryText}`;
  const langButtonInactive = `${theme.surface} hover:${theme.surfaceMuted} ${theme.textSecondary}`;

  return (
    // --- KEY CHANGE: Added responsive classes `hidden md:flex` and `fixed` positioning ---
    <aside
      className={`hidden md:flex fixed left-0 top-0 w-64 h-screen ${headerTheme.headerBg} border-r ${headerTheme.border} flex-col p-4`}
      style={{ zIndex: 40 }}
    >
      <div className="flex items-center mb-6 h-16 sm:h-20">
        {" "}
        {/* Match header height for alignment */}
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
                className={`text-lg sm:text-xl font-bold ${headerTheme.textPrimary} group-hover:${headerTheme.textAccent} transition-colors`}
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
      <nav className="flex-grow space-y-1 overflow-y-auto pr-2">
        {mainNavLinks.map((item, index) =>
          item.isCollapsible ? (
            <CollapsibleNavItem key={index} {...item}>
              {item.subItems.map((subItem) => (
                <NavItem key={subItem.tKeyLabel} {...subItem} />
              ))}
            </CollapsibleNavItem>
          ) : (
            <NavItem key={index} {...item} />
          )
        )}
      </nav>
      <div className="mt-auto pt-4 border-t ${theme.borderLight}/50 space-y-3">
        {bottomNavLinks.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
        <div className="px-3 pt-2">
          <label
            className={`block text-xs font-semibold ${theme.textMuted} mb-2`}
          >
            {t("smbStudioNav.language", "Language")}
          </label>
          <div
            className={`flex items-center p-1 rounded-lg ${theme.surfaceMuted}`}
          >
            <button
              onClick={() => setCurrentLang("en")}
              className={`w-1/2 ${langButtonBase} ${
                currentLang === "en" ? langButtonActive : langButtonInactive
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setCurrentLang("es")}
              className={`w-1/2 ${langButtonBase} ${
                currentLang === "es" ? langButtonActive : langButtonInactive
              }`}
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
