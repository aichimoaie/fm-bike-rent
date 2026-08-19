/**
 * Single obvious place to configure the owner's WhatsApp number.
 *
 * Fill in OWNER_WHATSAPP_NUMBER via the PUBLIC_OWNER_WHATSAPP_NUMBER env var
 * (see .env.example) once the captain's friend gives us the real number.
 * Format: full international number, digits only, no "+", no spaces
 * (e.g. a Moroccan mobile would look like "2126XXXXXXXX").
 */
import { PUBLIC_OWNER_WHATSAPP_NUMBER, PUBLIC_OWNER_INSTAGRAM_HANDLE } from '$env/static/public';

export const OWNER_WHATSAPP_NUMBER = PUBLIC_OWNER_WHATSAPP_NUMBER || '0000000000';

/** No "@" prefix. Fill in via PUBLIC_OWNER_INSTAGRAM_HANDLE once known (see .env.example). */
export const OWNER_INSTAGRAM_HANDLE = PUBLIC_OWNER_INSTAGRAM_HANDLE || 'filiosbike';

export const BUSINESS_NAME = "Filio's Bike";
export const BUSINESS_LOCATION = 'Tamraght / Taghazout, Morocco';
