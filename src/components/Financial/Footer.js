import React from "react";

import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

// --- Green/White/Grey Color Theme ---
const colors = {
  background: "bg-slate-50", // Very light grey background
  surface: "bg-white", // White for cards/sections
  primary: "text-emerald-700", // Trustworthy Green for text/icons
  primaryBg: "bg-emerald-600", // Brighter Green for buttons
  primaryBgHover: "hover:bg-emerald-700", // Darker Green hover
  secondary: "text-slate-500", // Medium grey for secondary text
  secondaryBg: "bg-slate-200", // Light grey for secondary buttons
  secondaryBgHover: "hover:bg-slate-300",
  textDark: "text-slate-800", // Dark grey for main text
  textLight: "text-white", // White text (on green buttons, dark footer)
  border: "border-slate-200", // Light border
  footerBg: "bg-slate-800", // Dark grey footer background
  footerText: "text-slate-300", // Light text for footer
  footerTextHover: "hover:text-white",
};

// --- Inline Footer Component for Financial ---
const FinancialFooter = () => (
  /* ... Footer code remains the same ... */
  <footer className={`${colors.footerBg} ${colors.footerText}`}>
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            ANACO Inversiones
          </h3>
          <p className="text-sm mb-4">
            Su socio financiero de confianza en Cartago, Costa Rica, por más de
            40 años.
          </p>
          <p className="text-sm flex items-center">
            <FiMapPin className="w-4 h-4 mr-2 flex-shrink-0" /> Cartago Centro,
            Costa Rica
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Enlaces
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/anaco/services/mortgage"
                className={`text-sm ${colors.footerText} ${colors.footerTextHover}`}
              >
                Créditos Hipotecarios
              </Link>
            </li>
            <li>
              <Link
                to="/anaco/contact"
                className={`text-sm ${colors.footerText} ${colors.footerTextHover}`}
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                to="/anaco/privacy"
                className={`text-sm ${colors.footerText} ${colors.footerTextHover}`}
              >
                Privacidad
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Contacto Directo
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FiPhone className="w-4 h-4 mr-2 flex-shrink-0" />
              <a
                href="tel:+50625516909"
                className={`text-sm ${colors.footerText} ${colors.footerTextHover}`}
              >
                +506 2551-6909
              </a>
              {/* Placeholder */}
            </li>
            <li className="flex items-center">
              <FiMail className="w-4 h-4 mr-2 flex-shrink-0" />
              <a
                href="mailto:info@financialcr.net"
                className={`text-sm ${colors.footerText} ${colors.footerTextHover}`}
              >
                info@financialcr.net
              </a>
              {/* Placeholder */}
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`mt-10 pt-8 border-t ${colors.border} border-opacity-20 text-center text-xs`}
      >
        <p>
          &copy; {new Date().getFullYear()} ANACO Inversiones S.A. Todos los
          derechos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default FinancialFooter;
