// src/pages/Afc/AFCAboutUsPage.js
// "About Us" page for Athletic Functional Center (AFC).
// Highlights AFC's story, philosophy, values, and community focus.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 2:30 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiAward, // Legacy, Trust, Quality
  FiUsers, // Community, Team
  FiHeart, // Values, Passion
  FiMapPin, // Location (El Tejar, Cartago)
  FiNavigation, // Growth, Improvement
  FiCheckCircle, // Benefits, Values
  FiArrowRight, // CTA
  FiInfo, // Timestamp
  FiZap, // Functional Fitness, Energy
  FiSmile, // Welcoming Atmosphere
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button"; // Path to main Button component
import Section from "../../components/Section"; // Path to main Section component
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.svg"; // AFC Logo

// --- AFC Color Palette (Light Theme with Red Accents) ---
const colors = {
  background: "bg-slate-50",
  surface: "bg-white",
  surfaceAccent: "bg-red-50",
  textPrimary: "text-slate-900",
  textSecondary: "text-slate-600",
  textMuted: "text-slate-500",
  accentRed: "text-red-600",
  accentRedDark: "text-red-700",
  accentRedBg: "bg-red-600",
  accentRedBgHover: "hover:bg-red-700",
  border: "border-slate-300",
  borderLight: "border-slate-200",
  borderAccent: "border-red-500/40",
  iconColor: "text-red-600",
  success: "text-green-600", // For checkmarks or positive affirmations
  buttonTextLight: "text-white",
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.2) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Helper Component for Value/Principle Cards ---
const ValuePillarCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex flex-col items-center text-center p-6 rounded-xl shadow-lg h-full ${colors.surface} border ${colors.borderLight} hover:shadow-xl hover:border-red-300 transition-all duration-300`}
    whileHover={{ y: -5 }}
  >
    <div
      className={`p-4 mb-4 rounded-full ${colors.accentRedBg} bg-opacity-10 border ${colors.borderAccent}`}
    >
      <Icon className={`w-10 h-10 ${colors.accentRed}`} />
    </div>
    <h3 className={`text-xl font-semibold ${colors.textPrimary} mb-2`}>
      {title}
    </h3>
    <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
      {description}
    </p>
  </motion.div>
);
ValuePillarCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// --- Main AFC About Us Page Component ---
export default function AFCAboutUsPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  // Content based on the AFC Analysis document
  const t = {
    heroTitle:
      "Somos <span class='text-red-600'>Athletic Functional Center</span>",
    heroSubtitle:
      "Tu centro de fitness funcional en El Tejar, Cartago, dedicado a potenciar tu bienestar integral a través del movimiento consciente y una comunidad que inspira.",
    storyTitle: "Nuestra Historia: Pasión por el Movimiento Funcional",
    storyP1:
      "Athletic Functional Center (AFC) nació de la convicción de que el fitness debe ser práctico, efectivo y, sobre todo, mejorar la calidad de vida. Ubicados en el corazón de la comunidad, en el Centro Comercial La Hacienda, nos dedicamos a ofrecer un espacio donde cada persona puede descubrir su potencial atlético y funcional.",
    storyP2:
      "Nos enfocamos en ejercicios que preparan tu cuerpo para los desafíos diarios, mejorando tu fuerza, estabilidad y movilidad de una manera integral y segura.",
    philosophyTitle:
      "Nuestra Filosofía: Movimiento Inteligente, Comunidad Fuerte",
    philosophyP1:
      "Creemos en un fitness que va más allá de la estética. Nuestra metodología se centra en el entrenamiento funcional inteligente, la técnica precisa y la creación de una comunidad de apoyo que te motiva a alcanzar tus metas y mantener un estilo de vida activo y saludable.",
    valueCommunity: {
      title: "Comunidad Vibrante",
      description:
        "Más que un gimnasio, somos una familia. Fomentamos un ambiente de apoyo, respeto y camaradería.",
      icon: FiUsers,
    },
    valueFunctional: {
      title: "Fitness Funcional Real",
      description:
        "Entrenamientos diseñados para mejorar tu rendimiento en la vida cotidiana y en tus actividades deportivas.",
      icon: FiZap,
    },
    valueWellbeing: {
      title: "Bienestar Integral",
      description:
        "Promovemos un enfoque holístico que incluye movimiento, mentalidad y hábitos saludables.",
      icon: FiHeart,
    },
    valueExpertise: {
      title: "Coaching Experto",
      description:
        "Entrenadores certificados y apasionados dedicados a tu progreso y seguridad.",
      icon: FiAward,
    },
    locationTitle: "Encuéntranos en el Corazón de El Tejar",
    locationP1: `Visítanos en el Centro Comercial La Hacienda, 30801, Provincia de Cartago, El Tejar. Un espacio diseñado para tu comodidad y para integrarnos activamente en la vida de nuestra comunidad.`,
    locationPhone: "Teléfono: 8400 5481",
    ctaTitle: "¿Listo para Transformar tu Enfoque del Fitness?",
    ctaSubtitle:
      "Descubre nuestros programas, conoce a nuestros coaches y únete a la comunidad AFC. Tu viaje hacia una vida más fuerte y funcional comienza aquí.",
    ctaButton: "Ver Programas y Horarios",
  };

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      {/* This page assumes it's rendered within AFCLayout which provides AFCHeader/Footer */}
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className="relative pt-24 md:pt-32 pb-16 md:pb-20 text-center overflow-hidden border-b ${colors.borderLight}"
          ariaLabelledby="afc-about-hero"
        >
          <motion.div
            className="max-w-4xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer()}
          >
            <motion.div variants={scaleUp} className="mb-6">
              <img
                src={afcLogoPath}
                alt="AFC Logo"
                className="h-20 md:h-24 w-auto mx-auto shadow-sm"
              />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="afc-about-hero"
              className={`text-4xl sm:text-5xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
              dangerouslySetInnerHTML={{ __html: t.heroTitle }}
            />
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-3xl mx-auto`}
            >
              {t.heroSubtitle}
            </motion.p>
          </motion.div>
        </Section>

        {/* Our Story Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-20`}
          ariaLabelledby="afc-story-title"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <motion.div variants={fadeInUp}>
              <h2
                id="afc-story-title"
                className={`text-3xl font-bold ${colors.textPrimary} mb-6 flex items-center gap-3`}
              >
                <FiAward className={colors.accentRed} /> {t.storyTitle}
              </h2>
              <p
                className={`${colors.textSecondary} text-lg leading-relaxed mb-4`}
              >
                {t.storyP1}
              </p>
              <p className={`${colors.textSecondary} text-lg leading-relaxed`}>
                {t.storyP2}
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`aspect-video ${colors.surface} rounded-xl border ${colors.border} flex items-center justify-center shadow-lg p-4`}
            >
              {/* Placeholder for an image representing AFC's community or facility */}
              <img
                src="/images/afc-workout.jpg"
                alt="AFC Community"
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </Section>

        {/* Philosophy & Values Section */}
        <Section
          bg={colors.surface}
          className={`py-16 md:py-24 border-y ${colors.borderLight}`}
          ariaLabelledby="afc-philosophy-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="afc-philosophy-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-6`}
          >
            {t.philosophyTitle}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={`text-lg ${colors.textSecondary} text-center max-w-3xl mx-auto mb-12 md:mb-16`}
          >
            {t.philosophyP1}
          </motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto items-stretch" // items-stretch for equal height cards
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <ValuePillarCard
              icon={t.valueCommunity.icon}
              title={t.valueCommunity.title}
              description={t.valueCommunity.description}
            />
            <ValuePillarCard
              icon={t.valueFunctional.icon}
              title={t.valueFunctional.title}
              description={t.valueFunctional.description}
            />
            <ValuePillarCard
              icon={t.valueWellbeing.icon}
              title={t.valueWellbeing.title}
              description={t.valueWellbeing.description}
            />
            <ValuePillarCard
              icon={t.valueExpertise.icon}
              title={t.valueExpertise.title}
              description={t.valueExpertise.description}
            />
          </motion.div>
        </Section>

        {/* Location Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-20`}
          ariaLabelledby="afc-location-title"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <FiMapPin
                className={`w-12 h-12 ${colors.iconColor} mx-auto mb-6`}
              />
              <h2
                id="afc-location-title"
                className={`text-3xl font-bold ${colors.textPrimary} mb-4`}
              >
                {t.locationTitle}
              </h2>
              <p
                className={`${colors.textSecondary} text-lg leading-relaxed mb-3`}
              >
                {t.locationP1}
              </p>
              <p className={`${colors.textSecondary} text-lg font-semibold`}>
                {t.locationPhone}
              </p>
              <div className="mt-6">
                <a
                  href="https://www.waze.com/ul?ll=9.86300000%2C-83.91770000&navigate=yes" // Example Waze link, replace with actual if available
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm ${colors.buttonTextLight} ${colors.accentRedBg} ${colors.accentRedBgHover} transition-colors`}
                >
                  <FiNavigation className="w-5 h-5 mr-2" />{" "}
                  {/* Placeholder, FiNavigation is not in react-icons/fi. Use FiMapPin or similar */}
                  Obtener Direcciones (Waze)
                </a>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Final Call to Action */}
        <Section
          bg={colors.surfaceAccent}
          className="py-20 md:py-24 text-center"
          ariaLabelledby="afc-about-cta"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-2xl mx-auto"
          >
            <FiAward className={`w-12 h-12 ${colors.accentRed} mx-auto mb-6`} />
            <h2
              id="afc-about-cta"
              className={`text-3xl font-bold ${colors.textPrimary} mb-4`}
            >
              {t.ctaTitle}
            </h2>
            <p
              className={`text-lg ${colors.textSecondary} mb-8 max-w-xl mx-auto`}
            >
              {t.ctaSubtitle}
            </p>
            <Button
              to="/afc/enroll" // Link to enrollment page
              variant="primary"
              size="xl"
              icon={<FiArrowRight />}
              className={`${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover} shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all`}
            >
              {t.ctaButton}
            </Button>
          </motion.div>
        </Section>

        {/* Timestamp Info */}
        <p
          className={`text-center text-sm ${colors.textMuted} mt-16 pb-16 flex items-center justify-center gap-1.5`}
        ></p>
      </main>
    </div>
  );
}

// --- PropTypes ---
AFCAboutUsPage.propTypes = {};
ValuePillarCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};
Button.propTypes = {
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
