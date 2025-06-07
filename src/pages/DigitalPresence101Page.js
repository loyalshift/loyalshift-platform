// src/pages/smb/resources/guide/DigitalPresence101Page.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGlobe,
  FiEdit,
  FiArrowLeft,
  FiCheckCircle,
  FiShare2,
  FiTool,
  FiSmartphone,
  FiLayout,
  FiThumbsUp,
  FiExternalLink
} from "react-icons/fi";

import loyalShiftV2Theme from "../themes/loyalshift-v2.theme";
import { useLocalization } from "../components/LocalizationContext";

const theme = loyalShiftV2Theme;

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

// Reusable Components
const GuideHeader = ({ t, titleKey, subtitleKey, defaultTitle, defaultSubtitle }) => (
  <motion.div 
    className="text-center py-12 mb-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl"
    initial="hidden"
    animate="visible"
    variants={fadeInUp}
  >
    <div className="inline-flex items-center px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium mb-4">
      <FiGlobe className="mr-2" />
      {t("digitalPresence101.category", "Digital Marketing")}
    </div>
    <h1 className="text-4xl font-bold text-gray-900 mb-4">
      {t(titleKey, defaultTitle)}
    </h1>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
      {t(subtitleKey, defaultSubtitle)}
    </p>
  </motion.div>
);

const ContentSection = ({
  t,
  titleKey,
  children,
  defaultTitle,
  icon: Icon,
  className = "",
}) => (
  <motion.section
    className={`mb-8 p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}
    variants={fadeInUp}
    whileHover={{ y: -3 }}
  >
    <div className="flex items-center mb-5">
      {Icon && (
        <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg mr-4">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-900">
        {t(titleKey, defaultTitle)}
      </h2>
    </div>
    <div className="prose prose-gray max-w-none">
      {children}
    </div>
  </motion.section>
);

const TipCard = ({ children, icon: Icon = FiThumbsUp }) => (
  <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg my-6 flex items-start">
    <div className="flex-shrink-0 mt-1 mr-3 text-blue-500">
      <Icon className="w-5 h-5" />
    </div>
    <div className="text-blue-800">{children}</div>
  </div>
);

const NumberedStep = ({ number, title, children }) => (
  <div className="mb-6">
    <div className="flex items-center mb-2">
      <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="pl-11">{children}</div>
  </div>
);

const CallToAction = ({ t, textKey, buttonKey, link, defaultText, defaultButtonText }) => (
  <motion.div
    className="mt-12 p-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-center"
    variants={fadeInUp}
  >
    <h3 className="text-2xl font-bold text-white mb-4">
      {t(textKey, defaultText)}
    </h3>
    <Link
      to={link}
      className="inline-flex items-center justify-center px-6 py-3 bg-white text-cyan-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
    >
      {t(buttonKey, defaultButtonText)}
      <FiExternalLink className="ml-2" />
    </Link>
  </motion.div>
);

const BackButton = ({ t, link, textKey, defaultText }) => (
  <Link
    to={link}
    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-cyan-600 mb-8 transition-colors"
  >
    <FiArrowLeft className="w-4 h-4 mr-2" />
    {t(textKey, defaultText)}
  </Link>
);

export default function DigitalPresence101Page() {
  const { t } = useLocalization();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <BackButton
          t={t}
          link="/smb/resources"
          textKey="digitalPresence101.backButton"
          defaultText="Back to Resources"
        />

        <GuideHeader
          t={t}
          titleKey="digitalPresence101.mainTitle"
          subtitleKey="digitalPresence101.mainSubtitle"
          defaultTitle="Digital Presence 101 for SMBs"
          defaultSubtitle="Your essential guide to building a strong online foundation for your business"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <ContentSection
            t={t}
            titleKey="digitalPresence101.sectionWhatIs.title"
            defaultTitle="Why Digital Presence Matters"
            icon={FiGlobe}
          >
            <p>
              In today's digital-first world, your online presence is often the first impression customers have of your business. A strong digital presence helps you:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-start">
                <div className="bg-cyan-100 text-cyan-600 p-1 rounded-full mr-3 mt-1">
                  <FiCheckCircle className="w-4 h-4" />
                </div>
                <span>Reach more potential customers</span>
              </div>
              <div className="flex items-start">
                <div className="bg-cyan-100 text-cyan-600 p-1 rounded-full mr-3 mt-1">
                  <FiCheckCircle className="w-4 h-4" />
                </div>
                <span>Build trust and credibility</span>
              </div>
              <div className="flex items-start">
                <div className="bg-cyan-100 text-cyan-600 p-1 rounded-full mr-3 mt-1">
                  <FiCheckCircle className="w-4 h-4" />
                </div>
                <span>Compete with larger businesses</span>
              </div>
              <div className="flex items-start">
                <div className="bg-cyan-100 text-cyan-600 p-1 rounded-full mr-3 mt-1">
                  <FiCheckCircle className="w-4 h-4" />
                </div>
                <span>Provide better customer service</span>
              </div>
            </div>
            
            <TipCard>
              <strong>Did you know?</strong> 97% of consumers search online for local businesses. 
              Without a digital presence, you're invisible to nearly all potential customers.
            </TipCard>
          </ContentSection>

          <ContentSection
            t={t}
            titleKey="digitalPresence101.sectionKeyComponents.title"
            defaultTitle="5 Pillars of a Strong Digital Presence"
            icon={FiCheckCircle}
          >
            <NumberedStep number="1" title="Professional Website">
              <p>Your website is your digital storefront. It should be:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Mobile-friendly (Google prioritizes mobile-first indexing)</li>
                <li>Fast-loading (aim for under 3-second load time)</li>
                <li>Secure (HTTPS is a must)</li>
                <li>Easy to navigate with clear calls-to-action</li>
              </ul>
            </NumberedStep>

            <NumberedStep number="2" title="Google Business Profile">
              <p>Essential for local visibility. Complete every section and keep it updated with:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Accurate business information</li>
                <li>High-quality photos</li>
                <li>Regular posts and updates</li>
              </ul>
            </NumberedStep>

            <NumberedStep number="3" title="Social Media Strategy">
              <p>Focus on platforms where your customers are active:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Facebook</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Instagram</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">LinkedIn</span>
              </div>
            </NumberedStep>

            <NumberedStep number="4" title="Content Marketing">
              <p>Create valuable content that helps your customers:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Blog posts answering common questions</li>
                <li>How-to guides and tutorials</li>
                <li>Customer success stories</li>
              </ul>
            </NumberedStep>

            <NumberedStep number="5" title="Online Reviews">
              <p>Build trust through authentic reviews:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Encourage happy customers to leave reviews</li>
                <li>Respond professionally to all reviews</li>
                <li>Showcase reviews on your website</li>
              </ul>
            </NumberedStep>
          </ContentSection>

          <ContentSection
            t={t}
            titleKey="digitalPresence101.sectionGettingStarted.title"
            defaultTitle="30-Day Digital Presence Action Plan"
            icon={FiEdit}
          >
            <div className="space-y-6">
              <div className="border-l-4 border-cyan-500 pl-5 py-1">
                <h3 className="text-lg font-semibold text-gray-900">Week 1: Foundation</h3>
                <ul className="mt-2 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-5 h-5 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    </div>
                    <span>Register domain and set up basic website</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-5 h-5 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    </div>
                    <span>Claim and complete your Google Business Profile</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-5 py-1">
                <h3 className="text-lg font-semibold text-gray-900">Week 2: Content</h3>
                <ul className="mt-2 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    </div>
                    <span>Create essential website pages: Home, About, Contact</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    </div>
                    <span>Write and publish your first blog post</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-5 py-1">
                <h3 className="text-lg font-semibold text-gray-900">Week 3: Engagement</h3>
                <ul className="mt-2 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">5</div>
                    </div>
                    <span>Set up and optimize 1-2 social media profiles</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">6</div>
                    </div>
                    <span>Ask 5 satisfied customers for reviews</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-5 py-1">
                <h3 className="text-lg font-semibold text-gray-900">Week 4: Optimization</h3>
                <ul className="mt-2 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">7</div>
                    </div>
                    <span>Install basic analytics (Google Analytics)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">8</div>
                    </div>
                    <span>Create content calendar for next month</span>
                  </li>
                </ul>
              </div>
            </div>
          </ContentSection>

          <CallToAction
            t={t}
            textKey="digitalPresence101.cta.text"
            buttonKey="digitalPresence101.cta.button"
            link="/smb/features"
            defaultText="Ready to build your digital presence with easy-to-use tools?"
            defaultButtonText="Explore SMB Studio Features"
          />
        </motion.div>
      </div>
    </div>
  );
}
