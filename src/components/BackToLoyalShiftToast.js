// src/components/BackToLoyalShiftToast.js
// UPDATED: Added light/dark theme support via 'theme' prop.
// UPDATED: Switched SVG import to standard <img> tag method.
// Floating element in bottom-left asking user if they want to return to main LoyalShift site.

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FiX, FiCheck, FiLogOut, FiAlertTriangle } from "react-icons/fi";

// --- Standard SVG Import (CRA v5+) ---
import loyalShiftLogoUrl from "../logo.svg"; // Adjust path as needed!

// Reusable Button (ensure path is correct)
// import Button from './Button'; // Using standard buttons here for simplicity

// --- Theme Colors ---
const lightThemeColors = {
  background: "bg-white",
  textPrimary: "text-slate-700",
  textSecondary: "text-slate-500",
  border: "border-slate-300",
  overlayBg: "bg-black/50", // Slightly lighter overlay for light theme
  confirmButtonBg: "bg-blue-600",
  confirmButtonHoverBg: "hover:bg-blue-700",
  cancelButtonBg: "bg-slate-200",
  cancelButtonHoverBg: "hover:bg-slate-300",
  textOnDarkButton: "text-white",
  textOnLightButton: "text-slate-800", // Text for light cancel button
  closeHoverBg: "hover:bg-slate-100",
  alertIcon: "text-yellow-500",
};

const darkThemeColors = {
  background: "bg-slate-800",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  border: "border-slate-700",
  overlayBg: "bg-black/60",
  confirmButtonBg: "bg-blue-600",
  confirmButtonHoverBg: "hover:bg-blue-700",
  cancelButtonBg: "bg-slate-600",
  cancelButtonHoverBg: "hover:bg-slate-700",
  textOnDarkButton: "text-white",
  textOnLightButton: "text-white", // Text is white on dark cancel button too
  closeHoverBg: "hover:bg-slate-700",
  alertIcon: "text-yellow-400", // Slightly brighter yellow for dark theme
};

// --- Animation Variants --- (Remain the same)
const toastVariants = {
  /* ... */
};
const modalOverlayVariants = {
  /* ... */
};
const modalContentVariants = {
  /* ... */
};

// --- Main Component ---
const BackToLoyalShiftToast = ({ targetUrl = "/", theme = "dark" }) => {
  // Default theme is dark
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Select colors based on theme prop
  const colors = theme === "light" ? lightThemeColors : darkThemeColors;

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleConfirmNavigation = () => {
    console.log(`Navigating back to LoyalShift main site: ${targetUrl}`);
    closeDialog();
    setTimeout(() => navigate(targetUrl), 50);
  };

  return (
    <>
      {/* Floating Toaster Element */}
      <motion.div
        // Apply dynamic theme classes
        className={`fixed bottom-5 left-5 z-40 flex items-center gap-3 p-3 rounded-lg shadow-lg ${colors.background} border ${colors.border} cursor-pointer`}
        variants={toastVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={openDialog}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && openDialog()}
        aria-haspopup="dialog"
        aria-expanded={isDialogOpen}
        aria-label="Volver a LoyalShift"
      >
        {/* Use standard img tag for logo */}
        <img
          src={loyalShiftLogoUrl}
          alt="LoyalShift Logo"
          className="w-6 h-6 flex-shrink-0" // Adjust size as needed
        />
        <span
          className={`hidden sm:inline text-sm font-medium ${colors.textPrimary}`}
        >
          Volver a LoyalShift
        </span>
        <FiLogOut
          className={`w-4 h-4 ${colors.textSecondary} ml-auto sm:ml-1`}
        />
      </motion.div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            key="overlay"
            // Apply dynamic overlay background
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${colors.overlayBg} backdrop-blur-sm`}
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeDialog}
          >
            <motion.div
              key="dialog"
              // Apply dynamic theme classes
              className={`relative w-full max-w-sm rounded-lg shadow-xl p-6 ${colors.background} border ${colors.border}`}
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              aria-describedby="dialog-description"
            >
              {/* Icon and Title */}
              <div className="flex items-center justify-center mb-4 text-center">
                <FiAlertTriangle
                  className={`w-10 h-10 ${colors.alertIcon} mr-3`}
                />
                <h2
                  id="dialog-title"
                  className={`text-lg font-semibold ${colors.textPrimary}`}
                >
                  Confirmar Navegación
                </h2>
              </div>

              {/* Description */}
              <p
                id="dialog-description"
                className={`${colors.textSecondary} text-center text-sm mb-6`}
              >
                ¿Seguro que desea salir y volver al sitio principal de
                LoyalShift?
              </p>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={closeDialog}
                  // Apply dynamic theme classes
                  className={`px-4 py-2 rounded text-sm font-medium ${
                    colors.cancelButtonBg
                  } ${
                    theme === "light"
                      ? colors.textOnLightButton
                      : colors.textOnDarkButton
                  } ${colors.cancelButtonHoverBg} transition-colors`}
                  aria-label="Cancelar"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmNavigation}
                  // Apply dynamic theme classes
                  className={`px-4 py-2 rounded text-sm font-medium ${colors.confirmButtonBg} ${colors.textOnDarkButton} ${colors.confirmButtonHoverBg} transition-colors flex items-center gap-1.5`}
                  aria-label="Confirmar navegación a LoyalShift"
                >
                  <FiCheck className="w-4 h-4" /> Confirmar
                </button>
              </div>
              {/* Optional Close Button */}
              <button
                onClick={closeDialog}
                // Apply dynamic theme classes
                className={`absolute top-2 right-2 p-1 rounded-full ${colors.textSecondary} ${colors.closeHoverBg} transition-colors`}
                aria-label="Cerrar diálogo"
              >
                <FiX className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

BackToLoyalShiftToast.propTypes = {
  /** The URL to navigate back to (defaults to "/") */
  targetUrl: PropTypes.string,
  /** The visual theme ('light' or 'dark') */
  theme: PropTypes.oneOf(["light", "dark"]),
};

export default BackToLoyalShiftToast;
