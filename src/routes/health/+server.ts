import { text, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () =>
	text('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } });
