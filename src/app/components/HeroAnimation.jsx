'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../i18n/useTranslation';

const HeroAnimation = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const { t } = useTranslation();

  const welcomeVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.3 } },
    exit: { opacity: 0, scale: 0.85, transition: { duration: 0.4, ease: [0.45, 0, 0.55, 1] } }
  };
  const lineVariants = (delay = 0) => ({
    initial: { scaleX: 0 },
    animate: { scaleX: 1, transition: { delay, duration: 1.0, ease: [0.65, 0, 0.35, 1], originX: 0 } }
  });
  const headingVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 1.0, ease: [0.22, 1, 0.36, 1] } }
  };
  const valuePropContainerVariants = {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring", damping: 18, stiffness: 100, delay: 0.2 } },
    exit: { opacity: 0, filter: "blur(10px)", y: -20, transition: { duration: 0.5, ease: [0.45, 0, 0.55, 1] } }
  };
  const valueTextVariants = { animate: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } };
  const wordVariants = {
    initial: { opacity: 0, y: 15, filter: "blur(5px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: 'easeOut' } }
  };

  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setPhase(1), 3000));
    timers.push(setTimeout(onComplete, 7000));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="welcome" variants={welcomeVariants} initial="initial" animate="animate" exit="exit" className="text-center w-full max-w-3xl px-4">
            <motion.div variants={lineVariants(0)} className="h-1 mx-auto mb-6 md:mb-8 origin-left" style={{ background: `linear-gradient(90deg, rgba(96,165,250,0), #60a5fa)` }} />
            <motion.h1 variants={headingVariants} className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8">
              {t.heroAnimation.welcomeTo} <span className="text-blue-300">{t.heroAnimation.brand}</span>
            </motion.h1>
            <motion.div variants={lineVariants(0.7)} className="h-1 mx-auto mt-6 md:mt-8 origin-right" style={{ background: `linear-gradient(270deg, rgba(96,165,250,0), #60a5fa)` }} />
          </motion.div>
        )}
        {phase === 1 && (
          <motion.div key="value-prop" variants={valuePropContainerVariants} initial="initial" animate="animate" exit="exit" className="text-center max-w-2xl px-6">
            <motion.p variants={valueTextVariants} initial="initial" animate="animate" className="text-2xl md:text-3xl text-slate-400 leading-tight mb-4">
              {t.heroAnimation.phase1Line1.split(" ").map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-2">{word}</motion.span>
              ))}
            </motion.p>
            <motion.h2 variants={valueTextVariants} initial="initial" animate="animate" className="text-3xl md:text-4xl font-bold text-white mb-8">
              {t.heroAnimation.phase1Line2.split(" ").map((word, i) => (
                <motion.span key={i + 10} variants={wordVariants} className="inline-block mr-2">{word}</motion.span>
              ))}
            </motion.h2>
            <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }} className="h-1 w-16 bg-blue-400 mx-auto mb-4 origin-center" />
              <p className="text-blue-300 text-lg opacity-80">{t.heroAnimation.tagline}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroAnimation;
