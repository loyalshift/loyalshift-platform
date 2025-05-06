// src/pages/Anaco/PreApprovalProcess.js
// Explains the mortgage pre-approval process at ANACO Inversiones.
// Uses Green/White/Grey Theme, Spanish Language.
// Current time: Friday, May 2, 2025 at 2:48 PM CST. San José, Costa Rica.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiHelpCircle, // Main Icon
  FiFileText, // Step 1: Application
  FiClipboard, // Step 2: Documents
  FiTrendingUp, // Step 3: Analysis
  FiCheckSquare, // Step 4: Issuance
  FiHome, // Step 5: Property Search / Benefit
  FiThumbsUp, // Benefits
  FiDollarSign, // Benefits
  FiClock, // Benefits
  FiInfo, // Disclaimer / Timestamp
  FiArrowRight, // CTA
} from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";

// Green/White/Grey Color Theme (Assuming consistency)
const colors = {
  background: "bg-slate-100", // Use slightly off-white for main background
  surface: "bg-white", // White for cards/sections
  primary: "text-emerald-700",
  primaryBg: "bg-emerald-600",
  primaryBgHover: "hover:bg-emerald-700",
  secondary: "text-slate-600",
  textDark: "text-slate-800",
  textLight: "text-white",
  border: "border-slate-300",
  borderLight: "border-slate-200", // Lighter border for cards
  accentSuccess: "text-emerald-500", // Lighter green for success checks
  primaryLightBg: "bg-emerald-50", // Very light green for subtle backgrounds
  warningBg: "bg-yellow-50", // For disclaimer
  warningBorder: "border-yellow-300",
  warningIcon: "text-yellow-500",
};

// Simple Animation Variants
const viewportOnce = { once: true, amount: 0.1 }; // Trigger animation slightly earlier
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } },
};
const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } },
};


// --- Reusable Step Component ---
const ProcessStep = ({ number, icon: Icon, title, children }) => (
    <motion.div variants={fadeInUp} className="flex items-start space-x-4 relative pl-10">
        {/* Step Number Circle */}
        <div className={`absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full ${colors.primaryBg} ${colors.textLight} font-bold text-sm shadow-md`}>
            {number}
        </div>
        {/* Icon and Content */}
        <div className="flex-shrink-0 mt-1">
             {Icon && <Icon className={`w-6 h-6 ${colors.primary}`} aria-hidden="true" />}
        </div>
        <div>
            <h3 className={`text-xl font-semibold ${colors.textDark} mb-1`}>{title}</h3>
            <p className={`${colors.secondary} text-base`}>{children}</p>
        </div>
    </motion.div>
);
ProcessStep.propTypes = { /* Add PropTypes validation */ };

// --- Reusable Benefit Card ---
const BenefitCard = ({ icon: Icon, title, children }) => (
     <motion.div variants={fadeInUp} className={`p-6 rounded-lg ${colors.primaryLightBg} border ${colors.border} text-center shadow-sm`}>
         <div className={`inline-flex p-3 rounded-full ${colors.primary}/10 border border-emerald-200 mb-3`}>
            <Icon className={`w-7 h-7 ${colors.primary}`} />
         </div>
         <h3 className={`text-lg font-semibold ${colors.textDark} mb-1`}>{title}</h3>
         <p className={`${colors.secondary} text-sm`}>{children}</p>
     </motion.div>
);
BenefitCard.propTypes = { /* Add PropTypes validation */ };


// --- Main Pre-Approval Process Page Component ---
export default function PreApprovalProcessPage() {
  // Get current timestamp string
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className={`${colors.background} ${colors.textDark} font-sans`}>
      {/* Optional: Add AnacoHeader */}

      <main className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Page Header */}
        <motion.section
          className="text-center mb-16 md:mb-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={scaleUp} className={`inline-block p-4 mb-4 rounded-full ${colors.primaryLightBg} border ${colors.border}`}>
            <FiHelpCircle className={`w-12 h-12 ${colors.primary}`} />
          </motion.div>
          <motion.h1 variants={fadeInUp} className={`text-4xl md:text-5xl font-bold ${colors.textDark} mb-4`}>
            Proceso de Pre-Aprobación Hipotecaria
          </motion.h1>
          <motion.p variants={fadeInUp} className={`text-lg md:text-xl ${colors.secondary} max-w-3xl mx-auto`}>
            Entienda los pasos para obtener su pre-aprobación con ANACO Inversiones y compre su propiedad con confianza y claridad financiera.
          </motion.p>
        </motion.section>

        {/* Steps Section */}
        <motion.section
          className="max-w-3xl mx-auto mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          aria-labelledby="process-steps-title"
        >
          <h2 id="process-steps-title" className={`text-3xl font-bold ${colors.textDark} text-center mb-10 md:mb-12`}>
            Nuestros Pasos Simplificados
          </h2>

          {/* Vertical Steps Layout */}
          <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-slate-300">
             <ProcessStep number="1" icon={FiFileText} title="Solicitud Inicial">
                 Inicie el proceso contactando a uno de nuestros asesores o a través de su agente inmobiliario registrado en ANACO Conecta. Proporcionará información básica sobre usted y el tipo de crédito que busca.
             </ProcessStep>
             <ProcessStep number="2" icon={FiClipboard} title="Recopilación de Documentos">
                 Le solicitaremos la documentación necesaria para evaluar su perfil, como comprobantes de ingreso (constancia salarial, CPA si aplica), cédula de identidad, orden patronal, y otros según su caso particular. Puede enviarlos de forma segura.
             </ProcessStep>
              <ProcessStep number="3" icon={FiTrendingUp} title="Análisis Financiero y Crediticio">
                 Nuestro equipo experto revisará su información financiera, historial crediticio (consulta SUGEF) y capacidad de pago, siguiendo las normativas vigentes para asegurar una evaluación responsable.
             </ProcessStep>
             <ProcessStep number="4" icon={FiCheckSquare} title="Emisión de Carta de Pre-Aprobación">
                 Si cumple con los requisitos iniciales, emitiremos una carta formal de pre-aprobación indicando el monto máximo estimado del préstamo y las condiciones preliminares. ¡Esta carta fortalece su poder de negociación!
             </ProcessStep>
              <ProcessStep number="5" icon={FiHome} title="Búsqueda de Propiedad">
                  Con su pre-aprobación en mano, puede buscar activamente la propiedad que desea, sabiendo con confianza cuál es su presupuesto de financiamiento respaldado por ANACO.
              </ProcessStep>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
             className={`p-8 md:p-12 rounded-xl ${colors.surface} border ${colors.borderLight} shadow-lg mb-16 md:mb-20`}
             initial="hidden"
             whileInView="visible"
             viewport={viewportOnce}
             variants={staggerContainer}
             aria-labelledby="benefits-title"
         >
             <h2 id="benefits-title" className={`text-3xl font-bold ${colors.textDark} text-center mb-10 md:mb-12`}>
                 Beneficios de Pre-Aprobarse con ANACO
             </h2>
             <motion.div
                 variants={staggerContainer}
                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
             >
                 <BenefitCard icon={FiDollarSign} title="Conozca su Presupuesto">
                     Sepa exactamente cuánto puede invertir en su futura propiedad antes de empezar a buscar.
                 </BenefitCard>
                 <BenefitCard icon={FiThumbsUp} title="Fortaleza al Negociar">
                     Una carta de pre-aprobación le da ventaja al negociar con vendedores, mostrando seriedad y capacidad financiera.
                 </BenefitCard>
                 <BenefitCard icon={FiClock} title="Proceso Más Rápido">
                     Tener la pre-aprobación lista acelera significativamente el proceso final de formalización del crédito una vez elegida la propiedad.
                 </BenefitCard>
             </motion.div>
         </motion.section>


        {/* Call to Action */}
        <motion.section
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2 className={`text-3xl font-bold ${colors.textDark} mb-4`}>
            ¿Listo para Iniciar?
          </h2>
          <p className={`text-lg ${colors.secondary} max-w-2xl mx-auto mb-8`}>
            Dé el primer paso hacia la casa de sus sueños. Contacte a nuestro equipo o solicite a su agente iniciar el proceso hoy mismo.
          </p>
          <Button
            to="/anaco/request-pre-approval" // Or /anaco/contact
            variant="primary"
            size="lg"
            icon={<FiArrowRight />}
            className={`${colors.primaryBg} ${colors.primaryBgHover} ${colors.textLight}`}
          >
            Iniciar Solicitud Ahora
          </Button>
        </motion.section>

        {/* Disclaimer */}
        <motion.div
             variants={fadeInUp}
             initial="hidden"
             whileInView="visible"
             viewport={viewportOnce}
             className={`mt-16 md:mt-20 p-4 rounded-md border ${colors.warningBorder} ${colors.warningBg} text-sm ${colors.textDark} max-w-3xl mx-auto`}
         >
             <div className="flex items-start gap-3">
                <FiInfo className={`w-5 h-5 ${colors.warningIcon} flex-shrink-0 mt-0.5`} aria-hidden="true"/>
                <div>
                    <strong className="font-semibold">Nota Importante:</strong> La pre-aprobación es una evaluación preliminar basada en la información proporcionada y está sujeta a la verificación final de documentos, avalúo de la propiedad y cumplimiento de todas las políticas de crédito de ANACO Inversiones S.A. y regulaciones de SUGEF. No constituye una oferta final de crédito.
                </div>
             </div>
        </motion.div>
      </main>

      {/* Optional: Add AnacoFooter */}
    </div>
  );
}

// --- PropTypes ---
// Add PropTypes for sub-components if needed
ProcessStep.propTypes = {
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.elementType,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

BenefitCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
