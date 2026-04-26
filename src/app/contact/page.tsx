"use client";

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

const CONTACT_ITEMS = [
  {
    icon: <IconMapPin size={22} />,
    label: "Address",
    lines: ["A-34, Okhla Industrial Area", "Phase I, New Delhi - 110020", "India"],
  },
  {
    icon: <IconMail size={22} />,
    label: "Email",
    lines: ["info@manntours.com"],
    href: "mailto:info@manntours.com",
  },
];

const PHONE_NUMBERS = [
  { label: "Main Office", number: "011-47202122", href: "tel:+911147202122" },
  { label: "Mobile 1", number: "+91 9990222999", href: "tel:+919990222999" },
  { label: "Mobile 2", number: "+91 9891667788", href: "tel:+919891667788" },
  { label: "Mobile 3", number: "+91 9990234567", href: "tel:+919990234567" },
];

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
          <p className="font-sans" style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            maxWidth: 480,
            margin: 0,
          }}>
            Our team is available around the clock. Reach out for bookings, fleet enquiries, or corporate partnerships.
          </p>
        </div>

        {/* ── Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "1.5rem",
        }}>

          {/* ── Phone Numbers card ── */}
          <div className="glass-panel" style={{
            padding: "2rem",
            borderRadius: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "12px",
                background: "var(--glass-mid)",
                border: "1px solid var(--border-subtle)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-primary)",
                boxShadow: "inset 0 1px 0 var(--inner-light)",
              }}>
                <IconPhone size={20} />
              </div>
              <span className="font-sans" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                Phone Numbers
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {PHONE_NUMBERS.map(({ label, number, href }) => (
                <a key={label} href={href} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.9rem 1.1rem",
                  borderRadius: "0.85rem",
                  background: "var(--glass-ultra)",
                  border: "1px solid var(--border-subtle)",
                  textDecoration: "none",
                  transition: "border-color 0.18s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,40,40,0.30)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
                >
                  <div>
                    <p className="font-sans" style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 0.2rem" }}>
                      {label}
                    </p>
                    <p className="font-sans" style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
                      {number}
                    </p>
                  </div>
                  <span style={{ color: "var(--text-40)" }}><ArrowUpRight size={13} /></span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Address & Email card ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {CONTACT_ITEMS.map(({ icon, label, lines, href }) => (
              <div key={label} className="glass-panel" style={{ padding: "1.75rem", borderRadius: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "12px",
                    background: "var(--glass-mid)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-primary)",
                  }}>
                    {icon}
                  </div>
                  <span className="font-sans" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                    {label}
                  </span>
                </div>
                {href ? (
                  <a href={href} className="font-sans" style={{
                    fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)",
                    textDecoration: "none", display: "block", lineHeight: 1.6,
                  }}>
                    {lines[0]}
                  </a>
                ) : (
                  <address style={{ fontStyle: "normal" }}>
                    {lines.map((l) => (
                      <p key={l} className="font-sans" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                        {l}
                      </p>
                    ))}
                  </address>
                )}
              </div>
            ))}

            {/* ── WhatsApp CTA ── */}
            <a
              href="https://wa.me/919990222999"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1.25rem 1.5rem",
                borderRadius: "1.5rem",
                background: "rgba(37,211,102,0.10)",
                border: "1px solid rgba(37,211,102,0.28)",
                textDecoration: "none",
                transition: "background 0.18s ease, border-color 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(37,211,102,0.16)";
                e.currentTarget.style.borderColor = "rgba(37,211,102,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(37,211,102,0.10)";
                e.currentTarget.style.borderColor = "rgba(37,211,102,0.28)";
              }}
            >
              <span style={{ color: "#25D366" }}><IconWhatsApp size={24} /></span>
              <div style={{ flex: 1 }}>
                <p className="font-sans" style={{ fontSize: "0.78rem", fontWeight: 700, color: "#25D366", margin: "0 0 0.15rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  WhatsApp
                </p>
                <p className="font-sans" style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
                  Chat with us instantly
                </p>
              </div>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* ── Hours & Quick Note card ── */}
          <div className="glass-panel" style={{
            padding: "2rem",
            borderRadius: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "2rem",
          }}>
            <div>
              <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>Availability</span>
              <h3 className="font-serif" style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.15,
                margin: "0 0 0.75rem",
              }}>
                24 / 7<br />
                <span className="italic" style={{ color: "var(--text-secondary)", fontSize: "0.75em" }}>Always Available</span>
              </h3>
              <p className="font-sans" style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                Our operations team is available around the clock — for bookings, changes, or urgent requests.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                "Instant booking confirmation",
                "Dedicated account managers for corporates",
                "IATA approved & accredited",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--accent)",
                    flexShrink: 0, marginTop: "0.45rem",
                  }} />
                  <span className="font-sans" style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
