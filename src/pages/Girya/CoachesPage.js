// src/pages/Girya/CoachesPage.js
// Page showcasing the coaching team at Girya.
// Uses a Light Earthy Fitness / Mindful Strength Theme.
// Current time: Tuesday, May 13, 2025 at 11:50 AM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiUsers, // Team, Coaches
  FiHeart, // Passion, Philosophy
  FiArrowRight, // CTA
  FiInfo, // Timestamp
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button"; // Assuming Button is in src/components
import Section from "../../components/Section"; // Assuming Section component exists

// --- Light Earthy Fitness / Mindful Strength Color Palette ---
const colors = {
  background: "bg-stone-100", // Light stone background
  surface: "bg-white", // White for cards
  surfaceAccent: "bg-emerald-50", // Very light emerald for accents
  border: "border-stone-300", // Medium stone border
  borderAccent: "border-emerald-600/30", // Softer emerald accent border
  textPrimary: "text-stone-800", // Dark stone for primary text (headings)
  textSecondary: "text-stone-600", // Medium stone for body text
  textHighlight: "text-emerald-700", // Deep emerald for highlights
  textEmphasis: "text-amber-600", // Warm amber for emphasis
  iconColor: "text-emerald-600",
  buttonPrimaryBg: "bg-emerald-600", // Emerald for primary buttons
  buttonPrimaryHover: "hover:bg-emerald-700",
  buttonText: "text-white",
  success: "text-green-600", // Standard green for success
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

// --- Coach Card Component ---
const CoachCard = ({
  name,
  title,
  bio,
  imageUrl,
  specialties = [],
  link = "#",
}) => (
  <motion.div
    variants={fadeInUp}
    className={`flex flex-col ${colors.surface} rounded-xl shadow-lg overflow-hidden border ${colors.border} h-full group transition-all duration-300 hover:shadow-xl hover:border-emerald-400`}
    whileHover={{ y: -5 }}
  >
    <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
      {" "}
      {/* Portrait aspect ratio */}
      <img
        src={imageUrl}
        alt={`Portrait of ${name}`}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5 opacity-70 group-hover:opacity-50 transition-opacity"></div>
    </div>
    <div className="p-5 md:p-6 flex flex-col flex-grow">
      <h3
        className={`text-xl md:text-2xl font-bold ${colors.textPrimary} mb-1 group-hover:${colors.textHighlight} transition-colors`}
      >
        {name}
      </h3>
      <p className={`text-sm font-semibold ${colors.textHighlight} mb-3`}>
        {title}
      </p>
      <p
        className={`${colors.textSecondary} text-sm leading-relaxed mb-4 flex-grow`}
      >
        {bio}
      </p>
      {specialties.length > 0 && (
        <div className="mb-4">
          <h4
            className={`text-xs font-semibold ${colors.textSecondary} uppercase tracking-wider mb-1.5`}
          >
            Especialidades:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {specialties.map((spec, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-0.5 rounded-full ${colors.surfaceAccent} ${colors.textHighlight} border ${colors.borderAccent}`}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="mt-auto pt-3 border-t ${colors.border}">
        <Link
          to={link}
          className={`inline-flex items-center text-sm font-medium ${colors.textHighlight} hover:underline group-hover:text-emerald-800`}
        >
          Conocer Más{" "}
          <FiArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  </motion.div>
);
CoachCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  specialties: PropTypes.arrayOf(PropTypes.string),
  link: PropTypes.string,
};

// --- Main Girya Coaches Page Component ---
export default function GiryaCoachesPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  // Mock Coach Data (Replace with actual data source)
  const coaches = [
    {
      name: "Aryeh Halabi", // Using name from image
      title: "Coach Principal & Fundadora de Mindful Strength",
      bio: "Con más de 10 años de experiencia, Aryeh fusiona la técnica precisa del kettlebell con la conciencia plena para un entrenamiento transformador que fortalece cuerpo y mente.",
      // IMPORTANT: Replace with the actual path to aria.jpg in your public folder or a hosted URL
      imageUrl: "/images/aria.jpg", // Assuming aria.jpg is in public/images/
      specialties: [
        "Mindful Strength",
        "Kettlebell Flow",
        "Movilidad Funcional",
        "Prevención de Lesiones",
      ],
      link: "/girya/coaches/aryehhalabi", // Placeholder link
    },
    {
      name: "Gabriel Camacho",
      title: "Coach en kettlebells • Fuerza y Acondicionamiento",
      bio: "Gabo se especializa en desarrollar la fuerza máxima y la resistencia. Sus programas desafiantes están diseñados para llevarte más allá de tus límites de forma segura.",
      imageUrl: "/images/gabriel-girya.jpg", // Placeholder
      specialties: [
        "Mindful Strength",
        "Fuerza Funcional",
        "Acondicionamiento Metabólico",
        "Entrenamiento Deportivo",
      ],
      link: "/girya/coaches/gabrielcamacho",
    },
    {
      name: "Sofía Vargas",
      title: "Instructora de Movilidad y Yoga",
      bio: "Sofía integra principios del yoga y la movilidad para complementar el entrenamiento de fuerza, mejorando la flexibilidad, el equilibrio y la recuperación.",
      imageUrl:
        "https://placehold.co/400x500/a3a3a3/404040?text=Sofia&font=montserrat", // Placeholder
      specialties: [
        "Yoga para Atletas",
        "Movilidad Articular",
        "Técnicas de Recuperación",
        "Mindfulness",
      ],
      link: "/girya/coaches/sofia",
    },
    // Add more coaches as needed
  ];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      {/* Assumes GiryaLayout provides Header & Footer */}
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.background} // Use main light background
          className="relative pt-24 md:pt-32 pb-16 md:pb-20 text-center overflow-hidden"
          ariaLabelledby="girya-coaches-hero"
        >
          {/* Subtle background pattern or texture */}
          <div className="absolute inset-0 opacity-[5%] bg-[url('/public/images/financial-texture.png')] bg-repeat mix-blend-overlay"></div>
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
              <FiUsers className={`w-12 h-12 ${colors.textHighlight}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="girya-coaches-hero"
              className={`text-4xl sm:text-5xl font-extrabold ${colors.textPrimary} mb-4 leading-tight`}
            >
              Conoce a Nuestros{" "}
              <span className={colors.textHighlight}>Guías Expertos</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              Nuestro equipo de coaches certificados está dedicado a tu
              crecimiento, combinando conocimiento profundo con una pasión
              genuina por la metodología Mindful Strength.
            </motion.p>
          </motion.div>
        </Section>

        {/* Coaches Grid Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-20 border-t ${colors.border}`}
          ariaLabelledby="coaches-grid-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="coaches-grid-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-12 md:mb-16`}
          >
            El Equipo Girya
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {coaches.map((coach, index) => (
              <CoachCard
                key={index}
                name={coach.name}
                title={coach.title}
                bio={coach.bio}
                imageUrl={coach.imageUrl}
                specialties={coach.specialties}
                link={coach.link}
              />
            ))}
          </motion.div>
        </Section>

        {/* Philosophy/CTA Section */}
        <Section
          bg={colors.surfaceAccent}
          className={`py-16 md:py-24 border-y ${colors.border}`}
          ariaLabelledby="philosophy-cta-title"
        >
          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <FiHeart
              className={`w-12 h-12 ${colors.textHighlight} mx-auto mb-6`}
            />
            <h2
              id="philosophy-cta-title"
              className={`text-3xl font-bold ${colors.textPrimary} mb-4`}
            >
              Más que Entrenamiento, una Transformación
            </h2>
            <p
              className={`${colors.textSecondary} text-lg leading-relaxed mb-8`}
            >
              Nuestros coaches no solo te enseñan técnica; te guían en un viaje
              de autodescubrimiento y fortalecimiento integral. Creemos en el
              poder del movimiento consciente para cambiar vidas.
            </p>
            <Button
              to="/girya/enroll"
              variant="primary"
              size="lg"
              icon={<FiArrowRight />}
              className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText} shadow-lg hover:shadow-emerald-500/30`}
            >
              Únete a Nuestra Comunidad
            </Button>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
GiryaCoachesPage.propTypes = {};
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
// CoachCard PropTypes defined above
