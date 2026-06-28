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
  const panelRef = useRef<HTMLDivElement>(null);
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
    gsap.to(panelRef.current, { opacity: 0, scale: 0.94, y: 16, duration: 0.2, ease: "power2.in" });
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
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
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <div style={{ flex: 1, minHeight: 0, position: "relative", background: "#1a1714" }}>
          {/* Decorative corner marks */}
          {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((pos) => (
            <div key={pos} style={{
              position: "absolute", zIndex: 2,
              width: 20, height: 20,
              ...(pos.includes("top") ? { top: 10 } : { bottom: 10 }),
              ...(pos.includes("Left") ? { left: 10 } : { right: 10 }),
              borderTop: pos.includes("top") ? "2px solid rgba(200,40,40,0.35)" : "none",
              borderBottom: pos.includes("bottom") ? "2px solid rgba(200,40,40,0.35)" : "none",
              borderLeft: pos.includes("Left") ? "2px solid rgba(200,40,40,0.35)" : "none",
              borderRight: pos.includes("Right") ? "2px solid rgba(200,40,40,0.35)" : "none",
              pointerEvents: "none",
            }} />
          ))}
          <iframe
            src={`${entry.pdf}#toolbar=0&view=FitH`}
            title={entry.title}
            style={{ width: "100%", height: "100%", minHeight: "min(480px, 60vh)", border: "none", display: "block" }}
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
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroLine1Ref = useRef<HTMLSpanElement>(null);
  const heroLine2Ref = useRef<HTMLSpanElement>(null);
  const heroLine3Ref = useRef<HTMLSpanElement>(null);
  const heroYearRef = useRef<HTMLDivElement>(null);
  const heroSublineRef = useRef<HTMLParagraphElement>(null);

  /* ── What We Are refs ── */
  const wareSectionRef = useRef<HTMLElement>(null);
  const wareLabelRef = useRef<HTMLDivElement>(null);
  const wareLeftRef = useRef<HTMLDivElement>(null);
  const wareRightRef = useRef<HTMLDivElement>(null);
  const warePillsRef = useRef<HTMLDivElement>(null);
  const wareRingRef = useRef<HTMLDivElement>(null);

  /* ── Timeline refs ── */
  const timelineSectionRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const timelineCarRef = useRef<HTMLDivElement>(null);
  const timelineInnerRef = useRef<HTMLDivElement>(null);
  const timelineCard1Ref = useRef<HTMLDivElement>(null);
  const timelineCard2Ref = useRef<HTMLDivElement>(null);
  const timelineCard3Ref = useRef<HTMLDivElement>(null);
  const timelineCard4Ref = useRef<HTMLDivElement>(null);
  const timelineCard5Ref = useRef<HTMLDivElement>(null);
  const timelineCard6Ref = useRef<HTMLDivElement>(null);
  const timelineCard7Ref = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);
  const dot4Ref = useRef<HTMLDivElement>(null);
  const dot5Ref = useRef<HTMLDivElement>(null);
  const dot6Ref = useRef<HTMLDivElement>(null);
  const dot7Ref = useRef<HTMLDivElement>(null);

  /* ── What We Do refs ── */
  const wdoSectionRef = useRef<HTMLElement>(null);
  const wdoHeadRef = useRef<HTMLHeadingElement>(null);
  const wdoParaRef = useRef<HTMLParagraphElement>(null);
  const wdoCardsRef = useRef<HTMLDivElement>(null);

  /* ── Track Record refs ── */
  const trackSectionRef = useRef<HTMLElement>(null);
  const trackWatermarkRef = useRef<HTMLDivElement>(null);
  const trackLabelRef = useRef<HTMLDivElement>(null);
  const trackCard1Ref = useRef<HTMLDivElement>(null);
  const trackCard2Ref = useRef<HTMLDivElement>(null);
  const trackCard3Ref = useRef<HTMLDivElement>(null);
  const trackCard4Ref = useRef<HTMLDivElement>(null);
  const trackCard5Ref = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  /* ── Stats bar refs ── */
  const statsBarRef = useRef<HTMLElement>(null);
  const statsNum1Ref = useRef<HTMLSpanElement>(null);
  const statsNum3Ref = useRef<HTMLSpanElement>(null);
  const statsNum4Ref = useRef<HTMLSpanElement>(null);

  /* ── Global presence refs ── */
  const globalSectionRef = useRef<HTMLElement>(null);
  const globalHeadRef = useRef<HTMLHeadingElement>(null);
  const globalBadgesRef = useRef<HTMLDivElement>(null);

  /* ── CTA refs ── */
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const ctaLine1Ref = useRef<HTMLParagraphElement>(null);
  const ctaLine2Ref = useRef<HTMLParagraphElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const ctaLineLeftRef = useRef<HTMLDivElement>(null);
  const ctaLineRightRef = useRef<HTMLDivElement>(null);

  /* ── USP section refs ── */
  const uspSectionRef = useRef<HTMLElement>(null);
  const uspLabelRef = useRef<HTMLDivElement>(null);
  const uspHeadRef = useRef<HTMLHeadingElement>(null);
  const uspCard1Ref = useRef<HTMLDivElement>(null);
  const uspCard2Ref = useRef<HTMLDivElement>(null);
  const uspCard3Ref = useRef<HTMLDivElement>(null);
  const uspCard4Ref = useRef<HTMLDivElement>(null);
  const uspCard5Ref = useRef<HTMLDivElement>(null);

  /* ── Cinematic reel refs ── */
  const reelSectionRef = useRef<HTMLElement>(null);
  const reelOverlayRef = useRef<HTMLDivElement>(null);
  const reelQuoteRef = useRef<HTMLDivElement>(null);
  const partnershipRef = useRef<HTMLDivElement>(null);



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

      gsap.to(timelineCarRef.current, {
        y: () => (timelineInnerRef.current?.offsetHeight ?? 700) - 52,
        ease: "none",
        scrollTrigger: {
          trigger: timelineSectionRef.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      const isMobile = window.innerWidth <= 768;
      const timelineItems = [
        { card: timelineCard1Ref.current, dot: dot1Ref.current, x: isMobile ? -24 : -90 },
        { card: timelineCard2Ref.current, dot: dot2Ref.current, x: isMobile ? -24 : 90 },
        { card: timelineCard3Ref.current, dot: dot3Ref.current, x: isMobile ? -24 : -90 },
        { card: timelineCard4Ref.current, dot: dot4Ref.current, x: isMobile ? -24 : 90 },
        { card: timelineCard5Ref.current, dot: dot5Ref.current, x: isMobile ? -24 : -90 },
        { card: timelineCard6Ref.current, dot: dot6Ref.current, x: isMobile ? -24 : 90 },
        { card: timelineCard7Ref.current, dot: dot7Ref.current, x: isMobile ? -24 : -90 },
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
        { el: trackCard2Ref.current, x: 100, rotate: 2 },
        { el: trackCard3Ref.current, x: 0, y: 80, rotate: 0 },
        { el: trackCard4Ref.current, x: -100, rotate: -1 },
        { el: trackCard5Ref.current, x: 100, rotate: 1 },
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
         USP STICKY CARDS
      ──────────────────────────────────────────────── */
      gsap.fromTo(uspLabelRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: uspSectionRef.current, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(uspHeadRef.current,
        { y: 50, opacity: 0, filter: "blur(8px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: uspSectionRef.current, start: "top 76%", once: true },
        }
      );

      const uspCards = [
        uspCard1Ref.current,
        uspCard2Ref.current,
        uspCard3Ref.current,
        uspCard4Ref.current,
        uspCard5Ref.current,
      ];

      uspCards.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 95%", once: true },
          }
        );


      });

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

      gsap.fromTo(partnershipRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: partnershipRef.current, start: "top 85%" },
        }
      );

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
            Mann Fleet Partners
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

      </section>

      {/* ══════════════════════════════════════════════
          3. WHAT WE DO (moved here from section 4)
      ══════════════════════════════════════════════ */}
      <section ref={wdoSectionRef} style={{
        background: "var(--bg-base)",
        padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 6vw, 6rem)",
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
                video: "/0_Car_Expensive_1280x720.mp4",
              },
              {
                icon: <IconEvent />,
                title: "Event Transportation",
                badge: "Bespoke",
                desc: "End-to-end mobility for world-class events — from G20 summits to landmark VVIP weddings. We flawlessly execute the most complex logistical requirements.",
                video: "/6886022_Famous_Place_Tourism_1280x720.mp4",
              },
              {
                icon: <IconBespoke />,
                title: "Retail Solutions",
                badge: "Premium",
                desc: "Bespoke retail transport solutions for high-net-worth individuals and discerning travellers. Ultra-luxury vehicles, curated for perfection.",
                video: "/0_Car_Night_1280x720.mp4",
              },
            ].map(({ icon, title, badge, desc, video }) => (
              <div key={title} style={{
                position: "relative",
                borderRadius: "1.5rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                opacity: 0,
                minHeight: 320,
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.30)",
              }}>
                {/* Background video */}
                <video
                  src={video}
                  autoPlay muted loop playsInline
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", zIndex: 0, pointerEvents: "none",
                  }}
                />
                {/* Dark overlay */}
                <div style={{
                  position: "absolute", inset: 0, zIndex: 1,
                  background: "linear-gradient(to top, rgba(10,6,2,0.90) 0%, rgba(10,6,2,0.55) 55%, rgba(10,6,2,0.30) 100%)",
                  pointerEvents: "none",
                }} />
                {/* Content */}
                <div style={{ position: "relative", zIndex: 2, padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem", height: "100%" }}>
                  <div style={{
                    width: 52, height: 52,
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20)",
                  }}>
                    {icon}
                  </div>
                  <div style={{ marginTop: "auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                      <h3 className="font-sans" style={{
                        fontSize: "1rem", fontWeight: 600,
                        color: "#ffffff", margin: 0,
                      }}>{title}</h3>
                      <span style={{
                        fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "0.18rem 0.6rem", borderRadius: 9999,
                        background: "rgba(255,255,255,0.14)",
                        border: "1px solid rgba(255,255,255,0.22)",
                        color: "rgba(255,255,255,0.80)",
                        backdropFilter: "blur(8px)",
                      }}>{badge}</span>
                    </div>
                    <p className="font-sans" style={{
                      fontSize: "0.875rem", lineHeight: 1.7,
                      color: "rgba(255,255,255,0.68)", margin: 0,
                    }}>{desc}</p>
                  </div>
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
                <span style={{ color: "var(--text-secondary)" }}>1986</span>
                <br />
                <span className="italic" style={{
                  fontSize: "0.55em",
                  color: "var(--text-muted)",
                  letterSpacing: "0.02em",
                }}>Incorporated 1992</span>
              </h2>

              {/* Stat pills */}
              <div ref={warePillsRef} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { val: "40+", label: "Years of industry leadership" },
                  { val: "F500", label: "Fortune 500 clientele" },
                  { val: "80+", label: "Cities across India & 4 global hubs — UAE, USA, Saudi Arabia, England" },
                  { val: "3×", label: "National Tourism Award winners (2016–2019). Official transport for G20 & last 4 US Presidential Visits." },
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
                Mann Fleet Partners Limited is <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>more than just a transport management company</strong> — we are the <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>dominant force in the luxury rental market</strong>, trusted to handle the world&apos;s most high-profile clients, celebrities, world leaders, and large-scale events with flawless precision.
              </p>
              <p className="font-sans" style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
              }}>
                We serve an elite, sophisticated clientele — including Fortune 500 giants, diplomatic embassies, world leaders, celebrities, and high-net-worth individuals — across India and key international hubs such as the <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>UAE, USA, Saudi Arabia, and England</strong>.
              </p>
              <p className="font-sans" style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
              }}>
                As one of the world&apos;s most admired luxury car, van, and coach rental companies, we have set the gold standard for excellence in the global transport industry.
              </p>

              {/* Strategic Partnership Callout */}
              <div ref={partnershipRef} style={{
                marginTop: "2.5rem",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 14,
                padding: "1.25rem 2rem",
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                opacity: 0,
              }}>
                <div style={{ width: 3, height: 36, background: "var(--accent)", borderRadius: 999, flexShrink: 0 }} />
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ color: "var(--text-primary)" }}>Developed by Yamuna International Airport Private Limited (YIAPL)</strong>,
                  a subsidiary of Zurich Airport International AG — one of the world&apos;s most respected airport operators.
                  Our mobility systems are engineered to scale in parallel with this landmark growth trajectory.
                </p>
              </div>

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
        padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Section label */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="glass-badge">Company History</span>
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
          <div ref={timelineInnerRef} className="about-timeline-inner" style={{ position: "relative" }}>
            {/* Vertical line */}
            <div ref={timelineLineRef} className="timeline-line" style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: "var(--border-mid)",
              transform: "translateX(-50%) scaleY(0)",
              transformOrigin: "top center",
            }} />

            {/* Scrolling car */}
            <div ref={timelineCarRef} className="timeline-car" style={{
              position: "absolute",
              left: "50%",
              top: 0,
              transform: "translateX(-50%)",
              zIndex: 2,
              pointerEvents: "none",
            }}>
              <svg width="28" height="52" viewBox="0 0 28 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="8" width="22" height="36" rx="5" fill="var(--accent)" opacity="0.95" />
                <rect x="7" y="14" width="14" height="18" rx="3" fill="rgba(255,255,255,0.15)" />
                <rect x="8" y="10" width="12" height="6" rx="2" fill="rgba(255,255,255,0.25)" />
                <rect x="8" y="36" width="12" height="5" rx="2" fill="rgba(255,255,255,0.18)" />
                <rect x="0" y="10" width="5" height="9" rx="2.5" fill="#1a1a1a" />
                <rect x="23" y="10" width="5" height="9" rx="2.5" fill="#1a1a1a" />
                <rect x="0" y="33" width="5" height="9" rx="2.5" fill="#1a1a1a" />
                <rect x="23" y="33" width="5" height="9" rx="2.5" fill="#1a1a1a" />
                <rect x="8" y="7" width="5" height="3" rx="1" fill="rgba(255,240,180,0.9)" />
                <rect x="15" y="7" width="5" height="3" rx="1" fill="rgba(255,240,180,0.9)" />
                <rect x="8" y="42" width="5" height="3" rx="1" fill="rgba(255,60,60,0.8)" />
                <rect x="15" y="42" width="5" height="3" rx="1" fill="rgba(255,60,60,0.8)" />
              </svg>
            </div>

            {/* Milestone 1 — LEFT */}
            <div className="timeline-card-left" style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "calc(50% + 2.5rem)",
              marginBottom: "3.5rem",
              position: "relative",
            }}>
              <div ref={dot1Ref} className="timeline-dot" style={{
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
                  Established in 1986, laying the foundation for India&apos;s premier ground transportation service.
                </p>
              </div>
            </div>

            {/* Milestone 2 — RIGHT */}
            <div className="timeline-card-right" style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "calc(50% + 2.5rem)",
              marginBottom: "3.5rem",
              position: "relative",
            }}>
              <div ref={dot2Ref} className="timeline-dot" style={{
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
                  Mann Tourist Transport Service Private Limited incorporated on August 7, 1992 — a pivotal moment that scaled our operations nationally. Formerly known as Mann Tourist Transport, today operating as Mann Fleet Partners Limited.
                </p>
              </div>
            </div>

            {/* Milestone 3 — LEFT */}
            <div className="timeline-card-left" style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "calc(50% + 2.5rem)",
              marginBottom: "3.5rem",
              position: "relative",
            }}>
              <div ref={dot3Ref} className="timeline-dot" style={{
                position: "absolute",
                right: "calc(50% - 7px)",
                top: "1.2rem",
                width: 14, height: 14,
                borderRadius: "50%",
                background: "var(--text-primary)",
                border: "2px solid var(--bg-surface)",
                scale: 0,
              }} />
              <div ref={timelineCard3Ref} className="glass-panel" style={{
                padding: "1.5rem 1.75rem",
                borderRadius: "1.25rem",
                maxWidth: 380,
                opacity: 0,
              }}>
                <span className="glass-badge" style={{ marginBottom: "0.8rem", display: "inline-block" }}>2005 onwards</span>
                <h3 className="font-serif" style={{
                  fontSize: "1.4rem", fontWeight: 400,
                  color: "var(--text-primary)", margin: "0 0 0.6rem",
                }}>National Footprint</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem", lineHeight: 1.7,
                  color: "var(--text-secondary)", margin: 0,
                }}>
                  Expanded operations across 80 cities in India, establishing a full-service network for corporate and diplomatic clients. Became the trusted transport partner for Fortune 500 companies and government institutions.
                </p>
              </div>
            </div>

            {/* Milestone 4 — RIGHT */}
            <div className="timeline-card-right" style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "calc(50% + 2.5rem)",
              marginBottom: "3.5rem",
              position: "relative",
            }}>
              <div ref={dot4Ref} className="timeline-dot" style={{
                position: "absolute",
                left: "calc(50% - 7px)",
                top: "1.2rem",
                width: 14, height: 14,
                borderRadius: "50%",
                background: "var(--accent)",
                border: "2px solid var(--bg-surface)",
                boxShadow: "0 0 0 3px rgba(200,40,40,0.18)",
                scale: 0,
              }} />
              <div ref={timelineCard4Ref} className="glass-panel" style={{
                padding: "1.5rem 1.75rem",
                borderRadius: "1.25rem",
                maxWidth: 380,
                opacity: 0,
              }}>
                <span className="glass-badge" style={{ marginBottom: "0.8rem", display: "inline-block" }}>2008 onwards</span>
                <h3 className="font-serif" style={{
                  fontSize: "1.4rem", fontWeight: 400,
                  color: "var(--text-primary)", margin: "0 0 0.6rem",
                }}>Diplomatic and Government Mandates</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem", lineHeight: 1.7,
                  color: "var(--text-secondary)", margin: 0,
                }}>
                  Appointed as the preferred ground transport provider for foreign embassies including the United States Mission in India. Served sports leagues, cricket tournaments, the Kabaddi World Cup, AFC Women&apos;s Cup, and major national sporting events.
                </p>
              </div>
            </div>

            {/* Milestone 5 — LEFT */}
            <div className="timeline-card-left" style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "calc(50% + 2.5rem)",
              marginBottom: "3.5rem",
              position: "relative",
            }}>
              <div ref={dot5Ref} className="timeline-dot" style={{
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
              <div ref={timelineCard5Ref} className="glass-panel" style={{
                padding: "1.5rem 1.75rem",
                borderRadius: "1.25rem",
                maxWidth: 380,
                opacity: 0,
              }}>
                <span className="glass-badge" style={{ marginBottom: "0.8rem", display: "inline-block" }}>2016 onwards</span>
                <h3 className="font-serif" style={{
                  fontSize: "1.4rem", fontWeight: 400,
                  color: "var(--text-primary)", margin: "0 0 0.6rem",
                }}>Triple National Tourism Award</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem", lineHeight: 1.7,
                  color: "var(--text-secondary)", margin: 0,
                }}>
                  Awarded the National Tourism Award by the Ministry of Tourism, Government of India, for three consecutive years (2016–17, 2017–18, 2018–19) — the highest recognition in India&apos;s tourism industry.
                </p>
              </div>
            </div>

            {/* Milestone 6 — RIGHT */}
            <div className="timeline-card-right" style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "calc(50% + 2.5rem)",
              marginBottom: "3.5rem",
              position: "relative",
            }}>
              <div ref={dot6Ref} className="timeline-dot" style={{
                position: "absolute",
                left: "calc(50% - 7px)",
                top: "1.2rem",
                width: 14, height: 14,
                borderRadius: "50%",
                background: "var(--text-primary)",
                border: "2px solid var(--bg-surface)",
                scale: 0,
              }} />
              <div ref={timelineCard6Ref} className="glass-panel" style={{
                padding: "1.5rem 1.75rem",
                borderRadius: "1.25rem",
                maxWidth: 380,
                opacity: 0,
              }}>
                <span className="glass-badge" style={{ marginBottom: "0.8rem", display: "inline-block" }}>2019 onwards</span>
                <h3 className="font-serif" style={{
                  fontSize: "1.4rem", fontWeight: 400,
                  color: "var(--text-primary)", margin: "0 0 0.6rem",
                }}>Industry and Media Recognition</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem", lineHeight: 1.7,
                  color: "var(--text-secondary)", margin: 0,
                }}>
                  Received the Zee Business Award for Best Private Transport Service Provider (2019) and was named &apos;Leaders of Road Transport&apos; by TV9 Network (2022). Expanded global footprint to the UAE, the USA, Saudi Arabia, and England.
                </p>
              </div>
            </div>

            {/* Milestone 7 — LEFT */}
            <div className="timeline-card-left" style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "calc(50% + 2.5rem)",
              position: "relative",
            }}>
              <div ref={dot7Ref} className="timeline-dot" style={{
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
              <div ref={timelineCard7Ref} className="glass-panel" style={{
                padding: "1.5rem 1.75rem",
                borderRadius: "1.25rem",
                maxWidth: 380,
                opacity: 0,
              }}>
                <span className="glass-badge" style={{ marginBottom: "0.8rem", display: "inline-block" }}>Today</span>
                <h3 className="font-serif" style={{
                  fontSize: "1.4rem", fontWeight: 400,
                  color: "var(--text-primary)", margin: "0 0 0.6rem",
                }}>Global Powerhouse</h3>
                <p className="font-sans" style={{
                  fontSize: "0.875rem", lineHeight: 1.7,
                  color: "var(--text-secondary)", margin: 0,
                }}>
                  Mann Fleet Partners Limited — an award-winning, globally recognised mobility powerhouse. It serves the G20 Presidency, VVIP events, and Fortune 500 clients across India, the UAE, the USA, Saudi Arabia, and England. Handled transportation for one of India’s biggest-ever events in Jamnagar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MOTTO BANNER
      ══════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        background: "var(--bg-surface)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw", height: "70vw",
          maxWidth: 800, maxHeight: 800,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(200,40,40,0.055) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 860, margin: "0 auto",
          textAlign: "center",
        }}>
          {/* Decorative top rule */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: "1.25rem",
            marginBottom: "2.5rem",
          }}>
            <div style={{ flex: 1, maxWidth: 80, height: 1, background: "var(--accent)", opacity: 0.7 }} />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="var(--accent)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <div style={{ flex: 1, maxWidth: 80, height: 1, background: "var(--accent)", opacity: 0.7 }} />
          </div>

          {/* Opening quotation mark */}
          <div style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(5rem, 14vw, 10rem)",
            lineHeight: 0.7,
            color: "var(--accent)",
            opacity: 0.18,
            marginBottom: "0.5rem",
            userSelect: "none",
          }}>
            &ldquo;
          </div>

          {/* Motto text */}
          <blockquote style={{ margin: 0 }}>
            <p className="font-serif" style={{
              fontSize: "clamp(1.35rem, 3.2vw, 2.15rem)",
              fontWeight: 400,
              lineHeight: 1.55,
              color: "var(--text-primary)",
              letterSpacing: "0.01em",
              margin: "0 0 2rem",
            }}>
              Quality is never an accident — it is always the result of{" "}
              <em style={{ color: "var(--text-secondary)" }}>high intention</em>,{" "}
              <em style={{ color: "var(--text-secondary)" }}>sincere effort</em>,{" "}
              <em style={{ color: "var(--text-secondary)" }}>intelligent direction</em>{" "}
              and{" "}
              <em style={{ color: "var(--text-secondary)" }}>skilful execution</em>.
            </p>

            {/* Attribution line */}
            <footer style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}>
              <div style={{ width: 32, height: 1, background: "var(--border-mid)" }} />
              <cite className="font-sans" style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontStyle: "normal",
              }}>
                Our Motto
              </cite>
              <div style={{ width: 32, height: 1, background: "var(--border-mid)" }} />
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4a. WHY MANN FLEET — USP STICKY CARDS + OUR VALUES
      ══════════════════════════════════════════════ */}
      <section ref={uspSectionRef} style={{
        background: "var(--bg-base)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem) clamp(6rem, 12vw, 10rem)",
        overflow: "visible",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          {/* Label */}
          <div ref={uspLabelRef} style={{ textAlign: "center", marginBottom: "1.5rem", opacity: 0 }}>
            <span className="glass-badge">Why Mann Fleet Partners</span>
          </div>
          {/* Heading */}
          <h2 ref={uspHeadRef} className="font-serif" style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            textAlign: "center",
            margin: "0 0 1rem",
            lineHeight: 1.1,
            opacity: 0,
          }}>
            What Sets Us<br />
            <span className="italic" style={{ color: "var(--text-secondary)" }}>Apart</span>
          </h2>
          <p className="font-sans" style={{
            fontSize: "0.95rem",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            textAlign: "center",
            maxWidth: 540,
            margin: "0 auto 3.5rem",
          }}>
            Five pillars that make Mann Fleet Partners the undisputed leader in India&apos;s premium ground transportation.
          </p>

          {/* Split-screen: USP cards + Our Values */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 4vw, 4rem)",
            alignItems: "start",
          }}>
            {/* LEFT: Sticky card stack */}
            <div>
              {/* Card 1 — Four Decades */}
              <div ref={uspCard1Ref} style={{
                position: "sticky",
                top: 80,
                zIndex: 1,
                padding: "2.25rem",
                borderRadius: "1.75rem",
                marginBottom: "2rem",
                opacity: 0,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-mid)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
              }}>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "16px",
                    background: "var(--bg-deep)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--accent)", flexShrink: 0,
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block", fontSize: "0.65rem" }}>
                      Est. 1986
                    </span>
                    <h3 className="font-sans" style={{
                      fontSize: "1.15rem", fontWeight: 700,
                      color: "var(--text-primary)", margin: "0 0 0.6rem",
                    }}>Four Decades of Mastery</h3>
                    <p className="font-sans" style={{
                      fontSize: "0.875rem", lineHeight: 1.7,
                      color: "var(--text-secondary)", margin: 0,
                    }}>
                      Over 40 years of uninterrupted service in luxury ground transportation. No other Indian operator matches this depth of institutional knowledge, operational maturity, and client trust built across generations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 — Government-Grade Trust */}
              <div ref={uspCard2Ref} style={{
                position: "sticky",
                top: 105,
                zIndex: 2,
                padding: "2.25rem",
                borderRadius: "1.75rem",
                marginBottom: "2rem",
                opacity: 0,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-mid)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
              }}>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "16px",
                    background: "var(--bg-deep)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--accent)", flexShrink: 0,
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block", fontSize: "0.65rem" }}>
                      Cleared and Certified
                    </span>
                    <h3 className="font-sans" style={{
                      fontSize: "1.15rem", fontWeight: 700,
                      color: "var(--text-primary)", margin: "0 0 0.6rem",
                    }}>Government-Grade Trust</h3>
                    <p className="font-sans" style={{
                      fontSize: "0.875rem", lineHeight: 1.7,
                      color: "var(--text-secondary)", margin: 0,
                    }}>
                      Security-vetted and trusted by the Ministry of External Affairs, G20 Presidency, and multiple foreign embassies. Background-checked chauffeurs operating under SPG-level protocols for every engagement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 — Pan-India & Global Reach */}
              <div ref={uspCard3Ref} style={{
                position: "sticky",
                top: 130,
                zIndex: 3,
                padding: "2.25rem",
                borderRadius: "1.75rem",
                marginBottom: "2rem",
                opacity: 0,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-mid)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
              }}>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "16px",
                    background: "var(--bg-deep)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--accent)", flexShrink: 0,
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div>
                    <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block", fontSize: "0.65rem" }}>
                      80 Cities
                    </span>
                    <h3 className="font-sans" style={{
                      fontSize: "1.15rem", fontWeight: 700,
                      color: "var(--text-primary)", margin: "0 0 0.6rem",
                    }}>Pan-India and Global Reach</h3>
                    <p className="font-sans" style={{
                      fontSize: "0.875rem", lineHeight: 1.7,
                      color: "var(--text-secondary)", margin: 0,
                    }}>
                      Seamless operations across 80 cities in India, with international presence in UAE, USA, Saudi Arabia, and England. One partner, one standard, everywhere your journey takes you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4 — Award-Winning Excellence */}
              <div ref={uspCard4Ref} style={{
                position: "sticky",
                top: 155,
                zIndex: 4,
                padding: "2.25rem",
                borderRadius: "1.75rem",
                marginBottom: "2rem",
                opacity: 0,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-mid)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
              }}>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "16px",
                    background: "var(--bg-deep)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--accent)", flexShrink: 0,
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div>
                    <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block", fontSize: "0.65rem" }}>
                      3× National Award
                    </span>
                    <h3 className="font-sans" style={{
                      fontSize: "1.15rem", fontWeight: 700,
                      color: "var(--text-primary)", margin: "0 0 0.6rem",
                    }}>Award-Winning Excellence</h3>
                    <p className="font-sans" style={{
                      fontSize: "0.875rem", lineHeight: 1.7,
                      color: "var(--text-secondary)", margin: 0,
                    }}>
                      Three consecutive National Tourism Awards (2016–19), Zee Business Award for Best Private Transport, and TV9 Network&apos;s &apos;Leaders of Road Transport&apos; recognition. The most decorated fleet company in India.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5 — Technology-Driven Fleet */}
              <div ref={uspCard5Ref} style={{
                position: "sticky",
                top: 180,
                zIndex: 5,
                padding: "2.25rem",
                borderRadius: "1.75rem",
                marginBottom: "2rem",
                opacity: 0,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-mid)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
              }}>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "16px",
                    background: "var(--bg-deep)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--accent)", flexShrink: 0,
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <div>
                    <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block", fontSize: "0.65rem" }}>
                      2000+ Vehicles
                    </span>
                    <h3 className="font-sans" style={{
                      fontSize: "1.15rem", fontWeight: 700,
                      color: "var(--text-primary)", margin: "0 0 0.6rem",
                    }}>Technology-Driven Fleet</h3>
                    <p className="font-sans" style={{
                      fontSize: "0.875rem", lineHeight: 1.7,
                      color: "var(--text-secondary)", margin: 0,
                    }}>
                      Real-time GPS tracking, AI-powered dispatch, and a fleet of 2000+ premium vehicles from Mercedes, BMW, Audi, and Toyota. Technology meets luxury at every touchpoint.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT: Our Values */}
            <div style={{ position: "sticky", top: 80 }}>
              <div style={{ marginBottom: "2rem" }}>
                <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block" }}>Our Values</span>
                <h3 className="font-sans" style={{
                  fontSize: "1.5rem", fontWeight: 700,
                  color: "var(--text-primary)", margin: "0 0 0.6rem",
                }}>The Principles<br /><span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>We Live By</span></h3>
                <p className="font-sans" style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  At Mann Fleet Partners, every decision is guided by a set of core values that define who we are.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {[
                  { title: "Integrity", desc: "We choose honesty and fairness in every situation, ensuring our actions are guided by strong principles and a clear sense of what is right." },
                  { title: "Reliability", desc: "We build trust by consistently doing what we say, delivering on our commitments with precision and dependability every single time." },
                  { title: "Discipline", desc: "Strong habits and clear structure define how we operate, allowing us to maintain focus, efficiency, and high standards in everything we do." },
                  { title: "Accountability", desc: "We take full ownership of our actions and outcomes, holding ourselves responsible and learning from every situation to continuously improve." },
                  { title: "Consistency", desc: "We show up with the same intent, focus, and standard in every situation, creating a level of reliability that people can depend on without question." },
                  { title: "Will Power", desc: "Through hard work, we stay committed to excellence, pushing through challenges and maintaining our standards even under pressure." },
                ].map(({ title, desc }) => (
                  <div key={title} className="glass-panel" style={{
                    padding: "1.1rem 1.4rem",
                    borderRadius: "1rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: "var(--accent)",
                      flexShrink: 0, marginTop: "0.35rem",
                    }} />
                    <div>
                      <div className="font-sans" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>{title}</div>
                      <div className="font-sans" style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{desc}</div>
                    </div>
                  </div>
                ))}
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
          6. TRACK RECORD
      ══════════════════════════════════════════════ */}
      <section ref={trackSectionRef} style={{
        position: "relative",
        background: "var(--bg-deep)",
        padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 6vw, 6rem)",
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
                  color: "var(--text-primary)",
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
                Trusted partner for US Presidential Visits since 2011 — an enduring relationship that continues to this day. Trusted partner to the Embassies of UAE, Qatar, Canada, and Finland.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {["2011", "2014", "2020", "2023", "Ongoing"].map((yr) => (
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
                Appointed Official Transport Management Company for the G20 Summit (North and East India) by the Ministry of External Affairs.
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
              }}>Sports and Entertainment</h3>
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
              sub: "2011 · 2014 · 2020 · 2023 · Ongoing",
            },
            {
              numRef: statsNum4Ref,
              initVal: "0+",
              suffix: "+ VVIPs",
              label: "Served at Landmark Events",
              sub: "Heads of state and celebrities",
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
              { region: "India", sub: "80 cities · Pan-India Operations", primary: true },
              { region: "USA", sub: "United States of America", primary: false },
              { region: "Nepal", sub: "Kathmandu & surrounds", primary: false },
              { region: "Sri Lanka", sub: "Colombo & surrounds", primary: false },
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
            "Safety is our Utmost MOTTO"
          </p>




        </div>
      </section>

      {/* ── Major Events and Milestones ── */}
      <section style={{
        background: "var(--bg-surface)",
        padding: "clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 6rem)",
        borderTop: "1px solid var(--border-subtle)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{
            fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
            color: "var(--accent)", display: "block", marginBottom: 14, fontWeight: 700,
          }}>Our History</span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.15,
            margin: "0 0 2rem",
          }}>Major Events and Milestones</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-mid)" }}>
                  <th style={{ textAlign: "left", padding: "10px 16px", color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.75rem", whiteSpace: "nowrap", width: "80px" }}>Year</th>
                  <th style={{ textAlign: "left", padding: "10px 16px", color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.75rem" }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { year: "2011", detail: "Provided transport support for the Kabaddi World Cup in Punjab." },
                  { year: "2015", detail: "Provided chauffeur services to a reputed organisation governing and promoting cricket in India." },
                  { year: "2015", detail: "Opened a branch office in Mumbai." },
                  { year: "2015", detail: "Opened a branch office in Noida." },
                  { year: "2016", detail: "Provided premium transport support to several well-known teams participating in a leading international cricket league in India." },
                  { year: "2018", detail: "Opened a branch office in Gurugram." },
                  { year: "2023", detail: "Provided transport support to G20 Secretariat, Ministry of External Affairs during the 3rd Tourism Working Group Meeting." },
                  { year: "2025", detail: "Opened a branch office in Ahmedabad." },
                  { year: "2025", detail: "Opened a branch office in Chennai." },
                  { year: "2025", detail: "Provided transport services to MY Bharat during the Sardar @150 Road Journey Programme." },
                  { year: "2025", detail: "Entered into an agreement with a Singapore based Company to provide transport support during DP World India Championship." },
                  { year: "2026", detail: "Provided transport services to the Parliament during the 28th Conference of Speakers and Presiding Officers of the Commonwealth." },
                  { year: "2026", detail: "Provided transport support during JIO AI Summit." },
                  { year: "2026", detail: "Provided transport support during India Energy Week held in Goa." },
                  { year: "2026", detail: "Selected to act as a mobility transport partner at the Noida International Airport, Jewar, Uttar Pradesh — providing transport services to passengers, employee transportation, and inter-terminal shuttle services." },
                  { year: "2026", detail: "Launch of mobile application, namely, Mann Fleet, allowing customers to make bookings and avail services directly." },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)", background: i % 2 === 0 ? "transparent" : "var(--glass-light)" }}>
                    <td style={{ padding: "12px 16px", color: "var(--accent)", fontWeight: 700, whiteSpace: "nowrap", verticalAlign: "top" }}>{row.year}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Key Awards ── */}
      <section style={{
        background: "var(--bg-base)",
        padding: "clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 6rem)",
        borderTop: "1px solid var(--border-subtle)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{
            fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
            color: "var(--accent)", display: "block", marginBottom: 14, fontWeight: 700,
          }}>Recognition</span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.15,
            margin: "0 0 2rem",
          }}>Key Awards, Accreditations &amp; Recognitions</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-mid)" }}>
                  <th style={{ textAlign: "left", padding: "10px 16px", color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.75rem", whiteSpace: "nowrap", width: "80px" }}>Year</th>
                  <th style={{ textAlign: "left", padding: "10px 16px", color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.75rem" }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { year: "2007", detail: "Received a letter of appreciation from the Embassy of the Philippines." },
                  { year: "2008", detail: "Received a letter of appreciation from Reliance Industries Limited for handling the Young President Organisation's (YPO) Meet held at Jamnagar, Gujarat." },
                  { year: "2011", detail: "Received an appreciation from the Embassy of the United States of America for providing transport services to the President of United States of America during his visit to India in November, 2010." },
                  { year: "2011", detail: "Received a letter of appreciation for providing transport services at the Grand Prix by Formula One World Travel." },
                  { year: "2011", detail: "Received an appreciation letter from the Royal Thai Embassy." },
                  { year: "2012", detail: "Received a letter of appreciation from the Office of the Chief Commissioner of Income Tax for providing transport services at the 4th ITD Conference on Tax and Inequality." },
                  { year: "2012", detail: "Appointed as the official travel partner for the Golden Jubilee Congress of the Asia Pacific Orthopaedic Association (APOA) and the 7th Congress of the Asia Pacific Knee Society (APKS)." },
                  { year: "2013", detail: "Received a letter of appreciation for providing transport services to the Vice President of the United States of America, Hon'ble Joseph R. Biden, Jr., during his visit to New Delhi." },
                  { year: "2013", detail: "Received a letter of appreciation for providing services by the World Bank Group, International Bank for Reconstruction and Development." },
                  { year: "2017", detail: "Awarded Second Prize in the 'Tourist Transport Operators — Category II' segment at the National Tourism Award for the year 2016–2017, conferred by the Ministry of Tourism, Government of India." },
                  { year: "2018", detail: "Awarded Second Prize in the 'Tourist Transport Operators — Category II' segment at the National Tourism Award for the year 2017–2018, conferred by the Ministry of Tourism, Government of India." },
                  { year: "2019", detail: "Awarded Second Prize in the 'Tourist Transport Operators — Category 2' segment at the National Tourism Award for the year 2018–2019, conferred by the Ministry of Tourism, Government of India." },
                  { year: "2020", detail: "Provided transport services to the American Embassy." },
                  { year: "2022", detail: "Received a letter of appreciation from Knight Riders Sports Private Limited (Kolkata Knight Riders)." },
                  { year: "2022", detail: "Received a letter of appreciation from Chennai Super Kings Cricket Limited." },
                  { year: "2022", detail: "Received a letter from Asian Football Confederation (AFC) appreciating the hospitality extended during AFC Women's Asian Cup India 2022." },
                  { year: "2023", detail: "Received appreciation from the G20 Secretariat, Ministry of External Affairs, Government of India, for handling the G20 event." },
                  { year: "2023", detail: "Received a letter of appreciation from Pernod Ricard India Private Limited for providing services during the National Conference." },
                  { year: "2023", detail: "Received appreciation from Indigo Airlines for providing transport services during Indigo event 'Town Hall Meet'." },
                  { year: "2024", detail: "Received an appreciation email from Indigo Paints Limited for handling VIP guests." },
                  { year: "2024", detail: "Received a certificate of appreciation from the Central Board of Indirect Taxes and Customs for prompt filing of returns and payments of Goods and Services Tax during the financial year 2023-24." },
                  { year: "2024", detail: "Received appreciation from Abercrombie & Kent India for providing transport services." },
                  { year: "2024", detail: "Received appreciation from Urban Provider for handling the Jet on Wheels Event." },
                  { year: "2024", detail: "Received award for the Best Luxury Transport Provider at the Global Tourism Awards 2024." },
                  { year: "2025", detail: "Received appreciation from the Embassy of the United States of America for providing transport services to the Vice President, JD Vance during his visit to India." },
                  { year: "2025", detail: "Appointed as the official transportation company for the IATA Annual General Meeting and World Air Transport Summit 2025 by the International Air Transport Association (IATA)." },
                  { year: "2025", detail: "Received Best Luxury Transport Provider award at the Global Tourism Awards 2025." },
                  { year: "2025", detail: "Received an award of Best Luxury Fleet Operating Company at International Wedding Summit & Awards 2025." },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)", background: i % 2 === 0 ? "transparent" : "var(--glass-light)" }}>
                    <td style={{ padding: "12px 16px", color: "var(--accent)", fontWeight: 700, whiteSpace: "nowrap", verticalAlign: "top" }}>{row.year}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
