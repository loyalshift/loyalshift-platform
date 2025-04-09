// src/components/FeatureCard.js (Simplified)

import React from 'react';
// Keep motion import only if using whileHover or other simple motion features
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiDatabase, FiZap, FiShield, FiBarChart2 } from 'react-icons/fi';

// Consistent colors (remain unchanged)
const colors = {
  surface: "bg-slate-800/70",
  border: "border-slate-700",
  borderAccent: "border-blue-500/40",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  accentBlue: "text-blue-400",
};

const iconMap = {
  FiDatabase: FiDatabase,
  FiZap: FiZap,
  FiShield: FiShield,
  FiBarChart2: FiBarChart2,
};

// --- Removed animation variants and viewport settings ---

const FeatureCard = ({ icon: iconName, title, description, index }) => { // index might still be useful for list keys
  const IconComponent = iconMap[iconName] || FiDatabase; // Default icon

  return (
    // Removed variants, initial, whileInView, viewport from the main card
    // Kept whileHover for subtle interaction - remove if not desired
    <motion.div
      className={`${colors.surface} p-8 rounded-xl shadow-2xl shadow-blue-950/40 border ${colors.border} hover:${colors.borderAccent} transition-colors duration-300 backdrop-blur-sm`}
      // OPTIONAL: Keep a simple hover effect. Remove this line for zero motion on hover.
      whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.2, type: 'spring', stiffness: 300 } }}
    >
      {/* Icon: Changed from motion.div to div, removed animation props */}
      <div
        className={`${colors.accentBlue} text-4xl mb-5 inline-block bg-blue-500/10 p-4 rounded-lg shadow-inner shadow-blue-900/50`}
        // Removed initial, whileInView, viewport, transition props
      >
        <IconComponent />
      </div>

      {/* Text Content (remains unchanged) */}
      <h3 className={`text-xl font-semibold ${colors.textPrimary} mb-2`}>{title}</h3>
      <p className={`${colors.textSecondary} leading-relaxed`}>{description}</p>
    </motion.div>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // Index is no longer needed for animation delays, but might be needed for React list keys
  // Make it optional if it's not strictly required for other purposes.
  index: PropTypes.number,
};

// Optional: Provide a default value if index is not always passed
// FeatureCard.defaultProps = {
//   index: 0,
// };

export default FeatureCard;
