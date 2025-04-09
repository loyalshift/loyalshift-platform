// src/hooks/useMediaQuery.js
import { useState, useEffect } from "react";

/**
 * Custom hook to track the state of a CSS media query.
 *
 * @param {string} query - The media query string to watch (e.g., '(min-width: 768px)').
 * @param {boolean} [defaultValue=false] - The default value to return during SSR or before the first client-side check.
 * @returns {boolean} - `true` if the media query matches, `false` otherwise.
 */
function useMediaQuery(query, defaultValue = false) {
  // State to hold the match status. Initialize lazily based on the current match status.
  const [matches, setMatches] = useState(() => {
    // Check if window is defined (avoids SSR errors)
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function"
    ) {
      return window.matchMedia(query).matches;
    }
    // Return default value during SSR or if matchMedia is unavailable
    return defaultValue;
  });

  useEffect(() => {
    // Ensure window and matchMedia are available (client-side)
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      // If environment changes post-mount (unlikely but safe), reset to default
      if (matches !== defaultValue) setMatches(defaultValue);
      return; // Exit if not in a browser environment
    }

    const mediaQueryList = window.matchMedia(query);

    // Handler function to update state when the media query status changes
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // --- Sync state immediately on mount ---
    // This ensures the state is correct even if the lazy initializer ran differently
    // (e.g., during hydration mismatch or if the query prop changes).
    setMatches(mediaQueryList.matches);

    // --- Add the event listener ---
    // Use the modern addEventListener if available, otherwise fallback to addListener (needed for Safari < 14)
    let isUsingDeprecatedListener = false;
    try {
      // Try modern API first
      mediaQueryList.addEventListener("change", handleChange);
    } catch (e1) {
      try {
        // Fallback for older browsers
        mediaQueryList.addListener(handleChange);
        isUsingDeprecatedListener = true;
      } catch (e2) {
        console.error(
          "useMediaQuery: Neither addEventListener nor addListener are supported.",
          e2
        );
      }
    }

    // --- Cleanup function ---
    // Remove the listener when the component unmounts or the query changes
    return () => {
      if (isUsingDeprecatedListener) {
        mediaQueryList.removeListener(handleChange);
      } else {
        try {
          mediaQueryList.removeEventListener("change", handleChange);
        } catch (e) {
          console.error("useMediaQuery: Error removing event listener.", e);
        }
      }
    };
  }, [query, defaultValue, matches]); // Re-run effect if the query or default value changes (matches added for safety)

  return matches;
}

export default useMediaQuery;
