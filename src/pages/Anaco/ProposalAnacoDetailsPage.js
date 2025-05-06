// src/pages/ProposalAnacoDetailsPage.js
// UPDATED: Integrated detailed translations for Partnership Model, Pilot, etc.
// Uses embedded dictionaries and language toggle.
// Current time: Thursday, May 1, 2025 at 1:30 PM CST (San José, Costa Rica)

import React from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiFileText,
  FiClock,
  FiCpu,
  FiTrendingUp,
  FiZap,
  FiTool,
  FiShield,
  FiLogIn,
  FiUploadCloud,
  FiAward,
  FiArrowRight,
  FiMessageSquare,
  FiDollarSign,
  FiStar, // Added for Pilot
  FiCheckCircle, // Added for Partnership list
} from "react-icons/fi";

import { Link } from "react-router-dom";

// --- Reusable Components (Adjust path relative to this file's location) ---
// Ensure these paths are correct for your project structure
import Button from "../../components/Button";
import FeatureCard from "../../components/FeatureCard";
import StatCard from "../../components/StatCard";

// --- Premium Financial Color Theme ---
const colors = {
  background: "bg-gradient-to-br from-slate-900 to-blue-950",
  card: "bg-slate-800/50 backdrop-blur-sm",
  surfaceStrong: "bg-slate-800", // Used for some sections
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-300",
  textHighlight: "text-amber-400",
  textWhite: "text-white", // Added for explicit white text use
  border: "border-slate-700",
  borderAccent: "border-amber-500/40", // Used for pilot/partnership cards
  accent: "bg-gradient-to-r from-amber-500 to-amber-600", // Amber gradient for button/badge
  darkTextForAmber: "text-slate-900",
  amberHoverGradient: "hover:from-amber-400 hover:to-amber-500",
  amberBorder: "border-amber-500",
  amberBorderHover: "hover:border-amber-400",
  accentGreen: "text-green-400", // For checkmarks
  accentBlue: "text-blue-400",
  accentCyan: "text-cyan-400",
  primaryGradient: "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600", // For partnership section bg
};

// --- Embedded Spanish Content Object ---
// Contains all Spanish text strings used in the component.
// Current time: Thursday, May 1, 2025 at 2:05:21 PM CST (San José, Costa Rica)
const content = {
  // --- Hero Section ---
  trustBadge: "40+ AÑOS DE CONFIANZA",
  brandName1: "ANACO",
  brandName2: "Conecta",
  headline:
    "Propuesta Estratégica: <span class='text-amber-400'>Agent Hub™</span>",
  subtitle: "Su solución personalizada está lista.",

  // --- MVP Features Section ---
  mvp_title:
    "Capacidades Centrales de la Plataforma (Lanzamiento MVP: 3-4 Meses)",
  feature1_title: "Portal Exclusivo de Agente",
  feature1_desc: "Inicio de sesión seguro y panel para socios autorizados.",
  feature2_title: "Solicitudes Digitales Sin Errores",
  feature2_desc: "Proceso de envío simplificado con verificación de errores.",
  feature3_title: "Carga de Documentos Instantánea",
  feature3_desc: "Envío seguro de archivos con organización automática.",
  feature4_title: "Seguimiento en Tiempo Real (MVP+)",
  feature4_desc:
    "Monitoree el estado de la solicitud en tiempo real (Básico en MVP).",
  mvp_footer:
    "Base para futuras mejoras fluidas: seguimiento en tiempo real, asistencia IA y más.",

  // --- Agent Hub Module Section ---
  agent_hub_section_title: "Construido sobre Nuestro Módulo Agent Hub™ Probado",
  agent_hub_intro:
    "El ANACO Conecta Agent Hub™ no empieza desde cero. Se basa en la tecnología central de LoyalShift, optimizada para el sector financiero y diseñada para la velocidad, seguridad y escalabilidad.",
  agent_hub_advantage1_title: "Despliegue Acelerado:",
  agent_hub_advantage1_desc:
    "Reduce significativamente el tiempo de lanzamiento (MVP en 3-4 meses) comparado con desarrollo a medida.",
  agent_hub_advantage2_title: "Base Confiable y Segura:",
  agent_hub_advantage2_desc:
    "Construido con las mejores prácticas de seguridad financiera y rendimiento robusto.",
  agent_hub_advantage3_title: "IA Explicable (XAI):",
  agent_hub_advantage3_desc:
    "Automatización inteligente en la que ANACO puede confiar y entender, asegurando transparencia.",
  agent_hub_advantage4_title: "Personalización Total:",
  agent_hub_advantage4_desc:
    "Adaptado completamente al flujo de trabajo específico, datos requeridos y marca de ANACO Inversiones.",
  agent_hub_advantage5_title: "Escalabilidad Futura:",
  agent_hub_advantage5_desc:
    "Diseñado para crecer sin problemas con su red de agentes y volumen de negocios.",

  // --- Impact Section ---
  impact_title: "ROI Proyectado e Impacto Empresarial",
  benefit1_label: "Aprobaciones Más Rápidas",
  benefit2_label: "Tiempo Mensual Ahorrado (Agente)",
  benefit3_label: "Más Negocios Cerrados",
  impact_footer:
    "*Proyecciones ilustrativas basadas en benchmarks de la plataforma LoyalShift. Análisis de ROI detallado disponible.",

  // --- NEW Pricing Section Keys (Selling Starter Plan) ---
  pricing_title: "Plan Recomendado: LoyalShift Starter Partner™",
  pricing_intro:
    "El plan Starter Partner es su ruta directa y eficiente para lanzar el Agent Hub™ (MVP). Compruebe el valor inmediato y prepárese para escalar.",
  pricing_starter_name: "Starter Partner™",
  pricing_starter_price: "$599",
  pricing_starter_freq: "/mes",
  pricing_starter_desc:
    "Ideal para implementar y validar flujos de trabajo clave en 1-2 sistemas centrales, perfecto para su piloto.",
  pricing_includes_title:
    "Incluye Capacidades Esenciales para el Éxito del Piloto:",
  pricing_feature_connectors:
    "Conexión hasta 2 Aplicaciones/Bases de Datos Legadas (Ideal para sistemas ANACO iniciales)",
  pricing_feature_users:
    "Incluye 5 Asientos de Usuario (Perfecto para equipo piloto ANACO)",
  pricing_feature_workflows:
    "Hasta 50 Ejecuciones de Workflow Automatizado / Mes",
  pricing_feature_xai: "Acceso a Dashboard de IA Explicable (XAI) Estándar",
  pricing_feature_support: "Acceso a Base de Conocimiento y Foros Comunitarios",
  pricing_payment_note:
    "Pagos seguros gestionados por nuestro socio <strong class='text-white'>Lemon Squeezy</strong>. Precios + IVA aplicable en Costa Rica.", // Added CR context for tax
  pricing_view_all_link_text: "Ver comparación completa de planes LoyalShift",
  // --- End Pricing Keys ---

  // --- Foundation Section ---
  foundation_title: "Base Segura y Conforme a Normativas",
  foundation_body:
    "Impulsado por la tecnología probada de LoyalShift con seguridad de nivel bancario y enfoque en cumplimiento costarricense (SUGEF, Ley 8968).",

  // --- Pilot Program Section ---
  pilot_title_v2:
    "Colaboración Exclusiva: Inicio Rápido con el Programa Piloto (3-4 Meses)",
  pilot_body:
    "Valide la funcionalidad central del Hub con agentes selectos, recopile retroalimentación para refinar antes del lanzamiento general. Colaboremos para identificar a los socios ideales para este lanzamiento inicial crucial.",

  // --- Final CTA Section ---
  ctaTitle_v2: "El Futuro de las Hipotecas para Agentes: Dé el Siguiente Paso",
  ctaSubtitle_v2:
    "Aproveche esta oportunidad exclusiva para ANACO Inversiones. Contacte a nuestro equipo para finalizar detalles y comenzar la implementación del Agent Hub™ con el plan Starter.", // Added mention of Starter plan
  ctaButton1: "Visitar Anaco Landing Page", // Modified CTA text
  ctaButton2: "Hacer una Pregunta",
};

// --- Corrected Feature Data (Using Keys) ---
const features = [
  {
    icon: <FiLogIn className="w-6 h-6" />,
    titleKey: "feature1_title",
    descKey: "feature1_desc",
  },
  {
    icon: <FiFileText className="w-6 h-6" />,
    titleKey: "feature2_title",
    descKey: "feature2_desc",
  },
  {
    icon: <FiUploadCloud className="w-6 h-6" />,
    titleKey: "feature3_title",
    descKey: "feature3_desc",
  },
  {
    icon: <FiTrendingUp className="w-6 h-6" />,
    titleKey: "feature4_title",
    descKey: "feature4_desc",
  }, // Changed icon to match desc
];

// --- Corrected Benefit Data (Using Keys) ---
const benefits = [
  {
    icon: <FiClock className="w-8 h-8" />,
    metric: "50%",
    labelKey: "benefit1_label",
  }, // Metric value kept direct
  {
    icon: <FiUsers className="w-8 h-8" />,
    metric: "10+ Hrs",
    labelKey: "benefit2_label",
  },
  {
    icon: <FiDollarSign className="w-8 h-8" />,
    metric: "20%",
    labelKey: "benefit3_label",
  },
];

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const viewportOnce = { once: true, amount: 0.1 }; // Reduced amount for earlier trigger
const sectionStagger = { visible: { transition: { staggerChildren: 0.1 } } };
const cardGridStagger = { visible: { transition: { staggerChildren: 0.08 } } }; // Slightly faster card stagger

// --- Main Proposal Details Page Component ---
export default function ProposalAnacoDetailsPage() {
  // Spanish only - select content directly
  const t = content;

  // Data arrays defined directly using Spanish strings from content object
  const platformFeaturesMVP = [
    /* ... MVP features array using t.featureX_title etc ... */
    {
      icon: <FiLogIn className="w-6 h-6" />,
      title: t.feature1_title,
      description: t.feature1_desc,
    },
    {
      icon: <FiFileText className="w-6 h-6" />,
      title: t.feature2_title,
      description: t.feature2_desc,
    },
    {
      icon: <FiUploadCloud className="w-6 h-6" />,
      title: t.feature3_title,
      description: t.feature3_desc,
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: t.feature4_title,
      description: t.feature4_desc,
    },
  ];
  const anticipatedBenefits = [
    /* ... benefits array using t.benefitX_label ... */
    {
      icon: <FiClock className="w-8 h-8" />,
      metric: "Hasta 50%",
      label: t.benefit1_label,
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      metric: "+10 Hrs/Mes",
      label: t.benefit2_label,
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      metric: "+20%",
      label: t.benefit3_label,
    },
  ];
  const agentHubAdvantages = [
    /* ... agent hub advantages array using t[key] ... */
    {
      icon: <FiZap />,
      titleKey: "agent_hub_advantage1_title",
      descKey: "agent_hub_advantage1_desc",
    },
    {
      icon: <FiShield />,
      titleKey: "agent_hub_advantage2_title",
      descKey: "agent_hub_advantage2_desc",
    },
    {
      icon: <FiCpu />,
      titleKey: "agent_hub_advantage3_title",
      descKey: "agent_hub_advantage3_desc",
    },
    {
      icon: <FiTool />,
      titleKey: "agent_hub_advantage4_title",
      descKey: "agent_hub_advantage4_desc",
    },
    {
      icon: <FiTrendingUp />,
      titleKey: "agent_hub_advantage5_title",
      descKey: "agent_hub_advantage5_desc",
    },
  ];
  const partnershipPoints = [
    /* ... Partnership points array using keys ... */
    {
      titleKey: "partnership_point1_title",
      descKey: "partnership_point1_desc",
    },
    {
      titleKey: "partnership_point2_title",
      descKey: "partnership_point2_desc",
    },
    {
      titleKey: "partnership_point3_title",
      descKey: "partnership_point3_desc",
    },
    {
      titleKey: "partnership_point4_title",
      descKey: "partnership_point4_desc",
    },
  ];

  const sizeLgClasses = "px-7 py-3.5 text-base";

  return (
    // Use a slightly different background gradient for visual interest
    <div
      className={`bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 ${colors.textSecondary} overflow-x-hidden`}
    >
      <motion.div
        className="container mx-auto px-4 sm:px-6 py-16 md:py-24" // Standard padding
        initial="hidden"
        animate="visible"
        variants={sectionStagger}
      >
        {/* Removed Language Toggle */}

        {/* Section 1: Introduction / Hero */}
        <motion.section
          variants={fadeInUp} // Animate the whole section block
          className="text-center mb-16 md:mb-20 pt-10"
          aria-labelledby="anaco-hub-title"
        >
          {/* Trust Badge */}
          <motion.div variants={fadeInUp} className={`inline-block p-4 ${colors.surface} rounded-full mb-4 border ${colors.border}`}>
            <FiAward className={`w-10 h-10 ${colors.accentBlue}`} />
          </motion.div>
          <motion.div variants={fadeInUp} className="mb-4">
            <span className={`inline-block ${colors.badgeGradient} ${colors.darkTextForAmber} text-xs font-semibold px-3 py-1 rounded-full shadow-md`}> {/* Adjusted text color */}
              {t.trustBadge}
            </span>
          </motion.div>
          {/* Headline */}
          <motion.h1
            id="anaco-hub-title"
            variants={fadeInUp} // Apply animation variant
            className={`text-4xl md:text-5xl font-bold ${colors.textPrimary} mb-4`}
            dangerouslySetInnerHTML={{ __html: t.headline }}
          />
          {/* Subtitle */}
          <motion.p
            variants={fadeInUp} // Apply animation variant
            className={`text-lg md:text-xl ${colors.textSecondary} max-w-3xl mx-auto mb-10`} // Increased bottom margin
          >
            {t.subtitle}
          </motion.p>

          {/* --- Added CTA Buttons Here --- */}
          <motion.div
            variants={fadeInUp} // Animate this block as well
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8" // Added top margin
          >
            <Button
              to="/anaco" // Adjusted link from original CTA button 1
              variant="primary" // Use base variant, override below
              size="lg" // Use explicit size prop
              icon={<FiArrowRight />} // Updated icon for context
              className={`
                group ${sizeLgClasses} // Use defined size class
                ${colors.accent} ${colors.darkTextForAmber} font-bold
                ${colors.amberHoverGradient}
                hover:shadow-lg hover:shadow-amber-500/40
                ring-1 ring-amber-600/50 !shadow-xl
                transform hover:-translate-y-1 animate-pulse
              `}
            >
              {t.ctaButton1} {/* Text from original CTA button 1 */}
            </Button>
            <Button
              to="/contact" // Link from original CTA button 2
              variant="secondary" // Use base variant, override below
              size="lg" // Use explicit size prop
              icon={<FiMessageSquare className="w-5 h-5"/>} // Add icon
              className={`
                group ${sizeLgClasses} // Use defined size class
                bg-slate-900/30 border-2 ${colors.amberBorder}/70 ${colors.textHighlight}
                hover:bg-amber-500/10 ${colors.amberBorderHover} hover:text-amber-300
                backdrop-blur-sm transform hover:-translate-y-0.5
              `}
            >
              {t.ctaButton2} {/* Text from original CTA button 2 */}
            </Button>
          </motion.div>
          {/* --- End Added CTA Buttons --- */}

        </motion.section>

        {/* Section 2: Core MVP Features (remains the same) */}
        <motion.section
          className="mb-16 md:mb-20"
          aria-labelledby="mvp-features-title"
          variants={sectionStagger} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
           <motion.h2 id="mvp-features-title" variants={fadeInUp} className={`text-3xl font-bold ${colors.textWhite} text-center mb-12 md:mb-16`} > {t.mvp_title} </motion.h2>
           <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" variants={cardGridStagger} >
             {platformFeaturesMVP.map((feature, index) => ( <motion.div key={index} variants={fadeInUp}> <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} className={`${colors.card} border ${colors.border} hover:border-amber-400/30 transition-colors h-full p-6 rounded-lg`} /> </motion.div> ))}
           </motion.div>
           <motion.p variants={fadeInUp} className={`text-center ${colors.textSecondary} mt-8 text-sm italic`} > {t.mvp_footer} </motion.p>
        </motion.section>

        {/* Section 3: Agent Hub™ Module Details (remains the same) */}
        <motion.section
          className={`mb-16 md:mb-20 p-8 rounded-lg ${colors.surfaceStrong} border ${colors.borderAccent}`}
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce} aria-labelledby="agent-hub-title"
        >
            <motion.h2 id="agent-hub-title" className={`text-3xl font-bold ${colors.textWhite} text-center mb-4`} > {t.agent_hub_section_title} </motion.h2>
            <motion.p className={`text-lg ${colors.textSecondary} text-center max-w-3xl mx-auto mb-10`} > {t.agent_hub_intro} </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {agentHubAdvantages.map((advantage, index) => ( <motion.div key={index} variants={fadeInUp} className={`flex items-start p-4 rounded ${colors.surface}/50`} > <div className={`p-2 mr-4 rounded ${colors.accentBlue}/10`}> {React.cloneElement(advantage.icon, { className: `w-6 h-6 ${colors.accentBlue}`})} </div> <div> <h4 className={`font-semibold ${colors.textPrimary} mb-1`}> {t[advantage.titleKey]} </h4> <p className={`text-sm ${colors.textSecondary}`}> {t[advantage.descKey]} </p> </div> </motion.div> ))}
            </div>
        </motion.section>

        {/* Section 4: Anticipated Business Impact (remains the same) */}
        <motion.section
          className="mb-16 md:mb-20"
          aria-labelledby="impact-title"
          variants={sectionStagger} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
           <motion.h2 id="impact-title" variants={fadeInUp} className={`text-3xl font-bold ${colors.textWhite} text-center mb-12 md:mb-16`} > {t.impact_title} </motion.h2>
           <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto" variants={cardGridStagger} >
             {anticipatedBenefits.map((benefit, index) => ( <motion.div key={index} variants={fadeInUp}> <StatCard key={index} index={index} icon={benefit.icon} value={benefit.metric} label={benefit.label} className={`${colors.card} border ${colors.border} p-8 rounded-xl`} /> </motion.div> ))}
           </motion.div>
           <motion.p variants={fadeInUp} className={`text-center ${colors.textSecondary} mt-8 text-sm`} > {t.impact_footer} </motion.p>
        </motion.section>

        {/* **** Section 5: Pricing - Focused on Starter Plan **** */}
        <motion.section
          className={`mb-16 md:mb-20 p-8 rounded-lg ${colors.surfaceStrong} border-2 ${colors.borderAccent} shadow-xl`} // Highlighted section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          aria-labelledby="pricing-title"
        >
          <div className="text-center mb-8">
            {/* Using FiDollarSign but could use FiStar or similar for "Starter" */}
            <FiStar
              className={`w-10 h-10 ${colors.textHighlight} mx-auto mb-3`}
            />
            <h2
              id="pricing-title"
              className={`text-3xl font-bold ${colors.textWhite}`}
            >
              {content.pricing_title}{" "}
              {/* Use t.pricing_title if using i18n hook */}
            </h2>
          </div>
          <p
            className={`text-lg ${colors.textSecondary} mb-8 text-center max-w-3xl mx-auto`}
          >
            {content.pricing_intro}{" "}
            {/* Use t.pricing_intro if using i18n hook */}
          </p>

          {/* Starter Plan Details Card */}
          <div
            className={`max-w-md mx-auto ${colors.card} border ${colors.border} rounded-lg p-6 shadow-lg text-center mb-8`}
          >
            <h3 className={`text-2xl font-semibold ${colors.textPrimary} mb-1`}>
              {content.pricing_starter_name}
            </h3>
            <p className={`text-4xl font-bold ${colors.textHighlight} mb-1`}>
              {content.pricing_starter_price}
              <span className={`text-lg font-normal ${colors.textSecondary}`}>
                {content.pricing_starter_freq}
              </span>
            </p>
            <p
              className={`text-sm ${colors.textSecondary} mb-6 min-h-[2.5rem]`}
            >
              {content.pricing_starter_desc}
            </p>

            <h4
              className={`text-base font-semibold ${colors.textPrimary} mb-3 text-left border-t ${colors.border} pt-4`}
            >
              {content.pricing_includes_title}
            </h4>
            <ul className="space-y-2 text-left text-sm">
              {/* Generate list items from content object */}
              {[
                content.pricing_feature_connectors,
                content.pricing_feature_users,
                content.pricing_feature_workflows,
                content.pricing_feature_xai,
                content.pricing_feature_support,
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FiCheckCircle
                    className={`w-4 h-4 ${colors.accentGreen} flex-shrink-0`}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Optional Link to Full Pricing */}
          <div className="text-center mb-6">
            <Link
              to="/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm ${colors.textHighlight} hover:underline`}
            >
              {content.pricing_view_all_link_text}
            </Link>
          </div>

          {/* Payment Note */}
          <p
            className={`text-center ${colors.textSecondary} text-xs italic`}
            dangerouslySetInnerHTML={{ __html: content.pricing_payment_note }}
          ></p>
        </motion.section>


        {/* Section 7: Pilot Program */}
        <motion.section
          className="mb-16 md:mb-20"
          aria-labelledby="pilot-program-title"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="text-center">
            <FiStar
              className={`w-10 h-10 ${colors.textHighlight} mx-auto mb-4`}
            />
            {/* *** USE REFINED PILOT TITLE *** */}
            <h2
              id="pilot-program-title"
              className={`text-3xl font-bold ${colors.textWhite} mb-4`}
            >
              {t.pilot_title_v2}
            </h2>
            <p className={`text-lg ${colors.textSecondary} max-w-3xl mx-auto`}>
              {t.pilot_body}
            </p>
          </div>
        </motion.section>

        {/* Section 8: Final CTA (Refined) */}
        <motion.section
          className="text-center mt-16 md:mt-24"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          aria-labelledby="cta-title-final"
        >
          {/* Refined CTA Card Structure */}
          <div
            className={`relative ${colors.card} border ${colors.borderAccent} rounded-xl p-12 max-w-3xl mx-auto overflow-hidden shadow-2xl shadow-black/30`}
          >
            {/* Background Glow Element */}
            <div
              className={`absolute -inset-4 ${colors.accent} opacity-10 blur-3xl rounded-full`}
              aria-hidden="true"
            ></div>

            <div className="relative z-10">
              {" "}
              {/* Content above glow */}
              <FiMessageSquare
                className={`w-10 h-10 mx-auto mb-6 ${colors.textHighlight}`}
              />
              {/* *** USE REFINED CTA TITLE & SUBTITLE *** */}
              <h2
                id="cta-title-final"
                className="text-2xl md:text-3xl font-bold mb-4 ${colors.textPrimary}"
              >
                {t.ctaTitle_v2}
              </h2>
              <p
                className={`text-lg ${colors.textSecondary} mb-8 max-w-xl mx-auto`}
              >
                {t.ctaSubtitle_v2}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button
                  to="/anaco" // Adjusted query param
                  variant="primary"
                  size="lg"
                  icon={<FiArrowRight />}
                  className={`group ${sizeLgClasses} ${colors.accent} ${colors.darkTextForAmber} font-bold ${colors.amberHoverGradient} hover:shadow-lg hover:shadow-amber-500/40 transform hover:-translate-y-0.5 animate-pulse ring-1 ring-amber-600/50 !shadow-xl`}
                >
                  {t.ctaButton1}
                </Button>
                <Button
                  to="/contact"
                  variant="secondary"
                  size="lg"
                  className={`group ${sizeLgClasses} bg-slate-900/30 border-2 ${colors.amberBorder}/70 ${colors.textHighlight} hover:bg-amber-500/10 ${colors.amberBorderHover} hover:text-amber-300 backdrop-blur-sm transform hover:-translate-y-0.5`}
                >
                  {t.ctaButton2}
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
