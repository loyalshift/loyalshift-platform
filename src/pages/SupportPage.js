// src/pages/SupportPage.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageCircle,
  FiHelpCircle,
  FiBookOpen,
  FiSend,
  FiLoader,
  FiUser,
  FiCpu,
  FiMessageSquare,
  FiExternalLink,
  FiChevronDown,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// Assuming these components are correctly defined and styled or accept theme props
import { useLocalization } from "../components/LocalizationContext"; // Adjust path
import loyalShiftV2Theme from "../themes/loyalshift-v2.theme"; // Adjust path
import Button from "../components/Button"; // Adjust path

const theme = loyalShiftV2Theme;

// --- Animation Settings ---
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// --- Reusable Components ---
const SectionWrapper = ({
  children,
  className = "",
  bg = theme.background,
  id,
}) => (
  <motion.section
    id={id}
    className={`py-16 md:py-20 ${bg} ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={viewportSettings}
    variants={staggerContainer}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </motion.section>
);

const SectionTitle = ({
  t,
  titleKey,
  subtitleKey,
  defaultTitle,
  defaultSubtitle,
  align = "text-center",
  className = "",
}) => (
  <motion.div
    className={`mb-12 md:mb-16 ${align} ${className}`}
    variants={fadeInUp}
  >
    {subtitleKey && (
      <p
        className={`text-base font-semibold ${theme.textHighlight} uppercase tracking-wider mb-3`}
      >
        {t(subtitleKey, defaultSubtitle)}
      </p>
    )}
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl font-bold ${theme.textPrimary}`}
    >
      {t(titleKey, defaultTitle)}
    </h2>
  </motion.div>
);

const ChatMessage = ({ message, isUser }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}
  >
    <div className={`flex items-end max-w-[85%]`}>
      {!isUser && (
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full ${theme.accentCyanBg}/20 ${theme.textHighlight} flex items-center justify-center mr-3 shadow-sm`}
        >
          <FiCpu className="w-4 h-4" />
        </div>
      )}
      <div
        className={`px-4 py-3 rounded-xl ${
          isUser
            ? `${theme.accentCyanBg} ${theme.buttonTextLight} rounded-br-none`
            : `${theme.surfaceMuted} ${theme.textPrimary} border ${theme.borderLight} rounded-bl-none`
        } shadow-md`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
      {isUser && (
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full ${theme.surfaceMuted} ${theme.textSecondary} flex items-center justify-center ml-3 border ${theme.borderLight} shadow-sm`}
        >
          <FiUser className="w-4 h-4" />
        </div>
      )}
    </div>
  </motion.div>
);

const SupportResourceCard = ({
  t,
  icon: Icon,
  titleKey,
  descriptionKey,
  buttonKey,
  link,
  defaultTitle,
  defaultDescription,
  defaultButtonText,
}) => (
  <motion.div
    variants={fadeInUp}
    className={`${theme.surfaceCard} p-6 rounded-xl border ${theme.border} ${theme.cardShadow} ${theme.cardHoverShadow} transition-shadow flex flex-col h-full`}
  >
    <div
      className={`${theme.accentCyanBg}/10 p-3 rounded-lg text-cyan-600 inline-flex mb-4`}
    >
      <Icon className={`w-6 h-6 ${theme.textHighlight}`} />
    </div>
    <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-2`}>
      {t(titleKey, defaultTitle)}
    </h3>
    <p className={`${theme.textSecondary} text-sm mb-6 flex-grow`}>
      {t(descriptionKey, defaultDescription)}
    </p>
    <Button
      to={link}
      variant="outline"
      size="sm"
      className={`mt-auto w-full !border-2 !${theme.accentCyan} !${theme.accentCyan} hover:!bg-cyan-500/10`}
      icon={<FiExternalLink className="ml-1.5 w-3.5 h-3.5" />}
    >
      {t(buttonKey, defaultButtonText)}
    </Button>
  </motion.div>
);

export default function SupportPage() {
  const { t } = useLocalization();
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: Date.now(),
      text: t(
        "supportPage.chatbotWelcomeMessage",
        "Hello! I'm the LoyalShift AI Assistant. How can I help you today regarding our solutions or public data?"
      ),
      sender: "ai",
    },
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [chatMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageText = userInput.trim();
    if (!messageText) return;

    const newUserMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
    };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserInput("");
    setIsAiTyping(true);

    let chatHistoryForAPI = chatMessages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const systemInstruction = `You are the LoyalShift AI Support Assistant. Your knowledge is based on LoyalShift's public data and solutions (Smart Mirror, Universal Adapter, Audit Guardian, AI Insights Engine, Agent Hub, CipherForge, BIM Lab, Asset Exchange/Bid Portal, SMB Studio). Be helpful, concise, and professional. If you cannot answer or if the query is account-specific or too complex, politely direct the user to submit a support ticket or check documentation. Do not invent information. Current date: ${new Date().toLocaleDateString()}.`;

    const currentTurnContents = [
      ...chatHistoryForAPI.slice(-6),
      {
        role: "user",
        parts: [
          { text: systemInstruction + "\n\nUser question: " + messageText },
        ],
      },
    ];

    const payload = { contents: currentTurnContents };
    const apiKey = ""; // IMPORTANT: Replace with your API key or use a backend proxy
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Data:", errorData);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();

      let aiResponseText = t(
        "supportPage.chatbotError",
        "Sorry, I encountered an issue. Please try again or contact human support."
      );
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        aiResponseText = result.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected API response structure:", result);
      }

      const newAiMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: "ai",
      };
      setChatMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorAiMessage = {
        id: Date.now() + 1,
        text: t("supportPage.chatbotError"),
        sender: "ai",
      };
      setChatMessages((prev) => [...prev, errorAiMessage]);
      toast.error(t("supportPage.chatbotError"));
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <div className={`${theme.background} min-h-screen pt-16 pb-20`}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: `rounded-md ${theme.surfaceCard} ${theme.textPrimary} shadow-lg border ${theme.border}`,
          success: {
            iconTheme: {
              primary: theme.successText.replace("text-", ""),
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: theme.errorText.replace("text-", ""),
              secondary: "white",
            },
          },
        }}
      />

      {/* Hero Section */}
      <SectionWrapper bg={theme.background}>
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeInUp}
            className={`inline-flex p-4 ${theme.accentCyanBg}/10 rounded-full mb-6`}
          >
            <FiMessageCircle className={`w-10 h-10 ${theme.textHighlight}`} />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className={`text-4xl md:text-5xl font-extrabold ${theme.textPrimary} mb-4`}
          >
            {t("supportPage.mainTitle", "LoyalShift Support Center")}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className={`text-lg ${theme.textSecondary} max-w-3xl mx-auto`}
          >
            {t(
              "supportPage.mainSubtitle",
              "Get help with our solutions, explore resources, or connect with our support team."
            )}
          </motion.p>
        </motion.div>
        <div ref={chatEndRef} />
      </SectionWrapper>

      {/* AI Chat Assistant */}
      <SectionWrapper bg={theme.background} className="pt-0 md:pt-0">
        <motion.div
          variants={fadeInUp}
          className={`max-w-4xl mx-auto ${theme.surfaceCard} rounded-2xl ${theme.cardShadow} border ${theme.borderLight} overflow-hidden`}
        >
          <div
            className={`p-5 border-b ${theme.borderLight} flex items-center space-x-3 ${theme.surfaceMuted}`}
          >
            <FiCpu className={`w-7 h-7 ${theme.textHighlight}`} />
            <div>
              <h2 className={`text-xl font-semibold ${theme.textPrimary}`}>
                {t("supportPage.chatbotTitle", "Ask Our AI Assistant")}
              </h2>
              <p className={`text-xs ${theme.textMuted}`}>
                {t(
                  "supportPage.chatbotIntro",
                  "Powered by Gemini - Available 24/7"
                )}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 h-[500px] flex flex-col">
            <div className="flex-grow overflow-y-auto pr-2 space-y-4 mb-4 custom-scrollbar">
              <AnimatePresence initial={false}>
                {chatMessages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    isUser={msg.sender === "user"}
                  />
                ))}
              </AnimatePresence>

              {isAiTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end max-w-[85%]">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full ${theme.accentCyanBg}/20 ${theme.textHighlight} flex items-center justify-center mr-3 shadow-sm`}
                    >
                      {" "}
                      <FiCpu className="w-4 h-4" />{" "}
                    </div>
                    <div
                      className={`px-4 py-3 rounded-xl ${theme.surfaceMuted} ${theme.textMuted} border ${theme.borderLight} rounded-bl-none shadow-sm text-sm`}
                    >
                      <span className="animate-pulse">
                        {t(
                          "supportPage.chatbotTyping",
                          "AI Assistant is typing..."
                        )}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="mt-auto pt-4 border-t ${theme.borderLight}"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={t(
                    "supportPage.chatbotInputPlaceholder",
                    "Type your question here..."
                  )}
                  className={`flex-grow px-4 py-2.5 ${theme.inputBg} ${theme.inputBorder} rounded-lg shadow-sm ${theme.inputFocusStyle} ${theme.textPrimary} sm:text-sm transition-colors`}
                  disabled={isAiTyping}
                />
                <Button
                  type="submit"
                  disabled={isAiTyping || !userInput.trim()}
                  className={`${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg} !py-2.5 !px-5 shadow-md hover:shadow-lg`}
                  aria-label={t("supportPage.chatbotSendButton")}
                >
                  {isAiTyping ? (
                    <FiLoader className="w-5 h-5 animate-spin" />
                  ) : (
                    <FiSend className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </form>

            {/* Quick Action Buttons Below Chat */}
            <motion.div
              className="mt-4 pt-4 border-t ${theme.borderLight} flex flex-wrap justify-center gap-2 sm:gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                to="/faq"
                variant="text"
                size="xs" // Assuming your Button component can take a very small size or use custom classes
                className={`!${theme.buttonTextLink} !${theme.buttonTextLinkHover} !px-3 !py-1.5 !text-xs sm:!text-sm`}
                icon={<FiHelpCircle className="w-3.5 h-3.5 mr-1" />}
              >
                {t("supportPage.quickActionFAQ", "View FAQs")}
              </Button>
              <Button
                to="/docs"
                variant="text"
                size="xs"
                className={`!${theme.buttonTextLink} !${theme.buttonTextLinkHover} !px-3 !py-1.5 !text-xs sm:!text-sm`}
                icon={<FiBookOpen className="w-3.5 h-3.5 mr-1" />}
              >
                {t("supportPage.quickActionDocs", "Read Docs")}
              </Button>
              <Button
                to="/contact?form=support"
                variant="text"
                size="xs"
                className={`!${theme.buttonTextLink} !${theme.buttonTextLinkHover} !px-3 !py-1.5 !text-xs sm:!text-sm`}
                icon={<FiMessageSquare className="w-3.5 h-3.5 mr-1" />}
              >
                {t("supportPage.quickActionTicket", "Open Ticket")}
              </Button>
            </motion.div>

            <p className={`text-xs ${theme.textMuted} mt-4 text-center`}>
              {t("supportPage.chatbotDisclaimer")}
            </p>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Additional Help Section */}
      <SectionWrapper bg={theme.background}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            className={`text-2xl font-bold ${theme.textPrimary} mb-4`}
          >
            {t("supportPage.needMoreHelp", "Need More Direct Help?")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className={`${theme.textSecondary} mb-6`}
          >
            {t(
              "supportPage.contactUs",
              "Our support team is available Monday-Friday, 9am-5pm (CST/GMT-6)."
            )}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              to="/contact"
              variant="primary"
              size="lg"
              className={`min-w-[200px] ${theme.buttonPrimaryBg} ${theme.buttonPrimaryText} ${theme.buttonPrimaryHoverBg}`}
            >
              {t("supportPage.contactButton", "Contact Support Team")}
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
