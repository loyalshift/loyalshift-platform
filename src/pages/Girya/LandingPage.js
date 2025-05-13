// src/pages/Girya/LandingPage.js
// Refined Landing Page for Girya with horizontal scroll section.
// UPDATED: Hero CTA button text and link changed to be more relevant to gym services.
// Uses Earthy Fitness / Mindful Strength Theme.
// Current time: Thursday, May 8, 2025 at 6:25 PM CST.

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiArrowRight,
  FiUsers,
  FiHeart,
  FiZap,
  FiAnchor,
  FiEye,
  FiTrendingUp,
  FiMove,
  FiInfo,
  FiActivity, // Added missing icons
  FiCheckCircle,
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import Section from "../../components/Section"; // Assuming Section handles basic padding/variants
import GiryaLogo from "../../images/girya-logo.svg"; // Import Girya logo URL
import HorizontalScrollSection from "../../components/Girya/HorizontalScrollSection";

// --- Earthy Fitness / Mindful Strength Color Palette ---
const colors = {
  background: "bg-stone-900", // Dark stone base
  surface: "bg-stone-800", // Slightly lighter surface
  surfaceMuted: "bg-stone-700/50 backdrop-blur-sm", // Muted surface for cards
  border: "border-stone-700",
  borderAccent: "border-emerald-600/50",
  titlePrimary: "text-stone-500",
  textPrimary: "text-stone-100",
  textSecondary: "text-stone-400",
  textHighlight: "text-emerald-400", // Earthy green highlight
  textEmphasis: "text-amber-300", // Warm accent
  iconColor: "text-emerald-500",
  buttonPrimaryBg: "bg-gradient-to-r from-emerald-600 to-green-700",
  buttonPrimaryHover: "hover:from-emerald-500 hover:to-green-600",
  buttonText: "text-white",
  success: "text-green-400",
  heroGradient: "bg-gradient-to-b from-stone-800 to-stone-900", // Refined Hero Gradient
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.2 };
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- NEW: Mindful Strength Principle Item ---
const PrincipleItem = ({ icon: Icon, title, description }) => (
  <motion.div variants={fadeInUp} className="flex items-start gap-3">
    <Icon className={`w-6 h-6 ${colors.textHighlight} mt-1 flex-shrink-0`} />
    <div>
      <h4 className={`font-semibold ${colors.titlePrimary}`}>{title}</h4>
      <p className={`${colors.textSecondary} text-sm`}>{description}</p>
    </div>
  </motion.div>
);
PrincipleItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// --- Main Girya Landing Page Component ---
export default function GiryaLandingPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  // --- NEW: Mindful Strength Principles ---
  const mindfulPrinciples = [
    {
      icon: FiHeart,
      title: "Conciencia Corporal",
      description:
        "Enfócate en la calidad del movimiento y las sensaciones internas, no solo en la repetición.",
    },
    {
      icon: FiEye,
      title: "Intención y Propósito",
      description:
        "Cada ejercicio tiene un porqué. Entiende el objetivo para maximizar el beneficio y minimizar riesgos.",
    },
    {
      icon: FiAnchor,
      title: "Presencia y Enfoque",
      description:
        "Minimiza distracciones. Conéctate con tu respiración y el momento presente durante cada levantamiento.",
    },
    {
      icon: FiCheckCircle,
      title: "Técnica Sobre Carga",
      description:
        "Priorizamos la forma perfecta y el control antes de aumentar el peso o la intensidad.",
    },
  ];

  const pillars = [
    {
      icon: FiHeart,
      title: "Mindful Strength",
      description:
        "Integramos la conciencia plena y la técnica precisa para un entrenamiento seguro, efectivo y transformador, respetando la individualidad.",
    },
    {
      icon: FiUsers,
      title: "Comunidad de Apoyo",
      description:
        "Fomentamos un ambiente de respeto mutuo, colaboración y motivación, donde cada miembro se siente parte de algo más grande.",
    },
    {
      icon: FiZap,
      title: "Flujo y Enfoque",
      description:
        "Optimizamos tu experiencia, permitiendo un enfoque total en el crecimiento personal y el entrenamiento consciente.",
    },
    {
      icon: FiTrendingUp,
      title: "Desarrollo Integral",
      description:
        "Creemos en el desarrollo continuo, no solo físico, sino también mental y comunitario, a través de la práctica consciente y dedicada.",
    },
  ];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.heroGradient || colors.background}
          className="relative pt-32 md:pt-40 pb-20 md:pb-24 flex items-center justify-center min-h-[80vh] md:min-h-[70vh] text-center overflow-hidden"
          ariaLabelledby="girya-hero-title"
        >
          <div className="absolute inset-0 opacity-[3%] bg-[url('/public/images/financial-texture.png')] bg-repeat mix-blend-overlay"></div>{" "}
          {/* Adjusted blend mode */}
          <motion.div
            className="max-w-4xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={scaleUp} className="mb-6">
              <img
                src={GiryaLogo}
                alt="Girya Logo"
                className="h-20 md:h-24 w-auto mx-auto filter drop-shadow-lg"
              />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="girya-hero-title"
              className={`text-4xl sm:text-5xl md:text-6xl font-extrabold ${colors.textPrimary} mb-5 leading-tight [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)]`}
            >
              {" "}
              {/* Enhanced shadow */}
              Forja tu Fuerza.{" "}
              <span className={colors.textHighlight}>Encuentra tu Centro.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto mb-10 leading-relaxed`}
            >
              Descubre el poder transformador de Girya y la metodología Mindful
              Strength. Una comunidad dedicada al movimiento consciente y al
              desarrollo integral.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              {/* *** UPDATED PRIMARY CTA *** */}
              <Button
                to="/girya/programs" // Link to programs page (placeholder)
                variant="primary"
                size="lg"
                icon={<FiArrowRight />}
                className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-xl hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition-all duration-300 ease-out`}
              >
                Ver Nuestros Programas
              </Button>
              <Button
                to="/contact?subject=GiryaMembershipInquiry" // More specific subject
                variant="secondary"
                size="lg"
                className={`!bg-stone-700/50 !border-stone-500 !text-stone-200 hover:!bg-stone-700 hover:!border-stone-400 backdrop-blur-sm transform hover:-translate-y-0.5 transition-all duration-300 ease-out`}
              >
                Únete a la Comunidad
              </Button>
            </motion.div>
          </motion.div>
        </Section>

        {/* *** NEW Mindful Strength Insights Section *** */}
        <Section
          bg={colors.surfaceStrong}
          className={`border-y ${colors.textSecondary}`}
          ariaLabelledby="mindful-strength-title"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Text */}
            <motion.div variants={fadeInUp}>
              <h2
                id="mindful-strength-title"
                className={`text-3xl font-bold ${colors.titlePrimary} mb-6 flex items-center gap-3`}
              >
                <FiHeart className={colors.textHighlight} /> La Metodología
                Mindful Strength
              </h2>
              <p
                className={`${colors.textSecondary} text-lg leading-relaxed mb-4`}
              >
                Más que solo levantar pesas, Mindful Strength es una práctica
                que integra cuerpo y mente. Se trata de mover con intención,
                escuchar a tu cuerpo y construir una fuerza resiliente y
                funcional desde adentro hacia afuera.
              </p>
              <p className={`${colors.textSecondary} text-lg leading-relaxed`}>
                Este enfoque no solo previene lesiones, sino que mejora la
                conexión neuromuscular, la concentración y te permite alcanzar
                tu potencial de forma sostenible y consciente.
              </p>
            </motion.div>
            {/* Right Column: Key Principles */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-5"
            >
              <h3
                className={`text-xl font-semibold ${colors.titlePrimary} mb-4`}
              >
                Principios Clave:
              </h3>
              {mindfulPrinciples.map((principle, index) => (
                <PrincipleItem
                  key={index}
                  icon={principle.icon}
                  title={principle.title}
                  description={principle.description}
                />
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Horizontal Scroll Section */}
        <HorizontalScrollSection items={pillars} />

        {/* Benefits/Features Section */}
        <Section
          bg={colors.surfaceStrong}
          className={`border-y ${colors.border}`}
          ariaLabelledby="benefits-title"
        >
          <motion.h2
            variants={fadeInUp}
            id="benefits-title"
            className={`text-3xl font-bold ${colors.titlePrimary} text-center mb-12`}
          >
            Beneficios Clave de Entrenar en Girya
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.surface} border ${colors.borderAccent} hover:shadow-lg transition-shadow`}
            >
              <FiUsers className={`w-8 h-8 ${colors.textHighlight} mb-3`} />
              <h3
                className={`text-xl font-semibold ${colors.textPrimary} mb-2`}
              >
                Comunidad Inclusiva
              </h3>
              <p className={`${colors.textSecondary} text-sm`}>
                Entrena en un ambiente de apoyo y respeto, donde cada individuo
                es valorado.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.surface} border ${colors.borderAccent} hover:shadow-lg transition-shadow`}
            >
              <FiActivity className={`w-8 h-8 ${colors.textHighlight} mb-3`} />
              <h3
                className={`text-xl font-semibold ${colors.textPrimary} mb-2`}
              >
                Entrenamiento Funcional
              </h3>
              <p className={`${colors.textSecondary} text-sm`}>
                Desarrolla fuerza, resistencia y movilidad aplicables a tu vida
                diaria con la guía de expertos.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.surface} border ${colors.borderAccent} hover:shadow-lg transition-shadow`}
            >
              <FiHeart className={`w-8 h-8 ${colors.textHighlight} mb-3`} />
              <h3
                className={`text-xl font-semibold ${colors.textPrimary} mb-2`}
              >
                Enfoque Mindful Strength
              </h3>
              <p className={`${colors.textSecondary} text-sm`}>
                Conecta cuerpo y mente, mejorando la conciencia corporal y la
                calidad del movimiento.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Final CTA */}
        <Section bg={colors.background} ariaLabelledby="girya-final-cta">
          <motion.div
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <img
              src={GiryaLogo}
              alt="Girya Logo"
              className="h-16 w-16 mx-auto mb-6 filter grayscale brightness-150 contrast-125"
            />
            <h2
              id="girya-final-cta"
              className={`text-3xl font-bold ${colors.textWhite} mb-4`}
            >
              Inicia tu Viaje de Fortaleza
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-8`}
            >
              Explora nuestros programas, conoce a nuestros coaches y descubre
              cómo Girya puede transformar tu enfoque hacia el fitness y el
              bienestar.
            </p>
            <Button
              to="/girya/programs" // Consistent CTA link
              variant="primary"
              size="xl"
              icon={<FiArrowRight />}
              className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-xl hover:shadow-emerald-500/50 transform hover:-translate-y-1 transition-all duration-300 ease-out`}
            >
              Descubre Nuestros Programas
            </Button>
          </motion.div>
        </Section>

        {/* Timestamp Info */}
        <p
          className={`relative z-10 text-center text-sm ${colors.textSecondary} mt-12 pb-12 flex items-center justify-center gap-1.5`}
        >
          <FiInfo size={14} /> Página generada: {currentTime}
        </p>
      </main>
    </div>
  );
}

// --- PropTypes ---
GiryaLandingPage.propTypes = {};
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  ariaLabelledby: PropTypes.string,
  widePadding: PropTypes.bool, // Added from original context
};
Button.propTypes = {
  // Assuming basic Button prop types
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
// FeatureListItem is not used on this page anymore, so PropTypes removed.
