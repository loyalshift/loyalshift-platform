// src/components/smb/studio/SMBStudioDashboard.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocalization } from "../../../components/LocalizationContext"; // Adjust path as needed
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";
import TaskList from "./Dashboard/TaskList";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Icons (Using react-icons/fi for a more professional look) ---
import {
  FiCalendar,
  FiBarChart2,
  FiUsers,
  FiMessageSquare,
  FiGlobe,
  FiEdit,
  FiUploadCloud,
  FiSettings,
  FiSearch,
  FiCheckCircle,
  FiAward,
  FiActivity,
} from "react-icons/fi"; // FiActivity for LightBulb, FiAward for Trophy
import TopPerformingAssets from "./Dashboard/TopPerformingAssets";

// Using the imported theme directly
const theme = loyalShiftV2Theme;

const chartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1000 },
];

const ChartArea = () => {
  return (
    <div className="mt-4 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ r: 4, fill: "#0ea5e9" }}
            activeDot={{
              r: 6,
              stroke: "#0ea5e9",
              strokeWidth: 2,
              fill: "#ffffff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Animation Variants (remain the same - already subtle and professional)
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

// Dashboard Components
const DashboardCard = ({ title, icon, children, className = "" }) => (
  <motion.div
    className={`${theme.surface} dark:bg-slate-800 rounded-xl ${theme.cardShadow} ${theme.cardHoverShadow} overflow-hidden border ${theme.borderLight} dark:border-slate-700 transition-all duration-300 ${className}`}
    variants={cardVariants}
    whileHover={{ y: -3, scale: 1.005 }} // Slightly more subtle hover
  >
    <div
      className={`p-4 sm:p-5 border-b ${theme.borderLight} dark:border-slate-700 flex items-center space-x-3`}
    >
      <div className={`${theme.textHighlight} dark:text-cyan-400`}>{icon}</div>
      <h3
        className={`font-semibold ${theme.textPrimary} dark:text-white text-md sm:text-lg`}
      >
        {title}
      </h3>
    </div>
    <div className="p-4 sm:p-5 text-sm">{children}</div>
  </motion.div>
);

const RecentBlogPostPerformance = () => {
  const { t } = useLocalization();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Mock data
    setPosts([
      {
        id: 1,
        title: "10 Marketing Strategies for 2025",
        date: "May 28, 2025",
        views: 2450,
        engagement: "4.8%",
        clicks: 312,
      },
      {
        id: 2,
        title: "Building Customer Loyalty Programs That Actually Work",
        date: "May 22, 2025",
        views: 1870,
        engagement: "5.2%",
        clicks: 278,
      },
      {
        id: 3,
        title: "The Future of AI in Small Business Marketing",
        date: "May 15, 2025",
        views: 3210,
        engagement: "6.1%",
        clicks: 420,
      },
    ]);
  }, []);

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className={`${theme.surfaceMuted} dark:bg-slate-700/40 rounded-lg p-3 sm:p-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border ${theme.borderLight} dark:border-slate-600`}
        >
          <h4
            className={`font-medium ${theme.textPrimary} dark:text-slate-100 truncate text-sm`}
          >
            {post.title}
          </h4>
          <p
            className={`text-xs ${theme.textMuted} dark:text-slate-400 mb-2.5`}
          >
            {post.date}
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p
                className={`text-xs ${theme.textSecondary} dark:text-slate-400`}
              >
                {t("dashboard.views", "Views")}
              </p>
              <p
                className={`font-semibold text-sm ${theme.textPrimary} dark:text-slate-200`}
              >
                {post.views.toLocaleString()}
              </p>
            </div>
            <div>
              <p
                className={`text-xs ${theme.textSecondary} dark:text-slate-400`}
              >
                {t("dashboard.engagement", "Engagement")}
              </p>
              <p className={`font-semibold text-sm ${theme.successText}`}>
                {post.engagement}
              </p>
            </div>
            <div>
              <p
                className={`text-xs ${theme.textSecondary} dark:text-slate-400`}
              >
                {t("dashboard.clicks", "Clicks")}
              </p>
              <p
                className={`font-semibold text-sm ${theme.textPrimary} dark:text-slate-200`}
              >
                {post.clicks}
              </p>
            </div>
          </div>
        </div>
      ))}
      <Link
        to="/smb/studio/blog"
        className={`block w-full mt-3 py-2 text-xs sm:text-sm font-medium text-center ${theme.linkStyle} dark:hover:text-cyan-300`}
      >
        {t("dashboard.viewAllPosts", "View all blog posts")} &rarr;
      </Link>
    </div>
  );
};

const QuickDraftsAndIdeas = () => {
  const { t } = useLocalization();
  const [drafts, setDrafts] = useState([
    {
      id: 1,
      content: "Plan Q3 content calendar around new product launch.",
      date: new Date().toISOString(),
    },
  ]);
  const [newIdea, setNewIdea] = useState("");
  const handleAddIdea = () => {
    if (newIdea.trim()) {
      setDrafts((prev) => [
        {
          id: Date.now(),
          content: newIdea.trim(),
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
      setNewIdea("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex">
        <input
          type="text"
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          placeholder={t(
            "dashboard.addIdeaPlaceholder",
            "Add a new content idea or quick draft..."
          )}
          className={`flex-1 ${theme.inputBg} dark:bg-slate-700 ${theme.inputBorder} dark:border-slate-600 rounded-l-md px-3 py-2 text-sm ${theme.textPrimary} dark:text-slate-100 ${theme.inputFocusStyle} dark:ring-offset-slate-800 focus:outline-none`}
        />
        <button
          onClick={handleAddIdea}
          className={`${theme.accentCyanBg} ${theme.buttonTextDark} dark:${theme.buttonTextLight} px-4 rounded-r-md ${theme.accentCyanBgHover} transition-colors text-sm font-semibold`}
        >
          {t("dashboard.add", "Add")}
        </button>
      </div>
      <div
        className={`space-y-2 max-h-60 overflow-y-auto p-2 rounded-md ${theme.surfaceMuted} dark:bg-slate-700/30 border ${theme.borderLight} dark:border-slate-600`}
      >
        {drafts.length === 0 && (
          <p
            className={`text-center ${theme.textMuted} dark:text-slate-400 py-4 text-sm`}
          >
            {t("dashboard.noDrafts", "No drafts or ideas captured yet.")}
          </p>
        )}
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className={`flex items-start p-2.5 ${theme.surface} dark:bg-slate-700 rounded-lg ${theme.cardShadow}/50 border ${theme.borderLight} dark:border-slate-600`}
          >
            <div
              className={`${theme.accentCyanBg}/20 text-cyan-600 dark:bg-cyan-500/30 dark:text-cyan-300 rounded-full p-1.5 mr-2.5 mt-0.5 flex-shrink-0`}
            >
              <FiActivity className="w-4 h-4" />{" "}
              {/* Changed from LightBulb to FiActivity */}
            </div>
            <div className="flex-1">
              <p
                className={`${theme.textPrimary} dark:text-slate-200 text-sm leading-snug`}
              >
                {draft.content}
              </p>
              <p
                className={`text-xs ${theme.textMuted} dark:text-slate-400 mt-1`}
              >
                {new Date(draft.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickActionsBar = () => {
  const { t } = useLocalization();
  const actions = [
    {
      id: 1,
      key: "dashboard.newBlogPost",
      default: "New Blog Post",
      Icon: FiEdit,
      path: "/smb/studio/blog/new",
    },
    {
      id: 2,
      key: "dashboard.uploadAsset",
      default: "Upload Asset",
      Icon: FiUploadCloud,
      path: "/smb/studio/assets",
    },
    {
      id: 3,
      key: "dashboard.viewAnalytics",
      default: "View Analytics",
      Icon: FiBarChart2,
      path: "/smb/studio/analytics",
    },
    {
      id: 4,
      key: "dashboard.viewSettings",
      default: "Settings",
      Icon: FiSettings,
      path: "/smb/studio/settings",
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {actions.map((action) => (
        <motion.div key={action.id} variants={cardVariants}>
          <Link
            to={action.path}
            className={`flex flex-col items-center justify-center p-4 text-center ${theme.surfaceMuted} dark:bg-slate-800 rounded-xl ${theme.cardShadow}/50 ${theme.cardHoverShadow} dark:hover:bg-slate-700 transition-all duration-200 ease-out transform hover:-translate-y-1 border ${theme.borderLight} dark:border-slate-700 h-full`}
          >
            {" "}
            {/* Added h-full for consistent height */}
            <action.Icon
              className={`w-7 h-7 sm:w-8 sm:h-8 mb-2 ${theme.textHighlight} dark:text-cyan-400`}
            />
            <span
              className={`text-xs sm:text-sm font-medium ${theme.textSecondary} dark:text-slate-300`}
            >
              {t(action.key, action.default)}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Main Dashboard Component
export default function SMBStudioDashboard() {
  const { t } = useLocalization();

  return (
    <div
      className={`min-h-screen ${theme.background} dark:bg-slate-900 p-4 sm:p-6 lg:p-8`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary} dark:text-white`}
          >
            {t("dashboard.title", "SMB Studio Dashboard")}
          </h1>
          <p className={`${theme.textSecondary} dark:text-slate-300 mt-1`}>
            {t(
              "dashboard.subtitle",
              "Welcome back! Here's your content and marketing hub."
            )}
          </p>
        </motion.div>

        <div className="mb-8">
          <QuickActionsBar />
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardCard
                title={t(
                  "dashboard.recentPosts",
                  "Recent Blog Post Performance"
                )}
                icon={<FiBarChart2 className={theme.accentCyan} />}
              >
                <RecentBlogPostPerformance />
              </DashboardCard>
              <DashboardCard
                title={t(
                  "dashboard.audienceGrowth",
                  "Audience Growth Overview"
                )}
                icon={<FiUsers className={theme.accentCyan} />}
              >
                <p className={`${theme.textMuted} dark:text-slate-400`}>
                  {t(
                    "dashboard.monthlyGrowth",
                    "Monthly audience growth trends"
                  )}
                </p>
                <ChartArea />
              </DashboardCard>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardCard
                title={t(
                  "dashboard.websiteTraffic",
                  "Website Traffic Highlights"
                )}
                icon={<FiGlobe className={theme.accentCyan} />}
              >
                {" "}
                {/* Changed to FiGlobeAlt */}
                <p className={`${theme.textMuted} dark:text-slate-400`}>
                  {t(
                    "dashboard.dataComingSoon",
                    "Website traffic data coming soon."
                  )}
                </p>
                <div className="mt-4 h-32 bg-slate-100 dark:bg-slate-700/50 rounded flex items-center justify-center text-sm text-slate-400">
                  Graph Area
                </div>
              </DashboardCard>
              <DashboardCard
                title={t(
                  "dashboard.socialEngagement",
                  "Social Media Engagement"
                )}
                icon={<FiMessageSquare className={theme.accentCyan} />}
              >
                {/* Changed to FiMessageSquare */}
                <p className={`${theme.textMuted} dark:text-slate-400`}>
                  {t(
                    "dashboard.dataComingSoon",
                    "Social engagement feed coming soon."
                  )}
                </p>
              </DashboardCard>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardCard
                title={t(
                  "dashboard.scheduledContent",
                  "Upcoming Scheduled Content"
                )}
                icon={<FiCalendar className={theme.accentCyan} />}
              >
                <p className={`${theme.textMuted} dark:text-slate-400`}>
                  {t(
                    "dashboard.dataComingSoon",
                    "Scheduled content overview coming soon."
                  )}
                </p>
              </DashboardCard>
              <DashboardCard
                title={t("dashboard.seoSnapshot", "SEO Keyword Snapshot")}
                icon={<FiSearch className={theme.accentCyan} />}
              >
                <p className={`${theme.textMuted} dark:text-slate-400`}>
                  {t(
                    "dashboard.dataComingSoon",
                    "SEO keyword snapshot coming soon."
                  )}
                </p>
              </DashboardCard>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <DashboardCard
              title={t("dashboard.assets.cardTitle", "Top Performing Assets")}
              icon={<FiAward className={theme.accentCyan} />}
            >
              <TopPerformingAssets />
            </DashboardCard>
            <DashboardCard
              title={t("dashboard.draftsIdeas", "Quick Drafts & Ideas")}
              icon={<FiActivity className={theme.accentCyan} />}
            >
              {" "}
              {/* Changed to FiActivity */}
              <QuickDraftsAndIdeas />
            </DashboardCard>
            <DashboardCard
              title={t("dashboard.tasks.cardTitle", "Your Task List")}
              icon={<FiCheckCircle className={theme.accentCyan} />}
            >
              <TaskList />
            </DashboardCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
