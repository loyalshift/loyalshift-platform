// src/pages/Girya/AboutUsPage.js
// "About Us" page for Girya, focusing on philosophy, community, and team.
// Uses a Light Earthy Fitness / Mindful Strength Theme.
// Current time: Tuesday, May 13, 2025 at 1:45 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiHeart, // Philosophy, Passion
  FiUsers, // Community, Team
  FiZap, // Energy, Strength
  FiAward, // Expertise, Quality
  FiMapPin, // Location (Our Space)
  FiBookOpen, // Methodology, Story
  FiArrowRight, // CTA
  FiInfo, // Timestamp
  FiSmile, // Welcoming vibe for community
  FiSun, // Positive energy for space
  FiLinkedin, // For coach social link
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import Section from "../../components/Section"; // Assuming Section component exists
import GiryaLogo from "../../images/girya-logo.svg"; // Import Girya logo URL
// Assuming aria.jpg is in public/images/coaches/ or similar
// For this example, I'll use a direct path assuming it's in public/images/
const ariaImage = "/images/aria.jpg"; // Path to Aryeh's portrait

// --- Light Earthy Fitness / Mindful Strength Color Palette ---
const colors = {
  background: "bg-stone-100",
  surface: "bg-white",
  surfaceAccent: "bg-emerald-50",
  border: "border-stone-300",
  borderMedium: "border-stone-400", // Slightly darker border for emphasis
  borderAccent: "border-emerald-600/40",
  textPrimary: "text-stone-800",
  textSecondary: "text-stone-600",
  textHighlight: "text-emerald-700",
  textEmphasis: "text-amber-700",
  iconColor: "text-emerald-600",
  buttonPrimaryBg: "bg-emerald-600",
  buttonPrimaryHover: "hover:bg-emerald-700",
  buttonText: "text-white",
  buttonSecondaryBorder: "border-stone-500",
  buttonSecondaryText: "text-stone-700",
  buttonSecondaryHoverBg: "hover:bg-stone-200",
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Reusable Content Block ---
const ContentBlock = ({ icon: Icon, title, children, reverse = false }) => (
  <motion.div
    variants={fadeInUp}
    className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-16`}
  >
    <div className={`md:order-${reverse ? 2 : 1}`}>
      {Icon && (
        <div
          className={`inline-block p-3 mb-3 rounded-lg ${colors.surfaceAccent} border ${colors.borderAccent}`}
        >
          <Icon className={`w-8 h-8 ${colors.textHighlight}`} />
        </div>
      )}
      <h2 className={`text-3xl font-bold ${colors.textPrimary} mb-4`}>
        {title}
      </h2>
      <div
        className={`${colors.textSecondary} text-lg leading-relaxed space-y-4`}
      >
        {children}
      </div>
    </div>
    <div
      className={`md:order-${
        reverse ? 1 : 2
      } aspect-square bg-stone-200 rounded-lg shadow-md border ${
        colors.border
      } flex items-center justify-center`}
    >
      {/* Placeholder for an image - replace with actual images */}
      <FiZap className={`w-24 h-24 ${colors.textSecondary} opacity-30`} />
    </div>
  </motion.div>
);
ContentBlock.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};

// --- Main Girya About Us Page Component ---
export default function GiryaAboutUsPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      {/* Assumes GiryaLayout provides Header & Footer */}
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.background}
          className="relative pt-24 md:pt-36 pb-16 md:pb-20 text-center overflow-hidden"
          ariaLabelledby="girya-about-hero"
        >
          <div className="absolute inset-0 opacity-[4%] bg-[url('/public/images/financial-texture.png')] bg-repeat mix-blend-overlay"></div>
          <motion.div
            className="max-w-3xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-6 rounded-full ${colors.surfaceAccent} border ${colors.borderAccent} shadow-md`}
            >
              <FiHeart className={`w-12 h-12 ${colors.textHighlight}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="girya-about-hero"
              className={`text-4xl sm:text-5xl font-extrabold ${colors.textPrimary} mb-4 leading-tight`}
            >
              Nuestra Esencia:{" "}
              <span className={colors.textHighlight}>
                Fuerza Consciente, Comunidad Unida
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              En Girya, somos más que un gimnasio. Somos un movimiento dedicado
              al desarrollo integral a través de la práctica de Mindful
              Strength, el poder del kettlebell y el apoyo de una comunidad
              vibrante.
            </motion.p>
          </motion.div>
        </Section>

        {/* Our Philosophy: Mindful Strength Section */}
        <Section
          bg={colors.surface}
          className={`py-16 md:py-20 border-y ${colors.border}`}
          ariaLabelledby="philosophy-title"
        >
          <ContentBlock
            icon={FiBookOpen}
            title="Nuestra Filosofía: Mindful Strength"
          >
            <p>
              Mindful Strength es el corazón de Girya. Creemos que el verdadero
              poder no reside solo en la capacidad física, sino en la profunda
              conexión entre mente y cuerpo. Se trata de mover con intención,
              precisión y conciencia, escuchando las señales de tu cuerpo y
              respetando sus límites mientras los expandes de forma segura.
            </p>
            <p>
              Este enfoque te permite construir una fuerza funcional y
              resiliente, mejorar tu movilidad, prevenir lesiones y cultivar una
              mayor presencia y enfoque en cada aspecto de tu vida. No es solo
              entrenamiento; es una práctica para la vida.
            </p>
          </ContentBlock>
        </Section>

        {/* Our Space & Community Section */}
        <Section
          bg={colors.background}
          className="py-16 md:py-20"
          ariaLabelledby="space-community-title"
        >
          <ContentBlock
            icon={FiMapPin}
            title="Nuestro Espacio: Donde la Fuerza Encuentra la Calma"
            reverse={true} // Image on the left for variety
          >
            <p>
              Nuestro gimnasio está diseñado para ser un santuario: un lugar
              donde puedes desconectar del ruido exterior y conectar contigo
              mismo. Priorizamos un ambiente limpio, ordenado y equipado con las
              mejores herramientas para tu práctica de kettlebell y Mindful
              Strength.
            </p>
            <p>
              Más allá del equipamiento, encontrarás una comunidad acogedora y
              solidaria de individuos comprometidos con su bienestar y el de los
              demás. En Girya, cada miembro es valorado y apoyado en su viaje
              personal.
            </p>
            {/* Placeholder for a link to a gallery or virtual tour */}
            <div className="mt-6">
              <Button
                to="#"
                variant="secondary"
                className={`!border-emerald-600/50 !text-emerald-700 hover:!bg-emerald-500/10`}
              >
                Ver Galería de Nuestro Espacio (Próximamente)
              </Button>
            </div>
          </ContentBlock>
        </Section>

        {/* Meet Our Lead Coach Section */}
        <Section
          bg={colors.surfaceAccent}
          className={`py-16 md:py-24 border-y ${colors.border}`}
          ariaLabelledby="team-title"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <FiAward
              className={`w-12 h-12 ${colors.textHighlight} mx-auto mb-4`}
            />
            <h2
              id="team-title"
              className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} mb-3`}
            >
              Conoce a Nuestro Coach Principal
            </h2>
            <p className={`${colors.textSecondary} text-lg`}>
              La guía experta detrás de la metodología Mindful Strength en
              Girya.
            </p>
          </motion.div>

          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={`max-w-md mx-auto ${colors.surface} rounded-2xl shadow-xl overflow-hidden border ${colors.borderMedium}`}
          >
            <div className="relative aspect-[3/4]">
              {" "}
              {/* Portrait aspect ratio */}
              <img
                src={ariaImage} // Using the imported aria.jpg
                alt="Aryeh, Coach Principal de Girya"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            <div className="p-6 text-center">
              <h3 className={`text-2xl font-bold ${colors.textPrimary} mb-1`}>
                Aryeh Halabi
              </h3>
              <p
                className={`text-md font-semibold ${colors.textHighlight} mb-3`}
              >
                Fundador & Coach Principal de Mindful Strength
              </p>
              <p
                className={`${colors.textSecondary} text-sm leading-relaxed mb-4`}
              >
                Con una década de dedicación al arte del kettlebell y la
                exploración de la conciencia corporal, Aryeh es la fuerza motriz
                de Girya. Su pasión es ayudar a otros a descubrir su potencial,
                combinando técnica impecable con un profundo entendimiento del
                movimiento humano.
              </p>
              <Link
                to="/girya/coaches/aryehhalabi" // Placeholder for Aryeh's detailed profile or contact
                className={`inline-flex items-center text-sm font-medium ${colors.textHighlight} hover:underline`}
              >
                Más sobre Aryeh <FiArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </Section>

        {/* Call to Action Section */}
        <Section
          bg={colors.background}
          className="py-20 md:py-24 text-center"
          ariaLabelledby="about-cta-title"
        >
          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
            <img
              src={GiryaLogo}
              alt="Girya Logo"
              className="h-16 w-16 mx-auto mb-6 filter grayscale opacity-60"
            />
            <h2
              id="about-cta-title"
              className={`text-3xl font-bold ${colors.textPrimary} mb-4`}
            >
              ¿Listo para Unirte a Nuestra Comunidad?
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-8`}
            >
              Explora nuestros programas, conoce a nuestros coaches en persona o
              inscríbete para una clase de prueba. Tu viaje hacia una fuerza más
              consciente comienza aquí.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                to="/girya/programs"
                variant="primary"
                size="lg"
                icon={<FiZap />}
                className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-lg hover:shadow-emerald-500/30`}
              >
                Ver Programas
              </Button>
              <Button
                to="/girya/contact"
                variant="secondary"
                size="lg"
                className={`!border-stone-500 !text-stone-700 hover:!bg-stone-200`}
              >
                Contáctanos
              </Button>
            </div>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
GiryaAboutUsPage.propTypes = {};
ContentBlock.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
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
