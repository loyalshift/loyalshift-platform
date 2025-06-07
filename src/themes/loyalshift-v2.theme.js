const loyalShiftV2Theme = {
  // --- Base Theme Properties ---
  // Backgrounds
  background: "bg-[#FDFDFD]", // Crisper, very light off-white (almost pure white but softer)
  surface: "bg-white",       // Pure white for primary content surfaces
  surfaceMuted: "bg-[#F5F5F7]", // Very light, cool gray for muted sections or distinct panels
  surfaceCard: "bg-white",       // Explicit background for cards, often with distinct shadows
  resultsSectionBg: "bg-[#F9F9FB]", // Slightly different very light gray for result sections

  // Borders
  border: "border-[#EAEAEF]/70",   // Softer, cooler gray border
  borderLight: "border-[#EAEAEF]/40", // Even lighter/subtler variant

  // Typography
  textPrimary: "text-[#2D3748]",    // Dark, slightly desaturated blue/gray (more corporate/professional)
  textSecondary: "text-[#5A6474]",  // Medium cool gray
  textMuted: "text-[#8A94A6]",      // Lighter cool gray
  textHighlight: "text-cyan-600",   // Maintained cyan, slightly deeper for better contrast (Tailwind cyan-600: #0891b2)

  // Accents (Cyan - Refined)
  accentCyan: "text-cyan-700",      // Deeper cyan for text emphasis (Tailwind cyan-700: #0E7490)
  accentCyanBg: "bg-cyan-500",      // Maintained vibrant cyan for CTAs (Tailwind cyan-500: #06b6d4)
  accentCyanBgHover: "hover:bg-cyan-600", // Hover state for cyan backgrounds (Tailwind cyan-600: #0891b2)

  // Buttons
  buttonTextDark: "text-slate-900", // Dark text for primary buttons if needed (e.g., on lighter cyan)
  buttonTextLight: "text-white",    // Standard light text for colored buttons
  
  // Primary Button (using accent)
  buttonPrimaryBg: "bg-cyan-500",
  buttonPrimaryText: "text-white",
  buttonPrimaryHoverBg: "hover:bg-cyan-600",

  // Secondary Button (more refined neutral)
  buttonSecondaryBg: "bg-[#E2E8F0]",       // Lighter, cooler gray (Tailwind slate-200)
  buttonSecondaryText: "text-[#4A5568]",   // Darker gray text (Tailwind slate-700)
  buttonSecondaryHoverBg: "hover:bg-[#CBD5E1]", // (Tailwind slate-300)
  buttonSecondaryBorder: "border-[#E2E8F0]", // Optional: border for secondary
  buttonSecondaryHoverBorder: "hover:border-[#CBD5E1]",

  // Tertiary/Text Button
  buttonTextLink: "text-cyan-600", // For text-based buttons or links
  buttonTextLinkHover: "hover:text-cyan-700",

  // Input Fields
  inputBg: "bg-white",
  inputBorder: "border-[#CBD5E1]", // (Tailwind slate-300)
  inputFocusBorder: "focus:border-cyan-500",
  inputFocusRing: "focus:ring-2 focus:ring-cyan-500/30", // Thinner, more subtle ring

  // Status Messaging
  errorText: "text-red-600",        // (Tailwind red-600)
  errorBg: "bg-red-50",
  errorBorder: "border-red-300",

  successText: "text-green-700",    // Deeper green (Tailwind green-700)
  successBg: "bg-green-50",
  successBorder: "border-green-300",

  infoBoxBg: "bg-blue-50",          // (Tailwind blue-50)
  infoBoxText: "text-blue-700",     // (Tailwind blue-700)
  infoBoxBorder: "border-blue-300",

  warningText: "text-amber-700",    // (Tailwind amber-700)
  warningBg: "bg-amber-50",
  warningBorder: "border-amber-300",

  // UI Specific
  uploadZoneBorder: "border-slate-300", // Cooler gray
  uploadZoneHoverBorder: "hover:border-slate-400",
  cardShadow: "shadow-md", // Default shadow for cards (Tailwind shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1))
  cardHoverShadow: "hover:shadow-lg", // (Tailwind shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1))

  // --- Header Specific Theme Variations ---
  headerLight: {
    headerBg: "bg-white",               // surface
    textPrimary: "text-[#2D3748]",      // loyalShiftV2Theme.textPrimary
    textAccent: "text-cyan-600",        // loyalShiftV2Theme.textHighlight
    textMuted: "text-[#5A6474]",        // loyalShiftV2Theme.textSecondary
    border: "border-[#EAEAEF]",         // Subtle border, matches new general border
    hoverBg: "hover:bg-[#F5F5F7]",      // surfaceMuted for subtle hover
    activeButtonBg: "bg-cyan-500",      // accentCyanBg
    activeButtonText: "text-white",     // buttonTextLight
    inactiveButtonBg: "bg-transparent", // Cleaner inactive state
    inactiveButtonText: "text-[#5A6474]",// textSecondary
    menuBg: "bg-white",                 // surface
    mobileMenuBg: "bg-white",           // surface
  },

  headerDark: {
    headerBg: "bg-[#1A202C]",           // Darker, more corporate slate (Tailwind slate-900)
    textPrimary: "text-[#F7FAFC]",      // Off-white (Tailwind gray-100)
    textAccent: "text-cyan-400",        // Lighter cyan (Tailwind cyan-400: #22d3ee) for contrast
    textMuted: "text-[#A0AEC0]",        // Lighter gray (Tailwind gray-400)
    border: "border-[#2D3748]",         // (Tailwind gray-800)
    hoverBg: "hover:bg-[#2D3748]",      // (Tailwind gray-800)
    activeButtonBg: "bg-cyan-500",      // accentCyanBg
    activeButtonText: "text-white",     // buttonTextLight (was buttonTextDark, changing for consistency on accent bg)
    inactiveButtonBg: "bg-transparent", // Cleaner inactive state
    inactiveButtonText: "text-[#A0AEC0]",// textMuted on dark
    menuBg: "bg-[#1A202C]",             // Dark slate for dropdowns
    mobileMenuBg: "bg-[#1A202C]",       // Dark slate for mobile menu
  },

  // Additional modern elements
  focusRingDefault: "focus:ring-2 focus:ring-offset-1 focus:ring-cyan-500/50", // Default focus ring for accessibility
  inputFocusStyle: "focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30", // Consistent input focus
  linkStyle: "text-cyan-600 hover:text-cyan-700 hover:underline",
  tableHeaderBg: "bg-[#F9FAFB]", // Very light gray for table headers (Tailwind gray-50)
  tableRowStripeBg: "bg-[#FDFDFE]", // Almost white for striped rows, subtle difference
};

export default loyalShiftV2Theme;
