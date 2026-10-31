## 31 Oct 2026 — booking email fixes (WhatsApp + marked-up email printout)

1. **Bookings → info@ only**, not support@. Support@ is for complaints and other problems, like a client who can't make a booking. Built: the booking email goes to info@ alone; support@ stays on the footer's App support, the guest email's helpline row and signature, and a "Still stuck?" line on the failed-send screen.
2. **No. of Days counts both ends**: 31 Oct → 1 Nov = 2 days. Built.
3. **"Residence Address" → "Reporting Address"** on the form and in the email. Built.
4. **Vehicle Type = the cars in that segment.** Their printout had "Economy (segment)" with "Dzire, Hyundai Aura, Hyundai Accent" written next to Vehicle Type. Built: Vehicle Type is now a dropdown of the cars in the chosen Vehicle Preference, from the fleet page plus Dzire and Accent, which aren't on the fleet page. Other segments' lists were made from the fleet page, so the client should check them.
5. **WhatsApp for booking queries: 9810008008.** That was already the site's WhatsApp number; it's now shown on the form and in the guest email.
6. **"Verify on mail also"**: after the merge deploys, submit a test booking and confirm it arrives at info@ only.
- **Vercel env fix:** their printout's From line read `RESERVATION_FROM=MANN Fleet Partners <noreply@…>`, so the Vercel value includes its own key name. Change the value to `MANN Fleet Partners <noreply@mannfleetpartners.com>` and redeploy.
- Their other questions (code sent to Mann Fleet? SEO updates? Google Ads?) are for Pranav to answer, not code.

## 28 Oct 2026 — reservation emails (WhatsApp)

1. **Bookings → support@**, **guest gets a confirmation** in the format of their own "Reservation Confirmation Details" mail, and the booking details ("auto fetched": date of travel, end date, city, airport, hotel, residence, drop-off) **also go to info@**. Built: one booking email to support@ + info@, and the guest copy in their table format. Sent from `noreply@mannfleetpartners.com` via Resend. Their second sample (vehicle no., driver name/mobile) is sent after a car is allotted, so the website can't send it.
2. **"Airport Name" → "Airport Name / Residence"**, and a **Vehicle Type** field under Vehicle Preferences (Sedan, SUV / MUV, Tempo Traveller, Coach / Bus, Vanity Van; pre-filled from the fleet card's type). Built.
- **Waiting on:** `RESEND_API_KEY` and `RESERVATION_FROM` set in Vercel (Production), then a redeploy. Until then the live form shows the manual fallback.

## 19 Oct 2026 — "Website changes" Google Doc

Sent as a Google Doc plus Subhayu's forward of the client's "Integration of the financial system in our website" email thread.
1. **Add these company names** (25-row table pasted as an image). Ten already had logos in the home-page marquee. All 25 now run as a names row under the logos (PR #33, live 19 Oct, checked in real Chrome in dark and light mode). Casing was normalised and billing locations like "(Karnataka)" dropped. "J S Summits, Ministry of External Affairs" and "Ministry of External Affairs" are kept as two entries, as the client listed them.
2. **Payment gateway possibilities** — answer the client; no code yet. Their Mann Tours site has `manntours.com/Atompay/` (Atom / NTT DATA, cards) and `manntours.com/RazorPay/`, each a PHP form (amount, name, email, mobile, address) that redirects to the gateway, which emails the customer a receipt. Mann Fleet Partners Limited is the same company renamed ("Previously known as Mann Tourist Transport Service Limited" in their signatures), so no new gateway account is needed. Both existing accounts still show the old name: the Atom receipt says "MANN TOURIST TRANSPORT SERVICE PVT LTD B2C", and `rzp.io/l/Ed2PYJw` says "MANN TOURIST TRANSPORT SERVICE PRIVATE LIMITED". The client asks Atom and Razorpay to update the business name and approve `mannfleetpartners.com`, then shares the API keys securely. After that we build a `/pay` page plus server routes (keys in Vercel env vars). The "QR code and payment receipt" mentioned in the thread weren't in the forward.
3. **Car images** — client will send; same as "Vehicle pictures" below.

**Sent on WhatsApp, 19 Oct**, numbered like the doc. 1 reported the names live. 2 said the existing Atom and Razorpay accounts can be reused, and asked them to (a) get the business name changed and `mannfleetpartners.com` approved, (b) share the API keys securely. It ended with the one open question: **Atom, Razorpay, or only one?** 3 said we'll upload car images when they arrive. A bare "both" or "Razorpay" in their reply answers point 2. We didn't ask about merging the two Ministry of External Affairs names.

## Waiting on the client (asked on WhatsApp, 11 Oct 2026)

The 11 Oct message reported everything from PRs #28, #30 and #31 together and asked three things. It replaced our 10 Oct WhatsApp, which was deleted. Their 10 Oct reply had answered our 8 Oct questions by number without quoting them, and point 1 never arrived.
- **1. Chatbot name:** asked them to resend point 1, which we think is the name. Currently "MANN Concierge"; see ChatWidget in CLAUDE.md for every place it appears.
- **2. Grand i10 Nios placement:** asked whether Sedans → Economy, next to the Aura, is right.
- **3. Team background and QR placement:** asked them to check both and say if they wanted a different colour or spot. We read their "any colour background" as the team photo backgrounds, and "next to contact" as the navbar, the only place where Contact sits next to Corporate. If they meant the page background or the footer, redo those.
- **Vehicle pictures:** they said "sending more". The first batch shipped in PR #28; add the rest when they arrive.

## Done

- 19 Oct: Client names live (PR #33). On the live home page: 25 names, no broken logos, no console errors or failed requests, no horizontal overflow; the "Our Clients" heading now reads in light mode. Deployment of merge commit `882893e` reported `success`.

- 11 Oct: WhatsApp sent to the client reporting PRs #28, #30 and #31, with the three questions above. Live site re-checked after #31 first: all 14 routes clean, QR codes load before the panel opens (headless and real Chrome).
- 11 Oct: Thorough live check after PR #30. All 14 routes load with no console errors, failed requests or broken images. Every `public/teams` file md5-matches the repo, and the pages serve the new photos. The intro plays. The nav doesn't overflow at 1440/1280/1200/1181px, and the hamburger shows at 1180px. Both QR codes decode to the right store URLs. One fix shipped from it (PR #31): on the home page the QR tiles stayed blank for ~1.5s after opening, while the hero video was still downloading, so the panel is now always rendered (hidden) and the codes load with the page. The 483 asset paths referenced in pages all exist, so the GLE/GLS 404s in `notes/cars-needing-photos.md` are long fixed.
- 11 Oct: Built the two answers from the client's 10 Oct reply (PR #30). For point 2, every team member photo is cut out and placed on one warm studio-grey backdrop, across Meet the Team, the contact cards and the chat avatars. Ashwani Kumar's photo is a tight face crop and stays as it was. For point 4, a QR button between Contact and Corporate in the navbar opens the App Store and Google Play codes, and the mobile menu gets "Get the App". The nav pills also tighten on laptop widths so Book Now stops scrolling off the bar.
- 10 Oct: Intro now plays the client's `1s Logo.mp4` animation instead of the still ("Pls add this as the animation, don't fully remove it"). Real photos added: 2× black Invicto at the front of both Invicto galleries, and a new Hyundai Grand i10 Nios (white) card under Sedans → Economy (PR #28). Live files md5-verified, intro and cards checked in headless Chrome on the live site.
- 9 Oct (urgent, due 11am): Annual Report 2025-26 replaced with the client's full 116-page version, up from 71 pages (PR #27). Live copy md5-verified against the client's file and confirmed with them on WhatsApp.
- 8 Oct: Intro logo cut to 1 second, and an "Ask Us" box on `/faq` that sends the question to WhatsApp (PR #26, verified live).
- 5 Oct: Maharaja Agrasen Hospital utilisation certificate restored on We Care and the 13-3-24 donation receipt removed (PR #24). The client's "remove the CSR receipt" had been misread as "remove the certificate".
- Sept 30: Consolidated Financials 2025-26 added, Annual Report 2025-26 replaced (PR #23).
- Sept 23 chat: Board's Reports 2021-22 and 2022-23, Annual Report 2023-24, Industry Assessment Report added; restated report (31 Dec 2025) removed; Annual Return 2023-24 relabelled Form MGT-7 (PR via 9b6a91f).
