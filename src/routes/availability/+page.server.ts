import type { PageServerLoad } from './$types';
import { listScooters, listReservations } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	return {
		scooters: listScooters(),
		reservations: listReservations()
	};
};
