"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    num: "1",
    title: "Introduction",
    body: `Mann Fleet Partners Limited ("Company", "we", "our", "us") respects your privacy and is committed to protecting the personal information of our users, corporates, travel partners, employees, vendors, chauffeurs, and chauffeur partners.

We operate a luxury mobility platform providing chauffeur-driven vehicles, corporate mobility, airport transfers, and premium transport services across India and internationally for all types of road travel. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our mobility platform, mobile application (Mann Fleet), website, or transportation services requested via email.

This Privacy Policy and Terms of Use ("Policy") govern:`,
    bullets: [
      "Use of the Mann Fleet mobile application, website, and services.",
      "Collection, use, storage, and sharing of personal data.",
      "Rights and obligations of users, customers, and partners.",
    ],
    footer: "By using our platform, you agree to this Policy in full.",
  },
  {
    num: "2",
    title: "Information We Collect",
    body: "We collect the following categories of information:",
    subsections: [
      {
        label: "2.1 Personal Information",
        bullets: [
          "Full name, phone numbers, and email address",
          "Information for a third person or an employee if a vehicle is booked on their behalf (including their phone number and email address)",
          "Employee ID and company details (for corporate users)",
          "Location Data for all users: Real-time Live GPS location during rides, and pickup/drop locations",
          "Address and billing information",
        ],
      },
      {
        label: "2.2 Booking Information",
        bullets: [
          "Pickup & drop locations, travel itinerary, and ride history",
          "Chauffeur preferences and chat history",
          "Live locations",
        ],
      },
      {
        label: "2.3 Identity Verification",
        bullets: [
          "Government ID with authentication from the Govt. portal",
          "Mobile number confirmation with OTP",
          "Corporate authorization details and employment card",
        ],
      },
      {
        label: "2.4 Payment Information",
        bullets: [
          "Card details (processed via secure gateways)",
          "UPI / bank details and transaction history",
          "Any other information regarding payment",
        ],
      },
      {
        label: "2.5 Device Information",
        bullets: [
          "Device type, OS version, and App version",
          "IP address",
          "GPS/location data (real-time tracking)",
        ],
      },
      {
        label: "2.6 Behavioural & Usage Data",
        bullets: [
          "App interactions and search patterns",
          "Preferences and feedback",
        ],
      },
    ],
  },
  {
    num: "3",
    title: "Usage of Information",
    body: "We use collected data for:",
    bullets: [
      "Booking confirmation and ride management",
      "Customer support and dispute resolution",
      "Improving service quality and personalization",
      "Fraud detection and prevention",
      "Regulatory compliance",
      "Marketing, promotional activities, and festive offers or discount coupons (only with consent where required)",
    ],
  },
  {
    num: "4",
    title: "Payment Information",
    bullets: [
      "Payments are processed via RBI-compliant third-party gateways.",
      "Mann Fleet does not store full card details.",
      "Pre-authorizations may be taken for certain bookings.",
      "Users agree to pay in advance unless a contract is signed with a corporate entity for a credit period.",
      "Charges include: Ride charges, waiting charges, tolls, parking, state taxes, and damage/penalty charges (if applicable).",
    ],
  },
  {
    num: "5",
    title: "Device & Location Data",
    body: "We collect real-time location data to track rides, ensure safety, and optimize routing. Users can disable location access, but this may affect service functionality.",
  },
  {
    num: "6",
    title: "Sharing of Information",
    body: "We may share data with:",
    bullets: [
      "Chauffeurs and chauffeur owners (limited ride-related info)",
      "Third-party vendors providing cab services",
      "Internally to raise invoices or recheck details",
      "Payment processors",
      "Corporate clients (for employee bookings)",
      "Government authorities (if legally required)",
    ],
    footer: "We never sell personal data.",
  },
  {
    num: "7",
    title: "Data Security",
    body: "We implement end-to-end encryption (where applicable), secure servers and firewalls, and restricted access controls. However, no system is 100% secure, and users share data at their own risk.",
  },
  {
    num: "8",
    title: "Cookies & Tracking Technologies",
    body: "We use cookies, device identifiers, and analytics tools to improve user experience, analyze app usage, and enable personalized services. Users may disable cookies via device settings.",
  },
  {
    num: "9",
    title: "Data Retention",
    body: "We retain data as long as necessary for service delivery, for legal/tax compliance, and for dispute resolution. Data may be retained for a certain time even after account deletion where required by us to verify past rides and payments, or as required by law.",
  },
  {
    num: "10",
    title: "User Rights",
    body: "Users have the right to access their data, request corrections, request deletion (subject to legal obligations), and withdraw consent. Requests can be made via official support channels or the app.",
  },
  {
    num: "11",
    title: "Intellectual Property",
    body: "All content—including app design, branding, logos, and technology—is the exclusive property of Mann Fleet Partners Limited. Unauthorized use is strictly prohibited.",
  },
  {
    num: "12",
    title: "User Conduct & Prohibited Activities",
    body: "Users must not misuse the platform, provide false information, engage in illegal activities, or harass chauffeurs or staff. Strict action will be taken for violations.",
  },
  {
    num: "13",
    title: "Respect Towards Staff & Chauffeurs",
    body: "Users must treat chauffeurs and support staff respectfully and avoid abusive language or behaviour. Violation may result in immediate suspension and legal actions. (See Section 31 for extended Chauffeur Safety Clause).",
  },
  {
    num: "14",
    title: "Vehicle Usage & Damage Policy",
    body: "Users are responsible for any damage caused due to their negligence. Charges will be levied for interior damage, exterior damage, cleaning (spillage, vomiting, smoking, etc.), and holding the vehicle or chauffeur unnecessarily, which harms the company financially and socially.",
  },
  {
    num: "15",
    title: "Capacity Limitation",
    body: "Users must not exceed the allowed passenger capacity. Overloading is strictly prohibited and may result in immediate ride cancellation without any refund.",
  },
  {
    num: "16",
    title: "Prohibited Items & Behavior",
    body: "The following are not allowed in vehicles: Illegal substances, weapons, hazardous materials, and smoking (unless explicitly permitted).",
  },
  {
    num: "17",
    title: "Compliance & Time Discipline",
    bullets: [
      "Users must comply with local laws, traffic rules, and government regulations.",
      "Users must be ready at the pickup time. Waiting charges apply after a grace period of 10 minutes.",
    ],
  },
  {
    num: "18",
    title: "Fraud, Misrepresentation & Illegal Activity",
    body: "Strict actions (including legal proceedings, financial penalties, and reporting to authorities) will be taken against fake bookings, payment fraud, identity misuse, fraudulent activities, and the illegal transportation of goods.",
  },
  {
    num: "19",
    title: "Pricing, Surge Policy & Extra Charges",
    body: "Mann Fleet operates on a dynamic pricing model based on demand, traffic, weather, special events, location, and timing. Surge pricing shall be clearly communicated before booking confirmation. Users agree to pay additional/incidental charges for:",
    bullets: [
      "Waiting time fees",
      "Extra kilometres beyond the package",
      "Route deviations or delays due to heavy traffic, road closures, or safety concerns",
      "Night charges (applying after 2100 hours or before 0700 hours depending on the class of vehicle)",
      "Tolls, parking charges, and interstate entry taxes wherever applicable",
      "Special handling charges or assistance at the airport, hotel, or residence wherever demanded",
    ],
  },
  {
    num: "20",
    title: "Commitment to Pay",
    body: "Users agree to pay all applicable charges in full in advance, and clear any post-ride dues incurred under Section 19.",
  },
  {
    num: "21",
    title: "Refunds & Disputes",
    body: "Refunds are subject to internal review. Disputes must be raised within 48 hours from the end time of services. The Company's decision is final unless escalated legally.",
  },
  {
    num: "22",
    title: "Service Reliability & Limitation of Liability",
    body: "Mann Fleet shall make reasonable efforts to ensure timely service, but is not liable for delays beyond reasonable control (e.g., traffic, weather, mechanical issues, unforeseen events). In case of failure to provide service, alternate arrangements may be offered. Maximum liability (if any) or refunds are limited to the amount of the ride fare paid or a maximum of Rs. 5000, whichever is less.",
  },
  {
    num: "23",
    title: "Indemnity",
    body: "Users agree to indemnify and hold harmless Mann Fleet against legal claims arising from misuse of services, legal claims of a 3rd party due to the user's wrong actions, and damages caused to vehicles, personnel, or by user actions.",
  },
  {
    num: "24",
    title: "Promotions, Offers & Discounts",
    body: "Promotions are subject to terms and availability, are strictly non-transferable (unless stated), and can be modified or withdrawn anytime without notice.",
  },
  {
    num: "25",
    title: "Right to Refuse Service & Suspension",
    body: "Mann Fleet reserves the absolute right to suspend accounts, cancel bookings, restrict access, or refuse service without prior notice in case of policy violations, safety concerns, or suspicious/illegal activity.",
  },
  {
    num: "26",
    title: "Violation of Policy",
    body: "Any violation may result in account suspension, legal action, and financial penalties.",
  },
  {
    num: "27",
    title: "Illegal Activities",
    body: "We have a zero-tolerance policy for criminal activities, drug use, harassment, and disrespect to chauffeurs and support staff. Legal Authorities may be informed.",
  },
  {
    num: "28",
    title: "Force Majeure",
    body: "Mann Fleet is not liable for failure or delay due to natural disasters, strikes, government restrictions, pandemics, war, civil unrest, or traffic jams. Liability is restricted as mentioned in Section 22.",
  },
  {
    num: "29",
    title: "Amendments & Policy Updates",
    body: "Mann Fleet reserves the right to modify this Policy and update terms at any time without prior notice. Continued use equals acceptance of the updated terms.",
  },
  {
    num: "30",
    title: "Governing Law & Jurisdiction",
    body: "This Agreement is governed by the laws of India. Exclusive jurisdiction lies in New Delhi. All disputes shall be resolved through arbitration conducted in New Delhi as per the Arbitration & Conciliation Act, 1996.",
  },
  {
    num: "31",
    title: "Chauffeur Safety & Protection Clause",
    subsections: [
      { label: "31.1", body: "Mann Fleet is committed to ensuring the safety, dignity, and protection of all chauffeurs and operational staff." },
      { label: "31.2", body: "Users agree that they shall not engage in verbal abuse, harassment, threats, or physical misconduct; not issue unlawful instructions; and not compel chauffeurs to violate traffic laws or safety norms." },
      { label: "31.3", body: "Any instance of misbehaviour, intimidation, physical aggression, or discrimination shall result in immediate ride termination, permanent account suspension, and reporting to law enforcement authorities." },
      { label: "31.4", body: "Mann Fleet reserves the right to record and monitor ride interactions for safety purposes and use such recordings as evidence in disputes or legal proceedings." },
      { label: "31.5", body: "The Company shall not be liable for any refusal of service by a chauffeur if the user poses a safety risk, gives illegal/unsafe instructions, or is disrespectful." },
    ],
  },
  {
    num: "32",
    title: "VIP & High-Profile Client Confidentiality",
    subsections: [
      { label: "32.1", body: "Mann Fleet recognizes the importance of confidentiality and discretion for VIP and high-profile clients." },
      { label: "32.2", body: "The Company undertakes strict non-disclosure of client identity, travel details, and preferences; internal access restriction to sensitive data; and training of chauffeurs on confidentiality protocols." },
      { label: "32.3", body: "Users acknowledge that absolute confidentiality cannot be guaranteed in cases of legal obligations, force majeure, or third-party indulgence." },
      { label: "32.4", body: "Any unauthorized attempt by users or third parties to record, publish, or exploit ride-related information may lead to legal action and damages claims." },
    ],
  },
  {
    num: "33",
    title: "International Ride & Cross-Border Compliance",
    subsections: [
      { label: "33.1", body: "For rides conducted outside India or involving cross-border travel, users agree to comply with immigration laws, customs regulations, and local transport laws, and to carry valid identification, visas, and permits." },
      { label: "33.2", body: "Mann Fleet shall not be responsible for denial of entry by authorities, delays due to international regulations, or seizure of goods or baggage." },
      { label: "33.3", body: "Additional charges may apply for international permits, cross-border taxes, and local compliance requirements." },
    ],
  },
  {
    num: "34",
    title: "Corporate Credit Billing Terms (B2B Clients)",
    subsections: [
      { label: "34.1", body: "Corporate clients may be provided with credit-based billing facilities, subject to approval." },
      { label: "34.2", body: "Payment terms: Invoices are payable within 7 / 15 / 30 days (as agreed). Late payment shall attract interest charges and suspension of services." },
      { label: "34.3", body: "Corporate clients agree to ensure authorized usage by employees and to remain liable for all bookings made under their account." },
      { label: "34.4", body: "Mann Fleet reserves the right to revoke credit facilities at any time or demand advance payment." },
    ],
  },
  {
    num: "35",
    title: "No-Show, Cancellation & Waiting Policy",
    subsections: [
      { label: "35.1 No-Show Definition", body: "A booking shall be treated as a 'No-Show' if the user fails to appear within the defined waiting period (including the grace period), if there is any delay in flight arrival where waiting and parking charges apply, or if incorrect pickup details/wrong location are shared." },
      { label: "35.2 Charges", body: "Full ride fare may be charged for no-shows. Waiting charges apply beyond the grace period." },
      { label: "35.3 Cancellation", body: "Free cancellation is available within a defined window. Cancellation charges apply post-window." },
      { label: "35.4 Airport pickups", body: "Waiting time is calculated from the flight landing time (subject to tracking)." },
      { label: "35.5", body: "Mann Fleet reserves the right to cancel bookings due to operational constraints and provide alternatives where possible." },
    ],
  },
  {
    num: "36",
    title: "Contact Information",
    contact: {
      company: "Mann Fleet Partners Limited",
      address: "A-34, Okhla Industrial Area Phase I, New Delhi - 110020, Delhi, India",
      tel: "+91 11 47202122, +91 11 46202122",
      mobile: "+91 9990222999, 9891919292",
      whatsapp: "+91 9810008008",
      email: "info@mannfleetpartners.com",
    },
  },
];

type Subsection = { label: string; body?: string; bullets?: string[] };
type Section = {
  num: string;
  title: string;
  body?: string;
  bullets?: string[];
  footer?: string;
  subsections?: Subsection[];
  contact?: {
    company: string;
    address: string;
    tel: string;
    mobile: string;
    whatsapp: string;
    email: string;
  };
};

const bodyStyle: React.CSSProperties = { fontSize: "0.9rem", color: "var(--text-55)", lineHeight: 1.8, margin: "0 0 0.75rem", paddingLeft: "2.4rem", whiteSpace: "pre-line" };
const bulletStyle: React.CSSProperties = { fontSize: "0.9rem", color: "var(--text-55)", lineHeight: 1.7 };

function SectionBlock({ s }: { s: Section }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-90)", margin: "0 0 0.6rem", display: "flex", gap: "0.6rem" }}>
        <span style={{ color: "var(--text-35)", minWidth: "1.8rem" }}>{s.num}.</span>
        {s.title}
      </h2>

      {s.body && (
        <p style={bodyStyle}>{s.body}</p>
      )}

      {s.bullets && (
        <ul style={{ paddingLeft: "3.9rem", margin: "0 0 0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {s.bullets.map((b, i) => <li key={i} style={bulletStyle}>{b}</li>)}
        </ul>
      )}

      {s.subsections && s.subsections.map((sub, i) => (
        <div key={i} style={{ paddingLeft: "2.4rem", marginBottom: "0.75rem" }}>
          <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-55)", margin: "0 0 0.3rem" }}>{sub.label}</p>
          {sub.body && <p style={{ fontSize: "0.9rem", color: "var(--text-50)", lineHeight: 1.8, margin: "0 0 0.4rem", paddingLeft: "1rem" }}>{sub.body}</p>}
          {sub.bullets && (
            <ul style={{ paddingLeft: "2.5rem", margin: "0.3rem 0 0", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {sub.bullets.map((b, j) => <li key={j} style={bulletStyle}>{b}</li>)}
            </ul>
          )}
        </div>
      ))}

      {s.footer && (
        <p style={{ ...bodyStyle, margin: "0.5rem 0 0" }}>{s.footer}</p>
      )}

      {s.contact && (
        <div style={{ paddingLeft: "2.4rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          {[
            s.contact.company,
            `Address: ${s.contact.address}`,
            `Tel 24×7: ${s.contact.tel}`,
            `Mobile: ${s.contact.mobile}`,
            `WhatsApp: ${s.contact.whatsapp}`,
          ].map((line, i) => (
            <p key={i} style={{ fontSize: "0.9rem", color: "var(--text-55)", margin: 0, lineHeight: 1.8 }}>{line}</p>
          ))}
          <p style={{ fontSize: "0.9rem", color: "var(--text-55)", margin: 0, lineHeight: 1.8 }}>
            Email: <a href={`mailto:${s.contact.email}`} style={{ color: "var(--accent)", textDecoration: "none" }}>{s.contact.email}</a>
          </p>
        </div>
      )}

      <div style={{ height: "1px", background: "var(--border-subtle)", marginTop: "2rem" }} />
    </section>
  );
}

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-45)", margin: 0 }}>
            Mann Fleet Partners Limited · Last updated 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 6vw, 4rem)" }}>
        {(SECTIONS as Section[]).map((s) => (
          <SectionBlock key={s.num} s={s} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
