// src/pages/Girya/DemoCTA.js
// Dedicated Call to Action page for Girya after viewing their demo/proposal.
// REFINED: Redesigned LoyalShiftBenefitCard for better visual appeal.
// Uses Earthy Fitness / Mindful Strength Theme for Girya, LoyalShift branding for its CTAs and benefit cards.
// Current time: Tuesday, May 13, 2025 at 3:55 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiArrowRight,
  FiZap,
  FiUsers,
  FiMessageSquare,
  FiCheckCircle,
  FiAward,
  FiTarget,
  FiInfo,
  FiCpu,
  FiShield,
  FiTrendingUp,
  FiCalendar,
  FiThumbsUp,
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import Section from "../../components/Section";
import LoyalShiftSvgLogo from "../../components/Logo"; // LoyalShift Logo
import GiryaLogo from "../../images/girya-logo.svg";

// --- Color Palette ---
const colors = {
  // Girya Theme
  background: "bg-gradient-to-br from-stone-900 via-black to-stone-900",
  surface: "bg-stone-800",
  surfaceMuted: "bg-stone-700/60 backdrop-blur-md",
  surfaceStrong: "bg-stone-800",
  border: "border-stone-700",
  borderAccentGirya: "border-emerald-600/60", // Girya's accent border
  textPrimary: "text-stone-100",
  textSecondary: "text-stone-400",
  textHighlightGirya: "text-emerald-400",
  iconColorGirya: "text-emerald-500",

  // LoyalShift Theme elements
  loyalShiftBlue: "#60a5fa",
  loyalShiftCyan: "#93c5fd",
  loyalShiftButtonBg: "bg-gradient-to-r from-blue-600 to-cyan-500",
  loyalShiftButtonHover: "hover:from-blue-500 hover:to-cyan-400",
  loyalShiftButtonText: "text-white",
  loyalShiftAccentText: "text-blue-400", // For icons and text highlights
  loyalShiftCardBg: "bg-slate-800", // Distinct card background for LS benefits
  loyalShiftCardBorder: "border-slate-700",
  loyalShiftCardBorderHover: "hover:border-blue-500/50",
  loyalShiftIconBg: "bg-gradient-to-br from-blue-600/30 to-cyan-500/30", // Gradient for icon background
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
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

// --- LoyalShift Benefit Card Component (Refined Design) ---
const LoyalShiftBenefitCard = ({ text, icon: Icon }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex flex-col items-center text-center p-6 rounded-xl 
                    ${colors.loyalShiftCardBg} border ${colors.loyalShiftCardBorder} 
                    shadow-xl hover:shadow-blue-500/20 ${colors.loyalShiftCardBorderHover} 
                    transition-all duration-300 ease-in-out h-full`} // Ensure cards take full height in grid
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div
      className={`p-4 mb-5 rounded-full ${colors.loyalShiftIconBg} shadow-lg`}
    >
      <Icon className={`w-8 h-8 ${colors.loyalShiftAccentText}`} />
    </div>
    <p
      className={`${colors.textPrimary} text-base font-semibold leading-relaxed`}
    >
      {text}
    </p>
  </motion.div>
);
LoyalShiftBenefitCard.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

// --- Next Step Item Component ---
const NextStepItem = ({ number, title, description, icon: Icon }) => (
  <motion.div variants={fadeInUp} className="flex items-start gap-4">
    <div
      className={`flex-shrink-0 w-10 h-10 rounded-full ${colors.textHighlightGirya} bg-emerald-500/10 border-2 ${colors.borderAccentGirya} flex items-center justify-center text-lg font-bold`}
    >
      {number}
    </div>
    <div className="pt-0.5">
      <h4
        className={`text-lg font-semibold ${colors.textPrimary} mb-1 flex items-center`}
      >
        {Icon && (
          <Icon
            className={`w-5 h-5 mr-2 ${colors.textHighlightGirya} opacity-90`}
          />
        )}{" "}
        {title}
      </h4>
      <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
        {description}
      </p>
    </div>
  </motion.div>
);
NextStepItem.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
};

// --- Main Girya Demo CTA Page Component ---
export default function GiryaDemoCTA() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  const loyalshiftBenefits = [
    { text: "Tecnología IA Probada y Explicable", icon: FiCpu },
    { text: "Plataforma Segura y Escalable para Crecer", icon: FiShield },
    { text: "Experiencia en Integración de Sistemas Complejos", icon: FiZap },
    { text: "Soporte Dedicado y Enfoque Colaborativo", icon: FiUsers },
    {
      text: "Resultados Medibles y Retorno de Inversión Claro",
      icon: FiTrendingUp,
    },
  ];

  const nextStepsForGirya = [
    {
      number: 1,
      icon: FiMessageSquare,
      title: "Discusión Estratégica Profunda",
      description:
        "Agendemos una llamada para alinear la visión de GiryaFlow Digital con sus objetivos de negocio y expectativas de la comunidad.",
    },
    {
      number: 2,
      icon: FiTarget,
      title: "Definición del Alcance del Piloto",
      description:
        "Colaboremos para definir los KPIs, funcionalidades clave y el grupo de usuarios para un programa piloto exitoso.",
    },
    {
      number: 3,
      icon: FiCalendar,
      title: "Plan de Implementación y Cronograma",
      description:
        "Estableceremos un plan de trabajo detallado con hitos claros para el desarrollo y lanzamiento del MVP.",
    },
    {
      number: 4,
      icon: FiZap,
      title: "Inicio del Desarrollo de GiryaFlow",
      description:
        "Nuestro equipo comenzará la configuración y personalización de la plataforma para dar vida a GiryaFlow Digital.",
    },
  ];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section */}
        <Section
          bg="bg-transparent"
          className="relative pt-28 md:pt-40 pb-16 md:pb-20 text-center overflow-hidden min-h-[75vh] flex flex-col justify-center"
          ariaLabelledby="girya-cta-hero-title"
        >
          <div
            className="absolute inset-0 opacity-[2%] bg-[url('/public/images/kettlebells.jpg')] bg-repeat mix-blend-overlay animate-pulse"
            style={{ animationDuration: "25s" }}
          ></div>
          <motion.div
            className="max-w-3xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer()}
          >
            <motion.div
              variants={scaleUp}
              className="mb-8 flex items-center justify-center gap-5"
            >
              <img
                src={GiryaLogo}
                alt="Girya Logo"
                className="h-16 md:h-20 w-auto filter drop-shadow-lg"
              />
              <FiArrowRight
                className={`w-10 h-10 ${colors.textSecondary} opacity-60`}
              />
              <div className="p-2 rounded-lg bg-slate-700/50 border border-slate-600 shadow-md">
                <LoyalShiftSvgLogo
                  height="48"
                  loyalColor={colors.loyalShiftBlue}
                  shiftColor={colors.loyalShiftCyan}
                />
              </div>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="girya-cta-hero-title"
              className={`text-4xl sm:text-5xl font-extrabold ${colors.textWhite} mb-5 leading-tight [text-shadow:0_0_15px_rgba(16,185,129,0.6)]`}
            >
              Transformemos{" "}
              <span className={colors.textHighlightGirya}>Girya</span> Juntos
              con <span className={colors.textHighlightGirya}>LoyalShift</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto mb-10`}
            >
              Ha explorado la visión de GiryaFlow Digital. Ahora, demos el
              siguiente paso para convertir esa visión en una realidad tangible
              que potenciará su comunidad y operaciones.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                to="/contact-sales?client=girya&topic=giryaflow-implementation-strategy"
                variant="primary"
                size="xl"
                icon={<FiMessageSquare />}
                className={`${colors.loyalShiftButtonBg} ${colors.loyalShiftButtonHover} ${colors.loyalShiftButtonText} shadow-xl hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300 ease-out`}
              >
                Agendar Llamada Estratégica con LoyalShift
              </Button>
            </motion.div>
          </motion.div>
        </Section>

        {/* Why Partner with LoyalShift Section */}
        <Section
          bg={colors.surfaceStrong}
          className={`py-16 md:py-24 border-y ${colors.border}`}
          ariaLabelledby="why-loyalshift-title"
        >
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer()}
          >
            <FiAward
              className={`w-12 h-12 ${colors.textHighlightGirya} mx-auto mb-4`}
            />
            <h2
              id="why-loyalshift-title"
              className={`text-3xl md:text-4xl font-bold ${colors.textWhite} mb-6`}
            >
              La Ventaja{" "}
              <span className={colors.textHighlightGirya}>LoyalShift</span> para
              Girya
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-12 md:mb-16 max-w-3xl mx-auto`}
            >
              Al asociarse con LoyalShift, Girya no solo obtiene una plataforma
              digital; accede a un socio tecnológico comprometido con su éxito,
              aportando experiencia probada, innovación constante y un enfoque
              profundamente colaborativo.
            </p>
            {/* UPDATED: Grid for LoyalShiftBenefitCard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {" "}
              {/* items-stretch for equal height */}
              {loyalshiftBenefits.map((benefit) => (
                <LoyalShiftBenefitCard
                  key={benefit.text}
                  text={benefit.text}
                  icon={benefit.icon}
                />
              ))}
            </div>
          </motion.div>
        </Section>

        {/* Next Steps Section */}
        <Section
          bg={colors.background}
          className="py-16 md:py-20"
          ariaLabelledby="next-steps-title"
        >
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer()}
          >
            <FiTarget
              className={`w-12 h-12 ${colors.textHighlightGirya} mx-auto mb-4`}
            />
            <h2
              id="next-steps-title"
              className={`text-3xl md:text-4xl font-bold ${colors.textWhite} mb-6`}
            >
              Próximos Pasos para GiryaFlow Digital
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-10 md:mb-12`}
            >
              Estamos listos para profundizar en los detalles y alinear nuestra
              propuesta con sus prioridades estratégicas. Sugerimos los
              siguientes pasos claros y colaborativos:
            </p>
            <div
              className={`space-y-8 p-6 md:p-8 rounded-xl ${colors.surface} border ${colors.borderAccentGirya} shadow-lg`}
            >
              {nextStepsForGirya.map((step) => (
                <NextStepItem
                  key={step.number}
                  number={step.number}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
            <div className="mt-12">
              <Button
                to="/contact-sales?client=girya&topic=giryaflow-next-steps"
                variant="primary"
                size="lg"
                icon={<FiCalendar />}
                className={`${colors.loyalShiftButtonBg} ${colors.loyalShiftButtonHover} ${colors.loyalShiftButtonText} shadow-lg`}
              >
                Programar Reunión de Seguimiento
              </Button>
            </div>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
GiryaDemoCTA.propTypes = {};
LoyalShiftBenefitCard.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};
NextStepItem.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
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
