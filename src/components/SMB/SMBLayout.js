// src/layouts/smb/SMBLayout.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SMBHeader from "./SMBHeader";
import SMBFooter from "./SMBFooter";
import { useLocalization } from "../LocalizationContext";
import SMBStudioSideNavComponent from "./Studio/SMBStudioSideNavComponent";

export default function SMBLayout({ hasSideNav = false }) {
  const location = useLocation();
  const { currentLang, setCurrentLang } = useLocalization();

  const handleChangeLanguage = (lang) => {
    setCurrentLang(lang);
  };

  // Existing dark theme logic
  const exactPaths = [];
  const dynamicPaths = [];

  function matchesPathPattern(pathname, pattern) {
    const patternSegments = pattern.split("/");
    const regexString = patternSegments
      .map((segment) => {
        if (segment.startsWith(":")) {
          return "([^/]+)";
        }
        return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join("\\/");
    const regex = new RegExp(`^${regexString}\\/?$`);
    return regex.test(pathname);
  }

  const forceDarkTheme =
    exactPaths.includes(location.pathname) ||
    dynamicPaths.reduce(
      (previousValue, currentValue) =>
        previousValue || matchesPathPattern(location.pathname, currentValue),
      false
    );

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light dark:bg-neutral-dark-mode text-neutral-dark dark:text-neutral-light-mode">
      <SMBHeader
        forceDark={forceDarkTheme}
        currentLang={currentLang}
        onChangeLanguage={handleChangeLanguage}
      />

      {/* Main content area with sidebar */}
      <div className="flex flex-1">
        {hasSideNav ? <SMBStudioSideNavComponent /> : ""}
        <main className={`flex-1 ${hasSideNav ? "ml-64" : ""}`}>
          <Outlet context={{ currentLang }} />
          <SMBFooter forceDark={forceDarkTheme} currentLang={currentLang} />
        </main>
      </div>
    </div>
  );
}
