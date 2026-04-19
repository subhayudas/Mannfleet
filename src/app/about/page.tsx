"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */
function ArrowDown({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}
function IconDiplomacy() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function IconNational() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconLogistics() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconInstitution() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}
function IconSports() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15 15 0 0 0 0 20" />
      <path d="M2 12h20" />
    </svg>
  );
}
function IconCar() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2" />
      <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
    </svg>
  );
}
function IconEvent() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconBespoke() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   PDF CERTIFICATE MODAL
══════════════════════════════════════════════════════════════ */
interface CertEntry { title: string; issuer: string; year?: string; pdf: string }

function CertModal({ entry, onClose }: { entry: CertEntry; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power2.out" });
    gsap.fromTo(panelRef.current,
      { opacity: 0, scale: 0.93, y: 32 },
      { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: "back.out(1.5)" }
    );
  }, [mounted]);

  const handleClose = useCallback(() => {
    gsap.to(panelRef.current,   { opacity: 0, scale: 0.94, y: 16, duration: 0.2, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.26, ease: "power2.in", onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [handleClose]);

  if (!mounted) return null;
  return createPortal(
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1200,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.25rem",
      }}
    >
      <div ref={panelRef} style={{
        width: "100%", maxWidth: 760,
        maxHeight: "92vh",
        borderRadius: "1.75rem",
        overflow: "hidden",
        background: "var(--bg-surface)",
        border: "1px solid var(--border-mid)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 var(--inner-light)",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{
          padding: "1.5rem 1.75rem 1.25rem",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--glass-ultra)",
          backdropFilter: "blur(20px)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Trophy illustration */}
            <div style={{
              width: 52, height: 52, borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(200,40,40,0.18) 0%, rgba(200,40,40,0.06) 100%)",
              border: "1px solid rgba(200,40,40,0.28)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 16px rgba(200,40,40,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                stroke="var(--accent)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21h8M12 17v4" />
                <path d="M7 4H4a2 2 0 0 0-2 2v1c0 3.31 2.69 6 6 6" />
                <path d="M17 4h3a2 2 0 0 1 2 2v1c0 3.31-2.69 6-6 6" />
                <path d="M12 17c-3.87 0-7-3.13-7-7V4h14v6c0 3.87-3.13 7-7 7z" />
              </svg>
            </div>
            <div>
              <p className="font-sans" style={{
                fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "var(--accent)", margin: "0 0 0.25rem",
              }}>Certificate of Recognition</p>
              <h3 className="font-sans" style={{
                fontSize: "0.95rem", fontWeight: 700,
                color: "var(--text-primary)", margin: "0 0 0.2rem", lineHeight: 1.3,
              }}>{entry.title}</h3>
              <p className="font-sans" style={{
                fontSize: "0.72rem", color: "var(--text-muted)", margin: 0,
              }}>
                {entry.issuer}{entry.year ? ` · ${entry.year}` : ""}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
            <a
              href={entry.pdf} download
              className="btn-ghost font-sans"
              style={{ fontSize: "0.68rem", padding: "0.42rem 0.9rem", display: "inline-flex", alignItems: "center", gap: "0.35rem", textDecoration: "none" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </a>
            <button
              onClick={handleClose}
              style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "var(--glass-mid)", border: "1px solid var(--border-subtle)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--text-muted)",
                flexShrink: 0,
              }}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <div style={{ flex: 1, minHeight: 0, position: "relative", background: "#1a1714" }}>
          {/* Decorative corner marks */}
          {["topLeft","topRight","bottomLeft","bottomRight"].map((pos) => (
            <div key={pos} style={{
              position: "absolute", zIndex: 2,
              width: 20, height: 20,
              ...(pos.includes("top")    ? { top: 10 }    : { bottom: 10 }),
              ...(pos.includes("Left")   ? { left: 10 }   : { right: 10 }),
              borderTop:    pos.includes("top")   ? "2px solid rgba(200,40,40,0.35)" : "none",
              borderBottom: pos.includes("bottom")? "2px solid rgba(200,40,40,0.35)" : "none",
              borderLeft:   pos.includes("Left")  ? "2px solid rgba(200,40,40,0.35)" : "none",
              borderRight:  pos.includes("Right") ? "2px solid rgba(200,40,40,0.35)" : "none",
              pointerEvents: "none",
            }} />
          ))}
          <iframe
            src={`${entry.pdf}#toolbar=0&view=FitH`}
            title={entry.title}
            style={{ width: "100%", height: "100%", minHeight: 480, border: "none", display: "block" }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openCert, setOpenCert] = useState<CertEntry | null>(null);

  /* ── Hero refs ── */
  const heroBadgeRef    = useRef<HTMLDivElement>(null);
  const heroLine1Ref    = useRef<HTMLSpanElement>(null);
  const heroLine2Ref    = useRef<HTMLSpanElement>(null);
  const heroLine3Ref    = useRef<HTMLSpanElement>(null);
  const heroYearRef     = useRef<HTMLDivElement>(null);
  const heroSublineRef  = useRef<HTMLParagraphElement>(null);
  const heroScrollRef   = useRef<HTMLDivElement>(null);

  /* ── OUR USPs refs ── */
  const uspSectionRef  = useRef<HTMLElement>(null);
  const uspHeadRef     = useRef<HTMLDivElement>(null);
  const uspCardsRef    = useRef<HTMLDivElement>(null);

  /* ── What We Are refs ── */
  const wareSectionRef  = useRef<HTMLElement>(null);
  const wareLabelRef    = useRef<HTMLDivElement>(null);
  const wareLeftRef     = useRef<HTMLDivElement>(null);
  const wareRightRef    = useRef<HTMLDivElement>(null);
  const warePillsRef    = useRef<HTMLDivElement>(null);
  const wareRingRef     = useRef<HTMLDivElement>(null);

  /* ── Timeline refs ── */
  const timelineSectionRef = useRef<HTMLElement>(null);
  const timelineLineRef    = useRef<HTMLDivElement>(null);
  const timelineCard1Ref   = useRef<HTMLDivElement>(null);
  const timelineCard2Ref   = useRef<HTMLDivElement>(null);
  const timelineCard3Ref   = useRef<HTMLDivElement>(null);
  const dot1Ref            = useRef<HTMLDivElement>(null);
  const dot2Ref            = useRef<HTMLDivElement>(null);
  const dot3Ref            = useRef<HTMLDivElement>(null);

  /* ── What We Do refs ── */
  const wdoSectionRef  = useRef<HTMLElement>(null);
  const wdoHeadRef     = useRef<HTMLHeadingElement>(null);
  const wdoParaRef     = useRef<HTMLParagraphElement>(null);
  const wdoCardsRef    = useRef<HTMLDivElement>(null);

  /* ── Track Record refs ── */
  const trackSectionRef    = useRef<HTMLElement>(null);
  const trackWatermarkRef  = useRef<HTMLDivElement>(null);
  const trackLabelRef      = useRef<HTMLDivElement>(null);
  const trackCard1Ref      = useRef<HTMLDivElement>(null);
  const trackCard2Ref      = useRef<HTMLDivElement>(null);
  const trackCard3Ref      = useRef<HTMLDivElement>(null);
  const trackCard4Ref      = useRef<HTMLDivElement>(null);
  const trackCard5Ref      = useRef<HTMLDivElement>(null);
  const stat1Ref           = useRef<HTMLSpanElement>(null);
  const stat2Ref           = useRef<HTMLSpanElement>(null);
  const stat3Ref           = useRef<HTMLSpanElement>(null);

  /* ── Stats bar refs ── */
  const statsBarRef    = useRef<HTMLElement>(null);
  const statsNum1Ref   = useRef<HTMLSpanElement>(null);
  const statsNum3Ref   = useRef<HTMLSpanElement>(null);
  const statsNum4Ref   = useRef<HTMLSpanElement>(null);

  /* ── Global presence refs ── */
  const globalSectionRef = useRef<HTMLElement>(null);
  const globalHeadRef    = useRef<HTMLHeadingElement>(null);
  const globalBadgesRef  = useRef<HTMLDivElement>(null);

  /* ── Awards & Appreciations refs ── */
  const awardsSectionRef = useRef<HTMLElement>(null);
  const awardsHeadRef    = useRef<HTMLDivElement>(null);
  const awardsGridRef    = useRef<HTMLDivElement>(null);
  const apprecListRef    = useRef<HTMLDivElement>(null);

  /* ── CTA refs ── */
  const ctaSectionRef   = useRef<HTMLElement>(null);
  const ctaWrapRef      = useRef<HTMLDivElement>(null);
  const ctaLine1Ref     = useRef<HTMLParagraphElement>(null);
  const ctaLine2Ref     = useRef<HTMLParagraphElement>(null);
  const ctaBtnRef       = useRef<HTMLButtonElement>(null);
  const ctaLineLeftRef  = useRef<HTMLDivElement>(null);
  const ctaLineRightRef = useRef<HTMLDivElement>(null);

  /* ── Cinematic reel refs ── */
  const reelSectionRef  = useRef<HTMLElement>(null);
  const reelOverlayRef  = useRef<HTMLDivElement>(null);
  const reelQuoteRef    = useRef<HTMLDivElement>(null);

  /* ── Awards photos ref ── */
  const awardsPhotoRef  = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ────────────────────────────────────────────────
         HERO — entrance (no ScrollTrigger)
      ──────────────────────────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(heroBadgeRef.current,
        { y: 40, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 }
      );
      tl.fromTo(
        [heroLine1Ref.current, heroLine2Ref.current, heroLine3Ref.current],
        { y: 70, opacity: 0, filter: "blur(12px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.14 },
        "-=0.4"
      );
      tl.fromTo(heroYearRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );
      tl.fromTo(heroSublineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        "-=0.35"
      );
      tl.fromTo(heroScrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      );
      // Scroll indicator infinite float
      gsap.to(heroScrollRef.current, {
        y: 10, duration: 1.1, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.2,
      });

      /* ────────────────────────────────────────────────
         OUR USPs — scroll-triggered
      ──────────────────────────────────────────────── */
      gsap.fromTo(uspHeadRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: uspSectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(uspCardsRef.current!.children,
        { y: 60, opacity: 0, scale: 0.94 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.14, ease: "power3.out",
          scrollTrigger: { trigger: uspCardsRef.current, start: "top 82%" },
        }
      );

      /* ────────────────────────────────────────────────
         WHAT WE ARE — scroll-triggered
      ──────────────────────────────────────────────── */
      // Parallax decorative ring
      gsap.to(wareRingRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: wareSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.fromTo(wareLabelRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: wareSectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(wareLeftRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: wareSectionRef.current, start: "top 72%" },
        }
      );
      gsap.fromTo(wareRightRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: wareSectionRef.current, start: "top 72%" },
        }
      );
      gsap.fromTo(warePillsRef.current!.children,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: warePillsRef.current, start: "top 82%" },
        }
      );

      /* ────────────────────────────────────────────────
         TIMELINE
      ──────────────────────────────────────────────── */
      gsap.fromTo(timelineLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineSectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      const timelineItems = [
        { card: timelineCard1Ref.current, dot: dot1Ref.current, x: -90 },
        { card: timelineCard2Ref.current, dot: dot2Ref.current, x: 90 },
        { card: timelineCard3Ref.current, dot: dot3Ref.current, x: -90 },
      ];
      timelineItems.forEach(({ card, dot, x }) => {
        gsap.fromTo(card,
          { x, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 82%" },
          }
        );
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)",
            scrollTrigger: { trigger: card, start: "top 82%" },
          }
        );
      });

      /* ────────────────────────────────────────────────
         WHAT WE DO
      ──────────────────────────────────────────────── */
      gsap.fromTo(wdoHeadRef.current,
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: wdoSectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(wdoParaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: wdoSectionRef.current, start: "top 74%" },
        }
      );
      gsap.fromTo(wdoCardsRef.current!.children,
        { y: 80, opacity: 0, scale: 0.94 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.18, ease: "power3.out",
          scrollTrigger: { trigger: wdoCardsRef.current, start: "top 80%" },
        }
      );

      /* ────────────────────────────────────────────────
         TRACK RECORD
      ──────────────────────────────────────────────── */
      gsap.to(trackWatermarkRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: trackSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
      gsap.fromTo(trackLabelRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: trackSectionRef.current, start: "top 78%" },
        }
      );

      const trackCards = [
        { el: trackCard1Ref.current, x: -100, rotate: -2 },
        { el: trackCard2Ref.current, x: 100,  rotate: 2 },
        { el: trackCard3Ref.current, x: 0,    y: 80, rotate: 0 },
        { el: trackCard4Ref.current, x: -100, rotate: -1 },
        { el: trackCard5Ref.current, x: 100,  rotate: 1 },
      ];
      trackCards.forEach(({ el, x, rotate, y }) => {
        gsap.fromTo(el,
          { x, y: y ?? 0, opacity: 0, rotate },
          {
            x: 0, y: 0, opacity: 1, rotate: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Count-up animations
      const countUps = [
        { el: stat1Ref.current, target: 4, suffix: "" },
        { el: stat2Ref.current, target: 2000, suffix: "+" },
        { el: stat3Ref.current, target: 500, suffix: "+" },
      ];
      countUps.forEach(({ el, target, suffix }) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString() + suffix;
          },
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      /* ────────────────────────────────────────────────
         STATS BAR
      ──────────────────────────────────────────────── */
      gsap.fromTo(statsBarRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: statsBarRef.current, start: "top 82%" },
        }
      );
      const barCountUps = [
        { el: statsNum1Ref.current, target: 40, suffix: "+" },
        { el: statsNum3Ref.current, target: 4, suffix: "" },
        { el: statsNum4Ref.current, target: 2000, suffix: "+" },
      ];
      barCountUps.forEach(({ el, target, suffix }) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString() + suffix;
          },
          scrollTrigger: { trigger: statsBarRef.current, start: "top 82%" },
        });
      });

      /* ────────────────────────────────────────────────
         GLOBAL PRESENCE
      ──────────────────────────────────────────────── */
      gsap.fromTo(globalHeadRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: globalSectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(globalBadgesRef.current!.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.55, stagger: 0.15, ease: "back.out(1.7)",
          scrollTrigger: { trigger: globalBadgesRef.current, start: "top 82%" },
        }
      );

      /* ────────────────────────────────────────────────
         CLOSING CTA
      ──────────────────────────────────────────────── */
      gsap.fromTo(ctaWrapRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ctaSectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(ctaLine1Ref.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ctaSectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(ctaLine2Ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, delay: 0.3, ease: "power3.out",
          scrollTrigger: { trigger: ctaSectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(ctaBtnRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, delay: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: ctaSectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(ctaLineLeftRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, duration: 1.1, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: ctaSectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(ctaLineRightRef.current,
        { scaleX: 0, transformOrigin: "right center" },
        {
          scaleX: 1, duration: 1.1, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: ctaSectionRef.current, start: "top 75%" },
        }
      );

      /* ────────────────────────────────────────────────
         AWARDS & APPRECIATIONS
      ──────────────────────────────────────────────── */
      gsap.fromTo(awardsHeadRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: awardsSectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(awardsGridRef.current!.children,
        { y: 60, opacity: 0, scale: 0.94 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: awardsGridRef.current, start: "top 82%" },
        }
      );
      gsap.fromTo(apprecListRef.current!.children,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: apprecListRef.current, start: "top 82%" },
        }
      );
      /* ────────────────────────────────────────────────
         CINEMATIC REEL
      ──────────────────────────────────────────────── */
      gsap.fromTo(reelOverlayRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: reelSectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(reelQuoteRef.current,
        { y: 40, opacity: 0, filter: "blur(8px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: reelSectionRef.current, start: "top 72%" },
        }
      );

      /* ────────────────────────────────────────────────
         AWARDS PHOTOS
      ──────────────────────────────────────────────── */
      if (awardsPhotoRef.current) {
        gsap.fromTo(awardsPhotoRef.current.children[0],
          { x: -60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: awardsPhotoRef.current, start: "top 82%" },
          }
        );
        gsap.fromTo(awardsPhotoRef.current.children[1],
          { x: 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: awardsPhotoRef.current, start: "top 82%" },
          }
        );
      }

    }, pageRef);

    return () => ctx.revert();
  }, []);

  /* ════════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════════ */
  return (
    <div ref={pageRef}>
      {openCert && <CertModal entry={openCert} onClose={() => setOpenCert(null)} />}
      <Navbar />

      {/* ══════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        background: "#100E0B",
      }}>
        {/* Background video */}
        <video
          autoPlay muted loop playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: 0.22,
            zIndex: 0,
          }}
        >
          <source src="/Maanherovideo.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient over video */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(16,14,11,0.55) 0%, rgba(16,14,11,0.30) 50%, rgba(16,14,11,0.75) 100%)",
          zIndex: 1, pointerEvents: "none",
        }} />

        {/* Faint watermark */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 2,
        }}>
          <span className="font-serif" style={{
            fontSize: "clamp(8rem, 26vw, 22rem)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.025)",
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}>
            MANN
          </span>
        </div>

        {/* Subtle radial glow */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(160,30,30,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 3,
        }} />

        {/* Content */}
        <div style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: 900,
        }}>
          {/* Badge */}
          <div ref={heroBadgeRef} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.3rem 1rem",
            borderRadius: "9999px",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            marginBottom: "2rem",
            opacity: 0,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 0 3px rgba(200,40,40,0.22)",
              flexShrink: 0,
            }} />
            <span className="font-sans" style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
            }}>
              Mann Fleet Partners Limited
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif" style={{
            fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
            fontWeight: 400,
            lineHeight: 1.0,
            color: "#ffffff",
            letterSpacing: "0.01em",
            margin: 0,
            textShadow: "0 2px 40px rgba(0,0,0,0.5)",
          }}>
            <span ref={heroLine1Ref} style={{ display: "block", opacity: 0 }}>Our</span>
            <span ref={heroLine2Ref} className="italic" style={{
              display: "block", opacity: 0, color: "rgba(255,255,255,0.70)",
            }}>Story</span>
            <span ref={heroLine3Ref} style={{
              display: "block", opacity: 0,
              fontSize: "0.36em",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.22)",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              marginTop: "0.6em",
            }}>of Excellence</span>
          </h1>

          {/* Year */}
          <div ref={heroYearRef} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            marginTop: "2.5rem",
            opacity: 0,
          }}>
            <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.20)" }} />
            <span className="font-sans" style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.42)",
            }}>Est. 1986</span>
            <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.20)" }} />
          </div>

          {/* Subline */}
          <p ref={heroSublineRef} className="font-sans" style={{
            marginTop: "1.25rem",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.40)",
            maxWidth: 480,
            opacity: 0,
          }}>
            Four decades of perfection. One name that defines excellence in global ground transportation.
          </p>
        </div>

        {/* Scroll indicator */}
        <div ref={heroScrollRef} style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          opacity: 0,
          color: "rgba(255,255,255,0.28)",
          zIndex: 11,
        }}>
          <span className="font-sans" style={{
            fontSize: "0.58rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
          }}>Scroll</span>
          <ArrowDown size={16} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. OUR USPs
      ══════════════════════════════════════════════ */}
      <section ref={uspSectionRef} style={{
        background: "var(--bg-base)",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>

          {/* ── Neobrutalist header ── */}
          <div ref={uspHeadRef} style={{ marginBottom: "3.5rem", opacity: 0 }}>
            <div style={{
              borderTop: "4px solid var(--text-primary)",
              paddingTop: "1.25rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "baseline",
              gap: "1.5rem",
            }}>
              <span className="font-sans" style={{
                fontSize: "clamp(0.65rem, 1.2vw, 0.75rem)",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}>02 / Our Advantages</span>
            </div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "var(--text-primary)",
              margin: "0 0 1.25rem",
            }}>
              Why the world&apos;s most<br />
              <span className="italic">demanding clients choose us.</span>
            </h2>
            <p className="font-sans" style={{
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              maxWidth: 560,
              margin: 0,
            }}>
              Four decades of unmatched excellence — six reasons that set Mann Fleet apart from every alternative.
            </p>
          </div>

          {/* ── Neobrutalist card grid ── */}
          <div ref={uspCardsRef} style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
          }}>

            {/* Card 1 — 40+ Years (span 2, red) */}
            <div style={{
              gridColumn: "span 2",
              background: "var(--accent)",
              border: "3px solid var(--text-primary)",
              borderRight: "1.5px solid var(--text-primary)",
              borderBottom: "1.5px solid var(--text-primary)",
              padding: "2.25rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 280,
              opacity: 0,
            }}>
              <div style={{
                fontSize: "clamp(4rem, 8vw, 7rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "rgba(255,255,255,0.18)",
                fontFamily: "var(--font-geist-sans, sans-serif)",
                userSelect: "none",
              }}>01</div>
              <div>
                <div style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.35)",
                  marginBottom: "1rem",
                }} />
                <h3 className="font-sans" style={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  margin: "0 0 0.6rem",
                }}>40+ Years of Expertise</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.82)",
                  margin: 0,
                  maxWidth: 480,
                }}>
                  Four decades of industry leadership since 1986. We have set the gold standard for luxury ground transportation — twice incorporated, always ahead.
                </p>
              </div>
            </div>

            {/* Card 2 — Fortune 500 */}
            <div style={{
              background: "var(--bg-surface)",
              border: "3px solid var(--text-primary)",
              borderLeft: "1.5px solid var(--text-primary)",
              borderBottom: "1.5px solid var(--text-primary)",
              padding: "2.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: 0,
            }}>
              <div style={{
                fontSize: "clamp(3rem, 5vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "var(--text-primary)",
                opacity: 0.10,
                fontFamily: "var(--font-geist-sans, sans-serif)",
                userSelect: "none",
              }}>02</div>
              <div>
                <div style={{
                  height: "2px",
                  background: "var(--text-primary)",
                  marginBottom: "1rem",
                }} />
                <h3 className="font-sans" style={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  margin: "0 0 0.6rem",
                }}>Fortune 500 Clientele</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}>
                  Trusted by the world&apos;s most prestigious corporations, diplomatic embassies, and high-net-worth individuals across India and global markets.
                </p>
              </div>
            </div>

            {/* Card 3 — Awards (deep beige) */}
            <div style={{
              background: "var(--bg-deep)",
              border: "3px solid var(--text-primary)",
              borderTop: "1.5px solid var(--text-primary)",
              borderRight: "1.5px solid var(--text-primary)",
              padding: "2.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: 0,
            }}>
              <div style={{
                fontSize: "clamp(3rem, 5vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "var(--text-primary)",
                opacity: 0.10,
                fontFamily: "var(--font-geist-sans, sans-serif)",
                userSelect: "none",
              }}>03</div>
              <div>
                <div style={{
                  height: "2px",
                  background: "var(--text-primary)",
                  marginBottom: "1rem",
                }} />
                <h3 className="font-sans" style={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  margin: "0 0 0.6rem",
                }}>3× National Award Winners</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}>
                  Consecutive National Tourism Awards (2016–2019) from the Ministry of Tourism, Government of India — the highest recognition in our industry.
                </p>
              </div>
            </div>

            {/* Card 4 — Diplomatic Trust (span 2, dark) */}
            <div style={{
              gridColumn: "span 2",
              background: "var(--text-primary)",
              border: "3px solid var(--text-primary)",
              borderLeft: "1.5px solid var(--text-primary)",
              borderTop: "1.5px solid var(--text-primary)",
              padding: "2.25rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 260,
              opacity: 0,
            }}>
              <div style={{
                fontSize: "clamp(4rem, 8vw, 7rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "rgba(244,239,230,0.12)",
                fontFamily: "var(--font-geist-sans, sans-serif)",
                userSelect: "none",
              }}>04</div>
              <div>
                <div style={{
                  height: "1px",
                  background: "rgba(244,239,230,0.25)",
                  marginBottom: "1rem",
                }} />
                <h3 className="font-sans" style={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--bg-base)",
                  margin: "0 0 0.6rem",
                }}>Diplomatic Trust</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "rgba(244,239,230,0.72)",
                  margin: 0,
                  maxWidth: 480,
                }}>
                  Managed the last four US Presidential Visits (2011, 2014, 2020, 2023). Trusted partners to the Embassies of UAE, Qatar, Canada, and Finland.
                </p>
              </div>
            </div>

            {/* Card 5 — Pan-India */}
            <div style={{
              background: "var(--bg-deep)",
              border: "3px solid var(--text-primary)",
              borderTop: "1.5px solid var(--text-primary)",
              borderRight: "1.5px solid var(--text-primary)",
              borderBottom: "none",
              padding: "2.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: 0,
            }}>
              <div style={{
                fontSize: "clamp(3rem, 5vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "var(--text-primary)",
                opacity: 0.10,
                fontFamily: "var(--font-geist-sans, sans-serif)",
                userSelect: "none",
              }}>05</div>
              <div>
                <div style={{
                  height: "2px",
                  background: "var(--text-primary)",
                  marginBottom: "1rem",
                }} />
                <h3 className="font-sans" style={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  margin: "0 0 0.6rem",
                }}>Pan-India Reach</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}>
                  Seamless operations across 85+ cities in India — from metro hubs to tier-2 cities — with a single point of contact and consistent service quality.
                </p>
              </div>
            </div>

            {/* Card 6 — Global Hubs (span 2) */}
            <div style={{
              gridColumn: "span 2",
              background: "var(--bg-base)",
              border: "3px solid var(--text-primary)",
              borderLeft: "1.5px solid var(--text-primary)",
              borderTop: "1.5px solid var(--text-primary)",
              borderBottom: "none",
              padding: "2.25rem 2.5rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "3rem",
              opacity: 0,
            }}>
              <div style={{
                fontSize: "clamp(4rem, 8vw, 7rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "var(--text-primary)",
                opacity: 0.08,
                fontFamily: "var(--font-geist-sans, sans-serif)",
                userSelect: "none",
                flexShrink: 0,
              }}>06</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  height: "2px",
                  background: "var(--text-primary)",
                  marginBottom: "1rem",
                }} />
                <h3 className="font-sans" style={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  margin: "0 0 0.6rem",
                }}>4 Global Hubs</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}>
                  Beyond India, we operate in UAE (Dubai &amp; Abu Dhabi), Saudi Arabia (Riyadh &amp; Jeddah), and England (London &amp; surrounds) — delivering world-class service wherever you are.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. WHAT WE DO (moved here from section 4)
      ══════════════════════════════════════════════ */}
      <section ref={wdoSectionRef} style={{
        background: "var(--bg-base)",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 700, marginBottom: "3.5rem" }}>
            <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>What We Do</span>
            <h2 ref={wdoHeadRef} className="font-serif" style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--text-primary)",
              margin: "0 0 1.5rem",
              opacity: 0,
            }}>
              Full-Stack<br />
              <span className="italic" style={{ color: "var(--text-secondary)" }}>Chauffeured Services</span>
            </h2>
            <p ref={wdoParaRef} className="font-sans" style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              margin: 0,
              opacity: 0,
            }}>
              From ultra-luxury sedans to high-capacity premium coaches, we deliver seamless end-to-end mobility. Technology-enabled fleet management meets a relentless commitment to safety and punctuality.
            </p>
          </div>

          <div ref={wdoCardsRef} style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "1.25rem",
          }}>
            {[
              {
                icon: <IconCar />,
                title: "Corporate Car Rentals",
                badge: "CCR",
                desc: "Mission-critical, technology-enabled fleet management for Fortune 500 corporates, embassies, and institutional clients. Seamless, on-demand, always punctual.",
              },
              {
                icon: <IconEvent />,
                title: "Event Transportation",
                badge: "Bespoke",
                desc: "End-to-end mobility for world-class events — from G20 summits to landmark VVIP weddings. We flawlessly execute the most complex logistical requirements.",
              },
              {
                icon: <IconBespoke />,
                title: "Retail Solutions",
                badge: "Premium",
                desc: "Bespoke retail transport solutions for high-net-worth individuals and discerning travellers. Ultra-luxury vehicles, curated for perfection.",
              },
            ].map(({ icon, title, badge, desc }) => (
              <div key={title} className="glass-card" style={{
                padding: "2rem",
                borderRadius: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                opacity: 0,
              }}>
                <div style={{
                  width: 52, height: 52,
                  borderRadius: "14px",
                  background: "var(--glass-mid)",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-primary)",
                  boxShadow: "inset 0 1px 0 var(--inner-light)",
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                    <h3 className="font-sans" style={{
                      fontSize: "1rem", fontWeight: 600,
                      color: "var(--text-primary)", margin: 0,
                    }}>{title}</h3>
                    <span className="glass-badge" style={{ fontSize: "0.58rem" }}>{badge}</span>
                  </div>
                  <p className="font-sans" style={{
                    fontSize: "0.875rem", lineHeight: 1.7,
                    color: "var(--text-secondary)", margin: 0,
                  }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. WHAT WE ARE
      ══════════════════════════════════════════════ */}
      <section ref={wareSectionRef} style={{
        position: "relative",
        background: "var(--bg-base)",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}>
        {/* Parallax decorative ring */}
        <div ref={wareRingRef} style={{
          position: "absolute",
          top: "5%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          border: "1px solid var(--border-subtle)",
          pointerEvents: "none",
          zIndex: 0,
        }} />
        <div style={{
          position: "absolute",
          top: "15%",
          right: "-5%",
          width: "40vw",
          height: "40vw",
          maxWidth: 520,
          maxHeight: 520,
          borderRadius: "50%",
          border: "1px solid var(--border-subtle)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.5,
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto" }}>
          {/* Label */}
          <div ref={wareLabelRef} style={{ marginBottom: "3rem", opacity: 0 }}>
            <span className="glass-badge">What We Are</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "clamp(2.5rem, 5vw, 5rem)",
            alignItems: "start",
          }}>
            {/* LEFT — founding callout + stat pills */}
            <div ref={wareLeftRef} style={{ opacity: 0 }}>
              <h2 className="font-serif" style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 400,
                lineHeight: 1.12,
                color: "var(--text-primary)",
                margin: "0 0 2rem",
              }}>
                <span className="italic" style={{ color: "var(--text-secondary)" }}>Founded</span>
                <br />
                <span>1986.</span>
                <br />
                <span className="italic" style={{
                  fontSize: "0.55em",
                  color: "var(--text-muted)",
                  letterSpacing: "0.02em",
                }}>Incorporated 1992.</span>
              </h2>

              {/* Stat pills */}
              <div ref={warePillsRef} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { val: "40+",  label: "Years of industry leadership" },
                  { val: "F500", label: "Fortune 500 clientele" },
                  { val: "85+",  label: "Cities across India & 4 global hubs — UAE, KSA, England" },
                ].map(({ val, label }) => (
                  <div key={label} className="glass-panel" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    padding: "0.9rem 1.4rem",
                    borderRadius: "1rem",
                    opacity: 0,
                  }}>
                    <span className="font-serif" style={{
                      fontSize: "1.6rem",
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      minWidth: 64,
                      letterSpacing: "-0.01em",
                    }}>{val}</span>
                    <div style={{ width: 1, height: 32, background: "var(--border-subtle)", flexShrink: 0 }} />
                    <span className="font-sans" style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — body text */}
            <div ref={wareRightRef} style={{ opacity: 0, paddingTop: "0.5rem" }}>
              <p className="font-sans" style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
              }}>
                Mann Fleet Partners Limited stands as the <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>dominant force in the luxury rental market</strong> and the premier provider of global ground transportation solutions.
              </p>
              <p className="font-sans" style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
              }}>
                We serve an elite, sophisticated clientele — including Fortune 500 giants, diplomatic embassies, and high-net-worth individuals — across India and key international hubs such as the <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>UAE, Saudi Arabia, and England</strong>.
              </p>
              <p className="font-sans" style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
              }}>
                As one of the world&apos;s most admired luxury car, van, and coach rental companies, we have set the gold standard for excellence in the global transport industry.
              </p>

              {/* Accent rule */}
              <div style={{
                marginTop: "2.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}>
                <div style={{ width: 40, height: 2, background: "var(--accent)", borderRadius: 2 }} />
                <span className="font-sans" style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}>
                  Three-time National Award Winners
                </span>
              </div>

              {/* Video card */}
              <div style={{
                marginTop: "2.5rem",
                position: "relative",
                borderRadius: "1.5rem",
                overflow: "hidden",
                border: "1px solid var(--border-mid)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
                height: 220,
              }}>
                <video
                  autoPlay muted loop playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                >
                  <source src="/0_Car_Expensive_1280x720.mp4" type="video/mp4" />
                </video>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.05) 100%)",
                  pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute",
                  top: "1rem", left: "1rem",
                }}>
                  <span className="font-sans" style={{
                    fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.75)",
                    padding: "0.22rem 0.7rem",
                    borderRadius: 9999,
                    background: "rgba(0,0,0,0.40)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(8px)",
                  }}>Fleet in Motion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. LEGACY TIMELINE
      ══════════════════════════════════════════════ */}
      <section ref={timelineSectionRef} style={{
        background: "var(--bg-surface)",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Section label */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="glass-badge">Our Journey</span>
            <h2 className="font-serif" style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              marginTop: "1rem",
              lineHeight: 1.2,
            }}>
              Four Decades, <span className="italic" style={{ color: "var(--text-secondary)" }}>One Vision</span>
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div ref={timelineLineRef} style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: "var(--border-mid)",
              transform: "translateX(-50%) scaleY(0)",
              transformOrigin: "top center",
            }} />

            {/* Milestone 1 — LEFT */}
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "calc(50% + 2.5rem)",
              marginBottom: "3.5rem",
              position: "relative",
            }}>
              <div ref={dot1Ref} style={{
                position: "absolute",
                right: "calc(50% - 7px)",
                top: "1.2rem",
                width: 14, height: 14,
                borderRadius: "50%",
                background: "var(--accent)",
                border: "2px solid var(--bg-surface)",
                boxShadow: "0 0 0 3px rgba(200,40,40,0.18)",
                scale: 0,
              }} />
              <div ref={timelineCard1Ref} className="glass-panel" style={{
                padding: "1.5rem 1.75rem",
                borderRadius: "1.25rem",
                maxWidth: 380,
                opacity: 0,
              }}>
                <span className="glass-badge" style={{ marginBottom: "0.8rem", display: "inline-block" }}>1986</span>
                <h3 className="font-serif" style={{
                  fontSize: "1.4rem", fontWeight: 400,
                  color: "var(--text-primary)", margin: "0 0 0.6rem",
                }}>Founded</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem", lineHeight: 1.7,
                  color: "var(--text-secondary)", margin: 0,
                }}>
                  Established as a dedicated sole proprietorship, laying the foundation for India&apos;s premier ground transportation service.
                </p>
              </div>
            </div>

            {/* Milestone 2 — RIGHT */}
            <div style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "calc(50% + 2.5rem)",
              marginBottom: "3.5rem",
              position: "relative",
            }}>
              <div ref={dot2Ref} style={{
                position: "absolute",
                left: "calc(50% - 7px)",
                top: "1.2rem",
                width: 14, height: 14,
                borderRadius: "50%",
                background: "var(--text-primary)",
                border: "2px solid var(--bg-surface)",
                scale: 0,
              }} />
              <div ref={timelineCard2Ref} className="glass-panel" style={{
                padding: "1.5rem 1.75rem",
                borderRadius: "1.25rem",
                maxWidth: 380,
                opacity: 0,
              }}>
                <span className="glass-badge" style={{ marginBottom: "0.8rem", display: "inline-block" }}>1992</span>
                <h3 className="font-serif" style={{
                  fontSize: "1.4rem", fontWeight: 400,
                  color: "var(--text-primary)", margin: "0 0 0.6rem",
                }}>Formally Incorporated</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem", lineHeight: 1.7,
                  color: "var(--text-secondary)", margin: 0,
                }}>
                  Mann Tourist Transport Service Private Limited incorporated on August 7, 1992 — a pivotal moment that scaled our operations nationally.
                </p>
              </div>
            </div>

            {/* Milestone 3 — LEFT */}
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "calc(50% + 2.5rem)",
              position: "relative",
            }}>
              <div ref={dot3Ref} style={{
                position: "absolute",
                right: "calc(50% - 7px)",
                top: "1.2rem",
                width: 14, height: 14,
                borderRadius: "50%",
                background: "var(--accent)",
                border: "2px solid var(--bg-surface)",
                boxShadow: "0 0 0 3px rgba(200,40,40,0.18)",
                scale: 0,
              }} />
              <div ref={timelineCard3Ref} className="glass-panel" style={{
                padding: "1.5rem 1.75rem",
                borderRadius: "1.25rem",
                maxWidth: 380,
                opacity: 0,
              }}>
                <span className="glass-badge" style={{ marginBottom: "0.8rem", display: "inline-block" }}>Today</span>
                <h3 className="font-serif" style={{
                  fontSize: "1.4rem", fontWeight: 400,
                  color: "var(--text-primary)", margin: "0 0 0.6rem",
                }}>Industry Powerhouse</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem", lineHeight: 1.7,
                  color: "var(--text-secondary)", margin: 0,
                }}>
                  Mann Fleet Partners Limited — an award-winning, globally recognised mobility powerhouse. The gold standard in luxury ground transport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4b. CINEMATIC REEL
      ══════════════════════════════════════════════ */}
      <section ref={reelSectionRef} style={{
        position: "relative",
        height: "55vh",
        minHeight: 360,
        overflow: "hidden",
      }}>
        <video
          autoPlay muted loop playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/6636153_Car_Detailing_1280x720.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div ref={reelOverlayRef} style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.58)",
          zIndex: 1,
          opacity: 0,
        }} />

        {/* Quote */}
        <div ref={reelQuoteRef} style={{
          position: "absolute", inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          opacity: 0,
        }}>
          <div style={{
            width: 40, height: 1,
            background: "rgba(255,255,255,0.28)",
            marginBottom: "1.5rem",
          }} />
          <p className="font-serif italic" style={{
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.25,
            margin: "0 0 1.5rem",
            maxWidth: 680,
            textShadow: "0 2px 24px rgba(0,0,0,0.6)",
          }}>
            &ldquo;Perfection in every mile.&rdquo;
          </p>
          <div style={{
            width: 40, height: 1,
            background: "rgba(255,255,255,0.28)",
          }} />
          <span className="font-sans" style={{
            marginTop: "1.25rem",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.40)",
          }}>Mann Fleet Partners — Est. 1986</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. TRACK RECORD
      ══════════════════════════════════════════════ */}
      <section ref={trackSectionRef} style={{
        position: "relative",
        background: "var(--bg-deep)",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}>
        {/* Parallax watermark */}
        <div ref={trackWatermarkRef} style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}>
          <span className="font-serif" style={{
            fontSize: "clamp(5rem, 18vw, 14rem)",
            fontWeight: 400,
            color: "rgba(44,36,22,0.04)",
            letterSpacing: "0.1em",
          }}>TRACK RECORD</span>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto" }}>
          {/* Label + heading */}
          <div ref={trackLabelRef} style={{ textAlign: "center", marginBottom: "4rem", opacity: 0 }}>
            <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>
              Proven Excellence
            </span>
            <h2 className="font-serif" style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              margin: "0 0 0.75rem",
              lineHeight: 1.1,
            }}>
              Our Proven<br />
              <span className="italic" style={{ color: "var(--text-secondary)" }}>Track Record</span>
            </h2>
            <p className="font-sans" style={{
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
            }}>
              A legacy backed by the world&apos;s most trusted institutions, governments, and global events.
            </p>
          </div>

          {/* Achievement cards — staggered layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "1.25rem",
          }}>
            {/* Card 1 — Diplomatic, spans 7 cols */}
            <div ref={trackCard1Ref} className="glass-card" style={{
              gridColumn: "span 7",
              padding: "2.25rem",
              borderRadius: "1.75rem",
              opacity: 0,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "16px",
                  background: "var(--glass-light)",
                  border: "1px solid var(--border-subtle)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent)",
                }}>
                  <IconDiplomacy />
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="font-serif" style={{
                    fontSize: "3.5rem", fontWeight: 400,
                    color: "var(--text-primary)", lineHeight: 1,
                  }}>
                    <span ref={stat1Ref}>0</span>
                  </div>
                  <div className="font-sans" style={{
                    fontSize: "0.65rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}>US Presidential Visits</div>
                </div>
              </div>
              <h3 className="font-sans" style={{
                fontSize: "1.15rem", fontWeight: 700,
                color: "var(--text-primary)", margin: "0 0 0.6rem",
              }}>Diplomatic Excellence</h3>
              <p className="font-sans" style={{
                fontSize: "0.875rem", lineHeight: 1.7,
                color: "var(--text-secondary)", margin: "0 0 1.25rem",
              }}>
                Managed the last four US Presidential Visits (2011, 2014, 2020, 2023). Trusted partner to the Embassies of UAE, Qatar, Canada, and Finland.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {["2011", "2014", "2020", "2023"].map((yr) => (
                  <span key={yr} className="glass-badge" style={{ fontSize: "0.65rem" }}>{yr}</span>
                ))}
              </div>
            </div>

            {/* Card 2 — National Impact, spans 5 cols */}
            <div ref={trackCard2Ref} className="glass-card" style={{
              gridColumn: "span 5",
              padding: "2.25rem",
              borderRadius: "1.75rem",
              opacity: 0,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "16px",
                background: "var(--glass-light)",
                border: "1px solid var(--border-subtle)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-primary)", marginBottom: "1.5rem",
              }}>
                <IconNational />
              </div>
              <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block" }}>
                Ministry of External Affairs
              </span>
              <h3 className="font-sans" style={{
                fontSize: "1.15rem", fontWeight: 700,
                color: "var(--text-primary)", margin: "0 0 0.6rem",
              }}>National Impact</h3>
              <p className="font-sans" style={{
                fontSize: "0.875rem", lineHeight: 1.7,
                color: "var(--text-secondary)", margin: 0,
              }}>
                Appointed Official Transport Management Company for the G20 Summit (North &amp; East India) by the Ministry of External Affairs.
              </p>
            </div>

            {/* Card 3 — High-Profile Logistics, spans 5 cols */}
            <div ref={trackCard3Ref} className="glass-card" style={{
              gridColumn: "span 5",
              padding: "2.25rem",
              borderRadius: "1.75rem",
              opacity: 0,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "16px",
                background: "var(--glass-light)",
                border: "1px solid var(--border-subtle)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-primary)", marginBottom: "1.5rem",
              }}>
                <IconLogistics />
              </div>
              <div className="font-serif" style={{
                fontSize: "2.8rem", fontWeight: 400,
                color: "var(--text-primary)", lineHeight: 1, marginBottom: "0.25rem",
              }}>
                <span ref={stat2Ref}>0</span>
              </div>
              <div className="font-sans" style={{
                fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem",
              }}>VVIP Guests</div>
              <h3 className="font-sans" style={{
                fontSize: "1.15rem", fontWeight: 700,
                color: "var(--text-primary)", margin: "0 0 0.6rem",
              }}>High-Profile Logistics</h3>
              <p className="font-sans" style={{
                fontSize: "0.875rem", lineHeight: 1.7,
                color: "var(--text-secondary)", margin: 0,
              }}>
                Flawlessly executed transport for landmark weddings serving global heads of state and international celebrities.
              </p>
            </div>

            {/* Card 4 — Institutional Trust, spans 4 cols */}
            <div ref={trackCard4Ref} className="glass-card" style={{
              gridColumn: "span 4",
              padding: "2.25rem",
              borderRadius: "1.75rem",
              opacity: 0,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "16px",
                background: "var(--glass-light)",
                border: "1px solid var(--border-subtle)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-primary)", marginBottom: "1.5rem",
              }}>
                <IconInstitution />
              </div>
              <h3 className="font-sans" style={{
                fontSize: "1.15rem", fontWeight: 700,
                color: "var(--text-primary)", margin: "0 0 0.6rem",
              }}>Institutional Trust</h3>
              <p className="font-sans" style={{
                fontSize: "0.875rem", lineHeight: 1.7,
                color: "var(--text-secondary)", margin: "0 0 1.25rem",
              }}>
                Long-term strategic partners for the Parliament of India, National Security Council, and Fortune 500 leaders worldwide.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                {["Parliament of India", "National Security Council", "Fortune 500"].map((org) => (
                  <div key={org} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: "var(--accent)", flexShrink: 0,
                    }} />
                    <span className="font-sans" style={{
                      fontSize: "0.8rem", color: "var(--text-secondary)",
                    }}>{org}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 5 — Sports & Entertainment, spans 3 cols */}
            <div ref={trackCard5Ref} className="glass-card" style={{
              gridColumn: "span 3",
              padding: "2.25rem",
              borderRadius: "1.75rem",
              opacity: 0,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "16px",
                background: "var(--glass-light)",
                border: "1px solid var(--border-subtle)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-primary)", marginBottom: "1.5rem",
              }}>
                <IconSports />
              </div>
              <h3 className="font-sans" style={{
                fontSize: "1.15rem", fontWeight: 700,
                color: "var(--text-primary)", margin: "0 0 0.6rem",
              }}>Sports &amp; Entertainment</h3>
              <p className="font-sans" style={{
                fontSize: "0.875rem", lineHeight: 1.7,
                color: "var(--text-secondary)", margin: 0,
              }}>
                High-performance partner for India&apos;s premier T20 league franchises and major international sports federations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. STATS BAR
      ══════════════════════════════════════════════ */}
      <section ref={statsBarRef} style={{
        background: "var(--bg-surface)",
        padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 6vw, 6rem)",
        opacity: 0,
      }}>
        <div style={{
          maxWidth: 1240,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "0",
        }}>
          {[
            {
              numRef: statsNum1Ref,
              initVal: "0+",
              suffix: "+ Years",
              label: "Industry Leadership",
              sub: "Since 1986",
            },
            {
              numRef: null,
              initVal: "3×",
              suffix: null,
              label: "National Award Winner",
              sub: "Highest industry recognition",
            },
            {
              numRef: statsNum3Ref,
              initVal: "0",
              suffix: " Presidential Visits",
              label: "US Diplomatic Trust",
              sub: "2011 · 2014 · 2020 · 2023",
            },
            {
              numRef: statsNum4Ref,
              initVal: "0+",
              suffix: "+ VVIPs",
              label: "Served at Landmark Events",
              sub: "Heads of state & celebrities",
            },
          ].map(({ numRef, initVal, suffix, label, sub }, i) => (
            <div key={label} style={{
              padding: "2rem 2.5rem",
              borderLeft: i > 0 ? "1px solid var(--border-subtle)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}>
              <div className="font-serif" style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1,
              }}>
                {numRef
                  ? <span ref={numRef}>{initVal}</span>
                  : <span>{initVal}</span>
                }
              </div>
              <div className="font-sans" style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: "0.02em",
              }}>{label}</div>
              <div className="font-sans" style={{
                fontSize: "0.72rem",
                color: "var(--text-muted)",
              }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. GLOBAL PRESENCE
      ══════════════════════════════════════════════ */}
      <section ref={globalSectionRef} style={{
        background: "var(--bg-base)",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>
            Global Presence
          </span>
          <h2 ref={globalHeadRef} className="font-serif" style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            margin: "0 0 1rem",
            lineHeight: 1.1,
            opacity: 0,
          }}>
            Serving Across<br />
            <span className="italic" style={{ color: "var(--text-secondary)" }}>Borders</span>
          </h2>
          <p className="font-sans" style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
            maxWidth: 520,
            margin: "0 auto 3.5rem",
          }}>
            From the heart of India to key international hubs, Mann Fleet Partners delivers world-class transport wherever you are.
          </p>

          <div ref={globalBadgesRef} style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}>
            {[
              { region: "India", sub: "85+ cities · Pan-India Operations", primary: true },
              { region: "UAE", sub: "Dubai & Abu Dhabi", primary: false },
              { region: "Saudi Arabia", sub: "Riyadh & Jeddah", primary: false },
              { region: "England", sub: "London & surrounds", primary: false },
            ].map(({ region, sub, primary }) => (
              <div key={region} className="glass-panel" style={{
                padding: "1.1rem 1.75rem",
                borderRadius: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                scale: 0,
                opacity: 0,
                minWidth: 200,
              }}>
                <div style={{
                  width: 10, height: 10,
                  borderRadius: "50%",
                  background: primary ? "var(--accent)" : "var(--text-muted)",
                  boxShadow: primary ? "0 0 0 4px rgba(200,40,40,0.14)" : "none",
                  flexShrink: 0,
                }} />
                <div style={{ textAlign: "left" }}>
                  <div className="font-sans" style={{
                    fontSize: "0.9rem", fontWeight: 700,
                    color: "var(--text-primary)", lineHeight: 1.3,
                  }}>{region}</div>
                  <div className="font-sans" style={{
                    fontSize: "0.72rem", color: "var(--text-muted)",
                  }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. AWARDS & APPRECIATIONS
      ══════════════════════════════════════════════ */}
      <section ref={awardsSectionRef} style={{
        background: "var(--bg-surface)",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>

          {/* Section heading */}
          <div ref={awardsHeadRef} style={{ textAlign: "center", marginBottom: "4.5rem", opacity: 0 }}>
            <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>
              Recognition
            </span>
            <h2 className="font-serif" style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              margin: "0 0 0.75rem",
              lineHeight: 1.1,
            }}>
              Awards &amp; <span className="italic" style={{ color: "var(--text-secondary)" }}>Appreciations</span>
            </h2>
            <p className="font-sans" style={{
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
            }}>
              Recognised by governments, global institutions, and industry leaders across four decades of excellence.
            </p>
          </div>

          {/* ── AWARD CEREMONY PHOTOS ── */}
          <div ref={awardsPhotoRef} style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
            marginBottom: "3rem",
          }}>
            {[
              { src: "/Appreciation/PHOTO-2026-04-18-17-36-06.jpg", caption: "National Tourism Award Ceremony" },
              { src: "/Appreciation/PHOTO-2026-04-18-17-36-06 2.jpg", caption: "Recognition at Govt. of India" },
            ].map(({ src, caption }) => (
              <div key={caption} style={{
                position: "relative",
                borderRadius: "1.5rem",
                overflow: "hidden",
                border: "1px solid var(--border-mid)",
                height: 260,
                opacity: 0,
                boxShadow: "0 12px 40px rgba(0,0,0,0.30)",
              }}>
                <Image src={src} alt={caption} fill unoptimized style={{ objectFit: "cover" }} />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "1.75rem 1.25rem 1rem",
                  background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
                }}>
                  <span className="font-sans" style={{
                    fontSize: "0.75rem", fontWeight: 600,
                    color: "rgba(255,255,255,0.88)",
                  }}>{caption}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── AWARDS RECEIVED ── */}
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
              <span className="font-sans" style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}>Awards Received</span>
            </div>

            <div ref={awardsGridRef} style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "1.25rem",
            }}>
              {([
                { title: "National Tourism Award", year: "2016–2017", issuer: "Ministry of Tourism, Govt. of India", pdf: "/awards/National Tourism Award_2016-17.pdf" },
                { title: "National Tourism Award", year: "2017–2018", issuer: "Ministry of Tourism, Govt. of India", pdf: "/awards/National Tourism Award_2017-18.pdf" },
                { title: "National Tourism Award", year: "2018–2019", issuer: "Ministry of Tourism, Govt. of India", pdf: "/awards/National Tourism Award_2018-19.pdf" },
                { title: "Zee Business Award – Best Private Transport Service Provider", year: "2019", issuer: "Zee TV", pdf: "/awards/Award_Maruti Suzuki.pdf" },
                { title: "TV Leaders of Road Transport", year: "2022", issuer: "TV 9 Network", pdf: "/awards/Award_TV 9 Network.pdf" },
                { title: "Travel Enablers – Luxury Car Rentals", year: "—", issuer: "VFS Global Times Travel Awards", pdf: "/awards/Award_Times Travel.pdf" },
                { title: "Global Tourism Awards", year: "—", issuer: "—", pdf: "/awards/Global Tourism Awards.pdf" },
              ] as (CertEntry & { year: string })[]).map(({ title, year, issuer, pdf }) => (
                <div
                  key={title + year}
                  className="glass-card"
                  onClick={() => setOpenCert({ title, issuer, year: year !== "—" ? year : undefined, pdf })}
                  style={{
                    padding: "1.75rem",
                    borderRadius: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    opacity: 0,
                    cursor: "pointer",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,40,40,0.35)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 1px rgba(200,40,40,0.20), 0 8px 24px rgba(0,0,0,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  }}
                >
                  {/* Icon + "View" pill row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{
                      width: 48, height: 48,
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(200,40,40,0.16) 0%, rgba(200,40,40,0.05) 100%)",
                      border: "1px solid rgba(200,40,40,0.24)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent)",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(200,40,40,0.10)",
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 21h8M12 17v4"/>
                        <path d="M7 4H4a2 2 0 0 0-2 2v1c0 3.31 2.69 6 6 6"/>
                        <path d="M17 4h3a2 2 0 0 1 2 2v1c0 3.31-2.69 6-6 6"/>
                        <path d="M12 17c-3.87 0-7-3.13-7-7V4h14v6c0 3.87-3.13 7-7 7z"/>
                      </svg>
                    </div>
                    <span className="font-sans" style={{
                      fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "var(--accent)",
                      padding: "0.22rem 0.7rem", borderRadius: 9999,
                      background: "rgba(200,40,40,0.10)", border: "1px solid rgba(200,40,40,0.22)",
                    }}>
                      View Certificate
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans" style={{
                      fontSize: "0.925rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      margin: "0 0 0.5rem",
                      lineHeight: 1.4,
                    }}>{title}</h3>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                      {year !== "—" && (
                        <span className="glass-badge" style={{ fontSize: "0.6rem" }}>{year}</span>
                      )}
                      {issuer !== "—" && (
                        <span className="font-sans" style={{
                          fontSize: "0.72rem",
                          color: "var(--text-muted)",
                          lineHeight: 1.4,
                        }}>{issuer}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── APPRECIATIONS RECEIVED ── */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: 28, height: 2, background: "var(--text-muted)", borderRadius: 2 }} />
              <span className="font-sans" style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}>Appreciations Received</span>
            </div>

            <div ref={apprecListRef} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {([
                { num: "01", title: "Appreciation for handling Young President Organization (YPO) Meet at Jamnagar, Gujarat", date: "19 Mar 2008", issuer: "Reliance Industries Limited", pdf: "/Appreciation/Appreciation_Reliance.pdf" },
                { num: "02", title: "Appreciation for providing services to Hon'ble Barack Obama, President, USA", date: "21 Apr 2011", issuer: "American Embassy, USA", pdf: "/awards/Appreciation_Embassy_USA.pdf" },
                { num: "03", title: "Appreciation for providing services to Hon'ble Joseph R. Biden, Vice President, USA", date: "14 Nov 2013", issuer: "Vice President, USA", pdf: "/awards/Appreciation_Joe Biden_Vice President_USA.pdf" },
                { num: "04", title: "Certificate of Appreciation", date: "—", issuer: "Tamarind Global", pdf: "/awards/Appreciation_Tamarind Global.pdf" },
                { num: "05", title: "Token of Appreciation", date: "—", issuer: "United States Mission", pdf: "/awards/Token_Appreciation_US Mission.pdf" },
                { num: "06", title: "Token of Appreciation", date: "—", issuer: "White House, USA", pdf: "/Appreciation/Token_Appreciation_White House_USA.pdf" },
                { num: "07", title: "AFC Women's Asian Cup", date: "28 Feb 2022", issuer: "Asian Football Confederation (AFC)", pdf: "/Appreciation/Appreciation_AFC_Women Cup.pdf" },
                { num: "08", title: "Letter of Appreciation", date: "25 Jul 2022", issuer: "Kolkata Knight Riders – IPL Team", pdf: null },
                { num: "09", title: "Letter of Appreciation", date: "28 Jul 2022", issuer: "Chennai Super Kings – IPL Team", pdf: null },
                { num: "10", title: "Appreciation for handling G20 Event", date: "29 May 2023", issuer: "G20 Secretariat, Ministry of External Affairs, Govt. of India", pdf: "/Appreciation/Appreciation_G20 Event.pdf" },
                { num: "11", title: "Appreciation for handling National Conference of 1350 Employees", date: "27 Sep 2023", issuer: "Pernod Ricard", pdf: "/Appreciation/Appreciation_Pernord Ricard.pdf" },
                { num: "12", title: "Appreciation for Handling Town Hall Meet", date: "18 Oct 2023", issuer: "Indigo Airlines", pdf: "/Appreciation/Appreciation_Indigo Airlines.pdf" },
                { num: "13", title: "Appreciation for handling VIP Guests", date: "11 Jan 2024", issuer: "Indigo Paints", pdf: "/Appreciation/Appreciation_Indigo Paints.pdf" },
                { num: "14", title: "Certificate of Appreciation (GST)", date: "2023–24", issuer: "Ministry of Finance, Govt. of India", pdf: "/Appreciation/Appreciation_GST Department.pdf" },
                { num: "15", title: "Appreciation for Handling IBM Board", date: "07 Nov 2024", issuer: "Abercrombie & Kent India", pdf: "/Appreciation/Appreciation_IBM_BOD.pdf" },
                { num: "16", title: "Appreciation for handling Jet on Wheels Event", date: "22 Nov 2024", issuer: "Urban Provider", pdf: "/Appreciation/Appreciation_Jet on Wheels_Urban Provider.pdf" },
              ] as { num: string; title: string; date: string; issuer: string; pdf: string | null }[]).map(({ num, title, date, issuer, pdf }) => (
                <div
                  key={num}
                  className="glass-panel"
                  onClick={() => pdf && setOpenCert({ title, issuer, year: date !== "—" ? date : undefined, pdf })}
                  style={{
                    padding: "1rem 1.5rem",
                    borderRadius: "0.875rem",
                    display: "grid",
                    gridTemplateColumns: "2.5rem 1fr auto",
                    gap: "1rem",
                    alignItems: "center",
                    opacity: 0,
                    cursor: pdf ? "pointer" : "default",
                    transition: "border-color 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!pdf) return;
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "";
                  }}
                >
                  <span className="font-serif" style={{
                    fontSize: "0.95rem",
                    fontWeight: 400,
                    color: "var(--text-muted)",
                    lineHeight: 1,
                  }}>{num}</span>
                  <div>
                    <p className="font-sans" style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      margin: 0,
                      lineHeight: 1.4,
                    }}>{title}</p>
                    <p className="font-sans" style={{
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                      margin: "0.2rem 0 0",
                      lineHeight: 1.3,
                    }}>{issuer}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem", flexShrink: 0 }}>
                    {date !== "—" && (
                      <span className="glass-badge" style={{ fontSize: "0.58rem", whiteSpace: "nowrap" }}>
                        {date}
                      </span>
                    )}
                    {pdf && (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "0.28rem",
                        fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: "var(--accent)",
                        padding: "0.18rem 0.6rem", borderRadius: 9999,
                        background: "rgba(200,40,40,0.08)", border: "1px solid rgba(200,40,40,0.18)",
                        whiteSpace: "nowrap",
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        View
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          9. CLOSING CTA
      ══════════════════════════════════════════════ */}
      <section ref={ctaSectionRef} style={{
        background: "#100E0B",
        padding: "clamp(6rem, 12vw, 11rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Decorative radial */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw", height: "70vw",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(160,30,30,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div ref={ctaWrapRef} style={{
          maxWidth: 860,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          opacity: 0,
        }}>
          {/* Decorative lines */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}>
            <div ref={ctaLineLeftRef} style={{
              flex: 1, height: 1,
              background: "rgba(255,255,255,0.08)",
              transform: "scaleX(0)", transformOrigin: "left center",
            }} />
            <span className="glass-badge" style={{
              background: "rgba(255,255,255,0.05)",
              borderColor: "rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.35)",
              whiteSpace: "nowrap",
            }}>
              Our Promise
            </span>
            <div ref={ctaLineRightRef} style={{
              flex: 1, height: 1,
              background: "rgba(255,255,255,0.08)",
              transform: "scaleX(0)", transformOrigin: "right center",
            }} />
          </div>

          <p ref={ctaLine1Ref} className="font-serif" style={{
            fontSize: "clamp(2.4rem, 6vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1.08,
            color: "#ffffff",
            margin: "0 0 1.5rem",
            letterSpacing: "0.01em",
            opacity: 0,
          }}>
            Choose Mann Fleet Partners.
          </p>

          <p ref={ctaLine2Ref} className="font-serif italic" style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.42)",
            margin: "0 0 3rem",
            maxWidth: 640,
            marginLeft: "auto",
            marginRight: "auto",
            opacity: 0,
          }}>
            &ldquo;Because when perfection is the only option, we are the only choice.&rdquo;
          </p>

          <button ref={ctaBtnRef} className="btn-primary" style={{
            fontSize: "0.8rem",
            padding: "0.9rem 2.25rem",
            opacity: 0,
          }}>
            Get in Touch
            <ArrowUpRight size={14} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
