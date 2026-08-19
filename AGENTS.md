# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and current-state facts that should travel with the code. Written for a reader with zero memory of prior sessions — current state first, rationale only where it changes what you should do next.

## Current state, at a glance

- Stack: SvelteKit (Svelte 5, TS) + `adapter-node` + better-sqlite3 + Tailwind v4.
- Booking: WhatsApp-only via `wa.me` links (`src/lib/whatsapp.ts`). No `/reserve` form page. No WhatsApp Business API.
- `/availability` page exists and works (calendar + date-picker booking flow) — reachable via the hero's "Check availability" button and a "how it works" link, not in the main nav.
- Visual design matches ebike-agadir-adventures.com closely (palette, fonts, header/burger, floating WhatsApp button, section layout) — current palette/fonts unchanged as of this writing (a distinct-identity redesign was requested but explicitly deferred/skipped for now).
- Homepage section order: Hero → Offers/Packages → How booking works → Why choose us (photo cards) → Reviews → FAQ (WhatsApp link at end too) → Instagram → closing CTA.
- Pricing tiers: 1 Day = 200 MAD/day, 4-7 Days = 150 MAD/day, 11+ Days = 130 MAD/day (real numbers, captain-confirmed). No separate flat per-scooter daily rate is shown anywhere anymore.
- Reviews section: links to Google + TripAdvisor via `PUBLIC_GOOGLE_REVIEW_URL` / `PUBLIC_TRIPADVISOR_URL`, both placeholder URLs — no ratings/review counts shown (neither listing exists yet).
- Hero image, gallery/fleet images, and Why-choose-us photos are placeholders copied from the reference site — not real photos of this business. Hero swap point is the `HERO_IMAGE` constant in `src/lib/config.ts`.
- i18n: 7 languages (EN/FR/NL/DE/ES/IT/AR) with real (not machine-approximate) translations, including WhatsApp message text; Arabic is RTL. Source: `src/lib/i18n/`.
- `/admin` reads `ADMIN_PASSWORD` via `$env/dynamic/private` (fixed — previously used raw `process.env` at module load, which didn't reliably populate under `vite dev`; works correctly now under both `npm run dev` and `node build/index.js`).
- Mobile RTL footer/nav alignment issues (bidi-reordered phone number/copyright line, hardcoded `text-align: left` on nav/lang-dropdown items) are fixed — see the RTL section below before touching header/footer/nav CSS again.
- No production deployment exists yet — no domain, no hosting account, no CDN configured. A `Dockerfile` is ready and verified (`docker build` + `docker run` both tested locally). Suggested (not provisioned) stack: Hetzner Cloud VPS running the Docker image + Cloudflare free plan in front for CDN/caching of `static/images/` and free TLS. A temporary ngrok tunnel to a local dev instance was used for captain preview during this work — that tunnel is not persistent and is not a deployment.

## What this project is

Single-operator e-scooter rental site for Tamraght/Taghazout, Morocco. Booking is WhatsApp-only (no reservation form). Visual design is deliberately modeled closely on https://ebike-agadir-adventures.com/ per explicit captain instruction, with filios-bike's own content/business identity.

## What's real vs. placeholder right now

(Check this section's claims against current files before trusting them — it's the part most likely to go stale.)

- **Real**: owner WhatsApp number (`212623201547`) and Instagram handle (`eco.kephyra`), set in `.env` (gitignored — not in git history except appearing in one commit message from an earlier chat instruction; this repo has no public remote, so that's not a live exposure concern, but don't add more secrets to commit messages going forward).
- **Placeholder**: scooter photos, hero image, why-choose-us photos, business logo (still the reference site's own logo asset), pricing-card scooter descriptions, Google/TripAdvisor review URLs.
- **Real pricing**: the 3 duration tiers (200/150/130 MAD) are the actual numbers to use; nothing else on the pricing side is a placeholder.

## Where things live

- `src/lib/config.ts` — owner contact config (WhatsApp number, Instagram handle, review URLs, `HERO_IMAGE` swap constant).
- `src/lib/i18n/` — all copy/translations (`translations.ts`) and the reactive language store (`store.svelte.ts`).
- `src/lib/styles/app.css` — design tokens (colors/fonts/shadows) matching the reference site, all custom rules inside `@layer base`/`@layer components`, RTL overrides at the bottom of the file.
- `src/hooks.server.ts` — `/admin` Basic Auth gate.
- `README.md` — already has a "what still needs to be filled in before going live" section; keep that in sync rather than duplicating its contents here.

## Sharp edges (read before touching these areas again)

- **Tailwind layering**: custom rules in `app.css` must stay inside `@layer base`/`@layer components` — un-layered CSS beats Tailwind's layered utility classes regardless of specificity (previously broke `text-white` on the hero `<h1>` and the burger's `hidden` utility).
- **Mobile nav stacking**: `.nav-mobile-panel` + backdrop are nested **inside** `<header>` in `+layout.svelte`, not a page-level sibling — required for the burger (`z-index:105`) to render above the sliding panel (`z-index:101`) by sharing `<header>`'s stacking context. A panel/backdrop placed as a header sibling would form its own top-level stacking context and cover the header regardless of the burger's z-index. `<header>`'s `backdrop-filter` makes it the containing block for fixed-position descendants — the nested panel still positions correctly against the viewport, but keep this in mind if the header's filter is ever removed.
- **RTL**: use logical CSS properties (`text-align: start`, not `left`) for anything that must flip in Arabic — two real bugs were hardcoded `text-align: left` on `.nav-link` (mobile) and `.lang-option`. Mixed-direction text (phone numbers, `© year BusinessName`) needs `<bdi dir="ltr">` wrapping inside RTL paragraphs, or digit groups/word order visually reorder (real bug, not cosmetic) — see the footer in `+layout.svelte` for the pattern.
- **i18n**: `Translation` interface in `translations.ts` is the source of truth — add a new UI string there first, then to all 7 language entries, or `svelte-check` will fail with missing-property errors pinpointing every call site.
- **Scroll-reveal**: `.reveal`/`.reveal.visible` via IntersectionObserver (threshold 0.1, rootMargin `0px 0px -50px 0px`, fires once) is a Svelte action at `src/lib/actions/reveal.ts` (`use:reveal`).
- **Double-booking prevention**: overlap check + insert run inside one SQLite transaction in `src/lib/server/db.ts` (`createReservationTxn`), not as separate steps.
- **Env vars in SvelteKit**: read private server env through `$env/dynamic/private` (or `$env/static/private`), not raw `process.env` — the latter isn't reliably populated from `.env` under `vite dev`. `src/lib/config.ts`'s `PUBLIC_*` vars use `$env/dynamic/public` (not `$env/static/public`) deliberately — static public env is inlined at *build* time, which broke the Docker build (no `.env` in the build context) and would otherwise require a full rebuild just to change the WhatsApp number/review URLs. Dynamic env reads at request time, so `docker run --env-file .env` (or any runtime env change) takes effect without rebuilding.
- **Docker**: `Dockerfile` + `.dockerignore` at repo root, multi-stage (`node:22-alpine` builder with `python3 make g++` for better-sqlite3's native binding, pruned-`node_modules` runtime stage). Build/run commands in README's "Docker" section. Mount a volume at `/app/data` (`DATABASE_PATH=/app/data/data.sqlite3` is set in the image) or reservations are lost on container recreation.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
