// src/components/Button.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Button = ({ 
  children, 
  variant = "primary", 
  icon: IconComponent, 
  to, 
  className = "", 
  size = "lg", 
  ...props 
}) => {
  // Base button classes
  const baseClasses = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md focus:outline-none";
  
  // Size variants
  const sizeClasses = {
    base: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-7 py-3.5 text-lg"
  };

  // Variant styles using CSS variables
  const variantStyles = {
    primary: "bg-[var(--color-primary)] text-[var(--color-text-on-primary)] hover:bg-[var(--color-primary-dark)] border border-[var(--color-primary-dark)]",
    outline: "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)]/20",
    accent: "bg-[var(--color-accent)] text-[var(--color-primary-dark)] hover:bg-[var(--color-accent-light)] border border-[var(--color-accent)]"
  };

  const MotionComponent = to ? motion(Link) : motion.button;

  return (
    <MotionComponent
      to={to}
      className={`${baseClasses} ${sizeClasses[size]} ${variantStyles[variant]} ${className}`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
      {IconComponent && (
        <span className="inline-flex">
          {React.isValidElement(IconComponent) 
            ? IconComponent
            : <IconComponent className="w-5 h-5" />}
        </span>
      )}
    </MotionComponent>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'outline', 'accent']),
  icon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.node
  ]),
  to: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['base', 'lg', 'xl'])
};

export default Button;
