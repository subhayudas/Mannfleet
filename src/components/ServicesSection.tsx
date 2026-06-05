"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";

/* ── Service Data ─────────────────────────────────────────── */
const SERVICES = [
  {
    id: "long-term",
    text: "Long-Term Rentals",
    badge: "institutional",
    description: "End-to-end vehicle rental solutions for institutional fleets and retail customers.",
    image: "/Mann car pictures/Mercedes-Benz S-Class/ChatGPT Image Apr 29, 2026, 11_09_09 PM.png",
    stat: "12+ months",
    statLabel: "min. contract",
  },
  {
    id: "spot",
    text: "Spot Rentals",
    badge: "on-demand",
    description: "On-demand chauffeur-driven services for corporates, airport transfers, and travel.",
    image: "/Mann car pictures/Toyota fortuner/ChatGPT Image May 4, 2026, 12_35_18 PM.png",
    stat: "24/7",
    statLabel: "availability",
  },
  {
    id: "shuttle",
    text: "Shuttle Service",
    badge: "scheduled",
    description: "Scheduled, high-frequency shuttle operations connecting offices, campuses, and key city nodes.",
    image: "/Mann car pictures/Force Urbania/ChatGPT Image Apr 30, 2026, 01_24_25 AM.png",
    stat: "80+",
    statLabel: "cities covered",
  },
  {
    id: "chauffeur-leasing",
    text: "Chauffeur Leasing",
    badge: "flexible",
    description: "Premium chauffeur-driven vehicle leasing for individuals, corporates, and professionals.",
    image: "/Mann car pictures/Hyundai Creta/ChatGPT Image May 6, 2026, 04_03_13 PM.png",
    stat: "200+",
    statLabel: "vehicles available",
  },
  {
    id: "pan-india-mobility",
    text: "Corporate's Pan India Mobility",
    badge: "corporate",
    description: "Comprehensive pan-India mobility solutions tailored for corporate clients.",
    image: "/Mann car pictures/S class.png",
    stat: "Pan-India",
    statLabel: "coverage",
  },
  {
    id: "film-shoots-concerts",
    text: "Film Shoots & Concerts",
    badge: "entertainment",
    description: "Specialized transportation and logistics for film shoots and major concerts.",
    image: "/Mann car pictures/volvo 39, 43 seater.jpeg",
    stat: "Custom",
    statLabel: "logistics",
  },
  {
    id: "global-leaders-celebrities",
    text: "Global Leaders & Celebrities Visit",
    badge: "vip",
    description: "High-security, luxury fleet for global leaders and celebrity visits.",
    image: "/Mann car pictures/7 series.png",
    stat: "VIP",
    statLabel: "security",
  },
  {
    id: "conventions-exhibitions",
    text: "Conventions & Exhibitions",
    badge: "scale",
    description: "Coordinated transportation for large-scale conventions and exhibitions.",
    image: "/Mann car pictures/volvo 39, 43 seater.jpeg",
    stat: "Scale",
    statLabel: "capacity",
  },
  {
    id: "leasing",
    text: "Leasing",
    badge: "flexible",
    description: "Flexible leasing options for both individual and corporate needs.",
    image: "/Mann car pictures/Fortuner.png",
    stat: "Flexible",
    statLabel: "terms",
  },
  {
    id: "high-profile-delegation",
    text: "High Profile Delegation",
    badge: "executive",
    description: "Executive fleet services tailored for high-profile delegations.",
    image: "/Mann car pictures/S class.png",
    stat: "Premium",
    statLabel: "service",
  },
  {
    id: "agm-board-meets",
    text: "AGM & Board Meets",
    badge: "corporate",
    description: "Seamless travel logistics for Annual General Meetings and board meets.",
    image: "/Mann car pictures/S class.png",
    stat: "Seamless",
    statLabel: "experience",
  },
  {
    id: "leagues-tournaments",
    text: "Leagues & Tournaments",
    badge: "sports",
    description: "Dedicated transport solutions for sports leagues and tournaments.",
    image: "/Mann car pictures/volvo 39, 43 seater.jpeg",
    stat: "Team",
    statLabel: "logistics",
  },
  {
    id: "events-weddings",
    text: "Events & Weddings",
    badge: "bespoke",
    description: "Elegant and reliable transportation for your special events and weddings.",
    image: "/Mann car pictures/7 series.png",
    stat: "Bespoke",
    statLabel: "luxury",
  },
  {
    id: "tourism",
    text: "Tourism",
    badge: "travel",
    description: "Comfortable and safe sightseeing and tourism transportation services.",
    image: "/Mann car pictures/Fortuner.png",
    stat: "Scenic",
    statLabel: "routes",
  },
];

/* ── Helpers ─────────────────────────────────────────────── */
function distSq(x: number, y: number, x2: number, y2: number) {
  return (x - x2) ** 2 + (y - y2) ** 2;
}
function closestEdge(mouseX: number, mouseY: number, w: number, h: number): "top" | "bottom" {
  return distSq(mouseX, mouseY, w / 2, 0) < distSq(mouseX, mouseY, w / 2, h)
    ? "top"
    : "bottom";
}

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

/* ── Single Row Item ─────────────────────────────────────── */
interface ItemProps {
  service: (typeof SERVICES)[0];
  isFirst: boolean;
  index: number;
  inView: boolean;
  speed: number;
  repetitions: number;
}

function ServiceRow({ service, isFirst, index, inView, speed, repetitions }: ItemProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<gsap.core.Tween | null>(null);
  const [marqReps, setMarqReps] = useState(repetitions);
  const [hovered, setHovered] = useState(false);

  const EXP = { duration: 0.72, ease: "expo.out" };

  /* measure & (re-)start ticker */
  const startTicker = useCallback(() => {
    if (!marqueeInnerRef.current) return;
    const part = marqueeInnerRef.current.querySelector<HTMLElement>(".srv-marquee__part");
    if (!part) return;
    const w = part.offsetWidth;
    if (!w) return;
    if (tickerRef.current) tickerRef.current.kill();
    tickerRef.current = gsap.to(marqueeInnerRef.current, {
      x: -w,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
  }, [speed]);

  /* recalc reps on resize */
  useEffect(() => {
    const calc = () => {
      if (!marqueeInnerRef.current) return;
      const part = marqueeInnerRef.current.querySelector<HTMLElement>(".srv-marquee__part");
      if (!part) return;
      const needed = Math.ceil(window.innerWidth / (part.offsetWidth || 1)) + 2;
      setMarqReps(Math.max(4, needed));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [service.text, service.image]);

  /* start ticker after DOM update */
  useEffect(() => {
    const t = setTimeout(startTicker, 60);
    return () => {
      clearTimeout(t);
      tickerRef.current?.kill();
    };
  }, [service.text, service.image, marqReps, startTicker]);

  /* edge-detection hover */
  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!rowRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    setHovered(true);
    const rect = rowRef.current.getBoundingClientRect();
    const edge = closestEdge(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: EXP })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!rowRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    setHovered(false);
    const rect = rowRef.current.getBoundingClientRect();
    const edge = closestEdge(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: EXP })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, "<");
  };

  return (
    <div
      ref={rowRef}
      style={{
        position: "relative",
        overflow: "hidden",
        borderTop: isFirst ? "none" : "1px solid var(--border-mid)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-28px)",
        transition: `opacity 700ms ${index * 90 + 80}ms cubic-bezier(0.16,1,0.3,1),
                     transform 700ms ${index * 90 + 80}ms cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {/* ── Clickable row link ── */}
      <Link
        href={`/services/${service.id}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.6rem 0",
          cursor: "pointer",
          textDecoration: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: index + title */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span
            style={{
              fontVariantNumeric: "tabular-nums",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "var(--text-30)",
              letterSpacing: "0.06em",
              minWidth: "1.6rem",
            }}
          >
            0{index + 1}
          </span>

          <div>
            <span
              className="text-emboss"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
                fontWeight: 600,
                color: hovered ? "var(--text-primary)" : "var(--text-82)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                display: "block",
                transition: "color 0.25s ease",
              }}
            >
              {service.text}
            </span>

            <p
              className="svc-description"
              style={{
                fontSize: "0.82rem",
                color: "var(--text-45)",
                marginTop: "0.35rem",
                maxWidth: "420px",
                lineHeight: 1.5,
                opacity: hovered ? 0 : 1,
                transform: hovered ? "translateY(4px)" : "translateY(0)",
                transition: "opacity 0.22s ease, transform 0.22s ease",
              }}
            >
              {service.description}
            </p>
          </div>
        </div>

        {/* Right: image pill + stat + arrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexShrink: 0 }}>
          {/* small image thumbnail */}
          <div
            style={{
              width: "clamp(80px, 10vw, 140px)",
              height: "clamp(2.2rem, 4vh, 3.2rem)",
              borderRadius: 9999,
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              border: "1.5px solid var(--border-mid)",
              flexShrink: 0,
              opacity: hovered ? 0 : 1,
              transition: "opacity 0.2s ease",
            }}
          />
          {/* stat block */}
          <div className="svc-right-stat" style={{ textAlign: "right" }}>
            <p
              className="text-emboss"
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1,
                opacity: hovered ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            >
              {service.stat}
            </p>
            <p style={{ fontSize: "0.7rem", color: "var(--text-40)", marginTop: "0.2rem" }}>
              {service.statLabel}
            </p>
          </div>

          {/* arrow disc */}
          <div
            className="btn-disc"
            style={{
              width: "2.4rem",
              height: "2.4rem",
              color: "var(--text-primary)",
              transform: hovered ? "rotate(45deg) scale(1.1)" : "none",
              transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <ArrowUpRight size={14} />
          </div>
        </div>
      </Link>

      {/* ── Marquee overlay (slides in on hover) ── */}
      <div
        ref={marqueeRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
          transform: "translate3d(0, 101%, 0)",
          background: "var(--glass-surface-88)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          borderTop: "1px solid rgba(255,255,255,0.60)",
          borderBottom: "1px solid var(--border-mid)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.70), inset 0 -1px 0 rgba(60,40,20,0.08)",
          zIndex: 2,
        }}
      >
        {/* inner counter-translate so content stays put */}
        <div
          style={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            ref={marqueeInnerRef}
            className="srv-marquee__inner"
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "fit-content",
              willChange: "transform",
            }}
          >
            {Array.from({ length: marqReps }).map((_, i) => (
              <div
                key={i}
                className="srv-marquee__part"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  gap: 0,
                }}
              >
                {/* service name */}
                <span
                  style={{
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)",
                    letterSpacing: "-0.01em",
                    color: "var(--text-primary)",
                    padding: "0 2vw",
                  }}
                >
                  {service.text}
                </span>

                {/* image pill */}
                <div
                  style={{
                    width: "clamp(120px, 14vw, 220px)",
                    height: "clamp(2.8rem, 5.5vh, 4.5rem)",
                    margin: "0 1.5vw",
                    borderRadius: "9999px",
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                    flexShrink: 0,
                    border: "1.5px solid var(--border-mid)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.45), 0 3px 10px rgba(60,40,20,0.18)",
                  }}
                />

                {/* badge dot separator */}
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--text-28)",
                    flexShrink: 0,
                    margin: "0 1vw",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ────────────────────────────────────────── */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [headerIn, setHeaderIn] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderIn(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "var(--bg-base)",
        padding: "3.5rem 0 2.5rem",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div
        ref={headerRef}
        style={{
          padding: "0 1.25rem 3.5rem",
          maxWidth: "none",
          paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
          paddingRight: "clamp(1.25rem, 5vw, 4rem)",
          opacity: headerIn ? 1 : 0,
          transform: headerIn ? "translateY(0)" : "translateY(22px)",
          transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <span className="glass-badge">our services</span>
          <div className="rule-glass" style={{ width: "60px" }} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
          <h2
            className="text-emboss"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Everything you need,
            <br />
            <span style={{ color: "var(--text-72)" }}>wherever you go.</span>
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-65)", maxWidth: "340px", lineHeight: 1.6, margin: 0 }}>
            Hover each service to explore. Mann Fleet Partners delivers a full spectrum of
            mobility solutions — enterprise to bespoke.
          </p>
        </div>
      </div>

      {/* ── Divider top ── */}
      <div
        style={{
          height: "1px",
          background: "var(--border-mid)",
          marginBottom: 0,
        }}
      />

      {/* ── Service rows ── */}
      <div
        ref={sectionRef}
        style={{
          paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
          paddingRight: "clamp(1.25rem, 5vw, 4rem)",
        }}
      >
        {SERVICES.map((svc, i) => (
          <ServiceRow
            key={svc.id}
            service={svc}
            isFirst={i === 0}
            index={i}
            inView={inView}
            speed={22}
            repetitions={5}
          />
        ))}
      </div>

      {/* ── Divider bottom ── */}
      <div style={{ height: "1px", background: "var(--border-mid)" }} />

      {/* ── Bottom CTA strip ── */}
      <div
        style={{
          paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
          paddingRight: "clamp(1.25rem, 5vw, 4rem)",
          paddingTop: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 700ms 480ms cubic-bezier(0.16,1,0.3,1), transform 700ms 480ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div>
          <p
            className="text-emboss"
            style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}
          >
            Not sure which service fits?
          </p>
          <p style={{ fontSize: "0.82rem", color: "var(--text-50)", marginTop: "0.3rem" }}>
            Our team will find the perfect solution for you.
          </p>
        </div>
        <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
          Talk to us
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
