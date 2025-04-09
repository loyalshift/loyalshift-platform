// src/pages/PersonalizedDemoPage.js
// Manages a workflow: Intro Animation -> Confirmation -> Processing/Completion.
// Gets leadId from URL and asks for consent to use context for proposal generation.
// Current time: Saturday, April 19, 2025 at 10:27 PM CST (Costa Rica Time)
// FIX: Corrected import order, defined springTransition, verified formData access.

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import PropTypes from 'prop-types'; // FIX: Moved static import up
import { motion, AnimatePresence } from 'framer-motion';
import { FiLoader, FiCheckCircle, FiArrowRight, FiArrowLeft, FiInfo, FiAlertTriangle, FiThumbsUp, FiAward } from 'react-icons/fi'; // Adjusted icons, added FiAward
import toast, { Toaster } from 'react-hot-toast';

// --- Reusable Components ---
import Button from '../components/Button'; // FIX: Moved static import up
// Lazy load the intro animation for better initial performance
// Assuming the animation component exists at this path and calls onComplete when done
const PersonalizedDemoIntroAnimation = lazy(() => import('../components/PersonalizedDemoIntroAnimation'));

// --- Theme Colors (Light Theme) ---
const colors = {
  bgBase: "bg-neutral-light",
  bgWhite: "bg-neutral-white",
  textHeading: "text-neutral-dark",
  textBody: "text-neutral-main",
  textPrimary: "text-primary-main",
  textPrimaryDark: "text-primary-dark",
  primaryMain: "bg-primary-main",
  primaryContrast: "text-primary-contrast",
  borderLight: "border-neutral-light",
  borderMedium: "border-neutral-main/30",
  borderPrimary: "border-primary-main",
  accentSuccess: "text-status-success",
  accentWarning: "text-status-warning", // For consent notice
  borderRing: "ring-neutral-200",
  bgGradientFrom: "bg-gradient-to-br from-white",
  bgGradientTo: "to-neutral-50",
  consentBg: "bg-yellow-50", // Soft yellow for consent box
  consentBorder: "border-yellow-300",
  consentIcon: "text-yellow-500",
  codeBg: "bg-neutral-main/10", // Background for the code display (if re-added)
  codeBorder: "border-neutral-main/30",
  codeText: "text-neutral-dark",
};

// --- Animation Variants ---
// Variant for steps fading/sliding in/out
const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const fadeInUp = { // Simple fade up for elements within a step
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// FIX: Defined missing springTransition
const springTransition = {
  type: "spring",
  stiffness: 120,
  damping: 15,
  delay: 0.1,
};

const staggerContainer = { // Added stagger container definition
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};


// --- Placeholder for Intro Animation Fallback ---
const IntroAnimationFallback = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <FiLoader className={`w-12 h-12 ${colors.textPrimary} animate-spin`} />
    <p className={`${colors.textBody} ml-4`}>Loading experience...</p>
  </div>
);

// --- Main Page Component ---
export default function PersonalizedDemoPage() {
  // --- State Management ---
  const [step, setStep] = useState('intro'); // 'intro', 'confirmation', 'processing', 'complete', 'error'
  const [processingStatus, setProcessingStatus] = useState('idle'); // 'idle', 'processing', 'error', 'success'
  const { leadId } = useParams(); // Get leadId from URL
  const navigate = useNavigate(); // Hook for navigation

  // FIX: Verified formData is declared here and accessible in renderStepContent
  const initialFormData = { name: "", email: "", company: "", role: "", primaryChallenge: "", legacySystems: "", goals: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [generatedCode, setGeneratedCode] = useState(null); // Kept state in case needed later, but removed display

  // --- Effect for leadId (Optional: Could verify leadId exists) ---
  useEffect(() => {
    if (leadId) {
      console.log("Processing request associated with Lead ID:", leadId);
      // Placeholder: Fetch lead data if needed
    } else {
      console.warn("No Lead ID found in URL.");
      // Optional: Redirect or show error
    }
  }, [leadId, navigate]);

  // --- Handlers ---
  const handleIntroComplete = () => {
    console.log("Intro animation complete, moving to confirmation step.");
    setStep('confirmation');
  };

  /**
   * Handles the user agreeing to the terms.
   * Simulates initiating the proposal generation process.
   */
  const handleConfirmationAgree = async () => {
    console.log("User agreed. Initiating proposal generation for Lead ID:", leadId);
    setProcessingStatus('processing');
    setStep('processing');
    const toastId = toast.loading("Initiating proposal generation...");

    // --- Simulate Backend Process ---
    try {
      // TODO: Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate success - removed result generation as it's not needed for this flow
      // Generate a placeholder unique code (if needed later, currently not displayed)
      const uniqueCode = `LS-PROP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setGeneratedCode(uniqueCode); // Store it even if not displayed

      toast.success("Proposal generation initiated!", { id: toastId });
      setProcessingStatus('success');
      setStep('complete');

    } catch (error) {
      console.error("Proposal Initiation Error:", error);
      toast.error("Could not initiate proposal generation. Please try again later.", { id: toastId });
      setProcessingStatus('error');
      setStep('error');
    }
    // --- End Simulation ---
  };

  /**
   * Handles the user declining or going back.
   */
  const handleDecline = () => {
    console.log("User declined or went back.");
    navigate("/"); // Navigate to homepage
  };

  // --- Render Logic ---
  const renderStepContent = () => {
    switch (step) {
      case 'intro':
        return (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-center min-h-[400px]">
            <Suspense fallback={<IntroAnimationFallback />}>
              <PersonalizedDemoIntroAnimation onComplete={handleIntroComplete} />
            </Suspense>
          </motion.div>
        );

      case 'confirmation':
        return (
          <motion.div
            key="confirmation"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center p-6 md:p-10 flex flex-col items-center"
          >
            <FiInfo className={`w-16 h-16 ${colors.textPrimary} mb-6`} />
            <h2 className={`text-2xl md:text-3xl font-semibold ${colors.textHeading} mb-4`}>Proposal Generation Consent</h2>
            <p className={`${colors.textBody} text-base md:text-lg mb-6 max-w-xl mx-auto`}>
              To create your personalized proposal, we need to analyze information related to your company's context
              {leadId ? ` (associated with reference ID: ${leadId.substring(0,8)}...)` : ''}.
            </p>
            <motion.div
              variants={fadeInUp}
              className={`p-4 rounded-md border ${colors.consentBorder} ${colors.consentBg} text-sm ${colors.textBody} mb-8 max-w-xl w-full text-left flex items-start`}
            >
               <FiAlertTriangle className={`w-8 h-8 mr-3 mt-1 flex-shrink-0 ${colors.consentIcon}`} aria-hidden="true"/>
               <div>
                    By clicking 'Agree & Generate', you confirm you have the authority to grant LoyalShift permission to use these resources{" "}
                    <strong className={colors.textPrimaryDark}>solely for the purpose of generating this proposal for you</strong>.
                    This information will <strong className={colors.textPrimaryDark}>not</strong> be used for training our AI models or for any other purpose.
               </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleDecline}
                className="w-full sm:w-auto flex-1 !border-neutral-main/70 !text-neutral-dark hover:!border-neutral-main hover:!bg-neutral-main/5"
              >
                Cancel / Go Back
              </Button>
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={handleConfirmationAgree}
                icon={<FiThumbsUp />}
                className="w-full sm:w-auto flex-1"
              >
                Agree & Generate Proposal
              </Button>
            </motion.div>
          </motion.div>
        );

      case 'processing':
        return (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center min-h-[400px] p-8"
          >
            <FiLoader className={`w-16 h-16 ${colors.textPrimary} animate-spin mb-6`} />
            <h3 className={`text-2xl font-semibold ${colors.textHeading} mb-2`}>Generating Your Proposal...</h3>
            <p className={`${colors.textBody}`}>This may take a few moments. We're analyzing the context to create tailored insights.</p>
          </motion.div>
        );

      case 'complete':
         return (
          <motion.div
            key="complete"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center p-6 md:p-10 flex flex-col items-center justify-center min-h-[400px]"
          >
            {/* FIX: Using springTransition which is now defined */}
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={springTransition}>
              <FiCheckCircle className={`w-24 h-24 ${colors.accentSuccess} mx-auto mb-6`} />
            </motion.div>
            <motion.h3 variants={fadeInUp} className={`text-3xl font-semibold ${colors.textHeading} mb-4`}>
              Thank You!
            </motion.h3>
            {/* FIX: Verified formData is accessible here */}
            <motion.p variants={fadeInUp} transition={{ delay: 0.1 }} className={`${colors.textBody} text-lg mb-8 max-w-xl mx-auto`}>
              We've received your confirmation and are now generating your personalized proposal based on the available context{leadId ? ` for reference ID ${leadId.substring(0,8)}...` : ''}.
              Our team will reach out to you shortly with the next steps.
               {/* Removed reference to formData.email as it's not collected in this flow */}
            </motion.p>
            {/* Removed code display */}
            <motion.div variants={fadeInUp} transition={{ delay: 0.3 }}>
              <Button to="/" variant="secondary" size="lg" className={`!border !${colors.borderLight} hover:!border-neutral-main/50`}>
                Back to Homepage
              </Button>
            </motion.div>
          </motion.div>
        );

       case 'error':
         return (
           <motion.div
             key="error"
             variants={stepVariants}
             initial="hidden"
             animate="visible"
             exit="exit"
             className="text-center p-6 md:p-10 flex flex-col items-center justify-center min-h-[400px]"
           >
             <FiAlertTriangle className={`w-20 h-20 ${colors.accentWarning} mx-auto mb-6`} />
             <motion.h3 variants={fadeInUp} className={`text-2xl font-semibold ${colors.textHeading} mb-4`}>
               Something Went Wrong
             </motion.h3>
             <motion.p variants={fadeInUp} transition={{ delay: 0.1 }} className={`${colors.textBody} text-lg mb-8 max-w-xl mx-auto`}>
               We encountered an issue while trying to initiate your proposal generation. Please try again, or contact support if the problem persists.
             </motion.p>
             <motion.div variants={fadeInUp} transition={{ delay: 0.2 }} className="flex gap-4">
                <Button type="button" variant="secondary" size="lg" onClick={handleDecline} className={`!border-neutral-main/70 !text-neutral-dark hover:!border-neutral-main hover:!bg-neutral-main/5`}>
                    Cancel
                </Button>
               <Button type="button" variant="primary" size="lg" onClick={handleConfirmationAgree}>
                 Retry Generation
               </Button>
             </motion.div>
           </motion.div>
         );

      default:
        return <div>Error: Invalid workflow step. Please refresh.</div>;
    }
  };

  // --- Component Return ---
  return (
    <div className={`${colors.bgBase} py-20 md:py-28 min-h-screen`}>
      <Toaster position="bottom-center" toastOptions={{ className: 'text-sm rounded-md shadow-lg' }} />
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
           className={`${colors.bgGradientFrom} ${colors.bgGradientTo} rounded-2xl shadow-xl relative overflow-hidden ring-1 ring-inset ${colors.borderRing} min-h-[550px] flex flex-col`}
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Content Area */}
          <div className="flex-grow flex flex-col">
            <AnimatePresence initial={false} mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

// --- Helper Components (ProgressBar - removed) ---

// PropTypes for the main component
PersonalizedDemoPage.propTypes = {
  // No props currently defined
};
