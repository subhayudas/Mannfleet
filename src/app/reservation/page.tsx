"use client";

import { useState, useCallback, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fbTrack } from "@/lib/meta-pixel";
import { BOOKING_EMAIL, SUPPORT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/contact";

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

function CheckCircleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

/* ── Shared input style ─────────────────────────────────────── */
const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  background: "var(--glass-ultra)",
  border: "1px solid var(--border-subtle)",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  fontFamily: "'Poppins', sans-serif",
  outline: "none",
  transition: "border-color 0.18s ease",
  boxSizing: "border-box",
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
      <label className="font-sans" style={{
        fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em",
        color: "var(--text-55)", textTransform: "uppercase",
      }}>
        {label}{required && <span style={{ color: "var(--accent)", marginLeft: "0.2rem" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ type = "text", placeholder, value, onChange, required, readOnly }: {
  type?: string; placeholder?: string; value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; readOnly?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type} placeholder={placeholder} value={value} onChange={onChange}
      required={required} readOnly={readOnly}
      style={{
        ...inputBase,
        borderColor: focused ? "var(--accent)" : "var(--border-subtle)",
        cursor: readOnly ? "default" : "text",
        opacity: readOnly ? 0.7 : 1,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function Select({ value, onChange, required, disabled, children }: {
  value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean; disabled?: boolean; children: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select value={value} onChange={onChange} required={required} disabled={disabled} style={{
      ...inputBase,
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      borderColor: focused ? "var(--accent)" : "var(--border-subtle)",
      appearance: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 1rem center",
      paddingRight: "2.5rem",
    }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </select>
  );
}

function Textarea({ placeholder, value, onChange, rows = 4 }: {
  placeholder?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows} style={{
      ...inputBase,
      borderColor: focused ? "var(--accent)" : "var(--border-subtle)",
      resize: "vertical", lineHeight: 1.6,
    }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function SectionCard({ badge, title, children }: { badge: string; title: string; children: React.ReactNode }) {
  return (
    <div className="glass-panel" style={{ borderRadius: "1.5rem", padding: "clamp(1.5rem, 4vw, 2.25rem)" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <span className="glass-badge" style={{ marginBottom: "0.6rem", display: "inline-block" }}>{badge}</span>
        <h2 className="font-serif" style={{
          fontSize: "clamp(1.15rem, 2.5vw, 1.55rem)", fontWeight: 400,
          color: "var(--text-primary)", lineHeight: 1.2, margin: 0,
        }}>
          {title}
        </h2>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
        gap: "1.1rem",
      }}>
        {children}
      </div>
    </div>
  );
}

/** Fleet page passes ?category=SUPER LUXURY — match it to a form option. */
const CATEGORY_TO_PREFERENCE: Record<string, string> = {
  "ECONOMY": "Economy",
  "ECONOMY PLUS": "Economy Plus",
  "PREMIUM": "Premium",
  "PREMIUM PLUS": "Premium Plus",
  "LUXURY": "Luxury",
  "SUPER LUXURY": "Super Luxury",
  "RANGE ROVER": "Range Rover",
};

/** Vehicle Type options: the cars in each Vehicle Preference (segment).
 *  Names match the fleet page so a clicked car pre-selects itself. Dzire and
 *  Accent aren't on the fleet page; the client listed them for Economy. */
const SEGMENT_VEHICLES: Record<string, string[]> = {
  "Economy": [
    "Maruti Suzuki Dzire", "Hyundai Aura", "Hyundai Accent", "Hyundai Grand i10 Nios",
    "Maruti Suzuki Ertiga", "Kia Carens", "Toyota Urban Cruiser Hyryder", "Tempo Traveller",
  ],
  "Economy Plus": ["Honda City", "Toyota Innova Crysta"],
  "Premium": [
    "Toyota Camry Hybrid", "Maruti Suzuki Invicto", "Toyota Innova Hycross (Hybrid)",
    "Force Urbania", "Force Urbania (Modified)",
  ],
  "Premium Plus": [
    "Maruti Suzuki Invicto", "Toyota Innova Hycross", "Toyota Fortuner", "Ford Endeavour",
    "Toyota Coaster", "Toyota Hiace",
  ],
  "Luxury": [
    "Mercedes-Benz E-Class", "BMW 5 Series", "Audi Q7", "BMW X5", "Volvo XC90",
    "Mercedes-Benz GLE", "Kia Carnival Limousine", "Toyota Vellfire", "Mercedes-Benz V-Class",
    "Mercedes-Benz Sprinter", "Mercedes-Benz Sprinter Executive Lounge",
    "Volvo Coach (Luxury)", "Volvo Coach with Washroom",
  ],
  "Super Luxury": [
    "Mercedes-Benz S-Class", "BMW 7 Series", "Mercedes-Benz GLS 400 / 450", "BMW X7",
    "Mercedes Sprinter with Washroom", '"Jet on Wheels" (Volvo 13.5m)',
  ],
  "Range Rover": ["Range Rover (Vogue / Autobiography / LWB)", "Range Rover Sport"],
  "Self Drive": ["Honda City", "Toyota Innova Crysta", "Toyota Camry Hybrid", "Toyota Fortuner"],
  "Tempo Traveller": ["Tempo Traveller", "Force Urbania", "Force Urbania (Modified)"],
};

const clickedIfInSegment = (segment: string, vehicle: string) =>
  SEGMENT_VEHICLES[segment]?.includes(vehicle) ? vehicle : "";

/* ── Query string, without useSearchParams ──────────────────
   useSearchParams() would force this route behind a Suspense boundary, which
   drops the whole form out of the prerendered HTML. useSyncExternalStore reads
   the browser-only value with no hydration mismatch and keeps the page static. */
const subscribeToSearch = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
};
const getSearch = () => window.location.search;
const getSearchOnServer = () => "";

type Booking = Record<string, string>;

/** Days of hire, counting both ends: 31 Oct → 1 Nov is 2 days. */
function tripDays(from: string, to: string) {
  if (!from || !to) return "";
  const diff = Math.round((new Date(to).getTime() - new Date(from).getTime()) / 86_400_000);
  return diff >= 0 ? String(diff + 1) : "";
}

/** Plain-text body — renders identically in every mail client. */
function buildMailBody(sections: { heading: string; fields: Booking }[]) {
  const blocks = sections
    .map(({ heading, fields }) => {
      const rows = Object.entries(fields)
        .filter(([, v]) => v && v.trim())
        .map(([k, v]) => `  ${k}: ${v.trim()}`);
      return rows.length ? `${heading}\n${rows.join("\n")}` : "";
    })
    .filter(Boolean);

  return [
    "New reservation request from mannfleetpartners.com",
    "",
    blocks.join("\n\n"),
    "",
    "—",
    "Sent from the reservation form on mannfleetpartners.com",
  ].join("\n");
}

/* ── Main page ──────────────────────────────────────────────── */
export default function ReservationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  // Did /api/reservation accept the booking? false → show the manual fallbacks.
  const [delivered, setDelivered] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [requestRef, setRequestRef] = useState("");
  const [copied, setCopied] = useState(false);

  // Arrives from the fleet page: /reservation?vehicle=...&category=...
  const search = useSyncExternalStore(subscribeToSearch, getSearch, getSearchOnServer);
  const { selectedVehicle, selectedCategory } = useMemo(() => {
    const params = new URLSearchParams(search);
    return {
      selectedVehicle: params.get("vehicle") ?? "",
      selectedCategory: params.get("category") ?? "",
    };
  }, [search]);

  // Guest Name
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Contact
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  // Trip Duration
  const [dateOfTravel, setDateOfTravel] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pick-up Details
  const [flightDetails, setFlightDetails] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [cityName, setCityName] = useState("");
  const [airportName, setAirportName] = useState("");
  const [terminal, setTerminal] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [reportingAddress, setReportingAddress] = useState("");

  // Drop-off
  const [dropoffLocation, setDropoffLocation] = useState("");

  // Requirements
  const [noOfPersons, setNoOfPersons] = useState("");
  // null = guest hasn't chosen, so fall back to the category of the car they
  // clicked. An explicit choice (including "No preference") always wins.
  const [vehiclePreference, setVehiclePreference] = useState<string | null>(null);
  const vehiclePreferences =
    vehiclePreference ?? CATEGORY_TO_PREFERENCE[selectedCategory.toUpperCase()] ?? "";
  // The cars in the chosen segment; defaults to the car they clicked if it's one.
  // Changing the segment clears the choice, so a car from another segment can't stick.
  const segmentVehicles = SEGMENT_VEHICLES[vehiclePreferences] ?? [];
  const [vehicleTypeChoice, setVehicleTypeChoice] = useState<string | null>(null);
  const vehicleType = vehicleTypeChoice ?? clickedIfInSegment(vehiclePreferences, selectedVehicle);
  const [servicesRequired, setServicesRequired] = useState("");

  const numberOfDays = tripDays(dateOfTravel, endDate);

  const guestName = [title, firstName, lastName].filter(Boolean).join(" ").trim();

  /** The whole request as plain text — reused for mail, clipboard and WhatsApp. */
  const summaryText = useCallback(() => {
    return buildMailBody([
      {
        heading: "GUEST",
        fields: { Name: guestName, Phone: contactNumber, Email: emailAddress },
      },
      {
        heading: "TRIP DURATION",
        fields: {
          "Date of travel": dateOfTravel,
          "End date": endDate,
          "Number of days": numberOfDays,
        },
      },
      {
        heading: "PICK-UP",
        fields: {
          Time: pickupTime,
          City: cityName,
          "Flight details": flightDetails,
          "Airport / Residence": airportName,
          Terminal: terminal,
          Hotel: hotelName,
          "Reporting address": reportingAddress,
        },
      },
      { heading: "DROP-OFF", fields: { Location: dropoffLocation } },
      {
        heading: "REQUIREMENTS",
        fields: {
          "No. of persons": noOfPersons,
          "Vehicle from fleet page": selectedVehicle,
          "Vehicle preference": vehiclePreferences,
          "Vehicle type": vehicleType,
          "Services required": servicesRequired,
        },
      },
    ]);
  }, [
    guestName, contactNumber, emailAddress, dateOfTravel, endDate, numberOfDays,
    pickupTime, cityName, flightDetails, airportName, terminal, hotelName,
    reportingAddress, dropoffLocation, noOfPersons, selectedVehicle,
    vehiclePreferences, vehicleType, servicesRequired,
  ]);

  /** The same request addressed to the booking inbox. */
  const mailtoHref = useCallback(() => {
    const subject = selectedVehicle
      ? `Reservation request — ${selectedVehicle} — ${guestName || "New guest"}`
      : `Reservation request — ${guestName || "New guest"}`;
    return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summaryText())}`;
  }, [selectedVehicle, guestName, summaryText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    // Primary conversion. Guest name / phone / email are deliberately left out —
    // Meta requires PII to be hashed via advanced matching, not sent as params.
    fbTrack("Lead", {
      content_name: "Reservation Request",
      content_category: servicesRequired || undefined,
      vehicle_preference: vehiclePreferences || undefined,
      number_of_days: numberOfDays || undefined,
      number_of_persons: noOfPersons || undefined,
    });

    // The server emails the booking to BOOKING_EMAIL and a confirmation to the
    // guest. If that fails (offline, mail provider down) the success screen
    // falls back to the mailto / copy / WhatsApp routes so the booking is
    // never lost.
    setSending(true);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName, contactNumber, emailAddress, dateOfTravel, endDate, numberOfDays,
          pickupTime, cityName, flightDetails, airportName, terminal, hotelName,
          reportingAddress, dropoffLocation, noOfPersons, selectedVehicle,
          vehiclePreferences, vehicleType, servicesRequired,
        }),
      });
      const data = res.ok ? await res.json().catch(() => null) : null;
      setDelivered(Boolean(data?.ok));
      setRequestRef(typeof data?.ref === "string" ? data.ref : "");
      setConfirmationSent(Boolean(data?.confirmationSent));
    } catch {
      setDelivered(false);
    }
    setSending(false);

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
        <Navbar />
        <main style={{
          padding: "clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem)",
          maxWidth: 720, margin: "0 auto",
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "2rem",
        }}>
          <div className="glass-panel" style={{
            borderRadius: "1.75rem", padding: "clamp(2.5rem, 6vw, 4rem)", width: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem",
          }}>
            <div style={{ color: "var(--accent)" }}><CheckCircleIcon size={56} /></div>
            <div>
              <h1 className="font-serif" style={{
                fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400,
                color: "var(--text-primary)", lineHeight: 1.1, margin: "0 0 0.75rem",
              }}>
                {delivered ? <>Request<br /></> : <>Almost<br /></>}
                <span className="italic" style={{ color: "var(--text-secondary)" }}>{delivered ? "received" : "there"}</span>
              </h1>
              <p className="font-sans" style={{
                fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0, maxWidth: 460,
              }}>
                {delivered ? (
                  <>
                    Thank you, <strong style={{ color: "var(--text-primary)" }}>{firstName || "valued guest"}</strong>. Your reservation
                    request has reached our team, who will confirm it within 2 hours.{" "}
                    {requestRef && (
                      <>Your request number is{" "}
                        <strong style={{ color: "var(--text-primary)" }}>{requestRef}</strong>.{" "}</>
                    )}
                    {confirmationSent ? (
                      <>A confirmation has been emailed to{" "}
                        <strong style={{ color: "var(--text-primary)" }}>{emailAddress}</strong>.</>
                    ) : (
                      <>We couldn&apos;t email a confirmation copy to{" "}
                        <strong style={{ color: "var(--text-primary)" }}>{emailAddress}</strong>, but your request is safe with us.</>
                    )}
                  </>
                ) : (
                  <>
                    Thank you, <strong style={{ color: "var(--text-primary)" }}>{firstName || "valued guest"}</strong>. We couldn&apos;t send
                    your request automatically.{" "}
                    <strong style={{ color: "var(--text-primary)" }}>Please send it to {BOOKING_EMAIL} using one of the options below</strong>{" "}
                    and our team will reply within 2 hours.
                  </>
                )}
              </p>
            </div>

            {delivered ? (
              <p className="font-sans" style={{ fontSize: "0.72rem", color: "var(--text-35)", margin: 0, textAlign: "center" }}>
                Need to change something? Email{" "}
                <a href={`mailto:${BOOKING_EMAIL}`} style={{ color: "var(--text-55)" }}>{BOOKING_EMAIL}</a>{" "}
                or{" "}
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-55)" }}>
                  WhatsApp us on {WHATSAPP_DISPLAY}
                </a>.
              </p>
            ) : (
            /* Automatic sending failed, so every manual route stays available
                (a mailto can also silently no-op without a mail app). */
            <div style={{
              width: "100%", padding: "1.25rem", borderRadius: "1rem",
              background: "var(--glass-ultra)", border: "1px solid var(--border-subtle)",
              display: "flex", flexDirection: "column", gap: "0.9rem", alignItems: "center",
            }}>
              <p className="font-sans" style={{ fontSize: "0.82rem", color: "var(--text-55)", margin: 0 }}>
                Send your request another way
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center" }}>
                <a
                  href={mailtoHref()}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.7rem 1.4rem", borderRadius: "9999px",
                    background: "var(--accent)", color: "#fff",
                    fontSize: "0.85rem", fontWeight: 600,
                    textDecoration: "none", fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Reopen email draft
                  <ArrowUpRight size={13} />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(summaryText()).then(
                      () => setCopied(true),
                      () => setCopied(false),
                    );
                  }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.7rem 1.4rem", borderRadius: "9999px",
                    background: "transparent", color: "var(--text-primary)",
                    border: "1px solid var(--border-subtle)",
                    fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {copied ? "Copied \u2713" : "Copy my details"}
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summaryText())}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.7rem 1.4rem", borderRadius: "9999px",
                    background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.35)",
                    color: "#25D366", fontSize: "0.85rem", fontWeight: 600,
                    textDecoration: "none", fontFamily: "'Poppins', sans-serif",
                    transition: "background 0.18s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.20)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.12)"; }}
                >
                  <WhatsAppIcon size={16} />
                  Send on WhatsApp
                </a>
              </div>
              <p className="font-sans" style={{ fontSize: "0.72rem", color: "var(--text-35)", margin: 0, textAlign: "center" }}>
                Or email us directly at{" "}
                <a href={`mailto:${BOOKING_EMAIL}`} style={{ color: "var(--text-55)" }}>{BOOKING_EMAIL}</a>.
                Still stuck? Write to{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "var(--text-55)" }}>{SUPPORT_EMAIL}</a>.
              </p>
            </div>
            )}
            <Link href="/" style={{ fontSize: "0.82rem", color: "var(--text-muted)", textDecoration: "none", borderBottom: "1px solid var(--border-subtle)" }}>
              Back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ padding: "clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem)", maxWidth: 900, margin: "0 auto" }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>Book Your Vehicle</span>
          <h1 className="font-serif" style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 400,
            lineHeight: 1.05, color: "var(--text-primary)", margin: "0 0 1rem", letterSpacing: "0.01em",
          }}>
            Make a<br />
            <span className="italic" style={{ color: "var(--text-secondary)" }}>Reservation</span>
          </h1>
          <p className="font-sans" style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
            Complete the form below and our team will confirm your booking within 2 hours. Fields marked <span style={{ color: "var(--accent)" }}>*</span> are required.
          </p>

          {selectedVehicle && (
            <div style={{
              marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: "0.6rem",
              padding: "0.6rem 1.1rem", borderRadius: "9999px",
              background: "var(--glass-ultra)", border: "1px solid var(--border-subtle)",
            }}>
              <span className="font-sans" style={{
                fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "var(--accent)",
              }}>
                Selected
              </span>
              <span className="font-sans" style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>
                {selectedVehicle}
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* ── 1. Guest Name ── */}
          <SectionCard badge="01" title="Guest Name">
            <Field label="Title" required>
              <Select value={title} onChange={(e) => setTitle(e.target.value)} required>
                <option value="" disabled>Select</option>
                <option value="Mr.">Mr. (Male)</option>
                <option value="Ms.">Ms. (Female)</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Dr.">Dr.</option>
              </Select>
            </Field>
            <Field label="First Name" required>
              <Input placeholder="e.g. Arjun" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </Field>
            <Field label="Last Name" required>
              <Input placeholder="e.g. Sharma" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </Field>
          </SectionCard>

          {/* ── 2. Contact Info ── */}
          <SectionCard badge="02" title="Contact Info">
            <Field label="Contact Number" required>
              <Input type="tel" placeholder="+91 99902 22999" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
            </Field>
            <Field label="Email Address" required>
              <Input type="email" placeholder="you@example.com" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required />
            </Field>
          </SectionCard>

          {/* ── 3. Trip Duration ── */}
          <SectionCard badge="03" title="Trip Duration">
            <Field label="Date of Travel" required>
              <Input type="date" value={dateOfTravel} onChange={(e) => setDateOfTravel(e.target.value)} required />
            </Field>
            <Field label="Number of Days">
              <Input
                value={numberOfDays ? `${numberOfDays} day${numberOfDays === "1" ? "" : "s"}` : ""}
                readOnly
                placeholder="Auto-calculated"
              />
            </Field>
            <Field label="End Date" required>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </Field>
          </SectionCard>

          {/* ── 4. Pick-up Details ── */}
          <SectionCard badge="04" title="Pick-up Details">
            <Field label="Flight Details">
              <Input placeholder="e.g. AI 202, IndiGo 6E-123" value={flightDetails} onChange={(e) => setFlightDetails(e.target.value)} />
            </Field>
            <Field label="Time" required>
              <Input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
            </Field>
            <Field label="City Name" required>
              <Input placeholder="e.g. New Delhi" value={cityName} onChange={(e) => setCityName(e.target.value)} required />
            </Field>
            <Field label="Airport Name / Residence">
              <Input placeholder="e.g. Indira Gandhi International Airport" value={airportName} onChange={(e) => setAirportName(e.target.value)} />
            </Field>
            <Field label="Terminal">
              <Input placeholder="e.g. Terminal 3" value={terminal} onChange={(e) => setTerminal(e.target.value)} />
            </Field>
            <Field label="Hotel Name">
              <Input placeholder="e.g. The Leela Palace" value={hotelName} onChange={(e) => setHotelName(e.target.value)} />
            </Field>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Reporting Address">
                <Input placeholder="Where the car should report — street, area, city" value={reportingAddress} onChange={(e) => setReportingAddress(e.target.value)} />
              </Field>
            </div>
          </SectionCard>

          {/* ── 5. Drop-off ── */}
          <SectionCard badge="05" title="Drop-off">
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Drop-off Location" required>
                <Input placeholder="e.g. Hotel name, address or airport" value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} required />
              </Field>
            </div>
          </SectionCard>

          {/* ── 6. Requirements ── */}
          <SectionCard badge="06" title="Requirements">
            <Field label="No. of Persons (Including Kids)" required>
              <Input type="number" placeholder="e.g. 4" value={noOfPersons} onChange={(e) => setNoOfPersons(e.target.value)} required />
            </Field>
            <Field label="Vehicle Preferences">
              <Select value={vehiclePreferences} onChange={(e) => { setVehiclePreference(e.target.value); setVehicleTypeChoice(null); }}>
                <option value="">No preference</option>
                <option value="Economy">Economy</option>
                <option value="Economy Plus">Economy Plus</option>
                <option value="Premium">Premium</option>
                <option value="Premium Plus">Premium Plus</option>
                <option value="Luxury">Luxury</option>
                <option value="Super Luxury">Super Luxury</option>
                <option value="Range Rover">Range Rover</option>
                <option value="Self Drive">Self Drive</option>
                <option value="Tempo Traveller">Tempo Traveller</option>
              </Select>
            </Field>
            <Field label="Vehicle Type">
              <Select value={vehicleType} onChange={(e) => setVehicleTypeChoice(e.target.value)} disabled={!segmentVehicles.length}>
                <option value="">{segmentVehicles.length ? "No preference" : "Choose a vehicle preference first"}</option>
                {segmentVehicles.map((v) => <option key={v} value={v}>{v}</option>)}
              </Select>
            </Field>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Details of Services Required">
                <Textarea
                  placeholder="Describe the services you need — airport transfer, chauffeur, tour guide, corporate event, self-drive, etc."
                  value={servicesRequired}
                  onChange={(e) => setServicesRequired(e.target.value)}
                  rows={4}
                />
              </Field>
            </div>
          </SectionCard>

          {/* ── Submit ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "1rem", padding: "0.5rem 0",
          }}>
            <p className="font-sans" style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0, maxWidth: 420 }}>
              Your request goes straight to our team at <strong style={{ color: "var(--text-55)" }}>{BOOKING_EMAIL}</strong>,
              and we&apos;ll email you a confirmation at the address above. Booking queries:{" "}
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-55)" }}>
                WhatsApp {WHATSAPP_DISPLAY}
              </a>.
            </p>
            <button
              type="submit"
              disabled={sending}
              style={{
                opacity: sending ? 0.7 : 1,
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.85rem 2rem", borderRadius: "9999px",
                background: "var(--accent)", color: "#ffffff", border: "none",
                fontSize: "0.9rem", fontWeight: 600, fontFamily: "'Poppins', sans-serif",
                cursor: sending ? "wait" : "pointer", boxShadow: "0 4px 20px rgba(200,40,42,0.30)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,40,42,0.40)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,40,42,0.30)"; }}
            >
              {sending ? "Sending…" : "Submit Reservation"}
              <ArrowUpRight size={14} />
            </button>
          </div>

        </form>
      </main>

      <Footer />
    </div>
  );
}
