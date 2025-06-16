// src/components/Financial/FloatingItemsBackground.js
// OLDER VERSION: This version used fixed positioning with -z-10.
// It might have visibility issues depending on the parent page's stacking context.
// Background animation with floating dots and FINANCIAL logos.
// Uses Green/White/Grey Theme associated with FINANCIAL.

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Theme Colors (Adjust as needed or import from central theme)
const colors = {
  gradientFrom: "from-slate-50", // Match the page's light theme base
  gradientTo: "to-emerald-50",
  dotColor: "rgba(22, 163, 74, 0.3)", // Emerald-600 at 30% opacity
  // No logo placeholder colors needed as the SVG is used
};

// Configuration (Adjust numbers as desired)
const NUM_DOTS = 75;
const NUM_LOGOS = 10;
const MIN_DOT_SIZE = 3;
const MAX_DOT_SIZE = 7;
const MIN_LOGO_SIZE = 20;
const MAX_LOGO_SIZE = 35;
const MIN_DURATION = 15; // seconds
const MAX_DURATION = 30; // seconds
const MAX_DELAY = 10; // seconds

// --- Helper Function to generate random parameters ---
function generateItemParams(minSize, maxSize) {
  const size = minSize + Math.random() * (maxSize - minSize);
  return {
    x: Math.random() * 100, // Initial horizontal position (%)
    y: Math.random() * 100, // Initial vertical position (%)
    size: size,
    opacity: 0.3 + Math.random() * 0.4, // Opacity range (30% - 70%)
    duration: MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION),
    delay: Math.random() * MAX_DELAY,
    // Random movement extents (percentage of container)
    moveX: (Math.random() - 0.5) * 10, // +/- 5% horizontal drift
    moveY: (Math.random() - 0.5) * 15, // +/- 7.5% vertical drift
    rotate: (Math.random() - 0.5) * 30, // +/- 15deg rotation
  };
}

// --- Main Component ---
const FloatingItemsBackground = () => {
  const [dots, setDots] = useState([]);
  const [logos, setLogos] = useState([]);

  // Generate item parameters on component mount
  useEffect(() => {
    const generatedDots = Array.from({ length: NUM_DOTS }, (_, i) => ({
      id: `dot-${i}`,
      ...generateItemParams(MIN_DOT_SIZE, MAX_DOT_SIZE),
    }));
    const generatedLogos = Array.from({ length: NUM_LOGOS }, (_, i) => ({
      id: `logo-${i}`,
      ...generateItemParams(MIN_LOGO_SIZE, MAX_LOGO_SIZE),
    }));
    setDots(generatedDots);
    setLogos(generatedLogos);
  }, []); // Empty dependency array ensures this runs only once

  return (
    // *** This version used fixed inset-0 -z-10 ***
    // This might cause layering issues if content isn't properly zoned above it.
    <motion.div
      className={`-z-1 overflow-hidden pointer-events-none bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      aria-hidden="true"
    >
      {/* Render Dots */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            backgroundColor: colors.dotColor,
          }}
          animate={{
            x: [`0%`, `${dot.moveX}%`, `0%`],
            y: [`0%`, `${dot.moveY}%`, `0%`],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Render Logos */}
      {logos.map((logo) => (
        <motion.div
          key={logo.id}
          className={`absolute rounded flex items-center justify-center filter drop-shadow-sm`} // Drop shadow for visibility
          style={{
            left: `${logo.x}%`,
            top: `${logo.y}%`,
            width: `${logo.size}px`,
            height: `${logo.size}px`,
            opacity: logo.opacity, // Control overall opacity
          }}
          animate={{
            x: [`0%`, `${logo.moveX}%`, `0%`],
            y: [`0%`, `${logo.moveY}%`, `0%`],
            rotate: [0, logo.rotate, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: logo.duration * 1.2, // Slightly different speed
            delay: logo.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          {/* Use an img tag with the imported URL */}
          <img
            src={"/images/financial.png"} // Use the imported URL path
            alt="" // Decorative, alt text not needed
            className="w-full h-full object-contain" // Fill container, maintain aspect ratio
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

FloatingItemsBackground.propTypes = {
  // No props currently defined
};

export default FloatingItemsBackground;
