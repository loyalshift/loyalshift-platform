'use client';

import React from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

const MeshGradientBackground = ({ animate = true }) => {
  const time = useTime();
  const freq = useTransform(time, [0, 15000], [0.025, 0.040], { clamp: false });
  const opac = useTransform(time, [0, 10000], [0.08, 0.15], { clamp: false });
  const baseFrequency = animate ? freq : 0.035;
  const opacity = animate ? opac : 0.12;

  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="gradEnhancedBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <filter id="noiseEnhancedBlue">
          <motion.feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves="2"
            seed={5}
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradEnhancedBlue)" />
      <motion.rect
        width="100%"
        height="100%"
        filter="url(#noiseEnhancedBlue)"
        opacity={opacity}
        style={{ mixBlendMode: 'soft-light' }}
      />
      <motion.line
        x1="0" y1="200" x2="1200" y2="600"
        stroke="rgba(96, 165, 250, 0.04)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 5, delay: 1, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.line
        x1="1200" y1="100" x2="0" y2="700"
        stroke="rgba(96, 165, 250, 0.04)"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 6, delay: 1.5, repeat: Infinity, repeatType: "mirror" }}
      />
    </svg>
  );
};

export default MeshGradientBackground;
