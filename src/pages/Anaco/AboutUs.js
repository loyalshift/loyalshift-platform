// src/pages/AboutUs.js
// Compelling About Us page for ANACO Inversiones.
// Focuses on trust, experience, efficiency, and local roots.
// Uses Green/White/Grey theme.
// Current time: Friday, May 2, 2025 at 9:55 AM CST (San José, Costa Rica).

import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiAward, // Experience, Trust, Legacy
  FiUsers, // Team, Clients, Personalized Service
  FiMapPin, // Location, Local Focus (Cartago)
  FiTrendingUp, // Growth, Efficiency
  FiHeart, // Values, Commitment
  FiHome, // Mortgages
  FiClock, // Values/Benefits Check
  FiPhone, // CTA
  FiCalendar, // History/Timeline
} from "react-icons/fi";

// --- Reusable Components (Assume Button is imported correctly) ---
import Button from "../../components/Button"; // Adjust path if needed

// --- Green/White/Grey Color Theme ---
const colors = {
  background: "bg-slate-50",
  surface: "bg-white",
  primary: "text-emerald-700", // Main Green
  primaryDark: "text-emerald-800", // Darker Green
  primaryBg: "bg-emerald-600",
  primaryBgHover: "hover:bg-emerald-700",
  secondary: "text-slate-500", // Medium Grey
  textDark: "text-slate-800", // Dark Grey
  textLight: "text-white",
  border: "border-slate-200",
  borderMedium: "border-slate-300",
  accentSuccess: "text-emerald-500", // Lighter green for success checks
  primaryLightBg: "bg-emerald-50", // Very light green for subtle backgrounds
};

// --- Simple Animation Variants ---
const viewportOnce = { once: true, amount: 0.2 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// --- Reusable Section Component ---
const Section = ({
  children,
  className = "",
  bg = colors.background,
  ariaLabelledby,
}) => (
  <motion.section
    className={`py-16 md:py-24 ${bg} ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
    variants={staggerContainer}
    aria-labelledby={ariaLabelledby}
  >
    <div className="container mx-auto px-4 sm:px-6">{children}</div>
  </motion.section>
);

// --- Reusable Value Card Component ---
const ValueCard = ({ icon: Icon, title, children }) => (
  <motion.div variants={fadeInUp} className="text-center p-6">
    <div
      className={`inline-flex p-4 rounded-full ${colors.primaryLightBg} mb-4 border ${colors.border}`}
    >
      <Icon className={`w-8 h-8 ${colors.primary}`} />
    </div>
    <h3 className={`text-xl font-semibold ${colors.textDark} mb-2`}>{title}</h3>
    <p className={`${colors.secondary} text-base`}>{children}</p>
  </motion.div>
);

// --- Main About Us Component ---
export default function AboutUsPage() {
  return (
    <div className={`${colors.background} ${colors.textDark}`}>
      {/* Hero Section */}
      <Section bg={colors.background} ariaLabelledby="about-hero-title">
        <motion.div
          className="text-center max-w-4xl mx-auto pt-16 md:pt-20" // Added top padding
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className={`inline-block p-3 rounded-full ${colors.primaryLightBg} border ${colors.border} mb-4`}
          >
            <FiAward className={`w-10 h-10 ${colors.primary}`} />
          </motion.div>
          <motion.h1
            id="about-hero-title"
            variants={fadeInUp}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colors.textDark} mb-6 leading-tight`}
          >
            Más de 40 Años Construyendo{" "}
            <span className={colors.primary}>Confianza</span> en Cartago
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className={`text-lg md:text-xl ${colors.secondary} max-w-3xl mx-auto`}
          >
            Somos ANACO Inversiones, su socio financiero local comprometido con
            la eficiencia, la transparencia y el servicio personalizado que
            usted y su familia merecen.
          </motion.p>
        </motion.div>
      </Section>

      {/* Our Story / Legacy Section */}
      <Section
        bg={colors.surface}
        className="border-y ${colors.border}"
        ariaLabelledby="our-story-title"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <h2
              id="our-story-title"
              className={`text-3xl font-bold ${colors.textDark} mb-4`}
            >
              Nuestra Trayectoria: Un Legado Familiar
            </h2>
            <p className={`${colors.secondary} text-lg leading-relaxed mb-4`}>
              Desde hace más de cuatro décadas, ANACO Inversiones ha sido un
              pilar en la comunidad financiera de Cartago. Nacimos como una
              empresa familiar con la misión clara de ofrecer soluciones
              financieras accesibles y eficientes, especialmente en el ámbito
              hipotecario.
            </p>
            <p className={`${colors.secondary} text-lg leading-relaxed`}>
              Mantenemos esos valores fundamentales de cercanía, agilidad y
              profundo conocimiento local, adaptándonos a los nuevos tiempos
              para seguir impulsando los sueños de nuestros clientes y socios.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center">
            <div className="aspect-[4/3] mt-auto rounded overflow-hidden shadow-inner max-w-lg mx-auto">
              <img
                src="/images/family-legacy.jpeg"
                alt="roof view of residential homes"
                className="w-full h-full object-cover" // Keep these
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Mission, Vision, Values Section */}
      <Section ariaLabelledby="our-values-title">
        <motion.h2
          id="our-values-title"
          variants={fadeInUp}
          className={`text-3xl font-bold ${colors.textDark} text-center mb-16`}
        >
          Nuestro Compromiso
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <ValueCard icon={FiHeart} title="Misión">
            Facilitar el acceso a soluciones financieras, especialmente
            hipotecarias, con agilidad, transparencia y un servicio
            personalizado excepcional para la comunidad de Cartago y Costa Rica.
          </ValueCard>
          <ValueCard icon={FiTrendingUp} title="Visión">
            Ser el socio financiero de referencia en la región, reconocido por
            nuestra eficiencia, confiabilidad y por impulsar activamente el
            éxito de nuestros clientes y aliados estratégicos.
          </ValueCard>
          <ValueCard icon={FiUsers} title="Valores">
            Confianza, Integridad, Eficiencia, Servicio Personalizado,
            Compromiso Local, Innovación Responsable.
          </ValueCard>
        </motion.div>
      </Section>

      {/* Why Choose Us / Our Approach Section */}
      <Section
        bg={colors.surface}
        className={`border-y ${colors.border}`}
        ariaLabelledby="why-choose-us-title"
      >
        <motion.h2
          id="why-choose-us-title"
          variants={fadeInUp}
          className={`text-3xl font-bold ${colors.textDark} text-center mb-16`}
        >
          La Diferencia ANACO
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Reusing ValueCard structure for consistency */}
          <ValueCard icon={FiAward} title="Experiencia Comprobada">
            Más de 40 años en el mercado financiero local nos respaldan.
          </ValueCard>
          <ValueCard icon={FiClock} title="Agilidad y Eficiencia">
            Procesos optimizados para respuestas rápidas, especialmente en
            créditos hipotecarios.
          </ValueCard>
          <ValueCard icon={FiUsers} title="Trato Personalizado">
            Entendemos sus necesidades individuales y le ofrecemos soluciones a
            medida.
          </ValueCard>
          <ValueCard icon={FiMapPin} title="Conocimiento Local">
            Experiencia profunda en el mercado inmobiliario y financiero de
            Cartago.
          </ValueCard>
        </motion.div>
      </Section>

      {/* Call to Action Section */}
      <Section ariaLabelledby="cta-title">
        <motion.div
          variants={fadeInUp}
          className={`text-center max-w-3xl mx-auto p-10 rounded-lg ${colors.primaryLightBg} border ${colors.border}`}
        >
          <FiHome className={`w-12 h-12 ${colors.primary} mx-auto mb-4`} />
          <h2
            id="cta-title"
            className={`text-3xl font-bold ${colors.textDark} mb-4`}
          >
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className={`text-lg ${colors.secondary} mb-8`}>
            Ya sea que busque iniciar su pre-aprobación hipotecaria, explorar
            opciones de inversión o necesite asesoría financiera, nuestro equipo
            está listo para ayudarle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              to="/anaco/contact" // Link to Contact page
              variant="primary" // Use primary green style
              size="lg"
              icon={<FiPhone />}
              className={`bg-emerald-600 hover:bg-emerald-700 text-white`} // Explicit classes
            >
              Contactar Ahora
            </Button>
            {/* Optional secondary CTA */}
            <Button
              to="/anaco/pre-approval-process" // Link to mortgage services
              variant="secondary"
              size="lg"
              className={`bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300`} // Explicit classes
            >
              Iniciar su Pre-Aprobación Hipotecaria
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}

// --- PropTypes ---
// Define PropTypes for sub-components if they are complex or reused widely
Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};

ValueCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Button PropTypes should be defined in Button.js
