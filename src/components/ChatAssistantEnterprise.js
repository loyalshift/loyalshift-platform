// src/components/ChatAssistantEnterprise.js
// Complete and functional component with mobile responsiveness.

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiX,
  FiSend,
  FiClock,
  FiBarChart2,
  FiShield,
  FiBookOpen,
  FiDownload,
} from "react-icons/fi";

// Define colors consistent with LandingPage (or import if centralized)
// Ensure these color class names correspond to your Tailwind config
const colors = {
  background: "bg-slate-900", // Example, adjust if needed
  surface: "bg-slate-800",    // Primary surface for chat container
  surfaceMuted: "bg-slate-700", // Slightly darker surface for messages/inputs
  surfaceLighter: "bg-slate-600", // For hover states or accents
  primaryGradient: "bg-gradient-to-r from-blue-600 to-cyan-500", // Header, User Messages, Buttons
  primaryHover: "hover:from-blue-500 hover:to-cyan-400", // Hover for primary elements
  border: "border-slate-700",    // Main borders
  borderMuted: "border-slate-600", // Input borders
  borderAccent: "border-blue-500/40", // Accent border (e.g., quick action hover)
  textPrimary: "text-slate-100",  // Main light text
  textSecondary: "text-slate-400", // Muted text (timestamps, placeholders)
  textHighlight: "text-blue-300",  // For highlighting links or icons
  textWhite: "text-white",       // For buttons or headers
  accentBlue: "text-blue-400",    // Icon colors
  accentCyan: "text-cyan-400",    // Icon colors
  inputFocusRing: "focus:ring-blue-500/70", // Focus ring for inputs
};

const ChatAssistantEnterprise = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your LoyalShift AI assistant. How can I help with your modernization strategy today?",
      sender: "bot",
      timestamp: new Date(),
      type: "greeting", // Custom type for potential special handling
      action: null,     // No action on initial greeting
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Bot typing indicator state
  const messagesEndRef = useRef(null); // Ref to scroll to bottom

  // Define quick action buttons data
  const quickActions = [
    { label: "ROI Estimate", icon: <FiBarChart2 className={`w-4 h-4 ${colors.accentBlue}`} />, query: "Generate an ROI estimate for modernizing our legacy systems" },
    { label: "Implementation Plan", icon: <FiClock className={`w-4 h-4 ${colors.accentBlue}`} />, query: "Outline a phased implementation plan for our ERP modernization" },
    { label: "Security Details", icon: <FiShield className={`w-4 h-4 ${colors.accentBlue}`} />, query: "Explain the security protocols for data migration" },
    { label: "Case Studies", icon: <FiBookOpen className={`w-4 h-4 ${colors.accentBlue}`} />, query: "Show relevant case studies in the banking sector" },
  ];

  // Function to scroll message list to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle sending a user message
  const handleSend = (e) => {
    e.preventDefault(); // Prevent form submission from reloading page
    if (!inputValue.trim()) return; // Don't send empty messages

    // Create the new user message object
    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      action: null, // User messages don't have actions
    };

    // Update messages state, clear input, show typing indicator
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // --- Simulate Bot Response ---
    // Replace this setTimeout with your actual API call to a backend/LLM
    setTimeout(() => {
      // Example responses (replace with actual logic)
      const responses = [
        "Based on your query, I recommend reviewing our modernization framework document first.",
        "For that request, I'll connect you with our solutions architect who specializes in banking systems.",
        "Our typical implementation for similar enterprises takes 3-6 months with a 65-85% efficiency gain, depending on complexity.",
        "I've generated a preliminary report based on industry benchmarks. You can download it below.",
        "That's an interesting question. Can you provide a bit more detail about your current system architecture?",
        "Regarding security, we adhere to SOC2 Type II standards and offer options for private cloud deployments.",
      ];

      // Create the bot response object
      const botResponse = {
        id: Date.now() + 1, // Ensure unique ID
        text: responses[Math.floor(Math.random() * responses.length)], // Pick random response
        sender: "bot",
        timestamp: new Date(),
        // Randomly add a download action for demonstration
        action:
          Math.random() > 0.7
            ? {
                type: "document",
                label: "Download Modernization Guide",
                icon: <FiDownload className="w-3 h-3" />, // Use appropriate icon size
              }
            : null,
      };

      // Update messages state with bot response and hide typing indicator
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Simulate variable delay
    // --- End Simulate Bot Response ---
  };

  // Handle clicking a quick action button
  const handleQuickAction = (query) => {
    setInputValue(query); // Set input field value to the query
    // Focus the input field shortly after to allow immediate sending or editing
    setTimeout(() => {
        const inputElement = document.getElementById("chat-input");
        inputElement?.focus();
        // Optionally, immediately send the message after clicking quick action:
        // if (inputElement) {
        //     // Create and dispatch a submit event on the form
        //     const formElement = inputElement.closest('form');
        //     if (formElement) {
        //         // Need to set the value just before submitting if state update hasn't occurred
        //         inputElement.value = query;
        //         formElement.requestSubmit(); // Modern way to submit form programmatically
        //     }
        // }
    }, 100);
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Animation variants for the chat window expand/collapse
  // Size is controlled by utility classes, variants handle animation props
  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    expanded: {
      opacity: 1,
      scale: 1,
      borderRadius: "0.75rem", // rounded-xl
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  // Animation variants for individual messages appearing
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // Fixed container positioning responds to screen size
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">

      {/* Floating trigger button - Only shown when chat is closed */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          // Responsive button styling
          className={`flex items-center gap-2 ${colors.primaryGradient} ${colors.textWhite} px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-xl ${colors.primaryHover} transition-all duration-300 hover:shadow-cyan-500/30`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .5 }}
          aria-expanded="false"
          aria-label="Open Enterprise Assistant Chat"
        >
          <FiMessageSquare />
          {/* Text label hidden on small screens */}
          <span className="hidden sm:inline">Enterprise Assistant</span>
        </motion.button>
      )}

      {/* Chat container - Animates presence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Responsive container styling (size and position)
            className={`
              fixed bottom-4 inset-x-4 h-[80vh] max-h-[600px] /* Mobile: near full width/height */
              sm:absolute sm:bottom-0 sm:right-0 sm:inset-x-auto sm:h-[500px] sm:w-[380px] sm:max-h-none /* Desktop: Fixed size/pos */
              ${colors.surface} shadow-xl shadow-black/30 rounded-xl overflow-hidden flex flex-col border ${colors.border} bg-opacity-95 backdrop-blur-lg
            `}
            variants={containerVariants}
            initial="initial"
            animate="expanded"
            exit="exit"
            aria-modal="true"
            role="dialog"
            aria-labelledby="chat-header-title"
          >
            {/* Chat Header */}
            <div className={`${colors.primaryGradient} p-3 sm:p-4 ${colors.textWhite} flex justify-between items-center flex-shrink-0`} >
              <div className="flex items-center gap-2">
                <FiMessageSquare className="text-lg sm:text-xl" />
                <h3 id="chat-header-title" className="font-semibold text-sm sm:text-base">Enterprise Assistant</h3>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-full hover:bg-black/20 transition-colors" aria-label="Close chat">
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body - Scrollable */}
            <div className={`flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 ${colors.surface}`} >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial="hidden"
                  animate="visible"
                  variants={messageVariants}
                  transition={{ duration: 0.3 }}
                  className={`flex ${ message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {/* Message Bubble */}
                  <div className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 shadow-sm ${ message.sender === "user" ? `${colors.primaryGradient} ${colors.textWhite} rounded-br-none` : `${colors.surfaceMuted} ${colors.textPrimary} rounded-bl-none` }`} >
                    {/* Message Text */}
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p> {/* Added whitespace-pre-wrap */}
                    {/* Timestamp */}
                    <p className={`text-xs mt-1 ${ message.sender === "user" ? "text-blue-200 text-right" : `${colors.textSecondary} text-left`}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    {/* Action Button (if present on bot message) */}
                    {message.action && (
                       <motion.button
                         whileHover={{ scale: 1.03, backgroundColor: "rgba(71, 85, 105, 0.8)" }} // Example hover effect
                         whileTap={{ scale: 0.97 }}
                         onClick={() => alert('Download action clicked!')} // Placeholder action
                         className={`mt-2 flex items-center gap-1 text-xs font-medium ${colors.surfaceLighter} ${colors.textHighlight} px-3 py-1 rounded-full transition-colors border ${colors.borderMuted} hover:${colors.borderAccent}`}
                       >
                         {message.action.icon}
                         {message.action.label}
                       </motion.button>
                     )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start" >
                  <div className={`${colors.surfaceMuted} ${colors.textPrimary} rounded-lg rounded-bl-none px-4 py-2 inline-block`} >
                    <div className="flex space-x-1.5">
                      <div className={`w-2 h-2 ${colors.accentBlue} bg-current rounded-full animate-bounce`} style={{ animationDelay: "0ms" }} />
                      <div className={`w-2 h-2 ${colors.accentBlue} bg-current rounded-full animate-bounce`} style={{ animationDelay: "150ms" }} />
                      <div className={`w-2 h-2 ${colors.accentBlue} bg-current rounded-full animate-bounce`} style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              {/* Empty div to ensure scroll targets bottom */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Footer */}
            <div className={`px-3 sm:px-4 pt-2 pb-2 sm:pb-3 flex flex-wrap gap-1.5 sm:gap-2 border-t ${colors.border}`} >
              {quickActions.map((action, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -2, backgroundColor: colors.surfaceLighter, borderColor: colors.borderAccent }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAction(action.query)}
                  className={`text-xs ${colors.surfaceMuted} ${colors.textSecondary} hover:${colors.textPrimary} px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors border ${colors.borderMuted}`}
                >
                  {action.icon}
                  {action.label}
                </motion.button>
              ))}
            </div>

            {/* Input Area Footer */}
            <form onSubmit={handleSend} className={`p-2 sm:p-3 border-t ${colors.border}`} >
              <div className="flex gap-1.5 sm:gap-2">
                <input
                  id="chat-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask..."
                  className={`flex-1 text-sm sm:text-base ${colors.surfaceMuted} border ${colors.borderMuted} ${colors.textPrimary} placeholder:${colors.textSecondary} rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 ${colors.inputFocusRing} focus:${colors.borderAccent}`}
                  autoComplete="off"
                  aria-label="Chat message input"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`${colors.primaryGradient} ${colors.primaryHover} ${colors.textWhite} p-2 sm:p-2.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:shadow-cyan-500/30`}
                  aria-label="Send message"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Add PropTypes for better component documentation and error checking
ChatAssistantEnterprise.propTypes = {
  // No props currently accepted, but good practice to include if props were added
};


export default ChatAssistantEnterprise;
