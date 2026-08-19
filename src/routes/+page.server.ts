import type { PageServerLoad } from './$types';
import { listScooters } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	return { scooters: listScooters() };
};
