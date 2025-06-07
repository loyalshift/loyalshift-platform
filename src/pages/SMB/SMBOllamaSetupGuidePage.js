// src/pages/smb/resources/guide/OllamaSetupGuidePage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// --- Icons ---
import {
  FiTool,
  FiDownloadCloud,
  FiCpu,
  FiZap,
  FiCheckCircle,
  FiAlertTriangle,
  FiArrowRight,
  FiArrowLeft,
  FiExternalLink,
  FiInfo,
} from "react-icons/fi";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";
import { useLocalization } from "../../components/LocalizationContext";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// --- Reusable Components (from previous version) ---
const SectionTitle = ({
  t,
  titleKey,
  defaultTitle,
  className = "",
  level = 2,
}) => {
  const Tag = `h${level}`;
  return (
    <motion.div variants={fadeInUp} className={`mb-6 ${className}`}>
      <Tag
        className={`text-2xl md:text-3xl font-bold ${theme.textPrimary} border-b-2 ${theme.border} pb-2`}
      >
        {t(titleKey, defaultTitle)}
      </Tag>
    </motion.div>
  );
};
SectionTitle.propTypes = {
  /* ... */
};

const Paragraph = ({ t, textKey, defaultText, className = "" }) => (
  <motion.p
    variants={fadeInUp}
    className={`${theme.textSecondary} text-base md:text-lg leading-relaxed mb-4 ${className}`}
  >
    {t(textKey, defaultText)}
  </motion.p>
);
Paragraph.propTypes = {
  /* ... */
};

const CodeBlock = ({
  code,
  language = "bash",
  captionKey,
  defaultCaption,
  t,
}) => (
  <motion.div variants={fadeInUp} className={`my-6`}>
    <pre
      className={`p-4 sm:p-5 text-xs md:text-sm language-${language} ${theme.surfaceMuted} border ${theme.borderLight} rounded-lg overflow-x-auto shadow-sm`}
    >
      <code className={`${theme.textPrimary}`}>{code.trim()}</code>
    </pre>
    {captionKey && (
      <p className={`text-xs ${theme.textMuted} mt-2 text-center`}>
        {t(captionKey, defaultCaption)}
      </p>
    )}
  </motion.div>
);
CodeBlock.propTypes = {
  /* ... */
};

const StepItem = ({ t, stepNumber, titleKey, defaultTitle, children }) => (
  <motion.div variants={fadeInUp} className="mb-8">
    <div className="flex items-center mb-3">
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full ${theme.accentCyanBg} ${theme.buttonTextLight} flex items-center justify-center font-bold text-md mr-4 shadow`}
      >
        {stepNumber}
      </div>
      <h3 className={`text-xl font-semibold ${theme.textPrimary}`}>
        {t(titleKey, defaultTitle)}
      </h3>
    </div>
    <div
      className={`pl-12 space-y-3 ${theme.textSecondary} text-base leading-relaxed`}
    >
      {children}
    </div>
  </motion.div>
);
StepItem.propTypes = {
  /* ... */
};

const InfoBox = ({ t, titleKey, defaultTitle, children, type = "info" }) => {
  const typeStyles = {
    info: {
      bg: theme.infoBoxBg,
      border: theme.infoBoxBorder,
      text: theme.infoBoxText,
      icon: <FiInfo />,
    },
    warning: {
      bg: theme.warningBg,
      border: theme.warningBorder,
      text: theme.warningText,
      icon: <FiAlertTriangle />,
    },
    success: {
      bg: theme.successBg,
      border: theme.successBorder,
      text: theme.successText,
      icon: <FiCheckCircle />,
    },
  };
  const currentStyle = typeStyles[type] || typeStyles.info;

  return (
    <motion.div
      variants={fadeInUp}
      className={`my-6 p-4 rounded-lg border ${currentStyle.border} ${currentStyle.bg} flex items-start shadow-sm`}
    >
      <div className={`flex-shrink-0 w-5 h-5 mr-3 mt-0.5 ${currentStyle.text}`}>
        {currentStyle.icon}
      </div>
      <div>
        {titleKey && (
          <h4 className={`text-md font-semibold ${currentStyle.text} mb-1`}>
            {t(titleKey, defaultTitle)}
          </h4>
        )}
        <div className={`text-sm ${currentStyle.text} opacity-90`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};
InfoBox.propTypes = {
  /* ... */
};

// --- NEW: Recommended Models Table Component ---
const RecommendedModelsTable = ({ t }) => {
  const models = [
    {
      name: "Llama 2 (7B)",
      command: "ollama run llama2:7b",
      useCaseKey: "ollamaGuide.modelUseCase.generalChat",
      defaultUseCase: "General chat, Q&A",
      notesKey: "ollamaGuide.modelNotes.goodStarter",
      defaultNotes: "Good starter, versatile.",
    },
    {
      name: "Mistral (7B)",
      command: "ollama run mistral:7b",
      useCaseKey: "ollamaGuide.modelUseCase.efficientChat",
      defaultUseCase: "Efficient chat, good for less powerful hardware",
      notesKey: "ollamaGuide.modelNotes.lightweight",
      defaultNotes: "Lightweight, fast.",
    },
    {
      name: "CodeLlama (7B)",
      command: "ollama run codellama:7b",
      useCaseKey: "ollamaGuide.modelUseCase.codingAssist",
      defaultUseCase: "Code generation & assistance",
      notesKey: "ollamaGuide.modelNotes.codingFocus",
      defaultNotes: "Focus on programming tasks.",
    },
    {
      name: "LLaVA (7B)",
      command: "ollama run llava:7b",
      useCaseKey: "ollamaGuide.modelUseCase.imageDesc",
      defaultUseCase: "Image description (multimodal)",
      notesKey: "ollamaGuide.modelNotes.multimodal",
      defaultNotes: "Can 'see' images.",
    },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      className={`my-6 overflow-x-auto ${theme.surfaceCard} rounded-lg shadow-sm border ${theme.borderLight}`}
    >
      <table className="min-w-full text-sm">
        <thead className={`${theme.tableHeaderBg}`}>
          <tr>
            <th
              className={`py-2 px-3 text-left font-semibold ${theme.textSecondary} uppercase`}
            >
              {t("ollamaGuide.modelsTableNameHeader", "Model Name")}
            </th>
            <th
              className={`py-2 px-3 text-left font-semibold ${theme.textSecondary} uppercase`}
            >
              {t("ollamaGuide.modelsTableUseCaseHeader", "Primary Use Case")}
            </th>
            <th
              className={`py-2 px-3 text-left font-semibold ${theme.textSecondary} uppercase`}
            >
              {t("ollamaGuide.modelsTableNotesHeader", "Notes")}
            </th>
            <th
              className={`py-2 px-3 text-left font-semibold ${theme.textSecondary} uppercase`}
            >
              {t("ollamaGuide.modelsTableCommandHeader", "Command")}
            </th>
          </tr>
        </thead>
        <tbody className={theme.textSecondary}>
          {models.map((model) => (
            <tr
              key={model.name}
              className={`border-b ${theme.borderLight} last:border-b-0 hover:${theme.tableRowStripeBg}`}
            >
              <td className={`py-2 px-3 font-medium ${theme.textPrimary}`}>
                {model.name}
              </td>
              <td className="py-2 px-3">
                {t(model.useCaseKey, model.defaultUseCase)}
              </td>
              <td className="py-2 px-3">
                {t(model.notesKey, model.defaultNotes)}
              </td>
              <td className={`py-2 px-3 font-mono ${theme.textHighlight}`}>
                {model.command}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

// --- Main Page Component ---
export default function SMBOllamaSetupGuidePage() {
  const { t } = useLocalization();

  return (
    <div className={`min-h-screen ${theme.background} py-8 md:py-12`}>
      <header
        className={`mb-8 md:mb-12 sticky top-0 z-20 ${theme.surfaceCard} py-3 border-b ${theme.borderLight} shadow-sm`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <Link
            to="/smb/resources"
            className={`flex items-center text-sm ${theme.linkStyle} group`}
          >
            <FiArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
            {t("ollamaGuide.backToResources", "Back to Resources")}
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.article
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.header variants={fadeInUp} className="mb-10 text-center">
            <div
              className={`inline-flex p-3 ${theme.accentCyanBg}/10 rounded-lg mb-4`}
            >
              <FiCpu className={`w-10 h-10 ${theme.textHighlight}`} />
            </div>
            <h1
              className={`text-3xl sm:text-4xl font-extrabold ${theme.textPrimary} mb-3`}
            >
              {t(
                "ollamaGuide.mainTitle",
                "Getting Started with Ollama & Local AI"
              )}
            </h1>
            <p className={`text-md ${theme.textMuted}`}>
              {t("ollamaGuide.publishDate", "Published: May 30, 2025")} |{" "}
              {t("ollamaGuide.readingTime", "Reading Time: Approx. 10 minutes")}
            </p>
            <Paragraph
              t={t}
              textKey="ollamaGuide.intro"
              defaultText="Unlock the power of Large Language Models (LLMs) on your own computer. This beginner-friendly guide will walk you through setting up Ollama, a fantastic tool for running open-source models locally for development, experimentation, and privacy-focused AI tasks."
              className="mt-4 max-w-2xl mx-auto"
            />
          </motion.header>

          <SectionTitle
            t={t}
            titleKey="ollamaGuide.whatIsOllamaTitle"
            defaultTitle="What is Ollama?"
            level={2}
            align="text-left"
          />
          <Paragraph
            t={t}
            textKey="ollamaGuide.whatIsOllamaP1"
            defaultText="Ollama simplifies running powerful open-source large language models (like Llama 2, Mistral, and many others) directly on your local machine. It bundles model weights, configurations, and a serving mechanism into a single, easy-to-use package. This is great for developers, researchers, or anyone interested in exploring AI without relying on cloud APIs or incurring high costs."
          />
          <Paragraph
            t={t}
            textKey="ollamaGuide.whatIsOllamaP2"
            defaultText="Key benefits include privacy (your data stays local), offline capability, cost-effectiveness, and the ability to deeply customize and fine-tune models (though fine-tuning is an advanced topic beyond this guide)."
          />

          <SectionTitle
            t={t}
            titleKey="ollamaGuide.prerequisitesTitle"
            defaultTitle="Prerequisites"
            level={2}
            align="text-left"
          />
          <ul className="list-none pl-0 space-y-2 mb-6">
            {[
              {
                key: "ollamaGuide.prereqOS",
                default:
                  "A compatible operating system: macOS, Windows (with WSL2), or Linux.",
              },
              {
                key: "ollamaGuide.prereqAdmin",
                default:
                  "Administrator privileges on your computer for installation and setting environment variables.",
              },
              {
                key: "ollamaGuide.prereqHardware",
                default:
                  "Sufficient RAM (8GB+ recommended, 16GB+ for larger models) and disk space.",
              },
              {
                key: "ollamaGuide.prereqGpu",
                default:
                  "(Optional but Recommended) An NVIDIA GPU for significantly faster performance on many models. AMD GPU support is improving on Linux.",
              },
              {
                key: "ollamaGuide.prereqTerminal",
                default:
                  "Basic familiarity with using the command line or terminal.",
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={fadeInUp}
                className="flex items-start"
              >
                <FiCheckCircle
                  className={`w-5 h-5 ${theme.successText} mr-2 mt-1 flex-shrink-0`}
                />
                <span className={theme.textSecondary}>
                  {t(item.key, item.default)}
                </span>
              </motion.li>
            ))}
          </ul>
          <InfoBox
            t={t}
            titleKey="ollamaGuide.ollamaRunsInBackgroundTitle"
            defaultTitle="Ollama Runs in the Background"
            type="info"
          >
            <p>
              {t(
                "ollamaGuide.ollamaRunsInBackgroundText",
                "After installation, Ollama typically runs as a background service. You might see its icon in your system tray (Windows/Linux) or menu bar (macOS). You usually don't need to manually start it before using commands."
              )}
            </p>
          </InfoBox>

          <SectionTitle
            t={t}
            titleKey="ollamaGuide.setupStepsTitle"
            defaultTitle="Setup Steps"
            level={2}
            align="text-left"
          />

          <StepItem
            t={t}
            stepNumber="1"
            titleKey="ollamaGuide.step1Title"
            defaultTitle="Download & Install Ollama"
          >
            <Paragraph
              t={t}
              textKey="ollamaGuide.step1P1"
              defaultText="Visit the official Ollama website to download the appropriate installer for your operating system:"
            />
            <div className="my-3">
              <a
                href="https://ollama.com/download"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center ${theme.linkStyle} font-medium`}
              >
                <FiDownloadCloud className="w-4 h-4 mr-2" />{" "}
                {t("ollamaGuide.downloadLinkText", "Ollama Download Page")}{" "}
                <FiExternalLink className="w-3 h-3 ml-1 opacity-70" />
              </a>
            </div>
            <Paragraph
              t={t}
              textKey="ollamaGuide.step1P2"
              defaultText="Follow the installation instructions provided on their site. This usually involves running an installer or a simple command."
            />
          </StepItem>

          <StepItem
            t={t}
            stepNumber="2"
            titleKey="ollamaGuide.step2Title"
            defaultTitle="Configure Model Storage (Optional but Recommended)"
          >
            <Paragraph
              t={t}
              textKey="ollamaGuide.step2P1.configStorage"
              defaultText="By default, Ollama stores models in a system directory. If you prefer to save them in a custom location (e.g., a larger drive), you need to set the `OLLAMA_MODELS` environment variable."
            />
            <Paragraph
              t={t}
              textKey="ollamaGuide.step2P2.whyConfigStorage"
              defaultText="This is especially useful if your main drive has limited space, as LLM models can be several gigabytes each."
            />
            <InfoBox
              t={t}
              titleKey="ollamaGuide.envVarInfoTitle"
              defaultTitle="Setting Environment Variables"
              type="info"
            >
              <ul className="list-disc list-outside space-y-1 pl-4">
                <li>
                  <strong className={theme.textPrimary}>
                    {t("ollamaGuide.envVarWindows", "Windows:")}
                  </strong>{" "}
                  {t(
                    "ollamaGuide.envVarWindowsSteps",
                    "Search for 'environment variables', click 'Edit the system environment variables', then 'Environment Variables...'. Under 'User variables', click 'New...' and add `OLLAMA_MODELS` with the path to your desired folder (e.g., `D:\\OllamaModels`). OK all windows."
                  )}
                </li>
                <li>
                  <strong className={theme.textPrimary}>
                    {t("ollamaGuide.envVarMacLinux", "macOS/Linux:")}
                  </strong>{" "}
                  {t(
                    "ollamaGuide.envVarMacLinuxSteps",
                    "Add `export OLLAMA_MODELS=/path/to/your/models` to your shell configuration file (e.g., `~/.zshrc`, `~/.bash_profile`, or `~/.bashrc`). Then, source the file (e.g., `source ~/.zshrc`) or open a new terminal."
                  )}
                </li>
              </ul>
              <p className="mt-2">
                {t(
                  "ollamaGuide.envVarRestart",
                  "You might need to restart Ollama or your terminal/computer for the change to take effect."
                )}
              </p>
            </InfoBox>
          </StepItem>

          <StepItem
            t={t}
            stepNumber="3"
            titleKey="ollamaGuide.step3Title"
            defaultTitle="Download Your First Model"
          >
            <Paragraph
              t={t}
              textKey="ollamaGuide.step3P1"
              defaultText="Ollama allows you to easily pull models from its library. Open your terminal or command prompt. Here are some recommended starter models:"
            />
            <RecommendedModelsTable t={t} />
            <Paragraph
              t={t}
              textKey="ollamaGuide.step3P2"
              defaultText="To download a model, use the `ollama pull` command followed by the model name (e.g., `ollama pull llama2:7b`). The first time, this might take a while depending on your internet speed and the model size. You can find a full list of available models on the Ollama website."
            />
            <InfoBox
              t={t}
              titleKey="ollamaGuide.modelSizeTipTitle"
              defaultTitle="Model Sizes Matter!"
              type="warning"
            >
              <p>
                {t(
                  "ollamaGuide.modelSizeTipText",
                  "Models come in various sizes (e.g., 7B, 13B, 70B parameters, indicated by the number before 'B'). Larger models are generally more capable but require significantly more RAM and processing power (especially VRAM if using a GPU). Start with smaller ones like a 7B model if you're unsure about your hardware capabilities."
                )}
              </p>
            </InfoBox>
          </StepItem>

          <StepItem
            t={t}
            stepNumber="4"
            titleKey="ollamaGuide.step4Title"
            defaultTitle="Run a Model and Interact"
          >
            <Paragraph
              t={t}
              textKey="ollamaGuide.step4P1"
              defaultText="Once a model is downloaded, you can run it interactively:"
            />
            <CodeBlock
              code="ollama run mistral:7b"
              captionKey="ollamaGuide.codeCaptionRunModel"
              defaultCaption="Replace 'mistral:7b' with the name of the model you pulled."
              t={t}
            />
            <Paragraph
              t={t}
              textKey="ollamaGuide.step4P2"
              defaultText="This will start an interactive session. You can now type your prompts directly into the terminal. For example, try asking:"
            />
            <CodeBlock
              code={
                ">>> What is Ollama?\n>>> Write a short story about a helpful SMB AI assistant."
              }
              language="text"
            />
            <Paragraph
              t={t}
              textKey="ollamaGuide.step4P3"
              defaultText="To exit the interactive session, type `/bye`. To see all models you've downloaded, type `ollama list`."
            />
          </StepItem>

          <StepItem
            t={t}
            stepNumber="5"
            titleKey="ollamaGuide.step5Title"
            defaultTitle="Serving Models via API (For Developers)"
          >
            <Paragraph
              t={t}
              textKey="ollamaGuide.step5P1"
              defaultText="Ollama also runs an API server by default (usually on `http://localhost:11434`), allowing you to integrate these local LLMs into your applications. You can check if it's running with `ollama serve` (though it often starts automatically when you run a model or on system startup)."
            />
            <Paragraph
              t={t}
              textKey="ollamaGuide.step5P2"
              defaultText="You can then send POST requests to endpoints like `/api/generate` or `/api/chat` to get completions. Here's a conceptual `curl` example for generation:"
            />
            <CodeBlock
              code={`curl http://localhost:11434/api/generate -d '{\n  "model": "mistral:7b",\n  "prompt":"Explain the importance of local AI for SMBs"\n}'`}
            />
            <Paragraph
              t={t}
              textKey="ollamaGuide.step5P3"
              defaultText="Refer to the official Ollama documentation on GitHub for detailed API specifications and client libraries."
            />
          </StepItem>

          <SectionTitle
            t={t}
            titleKey="ollamaGuide.troubleshootingTitle"
            defaultTitle="Quick Tips & Troubleshooting"
            level={2}
            align="text-left"
          />
          <ul className="list-none pl-0 space-y-2 mb-6">
            {[
              {
                key: "ollamaGuide.tipAutostart",
                default:
                  "Manage Autostart: Ollama often starts with your computer. You can usually manage this via Task Manager (Startup Apps tab) on Windows or launchd/systemd on macOS/Linux if desired.",
              },
              {
                key: "ollamaGuide.tipGpuCheck",
                default:
                  "GPU Usage: If you have an NVIDIA/AMD GPU, ensure drivers are up to date. Ollama should automatically detect and use it. You can often see GPU utilization in your system's task manager or GPU utility.",
              },
              {
                key: "ollamaGuide.tipResourceMonitor",
                default:
                  "Resource Monitoring: Keep an eye on your RAM and VRAM usage when running larger models. If your system becomes unresponsive, you might be running a model too large for your hardware.",
              },
              {
                key: "ollamaGuide.tipCommunity",
                default:
                  "Community Support: The Ollama community (e.g., on Discord, GitHub Discussions) is a great place to ask questions and find solutions to common issues.",
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={fadeInUp}
                className="flex items-start"
              >
                <FiTool
                  className={`w-5 h-5 ${theme.textHighlight} mr-2 mt-1 flex-shrink-0`}
                />
                <span className={theme.textSecondary}>
                  {t(item.key, item.default)}
                </span>
              </motion.li>
            ))}
          </ul>

          <SectionTitle
            t={t}
            titleKey="ollamaGuide.nextStepsTitle"
            defaultTitle="Next Steps & Further Exploration"
            level={2}
            align="text-left"
          />
          <Paragraph
            t={t}
            textKey="ollamaGuide.nextStepsP1"
            defaultText="Congratulations! You now have a powerful local AI setup."
          />
          <ul className="list-none pl-0 space-y-2 mb-6">
            {[
              {
                key: "ollamaGuide.exploreModels",
                default:
                  "Explore more models: Check the Ollama website library for new and specialized models.",
              },
              {
                key: "ollamaGuide.modelfiles",
                default:
                  "Learn about Modelfiles: Customize model behavior, system prompts, and parameters by creating your own Modelfiles.",
              },
              {
                key: "ollamaGuide.webUIs",
                default:
                  "Try Web UIs: Many open-source web interfaces (e.g., Open WebUI, LobeChat, AnythingLLM) can connect to your local Ollama instance for a chat-like experience, document interaction, and more.",
              },
              {
                key: "ollamaGuide.integrations",
                default:
                  "Integrate with your projects: Use the Ollama API or available client libraries in Python, JavaScript, etc., to build AI-powered features into your applications.",
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={fadeInUp}
                className="flex items-start"
              >
                <FiZap
                  className={`w-5 h-5 ${theme.textHighlight} mr-2 mt-1 flex-shrink-0`}
                />
                <span className={theme.textSecondary}>
                  {t(item.key, item.default)}
                </span>
              </motion.li>
            ))}
          </ul>
          <InfoBox
            t={t}
            titleKey="ollamaGuide.stayUpdatedTitle"
            defaultTitle="Stay Updated & Experiment!"
            type="success"
          >
            <p>
              {t(
                "ollamaGuide.stayUpdatedText",
                "The field of local LLMs and tools like Ollama is rapidly evolving. Regularly check the Ollama GitHub repository and community channels for updates. Don't be afraid to experiment with different models and prompts to discover what works best for your needs!"
              )}
            </p>
          </InfoBox>

          <motion.div
            variants={fadeInUp}
            className="mt-12 pt-8 border-t ${theme.borderLight} text-center"
          >
            <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-3`}>
              {t(
                "ollamaGuide.ctaTitle",
                "Ready to Dive Deeper into AI for Your SMB?"
              )}
            </h3>
            <Paragraph
              t={t}
              textKey="ollamaGuide.ctaText"
              defaultText="LoyalShift Studio offers integrated AI tools to help create content, analyze data, and more. Explore how our platform can complement your local AI experiments and streamline your business operations."
              className="max-w-xl mx-auto"
            />
            <div className="mt-6">
              <Link
                to="/smb/features"
                className={`inline-flex items-center justify-center px-6 py-3 text-base font-medium ${theme.buttonPrimaryBg} ${theme.buttonTextLight} rounded-md shadow-sm ${theme.buttonPrimaryHoverBg} transition-colors ${theme.focusRingDefault}`}
              >
                {t(
                  "ollamaGuide.ctaButton",
                  "Explore LoyalShift Studio Features"
                )}{" "}
                <FiArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.article>
      </main>
    </div>
  );
}

SMBOllamaSetupGuidePage.propTypes = {
  // No props expected
};

// Add PropTypes for helper components if not defined elsewhere
SectionTitle.propTypes = {
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string,
  className: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  align: PropTypes.string,
};
Paragraph.propTypes = {
  t: PropTypes.func.isRequired,
  textKey: PropTypes.string.isRequired,
  defaultText: PropTypes.string,
  className: PropTypes.string,
};
CodeBlock.propTypes = {
  t: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  captionKey: PropTypes.string,
  defaultCaption: PropTypes.string,
};
StepItem.propTypes = {
  t: PropTypes.func.isRequired,
  stepNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  titleKey: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};
InfoBox.propTypes = {
  t: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  titleKey: PropTypes.string,
  defaultTitle: PropTypes.string,
  type: PropTypes.oneOf(["info", "warning", "success"]),
};
