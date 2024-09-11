import { isAuthorized } from '$lib/auth';
import { purgeArticles } from '$lib/db';
import { type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ request, cookies, url }) => {
	const older_than = url.searchParams.get('older_than');

	if (!older_than) {
		return new Response(undefined, {
			status: 400,
			statusText: 'missing required "older_than" url query parameter'
		});
	}

	const [matchesFormat, amount, period] = older_than.match(/^([0-9]+)([hdmy])$/) ?? [];

	if (!isAuthorized({ request, cookies })) {
		return new Response(undefined, { status: 401, statusText: 'Not authorized' });
	} else if (!matchesFormat) {
		return new Response(undefined, {
			status: 400,
			statusText: 'invalid format, use the formula "<number><h | d | m | y>"'
		});
	}

	const [{ numDeletedRows }] = await purgeArticles(period as 'h' | 'd' | 'm' | 'y', Number(amount));

	return new Response(undefined, {
		status: 200,
		statusText: `${numDeletedRows} articles purged successfully`
	});
};
