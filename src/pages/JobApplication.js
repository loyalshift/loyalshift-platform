// src/pages/JobApplicationPage.js
// Page for job application submission and status tracking.
// UPDATED: Form layout changed to two columns on medium screens and up.
// Uses LoyalShift Dark Theme.
// Current time: Tuesday, May 6, 2025 at 12:58 PM CST.

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import {
    FiFileText, FiUploadCloud, FiUser, FiMail, FiPhone, FiLink, FiSend,
    FiLoader, FiCheckCircle, FiAlertCircle, FiInfo, FiArrowLeft, FiClock,
    FiEye // for status view
} from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

// Reusable Components (ensure paths are correct)
import Button from '../components/Button';
import InputField from '../components/InputField';
import Section from '../components/Section'; // Assuming Section component exists
import { jobOpenings } from '../data/jobs'; // Assuming jobs data is imported

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
  inputBg: "bg-slate-700/50",
  inputBorder: "border-slate-600",
  inputFocusBorder: "focus:border-cyan-500",
  inputFocusRing: "focus:ring-cyan-500/50",
  buttonSecondaryBorder: "border-cyan-500",
  buttonSecondaryText: "text-cyan-400",
  buttonSecondaryHoverBg: "hover:bg-cyan-500/10",
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }};
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } }};
const formStepVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.3 } }
};


// --- Main Job Application Page Component ---
export default function JobApplicationPage() {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const job = useMemo(() => jobOpenings.find(j => j.id === jobId), [jobId]);

    const [submissionPhase, setSubmissionPhase] = useState('form');
    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '',
        portfolioLink: '', coverLetterSnippet: '',
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeFileName, setResumeFileName] = useState('');
    const [applicationStatus, setApplicationStatus] = useState(null);
    const [statusLoading, setStatusLoading] = useState(false);

    useEffect(() => {
        // Placeholder for fetching existing application status
    }, [jobId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResumeFile(file);
            setResumeFileName(file.name);
            toast.success(`File "${file.name}" selected.`);
        } else {
            setResumeFile(null);
            setResumeFileName('');
        }
    };

    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email || !resumeFile) {
            toast.error("Please complete your name, email, and attach your resume.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setSubmissionPhase('submitting');
        const toastId = toast.loading("Submitting your application...");

        console.log("Submitting Application:", { jobId, ...formData, resume: resumeFile?.name });
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast.success("Application submitted successfully!", { id: toastId, duration: 4000 });
            setApplicationStatus("Application Received");
            setSubmissionPhase('status_display');
        } catch (error) {
            console.error("Application Submission Error:", error);
            toast.error("Failed to submit application. Please try again.", { id: toastId });
            setSubmissionPhase('form');
        }
    };

    const handleCheckStatus = async () => {
        setStatusLoading(true);
        const toastId = toast.loading("Checking status...");
        await new Promise(resolve => setTimeout(resolve, 1500));
        const statuses = [ "Under Review", "Interview Scheduled", "Final Consideration", "Offer Extended", "Process Completed" ];
        const currentStatusIndex = statuses.indexOf(applicationStatus);
        let nextStatus = applicationStatus;
        if (currentStatusIndex > -1 && currentStatusIndex < statuses.length -1) {
            nextStatus = statuses[currentStatusIndex + 1];
        } else if (applicationStatus === "Application Received") {
            nextStatus = statuses[0];
        }
        setApplicationStatus(nextStatus);
        setStatusLoading(false);
        toast.dismiss(toastId);
        toast.success(`Status updated: ${nextStatus}`);
    }

    if (!job) {
        return (
            <div className={`${colors.background} min-h-screen flex flex-col items-center justify-center text-center p-8`}>
                <FiAlertCircle className={`w-16 h-16 ${colors.accentError || 'text-red-500'} mb-4`} />
                <h1 className={`text-2xl font-bold ${colors.textPrimary} mb-2`}>Job Opening Not Found</h1>
                <p className={`${colors.textSecondary} mb-6`}>Sorry, we couldn't find the details for this job opening.</p>
                <Button to="/careers" variant="secondary" icon={<FiArrowLeft/>}>Back to Careers</Button>
            </div>
        );
    }

    return (
        <div className={`${colors.background} ${colors.textPrimary} min-h-screen py-16 md:py-20`}>
            <Toaster position="bottom-center" toastOptions={{
                style: { background: colors.surface, color: colors.textPrimary, border: `1px solid ${colors.border}` },
            }} />
            <Section bg="bg-transparent" ariaLabelledby="application-title">
                <motion.div
                    className={`max-w-4xl mx-auto ${colors.surface} p-6 md:p-10 rounded-xl shadow-2xl border ${colors.border} ${colors.neonGlowCyan}`}
                    initial="hidden" animate="visible" variants={fadeInUp}
                >
                    <div className="text-center mb-8">
                        <FiFileText className={`w-12 h-12 ${colors.iconColor} mx-auto mb-3`} />
                        <h1 id="application-title" className={`text-3xl font-bold ${colors.textWhite} mb-2`}>
                            Application for: {job.title}
                        </h1>
                        <p className={`${colors.secondary} text-sm`}>{job.department} | {job.location}</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {submissionPhase === 'form' && (
                            <motion.form
                                key="applicationForm"
                                onSubmit={handleSubmitApplication}
                                variants={formStepVariants} initial="hidden" animate="visible" exit="exit"
                                // className="space-y-6" // Removed direct space-y from form
                            >
                                {/* *** START UPDATED LAYOUT: Two-column grid *** */}
                                <div className="grid md:grid-cols-2 md:gap-x-8 gap-y-6">
                                    {/* Left Column: Personal Info */}
                                    <div className="space-y-6">
                                        <InputField label="Full Name" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your full name" icon={FiUser} themeColors={colors} />
                                        <InputField label="Email Address" id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" icon={FiMail} themeColors={colors} />
                                        <InputField label="Phone (Optional)" id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Your phone number" icon={FiPhone} themeColors={colors} />
                                        <InputField label="Portfolio/LinkedIn Link (Optional)" id="portfolioLink" name="portfolioLink" type="url" value={formData.portfolioLink} onChange={handleChange} placeholder="https://..." icon={FiLink} themeColors={colors} />
                                    </div>

                                    {/* Right Column: Resume and Cover Letter */}
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="resume" className={`block text-sm font-medium ${colors.textSecondary} mb-1`}>
                                                Resume/CV <span className={colors.primary}>*</span>
                                            </label>
                                            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${colors.borderAccent} border-dashed rounded-md hover:border-cyan-400 transition-colors`}>
                                                <div className="space-y-1 text-center">
                                                    <FiUploadCloud className={`mx-auto h-10 w-10 ${colors.secondary}`} />
                                                    <div className="flex text-sm text-slate-500">
                                                        <label htmlFor="resumeFile" className={`relative cursor-pointer rounded-md font-medium ${colors.primary} hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-cyan-500`}>
                                                            <span>Upload a file</span>
                                                            <input id="resumeFile" name="resumeFile" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-slate-500">PDF, DOC, DOCX up to 5MB</p>
                                                    {resumeFileName && <p className={`text-xs ${colors.accentSuccess} mt-1`}>File: {resumeFileName}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <InputField label="Short Cover Letter (Optional)" id="coverLetterSnippet" name="coverLetterSnippet" type="textarea" rows={4} value={formData.coverLetterSnippet} onChange={handleChange} placeholder="Brief introduction or why you're interested..." themeColors={colors} />
                                    </div>
                                </div>
                                {/* *** END UPDATED LAYOUT *** */}

                                {/* Submit Button - Spans full width below columns */}
                                <div className="pt-6"> {/* Added padding-top for spacing */}
                                    <Button type="submit" variant="primary" size="lg" icon={<FiSend />} className={`w-full ${colors.neonGlowCyan}`}>
                                        Submit Application
                                    </Button>
                                </div>
                            </motion.form>
                        )}

                        {submissionPhase === 'submitting' && (
                            <motion.div key="submitting" variants={formStepVariants} initial="hidden" animate="visible" exit="exit" className="text-center py-10">
                                <FiLoader className={`w-12 h-12 ${colors.iconColor} animate-spin mx-auto mb-4`} />
                                <p className={`${colors.textSecondary}`}>Processing your application...</p>
                            </motion.div>
                        )}

                        {submissionPhase === 'status_display' && applicationStatus && (
                            <motion.div
                                key="statusDisplay"
                                variants={formStepVariants} initial="hidden" animate="visible" exit="exit"
                                className={`text-center py-10 px-4 rounded-lg ${colors.surfaceMuted} border ${colors.border}`}
                            >
                                <FiEye className={`w-16 h-16 ${colors.iconColor} mx-auto mb-6 opacity-80`} />
                                <h2 className={`text-2xl font-semibold ${colors.textWhite} mb-3`}>Your Application Status</h2>
                                <p className={`text-3xl font-bold ${colors.primary} mb-4`}>
                                    {applicationStatus}
                                </p>
                                <p className={`${colors.textSecondary} text-sm mb-6 max-w-md mx-auto`}>
                                    Thank you for your interest in LoyalShift. We will update the status here as the process moves forward. You can check this page periodically.
                                </p>
                                <Button
                                    onClick={handleCheckStatus}
                                    variant="secondary"
                                    size="base"
                                    icon={statusLoading ? <FiLoader className="animate-spin"/> : <FiClock />}
                                    disabled={statusLoading}
                                    className={`border ${colors.buttonSecondaryBorder} ${colors.buttonSecondaryText} ${colors.buttonSecondaryHoverBg}`}
                                >
                                    {statusLoading ? "Checking..." : "Refresh Status"}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Section>
        </div>
    );
}

// --- PropTypes ---
JobApplicationPage.propTypes = {};
Section.propTypes = {
    children: PropTypes.node.isRequired,
    bg: PropTypes.string,
    ariaLabelledby: PropTypes.string,
    className: PropTypes.string,
};
