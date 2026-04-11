'use client';

import React from "react";
import Link from "next/link";

const defaultColors = {
  loyal: "#60a5fa",
  shift: "#93c5fd",
};

const Logo = ({
  className = "",
  width = "120",
  height = "30",
  loyalColor = defaultColors.loyal,
  shiftColor = defaultColors.shift,
  fontFamily = "Montserrat, sans-serif",
  fontSize = 28,
  fontWeight = "bold",
  letterSpacing = "-0.5",
}) => {
  const viewBoxWidth = 150;
  const viewBoxHeight = 30;

  return (
    <Link
      href="/"
      className={`inline-block ${className}`}
      aria-label="LoyalShift Home"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        role="img"
      >
        <title>LoyalShift Logo</title>
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

export default Logo;
