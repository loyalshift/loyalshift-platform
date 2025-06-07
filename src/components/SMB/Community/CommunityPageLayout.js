// src/pages/SMB/Community/CommunityPageLayout.js
import React from 'react';
import PropTypes from 'prop-types';
import loyalShiftV2Theme from '../../../themes/loyalshift-v2.theme'; // Adjust path
import { useLocalization } from '../../LocalizationContext'; // Adjust path

const theme = loyalShiftV2Theme;

const CommunityPageLayout = ({ children, sidebarContent }) => {
  const { t } = useLocalization();

  return (
    <div className={`min-h-screen ${theme.background}`}>
      {/* Placeholder for a potential Studio-wide header if not handled by a global layout */}
      {/* <header className={`${theme.surface} p-4 shadow-md border-b ${theme.borderLight}`}>
        <h1 className={`${theme.textPrimary} text-xl font-semibold`}>{t("smbCommunity.layout.header", "SMB Community Portal")}</h1>
      </header> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {sidebarContent && (
            <aside className="w-full md:w-1/4 lg:w-1/5 md:sticky md:top-24 h-fit"> 
              {/* md:top-24 assumes header height + some padding */}
              {sidebarContent}
            </aside>
          )}
          <main className={sidebarContent ? "w-full md:w-3/4 lg:w-4/5" : "w-full"}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

CommunityPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebarContent: PropTypes.node,
};

export default CommunityPageLayout;
