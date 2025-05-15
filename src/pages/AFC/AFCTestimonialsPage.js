// src/pages/Afc/AFCTestimonialsPage.js
// Page to display member testimonials for Athletic Functional Center (AFC).
// Highlights health and fitness advancements.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 3:35 PM CST.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiMessageSquare,
  FiUser,
  FiStar,
  FiHeart,
  FiTrendingUp,
  FiInfo,
  FiAward,
  FiThumbsUp,
} from "react-icons/fi";

// Reusable Components
import Button from "../../components/Button";
import Section from "../../components/Section";
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.png";

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
  quoteIconColor: "text-red-200", // For quote marks
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

// --- Testimonial Card Component ---
const TestimonialCard = ({ testimonial }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex flex-col ${colors.surface} rounded-xl shadow-lg border ${colors.borderLight} p-6 md:p-8 h-full group hover:shadow-xl transition-shadow duration-300`}
    whileHover={{ y: -5 }}
  >
    <FiMessageSquare
      className={`w-10 h-10 ${colors.quoteIconColor} mb-4 self-start`}
    />
    <blockquote
      className={`${colors.textSecondary} text-base md:text-lg italic leading-relaxed flex-grow mb-4`}
    >
      "{testimonial.quote}"
    </blockquote>
    <div className="mt-auto pt-4 border-t ${colors.borderLight}">
      <div className="flex items-center">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-red-100"
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-full ${colors.surfaceAccent} flex items-center justify-center mr-4 border-2 border-red-100`}
          >
            <FiUser className={`w-6 h-6 ${colors.accentRed}`} />
          </div>
        )}
        <div>
          <p className={`font-semibold ${colors.textPrimary}`}>
            {testimonial.name}
          </p>
          {testimonial.achievement && (
            <p className={`text-sm ${colors.accentRed}`}>
              {testimonial.achievement}
            </p>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);
TestimonialCard.propTypes = { testimonial: PropTypes.object.isRequired };

// --- Main AFC Testimonials Page Component ---
export default function AFCTestimonialsPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  const testimonials = [
    {
      name: "Carlos Montero",
      quote:
        "Desde que me uní a AFC, mi energía ha aumentado increíblemente y he perdido 10kg. Los coaches realmente se preocupan por tu progreso y la comunidad es muy motivadora. ¡Nunca me sentí mejor!",
      achievement: "Perdió 10kg y ganó energía",
      image: "/images/property-mock-1.jpeg",
    }, // Replace with actual images
    {
      name: "Lucía Fernández",
      quote:
        "AFC no es solo un gimnasio, es un cambio de vida. Aprendí a moverme con conciencia, superé dolores de espalda crónicos y encontré una pasión por el kettlebell que no sabía que tenía. ¡Gracias AFC!",
      achievement: "Superó dolor crónico, encontró pasión",
      image: "/images/property-mock-2.jpeg",
    },
    {
      name: "Andrés Vargas",
      quote:
        "Como atleta aficionado, buscaba mejorar mi rendimiento funcional. En AFC encontré programas desafiantes y un ambiente que me empuja a ser mejor cada día. Mis marcas personales han mejorado notablemente.",
      achievement: "Mejoró marcas personales",
      image: "/images/property-mock-3.jpeg",
    },
    {
      name: "Sofía Brenes",
      quote:
        "El enfoque 'Mindful Strength' me enseñó a escuchar mi cuerpo y entrenar de forma más inteligente, no más dura. La comunidad es increíblemente solidaria. ¡Recomendado al 100%!",
      achievement: "Entrenamiento más inteligente y consciente",
      image: "/images/property-mock-4.jpeg",
    },
  ];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className="relative pt-24 md:pt-32 pb-16 md:pb-20 text-center overflow-hidden border-b ${colors.borderLight}"
          ariaLabelledby="afc-testimonials-hero"
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
              <FiThumbsUp className={`w-12 h-12 ${colors.iconColor}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="afc-testimonials-hero"
              className={`text-4xl sm:text-5xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
            >
              Historias de{" "}
              <span className={colors.accentRed}>Transformación en AFC</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              Escucha directamente de nuestros miembros cómo Athletic Functional
              Center ha impactado positivamente sus vidas, su salud y su
              rendimiento.
            </motion.p>
          </motion.div>
        </Section>

        {/* Testimonials Grid Section */}
        <Section
          bg={colors.background}
          className={`py-16 md:py-24`}
          ariaLabelledby="testimonials-list-title"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            id="testimonials-list-title"
            className={`text-3xl md:text-4xl font-bold ${colors.textPrimary} text-center mb-12 md:mb-16`}
          >
            Lo Que Nuestra Comunidad Dice
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch" // 2 columns for more text space
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </motion.div>
        </Section>

        {/* Call to Action: Share Your Story or Join */}
        <Section
          bg={colors.surfaceAccent}
          className="py-20 md:py-24 text-center border-t ${colors.borderLight}"
          ariaLabelledby="share-story-cta"
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
              id="share-story-cta"
              className={`text-3xl font-bold ${colors.textPrimary} mb-4`}
            >
              ¿Tienes una Historia AFC para Compartir?
            </h2>
            <p
              className={`text-lg ${colors.textSecondary} mb-8 max-w-xl mx-auto`}
            >
              Nos encantaría escuchar sobre tu viaje y cómo AFC te ha ayudado.
              Si estás listo para comenzar tu propia transformación, ¡únete a
              nosotros!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                to="/afc/contact?subject=MiHistoriaAFC"
                variant="primary"
                size="lg"
                icon={<FiMessageSquare />}
                className={`${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover} shadow-lg hover:shadow-xl`}
              >
                Comparte tu Testimonio
              </Button>
              <Button
                to="/afc/enroll"
                variant="secondary"
                size="lg"
                className={`!bg-white !border-red-500/50 !text-red-600 hover:!bg-red-50 hover:!border-red-600`}
              >
                Únete a AFC Hoy
              </Button>
            </div>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
AFCTestimonialsPage.propTypes = {};
TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
    achievement: PropTypes.string,
    image: PropTypes.string, // Optional image path
  }).isRequired,
};
Section.propTypes = {
  /* ... */
};
Button.propTypes = {
  /* ... */
};
