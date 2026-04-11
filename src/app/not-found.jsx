'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { useTranslation } from "../i18n/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center">
      <motion.div className="text-center px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-8xl font-bold text-blue-400 mb-4">{t.notFound.code}</h1>
        <p className="text-2xl text-white mb-2">{t.notFound.title}</p>
        <p className="text-slate-400 mb-8">{t.notFound.subtitle}</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg">
          <FiHome /> {t.notFound.button}
        </Link>
      </motion.div>
    </div>
  );
}
