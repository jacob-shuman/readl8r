import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';
import { SignJWT } from 'jose';
import { beforeEach, describe, expect, it } from 'vitest';
import { isAuthorized, verifyJwt } from './auth';

const password = 'password123';
const authSecret = 'super-duper-secret';

beforeEach(() => {
	env.PASSWORD = '';
	env.AUTH_SECRET = '';
});

describe('isAuthorized()', () => {
	it('$PASSWORD and $AUTH_SECRET are NOT set', async () => {
		expect(await isAuthorized()).toEqual(true);
	});

	it('bearer token matches $PASSWORD', async () => {
		const request = new Request('https://example.org', {
			headers: {
				Authorization: `Bearer ${password}`
			}
		});

		env.PASSWORD = password;

		expect(await isAuthorized({ request })).toEqual(true);
	});

	it('bearer token does not match $PASSWORD', async () => {
		const request = new Request('https://example.org', {
			headers: {
				Authorization: `Bearer something-else`
			}
		});

		env.PASSWORD = password;

		expect(await isAuthorized({ request })).toEqual(false);
	});

	it('$PASSWORD is set but no cookie or bearer token is passed', async () => {
		env.PASSWORD = password;

		expect(await isAuthorized()).toEqual(false);
	});

	it('valid auth cookie', async () => {
		const jwt = await new SignJWT({})
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('30d')
			.sign(new TextEncoder().encode(authSecret));

		const cookies = {
			get: () => jwt
		} as unknown as Cookies;

		env.PASSWORD = password;
		env.AUTH_SECRET = authSecret;

		expect(await verifyJwt(cookies.get('auth'))).toEqual(true);
		expect(await isAuthorized({ cookies })).toEqual(true);
	});

	it('auth cookie with invalid password', async () => {
		const jwt = await new SignJWT({})
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime('30d')
			.sign(new TextEncoder().encode('something-else'));

		const cookies = {
			get: () => jwt
		} as unknown as Cookies;

		env.PASSWORD = password;
		env.AUTH_SECRET = authSecret;

		expect(await verifyJwt(cookies.get('auth'))).toEqual(false);
		expect(await isAuthorized({ cookies })).toEqual(false);
	});

	it('expired auth cookie', async () => {
		const jwt = await new SignJWT({})
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime(Math.floor(Date.now() / 1000) - 60 * 24 * 60 * 60)
			.sign(new TextEncoder().encode(authSecret));

		const cookies = {
			get: () => jwt
		} as unknown as Cookies;

		env.PASSWORD = password;
		env.AUTH_SECRET = authSecret;

		expect(await verifyJwt(cookies.get('auth'))).toEqual(false);
		expect(await isAuthorized({ cookies })).toEqual(false);
	});
});
