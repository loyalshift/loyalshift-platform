// src/pages/smb/studio/SMBStudioSettingsPage.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiGlobe,
  FiEdit3,
  FiLink2,
  FiSettings,
  FiTrash2,
  FiSave,
  FiAlertTriangle,
  FiCheck,
  FiPlus,
} from "react-icons/fi";
import toast from "react-hot-toast";

import { useLocalization } from "../../../components/LocalizationContext";

import Button from "../../../components/Button";

import InputField from "../../InputField";
import ToggleSwitch from "./ToggleSwitch";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// Animation Variants
const tabContentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

const SETTINGS_TABS = [
  {
    id: "businessProfile",
    labelKey: "settingsPage.tabBusinessProfile",
    defaultLabel: "Business Profile",
    icon: <FiUser className="w-5 h-5" />,
    color: "text-indigo-500",
  },
  {
    id: "websiteBranding",
    labelKey: "settingsPage.tabWebsiteBranding",
    defaultLabel: "Website & Branding",
    icon: <FiGlobe className="w-5 h-5" />,
    color: "text-emerald-500",
  },
  {
    id: "contentSettings",
    labelKey: "settingsPage.tabContentSettings",
    defaultLabel: "Content",
    icon: <FiEdit3 className="w-5 h-5" />,
    color: "text-amber-500",
  },
  {
    id: "integrations",
    labelKey: "settingsPage.tabIntegrations",
    defaultLabel: "Integrations",
    icon: <FiLink2 className="w-5 h-5" />,
    color: "text-purple-500",
  },
  {
    id: "account",
    labelKey: "settingsPage.tabAccount",
    defaultLabel: "Account",
    icon: <FiSettings className="w-5 h-5" />,
    color: "text-rose-500",
  },
];

export default function SMBStudioSettingsPage() {
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState("businessProfile");
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state management
  const [formData, setFormData] = useState({
    businessProfile: {
      businessName: "My Awesome SMB",
      tagline: "Delivering excellence daily",
      publicEmail: "contact@mysmb.com",
      websiteUrl: "https://mysmb.loyalshift.site",
    },
    websiteBranding: {
      siteTitle: "My Awesome SMB",
      primaryColor: "#06B6D4",
      logoUrl: "",
    },
    contentSettings: {
      blogPageTitle: "Our Insights",
      postsPerPage: 5,
    },
    integrations: [{ id: "ga", name: "Google Analytics", status: "connected" }],
    account: {
      studioLanguage: "en",
      emailForNewLeads: true,
    },
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHasChanges(false);
      toast.success(
        t("settingsPage.saveSuccess", "Settings saved successfully!"),
        {
          icon: <FiCheck className="text-green-500" />,
        }
      );
    } finally {
      setIsSaving(false);
    }
  };

  const renderTabContent = () => {
    const currentData = formData[activeTab];

    const renderSection = (title, fields) => (
      <div className="mb-8">
        <h3
          className={`text-lg font-semibold ${theme.textPrimary} mb-4 pb-2 border-b ${theme.borderLight}`}
        >
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{fields}</div>
      </div>
    );

    switch (activeTab) {
      case "businessProfile":
        return (
          <motion.div variants={tabContentVariants} className="space-y-8">
            {renderSection(
              t("settingsPage.businessProfile.title", "Business Information"),
              [
                <InputField
                  key="businessName"
                  label="Business Name"
                  value={currentData.businessName}
                  onChange={(e) =>
                    handleChange(activeTab, "businessName", e.target.value)
                  }
                />,
                <InputField
                  key="publicEmail"
                  label="Public Email"
                  type="email"
                  value={currentData.publicEmail}
                  onChange={(e) =>
                    handleChange(activeTab, "publicEmail", e.target.value)
                  }
                />,
                <InputField
                  key="websiteUrl"
                  label="Website URL"
                  type="url"
                  value={currentData.websiteUrl}
                  onChange={(e) =>
                    handleChange(activeTab, "websiteUrl", e.target.value)
                  }
                />,
                <div key="tagline" className="md:col-span-2">
                  <InputField
                    label="Tagline"
                    type="textarea"
                    rows={2}
                    value={currentData.tagline}
                    onChange={(e) =>
                      handleChange(activeTab, "tagline", e.target.value)
                    }
                  />
                </div>,
              ]
            )}
          </motion.div>
        );

      case "websiteBranding":
        return (
          <motion.div variants={tabContentVariants} className="space-y-8">
            {renderSection(
              t("settingsPage.websiteBranding.title", "Brand Identity"),
              [
                <div key="logo" className="md:col-span-2">
                  <label
                    className={`block text-sm font-medium ${theme.textSecondary} mb-2`}
                  >
                    {t("settingsPage.websiteBranding.logo", "Logo")}
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-md bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center">
                      {currentData.logoUrl ? (
                        <img
                          src={currentData.logoUrl}
                          alt="Logo"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">Upload</span>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      {currentData.logoUrl ? "Change Logo" : "Upload Logo"}
                    </Button>
                  </div>
                </div>,
                <InputField
                  key="siteTitle"
                  label="Website Title"
                  value={currentData.siteTitle}
                  onChange={(e) =>
                    handleChange(activeTab, "siteTitle", e.target.value)
                  }
                />,
                <div key="primaryColor" className="flex flex-col">
                  <label
                    className={`text-sm font-medium ${theme.textSecondary} mb-2`}
                  >
                    Primary Brand Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={currentData.primaryColor}
                      onChange={(e) =>
                        handleChange(activeTab, "primaryColor", e.target.value)
                      }
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <span className="text-sm font-mono">
                      {currentData.primaryColor}
                    </span>
                  </div>
                </div>,
              ]
            )}
          </motion.div>
        );

      case "integrations":
        return (
          <motion.div variants={tabContentVariants} className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>
                {t("settingsPage.integrations.title", "Connected Services")}
              </h3>
              <Button
                variant="primary"
                size="sm"
                icon={<FiPlus className="w-4 h-4" />}
              >
                Add Integration
              </Button>
            </div>

            {currentData.length === 0 ? (
              <div
                className={`p-8 text-center rounded-lg ${theme.surfaceMuted}`}
              >
                <p className={`${theme.textSecondary} mb-4`}>
                  No integrations connected yet
                </p>
                <Button variant="primary">Connect Your First Service</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentData.map((integration) => (
                  <div
                    key={integration.id}
                    className={`p-4 rounded-lg border ${theme.borderLight} ${theme.surfaceCard}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-medium ${theme.textPrimary}`}>
                        {integration.name}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          integration.status === "connected"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {integration.status}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        );

      case "account":
        return (
          <motion.div variants={tabContentVariants} className="space-y-8">
            {renderSection(
              t("settingsPage.account.title", "Account Settings"),
              [
                <div key="language" className="md:col-span-2">
                  <InputField
                    label="Studio Language"
                    type="select"
                    value={currentData.studioLanguage}
                    onChange={(e) =>
                      handleChange(activeTab, "studioLanguage", e.target.value)
                    }
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </InputField>
                </div>,
                <ToggleSwitch
                  key="emailLeads"
                  label="Email notifications for new leads"
                  checked={currentData.emailForNewLeads}
                  onChange={(checked) =>
                    handleChange(activeTab, "emailForNewLeads", checked)
                  }
                />,
              ]
            )}

            {/* Danger Zone */}
            <div className={`mt-12 pt-6 border-t ${theme.borderLight}`}>
              <h3
                className={`text-lg font-semibold flex items-center gap-2 mb-4 text-red-600`}
              >
                <FiAlertTriangle className="w-5 h-5" />
                {t("settingsPage.account.dangerZoneTitle", "Danger Zone")}
              </h3>
              <div className={`p-4 rounded-lg bg-red-50 border border-red-100`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className={`font-medium ${theme.textPrimary}`}>
                      Delete Account
                    </h4>
                    <p className={`text-sm ${theme.textSecondary} mt-1`}>
                      This will permanently delete all your data and cannot be
                      undone.
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<FiTrash2 className="w-4 h-4" />}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${theme.background}`}
    >
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="mb-6">
          <h1 className={`text-3xl font-bold ${theme.textPrimary}`}>
            {t("settingsPage.mainTitle", "Studio Settings")}
          </h1>
          <p className={`${theme.textSecondary} mt-2 max-w-3xl`}>
            {t(
              "settingsPage.mainSubtitle",
              "Configure your business profile, website appearance, content settings, and account details."
            )}
          </p>
        </div>

        {/* Main Settings Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tab Navigation */}
          <div className="w-full lg:w-64 shrink-0">
            <nav className="space-y-1">
              {SETTINGS_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${
                      activeTab === tab.id
                        ? `${theme.accentCyanBg} text-white shadow-sm`
                        : `${theme.textSecondary} hover:bg-gray-50 dark:hover:bg-gray-800`
                    }`}
                >
                  <span className={tab.color}>{tab.icon}</span>
                  {t(tab.labelKey, tab.defaultLabel)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content Area */}
          <div
            className={`flex-1 ${theme.surfaceCard} p-6 sm:p-8 rounded-xl shadow-sm border ${theme.borderLight}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
                transition={{ duration: 0.2 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Save Bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={`fixed bottom-0 left-0 right-0 py-4 px-6 ${theme.surface} border-t ${theme.border} shadow-lg z-50`}
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <FiAlertTriangle className="w-5 h-5 text-amber-500" />
                <span className={`text-sm ${theme.textPrimary}`}>
                  {t("settingsPage.unsavedChanges", "You have unsaved changes")}
                </span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setHasChanges(false)}
                  className="w-full sm:w-auto"
                >
                  Discard Changes
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveChanges}
                  loading={isSaving}
                  className="w-full sm:w-auto"
                  icon={<FiSave className="w-4 h-4" />}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
