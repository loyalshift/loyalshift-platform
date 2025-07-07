import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "./components/LocalizationContext";
import "./index.css";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Security from "./pages/Security";
import LandingPage from "./pages/LandingPage/LandingPage";
import AboutUs from "./pages/AboutUs";
import Solutions from "./pages/Solutions";
import EnergyVppCaseStudy from "./pages/CaseStudies/EnergyVppCaseStudy";
import CaseStudiesPage from "./pages/CaseStudies";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import ScrollToTop from "./components/ScrollToTop";
import Careers from "./pages/Careers";
import JobDetailPage from "./pages/JobDetail";
import OverseasPartnersPage from "./pages/OverseasPartners";
import JobApplicationPage from "./pages/JobApplication";
import JobApplicationStatusPage from "./pages/JobApplicationStatus";
import BrandAssetsPage from "./pages/BrandAssetsPage";

import SMBLayout from "./components/SMB/SMBLayout";
import SMBAboutUsPage from "./pages/SMB/SMBAboutUsPage";
import SMBLandingPage from "./pages/SMB/SMBLandingPage";
import SMBPlatformFeaturesPage from "./pages/SMB/SMBPlatformFeaturesPage";
import AssetLibraryComponent from "./components/SMB/Studio/AssetLibraryComponent";
import SMBStudioDashboard from "./pages/SMB/Studio/LoyalShiftSMBStudioDashboard";
import SMBSolutionsPage from "./pages/SMB/SMBSolutionsPage";
import SMBFeaturesPage from "./pages/SMB/SMBFeaturesPage";
import SMBPricingPage from "./pages/SMB/Pricing/SMBPricingPage";
import SMBStudioAnalyticsPage from "./pages/SMB/Studio/SMBStudioAnalyticsPage";
import SMBStudioLayout from "./components/SMB/Studio/SMBLayout";
import SupportPage from "./pages/SupportPage";
import SMBResourcesPage from "./pages/SMB/SMBResourcesPage";
import SMBStudioSettingsPage from "./components/SMB/Studio/SMBStudioSettingsPage";
import SMBOllamaSetupGuidePage from "./pages/SMB/SMBOllamaSetupGuidePage";
import SMBContextIsKingBlogPage from "./pages/SMB/SMBContextIsKingBlog";
import DigitalPresence101Page from "./pages/DigitalPresence101Page";
import SEOBasicsPage from "./pages/SMB/SMBSEOBasicsPage";
import FAQPage from "./pages/FAQPage";
import AutonomousOperationsEngineCaseStudy from "./pages/CaseStudies/AutonomousOperationsEngineCaseStudy";
import SMBDeployGuidePage from "./pages/SMB/SMBDeployGuide";

import SMBPageBuilder from "./pages/SMB/Studio/BuilderPage";

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
      }}
    >
      <LocalizationProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />

            <Route path="contact" element={<Contact />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="brand" element={<BrandAssetsPage />} />
            <Route path="faq" element={<FAQPage />} />

            <Route path="overseas-partner" element={<OverseasPartnersPage />} />

            <Route path="case-studies" element={<CaseStudiesPage />} />
            <Route
              path="case-studies/vpp-strategy"
              element={<EnergyVppCaseStudy />}
            />
            <Route
              path="case-studies/autonomous-operations-engine"
              element={<AutonomousOperationsEngineCaseStudy />}
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
            <Route path="pricing" element={<Pricing />} />

            <Route path="support" element={<SupportPage />} />
            <Route path="security" element={<Security />} />

            {/* Catch-all 404 Route - MUST BE LAST */}
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="smb/studio" element={<SMBStudioLayout hasSideNav />}>
            <Route index element={<SMBStudioDashboard />} />

            <Route path="features" element={<SMBFeaturesPage />} />

            <Route path="builder" element={<SMBPageBuilder />} />

            <Route path="assets" element={<AssetLibraryComponent />} />

            <Route path="analytics" element={<SMBStudioAnalyticsPage />} />

            <Route path="settings" element={<SMBStudioSettingsPage />} />
          </Route>

          <Route path="smb" element={<SMBLayout />}>
            <Route index element={<SMBLandingPage />} />
            <Route
              path="platform-features"
              element={<SMBPlatformFeaturesPage />}
            />
            <Route
              path="resources/guide/ollama-setup"
              element={<SMBOllamaSetupGuidePage />}
            />
            <Route
              path="resources/blog/context-is-king"
              element={<SMBContextIsKingBlogPage />}
            />
            <Route
              path="resources/guide/digital-presence-101"
              element={<DigitalPresence101Page />}
            />
            <Route
              path="resources/guide/seo-basics"
              element={<SEOBasicsPage />}
            />
            <Route
              path="resources/guide/deploy-ui"
              element={<SMBDeployGuidePage />}
            />

            <Route path="solutions" element={<SMBSolutionsPage />} />
            <Route path="features" element={<SMBFeaturesPage />} />
            <Route path="resources" element={<SMBResourcesPage />} />
            <Route path="pricing" element={<SMBPricingPage />} />

            <Route path="about-us" element={<SMBAboutUsPage />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </Router>
  );
}

export default App;
