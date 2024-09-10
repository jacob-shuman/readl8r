import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
	cookies.delete('auth', { path: '/' });
	return redirect(303, '/login');
};
