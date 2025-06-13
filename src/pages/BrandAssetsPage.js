// src/pages/BrandAssetsPage.js
// Page to display LoyalShift's brand assets: logos, colors, bio.
// UPDATED: Full implementation of helper components and placeholder content.
// Uses LoyalShift Dark Theme.
// Current time: Wednesday, May 7, 2025 at 8:40 AM CST.

import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiDownloadCloud,
  FiInfo,
  FiGrid,
  FiCopy,
  FiExternalLink,
  FiLayout,
  FiZap,
} from "react-icons/fi";

// Reusable Components (ensure paths are correct)
import Button from "../components/Button";
import Section from "../components/Section"; // Assuming this component is correctly defined and imported
import LoyalShiftSvgLogo from "../components/Logo"; // Assuming this component is correctly defined and imported

// --- Dark Theme Color Palette ---
const colors = {
  background: "bg-slate-900",
  surface: "bg-slate-800", // Surface for cards
  surfaceStrong: "bg-slate-800", // Used for some section backgrounds if different from cards
  primary: "text-cyan-400", // Main highlight/accent
  secondary: "text-slate-400", // Muted text
  textPrimary: "text-slate-100", // Main light text on dark backgrounds
  textWhite: "text-white", // Explicit white
  border: "border-slate-700", // Darker borders
  borderAccent: "border-cyan-500/50", // Subtle neon border accent
  iconColor: "text-cyan-400", // General icon color
  // Specific colors for the palette display
  loyalShiftBlue: {
    name: "LoyalShift Blue",
    hex: "#3b82f6",
    class: "bg-blue-500",
  },
  loyalShiftCyan: {
    name: "LoyalShift Cyan",
    hex: "#22d3ee",
    class: "bg-cyan-400",
  },
  loyalShiftDarkBg: {
    name: "Dark Background",
    hex: "#0f172a",
    class: "bg-slate-900",
  },
  loyalShiftSurfaceDark: {
    name: "Surface Dark",
    hex: "#1e293b",
    class: "bg-slate-800",
  }, // Renamed for clarity
  loyalShiftTextLight: {
    name: "Light Text",
    hex: "#f1f5f9",
    class: "bg-slate-100",
  },
  loyalShiftTextMuted: {
    name: "Muted Text",
    hex: "#94a3b8",
    class: "bg-slate-400",
  },
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Helper Component for Logo Download Item ---
const LogoDownloadItem = ({
  format,
  description,
  fileName,
  downloadUrl = "#",
}) => (
  <motion.div
    variants={fadeInUp}
    className={`p-4 rounded-lg ${colors.surface} border ${colors.border} flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-cyan-500/30 transition-colors`}
  >
    <div className="flex items-center gap-3 text-left">
      <span
        className={`text-xs font-semibold uppercase px-2.5 py-1 rounded-full ${colors.primary} bg-cyan-500/10 border border-cyan-500/30 flex-shrink-0`}
      >
        {format}
      </span>
      <div>
        <p className={`${colors.textPrimary} text-sm font-medium`}>
          {fileName || `LoyalShift Logo (${format})`}
        </p>
        <p className={`${colors.textSecondary} text-xs`}>{description}</p>
      </div>
    </div>
    <Button
      href={downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="secondary" // Assuming Button component has a suitable secondary style for dark theme
      size="base"
      icon={<FiDownloadCloud className="w-4 h-4" />}
      className={`w-full sm:w-auto !border-cyan-500/50 !text-cyan-400 hover:!bg-cyan-500/10 mt-2 sm:mt-0`}
    >
      Download
    </Button>
  </motion.div>
);
LogoDownloadItem.propTypes = {
  format: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fileName: PropTypes.string,
  downloadUrl: PropTypes.string,
};

// --- Helper Component for Color Swatch ---
const ColorSwatch = ({ name, hex, tailwindClass }) => (
  <motion.div variants={fadeInUp} className="text-center">
    <div
      className={`w-full h-24 md:h-32 rounded-lg shadow-md ${tailwindClass} border ${colors.border} flex items-center justify-center`}
    >
      {/* Optionally display hex on very light swatches if text is dark */}
      {/* <span className="text-xs text-black/50 p-1 bg-white/30 rounded">{hex}</span> */}
    </div>
    <p className={`mt-2 text-sm font-medium ${colors.textPrimary}`}>{name}</p>
    <p className={`text-xs ${colors.textSecondary} uppercase`}>{hex}</p>
  </motion.div>
);
ColorSwatch.propTypes = {
  name: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
  tailwindClass: PropTypes.string.isRequired,
};

// --- Main Brand Assets Page Component ---
export default function BrandAssetsPage() {
  const loyalShiftBio =
    "LoyalShift is the AI-powered platform dedicated to modernizing complex legacy enterprise systems. We enable organizations to unlock trapped value, enhance efficiency, and ensure future-readiness without the risks of full replacements. Our solutions, including Smart Mirror™, Universal Adapter™, and Audit Guardian™, provide a safe, phased approach to integrating cutting-edge AI and cloud capabilities with established infrastructure. We are at the heart of the AI revolution, empowering businesses to build an open and ethical AI future.";

  const handleCopyBio = () => {
    navigator.clipboard
      .writeText(loyalShiftBio)
      .then(() => alert("Bio copied to clipboard!")) // Replace with Toast notification if available
      .catch((err) => console.error("Failed to copy bio: ", err));
  };

  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      {/* Assuming main Layout provides Header & Footer */}
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.background}
          className="pt-24 md:pt-32 pb-16 md:pb-20"
          ariaLabelledby="brand-hero-title"
        >
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-6 rounded-full ${
                colors.surfaceStrong
              } border ${colors.borderAccent} ${
                colors.neonGlowCyan || "shadow-lg"
              }`}
            >
              <FiLayout className={`w-12 h-12 ${colors.iconColor}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="brand-hero-title"
              className={`text-4xl md:text-5xl font-bold ${colors.textWhite} mb-4 [text-shadow:0_0_10px_rgba(34,211,238,0.5)]`}
            >
              LoyalShift Brand Assets
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              Find official LoyalShift logos, colors, and our company bio here.
              Please adhere to our brand guidelines when using these assets.
            </motion.p>
          </motion.div>
        </Section>

        {/* Logos Section */}
        <Section
          bg={colors.surfaceStrong}
          className={`border-y ${colors.border}`}
          ariaLabelledby="logos-title"
        >
          <motion.h2
            variants={fadeInUp}
            id="logos-title"
            className={`text-3xl font-bold ${colors.textWhite} text-center mb-12`}
          >
            Our Logo
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={fadeInUp}
              className={`p-8 md:p-12 rounded-xl ${colors.surface} border ${colors.borderAccent} mb-10 flex flex-col items-center shadow-xl`}
            >
              <LoyalShiftSvgLogo height="80" className="mb-6" />
              <p
                className={`${colors.textSecondary} text-sm text-center max-w-md mb-4`}
              >
                Our primary logo. Please maintain clear space around it and do
                not alter its proportions or colors. For specific use cases or
                variations, please contact us.
              </p>
              <div
                className={`mt-4 p-4 rounded-md ${colors.surfaceStrong} border ${colors.border} max-w-md w-full`}
              >
                <div className="flex items-start text-sm">
                  <FiZap
                    className={`w-5 h-5 ${colors.primary} mr-3 mt-0.5 flex-shrink-0`}
                  />
                  <p className={`${colors.textSecondary} leading-relaxed`}>
                    <strong className={colors.textPrimary}>
                      A Note on Inspiration:
                    </strong>{" "}
                    Our logo's dynamic form is inspired by the innovative spirit
                    of technologies like Google's Gemini, which has
                    significantly enhanced our development workflows and
                    collaborative capabilities within the Google Workspace
                    environment. It represents our commitment to
                    forward-thinking AI solutions.
                  </p>
                </div>
              </div>
            </motion.div>
            <div className="space-y-4">
              <LogoDownloadItem
                format="SVG"
                description="Scalable vector graphic, best for web and print."
                fileName="loyalshift-logo.svg"
                downloadUrl="/images/logo.svg"
              />
              <LogoDownloadItem
                format="PNG"
                description="High-resolution raster, transparent background (for dark backgrounds)."
                fileName="loyalshift-logo-dark-bg.png"
                downloadUrl="/images/Financial/loyalshift-logo-white-transparent.png"
              />{" "}
              {/* Placeholder - use actual white/light logo */}
              <LogoDownloadItem
                format="PNG (Light BG)"
                description="For use on light backgrounds (logo in dark/color)."
                fileName="loyalshift-logo-light-bg.png"
                downloadUrl="/images/Financial/loyalshift-logo-color-transparent.png"
              />{" "}
              {/* Placeholder - use actual color logo */}
            </div>
          </div>
        </Section>

        {/* Colors Section */}
        <Section ariaLabelledby="colors-title">
          <motion.h2
            variants={fadeInUp}
            id="colors-title"
            className={`text-3xl font-bold ${colors.textWhite} text-center mb-12`}
          >
            Brand Colors
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-5xl mx-auto">
            <ColorSwatch
              name={colors.loyalShiftBlue.name}
              hex={colors.loyalShiftBlue.hex}
              tailwindClass={colors.loyalShiftBlue.class}
            />
            <ColorSwatch
              name={colors.loyalShiftCyan.name}
              hex={colors.loyalShiftCyan.hex}
              tailwindClass={colors.loyalShiftCyan.class}
            />
            <ColorSwatch
              name={colors.loyalShiftDarkBg.name}
              hex={colors.loyalShiftDarkBg.hex}
              tailwindClass={colors.loyalShiftDarkBg.class}
            />
            <ColorSwatch
              name={colors.loyalShiftSurfaceDark.name}
              hex={colors.loyalShiftSurfaceDark.hex}
              tailwindClass={colors.loyalShiftSurfaceDark.class}
            />
            <ColorSwatch
              name={colors.loyalShiftTextLight.name}
              hex={colors.loyalShiftTextLight.hex}
              tailwindClass={colors.loyalShiftTextLight.class}
            />
            <ColorSwatch
              name={colors.loyalShiftTextMuted.name}
              hex={colors.loyalShiftTextMuted.hex}
              tailwindClass={colors.loyalShiftTextMuted.class}
            />
          </div>
        </Section>

        {/* Bio Section */}
        <Section
          bg={colors.surfaceStrong}
          className={`border-y ${colors.border}`}
          ariaLabelledby="bio-title"
        >
          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <FiInfo className={`w-10 h-10 ${colors.iconColor} mx-auto mb-4`} />
            <h2
              id="bio-title"
              className={`text-3xl font-bold ${colors.textWhite} mb-6`}
            >
              About LoyalShift
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-8`}
            >
              {loyalShiftBio}
            </p>
            <Button
              onClick={handleCopyBio}
              variant="secondary"
              size="lg"
              icon={<FiCopy />}
              className={`!border-cyan-500/50 !text-cyan-400 hover:!bg-cyan-500/10`} // Custom secondary style
            >
              Copy Bio to Clipboard
            </Button>
          </motion.div>
        </Section>

        {/* Brand Universe / Other Assets (Placeholder) */}
        <Section ariaLabelledby="universe-title">
          <motion.div
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <FiGrid className={`w-10 h-10 ${colors.iconColor} mx-auto mb-4`} />
            <h2
              id="universe-title"
              className={`text-3xl font-bold ${colors.textWhite} mb-6`}
            >
              LoyalShift Universe
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-8`}
            >
              This section can be expanded to include other brand assets such as
              approved product imagery, iconography guidelines, presentation
              templates, or mascot graphics if applicable.
            </p>
            <Button
              to="/contact?subject=BrandAssetInquiry"
              variant="secondary"
              size="lg"
              icon={<FiExternalLink />}
            >
              Inquire About Other Assets
            </Button>
          </motion.div>
        </Section>

        {/* Timestamp Info */}
        <p
          className={`relative z-10 text-center text-sm ${colors.textSecondary} mt-12 pb-12 flex items-center justify-center gap-1.5`}
        >
          <FiInfo size={14} /> Page generated: {currentTime}
        </p>
      </main>
    </div>
  );
}

// --- PropTypes ---
BrandAssetsPage.propTypes = {};
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};
// Assuming Button, LoyalShiftSvgLogo have their own PropTypes
