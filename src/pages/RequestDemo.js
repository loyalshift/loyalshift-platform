// src/pages/RequestDemoPage.js
// Current time: Sunday, April 13, 2025 at 6:34 PM CST (San José, Costa Rica)

import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiCheckCircle,
  FiCpu,
  FiSend,
  FiLoader,
  FiArrowRight,
  FiArrowLeft,
  FiHome,
  FiAward,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// Reusable Components (Ensure paths are correct relative to this file)
import InputField from "../components/InputField";
import Button from "../components/Button";

// Define light theme colors
// TODO: Consider moving colors to a central theme file/context if used across many components
const colors = {
  bgBase: "bg-neutral-light",
  bgWhite: "bg-neutral-white",
  textHeading: "text-neutral-dark",
  textBody: "text-neutral-main",
  textPrimary: "text-primary-main",
  textPrimaryDark: "text-primary-dark",
  primaryMain: "bg-primary-main",
  primaryDark: "bg-primary-dark", // Added for button hover
  primaryContrast: "text-primary-contrast",
  borderLight: "border-neutral-light",
  borderPrimary: "border-primary-main",
  accentSuccess: "text-status-success",
};

// --- Animation Variants ---
// TODO: Consider moving variants to a central animation file if used across many components
const viewportSettings = { once: true, amount: 0.2 };

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stepVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction < 0 ? 50 : -50,
    transition: { duration: 0.3, ease: [0.45, 0, 0.55, 1] },
  }),
};
// --- End Animation Variants ---

// --- Helper Components ---
const DemoBenefitItem = ({ children }) => (
  <motion.li variants={fadeInUp} className="flex items-start mb-3">
    <FiCheckCircle
      className={`w-5 h-5 ${colors.accentSuccess} mr-3 mt-1 flex-shrink-0`}
    />
    <span className={`${colors.textBody} text-base leading-relaxed`}>
      {children}
    </span>
  </motion.li>
);

DemoBenefitItem.propTypes = { children: PropTypes.node.isRequired };

const ProgressBar = ({ currentStep, totalSteps }) => (
  <div className="w-full bg-neutral-main/10 rounded-full h-2 mb-6 overflow-hidden">
    {" "}
    {/* Changed bg color */}
    <motion.div
      className={`${colors.primaryMain} h-2 rounded-full`}
      initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
      animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </div>
);
ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

// --- Main Component ---
export default function RequestDemoPage() {
  const totalSteps = 2; // Number of input steps
  const initialFormData = {
    name: "",
    email: "",
    company: "",
    role: "",
    challenge: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [step, setStep] = useState(1); // 1: Contact, 2: Context, 3: Submitted
  const [direction, setDirection] = useState(1); // Animation direction: 1 for next, -1 for prev

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handles moving to the next step with validation
  const handleNextStep = () => {
    let isValid = true;
    // Step 1 Validation
    if (step === 1) {
      if (!formData.name) {
        toast.error("Please enter your name.");
        isValid = false;
      } else if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error("Please enter a valid work email address.");
        isValid = false;
      }
    }
    // Step 2 Validation
    if (step === 2) {
      if (!formData.company) {
        toast.error("Please enter your company name.");
        isValid = false;
      }
      // Add validation for other fields in step 2 if they become required
    }

    if (isValid && step < totalSteps) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  // Handles moving to the previous step
  const handlePrevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  // Handles the final form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== totalSteps) return; // Ensure submission only happens on the last input step

    // Final validation check (redundant if handleNextStep covers it, but safe)
    if (!formData.company) {
      toast.error("Please provide your company name.");
      return;
    }
    // Add checks for other required fields if any

    setSubmissionStatus("submitting");
    const toastId = toast.loading("Submitting your demo request...");

    // --- Simulate API Call ---
    try {
      // Replace with your actual API endpoint call
      await new Promise((resolve) => setTimeout(resolve, 1800)); // Simulate network delay
      console.log("Demo Request Submitted:", formData);

      // Success: Show toast and move to confirmation step
      toast.success("Request received! We'll contact you shortly.", {
        id: toastId,
        duration: 4000,
      });
      setDirection(1);
      setStep((prev) => prev + 1); // Move to confirmation step (step 3)
      // Keep form data for confirmation message display
      // submissionStatus remains 'submitting' conceptually until reset if needed,
      // but visually the user is on the success screen.
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("An error occurred. Please try again.", { id: toastId });
      setSubmissionStatus("idle"); // Reset status on error to allow retry
    }
    // --- End Simulation ---
  };

  // Spring animation for confirmation elements
  const springTransition = {
    type: "spring",
    stiffness: 120,
    damping: 15,
    delay: 0.1,
  };

  const isSubmitting = submissionStatus === "submitting";

  // Subtle gradient background for the page
  const pageStyle = {
    background: `linear-gradient(135deg, ${"#FFFFFF"} 0%, ${"#F9FAFB"} 100%)`, // White to neutral-50/100
  };

  return (
    // Apply subtle gradient background
    <div
      className={`py-20 md:py-28 overflow-x-hidden ${colors.bgBase}`}
      style={pageStyle}
    >
      <Toaster
        position="bottom-center"
        toastOptions={{ className: "text-sm rounded-md shadow-lg" }}
      />
      <div className="container mx-auto px-4">
        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* --- Hero Content (Left Column) --- */}
          <motion.section
            className="lg:col-span-2 lg:sticky lg:top-28" // Make left column sticky
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={scaleUp} /* ... icon container ... */>
              <FiCalendar
                className={`w-12 h-12 ${colors.textPrimary} text-opacity-80`}
              />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${colors.textHeading} mt-4 mb-4 leading-tight`}
            >
              Unlock Your{" "}
              <span className={colors.textPrimary}>Personalized Demo</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg ${colors.textBody} mb-8 leading-relaxed`}
            >
              Just two quick steps to see how LoyalShift can specifically
              address your challenges and accelerate your modernization goals.
            </motion.p>

            {/* "What to Expect" - Lighter Style */}
            <motion.div
              variants={fadeInUp}
              className={`mt-10 p-6 bg-primary-main/5 rounded-xl border border-primary-main/10`}
            >
              <div className="flex items-center mb-4">
                <FiCpu
                  className={`w-6 h-6 ${colors.textPrimary} mr-3 flex-shrink-0`}
                />
                <h3 className={`text-lg font-semibold ${colors.textHeading}`}>
                  Your Custom Demo Includes:
                </h3>
              </div>
              {/* Stagger benefits list items */}
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="list-none pl-0 space-y-2.5"
              >
                <DemoBenefitItem>
                  Walkthrough tailored to{" "}
                  <strong className={colors.textPrimaryDark}>
                    your systems
                  </strong>
                  .
                </DemoBenefitItem>
                <DemoBenefitItem>
                  Addressing your{" "}
                  <strong className={colors.textPrimaryDark}>
                    biggest challenges
                  </strong>
                  .
                </DemoBenefitItem>
                <DemoBenefitItem>
                  Relevant feature demonstrations.
                </DemoBenefitItem>
                <DemoBenefitItem>
                  Insights into potential{" "}
                  <strong className={colors.textPrimaryDark}>ROI</strong>.
                </DemoBenefitItem>
                <DemoBenefitItem>
                  Q&A with modernization experts.
                </DemoBenefitItem>
              </motion.ul>
            </motion.div>
          </motion.section>
          {/* --- Multi-Step Form Area (Right Column) --- */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInUp}
          >
            {/* Refined Form Container Card */}
            {/* Added subtle gradient, increased rounding, subtle inner ring */}
            <div
              className={`bg-gradient-to-br ${colors.bgGradientFrom} ${colors.bgGradientTo} rounded-2xl shadow-xl relative overflow-hidden ring-1 ring-inset ${colors.borderRing} min-h-[550px]`}
            >
              {/* Card Header */}
              <div className="p-6 text-center border-b border-neutral-200/80">
                <h2 className={`text-xl font-semibold ${colors.textHeading}`}>
                  {step === 1 && "Start Your Request"}
                  {step === 2 && "A Little More Context"}
                  {step === 3 && "Success!"}
                </h2>
              </div>

              {/* Progress Bar */}
              {step <= totalSteps && (
                <div className="px-8 pt-8">
                  {" "}
                  {/* Increased top padding */}
                  <ProgressBar currentStep={step} totalSteps={totalSteps} />
                </div>
              )}

              {/* Animated Step Area */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.form
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={
                    step === totalSteps
                      ? handleSubmit
                      : (e) => e.preventDefault()
                  }
                  className="p-8 pt-0 flex flex-col" // Removed pt from here
                >
                  {/* Step Content */}
                  {step === 1 /* Step 1 Fields + Nav */ && (
                    <div className="space-y-5 flex-grow">
                      {/* InputField components assumed to have refined internal styles */}
                      <InputField
                        id="name"
                        name="name"
                        label="Full Name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Jane Doe"
                      />
                      <InputField
                        id="email"
                        name="email"
                        label="Work Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.com"
                      />
                      <div className="pt-5 flex justify-end mt-auto">
                        <Button
                          type="button"
                          variant="primary"
                          size="lg"
                          onClick={handleNextStep}
                          icon={<FiArrowRight />}
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}
                  {step === 2 /* Step 2 Fields + Nav */ && (
                    <div className="space-y-5 flex-grow">
                      <InputField
                        id="company"
                        name="company"
                        label="Company Name"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="Your Organization"
                      />
                      <InputField
                        id="role"
                        name="role"
                        label="Your Role (Optional)"
                        type="text"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="e.g., IT Director"
                      />
                      <InputField
                        id="challenge"
                        name="challenge"
                        label="Main Challenge / Interest (Optional)"
                        type="textarea"
                        value={formData.challenge}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Help us tailor the demo..."
                      />
                      <div className="pt-3 flex flex-col sm:flex-row justify-between items-center gap-4 mt-auto">
                        <Button
                          type="button"
                          variant="secondary"
                          size="base"
                          onClick={handlePrevStep}
                          icon={<FiArrowLeft />}
                          className={`!border-none !shadow-none !bg-transparent !px-2 !${colors.textBody} hover:!${colors.textHeading}`}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={isSubmitting}
                          icon={
                            isSubmitting ? (
                              <FiLoader className="animate-spin" />
                            ) : (
                              <FiSend />
                            )
                          }
                        >
                          {isSubmitting ? "Sending..." : "Request Demo"}
                        </Button>
                      </div>
                    </div>
                  )}
                  {step === 3 /* Confirmation Screen */ && (
                    <div className="text-center py-10 px-4 flex flex-col items-center justify-center flex-grow">
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={springTransition}
                      >
                        <FiAward
                          className={`w-24 h-24 ${colors.textPrimary} opacity-90 mx-auto mb-6`}
                        />
                      </motion.div>
                      <motion.h3
                        variants={fadeInUp}
                        className={`text-2xl font-semibold ${colors.textHeading} mb-4`}
                      >
                        Awesome, {formData.name.split(" ")[0]}! You're All Set.
                      </motion.h3>
                      <motion.p
                        variants={fadeInUp}
                        transition={{ delay: 0.1 }}
                        className={`${colors.textBody} text-lg mb-8 max-w-md mx-auto`}
                      >
                        Your personalized demo request is confirmed! We'll reach
                        out to{" "}
                        <strong className={colors.textPrimaryDark}>
                          {formData.email}
                        </strong>{" "}
                        within 1 business day to schedule.
                      </motion.p>
                      <motion.div
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                      >
                        <Button
                          to="/"
                          variant="secondary"
                          size="lg"
                          icon={<FiHome />}
                          className={`!border !${colors.borderLight} hover:!border-neutral-main/50`}
                        >
                          Explore More While You Wait
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </motion.form>
              </AnimatePresence>
            </div>
          </motion.div>{" "}
          {/* End Form Column */}
        </div>{" "}
        {/* End Main Content Grid */}
      </div>
    </div>
  );
}
