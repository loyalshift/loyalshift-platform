// src/pages/smb/studio/SMBPageBuilder.js
import React, { useState } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import Button from "../../../components/Button"; // Adjust path

// --- Icons ---
import {
  FiPlus,
  FiTrash2,
  FiEye,
  FiAward,
  FiSave,
  FiLayers,
  FiGrid,
  FiUsers,
  FiHelpCircle,
  FiArrowRight,
} from "react-icons/fi";
import {
  FAQSection,
  FinalCTASection,
  HeroSection,
  ImageGridSection,
  ProgramSuiteSection,
  TeamSection,
} from "../../../components/SMB/SMBPageBuilderComponents";
import { useLocalization } from "../../../components/LocalizationContext";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// --- Mapping component types to actual components ---
const componentMap = {
  HeroSection,
  ImageGridSection,
  TeamSection,
  FAQSection,
  FinalCTASection,
  ProgramSuiteSection,
};

// --- Builder Components ---

// Card for selecting a new component to add
const ComponentLibraryCard = ({ t, titleKey, icon, onAdd }) => {
  const IconComponent = icon;
  return (
    <div
      className={`p-3 rounded-lg border ${theme.borderLight} ${theme.surface} flex items-center justify-between`}
    >
      <div className="flex items-center gap-3">
        <IconComponent className={`w-5 h-5 ${theme.textHighlight}`} />
        <span className={`text-sm font-medium ${theme.textPrimary}`}>
          {t(titleKey)}
        </span>
      </div>
      <button
        onClick={onAdd}
        className={`p-1.5 rounded-md ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} hover:${theme.buttonSecondaryHoverBg}`}
        aria-label={`Add ${t(titleKey)} section`}
      >
        <FiPlus className="w-4 h-4" />
      </button>
    </div>
  );
};

// An item in the reorderable list of page sections
const PageStructureItem = ({ section, onDelete }) => (
  <Reorder.Item
    value={section}
    id={section.id}
    className={`p-2 pl-1 rounded-md ${theme.surface} border ${theme.border} flex items-center justify-between cursor-grab active:cursor-grabbing`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
  >
    <div className="flex items-center gap-2">
      <span className={`text-xs font-medium ${theme.textSecondary}`}>
        {section.name}
      </span>
    </div>
    <button
      onClick={() => onDelete(section.id)}
      className={`p-1.5 rounded-md hover:bg-red-100 text-red-500 hover:text-red-700`}
      aria-label={`Delete ${section.name} section`}
    >
      <FiTrash2 className="w-3.5 h-3.5" />
    </button>
  </Reorder.Item>
);

export default function SMBPageBuilder() {
  const { t } = useLocalization();

  const [pageSections, setPageSections] = useState([
    {
      id: `hero-${Date.now()}`,
      type: "HeroSection",
      name: "Hero",
      content: {
        titleKey: "smbPageBuilderComponents.heroTitle",
        subtitleKey: "smbPageBuilderComponents.heroSubtitle",
        ctaKey: "smbPageBuilderComponents.heroCta",
      },
    },
  ]);

  const [pageTitle, setPageTitle] = useState("My New Page");

  // This library defines the components available to be added
  const componentLibrary = [
    {
      id: "HeroSection",
      name: "Hero",
      icon: FiLayers,
      content: {
        titleKey: "smbPageBuilderComponents.heroTitle",
        subtitleKey: "smbPageBuilderComponents.heroSubtitle",
        ctaKey: "smbPageBuilderComponents.heroCta",
      },
    },
    {
      id: "ImageGridSection",
      name: "Image Grid",
      icon: FiGrid,
      content: {
        titleKey: "smbPageBuilderComponents.explainedTitle",
        subtitleKey: "smbPageBuilderComponents.explainedTextP1",
        textP2Key: "smbPageBuilderComponents.explainedTextP2",
        images: [
          { src: "/images/outdoors-1.jpg", altKey: "..." },
          { src: "/images/outdoors-2.jpg", altKey: "..." },
        ],
      },
    },
    // --- NEWLY ADDED COMPONENT ---
    {
      id: "ProgramSuiteSection",
      name: "Program/Workshop Suite",
      icon: FiAward, // Using FiAward as an icon for certifications/programs
      content: {
        titleKey: "smbPageBuilderComponents.programSuiteTitle",
        subtitleKey: "smbPageBuilderComponents.programSuiteSubtitle",
        // Default program data to populate the component when added
        programs: [
          {
            id: "cert1",
            type: "certification",
            level: "fundamentals",
            titleKey: "academy.programCert1Title",
            taglineKey: "academy.programCert1Tagline",
            durationKey: "academy.programCert1Duration",
            formatKey: "academy.programCert1Format",
            resultKey: "academy.programCert1Result",
            descriptionKey: "academy.programCert1Desc",
            priceKey: "academy.programCert1Price",
          },
          {
            id: "ws1",
            type: "workshop",
            level: "fundamentals",
            titleKey: "academy.programWs1Title",
            taglineKey: "academy.programWs1Tagline",
            durationKey: "academy.programWs1Duration",
            formatKey: "academy.programWs1Format",
            resultKey: "academy.programWs1Result",
            descriptionKey: "academy.programWs1Desc",
            priceKey: "academy.programWs1Price",
          },
        ],
        permissions: { canEnroll: true },
      },
    },
    {
      id: "TeamSection",
      name: "Team",
      icon: FiUsers,
      content: {
        titleKey: "smbPageBuilderComponents.teamTitle",
        subtitleKey: "smbPageBuilderComponents.teamSubtitle",
        instructors: [
          /* instructor data */
        ],
      },
    },
    {
      id: "FAQSection",
      name: "FAQ",
      icon: FiHelpCircle,
      content: {
        titleKey: "smbPageBuilderComponents.faqTitle",
        faqs: [
          /* faq data */
        ],
      },
    },
    {
      id: "FinalCTASection",
      name: "Final CTA",
      icon: FiArrowRight,
      content: {
        titleKey: "smbPageBuilderComponents.finalCtaTitle",
        subtitleKey: "smbPageBuilderComponents.finalCtaSubtitle",
        buttonKey: "smbPageBuilderComponents.finalCtaButton",
      },
    },
  ];

  const handleAddComponent = (component) => {
    const newSection = {
      id: `${component.id}-${Date.now()}`,
      type: component.id,
      name: component.name,
      content: component.content, // Add default content
    };
    setPageSections((prev) => [...prev, newSection]);
  };

  const handleDeleteComponent = (id) => {
    setPageSections((prev) => prev.filter((section) => section.id !== id));
  };

  const handleSavePage = () => {
    console.log("Saving Page Structure:", {
      title: pageTitle,
      sections: pageSections,
    });
    // This would trigger a backend call, which eventually leads to a commit.
    // toast.success("Page saved successfully! (Simulation)"); // Assumes Toaster is imported
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme.background}`}>
      {/* <Toaster position="bottom-right" /> */}
      {/* Top Bar */}
      <header
        className={`w-full p-3 border-b ${theme.border} ${theme.surface} flex justify-between items-center sticky top-0 z-30`}
      >
        <div className="flex-1">
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            className={`text-lg font-semibold ${theme.textPrimary} bg-transparent focus:outline-none focus:ring-0 border-none p-1`}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className={`!border-2 !${theme.accentCyan} !${theme.accentCyan} hover:!bg-cyan-500/10`}
          >
            <FiEye className="mr-2" /> Preview
          </Button>
          <Button
            onClick={handleSavePage}
            size="sm"
            className={`${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg}`}
          >
            <FiSave className="mr-2" /> Save & Publish
          </Button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
        {/* Left Panel: Editor */}
        <aside className="lg:col-span-3 h-full sticky top-20">
          <div
            className={`p-4 rounded-xl ${theme.surfaceMuted} border ${theme.borderLight} h-full`}
          >
            <h2 className={`text-xl font-bold ${theme.textPrimary} mb-4`}>
              Page Builder
            </h2>

            {/* Component Library */}
            <div className="mb-6">
              <h3
                className={`text-sm font-semibold ${theme.textSecondary} mb-3`}
              >
                Add a Section
              </h3>
              <div className="space-y-2">
                {componentLibrary.map((comp) => (
                  <ComponentLibraryCard
                    key={comp.id}
                    t={t}
                    titleKey={comp.name} // Using name directly as key for simplicity
                    icon={comp.icon}
                    onAdd={() => handleAddComponent(comp)}
                  />
                ))}
              </div>
            </div>

            {/* Page Structure */}
            <div>
              <h3
                className={`text-sm font-semibold ${theme.textSecondary} mb-3`}
              >
                Page Structure
              </h3>
              <Reorder.Group
                axis="y"
                values={pageSections}
                onReorder={setPageSections}
                className="space-y-2"
              >
                <AnimatePresence>
                  {pageSections.map((section) => (
                    <PageStructureItem
                      key={section.id}
                      section={section}
                      onDelete={handleDeleteComponent}
                    />
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </div>
          </div>
        </aside>

        {/* Right Panel: Live Preview */}
        <main className="lg:col-span-9">
          <div
            className={`${theme.surface} rounded-xl border ${theme.border} p-2 shadow-inner`}
          >
            <div className="w-full h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
              {pageSections.map((section) => {
                const Component = componentMap[section.type];
                if (!Component)
                  return (
                    <div key={section.id} className="text-red-500 p-4">
                      Error: Component "{section.type}" not found.
                    </div>
                  );

                // The ProgramSuiteSection expects props 'programs' and 'permissions'
                // Other components expect a generic 'content' prop. We handle this here.
                const propsToPass =
                  section.type === "ProgramSuiteSection"
                    ? {
                        programs: section.content.programs,
                        permissions: section.content.permissions,
                        t: t,
                      }
                    : { content: section.content, t: t, onCtaClick: () => {} };

                return <Component key={section.id} {...propsToPass} />;
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
