// ProductSelector.js
import React from "react";
import { motion } from "framer-motion";

const ProductLink = ({ product, isSelected, theme, onSelectProduct, t }) => {
  const IconComponent =
    product.icon || (() => <div className="w-5 h-5 bg-gray-300 rounded" />);

  return (
    <motion.li
      key={product.id}
      whileHover={{
        x: isSelected ? 0 : 3,
        backgroundColor: isSelected
          ? "rgba(80, 140, 223, 0.07)"
          : "rgba(100, 116, 139, 0.07)",
      }}
      className={`
                p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
                flex items-center gap-3 text-sm
                ${
                  isSelected
                    ? `bg-cyan-500/10 ${theme.textHighlight} font-semibold shadow-sm`
                    : `${theme.textSecondary} hover:bg-slate-500/5`
                }
              `}
      onClick={() => onSelectProduct(product)}
      layout
    >
      <IconComponent
        className={`w-5 h-5 flex-shrink-0 ${
          isSelected ? theme.accentCyan : theme.textMuted
        }`}
      />
      <span className="truncate">
        {t(product.titleKey, product.defaultTitle)}
      </span>
    </motion.li>
  );
};

const ProductSelector = ({
  products,
  selectedProduct,
  onSelectProduct,
  t,
  theme,
}) => {
  return (
    <div
      className={`p-4 sm:p-6 ${theme.surfaceCard} rounded-xl ${theme.cardShadow} h-full sticky top-24`}
    >
      {/* Added sticky top */}
      <h3 className={`text-xl font-semibold ${theme.textPrimary} px-2`}>
        {t("solutionsPage.selectProductTitle1", "Explore Our")}
      </h3>
      <h4 className={`text-l font-semibold ${theme.textPrimary} mb-4 px-2`}>
        {t("solutionsPage.selectProductTitle2", "Technology Suite & Modules")}
      </h4>
      <ul className="space-y-1.5">
        {products.map((product) => (
          <ProductLink
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
            isSelected={product.id === selectedProduct.id}
            t={t}
            theme={theme}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductSelector;
