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
  "Artist & crew transport",
  "Equipment logistics support",
  "On-set standby fleet",
  "Night-shift operations",
  "Confidential & discreet service",
  "Pan-India coordination",
];

const STAGES = [
  {
    number: "01",
    title: "Pre-Production Briefing",
    description: "We meet the production coordinator 72 hours before shoot day to understand call sheets, locations, and key talent movements.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Dedicated Standby Fleet",
    description: "Vehicles are pre-positioned at base camp before the crew arrives. Artist cars remain on standby throughout — no delays between scenes.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Night & Multi-Shift Ops",
    description: "Film sets don't run 9-to-5. Our drivers are briefed for overnight shoots, back-to-back shifts, and last-minute location changes.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Confidentiality First",
    description: "All chauffeurs assigned to entertainment clients sign NDAs. Paparazzi routes are avoided. Guest movements are never disclosed.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

const VEHICLE_IMAGES = [
  "/Mann car pictures/range rover sport/ChatGPT Image May 6, 2026, 03_38_44 PM.png",
  "/Mann car pictures/range rover sport/ChatGPT Image May 6, 2026, 03_38_48 PM.png",
  "/Mann car pictures/range rover sport/ChatGPT Image May 6, 2026, 03_38_52 PM.png",
];

export default function FilmShootsConcertsPage() {
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

          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>Entertainment Logistics</span>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem" }}>
            <div style={{ flex: "1 1 400px" }}>
              <h1 className="font-serif" style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 400, lineHeight: 1.05, color: "var(--text-primary)", margin: "0 0 1.25rem", letterSpacing: "0.01em" }}>
                Film Shoots &amp; Concerts
              </h1>
              <p className="font-sans" style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 520, margin: "0 0 2rem" }}>
                Specialized transportation and logistics for film shoots and major concerts. We coordinate multi-vehicle fleets for cast, crew, and equipment with precision timing and discretion.
              </p>
              <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
                Get a Quote <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="glass-card" style={{ padding: "2rem 2.5rem", borderRadius: "1.75rem", textAlign: "center", minWidth: 180, flexShrink: 0 }}>
              <p className="font-sans text-emboss" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1, margin: "0 0 0.5rem" }}>Custom</p>
              <p className="font-sans" style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, margin: 0 }}>logistics</p>
            </div>
          </div>
        </section>

        {/* ── Hero Image ── */}
        <section style={{ padding: "3rem clamp(1.25rem, 5vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ borderRadius: "2rem", overflow: "hidden", height: "clamp(220px, 40vw, 500px)", border: "1px solid var(--border-subtle)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/serviceimages/PHOTO-2026-05-28-11-59-58.jpg" alt="Film Shoots & Concerts"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
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

        {/* ── Production Logistics Breakdown ── */}
        <section style={{ padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)" }}>How we work</span>
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 400, color: "var(--text-primary)", margin: "0 0 0.5rem", letterSpacing: "0.01em" }}>
            On-set precision, off-screen.
          </h2>
          <p className="font-sans" style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "0 0 2rem", lineHeight: 1.6, maxWidth: 480 }}>
            Production timelines are unforgiving. Our four-stage logistics framework keeps cast and crew moving — whatever the hour, wherever the location.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "1.25rem" }}>
            {STAGES.map((stage) => (
              <div key={stage.number} className="glass-card" style={{ padding: "1.75rem", borderRadius: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "10px", flexShrink: 0, background: "linear-gradient(135deg, rgba(200,40,40,0.16) 0%, rgba(200,40,40,0.05) 100%)", border: "1px solid rgba(200,40,40,0.22)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                    {stage.icon}
                  </div>
                  <span className="font-sans" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", color: "var(--text-muted)", textTransform: "uppercase" }}>{stage.number}</span>
                </div>
                <h3 className="font-sans" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.5rem" }}>{stage.title}</h3>
                <p className="font-sans" style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>{stage.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Vehicle Strip ── */}
        <section style={{ padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)" }}>On-set vehicles</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {VEHICLE_IMAGES.map((src, i) => (
              <div key={i} style={{ borderRadius: "1.25rem", overflow: "hidden", aspectRatio: "4/3", border: "1px solid var(--border-subtle)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Range Rover Sport" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={{ padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div className="glass-card" style={{ padding: "clamp(2rem, 5vw, 3.5rem)", borderRadius: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
            <div>
              <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, color: "var(--text-primary)", margin: "0 0 0.5rem", letterSpacing: "0.01em" }}>Ready to get started?</h2>
              <p className="font-sans" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>Our team will find the perfect solution tailored to your needs.</p>
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
