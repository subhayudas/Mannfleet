"use client";

import { useState } from "react";
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
    issuer: "Ministry of Tourism, Government of India",
    pdf: "/awards/National Tourism Award_2016-17.pdf",
    image: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_37_26%20PM(govenment).png",
    highlight: true,
  },
  {
    title: "National Tourism Award",
    year: "2017–2018",
    issuer: "Ministry of Tourism, Government of India",
    pdf: "/awards/National Tourism Award_2017-18.pdf",
    image: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_37_05%20PM(govenment).png",
    highlight: true,
  },
  {
    title: "National Tourism Award",
    year: "2018–2019",
    issuer: "Ministry of Tourism, Government of India",
    pdf: "/awards/National Tourism Award_2018-19.pdf",
    image: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_44_22%20PM.png",
    highlight: true,
  },
  {
    title: "Zee Business Award – Best Private Transport Service Provider",
    year: "2019",
    issuer: "Zee TV",
    pdf: "/awards/Award_Zee Business.pdf",
    image: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_44_26%20PM.png",
    highlight: false,
  },
  {
    title: "TV Leaders of Road Transport",
    year: "2022",
    issuer: "TV9 Network",
    pdf: "/awards/Award_TV 9 Network.pdf",
    image: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_37_09%20PM.png",
    highlight: false,
  },
  {
    title: "Travel Enablers – Luxury Car Rentals",
    year: "—",
    issuer: "VFS Global Times Travel Awards",
    pdf: "/awards/Award_Times Travel.pdf",
    image: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_44_32%20PM.png",
    highlight: false,
  },
  {
    title: "Global Tourism Awards",
    year: "—",
    issuer: "—",
    pdf: "/awards/Global Tourism Awards.pdf",
    image: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_44_40%20PM.png",
    highlight: false,
  },
];

const FEATURED_PAIR = {
  gst: { label: "GST Department Appreciation", file: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_36_37%20PM(govenment).png", pdf: "/awards/Appreciation_GST Department.pdf" },
  tamarind: { label: "Tamarind Global Appreciation", file: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_36_59%20PM.png", pdf: "/Appreciation/Appreciation_Tamarind Global.pdf" },
};

const APPRECIATIONS = [
  { label: "PHDCCI — Spiritual Tourism Conclave", file: "/Appreciation/Appreciation_Mann%20Fleet%20Partners.jpg", pdf: "/Appreciation/Appreciation_Letter_Mann Fleet Partners.pdf" },
  { label: "G20 Event Appreciation", file: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_44_18%20PM.png", pdf: "/Appreciation/Appreciation_G20 Event.pdf" },
  { label: "US Embassy Appreciation", file: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_37_48%20PM.png", pdf: "/Appreciation/Appreciation_Embassy_USA.pdf" },
  { label: "Joe Biden — Vice President, USA", file: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_37_53%20PM.png", pdf: "/Appreciation/Appreciation_Joe Biden_Vice President_USA.pdf" },
  { label: "US Mission Token of Appreciation", file: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_50_56%20PM.png", pdf: "/Appreciation/Token_Appreciation_US Mission.pdf" },
  { label: "IATA Accreditation", file: "/Appreciation/Appreciation Letter_IATA.jpg", pdf: "/Appreciation/Appreciation Letter_IATA.pdf" },
  { label: "Reliance Appreciation", file: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_36_40%20PM.png", pdf: "/Appreciation/Appreciation_Reliance.pdf" },
  { label: "Pernod Ricard Appreciation", file: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_36_53%20PM.png", pdf: "/Appreciation/Appreciation_Pernord Ricard.pdf" },
  { label: "AFC Women's Cup Appreciation", file: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_36_56%20PM.png", pdf: "/Appreciation/Appreciation_AFC_Women Cup.pdf" },
  { label: "JCB Appreciation", file: "/Mann%20awards%20images%20edited/ChatGPT%20Image%20May%204%2C%202026%2C%2007_37_02%20PM.png", pdf: "/Appreciation/Appreciation_JCB.pdf" },
];

const TESTIMONIALS = [
  {
    quote: "Thank you for the excellent support during our recent corporate event at Coca-Cola. The logistics were handled seamlessly, and the team’s professionalism, flexibility, and approachable attitude made the entire experience very smooth. We truly appreciate how everything was managed, including last-minute changes, ensuring everything went as planned.",
    author: "Coca-Cola Logistics Team",
  },
  {
    quote: "We sincerely appreciate the excellent service and outstanding support provided by your entire team for our recent vehicle requirements from Delhi to Agra. We are particularly grateful for the promptness and efficiency with which our requests were handled, from the initial quotation to the final invoice and vehicle details. The vehicles were well-maintained, and the drivers were professional and punctual.",
    author: "Rahul Tyagi",
  },
  {
    quote: "I just wanted to send a delayed thank you to you and your team for all your hard work on the performer transfers in Jaipur last week. Everything went really smoothly – all the performers were grateful for the efficiency. We look forward to working with you again in the future.",
    author: "Caroline, Just Add Water",
  },
  {
    quote: "I would like to extend my appreciation for the last booking handled by Mann and for the support in accommodating changes effortlessly, while also keeping cost-effectiveness in mind. The efforts have not gone unnoticed — very positive feedback and appreciation has been shared for the vendor relationship. We are truly glad to have you on board.",
    author: "Ashima, Five Below",
  },
  {
    quote: "I would like to appreciate the entire Mann team for their well-coordinated management on the event day. All vehicles reported timely, and everything went seamless. The team was available on time throughout. Please extend our congratulations to everyone involved, from bookings to operations.",
    author: "Jaspreet Singh, IndiGo",
  },
  {
    quote: "My group had a fantastic time on our ‘Discover India Experience’ and the team was exceptional. Everyone enjoyed the ‘Jet on Wheels’ experience and was extremely impressed with the driving skills and overall service. We are looking forward to our return with our next group and to working together again.",
    author: "Nico and Belinda Moretti",
  },
  {
    quote: "Mann’s prompt service, well-maintained vehicles, and professional drivers contributed significantly to the smooth and successful execution of the visit. We greatly appreciate Mann’s commitment to excellence and reliability, and the hard work and dedication of the entire team did not go unnoticed.",
    author: "Jorgan Andrews, Chargé d’Affaires, a.i.",
  },
  {
    quote: "We would like to express our sincere appreciation for the warm hospitality extended to our guests, participating teams, match officials, and delegation during the recently concluded competition. The team’s commitment to ensuring discipline within the bubble module, along with the significant and undivided efforts rendered across cities, is highly commendable.",
    author: "Datuk Seri Windsor John, General Secretary AFC WOMENS' ASIAN CUP",
  },
  {
    quote: "A huge thank you for all your support for the JCB Top 80 event. The entire operation has been flawless — the team was highly professional, supportive, and responsive to all requests. The coaches and drivers were exceptional, and everything ran smoothly for our delegates. Special mention to the airport transfer team — having personnel ready to receive guests was really reassuring.",
    author: "Alice Taylor, Senior Event Manager, JCB Worldwide Events",
  },
];

export default function AwardsPage() {
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

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
            Awards and<br />
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
            {AWARDS.map(({ title, year, issuer, image, highlight }) => (
              <button
                key={title + year}
                onClick={() => setLightbox({ src: image, label: `${title}${year !== "—" ? ` — ${year}` : ""}` })}
                className="glass-card"
                style={{
                  padding: 0,
                  borderRadius: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  textDecoration: "none",
                  cursor: "pointer",
                  background: "none",
                  textAlign: "left",
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
                {/* Award image */}
                <div style={{
                  height: 220,
                  background: "var(--bg-deep)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={title}
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: "0.75rem" }}
                  />
                </div>

                {/* Award details */}
                <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "10px",
                      background: highlight
                        ? "linear-gradient(135deg, rgba(200,40,40,0.18) 0%, rgba(200,40,40,0.06) 100%)"
                        : "var(--glass-mid)",
                      border: `1px solid ${highlight ? "rgba(200,40,40,0.28)" : "var(--border-subtle)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: highlight ? "var(--accent)" : "var(--text-secondary)",
                      flexShrink: 0,
                    }}>
                      {highlight ? <IconStar size={16} /> : <IconTrophy size={16} />}
                    </div>
                    <span className="font-sans" style={{
                      fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "var(--text-muted)",
                      padding: "0.2rem 0.6rem", borderRadius: 9999,
                      background: "var(--glass-mid)", border: "1px solid var(--border-subtle)",
                    }}>
                      View
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans" style={{
                      fontSize: "0.9rem", fontWeight: 700,
                      color: "var(--text-primary)", margin: "0 0 0.3rem",
                      lineHeight: 1.4,
                    }}>
                      {title}
                    </h3>
                    {issuer !== "—" && (
                      <p className="font-sans" style={{ fontSize: "0.73rem", color: "var(--text-muted)", margin: "0 0 0.2rem", lineHeight: 1.5 }}>
                        {issuer}
                      </p>
                    )}
                    {year !== "—" && (
                      <p className="font-sans" style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)", margin: 0 }}>
                        {year}
                      </p>
                    )}
                  </div>
                </div>
              </button>
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

          {/* Featured bento: GST + Tamarind */}
          <div
            className="featured-appreciation-bento"
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: "1rem",
              marginBottom: "1.25rem",
              minHeight: "clamp(320px, 50vw, 520px)",
            }}
          >
            {/* Left column: GST stacked (top large, bottom narrow band) */}
            <div style={{ display: "grid", gridTemplateRows: "1.6fr 1fr", gap: "1rem" }}>
              <button
                onClick={() => setLightbox({ src: FEATURED_PAIR.gst.file, label: FEATURED_PAIR.gst.label })}
                className="glass-card"
                style={{
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "none",
                  border: "1px solid var(--border-subtle)",
                  padding: 0,
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.18s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,40,40,0.30)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
              >
                <div style={{ flex: 1, overflow: "hidden", background: "var(--bg-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={FEATURED_PAIR.gst.file} alt={FEATURED_PAIR.gst.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "0.85rem 1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className="font-sans" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", flex: 1 }}>
                    {FEATURED_PAIR.gst.label}
                  </span>
                  <a href={FEATURED_PAIR.gst.pdf} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.25rem 0.6rem", borderRadius: 6, background: "var(--glass-mid)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", flexShrink: 0 }}>VIEW PDF</a>
                </div>
              </button>
              <div
                className="glass-card"
                style={{
                  borderRadius: "1.25rem",
                  padding: "1.1rem 1.4rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "0.4rem",
                  border: "1px solid var(--border-subtle)",
                  background: "linear-gradient(135deg, rgba(200,40,40,0.10) 0%, rgba(200,40,40,0.02) 100%)",
                }}
              >
                <span className="font-sans" style={{
                  fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em",
                  textTransform: "uppercase", color: "var(--accent)",
                }}>Featured Recognition</span>
                <p className="font-sans" style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                  Trusted by government bodies and global travel houses for seamless, large-scale operations.
                </p>
              </div>
            </div>

            {/* Right column: Tamarind tall */}
            <button
              onClick={() => setLightbox({ src: FEATURED_PAIR.tamarind.file, label: FEATURED_PAIR.tamarind.label })}
              className="glass-card"
              style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                cursor: "pointer",
                background: "none",
                border: "1px solid var(--border-subtle)",
                padding: 0,
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.18s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,40,40,0.30)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
            >
              <div style={{ flex: 1, overflow: "hidden", background: "var(--bg-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FEATURED_PAIR.tamarind.file} alt={FEATURED_PAIR.tamarind.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "0.85rem 1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="font-sans" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", flex: 1 }}>
                  {FEATURED_PAIR.tamarind.label}
                </span>
                <a href={FEATURED_PAIR.tamarind.pdf} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.25rem 0.6rem", borderRadius: 6, background: "var(--glass-mid)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", flexShrink: 0 }}>VIEW PDF</a>
              </div>
            </button>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
            gap: "1rem",
          }}>
            {APPRECIATIONS.map(({ label, file, pdf }) => (
              <div
                key={label}
                className="glass-card"
                style={{
                  borderRadius: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  border: "1px solid var(--border-subtle)",
                  transition: "border-color 0.18s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,40,40,0.30)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = ""; }}
              >
                <button
                  onClick={() => setLightbox({ src: file, label })}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
                >
                  <div style={{ overflow: "hidden", background: "var(--bg-deep)", flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={file} alt={label} style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                </button>
                <div style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className="font-sans" style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4, flex: 1 }}>
                    {label}
                  </span>
                  {pdf && (
                    <a
                      href={pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.3rem",
                        padding: "0.25rem 0.6rem",
                        borderRadius: 6,
                        background: "var(--glass-mid)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      VIEW PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section style={{
          padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{
              fontSize: "1.1rem", fontWeight: 800, letterSpacing: "0.04em",
              textTransform: "uppercase", color: "var(--text-primary)",
            }}>Client Testimonials</span>
          </div>

          <div style={{
            columnCount: "3",
            columnGap: "1.5rem",
            maxWidth: 1240,
            margin: "0 auto",
          }} className="testimonials-masonry">
            {TESTIMONIALS.map(({ quote, author }, idx) => (
              <div
                key={idx}
                style={{
                  breakInside: "avoid",
                  marginBottom: "1.5rem",
                  padding: "2rem",
                  borderRadius: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: "1rem", right: "1.5rem", opacity: 0.08, pointerEvents: "none", color: "#222" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="font-sans" style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                  position: "relative",
                }}>
                  {quote}
                </p>
                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem" }}>
                  <p className="font-sans" style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    margin: 0,
                  }}>
                    {author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.88)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "2rem",
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute", top: "1.25rem", right: "1.5rem",
              background: "rgba(255,255,255,0.12)", border: "none",
              color: "white", borderRadius: "50%",
              width: 36, height: 36, fontSize: "1.1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.label}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "min(90vw, 900px)",
              maxHeight: "82vh",
              objectFit: "contain",
              borderRadius: "0.75rem",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}
          />
          <p style={{
            marginTop: "1rem", color: "rgba(255,255,255,0.7)",
            fontSize: "0.85rem", fontWeight: 500, textAlign: "center",
          }}>{lightbox.label}</p>
        </div>
      )}
    </div>
  );
}
