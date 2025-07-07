// FILE: src/components/smb/studio/MobileStudioNav.js
// This is the NEW component for the floating "Atom-like" menu on mobile.
import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Using NavLink for active styles
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiUsers as IconCommunity,
  FiFileText as IconBlog,
  FiCalendar,
  FiSettings,
} from "react-icons/fi";
import { useLocalization } from "../../LocalizationContext";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

export default function MobileStudioNav() {
  const { t, currentLang, setCurrentLang } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  // Simplified nav items for the mobile pop-up menu
  const navItems = [
    {
      to: "/smb/studio/community",
      icon: <IconCommunity className="w-6 h-6" />,
      key: "smbStudioNav.community",
    },
    {
      to: "/smb/studio/blog",
      icon: <IconBlog className="w-6 h-6" />,
      key: "smbStudioNav.blog",
    },
    {
      to: "/smb/studio/events/public",
      icon: <FiCalendar className="w-6 h-6" />,
      key: "smbStudioNav.events",
    },
    {
      to: "/smb/studio/settings",
      icon: <FiSettings className="w-6 h-6" />,
      key: "smbStudioNav.settings",
    },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.9,
      y: 10,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 15, scale: 0.95 },
    open: { opacity: 1, y: 0, scale: 1 },
  };

  const langButtonBase = `px-4 py-1.5 text-sm font-bold rounded-md transition-colors duration-150 focus:outline-none ${theme.focusRingDefault}`;
  const langButtonActive = `${theme.buttonPrimaryBg} ${theme.buttonPrimaryText}`;
  const langButtonInactive = `${theme.surface} hover:${theme.surfaceMuted} ${theme.textSecondary}`;

  // Active/Inactive classes for NavLink
  const activeLinkClasses = `${theme.accentCyanBg} ${theme.buttonTextLight}`;
  const inactiveLinkClasses = `${theme.surface} ${theme.textSecondary} hover:bg-slate-100`;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    // This entire component is only visible on mobile (md:hidden)
    <div className="md:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-items-wrapper"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed bottom-24 left-4 z-50 flex flex-col items-start gap-4"
          >
            {/* Navigation Icons */}
            {navItems.map((item) => (
              <motion.div key={item.key} variants={itemVariants}>
                <NavLink
                  to={item.to}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `w-14 h-14 rounded-full ${theme.cardShadow} border ${
                      theme.borderLight
                    } flex items-center justify-center transition-all duration-200 ease-out transform hover:-translate-y-0.5 ${
                      isActive ? activeLinkClasses : inactiveLinkClasses
                    }`
                  }
                  aria-label={t(item.key)}
                >
                  {item.icon}
                </NavLink>
              </motion.div>
            ))}

            {/* Language Selector */}
            <motion.div
              variants={itemVariants}
              className={`flex items-center p-1 rounded-full ${theme.surface} shadow-lg border ${theme.borderLight}`}
            >
              <button
                onClick={() => setCurrentLang("en")}
                className={`${langButtonBase} ${
                  currentLang === "en" ? langButtonActive : langButtonInactive
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setCurrentLang("es")}
                className={`${langButtonBase} ${
                  currentLang === "es" ? langButtonActive : langButtonInactive
                }`}
              >
                ES
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMenu}
        className={`fixed bottom-5 left-5 w-16 h-16 rounded-full ${theme.accentCyanBg} ${theme.buttonTextLight} flex items-center justify-center shadow-2xl z-50 transform hover:scale-110 transition-transform`}
        aria-label={t("smbStudioNav.toggleNavigation")}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <FiX className="w-8 h-8" />
            ) : (
              <FiMenu className="w-8 h-8" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
