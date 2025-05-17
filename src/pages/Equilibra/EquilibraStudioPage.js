// src/pages/Equilibra/EquilibraStudioPage.js
// A content management studio page for Equilibra CR.
// Allows uploading and managing resources like articles, guides, images, audio.
// Uses Equilibra CR's light, earthy, and supportive theme.
// Current time: Friday, May 16, 2025 at 1:45 PM CST. San José, Costa Rica.

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiPlus,
  FiHome,
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiMessageCircle,
  FiSettings,
  FiHelpCircle,
  FiArrowLeft,
  FiUploadCloud,
  FiUser,
  FiPaperclip,
  FiImage,
  FiMic,
  FiVideo,
  FiExternalLink,
  FiEdit3,
  FiCode,
  FiCopy,
  FiX,
  FiShare,
  FiPenTool,
  FiHeart,
  FiBarChart2,
} from "react-icons/fi";
import { Link } from "react-router-dom";

// Equilibra CR Logo (ensure this path is correct and image is in public/images)
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.png";

// --- Equilibra CR New Color Palette ---
const colors = {
  background: "bg-[#FFF7F2]", // Neutral Light – Cream White (Page background)
  sidebarBg: "bg-[#FDEBDA]", // Lighter Soft Peach (mix #FFF7F2 and #FDB386) for sidebar
  mainContentBg: "bg-[#FFF7F2]", // Neutral Light – Cream White
  surface: "bg-white", // White for cards, upload zone, modal
  surfaceMuted: "bg-[#FDB386]/20", // Primary Color (Soft Peach) with low opacity for info blocks
  border: "border-[#A89C94]/40", // Muted Taupe for main borders
  borderLight: "border-[#F7C6B7]/60", // Secondary Color (Blush Pink) for lighter borders
  textPrimary: "text-[#5C5C5C]", // Typography – Warm Gray
  textSecondary: "text-[#A89C94]", // Complementary – Muted Taupe
  textMuted: "text-[#A89C94]/80", // More muted Taupe
  accentCoral: "text-[#E86F51]", // Accent Color – Coral Red
  accentCoralBg: "bg-[#E86F51]",
  accentCoralBgHover: "hover:bg-[#d95f41]", // Darker Coral Red for hover
  accentPeach: "text-[#FDB386]", // Primary Color - Soft Peach (for icons in muted bg)
  buttonText: "text-white",
  uploadZoneBorder: "border-[#F7C6B7]", // Blush Pink for upload zone border
  uploadZoneHoverBorder: "hover:border-[#E86F51]", // Coral Red hover
  inputBg: "bg-white", // White background for inputs for better contrast on Cream White page
  modalOverlayBg: "bg-black/60", // Standard dark overlay for modal
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = (staggerChildren = 0.05, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 200 },
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
};

// --- Sidebar Navigation Item ---
const NavItem = ({
  icon: Icon,
  label,
  isActive = false,
  href = "#",
  onClick,
}) => (
  <li>
    <a
      href={onClick ? undefined : href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer
                        ${
                          isActive
                            ? `bg-[#E86F51]/10 ${colors.accentCoral}` // Coral accent for active
                            : `${colors.textPrimary} hover:bg-[#FDB386]/40 hover:${colors.accentCoral}` // Soft Peach hover
                        }`}
    >
      <Icon
        className={`w-5 h-5 ${
          isActive ? colors.accentCoral : colors.textSecondary
        }`}
      />
      {label}
    </a>
  </li>
);
NavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

// --- Info Block Component ---
const InfoBlock = ({ icon: Icon, title, children }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex items-start gap-3 p-3.5 rounded-lg ${colors.surfaceMuted} border ${colors.borderLight} shadow-sm`}
  >
    <Icon className={`w-5 h-5 ${colors.accentPeach} mt-0.5 flex-shrink-0`} />
    <div>
      <h4 className={`text-xs font-semibold ${colors.textPrimary} mb-0.5`}>
        {title}
      </h4>
      <p className={`text-xs ${colors.textSecondary} leading-snug`}>
        {children}
      </p>
    </div>
  </motion.div>
);
InfoBlock.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// --- Embed Media Modal Component (Adapted for Equilibra) ---
const EmbedMediaModal = ({ isOpen, onClose }) => {
  const exampleEmbedCode = `<iframe 
  title="Equilibra CR Video Example"
  style="border-radius:12px;" 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ?utm_source=generator" 
  width="100%" height="352" 
  frameBorder="0" allowfullscreen 
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
  loading="lazy">
</iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(exampleEmbedCode.trim())
      .then(() => alert("Código para incrustar copiado!"))
      .catch((err) => {
        console.error("Fallo al copiar: ", err);
        alert("Fallo al copiar el código.");
      });
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 ${colors.modalOverlayBg} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full max-w-2xl rounded-xl shadow-2xl ${colors.surface} border ${colors.border} flex flex-col overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="embed-modal-title"
          >
            <div
              className={`flex items-center justify-between p-4 border-b ${colors.borderLight}`}
            >
              <h3
                id="embed-modal-title"
                className={`text-lg font-semibold ${colors.textPrimary} flex items-center gap-2`}
              >
                <FiCode className={colors.accentCoral} /> Incrustar Contenido
              </h3>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-full hover:bg-stone-100 ${colors.textSecondary}`}
                aria-label="Cerrar modal"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-stone-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label
                    htmlFor="embedSource"
                    className={`block text-xs font-medium ${colors.textSecondary} mb-1`}
                  >
                    Fuente:
                  </label>
                  <select
                    id="embedSource"
                    className={`w-full p-2 text-sm ${colors.inputBg} ${colors.textPrimary} rounded-md border ${colors.borderLight} focus:ring-1 focus:ring-offset-0 focus:ring-[#E86F51]`}
                  >
                    <option>Video de YouTube/Vimeo</option>
                    <option>Audio de Spotify/SoundCloud</option>
                    <option>Presentación de Google Slides</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="embedTheme"
                    className={`block text-xs font-medium ${colors.textSecondary} mb-1`}
                  >
                    Tema Visual:
                  </label>
                  <select
                    id="embedTheme"
                    className={`w-full p-2 text-sm ${colors.inputBg} ${colors.textPrimary} rounded-md border ${colors.borderLight} focus:ring-1 focus:ring-offset-0 focus:ring-[#E86F51]`}
                  >
                    <option>Claro (Equilibra)</option>
                    <option>Oscuro</option>
                  </select>
                </div>
              </div>
              <div
                className={`p-4 rounded-lg ${colors.surfaceMuted} border ${colors.borderLight}`}
              >
                <p
                  className={`text-sm font-semibold ${colors.textPrimary} mb-2`}
                >
                  Vista Previa
                </p>
                <div
                  className={`aspect-video bg-stone-200 rounded flex items-center justify-center ${colors.textSecondary} text-sm`}
                >
                  (Vista previa del contenido incrustado)
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="embedCode"
                    className={`block text-xs font-medium ${colors.textSecondary}`}
                  >
                    Código para Incrustar:
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center gap-1.5 text-xs ${colors.accentCoral} hover:text-red-700 font-medium p-1 rounded hover:bg-[#E86F51]/10`}
                  >
                    <FiCopy className="w-3.5 h-3.5" /> Copiar
                  </button>
                </div>
                <textarea
                  id="embedCode"
                  readOnly
                  value={exampleEmbedCode.trim()}
                  rows="5"
                  className={`w-full p-2.5 text-xs font-mono ${colors.inputBg} ${colors.textSecondary} rounded-md border ${colors.borderLight} focus:ring-1 focus:ring-offset-0 focus:ring-[#E86F51] resize-none scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-stone-100`}
                />
              </div>
              <p className={`text-xs ${colors.textMuted} pt-2`}>
                Al incrustar contenido externo, asegúrate de cumplir con los
                términos del proveedor del servicio.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
EmbedMediaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// --- Main EquilibraCR Studio Page Component ---
export default function EquilibraStudioPage() {
  const fileInputRef = useRef(null);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(
        `Archivo seleccionado: ${file.name}\n(Simulación de subida para Equilibra CR)`
      );
      // Reset file input to allow selecting the same file again if needed
      event.target.value = null;
    }
  };

  const sidebarNavSections = [
    {
      title: "GESTIONAR",
      items: [
        {
          icon: FiHome,
          label: "Inicio Studio",
          isActive: true,
          href: "/equilibra/studio",
        },
        { icon: FiUsers, label: "Mis Clientes", href: "#clientes" },
        {
          icon: FiBookOpen,
          label: "Biblioteca de Recursos",
          href: "#recursos",
        },
        { icon: FiCalendar, label: "Agenda y Citas", href: "#citas" },
      ],
    },
    {
      title: "HERRAMIENTAS",
      items: [
        { icon: FiPenTool, label: "Crear Contenido", href: "#crear" },
        {
          icon: FiShare,
          label: "Incrustar Contenido",
          onClick: () => setIsEmbedModalOpen(true),
        },
        {
          icon: FiBarChart2,
          label: "Analíticas (Clientes)",
          href: "#analiticas",
        },
      ],
    },
    {
      title: "OTROS",
      items: [
        { icon: FiSettings, label: "Configuración", href: "#configuracion" },
        { icon: FiHelpCircle, label: "Ayuda y Soporte", href: "#ayuda" },
      ],
    },
  ];

  return (
    <div
      className={`min-h-screen flex ${colors.background} ${colors.textPrimary}`}
    >
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -256, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "circOut" }}
        className={`w-64 ${colors.sidebarBg} p-4 flex flex-col border-r ${colors.border} shadow-lg`}
      >
        <button
          onClick={handleSelectFileClick}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 mb-6 rounded-lg text-sm font-semibold
                                ${colors.accentCoralBg} ${colors.buttonText} ${colors.accentCoralBgHover}
                                shadow-md hover:shadow-lg transition-all duration-200 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#FFF7F2] focus:ring-[#E86F51]`}
        >
          <FiPlus className="w-5 h-5" /> Subir Recurso
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf,image/*,audio/*,video/mp4,video/quicktime"
          className="hidden"
        />

        <div className="flex-grow space-y-5 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-400/50 scrollbar-track-transparent pr-1">
          {sidebarNavSections.map((section) => (
            <div key={section.title}>
              <h3
                className={`text-xs font-semibold ${colors.textSecondary} uppercase tracking-wider px-3 mb-2.5`}
              >
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <NavItem key={item.label} {...item} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-stone-300/70">
          <Link
            to="/equilibra"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm 
                                            ${colors.textSecondary} hover:bg-[#FDB386]/30 hover:${colors.accentCoral} transition-colors`}
          >
            <FiArrowLeft className="w-4 h-4" /> Volver a Equilibra Contigo
          </Link>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main
        className={`flex-1 ${colors.mainContentBg} p-6 md:p-8 flex flex-col overflow-y-auto`}
      >
        <div className="flex justify-end mb-6">
          <Link
            to="#"
            className={`w-9 h-9 rounded-full ${colors.surface} border ${colors.borderLight} flex items-center justify-center shadow hover:opacity-80 transition-opacity`}
            title="Mi Perfil"
          >
            <img
              src={equilibraLogoPath}
              alt="Equilibra CR Logo"
              className="w-6 h-6 rounded-full object-contain p-0.5"
            />
          </Link>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className={`flex-grow flex flex-col items-center justify-center p-6 md:p-10 border-2 border-dashed 
                                ${colors.uploadZoneBorder} ${colors.uploadZoneHoverBorder} rounded-xl 
                                ${colors.surface} hover:bg-red-50/20 transition-colors duration-300 mb-8`}
        >
          <FiUploadCloud
            className={`w-16 h-16 md:w-20 md:h-20 ${colors.textSecondary} opacity-50 mb-4`}
          />
          <h2
            className={`text-xl md:text-2xl font-semibold ${colors.textPrimary} mb-1`}
          >
            Selecciona archivo para subir
          </h2>
          <p className={`${colors.textSecondary} text-sm mb-6`}>
            O arrástralo y suéltalo aquí
          </p>
          <button
            onClick={handleSelectFileClick}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold 
                                    ${colors.surface} ${colors.textPrimary} hover:bg-stone-100
                                    border ${colors.border} shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#FFF7F2] focus:ring-[#E86F51]`}
          >
            Seleccionar Archivo
          </button>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <InfoBlock icon={FiPaperclip} title="Formatos Soportados">
            PDFs para guías, JPG/PNG para imágenes, MP3 para audios, MP4 para
            videos cortos.
          </InfoBlock>
          <InfoBlock icon={FiHeart} title="Contenido Consciente">
            Crea recursos que apoyen el bienestar integral y la filosofía no
            pesocentrista.
          </InfoBlock>
          <InfoBlock icon={FiUsers} title="Para tus Clientes">
            Materiales que puedes compartir de forma segura y organizada a
            través de "Equilibra Contigo".
          </InfoBlock>
          <InfoBlock icon={FiEdit3} title="Organiza y Edita">
            Gestiona tus recursos subidos, actualízalos y organízalos en tu
            biblioteca personal.
          </InfoBlock>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className={`p-4 rounded-lg ${colors.surface} border ${colors.borderLight} flex flex-col sm:flex-row items-center justify-between gap-3`}
        >
          <div>
            <h3 className={`text-sm font-semibold ${colors.textPrimary}`}>
              ¿Necesitas inspiración para crear contenido?
            </h3>
            <p className={`text-xs ${colors.textSecondary}`}>
              Visita nuestra sección de ideas y plantillas para nutricionistas.
            </p>
          </div>
          <Link
            to="#inspiracion" // Placeholder link
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md 
                                    ${colors.accentCoral} hover:bg-[#E86F51]/10 border border-[#E86F51]/30 transition-colors focus:outline-none focus:ring-1 focus:ring-[#E86F51]`}
          >
            Ver Ideas <FiExternalLink className="w-3 h-3" />
          </Link>
        </motion.div>
      </main>

      <EmbedMediaModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
      />
    </div>
  );
}

EquilibraStudioPage.propTypes = {};
