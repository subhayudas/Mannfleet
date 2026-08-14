@AGENTS.md

# Mannfleet — Codebase Context

> Keep this file updated whenever the codebase changes. It is the canonical context source for new sessions — do not re-read all files from scratch when this file is current.

---

## Project Identity

**Name:** MANN — Premium Car Rental (package name: `bionova`)
**Type:** Marketing/showcase website — purely client-side, no backend or database
**Purpose:** Premium chauffeur & car rental brand site with heavy visual storytelling

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

No database, no ORM, no API routes, no auth.

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
    LogoIntro.tsx         # Fullscreen intro video overlay (/Maan Logo Animation_01.mp4)
    ContentReveal.tsx     # Fades in content after intro:done event fires
    IndiaMap.tsx          # Static map component
    IndiaMapLeaflet.tsx   # Leaflet-based interactive map
    MetaPixel.tsx         # Meta Pixel PageView-on-route-change + contact-link tracking
    PillNav.css           # Pill nav styles
  lib/
    utils.ts              # cn() — clsx + tailwind-merge
    theme.tsx             # ThemeProvider + useTheme hook, localStorage key: 'mannfleet-theme'
    meta-pixel.ts         # Meta Pixel ID, base snippet, fbTrack()/fbTrackCustom() helpers
public/
  Maan Logo Animation_01.mp4   # Intro video
  Mann car pictures/           # Vehicle catalog images (200+ cars by model)
  cleints/                     # Client photos (marquee)
  teams/                       # Team member photos
  awards/                      # Award PDFs and images
  Appreciation/                # Certificate PDFs
  Partners/                    # Partner logos
  We care/                     # CSR images
  (logos, SVGs, .mp4 videos)
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
2. **Intro gate:** `LogoIntro` renders a fullscreen video overlay. On completion it dispatches `new Event('intro:done')` on `window`. `ContentReveal` listens for this and fades in the page.
3. **Theme:** Inline `<script>` in `<head>` applies `.dark` before hydration to prevent flash. `ThemeProvider` then manages runtime toggling.
4. **Animation:** GSAP is used directly (no ScrollTrigger plugin imported — verify before adding scroll animations). All GSAP code lives inside `useEffect` with proper cleanup.
5. **Path alias:** `@/*` → `src/*`
6. **Images:** Remote images from `unsplash.com` are allowed in next.config.ts. All local assets live in `public/`.
7. **No API routes** — contact forms, reservations etc. are UI-only placeholders (no backend wired).
8. **Analytics (Meta Pixel):** Base snippet is inlined in `<head>` from `src/lib/meta-pixel.ts` (same pattern as the theme script) so it initialises before hydration; `<noscript>` fallback sits at the top of `<body>`. Because the App Router navigates client-side, `MetaPixel.tsx` re-fires `PageView` on every route change — it uses `useSearchParams`, so it **must stay wrapped in `<Suspense>`** or the production build fails and pages drop out of static rendering. Fire conversions with `fbTrack()` from `@/lib/meta-pixel`; never pass PII (name, phone, email) in event params.

---

## Pages — What Each Does

| Route | Content |
|---|---|
| `/` | Hero + BentoSection + ServicesSection + PartnersMarquee |
| `/about` | Brand story, history, leadership |
| `/fleet` | Full vehicle catalog (200+ cars, organized by model) |
| `/awards` | Awards & recognition gallery |
| `/meet-the-team` | Team member profiles |
| `/investors` | Investor pitch content |
| `/flagship-project` | Showcase projects |
| `/we-care` | CSR / social responsibility content |
| `/contact` | Contact info + IndiaMap |
| `/reservation` | Booking UI (frontend only) |
| `/privacy` | Privacy policy |
| `/terms` | Terms and conditions |

---

## Components — Quick Reference

**Navbar:** Sticky, pill-shaped. GSAP animates a circle that follows cursor over nav links. Hamburger for mobile. Theme toggle button. Logo with hover effect. 9 nav links.

**HeroSection:** Full-screen video background (dual gradient overlays). GSAP timeline staggers headline text, trust bullets (checkmarks), CTA buttons ("Browse Fleet", "How it works"). Bottom strip shows stats and brand logos.

**Footer:** Video background. CTA banner with dot-grid + gradient. Logo, address, phone, email. Quick links. Social icons: Instagram, WhatsApp, Twitter, Facebook, LinkedIn.

**PartnersMarquee:** 17 client photos in auto-scrolling marquee. Canvas draws animated noise grain over it. Pauses on hover. Glass-morphism card styling.

**BentoSection:** Grid of USP cards. Chauffeur card shows live-updating ETA. Other cards have video backgrounds.

**ServicesSection:** 4 services — Long-Term, Spot, Self-Drive, Event. GSAP horizontal ticker marquee. Row-based layout with images.

**LogoIntro:** Plays `/Maan Logo Animation_01.mp4` fullscreen on first load. Respects `prefers-reduced-motion`. Has autoplay fallback. Fires `intro:done` event when done.

**ContentReveal:** Wraps page content. Listens for `intro:done`, then fades in. Prevents content flash during intro.

**IndiaMapLeaflet:** Interactive Leaflet map showing office/service locations across India.

**MetaPixel:** Renders nothing. Fires `PageView` on client-side route changes (skipping the mount pass, which the inline `<head>` snippet already covers), and a delegated document-level click listener fires `Contact` for any `tel:` / `mailto:` / `wa.me` link site-wide — so those links need no per-anchor `onClick`.

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
