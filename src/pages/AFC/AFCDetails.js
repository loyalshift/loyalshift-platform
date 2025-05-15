// src/pages/Afc/ProposalAfcDetailsPage.js
// Detailed proposal page for the "AFC Connect" platform.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 12:50 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiZap, // Energy, Modernization, Platform
  FiUsers, // Community, Members, Coaches
  FiTarget, // Goals, Purpose, Solution
  FiHeart, // Security, Trust
  FiAward, // Workouts, Progress
  FiMessageSquare, // Communication, Hub
  FiCalendar, // Scheduling, Events
  FiTool, // Modules, Structure
  FiTrendingUp, // Growth, Benefits
  FiCheckCircle, // Benefits, Features
  FiArrowRight, // CTA
  FiInfo, // Timestamp
  FiSettings, // Admin Panel
  FiStar, // Analysis
  FiDollarSign, // Recommendation
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import Section from "../../components/Section"; // Assuming Section is styled for light theme or adaptable
// AFC Logo (assuming it's in public/images/)
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.svg";

// --- AFC Color Palette (Light Theme with Red Accents) ---
const colors = {
  background: "bg-slate-50", // Very Light Gray
  surface: "bg-white", // White for cards/sections
  surfaceAccent: "bg-red-50", // Very light red for subtle backgrounds
  textPrimary: "text-slate-900", // Dark Gray/Black for headings
  textSecondary: "text-slate-600", // Medium Gray for body text
  textMuted: "text-slate-500", // Lighter gray for less important text
  accentRed: "text-red-600", // Vibrant Red for AFC
  accentRedDark: "text-red-700",
  accentRedBg: "bg-red-600",
  accentRedBgHover: "hover:bg-red-700",
  border: "border-slate-300", // Standard light border
  borderLight: "border-slate-200",
  borderAccent: "border-red-500/40", // Subtle red accent border
  iconColor: "text-red-600", // Primary icon color
  success: "text-green-600", // Standard success green
  buttonTextLight: "text-white", // Text on primary red button
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
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

// --- Helper Component for Detail/Benefit Items ---
const DetailListItem = ({
  icon: Icon,
  title,
  description,
  iconColorClass = colors.iconColor,
}) => (
  <motion.div
    variants={fadeInUp}
    className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200 hover:shadow-md transition-shadow"
  >
    <div
      className={`flex-shrink-0 p-2.5 rounded-md bg-red-500/10 border border-red-500/20`}
    >
      <Icon className={`w-5 h-5 ${iconColorClass}`} />
    </div>
    <div>
      <h4 className={`text-md font-semibold ${colors.textPrimary} mb-0.5`}>
        {title}
      </h4>
      <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
        {description}
      </p>
    </div>
  </motion.div>
);
DetailListItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColorClass: PropTypes.string,
};

// --- Main AFC Proposal Details Page Component ---
export default function ProposalAfcDetailsPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  const plan = {
    name: "Starter Partner™ para AFC",
    icon: FiStar, // Example icon
    price: "$599", // USD as per request
    frequency: "/mes",
    description:
      "Ideal para implementar y validar flujos de trabajo clave de 'AFC Connect' en un programa piloto enfocado.",
    features: [
      "Portal del Atleta (Funcionalidad MVP)",
      "Soporte para configuración inicial",
      "Acceso a documentación y base de conocimiento",
      "Conexión hasta 2 Sistemas Centrales de AFC",
      "Incluye 5 Asientos de Usuario (Equipo AFC Piloto)",
      "Hasta 50 Ejecuciones de Workflow Automatizado / Mes",
      "Acceso a Dashboard de IA Explicable (XAI) Estándar",
      "Soporte Comunitario y Base de Conocimiento LoyalShift",
      // Add 2-3 more key features relevant to AFC's MVP
    ],
    ctaText: "Discutir Implementación Piloto",
    ctaLink: `/contact-sales?client=afc&topic=StarterPlanPilot&plan=AFCConnectStarter`,
  };

  // Spanish content directly embedded for AFC
  const t = {
    pageTitle: "Propuesta Estratégica: AFC Connect",
    heroHeadline:
      "AFC Connect: <span class='text-red-600'>Tu Centro, Digitalizado y Potenciado</span>",
    heroSubtitle:
      "Una solución integral para elevar la experiencia de tus miembros, optimizar la gestión de coaches y fortalecer la comunidad de Athletic Functional Center.",
    challengeTitle: "El Desafío: Maximizar el Potencial de AFC",
    challengeP1:
      "Athletic Functional Center se destaca por su enfoque en el fitness funcional y su valiosa comunidad en El Tejar, Cartago. Para continuar creciendo y sirviendo mejor a sus miembros, identificamos oportunidades para modernizar la interacción digital y la gestión operativa.",
    challengeNeeds: [
      "Fortalecer la conexión y el compromiso de los miembros más allá de las sesiones presenciales.",
      "Optimizar la administración de clases, reservas y el seguimiento del progreso de los atletas.",
      "Proveer a los entrenadores herramientas digitales eficientes para una planificación y comunicación superior.",
      "Expandir la visibilidad de AFC y atraer nuevos miembros interesados en el fitness funcional.",
      "Crear nuevas vías de valor y posibles fuentes de ingreso a través de una plataforma digital.",
    ],
    solutionTitle: "Nuestra Solución: Plataforma 'AFC Connect'",
    solutionP1:
      "Proponemos el desarrollo de 'AFC Connect', una plataforma digital robusta y amigable, diseñada a la medida de Athletic Functional Center. Construida sobre la tecnología de LoyalShift, esta solución integrará las funciones esenciales para llevar la experiencia AFC al siguiente nivel.",
    modulesTitle: "Módulos Clave de AFC Connect (Propuesta MVP)",
    moduleMemberPortal: {
      title: "Portal del Atleta",
      desc: "Acceso personalizado a perfil, historial de entrenamiento, reserva de clases, seguimiento de progreso (PRs, asistencia) y comunicación directa con coaches.",
      icon: FiUsers,
    },
    moduleCoachTools: {
      title: "Herramientas para Coaches",
      desc: "Panel para gestionar atletas, programar entrenamientos (WODs), registrar marcas, y facilitar la comunicación y feedback individualizado.",
      icon: FiTool,
    },
    moduleClassSchedule: {
      title: "Calendario y Reservas",
      desc: "Sistema interactivo para visualizar horarios de clases, WODs del día, y realizar/cancelar reservas de forma sencilla.",
      icon: FiCalendar,
    },
    moduleCommunityFeed: {
      title: "Muro Comunitario",
      desc: "Espacio para anuncios del centro, retos, compartir logros entre miembros y fomentar la interacción social.",
      icon: FiMessageSquare,
    },
    moduleAdminLite: {
      title: "Gestión Básica (Admin)",
      desc: "Funciones para administrar miembros, clases, y comunicaciones generales (simplificado para MVP).",
      icon: FiSettings,
    },
    benefitsTitle: "Beneficios Tangibles para AFC",
    benefitEngagement: {
      title: "Mayor Compromiso y Retención",
      desc: "Una experiencia digital que mantiene a los miembros conectados y motivados, aumentando la lealtad.",
      icon: FiHeart,
    },
    benefitEfficiency: {
      title: "Operaciones Optimizadas",
      desc: "Reducción de la carga administrativa en reservas y comunicación, liberando tiempo para el coaching.",
      icon: FiZap,
    },
    benefitValue: {
      title: "Propuesta de Valor Mejorada",
      desc: "AFC se posiciona como un centro moderno e innovador, ofreciendo más que solo un espacio físico.",
      icon: FiAward,
    },
    benefitGrowth: {
      title: "Potencial de Crecimiento",
      desc: "Facilita la atracción de nuevos miembros y la posible expansión de servicios digitales a futuro.",
      icon: FiTrendingUp,
    },
    pilotTitle: "Programa Piloto y Siguientes Pasos",
    pilotP1:
      "Recomendamos iniciar con un programa piloto de 2-3 meses con un grupo selecto de miembros y coaches. Esto permitirá validar las funcionalidades clave, recopilar feedback esencial y realizar ajustes finos antes de un lanzamiento completo a toda la comunidad AFC.",
    pilotP2:
      "LoyalShift colaborará estrechamente en la configuración, capacitación y seguimiento durante esta fase crucial para asegurar el éxito.",
    ctaTitle: "Transformemos Juntos Athletic Functional Center",
    ctaSubtitle:
      "Esta plataforma es el siguiente paso para consolidar a AFC como líder en fitness funcional en Cartago. Conversemos sobre cómo hacer realidad 'AFC Connect'.",
    ctaButtonPrimary: "Explorar Plataforma AFC (Visión)",
    ctaButtonSecondary: "Agendar Discusión del Proyecto",
  };

  const platformFeaturesMVP = [
    {
      icon: t.moduleMemberPortal.icon,
      title: t.moduleMemberPortal.title,
      description: t.moduleMemberPortal.desc,
    },
    {
      icon: t.moduleCoachTools.icon,
      title: t.moduleCoachTools.title,
      description: t.moduleCoachTools.desc,
    },
    {
      icon: t.moduleClassSchedule.icon,
      title: t.moduleClassSchedule.title,
      description: t.moduleClassSchedule.desc,
    },
    {
      icon: t.moduleCommunityFeed.icon,
      title: t.moduleCommunityFeed.title,
      description: t.moduleCommunityFeed.desc,
    },
    {
      icon: t.moduleAdminLite.icon,
      title: t.moduleAdminLite.title,
      description: t.moduleAdminLite.desc,
    },
  ];
  const anticipatedBenefits = [
    {
      icon: t.benefitEngagement.icon,
      title: t.benefitEngagement.title,
      description: t.benefitEngagement.desc,
    },
    {
      icon: t.benefitEfficiency.icon,
      title: t.benefitEfficiency.title,
      description: t.benefitEfficiency.desc,
    },
    {
      icon: t.benefitValue.icon,
      title: t.benefitValue.title,
      description: t.benefitValue.desc,
    },
    {
      icon: t.benefitGrowth.icon,
      title: t.benefitGrowth.title,
      description: t.benefitGrowth.desc,
    },
  ];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      {/* This page assumes it's rendered within a layout that provides AFCHeader/Footer if needed */}
      <main>
        {/* Hero Section */}
        <Section
          bg="bg-white" // Light background for hero
          className="relative pt-20 md:pt-28 pb-16 md:pb-20 text-center overflow-hidden border-b border-slate-200"
          ariaLabelledby="afc-proposal-hero"
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
                className="h-16 md:h-20 w-auto mx-auto"
              />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="afc-proposal-hero"
              className={`text-4xl sm:text-5xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
              dangerouslySetInnerHTML={{ __html: t.heroHeadline }}
            />
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-3xl mx-auto mb-6`}
            >
              {t.heroSubtitle}
            </motion.p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                to="/afc" // Link to the AFC Platform Showcase
                variant="primary"
                size="xl"
                icon={<FiArrowRight />}
                // Custom button style for light text on red background
                className={`bg-white text-red-700 hover:bg-slate-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out`}
              >
                {t.ctaButtonPrimary}
              </Button>
            </div>
          </motion.div>
        </Section>

        {/* The Challenge Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-20`}
          ariaLabelledby="challenge-title-afc"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <motion.div variants={fadeInUp}>
              <h2
                id="challenge-title-afc"
                className={`text-3xl font-bold ${colors.textPrimary} mb-6 flex items-center gap-3`}
              >
                <FiTarget className={colors.accentRed} /> {t.challengeTitle}
              </h2>
              <p
                className={`${colors.textSecondary} text-lg leading-relaxed mb-6`}
              >
                {t.challengeP1}
              </p>
              <ul className="space-y-3">
                {t.challengeNeeds.map((need, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FiCheckCircle
                      className={`w-5 h-5 ${colors.accentRed} mt-1 flex-shrink-0`}
                    />
                    <span className={`${colors.textSecondary}`}>{need}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`aspect-video ${colors.surface} rounded-xl border ${colors.border} flex items-center justify-center shadow-lg p-4`}
            >
              <FiUsers className={`w-28 h-28 ${colors.accentRed} opacity-20`} />
            </motion.div>
          </div>
        </Section>

        {/* Proposed Solution & Key Modules Section */}
        <Section
          bg={colors.surface}
          className={`py-16 md:py-20 border-y ${colors.borderLight}`}
          ariaLabelledby="solution-title-afc"
        >
          <motion.h2
            variants={fadeInUp}
            id="solution-title-afc"
            className={`text-3xl font-bold ${colors.textPrimary} text-center mb-6`}
          >
            {t.solutionTitle}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className={`text-lg ${colors.textSecondary} text-center max-w-3xl mx-auto mb-12 md:mb-16`}
          >
            {t.solutionP1}
          </motion.p>
          <motion.h3
            variants={fadeInUp}
            className={`text-2xl font-semibold ${colors.textPrimary} text-center mb-10`}
          >
            {t.modulesTitle}
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {platformFeaturesMVP.map((feature, index) => (
              <DetailListItem
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                iconColorClass={colors.accentRed}
              />
            ))}
          </div>
        </Section>

        {/* Section: Recommended Plan */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-20`}
          ariaLabelledby="recommended-plan-title"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center max-w-3xl mx-auto"
          >
            <FiDollarSign
              className={`w-12 h-12 ${colors.iconColor} mx-auto mb-6`}
            />
            <h2
              id="recommended-plan-title"
              className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} mb-4`}
            >
              Plan de Implementación Recomendado
            </h2>
            <p className={`${colors.textSecondary} text-lg mb-10 md:mb-12`}>
              Para iniciar el proyecto "AFC Connect" y validar su impacto con un
              programa piloto, recomendamos nuestro plan optimizado para socios
              estratégicos:
            </p>
          </motion.div>
          <div className="max-w-lg mx-auto">
            {" "}
            {/* Constrain width of the card */}
            <motion.div
              variants={fadeInUp}
              className={`flex flex-col rounded-xl shadow-2xl overflow-hidden h-full border-2 ${colors.surfaceAccent} ${colors.borderAccent} `}
              // Highlighted border for the recommended plan
            >
              {/* "Recommended" Badge */}
              <div
                className={`w-full px-4 py-1.5 text-sm font-semibold ${colors.accentRedBg} ${colors.buttonTextLight} text-center flex items-center justify-center gap-2`}
              >
                <FiStar className="w-4 h-4" />
                Plan Recomendado para AFC
              </div>

              <div
                className={`p-6 md:p-8 text-center ${colors.surface} flex-grow flex flex-col`}
              >
                {plan.icon && (
                  <plan.icon
                    className={`w-10 h-10 mx-auto mb-4 ${colors.accentRed}`}
                  />
                )}
                <h3 className={`text-2xl font-bold ${colors.textPrimary} mb-2`}>
                  {plan.name}
                </h3>
                <p
                  className={`text-4xl font-extrabold ${
                    colors.accentRedDark || colors.accentRed
                  } mb-1`}
                >
                  {plan.price}
                  {plan.frequency && (
                    <span
                      className={`text-base font-medium ${colors.textSecondary}`}
                    >
                      {plan.frequency}
                    </span>
                  )}
                </p>
                <p
                  className={`${colors.textSecondary} text-sm min-h-[3em] mb-6`}
                >
                  {plan.description}
                </p>

                <div
                  className={`px-2 pb-2 pt-6 border-t ${colors.borderLight} flex-grow`}
                >
                  <h4
                    className={`text-sm font-semibold ${colors.textPrimary} mb-3 text-left`}
                  >
                    Incluye Capacidades Esenciales para el Piloto:
                  </h4>
                  <ul className="space-y-2.5 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheckCircle
                          className={`w-5 h-5 ${colors.success} mr-2.5 mt-0.5 flex-shrink-0`}
                        />
                        <span className={`${colors.textSecondary} text-sm`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={`p-6 md:p-8 mt-auto ${colors.surface}`}>
                {" "}
                {/* Ensure button area has surface bg */}
                <Button
                  to={
                    plan.ctaLink ||
                    "/contact-sales?subject=AFCStarterPlanInquiry"
                  }
                  variant="primary" // This should trigger your primary button style (e.g., red for AFC)
                  size="lg"
                  icon={<FiArrowRight />}
                  className={`w-full ${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover} shadow-lg hover:shadow-red-500/40`}
                >
                  {plan.ctaText || "Iniciar con Plan Starter"}
                </Button>
                <p
                  className={`text-center ${colors.textMuted} text-xs mt-4 italic`}
                >
                  Pagos seguros gestionados por LoyalShift vía Lemon Squeezy.
                  Precios + IVA aplicable.
                </p>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Anticipated Benefits Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-20`}
          ariaLabelledby="benefits-title-afc"
        >
          <motion.h2
            variants={fadeInUp}
            id="benefits-title-afc"
            className={`text-3xl font-bold ${colors.textPrimary} text-center mb-12 md:mb-16`}
          >
            {t.benefitsTitle}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {anticipatedBenefits.map((benefit, index) => (
              <DetailListItem
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                iconColorClass={colors.success}
              />
            ))}
          </div>
        </Section>

        {/* Pilot Program & Next Steps Section */}
        <Section
          bg={colors.surface}
          className={`py-16 md:py-20 border-y ${colors.borderLight}`}
          ariaLabelledby="pilot-title-afc"
        >
          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <FiCalendar
              className={`w-12 h-12 ${colors.iconColor} mx-auto mb-6`}
            />
            <h2
              id="pilot-title-afc"
              className={`text-3xl font-bold ${colors.textPrimary} mb-6`}
            >
              {t.pilotTitle}
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-4`}
            >
              {t.pilotP1}
            </p>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-8`}
            >
              {t.pilotP2}
            </p>
            <Button
              to="/contact-sales?client=afc&topic=pilot-program"
              variant="secondary" // Use secondary style for this CTA
              size="lg"
              icon={<FiMessageSquare />}
              className={`!border-red-500/60 !text-red-600 hover:!bg-red-500/10`} // Custom red outline
            >
              Discutir Programa Piloto
            </Button>
          </motion.div>
        </Section>

        {/* Final CTA Section */}
        <Section
          bg={colors.accentRedBg}
          className={`py-20 md:py-24`}
          ariaLabelledby="afc-cta-title"
        >
          <motion.div
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <img
              src={afcLogoPath}
              alt="AFC Logo"
              className="h-16 w-auto mx-auto mb-6 filter invert brightness-0 "
            />{" "}
            {/* Inverted logo for red bg */}
            <h2
              id="afc-cta-title"
              className={`text-3xl md:text-4xl font-bold ${colors.buttonTextLight} mb-4`}
            >
              {t.ctaTitle}
            </h2>
            <p className={`text-lg text-red-100 mb-10 max-w-2xl mx-auto`}>
              {t.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                to="/afc" // Link to the AFC Platform Showcase
                variant="primary"
                size="xl"
                icon={<FiArrowRight />}
                // Custom button style for light text on red background
                className={`bg-white text-red-700 hover:bg-slate-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out`}
              >
                {t.ctaButtonPrimary}
              </Button>
            </div>
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
ProposalAfcDetailsPage.propTypes = {};
DetailListItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColorClass: PropTypes.string,
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
