// src/components/smb/studio/ChartSystem.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartComponent = ({
  type = "line",
  title,
  data,
  options = {},
  className = "h-64 md:h-80",
  theme = "light"
}) => {
  // Apply theme settings
  const isDark = theme === "dark";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
  const textColor = isDark ? "#E2E8F0" : "#4A5568";
  
  // Default options for all charts
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          usePointStyle: true,
          boxWidth: 8,
          padding: 20
        }
      },
      title: {
        display: !!title,
        text: title,
        color: textColor,
        font: {
          size: 16,
          weight: "600"
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
        titleColor: isDark ? "#CBD5E1" : "#4A5568",
        bodyColor: isDark ? "#E2E8F0" : "#2D3748",
        borderColor: isDark ? "#334155" : "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y || context.parsed;
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      ...(type === "line" || type === "bar" ? {
        x: {
          grid: {
            color: gridColor,
            drawBorder: false
          },
          ticks: {
            color: textColor
          }
        },
        y: {
          grid: {
            color: gridColor,
            drawBorder: false
          },
          ticks: {
            color: textColor
          }
        }
      } : {})
    }
  };

  // Merge custom options with defaults
  const chartOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...(options.plugins || {})
    }
  };

  // Select chart type
  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line data={data} options={chartOptions} />;
      case "bar":
        return <Bar data={data} options={chartOptions} />;
      case "pie":
        return <Pie data={data} options={chartOptions} />;
      case "doughnut":
        return <Doughnut data={data} options={chartOptions} />;
      default:
        return <Line data={data} options={chartOptions} />;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="h-full w-full">
        {renderChart()}
      </div>
    </div>
  );
};

// Pre-configured chart types
export const LineChart = (props) => (
  <ChartComponent type="line" {...props} />
);

export const BarChart = (props) => (
  <ChartComponent type="bar" {...props} />
);

export const PieChart = (props) => (
  <ChartComponent type="pie" {...props} />
);

export const DoughnutChart = (props) => (
  <ChartComponent type="doughnut" {...props} />
);

// Helper function to create chart data
export const createChartData = (labels, datasets, options = {}) => {
  return {
    labels,
    datasets: datasets.map(ds => ({
      ...ds,
      backgroundColor: ds.backgroundColor || "#4F46E5",
      borderColor: ds.borderColor || "#4F46E5",
      pointBackgroundColor: ds.pointBackgroundColor || "#FFFFFF",
      pointBorderColor: ds.pointBorderColor || "#4F46E5",
      pointBorderWidth: ds.pointBorderWidth || 2,
      borderWidth: ds.borderWidth || 2,
      pointRadius: ds.pointRadius || 4,
      tension: ds.tension || 0.3,
      fill: ds.fill || false,
      ...options
    }))
  };
};

// Example usage in dashboard:
/*
import { LineChart, BarChart, createChartData } from "./ChartSystem";

const trafficData = createChartData(
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  [
    {
      label: "Website Visitors",
      data: [12000, 19000, 15000, 18000, 22000, 24000],
      fill: true,
      backgroundColor: "rgba(79, 70, 229, 0.1)",
      borderColor: "#4F46E5"
    },
    {
      label: "Returning Visitors",
      data: [8000, 12000, 10000, 14000, 16000, 18000],
      borderColor: "#10B981",
      backgroundColor: "rgba(16, 185, 129, 0.1)"
    }
  ]
);

<LineChart 
  title="Website Traffic Trends"
  data={trafficData}
  className="h-80"
/>

const socialMediaData = createChartData(
  ["Facebook", "Instagram", "Twitter", "LinkedIn"],
  [
    {
      label: "Engagement Rate",
      data: [12, 19, 8, 5],
      backgroundColor: [
        "#3B82F6",
        "#8B5CF6",
        "#10B981",
        "#F59E0B"
      ]
    }
  ]
);

<DoughnutChart
  title="Social Media Engagement"
  data={socialMediaData}
  options={{
    plugins: {
      legend: {
        position: "right"
      }
    }
  }}
/>
*/
