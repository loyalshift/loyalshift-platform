import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./components/Providers";
import DynamicMetadata from "./components/DynamicMetadata";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://loyalshift.com"),
  title: "LoyalShift | Optimizaci\u00f3n de Procesos y Desarrollo Web",
  description: "Ayudamos a empresas a optimizar procesos, automatizar flujos de trabajo y construir aplicaciones web, landing pages y soluciones e-commerce de alto rendimiento.",
  keywords: "optimizaci\u00f3n de procesos, desarrollo web, automatizaci\u00f3n, consultor\u00eda empresarial, landing pages, e-commerce, paneles administrativos",
  openGraph: {
    type: "website",
    url: "https://loyalshift.com/",
    title: "LoyalShift | Optimizaci\u00f3n de Procesos y Desarrollo Web",
    description: "Ayudamos a empresas a optimizar procesos, automatizar flujos de trabajo y construir soluciones web de alto rendimiento.",
    images: [{ url: "/logo.svg", width: 150, height: 30 }],
  },
  twitter: {
    card: "summary",
    title: "LoyalShift | Optimizaci\u00f3n de Procesos y Desarrollo Web",
    description: "Ayudamos a empresas a optimizar procesos, automatizar flujos de trabajo y construir soluciones web de alto rendimiento.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/icons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/icons/site.webmanifest" />
      </head>
      <body className="bg-slate-900 text-slate-100 antialiased">
        <Providers>
          <DynamicMetadata />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
