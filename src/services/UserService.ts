import { IUserRequest, IUserResponse } from '@/types/Users';
import { api } from './utils/api';

class UsersService {
	async createUser(user: IUserRequest): Promise<IUserResponse> {
		return api.post('/users', {
			body: JSON.stringify(user)
		});
	}

	async listUsers(): Promise<IUserResponse[]> {
		return api.get('/users', {
			next: {
				tags: ['users']
			}
		});
	}

	async getUserById(id: string): Promise<IUserResponse> {
		return api.get(`/users/${id}`);

	}

	async updateUser(id: string, user: IUserRequest): Promise<IUserResponse> {
		return api.put(`/users/${id}`, {
			body: JSON.stringify(user)
		});

	}

	async removeUser(id: string) {
		return api.delete(`/users/${id}`);
	}
}

export default new UsersService();
