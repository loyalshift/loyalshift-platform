// src/pages/Girya/ViewCoachPage.js
// Dedicated page to display detailed information for a specific Girya coach.
// UPDATED: Corrected coach's name to Aryeh Halabi.
// Uses a Light Earthy Fitness / Mindful Strength Theme.
// Current time: Tuesday, May 13, 2025 at 2:00 PM CST.

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiUser,
  FiAward,
  FiHeart,
  FiZap,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiArrowLeft,
  FiLoader,
  FiInfo,
  FiCheckCircle,
  FiMessageSquare,
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import Section from "../../components/Section"; // Assuming Section component exists
// Path to coach image
const coachAriaImage = "/images/aria.jpg"; // This image is associated with Aryeh Halabi
const coachGabrielImage = "/images/gabriel-girya.jpg"; // This image is associated with Aryeh Halabi

// --- Light Earthy Fitness / Mindful Strength Color Palette ---
const colors = {
  background: "bg-stone-100",
  surface: "bg-white",
  surfaceAccent: "bg-emerald-50",
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
  success: "text-green-600",
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Mock Coach Data (In a real app, fetch this based on coachId) ---
// *** UPDATED COACH NAME AND KEY ***
const coachesData = {
  aryehhalabi: {
    // Using a URL-friendly key
    name: "Aryeh Halabi", // Corrected Name
    title: "Co-Founder & Developer @mindfulstrength_cr method", // From Instagram bio
    imageUrl: coachAriaImage, // Assuming aria.jpg is Aryeh Halabi's picture
    bio: [
      "Aryeh es co-fundador de Centuria Strength y Girya CR, y desarrollador de la metodología Mindful Strength. Su enfoque combina la precisión técnica del kettlebell con una profunda comprensión del movimiento consciente para transformar el bienestar físico y mental.",
      "Apasionado por ayudar a las personas a alcanzar su máximo potencial, Aryeh guía a sus alumnos a través de un entrenamiento que fomenta la resiliencia, el enfoque y una conexión auténtica con el propio cuerpo, buscando la excelencia en cada movimiento.",
    ],
    philosophy:
      "La metodología Mindful Strength se centra en la calidad del movimiento y la intención consciente, construyendo una fuerza funcional y sostenible que nutre cuerpo y mente. Cada sesión es una oportunidad para aprender y crecer.",
    specialties: [
      "Mindful Strength Methodology",
      "Kettlebell Training (Girevoy Sport & Hardstyle)",
      "Functional Movement Systems (FMS)",
      "Strength & Conditioning",
      "Mobility & Corrective Exercise",
    ],
    certifications: [
      "Mindful Strength Developer",
      "Certified Kettlebell Instructor (e.g., StrongFirst, RKC - specify actual certs)",
      "Functional Range Conditioning (FRCms)",
      // Add other relevant certifications
    ],
    social: {
      // It's good practice to use the actual Instagram username if available, or a generic one
      instagram: "https://www.instagram.com/aryeh_halabi/", // Placeholder, update with actual if known
      linkedin: "https://www.linkedin.com/in/aryehhalabi-placeholder", // Placeholder
    },
    ctaQuote:
      "Tu viaje hacia una fuerza más consciente y una vida más plena comienza con el primer movimiento intencional.",
  },
  gabrielcamacho: {
    // URL-friendly key
    name: "Gabriel Camacho Jiménez",
    title:
      "Coach, Especialista en Kettlebells, Fuerza y Acondicionamiento. Head Coach y Co-fundador @girya_cr",
    imageUrl: coachGabrielImage, // ** REPLACE WITH ACTUAL PATH TO GABRIEL'S IMAGE **
    bio: [
      "Gabriel es un apasionado del movimiento y la optimización del rendimiento humano. Como Head Coach y co-fundador de Girya CR, su misión es guiar a las personas hacia una versión más fuerte y consciente de sí mismas a través del entrenamiento con kettlebells y principios de acondicionamiento físico integral.",
      "Con una sólida base en la mecánica del movimiento y una dedicación a la enseñanza de la técnica correcta, Gabriel crea programas que no solo construyen fuerza, sino que también mejoran la movilidad, la resistencia y la mentalidad de sus atletas.",
    ],
    philosophy:
      "Creo en el poder del entrenamiento inteligente y consistente. El kettlebell es una herramienta increíblemente versátil para forjar un cuerpo fuerte y una mente resiliente. Mi objetivo es enseñar a dominarla con precisión y propósito.",
    specialties: [
      "Entrenamiento con Kettlebells (Hardstyle/Funcional)",
      "Fuerza y Acondicionamiento General",
      "Desarrollo de Potencia Atlética",
      "Programación para Objetivos Específicos",
      "Coaching Grupal e Individual",
    ],
    certifications: [
      "Certified Kettlebell Trainer (e.g., SFG, RKC - especificar)",
      "Strength and Conditioning Specialist (e.g., NSCA-CSCS - especificar)",
      // Add other relevant certifications
    ],
    social: {
      instagram: "https://www.instagram.com/ironcoach506/", // From screenshot
      facebook: "https://www.facebook.com/gabriel.camachojimenez", // Placeholder, update with actual if known
    },
    ctaQuote:
      "La inserción es aprender. Cada repetición es una oportunidad para perfeccionar y crecer.",
  },
};

// --- Helper Components ---
const DetailPill = ({ text }) => (
  <span
    className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${colors.surfaceAccent} ${colors.textHighlight} border ${colors.borderAccent}`}
  >
    {text}
  </span>
);
DetailPill.propTypes = { text: PropTypes.string.isRequired };

// --- Main View Coach Page Component ---
export default function ViewCoachPage() {
  const { coachId } = useParams(); // e.g., "aryehhalabi"
  const navigate = useNavigate();
  const [coach, setCoach] = useState(null);

  useEffect(() => {
    const key = coachId ? coachId.toLowerCase() : ""; // Ensure key is lowercase
    const foundCoach = coachesData[key];
    if (foundCoach) {
      setCoach(foundCoach);
    } else {
      console.error(`Coach with ID "${coachId}" not found.`);
      navigate("/girya/coaches", { replace: true });
    }
  }, [coachId, navigate]);

  if (!coach) {
    return (
      <div
        className={`${colors.background} min-h-screen flex items-center justify-center`}
      >
        <FiLoader className={`w-12 h-12 ${colors.iconColor} animate-spin`} />
      </div>
    );
  }

  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Back Link */}
        <div className="container mx-auto px-4 sm:px-6 pt-20 md:pt-24">
          <Link
            to="/girya/coaches"
            className={`inline-flex items-center text-sm ${colors.textHighlight} hover:underline font-medium group`}
          >
            <FiArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
            Volver a Todos los Coaches
          </Link>
        </div>

        {/* Coach Profile Section */}
        <Section
          bg={colors.background}
          className="pt-8 pb-16 md:pb-24"
          ariaLabelledby={`coach-name-${coach.name
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
        >
          <motion.div
            className="max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Grid for Profile Image and Main Info */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start mb-12 md:mb-16">
              {/* Profile Image */}
              <motion.div
                variants={scaleUp}
                className={`md:col-span-1 aspect-[3/4] rounded-xl shadow-2xl overflow-hidden border-4 ${colors.borderAccent}`}
              >
                <img
                  src={coach.imageUrl}
                  alt={`Retrato de ${coach.name}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Name, Title, Bio Intro */}
              <motion.div variants={fadeInUp} className="md:col-span-2">
                <h1
                  id={`coach-name-${coach.name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  className={`text-4xl sm:text-5xl font-extrabold ${colors.textPrimary} mb-2`}
                >
                  {coach.name}
                </h1>
                <p
                  className={`text-xl font-semibold ${colors.textHighlight} mb-6`}
                >
                  {coach.title}
                </p>
                {coach.bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`${colors.textSecondary} text-lg leading-relaxed mb-4`}
                  >
                    {paragraph}
                  </p>
                ))}
                {/* Social Links */}
                <div className="flex items-center gap-4 mt-4">
                  {coach.social?.instagram && (
                    <a
                      href={coach.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-stone-500 hover:${colors.textHighlight} transition-colors`}
                      aria-label={`Instagram de ${coach.name}`}
                    >
                      <FiInstagram className="w-6 h-6" />{" "}
                      {/* Placeholder for Instagram Icon */}
                    </a>
                  )}
                  {coach.social?.linkedin && (
                    <a
                      href={coach.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-stone-500 hover:${colors.textHighlight} transition-colors`}
                      aria-label={`Perfil de LinkedIn de ${coach.name}`}
                    >
                      <FiLinkedin className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Philosophy Section */}
            {coach.philosophy && (
              <motion.div
                variants={fadeInUp}
                className={`p-6 md:p-8 rounded-xl ${colors.surfaceAccent} border ${colors.border} mb-12 shadow-lg`}
              >
                <div className="flex items-center mb-3">
                  <FiHeart className={`w-7 h-7 ${colors.iconColor} mr-3`} />
                  <h2 className={`text-2xl font-bold ${colors.textPrimary}`}>
                    Filosofía de Entrenamiento
                  </h2>
                </div>
                <p
                  className={`${colors.textSecondary} text-lg leading-relaxed italic`}
                >
                  "{coach.philosophy}"
                </p>
              </motion.div>
            )}

            {/* Specialties & Certifications Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Specialties */}
              {coach.specialties && coach.specialties.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <div className="flex items-center mb-4">
                    <FiZap className={`w-6 h-6 ${colors.iconColor} mr-3`} />
                    <h3
                      className={`text-xl font-semibold ${colors.textPrimary}`}
                    >
                      Especialidades
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {coach.specialties.map((spec, index) => (
                      <DetailPill key={index} text={spec} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Certifications */}
              {coach.certifications && coach.certifications.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <div className="flex items-center mb-4">
                    <FiAward className={`w-6 h-6 ${colors.iconColor} mr-3`} />
                    <h3
                      className={`text-xl font-semibold ${colors.textPrimary}`}
                    >
                      Certificaciones
                    </h3>
                  </div>
                  <ul className="space-y-1">
                    {coach.certifications.map((cert, index) => (
                      <li
                        key={index}
                        className={`text-sm ${colors.textSecondary} flex items-center`}
                      >
                        <FiCheckCircle
                          className={`w-4 h-4 mr-2 ${colors.success} flex-shrink-0`}
                        />{" "}
                        {cert}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* CTA Section */}
            <motion.div
              variants={fadeInUp}
              className={`mt-16 p-8 rounded-xl ${colors.surface} border ${colors.borderAccent} text-center shadow-xl`}
            >
              <h3 className={`text-2xl font-bold ${colors.textPrimary} mb-3`}>
                {coach.ctaQuote || `Entrena con ${coach.name.split(" ")[0]}`}
              </h3>
              <p
                className={`${colors.textSecondary} text-lg mb-6 max-w-xl mx-auto`}
              >
                Descubre cómo {coach.name.split(" ")[0]} puede ayudarte a
                alcanzar tus objetivos de fuerza y bienestar.
              </p>
              <Button
                to={`/girya/contact?coach=${coachId}&subject=ConsultaCoachingCon${coach.name.replace(
                  /\s+/g,
                  ""
                )}`}
                variant="primary"
                size="lg"
                icon={<FiMessageSquare />}
                className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText}`}
              >
                Contactar para Coaching Personalizado
              </Button>
            </motion.div>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
ViewCoachPage.propTypes = {};
DetailPill.propTypes = { text: PropTypes.string.isRequired };
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};
Button.propTypes = {
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
