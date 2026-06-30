"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
interface PdfDoc {
  label: string;
  description: string;
  file: string;
}

const BASE = "/ipo/";

const IPO_DOCS: PdfDoc[] = [
  {
    label: "Draft Red Herring Prospectus (DRHP)",
    description: "Mann Fleet Partners Limited — full draft offer document filed with the regulator.",
    file: "DRHP-Mann-Fleet-Partners-Limited.pdf",
  },
  {
    label: "Draft Abridged Prospectus",
    description: "Condensed summary of the offer, key terms, and risk factors.",
    file: "Draft-Abridged-Prospectus_Mann.pdf",
  },
];

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */
function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconExternalLink() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   PDF MODAL
══════════════════════════════════════════════════════════════ */
function PdfModal({ doc, onClose }: { doc: PdfDoc; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleClose = useCallback(() => {
    const bd = backdropRef.current;
    const card = cardRef.current;
    const tl = gsap.timeline({ onComplete: onClose });
    if (card) tl.to(card, { opacity: 0, scale: 0.92, y: 20, duration: 0.22, ease: "power2.in" }, 0);
    if (bd) tl.to(bd, { opacity: 0, duration: 0.22, ease: "power2.in" }, 0);
  }, [onClose]);

  useEffect(() => {
    if (isMobile) {
      window.open(BASE + doc.file, "_blank");
      onClose();
      return;
    }

    const bd = backdropRef.current;
    const card = cardRef.current;
    if (!bd || !card) return;

    gsap.fromTo(bd, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(card,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
    );

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMobile) return null;

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        ref={cardRef}
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-mid)",
          borderRadius: 16,
          overflow: "hidden",
          width: "min(900px, calc(100vw - 48px))",
          height: "min(85vh, 700px)",
          display: "flex", flexDirection: "column",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
          position: "relative",
        }}
      >
        {/* Header bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-deep)",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8 }}>
            <IconFile /> {doc.label}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href={BASE + doc.file}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 5,
                fontSize: 12, color: "var(--accent)",
                textDecoration: "none", padding: "6px 12px",
                border: "1px solid var(--accent)",
                borderRadius: 8, fontWeight: 600,
              }}
            >
              Open <IconExternalLink />
            </a>
            <button
              onClick={handleClose}
              style={{
                background: "var(--glass-mid)", border: "1px solid var(--border-subtle)",
                borderRadius: 8, width: 34, height: 34, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-primary)",
              }}
              aria-label="Close"
            >
              <IconClose />
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <iframe
          src={BASE + doc.file + "#toolbar=0"}
          style={{ flex: 1, border: "none", width: "100%", background: "#fff" }}
          title={doc.label}
        />
      </div>
    </div>,
    document.body
  );
}

/* ══════════════════════════════════════════════════════════════
   IPO DOC CARD
══════════════════════════════════════════════════════════════ */
function IpoCard({ doc, onClick }: { doc: PdfDoc; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.20)", duration: 0.25, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", duration: 0.25, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{
        background: "var(--glass-mid)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 16,
        padding: "26px 26px 22px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "border-color 0.2s",
      }}
    >
      <span style={{
        color: "var(--accent)",
        width: 52, height: 52, borderRadius: 12,
        background: "var(--glass-ultra)",
        border: "1px solid var(--border-subtle)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <IconFile />
      </span>
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 24, fontWeight: 400,
          color: "var(--text-primary)",
          margin: 0, lineHeight: 1.2,
        }}>
          {doc.label}
        </p>
        <p style={{
          fontSize: 14, color: "var(--text-secondary)",
          margin: "8px 0 0", lineHeight: 1.55,
        }}>
          {doc.description}
        </p>
      </div>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: 11.5, fontWeight: 700,
        color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em",
      }}>
        View Document <IconExternalLink />
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function IpoPage() {
  const [activePdf, setActivePdf] = useState<PdfDoc | null>(null);

  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroDivRef = useRef<HTMLDivElement>(null);
  const docSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ease = "power3.out";

    if (heroTitleRef.current) {
      gsap.fromTo(heroTitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease, delay: 0.1 }
      );
    }
    if (heroSubRef.current) {
      gsap.fromTo(heroSubRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease, delay: 0.3 }
      );
    }
    if (heroDivRef.current) {
      gsap.fromTo(heroDivRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease, delay: 0.5, transformOrigin: "left center" }
      );
    }

    const docCards = docSectionRef.current?.querySelectorAll<HTMLElement>(".doc-card-anim");
    if (docCards?.length) {
      gsap.fromTo(docCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease,
          stagger: 0.08,
          scrollTrigger: { trigger: docSectionRef.current, start: "top 80%" }
        }
      );
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        padding: "80px 5% 64px",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <h1
          ref={heroTitleRef}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(52px, 8vw, 100px)",
            fontWeight: 400,
            color: "var(--text-primary)",
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            opacity: 0,
          }}
        >
          IPO
        </h1>
        <div
          ref={heroDivRef}
          style={{
            height: 3, width: "100%", maxWidth: 320,
            background: "var(--accent)",
            marginTop: 18, marginBottom: 20,
            borderRadius: 2,
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
        <p
          ref={heroSubRef}
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "var(--text-secondary)",
            maxWidth: 600,
            margin: 0,
            lineHeight: 1.6,
            opacity: 0,
          }}
        >
          Offer documents for the initial public offering of Mann Fleet Partners Limited. Read the Draft Red Herring Prospectus and Abridged Prospectus below.
        </p>
      </section>

      {/* ── IPO DOCUMENTS ─────────────────────────────────────── */}
      <section
        ref={docSectionRef}
        style={{
          padding: "0 5% 100px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <SectionLabel>Offer Documents</SectionLabel>

        <div style={{
          marginTop: 32,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 18,
        }}>
          {IPO_DOCS.map(doc => (
            <div key={doc.file} className="doc-card-anim" style={{ opacity: 0 }}>
              <IpoCard doc={doc} onClick={() => setActivePdf(doc)} />
            </div>
          ))}
        </div>

        <p style={{
          marginTop: 28,
          fontSize: 12.5,
          color: "var(--text-secondary)",
          maxWidth: 760,
          lineHeight: 1.6,
          opacity: 0.85,
        }}>
          Disclaimer: These documents are drafts filed for informational purposes and do not constitute an offer to sell or a solicitation to buy securities. Please read the risk factors carefully before making any investment decision.
        </p>
      </section>

      <Footer />

      {/* ── MODALS ───────────────────────────────────────────── */}
      {activePdf && (
        <PdfModal doc={activePdf} onClose={() => setActivePdf(null)} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION LABEL
══════════════════════════════════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: "var(--accent)",
        flexShrink: 0,
        display: "inline-block",
      }} />
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color: "var(--accent)",
      }}>
        {children}
      </span>
    </div>
  );
}
