// src/components/SchedulingEmbed.js
// UPDATED: Added useRef flag to handle StrictMode double effect invocation

import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FiLoader } from "react-icons/fi";

// Base styles remain the same
const baseLoadingStyle =
  "flex flex-col justify-center items-center h-full text-neutral-500 text-sm p-4 text-center";
const baseErrorStyle =
  "text-red-600 p-4 bg-red-100 border border-red-400 rounded text-sm";
const baseContainerStyle = {
  minWidth: "320px",
  minHeight: "400px",
  border: "1px solid #e2e8f0",
  borderRadius: "0.5rem",
  backgroundColor: "white",
};

const SchedulingEmbed = ({
  url,
  prefill = {},
  utm = {},
  style = {},
  resize = false,
  hideDetails = false,
  hideCookieBanner = false,
  loadingText = "Loading booking calendar...",
  errorTextLoad = "Failed to load Calendly script.",
  errorTextInit = "Error initializing scheduling widget.",
  errorTextInvalidUrl = "Error: Invalid Calendly Scheduling URL.",
}) => {
  const embedRef = useRef(null);
  // --- Add a ref to track initialization ---
  const isInitialized = useRef(false);
  // -----------------------------------------
  const WIDGET_SCRIPT_ID = "calendly-script";
  const WIDGET_SCRIPT_URL =
    "https://assets.calendly.com/assets/external/widget.js";

  const constructUrl = () => { /* ... URL construction logic remains the same ... */
    if (!url) return '';
    let finalUrl = url;
    const params = [];
    const isProfileOrTeamPage = !/\/.+\/.+/.test(url.split('calendly.com')[1] || '');
    if (hideDetails) {
        params.push(isProfileOrTeamPage ? 'hide_landing_page_details=1' : 'hide_event_type_details=1');
    }
    if (hideCookieBanner) {
      params.push('hide_gdpr_banner=1');
    }
    if (params.length > 0) {
      finalUrl += (url.includes('?') ? '&' : '?') + params.join('&');
    }
    return finalUrl;
  };

  const finalUrl = constructUrl();


  useEffect(() => {
    // Only proceed if the component is mounted and has a ref
    if (typeof window === "undefined" || !embedRef.current) {
        console.log("Effect skipped: Window undefined or embedRef missing.");
        return;
    };

    // Flag to prevent cleanup from trying to access potentially null ref later
    let isMounted = true;
    const currentEmbedRef = embedRef.current; // Capture ref value for cleanup closure

    const initializeWidget = () => {
      // --- Check the initialization flag ---
      if (isInitialized.current) {
          console.log("Initialization skipped: Already initialized.");
          return;
      }
      // -------------------------------------

      if (
        window.Calendly &&
        typeof window.Calendly.initInlineWidget === "function" &&
        currentEmbedRef // Check captured ref
      ) {
        console.log("Attempting to initialize Calendly widget with options:", { url: finalUrl, resize });
        try {
          window.Calendly.initInlineWidget({
            url: finalUrl,
            parentElement: currentEmbedRef, // Use captured ref
            prefill: prefill,
            utm: utm,
            resize: resize,
          });
          console.log("Calendly widget initialized.");
          // --- Set the flag after successful initialization ---
          isInitialized.current = true;
          // ----------------------------------------------------
          const loadingIndicator = currentEmbedRef.querySelector(".loading-indicator");
          if (loadingIndicator) {
            loadingIndicator.style.display = "none";
            console.log("Manual loader hidden.");
          }
        } catch (error) {
          console.error("Calendly initialization error:", error);
          if (isMounted && currentEmbedRef) { // Check mount status and ref
             currentEmbedRef.innerHTML = `<div class="${baseErrorStyle}">${errorTextInit} Check console.</div>`;
          }
        }
      } else {
        console.error("Initialization check failed: Calendly object/function not found or ref missing.");
         if (isMounted && currentEmbedRef) { // Check mount status and ref
            currentEmbedRef.innerHTML = `<div class="${baseErrorStyle}">Could not initialize widget.</div>`;
        }
      }
    };

    // Script Loading Logic
    let script = document.getElementById(WIDGET_SCRIPT_ID);
     let scriptAdded = false;

    if (script) {
       console.log("Calendly script tag already exists.");
       if (window.Calendly && typeof window.Calendly.initInlineWidget === 'function') {
          // If script and Calendly object exist, attempt init (respecting the flag)
          initializeWidget();
       } else {
          console.log("Existing script found, adding load listener.");
          script.addEventListener("load", initializeWidget, { once: true });
       }
    } else {
       console.log("Creating and appending Calendly script.");
       script = document.createElement("script");
       script.id = WIDGET_SCRIPT_ID;
       script.src = WIDGET_SCRIPT_URL;
       script.async = true;
       scriptAdded = true;
       script.onload = () => {
          console.log("Calendly script loaded successfully.");
          // Attempt init after load (respecting the flag)
          initializeWidget();
       };
       script.onerror = () => {
          console.error(`Failed to load Calendly script from ${WIDGET_SCRIPT_URL}`);
          if (isMounted && currentEmbedRef) { // Check mount status and ref
             currentEmbedRef.innerHTML = `<div class="${baseErrorStyle}">${errorTextLoad}</div>`;
          }
       };
       document.body.appendChild(script);
    }

    // Cleanup
    const currentScriptElement = script; // Capture script for cleanup
    return () => {
        isMounted = false; // Mark as unmounted
        console.log("Cleanup: SchedulingEmbed effect.");

        // Remove listener if we added one to an existing script
        if (currentScriptElement && !scriptAdded) { // Only remove if listener was added to existing script
             currentScriptElement.removeEventListener("load", initializeWidget);
             console.log("Cleanup: Removed load listener.");
        }

       // Clear the container's content on unmount
       // This is crucial for HMR and potentially helps with StrictMode cleanup
       if (currentEmbedRef) {
           console.log("Cleanup: Clearing Calendly container.");
           currentEmbedRef.innerHTML = '';
       }

       // Reset the initialized flag ONLY if the component truly unmounts.
       // This allows re-initialization if the component is removed and added back later.
       // Note: In StrictMode, the effect runs setup -> cleanup -> setup. This reset
       // allows the second setup run to proceed if needed.
       isInitialized.current = false;
       console.log("Cleanup: Reset initialized flag.");
    };

  }, [finalUrl, prefill, utm, resize, hideDetails, hideCookieBanner, errorTextLoad, errorTextInit]);

  // URL Validation remains the same
  if (!url || !url.startsWith("https://calendly.com/")) {
    return (
      <div className={baseErrorStyle}>
        {errorTextInvalidUrl} Must start with 'https://calendly.com/'.
      </div>
    );
  }

  // Render container remains the same
  return (
    <div
      ref={embedRef}
      className="calendly-inline-widget-container w-full"
      style={{ ...baseContainerStyle, ...style }}
    >
      <div className={`loading-indicator ${baseLoadingStyle}`}>
        <FiLoader className="animate-spin h-6 w-6 mb-3" />
        {loadingText}
      </div>
    </div>
  );
};

// PropTypes remain the same
SchedulingEmbed.propTypes = {
  url: PropTypes.string.isRequired,
  prefill: PropTypes.object,
  utm: PropTypes.object,
  style: PropTypes.object,
  resize: PropTypes.bool,
  hideDetails: PropTypes.bool,
  hideCookieBanner: PropTypes.bool,
  loadingText: PropTypes.string,
  errorTextLoad: PropTypes.string,
  errorTextInit: PropTypes.string,
  errorTextInvalidUrl: PropTypes.string,
};

export default SchedulingEmbed;
