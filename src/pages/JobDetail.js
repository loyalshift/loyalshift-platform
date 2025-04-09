// src/pages/JobDetailPage.js

import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Removed useNavigate as Apply button links directly
import { motion } from 'framer-motion';
import {
    FiBriefcase, FiMapPin, FiClock, FiArrowLeft, FiCheckCircle,
    FiAlertTriangle, FiTool, FiList, FiSend, FiTarget, // Added FiTarget for Opportunity
    FiUsers, FiCpu, FiZap, FiTrendingUp // Added icons for Why Join section
} from 'react-icons/fi';

// Import the expanded job data
import { jobOpenings } from '../data/jobs'; // Adjust path if necessary
import Button from '../components/Button';

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
    bgHighlightSoft: "bg-primary-main/5", // Soft background for highlights
    borderHighlightSoft: "border-primary-main/10",
};

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
// --- End Animation Variants ---

// --- Reusable Helper Components ---
const DetailSection = ({ title, children, icon: Icon, className = "" }) => (
    <motion.div variants={fadeInUp} className={`mb-8 ${className}`}>
        <div className="flex items-center mb-4 border-b border-neutral-light pb-2">
            {Icon && <Icon className={`w-6 h-6 ${colors.textPrimary} mr-3 flex-shrink-0`} aria-hidden="true" />}
            <h2 className={`text-2xl font-semibold ${colors.textHeading}`}>{title}</h2>
        </div>
        <div className={`${colors.textBody} text-base leading-relaxed space-y-3`}> {/* Added space-y for paragraphs */}
            {children}
        </div>
    </motion.div>
);
// Add PropTypes if needed

const BulletList = ({ items }) => (
    <ul className={`list-none pl-0 space-y-2.5`}> {/* Increased spacing */}
        {items.map((item, index) => (
            <motion.li key={index} variants={fadeInUp} className="flex items-start">
                <FiCheckCircle className={`w-5 h-5 ${colors.accentSuccess} mr-3 mt-1 flex-shrink-0`} />
                <span>{item}</span>
            </motion.li>
        ))}
    </ul>
);
// Add PropTypes if needed

const WhyJoinItem = ({ icon: Icon, text }) => (
     <motion.div variants={fadeInUp} className="flex items-center">
        <Icon className={`w-5 h-5 ${colors.textPrimary} mr-3 flex-shrink-0`} aria-hidden="true" />
        <span className="font-medium">{text}</span>
    </motion.div>
);
// Add PropTypes if needed

// --- Main Enhanced Job Detail Page ---
export default function JobDetailPage() {
    const { jobId } = useParams();
    const job = jobOpenings.find(j => j.id.toString() === jobId);

    if (!job) {
        // (Keep the Not Found JSX from the previous version)
        return (
             <div className={`${colors.bgBase} py-20 md:py-28 text-center min-h-screen flex flex-col items-center justify-center`}>
                 <FiAlertTriangle className={`w-16 h-16 ${colors.textPrimary} opacity-80 mb-4`} />
                <h1 className={`text-3xl font-bold ${colors.textHeading} mb-4`}>Job Not Found</h1>
                <p className={`${colors.textBody} mb-8`}>Sorry, we couldn't find the job listing you were looking for.</p>
                <Button to="/careers" variant="secondary" icon={<FiArrowLeft />}>
                    Back to Careers
                </Button>
            </div>
        );
    }

    return (
        <div className={`${colors.bgBase} py-20 md:py-28`}>
            <div className="container mx-auto px-4 max-w-6xl"> {/* Slightly wider max-width */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {/* --- Back Link --- */}
                    <motion.div variants={fadeInUp} className="mb-8">
                        <Link to="/careers" className={`inline-flex items-center ${colors.textPrimary} hover:underline font-medium group`}>
                            <FiArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to All Openings
                        </Link>
                    </motion.div>

                    {/* --- Job Header --- */}
                    <motion.header
                        variants={fadeInUp}
                        className={`p-8 rounded-lg ${colors.bgWhite} shadow-lg border ${colors.borderLight} mb-10 relative overflow-hidden`} // Enhanced shadow
                    >
                         {/* Subtle background accent */}
                         <div className={`absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 ${colors.bgHighlightSoft} rounded-full opacity-50 blur-lg`} aria-hidden="true"></div>

                        <h1 className={`text-4xl md:text-5xl font-bold ${colors.textHeading} mb-3 relative z-10`}>
                            {job.title}
                        </h1>
                        {/* Optional: Add Impact Statement here */}
                        {job.impactStatement && (
                            <p className={`text-xl ${colors.textPrimary} mt-2 mb-4 relative z-10`}>{job.impactStatement}</p>
                        )}
                        <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-lg ${colors.textBody} relative z-10`}>
                           {/* (Keep the details: Department, Location, Type) */}
                            <span className="flex items-center"><FiBriefcase className="w-5 h-5 mr-2 opacity-80" /> {job.department}</span>
                            <span className="text-neutral-main/40 hidden sm:inline">|</span>
                            <span className="flex items-center"><FiMapPin className="w-5 h-5 mr-2 opacity-80" /> {job.location}</span>
                            <span className="text-neutral-main/40 hidden sm:inline">|</span>
                            <span className="flex items-center"><FiClock className="w-5 h-5 mr-2 opacity-80" /> {job.type}</span>
                        </div>
                    </motion.header>

                    {/* --- Main Content Grid (2 Columns on Large Screens) --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">

                        {/* Left Column (Main Description) */}
                        <motion.div
                            variants={fadeInUp} // Animate column as a whole
                            className={`lg:col-span-2 p-8 rounded-lg ${colors.bgWhite} shadow-sm border ${colors.borderLight}`}
                        >
                             <DetailSection title="The Opportunity" icon={FiTarget}>
                                <p className="whitespace-pre-line">{job.fullDescription}</p>
                            </DetailSection>

                            <DetailSection title="What You'll Achieve" icon={FiList}>
                                <BulletList items={job.responsibilities} />
                            </DetailSection>

                            <DetailSection title="What You Bring" icon={FiList}>
                                <BulletList items={job.qualifications} />
                            </DetailSection>
                        </motion.div>

                        {/* Right Column (Why Join, Benefits, Apply) */}
                        <motion.div variants={fadeInUp} className="lg:col-span-1 space-y-8">

                            {/* Why Join LoyalShift Section */}
                            <div className={`p-6 rounded-lg ${colors.bgHighlightSoft} border ${colors.borderHighlightSoft} shadow-sm`}>
                                 <h3 className={`text-xl font-semibold ${colors.textHeading} mb-4`}>Why Join LoyalShift?</h3>
                                 <div className="space-y-3 text-base text-neutral-dark">
                                     {/* Example items - pull from job.whyJoinSnippet or have static ones */}
                                     <WhyJoinItem icon={FiCpu} text="Work on cutting-edge, explainable AI." />
                                     <WhyJoinItem icon={FiZap} text="Solve complex legacy system challenges." />
                                     <WhyJoinItem icon={FiTrendingUp} text="High-impact role with growth potential." />
                                     <WhyJoinItem icon={FiUsers} text="Collaborative and innovative team culture." />
                                 </div>
                            </div>

                             {/* Perks & Benefits Section */}
                            <div className={`p-6 rounded-lg ${colors.bgWhite} shadow-sm border ${colors.borderLight}`}>
                                <DetailSection title="Perks & Benefits" icon={FiTool} className="mb-0"> {/* Remove bottom margin */}
                                    <BulletList items={job.benefits} />
                                </DetailSection>
                            </div>

                            {/* Apply Section */}
                            <div className={`p-6 rounded-lg ${colors.bgWhite} shadow-md border ${colors.borderLight} text-center sticky top-28`}> {/* Sticky top */}
                                 <h3 className={`text-xl font-semibold ${colors.textHeading} mb-4`}>Ready to Make an Impact?</h3>
                                <p className={`${colors.textBody} mb-6 text-sm`}>
                                    Help us reshape how enterprises approach modernization. Apply today!
                                </p>
                                <Button
                                    to={job.applyLink} // Or potentially link to a dedicated application form page
                                    variant="primary"
                                    size="lg"
                                    icon={<FiSend />}
                                    className="w-full" // Make button full width in this context
                                >
                                    Apply Now
                                </Button>
                             </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
