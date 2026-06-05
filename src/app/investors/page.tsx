"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
interface Leader {
  id: string;
  name: string;
  title: string;
  email: string;
  photo: string | null;
  objectPosition?: string;
  teaser: string;
  accolades: string[];
}

const LEADERS: Leader[] = [
  {
    id: "amrit",
    name: "Amrit Pal Singh Mann",
    title: "Managing Director",
    email: "amrit@manntours.com",
    photo: "/teams/amrit%20pal.jpeg",
    objectPosition: "top",
    teaser: "Pioneer in shifting the Indian tourism industry to premium luxury vehicles since 1986 — driving business expansion and service excellence for four decades.",
    accolades: [
      "Pioneer in luxury vehicle transition since 1986",
      "High-profile events and embassy delegations",
      "Spearheads the entire premier fleet rollout",
    ],
  },
  {
    id: "parmjeet",
    name: "Parmjeet Mann",
    title: "Executive Director and Head of HR",
    email: "parmjeet@manntours.com",
    photo: "/teams/parmjeet%20mann.jpeg",
    objectPosition: "top",
    teaser: "Executive Director and Head of Human Resources, instrumental in securing high-value contracts with embassies, MNCs, and prestigious events since 2005.",
    accolades: [
      "Associated with the Company since August 2005",
      "Secured high-value embassy and MNC contracts",
      "Developed & trained 15 sales professionals",
    ],
  },
  {
    id: "robin",
    name: "Mr. Robin Singh Mann",
    title: "Executive Director and Head of Marketing",
    email: "robin@faze.in",
    photo: "/teams/Robin%20Mann%20Sir%20photo.png",
    objectPosition: "top",
    teaser: "Columbia University honours graduate and former Evercore Investment Banking Analyst, now leading growth and marketing strategy at Mann Fleet.",
    accolades: [
      "Investment Banking Senior Analyst — Evercore PCA, NYC",
      "Experience at Citigroup, NYC",
      "Leads Leap Green Infra Private Limited",
    ],
  },
];

interface Director {
  id: string;
  name: string;
  title: string;
  photo: string;
  bio?: string;
}

const DIRECTORS: Director[] = [
  {
    id: "ashok",
    name: "Mr. Ashok Jha",
    title: "Independent Director",
    photo: "/teams/Ashok jha.jpeg",
    bio: "Ashok Jha is an Independent Director of our Company. He has completed his Senior Secondary Examination (Class XII) from the Central Board of Secondary Education, New Delhi in the year 1981. He also held a Certificate of Competency as Master of a Foreign-Going Ship, issued under the Merchant Shipping Act, 1958 which is required to be renewed every five years in accordance with applicable maritime regulations. He has approximately 11 years of experience in the marine and offshore industry, having served in senior roles such as, Master of FPSO/FSO facilities and currently, as Offshore Installation Manager (OIM). His expertise includes evaluation simultaneous operations on the facility, assistance in the preparation of budgets and in the planning and co-ordination of campaign maintenance, conversions or other major activities.",
  },
  {
    id: "averjit",
    name: "Mr. Avarjit Singh Birghi",
    title: "Independent Director",
    photo: "/teams/Avarjit Singh.jpeg",
    bio: "Avarjit Singh Birghi is an Independent Director of our Company. He has completed his Senior Secondary Examination (Class XII) from the St. Columbas School, New Delhi in 1985 along with this he has completed his Bachelor of Commerce (Honours), University of Delhi in 1989 and he is a member of the Institute of Charted Accountants of India since 1991. He has also professional experience in Information Technology industry where he has worked with IBM India Private Limited and thereafter with Tata Consultancy Services.",
  },
  {
    id: "sami",
    name: "Dr. Mohd Sami",
    title: "Independent Director",
    photo: "/teams/Mohd Sami.jpeg",
    bio: "Mohd Sami is an Independent Director of our Company. He has completed his Doctor of Philosophy (PhD) in Physics and Mathematical Sciences from Moscow State University in 1983. He qualified as Physicist at Patrice Lumumba Peoples’ Friendship University, Moscow Russia in 1978. He served as the director of the Centre for Theoretical Physics, Jamia Millia Islamia (A Central University) from January 12, 2007 to January 31, 2020. Currently he is working as director of Centre for Cosmology and Science popularisation at Shree Guru Gobind Singh Tricentenary University.",
  },
];

interface PdfDoc {
  label: string;
  file: string;
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
    title: "IPO / DRHP",
    icon: "📄",
    docs: [
      { label: "DRHP — Mann Fleet Partners Limited", file: "DRHP_Mann-Fleet-Partners-Limited.pdf" },
      { label: "DRHP Newspaper — Financial Express", file: "DRHP-Newspaper-Publication_Financial-Express.pdf" },
      { label: "DRHP Newspaper — Jansatta", file: "DRHP-Newspaper-Publication_Jansatta.pdf" },
      { label: "DRHP Newspaper — Pratahkiran", file: "DRHP-Newspaper-Publication_Pratahkiran.pdf" },
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
    id: "conduct",
    title: "Codes of Conduct",
    icon: "⚖️",
    docs: [
      { label: "Code of Conduct — Directors and SMP", file: "Code-of-Conduct-for-Directors-and-SMP_Mann.pdf" },
      { label: "Code of Conduct — Prevention of Insider Trading", file: "Code-of-Conduct-for-Prevention-of-Insider-Trading_Mann.pdf" },
    ],
  },
  {
    id: "policies",
    title: "Policies",
    icon: "📋",
    docs: [
      { label: "Board Diversity Policy", file: "Board-Diversity-Policy_Mann.pdf" },
      { label: "Whistle-Blower Policy", file: "Whistle-Blower-Policy_Mann.pdf" },
      { label: "Nomination and Remuneration Policy", file: "Nomination-Remuneration-Policy_Mann.pdf" },
      { label: "Documents Preservation and Archival Policy", file: "Documents-Preservation-and-Archival-Policy_Mann.pdf" },
      { label: "Policy on Related Party Transactions", file: "Policy-on-Materiality-of-Related-Party-Transaction_Mann.pdf" },
      { label: "Policy on Material Subsidiaries", file: "Policy-for-determining-Material-Subsidiaries_Mann.pdf" },
      { label: "Policy on Materiality of Disclosures", file: "Policy-on-Determination-of-Materiality-for-Disclosure-of-Events-Information_Mann.pdf" },
      { label: "Succession Planning Policy", file: "Policy-on-Succession-Planning-of-Board-and-Senior-Management_Mann.pdf" },
      { label: "Familiarisation Programme — Independent Directors", file: "Familiarisation-Programme-for-Independent-Directors_Mann.pdf" },
    ],
  },
  {
    id: "info",
    title: "Corporate Information",
    icon: "🏢",
    docs: [
      { label: "Details of Business", file: "Details-of-Business.pdf" },
      { label: "Details of KMPs", file: "Details-of-KMPs.pdf" },
      { label: "Contact Details — Grievance Redressal", file: "Details-of-KMPs.pdf" },
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
   DIRECTOR PHOTO MODAL
══════════════════════════════════════════════════════════════ */
function DirectorModal({ director, onClose }: { director: Director; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bd = backdropRef.current;
    const card = cardRef.current;
    if (!bd || !card) return;

    gsap.fromTo(bd, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(card,
      { opacity: 0, scale: 0.85, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }
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
    if (card) tl.to(card, { opacity: 0, scale: 0.88, y: 30, duration: 0.25, ease: "power2.in" }, 0);
    if (bd) tl.to(bd, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0);
  }, [onClose]);

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,8,5,0.78)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        ref={cardRef}
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-mid)",
          borderRadius: 20,
          padding: "clamp(1.25rem, 5vw, 40px) clamp(1.25rem, 6vw, 44px)",
          maxWidth: 620,
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute", top: 18, right: 18, zIndex: 2,
            background: "var(--glass-light)", border: "1px solid var(--border-subtle)", borderRadius: "50%",
            width: 36, height: 36, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-primary)", fontSize: 18, lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>

        <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24 }}>
          {director.photo && (
            <img
              src={director.photo}
              alt={director.name}
              style={{
                width: 100, height: 100, borderRadius: 16,
                objectFit: "cover", objectPosition: "top",
                flexShrink: 0, border: "2px solid var(--accent)",
              }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          )}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 4 }}>
              {director.title}
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", color: "var(--text-primary)", margin: "0 0 6px", lineHeight: 1.2 }}>
              {director.name}
            </h2>
          </div>
        </div>

        {director.bio && (
          <>
            <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 20 }} />
            <p style={{ fontSize: "0.95rem", lineHeight: 1.78, color: "var(--text-secondary)", margin: 0 }}>
              {director.bio}
            </p>
          </>
        )}
      </div>
    </div>,
    document.body
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
          View PDF <IconExternalLink />
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function InvestorsPage() {
  const [activeTab, setActiveTab] = useState<"corporate" | "team">("corporate");
  const [activeDirector, setActiveDirector] = useState<Director | null>(null);
  const [activePdf, setActivePdf] = useState<PdfDoc | null>(null);

  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroDivRef = useRef<HTMLDivElement>(null);
  const directorCardsRef = useRef<HTMLDivElement>(null);
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

    // Director cards stagger
    const dirCards = directorCardsRef.current?.querySelectorAll<HTMLElement>(".dir-card");
    if (dirCards?.length) {
      gsap.fromTo(dirCards,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, ease,
          stagger: 0.15,
          scrollTrigger: { trigger: directorCardsRef.current, start: "top 80%" }
        }
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

      {/* ── TABS ─────────────────────────────────────────────── */}
      <div style={{ padding: "0 5% 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 0 }}>
          {(["corporate", "team"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.7rem 1.4rem",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)",
                borderBottom: activeTab === tab ? "2px solid var(--accent)" : "2px solid transparent",
                marginBottom: -1,
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              {tab === "corporate" ? "Corporate Info" : "Meet Our Team"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "team" && (
        <section style={{ padding: "0 5% 80px", maxWidth: 1200, margin: "0 auto" }}>
          <SectionLabel>The Leadership</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28, marginTop: 32 }}>
            {LEADERS.map(leader => (
              <div key={leader.id} style={{
                background: "var(--glass-mid)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 20,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{ position: "relative", width: "100%", paddingTop: "100%", background: "var(--bg-deep)" }}>
                  {leader.photo && (
                    <Image
                      src={leader.photo}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: leader.objectPosition ?? "center" }}
                      unoptimized
                    />
                  )}
                </div>
                <div style={{ padding: "1.25rem 1.4rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", margin: 0 }}>
                    {leader.title}
                  </p>
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.25rem", color: "var(--text-primary)", margin: 0, fontWeight: 400 }}>
                    {leader.name}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                    {leader.teaser}
                  </p>
                  <a href={`mailto:${leader.email}`} style={{ fontSize: "0.78rem", color: "var(--accent)", marginTop: "0.25rem", textDecoration: "none" }}>
                    {leader.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <Link href="/meet-the-team" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "0.75rem 2rem",
              background: "var(--accent)",
              color: "#fff",
              borderRadius: 999,
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}>
              View Full Team →
            </Link>
          </div>
        </section>
      )}

      {activeTab === "corporate" && (
      <>
      {/* ── INDEPENDENT DIRECTORS ────────────────────────────── */}
      <section style={{
        padding: "0 5% 80px",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <SectionLabel>Independent Directors</SectionLabel>

        <div
          ref={directorCardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
            marginTop: 32,
          }}
        >
          {DIRECTORS.map(d => (
            <DirectorCard key={d.id} director={d} onClick={() => setActiveDirector(d)} />
          ))}
        </div>
      </section>

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
                <span style={{ fontSize: 22 }}>{cat.icon}</span>
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
                  <div key={doc.file} className="doc-card-anim" style={{ opacity: 0 }}>
                    <PdfCard doc={doc} onClick={() => setActivePdf(doc)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      </>
      )}

      <Footer />

      {/* ── MODALS ───────────────────────────────────────────── */}
      {activeDirector && (
        <DirectorModal director={activeDirector} onClose={() => setActiveDirector(null)} />
      )}
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

/* ══════════════════════════════════════════════════════════════
   DIRECTOR CARD
══════════════════════════════════════════════════════════════ */
function DirectorCard({ director, onClick }: { director: Director; onClick: () => void }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = innerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6;
    gsap.to(card, { rotationX: rx, rotationY: ry, scale: 1.02, duration: 0.35, ease: "power2.out", transformPerspective: 800 });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    const card = innerRef.current;
    if (!card) return;
    gsap.to(card, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.5, ease: "elastic.out(1,0.7)", transformPerspective: 800 });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <div style={{ perspective: 800 }} className="dir-card">
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 18,
          padding: "36px 28px 32px",
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
          willChange: "transform",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <div ref={glowRef} style={{ position: "absolute", inset: -1, borderRadius: 18, border: "1.5px solid var(--accent)", opacity: 0, pointerEvents: "none", boxShadow: "0 0 24px rgba(220,38,38,0.2)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, var(--accent), transparent)", borderRadius: "18px 18px 0 0" }} />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={director.photo}
            alt={director.name}
            style={{ width: 160, height: 160, borderRadius: 20, objectFit: "cover", objectPosition: "top", border: "2px solid var(--border-mid)", filter: "grayscale(10%)", transition: "filter 0.4s ease" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "grayscale(10%)")}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = "none";
            }}
          />
        </div>

        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
          {director.title}
        </p>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", color: "var(--text-primary)", lineHeight: 1.25, margin: 0 }}>
          {director.name}
        </h3>

        <div style={{ marginTop: 24 }}>
          <button
            onClick={onClick}
            style={{
              width: "100%",
              padding: "10px 0",
              borderRadius: 10,
              background: "transparent",
              border: "1px solid var(--border-mid)",
              color: "var(--text-primary)",
              fontSize: "0.82rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-mid)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
            }}
          >
            Read Full Profile
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
