// src/pages/Afc/AFCCommunityPage.js
// Page showcasing AFC's community events, races, and courses.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 3:30 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiUsers,
  FiAward,
  FiCalendar,
  FiShield,
  FiHeart,
  FiMapPin,
  FiArrowRight,
  FiInfo,
  FiSun,
  FiZap, // Added FiSun, FiZap
} from "react-icons/fi";

// Reusable Components
import Button from "../../components/Button";
import Section from "../../components/Section";

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

// --- Event/Course Card Component ---
const EventCard = ({ event }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex flex-col ${colors.surface} rounded-xl shadow-lg border ${colors.borderLight} overflow-hidden h-full group hover:shadow-xl transition-all duration-300`}
    whileHover={{ y: -5 }}
  >
    {event.image && (
      <div className="aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    )}
    {!event.image && (
      <div
        className={`aspect-video ${colors.surfaceAccent} flex items-center justify-center border-b ${colors.borderLight}`}
      >
        <event.icon className={`w-16 h-16 ${colors.accentRed} opacity-30`} />
      </div>
    )}
    <div className="p-6 flex flex-col flex-grow">
      <div className="mb-3">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colors.accentRedBg} bg-opacity-10 text-red-700 border border-red-200`}
        >
          {event.category}
        </span>
      </div>
      <h3
        className={`text-xl font-bold ${colors.textPrimary} mb-2 group-hover:${colors.accentRed} transition-colors`}
      >
        {event.title}
      </h3>
      <p className={`text-sm ${colors.textSecondary} mb-1 flex items-center`}>
        <FiCalendar className="w-4 h-4 mr-2 opacity-70" /> {event.date}{" "}
        {event.time && ` - ${event.time}`}
      </p>
      {event.location && (
        <p className={`text-sm ${colors.textSecondary} mb-3 flex items-center`}>
          <FiMapPin className="w-4 h-4 mr-2 opacity-70" /> {event.location}
        </p>
      )}
      <p
        className={`${colors.textMuted} text-sm flex-grow leading-relaxed mb-4`}
      >
        {event.description}
      </p>
      <div className="mt-auto">
        <Button
          to={event.link || `/afc/events/${event.id}`} // Placeholder link
          variant="secondary"
          size="base"
          icon={<FiArrowRight />}
          className={`w-full !border-red-500/50 !text-red-600 hover:!bg-red-500/10`}
        >
          Más Información e Inscripción
        </Button>
      </div>
    </div>
  </motion.div>
);
EventCard.propTypes = { event: PropTypes.object.isRequired };

// --- Main AFC Community Page Component ---
export default function AFCCommunityPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  const communityEvents = [
    {
      id: "race001",
      title: "Carrera Benéfica AFC 5K/10K",
      category: "Carrera Benéfica",
      date: "Sábado, 15 de Julio, 2025",
      time: "7:00 AM",
      location: "Parque Central de Cartago",
      description:
        "¡Corre por una causa! Fondos recaudados para el comedor infantil local. Categorías para todas las edades y niveles.",
      icon: FiAward,
      image: "/images/afc-race.jpg",
    },
    {
      id: "defense001",
      title: "Taller de Defensa Personal para Mujeres",
      category: "Curso Especial",
      date: "Sábados de Agosto (4 sesiones)",
      time: "10:00 AM - 12:00 PM",
      location: "Athletic Functional Center, El Tejar",
      description:
        "Aprende técnicas básicas y efectivas de defensa personal en un ambiente seguro y de apoyo. Impartido por instructora certificada.",
      icon: FiShield,
      image: "/images/afc-defense.jpg",
    },
    {
      id: "event001",
      title: "Día de la Comunidad AFC: Retos y Convivio",
      category: "Evento Especial",
      date: "Domingo, 3 de Septiembre, 2025",
      time: "9:00 AM - 2:00 PM",
      location: "Athletic Functional Center & Zonas Verdes",
      description:
        "Una jornada de desafíos amistosos, clases especiales al aire libre, comida saludable y mucha camaradería. ¡Trae a tu familia!",
      icon: FiUsers,
      image: "/images/afc-outdoors.jpg",
    },
    {
      id: "outdoor001",
      title: "Entrenamiento Funcional al Amanecer en el Volcán",
      category: "Evento Especial",
      date: "Sábado, 21 de Octubre, 2025",
      time: "6:00 AM (Salida)",
      location: "Volcán Irazú (Punto de encuentro AFC)",
      description:
        "Experimenta la energía de un entrenamiento funcional en un entorno natural espectacular. Cupo limitado.",
      icon: FiSun,
      image: "/images/afc-mountain-walk.jpg",
    },
  ];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className="relative pt-24 md:pt-32 pb-16 md:pb-20 text-center overflow-hidden border-b ${colors.borderLight}"
          ariaLabelledby="afc-community-hero"
        >
          <motion.div
            className="max-w-3xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer()}
          >
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-6 rounded-full ${colors.surfaceAccent} border ${colors.borderAccent}`}
            >
              <FiUsers className={`w-12 h-12 ${colors.iconColor}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="afc-community-hero"
              className={`text-4xl sm:text-5xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
            >
              Nuestra <span className={colors.accentRed}>Comunidad AFC</span>:
              Fuerza en Unidad
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              En Athletic Functional Center, creemos que el fitness es más
              poderoso cuando se comparte. Descubre nuestros eventos, carreras y
              cursos diseñados para unir, inspirar y fortalecer a nuestra
              increíble comunidad.
            </motion.p>
          </motion.div>
        </Section>

        {/* Events, Races, Courses Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-24`}
          ariaLabelledby="community-activities-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="community-activities-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-12 md:mb-16`}
          >
            Actividades Comunitarias Destacadas
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch" // items-stretch for equal height cards
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {communityEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mt-16"
          >
            <Button
              to="/afc/contact?subject=ConsultaEventosComunitarios"
              variant="primary"
              size="lg"
              icon={<FiCalendar />}
              className={`${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover} shadow-lg hover:shadow-xl`}
            >
              Proponer un Evento o Inscribirse
            </Button>
          </motion.div>
        </Section>

        {/* Call to Action: Join the Community */}
        <Section
          bg={colors.surfaceAccent}
          className="py-20 md:py-24 text-center border-t ${colors.borderLight}"
          ariaLabelledby="join-community-cta"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-2xl mx-auto"
          >
            <FiHeart className={`w-12 h-12 ${colors.accentRed} mx-auto mb-6`} />
            <h2
              id="join-community-cta"
              className={`text-3xl font-bold ${colors.textPrimary} mb-4`}
            >
              Sé Parte de Algo Más Grande
            </h2>
            <p
              className={`text-lg ${colors.textSecondary} mb-8 max-w-xl mx-auto`}
            >
              La comunidad AFC es el corazón de nuestro centro. Te invitamos a
              unirte, participar y crecer con nosotros. ¡Tu energía y entusiasmo
              son bienvenidos!
            </p>
            <Button
              to="/afc/enroll"
              variant="primary"
              size="xl"
              icon={<FiUsers />}
              className={`${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover} shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all`}
            >
              Inscríbete!
            </Button>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
AFCCommunityPage.propTypes = {};
EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    image: PropTypes.string, // Optional image path
    link: PropTypes.string,
  }).isRequired,
};
Section.propTypes = {
  /* ... */
};
Button.propTypes = {
  /* ... */
};
