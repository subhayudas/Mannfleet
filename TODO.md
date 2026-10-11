## Waiting on the client (asked on WhatsApp, 11 Oct 2026)

The 11 Oct message reported everything from PRs #28, #30 and #31 together and asked three things. It replaced our 10 Oct WhatsApp, which was deleted. Their 10 Oct reply had answered our 8 Oct questions by number without quoting them, and point 1 never arrived.
- **1. Chatbot name:** asked them to resend point 1, which we think is the name. Currently "MANN Concierge"; see ChatWidget in CLAUDE.md for every place it appears.
- **2. Grand i10 Nios placement:** asked whether Sedans → Economy, next to the Aura, is right.
- **3. Team background and QR placement:** asked them to check both and say if they wanted a different colour or spot. We read their "any colour background" as the team photo backgrounds, and "next to contact" as the navbar, the only place where Contact sits next to Corporate. If they meant the page background or the footer, redo those.
- **Vehicle pictures:** they said "sending more". The first batch shipped in PR #28; add the rest when they arrive.

## Done

- 11 Oct: WhatsApp sent to the client reporting PRs #28, #30 and #31, with the three questions above. Live site re-checked after #31 first: all 14 routes clean, QR codes load before the panel opens (headless and real Chrome).
- 11 Oct: Thorough live check after PR #30. All 14 routes load with no console errors, failed requests or broken images. Every `public/teams` file md5-matches the repo, and the pages serve the new photos. The intro plays. The nav doesn't overflow at 1440/1280/1200/1181px, and the hamburger shows at 1180px. Both QR codes decode to the right store URLs. One fix shipped from it (PR #31): on the home page the QR tiles stayed blank for ~1.5s after opening, while the hero video was still downloading, so the panel is now always rendered (hidden) and the codes load with the page. The 483 asset paths referenced in pages all exist, so the GLE/GLS 404s in `notes/cars-needing-photos.md` are long fixed.
- 11 Oct: Built the two answers from the client's 10 Oct reply (PR #30). For point 2, every team member photo is cut out and placed on one warm studio-grey backdrop, across Meet the Team, the contact cards and the chat avatars. Ashwani Kumar's photo is a tight face crop and stays as it was. For point 4, a QR button between Contact and Corporate in the navbar opens the App Store and Google Play codes, and the mobile menu gets "Get the App". The nav pills also tighten on laptop widths so Book Now stops scrolling off the bar.
- 10 Oct: Intro now plays the client's `1s Logo.mp4` animation instead of the still ("Pls add this as the animation, don't fully remove it"). Real photos added: 2× black Invicto at the front of both Invicto galleries, and a new Hyundai Grand i10 Nios (white) card under Sedans → Economy (PR #28). Live files md5-verified, intro and cards checked in headless Chrome on the live site.
- 9 Oct (urgent, due 11am): Annual Report 2025-26 replaced with the client's full 116-page version, up from 71 pages (PR #27). Live copy md5-verified against the client's file and confirmed with them on WhatsApp.
- 8 Oct: Intro logo cut to 1 second, and an "Ask Us" box on `/faq` that sends the question to WhatsApp (PR #26, verified live).
- 5 Oct: Maharaja Agrasen Hospital utilisation certificate restored on We Care and the 13-3-24 donation receipt removed (PR #24). The client's "remove the CSR receipt" had been misread as "remove the certificate".
- Sept 30: Consolidated Financials 2025-26 added, Annual Report 2025-26 replaced (PR #23).
- Sept 23 chat: Board's Reports 2021-22 and 2022-23, Annual Report 2023-24, Industry Assessment Report added; restated report (31 Dec 2025) removed; Annual Return 2023-24 relabelled Form MGT-7 (PR via 9b6a91f).
