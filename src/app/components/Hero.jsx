'use client';

import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import Button from "./Button";
import StyledOutlineButton from "./StyledOutlineButton";
import { useTranslation } from "../../i18n/useTranslation";

const HeroAnimation = lazy(() => import("./HeroAnimation"));
const MeshGradientBackground = lazy(() => import("./MeshGradientBackground"));

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
};

const sectionStagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const skewFadeInUp = { hidden: { opacity: 0, y: 40, skewY: 2 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } } };
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const cycleItemVariant = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } } };

export default function Hero() {
  const isMobile = useIsMobile();
  const [heroComplete, setHeroComplete] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (!heroComplete) return;
    const intervalId = setInterval(() => {
      setCurrentItemIndex((prev) => (prev + 1) % t.hero.items.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [heroComplete, t.hero.items.length]);

  return (
    <section className="relative h-screen min-h-[750px] md:min-h-[800px] overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 opacity-50" />}>
        <motion.div className="absolute inset-0 z-0">
          <MeshGradientBackground animate={!isMobile && !heroComplete} />
        </motion.div>
      </Suspense>

      {!heroComplete && (
        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center z-20"><div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>}>
          <HeroAnimation onComplete={() => setHeroComplete(true)} />
        </Suspense>
      )}

      <AnimatePresence>
        {heroComplete && (
          <motion.div className="relative h-full flex items-center justify-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0, delay: isMobile ? 0.1 : 0.2 }}>
            <div className="container px-4 sm:px-6 text-center">
              <motion.div initial="hidden" animate="visible" variants={sectionStagger} className="relative">
                <motion.div className="absolute -top-4 -left-4 w-3 h-3 rounded-full bg-cyan-400/30 hidden md:block" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} />
                <motion.div className="absolute -bottom-4 -right-4 w-4 h-4 rounded-full bg-blue-400/30 hidden md:block" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }} />

                <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight" variants={skewFadeInUp}>
                  {t.hero.title}{" "}
                  <motion.span
                    className="text-blue-300 inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {t.hero.titleHighlight}
                  </motion.span>
                </motion.h1>

                <motion.p className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto mb-6 md:mb-10" variants={skewFadeInUp}>
                  {isMobile
                    ? t.hero.subtitleMobile
                    : <>{t.hero.subtitle} <span className="text-white font-medium">{t.hero.subtitleBold}</span> {t.hero.subtitleEnd}</>
                  }
                </motion.p>

                <div className="flex items-center justify-center mb-10 md:mb-16 text-center min-h-[4.5rem] sm:min-h-[5rem]">
                  <AnimatePresence mode="wait">
                    <motion.div key={currentItemIndex} className="flex justify-center items-center p-4 px-6 sm:p-5 sm:px-8 rounded-xl shadow-lg bg-slate-800 border border-blue-500/40 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-center" variants={cycleItemVariant} initial="hidden" animate="visible" exit="exit">
                      <span className="text-slate-100 text-lg sm:text-xl md:text-2xl font-medium">{t.hero.items[currentItemIndex]}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={fadeInUp}>
                  <Button to="/contact" icon={<FiArrowRight />} size="lg" className="w-full sm:w-auto px-7 py-3.5 text-base bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-all duration-300 ease-out flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-cyan-500/40 transform hover:-translate-y-0.5">
                    {t.hero.ctaPrimary}
                  </Button>
                  <StyledOutlineButton to="/solutions">{t.hero.ctaSecondary}</StyledOutlineButton>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {heroComplete && (
          <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: 0.5, duration: 0.5 }}>
            <motion.div animate={{ y: [0, 8, 0], opacity: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
              <FiChevronDown className="text-white/70 text-3xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
