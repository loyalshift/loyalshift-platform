// src/components/PersonalizedDemoIntroAnimation.js
// Displays a refined, professional introductory animation sequence.
// Focuses on clean text and icon transitions without excessive effects.

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
// Icons remain the same as the last content update
import { FiShare2, FiMap, FiPlayCircle } from 'react-icons/fi';

// --- Theme Colors (Consistent with PersonalizedDemoPage) ---
const colors = {
  textHeading: "text-neutral-dark",
  textBody: "text-neutral-main", // Used if adding subtitle later
  textPrimary: "text-primary-main",
  iconBg: "bg-primary-main/10", // Slightly more prominent icon background
  iconBorder: "border-primary-main/20",
};

// --- Animation Variants (Simplified) ---

// Variant for the container of each step (icon + text)
const stepContainerVariant = {
    hidden: { opacity: 0 }, // Simple fade
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            // Stagger children slightly if needed, but keep it subtle
            staggerChildren: 0.1,
        }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } } // Simple fade out
};

// Variant for the icon's appearance/disappearance (simple scale/fade)
const iconVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 18, stiffness: 150 } // Slightly tighter spring
  },
  // Exit is handled by the parent stepContainerVariant exit
};

// Variant for the text animating in/out (subtle slide + fade)
const textVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  // Exit is handled by the parent stepContainerVariant exit
};


// --- Animation Data ---
// Adjusted durations for a slightly quicker, professional feel
const animationSteps = [
  { text: "Connecting to your context...", icon: FiShare2, duration: 1800 }, // ms
  { text: "Mapping modernization potential...", icon: FiMap, duration: 1800 },
  { text: "Your personalized preview is loading...", icon: FiPlayCircle, duration: 2000 },
];


/**
 * Renders the updated animated sequence with a professional aesthetic.
 * Calls the onComplete prop function when the sequence finishes.
 * @param {object} props - Component props.
 * @param {function} props.onComplete - Function to call when the animation sequence is done.
 */
function PersonalizedDemoIntroAnimation({ onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Timer logic remains the same - cycles through steps
    const currentDuration = animationSteps[currentStepIndex].duration;
    const timer = setTimeout(() => {
      if (currentStepIndex < animationSteps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      } else {
        // Last step's duration has passed
        console.log("Professional animation sequence finished.");
        if (onComplete) {
          onComplete();
        }
      }
    }, currentDuration);

    // Cleanup timer on component unmount or step change
    return () => clearTimeout(timer);
  }, [currentStepIndex, onComplete]); // Dependencies

  const currentStep = animationSteps[currentStepIndex];
  const IconComponent = currentStep.icon;

  return (
    // Container centers content vertically and horizontally
    <div className="flex flex-col items-center justify-center text-center min-h-[400px] p-4">
      {/* AnimatePresence handles the smooth transition between steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex} // Key change triggers enter/exit animations
          className="flex flex-col items-center"
          variants={stepContainerVariant} // Simple fade for the container
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Icon Container - Simplified styling */}
          <motion.div
            className={`relative z-10 p-5 mb-5 rounded-full ${colors.iconBg} border ${colors.iconBorder}`} // Slightly larger padding
            variants={iconVariant} // Apply icon-specific enter animation (staggered by parent)
            // Removed continuous pulse animation
          >
            {/* Render the correct icon for the current step */}
            <IconComponent className={`w-10 h-10 ${colors.textPrimary}`} /> {/* Slightly smaller icon */}
          </motion.div>

          {/* Animated Text Container */}
          <motion.h2
            className={`text-2xl md:text-3xl font-medium ${colors.textHeading}`} // Slightly reduced font weight
            variants={textVariant} // Animate the text block as a whole
            // initial/animate/exit are handled by the parent staggering/AnimatePresence
          >
            {/* Display the text directly */}
            {currentStep.text}
          </motion.h2>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// PropTypes for type checking
PersonalizedDemoIntroAnimation.propTypes = {
  /** Function to call when the animation sequence completes */
  onComplete: PropTypes.func.isRequired,
};

export default PersonalizedDemoIntroAnimation;
