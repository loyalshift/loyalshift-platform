// src/components/ClientHeroAnimation.js

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { FiLoader, FiTarget } from "react-icons/fi"; // Using FiTarget for final state

// --- Theme Colors (Consistent Dark Theme Style from Landing/Pricing) ---
const colors = {
  textWhite: "text-white",
  textSecondary: "text-slate-400",
  textHighlight: "text-blue-300", // Or text-cyan-400
  primaryMain: "text-primary-main", // Using primary text color for icon potentially
};

// --- Animation Variants ---
const cycleTextVariant = {
  hidden: { opacity: 0, filter: "blur(4px)", y: 15 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    y: -15,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const finalContentVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3, // Slight delay after loader disappears
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1], // Smoother ease
      staggerChildren: 0.1, // Stagger headline/subheadline
    },
  },
};

const fadeInUp = {
  // For staggering elements within final content
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * A reusable hero animation component displaying cycling text phases
 * followed by a final personalized message.
 */
const ClientHeroAnimation = ({
  clientName = "Valued Client", // Default client name
  animationPhases = [
    // Default animation phases
    "Analyzing Context...",
    "Mapping Opportunities...",
    "Tailoring Solution...",
  ],
  finalHeadline = `Modernization Strategy for ${clientName}`, // Default final headline
  finalSubheadline = "Preparing your personalized potential analysis.", // Default final subheadline
  phaseDuration = 2000, // Duration each animation phase is shown (ms)
  onComplete = () => {}, // Callback when the entire sequence finishes
}) => {
  const [animationState, setAnimationState] = useState("animating"); // 'animating', 'complete'
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  // Effect to cycle through animation phases
  useEffect(() => {
    if (animationState === "animating") {
      const totalAnimationTime = animationPhases.length * phaseDuration;

      // Timer to change the displayed text phase
      const phaseTimer = setInterval(() => {
        setCurrentPhaseIndex((prevIndex) => prevIndex + 1);
      }, phaseDuration);

      // Timer to mark the end of the animation cycle
      const completionTimer = setTimeout(() => {
        clearInterval(phaseTimer); // Stop changing text
        setAnimationState("complete"); // Transition to the final state
      }, totalAnimationTime);

      // Cleanup function
      return () => {
        clearInterval(phaseTimer);
        clearTimeout(completionTimer);
      };
    }
  }, [animationState, animationPhases.length, phaseDuration]);

  // Effect to call the onComplete callback *after* the final content has likely animated in
  useEffect(() => {
    if (animationState === "complete") {
      const completeTimer = setTimeout(() => {
        console.log("Client Hero Animation Sequence Complete.");
        onComplete();
      }, 1000); // Delay slightly after 'complete' state is set (adjust as needed)

      return () => clearTimeout(completeTimer);
    }
  }, [animationState, onComplete]);

  // Dynamically generate the current phase text to display
  const currentPhaseText =
    animationPhases[currentPhaseIndex % animationPhases.length];

  // Helper function to render headline with client name highlighted
  const renderFinalHeadline = () => {
    if (!finalHeadline.includes(clientName)) {
      return finalHeadline; // Return as is if clientName is not found
    }
    const parts = finalHeadline.split(clientName);
    return (
      <>
        {parts[0]}
        <span className={colors.textHighlight}>{clientName}</span>
        {parts[1]}
      </>
    );
  };

  return (
    // Container typically centered within the hero section
    <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px] px-4">
      {" "}
      {/* Ensure sufficient height */}
      <AnimatePresence mode="wait">
        {animationState === "animating" && (
          <motion.div
            key={currentPhaseIndex} // Key change triggers enter/exit
            variants={cycleTextVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center"
          >
            {/* Display the cycling text */}
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold ${colors.textWhite} mb-6`}
            >
              {currentPhaseText}
            </h1>
            {/* Loading Indicator */}
            <FiLoader
              className={`w-8 h-8 ${colors.textHighlight} animate-spin`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ClientHeroAnimation.propTypes = {
  /** The name of the client to personalize the final message */
  clientName: PropTypes.string,
  /** An array of strings for the text phases during the animation */
  animationPhases: PropTypes.arrayOf(PropTypes.string),
  /** The final headline text to display after the animation */
  finalHeadline: PropTypes.string,
  /** The final subheadline text to display after the animation */
  finalSubheadline: PropTypes.string,
  /** Duration (in ms) each animation phase text is displayed */
  phaseDuration: PropTypes.number,
  /** Function to call once the entire animation sequence (including final content fade-in) is complete */
  onComplete: PropTypes.func,
};

export default ClientHeroAnimation;
