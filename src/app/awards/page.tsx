"use client";

import Image from "next/image";
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

function IconTrophy({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4H4a2 2 0 0 0-2 2v1c0 3.31 2.69 6 6 6" />
      <path d="M17 4h3a2 2 0 0 1 2 2v1c0 3.31-2.69 6-6 6" />
      <path d="M12 17c-3.87 0-7-3.13-7-7V4h14v6c0 3.87-3.13 7-7 7z" />
    </svg>
  );
}

function IconStar({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const AWARDS = [
  {
    title: "National Tourism Award",
    year: "2016–2017",
    issuer: "Ministry of Tourism, Govt. of India",
    pdf: "/awards/National Tourism Award_2016-17.pdf",
    highlight: true,
  },
  {
    title: "National Tourism Award",
    year: "2017–2018",
    issuer: "Ministry of Tourism, Govt. of India",
    pdf: "/awards/National Tourism Award_2017-18.pdf",
    highlight: true,
  },
  {
    title: "National Tourism Award",
    year: "2018–2019",
    issuer: "Ministry of Tourism, Govt. of India",
    pdf: "/awards/National Tourism Award_2018-19.pdf",
    highlight: true,
  },
  {
    title: "Zee Business Award – Best Private Transport Service Provider",
    year: "2019",
    issuer: "Zee TV",
    pdf: "/awards/Award_Maruti Suzuki.pdf",
    highlight: false,
  },
  {
    title: "TV Leaders of Road Transport",
    year: "2022",
    issuer: "TV 9 Network",
    pdf: "/awards/Award_TV 9 Network.pdf",
    highlight: false,
  },
  {
    title: "Travel Enablers – Luxury Car Rentals",
    year: "—",
    issuer: "VFS Global Times Travel Awards",
    pdf: "/awards/Award_Times Travel.pdf",
    highlight: false,
  },
  {
    title: "Global Tourism Awards",
    year: "—",
    issuer: "—",
    pdf: "/awards/Global Tourism Awards.pdf",
    highlight: false,
  },
];

const APPRECIATIONS = [
  { label: "IATA Accreditation", file: "/Appreciation/Appreciation Letter_IATA.jpg", isImage: true },
  { label: "US Embassy Appreciation", file: "/awards/Appreciation_Embassy_USA.pdf", isImage: false },
  { label: "Joe Biden — Vice President, USA", file: "/awards/Appreciation_Joe Biden_Vice President_USA.pdf", isImage: false },
  { label: "US Mission Token of Appreciation", file: "/awards/Token_Appreciation_US Mission.pdf", isImage: false },
  { label: "G20 Event Appreciation", file: "/Appreciation/Appreciation_G20 Event.pdf", isImage: false },
  { label: "Coca-Cola Appreciation", file: "/Appreciation/Appreciation_Coca Cola.pdf", isImage: false },
  { label: "IBM Board Appreciation", file: "/Appreciation/Appreciation_IBM_BOD.pdf", isImage: false },
  { label: "Reliance Appreciation", file: "/Appreciation/Appreciation_Reliance.pdf", isImage: false },
  { label: "Indigo Airlines Appreciation", file: "/Appreciation/Appreciation_Indigo Airlines.pdf", isImage: false },
  { label: "AFC Women's Cup Appreciation", file: "/Appreciation/Appreciation_AFC_Women Cup.pdf", isImage: false },
  { label: "Kabaddi World Cup Appreciation", file: "/Appreciation/Appreciation_World Cup_Kabaddi.pdf", isImage: false },
  { label: "JCB Appreciation", file: "/Appreciation/Appreciation_JCB.pdf", isImage: false },
];

export default function AwardsPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      <main>
        {/* ── Hero Header ── */}
        <section style={{
          padding: "clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>Recognition</span>
          <h1 className="font-serif" style={{
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: "var(--text-primary)",
            margin: "0 0 1.25rem",
            letterSpacing: "0.01em",
          }}>
            Awards &amp;<br />
            <span className="italic" style={{ color: "var(--text-secondary)" }}>Accolades</span>
          </h1>
          <p className="font-sans" style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            maxWidth: 520,
            margin: 0,
          }}>
            Recognised by governments, global institutions, and industry leaders across four decades of excellence.
          </p>
        </section>

        {/* ── Award Ceremony Photos ── */}
        <section style={{
          padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(2.5rem, 5vw, 4rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "var(--text-muted)",
            }}>Award Ceremonies</span>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "1.25rem",
          }}>
            {[
              { src: "/awards/PHOTO-2026-04-18-17-36-06.jpg", caption: "National Tourism Award Ceremony" },
              { src: "/awards/PHOTO-2026-04-18-17-36-06 2.jpg", caption: "Recognition at Govt. of India" },
            ].map(({ src, caption }) => (
              <div key={caption} style={{
                position: "relative",
                borderRadius: "1.5rem",
                overflow: "hidden",
                border: "1px solid var(--border-mid)",
                height: 300,
                boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
              }}>
                <Image src={src} alt={caption} fill unoptimized style={{ objectFit: "cover" }} />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "2rem 1.5rem 1.25rem",
                  background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
                }}>
                  <span className="font-sans" style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>
                    {caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Awards Grid ── */}
        <section style={{
          padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "var(--text-muted)",
            }}>Awards Received</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1.25rem",
          }}>
            {AWARDS.map(({ title, year, issuer, pdf, highlight }) => (
              <a
                key={title + year}
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card"
                style={{
                  padding: "1.75rem",
                  borderRadius: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,40,40,0.35)";
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(200,40,40,0.20), 0 8px 24px rgba(0,0,0,0.22)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "12px",
                    background: highlight
                      ? "linear-gradient(135deg, rgba(200,40,40,0.18) 0%, rgba(200,40,40,0.06) 100%)"
                      : "var(--glass-mid)",
                    border: `1px solid ${highlight ? "rgba(200,40,40,0.28)" : "var(--border-subtle)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: highlight ? "var(--accent)" : "var(--text-secondary)",
                    flexShrink: 0,
                  }}>
                    {highlight ? <IconStar size={20} /> : <IconTrophy size={20} />}
                  </div>
                  <span className="font-sans" style={{
                    fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "var(--text-muted)",
                    padding: "0.2rem 0.6rem", borderRadius: 9999,
                    background: "var(--glass-mid)", border: "1px solid var(--border-subtle)",
                  }}>
                    View PDF
                  </span>
                </div>

                <div>
                  <h3 className="font-sans" style={{
                    fontSize: "0.92rem", fontWeight: 700,
                    color: "var(--text-primary)", margin: "0 0 0.35rem",
                    lineHeight: 1.4,
                  }}>
                    {title}
                  </h3>
                  {issuer !== "—" && (
                    <p className="font-sans" style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0 0 0.2rem", lineHeight: 1.5 }}>
                      {issuer}
                    </p>
                  )}
                  {year !== "—" && (
                    <p className="font-sans" style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)", margin: 0 }}>
                      {year}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Appreciations ── */}
        <section style={{
          padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--text-muted)", opacity: 0.5, borderRadius: 2 }} />
            <span className="font-sans" style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "var(--text-muted)",
            }}>Letters of Appreciation</span>
          </div>

          {/* IATA image card */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
            gap: "1rem",
          }}>
            {APPRECIATIONS.map(({ label, file, isImage }) =>
              isImage ? (
                <div key={label} style={{
                  position: "relative",
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  border: "1px solid var(--border-mid)",
                  height: 200,
                  cursor: "pointer",
                }}
                  onClick={() => window.open(file, "_blank")}
                >
                  <Image src={file} alt={label} fill unoptimized style={{ objectFit: "cover" }} />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "1.5rem 1rem 0.75rem",
                    background: "linear-gradient(to top, rgba(0,0,0,0.68) 0%, transparent 100%)",
                  }}>
                    <span className="font-sans" style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.90)" }}>
                      {label}
                    </span>
                  </div>
                </div>
              ) : (
                <a
                  key={label}
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card"
                  style={{
                    padding: "1.25rem",
                    borderRadius: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    textDecoration: "none",
                    transition: "border-color 0.18s ease",
                    minHeight: 80,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,40,40,0.30)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: "9px", flexShrink: 0,
                    background: "var(--glass-mid)", border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-secondary)",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <span className="font-sans" style={{ fontSize: "0.80rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4, flex: 1 }}>
                    {label}
                  </span>
                  <span style={{ color: "var(--text-40)", flexShrink: 0 }}><ArrowUpRight size={12} /></span>
                </a>
              )
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
