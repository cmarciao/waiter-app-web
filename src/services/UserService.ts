import { HttpClient } from './utils/HttpClient';
import { IErrorResponse, IUserRequest, IUserResponse } from '@/types/Users';

export const BASE_URL = 'http://localhost:3333';

class UsersService {
	private httpClient = new HttpClient('http://localhost:3333');

	async createUser(user: IUserRequest): Promise<IUserResponse> {
		const response = await this.httpClient.post('/users', {
			body: JSON.stringify(user)
		});

		return response;
	}

	async listUsers(): Promise<IUserResponse[] | IErrorResponse> {
		const response = await this.httpClient.get('/users', {
			next: {
				tags: ['users']
			}
		});

		return response;
	}

	async getUserById(id: string): Promise<IUserResponse> {
		const response = await this.httpClient.get(`/users/${id}`);

		return response;
	}

	async updateUser(id: string, user: IUserRequest): Promise<IUserResponse> {
		const response = await this.httpClient.put(`/users/${id}`, {
			body: JSON.stringify(user)
		});

		return response;
	}

	async removeUser(id: string) {
		await this.httpClient.delete(`/users/${id}`);
	}
}

export default new UsersService();
