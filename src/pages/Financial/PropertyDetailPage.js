// src/pages/Financial/PropertyDetailPage.js
// Displays details for a specific property fetched by ID.
// Uses Green/White/Grey Theme, Spanish Language. Uses mock data for now.
// Current time: Friday, May 2, 2025 at 5:47 PM CST. San José, Costa Rica.

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiMaximize2,
  FiUser,
  FiDroplet,
  FiKey,
  FiTag,
  FiInfo,
  FiArrowLeft,
  FiPhone,
  FiAlertCircle,
  FiLoader,
  FiCalendar,
} from "react-icons/fi";

// Reusable Components & Data
import Button from "../../components/Button";
// IMPORTANT: Assuming mockProperties is moved to a central data file
// import { mockProperties } from '../../data/financialProperties'; // Example import

// --- TEMPORARY Mock Data (Move to central file later) ---
const mockProperties = [
  {
    id: "P001",
    title: "Casa Moderna en Condominio, Cartago",
    type: "Venta",
    price: 150000000,
    currency: "CRC",
    location: "Cartago Centro",
    propertyType: "Casa",
    beds: 3,
    baths: 2.5,
    area: 180,
    image: "/images/property-mock-1.jpeg",
    status: "Disponible",
    isRentToBuy: false,
  },
  {
    id: "P002",
    title: "Apartamento Céntrico con Vistas, Sabana",
    type: "Alquiler",
    price: 450000,
    currency: "CRC",
    location: "San José, Sabana",
    propertyType: "Apartamento",
    beds: 2,
    baths: 2,
    area: 90,
    image: "/images/property-mock-2.jpeg",
    status: "Disponible",
    isRentToBuy: false,
  },
  {
    id: "P003",
    title: "Lote Residencial en Orosi",
    type: "Venta",
    price: 35000000,
    currency: "CRC",
    location: "Orosi, Cartago",
    propertyType: "Lote",
    beds: null,
    baths: null,
    area: 500,
    image: "/images/property-mock-3.jpeg",
    status: "Disponible",
    isRentToBuy: false,
  },
  {
    id: "P004",
    title: "Condominio Completo, Escazú",
    type: "Compra",
    price: 75000000,
    currency: "USD",
    location: "Escazú, San José",
    propertyType: "Condominio",
    beds: "-",
    baths: "-",
    area: 75000,
    image: "/images/property-mock-4.jpeg",
    status: "Disponible",
    isRentToBuy: true,
  }, // Rent to Buy Example
  {
    id: "P005",
    title: "Casa Amplia, Tres Ríos",
    type: "Venta",
    price: 195000000,
    currency: "CRC",
    location: "Tres Ríos, Cartago",
    propertyType: "Casa",
    beds: 4,
    baths: 3,
    area: 250,
    image: "/images/property-mock-5.jpeg",
    status: "Disponible",
    isRentToBuy: false,
  },
  {
    id: "P006",
    title: "Apartamento Nuevo, Heredia Centro",
    type: "Alquiler",
    price: 400000,
    currency: "CRC",
    location: "Heredia Centro",
    propertyType: "Apartamento",
    beds: 1,
    baths: 1,
    area: 55,
    image: "/images/property-mock-6.jpeg",
    status: "Disponible",
    isRentToBuy: false,
  }, // Reused image
];
// --- End Mock Data ---

// Theme Colors
const colors = {
  background: "bg-slate-100",
  surface: "bg-white",
  primary: "text-emerald-700",
  primaryBg: "bg-emerald-600",
  primaryBgHover: "hover:bg-emerald-700",
  secondary: "text-slate-600",
  textDark: "text-slate-800",
  textLight: "text-white",
  border: "border-slate-300",
  borderLight: "border-slate-200",
  tagSaleBg: "bg-blue-100",
  tagSaleText: "text-blue-800",
  tagRentBg: "bg-purple-100",
  tagRentText: "text-purple-800",
  tagRentToBuyBg: "bg-yellow-100",
  tagRentToBuyText: "text-yellow-800",
};

// Animation Variants
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };
const viewportSettings = { once: true, amount: 0.1 };
// Format Currency Helper
function formatCurrency(value, currency = "CRC") {
  /* ... same as before ... */
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(value);
}

// --- Reusable Section Component ---
// Added option for wider padding on y-axis
const Section = ({
  children,
  className = "",
  bg = colors.bgBase,
  widePadding = false,
  ...props
}) => (
  <motion.section
    className={`${
      widePadding ? "py-20 md:py-28" : "py-16 md:py-20"
    } ${bg} ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={viewportSettings}
    variants={staggerContainer}
    {...props}
  >
    {/* Using max-w-5xl for a slightly more contained feel */}
    <div className="container mx-auto px-4 max-w-5xl">{children}</div>
  </motion.section>
);
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  widePadding: PropTypes.bool,
};

// --- Reusable Detail Item ---
const DetailItem = ({ icon: Icon, label, value }) => {
  if (!value) return null; // Don't render if value is null/undefined
  return (
    <div className="flex items-center text-sm sm:text-base">
      <Icon className={`w-5 h-5 mr-2 ${colors.secondary} flex-shrink-0`} />
      <span className={colors.secondary}>{label}:</span>
      <span className={`ml-2 font-medium ${colors.textDark}`}>{value}</span>
    </div>
  );
};
DetailItem.propTypes = {
  /* Add PropTypes */
};

// --- Main Property Detail Page Component ---
export default function PropertyDetailPage() {
  const { propertyId } = useParams(); // Get ID from route params
  const navigate = useNavigate(); // For back button functionality
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simulate fetching data
    const timer = setTimeout(() => {
      const foundProperty = mockProperties.find((p) => p.id === propertyId);
      if (foundProperty) {
        setProperty(foundProperty);
      } else {
        setError("Propiedad no encontrada.");
      }
      setLoading(false);
    }, 500); // Short delay for simulation

    return () => clearTimeout(timer);
  }, [propertyId]);

  // --- Loading State ---
  if (loading) {
    return (
      <div
        className={`min-h-screen ${colors.background} flex items-center justify-center`}
      >
        <FiLoader className={`w-12 h-12 ${colors.primary} animate-spin`} />
      </div>
    );
  }

  // --- Error State ---
  if (error || !property) {
    return (
      <div
        className={`min-h-screen ${colors.background} flex flex-col items-center justify-center text-center p-8`}
      >
        <FiAlertCircle className={`w-16 h-16 text-red-500 mb-4`} />
        <h1 className={`text-2xl font-bold ${colors.textDark} mb-2`}>Error</h1>
        <p className={`${colors.secondary} mb-6`}>
          {error || "No se pudo cargar la información de la propiedad."}
        </p>
        <Button
          onClick={() => navigate(-1)}
          variant="secondary"
          icon={<FiArrowLeft />}
        >
          {" "}
          {/* Use navigate(-1) for back */}
          Volver
        </Button>
      </div>
    );
  }

  // --- Determine Tag Style ---
  let tagBg = colors.tagSaleBg;
  let tagText = colors.tagSaleText;
  let typeText = property.type;
  if (property.isRentToBuy) {
    tagBg = colors.tagRentToBuyBg;
    tagText = colors.tagRentToBuyText;
    typeText = "Alquiler con Opción";
  } else if (property.type === "Alquiler") {
    tagBg = colors.tagRentBg;
    tagText = colors.tagRentText;
  }

  // Get current timestamp string
  const currentTime = new Date().toLocaleString("es-CR", {
    /* ... */
  });

  return (
    <div
      className={`${colors.background} ${colors.textDark} font-sans py-12 md:py-16`}
    >
      {/* Assumes FinancialLayout provides Header/Footer */}
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Back Link */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-6"
        >
          <Link
            to="/anaco/marketplace"
            className={`inline-flex items-center text-sm ${colors.primary} hover:underline font-medium group`}
          >
            <FiArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
            Volver al Mercado
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 ${colors.surface} p-6 md:p-8 rounded-xl shadow-lg border ${colors.borderLight}`}
        >
          {/* Left Column (Image & Map) */}
          <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-md border border-slate-200">
              <img
                src={property.image}
                alt={`Foto principal de ${property.title}`}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold ${tagBg} ${tagText} flex items-center gap-1.5 shadow`}
              >
                {property.isRentToBuy && <FiKey className="w-4 h-4" />}
                {typeText}
              </span>
            </div>
            {/* Map Placeholder/Iframe */}
            <div className="h-64 md:h-80 rounded-lg border ${colors.border} overflow-hidden shadow-sm relative">
              {/* Using a simple placeholder - replace with actual map embed */}
              <iframe
                title={`Mapa de ubicación para ${property.title}`}
                width="100%"
                height="100%"
                loading="lazy"
                frameBorder="0"
                scrolling="no"
                // Basic embed centered on Costa Rica - REPLACE with property coords or better geocoding for real use
                src="https://www.openstreetmap.org/export/embed.html?bbox=-85.92,8.00,-82.50,11.22&amp;layer=mapnik"
                style={{ border: 0 }}
              ></iframe>
              <div className="absolute bottom-2 left-2 p-2 px-3 rounded bg-black/60 backdrop-blur-sm pointer-events-none">
                <p className="flex items-center gap-1.5 text-xs text-white font-medium">
                  <FiMapPin className="w-3 h-3 flex-shrink-0" />
                  {property.location} (Ubicación Aprox.)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Details & Description) */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-1 flex flex-col"
          >
            <h1
              className={`text-3xl md:text-4xl font-bold ${colors.textDark} mb-3 leading-tight`}
            >
              {property.title}
            </h1>
            <p className={`text-lg ${colors.secondary} flex items-center mb-4`}>
              <FiMapPin className="w-5 h-5 mr-2 flex-shrink-0" />
              {property.location}
            </p>
            <p
              className={`text-3xl font-bold ${colors.primary} mb-6 pb-6 border-b ${colors.borderLight}`}
            >
              {formatCurrency(property.price, property.currency)}{" "}
              {property.type === "Alquiler" ? "/ mes" : ""}
            </p>

            {/* Key Details */}
            <div className="space-y-3 mb-6">
              <DetailItem
                icon={FiHome}
                label="Tipo"
                value={property.propertyType}
              />
              <DetailItem
                icon={FiTag}
                label="Transacción"
                value={
                  property.isRentToBuy ? "Alquiler con Opción" : property.type
                }
              />
              <DetailItem
                icon={FiUser}
                label="Habitaciones"
                value={property.beds}
              />
              <DetailItem
                icon={FiDroplet}
                label="Baños"
                value={property.baths}
              />
              <DetailItem
                icon={FiMaximize2}
                label="Área (Construc.)"
                value={property.area ? `${property.area} m²` : null}
              />
              <DetailItem
                icon={FiCalendar}
                label="Estado"
                value={property.status}
              />
            </div>

            {/* Description */}
            <div className="mb-6 flex-grow">
              <h2 className={`text-xl font-semibold ${colors.textDark} mb-2`}>
                Descripción
              </h2>
              <p
                className={`${colors.secondary} text-base whitespace-pre-line leading-relaxed`}
              >
                {property.fullDescription ||
                  "No hay descripción detallada disponible."}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-6 border-t ${colors.borderLight}">
              <Button
                to={`/anaco/contact?subject=Consulta%20Propiedad%20${property.id}`} // Link to contact form, prefill subject
                variant="primary"
                size="lg"
                icon={<FiPhone />}
                className={`w-full ${colors.primaryBg} ${colors.primaryBgHover} ${colors.textLight}`}
              >
                Contactar Asesor / Agendar Visita
              </Button>
              {/* Optionally add pre-approval button */}
              {/* <Button to="/anaco/request-preapproval" variant="secondary" size="lg" className="w-full mt-3">Iniciar Pre-Aprobación</Button> */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// --- PropTypes ---
DetailItem.propTypes = {
  /* Add PropTypes */
};
Section.propTypes = {
  /* Add PropTypes */
};
