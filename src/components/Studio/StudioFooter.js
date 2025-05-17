// src/components/StudioFooter.js
// Footer for client-specific studio pages (e.g., /studio/equilibra, /studio/afc)
// Indicates that the studio is part of LoyalShift's AgentHub system.

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FiShare2, FiInfo } from "react-icons/fi"; // Example icons

// Neutral Dark Theme for the footer
const colors = {
  background: "bg-slate-900", // Matches sidebar for consistency
  textMuted: "text-slate-500", // For copyright and less prominent text
  textLink: "text-slate-400", // For links
  linkHover: "hover:text-blue-400", // LoyalShift's accent blue for hover
  border: "border-slate-700",
};

const StudioFooter = ({ clientName }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`${colors.background} border-t ${colors.border} py-4 px-6 text-xs`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className={`${colors.textMuted}`}>
          &copy; {currentYear} {clientName ? `${clientName} & ` : ""}LoyalShift
          Technologies. Todos los derechos reservados.
        </p>
        <p className={`${colors.textLink} flex items-center gap-1`}>
          <FiShare2 className="w-3 h-3 opacity-70" />
          <span>
            Studio potenciado por{" "}
            <Link to="/" className={`${colors.linkHover} font-semibold`}>
              LoyalShift AgentHub™
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

StudioFooter.propTypes = {
  /** The name of the client whose studio this is, to be displayed in the copyright. */
  clientName: PropTypes.string,
};

export default StudioFooter;
