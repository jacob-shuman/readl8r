import { env } from '$env/dynamic/private';
import { verifyJwt } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	if (env.PASSWORD && !(await verifyJwt(cookies.get('auth')))) {
		return redirect(302, '/login');
	}

	return { authCookie: cookies.get('auth') };
};
