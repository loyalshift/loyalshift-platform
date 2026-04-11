'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  icon: IconComponent,
  to,
  className = "",
  size = "lg",
  ...props
}) => {
  const baseClasses = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md focus:outline-none";

  const sizeClasses = {
    base: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-7 py-3.5 text-lg"
  };

  const variantStyles = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-400 border border-cyan-600",
    outline: "bg-transparent text-cyan-400 border border-cyan-400 hover:bg-cyan-400/20",
    accent: "bg-blue-500 text-white hover:bg-blue-400 border border-blue-600",
    custom: "",
  };

  const iconEl = IconComponent && (
    <span className="inline-flex">
      {React.isValidElement(IconComponent)
        ? IconComponent
        : <IconComponent className="w-5 h-5" />}
    </span>
  );

  if (to) {
    return (
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={to}
          className={`${baseClasses} ${sizeClasses[size]} ${variantStyles[variant] || ''} ${className}`}
        >
          {children}
          {iconEl}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantStyles[variant] || ''} ${className}`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
      {iconEl}
    </motion.button>
  );
};

export default Button;
