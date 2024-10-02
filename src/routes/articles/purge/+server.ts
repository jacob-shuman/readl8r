import { isAuthorized } from '$lib/auth';
import { purgeArticles } from '$lib/db';
import { text, type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ request, cookies, url }) => {
	const older_than = url.searchParams.get('older_than');

	if (!older_than) {
		return text('missing required "older_than" url query parameter', {
			status: 400,
			headers: { 'Content-Type': 'text/plain' }
		});
	}

	const [matchesFormat, amount, period] = older_than.match(/^([0-9]+)([hdmy])$/) ?? [];

	if (!(await isAuthorized({ request, cookies }))) {
		return text('not authorized', { status: 401, headers: { 'Content-Type': 'text/plain' } });
	} else if (!matchesFormat) {
		return text('invalid format, use the formula "<number><h | d | m | y>"', {
			status: 400,
			headers: { 'Content-Type': 'text/plain' }
		});
	}

	const [{ numDeletedRows }] = await purgeArticles(period as 'h' | 'd' | 'm' | 'y', Number(amount));

	return text(`${numDeletedRows} articles purged successfully`, {
		status: 200,
		headers: { 'Content-Type': 'text/plain' }
	});
};
