// src/contexts/LocalizationContext.js
import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { isNil } from "lodash";
import { translations } from "../layouts/smb/translations"; // Adjust path as needed

const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to get the initial language from URL or default to 'en'
  const getInitialLang = () => {
    const langFromUrl = searchParams.get("lang");
    // Only accept 'en' or 'es' from the URL, otherwise default to 'en'
    if (langFromUrl === "es" || langFromUrl === "en") {
      return langFromUrl;
    }
    return "en";
  };

  const [currentLang, _setCurrentLang] = useState(getInitialLang);

  // When the component mounts, or if the URL param changes from external navigation,
  // sync the state.
  useEffect(() => {
    const langFromUrl = searchParams.get("lang");
    if ((langFromUrl === "es" || langFromUrl === "en") && langFromUrl !== currentLang) {
      _setCurrentLang(langFromUrl);
    }
  }, [searchParams, currentLang]);


  // Create a new function for setting the language that updates both state and URL
  const setCurrentLang = useCallback((lang) => {
    // Update the React state
    _setCurrentLang(lang);
    // Update the URL search parameter, preserving other existing params
    setSearchParams(prev => {
        prev.set("lang", lang);
        return prev;
    }, { replace: true }); // Use replace to avoid polluting browser history
  }, [setSearchParams]);


  const t = useCallback(
    (key, defaultValue, options) => {
      if (isNil(key)) {
        return defaultValue;
      }

      const path = key.split(".");
      
      const langToUse = translations[currentLang] ? currentLang : "en";

      let translatedValue = path.reduce(
        (obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined),
        translations[langToUse]
      );

      if (translatedValue === undefined && currentLang !== "en") {
        translatedValue = path.reduce(
          (obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined),
          translations.en
        );
      }
      
      let finalString = translatedValue ?? defaultValue ?? key;

      // Handle placeholder replacement, e.g., {count}
      if (options && typeof finalString === 'string') {
        Object.keys(options).forEach(optionKey => {
            finalString = finalString.replace(`{${optionKey}}`, options[optionKey]);
        });
      }

      return finalString;
    },
    [currentLang]
  );

  const value = {
    t,
    currentLang,
    setCurrentLang, // Provide the new wrapped function
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }
  return context;
};
