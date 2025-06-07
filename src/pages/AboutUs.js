// src/pages/AboutUs.js
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTarget,
  FiEye,
  FiHeart,
  FiZap,
  FiShare2,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiLinkedin,
  FiLoader,
  FiChevronDown,
  FiBriefcase, // Icon for SMB section
  FiLayout, // Icon for SMB Studio Lite features
  FiSettings, // Icon for full SMB Studio features
  FiCpu, // Icon for AgentHub / AI
} from "react-icons/fi";

// Ensure these paths are correct for your project structure
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import { useLocalization } from "../components/LocalizationContext";
import loyalShiftV2Theme from "../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
      staggerChildren: 0.1,
    },
  },
};
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
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

// --- Reusable Section Component ---
const Section = ({
  children,
  className = "",
  bg = theme.background,
  widePadding = false,
  id,
}) => (
  <motion.section
    id={id}
    className={`${
      widePadding ? "py-20 md:py-28" : "py-16 md:py-20"
    } ${bg} ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={viewportSettings}
    variants={staggerContainer}
  >
    <div className="container mx-auto px-4 max-w-5xl">{children}</div>
  </motion.section>
);
Section.propTypes = {
  /* ... */
};

// --- Reusable Pillar Card ---
const PillarCard = ({ icon: Icon, title, titleKey, t, children, items }) => (
  <motion.div
    variants={fadeInUp}
    className={`p-6 rounded-xl ${theme.surfaceCard} border ${theme.borderLight} ${theme.cardShadow} ${theme.cardHoverShadow} transition-all duration-300 ease-out`}
  >
    <div className="flex items-center mb-4">
      {Icon && (
        <Icon className={`w-7 h-7 ${theme.textHighlight} mr-3 flex-shrink-0`} />
      )}
      <h3 className={`text-xl font-semibold ${theme.textPrimary}`}>
        {titleKey ? t(titleKey, title) : title}
      </h3>
    </div>
    <div className={`${theme.textSecondary} text-base space-y-2`}>
      {children}
      {items && (
        <ul className="space-y-2 pt-2">
          {items.map((itemKey, i) => (
            <li key={i} className="flex items-start">
              <FiCheckCircle
                className={`w-5 h-5 ${theme.successText} mr-2 mt-0.5 flex-shrink-0`}
              />
              <span>{t(itemKey)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>
);
PillarCard.propTypes = {
  /* ... */
};

// --- Reusable Approach Feature Item ---
const ApproachFeature = ({
  icon: Icon,
  title,
  titleKey,
  children,
  contentKey,
  t,
}) => (
  <motion.div
    variants={fadeInUp}
    className={`flex items-start ${theme.surfaceCard} p-5 rounded-xl border ${
      theme.borderLight
    } hover:border-[${theme.inputFocusBorder.replace(
      "focus:border-",
      ""
    )}] transition-colors`}
  >
    <div
      className={`p-3 rounded-full ${theme.accentCyanBg}/10 border ${theme.borderAccent} mr-4 mt-1 flex-shrink-0`}
    >
      <Icon className={`w-6 h-6 ${theme.textHighlight}`} />
    </div>
    <div>
      <h4 className={`text-lg font-semibold ${theme.textPrimary} mb-1`}>
        {t(titleKey, title)}
      </h4>
      <p className={`${theme.textSecondary} text-base`}>
        {t(contentKey, children)}
      </p>
    </div>
  </motion.div>
);
ApproachFeature.propTypes = {
  /* ... */
};

// --- Team Member Card ---
const TeamMemberCard = ({ name, title, imageUrl, linkedinUrl }) => (
  <motion.div
    variants={fadeInUp}
    className={`text-center ${theme.surfaceCard} p-6 rounded-xl ${theme.cardShadow} border ${theme.borderLight} hover:${theme.cardHoverShadow} transition-shadow`}
    whileHover={{
      y: -5,
      borderColor: theme.inputFocusBorder.replace("focus:border-", ""),
    }}
    transition={{ duration: 0.3 }}
  >
    <div
      className={`w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 ${theme.borderAccent} shadow-md`}
    >
      <img
        src={imageUrl}
        alt={`Photo of ${name}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.parentNode.className += ` ${theme.infoBoxBg} flex items-center justify-center`;
          e.target.parentNode.innerHTML = `<span class="${
            theme.infoBoxText
          } font-bold text-xl">${name
            .split(" ")
            .map((n) => n[0])
            .join("")}</span>`;
        }}
      />
    </div>
    <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-1`}>
      {name}
    </h3>
    <p className={`${theme.textHighlight} text-sm font-medium mb-3`}>{title}</p>
    {linkedinUrl && (
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block ${theme.textMuted} hover:${theme.textHighlight} transition-colors`}
      >
        <FiLinkedin className="w-5 h-5" />
      </a>
    )}
  </motion.div>
);
TeamMemberCard.propTypes = {};

// --- Main AboutUs Component ---
export default function AboutUs() {
  const { t } = useLocalization();
  const [heroPhase, setHeroPhase] = useState("animating");
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const autoScrollTimeoutRef = useRef(null);
  const interactionDetectedRef = useRef(false);
  const videoRef = useRef(null);
  const handleVideoHover = () => {
    if (videoRef.current) {
      // Attempt to play. Browsers might block autoplay if not muted or if user hasn't interacted.
      // The `muted` attribute on the video tag itself should handle most cases for autoplay.
      // This hover handler provides an additional trigger.
      videoRef.current.play().catch((error) => {
        // Common errors: "NotAllowedError" if autoplay is blocked and requires user gesture.
        // "NotSupportedError" if the video format is an issue.
        console.log(
          "Video play on hover interrupted or failed:",
          error.name,
          error.message
        );
      });
    }
  };

  const aboutUsAnimationPhases = [
    t("aboutUs.heroPhase1", "Bridging Legacy & Future"),
    t("aboutUs.heroPhase2", "Intelligent Modernization"),
    t("aboutUs.heroPhase3", "Transformation Without Disruption"),
  ];

  const teamMembers = [
    {
      name: "David Solís",
      title: "Co-Founder & AI Lead Engineer",
      imageUrl: "https://placehold.co/150x150/e0f2fe/1e293b?text=GS",
      linkedinUrl: "#",
    },
    {
      name: "Bernardo Solano",
      title: "Co-Founder & CMO",
      imageUrl: "https://placehold.co/150x150/e0f2fe/1e293b?text=BS",
      linkedinUrl: "www.linkedin.com/in/bernardo-solano",
    },
    {
      name: "Brandon Hernández",
      title: "Head of Product",
      imageUrl: "https://placehold.co/150x150/e0f2fe/1e293b?text=BH",
      linkedinUrl: "#",
    },
    {
      name: "Jose Andrés Leiva",
      title: "Head of SMB Development",
      imageUrl: "https://placehold.co/150x150/e0f2fe/1e293b?text=JL",
      linkedinUrl:
        "https://www.linkedin.com/in/jose-andr%C3%A9s-leiva-robles-790389190",
    },
    {
      name: "Matías Catalán",
      title: "Head of Marketing Development",
      imageUrl: "https://placehold.co/150x150/e0f2fe/1e293b?text=MC",
      linkedinUrl: "#",
    },
    {
      name: "Miguel Mesén",
      title: "Head of Legacy Development",
      imageUrl: "https://placehold.co/150x150/e0f2fe/1e293b?text=MM",
      linkedinUrl: "#",
    },
  ];

  const coreValues = [
    "aboutUs.coreValue1",
    "aboutUs.coreValue2",
    "aboutUs.coreValue3",
    "aboutUs.coreValue4",
    "aboutUs.coreValue5",
    "aboutUs.coreValue6",
  ];

  const approachFeatures = [
    {
      icon: FiZap,
      titleKey: "aboutUs.approachFeature1Title",
      contentKey: "aboutUs.approachFeature1Content",
    },
    {
      icon: FiShare2,
      titleKey: "aboutUs.approachFeature2Title",
      contentKey: "aboutUs.approachFeature2Content",
    },
    {
      icon: FiShield,
      titleKey: "aboutUs.approachFeature3Title",
      contentKey: "aboutUs.approachFeature3Content",
    },
  ];

  useEffect(() => {
    /* ... (user's interaction detection logic) ... */
  }, []);
  useEffect(() => {
    if (heroPhase === "animating") {
      const phaseTimer = setInterval(() => {
        setCurrentPhaseIndex(
          (prev) => (prev + 1) % aboutUsAnimationPhases.length
        );
      }, 2000);
      const completionTimer = setTimeout(() => {
        clearInterval(phaseTimer);
        setHeroPhase("complete");
      }, 6000);
      return () => {
        clearInterval(phaseTimer);
        clearTimeout(completionTimer);
      };
    }
  }, [heroPhase, aboutUsAnimationPhases.length]);
  useEffect(() => {
    if (heroPhase === "complete" && !interactionDetectedRef.current) {
      autoScrollTimeoutRef.current = setTimeout(() => {
        document
          .getElementById("about-content-start")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 2000);
    }
    return () => clearTimeout(autoScrollTimeoutRef.current);
  }, [heroPhase]);

  const smbStudioLiteItems = [
    "aboutUsSMB.studioLiteFeature1",
    "aboutUsSMB.studioLiteFeature2",
    "aboutUsSMB.studioLiteFeature3",
    "aboutUsSMB.studioLiteFeature4",
  ];
  const smbFullStudioItems = [
    "aboutUsSMB.studioFeature1",
    "aboutUsSMB.studioFeature2",
    "aboutUsSMB.studioFeature3",
    "aboutUsSMB.studioFeature4",
    "aboutUsSMB.studioFeature5",
    "aboutUsSMB.studioFeature6",
  ];

  return (
    <div className={`${theme.background}`}>
      {" "}
      {/* Page background from V2 Light Theme */}
      {/* --- Hero Section --- */}
      <Section
        bg={`${theme.surface}`}
        className="flex items-center justify-center min-h-screen overflow-hidden !py-0"
        aria-labelledby="about-hero-title"
      >
        {" "}
        {/* theme.surface is white */}
        <div className="w-full text-center px-4">
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
                  className={`text-4xl md:text-5xl font-bold ${theme.textPrimary}`}
                >
                  {" "}
                  {/* V2 Theme: textPrimary is dark gray/blue */}
                  {aboutUsAnimationPhases[currentPhaseIndex]}
                </h1>
                <FiLoader
                  className={`w-6 h-6 ${theme.textHighlight} animate-spin mt-6`}
                />{" "}
                {/* V2 Theme: textHighlight is cyan-600 */}
              </motion.div>
            )}
            {heroPhase === "complete" && (
              <motion.div
                key="hero-content"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-center"
              >
                <motion.div
                  variants={scaleUp}
                  className={`inline-block p-4 ${theme.infoBoxBg} rounded-full mb-8 border ${theme.infoBoxBorder} shadow-sm`}
                >
                  {" "}
                  {/* V2 Theme: infoBox for a light accent bg */}
                  <FiCpu className={`w-16 h-16 ${theme.textHighlight}`} />
                </motion.div>
                <motion.h1
                  variants={fadeInUp}
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold ${theme.textPrimary} mb-4 leading-tight`}
                  id="about-hero-title"
                >
                  {t(
                    "aboutUs.heroTitleMain",
                    "Modernizing Enterprise Systems,"
                  )}{" "}
                  <span className={`${theme.textHighlight}`}>
                    {t("aboutUs.heroTitleAccent", "Respecting Your Legacy")}
                  </span>
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className={`text-lg md:text-xl ${theme.textSecondary} max-w-3xl mx-auto mb-10`}
                >
                  {t("aboutUs.heroSubtitle")}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {heroPhase === "complete" && (
              <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <FiChevronDown
                    className={`${theme.textHighlight} text-3xl opacity-70`}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>
      {/* --- Pillar 1: Our Purpose --- */}
      <div id="about-content-start">
        <Section
          aria-label={t("aboutUs.purposeSectionAriaLabel", "Our Purpose")}
        >
          <SectionTitle
            t={t}
            titleKey="aboutUs.purposeTitle"
            defaultTitle="Our Purpose"
            subtitleKey="aboutUs.purposeSubtitle"
            defaultSubtitle="Why We Exist"
            align="left"
            // Assuming SectionTitle is updated to use theme internally or accepts theme props
          />
          <motion.p
            variants={fadeInUp}
            className={`text-lg ${theme.textSecondary} mb-8`}
          >
            {t("aboutUs.purposeText")}
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* PillarCards will use theme.surfaceCard, theme.textPrimary, etc. */}
            <PillarCard
              icon={FiTarget}
              titleKey="aboutUs.missionTitle"
              t={t}
              defaultTitle="Mission"
            >
              <p>{t("aboutUs.missionText")}</p>
            </PillarCard>
            <PillarCard
              icon={FiEye}
              titleKey="aboutUs.visionTitle"
              t={t}
              defaultTitle="Vision"
            >
              <p>{t("aboutUs.visionText")}</p>
            </PillarCard>
            <PillarCard
              icon={FiHeart}
              titleKey="aboutUs.valuesTitle"
              t={t}
              defaultTitle="Core Values"
              items={coreValues.slice(0, 4)}
            />
          </div>
        </Section>
      </div>
      {/* --- Pillar 2: Our Approach --- */}
      <Section bg={`${theme.surfaceMuted}`} aria-labelledby="approach-title">
        {" "}
        {/* V2 theme.surfaceMuted */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <SectionTitle
              t={t}
              titleKey="aboutUs.approachTitle"
              defaultTitle="Our Approach"
              subtitleKey="aboutUs.approachSubtitle"
              defaultSubtitle="Intelligent Modernization"
              align="left"
            />
            <motion.p
              variants={fadeInUp}
              className={`text-lg ${theme.textSecondary} mb-8 leading-relaxed`}
            >
              {t("aboutUs.approachText")}
            </motion.p>

            <motion.div
              className={`relative rounded-xl overflow-hidden border ${theme.borderLight} shadow-xl mt-8 aspect-video ${theme.surfaceMuted} flex items-center justify-center`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.7 }}
              onMouseEnter={handleVideoHover}
            >
              <video
                ref={videoRef}
                src="/images/studio-dashboard.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/images/studio-dashboard-poster.jpg"
              >
                {t(
                  "aboutUs.videoNotSupported",
                  "Your browser does not support the video tag."
                )}
              </video>
              <div
                className={`absolute bottom-2 right-2 px-2 py-1 rounded text-xs ${theme.surfaceCard} ${theme.textMuted} bg-opacity-80 backdrop-blur-sm shadow`}
              >
                {" "}
                {/* surfaceCard for disclaimer box bg */}
                <span className="italic">
                  {t(
                    "aboutUs.veoDisclaimer",
                    "Visual representing AgentHub & modernization. (Conceptual animation)."
                  )}
                </span>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="space-y-6"
          >
            {approachFeatures.map((feature, index) => (
              <ApproachFeature key={index} t={t} {...feature} /> // ApproachFeature also uses theme internally
            ))}
          </motion.div>
        </div>
      </Section>
      {/* --- LoyalShift for SMBs Section --- */}
      <Section
        id="smb-solutions"
        bg={`${theme.background}`}
        aria-labelledby="smb-section-title"
      >
        <SectionTitle
          t={t}
          titleKey="aboutUsSMB.sectionTitle"
          defaultTitle="Empowering Small & Medium Businesses"
          subtitleKey="aboutUsSMB.sectionSubtitle"
          defaultSubtitle="Dedicated Solutions for Your Growth"
          align="center"
        />
        <motion.p
          variants={fadeInUp}
          className={`text-lg ${theme.textSecondary} text-center max-w-3xl mx-auto mb-6`}
        >
          {t("aboutUsSMB.introTextP1")}
        </motion.p>
        <motion.p
          variants={fadeInUp}
          className={`text-lg ${theme.textSecondary} text-center max-w-3xl mx-auto mb-12`}
        >
          {t("aboutUsSMB.introTextP2")}
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="grid md:grid-cols-1 gap-10 mb-12"
        >
          <PillarCard
            icon={FiBriefcase}
            titleKey="aboutUsSMB.studioTitle"
            t={t}
            defaultTitle="SMB Studio: Your Digital Command Center"
          >
            <p className="mb-4">{t("aboutUsSMB.studioText")}</p>
            <div className={`flex items-center text-sm ${theme.textSecondary}`}>
              <FiCpu className={`w-4 h-4 mr-2 ${theme.textHighlight}`} />
              <span>Powered by AgentHub Technology</span>
            </div>
          </PillarCard>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 mb-12 items-stretch"
        >
          <PillarCard
            icon={FiLayout}
            titleKey="aboutUsSMB.starterPlanTitle"
            t={t}
            items={smbStudioLiteItems}
            defaultTitle="Starter Plan Focus"
          >
            <p>{t("aboutUsSMB.starterPlanText")}</p>
          </PillarCard>
          <PillarCard
            icon={FiSettings}
            titleKey="aboutUsSMB.fullStudioTitle"
            t={t}
            items={smbFullStudioItems}
            defaultTitle="Full Studio Capabilities"
          >
            <p>{t("aboutUsSMB.fullStudioText")}</p>
          </PillarCard>
        </motion.div>
        <motion.div variants={fadeInUp} className="text-center mt-12">
          <Button
            to={t("aboutUsSMB.ctaLink", "/smb/solutions")}
            variant="primary" // This will now correctly apply the V2 theme's primary button style
            size="lg"
            icon={<FiArrowRight />}
          >
            {t("aboutUsSMB.ctaButton", "Explore SMB Solutions")}
          </Button>
        </motion.div>
      </Section>
      {/* --- Pillar 3: Our People --- */}
      <Section bg={`${theme.surfaceMuted}`} aria-labelledby="people-title">
        <SectionTitle
          t={t}
          titleKey="aboutUs.peopleTitle"
          defaultTitle="Our People"
          subtitleKey="aboutUs.peopleSubtitle"
          defaultSubtitle="Expertise & Collaboration"
          align="center"
        />
        <motion.p
          variants={fadeInUp}
          className={`text-lg ${theme.textSecondary} text-center max-w-3xl mx-auto mb-12`}
        >
          {t("aboutUs.peopleText")}
        </motion.p>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </motion.div>
        <motion.div variants={fadeInUp} className="text-center mt-16">
          {/* BUTTON CORRECTED TO USE V2 THEME SECONDARY STYLE */}
          <Button
            to="/careers"
            variant="secondary" // This should pick up theme.buttonSecondaryBg, etc.
            size="lg"
          >
            {t("aboutUs.joinTeamButton", "Join Our Team")}
          </Button>
        </motion.div>
      </Section>
      {/* --- Final CTA --- */}
      <Section className="py-16 !max-w-full !px-0">
        <motion.div
          className={`py-20 px-6 md:px-8 ${theme.accentCyanBg} rounded-none sm:rounded-xl ${theme.cardShadow} text-center`} // V2 Theme: accentCyanBg (bg-cyan-500)
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold ${theme.buttonTextLight} mb-5`}
            >
              {" "}
              {/* V2 Theme: buttonTextLight (text-white) */}
              {t("aboutUs.finalCtaTitleMain", "Ready to Modernize")}{" "}
              {/* V2 Theme accent text for on-darker-accent-bg would be lighter, e.g. text-cyan-100 or text-white if strong enough */}
              <span className={`text-cyan-100`}>
                {t("aboutUs.finalCtaTitleAccent", "Without Disruption?")}
              </span>
            </h2>
            <p className={`text-lg text-white/90 max-w-3xl mx-auto mb-10`}>
              {" "}
              {/* V2 Theme: Lighter text on accent bg */}
              {t("aboutUs.finalCtaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* BUTTON 1: "Talk to Sales" - Primary look on Accent BG (e.g., White button with Accent Text) */}
              <Button
                to="/contact"
                variant="secondary" // This will now correctly apply the V2 theme's primary button style
                size="lg"
                icon={<FiArrowRight />}
              >
                {t("aboutUs.talkToSalesButton", "Talk to Sales")}
              </Button>
              <Button
                to={t("aboutUsSMB.ctaLink", "/smb/solutions")}
                variant="primary" // This will now correctly apply the V2 theme's primary button style
                size="lg"
                icon={<FiArrowRight />}
              >
                {t("aboutUsSMB.ctaButton", "Explore SMB Solutions")}
              </Button>
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
