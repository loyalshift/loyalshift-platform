// src/pages/Afc/AFCSchedulePage.js
// Page to display Athletic Functional Center's (AFC) class schedule.
// Features a weekly view with daily class listings.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 3:50 PM CST.

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiZap,
  FiArrowRight,
  FiInfo,
  FiUser,
  FiChevronRight,
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import Section from "../../components/Section";
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.svg";

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
  buttonTextLight: "text-white",
  tabActiveBg: "bg-red-600",
  tabActiveText: "text-white",
  tabInactiveBg: "bg-slate-200",
  tabInactiveText: "text-slate-700",
  tabHoverBg: "hover:bg-red-500/20",
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = (staggerChildren = 0.05, delayChildren = 0) => ({
  // Faster stagger for class items
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});
const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};
const classItemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

// --- Mock Schedule Data ---
const weeklyScheduleData = {
  Lunes: [
    {
      id: "LUN01",
      time: "6:15 AM",
      name: "AFC Functional Strength",
      instructor: "Ana V.",
      duration: "60 min",
      type: "Fuerza",
      spots: 5,
    },
    {
      id: "LUN02",
      time: "7:30 AM",
      name: "Mindful Kettlebell Flow",
      instructor: "Carlos M.",
      duration: "60 min",
      type: "Técnica/Flow",
      spots: 3,
    },
    {
      id: "LUN03",
      time: "5:00 PM",
      name: "MetCon Blast",
      instructor: "Laura S.",
      duration: "45 min",
      type: "Cardio/Resistencia",
      spots: 8,
    },
    {
      id: "LUN04",
      time: "6:15 PM",
      name: "AFC Functional Strength (Noche)",
      instructor: "Ana V.",
      duration: "60 min",
      type: "Fuerza",
      spots: 2,
    },
  ],
  Martes: [
    {
      id: "MAR01",
      time: "7:00 AM",
      name: "Movilidad y Recuperación Activa",
      instructor: "Sofia P.",
      duration: "50 min",
      type: "Bienestar",
      spots: 10,
    },
    {
      id: "MAR02",
      time: "5:30 PM",
      name: "Entrenamiento de Resistencia",
      instructor: "Marco R.",
      duration: "60 min",
      type: "Resistencia",
      spots: 0,
    },
    {
      id: "MAR03",
      time: "6:45 PM",
      name: "Kettlebell Sport (Intro)",
      instructor: "Carlos M.",
      duration: "75 min",
      type: "Especialidad",
      spots: 6,
    },
  ],
  Miércoles: [
    // Note: Using "Miércoles" for correct display
    {
      id: "MIE01",
      time: "6:15 AM",
      name: "AFC Functional Strength",
      instructor: "Ana V.",
      duration: "60 min",
      type: "Fuerza",
      spots: 7,
    },
    {
      id: "MIE02",
      time: "7:30 AM",
      name: "Mindful Kettlebell Flow",
      instructor: "Carlos M.",
      duration: "60 min",
      type: "Técnica/Flow",
      spots: 1,
    },
    {
      id: "MIE03",
      time: "5:00 PM",
      name: "MetCon Blast",
      instructor: "Laura S.",
      duration: "45 min",
      type: "Cardio/Resistencia",
      spots: 9,
    },
  ],
  Jueves: [
    {
      id: "JUE01",
      time: "7:00 AM",
      name: "Movilidad y Recuperación Activa",
      instructor: "Sofia P.",
      duration: "50 min",
      type: "Bienestar",
      spots: 12,
    },
    {
      id: "JUE02",
      time: "5:30 PM",
      name: "Entrenamiento de Resistencia",
      instructor: "Marco R.",
      duration: "60 min",
      type: "Resistencia",
      spots: 4,
    },
    {
      id: "JUE03",
      time: "6:45 PM",
      name: "Strongman/Strongwoman Basics",
      instructor: "Ana V.",
      duration: "75 min",
      type: "Especialidad",
      spots: 5,
    },
  ],
  Viernes: [
    {
      id: "VIE01",
      time: "6:15 AM",
      name: "AFC Functional Strength",
      instructor: "Carlos M.",
      duration: "60 min",
      type: "Fuerza",
      spots: 6,
    },
    {
      id: "VIE02",
      time: "7:30 AM",
      name: "Mindful Kettlebell Flow (Avanzado)",
      instructor: "Carlos M.",
      duration: "60 min",
      type: "Técnica/Flow",
      spots: 2,
    },
    {
      id: "VIE03",
      time: "4:30 PM",
      name: "Team WOD Challenge",
      instructor: "Equipo AFC",
      duration: "90 min",
      type: "Comunidad",
      spots: 15,
    },
  ],
  Sábado: [
    {
      id: "SAB01",
      time: "8:00 AM",
      name: "Clase Comunitaria Gratuita",
      instructor: "Equipo AFC",
      duration: "60 min",
      type: "Comunidad",
      spots: 20,
    },
    {
      id: "SAB02",
      time: "9:30 AM",
      name: "Open Gym / Práctica Libre",
      instructor: "Supervisado",
      duration: "120 min",
      type: "Libre",
      spots: null,
    },
    {
      id: "SAB03",
      time: "11:00 AM",
      name: "Taller: Fundamentos de Halterofilia",
      instructor: "Marco R.",
      duration: "90 min",
      type: "Taller",
      spots: 8,
    },
  ],
  Domingo: [
    {
      id: "DOM01",
      time: "9:00 AM",
      name: "Yoga Restaurativo y Movilidad",
      instructor: "Sofia P.",
      duration: "75 min",
      type: "Bienestar",
      spots: 10,
    },
  ],
};

const daysOfWeekOrder = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

// --- Class Item Component ---
const ClassItem = ({ classInfo }) => (
  <motion.div
    variants={classItemVariant}
    className={`p-4 rounded-lg border ${colors.borderLight} ${colors.surface} shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-lg transition-shadow`}
  >
    <div className="flex-grow">
      <h3 className={`text-lg font-semibold ${colors.textPrimary}`}>
        {classInfo.name}
      </h3>
      <p className={`text-sm ${colors.textSecondary} flex items-center mt-1`}>
        <FiClock className="w-4 h-4 mr-1.5 opacity-80" /> {classInfo.time} (
        {classInfo.duration})
      </p>
      <p className={`text-sm ${colors.textSecondary} flex items-center`}>
        <FiUser className="w-4 h-4 mr-1.5 opacity-80" /> Coach:{" "}
        {classInfo.instructor}
      </p>
      <span
        className={`mt-2 inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${colors.accentRedBg} bg-opacity-10 text-red-700 border border-red-200`}
      >
        {classInfo.type}
      </span>
    </div>
    <div className="flex-shrink-0 text-right sm:text-left mt-3 sm:mt-0">
      {classInfo.spots === 0 ? (
        <span
          className={`px-3 py-1.5 text-xs font-semibold rounded-md ${colors.textMuted} bg-slate-200`}
        >
          Clase Llena
        </span>
      ) : classInfo.spots !== null ? (
        <Button
          to={`/afc/book-class/${classInfo.id}`}
          variant="secondary"
          size="base"
          className={`!text-sm !py-1.5 !px-3 !border-red-500/50 !text-red-600 hover:!bg-red-500/10`}
        >
          Reservar ({classInfo.spots} Cupos)
        </Button>
      ) : (
        <span
          className={`px-3 py-1.5 text-xs font-semibold rounded-md ${colors.textSecondary} bg-slate-100`}
        >
          Abierto
        </span>
      )}
    </div>
  </motion.div>
);
ClassItem.propTypes = { classInfo: PropTypes.object.isRequired };

// --- Main AFC Schedule Page Component ---
export default function AFCSchedulePage() {
  const [selectedDay, setSelectedDay] = useState(
    daysOfWeekOrder[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
  ); // Default to today
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  const classesForSelectedDay = weeklyScheduleData[selectedDay] || [];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className="relative pt-24 md:pt-32 pb-12 md:pb-16 text-center overflow-hidden border-b ${colors.borderLight}"
          ariaLabelledby="afc-schedule-hero"
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
              <FiCalendar className={`w-12 h-12 ${colors.iconColor}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="afc-schedule-hero"
              className={`text-4xl sm:text-5xl font-bold ${colors.textPrimary} mb-4`}
            >
              Horario de Clases AFC
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              Encuentra tu próxima sesión de Mindful Strength. Reserva tu
              espacio y prepárate para transformar tu energía y enfoque.
            </motion.p>
          </motion.div>
        </Section>

        {/* Schedule Display Section */}
        <Section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            {/* Day Selector Tabs/Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mb-8 md:mb-10 flex flex-wrap justify-center gap-2 sm:gap-3"
              aria-label="Seleccionar día de la semana"
            >
              {daysOfWeekOrder.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50
                                ${
                                  selectedDay === day
                                    ? `${colors.tabActiveBg} ${colors.tabActiveText} shadow-md`
                                    : `${colors.tabInactiveBg} ${colors.tabInactiveText} ${colors.tabHoverBg} hover:text-red-700`
                                }`}
                  aria-pressed={selectedDay === day}
                >
                  {day}
                </button>
              ))}
            </motion.div>

            {/* Classes for Selected Day */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay} // Key change triggers animation
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 md:space-y-5"
              >
                {classesForSelectedDay.length > 0 ? (
                  classesForSelectedDay.map((classInfo) => (
                    <ClassItem key={classInfo.id} classInfo={classInfo} />
                  ))
                ) : (
                  <motion.p
                    variants={fadeInUp}
                    className={`text-center ${colors.textSecondary} py-10 px-6 ${colors.surface} rounded-lg border ${colors.borderLight}`}
                  >
                    No hay clases programadas para {selectedDay}. ¡Consulta otro
                    día o contáctanos!
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Section>

        {/* Call to Action Section */}
        <Section
          bg={colors.surfaceAccent}
          className="py-16 md:py-20 text-center border-t ${colors.borderLight}"
          ariaLabelledby="schedule-cta-title"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-2xl mx-auto"
          >
            <FiZap className={`w-10 h-10 ${colors.accentRed} mx-auto mb-4`} />
            <h2
              id="schedule-cta-title"
              className={`text-3xl font-bold ${colors.textPrimary} mb-3`}
            >
              ¿Listo para Entrenar?
            </h2>
            <p
              className={`text-lg ${colors.textSecondary} mb-8 max-w-xl mx-auto`}
            >
              Nuestros programas están diseñados para todos los niveles. Revisa
              nuestros planes de membresía y únete a la comunidad AFC hoy mismo.
            </p>
            <Button
              to="/afc/enroll"
              variant="primary"
              size="xl"
              icon={<FiArrowRight />}
              className={`${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover} shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all`}
            >
              Ver Planes de Inscripción
            </Button>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
AFCSchedulePage.propTypes = {};
ClassItem.propTypes = {
  classInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    spots: PropTypes.number, // Can be null for open gym
  }).isRequired,
};
