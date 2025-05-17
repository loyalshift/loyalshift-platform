// src/pages/Studio/StudioClientDashboardPage.js
// Placeholder page for a specific client's dashboard within the Studio.
// Uses a neutral dark theme.
// Current time: Friday, May 16, 2025 at 2:05 PM CST.

import React from "react";
import { useParams, useOutletContext } from "react-router-dom"; // Import useOutletContext
import { motion } from "framer-motion";
import { FiGrid, FiBarChart2, FiUsers, FiSettings } from "react-icons/fi";
import { createStaggerContainer } from "../../utils/animationVariants";

// Neutral Dark Theme Colors (consistent with StudioLayout)
const colors = {
  mainContentBg: "bg-slate-950",
  surface: "bg-slate-900", // Slightly different from main for cards
  border: "border-slate-700",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  accentBlue: "text-blue-400",
  iconColor: "text-blue-500", // A slightly brighter blue for dashboard icons
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = createStaggerContainer;

const StatCard = ({ title, value, icon: Icon, color = colors.iconColor }) => (
  <motion.div
    variants={fadeInUp}
    className={`p-6 rounded-lg ${colors.surface} border ${colors.border} shadow-lg flex flex-col items-center text-center`}
  >
    <Icon className={`w-10 h-10 mb-3 ${color}`} />
    <p className={`text-3xl font-bold ${colors.textPrimary}`}>{value}</p>
    <p className={`text-sm ${colors.textSecondary}`}>{title}</p>
  </motion.div>
);
StatCard.propTypes = {
  /* ... */
};

export default function StudioClientDashboardPage() {
  // const { clientId } = useParams(); // Get clientId from URL
  // Or, if passed via Outlet context from StudioLayout.js:
  const { clientId } = useOutletContext() || {}; // Use context, provide default if not found

  // Mock data - replace with actual data fetching based on clientId
  const clientDisplayName = clientId
    ? clientId.charAt(0).toUpperCase() + clientId.slice(1)
    : "Client";

  return (
    <motion.div
      className={`p-6 md:p-8 h-full ${colors.mainContentBg}`} // Ensure it fills height if StudioLayout allows
      initial="hidden"
      animate="visible"
      variants={staggerContainer()}
    >
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className={`text-3xl font-bold ${colors.textPrimary}`}>
          Dashboard:{" "}
          <span className={colors.accentBlue}>{clientDisplayName}</span>
        </h1>
        <p className={`${colors.textSecondary} mt-1`}>
          Welcome to your LoyalShift Studio dashboard.
        </p>
      </motion.div>

      {/* Placeholder for Dashboard Widgets/Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={staggerContainer(0.15)} // Slightly different stagger for cards
      >
        <StatCard
          title="Active Projects"
          value="3"
          icon={FiGrid}
          color="text-green-400"
        />
        <StatCard
          title="Content Items"
          value="127"
          icon={FiBarChart2}
          color="text-yellow-400"
        />
        <StatCard
          title="Team Members"
          value="5"
          icon={FiUsers}
          color="text-purple-400"
        />
        <StatCard
          title="Pending Actions"
          value="2"
          icon={FiSettings}
          color="text-red-400"
        />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className={`p-10 rounded-lg ${colors.surface} border ${colors.border} text-center`}
      >
        <FiBarChart2
          className={`w-16 h-16 ${colors.textSecondary} opacity-50 mx-auto mb-4`}
        />
        <h2 className={`text-xl font-semibold ${colors.textPrimary} mb-2`}>
          Detailed Analytics Coming Soon
        </h2>
        <p className={`${colors.textSecondary} max-w-md mx-auto`}>
          This area will display key performance indicators, content engagement,
          and other relevant metrics for {clientDisplayName}.
        </p>
      </motion.div>
    </motion.div>
  );
}
