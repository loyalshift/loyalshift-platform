import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Reusable Section Title ---
// Simplified title component
const SectionTitle = ({
  title,
  children,
  colors = { textHeading: "text-neutral-dark", textBody: "text-neutral-main" },
  align = "center",
  className = "",
}) => (
  <motion.div
    className={`mb-10 md:mb-12 ${
      align === "center" ? "text-center" : "text-left"
    } ${className}`}
    variants={fadeInUp}
  >
    <h2
      className={`text-3xl md:text-4xl font-bold ${colors.textHeading} leading-tight mb-4`}
    >
      {title}
    </h2>
    {children && (
      <p
        className={`text-lg ${colors.textBody} ${
          align === "center" ? "max-w-3xl mx-auto" : "max-w-none"
        }`}
      >
        {children}
      </p>
    )}
  </motion.div>
);
SectionTitle.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
  align: PropTypes.oneOf(["left", "center"]),
  className: PropTypes.string,
  colors: PropTypes.object,
};

export default SectionTitle;
