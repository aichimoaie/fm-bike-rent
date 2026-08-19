import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin')) {
		const adminPassword = env.ADMIN_PASSWORD ?? '';

		if (!adminPassword) {
			return new Response(
				'Admin area is not configured. Set ADMIN_PASSWORD in the server environment.',
				{ status: 503 }
			);
		}

		const authHeader = event.request.headers.get('authorization');
		const expected = 'Basic ' + Buffer.from(`admin:${adminPassword}`).toString('base64');

		if (authHeader !== expected) {
			return new Response('Authentication required.', {
				status: 401,
				headers: { 'WWW-Authenticate': 'Basic realm="Admin"' }
			});
		}
	}

	return resolve(event);
};
