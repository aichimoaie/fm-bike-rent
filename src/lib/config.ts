/**
 * Single obvious place to configure the owner's WhatsApp number.
 *
 * Fill in OWNER_WHATSAPP_NUMBER via the PUBLIC_OWNER_WHATSAPP_NUMBER env var
 * (see .env.example) once the captain's friend gives us the real number.
 * Format: full international number, digits only, no "+", no spaces
 * (e.g. a Moroccan mobile would look like "2126XXXXXXXX").
 */
import {
	PUBLIC_OWNER_WHATSAPP_NUMBER,
	PUBLIC_OWNER_INSTAGRAM_HANDLE,
	PUBLIC_GOOGLE_REVIEW_URL,
	PUBLIC_TRIPADVISOR_URL
} from '$env/static/public';

export const OWNER_WHATSAPP_NUMBER = PUBLIC_OWNER_WHATSAPP_NUMBER || '0000000000';

/** No "@" prefix. Fill in via PUBLIC_OWNER_INSTAGRAM_HANDLE once known (see .env.example). */
export const OWNER_INSTAGRAM_HANDLE = PUBLIC_OWNER_INSTAGRAM_HANDLE || 'filiosbike';

/** Google Business Profile review/listing link. Fill in via PUBLIC_GOOGLE_REVIEW_URL once the listing exists. */
export const GOOGLE_REVIEW_URL = PUBLIC_GOOGLE_REVIEW_URL || 'https://g.page/r/placeholder/review';

/** TripAdvisor listing link. Fill in via PUBLIC_TRIPADVISOR_URL once the listing exists. */
export const TRIPADVISOR_URL = PUBLIC_TRIPADVISOR_URL || 'https://www.tripadvisor.com/placeholder';

export const BUSINESS_NAME = "Filio's Bike";
export const BUSINESS_LOCATION = 'Tamraght / Taghazout, Morocco';

/**
 * Hero background image path. Single obvious place to swap in the captain's
 * own logo/brand image + caption when provided — just change this constant
 * (and the caption text in +page.svelte's hero section) once supplied.
 */
export const HERO_IMAGE = '/images/hero-canyon.jpg';
