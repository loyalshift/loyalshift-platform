// src/components/StudioLayout.js
// REFACTORED: Uses StudioSidebar, manages client-specific theming and data for Outlet.
// This layout is intended for client-specific studio pages like /studio/:clientId/*

import React, { createContext, useMemo, useState } from "react"; // Added createContext, useMemo
import { Outlet, useLocation, useParams, Navigate } from "react-router-dom";
import StudioFooter from "./StudioFooter"; // Assuming StudioFooter.js is in the same directory
import useMediaQuery from "../../hooks/use-media-query"; // Adjust path as needed
import LoyalShiftDesktopViewMessage from "../LoyalShiftDesktopViewMessage"; // Adjust path as needed
import StudioSidebar from "./StudioSidebar"; // Import the new sidebar

// Define navigation sections (can be dynamic per client)
// These would ideally come from a config or API based on clientId
// Added icons to nav items
import {
  FiHome,
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiPenTool,
  FiShare,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiVideo,
  FiMessageSquare,
  FiSun,
  FiAward,
} from "react-icons/fi";

// Import client-specific assets and configurations
// For Equilibra CR
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.svg";
const equilibraThemeColors = {
  background: "bg-[#FFF7F2]", // Neutral Light – Cream White (Page background)
  sidebarBg: "bg-[#FDEBDA]", // Lighter Soft Peach for sidebar
  mainContentBg: "bg-[#FFF7F2]", // Neutral Light – Cream White
  surface: "bg-white", // White for cards, upload zone, modal
  surfaceMuted: "bg-[#FDB386]/20", // Primary Color (Soft Peach) with low opacity for info blocks
  border: "border-[#A89C94]/40", // Muted Taupe for main borders
  borderLight: "border-[#F7C6B7]/60", // Secondary Color (Blush Pink) for lighter borders
  textPrimary: "text-[#5C5C5C]", // Typography – Warm Gray
  textSecondary: "text-[#A89C94]", // Complementary – Muted Taupe
  textMuted: "text-[#A89C94]/80", // More muted Taupe
  accentColor: "text-[#E86F51]", // Accent Color – Coral Red (for active nav item, icons)
  buttonPrimaryBg: "bg-[#E86F51]", // Accent Color – Coral Red
  buttonPrimaryHover: "hover:bg-[#d95f41]", // Darker Coral Red for hover
  buttonText: "text-white",
  navItemActiveBg: "bg-[#E86F51]/10", // Coral accent for active nav item bg
  navItemHoverBg: "hover:bg-[#FDB386]/40", // Soft Peach hover for nav items
  // Modal specific colors for Equilibra
  modalOverlayBg: "bg-[#FFF7F2]",
  modalSurface: "bg-white",
  modalBorder: "border-[#A89C94]/50",
  modalTextPrimary: "text-[#5C5C5C]",
  modalTextSecondary: "text-[#A89C94]",
  modalIconColor: "text-[#E86F51]",
  modalCloseButtonHoverBg: "hover:bg-stone-100",
};

// For AFC (Example - define similarly)
const afcLogoPath = process.env.PUBLIC_URL + "/images/afc-logo.png";
const afcThemeColors = {
  background: "bg-slate-50",
  sidebarBg: "bg-white",
  mainContentBg: "bg-slate-50",
  surface: "bg-white",
  surfaceMuted: "bg-red-50",
  border: "border-slate-300",
  borderLight: "border-slate-200",
  textPrimary: "text-slate-900",
  textSecondary: "text-slate-600",
  textMuted: "text-slate-500",
  accentColor: "text-red-600",
  buttonPrimaryBg: "bg-red-600",
  buttonPrimaryHover: "hover:bg-red-700",
  buttonText: "text-white",
  navItemActiveBg: "bg-red-500/10",
  navItemHoverBg: "hover:bg-red-50",
  modalOverlayBg: "bg-black/60",
  modalSurface: "bg-white",
  modalBorder: "border-slate-300",
  modalTextPrimary: "text-slate-900",
  modalTextSecondary: "text-slate-600",
  modalIconColor: "text-red-600",
  modalCloseButtonHoverBg: "hover:bg-slate-100",
};

// For LoyalShift (Default Dark Theme)
const loyalshiftLogoPath = process.env.PUBLIC_URL + "/logo.svg"; // Main LoyalShift logo
const loyalshiftThemeColors = {
  background: "bg-slate-950",
  sidebarBg: "bg-slate-900",
  mainContentBg: "bg-slate-950",
  surface: "bg-slate-800",
  surfaceMuted: "bg-slate-700/50",
  border: "border-slate-700",
  borderLight: "border-slate-600",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  textMuted: "text-slate-500",
  accentColor: "text-blue-400",
  buttonPrimaryBg: "bg-gradient-to-r from-blue-600 to-cyan-500",
  buttonPrimaryHover: "hover:from-blue-500 hover:to-cyan-400",
  buttonText: "text-white",
  navItemActiveBg: "bg-slate-700",
  navItemHoverBg: "hover:bg-slate-700/50",
  modalOverlayBg: "bg-black/70",
  modalSurface: "bg-slate-800",
  modalBorder: "border-slate-700",
  modalTextPrimary: "text-slate-100",
  modalTextSecondary: "text-slate-400",
  modalIconColor: "text-blue-400",
  modalCloseButtonHoverBg: "hover:bg-slate-700",
};

const getNavSectionsForClient = (clientId, currentPathname) => {
  if (clientId === "equilibra") {
    return [
      {
        title: "GESTIONAR",
        items: [
          {
            icon: FiHome,
            label: "Inicio Studio",
            href: `/studio/${clientId}`,
            isActive:
              currentPathname === `/studio/${clientId}` ||
              currentPathname === `/studio/${clientId}/dashboard`,
          },
          {
            icon: FiUsers,
            label: "Mis Clientes",
            href: `/studio/${clientId}/clients`,
            isActive: currentPathname.startsWith(`/studio/${clientId}/clients`),
          },
          {
            icon: FiBookOpen,
            label: "Biblioteca de Recursos",
            href: `/studio/${clientId}/resources`,
            isActive: currentPathname.startsWith(
              `/studio/${clientId}/resources`
            ),
          },
          {
            icon: FiCalendar,
            label: "Agenda y Citas",
            href: `/studio/${clientId}/schedule`,
            isActive: currentPathname.startsWith(
              `/studio/${clientId}/schedule`
            ),
          },
        ],
      },
      {
        title: "HERRAMIENTAS",
        items: [
          {
            icon: FiPenTool,
            label: "Crear Contenido",
            href: `/studio/${clientId}/create`,
            isActive: currentPathname.startsWith(`/studio/${clientId}/create`),
          },
          {
            icon: FiShare,
            label: "Incrustar Contenido",
            isAction: true,
            actionKey: "embedMedia",
          }, // onClick handled by page via context
          {
            icon: FiBarChart2,
            label: "Analíticas",
            href: `/studio/${clientId}/analytics`,
            isActive: currentPathname.startsWith(
              `/studio/${clientId}/analytics`
            ),
          },
        ],
      },
      {
        title: "OTROS",
        items: [
          {
            icon: FiSettings,
            label: "Configuración",
            href: `/studio/${clientId}/settings`,
            isActive: currentPathname.startsWith(
              `/studio/${clientId}/settings`
            ),
          },
          {
            icon: FiHelpCircle,
            label: "Ayuda",
            href: `/studio/${clientId}/help`,
            isActive: currentPathname.startsWith(`/studio/${clientId}/help`),
          },
        ],
      },
    ];
  }
  // Default/LoyalShift nav (example)
  return [
    {
      title: "MANAGE",
      items: [
        {
          icon: FiHome,
          label: "Home",
          href: `/studio/${clientId}`,
          isActive:
            currentPathname === `/studio/${clientId}` ||
            currentPathname === `/studio/${clientId}/dashboard`,
        },
        {
          icon: FiVideo,
          label: "Posts",
          href: `/studio/${clientId}/posts`,
          isActive: currentPathname.startsWith(`/studio/${clientId}/posts`),
        },
        {
          icon: FiBarChart2,
          label: "Analytics",
          href: `/studio/${clientId}/analytics`,
          isActive: currentPathname.startsWith(`/studio/${clientId}/analytics`),
        },
        {
          icon: FiMessageSquare,
          label: "Comments",
          href: `/studio/${clientId}/comments`,
          isActive: currentPathname.startsWith(`/studio/${clientId}/comments`),
        },
      ],
    },
    {
      title: "TOOLS",
      items: [
        {
          icon: FiSun,
          label: "Inspirations",
          href: `/studio/${clientId}/inspirations`,
          isActive: currentPathname.startsWith(
            `/studio/${clientId}/inspirations`
          ),
        },
        {
          icon: FiAward,
          label: "Creator Academy",
          href: `/studio/${clientId}/academy`,
          isActive: currentPathname.startsWith(`/studio/${clientId}/academy`),
        },
        {
          icon: FiShare,
          label: "Embed Media",
          isAction: true,
          actionKey: "embedMedia",
        },
      ],
    },
    {
      title: "OTHERS",
      items: [
        {
          icon: FiHelpCircle,
          label: "Feedback",
          href: `/studio/${clientId}/feedback`,
          isActive: currentPathname.startsWith(`/studio/${clientId}/feedback`),
        },
      ],
    },
  ];
};

// Create a context for client-specific theme and data
export const StudioContext = createContext(null);

export default function StudioLayout() {
  const location = useLocation();
  const { clientId } = useParams();

  const isMobile = useMediaQuery("(max-width: 1023px)"); // lg breakpoint for sidebar collapse

  // useMemo to prevent re-calculating clientConfig on every render unless clientId changes
  const clientConfig = useMemo(() => {
    if (clientId === "equilibra") {
      return {
        id: "equilibra",
        name: "Equilibra CR",
        logoUrl: equilibraLogoPath,
        theme: equilibraThemeColors,
        navSections: getNavSectionsForClient("equilibra", location.pathname),
        backLinkPath: "/equilibra",
        uploadButtonText: "Subir Recurso",
        desktopMessageClientName: "Equilibra CR Studio",
        pageTitlePrefix: "Equilibra Studio",
      };
    } else if (clientId === "afc") {
      return {
        id: "afc",
        name: "Athletic Functional Center",
        logoUrl: afcLogoPath,
        theme: afcThemeColors, // You'd define afcThemeColors similarly
        navSections: getNavSectionsForClient("afc", location.pathname),
        backLinkPath: "/afc",
        uploadButtonText: "Subir Contenido",
        desktopMessageClientName: "AFC Studio",
        pageTitlePrefix: "AFC Studio",
      };
    }
    // Default to LoyalShift Studio
    return {
      id: "loyalshift",
      name: "LoyalShift Studio",
      logoUrl: loyalshiftLogoPath,
      theme: loyalshiftThemeColors,
      navSections: getNavSectionsForClient("loyalshift", location.pathname),
      backLinkPath: "/",
      uploadButtonText: "Upload New",
      desktopMessageClientName: "LoyalShift Studio",
      pageTitlePrefix: "LoyalShift Studio",
    };
  }, [clientId, location.pathname]);

  // State to manage actions triggered from sidebar (like opening modals in child pages)
  const [studioAction, setStudioAction] = useState(null);

  if (isMobile) {
    return (
      <LoyalShiftDesktopViewMessage
        clientName={clientConfig.desktopMessageClientName}
        clientLogoUrl={clientConfig.logoUrl}
        message={`La experiencia ${clientConfig.pageTitlePrefix} está optimizada para escritorio. Por favor, acceda desde una computadora.`}
      />
    );
  }

  return (
    <StudioContext.Provider
      value={{ ...clientConfig, studioAction, setStudioAction }}
    >
      <div className={`min-h-screen flex ${clientConfig.theme.background}`}>
        <StudioSidebar
          clientId={clientConfig.id}
          clientName={clientConfig.name}
          clientLogoUrl={clientConfig.logoUrl}
          themeColors={clientConfig.theme}
          navSections={clientConfig.navSections}
          onUploadClick={() => setStudioAction("uploadFile")} // Example action
          uploadButtonText={clientConfig.uploadButtonText}
          backLinkPath={clientConfig.backLinkPath}
          backLinkTextPrefix="Volver a"
        />
        <main
          className={`flex-grow flex flex-col ${clientConfig.theme.mainContentBg} overflow-y-auto`}
        >
          {/* Outlet renders the specific studio page (Dashboard, ContentManager, etc.) */}
          <Outlet
            context={{
              clientId,
              clientName: clientConfig.name,
              themeColors: clientConfig.theme,
              studioAction,
              setStudioAction,
            }}
          />
        </main>
      </div>
      {/* StudioFooter can be added here if desired for all studio pages */}
      <StudioFooter clientName={clientConfig.name} />
    </StudioContext.Provider>
  );
}
