// src/pages/Girya/ProgramsAndEquipmentPage.js
// Marketplace-style page for Girya's programs and equipment.
// UPDATED: Removed key={activeTab} from the grid container for smoother AnimatePresence.
// Uses a Light Earthy Fitness / Mindful Strength Theme.
// Current time: Tuesday, May 13, 2025 at 1:10 PM CST.

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiArrowRight,
  FiUsers,
  FiHeart,
  FiZap,
  FiTarget,
  FiCheckCircle,
  FiAward,
  FiDollarSign,
  FiCalendar,
  FiInfo,
  FiShield,
  FiActivity,
  FiBookOpen,
  FiMove,
  FiShoppingCart,
  FiBarChart2,
  FiFilter,
  FiGrid,
  FiList,
  FiPackage,
  FiMessageSquare,
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import Section from "../../components/Section";
import { createScaleUp } from "../../utils/animationVariants";

const scaleUp = createScaleUp();

// --- Light Earthy Fitness / Mindful Strength Color Palette ---
const colors = {
  background: "bg-stone-100",
  surface: "bg-white",
  surfaceAccent: "bg-emerald-50",
  border: "border-stone-300",
  borderAccent: "border-emerald-600/30",
  textPrimary: "text-stone-800",
  textSecondary: "text-stone-600",
  textHighlight: "text-emerald-700",
  textEmphasis: "text-amber-700",
  iconColor: "text-emerald-600",
  buttonPrimaryBg: "bg-emerald-600",
  buttonPrimaryHover: "hover:bg-emerald-700",
  buttonText: "text-white",
  success: "text-green-600",
  tabActiveBg: "bg-emerald-600",
  tabActiveText: "text-white",
  tabInactiveBg: "bg-stone-200",
  tabInactiveText: "text-stone-700",
  tabHoverBg: "hover:bg-emerald-500/20",
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}; // Adjusted delay
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: { duration: 0.3, ease: "easeIn" },
  }, // Slightly different exit
};

// --- Mock Data ---
const mockPrograms = [
  {
    id: "P001",
    name: "Fundamentos Mindful Kettlebell",
    icon: FiActivity,
    shortDescription:
      "Domina las bases del kettlebell con enfoque en técnica y conexión mente-cuerpo.",
    suitability: "Principiantes",
    duration: "8 Semanas",
    link: "/girya/programs/foundations",
  },
  {
    id: "P002",
    name: "Fuerza y Flujo Avanzado",
    icon: FiZap,
    shortDescription:
      "Lleva tu entrenamiento al siguiente nivel con secuencias complejas y técnicas avanzadas.",
    suitability: "Avanzados",
    duration: "Continuo",
    link: "/girya/programs/advanced",
  },
  {
    id: "P003",
    name: "Entrenamiento Grupal Energizante",
    icon: FiUsers,
    shortDescription:
      "Clases dinámicas que combinan fuerza, cardio y comunidad para una motivación máxima.",
    suitability: "Todos los niveles",
    duration: "Clases sueltas / Paquetes",
    link: "/girya/programs/group",
  },
  {
    id: "P004",
    name: "Coaching Personalizado 1:1",
    icon: FiTarget,
    shortDescription:
      "Programas diseñados específicamente para tus metas, con seguimiento detallado y atención individualizada.",
    suitability: "Personalizado",
    duration: "Variable",
    link: "/girya/programs/personal",
  },
  {
    id: "P005",
    name: "Talleres Mindful Strength",
    icon: FiBookOpen,
    shortDescription:
      "Profundiza en aspectos específicos de la metodología, nutrición y recuperación.",
    suitability: "Todos los niveles",
    duration: "Eventos específicos",
    link: "/girya/workshops",
  },
];

const mockEquipment = [
  {
    id: "EQ001",
    name: "Kettlebell Clásico (Hierro Fundido)",
    icon: FiShield,
    description:
      "Disponible en pesos de 8kg a 32kg. Ideal para entrenamiento de fuerza y acondicionamiento.",
    price: "35,000",
    currency: "CRC",
    imageUrl: "/images/ground-kettlebell.jpg",
    options: ["8kg", "12kg", "16kg", "20kg", "24kg", "28kg", "32kg"],
  },
  {
    id: "EQ002",
    name: "Kit de Inicio Mindful Strength",
    icon: FiPackage,
    description:
      "Incluye un kettlebell de 12kg, bandas de resistencia y una guía de inicio rápido.",
    price: "70,000",
    currency: "CRC",
    imageUrl: "/images/kettlebells.jpg",
    options: [],
  },
  {
    id: "EQ003",
    name: "Bandas de Resistencia (Set de 3)",
    icon: FiAward,
    description:
      "Perfectas para calentamiento, movilidad y ejercicios complementarios. Tres niveles de resistencia.",
    price: "15,000",
    currency: "CRC",
    imageUrl:
      "https://placehold.co/400x300/a3a3a3/404040?text=Bandas&font=montserrat",
    options: [],
  },
];

// Format Currency Helper
function formatCurrency(value, currency = "CRC") {
  const numberValue = Number(String(value).replace(/,/g, ""));
  if (isNaN(numberValue)) return value;
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue);
}

// --- Card Components ---
const ProgramCard = ({ program }) => (
  <motion.div
    variants={cardVariants} // These variants are used by AnimatePresence
    initial="hidden" // AnimatePresence handles these if item is new
    animate="visible"
    exit="exit"
    className={`flex flex-col ${colors.surface} rounded-xl shadow-lg overflow-hidden border ${colors.border} h-full group transition-all duration-300 hover:shadow-xl hover:border-emerald-400`}
    whileHover={{ y: -5 }}
  >
    <div
      className={`p-5 ${colors.surfaceAccent} border-b ${colors.borderAccent} h-40 flex flex-col items-center justify-center text-center`}
    >
      <program.icon
        className={`w-10 h-10 ${colors.iconColor} mb-2 flex-shrink-0`}
      />
      <h3
        className={`text-xl font-bold ${colors.textPrimary} group-hover:${colors.textHighlight} transition-colors`}
      >
        {program.name}
      </h3>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <p
        className={`${colors.textSecondary} text-sm leading-relaxed mb-3 flex-grow`}
      >
        {program.shortDescription}
      </p>
      <div className={`text-xs ${colors.textSecondary} space-y-1 mb-4`}>
        <p>
          <strong className={colors.textPrimary}>Ideal para:</strong>{" "}
          {program.suitability}
        </p>
        <p>
          <strong className={colors.textPrimary}>Duración:</strong>{" "}
          {program.duration}
        </p>
      </div>
      <div className="mt-auto">
        <Button
          to={program.link}
          variant="secondary"
          size="base"
          className={`w-full !border-emerald-600/50 !text-emerald-700 hover:!bg-emerald-500/10`}
        >
          Más Detalles
        </Button>
      </div>
    </div>
  </motion.div>
);
ProgramCard.propTypes = { program: PropTypes.object.isRequired };

const EquipmentCard = ({ item }) => (
  <motion.div
    variants={cardVariants} // These variants are used by AnimatePresence
    initial="hidden"
    animate="visible"
    exit="exit"
    className={`flex flex-col ${colors.surface} rounded-xl shadow-lg overflow-hidden border ${colors.border} h-full group transition-all duration-300 hover:shadow-xl hover:border-emerald-400`}
    whileHover={{ y: -5 }}
  >
    <div className="relative aspect-video bg-stone-200 overflow-hidden">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-full object-contain p-2 "
      />
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <h3
        className={`text-lg font-bold ${colors.textPrimary} mb-1 group-hover:${colors.textHighlight} transition-colors`}
      >
        {item.name}
      </h3>
      <p className={`text-2xl font-extrabold ${colors.textHighlight} mb-3`}>
        {formatCurrency(item.price, item.currency)}
      </p>
      <p
        className={`${colors.textSecondary} text-xs leading-relaxed mb-3 flex-grow`}
      >
        {item.description}
      </p>
      {item.options && item.options.length > 0 && (
        <p className={`${colors.textSecondary} text-xs mb-3`}>
          <strong className={colors.textPrimary}>Opciones:</strong>{" "}
          {item.options.join(", ")}
        </p>
      )}
      <div className="mt-auto">
        <Button
          to={`/girya/equipment/${item.id}`}
          variant="primary"
          size="base"
          icon={<FiShoppingCart />}
          className={`w-full ${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText}`}
        >
          Ver Producto
        </Button>
      </div>
    </div>
  </motion.div>
);
EquipmentCard.propTypes = { item: PropTypes.object.isRequired };

// --- Main Page Component ---
export default function GiryaProgramsAndEquipmentPage() {
  const [activeTab, setActiveTab] = useState("programs");
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  const itemsToDisplay = useMemo(() => {
    // console.log("Active Tab Changed To:", activeTab); // For debugging
    const newItems = activeTab === "programs" ? mockPrograms : mockEquipment;
    // console.log("Items to Display:", newItems); // For debugging
    return newItems;
  }, [activeTab]);

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.background}
          className="relative pt-24 md:pt-32 pb-12 md:pb-16 text-center overflow-hidden"
          ariaLabelledby="girya-programs-hero"
        >
          <div className="absolute inset-0 opacity-[3%] bg-[url('/public/images/financial-texture.png')] bg-repeat mix-blend-soft-light"></div>
          <motion.div
            className="max-w-3xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-6 rounded-full ${colors.surfaceAccent} border ${colors.borderAccent} shadow-md`}
            >
              <FiAward className={`w-12 h-12 ${colors.textHighlight}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="girya-programs-hero"
              className={`text-4xl sm:text-5xl font-extrabold ${colors.textPrimary} mb-4 leading-tight`}
            >
              Programas y Equipamiento{" "}
              <span className={colors.textHighlight}>Girya</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              Explora nuestros programas de entrenamiento diseñados bajo la
              filosofía Mindful Strength y el equipamiento esencial para llevar
              tu práctica al siguiente nivel.
            </motion.p>
          </motion.div>
        </Section>

        {/* Tabs for Programs/Equipment */}
        <Section
          bg={colors.background}
          className={`py-8 border-b ${colors.border} sticky top-[68px] z-20`}
        >
          <div className="flex justify-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab("programs")}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                        ${
                          activeTab === "programs"
                            ? `${colors.tabActiveBg} ${colors.tabActiveText} shadow-md`
                            : `${colors.tabInactiveBg} ${colors.tabInactiveText} ${colors.tabHoverBg} hover:text-emerald-700`
                        }`}
            >
              <FiActivity className="inline mr-2 w-4 h-4" /> Programas
            </button>
            <button
              onClick={() => setActiveTab("equipment")}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                        ${
                          activeTab === "equipment"
                            ? `${colors.tabActiveBg} ${colors.tabActiveText} shadow-md`
                            : `${colors.tabInactiveBg} ${colors.tabInactiveText} ${colors.tabHoverBg} hover:text-emerald-700`
                        }`}
            >
              <FiPackage className="inline mr-2 w-4 h-4" /> Equipamiento
            </button>
          </div>
        </Section>

        {/* Grid Display Area */}
        <Section
          bg={colors.background}
          className={`py-12 md:py-16`}
          ariaLabelledby="items-grid-title"
        >
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
            // key={activeTab} // This was removed to fix animation
          >
            <AnimatePresence mode="popLayout">
              {itemsToDisplay.map((item, index) =>
                activeTab === "programs" ? (
                  <ProgramCard
                    key={item.id || `program-${index}`}
                    program={item}
                  />
                ) : (
                  <EquipmentCard
                    key={item.id || `equipment-${index}`}
                    item={item}
                  />
                )
              )}
            </AnimatePresence>
          </motion.div>

          {itemsToDisplay.length === 0 && activeTab && (
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className={`text-center ${colors.textSecondary} mt-10`}
            >
              No hay {activeTab === "programs" ? "programas" : "equipamiento"}{" "}
              disponibles en este momento.
            </motion.p>
          )}
        </Section>

        {/* Final CTA Section */}
        <Section
          bg={colors.surfaceAccent}
          className={`py-16 md:py-24 border-t ${colors.border}`}
          ariaLabelledby="enroll-cta-final"
        >
          <motion.div
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <FiHeart
              className={`w-12 h-12 ${colors.textHighlight} mx-auto mb-6`}
            />
            <h2
              id="enroll-cta-final"
              className={`text-3xl font-bold ${colors.textPrimary} mb-4`}
            >
              ¿Listo para Comprometerte con tu Fuerza?
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-8`}
            >
              Ya sea que busques un programa transformador o el equipamiento
              perfecto, en Girya encontrarás la calidad y la guía que necesitas.
            </p>
            <Button
              to="/girya/contact?subject=ConsultaProgramasEquipamiento"
              variant="primary"
              size="xl"
              icon={<FiMessageSquare />}
              className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 ease-out`}
            >
              Contacta para Asesoría
            </Button>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
GiryaProgramsAndEquipmentPage.propTypes = {};
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
