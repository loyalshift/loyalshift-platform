'use client';

import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, value, label, index, suffix = "" }) => {
  const cardVariant = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { delay: index * 0.15, type: "spring", stiffness: 100, damping: 15 }
    }
  };
  const contentVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1, y: 0,
      transition: { delay: index * 0.15 + 0.2, duration: 0.4 }
    }
  };

  return (
    <motion.div
      className="bg-slate-800/70 p-6 rounded-xl shadow-lg shadow-indigo-950/40 border border-slate-700 flex flex-col items-center text-center backdrop-blur-sm"
      variants={cardVariant}
      whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2 } }}
    >
      <motion.div className="mb-3 text-4xl text-blue-400" variants={contentVariant}>
        {icon}
      </motion.div>
      <motion.p className="text-4xl font-bold text-white mb-1" variants={contentVariant}>
        {value}{suffix}
      </motion.p>
      <motion.p className="text-slate-400 text-sm" variants={contentVariant}>
        {label}
      </motion.p>
    </motion.div>
  );
};

export default StatCard;
