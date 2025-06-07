// src/pages/CaseStudies/AutonomousOperationsEngineCaseStudy.js
// REVISED: Reverted to a "Big CTA" / Strategic Landing Page concept.
// This page outlines the vision and capability for an Autonomous Operations Engine,
// inviting enterprises to partner with LoyalShift for co-creation.
// Uses LoyalShift Dark Theme.

import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiHardDrive, // Representing on-premise, local module
  FiLock, // Security
  FiCpu, // AI, Learning
  FiShare2, // Connections, Integration
  FiSliders, // Custom Functions, Management
  FiZap, // Core tech
  FiTrendingUp, // Future potential
  FiShield, // Core benefit
  FiMessageSquare, // CTA
  FiArrowRight,
  FiTool, // Capabilities
  FiDatabase, // Legacy systems
  FiBriefcase, // Enterprise focus
} from "react-icons/fi";
import SectionTitle from "../../components/SectionTitle"; // Assuming this is a general SectionTitle

import Button from "../../components/Button"; // Adjust path
import { useLocalization } from "../../components/LocalizationContext"; // Adjust path
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme"; // Adjust path

const theme = loyalShiftV2Theme;

// --- Animation Variants (consistent) ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Reusable Components ---
const SectionWrapper = ({
  children,
  className = "",
  bg = theme.background,
  id,
}) => (
  <motion.section
    id={id}
    className={`py-16 md:py-20 ${bg} ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={viewportSettings}
    variants={staggerContainer}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </motion.section>
);

SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  id: PropTypes.string,
};


const CapabilityCard = ({
  t,
  titleKey,
  descriptionKey,
  icon: Icon,
  defaultTitle,
  defaultDescription,
}) => (
  <motion.div
    variants={fadeInUp}
    className={`${theme.surface} p-6 rounded-xl ${theme.cardShadow} border ${theme.borderAccent} flex flex-col items-start backdrop-blur-sm h-full`}
    whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 20px rgba(0,174,239,0.08)"}}
  >
    <Icon className={`w-8 h-8 ${theme.textHighlight} mb-4`} />
    <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-2`}>
      {t(titleKey, defaultTitle)}
    </h3>
    <p className={`${theme.textSecondary} text-sm leading-relaxed`}>
      {t(descriptionKey, defaultDescription)}
    </p>
  </motion.div>
);

CapabilityCard.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  defaultTitle: PropTypes.string,
  defaultDescription: PropTypes.string,
};


const VisionPillar = ({ t, titleKey, descriptionKey, icon: Icon, defaultTitle, defaultDescription }) => (
    <motion.div variants={fadeInUp} className="flex items-start">
        <Icon className={`w-7 h-7 ${theme.textHighlight} mr-4 mt-1 flex-shrink-0`} />
        <div>
            <h4 className={`text-lg font-semibold ${theme.textPrimary} mb-1`}>{t(titleKey, defaultTitle)}</h4>
            <p className={`${theme.textSecondary}`}>{t(descriptionKey, defaultDescription)}</p>
        </div>
    </motion.div>
);

VisionPillar.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  defaultTitle: PropTypes.string,
  defaultDescription: PropTypes.string,
};


export default function AutonomousOperationsEngineCaseStudy() {
  const { t } = useLocalization();

  const visionPillarsData = [
    {
      icon: FiCpu,
      titleKey: "aoeCTA.visionPillar1.title",
      defaultTitle: "Self-Learning & Optimization",
      descriptionKey: "aoeCTA.visionPillar1.desc",
      defaultDesc: "An engine that continuously learns from your internal data to refine processes and predict outcomes, all within your secure environment."
    },
    {
      icon: FiShare2,
      titleKey: "aoeCTA.visionPillar2.title",
      defaultTitle: "Seamless Legacy Integration",
      descriptionKey: "aoeCTA.visionPillar2.desc",
      defaultDesc: "Connect and orchestrate your existing systems, PLCs, and custom functions through secure, high-performance internal adapters."
    },
    {
      icon: FiLock,
      titleKey: "aoeCTA.visionPillar3.title",
      defaultTitle: "Air-Gapped Security & Control",
      descriptionKey: "aoeCTA.visionPillar3.desc",
      defaultDesc: "Operate with complete data sovereignty. No external cloud dependencies for core AI processing and decision-making."
    },
     {
      icon: FiTrendingUp,
      titleKey: "aoeCTA.visionPillar4.title",
      defaultTitle: "Proactive & Predictive Operations",
      descriptionKey: "aoeCTA.visionPillar4.desc",
      defaultDesc: "Move beyond reactive fixes to predictive maintenance and proactive process adjustments, minimizing downtime and maximizing efficiency."
    }
  ];

  const loyalshiftCapabilitiesData = [
    {
      icon: FiHardDrive,
      titleKey: "aoeCTA.capability1.title",
      defaultTitle: "CipherCore™ On-Premise AI",
      descriptionKey: "aoeCTA.capability1.desc",
      defaultDesc: "Our hardened, deployable AI module designed for secure, offline learning and execution tailored to your proprietary data.",
    },
    {
      icon: FiDatabase,
      titleKey: "aoeCTA.capability2.title",
      defaultTitle: "Universal Adapter™ (Internal Mode)",
      descriptionKey: "aoeCTA.capability2.desc",
      defaultDesc: "Specialized configurations for robust and secure integration with diverse internal systems, databases, and industrial controls.",
    },
    {
      icon: FiSliders,
      titleKey: "aoeCTA.capability3.title",
      defaultTitle: "Adaptive Orchestration Engine",
      descriptionKey: "aoeCTA.capability3.desc",
      defaultDesc: "The intelligence layer that learns your operational workflows and orchestrates existing functions for autonomous execution.",
    },
    {
      icon: FiShield,
      titleKey: "aoeCTA.capability4.title",
      defaultTitle: "Enterprise-Grade Security Framework",
      descriptionKey: "aoeCTA.capability4.desc",
      defaultDesc: "Built with security at its core, ready for deployment in highly regulated and sensitive operational environments.",
    },
  ];


  return (
    <div className={`${theme.background} ${theme.textSecondary} overflow-x-hidden`}>
      {/* Hero Section: The Vision */}
      <SectionWrapper bg={theme.background} className="pt-24 md:pt-32 pb-16 md:pb-20">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={scaleUp}
            className={`inline-block mb-6 p-4 rounded-full ${theme.surfaceStrong} border ${theme.borderAccent} shadow-lg`}
          >
            <FiCpu className={`w-10 h-10 md:w-12 md:h-12 ${theme.textHighlight}`} />
          </motion.div>
          <p
            className={`text-sm md:text-base font-semibold ${theme.textHighlight} uppercase tracking-wider mb-3`}
          >
            {t("aoeCTA.hero.eyebrow", "Strategic Initiative")}
          </p>
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold ${theme.textPrimary} mb-6 leading-tight`}
          >
            {t("aoeCTA.hero.title", "Imagine Your Enterprise: Fully Autonomous, Entirely Secure.")}
          </h1>
          <p className={`text-lg md:text-xl ${theme.textSecondary} max-w-3xl mx-auto mb-10`}>
            {t("aoeCTA.hero.subtitle", "Partner with LoyalShift to co-create a bespoke Autonomous Operations Engine (AOE) – an on-premise, AI-powered core that learns from your data, orchestrates your existing systems, and operates securely offline.")}
          </p>
          <Button
              to="/contact-sales?solution=AutonomousOperationsEngine"
              variant="primary"
              size="xl" // Make button larger
              icon={<FiMessageSquare />}
              className="shadow-xl hover:shadow-cyan-500/40 transform hover:scale-105" // Add emphasis
            >
              {t("aoeCTA.hero.ctaButton", "Discuss Your Autonomous Vision")}
            </Button>
        </motion.div>
      </SectionWrapper>

      {/* The Unmet Need Section */}
      <SectionWrapper id="the-need" bg={`${theme.surfaceStrong} border-y ${theme.border}`}>
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div variants={fadeInUp}>
                <SectionTitle
                    t={t}
                    titleKey="aoeCTA.need.title"
                    defaultTitle="The Enterprise Imperative: Intelligence Without Exposure"
                    align="text-left"
                />
                <p className="text-lg leading-relaxed mb-4">{t("aoeCTA.need.p1", "Many critical industries – manufacturing, energy, defense, finance – require advanced automation and AI-driven insights. However, the sensitive nature of their data and operations often precludes the use of cloud-based AI solutions due to security, compliance, or connectivity constraints.")}</p>
                <p className="text-lg leading-relaxed">{t("aoeCTA.need.p2", "The challenge is to harness the power of AI within a completely trusted, self-contained environment, enabling true operational autonomy while maintaining absolute data sovereignty.")}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-6">
                 {visionPillarsData.map((pillar, index) => (
                    <VisionPillar key={index} t={t} {...pillar} />
                ))}
            </motion.div>
        </div>
      </SectionWrapper>

      {/* LoyalShift's Capability: Building Your AOE */}
      <SectionWrapper id="our-capability">
        <SectionTitle
          t={t}
          titleKey="aoeCTA.capability.mainTitle"
          defaultTitle="LoyalShift's Blueprint for Your Autonomous Engine"
        />
         <motion.p variants={fadeInUp} className={`${theme.textSecondary} text-lg text-center max-w-3xl mx-auto mb-12`}>
             {t("aoeCTA.capability.mainSubtitle", "We provide the core technologies and expertise to build, deploy, and refine an AOE tailored to your unique operational landscape. Our approach focuses on secure on-premise deployment and integration with your existing infrastructure.")}
        </motion.p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {loyalshiftCapabilitiesData.map((capability) => (
                <CapabilityCard key={capability.titleKey} t={t} {...capability} />
            ))}
        </div>
      </SectionWrapper>


      {/* How We Co-Create Section */}
      <SectionWrapper id="co-creation-process" bg={`${theme.surfaceMuted} border-t ${theme.border}`}>
        <SectionTitle
          t={t}
          titleKey="aoeCTA.process.title"
          defaultTitle="Our Collaborative Co-Creation Process"
        />
        <motion.p variants={fadeInUp} className={`${theme.textSecondary} text-lg text-center max-w-3xl mx-auto mb-12`}>
             {t("aoeCTA.process.subtitle", "Building an Autonomous Operations Engine is a strategic partnership. We work hand-in-hand with your team through a phased approach:")}
        </motion.p>
        <div className="max-w-4xl mx-auto space-y-8">
            {[
                { step: 1, titleKey: "aoeCTA.process.step1.title", descKey: "aoeCTA.process.step1.desc", defaultTitle: "Deep Dive & Strategic Alignment", defaultDesc: "Understanding your critical processes, existing systems, security protocols, and desired autonomous outcomes. Defining clear KPIs for success." },
                { step: 2, titleKey: "aoeCTA.process.step2.title", descKey: "aoeCTA.process.step2.desc", defaultTitle: "Secure AOE Blueprinting", defaultDesc: "Designing the architecture for your on-premise AOE, including data flow, AI model selection (or custom development), and integration points with legacy systems using Universal Adapter™." },
                { step: 3, titleKey: "aoeCTA.process.step3.title", descKey: "aoeCTA.process.step3.desc", defaultTitle: "Phased Deployment & Offline Learning", defaultDesc: "Iterative deployment of the AOE module, initial training on your historical data (offline), and integration with a subset of functions for validation." },
                { step: 4, titleKey: "aoeCTA.process.step4.title", descKey: "aoeCTA.process.step4.desc", defaultTitle: "Pilot Operations & Performance Tuning", defaultDesc: "The AOE begins managing select operations under supervision. Continuous monitoring, learning refinement, and performance tuning based on real-world results within your environment." },
                { step: 5, titleKey: "aoeCTA.process.step5.title", descKey: "aoeCTA.process.step5.desc", defaultTitle: "Scale to Full Autonomy & Ongoing Evolution", defaultDesc: "Gradual expansion of the AOE's scope to manage more processes autonomously. Establishing protocols for ongoing offline learning and future capability enhancements." },
            ].map((item) => (
                <motion.div key={item.step} variants={fadeInUp} className={`flex items-start ${theme.surface} p-6 rounded-lg border ${theme.borderLight} shadow-sm`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${theme.accentCyanBg}/20 ${theme.textHighlight} flex items-center justify-center font-bold text-lg mr-5`}>
                        {item.step}
                    </div>
                    <div>
                        <h4 className={`text-md font-semibold ${theme.textPrimary} mb-1`}>{t(item.titleKey, item.defaultTitle)}</h4>
                        <p className={`${theme.textSecondary} text-sm`}>{t(item.descKey, item.defaultDesc)}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </SectionWrapper>

      {/* Final Vision & Call to Action */}
      <SectionWrapper id="final-vision-cta" bg={`${theme.surfaceStrong} border-t ${theme.border}`}>
        <motion.div className="text-center" variants={fadeInUp}>
          <FiBriefcase className={`w-12 h-12 ${theme.textHighlight} mx-auto mb-6 opacity-80`} />
          <h2 className={`text-3xl md:text-4xl font-bold ${theme.textPrimary} mb-5`}>
            {t("aoeCTA.final.title", "Let's Build the Future of Your Secure, Autonomous Enterprise.")}
          </h2>
          <p className={`text-lg ${theme.textSecondary} max-w-3xl mx-auto mb-10`}>
            {t("aoeCTA.final.subtitle", "If the vision of an AI-powered, on-premise engine that securely automates and optimizes your critical operations resonates with your strategic goals, we invite you to start a confidential discussion with our advanced solutions team.")}
          </p>
          <Button
            to="/contact-sales?solution=AutonomousOperationsEngine&interest=StrategicPartnership"
            variant="primary"
            size="xl"
            icon={<FiArrowRight />}
            className="shadow-xl hover:shadow-cyan-500/40 transform hover:scale-105"
          >
            {t("aoeCTA.final.ctaButton", "Initiate Strategic Dialogue")}
          </Button>
           <p className={`text-xs ${theme.textMuted} mt-6`}>
             {t("aoeCTA.final.disclaimer", "All discussions are under strict NDA. We specialize in solutions for sensitive and regulated environments.")}
           </p>
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
