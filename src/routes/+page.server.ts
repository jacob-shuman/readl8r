import { env } from '$env/dynamic/private';
import { isAuthorized } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, cookies }) => {
	if (await isAuthorized({ request, cookies })) {
		return redirect(302, '/login');
	}

	return { authCookie: cookies.get('auth'), usesAuth: Boolean(env.PASSWORD) };
};
