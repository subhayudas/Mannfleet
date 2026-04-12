"use client";

import { useEffect, useRef } from "react";
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
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  /* ── Hero refs ── */
  const heroBadgeRef    = useRef<HTMLDivElement>(null);
  const heroLine1Ref    = useRef<HTMLSpanElement>(null);
  const heroLine2Ref    = useRef<HTMLSpanElement>(null);
  const heroLine3Ref    = useRef<HTMLSpanElement>(null);
  const heroYearRef     = useRef<HTMLDivElement>(null);
  const heroSublineRef  = useRef<HTMLParagraphElement>(null);
  const heroScrollRef   = useRef<HTMLDivElement>(null);

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

  /* ── CTA refs ── */
  const ctaSectionRef   = useRef<HTMLElement>(null);
  const ctaWrapRef      = useRef<HTMLDivElement>(null);
  const ctaLine1Ref     = useRef<HTMLParagraphElement>(null);
  const ctaLine2Ref     = useRef<HTMLParagraphElement>(null);
  const ctaBtnRef       = useRef<HTMLButtonElement>(null);
  const ctaLineLeftRef  = useRef<HTMLDivElement>(null);
  const ctaLineRightRef = useRef<HTMLDivElement>(null);

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
    }, pageRef);

    return () => ctx.revert();
  }, []);

  /* ════════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════════ */
  return (
    <div ref={pageRef}>
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
        {/* Faint watermark */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
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
          zIndex: 0,
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
          zIndex: 10,
        }}>
          <span className="font-sans" style={{
            fontSize: "0.58rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
          }}>Scroll</span>
          <ArrowDown size={16} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. WHAT WE ARE
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
                  { val: "4",    label: "Global hubs — UAE, KSA, England, India" },
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
          4. WHAT WE DO
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
              { region: "India", sub: "Primary Hub · Pan-India", primary: true },
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
          8. CLOSING CTA
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
