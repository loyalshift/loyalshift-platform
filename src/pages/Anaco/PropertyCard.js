// Possible file location: src/components/Anaco/PropertyCard.js

import React from "react";
import { motion } from "framer-motion"; // Needed for animation
import { Link } from "react-router-dom"; // Needed for linking to detail page
import PropTypes from "prop-types"; // Needed for prop validation
import {
  FiMapPin, // Location
  FiUser, // Beds icon placeholder
  FiDroplet, // Baths icon placeholder
  FiMaximize2, // Area icon
  FiKey, // Rent-to-buy icon
  FiArrowRight, // Link icon
} from "react-icons/fi";

// --- Required Dependencies (Need to be defined or imported) ---

// 1. Theme Colors (Ideally imported from a central theme file/context)
// Example structure if defined here temporarily:
const colors = {
  surface: "bg-white",
  primary: "text-emerald-700",
  secondary: "text-slate-600",
  textDark: "text-slate-800",
  borderLight: "border-slate-200",
  tagSaleBg: "bg-blue-100",
  tagSaleText: "text-blue-800",
  tagRentBg: "bg-purple-100",
  tagRentText: "text-purple-800",
  tagRentToBuyBg: "bg-yellow-100",
  tagRentToBuyText: "text-yellow-800",
  // Add other colors if needed
};

// 2. Animation Variant (Ideally imported from a central animations file)
// Example structure if defined here temporarily:
const cardVariant = {
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

// 3. Format Currency Helper (Ideally move to a shared utils file)
// Example if defined here temporarily:
function formatCurrency(value, currency = "CRC") {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(value);
}

// --- Refined Property Card Component Definition ---
const PropertyCard = ({ property }) => {
  // Determine tag style based on type and rent-to-buy option
  let tagBg = colors.tagSaleBg;
  let tagText = colors.tagSaleText;
  let typeText = property.type; // Venta or Alquiler

  if (property.isRentToBuy) {
    tagBg = colors.tagRentToBuyBg;
    tagText = colors.tagRentToBuyText;
    typeText = "Alquiler con Opción"; // Specific text for this type
  } else if (property.type === "Alquiler") {
    tagBg = colors.tagRentBg;
    tagText = colors.tagRentText;
  }

  return (
    // Card container with animation and hover effects
    <motion.div
      layout // Animate layout changes smoothly (important for filtering)
      variants={cardVariant} // Apply enter/exit animations via AnimatePresence in parent
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -4, scale: 1.02 }} // Subtle lift and scale on hover
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`${colors.surface} rounded-lg shadow-md border ${colors.borderLight} overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-lg hover:border-emerald-300`} // Base styles and hover effect
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={property.image}
          alt={`Foto de ${property.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" // Image zoom on hover
          loading="lazy"
        />
        {/* Status Tag (Sale/Rent/Rent-to-Buy) */}
        <span
          className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-semibold ${tagBg} ${tagText} flex items-center gap-1 shadow-sm`}
        >
          {property.isRentToBuy && <FiKey className="w-3 h-3" />}{" "}
          {/* Specific Icon for Rent-to-Buy */}
          {typeText}{" "}
          {property.status !== "Disponible" ? `(${property.status})` : ""}{" "}
          {/* Show status if not 'Disponible' */}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3
          className={`text-base sm:text-lg font-semibold ${colors.textDark} mb-1 group-hover:${colors.primary} transition-colors truncate`} // Truncate long titles
          title={property.title} // Show full title on hover
        >
          {property.title}
        </h3>
        {/* Location */}
        <p
          className={`text-xs sm:text-sm ${colors.secondary} flex items-center mb-3`}
        >
          <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 flex-shrink-0" />
          {property.location}
        </p>
        {/* Price */}
        <p className={`text-lg sm:text-xl font-bold ${colors.primary} mb-3`}>
          {formatCurrency(property.price, property.currency)}{" "}
          {property.type === "Alquiler" ? "/ mes" : ""}{" "}
          {/* Add '/ mes' for rentals */}
        </p>

        {/* Details Section (Beds, Baths, Area) - Rendered only if data exists */}
        {(property.beds || property.baths || property.area) && (
          <div
            // Uses flex-wrap for smaller screens, mt-auto pushes to bottom if content above is short
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

        {/* Link to Detail Page */}
        <Link
          // Placeholder link - replace with actual detail page route
          to={`/anaco/property/${property.id}`}
          className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-800 self-start group-hover:underline" // Aligns link to the start
        >
          Ver Detalles{" "}
          <FiArrowRight className="inline ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />{" "}
          {/* Icon animation on hover */}
        </Link>
      </div>
    </motion.div>
  );
};

// --- PropTypes for PropertyCard ---
PropertyCard.propTypes = {
  /** The property object containing all details */
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["Venta", "Alquiler"]).isRequired, // Sale or Rent
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    propertyType: PropTypes.string.isRequired, // e.g., Casa, Apartamento, Lote
    beds: PropTypes.number, // Optional number
    baths: PropTypes.number, // Optional number
    area: PropTypes.number, // Optional number
    image: PropTypes.string.isRequired, // Path to image
    status: PropTypes.string, // e.g., Disponible, Vendido, Alquilado
    isRentToBuy: PropTypes.bool, // Flag for rent-to-buy option
  }).isRequired,
};

// --- Export (if in its own file) ---
// export default PropertyCard;
