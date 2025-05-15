// src/pages/Afc/AFCContactPage.js
// Contact page for Athletic Functional Center (AFC).
// Features direct contact info, map, and a contact form.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 2:20 PM CST.

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Not strictly needed here unless linking out from text
import PropTypes from "prop-types";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiLoader,
  FiMap,
  FiHelpCircle,
  FiNavigation,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Section from "../../components/Section"; // Assuming Section is styled for light theme or adaptable
import { createScaleUp } from "../../utils/animationVariants";

// AFC Logo (optional for this page, but good to have if needed)
// const afcLogoPath = process.env.PUBLIC_URL + '/images/afc-logo.png';

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
  inputBorder: "border-slate-300",
  inputFocusBorder: "focus:border-red-500",
  inputFocusRing: "focus:ring-red-500/50",
  errorText: "text-red-700",
  buttonTextLight: "text-white",
  mapButtonBg: "bg-slate-800/70", // For map overlay buttons
  mapButtonHoverBg: "hover:bg-slate-700/90",
  mapButtonText: "text-white",
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.1) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});

// --- Reusable ContactInfoItem (Adapted from AnacoContactPage) ---
const ContactInfoItem = ({ icon: Icon, title, lines, links }) => (
  <motion.div
    variants={fadeInUp}
    className="flex items-start text-left mb-6 md:mb-0"
  >
    {Icon && (
      <Icon
        className={`w-6 h-6 ${colors.iconColor} mr-4 mt-1 flex-shrink-0`}
        aria-hidden="true"
      />
    )}
    <div>
      <h3 className={`text-lg font-semibold ${colors.textPrimary} mb-1`}>
        {title}
      </h3>
      {lines.map((line, index) =>
        links && links[index] ? (
          <a
            key={index}
            href={links[index]}
            target={
              links[index].startsWith("mailto:") ||
              links[index].startsWith("tel:")
                ? "_self"
                : "_blank"
            }
            rel="noopener noreferrer"
            className={`block ${colors.textSecondary} hover:${colors.accentRed} transition-colors text-base`}
          >
            {line}
          </a>
        ) : (
          <p key={index} className={`${colors.textSecondary} text-base`}>
            {line}
          </p>
        )
      )}
    </div>
  </motion.div>
);
ContactInfoItem.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
  links: PropTypes.arrayOf(PropTypes.string),
};

// --- Initial Form State ---
const initialFormData = { name: "", email: "", subject: "", message: "" };

const scaleUp = createScaleUp();

// --- Main AFC Contact Page Component ---
export default function AFCContactPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const afcCoordinates = "9.8627,-83.9175"; // For map links

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToastId = toast.loading("Enviando tu mensaje...");

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor completa Nombre, Email y Mensaje.", {
        id: loadingToastId,
      });
      setIsSubmitting(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Por favor ingresa un correo electrónico válido.", {
        id: loadingToastId,
      });
      setIsSubmitting(false);
      return;
    }

    console.log("AFC Contact Form Submission:", formData);
    // Simulate API Call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      toast.success(
        "¡Mensaje enviado! Gracias por contactarnos. Te responderemos pronto.",
        { id: loadingToastId, duration: 4000 }
      );
      setFormData(initialFormData); // Reset form
    } catch (error) {
      console.error("AFC Form Submission Error:", error);
      toast.error("Error al enviar el mensaje. Por favor, intenta de nuevo.", {
        id: loadingToastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  // Map Embed URL for Centro Comercial La Hacienda, El Tejar, Cartago
  // Coordinates are approximate for the general area. Obtain precise from AFC or Google Maps.
  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-83.9250%2C9.8580%2C-83.9100%2C9.8680&layer=mapnik&marker=9.8627%2C-83.9175`; // Approx. Centro Comercial La Hacienda

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: colors.surface,
            color: colors.textPrimary,
            border: `1px solid ${colors.border}`,
          },
          success: {
            iconTheme: { primary: colors.success, secondary: "white" },
          },
          error: {
            iconTheme: { primary: colors.accentRed, secondary: "white" },
          },
        }}
      />

      {/* This page assumes it's rendered within AFCLayout which provides AFCHeader/Footer */}
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className="pt-24 md:pt-32 pb-12 md:pb-16 text-center border-b ${colors.borderLight}"
          ariaLabelledby="afc-contact-hero"
        >
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer()}
          >
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-6 rounded-full ${colors.surfaceAccent} border ${colors.borderAccent}`}
            >
              <FiMessageSquare className={`w-12 h-12 ${colors.iconColor}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="afc-contact-hero"
              className={`text-4xl sm:text-5xl font-bold ${colors.textPrimary} mb-4`}
            >
              Ponte en Contacto con AFC
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              ¿Preguntas sobre nuestros programas, inscripciones o cómo empezar?
              Estamos aquí para ayudarte a alcanzar tus metas de fitness
              funcional.
            </motion.p>
          </motion.div>
        </Section>

        {/* Main Content: Contact Info, Map, and Form */}
        <Section className="py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16 items-start max-w-6xl mx-auto">
            {/* Left Column: Direct Info & Map */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.15)}
            >
              <ContactInfoItem
                icon={FiPhone}
                title="Llámanos"
                lines={["8400-5481"]}
                links={["tel:+50684005481"]}
              />
              <ContactInfoItem
                icon={FiMail}
                title="Escríbenos"
                lines={["info@afccr.com (Ejemplo)"]} // Replace with actual AFC email
                links={["mailto:info@afccr.com"]}
              />
              <ContactInfoItem
                icon={FiMapPin}
                title="Visítanos"
                lines={[
                  "Centro Comercial La Hacienda",
                  "El Tejar, Cartago, Costa Rica",
                ]}
              />
              {/* Map Container */}
              <motion.div
                variants={fadeInUp}
                className={`mt-6 rounded-xl border ${colors.border} overflow-hidden shadow-lg h-72 md:h-80 relative`}
              >
                <iframe
                  title="Mapa de ubicación de Athletic Functional Center"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  frameBorder="0"
                  scrolling="no"
                  src={mapEmbedUrl}
                  style={{ border: 0 }}
                  className="absolute inset-0"
                ></iframe>
                {/* Map Buttons Container */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <a
                    href={`https://www.google.com/maps?q=${afcCoordinates}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 ${colors.mapButtonBg} ${colors.mapButtonText} ${colors.mapButtonHoverBg} text-xs font-semibold px-3 py-1.5 rounded-md shadow-md transition-colors`}
                    title="Ver en Google Maps"
                  >
                    <FiMap className="w-3.5 h-3.5" /> Google Maps
                  </a>
                  <a
                    href={`https://www.waze.com/ul?ll=${afcCoordinates.replace(
                      ",",
                      "%2C"
                    )}&navigate=yes`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 ${colors.mapButtonBg} ${colors.mapButtonText} ${colors.mapButtonHoverBg} text-xs font-semibold px-3 py-1.5 rounded-md shadow-md transition-colors`}
                    title="Navegar con Waze"
                  >
                    <FiNavigation className="w-3.5 h-3.5" /> Waze
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              className={`lg:col-span-3 ${colors.surface} p-6 md:p-10 rounded-xl shadow-xl border ${colors.borderLight}`}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeInUp}
            >
              <h2
                className={`text-2xl font-semibold ${colors.textPrimary} mb-6 flex items-center gap-2`}
              >
                <FiHelpCircle className={colors.iconColor} /> Envíanos tu
                Consulta
              </h2>
              <motion.form
                onSubmit={handleSubmit}
                variants={staggerContainer(0.1)}
                initial="hidden"
                animate="visible"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <motion.div variants={fadeInUp}>
                    <InputField
                      label="Tu Nombre"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Nombre Completo"
                      themeColors={colors}
                      icon={FiUser}
                    />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <InputField
                      label="Tu Email"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@correo.com"
                      themeColors={colors}
                      icon={FiMail}
                    />
                  </motion.div>
                </div>
                <motion.div variants={fadeInUp} className="mb-5">
                  <InputField
                    label="Asunto (Opcional)"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Ej: Consulta sobre programas"
                    themeColors={colors}
                  />
                </motion.div>
                <motion.div variants={fadeInUp} className="mb-6">
                  <InputField
                    label="Mensaje"
                    id="message"
                    name="message"
                    type="textarea"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Escribe tu mensaje aquí..."
                    themeColors={colors}
                  />
                </motion.div>
                <motion.div variants={fadeInUp} className="text-right">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    icon={
                      isSubmitting ? (
                        <FiLoader className="animate-spin" />
                      ) : (
                        <FiSend />
                      )
                    }
                    className={`${colors.accentRedBg} ${
                      colors.buttonTextLight
                    } ${colors.accentRedBgHover} ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
AFCContactPage.propTypes = {};
ContactInfoItem.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
  links: PropTypes.arrayOf(PropTypes.string),
};
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};
InputField.propTypes = {
  // Assuming InputField props
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  themeColors: PropTypes.object, // If InputField accepts theme colors
  icon: PropTypes.elementType,
};
Button.propTypes = {
  to: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
