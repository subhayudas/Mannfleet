/**
 * The two reservation emails, laid out like the client's own booking mails
 * (plain serif text, bordered two-column tables, their signature block):
 *  - teamEmail: the booking → info@
 *  - guestEmail: the "Reservation Confirmation Details" copy → the guest
 */

import { BOOKING_EMAIL, SUPPORT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/contact";
import { escapeHtml } from "@/lib/mailer";

export type Booking = Record<string, string>;

type Row = [label: string, value: string];

const SITE = "www.mannfleetpartners.com";

const HELPLINE = "+91-11-47202122 / +91-11-46202122";
const MOBILE = "+91-9990222999, +91-9891919292";
const HEAD_OFFICE = "A34, Okhla Industrial Area, Phase-1, New Delhi-110020, India";

/** Header values (subject) must be a single line. */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** 2026-09-30 → 30-SEP-2026, the client's date style. */
function formatDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}-${MONTHS[Number(m[2]) - 1]}-${m[1]}` : iso;
}

/** Short reference both emails carry, so support and guest quote the same thing. */
export function requestNumber(now = new Date()) {
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const ymd = ist.toISOString().slice(2, 10).replace(/-/g, "");
  return `WEB-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`;
}

const join = (parts: string[], sep = ", ") => parts.filter(Boolean).join(sep);

function reportingPlace(b: Booking) {
  const airport = join([b.airportName, b.terminal]);
  return join([airport, b.hotelName, b.reportingAddress], "; ");
}

function reportingDateTime(b: Booking) {
  return join([b.pickupTime, formatDate(b.dateOfTravel)], " / ");
}

const days = (b: Booking) =>
  b.numberOfDays ? `${b.numberOfDays} day${b.numberOfDays === "1" ? "" : "s"}` : "";

/* ── Rendering ─────────────────────────────────────────────── */

const FONT = `font-family:'Times New Roman',Times,Georgia,serif`;
const CELL = "border:1px solid #444;padding:3px 8px;vertical-align:top";

function tableHtml(rows: Row[]) {
  const body = rows
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="${CELL};background:#f2f2f2;font-weight:bold;white-space:nowrap;font-size:13px">${escapeHtml(label)}</td>` +
        `<td style="${CELL};font-size:13px">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:2px 0 10px;${FONT}">${body}</table>`;
}

function tableText(rows: Row[]) {
  return rows.filter(([, v]) => v).map(([label, value]) => `  ${label}: ${value}`).join("\n");
}

const heading = (text: string) => `<div style="font-size:17px;margin-top:6px">${escapeHtml(text)}</div>`;

const shell = (inner: string) =>
  `<div style="${FONT};font-size:16px;line-height:1.35;color:#000;max-width:640px">${inner}</div>`;

const link = (href: string, text: string) =>
  `<a href="${href}" style="color:#1a5f8a">${escapeHtml(text)}</a>`;

const SIGNATURE_HTML =
  `<div style="margin-top:14px">Thanks and Best Regards,<br>` +
  `<strong>Mann Fleet Partners Limited</strong><br>` +
  `24x7 Helpline-Ph: ${HELPLINE}<br>` +
  `Mob: ${MOBILE}<br>` +
  `Head Office: ${HEAD_OFFICE}<br>` +
  `Email: ${link(`mailto:${SUPPORT_EMAIL}`, SUPPORT_EMAIL)}<br>` +
  `Websites: ${link("https://www.manntours.com", "www.manntours.com")} | ${link(`https://${SITE}`, SITE)}</div>`;

const SIGNATURE_TEXT = [
  "Thanks and Best Regards,",
  "Mann Fleet Partners Limited",
  `24x7 Helpline-Ph: ${HELPLINE}`,
  `Mob: ${MOBILE}`,
  `Head Office: ${HEAD_OFFICE}`,
  `Email: ${SUPPORT_EMAIL}`,
  `Websites: www.manntours.com | ${SITE}`,
].join("\n");

/* ── The emails ────────────────────────────────────────────── */

type Email = { subject: string; text: string; html: string };

/** The booking for the team. Sectioned like the client's vehicle-detail mail. */
export function teamEmail(b: Booking, ref: string): Email {
  const sections: [string, Row[]][] = [
    [
      "Guest Details",
      [
        ["Guest Name", b.guestName],
        ["Mobile", b.contactNumber],
        ["Email", b.emailAddress],
        ["Request No", ref],
      ],
    ],
    [
      "Reporting Details",
      [
        ["Date of Travel", formatDate(b.dateOfTravel)],
        ["End Date", formatDate(b.endDate)],
        ["No. of Days", days(b)],
        ["Reporting Time", b.pickupTime],
        ["City Name", b.cityName],
        ["Airport Name / Residence", b.airportName],
        ["Terminal", b.terminal],
        ["Flight Details", b.flightDetails],
        ["Hotel Name", b.hotelName],
        ["Reporting Address", b.reportingAddress],
        ["Drop-off Location", b.dropoffLocation],
      ],
    ],
    [
      "Requirements",
      [
        ["No. of Persons", b.noOfPersons],
        ["Vehicle (from fleet page)", b.selectedVehicle],
        ["Vehicle Preference", b.vehiclePreferences],
        ["Vehicle Type", b.vehicleType],
        ["Services Required", b.servicesRequired],
      ],
    ],
  ];

  const guest = oneLine(b.guestName);
  const vehicle = oneLine(b.selectedVehicle || b.vehicleType);
  return {
    subject: `New reservation ${ref} — ${join([guest, oneLine(b.cityName), formatDate(b.dateOfTravel), vehicle], " — ")}`,
    text:
      `New reservation request from ${SITE}\nReply to this email to reach the guest.\n\n` +
      sections.map(([h, rows]) => `${h.toUpperCase()}\n${tableText(rows)}`).join("\n\n"),
    html: shell(
      `<div>New reservation request from <strong>${SITE}</strong>.</div>` +
        `<div style="font-size:13px;color:#555;margin-bottom:6px">Reply to this email to reach the guest.</div>` +
        sections.map(([h, rows]) => heading(h) + tableHtml(rows)).join(""),
    ),
  };
}

/** The guest's copy, in the client's "Reservation Confirmation Details" format. */
export function guestEmail(b: Booking, ref: string): Email {
  const rows: Row[] = [
    ["Guest Name", b.guestName],
    ["Guest Contact Details", join([b.contactNumber, b.emailAddress])],
    ["Request No", ref],
    ["Reporting Address", reportingPlace(b)],
    ["Reporting City", b.cityName],
    ["Reporting Date / Time", reportingDateTime(b)],
    ["End Date", formatDate(b.endDate)],
    ["No. of Days", days(b)],
    ["Arrival / Duty Details", b.flightDetails],
    ["Drop-off Location", b.dropoffLocation],
    ["No. of Persons", b.noOfPersons],
    ["Vehicle", b.selectedVehicle],
    ["Vehicle Preference", b.vehiclePreferences],
    ["Vehicle Type", b.vehicleType],
    ["Special Requests", b.servicesRequired],
    ["24X7 Mann Help Line", `+91 11 47202122, +919891919292, +919990222999\n${SUPPORT_EMAIL}`],
    ["WhatsApp (Booking Queries)", WHATSAPP_DISPLAY],
    ["Feedback", BOOKING_EMAIL],
  ];

  return {
    subject: `Reservation request received — ${ref} — Mann Fleet Partners Limited`,
    text: [
      "Dear Sir/Madam,",
      "Greetings from Mann Fleet Partners Limited!",
      "We have received your reservation request for the below services. Our team will confirm it within 2 hours.",
      "",
      "RESERVATION REQUEST DETAILS",
      tableText(rows),
      "",
      `Please do not reply to this email; it is auto-generated. For changes, write to ${BOOKING_EMAIL}.`,
      `For terms and conditions, please visit https://${SITE}/terms`,
      "",
      SIGNATURE_TEXT,
    ].join("\n"),
    html: shell(
      `Dear Sir/Madam,<br>` +
        `Greetings from <strong>Mann Fleet Partners Limited</strong>!<br>` +
        `We have received your reservation request for the below services. Our team will confirm it within 2 hours.` +
        `<div style="font-size:17px;font-weight:bold;margin-top:4px">Reservation Request Details</div>` +
        tableHtml(rows) +
        `<em>Please do not reply to this email; it is auto-generated. For changes, write to ` +
        `${link(`mailto:${BOOKING_EMAIL}`, BOOKING_EMAIL)}.<br>` +
        `For terms and conditions, please visit ${link(`https://${SITE}/terms`, SITE)}</em>` +
        SIGNATURE_HTML,
    ),
  };
}
