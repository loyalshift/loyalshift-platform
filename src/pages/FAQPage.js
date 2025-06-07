// src/pages/FAQPage.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHelpCircle,
  FiChevronDown,
  FiZap,
  FiShield,
  FiUsers,
  FiDollarSign,
  FiCpu,
  FiBriefcase,
} from "react-icons/fi";
import { Link } from "react-router-dom"; // For internal links

import { useLocalization } from "../components/LocalizationContext"; // Adjust path
import loyalShiftV2Theme from "../themes/loyalshift-v2.theme"; // Adjust path
import Button from "../components/Button"; // Adjust path

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// --- Reusable Components ---
const SectionWrapper = ({
  children,
  className = "",
  bg = theme.background,
  id,
}) => (
  <motion.section
    id={id}
    className={`py-16 md:py-20 ${bg} ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={viewportSettings}
    variants={staggerContainer}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </motion.section>
);

const SectionTitle = ({
  t,
  titleKey,
  subtitleKey,
  defaultTitle,
  defaultSubtitle,
  align = "text-center",
  className = "",
}) => (
  <motion.div
    className={`mb-12 md:mb-16 ${align} ${className}`}
    variants={fadeInUp}
  >
    {subtitleKey && (
      <p
        className={`text-base font-semibold ${theme.textHighlight} uppercase tracking-wider mb-3`}
      >
        {t(subtitleKey, defaultSubtitle)}
      </p>
    )}
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl font-bold ${theme.textPrimary}`}
    >
      {t(titleKey, defaultTitle)}
    </h2>
  </motion.div>
);

const FAQItem = ({
  t,
  questionKey,
  answerKey,
  defaultQuestion,
  defaultAnswer,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      variants={fadeInUp}
      className={`${theme.surfaceCard} rounded-xl border ${
        theme.borderLight
      } shadow-sm overflow-hidden ${isOpen ? `${theme.cardShadow}` : ""}`} // Add more shadow when open
    >
      <button
        className={`w-full flex justify-between items-center p-5 sm:p-6 text-left ${theme.focusRingDefault} rounded-t-xl`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${questionKey}`}
      >
        <h3 className={`text-md sm:text-lg font-semibold ${theme.textPrimary}`}>
          {t(questionKey, defaultQuestion)}
        </h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <FiChevronDown
            className={`w-5 h-5 ${theme.textMuted} transform transition-transform`}
          />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${questionKey}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className={`px-5 sm:px-6 pb-6 border-t ${theme.borderLight} overflow-hidden`}
          >
            <div
              className={`${theme.textSecondary} text-sm sm:text-base pt-5 leading-relaxed space-y-3`}
              dangerouslySetInnerHTML={{ __html: t(answerKey, defaultAnswer) }} // Allows HTML in answers for links/formatting
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQPage() {
  const { t } = useLocalization();

  const faqCategories = [
    {
      categoryKey: "faq.category.general",
      defaultCategoryTitle: "General Questions",
      icon: <FiHelpCircle className={`w-8 h-8 ${theme.textHighlight}`} />,
      faqs: [
        {
          questionKey: "faq.general.whatIsLoyalShift",
          defaultQuestion: "What is LoyalShift?",
          answerKey: "faq.general.whatIsLoyalShiftAns",
          defaultAnswer:
            "LoyalShift is an AI-powered platform designed to help businesses modernize their legacy systems without costly replacements. We offer solutions for enterprises to integrate AI and improve efficiency, and tailored digital tools for Small and Medium Businesses (SMBs) to enhance their online presence and operations.",
        },
        {
          questionKey: "faq.general.whoIsLoyalShiftFor",
          defaultQuestion: "Who is LoyalShift for?",
          answerKey: "faq.general.whoIsLoyalShiftForAns",
          defaultAnswer:
            "LoyalShift serves two main groups: <br/>1. <strong>Enterprises</strong> looking to modernize existing complex systems, automate workflows, and integrate AI capabilities. <br/>2. <strong>Small and Medium Businesses (SMBs)</strong> needing accessible digital tools to build and manage their online presence, content, and customer engagement through our SMB Studio.",
        },
        {
          questionKey: "faq.general.howGetStarted",
          defaultQuestion: "How do I get started with LoyalShift?",
          answerKey: "faq.general.howGetStartedAns",
          defaultAnswer:
            "For enterprises, the best way to start is by <a href='/contact' class='text-cyan-600 hover:underline'>requesting a personalized demo</a> or <a href='contact' class='text-cyan-600 hover:underline'>contacting our sales team</a>. For SMBs, you can explore our <a href='/smb' class='text-cyan-600 hover:underline'>SMB solutions</a> and pricing, or sign up directly for our SMB Studio.",
        },
      ],
    },
    {
      categoryKey: "faq.category.aiModernization",
      defaultCategoryTitle: "AI & Legacy Modernization (Enterprise)",
      icon: <FiCpu className={`w-8 h-8 ${theme.textHighlight}`} />,
      faqs: [
        {
          questionKey: "faq.ai.howModernize",
          defaultQuestion:
            "How does LoyalShift modernize legacy systems without replacing them?",
          answerKey: "faq.ai.howModernizeAns",
          defaultAnswer:
            "We use a 'Zero-Disruption' approach. Our platform works alongside your existing systems, creating an intelligent layer that connects, automates, and enhances. Key technologies include our Universal Adapter™ for integration, Smart Mirror™ for safe testing, and AI Insights Engine for data-driven decisions. This avoids the risks and costs of full 'rip-and-replace' projects.",
        },
        {
          questionKey: "faq.ai.explainableAI",
          defaultQuestion: "What do you mean by 'Explainable AI'?",
          answerKey: "faq.ai.explainableAIAns",
          defaultAnswer:
            "Explainable AI (XAI) means that the decisions and predictions made by our AI systems are traceable and understandable by humans. We provide insights into how the AI arrived at a conclusion, which is crucial for trust, compliance, and debugging in enterprise environments. Our Audit Guardian™ module plays a key role here.",
        },
        {
          questionKey: "faq.ai.industries",
          defaultQuestion:
            "Which industries benefit most from your enterprise solutions?",
          answerKey: "faq.ai.industriesAns",
          defaultAnswer:
            "While our platform is adaptable, we have significant expertise in sectors like Finance, Insurance, Energy (including VPPs), Manufacturing, Healthcare, and Logistics – industries often burdened with complex legacy systems and data silos.",
        },
      ],
    },
    {
      categoryKey: "faq.category.smbSolutions",
      defaultCategoryTitle: "SMB Studio & Digital Tools",
      icon: <FiBriefcase className={`w-8 h-8 ${theme.textHighlight}`} />,
      faqs: [
        {
          questionKey: "faq.smb.whatIsStudio",
          defaultQuestion: "What is the LoyalShift SMB Studio?",
          answerKey: "faq.smb.whatIsStudioAns",
          defaultAnswer:
            "The SMB Studio is an all-in-one digital command center for Small and Medium Businesses. It allows you to easily manage your website content (pages, blog), view customer inquiries, manage digital assets, and get basic analytics on your online performance. It's designed to be user-friendly, even if you're not tech-savvy.",
        },
        {
          questionKey: "faq.smb.websiteIncluded",
          defaultQuestion: "Is a website included with the SMB Studio?",
          answerKey: "faq.smb.websiteIncludedAns",
          defaultAnswer:
            "Yes, our standard <a href='/smb/pricing' class='text-cyan-600 hover:underline'>SMB Initiative package</a> includes the implementation of a professional homepage. The SMB Studio is then used to manage this website and other digital tools. We also offer more comprehensive website design and development services.",
        },
        {
          questionKey: "faq.smb.costaRicaFocus",
          defaultQuestion: "Are SMB solutions only for Costa Rican businesses?",
          answerKey: "faq.smb.costaRicaFocusAns",
          defaultAnswer:
            "While we are proudly based in Costa Rica and have a strong focus on supporting local PYMES, our SMB Studio platform is designed to be accessible and beneficial for small and medium businesses globally. We offer local support for Costa Rican clients and are expanding our reach.",
        },
      ],
    },
    {
      categoryKey: "faq.category.security",
      defaultCategoryTitle: "Security & Compliance",
      icon: <FiShield className={`w-8 h-8 ${theme.textHighlight}`} />,
      faqs: [
        {
          questionKey: "faq.security.dataProtection",
          defaultQuestion: "How does LoyalShift protect my data?",
          answerKey: "faq.security.dataProtectionAns",
          defaultAnswer:
            "Data security is paramount. We employ enterprise-grade security measures, including end-to-end encryption (AES-256), SOC2 compliance practices, role-based access controls, and regular security audits. For sensitive operations, we offer private cloud options and adhere to principles of zero data retention where applicable. Our CipherForge™ solution focuses specifically on privacy-enhancing technologies.",
        },
        {
          questionKey: "faq.security.compliance",
          defaultQuestion: "What compliance standards do you meet?",
          answerKey: "faq.security.complianceAns",
          defaultAnswer:
            "Our platform and practices are designed to help clients meet various compliance standards relevant to their industry, including GDPR, and we offer modules that can assist with HIPAA compliance for healthcare clients. We continuously update our systems based on evolving security best practices.",
        },
      ],
    },
    {
      categoryKey: "faq.category.pricing",
      defaultCategoryTitle: "Pricing & Plans",
      icon: <FiDollarSign className={`w-8 h-8 ${theme.textHighlight}`} />,
      faqs: [
        {
          questionKey: "faq.pricing.enterprise",
          defaultQuestion:
            "How is pricing determined for enterprise solutions?",
          answerKey: "faq.pricing.enterpriseAns",
          defaultAnswer:
            "Enterprise pricing is custom and based on the complexity of your legacy systems, the number of integrations required, the specific AI modules utilized, data volume, and the level of support and customization needed. We provide a detailed proposal after an initial consultation. Please <a href='contact' class='text-cyan-600 hover:underline'>contact our sales team</a> for a quote.",
        },
        {
          questionKey: "faq.pricing.smb",
          defaultQuestion: "What are the pricing options for SMBs?",
          answerKey: "faq.pricing.smbAns",
          defaultAnswer:
            "We offer clear, transparent pricing for SMBs. Our <a href='/smb/pricing' class='text-cyan-600 hover:underline'>SMB Initiative package</a> is a one-time fee to get your professional homepage online and includes one month of full Studio access. Afterwards, you can continue with Studio Lite (free for basic content management and invoice viewing) or subscribe to our affordable monthly SMB Plan for full Studio features. <a href='/smb/pricing' class='text-cyan-600 hover:underline'>See SMB Pricing Details</a>.",
        },
        {
          questionKey: "faq.pricing.changePlans",
          defaultQuestion: "Can I change my plan later?",
          answerKey: "faq.pricing.changePlansAns",
          defaultAnswer:
            "Yes, SMB clients can upgrade from Studio Lite to the full SMB Plan at any time. Enterprise clients can discuss plan adjustments with their account manager as their needs evolve.",
        },
      ],
    },
  ];

  return (
    <div className={`${theme.background} min-h-screen pt-16 pb-20`}>
      {/* Hero Section */}
      <SectionWrapper bg={theme.surfaceMuted} className="pt-12 md:pt-16">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className={`inline-flex p-4 ${theme.accentCyanBg}/10 rounded-full mb-6`}
          >
            <FiHelpCircle className={`w-10 h-10 ${theme.textHighlight}`} />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className={`text-4xl md:text-5xl font-extrabold ${theme.textPrimary} mb-4`}
          >
            {t("faq.mainTitle", "Frequently Asked Questions")}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className={`text-lg ${theme.textSecondary} max-w-2xl mx-auto`}
          >
            {t(
              "faq.mainSubtitle",
              "Find answers to common questions about LoyalShift, our services, and how we can help your business."
            )}
          </motion.p>
        </motion.div>
      </SectionWrapper>

      {/* FAQ List Section */}
      <SectionWrapper>
        {faqCategories.map((category, catIndex) => (
          <motion.div
            key={category.categoryKey}
            className="mb-10 md:mb-12"
            variants={fadeInUp}
          >
            <div
              className={`flex items-center mb-6 pb-3 border-b ${theme.border}`}
            >
              {category.icon}
              <h2 className={`ml-3 text-2xl font-bold ${theme.textPrimary}`}>
                {t(category.categoryKey, category.defaultCategoryTitle)}
              </h2>
            </div>
            <div className="space-y-4 max-w-4xl mx-auto">
              {category.faqs.map((faq, faqIndex) => (
                <FAQItem
                  key={`${catIndex}-${faqIndex}`}
                  t={t}
                  questionKey={faq.questionKey}
                  answerKey={faq.answerKey}
                  defaultQuestion={faq.defaultQuestion}
                  defaultAnswer={faq.defaultAnswer}
                  defaultOpen={faq.defaultOpen || false}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </SectionWrapper>

      {/* Still Have Questions? CTA Section */}
      <SectionWrapper bg={theme.surfaceMuted}>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <h2 className={`text-3xl font-bold ${theme.textPrimary} mb-4`}>
            {t("faq.ctaTitle", "Still Have Questions?")}
          </h2>
          <p className={`${theme.textSecondary} text-lg mb-8`}>
            {t(
              "faq.ctaSubtitle",
              "Our team is ready to assist you. Don't hesitate to reach out for more specific information or to discuss your unique business needs."
            )}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              to="/contact"
              variant="primary" // Will use theme.buttonPrimaryBg etc.
              size="lg"
              className="min-w-[200px]"
            >
              {t("faq.ctaButtonContact", "Contact Us")}
            </Button>
            <Button
              to="/contact"
              variant="outline"
              size="lg"
              className={`min-w-[200px] !border-2 !${theme.accentCyan} !${theme.accentCyan} hover:!bg-cyan-500/10`}
            >
              {t("faq.ctaButtonDemo", "Request a Demo")}
            </Button>
          </div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
