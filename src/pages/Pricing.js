// src/pages/PricingPage.js
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiHelpCircle,
  FiArrowRight,
  FiBriefcase,
  FiLayers,
  FiChevronDown,
  FiZap,
  FiGlobe,
  FiUsers,
} from "react-icons/fi";

import Button from "../components/Button";
import { useLocalization } from "../components/LocalizationContext";
import loyalShiftV2Theme from "../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// --- Pricing Card Component ---
const PricingCard = ({ tier, highlight, t, isSMB = false }) => {
  const cardClasses = `rounded-xl overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col ${
    highlight
      ? "ring-2 ring-cyan-500 transform -translate-y-2"
      : "border border-gray-200"
  }`;

  const headerClasses = `p-8 ${
    highlight ? "bg-gradient-to-r from-cyan-600 to-blue-600" : theme.surfaceCard
  }`;

  return (
    <motion.div variants={fadeInUp} className={cardClasses}>
      <div className={headerClasses}>
        <div className="flex justify-between items-start">
          <div>
            <h3
              className={`text-2xl font-bold ${
                highlight ? "text-white" : theme.textPrimary
              }`}
            >
              {t(tier.nameKey, tier.name)}
            </h3>
            <p
              className={`mt-2 ${
                highlight ? "text-white/90" : theme.textSecondary
              }`}
            >
              {t(tier.descriptionKey, tier.description)}
            </p>
          </div>
          {highlight && (
            <span
              className={`bg-white text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full`}
            >
              {t("pricing.mostPopular", "RECOMMENDED")}
            </span>
          )}
        </div>

        <div className="mt-6 mb-6 flex items-baseline">
          <span
            className={`text-4xl font-bold ${
              highlight ? "text-white" : theme.textPrimary
            }`}
          >
            {tier.price}
          </span>
          {tier.frequency && (
            <span
              className={`ml-2 text-lg ${
                highlight ? "text-white/80" : theme.textMuted
              }`}
            >
              {tier.frequency}
            </span>
          )}
        </div>

        <Button to={tier.ctaLink} variant="secondary">
          {t(tier.ctaTextKey, tier.ctaText)}
        </Button>
      </div>

      <div className="bg-white p-8 border-t border-gray-100 flex-grow">
        <h4 className="text-sm font-semibold text-gray-500 mb-4">
          {t("pricing.includes", "Includes:")}
        </h4>
        <ul className="space-y-3">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <FiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 text-sm">
                {typeof feature === "string"
                  ? feature
                  : t(feature.key, feature.text)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// --- FAQ Item Component ---
const FAQItem = ({ faq, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-lg border border-gray-200 shadow-sm"
    >
      <button
        className="w-full flex justify-between items-center p-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-md font-semibold text-gray-900">
          {t(faq.questionKey, faq.question)}
        </h3>
        <FiChevronDown
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 pb-5 border-t border-gray-200"
          >
            <p className="text-gray-600 text-sm pt-4">
              {t(faq.answerKey, faq.answer)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Value Prop Component ---
const ValueProp = ({ icon, titleKey, descriptionKey, t }) => {
  const Icon = icon;
  return (
    <motion.div variants={fadeInUp} className="text-center p-6">
      <div className="bg-cyan-100 text-cyan-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{t(titleKey)}</h3>
      <p className="text-gray-600 text-sm">{t(descriptionKey)}</p>
    </motion.div>
  );
};

export default function PricingPage() {
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState("enterprise");

  // Enterprise Pricing Tiers
  const enterpriseTiers = [
    {
      name: "Starter",
      price: "$599",
      frequency: "/month",
      description: "Evaluate core capabilities with basic automation",
      features: [
        "Connect 2 legacy systems",
        "5 user seats",
        "50 workflow executions/month",
        "Basic process mapping",
        "Standard security",
      ],
      ctaText: "Start Pilot",
      ctaLink: "/contact?form=sales",
    },
    {
      name: "Professional",
      price: "$2,500",
      frequency: "/month",
      description: "Scale modernization across multiple systems",
      features: [
        "Connect 10 legacy systems",
        "Unlimited users",
        "500 workflow executions/month",
        "Advanced analytics",
        "Priority support",
        "API access",
      ],
      ctaText: "Get Started",
      ctaLink: "/contact?form=sales",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Organization-wide transformation",
      features: [
        "Unlimited connectors",
        "Dedicated support",
        "Custom AI integration",
        "24/7 monitoring",
        "Compliance assistance",
        "White-glove onboarding",
      ],
      ctaText: "Contact Sales",
      ctaLink: "/contact?form=sales",
    },
  ];

  // SMB Plan
  const smbPlan = {
    name: "SMB Digital Kickstart",
    price: "$599",
    frequency: "/one-time",
    description: "Professional online presence for Costa Rican businesses",
    features: [
      "Custom homepage design",
      "Mobile-responsive",
      "1 month full access",
      "Basic SEO setup",
      "Ongoing lite access",
      "Local support",
    ],
    ctaText: "Get Started",
    ctaLink: "/contact?form=sales",
    highlight: true,
  };

  // FAQs
  const faqs = [
    {
      question: "How are payments processed?",
      answer: "We use secure payment processing with automatic tax compliance.",
      questionKey: "faq.payments",
      answerKey: "faq.paymentsAnswer",
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade at any time.",
      questionKey: "faq.changePlan",
      answerKey: "faq.changePlanAnswer",
    },
    {
      question: "What support is included?",
      answer:
        "All plans include support, with higher tiers getting priority access.",
      questionKey: "faq.support",
      answerKey: "faq.supportAnswer",
      defaultOpen: true,
    },
  ];

  // Value Props
  const valueProps = [
    {
      icon: FiZap,
      titleKey: "pricing.value.fastImplementation",
      descriptionKey: "pricing.value.fastImplementationDesc",
    },
    {
      icon: FiGlobe,
      titleKey: "pricing.value.globalCompliance",
      descriptionKey: "pricing.value.globalComplianceDesc",
    },
    {
      icon: FiUsers,
      titleKey: "pricing.value.dedicatedSupport",
      descriptionKey: "pricing.value.dedicatedSupportDesc",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white mt-20 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {t("pricing.heroTitle", "Simple, Transparent Pricing")}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl max-w-3xl mx-auto mb-10"
          >
            {t(
              "pricing.heroSubtitle",
              "Choose the right plan for your business needs"
            )}
          </motion.p>
        </div>
      </section>

      {/* Pricing Tabs */}
      <div className="container mx-auto px-4 pt-12">
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab("enterprise")}
              className={`px-6 py-2 rounded-md font-medium ${
                activeTab === "enterprise"
                  ? "bg-cyan-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t("pricing.enterpriseTab", "Enterprise")}
            </button>
            <button
              onClick={() => setActiveTab("smb")}
              className={`px-6 py-2 rounded-md font-medium ${
                activeTab === "smb"
                  ? "bg-cyan-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t("pricing.smbTab", "SMB Initiative")}
            </button>
          </div>
        </div>

        {/* Enterprise Pricing */}
        {activeTab === "enterprise" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {t("pricing.enterpriseTitle", "Enterprise Solutions")}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t(
                  "pricing.enterpriseSubtitle",
                  "Comprehensive modernization for large organizations"
                )}
              </p>
            </motion.div>

            <motion.div className="grid md:grid-cols-3 gap-8">
              {enterpriseTiers.map((tier) => (
                <PricingCard
                  key={tier.name}
                  tier={tier}
                  highlight={tier.popular}
                  t={t}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* SMB Pricing */}
        {activeTab === "smb" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {t("pricing.smbTitle", "SMB Digital Kickstart")}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t(
                  "pricing.smbSubtitle",
                  "Get your business online quickly and affordably"
                )}
              </p>
            </motion.div>

            <motion.div className="grid md:grid-cols-1 max-w-md mx-auto">
              <PricingCard
                tier={smbPlan}
                highlight={smbPlan.highlight}
                t={t}
                isSMB={true}
              />
            </motion.div>

            {/* Value Props */}
            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6 mt-16"
            >
              {valueProps.map((prop, index) => (
                <ValueProp key={index} {...prop} t={t} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <FiHelpCircle className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {t("faq.title", "Frequently Asked Questions")}
              </h2>
              <p className="text-gray-600">
                {t("faq.subtitle", "Everything you need to know")}
              </p>
            </motion.div>

            <motion.div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} t={t} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-6">
              {t("cta.title", "Ready to get started?")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl mb-10 max-w-2xl mx-auto"
            >
              {t("cta.subtitle", "Choose the plan that fits your needs")}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                to={
                  activeTab === "smb"
                    ? "/contact?form=sales"
                    : "/contact?form=sales"
                }
                size="lg"
                variant="primary"
              >
                {activeTab === "smb"
                  ? t("cta.smbButton", "Start Your Kickstart")
                  : t("cta.enterpriseButton", "Contact Sales")}
              </Button>
              <Button
                to="/demo"
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 font-semibold"
              >
                {t("cta.demoButton", "Schedule a Demo")}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
