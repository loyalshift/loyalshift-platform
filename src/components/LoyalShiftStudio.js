// src/pages/Studio/LoyalShiftStudioPage.js (or src/pages/LoyalShiftStudioPage.js if it's not in a subfolder)
// REFACTORED: Uses ConfigurableModal, StudioLayout context for theme/client data.
// Sidebar logic is now handled by StudioLayout and StudioSidebar.
// This page represents the main content area for the LoyalShift studio.

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiUploadCloud,
  FiPaperclip,
  FiImage,
  FiMic,
  FiVideo,
  FiExternalLink,
  FiEdit3,
  FiCode,
  FiCopy,
  FiX,
  FiShare,
  FiMaximize2,
  FiFilm,
  FiGrid,
  FiUser, // Added FiUser
} from "react-icons/fi";
import { Link, useOutletContext } from "react-router-dom"; // Added useOutletContext

// Import the ConfigurableModal
import ConfigurableModal from "./ConfigurableModal";

// Default LoyalShift Logo (can be overridden by context if clientLogoUrl is different)
const defaultLoyalShiftLogo = process.env.PUBLIC_URL + "/logo.svg";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = (staggerChildren = 0.05, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});

// --- Info Block Component (can be shared or defined locally if specific styling) ---
const InfoBlock = ({ icon: Icon, title, children, themeColors }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex items-start gap-3 p-3.5 rounded-lg ${
      themeColors.surfaceMuted || "bg-slate-700/50"
    } border ${themeColors.borderLight || "border-slate-600"} shadow-sm`}
  >
    <Icon
      className={`w-5 h-5 ${
        themeColors.accentCyan || "text-cyan-400"
      } mt-0.5 flex-shrink-0`}
    />
    <div>
      <h4
        className={`text-xs font-semibold ${
          themeColors.textPrimary || "text-slate-100"
        } mb-0.5`}
      >
        {title}
      </h4>
      <p
        className={`text-xs ${
          themeColors.textSecondary || "text-slate-400"
        } leading-snug`}
      >
        {children}
      </p>
    </div>
  </motion.div>
);
InfoBlock.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  themeColors: PropTypes.object.isRequired,
};

// --- Main LoyalShift Studio Page Component ---
export default function LoyalShiftStudioPage() {
  const fileInputRef = useRef(null);

  // Get client-specific data and theme from StudioLayout context
  const outletContext = useOutletContext();
  const {
    clientId, // Will be 'loyalshift' or some other ID if this page is reused
    clientName = "LoyalShift Studio", // Default if not provided by context
    themeColors, // Theme from StudioLayout
    studioAction, // Action triggered from sidebar (e.g., 'embedMedia', 'uploadFile')
    setStudioAction, // Function to reset or trigger actions
  } = outletContext || {};

  // Use theme from context, or provide a fallback if context is somehow unavailable
  const currentTheme = themeColors || {
    background: "bg-slate-950",
    sidebarBg: "bg-slate-900",
    mainContentBg: "bg-slate-950",
    surface: "bg-slate-800",
    surfaceMuted: "bg-slate-700/50",
    border: "border-slate-700",
    borderLight: "border-slate-600",
    textPrimary: "text-slate-100",
    textSecondary: "text-slate-400",
    textMuted: "text-slate-500",
    accentBlue: "text-blue-400",
    accentCyan: "text-cyan-400",
    buttonPrimaryBg: "bg-gradient-to-r from-blue-600 to-cyan-500",
    buttonPrimaryHover: "hover:from-blue-500 hover:to-cyan-400",
    buttonText: "text-white",
    uploadZoneBorder: "border-slate-200",
    uploadZoneHoverBorder: "hover:border-blue-300",
    inputBg: "bg-slate-700",
    modalOverlayBg: "bg-black/70",
    modalSurface: "bg-slate-800",
    modalBorder: "border-slate-700",
    modalTextPrimary: "text-slate-100",
    modalTextSecondary: "text-slate-400",
    modalIconColor: "text-blue-400",
    modalCloseButtonHoverBg: "hover:bg-slate-700",
  };

  const logoToDisplay =
    clientId === "loyalshift" && outletContext?.clientLogoUrl
      ? outletContext.clientLogoUrl
      : defaultLoyalShiftLogo;

  // State for this page's modals
  const [isEmbedModalOpenThisPage, setIsEmbedModalOpenThisPage] =
    useState(false);

  useEffect(() => {
    if (studioAction === "embedMedia") {
      setIsEmbedModalOpenThisPage(true);
      if (setStudioAction) setStudioAction(null); // Reset action after handling
    }
    if (studioAction === "uploadFile") {
      fileInputRef.current?.click();
      if (setStudioAction) setStudioAction(null); // Reset action
    }
  }, [studioAction, setStudioAction]);

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(
        `Selected file: ${file.name}\n(Simulating upload for ${clientName})`
      );
      event.target.value = null;
    }
  };

  // Content for the Embed Media Modal
  const embedModalContent = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label
            htmlFor="embedColor"
            className={`block text-xs font-medium ${currentTheme.textSecondary} mb-1`}
          >
            Color:
          </label>
          <div className="flex items-center gap-2">
            <button
              className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow ring-1 ring-blue-300"
              title="Blue"
            ></button>
            <button
              className={`w-6 h-6 rounded-full ${currentTheme.inputBg} border-2 ${currentTheme.borderLight} shadow`}
              title="Dark"
            ></button>
            <button
              className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow"
              title="Green"
            ></button>
          </div>
        </div>
        <div>
          <label
            htmlFor="embedSize"
            className={`block text-xs font-medium ${currentTheme.textSecondary} mb-1`}
          >
            Size:
          </label>
          <select
            id="embedSize"
            className={`w-full p-2 text-sm ${currentTheme.inputBg} ${currentTheme.textPrimary} rounded-md border ${currentTheme.borderLight} focus:ring-1 focus:ring-offset-0 focus:${currentTheme.accentBlue}`}
          >
            <option>Normal (352px)</option>
            <option>Compact (152px)</option>
            <option>Custom Height</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="embedWidth"
            className={`block text-xs font-medium ${currentTheme.textSecondary} mb-1`}
          >
            Width:
          </label>
          <input
            type="text"
            id="embedWidth"
            defaultValue="100%"
            className={`w-full p-2 text-sm ${currentTheme.inputBg} ${currentTheme.textPrimary} rounded-md border ${currentTheme.borderLight} focus:ring-1 focus:ring-offset-0 focus:${currentTheme.accentBlue}`}
          />
        </div>
      </div>
      <div
        className={`p-4 rounded-lg ${currentTheme.surfaceMuted} border ${currentTheme.borderLight}`}
      >
        <p className={`text-sm font-semibold ${currentTheme.textPrimary} mb-2`}>
          Preview
        </p>
        <div
          className={`aspect-video bg-black rounded flex items-center justify-center ${currentTheme.textSecondary} text-sm`}
        >
          (Media Player Preview Placeholder)
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label
            htmlFor="embedCode"
            className={`block text-xs font-medium ${currentTheme.textSecondary}`}
          >
            Embed Code (Example for YouTube):
          </label>
          <button
            onClick={() => {
              const exampleEmbedCode = `<iframe title="${
                clientName || "Content"
              } Embed" src="https://www.youtube.com/embed/dQw4w9WgXcQ?utm_source=generator"></iframe>`;
              navigator.clipboard
                .writeText(exampleEmbedCode.trim())
                .then(() => alert("Embed code copied!"))
                .catch((err) => alert("Failed to copy."));
            }}
            className={`flex items-center gap-1.5 text-xs ${currentTheme.accentBlue} hover:text-cyan-300 font-medium p-1 rounded hover:bg-slate-700/50`}
          >
            <FiCopy className="w-3.5 h-3.5" /> Copy
          </button>
        </div>
        <textarea
          id="embedCode"
          readOnly
          value={`<iframe title="${
            clientName || "Content"
          } Embed" src="https://www.youtube.com/embed/dQw4w9WgXcQ?utm_source=generator"></iframe>`}
          rows="5"
          className={`w-full p-2.5 text-xs font-mono ${currentTheme.inputBg} ${currentTheme.textSecondary} rounded-md border ${currentTheme.borderLight} focus:ring-1 focus:ring-offset-0 focus:${currentTheme.accentBlue} resize-none scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700`}
        />
      </div>
      <p className={`text-xs ${currentTheme.textMuted} pt-2`}>
        By embedding external content, you agree to the terms and conditions of
        the respective service provider.
      </p>
    </>
  );

  return (
    <>
      {/* Top Bar with User Icon & Page Title */}
      <div
        className={`flex justify-between items-center mb-6 px-6 md:px-8 pt-6 md:pt-8 ${currentTheme.mainContentBg}`}
      >
        <h1 className={`text-2xl font-bold ${currentTheme.textPrimary}`}>
          {clientName || "Studio Home"}
        </h1>
        <Link
          to="#"
          className={`w-9 h-9 rounded-full ${currentTheme.surface} border ${currentTheme.borderLight} flex items-center justify-center shadow hover:opacity-80 transition-opacity`}
          title="User Profile"
        >
          <img
            src={logoToDisplay}
            alt={`${clientName || "Client"} Logo`}
            className="w-5 h-5 rounded-full object-contain"
          />
        </Link>
      </div>

      <div className={`flex-1 p-6 md:p-8 pt-0 ${currentTheme.mainContentBg}`}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className={`flex-grow flex flex-col items-center justify-center p-6 md:p-10 border-2 border-dashed 
                                ${currentTheme.uploadZoneBorder} ${currentTheme.uploadZoneHoverBorder} rounded-xl 
                                bg-slate-900/50 hover:bg-slate-800/50 transition-colors duration-300 mb-8`}
        >
          <FiUploadCloud
            className={`w-16 h-16 md:w-20 md:h-20 ${currentTheme.textSecondary} opacity-50 mb-4`}
          />
          <h2
            className={`text-xl md:text-2xl font-semibold ${currentTheme.textPrimary} mb-1`}
          >
            Select file to upload
          </h2>
          <p className={`${currentTheme.textSecondary} text-sm mb-6`}>
            Or drag and drop it here
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*,image/*,application/pdf,audio/*"
            className="hidden"
          />
          <button
            onClick={handleSelectFileClick}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold 
                                    ${
                                      currentTheme.surfaceStrong ||
                                      currentTheme.surface
                                    } ${
              currentTheme.textPrimary
            } hover:bg-slate-700
                                    border ${
                                      currentTheme.borderLight
                                    } shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${currentTheme.background.replace(
              "bg-",
              ""
            )} focus:${currentTheme.accentBlue}`}
          >
            Select File
          </button>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <InfoBlock
            themeColors={currentTheme}
            icon={FiMaximize2}
            title="Size and duration"
          >
            Maximum 30 GB, video duration: 60 minutes.
          </InfoBlock>
          <InfoBlock
            themeColors={currentTheme}
            icon={FiPaperclip}
            title="File formats"
          >
            Recommended: ".mp4, .mov, .jpg, .png, .pdf". Other major formats
            supported.
          </InfoBlock>
          <InfoBlock
            themeColors={currentTheme}
            icon={FiFilm}
            title="Video resolutions"
          >
            High-resolution recommended. 1080p, 1440p, 4K.
          </InfoBlock>
          <InfoBlock
            themeColors={currentTheme}
            icon={FiGrid}
            title="Aspect ratios"
          >
            Recommended. 16:9 for landscape, 9:16 for vertical videos.
          </InfoBlock>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className={`p-4 rounded-lg ${currentTheme.surface} border ${currentTheme.borderLight} flex flex-col sm:flex-row items-center justify-between gap-3`}
        >
          <div>
            <h3 className={`text-sm font-semibold ${currentTheme.textPrimary}`}>
              Create high quality videos on CapCut Online
            </h3>
            <p className={`text-xs ${currentTheme.textSecondary}`}>
              Automatically shorten your videos and create videos from scripts
              with AI-powered features.
            </p>
          </div>
          <a
            href="https://www.capcut.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md 
                                    ${currentTheme.accentBlue} hover:bg-blue-500/10 border border-blue-500/30 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400`}
          >
            Try now <FiExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>

      <ConfigurableModal
        isOpen={isEmbedModalOpenThisPage}
        onClose={() => setIsEmbedModalOpenThisPage(false)}
        title="Embed Media"
        themeColors={{
          // Pass the current client's modal-specific theme colors
          modalOverlayBg: currentTheme.modalOverlayBg,
          surface: currentTheme.modalSurface,
          border: currentTheme.modalBorder,
          textPrimary: currentTheme.modalTextPrimary,
          textSecondary: currentTheme.modalTextSecondary,
          iconColor: currentTheme.modalIconColor,
          closeButtonHoverBg: currentTheme.modalCloseButtonHoverBg,
        }}
        titleIcon={FiCode}
        modalMaxWidth="max-w-2xl"
      >
        {embedModalContent}
      </ConfigurableModal>
    </>
  );
}

LoyalShiftStudioPage.propTypes = {};
InfoBlock.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  themeColors: PropTypes.object.isRequired,
};
