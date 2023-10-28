import { User } from '@/entities/User';
import { httpClient } from '../httpClient';

type UpdateUserParams =  {
	id: string;
	user: Partial<User>
}

export async function update({ id, user }: UpdateUserParams) {
	const {data} = await httpClient.put(`/users/${id}`, user);
	return data;
}
