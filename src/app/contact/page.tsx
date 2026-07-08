"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndiaMap from "@/components/IndiaMap";
import Link from "next/link";

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

function IconPhone({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.44 2 2 0 0 1 3.56 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.71a16 16 0 0 0 6 6l.91-1.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 15z" />
    </svg>
  );
}

function IconMail({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconMapPin({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconWhatsApp({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function IconLink({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

const BRANCH_CONTACTS = [
  {
    name: "Amarjeet Mann",
    designation: "President-Marketing",
    phone: "+91-9990222888",
    email: "amarjeet@manntours.com",
    photo: "/teams/PHOTO-2026-04-20-18-02-49.jpg",
  },
  {
    name: "Jagdeep Singh Mann",
    designation: "President-Sales",
    phone: "+91-9540222888",
    email: "jagdeep@manntours.com",
    photo: "/teams/PHOTO-2026-04-20-18-02-49 2.jpg",
  },
  {
    name: "Ashwani Kumar",
    designation: "Asst. Manager — Sales",
    phone: "+91-9891398914",
    email: "ashwani@manntours.com",
    photo: "/teams/Mr.%20Ashwani%20Kumar%20Picture.png",
  },
];

function IconBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <div style={{
        width: 40, height: 40, borderRadius: "10px",
        background: "var(--glass-mid)",
        border: "1px solid var(--border-subtle)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--text-primary)",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <span className="font-sans" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
        {label}
      </span>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ padding: "clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem)", maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>Get in Touch</span>
          <h1 className="font-serif" style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: "var(--text-primary)",
            margin: "0 0 1rem",
            letterSpacing: "0.01em",
          }}>
            Contact<br />
            <span className="italic" style={{ color: "var(--text-secondary)" }}>Mann Fleet Partners</span>
          </h1>
          <p className="font-sans" style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
            Our team is available around the clock. Reach out for bookings, fleet enquiries, or corporate partnerships.
          </p>
        </div>

        {/* ── Registered Office + Call Us ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "1.5rem",
          marginBottom: "1.5rem",
        }}>

          {/* Registered Office */}
          <div className="glass-panel" style={{ padding: "2rem", borderRadius: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <IconBtn icon={<IconMapPin size={18} />} label="Registered Office" />

            <div>
              <p className="font-sans" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.3rem" }}>
                Mann Fleet Partners Limited
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", marginBottom: "0.85rem" }}>
                <span className="font-sans" style={{ fontSize: "0.73rem", color: "var(--text-muted)" }}>GST: 07AAACM500C1ZF</span>
                <span className="font-sans" style={{ fontSize: "0.73rem", color: "var(--text-muted)" }}>CIN: U50401DL1992PLC049876</span>
              </div>
              <address style={{ fontStyle: "normal" }}>
                {["A-34, Okhla Industrial Area", "Phase I, New Delhi — 110020", "India"].map((l) => (
                  <p key={l} className="font-sans" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>{l}</p>
                ))}
              </address>
            </div>

            <a
              href="https://maps.google.com/?q=A-34+Okhla+Industrial+Area+Phase+1+New+Delhi+110020"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.7rem 1.25rem",
                borderRadius: "9999px",
                background: "var(--glass-mid)",
                border: "1px solid var(--border-mid)",
                color: "var(--text-primary)",
                fontSize: "0.82rem",
                fontWeight: 600,
                textDecoration: "none",
                width: "fit-content",
                transition: "border-color 0.18s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,40,40,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
            >
              <IconMapPin size={14} />
              Open in Maps
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Call Us */}
          <div className="glass-panel" style={{ padding: "2rem", borderRadius: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <IconBtn icon={<IconPhone size={18} />} label="Call Us" />
              <span className="glass-badge">24 × 7</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { sub: "Telephone", number: "+91 11 46202122", href: "tel:+911146202122" },
                { sub: "Telephone", number: "+91 11 47202122", href: "tel:+911147202122" },
                { sub: "Mobile", number: "+91 9990222999", href: "tel:+919990222999" },
                { sub: "Mobile", number: "+91 9891919292", href: "tel:+919891919292" },
              ].map(({ sub, number, href }) => (
                <a key={number} href={href} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0.75rem 1rem", borderRadius: "0.85rem",
                  background: "var(--glass-ultra)", border: "1px solid var(--border-subtle)",
                  textDecoration: "none", transition: "border-color 0.18s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,40,40,0.30)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
                >
                  <div>
                    <p className="font-sans" style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 0.15rem" }}>{sub}</p>
                    <p className="font-sans" style={{ fontSize: "0.93rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>{number}</p>
                  </div>
                  <span style={{ color: "var(--text-40)" }}><ArrowUpRight size={13} /></span>
                </a>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919810008008"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "1rem 1.25rem", borderRadius: "1rem",
                background: "rgba(37,211,102,0.10)", border: "1px solid rgba(37,211,102,0.28)",
                textDecoration: "none", transition: "background 0.18s ease, border-color 0.18s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.16)"; e.currentTarget.style.borderColor = "rgba(37,211,102,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.10)"; e.currentTarget.style.borderColor = "rgba(37,211,102,0.28)"; }}
            >
              <span style={{ color: "#25D366" }}><IconWhatsApp size={22} /></span>
              <div style={{ flex: 1 }}>
                <p className="font-sans" style={{ fontSize: "0.72rem", fontWeight: 700, color: "#25D366", margin: "0 0 0.1rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>WhatsApp — Quick Link</p>
                <p className="font-sans" style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>+91 9810008008</p>
              </div>
              <ArrowUpRight size={13} />
            </a>

            {/* Emails */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { addr: "info@mannfleetpartners.com" },
                { addr: "support@mannfleetpartners.com" },
              ].map(({ addr }) => (
                <a key={addr} href={`mailto:${addr}`} style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  padding: "0.65rem 1rem", borderRadius: "0.75rem",
                  background: "var(--glass-ultra)", border: "1px solid var(--border-subtle)",
                  textDecoration: "none", transition: "border-color 0.18s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,40,40,0.30)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
                >
                  <span style={{ color: "var(--text-secondary)", flexShrink: 0 }}><IconMail size={14} /></span>
                  <span className="font-sans" style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: 500 }}>{addr}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Branch Offices ── */}
        <section style={{ marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block" }}>Branch Offices</span>
            <h2 className="font-serif" style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.1,
              margin: "0 0 0.4rem",
            }}>
              Contact Our Team
            </h2>
            <p className="font-sans" style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
              Reach our sales team directly for bookings and corporate enquiries.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "1.25rem",
          }}>
            {BRANCH_CONTACTS.map(({ name, designation, phone, email, photo }) => (
              <div key={name} className="glass-panel" style={{
                padding: "1.75rem",
                borderRadius: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={name}
                    style={{
                      width: 64, height: 64, borderRadius: 16,
                      objectFit: "cover", objectPosition: "top",
                      border: "2px solid var(--border-mid)",
                      flexShrink: 0,
                    }}
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                    }}
                  />
                  <div>
                    <p className="font-sans" style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 0.2rem" }}>
                      {designation}
                    </p>
                    <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.05rem", color: "var(--text-primary)", margin: 0, lineHeight: 1.25 }}>
                      {name}
                    </h3>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <a href={`tel:${phone.replace(/-/g, "")}`} style={{
                    display: "flex", alignItems: "center", gap: "0.65rem",
                    padding: "0.65rem 1rem", borderRadius: "0.75rem",
                    background: "var(--glass-ultra)", border: "1px solid var(--border-subtle)",
                    textDecoration: "none", transition: "border-color 0.18s ease",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,40,40,0.30)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
                  >
                    <span style={{ color: "var(--text-secondary)", flexShrink: 0 }}><IconPhone size={14} /></span>
                    <span className="font-sans" style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text-primary)" }}>{phone}</span>
                  </a>
                  <a href={`mailto:${email}`} style={{
                    display: "flex", alignItems: "center", gap: "0.65rem",
                    padding: "0.65rem 1rem", borderRadius: "0.75rem",
                    background: "var(--glass-ultra)", border: "1px solid var(--border-subtle)",
                    textDecoration: "none", transition: "border-color 0.18s ease",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,40,40,0.30)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
                  >
                    <span style={{ color: "var(--text-secondary)", flexShrink: 0 }}><IconMail size={14} /></span>
                    <span className="font-sans" style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-primary)", wordBreak: "break-all" }}>{email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quick Links ── */}
        <section style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <span className="glass-badge" style={{ marginBottom: "0.6rem", display: "inline-block" }}>Quick Links</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link
              href="/reservation"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                padding: "0.9rem 1.75rem", borderRadius: "9999px",
                background: "var(--accent)", color: "#fff",
                fontSize: "0.88rem", fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(200,40,42,0.28)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,40,42,0.38)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,40,42,0.28)"; }}
            >
              Bookings for Cabs and Vehicles
              <ArrowUpRight size={14} />
            </Link>


          </div>
        </section>

        {/* ── India Office Map ── */}
        <div>
          <div style={{
            display: "flex", flexWrap: "wrap", alignItems: "flex-end",
            justifyContent: "space-between", gap: "1.25rem", marginBottom: "1.75rem",
          }}>
            <div>
              <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>Our Presence</span>
              <h2 className="font-serif" style={{
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 400,
                color: "var(--text-primary)", lineHeight: 1.05, margin: "0 0 0.6rem", letterSpacing: "0.01em",
              }}>
                Offices Across<br />
                <span className="italic" style={{ color: "var(--text-secondary)" }}>India</span>
              </h2>
              <p className="font-sans" style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, letterSpacing: "0.04em" }}>
                8 offices &nbsp;·&nbsp; 7 cities
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", maxWidth: 380 }}>
              {["New Delhi", "Noida", "Gurgaon", "Mumbai", "Ahmedabad", "Chennai", "Kolkata"].map((c) => (
                <span key={c} className="font-sans" style={{
                  display: "inline-block", padding: "0.25rem 0.8rem", borderRadius: "9999px",
                  fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                  color: "var(--text-secondary)", background: "var(--glass-ultra)", border: "1px solid var(--border-subtle)",
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div style={{
            borderRadius: "1.5rem", overflow: "hidden", padding: 0,
            border: "1px solid rgba(200,40,42,0.22)",
            boxShadow: "0 0 0 1px rgba(200,40,42,0.08), 0 20px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.14)",
          }}>
            <IndiaMap />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
