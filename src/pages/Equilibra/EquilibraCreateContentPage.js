// src/pages/Equilibra/EquilibraCreateContentPage.js
// Page for Equilibra CR to create new content (articles, guides, etc.).
// Uses the Equilibra CR light theme.
// Current time: Friday, May 16, 2025 at 3:30 PM CST.

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useOutletContext, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiPenTool,
  FiType,
  FiTag,
  FiFileText,
  FiImage,
  FiUploadCloud,
  FiEye,
  FiSave,
  FiSend,
  FiPaperclip,
  FiAlertCircle,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast"; // Assuming Toaster is globally available or added to StudioLayout

// Reusable Components
import InputField from "../../components/InputField"; // Assuming this component is adaptable
import Button from "../../components/Button"; // Assuming this component is adaptable

// Default theme colors if context is not available (for standalone testing)
const defaultEquilibraTheme = {
  background: "bg-[#FFF7F2]",
  sidebarBg: "bg-[#FDEBDA]",
  mainContentBg: "bg-[#FFF7F2]",
  surface: "bg-white",
  surfaceMuted: "bg-[#FDB386]/20",
  border: "border-[#A89C94]/40",
  borderLight: "border-[#F7C6B7]/60",
  textPrimary: "text-[#5C5C5C]",
  textSecondary: "text-[#A89C94]",
  textHighlight: "text-[#E86F51]",
  iconColor: "text-[#E86F51]",
  buttonPrimaryBg: "bg-[#E86F51]",
  buttonPrimaryHover: "hover:bg-[#d95f41]",
  buttonSecondaryBg: "bg-[#F7C6B7]",
  buttonSecondaryHover: "hover:bg-[#f5b8a9]",
  buttonSecondaryText: "text-[#5C5C5C]",
  buttonTextLight: "text-white",
  inputBg: "bg-white",
  inputBorder: "border-[#A89C94]/60",
  inputFocusBorder: "focus:border-[#E86F51]",
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };

export default function EquilibraCreateContentPage() {
  const outletContext = useOutletContext();
  const {
    clientId, // e.g., "equilibra"
    clientName = "Equilibra CR", // Default if not from context
    themeColors = defaultEquilibraTheme, // Theme from StudioLayout or default
  } = outletContext || {};

  const initialContentState = {
    title: "",
    contentType: "articulo", // 'articulo', 'guia', 'recurso', 'video', 'audio'
    category: "", // Could be comma-separated tags or a single category
    mainContent: "",
    status: "borrador", // 'borrador', 'publicado'
    featuredImageName: "",
    downloadableFileName: "",
  };

  const [contentData, setContentData] = useState(initialContentState);
  const [isProcessing, setIsProcessing] = useState(false);
  const featuredImageRef = useRef(null);
  const downloadableFileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldNameSetter) => {
    const file = e.target.files[0];
    if (file) {
      fieldNameSetter(file.name);
      // In a real app, you'd handle the file object itself for upload
      // For this demo, we just store the name.
      console.log(
        `File selected for ${
          fieldNameSetter === setFeaturedImageName
            ? "featured image"
            : "downloadable resource"
        }: ${file.name}`
      );
    } else {
      fieldNameSetter("");
    }
  };

  const handleSubmit = async (publish = false) => {
    if (!contentData.title.trim() || !contentData.mainContent.trim()) {
      toast.error("El título y el contenido principal son obligatorios.");
      return;
    }

    setIsProcessing(true);
    const actionText = publish ? "Publicando" : "Guardando borrador";
    const toastId = toast.loading(`${actionText} contenido...`);

    console.log("Submitting content for Equilibra CR:", {
      ...contentData,
      status: publish ? "publicado" : "borrador",
    });
    // Simulate API Call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(
        `Contenido "${contentData.title}" ${
          publish ? "publicado" : "guardado como borrador"
        } con éxito!`,
        { id: toastId, duration: 4000 }
      );
      // Optionally reset form or navigate
      // setContentData(initialContentState);
      // navigate(`/studio/${clientId}/resources`); // Example navigation
    } catch (error) {
      console.error("Content submission error:", error);
      toast.error(`Error al ${actionText.toLowerCase()} el contenido.`, {
        id: toastId,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      className={`p-6 md:p-8 h-full overflow-y-auto ${themeColors.mainContentBg}`}
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.1, 0)}
    >
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: themeColors.surface,
            color: themeColors.textPrimary,
            border: `1px solid ${themeColors.border}`,
          },
        }}
      />

      <motion.div variants={fadeInUp} className="mb-8">
        <h1
          className={`text-3xl font-bold ${themeColors.textPrimary} flex items-center gap-3`}
        >
          <FiPenTool className={themeColors.iconColor} />
          Crear Nuevo Contenido para {clientName}
        </h1>
        <p className={`${themeColors.textSecondary} mt-1`}>
          Redacta artículos, guías, o sube recursos para tu comunidad.
        </p>
      </motion.div>

      <motion.form
        variants={fadeInUp}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6"
      >
        <div
          className={`p-6 rounded-xl ${themeColors.surface} border ${themeColors.border} shadow-lg`}
        >
          <InputField
            label="Título del Contenido"
            id="title"
            name="title"
            value={contentData.title}
            onChange={handleChange}
            required
            placeholder="Ej: Guía para una Alimentación Intuitiva"
            themeColors={themeColors} // Pass theme for consistent InputField styling
          />
        </div>

        <div
          className={`p-6 rounded-xl ${themeColors.surface} border ${themeColors.border} shadow-lg grid md:grid-cols-2 gap-6`}
        >
          <InputField
            label="Tipo de Contenido"
            id="contentType"
            name="contentType"
            type="select"
            value={contentData.contentType}
            onChange={handleChange}
            themeColors={themeColors}
            options={[
              { value: "articulo", label: "Artículo de Blog" },
              { value: "guia", label: "Guía Práctica" },
              { value: "recurso", label: "Recurso Descargable (PDF)" },
              { value: "video", label: "Video Corto (Enlace)" },
              { value: "audio", label: "Audio / Meditación (Enlace)" },
            ]}
          />
          <InputField
            label="Categoría / Etiquetas"
            id="category"
            name="category"
            value={contentData.category}
            onChange={handleChange}
            placeholder="Ej: TCA, Mindful Eating, Recetas (separadas por coma)"
            themeColors={themeColors}
          />
        </div>

        <div
          className={`p-6 rounded-xl ${themeColors.surface} border ${themeColors.border} shadow-lg`}
        >
          <InputField
            label="Contenido Principal"
            id="mainContent"
            name="mainContent"
            type="textarea"
            rows={12}
            value={contentData.mainContent}
            onChange={handleChange}
            required
            placeholder="Escribe aquí el cuerpo de tu artículo, guía o descripción del recurso..."
            themeColors={themeColors}
          />
        </div>

        <div
          className={`p-6 rounded-xl ${themeColors.surface} border ${colors.border} shadow-lg grid md:grid-cols-2 gap-6`}
        >
          <div>
            <label
              htmlFor="featuredImage"
              className={`block text-sm font-medium ${themeColors.textPrimary} mb-1`}
            >
              Imagen Destacada (Opcional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300 hover:border-red-400 transition-colors">
              <div className="space-y-1 text-center">
                <FiImage
                  className={`mx-auto h-10 w-10 ${themeColors.textSecondary} opacity-70`}
                />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="featuredImage_input"
                    className={`relative cursor-pointer rounded-md font-medium ${themeColors.textHighlight} hover:text-red-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500`}
                  >
                    <span>Subir un archivo</span>
                    <input
                      id="featuredImage_input"
                      name="featuredImage_input"
                      type="file"
                      className="sr-only"
                      ref={featuredImageRef}
                      onChange={(e) =>
                        handleFileChange(e, setFeaturedImageName)
                      }
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">o arrastrar y soltar</p>
                </div>
                <p className={`text-xs ${themeColors.textMuted}`}>
                  PNG, JPG, GIF hasta 2MB
                </p>
                {contentData.featuredImageName && (
                  <p className={`text-xs ${colors.success} mt-1`}>
                    Archivo: {contentData.featuredImageName}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="downloadableFile"
              className={`block text-sm font-medium ${themeColors.textPrimary} mb-1`}
            >
              Archivo Descargable (PDF, Audio - Opcional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300 hover:border-red-400 transition-colors">
              <div className="space-y-1 text-center">
                <FiPaperclip
                  className={`mx-auto h-10 w-10 ${themeColors.textSecondary} opacity-70`}
                />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="downloadableFile_input"
                    className={`relative cursor-pointer rounded-md font-medium ${themeColors.textHighlight} hover:text-red-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500`}
                  >
                    <span>Subir un archivo</span>
                    <input
                      id="downloadableFile_input"
                      name="downloadableFile_input"
                      type="file"
                      className="sr-only"
                      ref={downloadableFileRef}
                      onChange={(e) =>
                        handleFileChange(e, setDownloadableFileName)
                      }
                      accept=".pdf,.mp3,.wav"
                    />
                  </label>
                  <p className="pl-1">o arrastrar y soltar</p>
                </div>
                <p className={`text-xs ${themeColors.textMuted}`}>
                  PDF, MP3, WAV hasta 10MB
                </p>
                {contentData.downloadableFileName && (
                  <p className={`text-xs ${colors.success} mt-1`}>
                    Archivo: {contentData.downloadableFileName}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-6 rounded-xl ${themeColors.surface} border ${themeColors.border} shadow-lg`}
        >
          <InputField
            label="Estado de Publicación"
            id="status"
            name="status"
            type="select"
            value={contentData.status}
            onChange={handleChange}
            themeColors={themeColors}
            options={[
              {
                value: "borrador",
                label: "Borrador (Guardado, no visible públicamente)",
              },
              {
                value: "publicado",
                label: "Publicado (Visible para clientes/público)",
              },
            ]}
          />
        </div>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4"
        >
          <Button
            onClick={() => handleSubmit(false)}
            variant="custom"
            size="lg"
            icon={<FiSave />}
            disabled={isProcessing}
            className={`
                ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}
                bg-transparent border-2 ${themeColors.borderAccent} ${
              themeColors.textHighlight
            } 
                hover:bg-[#E86F51]/10 hover:border-[#E86F51]
            `}
          >
            {isProcessing && contentData.status === "borrador" ? (
              <FiLoader className="animate-spin" />
            ) : (
              "Guardar Borrador"
            )}
          </Button>
          <Button
            onClick={() => handleSubmit(true)}
            variant="custom"
            size="lg"
            icon={
              isProcessing && contentData.status === "publicado" ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FiSend />
              )
            }
            disabled={isProcessing}
            className={`
                ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}
                ${themeColors.buttonPrimaryBg} ${themeColors.buttonTextLight} ${
              themeColors.buttonPrimaryHover
            }
            `}
          >
            {isProcessing && contentData.status === "publicado" ? (
              <FiLoader className="animate-spin" />
            ) : (
              "Publicar Contenido"
            )}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

// --- PropTypes ---
EquilibraCreateContentPage.propTypes = {};
// Assuming Section, InputField, Button have their own PropTypes defined.
