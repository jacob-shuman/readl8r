import { env } from '$env/dynamic/private';
import { isAuthorized } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, cookies }) => {
	if (!(await isAuthorized({ request, cookies }))) {
		return redirect(302, '/login');
	}

	return { usesAuth: Boolean(env.PASSWORD) };
};
