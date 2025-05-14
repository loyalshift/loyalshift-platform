// src/pages/Girya/ContactPage.js
// Contact page for Girya, allowing users to select topics including coaches, programs, etc.
// UPDATED: Replaced "Visítanos" text block with an embedded map.
// Uses a Light Earthy Fitness / Mindful Strength Theme.
// Current time: Tuesday, May 13, 2025 at 3:00 PM CST.

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import PropTypes from "prop-types";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiLoader,
  FiInfo,
  FiHelpCircle,
  FiUser,
  FiMessageSquare,
  FiChevronDown,
  FiActivity,
  FiPackage,
  FiAward,
  FiBriefcase,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Section from "../../components/Section";
import { createScaleUp } from "../../utils/animationVariants";

const scaleUp = createScaleUp();

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
  inputBorder: "border-stone-300",
  inputFocusBorder: "focus:border-emerald-500",
  inputFocusRing: "focus:ring-emerald-500/50",
  errorText: "text-red-600",
  // Map overlay colors
  mapOverlayBg: "bg-black/60 backdrop-blur-sm",
  mapOverlayText: "text-white",
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };

// --- Mock Data ---
const mockCoaches = [
  { id: "aryehhalabi", name: "Aryeh Halabi" },
  { id: "gabrielcamacho", name: "Gabriel Camacho Jiménez" },
  { id: "sofiacvargas", name: "Sofía Vargas (Movilidad)" },
];

const inquiryTopics = [
  { value: "general", label: "Consulta General" },
  { value: "programs", label: "Información de Programas" },
  { value: "equipment", label: "Equipamiento (Kettlebells, etc.)" },
  { value: "subscriptions", label: "Membresías / Inscripciones" },
  { value: "franchise", label: "Oportunidad de Franquicia" },
  { value: "coaching_general", label: "Coaching (General)" },
  { value: "coaching_specific", label: "Coaching (Coach Específico)" },
];

// --- Initial Form State ---
const initialFormData = {
  name: "",
  email: "",
  phone: "",
  topic: "general",
  specificCoach: "",
  message: "",
};

// --- Main Girya Contact Page Component ---
export default function GiryaContactPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation(); // For reading query params

  // Pre-fill form based on query params (e.g., from a "Contact Coach" button)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subject = params.get("subject");
    const coach = params.get("coach");

    if (subject) {
      // A simple way to pre-fill topic based on subject
      if (subject.toLowerCase().includes("franquicia")) {
        setFormData((prev) => ({
          ...prev,
          topic: "franchise",
          message: `Interesado/a en la oportunidad de franquicia.\n\n`,
        }));
      } else if (
        subject.toLowerCase().includes("programas") ||
        subject.toLowerCase().includes("equipamiento")
      ) {
        setFormData((prev) => ({
          ...prev,
          topic: "programs",
          message: `Consulta sobre ${subject}.\n\n`,
        }));
      } else if (subject.toLowerCase().includes("coach") && coach) {
        setFormData((prev) => ({
          ...prev,
          topic: "coaching_specific",
          specificCoach: coach,
          message: `Consulta para el coach ${
            mockCoaches.find((c) => c.id === coach)?.name || coach
          }.\n\n`,
        }));
      } else {
        setFormData((prev) => ({ ...prev, message: `${subject}\n\n` }));
      }
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "topic" &&
        value !== "coaching_specific" && { specificCoach: "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToastId = toast.loading("Enviando su mensaje...");

    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.topic
    ) {
      toast.error("Por favor complete Nombre, Email, Tema y Mensaje.", {
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
    if (formData.topic === "coaching_specific" && !formData.specificCoach) {
      toast.error("Por favor seleccione un coach específico.", {
        id: loadingToastId,
      });
      setIsSubmitting(false);
      return;
    }

    console.log("Submitting Girya Contact Form:", formData);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      toast.success(
        "¡Mensaje enviado! Gracias por contactarnos. Le responderemos pronto.",
        { id: loadingToastId, duration: 4000 }
      );
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

  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  // Placeholder map URL - REPLACE with Girya's actual location embed URL
  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-83.9252%2C9.8580%2C-83.9102%2C9.8680&layer=mapnik&marker=9.8630%2C-83.9177`; // Centered on Cartago

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <Toaster position="bottom-right" />
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.background}
          className="relative pt-24 md:pt-32 pb-12 md:pb-16 text-center overflow-hidden"
          ariaLabelledby="girya-contact-hero"
        >
          <div className="absolute inset-0 opacity-[3%] bg-[url('/public/images/financial-texture.png')] bg-repeat mix-blend-overlay"></div>
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
              <FiMessageSquare
                className={`w-12 h-12 ${colors.textHighlight}`}
              />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="girya-contact-hero"
              className={`text-4xl sm:text-5xl font-extrabold ${colors.textPrimary} mb-4 leading-tight`}
            >
              Conéctate con <span className={colors.textHighlight}>Girya</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              ¿Preguntas? ¿Interesado en nuestros programas, equipamiento o una
              franquicia? Estamos aquí para ayudarte a iniciar tu viaje de
              Mindful Strength.
            </motion.p>
          </motion.div>
        </Section>

        {/* Contact Form and Info Section */}
        <Section
          bg={colors.surface}
          className={`py-16 md:py-20 border-y ${colors.border}`}
          ariaLabelledby="contact-form-title"
        >
          <div className="grid lg:grid-cols-3 gap-10 md:gap-16 items-start max-w-6xl mx-auto">
            {/* Left Column: Contact Form */}
            <motion.div
              className={`lg:col-span-2 ${colors.surface} p-6 md:p-8 rounded-xl shadow-xl border ${colors.borderMedium}`}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <h2
                id="contact-form-title"
                className={`text-2xl font-bold ${colors.textPrimary} mb-6 flex items-center gap-2`}
              >
                <FiHelpCircle className={colors.iconColor} /> Envíanos tu
                Consulta
              </h2>
              <motion.form
                onSubmit={handleSubmit}
                variants={staggerContainer}
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
                      icon={FiUser}
                      inputClassName={`${colors.background} ${colors.textPrimary} placeholder:${colors.textSecondary}`}
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
                      icon={FiMail}
                      inputClassName={`${colors.background} ${colors.textPrimary} placeholder:${colors.textSecondary}`}
                    />
                  </motion.div>
                </div>
                <motion.div variants={fadeInUp} className="mb-5">
                  <InputField
                    label="Teléfono (Opcional)"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="8888-8888"
                    icon={FiPhone}
                    inputClassName={`${colors.background} ${colors.textPrimary} placeholder:${colors.textSecondary}`}
                  />
                </motion.div>

                <motion.div variants={fadeInUp} className="mb-5">
                  <label
                    htmlFor="topic"
                    className={`block text-sm font-medium ${colors.textSecondary} mb-1`}
                  >
                    Tema de Consulta{" "}
                    <span className={`${colors.textHighlight}`}>*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 border ${colors.inputBorder} rounded-md focus:outline-none ${colors.inputFocusRing} ${colors.inputFocusBorder} transition duration-150 ease-in-out ${colors.background} ${colors.textPrimary} appearance-none pr-10`}
                    >
                      {inquiryTopics.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown
                      className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.textSecondary} pointer-events-none`}
                    />
                  </div>
                </motion.div>

                {formData.topic === "coaching_specific" && (
                  <motion.div
                    variants={fadeInUp}
                    className="mb-5"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label
                      htmlFor="specificCoach"
                      className={`block text-sm font-medium ${colors.textSecondary} mb-1`}
                    >
                      Coach Específico (Opcional)
                    </label>
                    <div className="relative">
                      <select
                        id="specificCoach"
                        name="specificCoach"
                        value={formData.specificCoach}
                        onChange={handleChange}
                        className={`w-full p-3 border ${colors.inputBorder} rounded-md focus:outline-none ${colors.inputFocusRing} ${colors.inputFocusBorder} transition duration-150 ease-in-out ${colors.background} ${colors.textPrimary} appearance-none pr-10`}
                      >
                        <option value="">Seleccionar Coach...</option>
                        {mockCoaches.map((coach) => (
                          <option key={coach.id} value={coach.id}>
                            {coach.name}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown
                        className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.textSecondary} pointer-events-none`}
                      />
                    </div>
                  </motion.div>
                )}

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
                    placeholder="Escribe tu consulta aquí..."
                    inputClassName={`${colors.background} ${colors.textPrimary} placeholder:${colors.textSecondary}`}
                  />
                </motion.div>
                <motion.div variants={fadeInUp} className="text-right mt-6">
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
                    className={`${colors.buttonPrimaryBg} ${colors.buttonPrimaryHover} ${colors.buttonText}`}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>

            {/* Right Column: Direct Contact Info & Map */}
            <motion.div
              className="lg:col-span-1 space-y-8"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div
                className={`p-6 rounded-xl ${colors.surfaceAccent} border ${colors.borderAccent}`}
              >
                <h3
                  className={`text-xl font-bold ${colors.textPrimary} mb-4 flex items-center gap-2`}
                >
                  <FiPhone className={colors.iconColor} /> Llámanos
                </h3>
                <a
                  href="tel:+506XXXXXXX"
                  className={`${colors.textSecondary} hover:${colors.textHighlight} text-lg block`}
                >
                  +506 XXXX-XXXX
                </a>
                <p className={`${colors.textSecondary} text-sm`}>
                  Lunes a Viernes, 8am - 6pm
                </p>
              </div>
              <div
                className={`p-6 rounded-xl ${colors.surfaceAccent} border ${colors.borderAccent}`}
              >
                <h3
                  className={`text-xl font-bold ${colors.textPrimary} mb-4 flex items-center gap-2`}
                >
                  <FiMail className={colors.iconColor} /> Escríbenos
                </h3>
                <a
                  href="mailto:info@giryacr.com"
                  className={`${colors.textSecondary} hover:${colors.textHighlight} text-lg block`}
                >
                  info@giryacr.com
                </a>
                <p className={`${colors.textSecondary} text-sm`}>
                  Respondemos en 24-48 horas hábiles.
                </p>
              </div>

              <div
                className={`p-6 rounded-xl ${colors.surfaceAccent} border ${colors.borderAccent}`}
              >
                <h3
                  className={`text-xl font-bold ${colors.textPrimary} mb-4 flex items-center gap-2`}
                >
                  <FiMapPin className={colors.iconColor} /> Visítanos
                </h3>
                <p className={`${colors.textSecondary} text-base mb-3`}>
                  [Dirección Completa de Girya],
                  <br />
                  Cartago, Costa Rica
                </p>
                <motion.div
                  variants={fadeInUp}
                  className={`mt-4 rounded-lg border ${colors.border} overflow-hidden shadow-md h-64 md:h-72 relative`}
                >
                  <iframe
                    title="Mapa de ubicación de Girya"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    frameBorder="0"
                    scrolling="no"
                    src={mapEmbedUrl}
                    style={{ border: 0 }}
                    className="absolute inset-0"
                  ></iframe>
                  <div
                    className={`absolute bottom-2 left-2 p-2 px-3 rounded-md ${colors.mapOverlayBg} pointer-events-none`}
                  >
                    <p
                      className={`flex items-center gap-1.5 text-xs ${colors.mapOverlayText} font-medium`}
                    >
                      <FiMapPin className="w-3 h-3 flex-shrink-0" />
                      Girya CR | Cartago, Costa Rica
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Section>
      </main>
    </div>
  );
}

// --- PropTypes ---
GiryaContactPage.propTypes = {};
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  icon: PropTypes.elementType,
  inputClassName: PropTypes.string,
  rows: PropTypes.number,
};
Button.propTypes = {
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};
