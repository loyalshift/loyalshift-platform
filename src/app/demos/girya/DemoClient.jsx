"use client";

import { useState, useRef } from "react";

const DEMO_BASE_URL =
  process.env.NEXT_PUBLIC_GIRYA_DEMO_URL || "https://www.giryams.com";

const DEMO_PAGES = [
  { label: "Inicio", path: "/", icon: "home" },
  { label: "Equipamiento", path: "/equipment", icon: "store" },
  { label: "Checkout", path: "/checkout", icon: "payment" },
  { label: "Tarifas", path: "/enroll", icon: "pricing" },
  { label: "Coaches", path: "/coaches", icon: "people" },
  { label: "Contacto", path: "/contact", icon: "contact" },
];

const PAYMENT_STEPS = [
  {
    step: 1,
    title: "Explorar equipamiento",
    description: "Ir a Equipamiento, seleccionar un peso del dropdown y hacer clic en \"Agregar al carrito\".",
    navigateTo: "/equipment",
  },
  {
    step: 2,
    title: "Revisar el carrito",
    description: "El carrito se abre automaticamente. Revisar artículos y hacer clic en \"Proceder al pago\".",
    navigateTo: null,
  },
  {
    step: 3,
    title: "Completar datos y pagar",
    description: "Llenar nombre, email y telefono. Usar tarjeta de prueba: 4242 4242 4242 4242, CVV: 123, Exp: 12/26.",
    navigateTo: "/checkout",
  },
  {
    step: 4,
    title: "Confirmación",
    description: "Tras el pago exitoso se muestra la pantalla de confirmación con el ID de transaccion.",
    navigateTo: null,
  },
];

const TECH_STACK = [
  "Next.js 14",
  "React 18",
  "Tailwind CSS",
  "ONVO Pay",
  "SendGrid",
  "Node.js API Routes",
];

const FEATURES = [
  { title: "Pagos en linea", desc: "ONVO Pay con tarjeta de credito/debito, soporte USD y CRC" },
  { title: "Carrito de compras", desc: "Persistencia en localStorage, variantes de producto, drawer animado" },
  { title: "Email de confirmación", desc: "SendGrid con template HTML branded al completar el pago" },
  { title: "SEO Server-Side", desc: "HTML pre-renderizado, meta tags unicos por ruta, JSON-LD schemas" },
  { title: "Sitemap dinamico", desc: "Auto-generado desde las rutas + perfiles de coaches" },
  { title: "Bilingue", desc: "Soporte completo en espanol e ingles con cambio en tiempo real" },
];

export default function GiryaDemoClient() {
  const iframeRef = useRef(null);
  const [showGuide, setShowGuide] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const navigateIframe = (path) => {
    if (iframeRef.current) {
      iframeRef.current.src = `${DEMO_BASE_URL}${path}`;
    }
  };

  const handleStepClick = (step) => {
    setActiveStep(step.step - 1);
    if (step.navigateTo) {
      navigateIframe(step.navigateTo);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-2.5 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              &larr; LoyalShift
            </a>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-white">
                Girya — Demo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                showGuide
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {showGuide ? "Ocultar guia" : "Mostrar guia"}
            </button>
            <a
              href={DEMO_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors hidden sm:inline"
            >
              Abrir en nueva ventana &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Side Panel */}
        {showGuide && (
          <div className="w-[340px] flex-shrink-0 bg-slate-900 border-r border-slate-800 overflow-y-auto">
            <div className="p-5">
              {/* Project Info */}
              <div className="mb-6">
                <h2 className="text-white font-bold text-lg mb-1">
                  Girya — Mindful Strength
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Plataforma web con e-commerce para academia de kettlebells en
                  Cartago, Costa Rica.
                </p>
              </div>

              {/* Quick Nav */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Navegación rapida
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {DEMO_PAGES.map((page) => (
                    <button
                      key={page.path}
                      onClick={() => navigateIframe(page.path)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-md transition-colors"
                    >
                      {page.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Demo Guide */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-emerald-500/20 rounded flex items-center justify-center">
                    <span className="text-emerald-400 text-xs">$</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    Demo de pagos
                  </h3>
                </div>

                <div className="space-y-2">
                  {PAYMENT_STEPS.map((step) => (
                    <button
                      key={step.step}
                      onClick={() => handleStepClick(step)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        activeStep === step.step - 1
                          ? "bg-blue-600/10 border-blue-500/40 ring-1 ring-blue-500/20"
                          : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            activeStep === step.step - 1
                              ? "bg-blue-500 text-white"
                              : "bg-slate-700 text-slate-400"
                          }`}
                        >
                          {step.step}
                        </span>
                        <div>
                          <p
                            className={`text-xs font-medium ${
                              activeStep === step.step - 1
                                ? "text-blue-300"
                                : "text-slate-300"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Test Card Info */}
                <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-[11px] font-semibold text-amber-300 mb-1">
                    Tarjeta de prueba
                  </p>
                  <div className="space-y-0.5 text-[11px] text-amber-200/70 font-mono">
                    <p>4242 4242 4242 4242</p>
                    <p>Exp: 12/26 &nbsp; CVV: 123</p>
                    <p>Nombre: cualquiera</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Features implementados
                </h3>
                <div className="space-y-2">
                  {FEATURES.map((f) => (
                    <div key={f.title} className="text-xs">
                      <p className="text-slate-300 font-medium">{f.title}</p>
                      <p className="text-slate-500">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Stack tecnologico
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {TECH_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Iframe */}
        <div className="flex-1 bg-white">
          <iframe
            ref={iframeRef}
            src={DEMO_BASE_URL}
            title="Girya Demo"
            className="w-full h-full border-0"
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
}
