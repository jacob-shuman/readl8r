import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';
import { jwtVerify } from 'jose';

export async function isAuthorized({
	request,
	cookies
}: {
	request?: Request;
	cookies?: Cookies;
} = {}): Promise<boolean> {
	return (
		await Promise.all([
			// No password is set
			(async () => !env.PASSWORD)(),

			// Check bearer token
			(async () =>
				request && request.headers.get('authorization')?.split('Bearer ')[1] === env.PASSWORD)(),

			// User has `auth` cookie
			(async () => cookies && (await verifyJwt(cookies.get('auth'))))()
		])
	).some((r) => r);
}

export async function verifyJwt(token?: string): Promise<boolean> {
	if (!token) {
		return false;
	}

	const secretKey = new TextEncoder().encode(env.AUTH_SECRET);

	try {
		await jwtVerify(token, secretKey);
		return true;
	} catch (err) {
		return false;
	}
}
