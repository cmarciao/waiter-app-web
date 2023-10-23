import { User } from '@/entities/User';
import { httpClient } from '../httpClient';

type UpdateUserParams =  {
	id: string;
	user: Partial<User>
}

export async function update({ id, user }: UpdateUserParams) {
	const {data} = await httpClient.put(`/users/${id}`, user, {
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NWQ4MWNiOS0xYTc5LTRhYzQtYjU1Yi04MTg2NDg4M2RiMjciLCJpYXQiOjE2OTc2ODA2MjYsImV4cCI6MTY5ODI4NTQyNn0.hSklSHpgn1gLW0Tm4Zd2pz7Jgj0bOCqsQds7i-pCUqw'
		}
	});

	return data;
}
