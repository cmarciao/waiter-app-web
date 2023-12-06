import { httpClient } from '../httpClient';

export async function create() {
	const { data } = await httpClient.post('/historic');
	return data;
}
