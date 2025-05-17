// src/pages/Equilibra/EquilibraBlogPage.js
// Blog listing page for Equilibra CR.
// Features filters and a grid of blog post previews.
// Uses Equilibra CR's light, earthy, and supportive theme.
// Current time: Friday, May 16, 2025 at 3:10 PM CST.

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiBookOpen,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiUser,
  FiArrowRight,
  FiChevronDown,
  FiInfo,
  FiEdit2,
  FiMessageSquare,
} from "react-icons/fi";

// Reusable Components
import Button from "../../components/Button"; // Assuming Button is styled or accepts className overrides
import Section from "../../components/Section"; // Assuming Section is styled or adaptable
import { createScaleUp } from "../../utils/animationVariants";
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.png";

const scaleUp = createScaleUp();

// --- Equilibra CR New Color Palette ---
const colors = {
  background: "bg-[#FFF7F2]",
  surface: "bg-white",
  surfaceMuted: "bg-[#FDB386]/10", // Soft Peach with low opacity for filter/search bar
  border: "border-[#A89C94]/40",
  borderLight: "border-[#F7C6B7]/60",
  borderAccent: "border-[#E86F51]/50",
  textPrimary: "text-[#5C5C5C]",
  textSecondary: "text-[#A89C94]",
  textHighlight: "text-[#E86F51]", // Coral Red
  iconColor: "text-[#E86F51]",
  buttonPrimaryBg: "bg-[#E86F51]",
  buttonPrimaryHover: "hover:bg-[#d95f41]",
  buttonTextLight: "text-white",
  inputBg: "bg-white",
  inputBorder: "border-[#A89C94]/60",
  inputFocusBorder: "focus:border-[#E86F51]",
  tagBg: "bg-[#F7C6B7]/50", // Blush Pink with opacity for tags
  tagText: "text-[#E86F51]", // Coral Red for tag text
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.1) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});

// --- Blog Post Card Component ---
const BlogPostCard = ({ post }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex flex-col ${colors.surface} rounded-xl shadow-lg border ${colors.borderLight} overflow-hidden h-full group hover:shadow-xl transition-all duration-300`}
    whileHover={{ y: -5 }}
  >
    {post.image && (
      <Link
        to={`/equilibra/blog/${post.slug}`}
        className="block aspect-video overflow-hidden"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
    )}
    {!post.image && (
      <div
        className={`aspect-video ${colors.surfaceMuted} flex items-center justify-center border-b ${colors.borderLight}`}
      >
        <FiBookOpen
          className={`w-16 h-16 ${colors.textSecondary} opacity-30`}
        />
      </div>
    )}
    <div className="p-5 md:p-6 flex flex-col flex-grow">
      <div className="mb-3">
        {post.category && (
          <span
            className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${colors.tagBg} ${colors.tagText}`}
          >
            {post.category}
          </span>
        )}
      </div>
      <Link to={`/equilibra/blog/${post.slug}`} className="block">
        <h3
          className={`text-lg md:text-xl font-bold ${colors.textPrimary} mb-2 group-hover:${colors.textHighlight} transition-colors`}
        >
          {post.title}
        </h3>
      </Link>
      <p
        className={`text-sm ${colors.textSecondary} flex-grow leading-relaxed mb-4`}
      >
        {post.excerpt}
      </p>
      <div
        className={`text-xs ${colors.textSecondary} border-t ${colors.borderLight} pt-3 mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between`}
      >
        <div className="flex items-center mb-1 sm:mb-0">
          <FiCalendar className="w-3.5 h-3.5 mr-1.5 opacity-70" /> {post.date}
        </div>
        {post.author && (
          <span className="flex items-center">
            <FiUser className="w-3.5 h-3.5 mr-1.5 opacity-70" /> {post.author}
          </span>
        )}
      </div>
      <Link
        to={`/equilibra/blog/${post.slug}`}
        className={`inline-flex items-center text-sm font-medium ${colors.textHighlight} hover:text-[#c65c41] mt-4 self-start`}
      >
        Leer Artículo <FiArrowRight className="ml-1.5 w-4 h-4" />
      </Link>
    </div>
  </motion.div>
);
BlogPostCard.propTypes = { post: PropTypes.object.isRequired };

// --- Main Equilibra Blog Page Component ---
export default function EquilibraBlogPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Mock Blog Post Data (Replace with actual data fetching)
  const mockBlogPosts = [
    {
      slug: "que-es-la-pica",
      title: "¿Qué es la PICA en los Trastornos Alimentarios?",
      category: "TCA",
      date: "14 Abril, 2025",
      author: "Equilibra CR",
      excerpt:
        "La pica merece ser visibilizada, comprendida y acompañada con cuidado. No es una 'rareza', sino un comportamiento que necesita apoyo.",
    },
    {
      slug: "liberarte-del-miedo",
      title: "Liberarte del Miedo y la Culpa Alimentaria",
      category: "Bienestar Emocional",
      date: "7 Enero, 2025",
      author: "Equilibra CR",
      excerpt:
        "Este 2025, es hora de dejar atrás los mitos y celebrar tu cuerpo tal como es, sin juicios. Descubre una nueva forma de nutrirte.",
    },
    {
      slug: "entendiendo-arfid",
      title: "Entendiendo el Trastorno de Evitación/Restricción (ARFID)",
      category: "TCA",
      date: "20 Marzo, 2025",
      author: "Equilibra CR",
      excerpt:
        "ARFID va más allá de ser 'quisquilloso con la comida'. Exploramos sus características y la importancia del apoyo profesional.",
    }, // Placeholder image
    {
      slug: "mini-guia-bulimia",
      title: "Mini Guía TCA: Comprendiendo la Bulimia Nerviosa",
      category: "TCA",
      date: "5 Mayo, 2025",
      author: "Equilibra CR",
      excerpt:
        "La bulimia es compleja y a menudo oculta. Conoce sus señales, mitos y cómo ofrecer un apoyo respetuoso.",
    }, // Placeholder image
    {
      slug: "movimiento-consciente",
      title: "El Poder del Movimiento Consciente",
      category: "Mindful Strength",
      date: "1 Junio, 2025",
      author: "Equilibra CR",
      excerpt:
        "Descubre cómo el ejercicio puede ser un acto de presencia y alegría, en lugar de un castigo. Conecta con tu cuerpo.",
    },
    {
      slug: "estableciendo-limites",
      title: "Poner Límites: Una Forma de Auto-Cuidado",
      category: "Bienestar Emocional",
      date: "10 Julio, 2025",
      author: "Equilibra CR",
      excerpt:
        "Aprende la importancia de establecer límites saludables en tus relaciones y contigo mismo/a para proteger tu energía y bienestar.",
    },
  ];

  const categories = [
    "Todos",
    ...new Set(mockBlogPosts.map((post) => post.category)),
  ];

  const filteredPosts = useMemo(() => {
    return mockBlogPosts.filter((post) => {
      const searchMatch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch =
        selectedCategory === "Todos" || post.category === selectedCategory;
      return searchMatch && categoryMatch;
    });
  }, [searchTerm, selectedCategory, mockBlogPosts]);

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className="relative pt-24 md:pt-32 pb-16 md:pb-20 text-center overflow-hidden border-b ${colors.borderLight}"
          ariaLabelledby="equilibra-blog-hero"
        >
          <div className="absolute inset-0 opacity-[0.02] bg-[url('/public/images/financial-texture.png')] bg-repeat"></div>
          <motion.div
            className="max-w-3xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer()}
          >
            <motion.div
              variants={scaleUp}
              className={`inline-block p-4 mb-6 rounded-full bg-[#FDB386]/20 border border-[#FDB386]/40`}
            >
              {" "}
              {/* Soft Peach accent */}
              <FiBookOpen className={`w-12 h-12 ${colors.textHighlight}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="equilibra-blog-hero"
              className={`text-4xl sm:text-5xl font-bold ${colors.textPrimary} mb-4`}
            >
              Blog Equilibra:{" "}
              <span className={colors.textHighlight}>
                Nutrición y Bienestar
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              Artículos, reflexiones y recursos para acompañarte en tu camino
              hacia una relación saludable y compasiva con la comida y tu
              cuerpo.
            </motion.p>
          </motion.div>
        </Section>

        {/* Filters and Blog Grid Section */}
        <Section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Filter Controls */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={`mb-8 md:mb-10 p-4 rounded-xl ${colors.surfaceMuted} border ${colors.border} shadow-sm flex flex-col sm:flex-row gap-4 items-center`}
            >
              <div className="relative flex-grow w-full sm:w-auto">
                <FiSearch
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.textSecondary} opacity-80`}
                />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-md border ${colors.inputBorder} ${colors.textPrimary} ${colors.inputBg} focus:outline-none focus:ring-1 ${colors.inputFocusRing} ${colors.inputFocusBorder} placeholder:${colors.textSecondary}`}
                />
              </div>
              <div className="relative w-full sm:w-auto sm:min-w-[200px]">
                <FiFilter
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.textSecondary} opacity-80`}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full pl-10 pr-8 py-2.5 text-sm appearance-none rounded-md border ${colors.inputBorder} ${colors.textPrimary} ${colors.inputBg} focus:outline-none focus:ring-1 ${colors.inputFocusRing} ${colors.inputFocusBorder}`}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <FiChevronDown
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.textSecondary} opacity-60 pointer-events-none`}
                />{" "}
                {/* Added FiChevronDown */}
              </div>
            </motion.div>

            {/* Blog Post Grid */}
            <AnimatePresence>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
                variants={staggerContainer(0.15)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                  ))
                ) : (
                  <motion.p
                    variants={fadeInUp}
                    className={`md:col-span-2 lg:col-span-3 text-center ${colors.textSecondary} py-16 px-6 ${colors.surface} rounded-lg border ${colors.borderLight}`}
                  >
                    No se encontraron artículos que coincidan con tu búsqueda.
                    Intenta con otros términos o categorías.
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Section>

        {/* CTA to suggest topics or contact */}
        <Section
          bg={colors.surfaceAccent}
          className="py-16 md:py-20 text-center border-t ${colors.borderLight}"
          ariaLabelledby="blog-cta-title"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-2xl mx-auto"
          >
            <FiEdit2
              className={`w-10 h-10 ${colors.accentCoral} mx-auto mb-4`}
            />
            <h2
              id="blog-cta-title"
              className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} mb-3`}
            >
              ¿Tienes Alguna Pregunta o Tema que Sugerir?
            </h2>
            <p
              className={`text-lg ${colors.textSecondary} mb-8 max-w-xl mx-auto`}
            >
              Nos encantaría escuchar tus ideas para futuros artículos o
              responder tus inquietudes. Tu participación enriquece nuestra
              comunidad.
            </p>
            <Button
              to="/equilibra/contact?subject=SugerenciaBlogEquilibra"
              variant="custom"
              size="lg"
              icon={<FiMessageSquare />}
              className={`${colors.buttonPrimaryBg} ${colors.buttonTextLight} ${colors.buttonPrimaryHover} shadow-lg`}
            >
              Contactar a Equilibra CR
            </Button>
          </motion.div>
        </Section>

        <p
          className={`text-center text-sm ${colors.textSecondary} mt-16 pb-16 flex items-center justify-center gap-1.5`}
        ></p>
      </main>
    </div>
  );
}

// --- PropTypes ---
EquilibraBlogPage.propTypes = {};
BlogPostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    date: PropTypes.string.isRequired,
    author: PropTypes.string,
    excerpt: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};
Section.propTypes = {
  /* ... */
};
Button.propTypes = {
  /* ... */
};
