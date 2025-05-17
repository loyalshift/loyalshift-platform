// src/components/Equilibra/Footer.js
// Footer component for the Equilibra CR demo pages.
// UPDATED: Fully integrated with the new Equilibra CR color palette.
// Uses a calm, earthy, supportive light theme.
// Current time: Friday, May 16, 2025 at 3:55 PM CST.

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

// Equilibra CR Logo
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.svg";

// --- Equilibra CR New Color Palette ---
const themeColors = {
  background: "bg-[#FFF7F2]", // Neutral Light – Cream White (Footer Background)
  textPrimary: "text-[#5C5C5C]", // Typography – Warm Gray (For main text, headings)
  textSecondary: "text-[#A89C94]", // Complementary – Muted Taupe (For secondary text, copyright)
  textHighlight: "text-[#E86F51]", // Accent Color – Coral Red (For links on hover, icons)
  border: "border-[#A89C94]/30", // Muted Taupe with opacity for border-top
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const EquilibraFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Acerca de 'Equilibra Contigo'", path: "/demo/equilibra/details" },
    { name: "Nuestra Filosofía", path: "/equilibra/about-us" },
    { name: "Blog y Recursos", path: "/equilibra/blog" }, // Link to the new blog page
    { name: "Políticas de Privacidad (Demo)", path: "#privacy-placeholder" },
  ];

  // Placeholder social links for Equilibra CR - REPLACE WITH ACTUAL URLS
  const socialLinksEquilibra = [
    {
      icon: <FiInstagram />,
      url: "https://instagram.com/equilibra_cr",
      title: "Instagram Equilibra CR",
    },
    // { icon: <FiFacebook />, url: "#facebook-equilibra", title: "Facebook Equilibra CR" },
  ];

  return (
    <motion.footer
      className={`${themeColors.background} border-t ${themeColors.border}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Column 1: Logo and Tagline */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/equilibra" className="inline-block mb-4">
              <img
                src={equilibraLogoPath}
                alt="Equilibra CR Logo"
                className="h-10 w-auto"
              />
            </Link>
            <p
              className={`text-sm ${themeColors.textSecondary} leading-relaxed mb-4`}
            >
              Nutrición sin peso, enfocada en tu bienestar integral y una
              relación saludable con la comida.
            </p>
            {socialLinksEquilibra.length > 0 && (
              <div className="flex space-x-4">
                {socialLinksEquilibra.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.title}
                    className={`${themeColors.textSecondary} hover:${themeColors.textHighlight} transition-colors`}
                  >
                    {React.cloneElement(social.icon, { className: "w-5 h-5" })}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              className={`text-sm font-semibold ${themeColors.textPrimary} uppercase tracking-wider mb-4`}
            >
              Explora
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm ${themeColors.textSecondary} hover:${themeColors.textHighlight} transition-colors`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3
              className={`text-sm font-semibold ${themeColors.textPrimary} uppercase tracking-wider mb-4`}
            >
              Contacto Directo
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <FiMapPin
                  className={`w-4 h-4 ${themeColors.textHighlight} mr-2.5 mt-1 flex-shrink-0`}
                />
                <span className={themeColors.textSecondary}>
                  Costa Rica (Consultas Online y Presenciales)
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone
                  className={`w-4 h-4 ${themeColors.textHighlight} mr-2.5 flex-shrink-0`}
                />
                <a
                  href="https://wa.me/message/CUOHZMZMTD5OK1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${themeColors.textSecondary} hover:${themeColors.textHighlight} transition-colors`}
                >
                  WhatsApp Directo
                </a>
              </li>
              <li className="flex items-center">
                <FiMail
                  className={`w-4 h-4 ${themeColors.textHighlight} mr-2.5 flex-shrink-0`}
                />
                <a
                  href="mailto:nutricion@equilibracr.com"
                  className={`${themeColors.textSecondary} hover:${themeColors.textHighlight} transition-colors`}
                >
                  nutricion@equilibracr.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: LoyalShift Credit (Subtle) */}
          <div className="md:col-span-2 lg:col-span-1 lg:text-right">
            <h3
              className={`text-sm font-semibold ${themeColors.textPrimary} uppercase tracking-wider mb-4`}
            >
              Plataforma Demo
            </h3>
            <p className={`text-xs ${themeColors.textSecondary}`}>
              Esta experiencia "Equilibra Contigo" es una demostración
              conceptual.
            </p>
            <p className={`text-xs ${themeColors.textSecondary} mt-2`}>
              Plataforma Potenciada por{" "}
              <a
                href="https://loyalshift.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold ${themeColors.textHighlight} hover:underline`}
              >
                LoyalShift
              </a>
            </p>
          </div>
        </div>

        <div
          className={`mt-10 pt-8 border-t ${themeColors.border} text-xs text-center ${themeColors.textSecondary}`}
        >
          <p>
            &copy; {currentYear} Equilibra CR. Todos los derechos reservados.
          </p>
          <p className="mt-1">CPN 3547-24</p>
        </div>
      </div>
    </motion.footer>
  );
};

EquilibraFooter.propTypes = {
  // No props currently defined
};

export default EquilibraFooter;
