// src/pages/Equilibra/ProposalEquilibraDetailsPage.js
// Detailed proposal page for the "Equilibra Contigo" platform.
// Features sections on challenges, solutions, modules, benefits, pilot program,
// video content showcase, and a special offer.
// Uses Equilibra CR's calming and empathetic theme with the new color palette.
// Current time: Friday, May 16, 2025 at 3:15 PM CST.

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiZap,
  FiUsers,
  FiTarget,
  FiTool,
  FiActivity,
  FiMessageSquare,
  FiCalendar,
  FiBookOpen,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiInfo,
  FiAward,
  FiPlayCircle,
  FiVideo,
  FiGift,
  FiHeart, // Added FiHeart
} from "react-icons/fi";

// Reusable Components
import Button from "../../components/Button";
import Section from "../../components/Section";
const equilibraLogoPath = process.env.PUBLIC_URL + "/images/equilibra-logo.svg";
// Placeholder for video thumbnail - replace with an actual image path from Equilibra's content
// This should be an image from Equilibra's Instagram, like the one about "PICA".
const videoThumbnailPlaceholder =
  process.env.PUBLIC_URL + "/images/image_84bcea.jpg"; // Using one of the uploaded image names as placeholder

// --- Equilibra CR New Color Palette ---
const colors = {
  background: "bg-[#FFF7F2]", // Neutral Light – Cream White
  surface: "bg-white", // White for cards
  surfaceStrong: "bg-[#FDB386]/20", // Primary Color (Soft Peach) with low opacity for section backgrounds
  textPrimary: "text-[#5C5C5C]", // Typography – Warm Gray
  textSecondary: "text-[#A89C94]", // Complementary – Muted Taupe
  textHighlight: "text-[#E86F51]", // Accent Color – Coral Red
  border: "border-[#A89C94]/40", // Muted Taupe for borders
  borderLight: "border-[#F7C6B7]/60", // Secondary Color (Blush Pink) for lighter borders
  borderAccent: "border-[#E86F51]/60", // Accent Color (Coral Red) for accent borders
  primaryButtonBg: "bg-[#E86F51]", // Accent Color – Coral Red
  primaryButtonHover: "hover:bg-[#d95f41]", // Darker Coral Red
  secondaryButtonBg: "bg-[#F7C6B7]", // Secondary Color – Blush Pink
  secondaryButtonHover: "hover:bg-[#f5b8a9]", // Darker Blush Pink
  secondaryButtonText: "text-[#5C5C5C]", // Warm Gray for text on blush pink
  buttonTextLight: "text-white",
  iconColor: "text-[#E86F51]", // Accent Color – Coral Red
  success: "text-emerald-600", // Keeping a distinct success green for checkmarks
  offerCardBg: "bg-gradient-to-br from-[#E86F51] to-[#F7C6B7]", // Coral to Blush gradient
  offerCardText: "text-white",
  videoCardBg: "bg-[#FFF7F2] border border-[#FDB386]/50", // Cream white with soft peach border
};

// --- Animation Variants ---
const viewportOnce = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.2) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

// --- Helper Component for Detail/Benefit Items ---
const DetailListItem = ({
  icon: Icon,
  title,
  description,
  iconColorClass = colors.iconColor,
}) => (
  <motion.div
    variants={fadeInUp}
    className={`flex items-start gap-4 p-4 rounded-lg ${colors.surface} border ${colors.borderLight} hover:shadow-md transition-shadow`}
  >
    <div
      className={`flex-shrink-0 p-2.5 rounded-md bg-[#E86F51]/10 border border-[#E86F51]/20`}
    >
      {" "}
      {/* Coral accent bg */}
      <Icon className={`w-5 h-5 ${iconColorClass}`} />
    </div>
    <div>
      <h4 className={`text-md font-semibold ${colors.textPrimary} mb-0.5`}>
        {title}
      </h4>
      <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
        {description}
      </p>
    </div>
  </motion.div>
);
DetailListItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColorClass: PropTypes.string,
};

// --- Video Showcase Card Component ---
const VideoShowcaseCard = ({
  thumbnailUrl,
  videoTitle,
  videoSourceInfo,
  onPlay,
}) => {
  const [showVideoMessage, setShowVideoMessage] = useState(false);

  const handlePlay = () => {
    setShowVideoMessage(true);
    if (onPlay) onPlay();
    setTimeout(() => setShowVideoMessage(false), 4000);
  };

  return (
    <motion.div
      variants={fadeInUp}
      className={`p-6 rounded-xl shadow-lg ${colors.videoCardBg} relative overflow-hidden`}
    >
      <h4
        className={`text-lg font-semibold ${colors.textPrimary} mb-3 flex items-center`}
      >
        <FiVideo className={`w-5 h-5 mr-2 ${colors.textHighlight}`} />
        Potenciando tu Contenido Educativo
      </h4>
      <div
        className="aspect-video rounded-lg overflow-hidden relative group cursor-pointer mb-3 shadow-md"
        onClick={handlePlay}
      >
        {/* <img
          src={thumbnailUrl}
          // alt={`Thumbnail for ${videoTitle}`}
          alt={``}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        /> */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FiPlayCircle className="w-16 h-16 text-white/90" />
        </div>
      </div>
      <p className={`text-sm font-medium ${colors.textPrimary} mb-1`}>
        {videoTitle}
      </p>
      <p className={`text-xs ${colors.textSecondary}`}>
        Fuente: {videoSourceInfo}
      </p>

      {showVideoMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`mt-3 p-3 rounded-md ${colors.surface} border ${colors.borderAccent} text-sm ${colors.textSecondary}`}
        >
          Imagina este y otro contenido valioso, accesible directamente desde
          "Equilibra Contigo" para tus clientes, reforzando tu mensaje y apoyo.
        </motion.div>
      )}
    </motion.div>
  );
};
VideoShowcaseCard.propTypes = {
  thumbnailUrl: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
  videoSourceInfo: PropTypes.string.isRequired,
  onPlay: PropTypes.func,
};

// --- Special Offer/Activation Card ---
const ActivationOfferCard = ({
  title,
  offerText,
  ctaText,
  ctaLink,
  ctaIcon: CtaIcon,
}) => (
  <motion.div
    variants={fadeInUp}
    className={`p-8 rounded-xl shadow-2xl ${colors.offerCardBg} text-center relative overflow-hidden`}
  >
    <FiGift
      className={`w-12 h-12 ${colors.offerCardText} opacity-80 mx-auto mb-4`}
    />
    <h3 className={`text-2xl font-bold ${colors.offerCardText} mb-3`}>
      {title}
    </h3>
    <p
      className={`text-md ${colors.offerCardText} opacity-90 mb-6 max-w-md mx-auto`}
    >
      {offerText}
    </p>
    {/* <Button
      to={ctaLink}
      variant="custom"
      size="lg"
      icon={CtaIcon && <CtaIcon className="w-5 h-5" />}
      className={`bg-white/95 text-[#E86F51] hover:bg-white shadow-lg hover:shadow-xl font-semibold`}
    >
      {ctaText}
    </Button> */}
  </motion.div>
);
ActivationOfferCard.propTypes = {
  title: PropTypes.string.isRequired,
  offerText: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  ctaIcon: PropTypes.elementType,
};

// --- Main Equilibra CR Proposal Details Page Component ---
export default function ProposalEquilibraDetailsPage() {
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "long",
    timeStyle: "short",
  });

  const t = {
    pageTitle: "Propuesta Estratégica: Equilibra Contigo",
    heroHeadline:
      "Equilibra Contigo: <span class='text-[#E86F51]'>Tu Comunidad, Potenciada</span>",
    heroSubtitle:
      "Una plataforma digital diseñada para amplificar tu impacto, apoyar a tus clientes y optimizar tu práctica de nutrición no pesocentrista.",
    challengeTitle: "Comprendiendo Equilibra CR: Oportunidades Clave",
    challengeP1:
      "Equilibra CR se distingue por su enfoque compasivo y especializado en la sanación de la relación con la comida y el cuerpo. Para potenciar esta misión, una plataforma digital puede ofrecer nuevas dimensiones de apoyo y eficiencia.",
    challengeNeeds: [
      "Extender el acompañamiento personalizado más allá de las sesiones.",
      "Facilitar el acceso a recursos educativos y herramientas de auto-reflexión.",
      "Optimizar la comunicación segura y la gestión administrativa.",
      "Fortalecer el sentido de comunidad y apoyo continuo para los clientes.",
    ],
    solutionTitle: "Presentando 'Equilibra Contigo': Tu Aliado Digital",
    solutionP1:
      "Proponemos 'Equilibra Contigo', una plataforma intuitiva y segura, co-creada con LoyalShift para reflejar la esencia de tu práctica. Integrará herramientas diseñadas para el bienestar integral, respetando siempre tu filosofía no pesocentrista.",
    modulesTitle: "Módulos Clave para el Bienestar Holístico",
    moduleMemberPortal: {
      title: "Mi Viaje Personal",
      desc: "Espacio privado para clientes con diario de emociones y alimentación intuitiva, registro de movimiento consciente, y acceso a recursos.",
      icon: FiHeart,
    },
    moduleResources: {
      title: "Recursos de Apoyo",
      desc: "Biblioteca curada con artículos, guías, meditaciones y ejercicios prácticos sobre alimentación consciente, TCA, y auto-compasión.",
      icon: FiBookOpen,
    },
    moduleCommunication: {
      title: "Comunicación Segura",
      desc: "Mensajería directa y confidencial con la nutricionista para consultas rápidas y seguimiento entre citas.",
      icon: FiMessageSquare,
    },
    moduleNutritionistTools: {
      title: "Herramientas para la Nutricionista",
      desc: "Panel para gestionar clientes, compartir planes de acompañamiento (no dietas), notas de sesión y agendar citas.",
      icon: FiTool,
    },
    benefitsTitle: "Beneficios Clave para tu Práctica y tus Clientes",
    benefitClientSupport: {
      title: "Soporte Continuo al Cliente",
      desc: "Los clientes se sienten acompañados en su proceso, con herramientas y recursos disponibles 24/7.",
      icon: FiUsers,
    },
    benefitEfficiency: {
      title: "Mayor Eficiencia para Ti",
      desc: "Optimiza la gestión de citas, el intercambio de información y el seguimiento, liberando tiempo valioso.",
      icon: FiZap,
    },
    benefitReach: {
      title: "Alcance y Visibilidad Ampliados",
      desc: "Potencial para ofrecer talleres online, grupos de apoyo y llegar a más personas que necesitan tu enfoque.",
      icon: FiTrendingUp,
    },
    benefitProfessionalism: {
      title: "Imagen Profesional Reforzada",
      desc: "Una plataforma digital moderna y alineada con tus valores eleva la percepción de tu servicio especializado.",
      icon: FiAward,
    },
    videoSectionTitle: "Integra y Potencia tu Contenido Educativo",
    videoCardTitle: "¿Qué es la PICA? (Ejemplo de tu contenido en video)",
    videoCardSource: "Instagram @equilibra_cr",
    offerTitle: "Oferta Especial de Lanzamiento: Piloto 'Equilibra Contigo'",
    offerText:
      "Como socio fundador en esta visión, te ofrecemos un paquete de lanzamiento preferencial para el programa piloto de 'Equilibra Contigo', incluyendo configuración personalizada, capacitación y soporte dedicado para asegurar un inicio exitoso.",
    offerCtaText: "Conocer Detalles del Paquete Piloto",
    pilotTitle: "Colaboración Estratégica y Próximos Pasos",
    pilotP1:
      "Proponemos un programa piloto de 2-3 meses para implementar y refinar 'Equilibra Contigo' con un grupo selecto de tus clientes. Tu feedback será crucial para asegurar que la plataforma se alinee perfectamente con tus necesidades y las de quienes acompañas.",
    pilotP2:
      "Posteriormente, exploraremos un lanzamiento completo y estrategias de crecimiento continuo, siempre en colaboración.",
    ctaTitle: "Construyamos Juntos el Futuro Digital de Equilibra CR",
    ctaSubtitle:
      "Esta plataforma es una herramienta para amplificar tu impacto y llevar tu valioso trabajo a más personas. Conversemos sobre cómo 'Equilibra Contigo' puede ser una realidad para tu práctica.",
    ctaButtonPrimary: "Explorar 'Equilibra Contigo' (Visión de Plataforma)",
    ctaButtonSecondary: "Agendar Discusión Estratégica",
  };
  const platformFeaturesMVP = [
    {
      icon: t.moduleMemberPortal.icon,
      title: t.moduleMemberPortal.title,
      description: t.moduleMemberPortal.desc,
    },
    {
      icon: t.moduleResources.icon,
      title: t.moduleResources.title,
      description: t.moduleResources.desc,
    },
    {
      icon: t.moduleCommunication.icon,
      title: t.moduleCommunication.title,
      description: t.moduleCommunication.desc,
    },
    {
      icon: t.moduleNutritionistTools.icon,
      title: t.moduleNutritionistTools.title,
      description: t.moduleNutritionistTools.desc,
    },
  ];
  const anticipatedBenefits = [
    {
      icon: t.benefitClientSupport.icon,
      title: t.benefitClientSupport.title,
      description: t.benefitClientSupport.desc,
    },
    {
      icon: t.benefitEfficiency.icon,
      title: t.benefitEfficiency.title,
      description: t.benefitEfficiency.desc,
    },
    {
      icon: t.benefitReach.icon,
      title: t.benefitReach.title,
      description: t.benefitReach.desc,
    },
    {
      icon: t.benefitProfessionalism.icon,
      title: t.benefitProfessionalism.title,
      description: t.benefitProfessionalism.desc,
    },
  ];

  return (
    <div className={`${colors.background} ${colors.textPrimary} min-h-screen`}>
      <main>
        {/* Hero Section */}
        <Section
          bg={colors.surface}
          className="pt-24 md:pt-32 pb-12 md:pb-16 text-center border-b ${colors.borderLight}"
          ariaLabelledby="equilibra-proposal-hero"
        >
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer()}
          >
            <motion.div variants={scaleUp} className="mb-6">
              <img
                src={equilibraLogoPath}
                alt="Equilibra CR Logo"
                className="h-16 md:h-20 w-auto mx-auto"
              />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              id="equilibra-proposal-hero"
              className={`text-3xl sm:text-4xl font-bold ${colors.textPrimary} mb-4 leading-tight`}
              dangerouslySetInnerHTML={{
                __html: t.heroHeadline.replace(
                  "text-emerald-700",
                  colors.textHighlight.slice(5, -2)
                ),
              }}
            />
            <motion.p
              variants={fadeInUp}
              className={`text-md md:text-lg ${colors.textSecondary} max-w-2xl mx-auto`}
            >
              {t.heroSubtitle}
            </motion.p>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button
              to="/equilibra" // Link to the platform showcase
              variant="custom"
              size="lg"
              icon={<FiArrowRight />}
              className={`${colors.buttonPrimaryBg} ${colors.textHighlight} ${colors.buttonPrimaryHover} shadow-lg`}
            >
              {t.ctaButtonPrimary}
            </Button>
            <Button
              to={`/contact-sales?client=equilibra&topic=strategic_discussion`}
              variant="custom"
              size="lg"
              className={`bg-transparent border-2 ${colors.borderAccent} ${colors.textHighlight} hover:bg-[#E86F51]/10 hover:border-[#E86F51]`}
            >
              {t.ctaButtonSecondary}
            </Button>
          </div>
        </Section>

        {/* Challenge Section */}
        <Section
          bg={colors.background}
          className={`py-12 md:py-16`}
          ariaLabelledby="challenge-title-equilibra"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
            <motion.div variants={fadeInUp}>
              <h2
                id="challenge-title-equilibra"
                className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} mb-6 flex items-center gap-3`}
              >
                <FiTarget className={colors.iconColor} /> {t.challengeTitle}
              </h2>
              <p
                className={`${colors.textSecondary} text-base md:text-lg leading-relaxed mb-6`}
              >
                {t.challengeP1}
              </p>
              <ul className="space-y-2.5">
                {t.challengeNeeds.map((need, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <FiCheckCircle
                      className={`w-5 h-5 ${colors.iconColor} mt-1 flex-shrink-0`}
                    />
                    <span
                      className={`${colors.textSecondary} text-sm md:text-base`}
                    >
                      {need}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`aspect-square ${colors.surface} rounded-xl border ${colors.border} flex items-center justify-center shadow-lg p-4`}
            >
              <FiHeart className={`w-24 h-24 ${colors.iconColor} opacity-10`} />
            </motion.div>
          </div>
        </Section>

        {/* Solution & Modules Section */}
        <Section
          bg={colors.surface}
          className={`py-12 md:py-16 border-y ${colors.borderLight}`}
          ariaLabelledby="solution-title-equilibra"
        >
          <motion.h2
            variants={fadeInUp}
            id="solution-title-equilibra"
            className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} text-center mb-4`}
          >
            {t.solutionTitle}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className={`text-base md:text-lg ${colors.textSecondary} text-center max-w-3xl mx-auto mb-10 md:mb-12`}
          >
            {t.solutionP1}
          </motion.p>
          <motion.h3
            variants={fadeInUp}
            className={`text-xl md:text-2xl font-semibold ${colors.textPrimary} text-center mb-8`}
          >
            {t.modulesTitle}
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {platformFeaturesMVP.map((feature, index) => (
              <DetailListItem
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </Section>

        {/* Video Content Showcase Section */}
        <Section
          bg={colors.background}
          className={`py-12 md:py-16`}
          ariaLabelledby="video-content-title"
        >
          <motion.h2
            variants={fadeInUp}
            id="video-content-title"
            className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} text-center mb-10 md:mb-12`}
          >
            {t.videoSectionTitle}
          </motion.h2>
          <div className="max-w-xl mx-auto">
            <VideoShowcaseCard
              thumbnailUrl={videoThumbnailPlaceholder}
              videoTitle={t.videoCardTitle}
              videoSourceInfo={t.videoCardSource}
            />
          </div>
        </Section>

        {/* Special Offer/Activation Section */}
        <Section
          bg={`bg-[#FDB386]/10`}
          className={`py-16 md:py-20 border-y ${colors.borderLight}`}
          ariaLabelledby="offer-title-equilibra"
        >
          <div className="max-w-xl mx-auto">
            <ActivationOfferCard
              title={t.offerTitle}
              offerText={t.offerText}
              ctaText={t.offerCtaText}
              ctaLink={`/contact-sales?client=equilibra&topic=pilot_program_offer`}
              ctaIcon={FiArrowRight}
            />
          </div>
        </Section>

        {/* Anticipated Benefits Section */}
        <Section
          bg={colors.surface}
          className={`py-12 md:py-16 border-b ${colors.borderLight}`}
          ariaLabelledby="benefits-title-equilibra"
        >
          <motion.h2
            variants={fadeInUp}
            id="benefits-title-equilibra"
            className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} text-center mb-10 md:mb-12`}
          >
            {t.benefitsTitle}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {anticipatedBenefits.map((benefit, index) => (
              <DetailListItem
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                iconColorClass={colors.success}
              />
            ))}
          </div>
        </Section>

        {/* Pilot Program & Next Steps Section */}
        <Section
          bg={colors.background}
          className="py-12 md:py-16"
          ariaLabelledby="pilot-title-equilibra"
        >
          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <FiCalendar
              className={`w-10 h-10 ${colors.iconColor} mx-auto mb-6`}
            />
            <h2
              id="pilot-title-equilibra"
              className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} mb-6`}
            >
              {t.pilotTitle}
            </h2>
            <p
              className={`${colors.textSecondary} text-base md:text-lg leading-relaxed mb-4`}
            >
              {t.pilotP1}
            </p>
            <p
              className={`${colors.textSecondary} text-base md:text-lg leading-relaxed`}
            >
              {t.pilotP2}
            </p>
          </motion.div>
        </Section>

        {/* Final CTA Section */}
        <Section
          className={`py-16 md:py-20 text-center bg-[#FDB386]/20 border-t ${colors.borderLight} `}
          ariaLabelledby="equilibra-final-cta"
        >
          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
            <img
              src={equilibraLogoPath}
              alt="Equilibra CR Logo"
              className="h-12 md:h-16 w-auto mx-auto mb-6"
            />
            <h2
              id="equilibra-final-cta"
              className={`text-2xl md:text-3xl font-bold ${colors.textPrimary} mb-4`}
            >
              {t.ctaTitle}
            </h2>
            <p
              className={`text-md md:text-lg ${colors.textSecondary} mb-8 max-w-xl mx-auto`}
            >
              {t.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                to="/equilibra" // Link to the platform showcase
                variant="custom"
                size="lg"
                icon={<FiArrowRight />}
                className={`${colors.buttonPrimaryBg} ${colors.textHighlight} ${colors.buttonPrimaryHover} shadow-lg`}
              >
                {t.ctaButtonPrimary}
              </Button>
              <Button
                to={`/contact-sales?client=equilibra&topic=strategic_discussion`}
                variant="custom"
                size="lg"
                className={`bg-transparent border-2 ${colors.borderAccent} ${colors.textHighlight} hover:bg-[#E86F51]/10 hover:border-[#E86F51]`}
              >
                {t.ctaButtonSecondary}
              </Button>
            </div>
          </motion.div>
        </Section>

        <p
          className={`text-center text-xs ${colors.textSecondary} mt-12 pb-12 flex items-center justify-center gap-1.5`}
        ></p>
      </main>
    </div>
  );
}

// --- PropTypes ---
ProposalEquilibraDetailsPage.propTypes = {};
DetailListItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColorClass: PropTypes.string,
};
VideoShowcaseCard.propTypes = {
  thumbnailUrl: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
  videoSourceInfo: PropTypes.string.isRequired,
  onPlay: PropTypes.func,
};
ActivationOfferCard.propTypes = {
  title: PropTypes.string.isRequired,
  offerText: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  ctaIcon: PropTypes.elementType,
};
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};
Button.propTypes = {
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
