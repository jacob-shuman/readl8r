import { env } from '$env/dynamic/private';
import { logger } from '$lib/utils';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (env.PASSWORD && !env.AUTH_SECRET) {
		logger.error(
			'You must set $AUTH_SECRET since you set $PASSWORD ($AUTH_SECRET is used to sign JWTs!)'
		);

		return new Response(undefined, {
			status: 500,
			statusText:
				'You must set $AUTH_SECRET since you set $PASSWORD ($AUTH_SECRET is used to sign JWTs!)'
		});
	}

	return await resolve(event);
};
