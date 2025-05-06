// src/pages/AboutUs.js
// Brand new version with a pillar-based structure (Purpose, Approach, People).

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FiTarget, // Purpose, Mission
  FiEye, // Vision
  FiHeart, // Values, Culture
  FiZap, // Approach (Zero-Disruption)
  FiShare2, // Approach (Integration)
  FiShield, // Approach (Security)
  FiCheckCircle, // Benefits, Values Check
  FiArrowRight, // CTA Button
  FiTrendingUp, // Social Proof / Results
  FiLinkedin, // Team Member Social Link
  FiStar, // Team Expertise
  FiAward, // Social Proof (Awards/Logos)
  FiMessageSquare, // Social Proof (Testimonial)
  FiChevronDown,
} from "react-icons/fi";
import { AnimatePresence } from "framer-motion";

// Assuming Button component exists and is imported correctly
import Button from "../components/Button";
import { ReactComponent as LoyalShiftLogo } from "../logo.svg";

// --- Theme Colors (Light Theme) ---
// Consistent color palette based on previous context
const colors = {
  bgBase: "bg-neutral-light",
  bgWhite: "bg-neutral-white",
  bgSubtle: "bg-slate-50", // Very light background for subtle section differentiation
  textHeading: "text-neutral-dark",
  textBody: "text-neutral-main",
  textSubtle: "text-neutral-500", // Lighter text for subtitles or captions
  textPrimary: "text-primary-main",
  textPrimaryDark: "text-primary-dark",
  primaryMain: "bg-primary-main",
  primaryContrast: "text-primary-contrast",
  borderLight: "border-neutral-200", // Slightly more visible light border
  borderMedium: "border-neutral-300",
  borderPrimary: "border-primary-main",
  accentSuccess: "text-status-success",
  // Dark theme colors for CTA
  darkBgGradient: "bg-gradient-to-br from-slate-900 to-gray-900",
  darkTextPrimary: "text-white",
  darkTextSecondary: "text-slate-300",
  darkTextHighlight: "text-cyan-400",
  darkRing: "ring-1 ring-inset ring-white/10",
};

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};
// --- End Animation Variants ---

// --- Reusable Section Component ---
// Added option for wider padding on y-axis
const Section = ({
  children,
  className = "",
  bg = colors.bgBase,
  widePadding = false,
  ...props
}) => (
  <motion.section
    className={`${
      widePadding ? "py-20 md:py-28" : "py-16 md:py-20"
    } ${bg} ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={viewportSettings}
    variants={staggerContainer}
    {...props}
  >
    {/* Using max-w-5xl for a slightly more contained feel */}
    <div className="container mx-auto px-4 max-w-5xl">{children}</div>
  </motion.section>
);
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  widePadding: PropTypes.bool,
};

// --- Reusable Section Title ---
// Simplified title component
const SectionTitle = ({
  title,
  children,
  align = "center",
  className = "",
}) => (
  <motion.div
    className={`mb-10 md:mb-12 ${
      align === "center" ? "text-center" : "text-left"
    } ${className}`}
    variants={fadeInUp}
  >
    <h2
      className={`text-3xl md:text-4xl font-bold ${colors.textHeading} leading-tight mb-4`}
    >
      {title}
    </h2>
    {children && (
      <p
        className={`text-lg ${colors.textBody} ${
          align === "center" ? "max-w-3xl mx-auto" : "max-w-none"
        }`}
      >
        {children}
      </p>
    )}
  </motion.div>
);
SectionTitle.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
  align: PropTypes.oneOf(["left", "center"]),
  className: PropTypes.string,
};

// --- Reusable Pillar Card ---
// For Mission, Vision, Values within the Purpose Pillar
const PillarCard = ({ icon: Icon, title, children }) => (
  <motion.div
    variants={fadeInUp}
    className={`p-6 rounded-lg ${colors.bgWhite} border ${colors.borderLight} shadow-sm`}
  >
    <div className="flex items-center mb-3">
      <Icon
        className={`w-7 h-7 ${colors.textPrimary} mr-3 flex-shrink-0`}
        aria-hidden="true"
      />
      <h3 className={`text-xl font-semibold ${colors.textHeading}`}>{title}</h3>
    </div>
    <div className={`text-base ${colors.textBody} space-y-2`}>{children}</div>
  </motion.div>
);
PillarCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// --- Reusable Approach Feature Item ---
const ApproachFeature = ({ icon: Icon, title, children }) => (
  <motion.div variants={fadeInUp} className="flex items-start">
    <div
      className={`p-3 rounded-full bg-primary-main/10 border border-primary-main/20 mr-4 mt-1 flex-shrink-0`}
    >
      <Icon className={`w-6 h-6 ${colors.textPrimary}`} aria-hidden="true" />
    </div>
    <div>
      <h4 className={`text-lg font-semibold ${colors.textHeading} mb-1`}>
        {title}
      </h4>
      <p className={`${colors.textBody} text-base`}>{children}</p>
    </div>
  </motion.div>
);
ApproachFeature.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// --- Reusable TeamMemberCard Component (Simplified for this layout) ---
const TeamMemberCard = ({ name, title, imageUrl, linkedinUrl }) => (
  <motion.div
    variants={fadeInUp}
    className={`text-center ${colors.bgWhite} p-6 rounded-lg shadow-md border ${colors.borderLight} hover:shadow-lg transition-shadow duration-300`}
    whileHover={{ y: -3 }}
  >
    <img
      src={imageUrl}
      alt={`Photo of ${name}`}
      className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-white shadow-sm" // Smaller image
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://placehold.co/96x96/e2e8f0/64748b?text=${name
          .split(" ")
          .map((n) => n[0])
          .join("")}`;
      }}
    />
    <h3 className={`text-lg font-semibold ${colors.textHeading} mb-0.5`}>
      {name}
    </h3>
    <p className={`${colors.textPrimary} text-sm font-medium mb-3`}>{title}</p>
    {linkedinUrl && (
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`LinkedIn profile of ${name}`}
        className={`inline-block text-neutral-400 hover:${colors.textPrimary} transition-colors`}
      >
        <FiLinkedin className="w-5 h-5" />
      </a>
    )}
  </motion.div>
);
TeamMemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  linkedinUrl: PropTypes.string,
};

// --- Main AboutUs Component ---
export default function AboutUs() {
  // Placeholder data (can be fetched or imported)
  const cycleTextVariant = {
    hidden: { opacity: 0, filter: "blur(5px)", y: 15 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      filter: "blur(5px)",
      y: -15,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const teamMembers = [
    {
      name: "Gerardo Solís",
      title: "Co-Founder & CEO",
      imageUrl: `https://placehold.co/96x96/a5b4fc/1e293b?text=GS`,
      linkedinUrl: "#",
    },
    // {
    //   name: "Daniel Solís",
    //   title: "Co-Founder & CTO",
    //   imageUrl: `https://placehold.co/96x96/a5b4fc/1e293b?text=DS`,
    //   linkedinUrl: "#",
    // },
    // {
    //   name: "Miguel Imbach",
    //   title: "Head of AI Development & Research",
    //   imageUrl: `https://placehold.co/96x96/a5b4fc/1e293b?text=MI`,
    //   linkedinUrl: "#",
    // },
    {
      name: "Bernardo Solano",
      title: "Head of Marketing",
      imageUrl: `https://placehold.co/96x96/a5b4fc/1e293b?text=BS`,
      linkedinUrl: "#",
    },
    {
      name: "Brandon Hernández",
      title: "Head of Product",
      imageUrl: `https://placehold.co/96x96/a5b4fc/1e293b?text=BH`,
      linkedinUrl: "#",
    },
    {
      name: "Miguel Mesén",
      title: "Head of Legacy Development",
      imageUrl: `https://placehold.co/96x96/a5b4fc/1e293b?text=MM`,
      linkedinUrl: "#",
    },
    // {
    //   name: "Natalia Morera",
    //   title: "Head of Design",
    //   imageUrl: `https://placehold.co/96x96/a5b4fc/1e293b?text=NM`,
    //   linkedinUrl: "#",
    // },
    // Add more team members if needed
  ];
  const coreValues = [
    "Zero-Disruption Modernization",
    "Explainable AI Automation",
    "Future-Proof Architecture",
    "Uncompromising Security",
    "Transparent Partnership",
    "Respect for Legacy",
  ];

  // --- Within your AboutUs component function ---

  // State for Hero Animation
  const [heroPhase, setHeroPhase] = useState("animating");
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const aboutUsAnimationPhases = [
    "Bridging Legacy & Future",
    "Intelligent Modernization",
    "Transformation Without Disruption",
  ];
  const phaseDuration = 2000;
  const autoScrollDelay = 5000; // Wait 7 seconds after animation

  // Refs for auto-scroll logic
  const autoScrollTimeoutRef = useRef(null);
  const interactionDetectedRef = useRef(false);

  // Function to scroll smoothly to the next section
  // IMPORTANT: Ensure the section AFTER the hero has id="about-content-start"
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about-content-start"); // <--- UPDATE THIS ID if needed
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      console.log("Auto-scrolling to next section.");
    } else {
      console.warn(
        "Auto-scroll target section not found (expected id='about-content-start')."
      );
    }
  };

  // Handler to detect user interaction and cancel auto-scroll
  const handleInteraction = () => {
    if (!interactionDetectedRef.current) {
      console.log("User interaction detected, cancelling auto-scroll.");
      interactionDetectedRef.current = true;
      clearTimeout(autoScrollTimeoutRef.current);
    }
    // Optional: remove listeners after first interaction
  };

  // Effect to manage interaction listeners
  useEffect(() => {
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("mousedown", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      clearTimeout(autoScrollTimeoutRef.current);
    };
  }, []); // Runs once on mount/unmount

  // Effect to handle the animation sequence timing
  useEffect(() => {
    if (heroPhase === "animating") {
      const totalAnimationTime = aboutUsAnimationPhases.length * phaseDuration;
      const phaseTimer = setInterval(() => {
        setCurrentPhaseIndex((prevIndex) => prevIndex + 1);
      }, phaseDuration);

      const completionTimer = setTimeout(() => {
        clearInterval(phaseTimer);
        setHeroPhase("complete");
      }, totalAnimationTime);

      return () => {
        clearInterval(phaseTimer);
        clearTimeout(completionTimer);
      };
    }
  }, [heroPhase, aboutUsAnimationPhases.length]);

  // Effect to handle setting the auto-scroll timeout AFTER animation completes
  useEffect(() => {
    if (heroPhase === "complete") {
      interactionDetectedRef.current = false;
      console.log("AboutUs Hero complete. Setting auto-scroll timeout.");
      clearTimeout(autoScrollTimeoutRef.current); // Clear previous just in case

      autoScrollTimeoutRef.current = setTimeout(() => {
        if (!interactionDetectedRef.current) {
          scrollToNextSection();
        } else {
          console.log("AboutUs auto-scroll skipped due to prior interaction.");
        }
      }, autoScrollDelay);
    }
    return () => {
      // Cleanup timeout if phase changes before trigger
      clearTimeout(autoScrollTimeoutRef.current);
    };
  }, [heroPhase]); // Dependency on heroPhase

  // --- The JSX for the Hero Section ---
  return (
    <>
      {/* --- Hero Section (Full Screen, Auto-Scroll) --- */}
      <Section
        bg={colors.bgWhite} // Using light background
        widePadding={false} // Remove widePadding if using min-h-screen and flex centering
        aria-labelledby="about-hero-title"
        // Updated classes for full screen and vertical centering
        className="flex items-center justify-center min-h-screen overflow-hidden"
      >
        {/* Container to hold animation/content */}
        <div className="w-full text-center px-4">
          {" "}
          {/* Added horizontal padding */}
          <AnimatePresence mode="wait">
            {heroPhase === "animating" && (
              <motion.div
                key={currentPhaseIndex}
                variants={cycleTextVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center justify-center"
              >
                <h1
                  className={`text-4xl md:text-5xl font-bold ${colors.textHeading}`}
                >
                  {
                    aboutUsAnimationPhases[
                      currentPhaseIndex % aboutUsAnimationPhases.length
                    ]
                  }
                </h1>
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }} // Pulse scale and opacity
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="mt-8" // Adjusted margin
                >
                  {/* Ensure logo component accepts className for sizing/color */}
                  {/* Using textPrimary for light theme */}
                  <LoyalShiftLogo
                    className={`w-16 h-16 ${colors.textPrimary}`}
                  />
                  {/* Adjust size/color */}
                </motion.div>
              </motion.div>
            )}

            {heroPhase === "complete" && (
              <motion.div
                key="about-hero-content"
                initial="hidden"
                animate="visible"
                variants={fadeInUp} // Simple fade-in for the whole title block
              >
                <SectionTitle
                  id="about-hero-title" // Ensure ID is set for aria
                  title={
                    <>
                      Modernizing Enterprise Systems,{" "}
                      <span className={colors.textPrimary}>
                        Respecting Your Legacy
                      </span>
                    </>
                  }
                  align="center"
                >
                  LoyalShift bridges the gap between decades of established
                  operations and the potential of future-proof AI, enabling
                  transformation without disruption.
                </SectionTitle>
                {/* No button needed here based on original About Us hero */}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Scroll Down Indicator - Hidden on Mobile */}
          <AnimatePresence>
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 sm:block" // Hidden below sm breakpoint
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [0.8, 1, 0.8] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
              >
                <FiChevronDown className="text-black/70 text-3xl" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      {/* --- Pillar 1: Our Purpose --- */}
      {/* --- NEXT SECTION - IMPORTANT: Add id="about-content-start" (or similar) here --- */}
      <div id="about-content-start">
        <Section aria-label="Our Mission">
          <SectionTitle
            title="Our Purpose"
            align="left"
            subtitle="Why We Exist"
            className="mt-60"
          >
            We believe technology should empower, not hinder. Our purpose is to
            unlock the vast potential trapped within legacy systems, enabling
            businesses to innovate freely while preserving their operational
            core.
          </SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mission */}
            <PillarCard icon={FiTarget} title="Mission">
              <p>
                To transform outdated business systems into agile, AI-powered
                operations without the disruption and expense of replacement.
              </p>
            </PillarCard>
            {/* Vision */}
            <PillarCard icon={FiEye} title="Vision">
              <p>
                A future where no business is held back by its technological
                past, and digital transformation is accessible, safe, and
                valuable for all enterprises.
              </p>
            </PillarCard>
            {/* Values */}
            <PillarCard icon={FiHeart} title="Core Values">
              <ul className="list-none pl-0 space-y-1 text-sm">
                {coreValues.slice(0, 4).map(
                  (
                    value,
                    i // Show first 4 values concisely
                  ) => (
                    <li key={i} className="flex items-center">
                      <FiCheckCircle
                        className={`w-4 h-4 mr-2 ${colors.accentSuccess} flex-shrink-0`}
                      />{" "}
                      {value}
                    </li>
                  )
                )}
                <li>...and more (see below)</li>
              </ul>
            </PillarCard>
          </div>
        </Section>
      </div>

      {/* --- Pillar 2: Our Approach & Technology (REVISED LAYOUT) --- */}
      <Section aria-labelledby="approach-title" bg={colors.bgWhite}>
        {/* Using grid layout, items-center helps vertically align if columns have different heights */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* --- Left Column: Text Description --- */}
          <motion.div variants={fadeInUp}>
            <SectionTitle
              title="Our Approach"
              subtitle="Intelligent Modernization"
              align="left"
            />
            <p className={`text-lg ${colors.textBody} mb-6 leading-relaxed`}>
              We don't believe in rip-and-replace. Our unique framework combines
              deep system understanding with cutting-edge, explainable AI to
              work alongside your existing infrastructure. We focus on
              augmenting your capabilities safely and efficiently.
            </p>
            {/* Add more descriptive text here if desired */}
          </motion.div>

          {/* --- Right Column: Key Features/Products --- */}
          {/* Moved the 'ApproachFeature' list here, removed image placeholder */}
          <motion.div
            // Apply stagger effect to the features within this column
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="space-y-6 md:space-y-8" // Adjusted spacing between features
          >
            {/* Key Approach Features (moved from left column) */}
            {/* Each ApproachFeature likely has its own fadeInUp variant */}
            <ApproachFeature
              icon={FiZap}
              title="Zero-Disruption with Smart Mirror™"
            >
              Safely test and validate changes against live data in a parallel
              environment before deployment, eliminating cutover risks.
            </ApproachFeature>
            <ApproachFeature
              icon={FiShare2}
              title="Universal Adapter™ Connectivity"
            >
              Seamlessly integrate legacy sources (databases, files, APIs) with
              modern applications without complex re-engineering.
            </ApproachFeature>
            <ApproachFeature icon={FiShield} title="Audit Guardian™ Compliance">
              Ensure security and compliance with traceable AI actions and
              customizable rule enforcement for standards like SOC2 and HIPAA.
            </ApproachFeature>
          </motion.div>
        </div>
      </Section>

      {/* --- Pillar 3: Our People & Culture --- */}
      <Section aria-labelledby="people-title">
        <SectionTitle title="Our People" subtitle="Expertise & Collaboration" />
        <motion.p
          variants={fadeInUp}
          className={`text-lg ${colors.textBody} text-center max-w-3xl mx-auto mb-12 md:mb-16`}
        >
          LoyalShift is powered by a diverse team of seasoned AI researchers,
          veteran system integrators, enterprise architects, and compliance
          specialists united by a passion for solving complex legacy challenges.
          We foster a culture of curiosity, collaboration, and continuous
          learning.
        </motion.p>
        {/* Team Member Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto" // Centered grid
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </motion.div>
        <motion.div variants={fadeInUp} className="text-center mt-16">
          <Button
            to="/careers"
            variant="secondary"
            size="lg"
            className={`!border !${colors.borderDark} hover:!border-primary-main hover:!text-primary-main`}
          >
            Join Our Team
          </Button>
        </motion.div>
      </Section>

      {/* --- Social Proof Section (Placeholder) --- */}
      <Section aria-labelledby="social-proof-title" bg={colors.bgWhite}>
        <SectionTitle title="Proven Results" subtitle="Client Success" />
        <motion.p
          variants={fadeInUp}
          className={`text-lg ${colors.textBody} text-center max-w-3xl mx-auto mb-12`}
        >
          We partner with enterprises to achieve significant modernization
          outcomes, consistently delivering measurable improvements in
          efficiency and cost savings.
        </motion.p>
        {/* Placeholder for Logos or Testimonial Card */}
        <motion.div
          variants={fadeInUp}
          className={` p-8 rounded-lg border ${colors.borderMedium} ${colors.bgBase}`}
        >
          <h3 className={`text-center font-semibold ${colors.textBody} mb-6`}>
            Trusted By Leading Enterprises
          </h3>
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-4xl mx-auto ${colors.textBody} opacity-50 grayscale`}
          >
            {/* Replace with actual logos */}
            <div className="flex justify-center">
              <FiAward className="w-16 h-16" />
            </div>
            <div className="flex justify-center">
              <FiTrendingUp className="w-16 h-16" />
            </div>
            <div className="flex justify-center">
              <FiCheckCircle className="w-16 h-16" />
            </div>
            <div className="flex justify-center">
              <FiStar className="w-16 h-16" />
            </div>
          </div>
          {/* Example Testimonial Placeholder Structure */}
          <div className="mt-10 pt-6 border-t border-neutral-light max-w-2xl mx-auto">
            <blockquote
              className={`relative text-lg italic ${colors.textBody} text-center`}
            >
              <FiMessageSquare
                className={`w-8 h-8 ${colors.textPrimary} opacity-20 absolute -top-2 left-0 transform -translate-x-1/2`}
                aria-hidden="true"
              />
              "LoyalShift's approach minimized risk and delivered value far
              faster than we thought possible."
              <footer
                className={`${colors.textBody} font-semibold mt-3 text-sm`}
              >
                — Head of IT, Global Logistics Firm
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </Section>

      {/* --- Final Call to Action (Dark Theme) --- */}
      <Section className="!py-0 mb-20 !max-w-full !px-0">
        <motion.div
          className={`relative mt-16 md:mt-20 py-20 md:py-24 px-6 md:px-8 ${colors.darkBgGradient} rounded-none md:rounded-2xl shadow-xl text-center overflow-hidden ${colors.darkRing}`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          {/* Decorative elements */}
          <div
            className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3"
            aria-hidden="true"
          >
            {" "}
            <div
              className={`w-80 h-80 ${colors.darkTextHighlight}/5 rounded-full blur-3xl opacity-50`}
            ></div>{" "}
          </div>
          <div
            className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3"
            aria-hidden="true"
          >
            {" "}
            <div
              className={`w-72 h-72 ${colors.darkTextPrimary}/10 rounded-full blur-3xl opacity-60`}
            ></div>{" "}
          </div>
          {/* Content */}
          <motion.div
            variants={fadeInUp}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold ${colors.darkTextPrimary} mb-5 leading-tight`}
            >
              Ready to Modernize{" "}
              <span className={colors.darkTextHighlight}>
                Without Disruption?
              </span>
            </h2>
            <p
              className={`text-lg ${colors.darkTextSecondary} max-w-3xl mx-auto mb-12`}
            >
              Discover how our unique AI-driven approach delivers measurable
              results, guaranteed security, and a seamless transition. Request a
              personalized assessment or contact our experts to discuss your
              specific goals today.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 md:gap-5">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                icon={<FiArrowRight />}
                className="transform transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5"
              >
                Talk to Sales
              </Button>
              <Button
                to="/request-demo"
                variant="secondary"
                size="lg"
                icon={<FiArrowRight />}
                className={`!text-blue-400 !border-2 !border-blue-500 !bg-transparent hover:!bg-blue-500/10 transform transition-all duration-200 hover:scale-105 hover:-translate-y-0.5`}
              >
                Request Personalized Demo
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Section>
    </>
  );
}
