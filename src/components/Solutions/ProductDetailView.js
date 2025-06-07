// ProductDetailView.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiCheckCircle } from "react-icons/fi";

// --- Components (Imported from their respective files) ---
import InteractiveCapabilityRenderer from "./InteractiveCapabilityRenderer";

// --- Inline BenefitListItem for simplicity ---
const BenefitListItem = ({ itemKey, t, fadeInUp, theme }) => (
  <motion.li
    variants={fadeInUp}
    className={`flex items-start text-sm ${theme.textSecondary}`}
  >
    <FiCheckCircle
      className={`w-5 h-5 mr-2 ${theme.accentCyan} flex-shrink-0 mt-0.5`}
    />
    <span>{t(itemKey)}</span>
  </motion.li>
);

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const sectionFadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const ProductDetailView = ({
  product,
  t,
  theme,
  fadeInUp,
  viewportSettings,
}) => {
  const [useCasesVisible, setUseCasesVisible] = useState(false);
  const IconComponent =
    product.icon ||
    (() => <div className="w-10 h-10 bg-gray-300 rounded-xl" />);

  if (!product) return null; // Handle case where product might be null briefly

  return (
    <motion.div
      className={`flex flex-col ${theme.surfaceCard} rounded-2xl ${theme.cardShadow} overflow-hidden border ${theme.borderLight} h-full`}
    >
      <div className="p-6 md:p-8">
        {" "}
        {/* Main Info Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-5">
          <div
            className={`relative inline-flex p-3 items-center justify-center rounded-xl mr-0 sm:mr-5 mb-3 sm:mb-0 flex-shrink-0 ${theme.surfaceMuted} border ${theme.borderLight} shadow-inner`}
          >
            <IconComponent
              className={`relative z-10 w-10 h-10 ${theme.textHighlight}`}
            />
          </div>
          <div>
            <h2
              className={`text-2xl md:text-3xl font-bold ${theme.textPrimary}`}
            >
              {t(product.titleKey, product.defaultTitle)}
            </h2>
            {product.categoryKey && (
              <p
                className={`text-sm ${theme.textMuted} uppercase tracking-wider font-medium`}
              >
                {t(product.categoryKey, product.defaultCategory)}
              </p>
            )}
          </div>
        </div>
        <p className={`text-md ${theme.accentCyan} font-medium italic mb-3`}>
          {t(product.missionKey, product.defaultMission)}
        </p>
        <p className={`text-base ${theme.textSecondary} mb-6 leading-relaxed`}>
          {t(product.descriptionKey, product.defaultDescription)}
        </p>
      </div>
      {/* --- Interactive Capability Section --- */}
      {/* {product.interactiveCapability && (
        <motion.div
          variants={sectionFadeIn}
          initial="initial"
          animate="animate"
          className={`p-6 md:p-8 border-t ${theme.borderLight} ${theme.surfaceMuted}`}
        >
          <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-1`}>
            {t(
              product.interactiveCapability.titleKey,
              product.interactiveCapability.defaultTitle
            )}
          </h3>
          <p className={`${theme.textSecondary} text-sm mb-4`}>
            {t(
              product.interactiveCapability.descriptionKey,
              product.interactiveCapability.defaultDescription
            )}
          </p>
          <InteractiveCapabilityRenderer
            capability={product.interactiveCapability}
            t={t}
            theme={theme}
            product={product}
          />
        </motion.div>
      )} */}
      {/* Scrollable content area for benefits and use cases */}
      <div className="overflow-y-auto flex-grow">
        {product.benefits && product.benefits.length > 0 && (
          <motion.div
            variants={sectionFadeIn}
            initial="initial"
            animate="animate"
            className={`px-6 md:px-8 py-5 border-t ${theme.borderLight}`}
          >
            <h4
              className={`text-md font-semibold ${theme.textPrimary} mb-3 uppercase tracking-wider`}
            >
              {t("solutionsPage.keyBenefits", "Key Benefits")}
            </h4>
            <motion.ul
              className="list-none pl-0 space-y-2"
              variants={staggerContainer}
              initial="hidden" // Let parent AnimatePresence handle initial, or use whileInView
              animate="visible"
            >
              {product.benefits.map((benefitKey, i) => (
                <BenefitListItem
                  key={i}
                  itemKey={benefitKey}
                  t={t}
                  fadeInUp={fadeInUp}
                  theme={theme}
                />
              ))}
            </motion.ul>
          </motion.div>
        )}

        {product.useCases && product.useCases.length > 0 && (
          <motion.div
            variants={sectionFadeIn}
            initial="initial"
            animate="animate"
            className={`px-6 md:px-8 py-4 border-t ${theme.borderLight}`}
          >
            <button
              onClick={() => setUseCasesVisible(!useCasesVisible)}
              className={`w-full flex justify-between items-center py-2 text-left text-sm font-semibold ${theme.textHighlight} hover:text-cyan-700 transition-colors ${theme.focusRingDefault}`}
              aria-expanded={useCasesVisible}
            >
              {t("solutionsPage.viewUseCases", "View Enterprise Use Cases")}
              <motion.div
                animate={{ rotate: useCasesVisible ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
            <AnimatePresence>
              {useCasesVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-3 space-y-4 overflow-hidden text-xs"
                >
                  {product.useCases.map((uc, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-md ${theme.surfaceMuted} border ${theme.borderLight}`}
                    >
                      <h5
                        className={`font-semibold ${theme.textPrimary} mb-0.5`}
                      >
                        {t(uc.titleKey, uc.defaultTitle)}
                      </h5>
                      <p className={`${theme.textSecondary} mb-0.5`}>
                        <strong className={`${theme.textPrimary} font-medium`}>
                          Problem:
                        </strong>{" "}
                        {t(uc.problemKey, uc.defaultProblem)}
                      </p>
                      <p className={`${theme.textSecondary} mb-0.5`}>
                        <strong className={`${theme.textPrimary} font-medium`}>
                          Solution:
                        </strong>{" "}
                        {t(uc.solutionKey, uc.defaultSolution)}
                      </p>
                      <p className={`${theme.textSecondary}`}>
                        <strong className={`${theme.textPrimary} font-medium`}>
                          Outcome:
                        </strong>{" "}
                        {t(uc.outcomeKey, uc.defaultOutcome)}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>{" "}
      {/* End scrollable content area */}
      {product.specificCtaKey && (
        <motion.div
          variants={sectionFadeIn}
          initial="initial"
          animate="animate"
          className={`p-6 md:p-8 mt-auto border-t ${theme.borderLight} ${theme.surfaceMuted}`}
        >
          <p
            className={`text-sm italic ${theme.textHighlight} text-center`}
            dangerouslySetInnerHTML={{
              __html: t(
                product.specificCtaKey,
                product.defaultSpecificCta
              ).replace(
                /\*(.*?)\*/g,
                `<strong class="${theme.accentCyan} not-italic font-semibold"><em>$1</em></strong>`
              ),
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductDetailView;
