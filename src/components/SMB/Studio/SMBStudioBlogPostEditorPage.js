// src/pages/smb/studio/blog/SMBStudioBlogPostEditorPage.js
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Icons ---
import {
  FiUploadCloud as IconUpload,
  FiEdit3 as IconPencilAlt,
  FiShare2 as IconPublish,
  FiChevronDown,
  FiCpu,
  FiFilm,
  FiSearch,
  FiCopy,
  FiCheck,
  FiLoader,
  FiGrid, // For Asset Library
  FiHardDrive, // For Google Drive
} from "react-icons/fi";
import { useLocalization } from "../../LocalizationContext";
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";
import IconSettings from "../../IconSettings";
// --- End of Icons ---

// Using theme directly
const theme = loyalShiftV2Theme;

// Reusable Form Section Component
const FormSection = ({
  titleKey,
  defaultTitle,
  children,
  icon,
  initiallyOpen = true,
  onToggle,
  isOpen,
}) => {
  const { t } = useLocalization();
  const [internalIsOpen, setInternalIsOpen] = useState(initiallyOpen);
  const currentIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const handleToggle = onToggle || (() => setInternalIsOpen(!internalIsOpen));

  return (
    <div
      className={`${theme.surface} dark:bg-slate-800 rounded-xl shadow-lg border ${theme.borderLight} dark:border-slate-700`}
    >
      <button
        type="button"
        className={`w-full flex items-center justify-between p-4 sm:p-5 text-left ${theme.textPrimary} dark:text-white focus:outline-none ${theme.focusRingDefault} rounded-t-xl`}
        onClick={handleToggle}
        aria-expanded={currentIsOpen}
      >
        <h2 className="text-lg font-semibold flex items-center">
          {icon &&
            React.cloneElement(icon, {
              className: `w-5 h-5 mr-3 ${theme.textHighlight} dark:text-cyan-400`,
            })}
          {t(titleKey, defaultTitle)}
        </h2>
        <FiChevronDown
          className={`w-5 h-5 transform transition-transform duration-200 ${
            currentIsOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {currentIsOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: "0px" },
              collapsed: { opacity: 0, height: 0, marginTop: "0px" },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div
              className={`p-4 sm:p-5 border-t ${theme.borderLight} dark:border-slate-700 space-y-4`}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// InputField, TextareaField, SelectField
const InputField = ({
  label,
  id,
  t,
  tKeyLabel,
  type = "text",
  value,
  onChange,
  placeholder,
  tKeyPlaceholder,
  required = false,
  helpTextKey,
  helpTextDefault,
}) => (
  <div>
    <label
      htmlFor={id}
      className={`block text-sm font-medium ${theme.textSecondary} dark:text-slate-300 mb-1`}
    >
      {t(tKeyLabel, label)}
      {required && <span className={`${theme.errorText}`}>*</span>}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={t(tKeyPlaceholder, placeholder)}
      required={required}
      className={`w-full px-3 py-2.5 ${theme.inputBg} dark:bg-slate-700 ${theme.inputBorder} dark:border-slate-600 rounded-md shadow-sm ${theme.inputFocusStyle} ${theme.textPrimary} dark:text-slate-100 sm:text-sm transition-colors`}
    />
    {(helpTextKey || helpTextDefault) && (
      <p className={`text-xs ${theme.textMuted} dark:text-slate-400 mt-1`}>
        {t(helpTextKey, helpTextDefault)}
      </p>
    )}
  </div>
);
const TextareaField = ({
  label,
  id,
  t,
  tKeyLabel,
  value,
  onChange,
  placeholder,
  tKeyPlaceholder,
  rows = 3,
  helpTextKey,
  helpTextDefault,
}) => (
  <div>
    <label
      htmlFor={id}
      className={`block text-sm font-medium ${theme.textSecondary} dark:text-slate-300 mb-1`}
    >
      {t(tKeyLabel, label)}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={t(tKeyPlaceholder, placeholder)}
      rows={rows}
      className={`w-full px-3 py-2.5 ${theme.inputBg} dark:bg-slate-700 ${theme.inputBorder} dark:border-slate-600 rounded-md shadow-sm ${theme.inputFocusStyle} ${theme.textPrimary} dark:text-slate-100 sm:text-sm transition-colors min-h-[100px]`}
    />
    {(helpTextKey || helpTextDefault) && (
      <p className={`text-xs ${theme.textMuted} dark:text-slate-400 mt-1`}>
        {t(helpTextKey, helpTextDefault)}
      </p>
    )}
  </div>
);
const SelectField = ({
  label,
  id,
  t,
  tKeyLabel,
  value,
  onChange,
  children,
}) => (
  <div>
    <label
      htmlFor={id}
      className={`block text-sm font-medium ${theme.textSecondary} dark:text-slate-300 mb-1`}
    >
      {" "}
      {t(tKeyLabel, label)}{" "}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full pl-3 pr-10 py-2.5 text-base ${theme.inputBorder} dark:border-slate-600 ${theme.inputFocusStyle} rounded-md ${theme.inputBg} dark:bg-slate-700 ${theme.textPrimary} dark:text-slate-100 sm:text-sm transition-colors duration-150`}
    >
      {" "}
      {children}{" "}
    </select>
  </div>
);

// --- GeminiGenerator Component (User Provided, with FiCpu) ---
const formatPreviewContent = (content = "") => {
  const truncated =
    content.length > 300 ? content.substring(0, 300) + "..." : content;
  return truncated.replace(/\n/g, "<br />");
};

const GeminiGenerator = ({
  t,
  theme,
  initialPrompt,
  isGenerating,
  generatedContent,
  onGenerate,
  onUseTitle,
  onUseExcerpt,
  onUseContent,
}) => {
  const buttonBaseClasses = `transition-all duration-300 flex items-center justify-center px-4 py-2.5 rounded-lg font-medium text-sm`;
  const generateButtonSpecificClasses = `${theme.accentCyanBg} ${theme.buttonTextDark} dark:${theme.buttonTextLight}`;

  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || !initialPrompt?.trim()}
        className={`${buttonBaseClasses} ${generateButtonSpecificClasses} w-full ${
          isGenerating || !initialPrompt?.trim()
            ? "opacity-60 cursor-not-allowed"
            : `${theme.accentCyanBgHover} hover:scale-[1.02] hover:shadow-lg`
        }`}
        aria-label={t("blogNew.aiGenerateBlogButton")}
      >
        {isGenerating ? (
          <>
            <FiLoader className="w-4 h-4 mr-2 animate-spin" />
            {t("blogNew.generatingText")}
          </>
        ) : (
          <>
            <FiCpu className="w-4 h-4 mr-2" />
            {t("blogNew.aiGenerateBlogButton")}
          </>
        )}
      </button>

      {generatedContent &&
        (generatedContent.title ||
          generatedContent.content ||
          generatedContent.excerpt) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-4 border ${theme.borderLight} dark:border-slate-700 rounded-xl overflow-hidden ${theme.surfaceCard} dark:bg-slate-700/30`}
          >
            <div
              className={`p-3 sm:p-4 border-b ${theme.borderLight} dark:border-slate-600`}
            >
              <h3
                className={`font-semibold ${theme.textPrimary} dark:text-white flex items-center text-sm`}
              >
                <FiCpu
                  className={`w-4 h-4 mr-2 ${theme.accentCyan} dark:text-cyan-400`}
                />
                {t("blogNew.aiGeneratedContentTitle")}
              </h3>
            </div>
            <div className="p-3 sm:p-4 space-y-3 max-h-96 overflow-y-auto">
              {generatedContent.title && (
                <div
                  className={`p-2 rounded-md ${theme.surfaceMuted} dark:bg-slate-700/50`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p
                        className={`text-xs font-medium ${theme.textMuted} dark:text-slate-400 mb-0.5`}
                      >
                        {t("blogNew.suggestedTitle", "Suggested Title: ")}
                      </p>
                      <p
                        className={`${theme.textPrimary} dark:text-slate-100 font-medium text-sm`}
                      >
                        {generatedContent.title}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onUseTitle}
                      className={`ml-2 px-2.5 py-1 text-xs rounded-md border ${theme.borderLight} dark:border-slate-600 ${theme.surface} dark:bg-slate-600 hover:${theme.accentCyanBg}/20 dark:hover:bg-cyan-500/20 ${theme.buttonSecondaryText} dark:text-slate-200 transition-colors flex-shrink-0`}
                      aria-label={t("blogNew.useTitle")}
                    >
                      {t("blogNew.useButton", "Use")}
                    </button>
                  </div>
                </div>
              )}

              {generatedContent && generatedContent.excerpt && (
                <div
                  className={`p-2 rounded-md ${theme.surfaceMuted} dark:bg-slate-700/50`}
                >
                  <p
                    className={`text-xs font-medium ${theme.textMuted} dark:text-slate-400 mb-0.5`}
                  >
                    {t("blogNew.suggestedExcerpt", "Suggested Excerpt:")}
                  </p>
                  <div className="flex justify-between items-start">
                    <p
                      className={`${theme.textSecondary} dark:text-slate-300 text-xs leading-relaxed`}
                    >
                      {generatedContent.excerpt.substring(0, 120)}...
                      {/* Shows first 120 characters */}
                    </p>
                    <button
                      type="button"
                      onClick={onUseExcerpt}
                      className={`ml-2 px-2.5 py-1 text-xs rounded-md border ${theme.borderLight} dark:border-slate-600 ${theme.surface} dark:bg-slate-600 hover:${theme.accentCyanBg}/20 dark:hover:bg-cyan-500/20 ${theme.buttonSecondaryText} dark:text-slate-200 transition-colors flex-shrink-0`}
                      aria-label={t("blogNew.useExcerpt", "Use this excerpt")}
                    >
                      {t("blogNew.useButton", "Use")}
                    </button>
                  </div>
                </div>
              )}
            </div>
            {generatedContent.content && (
              <div
                className={`p-3 sm:p-4 border-t ${theme.borderLight} dark:border-slate-600 flex flex-col sm:flex-row justify-end gap-2`}
              >
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(generatedContent.content)
                  }
                  className={`flex items-center text-xs px-3 py-1.5 rounded-md border ${theme.borderLight} dark:border-slate-600 ${theme.surface} dark:bg-slate-600 hover:${theme.surfaceMuted} dark:hover:bg-slate-500 ${theme.buttonSecondaryText} dark:text-slate-200 transition-colors`}
                  aria-label={t("blogNew.copyContent")}
                >
                  <FiCopy className="w-3.5 h-3.5 mr-1.5" />{" "}
                  {t("blogNew.copyButton", "Copy")}
                </button>
                <button
                  type="button"
                  onClick={onUseContent}
                  className={`px-3 py-1.5 text-xs rounded-md font-medium ${theme.accentCyanBg} ${theme.buttonTextDark} dark:${theme.buttonTextLight} hover:${theme.accentCyanBgHover} transition-opacity`}
                >
                  {t("blogNew.useAllContentButton", "Use All Content")}
                </button>
              </div>
            )}
          </motion.div>
        )}
    </div>
  );
};
// --- END of GeminiGenerator ---

// --- AiButton for other AI actions ---
const AiButton = ({ t, tKeyText, defaultText, onClick, isBusy, icon }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isBusy}
    className={`w-full flex items-center justify-center px-3 py-2 text-sm font-medium ${
      theme.buttonSecondaryText
    } dark:text-slate-200 ${
      isBusy
        ? `bg-slate-200 dark:bg-slate-500 cursor-not-allowed`
        : `${theme.buttonSecondaryBg} dark:bg-slate-600 ${theme.buttonSecondaryHoverBg} dark:hover:bg-slate-500`
    } rounded-md shadow-sm border ${
      theme.inputBorder
    } dark:border-slate-500 transition-colors duration-150`}
  >
    {icon || (
      <FiCpu
        className={`w-4 h-4 mr-2 ${theme.textHighlight} dark:text-cyan-400`}
      />
    )}
    {isBusy
      ? t("blogNew.aiGenerating", "Generating...")
      : t(tKeyText, defaultText)}
  </button>
);

export default function SMBStudioBlogPostEditorPage() {
  const { t } = useLocalization();
  // --- States ---
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null); // { id, url, alt, source, fileObject? }
  const [featuredImagePreview, setFeaturedImagePreview] = useState("");
  const [categories, setCategories] = useState("");
  const [tags, setTags] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallySet, setSlugManuallySet] = useState(false);
  const [metaTitleManuallySet, setMetaTitleManuallySet] = useState(false);
  const [publishStatus, setPublishStatus] = useState("draft");
  const [scheduledAt, setScheduledAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [initialPrompt, setInitialPrompt] = useState("");
  const [isGeminiGenerating, setIsGeminiGenerating] = useState(false);
  const [geminiDraft, setGeminiDraft] = useState({
    title: "",
    content: "",
    excerpt: "",
  });
  const [veoPrompt, setVeoPrompt] = useState("");
  const [isVeoGenerating, setIsVeoGenerating] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState([]);
  const [isSeoSuggesting, setIsSeoSuggesting] = useState(false);
  const [seoSuggestions, setSeoSuggestions] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });
  const [activeAssetTab, setActiveAssetTab] = useState("upload"); // 'upload', 'veo', 'library', 'drive'

  // --- Handlers ---
  const generateSlug = useCallback(
    (postTitle) =>
      postTitle
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-"),
    []
  );
  const handleTitleChange = useCallback(
    (e) => {
      const newTitle = e.target.value;
      setTitle(newTitle);
      if (!slugManuallySet) setSlug(generateSlug(newTitle));
      if (!metaTitleManuallySet) setMetaTitle(newTitle);
      if (!initialPrompt.trim() && newTitle.trim())
        setInitialPrompt(
          t(
            "blogNew.aiPromptDefaultFromTitle",
            `Draft a blog post about: ${newTitle}`
          )
        );
      if (!veoPrompt.trim() && newTitle.trim())
        setVeoPrompt(
          t(
            "blogNew.aiVeoPromptDefaultFromTitle",
            `Create visuals for a blog post titled: ${newTitle}`
          )
        );
    },
    [
      slugManuallySet,
      metaTitleManuallySet,
      initialPrompt,
      veoPrompt,
      t,
      generateSlug,
    ]
  );

  const handleGenerateBlogWithGemini = useCallback(async () => {
    const promptToUse = initialPrompt.trim();
    if (!promptToUse) {
      setErrorMessage(t("blogNew.error.promptRequired"));
      return;
    }
    setIsGeminiGenerating(true);
    setErrorMessage("");
    setGeminiDraft({ title: "", content: "", excerpt: "" });
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setGeminiDraft({
      title: t(
        "blogNew.ai.mockTitle",
        `AI Draft: Exploring ${promptToUse.substring(0, 30)}...`
      ),
      content: t(
        "blogNew.ai.mockContent",
        `This is an AI-generated draft for "${promptToUse}".\n\nIt includes several paragraphs and key insights. Review and edit, then click "Use Content".`
      ),
      excerpt: t("blogNew.ai.mockExcerpt", `AI summary for "${promptToUse}".`),
    });
    setIsGeminiGenerating(false);
  }, [initialPrompt, t]);

  const handleUseGeminiTitle = useCallback(() => {
    /* ... updates title, metaTitle, slug ... */
  }, [geminiDraft, metaTitleManuallySet, slugManuallySet, generateSlug]);
  const handleUseGeminiExcerpt = useCallback(() => {
    /* ... updates excerpt ... */
  }, [geminiDraft]);
  const handleUseGeminiContent = useCallback(() => {
    /* ... updates title, excerpt, content ... */
  }, [geminiDraft, handleUseGeminiTitle, handleUseGeminiExcerpt]);

  const handleGenerateWithVeo = useCallback(async () => {
    /* ... as before ... */
  }, [veoPrompt, t]);
  const handleSuggestSeo = useCallback(async () => {
    /* ... as before ... */
  }, [title, content, excerpt, tags, t]);

  const handleManualImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const newAsset = {
        id: `upload-${Date.now()}`,
        type: "image",
        source: "upload",
        url: URL.createObjectURL(file),
        alt: file.name,
        fileObject: file,
      };
      setGeneratedAssets((prev) => [
        newAsset,
        ...prev.filter((a) => a.id !== newAsset.id),
      ]);
      // Do not auto-set as featured; let user choose from gallery.
    }
  }, []);

  const setAsFeatured = useCallback((asset) => {
    setFeaturedImage(asset);
    setFeaturedImagePreview(asset.url);
  }, []);

  const handleSubmit = useCallback(
    async (event, desiredAction) => {
      /* ... (as previously defined) ... */
    },
    [
      title,
      content,
      excerpt,
      featuredImage,
      categories,
      tags,
      publishStatus,
      scheduledAt,
      metaTitle,
      metaDescription,
      slug,
      isEditing,
      t,
    ]
  );

  const buttonBaseClasses = `inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none ${theme.inputFocusRing} disabled:opacity-60 disabled:cursor-not-allowed transition-colors`;
  const pageTitleText = isEditing
    ? t("blogNew.titleEdit")
    : t("blogNew.titleCreate");

  const assetTabs = [
    { nameKey: "blogNew.aiVeoGenerationTab", id: "veo", icon: <FiFilm /> },
    { nameKey: "blogNew.aiAssetUploadTab", id: "upload", icon: <IconUpload /> },
    { nameKey: "blogNew.aiAssetLibraryTab", id: "library", icon: <FiGrid /> },
    { nameKey: "blogNew.aiAssetDriveTab", id: "drive", icon: <FiHardDrive /> },
  ];

  return (
    <div
      className={`p-4 sm:p-6 lg:p-8 ${theme.background} dark:bg-slate-900 min-h-screen`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div /* ... (Top Title and Action Buttons Bar) ... */>
          <h1
            className={`text-2xl sm:text-3xl font-semibold ${theme.textPrimary} dark:text-white`}
          >
            {pageTitleText}
          </h1>
          {/* ... Action buttons ... */}
        </motion.div>

        {submitMessage && (
          <motion.div /* ... (Submit Message) ... */>
            {submitMessage}
          </motion.div>
        )}
        {errorMessage && (
          <motion.div /* ... (Error Message) ... */>{errorMessage}</motion.div>
        )}

        <form
          id="blogPostForm"
          onSubmit={(e) => handleSubmit(e, publishStatus)}
          className="space-y-8 mt-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Column 1 (Sidebar-like: AI Studio, Publishing Details) */}
            <div className="lg:col-span-1 space-y-6 order-first lg:order-last">
              {" "}
              {/* Order for mobile vs desktop */}
              <FormSection
                titleKey="blogNew.aiStudioTitle"
                defaultTitle="AI Content & Asset Studio"
                icon={<FiCpu />}
                initiallyOpen={true}
              >
                {/* Prompt Engineering Input */}
                <div
                  className={`p-3 border ${theme.borderLight} dark:border-slate-700 rounded-md ${theme.surfaceMuted} dark:bg-slate-800/50`}
                >
                  <TextareaField
                    t={t}
                    label="Your Core Idea / Prompt"
                    tKeyLabel="blogNew.aiPromptLabel"
                    id="ai-initial-prompt"
                    value={initialPrompt}
                    onChange={(e) => setInitialPrompt(e.target.value)}
                    rows={3}
                    tKeyPlaceholder="blogNew.aiPromptPlaceholder"
                    helpTextKey="blogNew.aiPromptHelp"
                    helpTextDefault="Enter your main topic or idea for AI generation."
                  />
                </div>
                {/* Gemini Generator Component */}
                <GeminiGenerator
                  t={t}
                  theme={theme}
                  initialPrompt={initialPrompt}
                  isGenerating={isGeminiGenerating}
                  generatedContent={geminiDraft}
                  onGenerate={handleGenerateBlogWithGemini}
                  onUseTitle={handleUseGeminiTitle}
                  onUseExcerpt={handleUseGeminiExcerpt}
                  onUseContent={handleUseGeminiContent}
                />

                {/* Enhanced Asset Studio Section with Tabs */}
                <div
                  className={`mt-4 pt-4 border-t ${theme.borderLight} dark:border-slate-700`}
                >
                  <h3
                    className={`text-md font-semibold ${theme.textPrimary} dark:text-white mb-3`}
                  >
                    {t("blogNew.assetSectionTitle", "Manage Assets")}
                  </h3>

                  {/* Refined Tab Bar for Asset Sources */}
                  <div
                    className={`mb-4 flex flex-wrap gap-x-1 gap-y-2 border-b ${theme.borderLight} dark:border-slate-700`}
                  >
                    {/* Added flex-wrap and gap */}
                    {assetTabs.map((tab) => (
                      <button
                        type="button"
                        key={tab.id}
                        onClick={() => setActiveAssetTab(tab.id)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs sm:px-3 sm:text-sm font-medium -mb-px whitespace-nowrap rounded-t-md ${
                          /* Added rounded-t-md */
                          activeAssetTab === tab.id
                            ? `${theme.accentCyan} dark:text-cyan-400 border-b-2 ${theme.inputFocusBorder} dark:border-cyan-500 ${theme.surfaceMuted} dark:bg-slate-700/50` // Active tab has slight bg tint
                            : `${theme.textMuted} dark:text-slate-400 hover:${theme.textSecondary} dark:hover:text-slate-200 border-b-2 border-transparent hover:${theme.borderLight} dark:hover:border-slate-600`
                        }`}
                        aria-pressed={activeAssetTab === tab.id}
                      >
                        {React.cloneElement(tab.icon, {
                          className: "w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0",
                        })}
                        {/* Added flex-shrink-0 */}
                        {t(tab.nameKey)}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content Area */}
                  <div className="pt-2 min-h-[150px]">
                    {activeAssetTab === "veo" && (
                      <div className="space-y-2">
                        <InputField
                          t={t}
                          label="Visual Prompt for Veo"
                          tKeyLabel="blogNew.aiVeoPromptLabel"
                          id="veo-prompt"
                          value={veoPrompt}
                          onChange={(e) => setVeoPrompt(e.target.value)}
                          tKeyPlaceholder="blogNew.aiVeoPromptPlaceholder"
                        />
                        <button
                          type="button"
                          onClick={handleGenerateWithVeo}
                          disabled={isVeoGenerating || !veoPrompt.trim()}
                          className={`w-full flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md shadow-sm transition-colors ${
                            isVeoGenerating || !veoPrompt.trim()
                              ? "bg-slate-200 dark:bg-slate-500 text-slate-400 dark:text-slate-400 cursor-not-allowed"
                              : `${theme.buttonSecondaryBg} dark:bg-slate-600 ${theme.buttonSecondaryText} dark:text-slate-100 ${theme.buttonSecondaryHoverBg} dark:hover:bg-slate-500 border ${theme.inputBorder} dark:border-slate-500`
                          }`}
                        >
                          <FiFilm className="w-4 h-4 mr-1.5" />{" "}
                          {isVeoGenerating
                            ? t("blogNew.generatingText")
                            : t("blogNew.aiGenerateAssetsButton")}
                        </button>
                      </div>
                    )}
                    {activeAssetTab === "upload" && (
                      <div>
                        <label
                          htmlFor="manual-image-upload"
                          className={`block text-sm font-medium ${theme.textSecondary} dark:text-slate-300 mb-1`}
                        >
                          {t(
                            "blogNew.field.featuredImage.uploadNewLabel",
                            "Upload New Asset"
                          )}
                        </label>
                        <input
                          type="file"
                          id="manual-image-upload"
                          onChange={handleManualImageUpload}
                          accept="image/*"
                          className={`block w-full text-sm ${theme.textMuted} dark:text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold ${theme.buttonSecondaryBg} dark:file:bg-slate-600 ${theme.buttonSecondaryText} dark:file:text-slate-200 hover:${theme.buttonSecondaryHoverBg} dark:hover:file:bg-slate-500`}
                        />
                      </div>
                    )}
                    {activeAssetTab === "library" && (
                      <div
                        className={`text-center p-4 border ${theme.borderLight} dark:border-slate-600 rounded-md ${theme.surfaceMuted} dark:bg-slate-700/50`}
                      >
                        <FiGrid
                          className={`w-10 h-10 ${theme.textMuted} dark:text-slate-500 mx-auto mb-2`}
                        />
                        <p
                          className={`text-sm ${theme.textSecondary} dark:text-slate-400`}
                        >
                          {t(
                            "blogNew.libraryPlaceholderText",
                            "Asset library integration coming soon."
                          )}
                        </p>
                        <button
                          type="button"
                          disabled
                          className={`mt-2 text-xs ${theme.buttonSecondaryBg} opacity-50 cursor-not-allowed px-3 py-1.5 rounded-md`}
                        >
                          {t("blogNew.browseLibraryButton", "Browse Library")}
                        </button>
                      </div>
                    )}
                    {activeAssetTab === "drive" && (
                      <div
                        className={`text-center p-4 border ${theme.borderLight} dark:border-slate-600 rounded-md ${theme.surfaceMuted} dark:bg-slate-700/50`}
                      >
                        <FiHardDrive
                          className={`w-10 h-10 ${theme.textMuted} dark:text-slate-500 mx-auto mb-2`}
                        />
                        <p
                          className={`text-sm ${theme.textSecondary} dark:text-slate-400`}
                        >
                          {t(
                            "blogNew.drivePlaceholderText",
                            "Google Drive integration coming soon."
                          )}
                        </p>
                        <button
                          type="button"
                          disabled
                          className={`mt-2 text-xs ${theme.buttonSecondaryBg} opacity-50 cursor-not-allowed px-3 py-1.5 rounded-md`}
                        >
                          {t("blogNew.connectDriveButton", "Connect Drive")}
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Unified Asset Gallery Display */}
                  {generatedAssets.length > 0 && (
                    <div
                      className={`mt-4 pt-3 border-t ${theme.borderLight} dark:border-slate-700`}
                    >
                      <h4
                        className={`font-semibold ${theme.textPrimary} dark:text-white mb-2 text-sm`}
                      >
                        {t("blogNew.aiGeneratedAssetsTitle")}
                      </h4>
                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                        {generatedAssets.map((asset) => (
                          <div
                            key={asset.id}
                            className="relative group aspect-square cursor-pointer rounded-md overflow-hidden"
                            onClick={() => setAsFeatured(asset)}
                          >
                            <img
                              src={asset.url}
                              alt={asset.alt}
                              className={`w-full h-full object-cover border ${
                                theme.borderLight
                              } dark:border-slate-600 ${
                                featuredImage?.id === asset.id
                                  ? `ring-2 ${theme.inputFocusBorder} ring-offset-1 dark:ring-offset-slate-800`
                                  : ""
                              }`}
                            />
                            <div
                              className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 p-1`}
                            >
                              <FiCheck
                                className={`w-6 h-6 text-white ${
                                  featuredImage?.id === asset.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                } group-hover:opacity-100 transition-opacity`}
                              />
                            </div>
                            <span
                              className={`absolute bottom-0 left-0 right-0 px-1 py-0.5 text-[9px] text-white bg-black/70 truncate`}
                            >
                              {asset.source
                                ? t(
                                    `blogNew.assetSource${
                                      asset.source.charAt(0).toUpperCase() +
                                      asset.source.slice(1)
                                    }`,
                                    asset.source
                                  )
                                : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {generatedAssets.length === 0 &&
                    !["library", "drive"].includes(activeAssetTab) && (
                      <p
                        className={`text-xs ${theme.textMuted} dark:text-slate-400 mt-3 text-center`}
                      >
                        {t("blogNew.noAssetsSelected")}
                      </p>
                    )}
                </div>
              </FormSection>
              <FormSection
                titleKey="blogNew.section.publishSettings.title"
                defaultTitle="Publish Settings"
                icon={<IconPublish />}
                initiallyOpen={true}
              >
                {/* ... Publishing fields (Status, Schedule, Featured Image display from state) ... */}
                <SelectField
                  label="Status"
                  tKeyLabel="blogNew.field.status.label"
                  id="post-status-final"
                  value={publishStatus}
                  onChange={(e) => setPublishStatus(e.target.value)}
                  t={t}
                >
                  <option value="draft">
                    {t("blogNew.statusValue.draft")}
                  </option>
                  <option value="publish">
                    {t("blogNew.statusValue.publish")}
                  </option>
                  <option value="schedule">
                    {t("blogNew.statusValue.schedule")}
                  </option>
                </SelectField>
                {publishStatus === "schedule" && (
                  <InputField
                    t={t}
                    type="datetime-local"
                    label="Schedule Date & Time"
                    tKeyLabel="blogNew.field.scheduleTime.label"
                    id="schedule-time-final"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                  />
                )}
                <div>
                  <label
                    className={`block text-sm font-medium ${theme.textSecondary} dark:text-slate-300 mb-1`}
                  >
                    {t(
                      "blogNew.field.featuredImage.selectedLabel",
                      "Current Featured Image:"
                    )}
                  </label>
                  {featuredImagePreview ? (
                    <div className="mt-1 relative">
                      <img
                        src={featuredImagePreview}
                        alt={t("blogNew.field.featuredImage.altPreview")}
                        className={`rounded-md max-h-40 w-full object-cover border ${theme.inputBorder} dark:border-slate-600`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFeaturedImage(null);
                          setFeaturedImagePreview("");
                        }}
                        className={`absolute top-1 right-1 text-xs ${theme.errorText} bg-white/80 dark:bg-slate-900/80 p-0.5 rounded-full hover:underline focus:outline-none focus:ring-1 focus:ring-red-500`}
                        aria-label={t(
                          "blogNew.field.featuredImage.removeButtonAria",
                          "Remove featured image"
                        )}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <p
                      className={`text-xs ${theme.textMuted} dark:text-slate-400 py-2`}
                    >
                      {t(
                        "blogNew.field.featuredImage.selectFromStudio",
                        "Select from Studio"
                      )}
                    </p>
                  )}
                </div>
              </FormSection>
            </div>

            {/* Column 2 (Main Editor + SEO/Details) */}
            <div className="lg:col-span-2 space-y-6 order-last lg:order-first">
              <FormSection
                titleKey="blogNew.section.mainContent.title"
                defaultTitle="Compose Your Post"
                icon={<IconPencilAlt />}
                initiallyOpen={true}
              >
                <InputField
                  t={t}
                  label="Post Title"
                  tKeyLabel="blogNew.field.title.label"
                  id="post-title-final"
                  value={title}
                  onChange={handleTitleChange}
                  tKeyPlaceholder="blogNew.field.title.placeholder"
                  required
                />
                <div>
                  <label
                    htmlFor="post-content-final"
                    className={`block text-sm font-medium ${theme.textSecondary} dark:text-slate-300 mb-1`}
                  >
                    {t("blogNew.field.content.label")}
                  </label>
                  <textarea
                    id="post-content-final"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={25}
                    placeholder={t("blogNew.field.content.placeholder")}
                    className={`w-full px-3 py-2.5 ${theme.inputBg} dark:bg-slate-700 ${theme.inputBorder} dark:border-slate-600 rounded-md shadow-sm ${theme.inputFocusStyle} ${theme.textPrimary} dark:text-slate-100 sm:text-sm min-h-[500px]`} // Increased min-height
                  />
                  <p className={`text-xs ${theme.textMuted} mt-1`}>
                    {t("blogNew.field.content.editorNote")}
                  </p>
                </div>
              </FormSection>

              <FormSection
                titleKey="blogNew.section.seo.title"
                defaultTitle="SEO & Post Details"
                icon={<IconSettings />}
                initiallyOpen={true}
              >
                {" "}
                {/* Defaulting to open */}
                <TextareaField
                  t={t}
                  label="Excerpt"
                  tKeyLabel="blogNew.field.excerpt.label"
                  id="post-excerpt-final"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  tKeyPlaceholder="blogNew.field.excerpt.placeholder"
                  rows={4}
                />
                <hr
                  className={`my-4 ${theme.borderLight} dark:border-slate-700`}
                />
                <div className="space-y-3">
                  <AiButton
                    t={t}
                    defaultText="Analyze & Suggest SEO"
                    tKeyText="blogNew.aiAnalyzeContentButton"
                    onClick={handleSuggestSeo}
                    isBusy={isSeoSuggesting}
                    icon={
                      <FiSearch
                        className={`w-4 h-4 mr-1.5 ${theme.textHighlight} dark:text-cyan-400`}
                      />
                    }
                  />
                  {seoSuggestions.metaTitle && (
                    <div
                      className={`mt-3 p-3 border ${theme.border} dark:border-slate-600 rounded-md ${theme.surfaceMuted} dark:bg-slate-700/50 text-xs ${theme.textSecondary} dark:text-slate-300 space-y-1`}
                    >
                      <div className="flex justify-between items-center">
                        <span>
                          <strong>{t("blogNew.aiSuggestedMetaTitle")}</strong>{" "}
                          {seoSuggestions.metaTitle}
                        </span>{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setMetaTitle(seoSuggestions.metaTitle);
                            setMetaTitleManuallySet(true);
                          }}
                          className={`text-[10px] ${theme.linkStyle} font-semibold`}
                        >
                          Use
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>
                          <strong>
                            {t("blogNew.aiSuggestedMetaDescription")}
                          </strong>{" "}
                          {seoSuggestions.metaDescription}
                        </span>{" "}
                        <button
                          type="button"
                          onClick={() =>
                            setMetaDescription(seoSuggestions.metaDescription)
                          }
                          className={`text-[10px] ${theme.linkStyle} font-semibold`}
                        >
                          Use
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>
                          <strong>{t("blogNew.aiSuggestedKeywords")}</strong>{" "}
                          {seoSuggestions.keywords}
                        </span>{" "}
                        <button
                          type="button"
                          onClick={() => setTags(seoSuggestions.keywords)}
                          className={`text-[10px] ${theme.linkStyle} font-semibold`}
                        >
                          Use
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <hr
                  className={`my-4 ${theme.borderLight} dark:border-slate-700`}
                />
                <InputField
                  t={t}
                  label="Meta Title"
                  tKeyLabel="blogNew.field.metaTitle.label"
                  id="meta-title"
                  value={metaTitle}
                  onChange={(e) => {
                    setMetaTitle(e.target.value);
                    setMetaTitleManuallySet(true);
                  }}
                  tKeyPlaceholder="blogNew.field.metaTitle.placeholder"
                />
                <TextareaField
                  t={t}
                  label="Meta Description"
                  tKeyLabel="blogNew.field.metaDescription.label"
                  id="meta-description"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  tKeyPlaceholder="blogNew.field.metaDescription.placeholder"
                  rows={3}
                />
                <InputField
                  t={t}
                  label="Permalink / Slug"
                  tKeyLabel="blogNew.field.slug.label"
                  id="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugManuallySet(true);
                  }}
                  tKeyPlaceholder="blogNew.field.slug.placeholder"
                  helpTextKey="blogNew.field.slug.note"
                />
                <InputField
                  t={t}
                  label="Categories"
                  tKeyLabel="blogNew.field.categories.label"
                  id="categories-final"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  tKeyPlaceholder="blogNew.field.categories.placeholder"
                  helpTextKey="blogNew.field.categories.note"
                />
                <InputField
                  t={t}
                  label="Tags"
                  tKeyLabel="blogNew.field.tags.label"
                  id="tags-final"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  tKeyPlaceholder="blogNew.field.tags.placeholder"
                  helpTextKey="blogNew.field.tags.note"
                />
              </FormSection>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
