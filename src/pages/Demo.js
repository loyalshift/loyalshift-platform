// src/pages/DemoAppPage.js
// Note: Adjust import paths if your component structure differs.

import React from "react";
import { motion } from "framer-motion";
import { FiPlay, FiArrowRight, FiCpu } from "react-icons/fi"; // Example icons, adjust as needed
import Button from "../components/Button"; // Assuming Button component is at this path

// --- Animation Variants (Placeholder Definitions - Customize as needed) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.5, 0.75, 1] },
  }, // Example ease
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.5, 0.75, 1] },
  }, // Example ease
};

// Viewport settings for triggering animations on scroll
const viewportSettings = { once: true, amount: 0.2 };
// --- End Animation Variants ---

export default function DemoAppPage() {
  // Placeholder function for video interaction
  const handleVideoClick = () => {
    // TODO: Implement actual video playback (e.g., open modal, navigate, etc.)
    alert("Video player clicked! Implement video playback.");
    console.log(
      "Current Time (for context):",
      new Date().toLocaleString("en-US", { timeZone: "America/Costa_Rica" })
    );
    console.log("Location (for context): San José, Costa Rica");
  };

  return (
    // Main page container with light theme background
    <div className="bg-neutral-light py-16 md:py-24 overflow-hidden">
      {" "}
      {/* Added overflow-hidden */}
      <div className="container mx-auto px-4">
        {/* ======================== */}
        {/* 1. Hero Section          */}
        {/* ======================== */}
        <motion.section
          className="text-center mt-10 mb-10 md:mb-16"
          initial="hidden"
          whileInView="visible" // Use whileInView for scroll-triggered animation
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {/* Optional Icon */}
          <motion.div
            variants={fadeInUp}
            className="mb-4 inline-block p-3 bg-primary-main/10 rounded-full"
          >
            <FiCpu className="w-8 h-8 text-primary-main" />
          </motion.div>
          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-dark mb-4"
          >
            {/* Replace with actual Headline */}
            Visualize Your Legacy Transformation
          </motion.h1>
          {/* Sub-headline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-neutral-main max-w-3xl mx-auto"
          >
            {/* Replace with actual Sub-headline */}
            See how LoyalShift maps your current systems, watch the 3-minute interactive demo
          </motion.p>
          <p className="text-center text-neutral-main mt-4 text-sm">
            
          </p>
        </motion.section>

        {/* ======================== */}
        {/* 2. Video Placeholder Area */}
        {/* ======================== */}
        <motion.section
          className="mb-16 md:mb-20 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={scaleUp} // Use scaleUp for emphasis
        >
          {/* The interactive placeholder itself */}
          <motion.div
            className="aspect-video bg-slate-800 rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden group cursor-pointer border border-slate-700"
            onClick={handleVideoClick} // Trigger action on click
            whileHover={{ scale: 1.02 }} // Subtle scale on hover
            transition={{ type: "spring", stiffness: 300, damping: 15 }} // Spring physics for hover
          >
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 z-10 flex items-center justify-center pointer-events-none">
              {" "}
              {/* pointer-events-none so click goes to parent */}
              <FiPlay className="w-16 h-16 md:w-24 md:h-24 text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-in-out" />
            </div>
            {/* Optional: Add placeholder text or image if needed */}
            <span className="text-slate-500 z-0 text-sm">
              [Demo Video Placeholder]
            </span>
            {/* Example using an actual video tag with poster: */}
            {/* <video
              poster="/images/demo-poster.jpg" // Replace with your actual poster image path
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover z-0"
            > */}
            {/* <source src="/videos/demo-preview.mp4" type="video/mp4" /> */}
            {/* Your browser does not support the video tag. */}
            {/* </video> */}
          </motion.div>
          {/* Caption below video */}
          
        </motion.section>

        {/* ======================== */}
        {/* 3. CTA Section           */}
        {/* ======================== */}
        <motion.section
          // Added light background card style for emphasis
          className="text-center bg-neutral-white p-10 md:p-16 rounded-lg shadow-md border border-neutral-light"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {/* CTA Headline */}
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4"
          >
            {/* Replace with actual CTA Headline */}
            Ready to See <span className="text-primary-main">Your</span> Systems
            Transformed?
          </motion.h2>
          {/* CTA Description */}
          <motion.p
            variants={fadeInUp}
            className="text-lg text-neutral-main max-w-2xl mx-auto mb-8"
          >
            {/* Replace with actual CTA Description */}
            Get a personalized walkthrough based on your specific infrastructure
            and goals. See the real impact LoyalShift can make.
          </motion.p>
          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            {/* Primary CTA Button */}
            <Button
              to="/request-demo" // Replace with actual link
              variant="primary"
              size="lg"
              icon={<FiArrowRight className="w-5 h-5" />}
            >
              Request Personalized Demo
            </Button>
            {/* Secondary CTA Button */}
            <Button
              to="/solutions" // Replace with actual link
              variant="secondary"
              size="lg"
              // Example override if the default secondary isn't quite right for light theme:
              className="!bg-transparent !border !border-neutral-main/70 !text-neutral-dark hover:!border-neutral-main hover:!bg-neutral-main/5 focus:!ring-neutral-main/50"
            >
              Explore Solutions
            </Button>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
