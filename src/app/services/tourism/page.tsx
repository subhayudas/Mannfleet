"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

const FEATURES = [
  "Pan-India sightseeing routes",
  "Knowledgeable local chauffeurs",
  "Comfortable & air-conditioned vehicles",
  "Custom tour itineraries",
  "Hotel & airport transfers",
  "Multi-day tour packages",
];

const ROUTES = [
  {
    name: "Golden Triangle",
    cities: "Delhi · Agra · Jaipur",
    description: "India's most iconic circuit — the Taj Mahal, Amber Fort, and Qutub Minar across 3 magnificent cities.",
    duration: "3–5 days",
  },
  {
    name: "Rajasthan Royal Circuit",
    cities: "Jaipur · Jodhpur · Udaipur",
    description: "Palaces, desert forts, and lake-side luxury through the Land of Kings.",
    duration: "5–7 days",
  },
  {
    name: "Kerala Backwaters",
    cities: "Kochi · Alleppey · Munnar",
    description: "Lush greenery, serene backwaters, and hill stations in God's Own Country.",
    duration: "4–6 days",
  },
  {
    name: "Himalayan Foothills",
    cities: "Delhi · Rishikesh · Mussoorie",
    description: "Spiritual ghats, mountain views, and crisp Himalayan air just hours from the capital.",
    duration: "3–4 days",
  },
  {
    name: "Heritage South",
    cities: "Chennai · Mahabalipuram · Mysore",
    description: "Dravidian temples, royal palaces, and the world's oldest living art traditions.",
    duration: "4–5 days",
  },
  {
    name: "Custom Itinerary",
    cities: "Anywhere in India",
    description: "Tell us your dream destinations. We plan the route, vehicles, and logistics — you simply travel.",
    duration: "Flexible",
  },
];

export default function TourismPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section style={{ padding: "clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem) 0", maxWidth: 1240, margin: "0 auto" }}>
          <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", textDecoration: "none", marginBottom: "1.5rem", letterSpacing: "0.02em" }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 7L7 17" /><path d="M17 17H7V7" />
            </svg>
            All Services
          </Link>

          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>Scenic Journeys</span>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem" }}>
            <div style={{ flex: "1 1 400px" }}>
              <h1 className="font-serif" style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 400, lineHeight: 1.05, color: "var(--text-primary)", margin: "0 0 1.25rem", letterSpacing: "0.01em" }}>
                Tourism
              </h1>
              <p className="font-sans" style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 520, margin: "0 0 2rem" }}>
                Comfortable and safe sightseeing across India's most breathtaking destinations. Explore landmarks in style with our chauffeur-driven vehicles and knowledgeable, courteous drivers.
              </p>
              <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
                Plan My Trip <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="glass-card" style={{ padding: "2rem 2.5rem", borderRadius: "1.75rem", textAlign: "center", minWidth: 180, flexShrink: 0 }}>
              <p className="font-sans text-emboss" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1, margin: "0 0 0.5rem" }}>Scenic</p>
              <p className="font-sans" style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, margin: 0 }}>routes</p>
            </div>
          </div>
        </section>

        {/* ── Taj Mahal Hero Image ── */}
        <section style={{ padding: "3rem clamp(1.25rem, 5vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ borderRadius: "2rem", overflow: "hidden", height: "clamp(240px, 42vw, 520px)", border: "1px solid var(--border-subtle)", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/serviceimages/PHOTO-2026-05-28-13-02-22.jpg" alt="Tourism — Heritage India"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,24,20,0.55) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", bottom: "1.75rem", left: "2rem" }}>
              <p className="font-sans" style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", margin: "0 0 0.3rem" }}>Signature Destination</p>
              <p className="font-serif" style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 400, color: "#fff", margin: 0, letterSpacing: "0.01em" }}>
                Taj Mahal, Agra
              </p>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section style={{ padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)" }}>What&apos;s included</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "1rem" }}>
            {FEATURES.map((f) => (
              <div key={f} className="glass-card" style={{ padding: "1.25rem 1.5rem", borderRadius: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 28, height: 28, borderRadius: "8px", flexShrink: 0, background: "linear-gradient(135deg, rgba(200,40,40,0.18) 0%, rgba(200,40,40,0.06) 100%)", border: "1px solid rgba(200,40,40,0.28)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span className="font-sans" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>{f}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Signature Routes ── */}
        <section style={{ padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Signature routes</span>
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 400, color: "var(--text-primary)", margin: "0 0 0.5rem", letterSpacing: "0.01em" }}>
            Curated journeys across India.
          </h2>
          <p className="font-sans" style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "0 0 2rem", lineHeight: 1.6, maxWidth: 480 }}>
            Popular circuits our guests love — or tell us your own and we&apos;ll handle everything.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1rem" }}>
            {ROUTES.map((route) => (
              <div key={route.name} className="glass-card" style={{ padding: "1.5rem", borderRadius: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div>
                    <h3 className="font-sans" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.2rem" }}>{route.name}</h3>
                    <p className="font-sans" style={{ fontSize: "0.72rem", color: "var(--accent)", fontWeight: 600, margin: 0, letterSpacing: "0.04em" }}>{route.cities}</p>
                  </div>
                  <span className="glass-badge" style={{ flexShrink: 0, whiteSpace: "nowrap" }}>{route.duration}</span>
                </div>
                <p className="font-sans" style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{route.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={{ padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div className="glass-card" style={{ padding: "clamp(2rem, 5vw, 3.5rem)", borderRadius: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
            <div>
              <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, color: "var(--text-primary)", margin: "0 0 0.5rem", letterSpacing: "0.01em" }}>Ready to explore India?</h2>
              <p className="font-sans" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>Our team will plan the perfect journey from start to finish.</p>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/reservation" className="btn-primary" style={{ textDecoration: "none" }}>Book Now <ArrowUpRight size={15} /></Link>
              <Link href="/contact" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", borderRadius: 9999, border: "1.5px solid var(--border-mid)", fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", background: "transparent" }}>Talk to us</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
