import { httpClient } from '../httpClient';

export function remove(id: string) {
	return httpClient.delete(`/users/${id}`, {
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NWQ4MWNiOS0xYTc5LTRhYzQtYjU1Yi04MTg2NDg4M2RiMjciLCJpYXQiOjE2OTc2ODA2MjYsImV4cCI6MTY5ODI4NTQyNn0.hSklSHpgn1gLW0Tm4Zd2pz7Jgj0bOCqsQds7i-pCUqw'
		}
	});
}
