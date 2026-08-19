import { OWNER_WHATSAPP_NUMBER } from '$lib/config';

/** Builds a wa.me deep link pre-filled with the given message. */
export function waLink(message: string): string {
	return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
