// src/pages/smb/SMBDeployGuideContaboPage.js
import React from "react";
import { motion } from "framer-motion";
import {
  FiUploadCloud,
  FiShield,
  FiLink2,
  FiCode,
  FiBox,
  FiCopy,
  FiCheck,
  FiTerminal,
  FiHardDrive,
  FiMonitor,
  FiKey,
  FiUserPlus,
  FiServer,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";
import { useLocalization } from "../../components/LocalizationContext";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// --- Reusable Components for the Guide ---
const SectionHeader = ({ t, titleKey, introKey }) => (
  <motion.div variants={fadeInUp} className="mb-8">
    <h2 className={`text-3xl font-bold ${theme.textPrimary} mb-3`}>
      {t(titleKey)}
    </h2>
    <p className={`${theme.textSecondary} text-lg leading-relaxed`}>
      {t(introKey)}
    </p>
  </motion.div>
);

const StepCard = ({ t, number, titleKey, children, className }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex items-start gap-4 sm:gap-6 ${className}`}
  >
    <div
      className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full ${theme.accentCyanBg}/20 flex items-center justify-center font-bold text-lg sm:text-xl ${theme.accentCyan}`}
    >
      {number}
    </div>
    <div className="flex-1 pt-1">
      <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-2`}>
        {t(titleKey)}
      </h3>
      <div className={`${theme.textSecondary} text-sm sm:text-base space-y-4`}>
        {children}
      </div>
    </div>
  </motion.div>
);

const CodeBlock = ({ codeString, language = "bash" }) => {
  const { t } = useLocalization();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString.trim());
    setCopied(true);
    toast.success(t("smbDeployGuideContabo.copiedButton", "Copied!"));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`my-3 rounded-lg overflow-hidden ${theme.cardShadow} bg-slate-800 relative group`}
    >
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 p-1.5 rounded-md text-slate-400 bg-slate-700/50 hover:bg-slate-600/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 ${theme.focusRingDefault}`}
        aria-label={t("smbDeployGuideContabo.copyCodeButton", "Copy code")}
      >
        {copied ? (
          <FiCheck className="w-4 h-4 text-green-400" />
        ) : (
          <FiCopy className="w-4 h-4" />
        )}
      </button>
      <pre
        className={`p-4 text-xs md:text-sm language-${language} text-slate-200 overflow-x-auto`}
      >
        <code>{codeString.trim()}</code>
      </pre>
    </div>
  );
};

const ImportantNote = ({
  t,
  title,
  textKey,
  textDefault,
  type = "warning",
}) => {
  const typeClasses = {
    warning: {
      bg: theme.warningBg,
      border: theme.warningBorder,
      text: theme.warningText,
    },
    info: {
      bg: theme.infoBoxBg,
      border: theme.infoBoxBorder,
      text: theme.infoBoxText,
    },
    security: {
      bg: theme.errorBg,
      border: theme.errorBorder,
      text: theme.errorText,
    },
  };
  const currentClasses = typeClasses[type] || typeClasses.info;

  return (
    <motion.div
      variants={fadeInUp}
      className={`p-4 rounded-lg my-4 ${currentClasses.bg} border ${currentClasses.border}`}
    >
      <p className={`text-sm ${currentClasses.text}`}>
        <strong className="font-semibold">{title}:</strong>{" "}
        {t(textKey, textDefault)}
      </p>
    </motion.div>
  );
};

export default function SMBDeployGuideContaboPage() {
  const { t } = useLocalization();

  return (
    <div className={`min-h-screen py-16 md:py-20 ${theme.background}`}>
      <Toaster position="bottom-right" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h1
              className={`text-4xl sm:text-5xl font-extrabold ${theme.textPrimary} mb-4`}
            >
              {t(
                "smbDeployGuideContabo.mainTitle",
                "Deploying Your Website on Contabo"
              )}
            </h1>
            <p
              className={`text-lg md:text-xl ${theme.textSecondary} max-w-3xl mx-auto`}
            >
              {t(
                "smbDeployGuideContabo.mainSubtitle",
                "A practical guide to uploading your modern application's files to your Contabo VPS or dedicated server."
              )}
            </p>
          </motion.div>

          <div className="space-y-12 md:space-y-16">
            {/* Part 1: Build */}
            <SectionHeader
              t={t}
              titleKey="smbDeployGuideContabo.part1Title"
              introKey="smbDeployGuideContabo.part1Intro"
            />
            <StepCard
              number="1"
              t={t}
              titleKey="smbDeployGuideContabo.part1Step1Title"
            >
              <p>{t("smbDeployGuideContabo.part1Step1Desc")}</p>
              <CodeBlock
                codeString={t(
                  "smbDeployGuideContabo.codeSnippetBuild",
                  "npm run build"
                )}
              />
            </StepCard>
            <hr className={`${theme.border} my-8`} />

            {/* Part 2: Secure File Upload */}
            <SectionHeader
              t={t}
              titleKey="smbDeployGuideContabo.part2Title"
              introKey="smbDeployGuideContabo.part2Intro"
            />
            <div className="space-y-10">
              <StepCard
                number="2"
                t={t}
                titleKey="smbDeployGuideContabo.securityPreambleTitle"
              >
                <FiShield className={`w-8 h-8 ${theme.textHighlight} mb-2`} />
                <p>{t("smbDeployGuideContabo.securityPreambleDesc")}</p>
                <ImportantNote
                  t={t}
                  title="Security Best Practice"
                  type="security"
                  textKey="smbDeployGuideContabo.securityRootWarning"
                />
              </StepCard>
              <div
                className={`p-6 rounded-xl border ${theme.border} ${theme.surfaceCard}`}
              >
                <h3
                  className={`text-xl font-semibold ${theme.textPrimary} mb-4 flex items-center`}
                >
                  <FiUserPlus className="w-6 h-6 mr-3 text-cyan-500" />{" "}
                  {t("smbDeployGuideContabo.scenario1Title")}
                </h3>
                <p className={`${theme.textSecondary} mb-4 text-sm`}>
                  {t("smbDeployGuideContabo.scenario1Desc")}
                </p>
                <ul className="list-decimal pl-5 space-y-2 text-sm ${theme.textSecondary}">
                  <li>
                    {t("smbDeployGuideContabo.scenario1Step1Title")}:{" "}
                    {t("smbDeployGuideContabo.scenario1Step1Desc")}
                  </li>
                  <CodeBlock
                    codeString={t("smbDeployGuideContabo.codeSnippetScp")}
                  />
                  <li>
                    {t("smbDeployGuideContabo.scenario1Step2Title")}:{" "}
                    {t("smbDeployGuideContabo.scenario1Step2Desc")}
                  </li>
                  <li>
                    {t("smbDeployGuideContabo.scenario1Step3Title")}:{" "}
                    {t("smbDeployGuideContabo.scenario1Step3Desc1")}{" "}
                    {t("smbDeployGuideContabo.scenario1Step3Desc2")}
                  </li>
                </ul>
              </div>
              <div
                className={`p-6 rounded-xl border ${theme.border} ${theme.surfaceCard}`}
              >
                <h3
                  className={`text-xl font-semibold ${theme.textPrimary} mb-4 flex items-center`}
                >
                  <FiKey className="w-6 h-6 mr-3 text-cyan-500" />{" "}
                  {t("smbDeployGuideContabo.sshKeyTitle")}
                </h3>
                <p className={`${theme.textSecondary} mb-4 text-sm`}>
                  {t("smbDeployGuideContabo.sshKeyDesc")}
                </p>
              </div>
            </div>
            <hr className={`${theme.border} my-8`} />

            {/* Part 3: Server Config */}
            <SectionHeader
              t={t}
              titleKey="smbDeployGuideContabo.part3Title"
              introKey="smbDeployGuideContabo.part3Intro"
            />
            <div className="space-y-8">
              <StepCard
                number="3"
                t={t}
                titleKey="smbDeployGuideContabo.part3Step1Title"
              >
                <FiServer className={`w-8 h-8 text-cyan-400 mb-2`} />
                <p>{t("smbDeployGuideContabo.part3Step1Desc")}</p>
                <ImportantNote
                  t={t}
                  title="For Apache Users:"
                  type="info"
                  textKey="smbDeployGuideContabo.apacheNote"
                />
                <CodeBlock
                  codeString={t("smbDeployGuideContabo.codeSnippetHtaccess")}
                  language="apache"
                />
                <ImportantNote
                  t={t}
                  title="For Nginx Users:"
                  type="info"
                  textKey="smbDeployGuideContabo.nginxNote"
                />
                <CodeBlock
                  codeString={t("smbDeployGuideContabo.codeSnippetNginx")}
                  language="nginx"
                />
              </StepCard>
              <StepCard
                number="4"
                t={t}
                titleKey="smbDeployGuideContabo.part3Step2Title"
              >
                <p>{t("smbDeployGuideContabo.part3Step2Desc")}</p>
                <CodeBlock
                  codeString={t("smbDeployGuideContabo.codeSnippetChown")}
                />
              </StepCard>
            </div>
            <hr className={`${theme.border} my-8`} />

            <div id="whm" />

            {/* Part 4: Domain & SSL */}
            <SectionHeader
              t={t}
              titleKey="smbDeployGuideContabo.part4Title"
              introKey="smbDeployGuideContabo.part4Intro"
            />
            <div className="space-y-8">
              <StepCard
                number="5"
                t={t}
                titleKey="smbDeployGuideContabo.part4Step1Title"
              >
                <FiLink2 className={`w-8 h-8 text-cyan-400 mb-2`} />
                <p>{t("smbDeployGuideContabo.part4Step1Desc")}</p>

                {/* Add this snippet inside the StepCard for Pointing a Domain */}

                <div
                  className={`mt-4 p-4 rounded-lg border ${theme.border} ${theme.surfaceMuted}`}
                >
                  <h4
                    className={`text-md font-semibold ${theme.textPrimary} mb-2`}
                  >
                    {t(
                      "smbDeployGuideContabo.part4Step1SubTitleWHM",
                      "For WHM/cPanel Users: Linking Your Domain on the Server"
                    )}
                  </h4>
                  <p className="text-sm text-secondary mb-3">
                    {t(
                      "smbDeployGuideContabo.part4Step1SubDescWHM",
                      "If your Contabo server has a WHM/cPanel license, you must first create an account for your domain within WHM. This step properly configures the server to host your website's files."
                    )}
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-secondary">
                    <li>
                      {t(
                        "smbDeployGuideContabo.part4Step1SubStep1WHM",
                        "Log into WHM (usually at https://your-server-ip:2087)."
                      )}
                    </li>
                    <li>
                      {t(
                        "smbDeployGuideContabo.part4Step1SubStep2WHM",
                        "Navigate to 'Create a New Account' under the 'Account Functions' section."
                      )}
                    </li>
                    <li>
                      {t(
                        "smbDeployGuideContabo.part4Step1SubStep3WHM",
                        "Fill in your domain information, create a username and password for its cPanel account, and select a resource package."
                      )}
                    </li>
                    <li>
                      {t(
                        "smbDeployGuideContabo.part4Step1SubStep4WHM",
                        "Click 'Create'. WHM will now set up the dedicated hosting environment for your domain on the server."
                      )}
                    </li>
                    <li>
                      {t(
                        "smbDeployGuideContabo.part4Step1SubStep5WHM",
                        "After creating the account in WHM, you can then proceed with pointing your domain's A record at your registrar (like Namecheap) to your server's IP address."
                      )}
                    </li>
                  </ol>
                </div>
              </StepCard>
              <StepCard
                number="6"
                t={t}
                titleKey="smbDeployGuideContabo.part4Step2Title"
              >
                <FiShield className={`w-8 h-8 text-cyan-400 mb-2`} />
                <p>{t("smbDeployGuideContabo.part4Step2Desc")}</p>
              </StepCard>
            </div>
            <hr className={`${theme.border} my-8`} />

            {/* Conclusion */}
            <motion.div
              variants={fadeInUp}
              className={`text-center p-8 rounded-xl ${theme.surfaceMuted} border ${theme.border}`}
            >
              <h2 className={`text-2xl font-bold ${theme.textPrimary} mb-3`}>
                {t("smbDeployGuideContabo.conclusionTitle")}
              </h2>
              <p className={theme.textSecondary}>
                {t("smbDeployGuideContabo.conclusionText")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
