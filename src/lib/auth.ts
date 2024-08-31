import { env } from '$env/dynamic/private';

export function isAuthorized(request: Request) {
	// No auth
	if (!env.PASSWORD) {
		return true;
	}

	// Check bearer token
	return request.headers.get('authorization')?.split('Bearer ')[1] === env.PASSWORD;
}
