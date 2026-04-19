"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    num: "1",
    title: "Introduction",
    body: `These Terms and Conditions ("Terms") govern the use of services provided by Mann Fleet Partners Limited ("Company", "we", "our", or "us"). By accessing or using our mobility platform, transportation services, mobile application, or corporate fleet solutions, users and corporate partners agree to comply with these Terms.`,
  },
  {
    num: "2",
    title: "Services",
    body: `Mann Fleet Partners Limited provides mobility and fleet management services across India, including but not limited to:`,
    bullets: [
      "Corporate employee transportation",
      "On-demand ride services",
      "Fleet management solutions",
      "Corporate shuttle services",
      "Airport transfers and business travel transport and Guide services",
      "Event management services",
      "Package tours",
      "Charter of road transport automobiles",
      "Charter of helicopters or airplanes",
    ],
    footer: "The Company reserves the right to modify or discontinue services at any time without prior notice.",
  },
  {
    num: "3",
    title: "Eligibility",
    body: `Users must be at least 18 years of age and legally capable of entering into binding agreements under applicable laws. Corporate clients must provide accurate and authorized information when registering for services.`,
  },
  {
    num: "4",
    title: "Account Registration",
    body: `To access certain services, users or corporate administrators may be required to create an account. Users agree to:`,
    bullets: [
      "Provide accurate and complete information.",
      "Maintain confidentiality of login credentials.",
      "Notify the Company immediately of any unauthorized use.",
    ],
    footer: "The Company shall not be liable for losses arising from the unauthorized use of user accounts.",
  },
  {
    num: "5",
    title: "Corporate Client Responsibilities",
    body: `Corporate partners using our services agree to:`,
    bullets: [
      "Provide accurate employee transportation requirements.",
      "Ensure employees follow safety and conduct guidelines.",
      "Treat chauffeurs, support staff, and all personnel of Mann Fleet Partners Limited with respect.",
      "Pay invoices within agreed billing cycles.",
      "Inform the Company about schedule changes in advance.",
    ],
  },
  {
    num: "6",
    title: "Booking and Service Usage",
    body: `Ride bookings may be made through our mobile application, dashboard, or authorized channels. Users agree that:`,
    bullets: [
      "Bookings are subject to vehicle availability.",
      "Pick-up and drop-off times may vary due to traffic or operational conditions.",
      "Misuse of services may result in immediate suspension or termination.",
    ],
  },
  {
    num: "7",
    title: "Pricing and Payments",
    body: `Service fees will be charged based on:`,
    bullets: [
      "Distance travelled",
      "Vehicle category",
      "Corporate service agreements",
      "Additional service requirements",
    ],
    footer: "Corporate clients may be billed according to mutually agreed billing cycles (e.g., weekly or monthly invoices). Late payments may incur additional charges.",
  },
  {
    num: "8",
    title: "Cancellations and Modifications",
    body: `Users or corporate clients may cancel or modify bookings subject to the following rules:`,
    bullets: [
      "After 24 Hours: Cancellations made 24 hours or more before the scheduled requisite timing are refundable, subject to applicable cancellation/service charges.",
      "Within 24 Hours: Cancellations made within the 24-hour window of the scheduled requisite timing will attract 100% cancellation charges.",
      "Refund Process: All cancellation refunds must be processed through the application as per the mentioned timing.",
      "Repeated Cancellations: Frequent cancellations may lead to service restrictions.",
    ],
    footer: "For direct assistance with modifications, contact: support@mannfleetpartners.com.",
  },
  {
    num: "9",
    title: "Safety and Conduct",
    body: `All users must maintain appropriate conduct while using the service. The following are strictly prohibited:`,
    bullets: [
      "Harassment or abusive behaviour toward drivers or staff.",
      "Damage to vehicles.",
      "Illegal activities during transportation.",
    ],
    footer: "Violation may result in immediate service suspension and legal action.",
  },
  {
    num: "10",
    title: "Driver and Vehicle Compliance",
    body: `The Company ensures that drivers and vehicles meet regulatory requirements, including licensing, vehicle documentation, and safety standards. However, travel conditions may be affected by external factors such as weather, road conditions, or traffic.`,
  },
  {
    num: "11",
    title: "Limitation of Liability",
    body: `Mann Fleet Partners Limited shall not be liable for:`,
    bullets: [
      "Delays caused by traffic, weather, or unforeseen circumstances.",
      "Loss of personal belongings left in vehicles.",
      "Indirect or consequential damages arising from service usage.",
    ],
    footer: "Users utilize the service entirely at their own risk.",
  },
  {
    num: "12",
    title: "Governing Law",
    body: `These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of the courts in the Company's operational city.`,
  },
  {
    num: "13",
    title: "Contact Information",
    body: `By using our services, users and corporate partners confirm that they have read, understood, and agreed to these Terms and Conditions. For questions regarding these Terms, please contact:`,
    contact: {
      company: "Mann Fleet Partners Limited",
      email: "support@mannfleetpartners.com",
      phone: "011-47 20 21 22",
      address: "A-34, Okhla Industrial Area, Phase-I, New Delhi-110020, Delhi, India",
    },
  },
];

export default function TermsPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "var(--bg-base)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "var(--bg-deep)", borderBottom: "1px solid var(--border-subtle)", padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem) clamp(2.5rem, 6vw, 4rem)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", color: "var(--text-40)", textTransform: "uppercase", marginBottom: "1rem" }}>
            Legal
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, margin: "0 0 1rem", letterSpacing: "-0.025em" }}>
            Terms &amp; Conditions
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-45)", margin: 0 }}>
            Mann Fleet Partners Limited · Last updated 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 6vw, 4rem)" }}>
        {SECTIONS.map((s) => (
          <section key={s.num} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-90)", margin: "0 0 0.6rem", display: "flex", gap: "0.6rem" }}>
              <span style={{ color: "var(--text-35)", minWidth: "1.8rem" }}>{s.num}.</span>
              {s.title}
            </h2>
            {s.body && (
              <p style={{ fontSize: "0.9rem", color: "var(--text-55)", lineHeight: 1.8, margin: "0 0 0.75rem", paddingLeft: "2.4rem" }}>
                {s.body}
              </p>
            )}
            {s.bullets && (
              <ul style={{ paddingLeft: "3.9rem", margin: "0 0 0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                {s.bullets.map((b, i) => (
                  <li key={i} style={{ fontSize: "0.9rem", color: "var(--text-55)", lineHeight: 1.7 }}>{b}</li>
                ))}
              </ul>
            )}
            {s.footer && (
              <p style={{ fontSize: "0.9rem", color: "var(--text-55)", lineHeight: 1.8, margin: "0.5rem 0 0", paddingLeft: "2.4rem" }}>
                {s.footer}
              </p>
            )}
            {s.contact && (
              <div style={{ paddingLeft: "2.4rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--text-55)", margin: 0, lineHeight: 1.8 }}>{s.contact.company}</p>
                <p style={{ fontSize: "0.9rem", color: "var(--text-55)", margin: 0, lineHeight: 1.8 }}>Email: <a href={`mailto:${s.contact.email}`} style={{ color: "var(--accent)", textDecoration: "none" }}>{s.contact.email}</a></p>
                <p style={{ fontSize: "0.9rem", color: "var(--text-55)", margin: 0, lineHeight: 1.8 }}>Phone: {s.contact.phone}</p>
                <p style={{ fontSize: "0.9rem", color: "var(--text-55)", margin: 0, lineHeight: 1.8 }}>Address: {s.contact.address}</p>
              </div>
            )}
            <div style={{ height: "1px", background: "var(--border-subtle)", marginTop: "2rem" }} />
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}
