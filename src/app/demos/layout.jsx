"use client";

import { useEffect } from "react";

export default function DemosLayout({ children }) {
  useEffect(() => {
    // Hide the global header and footer for demo pages
    const header = document.querySelector("body > div header, body > main header")?.closest("header")
      || document.querySelector("header");
    const footer = document.querySelector("footer");

    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";

    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  return <>{children}</>;
}
