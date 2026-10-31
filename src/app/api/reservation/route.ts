import { BOOKING_EMAIL } from "@/lib/contact";
import { mailerConfigured, sendEmail } from "@/lib/mailer";
import { guestEmail, requestNumber, teamEmail, type Booking } from "@/lib/reservation-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FIELD_CHARS = 2000;
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

/** Every field the form sends. Anything else in the body is ignored. */
const FIELDS = [
  "guestName", "contactNumber", "emailAddress",
  "dateOfTravel", "endDate", "numberOfDays",
  "pickupTime", "cityName", "flightDetails", "airportName", "terminal", "hotelName", "reportingAddress",
  "dropoffLocation",
  "noOfPersons", "selectedVehicle", "vehiclePreferences", "vehicleType", "servicesRequired",
];

const REQUIRED = [
  "guestName", "contactNumber", "emailAddress", "dateOfTravel", "endDate",
  "pickupTime", "cityName", "dropoffLocation", "noOfPersons",
];

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const input = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const booking: Booking = {};
  for (const key of FIELDS) {
    const v = input[key];
    booking[key] = typeof v === "string" ? v.trim().slice(0, MAX_FIELD_CHARS) : "";
  }

  const missing = REQUIRED.filter((k) => !booking[k]);
  if (missing.length) {
    return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(booking.emailAddress)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!mailerConfigured()) {
    console.error("Reservation email not configured: set RESEND_API_KEY and RESERVATION_FROM");
    return Response.json({ error: "Booking email is unavailable right now." }, { status: 503 });
  }

  const ref = requestNumber();

  // 1. The booking itself → info@ only (support@ is for complaints). Reply
  //    goes straight to the guest. If this fails the booking has not reached
  //    us, so the caller must know.
  const teamSent = await sendEmail({
    to: BOOKING_EMAIL,
    replyTo: booking.emailAddress,
    ...teamEmail(booking, ref),
  });
  if (!teamSent) {
    return Response.json({ error: "We couldn't send your booking." }, { status: 502 });
  }

  // 2. Confirmation → the guest's own address. The booking is already safe
  //    with the team, so a failure here is reported but is not an error.
  const confirmationSent = await sendEmail({
    to: booking.emailAddress,
    replyTo: BOOKING_EMAIL,
    ...guestEmail(booking, ref),
  });

  return Response.json({ ok: true, ref, confirmationSent });
}
