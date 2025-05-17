// src/components/ConfigurableModal.js
// A reusable, themeable modal component for various studio actions.

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";

// Default theme (neutral dark, can be overridden by props)
const defaultThemeColors = {
  modalOverlayBg: "bg-black/70",
  surface: "bg-slate-800",
  border: "border-slate-700",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  iconColor: "text-slate-400",
  closeButtonHoverBg: "hover:bg-slate-700",
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 200 },
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
};

const ConfigurableModal = ({
  isOpen,
  onClose,
  title,
  children,
  themeColors: customThemeColors,
  modalMaxWidth = "max-w-2xl", // Default max width
  titleIcon: TitleIcon,
}) => {
  const colors = { ...defaultThemeColors, ...customThemeColors };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 ${colors.modalOverlayBg} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close on overlay click
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full ${modalMaxWidth} rounded-xl shadow-2xl ${colors.surface} border ${colors.border} flex flex-col overflow-hidden`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            role="dialog"
            aria-modal="true"
            aria-labelledby="configurable-modal-title"
          >
            {/* Modal Header */}
            <div
              className={`flex items-center justify-between p-4 border-b ${colors.border}`}
            >
              <h3
                id="configurable-modal-title"
                className={`text-lg font-semibold ${colors.textPrimary} flex items-center gap-2`}
              >
                {TitleIcon && (
                  <TitleIcon
                    className={`w-5 h-5 ${
                      colors.iconColor || colors.textPrimary
                    }`}
                  />
                )}
                {title}
              </h3>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-full ${colors.closeButtonHoverBg} ${colors.textSecondary}`}
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content (Body) */}
            <div
              className={`p-6 overflow-y-auto max-h-[calc(80vh-100px)] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent`}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ConfigurableModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.node.isRequired,
  themeColors: PropTypes.shape({
    modalOverlayBg: PropTypes.string,
    surface: PropTypes.string,
    border: PropTypes.string,
    textPrimary: PropTypes.string,
    textSecondary: PropTypes.string,
    iconColor: PropTypes.string,
    closeButtonHoverBg: PropTypes.string,
  }),
  modalMaxWidth: PropTypes.string,
  titleIcon: PropTypes.elementType,
};

export default ConfigurableModal;
