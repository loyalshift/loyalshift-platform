import React from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiArrowUpRight,
} from "react-icons/fi";

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

  const socialLinks = [
    { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/loyalshift/" },
    { icon: <FiTwitter />, url: "https://twitter.com/loyalshift" },
    { icon: <FiGithub />, url: "https://github.com/loyalshift" },
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
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold">
                <span className="text-blue-400">Loyal</span>
                <span className="text-blue-300">Shift</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Modernizing legacy systems with AI-powered solutions that deliver
              measurable ROI.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
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
                    <a
                      href={`${link.url}`}
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      {link.name}
                      <FiArrowUpRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
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
                <FiMapPin className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Boston, MA</span>
              </li>
              {/* <li className="flex items-center">
                <FiPhone className="text-blue-400 mr-3 flex-shrink-0" />
                <a
                  href="tel:+18005551234"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +506 6356-2425
                </a>
              </li> */}
              <li className="flex items-center">
                <FiMail className="text-blue-400 mr-3 flex-shrink-0" />
                <a
                  href="mailto:info@loyalshift.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@loyalshift.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-800 mt-16 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} LoyalShift Technologies. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
