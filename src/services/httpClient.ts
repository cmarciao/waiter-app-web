import axios from 'axios';
import { getSession } from 'next-auth/react';

export const httpClient = axios.create({
	baseURL: 'http://localhost:3333'
});

httpClient.interceptors.request.use(async (config) => {
	const session = await getSession();

	if(session?.user) {
		config.headers.Authorization = `Bearer ${session?.user.name}`;
	}

	return config;
});
