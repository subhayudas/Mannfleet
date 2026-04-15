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
interface Leader {
  id: string;
  name: string;
  title: string;
  email: string;
  photo: string | null;
  teaser: string;
  bio: string;
  education: string[];
  accolades: string[];
}

const LEADERS: Leader[] = [
  {
    id: "amrit",
    name: "Mr. Amrit Pal Singh Mann",
    title: "Managing Director",
    email: "amrit@manntours.com",
    photo: null,
    teaser:
      "Pioneer in shifting the Indian Tourism Industry to premium luxury vehicles since 1986 — driving business expansion and service excellence for four decades.",
    bio: "Amrit Pal Singh Mann is the Promoter and Managing Director of the Company. He has also passed his first year of Bachelor of Commerce in 1985 from University of Delhi. He has been pioneered in shifting the Indian Tourism Industry from all types of smart to premium luxury vehicles since 1986. He has been a key leader, driving business expansion and service excellence in all tourist transport segments. With extensive experience in managing high-profile events, corporate delegations and provided services to embassies, he has played a crucial role in strengthening our Company's market presence. He is known for his disciplined and client-centric approach, ensuring the highest standards of service delivery. He has been at the forefront of adopting the latest transport technology and luxury vehicles, reinforcing Mann Fleet Partners Limited position as in luxury passenger transport in India. His strategic vision continues to propel our Company's growth. He spearheads the rollout of the entire premier fleet.",
    education: ["Bachelor of Commerce (First Year) — University of Delhi, 1985"],
    accolades: [
      "Pioneer in luxury vehicle transition since 1986",
      "High-profile events & embassy delegations",
      "Spearheads the entire premier fleet rollout",
    ],
  },
  {
    id: "parmjeet",
    name: "Parmjeet Mann",
    title: "Executive Director & Head of HR",
    email: "parmjeet@manntours.com",
    photo: "/parmjeet.webp",
    teaser:
      "Executive Director and Head of Human Resources, instrumental in securing high-value contracts with embassies, MNCs and prestigious events since 2005.",
    bio: "Parmjeet Mann is the Promoter, Executive Director and Head of Human Resources Department of our Company. She has completed diploma in Fashion Design from JD Institute of Fashion Technology in the year 2001–02 and also completed her PG Diploma in microbiology and food technology from Punjabi University in the year 1994. She has also done Bachelor of Science (Honors) in Botany from Panjab University in the year 1993. She has been associated with our Company from August 2005. She has played a crucial role in driving the Company's growth. She has been instrumental in securing high-value contracts with embassies, multinational corporations and prestigious events. She has also developed and trained a team of 15 sales professionals, ensuring consistent business growth and client retention. Additionally, as Head of Human Resources, she manages a workforce of our employees, including chauffeurs and office staffs, streamlining business functions and ensuring operational efficiency.",
    education: [
      "BSc (Hons) Botany — Panjab University, 1993",
      "PG Diploma in Microbiology & Food Technology — Punjabi University, 1994",
      "Diploma in Fashion Design — JD Institute of Fashion Technology, 2001–02",
    ],
    accolades: [
      "Associated with the Company since August 2005",
      "Secured high-value embassy & MNC contracts",
      "Developed & trained 15 sales professionals",
    ],
  },
  {
    id: "robin",
    name: "Robin Singh Mann",
    title: "Executive Director & Head of Marketing",
    email: "robin@faze.in",
    photo: "/robin.webp",
    teaser:
      "Columbia University honours graduate and former Evercore Investment Banking Analyst, now leading growth and marketing strategy at Mann Fleet.",
    bio: "Robin Singh Mann is a Promoter, Executive Director of our Company. He completed his Bachelor of Arts at Columbia University in the City of New York and graduated with honours in May 2020. Prior to joining our Company, he was associated with Evercore's PCA division in NYC, USA in the capacity of Investment Banking Senior Analyst and Citigroup in NYC. At our Company, he leads the growth and scalability of the business as Head of Marketing. As a part of this role, he creates and deploys various marketing and social media strategies that aim to improve Mann's position and market share. Robin also supports the Sales team on marquee projects, pitches, and clients. Additionally, he also leads one of our Group Company namely, Leap Green Infra Private Limited, leveraging his experience to target and generate new clientele, contract structures and revenue stacks.",
    education: [
      "BA (Honours) — Columbia University, New York, May 2020",
    ],
    accolades: [
      "Investment Banking Senior Analyst — Evercore PCA, NYC",
      "Experience at Citigroup, NYC",
      "Leads Leap Green Infra Private Limited",
    ],
  },
];

interface SalesPerson {
  name: string;
  title: string;
}

const SALES_TEAM: SalesPerson[] = [
  { name: "Ms. Amarjeet Mann", title: "President Marketing" },
  { name: "Mr. Jagdeep Singh Mann", title: "President Sales" },
  { name: "Mr. Ashwani Kumar", title: "Asst. Manager — Sales" },
];

/* ══════════════════════════════════════════════════════════════
   AVATAR PLACEHOLDER
══════════════════════════════════════════════════════════════ */
function AvatarPlaceholder({ name, size = 120 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.32,
        fontFamily: "'Instrument Serif', serif",
        color: "#fff",
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {initials || "M"}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════════ */
function TeamModal({
  leader,
  onClose,
}: {
  leader: Leader;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bd = backdropRef.current;
    const card = cardRef.current;
    if (!bd || !card) return;

    gsap.fromTo(bd, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      card,
      { opacity: 0, scale: 0.85, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
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
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10,8,5,0.78)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-mid)",
          borderRadius: 20,
          padding: "40px 44px",
          maxWidth: 700,
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "var(--glass-light)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "50%",
            width: 36,
            height: 36,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-primary)",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 28 }}>
          {leader.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={leader.photo}
              alt={leader.name}
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
                border: "2px solid var(--accent)",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <AvatarPlaceholder name={leader.name} size={90} />
          )}
          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 4,
              }}
            >
              {leader.title}
            </p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {leader.name}
            </h2>
            <a
              href={`mailto:${leader.email}`}
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                marginTop: 4,
                display: "inline-block",
              }}
            >
              {leader.email}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "var(--border-subtle)",
            marginBottom: 24,
          }}
        />

        {/* Bio */}
        <p
          style={{
            fontSize: "0.97rem",
            lineHeight: 1.78,
            color: "var(--text-secondary)",
            marginBottom: 28,
          }}
        >
          {leader.bio}
        </p>

        {/* Education */}
        <div style={{ marginBottom: 24 }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: 10,
            }}
          >
            Education
          </p>
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
            {leader.education.map((e, i) => (
              <li
                key={i}
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  paddingLeft: 16,
                  position: "relative",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "0.45em",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    display: "block",
                  }}
                />
                {e}
              </li>
            ))}
          </ul>
        </div>

        {/* Accolades */}
        <div>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: 10,
            }}
          >
            Highlights
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {leader.accolades.map((a, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.8rem",
                  padding: "5px 12px",
                  borderRadius: 20,
                  background: "var(--glass-light)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ══════════════════════════════════════════════════════════════
   LEADER CARD
══════════════════════════════════════════════════════════════ */
function LeaderCard({
  leader,
  onOpen,
  cardRef,
}: {
  leader: Leader;
  onOpen: () => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = innerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -8;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 8;
    gsap.to(card, { rotationX: rx, rotationY: ry, scale: 1.025, duration: 0.35, ease: "power2.out", transformPerspective: 800 });
  };

  const handleMouseLeave = () => {
    const card = innerRef.current;
    if (!card) return;
    gsap.to(card, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.5, ease: "elastic.out(1,0.7)", transformPerspective: 800 });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
  };

  const handleMouseEnter = () => {
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
  };

  return (
    <div
      ref={cardRef}
      style={{ perspective: 800 }}
    >
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 18,
          padding: "36px 32px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Glow ring */}
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: 18,
            border: "1.5px solid var(--accent)",
            opacity: 0,
            pointerEvents: "none",
            boxShadow: "0 0 28px rgba(220,38,38,0.25)",
          }}
        />

        {/* Top accent stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "var(--accent)",
            borderRadius: "18px 18px 0 0",
          }}
        />

        {/* Photo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          {leader.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={leader.photo}
              alt={leader.name}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--border-mid)",
                filter: "grayscale(40%)",
                transition: "filter 0.4s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "grayscale(40%)")}
              onError={(e) => {
                const parent = (e.currentTarget as HTMLImageElement).parentElement;
                if (parent) {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const placeholder = document.createElement("div");
                  parent.appendChild(placeholder);
                }
              }}
            />
          ) : (
            <AvatarPlaceholder name={leader.name} size={100} />
          )}
        </div>

        {/* Title label */}
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          {leader.title}
        </p>

        {/* Name */}
        <h3
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
            color: "var(--text-primary)",
            textAlign: "center",
            marginBottom: 8,
            lineHeight: 1.25,
          }}
        >
          {leader.name}
        </h3>

        {/* Email */}
        <p
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {leader.email}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "var(--border-subtle)",
            marginBottom: 20,
          }}
        />

        {/* Teaser */}
        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            marginBottom: 24,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {leader.teaser}
        </p>

        {/* Read more */}
        <button
          onClick={onOpen}
          style={{
            width: "100%",
            padding: "11px 0",
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
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function MeetTheTeamPage() {
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null);

  /* ── Refs ── */
  const heroRef       = useRef<HTMLElement>(null);
  const heroBadgeRef  = useRef<HTMLDivElement>(null);
  const heroWordsRef  = useRef<HTMLDivElement>(null);
  const heroSubRef    = useRef<HTMLParagraphElement>(null);
  const heroLineRef   = useRef<HTMLDivElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);

  const leadSecRef   = useRef<HTMLElement>(null);
  const leadLabelRef = useRef<HTMLDivElement>(null);
  const leadDivRef   = useRef<HTMLDivElement>(null);
  const card0Ref     = useRef<HTMLDivElement>(null);
  const card1Ref     = useRef<HTMLDivElement>(null);
  const card2Ref     = useRef<HTMLDivElement>(null);

  const salesSecRef   = useRef<HTMLElement>(null);
  const salesLabelRef = useRef<HTMLDivElement>(null);
  const salesDivRef   = useRef<HTMLDivElement>(null);
  const sales0Ref     = useRef<HTMLDivElement>(null);
  const sales1Ref     = useRef<HTMLDivElement>(null);
  const sales2Ref     = useRef<HTMLDivElement>(null);

  const ctaSecRef  = useRef<HTMLElement>(null);
  const ctaTextRef = useRef<HTMLDivElement>(null);

  const cardRefs = [card0Ref, card1Ref, card2Ref];
  const salesRefs = [sales0Ref, sales1Ref, sales2Ref];

  useEffect(() => {
    const ease = "power3.out";
    const ctx = gsap.context(() => {

      /* ── HERO ── */
      if (heroBadgeRef.current)
        gsap.from(heroBadgeRef.current, { y: -20, opacity: 0, duration: 0.7, ease, delay: 0.1 });

      if (heroWordsRef.current) {
        const words = heroWordsRef.current.querySelectorAll<HTMLSpanElement>(".hero-word");
        gsap.from(words, { y: 70, opacity: 0, duration: 0.85, ease, stagger: 0.1, delay: 0.2 });
      }

      if (heroSubRef.current)
        gsap.from(heroSubRef.current, { y: 20, opacity: 0, duration: 0.7, ease, delay: 0.6 });

      if (heroLineRef.current)
        gsap.from(heroLineRef.current, { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease, delay: 0.5 });

      if (heroScrollRef.current)
        gsap.from(heroScrollRef.current, { opacity: 0, y: 10, duration: 0.6, ease, delay: 1 });

      /* ── LEADERSHIP SECTION ── */
      if (leadLabelRef.current)
        gsap.from(leadLabelRef.current, {
          y: 30, opacity: 0, duration: 0.7, ease,
          scrollTrigger: { trigger: leadLabelRef.current, start: "top 85%" },
        });

      if (leadDivRef.current)
        gsap.from(leadDivRef.current, {
          scaleX: 0, transformOrigin: "left center", duration: 0.9, ease,
          scrollTrigger: { trigger: leadDivRef.current, start: "top 85%" },
        });

      const cardEls = [card0Ref.current, card1Ref.current, card2Ref.current].filter(Boolean);
      if (cardEls.length) {
        gsap.from(cardEls, {
          y: 80, opacity: 0, duration: 0.85, ease, stagger: 0.15,
          scrollTrigger: { trigger: leadSecRef.current, start: "top 70%" },
        });
      }

      /* ── SALES SECTION ── */
      if (salesLabelRef.current)
        gsap.from(salesLabelRef.current, {
          y: 30, opacity: 0, duration: 0.7, ease,
          scrollTrigger: { trigger: salesLabelRef.current, start: "top 85%" },
        });

      if (salesDivRef.current)
        gsap.from(salesDivRef.current, {
          scaleX: 0, transformOrigin: "left center", duration: 0.9, ease,
          scrollTrigger: { trigger: salesDivRef.current, start: "top 85%" },
        });

      const salesEls = [sales0Ref.current, sales1Ref.current, sales2Ref.current].filter(Boolean);
      if (salesEls.length) {
        gsap.from(salesEls, {
          x: -60, opacity: 0, duration: 0.75, ease, stagger: 0.12,
          scrollTrigger: { trigger: salesSecRef.current, start: "top 75%" },
        });
      }

      /* ── CTA ── */
      if (ctaTextRef.current)
        gsap.from(ctaTextRef.current, {
          y: 40, opacity: 0, duration: 0.8, ease,
          scrollTrigger: { trigger: ctaSecRef.current, start: "top 75%" },
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      <Navbar />

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          minHeight: "72vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(220,38,38,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Badge */}
        <div
          ref={heroBadgeRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 40,
            border: "1px solid var(--border-mid)",
            background: "var(--glass-light)",
            backdropFilter: "blur(8px)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
            }}
          />
          Mann Fleet Partners Limited
        </div>

        {/* Headline */}
        <div
          ref={heroWordsRef}
          style={{
            overflow: "hidden",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          {["Meet", "Our", "Team"].map((word) => (
            <span
              key={word}
              className="hero-word"
              style={{
                display: "inline-block",
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(3rem, 10vw, 8rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                marginRight: "0.25em",
                lineHeight: 1.05,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Divider line */}
        <div
          ref={heroLineRef}
          style={{
            width: "min(320px, 60vw)",
            height: 2,
            background: "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
            borderRadius: 2,
            margin: "20px auto 28px",
          }}
        />

        {/* Subline */}
        <p
          ref={heroSubRef}
          style={{
            maxWidth: 560,
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
          }}
        >
          The people behind India's premier luxury transport company — four decades of expertise, vision, and excellence.
        </p>

        {/* Scroll indicator */}
        <div
          ref={heroScrollRef}
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            opacity: 0.5,
          }}
        >
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</p>
          <div
            style={{
              width: 1,
              height: 32,
              background: "var(--text-muted)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          LEADERSHIP
      ═══════════════════════════════════════════════════ */}
      <section
        ref={leadSecRef}
        style={{
          padding: "80px 24px 100px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Section label */}
        <div ref={leadLabelRef} style={{ marginBottom: 14 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 10,
            }}
          >
            Leadership
          </p>
          <div
            ref={leadDivRef}
            style={{
              height: 1,
              background: "var(--border-subtle)",
              marginBottom: 48,
            }}
          />
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              marginBottom: 12,
              lineHeight: 1.15,
            }}
          >
            The Founding Directors
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              maxWidth: 520,
              lineHeight: 1.6,
            }}
          >
            Decades of combined experience shaping the future of luxury passenger transport in India.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
            marginTop: 52,
          }}
        >
          {LEADERS.map((leader, i) => (
            <LeaderCard
              key={leader.id}
              leader={leader}
              onOpen={() => setActiveLeader(leader)}
              cardRef={cardRefs[i]}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SALES DEPARTMENT
      ═══════════════════════════════════════════════════ */}
      <section
        ref={salesSecRef}
        style={{
          padding: "60px 24px 100px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Label */}
        <div ref={salesLabelRef} style={{ marginBottom: 14 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 10,
            }}
          >
            Sales Department
          </p>
          <div
            ref={salesDivRef}
            style={{
              height: 1,
              background: "var(--border-subtle)",
              marginBottom: 48,
            }}
          />
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.15,
            }}
          >
            Sales & Marketing
          </h2>
        </div>

        {/* Sales cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            marginTop: 40,
          }}
        >
          {SALES_TEAM.map((person, i) => {
            const initials = person.name
              .split(" ")
              .filter((w) => /^[A-Z]/.test(w))
              .slice(0, 2)
              .map((w) => w[0])
              .join("");

            return (
              <div
                key={person.name}
                ref={salesRefs[i]}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 16,
                  padding: "28px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(220,38,38,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontFamily: "'Instrument Serif', serif",
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>

                <div>
                  <p
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginBottom: 4,
                    }}
                  >
                    {person.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: "1.05rem",
                      color: "var(--text-primary)",
                      lineHeight: 1.2,
                    }}
                  >
                    {person.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════════ */}
      <section
        ref={ctaSecRef}
        style={{
          padding: "80px 24px 120px",
          textAlign: "center",
          background: "var(--bg-deep)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div ref={ctaTextRef}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 20,
            }}
          >
            Get in touch
          </p>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            Work with us.
          </h2>
          <p
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: "var(--text-secondary)",
              maxWidth: 480,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Whether you need a luxury fleet, embassy transfers, or corporate transport — our team is ready.
          </p>
          <a
            href="mailto:amrit@manntours.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              borderRadius: 50,
              background: "var(--accent)",
              color: "#fff",
              fontSize: "0.88rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-dark)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)")}
          >
            Contact Us
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />

      {/* Scroll pulse keyframe */}
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(0.5); opacity: 0.2; }
        }
      `}</style>

      {/* Modal */}
      {activeLeader && (
        <TeamModal leader={activeLeader} onClose={() => setActiveLeader(null)} />
      )}
    </div>
  );
}
