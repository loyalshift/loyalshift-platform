// src/components/Girya/Footer.js
// Footer component for the Girya demo pages.
// Uses a dark, earthy theme consistent with GiryaHeader.

import React from "react";
import { motion } from "framer-motion";
import {
  FiMapPin, // Location
  FiMail, // Email
  FiPhone, // Phone
  FiInstagram,
  FiFacebook,
  // Add other icons if Girya has specific social media
} from "react-icons/fi";
import { Link } from "react-router-dom";
import GiryaLogo from "../../images/girya-logo.svg"; // Import Girya logo URL

// --- Earthy Color Palette (Dark Theme for Girya section) ---
const themeColors = {
  background: "bg-stone-900", // Darker stone for footer base
  textPrimary: "text-stone-300", // Lighter text for readability
  textSecondary: "text-stone-500", // Muted for copyright, less important links
  border: "border-stone-700", // Border for top of footer
  iconAccent: "text-emerald-500", // Emerald accent for icons
  linkHover: "hover:text-emerald-400", // Emerald hover for links
  socialIcon: "text-stone-400",
  socialIconHover: "hover:text-emerald-400",
};

const Footer = () => {
  const footerLinks = [
    {
      title: "Explorar Girya",
      links: [
        { name: "Nuestros Programas", url: "/girya/programs" },
        { name: "Conoce a los Coaches", url: "/girya/coaches" },
        {
          name: "Filosofía Mindful Strength",
          url: "/girya/about-us#philosophy",
        }, // Example anchor link
        { name: "Inscripciones", url: "/girya/enroll" },
      ],
    },
    {
      title: "Comunidad",
      links: [
        // { name: "Eventos y Talleres", url: "/girya/events" }, // Placeholder
        { name: "Testimonios", url: "/girya/testimonials" }, // Placeholder
        { name: "Blog (Próximamente)", url: "#" },
      ],
    },
    {
      title: "Soporte",
      links: [
        { name: "Contacto", url: "/girya/contact" },
        { name: "Preguntas Frecuentes", url: "/girya/faq" }, // Placeholder
        { name: "Política de Privacidad (Girya)", url: "/girya/privacy" }, // Placeholder
      ],
    },
  ];

  // Placeholder social links for Girya (Update with actual Girya social URLs)
  const socialLinks = [
    {
      icon: <FiInstagram />,
      url: "https://instagram.com/girya_cr",
      title: "Instagram Girya",
    },
    {
      icon: <FiFacebook />,
      url: "https://facebook.com/giryacr",
      title: "Facebook Girya",
    },
    // Add other relevant social links for Girya
  ];

  return (
    <footer
      className={`${themeColors.background} ${themeColors.textSecondary} border-t ${themeColors.border}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Column 1: Girya Logo and Ethos */}
          <motion.div
            className="md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <Link
              to="/girya"
              className="inline-block mb-4"
              aria-label="Girya Home"
            >
              <img
                src={GiryaLogo}
                alt="Girya Logo"
                className="h-10 w-auto filter brightness-0 invert opacity-80"
              />
            </Link>
            <p
              className={`mb-5 text-sm leading-relaxed ${themeColors.textSecondary}`}
            >
              Forjando fuerza consciente y comunidad a través de la metodología
              Mindful Strength.
            </p>
            {/* Social Links for Girya */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.title}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  className={`${themeColors.socialIcon} ${themeColors.socialIconHover} transition-colors p-1.5 rounded-md hover:bg-stone-700/50`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {React.cloneElement(social.icon, { className: "w-5 h-5" })}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Link Columns */}
          {footerLinks.map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 + 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h3
                className={`text-sm font-semibold ${themeColors.textPrimary} uppercase tracking-wider mb-4`}
              >
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  >
                    <Link
                      to={link.url}
                      className={`${themeColors.textSecondary} ${themeColors.linkHover} text-sm transition-colors`}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info Column (Optional, can be brief) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3
              className={`text-sm font-semibold ${themeColors.textPrimary} uppercase tracking-wider mb-4`}
            >
              Contáctanos
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-start">
                <FiMapPin
                  className={`${themeColors.iconAccent} mt-0.5 mr-2.5 flex-shrink-0 w-4 h-4`}
                />
                <span className={`${themeColors.textSecondary} text-sm`}>
                  Cartago, Costa Rica (Visitas con cita)
                </span>
              </li>
              <li className="flex items-center">
                <FiMail
                  className={`${themeColors.iconAccent} mr-2.5 flex-shrink-0 w-4 h-4`}
                />
                <a
                  href="mailto:info@giryacr.com" // Placeholder email
                  className={`${themeColors.textSecondary} ${themeColors.linkHover} text-sm transition-colors`}
                >
                  info@giryacr.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider & Copyright */}
        <motion.div
          className={`border-t ${themeColors.border} mt-10 md:mt-12 pt-6`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className={`${themeColors.textMuted} text-xs md:text-sm mb-3 md:mb-0`}
            >
              © {new Date().getFullYear()} Girya Costa Rica & Mindful Strength
              Method. Todos los derechos reservados.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              {/* Link back to main LoyalShift site if desired */}
              <Link
                to="/"
                className={`${themeColors.textMuted} hover:text-stone-300 text-xs transition-colors`}
              >
                Powered by LoyalShift
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  // No props currently defined for GiryaFooter
};

export default Footer;
