"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
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

function IgIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ── Hover link ─────────────────────────────────────────────── */
function FooterLink({ label, href, icon }: { label: string; href: string; icon?: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        fontSize: "0.875rem",
        fontWeight: 400,
        color: hovered ? "var(--text-90)" : "var(--text-48)",
        textDecoration: "none",
        transition: "color 0.18s ease",
        lineHeight: 1,
      }}
    >
      {icon && <span style={{ flexShrink: 0, opacity: hovered ? 1 : 0.6, transition: "opacity 0.18s ease" }}>{icon}</span>}
      {label}
    </Link>
  );
}

/* ── Link columns data ──────────────────────────────────────── */
const QUICK_LINKS = [
  { label: "Fleet", href: "/fleet" },
  { label: "Investors", href: "/investors" },
  { label: "About us", href: "/about" },
  { label: "Awards", href: "/awards" },
  { label: "Contact us", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: <IgIcon /> },
  { label: "WhatsApp", href: "https://wa.me/919990222999", icon: <WhatsAppIcon /> },
  { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
  { label: "Twitter / X", href: "#", icon: <TwitterIcon /> },
  { label: "Facebook", href: "#", icon: <FacebookIcon /> },
  { label: "YouTube", href: "#", icon: <YouTubeIcon /> },
];

const LEGAL_LINKS = [
  { label: "Terms of service", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
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
            <Link
              href="/fleet"
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
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.80)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.80)";
              }}
            >
              Get started
              <ArrowUpRight size={14} />
            </Link>
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
                  <li key={l.label}><FooterLink label={l.label} href={l.href} icon={l.icon} /></li>
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
