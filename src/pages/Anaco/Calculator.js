// src/pages/CalculatorPage.js
// "Smart" calculator for ANACO - Mortgage Pre-Approval Estimator.
// Uses Green/White/Grey theme and Spanish language.
// Current time: Friday, May 2, 2025 at 10:37 AM CST (San José, Costa Rica).

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiSliders,
  FiAlertTriangle,
  FiInfo,
  FiArrowRight,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast"; // For potential validation messages

// --- Reusable Components ---
import Button from "../../components/Button"; // Adjust path if needed
import InputField from "../../components/InputField"; // Adjust path if needed

// --- Green/White/Grey Color Theme ---
const colors = {
  background: "bg-slate-100", // Use slightly off-white for main background
  surface: "bg-white", // White for cards/sections
  primary: "text-emerald-700",
  primaryBg: "bg-emerald-600",
  primaryBgHover: "hover:bg-emerald-700",
  secondary: "text-slate-600",
  textDark: "text-slate-800",
  textLight: "text-white",
  border: "border-slate-300",
  inputBorder: "border-slate-300",
  inputFocusBorder: "focus:border-emerald-500",
  inputFocusRing: "focus:ring-emerald-500/50",
  errorText: "text-red-600",
  warningBg: "bg-yellow-50", // For disclaimer
  warningBorder: "border-yellow-300",
  warningIcon: "text-yellow-500",
  resultBg: "bg-emerald-50", // Light green for results area
  resultBorder: "border-emerald-200",
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

// --- Calculation Logic ---
// Calculates maximum loan principal based on affordability
function calculateMaxLoan(
  monthlyIncome,
  otherDebts,
  annualRatePercent,
  termYears,
  dtiRatio = 0.4
) {
  if (monthlyIncome <= 0 || annualRatePercent <= 0 || termYears <= 0) {
    return { maxLoan: 0, monthlyPayment: 0 };
  }

  const maxTotalDebtPayment = monthlyIncome * dtiRatio;
  const availableForMortgage = Math.max(0, maxTotalDebtPayment - otherDebts);

  if (availableForMortgage <= 0) {
    return { maxLoan: 0, monthlyPayment: 0 };
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  const numberOfMonths = termYears * 12;

  // Standard mortgage principal calculation formula
  // P = A / [ (r * (1+r)^n) / ((1+r)^n - 1) ]
  const rateFactor = Math.pow(1 + monthlyRate, numberOfMonths);
  let maxLoan = 0;
  if (rateFactor !== 1) {
    // Avoid division by zero if rate is 0, though we check > 0 earlier
    maxLoan =
      (availableForMortgage * (rateFactor - 1)) / (monthlyRate * rateFactor);
  }

  return {
    maxLoan: Math.round(maxLoan), // Round to nearest Colon
    monthlyPayment: Math.round(availableForMortgage), // This is the max payment they can afford
  };
}

// Format numbers as Costa Rican Colón currency
function formatCurrency(value) {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 0,
  }).format(value);
}

// --- Main Calculator Page Component ---
export default function AnacoCalculatorPage() {
  const [inputs, setInputs] = useState({
    income: "",
    otherIncome: "",
    debts: "",
    rate: "8.5", // Default sensible rate for Costa Rica (adjust as needed)
    term: "30", // Default term
  });

  const [results, setResults] = useState({ maxLoan: 0, monthlyPayment: 0 });
  const [dtiRatio, setDtiRatio] = useState(0.4); // Default DTI Ratio (40%) - Adjust based on ANACO/SUGEF stds

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow only numbers and potentially a single decimal point
    const sanitizedValue = value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setInputs((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  // Recalculate whenever inputs change
  useEffect(() => {
    const incomeNum = parseFloat(inputs.income) || 0;
    const otherIncomeNum = parseFloat(inputs.otherIncome) || 0;
    const debtsNum = parseFloat(inputs.debts) || 0;
    const rateNum = parseFloat(inputs.rate) || 0;
    const termNum = parseInt(inputs.term, 10) || 0;

    // Only calculate if essential inputs are valid
    if (incomeNum > 0 && rateNum > 0 && termNum > 0) {
      const calculated = calculateMaxLoan(
        incomeNum + otherIncomeNum,
        debtsNum,
        rateNum,
        termNum,
        dtiRatio
      );
      setResults(calculated);
    } else {
      setResults({ maxLoan: 0, monthlyPayment: 0 }); // Reset if inputs are invalid
    }
  }, [
    inputs.income,
    inputs.otherIncome,
    inputs.debts,
    inputs.rate,
    inputs.term,
    dtiRatio,
  ]);

  // Timestamp for display
  const currentTime = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className={` ${colors.background} min-h-screen py-6 md:py-10`}>
      <Toaster position="top-center" />

      {/* Optional: Add AnacoHeader here */}

      <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="">
          {/* Header */}
          <motion.section
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className={`inline-block p-3 mb-4 rounded-full ${colors.primary}/10 border ${colors.border}`}
            >
              <FiSliders className={`w-10 h-10 ${colors.primary}`} />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className={`text-4xl md:text-5xl font-bold ${colors.textDark} mb-4`}
            >
              Estimador de Pre-Aprobación
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lg ${colors.secondary} max-w-2xl mx-auto`}
            >
              Para obtener una estimación del monto de crédito y pago mensual
              que podría obtener con ANACO Inversiones.
            </motion.p>
          </motion.section>

          {/* Results & Disclaimer Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6" // Add space between results and disclaimer
          >
            {/* Results Display */}
            <motion.div
              variants={fadeInUp}
              className={`p-6 md:p-8 rounded-xl border ${colors.resultBorder} ${colors.resultBg} shadow-md`} // Styled results box
            >
              <h2
                className={`text-2xl font-semibold ${colors.textDark} mb-6 text-center`}
              >
                Resultados Estimados
              </h2>
              <div className="space-y-4">
                <div className="text-center">
                  <p
                    className={`text-sm ${colors.secondary} uppercase tracking-wide`}
                  >
                    Monto Máximo Estimado del Préstamo
                  </p>
                  <p className={`text-4xl font-bold ${colors.primary} mt-1`}>
                    {formatCurrency(results.maxLoan)}
                  </p>
                </div>
                <div className="text-center border-t border-emerald-200 pt-4">
                  <p
                    className={`text-sm ${colors.secondary} uppercase tracking-wide`}
                  >
                    Pago Mensual Estimado (Principal + Interés)
                  </p>
                  <p className={`text-3xl font-bold ${colors.primary} mt-1`}>
                    {formatCurrency(results.monthlyPayment)}*
                  </p>
                </div>
              </div>
              <div
                className={`text-xs ${colors.secondary} text-center mt-6 space-y-1`}
              >
                <p>
                  *Pago mensual estimado solo de Principal e Intereses (P+I).
                </p>
                <p>
                  Basado en una tasa anual de {inputs.rate || 0}% a{" "}
                  {inputs.term || 0} años.
                </p>
                <p>
                  Ratio Deuda/Ingreso (DTI) asumido:{" "}
                  {(dtiRatio * 100).toFixed(0)}
                  %.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Input Section */}
        <motion.div
          className={`${colors.surface} p-6 md:p-8 rounded-xl shadow-lg border ${colors.border}`}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <h2 className={`text-2xl font-semibold ${colors.textDark} mb-6`}>
            Ingrese sus Datos
          </h2>

          {/* Income */}
          <motion.div variants={fadeInUp} className="mb-4">
            <InputField
              label="Ingreso Bruto Mensual (Principal)"
              id="income"
              name="income"
              type="number"
              value={inputs.income}
              onChange={handleChange}
              required
              placeholder="Monto en ₡"
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="mb-4">
            <InputField
              label="Otros Ingresos Mensuales (Opcional)"
              id="otherIncome"
              name="otherIncome"
              type="number"
              value={inputs.otherIncome}
              onChange={handleChange}
              placeholder="Monto en ₡"
            />
          </motion.div>

          {/* Debts */}
          <motion.div variants={fadeInUp} className="mb-6">
            <InputField
              label="Pagos Mensuales de Otras Deudas"
              id="debts"
              name="debts"
              type="number"
              value={inputs.debts}
              onChange={handleChange}
              required
              placeholder="Préstamos, tarjetas, etc."
            />
          </motion.div>

          {/* Loan Parameters */}
          <motion.div variants={fadeInUp} className="mb-4">
            <label
              htmlFor="rate"
              className={`block ${colors.textDark} mb-1 font-medium text-sm`}
            >
              Tasa de Interés Anual Estimada (%)
            </label>
            <input
              type="number"
              id="rate"
              name="rate"
              value={inputs.rate}
              onChange={handleChange}
              step="0.1"
              min="0.1"
              required
              className={`w-full p-3 border ${colors.inputBorder} rounded-md focus:outline-none ${colors.inputFocusRing} ${colors.inputFocusBorder} transition duration-150 ease-in-out ${colors.surface} ${colors.textDark}`}
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="mb-4">
            <label
              htmlFor="term"
              className={`block ${colors.textDark} mb-1 font-medium text-sm`}
            >
              Plazo del Préstamo (Años)
            </label>
            <select
              id="term"
              name="term"
              value={inputs.term}
              onChange={handleChange}
              className={`w-full p-3 border ${colors.inputBorder} rounded-md focus:outline-none ${colors.inputFocusRing} ${colors.inputFocusBorder} transition duration-150 ease-in-out ${colors.surface} ${colors.textDark} appearance-none`}
            >
              <option value="15">15 Años</option>
              <option value="20">20 Años</option>
              <option value="25">25 Años</option>
              <option value="30">30 Años</option>
              {/* Add other common terms if needed */}
            </select>
          </motion.div>
          {/* Disclaimer */}
          <motion.div
            variants={fadeInUp}
            className={`p-4 rounded-md border ${colors.warningBorder} ${colors.warningBg} text-sm ${colors.textDark}`}
          >
            <div className="flex items-start gap-3">
              <FiAlertTriangle
                className={`w-6 h-6 ${colors.warningIcon} flex-shrink-0 mt-0.5`}
                aria-hidden="true"
              />
              <div>
                <strong className="font-semibold block mb-1">
                  Importante: Estimación No Vinculante
                </strong>
                Resultados Estimados: Esta simulación no garantiza aprobación.
                Aplican verificación completa y políticas de ANACO Inversiones.
                Para una evaluación formal, contacte a un asesor.
              </div>
            </div>
          </motion.div>

          {/* Optional: Next Step Button */}
          <motion.div variants={fadeInUp} className="text-center pt-4">
            <Button
              to="/anaco/request-pre-approval" // Link to actual form if separate
              variant="primary"
              size="lg"
              icon={<FiArrowRight />}
              className={`${colors.primaryBg} ${colors.primaryBgHover} ${colors.textLight}`}
            >
              Iniciar Solicitud Formal
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// --- PropTypes ---
// Add PropTypes for sub-components if defined inline or check imported components
// ContactInfoItem.propTypes = { /* ... */ };
// InputField.propTypes = { /* ... */ };
// Button.propTypes = { /* ... */ };
