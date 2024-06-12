import { cookies } from 'next/headers';
import { cookiesNames } from '@/constants/cookies-names';

export function getAccessToken() {
	const cookieStore = cookies();

	return cookieStore.get(cookiesNames.accessToken)?.value;
}

export function updateAccessToken(accessToken: string) {
	const cookieStore = cookies();

	cookieStore.set(cookiesNames.accessToken, accessToken);
}

export function getRefreshToken() {
	const cookieStore = cookies();

	return cookieStore.get(cookiesNames.refreshToken)?.value;
}

export function updateRefreshToken(refreshToken: string) {
	const cookieStore = cookies();
	cookieStore.set(cookiesNames.refreshToken, refreshToken);
}

export function deleteCredentials() {
	const cookieStore = cookies();

	cookieStore.delete(cookiesNames.accessToken);
	cookieStore.delete(cookiesNames.refreshToken);
}
