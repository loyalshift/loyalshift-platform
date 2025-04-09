// src/pages/Contact.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar,
  FiMessageSquare,
  FiHelpCircle, // New icons for CTAs
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

// Import reusable components
import InputField from "../components/InputField";
import ContactInfoItem from "../components/ContactInfoItem";
import Button from "../components/Button";

// --- Animation Variants ---
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
// --- End Animation Variants ---

export default function Contact() {
  const initialFormData = { email: "", message: "" }; // Simplified initial form
  const [formData, setFormData] = useState(initialFormData);
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // 'idle', 'submitting'
  const [showQuickMessage, setShowQuickMessage] = useState(false); // State to toggle quick message

  // Get current time info (as provided in context)
  const now = new Date("2025-04-13T13:57:27-06:00"); // Sunday, 1:57 PM CST (use ISO format for Date constructor)
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours(); // 0-23

  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isOutsideBusinessHours = hour < 8 || hour >= 17; // Assuming 8 AM - 5 PM business hours

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQuickMessageSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      toast.error("Please fill in both email and message.");
      return;
    }
    setSubmissionStatus("submitting");
    const toastId = toast.loading("Sending your message...");

    // --- Simulate API Call ---
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      if (Math.random() > 0.2) {
        // Simulate success
        console.log("Quick Message Submitted:", formData);
        toast.success("Message sent! We'll reply soon.", { id: toastId });
        setFormData(initialFormData); // Clear form
        setShowQuickMessage(false); // Optionally hide form on success
      } else {
        // Simulate error
        throw new Error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.message || "An error occurred.", { id: toastId });
    } finally {
      setSubmissionStatus("idle");
    }
    // --- End Simulation ---
  };

  const isSubmitting = submissionStatus === "submitting";

  return (
    // Use Tailwind colors from config
    <div className="py-16 md:py-24 bg-neutral-light">
      <Toaster position="bottom-right" reverseOrder={false} />{" "}
      {/* Toast container */}
      <div className="container mx-auto px-4">
        {/* --- Interactive Header --- */}
        <motion.section
          className="text-center mt-16 mb-16 md:mb-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-dark mb-5"
          >
            How can we <span className="text-primary-main">help you</span>{" "}
            today?
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-neutral-main max-w-3xl mx-auto mb-8"
          >
            Choose an option below, send a quick message, or find our direct
            contact details.
            {(isWeekend || isOutsideBusinessHours) && (
              <span className="block text-sm mt-2 text-status-warning">
                Note: It's currently outside our standard business hours
                (Mon-Fri, 9am-5pm EST). We'll respond as soon as possible!
              </span>
            )}
          </motion.p>
        </motion.section>

        {/* --- Primary Action Cards --- */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-20 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {/* Schedule a Demo Card */}
          <motion.div variants={fadeInUp}>
            <div className="bg-neutral-white p-8 rounded-lg shadow-lg border border-neutral-light text-center h-full flex flex-col justify-between hover:border-primary-main transition-colors duration-300">
              <FiCalendar className="w-12 h-12 text-primary-main mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-dark mb-3">
                See LoyalShift in Action
              </h2>
              <p className="text-neutral-main mb-6 flex-grow">
                Get a personalized demo tailored to your specific legacy systems
                and business goals.
              </p>
              <Button
                to="/request-demo"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Schedule a Demo
              </Button>
            </div>
          </motion.div>

          {/* Talk to Sales Card */}
          <motion.div variants={fadeInUp}>
            <div className="bg-neutral-white p-8 rounded-lg shadow-lg border border-neutral-light text-center h-full flex flex-col justify-between hover:border-primary-main transition-colors duration-300">
              <FiMessageSquare className="w-12 h-12 text-primary-main mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-dark mb-3">
                Talk to Our Sales Team
              </h2>
              <p className="text-neutral-main mb-6 flex-grow">
                Discuss your project requirements, pricing, or get answers to
                specific sales questions.
              </p>
              <Button
                to="/contact-sales"
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Contact Sales
              </Button>{" "}
              {/* Assuming Button handles 'to' */}
            </div>
          </motion.div>
        </motion.section>

        {/* --- Quick Message / General Inquiry Section --- */}
        <motion.section
          className="mb-16 md:mb-20 max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          {/* --- Quick Message / General Inquiry Section --- */}
          <motion.section
            // Removed text-center from parent, centering handled by elements within or max-width
            className="mb-16 md:mb-20 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInUp} // Animate the whole section container appearing
          >
            {/* Use AnimatePresence to switch between the trigger card and the form title */}
            <AnimatePresence mode="wait">
              <motion.div
                key="trigger-card" // Key for AnimatePresence
                className={`bg-neutral-white p-6 md:p-8 rounded-lg shadow-md border border-neutral-light text-center cursor-pointer hover:shadow-lg hover:border-primary-main/40 transition-all duration-300 group`}
                onClick={() => setShowQuickMessage(true)}
                whileHover={{ y: -5 }} // Subtle lift on hover
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0 }} // Fade in the card
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} // Fade out the card
                variants={fadeInUp} // Can apply variant here too if needed inside a parent stagger
              >
                <FiHelpCircle className="w-12 h-12 text-primary-main mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary-dark" />

                {!showQuickMessage ? (
                  <>
                    <h2 className="text-2xl font-bold text-neutral-dark mb-2 group-hover:text-primary-main transition-colors">
                      Have a Different Question?
                    </h2>
                    <p className="text-neutral-main mb-0 group-hover:text-neutral-dark transition-colors">
                      Click here to send us a quick message.
                    </p>
                    <p className="text-sm text-neutral-main/70 mt-2">
                      We typically respond within one business day.
                      {(isWeekend || isOutsideBusinessHours) &&
                        " (Responses may be slightly delayed)."}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-neutral-dark mb-2">
                      Send a Quick Message
                    </h2>
                    <p className="text-neutral-main mb-0 group-hover:text-neutral-dark transition-colors">
                      Just need your email and message.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* --- The Form (Animated) --- */}
            {/* AnimatePresence handles the mounting/unmounting animation */}
            <AnimatePresence>
              {showQuickMessage && (
                <motion.form
                  key="quick-message-form"
                  onSubmit={handleQuickMessageSubmit}
                  className="space-y-5 bg-neutral-white p-6 md:p-8 rounded-lg shadow-md border border-neutral-light text-left"
                  // Animation for the form appearing/disappearing
                  initial={{
                    opacity: 0,
                    height: 0,
                    marginTop: 0,
                    overflow: "hidden",
                  }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1.5rem" }} // Animate margin for spacing
                  exit={{
                    opacity: 0,
                    height: 0,
                    marginTop: 0,
                    overflow: "hidden",
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Smoother ease
                >
                  {/* InputField components remain the same */}
                  <InputField
                    id="quick-email"
                    name="email"
                    label="Your Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="So we can reply to you"
                  />
                  <InputField
                    id="quick-message"
                    name="message"
                    label="Your Message"
                    type="textarea"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Ask us anything..."
                  />
                  {/* Form Actions */}
                  <div className="flex flex-wrap justify-between items-center gap-4 pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      icon={
                        isSubmitting ? (
                          <FiLoader className="animate-spin h-5 w-5" />
                        ) : (
                          <FiSend className="h-5 w-5" />
                        )
                      }
                      size="lg" // Make button larger to match primary CTAs
                    >
                      {isSubmitting ? "Sending..." : "Send Quick Message"}
                    </Button>
                    {/* Cancel Button */}
                    <button
                      type="button"
                      onClick={() => setShowQuickMessage(false)}
                      className="text-sm text-neutral-main hover:text-neutral-dark font-medium transition-colors duration-200 px-3 py-2 rounded hover:bg-neutral-main/10"
                      aria-label="Cancel sending message"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.section>
        </motion.section>

        {/* --- Direct Contact Information --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          <h2 className="text-3xl font-bold text-neutral-dark text-center mb-10">
            Direct Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Email */}
            <motion.div variants={fadeInUp}>
              <ContactInfoItem
                icon={FiMail}
                title="Email Us"
                lines={["info@loyalshift.com", "General Inquiries"]}
                links={["mailto:info@loyalshift.com", null]}
              />
            </motion.div>
            {/* Phone */}
            {/* <motion.div variants={fadeInUp}>
              <ContactInfoItem
                icon={FiPhone}
                title="Call Us"
                lines={["+506 6356-2425", "Mon-Fri, 9am-5pm EST"]}
                links={["tel:+50663562425", null]}
              />
            </motion.div> */}
            {/* Address */}
            <motion.div variants={fadeInUp}>
              <ContactInfoItem
                icon={FiMapPin}
                title="Visit Us"
                lines={["Boston, MA", "(By Appointment)"]}
              />
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
