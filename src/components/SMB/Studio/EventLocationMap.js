// src/components/smb/studio/events/EventLocationMap.js (Example Path)
import React from "react";
import { motion } from "framer-motion";


// --- Icons ---
import { FiMapPin } from "react-icons/fi";
import { FaWaze, FaGoogle } from "react-icons/fa";
import Button from "../../Button";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";
import { useLocalization } from "../../LocalizationContext";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// This SectionCard is a local version for this component.
// If you have a shared SectionCard, you can import and use that instead.
const SectionCard = ({
  t,
  titleKey,
  defaultTitle,
  icon,
  children,
  className = "",
}) => {
  const IconComponent = icon;
  return (
    <motion.div
      variants={fadeInUp}
      className={`${theme.surfaceCard} ${className} rounded-xl border ${theme.border} ${theme.cardShadow} overflow-hidden`}
    >
      <div className={`flex items-center p-6 pb-0`}>
        <IconComponent className={`w-6 h-6 mr-3 ${theme.textHighlight}`} />
        <h2 className={`text-xl font-bold ${theme.textPrimary}`}>
          {t(titleKey, defaultTitle)}
        </h2>
      </div>
      <div className={`${theme.textSecondary} text-sm`}>{children}</div>
    </motion.div>
  );
};

export default function EventLocationMap({ location }) {
  const { t } = useLocalization();

  // Guard against missing location data
  if (!location) {
    return null;
  }

  return (
    <SectionCard
      t={t}
      titleKey="smbPublicEvent.locationTitle"
      defaultTitle="Event Location"
      icon={FiMapPin}
    >
      {/* Address Text */}
      <div className="px-6 pt-4 pb-6">
        <p className={`${theme.textSecondary} text-base`}>
          {t(location.addressLine1Key, "Address Line 1 Placeholder")}
          <br />
          {t(location.addressLine2Key, "Address Line 2 Placeholder")}
        </p>
      </div>

      {/* Map Iframe Container */}
      <motion.div
        className={`border-y ${theme.borderLight} h-80 md:h-96 relative group`}
      >
        <iframe
          title={t("smbPublicEvent.locationTitle", "Event Location")}
          width="100%"
          height="100%"
          loading="lazy"
          src={location.mapEmbedUrl}
          style={{ border: 0 }}
          className="absolute inset-0 filter grayscale contrast-125 group-hover:filter-none transition-all duration-300"
        ></iframe>
      </motion.div>

      {/* NEW: Button Container - Placed outside/below the map */}
      <div
        className={`p-4 ${theme.surfaceMuted} flex justify-end items-center gap-3`}
      >
        <Button
          href={location.googleMapsUrl}
          isExternal={true}
          size="sm"
          className={`${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} border ${theme.buttonSecondaryBorder} hover:${theme.buttonSecondaryHoverBorder}`}
        >
          <FaGoogle className="w-4 h-4 mr-2 text-[#4285F4]" />
          {t("smbPublicEvent.mapGoogle", "Google Maps")}
        </Button>
        <Button
          href={location.wazeUrl}
          isExternal={true}
          size="sm"
          className={`${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} border ${theme.buttonSecondaryBorder} hover:${theme.buttonSecondaryHoverBorder}`}
        >
          <FaWaze className="w-5 h-5 mr-1.5 text-[#33ccff]" />
          {t("smbPublicEvent.mapWaze", "Waze")}
        </Button>
      </div>
    </SectionCard>
  );
}
