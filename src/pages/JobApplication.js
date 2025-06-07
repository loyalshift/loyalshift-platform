// src/pages/JobApplicationPage.js
// Page for job application submission.
// USES loyalShiftV2Theme.
// Tailored for a specific job via URL parameter.

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import {
    FiFileText, FiUploadCloud, FiUser, FiMail, FiPhone, FiLink, FiSend,
    FiLoader, FiCheckCircle, FiAlertCircle, FiArrowLeft, FiBriefcase, FiMapPin, FiClock
} from 'react-icons/fi'; // FiEye removed as it was for status page
import toast, { Toaster } from 'react-hot-toast';

// Reusable Components (ensure paths are correct)
import Button from '../components/Button';
import InputField from '../components/InputField'; // Assuming InputField can use theme
import Section from '../components/Section'; // Assuming Section component exists
import { jobOpenings } from '../data/jobs'; // Assuming jobs data is imported
import loyalShiftV2Theme from '../themes/loyalshift-v2.theme'; // IMPORT THE V2 THEME

const theme = loyalShiftV2Theme; // Use the imported theme

// --- Animation Variants (from existing context) ---
const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }};
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
    const [generatedApplicationId, setGeneratedApplicationId] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error("File is too large. Max 5MB allowed.");
                e.target.value = null;
                return;
            }
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
        const newApplicationId = `APP-${jobId.toUpperCase()}-${Date.now().toString().slice(-6)}`;
        setGeneratedApplicationId(newApplicationId);

        console.log("Submitting Application:", { jobId, applicationId: newApplicationId, ...formData, resume: resumeFile?.name });
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            localStorage.setItem(`application_data_${newApplicationId}`, JSON.stringify({
                jobId: jobId,
                jobTitle: job.title,
                applicantName: formData.fullName,
                status: "Application Received",
                submittedAt: new Date().toISOString(),
            }));
            toast.success("Application submitted successfully!", { id: toastId, duration: 3000 });
            setSubmissionPhase('success');
        } catch (error) {
            console.error("Application Submission Error:", error);
            toast.error("Failed to submit application. Please try again.", { id: toastId });
            setSubmissionPhase('form');
        }
    };

    if (!job) {
        return (
            <div className={`${theme.background} min-h-screen flex flex-col items-center justify-center text-center p-8`}>
                <FiAlertCircle className={`w-16 h-16 ${theme.errorText} mb-4`} />
                <h1 className={`text-2xl font-bold ${theme.textPrimary} mb-2`}>Job Opening Not Found</h1>
                <p className={`${theme.textSecondary} mb-6`}>Sorry, the job ID "{jobId}" does not correspond to an open position.</p>
                <Button to="/careers" variant="secondary" icon={<FiArrowLeft/>}>Back to Careers</Button>
            </div>
        );
    }

    const isSubmitting = submissionPhase === 'submitting';

    // Assuming InputField component is updated to accept and use `theme` prop
    // or it directly uses `loyalShiftV2Theme` if imported there.
    // For this example, I'll pass theme colors to a hypothetical InputField prop `themeColors`
    // or rely on global theme context if InputField is designed that way.

    return (
        <div className={`${theme.background} ${theme.textPrimary} min-h-screen py-16 md:py-20`}>
            <Toaster position="bottom-center" toastOptions={{
                style: { background: theme.surfaceCard, color: theme.textPrimary, border: `1px solid ${theme.border}` },
                success: { iconTheme: { primary: theme.successText.replace('text-',''), secondary: 'white' } },
                error: { iconTheme: { primary: theme.errorText.replace('text-',''), secondary: 'white' } },
            }} />
            <Section bg="bg-transparent" ariaLabelledby="application-title"> {/* Use theme.background if needed */}
                <motion.div
                    className={`max-w-4xl mx-auto ${theme.surfaceCard} p-6 md:p-10 rounded-2xl shadow-2xl border ${theme.border} ${theme.cardShadow}`} // Applied shadow & border
                    initial="hidden" animate="visible" variants={fadeInUp}
                >
                    <div className="text-center mb-8">
                        <FiFileText className={`w-12 h-12 ${theme.textHighlight} mx-auto mb-3`} />
                        <h1 id="application-title" className={`text-3xl font-bold ${theme.textPrimary} mb-1`}>
                            Apply for: {job.title}
                        </h1>
                        <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm ${theme.textSecondary}`}>
                            <span className="flex items-center"><FiBriefcase className="w-4 h-4 mr-1.5 opacity-80" /> {job.department}</span>
                            <span className="hidden sm:inline">|</span>
                            <span className="flex items-center"><FiMapPin className="w-4 h-4 mr-1.5 opacity-80" /> {job.location}</span>
                            <span className="hidden sm:inline">|</span>
                            <span className="flex items-center"><FiClock className="w-4 h-4 mr-1.5 opacity-80" /> {job.type}</span>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {submissionPhase === 'form' && (
                            <motion.form
                                key="applicationForm"
                                onSubmit={handleSubmitApplication}
                                variants={formStepVariants} initial="hidden" animate="visible" exit="exit"
                            >
                                <div className="grid md:grid-cols-2 md:gap-x-8 gap-y-6">
                                    {/* Left Column: Personal Info */}
                                    <div className="space-y-6">
                                        <InputField label="Full Name" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your full name" icon={FiUser} themeColors={theme} />
                                        <InputField label="Email Address" id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" icon={FiMail} themeColors={theme} />
                                        <InputField label="Phone (Optional)" id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Your phone number" icon={FiPhone} themeColors={theme} />
                                        <InputField label="Portfolio/LinkedIn Link (Optional)" id="portfolioLink" name="portfolioLink" type="url" value={formData.portfolioLink} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile or website" icon={FiLink} themeColors={theme} />
                                    </div>

                                    {/* Right Column: Resume and Cover Letter */}
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="resumeFileField" className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                                                Resume/CV <span className={theme.textHighlight}>*</span>
                                            </label>
                                            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${theme.uploadZoneBorder} border-dashed rounded-md ${theme.uploadZoneHoverBorder} transition-colors`}>
                                                <div className="space-y-1 text-center">
                                                    <FiUploadCloud className={`mx-auto h-10 w-10 ${theme.textMuted}`} />
                                                    <div className={`flex text-sm ${theme.textMuted}`}>
                                                        <label htmlFor="resumeFileField" className={`relative cursor-pointer rounded-md font-medium ${theme.textHighlight} hover:text-cyan-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 ${theme.inputFocusRing} ring-offset-slate-800`}>
                                                            <span>Upload a file</span>
                                                            <input id="resumeFileField" name="resumeFile" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" required />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className={`text-xs ${theme.textMuted}`}>PDF, DOC, DOCX, TXT up to 5MB</p>
                                                    {resumeFileName && <p className={`text-xs ${theme.successText} mt-1`}>File: {resumeFileName}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <InputField label="Short Cover Letter / Why you're a good fit (Optional)" id="coverLetterSnippet" name="coverLetterSnippet" type="textarea" rows={job.title.toLowerCase().includes("product manager") ? 6 : 4} value={formData.coverLetterSnippet} onChange={handleChange} placeholder="Tell us briefly why you're interested and a good fit..." themeColors={theme} />
                                    </div>
                                </div>

                                <div className={`pt-8 mt-6 border-t ${theme.border}`}>
                                    <Button type="submit" variant="primary" size="lg" icon={<FiSend />} className="w-full" disabled={isSubmitting}> {/* Button will use theme internally */}
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </Button>
                                </div>
                                <p className={`text-xs ${theme.textMuted} mt-4 text-center`}>
                                    By submitting, you agree to LoyalShift's Data Privacy Policy. We are an equal opportunity employer.
                                </p>
                            </motion.form>
                        )}

                        {submissionPhase === 'submitting' && (
                            <motion.div key="submitting" variants={formStepVariants} initial="hidden" animate="visible" exit="exit" className="text-center py-20">
                                <FiLoader className={`w-12 h-12 ${theme.textHighlight} animate-spin mx-auto mb-4`} />
                                <p className={`${theme.textSecondary}`}>Processing your application...</p>
                            </motion.div>
                        )}

                        {submissionPhase === 'success' && generatedApplicationId && (
                            <motion.div
                                key="successScreen"
                                variants={formStepVariants} initial="hidden" animate="visible" exit="exit"
                                className={`text-center py-12 px-4 rounded-lg ${theme.surfaceMuted} border ${theme.border}`}
                            >
                                <FiCheckCircle className={`w-16 h-16 ${theme.successText} mx-auto mb-6`} />
                                <h2 className={`text-2xl font-semibold ${theme.textPrimary} mb-3`}>Application Received!</h2>
                                <p className={`${theme.textSecondary} text-md mb-2`}>
                                    Thank you, {formData.fullName.split(" ")[0]}, for applying to the <strong>{job.title}</strong> position.
                                </p>
                                <p className={`${theme.textSecondary} text-sm mb-6`}>
                                    Your Application ID is: <strong className={theme.textHighlight}>{generatedApplicationId}</strong>.
                                    <br />
                                    We've sent a confirmation to <strong className={theme.textHighlight}>{formData.email}</strong>.
                                    You can use the link below to track your application status.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Button
                                        to={`/job-application/${generatedApplicationId}/status`}
                                        variant="primary" // Will use theme.buttonPrimaryBg etc.
                                        size="base"
                                        icon={<FiFileText />}
                                    >
                                        View Application Status
                                    </Button>
                                    <Button
                                        to="/careers"
                                        variant="secondary" // Will use theme.buttonSecondaryBg etc.
                                        size="base"
                                        icon={<FiArrowLeft />}
                                    >
                                        Back to Careers
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Section>
        </div>
    );
}

// --- PropTypes ---
JobApplicationPage.propTypes = {}; // No direct props for this page itself
Section.propTypes = {
    children: PropTypes.node.isRequired,
    bg: PropTypes.string,
    ariaLabelledby: PropTypes.string,
    className: PropTypes.string,
};
// Assuming InputField and Button components are already using loyalShiftV2Theme internally
// or are passed the theme object if they are designed to be themeable via props.
// If InputField needs explicit theme colors passed:
InputField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    themeColors: PropTypes.object, // Prop to pass the theme object
    icon: PropTypes.elementType,
};
Button.propTypes = {
    to: PropTypes.string,
    type: PropTypes.string,
    variant: PropTypes.string, // 'primary', 'secondary', 'outline', 'text'
    size: PropTypes.string,    // 'sm', 'base', 'lg', 'xl'
    disabled: PropTypes.bool,
    icon: PropTypes.node,      // Icon component for the left
    icon: PropTypes.node,  // Explicit icon for the left
    iconRight: PropTypes.node, // Explicit icon for the right
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};
