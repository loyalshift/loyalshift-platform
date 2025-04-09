// src/components/marketing-animations/index.js
// This file acts as the central hub for marketing animations.
// It exports a map to dynamically select animations and a default placeholder.

import React from 'react';
import { FiImage } from 'react-icons/fi'; // Using FiImage for placeholder

// --- Import Individual Animation Components ---
// Import each specific animation component you create from its own file
import XaiTrustAnimation from './XaiTrustAnimation';
// import VppFlowAnimation from './VppFlowAnimation'; // Example: Import others as you create them
// import RoiGrowthAnimation from './RoiGrowthAnimation';

// --- Default Placeholder Component ---
// This component is rendered if a requested animationComponentName is not found in the map.
export const DefaultAnimationPlaceholder = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-main/10 text-neutral-main p-4 aspect-video">
        <FiImage className="w-12 h-12 opacity-50 mb-2" />
        <p className="text-sm text-center opacity-70">Animation Placeholder</p>
    </div>
);

// --- Animation Map ---
// Maps the string identifier (used in marketingEffortsData.animationComponentName)
// to the actual React component function.
export const marketingAnimationMap = {
    // Key (string) must exactly match 'animationComponentName' in your data
    XaiTrustAnimation: XaiTrustAnimation,
    // VppFlowAnimation: VppFlowAnimation, // Add mappings for other animations
    // RoiGrowthAnimation: RoiGrowthAnimation,

    // You can add more mappings here as you create new animations
};

// --- Optional: Export all components directly if needed elsewhere ---
// export { XaiTrustAnimation, VppFlowAnimation, RoiGrowthAnimation };
