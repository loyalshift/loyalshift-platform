// src/pages/Login.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FiLogIn,
  FiMail,
  FiLock,
  FiSend,
  FiLoader,
  FiInfo,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// Components
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import FloatingItemsBackground from "../../components/Financial/FloatingItemsBackground";

// Color Theme
const colors = {
  background: "bg-slate-50",
  surface: "bg-white/95 backdrop-blur-sm",
  primary: "text-emerald-700",
  primaryBg: "bg-emerald-600",
  primaryBgHover: "hover:bg-emerald-700",
  secondary: "text-slate-600",
  textDark: "text-slate-800",
  textLight: "text-white",
  border: "border-slate-200",
  wavePrimary: "rgba(16, 185, 129, 0.05)", // emerald-500/5
  waveSecondary: "rgba(5, 150, 105, 0.03)", // emerald-600/3
};

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Por favor ingrese su email y contraseña.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Ingrese un correo electrónico válido.");
      return;
    }

    setIsSubmitting(true);
    const loadingToastId = toast.loading("Iniciando sesión...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("¡Inicio de sesión exitoso!", { id: loadingToastId });
      setTimeout(() => navigate("/anaco"), 1000);
    } catch (error) {
      toast.error("Email o contraseña incorrectos", { id: loadingToastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <Toaster position="top-center" />
      <FloatingItemsBackground />

      <motion.div
        className={`relative z-10 w-full max-w-md ${colors.surface} rounded-xl shadow-lg border ${colors.border} p-8 md:p-10`}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 mb-4">
            <FiLogIn className={`w-6 h-6 ${colors.primary}`} />
          </div>
          <h1 className={`text-3xl font-bold ${colors.textDark} mb-2`}>
            ANACO Conecta
          </h1>
          <p className={`${colors.secondary}`}>Ingrese a su cuenta de agente</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              label="Correo Electrónico"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="su@correo.com"
              icon={FiMail}
            />

            <InputField
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              icon={FiLock}
            />
          </div>

          <div className="flex items-center justify-between mt-4 mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Recordarme
              </label>
            </div>

            <Link
              to="/anaco/recuperar-clave"
              className={`text-sm font-medium ${colors.primary} hover:underline`}
            >
              ¿Olvidó su contraseña?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className={`w-full ${colors.primaryBg} ${colors.primaryBgHover} ${colors.textLight}`}
            icon={
              isSubmitting ? <FiLoader className="animate-spin" /> : <FiLogIn />
            }
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className={colors.secondary}>
            ¿No tiene cuenta?{" "}
            <Link
              to="/anaco/register"
              className={`font-medium ${colors.primary} hover:underline`}
            >
              Solicite acceso
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
            <FiInfo size={12} /> {currentTime}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
