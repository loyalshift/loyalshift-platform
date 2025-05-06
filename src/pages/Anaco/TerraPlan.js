// src/pages/Anaco/TerraPlan.js
// REFINED: Improved image layout for better integration with text.
// Uses Green/White/Grey Theme, Spanish Language.
// Current time: Friday, May 2, 2025 at 9:21 PM CST. San José, Costa Rica.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiMap,
  FiLayers,
  FiBarChart2,
  FiTool,
  FiCheckCircle,
  FiDollarSign,
  FiEye,
  FiFastForward,
  FiShield,
  FiInfo,
  FiArrowRight,
  FiPhone,
  FiHome,
  FiBriefcase,
  FiPackage,
  FiDroplet,
  FiActivity,
  FiWind,
  FiTrendingUp,
} from "react-icons/fi";

// Reusable Components
import Button from "../../components/Button";
import Section from "../../components/Section"; // Assuming Section component exists and is imported
import ImagePlaceholder from "../../components/ImagePlaceHolder";
import InheritedStyleLink from "../../components/InheritedStyleLink";

// Theme Colors
const colors = {
  /* ... colors object ... */ background: "bg-slate-100",
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
  warningBg: "bg-yellow-50",
  warningBorder: "border-yellow-300",
  warningIcon: "text-yellow-500",
};

// Animation Variants
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Reusable Benefit Item Component ---
const BenefitItem = ({ icon: Icon = FiCheckCircle, children }) => (
  <li className="flex items-start space-x-3">
    <Icon
      className={`w-6 h-6 ${colors.accentSuccess} mt-0.5 flex-shrink-0`}
      aria-hidden="true"
    />
    <span className={`${colors.secondary} text-base md:text-lg`}>
      {children}
    </span>
  </li>
);
BenefitItem.propTypes = {
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
};

// --- Main TerraPlan Page Component ---
export default function TerraPlanPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    /* ... */
  });
  const developmentTypes = [
    /* ... development types data ... */
  ];
  function formatCurrency(value, currency = "CRC") {
    /* ... currency formatting ... */
  }

  return (
    <div className={`${colors.background} ${colors.textDark} font-sans`}>
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className={`border-b ${colors.borderLight} pt-16 md:pt-24 pb-12 md:pb-16`}
          ariaLabelledby="terraplan-hero-title"
        >
          {/* ... Hero content ... */}
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-4 rounded-full ${colors.primaryLightBg} border ${colors.border}`}
            >
              {" "}
              <FiMap className={`w-10 h-10 ${colors.primary}`} />{" "}
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="terraplan-hero-title"
              className={`text-4xl md:text-5xl font-bold ${colors.textDark} mb-4`}
            >
              {" "}
              Potencie su Financiamiento con{" "}
              <span className={colors.primary}>
                <InheritedStyleLink to="/anaco/terraplan">
                  TerraPlan™
                </InheritedStyleLink>
              </span>{" "}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.secondary} max-w-3xl mx-auto`}
            >
              {" "}
              Analice terrenos, descubra potencial y planifique desarrollos con
              precisión, integrando inteligencia geoespacial a sus proyectos
              financiados por ANACO.{" "}
            </motion.p>
          </motion.div>
        </Section>

        {/* --- Combined What & Why Section - REVISED LAYOUT --- */}
        <Section ariaLabelledby="what-why-terraplan-title">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left Column: What is TerraPlan? + Image */}
            <motion.div variants={fadeInUp} className="space-y-6">
              {" "}
              {/* Added space-y */}
              <h2
                id="what-why-terraplan-title"
                className={`text-3xl font-bold ${colors.textDark} mb-4`}
              >
                ¿Qué es{" "}
                <InheritedStyleLink to="/anaco/terraplan">
                  TerraPlan™
                </InheritedStyleLink>
                ?
              </h2>
              <p className={`${colors.secondary} text-lg leading-relaxed`}>
                Es una herramienta de análisis avanzada que evalúa las
                características físicas y contextuales de un terreno utilizando
                datos geoespaciales (OpenStreetMap, topografía, etc.) para:
              </p>
              <ul className="space-y-3 !mt-4">
                {" "}
                {/* Adjusted spacing */}
                <li className="flex items-center">
                  <FiLayers className={`w-5 h-5 mr-3 ${colors.primary}`} />
                  <span className={colors.textDark}>
                    Realizar análisis detallados del sitio.
                  </span>
                </li>
                <li className="flex items-center">
                  <FiBarChart2 className={`w-5 h-5 mr-3 ${colors.primary}`} />
                  <span className={colors.textDark}>
                    Sugerir usos de suelo óptimos.
                  </span>
                </li>
                <li className="flex items-center">
                  <FiMap className={`w-5 h-5 mr-3 ${colors.primary}`} />
                  <span className={colors.textDark}>
                    Facilitar la planificación visual interactiva.
                  </span>
                </li>
              </ul>
              {/* --- Image Placeholder 2 (Terrain Analysis) --- */}
              {/* Moved here, removed max-w-lg/mx-auto to fill column width better */}
              <ImagePlaceholder
                icon={FiLayers} // Use a relevant icon
                aspectRatio="aspect-video" // Or aspect-[4/3] etc.
                text="[Mockup: Mapa Análisis de Terreno]" // Placeholder text
                className="mt-6" // Keep margin if needed
              />
            </motion.div>

            {/* Right Column: Why Add TerraPlan? + Image */}
            <motion.div variants={fadeInUp} className="space-y-6">
              {" "}
              {/* Added space-y */}
              <h2 className={`text-3xl font-bold ${colors.textDark} mb-5`}>
                Beneficios con su Crédito ANACO
              </h2>
              <p className={`${colors.secondary} text-lg leading-relaxed`}>
                Integrar{" "}
                <InheritedStyleLink to="/anaco/terraplan">
                  TerraPlan™
                </InheritedStyleLink>{" "}
                le ofrece ventajas estratégicas al buscar financiamiento con
                nosotros:
              </p>
              <ul className="space-y-5">
                {" "}
                {/* Increased spacing */}
                <BenefitItem icon={FiShield}>
                  {" "}
                  <strong className={colors.textDark}>
                    Reduzca Riesgos:
                  </strong>{" "}
                  Identifique desafíos del sitio antes de finalizar su
                  financiamiento.{" "}
                </BenefitItem>
                <BenefitItem icon={FiDollarSign}>
                  {" "}
                  <strong className={colors.textDark}>
                    Optimice Inversión:
                  </strong>{" "}
                  Alinee el plan de desarrollo con el potencial real y las
                  condiciones del crédito.{" "}
                </BenefitItem>
                <BenefitItem icon={FiEye}>
                  {" "}
                  <strong className={colors.textDark}>
                    Visualice con Claridad:
                  </strong>{" "}
                  Comunique su visión efectivamente a ANACO y otros socios.{" "}
                </BenefitItem>
                <BenefitItem icon={FiFastForward}>
                  {" "}
                  <strong className={colors.textDark}>
                    Agilice Planificación:
                  </strong>{" "}
                  Presente planes mejor fundamentados para facilitar la
                  evaluación financiera.{" "}
                </BenefitItem>
              </ul>
              {/* --- Image Placeholder 5 (Financial Graph/Map Overlay) --- */}
              {/* Moved here, removed max-w-lg/mx-auto */}
              <div className="aspect-video bg-emerald-100 border border-emerald-200 rounded-lg shadow-inner flex items-center justify-center text-emerald-300 mt-6">
                <FiTrendingUp className="w-16 h-16 opacity-50" />
                {/* Comment: Suggests graphic combining map/property with positive financial chart. */}
              </div>
            </motion.div>
          </div>
        </Section>

        {/* --- Combined How it Works & Versatility Section - REVISED LAYOUT --- */}
        <Section
          bg={colors.surface}
          className={`border-y ${colors.borderLight}`}
          ariaLabelledby="how-versatility-title"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left Column: How It Works + Image */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2
                id="how-versatility-title"
                className={`text-3xl font-bold ${colors.textDark} mb-6`}
              >
                ¿Cómo Funciona con ANACO?
              </h2>
              {/* Steps */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {" "}
                  <div
                    className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${colors.primaryBg} ${colors.textLight} font-bold text-lg shadow-md`}
                  >
                    1
                  </div>{" "}
                  <div>
                    {" "}
                    <h4 className={`text-lg font-semibold ${colors.textDark}`}>
                      Solicite el Análisis
                    </h4>{" "}
                    <p className={`${colors.secondary} text-sm`}>
                      Indique su interés en{" "}
                      <InheritedStyleLink to="/anaco/terraplan">
                        TerraPlan™
                      </InheritedStyleLink>{" "}
                      a su asesor ANACO al iniciar su proceso.
                    </p>{" "}
                  </div>{" "}
                </div>
                <div className="flex items-center gap-4">
                  {" "}
                  <div
                    className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${colors.primaryBg} ${colors.textLight} font-bold text-lg shadow-md`}
                  >
                    2
                  </div>{" "}
                  <div>
                    {" "}
                    <h4 className={`text-lg font-semibold ${colors.textDark}`}>
                      Procesamos los Datos
                    </h4>{" "}
                    <p className={`${colors.secondary} text-sm`}>
                      Utilizamos{" "}
                      <InheritedStyleLink to="/anaco/terraplan">
                        TerraPlan™
                      </InheritedStyleLink>{" "}
                      con datos disponibles y la información de su proyecto.
                    </p>{" "}
                  </div>{" "}
                </div>
                <div className="flex items-center gap-4">
                  {" "}
                  <div
                    className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${colors.primaryBg} ${colors.textLight} font-bold text-lg shadow-md`}
                  >
                    3
                  </div>{" "}
                  <div>
                    {" "}
                    <h4 className={`text-lg font-semibold ${colors.textDark}`}>
                      Reciba su Reporte
                    </h4>{" "}
                    <p className={`${colors.secondary} text-sm`}>
                      Obtenga un reporte visual con análisis y sugerencias para
                      su discusión.
                    </p>{" "}
                  </div>{" "}
                </div>
              </div>
              {/* --- Image Placeholder 4 (Visual Planning Interface) --- */}
              {/* Moved here, removed width constraints */}
              <div className="aspect-video bg-slate-200 border border-slate-300 rounded-lg shadow-inner flex items-center justify-center text-slate-400 mt-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />{" "}
                </svg>
                {/* Comment: Suggests mockup of map interface with drawing tools or site layout. */}
              </div>
            </motion.div>

            {/* Right Column: Versatile Applications + Image */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className={`text-3xl font-bold ${colors.textDark} mb-6`}>
                Aplicable a Diversos Proyectos
              </h2>
              <p className={`${colors.secondary} text-lg leading-relaxed mb-8`}>
                El análisis{" "}
                <InheritedStyleLink to="/anaco/terraplan">
                  TerraPlan™
                </InheritedStyleLink>{" "}
                puede informar el desarrollo de una amplia gama de proyectos
                financiables por ANACO:
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-center mb-6">
                {developmentTypes.map((type) => (
                  <div
                    key={type.name}
                    className={`flex flex-col items-center p-3 rounded-md ${colors.primaryLightBg} border ${colors.borderLight} shadow-sm`}
                    title={type.name}
                  >
                    <type.icon className={`w-8 h-8 ${colors.primary} mb-2`} />
                    <span className={`text-xs font-medium ${colors.secondary}`}>
                      {type.name}
                    </span>
                  </div>
                ))}
              </div>
              {/* --- Image Placeholder 3 (Development Suggestions) --- */}
              {/* Moved here, removed width constraints */}
              <div className="aspect-video bg-slate-200 border border-slate-300 rounded-lg shadow-inner flex items-center justify-center text-slate-400 mt-6">
                <FiHome className="w-12 h-12 opacity-50 mr-2" />
                <FiBriefcase className="w-12 h-12 opacity-50 mr-2" />
                <FiDroplet className="w-12 h-12 opacity-50" />
                {/* Comment: Suggests a mockup showing a map with highlighted zones or icons indicating different suggested development types. */}
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Call to Action Section */}
        <Section ariaLabelledby="terraplan-cta-final-title">
          {/* ... CTA Content ... */}
          <motion.div
            variants={fadeInUp}
            className={`text-center max-w-3xl mx-auto p-10 rounded-lg ${colors.primaryLightBg} border ${colors.border} shadow-lg`}
          >
            <FiMap className={`w-12 h-12 ${colors.primary} mx-auto mb-4`} />
            <h2
              id="terraplan-cta-final-title"
              className={`text-3xl font-bold ${colors.textDark} mb-4`}
            >
              Inicie su Proyecto con Mayor Visión
            </h2>
            <p className={`text-lg ${colors.secondary} mb-8`}>
              {" "}
              Añada el poder del análisis geoespacial a su próximo proyecto
              financiado por ANACO. Hable con su asesor hoy mismo.{" "}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                to="/anaco/contact?subject=Consulta%20TerraPlan"
                variant="primary"
                size="lg"
                icon={<FiPhone />}
                className={`${colors.primaryBg} ${colors.primaryBgHover} ${colors.textLight}`}
              >
                {" "}
                Hablar con un Asesor{" "}
              </Button>
              <Button
                to="/anaco/request-pre-approval"
                variant="secondary"
                size="lg"
                className={`bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300`}
              >
                {" "}
                Iniciar Pre-Aprobación{" "}
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
          {/* ... Disclaimer content ... */}
          <div className="flex items-start gap-3">
            {" "}
            <FiInfo
              className={`w-5 h-5 ${colors.warningIcon} flex-shrink-0 mt-0.5`}
              aria-hidden="true"
            />{" "}
            <div>
              {" "}
              <strong className="font-semibold">Nota:</strong>{" "}
              <InheritedStyleLink to="/anaco/terraplan">
                TerraPlan™
              </InheritedStyleLink>{" "}
              es una herramienta de análisis y sugerencia... Consulte con su
              asesor ANACO...{" "}
            </div>{" "}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// --- PropTypes ---
BenefitItem.propTypes = {
  /* ... */
};
Section.propTypes = {
  /* ... */
};
