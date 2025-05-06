// src/pages/AnacoContactPage.js
// Reverted to OpenStreetMap iframe embed due to react-leaflet compatibility issue.
// Uses Green/White/Grey theme and Spanish language.
// Current time is Friday, May 2, 2025 at 10:18:38 AM CST. San José, Alajuela Province, Costa Rica.

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiLoader,
  FiInfo,
  FiHelpCircle,
  FiUser, // Removed unused icons
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// --- Reusable Components (Adjust path relative to this file's location) ---
import Button from "../../components/Button"; // Assuming Button component exists
import InputField from "../../components/InputField"; // Assuming InputField component exists

// --- Inline ContactInfoItem Component ---
const ContactInfoItem = ({ icon: Icon, title, lines, links }) => (
  <motion.div
    variants={fadeInUp}
    className="flex items-start text-left mb-6 md:mb-0"
  >
    {Icon && (
      <Icon
        className={`w-6 h-6 ${colors.primary} mr-4 mt-1 flex-shrink-0`}
        aria-hidden="true"
      />
    )}
    <div>
      <h3 className={`text-lg font-semibold ${colors.textDark} mb-1`}>
        {title}
      </h3>
      {lines.map((line, index) =>
        links && links[index] ? (
          <a
            key={index}
            href={links[index]}
            target={
              links[index].startsWith("mailto") ||
              links[index].startsWith("tel")
                ? "_self"
                : "_blank"
            }
            rel="noopener noreferrer"
            className={`block ${colors.secondary} hover:${colors.primary} transition-colors text-base`}
          >
            {line}
          </a>
        ) : (
          <p key={index} className={`${colors.secondary} text-base`}>
            {line}
          </p>
        )
      )}
    </div>
  </motion.div>
);
ContactInfoItem.propTypes = {
  /* Add PropTypes */
};

// --- Green/White/Grey Color Theme ---
const colors = {
  // Ensure this matches your theme
  background: "bg-slate-50",
  surface: "bg-white",
  primary: "text-emerald-700",
  primaryBg: "bg-emerald-600",
  primaryBgHover: "hover:bg-emerald-700",
  secondary: "text-slate-600",
  textDark: "text-slate-800",
  textLight: "text-white",
  border: "border-slate-300",
  inputBorder: "border-slate-300",
  inputFocusBorder: "focus:border-emerald-500",
  inputFocusRing: "focus:ring-emerald-500/50",
  errorText: "text-red-600",
};

// --- Simple Animation Variants ---
const viewportOnce = { once: true, amount: 0.2 };
const fadeInUp = {
  /* ... */ hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  /* ... */ visible: { transition: { staggerChildren: 0.1 } },
};

// --- Initial Form State ---
const initialFormData = { name: "", email: "", subject: "", message: "" };

// --- Main Contact Page Component ---
export default function AnacoContactPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const navigate = useNavigate(); // Import if needed

  const handleChange = (e) => {
    /* ... */
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    /* ... Form submission logic ... */
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToastId = toast.loading("Enviando su mensaje...");
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor complete Nombre, Email y Mensaje.", {
        id: loadingToastId,
      });
      setIsSubmitting(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Por favor ingrese un correo electrónico válido.", {
        id: loadingToastId,
      });
      setIsSubmitting(false);
      return;
    }
    console.log("Submitting Contact Form:", formData);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      toast.success("¡Mensaje enviado! Gracias por contactarnos.", {
        id: loadingToastId,
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error("Form Submission Error:", error);
      toast.error("Error al enviar el mensaje. Intente de nuevo.", {
        id: loadingToastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Timestamp for display
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // --- Map Details for iframe ---
  // Coordinates roughly for Cartago Centro. Get precise bbox/marker from OSM Share panel if needed.
  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-83.9252%2C9.8580%2C-83.9102%2C9.8680&layer=mapnik&marker=9.8630%2C-83.9177`;

  return (
    <div className={`${colors.background} ${colors.textDark} font-sans`}>
      <Toaster position="bottom-right" />

      {/* Optional: Add AnacoHeader here */}

      <main className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Page Header */}

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
          {/* Left Column: Contact Info & Map */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.section /* ... Header content ... */
              className="text-center mb-16 md:mb-20"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                variants={fadeInUp}
                className={`text-4xl md:text-5xl font-bold ${colors.textDark} mb-4`}
              >
                Contáctenos
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className={`text-lg ${colors.secondary} max-w-2xl mx-auto`}
              >
                Estamos aquí para ayudarle con sus consultas financieras.
                Complete el formulario o utilice nuestros datos de contacto
                directo.
              </motion.p>
            </motion.section>
            <motion.h2
              variants={fadeInUp}
              className={`text-2xl font-semibold ${colors.textDark} mb-6`}
            >
              Información Directa
            </motion.h2>

            {/* Contact Items */}
            <ContactInfoItem
              icon={FiPhone}
              title="Teléfono"
              lines={["+506 2551-6909"]}
              links={["tel:+50625516909"]}
            />
            <ContactInfoItem
              icon={FiMail}
              title="Correo Electrónico"
              lines={["info@anacocr.net"]}
              links={["mailto:info@anacocr.net"]}
            />
            {/* --- Map Container --- */}
            <motion.div
              variants={fadeInUp}
              className={`mt-8 rounded-lg border ${colors.border} overflow-hidden shadow-md h-80 relative`} // **** ADDED relative ****
            >
              <iframe
                title="Mapa de ubicación de ANACO Inversiones"
                width="100%"
                height="100%" // Fill the container height
                loading="lazy"
                frameBorder="0"
                scrolling="no"
                src={mapEmbedUrl}
                style={{ border: 0 }}
                className="absolute inset-0" // Make iframe fill container absolutely
              ></iframe>

              {/* **** ADDED Text Overlay **** */}
              <div
                className={`absolute bottom-2 left-2 p-2 px-3 rounded-md bg-black/60 backdrop-blur-sm pointer-events-none`}
              >
                <p className="flex items-center gap-1.5 text-xs text-white font-medium">
                  <FiMapPin className="w-3 h-3 flex-shrink-0" />
                  ANACO Inversiones | Cartago Centro, Costa Rica
                </p>
              </div>
              {/* **** END Text Overlay **** */}
            </motion.div>
            {/* --- End Map Container --- */}
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            className={`lg:col-span-3 ${colors.surface} p-6 md:p-8 rounded-xl shadow-lg border ${colors.border}`}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
          >
            {/* ... Form Title ... */}
            <h2
              className={`text-2xl font-semibold ${colors.textDark} mb-6 flex items-center gap-2`}
            >
              <FiHelpCircle className={colors.primary} />
              Envíenos su Consulta
            </h2>
            {/* ... Form JSX ... */}
            <motion.form
              onSubmit={handleSubmit}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* ... Input Fields ... */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <motion.div variants={fadeInUp}>
                  <InputField
                    label="Su Nombre"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nombre Completo"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <InputField
                    label="Su Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="su@correo.com"
                  />
                </motion.div>
              </div>
              <motion.div variants={fadeInUp} className="mb-5">
                {" "}
                <InputField
                  label="Asunto (Opcional)"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Ej: Consulta Crédito Hipotecario"
                />{" "}
              </motion.div>
              <motion.div variants={fadeInUp} className="mb-6">
                {" "}
                <InputField
                  label="Mensaje"
                  id="message"
                  name="message"
                  type="textarea"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Escriba su mensaje aquí..."
                />{" "}
              </motion.div>
              {/* ... Submit Button ... */}
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
                  className={`${colors.primaryBg} ${colors.primaryBgHover} ${
                    colors.textLight
                  } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </main>

      {/* Optional: Add AnacoFooter here */}
    </div>
  );
}

// --- PropTypes ---
// ContactInfoItem.propTypes = { /* ... */ };
// InputField.propTypes = { /* ... */ };
// Button.propTypes = { /* ... */ };
