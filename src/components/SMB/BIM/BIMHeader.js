import React, { useState } from "react";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";
import { Link } from "react-router-dom";
import {
  FiBox,
  FiChevronDown,
  FiSearch,
  FiGlobe,
  FiMenu,
} from "react-icons/fi";
import Button from "../../Button";
import { useLocalization } from "../../LocalizationContext";

const theme = loyalShiftV2Theme;

// --- Header Component (mimicking bimobject.com header) ---
export default function BIMLibraryHeader({
  searchTerm,
  onSearchTermChange,
  onSearchSubmit,
}) {
  const { t } = useLocalization();
  // Placeholder for "Software" dropdown and other header items
  const [isSoftwareDropdownOpen, setIsSoftwareDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  // In a real app, these would come from user context or settings
  const currentCountry = {
    code: "CR",
    nameKey: "country.costaRica",
    defaultName: "Costa Rica",
  };
  const currentLanguage = {
    code: "US",
    nameKey: "language.englishUS",
    defaultName: "English (US)",
  };

  return (
    <header
      className={`${theme.surfaceCard} py-3 border-b ${theme.borderLight} shadow-sm sticky top-0 z-40`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <Link
          to="/smb/bim"
          className={`text-2xl font-bold ${theme.textPrimary} flex items-center`}
        >
          <FiBox className={`w-7 h-7 mr-2 ${theme.textHighlight}`} />
          LoyalShift <span className={theme.textHighlight}>BIM</span>
        </Link>

        <div className="flex-grow hidden md:flex items-center gap-4 max-w-xl">
          <div className="relative">
            <button
              onClick={() => setIsSoftwareDropdownOpen(!isSoftwareDropdownOpen)}
              className={`px-3 py-2 text-sm ${theme.textSecondary} hover:${theme.textPrimary} flex items-center rounded-md hover:${theme.surfaceMuted} ${theme.focusRingDefault}`}
            >
              {t("smbBim.header.software", "Software")}{" "}
              <FiChevronDown
                className={`w-4 h-4 ml-1 transition-transform ${
                  isSoftwareDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Software Dropdown Content - Placeholder */}
          </div>
          <form onSubmit={onSearchSubmit} className="flex-grow flex">
            <input
              type="search"
              value={searchTerm}
              onChange={onSearchTermChange}
              placeholder={t(
                "smbBim.header.searchPlaceholder",
                "Search BIM objects, categories or brands"
              )}
              className={`w-full px-4 py-2 text-sm ${theme.inputBg} ${theme.inputBorder} rounded-l-md ${theme.inputFocusStyle} ${theme.textPrimary}`}
            />
            <button
              type="submit"
              className={`${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} px-4 rounded-r-md ${theme.buttonPrimaryHoverBg} ${theme.focusRingDefault} text-sm font-semibold flex items-center`}
            >
              <FiSearch className="w-4 h-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">
                {t("smbBim.header.searchButton", "Search")}
              </span>
            </button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/smb/bim/publish"
            className={`hidden lg:block px-3 py-1.5 text-xs font-medium ${theme.textSecondary} hover:${theme.textPrimary} hover:${theme.surfaceMuted} rounded-md`}
          >
            {t("smbBim.header.publishProducts", "Publish your products")}
          </Link>
          {/* Country/Lang Selectors - Placeholders */}
          <button
            className={`hidden sm:flex items-center px-2 py-1.5 text-xs ${theme.textSecondary} hover:${theme.textPrimary} rounded-md hover:${theme.surfaceMuted}`}
          >
            <FiGlobe className="w-3.5 h-3.5 mr-1" />{" "}
            {t(currentCountry.nameKey, currentCountry.defaultName)}
          </button>
          <button
            className={`hidden sm:flex items-center px-2 py-1.5 text-xs ${theme.textSecondary} hover:${theme.textPrimary} rounded-md hover:${theme.surfaceMuted}`}
          >
            {t(currentLanguage.nameKey, currentLanguage.defaultName)}{" "}
            <FiChevronDown className="w-3 h-3 ml-1" />
          </button>
          <Button
            to="/login"
            variant="text"
            className={`!px-3 !py-1.5 !text-sm ${theme.buttonTextLink} ${theme.buttonTextLinkHover} hidden md:inline-flex`}
          >
            {t("smbBim.header.login", "Log in")}
          </Button>
          <Button
            to="/signup"
            variant="primary"
            size="sm"
            className="!px-4 !py-1.5 !text-xs sm:!text-sm"
          >
            {" "}
            {/* Primary button from theme */}
            {t("smbBim.header.signup", "Free sign up")}
          </Button>
          <button
            className={`p-2 rounded-md md:hidden ${theme.textSecondary} hover:${theme.textPrimary} hover:${theme.surfaceMuted}`}
          >
            <FiMenu className="w-5 h-5" /> {/* Mobile Menu Trigger */}
          </button>
        </div>
      </div>
    </header>
  );
}
