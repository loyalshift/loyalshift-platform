// src/components/SalesInquiryForm.js
// REFACTORED FOR REUSABILITY

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiSend,
    FiLoader,
    FiEdit3, // Keep trigger icon consistent
    FiMessageSquare, // Keep form title icon consistent
} from "react-icons/fi";
import toast from "react-hot-toast"; // Assuming Toaster is rendered higher up
import PropTypes from 'prop-types'; // Import PropTypes

// Import shared components (adjust paths if needed)
import InputField from "./InputField";
import Button from "./Button";

// Define or import necessary constants/styles
// OPTION 1: Define directly if simple
const colors = {
    textBody: "text-neutral-main",
    textHeading: "text-neutral-dark",
    textPrimary: "text-primary-main",
    // Add other colors used by Button/InputField if not handled internally by them
};
const formContainerVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0, overflow: 'hidden', transition: { duration: 0.3, ease: [0.45, 0, 0.55, 1] } },
    visible: { opacity: 1, height: 'auto', marginTop: '2rem', overflow: 'visible', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, height: 0, marginTop: 0, overflow: 'hidden', transition: { duration: 0.3, ease: [0.45, 0, 0.55, 1] } } // Added exit variant
};
// OPTION 2: Import from a shared file (Recommended if used elsewhere)
// import { colors, formContainerVariants } from '../styles/theme'; // Example path

// --- Component Definition ---
// Added props for customizable text content with default values
export default function SalesInquiryForm({
    triggerText = "Or, prefer to send a quick message first?",
    triggerButtonText = "Send Quick Message",
    formTitle = "Send a Quick Message",
    emailPlaceholder = "So we can reply to you",
    messagePlaceholder = "Ask us anything...", // Made slightly more generic default
    submitButtonText = "Send Message",
    formContext = "General Inquiry", // Added context for potential logging/routing
}) {
    // --- State remains the same ---
    const initialFormData = { email: "", message: "" };
    const [formData, setFormData] = useState(initialFormData);
    const [submissionStatus, setSubmissionStatus] = useState("idle");
    const [showForm, setShowForm] = useState(false);
    // --- End State ---

    const isSubmitting = submissionStatus === "submitting";

    // --- Handlers remain the same ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.message) {
            toast.error("Please provide your email and message."); return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Please enter a valid email address."); return;
        }
        setSubmissionStatus("submitting");
        const toastId = toast.loading("Sending your message...");
        try {
            await new Promise((resolve) => setTimeout(resolve, 1800)); // Simulate API call
             // Use formContext in log message
            console.log(`${formContext} Quick Message Submitted:`, { email: formData.email, message: formData.message });
            toast.success("Message sent! We'll be in touch soon.", { id: toastId, duration: 5000 });
            setFormData(initialFormData);
            setShowForm(false); // Hide form on success
            setSubmissionStatus("idle");
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("An error occurred. Please try again.", { id: toastId });
            setSubmissionStatus("idle");
        }
    };
    // --- End Handlers ---

    return (
        // This component renders the trigger OR the form based on its own state
        <div className="text-center mt-auto pt-6 border-t border-neutral-200/80">
            {!showForm && (
                <motion.div
                    key="trigger" // Added key for AnimatePresence accuracy
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} // Added exit animation
                    transition={{ delay: 0.1, duration: 0.3 }} // Added exit duration
                    className="flex flex-col items-center"
                >
                     {/* Use triggerText prop */}
                    <p className={`${colors.textBody} mb-3 text-sm`}>
                        {triggerText}
                    </p>
                    <Button
                        onClick={() => setShowForm(true)}
                        variant="primary" // Keep variant consistent, can be overridden via className prop if needed
                        size="base"
                        icon={<FiEdit3 />} // Icon remains consistent
                    >
                         {/* Use triggerButtonText prop */}
                        {triggerButtonText}
                    </Button>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                {showForm && (
                    <motion.div
                        key="sales-quick-form-content"
                        variants={formContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit" // Use exit variant
                        // Parent card provides border/padding
                    >
                        <div className="pt-8"> {/* Wrapper for consistent padding */}
                            <h3
                                className={`text-xl font-semibold ${colors.textHeading} mb-6 text-center flex items-center justify-center gap-2`}
                            >
                                <FiMessageSquare className={`w-5 h-5 ${colors.textPrimary}`} /> {/* Icon consistent */}
                                 {/* Use formTitle prop */}
                                {formTitle}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-5 text-left">
                                <InputField
                                    id={`quick-form-email-${formContext.toLowerCase().replace(/\s+/g, '-')}`} // Dynamic ID
                                    name="email"
                                    label="Your Email Address" // Label can remain generic
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder={emailPlaceholder} // Use emailPlaceholder prop
                                />
                                <InputField
                                    id={`quick-form-message-${formContext.toLowerCase().replace(/\s+/g, '-')}`} // Dynamic ID
                                    name="message"
                                    label="Your Message / Question" // Label can remain generic
                                    type="textarea"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder={messagePlaceholder} // Use messagePlaceholder prop
                                />
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)} // Cancel action remains
                                        className={`text-sm ${colors.textBody} hover:${colors.textHeading} font-medium px-3 py-2 rounded hover:bg-neutral-main/10 order-last sm:order-first`}
                                    >
                                        Cancel {/* Cancel text remains generic */}
                                    </button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg" // Kept size lg for prominence
                                        disabled={isSubmitting}
                                        icon={isSubmitting ? <FiLoader className="animate-spin" /> : <FiSend />}
                                        className={`w-full sm:w-auto ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                                    >
                                         {/* Use submitButtonText prop */}
                                        {isSubmitting ? "Sending..." : submitButtonText}
                                    </Button>
                                </div>
                                <p className="text-xs text-neutral-main text-center pt-1">
                                    Both fields are required. {/* Note remains generic */}
                                </p>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- Updated PropTypes ---
SalesInquiryForm.propTypes = {
    triggerText: PropTypes.string,
    triggerButtonText: PropTypes.string,
    formTitle: PropTypes.string,
    emailPlaceholder: PropTypes.string,
    messagePlaceholder: PropTypes.string,
    submitButtonText: PropTypes.string,
    formContext: PropTypes.string,
};
