import { OWNER_WHATSAPP_NUMBER } from '$lib/config';

/** Builds a wa.me deep link pre-filled with the given message. */
export function waLink(message: string): string {
	return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats a digits-only international number for display, e.g.
 * "212623201547" -> "+212 6 23 20 15 47" (3-digit country code, then the
 * rest grouped 1-2-2-2-2, matching the reference site's footer phone style).
 * Falls back to a plain "+<digits>" for numbers that don't fit that shape.
 */
export function formatPhoneDisplay(number: string): string {
	const countryCode = number.slice(0, 3);
	const rest = number.slice(3);
	if (rest.length !== 9) return `+${number}`;
	const groups = [rest.slice(0, 1), rest.slice(1, 3), rest.slice(3, 5), rest.slice(5, 7), rest.slice(7, 9)];
	return `+${countryCode} ${groups.join(' ')}`;
}
