// src/pages/CaseStudies/Anaco.js
// Case study page detailing the proposed ANACO Conecta Agent Hub project.

import React from "react";
import { motion } from "framer-motion";
import {
  // Relevant Icons for Finance/Agents/Process:
  FiClock, // Time savings, Speed
  FiTrendingUp, // Growth, Efficiency, Improvement
  FiCheckCircle, // Success, Completion, Results
  FiUsers, // Agents, Partners, Collaboration
  FiHome, // Mortgages, Real Estate
  FiFileText, // Applications, Documents
  FiShield, // Security, Compliance
  FiCpu, // AI / Automation (Future)
  FiArrowRight, // CTA
  FiAward, // ANACO's Reputation/Trust (could replace FiHome)
} from "react-icons/fi";

// Reusable Button component (assuming path is correct)
import Button from "../../../components/Button"; // Adjust path if needed (e.g., ../../components)

// --- Consistent Dark Theme Color Palette (Mirroring LandingPage.js & QCells) ---
// Using Amber highlight consistent with Proposal Theme
const colors = {
  background: "bg-slate-900",
  surface: "bg-slate-800/70",
  surfaceStrong: "bg-slate-800",
  primaryGradient: "bg-gradient-to-r from-amber-500 to-amber-600", // Amber gradient for buttons
  secondaryGradient: "bg-gradient-to-br from-blue-950 to-indigo-950",
  border: "border-slate-700",
  borderAccent: "border-amber-500/40", // Use Amber accent border
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  textHighlight: "text-amber-400", // Amber highlight
  textWhite: "text-white",
  accentBlue: "text-blue-400", // Can keep blue/cyan/green for variety in stats
  accentCyan: "text-cyan-400",
  accentGreen: "text-green-400",
  darkTextForAmber: "text-slate-900", // Text on amber button
  amberHoverGradient: "hover:from-amber-400 hover:to-amber-500", // Hover for amber button
};

// --- Animation Variants (Mirroring QCells.js) ---
const viewportOnce = { once: true, margin: "-15%" };
const sectionStagger = { visible: { transition: { staggerChildren: 0.1 } } };
const fadeInUp = {
  /* ... Variant definition ... */ hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const scaleUp = {
  /* ... Variant definition ... */ hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};
const cardGridStagger = { visible: { transition: { staggerChildren: 0.1 } } };
// --- End Animation Variants ---

export default function AnacoCaseStudy() {
  // --- Data for Key Results (Projected/Targeted for ANACO) ---
  const keyResults = [
    {
      icon: <FiClock />,
      metric: "+30%", // Example Target Metric
      description: "Reducción Proyectada en Tiempo de Pre-Aprobación", // Projected Reduction in Pre-Approval Time
      color: colors.accentBlue,
    },
    {
      icon: <FiUsers />,
      metric: "10-15", // Example Target Metric
      description: "Agentes Clave Participando en Piloto Inicial", // Key Agents Participating in Initial Pilot
      color: colors.accentCyan,
    },
    {
      icon: <FiCheckCircle />,
      metric: "MVP 3-4 Meses", // Example Target Metric
      description: "Lanzamiento Estimado de Plataforma Base (MVP)", // Estimated Launch of Base Platform (MVP)
      color: colors.accentGreen,
    },
  ];

  // Helper function for dynamic text (Spanish for this page)
  const t = (key) => {
    // In a real i18n setup, this would lookup the key. Here we return the Spanish text directly.
    const texts = {
      caseStudy: "Caso de Estudio (Propuesta)",
      title: "ANACO Impulsa Eficiencia de Agentes con Plataforma Digital",
      subtitle:
        "Implementando el 'ANACO Conecta Agent Hub™' para revolucionar el proceso de pre-aprobación hipotecaria en Costa Rica.",
      challengeTitle: "El Desafío: Optimizar el Flujo Agente-Cliente",
      challengeP1:
        "Con más de 40 años de confianza en el sector financiero costarricense, especialmente en Cartago, ANACO Inversiones busca innovar. Su fortaleza en créditos hipotecarios y eficiencia operativa es reconocida, pero la dependencia de canales tradicionales para la interacción con agentes inmobiliarios presenta una oportunidad.",
      challengeP2:
        "El principal desafío abordado es la fricción común en la industria: las demoras en la pre-aprobación hipotecaria, que impactan los ciclos de venta de los agentes y generan incertidumbre en los compradores.",
      challengeList: [
        // Using a list for challenges/needs
        "Agilizar la recepción y procesamiento inicial de solicitudes.",
        "Empoderar a la red de agentes con herramientas digitales eficientes.",
        "Fortalecer las relaciones estratégicas con los socios inmobiliarios.",
        "Complementar la sólida reputación de ANACO con una imagen digital moderna.",
        "Mantener la seguridad y el cumplimiento normativo (SUGEF, Ley 8968).",
      ],
      solutionTitle: "Solución Propuesta: ANACO Conecta Agent Hub™",
      solutionP1:
        "LoyalShift propone desarrollar el 'ANACO Conecta Agent Hub™', una plataforma web segura y exclusiva para los agentes inmobiliarios asociados con ANACO, construida sobre nuestra tecnología probada.",
      solutionP2: "Funcionalidad Clave (Fase MVP):",
      solutionList: [
        "Portal Seguro de Agente: Registro y acceso dedicado.",
        "Formulario Digital Inteligente: Captura eficiente y validada de datos.",
        "Carga Segura de Documentos: Recepción directa de archivos necesarios.",
        "Panel de Control Básico: Seguimiento inicial del estado de las solicitudes.",
        "Notificaciones Automatizadas: Confirmaciones de envío instantáneas.",
      ],
      solutionP3:
        "Esta plataforma está diseñada para integrarse de manera segura y entregar paquetes de solicitud estandarizados al equipo de procesamiento de ANACO, sentando las bases para futuras automatizaciones con IA Explicable (XAI) de LoyalShift.",
      resultsTitle: "Resultados Anticipados: Transformación del Proceso",
      resultsList: [
        "Reducción drástica del tiempo de respuesta para pre-aprobaciones.",
        "Disminución significativa de la carga administrativa para los agentes.",
        "Mejora en la precisión y completitud de los datos de solicitud.",
        "Fortalecimiento de la lealtad y preferencia de los agentes hacia ANACO.",
        "Experiencia más fluida y transparente para los compradores de vivienda.",
        "Base tecnológica escalable para futuro crecimiento y automatización.",
      ],
      ctaTitle: "¿Listo para Lanzar el ANACO Conecta Agent Hub™?",
      ctaSubtitle:
        "Colaboremos para implementar esta solución estratégica, fortalecer sus alianzas con agentes y consolidar su liderazgo en el mercado hipotecario costarricense.",
      ctaButton1: "Discutir Implementación",
      ctaButton2: "Ver Propuesta Detallada",
    };
    return texts[key] || `Missing translation for ${key}`;
  };

  return (
    // Main container with dark background
    <div
      className={`${colors.background} ${colors.textSecondary} overflow-x-hidden`}
    >
      <motion.div
        className="container px-6 mx-auto py-20 md:py-28"
        initial="hidden"
        animate="visible"
        variants={sectionStagger}
      >
        {/* --- Page Header --- */}
        <motion.section
          className="text-center mb-16 md:mb-20"
          variants={fadeInUp}
        >
          <motion.div
            variants={scaleUp}
            className="inline-block mb-4 p-3 rounded-full bg-slate-800 border border-slate-700"
          >
            {/* Icon representing ANACO/Finance/Trust */}
            <FiAward className={`w-10 h-10 ${colors.textHighlight}`} />
          </motion.div>
          <p
            className={`text-base font-semibold ${colors.textHighlight} uppercase tracking-wider mb-2`}
          >
            {t("caseStudy")} {/* Indicate it's based on proposal */}
          </p>
          <h1
            className={`text-4xl md:text-5xl font-bold ${colors.textPrimary} mb-4`}
          >
            {t("title")}
          </h1>
          <p className={`text-xl ${colors.textSecondary} max-w-3xl mx-auto`}>
            {t("subtitle")}
          </p>
        </motion.section>

        {/* --- Key Results Highlights --- */}
        <motion.section
          className="mb-16 md:mb-20"
          variants={cardGridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {keyResults.map((result, index) => (
              <motion.div
                key={index}
                className={`${colors.surface} p-6 rounded-xl shadow-lg shadow-black/20 border ${colors.border} text-center backdrop-blur-sm`}
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                <div
                  className={`text-4xl ${
                    result.color || colors.accentBlue
                  } mb-3 inline-block`}
                >
                  {" "}
                  {/* Fallback color */}
                  {result.icon}
                </div>
                <p className={`text-3xl font-bold ${colors.textWhite} mb-1`}>
                  {result.metric}
                </p>
                <p className={`${colors.textSecondary} text-sm`}>
                  {result.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Detailed Sections (Challenge, Solution, Results) --- */}
        <motion.section
          className={`${colors.surfaceStrong} p-8 md:p-12 rounded-xl shadow-xl shadow-black/25 border ${colors.border} mb-16 md:mb-20 backdrop-blur-md`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {/* The Challenge */}
          <motion.div className="mb-10" variants={fadeInUp}>
            <h2
              className={`text-3xl font-bold ${colors.textPrimary} mb-4 border-b pb-2 ${colors.borderAccent}`}
            >
              {t("challengeTitle")}
            </h2>
            <p className={`text-lg ${colors.textSecondary} mb-3`}>
              {t("challengeP1")}
            </p>
            <p className={`text-lg ${colors.textSecondary} mb-4`}>
              {t("challengeP2")}
            </p>
            {/* Optional list for specific points */}
            <ul
              className={`list-disc pl-5 space-y-1 text-base ${colors.textSecondary}`}
            >
              {t("challengeList").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>

          {/* Our Solution */}
          <motion.div className="mb-10" variants={fadeInUp}>
            <h2
              className={`text-3xl font-bold ${colors.textPrimary} mb-4 border-b pb-2 ${colors.borderAccent}`}
            >
              {t("solutionTitle")}
            </h2>
            <p className={`text-lg ${colors.textSecondary} mb-3`}>
              {t("solutionP1")}
            </p>
            <p className={`text-lg font-semibold ${colors.textHighlight} mb-2`}>
              {t("solutionP2")}
            </p>
            <ul
              className={`list-disc pl-5 space-y-2 text-lg ${colors.textSecondary} mb-3`}
            >
              {t("solutionList").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className={`text-lg ${colors.textSecondary}`}>
              {t("solutionP3")}
            </p>
          </motion.div>

          {/* The Results (Anticipated) */}
          <motion.div variants={fadeInUp}>
            <h2
              className={`text-3xl font-bold ${colors.textPrimary} mb-4 border-b pb-2 ${colors.borderAccent}`}
            >
              {t("resultsTitle")}
            </h2>
            {/* Using list for anticipated results */}
            <ul
              className={`list-none pl-0 space-y-3 text-lg ${colors.textSecondary}`}
            >
              {t("resultsList").map((item, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start"
                >
                  <FiCheckCircle
                    className={`w-5 h-5 ${colors.accentGreen} mr-3 mt-1 flex-shrink-0`}
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.section>

        {/* --- Removed Client Testimonial Section --- */}

        {/* --- Call to Action --- */}
        <motion.section
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2 className={`text-3xl font-bold ${colors.textPrimary} mb-4`}>
            {t("ctaTitle")}
          </h2>
          <p
            className={`text-xl ${colors.textSecondary} max-w-3xl mx-auto mb-8`}
          >
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Primary CTA using Amber theme */}
            <Button
              to="/contact-sales?client=anaco&topic=hub-implementation" // Link to start discussion
              variant="primary" // Use base variant, override below
              size="lg"
              icon={<FiArrowRight />}
              className={`
                    group px-7 py-3.5 text-base
                    ${colors.primaryGradient} ${colors.darkTextForAmber} font-bold
                    ${colors.amberHoverGradient}
                    hover:shadow-lg hover:shadow-amber-500/40
                    ring-1 ring-amber-600/50 !shadow-xl
                    transform hover:-translate-y-1 animate-pulse
                `}
            >
              {t("ctaButton1")}
            </Button>
            {/* Secondary CTA using Amber outline */}
            <Button
              to="/proposal/anaco/details" // Link back to the detailed proposal page
              variant="secondary" // Use base variant, override below
              size="lg"
              className={`
                    group px-7 py-3.5 text-base
                    bg-slate-900/30 border-2 ${colors.amberBorder}/70 ${colors.textHighlight}
                    hover:bg-amber-500/10 ${colors.amberBorderHover} hover:${colors.textHighlight}
                    backdrop-blur-sm transform hover:-translate-y-0.5 transition-all duration-300 ease-out
                `}
            >
              {t("ctaButton2")}
            </Button>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
