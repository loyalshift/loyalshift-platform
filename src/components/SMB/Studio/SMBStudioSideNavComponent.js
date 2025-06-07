// src/components/smb/studio/SMBStudioSideNavComponent.js
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalization } from "../../LocalizationContext"; // Ensure this path is correct
import loyalShiftV2Theme from "../../../themes/loyalshift-v2.theme";

const theme = loyalShiftV2Theme;

// --- Placeholder Icons (Heroicons or similar) ---
const IconDashboard = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);
const IconBlog = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6.253v11.494m0 0a2.373 2.373 0 01-2.25-2.25H9.75A2.25 2.25 0 017.5 15.5V6.253m4.5 11.494a2.373 2.373 0 002.25-2.25h.003A2.25 2.25 0 0016.5 15.5V6.253m-4.5 11.494V6.253"
    />
  </svg>
);
const IconAssets = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const IconAnalytics = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
    />
  </svg>
);
const IconSettings = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const IconCalendar = () => (
  // Added Calendar Icon
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const IconChevronDown = () => (
  <svg
    className="w-4 h-4 transition-transform duration-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
// --- END OF ICONS ---

const NavItem = ({
  to,
  icon,
  tKeyLabel,
  defaultLabel,
  exact = false,
  onClick,
}) => {
  const { t } = useLocalization();
  const baseClasses = `flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out w-full`;
  const activeClasses = `${theme.accentCyanBg}/10 dark:${theme.accentCyanBg}/20 ${theme.accentCyan} dark:text-cyan-300 font-semibold`;
  const inactiveClasses = `${theme.textSecondary} dark:text-slate-300 hover:${theme.surfaceMuted} dark:hover:bg-slate-700 hover:${theme.textPrimary} dark:hover:text-white`;

  if (!to) {
    return (
      <button onClick={onClick} className={`${baseClasses} ${inactiveClasses}`}>
        {icon}
        <span>{t(tKeyLabel, defaultLabel)}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      end={exact}
      onClick={onClick}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {icon}
      <span>{t(tKeyLabel, defaultLabel)}</span>
    </NavLink>
  );
};

const CollapsibleNavItem = ({ icon, tKeyLabel, defaultLabel, children }) => {
  const { t } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out w-full ${theme.textSecondary} dark:text-slate-300 hover:${theme.surfaceMuted} dark:hover:bg-slate-700 hover:${theme.textPrimary} dark:hover:text-white`}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span>{t(tKeyLabel, defaultLabel)}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <IconChevronDown />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="pl-6 mt-1 space-y-1 overflow-hidden" // overflow-hidden is good here for the animation
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function SMBStudioSideNavComponent() {
  const { t } = useLocalization(); // Assuming t might be used elsewhere or for consistency
  // Main navigation structure
  const mainNavLinks = [
    // {
    //   to: "/smb/studio",
    //   icon: <IconDashboard />,
    //   tKeyLabel: "smbStudioNav.dashboard",
    //   defaultLabel: "Dashboard",
    //   exact: true,
    // },
    {
      to: "/smb/studio/community",
      icon: <IconDashboard />,
      tKeyLabel: "smbStudioNav.community",
      defaultLabel: "Community Hub",
      exact: true,
    },
    // {
    //   // Added Content Calendar Nav Item
    //   to: "/smb/studio/content-calendar",
    //   icon: <IconCalendar />,
    //   tKeyLabel: "smbStudioNav.contentCalendar",
    //   defaultLabel: "Content Calendar",
    // },
    // {
    //   isCollapsible: true,
    //   icon: <IconBlog />,
    //   tKeyLabel: "smbStudioNav.blog",
    //   defaultLabel: "Blog",
    //   subItems: [
    //     {
    //       to: "/smb/studio/blog",
    //       icon: <span className="w-5 h-5 text-center">-</span>,
    //       tKeyLabel: "smbStudioNav.allPosts",
    //       defaultLabel: "Blog Management",
    //       exact: true,
    //     },
    //     {
    //       to: "/smb/studio/blog/new",
    //       icon: <span className="w-5 h-5 text-center">-</span>,
    //       tKeyLabel: "smbStudioNav.addNewPost",
    //       defaultLabel: "Add New",
    //     },
    //   ],
    // },
    // {
    //   to: "/smb/studio/assets",
    //   icon: <IconAssets />,
    //   tKeyLabel: "smbStudioNav.assetLibrary",
    //   defaultLabel: "Asset Library",
    // },
    // {
    //   to: "/smb/studio/analytics",
    //   icon: <IconAnalytics />,
    //   tKeyLabel: "smbStudioNav.analytics",
    //   defaultLabel: "Analytics",
    // },
  ];

  const bottomNavLinks = [
    {
      to: "/smb/studio/settings",
      icon: <IconSettings />,
      tKeyLabel: "smbStudioNav.settings",
      defaultLabel: "Settings",
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 w-64 h-screen ${theme.surface} dark:bg-slate-800 border-r ${theme.borderLight} dark:border-slate-700 flex flex-col p-4 space-y-2`}
      style={{
        zIndex: 40, // Ensure it stays above other content
      }}
    >
      <div className="flex items-center">
        <Link to="/smb" className="flex items-center group">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-400 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 transition-all duration-300 ease-out group-hover:rotate-[12deg] group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg sm:text-xl font-bold ${theme.headerDark.textPrimary} group-hover:${theme.headerDark.textAccent} transition-colors`}
              >
                LoyalShift
              </span>
              <span className="text-xs font-medium bg-gradient-to-r from-cyan-500 to-teal-400 bg-clip-text text-transparent">
                SMB Solutions
              </span>
            </div>
          </div>
        </Link>
      </div>
      <nav className="flex-grow space-y-1 overflow-y-auto">
        {mainNavLinks.map((item, index) =>
          item.isCollapsible ? (
            <CollapsibleNavItem
              key={index}
              icon={item.icon}
              tKeyLabel={item.tKeyLabel}
              defaultLabel={item.defaultLabel}
            >
              {item.subItems.map((subItem) => (
                <NavItem key={subItem.tKeyLabel} {...subItem} />
              ))}
            </CollapsibleNavItem>
          ) : (
            <NavItem key={index} {...item} />
          )
        )}
      </nav>
      <div className="mt-auto pt-2 border-t border-[#d4d2cb]/20 dark:border-slate-700/50 space-y-1">
        {bottomNavLinks.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </div>
    </aside>
  );
}
