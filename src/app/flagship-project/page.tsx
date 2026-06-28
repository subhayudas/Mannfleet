"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */
function IconPlane() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}
function IconCar() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2" />
      <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
    </svg>
  );
}
function IconBus() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 4v6M16 4v6" />
      <circle cx="7" cy="20" r="2" /><circle cx="17" cy="20" r="2" />
      <path d="M7 18H3v-2M17 18h4v-2" />
    </svg>
  );
}
function IconRoute() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function FlagshipProjectPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroLabelRef = useRef<HTMLSpanElement>(null);
  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroLineRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const mandateRef = useRef<HTMLElement>(null);
  const advantageRef = useRef<HTMLElement>(null);
  const connectRef = useRef<HTMLElement>(null);
  const appRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ease = "power3.out";

    /* Hero entrance */
    const heroCtx = gsap.context(() => {
      gsap.set([heroLabelRef.current, heroH1Ref.current, heroSubRef.current, heroLineRef.current], { opacity: 0, y: 30 });
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(heroLabelRef.current, { opacity: 1, y: 0, duration: 0.7, ease })
        .to(heroH1Ref.current, { opacity: 1, y: 0, duration: 0.9, ease }, "-=0.4")
        .to(heroSubRef.current, { opacity: 1, y: 0, duration: 0.7, ease }, "-=0.5")
        .to(heroLineRef.current, { opacity: 1, y: 0, duration: 0.5, ease }, "-=0.4");
    });

    /* Scroll-triggered sections */
    const sections = [overviewRef, visualRef, statsRef, mandateRef, advantageRef, connectRef, appRef, quoteRef];
    const triggers: ScrollTrigger[] = [];
    sections.forEach((ref) => {
      if (!ref.current) return;
      gsap.set(ref.current, { opacity: 0, y: 40 });
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top 82%",
        onEnter: () => gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.85, ease }),
      });
      triggers.push(st);
    });

    /* Stat counter animation */
    const statEls = document.querySelectorAll<HTMLElement>(".nia-stat-val");
    statEls.forEach((el) => {
      const target = parseFloat(el.dataset.target || "0");
      const isFloat = el.dataset.target?.includes(".");
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo({ v: 0 }, { v: target }, {
            duration: 1.6, ease: "power2.out",
            onUpdate: function () {
              el.textContent = isFloat
                ? this.targets()[0].v.toFixed(1)
                : Math.round(this.targets()[0].v).toString();
            },
          });
        },
        once: true,
      });
    });

    return () => {
      heroCtx.revert();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        position: "relative",
        background: "var(--bg-deep)",
        overflow: "hidden",
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 7vw, 8rem) clamp(4rem, 9vw, 7rem)",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
      }}>
        {/* Background radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(220,38,38,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "linear-gradient(rgba(44,36,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(44,36,22,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Large watermark */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", zIndex: 0,
        }}>
          <span style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(6rem, 22vw, 18rem)",
            fontWeight: 400,
            color: "rgba(220,38,38,0.04)",
            letterSpacing: "0.06em",
          }}>NIA</span>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, width: "100%", margin: "0 auto" }}>
          {/* Eyebrow */}
          <span ref={heroLabelRef} style={{
            display: "inline-block",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "1.5rem",
            fontWeight: 600,
          }}>
            Experience Mann Fleet Partners at Noida International Airport
          </span>

          {/* Main heading */}
          <h1 ref={heroH1Ref} className="font-serif" style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
            maxWidth: 900,
          }}>
            Noida International
            <br />
            Airport
          </h1>

          {/* Subtitle */}
          <p ref={heroSubRef} style={{
            fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
            color: "var(--text-secondary)",
            maxWidth: 560,
            lineHeight: 1.65,
            marginBottom: "2.5rem",
          }}>
            Redefining ground mobility at India&apos;s newest and most ambitious aviation hub
          </p>

          {/* Divider line + meta */}
          <div ref={heroLineRef} style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ width: 48, height: 1, background: "var(--accent)" }} />
            <span style={{
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              fontWeight: 600,
            }}>Official Mobility Services Partner</span>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
          background: "linear-gradient(to bottom, transparent, var(--bg-base))",
          pointerEvents: "none",
        }} />
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. PARTNERSHIP OVERVIEW
      ═══════════════════════════════════════════════════════ */}
      <section ref={overviewRef} style={{
        background: "var(--bg-base)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 7vw, 8rem)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "clamp(2rem, 5vw, 5rem)", alignItems: "start" }}>

            {/* Left label block */}
            <div>
              <span style={{
                fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                color: "var(--accent)", display: "block", marginBottom: 14,
              }}>The Partnership</span>
              <h2 className="font-serif" style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.15,
              }}>
                Official Appointment
              </h2>
              <div style={{ width: 40, height: 2, background: "var(--accent)", marginTop: "1.25rem" }} />
            </div>

            {/* Right content */}
            <div>
              <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderLeft: "4px solid var(--accent)",
                borderRadius: 16,
                padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem)",
                marginBottom: 24,
              }}>
                <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", lineHeight: 1.85, color: "var(--text-secondary)", margin: 0 }}>
                  Mann Fleet Partners Limited, led by{" "}
                  <strong style={{ color: "var(--text-primary)" }}>Mr. Robin Singh Mann</strong>, has been selected to provide comprehensive ground mobility solutions at Noida International Airport — including rental cars, terminal shuttles, and city connectivity to locations such as Pari Chowk. This initiative ensures smooth and reliable passenger transport as part of the airport&apos;s operational launch.
                </p>
              </div>

              {/* Three quick-stat pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {[
                  "Exclusive kerbside access",
                  "Premium fleet deployment",
                  "End-to-end mobility design",
                  "Workforce transport management",
                ].map((tag) => (
                  <span key={tag} style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 999,
                    padding: "6px 14px",
                    fontSize: "0.78rem",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.02em",
                  }}>
                    <span style={{ color: "var(--accent)", fontSize: 10 }}>●</span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2.5 VISUAL BREAK: THE INFRASTRUCTURE
      ═══════════════════════════════════════════════════════ */}
      <section ref={visualRef} style={{
        background: "var(--bg-base)",
        padding: "0 clamp(1.5rem, 7vw, 8rem)",
        marginBottom: "clamp(4rem, 8vw, 7rem)",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          aspectRatio: "21 / 9",
          border: "1px solid var(--border-subtle)",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
        }}>
          <Image
            src="/flagship-hero.jpg"
            alt="Noida International Airport"
            fill
            style={{
              objectFit: "cover",
            }}
            priority
          />
          {/* Subtle gradient overlay for text readability */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5))",
            pointerEvents: "none"
          }} />
          <div style={{
            position: "absolute",
            bottom: "clamp(1.5rem, 3vw, 2.5rem)",
            left: "clamp(1.5rem, 3vw, 2.5rem)",
          }}>
            <h3 className="font-serif" style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
              color: "#fff",
              margin: 0,
              lineHeight: 1.1
            }}>Noida International Airport</h3>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2.7 MANN TAJ EXPRESS
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: "var(--bg-base)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 7vw, 8rem)",
        borderTop: "1px solid var(--border-subtle)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 6rem)", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: 14 }}>
                Exclusive Service
              </span>
              <h2 className="font-serif" style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}>
                Mann Taj Express
              </h2>
              <p style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                From Noida International Airport to the Taj Mahal, in complete luxury. The Taj Mahal is not just India&apos;s most iconic monument, it is a UNESCO World Heritage Site and one of the New Seven Wonders of the World.
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                With Noida International Airport emerging as a major new gateway near the Yamuna Expressway corridor, travellers now have a smoother, faster, and more premium way to experience Agra.
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                Mann Taj Express by Mann Fleet Partners offers luxury airport-to-Taj Mahal transfers for tourists, business travellers, international guests, and premium delegations. From the moment you land at Noida International Airport, our chauffeur-driven vehicles ensure a comfortable, private, and refined journey to one of the world&apos;s greatest landmarks.
              </p>
              <div style={{
                background: "rgba(220,38,38,0.06)",
                border: "1px solid rgba(220,38,38,0.18)",
                borderLeft: "4px solid var(--accent)",
                borderRadius: 12,
                padding: "1rem 1.25rem",
                fontFamily: "'Instrument Serif', serif",
                fontSize: "1.05rem",
                fontStyle: "italic",
                color: "var(--text-primary)",
              }}>
                You land in Noida. We take care of the road to Agra.
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: 0 }}>
              {/* Taj Mahal card */}
              <div style={{
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid var(--border-subtle)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                aspectRatio: "4 / 3",
                position: "relative",
              }}>
                <Image
                  src="/Taj%20mahal.jpeg"
                  alt="Taj Mahal, Agra"
                  fill
                  unoptimized
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  padding: "1.5rem 1.25rem 1rem",
                  background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
                }}>
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.1rem", color: "#fff", margin: "0 0 0.2rem" }}>Taj Mahal, Agra</p>
                  <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", letterSpacing: "0.08em", textTransform: "uppercase" }}>One of the New Seven Wonders of the World</p>
                </div>
              </div>
              {/* Chauffeur card */}
              <div style={{
                borderRadius: 20,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                overflow: "hidden",
              }}>
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1rem", color: "var(--text-primary)", margin: "0 0 0.25rem", fontWeight: 400 }}>Uniformed Chauffeur Service</p>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>Professional, white-gloved chauffeurs trained for VIP and luxury transport standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. THREE PILLARS OF MOBILITY
      ═══════════════════════════════════════════════════════ */}
      <section ref={mandateRef} style={{
        background: "var(--bg-base)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 7vw, 8rem)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: 14 }}>Our Mandate</span>
            <h2 className="font-serif" style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              marginBottom: 14,
            }}>
              Three Pillars of Mobility
            </h2>
            <p style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "var(--text-secondary)", maxWidth: 560, lineHeight: 1.65 }}>
              A fully integrated ground transportation ecosystem designed for the modern traveller and the airport workforce.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(1rem, 2vw, 1.5rem)",
          }}>
            {[
              {
                Icon: IconCar,
                title: "Curated Rental Mobility",
                body: "Exclusive fleet of premium vehicles with dedicated kerbside access at arrivals and departures — minimal walking, maximum convenience for every passenger.",
                tags: ["Premium fleet", "Kerbside access", "24/7 availability"],
              },
              {
                Icon: IconBus,
                title: "Intra-Airport Shuttle Network",
                body: "Seamless movement within the airport campus with professionally managed, high-frequency shuttle operations connecting terminals, parking, and facilities.",
                tags: ["High-frequency", "Campus-wide", "Managed operations"],
              },
              {
                Icon: IconRoute,
                title: "City Connectivity Solutions",
                body: "Direct links to Pari Chowk · Botanical Garden · Greater Noida West · Jewar R&R Colony — designed for both passenger mobility and daily workforce commutes.",
                tags: ["4 city nodes", "Passenger and workforce", "Scheduled routes"],
              },
            ].map(({ Icon, title, body, tags }, i) => (
              <div key={i} style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 20,
                padding: "clamp(1.5rem, 3vw, 2rem)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "border-color 0.25s",
              }}>
                {/* Icon circle */}
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: "rgba(220,38,38,0.08)",
                  border: "1px solid rgba(220,38,38,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent)",
                }}>
                  <Icon />
                </div>

                <div>
                  <h3 className="font-serif" style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                    fontWeight: 400,
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}>{title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>{body}</p>
                </div>

                {/* Tag list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
                  {tags.map((tag) => (
                    <div key={tag} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "var(--accent)", flexShrink: 0 }}><IconCheck /></span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. SCALE AT A GLANCE
      ═══════════════════════════════════════════════════════ */}
      <section ref={statsRef} style={{
        background: "var(--bg-deep)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 7vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(220,38,38,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: 14 }}>
              Built for Scale
            </span>
            <h2 className="font-serif" style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
            }}>
              The Scale of Opportunity
            </h2>
          </div>

          {/* Stat cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "clamp(1rem, 2vw, 1.5rem)",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}>
            {[
              { val: "6.5", suffix: " Million", label: "Expected number of flyers in the first year", note: "Phase 1 launch" },
              { val: "20", suffix: "–25%", label: "Compound Annual Growth Rate", note: "Projected growth trajectory" },
            ].map(({ val, suffix, label, note }, i) => (
              <div key={i} style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 20,
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: 60, height: 2, background: "var(--accent)", borderRadius: 999,
                }} />
                <div style={{ marginTop: "0.75rem" }}>
                  <span className="nia-stat-val font-serif" data-target={val} style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(3rem, 7vw, 5.5rem)",
                    color: "var(--accent)",
                    lineHeight: 1,
                    display: "inline",
                  }}>0</span>
                  <span className="font-serif" style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(3rem, 7vw, 5.5rem)",
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}>{suffix}</span>
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-primary)", marginTop: "0.75rem", marginBottom: "0.25rem", fontWeight: 500 }}>{label}</p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{note}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. MANN FLEET ADVANTAGE
      ═══════════════════════════════════════════════════════ */}
      <section ref={advantageRef} style={{
        background: "var(--bg-deep)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 7vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "40%",
          background: "radial-gradient(ellipse 80% 80% at 100% 50%, rgba(220,38,38,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 6rem)", alignItems: "center" }}>

            {/* Left: heading */}
            <div>
              <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: 14 }}>
                Why Mann Fleet
              </span>
              <h2 className="font-serif" style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}>
                The Mann Fleet Advantage
              </h2>
              <p style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem" }}>
                Decades of proven performance, trusted by the world&apos;s most demanding clients — from G20 summits to embassy fleets — now brought to India&apos;s most ambitious airport.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 3, height: 36, background: "var(--accent)", borderRadius: 999 }} />
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--text-secondary)", fontStyle: "italic" }}>
                  Est. 1986 — 40+ years of industry leadership
                </span>
              </div>
            </div>

            {/* Right: feature tiles */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.75rem, 1.5vw, 1rem)" }}>
              {[
                { icon: <IconStar />, title: "40+ Years of Industry Leadership", body: "Unmatched depth of experience in premium ground transportation across India." },
                { icon: <IconPlane />, title: "Large-Scale, High-Stakes Operations", body: "Proven expertise managing complex, time-critical mobility at the highest level." },
                { icon: <IconCheck />, title: "Trusted by Global Institutions", body: "Serving corporations, foreign embassies, G20 delegations, and government bodies." },
                { icon: <IconRoute />, title: "High-Security Transport Track Record", body: "Certified processes for managing sensitive and security-critical transport requirements." },
              ].map(({ icon, title, body }, i) => (
                <div key={i} style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 14,
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    color: "var(--accent)",
                    width: 40, height: 40, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(220,38,38,0.07)",
                    borderRadius: 10,
                  }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.93rem", color: "var(--text-primary)", fontWeight: 500, marginBottom: "0.2rem" }}>{title}</p>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. CITY CONNECTIVITY DIAGRAM
      ═══════════════════════════════════════════════════════ */}
      <section ref={connectRef} style={{
        background: "var(--bg-base)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 7vw, 8rem)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: 14 }}>
              Connectivity Network
            </span>
            <h2 className="font-serif" style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
            }}>
              Routes Connecting the Region
            </h2>
            <p style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto" }}>
              Key corridors linking Noida International Airport to the greater NCR region and beyond — including Agra and the Taj Mahal.
            </p>
          </div>

          {/* Diagram */}
          <div style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 24,
            padding: "clamp(2rem, 5vw, 4rem)",
            position: "relative",
          }}>
            {/* Center hub */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              marginBottom: "clamp(2rem, 4vw, 3rem)",
            }}>
              <div style={{
                background: "var(--accent)",
                color: "#fff",
                borderRadius: 20,
                padding: "1.5rem 2.5rem",
                textAlign: "center",
                boxShadow: "0 0 0 8px rgba(220,38,38,0.1), 0 0 0 16px rgba(220,38,38,0.05)",
                marginBottom: "1rem",
              }}>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Hub</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1rem, 2.5vw, 1.5rem)", fontWeight: 400 }}>Noida International Airport</div>
                <div style={{ fontSize: "0.72rem", opacity: 0.75, marginTop: 2 }}>Gautam Budh Nagar, UP</div>
              </div>

              {/* Connecting lines visual — horizontal spoke pattern */}
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>↕ Direct Routes ↕</div>
            </div>

            {/* Route nodes */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "clamp(0.75rem, 2vw, 1.5rem)",
            }}>
              {[
                { name: "Agra — Taj Mahal", desc: "UNESCO World Heritage Site and one of the New Seven Wonders of the World — via Mann Taj Express", dist: "~180 km", featured: true },
                { name: "Pari Chowk", desc: "Greater Noida central hub, major transit interchange", dist: "~12 km", featured: false },
                { name: "Botanical Garden", desc: "Noida Metro interchange, connecting Delhi NCR", dist: "~35 km", featured: false },
                { name: "Greater Noida West", desc: "Emerging residential and commercial corridor", dist: "~18 km", featured: false },
                { name: "Jewar R&R Colony", desc: "Resettlement & Rehabilitation Colony, resident mobility", dist: "~8 km", featured: false },
              ].map(({ name, desc, dist, featured }) => (
                <div key={name} style={{
                  background: featured ? "rgba(220,38,38,0.06)" : "var(--bg-base)",
                  border: featured ? "1px solid rgba(220,38,38,0.28)" : "1px solid var(--border-subtle)",
                  borderRadius: 16,
                  padding: "1.25rem",
                  textAlign: "center",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
                    width: 2, height: 20, background: featured ? "var(--accent)" : "var(--border-mid)",
                  }} />
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: featured ? "rgba(220,38,38,0.14)" : "rgba(220,38,38,0.08)",
                    border: "1px solid rgba(220,38,38,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0.75rem auto 0.75rem",
                    color: "var(--accent)",
                  }}>
                    <IconRoute />
                  </div>
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: featured ? "1.05rem" : "1rem", color: "var(--text-primary)", marginBottom: "0.3rem", fontWeight: featured ? 600 : 400 }}>{name}</p>
                  <p style={{ fontSize: "0.73rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "0.5rem" }}>{desc}</p>
                  <span style={{
                    display: "inline-block",
                    background: featured ? "rgba(220,38,38,0.10)" : "var(--bg-surface)",
                    border: featured ? "1px solid rgba(220,38,38,0.22)" : "1px solid var(--border-subtle)",
                    borderRadius: 999,
                    padding: "2px 10px",
                    fontSize: "0.68rem",
                    color: "var(--accent)",
                    letterSpacing: "0.05em",
                  }}>{dist}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6.5. NIA APP
      ═══════════════════════════════════════════════════════ */}
      <section ref={appRef} style={{
        background: "var(--bg-base)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 7vw, 8rem)",
        borderTop: "1px solid var(--border-subtle)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* NIA Inauguration Photos */}
          <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: 14 }}>
              Noida International Airport Inauguration
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "clamp(0.75rem, 1.5vw, 1.25rem)" }}>
              {[
                "/photo%20to%20choose%20from/WhatsApp%20Image%202026-05-05%20at%204.31.46%20PM.jpeg",
                "/photo%20to%20choose%20from/WhatsApp%20Image%202026-05-05%20at%204.31.43%20PM%20(4).jpeg",
                "/photo%20to%20choose%20from/WhatsApp%20Image%202026-05-05%20at%204.31.43%20PM%20(1).jpeg",
                "/photo%20to%20choose%20from/WhatsApp%20Image%202026-05-05%20at%204.31.43%20PM%20(2).jpeg",
                "/photo%20to%20choose%20from/WhatsApp%20Image%202026-05-05%20at%204.31.43%20PM%20(3).jpeg",
                "/photo%20to%20choose%20from/WhatsApp%20Image%202026-05-05%20at%204.31.44%20PM%20(1).jpeg",
                "/photo%20to%20choose%20from/WhatsApp%20Image%202026-05-05%20at%204.31.44%20PM%20(2).jpeg",
                "/photo%20to%20choose%20from/WhatsApp%20Image%202026-05-05%20at%204.31.46%20PM%20(1).jpeg",
                "/photo%20to%20choose%20from/WhatsApp%20Image%202026-05-05%20at%204.31.47%20PM%20(1).jpeg",
                "/photo%20to%20choose%20from/WhatsApp%20Image%202026-05-05%20at%204.31.47%20PM%20(2).jpeg",
              ].map((src, i) => (
                <div key={i} style={{ position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: 14, overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                  <Image
                    src={src}
                    alt={`NIA Inauguration ${i + 1}`}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(3rem, 6vw, 6rem)", alignItems: "center" }}>

            {/* Left: Content */}
            <div style={{ flex: "1 1 400px" }}>
              <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: 14 }}>
                Digital Mobility
              </span>
              <h2 className="font-serif" style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}>
                The Noida International Airport App
              </h2>
              <p style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1rem" }}>
                Specially designed for Noida International Airport (NIA) — your dedicated travel companion for seamless ground mobility at India&apos;s newest aviation hub. The official NIA application brings your entire journey to your fingertips.
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                Book premium cabs, track terminal shuttles, access exclusive mobility services from Mann Fleet Partners, and stay updated with real-time real-time flight status updates — all in one unified digital experience.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 3, height: 36, background: "var(--accent)", borderRadius: 999 }} />
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--text-secondary)", fontStyle: "italic" }}>
                  Scan the QR code to download the application.
                </span>
              </div>
            </div>

            {/* Right: QR Code */}
            <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center" }}>
              <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 24,
                padding: "clamp(2rem, 4vw, 3rem)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
              }}>
                <div style={{
                  position: "relative",
                  width: 220,
                  height: 220,
                  marginBottom: "1.5rem",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid var(--border-mid)",
                }}>
                  <Image
                    src="/nia-app-qr.jpg"
                    alt="NIA App QR Code"
                    fill
                    style={{ objectFit: "contain", background: "#fff" }}
                    unoptimized
                  />
                </div>
                <h3 className="font-serif" style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "1.3rem",
                  color: "var(--text-primary)",
                  marginBottom: "0.25rem",
                  fontWeight: 400
                }}>Download Now</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textAlign: "center", maxWidth: 200, margin: 0 }}>Available for iOS and Android devices</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. CLOSING QUOTE
      ═══════════════════════════════════════════════════════ */}
      <section ref={quoteRef} style={{
        background: "var(--bg-deep)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 7vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(220,38,38,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "rgba(220,38,38,0.15)",
            lineHeight: 1,
            marginBottom: "1rem",
            userSelect: "none",
          }}>&ldquo;</div>
          <p style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(1.25rem, 3vw, 2rem)",
            fontStyle: "italic",
            color: "var(--text-primary)",
            lineHeight: 1.55,
            margin: "0 0 2rem",
          }}>
            At Noida International Airport, Mann Fleet is setting a new benchmark for integrated, passenger-centric ground transportation in India.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <div style={{ width: 40, height: 1, background: "var(--border-mid)" }} />
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              Mann Fleet Partners Limited
            </span>
            <div style={{ width: 40, height: 1, background: "var(--border-mid)" }} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
