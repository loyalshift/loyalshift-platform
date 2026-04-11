'use client';

import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiArrowRight } from "react-icons/fi";
import { useTranslation } from "../../i18n/useTranslation";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const sectionStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const viewportOnce = { once: true, amount: 0.1 };

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-900 overflow-x-hidden">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 opacity-50" />
        <div className="container relative z-10 px-4 sm:px-6 mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={sectionStagger}>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.contact.title} <span className="text-blue-300">{t.contact.titleHighlight}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">{t.contact.subtitle}</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="container px-4 sm:px-6 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionStagger}>
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-white mb-6">{t.contact.formTitle}</motion.h2>
              <form className="space-y-6">
                <motion.div variants={fadeInUp}>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">{t.contact.labels.name}</label>
                  <input type="text" id="name" className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors" placeholder={t.contact.placeholders.name} />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">{t.contact.labels.email}</label>
                  <input type="email" id="email" className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors" placeholder={t.contact.placeholders.email} />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">{t.contact.labels.company}</label>
                  <input type="text" id="company" className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors" placeholder={t.contact.placeholders.company} />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">{t.contact.labels.message}</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors resize-none" placeholder={t.contact.placeholders.message} />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <motion.button type="submit" className="w-full sm:w-auto px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-cyan-500/30" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                    {t.contact.button} <FiArrowRight />
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionStagger} className="lg:pl-8">
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-white mb-6">{t.contact.infoTitle}</motion.h2>
              <div className="space-y-8">
                <motion.div variants={fadeInUp} className="bg-slate-800/70 p-6 rounded-xl border border-slate-700">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><FiMail className="text-blue-400" /> {t.contact.emailLabel}</h3>
                  <a href="mailto:info@loyalshift.com" className="text-slate-400 hover:text-blue-400 transition-colors">info@loyalshift.com</a>
                </motion.div>
                <motion.div variants={fadeInUp} className="bg-slate-800/70 p-6 rounded-xl border border-slate-700">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><FiMapPin className="text-blue-400" /> {t.contact.locationsLabel}</h3>
                  <div className="space-y-2">
                    <p className="text-slate-400">Cartago, CR</p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                  <h3 className="text-white font-semibold mb-2">{t.contact.notSureTitle}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{t.contact.notSureText}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
