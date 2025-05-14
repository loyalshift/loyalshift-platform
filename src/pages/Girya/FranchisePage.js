// src/pages/Girya/FranchisePage.js
// Page outlining the Girya franchise opportunity and application workflow.
// Uses a Light Earthy Fitness / Mindful Strength Theme.
// Current time: Tuesday, May 13, 2025 at 2:15 PM CST.

import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiAward, // Quality, Brand, Opportunity
  FiUsers, // Community, Support
  FiZap, // Philosophy, Passion
  FiTrendingUp, // Growth, Success
  FiBookOpen, // Location, Territory
  FiFileText, // Application, Documents
  FiCheckSquare, // Approval, Steps
  FiMessageSquare, // Inquiry, Contact
  FiArrowRight, // CTA
  FiDollarSign, // Investment
  FiShield, // Support, Stability
  FiGitMerge, // Process, Workflow
  FiBriefcase, // Business Opportunity
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import Section from "../../components/Section";
import GiryaLogo from "../../images/girya-logo.svg";

// --- Light Earthy Fitness / Mindful Strength Color Palette ---
const colors = {
  background: "bg-stone-100",
  surface: "bg-white",
  surfaceAccent: "bg-emerald-50",
  surfaceMuted: "bg-stone-50", // Slightly different for some cards
  border: "border-stone-300",
  borderMedium: "border-stone-400",
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

// --- Helper Component for Benefit/Feature Card ---
const BenefitCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className={`p-6 rounded-xl shadow-lg h-full ${colors.surface} border ${colors.border} hover:border-emerald-400 transition-all duration-300 group`}
    whileHover={{ y: -4, scale: 1.01 }}
  >
    <div
      className={`inline-flex p-3 rounded-lg ${colors.surfaceAccent} border ${colors.borderAccent} mb-4 group-hover:bg-emerald-100 transition-colors`}
    >
      <Icon
        className={`w-7 h-7 ${colors.textHighlight} group-hover:text-emerald-800 transition-colors`}
      />
    </div>
    <h3
      className={`text-xl font-semibold ${colors.textPrimary} mb-2 group-hover:${colors.textHighlight} transition-colors`}
    >
      {title}
    </h3>
    <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
      {description}
    </p>
  </motion.div>
);
BenefitCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// --- Helper Component for Process Step ---
const ProcessStepItem = ({ number, title, description, icon: Icon }) => (
  <motion.div variants={fadeInUp} className="flex items-start gap-4 md:gap-5">
    <div
      className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full ${colors.buttonPrimaryBg} ${colors.buttonText} flex items-center justify-center text-lg md:text-xl font-bold shadow-md`}
    >
      {number}
    </div>
    <div className="flex-grow pt-1">
      <h4
        className={`text-lg md:text-xl font-semibold ${colors.textPrimary} mb-1 flex items-center`}
      >
        {Icon && (
          <Icon className={`w-5 h-5 mr-2 ${colors.textHighlight} opacity-80`} />
        )}{" "}
        {title}
      </h4>
      <p
        className={`${colors.textSecondary} text-sm md:text-base leading-relaxed`}
      >
        {description}
      </p>
    </div>
  </motion.div>
);
ProcessStepItem.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
};

// --- Main Girya Franchise Page Component ---
export default function GiryaFranchisePage() {
  const franchiseBenefits = [
    {
      icon: FiAward,
      title: "Marca Establecida y Respetada",
      description:
        "Únete a un nombre reconocido por su calidad, filosofía única (Mindful Strength) y comunidad comprometida.",
    },
    {
      icon: FiBookOpen,
      title: "Metodología Probada",
      description:
        "Implementa un sistema de entrenamiento y coaching efectivo, con programas y protocolos desarrollados y validados.",
    },
    {
      icon: FiUsers,
      title: "Soporte Continuo",
      description:
        "Recibe capacitación integral, asistencia en marketing, operaciones y desarrollo continuo para asegurar tu éxito.",
    },
    {
      icon: FiTrendingUp,
      title: "Potencial de Crecimiento",
      description:
        "Capitaliza la creciente demanda por bienestar integral, fitness consciente y comunidades de apoyo auténticas.",
    },
  ];

  const applicationProcess = [
    {
      number: 1,
      icon: FiMessageSquare,
      title: "Contacto Inicial y Presentación",
      description:
        "Completa nuestro formulario de interés. Agendaremos una llamada para conocernos y presentarte la oportunidad Girya en detalle.",
    },
    {
      number: 2,
      icon: FiFileText,
      title: "Solicitud Formal y Revisión",
      description:
        "Te invitaremos a completar una solicitud formal, que incluye información financiera y de experiencia. Nuestro equipo la revisará cuidadosamente.",
    },
    {
      number: 3,
      icon: FiUsers,
      title: "Día de Descubrimiento (Discovery Day)",
      description:
        "Visítanos (virtual o presencialmente) para una inmersión profunda en la operación, cultura y filosofía Girya. Conoce al equipo central.",
    },
    {
      number: 4,
      icon: FiShield,
      title: "Revisión de Documento de Franquicia (FDD)",
      description:
        "Te proporcionaremos nuestro Documento de Divulgación de Franquicia para una revisión legal y financiera completa.",
    },
    {
      number: 5,
      icon: FiCheckSquare,
      title: "Acuerdo y Planificación",
      description:
        "Si ambas partes estamos de acuerdo, firmaremos el acuerdo de franquicia y comenzaremos la planificación de tu centro Girya.",
    },
    {
      number: 6,
      icon: FiZap,
      title: "Entrenamiento y Lanzamiento",
      description:
        "Recibirás entrenamiento completo en nuestra metodología, operaciones y sistemas, seguido del emocionante lanzamiento de tu propio Girya.",
    },
  ];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      {/* Assumes GiryaLayout provides Header & Footer */}
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.background}
          className="relative pt-24 md:pt-36 pb-16 md:pb-20 text-center overflow-hidden"
          ariaLabelledby="girya-franchise-hero"
        >
          <div className="absolute inset-0 opacity-[3%] bg-[url('/public/images/financial-texture.png')] bg-repeat mix-blend-overlay"></div>
          <motion.div
            className="max-w-4xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-6 rounded-full ${colors.surfaceAccent} border ${colors.borderAccent} shadow-md`}
            >
              <FiBriefcase className={`w-12 h-12 ${colors.textHighlight}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="girya-franchise-hero"
              className={`text-4xl sm:text-5xl font-extrabold ${colors.textPrimary} mb-4 leading-tight`}
            >
              Expande tu Impacto:{" "}
              <span className={colors.textHighlight}>
                Sé Dueño de una Franquicia Girya
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto mb-10`}
            >
              Lleva la filosofía Mindful Strength y la energía de nuestra
              comunidad a tu localidad. Te ofrecemos un modelo de negocio
              probado, soporte integral y la oportunidad de construir un
              emprendimiento significativo.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                to="#path-to-ownership"
                variant="primary"
                size="lg"
                icon={<FiArrowRight />}
                className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-lg`}
              >
                Descubre el Proceso
              </Button>
            </motion.div>
          </motion.div>
        </Section>

        {/* Why Franchise with Girya Section */}
        <Section
          bg={colors.surface}
          className={`py-16 md:py-20 border-y ${colors.border}`}
          ariaLabelledby="why-franchise-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="why-franchise-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-12 md:mb-16`}
          >
            ¿Por Qué una Franquicia{" "}
            <span className={colors.textHighlight}>Girya</span>?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {franchiseBenefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </motion.div>
        </Section>

        {/* Path to Ownership Section */}
        <Section
          id="path-to-ownership"
          bg={colors.background}
          className="py-16 md:py-24"
          ariaLabelledby="path-title"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <FiGitMerge
              className={`w-12 h-12 ${colors.textHighlight} mx-auto mb-4`}
            />
            <h2
              id="path-title"
              className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} mb-3`}
            >
              Tu Camino Hacia la Apertura de un Girya
            </h2>
            <p className={`${colors.textSecondary} text-lg`}>
              Un proceso transparente y colaborativo para asegurar el éxito
              mutuo.
            </p>
          </motion.div>
          <div
            className={`max-w-3xl mx-auto space-y-10 md:space-y-12 p-6 md:p-8 rounded-xl ${colors.surface} border ${colors.borderMedium} shadow-lg`}
          >
            {applicationProcess.map((step) => (
              <ProcessStepItem
                key={step.number}
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </Section>

        {/* Investment Insights (Placeholder) */}
        <Section
          bg={colors.surfaceAccent}
          className={`py-16 md:py-20 border-y ${colors.border}`}
          ariaLabelledby="investment-title"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center max-w-3xl mx-auto"
          >
            <FiDollarSign
              className={`w-12 h-12 ${colors.textHighlight} mx-auto mb-4`}
            />
            <h2
              id="investment-title"
              className={`text-3xl font-bold ${colors.textPrimary} mb-3`}
            >
              Perspectiva de Inversión
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-6`}
            >
              Ofrecemos un modelo de franquicia con una inversión inicial
              competitiva y un fuerte potencial de retorno, respaldado por
              nuestra marca y sistemas de soporte. Los detalles financieros
              completos se proporcionan en nuestro Documento de Divulgación de
              Franquicia (FDD).
            </p>
            <p className={`${colors.textSecondary} text-sm`}>
              (Rango de inversión estimado, regalías y otros detalles
              financieros se discutirán durante el proceso de solicitud).
            </p>
          </motion.div>
        </Section>

        {/* Final Call to Action */}
        <Section
          bg={colors.background}
          className="py-20 md:py-24 text-center"
          ariaLabelledby="franchise-cta-final"
        >
          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
            <img
              src={GiryaLogo}
              alt="Girya Logo"
              className="h-16 w-16 mx-auto mb-6 filter grayscale opacity-60"
            />
            <h2
              id="franchise-cta-final"
              className={`text-3xl font-bold ${colors.textPrimary} mb-4`}
            >
              ¿Listo para Forjar tu Propio Legado Girya?
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-8`}
            >
              Si compartes nuestra pasión por el Mindful Strength y deseas
              construir un negocio próspero con impacto positivo, da el primer
              paso.
            </p>
            <Button
              to="/girya/contact?subject=FranquiciaGiryaInquiry"
              variant="primary"
              size="xl"
              icon={<FiMessageSquare />}
              className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 ease-out`}
            >
              Solicitar Información de Franquicia
            </Button>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
GiryaFranchisePage.propTypes = {};
BenefitCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
ProcessStepItem.propTypes = {
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
