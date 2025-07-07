import { useLocalization } from "./LocalizationContext";

const logoPaths = {
  text: "/images/loyalshift-logo-text.svg",
  icon: "/images/loyalshift-logo-without-text.svg",
  full: "/images/loyalshift-logo.svg",
};

export const LoyalShiftLogo = ({ type = "full", className = "h-8 w-auto" }) => {
  const { t } = useLocalization();

  return (
    <img
      src={logoPaths[type]}
      alt={t("loyalShiftSMBFooter.logoAlt", "LoyalShift Logo")}
      className={className}
    />
  );
};
