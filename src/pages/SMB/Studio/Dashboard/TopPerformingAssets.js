// src/pages/SMB/Studio/Dashboard/TopPerformingAssets.js (or similar path)
import React, { useState, useEffect, useMemo } from "react";
import {
  FiBarChart2,
  FiFilter,
  FiChevronDown,
  FiBatteryCharging,
  FiSun,
  FiZap,
  FiLoader,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import loyalShiftV2Theme from "../../../../themes/loyalshift-v2.theme";
import { useLocalization } from "../../../../components/LocalizationContext";

const theme = loyalShiftV2Theme;

const assetItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const AssetTypeIcon = ({ familyType, className = "" }) => {
  const baseClasses = `w-5 h-5 ${className}`;
  if (familyType === "battery")
    return <FiBatteryCharging className={baseClasses} />;
  if (familyType === "panel") return <FiSun className={baseClasses} />;
  if (familyType === "inverter") return <FiZap className={baseClasses} />;
  return <FiBarChart2 className={baseClasses} />; // Default icon
};

const AssetPerformanceItem = ({ asset, rank }) => {
  const { t } = useLocalization();
  return (
    <motion.li
      variants={assetItemVariants}
      layout
      className={`flex items-center justify-between p-2.5 rounded-md ${theme.surfaceMuted} dark:bg-slate-700/50 border ${theme.borderLight} dark:border-slate-600 mb-2 group`}
    >
      <div className="flex items-center">
        <span
          className={`text-xs font-semibold ${theme.textMuted} dark:text-slate-400 w-6 mr-2 text-center`}
        >
          {rank}.
        </span>
        <AssetTypeIcon
          familyType={asset.family_type}
          className={`${theme.textHighlight} dark:text-cyan-400 mr-2`}
        />
        <div className="flex-1">
          <p
            className={`text-sm font-medium ${theme.textPrimary} dark:text-slate-100 truncate group-hover:${theme.textHighlight} dark:group-hover:text-cyan-300 transition-colors`}
          >
            {t(asset.nameKey, asset.defaultName)}
          </p>
          <p className={`text-xs ${theme.textMuted} dark:text-slate-500`}>
            ID: {asset.id}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-sm font-semibold ${theme.successText} dark:text-green-400`}
        >
          {asset.performanceMetric.toFixed(1)}%
        </p>
        <p className={`text-xs ${theme.textMuted} dark:text-slate-500`}>
          {t("dashboard.assets.efficiency", "Efficiency")}
        </p>
      </div>
    </motion.li>
  );
};

export default function TopPerformingAssets() {
  const { t } = useLocalization();
  const [allAssets, setAllAssets] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState("all"); // 'all', 'battery', 'panel', 'inverter'
  const [isLoading, setIsLoading] = useState(true);

  const assetFamilies = [
    {
      value: "all",
      labelKey: "dashboard.assets.filterAll",
      defaultLabel: "All Assets",
    },
    {
      value: "battery",
      labelKey: "dashboard.assets.filterBattery",
      defaultLabel: "Batteries",
    },
    {
      value: "panel",
      labelKey: "dashboard.assets.filterPanel",
      defaultLabel: "Solar Panels",
    },
    {
      value: "inverter",
      labelKey: "dashboard.assets.filterInverter",
      defaultLabel: "Inverters",
    },
  ];

  // Mock data fetching
  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1400)); // Simulate API call
      const mockData = [
        {
          id: "BAT001",
          nameKey: "dashboard.assets.batteryAlpha",
          defaultName: "AlphaBattery Pro",
          family_type: "battery",
          performanceMetric: 98.5,
        },
        {
          id: "PNL007",
          nameKey: "dashboard.assets.panelPhotonMax",
          defaultName: "PhotonMax Solar",
          family_type: "panel",
          performanceMetric: 92.1,
        },
        {
          id: "INV003",
          nameKey: "dashboard.assets.inverterGridwise",
          defaultName: "GridWise Inverter",
          family_type: "inverter",
          performanceMetric: 97.3,
        },
        {
          id: "BAT002",
          nameKey: "dashboard.assets.batteryPowerCore",
          defaultName: "PowerCore Storage",
          family_type: "battery",
          performanceMetric: 96.2,
        },
        {
          id: "PNL015",
          nameKey: "dashboard.assets.panelSunbeam",
          defaultName: "Sunbeam Array",
          family_type: "panel",
          performanceMetric: 95.0,
        },
        {
          id: "INV005",
          nameKey: "dashboard.assets.inverterVoltMaster",
          defaultName: "VoltMaster 5000",
          family_type: "inverter",
          performanceMetric: 99.1,
        },
        {
          id: "BAT004",
          nameKey: "dashboard.assets.batteryEnerStore",
          defaultName: "EnerStore Unit",
          family_type: "battery",
          performanceMetric: 93.8,
        },
        {
          id: "PNL003",
          nameKey: "dashboard.assets.panelSolarFlare",
          defaultName: "SolarFlare X",
          family_type: "panel",
          performanceMetric: 90.5,
        },
        {
          id: "INV001",
          nameKey: "dashboard.assets.inverterPureSine",
          defaultName: "PureSine Wave",
          family_type: "inverter",
          performanceMetric: 96.8,
        },
        {
          id: "BAT008",
          nameKey: "dashboard.assets.batteryOmegaCell",
          defaultName: "OmegaCell Max",
          family_type: "battery",
          performanceMetric: 99.3,
        },
      ];
      setAllAssets(mockData);
      setIsLoading(false);
    };
    fetchAssets();
  }, []);

  const topAssets = useMemo(() => {
    const filtered =
      selectedFamily === "all"
        ? allAssets
        : allAssets.filter((asset) => asset.family_type === selectedFamily);

    return filtered
      .sort((a, b) => b.performanceMetric - a.performanceMetric)
      .slice(0, 5);
  }, [allAssets, selectedFamily]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10">
        <FiLoader
          className={`w-8 h-8 ${theme.textHighlight} dark:text-cyan-400 animate-spin mb-2`}
        />
        <p className={`${theme.textMuted} dark:text-slate-400 text-sm`}>
          {t("dashboard.loading", "Loading data...")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex items-center gap-2">
        <FiFilter
          className={`w-4 h-4 ${theme.textMuted} dark:text-slate-400 flex-shrink-0`}
        />
        <select
          value={selectedFamily}
          onChange={(e) => setSelectedFamily(e.target.value)}
          className={`flex-grow text-xs sm:text-sm ${theme.inputBg} dark:bg-slate-700 ${theme.inputBorder} dark:border-slate-600 rounded-md shadow-sm py-1.5 px-2 ${theme.inputFocusStyle} dark:ring-offset-slate-800 ${theme.textPrimary} dark:text-slate-100 appearance-none pr-7`} // Added appearance-none and pr-7
        >
          {assetFamilies.map((family) => (
            <option key={family.value} value={family.value}>
              {t(family.labelKey, family.defaultLabel)}
            </option>
          ))}
        </select>
        <FiChevronDown
          className={`w-4 h-4 ${theme.textMuted} dark:text-slate-400 pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 hidden sm:block`}
        />{" "}
        {/* This icon positioning might need a relative parent on the select wrapper if not using a custom select component */}
      </div>

      {topAssets.length === 0 ? (
        <p
          className={`text-center text-sm ${theme.textMuted} dark:text-slate-400 py-8`}
        >
          {t(
            "dashboard.assets.noAssetsFound",
            "No assets found for this filter."
          )}
        </p>
      ) : (
        <motion.ul
          layout
          className="overflow-y-auto max-h-[300px] pr-1 custom-scrollbar-thin"
        >
          {" "}
          {/* Added max-h and scrollbar */}
          <AnimatePresence>
            {topAssets.map((asset, index) => (
              <AssetPerformanceItem
                key={asset.id}
                asset={asset}
                rank={index + 1}
              />
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
      <Link
        to="/smb/studio/assets-performance"
        className={`block w-full mt-auto pt-3 text-xs sm:text-sm font-medium text-center ${theme.linkStyle} dark:hover:text-cyan-300`}
      >
        {t(
          "dashboard.assets.viewAllAssetPerformance",
          "View all asset performance"
        )}{" "}
        →
      </Link>
    </div>
  );
}
