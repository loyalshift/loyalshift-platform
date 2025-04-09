// src/pages/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiHome, FiCompass, FiArrowLeft } from 'react-icons/fi';

// Assuming Button component path is correct and it handles the 'to' prop for Links
import Button from '../components/Button';

// Define light theme colors (consistent with AboutUs.js, Contact.js etc.)
const colors = {
    bgBase: "bg-neutral-light",
    bgWhite: "bg-neutral-white",
    textHeading: "text-neutral-dark",
    textBody: "text-neutral-main",
    textPrimary: "text-primary-main",
    textWarning: "text-status-warning", // Using warning color for icon/emphasis
    borderLight: "border-neutral-light",
};

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.2 };

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};
// --- End Animation Variants ---

export default function NotFound() {
    return (
        // Main container for the page content within the Layout
        <div className={`${colors.bgBase} flex items-center justify-center min-h-[calc(100vh-150px)] py-16 md:py-24 px-4`}>
            {/* Adjust min-h based on your header/footer height if needed */}

            <motion.div
                className="text-center max-w-xl"
                initial="hidden"
                animate="visible" // Animate on load
                variants={staggerContainer}
            >
                {/* Icon */}
                <motion.div variants={scaleUp} className="mb-6">
                    <FiAlertTriangle className={`w-20 h-20 ${colors.textWarning} mx-auto opacity-80`} />
                </motion.div>

                {/* 404 Emphasis */}
                <motion.div
                     variants={fadeInUp}
                     className={`text-7xl md:text-9xl font-bold ${colors.textBody} opacity-20 mb-2`}
                     aria-hidden="true" // Decorative, main message is in h1
                >
                    404
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    variants={fadeInUp}
                    className={`text-3xl md:text-4xl font-bold ${colors.textHeading} mb-3`}
                >
                    Page Not Found
                </motion.h1>

                {/* Description */}
                <motion.p
                    variants={fadeInUp}
                    className={`text-lg ${colors.textBody} mb-8`}
                >
                    Oops! It looks like the page you're searching for doesn't exist or may have been moved.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <Button
                        to="/" // Link to homepage
                        variant="primary" // Use primary style for the main action
                        size="lg"
                        icon={<FiHome className="w-5 h-5" />}
                    >
                        Go to Homepage
                    </Button>
                    <Button
                        to="/solutions" // Link to solutions page
                        variant="secondary"
                        size="lg"
                         // Optional: Override secondary style for better contrast on light bg if needed
                        className="!bg-transparent !border !border-neutral-main/70 !text-neutral-dark hover:!border-neutral-main hover:!bg-neutral-main/5 focus:!ring-neutral-main/50"
                        icon={<FiCompass className="w-5 h-5" />}
                    >
                        Explore Solutions
                    </Button>
                     {/* Optional: Back button */}
                    {/* <button
                        onClick={() => window.history.back()} // Simple back navigation
                        className={`inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold rounded-lg transition-all duration-300 ease-out shadow-sm ${colors.textBody} bg-neutral-white border border-neutral-light hover:border-neutral-main hover:scale-105 transform`}
                    >
                         <FiArrowLeft className="mr-2 w-5 h-5" /> Go Back
                    </button> */}
                </motion.div>
            </motion.div>
        </div>
    );
}
