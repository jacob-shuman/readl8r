import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
	cookies.delete('authenticated', { path: '/' });
	return redirect(303, '/login');
};
