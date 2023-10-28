import { User } from '@/entities/User';
import { httpClient } from '../httpClient';

export async function create(user: User) {
	const { data } = await httpClient.post('/users', user);
	return data;
}
