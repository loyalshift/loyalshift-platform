// FILE: src/layouts/smb/studio/SMBStudioLayout.js
// This is the main layout file for all /smb/studio/* routes.
// It conditionally renders the desktop sidebar and the new mobile navigation.
import React from "react";
import { Outlet } from "react-router-dom";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";
import SMBStudioSideNavComponent from "./SMBStudioSideNavComponent";
import MobileStudioNav from "./MobileStudioNav";

const theme = loyalShiftV2Theme;

export default function SMBStudioLayout() {
  // This layout component is designed to be rendered by the <Outlet /> inside your main site layout.
  // It provides the specific structure for the "Studio" section of your application.

  return (
    // Wrap the entire studio section with the LocalizationProvider.
    // Now, the sidebar and any page rendered in the <Outlet /> can use the useLocalization() hook.

    <div className={`relative flex min-h-screen ${theme.background}`}>
      {/* Desktop Sidebar: Visible on medium screens and up */}
      <SMBStudioSideNavComponent />

      {/* Main Content Area: 
          Has a left margin ONLY on medium screens and up (md:ml-64) to make space for the desktop sidebar.
          On mobile, it takes up the full width.
        */}
      <main className="flex-1 md:ml-64">
        <Outlet />
        {/* Child routes like SMBStudioDashboard, SMBStudioBlogPostEditorPage, etc.
            will be rendered here via the Outlet. They will also have access to the localization context.
          */}
      </main>

      {/* Mobile Floating Nav: Renders a floating button, visible ONLY on small screens */}
      <MobileStudioNav />
    </div>
  );
}
