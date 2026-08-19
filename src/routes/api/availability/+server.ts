import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { listScooters, listReservations } from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const scooters = listScooters();
	const reservations = listReservations();
	return json({ scooters, reservations });
};
