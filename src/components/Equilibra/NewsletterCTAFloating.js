// src/components/Equilibra/NewsletterCtaFloating.js
// Floating Call to Action for newsletter subscription for Equilibra CR.
// Uses the new Equilibra CR color palette.
// Current time: Friday, May 16, 2025 at 3:40 PM CST.

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiMail,
  FiSend,
  FiX,
  FiCheckCircle,
  FiLoader,
  FiBell,
} from "react-icons/fi";
import toast from "react-hot-toast"; // Assuming Toaster is globally available or added to layout
import InputField from "../InputField";
import Button from "../Button";

// --- Equilibra CR New Color Palette ---
const colors = {
  surface: "bg-white",
  textPrimary: "text-[#5C5C5C]", // Typography – Warm Gray
  textSecondary: "text-[#A89C94]", // Complementary – Muted Taupe
  textHighlight: "text-[#E86F51]", // Accent Color – Coral Red
  accentCoralBg: "bg-[#E86F51]",
  accentCoralBgHover: "hover:bg-[#d95f41]",
  buttonTextLight: "text-white",
  border: "border-[#A89C94]/40", // Muted Taupe for main borders
  borderLight: "border-[#F7C6B7]/60", // Secondary Color (Blush Pink) for lighter borders
  inputBg: "bg-white",
  inputBorder: "border-[#A89C94]/60",
  inputFocusBorder: "focus:border-[#E86F51]",
  inputFocusRing: "focus:ring-[#E86F51]/50",
  success: "text-emerald-600",
  errorText: "text-red-700",
};

const ctaVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 20, delay: 1 },
  }, // Delay initial appearance
  exit: { opacity: 0, y: 30, scale: 0.9, transition: { duration: 0.2 } },
};

const panelVariants = {
  collapsed: {
    height: "56px",
    width: "56px",
    borderRadius: "9999px",
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  expanded: {
    height: "auto",
    width: "320px",
    borderRadius: "12px",
    transition: { type: "spring", stiffness: 200, damping: 20 },
  }, // md:w-80
};

const contentVariants = {
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  visible: { opacity: 1, transition: { delay: 0.2, duration: 0.3 } },
};

const NewsletterCtaFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ctaRef = useRef(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    setIsSubmitting(true);
    const toastId = toast.loading("Suscribiéndote...");
    console.log("Newsletter Subscription for Equilibra CR:", email);
    // Simulate API Call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("¡Gracias por suscribirte al boletín de Equilibra CR!", {
        id: toastId,
        duration: 4000,
      });
      setEmail("");
      setIsOpen(false); // Optionally close on success
    } catch (error) {
      toast.error("Hubo un error al suscribirte. Intenta de nuevo.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (ctaRef.current && !ctaRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      // Only add listener if panel is open
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <motion.div
      ref={ctaRef}
      variants={ctaVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 shadow-xl border ${
        isOpen ? colors.border : "border-transparent"
      }`}
      style={{ borderRadius: isOpen ? "12px" : "9999px" }} // Ensure border radius animates with panel
    >
      <motion.div
        layout // Animate layout changes between collapsed and expanded
        variants={panelVariants}
        initial={false} // Don't run initial animation for this inner div
        animate={isOpen ? "expanded" : "collapsed"}
        className={`${
          isOpen ? colors.surface : colors.accentCoralBg
        } overflow-hidden`}
      >
        {/* Collapsed State: Icon Button */}
        {!isOpen && (
          <button
            onClick={toggleOpen}
            className={`w-14 h-14 flex items-center justify-center ${colors.buttonTextLight} focus:outline-none`}
            aria-label="Abrir suscripción al boletín"
          >
            <FiBell className="w-6 h-6" />
          </button>
        )}

        {/* Expanded State: Form Content */}
        {isOpen && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden" // Content should fade out quickly as panel collapses
            className="p-5"
          >
            <div className="flex justify-between items-center mb-3">
              <h3
                className={`text-md font-semibold ${colors.textPrimary} flex items-center`}
              >
                <FiMail className={`mr-2 ${colors.iconColor}`} />
                Únete a Nuestro Boletín
              </h3>
              <button
                onClick={toggleOpen}
                className={`p-1 rounded-full hover:bg-stone-100 ${colors.textSecondary}`}
                aria-label="Cerrar suscripción"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
            <p className={`text-xs ${colors.textSecondary} mb-4`}>
              Recibe consejos, recetas y novedades sobre nutrición consciente y
              bienestar directamente en tu correo.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <InputField
                id="newsletterEmail"
                name="newsletterEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                themeColors={colors} // Pass theme for consistent InputField styling
                className="text-sm"
              />
              <Button
                type="submit"
                variant="custom"
                size="base" // Smaller button for CTA
                disabled={isSubmitting}
                icon={
                  isSubmitting ? (
                    <FiLoader className="animate-spin w-4 h-4" />
                  ) : (
                    <FiSend className="w-4 h-4" />
                  )
                }
                className={`w-full !py-2 text-sm ${colors.accentCoralBg} ${
                  colors.buttonTextLight
                } ${colors.accentCoralBgHover} ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Enviando..." : "Suscribirme"}
              </Button>
            </form>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

NewsletterCtaFloating.propTypes = {
  // No props currently defined
};

export default NewsletterCtaFloating;
