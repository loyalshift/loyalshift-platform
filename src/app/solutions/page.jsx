'use client';

import React from "react";
import { motion } from "framer-motion";
import { FiSettings, FiCode, FiZap, FiShoppingCart, FiMonitor, FiArrowRight } from "react-icons/fi";
import StyledOutlineButton from "../components/StyledOutlineButton";
import { useTranslation } from "../../i18n/useTranslation";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const sectionStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const viewportOnce = { once: true, amount: 0.1 };
const serviceIcons = [<FiSettings key={0} className="w-8 h-8" />, <FiCode key={1} className="w-8 h-8" />, <FiShoppingCart key={2} className="w-8 h-8" />, <FiZap key={3} className="w-8 h-8" />, <FiMonitor key={4} className="w-8 h-8" />];

export default function SolutionsPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-900 overflow-x-hidden">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 opacity-50" />
        <div className="container relative z-10 px-4 sm:px-6 mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={sectionStagger}>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.solutions.title} <span className="text-blue-300">{t.solutions.titleHighlight}</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="space-y-12 max-w-5xl mx-auto">
            {t.solutions.services.map((service, index) => (
              <motion.div key={index} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeInUp} className="bg-slate-800/70 rounded-xl border border-slate-700 hover:border-blue-500/40 transition-colors duration-300 p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="flex-shrink-0">
                    <div className="text-blue-400 bg-blue-500/10 p-4 rounded-lg inline-block">{serviceIcons[index]}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-4">{service.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="text-slate-300 text-sm flex items-center gap-2">
                          <span className="text-cyan-400 text-xs">&#9679;</span>{benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="text-center mt-16" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeInUp}>
            <p className="text-slate-400 mb-6 text-lg">{t.solutions.ctaText}</p>
            <StyledOutlineButton to="/contact" icon={<FiArrowRight />}>{t.solutions.ctaButton}</StyledOutlineButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
