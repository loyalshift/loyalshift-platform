// src/components/Section.js
// UPDATED: Added 'relative' positioning class to the section element.

import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// --- Required Dependencies (Import or Define) ---
// import { colors } from '../config/theme';
// import { viewportOnce, staggerContainer } from '../config/animations';
const colors = { background: "bg-slate-100" }; // Temporary
const viewportOnce = { once: true, amount: 0.1 }; // Temporary
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } }}; // Temporary
// --- End Dependencies ---


const Section = ({
    children,
    className = "",
    bg = colors.background,
    ariaLabelledby
}) => (
  <motion.section
      // *** ADDED 'relative' CLASS HERE ***
      className={`relative py-12 md:py-16 ${bg} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      aria-labelledby={ariaLabelledby}
  >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {children}
      </div>
  </motion.section>
);

Section.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    bg: PropTypes.string,
    ariaLabelledby: PropTypes.string,
};

export default Section;
