// src/pages/Equilibra/EquilibraContactPage.js
// Contact page for Equilibra CR.
// Features direct contact info and a contact form.
// Uses the new Equilibra CR color palette (Soft Peach, Blush Pink, Cream White, Warm Gray, Coral Red, Muted Taupe).
// Current time: Friday, May 16, 2025 at 3:05 PM CST.

import React, { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiMail,
  FiMessageCircle,
  FiSend,
  FiLoader,
  FiInfo,
  FiHelpCircle,
  FiThumbsUp,
  FiCalendar, // Using FiMessageCircle for WhatsApp, FiThumbsUp for general contact icon
  FiMapPin,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button"; // Assuming Button component exists and is adaptable
import InputField from "../../components/InputField"; // Assuming InputField component exists
import Section from "../../components/Section"; // Assuming Section component exists

// Equilibra CR Logo (optional for this page)
// const equilibraLogoPath = process.env.PUBLIC_URL + '/images/equilibra-logo.png';

// --- Equilibra CR New Color Palette ---
const colors = {
  background: "bg-[#FFF7F2]", // Neutral Light – Cream White
  surface: "bg-white", // White for cards/form background
  surfaceAccent: "bg-[#FDB386]/20", // Primary Color (Soft Peach) with low opacity for accents
  textPrimary: "text-[#5C5C5C]", // Typography – Warm Gray
  textSecondary: "text-[#A89C94]", // Complementary – Muted Taupe
  textHighlight: "text-[#E86F51]", // Accent Color – Coral Red
  iconColor: "text-[#E86F51]", // Accent Color – Coral Red
  buttonPrimaryBg: "bg-[#E86F51]", // Accent Color – Coral Red
  buttonPrimaryHover: "hover:bg-[#d95f41]", // Darker Coral Red
  buttonTextLight: "text-white",
  border: "border-[#A89C94]/40", // Muted Taupe for main borders
  borderLight: "border-[#F7C6B7]/60", // Secondary Color (Blush Pink) for lighter borders
  inputBorder: "border-[#A89C94]/60",
  inputFocusBorder: "focus:border-[#E86F51]",
  inputFocusRing: "focus:ring-[#E86F51]/50",
  errorText: "text-red-700", // Standard error red, can be adjusted
  successText: "text-emerald-600", // Standard success green
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

// --- Reusable ContactInfoItem ---
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
              links[index].startsWith("tel:") ||
              links[index].includes("wa.me")
                ? "_blank" // Open WhatsApp and mailto in new tab for safety
                : "_blank"
            }
            rel="noopener noreferrer"
            className={`block ${colors.textSecondary} hover:${colors.textHighlight} transition-colors text-base`}
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
  /* ... */
};

// --- Initial Form State ---
const initialFormData = { name: "", email: "", subject: "", message: "" };

// --- Main Equilibra CR Contact Page Component ---
export default function EquilibraContactPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    console.log("Equilibra CR Contact Form Submission:", formData);
    // Simulate API Call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      toast.success(
        "¡Mensaje enviado! Gracias por contactarnos. Te responderemos pronto.",
        { id: loadingToastId, duration: 4000 }
      );
      setFormData(initialFormData);
    } catch (error) {
      console.error("Equilibra CR Form Submission Error:", error);
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
            iconTheme: { primary: colors.errorText, secondary: "white" },
          },
        }}
      />

      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className="pt-24 md:pt-32 pb-12 md:pb-16 text-center border-b ${colors.borderLight}"
          ariaLabelledby="equilibra-contact-hero"
        >
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer()}
          >
            <motion.div
              variants={fadeInUp}
              className={`inline-block p-4 mb-6 rounded-full ${colors.surfaceAccent} border ${colors.borderAccent}`}
            >
              <FiThumbsUp className={`w-12 h-12 ${colors.iconColor}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="equilibra-contact-hero"
              className={`text-4xl sm:text-5xl font-bold ${colors.textPrimary} mb-4`}
            >
              Conecta con{" "}
              <span className={colors.textHighlight}>Equilibra CR</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              ¿Tienes preguntas, deseas agendar una asesoría o simplemente
              quieres saber más sobre nuestro enfoque no pesocentrista? Estamos
              aquí para escucharte.
            </motion.p>
          </motion.div>
        </Section>

        {/* Main Content: Contact Info & Form Grid */}
        <Section className="py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column: Direct Info */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.15)}
            >
              <h2
                className={`text-2xl font-semibold ${colors.textPrimary} mb-6 border-b ${colors.border} pb-3`}
              >
                Información de Contacto
              </h2>
              <ContactInfoItem
                icon={FiMessageCircle} // WhatsApp Icon
                title="WhatsApp Directo"
                lines={["+506 (Número de Equilibra CR)"]} // Placeholder - Use actual number
                links={["https://wa.me/message/CUOHZMZMTD5OK1"]} // Link from Instagram bio
              />
              <ContactInfoItem
                icon={FiMail}
                title="Correo Electrónico"
                lines={["nutricion@equilibracr.com"]} // Placeholder - Use actual email
                links={["mailto:nutricion@equilibracr.com"]}
              />
              <ContactInfoItem
                icon={FiCalendar}
                title="Horario de Atención"
                lines={[
                  "Lunes a Viernes: 9 AM - 6 PM",
                  "Sábados: 9 AM - 1 PM (con cita previa)",
                ]}
              />
              <ContactInfoItem
                icon={FiMapPin}
                title="Ubicación Principal"
                lines={[
                  "Consultas online disponibles.",
                  "Atención presencial en Costa Rica (coordinar).",
                ]}
              />
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
                Mensaje
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
                      iconType="user"
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
                      iconType="mail"
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
                    placeholder="Ej: Consulta sobre TCA, Asesoría nutricional"
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
                    placeholder="Escribe tu mensaje o consulta aquí..."
                    themeColors={colors}
                  />
                </motion.div>
                <motion.div variants={fadeInUp} className="text-right">
                  <Button
                    type="submit"
                    variant="custom" // Use custom to apply specific theme colors
                    size="lg"
                    disabled={isSubmitting}
                    icon={
                      isSubmitting ? (
                        <FiLoader className="animate-spin" />
                      ) : (
                        <FiSend />
                      )
                    }
                    className={`${colors.buttonPrimaryBg} ${
                      colors.buttonTextLight
                    } ${colors.buttonPrimaryHover} ${
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

        <p
          className={`text-center text-sm ${colors.textSecondary} mt-12 pb-16 flex items-center justify-center gap-1.5`}
        ></p>
      </main>
    </div>
  );
}

// --- PropTypes ---
EquilibraContactPage.propTypes = {};
ContactInfoItem.propTypes = {
  /* ... */
};
Section.propTypes = {
  /* ... */
};
InputField.propTypes = {
  /* ... */
}; // Assume InputField has its own PropTypes
Button.propTypes = {
  /* ... */
}; // Assume Button has its own PropTypes
