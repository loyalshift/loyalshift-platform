// src/pages/smb/SMBAboutUsPage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocalization } from "../../components/LocalizationContext";

// Icons (Heroicons)
const IconProfessionalWebsites = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);
const IconSMBStudio = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);
const IconDigitalTools = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);
const IconLocalSupport = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
    />
  </svg>
);

const InfoCard = ({ titleKey, textKey, t, icon }) => (
  <motion.div
    className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="bg-cyan-50 dark:bg-cyan-700/30 text-cyan-500 dark:text-cyan-400 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
      {t(titleKey)}
    </h3>
    <p className="text-slate-600 dark:text-slate-300">{t(textKey)}</p>
  </motion.div>
);

const ValueCard = ({ titleKey, textKey, t }) => (
  <div className="bg-smb-off-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
    <h4 className="text-lg font-semibold text-cyan-500 dark:text-cyan-400 mb-3">
      {t(titleKey)}
    </h4>
    <p className="text-slate-600 dark:text-slate-300 text-sm">{t(textKey)}</p>
  </div>
);

const SectionDivider = () => (
  <div className="py-16 flex justify-center">
    <div className="w-24 h-1 bg-cyan-400/20 rounded-full"></div>
  </div>
);

export default function SMBAboutUsPage() {
  const { t } = useLocalization();

  return (
    <div className="bg-smb-off-white dark:bg-slate-900 text-slate-700 dark:text-slate-200">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-400/5 via-smb-off-white to-smb-off-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("smbAboutUsPage.headerTitle")}
          </motion.h1>
          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t("smbAboutUsPage.headerSubtitle")}
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {t("smbAboutUsPage.missionSectionTitle")}
            </h2>
            <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                {t("smbAboutUsPage.missionTextP1")}
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {t("smbAboutUsPage.missionTextP2")}
              </p>
            </motion.div>
            <motion.div
              className="bg-cyan-400/5 p-10 rounded-2xl border border-cyan-400/20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl text-center">
                  <div className="text-3xl font-bold text-cyan-500 dark:text-cyan-400 mb-2">
                    2018
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    {t("smbAboutUsPage.statFoundedLabel", "Founded")}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl text-center">
                  <div className="text-3xl font-bold text-cyan-500 dark:text-cyan-400 mb-2">
                    500+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    {t("smbAboutUsPage.statClientsLabel", "Clients")}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl text-center">
                  <div className="text-3xl font-bold text-cyan-500 dark:text-cyan-400 mb-2">
                    20+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    {t("smbAboutUsPage.statTeamMembersLabel", "Team Members")}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl text-center">
                  <div className="text-3xl font-bold text-cyan-500 dark:text-cyan-400 mb-2">
                    98%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    {t(
                      "smbAboutUsPage.statClientRetentionLabel",
                      "Client Retention"
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Who We Are Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {t("smbAboutUsPage.whoWeAreSectionTitle")}
            </h2>
            <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {t("smbAboutUsPage.whoWeAreTextP1")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {t("smbAboutUsPage.whoWeAreTextP2")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* How We Empower Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {t("smbAboutUsPage.howWeHelpSectionTitle")}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t(
                "smbAboutUsPage.howWeHelpSubtitle",
                "Comprehensive solutions tailored for your business success"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <InfoCard
              titleKey="smbAboutUsPage.howWeHelpItem1Title"
              textKey="smbAboutUsPage.howWeHelpItem1Text"
              t={t}
              icon={<IconProfessionalWebsites />}
            />
            <InfoCard
              titleKey="smbAboutUsPage.howWeHelpItem2Title"
              textKey="smbAboutUsPage.howWeHelpItem2Text"
              t={t}
              icon={<IconSMBStudio />}
            />
            <InfoCard
              titleKey="smbAboutUsPage.howWeHelpItem3Title"
              textKey="smbAboutUsPage.howWeHelpItem3Text"
              t={t}
              icon={<IconDigitalTools />}
            />
            <InfoCard
              titleKey="smbAboutUsPage.howWeHelpItem4Title"
              textKey="smbAboutUsPage.howWeHelpItem4Text"
              t={t}
              icon={<IconLocalSupport />}
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Our Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {t("smbAboutUsPage.ourValuesSectionTitle")}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t(
                "smbAboutUsPage.ourValuesSubtitle",
                "The principles that guide everything we do"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ValueCard
              titleKey="smbAboutUsPage.value1Title"
              textKey="smbAboutUsPage.value1Text"
              t={t}
            />
            <ValueCard
              titleKey="smbAboutUsPage.value2Title"
              textKey="smbAboutUsPage.value2Text"
              t={t}
            />
            <ValueCard
              titleKey="smbAboutUsPage.value3Title"
              textKey="smbAboutUsPage.value3Text"
              t={t}
            />
            <ValueCard
              titleKey="smbAboutUsPage.value4Title"
              textKey="smbAboutUsPage.value4Text"
              t={t}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500 to-cyan-600">
        {" "}
        {/* Updated gradient */}
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("smbAboutUsPage.ctaSectionTitle")}
          </motion.h2>
          <motion.p
            className="text-lg text-white/90 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("smbAboutUsPage.ctaText")}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/smb/solutions"
              className="inline-block bg-white hover:bg-slate-100 text-cyan-600 font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {t("smbAboutUsPage.ctaButtonSolutions")}
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-cyan-400/30 hover:bg-cyan-400/50 text-white font-semibold py-3 px-8 rounded-lg border-2 border-cyan-200/70 hover:border-white transition duration-300 transform hover:-translate-y-0.5"
            >
              {t("smbAboutUsPage.ctaButtonContact")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
