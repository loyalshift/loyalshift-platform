// src/pages/Girya/GiryaDemoIntroPage.js // Save this code with this filename

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi"; // Using a simple loader icon

// Assuming the earthy color palette is accessible via Tailwind classes
// or you can define/import it here if needed for specific styling not covered by utilities.

// --- Simple Animations ---
const loaderAnimation = {
  animate: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
  },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

// --- Component ---
export default function GiryaDemoIntroPage() {
  const navigate = useNavigate();

  // Automatically redirect after a short delay
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      console.log(
        "Demo Intro animation complete, redirecting to consent page."
      );
      navigate("/demo/girya/consent"); // Redirect to the consent page
    }, 2000); // Redirect after 2 seconds (adjust as needed)

    return () => clearTimeout(redirectTimer); // Cleanup the timer
  }, [navigate]); // Dependency array includes navigate

  return (
    // Full screen container with minimal styling
    <motion.div
      className="flex items-center justify-center min-h-screen bg-stone-100 text-stone-800" // Using earthy colors
      {...fadeIn} // Apply fade-in animation to the whole page
    >
      <div className="text-center">
        {/* Optional: Display a logo or simple message */}
        {/* <img src={giryaLogoUrl} alt="Girya Logo" className="w-16 h-16 mx-auto mb-4"/> */}

        <motion.div
          className="inline-block"
          {...loaderAnimation} // Apply rotation animation
        >
          <FiLoader className="w-12 h-12 text-emerald-700" />{" "}
          {/* Loader icon with accent color */}
        </motion.div>

        <p className="mt-4 text-lg">Loading demo experience...</p>
      </div>
    </motion.div>
  );
}
