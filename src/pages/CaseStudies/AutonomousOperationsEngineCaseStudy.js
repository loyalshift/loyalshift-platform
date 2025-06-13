// src/pages/CaseStudies/AutonomousOperationsEngineCaseStudy.js
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiHardDrive, FiLock, FiCpu, FiShare2, FiSliders, 
  FiCheckCircle, FiTrendingUp, FiShield, FiMessageSquare,
  FiArrowRight, FiTool, FiDatabase, FiBriefcase,
  FiDollarSign, FiSave, FiClock, FiUser
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import Button from "../../components/Button";
import { useLocalization } from "../../components/LocalizationContext";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// Animation Variants
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

// ROI Calculator Component
const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    employees: 50,
    avgSalary: 65000,
    processesAutomated: 3,
    dataProcessed: 10000,
    currentCloudCost: 1500,
    gpuOwned: true
  });

  const results = useMemo(() => {
    const laborSavings = inputs.employees * 0.15 * inputs.avgSalary;
    const cloudSavings = inputs.gpuOwned ? inputs.currentCloudCost * 12 : 0;
    const efficiencyGains = inputs.processesAutomated * 12000;
    const dataProcessingValue = inputs.dataProcessed * 0.85;
    
    const totalAnnual = laborSavings + cloudSavings + efficiencyGains + dataProcessingValue;
    const implementationCost = 25000 + (inputs.gpuOwned ? 0 : 15000);
    
    return {
      laborSavings,
      cloudSavings,
      efficiencyGains,
      dataProcessingValue,
      totalAnnual,
      implementationCost,
      roiMonths: Math.round((implementationCost / (totalAnnual/12)) * 10) / 10,
      threeYearValue: totalAnnual * 3 - implementationCost
    };
  }, [inputs]);

  const handleChange = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : Number(e.target.value)
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportSettings}
      className={`${theme.surfaceCard} p-6 md:p-8 rounded-xl border ${theme.borderLight} ${theme.cardShadow}`}
    >
      <h3 className={`text-2xl font-semibold ${theme.textPrimary} mb-6 flex items-center justify-center gap-2`}>
        <FiDollarSign className={`${theme.textHighlight}`} /> 
        ROI Calculator
      </h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-1 flex items-center gap-2 ${theme.textSecondary}`}>
              <FiUser /> Number of Employees
            </label>
            <input
              type="range"
              name="employees"
              min="10"
              max="500"
              value={inputs.employees}
              onChange={handleChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>10</span>
              <span className="font-medium">{inputs.employees}</span>
              <span>500+</span>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 flex items-center gap-2 ${theme.textSecondary}`}>
              <FiSave /> Current Cloud Costs
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2">$</span>
              <input
                type="number"
                name="currentCloudCost"
                value={inputs.currentCloudCost}
                onChange={handleChange}
                className={`pl-8 w-full p-2 border rounded ${theme.inputBg} ${theme.borderLight}`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 flex items-center gap-2 ${theme.textSecondary}`}>
              <FiHardDrive /> Processes to Automate
            </label>
            <select
              name="processesAutomated"
              value={inputs.processesAutomated}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${theme.inputBg} ${theme.borderLight}`}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} process{num !== 1 ? 'es' : ''}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="gpuOwned"
              checked={inputs.gpuOwned}
              onChange={handleChange}
              className="mr-2"
            />
            <label className={`text-sm ${theme.textSecondary}`}>
              We own NVIDIA GPUs (RTX/Tesla)
            </label>
          </div>
        </div>

        <div className={`${theme.surface} p-6 rounded-lg border ${theme.borderLight}`}>
          <h4 className={`font-semibold mb-4 flex items-center gap-2 ${theme.textPrimary}`}>
            <FiClock /> Your Estimated ROI
          </h4>
          
          <div className="space-y-4">
            {[
              { label: "Labor Savings", value: results.laborSavings },
              { label: "Cloud Savings", value: results.cloudSavings },
              { label: "Efficiency Gains", value: results.efficiencyGains }
            ].map((item, i) => (
              <div key={i} className="flex justify-between border-b pb-2">
                <span>{item.label}:</span>
                <span className="font-medium">${item.value.toLocaleString()}/yr</span>
              </div>
            ))}
            
            <div className="pt-4">
              <div className={`${theme.accentCyanBg}/10 p-3 rounded-lg`}>
                <div className="flex justify-between font-semibold">
                  <span>Payback Period:</span>
                  <span>{results.roiMonths} months</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>3-Year Value:</span>
                  <span className="font-bold">${results.threeYearValue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-sm">
              <p>Implementation: ${results.implementationCost.toLocaleString()}</p>
              <p className="mt-1 text-xs">*Based on average deployment results</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button 
          to="/contact?interest=ROI_Estimate" 
          variant="primary"
          size="lg"
        >
          Get Customized Estimate
        </Button>
      </div>
    </motion.div>
  );
};

// Reusable Components
const SectionWrapper = ({ children, className = "", bg = theme.background, id }) => (
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

const CapabilityCard = ({ t, titleKey, descriptionKey, icon: Icon, defaultTitle, defaultDescription }) => (
  <motion.div
    variants={fadeInUp}
    className={`${theme.surface} p-6 rounded-xl ${theme.cardShadow} border ${theme.borderAccent} flex flex-col items-start backdrop-blur-sm h-full`}
    whileHover={{
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0,174,239,0.08)",
    }}
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

const VisionPillar = ({ t, titleKey, descriptionKey, icon: Icon, defaultTitle, defaultDescription }) => (
  <motion.div variants={fadeInUp} className="flex items-start">
    <Icon
      className={`w-7 h-7 ${theme.textHighlight} mr-4 mt-1 flex-shrink-0`}
    />
    <div>
      <h4 className={`text-lg font-semibold ${theme.textPrimary} mb-1`}>
        {t(titleKey, defaultTitle)}
      </h4>
      <p className={`${theme.textSecondary}`}>
        {t(descriptionKey, defaultDescription)}
      </p>
    </div>
  </motion.div>
);

// Main Component
export default function AutonomousOperationsEngineCaseStudy() {
  const { t } = useLocalization();
  const location = useLocation();
  const [activeExplanation, setActiveExplanation] = useState("business");

  const explanations = {
    business: {
      titleKey: "aoeCTA.explanationBusiness.title",
      p1Key: "aoeCTA.explanationBusiness.p1",
      p2Key: "aoeCTA.explanationBusiness.p2",
      benefits: [
        "aoeCTA.explanationBusiness.benefit1",
        "aoeCTA.explanationBusiness.benefit2",
        "aoeCTA.explanationBusiness.benefit3",
        "aoeCTA.explanationBusiness.benefit4",
      ],
    },
    technical: {
      titleKey: "aoeCTA.explanationTechnical.title",
      p1Key: "aoeCTA.explanationTechnical.p1",
      p2Key: "aoeCTA.explanationTechnical.p2",
      features: [
        "aoeCTA.explanationTechnical.feature1",
        "aoeCTA.explanationTechnical.feature2",
        "aoeCTA.explanationTechnical.feature3",
        "aoeCTA.explanationTechnical.feature4",
      ],
    },
    ai: {
      titleKey: "aoeCTA.explanationAI.title",
      p1Key: "aoeCTA.explanationAI.p1",
      p2Key: "aoeCTA.explanationAI.p2",
      modelDetails: [
        "aoeCTA.explanationAI.modelDetail1",
        "aoeCTA.explanationAI.modelDetail2",
        "aoeCTA.explanationAI.modelDetail3",
        "aoeCTA.explanationAI.modelDetail4",
      ],
    },
  };

  const currentExplanationContent = explanations[activeExplanation];

  const visionPillarsData = [
    {
      icon: FiCpu,
      titleKey: "aoeCTA.visionPillar1.title",
      defaultTitle: "Self-Learning & Optimization",
      descriptionKey: "aoeCTA.visionPillar1.desc",
      defaultDesc:
        "An engine that continuously learns from your internal data to refine processes and predict outcomes, all within your secure environment.",
    },
    {
      icon: FiShare2,
      titleKey: "aoeCTA.visionPillar2.title",
      defaultTitle: "Seamless Legacy Integration",
      descriptionKey: "aoeCTA.visionPillar2.desc",
      defaultDesc:
        "Connect and orchestrate your existing systems, PLCs, and custom functions through secure, high-performance internal adapters.",
    },
    {
      icon: FiLock,
      titleKey: "aoeCTA.visionPillar3.title",
      defaultTitle: "Air-Gapped Security & Control",
      descriptionKey: "aoeCTA.visionPillar3.desc",
      defaultDesc:
        "Operate with complete data sovereignty. No external cloud dependencies for core AI processing and decision-making.",
    },
    {
      icon: FiTrendingUp,
      titleKey: "aoeCTA.visionPillar4.title",
      defaultTitle: "Proactive & Predictive Operations",
      descriptionKey: "aoeCTA.visionPillar4.desc",
      defaultDesc:
        "Move beyond reactive fixes to predictive maintenance and proactive process adjustments, minimizing downtime and maximizing efficiency.",
    },
  ];

  const loyalshiftCapabilitiesData = [
    {
      icon: FiHardDrive,
      titleKey: "aoeCTA.capability1.title",
      defaultTitle: "CipherCore™ On-Premise AI",
      descriptionKey: "aoeCTA.capability1.desc",
      defaultDesc:
        "Our hardened, deployable AI module designed for secure, offline learning and execution tailored to your proprietary data.",
    },
    {
      icon: FiDatabase,
      titleKey: "aoeCTA.capability2.title",
      defaultTitle: "Universal Adapter™ (Internal Mode)",
      descriptionKey: "aoeCTA.capability2.desc",
      defaultDesc:
        "Specialized configurations for robust and secure integration with diverse internal systems, databases, and industrial controls.",
    },
    {
      icon: FiSliders,
      titleKey: "aoeCTA.capability3.title",
      defaultTitle: "Adaptive Orchestration Engine",
      descriptionKey: "aoeCTA.capability3.desc",
      defaultDesc:
        "The intelligence layer that learns your operational workflows and orchestrates existing functions for autonomous execution.",
    },
    {
      icon: FiShield,
      titleKey: "aoeCTA.capability4.title",
      defaultTitle: "Enterprise-Grade Security Framework",
      descriptionKey: "aoeCTA.capability4.desc",
      defaultDesc:
        "Built with security at its core, ready for deployment in highly regulated and sensitive operational environments.",
    },
  ];

  return (
    <div className={`${theme.background} ${theme.textSecondary} overflow-x-hidden`}>
      {/* Hero Section */}
      <SectionWrapper bg={theme.background} className="pt-24 md:pt-32 pb-16 md:pb-20">
        <motion.div className="text-center" variants={staggerContainer}>
          <motion.div
            variants={scaleUp}
            className={`inline-block mb-6 p-4 rounded-full ${theme.surfaceStrong} border ${theme.borderAccent} shadow-lg`}
          >
            <FiCpu className={`w-10 h-10 md:w-12 md:h-12 ${theme.textHighlight}`} />
          </motion.div>
          <p className={`text-sm md:text-base font-semibold ${theme.textHighlight} uppercase tracking-wider mb-3`}>
            {t("aoeCTA.hero.eyebrow", "Strategic Initiative")}
          </p>
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${theme.textPrimary} mb-6 leading-tight`}>
            {t(
              "aoeCTA.hero.title",
              "Imagine Your Enterprise: Fully Autonomous, Entirely Secure."
            )}
          </h1>
          <p className={`text-lg md:text-xl ${theme.textSecondary} max-w-3xl mx-auto mb-10`}>
            {t(
              "aoeCTA.hero.subtitle",
              "Partner with LoyalShift to co-create a bespoke Autonomous Operations Engine (AOE) – an on-premise, AI-powered core that learns from your data, orchestrates your existing systems, and operates securely offline."
            )}
          </p>
          <Button
            to="/contact?solution=AutonomousOperationsEngine"
            variant="primary"
            size="xl"
            icon={<FiMessageSquare />}
            className="shadow-xl hover:shadow-cyan-500/40 transform hover:scale-105"
          >
            {t("aoeCTA.hero.ctaButton", "Discuss Your Autonomous Vision")}
          </Button>
        </motion.div>
      </SectionWrapper>

      {/* ROI Calculator Section */}
      <SectionWrapper id="roi-calculator">
        <SectionTitle
          title={t("aoeCTA.roiCalculator.title", "Calculate Your Potential Savings")}
          subtitle={t("aoeCTA.roiCalculator.subtitle", "See how much you could save with a custom AI solution")}
        />
        <ROICalculator />
      </SectionWrapper>

      {/* Explanation Selector Section */}
      <SectionWrapper id="tailored-explanations" bg={`${theme.surfaceMuted}`}>
        <SectionTitle
          t={t}
          titleKey="aoeCTA.explanationSelector.title"
          defaultTitle="Understand the AOE: Tailored Explanations"
        />
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8"
          variants={fadeInUp}
        >
          <Button
            onClick={() => setActiveExplanation("business")}
            variant={activeExplanation === "business" ? "primary" : "secondary"}
            size="lg"
            className={`${activeExplanation === "business" ? theme.cardShadow : ""}`}
          >
            {t(
              "aoeCTA.explanationSelector.businessOwnerButton",
              "For Business Owners"
            )}
          </Button>
          <Button
            onClick={() => setActiveExplanation("technical")}
            variant={activeExplanation === "technical" ? "primary" : "secondary"}
            size="lg"
            className={`${activeExplanation === "technical" ? theme.cardShadow : ""}`}
          >
            {t(
              "aoeCTA.explanationSelector.technicalLeadButton",
              "For Technical Leads"
            )}
          </Button>
          <Button
            onClick={() => setActiveExplanation("ai")}
            variant={activeExplanation === "ai" ? "primary" : "secondary"}
            size="lg"
            className={`${activeExplanation === "ai" ? theme.cardShadow : ""}`}
          >
            {t(
              "aoeCTA.explanationSelector.aiSpecialistButton",
              "For AI Specialists"
            )}
          </Button>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExplanation}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`${theme.surfaceCard} p-6 md:p-8 rounded-xl border ${theme.borderLight} ${theme.cardShadow} mt-8`}
          >
            <h3 className={`text-2xl font-semibold ${theme.textPrimary} mb-4`}>
              {t(currentExplanationContent.titleKey)}
            </h3>
            <div className={`space-y-3 ${theme.textSecondary} leading-relaxed`}>
              <p>{t(currentExplanationContent.p1Key)}</p>
              {currentExplanationContent.p2Key && <p>{t(currentExplanationContent.p2Key)}</p>}
              {currentExplanationContent.benefits && (
                <ul className="list-none pl-0 space-y-2 pt-2">
                  {currentExplanationContent.benefits.map((benefitKey) => (
                    <li key={benefitKey} className="flex items-start">
                      <FiCheckCircle
                        className={`w-5 h-5 ${theme.successText} mr-2.5 mt-1 flex-shrink-0`}
                      />
                      <span>{t(benefitKey)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {currentExplanationContent.features && (
                <ul className="list-none pl-0 space-y-2 pt-2">
                  {currentExplanationContent.features.map((featureKey) => (
                    <li key={featureKey} className="flex items-start">
                      <FiTool
                        className={`w-5 h-5 ${theme.textHighlight} mr-2.5 mt-1 flex-shrink-0`}
                      />
                      <span>{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {currentExplanationContent.modelDetails && (
                <ul className="list-none pl-0 space-y-2 pt-2">
                  {currentExplanationContent.modelDetails.map((detailKey) => (
                    <li key={detailKey} className="flex items-start">
                      <FiCpu
                        className={`w-5 h-5 ${theme.textHighlight} mr-2.5 mt-1 flex-shrink-0`}
                      />
                      <span>{t(detailKey)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </SectionWrapper>

      {/* The Unmet Need Section */}
      <SectionWrapper
        id="the-need"
        bg={`${theme.surfaceStrong} border-y ${theme.border}`}
      >
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div variants={fadeInUp}>
            <SectionTitle
              t={t}
              titleKey="aoeCTA.need.title"
              defaultTitle="The Enterprise Imperative: Intelligence Without Exposure"
              align="text-left"
            />
            <p className="text-lg leading-relaxed mb-4">
              {t(
                "aoeCTA.need.p1",
                "Many critical industries - manufacturing, energy, defense, finance - require advanced automation and AI-driven insights. However, the sensitive nature of their data and operations often precludes the use of cloud-based AI solutions due to security, compliance, or connectivity constraints."
              )}
            </p>
            <p className="text-lg leading-relaxed">
              {t(
                "aoeCTA.need.p2",
                "The challenge is to harness the power of AI within a completely trusted, self-contained environment, enabling true operational autonomy while maintaining absolute data sovereignty."
              )}
            </p>
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
        <motion.p
          variants={fadeInUp}
          className={`${theme.textSecondary} text-lg text-center max-w-3xl mx-auto mb-12`}
        >
          {t(
            "aoeCTA.capability.mainSubtitle",
            "We provide the core technologies and expertise to build, deploy, and refine an AOE tailored to your unique operational landscape. Our approach focuses on secure on-premise deployment and integration with your existing infrastructure."
          )}
        </motion.p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {loyalshiftCapabilitiesData.map((capability) => (
            <CapabilityCard key={capability.titleKey} t={t} {...capability} />
          ))}
        </div>
      </SectionWrapper>

      {/* How We Co-Create Section */}
      <SectionWrapper
        id="co-creation-process"
        bg={`${theme.surfaceMuted} border-t ${theme.border}`}
      >
        <SectionTitle
          t={t}
          titleKey="aoeCTA.process.title"
          defaultTitle="Our Collaborative Co-Creation Process"
        />
        <motion.p
          variants={fadeInUp}
          className={`${theme.textSecondary} text-lg text-center max-w-3xl mx-auto mb-12`}
        >
          {t(
            "aoeCTA.process.subtitle",
            "Building an Autonomous Operations Engine is a strategic partnership. We work hand-in-hand with your team through a phased approach:"
          )}
        </motion.p>
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            {
              step: 1,
              titleKey: "aoeCTA.process.step1.title",
              descKey: "aoeCTA.process.step1.desc",
              defaultTitle: "Deep Dive & Strategic Alignment",
              defaultDesc:
                "Understanding your critical processes, existing systems, security protocols, and desired autonomous outcomes. Defining clear KPIs for success.",
            },
            {
              step: 2,
              titleKey: "aoeCTA.process.step2.title",
              descKey: "aoeCTA.process.step2.desc",
              defaultTitle: "Secure AOE Blueprinting",
              defaultDesc:
                "Designing the architecture for your on-premise AOE, including data flow, AI model selection (or custom development), and integration points with legacy systems using Universal Adapter™.",
            },
            {
              step: 3,
              titleKey: "aoeCTA.process.step3.title",
              descKey: "aoeCTA.process.step3.desc",
              defaultTitle: "Phased Deployment & Offline Learning",
              defaultDesc:
                "Iterative deployment of the AOE module, initial training on your historical data (offline), and integration with a subset of functions for validation.",
            },
            {
              step: 4,
              titleKey: "aoeCTA.process.step4.title",
              descKey: "aoeCTA.process.step4.desc",
              defaultTitle: "Pilot Operations & Performance Tuning",
              defaultDesc:
                "The AOE begins managing select operations under supervision. Continuous monitoring, learning refinement, and performance tuning based on real-world results within your environment.",
            },
            {
              step: 5,
              titleKey: "aoeCTA.process.step5.title",
              descKey: "aoeCTA.process.step5.desc",
              defaultTitle: "Scale to Full Autonomy & Ongoing Evolution",
              defaultDesc:
                "Gradual expansion of the AOE's scope to manage more processes autonomously. Establishing protocols for ongoing offline learning and future capability enhancements.",
            },
          ].map((item) => (
            <motion.div
              key={item.step}
              variants={fadeInUp}
              className={`flex items-start ${theme.surface} p-6 rounded-lg border ${theme.borderLight} shadow-sm`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full ${theme.accentCyanBg}/20 ${theme.textHighlight} flex items-center justify-center font-bold text-lg mr-5`}
              >
                {item.step}
              </div>
              <div>
                <h4
                  className={`text-md font-semibold ${theme.textPrimary} mb-1`}
                >
                  {t(item.titleKey, item.defaultTitle)}
                </h4>
                <p className={`${theme.textSecondary} text-sm`}>
                  {t(item.descKey, item.defaultDesc)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final Vision & Call to Action */}
      <SectionWrapper
        id="final-vision-cta"
        bg={`${theme.surfaceStrong} border-t ${theme.border}`}
      >
        <motion.div className="text-center" variants={fadeInUp}>
          <FiBriefcase
            className={`w-12 h-12 ${theme.textHighlight} mx-auto mb-6 opacity-80`}
          />
          <h2
            className={`text-3xl md:text-4xl font-bold ${theme.textPrimary} mb-5`}
          >
            {t(
              "aoeCTA.final.title",
              "Let's Build the Future of Your Secure, Autonomous Enterprise."
            )}
          </h2>
          <p
            className={`text-lg ${theme.textSecondary} max-w-3xl mx-auto mb-10`}
          >
            {t(
              "aoeCTA.final.subtitle",
              "If the vision of an AI-powered, on-premise engine that securely automates and optimizes your critical operations resonates with your strategic goals, we invite you to start a confidential discussion with our advanced solutions team."
            )}
          </p>
          <Button
            to="/contact?solution=AutonomousOperationsEngine&interest=StrategicPartnership"
            variant="primary"
            size="xl"
            icon={<FiArrowRight />}
            className="shadow-xl hover:shadow-cyan-500/40 transform hover:scale-105"
          >
            {t("aoeCTA.final.ctaButton", "Initiate Strategic Dialogue")}
          </Button>
          <p className={`text-xs ${theme.textMuted} mt-6`}>
            {t(
              "aoeCTA.final.disclaimer",
              "All discussions are under strict NDA. We specialize in solutions for sensitive and regulated environments."
            )}
          </p>
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
