'use client';

import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiSettings, FiUsers, FiLinkedin } from "react-icons/fi";
import { useTranslation } from "../../i18n/useTranslation";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const sectionStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const viewportOnce = { once: true, amount: 0.1 };
const pillarIcons = [<FiTarget key={0} className="w-8 h-8" />, <FiSettings key={1} className="w-8 h-8" />, <FiUsers key={2} className="w-8 h-8" />];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-900 overflow-x-hidden">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 opacity-50" />
        <div className="container relative z-10 px-4 sm:px-6 mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={sectionStagger}>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.about.title} <span className="text-blue-300">{t.about.titleHighlight}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">{t.about.subtitle}</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="container px-4 sm:px-6 mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionStagger}>
            {t.about.pillars.map((pillar, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-slate-800/70 p-8 rounded-xl border border-slate-700 hover:border-blue-500/40 transition-colors duration-300 text-center">
                <div className="text-blue-400 mb-4 bg-blue-500/10 p-3 rounded-lg inline-block">{pillarIcons[index]}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{pillar.title}</h3>
                <p className="text-slate-400 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="container px-4 sm:px-6 mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionStagger}>
            <motion.h2 variants={fadeInUp} className="text-base font-semibold text-blue-300 uppercase tracking-wider">{t.about.teamLabel}</motion.h2>
            <motion.p variants={fadeInUp} className="mt-2 text-3xl font-bold text-white sm:text-4xl">{t.about.teamTitle}</motion.p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionStagger}>
            {t.about.members.map((member, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-slate-800/70 p-8 rounded-xl border border-slate-700 text-center hover:border-blue-500/40 transition-colors duration-300" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm font-medium mb-1">{member.role}</p>
                {member.dept && <p className="text-cyan-400/70 text-xs font-medium mb-3">{member.dept}</p>}
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{member.description}</p>
                <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors inline-flex items-center gap-1 text-sm">
                  <FiLinkedin className="w-4 h-4" /> LinkedIn
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
