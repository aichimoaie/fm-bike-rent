# Filio's Bike

Scooter rental site for a small electric-scooter rental operator in Tamraght /
Taghazout, Morocco. Public marketing page and a live availability view; every
booking action is a `wa.me` WhatsApp deep link — there is no standalone
reservation form/page — matching how the owner already runs bookings over
WhatsApp/Instagram DMs. Visual design (colors, fonts, header/burger nav,
floating WhatsApp button) follows the reference site
ebike-agadir-adventures.com.

## Stack

- **SvelteKit** (Svelte 5, TypeScript) with `adapter-node`, chosen for server-side
  rendering of the public pages (title/meta tags, semantic headings, fast first
  paint) — important for the SEO goal (ranking for "rent a scooter tamraght" etc.)
  — while still giving a real Node backend for the API routes below.
- **better-sqlite3** for persistence (scooters + reservations). Single file DB,
  no hosted database needed at this scale.
- **Tailwind CSS v4** for styling.
- No auth system for customers. No WhatsApp Business API/Twilio — booking
  confirmation uses a plain `wa.me` deep link per the owner's explicit decision
  (see `report.md` referenced in the original brief).

## Running locally

```sh
npm install
cp .env.example .env   # fill in PUBLIC_OWNER_WHATSAPP_NUMBER and ADMIN_PASSWORD
npm run dev
```

The SQLite file (`data.sqlite3` by default, override with `DATABASE_PATH`) is
created and seeded with 3 placeholder scooters automatically on first run.

`npm run build && node build/index.js` runs the production build (reads `PORT`,
defaults to 3000, and `DATABASE_PATH`).

## What still needs to be filled in before going live

1. **Owner's WhatsApp number** — set in `.env` (not committed; `.env` is
   gitignored). Currently set to `212623201547` (i.e. +212 623-201547, from
   `PUBLIC_OWNER_WHATSAPP_NUMBER`, digits only, international format, no `+`;
   see `.env.example` and `src/lib/config.ts`). Whoever deploys this needs to
   set the same value in the hosting environment's env vars — it isn't baked
   into the repo.
2. **Owner's Instagram handle** — set in `.env` via
   `PUBLIC_OWNER_INSTAGRAM_HANDLE`, currently `eco.kephyra`
   (https://www.instagram.com/eco.kephyra/), used in the homepage Instagram
   section's "Follow @..." link.
3. **Google + TripAdvisor review links** — set in `.env` via
   `PUBLIC_GOOGLE_REVIEW_URL` and `PUBLIC_TRIPADVISOR_URL`, currently
   placeholder URLs (the business has no real listing on either platform
   yet). Used by the homepage Reviews section's two buttons. The section
   intentionally shows no star ratings/review counts since none exist —
   swap in the real listing URLs once they exist and it's ready as-is.
4. **Real scooter data & photos** — scooters are seeded in
   `src/lib/server/db.ts` (name, model, price, description) with an emoji
   placeholder instead of a photo on the landing page. Either edit the seed
   data and re-run against a fresh DB, or add rows directly via SQLite
   (`sqlite3 data.sqlite3`) — there is no scooter-editing UI in v1, by design
   (see Admin shortcut below).
5. **Hero image** — currently the reference site's placeholder canyon photo.
   Captain plans to supply a real brand image/logo + caption. Swap path is
   a single constant: `HERO_IMAGE` in `src/lib/config.ts` (points at a file
   in `static/images/`); the caption text lives in the hero section of
   `src/routes/+page.svelte` (and its translations in
   `src/lib/i18n/translations.ts`) if that also needs changing.
6. **Why-choose-us section photos/copy** — currently placeholder fleet
   photos and generic copy (`why_choose_us` in
   `src/lib/i18n/translations.ts`, images in `+page.svelte`'s
   `whyChooseUsImages`). Captain will supply real photos and caption text.
7. **Domain & hosting** — not configured. The app is a standard Node
   SvelteKit app (`adapter-node`), deployable as-is to Fly.io/a VPS/Render/etc.,
   or swap the adapter for Vercel/Netlify if preferred. No domain-specific
   assumptions are baked in (OG/sitemap URLs are derived from the request
   origin at runtime).

## Admin shortcut (v1)

Reservations have a workflow: every booking starts as `pending`. The owner
reviews and confirms (or cancels) it at **`/admin`**, protected by HTTP Basic
Auth — username `admin`, password from the `ADMIN_PASSWORD` env var
(`src/hooks.server.ts` reads it via `$env/dynamic/private`, not raw
`process.env`, so it loads correctly under both `npm run dev` and
`node build/index.js`). The admin page returns 503 if `ADMIN_PASSWORD` isn't
set, and 401 until you authenticate. Cancelling a reservation frees its dates
back up (cancelled reservations don't block new bookings or show as busy on
`/availability`).

There is still no UI for editing scooters themselves — manage the `scooters`
table directly via SQLite (`sqlite3 data.sqlite3`). This is an intentional
shortcut for a single-operator, handful-of-scooters business; revisit if the
fleet or reservation volume grows.

## Key behaviors

- **Booking is WhatsApp-only**: there is no `/reserve` form. Every "Book"
  button across the site (`src/lib/whatsapp.ts` builds the link) opens a
  `wa.me/<owner number>?text=...` deep link pre-filled with the scooter (and
  dates, where known) — a floating WhatsApp button (`WhatsAppFloat.svelte`) is
  present on every page too.
- **Reservation recording on `/availability` only**: the homepage's scooter
  cards and the floating/header/footer buttons open WhatsApp directly with no
  server call — there's no date context to record there. The `/availability`
  page's booking widget, where a visitor *does* pick dates, still calls
  `POST /api/reservations` (unchanged backend, still `pending` by default)
  before opening WhatsApp, so `/admin` keeps having real reservations to
  confirm/cancel against. This was an implementation judgment call: recording
  only where dates are actually known avoids fabricating placeholder
  date ranges for homepage clicks, while keeping `/admin` non-empty.
- **Double-booking prevention**: `POST /api/reservations` checks for an
  overlapping date range and inserts the reservation inside a single SQLite
  transaction (`src/lib/server/db.ts`), so two concurrent submissions can't
  both slip past the check.
- **SEO**: every public route sets `<title>`/meta description/OG tags via
  `src/lib/components/SeoHead.svelte`, uses semantic `<h1>`/`<h2>` headings
  mentioning Tamraght/Taghazout, and `/robots.txt` + `/sitemap.xml` are served
  dynamically (`src/routes/robots.txt`, `src/routes/sitemap.xml`).
- **Multi-language**: the header's language switcher (`src/lib/i18n/`) fully
  translates the site into English, French, Dutch, German, Spanish, Italian
  and Arabic (Arabic also flips the page to RTL), including WhatsApp message
  text. The chosen language persists in `localStorage`. Page `<title>`/meta
  tags stay English-only (they're server-rendered before the client picks a
  language) — see `src/lib/i18n/translations.ts` to add or edit copy.
- **Reviews section**: homepage section linking out to Google and TripAdvisor
  (`PUBLIC_GOOGLE_REVIEW_URL` / `PUBLIC_TRIPADVISOR_URL`) — deliberately shows
  no ratings/review counts since neither listing exists yet; don't add
  fabricated numbers here later without a real listing to back them.
