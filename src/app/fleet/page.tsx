"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────────────────────
   CAR DATA
───────────────────────────────────────────────────────────── */
interface Car {
  name: string;
  image: string;
}

const LUXURY: Car[] = [
  { name: "Mercedes S-Class",        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80" },
  { name: "BMW 7 Series",            image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80" },
  { name: "Audi A8",                 image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80" },
  { name: "Range Rover Autobiography", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80" },
  { name: "Jaguar XJ",               image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80" },
  { name: "Rolls-Royce Ghost",       image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=600&q=80" },
];

const PREMIUM: Car[] = [
  { name: "Mercedes E-Class",        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80" },
  { name: "BMW 5 Series",            image: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?w=600&q=80" },
  { name: "Audi A6",                 image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80" },
  { name: "Volvo S90",               image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&q=80" },
  { name: "Lexus ES 300h",           image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80" },
];

const ECONOMY: Car[] = [
  { name: "Toyota Corolla",          image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80" },
  { name: "Honda City",              image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80" },
  { name: "Hyundai Verna",           image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80" },
  { name: "Maruti Ciaz",             image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80" },
  { name: "Volkswagen Vento",        image: "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=600&q=80" },
];

const BUSES: Car[] = [
  { name: "Toyota Innova Crysta",    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80" },
  { name: "Toyota Hiace",            image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=600&q=80" },
  { name: "Mercedes Sprinter",       image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80" },
  { name: "Tempo Traveller 12-Seater", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80" },
  { name: "Volvo Coach",             image: "https://images.unsplash.com/photo-1581262208435-41726149a759?w=600&q=80" },
];

/* ─────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────── */
function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

function CheckCircle({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   CAR CARD
───────────────────────────────────────────────────────────── */
function CarCard({ car, delay }: { car: Car; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="glass-card"
      style={{
        borderRadius: "1.25rem",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 600ms ${delay}ms cubic-bezier(0.16,1,0.3,1),
                     transform 600ms ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {/* Car image */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
        <Image
          src={car.image}
          alt={car.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Subtle bottom gradient on image */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.38) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Card body */}
      <div style={{
        padding: "1rem 1.2rem 1.2rem",
        background: "var(--glass-surface-86)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
      }}>
        <p className="font-sans" style={{
          fontSize: "0.92rem",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "0.9rem",
          letterSpacing: "-0.01em",
        }}>
          {car.name}
        </p>

        <button
          className="btn-primary"
          style={{ fontSize: "0.72rem", padding: "0.55rem 1.1rem", width: "100%", justifyContent: "center" }}
        >
          Book Now
          <ArrowUpRight size={12} />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLEET SECTION
───────────────────────────────────────────────────────────── */
interface FleetSectionProps {
  id: string;
  category: string;
  tagline: string;
  cars: Car[];
}

function FleetSection({ id, category, tagline, cars }: FleetSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerIn, setHeaderIn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderIn(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      style={{
        padding: "5rem 0 2rem",
        background: "var(--bg-base)",
      }}
    >
      {/* Section header */}
      <div
        ref={headerRef}
        style={{
          paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
          paddingRight: "clamp(1.25rem, 5vw, 4rem)",
          marginBottom: "2.5rem",
          opacity: headerIn ? 1 : 0,
          transform: headerIn ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Rule + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
          <div className="rule-glass" style={{ width: 40 }} />
          <span className="glass-badge">{cars.length} vehicles</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "0.75rem" }}>
          <h2
            className="font-serif uppercase text-emboss"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.0,
              letterSpacing: "0.01em",
              margin: 0,
            }}
          >
            {category}
          </h2>
          <p className="font-sans" style={{
            fontSize: "0.85rem",
            color: "var(--text-50)",
            maxWidth: 340,
            lineHeight: 1.6,
            margin: 0,
          }}>
            {tagline}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border-mid)", marginBottom: "2.5rem" }} />

      {/* Car grid */}
      <div
        style={{
          paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
          paddingRight: "clamp(1.25rem, 5vw, 4rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {cars.map((car, i) => (
          <CarCard key={car.name} car={car} delay={i * 70} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLEET HERO
───────────────────────────────────────────────────────────── */
function FleetHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Immediately show — it's the first thing in view
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={heroRef}
      style={{
        background: "var(--bg-base)",
        padding: "5rem clamp(1.25rem, 5vw, 4rem) 4rem",
        textAlign: "center",
        borderBottom: "1px solid var(--border-mid)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* IATA + India's Fleet badges */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        marginBottom: "1.75rem",
        flexWrap: "wrap",
      }}>
        {/* IATA image badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.3rem 0.9rem 0.3rem 0.5rem",
          borderRadius: "9999px",
          background: "var(--glass-mid)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          border: "1px solid var(--border-mid)",
          boxShadow: "inset 0 1px 0 var(--inner-light), 0 2px 8px rgba(100,80,50,0.10)",
        }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/IATA.jpg" alt="IATA" width={28} height={28} style={{ objectFit: "cover" }} />
          </div>
          <span className="font-sans uppercase" style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "var(--text-primary)",
          }}>
            IATA Approved
          </span>
        </div>

        {/* Green dot badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: "0.3rem 0.9rem",
          borderRadius: "9999px",
          background: "var(--glass-mid)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          border: "1px solid var(--border-mid)",
          boxShadow: "inset 0 1px 0 var(--inner-light), 0 2px 8px rgba(100,80,50,0.10)",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#4ade80",
            boxShadow: "0 0 0 3px rgba(74,222,128,0.22)",
            flexShrink: 0,
          }} />
          <span className="font-sans uppercase" style={{
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: "var(--text-primary)",
          }}>
            200+ Vehicles Available
          </span>
        </div>
      </div>

      {/* Headline */}
      <h1
        className="font-serif uppercase text-emboss"
        style={{
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 400,
          lineHeight: 1.0,
          letterSpacing: "0.02em",
          color: "var(--text-primary)",
          margin: "0 auto 1.25rem",
        }}
      >
        Our Fleet
      </h1>

      {/* Subtitle */}
      <p className="font-sans" style={{
        fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
        color: "var(--text-50)",
        maxWidth: 520,
        lineHeight: 1.75,
        margin: "0 auto 2.5rem",
      }}>
        From IATA-certified luxury transfers to event coaches — every vehicle in our fleet
        is professionally maintained and chauffeur-ready.
      </p>

      {/* Trust row */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.6rem 2rem",
        justifyContent: "center",
        marginBottom: "2.5rem",
      }}>
        {[
          "IATA Accredited",
          "Chauffeur-driven",
          "24/7 Support",
          "Corporate & VIP Ready",
        ].map((item) => (
          <span key={item} className="font-sans" style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            fontSize: "0.72rem", fontWeight: 600,
            color: "var(--text-55)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            <span style={{ color: "#4ade80" }}><CheckCircle size={12} /></span>
            {item}
          </span>
        ))}
      </div>

      {/* Quick-nav pills */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.6rem",
        justifyContent: "center",
      }}>
        {[
          { label: "Luxury", id: "luxury" },
          { label: "Premium", id: "premium" },
          { label: "Economy", id: "economy" },
          { label: "Buses & Mini Vans", id: "buses" },
        ].map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className="btn-ghost font-sans uppercase"
            style={{ fontSize: "0.72rem", padding: "0.5rem 1.1rem" }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function FleetPage() {
  return (
    <main style={{ background: "var(--bg-base)", minHeight: "100vh" }}>
      <Navbar />
      <FleetHero />

      <FleetSection
        id="luxury"
        category="Luxury"
        tagline="World-class vehicles for discerning clients — embassies, executives, and VIP transfers."
        cars={LUXURY}
      />

      <FleetSection
        id="premium"
        category="Premium"
        tagline="Business-grade comfort for corporate travel, airport transfers, and long-haul rides."
        cars={PREMIUM}
      />

      <FleetSection
        id="economy"
        category="Economy"
        tagline="Reliable, fuel-efficient sedans for everyday city and intercity travel."
        cars={ECONOMY}
      />

      <FleetSection
        id="buses"
        category="Buses & Mini Vans"
        tagline="High-capacity vehicles for group travel, events, conferences, and delegations."
        cars={BUSES}
      />

      {/* Bottom divider before footer */}
      <div style={{ height: 1, background: "var(--border-mid)", margin: "3rem 0 0" }} />

      <Footer />
    </main>
  );
}
