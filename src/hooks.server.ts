import { env } from '$env/dynamic/private';
import { logger } from '$lib/utils';
import { text, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (env.PASSWORD && !env.AUTH_SECRET) {
		logger.error(
			'You must set $AUTH_SECRET since you set $PASSWORD ($AUTH_SECRET is used to sign JWTs!)'
		);

		return text(
			'You must set $AUTH_SECRET since you set $PASSWORD ($AUTH_SECRET is used to sign JWTs!)',
			{ status: 500, headers: { 'Content-Type': 'text/plain' } }
		);
	}

	return await resolve(event);
};
