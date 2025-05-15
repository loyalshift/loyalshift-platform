// src/pages/Afc/AFCEnrollmentPage.js
// Multi-step enrollment page for Athletic Functional Center (AFC).
// Collects personal/health info, explains admin fee, handles mock payment, and confirms.
// Uses AFC light theme with red accents.
// Current time: Wednesday, May 14, 2025 at 3:30 PM CST.

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiUser,
  FiShield,
  FiCreditCard,
  FiCheckCircle,
  FiLoader,
  FiSend,
  FiArrowRight,
  FiArrowLeft,
  FiDollarSign,
  FiHome,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";
import InputField from "../../components/InputField"; // Assuming InputField can handle 'textarea' and 'date' types
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.svg"; // AFC Logo

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
  successText: "text-green-600",
  buttonTextLight: "text-white",
  disabledButtonBg: "bg-slate-400",
  disabledButtonText: "text-slate-700",
};

const formStepVariants = {
  hidden: (direction) => ({ opacity: 0, x: direction > 0 ? 50 : -50 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", duration: 0.4, ease: "easeInOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction < 0 ? 50 : -50,
    transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
  }),
};

// --- Progress Bar Component ---
const ProgressBar = ({ currentStep, totalSteps }) => (
  <div className="w-full bg-slate-200 rounded-full h-2.5 mb-8 shadow-inner">
    <motion.div
      className={`${colors.accentRedBg} h-2.5 rounded-full transition-all duration-500 ease-out`}
      initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
      animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
    />
  </div>
);
ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

// --- Initial Form States ---
const initialPersonalData = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  medicalConditions: "",
  specialNeeds: "",
};
const initialPaymentData = {
  cardholderName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
};

// --- Main AFC Enrollment Page Component ---
export default function AFCEnrollmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // For animation direction
  const [personalData, setPersonalData] = useState(initialPersonalData);
  const [paymentConsent, setPaymentConsent] = useState(false);
  const [paymentData, setPaymentData] = useState(initialPaymentData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalFormSteps = 4; // 1: Personal, 2: Fee & Consent, 3: Payment, 4: Success

  const administrativeFee = 25000; // Example: ₡25,000
  const discountPercentage = 0.3; // 30% off
  const discountedFee = administrativeFee * (1 - discountPercentage);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    // Add input masking/formatting for card number, expiry if desired
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (
      !personalData.fullName.trim() ||
      !personalData.email.trim() ||
      !personalData.phone.trim()
    ) {
      toast.error("Por favor, complete Nombre, Email y Teléfono.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(personalData.email)) {
      toast.error("Por favor, ingrese un correo electrónico válido.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!paymentConsent) {
      toast.error(
        "Debe aceptar los términos de la cuota administrativa para continuar."
      );
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (
      !paymentData.cardholderName.trim() ||
      !paymentData.cardNumber.trim() ||
      !paymentData.expiryDate.trim() ||
      !paymentData.cvv.trim()
    ) {
      toast.error("Por favor, complete todos los detalles de la tarjeta.");
      return false;
    }
    // Add more specific card validation (Luhn, expiry format, etc.) in a real app
    if (!/^\d{13,19}$/.test(paymentData.cardNumber.replace(/\s/g, ""))) {
      toast.error("Número de tarjeta inválido.");
      return false;
    }
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(paymentData.expiryDate)) {
      toast.error("Fecha de expiración inválida (MM/AA).");
      return false;
    }
    if (!/^\d{3,4}$/.test(paymentData.cvv)) {
      toast.error("CVV inválido.");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, totalFormSteps));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Procesando pago de inscripción...");

    console.log("Submitting Enrollment:", {
      personalData,
      paymentData,
      feePaid: discountedFee,
    });
    // Simulate API Call for payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulate network delay
      // Assume payment success
      toast.success("¡Pago Exitoso! Su inscripción está completa.", {
        id: toastId,
        duration: 3000,
      });
      // In a real app, you'd get a transaction ID, etc.
      // Here, we just move to the success step
      nextStep(); // This will move to step 4
    } catch (error) {
      console.error("Payment Submission Error:", error);
      toast.error(
        "Error al procesar el pago. Por favor, verifique sus datos o intente más tarde.",
        { id: toastId }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  function formatCurrency(value, currency = "CRC") {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return "";
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numberValue);
  }

  return (
    <div className={`${colors.background} min-h-screen mt-16 py-12 md:py-16`}>
      <Toaster
        position="bottom-center"
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
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          className={`${colors.surface} p-6 md:p-10 rounded-xl shadow-2xl border ${colors.borderLight}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <img
              src={afcLogoPath}
              alt="AFC Logo"
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className={`text-3xl font-bold ${colors.textPrimary} mb-2`}>
              Inscripción a Athletic Functional Center
            </h1>
            {currentStep <= 3 && (
              <p className={`${colors.textSecondary}`}>
                Paso {currentStep} de {totalFormSteps - 1}
              </p>
            )}
          </div>

          {currentStep <= 3 && (
            <ProgressBar
              currentStep={currentStep}
              totalSteps={totalFormSteps - 1}
            />
          )}

          <AnimatePresence mode="wait" custom={direction}>
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={formStepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                <h2
                  className={`text-xl font-semibold ${colors.textPrimary} mb-3 flex items-center`}
                >
                  <FiUser className="mr-2" />
                  Información Personal
                </h2>
                <InputField
                  label="Nombre Completo"
                  id="fullName"
                  name="fullName"
                  value={personalData.fullName}
                  onChange={handlePersonalChange}
                  required
                  placeholder="Tu nombre completo"
                  themeColors={colors}
                />
                <InputField
                  label="Correo Electrónico"
                  id="email"
                  name="email"
                  type="email"
                  value={personalData.email}
                  onChange={handlePersonalChange}
                  required
                  placeholder="tu@correo.com"
                  themeColors={colors}
                />
                <InputField
                  label="Número de Teléfono"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={personalData.phone}
                  onChange={handlePersonalChange}
                  required
                  placeholder="8888-8888"
                  themeColors={colors}
                />
                <InputField
                  label="Fecha de Nacimiento (Opcional)"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={personalData.dateOfBirth}
                  onChange={handlePersonalChange}
                  themeColors={colors}
                />
                <InputField
                  label="Contacto de Emergencia - Nombre (Opcional)"
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={personalData.emergencyContactName}
                  onChange={handlePersonalChange}
                  placeholder="Nombre del contacto"
                  themeColors={colors}
                />
                <InputField
                  label="Contacto de Emergencia - Teléfono (Opcional)"
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  type="tel"
                  value={personalData.emergencyContactPhone}
                  onChange={handlePersonalChange}
                  placeholder="Teléfono del contacto"
                  themeColors={colors}
                />
                <InputField
                  label="Condiciones Médicas Relevantes (Opcional)"
                  id="medicalConditions"
                  name="medicalConditions"
                  type="textarea"
                  rows={3}
                  value={personalData.medicalConditions}
                  onChange={handlePersonalChange}
                  placeholder="Alergias, lesiones previas, etc."
                  themeColors={colors}
                />
                <InputField
                  label="¿Necesitas Alguna Adaptación o Atención Especial? (Opcional)"
                  id="specialNeeds"
                  name="specialNeeds"
                  type="textarea"
                  rows={3}
                  value={personalData.specialNeeds}
                  onChange={handlePersonalChange}
                  placeholder="Describe tus necesidades"
                  themeColors={colors}
                />
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={nextStep}
                    variant="primary"
                    size="lg"
                    icon={<FiArrowRight />}
                    className={`${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover}`}
                  >
                    Siguiente
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={formStepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                <h2
                  className={`text-xl font-semibold ${colors.textPrimary} mb-3 flex items-center`}
                >
                  <FiDollarSign className="mr-2" />
                  Cuota Administrativa y Consentimiento
                </h2>
                <div
                  className={`p-4 rounded-md ${colors.surfaceAccent} border ${colors.borderAccent}`}
                >
                  <p className={`${colors.textSecondary} text-sm`}>
                    Para unirte a AFC, requerimos una única cuota
                    administrativa. Esta cuota cubre tu evaluación inicial,
                    configuración en nuestra plataforma "AFC Connect" y un kit
                    de bienvenida.
                  </p>
                  <p className={`mt-3 text-lg ${colors.textPrimary}`}>
                    Cuota Regular:{" "}
                    <span className="line-through">
                      {formatCurrency(administrativeFee)}
                    </span>
                  </p>
                  <p className={`text-2xl font-bold ${colors.accentRed}`}>
                    Oferta Especial: {formatCurrency(discountedFee)} (¡30% de
                    Descuento!)
                  </p>
                </div>
                <div
                  className={`p-4 mt-4 rounded-md bg-slate-100 border ${colors.border}`}
                >
                  <h3
                    className={`text-md font-semibold ${colors.textPrimary} mb-2 flex items-center`}
                  >
                    <FiShield className="mr-2" />
                    Confidencialidad de su Información
                  </h3>
                  <p className={`${colors.textMuted} text-xs leading-relaxed`}>
                    Su privacidad es primordial. Toda la información personal y
                    de salud que proporcione es confidencial y se gestiona
                    principalmente a través de sistemas automatizados para la
                    personalización de su experiencia y seguridad. El personal
                    administrativo y los gerentes de AFC NO tienen acceso
                    directo a sus detalles médicos o de salud sensibles; solo
                    acceden a su nombre, datos de contacto, especificaciones
                    atléticas relevantes para la programación y el estado de su
                    pago. Esta información se utiliza exclusivamente para la
                    gestión de su membresía y la optimización de nuestros
                    servicios.
                  </p>
                </div>
                <div className="flex items-start mt-4">
                  <input
                    type="checkbox"
                    id="paymentConsent"
                    name="paymentConsent"
                    checked={paymentConsent}
                    onChange={(e) => setPaymentConsent(e.target.checked)}
                    className={`h-5 w-5 mt-1 rounded ${colors.accentRed} border-gray-300 focus:ring-red-500`}
                  />
                  <label
                    htmlFor="paymentConsent"
                    className={`ml-2 text-sm ${colors.textSecondary}`}
                  >
                    He leído y acepto los términos del pago de la cuota
                    administrativa de{" "}
                    <strong className={colors.textPrimary}>
                      {formatCurrency(discountedFee)}
                    </strong>{" "}
                    y entiendo que es un cargo único. Confirmo la veracidad de
                    la información proporcionada.
                  </label>
                </div>
                <div className="flex justify-between pt-4">
                  <Button
                    onClick={prevStep}
                    variant="secondary"
                    size="lg"
                    icon={<FiArrowLeft />}
                    className={`!border-slate-400 !text-slate-600 hover:!bg-slate-200`}
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={nextStep}
                    variant="primary"
                    size="lg"
                    icon={<FiCreditCard />}
                    className={`${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover}`}
                    disabled={!paymentConsent}
                  >
                    Proceder al Pago
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={formStepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                <h2
                  className={`text-xl font-semibold ${colors.textPrimary} mb-1 flex items-center`}
                >
                  <FiCreditCard className="mr-2" />
                  Detalles de Pago
                </h2>
                <p className={`${colors.textSecondary} text-sm mb-4`}>
                  Total a pagar (Cuota Administrativa con 30% Dcto):{" "}
                  <strong className={`${colors.accentRed} text-lg`}>
                    {formatCurrency(discountedFee)}
                  </strong>
                </p>
                {/* This is a MOCK payment form. Integrate a real payment gateway (Stripe, PayPal) in a real app. */}
                <InputField
                  label="Nombre en la Tarjeta"
                  id="cardholderName"
                  name="cardholderName"
                  value={paymentData.cardholderName}
                  onChange={handlePaymentChange}
                  required
                  placeholder="Como aparece en la tarjeta"
                  themeColors={colors}
                />
                <InputField
                  label="Número de Tarjeta"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handlePaymentChange}
                  required
                  placeholder="•••• •••• •••• ••••"
                  themeColors={colors}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Fecha Expiración (MM/AA)"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handlePaymentChange}
                    required
                    placeholder="MM/AA"
                    themeColors={colors}
                  />
                  <InputField
                    label="CVV"
                    id="cvv"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handlePaymentChange}
                    required
                    placeholder="123"
                    themeColors={colors}
                  />
                </div>
                <div className="flex justify-between pt-4">
                  <Button
                    onClick={prevStep}
                    variant="secondary"
                    size="lg"
                    icon={<FiArrowLeft />}
                    className={`!border-slate-400 !text-slate-600 hover:!bg-slate-200`}
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={handleFinalSubmit}
                    variant="primary"
                    size="lg"
                    icon={
                      isSubmitting ? (
                        <FiLoader className="animate-spin" />
                      ) : (
                        <FiSend />
                      )
                    }
                    className={`${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Procesando..."
                      : `Pagar ${formatCurrency(discountedFee)}`}
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={formStepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center py-10 space-y-5"
              >
                <FiCheckCircle
                  className={`w-20 h-20 ${colors.successText} mx-auto mb-4`}
                />
                <h2 className={`text-2xl font-bold ${colors.textPrimary}`}>
                  ¡Inscripción Exitosa!
                </h2>
                <p
                  className={`${colors.textSecondary} text-lg max-w-md mx-auto`}
                >
                  Bienvenido/a a Athletic Functional Center,{" "}
                  {personalData.fullName.split(" ")[0]}! Hemos procesado su
                  cuota administrativa.
                </p>
                <p
                  className={`${colors.textSecondary} text-md max-w-md mx-auto`}
                >
                  En breve recibirá un correo electrónico en{" "}
                  <strong className={colors.textPrimary}>
                    {personalData.email}
                  </strong>{" "}
                  con los detalles para acceder a su portal de cliente "AFC
                  Connect" y los próximos pasos.
                </p>
                <div className="pt-6">
                  <Button
                    to="/afc"
                    variant="primary"
                    size="lg"
                    icon={<FiHome />}
                    className={`${colors.accentRedBg} ${colors.buttonTextLight} ${colors.accentRedBgHover}`}
                  >
                    Explorar AFC Connect (Próximamente)
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// --- PropTypes ---
AFCEnrollmentPage.propTypes = {};
// Assuming Section, InputField, Button have their own PropTypes defined.
