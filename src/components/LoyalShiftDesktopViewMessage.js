// src/components/LoyalShiftDesktopViewMessage.js
// UPDATED: Added optional client logo prop to display alongside LoyalShift logo.

import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { FiMonitor, FiInfo } from 'react-icons/fi';
// Using standard import method for main logo
import loyalShiftLogoUrl from '../logo.svg'; // Adjust path as needed

// LoyalShift Dark Theme Colors
const colors = {
  background: "bg-slate-900",
  surface: "bg-slate-800",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  textHighlight: "text-blue-400",
  border: "border-slate-700",
};

/**
 * Component displayed on mobile advising desktop use, styled for LoyalShift.
 * Can optionally display a client logo next to the LoyalShift logo.
 *
 * @param {object} props - Component props.
 * @param {string} [props.clientLogoUrl] - Optional URL/path for the client's logo.
 * @param {string} [props.clientName] - Optional name of the client (used for alt text).
 */
const LoyalShiftDesktopViewMessage = ({ clientLogoUrl, clientName }) => {
  return (
    <div className={`min-h-screen ${colors.background} flex flex-col items-center justify-center text-center p-6`}>
       <div className={`max-w-md w-full ${colors.surface} p-8 rounded-xl shadow-lg border ${colors.border}`}>

            {/* Logo Container - Displays LoyalShift logo and Client logo if provided */}
            <div className="flex items-center justify-center gap-x-5 mb-6"> {/* Increased gap */}
                {/* LoyalShift Logo */}
                <img
                    src={loyalShiftLogoUrl}
                    alt="LoyalShift Logo"
                    // Adjusted height for potentially two logos
                    className="h-8 w-auto"
                />

                {/* Conditionally render Client Logo */}
                {clientLogoUrl && clientName && (
                   <>
                     {/* Optional Separator */}
                     <div className={`w-px h-8 bg-slate-600`}></div>
                     {/* Client Logo */}
                     <img
                        src={clientLogoUrl}
                        alt={`Logo de ${clientName}`} // Alt text using client name
                        className="h-8 w-auto max-w-[100px]" // Constrain client logo width if needed
                     />
                   </>
                )}
            </div>

            {/* Icon */}
            <FiMonitor className={`w-16 h-16 ${colors.textHighlight} mx-auto mb-4 opacity-80`} />

            {/* Title */}
            <h1 className={`text-2xl font-bold ${colors.textPrimary} mb-3`}>
                Experience Optimized for Desktop
            </h1>

            {/* Message */}
            <p className={`${colors.textSecondary} text-base leading-relaxed`}>
                For the best visualization and complete functionality, please access this page from a desktop or laptop computer.
            </p>
       </div>
    </div>
  );
};

// Add PropTypes for the new props
LoyalShiftDesktopViewMessage.propTypes = {
    clientLogoUrl: PropTypes.string,
    clientName: PropTypes.string,
};


export default LoyalShiftDesktopViewMessage;
