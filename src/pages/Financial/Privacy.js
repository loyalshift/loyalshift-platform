// src/pages/PrivacyPolicyPage.js
import React, { useState } from "react";
import {
  FiShield,
  FiLock,
  FiUser,
  FiDatabase,
  FiMail,
  FiGlobe,
  FiHelpCircle,
} from "react-icons/fi";

const PrivacyPolicyPage = () => {
  // Color definitions
  const colors = {
    white: "bg-white text-gray-800",
    primaryGreen: "bg-[#2E8B57] text-white",
    accentGreen: "bg-[#3CB371] text-white",
    border: "border-[#2E8B57]",
    textPrimary: "text-[#2E8B57]",
    textAccent: "text-[#3CB371]",
    lightGreenBg: "bg-[#2E8B57]/10",
  };

  // Language state and toggle
  const [language, setLanguage] = useState("es");
  const toggleLanguage = () =>
    setLanguage((lang) => (lang === "en" ? "es" : "en"));

  // Translations
  const translations = {
    en: {
      title: "ANACO Conecta Privacy Center",
      lastUpdated: "Last Updated: April 30, 2025",
      effective: "Effective immediately",
      sections: {
        introduction: {
          title: "Privacy Policy for ANACO Conecta Agent Hub",
          content:
            "This policy describes how we collect, use, and protect your information in compliance with Costa Rican financial regulations.",
        },
        collection: {
          title: "Information We Collect",
          types: {
            personal: {
              title: "Personal Information",
              items: [
                "Full name and identification",
                "Contact details",
                "Professional information",
              ],
            },
            financial: {
              title: "ANACO Data",
              items: [
                "Income verification",
                "Credit history",
                "Property documents",
              ],
            },
            technical: {
              title: "Technical Data",
              items: ["IP addresses", "Device information", "Usage analytics"],
            },
          },
        },
        usage: {
          title: "How We Use Your Information",
          purposes: {
            required: {
              title: "Required Processing",
              items: [
                "Mortgage application processing",
                "Identity verification",
                "Regulatory compliance",
              ],
            },
            improvements: {
              title: "Service Improvements",
              items: [
                "Platform optimization",
                "Feature development",
                "Customer support",
              ],
            },
          },
        },
        security: {
          title: "Our Security Measures",
          measures: {
            technical: {
              title: "Technical Protections",
              items: [
                "End-to-end encryption",
                "Multi-factor authentication",
                "Regular security audits",
              ],
            },
            organizational: {
              title: "Organizational Protections",
              items: [
                "Strict access controls",
                "Employee training",
                "Data protection officer",
              ],
            },
          },
        },
        rights: {
          title: "Your Privacy Rights",
          rights: [
            { letter: "A", name: "Access", desc: "Request your data" },
            { letter: "C", name: "Correction", desc: "Update inaccurate data" },
            { letter: "D", name: "Deletion", desc: "Request data removal" },
            { letter: "O", name: "Objection", desc: "Limit processing" },
          ],
          contact:
            "To exercise these rights, contact our Data Protection Officer:",
        },
        updates: {
          title: "Policy Updates",
          content:
            "We may update this policy periodically. We'll notify you of significant changes through:",
          methods: [
            "Email notifications to registered users",
            "Platform announcements",
            "Updated revision date on this page",
          ],
        },
      },
      footer: {
        company: "ANACO Inversiones S.A.",
        regulated: "Regulated by SUGEF Costa Rica",
        links: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
        copyright: "© 2025 ANACO Conecta. All rights reserved.",
      },
    },
    es: {
      title: "Centro de Privacidad ANACO Conecta",
      lastUpdated: "Última actualización: 30 de abril, 2025",
      effective: "Efectivo inmediatamente",
      sections: {
        introduction: {
          title: "Política de Privacidad del Hub de Agentes ANACO Conecta",
          content:
            "Esta política describe cómo recopilamos, usamos y protegemos su información en cumplimiento con las regulaciones financieras de Costa Rica.",
        },
        collection: {
          title: "Información que Recopilamos",
          types: {
            personal: {
              title: "Información Personal",
              items: [
                "Nombre completo e identificación",
                "Datos de contacto",
                "Información profesional",
              ],
            },
            financial: {
              title: "Datos Financieros",
              items: [
                "Verificación de ingresos",
                "Historial crediticio",
                "Documentos de propiedad",
              ],
            },
            technical: {
              title: "Datos Técnicos",
              items: [
                "Direcciones IP",
                "Información del dispositivo",
                "Analíticas de uso",
              ],
            },
          },
        },
        usage: {
          title: "Cómo Usamos Su Información",
          purposes: {
            required: {
              title: "Procesamiento Requerido",
              items: [
                "Procesamiento de solicitudes hipotecarias",
                "Verificación de identidad",
                "Cumplimiento regulatorio",
              ],
            },
            improvements: {
              title: "Mejoras al Servicio",
              items: [
                "Optimización de plataforma",
                "Desarrollo de funciones",
                "Soporte al cliente",
              ],
            },
          },
        },
        security: {
          title: "Nuestras Medidas de Seguridad",
          measures: {
            technical: {
              title: "Protecciones Técnicas",
              items: [
                "Encriptación de extremo a extremo",
                "Autenticación multifactor",
                "Auditorías de seguridad periódicas",
              ],
            },
            organizational: {
              title: "Protecciones Organizacionales",
              items: [
                "Controles estrictos de acceso",
                "Capacitación de empleados",
                "Oficial de protección de datos",
              ],
            },
          },
        },
        rights: {
          title: "Sus Derechos de Privacidad",
          rights: [
            { letter: "A", name: "Acceso", desc: "Solicitar sus datos" },
            {
              letter: "C",
              name: "Corrección",
              desc: "Actualizar datos inexactos",
            },
            {
              letter: "D",
              name: "Eliminación",
              desc: "Solicitar eliminación de datos",
            },
            {
              letter: "O",
              name: "Oposición",
              desc: "Limitar el procesamiento",
            },
          ],
          contact:
            "Para ejercer estos derechos, contacte a nuestro Oficial de Protección de Datos:",
        },
        updates: {
          title: "Actualizaciones de la Política",
          content:
            "Podemos actualizar esta política periódicamente. Le notificaremos sobre cambios importantes mediante:",
          methods: [
            "Notificaciones por correo a usuarios registrados",
            "Anuncios en la plataforma",
            "Fecha de revisión actualizada en esta página",
          ],
        },
      },
      footer: {
        company: "ANACO Inversiones S.A.",
        regulated: "Regulado por SUGEF Costa Rica",
        links: [
          "Términos de Servicio",
          "Política de Privacidad",
          "Política de Cookies",
        ],
        copyright: "© 2025 ANACO Conecta. Todos los derechos reservados.",
      },
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Introduction */}
        <section
          className={`mb-12 p-8 rounded-lg ${colors.lightGreenBg} border ${colors.border}`}
        >
          <div className="flex items-start gap-4">
            <FiHelpCircle className={`w-6 h-6 mt-1 ${colors.textPrimary}`} />
            <div>
              <h2 className="text-2xl font-bold mb-2 ${colors.textPrimary}">
                {t.sections.introduction.title}
              </h2>
              <p className="text-lg mb-2">
                {t.lastUpdated} | {t.effective}
              </p>
              <p className="text-gray-700">{t.sections.introduction.content}</p>
            </div>
          </div>
        </section>

        {/* Data Collection */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-full ${colors.accentGreen}`}>
              <FiUser className="w-6 h-6" />
            </div>
            <h2 className={`text-2xl font-bold ${colors.textPrimary}`}>
              {t.sections.collection.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(t.sections.collection.types).map((type, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border ${colors.border} ${colors.white}`}
              >
                <h3 className={`font-bold text-lg mb-3 ${colors.textPrimary}`}>
                  {type.title}
                </h3>
                <ul className="space-y-2">
                  {type.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`${colors.textAccent}`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Data Usage */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-full ${colors.primaryGreen}`}>
              <FiDatabase className="w-6 h-6" />
            </div>
            <h2 className={`text-2xl font-bold ${colors.textPrimary}`}>
              {t.sections.usage.title}
            </h2>
          </div>

          <div
            className={`p-8 rounded-lg ${colors.lightGreenBg} border ${colors.border}`}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {Object.values(t.sections.usage.purposes).map(
                (purpose, index) => (
                  <div key={index}>
                    <h3
                      className={`font-bold text-lg mb-3 ${colors.textPrimary}`}
                    >
                      {purpose.title}
                    </h3>
                    <ul className="space-y-3">
                      {purpose.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className={`${colors.textAccent} font-bold`}>
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Data Protection */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-full ${colors.accentGreen}`}>
              <FiLock className="w-6 h-6" />
            </div>
            <h2 className={`text-2xl font-bold ${colors.textPrimary}`}>
              {t.sections.security.title}
            </h2>
          </div>

          <div
            className={`p-8 rounded-lg ${colors.white} border ${colors.border} shadow-sm`}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {Object.values(t.sections.security.measures).map(
                (measure, index) => (
                  <div key={index}>
                    <h3
                      className={`font-bold text-lg mb-3 ${colors.textPrimary}`}
                    >
                      {measure.title}
                    </h3>
                    <ul className="space-y-3">
                      {measure.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span
                            className={`w-5 h-5 rounded-full ${colors.accentGreen} flex items-center justify-center text-white text-xs`}
                          >
                            {i + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-full ${colors.primaryGreen}`}>
              <FiMail className="w-6 h-6" />
            </div>
            <h2 className={`text-2xl font-bold ${colors.textPrimary}`}>
              {t.sections.rights.title}
            </h2>
          </div>

          <div
            className={`p-8 rounded-lg ${colors.lightGreenBg} border ${colors.border}`}
          >
            <div className="grid md:grid-cols-4 gap-4 text-center">
              {t.sections.rights.rights.map((right, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-md ${colors.white} border ${colors.border}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${colors.primaryGreen} flex items-center justify-center mx-auto mb-3`}
                  >
                    <span className="text-white font-bold">{right.letter}</span>
                  </div>
                  <h3 className={`font-bold ${colors.textPrimary}`}>
                    {right.name}
                  </h3>
                  <p className="text-sm mt-1">{right.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="mb-4">{t.sections.rights.contact}</p>
              <a
                href="mailto:privacy@financial.cr"
                className={`inline-block px-6 py-3 rounded-md ${colors.accentGreen} hover:bg-[#2E8B57] transition text-white font-medium`}
              >
                privacy@financial.cr
              </a>
            </div>
          </div>
        </section>

        {/* Policy Updates */}
        <section className="mb-12">
          <div
            className={`p-6 rounded-lg ${colors.white} border ${colors.border} shadow-sm`}
          >
            <h2 className={`text-xl font-bold mb-4 ${colors.textPrimary}`}>
              {t.sections.updates.title}
            </h2>
            <p className="mb-4">{t.sections.updates.content}</p>
            <ul className="space-y-2">
              {t.sections.updates.methods.map((method, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`${colors.textAccent}`}>•</span>
                  <span>{method}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
