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
import RequestDemoPage from "./pages/RequestDemo";
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
import SMBStudioPostModuleInfoPage from "./pages/SMB/Studio/Blog/SMBStudioPostModuleInfoPage";
import SMBStudioBlogModuleInfoPage from "./pages/SMB/Studio/Blog/SMBStudioBlogModuleInfoPage";
import AssetLibraryComponent from "./components/SMB/Studio/AssetLibraryComponent";
import SMBStudioDashboard from "./pages/SMB/Studio/LoyalShiftSMBStudioDashboard";
import NewBlogPostComponent from "./components/SMB/Studio/SMBStudioBlogPostEditorPage";
import SMBSolutionsPage from "./pages/SMB/SMBSolutionsPage";
import SMBFeaturesPage from "./pages/SMB/SMBFeaturesPage";
import SMBPricingPage from "./pages/SMB/Pricing/SMBPricingPage";
import SMBStudioAnalyticsPage from "./pages/SMB/Studio/SMBStudioAnalyticsPage";
import SMBStudioLayout from "./components/SMB/Studio/SMBLayout";
import BIMLibraryPage from "./pages/Solutions/BimLibrary";
import SupportPage from "./pages/SupportPage";
import SMBResourcesPage from "./pages/SMB/SMBResourcesPage";
import SMBStudioSettingsPage from "./components/SMB/Studio/SMBStudioSettingsPage";
import SMBStudioContentCalendarPage from "./pages/SMB/Studio/SMBStudioContentCalendarPage";
import SMBOllamaSetupGuidePage from "./pages/SMB/SMBOllamaSetupGuidePage";
import SMBContextIsKingBlogPage from "./pages/SMB/SMBContextIsKingBlog";
import DigitalPresence101Page from "./pages/DigitalPresence101Page";
import SEOBasicsPage from "./pages/SMB/SMBSEOBasicsPage";
import FAQPage from "./pages/FAQPage";
import SMBCommunityPage from "./pages/SMB/SMBCommunityPage";
import AutonomousOperationsEngineCaseStudy from "./pages/CaseStudies/AutonomousOperationsEngineCaseStudy";
import SMBBIMDashboard from "./pages/SMB/SMBBIMDashboard";
import SMBBIMObjectLibraryPage from "./pages/SMB/SMBBIMObjectLibraryPage";
import BIMLayout from "./components/SMB/BIM/BIMLayout";
import SMBDeployGuidePage from "./pages/SMB/SMBDeployGuide";
import SMBDeployGuideContaboPage from "./pages/SMB/SMBDeployGuideContaboPage";

function App() {
  return (
    <LocalizationProvider>
      <Router
        future={{
          v7_startTransition: true,
        }}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />

            <Route path="bim/library" element={<BIMLibraryPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="brand" element={<BrandAssetsPage />} />
            <Route path="faq" element={<FAQPage />} />

            <Route path="overseas-partner" element={<OverseasPartnersPage />} />

            <Route path="request-demo" element={<RequestDemoPage />} />
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
            <Route path="security" element={<Security />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="pricing" element={<Pricing />} />

            {/* Catch-all 404 Route - MUST BE LAST */}
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="smb/studio" element={<SMBStudioLayout hasSideNav />}>
            <Route index element={<SMBStudioDashboard />} />
            <Route path="blog" element={<SMBStudioBlogModuleInfoPage />} />
            <Route path="features" element={<SMBFeaturesPage />} />
            <Route path="community" element={<SMBCommunityPage />} />
            <Route path="blog/new" element={<NewBlogPostComponent />} />
            <Route
              path="content-calendar"
              element={<SMBStudioContentCalendarPage />}
            />

            <Route path="blog/post" element={<SMBStudioPostModuleInfoPage />} />
            <Route path="assets" element={<AssetLibraryComponent />} />
            <Route path="analytics" element={<SMBStudioAnalyticsPage />} />
            <Route path="settings" element={<SMBStudioSettingsPage />} />
          </Route>

          <Route path="smb/bim" element={<BIMLayout />}>
            <Route index element={<SMBBIMDashboard />} />
            <Route
              path="object-library"
              element={<SMBBIMObjectLibraryPage />}
            />
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
            <Route
              path="resources/guide/deploy-contabo"
              element={<SMBDeployGuideContaboPage />}
            />
            <Route path="solutions" element={<SMBSolutionsPage />} />
            <Route path="features" element={<SMBFeaturesPage />} />
            <Route path="resources" element={<SMBResourcesPage />} />
            <Route path="pricing" element={<SMBPricingPage />} />

            <Route path="about-us" element={<SMBAboutUsPage />} />
          </Route>
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
