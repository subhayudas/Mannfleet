"use client";

import { useEffect, useState } from "react";

export default function ContentReveal({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Wait for LogoIntro to signal the overlay is fully gone
    const handler = () => setVisible(true);
    window.addEventListener("intro:done", handler);
    return () => window.removeEventListener("intro:done", handler);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: visible ? "opacity 0.5s ease" : "none",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      {children}
    </div>
  );
}
