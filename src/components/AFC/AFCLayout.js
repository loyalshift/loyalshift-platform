import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AFCHeader from "./AFCHeader";
import BackToLoyalShiftToast from "../BackToLoyalShiftToast";
import AFCFooter from "./AFCFooter";

export default function AFCLayout() {
  const location = useLocation(); // Get location object
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

    const regex = new RegExp(`^${regexString}\\/?$`);

    // Test the pathname against the created regex
    return regex.test(pathname);
  }

  // Check if the current path is one of the exact paths OR matches the dynamic pattern
  const forceDarkTheme =
    exactPaths.includes(location.pathname) ||
    dynamicPaths.reduce(
      (previousValue, currentValue) =>
        previousValue || matchesPathPattern(location.pathname, currentValue),
      false
    );

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <AFCHeader forceDark={forceDarkTheme} />
      <main className="flex-grow">
        {/* {isMobile ? <DesktopViewMessage /> : <Outlet />} */}
        <Outlet />
      </main>
      <BackToLoyalShiftToast
        targetUrl="/demo/afc/cta"
        theme={forceDarkTheme ? "light" : "dark"}
      />
      <AFCFooter />
    </div>
  );
}
