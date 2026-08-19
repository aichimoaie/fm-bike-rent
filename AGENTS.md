# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.
- Stack: SvelteKit (Svelte 5, TS) + `adapter-node` + better-sqlite3 + Tailwind v4. See README.md for why, how to run, and what's left before launch (owner WhatsApp number, real scooter data/photos, domain/hosting).
- No admin UI in v1: manage scooters/reservations directly via `sqlite3 data.sqlite3` (intentional shortcut for a single-operator business — see README).
- Double-booking prevention lives in `src/lib/server/db.ts` (`createReservationTxn`): overlap check + insert run inside one SQLite transaction, not as separate steps.
- Owner's WhatsApp number is `PUBLIC_OWNER_WHATSAPP_NUMBER` (env, see `.env.example`), read in `src/lib/config.ts` — the only place that needs editing once the real number is known.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
