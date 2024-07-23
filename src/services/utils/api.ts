import { cookies } from 'next/headers';
import { HttpClient } from './HttpClient';
import { cookiesNames } from '@/constants/cookies-names';

export const basePath = 'http://localhost:3333';
export const api = new HttpClient(basePath);

api.addInterceptorRequest(async (config) => {
	if(config?.body && !(config?.body instanceof FormData)) {
		config.headers.append('Content-Type', 'application/json');
	}

	const accessToken = cookies().get(cookiesNames.accessToken)?.value;

	if(accessToken) {
		config.headers.append('Authorization', `Bearer ${accessToken}`);
	}
});
