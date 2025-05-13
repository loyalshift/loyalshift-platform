// src/pages/RequestPreApprovalPage.js
// Form for Agents to request mortgage pre-approval for clients via FINANCIAL Conecta Hub.
// Uses Green/White/Grey theme. Assumes routing is set up.
// Current time is Friday, May 2, 2025 at 8:45:51 AM CST. San José, Alajuela Province, Costa Rica.

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // To redirect after submission
import {
    FiUser, FiUsers, FiFileText, FiDollarSign, FiHome, FiSend, FiLoader,
    FiCheckCircle, FiUpload, FiMail, FiPhone, FiInfo
} from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast'; // For user feedback

// --- Reusable Components (Adjust path relative to this file's location) ---
import Button from '../../components/Button'; // Assuming Button component exists
import InputField from '../../components/InputField'; // Assuming InputField component exists

// --- Green/White/Grey Color Theme ---
const colors = {
    background: "bg-slate-100", // Page background
    surface: "bg-white",      // Form card background
    primary: "text-emerald-700", // Trustworthy Green for text/icons
    primaryBg: "bg-emerald-600", // Brighter Green for buttons
    primaryBgHover: "hover:bg-emerald-700",
    secondary: "text-slate-500", // Medium grey for secondary text
    textDark: "text-slate-800", // Dark grey for main text
    textLight: "text-white",   // White text on green buttons
    border: "border-slate-300", // Standard border
    inputBorder: "border-slate-300", // Input border specific
    inputFocusBorder: "focus:border-emerald-500", // Input focus border
    inputFocusRing: "focus:ring-emerald-500/50", // Input focus ring
    errorText: "text-red-600", // For validation messages
    successText: "text-emerald-600", // For success indicators
};

// --- Simple Animation Variants ---
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
    visible: { transition: { staggerChildren: 0.07 } }
};

// --- Initial Form State ---
const initialFormData = {
    // Agent Info (Assuming agent details might be pre-filled or selected)
    // agentName: '',
    // agentId: '',

    // Client Info
    clientFullName: '',
    clientIdNumber: '', // Cedula
    clientEmail: '',
    clientPhone: '',
    // maritalStatus: '', // Example dropdown

    // Financial Info
    clientIncomeMonthly: '',
    // clientCoApplicantIncomeMonthly: '', // Optional co-applicant
    clientOtherIncomeMonthly: '',
    clientEstimatedDebtsMonthly: '',

    // Loan Details
    propertyValue: '',
    downPayment: '',
    // loanTermYears: '30', // Default term?

    // Property Info (Basic)
    propertyLocationProvince: 'Cartago', // Default relevant location?
    // propertyType: '', // House, Condo, Lot etc.

    // Documents & Consent
    // files: null, // File handling is more complex - represented by input only
    consentConfirmed: false,
};


// --- Main Component ---
export default function RequestPreApprovalPage() {
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // Hook for redirection

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Basic file handling placeholder - real implementation needs more state/logic
    const handleFileChange = (e) => {
        // In a real app, you'd handle e.target.files (a FileList)
        // Store files in state, maybe show previews/names.
        console.log("Files selected:", e.target.files);
        // setFormData(prev => ({ ...prev, files: e.target.files })); // Example
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const loadingToastId = toast.loading("Enviando solicitud...");

        // --- Basic Validation Example ---
        const requiredFields = ['clientFullName', 'clientIdNumber', 'clientEmail', 'clientPhone', 'clientIncomeMonthly', 'propertyValue', 'downPayment', 'consentConfirmed'];
        const missingField = requiredFields.find(field => !formData[field] || (typeof formData[field] === 'string' && !formData[field].trim()));

        if (missingField) {
            // Specific field names could be mapped to user-friendly Spanish names
            toast.error(`Por favor complete todos los campos requeridos (${missingField}).`, { id: loadingToastId });
            setIsSubmitting(false);
            return;
        }
        if (!formData.consentConfirmed) {
            toast.error("Debe confirmar que tiene la autorización del cliente.", { id: loadingToastId });
            setIsSubmitting(false);
            return;
        }
        // Add more specific validation (email format, numbers, etc.) here

        // --- Simulate API Submission ---
        console.log("Submitting Pre-Approval Request:", formData);
        // In a real app: Create FormData, append data & files, POST to backend API
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

            // Simulate success response
            toast.success("Solicitud de pre-aprobación enviada con éxito!", { id: loadingToastId });
            setFormData(initialFormData); // Reset form
            // Optional: Redirect to a confirmation page or dashboard
            // navigate('/agent-dashboard/submissions');

        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Error al enviar la solicitud. Intente de nuevo.", { id: loadingToastId });
        } finally {
            setIsSubmitting(false);
        }
        // --- End Simulation ---
    };

    // Get current timestamp string
    const currentTime = new Date().toLocaleString("es-CR", {
        timeZone: "America/Costa_Rica", dateStyle: 'medium', timeStyle: 'short'
    });

    return (
        <div className={`min-h-screen ${colors.background} py-12 md:py-20 px-4`}>
            <Toaster position="bottom-right" />
            <motion.div
                className={`max-w-2xl mx-auto ${colors.surface} rounded-xl shadow-xl border ${colors.border} p-6 md:p-10`}
                initial="hidden"
                animate="visible"
                variants={fadeInUp} // Animate the whole card entrance
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <FiFileText className={`w-12 h-12 ${colors.primary} mx-auto mb-3`} />
                    <h1 className={`text-3xl font-bold ${colors.textDark}`}>Solicitud de Pre-Aprobación Hipotecaria</h1>
                    <p className={`${colors.secondary} mt-2`}>Envíe la información del cliente para iniciar el proceso con ANACO Inversiones.</p>
                </div>

                {/* Form */}
                <motion.form onSubmit={handleSubmit} variants={staggerContainer} initial="hidden" animate="visible">

                    {/* Client Information Section */}
                    <fieldset className="mb-6">
                        <legend className={`text-xl font-semibold ${colors.textDark} border-b ${colors.border} pb-2 mb-4 flex items-center gap-2`}><FiUser /> Información del Cliente</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div variants={fadeInUp}>
                                <InputField label="Nombre Completo" id="clientFullName" name="clientFullName" value={formData.clientFullName} onChange={handleChange} required placeholder="Nombre Apellido Apellido" />
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <InputField label="Número de Cédula" id="clientIdNumber" name="clientIdNumber" value={formData.clientIdNumber} onChange={handleChange} required placeholder="Ej: 1-1234-5678" />
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <InputField label="Correo Electrónico" id="clientEmail" name="clientEmail" type="email" value={formData.clientEmail} onChange={handleChange} required placeholder="correo@ejemplo.com" />
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <InputField label="Teléfono" id="clientPhone" name="clientPhone" type="tel" value={formData.clientPhone} onChange={handleChange} required placeholder="Ej: 8888-8888" />
                            </motion.div>
                             {/* Add other fields like Marital Status dropdown if needed */}
                        </div>
                    </fieldset>

                    {/* Financial Information Section */}
                    <fieldset className="mb-6">
                        <legend className={`text-xl font-semibold ${colors.textDark} border-b ${colors.border} pb-2 mb-4 flex items-center gap-2`}><FiDollarSign /> Información Financiera (Mensual)</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <motion.div variants={fadeInUp}>
                                <InputField label="Ingreso Bruto Principal" id="clientIncomeMonthly" name="clientIncomeMonthly" type="number" value={formData.clientIncomeMonthly} onChange={handleChange} required placeholder="Monto en ₡" />
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <InputField label="Otros Ingresos (Opcional)" id="clientOtherIncomeMonthly" name="clientOtherIncomeMonthly" type="number" value={formData.clientOtherIncomeMonthly} onChange={handleChange} placeholder="Monto en ₡" />
                            </motion.div>
                             <motion.div variants={fadeInUp} className="md:col-span-2">
                                <InputField label="Pagos Mensuales Estimados de Deudas" id="clientEstimatedDebtsMonthly" name="clientEstimatedDebtsMonthly" type="number" value={formData.clientEstimatedDebtsMonthly} onChange={handleChange} required placeholder="Préstamos, tarjetas, etc." />
                            </motion.div>
                        </div>
                    </fieldset>

                     {/* Loan and Property Details Section */}
                    <fieldset className="mb-6">
                        <legend className={`text-xl font-semibold ${colors.textDark} border-b ${colors.border} pb-2 mb-4 flex items-center gap-2`}><FiHome /> Detalles del Crédito y Propiedad</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div variants={fadeInUp}>
                                <InputField label="Valor Estimado de Propiedad" id="propertyValue" name="propertyValue" type="number" value={formData.propertyValue} onChange={handleChange} required placeholder="Monto en ₡" />
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <InputField label="Monto Estimado de Prima" id="downPayment" name="downPayment" type="number" value={formData.downPayment} onChange={handleChange} required placeholder="Monto en ₡" />
                            </motion.div>
                             <motion.div variants={fadeInUp}>
                                 <label htmlFor="propertyLocationProvince" className={`block ${colors.textDark} mb-2 font-medium text-sm`}>Provincia de Propiedad</label>
                                 <select id="propertyLocationProvince" name="propertyLocationProvince" value={formData.propertyLocationProvince} onChange={handleChange} className={`w-full p-3 border ${colors.inputBorder} rounded-md focus:outline-none ${colors.inputFocusRing} ${colors.inputFocusBorder} transition duration-150 ease-in-out ${colors.surface} ${colors.textDark}`}>
                                     <option value="Cartago">Cartago</option>
                                     <option value="San José">San José</option>
                                     <option value="Alajuela">Alajuela</option>
                                     <option value="Heredia">Heredia</option>
                                     <option value="Guanacaste">Guanacaste</option>
                                     <option value="Puntarenas">Puntarenas</option>
                                     <option value="Limón">Limón</option>
                                 </select>
                             </motion.div>
                             {/* Add Loan Term / Property Type if needed */}
                        </div>
                    </fieldset>

                    {/* Document Upload Section */}
                    <fieldset className="mb-6">
                         <legend className={`text-xl font-semibold ${colors.textDark} border-b ${colors.border} pb-2 mb-4 flex items-center gap-2`}><FiUpload /> Documentos Requeridos</legend>
                         <motion.div variants={fadeInUp}>
                             <label htmlFor="documents" className={`block ${colors.textDark} mb-2 font-medium text-sm`}>Adjuntar Archivos (Cédula, Constancia Salarial, etc.)</label>
                             <input
                                type="file"
                                id="documents"
                                name="documents"
                                multiple // Allow multiple files
                                onChange={handleFileChange}
                                className={`block w-full text-sm ${colors.secondary} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:${colors.primaryBg}/10 file:${colors.primary} hover:file:${colors.primaryBg}/20`}
                            />
                            <p className={`text-xs ${colors.secondary} mt-1`}>Tipos aceptados: PDF, JPG, PNG. Tamaño máx: 5MB por archivo.</p>
                            {/* NOTE: Actual file upload requires backend integration and more complex state management */}
                         </motion.div>
                    </fieldset>

                    {/* Consent Section */}
                     <fieldset className="mb-6">
                         <motion.div variants={fadeInUp} className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="consentConfirmed"
                                name="consentConfirmed"
                                checked={formData.consentConfirmed}
                                onChange={handleChange}
                                required
                                className={`h-4 w-4 mt-1 rounded ${colors.primary} border-gray-300 focus:${colors.inputFocusRing}`}
                            />
                            <label htmlFor="consentConfirmed" className={`text-sm ${colors.textDark} font-medium`}>
                                Confirmo que cuento con la autorización del cliente para enviar esta información y solicitar la pre-aprobación en su nombre según los términos de ANACO Inversiones.<span className={colors.errorText}>*</span>
                            </label>
                         </motion.div>
                    </fieldset>

                    {/* Submission Button */}
                    <motion.div variants={fadeInUp} className="mt-8 text-center">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={isSubmitting}
                            icon={isSubmitting ? <FiLoader className="animate-spin" /> : <FiSend />}
                            className={`w-full md:w-auto ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`} // Make full width on small screens
                        >
                            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud de Pre-Aprobación'}
                        </Button>
                    </motion.div>

                </motion.form>
            </motion.div>
        </div>
    );
}

// --- PropTypes for Sub-Components (If needed and defined inline/imported) ---
// InputField.propTypes = { /* ... */ };
// Button.propTypes = { /* ... */ };
