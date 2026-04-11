'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiDatabase, FiZap, FiShield, FiBarChart2, FiLayout, FiSearch, FiSettings, FiTool, FiTarget, FiMonitor, FiCode, FiTrendingUp, FiGlobe, FiLayers } from 'react-icons/fi';

const iconMap = {
  FiDatabase, FiZap, FiShield, FiBarChart2, FiLayout, FiSearch,
  FiSettings, FiTool, FiTarget, FiMonitor, FiCode, FiTrendingUp,
  FiGlobe, FiLayers,
};

const FeatureCard = ({ icon: iconName, title, description }) => {
  const IconComponent = iconMap[iconName] || FiDatabase;

  return (
    <motion.div
      className="bg-slate-800/70 p-8 rounded-xl shadow-2xl shadow-blue-950/40 border border-slate-700 hover:border-blue-500/40 transition-colors duration-300 backdrop-blur-sm"
      whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.2, type: 'spring', stiffness: 300 } }}
    >
      <div className="text-blue-400 text-4xl mb-5 inline-block bg-blue-500/10 p-4 rounded-lg shadow-inner shadow-blue-900/50">
        <IconComponent />
      </div>
      <h3 className="text-xl font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
