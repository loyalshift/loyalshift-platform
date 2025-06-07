// src/pages/smb/resources/blog/ContextIsKingBlogPage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// --- Icons ---
import {
  FiMessageCircle,
  FiZap,
  FiArrowLeft,
  FiInfo,
  FiThumbsUp,
  FiThumbsDown,
} from "react-icons/fi";
import { useLocalization } from "../../components/LocalizationContext";
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// --- Reusable Components from Ollama Guide (can be centralized later) ---
const SectionTitle = ({
  t,
  titleKey,
  defaultTitle,
  className = "",
  level = 2,
}) => {
  const Tag = `h${level}`;
  return (
    <motion.div variants={fadeInUp} className={`mt-10 mb-5 ${className}`}>
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

const Paragraph = ({
  t,
  textKey,
  defaultText,
  className = "",
  isLead = false,
}) => (
  <motion.p
    variants={fadeInUp}
    className={`${
      isLead
        ? `text-lg md:text-xl ${theme.textSecondary} font-medium`
        : `${theme.textSecondary} text-base md:text-lg`
    } leading-relaxed mb-4 ${className}`}
  >
    {t(textKey, defaultText)}
  </motion.p>
);
Paragraph.propTypes = {
  /* ... */
};

const CodeBlock = ({
  code,
  language = "text",
  captionKey,
  defaultCaption,
  t,
  type = "prompt",
}) => {
  const bgClass =
    type === "good_prompt"
      ? `${theme.successBg} border ${theme.successBorder}`
      : type === "bad_prompt"
      ? `${theme.errorBg} border ${theme.errorBorder}`
      : `${theme.surfaceMuted} border ${theme.borderLight}`;
  const textClass =
    type === "good_prompt"
      ? theme.successText
      : type === "bad_prompt"
      ? theme.errorText
      : theme.textPrimary;

  return (
    <motion.div variants={fadeInUp} className={`my-6`}>
      <pre
        className={`p-4 sm:p-5 text-xs md:text-sm language-${language} ${bgClass} rounded-lg overflow-x-auto shadow-sm`}
      >
        <code className={textClass}>{code.trim()}</code>
      </pre>
      {captionKey && (
        <p className={`text-xs ${theme.textMuted} mt-2 text-center`}>
          {t(captionKey, defaultCaption)}
        </p>
      )}
    </motion.div>
  );
};
CodeBlock.propTypes = {
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
    tip: {
      bg: theme.successBg,
      border: theme.successBorder,
      text: theme.successText,
      icon: <FiThumbsUp />,
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
        <div className={`text-sm ${currentStyle.text} opacity-90 space-y-1`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};
InfoBox.propTypes = {
  /* ... */
};

const Highlight = ({ children }) => (
  <span className={`${theme.textHighlight} font-semibold`}>{children}</span>
);
Highlight.propTypes = { children: PropTypes.node.isRequired };

// --- Main Page Component ---
export default function SMBContextIsKingBlogPage() {
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
            {t("contextIsKing.backToResources", "Back to Resources")}
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {" "}
        {/* Content centered */}
        <motion.article
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.header variants={fadeInUp} className="mb-10 text-center">
            <div
              className={`inline-flex p-3 ${theme.accentCyanBg}/10 rounded-lg mb-4`}
            >
              <FiMessageCircle className={`w-10 h-10 ${theme.textHighlight}`} />
            </div>
            <h1
              className={`text-3xl sm:text-4xl font-extrabold ${theme.textPrimary} mb-3`}
            >
              {t(
                "contextIsKing.mainTitle",
                "Context is King: Mastering AI Prompts for Better Results"
              )}
            </h1>
            <p className={`text-md ${theme.textMuted}`}>
              {t("contextIsKing.publishDate", "Published: May 30, 2025")} |{" "}
              {t(
                "contextIsKing.readingTime",
                "Reading Time: Approx. 7 minutes"
              )}
            </p>
            <Paragraph
              t={t}
              textKey="contextIsKing.intro"
              defaultText="Ever felt like your AI assistant isn't quite understanding you? You're not alone! The secret to unlocking truly powerful and relevant responses from Large Language Models (LLMs) often lies in one crucial element: context. This guide will explain why context is king and how you can provide it effectively."
              className="mt-6 max-w-2xl mx-auto text-lg"
              isLead
            />
          </motion.header>

          <SectionTitle
            t={t}
            titleKey="contextIsKing.whyContextMattersTitle"
            defaultTitle="Why Does Context Matter So Much?"
            level={2}
            align="text-left"
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.whyContextP1"
            defaultText="LLMs are incredibly sophisticated, but they aren't mind readers. They operate based on the information you give them. Without sufficient context, an AI might:"
          />
          <ul className="list-none pl-0 space-y-2 mb-6">
            {[
              {
                key: "contextIsKing.whyContextBenefit1",
                default: "Provide generic or vague answers.",
              },
              {
                key: "contextIsKing.whyContextBenefit2",
                default: "Misinterpret your intent or desired outcome.",
              },
              {
                key: "contextIsKing.whyContextBenefit3",
                default: "Make incorrect assumptions.",
              },
              {
                key: "contextIsKing.whyContextBenefit4",
                default:
                  "Generate content that doesn't fit the desired tone, style, or format.",
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
          <Paragraph
            t={t}
            textKey="contextIsKing.whyContextP2"
            defaultText="Think of it like talking to a new colleague. If you just say 'Write an email,' they'll have many questions. But if you say, 'Write a follow-up email to Client X about the proposal we sent last Tuesday, maintaining a professional but friendly tone, and remind them about the upcoming deadline,' they have a much better chance of success."
          />

          <SectionTitle
            t={t}
            titleKey="contextIsKing.typesOfContextTitle"
            defaultTitle="Key Types of Context to Provide"
            level={2}
            align="text-left"
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.typesOfContextIntro"
            defaultText="Effective prompting involves giving the AI the necessary background, constraints, and goals. Here are common types of context:"
          />

          <div className="space-y-6">
            {[
              {
                titleKey: "contextIsKing.typeRoleTitle",
                defaultTitle: "Role or Persona",
                textKey: "contextIsKing.typeRoleText",
                defaultText:
                  "Tell the AI who it should be. Examples: 'Act as a marketing expert,' 'You are a helpful customer service agent,' 'Be a creative storyteller.'",
              },
              {
                titleKey: "contextIsKing.typeAudienceTitle",
                defaultTitle: "Target Audience",
                textKey: "contextIsKing.typeAudienceText",
                defaultText:
                  "Who is the output for? Examples: 'Explain this to a 5-year-old,' 'Write for a technical audience of engineers,' 'Address potential new customers.'",
              },
              {
                titleKey: "contextIsKing.typeGoalTitle",
                defaultTitle: "Goal or Objective",
                textKey: "contextIsKing.typeGoalText",
                defaultText:
                  "What do you want to achieve with the output? Examples: 'Generate three catchy headlines,' 'Summarize this document into five bullet points,' 'Persuade the reader to sign up for a newsletter.'",
              },
              {
                titleKey: "contextIsKing.typeFormatTitle",
                defaultTitle: "Format and Structure",
                textKey: "contextIsKing.typeFormatText",
                defaultText:
                  "Specify the desired output format. Examples: 'Write a blog post,' 'Create a JSON object,' 'Generate a Python script,' 'List pros and cons in a table.'",
              },
              {
                titleKey: "contextIsKing.typeToneTitle",
                defaultTitle: "Tone and Style",
                textKey: "contextIsKing.typeToneText",
                defaultText:
                  "Define the voice of the output. Examples: 'Write in a formal and professional tone,' 'Be witty and humorous,' 'Use simple, encouraging language.'",
              },
              {
                titleKey: "contextIsKing.typeConstraintsTitle",
                defaultTitle: "Constraints and Specifics",
                textKey: "contextIsKing.typeConstraintsText",
                defaultText:
                  "Include any limitations or specific details. Examples: 'Keep it under 200 words,' 'Include the keyword \"sustainable energy,\"' 'Avoid jargon,' 'Focus on benefits A, B, and C.'",
              },
              {
                titleKey: "contextIsKing.typeExamplesTitle",
                defaultTitle: "Examples (Few-Shot Prompting)",
                textKey: "contextIsKing.typeExamplesText",
                defaultText:
                  "Providing one or more examples of the desired input/output can significantly guide the AI. This is known as 'few-shot prompting.'",
              },
            ].map((item, i) => (
              <motion.div
                variants={fadeInUp}
                key={i}
                className={`p-4 rounded-md ${theme.surfaceMuted} border ${theme.borderLight}`}
              >
                <h4 className={`font-semibold ${theme.textPrimary} mb-1`}>
                  {t(item.titleKey, item.defaultTitle)}
                </h4>
                <p className={`${theme.textSecondary} text-sm`}>
                  {t(item.textKey, item.defaultText)}
                </p>
              </motion.div>
            ))}
          </div>

          <SectionTitle
            t={t}
            titleKey="contextIsKing.examplesTitle"
            defaultTitle="Examples: Bad vs. Good Prompts"
            level={2}
            align="text-left"
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.examplesIntro"
            defaultText="Let's see how adding context transforms prompts."
          />

          <motion.h4
            variants={fadeInUp}
            className={`text-lg font-semibold ${theme.textPrimary} mt-6 mb-2`}
          >
            {t("contextIsKing.example1Title", "Example 1: Email Subject Line")}
          </motion.h4>
          <div className="flex items-center mb-1">
            <FiThumbsDown className={`w-5 h-5 ${theme.errorText} mr-2`} />
            <Paragraph
              t={t}
              textKey="contextIsKing.badPrompt1Label"
              defaultText="Bad Prompt:"
              className="mb-0 font-medium"
            />
          </div>
          <CodeBlock code="Write a subject line." type="bad_prompt" t={t} />

          <div className="flex items-center mb-1">
            <FiThumbsUp className={`w-5 h-5 ${theme.successText} mr-2`} />
            <Paragraph
              t={t}
              textKey="contextIsKing.goodPrompt1Label"
              defaultText="Good Prompt:"
              className="mb-0 font-medium"
            />
          </div>
          <CodeBlock
            code={t(
              "contextIsKing.goodPrompt1Text",
              "Act as an expert email marketer. Write 5 compelling subject lines for an email promoting a new line of eco-friendly coffee beans to our existing customer base. The email's goal is to drive pre-orders. Keep them under 60 characters and use emojis if appropriate."
            )}
            type="good_prompt"
            t={t}
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.goodPrompt1Why"
            defaultText="Why it's better: It specifies the role, task (5 subject lines), product, target audience, goal (pre-orders), constraints (length), and an optional style element (emojis)."
          />

          <motion.h4
            variants={fadeInUp}
            className={`text-lg font-semibold ${theme.textPrimary} mt-8 mb-2`}
          >
            {t("contextIsKing.example2Title", "Example 2: Blog Post Idea")}
          </motion.h4>
          <div className="flex items-center mb-1">
            <FiThumbsDown className={`w-5 h-5 ${theme.errorText} mr-2`} />
            <Paragraph
              t={t}
              textKey="contextIsKing.badPrompt2Label"
              defaultText="Bad Prompt:"
              className="mb-0 font-medium"
            />
          </div>
          <CodeBlock code="Blog post about AI." type="bad_prompt" t={t} />

          <div className="flex items-center mb-1">
            <FiThumbsUp className={`w-5 h-5 ${theme.successText} mr-2`} />
            <Paragraph
              t={t}
              textKey="contextIsKing.goodPrompt2Label"
              defaultText="Good Prompt:"
              className="mb-0 font-medium"
            />
          </div>
          <CodeBlock
            code={t(
              "contextIsKing.goodPrompt2Text",
              "Generate three blog post title ideas and a brief (2-3 sentence) outline for each. The target audience is small business owners in Costa Rica who are new to AI. The tone should be informative, slightly informal, and encouraging, focusing on practical benefits. The overall theme is 'How AI can help your SMB save time and money.'"
            )}
            type="good_prompt"
            t={t}
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.goodPrompt2Why"
            defaultText="Why it's better: It specifies the number of ideas, format (title + outline), target audience (SMB owners in CR, new to AI), tone, and a clear theme/goal."
          />

          <InfoBox
            t={t}
            titleKey="contextIsKing.iterativeTipTitle"
            defaultTitle="Tip: Prompting is Iterative!"
            type="tip"
          >
            <p>
              {t(
                "contextIsKing.iterativeTipText",
                "Don't expect the perfect response on your first try. Start with a decent prompt, see what the AI generates, and then refine your prompt by adding more context, clarifying instructions, or providing examples based on the output. It's a conversation!"
              )}
            </p>
          </InfoBox>

          <SectionTitle
            t={t}
            titleKey="contextIsKing.example3Title"
            defaultTitle="Getting Help with Code (Structural Context)"
            level={2}
            align="text-left"
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.example3Intro"
            defaultText="When asking an AI for help with a coding problem, providing the structure of your project can be incredibly beneficial. Tools like 'gptree' can generate a text-based representation of your project's file system."
          />

          <div className="flex items-center mb-1">
            <FiThumbsDown className={`w-5 h-5 ${theme.errorText} mr-2`} />
            <Paragraph
              t={t}
              textKey="contextIsKing.badPrompt3Label"
              defaultText="Bad Prompt (Lacks Project Context):"
              className="mb-0 font-medium"
            />
          </div>
          <CodeBlock
            code={t(
              "contextIsKing.badPrompt3Text",
              "I have an error in my React component. It says 'Cannot read property 'map' of undefined'. How do I fix it?"
            )}
            type="bad_prompt"
            t={t}
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.badPrompt3Why"
            defaultText="Why it's less effective: The AI has no idea where this component lives, what props it receives, or how it interacts with other parts of your application."
          />

          <div className="flex items-center mb-1 mt-6">
            <FiThumbsUp className={`w-5 h-5 ${theme.successText} mr-2`} />
            <Paragraph
              t={t}
              textKey="contextIsKing.goodPrompt3Label"
              defaultText="Good Prompt (With Project Structure Context):"
              className="mb-0 font-medium"
            />
          </div>
          <CodeBlock
            code={t(
              "contextIsKing.goodPrompt3Text",
              `I'm getting an error "Cannot read property 'map' of undefined" in my React application.
Here's the relevant part of my project structure (generated by a tool like gptree):
\`\`\`
# Project Directory Structure:
.
├── src/
│   ├── components/
│   │   └── ProductList.js  <--- The error is likely here
│   ├── data/
│   │   └── products.js     <--- This file should export an array of products
│   └── App.js              <--- ProductList is used here
\`\`\`

And here's a snippet from ProductList.js:
\`\`\`javascript
// src/components/ProductList.js
function ProductList({ products }) {
  return (
    <ul>
      {products.map(product => <li key={product.id}>{product.name}</li>)}
    </ul>
  );
}
export default ProductList;
\`\`\`
I suspect 'products' might be undefined when ProductList renders. How can I best debug this and ensure 'products' is always an array, possibly fetching from src/data/products.js in App.js?`
            )}
            type="good_prompt"
            t={t}
            language="markdown" // Since it includes mixed content
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.goodPrompt3Why"
            defaultText="Why it's much better: By providing the file structure (even a simplified version) and the relevant code snippet, the AI can immediately understand the relationships between files. It can infer that 'products.js' is likely the data source and that 'App.js' is responsible for passing the 'products' prop. This allows for much more targeted and accurate debugging advice."
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.gptreeNote"
            defaultText="Tools like 'gptree' are excellent for quickly generating this kind of structural context for your projects, making it easier to get effective help from AI coding assistants or when sharing project overviews."
            className="text-sm italic mt-3"
          />

          <SectionTitle
            t={t}
            titleKey="contextIsKing.conclusionTitle"
            defaultTitle="Conclusion: Become a Context Master"
            level={2}
            align="text-left"
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.conclusionP1"
            defaultText="Providing clear, comprehensive context is the most impactful way to improve your interactions with LLMs. By thinking about the <Highlight>role, audience, goal, format, tone, constraints, relevant examples, and even the structural layout of your project (like a file tree)</Highlight>, you transform your prompts from vague requests into precise instructions."
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.conclusionP2"
            defaultText="Whether you're drafting marketing copy, brainstorming ideas, or seeking help with technical challenges, rich context empowers the AI to act as a more effective and insightful partner. This leads to higher quality outputs, fewer iterations, and ultimately, saves you valuable time."
          />
          <Paragraph
            t={t}
            textKey="contextIsKing.conclusionP3"
            defaultText="Practice makes perfect! Start consciously incorporating these contextual elements into your prompts. Observe how the AI's responses change and refine your approach. Soon, you'll be crafting prompts that unlock the full potential of your AI assistants."
          />

          <motion.div
            variants={fadeInUp}
            className="mt-12 pt-8 border-t ${theme.borderLight} text-center"
          >
            <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-3`}>
              {t(
                "contextIsKing.ctaTitle",
                "Want to Practice Your Prompting Skills?"
              )}
            </h3>
            <Paragraph
              t={t}
              textKey="contextIsKing.ctaText"
              defaultText="Try our AI tools within LoyalShift Studio, designed to help SMBs like yours leverage AI for content creation and more. Or, set up Ollama locally to experiment freely!"
              className="max-w-xl mx-auto"
            />
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/smb/features"
                className={`inline-flex items-center justify-center px-6 py-3 text-base font-medium ${theme.buttonPrimaryBg} ${theme.buttonTextLight} rounded-md shadow-sm ${theme.buttonPrimaryHoverBg} transition-colors ${theme.focusRingDefault}`}
              >
                {t(
                  "contextIsKing.ctaButtonStudio",
                  "Explore Studio AI Features"
                )}
              </Link>
              <Link
                to="/smb/resources/guide/ollama-setup"
                className={`inline-flex items-center justify-center px-6 py-3 text-base font-medium ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} rounded-md shadow-sm border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryHoverBg} transition-colors ${theme.focusRingDefault}`}
              >
                {t("contextIsKing.ctaButtonOllama", "Ollama Setup Guide")}
              </Link>
            </div>
          </motion.div>
        </motion.article>
      </main>
    </div>
  );
}

SMBContextIsKingBlogPage.propTypes = {
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
  isLead: PropTypes.bool,
};
CodeBlock.propTypes = {
  t: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  captionKey: PropTypes.string,
  defaultCaption: PropTypes.string,
  type: PropTypes.oneOf(["prompt", "good_prompt", "bad_prompt"]),
};
InfoBox.propTypes = {
  t: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  titleKey: PropTypes.string,
  defaultTitle: PropTypes.string,
  type: PropTypes.oneOf(["info", "warning", "success", "tip"]),
};
