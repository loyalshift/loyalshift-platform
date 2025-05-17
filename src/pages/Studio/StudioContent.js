// src/pages/Studio/StudioClientContentManagerPage.js
// Placeholder page for managing a specific client's content within the Studio.
// Uses a neutral dark theme.
// Current time: Friday, May 16, 2025 at 2:05 PM CST.

import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFileText, FiPlusCircle, FiSearch, FiFilter } from "react-icons/fi";

// Neutral Dark Theme Colors
const colors = {
  mainContentBg: "bg-slate-950",
  surface: "bg-slate-900",
  border: "border-slate-700",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-400",
  accentBlue: "text-blue-400",
  buttonPrimaryBg: "bg-blue-600",
  buttonPrimaryHover: "hover:bg-blue-500",
  buttonText: "text-white",
  inputBg: "bg-slate-800",
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Mock content item
const ContentItemRow = ({ title, type, status, lastModified }) => (
  <motion.tr
    variants={fadeInUp}
    className={`hover:bg-slate-800/50 transition-colors`}
  >
    <td className={`px-4 py-3 text-sm ${colors.textPrimary}`}>{title}</td>
    <td className={`px-4 py-3 text-sm ${colors.textSecondary}`}>{type}</td>
    <td className={`px-4 py-3 text-sm`}>
      <span
        className={`px-2 py-0.5 text-xs rounded-full ${
          status === "Published"
            ? "bg-green-500/20 text-green-400"
            : "bg-yellow-500/20 text-yellow-400"
        }`}
      >
        {status}
      </span>
    </td>
    <td className={`px-4 py-3 text-sm ${colors.textSecondary}`}>
      {lastModified}
    </td>
    <td className={`px-4 py-3 text-sm text-right`}>
      <button className={`${colors.accentBlue} hover:text-blue-300 text-xs`}>
        Edit
      </button>
    </td>
  </motion.tr>
);
ContentItemRow.propTypes = {
  /* ... */
};

export default function StudioClientContentManagerPage() {
  const { clientId } = useOutletContext() || {};
  const clientDisplayName = clientId
    ? clientId.charAt(0).toUpperCase() + clientId.slice(1)
    : "Client";

  const mockContent = [
    {
      id: "1",
      title: "Introductory Video Script",
      type: "Video Script",
      status: "Published",
      lastModified: "2025-05-15",
    },
    {
      id: "2",
      title: "Product Feature Guide (PDF)",
      type: "Document",
      status: "Draft",
      lastModified: "2025-05-12",
    },
    {
      id: "3",
      title: "Client Testimonial Audio",
      type: "Audio",
      status: "Published",
      lastModified: "2025-05-10",
    },
  ];

  return (
    <motion.div
      className={`p-6 md:p-8 h-full ${colors.mainContentBg}`}
      initial="hidden"
      animate="visible"
      variants={staggerContainer()}
    >
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
      >
        <div>
          <h1 className={`text-3xl font-bold ${colors.textPrimary}`}>
            Content Manager:{" "}
            <span className={colors.accentBlue}>{clientDisplayName}</span>
          </h1>
          <p className={`${colors.textSecondary} mt-1`}>
            Manage and organize all content assets for this client.
          </p>
        </div>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                            ${colors.buttonPrimaryBg} ${colors.buttonText} ${colors.buttonPrimaryHover}
                            shadow-md hover:shadow-lg transition-all duration-200 ease-out`}
        >
          <FiPlusCircle className="w-4 h-4" /> Add New Content
        </button>
      </motion.div>

      {/* Filters and Search Bar */}
      <motion.div
        variants={fadeInUp}
        className={`mb-6 p-4 rounded-lg ${colors.surface} border ${colors.border}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="relative md:col-span-2">
            <FiSearch
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${colors.textMuted}`}
            />
            <input
              type="search"
              placeholder={`Search content for ${clientDisplayName}...`}
              className={`w-full pl-10 pr-3 py-2 text-sm ${colors.inputBg} ${colors.textPrimary} rounded-md border ${colors.borderLight} focus:ring-1 focus:ring-offset-0 focus:${colors.accentBlue} placeholder:${colors.textSecondary}`}
            />
          </div>
          <button
            className={`flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md border ${colors.borderLight} ${colors.textSecondary} hover:bg-slate-700 hover:${colors.textPrimary} transition-colors`}
          >
            <FiFilter className="w-4 h-4" /> Filters
          </button>
        </div>
      </motion.div>

      {/* Content Table/List */}
      <motion.div
        variants={fadeInUp}
        className={`overflow-x-auto rounded-lg ${colors.surface} border ${colors.border}`}
      >
        <table className="min-w-full divide-y ${colors.borderLight}">
          <thead className={`${colors.surfaceMuted} bg-opacity-50`}>
            <tr>
              <th
                scope="col"
                className={`px-4 py-3 text-left text-xs font-medium ${colors.textSecondary} uppercase tracking-wider`}
              >
                Title
              </th>
              <th
                scope="col"
                className={`px-4 py-3 text-left text-xs font-medium ${colors.textSecondary} uppercase tracking-wider`}
              >
                Type
              </th>
              <th
                scope="col"
                className={`px-4 py-3 text-left text-xs font-medium ${colors.textSecondary} uppercase tracking-wider`}
              >
                Status
              </th>
              <th
                scope="col"
                className={`px-4 py-3 text-left text-xs font-medium ${colors.textSecondary} uppercase tracking-wider`}
              >
                Last Modified
              </th>
              <th scope="col" className="relative px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y ${colors.borderLight}">
            {mockContent.map((item) => (
              <ContentItemRow key={item.id} {...item} />
            ))}
            {mockContent.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className={`px-4 py-10 text-center text-sm ${colors.textSecondary}`}
                >
                  No content items found for {clientDisplayName}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
