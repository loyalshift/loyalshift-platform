import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Security from "./pages/Security";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import Solutions from "./pages/Solutions";
import QCellsUseCase from "./pages/CaseStudies/QCells";
import DemoAppPage from "./pages/Demo";
import CaseStudiesPage from "./pages/CaseStudies";
import NotFound from "./pages/NotFound";
import RequestDemoPage from "./pages/RequestDemo";
import Pricing from "./pages/Pricing";
import ScrollToTop from "./components/ScrollToTop";
import Careers from "./pages/Careers";
import ContactSales from "./pages/ContactSales";
import JobDetailPage from "./pages/JobDetail";
import PersonalizedDemoPage from "./pages/PersonalizedDemo";
import MarketingEffortPage from "./pages/MarketingEffort";

export default function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
      }}
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="demo" element={<DemoAppPage />} />
          <Route path="contact-sales" element={<ContactSales />} />
          <Route path="request-demo" element={<RequestDemoPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="case-studies/qcells" element={<QCellsUseCase />} />
          <Route path="/apply/:jobId" element={<JobDetailPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="careers" element={<Careers />} />
          <Route path="security" element={<Security />} />
          <Route path="pricing" element={<Pricing />} />
          <Route
            path="/personalized-demo/:leadId"
            element={<PersonalizedDemoPage />}
          />

          {/* Catch-all 404 Route - MUST BE LAST */}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="/marketing-effort/:marketingEffortId"
          element={<MarketingEffortPage />}
        />
      </Routes>
    </Router>
  );
}
