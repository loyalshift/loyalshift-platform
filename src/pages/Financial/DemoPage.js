// src/pages/DemoPage.js
// Initial entry point for the FINANCIAL-specific demo/proposal flow.
// UPDATED: Added check to display DesktopViewMessage on mobile screens.
// Displays the ClientHeroAnimation and then navigates to the next step (e.g., Consent Gate).
// Current time: Friday, May 2, 2025 at 10:50 PM CST (San José, Costa Rica)

import React, { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

// --- Hook and Message Component ---
import useMediaQuery from "../../hooks/use-media-query"; // Adjust path as needed
import LoyalShiftDesktopViewMessage from "../../components/LoyalShiftDesktopViewMessage"; // Adjust path as needed

// --- Lazy load heavy components ---
const ClientHeroAnimation = lazy(() =>
  import("../../components/ClientHeroAnimation")
);
const MeshGradientBackground = lazy(() =>
  import("../../components/MeshGradientBackground")
);

// --- Consistent Dark Theme Color Palette ---
const colors = {
  background: "bg-slate-900",
  textPrimary: "text-slate-100",
  textHighlight: "text-blue-300",
  textSecondary: "text-slate-400", // Added for placeholder consistency
};

// --- Loading Placeholders ---
const MeshGradientPlaceholder = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 opacity-50" />
);
const HeroAnimationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px]">
    <FiLoader
      className={`w-10 h-10 ${colors.textHighlight} animate-spin mb-4`}
    />
    <p className={`${colors.textPrimary} text-lg`}>
      Cargando experiencia personalizada...
    </p>
    <p className={`${colors.textSecondary || "text-slate-400"} text-sm`}>
      (Loading personalized experience...)
    </p>
  </div>
);

// --- Main Financial Demo Page Component ---
export default function DemoPage() {
  const navigate = useNavigate();

  // --- End Mobile Detection ---

  const handleAnimationComplete = () => {
    console.log(
      "Financial Client Hero Animation Finished. Navigating to consent/proposal..."
    );
    navigate("/demo/anaco/consent"); // Navigate to next step
  };

  // --- Configuration for the ClientHeroAnimation ---
  const clientName = "ANACO Inversiones";
  const customPhases = [
    `Analizando Contexto: ${clientName}...`,
    "Identificando Oportunidades de Eficiencia...",
    "Diseñando Solución de Agente Conecta...",
    "Preparando Propuesta Estratégica...",
  ];
  const customHeadline = `Plataforma Exclusiva: ${clientName} Conecta`;
  const customSubheadline = `Revolucionando la pre-aprobación hipotecaria para sus agentes.`;

  // --- Mobile Detection ---
  const isMobile = useMediaQuery("(max-width: 767px)");

  // --- Conditional Rendering Based on Screen Size ---
  if (isMobile) {
    // Render the message component if on a mobile device
    return (
      <LoyalShiftDesktopViewMessage
        clientLogoUrl={"/images/financial.png"} // Pass the imported logo URL
        clientName={clientName} // Pass the client name for alt text
      />
    );
  }

  // Render the standard demo animation page if on desktop
  return (
    <div
      className={`${colors.background} overflow-x-hidden h-screen flex items-center justify-center`}
    >
      {/* Background Section */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<MeshGradientPlaceholder />}>
          <MeshGradientBackground animate={true} />
        </Suspense>
      </div>

      {/* Content Section */}
      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <Suspense fallback={<HeroAnimationPlaceholder />}>
          <ClientHeroAnimation
            clientName={clientName}
            animationPhases={customPhases}
            finalHeadline={customHeadline}
            finalSubheadline={customSubheadline}
            onComplete={handleAnimationComplete}
            phaseDuration={2200}
          />
        </Suspense>
      </div>
    </div>
  );
}
