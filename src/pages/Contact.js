// src/pages/Contact.js
// FINAL VERSION with embedded EN/ES translations and language toggle.
// Includes URL trigger, auto-scroll, and tag for Quick Message form.
// Current time: Thursday, May 1, 2025 at 8:31:56 PM CST (San José, Costa Rica)

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar,
  FiMessageSquare,
  FiHelpCircle,
  FiInfo,
  FiGlobe, // Added for language toggle
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// Import reusable components
import InputField from "../components/InputField"; // Adjust path if needed
import ContactInfoItem from "../components/ContactInfoItem"; // Adjust path if needed
import Button from "../components/Button"; // Adjust path if needed

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.2 };
const fadeInUp = {
  /* ... variant definition ... */ hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  /* ... variant definition ... */ hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// --- Light Theme Colors ---
const colors = {
  /* ... color definitions ... */ bgBase: "bg-neutral-light",
  bgWhite: "bg-neutral-white",
  textHeading: "text-neutral-dark",
  textBody: "text-neutral-main",
  textPrimary: "text-primary-main",
  textPrimaryDark: "text-primary-dark",
  primaryMain: "bg-primary-main",
  primaryDark: "hover:bg-primary-dark",
  primaryContrast: "text-primary-contrast",
  borderLight: "border-neutral-200",
  borderMedium: "border-neutral-300",
  borderPrimary: "border-primary-main",
  accentSuccess: "text-status-success",
  statusWarning: "text-status-warning",
  bgHighlightSoft: "bg-primary-main/10",
  borderHighlightSoft: "border-primary-main/20",
};

// --- Embedded Translations ---
const translations = {
  en: {
    langToggleButton: "Español",
    pageGenerated: "Page generated",
    // Hero
    heroTitle:
      "How can we <span class='text-primary-main'>help you</span> today?",
    heroSubtitle:
      "Choose an option below, send a quick message, or find our direct contact details.",
    businessHoursNote:
      "Note: It's currently outside our standard business hours (Mon-Fri, 9am-5pm EST). We'll respond as soon as possible!",
    // Action Cards
    demoCardTitle: "See LoyalShift in Action",
    demoCardDesc:
      "Get a personalized demo tailored to your specific legacy systems and business goals.",
    demoCardButton: "Schedule a Demo",
    salesCardTitle: "Talk to Our Sales Team",
    salesCardDesc:
      "Discuss your project requirements, pricing, or get answers to specific sales questions.",
    salesCardButton: "Contact Sales",
    // Quick Message Trigger
    quickMessageTriggerTitle: "Have a Different Question?",
    quickMessageTriggerSubtitle: "Click here to send us a quick message.",
    quickMessageTriggerNote: "We typically respond within one business day.",
    quickMessageTriggerNoteDelayed: " (Responses might take a bit longer).",
    // Quick Message Form
    quickMessageFormTitle: "Send Quick Message",
    quickMessageFormTag: "General Inquiry",
    quickMessageFormSubtitle: "Just need your email and message.",
    inputEmailLabel: "Your Email",
    inputEmailPlaceholder: "So we can reply to you",
    inputMessageLabel: "Your Message / Inquiry",
    inputMessagePlaceholder: "Ask us anything...",
    buttonSending: "Sending...",
    buttonSendMessage: "Send Quick Message",
    buttonCancel: "Cancel",
    toastErrorGeneric: "An error occurred.",
    toastErrorFields: "Please fill in both email and message.",
    toastErrorEmail: "Please enter a valid email address.",
    toastErrorSend: "Failed to send message. Please try again.",
    toastSuccess: "Message sent! We'll reply soon.",
    toastLoading: "Sending your message...",
    // Direct Contact
    directContactTitle: "Direct Contact",
    contactEmailTitle: "Email Us",
    contactEmailLines: ["info@loyalshift.com", "General Inquiries"],
    contactDemoSalesTitle: "Demo / Sales",
    contactDemoSalesLines: ["Schedule Call", "Discuss your project"],
    contactOfficeTitle: "Office",
    contactOfficeLines: ["Boston, MA", "(By Appointment Only)"],
    // Timestamp
    currentTimePrefix: "Current time",
  },
  es: {
    langToggleButton: "English",
    pageGenerated: "Página generada",
    // Hero
    heroTitle:
      "¿Cómo podemos <span class='text-primary-main'>ayudarle</span> hoy?",
    heroSubtitle:
      "Elija una opción, envíe un mensaje rápido o encuentre nuestros datos de contacto directo.",
    businessHoursNote:
      "Nota: Actualmente fuera de horario de oficina (Lun-Vie, 9am-5pm EST). ¡Responderemos lo antes posible!",
    // Action Cards
    demoCardTitle: "Vea LoyalShift en Acción",
    demoCardDesc:
      "Obtenga una demostración personalizada adaptada a sus sistemas legados y objetivos específicos.",
    demoCardButton: "Agendar Demo",
    salesCardTitle: "Hable con Ventas",
    salesCardDesc:
      "Discuta los requisitos de su proyecto, precios, o obtenga respuestas a preguntas específicas de ventas.",
    salesCardButton: "Contactar a Ventas",
    // Quick Message Trigger
    quickMessageTriggerTitle: "¿Tiene otra consulta?",
    quickMessageTriggerSubtitle:
      "Haga clic aquí para enviarnos un mensaje rápido.",
    quickMessageTriggerNote: "Normalmente respondemos en un día hábil.",
    quickMessageTriggerNoteDelayed:
      " (Las respuestas podrían demorar un poco más).",
    // Quick Message Form
    quickMessageFormTitle: "Enviar Mensaje Rápido",
    quickMessageFormTag: "Consulta General",
    quickMessageFormSubtitle: "Solo necesitamos su email y mensaje.",
    inputEmailLabel: "Su Email",
    inputEmailPlaceholder: "Para poder responderle",
    inputMessageLabel: "Su Mensaje / Consulta",
    inputMessagePlaceholder: "Escríbanos su consulta...",
    buttonSending: "Enviando...",
    buttonSendMessage: "Enviar Mensaje",
    buttonCancel: "Cancelar",
    toastErrorGeneric: "Ocurrió un error.",
    toastErrorFields: "Por favor complete email y mensaje.",
    toastErrorEmail: "Por favor ingrese un correo electrónico válido.",
    toastErrorSend: "Fallo el envío. Por favor intente de nuevo.",
    toastSuccess: "¡Mensaje enviado! Responderemos pronto.",
    toastLoading: "Enviando mensaje...",
    // Direct Contact
    directContactTitle: "Contacto Directo",
    contactEmailTitle: "Email",
    contactEmailLines: ["info@loyalshift.com", "Consultas Generales"],
    contactDemoSalesTitle: "Demo / Ventas",
    contactDemoSalesLines: ["Agendar Llamada", "Discutir su proyecto"],
    contactOfficeTitle: "Oficina",
    contactOfficeLines: ["Boston, MA", "(Solo con cita previa)"],
    // Timestamp
    currentTimePrefix: "Hora actual",
  },
};

export default function Contact() {
  const initialFormData = { email: "", message: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [showQuickMessage, setShowQuickMessage] = useState(false);
  const [needsScroll, setNeedsScroll] = useState(false);
  const quickMessageSectionRef = useRef(null);

  // **** Language State and Toggle ****
  const [language, setLanguage] = useState("en"); // Default to English
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "es" ? "en" : "es"));
  };
  const t = translations[language]; // Select the active translation object
  // **** End Language State ****

  // --- Effect to check URL parameter ---
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("form") === "quick") {
      if (!showQuickMessage) {
        setShowQuickMessage(true);
        setNeedsScroll(true);
      }
    }
  }, [location.search, showQuickMessage]);

  // --- Effect to perform scroll ---
  useEffect(() => {
    if (showQuickMessage && needsScroll) {
      const scrollTimer = setTimeout(() => {
        quickMessageSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setNeedsScroll(false);
      }, 150);
      return () => clearTimeout(scrollTimer);
    }
  }, [showQuickMessage, needsScroll]);

  // --- Time Info ---
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isOutsideBusinessHours = hour < 9 || hour >= 17;
  // --- End Time Info ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQuickMessageSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      // Use translated toast message
      toast.error(t.toastErrorFields);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // Use translated toast message
      toast.error(t.toastErrorEmail);
      return;
    }
    setSubmissionStatus("submitting");
    // Use translated toast message
    const toastId = toast.loading(t.toastLoading);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (Math.random() > 0.1) {
        console.log("Quick Message Submitted:", formData);
        // Use translated toast message
        toast.success(t.toastSuccess, { id: toastId });
        setFormData(initialFormData);
        setShowQuickMessage(false);
      } else {
        // Use translated toast message
        throw new Error(t.toastErrorSend);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      // Use translated toast message
      toast.error(error.message || t.toastErrorGeneric, { id: toastId });
    } finally {
      setSubmissionStatus("idle");
    }
  };

  const isSubmitting = submissionStatus === "submitting";

  // Timestamp for display
  const currentTime = new Date().toLocaleString(
    language === "es" ? "es-CR" : "en-US",
    {
      // Dynamic locale
      timeZone: "America/Costa_Rica",
      dateStyle: "medium",
      timeStyle: "short",
    }
  );

  return (
    <div className={`py-16 md:py-24 ${colors.bgBase}`}>
      {/* Language Toggle Button */}
      <div className="container mx-auto px-4 flex justify-end mb-4 sm:mb-0 sm:absolute sm:top-28 sm:right-6 z-20">
        <motion.button
          onClick={toggleLanguage}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow border ${colors.borderLight} text-xs ${colors.textBody} hover:${colors.textHeading}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t.langToggleButton}
        >
          <FiGlobe className="w-4 h-4" />
          {/* Display the name of the *other* language */}
          {language === "es" ? "English" : "Español"}
        </motion.button>
      </div>

      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="container mx-auto px-4">
        {/* --- Interactive Header --- */}
        <motion.section
          className="text-center mt-16 mb-16 md:mb-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colors.textHeading} mb-5`}
            // Render HTML from translation key
            dangerouslySetInnerHTML={{ __html: t.heroTitle }}
          />
          <motion.p
            variants={fadeInUp}
            className={`text-lg md:text-xl ${colors.textBody} max-w-3xl mx-auto mb-8`}
          >
            {t.heroSubtitle}
            {(isWeekend || isOutsideBusinessHours) && (
              <span className={`block text-sm mt-2 ${colors.statusWarning}`}>
                {t.businessHoursNote}
              </span>
            )}
          </motion.p>
        </motion.section>

        {/* --- Primary Action Cards --- */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-20 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {/* Schedule a Demo Card */}
          <motion.div variants={fadeInUp}>
            <div
              className={`${colors.bgWhite} p-8 rounded-lg shadow-lg border ${colors.borderLight} text-center h-full flex flex-col justify-between hover:border-primary-main transition-colors duration-300`}
            >
              <FiCalendar
                className={`w-12 h-12 ${colors.textPrimary} mx-auto mb-4`}
              />
              <h2 className={`text-2xl font-bold ${colors.textHeading} mb-3`}>
                {t.demoCardTitle}
              </h2>
              <p className={`${colors.textBody} mb-6 flex-grow`}>
                {t.demoCardDesc}
              </p>
              <Button
                to="/request-demo"
                variant="primary"
                size="lg"
                className="w-full"
              >
                {t.demoCardButton}
              </Button>
            </div>
          </motion.div>

          {/* Talk to Sales Card */}
          <motion.div variants={fadeInUp}>
            <div
              className={`${colors.bgWhite} p-8 rounded-lg shadow-lg border ${colors.borderLight} text-center h-full flex flex-col justify-between hover:border-primary-main transition-colors duration-300`}
            >
              <FiMessageSquare
                className={`w-12 h-12 ${colors.textPrimary} mx-auto mb-4`}
              />
              <h2 className={`text-2xl font-bold ${colors.textHeading} mb-3`}>
                {t.salesCardTitle}
              </h2>
              <p className={`${colors.textBody} mb-6 flex-grow`}>
                {t.salesCardDesc}
              </p>
              <Button
                to="/contact-sales"
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {t.salesCardButton}
              </Button>
            </div>
          </motion.div>
        </motion.section>

        {/* --- Quick Message / General Inquiry Section --- */}
        <motion.section
          ref={quickMessageSectionRef}
          id="quick-message-section"
          className="mb-16 md:mb-20 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <AnimatePresence mode="wait">
            {!showQuickMessage ? (
              // Trigger Card
              <motion.div
                key="trigger-card"
                className={`bg-neutral-white p-6 md:p-8 rounded-lg shadow-md border ${colors.borderLight} text-center cursor-pointer hover:shadow-lg hover:border-primary-main/40 transition-all duration-300 group`}
                onClick={() => setShowQuickMessage(true)}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FiHelpCircle className="w-12 h-12 text-primary-main mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary-dark" />
                <h2 className="text-2xl font-bold text-neutral-dark mb-2 group-hover:text-primary-main transition-colors">
                  {t.quickMessageTriggerTitle}
                </h2>
                <p className="text-neutral-main mb-0 group-hover:text-neutral-dark transition-colors">
                  {t.quickMessageTriggerSubtitle}
                </p>
                <p className="text-sm text-neutral-main/70 mt-2">
                  {t.quickMessageTriggerNote}
                  {(isWeekend || isOutsideBusinessHours) &&
                    t.quickMessageTriggerNoteDelayed}
                </p>
              </motion.div>
            ) : (
              // Form Title Block
              <motion.div>
                <motion.div
                  key="form-title"
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-center gap-x-3 mb-2">
                    <h2 className={`text-3xl font-bold ${colors.textHeading}`}>
                      {t.quickMessageFormTitle}
                    </h2>
                    <span
                      className={`text-xs font-semibold ${colors.textPrimary} ${colors.bgHighlightSoft} px-2.5 py-1 rounded-full border ${colors.borderHighlightSoft}`}
                    >
                      {t.quickMessageFormTag}
                    </span>
                  </div>
                  <p className={`${colors.textBody} transition-colors`}>
                    {t.quickMessageFormSubtitle}
                  </p>
                </motion.div>
                <motion.form /* ... form attributes ... */
                  key="quick-message-form"
                  onSubmit={handleQuickMessageSubmit}
                  className="space-y-5 bg-neutral-white p-6 md:p-8 rounded-lg shadow-md border border-neutral-light text-left"
                  initial={{
                    opacity: 0,
                    height: 0,
                    marginTop: 0,
                    overflow: "hidden",
                  }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1.5rem" }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    marginTop: 0,
                    overflow: "hidden",
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <InputField
                    id="quick-email"
                    name="email"
                    label={t.inputEmailLabel}
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t.inputEmailPlaceholder}
                  />
                  <InputField
                    id="quick-message"
                    name="message"
                    label={t.inputMessageLabel}
                    type="textarea"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t.inputMessagePlaceholder}
                  />
                  <div className="flex flex-wrap justify-between items-center gap-4 pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      icon={
                        isSubmitting ? (
                          <FiLoader className="animate-spin h-5 w-5" />
                        ) : (
                          <FiSend className="h-5 w-5" />
                        )
                      }
                      size="lg"
                    >
                      {isSubmitting ? t.buttonSending : t.buttonSendMessage}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setShowQuickMessage(false)}
                      className="text-sm text-neutral-main hover:text-neutral-dark font-medium transition-colors duration-200 px-3 py-2 rounded hover:bg-neutral-main/10"
                      aria-label={t.buttonCancel}
                    >
                      {t.buttonCancel}
                    </button>
                  </div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* --- Direct Contact Information --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          <h2
            className={`text-3xl font-bold ${colors.textHeading} text-center mb-10`}
          >
            {t.directContactTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div variants={fadeInUp}>
              <ContactInfoItem
                icon={FiMail}
                title={t.contactEmailTitle}
                lines={t.contactEmailLines} // Use array from translations
                links={["mailto:info@loyalshift.com", null]}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ContactInfoItem
                icon={FiCalendar}
                title={t.contactDemoSalesTitle}
                lines={t.contactDemoSalesLines} // Use array from translations
                links={["/contact-sales", "/request-demo"]}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ContactInfoItem
                icon={FiMapPin}
                title={t.contactOfficeTitle}
                lines={t.contactOfficeLines} // Use array from translations
              />
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

// --- PropType Definitions ---
InputField.propTypes = {
  /* ... */
};
ContactInfoItem.propTypes = {
  /* ... */
};
Button.propTypes = {
  /* ... */
};
