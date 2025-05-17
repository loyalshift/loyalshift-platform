// src/pages/Equilibra/EquilibraAboutUsPage.js
// "About Us" page for Equilibra CR.
// Details the philosophy, story, and values of the nutrition service.
// Uses the new Equilibra CR color palette.
// Current time: Friday, May 16, 2025 at 3:20 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiHeart,
  FiBookOpen,
  FiUsers,
  FiAward,
  FiMessageCircle,
  FiSmile,
  FiMessageSquare,
  FiInfo,
  FiArrowRight,
  FiShield, // Added FiShield for trust/safety
} from "react-icons/fi";

// Reusable Components
import Button from "../../components/Button";
import Section from "../../components/Section";
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/nutrition.jpeg";
// Placeholder for nutritionist photo - replace with actual path
const nutritionistPhotoPlaceholder =
  process.env.PUBLIC_URL + "/images/equilibra-dra-maria-laura.jpg";

// --- Equilibra CR New Color Palette ---
const colors = {
  background: "bg-[#FFF7F2]",
  surface: "bg-white",
  surfaceAccent: "bg-[#FDB386]/20", // Soft Peach with opacity
  textPrimary: "text-[#5C5C5C]",
  textSecondary: "text-[#A89C94]",
  textHighlight: "text-[#E86F51]", // Coral Red
  iconColor: "text-[#E86F51]",
  buttonPrimaryBg: "bg-[#E86F51]",
  buttonPrimaryHover: "hover:bg-[#d95f41]",
  buttonTextLight: "text-white",
  border: "border-[#A89C94]/40",
  borderLight: "border-[#F7C6B7]/60",
  borderAccent: "border-[#E86F51]/50",
  success: "text-emerald-600", // Kept for checkmarks
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.2) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});
const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Value/Principle Card Component ---
const ValueCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex flex-col items-center text-center p-6 rounded-xl shadow-lg h-full ${colors.surface} border ${colors.borderLight} hover:shadow-xl transition-shadow duration-300`}
    whileHover={{ y: -4 }}
  >
    <div
      className={`p-3.5 mb-4 rounded-full bg-[#E86F51]/10 border border-[#E86F51]/20`}
    >
      <Icon className={`w-8 h-8 ${colors.iconColor}`} />
    </div>
    <h3 className={`text-xl font-semibold ${colors.textPrimary} mb-2`}>
      {title}
    </h3>
    <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
      {description}
    </p>
  </motion.div>
);
ValueCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// --- Main Equilibra CR About Us Page Component ---
export default function EquilibraAboutUsPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  // Content derived from the research document
  const t = {
    heroTitle:
      "Nuestra Esencia: <span class='text-[#E86F51]'>Nutrición Compasiva y Consciente</span>",
    heroSubtitle:
      "En Equilibra CR, creemos en un camino hacia el bienestar que honra tu historia, tus emociones y tu cuerpo, libre de juicios y dietas restrictivas.",
    storyTitle: "Nuestra Historia y Filosofía",
    storyP1:
      "Equilibra CR nació de una profunda convicción: la nutrición debe ser una herramienta para sanar y conectar, no para castigar o restringir. Como nutricionista licenciada (CPN 3547-24) y futura Máster en Trastornos de la Conducta Alimentaria, mi misión es ofrecer un espacio seguro y profesional en Costa Rica para quienes buscan una relación más pacífica y equilibrada con la comida y su cuerpo.",
    storyP2:
      "Nos especializamos en un enfoque NO pesocentrista, lo que significa que el peso no es el foco de nuestra asesoría. En su lugar, trabajamos para entender las raíces de tus hábitos alimentarios, desmantelar mitos dañinos y construir una base de auto-compasión y alimentación intuitiva.",
    storyP3:
      "Entendemos la complejidad de los Trastornos de la Conducta Alimentaria (TCA) como Anorexia, Bulimia y ARFID (TERIA), y estamos aquí para ofrecer acompañamiento informado y respetuoso.",
    nutritionistTitle: "Conoce a tu Nutricionista",
    nutritionistName: "Dra Maria Laura Sandí Guzmán", // REPLACE with actual name
    nutritionistCredentials:
      "CPN 3547-24 | M.Sc. Trastornos de la Conducta Alimentaria",
    nutritionistBio:
      "Con una pasión por la nutrición basada en evidencia y un profundo respeto por la individualidad de cada persona, me dedico a guiarte hacia una vida donde la comida sea fuente de placer y bienestar, no de conflicto. Mi formación continua en TCA me permite ofrecer un acompañamiento especializado y sensible.",
    valuesTitle: "Nuestro Enfoque y Valores Fundamentales",
    valueEmpathy: {
      title: "Empatía y Compasión",
      description:
        "Un espacio sin juicios, donde tus experiencias y emociones son validadas y respetadas.",
      icon: FiHeart,
    },
    valueNonWeightCentric: {
      title: "Enfoque No Pesocentrista",
      description:
        "La salud y el bienestar van mucho más allá de un número en la báscula. Nos centramos en hábitos sostenibles.",
      icon: FiShield,
    },
    valueEvidence: {
      title: "Práctica Basada en Evidencia",
      description:
        "Recomendaciones y estrategias fundamentadas en la ciencia de la nutrición y la psicología de la alimentación.",
      icon: FiBookOpen,
    },
    valueHolistic: {
      title: "Visión Integral del Ser",
      description:
        "Consideramos todos los aspectos de tu vida –emocional, físico y social– para un acompañamiento completo.",
      icon: FiSmile,
    },
    ctaTitle: "¿Lista/o para Iniciar tu Viaje hacia el Equilibrio?",
    ctaSubtitle:
      "Si resuenas con nuestro enfoque y buscas un acompañamiento nutricional diferente, te invito a agendar una primera sesión o a explorar nuestros recursos.",
    ctaButtonPrimary: "Agendar una Sesión",
    ctaButtonSecondary: "Ver Recursos",
  };

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className="relative pt-24 md:pt-32 pb-16 md:pb-20 text-center overflow-hidden border-b ${colors.borderLight}"
          ariaLabelledby="equilibra-about-hero"
        >
          <motion.div
            className="max-w-3xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer()}
          >
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-6 rounded-full bg-[#FDB386]/20 border border-[#FDB386]/40`}
            >
              {" "}
              {/* Soft Peach Accent */}
              <FiHeart className={`w-12 h-12 ${colors.iconColor}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="equilibra-about-hero"
              className={`text-4xl sm:text-5xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
              dangerouslySetInnerHTML={{ __html: t.heroTitle }}
            />
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              {t.heroSubtitle}
            </motion.p>
          </motion.div>
        </Section>

        {/* Our Story and Philosophy Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-20`}
          ariaLabelledby="equilibra-story-title"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <motion.div variants={fadeInUp}>
              <h2
                id="equilibra-story-title"
                className={`text-3xl font-bold ${colors.textPrimary} mb-6`}
              >
                {t.storyTitle}
              </h2>
              <div className="space-y-4 text-lg ${colors.textSecondary} leading-relaxed">
                <p>{t.storyP1}</p>
                <p>{t.storyP2}</p>
                <p>{t.storyP3}</p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`aspect-square ${colors.surface} rounded-xl border ${colors.border} flex items-center justify-center shadow-lg p-4`}
            >
              {/* Placeholder for an image representing Equilibra's calm/natural approach */}
              <img
                src={equilibraLogoPath}
                alt="Equilibra CR Symbol"
                className=" object-contain opacity-70"
              />
            </motion.div>
          </div>
        </Section>

        {/* Meet Your Nutritionist Section */}
        <Section
          bg={colors.surfaceAccent}
          className={`py-16 md:py-20 border-y ${colors.borderLight}`}
          ariaLabelledby="nutritionist-title"
        >
          <motion.div
            className="max-w-4xl mx-auto text-center md:text-left md:flex md:items-center md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.2)}
          >
            <motion.div
              variants={scaleUp}
              className="mb-6 md:mb-0 md:w-1/3 flex-shrink-0"
            >
              <img
                src={nutritionistPhotoPlaceholder}
                alt={t.nutritionistName}
                className="w-48 h-48 md:w-56 md:h-56 rounded-full mx-auto md:mx-0 object-cover shadow-xl border-4 border-white"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="md:w-2/3">
              <h2
                id="nutritionist-title"
                className={`text-3xl font-bold ${colors.textPrimary} mb-2`}
              >
                {t.nutritionistTitle}
              </h2>
              <h3
                className={`text-xl font-semibold ${colors.textHighlight} mb-1`}
              >
                {t.nutritionistName}
              </h3>
              <p className={`text-sm ${colors.textSecondary} mb-4`}>
                {t.nutritionistCredentials}
              </p>
              <p className={`${colors.textPrimary} text-base leading-relaxed`}>
                {t.nutritionistBio}
              </p>
            </motion.div>
          </motion.div>
        </Section>

        {/* Our Values/Approach Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-24`}
          ariaLabelledby="values-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="values-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-12 md:mb-16`}
          >
            {t.valuesTitle}
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto items-stretch"
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <ValueCard
              icon={t.valueEmpathy.icon}
              title={t.valueEmpathy.title}
              description={t.valueEmpathy.description}
            />
            <ValueCard
              icon={t.valueNonWeightCentric.icon}
              title={t.valueNonWeightCentric.title}
              description={t.valueNonWeightCentric.description}
            />
            <ValueCard
              icon={t.valueEvidence.icon}
              title={t.valueEvidence.title}
              description={t.valueEvidence.description}
            />
            <ValueCard
              icon={t.valueHolistic.icon}
              title={t.valueHolistic.title}
              description={t.valueHolistic.description}
            />
          </motion.div>
        </Section>

        {/* Final Call to Action */}
        <Section
          bg={colors.surface}
          className="py-20 md:py-24 text-center border-t ${colors.borderLight}"
          ariaLabelledby="about-cta-title"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-2xl mx-auto"
          >
            <FiHeart className={`w-12 h-12 ${colors.iconColor} mx-auto mb-6`} />
            <h2
              id="about-cta-title"
              className={`text-3xl font-bold ${colors.textPrimary} mb-4`}
            >
              {t.ctaTitle}
            </h2>
            <p
              className={`text-lg ${colors.textSecondary} mb-8 max-w-xl mx-auto`}
            >
              {t.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                to="/equilibra/contact?subject=ConsultaAsesoria"
                variant="custom"
                size="xl"
                icon={<FiMessageSquare />}
                className={`${colors.buttonPrimaryBg} ${colors.buttonTextLight} ${colors.buttonPrimaryHover} shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                {t.ctaButtonPrimary}
              </Button>
              <Button
                to="/equilibra/blog" // Link to blog/resources
                variant="custom"
                size="lg"
                className={`bg-transparent border-2 ${colors.borderAccent} ${colors.textHighlight} hover:bg-[#E86F51]/10 hover:border-[#E86F51]`}
              >
                {t.ctaButtonSecondary}
              </Button>
            </div>
          </motion.div>
        </Section>

        <p
          className={`text-center text-sm ${colors.textSecondary} mt-16 pb-16 flex items-center justify-center gap-1.5`}
        ></p>
      </main>
    </div>
  );
}

// --- PropTypes ---
EquilibraAboutUsPage.propTypes = {};
ValueCard.propTypes = {
  /* ... */
};
Section.propTypes = {
  /* ... */
};
Button.propTypes = {
  /* ... */
};
