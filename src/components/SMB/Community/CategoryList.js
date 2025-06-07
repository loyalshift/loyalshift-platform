// src/pages/SMB/Community/CategoryList.js
import React from "react";
import PropTypes from "prop-types";
import { FiTag } from "react-icons/fi";
import { motion } from "framer-motion";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme"; // Adjust path
import { useLocalization } from "../../../components/LocalizationContext"; // Adjust path

const theme = loyalShiftV2Theme;

const CategoryList = ({ categories, onSelectCategory, activeCategory }) => {
  const { t } = useLocalization();

  // Mock categories if none are passed
  const displayCategories =
    categories && categories.length > 0
      ? categories
      : [
          {
            id: "all",
            nameKey: "smbCommunity.categories.all",
            defaultName: "All Posts",
          },
          {
            id: "general",
            nameKey: "smbCommunity.categories.general",
            defaultName: "General Discussion",
          },
          {
            id: "studio-tips",
            nameKey: "smbCommunity.categories.studioTips",
            defaultName: "Studio Tips & Tricks",
          },
          {
            id: "marketing",
            nameKey: "smbCommunity.categories.marketing",
            defaultName: "Marketing Strategies",
          },
          {
            id: "feedback",
            nameKey: "smbCommunity.categories.feedback",
            defaultName: "Feedback & Suggestions",
          },
        ];

  return (
    <motion.div
      className={`${theme.surfaceCard} p-5 rounded-xl border ${theme.borderLight} ${theme.cardShadow}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3
        className={`text-lg font-semibold ${theme.textPrimary} mb-4 flex items-center`}
      >
        <FiTag className={`w-5 h-5 mr-2 ${theme.textHighlight}`} />
        {t("smbCommunity.categories.title", "Categories")}
      </h3>
      <ul className="space-y-2">
        {displayCategories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onSelectCategory && onSelectCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                ${
                  activeCategory === category.id
                    ? `${theme.accentCyanBg}/10 ${theme.textHighlight} font-medium`
                    : `${theme.textSecondary} hover:${theme.surfaceMuted} hover:${theme.textPrimary}`
                }
                ${theme.focusRingDefault}`}
              aria-current={activeCategory === category.id ? "page" : undefined}
            >
              {t(category.nameKey, category.defaultName)}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nameKey: PropTypes.string.isRequired,
      defaultName: PropTypes.string.isRequired,
    })
  ),
  onSelectCategory: PropTypes.func,
  activeCategory: PropTypes.string,
};

export default CategoryList;
