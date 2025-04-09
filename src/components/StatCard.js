import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// TODO: Ideally, import colors from a central config or ensure tailwind.config.js has them
const colors = {
  surface: "bg-slate-800/70", // Example, adjust if needed
  border: "border-slate-700",
  textWhite: "text-white",
  textSecondary: "text-slate-400",
  accentBlue: "text-blue-400",
};

const StatCard = ({ icon, value, label, index, suffix = "" }) => {
  // Animation variants for the card and its content
  const cardVariant = {
      hidden: { opacity: 0, scale: 0.8, y: 50 },
      visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { delay: index * 0.15, type: "spring", stiffness: 100, damping: 15 }
      }
  };
  const contentVariant = {
      hidden: { opacity: 0, y: 10 },
      visible: {
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.15 + 0.2, duration: 0.4 } // Content fades in slightly after card
      }
  };

  return (
    <motion.div
      // Use direct classes matching the original LandingPage for self-containment
      className={`${colors.surface} p-6 rounded-xl shadow-lg shadow-indigo-950/40 border ${colors.border} flex flex-col items-center text-center backdrop-blur-sm`}
      variants={cardVariant}
      // initial="hidden" // Let parent container handle initial/whileInView
      // whileInView="visible" // Let parent container handle initial/whileInView
      // viewport={{ once: true, amount: 0.5 }} // Let parent handle viewport
      whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2 } }} // Hover effect
    >
      {/* Icon */}
      <motion.div className={`mb-3 text-4xl ${colors.accentBlue}`} variants={contentVariant}>
        {/* Icon is passed directly as a node */}
        {icon}
      </motion.div>
      {/* Value */}
      <motion.p className={`text-4xl font-bold ${colors.textWhite} mb-1`} variants={contentVariant}>
        {value}{suffix}
      </motion.p>
      {/* Label */}
      <motion.p className={`${colors.textSecondary} text-sm`} variants={contentVariant}>
        {label}
      </motion.p>
    </motion.div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.node.isRequired, // Expecting a React node (e.g., <FiIcon />)
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  suffix: PropTypes.string
};

export default StatCard;
