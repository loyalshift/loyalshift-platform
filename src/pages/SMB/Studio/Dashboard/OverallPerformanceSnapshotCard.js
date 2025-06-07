// src/components/smb/studio/OverallPerformanceSnapshotCard.js
import React, { useState, useEffect } from 'react';
import { useLocalization } from '../../../LocalizationContext';
import defaultSMBTheme from '../../../../themes/defaultSMBTheme';

// --- Icons ---
const IconTrendingUp = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const IconTrendingDown = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const IconActivity = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const IconInformationCircle = ({ className = "" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
// --- End of Icons ---

const TrendIndicator = ({ value, goodThreshold = 0 }) => {
  if (value > goodThreshold) {
    return <IconTrendingUp className="w-4 h-4 text-green-500" />;
  } else if (value < goodThreshold) {
    return <IconTrendingDown className="w-4 h-4 text-red-500" />;
  }
  return <span className="text-gray-500">-</span>;
};

const HealthScoreVisual = ({ score }) => {
  const { t } = useLocalization();
  
  // Determine health status based on score
  let statusClass = "";
  let statusLabel = "";
  
  if (score >= 80) {
    statusClass = "text-green-600 bg-green-50 border-green-200";
    statusLabel = t('dashboard.healthScore.status.excellent', 'Excellent');
  } else if (score >= 60) {
    statusClass = "text-blue-600 bg-blue-50 border-blue-200";
    statusLabel = t('dashboard.healthScore.status.good', 'Good');
  } else if (score >= 40) {
    statusClass = "text-yellow-600 bg-yellow-50 border-yellow-200";
    statusLabel = t('dashboard.healthScore.status.average', 'Average');
  } else {
    statusClass = "text-red-600 bg-red-50 border-red-200";
    statusLabel = t('dashboard.healthScore.status.needsAttention', 'Needs Attention');
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 ${statusClass}`}>
        <span className="text-3xl font-bold">{score}</span>
        <span className="text-xs">{t('dashboard.healthScore.outOf100', '/ 100')}</span>
      </div>
      <p className={`mt-2 text-sm font-semibold ${statusClass.split(' ')[0]}`}>
        {statusLabel}
      </p>
    </div>
  );
};

export default function OverallPerformanceSnapshotCard() {
  const { t } = useLocalization();
  const [snapshotData, setSnapshotData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const healthScore = Math.floor(Math.random() * 60) + 40;
      setSnapshotData({
        healthScore: healthScore,
        lastUpdated: new Date().toLocaleDateString(undefined, { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        kpis: [
          {
            id: 'audienceGrowth',
            labelKey: 'dashboard.healthScore.kpi.audienceGrowth',
            defaultLabel: 'Audience Growth',
            value: `${(Math.random() * 10 - 3).toFixed(1)}%`,
            rawValue: (Math.random() * 10 - 3),
            infoKey: 'dashboard.healthScore.kpiTooltip.audienceGrowth',
            defaultInfo: 'Combined growth across all connected platforms'
          },
          {
            id: 'contentEngagement',
            labelKey: 'dashboard.healthScore.kpi.contentEngagement',
            defaultLabel: 'Content Engagement',
            value: `${(Math.random() * 15 - 5).toFixed(1)}%`,
            rawValue: (Math.random() * 15 - 5),
            infoKey: 'dashboard.healthScore.kpiTooltip.contentEngagement',
            defaultInfo: 'Engagement rate across recent content'
          },
          {
            id: 'websiteVisitors',
            labelKey: 'dashboard.healthScore.kpi.websiteVisitors',
            defaultLabel: 'Website Visitors',
            value: `${(Math.random() * 20 - 8).toFixed(1)}%`,
            rawValue: (Math.random() * 20 - 8),
            infoKey: 'dashboard.healthScore.kpiTooltip.websiteVisitors',
            defaultInfo: 'Change in unique website visitors'
          },
          {
            id: 'conversionRate',
            labelKey: 'dashboard.healthScore.kpi.conversionRate',
            defaultLabel: 'Lead Conversion',
            value: `${(Math.random() * 5 - 2).toFixed(1)}%`,
            rawValue: (Math.random() * 5 - 2),
            infoKey: 'dashboard.healthScore.kpiTooltip.conversionRate',
            defaultInfo: 'Change in lead conversion rate'
          },
        ],
      });
      setIsLoading(false);
    };

    fetchData();
  }, [t]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex justify-center">
            <div className="h-32 w-32 bg-gray-200 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!snapshotData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center py-12">
        <p className="text-red-500 font-medium">
          {t('dashboard.healthScore.errorLoading', 'Could not load performance data')}
        </p>
        <button className="mt-4 text-cyan-600 hover:text-cyan-700 font-medium">
          {t('dashboard.retry', 'Try again')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {t('dashboard.healthScore.title', 'Studio Health Snapshot')}
            </h3>
            <p className="text-sm text-gray-500">
              {t('dashboard.healthScore.lastUpdated', 'Updated:')} {snapshotData.lastUpdated}
            </p>
          </div>
          <div className="bg-cyan-50 p-2 rounded-full">
            <IconActivity className="w-6 h-6 text-cyan-600" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex justify-center">
            <HealthScoreVisual score={snapshotData.healthScore} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {snapshotData.kpis.map((kpi) => (
              <div key={kpi.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">
                      {t(kpi.labelKey, kpi.defaultLabel)}
                    </span>
                    <div className="group relative">
                      <IconInformationCircle className="w-4 h-4 text-gray-400 cursor-pointer" />
                      <div className="absolute z-10 left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {t(kpi.infoKey, kpi.defaultInfo)}
                      </div>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${kpi.rawValue > 0 ? 'text-green-600' : kpi.rawValue < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {kpi.value}
                  </span>
                </div>
                
                <div className="flex items-center mt-2">
                  <TrendIndicator value={kpi.rawValue} />
                  <span className="text-xs text-gray-500 ml-2">
                    {t('dashboard.healthScore.wow', 'vs last week')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            {t('dashboard.healthScore.dataNote', 'Aggregated data from connected services')}
          </p>
          <div className="mt-3 flex justify-center">
            <button className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center">
              {t('dashboard.healthScore.viewReport', 'View detailed report')}
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
