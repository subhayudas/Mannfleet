# Services Pages Plan

## Current State

All 17 service slugs have data in `src/app/services/[slug]/page.tsx` — no service is missing from code. The 404s from the task list were a Vercel deployment lag; a push/redeploy clears them.

**Two real problems remain:**
1. Several services share the same hero image (looks lazy, hurts trust)
2. There is no `/services` index page — `src/app/services/page.tsx` does not exist. Services are only reachable via the homepage `#services` section or a direct URL.

---

## Image Audit — All 17 Services

| # | Slug | Current Image Folder | Status |
|---|------|----------------------|--------|
| 1 | `long-term` | Mercedes-Benz E-Class | ✅ Unique, appropriate |
| 2 | `spot` | Mercedes-Benz E-Class | ⚠️ Same folder as long-term |
| 3 | `shuttle` | Force Urbania | ✅ Appropriate van |
| 4 | `self-drive` | Hyundai Creta | ✅ Unique, appropriate |
| 5 | `event` | Vellfire | ✅ Luxury MPV, great for events |
| 6 | `pan-india-mobility` | Mercedes-Benz S-Class | ⚠️ Shares folder with high-profile-delegation & agm-board-meets |
| 7 | `film-shoots-concerts` | Rolls Royce | ⚠️ Shares folder with global-leaders & events-weddings; not entertainment-specific |
| 8 | `global-leaders-celebrities` | Rolls Royce | ✅ VIP — Rolls is appropriate |
| 9 | `conventions-exhibitions` | Volvo 39 seater | ⚠️ Shares folder with leagues-tournaments |
| 10 | `leasing` | Toyota Fortuner (real photo) | ✅ Good |
| 11 | `high-profile-delegation` | Mercedes-Benz S-Class | ⚠️ Shares folder with pan-india-mobility & agm-board-meets |
| 12 | `board-meetings` | BMW 7 Series | ✅ Unique, executive |
| 13 | `agm-board-meets` | Mercedes-Benz S-Class | ⚠️ Shares folder with pan-india-mobility & high-profile-delegation |
| 14 | `leagues-tournaments` | Volvo 39 seater | ⚠️ Shares folder with conventions-exhibitions |
| 15 | `events-weddings` | Rolls Royce | ✅ Luxury — appropriate for weddings |
| 16 | `town-hall-meetings` | Force Urbania | ⚠️ Shares folder with shuttle |
| 17 | `tourism` | Toyota Fortuner | ⚠️ Shares folder with leasing; could be more scenic |

---

## Phase 1 — Fix Shared Images (edit `[slug]/page.tsx` only)

All replacement images have been confirmed to exist in `public/`.

| Slug | Replace With | New Image Path |
|------|-------------|---------------|
| `spot` | Toyota Fortuner (parked, corporate look) | `/Mann car pictures/Toyota fortuner/ChatGPT Image May 4, 2026, 12_35_18 PM.png` |
| `film-shoots-concerts` | Range Rover Sport (on-location) | `/Mann car pictures/range rover sport/ChatGPT Image May 6, 2026, 03_38_44 PM.png` |
| `pan-india-mobility` | BMW X7 (flagship SUV, corporate fleet feel) | `/Mann car pictures/BMW X7/ChatGPT Image Apr 28, 2026, 08_23_47 PM.png` |
| `agm-board-meets` | BMW 7 Series (alternate unused file) | `/Mann car pictures/BMW 7 Series/ChatGPT Image Apr 28, 2026, 08_33_02 PM.png` |
| `conventions-exhibitions` | Toyota Coaster (large venue transport) | `/Mann car pictures/Toyota Coaster New Generation/ChatGPT Image May 4, 2026, 12_38_26 PM.png` |
| `leagues-tournaments` | Tempo Traveller (team bus) | `/Mann car pictures/Tempo traveller/ChatGPT Image May 15, 2026, 11_18_13 PM.png` |
| `town-hall-meetings` | Mercedes-Benz V-Class (group corporate) | `/Mann car pictures/Mercedes-Benz V-Class/ChatGPT Image Apr 26, 2026, 01_04_00 AM.png` |
| `tourism` | Taj Mahal backdrop (already in public/) | `/Taj mahal.jpeg` |

After these changes every service has a visually distinct, contextually appropriate hero image.

---

## Phase 2 — Create `/services` Index Page

**File to create:** `src/app/services/page.tsx`

### Layout (match existing site)

```
Navbar
│
├── Hero header
│     "Our Services"  ← Instrument Serif, large
│     subtitle: "From daily commutes to state-level delegations."
│     glass-badge: "17 service categories"
│
├── Service card grid  (3 col desktop → 2 → 1 mobile)
│     Each card (glass-card, rounded-2xl):
│       ├── Hero image  (pill crop, aspect ~16:7)
│       ├── Badge pill  (glass-badge — "corporate", "vip", etc.)
│       ├── Service name  (Instrument Serif, ~1.4rem)
│       ├── One-line description
│       └── "Explore →" link to /services/[id]
│
└── CTA strip
      "Not sure which service fits?  Talk to us →"  → /contact
│
Footer
```

### Data source
Import (or copy) the `SERVICES` array from `ServicesSection.tsx`. Each entry already has `id`, `text`, `badge`, `description`, `image`, `stat`, `statLabel` — everything needed for the cards.

### CSS classes to use
`glass-card`, `glass-badge`, `btn-primary`, `font-serif`, `font-sans`, `text-emboss` — all already in `globals.css`. No new styles needed.

### Animation
IntersectionObserver fade-in + translateY (same pattern as `ServicesSection.tsx` rows). Use `stagger` on cards by index × 60ms.

### Navbar link
Currently "Services" in the Navbar links to `/#services`. After this page is live, change it to `/services` so users can browse directly. Confirm with client first.

---

## Phase 3 — Richer Individual Pages (optional, client decision)

These services are high-value and could warrant a dedicated static page (overriding `[slug]` for that slug) with extra sections:

| Service | Extra section to add |
|---------|---------------------|
| `events-weddings` | Image gallery — Kia Carnival Limousine + Rolls Royce decorated images; testimonial placeholder |
| `tourism` | Landmark images (`/Taj mahal.jpeg`), curated route list |
| `pan-india-mobility` | Embed `IndiaMapLeaflet` component showing city coverage |
| `global-leaders-celebrities` | Security protocol list; emphasis on Protected vehicle options |
| `film-shoots-concerts` | Behind-the-scenes logistics breakdown |

Create as `src/app/services/events-weddings/page.tsx` etc. — Next.js gives static routes priority over `[slug]`, so the generic template stays for all others.

---

## Files to Touch

| File | Change | Phase |
|------|--------|-------|
| `src/app/services/[slug]/page.tsx` | Update 8 image paths | 1 |
| `src/app/services/page.tsx` | Create new listing page | 2 |
| `src/components/ServicesSection.tsx` | Optionally sync thumbnail images to match new hero images | 1 (optional) |
| `src/components/Navbar.tsx` | Change "Services" link from `/#services` to `/services` | 2 (after client OK) |

---

## Assets Confirmed Present

All images listed above were verified to exist in `public/` before writing this plan.

| Asset | Path | Used for |
|-------|------|----------|
| Taj Mahal | `/Taj mahal.jpeg` | tourism hero |
| Jewar Airport | `/jewar_airport.jpg` | could use for spot/shuttle airport imagery |
| Tourism video | `/6886022_Famous_Place_Tourism_1280x720.mp4` | optional video bg on tourism page |
| Range Rover Sport images | `/Mann car pictures/range rover sport/` | film-shoots hero |
| BMW X7 images | `/Mann car pictures/BMW X7/` | pan-india-mobility hero |
| Toyota Coaster images | `/Mann car pictures/Toyota Coaster New Generation/` | conventions hero |
| Tempo Traveller images | `/Mann car pictures/Tempo traveller/` | leagues hero |
| Mercedes V-Class images | `/Mann car pictures/Mercedes-Benz V-Class/` | town-hall hero |
| Kia Carnival Limousine images | `/Mann car pictures/Kia Carnival Limousine/` | events-weddings gallery (Phase 3) |
