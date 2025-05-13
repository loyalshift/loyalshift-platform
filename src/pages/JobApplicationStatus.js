// src/pages/JobApplicationStatusPage.js
// Page dedicated to displaying the status of a job application using an applicationId.
// UPDATED: Uses new URL structure /job-application/:applicationId/status
// Uses LoyalShift Dark Theme.
// Current time: Tuesday, May 6, 2025 at 1:25 PM CST.

import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiEye,
  FiClock,
  FiLoader,
  FiAlertCircle,
  FiArrowLeft,
  FiInfo,
  FiFileText,
  FiShare2,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// Reusable Components (ensure paths are correct)
import Button from "../components/Button";
import Section from "../components/Section";
import { jobOpenings } from "../data/jobs"; // Assuming jobs data is imported for job title
import StyledOutlineButton from "../components/StyledOutlineButton";

// --- Dark Theme Color Palette ---
const colors = {
  background: "bg-slate-900",
  surface: "bg-slate-800",
  surfaceMuted: "bg-slate-800/70 backdrop-blur-sm",
  primary: "text-cyan-400",
  secondary: "text-slate-400",
  textPrimary: "text-slate-100",
  textWhite: "text-white",
  border: "border-slate-700",
  borderAccent: "border-cyan-500/50",
  iconColor: "text-cyan-400",
  accentSuccess: "text-lime-400",
  accentError: "text-red-400",
  buttonPrimaryBg: "bg-gradient-to-r from-cyan-500 to-blue-500",
  buttonPrimaryHover: "hover:from-cyan-400 hover:to-blue-400",
  neonGlowCyan: "shadow-[0_0_15px_rgba(34,211,238,0.4)]",
  buttonSecondaryBorder: "border-cyan-500",
  buttonSecondaryText: "text-cyan-400",
  buttonSecondaryHoverBg: "hover:bg-cyan-500/10",
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Main Job Application Status Page Component ---
export default function JobApplicationStatusPage() {
  const { applicationId } = useParams(); // Only applicationId from params now
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState(""); // To store job title
  const [jobContextId, setJobContextId] = useState(""); // To store original jobId for links
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to generate the shareable link
  const getShareableLink = () => {
    // The URL now doesn't inherently contain jobId, so we use jobContextId if needed for other links
    return `${window.location.origin}/job-application/${applicationId}/status`;
  };

  useEffect(() => {
    setStatusLoading(true);
    setError(null);
    setJobTitle("");
    setJobContextId("");
    console.log(`Fetching status for Application ID: ${applicationId}`);

    const fetchStatusAndJobInfo = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

        // Retrieve stored application data which should include status and jobId
        const storedAppDataString = localStorage.getItem(
          `application_data_${applicationId}`
        );
        if (storedAppDataString) {
          const storedAppData = JSON.parse(storedAppDataString);
          setApplicationStatus(storedAppData.status);
          setJobContextId(storedAppData.jobId); // Store the original jobId

          // Find job title using the stored jobId
          const relatedJob = jobOpenings.find(
            (j) => j.id === storedAppData.jobId
          );
          if (relatedJob) {
            setJobTitle(relatedJob.title);
          } else {
            // Job title might not be critical if application ID is the primary reference
            console.warn(
              `Job details for jobId ${storedAppData.jobId} not found, but status retrieved.`
            );
            setJobTitle("General Application"); // Fallback title
          }
        } else {
          setError(
            "Application status not found. This link may be invalid or the application was not completed."
          );
        }
      } catch (err) {
        console.error("Error fetching status:", err);
        setError(
          "Could not retrieve application status due to a system error."
        );
      } finally {
        setStatusLoading(false);
      }
    };

    if (applicationId) {
      fetchStatusAndJobInfo();
    } else {
      setError("Application ID is missing from the link.");
      setStatusLoading(false);
    }
  }, [applicationId]); // Rerun only if applicationId changes

  const handleRefreshStatus = async () => {
    if (!applicationId) return;

    setStatusLoading(true);
    setError(null);
    const toastId = toast.loading("Checking for updates...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const statuses = [
        "Under Review",
        "Interview Scheduled",
        "Technical Assessment",
        "Final Consideration",
        "Offer Extended",
        "Process Completed",
        "Not Selected",
      ];
      const currentStatusIndex = statuses.indexOf(applicationStatus);
      let nextStatus = applicationStatus;

      if (applicationStatus === "Application Received") {
        nextStatus = statuses[0];
      } else if (
        currentStatusIndex > -1 &&
        currentStatusIndex < statuses.length - 1
      ) {
        nextStatus = statuses[currentStatusIndex + 1];
      } else if (
        applicationStatus === "Process Completed" ||
        applicationStatus === "Not Selected"
      ) {
        toast.success("No further updates at this time.", { id: toastId });
        setStatusLoading(false);
        return;
      }

      setApplicationStatus(nextStatus);
      // Update localStorage with the new status and existing jobId
      const currentAppDataString = localStorage.getItem(
        `application_data_${applicationId}`
      );
      if (currentAppDataString) {
        const currentAppData = JSON.parse(currentAppDataString);
        localStorage.setItem(
          `application_data_${applicationId}`,
          JSON.stringify({ ...currentAppData, status: nextStatus })
        );
      }
      toast.success(`Status updated: ${nextStatus}`, { id: toastId });
    } catch (err) {
      toast.error("Failed to refresh status.", { id: toastId });
    } finally {
      setStatusLoading(false);
    }
  };

  const handleShareLink = () => {
    const link = getShareableLink();
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Status link copied to clipboard!"))
      .catch((err) => {
        toast.error("Failed to copy link.");
        console.error("Failed to copy link: ", err);
      });
  };

  if (statusLoading) {
    return (
      <div
        className={`${colors.background} min-h-screen flex flex-col items-center justify-center text-center p-8`}
      >
        <FiLoader
          className={`w-12 h-12 ${colors.iconColor} animate-spin mx-auto mb-4`}
        />
        <p className={`${colors.textSecondary}`}>
          Loading application status...
        </p>
      </div>
    );
  }

  if (error) {
    return (
        <div className={`${colors.background} min-h-screen flex flex-col items-center justify-center text-center p-8`}>
        <FiAlertCircle className={`w-16 h-16 ${colors.accentError} mb-4`} /> {/* Used accentError for icon */}
        <h1 className={`text-2xl font-bold ${colors.textPrimary} mb-2`}>Error Retrieving Status</h1>
        <p className={`${colors.textSecondary} mb-6`}>{error}</p>
        <StyledOutlineButton
            to="/careers"
            icon={<FiArrowLeft />}
            size="base" // Making it slightly smaller than typical 'lg'
            // Using default cyan outline colors from StyledOutlineButton for now
            // Or you could pass specific error-themed colors:
            // textColorClass="text-yellow-400"
            // borderColorClass="border-yellow-400"
            // hoverBgClass="hover:bg-yellow-400/10"
            // hoverTextColorClass="hover:text-yellow-300"
            // hoverBorderColorClass="hover:border-yellow-300"
        >
            Back to Careers
        </StyledOutlineButton>
    </div>
    );
  }

  return (
    <div
      className={`${colors.background} ${colors.textPrimary} min-h-screen py-16 md:py-20`}
    >
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: colors.surface,
            color: colors.textPrimary,
            border: `1px solid ${colors.border}`,
          },
        }}
      />
      <Section bg="bg-transparent" ariaLabelledby="status-page-title">
        <motion.div
          className={`max-w-2xl mx-auto ${colors.surface} p-6 md:p-10 rounded-xl shadow-2xl border ${colors.border} ${colors.neonGlowCyan}`}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="text-center mb-8">
            <FiEye
              className={`w-16 h-16 ${colors.iconColor} mx-auto mb-6 opacity-80`}
            />
            <h1
              id="status-page-title"
              className={`text-3xl font-bold ${colors.textWhite} mb-2`}
            >
              Application Status
            </h1>
            {jobTitle && (
              <p className={`${colors.secondary} text-sm`}>For: {jobTitle}</p>
            )}
            {applicationId && (
              <p className={`${colors.secondary} text-xs mt-1`}>
                Ref ID: {applicationId}
              </p>
            )}
          </div>

          {!applicationStatus && ( // Case where application ID is valid but no status data found
            <div
              className={`text-center py-10 px-4 rounded-lg ${colors.surfaceMuted} border ${colors.border}`}
            >
              <FiInfo
                className={`w-12 h-12 ${colors.secondary} mx-auto mb-4`}
              />
              <p className={`${colors.textSecondary} text-lg`}>
                Application data not found.
              </p>
              <p className={`${colors.textSecondary} text-sm mt-2 mb-6`}>
                This link may be invalid or the application details are missing.
              </p>
              {jobContextId && ( // Use jobContextId to link back to application form
                <Button
                  to={`/jobs/${jobContextId}/application`}
                  variant="primary"
                  icon={<FiFileText />}
                >
                  Re-apply for {jobTitle || "this position"}
                </Button>
              )}
            </div>
          )}

          {applicationStatus && ( // Only show this block if status is successfully loaded
            <motion.div
              key="statusDisplayContent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-10 px-4 rounded-lg ${colors.surfaceMuted} border ${colors.border}`}
            >
              <h2 className={`text-2xl font-semibold ${colors.textWhite} mb-3`}>
                Current Status:
              </h2>
              <p className={`text-4xl font-bold ${colors.primary} mb-6`}>
                {applicationStatus}
              </p>
              <p
                className={`${colors.textSecondary} text-sm mb-8 max-w-md mx-auto`}
              >
                We appreciate your interest in LoyalShift. Your application is
                being processed. You can use the link to this page to check for
                updates.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  onClick={handleRefreshStatus}
                  variant="secondary"
                  size="base"
                  icon={
                    statusLoading ? (
                      <FiLoader className="animate-spin" />
                    ) : (
                      <FiClock />
                    )
                  }
                  disabled={statusLoading}
                  className={`border ${colors.buttonSecondaryBorder} ${colors.buttonSecondaryText} ${colors.buttonSecondaryHoverBg}`}
                >
                  {statusLoading ? "Checking..." : "Refresh Status"}
                </Button>
                <Button
                  onClick={handleShareLink}
                  variant="secondary"
                  size="base"
                  icon={<FiShare2 />}
                  className={`border ${colors.buttonSecondaryBorder} ${colors.buttonSecondaryText} ${colors.buttonSecondaryHoverBg}`}
                >
                  Copy Status Link
                </Button>
              </div>
            </motion.div>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/careers"
              className={`text-sm ${colors.secondary} hover:${colors.primary} transition-colors inline-flex items-center`}
            >
              <FiArrowLeft className="w-4 h-4 mr-1.5" /> Back to All Job
              Openings
            </Link>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}

// --- PropTypes ---
JobApplicationStatusPage.propTypes = {};
Section.propTypes = {
  children: PropTypes.node.isRequired,
  bg: PropTypes.string,
  ariaLabelledby: PropTypes.string,
  className: PropTypes.string,
};
