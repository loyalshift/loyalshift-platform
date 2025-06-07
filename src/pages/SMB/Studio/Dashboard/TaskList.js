// src/pages/SMB/Studio/Dashboard/TaskList.js (or a more general components path)
import React, { useState } from "react";
import { FiCheckSquare, FiSquare, FiTrash2, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalization } from "../../../../components/LocalizationContext"; // Adjust path
import loyalShiftV2Theme from "../../../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

const taskItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

const TaskItem = ({ task, onToggle, onDelete }) => {
  const { t } = useLocalization();
  return (
    <motion.li
      variants={taskItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout // Animate layout changes
      className={`flex items-center justify-between p-2.5 rounded-md ${
        task.completed ? `${theme.surfaceMuted} opacity-60` : theme.surface
      } border ${theme.borderLight} mb-2 group`}
    >
      <div className="flex items-center flex-grow">
        <button
          onClick={() => onToggle(task.id)}
          className={`mr-3 p-1 rounded ${theme.focusRingDefault}`}
          aria-label={
            task.completed
              ? t("dashboard.tasks.markIncomplete", "Mark as Incomplete")
              : t("dashboard.tasks.markComplete", "Mark as Complete")
          }
        >
          {task.completed ? (
            <FiCheckSquare className={`w-5 h-5 ${theme.successText}`} />
          ) : (
            <FiSquare className={`w-5 h-5 ${theme.textMuted}`} />
          )}
        </button>
        <span
          className={`text-sm flex-1 ${theme.textPrimary} ${
            task.completed ? "line-through " + theme.textMuted : ""
          }`}
        >
          {t(task.textKey, task.defaultText)}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className={`ml-2 p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity ${theme.focusRingDefault}`}
        aria-label={t("dashboard.tasks.deleteTask", "Delete Task")}
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
    </motion.li>
  );
};

export default function TaskList() {
  const { t } = useLocalization();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      textKey: "dashboard.tasks.sample1",
      defaultText: "Draft Q3 blog post outline",
      completed: false,
    },
    {
      id: 2,
      textKey: "dashboard.tasks.sample2",
      defaultText: "Review new asset uploads",
      completed: true,
    },
    {
      id: 3,
      textKey: "dashboard.tasks.sample3",
      defaultText: "Schedule social media content for next week",
      completed: false,
    },
  ]);
  const [newTaskText, setNewTaskText] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === "") return;
    const newTask = {
      id: Date.now(),
      // For dynamically added tasks, we might not have a key, or we'd need a system
      textKey: `dashboard.tasks.custom.${Date.now()}`, // Example dynamic key
      defaultText: newTaskText.trim(),
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setNewTaskText("");
  };

  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleAddTask} className="flex mb-3">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder={t(
            "dashboard.tasks.addTaskPlaceholder",
            "Add a new task..."
          )}
          className={`flex-grow px-3 py-2 text-sm ${theme.inputBg} ${theme.inputBorder} rounded-l-md ${theme.inputFocusStyle} ${theme.textPrimary} transition-colors`}
        />
        <button
          type="submit"
          className={`${theme.accentCyanBg} ${theme.buttonTextDark} px-3 py-2 rounded-r-md ${theme.accentCyanBgHover} text-sm font-semibold ${theme.focusRingDefault} flex items-center`}
        >
          <FiPlus className="w-4 h-4 mr-1 sm:mr-0" />
          <span className="hidden sm:inline">
            {t("dashboard.tasks.addButton", "Add")}
          </span>
        </button>
      </form>

      {tasks.length > 0 && (
        <p className={`text-xs ${theme.textMuted} mb-3 text-right`}>
          {t(
            "dashboard.tasks.completedRatio",
            "{completedCount} of {totalCount} completed",
            { completedCount: completedTasks, totalCount: totalTasks }
          )}
        </p>
      )}

      <div className="flex-grow overflow-y-auto max-h-[280px] pr-1 custom-scrollbar-thin">
        {" "}
        {/* Added max-h and custom scrollbar class */}
        {tasks.length === 0 ? (
          <p className={`text-center text-sm ${theme.textMuted} py-8`}>
            {t("dashboard.tasks.noTasks", "No tasks yet. Add one above!")}
          </p>
        ) : (
          <motion.ul layout>
            <AnimatePresence>
              {tasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              {tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}
