"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/* ── Icons ─────────────────────────────────────────────────── */
function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

/* ── Hover link ─────────────────────────────────────────────── */
function FooterLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        fontSize: "0.875rem",
        fontWeight: 400,
        color: hovered ? "var(--text-90)" : "var(--text-48)",
        textDecoration: "none",
        transition: "color 0.18s ease",
        lineHeight: 1,
      }}
    >
      {label}
    </a>
  );
}

/* ── Link columns data ──────────────────────────────────────── */
const QUICK_LINKS = [
  { label: "Fleet", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About us", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact us", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Youtube", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Terms of service", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Cookie policy", href: "#" },
];

/* ── Main Footer ───────────────────────────────────────────── */
export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [ctaIn, setCtaIn] = useState(false);
  const [bodyIn, setBodyIn] = useState(false);

  useEffect(() => {
    const makeObs = (setter: (v: boolean) => void) =>
      new IntersectionObserver(([e]) => { if (e.isIntersecting) setter(true); }, { threshold: 0.08 });

    const o1 = makeObs(setCtaIn);
    const o2 = makeObs(setBodyIn);
    if (ctaRef.current) o1.observe(ctaRef.current);
    if (bodyRef.current) o2.observe(bodyRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  return (
    <footer
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "var(--bg-deep)",
        overflow: "hidden",
      }}
    >
      {/* ════════════════════════════════════
          CTA BANNER CARD
      ════════════════════════════════════ */}
      <div
        style={{
          padding: "clamp(1.25rem, 4vw, 3rem)",
          paddingBottom: 0,
        }}
      >
        <div
          ref={ctaRef}
          style={{
            position: "relative",
            borderRadius: "1.75rem",
            overflow: "hidden",
            background: "#0d0906",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
            minHeight: "clamp(240px, 28vw, 340px)",
            display: "flex",
            alignItems: "center",
            opacity: ctaIn ? 1 : 0,
            transform: ctaIn ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* ── Full-bleed background video ── */}
          <video
            autoPlay muted loop playsInline preload="auto"
            style={{
              position: "absolute", inset: 0, zIndex: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
            }}
          >
            <source src="/footer video.mp4" type="video/mp4" />
          </video>

          {/* Dark cinematic tint */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "rgba(6,4,2,0.52)",
            pointerEvents: "none",
          }} />

          {/* Left-heavy gradient so text stays readable */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to right, rgba(6,4,2,0.78) 0%, rgba(6,4,2,0.45) 45%, rgba(6,4,2,0.10) 100%)",
            pointerEvents: "none",
          }} />

          {/* Top + bottom vignette */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to bottom, rgba(6,4,2,0.50) 0%, transparent 30%, transparent 65%, rgba(6,4,2,0.65) 100%)",
            pointerEvents: "none",
          }} />

          {/* Subtle top-edge shimmer line */}
          <div style={{
            position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", zIndex: 2,
            background: "linear-gradient(90deg, transparent, rgba(255,220,160,0.30) 40%, rgba(180,220,255,0.22) 60%, transparent)",
            pointerEvents: "none",
          }} />

          {/* Left — text */}
          <div style={{
            position: "relative", zIndex: 3,
            padding: "clamp(2rem, 4vw, 3.5rem)",
            flex: "0 0 auto",
            maxWidth: "clamp(260px, 45%, 480px)",
          }}>
            <h2 style={{
              fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              margin: "0 0 0.85rem",
            }}>
              Experience premium<br />car rental.
            </h2>
            <p style={{
              fontSize: "clamp(0.82rem, 1.4vw, 0.95rem)",
              color: "rgba(255,255,255,0.52)",
              margin: "0 0 1.75rem",
              lineHeight: 1.6,
            }}>
              200+ vehicles. Seamless booking.
            </p>

            {/* CTA button — white solid */}
            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.72rem 1.5rem",
                background: "#ffffff",
                color: "#1a1008",
                border: "none",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.80)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                fontFamily: "'Poppins', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.80)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.80)";
              }}
            >
              Get started
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Subtle dot-grid overlay */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 2,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }} />
        </div>
      </div>

      {/* ════════════════════════════════════
          FOOTER BODY
      ════════════════════════════════════ */}
      <div
        ref={bodyRef}
        style={{
          padding: "clamp(1.25rem, 4vw, 3rem)",
          paddingTop: "3.5rem",
          paddingBottom: "2rem",
          opacity: bodyIn ? 1 : 0,
          transform: bodyIn ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 700ms 120ms cubic-bezier(0.16,1,0.3,1), transform 700ms 120ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "3rem",
        }}>

          {/* ── LEFT — Logo + address + contact ── */}
          <div style={{ flex: "0 0 auto", minWidth: "200px", maxWidth: "280px" }}>
            <Image
              src="/mannlogo.webp"
              alt="MANN"
              width={104}
              height={38}
              className="footer-logo"
              style={{ objectFit: "contain", marginBottom: "1.5rem" }}
            />

            {/* Address */}
            <address style={{
              fontStyle: "normal",
              fontSize: "0.82rem",
              color: "var(--text-46)",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}>
              A-34, Okhla Industrial Area<br />
              Phase I, New Delhi - 110020<br />
              India
            </address>

            {/* Phone + Email */}
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: "0.72rem", color: "var(--text-35)", margin: "0 0 0.3rem", fontWeight: 500 }}>
                  Phone number
                </p>
                <a href="tel:+18002626227" style={{
                  fontSize: "0.85rem", fontWeight: 600,
                  color: "var(--text-80)", textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-80)"; }}
                >
                  +971 4 000 0000
                </a>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", color: "var(--text-35)", margin: "0 0 0.3rem", fontWeight: 500 }}>
                  Email
                </p>
                <a href="mailto:info@manntours.com" style={{
                  fontSize: "0.85rem", fontWeight: 600,
                  color: "var(--text-80)", textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-80)"; }}
                >
                  info@manntours.com
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Three link columns ── */}
          <div style={{
            display: "flex",
            gap: "clamp(2rem, 5vw, 5rem)",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}>

            {/* Quick links */}
            <div>
              <p style={{
                fontSize: "0.78rem", fontWeight: 600,
                color: "var(--text-55)",
                margin: "0 0 1.25rem",
                letterSpacing: "0.01em",
              }}>
                Quick links
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {QUICK_LINKS.map((l) => (
                  <li key={l.label}><FooterLink label={l.label} href={l.href} /></li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <p style={{
                fontSize: "0.78rem", fontWeight: 600,
                color: "var(--text-55)",
                margin: "0 0 1.25rem",
                letterSpacing: "0.01em",
              }}>
                Social
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {SOCIAL_LINKS.map((l) => (
                  <li key={l.label}><FooterLink label={l.label} href={l.href} /></li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p style={{
                fontSize: "0.78rem", fontWeight: 600,
                color: "var(--text-55)",
                margin: "0 0 1.25rem",
                letterSpacing: "0.01em",
              }}>
                Legal
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {LEGAL_LINKS.map((l) => (
                  <li key={l.label}><FooterLink label={l.label} href={l.href} /></li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{
          height: "1px",
          background: "var(--border-subtle)",
          margin: "2.5rem 0 1.5rem",
        }} />

        {/* ── Copyright — centered ── */}
        <p style={{
          textAlign: "center",
          fontSize: "0.78rem",
          color: "var(--text-35)",
          margin: 0,
        }}>
          © {new Date().getFullYear()} MANN Fleet Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
