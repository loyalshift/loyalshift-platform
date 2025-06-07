// src/pages/smb/bim/SMBBIMObjectLibraryPage.js
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom"; // useSearchParams for query params
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiChevronDown,
  FiChevronRight,
  FiChevronLeft,
  FiBox,
  FiLoader,
  FiGrid,
  FiPlusSquare,
  FiStar,
  FiEye,
  FiLayers,
  FiGlobe,
  FiZap,
  FiArchive,
  FiDroplet,
  FiCoffee,
  FiWind,
  FiGitMerge,
  FiSquare,
  FiMenu,
} from "react-icons/fi";

import Button from "../../components/Button"; // Assuming Button component is theme-aware
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";
import { useLocalization } from "../../components/LocalizationContext";
import PropTypes from "prop-types";

const theme = loyalShiftV2Theme;

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

// --- MOCK DATA (Keep this similar, but we might need more fields like 'tags') ---
const MOCK_BIM_CATEGORIES = [
  // These will be used for the horizontal filter bar
  {
    id: "sanitary",
    nameKey: "smbBim.category.sanitary",
    defaultName: "Sanitary",
    icon: FiBox,
  }, // Example, use appropriate icons
  {
    id: "lighting",
    nameKey: "smbBim.category.lighting",
    defaultName: "Lighting",
    icon: FiZap,
  }, // FiZap might not be ideal, find better light icon
  {
    id: "furniture",
    nameKey: "smbBim.category.furniture",
    defaultName: "Furniture",
    icon: FiArchive,
  }, // Placeholder icon
  {
    id: "plumbing",
    nameKey: "smbBim.category.plumbing",
    defaultName: "Plumbing",
    icon: FiDroplet,
  },
  {
    id: "construction-materials",
    nameKey: "smbBim.category.constructionMaterials",
    defaultName: "Construction Materials",
    icon: FiLayers,
  },
  {
    id: "kitchen",
    nameKey: "smbBim.category.kitchen",
    defaultName: "Kitchen",
    icon: FiCoffee,
  },
  {
    id: "hvac",
    nameKey: "smbBim.category.hvac",
    defaultName: "HVAC",
    icon: FiWind,
  },
  {
    id: "doors",
    nameKey: "smbBim.category.doors",
    defaultName: "Doors",
    icon: FiGitMerge,
  }, // Placeholder
  {
    id: "windows",
    nameKey: "smbBim.category.windows",
    defaultName: "Windows",
    icon: FiSquare,
  },
];

const MOCK_BIM_ASSETS = Array.from({ length: 87 }, (_, i) => ({
  id: `bim_asset_${i + 1}`,
  imageUrl: `https://placehold.co/400x300/${
    theme.inputBorder.replace("border-", "").split("/")[0]
  }/${theme.textMuted.replace("text-", "")}?text=Asset+${i + 1}&font=inter`,
  manufacturerKey: `smbBim.manufacturer.brand${(i % 4) + 1}`,
  defaultManufacturer: `Brand ${(i % 4) + 1}`,
  titleKey: `smbBim.asset${i + 1}.title`,
  defaultTitle: `${
    MOCK_BIM_CATEGORIES[i % MOCK_BIM_CATEGORIES.length].defaultName
  } Model ${String.fromCharCode(65 + (i % 10))}${i + 1}`,
  category: MOCK_BIM_CATEGORIES[i % MOCK_BIM_CATEGORIES.length].id,
  tags: [`tag${(i % 5) + 1}`, `tag${((i + 2) % 5) + 1}`], // Example tags
  rating: 3.0 + (i % 21) / 10,
  reviews: 10 + i * 3,
  isPromoted: i % 8 === 0,
  availableInCostaRica: i % 2 === 0, // Example field for CR availability
  fileTypes: ["rvt", "ifc", i % 3 === 0 ? "dwg" : "skp"],
}));

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

// --- Horizontal Category Filter Bar ---
const CategoryFilterBar = ({
  t,
  categories,
  activeCategory,
  onCategorySelect,
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 200, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`py-3 border-b ${theme.borderLight} sticky top-[60px] z-30 ${theme.surfaceCard} shadow-sm`}
    >
      {/* Adjust top if header height changes */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center">
          <button
            onClick={() => scroll(-1)}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full ${theme.surfaceCard} shadow-md hover:bg-slate-100 ${theme.focusRingDefault} hidden sm:block`}
          >
            {" "}
            <FiChevronLeft className={`w-5 h-5 ${theme.textSecondary}`} />{" "}
          </button>
          <div
            ref={scrollRef}
            className="flex space-x-1 overflow-x-auto scrollbar-hide py-1 px-8 sm:px-10"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-colors
                  ${
                    activeCategory === cat.id
                      ? `${theme.accentCyanBg} ${theme.buttonTextLight}`
                      : `${theme.textSecondary} hover:${theme.surfaceMuted} hover:${theme.textPrimary}`
                  }
                `}
              >
                {cat.icon && (
                  <cat.icon className="w-4 h-4 mr-1.5 inline-block -mt-0.5" />
                )}
                {t(cat.nameKey, cat.defaultName)}
              </button>
            ))}
          </div>
          <button
            onClick={() => scroll(1)}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full ${theme.surfaceCard} shadow-md hover:bg-slate-100 ${theme.focusRingDefault} hidden sm:block`}
          >
            {" "}
            <FiChevronRight className={`w-5 h-5 ${theme.textSecondary}`} />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Asset Card (bimobject style) ---
const BIMObjectCard = ({ asset, t }) => {
  // Simplified: Assume Add to Project. Can be "Download" too.
  const primaryActionText = t("smbBim.library.addToProject", "Add to project");
  const primaryActionIcon = <FiPlusSquare className="w-3.5 h-3.5 mr-1.5" />;

  return (
    <motion.div
      variants={fadeInUp}
      className={`group relative flex flex-col ${theme.surfaceCard} rounded-lg border ${theme.border} shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-cyan-500/30`}
      whileHover={{ y: -3 }}
    >
      <Link to={`/smb/bim/object/${asset.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 bg-gray-100">
          {" "}
          {/* Square aspect ratio for thumbnail */}
          <img
            src={asset.imageUrl}
            alt={t(asset.titleKey, asset.defaultTitle)}
            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" // object-contain
          />
        </div>
      </Link>
      {asset.isPromoted && (
        <span
          className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded ${theme.accentCyanBg} ${theme.buttonTextLight} shadow-sm`}
        >
          {t("smbBim.library.promotedLabel", "Promoted")}
        </span>
      )}
      {/* Placeholder for manufacturer logo or other small icon top-right */}
      <button
        className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/70 backdrop-blur-sm text-gray-500 hover:text-gray-700 hover:bg-white shadow ${theme.focusRingDefault}`}
      >
        <FiEye className="w-4 h-4" /> {/* Example: View/Quick Look Icon */}
      </button>

      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <p className={`text-xs font-medium ${theme.textMuted} mb-0.5 truncate`}>
          {t(asset.manufacturerKey, asset.defaultManufacturer)}
        </p>
        <h3
          className={`text-sm sm:text-md font-semibold ${theme.textPrimary} mb-1 truncate group-hover:${theme.textHighlight} transition-colors`}
        >
          <Link to={`/smb/bim/object/${asset.id}`}>
            {t(asset.titleKey, asset.defaultTitle)}
          </Link>
        </h3>

        {asset.rating && (
          <div className={`flex items-center text-xs text-amber-500 my-1.5`}>
            {[...Array(Math.floor(asset.rating))].map((_, i) => (
              <FiStar key={`full-${i}`} className="w-3 h-3 fill-current" />
            ))}
            {asset.rating % 1 >= 0.5 && (
              <FiStar key="half" className="w-3 h-3 fill-current opacity-50" />
            )}
            {[...Array(5 - Math.ceil(asset.rating))].map((_, i) => (
              <FiStar
                key={`empty-${i}`}
                className="w-3 h-3 text-gray-300 dark:text-slate-600"
              />
            ))}
            <span className={`ml-1 ${theme.textMuted}`}>
              ({asset.reviews || 0})
            </span>
          </div>
        )}

        <div className="mt-auto pt-3">
          <Button
            size="sm"
            className={`w-full !py-2 !text-xs !font-medium 
              ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} 
              hover:${theme.buttonSecondaryHoverBg} 
              border ${theme.buttonSecondaryBorder} hover:${theme.buttonSecondaryHoverBorder}`}
            icon={primaryActionIcon}
          >
            {primaryActionText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
BIMObjectCard.propTypes = {
  /* ... */
};

// --- Main Page ---
export default function SMBBIMObjectLibraryPage() {
  const { t } = useLocalization();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || null
  );
  const [filterCostaRica, setFilterCostaRica] = useState(
    searchParams.get("cr_available") === "true"
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "trending");

  const [allAssets] = useState(MOCK_BIM_ASSETS); // Using static mock data
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const itemsPerPage = 18; // Number of items per page, adjust as needed

  useEffect(() => {
    setIsLoading(true);
    // Update URL search params when filters change
    const newSearchParams = new URLSearchParams();
    if (searchTerm) newSearchParams.set("q", searchTerm);
    if (activeCategory) newSearchParams.set("category", activeCategory);
    if (filterCostaRica) newSearchParams.set("cr_available", "true");
    if (sortBy !== "trending") newSearchParams.set("sort", sortBy);
    if (currentPage > 1) newSearchParams.set("page", currentPage.toString());
    setSearchParams(newSearchParams, { replace: true }); // replace to avoid history spam

    // Simulate data fetching based on filters
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [
    searchTerm,
    activeCategory,
    filterCostaRica,
    sortBy,
    currentPage,
    setSearchParams,
  ]);

  const filteredAssets = useMemo(() => {
    let assets = allAssets;
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      assets = assets.filter(
        (asset) =>
          t(asset.titleKey, asset.defaultTitle)
            .toLowerCase()
            .includes(lowerSearch) ||
          t(asset.manufacturerKey, asset.defaultManufacturer)
            .toLowerCase()
            .includes(lowerSearch) ||
          (asset.tags &&
            asset.tags.some((tag) => tag.toLowerCase().includes(lowerSearch)))
      );
    }
    if (activeCategory) {
      assets = assets.filter((asset) => asset.category === activeCategory);
    }
    if (filterCostaRica) {
      assets = assets.filter((asset) => asset.availableInCostaRica);
    }
    // Add sorting logic based on 'sortBy' state
    if (sortBy === "newest") assets.sort((a, b) => b.id.localeCompare(a.id)); // Simplistic sort by ID desc
    if (sortBy === "rating")
      assets.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sortBy === "popular")
      assets.sort((a, b) => (b.reviews || 0) - (a.reviews || 0)); // Sort by reviews for popular

    return assets;
  }, [allAssets, searchTerm, activeCategory, filterCostaRica, sortBy, t]);

  const paginatedAssets = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredAssets.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredAssets, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    // setSearchParams will trigger useEffect to update URL and re-filter
  };

  const handleCategorySelect = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId)); // Toggle or set
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Breadcrumb logic
  const breadcrumbs = [
    {
      nameKey: "smbBim.breadcrumb.home",
      defaultName: "Home",
      path: "/smb/bim",
    },
  ];
  if (activeCategory) {
    const cat = MOCK_BIM_CATEGORIES.find((c) => c.id === activeCategory);
    breadcrumbs.push({
      nameKey: cat?.nameKey,
      defaultName: cat?.defaultName || "Category",
      path: `/smb/bim/object-library?category=${activeCategory}`,
    });
  } else if (searchTerm) {
    breadcrumbs.push({
      nameKey: "smbBim.breadcrumb.search",
      defaultName: "Search Results",
    });
  } else {
    breadcrumbs.push({
      nameKey: "smbBim.breadcrumb.collections",
      defaultName: "Collections",
    }); // Or "All Objects"
  }

  return (
    <div className={`${theme.background} min-h-screen`}>
      <CategoryFilterBar
        t={t}
        categories={MOCK_BIM_CATEGORIES}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Breadcrumbs and Top Controls */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-4 md:mb-6 flex flex-col sm:flex-row justify-between items-center gap-3"
        >
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1.5 text-xs sm:text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <FiChevronRight
                      className={`w-3.5 h-3.5 ${theme.textMuted} mx-1`}
                    />
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className={theme.textPrimary}>
                      {t(crumb.nameKey, crumb.defaultName)}
                    </span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className={`${theme.textSecondary} hover:${theme.textHighlight}`}
                    >
                      {t(crumb.nameKey, crumb.defaultName)}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="flex items-center gap-4">
            <label
              className={`flex items-center text-xs sm:text-sm ${theme.textSecondary} cursor-pointer`}
            >
              <input
                type="checkbox"
                checked={filterCostaRica}
                onChange={(e) => {
                  setFilterCostaRica(e.target.checked);
                  setCurrentPage(1);
                }}
                className={`form-checkbox h-4 w-4 ${theme.textHighlight} rounded mr-2 border-${theme.border} ${theme.inputFocusRing}`}
              />
              {t(
                "smbBim.library.filterCR",
                "Only include products available in Costa Rica"
              )}
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className={`text-xs sm:text-sm appearance-none ${theme.inputBg} ${theme.inputBorder} rounded-md py-1.5 pl-3 pr-7 ${theme.inputFocusStyle} ${theme.textPrimary} ${theme.focusRingDefault}`}
              >
                <option value="trending">
                  {t("smbBim.library.sortTrending", "Trending")}
                </option>
                <option value="newest">
                  {t("smbBim.library.sortNewest", "Newest")}
                </option>
                <option value="rating">
                  {t("smbBim.library.sortRating", "Highest Rated")}
                </option>
                <option value="popular">
                  {t("smbBim.library.sortPopular", "Most Popular")}
                </option>
              </select>
              <FiChevronDown
                className={`w-3.5 h-3.5 ${theme.textMuted} absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none`}
              />
            </div>
          </div>
        </motion.div>

        {/* Main Content: Title and Grid */}
        {!activeCategory &&
          !searchTerm && ( // Show "Collections" title only on the main library page
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className={`${theme.surfaceMuted} p-6 sm:p-8 rounded-xl border ${theme.borderLight} mb-8`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${theme.accentCyanBg}/10 `}>
                  <FiGrid className={`w-8 h-8 ${theme.textHighlight}`} />
                </div>
                <div>
                  <h1
                    className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary} mb-2`}
                  >
                    {t("smbBim.library.collectionsTitle", "Collections")}
                  </h1>
                  <p className={`${theme.textSecondary} text-sm max-w-2xl`}>
                    {t(
                      "smbBim.library.collectionsDesc",
                      "Discover new products for your project needs with our community curated collections. Browse between different spaces and themes to find the perfect BIM objects for your requirements."
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              className="flex flex-col justify-center items-center h-96"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FiLoader
                className={`w-12 h-12 ${theme.textHighlight} animate-spin`}
              />
              <p className={`mt-3 ${theme.textSecondary}`}>
                {t("smbBim.library.loadingObjects", "Loading BIM Objects...")}
              </p>
            </motion.div>
          ) : paginatedAssets.length > 0 ? (
            <motion.div
              key="asset-grid"
              id="asset-grid-section" // For scrolling
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5" // More columns like bimobject
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {paginatedAssets.map((asset) => (
                <BIMObjectCard key={asset.id} asset={asset} t={t} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-assets"
              className={`text-center py-20 ${theme.textMuted}`}
              variants={fadeInUp}
            >
              <FiBox className="w-20 h-20 mx-auto mb-6 opacity-30" />
              <p className="text-lg">
                {t(
                  "smbBim.library.noAssetsFound",
                  "No BIM objects found matching your criteria."
                )}
              </p>
              <p className="text-sm mt-2">
                {t(
                  "smbBim.library.tryAdjustingFilters",
                  "Try adjusting your filters or search terms."
                )}
              </p>
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
      </main>
      {/* Footer can be part of the main app layout */}
    </div>
  );
}

// PropTypes for sub-components (if not in their own files)
// ...
