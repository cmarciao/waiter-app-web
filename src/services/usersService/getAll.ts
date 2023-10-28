import { User } from '@/entities/User';
import { httpClient } from '../httpClient';

type GetAllUsersResponse = User[];

export async function getAll() {
	const { data } = await httpClient.get<GetAllUsersResponse>('/users');
	return data;
}
