// src/components/Header.js

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { FiArrowRight, FiPhone, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import Logo from "./Logo";

/**
 * Header component with scroll-based style changes and animations.
 * Can be forced into a dark state via the `forceDark` prop.
 */
export default function Header({ forceDark = false }) {
  // Accept forceDark prop
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const { scrollY } = useScroll();

  const SCROLL_THRESHOLD = 50;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentlyScrolled = latest > SCROLL_THRESHOLD;
    if (currentlyScrolled !== isScrolled) {
      setIsScrolled(currentlyScrolled);
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    // Added About link
    { name: "About Us", path: "/about" },
    { name: "Solutions", path: "/solutions" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Careers", path: "/careers" },
    { name: "Pricing", path: "/pricing" }, 
    // { name: "Resources", path: "/resources" }, // Keep or remove as needed
  ];

  // Determine if the dark/scrolled appearance should be used
  const useDarkAppearance = forceDark || isScrolled;

  // --- Framer Motion Variants for Header Styling ---
  // Using existing variants, the logic change is in the 'animate' prop below
  const headerVariants = {
    initialState: {
      y: -100,
      backgroundColor: "rgba(15, 23, 42, 0)", // slate-900 transparent
      backdropFilter: "blur(0px)",
      boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0)",
      borderColor: "rgba(30, 41, 59, 0)", // transparent slate-800
      borderBottomWidth: "1px",
    },
    top: {
      // State for top of page (transparent) - only used if NOT forceDark
      y: 0,
      backgroundColor: "rgba(15, 23, 42, 0)", // slate-900 transparent
      backdropFilter: "blur(0px)",
      boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0)",
      borderColor: "rgba(30, 41, 59, 0)", // transparent slate-800
      borderBottomWidth: "1px",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    scrolled: {
      // State for scrolled OR forced dark
      y: 0,
      backgroundColor: "rgba(15, 23, 42, 0.95)", // slate-900 with 95% opacity
      backdropFilter: "blur(12px)", // md blur
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // shadow-lg
      borderColor: "rgba(30, 41, 59, 1)", // slate-800 opaque
      borderBottomWidth: "1px",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const headerTransition = {
    y: { type: "spring", damping: 25, stiffness: 300 },
    default: { duration: 0.3, ease: "easeOut" },
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 w-full z-50 border-b"
        variants={headerVariants}
        initial="initialState"
        // UPDATED: Animate logic checks forceDark OR isScrolled
        animate={useDarkAppearance ? "scrolled" : "top"}
        transition={headerTransition}
      >
        {/* Max width container */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            // UPDATED: Logo scale animation now depends on useDarkAppearance
            animate={{
              scale: useDarkAppearance ? 1 : 1.1, // Smaller scale when dark
              transition: { type: "spring", duration: 0.4, delay: 0.1 },
            }}
            className="origin-left flex-shrink-0 flex"
          >
            {/* UPDATED: Pass lightMode based on the dark appearance state */}
            <Logo lightMode={!useDarkAppearance} size="text-2xl" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                // UPDATED: Text color logic uses useDarkAppearance
                className={`font-medium transition-colors duration-200 ${
                  useDarkAppearance
                    ? "text-slate-300 hover:text-blue-400" // Dark state colors
                    : "text-white hover:text-blue-300" // Top/Transparent state colors
                }`}
              >
                <Link to={link.path}>{link.name}</Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <motion.div
            // UPDATED: CTA animation uses useDarkAppearance
            animate={{
              scale: useDarkAppearance ? 1 : 0.95,
              opacity: useDarkAppearance ? 1 : 0.9,
              transition: { type: "tween", duration: 0.3 },
            }}
            className="hidden lg:flex items-center gap-4 origin-right flex-shrink-0"
          >
            {/* Contact Link */}
            <Link
              to="/contact"
              // UPDATED: Contact link text color uses useDarkAppearance
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                useDarkAppearance
                  ? "text-blue-400 hover:text-blue-300" // Dark state colors
                  : "text-white/80 hover:text-white" // Top/Transparent state colors
              }`}
            >
              <FiPhone className="mr-2 h-4 w-4" /> Contact
            </Link>

            {/* Demo Link */}
            <Link
              to="/demo"
              // UPDATED: Demo button style uses useDarkAppearance
              className={`flex items-center px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                useDarkAppearance
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/30" // Dark state style
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" // Top/Transparent state style
              }`}
            >
              Watch Demo <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            // UPDATED: Mobile menu button icon color uses useDarkAppearance
            className={`lg:hidden p-2 transition-colors duration-200 ${
              useDarkAppearance ? "text-slate-300" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            // UPDATED: Mobile menu background uses useDarkAppearance
            className={`fixed top-[68px] left-0 right-0 z-40 border-b border-slate-700 lg:hidden ${
              useDarkAppearance
                ? "bg-slate-900"
                : "bg-slate-900/95 backdrop-blur-md" // Use solid dark if header is forced dark
            } shadow-xl`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Inner padding and structure */}
            <div className="px-6 pt-4 pb-6 flex flex-col space-y-6">
              {/* Mobile Nav Links */}
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, ease: "easeOut" }}
                >
                  <Link
                    to={link.path}
                    className="block text-slate-300 hover:text-white text-lg font-medium py-2 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Separator and Mobile CTAs */}
              <div className="pt-6 border-t border-slate-700/50 flex flex-col space-y-4">
                {/* Mobile Contact CTA */}
                <Link
                  to="/contact"
                  className="flex items-center justify-center px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiPhone className="mr-2 h-4 w-4" /> Contact
                </Link>

                {/* Mobile Demo CTA */}
                <Link
                  to="/demo"
                  className="flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:shadow-md transition-shadow duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Watch Demo <FiArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Added PropTypes validation
Header.propTypes = {
  forceDark: PropTypes.bool,
};
