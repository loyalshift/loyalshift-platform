// src/pages/Girya/EnrollmentPage.js
// Page for Girya gym enrollment, showcasing different membership tiers.
// Uses Earthy Fitness / Mindful Strength Theme.
// Current time: Tuesday, May 13, 2025 at 10:10 AM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiMessageSquare,
  FiUsers,
  FiHeart,
  FiZap,
  FiTarget,
  FiCheckCircle,
  FiAward,
  FiDollarSign,
  FiCalendar,
  FiInfo,
  FiShield,
  FiActivity, // Added FiActivity
  FiBookOpen,
  FiMove, // Added FiBookOpen, FiMove
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button"; // Path to main Button component
import Section from "../../components/Section"; // Path to main Section component
import GiryaLogo from "../../images/girya-logo.svg"; // Import Girya logo URL

// --- Earthy Fitness / Mindful Strength Color Palette ---
const colors = {
  background: "bg-stone-900",
  surface: "bg-stone-800",
  surfaceMuted: "bg-stone-700/60 backdrop-blur-md",
  surfaceStrong: "bg-stone-800", // Dark background for sections like "Why Girya"
  border: "border-stone-700",
  borderAccent: "border-emerald-600/50",
  textPrimary: "text-stone-100",
  textSecondary: "text-stone-400",
  textHighlight: "text-emerald-400",
  textEmphasis: "text-amber-400",
  textWhite: "text-stone-100", // Using stone-100 as "white" for slightly softer look on dark
  iconColor: "text-emerald-500",
  buttonPrimaryBg: "bg-gradient-to-r from-emerald-600 to-green-700",
  buttonPrimaryHover: "hover:from-emerald-500 hover:to-green-600",
  buttonText: "text-white", // This is actual white for buttons
  success: "text-green-400",
  heroGradient: "bg-gradient-to-br from-stone-800 via-stone-900 to-black",
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Pricing Tier Card Component ---
const PricingTierCard = ({ tier, isPopular = false }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 250, damping: 15 }}
    className={`flex flex-col rounded-xl shadow-2xl overflow-hidden h-full border
            ${
              isPopular
                ? `${colors.surface} ${colors.borderAccent} border-2 relative`
                : `${colors.surfaceMuted} ${colors.border}`
            }`}
  >
    {isPopular && (
      <div
        className={`absolute -top-px left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold ${colors.textEmphasis} bg-amber-500/20 border border-amber-500 rounded-b-md`}
      >
        Más Popular
      </div>
    )}
    <div className={`p-6 md:p-8 text-center ${isPopular ? "pt-10" : ""}`}>
      <tier.icon
        className={`w-10 h-10 mx-auto mb-4 ${
          isPopular ? colors.textEmphasis : colors.textHighlight
        }`}
      />
      <h3 className={`text-2xl font-bold ${colors.textPrimary} mb-2`}>
        {tier.name}
      </h3>
      <p className={`text-4xl font-extrabold ${colors.textWhite} mb-1`}>
        ₡{tier.price}
        <span className={`text-base font-medium ${colors.textSecondary}`}>
          /mes
        </span>
      </p>
      <p className={`${colors.textSecondary} text-sm min-h-[3em] mb-6`}>
        {tier.description}
      </p>
    </div>
    <div
      className={`px-6 md:px-8 pb-8 pt-6 border-t ${colors.border} bg-stone-800/30 flex-grow`}
    >
      <ul className="space-y-3">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <FiCheckCircle
              className={`w-5 h-5 ${colors.success} mr-2.5 mt-0.5 flex-shrink-0`}
            />
            <span className={`${colors.textSecondary} text-sm`}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="p-6 md:p-8 mt-auto">
      <Button
        to={tier.ctaLink || "/girya/contact?subject=Inscripcion"}
        variant="primary"
        size="lg"
        className={`w-full ${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-lg hover:shadow-emerald-500/40`}
      >
        {tier.ctaText || "Inscribirse Ahora"}
      </Button>
    </div>
  </motion.div>
);
PricingTierCard.propTypes = {
  tier: PropTypes.object.isRequired,
  isPopular: PropTypes.bool,
};

// --- Main Girya Enrollment Page Component ---
export default function GiryaEnrollmentPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  const pricingTiers = [
    {
      name: "Flujo Esencial",
      icon: FiActivity,
      price: "50,000",
      description:
        "Acceso ilimitado a todas nuestras clases grupales de Mindful Strength y uso de instalaciones.",
      features: [
        "Acceso completo al gimnasio",
        "Todas las clases grupales incluidas",
        "Acceso a la comunidad online GiryaFlow",
        "Seguimiento básico de progreso en la app",
      ],
      ctaText: "Empezar Flujo Esencial",
      ctaLink: "/girya/contact?subject=InscripcionFlujoEsencial",
    },
    {
      name: "Fuerza Dedicada",
      icon: FiZap,
      price: "75,000",
      description:
        "Todo lo de Flujo Esencial, más programas de entrenamiento personalizados y sesiones de coaching mensuales.",
      features: [
        "Todo en Flujo Esencial",
        "1 Programa de entrenamiento personalizado al mes",
        "1 Sesión de coaching 1:1 mensual (virtual o presencial)",
        "Acceso prioritario a talleres",
        "Análisis avanzado de progreso",
      ],
      ctaText: "Forjar Fuerza Dedicada",
      ctaLink: "/girya/contact?subject=InscripcionFuerzaDedicada",
      isPopular: true,
    },
    {
      name: "Maestría Mindful",
      icon: FiAward,
      price: "110,000",
      description:
        "La experiencia Girya completa. Coaching ilimitado, acceso total a recursos y talleres exclusivos.",
      features: [
        "Todo en Fuerza Dedicada",
        "Planes de entrenamiento y nutrición ilimitados y adaptativos",
        "Sesiones de coaching 1:1 ilimitadas (según disponibilidad)",
        "Acceso VIP a todos los talleres y eventos",
        "Merchandising exclusivo de Girya",
      ],
      ctaText: "Alcanzar la Maestría",
      ctaLink: "/girya/contact?subject=InscripcionMaestriaMindful",
    },
  ];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      {/* Assumes GiryaLayout provides Header & Footer */}
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.heroGradient}
          className="relative pt-24 md:pt-32 pb-16 md:pb-20 text-center overflow-hidden"
          ariaLabelledby="girya-enroll-hero"
        >
          <div className="absolute inset-0 opacity-[4%] bg-[url('/public/images/financial-texture.png')] bg-repeat mix-blend-multiply"></div>
          <motion.div
            className="max-w-3xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={scaleUp} className="mb-6">
              <img
                src={GiryaLogo}
                alt="Girya Logo"
                className="h-16 md:h-20 w-auto mx-auto filter drop-shadow-md"
              />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="girya-enroll-hero"
              className={`text-4xl sm:text-5xl font-extrabold ${colors.textWhite} mb-4 leading-tight [text-shadow:0_0_10px_rgba(16,185,129,0.4)]`}
            >
              Únete a la Tribu Girya
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              Descubre el plan perfecto para iniciar o profundizar tu viaje en
              Mindful Strength. Transforma tu cuerpo, calma tu mente y conecta
              con una comunidad que te impulsa.
            </motion.p>
          </motion.div>
        </Section>

        {/* Pricing Tiers Section */}
        <Section
          bg={colors.background} // Ensuring dark background for this section
          className={`py-16 md:py-24 border-t ${colors.border}`}
          ariaLabelledby="pricing-tiers-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="pricing-tiers-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textWhite} text-center mb-12 md:mb-16`}
          >
            Planes de Membresía Mensual
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {pricingTiers.map((tier) => (
              <PricingTierCard
                key={tier.name}
                tier={tier}
                isPopular={tier.isPopular}
              />
            ))}
          </motion.div>
        </Section>

        {/* Why Girya / Philosophy Reminder Section */}
        <Section
          bg={colors.surfaceStrong} // This section has a dark background
          className={`py-16 md:py-20 border-y ${colors.border}`}
          ariaLabelledby="why-girya-title"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <motion.div variants={fadeInUp}>
              {/* Title uses colors.textWhite for visibility on dark background */}
              <h2
                id="why-girya-title"
                className={`text-3xl font-bold ${colors.textWhite} mb-6 flex items-center gap-3`}
              >
                <FiHeart className={colors.textHighlight} /> Más Que un Gimnasio
              </h2>
              <p
                className={`${colors.textSecondary} text-lg leading-relaxed mb-4`}
              >
                En Girya, creemos que la verdadera fortaleza se cultiva desde
                adentro. Nuestra metodología Mindful Strength combina técnica
                precisa con conciencia plena, creando una experiencia de
                entrenamiento que es tanto desafiante como profundamente
                restauradora.
              </p>
              <p className={`${colors.textSecondary} text-lg leading-relaxed`}>
                No se trata solo de levantar pesas; se trata de construir
                resiliencia, enfoque y una conexión más profunda contigo mismo y
                con una comunidad que te apoya.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`aspect-video ${colors.surface} rounded-xl border ${colors.borderAccent} flex items-center justify-center shadow-xl p-4`}
            >
              <img
                src={"/images/girya-people-1.jpg"}
                alt="Girya Abstract Symbol"
                className=""
              />
            </motion.div>
          </div>
        </Section>

        {/* Final Call to Action */}
        <Section
          bg={colors.background} // Dark background
          className="py-20 md:py-24 text-center"
          ariaLabelledby="enroll-cta-final"
        >
          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
            <FiAward
              className={`w-12 h-12 ${colors.textHighlight} mx-auto mb-6`}
            />
            <h2
              id="enroll-cta-final"
              className={`text-3xl font-bold ${colors.textWhite} mb-4`}
            >
              ¿Listo para Empezar tu Viaje?
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-8`}
            >
              Si tienes preguntas o deseas una consulta personalizada para
              elegir el mejor plan para ti, nuestro equipo está listo para
              ayudarte.
            </p>
            <Button
              to="/girya/contact?subject=ConsultaInscripcion"
              variant="primary"
              size="xl"
              icon={<FiMessageSquare />} // Changed icon to FiMessageSquare
              className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 ease-out`}
            >
              Contacta a un Coach
            </Button>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
GiryaEnrollmentPage.propTypes = {};
PricingTierCard.propTypes = {
  tier: PropTypes.object.isRequired,
  isPopular: PropTypes.bool,
};
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  ariaLabelledby: PropTypes.string,
  widePadding: PropTypes.bool,
};
Button.propTypes = {
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
