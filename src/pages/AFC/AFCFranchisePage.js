// src/pages/Afc/AFCFranchisePage.js
// Page detailing the franchise opportunity for Athletic Functional Center (AFC).
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 2:15 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiAward, // Brand, Quality
  FiUsers, // Community, Franchisees, Team
  FiTrendingUp, // Growth, Opportunity
  FiDollarSign, // Investment, ROI
  FiCheckCircle, // Benefits, Requirements
  FiArrowRight, // CTA
  FiTarget, // Territory
  FiBookOpen, // Systems, Manuals
  FiTool, // Support, Operations
  FiInfo, // Timestamp
  FiShield, // Proven Model, Security
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import Section from "../../components/Section"; // Assuming Section is styled for light theme or adaptable
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
  success: "text-green-600",
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

// --- Helper Component for Franchise Benefit/Feature Items ---
const FranchiseBenefitItem = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className="flex flex-col items-center text-center p-6 rounded-lg bg-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow"
  >
    <div
      className={`p-3 mb-4 rounded-full bg-red-500/10 border border-red-500/20`}
    >
      <Icon className={`w-8 h-8 ${colors.accentRed}`} />
    </div>
    <h3 className={`text-xl font-semibold ${colors.textPrimary} mb-2`}>
      {title}
    </h3>
    <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
      {description}
    </p>
  </motion.div>
);
FranchiseBenefitItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
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

// --- Main AFC Franchise Page Component ---
export default function AFCFranchisePage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  // Content based on the AFC Analysis document (Sections 5.1-5.4)
  const t = {
    heroTitle:
      "Conviértase en Dueño de un <span class='text-red-600'>Athletic Functional Center</span>",
    heroSubtitle:
      "Una oportunidad única para unirse a una marca de fitness funcional en crecimiento, con un modelo de negocio enfocado en la comunidad y resultados comprobados en El Tejar, Cartago.",
    whyFranchiseTitle: "¿Por Qué Franquiciar con AFC?",
    whyFranchiseIntro:
      "Athletic Functional Center le ofrece la oportunidad de emprender en el próspero mercado del fitness funcional, respaldado por una marca con identidad clara y una ubicación estratégica con potencial de comunidad.",
    benefitBrand: {
      title: "Marca Reconocida y Enfocada",
      description:
        "Nombre claro ('Athletic Functional Center') que atrae a entusiastas del fitness funcional. Potencial de fuerte reconocimiento local.",
    },
    benefitModel: {
      title: "Modelo de Negocio Probado",
      description:
        "Basado en la operación exitosa en Centro Comercial La Hacienda, un entorno con enfoque comunitario.",
    },
    benefitMarket: {
      title: "Mercado en Crecimiento",
      description:
        "Aproveche la creciente demanda de fitness especializado y bienestar en Costa Rica.",
    },
    benefitSupport: {
      title: "Soporte y Sistemas (Proyectado)",
      description:
        "Acceso a nuestros manuales de operación, programas de entrenamiento y estrategias de marketing una vez desarrollado el sistema de franquicia.",
    },
    idealFranchiseeTitle: "Nuestro Socio Franquiciado Ideal",
    idealFranchiseeIntro:
      "Buscamos individuos apasionados por el fitness, con visión empresarial y compromiso con la excelencia y la comunidad:",
    idealPoints: [
      "Pasión por el fitness funcional y el bienestar.",
      "Experiencia en gestión de negocios o emprendimiento (deseable).",
      "Capacidad financiera para la inversión inicial y operativa.",
      "Compromiso con los estándares de marca y calidad de AFC.",
      "Fuertes habilidades de liderazgo y enfoque en el servicio al cliente.",
      "Conexión con la comunidad local de su territorio propuesto.",
    ],
    modelTitle: "El Modelo de Franquicia AFC (Visión Futura)",
    modelIntro:
      "Nuestra visión para la franquicia AFC se centrará en proveerle las herramientas y el soporte necesario para el éxito:",
    usp: {
      title: "Propuesta Única de Valor",
      description:
        "Metodología de entrenamiento funcional distintiva, fuerte enfoque comunitario apalancado en ubicaciones estratégicas (como centros comerciales), y una marca auténtica de Costa Rica.",
      icon: FiTarget,
    },
    training: {
      title: "Capacitación Integral",
      description:
        "Programas de formación exhaustivos para usted y su personal en operaciones, coaching AFC, ventas y marketing.",
      icon: FiBookOpen,
    },
    systems: {
      title: "Sistemas y Operaciones",
      description:
        "Manuales de operación detallados, software de gestión de miembros y clases (proyectado), y procesos estandarizados.",
      icon: FiTool,
    },
    marketing: {
      title: "Asistencia en Marketing",
      description:
        "Guías de marketing local, acceso a materiales de marca y estrategias para la atracción de miembros.",
      icon: FiUsers,
    },
    investmentTitle: "Inversión y Requisitos",
    investmentIntro:
      "Los detalles específicos sobre la inversión inicial, regalías y requisitos financieros se proporcionarán a los candidatos calificados durante el proceso de consulta. Buscamos una estructura competitiva y mutuamente beneficiosa.",
    ctaTitle: "¿Listo para Forjar un Futuro Exitoso con AFC?",
    ctaSubtitle:
      "Si comparte nuestra pasión por el fitness funcional y el desarrollo comunitario, y posee la visión para operar un Athletic Functional Center, nos encantaría conocerle.",
    ctaButton: "Solicitar Información de Franquicia",
  };

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      {/* This page assumes it's rendered within AFCLayout which provides AFCHeader/Footer */}
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className="relative pt-24 md:pt-32 pb-16 md:pb-20 text-center overflow-hidden border-b ${colors.borderLight}"
          ariaLabelledby="afc-franchise-hero"
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
              id="afc-franchise-hero"
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

        {/* Why Franchise with AFC? Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-20`}
          ariaLabelledby="why-franchise-afc"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="why-franchise-afc"
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-4`}
          >
            {t.whyFranchiseTitle}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={`text-lg ${colors.textSecondary} text-center max-w-3xl mx-auto mb-12 md:mb-16`}
          >
            {t.whyFranchiseIntro}
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <FranchiseBenefitItem
              icon={FiAward}
              title={t.benefitBrand.title}
              description={t.benefitBrand.description}
            />
            <FranchiseBenefitItem
              icon={FiShield}
              title={t.benefitModel.title}
              description={t.benefitModel.description}
            />
            <FranchiseBenefitItem
              icon={FiTrendingUp}
              title={t.benefitMarket.title}
              description={t.benefitMarket.description}
            />
            <FranchiseBenefitItem
              icon={FiTool}
              title={t.benefitSupport.title}
              description={t.benefitSupport.description}
            />
          </div>
        </Section>

        {/* Ideal Franchisee Profile Section */}
        <Section
          bg={colors.surface}
          className={`py-16 md:py-20 border-y ${colors.borderLight}`}
          ariaLabelledby="ideal-franchisee-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="ideal-franchisee-title"
            className={`text-3xl font-bold ${colors.textPrimary} text-center mb-4`}
          >
            {t.idealFranchiseeTitle}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={`text-lg ${colors.textSecondary} text-center max-w-3xl mx-auto mb-12 md:mb-16`}
          >
            {t.idealFranchiseeIntro}
          </motion.p>
          <div
            className={`max-w-2xl mx-auto p-6 rounded-lg bg-white border ${colors.border}`}
          >
            <ul className="space-y-4">
              {t.idealPoints.map((point, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="flex items-start gap-3"
                >
                  <FiCheckCircle
                    className={`w-5 h-5 ${colors.accentRed} mt-1 flex-shrink-0`}
                  />
                  <span className={`${colors.textSecondary} text-md`}>
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Section>

        {/* The AFC Franchise Model Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-20`}
          ariaLabelledby="afc-model-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="afc-model-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-4`}
          >
            {t.modelTitle}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={`text-lg ${colors.textSecondary} text-center max-w-3xl mx-auto mb-12 md:mb-16`}
          >
            {t.modelIntro}
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <DetailListItem
              icon={t.usp.icon}
              title={t.usp.title}
              description={t.usp.description}
              iconColorClass={colors.iconColor}
            />
            <DetailListItem
              icon={t.training.icon}
              title={t.training.title}
              description={t.training.description}
              iconColorClass={colors.iconColor}
            />
            <DetailListItem
              icon={t.systems.icon}
              title={t.systems.title}
              description={t.systems.description}
              iconColorClass={colors.iconColor}
            />
            <DetailListItem
              icon={t.marketing.icon}
              title={t.marketing.title}
              description={t.marketing.description}
              iconColorClass={colors.iconColor}
            />
          </div>
        </Section>

        {/* Investment Section (Conceptual) */}
        <Section
          bg={colors.surface}
          className={`py-16 md:py-20 border-y ${colors.borderLight}`}
          ariaLabelledby="investment-title"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-3xl mx-auto text-center"
          >
            <FiDollarSign
              className={`w-12 h-12 ${colors.iconColor} mx-auto mb-6`}
            />
            <h2
              id="investment-title"
              className={`text-3xl font-bold ${colors.textPrimary} mb-4`}
            >
              {t.investmentTitle}
            </h2>
            <p className={`${colors.textSecondary} text-lg leading-relaxed`}>
              {t.investmentIntro}
            </p>
          </motion.div>
        </Section>

        {/* Final Call to Action */}
        <Section
          bg={colors.accentRedBg}
          className="py-20 md:py-24 text-center"
          ariaLabelledby="afc-franchise-cta"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-2xl mx-auto"
          >
            <img
              src={afcLogoPath}
              alt="AFC Logo"
              className="h-16 w-auto mx-auto mb-6 filter invert brightness-0 "
            />
            <h2
              id="afc-franchise-cta"
              className={`text-3xl font-bold ${colors.buttonTextLight} mb-4`}
            >
              {t.ctaTitle}
            </h2>
            <p className={`text-lg text-red-100 mb-8 max-w-xl mx-auto`}>
              {t.ctaSubtitle}
            </p>
            <Button
              to="/contact?subject=AFCFranchiseInquiry" // General contact form with specific subject
              variant="primary"
              size="xl"
              icon={<FiArrowRight />}
              className={`bg-white text-red-700 hover:bg-slate-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all`}
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
AFCFranchisePage.propTypes = {};
FranchiseBenefitItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
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
