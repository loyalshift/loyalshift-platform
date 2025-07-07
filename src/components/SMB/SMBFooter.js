// src/components/LoyalShiftSMBFooter.js
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiInstagram,
  FiCpu,
} from "react-icons/fi";
import { useLocalization } from "../LocalizationContext";
import { LoyalShiftLogo } from "../LoyalShiftLogo";

// LoyalShift Logo

// Sub-components
const FooterLink = ({ to, children, tKey, isDark }) => {
  const { t } = useLocalization(); // Use hook inside sub-component
  return (
    <Link
      to={to}
      className={`text-sm ${
        isDark
          ? "text-smb-light-gray hover:text-smb-off-white"
          : "text-slate-600 hover:text-slate-800"
      } transition-colors duration-200 ease-in-out hover:underline`}
    >
      {t(tKey, children)}
    </Link>
  );
};

FooterLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  tKey: PropTypes.string.isRequired,
  isDark: PropTypes.bool.isRequired,
};

const SocialIcon = ({ href, icon: Icon, titleKey, defaultTitle }) => {
  const { t } = useLocalization(); // Use hook inside sub-component
  const isDark = false; // Not used in this component
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={t(titleKey, defaultTitle)}
      className={`p-2 rounded-full ${
        isDark
          ? "text-smb-light-gray hover:text-smb-primary-green"
          : "text-slate-500 hover:text-smb-primary-green"
      } transition-colors duration-200 ease-in-out`}
    >
      <Icon className="w-5 h-5" />
    </a>
  );
};

SocialIcon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  titleKey: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string.isRequired,
};

// Main Footer Component
const LoyalShiftSMBFooter = ({ forceDark }) => {
  const { t } = useLocalization(); // Access localization context
  const currentYear = new Date().getFullYear();
  const isDark = forceDark;

  // Theme classes
  const footerThemeClasses = isDark
    ? "bg-slate-800 border-slate-700 text-smb-off-white"
    : "bg-smb-off-white border-slate-200 text-slate-700";

  const primaryTextClass = isDark ? "text-smb-off-white" : "text-slate-800";
  const secondaryTextClass = isDark ? "text-smb-light-gray" : "text-slate-600";
  const tertiaryTextClass = isDark ? "text-smb-light-gray" : "text-slate-500";

  const footerLinksColumn1 = [
    { tKey: "loyalShiftSMBFooter.navAboutUsSMB", path: "/smb/about-us" },
    { tKey: "loyalShiftSMBFooter.navSolutionsSMB", path: "/smb/solutions" },
    { tKey: "loyalShiftSMBFooter.navPricingSMB", path: "/smb/pricing" },
  ];

  const footerLinksColumn2 = [
    { tKey: "loyalShiftSMBFooter.navResourcesBlog", path: "/smb/resources" },
    { tKey: "loyalShiftSMBFooter.navContact", path: "/contact" },
  ];

  const legalLinks = [
    { tKey: "loyalShiftSMBFooter.legalPrivacyPolicy", path: "/smb/privacy" },
    { tKey: "loyalShiftSMBFooter.legalTermsOfService", path: "/smb/terms" },
  ];

  const socialLinks = [
    {
      icon: FiLinkedin,
      href: "https://linkedin.com/in/loyalshift",
      titleKey: "loyalShiftSMBFooter.socialLinkedInTitle",
      defaultTitle: "LoyalShift LinkedIn",
    },
    {
      icon: FiGithub,
      href: "https://github.com/loyalshift",
      titleKey: "loyalShiftSMBFooter.socialGitHubTitle",
      defaultTitle: "LoyalShift GitHub",
    },
    {
      icon: FiInstagram,
      href: "https://instagram.com/loyalshift",
      titleKey: "loyalShiftSMBFooter.socialInstagramTitle",
      defaultTitle: "LoyalShift Instagram",
    },
    {
      icon: FiTwitter,
      href: "https://x.com/loyalshift",
      titleKey: "loyalShiftSMBFooter.socialTwitterTitle",
      defaultTitle: "LoyalShift X (Twitter)",
    },
    {
      icon: FiCpu,
      href: "https://huggingface.co/loyalshift",
      titleKey: "loyalShiftSMBFooter.socialHuggingFaceTitle",
      defaultTitle: "LoyalShift HuggingFace",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const rawCopyrightText = t(
    "loyalShiftSMBFooter.copyrightText",
    "© {currentYear} LoyalShift Technologies. An initiative for SMBs in Costa Rica. All rights reserved."
  );
  const copyrightText = rawCopyrightText.replace(
    "{currentYear}",
    currentYear.toString()
  );

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUp}
      className={`border-t ${footerThemeClasses} transition-colors duration-300 ease-in-out`}
    >
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Column 1: Logo and Intro */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link to="/smb" className="inline-block mb-4">
              <LoyalShiftLogo type="icon" />
            </Link>
            <p
              className={`text-sm ${secondaryTextClass} leading-relaxed max-w-xs`}
            >
              {t("loyalShiftSMBFooter.introText", "Empowering SMBs...")}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider mb-4 ${primaryTextClass}`}
            >
              {t("loyalShiftSMBFooter.navHeader", "Navigation")}
            </h3>
            <ul className="space-y-3">
              {footerLinksColumn1.map((link) => (
                <li key={link.tKey}>
                  <FooterLink to={link.path} tKey={link.tKey} isDark={isDark}>
                    {t(link.tKey)} {/* Fallback text */}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: More Navigation Links */}
          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider mb-4 ${primaryTextClass} invisible md:visible`}
            >
              {t("loyalShiftSMBFooter.navMoreHeader", "More")}
            </h3>
            <ul className="space-y-3 md:mt-[37px]">
              {footerLinksColumn2.map((link) => (
                <li key={link.tKey}>
                  <FooterLink to={link.path} tKey={link.tKey} isDark={isDark}>
                    {t(link.tKey)} {/* Fallback text */}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Social */}
          <div className="md:col-span-4 lg:col-span-1">
            <h3
              className={`text-sm font-semibold uppercase tracking-wider mb-4 ${primaryTextClass}`}
            >
              {t("loyalShiftSMBFooter.legalHeader", "Legal")}
            </h3>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link) => (
                <li key={link.tKey}>
                  <FooterLink to={link.path} tKey={link.tKey} isDark={isDark}>
                    {t(link.tKey)} {/* Fallback text */}
                  </FooterLink>
                </li>
              ))}
            </ul>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider mb-3 ${primaryTextClass}`}
            >
              {t("loyalShiftSMBFooter.followUsHeader", "Follow Us")}
            </h3>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.titleKey}
                  href={social.href}
                  icon={social.icon}
                  titleKey={social.titleKey}
                  defaultTitle={social.defaultTitle}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div
          className={`pt-8 border-t ${
            isDark ? "border-slate-700" : "border-slate-200"
          } text-center`}
        >
          <p className={`text-xs ${tertiaryTextClass}`}>{copyrightText}</p>
        </div>
      </div>
    </motion.footer>
  );
};

LoyalShiftSMBFooter.propTypes = {
  forceDark: PropTypes.bool,
};

export default LoyalShiftSMBFooter;
