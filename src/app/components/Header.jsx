'use client';

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "../../i18n/useTranslation";

export default function Header({ forceDark = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { t } = useTranslation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentlyScrolled = latest > 50;
    if (currentlyScrolled !== isScrolled) {
      setIsScrolled(currentlyScrolled);
    }
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t.nav.about, path: "/about" },
    { name: t.nav.solutions, path: "/solutions" },
    { name: t.nav.caseStudies, path: "/case-studies" },
  ];

  const useDarkAppearance = forceDark || isScrolled;

  const headerVariants = {
    initialState: {
      y: -100, backgroundColor: "rgba(15, 23, 42, 0)", backdropFilter: "blur(0px)",
      boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0)", borderColor: "rgba(30, 41, 59, 0)", borderBottomWidth: "1px",
    },
    top: {
      y: 0, backgroundColor: "rgba(15, 23, 42, 0)", backdropFilter: "blur(0px)",
      boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0)", borderColor: "rgba(30, 41, 59, 0)", borderBottomWidth: "1px",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    scrolled: {
      y: 0, backgroundColor: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(12px)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      borderColor: "rgba(30, 41, 59, 1)", borderBottomWidth: "1px",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 w-full z-50 border-b"
        variants={headerVariants}
        initial="initialState"
        animate={useDarkAppearance ? "scrolled" : "top"}
        transition={{ y: { type: "spring", damping: 25, stiffness: 300 }, default: { duration: 0.3, ease: "easeOut" } }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            animate={{ scale: useDarkAppearance ? 1 : 1.1, transition: { type: "spring", duration: 0.4, delay: 0.1 } }}
            className="origin-left flex-shrink-0 flex"
          >
            <Logo />
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`font-medium transition-colors duration-200 ${useDarkAppearance ? "text-slate-300 hover:text-blue-400" : "text-white hover:text-blue-300"}`}
              >
                <Link href={link.path}>{link.name}</Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            animate={{ scale: useDarkAppearance ? 1 : 0.95, opacity: useDarkAppearance ? 1 : 0.9, transition: { type: "tween", duration: 0.3 } }}
            className="hidden lg:flex items-center gap-3 origin-right flex-shrink-0"
          >
            <LanguageToggle className={useDarkAppearance ? "text-slate-300 hover:text-blue-400" : "text-white/80 hover:text-white"} />
            <Link
              href="/contact"
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${useDarkAppearance ? "text-blue-400 hover:text-blue-300" : "text-white/80 hover:text-white"}`}
            >
              <FiPhone className="mr-2 h-4 w-4" /> {t.nav.contact}
            </Link>
          </motion.div>

          <button
            className={`lg:hidden p-2 transition-colors duration-200 ${useDarkAppearance ? "text-slate-300" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-[68px] left-0 right-0 z-40 border-b border-slate-700 lg:hidden bg-slate-900/95 backdrop-blur-md shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="px-6 pt-4 pb-6 flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <motion.div key={index} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.05, ease: "easeOut" }}>
                  <Link href={link.path} className="block text-slate-300 hover:text-white text-lg font-medium py-2 transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-6 border-t border-slate-700/50 flex flex-col space-y-4">
                <div className="flex justify-center">
                  <LanguageToggle className="text-slate-300" />
                </div>
                <Link href="/contact" className="flex items-center justify-center px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                  <FiPhone className="mr-2 h-4 w-4" /> {t.nav.contact}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
