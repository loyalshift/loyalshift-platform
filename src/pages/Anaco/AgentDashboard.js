// src/pages/Anaco/AgentDashboard.js
// Basic dashboard for agents to track submitted pre-approval requests.
// Uses Green/White/Grey Theme, Spanish Language. Assumes logged-in state.
// Current time: Friday, May 2, 2025 at 2:41 PM CST. San José, Costa Rica.

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiFileText, FiPlusCircle, FiList, FiInfo } from "react-icons/fi";

// Reusable Components (Ensure paths are correct)
import Button from "../../components/Button";

// Green/White/Grey Color Theme (Assuming consistency)
const colors = {
  background: "bg-slate-100",
  surface: "bg-white",
  primary: "text-emerald-700",
  primaryBg: "bg-emerald-600",
  primaryBgHover: "hover:bg-emerald-700",
  secondary: "text-slate-500",
  textDark: "text-slate-800",
  textLight: "text-white",
  border: "border-slate-300",
  // Status Colors (Examples - Adjust as needed)
  statusRecibidoBg: "bg-blue-100",
  statusRecibidoText: "text-blue-800",
  statusEnProcesoBg: "bg-yellow-100",
  statusEnProcesoText: "text-yellow-800",
  statusAprobadoBg: "bg-green-100",
  statusAprobadoText: "text-green-800",
  statusRechazadoBg: "bg-red-100",
  statusRechazadoText: "text-red-800",
  statusInfoRequeridaBg: "bg-purple-100",
  statusInfoRequeridaText: "text-purple-800",
};

// Simple Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.07 } },
};

// Mock Data for Submissions (Replace with API call later)
const mockSubmissions = [
  {
    id: "S001",
    clientName: "Juan Carlos Pérez Rodríguez",
    submissionDate: "2025-05-01",
    status: "En Proceso",
  },
  {
    id: "S002",
    clientName: "María Fernanda Rojas Vargas",
    submissionDate: "2025-04-28",
    status: "Aprobado",
  },
  {
    id: "S003",
    clientName: "Andrés Zamora Solano",
    submissionDate: "2025-04-22",
    status: "Info Requerida",
  },
  {
    id: "S004",
    clientName: "Sofía Jiménez Castro",
    submissionDate: "2025-04-15",
    status: "Recibido",
  },
  {
    id: "S005",
    clientName: "Luis Diego Méndez Arroyo",
    submissionDate: "2025-04-10",
    status: "Rechazado",
  },
];

// --- Helper Component for Status Badges ---
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Recibido: `${colors.statusRecibidoBg} ${colors.statusRecibidoText}`,
    "En Proceso": `${colors.statusEnProcesoBg} ${colors.statusEnProcesoText}`,
    Aprobado: `${colors.statusAprobadoBg} ${colors.statusAprobadoText}`,
    Rechazado: `${colors.statusRechazadoBg} ${colors.statusRechazadoText}`,
    "Info Requerida": `${colors.statusInfoRequeridaBg} ${colors.statusInfoRequeridaText}`,
    default: `bg-slate-100 text-slate-800`,
  };

  const style = statusStyles[status] || statusStyles.default;

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}
    >
      {status}
    </span>
  );
};
StatusBadge.propTypes = {
  // Add PropTypes validation if needed
};

// --- Main Agent Dashboard Component ---
export default function AgentDashboard() {
  // In a real app, fetch submissions associated with the logged-in agent
  const [submissions, setSubmissions] = useState(mockSubmissions);

  // Get current timestamp string
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    // Assume AnacoLayout provides header/footer
    <div className={`min-h-screen ${colors.background} py-12 md:py-16 px-4`}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 md:mb-12 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <FiList className={`w-8 h-8 ${colors.primary}`} />
              <h1 className={`text-3xl font-bold ${colors.textDark}`}>
                Mis Solicitudes de Pre-Aprobación
              </h1>
            </div>
            <Button
              to="/anaco/request-pre-approval" // Link to start a new request
              variant="primary"
              size="lg"
              icon={<FiPlusCircle />}
              className={`${colors.primaryBg} ${colors.primaryBgHover} ${colors.textLight} w-full sm:w-auto`}
            >
              Nueva Solicitud
            </Button>
          </motion.div>

          {/* Submissions Table/List */}
          <motion.div
            variants={fadeInUp}
            className={`${colors.surface} rounded-xl shadow-md border ${colors.border} overflow-hidden`}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className={`${colors.background}`}>
                  <tr>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${colors.secondary} uppercase tracking-wider`}
                    >
                      Nombre Cliente
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${colors.secondary} uppercase tracking-wider`}
                    >
                      Fecha Envío
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${colors.secondary} uppercase tracking-wider`}
                    >
                      Estado Actual
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`${colors.surface} divide-y divide-slate-200`}
                >
                  {submissions.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-12 text-center text-slate-500"
                      >
                        No hay solicitudes enviadas todavía.
                      </td>
                    </tr>
                  )}
                  {submissions.map((sub) => (
                    <motion.tr key={sub.id} variants={fadeInUp}>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${colors.textDark}`}
                      >
                        {sub.clientName}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${colors.secondary}`}
                      >
                        {new Date(
                          sub.submissionDate + "T00:00:00"
                        ).toLocaleDateString("es-CR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <StatusBadge status={sub.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* Placeholder for future actions like 'View Details' */}
                        {/* <Link to={`/anaco/submission/${sub.id}`} className={`${colors.primary} hover:underline`}>
                          Ver
                        </Link> */}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
