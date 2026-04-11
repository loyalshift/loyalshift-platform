'use client';

import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiLinkedin, FiTwitter, FiGithub, FiArrowUpRight, FiInstagram, FiCpu } from "react-icons/fi";
import Link from "next/link";
import Logo from "./Logo";
import { useTranslation } from "../../i18n/useTranslation";

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    { title: t.footer.columns.solutions.title, links: t.footer.columns.solutions.links.map((name, i) => ({ name, url: "/solutions" })) },
    { title: t.footer.columns.resources.title, links: t.footer.columns.resources.links.map((name) => ({ name, url: "/case-studies" })) },
    { title: t.footer.columns.company.title, links: [
      { name: t.footer.columns.company.links[0], url: "/about" },
      { name: t.footer.columns.company.links[1], url: "/contact" },
    ]},
  ];

  const socialLinks = [
    { icon: <FiLinkedin />, url: "https://linkedin.com/in/loyalshift", title: "LinkedIn" },
    { icon: <FiGithub />, url: "https://github.com/loyalshift", title: "GitHub" },
    { icon: <FiInstagram />, url: "https://instagram.com/loyalshift", title: "Instagram" },
    { icon: <FiTwitter />, url: "https://x.com/loyalshift", title: "X (Twitter)" },
    { icon: <FiCpu />, url: "https://huggingface.co/loyalshift", title: "HuggingFace" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, margin: "-50px" }}>
            <Logo className="mb-6" />
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">{t.footer.tagline}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a key={social.title} href={social.url} target="_blank" rel="noopener noreferrer" title={social.title} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50" whileHover={{ y: -2, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  {React.cloneElement(social.icon, { className: "w-5 h-5" })}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((column, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true, margin: "-50px" }}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li key={linkIndex} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link href={link.url} className="text-gray-400 hover:text-white transition-colors flex items-center group">
                      {link.name}
                      <FiArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true, margin: "-50px" }}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">{t.footer.contactTitle}</h3>
            <ul className="space-y-4">
              
              <li className="flex items-start">
                <FiMapPin className="text-blue-400 mt-1 mr-3 flex-shrink-0 w-4 h-4" />
                <span className="text-gray-400 text-sm">Cartago, CR</span>
              </li>
              <li className="flex items-center">
                <FiMail className="text-blue-400 mr-3 flex-shrink-0 w-4 h-4" />
                <a href="mailto:info@loyalshift.com" className="text-gray-400 hover:text-white transition-colors text-sm">info@loyalshift.com</a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div className="border-t border-gray-800 mt-16 pt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true, margin: "-50px" }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-0">
              {t.footer.copyright.replace('{year}', new Date().getFullYear())}
            </p>
            <div className="flex space-x-4 md:space-x-6">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">{t.footer.privacyPolicy}</Link>
              <Link href="/terms-of-service" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">{t.footer.termsOfService}</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
