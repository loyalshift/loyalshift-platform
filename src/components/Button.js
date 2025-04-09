import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// TODO: Ideally, import colors from a central config or ensure tailwind.config.js has them
const colors = {
  surface: "bg-slate-800/70",
  surfaceHover: "hover:bg-slate-700/90",
  primaryGradient: "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600",
  primaryHover: "hover:from-blue-400 hover:via-cyan-400 hover:to-blue-500",
  borderAccent: "border-blue-500/40",
  borderHover: "hover:border-blue-400/70",
  textPrimary: "text-slate-100",
  textWhite: "text-white",
};


const Button = ({ children, variant = "primary", icon: IconComponent, to, className = "", size = "lg", ...props }) => {
    const baseClasses = "font-semibold rounded-lg transition-all duration-300 ease-out flex items-center justify-center gap-2 text-base shadow-lg";
    const sizeClasses = { base: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
    const variants = {
      primary: `${colors.primaryGradient} ${colors.textWhite} ${colors.primaryHover} hover:shadow-cyan-500/30`,
      secondary: `${colors.surface} ${colors.textPrimary} border ${colors.borderAccent} ${colors.surfaceHover} ${colors.borderHover} hover:border-blue-400/60 hover:shadow-md`,
      outline: `bg-white/5 backdrop-blur-sm ${colors.textWhite} border-2 border-white/40 ${colors.surfaceHover} hover:border-white/60`,
    };

    const MotionComponent = to ? motion.create(Link) : motion.button;

    // Clone icon to add className if it's passed as a component type
    const renderIcon = () => {
        if (IconComponent && React.isValidElement(IconComponent)) {
            // If it's already an element (e.g., <FiArrowRight /> passed directly)
             return React.cloneElement(IconComponent, { className: `w-5 h-5 ${IconComponent.props.className || ''}` });
        } else if (typeof IconComponent === 'function' || typeof IconComponent === 'object') {
             // If it's a component type (e.g., FiArrowRight passed)
             // This case might be less common if you pass <FiArrowRight /> directly
             const Icon = IconComponent;
             return <Icon className="w-5 h-5" />;
        }
        return null;
    };


    return (
      <MotionComponent
        to={to}
        className={`${baseClasses} ${sizeClasses[size]} ${variants[variant]} ${className}`}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        {...props}
      >
        {children}
        {renderIcon()}
      </MotionComponent>
    );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]), // Allow element or component type
  to: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['base', 'lg'])
};

export default Button;
