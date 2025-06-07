// Main Page: src/pages/BIMLibraryPage.js
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom"; // Assuming you use React Router for navigation
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";

// --- Icons (from react-icons/fi) ---
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronRight,
  FiDownload,
  FiPlusSquare,
  FiStar,
  FiGlobe,
  FiBox,
  FiGrid,
  FiTag,
  FiHardDrive,
  FiCheckCircle,
  FiEye,
  FiLoader,
  FiChevronLeft,
} from "react-icons/fi";
import { useLocalization } from "../../components/LocalizationContext";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";
import PropTypes from "prop-types";

const theme = loyalShiftV2Theme; // Alias for convenience, now using loyalShiftV2Theme

const MOCK_AVAILABLE_COUNTRIES = [
  { nameKey: "country.costaRica", code: "CR", defaultName: "Costa Rica" },
  { nameKey: "country.usa", code: "US", defaultName: "United States" },
  { nameKey: "country.panama", code: "PA", defaultName: "Panama" },
  { nameKey: "country.mexico", code: "MX", defaultName: "Mexico" },
  { nameKey: "country.germany", code: "DE", defaultName: "Germany" },
  { nameKey: "country.sweden", code: "SE", defaultName: "Sweden" },
  {
    nameKey: "country.global",
    code: "GLOBAL",
    defaultName: "Global Availability",
  }, // For globally available items
];

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// --- FilterSidebar Component ---
const FilterSidebar = ({ t }) => {
  const FilterGroup = ({ titleKey, defaultTitle, children, count }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className={`py-4 border-b ${theme.borderLight}`}>
        <button
          className="w-full flex justify-between items-center text-left"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <h3 className={`text-sm font-semibold ${theme.textPrimary}`}>
            {t(titleKey, defaultTitle)}
          </h3>
          <FiChevronDown
            className={`w-4 h-4 ${
              theme.textMuted
            } transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 space-y-2 overflow-hidden"
            >
              {children}
              {count && (
                <button className={`text-xs ${theme.linkStyle} mt-2`}>
                  {t(count.viewAllKey, count.defaultViewAll, {
                    count: count.value,
                  })}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const filterItems = [
    { label: "Brand A", count: 120 },
    { label: "Brand B", count: 95 },
    { label: "Brand C", count: 88 },
  ];
  const categoryItems = [
    { label: "Doors", count: 350 },
    { label: "Windows", count: 420 },
    { label: "Furniture", count: 610 },
  ];

  return (
    <motion.aside
      className={`w-full md:w-72 lg:w-80 p-6 ${theme.surfaceCard} rounded-xl shadow-lg border ${theme.borderLight} h-fit sticky top-28`}
      variants={fadeInUp}
    >
      <h2
        className={`text-lg font-semibold ${theme.textPrimary} mb-4 flex items-center`}
      >
        <FiFilter className="w-5 h-5 mr-2" />{" "}
        {t("bimLibrary.filtersTitle", "Filter Assets")}
      </h2>

      <FilterGroup
        titleKey="bimLibrary.filterSustainability"
        defaultTitle="Sustainability"
      >
        <label className={`flex items-center text-sm ${theme.textSecondary}`}>
          <input
            type="checkbox"
            className={`form-checkbox h-4 w-4 ${theme.textHighlight} rounded mr-2 ${theme.inputFocusRing}`}
          />{" "}
          {/* Changed accentCyan to textHighlight for checkbox color */}
          LEED Certified
        </label>
        <label className={`flex items-center text-sm ${theme.textSecondary}`}>
          <input
            type="checkbox"
            className={`form-checkbox h-4 w-4 ${theme.textHighlight} rounded mr-2 ${theme.inputFocusRing}`}
          />{" "}
          {/* Changed accentCyan to textHighlight */}
          Recycled Materials
        </label>
      </FilterGroup>

      <FilterGroup
        titleKey="bimLibrary.filterBrandsTitle"
        defaultTitle="Brands"
        count={{
          value: 2379,
          viewAllKey: "bimLibrary.filterBrandsViewAll",
          defaultViewAll: "View all ({count} brands)",
        }}
      >
        {filterItems.map((item) => (
          <label
            key={item.label}
            className={`flex items-center text-sm ${theme.textSecondary} justify-between hover:${theme.surfaceMuted} p-1 rounded`}
          >
            {" "}
            {/* Used surfaceMuted for hover */}
            <span>{item.label}</span>
            <span className={theme.textMuted}>{item.count}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup
        titleKey="bimLibrary.filterCategoriesTitle"
        defaultTitle="Categories"
        count={{
          value: 23,
          viewAllKey: "bimLibrary.filterCategoriesViewAll",
          defaultViewAll: "View all ({count} categories)",
        }}
      >
        {categoryItems.map((item) => (
          <label
            key={item.label}
            className={`flex items-center text-sm ${theme.textSecondary} justify-between hover:${theme.surfaceMuted} p-1 rounded`}
          >
            {" "}
            {/* Used surfaceMuted for hover */}
            <span>{item.label}</span>
            <span className={theme.textMuted}>{item.count}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup
        titleKey="bimLibrary.filterManufacturedInTitle"
        defaultTitle="Manufactured In"
      >
        <p className={`text-xs ${theme.textMuted}`}>Country filters here...</p>
      </FilterGroup>
      <FilterGroup
        titleKey="bimLibrary.filterFileTypeTitle"
        defaultTitle="File Type"
      >
        <p className={`text-xs ${theme.textMuted}`}>
          File type checkboxes here...
        </p>
      </FilterGroup>
    </motion.aside>
  );
};

// --- AssetCard Component ---
const AssetCard = ({ asset, t }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className={`group relative flex flex-col ${theme.surfaceCard} rounded-xl border ${theme.border} shadow-sm overflow-hidden transition-all duration-300 ${theme.cardHoverShadow} hover:${theme.borderLight} hover:border-cyan-500/30`} // Used theme.border for default
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
    >
      {asset.isPromoted && (
        <div
          className={`absolute top-2 right-2 z-10 px-2 py-0.5 text-xs font-semibold ${theme.badgeGradient} ${theme.darkTextForAmber} rounded-full shadow-sm`}
        >
          {t("bimLibrary.promotedLabel", "Promoted")}
        </div>
      )}
      <div className="aspect-w-16 aspect-h-9 overflow-hidden relative">
        <img
          src={asset.imageUrl}
          alt={t(asset.titleKey, asset.defaultTitle)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-3"
            >
              <Link
                to={`/bim-library/asset/${asset.id}`}
                className={`text-xs ${theme.buttonTextLight} ${theme.accentCyanBg} ${theme.accentCyanBgHover} rounded-md px-3 py-1.5 font-medium text-center mb-1.5 opacity-90 hover:opacity-100 transition-opacity`}
              >
                {t("bimLibrary.assetCardViewDetails", "View Details")}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className={`text-xs font-medium ${theme.textMuted} mb-0.5`}>
          {t(asset.manufacturerKey, asset.defaultManufacturer)}
        </p>
        <h3
          className={`text-md font-semibold ${theme.textPrimary} mb-1 truncate group-hover:${theme.textHighlight} transition-colors`}
        >
          <Link to={`/bim-library/asset/${asset.id}`}>
            {t(asset.titleKey, asset.defaultTitle)}
          </Link>
        </h3>
        <p className={`text-xs ${theme.textSecondary} mb-3 truncate`}>
          {t(asset.detailsKey, asset.defaultDetails)}
        </p>

        {asset.rating && (
          <div
            className={`flex items-center text-xs ${theme.textHighlightAmber} mb-3`}
          >
            {[...Array(Math.floor(asset.rating))].map((_, i) => (
              <FiStar key={`full-${i}`} className="w-3.5 h-3.5 fill-current" />
            ))}
            {asset.rating % 1 >= 0.5 && (
              <FiStar
                key="half"
                className="w-3.5 h-3.5 fill-current opacity-50"
              />
            )}
            {[...Array(5 - Math.ceil(asset.rating))].map((_, i) => (
              <FiStar
                key={`empty-${i}`}
                className="w-3.5 h-3.5 text-gray-300"
              />
            ))}
            <span className={`ml-1.5 ${theme.textMuted}`}>
              ({asset.reviews || 0})
            </span>
          </div>
        )}

        <div className="mt-auto flex flex-col sm:flex-row gap-2 pt-3 border-t ${theme.borderLight}">
          <Button
            variant="secondary"
            size="sm"
            className={`w-full !py-2 !text-xs ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} border ${theme.buttonSecondaryBorder} hover:${theme.buttonSecondaryHoverBorder}`}
          >
            <FiPlusSquare className="w-3.5 h-3.5 mr-1.5" />
            {t("bimLibrary.assetCardAddToProject", "Add to Project")}
          </Button>
          <Button
            variant="primary"
            size="sm"
            className={`w-full !py-2 !text-xs ${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg}`} // Using new primary button theme
          >
            <FiDownload className="w-3.5 h-3.5 mr-1.5" />
            {t("bimLibrary.assetCardDownload", "Download")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
AssetCard.propTypes = {
  asset: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

// --- AssetGridControls Component ---
const AssetGridControls = ({
  t,
  onSortChange,
  onCountryFilterChange,
  currentCountry,
}) => {
  return (
    <motion.div
      className={`mb-6 md:mb-8 p-4 rounded-lg ${theme.surfaceMuted} border ${theme.borderLight} flex flex-col sm:flex-row justify-between items-center gap-4`}
      variants={fadeInUp}
    >
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="country-filter"
          className={`form-checkbox h-4 w-4 ${theme.textHighlight} rounded ${theme.inputFocusRing}`}
          onChange={onCountryFilterChange}
        />{" "}
        {/* Changed accentCyan to textHighlight */}
        <label
          htmlFor="country-filter"
          className={`text-sm ${theme.textSecondary}`}
        >
          {t(
            "bimLibrary.filterOnlyInCountry",
            "Only include products available in {country}",
            { country: currentCountry || "your region" }
          )}
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="sort-by" className={`text-sm ${theme.textSecondary}`}>
          {t("bimLibrary.sortByLabel", "Sort by:")}
        </label>
        <select
          id="sort-by"
          onChange={onSortChange}
          className={`text-sm ${theme.inputBg} ${theme.inputBorder} rounded-md py-1.5 px-2 ${theme.inputFocusStyle} ${theme.textPrimary}`}
        >
          <option value="trending">
            {t("bimLibrary.sortTrending", "Trending")}
          </option>
          <option value="newest">{t("bimLibrary.sortNewest", "Newest")}</option>
          <option value="popular">
            {t("bimLibrary.sortPopular", "Most Popular")}
          </option>
        </select>
      </div>
    </motion.div>
  );
};

// --- Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange, t }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const buttonBase = `px-3 py-1.5 text-sm font-medium rounded-md border transition-colors duration-150 ease-in-out ${theme.focusRingDefault}`; // Using focusRingDefault
  const activePageButton = `${theme.buttonPrimaryBg} ${theme.buttonPrimaryText}`; // Using new primary button theme
  const inactivePageButton = `${theme.surfaceCard} ${theme.textSecondary} ${theme.border} hover:${theme.surfaceMuted}`;
  const disabledButton = `opacity-50 cursor-not-allowed ${theme.surfaceMuted} ${theme.textMuted} ${theme.border}`;

  return (
    <motion.nav
      className="mt-8 md:mt-12 flex items-center justify-center space-x-1 sm:space-x-2"
      aria-label={t("bimLibrary.paginationNavAriaLabel", "Asset pagination")}
      variants={fadeInUp}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonBase} ${
          currentPage === 1 ? disabledButton : inactivePageButton
        }`}
        aria-label={t("bimLibrary.paginationPrevious", "Previous page")}
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`${buttonBase} ${inactivePageButton}`}
          >
            1
          </button>
          {startPage > 2 && (
            <span className={`px-1.5 py-1.5 text-sm ${theme.textMuted}`}>
              ...
            </span>
          )}
        </>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${buttonBase} ${
            currentPage === number ? activePageButton : inactivePageButton
          }`}
          aria-current={currentPage === number ? "page" : undefined}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className={`px-1.5 py-1.5 text-sm ${theme.textMuted}`}>
              ...
            </span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`${buttonBase} ${inactivePageButton}`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonBase} ${
          currentPage === totalPages ? disabledButton : inactivePageButton
        }`}
        aria-label={t("bimLibrary.paginationNext", "Next page")}
      >
        <FiChevronRight className="w-4 h-4" />
      </button>
    </motion.nav>
  );
};
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

// --- Main BIMLibraryPage Component ---
export default function BIMLibraryPage() {
  const { t } = useLocalization();
  const [allAssets, setAllAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableCountries] = useState(MOCK_AVAILABLE_COUNTRIES);
  const [currentCountry, setCurrentCountry] = useState("Sweden");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const mockAssetsList = Array.from({ length: 34 }, (_, i) => ({
        id: `${i + 1}`,
        imageUrl: `https://placehold.co/600x400/${theme.inputBorder
          .replace("border-", "")
          .replace("/70", "")}/${theme.textMuted.replace(
          "text-",
          ""
        )}?text=BIM+Asset+${i + 1}`, // Using theme colors for placeholder
        manufacturerKey: "bimLibrary.brand.generic",
        defaultManufacturer: `Manufacturer ${String.fromCharCode(
          65 + (i % 5)
        )}`,
        titleKey: `bimLibrary.asset.item${i + 1}.title`,
        defaultTitle: `Asset Item ${i + 1}`,
        detailsKey: `bimLibrary.asset.item${i + 1}.details`,
        defaultDetails: `Details for asset item ${i + 1}`,
        rating: 3.5 + (i % 15) / 10, // Keep as number for Math.floor
        reviews: 50 + i * 5,
        isPromoted: i % 7 === 0,
        availableInCountries: MOCK_AVAILABLE_COUNTRIES.slice(
          i % 3,
          (i % 3) + Math.max(1, i % 4)
        ).map((c) => c.code), // Example distribution
      }));
      setAllAssets(mockAssetsList);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginatedAssets = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredAssets = allAssets.filter(
      (asset) =>
        t(asset.titleKey, asset.defaultTitle)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        t(asset.manufacturerKey, asset.defaultManufacturer)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    return filteredAssets.slice(indexOfFirstItem, indexOfLastItem);
  }, [allAssets, currentPage, itemsPerPage, searchTerm, t]);

  const totalPages = useMemo(() => {
    const filteredAssets = allAssets.filter(
      (asset) =>
        t(asset.titleKey, asset.defaultTitle)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        t(asset.manufacturerKey, asset.defaultManufacturer)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    return Math.ceil(filteredAssets.length / itemsPerPage);
  }, [allAssets, itemsPerPage, searchTerm, t]);

  // Using headerLight from the theme for styling
  const headerTheme = theme.headerLight;

  return (
    <div className={`${theme.background} min-h-screen`}>
      <header
        className={`${headerTheme.headerBg} py-4 border-b ${headerTheme.border} shadow-sm sticky top-0 z-30`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/smb"
            className={`text-2xl font-bold ${headerTheme.textPrimary}`}
          >
            {" "}
            {/* Using headerTheme.textPrimary */}
            LoyalShift <span className={headerTheme.textAccent}>BIM</span>{" "}
            {/* Using headerTheme.textAccent */}
          </Link>
          <form
            onSubmit={handleSearch}
            className="w-full sm:w-auto sm:max-w-md flex-grow flex"
          >
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t(
                "bimLibrary.searchPlaceholder",
                "Search objects, categories, or brands..."
              )}
              className={`w-full px-4 py-2 text-sm ${theme.inputBg} ${theme.inputBorder} rounded-l-md ${theme.inputFocusStyle} ${theme.textPrimary}`} // General input theme
            />
            <button
              type="submit"
              className={`${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} px-4 rounded-r-md ${theme.buttonPrimaryHoverBg} ${theme.focusRingDefault} text-sm font-semibold`}
            >
              {" "}
              {/* Using primary button theme */}
              <FiSearch className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">
                {t("bimLibrary.searchButton", "Search")}
              </span>
            </button>
          </form>
          <div className="hidden md:flex items-center space-x-2">
            <Button
              to="/login"
              variant="text"
              className={`${theme.buttonTextLink} ${theme.buttonTextLinkHover} !px-3 !py-1.5 text-sm`}
            >
              Log In
            </Button>
            <Button
              to="/signup"
              className={`${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} !px-3 !py-1.5 text-sm ${theme.buttonPrimaryHoverBg}`}
            >
              Free Sign Up
            </Button>{" "}
            {/* Using primary button theme */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8"
        >
          <h1 className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary}`}>
            {t("bimLibrary.mainHeading", "Explore Our BIM Object Library")}
          </h1>
          <p className={`text-sm ${theme.textMuted} mt-1`}>
            Home / Search / ...
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <FilterSidebar t={t} />

          <div className="flex-1">
            <AssetGridControls
              t={t}
              currentCountry={currentCountry}
              onSortChange={(e) => console.log("Sort by:", e.target.value)}
              onCountryFilterChange={(e) =>
                console.log("Country filter:", e.target.checked)
              }
            />

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loader"
                  className="flex justify-center items-center h-64"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FiLoader
                    className={`w-10 h-10 ${theme.textHighlight} animate-spin`}
                  />
                  <p className={`ml-3 ${theme.textSecondary}`}>
                    {t("bimLibrary.loadingAssets", "Loading assets...")}
                  </p>
                </motion.div>
              ) : paginatedAssets.length > 0 ? (
                <motion.div
                  key="asset-grid"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                >
                  {paginatedAssets.map((asset) => (
                    <AssetCard key={asset.id} asset={asset} t={t} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-assets"
                  className={`text-center py-12 ${theme.textMuted}`}
                  variants={fadeInUp}
                >
                  <FiBox className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  {t(
                    "bimLibrary.noAssetsFound",
                    "No assets found matching your criteria."
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!isLoading && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                t={t}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
