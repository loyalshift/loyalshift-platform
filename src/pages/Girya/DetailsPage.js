// src/pages/Girya/ProposalGiryaDetailsPage.js
// Detailed proposal page for the GiryaFlow Digital platform.
// Aims for a "heavy fitness feel" with an earthy, strong theme.
// Current time: Thursday, May 8, 2025 at 5:50 PM CST.

import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiZap, // Energy, Power, Flow
  FiUsers, // Community, Members, Coaches
  FiTarget, // Goals, Purpose, Solution
  FiSettings, // Strength, Foundation, Security (if applicable)
  FiHeart, // Workouts, Progress
  FiMessageSquare, // Communication, Coaching
  FiCalendar, // Scheduling, Events
  FiBookOpen, // Methodology, Library
  FiTrendingUp, // Growth, Benefits
  FiCheckCircle, // Benefits, Features
  FiArrowRight, // CTA
  FiTool, // Coach Tools
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct relative to this file)
import Button from "../../components/Button";
import Section from "../../components/Section"; // Assuming Section is styled for dark theme or adaptable
import LoyalShiftSvgLogo from "../../components/Logo"; // Main LoyalShift Logo
import GiryaLogo from "../../images/girya-logo.svg"; // Import Girya logo URL

// --- Earthy Fitness / Mindful Strength Color Palette ---
const colors = {
  background: "bg-gradient-to-br from-stone-900 via-stone-800 to-black", // Deep, textured dark
  surface: "bg-stone-800/60 backdrop-blur-md", // Slightly transparent cards
  surfaceStrong: "bg-stone-800", // Opaque cards/sections
  border: "border-stone-700",
  borderAccent: "border-emerald-600/50", // Earthy green accent
  textPrimary: "text-stone-100", // Off-white for primary text
  textSecondary: "text-stone-400", // Muted for secondary text
  textHighlight: "text-emerald-400", // Bright, earthy green for highlights
  textEmphasis: "text-amber-400", // A warm accent for emphasis
  iconColor: "text-emerald-500",
  buttonPrimaryBg: "bg-gradient-to-r from-emerald-600 to-green-700",
  buttonPrimaryHover: "hover:from-emerald-500 hover:to-green-600",
  buttonText: "text-white",
  // Add more as needed
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
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
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Helper Component for Feature/Benefit Items ---
const FeatureListItem = ({
  icon: Icon,
  title,
  description,
  iconColorClass = colors.iconColor,
}) => (
  <motion.div variants={fadeInUp} className="flex items-start gap-4">
    <div
      className={`flex-shrink-0 p-3 rounded-lg bg-stone-700/50 border ${colors.border}`}
    >
      <Icon className={`w-6 h-6 ${iconColorClass}`} />
    </div>
    <div>
      <h4 className={`text-lg font-semibold ${colors.textPrimary} mb-1`}>
        {title}
      </h4>
      <p className={`${colors.textSecondary} text-sm`}>{description}</p>
    </div>
  </motion.div>
);
FeatureListItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColorClass: PropTypes.string,
};

// --- Main Girya Proposal Details Page Component ---
export default function ProposalGiryaDetailsPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  const t = {
    // Spanish content directly embedded
    heroHeadline:
      "Forjando Fortaleza Digital: <span class='text-emerald-400'>GiryaFlow Digital</span>",
    heroSubtitle:
      "Una plataforma personalizada para potenciar tu comunidad, coaching y operaciones, arraigada en la metodología Mindful Strength.",
    challengeTitle: "El Desafío: Expandir y Profundizar la Experiencia Girya",
    challengeP1:
      "Girya ha cultivado una comunidad fuerte y una metodología de entrenamiento (Mindful Strength) respetada. El desafío actual es trascender las limitaciones del espacio físico y las interacciones presenciales para ofrecer una experiencia más conectada, eficiente y escalable.",
    challengeNeeds: [
      "Mejorar la participación y conexión de los miembros fuera del gimnasio.",
      "Optimizar la gestión de clases, reservas y seguimiento del progreso.",
      "Empoderar a los coaches con herramientas digitales para una planificación y comunicación superior.",
      "Fortalecer la comunidad y el sentido de pertenencia a través de canales digitales.",
      "Escalar las operaciones y potencialmente alcanzar una audiencia más amplia con contenido digital.",
    ],
    solutionTitle: "Nuestra Solución: Plataforma GiryaFlow Digital",
    solutionP1:
      "Proponemos la creación de 'GiryaFlow Digital', una plataforma web y móvil integral, diseñada a la medida de Girya. Esta solución se construirá sobre la base tecnológica robusta y adaptable de LoyalShift, enfocada en la experiencia del usuario y la eficiencia operativa.",
    modulesTitle: "Módulos Clave Propuestos (Fase MVP)",
    moduleMemberPortal: {
      title: "Portal de Miembros",
      desc: "Acceso personalizado a perfiles, progreso, calendario de clases, biblioteca de recursos Mindful Strength e inscripción a eventos.",
      icon: FiUsers,
    },
    moduleCoachDashboard: {
      title: "Panel de Coaches",
      desc: "Herramientas para gestión de clientes, creación/asignación de programas, seguimiento individualizado y comunicación directa.",
      icon: FiTool,
    },
    moduleCommunityHub: {
      title: "Centro Comunitario",
      desc: "Foros de discusión, anuncios de talleres/eventos, y espacios para compartir logros y motivación.",
      icon: FiMessageSquare,
    },
    moduleAdminPanel: {
      title: "Panel Administrativo",
      desc: "Gestión de membresías, horarios, contenido de la biblioteca y comunicaciones generales (simplificado en MVP).",
      icon: FiSettings,
    }, // Added FiSettings
    benefitsTitle: "Impacto y Beneficios Anticipados",
    benefitRetention: {
      title: "Mayor Retención de Miembros",
      desc: "Experiencia continua y personalizada que fomenta la lealtad.",
      icon: FiHeart,
    },
    benefitCoaching: {
      title: "Coaching Elevado",
      desc: "Herramientas que permiten un seguimiento detallado y planes adaptativos.",
      icon: FiTrendingUp,
    },
    benefitCommunity: {
      title: "Comunidad Fortalecida",
      desc: "Interacción constante y apoyo mutuo, extendiendo el espíritu Girya al mundo digital.",
      icon: FiUsers,
    },
    benefitEfficiency: {
      title: "Operaciones Optimizadas",
      desc: "Reducción de carga administrativa, permitiendo más enfoque en el coaching y la comunidad.",
      icon: FiZap,
    },
    pilotTitle: "Programa Piloto y Próximos Pasos",
    pilotP1:
      "Proponemos un lanzamiento piloto de 3-4 meses con un grupo selecto de miembros y coaches para validar la funcionalidad central, recopilar retroalimentación invaluable y refinar la plataforma antes de un lanzamiento completo.",
    pilotP2:
      "Colaboraremos estrechamente para definir los KPIs del piloto y asegurar una transición fluida.",
    ctaTitle: "Construyamos Juntos la Evolución Digital de Girya",
    ctaSubtitle:
      "Esta es una oportunidad para llevar la filosofía Mindful Strength de Girya a nuevas alturas, creando una experiencia digital que refleje su excelencia y compromiso.",
    ctaButtonPrimary: "Agendar Discusión Estratégica",
    ctaButtonSecondary: "Solicitar Más Información",
  };

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      {/* This page assumes it's rendered within GiryaLayout which provides Header/Footer */}
      <main>
        {/* Hero Section */}
        <Section
          bg="bg-transparent"
          className="pt-24 md:pt-32 pb-16 md:pb-20 min-h-[calc(100vh-100px)] flex items-center justify-center"
          ariaLabelledby="girya-proposal-hero"
        >
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-6 rounded-full ${colors.surfaceStrong} border ${colors.borderAccent} shadow-lg`}
            >
              <img src={GiryaLogo} alt="Girya Logo" className="h-12 w-12" />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="girya-proposal-hero"
              className={`text-4xl md:text-5xl font-bold ${colors.textWhite} mb-4 [text-shadow:0_0_12px_rgba(34,197,94,0.5)]`}
              dangerouslySetInnerHTML={{ __html: t.heroHeadline }}
            />
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto mb-8`}
            >
              {t.heroSubtitle}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                to="/girya"
                variant="primary"
                size="lg"
                icon={<FiArrowRight />}
                className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText}`}
              >
                Explorar la Propuesta
              </Button>
            </motion.div>
          </motion.div>
        </Section>

        {/* The Challenge Section */}
        <Section
          bg={colors.surfaceStrong}
          className={`border-y ${colors.border}`}
          ariaLabelledby="challenge-title"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <h2
                id="challenge-title"
                className={`text-3xl font-bold ${colors.textWhite} mb-6 flex items-center gap-3`}
              >
                <FiTarget className={colors.textHighlight} /> {t.challengeTitle}
              </h2>
              <p
                className={`${colors.textSecondary} text-lg leading-relaxed mb-4`}
              >
                {t.challengeP1}
              </p>
              <ul className="space-y-2">
                {t.challengeNeeds.map((need, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FiCheckCircle
                      className={`w-5 h-5 ${colors.textHighlight} mt-1 flex-shrink-0`}
                    />
                    <span className={`${colors.textSecondary}`}>{need}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`aspect-[3/4] ${colors.surface} rounded-lg border ${colors.borderAccent} flex items-center justify-center shadow-xl p-4`}
            >
              {/* Placeholder for an image representing community/challenge */}
              <img
                src={"/images/warrior.png"}
                alt="Extreme God Warrior"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </motion.div>
          </div>
        </Section>

        {/* Proposed Solution Section */}
        <Section bg="bg-transparent" ariaLabelledby="solution-title">
          <motion.h2
            variants={fadeInUp}
            id="solution-title"
            className={`text-3xl font-bold ${colors.textWhite} text-center mb-6`}
          >
            {t.solutionTitle}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className={`text-lg ${colors.textSecondary} text-center max-w-3xl mx-auto mb-12`}
          >
            {t.solutionP1}
          </motion.p>

          <motion.h3
            variants={fadeInUp}
            className={`text-2xl font-semibold ${colors.textPrimary} text-center mb-10`}
          >
            {t.modulesTitle}
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <FeatureListItem
              icon={t.moduleMemberPortal.icon}
              title={t.moduleMemberPortal.title}
              description={t.moduleMemberPortal.desc}
              iconColorClass={colors.textHighlight}
            />
            <FeatureListItem
              icon={t.moduleCoachDashboard.icon}
              title={t.moduleCoachDashboard.title}
              description={t.moduleCoachDashboard.desc}
              iconColorClass={colors.textHighlight}
            />
            <FeatureListItem
              icon={t.moduleCommunityHub.icon}
              title={t.moduleCommunityHub.title}
              description={t.moduleCommunityHub.desc}
              iconColorClass={colors.textHighlight}
            />
            <FeatureListItem
              icon={t.moduleAdminPanel.icon}
              title={t.moduleAdminPanel.title}
              description={t.moduleAdminPanel.desc}
              iconColorClass={colors.textHighlight}
            />
          </div>
        </Section>

        {/* Anticipated Benefits Section */}
        <Section
          bg={colors.surfaceStrong}
          className={`border-y ${colors.border}`}
          ariaLabelledby="benefits-title"
        >
          <motion.h2
            variants={fadeInUp}
            id="benefits-title"
            className={`text-3xl font-bold ${colors.textWhite} text-center mb-12`}
          >
            {t.benefitsTitle}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <FeatureListItem
              icon={t.benefitRetention.icon}
              title={t.benefitRetention.title}
              description={t.benefitRetention.desc}
              iconColorClass={colors.accentGreen}
            />
            <FeatureListItem
              icon={t.benefitCoaching.icon}
              title={t.benefitCoaching.title}
              description={t.benefitCoaching.desc}
              iconColorClass={colors.accentGreen}
            />
            <FeatureListItem
              icon={t.benefitCommunity.icon}
              title={t.benefitCommunity.title}
              description={t.benefitCommunity.desc}
              iconColorClass={colors.accentGreen}
            />
            <FeatureListItem
              icon={t.benefitEfficiency.icon}
              title={t.benefitEfficiency.title}
              description={t.benefitEfficiency.desc}
              iconColorClass={colors.accentGreen}
            />
          </div>
        </Section>

        {/* Pilot Program & Next Steps Section */}
        <Section bg="bg-transparent" ariaLabelledby="pilot-title">
          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <FiCalendar
              className={`w-10 h-10 ${colors.iconColor} mx-auto mb-4`}
            />
            <h2
              id="pilot-title"
              className={`text-3xl font-bold ${colors.textWhite} mb-6`}
            >
              {t.pilotTitle}
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-4`}
            >
              {t.pilotP1}
            </p>
            <p className={`${colors.textSecondary} text-lg leading-relaxed`}>
              {t.pilotP2}
            </p>
          </motion.div>
        </Section>

        {/* Final CTA Section */}
        <Section
          bg={colors.surfaceStrong}
          className={`border-t ${colors.border}`}
          ariaLabelledby="girya-cta-title"
        >
          <motion.div
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <img
              src={GiryaLogo}
              alt="Girya Logo"
              className="h-16 w-16 mx-auto mb-6 filter grayscale brightness-200 contrast-150"
            />
            <h2
              id="girya-cta-title"
              className={`text-3xl font-bold ${colors.textWhite} mb-4`}
            >
              {t.ctaTitle}
            </h2>
            <p className={`text-lg ${colors.textSecondary} mb-8`}>
              {t.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                to="/contact-sales?client=girya&topic=giryaflow-implementation"
                variant="primary"
                size="lg"
                icon={<FiArrowRight />}
                className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-lg hover:shadow-emerald-500/40`}
              >
                {t.ctaButtonPrimary}
              </Button>
              <Button
                to="/contact?subject=GiryaFlowInquiry"
                variant="secondary"
                size="lg"
                className={`!border-emerald-500/50 !text-emerald-400 hover:!bg-emerald-500/10`}
              >
                {t.ctaButtonSecondary}
              </Button>
            </div>
          </motion.div>
        </Section>

        {/* Timestamp Info */}
        <p
          className={`relative z-10 text-center text-sm ${colors.textSecondary} mt-12 pb-12 flex items-center justify-center gap-1.5`}
        ></p>
      </main>
    </div>
  );
}

// --- PropTypes ---
ProposalGiryaDetailsPage.propTypes = {};
FeatureListItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColorClass: PropTypes.string,
};
// Assuming Section and Button components define their own PropTypes.
