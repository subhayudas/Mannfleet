@AGENTS.md

# Mannfleet — Codebase Context

> Keep this file updated whenever the codebase changes. It is the canonical context source for new sessions — do not re-read all files from scratch when this file is current.

---

## Project Identity

**Name:** MANN — Premium Car Rental (package name: `bionova`)
**Type:** Marketing/showcase website — purely client-side, no backend or database
**Purpose:** Premium chauffeur & car rental brand site with heavy visual storytelling
**Live site:** https://www.mannfleetpartners.com (Vercel, deploys from `subhayudas/Mannfleet` `main`; `mannfleet.vercel.app` is the same deployment). Verify client-facing changes here.
**Git workflow:** `origin` is the fork `CoffeeAurCode/Mannfleet_work`; `upstream` is `subhayudas/Mannfleet`. Branch from `upstream/main` after a `git fetch upstream`, because the fork's `main` lags behind. Then open the PR against `subhayudas/Mannfleet` for Subhayu to merge. Before saying a document is or isn't live, check the live URL, not local `main`.
**Checking the live site:** headless Chrome via Playwright (`channel="chrome"`, since the bundled Chromium has no H.264) works well. Use `wait_until="domcontentloaded"` plus a few seconds' wait, because the home page's `load` event takes over 30s while the hero video downloads. This PC runs Cloudflare WARP, and Chrome's HTTP/3 attempts sometimes fail with `net::ERR_TIMED_OUT` while curl succeeds, so launch with `--disable-quic`. That's a local network quirk, not the site. The Claude-in-Chrome tab reports `visibilityState: "hidden"`, which pauses GSAP reveals and defers media, so use it for clicks and DOM checks, not to judge animations or video. A sweep worth repeating after each merge: every route for console errors, 4xx/5xx and broken images; nav overflow (`scrollWidth - clientWidth` of `.pill-nav-items`) at 1440/1280/1200/1181px; and decoding the QR codes.
**Client requests:** `TODO.md` at the repo root tracks what the client asked, what's waiting on them, and what shipped. Read it before acting on a new WhatsApp message. The client often replies with a bare numbered list that answers the open questions there, in the same order, without quoting them. Map their numbers to `TODO.md` before treating the lines as new requests.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.2 (App Router) |
| Language | TypeScript 5, React 19 |
| Styling | Tailwind CSS v4 (PostCSS plugin) |
| Animation | GSAP 3.14.2 |
| Maps | Leaflet + react-leaflet |
| Video | HLS.js |
| WebGL | OGL |
| Fonts | Geist (variable, @fontsource), Instrument Serif (Google Fonts), Poppins |
| Dev server | `npm run dev` → localhost:3000 (uses `--webpack` flag) |

No database, no ORM, no auth. The only API route is `/api/chat`.

---

## Directory Structure

```
src/
  app/                   # Next.js App Router
    layout.tsx           # Root layout — ThemeProvider, LogoIntro, ContentReveal
    page.tsx             # Home page
    globals.css          # Design tokens + dark mode overrides
    about/page.tsx
    awards/page.tsx
    contact/page.tsx
    flagship-project/page.tsx
    fleet/page.tsx        # Vehicle catalog
    investors/page.tsx
    meet-the-team/page.tsx
    privacy/page.tsx
    reservation/page.tsx
    terms/page.tsx
    we-care/page.tsx      # CSR page
  components/
    Navbar.tsx            # Sticky pill nav, GSAP circle hover, theme toggle
    HeroSection.tsx       # Full-screen video hero, GSAP stagger, stats strip
    Footer.tsx            # Video-bg footer, CTA banner, social links
    PartnersMarquee.tsx   # Auto-scroll client marquee, canvas grain overlay
    BentoSection.tsx      # USP bento grid with video cards
    ServicesSection.tsx   # 4-service carousel with GSAP marquee ticker
    LogoIntro.tsx         # Fullscreen logo-animation splash (/mann-intro-logo.mp4)
    ChatWidget.tsx        # "MANN Concierge" chat bubble + panel, mounted in layout.tsx
    ContentReveal.tsx     # Fades in content after intro:done event fires
    IndiaMap.tsx          # Static map component
    IndiaMapLeaflet.tsx   # Leaflet-based interactive map
    MetaPixel.tsx         # Meta Pixel PageView-on-route-change + contact-link tracking
    AppDownload.tsx       # Home-page app block: store buttons + scannable QR codes
    GlimpsesSection.tsx   # Home-page press/deployment strip — muted looping video glimpses
    PillNav.css           # Pill nav styles
  lib/
    utils.ts              # cn() — clsx + tailwind-merge
    theme.tsx             # ThemeProvider + useTheme hook, localStorage key: 'mannfleet-theme'
    meta-pixel.ts         # Meta Pixel ID, base snippet, fbTrack()/fbTrackCustom() helpers
    intro.ts              # LogoIntro/ContentReveal shared state (see Intro gate below)
    contact.ts            # BOOKING_EMAIL / GENERAL_EMAIL / WHATSAPP_NUMBER
    app-links.ts          # Verified App Store + Play Store URLs and QR asset paths
    chatbot-knowledge.ts  # Concierge SYSTEM_PROMPT + site facts the bot answers from
public/
  investors/                   # Every document PDF, one folder per investors-page tab:
    ipo/ newspaper-advertisements/ constitutive-documents/ policies/
    corporate-information/ financial-statements/ board-reports/
    annual-reports/ annual-returns/ subsidiary-company/ group-company/
    csr-certificates/          # Linked from /we-care, not an investors tab
  legal/                       # Policies linked outside the investors page
  mann-intro-logo.mp4          # Intro clip — client's 1.6s logo animation, cropped to the logo, no audio
  mann-intro-logo.webp         # Its final frame — the still shown when autoplay is blocked
  glimpses/                    # Trimmed 12s muted clips + posters (see Glimpses below)
  Mann car pictures/           # Vehicle catalog images (200+ cars by model)
  cleints/                     # Client photos (marquee)
  teams/                       # Team member photos
  awards/                      # Award PDFs and images
  Appreciation/                # Certificate PDFs
  Partners/                    # Partner logos
  We care/                     # CSR images
  app-qr-ios.svg / app-qr-android.svg  # Generated store QR codes (see App & QR codes)
  (logos, SVGs, .mp4 videos)
notes/                         # Old task lists, client-request notes, explainers — not part of the build
client-docs-pending/           # Client PDFs not on the site yet + README saying why each is waiting
```

---

## Design System

**Color palette** (CSS custom properties in globals.css):

| Token | Light | Dark |
|---|---|---|
| `--bg-base` | `#F4EFE6` (warm beige) | `#1C1814` |
| `--bg-deeper` | slightly darker warm | `#100E0B` |
| `--text-primary` | `#2C2416` | `#EDE8E0` |
| `--accent` | Red `hsl(0 70% 52%)` | same |
| Glass surfaces | Ultra/Light/Mid/Strong variants | Dark amber-tinted variants |

**Typography:**
- Sans: Geist Variable
- Serif: Instrument Serif (headlines)
- Brand/fallback: Poppins

**UI patterns:** Pill shapes everywhere, liquid glass morphism, warm amber tones, skeuomorphic cards

**Dark mode:** Default is dark. Toggled via ThemeProvider, stored in `localStorage['mannfleet-theme']`. HTML gets `.dark` class unless value is `'light'`.

---

## Key Architectural Patterns

1. **All components are `"use client"`** — no server components in use yet (beyond the root layout and pages as server shells).
2. **Intro gate:** `LogoIntro` plays the client's ~1.6s logo animation fullscreen, then fades (client request, Oct 2026), **at most once per browser session** — `src/lib/intro.ts` records `sessionStorage['mannfleet_intro_seen']`, so reloads and inner-page loads skip straight to content. It is also click/Esc-skippable.
   `markIntroDone()` sets a module-level flag *and* dispatches `intro:done`. Consumers must check the flag, not just the event: `LogoIntro`'s effect commits before its siblings', so a synchronous skip (already seen, reduced motion) fires the event before a plain listener can subscribe. `ContentReveal` uses `useSyncExternalStore` for exactly this reason; `HeroSection` and `ChatWidget` read the sessionStorage key directly.
3. **Theme:** Inline `<script>` in `<head>` applies `.dark` before hydration to prevent flash. `ThemeProvider` then manages runtime toggling.
4. **Animation:** GSAP is used directly (no ScrollTrigger plugin imported — verify before adding scroll animations). All GSAP code lives inside `useEffect` with proper cleanup.
5. **Path alias:** `@/*` → `src/*`
6. **Images:** Remote images from `unsplash.com` are allowed in next.config.ts. All local assets live in `public/`.
7. **No mail backend** — the only API route is `/api/chat` (concierge widget, needs `OPENAI_API_KEY`). The reservation form has no server: submitting builds a formatted `mailto:` to `BOOKING_EMAIL` and hands it to the guest's mail client. There is therefore **no automatic thank-you email** — the guest must press send, and the success screen says so and offers reopen / copy / WhatsApp fallbacks because a `mailto:` can silently no-op.
8. **Booking destination** — every reservation query goes to `BOOKING_EMAIL` in `src/lib/contact.ts` (`support@mannfleetpartners.com`). Import it; don't hard-code the address.
9. **App & QR codes** — store URLs live in `src/lib/app-links.ts` and are verified live listings (App Store id `6770925992`, Play `com.user.mannfleet`). The QR SVGs in `public/` were generated with the `qrcode` npm package (installed with `--no-save`, then pruned) and decode-verified. Regenerate them only if a store URL changes. They exist because an App Store link clicked on a Mac hands off to the desktop Mac App Store, which cannot install an iPhone-only app.
10. **Glimpses (video loops):** Clips in `public/glimpses/` are pre-trimmed to 12s and stripped of audio with ffmpeg — the repo holds only the trimmed clips, never the raw source footage. Each `<video>` carries `preload="none"` plus a `poster`, so a tile costs only its poster JPEG until it actually plays. `src` is attached up front rather than gated behind the IntersectionObserver: the observer only starts/stops playback on scroll, which keeps the play button working where the observer is throttled (backgrounded tab, hidden pane). A manual pause is sticky — scrolling will not resume it — and `prefers-reduced-motion` skips autoplay entirely. The one exception to trim-and-strip is the featured BRICS film (`brics-film.mp4`, full 37s, re-encoded to 30fps with its AAC soundtrack kept): it sets `hasAudio`, still autoplays muted, and exposes an Unmute toggle beside play/pause.
11. **Client documents:** Everything in `public/` can be downloaded by URL, even when no page links to it. So `public/` holds **only files the site links to**. Never drafts, `.docx`/`.xlsx` working files, or documents the client has withdrawn. Removing a document from a page means deleting its file too; git history keeps the old copy.
    Client uploads arrive as loose files at the repo root, like `Signed_Board's Report_2025-26_Mann.pdf`. Anything that can't go live yet (waiting on client confirmation, unclear where it belongs) goes in `client-docs-pending/` with a row in its README. Before listing one:
    - check it is an ordinary PDF. XFA e-forms (`grep -c /XFA`, e.g. old MCA MGT-7A forms) show only "Please wait…" in browsers, so ask the client for a flattened copy.
    - compare its md5 against `public/` files, because clients often resend documents that are already live.
    - most arrive as scans without a text layer, so render a page or two to confirm what it actually is.
    - before removing anything, match the client's wording to the exact item on the page. "CSR receipt" means the handwritten donation receipt image, while a "utilization certificate" is the PDF in the Utilization Certificates list. Mixing these up once removed the wrong document.
    Then move it into its tab's folder with a clean hyphenated name (`public/investors/board-reports/Board-Report_2025-26.pdf`). List it newest year first in its tab, with `file:` set to the folder-relative path. Don't leave the original at the root.
    To **replace** a document, overwrite the file and keep its name, so shared links keep working.
    To confirm a document is live after the merge, wait for the Vercel production deployment of the merge commit to show `success` (`gh api repos/subhayudas/Mannfleet/deployments`, about 1–2 min). Then download the live URL and compare its md5 with the client's file; a 200 alone could be the old copy.
    The investors page builds its links client-side from `PDF_CATEGORIES`, so the file paths are in a `/_next/static/chunks/*.js` bundle, not in the page HTML. Grep the chunks, not the HTML.
    `next.config.ts` → `MOVED_INVESTOR_DOCS` redirects the old flat `/investors/<file>.pdf` URLs, from before the per-tab folders, to their new paths. If you move or rename a file that's already live, add a redirect for it too.
12. **Analytics (Meta Pixel):** Base snippet is inlined in `<head>` from `src/lib/meta-pixel.ts` (same pattern as the theme script) so it initialises before hydration; `<noscript>` fallback sits at the top of `<body>`. Because the App Router navigates client-side, `MetaPixel.tsx` re-fires `PageView` on every route change — it uses `useSearchParams`, so it **must stay wrapped in `<Suspense>`** or the production build fails and pages drop out of static rendering. Fire conversions with `fbTrack()` from `@/lib/meta-pixel`; never pass PII (name, phone, email) in event params.

---

## Pages — What Each Does

| Route | Content |
|---|---|
| `/` | Hero + PartnersMarquee + ServicesSection + BentoSection + GlimpsesSection + AppDownload |
| `/about` | Brand story, history, leadership |
| `/fleet` | Full vehicle catalog (200+ cars, organized by model) |
| `/awards` | Awards & recognition gallery |
| `/meet-the-team` | Team member profiles |
| `/investors` | Investor-relations document library — tabbed PDF lists (IPO, policies, financial statements, board/annual reports, annual returns, group companies) from `PDF_CATEGORIES` |
| `/flagship-project` | Showcase projects |
| `/we-care` | CSR / social responsibility content |
| `/contact` | Contact info + IndiaMap |
| `/reservation` | Booking UI (frontend only) |
| `/privacy` | Privacy policy |
| `/terms` | Terms and conditions |
| `/services` | Services overview; `/services/[slug]` plus five dedicated service pages (events-weddings, film-shoots-concerts, global-leaders-celebrities, pan-india-mobility, tourism) |
| `/faq` | Frequently asked questions, plus an "Ask Us" box (`#ask-a-question`) that opens WhatsApp with the visitor's question prefilled — a `wa.me` link, no backend |

---

## Components — Quick Reference

**Navbar:** Sticky, pill-shaped. GSAP animates a circle that follows cursor over nav links. Logo with hover effect. 9 nav links, then theme toggle, app QR button, Corporate and Book Now. The QR button (client request: "next to contact") opens `#nav-app-qr`, a panel with both store QR codes from `app-links.ts`. It closes on outside click or Escape. The panel is rendered in `.pill-nav-wrapper`, not inside `.pill-nav-items`, because that strip has `overflow-x: auto` and would clip a dropdown. It is always in the DOM and toggled with `hidden`, so the QR SVGs load with the page. Mounting it on click left the tiles blank for ~1.5s on the home page while the hero video downloaded. Keep one Navbar per rendered page, because the panel's `id` must be unique. The full bar is about 1175px wide, so `PillNav.css` tightens the pills below 1400px and 1260px, and swaps to the hamburger below 1180px. Re-measure (`scrollWidth` vs `clientWidth` of `.pill-nav-items`) after adding anything to the bar. The mobile menu has "Get the App" → `/#app` instead of QR codes.

**HeroSection:** Full-screen video background (dual gradient overlays). GSAP timeline staggers headline text, trust bullets (checkmarks), CTA buttons — "Browse Fleet" (`.btn-primary`) and "Book Now" (glass, straight to `/reservation`). Bottom strip shows stats and brand logos.

**Footer:** Video background. CTA banner with dot-grid + gradient. Logo, address, phone, email. Quick links. Social icons: Instagram, WhatsApp, Twitter, Facebook, LinkedIn.

**PartnersMarquee:** 17 client photos in auto-scrolling marquee. Canvas draws animated noise grain over it. Pauses on hover. Glass-morphism card styling.

**BentoSection:** Grid of USP cards. Chauffeur card shows live-updating ETA. Other cards have video backgrounds.

**ServicesSection:** 4 services — Long-Term, Spot, Self-Drive, Event. GSAP horizontal ticker marquee. Row-based layout with images.

**LogoIntro:** Plays `/mann-intro-logo.mp4` on black on first load and fades out when it ends. The clip is the client's `1s Logo.mp4` (actually 1.58s, 1080×1920, 60fps), cropped with ffmpeg to the 1080×540 logo band and stripped of audio — 143 KB. It ends on the full logo, which holds during the 250ms fade. `play()` is called explicitly so a blocked autoplay (iOS Low Power Mode, data saver) is caught and swaps in `/mann-intro-logo.webp`, the clip's final frame, for 1s. Fallbacks: 2.5s if the clip never starts, 4s ceiling once playing. Respects `prefers-reduced-motion`. Fires `intro:done` event when done. Testing note: a backgrounded Chrome tab defers media loading, so the clip sits at readyState 0 there and the 2.5s fallback fires; verify in a visible tab or headless Chrome (`channel="chrome"` — Playwright's bundled Chromium has no H.264).

**ChatWidget:** Floating "Concierge" button that opens the "MANN Concierge" chat panel, streaming from `/api/chat`. To rename the bot, change all of these: the FAB label, `aria-label`s and header title in `ChatWidget.tsx`, `SYSTEM_PROMPT` in `src/lib/chatbot-knowledge.ts`, and the "concierge" wording in the fallback messages in `src/app/api/chat/route.ts`.

**ContentReveal:** Wraps page content. Reads the intro store via `useSyncExternalStore`, then fades in. Prevents content flash during intro.

**AppDownload:** Home-page section (`id="app"`, linked from the footer as `/#app`). Store buttons plus a scannable QR code per platform, each on a solid white tile so scanners get contrast in both themes.

**GlimpsesSection:** Home-page section (`id="glimpses"`) showing two short muted video loops — CNBC Awaaz press coverage and delegate coach movement. Two-column editorial grid (7fr/5fr) that collapses to one column under 860px; each tile carries a badge, a play/pause control, and a caption. Below the grid, a featured row shows the vertical BRICS 2026 film (with sound, opt-in) beside a larger caption, and stacks under 860px. See the Glimpses pattern below.

**IndiaMapLeaflet:** Interactive Leaflet map showing office/service locations across India.

**MetaPixel:** Renders nothing. Fires `PageView` on client-side route changes (skipping the mount pass, which the inline `<head>` snippet already covers), and a delegated document-level click listener fires `Contact` for any `tel:` / `mailto:` / `wa.me` link site-wide — so those links need no per-anchor `onClick`.

**Team photos:** `public/teams/`, used by Meet the Team, the contact-page cards (`BRANCH_CONTACTS`) and the chat avatars. Every photo except Ashwani Kumar's (a tight B/W face crop) is cut out and placed on one warm studio-grey backdrop (radial `#ECE6DC` → `#C8BFB2`). The cutouts used rembg's `isnet-general-use` model in a scratch venv; `birefnet-portrait` ran out of memory on this machine. After cutting out, keep only the largest mask region (drops stray background bits) and tighten the soft mask edge (removes a halo of the old background colour). Give a new member photo the same treatment so the set stays uniform, and overwrite files in place so all three uses stay in sync.

**Fleet photos:** vehicles live in the `VEHICLES` array in [fleet/page.tsx](src/app/fleet/page.tsx). `image[0]` is the card cover, and cards crop to 16:9 (`cover` unless `imageObjectFit: "contain"`). Most existing photos are AI studio renders on a grey tiled backdrop. Real client photos (WhatsApp JPEGs, outdoors) go in `public/Mann car pictures/<Model>/` with clean hyphenated names, like `Invicto/invicto-black-front-1.jpeg`. A model listed under several types (e.g. Invicto under Sedans and SUVs) has a separate image array per entry, so update every one.

**Fleet → reservation:** the vehicle modal's Book Now is a `next/link` (never a plain `<a>` — that forces a full document load and re-runs the app shell) carrying `?vehicle=&category=`. The reservation page reads those with `useSyncExternalStore` over `window.location.search` rather than `useSearchParams`, which would force the route behind a Suspense boundary and drop the whole form out of the prerendered HTML.

**Tracked conversions:** `Lead` on reservation submit ([reservation/page.tsx](src/app/reservation/page.tsx)), `ViewContent` on opening a vehicle modal ([fleet/page.tsx](src/app/fleet/page.tsx)), `Contact` on phone/email/WhatsApp clicks (delegated, in MetaPixel).

---

## Scripts

```bash
npm run dev      # Start dev server (webpack mode) on :3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

## What to Keep Updated

When making changes, update the relevant section above:
- New page → add to Pages table
- New component → add to Components section
- New dependency → add to Tech Stack table
- Design token changes → update Design System section
- New architectural pattern → add to Key Architectural Patterns
