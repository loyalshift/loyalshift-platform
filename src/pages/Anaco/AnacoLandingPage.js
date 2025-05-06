// src/pages/Anaco/AnacoLandingPage.js
// REFINED: Full screen hero, word animations added, smaller button.
// Uses Green/White/Grey Theme, Spanish Language. Includes FloatingItemsBackground.
// Current time: Friday, May 2, 2025 at 7:57 PM CST. San José, Costa Rica.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiHome,
  FiDollarSign,
  FiUsers,
  FiClock,
  FiAward,
  FiMapPin,
  FiArrowRight,
  FiInfo,
  FiChevronDown,
} from "react-icons/fi";

// Reusable Components
import Button from "../../components/Button";
import FloatingItemsBackground from "../../components/Anaco/FloatingItemsBackground"; // Use the floating items background

// Theme Colors
const colors = {
  background: "bg-slate-50",
  surface: "bg-white",
  primary: "text-emerald-700",
  primaryBg: "bg-emerald-600",
  primaryBgHover: "hover:bg-emerald-700",
  secondary: "text-slate-500",
  textDark: "text-slate-800",
  textLight: "text-white",
  border: "border-slate-200",
};

// Animation Variants
const viewportOnce = { once: true, amount: 0.2 };
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
// Stagger container for the whole hero section content
const heroStaggerContainer = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }, // Overall stagger for elements
};

// Stagger container specifically for animating words within text blocks
const wordStaggerContainer = {
  visible: { transition: { staggerChildren: 0.05 } }, // Faster stagger for words
};

// Animation for individual words
const wordFadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Simple fade in for the button block
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Main Anaco Landing Page Component ---
export default function AnacoLandingPage() {
  const services = [
    {
      icon: <FiHome className={`w-8 h-8 ${colors.primary}`} />,
      title: "Créditos Hipotecarios",
      desc: "Soluciones flexibles para compra de vivienda, lote o construcción en Costa Rica.",
    },
    {
      icon: <FiDollarSign className={`w-8 h-8 ${colors.primary}`} />,
      title: "Inversiones Seguras",
      desc: "Opciones de inversión confiables respaldadas por nuestra sólida trayectoria.",
    },
    {
      icon: <FiUsers className={`w-8 h-8 ${colors.primary}`} />,
      title: "Asesoría Personalizada",
      desc: "Nuestros expertos le guían para tomar las mejores decisiones financieras.",
    },
  ];
  const whyAnaco = [
    {
      icon: <FiAward className={`w-7 h-7 ${colors.primary}`} />,
      title: "40+ Años de Experiencia",
      desc: "Un legado de confianza y solidez financiera en Cartago.",
    },
    {
      icon: <FiClock className={`w-7 h-7 ${colors.primary}`} />,
      title: "Procesos Ágiles",
      desc: "Eficiencia y rapidez en cada trámite para su conveniencia.",
    },
    {
      icon: <FiUsers className={`w-7 h-7 ${colors.primary}`} />,
      title: "Atención Personalizada",
      desc: "Trato cercano y soluciones adaptadas a sus necesidades.",
    },
    {
      icon: <FiMapPin className={`w-7 h-7 ${colors.primary}`} />,
      title: "Enfoque Local",
      desc: "Profundo conocimiento del mercado inmobiliario y financiero de Cartago.",
    },
  ];
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const HEADER_HEIGHT = "72px"; // Example height

  // Split text for animation
  const headlineText = "Su Socio Financiero de Confianza en Cartago";
  const subheadlineText =
    "Más de 40 años impulsando sus proyectos con soluciones hipotecarias y financieras ágiles y personalizadas.";

  // Helper function to wrap words/special spans
  const AnimatedText = ({
    text,
    highlightClass,
    staggerVariant,
    wordVariant,
    className,
  }) => {
    const words = text.split(" ").map((word, index) => {
      // Check if the word is 'Confianza' to apply special styling
      const isHighlight = word.includes("Confianza");
      const wordContent = isHighlight ? "Confianza" : word; // Isolate the word
      const punctuation = isHighlight ? word.replace("Confianza", "") : ""; // Get trailing punctuation if any

      return (
        <motion.span
          key={index}
          variants={wordVariant}
          className="inline-block mr-[0.25em]"
        >
          {" "}
          {/* Add slight space */}
          {isHighlight ? (
            <>
              <span className={highlightClass}>{wordContent}</span>
              {punctuation}
            </>
          ) : (
            <>
              {word}
              {punctuation}
            </> // Render normally
          )}
        </motion.span>
      );
    });

    return (
      <motion.span
        variants={staggerVariant}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {words}
      </motion.span>
    );
  };

  return (
    <div className={`${colors.background} font-sans`}>
      <FloatingItemsBackground /> {/* Use the floating items background */}
      <main className="relative z-10">
        {/* === REFINED HERO SECTION with calc() height === */}
        <motion.section
         className="text-center relative flex items-center justify-center min-h-full overflow-visible px-4 py-20"
         initial="hidden"
         animate="visible"
         variants={heroStaggerContainer}
       >
          {/* Content container */}
          <div className="container mx-auto px-4 relative z-10 py-10">
            {/* Added some vertical padding for content spacing */}
            {/* Icon */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center justify-center p-3 rounded-full bg-white/90 border border-slate-200 shadow-sm mb-6 backdrop-blur-sm"
            >
              <FiAward className={`w-8 h-8 ${colors.primary}`} />
            </motion.div>
            {/* Headline */}
            <motion.h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colors.textDark} [text-shadow:0_1px_3px_rgba(255,255,255,0.6)] mb-6 max-w-4xl mx-auto leading-tight`}
              variants={fadeInUp}
            >
              <AnimatedText
                text={headlineText}
                highlightClass={colors.primary}
                staggerVariant={wordStaggerContainer}
                wordVariant={wordFadeInUp}
                className="block"
              />
            </motion.h1>
            {/* Sub-headline */}
            <motion.p
              className={`text-lg md:text-xl ${colors.secondary} [text-shadow:0_1px_2px_rgba(255,255,255,0.5)] max-w-2xl mx-auto mb-12`}
              variants={fadeInUp}
            >
              <AnimatedText
                text={subheadlineText}
                staggerVariant={wordStaggerContainer}
                wordVariant={wordFadeInUp}
                className="block"
              />
            </motion.p>
            {/* Button */}
            <motion.div variants={fadeInUp}>
              <Button
                to="/anaco/request-pre-approval"
                variant="primary"
                size="base"
                className={`inline-flex ${colors.primaryBg} ${colors.primaryBgHover} ${colors.textLight} transform hover:-translate-y-1 shadow-lg`}
                icon={<FiArrowRight className="ml-1.5 -mr-1 w-4 h-4" />}
              >
                Iniciar Pre-Aprobación
              </Button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            // Adjusted bottom positioning slightly
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.7, 0.7, 0.7, 0], y: 0 }}
            transition={{
              duration: 1.8,
              delay: 2.5,
              repeat: Infinity,
              repeatDelay: 1.0,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1.0,
              }}
              className={`${colors.indicatorColor} opacity-80`}
            >
              <FiChevronDown className="w-7 h-7" />
            </motion.div>
          </motion.div>
        </motion.section>
        {/* === END REFINED HERO SECTION === */}

        {/* Services Section */}
        <section className={`py-16 md:py-24 ${colors.surface}`} id="servicios">
          {/* ... Services content remains the same ... */}
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeInUp}
              className={`text-3xl font-bold ${colors.textDark} text-center mb-16`}
            >
              Nuestros Servicios Principales
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-6"
                >
                  {" "}
                  <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-100 mb-4">
                    {" "}
                    {service.icon}{" "}
                  </div>{" "}
                  <h3
                    className={`text-xl font-semibold ${colors.textDark} mb-2`}
                  >
                    {" "}
                    {service.title}{" "}
                  </h3>{" "}
                  <p className={`text-base ${colors.secondary}`}>
                    {service.desc}
                  </p>{" "}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Anaco Section */}
        <section className="py-16 md:py-24" id="porque-anaco">
          {/* ... Why Choose content remains the same ... */}
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeInUp}
              className={`text-3xl font-bold ${colors.textDark} text-center mb-16`}
            >
              ¿Por Qué Elegir ANACO?
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {whyAnaco.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`p-6 rounded-lg ${colors.surface} border ${colors.border} text-center shadow-sm hover:shadow-md transition-shadow`}
                >
                  {" "}
                  <div className="mb-4 inline-block"> {item.icon} </div>{" "}
                  <h3
                    className={`text-lg font-semibold ${colors.textDark} mb-1`}
                  >
                    {item.title}
                  </h3>{" "}
                  <p className={`text-sm ${colors.secondary}`}>{item.desc}</p>{" "}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className={`py-16 md:py-24 ${colors.surface}`}
          id="contacto-cta"
        >
          {/* ... Final CTA content remains the same ... */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            className="container mx-auto px-4 text-center max-w-2xl"
          >
            <h2 className={`text-3xl font-bold ${colors.textDark} mb-4`}>
              {" "}
              Inicie su proyecto hoy mismo{" "}
            </h2>
            <p className={`text-lg ${colors.secondary} mb-8`}>
              {" "}
              Contáctenos para una asesoría personalizada o para iniciar su
              solicitud de crédito hipotecario. Estamos aquí para servirle en
              Cartago.{" "}
            </p>
            <Button
              to="/anaco/contact"
              variant="primary"
              size="lg"
              className={`${colors.primaryBg} ${colors.primaryBgHover} ${colors.textLight} transform hover:-translate-y-0.5 shadow-md`}
              icon={<FiArrowRight className="ml-2 -mr-1 h-5 w-5" />}
            >
              {" "}
              Contactar un Asesor{" "}
            </Button>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

// PropTypes
AnacoLandingPage.propTypes = {};
Button.propTypes = {
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
};
// PropTypes for AnimatedText if extracted
