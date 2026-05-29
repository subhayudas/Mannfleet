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
  "Advance security coordination",
  "Protected & luxury vehicles available",
  "Trained chauffeurs with background checks",
  "Real-time route monitoring",
  "Confidential guest management",
  "Protocol-compliant operations",
];

const PROTOCOLS = [
  {
    number: "01",
    title: "Advance Planning",
    description: "Route surveys, contingency planning, and coordination with security teams — completed 48 hours before arrival.",
    points: ["Route reconnaissance", "Alternate route mapping", "Security team briefing"],
  },
  {
    number: "02",
    title: "Vetted Chauffeurs",
    description: "Every driver assigned to VIP movements undergoes background verification, protocol training, and confidentiality agreements.",
    points: ["Full background verification", "Protocol & etiquette training", "Signed NDAs & confidentiality"],
  },
  {
    number: "03",
    title: "Real-Time Command",
    description: "A dedicated operations coordinator manages live tracking, communicates with the motorcade, and handles emergencies instantly.",
    points: ["Live GPS fleet tracking", "Direct comms channel", "On-call contingency team"],
  },
];

const FLEET_HIGHLIGHTS = [
  {
    name: "Rolls-Royce Ghost",
    desc: "The pinnacle of luxury — reserved for heads of state and A-list guests.",
    img: "/Mann car pictures/Rolls royce/ChatGPT Image May 1, 2026, 01_10_24 PM.png",
  },
  {
    name: "Mercedes-Benz S-Class",
    desc: "Protocol-approved executive sedan — discretion, comfort, and performance.",
    img: "/Mann car pictures/Mercedes-Benz S-Class/ChatGPT Image Apr 29, 2026, 11_07_15 PM.png",
  },
  {
    name: "BMW 7 Series",
    desc: "Armour-ready executive flagship preferred by diplomatic missions.",
    img: "/Mann car pictures/BMW 7 Series/ChatGPT Image Apr 28, 2026, 08_35_37 PM.png",
  },
];

export default function GlobalLeadersCelebritiesPage() {
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

          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>VIP Security Fleet</span>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem" }}>
            <div style={{ flex: "1 1 400px" }}>
              <h1 className="font-serif" style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 400, lineHeight: 1.05, color: "var(--text-primary)", margin: "0 0 1.25rem", letterSpacing: "0.01em" }}>
                Global Leaders &amp; Celebrities Visit
              </h1>
              <p className="font-sans" style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 520, margin: "0 0 2rem" }}>
                High-security, luxury fleet services for global leaders and celebrity visits. From advance route planning to real-time coordination, we ensure every movement is smooth, safe, and seamless.
              </p>
              <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
                Get a Quote <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="glass-card" style={{ padding: "2rem 2.5rem", borderRadius: "1.75rem", textAlign: "center", minWidth: 180, flexShrink: 0 }}>
              <p className="font-sans text-emboss" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1, margin: "0 0 0.5rem" }}>VIP</p>
              <p className="font-sans" style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, margin: 0 }}>security</p>
            </div>
          </div>
        </section>

        {/* ── Hero Image ── */}
        <section style={{ padding: "3rem clamp(1.25rem, 5vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ borderRadius: "2rem", overflow: "hidden", height: "clamp(220px, 40vw, 500px)", border: "1px solid var(--border-subtle)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/serviceimages/PHOTO-2026-05-28-12-00-51.jpg" alt="Global Leaders & Celebrities Visit"
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

        {/* ── Security Protocol ── */}
        <section style={{ padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Our protocol</span>
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 400, color: "var(--text-primary)", margin: "0 0 0.5rem", letterSpacing: "0.01em" }}>
            Three layers of assurance.
          </h2>
          <p className="font-sans" style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "0 0 2rem", lineHeight: 1.6, maxWidth: 480 }}>
            Every VIP movement goes through a structured three-phase security framework — no exceptions.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1.25rem" }}>
            {PROTOCOLS.map((p) => (
              <div key={p.number} className="glass-card" style={{ padding: "1.75rem", borderRadius: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <span className="font-sans" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", color: "var(--accent)", textTransform: "uppercase" }}>{p.number}</span>
                  <div style={{ height: 1, flex: 1, background: "var(--border-subtle)" }} />
                </div>
                <h3 className="font-sans" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.6rem" }}>{p.title}</h3>
                <p className="font-sans" style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>{p.description}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {p.points.map((pt) => (
                    <li key={pt} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                      <span className="font-sans" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Fleet Highlights ── */}
        <section style={{ padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)" }}>VIP fleet</span>
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 400, color: "var(--text-primary)", margin: "0 0 2rem", letterSpacing: "0.01em" }}>
            Vehicles fit for heads of state.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1rem" }}>
            {FLEET_HIGHLIGHTS.map((v) => (
              <div key={v.name} className="glass-card" style={{ borderRadius: "1.25rem", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                <div style={{ aspectRatio: "16 / 9", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.img} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "1rem 1.25rem" }}>
                  <h3 className="font-sans" style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.35rem" }}>{v.name}</h3>
                  <p className="font-sans" style={{ fontSize: "0.78rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{v.desc}</p>
                </div>
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
