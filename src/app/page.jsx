'use client';

import React from "react";
import { FiPhone, FiTrendingUp, FiDollarSign, FiClock, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";
import StatCard from "./components/StatCard";
import StyledOutlineButton from "./components/StyledOutlineButton";
import { useTranslation } from "../i18n/useTranslation";

const viewportOnce = { once: true, amount: 0.1 };
const sectionStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardGridStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const skewFadeInUp = {
  hidden: { opacity: 0, y: 40, skewY: 2 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const approachIcons = ["FiSettings", "FiCode", "FiShield", "FiTarget"];
const serviceIcons = ["FiTool", "FiLayout", "FiZap"];
const statIcons = [<FiTrendingUp key={0} />, <FiDollarSign key={1} />, <FiClock key={2} />];

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-900 overflow-x-hidden">
      <Hero />

      {/* Our Approach Section */}
      <section aria-labelledby="approach-title" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-blue-900/5 via-transparent to-transparent -translate-x-1/4 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/3 bg-gradient-to-tl from-cyan-900/5 via-transparent to-transparent translate-x-1/4 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container relative z-10 px-4 sm:px-6 mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionStagger}>
            <motion.h2 id="approach-title" variants={skewFadeInUp} className="text-base font-semibold text-blue-300 uppercase tracking-wider">{t.home.approach.label}</motion.h2>
            <motion.p variants={skewFadeInUp} className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">{t.home.approach.title}</motion.p>
            <motion.p variants={fadeInUp} className="mt-4 max-w-3xl text-lg md:text-xl text-slate-400 lg:mx-auto">{t.home.approach.description}</motion.p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" variants={cardGridStagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            {t.home.approach.cards.map((card, index) => (
              <FeatureCard key={index} index={index} icon={approachIcons[index]} title={card.title} description={card.description} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Services Section */}
      <section aria-labelledby="services-title" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="container relative z-10 px-4 sm:px-6 mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionStagger}>
            <motion.h2 id="services-title" variants={skewFadeInUp} className="text-base font-semibold text-blue-300 uppercase tracking-wider">{t.home.services.label}</motion.h2>
            <motion.p variants={skewFadeInUp} className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">{t.home.services.title}</motion.p>
            <motion.p variants={fadeInUp} className="mt-4 max-w-3xl text-lg md:text-xl text-slate-400 lg:mx-auto">{t.home.services.description}</motion.p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" variants={cardGridStagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            {t.home.services.cards.map((card, index) => (
              <FeatureCard key={index} index={index} icon={serviceIcons[index]} title={card.title} description={card.description} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Data-Driven Outcomes Section */}
      <section aria-labelledby="outcomes-title" className="py-28 relative overflow-hidden bg-slate-900">
        <motion.div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-blue-600/10 blur-2xl" aria-hidden="true" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce} transition={{ duration: 0.8, ease: "easeOut" }} />
        <motion.div className="absolute -top-1/4 -right-1/4 w-2/5 h-2/5 rounded-full bg-cyan-600/10 blur-2xl" aria-hidden="true" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} />
        <motion.div className="container relative z-10 px-4 sm:px-6 mx-auto" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionStagger}>
          <div className="text-center mb-16">
            <motion.h2 id="outcomes-title" variants={skewFadeInUp} className="text-base font-semibold text-blue-300 uppercase tracking-wider">{t.home.outcomes.label}</motion.h2>
            <motion.p variants={skewFadeInUp} className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">{t.home.outcomes.title}</motion.p>
            <motion.p variants={fadeInUp} className="mt-4 max-w-3xl text-lg md:text-xl text-slate-400 lg:mx-auto">{t.home.outcomes.description}</motion.p>
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16" variants={cardGridStagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            {t.home.outcomes.stats.map((stat, index) => (
              <StatCard key={index} icon={statIcons[index]} value={stat.value} suffix={stat.suffix} label={stat.label} index={index} />
            ))}
          </motion.div>
          <motion.div className="text-center" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <div className="relative inline-block max-w-2xl">
              <motion.div className="absolute -top-3 -left-3 w-4 h-4 rounded-full bg-cyan-400/30" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} />
              <motion.div className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-blue-400/30" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }} />
              <motion.p className="text-slate-400 mb-6 text-lg relative z-10">{t.home.outcomes.cta}</motion.p>
              <motion.div whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 10 } }} whileTap={{ scale: 0.98 }}>
                <StyledOutlineButton to="/contact" icon={<FiPhone className="group-hover:animate-pulse" />}>{t.home.outcomes.ctaButton}</StyledOutlineButton>
              </motion.div>
              <motion.div className="mt-4 text-xs text-slate-500 flex items-center justify-center gap-2" variants={fadeInUp} transition={{ delay: 0.3 }}>
                <FiShield className="text-green-400" />
                <span>{t.home.outcomes.trustLine}</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
