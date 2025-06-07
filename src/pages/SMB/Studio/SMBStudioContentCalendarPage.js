// src/pages/smb/studio/SMBStudioContentCalendarPage.js
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  FiCalendar,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiMail,
  FiUsers,
  FiMessageSquare,
  FiX,
  FiClock,
  FiTag,
  FiChevronsLeft,
  FiChevronsRight,
  FiTrash2,
} from "react-icons/fi";
import { useLocalization } from "../../../components/LocalizationContext";

import Button from "../../../components/Button";
import PropTypes from "prop-types";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const eventPillVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

// Helper Functions
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday-first (0-6)
};
const formatDateKey = (date) => {
  if (date instanceof Date) {
    return date.toISOString().split("T")[0];
  }
  return date; // Assuming it's already in 'YYYY-MM-DD' format
};
const isToday = (date) => {
  if (!date || !(date instanceof Date)) return false;
  const todayDate = new Date();
  return (
    date.getDate() === todayDate.getDate() &&
    date.getMonth() === todayDate.getMonth() &&
    date.getFullYear() === todayDate.getFullYear()
  );
};

// Event Types Configuration
const eventTypesConfig = {
  Blog: {
    icon: <FiEdit2 />,
    colorHex: "#FBBF24",
    tailwindColor: "amber-500",
    labelKey: "contentCalendar.typeBlog",
    defaultLabel: "Blog",
  },
  Social: {
    icon: <FiMessageSquare />,
    colorHex: "#60A5FA",
    tailwindColor: "blue-400",
    labelKey: "contentCalendar.typeSocial",
    defaultLabel: "Social Media",
  },
  Email: {
    icon: <FiMail />,
    colorHex: "#EC4899",
    tailwindColor: "pink-500",
    labelKey: "contentCalendar.typeEmail",
    defaultLabel: "Email",
  },
  Meeting: {
    icon: <FiUsers />,
    colorHex: "#A78BFA",
    tailwindColor: "purple-400",
    labelKey: "contentCalendar.typeMeeting",
    defaultLabel: "Meeting",
  },
  Other: {
    icon: <FiTag />,
    colorHex: "#A0AEC0",
    tailwindColor: "slate-400",
    labelKey: "contentCalendar.typeOther",
    defaultLabel: "Other",
  },
};

// Status Display Configuration (for DayViewModal badges)
// Assumes theme.colors.yellow[100], theme.colors.yellow[700] etc. exist and are hex color strings.
// Provide fallback colors if theme structure is different or colors are unavailable.
const getStatusDisplayConfig = (currentTheme) => ({
  Draft: {
    bgColor: currentTheme.colors?.yellow?.[100]
      ? `${currentTheme.colors.yellow[100]}CC`
      : "rgba(254, 243, 199, 0.8)", // yellow-100 with 80% opacity
    textColor: currentTheme.colors?.yellow?.[700] || "#B45309", // yellow-700
    labelKey: "contentCalendar.statusDraft",
    defaultLabel: "Draft",
  },
  Scheduled: {
    bgColor: currentTheme.colors?.blue?.[100]
      ? `${currentTheme.colors.blue[100]}CC`
      : "rgba(219, 234, 254, 0.8)", // blue-100 with 80% opacity
    textColor: currentTheme.colors?.blue?.[700] || "#1D4ED8", // blue-700
    labelKey: "contentCalendar.statusScheduled",
    defaultLabel: "Scheduled",
  },
  Published: {
    bgColor: currentTheme.colors?.green?.[100]
      ? `${currentTheme.colors.green[100]}CC`
      : "rgba(209, 250, 229, 0.8)", // green-100 with 80% opacity
    textColor: currentTheme.colors?.green?.[700] || "#047857", // green-700
    labelKey: "contentCalendar.statusPublished",
    defaultLabel: "Published",
  },
  Confirmed: {
    bgColor: currentTheme.colors?.purple?.[100]
      ? `${currentTheme.colors.purple[100]}CC`
      : "rgba(233, 213, 255, 0.8)", // purple-100 with 80% opacity
    textColor: currentTheme.colors?.purple?.[700] || "#7E22CE", // purple-700
    labelKey: "contentCalendar.statusConfirmed",
    defaultLabel: "Confirmed",
  },
  Default: {
    // Fallback for unknown statuses
    bgColor: currentTheme.colors?.gray?.[100]
      ? `${currentTheme.colors.gray[100]}CC`
      : "rgba(243, 244, 246, 0.8)", // gray-100 with 80% opacity
    textColor: currentTheme.colors?.gray?.[700] || "#374151", // gray-700
    labelKey: "contentCalendar.statusUnknown",
    defaultLabel: "Unknown",
  },
});
const statusDisplayConfig = getStatusDisplayConfig(theme);

const initialEvents = [
  {
    id: "1",
    date: "2025-06-05",
    title: "Draft Blog Post: Summer Marketing Tips",
    type: "Blog",
    status: "Draft",
    time: "10:00",
    duration: 60,
    notes: "Focus on local SEO strategies.",
  },
  {
    id: "2",
    date: "2025-06-10",
    title: "Schedule Instagram Story",
    type: "Social",
    status: "Scheduled",
    time: "14:30",
    duration: 30,
  },
  {
    id: "3",
    date: "2025-06-10",
    title: "Q3 Content Strategy Meeting",
    type: "Meeting",
    status: "Confirmed",
    time: "09:00",
    duration: 90,
  },
  {
    id: "4",
    date: "2025-06-18",
    title: "Publish Client Success Case Study",
    type: "Blog",
    status: "Published",
    time: "15:00",
    duration: 45,
  },
  {
    id: "5",
    date: "2025-06-18",
    title: "Follow-up Client A",
    type: "Other",
    status: "Confirmed",
    time: "11:00",
    duration: 30,
    notes: "Discuss project feedback.",
  },
];

// Event Modal Component
const EventModal = React.memo(
  ({ t, event, date, onClose, onSave, onDelete }) => {
    const [formData, setFormData] = useState({
      title: "",
      type: "Blog",
      status: "Draft",
      date: formatDateKey(date ? new Date(date) : new Date()), // Ensure date is correctly formatted
      time: "10:00",
      duration: "60",
      notes: "",
    });

    useEffect(() => {
      if (event) {
        setFormData({
          title: event.title,
          type: event.type,
          status: event.status,
          date: event.date, // Assumes event.date is 'YYYY-MM-DD'
          time: event.time || "10:00",
          duration: event.duration?.toString() || "60",
          notes: event.notes || "",
        });
      } else if (date) {
        // For adding new event on a specific date
        setFormData((prev) => ({
          ...prev,
          title: "",
          type: "Blog",
          status: "Draft",
          notes: "",
          date: formatDateKey(new Date(date)), // date is YYYY-MM-DD string
          time: "10:00",
          duration: "60", // Reset other fields for new event
        }));
      }
    }, [event, date]);

    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.title.trim()) {
        alert(t("contentCalendar.errorTitleRequired", "Title is required.")); // TODO: Replace with Toast
        return;
      }
      onSave({
        ...(event || {}), // Retains ID if editing
        ...formData,
        id: event?.id || Date.now().toString(), // Ensure new events get an ID
        duration: parseInt(formData.duration) || 60,
      });
    };

    return (
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`${theme.surfaceCard} rounded-xl shadow-2xl w-full max-w-lg border ${theme.borderLight}`}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className={`p-5 sm:p-6 border-b ${theme.borderLight} flex justify-between items-center`}
          >
            <h2
              className={`text-lg sm:text-xl font-semibold ${theme.textPrimary}`}
            >
              {event
                ? t("contentCalendar.modalEditEvent", "Edit Event")
                : t("contentCalendar.modalAddEvent", "Add New Event")}
            </h2>
            <Button
              variant="icon"
              onClick={onClose}
              className={`!p-1.5 ${theme.textMuted} hover:${theme.textPrimary}`}
              aria-label={t("contentCalendar.modalClose", "Close")}
            >
              <FiX className="w-5 h-5" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className={`block text-xs font-medium ${theme.textSecondary} mb-1`}
              >
                {t("contentCalendar.modalFieldTitle", "Title")}
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={`w-full ${theme.inputBg} ${theme.inputBorder} rounded-md px-3 py-2 text-sm ${theme.textPrimary} ${theme.inputFocusStyle}`}
              />
            </div>
            {/* Date and Time Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className={`block text-xs font-medium ${theme.textSecondary} mb-1`}
                >
                  {t("contentCalendar.modalFieldDate", "Date")}
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className={`w-full ${theme.inputBg} ${theme.inputBorder} rounded-md px-3 py-2 text-sm ${theme.textPrimary} ${theme.inputFocusStyle}`}
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className={`block text-xs font-medium ${theme.textSecondary} mb-1`}
                >
                  {t("contentCalendar.modalFieldTime", "Time")}
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full ${theme.inputBg} ${theme.inputBorder} rounded-md px-3 py-2 text-sm ${theme.textPrimary} ${theme.inputFocusStyle}`}
                />
              </div>
            </div>
            {/* Type and Status Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="type"
                  className={`block text-xs font-medium ${theme.textSecondary} mb-1`}
                >
                  {t("contentCalendar.modalFieldType", "Type")}
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full ${theme.inputBg} ${theme.inputBorder} rounded-md px-3 py-2 text-sm ${theme.textPrimary} ${theme.inputFocusStyle}`}
                >
                  {Object.entries(eventTypesConfig).map(([key, config]) => (
                    <option key={key} value={key}>
                      {t(config.labelKey, config.defaultLabel)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="status"
                  className={`block text-xs font-medium ${theme.textSecondary} mb-1`}
                >
                  {t("contentCalendar.modalFieldStatus", "Status")}
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full ${theme.inputBg} ${theme.inputBorder} rounded-md px-3 py-2 text-sm ${theme.textPrimary} ${theme.inputFocusStyle}`}
                >
                  {["Draft", "Scheduled", "Published", "Confirmed"].map((s) => (
                    <option key={s} value={s}>
                      {t(`contentCalendar.status${s}`, s)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Duration Field */}
            <div>
              <label
                htmlFor="duration"
                className={`block text-xs font-medium ${theme.textSecondary} mb-1`}
              >
                {t("contentCalendar.modalFieldDuration", "Duration (minutes)")}
              </label>
              <input
                type="number"
                name="duration"
                id="duration"
                min="15"
                step="15"
                value={formData.duration}
                onChange={handleChange}
                className={`w-full ${theme.inputBg} ${theme.inputBorder} rounded-md px-3 py-2 text-sm ${theme.textPrimary} ${theme.inputFocusStyle}`}
              />
            </div>
            {/* Notes Field */}
            <div>
              <label
                htmlFor="notes"
                className={`block text-xs font-medium ${theme.textSecondary} mb-1`}
              >
                {t("contentCalendar.modalFieldNotes", "Notes")}
              </label>
              <textarea
                name="notes"
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className={`w-full ${theme.inputBg} ${theme.inputBorder} rounded-md px-3 py-2 text-sm ${theme.textPrimary} ${theme.inputFocusStyle}`}
              ></textarea>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-3">
              <div>
                {event && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(event.id)}
                    icon={<FiTrash2 className="w-3.5 h-3.5" />}
                    className="!text-red-600 !border-red-300 hover:!bg-red-50"
                  >
                    {t("contentCalendar.modalButtonDelete", "Delete")}
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={onClose}
                >
                  {t("contentCalendar.modalButtonCancel", "Cancel")}
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className={`${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg}`}
                >
                  {event
                    ? t("contentCalendar.modalButtonSave", "Save Changes")
                    : t("contentCalendar.modalButtonAdd", "Add Event")}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  }
);
EventModal.propTypes = {
  t: PropTypes.func.isRequired,
  event: PropTypes.object,
  date: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
EventModal.displayName = "EventModal";

// Status Badge for DayViewModal
const StatusBadge = React.memo(({ t, status }) => {
  const config = statusDisplayConfig[status] || statusDisplayConfig.Default;
  return (
    <span
      className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium`}
      style={{ backgroundColor: config.bgColor, color: config.textColor }}
    >
      {t(config.labelKey, config.defaultLabel)}
    </span>
  );
});
StatusBadge.propTypes = {
  t: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
StatusBadge.displayName = "StatusBadge";

// Day View Modal Component
const DayViewModal = React.memo(
  ({ t, date, events, onClose, onEventClick, onAddEvent }) => {
    const dayEvents = useMemo(
      () =>
        events
          .filter((e) => e.date === date)
          .sort((a, b) => (a.time || "00:00").localeCompare(b.time || "00:00")),
      [events, date]
    );

    const { dayName, formattedDate } = useMemo(() => {
      const d = new Date(date + "T00:00:00"); // Ensure local time interpretation
      return {
        dayName: d.toLocaleDateString(undefined, { weekday: "long" }),
        formattedDate: d.toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      };
    }, [date]);

    return (
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`${theme.surfaceCard} rounded-xl shadow-2xl w-full max-w-lg border ${theme.borderLight}`}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className={`p-5 sm:p-6 border-b ${theme.borderLight} flex justify-between items-center`}
          >
            <div>
              <h2
                className={`text-lg sm:text-xl font-semibold ${theme.textPrimary}`}
              >
                {dayName}, {formattedDate}
              </h2>
              <p className={`text-xs sm:text-sm ${theme.textMuted}`}>
                {dayEvents.length}{" "}
                {dayEvents.length === 1
                  ? t("contentCalendar.dayViewSingleEvent", "event")
                  : t("contentCalendar.dayViewMultipleEvents", "events")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => onAddEvent(date)}
                icon={<FiPlus className="w-4 h-4" />}
                className={`${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg}`}
              >
                {t("contentCalendar.addEventToDay", "Add to Day")}
              </Button>
              <Button
                variant="icon"
                onClick={onClose}
                className={`!p-1.5 ${theme.textMuted} hover:${theme.textPrimary}`}
                aria-label={t("contentCalendar.modalClose", "Close")}
              >
                <FiX className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="p-5 sm:p-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
            {dayEvents.length === 0 ? (
              <div
                className={`py-10 sm:py-12 text-center ${theme.surfaceMuted} rounded-lg border ${theme.borderLight}`}
              >
                <FiCalendar
                  className={`w-10 h-10 sm:w-12 sm:h-12 ${theme.textMuted} mx-auto mb-3 opacity-50`}
                />
                <p className={`${theme.textMuted} text-sm`}>
                  {t(
                    "contentCalendar.dayViewNoEvents",
                    "No events scheduled for this day."
                  )}
                </p>
              </div>
            ) : (
              // Reorder.Group for potential future drag-and-drop reordering of events within the day.
              // Implement onReorder to save the new order if this feature is enabled.
              <Reorder.Group
                axis="y"
                values={dayEvents}
                onReorder={() => {
                  /* TODO: Implement reordering logic */
                }}
              >
                <div className="space-y-3">
                  {dayEvents.map((event) => {
                    const eventTypeConfig =
                      eventTypesConfig[event.type] || eventTypesConfig.Other;
                    const color = event.color || eventTypeConfig.colorHex;
                    return (
                      <Reorder.Item
                        key={event.id}
                        value={event}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        whileDrag={{
                          scale: 1.01,
                          boxShadow:
                            theme.cardHoverShadow?.replace("hover:", "") ||
                            "0px 4px 10px rgba(0,0,0,0.1)",
                        }} // Provide fallback shadow
                        className={`p-3 rounded-lg border ${theme.borderLight} cursor-pointer flex items-start gap-3 transition-colors hover:${theme.surfaceMuted}`}
                        style={{ borderLeft: `4px solid ${color}` }}
                        onClick={() => onEventClick(event)}
                      >
                        <div
                          className={`p-1.5 mt-0.5 rounded-full`}
                          style={{ backgroundColor: `${color}2A` }}
                        >
                          {" "}
                          {/* Lighter bg for icon container, 2A is ~16% opacity */}
                          {React.cloneElement(eventTypeConfig.icon, {
                            className: "w-4 h-4",
                            style: { color: color },
                          })}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3
                              className={`font-medium ${theme.textPrimary} text-sm`}
                            >
                              {event.title}
                            </h3>
                            <Button
                              variant="icon"
                              size="xs"
                              className={`!p-1 ${theme.textMuted} hover:${theme.textPrimary}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onEventClick(event);
                              }}
                              aria-label={t(
                                "contentCalendar.editEvent",
                                "Edit event"
                              )}
                            >
                              <FiEdit2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <FiClock className={`w-3 h-3 ${theme.textMuted}`} />
                            <span className={`text-xs ${theme.textSecondary}`}>
                              {event.time ||
                                t("contentCalendar.allDay", "All Day")}{" "}
                              {event.duration ? `• ${event.duration} mins` : ""}
                            </span>
                          </div>
                          {event.notes && (
                            <p
                              className={`text-xs ${theme.textMuted} mt-1.5 italic truncate`}
                            >
                              {event.notes}
                            </p>
                          )}
                          <div className="mt-1.5 flex items-center gap-2">
                            <StatusBadge t={t} status={event.status} />
                          </div>
                        </div>
                      </Reorder.Item>
                    );
                  })}
                </div>
              </Reorder.Group>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }
);
DayViewModal.propTypes = {
  t: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onEventClick: PropTypes.func.isRequired,
  onAddEvent: PropTypes.func.isRequired,
};
DayViewModal.displayName = "DayViewModal";

// Calendar Event Pill (for month view cells)
const CalendarEventPill = React.memo(({ t, event, onClick }) => {
  const eventTypeConfig =
    eventTypesConfig[event.type] || eventTypesConfig.Other;
  const color = event.color || eventTypeConfig.colorHex;

  return (
    <motion.div
      variants={eventPillVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClick}
      className={`px-1 py-0.5 text-[9px] sm:text-[10px] rounded cursor-pointer flex items-center gap-0.5`}
      style={{
        backgroundColor: `${color}2A`,
        borderLeft: `2px solid ${color}`,
      }} // 2A is ~16% opacity
      title={event.title}
    >
      <span style={{ color: color }} className="flex-shrink-0">
        {React.cloneElement(eventTypeConfig.icon, { className: "w-2.5 h-2.5" })}
      </span>
      <span
        className={`truncate ${theme.textPrimary}`}
        style={{ color: color }}
      >
        {event.title}
      </span>
    </motion.div>
  );
});
CalendarEventPill.propTypes = {
  t: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
CalendarEventPill.displayName = "CalendarEventPill";

// Calendar Day Cell (for month view grid)
const CalendarDayCell = React.memo(
  ({ t, date, month, events, onDayClick, onEventClick }) => {
    const dayEvents = useMemo(
      () => (date ? events.filter((e) => e.date === formatDateKey(date)) : []),
      [date, events]
    );

    const isCurrentMonthDay = date && date.getMonth() === month;
    const isCellToday = date && isToday(date);

    return (
      <div
        onClick={() => date && onDayClick(date)}
        className={`relative p-1 sm:p-1.5 border-r border-b ${
          theme.borderLight
        } 
                 ${
                   isCurrentMonthDay
                     ? `${theme.background} hover:${theme.surfaceMuted}`
                     : `${theme.surfaceMuted} opacity-60 hover:opacity-80`
                 } 
                 ${date ? "cursor-pointer" : "cursor-default"} 
                 transition-colors duration-150 flex flex-col`}
        style={{ minHeight: "90px", aspectRatio: "auto" }} // Adjusted minHeight slightly
      >
        {date && (
          <>
            <span
              className={`text-[10px] sm:text-xs font-medium self-start mb-0.5 
                       ${
                         isCellToday
                           ? `${theme.accentCyanBg} ${theme.buttonTextLight} rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center`
                           : isCurrentMonthDay
                           ? theme.textPrimary
                           : theme.textMuted
                       }`}
            >
              {date.getDate()}
            </span>
            <div className="flex-grow space-y-0.5 overflow-hidden mt-0.5">
              {dayEvents.slice(0, 2).map((event) => (
                <CalendarEventPill
                  key={event.id}
                  t={t}
                  event={event}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                />
              ))}
              {dayEvents.length > 2 && (
                <div
                  className={`text-[8px] sm:text-[9px] text-center ${theme.textMuted} mt-0.5`}
                >
                  + {dayEvents.length - 2}{" "}
                  {t("contentCalendar.moreEvents", "more")}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
);
CalendarDayCell.propTypes = {
  t: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date),
  month: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired,
  onDayClick: PropTypes.func.isRequired,
  onEventClick: PropTypes.func.isRequired,
};
CalendarDayCell.displayName = "CalendarDayCell";

// Main Page Component
export default function SMBStudioContentCalendarPage() {
  const { t } = useLocalization();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(initialEvents); // TODO: Fetch from API
  const [modalState, setModalState] = useState({
    isOpen: false,
    event: null,
    date: null,
  });
  const [dayViewState, setDayViewState] = useState({
    isOpen: false,
    date: null,
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfWeek = getFirstDayOfMonth(year, month);
    const dayCells = Array(firstDayOfWeek)
      .fill(null)
      .concat(
        Array.from(
          { length: daysInMonth },
          (_, i) => new Date(year, month, i + 1)
        )
      );
    const totalGridCells = Math.ceil(dayCells.length / 7) * 7;
    while (dayCells.length < totalGridCells) {
      dayCells.push(null);
    }
    return dayCells;
  }, [year, month]);

  const navigateMonth = useCallback((increment) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + increment, 1)
    );
  }, []);

  const goToToday = useCallback(() => setCurrentDate(new Date()), []);

  const handleDayClick = useCallback((date) => {
    if (!date) return;
    setDayViewState({ isOpen: true, date: formatDateKey(date) });
  }, []);

  const handleAddEventForDay = useCallback((dateStr) => {
    // dateStr is 'YYYY-MM-DD'
    setModalState({ isOpen: true, event: null, date: dateStr });
    setDayViewState({ isOpen: false, date: null }); // Close day view if open
  }, []);

  const handleEventClick = useCallback((event) => {
    setModalState({ isOpen: true, event, date: null });
    setDayViewState({ isOpen: false, date: null }); // Close day view if open
  }, []);

  const handleSaveEvent = useCallback((eventData) => {
    setEvents(
      (prevEvents) =>
        prevEvents.find((e) => e.id === eventData.id)
          ? prevEvents.map((e) => (e.id === eventData.id ? eventData : e))
          : [...prevEvents, eventData] // ID is already set in EventModal
    );
    setModalState({ isOpen: false, event: null, date: null });
  }, []);

  const handleDeleteEvent = useCallback((id) => {
    // TODO: Add confirmation dialog
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== id));
    setModalState({ isOpen: false, event: null, date: null });
  }, []);

  const closeModal = useCallback(
    () => setModalState({ isOpen: false, event: null, date: null }),
    []
  );
  const closeDayViewModal = useCallback(
    () => setDayViewState({ isOpen: false, date: null }),
    []
  );

  const weekdays = useMemo(
    () =>
      [
        "dayMon",
        "dayTue",
        "dayWed",
        "dayThu",
        "dayFri",
        "daySat",
        "daySun",
      ].map((key) => t(`contentCalendar.${key}`, key.replace("day", ""))),
    [t]
  );

  return (
    <div
      className={`min-h-screen ${theme.background} py-6 sm:py-8 px-2 sm:px-4 lg:px-6`}
    >
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4"
        >
          <div>
            <h1
              className={`text-xl sm:text-2xl lg:text-3xl font-bold ${theme.textPrimary}`}
            >
              {t("contentCalendar.mainTitle", "Content Calendar")}
            </h1>
            <p className={`text-xs sm:text-sm ${theme.textMuted}`}>
              {t(
                "contentCalendar.mainSubtitle",
                "Plan, schedule, and manage your content strategy."
              )}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => handleAddEventForDay(formatDateKey(new Date()))}
            icon={<FiPlus className="w-4 h-4" />}
            className={`${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg} !py-2 !px-3 sm:!px-4 text-sm shadow-md`}
          >
            {t("contentCalendar.addEvent", "Add Event")}
          </Button>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
          className={`mb-5 sm:mb-6 p-3 sm:p-4 ${theme.surfaceMuted} rounded-lg border ${theme.borderLight} flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 shadow-sm`}
        >
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Button
              variant="icon"
              onClick={() => navigateMonth(-12)}
              size="sm"
              className={`!p-1.5 sm:!p-2 ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} hover:${theme.buttonSecondaryHoverBg}`}
              aria-label={t("contentCalendar.prevYear", "Previous Year")}
            >
              <FiChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="icon"
              onClick={() => navigateMonth(-1)}
              size="sm"
              className={`!p-1.5 sm:!p-2 ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} hover:${theme.buttonSecondaryHoverBg}`}
              aria-label={t("contentCalendar.prevMonth", "Previous Month")}
            >
              <FiChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={goToToday}
              size="sm"
              className={`!px-2 sm:!px-3 !py-1 sm:!py-1.5 text-xs ${theme.buttonPrimaryBg}`}
            >
              {t("contentCalendar.todayButton", "Today")}
            </Button>
            <Button
              variant="icon"
              onClick={() => navigateMonth(1)}
              size="sm"
              className={`!p-1.5 sm:!p-2 ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} hover:${theme.buttonSecondaryHoverBg}`}
              aria-label={t("contentCalendar.nextMonth", "Next Month")}
            >
              <FiChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="icon"
              onClick={() => navigateMonth(12)}
              size="sm"
              className={`!p-1.5 sm:!p-2 ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} hover:${theme.buttonSecondaryHoverBg}`}
              aria-label={t("contentCalendar.nextYear", "Next Year")}
            >
              <FiChevronsRight className="w-4 h-4" />
            </Button>
          </div>
          <h2
            className={`text-md sm:text-lg font-semibold ${theme.textPrimary} order-first sm:order-none flex-grow sm:flex-grow-0 text-center sm:text-left my-2 sm:my-0`}
          >
            {currentDate.toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div className="flex items-center gap-1 sm:gap-2">
            {/* TODO: Implement Week View */}
            <Button
              variant="secondary"
              size="sm"
              className={`!px-2.5 sm:!px-3 !py-1 sm:!py-1.5 text-xs ${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} border-transparent`}
            >
              {t("contentCalendar.viewMonth", "Month")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`!px-2.5 sm:!px-3 !py-1 sm:!py-1.5 text-xs`}
              disabled
              title={t(
                "contentCalendar.weekViewComingSoon",
                "Week view coming soon"
              )}
            >
              {t("contentCalendar.viewWeek", "Week")}
            </Button>
          </div>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className={`${theme.surfaceCard} rounded-xl shadow-lg border ${theme.borderLight} overflow-hidden`}
        >
          <div
            className={`grid grid-cols-7 border-b ${theme.borderLight} ${theme.surfaceMuted}`}
          >
            {weekdays.map((day) => (
              <div
                key={day}
                className={`p-1.5 sm:p-2 text-center text-[10px] sm:text-xs font-semibold ${theme.textSecondary} uppercase tracking-wider`}
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.substring(0, 1)}</span>{" "}
                {/* Abbreviated for small screens */}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 auto-rows-fr">
            {days.map((date, index) => (
              <CalendarDayCell
                key={date ? formatDateKey(date) : `empty-${index}`}
                t={t}
                date={date}
                month={month}
                events={events}
                onDayClick={handleDayClick}
                onEventClick={handleEventClick}
              />
            ))}
          </div>
        </motion.div>

        {/* Modals */}
        <AnimatePresence>
          {modalState.isOpen && (
            <EventModal
              t={t}
              event={modalState.event}
              date={modalState.date}
              onClose={closeModal}
              onSave={handleSaveEvent}
              onDelete={handleDeleteEvent}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {dayViewState.isOpen && (
            <DayViewModal
              t={t}
              date={dayViewState.date}
              events={events}
              onClose={closeDayViewModal}
              onEventClick={handleEventClick}
              onAddEvent={handleAddEventForDay}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
