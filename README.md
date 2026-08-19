# Filio's Bike

Scooter rental reservation site for a small electric-scooter rental operator in
Tamraght / Taghazout, Morocco. Public marketing page, live availability view, and a
reservation form that hands off to WhatsApp for confirmation — matching how the
owner already runs bookings over WhatsApp/Instagram DMs.

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

1. **Owner's WhatsApp number** — set in `.env`. Currently set to
   `40770141357` (from `PUBLIC_OWNER_WHATSAPP_NUMBER`, digits only,
   international format, no `+`; see `.env.example` and `src/lib/config.ts`).
   Double-check this is the correct, final number before going live.
2. **Real scooter data & photos** — scooters are seeded in
   `src/lib/server/db.ts` (name, model, price, description) with an emoji
   placeholder instead of a photo on the landing page. Either edit the seed
   data and re-run against a fresh DB, or add rows directly via SQLite
   (`sqlite3 data.sqlite3`) — there is no scooter-editing UI in v1, by design
   (see Admin shortcut below).
3. **Domain & hosting** — not configured. The app is a standard Node
   SvelteKit app (`adapter-node`), deployable as-is to Fly.io/a VPS/Render/etc.,
   or swap the adapter for Vercel/Netlify if preferred. No domain-specific
   assumptions are baked in (OG/sitemap URLs are derived from the request
   origin at runtime).

## Admin shortcut (v1)

Reservations have a workflow: every booking starts as `pending`. The owner
reviews and confirms (or cancels) it at **`/admin`**, protected by HTTP Basic
Auth — username `admin`, password from the `ADMIN_PASSWORD` env var. The
admin page returns 503 if `ADMIN_PASSWORD` isn't set, and 401 until you
authenticate. Cancelling a reservation frees its dates back up (cancelled
reservations don't block new bookings or show as busy on `/availability`).

There is still no UI for editing scooters themselves — manage the `scooters`
table directly via SQLite (`sqlite3 data.sqlite3`). This is an intentional
shortcut for a single-operator, handful-of-scooters business; revisit if the
fleet or reservation volume grows.

## Key behaviors

- **Double-booking prevention**: `POST /api/reservations` checks for an
  overlapping date range and inserts the reservation inside a single SQLite
  transaction (`src/lib/server/db.ts`), so two concurrent submissions can't
  both slip past the check.
- **WhatsApp handoff**: on a successful reservation, the reserve page builds a
  `wa.me/<owner number>?text=...` link summarizing the booking and opens it in
  a new tab (with a fallback link on the page in case the popup is blocked).
- **SEO**: every public route sets `<title>`/meta description/OG tags via
  `src/lib/components/SeoHead.svelte`, uses semantic `<h1>`/`<h2>` headings
  mentioning Tamraght/Taghazout, and `/robots.txt` + `/sitemap.xml` are served
  dynamically (`src/routes/robots.txt`, `src/routes/sitemap.xml`).
