// src/components/LoyalShiftSvgLogo.js
// REFINED: Wrapped SVG in a React Router Link to make it clickable.
// Renders the LoyalShift logo as an SVG using <text> elements.

import React from "react";
import { Link } from "react-router-dom"; // Import Link
import PropTypes from "prop-types";

// Default colors (adjust if needed)
const defaultColors = {
  loyal: "#60a5fa", // Approx text-blue-400
  shift: "#93c5fd", // Approx text-blue-300
};

/**
 * Renders the LoyalShift logo as a clickable SVG component linking to the homepage.
 * Uses <text> and <tspan> elements for text rendering.
 * Relies on font availability. Uses a fixed viewBox and scales content.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional CSS classes for the wrapping Link element.
 * @param {string|number} [props.width=120] - Default width of the SVG.
 * @param {string|number} [props.height=30] - Default height of the SVG.
 * @param {string} [props.loyalColor=defaultColors.loyal] - Color for the "Loyal" part.
 * @param {string} [props.shiftColor=defaultColors.shift] - Color for the "Shift" part.
 * @param {string} [props.fontFamily='Montserrat, sans-serif'] - Font family to attempt using.
 * @param {number} [props.fontSize=24] - Font size within the SVG viewbox units.
 * @param {string} [props.fontWeight='bold'] - Font weight.
 * @param {string} [props.letterSpacing='-0.5'] - Letter spacing.
 */
const Logo = ({
  className = "", // Classes applied to the Link wrapper
  width = "100",
  height = "30",
  loyalColor = defaultColors.loyal,
  shiftColor = defaultColors.shift,
  fontFamily = "Montserrat, sans-serif",
  fontSize = 28,
  fontWeight = "bold",
  letterSpacing = "-0.5",
}) => {
  // Fixed viewBox (same as before)
  const viewBoxWidth = 130;
  const viewBoxHeight = 30;

  return (
    <Link
      to="/"
      className={`inline-block ${className}`}
      aria-label="LoyalShift Home"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        aria-labelledby="loyalshift-logo-title"
        role="img"
      >
        <title id="loyalshift-logo-title">LoyalShift Logo</title>
        <text
          x={viewBoxWidth / 2}
          y={viewBoxHeight / 2}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan fill={loyalColor}>Loyal</tspan>
          <tspan fill={shiftColor}>Shift</tspan>
        </text>
      </svg>
    </Link>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loyalColor: PropTypes.string,
  shiftColor: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  letterSpacing: PropTypes.string,
};

export default Logo;
