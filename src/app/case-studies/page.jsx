'use client';

import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { useTranslation } from "../../i18n/useTranslation";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const sectionStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const viewportOnce = { once: true, amount: 0.1 };

export default function CaseStudiesPage() {
  const { t } = useTranslation();

  const caseStudyLinks = ["https://giryams.com"];

  return (
    <div className="overflow-x-hidden min-h-screen relative bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950">
      {/* Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container px-4 sm:px-6 mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={sectionStagger}>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.caseStudies.title} <span className="text-blue-300">{t.caseStudies.titleHighlight}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">{t.caseStudies.subtitle}</motion.p>
          </motion.div>
        </div>
      </div>

      {/* Case studies */}
      <div className="pb-20">
        <div className="container px-4 sm:px-6 mx-auto max-w-5xl">
          <motion.div className="space-y-8" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionStagger}>
            {t.caseStudies.items.map((study, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <a href={caseStudyLinks[index] || "#"} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="bg-slate-800/70 rounded-xl border border-slate-700 hover:border-blue-500/40 transition-all duration-300 overflow-hidden backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative aspect-video md:aspect-auto min-h-[250px] bg-gradient-to-br from-stone-200 via-stone-300 to-stone-500 flex items-center justify-center">
                        <img src="/images/logoGirya.svg" alt="Girya: Mindful Strength" className="w-40 md:w-52 h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-stone-700 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{study.industry}</span>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{study.title}</h3>
                        <p className="text-slate-400 mb-4 leading-relaxed">{study.description}</p>
                        <div className="bg-slate-700/50 rounded-lg p-3 mb-4 border border-slate-600">
                          <p className="text-sm text-green-400 font-medium">{study.keyResult}</p>
                          <p className="text-white font-semibold text-sm">{study.result}</p>
                        </div>
                        <span className="text-cyan-400 flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                          {study.cta} <FiExternalLink />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
