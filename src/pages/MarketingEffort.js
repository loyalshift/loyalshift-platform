// src/pages/MarketingEffortPage.js
// Purpose: Displays a specific marketing message optimized for mobile,
// typically linked from email/SMS. Uses dynamic SVG animations.
// Current time: Sunday, April 20, 2025 at 11:58:15 AM CST (Costa Rica Time)

import React, { useState, useEffect, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLoader, FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

// --- Reusable Components & Data ---
import Button from "../components/Button"; // Adjust path if needed
import { marketingEffortsData } from "../data/marketing-efforts"; // Adjust path if needed
import useMediaQuery from "../hooks/use-media-query"; // Adjust path if needed
// Import the animation map and placeholder component
import {
  marketingAnimationMap,
  DefaultAnimationPlaceholder,
} from "../components/MarketingEfforts"; // Adjust path if needed

// --- Simple component to display when viewed on desktop ---
const DesktopNotSupportedMessage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-light p-8 text-center">
    <FiAlertTriangle className="w-16 h-16 text-status-warning mb-4" />
    <h1 className="text-2xl font-bold text-neutral-dark mb-2">
      Mobile Viewing Recommended
    </h1>
    <p className="text-neutral-main max-w-md mb-6">
      This page is optimized for the best experience on a mobile device. Please
      open the link on your phone.
    </p>
    {/* Link back home using standard Link */}
    <Link
      to="/"
      className="inline-flex items-center px-6 py-3 border border-neutral-main/30 text-sm font-medium rounded-md text-neutral-dark bg-white hover:bg-neutral-50 transition-colors"
    >
      <FiArrowLeft className="w-4 h-4 mr-2" />
      Back to Home
    </Link>
  </div>
);

// --- Main Page Component ---
export default function MarketingEffortPage() {
  const { marketingEffortId } = useParams(); // Get ID from URL
  const [effort, setEffort] = useState(null); // State for the specific effort data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const isDesktop = useMediaQuery("(min-width: 640px)"); // Check if screen is wider than 'sm' breakpoint

  useEffect(() => {
    // Reset states on ID change
    setLoading(true);
    setError(null);
    setEffort(null);

    // --- Simulate fetching data ---
    // Replace this with your actual API call or data lookup logic
    const foundEffort = marketingEffortsData.find(
      (e) => e.marketingEffortId === marketingEffortId
    );

    // Simulate network delay
    const timer = setTimeout(() => {
      if (foundEffort) {
        setEffort(foundEffort);
      } else {
        setError(`Content for "${marketingEffortId}" could not be found.`);
      }
      setLoading(false);
    }, 300); // Shorter delay for demo purposes

    return () => clearTimeout(timer); // Cleanup timer on unmount or ID change
  }, [marketingEffortId]); // Re-run effect when the ID changes

  // --- Render desktop incompatibility message ---
  if (isDesktop) {
    return <DesktopNotSupportedMessage />;
  }

  // --- Render Loading State ---
  if (loading) {
    return (
      // Full screen loader
      <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-neutral-light">
        <FiLoader className="w-10 h-10 text-primary-main animate-spin" />
      </div>
    );
  }

  // --- Render Error State ---
  if (error) {
    return (
      // Full screen error message
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-neutral-light p-8 text-center">
        <FiAlertTriangle className="w-12 h-12 text-status-error mb-4" />
        <h1 className="text-xl font-bold text-neutral-dark mb-2">
          Error Loading Content
        </h1>
        <p className="text-neutral-main mb-6">{error}</p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-neutral-main/30 text-sm font-medium rounded-md text-neutral-dark bg-white hover:bg-neutral-50 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  // --- Render Effort Content (Success State) ---
  if (!effort) return null; // Should be covered by loading/error, but good safety check

  // Dynamically select the correct animation component based on the data
  const AnimationComponent =
    marketingAnimationMap[effort.animationComponentName] ||
    DefaultAnimationPlaceholder;

  return (
    // Page Wrapper: Full viewport height/width, flex column, prevents body scroll
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-neutral-light">
      {/* Main Card: Takes full available space, flex column layout, hides overflow */}
      <motion.div
        className="bg-neutral-white w-full h-full flex flex-col overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }} // Slightly longer fade-in
      >
        {/* Animation Area Wrapper */}
        <div className="w-full aspect-video bg-neutral-main/5 overflow-hidden relative flex-shrink-0">
          {/* Using aspect-video as a common default, adjust as needed per animation */}
          {/* Render the dynamically selected animation component */}
          {/* Pass any specific props defined in the data */}
          <AnimationComponent {...(effort.animationProps || {})} />
        </div>

        {/* Content Area: Takes remaining space */}
        <div className="p-5 pt-4 flex flex-col flex-grow overflow-hidden">
          {" "}
          {/* Reduced top padding */}
          {/* Headline */}
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-dark mb-2 flex-shrink-0">
            {effort.headline}
          </h1>
          {/* Text Body Area: Allows internal scrolling if text overflows */}
          {/* Change overflow-y-auto to overflow-hidden to strictly clip text */}
          <div className="flex-grow overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-neutral-main/30 scrollbar-track-transparent pr-1">
            <p className="text-neutral-main text-base sm:text-lg whitespace-pre-line">
              {effort.bodyText}
            </p>
          </div>
          {/* CTA Button Area: Pushed to the bottom */}
          <div className="mt-auto flex-shrink-0 pt-2">
            {" "}
            {/* Added padding top */}
            <Button
              href={effort.ctaLink} // Use href for external links or standard anchors
              target={effort.ctaLink.startsWith("http") ? "_blank" : undefined} // Open external links in new tab
              rel={
                effort.ctaLink.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              variant="primary"
              size="lg"
              className="w-full" // Button takes full width of its container
            >
              {effort.ctaText || "Learn More"} {/* Default CTA text */}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
