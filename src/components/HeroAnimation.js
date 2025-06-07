import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

// TODO: Ideally, import colors from a central config or ensure tailwind.config.js has them
const colors = {
  textWhite: "text-white",
  textSecondary: "text-slate-400",
  textHighlight: "text-blue-300",
  accentBlue: "text-blue-400", // Used for lines/highlights
};

// Component remains largely the same, just moved to its own file
const HeroAnimation = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);

    // Animation Variants (using local color object/classes for self-containment)
    const welcomeVariants = {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.3 } },
        exit: { opacity: 0, scale: 0.85, transition: { duration: 0.4, ease: [0.45, 0, 0.55, 1] } }
    };
    const lineVariants = (delay = 0) => ({
        initial: { scaleX: 0 },
        animate: { scaleX: 1, transition: { delay, duration: 1.0, ease: [0.65, 0, 0.35, 1], originX: 0 } } // Ensure origin is correct
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
    const valueTextVariants = {
        // Removed initial/animate from container, apply directly or via stagger
        animate: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
    };
    const wordVariants = {
        initial: { opacity: 0, y: 15, filter: "blur(5px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: 'easeOut' } }
    };

    // Animation Sequence Logic
    useEffect(() => {
        const sequence = [
            { phase: 0, duration: 3000 }, // Welcome message duration
            { phase: 1, duration: 4000 }  // Value prop duration
        ];
        let accumulatedDelay = 0;
        const timers = [];

        // Set timeouts to change phase
        for (let i = 0; i < sequence.length; i++) {
            if (i > 0) { // Skip setting timeout for the initial phase (phase 0)
                 const timer = setTimeout(() => {
                    setPhase(sequence[i].phase);
                 }, accumulatedDelay);
                 timers.push(timer);
            }
            accumulatedDelay += sequence[i].duration;
        }

        // Set final timeout to call onComplete after the last phase finishes
        const finalTimer = setTimeout(onComplete, accumulatedDelay);
        timers.push(finalTimer);

        // Cleanup function to clear all timeouts if the component unmounts
        return () => {
            timers.forEach((timer) => clearTimeout(timer));
        };
    }, [onComplete]); // Rerun effect only if onComplete changes (usually stable)


    return (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <AnimatePresence mode="wait">
                {phase === 0 && (
                    <motion.div
                        key="welcome"
                        variants={welcomeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="text-center w-full max-w-3xl px-4" // Added padding
                    >
                        <motion.div
                            variants={lineVariants(0)}
                            className={`h-1 mx-auto mb-6 md:mb-8 origin-left`} // Use origin-left
                            style={{ background: `linear-gradient(90deg, rgba(96,165,250,0), ${colors.accentBlue})` }} // Use color variable if possible
                        />
                        <motion.h1 variants={headingVariants} className={`text-4xl md:text-6xl font-bold ${colors.textWhite} mb-6 md:mb-8`}>
                            Welcome to <span className={colors.textHighlight}>LoyalShift</span>
                        </motion.h1>
                        {/* Use origin-right or adjust gradient for the bottom line */}
                         <motion.div
                            variants={lineVariants(0.7)} // Delay this line
                            className={`h-1 mx-auto mt-6 md:mt-8 origin-right`} // Use origin-right
                            style={{ background: `linear-gradient(270deg, rgba(96,165,250,0), ${colors.accentBlue})` }}
                        />
                    </motion.div>
                )}
                {phase === 1 && (
                    <motion.div
                        key="value-prop"
                        variants={valuePropContainerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="text-center max-w-2xl px-6"
                    >
                        <motion.p
                           variants={valueTextVariants}
                           initial="initial" // Apply initial/animate here for stagger
                           animate="animate"
                           className={`text-2xl md:text-3xl ${colors.textSecondary} leading-tight mb-4`}
                        >
                            {"Modernizing legacy systems with".split(" ").map((word, i) => (
                                <motion.span key={i} variants={wordVariants} className="inline-block mr-2">{word}</motion.span>
                            ))}
                        </motion.p>
                        <motion.h2
                            variants={valueTextVariants}
                            initial="initial" // Apply initial/animate here for stagger
                            animate="animate"
                            className={`text-3xl md:text-4xl font-bold ${colors.textWhite} mb-8`}
                        >
                            {"zero business disruption".split(" ").map((word, i) => (
                                <motion.span key={i + 10} variants={wordVariants} className="inline-block mr-2">{word}</motion.span> // Offset key
                            ))}
                        </motion.h2>
                        <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.9, duration: 0.8, ease: "easeOut"}}
                                className={`h-1 w-16 ${colors.accentBlue} mx-auto mb-4 origin-center`}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

HeroAnimation.propTypes = {
    onComplete: PropTypes.func.isRequired
};

export default HeroAnimation;
