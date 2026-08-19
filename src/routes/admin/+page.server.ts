import type { Actions, PageServerLoad } from './$types';
import { db, setReservationStatus, type Reservation } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

type ReservationWithScooter = Reservation & { scooter_name: string; scooter_model: string };

export const load: PageServerLoad = async () => {
	const reservations = db
		.prepare(
			`SELECT r.*, s.name as scooter_name, s.model as scooter_model
			 FROM reservations r
			 JOIN scooters s ON s.id = r.scooter_id
			 ORDER BY r.start_date DESC`
		)
		.all() as ReservationWithScooter[];

	return { reservations };
};

export const actions: Actions = {
	confirm: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (typeof id !== 'string' || !id) return fail(400, { error: 'Missing reservation id.' });
		setReservationStatus(id, 'confirmed');
		return { success: true };
	},
	cancel: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (typeof id !== 'string' || !id) return fail(400, { error: 'Missing reservation id.' });
		setReservationStatus(id, 'cancelled');
		return { success: true };
	}
};
