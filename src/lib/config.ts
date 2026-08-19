/**
 * Single obvious place to configure the owner's WhatsApp number.
 *
 * Fill in OWNER_WHATSAPP_NUMBER via the PUBLIC_OWNER_WHATSAPP_NUMBER env var
 * (see .env.example) once the captain's friend gives us the real number.
 * Format: full international number, digits only, no "+", no spaces
 * (e.g. a Moroccan mobile would look like "2126XXXXXXXX").
 *
 * Uses $env/dynamic/public (read at request time) rather than
 * $env/static/public (inlined at build time) so these values can be changed
 * via env vars at deploy time — e.g. `docker run --env-file .env` — without
 * needing to rebuild the app/image each time.
 */
import { env } from '$env/dynamic/public';

export const OWNER_WHATSAPP_NUMBER = env.PUBLIC_OWNER_WHATSAPP_NUMBER || '0000000000';

/** No "@" prefix. Fill in via PUBLIC_OWNER_INSTAGRAM_HANDLE once known (see .env.example). */
export const OWNER_INSTAGRAM_HANDLE = env.PUBLIC_OWNER_INSTAGRAM_HANDLE || 'filiosbike';

/** Google Business Profile review/listing link. Fill in via PUBLIC_GOOGLE_REVIEW_URL once the listing exists. */
export const GOOGLE_REVIEW_URL = env.PUBLIC_GOOGLE_REVIEW_URL || 'https://g.page/r/placeholder/review';

/** TripAdvisor listing link. Fill in via PUBLIC_TRIPADVISOR_URL once the listing exists. */
export const TRIPADVISOR_URL = env.PUBLIC_TRIPADVISOR_URL || 'https://www.tripadvisor.com/placeholder';

export const BUSINESS_NAME = "Filio's Bike";
export const BUSINESS_LOCATION = 'Tamraght / Taghazout, Morocco';

/**
 * Hero background image path. Single obvious place to swap in the captain's
 * own logo/brand image + caption when provided — just change this constant
 * (and the caption text in +page.svelte's hero section) once supplied.
 */
export const HERO_IMAGE = '/images/hero-canyon.jpg';
