"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndiaMap from "@/components/IndiaMap";

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

const FEATURES = [
  "Pan-India coverage across 80+ cities",
  "Dedicated corporate account manager",
  "GST-compliant invoicing & reporting",
  "24/7 operations support",
  "Scheduled & on-demand fleet",
  "GPS-tracked vehicles",
];

const COVERAGE_STATS = [
  { value: "80+", label: "Cities" },
  { value: "500+", label: "Corporate clients" },
  { value: "24/7", label: "Support" },
  { value: "200+", label: "Vehicles" },
];

export default function PanIndiaMobilityPage() {
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

          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>Enterprise Mobility Solutions</span>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem" }}>
            <div style={{ flex: "1 1 400px" }}>
              <h1 className="font-serif" style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 400, lineHeight: 1.05, color: "var(--text-primary)", margin: "0 0 1.25rem", letterSpacing: "0.01em" }}>
                Corporate&apos;s Pan India Mobility
              </h1>
              <p className="font-sans" style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 520, margin: "0 0 2rem" }}>
                Comprehensive pan-India mobility solutions tailored for corporate clients. Seamless coordination across 80+ cities ensures your workforce travels safely, on time, and in comfort.
              </p>
              <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
                Get a Quote <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="glass-card" style={{ padding: "2rem 2.5rem", borderRadius: "1.75rem", textAlign: "center", minWidth: 180, flexShrink: 0 }}>
              <p className="font-sans text-emboss" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1, margin: "0 0 0.5rem" }}>Pan-India</p>
              <p className="font-sans" style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, margin: 0 }}>coverage</p>
            </div>
          </div>
        </section>

        {/* ── Hero Image ── */}
        <section style={{ padding: "3rem clamp(1.25rem, 5vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ borderRadius: "2rem", overflow: "hidden", height: "clamp(220px, 40vw, 500px)", border: "1px solid var(--border-subtle)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/serviceimages/PHOTO-2026-05-28-11-53-44.jpg" alt="Corporate Pan India Mobility"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          </div>
        </section>

        {/* ── Coverage Stats ── */}
        <section style={{ padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "1rem" }}>
            {COVERAGE_STATS.map((s) => (
              <div key={s.label} className="glass-card" style={{ padding: "1.5rem 2rem", borderRadius: "1.25rem", textAlign: "center" }}>
                <p className="font-sans text-emboss" style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.3rem", lineHeight: 1 }}>{s.value}</p>
                <p className="font-sans" style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, margin: 0 }}>{s.label}</p>
              </div>
            ))}
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

        {/* ── India Map ── */}
        <section style={{ padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Our coverage</span>
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 400, color: "var(--text-primary)", margin: "0 0 0.5rem", letterSpacing: "0.01em" }}>
            Wherever business takes you.
          </h2>
          <p className="font-sans" style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "0 0 2rem", lineHeight: 1.6, maxWidth: 480 }}>
            From metros to Tier-2 cities — our network spans 80+ locations across India, ready to serve your corporate fleet needs.
          </p>
          <IndiaMap />
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
