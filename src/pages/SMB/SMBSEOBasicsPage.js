// src/pages/smb/resources/guide/SEOBasicsPage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// --- Icons ---
import {
  FiSearch,
  FiLink,
  FiTool,
  FiArrowLeft,
  FiThumbsUp,
  FiFileText,
} from "react-icons/fi";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";
import { useLocalization } from "../../components/LocalizationContext";

const theme = loyalShiftV2Theme;

// --- Animation Variants (can be shared if in a utils file) ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// --- Reusable Components (copied from DigitalPresence101Page for standalone use, ideally these would be in a shared components directory) ---
const GuideHeader = ({
  t,
  titleKey,
  subtitleKey,
  defaultTitle,
  defaultSubtitle,
}) => (
  <motion.div
    className="mb-12 md:mb-16 text-center pt-10 pb-8"
    initial="hidden"
    animate="visible"
    variants={fadeInUp}
  >
    <h1
      className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${theme.textPrimary} mb-4 leading-tight`}
    >
      {t(titleKey, defaultTitle)}
    </h1>
    <p
      className={`text-lg md:text-xl ${theme.textSecondary} max-w-3xl mx-auto`}
    >
      {t(subtitleKey, defaultSubtitle)}
    </p>
  </motion.div>
);

GuideHeader.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string.isRequired,
  subtitleKey: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string,
  defaultSubtitle: PropTypes.string,
};

const ContentSection = ({
  t,
  titleKey,
  children,
  defaultTitle,
  icon: Icon,
  className = "",
}) => (
  <motion.section
    className={`mb-10 md:mb-12 p-6 sm:p-8 rounded-xl ${theme.surfaceCard} border ${theme.border} ${theme.cardShadow} ${className}`}
    variants={fadeInUp}
  >
    <div className="flex items-center mb-5">
      {Icon && (
        <Icon className={`w-7 h-7 ${theme.textHighlight} mr-3 flex-shrink-0`} />
      )}
      <h2 className={`text-2xl font-semibold ${theme.textPrimary}`}>
        {t(titleKey, defaultTitle)}
      </h2>
    </div>
    <div
      className={`prose prose-slate dark:prose-invert max-w-none ${theme.textSecondary} text-base leading-relaxed space-y-4`}
    >
      {children}
    </div>
  </motion.section>
);

ContentSection.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultTitle: PropTypes.string,
  icon: PropTypes.elementType,
  className: PropTypes.string,
};

const CallToAction = ({
  t,
  textKey,
  buttonKey,
  link,
  defaultText,
  defaultButtonText,
}) => (
  <motion.div
    className={`mt-12 p-8 rounded-lg text-center ${theme.surfaceMuted} border ${theme.borderLight}`}
    variants={fadeInUp}
  >
    <p className={`${theme.textPrimary} text-xl font-semibold mb-4`}>
      {t(textKey, defaultText)}
    </p>
    <Link
      to={link}
      className={`inline-flex items-center justify-center px-8 py-3 text-base font-medium ${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} rounded-md shadow-sm ${theme.buttonPrimaryHoverBg} transition-colors ${theme.focusRingDefault}`}
    >
      {t(buttonKey, defaultButtonText)}
    </Link>
  </motion.div>
);

CallToAction.propTypes = {
  t: PropTypes.func.isRequired,
  textKey: PropTypes.string.isRequired,
  buttonKey: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  defaultText: PropTypes.string,
  defaultButtonText: PropTypes.string,
};

const BackButton = ({ t, link, textKey, defaultText }) => (
  <Link
    to={link}
    className={`inline-flex items-center text-sm font-medium ${theme.textSecondary} hover:${theme.textHighlight} mb-8 group`}
  >
    <FiArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
    {t(textKey, defaultText)}
  </Link>
);

BackButton.propTypes = {
  t: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  textKey: PropTypes.string.isRequired,
  defaultText: PropTypes.string,
};
// --- END Reusable Components ---

// --- Main SEOBasicsPage Component ---
export default function SEOBasicsPage() {
  const { t } = useLocalization();

  return (
    <div className={`min-h-screen ${theme.background} py-8`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <BackButton
          t={t}
          link="/smb/resources"
          textKey="seoBasics.backButton"
          defaultText="Back to Resources"
        />

        <GuideHeader
          t={t}
          titleKey="seoBasics.mainTitle"
          subtitleKey="seoBasics.mainSubtitle"
          defaultTitle="SEO Basics for Small Businesses"
          defaultSubtitle="Understand the fundamentals of Search Engine Optimization to help your customers find you online more easily, based on Google's guidelines."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <ContentSection
            t={t}
            titleKey="seoBasics.sectionWhatIsSEO.title"
            defaultTitle="What is SEO & Why It Matters for Your SMB"
            icon={FiSearch}
          >
            <p>
              {t(
                "seoBasics.sectionWhatIsSEO.p1",
                "SEO, or Search Engine Optimization, is the process of improving your website so it appears higher in search engine results (like Google) for relevant searches. It's about making your site more visible to people who are actively looking for your products or services."
              )}
            </p>
            <p>
              {t(
                "seoBasics.sectionWhatIsSEO.p2",
                "For SMBs, effective SEO means more organic (free) traffic to your website, leading to increased brand visibility, more potential customers, and higher sales. It's a cost-effective way to compete and grow."
              )}
            </p>
            <h4
              className={`text-md font-semibold ${theme.textPrimary} mt-4 mb-1`}
            >
              {t(
                "seoBasics.howGoogleWorks.title",
                "How Google Search Works (Simplified)"
              )}
            </h4>
            <p>
              {t(
                "seoBasics.howGoogleWorks.p1",
                "Google uses automated programs called 'crawlers' to explore the web, find new and updated pages, and add them to its massive database, called the Google 'index'. When someone searches, Google sifts through this index to find the most relevant and high-quality pages to show as results. This process involves three main stages:"
              )}
            </p>
            <ul className="list-decimal pl-5 space-y-1 mt-2">
              <li>
                <strong>
                  {t("seoBasics.googleStage.crawling", "Crawling:")}
                </strong>{" "}
                {t(
                  "seoBasics.googleStage.crawlingDesc",
                  "Google discovers your URLs."
                )}
              </li>
              <li>
                <strong>
                  {t("seoBasics.googleStage.indexing", "Indexing:")}
                </strong>{" "}
                {t(
                  "seoBasics.googleStage.indexingDesc",
                  "Google analyzes the content (text, images, videos) and stores this information."
                )}
              </li>
              <li>
                <strong>
                  {t("seoBasics.googleStage.serving", "Serving Results:")}
                </strong>{" "}
                {t(
                  "seoBasics.googleStage.servingDesc",
                  "Google returns the most relevant pages from its index for a user's query."
                )}
              </li>
            </ul>
          </ContentSection>

          <ContentSection
            t={t}
            titleKey="seoBasics.sectionOnPage.title"
            defaultTitle="On-Page SEO: Optimizing Your Website Content"
            icon={FiFileText}
          >
            <p>
              {t(
                "seoBasics.sectionOnPage.intro",
                "On-page SEO refers to optimizing elements directly within your website pages. Key aspects include:"
              )}
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>
                  {t(
                    "seoBasics.onPage.keywords.title",
                    "Keyword Research & Usage:"
                  )}
                </strong>{" "}
                {t(
                  "seoBasics.onPage.keywords.desc",
                  "Identify terms your potential customers use to search for your products/services. Integrate these keywords naturally into your page titles, headings, content, and image descriptions. Think about what words users would type."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "seoBasics.onPage.qualityContent.title",
                    "High-Quality, People-First Content:"
                  )}
                </strong>{" "}
                {t(
                  "seoBasics.onPage.qualityContent.desc",
                  "Create original, substantial, and helpful content that provides value to your visitors. Ensure it's well-written, easy to read, and demonstrates expertise (E-E-A-T). LoyalShift SMB Studio's blog feature is great for this."
                )}
              </li>
              <li>
                <strong>
                  {t("seoBasics.onPage.titleTags.title", "Title Tags:")}
                </strong>{" "}
                {t(
                  "seoBasics.onPage.titleTags.desc",
                  "The clickable headline shown in search results. Make it unique, clear, concise, and descriptive of the page's content."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "seoBasics.onPage.metaDescriptions.title",
                    "Meta Descriptions:"
                  )}
                </strong>{" "}
                {t(
                  "seoBasics.onPage.metaDescriptions.desc",
                  "A brief summary of the page shown below the title in search results. Write compelling descriptions to encourage clicks."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "seoBasics.onPage.headerTags.title",
                    "Header Tags (H1-H6):"
                  )}
                </strong>{" "}
                {t(
                  "seoBasics.onPage.headerTags.desc",
                  "Use headers to structure your content logically, making it easier for users and search engines to understand the page hierarchy."
                )}
              </li>
              <li>
                <strong>
                  {t("seoBasics.onPage.imageOpt.title", "Image Optimization:")}
                </strong>{" "}
                {t(
                  "seoBasics.onPage.imageOpt.desc",
                  "Use descriptive file names and 'alt text' for all images. This helps search engines understand image content and improves accessibility."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "seoBasics.onPage.internalLinks.title",
                    "Internal Linking:"
                  )}
                </strong>{" "}
                {t(
                  "seoBasics.onPage.internalLinks.desc",
                  "Link to other relevant pages within your own website to help users navigate and distribute link equity."
                )}
              </li>
            </ul>
          </ContentSection>

          <ContentSection
            t={t}
            titleKey="seoBasics.sectionTechnical.title"
            defaultTitle="Technical SEO: Ensuring Your Site is Search-Friendly"
            icon={FiTool}
          >
            <p>
              {t(
                "seoBasics.sectionTechnical.intro",
                "Technical SEO focuses on improving your website's infrastructure so search engines can crawl and index it effectively."
              )}
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>
                  {t(
                    "seoBasics.technical.mobileFriendly.title",
                    "Mobile-Friendliness:"
                  )}
                </strong>{" "}
                {t(
                  "seoBasics.technical.mobileFriendly.desc",
                  "Your website must be responsive and provide a good experience on all devices. Google uses mobile-first indexing."
                )}
              </li>
              <li>
                <strong>
                  {t("seoBasics.technical.pageSpeed.title", "Page Speed:")}
                </strong>{" "}
                {t(
                  "seoBasics.technical.pageSpeed.desc",
                  "Faster loading sites offer better user experience and tend to rank higher. Optimize images and leverage browser caching."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "seoBasics.technical.siteStructure.title",
                    "Site Structure & Navigation:"
                  )}
                </strong>{" "}
                {t(
                  "seoBasics.technical.siteStructure.desc",
                  "A logical site structure with clear navigation helps search engines discover and understand your content. Use descriptive URLs."
                )}
              </li>
              <li>
                <strong>
                  {t("seoBasics.technical.sitemap.title", "XML Sitemap:")}
                </strong>{" "}
                {t(
                  "seoBasics.technical.sitemap.desc",
                  "Submit a sitemap to Google Search Console to help Google find all important pages on your site."
                )}
              </li>
              <li>
                <strong>
                  {t("seoBasics.technical.robotsTxt.title", "Robots.txt:")}
                </strong>{" "}
                {t(
                  "seoBasics.technical.robotsTxt.desc",
                  "Use this file to instruct search engine crawlers which parts of your site not to crawl (but not for blocking indexing)."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "seoBasics.technical.duplicateContent.title",
                    "Manage Duplicate Content:"
                  )}
                </strong>{" "}
                {t(
                  "seoBasics.technical.duplicateContent.desc",
                  "Ensure each piece of content is accessible through only one URL (canonical URL) to avoid confusion for search engines."
                )}
              </li>
            </ul>
            <p className="mt-3">
              {t(
                "seoBasics.technical.loyalshiftHelp",
                "LoyalShift SMB Studio creates websites with clean code and mobile responsiveness from the start, providing a solid technical SEO foundation."
              )}
            </p>
          </ContentSection>

          <ContentSection
            t={t}
            titleKey="seoBasics.sectionOffPage.title"
            defaultTitle="Off-Page SEO: Building Authority & Trust"
            icon={FiLink}
          >
            <p>
              {t(
                "seoBasics.sectionOffPage.intro",
                "Off-page SEO involves activities done outside your website to build its reputation and authority."
              )}
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>
                  {t("seoBasics.offPage.linkBuilding.title", "Link Building:")}
                </strong>{" "}
                {t(
                  "seoBasics.offPage.linkBuilding.desc",
                  "Earning links from other reputable and relevant websites signals to search engines that your content is trustworthy and valuable."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "seoBasics.offPage.localSEO.title",
                    "Local SEO (Google Business Profile):"
                  )}
                </strong>{" "}
                {t(
                  "seoBasics.offPage.localSEO.desc",
                  "Crucial for local businesses. Ensure your Google Business Profile is complete, accurate, and active with posts and reviews."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "seoBasics.offPage.socialMedia.title",
                    "Social Media Marketing:"
                  )}
                </strong>{" "}
                {t(
                  "seoBasics.offPage.socialMedia.desc",
                  "While not a direct ranking factor, an active social media presence can increase brand visibility, drive traffic, and indirectly support your SEO efforts."
                )}
              </li>
              <li>
                <strong>
                  {t(
                    "seoBasics.offPage.brandMentions.title",
                    "Online Reviews & Brand Mentions:"
                  )}
                </strong>{" "}
                {t(
                  "seoBasics.offPage.brandMentions.desc",
                  "Positive reviews and mentions across the web can enhance your online reputation and trustworthiness."
                )}
              </li>
            </ul>
          </ContentSection>

          <ContentSection
            t={t}
            titleKey="seoBasics.sectionKeyTakeaways.title"
            defaultTitle="Key Takeaways for SMBs"
            icon={FiThumbsUp}
          >
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                {t(
                  "seoBasics.takeaway1",
                  "Focus on creating helpful, reliable, people-first content."
                )}
              </li>
              <li>
                {t(
                  "seoBasics.takeaway2",
                  "Understand what your customers are searching for (keyword research)."
                )}
              </li>
              <li>
                {t(
                  "seoBasics.takeaway3",
                  "Ensure your website is technically sound, mobile-friendly, and fast."
                )}
              </li>
              <li>
                {t(
                  "seoBasics.takeaway4",
                  "Optimize your on-page elements like titles, descriptions, and content structure."
                )}
              </li>
              <li>
                {t(
                  "seoBasics.takeaway5",
                  "For local businesses, prioritize your Google Business Profile."
                )}
              </li>
              <li>
                {t(
                  "seoBasics.takeaway6",
                  "Be patient and consistent; SEO is a long-term strategy."
                )}
              </li>
            </ul>
            <p className="mt-3">
              {t(
                "seoBasics.takeawayNote",
                "LoyalShift SMB Studio includes tools to help you manage your website content and implement basic on-page SEO practices. For advanced strategies, consider consulting an SEO professional."
              )}
            </p>
          </ContentSection>

          <CallToAction
            t={t}
            textKey="seoBasics.cta.text"
            buttonKey="seoBasics.cta.button"
            link="/smb/features#content-creation" // Example link to relevant feature section
            defaultText="Ready to improve your SMB's search visibility with easy-to-use tools?"
            defaultButtonText="Explore Content & SEO Tools in SMB Studio"
          />
        </motion.div>
      </div>
    </div>
  );
}

SEOBasicsPage.propTypes = {
  // No external props for this page component directly
};
