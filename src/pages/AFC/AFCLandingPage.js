// src/pages/Afc/AFCLandingPage.js
// Showcase landing page for the envisioned "AFC Connect" platform.
// UPDATED: Final CTA revised to be from AFC's perspective to its users.
// Features a hero, horizontal scroll for pillars, and program highlights.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 1:35 PM CST.

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiUsers,
  FiHeart,
  FiZap,
  FiTarget,
  FiTrendingUp,
  FiMove,
  FiInfo,
  FiAward,
  FiTool,
  FiActivity,
  FiCalendar,
  FiBookOpen,
  FiArrowRight,
  FiBarChart2,
  FiShield,
  FiThumbsUp,
  FiPlayCircle,
  FiLayout,
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import Section from "../../components/Section";
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.svg";

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
  success: "text-green-600",
  buttonTextLight: "text-white",
  scrollBgStart: "#f8fafc",
  scrollBgMid: "#fee2e2",
  scrollBgEnd: "#f1f5f9",
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

// --- Horizontal Scroll Section Component ---
const HorizontalScrollSection = ({ items, sectionTitle, sectionSubtitle }) => {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const backgroundColor = useTransform(
    scrollXProgress,
    [0, 0.5, 1],
    [colors.scrollBgStart, colors.scrollBgMid, colors.scrollBgEnd]
  );

  return (
    <motion.div
      style={{ backgroundColor }}
      className={`py-16 md:py-24 transition-colors duration-300 ease-in-out overflow-hidden ${colors.background}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} mb-3`}
          >
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className={`text-lg ${colors.textSecondary} max-w-2xl mx-auto`}>
              {sectionSubtitle}
            </p>
          )}
        </motion.div>
      </div>
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-10 scrollbar-thin scrollbar-thumb-slate-400/50 scrollbar-track-transparent scrollbar-thumb-rounded-full"
      >
        <motion.div
          className="flex gap-6 md:gap-8 px-4 sm:px-6 lg:px-12"
          style={{
            width: `calc(${items.length * 280}px + ${
              items.length * 24
            }px + 280px)`,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.15)}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`flex-shrink-0 w-[260px] md:w-[300px] h-full rounded-xl shadow-xl p-6 md:p-8 ${colors.surface} border ${colors.borderLight} flex flex-col hover:border-red-300 transition-all duration-300 ease-in-out`}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
            >
              <div
                className={`p-3 rounded-lg ${colors.accentRedBg} self-start mb-4 shadow-md`}
              >
                <item.icon className={`w-7 h-7 ${colors.buttonTextLight}`} />
              </div>
              <h3
                className={`text-xl font-semibold ${colors.textPrimary} mb-2`}
              >
                {item.title}
              </h3>
              <p
                className={`${colors.textSecondary} text-sm flex-grow leading-relaxed`}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-[260px] md:w-[300px] flex flex-col items-center justify-center text-center p-6 opacity-70">
            <FiMove
              className={`w-10 h-10 ${colors.textSecondary} mb-4 animate-pulse`}
              style={{ animationDuration: "2s" }}
            />
            <p className={`${colors.textSecondary} text-sm font-medium`}>
              Desliza para explorar
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
HorizontalScrollSection.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  sectionTitle: PropTypes.string.isRequired,
  sectionSubtitle: PropTypes.string,
};

// --- Program Highlight Card Component ---
const ProgramHighlightCard = ({
  icon: Icon,
  title,
  description,
  link = "#",
}) => (
  <motion.div
    variants={fadeInUp}
    className={`flex flex-col p-6 rounded-xl shadow-lg h-full ${colors.surface} border ${colors.borderLight} hover:shadow-xl hover:border-red-400/70 transition-all duration-300 group`}
    whileHover={{ y: -5 }}
  >
    <div
      className={`p-3 rounded-lg ${colors.accentRedBg} self-start mb-4 shadow-md`}
    >
      <Icon className={`w-8 h-8 ${colors.buttonTextLight}`} />
    </div>
    <h3 className={`text-xl font-semibold ${colors.textPrimary} mb-3`}>
      {title}
    </h3>
    <p
      className={`${colors.textSecondary} text-sm flex-grow leading-relaxed mb-5`}
    >
      {description}
    </p>
    <div className="mt-auto">
      <Link
        to={link}
        className={`inline-flex items-center text-sm font-medium ${colors.accentRed} hover:${colors.accentRedDark} group-hover:underline`}
      >
        Más Detalles{" "}
        <FiArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  </motion.div>
);
ProgramHighlightCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string,
};

// --- Main AFC "Platform" Landing Page Component ---
export default function AFCLandingPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  const platformPillars = [
    {
      icon: FiZap,
      title: "Entrenamiento Funcional 360°",
      description:
        "Programas y seguimientos diseñados para maximizar tu potencial físico de forma segura y efectiva, adaptados a tus metas individuales.",
    },
    {
      icon: FiUsers,
      title: "Comunidad Activa y Conectada",
      description:
        "Únete a retos, comparte tus logros y mantente motivado con el apoyo constante de coaches y compañeros de AFC.",
    },
    {
      icon: FiBarChart2,
      title: "Progreso Personalizado y Medible",
      description:
        "Visualiza tu avance, registra tus marcas personales (PRs) y ajusta tus objetivos con herramientas de seguimiento claras y fáciles de usar.",
    },
    {
      icon: FiHeart,
      title: "Bienestar Integral",
      description:
        "Accede a recursos sobre movilidad, recuperación activa y nutrición consciente para complementar tu entrenamiento y cuidar tu cuerpo de forma holística.",
    },
  ];

  const featuredPrograms = [
    {
      icon: FiActivity,
      title: "Fundamentos AFC",
      description:
        "Domina la técnica esencial del entrenamiento funcional y kettlebell. Perfecto para iniciar tu transformación y construir una base sólida.",
      link: "/afc/programs/foundations",
    },
    {
      icon: FiTrendingUp,
      title: "Rendimiento Avanzado",
      description:
        "Para atletas experimentados que buscan desafíar sus límites con programaciones intensas, especializadas y enfocadas en resultados.",
      link: "/afc/programs/advanced",
    },
    {
      icon: FiShield,
      title: "Mindful Strength Workshop",
      description:
        "Explora la conexión mente-cuerpo y aprende a entrenar con mayor conciencia, propósito y prevención de lesiones.",
      link: "/afc/workshops/mindful-strength",
    },
  ];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section for AFC Connect */}
        <Section
          bg={colors.surface}
          className="relative pt-24 md:pt-32 pb-16 md:pb-20 text-center overflow-hidden border-b ${colors.borderLight}"
          ariaLabelledby="afc-platform-hero"
        >
          <motion.div
            className="max-w-3xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer()}
          >
            <motion.div variants={scaleUp} className="mb-6">
              <img
                src={afcLogoPath}
                alt="AFC Logo"
                className="h-16 md:h-20 w-auto mx-auto"
              />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="afc-platform-hero"
              className={`text-4xl sm:text-5xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
            >
              Bienvenido a <span className={colors.accentRed}>AFC Connect</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto mb-8`}
            >
              Tu centro de entrenamiento funcional, ahora con una experiencia
              digital mejorada. Gestiona tus clases, sigue tu progreso y conecta
              con nuestra comunidad.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                to="/afc/programs"
                variant="primary"
                size="lg"
                icon={<FiAward />}
                className={`${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover} shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
              >
                Explorar Programas
              </Button>
              <Button
                to="/afc/schedule"
                variant="secondary"
                size="lg"
                className={`!bg-slate-100 !border-slate-300 !text-slate-700 hover:!bg-slate-200 hover:!border-slate-400`}
              >
                Ver Horario de Clases
              </Button>
            </motion.div>
          </motion.div>
        </Section>

        {/* Horizontal Scroll Section for Pillars */}
        <HorizontalScrollSection
          items={platformPillars}
          sectionTitle="Pilares de AFC Connect"
          sectionSubtitle="Nuestra plataforma digital se construye sobre estos principios fundamentales."
        />

        {/* Featured Programs/Classes Section */}
        <Section
          bg={colors.surface}
          className={`py-16 md:py-24 border-y ${colors.borderLight}`}
          ariaLabelledby="featured-programs-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="featured-programs-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-12 md:mb-16`}
          >
            Programas y Talleres Destacados
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch"
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {featuredPrograms.map((program, index) => (
              <ProgramHighlightCard
                key={index}
                icon={program.icon}
                title={program.title}
                description={program.description}
                link={program.link}
              />
            ))}
          </motion.div>
        </Section>

        {/* Final CTA - REVISED to be from AFC's perspective */}
        <Section
          bg={colors.accentRedBg}
          className="py-20 md:py-24 text-center"
          ariaLabelledby="afc-join-cta"
        >
          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
            <FiUsers
              className={`w-12 h-12 ${colors.buttonTextLight} mx-auto mb-6 opacity-90`}
            />{" "}
            {/* Changed icon */}
            <h2
              id="afc-join-cta"
              className={`text-3xl font-bold ${colors.buttonTextLight} mb-4`}
            >
              ¿Listo para Unirte a la Familia AFC?
            </h2>{" "}
            {/* Revised Headline */}
            <p className={`text-lg text-red-100 mb-8 max-w-xl mx-auto`}>
              Descubre nuestros planes de membresía, conoce a nuestros coaches y
              da el primer paso hacia una versión más fuerte y consciente de ti
              mismo.
            </p>{" "}
            {/* Revised Paragraph */}
            <Button
              to="/afc/enroll" // Link to AFC's enrollment/membership page
              variant="primary"
              size="xl"
              icon={<FiArrowRight />}
              className={`bg-white text-red-700 hover:bg-slate-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all`}
            >
              Ver Planes de Membresía
            </Button>{" "}
            {/* Revised Button Text & Link */}
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
AFCLandingPage.propTypes = {};
HorizontalScrollSection.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  sectionTitle: PropTypes.string.isRequired,
  sectionSubtitle: PropTypes.string,
};
ProgramHighlightCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string,
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
