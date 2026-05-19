"use client";

import { useParams, notFound } from "next/navigation";
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

const SERVICE_DATA: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  stat: string;
  statLabel: string;
  image: string;
  imageObjectPosition?: string;
}> = {
  "long-term": {
    title: "Long-Term Rentals",
    subtitle: "Enterprise Fleet Solutions",
    description: "End-to-end vehicle rental solutions for institutional fleets and retail customers. Flexible contracts starting at 12 months with comprehensive maintenance and dedicated account management included.",
    features: [
      "Dedicated fleet management team",
      "12+ month flexible contracts",
      "Comprehensive maintenance and support",
      "Corporate billing and reporting",
      "Nationwide coverage across 80+ cities",
      "GST-compliant invoicing",
    ],
    stat: "12+ months",
    statLabel: "minimum contract",
    image: "/Mann car pictures/Mercedes-Benz E-Class/ChatGPT Image Apr 28, 2026, 06_32_56 PM.png",
    imageObjectPosition: "center 80%",
  },
  "spot": {
    title: "Spot Rentals",
    subtitle: "On-Demand Chauffeur Services",
    description: "On-demand chauffeur-driven services for corporates, airport transfers, and travel. Available 24/7 across 80+ cities with a fleet of premium, well-maintained vehicles and professional drivers.",
    features: [
      "Instant booking available",
      "Airport and hotel transfers",
      "Corporate travel management",
      "Pan-India coverage",
      "24/7 customer support",
      "Premium chauffeur-driven fleet",
    ],
    stat: "24/7",
    statLabel: "availability",
    image: "/Mann car pictures/Toyota fortuner/ChatGPT Image May 4, 2026, 12_35_18 PM.png",
  },
  "shuttle": {
    title: "Shuttle Service",
    subtitle: "Scheduled Mobility Solutions",
    description: "Scheduled, high-frequency shuttle operations connecting offices, campuses, and key city nodes. Reliable, GPS-tracked fleet ensuring employees reach their destinations safely and on time.",
    features: [
      "Fixed-route scheduling",
      "Real-time GPS tracking",
      "Employee transport solutions",
      "Campus and office connectivity",
      "80+ cities covered",
      "Safety-first operations",
    ],
    stat: "80+",
    statLabel: "cities covered",
    image: "/Mann car pictures/Force Urbania/ChatGPT Image Apr 30, 2026, 01_24_25 AM.png",
  },
  "self-drive": {
    title: "Self-Drive Leasing",
    subtitle: "Flexible Vehicle Leasing",
    description: "Flexible self-drive vehicle leasing options for individuals and professionals. Choose from 200+ vehicles across multiple categories — sedans, SUVs, and luxury cars — with zero maintenance hassle.",
    features: [
      "No driver required",
      "200+ vehicles available",
      "Short and long-term lease options",
      "Zero maintenance hassle",
      "Comprehensive insurance coverage",
      "Doorstep delivery available",
    ],
    stat: "200+",
    statLabel: "vehicles available",
    image: "/Mann car pictures/Toyota camry hybrid/toyota camry hybrid front.jpeg",
  },
  "event": {
    title: "Event Transportation",
    subtitle: "Bespoke Event Logistics",
    description: "Customised transport for weddings, conferences, delegations, and large-scale events. With 500+ events handled, our dedicated coordinators ensure flawless execution from planning to last-mile delivery.",
    features: [
      "Dedicated event coordinators",
      "Multi-vehicle fleet management",
      "VIP and delegation transfers",
      "Pan-India event logistics",
      "500+ events handled",
      "On-site coordination teams",
    ],
    stat: "500+",
    statLabel: "events handled",
    image: "/Mann car pictures/Vellfire/ChatGPT Image Apr 30, 2026, 07_39_48 PM.png",
  },
  "pan-india-mobility": {
    title: "Corporate's Pan India Mobility",
    subtitle: "Enterprise Mobility Solutions",
    description: "Comprehensive pan-India mobility solutions tailored for corporate clients. Seamless coordination across 80+ cities ensures your workforce travels safely, on time, and in comfort.",
    features: [
      "Pan-India coverage across 80+ cities",
      "Dedicated corporate account manager",
      "GST-compliant invoicing & reporting",
      "24/7 operations support",
      "Scheduled & on-demand fleet",
      "GPS-tracked vehicles",
    ],
    stat: "Pan-India",
    statLabel: "coverage",
    image: "/Mann car pictures/Mercedes-Benz S-Class/ChatGPT Image Apr 29, 2026, 11_07_15 PM.png",
  },
  "film-shoots-concerts": {
    title: "Film Shoots & Concerts",
    subtitle: "Entertainment Logistics",
    description: "Specialized transportation and logistics for film shoots and major concerts. We coordinate multi-vehicle fleets for cast, crew, and equipment with precision timing and discretion.",
    features: [
      "Artist & crew transport",
      "Equipment logistics support",
      "On-set standby fleet",
      "Night-shift operations",
      "Confidential & discreet service",
      "Pan-India coordination",
    ],
    stat: "Custom",
    statLabel: "logistics",
    image: "/Mann car pictures/range rover sport/ChatGPT Image May 6, 2026, 03_38_44 PM.png",
  },
  "global-leaders-celebrities": {
    title: "Global Leaders & Celebrities Visit",
    subtitle: "VIP Security Fleet",
    description: "High-security, luxury fleet services for global leaders and celebrity visits. From advance route planning to real-time coordination, we ensure every movement is smooth, safe, and seamless.",
    features: [
      "Advance security coordination",
      "Protected & luxury vehicles available",
      "Trained chauffeurs with background checks",
      "Real-time route monitoring",
      "Confidential guest management",
      "Protocol-compliant operations",
    ],
    stat: "VIP",
    statLabel: "security",
    image: "/Mann car pictures/Rolls royce/ChatGPT Image May 1, 2026, 01_10_24 PM.png",
  },
  "conventions-exhibitions": {
    title: "Conventions & Exhibitions",
    subtitle: "Large-Scale Transport",
    description: "Coordinated transportation for large-scale conventions and exhibitions. We manage multi-venue shuttles, delegate transfers, and VIP logistics so your event runs without a hitch.",
    features: [
      "Multi-venue shuttle coordination",
      "Delegate & VIP transfers",
      "Bulk fleet management",
      "On-site transport desk",
      "Real-time tracking",
      "Pan-India execution",
    ],
    stat: "Scale",
    statLabel: "capacity",
    image: "/Mann car pictures/Toyota Coaster New Generation/ChatGPT Image May 4, 2026, 12_38_26 PM.png",
  },
  "leasing": {
    title: "Leasing",
    subtitle: "Flexible Vehicle Leasing",
    description: "Flexible leasing options for both individual and corporate needs. Choose from short-term or long-term contracts with full maintenance, insurance, and support included.",
    features: [
      "Short & long-term lease options",
      "Full maintenance included",
      "Comprehensive insurance",
      "Pan-India availability",
      "200+ vehicles to choose from",
      "GST-compliant billing",
    ],
    stat: "Flexible",
    statLabel: "terms",
    image: "/Mann car pictures/Toyota fortuner/Toyota fortuner front.jpeg",
  },
  "high-profile-delegation": {
    title: "High Profile Delegation",
    subtitle: "Executive Fleet Services",
    description: "Executive fleet services tailored for high-profile delegations. We provide luxury vehicles, trained chauffeurs, and end-to-end coordination to ensure a dignified and secure experience.",
    features: [
      "Luxury & Protected vehicle options",
      "Protocol-trained chauffeurs",
      "Advance route planning",
      "Real-time communication",
      "Multi-vehicle convoy management",
      "24/7 on-call support",
    ],
    stat: "Premium",
    statLabel: "service",
    image: "/Mann car pictures/Mercedes-Benz S-Class/ChatGPT Image Apr 29, 2026, 11_07_15 PM.png",
  },
  "board-meetings": {
    title: "Board Meetings",
    subtitle: "Corporate Precision",
    description: "Punctual and reliable transportation for executive board meetings. We ensure your leadership team arrives on time, every time, with the professionalism and comfort befitting their status.",
    features: [
      "On-time guarantee",
      "Luxury sedan & SUV fleet",
      "Professionally dressed chauffeurs",
      "Advance scheduling",
      "Airport & hotel pick-up",
      "Corporate invoicing",
    ],
    stat: "On-time",
    statLabel: "guarantee",
    image: "/Mann car pictures/BMW 7 Series/ChatGPT Image Apr 28, 2026, 08_35_37 PM.png",
  },
  "agm-board-meets": {
    title: "AGM & Board Meets",
    subtitle: "Seamless Corporate Mobility",
    description: "Seamless travel logistics for Annual General Meetings and board meets. We coordinate transportation for directors, shareholders, and senior management with precision and discretion.",
    features: [
      "Multi-vehicle coordination",
      "Shareholder & director transport",
      "Advance scheduling & confirmation",
      "Corporate billing",
      "Dedicated event coordinator",
      "Pan-India availability",
    ],
    stat: "Seamless",
    statLabel: "experience",
    image: "/Mann car pictures/BMW 7 Series/ChatGPT Image Apr 28, 2026, 08_33_02 PM.png",
  },
  "leagues-tournaments": {
    title: "Leagues & Tournaments",
    subtitle: "Sports Logistics",
    description: "Dedicated transport solutions for sports leagues and tournaments. We manage team buses, athlete transfers, and media transport to keep your sporting event running smoothly.",
    features: [
      "Team & athlete transport",
      "Equipment logistics",
      "Multi-city coordination",
      "On-time performance guarantee",
      "Large-capacity coaches available",
      "24/7 support",
    ],
    stat: "Team",
    statLabel: "logistics",
    image: "/Mann car pictures/Tempo traveller/ChatGPT Image May 15, 2026, 11_18_13 PM.png",
  },
  "events-weddings": {
    title: "Events & Weddings",
    subtitle: "Bespoke Luxury",
    description: "Elegant and reliable transportation for your special events and weddings. From bridal cars to guest shuttles, we create a seamless, luxurious experience for your most important day.",
    features: [
      "Decorated bridal vehicles available",
      "Guest shuttle coordination",
      "Luxury & vintage car options",
      "Professional uniformed chauffeurs",
      "Multi-venue logistics",
      "Custom packages available",
    ],
    stat: "Bespoke",
    statLabel: "luxury",
    image: "/Mann car pictures/Rolls royce/ChatGPT Image May 1, 2026, 01_14_32 PM.png",
  },
  "town-hall-meetings": {
    title: "Town Hall Meetings",
    subtitle: "Group Corporate Transport",
    description: "Efficient group transport for corporate town hall meetings. We handle bulk employee transfers and senior management arrivals, ensuring everyone reaches the venue comfortably and on time.",
    features: [
      "Bulk employee transport",
      "Senior management fleet",
      "Multi-location pick-up",
      "Scheduled shuttles",
      "Real-time tracking",
      "Pan-India coverage",
    ],
    stat: "Group",
    statLabel: "transport",
    image: "/Mann car pictures/Mercedes-Benz V-Class/ChatGPT Image Apr 26, 2026, 01_04_00 AM.png",
  },
  "tourism": {
    title: "Tourism",
    subtitle: "Scenic Journeys",
    description: "Comfortable and safe sightseeing and tourism transportation services. Explore India's landmarks in style with our chauffeur-driven vehicles and knowledgeable, courteous drivers.",
    features: [
      "Pan-India sightseeing routes",
      "Knowledgeable local chauffeurs",
      "Comfortable & air-conditioned vehicles",
      "Custom tour itineraries",
      "Hotel & airport transfers",
      "Multi-day tour packages",
    ],
    stat: "Scenic",
    statLabel: "routes",
    image: "/Taj mahal.jpeg",
    imageObjectPosition: "center 60%",
  },
};

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = SERVICE_DATA[slug];

  if (!service) {
    notFound();
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section style={{
          padding: "clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem) 0",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <Link
            href="/#services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              textDecoration: "none",
              marginBottom: "1.5rem",
              letterSpacing: "0.02em",
            }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 7L7 17" /><path d="M17 17H7V7" />
            </svg>
            All Services
          </Link>

          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>
            {service.subtitle}
          </span>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "2rem",
          }}>
            <div style={{ flex: "1 1 400px" }}>
              <h1 className="font-serif" style={{
                fontSize: "clamp(2.6rem, 7vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "var(--text-primary)",
                margin: "0 0 1.25rem",
                letterSpacing: "0.01em",
              }}>
                {service.title}
              </h1>
              <p className="font-sans" style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "0 0 2rem",
              }}>
                {service.description}
              </p>
              <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
                Get a Quote
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Stat card */}
            <div className="glass-card" style={{
              padding: "2rem 2.5rem",
              borderRadius: "1.75rem",
              textAlign: "center",
              minWidth: 180,
              flexShrink: 0,
            }}>
              <p className="font-sans text-emboss" style={{
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1,
                margin: "0 0 0.5rem",
              }}>
                {service.stat}
              </p>
              <p className="font-sans" style={{
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
                margin: 0,
              }}>
                {service.statLabel}
              </p>
            </div>
          </div>
        </section>

        {/* ── Hero Image ── */}
        <section style={{
          padding: "3rem clamp(1.25rem, 5vw, 4rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div style={{
            borderRadius: "2rem",
            overflow: "hidden",
            height: "clamp(220px, 40vw, 500px)",
            border: "1px solid var(--border-subtle)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image}
              alt={service.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: service.imageObjectPosition || "center" }}
            />
          </div>
        </section>

        {/* ── Features ── */}
        <section style={{
          padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "var(--text-muted)",
            }}>What&apos;s included</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "1rem",
          }}>
            {service.features.map((feature) => (
              <div key={feature} className="glass-card" style={{
                padding: "1.25rem 1.5rem",
                borderRadius: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "8px", flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(200,40,40,0.18) 0%, rgba(200,40,40,0.06) 100%)",
                  border: "1px solid rgba(200,40,40,0.28)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent)",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="font-sans" style={{
                  fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4,
                }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={{
          padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div className="glass-card" style={{
            padding: "clamp(2rem, 5vw, 3.5rem)",
            borderRadius: "2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}>
            <div>
              <h2 className="font-serif" style={{
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                margin: "0 0 0.5rem",
                letterSpacing: "0.01em",
              }}>
                Ready to get started?
              </h2>
              <p className="font-sans" style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Our team will find the perfect solution tailored to your needs.
              </p>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/reservation" className="btn-primary" style={{ textDecoration: "none" }}>
                Book Now
                <ArrowUpRight size={15} />
              </Link>
              <Link href="/contact" style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: 9999,
                border: "1.5px solid var(--border-mid)",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                background: "transparent",
              }}>
                Talk to us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
