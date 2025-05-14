// src/pages/Girya/LandingPage.js
// Double Refined Landing Page for Girya.
// Verified color definitions for dark theme in specified sections.
// Uses Earthy Fitness / Mindful Strength Theme.
// Current time: Thursday, May 8, 2025 at 7:30 PM CST.

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiArrowRight,
  FiUsers,
  FiHeart,
  FiZap,
  FiCheckCircle,
  FiTrendingUp,
  FiActivity,
  FiMove,
  FiAnchor,
  FiEye,
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import Section from "../../components/Section";
import GiryaLogo from "../../images/girya-logo.svg";

// --- Earthy Fitness / Mindful Strength Color Palette ---
const colors = {
  background: "bg-stone-900", // DARK
  surface: "bg-stone-800", // DARK
  surfaceMuted: "bg-stone-700/60 backdrop-blur-md", // DARK
  surfaceStrong: "bg-stone-800", // DARK (Used for "Beneficios" section background)
  surfaceLight: "bg-stone-200",
  border: "border-stone-700",
  borderLight: "border-stone-600",
  borderAccent: "border-emerald-600/50",
  textPrimary: "text-stone-100", // LIGHT
  textSecondary: "text-stone-400", // LIGHT
  textDark: "text-stone-800",
  textHighlight: "text-emerald-400", // LIGHT ACCENT
  textEmphasis: "text-amber-400",
  textWhite: "text-stone-100", // LIGHT (Alias for textPrimary for this theme)
  iconColor: "text-emerald-500",
  buttonPrimaryBg: "bg-gradient-to-r from-emerald-600 to-green-700",
  buttonPrimaryHover: "hover:from-emerald-500 hover:to-green-600",
  buttonText: "text-white",
  success: "text-green-400",
  heroGradient: "bg-gradient-to-b from-stone-800 via-stone-900 to-black", // DARK GRADIENT
  tabActiveBg: "bg-emerald-600",
  tabActiveText: "text-white",
  tabInactiveBg: "bg-stone-200",
  tabInactiveText: "text-stone-700",
  tabHoverBg: "hover:bg-emerald-500/20",
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.15 };
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.2) => ({
  visible: { transition: { staggerChildren, delayChildren } },
});
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// --- Mock Program Data ---
const mockPrograms = [
  {
    id: "P001",
    name: "Fundamentos Mindful Kettlebell",
    icon: FiActivity,
    shortDescription:
      "Domina las bases del kettlebell con enfoque en técnica y conexión mente-cuerpo.",
    suitability: "Principiantes",
    duration: "8 Semanas",
    link: "/girya/programs/foundations",
  },
  {
    id: "P002",
    name: "Fuerza y Flujo Avanzado",
    icon: FiZap,
    shortDescription:
      "Lleva tu entrenamiento al siguiente nivel con secuencias complejas y técnicas avanzadas.",
    suitability: "Avanzados",
    duration: "Continuo",
    link: "/girya/programs/advanced",
  },
  {
    id: "P003",
    name: "Entrenamiento Grupal Energizante",
    icon: FiUsers,
    shortDescription:
      "Clases dinámicas que combinan fuerza, cardio y comunidad para una motivación máxima.",
    suitability: "Todos los niveles",
    duration: "Clases sueltas / Paquetes",
    link: "/girya/programs/group",
  },
];

// --- Helper Components (Defined before main export) ---

const HorizontalScrollItem = ({ item, index, scrollXProgress }) => {
  const x = useTransform(
    scrollXProgress,
    [index * 0.2 - 0.1, index * 0.2 + 0.1],
    ["10%", "-10%"],
    { clamp: true }
  );
  return (
    <motion.div
      style={{ x }}
      variants={fadeInUp}
      className={`flex-shrink-0 w-[300px] md:w-[340px] h-full rounded-xl shadow-2xl p-6 md:p-8 ${colors.surfaceMuted} border ${colors.borderAccent} flex flex-col hover:border-emerald-500 transition-colors duration-300`}
    >
      <div
        className={`p-3 rounded-lg bg-stone-700/80 border ${colors.border} self-start mb-4 shadow-inner`}
      >
        <item.icon className={`w-8 h-8 ${colors.textHighlight}`} />
      </div>
      <h3 className={`text-xl font-semibold ${colors.textPrimary} mb-3`}>
        {item.title}
      </h3>
      <p
        className={`${colors.textSecondary} text-sm flex-grow leading-relaxed`}
      >
        {item.description}
      </p>
    </motion.div>
  );
};
HorizontalScrollItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  scrollXProgress: PropTypes.object.isRequired,
};

const HorizontalScrollSection = ({ items }) => {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const dynamicBg = useTransform(
    scrollXProgress,
    [0, 0.33, 0.66, 1],
    [
      colors.background.replace("bg-", ""),
      colors.surface.replace("bg-", ""),
      colors.surfaceStrong?.replace("bg-", "") ||
        colors.surface.replace("bg-", ""),
      colors.background.replace("bg-", ""),
    ]
  );

  return (
    <motion.div
      style={{ backgroundColor: dynamicBg }}
      className="py-16 md:py-24 transition-colors duration-300 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-12 md:mb-16`}
        >
          Pilares de Nuestra Filosofía
        </motion.h2>
      </div>
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-10 scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-transparent cursor-grab active:cursor-grabbing"
      >
        <motion.div
          className="flex gap-6 md:gap-8 px-4 sm:px-6 lg:px-12"
          style={{
            width: `calc(${items.length * 340}px + ${
              items.length * 32
            }px + 300px)`,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.2)}
        >
          <div className="flex-shrink-0 w-[300px] md:w-[340px] flex flex-col items-center justify-center text-center p-6 opacity-70">
            <FiMove
              className={`w-10 h-10 ${colors.textSecondary} mb-4 animate-pulse`}
            />
            <p className={`${colors.textSecondary} text-sm`}>
              Desliza o arrastra para explorar más
            </p>
          </div>
          {items.map((item, index) => (
            <HorizontalScrollItem
              key={index}
              item={item}
              index={index}
              scrollXProgress={scrollXProgress}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
HorizontalScrollSection.propTypes = { items: PropTypes.array.isRequired };

const ProgramCard = React.forwardRef(({ program }, ref) => (
  <motion.div
    ref={ref}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={`flex flex-col ${colors.surface} rounded-xl shadow-lg overflow-hidden border ${colors.borderLight} h-full group transition-all duration-300 hover:shadow-xl hover:border-emerald-400`}
    whileHover={{ y: -5 }}
  >
    <div
      className={`p-5 ${colors.surfaceAccent} border-b ${colors.borderAccent} h-40 flex flex-col items-center justify-center text-center`}
    >
      <program.icon
        className={`w-10 h-10 ${colors.iconColor} mb-2 flex-shrink-0`}
      />
      <h3
        className={`text-xl font-bold ${colors.textPrimary} group-hover:${colors.textHighlight} transition-colors`}
      >
        {program.name}
      </h3>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <p
        className={`${colors.textSecondary} text-sm leading-relaxed mb-3 flex-grow`}
      >
        {program.shortDescription}
      </p>
      <div className={`text-xs ${colors.textSecondary} space-y-1 mb-4`}>
        <p>
          <strong className={colors.textPrimary}>Ideal para:</strong>{" "}
          {program.suitability}
        </p>
        <p>
          <strong className={colors.textPrimary}>Duración:</strong>{" "}
          {program.duration}
        </p>
      </div>
      <div className="mt-auto">
        <Button
          to={program.link}
          variant="secondary"
          size="base"
          className={`w-full !border-emerald-600/50 !text-emerald-700 hover:!bg-emerald-500/10`}
        >
          Más Detalles
        </Button>
      </div>
    </div>
  </motion.div>
));
ProgramCard.displayName = "ProgramCard";
ProgramCard.propTypes = { program: PropTypes.object.isRequired };

const PrincipleItem = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className="flex items-start gap-4 p-4 rounded-lg bg-stone-800/30 hover:bg-stone-700/50 transition-colors"
  >
    <Icon className={`w-7 h-7 ${colors.textHighlight} mt-1 flex-shrink-0`} />
    <div>
      <h4 className={`text-lg font-semibold ${colors.textPrimary}`}>{title}</h4>
      <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
        {description}
      </p>
    </div>
  </motion.div>
);
PrincipleItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const BenefitHighlightCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className={`p-6 rounded-xl shadow-lg h-full ${colors.surfaceMuted} border ${colors.borderAccent} flex flex-col items-center text-center hover:border-emerald-500 transition-all duration-300`}
    whileHover={{ y: -5, scale: 1.01 }}
  >
    <div
      className={`p-4 rounded-full bg-stone-700/70 border ${colors.border} mb-5 shadow-inner`}
    >
      <Icon className={`w-10 h-10 ${colors.textHighlight}`} />
    </div>
    <h3 className={`text-xl font-bold ${colors.textPrimary} mb-2`}>{title}</h3>
    <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
      {description}
    </p>
  </motion.div>
);
BenefitHighlightCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// --- Main Girya Landing Page Component ---
export default function GiryaLandingPage() {
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

  const benefits = [
    {
      icon: FiUsers,
      title: "Comunidad Inclusiva y Motivadora",
      description:
        "Entrena en un ambiente de apoyo y respeto mutuo, donde cada individuo es valorado y alentado a alcanzar sus metas.",
    },
    {
      icon: FiActivity,
      title: "Entrenamiento Funcional Integral",
      description:
        "Desarrolla fuerza, resistencia, movilidad y conciencia corporal aplicables a tu vida diaria, bajo la guía de coaches expertos.",
    },
    {
      icon: FiHeart,
      title: "Filosofía Mindful Strength Única",
      description:
        "Conecta cuerpo y mente, mejorando no solo tu físico sino también tu enfoque, resiliencia y bienestar general.",
    },
  ];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.heroGradient} // Dark gradient background
          className="relative pt-32 md:pt-40 pb-20 md:pb-24 flex items-center justify-center min-h-[85vh] md:min-h-[75vh] text-center overflow-hidden"
          ariaLabelledby="girya-hero-title"
        >
          <div
            className="absolute inset-0 opacity-[3%] bg-[url('/public/images/kettlebells.jpg')] bg-repeat mix-blend-overlay animate-pulse"
            style={{ animationDuration: "20s" }}
          ></div>
          <motion.div
            className="max-w-4xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer()}
          >
            <motion.div variants={scaleUp} className="mb-8">
              <img
                src={GiryaLogo}
                alt="Girya Logo"
                className="h-20 md:h-28 w-auto mx-auto filter drop-shadow-xl animate-[pulse_5s_ease-in-out_infinite]"
              />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="girya-hero-title"
              className={`text-4xl sm:text-5xl md:text-6xl font-extrabold ${colors.textPrimary} mb-5 leading-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]`}
            >
              {" "}
              {/* textPrimary is light */}
              Forja tu Fuerza.{" "}
              <span
                className={`${colors.textHighlight} [text-shadow:0_0_15px_rgba(16,185,129,0.7)]`}
              >
                Encuentra tu Centro.
              </span>{" "}
              {/* textHighlight is light accent */}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto mb-10 leading-relaxed`}
            >
              {" "}
              {/* textSecondary is light */}
              Descubre el poder transformador de Girya y la metodología Mindful
              Strength. Una comunidad dedicada al movimiento consciente y al
              desarrollo integral.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                to="/girya/programs"
                variant="primary"
                size="lg"
                icon={<FiArrowRight />}
                className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-xl hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition-all duration-300 ease-out text-base md:text-lg px-8 py-3.5`}
              >
                Ver Nuestros Programas
              </Button>
              <Button
                to="/girya/contact?subject=GiryaMembershipInquiry"
                variant="secondary"
                size="lg"
                className={`!bg-stone-700/50 !border-stone-500 !text-stone-200 hover:!bg-stone-700 hover:!border-stone-400 backdrop-blur-sm transform hover:-translate-y-0.5 transition-all duration-300 ease-out text-base md:text-lg px-8 py-3.5`}
              >
                Únete a la Comunidad
              </Button>
            </motion.div>
          </motion.div>
        </Section>

        {/* Horizontal Scroll Section - Pillars */}
        <HorizontalScrollSection items={pillars} />

        {/* Mindful Strength Insights Section */}
        <Section
          bg={colors.surface}
          className={`py-16 md:py-24 border-y ${colors.border}`}
          ariaLabelledby="mindful-strength-title"
        >
          {" "}
          {/* surface is dark */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <motion.div variants={fadeInUp} className="md:pr-8">
              <h2
                id="mindful-strength-title"
                className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} mb-6 flex items-center gap-3`}
              >
                <FiHeart className={colors.textHighlight} /> La Metodología
                Mindful Strength
              </h2>{" "}
              {/* textPrimary is light */}
              <p
                className={`${colors.textSecondary} text-lg leading-relaxed mb-4`}
              >
                {" "}
                {/* textSecondary is light */}
                Más que solo levantar pesas, Mindful Strength es una práctica
                que integra cuerpo y mente. Se trata de mover con intención,
                precisión y conciencia, escuchando las señales de tu cuerpo y
                respetando sus límites mientras los expandes de forma segura.
              </p>
              <p className={`${colors.textSecondary} text-lg leading-relaxed`}>
                {" "}
                {/* textSecondary is light */}
                Este enfoque no solo previene lesiones, sino que mejora la
                conexión neuromuscular, la concentración y te permite alcanzar
                tu potencial de forma sostenible y consciente.
              </p>
            </motion.div>
            <motion.div
              variants={staggerContainer(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-6 bg-stone-800/40 p-6 rounded-xl border border-stone-700"
            >
              <h3
                className={`text-xl font-semibold ${colors.textPrimary} mb-1`}
              >
                Principios Clave:
              </h3>{" "}
              {/* textPrimary is light */}
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

        {/* Available Programs Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-20 border-b ${colors.border}`}
          ariaLabelledby="programs-preview-title"
        >
          {" "}
          {/* background is dark */}
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="programs-preview-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textWhite} text-center mb-12 md:mb-16`}
          >
            {" "}
            {/* textWhite is light */}
            Explora Nuestros Programas
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {mockPrograms.slice(0, 3).map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mt-12"
          >
            <Button
              to="/girya/programs"
              variant="secondary"
              size="lg"
              className={`!border-emerald-500/50 !text-emerald-400 hover:!bg-emerald-500/10`}
            >
              Ver Todos los Programas
            </Button>
          </motion.div>
        </Section>

        {/* Refined Benefits Section */}
        <Section
          bg={colors.surfaceStrong}
          className={`py-16 md:py-24 border-y ${colors.border}`}
          ariaLabelledby="girya-benefits-title"
        >
          {" "}
          {/* surfaceStrong is dark */}
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="girya-benefits-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textWhite} text-center mb-12 md:mb-16`}
          >
            {" "}
            {/* textWhite is light */}
            Beneficios de Entrenar en{" "}
            <span className={colors.textHighlight}>Girya</span>{" "}
            {/* textHighlight is light accent */}
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {benefits.map((benefit, index) => (
              <BenefitHighlightCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </motion.div>
        </Section>

        {/* Final CTA */}
        <Section
          bg={colors.background}
          className="py-20 md:py-24 text-center"
          ariaLabelledby="girya-final-cta"
        >
          {" "}
          {/* background is dark */}
          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
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
            </h2>{" "}
            {/* textWhite is light */}
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-8`}
            >
              {" "}
              {/* textSecondary is light */}
              Explora nuestros programas, conoce a nuestros coaches y descubre
              cómo Girya puede transformar tu enfoque hacia el fitness y el
              bienestar.
            </p>
            <Button
              to="/girya/programs"
              variant="primary"
              size="xl"
              icon={<FiArrowRight />}
              className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 ease-out`}
            >
              Descubre Nuestros Programas
            </Button>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
GiryaLandingPage.propTypes = {};
HorizontalScrollItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  scrollXProgress: PropTypes.object.isRequired,
};
PrincipleItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
BenefitHighlightCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
ProgramCard.propTypes = { program: PropTypes.object.isRequired };
// EquipmentCard.propTypes = { item: PropTypes.object.isRequired }; // Not used on this page
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
