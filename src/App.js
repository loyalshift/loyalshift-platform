import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Security from "./pages/Security";
import LandingPage from "./pages/LandingPage/LandingPage";
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

// Wrap your app with ThemeProvider

// ANACO
import LayoutAnaco from "./components/Anaco/AnacoLayout";
import AnacoDemoPage from "./pages/Anaco/AnacoDemoPage";
import RequestPreApprovalPage from "./pages/Anaco/RequestPreApproval";
import ProposalConsentGate from "./components/HeroConsentGate";
import ProposalAnacoDetailsPage from "./pages/Anaco/ProposalAnacoDetailsPage";
import AnacoCaseStudy from "./pages/Anaco/CaseStudies/Anaco";
import AnacoLandingPage from "./pages/Anaco/AnacoLandingPage";
import AnacoCtaPage from "./pages/Anaco/AnacoCtaPage";
import PrivacyPolicyPage from "./pages/Anaco/AnacoPrivacy";
import AboutUsPage from "./pages/Anaco/AboutUs";
import AnacoContactPage from "./pages/Anaco/Contact";
import AnacoCalculatorPage from "./pages/Anaco/Calculator";
import AnacoNotFound from "./pages/Anaco/NotFound";
import RegisterPage from "./pages/Anaco/Register";
import LoginPage from "./pages/Anaco/Login";
import AgentDashboard from "./pages/Anaco/AgentDashboard";
import Marketplace from "./pages/Anaco/Marketplace";
import PreApprovalProcessPage from "./pages/Anaco/PreApprovalProcess";
import TerraPlanPage from "./pages/Anaco/TerraPlan";
import PropertyDetailPage from "./pages/Anaco/PropertyDetailPage";
import AdvancedToolsIntegration from "./pages/Anaco/AdvancedToolsIntegrations";
import MortgageServicesPage from "./pages/Anaco/Services/MortgageServices";
import OverseasPartnersPage from "./pages/OverseasPartners";

function App() {
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
          <Route path="overseas-partner" element={<OverseasPartnersPage />} />
          <Route path="contact-sales" element={<ContactSales />} />
          <Route path="request-demo" element={<RequestDemoPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="case-studies/qcells" element={<QCellsUseCase />} />
          <Route path="case-studies/anaco" element={<AnacoCaseStudy />} />
          <Route path="demo/anaco" element={<AnacoDemoPage />} />
          <Route path="demo/anaco/cta" element={<AnacoCtaPage />} />
          <Route path="demo/anaco/consent" element={<ProposalConsentGate />} />
          <Route
            path="demo/anaco/details"
            element={<ProposalAnacoDetailsPage />}
          />
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

        <Route path="anaco" element={<LayoutAnaco />}>
          <Route index element={<AnacoLandingPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route
            path="request-pre-approval"
            element={<RequestPreApprovalPage />}
          />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="contact" element={<AnacoContactPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="calculator" element={<AnacoCalculatorPage />} />
          <Route path="terraplan" element={<TerraPlanPage />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="property/:propertyId" element={<PropertyDetailPage />} />
          <Route path="service/mortgage" element={<MortgageServicesPage />} />
          <Route
            path="pre-approval-process"
            element={<PreApprovalProcessPage />}
          />
          <Route
            path="advanced-tools-integration"
            element={<AdvancedToolsIntegration />}
          />
          <Route path="dashboard" element={<AgentDashboard />} />
          <Route path="*" element={<AnacoNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
