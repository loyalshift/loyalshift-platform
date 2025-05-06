// src/pages/Register.js
// ANACO Registration Page Component
// UPDATED: Added relative positioning and z-index to form card to ensure it's above the background.
// Uses Green/White/Grey Theme, Spanish Language. No API connection yet.
// Current time: Friday, May 2, 2025 at 9:14 PM CST. San José, Alajuela Province, Costa Rica.

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUserPlus, FiUser, FiMail, FiLock, FiSend, FiLoader, FiInfo,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// --- Reusable Components (Adjust path if needed) ---
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import FloatingItemsBackground from "../../components/Anaco/FloatingItemsBackground"; // Import the background

// --- Green/White/Grey Color Theme ---
const colors = { /* ... colors object ... */
  background: "bg-slate-100", surface: "bg-white", primary: "text-emerald-700",
  primaryBg: "bg-emerald-600", primaryBgHover: "hover:bg-emerald-700", secondary: "text-slate-600",
  textDark: "text-slate-800", textLight: "text-white", border: "border-slate-300",
  inputBorder: "border-slate-300", inputFocusBorder: "focus:border-emerald-500",
  inputFocusRing: "focus:ring-emerald-500/50", errorText: "text-red-600",
};

// --- Simple Animation Variants ---
const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }};
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } }};

// --- Initial Form State ---
const initialFormData = { fullName: "", email: "", password: "", confirmPassword: "" };

export default function RegisterPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => { /* ... handleChange logic ... */
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => { /* ... handleSubmit logic ... */
      e.preventDefault();
      const { fullName, email, password, confirmPassword } = formData;
      // Basic Validation
      if (!fullName || !email || !password || !confirmPassword) { toast.error("Por favor complete todos los campos."); return; }
      if (password !== confirmPassword) { toast.error("Las contraseñas no coinciden."); return; }
      if (password.length < 6) { toast.error("La contraseña debe tener al menos 6 caracteres."); return; }
      if (!/\S+@\S+\.\S+/.test(email)) { toast.error("Ingrese un correo electrónico válido."); return; }
      setIsSubmitting(true);
      const loadingToastId = toast.loading("Registrando cuenta...");
      // Simulate API Call
      try {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          toast.success("¡Cuenta registrada con éxito!", { id: loadingToastId });
          setFormData(initialFormData);
          setTimeout(() => navigate("/anaco/login"), 1000);
      } catch (error) {
          console.error("Registration Error Simulation:", error);
          toast.error("Error al registrar la cuenta. Intente de nuevo.", { id: loadingToastId });
      } finally {
          setIsSubmitting(false);
      }
  };

  // Timestamp for display
  const currentTime = new Date().toLocaleString("es-CR", { /* ... options ... */ });

  return (
    // Outer container sets up flex centering and base background
    <div
      className={`min-h-screen ${colors.background} flex items-center justify-center p-4 py-12 relative overflow-hidden`} // Added relative overflow-hidden for safety
    >
      <Toaster position="top-center" />
      {/* Background component sits behind using fixed positioning and -z-1 */}
      <FloatingItemsBackground />

      {/* *** UPDATED: Added relative and z-10 to this div *** */}
      <motion.div
        className={`relative z-10 w-full max-w-md ${colors.surface} rounded-xl shadow-xl border ${colors.border} p-6 md:p-10`}
        initial="hidden"
        animate="visible"
        variants={fadeInUp} // Animate the whole card entrance
      >
        {/* Form Header */}
        <div className="text-center mb-8">
          <FiUserPlus className={`w-12 h-12 ${colors.primary} mx-auto mb-3`} />
          <h1 className={`text-3xl font-bold ${colors.textDark}`}>
            Crear Nueva Cuenta
          </h1>
          <p className={`${colors.secondary} mt-2 text-sm`}>
            Regístrese para acceder a los servicios de ANACO.
          </p>
        </div>

        {/* Form Fields */}
        <motion.form
          onSubmit={handleSubmit}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
           {/* Input Fields */}
          <motion.div variants={fadeInUp} className="mb-4">
            <InputField label="Nombre Completo" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Su nombre y apellidos" icon={FiUser} />
          </motion.div>
          <motion.div variants={fadeInUp} className="mb-4">
            <InputField label="Correo Electrónico" id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="su@correo.com" icon={FiMail} />
          </motion.div>
          <motion.div variants={fadeInUp} className="mb-4">
            <InputField label="Contraseña" id="password" name="password" type="password" value={formData.password} onChange={handleChange} required placeholder="Mínimo 6 caracteres" icon={FiLock} />
          </motion.div>
          <motion.div variants={fadeInUp} className="mb-6">
            <InputField label="Confirmar Contraseña" id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required placeholder="Repita su contraseña" icon={FiLock} />
          </motion.div>

           {/* Submit Button */}
          <motion.div variants={fadeInUp} className="mt-8">
            <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} icon={ isSubmitting ? <FiLoader className="animate-spin" /> : <FiUserPlus /> } className={`w-full ${colors.primaryBg} ${colors.primaryBgHover} ${ colors.textLight } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`} >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </Button>
          </motion.div>
        </motion.form>

         {/* Link to Login */}
        <motion.p
          variants={fadeInUp}
          className={`text-center text-sm ${colors.secondary} mt-6`}
        >
          ¿Ya tiene cuenta?{" "}
          <Link to="/anaco/login" className={`font-medium ${colors.primary} hover:underline`} >
            Iniciar Sesión
          </Link>
        </motion.p>

        {/* Removed Timestamp from Card */}
        {/* <motion.p ... > ... </motion.p> */}

      </motion.div> {/* End Form Card */}

       {/* Timestamp outside the card, if desired */}
       {/* <p className="absolute bottom-4 text-xs text-slate-400">Generated: {currentTime}</p> */}

    </div> // End Outer Container
  );
}

// PropTypes
// Ensure Button and InputField have their PropTypes defined in their respective files
// RegisterPage.propTypes = {}; // No specific props for RegisterPage itself currently
