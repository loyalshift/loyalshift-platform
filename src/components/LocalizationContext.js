// src/contexts/LocalizationContext.js
import React, { createContext, useContext, useCallback, useState } from "react";
import { isNil } from "lodash";
import { translations } from "../layouts/smb/translations";

const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState("en");

  const t = useCallback(
    (key, defaultValue) => {
      if (isNil(key)) {
        return defaultValue;
      }

      const path = key.split(".");

      let translatedValue = path.reduce(
        (obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined),
        translations[currentLang]
      );

      if (translatedValue === undefined && currentLang !== "en") {
        translatedValue = path.reduce(
          (obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined),
          translations.en
        );
      }

      return translatedValue ?? defaultValue ?? key;
    },
    [currentLang]
  );

  const value = {
    t,
    currentLang,
    setCurrentLang,
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
