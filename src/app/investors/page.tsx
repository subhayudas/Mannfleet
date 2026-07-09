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
  file?: string;
  url?: string;
}

interface PdfCategory {
  id: string;
  title: string;
  icon: string;
  docs: PdfDoc[];
}

const BASE = "/investors/";

const PDF_CATEGORIES: PdfCategory[] = [
  {
    id: "ipo",
    title: "IPO",
    icon: "📈",
    docs: [
      { label: "Draft Red Herring Prospectus (DRHP)", file: "DRHP-Mann-Fleet-Partners-Limited.pdf" },
      { label: "Draft Abridged Prospectus", file: "Draft-Abridged-Prospectus_Mann.pdf" },
      { label: "Audio/Video Recording (Hindi)", url: "https://www.youtube.com/watch?v=CXdiBw_Uhtk&feature=youtu.be" },
      { label: "Audio/Video Recording (English)", url: "https://www.youtube.com/watch?v=qAOuHRBiA38&feature=youtu.be" },
    ],
  },
  {
    id: "newspaper-advertisement",
    title: "Newspaper Advertisement",
    icon: "📰",
    docs: [
      { label: "Financial Express — Delhi", file: "Newspaper-Advertisement_Financial-Express_Delhi.pdf" },
      { label: "Jansatta — Delhi", file: "Newspaper-Advertisement_Jansatta_Delhi.pdf" },
      { label: "Pratah Kiran — Delhi", file: "Newspaper-Advertisement_Pratah-Kiran_Delhi.pdf" },
    ],
  },
  {
    id: "constitution",
    title: "Constitutive Documents",
    icon: "🏛️",
    docs: [
      { label: "Articles of Association", file: "Articles-of-Association.pdf" },
      { label: "Memorandum of Association", file: "Memorandum-of-Association.pdf" },
    ],
  },
  {
    id: "policies",
    title: "Policies",
    icon: "📋",
    docs: [
      { label: "Code of Conduct — Directors and SMP", file: "Code-of-Conduct-for-Directors-and-SMP_Mann.pdf" },
      { label: "Code of Conduct — Prevention of Insider Trading", file: "Code-of-Conduct-for-Prevention-of-Insider-Trading_Mann.pdf" },
      { label: "Board Diversity Policy", file: "Board-Diversity-Policy_Mann.pdf" },
      { label: "Whistle-Blower Policy", file: "Whistle-Blower-Policy_Mann.pdf" },
      { label: "Nomination and Remuneration Policy", file: "Nomination-Remuneration-Policy_Mann.pdf" },
      { label: "Documents Preservation and Archival Policy", file: "Documents-Preservation-and-Archival-Policy_Mann.pdf" },
      { label: "Policy on Related Party Transactions", file: "Policy-on-Materiality-of-Related-Party-Transaction_Mann.pdf" },
      { label: "Policy on Material Subsidiaries", file: "Policy-for-determining-Material-Subsidiaries_Mann.pdf" },
      { label: "Policy on Materiality of Disclosures", file: "Policy-on-Determination-of-Materiality-for-Disclosure-of-Events-Information_Mann.pdf" },
      { label: "Succession Planning Policy", file: "Policy-on-Succession-Planning-of-Board-and-Senior-Management_Mann.pdf" },
      { label: "Familiarisation Programme — Independent Directors", file: "Familiarisation-Programme-for-Independent-Directors_Mann.pdf" },
      { label: "Prevention of Sexual Harassment at Workplace", file: "Prevention-of-Sexual-Harassment-at-Workplace_Mann.pdf" },
    ],
  },
  {
    id: "info",
    title: "Corporate Information",
    icon: "🏢",
    docs: [
      { label: "Details of Business", file: "Details-of-Business.pdf" },
      { label: "Composition of Committee", file: "Composition-of-Committee.pdf" },
      { label: "Contact Details for Grievance Redressal and Other Requests", file: "Contact-Details-Grievance-Redressal.pdf" },
      { label: "Terms of Appointment — Independent Directors", file: "Terms-of-Appointment_Independent-Directors.pdf" },
      { label: "Details of the Key Managerial Personnel (‘KMP’s) authorized to determine materiality of an event or information and make disclosures to the Stock Exchanges under Regulation 30 of the SEBI Listing Regulations, 2015", file: "Details-of-KMPs-authorized-to-determine-Materiality.pdf" },
    ],
  },
  {
    id: "financial-statements",
    title: "Financial Statements",
    icon: "📈",
    docs: [
      { label: "Financial Statements 2024-25 (Audited)", file: "Financial-Statements_2024-25_Audited.pdf" },
      { label: "Financial Statements 2023-24", file: "Financial-Statements_2023-24.pdf" },
      { label: "Financial Statements 2022-23", file: "Financial-Statements_2022-23.pdf" },
      { label: "Restated Financials 2024-25", file: "Restated-Financials_2024-25.pdf" },
      { label: "Restated Report (as at 31 Dec 2025)", file: "Restated-Report_31-12-2025_Mann.pdf" },
      { label: "Special Purpose Financials 2024-25", file: "Special-Purpose-Financials_2024-25.pdf" },
    ],
  },
  {
    id: "csr",
    title: "CSR",
    icon: "🤝",
    docs: [
      { label: "Utilization Certificate — Global Social (CSR 2024-25)", file: "Utilization-Certificate_CSR_Global-Social_2024-25.pdf" },
      { label: "Utilization Certificate — Impact Paramedical (CSR 2023-24)", file: "Utilization-Certificate_Impact-Paramedical_2023-24.pdf" },
    ],
  },
  {
    id: "board-report",
    title: "Board Report",
    icon: "📝",
    docs: [
      { label: "Board's Report 2024-25", file: "Board-Report_2024-25.pdf" },
      { label: "Board's Report 2023-24", file: "Board-Report_2023-24.pdf" },
    ],
  },
  {
    id: "annual-report",
    title: "Annual Report",
    icon: "📚",
    docs: [
      { label: "Annual Report 2024-25", file: "Annual-Report_2024-25.pdf" },
    ],
  },
  {
    id: "annual-return",
    title: "Annual Return",
    icon: "🗂️",
    docs: [
      { label: "Annual Return 2024-25 (Form MGT-7)", file: "Annual-Return_2024-25_Mann.pdf" },
      { label: "Annual Return 2022-23 (Form MGT-7A)", file: "Annual-Return_2022-23_Mann.pdf" },
      { label: "Annual Return 2021-22 (Form MGT-7A)", file: "Annual-Return_2021-22_Mann.pdf" },
    ],
  },
  {
    id: "subsidiary-financials",
    title: "Subsidiary Company",
    icon: "📊",
    docs: [
      { label: "Leap Green Infra Pvt. Ltd. — Audited Balance Sheet (Dec 2025)", file: "Leap-Green-Infra-Audited-Balance-Sheet_December-2025.pdf" },
      { label: "Leap Green Infra Pvt. Ltd. — Audited Balance Sheet (Oct 2025)", file: "Leap-Green-Infra-Audited-Balance-Sheet_October-2025.pdf" },
      { label: "Leap Green Infra Pvt. Ltd. — Annual Return 2024-25", file: "Leap-Green-Infra_Annual-Return_2024-25.pdf" },
    ],
  },
  {
    id: "group-company",
    title: "Group Company",
    icon: "🏬",
    docs: [
      { label: "Mann Tours India Pvt. Ltd. — Financial Statements 2024", file: "Financial-Statements_Mann-Tours_2024.pdf" },
      { label: "Mann Tours India Pvt. Ltd. — Financial Statements 2023", file: "Financial-Statements_Mann-Tours_2023.pdf" },
      { label: "Mann Tours India Pvt. Ltd. — Financial Statements 2022", file: "Financial-Statements_Mann-Tours_2022.pdf" },
      { label: "Mann Tours India Pvt. Ltd. — Annual Return 2024-25", file: "Mann-Tours_Annual-Return_2024-25.pdf" },
    ],
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

  const handleClose = useCallback(() => {
    const bd = backdropRef.current;
    const card = cardRef.current;
    const tl = gsap.timeline({ onComplete: onClose });
    if (card) tl.to(card, { opacity: 0, scale: 0.92, y: 20, duration: 0.22, ease: "power2.in" }, 0);
    if (bd) tl.to(bd, { opacity: 0, duration: 0.22, ease: "power2.in" }, 0);
  }, [onClose]);

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
   PDF CARD
══════════════════════════════════════════════════════════════ */
function PdfCard({ doc, onClick }: { doc: PdfDoc; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isExternal = !!doc.url;

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.18)", duration: 0.25, ease: "power2.out" });
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
        borderRadius: 12,
        padding: "16px 18px",
        cursor: "pointer",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "border-color 0.2s",
      }}
    >
      <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>
        <IconFile />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)",
          margin: 0, lineHeight: 1.4,
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>
          {doc.label}
        </p>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          marginTop: 8, fontSize: 11.5, fontWeight: 600,
          color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em",
        }}>
          {isExternal ? "Watch Recording" : "View PDF"} <IconExternalLink />
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function InvestorsPage() {
  const [activePdf, setActivePdf] = useState<PdfDoc | null>(null);

  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroDivRef = useRef<HTMLDivElement>(null);
  const docSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ease = "power3.out";

    // Hero entrance
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

    // Doc category sections stagger
    const catHeaders = docSectionRef.current?.querySelectorAll<HTMLElement>(".cat-header");
    if (catHeaders?.length) {
      gsap.fromTo(catHeaders,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, ease,
          stagger: 0.1,
          scrollTrigger: { trigger: docSectionRef.current, start: "top 75%" }
        }
      );
    }

    const docCards = docSectionRef.current?.querySelectorAll<HTMLElement>(".doc-card-anim");
    if (docCards?.length) {
      gsap.fromTo(docCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.55, ease,
          stagger: 0.04,
          scrollTrigger: { trigger: docSectionRef.current, start: "top 70%" }
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
          Investors
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
            maxWidth: 560,
            margin: 0,
            lineHeight: 1.6,
            opacity: 0,
          }}
        >
          Corporate governance, regulatory disclosures, and board information for Mann Fleet Partners Limited
        </p>
      </section>

      <div style={{ paddingTop: 8 }} />

      {/* ── CORPORATE DOCUMENTS ──────────────────────────────── */}
      <section
        ref={docSectionRef}
        style={{
          padding: "0 5% 100px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <SectionLabel>Corporate Documents and Disclosures</SectionLabel>

        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 48 }}>
          {PDF_CATEGORIES.map(cat => (
            <div key={cat.id}>
              <div className="cat-header" style={{
                display: "flex", alignItems: "center", gap: 10,
                marginBottom: 20,
              }}>
                <h2 style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 26,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  margin: 0,
                }}>
                  {cat.title}
                </h2>
                <div style={{
                  flex: 1, height: 1,
                  background: "var(--border-subtle)",
                  marginLeft: 8,
                }} />
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 14,
              }}>
                {cat.docs.map(doc => (
                  <div key={doc.label} className="doc-card-anim" style={{ opacity: 0 }}>
                    <PdfCard
                      doc={doc}
                      onClick={() => {
                        if (doc.url) window.open(doc.url, "_blank", "noopener,noreferrer");
                        else setActivePdf(doc);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
