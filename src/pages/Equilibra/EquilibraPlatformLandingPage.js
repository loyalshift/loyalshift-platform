// src/pages/Equilibra/EquilibraLandingPage.js
// Main landing page for the envisioned "Equilibra Contigo" platform.
// REFINED: Updated with the new color palette for a calming, supportive, and professional aesthetic.
// Current time: Friday, May 16, 2025 at 3:00 PM CST.

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiArrowRight,
  FiSend,
  FiHeart,
  FiZap,
  FiTarget,
  FiCheckCircle,
  FiMove,
  FiInfo,
  FiAward,
  FiTool,
  FiActivity,
  FiCalendar,
  FiBookOpen,
  FiEdit3,
  FiMessageSquare,
  FiSmile,
  FiSunrise,
  FiMoon,
  FiFeather,
  FiLink,
  FiDownload,
  FiLock,
  FiBarChart2,
  FiShield,
  FiThumbsUp,
  FiPlayCircle,
  FiLayout,
} from "react-icons/fi";

// Reusable Components
import Button from "../../components/Button"; // Assuming Button is styled or accepts className overrides
import Section from "../../components/Section"; // Assuming Section is styled or adaptable
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.svg";

// --- Equilibra CR New Color Palette ---
const colors = {
  background: "bg-[#FFF7F2]", // Neutral Light – Cream White (Page background)
  surface: "bg-white", // White for cards
  surfaceMuted: "bg-[#FDB386]/20", // Primary Color (Soft Peach) with low opacity for less prominent cards
  border: "border-[#A89C94]/40", // Muted Taupe for main borders
  borderLight: "border-[#F7C6B7]/60", // Secondary Color (Blush Pink) for lighter borders
  borderAccent: "border-[#E86F51]/50", // Accent Color (Coral Red) for accent borders
  textPrimary: "text-[#5C5C5C]", // Typography – Warm Gray (for headings and primary text)
  textBody: "text-[#5C5C5C]/90", // Slightly lighter Warm Gray for body text for better softness
  textSecondary: "text-[#A89C94]", // Complementary – Muted Taupe (for secondary/less important text)
  textHighlight: "text-[#E86F51]", // Accent Color – Coral Red (for important highlights, links)
  iconColor: "text-[#E86F51]", // Accent Color – Coral Red
  buttonPrimaryBg: "bg-[#E86F51]", // Accent Color – Coral Red
  buttonPrimaryHover: "hover:bg-[#d95f41]", // Darker Coral Red
  buttonSecondaryBg: "bg-[#F7C6B7]", // Secondary Color – Blush Pink
  buttonSecondaryHover: "hover:bg-[#f5b8a9]", // Darker Blush Pink
  buttonSecondaryText: "text-[#5C5C5C]", // Warm Gray for text on blush pink
  buttonTextLight: "text-white", // For text on Coral Red buttons
  success: "text-emerald-600", // Keeping a distinct success green for checkmarks
  // For horizontal scroll background transformation
  scrollBgStart: "#FFF7F2", // Cream White
  scrollBgMid: "rgba(253, 179, 134, 0.1)", // Very Light Soft Peach (Soft Peach #FDB386 with low opacity)
  scrollBgEnd: "#FFF7F2", // Cream White
  heroGradient: "bg-gradient-to-br from-[#FFF7F2] to-[#FDEBDA]", // Cream White to Light Soft Peach (#FDB386 at low opacity)
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.2) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});
const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
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
      className={`py-16 md:py-20 transition-colors duration-300 ease-in-out overflow-hidden`}
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
        className="overflow-x-auto pb-10 scrollbar-thin scrollbar-thumb-[#A89C94]/50 scrollbar-track-transparent scrollbar-thumb-rounded-full"
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
              className={`flex-shrink-0 w-[260px] md:w-[300px] h-full rounded-xl shadow-xl p-6 ${colors.surface} border ${colors.borderLight} flex flex-col hover:border-[#E86F51]/40 transition-all duration-300 ease-in-out`}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 20px rgba(92,92,92,0.1)",
              }} // Warm Gray shadow
            >
              <div
                className={`p-3 rounded-lg bg-[#E86F51]/10 self-start mb-4 shadow-sm`}
              >
                <item.icon className={`w-7 h-7 ${colors.textHighlight}`} />
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
          <div className="flex-shrink-0 w-[260px] md:w-[300px] flex flex-col items-center justify-center text-center p-6 opacity-60">
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
  /* ... */
};

// --- Resource Card Component ---
const ResourceCard = ({ icon: Icon, title, type, summary, link = "#" }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex flex-col p-6 rounded-xl shadow-lg h-full ${colors.surface} border ${colors.borderLight} hover:shadow-xl hover:border-[#E86F51]/60 transition-all duration-300 group`}
    whileHover={{ y: -5 }}
  >
    <div className={`p-3 rounded-lg bg-[#E86F51]/10 self-start mb-4 shadow-sm`}>
      <Icon className={`w-8 h-8 ${colors.textHighlight}`} />
    </div>
    <span
      className={`text-xs font-semibold uppercase ${colors.textHighlight} mb-1`}
    >
      {type}
    </span>
    <h3
      className={`text-lg font-bold ${colors.textPrimary} mb-2 group-hover:${colors.textHighlight} transition-colors`}
    >
      {title}
    </h3>
    <p
      className={`${colors.textSecondary} text-sm flex-grow leading-relaxed mb-4`}
    >
      {summary}
    </p>
    <div className="mt-auto">
      <Link
        to={link}
        className={`inline-flex items-center text-sm font-medium ${colors.textHighlight} hover:text-[#c65c41] group-hover:underline`}
      >
        Leer Más{" "}
        <FiArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  </motion.div>
);
ResourceCard.propTypes = {
  /* ... */
};

// --- Mock Client Progress Item ---
const ProgressItem = ({ date, entryType, content, mood }) => (
  <motion.div
    variants={fadeInUp}
    className={`p-4 rounded-lg ${colors.surfaceMuted} border ${colors.border}`}
  >
    <div className="flex justify-between items-center mb-1">
      <span className={`text-xs font-semibold ${colors.textHighlight}`}>
        {entryType}
      </span>
      <span className={`text-xs ${colors.textSecondary}`}>{date}</span>
    </div>
    <p className={`${colors.textPrimary} text-sm mb-1`}>{content}</p>
    {mood && (
      <p className={`text-xs ${colors.textSecondary}`}>
        Estado de ánimo:{" "}
        <span className={`font-medium text-[#E86F51]/90`}>{mood}</span>
      </p>
    )}
  </motion.div>
);
ProgressItem.propTypes = {
  /* ... */
};

// --- Main Equilibra "Platform" Landing Page Component ---
export default function EquilibraLandingPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });
  const [mockMessage, setMockMessage] = useState("");

  const platformPillars = [
    {
      icon: FiHeart,
      title: "Alimentación Intuitiva",
      description:
        "Reconecta con las señales de hambre y saciedad de tu cuerpo. Aprende a comer sin culpa ni restricciones.",
    },
    {
      icon: FiActivity,
      title: "Movimiento Consciente",
      description:
        "Descubre formas de mover tu cuerpo que te brinden alegría y energía, en lugar de castigo.",
    },
    {
      icon: FiSmile,
      title: "Auto-compasión y Aceptación",
      description:
        "Cultiva una relación amable y respetuosa contigo mismo/a, independientemente de tu forma o tamaño corporal.",
    },
    {
      icon: FiBookOpen,
      title: "Recursos Educativos Confiables",
      description:
        "Accede a información basada en evidencia sobre nutrición, TCA y bienestar, curada por tu nutricionista.",
    },
  ];

  const mockResources = [
    {
      icon: FiBookOpen,
      title: "Guía Práctica de Alimentación Intuitiva",
      type: "Artículo",
      summary:
        "Pasos sencillos para empezar a escuchar a tu cuerpo y dejar atrás las dietas.",
      link: "#resource1",
    },
    {
      icon: FiFeather,
      title: "Meditación Guiada: Conexión Corporal",
      type: "Audio",
      summary:
        "Una meditación de 10 minutos para cultivar la presencia y la aceptación de tu cuerpo.",
      link: "#resource2",
    },
    {
      icon: FiZap,
      title: "5 Mitos Comunes sobre los TCA",
      type: "Infografía",
      summary:
        "Desmontando ideas erróneas para fomentar la comprensión y el apoyo.",
      link: "#resource3",
    },
  ];

  const mockProgress = [
    {
      date: "14 Mayo, 2025",
      entryType: "Diario Alimentario Intuitivo",
      content:
        "Hoy comí cuando tuve hambre y paré cuando me sentí satisfecha. Elegí alimentos que me apetecían.",
      mood: "Tranquila",
    },
    {
      date: "13 Mayo, 2025",
      entryType: "Reflexión de Movimiento",
      content:
        "Disfruté una caminata suave en la naturaleza, me sentí conectada y con energía.",
      mood: "Energizada",
    },
  ];

  const handleMockMessageSend = (e) => {
    e.preventDefault();
    if (mockMessage.trim()) {
      alert(`Mensaje enviado a tu nutricionista (simulado): "${mockMessage}"`);
      setMockMessage("");
    }
  };

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section for "Equilibra Contigo" */}
        <Section
          bg={colors.heroGradient}
          className="relative pt-24 md:pt-32 pb-16 md:pb-20 text-center overflow-hidden border-b ${colors.borderLight}"
          ariaLabelledby="equilibra-platform-hero"
        >
          <div className="absolute inset-0 opacity-[0.02] bg-[url('/public/images/financial-texture.png')] bg-repeat"></div>
          <motion.div
            className="max-w-3xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer()}
          >
            <motion.div variants={scaleUp} className="mb-6">
              <FiSmile
                className={`h-16 md:h-20 w-auto mx-auto ${colors.textHighlight}`}
              />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="equilibra-platform-hero"
              className={`text-4xl sm:text-5xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
            >
              Bienvenida a{" "}
              <span className={colors.textHighlight}>Equilibra Contigo</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto mb-8`}
            >
              Tu espacio digital personalizado para nutrir tu bienestar,
              conectar con tu nutricionista y avanzar en tu camino hacia una
              relación saludable con la comida y tu cuerpo.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                to="#pilares" // Smooth scroll to pillars section
                variant="custom"
                size="lg"
                icon={<FiArrowRight />}
                className={`${colors.buttonPrimaryBg} ${colors.buttonTextLight} ${colors.buttonPrimaryHover} shadow-lg`}
              >
                Explorar mis Herramientas
              </Button>
              <Button
                to="/equilibra/contact" // Link to Equilibra's contact page
                variant="custom"
                size="lg"
                className={`bg-transparent border-2 ${colors.borderAccent} ${colors.textHighlight} hover:bg-[#E86F51]/10 hover:border-[#E86F51]`}
              >
                Contactar con Equilibra
              </Button>
            </motion.div>
          </motion.div>
        </Section>

        {/* Horizontal Scroll Section for Pillars */}
        <div id="pilares">
          <HorizontalScrollSection
            items={platformPillars}
            sectionTitle="Tu Camino hacia el Equilibrio"
            sectionSubtitle="Principios fundamentales que guían tu experiencia en 'Equilibra Contigo'."
          />
        </div>

        {/* Mock Resource Library Section */}
        <Section
          bg={colors.surface}
          className={`py-16 md:py-20 border-y ${colors.borderLight}`}
          ariaLabelledby="resources-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="resources-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-12 md:mb-16`}
          >
            Descubre tus Recursos de Apoyo
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch"
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {mockResources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </motion.div>
        </Section>

        {/* Mock Client Progress & Messaging Section */}
        <Section
          bg={colors.background}
          className="py-16 md:py-20"
          ariaLabelledby="progress-messaging-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="progress-messaging-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-12 md:mb-16`}
          >
            Tu Viaje y Conexión
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 max-w-5xl mx-auto">
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-xl shadow-lg ${colors.surface} border ${colors.borderLight}`}
            >
              <h3
                className={`text-xl font-semibold ${colors.textPrimary} mb-4 flex items-center`}
              >
                <FiTarget className={`mr-2 ${colors.iconColor}`} /> Mi Progreso
                Holístico
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-stone-100 pr-2">
                {mockProgress.map((item, index) => (
                  <ProgressItem key={index} {...item} />
                ))}
                <p className={`text-xs ${colors.textMuted} text-center pt-2`}>
                  Más entradas en tu diario...
                </p>
              </div>
              <Button
                to="#"
                variant="custom"
                size="base"
                className={`mt-4 w-full bg-transparent border ${colors.borderAccent} ${colors.textHighlight} hover:bg-[#E86F51]/10`}
                icon={<FiEdit3 />}
              >
                Abrir Mi Diario Completo
              </Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-xl shadow-lg ${colors.surface} border ${colors.borderLight} flex flex-col`}
            >
              <h3
                className={`text-xl font-semibold ${colors.textPrimary} mb-4 flex items-center`}
              >
                <FiMessageSquare className={`mr-2 ${colors.iconColor}`} />{" "}
                Conecta con tu Nutri
              </h3>
              <div
                className={`flex-grow p-4 rounded-md ${colors.surfaceMuted} border ${colors.border} mb-4 min-h-[150px] flex items-center justify-center`}
              >
                <p className={`${colors.textSecondary} text-sm italic`}>
                  (Aquí se mostraría la interfaz de mensajería segura)
                </p>
              </div>
              <form onSubmit={handleMockMessageSend} className="flex gap-2">
                <input
                  type="text"
                  value={mockMessage}
                  onChange={(e) => setMockMessage(e.target.value)}
                  placeholder="Escribe un mensaje rápido..."
                  className={`flex-grow p-2.5 text-sm ${colors.background} border ${colors.border} rounded-md focus:outline-none focus:ring-1 focus:ring-[#E86F51] placeholder:${colors.textSecondary}`}
                />
                <Button
                  type="submit"
                  variant="custom"
                  className={`${colors.buttonPrimaryBg} ${colors.buttonTextLight} ${colors.buttonPrimaryHover} p-2.5`}
                  aria-label="Enviar Mensaje"
                >
                  <FiSend className="w-5 h-5" />
                </Button>
              </form>
            </motion.div>
          </div>
        </Section>

        {/* Final CTA for this page (e.g., book next session with Equilibra CR) */}
        <Section
          bg={`bg-[#FDB386]/20`}
          className="py-16 md:py-20 text-center border-t ${colors.borderLight}"
          ariaLabelledby="platform-cta-title"
        >
          {" "}
          {/* Soft Peach subtle bg */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-2xl mx-auto"
          >
            <FiCalendar
              className={`w-12 h-12 ${colors.iconColor} mx-auto mb-6`}
            />
            <h2
              id="platform-cta-title"
              className={`text-3xl font-bold ${colors.textPrimary} mb-4`}
            >
              ¿Lista para tu Próxima Sesión?
            </h2>
            <p
              className={`text-lg ${colors.textSecondary} mb-8 max-w-xl mx-auto`}
            >
              Agenda tu seguimiento, explora nuevos recursos o simplemente
              comparte cómo te sientes. Estamos aquí para apoyarte.
            </p>
            <Button
              to="/equilibra/contact" // Link to Equilibra's contact page
              variant="custom"
              size="xl"
              icon={<FiArrowRight />}
              className={`${colors.buttonPrimaryBg} ${colors.buttonTextLight} ${colors.buttonPrimaryHover} shadow-xl`}
            >
              Contactar a Equilibra CR
            </Button>
          </motion.div>
        </Section>

        <p
          className={`text-center text-sm ${colors.textSecondary} mt-16 pb-16 flex items-center justify-center gap-1.5`}
        >
          <FiInfo size={14} /> Plataforma 'Equilibra Contigo' (Visión Demo) -{" "}
          {currentTime}
        </p>
      </main>
    </div>
  );
}

// --- PropTypes ---
EquilibraLandingPage.propTypes = {};
HorizontalScrollSection.propTypes = {
  /* ... */
};
ResourceCard.propTypes = {
  /* ... */
};
ProgressItem.propTypes = {
  /* ... */
};
Section.propTypes = {
  /* ... */
};
Button.propTypes = {
  /* ... */
};
