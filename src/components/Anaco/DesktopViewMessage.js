// src/components/Anaco/DesktopViewMessage.js
// Component displayed on mobile devices advising desktop use for the ANACO section.

import React from 'react';
import { FiMonitor, FiInfo } from 'react-icons/fi';
import anacoLogoUrl from '../../images/anaco.png'; // Adjust path as needed

// Theme Colors (Subset for this component)
const colors = {
  background: "bg-slate-100",
  surface: "bg-white",
  primary: "text-emerald-700",
  secondary: "text-slate-600",
  textDark: "text-slate-800",
  border: "border-slate-300",
};

const DesktopViewMessage = () => {
  return (
    <div className={`min-h-screen ${colors.background} flex flex-col items-center justify-center text-center p-6`}>
       <div className={`max-w-md w-full ${colors.surface} p-8 rounded-xl shadow-lg border ${colors.border}`}>
            {/* Logo */}
            <img src={anacoLogoUrl} alt="ANACO Logo" className="h-10 w-auto mx-auto mb-5" />

            {/* Icon */}
            <FiMonitor className={`w-16 h-16 ${colors.primary} mx-auto mb-4 opacity-80`} />

            {/* Title */}
            <h1 className={`text-2xl font-bold ${colors.textDark} mb-3`}>
                Experiencia Optimizada para Escritorio
            </h1>

            {/* Message */}
            <p className={`${colors.secondary} text-base leading-relaxed`}>
                Para una mejor visualización y acceso a todas las funcionalidades del portal de agentes ANACO Conecta, por favor acceda desde una computadora de escritorio o laptop.
            </p>

             {/* Optional: Info about limited mobile functionality if applicable */}
             {/* <p className={`text-xs ${colors.secondary} mt-4 flex items-center justify-center gap-1`}>
                <FiInfo size={12} /> Algunas funciones pueden estar limitadas en móvil.
             </p> */}
       </div>
    </div>
  );
};

export default DesktopViewMessage;
