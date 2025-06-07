// src/components/Button.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import loyalShiftV2Theme from "../themes/loyalshift-v2.theme"; // Import the theme

const theme = loyalShiftV2Theme; // Use the imported theme

const Button = ({ 
  children, 
  variant = "primary", 
  icon: IconComponent, 
  to, 
  className = "", 
  size = "lg", 
  disabled = false, // Added disabled prop
  ...props 
}) => {
  // Base button classes - structural styles
  const baseClasses = `font-semibold rounded-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 shadow-md focus:outline-none ${theme.focusRingDefault}`;
  
  // Size variants
  const sizeClasses = {
    xs: "px-3 py-1.5 text-xs", // Added for smaller buttons like in SupportPage
    sm: "px-4 py-2 text-sm",   // Renamed 'base' to 'sm' for clarity
    base: "px-5 py-2.5 text-sm",// New 'base' size, between sm and lg
    lg: "px-6 py-3 text-base",
    xl: "px-7 py-3.5 text-lg"
  };

  // Variant styles using Tailwind classes from loyalShiftV2Theme
  // These now directly apply the theme's Tailwind classes.
  let variantClass = "";
  switch (variant) {
    case "primary":
      variantClass = `
        ${theme.buttonPrimaryBg} 
        ${theme.buttonPrimaryText} 
        ${theme.buttonPrimaryHoverBg}
        border border-transparent 
      `; // Primary buttons usually don't need a visible border if bg is solid
      break;
    case "secondary":
      variantClass = `
        ${theme.buttonSecondaryBg} 
        ${theme.buttonSecondaryText} 
        ${theme.buttonSecondaryHoverBg}
        border ${theme.buttonSecondaryBorder || 'border-transparent'} 
        hover:${theme.buttonSecondaryHoverBorder || 'hover:border-transparent'}
      `;
      break;
    case "outline": // A common variant, let's define it based on theme accents
      variantClass = `
        bg-transparent 
        ${theme.accentCyan} /* Text color is the accent */
        border-2 ${theme.accentCyan.replace('text-','border-')} /* Border is the accent color */
        hover:bg-cyan-500/10 /* Slight accent fill on hover */
        hover:${theme.accentCyan.replace('text-','border-').replace('600', '700')} /* Darker border on hover */
      `;
      break;
    case "text": // For text-like buttons
        variantClass = `
          bg-transparent
          ${theme.buttonTextLink}
          ${theme.buttonTextLinkHover}
          shadow-none hover:shadow-none
          px-2 py-1 text-sm /* Default small padding for text buttons */
        `;
        break;
    // Add more variants if needed (e.g., 'danger', 'success' using theme.errorText, theme.successText)
    default:
      variantClass = `
        ${theme.buttonPrimaryBg} 
        ${theme.buttonPrimaryText} 
        ${theme.buttonPrimaryHoverBg}
        border border-transparent
      `;
  }

  const MotionComponent = to ? motion(Link) : motion.button;

  return (
    <MotionComponent
      to={to}
      // Order of classes: base, size, variant, then custom className for overrides
      className={`
        ${baseClasses} 
        ${sizeClasses[size] || sizeClasses.lg} 
        ${variantClass} 
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `}
      whileHover={!disabled ? { y: -1, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 10 } } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      {...props}
    >
      {/* Render icon before children if iconLeft is not specified, or handle iconRight */}
      {IconComponent && typeof IconComponent !== 'string' && !IconComponent.props?.iconRight && (
        <span className="inline-flex">
          {React.isValidElement(IconComponent) 
            ? IconComponent 
            : <IconComponent className={`w-5 h-5 ${size === 'xl' || size === 'lg' ? 'mr-2' : 'mr-1.5'}`} />} 
        </span>
      )}
      {children}
      {IconComponent && typeof IconComponent !== 'string' && IconComponent.props?.iconRight && (
         <span className="inline-flex">
          {React.isValidElement(IconComponent) 
            ? IconComponent 
            : <IconComponent className={`w-5 h-5 ${size === 'xl' || size === 'lg' ? 'ml-2' : 'ml-1.5'}`} />}
        </span>
      )}
    </MotionComponent>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text', 'accent']), // Added 'text', 'accent' from original if needed
  icon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.node
  ]),
  to: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'base', 'lg', 'xl']), // Updated sizes
  disabled: PropTypes.bool,
};

export default Button;
