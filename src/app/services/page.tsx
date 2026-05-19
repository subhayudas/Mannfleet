"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SERVICES = [
  {
    id: "long-term",
    text: "Long-Term Rentals",
    badge: "institutional",
    description: "End-to-end vehicle rental solutions for institutional fleets and retail customers.",
    image: "/Mann car pictures/Mercedes-Benz E-Class/ChatGPT Image Apr 28, 2026, 06_32_56 PM.png",
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
    id: "self-drive",
    text: "Self-Drive Leasing",
    badge: "flexible",
    description: "Flexible self-drive vehicle leasing options for individuals and professionals.",
    image: "/Mann car pictures/Toyota camry hybrid/toyota camry hybrid front.jpeg",
    stat: "200+",
    statLabel: "vehicles available",
  },
  {
    id: "pan-india-mobility",
    text: "Corporate's Pan India Mobility",
    badge: "corporate",
    description: "Comprehensive pan-India mobility solutions tailored for corporate clients.",
    image: "/Mann car pictures/Mercedes-Benz S-Class/ChatGPT Image Apr 29, 2026, 11_07_15 PM.png",
    stat: "Pan-India",
    statLabel: "coverage",
  },
  {
    id: "film-shoots-concerts",
    text: "Film Shoots & Concerts",
    badge: "entertainment",
    description: "Specialized transportation and logistics for film shoots and major concerts.",
    image: "/Mann car pictures/range rover sport/ChatGPT Image May 6, 2026, 03_38_44 PM.png",
    stat: "Custom",
    statLabel: "logistics",
  },
  {
    id: "global-leaders-celebrities",
    text: "Global Leaders & Celebrities Visit",
    badge: "vip",
    description: "High-security, luxury fleet for global leaders and celebrity visits.",
    image: "/Mann car pictures/Rolls royce/ChatGPT Image May 1, 2026, 01_10_24 PM.png",
    stat: "VIP",
    statLabel: "security",
  },
  {
    id: "conventions-exhibitions",
    text: "Conventions & Exhibitions",
    badge: "scale",
    description: "Coordinated transportation for large-scale conventions and exhibitions.",
    image: "/Mann car pictures/Toyota Coaster New Generation/ChatGPT Image May 4, 2026, 12_38_26 PM.png",
    stat: "Scale",
    statLabel: "capacity",
  },
  {
    id: "leasing",
    text: "Leasing",
    badge: "flexible",
    description: "Flexible leasing options for both individual and corporate needs.",
    image: "/Mann car pictures/Toyota fortuner/Toyota fortuner front.jpeg",
    stat: "Flexible",
    statLabel: "terms",
  },
  {
    id: "high-profile-delegation",
    text: "High Profile Delegation",
    badge: "executive",
    description: "Executive fleet services tailored for high-profile delegations.",
    image: "/Mann car pictures/Mercedes-Benz S-Class/ChatGPT Image Apr 29, 2026, 11_07_15 PM.png",
    stat: "Premium",
    statLabel: "service",
  },
  {
    id: "agm-board-meets",
    text: "AGM & Board Meets",
    badge: "corporate",
    description: "Seamless travel logistics for Annual General Meetings and board meets.",
    image: "/Mann car pictures/BMW 7 Series/ChatGPT Image Apr 28, 2026, 08_33_02 PM.png",
    stat: "Seamless",
    statLabel: "experience",
  },
  {
    id: "leagues-tournaments",
    text: "Leagues & Tournaments",
    badge: "sports",
    description: "Dedicated transport solutions for sports leagues and tournaments.",
    image: "/Mann car pictures/Tempo traveller/ChatGPT Image May 15, 2026, 11_18_13 PM.png",
    stat: "Team",
    statLabel: "logistics",
  },
  {
    id: "events-weddings",
    text: "Events & Weddings",
    badge: "bespoke",
    description: "Elegant and reliable transportation for your special events and weddings.",
    image: "/Mann car pictures/Rolls royce/ChatGPT Image May 1, 2026, 01_14_32 PM.png",
    stat: "Bespoke",
    statLabel: "luxury",
  },
  {
    id: "tourism",
    text: "Tourism",
    badge: "travel",
    description: "Comfortable and safe sightseeing and tourism transportation services.",
    image: "/Taj mahal.jpeg",
    stat: "Scenic",
    statLabel: "routes",
  },
];

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

function ServiceCard({ service, index, inView }: {
  service: typeof SERVICES[0];
  index: number;
  inView: boolean;
}) {
  return (
    <Link
      href={`/services/${service.id}`}
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        borderRadius: "1.5rem",
        overflow: "hidden",
        border: "1px solid var(--border-subtle)",
        background: "var(--glass-surface-88)",
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",
        boxShadow: "0 2px 20px rgba(60,40,20,0.08)",
        transition: `opacity 600ms ${index * 55}ms cubic-bezier(0.16,1,0.3,1),
                     transform 600ms ${index * 55}ms cubic-bezier(0.16,1,0.3,1),
                     box-shadow 0.25s ease`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        cursor: "pointer",
      }}
      className="service-index-card"
    >
      {/* Image */}
      <div style={{
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.text}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
          className="service-card-img"
        />
      </div>

      {/* Content */}
      <div style={{
        padding: "1.25rem 1.4rem 1.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        flex: 1,
      }}>
        <span className="glass-badge" style={{ alignSelf: "flex-start" }}>
          {service.badge}
        </span>

        <h3 className="font-serif" style={{
          fontSize: "clamp(1.15rem, 2vw, 1.35rem)",
          fontWeight: 400,
          color: "var(--text-primary)",
          lineHeight: 1.2,
          margin: 0,
          letterSpacing: "0.01em",
        }}>
          {service.text}
        </h3>

        <p className="font-sans" style={{
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          margin: 0,
          flex: 1,
        }}>
          {service.description}
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "0.5rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--border-subtle)",
        }}>
          <div>
            <span className="font-sans text-emboss" style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1,
              display: "block",
            }}>
              {service.stat}
            </span>
            <span className="font-sans" style={{
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}>
              {service.statLabel}
            </span>
          </div>

          <div className="btn-disc" style={{
            width: "2rem",
            height: "2rem",
            color: "var(--text-primary)",
            flexShrink: 0,
          }}>
            <ArrowUpRight size={13} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [headerIn, setHeaderIn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (gridRef.current) obs.observe(gridRef.current);
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
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      <main>
        {/* ── Hero Header ── */}
        <section
          ref={headerRef}
          style={{
            padding: "clamp(3.5rem, 9vw, 7rem) clamp(1.25rem, 5vw, 4rem) clamp(2.5rem, 5vw, 4rem)",
            maxWidth: 1240,
            margin: "0 auto",
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span className="glass-badge">our services</span>
            <div className="rule-glass" style={{ width: 60 }} />
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}>
            <h1 className="font-serif" style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "0.01em",
            }}>
              Everything you need,
              <br />
              <span style={{ color: "var(--text-72)" }}>wherever you go.</span>
            </h1>

            <div style={{ maxWidth: 340 }}>
              <p className="font-sans" style={{
                fontSize: "0.92rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                margin: "0 0 1.25rem",
              }}>
                From daily corporate commutes to state-level delegations — Mann Fleet Partners delivers a full spectrum of mobility solutions across India.
              </p>
              <span className="glass-badge">{SERVICES.length} service categories</span>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "var(--border-mid)", margin: "0 clamp(1.25rem, 5vw, 4rem)" }} />

        {/* ── Service Card Grid ── */}
        <section style={{
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 5vw, 4rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} index={i} inView={inView} />
            ))}
          </div>
        </section>

        {/* ── CTA Strip ── */}
        <section style={{
          padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div className="glass-card" style={{
            padding: "clamp(2rem, 5vw, 3rem)",
            borderRadius: "2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}>
            <div>
              <h2 className="font-serif" style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                margin: "0 0 0.4rem",
                letterSpacing: "0.01em",
              }}>
                Not sure which service fits?
              </h2>
              <p className="font-sans" style={{
                fontSize: "0.88rem",
                color: "var(--text-secondary)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Our team will find the perfect solution tailored to your needs.
              </p>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
                Talk to us
                <ArrowUpRight size={15} />
              </Link>
              <Link href="/reservation" style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: 9999,
                border: "1.5px solid var(--border-mid)",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                background: "transparent",
              }}>
                Book Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .service-index-card:hover {
          box-shadow: 0 8px 40px rgba(60,40,20,0.16);
          transform: translateY(-3px) !important;
        }
        .service-index-card:hover .service-card-img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
