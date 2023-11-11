import { httpClient } from '../httpClient';

export async function remove(id: string) {
	await httpClient.delete(`ingredients/${id}`);
}
