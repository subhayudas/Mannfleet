"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PDF = "/legal/Policy-on-Identification-of-Group-Companies-Subsidiaries-Material-Creditors-and-Material-Litigations_Mann.pdf";
const TITLE = "Policy on Identification of Group Companies, Subsidiaries, Material Creditors and Material Litigations";

export default function PrivacyPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "var(--bg-base)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "var(--bg-deep)", borderBottom: "1px solid var(--border-subtle)", padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem) clamp(2.5rem, 6vw, 4rem)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", color: "var(--text-40)", textTransform: "uppercase", marginBottom: "1rem" }}>
            Legal
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, margin: "0 0 1rem", letterSpacing: "-0.025em" }}>
            {TITLE}
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-45)", margin: 0 }}>
            Mann Fleet Partners Limited
          </p>
        </div>
      </div>

      {/* PDF viewer */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 6vw, 4rem)" }}>
        <div style={{ marginBottom: "1.25rem", display: "flex", justifyContent: "flex-end" }}>
          <a
            href={PDF}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 600, color: "var(--accent)",
              textDecoration: "none", padding: "8px 16px",
              border: "1px solid var(--accent)", borderRadius: 999,
            }}
          >
            Open PDF in new tab
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
        <iframe
          src={PDF}
          title={TITLE}
          style={{
            width: "100%",
            height: "min(85vh, 1100px)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 12,
            background: "#fff",
          }}
        />
      </div>

      <Footer />
    </div>
  );
}
