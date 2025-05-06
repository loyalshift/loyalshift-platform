// src/pages/Anaco/MortgageServices.js
// Explains ANACO's Fixed-Rate Mortgage options for personal and business needs.
// Uses Green/White/Grey Theme, Spanish Language. Adapts concepts from INVU example.
// Current time: Friday, May 2, 2025 at 6:34 PM CST. San José, Costa Rica.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiHome, // Mortgages, Housing
  FiBriefcase, // Business
  FiDollarSign, // Financing, Rates
  FiLock, // Stability, Fixed Rate
  FiTrendingUp, // Growth, Improvement
  FiTool, // Repairs, Construction
  FiCheckCircle, // Benefits
  FiInfo, // Timestamp, Disclaimer
  FiArrowRight, // CTA
  FiPhone, // CTA
  FiSliders, // CTA (Calculator)
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../../components/Button";
import Section from "../../../components/Section.js"; // Assuming Section component exists

// Theme Colors (ANACO Green/White/Grey)
const colors = {
  background: "bg-slate-100",
  surface: "bg-white",
  primary: "text-emerald-700",
  primaryBg: "bg-emerald-600",
  primaryBgHover: "hover:bg-emerald-700",
  secondary: "text-slate-600",
  textDark: "text-slate-800",
  textLight: "text-white",
  border: "border-slate-300",
  borderLight: "border-slate-200",
  accentSuccess: "text-emerald-500",
  primaryLightBg: "bg-emerald-50",
};

// Animation Variants
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
// No stagger needed if Section handles it, otherwise define staggerContainer
// const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };

// --- Reusable Benefit Item ---
const BenefitItem = ({ children }) => (
  <motion.li variants={fadeInUp} className="flex items-start space-x-3">
    <FiCheckCircle
      className={`w-5 h-5 ${colors.accentSuccess} mt-1 flex-shrink-0`}
    />
    <span className={`${colors.secondary}`}>{children}</span>
  </motion.li>
);
BenefitItem.propTypes = { children: PropTypes.node.isRequired };

// --- Main Mortgage Services Page Component ---
export default function MortgageServicesPage() {
  function formatCurrency(value, currency = "CRC") {
    return new Intl.NumberFormat("es-CR", {
      // Use locale 'es-CR' for Costa Rica
      style: "currency",
      currency: currency, // Default to CRC
      minimumFractionDigits: 0, // Show no decimals for Colones typically
      // maximumFractionDigits: 0 // Optionally force no decimals
    }).format(value);
  }
  const currentTime = new Date().toLocaleString("es-CR", {});

  // Example Limits (Inspired by INVU text, adjust for ANACO's actuals)
  const exampleLimits = {
    compraCasa: 146000000,
    construccion: 88000000,
    compraLote: 67000000,
    mejoras: 45000000,
  };

  return (
    <div className={`${colors.background} ${colors.textDark} font-sans`}>
      {/* Assumes AnacoLayout provides Header/Footer */}
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className={`border-b ${colors.borderLight} pt-20 md:pt-28 pb-16 md:pb-20`}
          ariaLabelledby="mortgage-hero-title"
        >
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeInUp} // Animate whole block
          >
            <motion.div
              className={`inline-block p-4 mb-5 rounded-full ${colors.primaryLightBg} border ${colors.border}`}
            >
              <FiLock className={`w-12 h-12 ${colors.primary}`} />
            </motion.div>
            <h1
              id="mortgage-hero-title"
              className={`text-4xl md:text-5xl font-bold ${colors.textDark} mb-5`}
            >
              Asegure su Futuro con Nuestras{" "}
              <span className={colors.primary}>Hipotecas de Tasa Fija</span>
            </h1>
            <p
              className={`text-lg md:text-xl ${colors.secondary} max-w-3xl mx-auto`}
            >
              Financiamiento estable y predecible para su hogar o negocio.
              Disfrute de la tranquilidad de pagos constantes durante todo el
              plazo del crédito con ANACO Inversiones.
            </p>
          </motion.div>
        </Section>

        {/* Personal Mortgages Section */}
        <Section ariaLabelledby="personal-mortgage-title">
          <motion.h2
            variants={fadeInUp}
            id="personal-mortgage-title"
            className={`text-3xl font-bold ${colors.textDark} text-center mb-12 md:mb-16`}
          >
            Hipotecas Personales para su Hogar
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Description & Benefits */}
            <motion.div variants={fadeInUp}>
              <p className={`${colors.secondary} text-lg leading-relaxed mb-6`}>
                Ya sea que esté comprando su primera casa, un lote para
                construir, remodelando su espacio actual o buscando consolidar
                deudas, nuestras hipotecas personales de tasa fija le ofrecen la
                estabilidad que necesita para planificar a largo plazo.
              </p>
              <h3 className={`text-xl font-semibold ${colors.textDark} mb-4`}>
                Beneficios Clave:
              </h3>
              <ul className="space-y-3 mb-6">
                <BenefitItem>
                  <strong>Pagos Estables:</strong> Su cuota mensual (capital e
                  interés) no cambiará, facilitando su presupuesto.
                </BenefitItem>
                <BenefitItem>
                  <strong>Plazos Flexibles:</strong> Ofrecemos diversos plazos
                  (ej. 15, 20, 25, 30 años) para ajustarnos a su capacidad.
                </BenefitItem>
                <BenefitItem>
                  <strong>Múltiples Propósitos:</strong> Financiamos compra,
                  construcción, lote, remodelaciones y consolidación.
                </BenefitItem>
                <BenefitItem>
                  <strong>Asesoría Experta:</strong> Le guiamos en cada paso del
                  proceso.
                </BenefitItem>
              </ul>
              <Button
                to="/anaco/pre-approval-process" // Path remains the same
                size="lg" // Size remains the same
                icon={<FiArrowRight />} // Added an icon
                className={`mt-4 bg-transparent border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600/10  hover:text-emerald-800 focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-whitetransition-colors duration-150 ease-in-out`}
              >
                Ver Proceso de Pre-Aprobación
              </Button>
            </motion.div>
            {/* Right Column: Image & Example Limits */}
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.primaryLightBg} border ${colors.border}`}
            >
              {/* --- Image Placeholder 1: Happy family / New home --- */}
              <div className="aspect-[4/3] mt-auto rounded overflow-hidden shadow-inner">
                <img
                  src="/images/property-mock-9.jpeg"
                  alt="roof view of residential homes"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h4
                className={`text-lg font-semibold ${colors.textDark} mb-3 text-center`}
              >
                Montos Máximos de Referencia*:
              </h4>
              <ul className="text-sm space-y-1 text-center">
                <li>
                  Compra de Casa:{" "}
                  <strong className={colors.primary}>
                    {formatCurrency(exampleLimits.compraCasa)}
                  </strong>
                </li>
                <li>
                  Construcción Lote Propio:{" "}
                  <strong className={colors.primary}>
                    {formatCurrency(exampleLimits.construccion)}
                  </strong>
                </li>
                <li>
                  Compra de Lote:{" "}
                  <strong className={colors.primary}>
                    {formatCurrency(exampleLimits.compraLote)}
                  </strong>
                </li>
                <li>
                  Ampliaciones/Mejoras:{" "}
                  <strong className={colors.primary}>
                    {formatCurrency(exampleLimits.mejoras)}
                  </strong>
                </li>
              </ul>
              <p className="text-xs text-slate-500 mt-4 text-center">
                *Montos ilustrativos, sujetos a análisis y aprobación final.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Business Mortgages Section */}
        <Section
          bg={colors.surface}
          className={`border-y ${colors.borderLight}`}
          ariaLabelledby="business-mortgage-title"
        >
          <motion.h2
            variants={fadeInUp}
            id="business-mortgage-title"
            className={`text-3xl font-bold ${colors.textDark} text-center mb-12 md:mb-16`}
          >
            Financiamiento Empresarial de Tasa Fija
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Image & Example Uses */}
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.primaryLightBg} border ${colors.border}`}
            >
              <div className="aspect-[4/3] mt-auto rounded overflow-hidden shadow-inner">
                <img
                  src="/images/property-mock-7.jpeg"
                  alt="roof view of residential homes"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h4
                className={`text-lg font-semibold ${colors.textDark} mb-3 text-center`}
              >
                Ideal Para:
              </h4>
              <ul className="text-sm space-y-1 text-center">
                <li>Compra de Oficinas o Locales Comerciales</li>
                <li>Adquisición de Bodegas o Planteles</li>
                <li>Construcción o Remodelación Empresarial</li>
                <li>Proyectos de Desarrollo Inmobiliario</li>
              </ul>
            </motion.div>
            {/* Right Column: Description & Benefits */}
            <motion.div variants={fadeInUp}>
              <p className={`${colors.secondary} text-lg leading-relaxed mb-6`}>
                Invierta en el crecimiento de su negocio con la seguridad de una
                tasa de interés fija. Nuestras soluciones de financiamiento
                empresarial le ayudan a adquirir o mejorar propiedades
                comerciales e industriales con pagos predecibles.
              </p>
              <h3 className={`text-xl font-semibold ${colors.textDark} mb-4`}>
                Ventajas para su Negocio:
              </h3>
              <ul className="space-y-3 mb-6">
                <BenefitItem>
                  <strong>Costos Predecibles:</strong> Facilita la planificación
                  financiera y el flujo de caja.
                </BenefitItem>
                <BenefitItem>
                  <strong>Seguridad en la Inversión:</strong> Protege su
                  inversión inmobiliaria contra fluctuaciones de tasas.
                </BenefitItem>
                <BenefitItem>
                  <strong>Plazos Adecuados:</strong> Adaptamos el plazo a las
                  necesidades y capacidad de su empresa.
                </BenefitItem>
                <BenefitItem>
                  <strong>Enfoque en Crecimiento:</strong> Libere recursos
                  mentales y financieros al saber que su cuota es estable.
                </BenefitItem>
              </ul>
              <Button
                to="/anaco/contact" // Path remains the same
                size="lg" // Size remains the same
                icon={<FiArrowRight />} // Added an icon
                className={`mt-4 bg-transparent border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600/10  hover:text-emerald-800 focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-whitetransition-colors duration-150 ease-in-out`}
              >
                Consultar con Asesor Empresarial
              </Button>
            </motion.div>
          </div>
        </Section>

        {/* Call to Action Section */}
        <Section ariaLabelledby="cta-title">
          <motion.div
            variants={fadeInUp}
            className={`text-center max-w-3xl mx-auto p-10 rounded-lg ${colors.primaryLightBg} border ${colors.border} shadow-lg`}
          >
            <FiDollarSign
              className={`w-12 h-12 ${colors.primary} mx-auto mb-4`}
            />
            <h2
              id="cta-title"
              className={`text-3xl font-bold ${colors.textDark} mb-4`}
            >
              Inicie su Solicitud o Calcule su Cuota
            </h2>
            <p className={`text-lg ${colors.secondary} mb-8`}>
              Utilice nuestra calculadora para una estimación rápida o contacte
              a nuestro equipo para iniciar su proceso de pre-aprobación hoy
              mismo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                to="/anaco/request-pre-approval"
                variant="primary"
                size="lg"
                icon={<FiArrowRight />}
                className={`${colors.primaryBg} ${colors.primaryBgHover} ${colors.textLight}`}
              >
                Solicitar Pre-Aprobación
              </Button>
              <Button
                to="/anaco/calculator"
                variant="secondary"
                size="lg"
                icon={<FiSliders />}
                className={`bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300`}
              >
                Usar Calculadora
              </Button>
            </div>
          </motion.div>
        </Section>

        {/* Disclaimer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={`mt-12 md:mt-16 mb-12 md:mb-16 p-4 rounded-md border ${colors.warningBorder} ${colors.warningBg} text-sm ${colors.textDark} max-w-3xl mx-auto`}
        >
          <div className="flex items-start gap-3">
            <FiInfo
              className={`w-5 h-5 ${colors.warningIcon} flex-shrink-0 mt-0.5`}
              aria-hidden="true"
            />
            <div>
              <strong className="font-semibold">Importante:</strong> Todas las
              solicitudes de crédito están sujetas a análisis, verificación de
              información y aprobación final según las políticas de ANACO
              Inversiones S.A. y la normativa vigente. Las tasas y montos pueden
              variar. Consulte con un asesor para obtener detalles específicos.
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// --- PropTypes ---
BenefitItem.propTypes = { children: PropTypes.node.isRequired };
Section.propTypes = {
  /* ... */
};
// Button PropTypes should be defined in Button.js
