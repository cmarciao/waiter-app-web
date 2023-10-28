import { httpClient } from '../httpClient';

export function remove(id: string) {
	return httpClient.delete(`/users/${id}`);
}
