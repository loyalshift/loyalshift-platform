import React from "react";
import { FiSearch, FiShare2, FiHelpCircle, FiBell } from "react-icons/fi";
import {
  mockCustomersData,
  mockFollowupsData,
} from "../../../data/dashboard/mocks";

// Define structure for different modules
const modules = {
  Customers: {
    data: mockCustomersData,
    columns: [
      { id: "recordId", name: "Record ID", type: "Text", hidden: true }, // Internal ID
      { id: "Full Name", name: "Full Name", type: "Text", width: 200 },
      { id: "Email", name: "Email", type: "Text", width: 220 },
      { id: "Phone Number", name: "Phone Number", type: "Text", width: 130 },
      {
        id: "Status",
        name: "Status",
        type: "SingleSelect",
        options: ["Lead", "Active Customer", "Churned"],
        width: 150,
      },
      { id: "Assigned To", name: "Assigned To", type: "User", width: 150 },
      {
        id: "Last Contact Date",
        name: "Last Contact",
        type: "Date",
        width: 120,
      },
      {
        id: "Next Follow-up Date",
        name: "Next Follow-up",
        type: "Date",
        width: 120,
      },
      {
        id: "Engagement Score",
        name: "Engagement",
        type: "Number",
        width: 100,
      },
      { id: "Notes", name: "Notes", type: "Text", width: 300 },
      { id: "Date Created", name: "Created", type: "Timestamp", width: 150 },
    ],
  },
  "Follow-ups": {
    data: mockFollowupsData,
    columns: [
      { id: "recordId", name: "Record ID", type: "Text", hidden: true },
      {
        id: "Customer",
        name: "Customer",
        type: "RelationalLink",
        linkTo: "Customers",
        width: 200,
      }, // Link to Customer record
      { id: "Follow-up Date", name: "Date", type: "Date", width: 120 },
      { id: "Follow-up Time", name: "Time", type: "Text", width: 80 }, // Simple text for time
      {
        id: "Follow-up Type",
        name: "Type",
        type: "SingleSelect",
        options: ["Call", "Email", "SMS", "In Person", "Meeting"],
        width: 120,
      },
      { id: "Assigned To", name: "Assigned To", type: "User", width: 150 },
      {
        id: "Outcome",
        name: "Outcome",
        type: "SingleSelect",
        options: [
          "Completed",
          "No Response",
          "Rescheduled",
          "Needs Further Action",
          "Pending",
          "Scheduled",
        ],
        width: 150,
      },
      { id: "Notes", name: "Notes", type: "Text", width: 300 },
      { id: "Date Created", name: "Created", type: "Timestamp", width: 150 },
    ],
  },
  // Define other modules like Loans, Repayments similarly
};

// --- Theme Colors (Neutral Dark) ---
const colors = {
  background: "bg-gray-950",
  surface: "bg-gray-900", // Main surface
  surfaceMuted: "bg-gray-800", // Slightly lighter for headers/footers/cells
  border: "border-gray-700",
  borderStrong: "border-gray-600",
  textPrimary: "text-gray-100",
  textSecondary: "text-gray-400",
  textMuted: "text-gray-500",
  accent: "text-indigo-400", // Accent color
  accentBg: "bg-indigo-500",
  accentBgHover: "hover:bg-indigo-600",
  tagBg: "bg-gray-700",
  tagText: "text-gray-300",
  inputBg: "bg-gray-800",
  inputBorder: "border-gray-600",
  inputFocusBorder: "focus:border-indigo-500",
  inputFocusRing: "focus:ring-indigo-500/50",
  success: "text-green-400",
  // Add more as needed
};

const DashboardNavBar = () => (
  <div
    className={`flex items-center justify-between p-3 border-b ${colors.border} ${colors.surface}`}
  >
    {/* Left: Logo & Module Tabs */}
    <div className="flex items-center gap-6">
      <div className={`font-bold ${colors.textPrimary}`}>AgentHub</div>
      <div className="flex gap-4">
        {Object.keys(modules).map((mod) => (
          <button
            key={mod}
            className={`text-sm pb-3 border-b-2 ${colors.textSecondary} hover:${colors.textPrimary} border-transparent hover:border-indigo-400`}
          >
            {mod}
          </button>
        ))}
        <button className={`text-sm pb-3 ${colors.textMuted}`}>
          + Add Module
        </button>
      </div>
    </div>
    {/* Center: Search */}
    <div className="flex-1 max-w-xs">
      <div className="relative">
        <FiSearch
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${colors.textMuted}`}
        />
        <input
          type="search"
          placeholder="Search..."
          className={`w-full pl-9 pr-3 py-1.5 text-sm ${colors.inputBg} ${colors.textPrimary} rounded-md border ${colors.inputBorder} ${colors.inputFocusRing} ${colors.inputFocusBorder} placeholder:${colors.textMuted}`}
        />
      </div>
    </div>
    {/* Right: Actions & User */}
    <div className="flex items-center gap-4">
      <button
        className={`p-1.5 rounded hover:bg-gray-700 ${colors.textSecondary}`}
        title="Share"
      >
        <FiShare2 className="w-4 h-4" />
      </button>
      <button
        className={`p-1.5 rounded hover:bg-gray-700 ${colors.textSecondary}`}
        title="Help"
      >
        <FiHelpCircle className="w-4 h-4" />
      </button>
      <button
        className={`p-1.5 rounded hover:bg-gray-700 ${colors.textSecondary}`}
        title="Notifications"
      >
        <FiBell className="w-4 h-4" />
      </button>
      <button
        className={`w-6 h-6 rounded-full bg-indigo-500 ${colors.textWhite} text-xs font-medium flex items-center justify-center`}
        title="User Account"
      >
        DS
      </button>
    </div>
  </div>
);

export default DashboardNavBar;
