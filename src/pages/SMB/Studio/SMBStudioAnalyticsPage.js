// src/pages/smb/studio/SMBStudioAnalyticsPage.js (example path)
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocalization } from "../../../components/LocalizationContext";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

const MetricCard = ({
  t,
  titleKey,
  value,
  change,
  changeType,
  icon,
  defaultTitle,
}) => (
  <motion.div
    className={`${theme.surface} dark:bg-slate-800 p-5 rounded-xl shadow-lg border ${theme.borderLight} dark:border-slate-700`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center justify-between mb-1">
      <h3
        className={`text-sm font-medium ${theme.textSecondary} dark:text-slate-400`}
      >
        {t(titleKey, defaultTitle)}
      </h3>
      {icon && (
        <div className={`${theme.accentCyan} dark:text-cyan-400`}>{icon}</div>
      )}
    </div>
    <p className={`text-3xl font-bold ${theme.textPrimary} dark:text-white`}>
      {value}
    </p>
    {change && (
      <p
        className={`text-xs mt-1 ${
          changeType === "positive" ? theme.successText : theme.errorText
        }`}
      >
        {changeType === "positive" ? "↑" : "↓"} {change}
      </p>
    )}
  </motion.div>
);

const ChartPlaceholder = ({
  t,
  titleKey,
  defaultTitle,
  className = "h-64 md:h-80",
}) => (
  <div
    className={`${theme.surface} dark:bg-slate-800 p-5 rounded-xl shadow-lg border ${theme.borderLight} dark:border-slate-700 ${className} flex flex-col`}
  >
    <h4
      className={`text-md font-semibold ${theme.textPrimary} dark:text-white mb-3`}
    >
      {t(titleKey, defaultTitle)}
    </h4>
    <div
      className={`flex-grow ${theme.surfaceMuted} dark:bg-slate-700/50 rounded-md flex items-center justify-center`}
    >
      <p className={`${theme.textMuted} dark:text-slate-400 text-sm`}>
        {t("smbStudioAnalytics.chartPlaceholderText")}
      </p>
    </div>
  </div>
);

export default function SMBStudioAnalyticsPage() {
  const { t } = useLocalization();
  const [dateRange, setDateRange] = useState("last30Days"); // e.g., last7Days, last30Days, custom

  // Placeholder data - in a real app, this would come from an API based on dateRange
  const [kpiData, setKpiData] = useState({
    totalVisitors: "12,403",
    visitorsChange: "+5.2%",
    pageViews: "38,120",
    pageViewsChange: "+8.1%",
    bounceRate: "45.7%",
    bounceRateChange: "-2.0%",
    bounceRateType: "positive", // Lower bounce is good
    avgSessionDuration: "3m 15s",
    avgSessionDurationChange: "+12s",
    newLeads: "78",
    newLeadsChange: "+10",
  });

  const [topPages, setTopPages] = useState([
    {
      id: 1,
      title: "Our Awesome Product Page",
      views: "5,201",
      engagement: "4m 30s",
    },
    {
      id: 2,
      title: "Blog: Top 5 Tips for X",
      views: "3,870",
      engagement: "5m 10s",
    },
    { id: 3, title: "About Us", views: "2,100", engagement: "2m 15s" },
  ]);

  useEffect(() => {
    // Fetch analytics data based on dateRange
    console.log("Fetching data for range:", dateRange);
    // Mock data update:
    // setKpiData({...});
    // setTopPages([...]);
  }, [dateRange]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${theme.background} dark:bg-slate-900`}
    >
      {/* <Helmet><title>{t("smbStudioAnalytics.pageTitle")} - SMB Studio</title></Helmet> */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:flex md:items-center md:justify-between"
        >
          <div>
            <h1
              className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary} dark:text-white`}
            >
              {t("smbStudioAnalytics.mainTitle")}
            </h1>
            <p
              className={`mt-1 text-sm ${theme.textSecondary} dark:text-slate-300`}
            >
              {t("smbStudioAnalytics.mainSubtitle")}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className={`w-full md:w-auto text-sm ${theme.inputBg} dark:bg-slate-700 ${theme.inputBorder} dark:border-slate-600 rounded-md shadow-sm py-2 px-3 ${theme.inputFocusBorder} dark:focus:border-cyan-400 ${theme.inputFocusRing} dark:ring-offset-slate-900 ${theme.textPrimary} dark:text-slate-100`}
            >
              <option value="last7Days">
                {t("smbStudioAnalytics.last7Days")}
              </option>
              <option value="last30Days">
                {t("smbStudioAnalytics.last30Days")}
              </option>
              <option value="last90Days">
                {t("smbStudioAnalytics.last90Days")}
              </option>
              {/* <option value="custom">{t("smbStudioAnalytics.customRange")}</option> */}
            </select>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MetricCard
            t={t}
            titleKey="smbStudioAnalytics.kpiTotalVisitors"
            defaultTitle="Visitors"
            value={kpiData.totalVisitors}
            change={kpiData.visitorsChange}
            changeType="positive"
          />
          <MetricCard
            t={t}
            titleKey="smbStudioAnalytics.kpiPageViews"
            defaultTitle="Page Views"
            value={kpiData.pageViews}
            change={kpiData.pageViewsChange}
            changeType="positive"
          />
          <MetricCard
            t={t}
            titleKey="smbStudioAnalytics.kpiBounceRate"
            defaultTitle="Bounce Rate"
            value={kpiData.bounceRate}
            change={kpiData.bounceRateChange}
            changeType={kpiData.bounceRateType || "negative"}
          />
          <MetricCard
            t={t}
            titleKey="smbStudioAnalytics.kpiAvgSessionDuration"
            defaultTitle="Avg. Session"
            value={kpiData.avgSessionDuration}
            change={kpiData.avgSessionDurationChange}
            changeType="positive"
          />
          <MetricCard
            t={t}
            titleKey="smbStudioAnalytics.kpiNewLeads"
            defaultTitle="New Leads"
            value={kpiData.newLeads}
            change={kpiData.newLeadsChange}
            changeType="positive"
          />
        </motion.div>

        {/* Main Analytics Sections */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Website Traffic Overview */}
          <motion.section variants={itemVariants}>
            <h2
              className={`text-xl font-semibold ${theme.textPrimary} dark:text-white mb-4`}
            >
              {t("smbStudioAnalytics.websiteTrafficSectionTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartPlaceholder
                t={t}
                titleKey="smbStudioAnalytics.trafficOverTimeChartTitle"
                defaultTitle="Visitors Over Time"
              />
              <ChartPlaceholder
                t={t}
                titleKey="smbStudioAnalytics.trafficSourcesChartTitle"
                defaultTitle="Top Traffic Sources"
              />
            </div>
          </motion.section>

          {/* Content Performance */}
          <motion.section variants={itemVariants}>
            <h2
              className={`text-xl font-semibold ${theme.textPrimary} dark:text-white mb-4`}
            >
              {t("smbStudioAnalytics.contentPerformanceSectionTitle")}
            </h2>
            <div
              className={`${theme.surface} dark:bg-slate-800 p-5 rounded-xl shadow-lg border ${theme.borderLight} dark:border-slate-700`}
            >
              <h3
                className={`text-md font-semibold ${theme.textPrimary} dark:text-white mb-3`}
              >
                {t("smbStudioAnalytics.topPagesTableTitle")}
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#d4d2cb]/50 dark:divide-slate-700">
                  <thead
                    className={`${theme.surfaceMuted} dark:bg-slate-700/50`}
                  >
                    <tr>
                      <th
                        scope="col"
                        className={`px-4 py-3 text-left text-xs font-medium ${theme.textSecondary} dark:text-slate-300 uppercase tracking-wider`}
                      >
                        {t("smbStudioAnalytics.pageColumnHeader")}
                      </th>
                      <th
                        scope="col"
                        className={`px-4 py-3 text-left text-xs font-medium ${theme.textSecondary} dark:text-slate-300 uppercase tracking-wider`}
                      >
                        {t("smbStudioAnalytics.viewsColumnHeader")}
                      </th>
                      <th
                        scope="col"
                        className={`px-4 py-3 text-left text-xs font-medium ${theme.textSecondary} dark:text-slate-300 uppercase tracking-wider`}
                      >
                        {t("smbStudioAnalytics.engagementColumnHeader")}
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`${theme.surface} dark:bg-slate-800 divide-y divide-[#d4d2cb]/30 dark:divide-slate-700/50`}
                  >
                    {topPages.map((page) => (
                      <tr key={page.id}>
                        <td
                          className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${theme.textPrimary} dark:text-slate-100`}
                        >
                          {page.title}
                        </td>
                        <td
                          className={`px-4 py-3 whitespace-nowrap text-sm ${theme.textSecondary} dark:text-slate-300`}
                        >
                          {page.views}
                        </td>
                        <td
                          className={`px-4 py-3 whitespace-nowrap text-sm ${theme.textSecondary} dark:text-slate-300`}
                        >
                          {page.engagement}
                        </td>
                      </tr>
                    ))}
                    {topPages.length === 0 && (
                      <tr>
                        <td
                          colSpan="3"
                          className={`px-4 py-3 text-center text-sm ${theme.textMuted} dark:text-slate-400`}
                        >
                          {t("smbStudioAnalytics.tableNoData")}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* Audience Insights (Simplified) */}
          <motion.section variants={itemVariants}>
            <h2
              className={`text-xl font-semibold ${theme.textPrimary} dark:text-white mb-4`}
            >
              {t("smbStudioAnalytics.audienceInsightsSectionTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {" "}
              {/* Could be 1 or 2 cols */}
              <ChartPlaceholder
                t={t}
                titleKey="smbStudioAnalytics.newVsReturningChartTitle"
                defaultTitle="New vs. Returning Visitors"
              />
            </div>
          </motion.section>
        </motion.div>
        <div
          className={`mt-12 text-center ${theme.textMuted} dark:text-slate-400 text-sm`}
        >
          <p>{t("smbStudioAnalytics.comingSoon")}</p>
        </div>
      </div>
    </div>
  );
}
