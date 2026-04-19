"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

/* ── Icons ───────────────────────────────────────────────── */
function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

function PlayIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Stat Card ───────────────────────────────────────────── */
function StatCard({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.10)",
      backdropFilter: "blur(24px) saturate(160%)",
      WebkitBackdropFilter: "blur(24px) saturate(160%)",
      border: "1px solid rgba(255,255,255,0.18)",
      borderRadius: "1.25rem",
      padding: "1.1rem 1.5rem",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22), 0 8px 32px rgba(0,0,0,0.28)",
      minWidth: 155,
      flex: "1 1 155px",
    }}>
      {/* value uses serif + uppercase */}
      <p className="font-serif uppercase" style={{
        fontSize: "1.75rem", fontWeight: 400, color: "#ffffff",
        lineHeight: 1, marginBottom: "0.25rem", letterSpacing: "0.02em",
      }}>
        {value}
      </p>
      <p className="font-sans uppercase" style={{
        fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em",
        color: "rgba(255,255,255,0.80)", marginBottom: "0.18rem",
      }}>
        {label}
      </p>
      <p className="font-sans" style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.48)" }}>
        {sub}
      </p>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const navRef       = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);
  const line3Ref     = useRef<HTMLSpanElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const bulletsRef   = useRef<HTMLDivElement>(null);
  const ctasRef      = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const runAnimation = () => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Nav slides down from above
        tl.fromTo(navRef.current,
          { y: -28, opacity: 0, filter: "blur(8px)" },
          { y: 0,   opacity: 1, filter: "blur(0px)", duration: 0.8 },
        );

        // Badge fades up
        tl.fromTo(badgeRef.current,
          { y: 20, opacity: 0, filter: "blur(6px)" },
          { y: 0,  opacity: 1, filter: "blur(0px)", duration: 0.65 },
          "-=0.4",
        );

        // Headline lines stagger up
        tl.fromTo([line1Ref.current, line2Ref.current, line3Ref.current],
          { y: 36, opacity: 0, filter: "blur(10px)" },
          { y: 0,  opacity: 1, filter: "blur(0px)", duration: 0.75, stagger: 0.13 },
          "-=0.3",
        );

        // Subtitle
        tl.fromTo(subtitleRef.current,
          { y: 18, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.55 },
          "-=0.35",
        );

        // Bullets
        tl.fromTo(bulletsRef.current,
          { y: 14, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.45 },
          "-=0.3",
        );

        // CTAs
        tl.fromTo(ctasRef.current,
          { y: 18, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.5 },
          "-=0.25",
        );

        // Stats strip slides up from bottom
        tl.fromTo(statsRef.current,
          { y: 32, opacity: 0, filter: "blur(8px)" },
          { y: 0,  opacity: 1, filter: "blur(0px)", duration: 0.65 },
          "-=0.4",
        );
      }, sectionRef);
    };

    // If intro was already seen this session, animate immediately.
    // Otherwise wait for the intro overlay to finish.
    if (sessionStorage.getItem("mannfleet_intro_seen")) {
      runAnimation();
    } else {
      window.addEventListener("intro:done", runAnimation, { once: true });
    }

    return () => {
      window.removeEventListener("intro:done", runAnimation);
      ctx?.revert();
    };
  }, []);

  return (
    /* Outer wrapper — font-sans (Geist) */
    <section
      ref={sectionRef}
      className={cn("font-sans relative flex flex-col min-h-screen overflow-hidden")}
    >
      {/* ── Background Video ── */}
      <video
        src="/Maanherovideo.mp4"
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* ── Overlay layers ── */}
      <div className="absolute inset-0" style={{
        zIndex: 1,
        background: "linear-gradient(105deg, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.60) 45%, rgba(0,0,0,0.22) 100%)",
      }} />
      <div className="absolute inset-0" style={{
        zIndex: 1,
        background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 44%)",
      }} />

      {/* ── Navigation ── */}
      <Navbar overlay wrapperRef={navRef} initialOpacity={0} />

      {/* ── Hero Content ── */}
      <div className="relative flex-1 flex flex-col justify-center px-6 lg:px-20 pb-52 lg:pb-56 pt-4 lg:pt-6" style={{ zIndex: 10 }}>
        <div className="max-w-3xl">

          {/* Label badge — font-sans, uppercase */}
          <div
            ref={badgeRef}
            className="font-sans uppercase"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.3rem 1rem",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.22)",
              marginBottom: "1.6rem",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20), 0 2px 8px rgba(0,0,0,0.22)",
              opacity: 0,
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
              boxShadow: "0 0 0 3px rgba(74,222,128,0.28)", flexShrink: 0,
            }} />
            <span style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.82)",
            }}>
              India&apos;s Premium Fleet
            </span>
          </div>

          {/* H1 — font-serif, uppercase */}
          <h1 className="font-serif uppercase" style={{
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: "0.01em",
            color: "#ffffff",
            textShadow: "0 2px 24px rgba(0,0,0,0.45)",
            margin: 0,
          }}>
            <span ref={line1Ref} style={{ display: "block", opacity: 0 }}>
              Premium
            </span>
            <span ref={line2Ref} style={{ display: "block", color: "rgba(255,255,255,0.72)", opacity: 0 }}>
              vehicles for
            </span>
            <span ref={line3Ref} className="italic" style={{
              display: "block",
              color: "rgba(255,255,255,0.48)",
              fontSize: "0.78em",
              opacity: 0,
            }}>
              every journey with MANN.
            </span>
          </h1>

          {/* Subtitle — font-sans */}
          <p
            ref={subtitleRef}
            className="font-sans"
            style={{
              marginTop: "1.6rem",
              fontSize: "0.96rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.58)",
              maxWidth: 430,
              opacity: 0,
            }}
          >
            From city commutes to cross-country road trips, MANN delivers an exceptional
            fleet with seamless booking and world-class service.
          </p>

          {/* Trust bullets — font-sans, uppercase */}
          <div
            ref={bulletsRef}
            className="font-sans uppercase"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.65rem 1.5rem",
              marginTop: "1.25rem",
              opacity: 0,
            }}
          >
            {["Instant online booking", "24/7 support", "No hidden fees"].map((item) => (
              <span key={item} style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.10em",
                color: "rgba(255,255,255,0.60)",
              }}>
                <span style={{ color: "#4ade80" }}><CheckIcon size={12} /></span>
                {item}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div ref={ctasRef} className="flex items-center gap-4 flex-wrap" style={{ marginTop: "2.4rem", opacity: 0 }}>
            <Link href="/fleet" className="btn-primary" style={{ fontSize: "0.78rem", padding: "0.82rem 1.8rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", textDecoration: "none" }}>
              Browse Fleet
              <ArrowUpRight size={14} />
            </Link>

            {/* Ghost white button — font-sans, uppercase */}
            <button
              className="font-sans uppercase"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.80rem 1.5rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.10em",
                color: "#ffffff",
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.26)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20), 0 2px 12px rgba(0,0,0,0.20)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.42)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.26)";
              }}
            >
              <PlayIcon size={11} />
              How it works
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Stats Strip ── */}
      <div
        ref={statsRef}
        className="absolute bottom-0 left-0 right-0"
        style={{ zIndex: 10, padding: "0 1.5rem 1.75rem", opacity: 0 }}
      >
        {/* Divider */}
        <div style={{
          height: 1,
          background: "rgba(255,255,255,0.10)",
          marginBottom: "1.2rem",
          marginLeft: 4,
          marginRight: 4,
        }} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", alignItems: "stretch" }}>
          <StatCard value="200+" label="Premium Vehicles" sub="SUVs, sedans, sports & luxury" />
          <StatCard value="IATA" label="Approved & Accredited" sub="Globally recognised standard" />
          <StatCard value="500+" label="Trusted Clients" sub="Corporates, embassies & VIPs" />

          {/* Brands panel — font-serif for brand names, uppercase */}
          <div style={{
            flex: "2 1 260px",
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.13)",
            borderRadius: "1.25rem",
            padding: "1.1rem 1.5rem",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 8px 32px rgba(0,0,0,0.24)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            <p className="font-sans uppercase" style={{
              fontSize: "0.60rem", fontWeight: 700, letterSpacing: "0.13em",
              color: "rgba(255,255,255,0.38)", marginBottom: "0.8rem",
            }}>
              Our Fleet Brands
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 1.1rem", alignItems: "center" }}>
              {["Audi", "BMW", "Mercedes", "Tesla", "Jaguar", "Range Rover"].map((brand) => (
                <span
                  key={brand}
                  className="font-serif uppercase"
                  style={{
                    fontSize: "0.95rem", fontWeight: 400, letterSpacing: "0.05em",
                    color: "rgba(255,255,255,0.26)", cursor: "default", transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.72)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.26)"; }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
