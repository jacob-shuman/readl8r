import { env } from '$env/dynamic/private';
import { verifyJwt } from '$lib/auth';
import { fail, redirect } from '@sveltejs/kit';
import { SignJWT } from 'jose';

export const load = async ({ cookies }) => {
	const authCookie = cookies.get('auth');

	if (authCookie) {
		if (await verifyJwt(authCookie)) {
			return redirect(303, '/');
		} else {
			cookies.delete('auth', { path: '/' });
		}
	}
};

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const password = data.get('password');

		if (!password || typeof password !== 'string' || password !== env.PASSWORD) {
			return fail(401, { passwordError: 'Invalid Password' });
		}

		const secretKey = new TextEncoder().encode(env.AUTH_SECRET);
		const jwt = await new SignJWT({})
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('30d')
			.sign(secretKey);

		cookies.set('auth', jwt, {
			path: '/',
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});
	}
};