import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Security from "./pages/Security";
import LandingPage from "./pages/LandingPage/LandingPage";
import AboutUs from "./pages/AboutUs";
import Solutions from "./pages/Solutions";
import EnergyVppCaseStudy from "./pages/CaseStudies/EnergyVppCaseStudy";
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

// FINANCIAL
import LayoutFinancial from "./components/Financial/Layout";
import DemoPage from "./pages/Financial/DemoPage";
import RequestPreApprovalPage from "./pages/Financial/RequestPreApproval";
import ProposalConsentGate from "./components/HeroConsentGate";
import ProposalFinancialDetailsPage from "./pages/Financial/ProposalFinancialDetailsPage";
import FinancialLandingPage from "./pages/Financial/LandingPage";
import FinancialCtaPage from "./pages/Financial/CtaPage";
import PrivacyPolicyPage from "./pages/Financial/Privacy";
import AboutUsPage from "./pages/Financial/AboutUs";
import FinancialContactPage from "./pages/Financial/Contact";
import FinancialCalculatorPage from "./pages/Financial/Calculator";
import FinancialNotFound from "./pages/Financial/NotFound";
import RegisterPage from "./pages/Financial/Register";
import LoginPage from "./pages/Financial/Login";
import AgentDashboard from "./pages/Financial/AgentDashboard";
import Marketplace from "./pages/Financial/Marketplace";
import PreApprovalProcessPage from "./pages/Financial/PreApprovalProcess";
import TerraPlanPage from "./pages/Financial/TerraPlan";
import PropertyDetailPage from "./pages/Financial/PropertyDetailPage";
import AdvancedToolsIntegration from "./pages/Financial/AdvancedToolsIntegrations";
import MortgageServicesPage from "./pages/Financial/Services/MortgageServices";
import OverseasPartnersPage from "./pages/OverseasPartners";
import JobApplicationPage from "./pages/JobApplication";
import JobApplicationStatusPage from "./pages/JobApplicationStatus";
import BrandAssetsPage from "./pages/BrandAssetsPage";
import DashBoardLayout from "./components/Financial/Dashboard/DashboardLayout";

// Girya
import GiryaLandingPage from "./pages/Girya/LandingPage";
import GiryaLayout from "./components/Girya/Layout";
import GiryaDemoIntroPage from "./pages/Girya/DemoIntroPage";
import GiryaConsentPage from "./pages/Girya/ConsentPage";
import ProposalGiryaDetailsPage from "./pages/Girya/DetailsPage";
import GiryaEnrollmentPage from "./pages/Girya/EnrollmentPage";
import GiryaCoachesPage from "./pages/Girya/CoachesPage";
import GiryaProgramsAndEquipmentPage from "./pages/Girya/ProgramsAndEquipmentPage";
import GiryaNotFound from "./pages/Girya/NotFound";
import GiryaAboutUsPage from "./pages/Girya/AboutUs";
import ViewCoachPage from "./pages/Girya/ViewCoachPage";
import GiryaFranchisePage from "./pages/Girya/FranchisePage";
import GiryaContactPage from "./pages/Girya/Contact";
import GiryaDemoCTA from "./pages/Girya/DemoCta";

import AFCDemoIntroPage from "./pages/AFC/AFCIntroPage";
import AFCConsentPage from "./pages/AFC/AFCConsentPage";
import ProposalAfcDetailsPage from "./pages/AFC/AFCDetails";
import AFCLayout from "./components/AFC/AFCLayout";
import AFCLandingPage from "./pages/AFC/AFCLandingPage";
import AfcCtaPage from "./pages/AFC/AFCCTAPage";
import AFCFranchisePage from "./pages/AFC/AFCFranchisePage";
import AFCAboutUsPage from "./pages/AFC/AFCAboutUsPage";
import AFCContactPage from "./pages/AFC/AFCContactPage";
import AFCEnrollmentPage from "./pages/AFC/AFCEnrollmentPage";
import AFCCommunityPage from "./pages/AFC/AFCCommunityPage";
import AFCTestimonialsPage from "./pages/AFC/AFCTestimonialsPage";
import AFCSchedulePage from "./pages/AFC/AFCSchedulePage";
import AfcNotFound from "./pages/AFC/AFCNotFoundPage";

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
          <Route path="brand" element={<BrandAssetsPage />} />
          <Route path="overseas-partner" element={<OverseasPartnersPage />} />
          <Route path="contact-sales" element={<ContactSales />} />
          <Route path="request-demo" element={<RequestDemoPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route
            path="case-studies/vpp-strategy"
            element={<EnergyVppCaseStudy />}
          />
          <Route path="demo/afc" element={<AFCDemoIntroPage />} />
          <Route path="demo/afc/consent" element={<AFCConsentPage />} />
          <Route path="demo/afc/details" element={<ProposalAfcDetailsPage />} />
          <Route path="demo/afc/cta" element={<AfcCtaPage />} />
          <Route path="demo/girya" element={<GiryaDemoIntroPage />} />
          <Route path="demo/girya/consent" element={<GiryaConsentPage />} />
          <Route
            path="demo/girya/details"
            element={<ProposalGiryaDetailsPage />}
          />
          <Route path="demo/girya/cta" element={<GiryaDemoCTA />} />

          <Route path="demo/anaco" element={<DemoPage />} />
          <Route path="demo/anaco/cta" element={<FinancialCtaPage />} />
          <Route path="demo/anaco/consent" element={<ProposalConsentGate />} />
          <Route
            path="demo/anaco/details"
            element={<ProposalFinancialDetailsPage />}
          />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route
            path="jobs/:jobId/applications"
            element={<JobApplicationPage />}
          />
          <Route
            path="job-application/:jobApplicationId/status"
            element={<JobApplicationStatusPage />}
          />
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

        <Route path="anaco" element={<LayoutFinancial />}>
          <Route index element={<FinancialLandingPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route
            path="request-pre-approval"
            element={<RequestPreApprovalPage />}
          />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="contact" element={<FinancialContactPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="calculator" element={<FinancialCalculatorPage />} />
          <Route path="terraplan" element={<TerraPlanPage />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="property/:propertyId" element={<PropertyDetailPage />} />
          <Route path="services/mortgage" element={<MortgageServicesPage />} />
          <Route
            path="pre-approval-process"
            element={<PreApprovalProcessPage />}
          />
          <Route
            path="advanced-tools-integration"
            element={<AdvancedToolsIntegration />}
          />
          <Route path="*" element={<FinancialNotFound />} />
        </Route>

        <Route path="girya" element={<GiryaLayout />}>
          <Route index element={<GiryaLandingPage />} />
          <Route path="about-us" element={<GiryaAboutUsPage />} />
          <Route path="enroll" element={<GiryaEnrollmentPage />} />
          <Route path="franchise" element={<GiryaFranchisePage />} />
          <Route path="coaches" element={<GiryaCoachesPage />} />
          <Route path="coaches/:coachId" element={<ViewCoachPage />} />
          <Route path="programs" element={<GiryaProgramsAndEquipmentPage />} />
          <Route path="contact" element={<GiryaContactPage />} />

          <Route path="*" element={<GiryaNotFound />} />
        </Route>
        <Route path="afc" element={<AFCLayout />}>
          <Route index element={<AFCLandingPage />} />
          <Route path="about-us" element={<AFCAboutUsPage />} />
          <Route path="enroll" element={<AFCEnrollmentPage />} />
          <Route path="franchise" element={<AFCFranchisePage />} />
          <Route path="community" element={<AFCCommunityPage />} />
          <Route path="testimonials" element={<AFCTestimonialsPage />} />
          <Route path="schedule" element={<AFCSchedulePage />} />
          {/* <Route path="coaches" element={<GiryaCoachesPage />} /> */}
          {/* <Route path="coaches/:coachId" element={<ViewCoachPage />} /> */}
          {/* <Route path="programs" element={<GiryaProgramsAndEquipmentPage />} /> */}
          <Route path="contact" element={<AFCContactPage />} />

          <Route path="*" element={<AfcNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
