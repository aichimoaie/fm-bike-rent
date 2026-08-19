import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createReservation, getScooter, OverlapError } from '$lib/server/db';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);

	if (!body || typeof body !== 'object') {
		return json({ error: 'Invalid request body.' }, { status: 400 });
	}

	const { scooterId, customerName, customerPhone, startDate, endDate } = body as Record<string, unknown>;

	if (typeof scooterId !== 'string' || !scooterId) {
		return json({ error: 'scooterId is required.' }, { status: 400 });
	}
	if (typeof customerName !== 'string' || customerName.trim().length < 2) {
		return json({ error: 'Please enter your name.' }, { status: 400 });
	}
	if (typeof customerPhone !== 'string' || customerPhone.trim().length < 6) {
		return json({ error: 'Please enter a valid phone number.' }, { status: 400 });
	}
	if (typeof startDate !== 'string' || !DATE_RE.test(startDate)) {
		return json({ error: 'startDate must be YYYY-MM-DD.' }, { status: 400 });
	}
	if (typeof endDate !== 'string' || !DATE_RE.test(endDate)) {
		return json({ error: 'endDate must be YYYY-MM-DD.' }, { status: 400 });
	}
	if (endDate < startDate) {
		return json({ error: 'endDate must be on or after startDate.' }, { status: 400 });
	}

	const scooter = getScooter(scooterId);
	if (!scooter) {
		return json({ error: 'Scooter not found.' }, { status: 404 });
	}

	try {
		const reservation = createReservation({
			scooterId,
			customerName: customerName.trim(),
			customerPhone: customerPhone.trim(),
			startDate,
			endDate
		});
		return json({ reservation, scooter }, { status: 201 });
	} catch (err) {
		if (err instanceof OverlapError) {
			return json({ error: err.message }, { status: 409 });
		}
		throw err;
	}
};
