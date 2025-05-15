// src/components/Afc/Footer.js
// Footer component for the Athletic Functional Center (AFC) section.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 3:40 PM CST.

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiInstagram,
  FiFacebook,
  FiYoutube, // Example social icons
} from "react-icons/fi";

// AFC Logo (assuming it's in public/images/)
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.svg";

// --- AFC Color Palette (Light Theme with Red Accents) ---
const colors = {
  background: "bg-slate-100", // Light Gray page background for footer
  surface: "bg-white", // White for any distinct sections within footer (not used here)
  textPrimary: "text-slate-700", // Darker gray for main footer text
  textSecondary: "text-slate-500", // Medium Gray for secondary footer text (copyright)
  textMuted: "text-slate-400", // For "Powered by"
  accentRed: "text-red-600", // Vibrant Red for AFC accents (links, icons)
  accentRedDark: "text-red-700", // Hover for red accents
  border: "border-slate-300", // Standard light border for top of footer
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const AFCFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerNavLinks = [
    { name: "Nosotros", path: "/afc/about-us" },
    { name: "Programas", path: "/afc/programs" },
    { name: "Inscripciones", path: "/afc/enroll" },
    { name: "Comunidad", path: "/afc/community" },
    { name: "Testimonios", path: "/afc/testimonials" },
    { name: "Franquicias", path: "/afc/franchise" },
    { name: "Contacto AFC", path: "/afc/contact" },
  ];

  // Placeholder social links for AFC - REPLACE WITH ACTUAL URLS
  const socialLinksAfc = [
    {
      icon: <FiInstagram />,
      url: "https://instagram.com/athleticfunctionalcentercr",
      title: "Instagram AFC",
    },
    {
      icon: <FiFacebook />,
      url: "https://facebook.com/AthleticFunctionalCenter",
      title: "Facebook AFC",
    },
    // { icon: <FiYoutube />, url: "#", title: "YouTube AFC" }, // Example
  ];

  return (
    <motion.footer
      className={`${colors.background} border-t ${colors.border}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Column 1: Logo and Tagline */}
          <motion.div
            variants={fadeInUp}
            className="md:col-span-2 lg:col-span-1"
          >
            <Link to="/afc" className="inline-block mb-4">
              <img
                src={afcLogoPath}
                alt="Athletic Functional Center Logo"
                className="h-12 w-auto"
              />
            </Link>
            <p className={`text-sm ${colors.textSecondary} leading-relaxed`}>
              Tu centro de fitness funcional en El Tejar, Cartago. Potenciamos
              tu bienestar integral a través del movimiento consciente y una
              comunidad que inspira.
            </p>
            {/* Social Links for AFC */}
            <div className="flex space-x-4 mt-6">
              {socialLinksAfc.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  className={`${colors.textSecondary} hover:${colors.accentRed} transition-colors`}
                >
                  {React.cloneElement(social.icon, { className: "w-5 h-5" })}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3
              className={`text-md font-semibold ${colors.textPrimary} uppercase tracking-wider mb-5`}
            >
              Explora AFC
            </h3>
            <ul className="space-y-3">
              {footerNavLinks.slice(0, 4).map(
                (
                  link // Show first 4 links
                ) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`text-sm ${colors.textSecondary} hover:${colors.accentRed} transition-colors`}
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Column 3: More Links / Support */}
          <motion.div variants={fadeInUp}>
            <h3
              className={`text-md font-semibold ${colors.textPrimary} uppercase tracking-wider mb-5 invisible md:visible`}
            >
              {" "}
              {/* Hidden title for spacing or use actual title */}
              Más
            </h3>
            <ul className="space-y-3 md:mt-[46px]">
              {" "}
              {/* Align with previous column */}
              {footerNavLinks.slice(4).map(
                (
                  link // Show remaining links
                ) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`text-sm ${colors.textSecondary} hover:${colors.accentRed} transition-colors`}
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div variants={fadeInUp}>
            <h3
              className={`text-md font-semibold ${colors.textPrimary} uppercase tracking-wider mb-5`}
            >
              Contáctanos
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <FiMapPin
                  className={`w-4 h-4 ${colors.accentRed} mr-2.5 mt-1 flex-shrink-0`}
                />
                <span className={colors.textSecondary}>
                  Centro Comercial La Hacienda, El Tejar, Cartago, Costa Rica
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone
                  className={`w-4 h-4 ${colors.accentRed} mr-2.5 flex-shrink-0`}
                />
                <a
                  href="tel:+50684005481"
                  className={`${colors.textSecondary} hover:${colors.accentRed} transition-colors`}
                >
                  8400-5481
                </a>
              </li>
              <li className="flex items-center">
                <FiMail
                  className={`w-4 h-4 ${colors.accentRed} mr-2.5 flex-shrink-0`}
                />
                <a
                  href="mailto:info@afccr.com"
                  className={`${colors.textSecondary} hover:${colors.accentRed} transition-colors`}
                >
                  info@afccr.com (Ejemplo)
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar: Copyright and Powered by LoyalShift */}
        <motion.div
          variants={fadeInUp}
          className={`mt-12 pt-8 border-t ${colors.border} text-xs`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className={`${colors.textMuted} mb-2 sm:mb-0`}>
              &copy; {currentYear} Athletic Functional Center. Todos los
              derechos reservados.
            </p>
            <p className={`${colors.textMuted}`}>
              Plataforma Potenciada por{" "}
              <a
                href="https://loyalshift.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold ${colors.accentRedDark} hover:underline`}
              >
                LoyalShift
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

AFCFooter.propTypes = {
  // No props currently defined for this specific footer
};

export default AFCFooter;
