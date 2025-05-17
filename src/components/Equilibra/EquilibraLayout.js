// src/components/Equilibra/Layout.js
// Main layout component for the Equilibra CR section.
// Includes Header, Footer, Outlet for page content, and Floating Newsletter CTA.
// Uses the Equilibra CR light theme.
// Current time: Friday, May 16, 2025 at 3:45 PM CST.

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // For notifications

// Equilibra CR specific components
import EquilibraHeader from "./EquilibraHeader"; // Assuming Header.js is in the same directory
import EquilibraFooter from "./EquilibraFooter"; // Assuming Footer.js is in the same directory

// Reusable utility components
import useMediaQuery from "../../hooks/use-media-query"; // Adjust path as needed
import LoyalShiftDesktopViewMessage from "../LoyalShiftDesktopViewMessage"; // Using generic, can be customized further if needed
import NewsletterCtaFloating from "./NewsletterCTAFloating";
import BackToLoyalShiftToast from "../BackToLoyalShiftToast";

// Equilibra CR Logo for DesktopViewMessage
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.png";

// --- Equilibra CR New Color Palette (for base background) ---
const colors = {
  background: "bg-[#FFF7F2]", // Neutral Light – Cream White
  // Other colors are handled within individual components (Header, Footer, Pages)
};

export default function EquilibraLayout() {
  const exactPaths = [];

  const dynamicPaths = [];
  /**
   * Checks if a given pathname matches a specified pattern containing dynamic parameters (e.g., /path/:id).
   *
   * @param {string} pathname - The actual URL pathname to test (e.g., '/jobs/pm-ai-platforms').
   * @param {string} pattern - The pattern string to match against (e.g., '/jobs/:jobId').
   * Dynamic segments should start with a colon ':'.
   * @returns {boolean} - True if the pathname matches the pattern, false otherwise.
   */
  function matchesPathPattern(pathname, pattern) {
    // Escape special regex characters in the pattern segments (safer)
    // Split pattern by '/'
    const patternSegments = pattern.split("/");

    // Build the regex string segment by segment
    const regexString = patternSegments
      .map((segment) => {
        if (segment.startsWith(":")) {
          // If it's a dynamic parameter (e.g., :jobId), match one or more characters that are NOT slashes
          return "([^/]+)"; // Capture group for one or more non-slash characters
        }
        // Otherwise, it's a literal segment. Escape special regex chars within it.
        // Basic escaping for common characters, can be made more robust if needed.
        return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join("\\/"); // Join segments back with escaped slashes

    // Create the final regex: must match the start (^) and end ($), allowing an optional trailing slash
    // Example pattern '/jobs/:jobId' becomes regex string '^\\/jobs\\/([^/]+)\\/?$'
    const regex = new RegExp(`^${regexString}\\/?$`); // Added \\/? to allow optional trailing slash

    // Test the pathname against the created regex
    return regex.test(pathname);
  }

  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)"); // md breakpoint

  const forceDarkTheme =
    exactPaths.includes(location.pathname) ||
    dynamicPaths.reduce(
      (previousValue, currentValue) =>
        previousValue || matchesPathPattern(location.pathname, currentValue),
      false
    );

  // Estimate header height for main content padding-top.
  // Based on EquilibraHeader: py-3 md:py-3.5 + 1px border.
  // py-3 is 12px top/bottom = 24px + 1 = 25px.
  // py-3.5 is 14px top/bottom = 28px + 1 = 29px.
  // Let's use a general offset, can be fine-tuned.
  const headerHeightDesktop = "65px"; // Approximate height of desktop header
  const headerHeightMobile = "60px"; // Approximate height of mobile header

  return (
    <div className={`min-h-screen flex flex-col ${colors.background}`}>
      <EquilibraHeader />
      <main
        className="flex-grow"
        style={{
          paddingTop: isMobile ? headerHeightMobile : headerHeightDesktop,
        }}
      >
        {isMobile ? (
          <LoyalShiftDesktopViewMessage
            clientName="Equilibra CR" // Customize for Equilibra
            clientLogoUrl={equilibraLogoPath}
            // Optional: Provide a more specific message for Equilibra
            message="La experiencia Equilibra Contigo está optimizada para visualización en escritorio. Por favor, acceda desde una computadora."
          />
        ) : (
          <Outlet /> // Renders the specific page component for the current route
        )}
      </main>
      <BackToLoyalShiftToast
        targetUrl="/demo/equilibra/cta"
        theme={forceDarkTheme ? "light" : "dark"}
      />
      {!isMobile && <NewsletterCtaFloating />}{" "}
      {/* Show CTA only on non-mobile */}
      <EquilibraFooter />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#FFFFFF", // White background for toasts
            color: "#5C5C5C", // Warm Gray text
            border: "1px solid #F7C6B7", // Blush Pink border
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#059669", // Emerald for success icon
              secondary: "#FFF7F2",
            },
          },
          error: {
            iconTheme: {
              primary: "#E86F51", // Coral Red for error icon
              secondary: "#FFF7F2",
            },
          },
        }}
      />
    </div>
  );
}
