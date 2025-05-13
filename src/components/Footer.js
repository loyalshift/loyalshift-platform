// src/components/Footer.js
// UPDATED: Added Instagram, X (Twitter), and HuggingFace social links.

import React from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiLinkedin,
  FiTwitter, // Will be used for X
  FiGithub,
  FiArrowUpRight,
  FiInstagram, // Added for Instagram
  FiCpu, // Placeholder for HuggingFace (AI related)
  // FiLink,    // Alternative placeholder for HuggingFace
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "./Logo"; // Assuming Logo component is in the same directory

const Footer = () => {
  const footerLinks = [
    {
      title: "Solutions",
      links: [
        { name: "Integration", url: "/solutions" },
        { name: "Security & Compliance", url: "/security" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Case Studies", url: "/case-studies" },
        // { name: 'ROI Calculator', url: '/resources/calculator' },
        // { name: 'Whitepapers', url: '/resources/whitepapers' },
        // { name: 'API Documentation', url: '/docs' }
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", url: "/about" },
        { name: "Careers", url: "/careers" },
        { name: "Contact", url: "/contact" },
      ],
    },
  ];

  // Updated socialLinks array
  const socialLinks = [
    {
      icon: <FiLinkedin />,
      url: "https://linkedin.com/in/loyalshift",
      title: "LinkedIn",
    },
    {
      icon: <FiGithub />,
      url: "https://github.com/loyalshift",
      title: "GitHub",
    },
    {
      icon: <FiInstagram />,
      url: "https://instagram.com/loyalshift",
      title: "Instagram",
    },
    {
      icon: <FiTwitter />,
      url: "https://x.com/loyalshift",
      title: "X (Twitter)",
    },
    {
      icon: <FiCpu />,
      url: "https://huggingface.co/loyalshift",
      title: "HuggingFace",
    }, // Using FiCpu as placeholder
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Assuming Logo component is styled for dark background */}
            <Logo lightMode={true} size="text-2xl" className="mb-6" />
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Modernizing legacy systems with AI-powered solutions that deliver
              measurable ROI.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.title}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title} // Added title attribute for tooltips
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50" // Slightly adjusted hover bg
                  whileHover={{ y: -2, scale: 1.1 }} // Enhanced hover animation
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Ensure icon has appropriate size if not handled by Fi itself */}
                  {React.cloneElement(social.icon, { className: "w-5 h-5" })}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Use Link component for internal navigation */}
                    <Link
                      to={link.url}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group" // Added group for icon hover
                    >
                      {link.name}
                      <FiArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="text-blue-400 mt-1 mr-3 flex-shrink-0 w-4 h-4" />
                <span className="text-gray-400 text-sm">Boston, MA</span>
              </li>
              <li className="flex items-center">
                <FiMail className="text-blue-400 mr-3 flex-shrink-0 w-4 h-4" />
                <a
                  href="mailto:info@loyalshift.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  info@loyalshift.com
                </a>
              </li>
              {/* Example Phone (Uncomment and update if needed) */}
              {/*
              <li className="flex items-center">
                <FiPhone className="text-blue-400 mr-3 flex-shrink-0 w-4 h-4" />
                <a
                  href="tel:+15551234567"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  +1 555-123-4567
                </a>
              </li>
              */}
            </ul>
          </motion.div>
        </div>

        {/* Divider & Copyright */}
        <motion.div
          className="border-t border-gray-800 mt-16 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }} // Added delay
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} LoyalShift Technologies. All rights
              reserved.
            </p>
            <div className="flex space-x-4 md:space-x-6">
              <Link
                to="/privacy-policy" // Example internal link
                className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service" // Example internal link
                className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
              >
                Terms of Service
              </Link>
              {/* <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Cookies</a> */}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
