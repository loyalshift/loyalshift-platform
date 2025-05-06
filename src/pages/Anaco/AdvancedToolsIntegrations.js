// src/pages/Anaco/AdvancedToolsIntegration.js
// REFINED: Dark Mode Theme with ANACO Emerald Neon Accents.
// Page showcasing the VISION of an integrated Marketplace with TerraPlan™ analysis.
// Current time: Monday, May 5, 2025 at 7:05 PM CST. San José, Costa Rica.

// src/components/Anaco/FloatingItemsBackgroundAbsolute.js
// VERSION for section background: Uses absolute positioning.
// Background animation with floating dots and ANACO logos.
// Uses Green/White/Grey Theme associated with ANACO.

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PropTypes from "prop-types";
import {
  FiMap,
  FiLayers,
  FiTool,
  FiCheckCircle,
  FiLayout,
  FiHome,
  FiBriefcase,
  FiPackage,
  FiDroplet,
  FiActivity,
  FiWind,
  FiDatabase,
  FiZap,
  FiMessageSquare,
  FiCpu,
  FiLoader,
  FiShare2,
} from "react-icons/fi";

// Reusable Components
import Button from "../../components/Button"; // Assuming Button component exists
import InheritedStyleLink from "../../components/InheritedStyleLink"; // Assuming this exists
import Section from "../../components/Section"; // Assuming this exists and is styled appropriately
import anacoLogoUrl from "../../images/anaco.png";
import FloatingItemsBackground from "../../components/Anaco/FloatingItemsBackground";

// --- Dark Theme Colors with Emerald Accents ---
const colors = {
  gradientFrom: "from-slate-50", // Match the page's light theme base
  gradientTo: "to-emerald-50",
  dotColor: "rgba(22, 163, 74, 0.2)", // Slightly fainter dots for section bg
  background: "bg-gray-950", // Very dark base
  surface: "bg-slate-900", // Slightly lighter surface for cards
  surfaceStrong: "bg-slate-800", // Even lighter, more opaque surface
  primary: "text-emerald-400", // Neon Emerald for primary accents/highlights
  secondary: "text-slate-400", // Muted text
  textPrimary: "text-slate-100", // Main light text
  textDark: "text-slate-900", // For contrast on light elements if needed (e.g., on buttons)
  textWhite: "text-white",
  border: "border-slate-700", // Darker borders
  borderAccent: "border-emerald-500/50", // Subtle neon emerald border accent
  iconColor: "text-emerald-400", // Neon emerald icons
  accentSuccess: "text-lime-400", // Neon Lime Green for success/checkmarks (good contrast)
  // Button styles using Emerald/Green
  buttonPrimaryBg: "bg-gradient-to-r from-emerald-500 to-green-600", // Emerald/Green gradient
  buttonPrimaryHover: "hover:from-emerald-400 hover:to-green-500",
  buttonSecondaryBorder: "border-emerald-500",
  buttonSecondaryText: "text-emerald-400",
  buttonSecondaryHoverBg: "hover:bg-emerald-500/10",
  // Neon Glow Effect (Tailwind arbitrary value) - Using Emerald/Lime
  neonGlowEmerald: "shadow-[0_0_15px_rgba(16,185,129,0.5)]", // Emerald-600 (#10b981) glow
  neonGlowLime: "shadow-[0_0_15px_rgba(163,230,53,0.4)]", // Lime glow (for success)
};

// Configuration (Adjust numbers as desired)
const NUM_DOTS = 50;
const NUM_LOGOS = 7;
const MIN_DOT_SIZE = 2;
const MAX_DOT_SIZE = 5;
const MIN_LOGO_SIZE = 18;
const MAX_LOGO_SIZE = 30;
const MIN_DURATION = 18; // seconds
const MAX_DURATION = 35; // seconds
const MAX_DELAY = 12; // seconds

// --- Helper Function to generate random parameters ---
function generateItemParams(minSize, maxSize) {
  const size = minSize + Math.random() * (maxSize - minSize);
  return {
    x: Math.random() * 100, // Initial horizontal position (%)
    y: Math.random() * 100, // Initial vertical position (%)
    size: size,
    opacity: 0.2 + Math.random() * 0.4, // Opacity range (20% - 60%)
    duration: MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION),
    delay: Math.random() * MAX_DELAY,
    // Random movement extents (percentage of container)
    moveX: (Math.random() - 0.5) * 15, // +/- 7.5% horizontal drift
    moveY: (Math.random() - 0.5) * 20, // +/- 10% vertical drift
    rotate: (Math.random() - 0.5) * 25, // +/- 12.5deg rotation
  };
}

// --- Main Component ---
const FloatingItemsBackgroundAbsolute = () => {
  const [dots, setDots] = useState([]);
  const [logos, setLogos] = useState([]);

  // Generate item parameters on component mount
  useEffect(() => {
    const generatedDots = Array.from({ length: NUM_DOTS }, (_, i) => ({
      id: `dot-${i}`,
      ...generateItemParams(MIN_DOT_SIZE, MAX_DOT_SIZE),
    }));
    const generatedLogos = Array.from({ length: NUM_LOGOS }, (_, i) => ({
      id: `logo-${i}`,
      ...generateItemParams(MIN_LOGO_SIZE, MAX_LOGO_SIZE),
    }));
    setDots(generatedDots);
    setLogos(generatedLogos);
  }, []); // Empty dependency array ensures this runs only once

  return (
    // Use absolute positioning, z-0 (base layer within parent)
    <motion.div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      aria-hidden="true"
    >
      {/* Render Dots */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            backgroundColor: colors.dotColor,
          }}
          animate={{
            x: [`0%`, `${dot.moveX}%`, `0%`],
            y: [`0%`, `${dot.moveY}%`, `0%`],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Render Logos */}
      {logos.map((logo) => (
        <motion.div
          key={logo.id}
          className={`absolute rounded flex items-center justify-center filter drop-shadow-sm`} // Drop shadow for visibility
          style={{
            left: `${logo.x}%`,
            top: `${logo.y}%`,
            width: `${logo.size}px`,
            height: `${logo.size}px`,
            opacity: logo.opacity, // Control overall opacity
          }}
          animate={{
            x: [`0%`, `${logo.moveX}%`, `0%`],
            y: [`0%`, `${logo.moveY}%`, `0%`],
            rotate: [0, logo.rotate, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: logo.duration * 1.2, // Slightly different speed
            delay: logo.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          {/* Use an img tag with the imported URL */}
          <img
            src={anacoLogoUrl} // Use the imported URL path
            alt="" // Decorative, alt text not needed
            className="w-full h-full object-contain" // Fill container, maintain aspect ratio
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

FloatingItemsBackgroundAbsolute.propTypes = {
  // No props currently defined, but could add config props later
};

// --- Animation Variants --- (Keep existing variants)
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};
const cycleTextVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

// --- Reusable Benefit Item Component (Updated Colors) ---
const BenefitItem = ({ icon: Icon = FiCheckCircle, children }) => (
  <li className="flex items-start space-x-3">
    <Icon
      className={`w-6 h-6 ${colors.accentSuccess} mt-0.5 flex-shrink-0`}
      aria-hidden="true"
    />
    <span className={`${colors.textSecondary} text-base md:text-lg`}>
      {children}
    </span>
  </li>
);
BenefitItem.propTypes = {
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
};

// --- Main Component ---
export default function AdvancedToolsIntegration() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const developmentTypes = [
    { name: "Residencial", icon: FiHome },
    { name: "Comercial", icon: FiBriefcase },
    { name: "Industrial", icon: FiPackage },
    { name: "Turístico", icon: FiWind },
    { name: "Agrícola", icon: FiDroplet },
    { name: "Salud", icon: FiActivity },
    { name: "Uso Mixto", icon: FiLayers },
  ];
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationMessageIndex, setSimulationMessageIndex] = useState(0);
  const simulationTimerRef = useRef(null);
  const simulationMessages = [
    "Cargando datos del terreno...",
    "Analizando topografía y acceso...",
    "Consultando normativas...",
    "Calculando potencial de desarrollo...",
    "Generando estimación de pre-aprobación...",
    "¡Propuesta preliminar lista!",
  ];
  const simulationInterval = 1500;

  useEffect(() => {
    /* ... simulation effect ... */
    if (isSimulating) {
      simulationTimerRef.current = setInterval(() => {
        setSimulationMessageIndex(
          (prevIndex) => (prevIndex + 1) % simulationMessages.length
        );
      }, simulationInterval);
    } else {
      clearInterval(simulationTimerRef.current);
    }
    return () => clearInterval(simulationTimerRef.current);
  }, [isSimulating, simulationMessages.length]);

  const handleHoverStart = () => {
    if (!isSimulating) {
      setSimulationMessageIndex(0);
    }
    setIsSimulating(true);
  };
  const handleHoverEnd = () => {
    setIsSimulating(false);
    setSimulationMessageIndex(0);
  };

  return (
    // Apply base dark background and primary text color
    <div className={`${colors.background} ${colors.textPrimary} font-sans`}>
      <main>
        <FloatingItemsBackground />
        {/* Hero Section */}
        <Section
          bg="bg-transparent"
          className="pt-20 md:pt-28 pb-16 md:pb-20"
          ariaLabelledby="vision-hero-title"
        >
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-5 rounded-full ${colors.surface} border ${colors.borderAccent} ${colors.neonGlowEmerald}`}
            >
              {/* Emerald Glow */}
              <FiZap className={`w-12 h-12 ${colors.iconColor}`} />{" "}
              {/* Use Emerald Icon Color */}
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="vision-hero-title"
              className={`text-4xl md:text-5xl font-bold ${colors.textWhite} mb-5 [text-shadow:0_0_10px_rgba(16,185,129,0.5)]`}
            >
              {" "}
              {/* Emerald Text shadow */}
              Nuestra Visión: Integración Avanzada de Herramientas
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-3xl mx-auto`}
            >
              Imagine un ecosistema donde el análisis de propiedades con {""}
              <InheritedStyleLink
                to="/anaco/terraplan"
                hoverColorClass={`hover:${colors.primary}`}
              >
                {" "}
                {/* Use Emerald Hover */}
                TerraPlan™
              </InheritedStyleLink>{" "}
              se conecta directamente con la pre-aprobación hipotecaria dentro
              de ANACO Conecta, agilizando todo el proceso.
            </motion.p>
          </motion.div>
        </Section>

        {/* Conceptual Workflow Section */}
        <Section
          bg={colors.surfaceStrong}
          className={`border-y ${colors.border}`}
          ariaLabelledby="workflow-title"
        >
          <motion.h2
            variants={fadeInUp}
            id="workflow-title"
            className={`text-3xl font-bold ${colors.textWhite} text-center mb-12 md:mb-16`}
          >
            Visualizando el Futuro Flujo de Trabajo
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Step 1: Find Property Card */}
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.surface} border ${colors.border} shadow-lg ${colors.neonGlowEmerald} flex flex-col h-full`}
            >
              {" "}
              {/* Emerald Glow */}
              <FiDatabase
                className={`w-10 h-10 ${colors.iconColor} mx-auto mb-3`}
              />
              <h3
                className={`text-lg font-semibold ${colors.textPrimary} mb-2`}
              >
                1. Explore Propiedades
              </h3>
              <p className={`text-sm ${colors.textSecondary} mb-4 flex-grow`}>
                Navegue un posible mercado de listados verificados.
              </p>
              <div className="aspect-[4/3] mt-auto rounded overflow-hidden shadow-inner bg-slate-700 border border-slate-600">
                <img
                  src="/images/property-mock-1.jpeg"
                  alt="Mockup de listado de propiedad"
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
              </div>
            </motion.div>

            {/* Step 2: Run TerraPlan™ Card */}
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.surface} border ${colors.border} shadow-lg ${colors.neonGlowEmerald} flex flex-col h-full`}
            >
              {" "}
              {/* Emerald Glow */}
              <FiMap className={`w-10 h-10 ${colors.iconColor} mx-auto mb-3`} />
              <h3
                className={`text-lg font-semibold ${colors.textPrimary} mb-2`}
              >
                2. Analice con TerraPlan™
              </h3>
              <p className={`text-sm ${colors.textSecondary} mb-4 flex-grow`}>
                Ejecute análisis de terreno y potencial directamente en el
                listado.
              </p>
              <div className="aspect-[4/3] mt-auto rounded overflow-hidden shadow-inner bg-slate-700 border border-slate-600">
                <img
                  src="/images/air-view-sonar.webp"
                  alt="Análisis TerraPlan™"
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                />
              </div>
            </motion.div>

            {/* Step 3: Automated Insight Card */}
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${colors.surface} border ${colors.border} shadow-lg ${colors.neonGlowLime} flex flex-col h-full`}
            >
              {" "}
              {/* Lime Glow */}
              <FiCheckCircle
                className={`w-10 h-10 ${colors.accentSuccess} mx-auto mb-3`}
              />
              <h3
                className={`text-lg font-semibold ${colors.textPrimary} mb-2`}
              >
                3. Pre-Aprobación Inteligente*
              </h3>
              <p className={`text-sm ${colors.textSecondary} mb-4 flex-grow`}>
                Combine análisis y perfil para obtener una estimación
                instantánea.
              </p>
              {/* Hover Simulation Area */}
              <motion.div
                className={`aspect-[4/3] mt-auto ${colors.surfaceStrong} border ${colors.borderAccent} rounded flex flex-col items-center justify-center ${colors.textPrimary} text-xs p-4 overflow-hidden relative cursor-pointer`}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                title="Pase el ratón para simular análisis"
              >
                <AnimatePresence mode="wait">
                  {isSimulating ? (
                    <motion.div
                      key={simulationMessageIndex}
                      className={`flex flex-col items-center justify-center text-center absolute inset-0 ${colors.surfaceStrong}/95 backdrop-blur-sm p-2`}
                      variants={cycleTextVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <FiLoader
                        className={`w-5 h-5 ${colors.iconColor} animate-spin mb-2`}
                      />
                      <p className="font-medium text-sm leading-tight">
                        {" "}
                        {simulationMessages[simulationMessageIndex]}{" "}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-center ${colors.accentSuccess}`}
                    >
                      <FiCheckCircle className="w-10 h-10 mx-auto mb-1 opacity-50" />
                      <span className="font-medium text-xs block">
                        Simular Análisis
                      </span>
                      <span className="font-medium text-xs block">
                        (Pasar Ratón)
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
          <motion.p
            variants={fadeInUp}
            className={`text-xs text-center ${colors.textSecondary} mt-6`}
          >
            *La pre-aprobación inteligente es conceptual...
          </motion.p>
        </Section>

        {/* Potential Integration / Custom UI Section */}
        <Section bg="bg-transparent" ariaLabelledby="integration-title">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div variants={fadeInUp}>
              <h2
                id="integration-title"
                className={`text-3xl font-bold ${colors.textWhite} mb-4 [text-shadow:0_0_8px_rgba(16,185,129,0.4)]`}
              >
                Potencial de Integración Futura
              </h2>{" "}
              {/* Emerald shadow */}
              <p
                className={`${colors.textSecondary} text-lg leading-relaxed mb-6`}
              >
                {" "}
                Nuestra visión incluye extender estas capacidades
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiLayout
                    className={`w-7 h-7 mr-4 mt-1 ${colors.iconColor}`}
                  />
                  <span className={colors.textPrimary}>
                    <strong>APIs para Socios Clave:</strong> Integración en
                    herramientas propias
                  </span>
                </li>
                <li className="flex items-start">
                  <FiTool className={`w-7 h-7 mr-4 mt-1 ${colors.iconColor}`} />
                  <span className={colors.textPrimary}>
                    <strong>Componentes Incrustables:</strong> Widgets seguros
                    para sitios de socios
                  </span>
                </li>
              </ul>
              <p className={`${colors.textSecondary} text-base mt-5`}>
                {" "}
                Creando un ecosistema más conectado
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="aspect-[4/3] mt-auto rounded overflow-hidden shadow-inner bg-slate-700 border border-slate-600">
                <img
                  src="/images/business.jpeg"
                  alt="Análisis TerraPlan™"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Call to Action for Vision */}
        <Section ariaLabelledby="vision-cta-title">
          <motion.div
            variants={fadeInUp}
            className={`text-center max-w-3xl mx-auto p-10 rounded-xl ${colors.surfaceStrong} border ${colors.borderAccent} shadow-xl ${colors.neonGlowEmerald}`} // Emerald glow
          >
            <FiCpu className={`w-12 h-12 ${colors.iconColor} mx-auto mb-4`} />
            <h2
              id="vision-cta-title"
              className={`text-3xl font-bold ${colors.textWhite} mb-4`}
            >
              ¿Interesado en Co-Crear Este Futuro?
            </h2>
            <p className={`text-lg ${colors.textSecondary} mb-8`}>
              {" "}
              Esta visión representa la próxima evolución de ANACO Conecta...
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                to="/anaco/contact?subject=Interes%20Vision%20Herramientas%20Avanzadas"
                variant="primary" // Button component should use new emerald gradient styles
                size="lg"
                icon={<FiMessageSquare />}
                // Add explicit classes if Button doesn't handle variant well
                className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.textWhite} shadow-lg ${colors.neonGlowEmerald}`} // Emerald glow
              >
                Registrar Interés / Compartir Ideas
              </Button>
            </div>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
BenefitItem.propTypes = {
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
};
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};
// Button PropTypes should be defined in Button.js
