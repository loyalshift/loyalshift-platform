// src/pages/Financial/AgentDashboard.js
// Refined Agent Dashboard page content (NavBar is now separate).
// Uses a neutral dark theme and mock data.
// Current time: Thursday, May 8, 2025 at 12:45 PM CST.

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiCheckSquare,
  FiFilter,
  FiArrowDown,
  FiArrowUp,
  FiPlus,
  FiGrid,
  FiColumns,
  FiMoreHorizontal,
  FiChevronDown,
} from "react-icons/fi";
import { Link } from "react-router-dom";
// --- Mock Data & Modules (Import from central data file) ---
import {
  mockCustomersData,
  mockFollowupsData,
  mockUsers,
} from "../../data/dashboard/mocks"; // Adjust path
import { formatCurrency } from "../../utils/formatCurrency";

// Define structure for different modules (needed for columns/data)
const modules = {
  Customers: {
    icon: FiUsers,
    data: mockCustomersData,
    columns: [
      { id: "recordId", name: "Record ID", type: "Text", hidden: true },
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
    icon: FiCheckSquare,
    data: mockFollowupsData,
    columns: [
      { id: "recordId", name: "Record ID", type: "Text", hidden: true },
      {
        id: "Customer",
        name: "Customer",
        type: "RelationalLink",
        linkTo: "Customers",
        width: 200,
      },
      { id: "Follow-up Date", name: "Date", type: "Date", width: 120 },
      { id: "Follow-up Time", name: "Time", type: "Text", width: 80 },
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
  // Define other modules
};

// --- Theme Colors (Neutral Dark) ---
const colors = {
  // Keep the same color definitions as before
  background: "bg-gray-950",
  surface: "bg-gray-900",
  surfaceMuted: "bg-gray-800",
  border: "border-gray-700",
  borderStrong: "border-gray-600",
  textPrimary: "text-gray-100",
  textSecondary: "text-gray-400",
  textMuted: "text-gray-500",
  accent: "text-indigo-400",
  accentHover: "text-indigo-300",
  accentBg: "bg-indigo-500",
  accentBgHover: "hover:bg-indigo-600",
  tagLeadBg: "bg-yellow-800/40",
  tagLeadText: "text-yellow-300",
  tagActiveBg: "bg-green-800/40",
  tagActiveText: "text-green-300",
  tagChurnedBg: "bg-red-800/40",
  tagChurnedText: "text-red-300",
  tagDefaultBg: "bg-gray-700",
  tagDefaultText: "text-gray-300",
  inputBg: "bg-gray-800",
  inputBorder: "border-gray-600",
  inputFocusBorder: "focus:border-indigo-500",
  inputFocusRing: "focus:ring-indigo-500/50",
  success: "text-green-400",
  rowHoverBg: "hover:bg-slate-800/50",
  buttonHoverBg: "hover:bg-gray-700",
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// View Management Bar Component
const ViewManagementBar = ({
  currentViewName = "All Records",
  onFilterClick,
  onSortClick,
  onGroupClick,
  onHideFieldsClick,
}) => (
  <div
    className={`flex-shrink-0 flex items-center justify-between p-2 border-b ${colors.border} ${colors.surfaceMuted} sticky top-0 z-20`}
  >
    {/* Left: Views */}
    <div className="flex items-center gap-3">
      <span className={`text-xs font-medium ${colors.textMuted}`}>Views</span>
      <button
        className={`flex items-center gap-1 text-sm ${colors.textPrimary} font-medium p-1 px-2 rounded ${colors.buttonHoverBg}`}
      >
        <FiGrid className="w-3 h-3" /> {currentViewName}{" "}
        <FiChevronDown className="w-3 h-3 opacity-50" />
      </button>
      <button
        className={`text-xs ${colors.textSecondary} hover:${colors.textPrimary}`}
      >
        Find a view
      </button>
      <button className={`text-xs ${colors.accent} ${colors.accentHover}`}>
        + New view
      </button>
    </div>
    {/* Right: Controls */}
    <div className="flex items-center gap-2">
      <button
        onClick={onHideFieldsClick}
        className={`flex items-center gap-1 text-xs p-1.5 rounded ${colors.buttonHoverBg} ${colors.textSecondary}`}
      >
        <FiColumns className="w-3 h-3" /> Hide Fields
      </button>
      <button
        onClick={onFilterClick}
        className={`flex items-center gap-1 text-xs p-1.5 rounded ${colors.buttonHoverBg} ${colors.textSecondary}`}
      >
        <FiFilter className="w-3 h-3" /> Filter
      </button>
      <button
        onClick={onGroupClick}
        className={`flex items-center gap-1 text-xs p-1.5 rounded ${colors.buttonHoverBg} ${colors.textSecondary}`}
      >
        <FiUsers className="w-3 h-3" /> Group
      </button>
      <button
        onClick={onSortClick}
        className={`flex items-center gap-1 text-xs p-1.5 rounded ${colors.buttonHoverBg} ${colors.textSecondary}`}
      >
        <FiArrowDown className="w-3 h-3" /> Sort
      </button>
      <button
        className={`p-1.5 rounded ${colors.buttonHoverBg} ${colors.textSecondary}`}
        title="More options"
      >
        <FiMoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  </div>
);
ViewManagementBar.propTypes = {
  /* ... */
};

// --- Grid Cell Component ---
const GridCell = ({
  record,
  column,
  isEditing,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  editingValue,
  onEditChange,
}) => {
  const [localValue, setLocalValue] = useState(record[column.name] || "");

  useEffect(() => {
    if (isEditing) {
      setLocalValue(record[column.name] || "");
    }
  }, [isEditing, record, column.name]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSaveEdit(record.recordId, column.id, localValue);
    } else if (e.key === "Escape") {
      onCancelEdit();
    }
  };

  const handleBlur = () => {
    // Save on blur only if value changed? Or rely on Enter/Escape?
    // For simplicity, let's save on blur if it's different.
    if (localValue !== (record[column.name] || "")) {
      onSaveEdit(record.recordId, column.id, localValue);
    } else {
      onCancelEdit();
    }
  };

  const displayValue = record[column.name] || "";

  // Render based on editing state
  if (isEditing) {
    switch (column.type) {
      case "Text":
      case "Number": // Simplification: treat number as text input for now
      case "Currency":
      case "Email":
      case "Phone":
      case "URL":
        return (
          <input
            type={
              column.type === "Number" || column.type === "Currency"
                ? "number"
                : "text"
            }
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className={`w-full h-full px-2 py-1 text-sm bg-gray-700 border border-indigo-500 rounded outline-none ${colors.textPrimary}`}
          />
        );
      case "SingleSelect":
        return (
          <select
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleBlur} // Save on blur for select too
            onKeyDown={handleKeyDown}
            autoFocus
            className={`w-full h-full px-2 py-1 text-sm bg-gray-700 border border-indigo-500 rounded outline-none ${colors.textPrimary} appearance-none`}
          >
            <option value="" disabled>
              Select...
            </option>
            {column.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      // Add cases for other types like Date Picker, MultiSelect, User, Checkbox later
      default:
        return (
          // Fallback for non-editable types during edit (or show simple text input)
          <input
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className={`w-full h-full px-2 py-1 text-sm bg-gray-700 border border-indigo-500 rounded outline-none ${colors.textPrimary}`}
          />
        );
    }
  }

  // Render display value based on type
  switch (column.type) {
    case "SingleSelect":
      // Basic tag rendering
      return (
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${colors.tagBg} ${colors.tagText}`}
        >
          {displayValue}
        </span>
      );
    case "Date":
      return displayValue
        ? new Date(displayValue + "T00:00:00").toLocaleDateString("en-CA")
        : ""; // Format YYYY-MM-DD
    case "Timestamp":
      return displayValue
        ? new Date(displayValue).toLocaleString("en-US", {
            dateStyle: "short",
            timeStyle: "short",
          })
        : "";
    case "Currency":
      return typeof displayValue === "number"
        ? formatCurrency(displayValue)
        : displayValue; // Use your formatCurrency
    case "User":
      const user = mockUsers.find((u) => u.id === displayValue);
      return user ? user.name : displayValue; // Display user name
    case "RelationalLink":
      const linkedRecord = modules[column.linkTo]?.data.find(
        (r) => r.recordId === displayValue
      );
      // Displaying the primary field (e.g., 'Full Name') of the linked record
      const linkedName = linkedRecord
        ? linkedRecord[modules[column.linkTo]?.columns[1]?.name || "id"]
        : displayValue;
      return (
        <Link to={`#`} className={`${colors.accent} hover:underline`}>
          {linkedName || "Link"}
        </Link>
      ); // Placeholder link
    case "URL":
      return (
        <a
          href={displayValue}
          target="_blank"
          rel="noopener noreferrer"
          className={`${colors.accent} hover:underline truncate`}
        >
          {displayValue}
        </a>
      );
    case "Text":
    default:
      return <span className="truncate">{displayValue}</span>; // Truncate long text
  }
};
GridCell.propTypes = {
  /* ... */
};

// --- Data Grid Component ---
const DataGrid = ({ records, columns, onRecordUpdate }) => {
  const [editingCell, setEditingCell] = useState(null); // { recordId: string, columnId: string } | null
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleStartEdit = (recordId, columnId) => {
    setEditingCell({ recordId, columnId });
  };

  const handleSaveEdit = (recordId, columnId, newValue) => {
    console.log(
      `Saving edit: Record ${recordId}, Column ${columnId}, Value: ${newValue}`
    );
    // Update the record in the parent component's state
    onRecordUpdate(recordId, columnId, newValue);
    setEditingCell(null);
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedRecords = useMemo(() => {
    let sortableItems = [...records];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (valA === null || valA === undefined)
          return sortConfig.direction === "ascending" ? 1 : -1;
        if (valB === null || valB === undefined)
          return sortConfig.direction === "ascending" ? -1 : 1;

        if (valA < valB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [records, sortConfig]);

  return (
    <div
      className={`overflow-auto border ${colors.border} rounded-lg shadow-md`}
    >
      <table className="min-w-full divide-y divide-gray-700">
        <thead className={`${colors.surfaceMuted}`}>
          <tr>
            {/* Checkbox column */}
            <th
              scope="col"
              className={`sticky left-0 z-10 px-2 py-2 ${colors.surfaceMuted}`}
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-500/50 bg-gray-700"
              />
            </th>
            {/* Data columns */}
            {columns.map((col) => (
              <th
                key={col.id}
                scope="col"
                className={`px-3 py-2 text-left text-xs font-medium ${colors.textSecondary} uppercase tracking-wider cursor-pointer hover:bg-gray-700`}
                style={{ minWidth: col.width ? `${col.width}px` : "150px" }} // Apply width
                onClick={() => requestSort(col.id)}
              >
                <div className="flex items-center justify-between">
                  {col.name}
                  {sortConfig.key === col.id ? (
                    sortConfig.direction === "ascending" ? (
                      <FiArrowUp className="w-3 h-3 ml-1" />
                    ) : (
                      <FiArrowDown className="w-3 h-3 ml-1" />
                    )
                  ) : (
                    <span className="w-3 h-3 ml-1"></span>
                  )}
                </div>
              </th>
            ))}
            {/* Add Column Button */}
            <th
              scope="col"
              className={`px-3 py-2 text-center sticky right-0 ${colors.surfaceMuted}`}
            >
              <button
                className={`p-1 rounded-full hover:bg-gray-700 ${colors.textSecondary}`}
                title="Add Column"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className={`${colors.surface} divide-y ${colors.border}`}>
          <AnimatePresence>
            {sortedRecords.map((record) => (
              <motion.tr
                key={record.recordId}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="hover:bg-slate-800/50"
              >
                {/* Checkbox cell */}
                <td
                  className={`sticky left-0 z-10 px-2 py-1.5 whitespace-nowrap ${colors.surface} group-hover:bg-slate-800/50`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-500/50 bg-gray-700"
                  />
                </td>
                {columns.map((col) => (
                  <td
                    key={`${record.recordId}-${col.id}`}
                    className="px-3 py-1.5 whitespace-nowrap text-sm"
                    style={{ minWidth: col.width ? `${col.width}px` : "150px" }}
                    onDoubleClick={() =>
                      handleStartEdit(record.recordId, col.id)
                    } // Double click to edit
                  >
                    <GridCell
                      record={record}
                      column={col}
                      isEditing={
                        editingCell?.recordId === record.recordId &&
                        editingCell?.columnId === col.id
                      }
                      onStartEdit={handleStartEdit}
                      onSaveEdit={handleSaveEdit}
                      onCancelEdit={handleCancelEdit}
                      editingValue={
                        editingCell?.recordId === record.recordId &&
                        editingCell?.columnId === col.id
                          ? record[col.name]
                          : ""
                      } // Pass current value to edit state
                      onEditChange={() => {}} // Placeholder, actual change handled in GridCell's local state
                    />
                  </td>
                ))}
                {/* Add Column cell placeholder */}
                <td
                  className={`sticky right-0 px-3 py-1.5 whitespace-nowrap ${colors.surface} group-hover:bg-slate-800/50`}
                ></td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      {/* Add New Record Row/Button */}
      <div className={`p-2 text-left border-t ${colors.border}`}>
        <button
          className={`flex items-center gap-1 text-xs ${colors.textSecondary} hover:${colors.textPrimary} p-1 rounded`}
        >
          <FiPlus className="w-3 h-3" /> Add Customer{" "}
          {/* Make dynamic based on activeModule */}
        </button>
      </div>
    </div>
  );
};
DataGrid.propTypes = {
  /* ... */
};

// --- Summary Bar Component ---
const SummaryBar = ({ recordCount, records, columns }) => {
  const sumAmount = useMemo(() => {
    const amountCol = columns.find((c) => c.id === "Loan Amount"); // Example: Find amount column
    if (!amountCol) return 0;
    return records.reduce(
      (sum, record) => sum + (parseFloat(record[amountCol.name]) || 0),
      0
    );
  }, [records, columns]);

  return (
    <div
      className={`flex items-center justify-between p-2 border-t ${colors.border} ${colors.surfaceMuted} text-xs ${colors.textSecondary}`}
    >
      <button
        className={`flex items-center gap-1 p-1 rounded hover:bg-gray-700`}
      >
        <FiPlus className="w-3 h-3" /> Create Customer {/* Make dynamic */}
      </button>
      <div className="flex items-center gap-4">
        <span>{recordCount} records</span>
        {/* Example Aggregation - Add logic to select column and aggregation type */}
        {sumAmount > 0 && (
          <span className="border-l border-gray-600 pl-4">
            Sum of Loan Amount:{" "}
            <span className={colors.textPrimary}>
              {formatCurrency(sumAmount)}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};
SummaryBar.propTypes = {
  /* ... */
};

// --- Main Dashboard Page ---
// This component now represents the CONTENT rendered inside DashboardLayout's <Outlet>
export default function AgentDashboard() {
  // State for active module - This should ideally come from Layout via Context or props
  const [activeModule, setActiveModule] = useState("Customers");
  const [records, setRecords] = useState(modules[activeModule].data);
  const [columns, setColumns] = useState(
    modules[activeModule].columns.filter((c) => !c.hidden)
  );
  const [editingCell, setEditingCell] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: columns[0]?.id || null,
    direction: "ascending",
  });

  // Update data/columns when activeModule changes
  // This effect assumes activeModule state is managed *here*.
  // If managed in Layout, this effect might be unnecessary or need adjustment.
  useEffect(() => {
    setRecords(modules[activeModule].data);
    const newColumns = modules[activeModule].columns.filter((c) => !c.hidden);
    setColumns(newColumns);
    setSortConfig({ key: newColumns[0]?.id || null, direction: "ascending" });
    setEditingCell(null);
  }, [activeModule]);

  // Callback to update a record in the state
  const handleRecordUpdate = useCallback(
    (recordId, columnId, newValue) => {
      setRecords((currentRecords) =>
        currentRecords.map((rec) => {
          if (rec.recordId === recordId) {
            const column = modules[activeModule].columns.find(
              (c) => c.id === columnId
            );
            if (column) {
              let coercedValue = newValue;
              if (column.type === "Number" || column.type === "Currency") {
                coercedValue = parseFloat(newValue) || 0;
              } else if (column.type === "Date" && newValue === "") {
                coercedValue = null;
              }
              return { ...rec, [column.name]: coercedValue };
            }
          }
          return rec;
        })
      );
    },
    [activeModule]
  );

  // Placeholder handlers for View Management Bar actions
  const handleFilterClick = () =>
    alert("Filter clicked - Implement filter logic/UI");
  const handleSortClick = () => alert("Sort clicked - Implement sort logic/UI");
  const handleGroupClick = () =>
    alert("Group clicked - Implement group logic/UI");
  const handleHideFieldsClick = () =>
    alert("Hide Fields clicked - Implement column visibility logic/UI");

  return (
    // This component now renders the View Bar, Grid, and Summary Bar
    // It assumes its parent container (in DashboardLayout) handles overall height/flex
    <div className="flex flex-col h-full">
      {" "}
      {/* Fill height provided by parent */}
      <ViewManagementBar
        currentViewName={`All ${activeModule}`}
        onFilterClick={handleFilterClick}
        onSortClick={handleSortClick}
        onGroupClick={handleGroupClick}
        onHideFieldsClick={handleHideFieldsClick}
      />
      {/* Main Content Area - Grid takes remaining space */}
      <div className="flex-grow overflow-hidden p-3 flex flex-col">
        <DataGrid
          records={records}
          columns={columns}
          onRecordUpdate={handleRecordUpdate}
          activeModule={activeModule}
          // Pass down editing and sorting state/handlers from this component
          editingCell={editingCell}
          setEditingCell={setEditingCell} // Allow DataGrid to set editing state
          sortConfig={sortConfig}
          setSortConfig={setSortConfig} // Allow DataGrid to set sorting state
        />
      </div>
      <SummaryBar
        recordCount={records.length}
        records={records}
        columns={columns}
        activeModule={activeModule}
      />
    </div>
  );
}

// --- PropTypes ---
AgentDashboard.propTypes = {};
