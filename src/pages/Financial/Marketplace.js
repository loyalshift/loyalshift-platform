// src/pages/Financial/Marketplace.js
// REFINED Marketplace page with filters and property listings.
// Includes Sale, Rent, and Rent-to-Buy options. Uses mock data.
// Uses Green/White/Grey Theme, Spanish Language.
// Current time: Friday, May 2, 2025 at 5:10 PM CST. San José, Costa Rica.

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiArrowRight,
  FiMapPin,
  FiDollarSign,
  FiFilter,
  FiSearch,
  FiTag,
  FiInfo,
  FiMaximize2,
  FiUser,
  FiDroplet,
  FiKey,
  FiXCircle,
  FiLayout, // Added FiKey, FiXCircle, FiLayout
} from "react-icons/fi";

// Reusable Components
import Button from "../../components/Button";
// Using standard inputs/selects for filters for simplicity, but InputField could be used
// import InputField from "../../components/InputField";

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
  inputBorder: "border-slate-300",
  inputFocusBorder: "focus:border-emerald-500",
  inputFocusRing: "focus:ring-emerald-500/50",
  tagSaleBg: "bg-blue-100",
  tagSaleText: "text-blue-800",
  tagRentBg: "bg-purple-100",
  tagRentText: "text-purple-800",
  tagRentToBuyBg: "bg-yellow-100", // Distinct color for Rent-to-Buy
  tagRentToBuyText: "text-yellow-800",
};

// Animation Variants
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariant = {
  // For cards within AnimatePresence
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// --- Enhanced Mock Property Data ---
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

// --- Format Currency Helper ---
function formatCurrency(value, currency = "CRC") {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(value);
}

const Section = ({
  children,
  className = "",
  bg = colors.background, // Default background from colors object
  ariaLabelledby, // For accessibility, pass the ID of the section's heading
}) => (
  <motion.section
    // Apply base padding, background color, and any additional classes
    className={`py-12 md:py-16 ${bg} ${className}`}
    // Animation props: Trigger when in view, use stagger container variant
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce} // Use defined viewport settings
    variants={staggerContainer} // Apply stagger effect to direct motion children
    // Accessibility: Link section to its heading
    aria-labelledby={ariaLabelledby}
  >
    {/* Inner container for max-width and padding */}
    <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
      {/* Render the content passed to the section */}
      {children}
    </div>
  </motion.section>
);

// --- Refined Property Card Component ---
const PropertyCard = ({ property }) => {
  let tagBg = colors.tagSaleBg;
  let tagText = colors.tagSaleText;
  let typeText = property.type; // Venta or Alquiler

  if (property.isRentToBuy) {
    tagBg = colors.tagRentToBuyBg;
    tagText = colors.tagRentToBuyText;
    typeText = "Alquiler con Opción"; // Specific text
  } else if (property.type === "Alquiler") {
    tagBg = colors.tagRentBg;
    tagText = colors.tagRentText;
  }

  return (
    // Apply cardVariant for AnimatePresence
    <motion.div
      layout // Animate layout changes smoothly
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`${colors.surface} rounded-lg shadow-md border ${colors.borderLight} overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-lg hover:border-emerald-300`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {" "}
        {/* Slightly taller aspect ratio */}
        <img
          src={property.image}
          alt={`Foto de ${property.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span
          className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-semibold ${tagBg} ${tagText} flex items-center gap-1 shadow-sm`}
        >
          {property.isRentToBuy && <FiKey className="w-3 h-3" />}
          {/* Icon for Rent-to-Buy */}
          {typeText}{" "}
          {property.status !== "Disponible" ? `(${property.status})` : ""}
        </span>
      </div>
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className={`text-base sm:text-lg font-semibold ${colors.textDark} mb-1 group-hover:${colors.primary} transition-colors truncate`}
          title={property.title}
        >
          {property.title}
        </h3>
        <p
          className={`text-xs sm:text-sm ${colors.secondary} flex items-center mb-3`}
        >
          <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 flex-shrink-0" />
          {property.location}
        </p>
        <p className={`text-lg sm:text-xl font-bold ${colors.primary} mb-3`}>
          {formatCurrency(property.price, property.currency)}{" "}
          {property.type === "Alquiler" ? "/ mes" : ""}
        </p>
        {/* Details */}
        {(property.beds || property.baths || property.area) && (
          <div
            className={`flex flex-wrap items-center justify-start text-xs ${colors.secondary} gap-x-3 gap-y-1 border-t ${colors.borderLight} pt-2 mt-auto`}
          >
            {property.beds && (
              <span className="flex items-center">
                <FiUser className="w-3 h-3 mr-1" /> {property.beds} Hab.
              </span>
            )}
            {property.baths && (
              <span className="flex items-center">
                <FiDroplet className="w-3 h-3 mr-1" /> {property.baths} Baños
              </span>
            )}
            {property.area && (
              <span className="flex items-center">
                <FiMaximize2 className="w-3 h-3 mr-1" /> {property.area} m²
              </span>
            )}
          </div>
        )}
        <Link
          to={`/anaco/property/${property.id}`}
          className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-800 self-start group-hover:underline"
        >
          Ver Detalles{" "}
          <FiArrowRight className="inline ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};
PropertyCard.propTypes = {
  /* Add PropTypes */
};

// --- Main Marketplace Page Component ---
export default function Marketplace() {
  const initialFilters = {
    location: "",
    type: "Todos",
    propertyType: "Todos",
    minPrice: "",
    maxPrice: "",
    beds: "Cualquiera",
    baths: "Cualquiera",
    minArea: "",
    maxArea: "",
  };
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  // Filter properties based on state
  const filteredProperties = useMemo(() => {
    console.log("Filtering with:", filters); // Debug log
    return mockProperties.filter((p) => {
      // Location Filter (Case-insensitive partial match)
      const meetsLocation =
        !filters.location ||
        p.location.toLowerCase().includes(filters.location.toLowerCase());

      // Type Filter (Handle Rent-to-Buy specifically if needed, otherwise just Sale/Alquiler)
      const meetsType =
        filters.type === "Todos" ||
        (filters.type === "Venta" && p.type === "Venta" && !p.isRentToBuy) ||
        (filters.type === "Alquiler" &&
          p.type === "Alquiler" &&
          !p.isRentToBuy) ||
        (filters.type === "AlquilerConOpcion" && p.isRentToBuy);

      // Property Type Filter
      const meetsPropertyType =
        filters.propertyType === "Todos" ||
        p.propertyType === filters.propertyType;

      // Price Filter
      const minPrice = parseFloat(filters.minPrice) || 0;
      const maxPrice = parseFloat(filters.maxPrice) || Infinity;
      const meetsPrice = p.price >= minPrice && p.price <= maxPrice;

      // Beds Filter
      const meetsBeds =
        filters.beds === "Cualquiera" ||
        (p.beds && p.beds >= parseInt(filters.beds, 10));

      // Baths Filter
      const meetsBaths =
        filters.baths === "Cualquiera" ||
        (p.baths && p.baths >= parseInt(filters.baths, 10));

      // Area Filter
      const minArea = parseFloat(filters.minArea) || 0;
      const maxArea = parseFloat(filters.maxArea) || Infinity;
      const meetsArea = !p.area || (p.area >= minArea && p.area <= maxArea); // Handle null area (e.g., for lots)

      return (
        meetsLocation &&
        meetsType &&
        meetsPropertyType &&
        meetsPrice &&
        meetsBeds &&
        meetsBaths &&
        meetsArea
      );
    });
  }, [filters]); // Dependency is the filters object

  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className={`${colors.background} min-h-screen py-12 md:py-16 px-4`}>
      <div className="container mx-auto max-w-7xl">
        {" "}
        {/* Wider container */}
        {/* Page Header */}
        <motion.section
          className="text-center mb-10 md:mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <FiLayout
            className={`w-12 h-12 ${colors.primary} mx-auto mb-3 opacity-80`}
          />
          <h1
            className={`text-4xl md:text-5xl font-bold ${colors.textDark} mb-2`}
          >
            Mercado de Propiedades ANACO
          </h1>
          <p className={`text-lg ${colors.secondary}`}>
            Explore propiedades disponibles para venta, alquiler o alquiler con
            opción a compra.
          </p>
        </motion.section>
        {/* Filter Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className={`${colors.surface} p-4 sm:p-6 rounded-xl shadow-md border ${colors.borderLight} mb-8 md:mb-10`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className={`block text-xs font-medium ${colors.secondary} mb-1`}
              >
                Ubicación
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Ej: Cartago, Sabana..."
                className={`w-full text-sm p-2 border ${colors.inputBorder} rounded-md ${colors.inputFocusRing} ${colors.inputFocusBorder}`}
              />
            </div>
            {/* Type (Venta/Alquiler/...) */}
            <div>
              <label
                htmlFor="type"
                className={`block text-xs font-medium ${colors.secondary} mb-1`}
              >
                Tipo Transacción
              </label>
              <select
                name="type"
                id="type"
                value={filters.type}
                onChange={handleFilterChange}
                className={`w-full text-sm p-2 border ${colors.inputBorder} rounded-md ${colors.inputFocusRing} ${colors.inputFocusBorder} bg-white appearance-none`}
              >
                <option value="Todos">Todos</option>
                <option value="Venta">Venta</option>
                <option value="Alquiler">Alquiler</option>
                <option value="AlquilerConOpcion">Alquiler con Opción</option>
              </select>
            </div>
            {/* Property Type */}
            <div>
              <label
                htmlFor="propertyType"
                className={`block text-xs font-medium ${colors.secondary} mb-1`}
              >
                Tipo Propiedad
              </label>
              <select
                name="propertyType"
                id="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className={`w-full text-sm p-2 border ${colors.inputBorder} rounded-md ${colors.inputFocusRing} ${colors.inputFocusBorder} bg-white appearance-none`}
              >
                <option value="Todos">Todos</option>
                <option value="Casa">Casa</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Lote">Lote</option>
                <option value="Oficina">Oficina</option>
                {/* Add more types */}
              </select>
            </div>
            {/* Price Range */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="minPrice"
                  className={`block text-xs font-medium ${colors.secondary} mb-1`}
                >
                  Precio Mín ₡
                </label>
                <input
                  type="number"
                  name="minPrice"
                  id="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Mín"
                  className={`w-full text-sm p-2 border ${colors.inputBorder} rounded-md ${colors.inputFocusRing} ${colors.inputFocusBorder}`}
                />
              </div>
              <div>
                <label
                  htmlFor="maxPrice"
                  className={`block text-xs font-medium ${colors.secondary} mb-1`}
                >
                  Precio Máx ₡
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  id="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Máx"
                  className={`w-full text-sm p-2 border ${colors.inputBorder} rounded-md ${colors.inputFocusRing} ${colors.inputFocusBorder}`}
                />
              </div>
            </div>
            {/* Beds */}
            <div>
              <label
                htmlFor="beds"
                className={`block text-xs font-medium ${colors.secondary} mb-1`}
              >
                Habitaciones (Mín)
              </label>
              <select
                name="beds"
                id="beds"
                value={filters.beds}
                onChange={handleFilterChange}
                className={`w-full text-sm p-2 border ${colors.inputBorder} rounded-md ${colors.inputFocusRing} ${colors.inputFocusBorder} bg-white appearance-none`}
              >
                <option value="Cualquiera">Cualquiera</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            {/* Baths */}
            <div>
              <label
                htmlFor="baths"
                className={`block text-xs font-medium ${colors.secondary} mb-1`}
              >
                Baños (Mín)
              </label>
              <select
                name="baths"
                id="baths"
                value={filters.baths}
                onChange={handleFilterChange}
                className={`w-full text-sm p-2 border ${colors.inputBorder} rounded-md ${colors.inputFocusRing} ${colors.inputFocusBorder} bg-white appearance-none`}
              >
                <option value="Cualquiera">Cualquiera</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>
            {/* Area Range */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="minArea"
                  className={`block text-xs font-medium ${colors.secondary} mb-1`}
                >
                  Área Mín m²
                </label>
                <input
                  type="number"
                  name="minArea"
                  id="minArea"
                  value={filters.minArea}
                  onChange={handleFilterChange}
                  placeholder="Mín"
                  className={`w-full text-sm p-2 border ${colors.inputBorder} rounded-md ${colors.inputFocusRing} ${colors.inputFocusBorder}`}
                />
              </div>
              <div>
                <label
                  htmlFor="maxArea"
                  className={`block text-xs font-medium ${colors.secondary} mb-1`}
                >
                  Área Máx m²
                </label>
                <input
                  type="number"
                  name="maxArea"
                  id="maxArea"
                  value={filters.maxArea}
                  onChange={handleFilterChange}
                  placeholder="Máx"
                  className={`w-full text-sm p-2 border ${colors.inputBorder} rounded-md ${colors.inputFocusRing} ${colors.inputFocusBorder}`}
                />
              </div>
            </div>
            {/* Clear Button */}
            <div className="flex items-end">
              <Button
                type="button"
                onClick={clearFilters}
                variant="secondary" // Use secondary or a custom subtle style
                size="base"
                className={`w-full !py-2 !text-xs !border ${colors.border} ${colors.secondary} hover:!bg-slate-200`} // Explicit overrides for size/style
                icon={<FiXCircle className="w-4 h-4" />}
              >
                Limpiar
              </Button>
            </div>
          </div>
        </motion.div>
        {/* Results Grid */}
        <motion.div
          layout // Animate layout changes when grid items change
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                // *** USE THE IMPORTED COMPONENT HERE ***
                <PropertyCard key={property.id} property={property} />
                // *** END USE ***
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="sm:col-span-2 lg:col-span-3 text-center py-16"
              >
                <FiSearch
                  className={`w-12 h-12 ${colors.secondary} opacity-50 mx-auto mb-4`}
                />
                <p className={`${colors.secondary} text-lg`}>
                  No se encontraron propiedades con los filtros seleccionados.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// --- PropTypes ---
PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["Venta", "Alquiler"]).isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    propertyType: PropTypes.string.isRequired,
    beds: PropTypes.number,
    baths: PropTypes.number,
    area: PropTypes.number,
    image: PropTypes.string.isRequired,
    status: PropTypes.string,
    isRentToBuy: PropTypes.bool,
  }).isRequired,
};
Section.propTypes = {
  /* ... */
};
// InputField PropTypes (if used)
// Button PropTypes
