"use client";

/* ─────────────────────────────────────────────────────────────
   BentoSection — Why MANN / 6 USP cards
───────────────────────────────────────────────────────────────*/

const USPS = [
  {
    title: "40 Years of Experience",
    body: "Four decades of excellence in luxury passenger transport across India and internationally.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "IATA Accredited",
    body: "One of India's few IATA-accredited ground transport providers, trusted by aviation and travel professionals worldwide.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "200+ Premium Vehicles",
    body: "A diverse fleet of luxury sedans, SUVs, coaches, and specialty vehicles — all chauffeur-ready and professionally maintained.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "24 / 7 Support",
    body: "Round-the-clock support for bookings, changes, and urgent requests — real agents, always available.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    title: "Fortune 500 Clients",
    body: "Serving the world's most demanding corporations, embassies, and government delegations since 1986.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "National Award Winners",
    body: "Awarded the National Tourism Award by the Government of India for three consecutive years — 2016–17, 2017–18, and 2018–19.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
];

function USPCard({ usp }: { usp: (typeof USPS)[0] }) {
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 20,
        padding: "36px 32px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--accent)", borderRadius: "20px 20px 0 0" }} />

      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "rgba(220,38,38,0.10)",
          border: "1px solid rgba(220,38,38,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
          flexShrink: 0,
        }}
      >
        {usp.icon}
      </div>

      <div>
        <h3
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.25,
            marginBottom: 10,
          }}
        >
          {usp.title}
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
          {usp.body}
        </p>
      </div>
    </div>
  );
}

export default function BentoSection() {
  return (
    <>
      <section
        className="scene-bg px-8 lg:px-16 pb-20 pt-16"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ marginBottom: 40 }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.22rem 0.9rem",
              borderRadius: 9999,
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              background: "var(--map-badge-bg)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.60)",
              marginBottom: 12,
            }}
          >
            Why MANN
          </span>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Our USPs
          </h2>
        </div>

        <div className="usp-grid">
          {USPS.map((usp) => (
            <USPCard key={usp.title} usp={usp} />
          ))}
        </div>
      </section>

      <style>{`
        .usp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .usp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .usp-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
