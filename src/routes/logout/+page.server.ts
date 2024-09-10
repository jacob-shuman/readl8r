import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
	if (!env.PASSWORD) {
		return redirect(303, '/');
	}

	cookies.delete('auth', { path: '/' });
	return redirect(303, '/login');
};
