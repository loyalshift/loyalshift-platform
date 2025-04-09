import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Renders the LoyalShift text logo using a specific 'font-logo' font family
 * (expected to be defined in tailwind.config.js).
 * Features distinct colors for "LOYAL" and "SHIFT" parts, adjustable
 * via the `lightMode` prop (requires color definitions like 'text-primary-main',
 * 'text-primary-light', etc., in Tailwind config).
 * Allows customizable text size and additional wrapper styling.
 */
export default function Logo({ lightMode = false, size = 'text-2xl', className = '' }) {
  // 1. Define Semantic Color Class Names
  // These class names depend on corresponding definitions in your tailwind.config.js
  // Example: 'text-primary-main' might map to your primary brand color for dark text.
  // Example: 'text-primary-light' might map to a lighter variant for use on dark backgrounds.
  const loyalColor = lightMode ? "text-primary-light" : "text-primary-main";
  const shiftColor = lightMode ? "text-secondary-light" : "text-secondary-main";

  // 2. Base Styling for the Logo Wrapper (Link)
  // Applies the custom logo font, default weight, tracking, and display.
  // Ensure 'font-logo' is defined in your tailwind.config.js theme.fontFamily.
  const baseClasses = "font-logo font-bold tracking-tight inline-block"; // Added inline-block for predictable layout
  const combinedClasses = `${baseClasses} ${size} ${className}`.trim();

  return (
    <Link
      to="/"
      className={combinedClasses}
      aria-label="LoyalShift Home" // 3. Added Accessibility Label
    >
      {/* Spans inherit font-family, weight, tracking from parent Link */}
      {/* Apply specific colors and optional transitions */}
      <span className="text-blue-400 transition-colors duration-300 ease-in-out">Loyal</span>
      <span className="text-blue-300 transition-colors duration-300 ease-in-out">Shift</span>
      {/* 5. Optional: Add more elements like a small icon/symbol if needed */}
      {/* Example: <span className="ml-1 text-accent-color">®</span> */}
    </Link>
  );
}

Logo.propTypes = {
  /** If true, uses lighter color variants suitable for dark backgrounds */
  lightMode: PropTypes.bool,
  /** Tailwind CSS text size class (e.g., 'text-xl', 'text-3xl') */
  size: PropTypes.string,
  /** Additional Tailwind classes to apply to the Link wrapper */
  className: PropTypes.string,
};
