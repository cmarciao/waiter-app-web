import { Profile } from '@/types/Profile';
import { api } from './utils/api';

export type SignInParams = {
	email: string;
	password: string;
}

export type RefreshTokenParams = {
	id: string;
}

export type MeUpdateRequest = Profile & {
    password?: string;
    confirmPassword?: string;
}

class AuthService {
	async me(): Promise<Profile> {
		return api.get('/users/me');
	}

	updateProfile(data: MeUpdateRequest): Promise<Profile> {
		return api.put('/users/me', {
			body: JSON.stringify(data)
		});
	}

	async signInService(params: SignInParams){
		return api.post('/auth/signin', {
			body: JSON.stringify(params),
		});
	}

	async refreshTokenService(params: RefreshTokenParams) {
		return api.post('/auth/refresh-token', {
			body: JSON.stringify(params)
		});
	}
}

export default new AuthService();
