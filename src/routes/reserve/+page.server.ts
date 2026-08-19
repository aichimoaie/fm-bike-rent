import type { PageServerLoad } from './$types';
import { listScooters } from '$lib/server/db';

export const load: PageServerLoad = async ({ url }) => {
	return {
		scooters: listScooters(),
		preselectedScooterId: url.searchParams.get('scooter') ?? ''
	};
};
