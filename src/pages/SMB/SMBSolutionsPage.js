// src/pages/SMBSolutionsPage.js
import React from "react";
import { Link } from "react-router-dom"; // Assuming Button component handles 'to' or you use Link directly
import { motion } from "framer-motion";
import { useLocalization } from "../../components/LocalizationContext";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme"; // Import the theme
import Button from "../../components/Button"; // Assuming Button component exists and uses theme

const theme = loyalShiftV2Theme; // Use the imported theme

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// --- Icons (Styled with theme) ---
const IconLightBulb = () => (
  <svg
    className={`w-12 h-12 ${theme.textHighlight}`} // Using theme.textHighlight (cyan)
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
    />
  </svg>
);

const IconChartPie = () => (
  <svg
    className={`w-12 h-12 ${theme.textHighlight}`} // Using theme.textHighlight
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
    />
  </svg>
);

const IconUsersGroup = () => (
  <svg
    className={`w-12 h-12 ${theme.textHighlight}`} // Using theme.textHighlight
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
    />
  </svg>
);

const IconKeyBenefit = () => (
  // A generic icon for key benefits
  <svg
    className={`w-5 h-5 ${theme.accentCyan}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const SolutionCard = ({
  icon,
  titleKey,
  defaultTitle,
  descriptionKey,
  defaultDescription,
  keyBenefitKey, // New prop for key benefit localization key
  defaultKeyBenefit, // New prop for key benefit default text
  linkTo,
}) => {
  const { t } = useLocalization();

  return (
    <motion.div
      variants={fadeInUp}
      className={`${theme.surfaceCard} rounded-2xl ${theme.cardShadow} overflow-hidden transition-all duration-300 ${theme.cardHoverShadow} hover:-translate-y-1.5 border ${theme.borderLight} flex flex-col h-full`}
      whileHover={{ boxShadow: theme.cardHoverShadow.replace("hover:", "") }} // Ensure shadow applies on hover
    >
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {" "}
        {/* Increased padding */}
        <div className="mb-5 flex justify-center">{icon}</div>
        <h3
          className={`text-xl md:text-2xl font-bold ${theme.textPrimary} mb-3 text-center`}
        >
          {t(titleKey, defaultTitle)}
        </h3>
        <p
          className={`${theme.textSecondary} mb-5 text-center text-sm md:text-base leading-relaxed flex-grow`}
        >
          {t(descriptionKey, defaultDescription)}
        </p>
        {/* Key Benefit Section */}
        {(keyBenefitKey || defaultKeyBenefit) && (
          <div
            className={`${theme.surfaceMuted} rounded-lg p-4 mb-6 border ${theme.borderLight} text-center`}
          >
            <div className="flex items-center justify-center mb-2">
              <IconKeyBenefit />
              <h4 className={`ml-2 text-sm font-semibold ${theme.textPrimary}`}>
                {t("smbSolutions.grid.keyBenefitLabel", "Key Benefit")}
              </h4>
            </div>
            <p className={`text-sm ${theme.textSecondary}`}>
              {t(keyBenefitKey, defaultKeyBenefit)}
            </p>
          </div>
        )}
        <div className="mt-auto pt-4">
          {" "}
          {/* Ensure link is at the bottom */}
          <Link
            to={linkTo}
            className={`block text-center font-semibold ${theme.linkStyle} group text-base`}
          >
            {t("smbSolutions.grid.learnMore", "Learn how")}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function SMBSolutionsPage() {
  const { t } = useLocalization();

  const solutions = [
    {
      icon: <IconLightBulb />,
      titleKey: "smbSolutions.solution1.title",
      defaultTitle: "Boost Your Online Visibility",
      descriptionKey: "smbSolutions.solution1.description",
      defaultDescription:
        "Get noticed with SEO-optimized content and strategic asset management that resonates with your target audience.",
      keyBenefitKey: "smbSolutions.solution1.benefit", // New
      defaultKeyBenefit: "Attract more qualified leads organically.", // New
      linkTo: "/smb/features#content-seo",
    },
    {
      icon: <IconChartPie />,
      titleKey: "smbSolutions.solution2.title",
      defaultTitle: "Simplify Content Management",
      descriptionKey: "smbSolutions.solution2.description",
      defaultDescription:
        "Streamline your content workflow with intuitive tools for creation, organization, publishing, and scheduling.",
      keyBenefitKey: "smbSolutions.solution2.benefit", // New
      defaultKeyBenefit: "Save time and publish consistently with ease.", // New
      linkTo: "/smb/features#asset-library",
    },
    {
      icon: <IconUsersGroup />,
      titleKey: "smbSolutions.solution3.title",
      defaultTitle: "Engage and Grow Your Audience",
      descriptionKey: "smbSolutions.solution3.description",
      defaultDescription:
        "Transform followers into loyal customers with insights-driven engagement strategies and communication tools.",
      keyBenefitKey: "smbSolutions.solution3.benefit", // New
      defaultKeyBenefit: "Build stronger customer relationships.", // New
      linkTo: "/smb/features#analytics",
    },
  ];

  // --- IconRocketLaunch (assuming it's defined as before) ---
  const IconRocketLaunch = () => (
    <svg
      className="w-16 h-16 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    </svg>
  );
  // --- Checkmark Icon for Studio Spotlight ---
  const IconCheck = () => (
    <svg
      className={`w-5 h-5 ${theme.successText} mr-2`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
  // --- Studio Icon for Spotlight ---
  const IconStudioSpotlight = () => (
    <svg
      className="w-16 h-16 mx-auto"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
      />
    </svg>
  );

  return (
    <div className={`min-h-screen ${theme.background}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <motion.div variants={fadeInUp} className="flex justify-center mb-8">
            <IconRocketLaunch />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
          >
            {" "}
            {/* Added font-extrabold and leading-tight */}
            {t(
              "smbSolutions.hero.title",
              "Solutions Built for Your Business Growth"
            )}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed"
          >
            {" "}
            {/* Added leading-relaxed and increased md text size */}
            {t(
              "smbSolutions.hero.subtitle",
              "Discover how LoyalShift solves your biggest digital challenges with tailored solutions that deliver results."
            )}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              to="/smb/features" // More specific link
              size="lg" // Using Button component size prop
              className={`${theme.buttonPrimaryBg} ${theme.buttonTextLight} ${theme.buttonPrimaryHoverBg} px-8 py-3.5 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              {t("smbSolutions.hero.cta1", "Explore SMB Studio")}
            </Button>
            <Button
              to="/contact?subject=SMBDemoRequest" // Specific subject
              variant="outline"
              size="lg"
              className={`border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 hover:text-white shadow-md hover:shadow-lg transform hover:scale-105`}
            >
              {t("smbSolutions.hero.cta2", "Book a Demo")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Studio Spotlight */}
      <section className={`py-16 md:py-24 ${theme.surfaceMuted}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className={`${theme.surfaceCard} rounded-3xl ${theme.cardShadow} overflow-hidden border ${theme.borderLight}`}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInUp}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-10 md:p-12 flex flex-col justify-center">
                <span
                  className={`text-sm font-semibold ${theme.textHighlight} uppercase tracking-wider mb-4`}
                >
                  {t("smbSolutions.spotlight.eyebrow", "Integrated Platform")}
                </span>

                <h2
                  className={`text-3xl md:text-4xl font-bold ${theme.textPrimary} mb-6`}
                >
                  {t(
                    "smbSolutions.spotlight.title",
                    "All-in-One Digital Command Center"
                  )}
                </h2>

                <p
                  className={`text-lg ${theme.textSecondary} mb-8 leading-relaxed`}
                >
                  {t(
                    "smbSolutions.spotlight.description",
                    "LoyalShift SMB Studio consolidates content creation, asset management, analytics, and publishing in one intuitive platform designed to save time and amplify results."
                  )}
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8 text-base">
                  {[
                    {
                      key: "smbSolutions.spotlight.feature1",
                      default: "Content Creation Tools",
                    },
                    {
                      key: "smbSolutions.spotlight.feature2",
                      default: "Asset Management Suite",
                    },
                    {
                      key: "smbSolutions.spotlight.feature3",
                      default: "AI-Powered Assistance",
                    },
                    {
                      key: "smbSolutions.spotlight.feature4",
                      default: "Analytics Dashboard",
                    },
                  ].map((feature) => (
                    <div key={feature.key} className="flex items-center">
                      <svg
                        className={`w-5 h-5 ${theme.successText} mr-2`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className={theme.textSecondary}>
                        {t(feature.key, feature.default)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    to="/smb/features" // Link to features page
                    className={`${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} font-semibold py-3 px-8 rounded-lg shadow-md ${theme.buttonPrimaryHoverBg} transition duration-300 text-lg text-center`}
                  >
                    {t(
                      "smbSolutions.spotlight.cta1",
                      "Explore Studio Features"
                    )}
                  </Button>
                  <Button
                    to="/smb/pricing" // Link to SMB pricing
                    variant="outline"
                    className={`${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} font-semibold py-3 px-8 rounded-lg ${theme.buttonSecondaryHoverBg} transition duration-300 text-lg text-center`}
                  >
                    {t("smbSolutions.spotlight.cta2", "View Pricing")}
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-10 md:p-12 flex items-center justify-center min-h-[400px] lg:min-h-full">
                <div className="text-center text-white">
                  <div
                    className={`inline-block ${theme.surfaceCard}/20 backdrop-blur-sm rounded-2xl p-6 mb-6`}
                  >
                    {" "}
                    {/* White/20 for glassmorphism */}
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    LoyalShift SMB Studio
                  </h3>
                  <p className="text-lg mb-6 opacity-90 max-w-md mx-auto">
                    {t(
                      "smbSolutions.spotlight.tagline",
                      "Everything you need to manage your digital presence in one place"
                    )}
                  </p>

                  <div className="flex justify-center space-x-4">
                    <div
                      className={`${theme.surfaceCard}/20 rounded-lg p-3 backdrop-blur-sm`}
                    >
                      <span className="text-2xl font-bold block">87%</span>
                      <span className="text-sm">Time Saved</span>
                    </div>
                    <div
                      className={`${theme.surfaceCard}/20 rounded-lg p-3 backdrop-blur-sm`}
                    >
                      <span className="text-2xl font-bold block">3.2x</span>
                      <span className="text-sm">Engagement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid Section */}
      <section className={`py-16 md:py-24 ${theme.surface}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className={`text-base font-semibold ${theme.textHighlight} uppercase tracking-wider mb-3 block`}
            >
              {t("smbSolutions.grid.eyebrow", "Strategic Solutions")}
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${theme.textPrimary} mb-4`}
            >
              {t("smbSolutions.grid.title", "Solve Your Business Challenges")}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className={`text-lg md:text-xl ${theme.textSecondary} max-w-3xl mx-auto`}
            >
              {t(
                "smbSolutions.grid.subtitle",
                "Targeted approaches to your most pressing digital needs, designed for impact and ease of use."
              )}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" // Adjusted gap
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            {solutions.map((solution, index) => (
              <SolutionCard key={index} {...solution} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${theme.resultsSectionBg} text-white`}>
        {/* Changed bg to resultsSectionBg if it's dark, or a theme.primaryGradient */}
        <div
          className={`bg-gradient-to-r from-cyan-600 to-blue-700 py-16 md:py-20`}
        >
          {/* Inner gradient for text contrast */}
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              {t(
                "smbSolutions.cta.title",
                "Ready to Transform Your Digital Presence?"
              )}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              transition={{ delay: 0.1 }}
              className="text-xl mb-10 max-w-2xl mx-auto opacity-90"
            >
              {t(
                "smbSolutions.cta.subtitle",
                "Join thousands of SMBs growing with LoyalShift"
              )}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                to="/smb/pricing" // Link to SMB pricing
                variant="secondary"
              >
                {t("smbSolutions.cta.cta1", "View Plans & Get Started")}
              </Button>
              <Button
                to="/contact?subject=SMBDemoRequest" // Specific subject for demo
                variant="outline"
                className={`border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition duration-300 text-lg`}
              >
                {t("smbSolutions.cta.cta2", "Schedule a Personalized Demo")}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
