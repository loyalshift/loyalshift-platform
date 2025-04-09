// src/components/marketing-animations/XaiTrustAnimation.js
import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const pathDrawVariants = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: delay,
      duration: 1.0, // Slower drawing for clarity
      ease: "easeInOut",
    },
  },
});

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: delay, duration: 0.6 },
  },
});

const boxTransformVariants = {
  hidden: { opacity: 1, fill: "#212529" }, // Start opaque (like neutral-darker)
  visible: {
    // State after 'explainability' happens
    opacity: 0.6,
    fill: "#495057", // Lighter fill (like neutral-main/darker grey)
    transition: { delay: 1.8, duration: 0.8 }, // Make transparent after lines arrive and eye appears
  },
};

const eyePulseVariants = {
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

const XaiTrustAnimation = ({ primaryColor = "#4682B4", duration = 8 }) => {
  // Duration prop currently unused, but available for future timing logic

  return (
    <motion.svg
      viewBox="0 0 200 150" // Adjusted viewBox for this schematic
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="img"
      aria-labelledby="xai-title xai-desc"
    >
      <title id="xai-title">Explainable AI Animation</title>
      <desc id="xai-desc">
        Animation showing data lines entering a black box (Flight Data Recorder
        metaphor), an LoyalShift icon appearing, the box becoming
        semi-transparent, and clear data lines exiting. maintaining format.
      </desc>

      {/* 1. Example */}
      <motion.path
        d="M 10 50 C 30 50, 40 55, 60 60" // Curved input line
        stroke={primaryColor}
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
        variants={pathDrawVariants(0.2)}
      />
    </motion.svg>
  );
};

XaiTrustAnimation.propTypes = {
  primaryColor: PropTypes.string,
  duration: PropTypes.number, // Although unused currently, keep for potential future use
};

export default XaiTrustAnimation;
